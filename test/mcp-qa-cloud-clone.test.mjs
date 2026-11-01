import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {qaClosedHttpFixture} from './fixtures/qa-closed-http.mjs';
const CANDIDATE='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',ACTIVATE='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',RESTORE='cccccccc-cccc-4ccc-8ccc-cccccccccccc';
async function fixture(){
 const f=qaClosedHttpFixture();f.version=f.pins.qaClosed.id;const at=f.wall,source='a'.repeat(40),now=()=>f.wall;
 const built=await build({stdin:{contents:"export {validateQaLifecycleCommand,assertQaLifecycleWindow} from './lib/mcp-qa-cloud-lifecycle-admission.mjs';export {runQaClosedCloudClone} from './lib/mcp-qa-cloud-clone.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'test-compiled-pins',setup(b){b.onResolve({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({path:'pins',namespace:'test-pins'}));b.onLoad({filter:/.*/,namespace:'test-pins'},()=>({contents:'export const QA_CLOUD_CLOSED_PINS=Object.freeze('+JSON.stringify(f.pins)+');',loader:'js'}));}}]});
 const api=await import('data:text/javascript;base64,'+Buffer.from(built.outputFiles[0].text).toString('base64'));
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000100,body:'/afw-qa-deploy-observe-restore v1 '+source,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}};
 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'41200000100',runAttempt:'1',sourceRevision:source};
 const admissionMono=performance.now();
 const admission=api.validateQaLifecycleCommand({event,context,now});
 const normal=f.fetch,posts={upload:0,activate:0,restore:0};let annotation=null,postRestoreQaReads=0;
 let mode=null;const response=(result,status=200)=>new Response(JSON.stringify({success:true,errors:[],messages:[],result}),{status,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
 const fetchImpl=async(input,init)=>{
  const url=new URL(input),p=url.pathname;
  if(url.origin==='https://www.cloudflarestatus.com'){
   f.requests.push({url,init});assert.equal(p,'/api/v2/incidents/unresolved.json');assert.equal(init.method,'GET');assert.equal(Object.keys(init.headers).some(k=>k.toLowerCase()==='authorization'),false);
   return new Response(JSON.stringify({incidents:mode==='providerIncident'?[{id:'synthetic',name:'Workers errors',status:'investigating'}]:mode==='unrelatedIncident'?[{id:'other',name:'Email routing statistics',status:'investigating',components:[{name:'Email Routing'}]}]:[]}),{status:200,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
  }
  if(url.origin==='https://api.cloudflare.com'&&init.method==='POST'){
   f.requests.push({url,init});assert.equal(init.redirect,'error');assert.equal(init.cache,'no-store');assert.ok(init.signal instanceof AbortSignal);
   const body=JSON.parse(init.body);
   if(p.endsWith('/versions')){
    posts.upload++;assert.equal(p,'/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/'+f.pins.qaClosed.name+'/versions');assert.equal(url.searchParams.get('deploy'),'false');assert.equal(body.modules.length,1);assert.deepEqual(body.modules,f.versions[f.pins.qaClosed.id].modules);
    assert.deepEqual(body.bindings,f.versions[f.pins.qaClosed.id].bindings.map(b=>({name:b.name,type:'inherit',version_id:f.pins.qaClosed.id})));assert.equal(body.annotations['workers/tag'],admission.intentId);
    assert.equal(Object.hasOwn(body,'migrations'),false);assert.equal(Object.hasOwn(body,'migration_tag'),false);
    const v=structuredClone(f.versions[f.pins.qaClosed.id]);v.id=CANDIDATE;v.annotations=body.annotations;f.versions[CANDIDATE]=v;
    if(mode==='tagMismatch')v.annotations['workers/tag']='x'.repeat(64);
    if(mode==='moduleDrift')v.modules[0].content_base64=Buffer.from('PRIVATE_WRONG_MODULE').toString('base64');
    if(mode==='openFlag'||mode==='unexpectedOpenActivation')v.bindings[0].text='true';
    if(mode==='unexpectedActivation'||mode==='unexpectedOpenActivation'){f.version=CANDIDATE;f.deployment=ACTIVATE;annotation=body.annotations['workers/message'];}
    if(mode==='uploadUnknown')throw Error('PRIVATE_UPLOAD_ACK');if(mode==='uploadNeverSettles')return new Promise(()=>{});
    return response({id:mode==='candidateEqualsBase'?f.pins.qaClosed.id:CANDIDATE});
   }
   assert.equal(p,'/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/'+f.pins.qaClosed.name+'/deployments');
   assert.equal(body.strategy,'percentage');assert.equal(body.versions.length,1);assert.equal(body.versions[0].percentage,100);
   if(body.versions[0].version_id===CANDIDATE){
    posts.activate++;if(mode==='activation403')return response(null,403);
    f.version=CANDIDATE;f.deployment=ACTIVATE;annotation=body.annotations['workers/message'];
    if(mode==='nominalExpires')f.wall=admission.expiresAt;
    if(mode==='cleanupExpires')f.wall=admission.cleanupExpiresAt;
    if(mode==='activationUnknown')throw Error('PRIVATE_ACTIVATION_ACK');
    if(mode==='foreignPointer'){f.version='dddddddd-dddd-4ddd-8ddd-dddddddddddd';f.deployment='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';annotation='foreign';}
    if(mode==='foreignDeploymentMessage')annotation='foreign';
    return response({id:ACTIVATE});
   }
   assert.equal(body.versions[0].version_id,f.pins.qaClosed.id);posts.restore++;
   if(mode==='restore403')return response(null,403);
   f.version=f.pins.qaClosed.id;f.deployment=RESTORE;annotation=body.annotations['workers/message'];
   if(mode==='restoreUnknown')throw Error('PRIVATE_RESTORE_ACK');return response({id:RESTORE});
  }
  if(url.origin==='https://api.cloudflare.com'&&p.endsWith('/'+f.pins.qaClosed.name+'/deployments')){
   if(mode==='cleanupNeverSettles'&&posts.restore&&++postRestoreQaReads>1)return new Promise(()=>{});
   f.requests.push({url,init});return response({deployments:[{id:f.deployment,strategy:'percentage',versions:[{version_id:f.version,percentage:100}],annotations:annotation?{'workers/message':annotation}:{}}]});
  }
  if(mode==='nominalNeverSettles'&&p.endsWith('/versions/'+CANDIDATE))return new Promise(()=>{});
  if(mode==='finalReadbackFailure'&&posts.restore&&p.endsWith('/tails'))return response([{id:'PRIVATE_ACTIVE_TAIL'}]);
  return normal(input,init);
 };
 return{f,api,admission,admissionMono,posts,fetchImpl,setMode(v){mode=v;},run:()=>api.runQaClosedCloudClone({admission,credential:'PRIVATE-cf-token-for-test',githubCredential:'PRIVATE-gh-token-for-test',fetchImpl,now}),event,context,now};
}
test('literal closed clone performs only upload/activate/restore once and independently closes all profiles',async()=>{
 const x=await fixture(),r=await x.run();assert.equal(r.purpose,'afw.qa-closed-cloud-clone.v1');assert.equal(r.status,'verified');assert.equal(r.controlPlaneOnly,true);assert.equal(r.nativeExecutionVerified,false);assert.equal(r.candidateVersionId,CANDIDATE);assert.equal(r.candidateObserved,true);assert.equal(r.restorationAcknowledged,true);assert.equal(r.finalClosedVerified,true);assert.equal(r.finalReadback.status,'closed');assert.equal(r.finalReadback.reads,25);assert.equal(r.finalReadback.profiles.qa.versionId,x.f.pins.qaClosed.id);assert.deepEqual(x.posts,{upload:1,activate:1,restore:1});assert.deepEqual(r.posts,x.posts);
 for(const k of ['authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);
 assert.equal(JSON.stringify(r).includes('PRIVATE'),false);assert.equal(JSON.stringify(r).includes('content_base64'),false);assert.equal(JSON.stringify(r).includes('SYNTHETIC_SECRET'),false);
 assert.ok(x.f.requests.every(q=>q.init.method==='GET'||q.url.origin==='https://api.github.com'||q.url.pathname.includes('/workers/workers/'+x.f.pins.qaClosed.name+'/versions')||q.url.pathname.endsWith('/workers/scripts/'+x.f.pins.qaClosed.name+'/deployments')));
 assert.equal(x.f.requests.some(q=>q.init.method==='POST'&&q.url.pathname.includes('/workflows/')),false);
});
for(const mode of ['providerIncident','candidateEqualsBase','tagMismatch','moduleDrift','openFlag']){
 test(mode+' never activates',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.activate,0);assert.equal(x.posts.restore,0);assert.equal(r.mayRetry,false);if(mode==='providerIncident')assert.equal(x.posts.upload,0);assert.equal(JSON.stringify(r).includes('PRIVATE'),false);});
}
for(const mode of ['uploadUnknown','activationUnknown','restoreUnknown']){
 test(mode+' retains uncertainty and never replays an effect',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.equal(r.status,'uncertain');assert.equal(r.uncertain,true);assert.ok(Object.values(x.posts).every(n=>n<=1));if(mode==='uploadUnknown')assert.equal(x.posts.activate,0);if(mode==='restoreUnknown'){assert.equal(r.restorationAcknowledged,false);assert.equal(r.finalClosedVerified,true);}assert.equal(r.mayRetry,false);assert.equal(JSON.stringify(r).includes('PRIVATE'),false);});
}
test('nominal expiry does not disable original-deadline cleanup',async()=>{const x=await fixture();x.setMode('nominalExpires');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.activate,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);assert.equal(x.f.version,x.f.pins.qaClosed.id);});
test('expired cleanup never authorizes restore or final proof',async()=>{const x=await fixture();x.setMode('cleanupExpires');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.restore,0);assert.equal(r.finalClosedVerified,false);assert.equal(r.mayRetry,false);});
test('upload unexpectedly activating the exact owned candidate triggers cleanup without normal activation',async()=>{const x=await fixture();x.setMode('unexpectedActivation');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.activate,0);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);});
for(const mode of ['foreignPointer','foreignDeploymentMessage']){
 test(mode+' cannot be overwritten by cleanup',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.restore,0);assert.equal(r.conflict,true);assert.equal(r.finalClosedVerified,false);});
}
test('403 activation does not widen scope, create Workflow or retry',async()=>{const x=await fixture();x.setMode('activation403');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.activate,1);assert.equal(x.posts.restore,0);assert.equal(r.finalClosedVerified,true);assert.equal(r.mayRetry,false);});
for(const mode of ['restore403','finalReadbackFailure'])test(mode+' never claims verified restoration',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,false);assert.equal(r.operationalReadiness,false);});
test('duplicate delivery cannot acquire another effect budget',async()=>{
 const x=await fixture();assert.equal((await x.run()).status,'verified');
 const a=x.api.validateQaLifecycleCommand({event:x.event,context:{...x.context,runId:'41200000101'},now:x.now});
 assert.equal(a.intentId,x.admission.intentId);
 const before={...x.posts},r=await x.api.runQaClosedCloudClone({admission:a,credential:'PRIVATE-cf-token-for-test',githubCredential:'PRIVATE-gh-token-for-test',fetchImpl:x.fetchImpl,now:x.now});
 assert.notEqual(r.status,'verified');assert.deepEqual(x.posts,before);
});
test('same admission object cannot reuse claim after successful run',async()=>{const x=await fixture();await x.run();const before={...x.posts};const r=await x.run();assert.notEqual(r.status,'verified');assert.deepEqual(x.posts,before);});
test('preflight drift denies claim and every CF write',async()=>{const x=await fixture();x.f.mutate=({url,response})=>{if(url.pathname.endsWith('/instances-v2'))response.body.result=[{id:'PRIVATE'}];};const r=await x.run();assert.notEqual(r.status,'verified');assert.deepEqual(x.posts,{upload:0,activate:0,restore:0});assert.equal(x.f.claims.size,0);});
test('low remaining nominal budget cannot claim or publish',async()=>{const x=await fixture();x.f.wall=x.admission.expiresAt-179999;const r=await x.run();assert.notEqual(r.status,'verified');assert.deepEqual(x.posts,{upload:0,activate:0,restore:0});assert.equal(x.f.claims.size,0);});

