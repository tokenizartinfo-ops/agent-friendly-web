import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { validatePublicOkf } from '../lib/okf-public.mjs';

const rootDir = process.cwd();
const checksumModule = await readFile(
  path.join(rootDir, 'app', 'okf', 'v0.2', 'CHECKSUMS.sha256', 'checksums.generated.ts'),
  'utf8',
);
const checksumMatch = /export const OKF_V02_CHECKSUMS = ("[\s\S]*");\n/.exec(checksumModule);
if (!checksumMatch) throw new Error('Generated checksum module is malformed');
const checksumText = JSON.parse(checksumMatch[1]);
const result = await validatePublicOkf({
  rootDir,
  manifestPath: 'config/okf-public-sources.v1.json',
  outputDir: path.join(rootDir, 'public', 'okf', 'v0.2'),
  checksumText,
});

console.log(`Validated ${result.conceptCount} OKF concepts across ${result.fileCount} files.`);
