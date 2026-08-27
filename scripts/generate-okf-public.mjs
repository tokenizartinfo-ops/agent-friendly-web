import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { generatePublicOkf } from '../lib/okf-public.mjs';

const rootDir = process.cwd();
const result = await generatePublicOkf({
  rootDir,
  manifestPath: 'config/okf-public-sources.v1.json',
  outputDir: path.join(rootDir, 'public', 'okf', 'v0.2'),
});

const checksumPath = path.join(rootDir, 'public', 'okf', 'v0.2', 'CHECKSUMS.sha256');
const checksumModulePath = path.join(rootDir, 'app', 'okf', 'v0.2', 'CHECKSUMS.sha256', 'checksums.generated.ts');
const checksumText = await readFile(checksumPath, 'utf8');
await mkdir(path.dirname(checksumModulePath), { recursive: true });
await writeFile(checksumModulePath, `export const OKF_V02_CHECKSUMS = ${JSON.stringify(checksumText)};\n`, 'utf8');
await rm(checksumPath);

console.log(`Generated ${result.conceptCount} OKF concepts across ${result.fileCount} files.`);