test('noncooperative upload is bounded, remains uncertain and cannot be retried',async()=>{
 const x=await fixture();x.setMode('uploadNeverSettles');const r=await x.run();assert.equal(r.status,'uncertain');assert.equal(x.posts.upload,1);assert.equal(x.posts.activate,0);assert.equal(x.posts.restore,0);assert.equal(r.finalClosedVerified,true);assert.equal(r.mayRetry,false);
});

test('unrelated provider product does not become an AFW runtime fault or block the fixed closed proof',async()=>{const x=await fixture();x.setMode('unrelatedIncident');const r=await x.run();assert.equal(r.status,'verified');assert.equal(r.otherIncidentCount,1);assert.equal(r.providerChecked,true);});

test('cleanup of an owned unexpectedly active candidate must not depend on its nominal closed-profile proof',async()=>{const x=await fixture();x.setMode('unexpectedOpenActivation');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.posts.activate,0);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);assert.equal(r.mayRetry,false);});

for(const phase of ['nominal','cleanup'])test('stalled wall clock and original '+phase+' mono cutoff stop a noncooperative fetch promptly',async()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'performance'),native=performance,nativeParse=JSON.parse,realOrigin=native.now();let offset=100,jumped=false,x;
 Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>native.now()-realOrigin+offset}});
 try{
  x=await fixture();x.setMode(phase==='nominal'?'nominalNeverSettles':'cleanupNeverSettles');
  const trigger=phase==='nominal'?CANDIDATE:RESTORE,end=phase==='nominal'?x.admission.expiresAt:x.admission.cleanupExpiresAt;
  JSON.parse=(...args)=>{const value=nativeParse(...args);if(value?.result?.id===trigger)Object.defineProperty(value.result,'id',{enumerable:true,get(){if(!jumped){const target=x.admissionMono+(end-x.admission.admittedAt)-30;offset+=target-(native.now()-realOrigin+offset);jumped=true;}return trigger;}});return value;};
  const begin=native.now(),r=await x.run(),elapsed=native.now()-begin;
  assert.equal(jumped,true);assert.ok(elapsed<500,'original deadline must stop the operation, elapsed='+elapsed);
  assert.notEqual(r.status,'verified');assert.equal(x.posts.upload,1);assert.equal(x.posts.activate,phase==='nominal'?0:1);assert.equal(x.posts.restore,phase==='nominal'?0:1);assert.equal(r.mayRetry,false);
 }finally{JSON.parse=nativeParse;Object.defineProperty(globalThis,'performance',descriptor);}
});
