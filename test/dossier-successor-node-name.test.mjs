import test from 'node:test';
import assert from 'node:assert/strict';
import {readDossierEventHostPolicy} from '../lib/dossier-event-rpc-authority.mjs';
const name='afw-own-event-first-successor-v1';
function fixture(){
 let gets=0;
 const resource='https://delegated-canary.agentfriendlyweb.dev/mcp',window={startAt:1000,expiresAt:601000};
 const node={idFromName(n){assert.equal(n,name);return{toString:()=> 'a'.repeat(64)};},idFromString:id=>({toString:()=>id}),get(){gets++;throw Error('Unexpected IO');}};
 const manifest={scope:{accountId:'1'.repeat(32),namespaceId:'2'.repeat(32),workerName:'agent-friendly-web-delegated-canary',applicationId:'app',ownerRef:'3'.repeat(64),projectRef:'4'.repeat(64),resource},original:{containerId:'b'.repeat(64),applicationId:'app',programHash:'5'.repeat(64),sourceRevision:'6'.repeat(40)},candidate:{trialId:'7'.repeat(64),programHash:'8'.repeat(64),sourceRevision:'9'.repeat(40),...window,budget:1},publication:{artifactKey:'c'.repeat(64),workerHash:'d'.repeat(64),activationKey:'e'.repeat(64)}};
 const policy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource,...window};
 const env={AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_NODE_NAME:name,AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy),AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify(manifest),AFW_OAUTH_ISSUER:resource.slice(0,-4),AFW_OAUTH_RESOURCE:resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',DB:{prepare(){}},AFW_DOSSIER_EVENTS_NODE:node};
 return{env,manifest,policy,node,gets:()=>gets,read:(historical=false)=>readDossierEventHostPolicy({enabled:true,env,historical,now:()=>historical?700000:2000})};
}
test('fixed successor resolves through same binding without a caller ID or storage IO',()=>{const f=fixture(),r=f.read();assert.equal(r.policy.containerId,'a'.repeat(64));assert.equal(f.gets(),0);r.current();});
test('successor live name requires enabled matching manifest and rejects original reuse',()=>{
 for(const mode of ['disabled','absent','window','original','resource','mixed']){const f=fixture();
  if(mode==='disabled')f.env.AFW_DOSSIER_SUCCESSOR_ENABLED='false';
  if(mode==='absent')delete f.env.AFW_DOSSIER_SUCCESSOR_POLICY;
  if(mode==='window')f.manifest.candidate.expiresAt--;
  if(mode==='original')f.manifest.original.containerId='a'.repeat(64);
  if(mode==='resource')f.manifest.scope.resource='https://other.invalid/mcp';
  if(mode==='mixed')f.env.AFW_DOSSIER_EVENTS_POLICY=JSON.stringify({...f.policy,containerId:'a'.repeat(64)});
  if(['window','original','resource'].includes(mode))f.env.AFW_DOSSIER_SUCCESSOR_POLICY=JSON.stringify(f.manifest);
  assert.throws(()=>f.read(),mode);assert.equal(f.gets(),0);
 }
});
test('successor configuration drift invalidates a live resolution',()=>{for(const key of ['AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_SUCCESSOR_POLICY']){const f=fixture(),r=f.read();delete f.env[key];assert.throws(()=>r.current());}});
test('historical close resolves same fixed actor after expiry without successor permission',()=>{const f=fixture();f.env.AFW_DOSSIER_EVENTS_ENABLED='false';delete f.env.AFW_DOSSIER_SUCCESSOR_ENABLED;delete f.env.AFW_DOSSIER_SUCCESSOR_POLICY;assert.equal(f.read(true).policy.containerId,'a'.repeat(64));assert.throws(()=>f.read());assert.equal(f.gets(),0);});

test('native successor name matches actual ctx and remains distinct from original with zero stored rows',async()=>{
 const {build}=await import('esbuild'),{Miniflare,convertV4MiniflareOptions}=await import('miniflare'),f=fixture();
 const {DB,AFW_DOSSIER_EVENTS_NODE,...bindings}=f.env;
 const contents=`import {DurableObject} from 'cloudflare:workers';import {readDossierEventHostPolicy} from './lib/dossier-event-rpc-authority.mjs';
 export class Own extends DurableObject{async fetch(){const env={...${JSON.stringify(bindings)},DB:this.env.DB,AFW_DOSSIER_EVENTS_NODE:this.env.NODE};const manifest=JSON.parse(env.AFW_DOSSIER_SUCCESSOR_POLICY);manifest.original.containerId=this.env.NODE.idFromName('afw-own-event-one-occurrence-v1').toString();env.AFW_DOSSIER_SUCCESSOR_POLICY=JSON.stringify(manifest);const c=readDossierEventHostPolicy({enabled:true,env,now:()=>2000});return Response.json({same:c.policy.containerId===this.ctx.id.toString(),distinct:c.policy.containerId!==manifest.original.containerId,rows:(await this.ctx.storage.list()).size});}}
 export default{fetch(request,env){return env.NODE.get(env.NODE.idFromName('${name}')).fetch(request);}};`;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*','cloudflare:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:b.outputFiles[0].text,durableObjects:{NODE:{className:'Own',useSQLite:true}},d1Databases:{DB:'empty-successor-name'}}));
 try{const r=await runtime.dispatchFetch('https://synthetic.invalid/identity');assert.equal(r.status,200);assert.deepEqual(await r.json(),{same:true,distinct:true,rows:0});}finally{await runtime.dispose();}
});
