import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {build} from 'esbuild';

const require=createRequire(import.meta.url);
const source=Buffer.from(`
 export class OwnRollbackFixture {}
 export default {async fetch(request,env){
  if(env.SYNTHETIC_MODE==='open')return new Response(null,{status:200});
  if(env.SYNTHETIC_MODE==='egress')await fetch('https://blocked.invalid');
  if(env.SYNTHETIC_ROLE==='canaryClosed'){
   const {origin,pathname}=new URL(request.url);
   if(origin!=='https://delegated-canary.agentfriendlyweb.dev')return new Response(null,{status:500});
   if(['/authorize','/monitoring'].includes(pathname)&&env.SYNTHETIC_MODE!=='generic-denial'){
    return new Response('<h1>Esta prueba está en pausa</h1>',{status:404,headers:{'content-type':'text/html'}});
   }
  }
  return new Response(null,{status:404});
 }};
`);
const members={qaClosed:'closed-rollback.mjs',canary:'index.mjs',operator:'index.mjs'};
const sources=Object.fromEntries(Object.keys(members).map(role=>[role,Buffer.concat([source,Buffer.from('\n// '+role)])]));
const qaVersion='11111111-1111-4111-8111-111111111111';
const fixturePins=modules=>Object.fromEntries(Object.entries(members).map(([role,name])=>[role,{id:role==='qaClosed'?qaVersion:undefined,module:{
 name,bytes:modules[role].length,sha256:createHash('sha256').update(modules[role]).digest('hex')
}}]));
const frame=Buffer.concat(Object.values(sources));
const metadata=(mode='closed')=>Object.fromEntries(['qaClosed','canaryClosed','operatorClosed'].map(role=>[role,{
 compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],
 ...(role==='operatorClosed'?{}:{exports:{[mode==='wrong-provider-export'?'WrongRollbackClass':'OwnRollbackFixture']:{type:'durable-object',storage:'sqlite'}}}),
 bindings:[{name:'SYNTHETIC_MODE',type:'plain_text',text:mode},{name:'SYNTHETIC_ROLE',type:'plain_text',text:role}]
}]));

async function fixtureVerifier(modules){
 const pins=fixturePins(modules);
 const modulePath=fileURLToPath(new URL('../scripts/verify-finite-native-rollback.mjs',import.meta.url));
 const compiled=await build({stdin:{contents:`export * from ${JSON.stringify(modulePath)};\nexport {createQaPreEntryCustodyContext} from './lib/mcp-qa-finite-pre-entry-context.mjs';`,
  resolveDir:fileURLToPath(new URL('..',import.meta.url))},bundle:true,write:false,format:'esm',platform:'node',
  plugins:[{name:'synthetic-archive-pins',setup(builder){
   builder.onResolve({filter:/^(?:esbuild|miniflare|typescript)$/},args=>({path:pathToFileURL(require.resolve(args.path)).href,external:true}));
   builder.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({
    contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins)+';',loader:'js'
   }));
  }}]
 });
 return import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].contents).toString('base64'));
}

test('rollback mount probe checks exact bytes, closed routes and denied egress in Workerd',async()=>{
 const {verifyFiniteRollbackMounts}=await fixtureVerifier(sources);
 assert.deepEqual(await verifyFiniteRollbackMounts(frame,metadata()),{
  exactModuleCount:3,deniedRouteCount:10,operationalReadiness:false,
  moduleExports:{qaClosed:['OwnRollbackFixture','default'],canaryClosed:['OwnRollbackFixture','default'],operatorClosed:['OwnRollbackFixture','default']}
 });
 const corrupt=Buffer.from(frame);corrupt[0]^=1;
 for(const [bytes,config] of [[corrupt,metadata()],[frame,metadata('open')],[frame,metadata('egress')],[frame,metadata('generic-denial')],[frame,metadata('wrong-provider-export')]]){
  await assert.rejects(verifyFiniteRollbackMounts(bytes,config),{message:'Finite private rollback mounts unavailable'});
 }
});

test('rollback cannot attest a partial export inventory from an external wildcard',async()=>{
 const {readArchivedExports}=await import('../scripts/verify-finite-native-rollback.mjs');
 const archivedBytes=Buffer.concat([sources.operator,Buffer.from("\nexport /* namespace */ * from 'node:buffer';")]);
 await assert.rejects(readArchivedExports(archivedBytes,'index.mjs'),
  {message:'Finite private rollback mounts unavailable'});
});

test('an explicit namespace alias belongs to the exact export inventory',async()=>{
 const {readArchivedExports}=await import('../scripts/verify-finite-native-rollback.mjs');
 const bytes=Buffer.from("export default {}; export * as BufferAlias from 'node:buffer';");
 assert.deepEqual(await readArchivedExports(bytes,'index.mjs'),['BufferAlias','default']);
});

test('QA custody assembly binds all three module bytes to the source, pinned rollback and exact clock',async()=>{
 const {assembleQaPreEntryCustody,createQaPreEntryCustodyContext}=await fixtureVerifier(sources);
 assert.equal(typeof assembleQaPreEntryCustody,'function');
 const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
 const sourceRevision='a'.repeat(40),sourceTree='b'.repeat(40),code=Buffer.from('export default {};');
 const baseline=Buffer.from(sources.qaClosed);
 const staging={sourceRevision,sourceTree,files:{'qaCustodyProbe/index.mjs':code},custodyProbeTemplate:{
  sourceRevision,sourceTree,authorizesEffects:false,operationalReadiness:false,
  module:{name:'index.mjs',bytes:code.length,sha256:digest(code)}
 }};
 const inputs={sourceRevision,releaseZipSha256:'d'.repeat(64),startAt:100,expiresAt:200};
 const context=createQaPreEntryCustodyContext(inputs);
 const {modules,receipt}=assembleQaPreEntryCustody({staging,baseline,context});
 assert.equal(receipt.sourceRevision,sourceRevision);
 assert.equal(receipt.sourceTree,sourceTree);
 assert.equal(receipt.releaseZipSha256,inputs.releaseZipSha256);
 assert.equal(receipt.observationId,context.id);
 assert.equal(receipt.baselineVersionId,qaVersion);
 assert.equal(receipt.authorizesDeployment,false);
 assert.deepEqual(receipt.modules,modules.map(({path,contents})=>({path,bytes:contents.length,sha256:digest(contents)})));
 const {assemblySha256,...body}=receipt;
 assert.equal(assemblySha256,digest(JSON.stringify(body)));
 assert.equal(assembleQaPreEntryCustody({staging,baseline,context}).receipt.assemblySha256,assemblySha256);
 for(const input of [{...inputs,expiresAt:201},{...inputs,releaseZipSha256:'e'.repeat(64)}]){
  const changed=createQaPreEntryCustodyContext(input);
  assert.notEqual(assembleQaPreEntryCustody({staging,baseline,context:changed}).receipt.assemblySha256,assemblySha256);
 }
 for(const input of [{baseline:Buffer.alloc(baseline.length)},{context:{...context,expiresAt:201}},
  {staging:{...staging,sourceTree:'c'.repeat(40)}},
  {staging:{...staging,files:{'qaCustodyProbe/index.mjs':Buffer.alloc(code.length)}}}]){
  assert.throws(()=>assembleQaPreEntryCustody({staging,baseline,context,...input}),/unavailable/);
 }
});
