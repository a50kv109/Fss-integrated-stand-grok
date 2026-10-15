/**
 * Pure TypeScript Zero-Dependency PKZIP v2.0 Writer and Reader (Hardened Edition)
 * 
 * Includes robust security hardening against Path Traversal, Zip Bomb attacks,
 * oversized archives, duplicate entries, invalid compression methods, and CRC/size mismatches.
 */

import * as zlib from 'node:zlib';

export interface ZipEntry {
  path: string;
  data: Buffer;
}

// Security Limits
const MAX_ZIP_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const MAX_ENTRIES = 200;
const MAX_FILE_UNCOMPRESSED_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_TOTAL_UNCOMPRESSED_SIZE = 25 * 1024 * 1024; // 25 MB total

export class ZipContainer {
  /**
   * Packs an array of files into a standard PKZIP buffer.
   * Uses Deflate compression with STORE fallback.
   */
  static pack(entries: ZipEntry[], useCompression = true): Buffer {
    if (entries.length > MAX_ENTRIES) {
      throw new Error(`Exceeded maximum allowed entries (${MAX_ENTRIES})`);
    }

    const localHeaders: Buffer[] = [];
    const centralHeaders: Buffer[] = [];
    let currentOffset = 0;
    const seenPaths = new Set<string>();

    for (const entry of entries) {
      // Sanitize and validate path during packing
      const cleanPath = ZipContainer.sanitizeAndValidatePath(entry.path);
      if (seenPaths.has(cleanPath)) {
        throw new Error(`Duplicate entry path in ZIP package: ${cleanPath}`);
      }
      seenPaths.add(cleanPath);

      const filenameBuf = Buffer.from(cleanPath, 'utf8');
      const uncompressedData = entry.data;
      const uncompressedSize = uncompressedData.length;

      if (uncompressedSize > MAX_FILE_UNCOMPRESSED_SIZE) {
        throw new Error(`File ${cleanPath} exceeds maximum uncompressed size (${MAX_FILE_UNCOMPRESSED_SIZE} bytes)`);
      }

      const crc = zlib.crc32(uncompressedData);

      let compressedData = uncompressedData;
      let method = 0; // STORE

      if (useCompression && uncompressedSize > 0) {
        const deflated = zlib.deflateRawSync(uncompressedData);
        if (deflated.length < uncompressedSize) {
          compressedData = deflated;
          method = 8; // DEFLATE
        }
      }

      const compressedSize = compressedData.length;

      // 1. Local File Header (30 bytes + filename)
      const localHdr = Buffer.alloc(30 + filenameBuf.length);
      localHdr.writeUInt32LE(0x04034b50, 0); // Signature
      localHdr.writeUInt16LE(20, 4);          // Version needed (2.0)
      localHdr.writeUInt16LE(0x0800, 6);      // Flags (bit 11: UTF-8)
      localHdr.writeUInt16LE(method, 8);      // Compression method
      localHdr.writeUInt16LE(0, 10);          // Mod time
      localHdr.writeUInt16LE(0, 12);          // Mod date
      localHdr.writeUInt32LE(crc, 14);        // CRC-32
      localHdr.writeUInt32LE(compressedSize, 18);   // Compressed size
      localHdr.writeUInt32LE(uncompressedSize, 22); // Uncompressed size
      localHdr.writeUInt16LE(filenameBuf.length, 26); // Filename len
      localHdr.writeUInt16LE(0, 28);          // Extra field len
      filenameBuf.copy(localHdr, 30);

      localHeaders.push(localHdr, compressedData);

      // 2. Central Directory Header (46 bytes + filename)
      const centralHdr = Buffer.alloc(46 + filenameBuf.length);
      centralHdr.writeUInt32LE(0x02014b50, 0); // Signature
      centralHdr.writeUInt16LE(20, 4);          // Version made by
      centralHdr.writeUInt16LE(20, 6);          // Version needed
      centralHdr.writeUInt16LE(0x0800, 8);      // Flags (UTF-8)
      centralHdr.writeUInt16LE(method, 10);     // Compression method
      centralHdr.writeUInt16LE(0, 12);          // Mod time
      centralHdr.writeUInt16LE(0, 14);          // Mod date
      centralHdr.writeUInt32LE(crc, 16);        // CRC-32
      centralHdr.writeUInt32LE(compressedSize, 20);   // Compressed size
      centralHdr.writeUInt32LE(uncompressedSize, 24); // Uncompressed size
      centralHdr.writeUInt16LE(filenameBuf.length, 28); // Filename len
      centralHdr.writeUInt16LE(0, 30);          // Extra len
      centralHdr.writeUInt16LE(0, 32);          // Comment len
      centralHdr.writeUInt16LE(0, 34);          // Disk start
      centralHdr.writeUInt16LE(0, 36);          // Internal attr
      centralHdr.writeUInt32LE(0, 38);          // External attr
      centralHdr.writeUInt32LE(currentOffset, 42); // Local header offset
      filenameBuf.copy(centralHdr, 46);

      centralHeaders.push(centralHdr);

      currentOffset += localHdr.length + compressedSize;
    }

    const centralDirectory = Buffer.concat(centralHeaders);
    const centralDirOffset = currentOffset;
    const centralDirSize = centralDirectory.length;

    // 3. End of Central Directory (EOCD) (22 bytes)
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0);       // Signature
    eocd.writeUInt16LE(0, 4);                // Disk number
    eocd.writeUInt16LE(0, 6);                // Start disk
    eocd.writeUInt16LE(entries.length, 8);   // Entries on this disk
    eocd.writeUInt16LE(entries.length, 10);  // Total entries
    eocd.writeUInt32LE(centralDirSize, 12);  // Central dir size
    eocd.writeUInt32LE(centralDirOffset, 16);// Central dir offset
    eocd.writeUInt16LE(0, 20);               // Comment len

