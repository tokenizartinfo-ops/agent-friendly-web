import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {build} from 'esbuild';

const require=createRequire(import.meta.url);
const source=Buffer.from(`
 export default {async fetch(_request,env){
  if(env.SYNTHETIC_MODE==='open')return new Response(null,{status:200});
  if(env.SYNTHETIC_MODE==='egress')await fetch('https://blocked.invalid');
  return new Response(null,{status:404});
 }};
`);
const members={qaClosed:'closed-rollback.mjs',canary:'index.mjs',operator:'index.mjs'};
const pins=Object.fromEntries(Object.entries(members).map(([role,name])=>[role,{module:{
 name,bytes:source.length,sha256:createHash('sha256').update(source).digest('hex')
}}]));
const frame=Buffer.concat([source,source,source]);
const metadata=(mode='closed')=>Object.fromEntries(['qaClosed','canaryClosed','operatorClosed'].map(role=>[role,{
 compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],
 bindings:[{name:'SYNTHETIC_MODE',type:'plain_text',text:mode}]
}]));

test('rollback mount probe checks exact bytes, closed routes and denied egress in Workerd',async()=>{
 const modulePath=fileURLToPath(new URL('../scripts/verify-finite-native-rollback.mjs',import.meta.url));
 const compiled=await build({entryPoints:[modulePath],bundle:true,write:false,format:'esm',platform:'node',
  plugins:[{name:'synthetic-archive-pins',setup(builder){
   builder.onResolve({filter:/^miniflare$/},()=>({path:pathToFileURL(require.resolve('miniflare')).href,external:true}));
   builder.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({
    contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins)+';',loader:'js'
   }));
  }}]
 });
 const {verifyFiniteRollbackMounts}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].contents).toString('base64'));
 assert.deepEqual(await verifyFiniteRollbackMounts(frame,metadata()),{
  exactModuleCount:3,deniedRouteCount:10,operationalReadiness:false
 });
 const corrupt=Buffer.from(frame);corrupt[0]^=1;
 for(const [bytes,config] of [[corrupt,metadata()],[frame,metadata('open')],[frame,metadata('egress')]]){
  await assert.rejects(verifyFiniteRollbackMounts(bytes,config),{message:'Finite private rollback mounts unavailable'});
 }
});
