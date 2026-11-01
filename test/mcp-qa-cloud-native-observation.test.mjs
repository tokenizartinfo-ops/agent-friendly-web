import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {qaClosedConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
import {qaClosedHttpFixture} from './fixtures/qa-closed-http.mjs';
const CANDIDATE='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',ACTIVATE='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',RESTORE='cccccccc-cccc-4ccc-8ccc-cccccccccccc';
async function fixture(){
 const f=qaClosedHttpFixture();f.version=f.pins.qaClosed.id;
 const base=f.versions[f.pins.qaClosed.id];base.main_module='closed-rollback.mjs';base.modules[0].name='closed-rollback.mjs';f.pins.qaClosed.module.name='closed-rollback.mjs';f.pins.qaClosed.configurationHash=qaClosedConfigurationHash(base);const at=f.wall,source='a'.repeat(40),now=()=>f.wall;
 const built=await build({stdin:{contents:"export {validateQaNativeObservationCommand,assertQaLifecycleWindow} from './lib/mcp-qa-cloud-lifecycle-admission.mjs';export {runQaNativeMetadataObservation} from './lib/mcp-qa-cloud-clone.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'test-compiled-pins',setup(b){b.onResolve({filter:/mcp-qa-native-artifact\.mjs$/},()=>({path:'artifact',namespace:'test-artifact'}));b.onLoad({filter:/.*/,namespace:'test-artifact'},()=>({contents:"export function validateQaNativeArtifact({artifact}){if(artifact?.purpose!=='test-fixed-native-wrapper')throw Error('bad test artifact');return artifact;}",loader:'js'}));b.onResolve({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({path:'pins',namespace:'test-pins'}));b.onLoad({filter:/.*/,namespace:'test-pins'},()=>({contents:'export const QA_CLOUD_CLOSED_PINS=Object.freeze('+JSON.stringify(f.pins)+');',loader:'js'}));}}]});
 const api=await import('data:text/javascript;base64,'+Buffer.from(built.outputFiles[0].text).toString('base64'));
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000100,body:'/afw-qa-native-observe-restore v1 '+source,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}};
 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'41200000100',runAttempt:'1',sourceRevision:source};
 const admissionMono=performance.now();
 const admission=api.validateQaNativeObservationCommand({event,context,now});
 const normal=f.fetch,posts={upload:0,activate:0,restore:0};let annotation=null,postRestoreQaReads=0,workflow=null,workflowPosts=0,terminatePosts=0,polls=0;
 const artifact={purpose:'test-fixed-native-wrapper',moduleName:'index.mjs',base64:Buffer.from('export default {}; // test wrapper').toString('base64')};
 let mode=null;const response=(result,status=200)=>new Response(JSON.stringify({success:true,errors:[],messages:[],result}),{status,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
 const fetchImpl=async(input,init)=>{
  const url=new URL(input),p=url.pathname;
  if(url.origin==='https://www.cloudflarestatus.com'){
   f.requests.push({url,init});assert.equal(p,'/api/v2/incidents/unresolved.json');assert.equal(init.method,'GET');assert.equal(Object.keys(init.headers).some(k=>k.toLowerCase()==='authorization'),false);
   return new Response(JSON.stringify({incidents:mode==='providerIncident'?[{id:'synthetic',name:'Workers errors',status:'investigating'}]:mode==='unrelatedIncident'?[{id:'other',name:'Email routing statistics',status:'investigating',components:[{name:'Email Routing'}]}]:[]}),{status:200,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
  }
  if(url.origin==='https://api.cloudflare.com'&&p.includes('/workflows/afw-own-qa-private-bootstrap/instances/')){
   f.requests.push({url,init});const own='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap/instances/afw-qa-arm-'+admission.intentId;
   assert.ok(p===own||p===own+'/status');
   if(init.method==='PATCH'){assert.equal(p,own+'/status');assert.deepEqual(JSON.parse(init.body),{status:'terminate',rollback:false});terminatePosts++;if(mode==='terminateUnknown')throw Error('PRIVATE_TERM');workflow.status='terminated';return response({status:'terminated'});}
   assert.equal(init.method,'GET');
   if(!workflow)return mode==='absence403'?response(null,403):new Response(JSON.stringify({success:false,errors:[{code:10000,message:'not found'}],messages:[],result:null}),{status:404,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
   if(mode==='preexisting'&&workflowPosts===0)workflow.status='complete';
   if(mode==='pollNeverSettles'&&workflowPosts)return new Promise(()=>{});
   if(workflowPosts)polls++;
   if(mode==='workflowPaused')workflow.status='paused';
   if(mode==='workflowRunning'||mode==='terminateUnknown')workflow.status='running';
   if(mode==='wrongParams')workflow.params=JSON.stringify({operation:'inspect_closed_quiescence',observationId:'0'.repeat(64)});
   return response(workflow);
  }
  if(url.origin==='https://api.cloudflare.com'&&init.method==='POST'&&p.endsWith('/workflows/afw-own-qa-private-bootstrap/instances')){
   workflowPosts++;f.requests.push({url,init});const b=JSON.parse(init.body);
   assert.deepEqual(b,{instance_id:'afw-qa-arm-'+admission.intentId,params:JSON.stringify({operation:'inspect_closed_quiescence',observationId:admission.intentId})});
   if(mode==='workflow403')return response(null,403);
   const flags={armEligibilityVerified:false,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
   const output={purpose:'afw.qa-closed-quiescence-observation.v2',status:'observed',context:'workflow',runtimeVersionId:CANDIDATE,sourceRevision:source,qaCodeProvenanceVerified:false,snapshotsVerified:2,reads:46,elapsedMs:4,observedAt:f.wall,enqueueAgeMs:3,executionBudgetMs:5000,capturedTotalAgeMs:7,diagnostic:{purpose:'afw.qa-cloud-closed-http-diagnostic.v1',stage:'complete',reason:'none',httpStatus:200,reads:46,authorizesEffects:false,operationalReadiness:false},...flags};
   if(mode==='wrongRuntime')output.runtimeVersionId=RESTORE;
   if(mode==='wrongSource')output.sourceRevision='b'.repeat(40);
   if(mode==='authorityTrue')output.armEligibilityVerified=true;
   if(mode==='extraDTO')output.privateRaw='PRIVATE_DTO';
   if(mode==='nativeBlocked')output.status='blocked';
   if(mode==='nativeTooSlow')output.elapsedMs=5000;
   workflow={params:b.params,status:'complete',output,versionId:'opaque-native-version'};
   if(mode==='createUnknown')throw Error('PRIVATE_CREATE_ACK');
   return response({id:mode==='wrongCreateId'?'foreign':'afw-qa-arm-'+admission.intentId,workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',version_id:'opaque-create-ref'});
  }
  if(url.origin==='https://api.cloudflare.com'&&p.endsWith('/workflows/afw-own-qa-private-bootstrap/instances')&&workflow){
   const status=workflow.status;const rows=[{id:'afw-qa-arm-'+admission.intentId,status,workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da'}];
   return new Response(JSON.stringify({success:true,errors:[],messages:[],result:rows,result_info:{per_page:100,count:1,total_count:1}}),{status:200,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
  }
  if(url.origin==='https://api.cloudflare.com'&&init.method==='POST'){
   f.requests.push({url,init});assert.equal(init.redirect,'error');assert.equal(init.cache,'no-store');assert.ok(init.signal instanceof AbortSignal);
   const body=JSON.parse(init.body);
   if(p.endsWith('/versions')){
    posts.upload++;assert.equal(p,'/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/'+f.pins.qaClosed.name+'/versions');assert.equal(url.searchParams.get('deploy'),'false');assert.equal(body.modules.length,3);assert.equal(body.main_module,'index.mjs');assert.deepEqual(body.modules.find(m=>m.name==='closed-rollback.mjs'),f.versions[f.pins.qaClosed.id].modules[0]);
 const compiled=JSON.parse(Buffer.from(body.modules.find(m=>m.name==='closed-observation-context-v2.mjs').content_base64,'base64').toString().match(/Object.freeze\((.*)\);/s)[1]);assert.equal(compiled.id,admission.intentId);assert.equal(compiled.startAt,admission.createdAt);assert.equal(compiled.expiresAt,admission.expiresAt);assert.equal(Object.keys(compiled).length,7);
    assert.deepEqual(body.bindings,f.versions[f.pins.qaClosed.id].bindings.map(b=>({name:b.name,type:'inherit',version_id:f.pins.qaClosed.id})));assert.equal(body.annotations['workers/tag'],admission.intentId);
    assert.equal(Object.hasOwn(body,'migrations'),false);assert.equal(Object.hasOwn(body,'migration_tag'),false);
    const v=structuredClone(f.versions[f.pins.qaClosed.id]);v.id=CANDIDATE;v.annotations=body.annotations;v.modules=body.modules;v.main_module=body.main_module;f.versions[CANDIDATE]=v;
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
    if(mode==='preexisting')workflow={params:JSON.stringify({operation:'inspect_closed_quiescence',observationId:admission.intentId}),status:'complete'};
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
 return{f,api,admission,admissionMono,posts,get workflowPosts(){return workflowPosts;},get terminatePosts(){return terminatePosts;},get polls(){return polls;},fetchImpl,setMode(v){mode=v;},run:()=>api.runQaNativeMetadataObservation({admission,credential:'PRIVATE-cf-token-for-test',githubCredential:mode==='modernGithubCredential'?'ghs_SYNTHETIC_APPID_'+'a'.repeat(200)+'.'+'b'.repeat(280)+'.'+'c'.repeat(100):'PRIVATE-gh-token-for-test',fetchImpl,now,artifact}),event,context,now};
}

test('native closed lifecycle creates one correlated metadata Workflow, restores once and proves all terminal',async()=>{
 const x=await fixture(),r=await x.run();assert.equal(r.status,'verified');assert.equal(r.purpose,'afw.qa-cloud-native-observation.v1');assert.equal(r.nativeMetadataObservationVerified,true);assert.equal(r.nativeResult.runtimeVersionId,CANDIDATE);assert.equal(r.finalClosedVerified,true);assert.equal(r.finalReadback.reads,25);assert.equal(x.workflowPosts,1);assert.equal(x.terminatePosts,0);assert.deepEqual(x.posts,{upload:1,activate:1,restore:1});assert.equal(r.posts.createWorkflow,1);assert.equal(r.posts.terminateWorkflow,0);
 for(const k of ['armEligibilityVerified','authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);
 assert.equal(JSON.stringify(r).includes('PRIVATE'),false);assert.equal(JSON.stringify(r).includes('content_base64'),false);
});
for(const mode of ['workflow403','absence403','preexisting','wrongCreateId','wrongParams','wrongRuntime','wrongSource','authorityTrue','extraDTO','nativeBlocked','nativeTooSlow']){
 test(mode+' never accepts observation and independently restores QA',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(r.nativeMetadataObservationVerified,false);assert.equal(x.posts.restore,1);assert.equal(x.f.version,x.f.pins.qaClosed.id);assert.ok(x.workflowPosts<=1);assert.ok(x.terminatePosts<=1);assert.equal(r.mayRetry,false);assert.equal(JSON.stringify(r).includes('PRIVATE'),false);});
}
test('lost Workflow create ACK retains uncertainty after full closed restoration',async()=>{const x=await fixture();x.setMode('createUnknown');const r=await x.run();assert.equal(r.uncertain,true);assert.equal(r.status,'uncertain');assert.equal(x.workflowPosts,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);});
test('observed paused instance is preserved and does not prevent owned Worker restoration',async()=>{const x=await fixture();x.setMode('workflowPaused');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(r.conflict,true);assert.equal(x.terminatePosts,0);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,false);});
test('bounded poll cutoff terminates only own running Workflow then restores independently',async()=>{const x=await fixture();x.setMode('workflowRunning');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.terminatePosts,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);assert.ok(x.polls<=16);});
test('unknown termination ACK never causes second mutation or blocks Worker restoration',async()=>{const x=await fixture();x.setMode('terminateUnknown');const r=await x.run();assert.equal(r.uncertain,true);assert.equal(x.terminatePosts,1);assert.equal(x.posts.restore,1);assert.notEqual(r.status,'verified');});
for(const mode of ['activationUnknown','restoreUnknown','foreignPointer','nominalExpires','cleanupExpires']){
 test(mode+' preserves original clone safety semantics in native route',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.notEqual(r.status,'verified');assert.ok(Object.values(x.posts).every(n=>n<=1));if(mode==='foreignPointer')assert.equal(x.posts.restore,0);if(mode==='nominalExpires')assert.equal(x.posts.restore,1);if(mode==='cleanupExpires')assert.equal(x.posts.restore,0);});
}
test('old kind and forged native metadata cannot reach even provider GET',async()=>{
 const x=await fixture();let calls=0;await assert.rejects(x.api.runQaNativeMetadataObservation({admission:{...x.admission},credential:'PRIVATE-cf-token-for-test',githubCredential:'PRIVATE-gh-token-for-test',fetchImpl:async()=>{calls++;},now:x.now,artifact:{purpose:'test-fixed-native-wrapper'}}));assert.equal(calls,0);
});
