import path from 'node:path';
import { validatePublicOkf } from '../lib/okf-public.mjs';

const rootDir = process.cwd();
const result = await validatePublicOkf({
  rootDir,
  manifestPath: 'config/okf-public-sources.v1.json',
  outputDir: path.join(rootDir, 'public', 'okf', 'v0.2'),
});

console.log(`Validated ${result.conceptCount} OKF concepts across ${result.fileCount} files.`);
