import path from 'node:path';
import { generatePublicOkf } from '../lib/okf-public.mjs';

const rootDir = process.cwd();
const result = await generatePublicOkf({
  rootDir,
  manifestPath: 'config/okf-public-sources.v1.json',
  outputDir: path.join(rootDir, 'public', 'okf', 'v0.2'),
});

console.log(`Generated ${result.conceptCount} OKF concepts across ${result.fileCount} files.`);
