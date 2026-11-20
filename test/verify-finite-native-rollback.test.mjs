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
const fixturePins=modules=>Object.fromEntries(Object.entries(members).map(([role,name])=>[role,{module:{
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
 const compiled=await build({entryPoints:[modulePath],bundle:true,write:false,format:'esm',platform:'node',
  plugins:[{name:'synthetic-archive-pins',setup(builder){
   builder.onResolve({filter:/^(?:esbuild|miniflare)$/},args=>({path:pathToFileURL(require.resolve(args.path)).href,external:true}));
   builder.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({
    contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins)+';',loader:'js'
   }));
  }}]
 });
 const {verifyFiniteRollbackMounts}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].contents).toString('base64'));
 return verifyFiniteRollbackMounts;
}

test('rollback mount probe checks exact bytes, closed routes and denied egress in Workerd',async()=>{
 const verifyFiniteRollbackMounts=await fixtureVerifier(sources);
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
 const modules={...sources,operator:Buffer.concat([sources.operator,Buffer.from("\nexport /* namespace */ * from 'node:buffer';")])};
 const verify=await fixtureVerifier(modules);
 await assert.rejects(verify(Buffer.concat(Object.values(modules)),metadata()),
  {message:'Finite private rollback mounts unavailable'});
});