    return Buffer.concat([...localHeaders, centralDirectory, eocd]);
  }

  /**
   * Sanitizes and validates an entry path against Path Traversal and malformed paths.
   */
  static sanitizeAndValidatePath(rawPath: string): string {
    if (!rawPath || typeof rawPath !== 'string') {
      throw new Error('Invalid or empty file path in ZIP entry');
    }

    // Replace backslashes with forward slashes for cross-platform consistency
    let normalized = rawPath.replace(/\\/g, '/');

    // Reject absolute paths (starting with / or drive letters like C:)
    if (normalized.startsWith('/') || /^[a-zA-Z]:/.test(normalized)) {
      throw new Error(`Security violation: Absolute path not allowed in ZIP entry: ${rawPath}`);
    }

    // Split into segments and check for directory traversal (..)
    const segments = normalized.split('/');
    for (const seg of segments) {
      if (seg === '..') {
        throw new Error(`Security violation: Directory traversal (..) detected in ZIP entry: ${rawPath}`);
      }
      if (seg === '' && segments.indexOf(seg) !== segments.length - 1) {
        // Empty segments other than trailing slash
        throw new Error(`Security violation: Malformed path with empty segments: ${rawPath}`);
      }
    }

    // Remove leading/trailing whitespace or null bytes
    normalized = normalized.trim();
    if (normalized.includes('\0')) {
      throw new Error('Security violation: Null byte detected in file path');
    }

    return normalized;
  }

  /**
   * Unpacks a ZIP buffer with strict hardening checks against Zip Bombs,
   * Path Traversal, oversized entries, and CRC/size mismatches.
   */
  static unpack(buffer: Buffer): Map<string, Buffer> {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid input: expected Buffer');
    }

    if (buffer.length > MAX_ZIP_FILE_SIZE) {
      throw new Error(`ZIP archive exceeds maximum allowed file size (${MAX_ZIP_FILE_SIZE} bytes)`);
    }

    if (buffer.length < 22) {
      throw new Error(`Invalid ZIP container: buffer too small (${buffer.length} bytes)`);
    }

    // Find EOCD signature scanning backwards
    let eocdOffset = -1;
    for (let i = buffer.length - 22; i >= 0; i--) {
      if (buffer.readUInt32LE(i) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }

    if (eocdOffset === -1) {
      throw new Error('Invalid ZIP container: End of Central Directory (EOCD) signature not found');
    }

    const totalEntries = buffer.readUInt16LE(eocdOffset + 10);
    const centralDirOffset = buffer.readUInt32LE(eocdOffset + 16);

    if (totalEntries > MAX_ENTRIES) {
      throw new Error(`ZIP archive exceeds maximum allowed entries limit (${totalEntries} > ${MAX_ENTRIES})`);
    }

    if (centralDirOffset >= buffer.length) {
      throw new Error('Invalid ZIP container: Central Directory offset out of bounds');
    }

    const files = new Map<string, Buffer>();
    let ptr = centralDirOffset;
    let totalUncompressedSize = 0;

    for (let i = 0; i < totalEntries; i++) {
      if (ptr + 46 > buffer.length) {
        throw new Error(`Truncated ZIP central directory at entry ${i}`);
      }

      const sig = buffer.readUInt32LE(ptr);
      if (sig !== 0x02014b50) {
        throw new Error(`Invalid central directory header signature at entry ${i}: 0x${sig.toString(16)}`);
      }

      const method = buffer.readUInt16LE(ptr + 10);
      const expectedCrc = buffer.readUInt32LE(ptr + 16);
      const compressedSize = buffer.readUInt32LE(ptr + 20);
      const uncompressedSize = buffer.readUInt32LE(ptr + 24);
      const filenameLen = buffer.readUInt16LE(ptr + 28);
      const extraLen = buffer.readUInt16LE(ptr + 30);
      const commentLen = buffer.readUInt16LE(ptr + 32);
      const localHdrOffset = buffer.readUInt32LE(ptr + 42);

      // Validate compression method (only 0 = STORE, 8 = DEFLATE allowed)
      if (method !== 0 && method !== 8) {
        throw new Error(`Unsupported or unsafe compression method (${method}) for entry ${i}`);
      }

      // Validate individual and cumulative uncompressed size limits (Zip Bomb defense)
      if (uncompressedSize > MAX_FILE_UNCOMPRESSED_SIZE) {
        throw new Error(`Zip Bomb defense: Entry uncompressed size (${uncompressedSize} B) exceeds max file limit (${MAX_FILE_UNCOMPRESSED_SIZE} B)`);
      }

      totalUncompressedSize += uncompressedSize;
      if (totalUncompressedSize > MAX_TOTAL_UNCOMPRESSED_SIZE) {
        throw new Error(`Zip Bomb defense: Cumulative uncompressed size (${totalUncompressedSize} B) exceeds max total limit (${MAX_TOTAL_UNCOMPRESSED_SIZE} B)`);
      }

      if (filenameLen === 0 || ptr + 46 + filenameLen > buffer.length) {
        throw new Error(`Invalid filename length in central directory at entry ${i}`);
      }

      const rawFilename = buffer.toString('utf8', ptr + 46, ptr + 46 + filenameLen);
      const filename = ZipContainer.sanitizeAndValidatePath(rawFilename);

      if (files.has(filename)) {
        throw new Error(`Security violation: Duplicate entry name detected in ZIP archive: ${filename}`);
      }

      ptr += 46 + filenameLen + extraLen + commentLen;

      // Read from local header
      if (localHdrOffset + 30 > buffer.length) {
        throw new Error(`Truncated local file header for ${filename}`);
      }

      const localSig = buffer.readUInt32LE(localHdrOffset);
      if (localSig !== 0x04034b50) {
        throw new Error(`Invalid local header signature for ${filename}: 0x${localSig.toString(16)}`);
      }

      const localFilenameLen = buffer.readUInt16LE(localHdrOffset + 26);
      const localExtraLen = buffer.readUInt16LE(localHdrOffset + 28);
      const dataOffset = localHdrOffset + 30 + localFilenameLen + localExtraLen;

      if (dataOffset + compressedSize > buffer.length) {
        throw new Error(`Truncated file payload for ${filename}`);
      }

      const rawData = buffer.subarray(dataOffset, dataOffset + compressedSize);
      let extractedData: Buffer;

      if (method === 0) {
        extractedData = Buffer.from(rawData);
      } else if (method === 8) {
        try {
          extractedData = zlib.inflateRawSync(rawData);
        } catch (inflateErr: any) {
          throw new Error(`Failed to decompress entry ${filename}: ${inflateErr.message}`);
        }
      } else {
        throw new Error(`Unsupported compression method ${method} for ${filename}`);
      }

      if (extractedData.length !== uncompressedSize) {
        throw new Error(
          `Decompressed size mismatch for ${filename}: expected ${uncompressedSize}, got ${extractedData.length}`
        );
      }

      const actualCrc = zlib.crc32(extractedData);
      if (actualCrc !== expectedCrc) {
        throw new Error(
          `CRC-32 checksum mismatch for ${filename}: expected 0x${expectedCrc.toString(16)}, got 0x${actualCrc.toString(16)}`
        );
      }

      files.set(filename, extractedData);
    }

    return files;
  }
}
