import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { crawlerCatalogPayload } from '../lib/crawler-catalog.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'public', '.well-known', 'crawler-policy-catalog.json');

await mkdir(dirname(target), { recursive: true });
await writeFile(target, `${JSON.stringify(crawlerCatalogPayload(), null, 2)}\n`, 'utf8');

console.log(`Generated ${target}`);
