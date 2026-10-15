import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import { runSymmetryExperiment } from './core/engine';
import { classifyOperationSet } from './core/operation_set_match';
import { CANONICAL_STRUCTURES, CANONICAL_OPERATIONS } from './core/canonical';
import { Gatekeeper } from './tools/fsspack-prototype/gatekeeper';
import { PackageExporter } from './tools/fsspack-prototype/exporter';
import { SymmetryCatalog } from './core/registry';
import { SpaceGroupCatalogService } from './core/space_group_catalog';
import { BatchMigrationEngine } from './tools/fsspack-prototype/batch_migration';

const app = express();
export { app };
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '100kb' }));

// API: Classify symmetry operations
app.post('/api/classify', (req, res) => {
  // Manual check of content length for 413
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 100 * 1024) {
    return res.status(413).json({ error: 'PAYLOAD_TOO_LARGE' });
  }

  const { operations } = req.body;
  if (!operations || !Array.isArray(operations)) {
    return res.status(400).json({ error: 'INVALID_INPUT' });
  }
  if (operations.length > 50) {
    return res.status(400).json({ error: 'OPERATION_LIMIT_EXCEEDED' });
  }

  try {
    const report = classifyOperationSet(operations);
    return res.json(report);
  } catch (error) {
    return res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
});

// AGENT TOOL ENDPOINT: Executes deterministic symmetry experiment
app.post('/api/experiment', (req, res) => {
  try {
    const {
      structureId,
      operationId,
      predicate,
      epsilon,
      orthogonalityEpsilon,
      determinantEpsilon,
      operation
    } = req.body;

    if (!structureId || (!operationId && !operation)) {
      return res.status(400).json({
        error: 'Missing required parameters: structureId and operationId (or operation) are required.'
      });
    }

    const evidence = runSymmetryExperiment({
      structureId,
      operationId,
      predicate,
      epsilon,
      orthogonalityEpsilon,
      determinantEpsilon,
      operation
    });
    return res.json(evidence);
  } catch (error: any) {
    return res.status(400).json({ error: error?.message || 'Experiment execution failed' });
  }
});

// Canonical definitions inspection endpoint for Agents
app.get('/api/experiment/canonical', (_req, res) => {
  return res.json({
    structures: CANONICAL_STRUCTURES,
    operations: CANONICAL_OPERATIONS
  });
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/synthesis', async (req, res) => {
  try {
    const { group, protocol } = req.body;
    if (!group) {
      return res.status(400).json({ error: 'Missing group' });
    }

    const protocolContexts: Record<string, string> = {
      'CLASSICAL': 'Focus on E.S. Fedorov’s original 1891 geometric derivations.',
      'USP_VERIFICATION': 'Apply Sasha’s Unified Symmetry Protocol (USP) to verify topological stability.',
      'HARMONIC_RESONANCE': 'Apply Sasha’s Harmonic Resonance Module (SHRM). Analyze the symmetry as a vibrational frequency field and predict "Resonance Deltas" for lattice energy.'
    };

    const instruction = protocolContexts[protocol] || protocolContexts['HARMONIC_RESONANCE'];

    const prompt = `Synthesize the data for Space Group #${group.number} (${group.symbol}). 
Current Methodology: ${protocol}.
Instruction: ${instruction}

Provide a deep scientific breakdown:
1. Symmetry Characteristics.
2. Methodology Insights (how this specific protocol interprets the group).
3. Predicted Physical Applications based on Sasha-Fedorov hybrid theory.

Keep the tone highly professional, precise, and visionary.`;

    let responseText = '';
    const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest'];
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature: 0.6,
          }
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} failed, trying fallback...`, err?.message);
      }
    }

    if (!responseText) {
      throw lastError || new Error('All models failed to respond');
    }

    return res.json({ text: responseText });
  } catch (error: any) {
    console.error('Server Gemini Synthesis Error:', error);
    return res.status(500).json({
      error: error?.message || 'Synthesis failed',
      fallbackText: 'Harmonic synthesis was interrupted. The resonance field failed to stabilize.'
    });
  }
});

// API: Export .fsspack package for a setting ID (e.g. P41)
app.get('/api/fsspack/export/:settingId', (req, res) => {
  try {
    const settingId = req.params.settingId;
    const record = SymmetryCatalog.findBySettingId(settingId);
    if (!record) {
      return res.status(404).json({ error: `Setting ID ${settingId} not found in catalog` });
    }
    const exportResult = PackageExporter.export(record);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${settingId}.fsspack"`);
    return res.send(exportResult.packageBuffer);
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Export failed' });
  }
});

// API: Ingest and verify .fsspack package buffer via Gatekeeper
app.post('/api/fsspack/ingest', express.raw({ type: '*/*', limit: '50mb' }), (req, res) => {
  try {
    const buffer = req.body;
    if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
      return res.status(400).json({ error: 'INVALID_PACKAGE_BUFFER' });
    }
    const result = Gatekeeper.ingest(buffer);
    const extraFilesObj: Record<string, string> = {};
    for (const [k, v] of result.extraFiles.entries()) {
      extraFilesObj[k] = v.toString('base64');
    }
    return res.json({
      report: result.report,
      manifest: result.manifest,
      mathModel: result.mathModel,
      verificationPassport: result.verificationPassport,
      provenance: result.provenance,
      extraFiles: extraFilesObj
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Ingestion failed' });
  }
});

// API: List 230 space groups with filtering and stats
app.get('/api/catalog/groups', (req, res) => {
  try {
    const { search, crystalSystem, centering, status } = req.query as Record<string, string>;
    const groups = SpaceGroupCatalogService.listGroups({ search, crystalSystem, centering, status });
    const stats = SpaceGroupCatalogService.getStats();
    return res.json({ groups, stats });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to list space groups' });
  }
});

// API: Get group passport
app.get('/api/catalog/group/:number', (req, res) => {
  try {
    const num = parseInt(req.params.number, 10);
    const settingId = req.query.settingId as string | undefined;
    const passport = SpaceGroupCatalogService.getPassport(num, settingId);
    if (!passport) {
      return res.status(404).json({ error: `Space group #${num} not found in catalog` });
    }
    return res.json(passport);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to get passport' });
  }
});

// API: Get catalog coverage statistics
app.get('/api/catalog/stats', (_req, res) => {
  try {
    const stats = SpaceGroupCatalogService.getStats();
    return res.json(stats);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to get stats' });
  }
});

// API: Batch export multiple space groups as a ZIP of .fsspack files
app.post('/api/fsspack/batch-export', (req, res) => {
  try {
    const { targets } = req.body;
    if (!Array.isArray(targets) || targets.length === 0) {
      return res.status(400).json({ error: 'targets array is required' });
    }
    const result = BatchMigrationEngine.exportBatch(targets);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${result.archiveFileName}"`);
    res.setHeader('X-Batch-Success-Count', String(result.successCount));
    res.setHeader('X-Batch-Error-Count', String(result.errorCount));
    return res.send(result.zipBuffer);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Batch export failed' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.use((_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

const isMain = process.argv[1] && (
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) ||
  process.argv[1].endsWith('server.ts') ||
  process.argv[1].endsWith('server.js')
);

if (isMain) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
