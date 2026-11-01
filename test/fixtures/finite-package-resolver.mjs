import {build} from 'esbuild';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {QA_CLOUD_CLOSED_PINS} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
import {createHash} from 'node:crypto';
// Explicit synthetic SOURCE receipt mapping for transport tests. Production
// has no injectable pins; actual receipt blob checks still use committed bytes.
const bytes=Buffer.from("throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n");
const pins=structuredClone(QA_CLOUD_CLOSED_PINS);
for(const [key,p] of Object.entries(pins))p.module={name:key==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
const b=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-package.mjs';export * from './lib/mcp-qa-finite-source.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as cr} from 'node:module';const require=cr(process.cwd()+'/package.json');"},plugins:[{name:'synthetic-literal-receipts',setup(api){
 api.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins),loader:'js'}));
 api.onLoad({filter:/mcp-qa-finite-package\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8')).replace("fileURLToPath(new URL('../scripts/verify-qa-finite-archive.py',import.meta.url))",JSON.stringify(resolve('scripts/verify-qa-finite-archive.py'))),loader:'js'}));
}}]});
const api=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64'));
export const resolveFiniteNativePackage=api.resolveFiniteNativePackage;
export const resolvePrivateQaFiniteExternalSource=api.resolvePrivateQaFiniteExternalSource;
