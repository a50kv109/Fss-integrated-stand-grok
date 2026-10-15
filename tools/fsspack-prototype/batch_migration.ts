/**
 * Batch Migration Engine for FSSPACK Packages
 * 
 * Packages multiple space groups into individual .fsspack files
 * and bundles them into an outer standard ZIP archive with an INDEX.json manifest.
 */

import { SymmetryCatalog, DetailedSymmetryRecord } from '../../core/registry';
import { SpaceGroupCatalogService } from '../../core/space_group_catalog';
import { PackageExporter } from './exporter';
import { ZipContainer, ZipEntry } from './zip_container';
import * as crypto from 'node:crypto';

export interface BatchItemReport {
  spaceGroupNumber: number;
  settingId: string;
  hmSymbol: string;
  fileName: string;
  status: 'VERIFIED_ACTIVE' | 'ERROR' | 'METADATA_ONLY';
  byteSize?: number;
  fileSha256?: string;
  contentSha256?: string;
  error?: string;
}

export interface BatchMigrationResult {
  zipBuffer: Buffer;
  archiveFileName: string;
  itemReports: BatchItemReport[];
  totalRequested: number;
  successCount: number;
  errorCount: number;
}

export class BatchMigrationEngine {
  /**
   * Builds an outer ZIP archive containing individual .fsspack packages
   * and a root INDEX.json catalog.
   */
  static exportBatch(targets: Array<{ groupNumber: number; settingId?: string }>): BatchMigrationResult {
    const outerEntries: ZipEntry[] = [];
    const itemReports: BatchItemReport[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (const target of targets) {
      const groupNum = target.groupNumber;
      const catalogItem = SpaceGroupCatalogService.getGroup(groupNum);
      const groupLabel = `SG${String(groupNum).padStart(3, '0')}`;

      // Check if verified record exists
      let record: DetailedSymmetryRecord | undefined;
      if (target.settingId) {
        record = SymmetryCatalog.findBySettingId(target.settingId);
      } else {
        const records = SymmetryCatalog.findByGroupNumber(groupNum);
        record = records.length > 0 ? records[0] : undefined;
      }

      if (!record) {
        // Group has metadata but no verified mathematical operations yet
        itemReports.push({
          spaceGroupNumber: groupNum,
          settingId: target.settingId || catalogItem?.standardHm || 'unknown',
          hmSymbol: catalogItem?.standardHm || 'unknown',
          fileName: `${groupLabel}_unverified.txt`,
          status: 'METADATA_ONLY',
          error: `Space group ${groupNum} has metadata in catalog, but mathematical operations model is not yet extracted in repository.`
        });
        errorCount++;
        continue;
      }

      try {
        const exportRes = PackageExporter.export(record);
        const fileName = `${groupLabel}_${record.settingId.replace(/[^a-zA-Z0-9]/g, '')}.fsspack`;

        // Add individual .fsspack binary container into packages/ folder of outer ZIP
        outerEntries.push({
          path: `packages/${fileName}`,
          data: exportRes.packageBuffer
        });

        itemReports.push({
          spaceGroupNumber: groupNum,
          settingId: record.settingId,
          hmSymbol: record.hmSymbol,
          fileName,
          status: 'VERIFIED_ACTIVE',
          byteSize: exportRes.byteSize,
          fileSha256: exportRes.fileSha256,
          contentSha256: exportRes.contentSha256
        });
        successCount++;
      } catch (err: any) {
        itemReports.push({
          spaceGroupNumber: groupNum,
          settingId: record.settingId,
          hmSymbol: record.hmSymbol,
          fileName: `${groupLabel}_failed.txt`,
          status: 'ERROR',
          error: err.message
        });
        errorCount++;
      }
    }

    // 2. Build root INDEX.json
    const indexData = {
      archiveType: 'FSSPACK_BATCH_MIGRATION_ARCHIVE',
      specVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      exporter: 'Fedorov Symmetry Reasoning Stand Batch Workbench',
      totalRequested: targets.length,
      successCount,
      errorCount,
      packages: itemReports
    };

    const indexJson = JSON.stringify(indexData, null, 2);
    outerEntries.push({
      path: 'INDEX.json',
      data: Buffer.from(indexJson, 'utf8')
    });

    // 3. Build README.txt
    const readmeText = [
      '===============================================================',
      'FEDOROV SYMMETRY STAND (FSS) — BATCH MIGRATION ARCHIVE',
      '===============================================================',
      '',
      `Exported at: ${indexData.exportedAt}`,
      `Total packages: ${successCount}`,
      '',
      'CONTENTS:',
      '- INDEX.json: Catalog metadata and SHA-256 digests for each package.',
      '- packages/*.fsspack: Individual cryptographic space-group packages.',
      '',
      'USAGE IN STAND B:',
      '1. Open Stand B (or Fedorov Symmetry Reasoning Stand).',
      '2. In the "Import / Verification" tab or Header, click "Import Passport".',
      '3. Select any .fsspack file from the packages/ folder.',
      '4. The Gatekeeper will execute 6-stage admission verification.',
      '==============================================================='
    ].join('\n');

    outerEntries.push({
      path: 'README.txt',
      data: Buffer.from(readmeText, 'utf8')
    });

    // Pack into outer ZIP container
    const zipBuffer = ZipContainer.pack(outerEntries);
    const dateStr = new Date().toISOString().split('T')[0];
    const archiveFileName = `fsspack_batch_${dateStr}_${successCount}pkg.zip`;

    return {
      zipBuffer,
      archiveFileName,
      itemReports,
      totalRequested: targets.length,
      successCount,
      errorCount
    };
  }
}
