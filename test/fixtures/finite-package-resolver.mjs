import {build} from 'esbuild';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {QA_CLOUD_CLOSED_PINS} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
// Explicit synthetic SOURCE receipt mapping for transport tests. Production
// has no injectable pins; actual receipt blob checks still use committed bytes.
const bytes=Buffer.from("throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n");
const pins=structuredClone(QA_CLOUD_CLOSED_PINS);
for(const [key,p] of Object.entries(pins))p.module={name:key==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
const b=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-package.mjs';export * from './lib/mcp-qa-finite-source.mjs';export {finitePublicStaticExpectation} from './lib/mcp-qa-finite-profile.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as cr} from 'node:module';const require=cr(process.cwd()+'/package.json');"},plugins:[{name:'synthetic-literal-receipts',setup(api){
 api.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins),loader:'js'}));
 api.onLoad({filter:/mcp-qa-finite-package\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8')).replace("fileURLToPath(new URL('../scripts/verify-qa-finite-archive.py',import.meta.url))",JSON.stringify(resolve('scripts/verify-qa-finite-archive.py'))),loader:'js'}));
}}]});
const api=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64'));
export const resolveFiniteNativePackage=api.resolveFiniteNativePackage;
export const resolvePrivateQaFiniteExternalSource=api.resolvePrivateQaFiniteExternalSource;
export const verifyFinitePrivateR2Draft=api.verifyFinitePrivateR2Draft;
export const createFinitePrivateR2Locator=api.createFinitePrivateR2Locator;
export const verifyFiniteReleaseArchive=api.verifyFiniteReleaseArchive;
export const finitePublicStaticExpectation=api.finitePublicStaticExpectation;

export function finitePrivateLocatorZip(value){
 const python='import sys,zipfile,io; b=io.BytesIO(); z=zipfile.ZipFile(b,"w"); z.writestr("locator.json",sys.stdin.buffer.read()); z.close(); sys.stdout.buffer.write(b.getvalue())';
 const data=JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a],[b])=>a<b?-1:a>b?1:0)));
 const made=spawnSync('python3',['-I','-B','-c',python],{input:data,timeout:5000,maxBuffer:65536});
 if(made.status!==0)throw Error('Synthetic locator ZIP unavailable');
 return made.stdout;
}

export function finiteR2TestUrl(sourceRevision,at,draft=false){
 const stamp=new Date(at-1000).toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
 const api='https://afw-release-backups.85d0d5dadac3341a564f22ce885e9eec.r2.cloudflarestorage.com';
 const q=new URLSearchParams({'X-Amz-Algorithm':'AWS4-HMAC-SHA256',
  'X-Amz-Credential':'1'.repeat(32)+'/'+stamp.slice(0,8)+'/auto/s3/aws4_request',
  'X-Amz-Date':stamp,'X-Amz-Expires':'600','X-Amz-SignedHeaders':'host','X-Amz-Signature':'2'.repeat(64)});
 return api+'/'+(draft?'finite-bundles-v1':'finite-packages-v2')+'/'+sourceRevision+'.zip?'+q;
}
