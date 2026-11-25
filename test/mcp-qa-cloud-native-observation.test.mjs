import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {qaClosedConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
import {qaClosedHttpFixture} from './fixtures/qa-closed-http.mjs';
const CANDIDATE='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',ACTIVATE='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',RESTORE='cccccccc-cccc-4ccc-8ccc-cccccccccccc';
async function fixture({effect,transport,custody=false,changedArtifact=false}={}){
 const f=qaClosedHttpFixture();f.version=f.pins.qaClosed.id;
 const readerCredential='PRIVATE-synthetic-reader-token',publisherCredential='PRIVATE-synthetic-publisher-token';
 const base=f.versions[f.pins.qaClosed.id];
 if(custody){
  f.wall=Date.parse('2026-11-25T13:00:00Z');
  base.bindings.push({name:'AFW_MCP_CLOSURE_READ_TOKEN',type:'secret_text'},{name:'AFW_MCP_CLOSURE_PUBLISH_TOKEN',type:'secret_text'});
  f.pins.qaClosed.bindingCount=base.bindings.length;
 }
 base.main_module='closed-rollback.mjs';base.modules[0].name='closed-rollback.mjs';f.pins.qaClosed.module.name='closed-rollback.mjs';f.pins.qaClosed.configurationHash=qaClosedConfigurationHash(base);const at=f.wall,source='a'.repeat(40),now=()=>f.wall;
 const built=await build({stdin:{contents:"export {validateQaLifecycleCommand,validateQaNativeObservationCommand,validateQaPreEntryCustodyCommand,assertQaLifecycleWindow} from './lib/mcp-qa-cloud-lifecycle-admission.mjs';export {runQaClosedCloudClone,runQaNativeMetadataObservation,runQaClosedCustodyObservation} from './lib/mcp-qa-cloud-clone.mjs';export {createQaPreEntryCustodyContext} from './lib/mcp-qa-finite-pre-entry-context.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'test-compiled-pins',setup(b){b.onResolve({filter:/mcp-qa-native-artifact\.mjs$/},()=>({path:'artifact',namespace:'test-artifact'}));b.onLoad({filter:/.*/,namespace:'test-artifact'},()=>({contents:"export function validateQaNativeArtifact({artifact}){if(artifact?.purpose!=='test-fixed-native-wrapper')throw Error('bad test artifact');return artifact;}",loader:'js'}));b.onResolve({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({path:'pins',namespace:'test-pins'}));b.onLoad({filter:/.*/,namespace:'test-pins'},()=>({contents:'export const QA_CLOUD_CLOSED_PINS=Object.freeze('+JSON.stringify(f.pins)+');',loader:'js'}));}}]});
 const api=await import('data:text/javascript;base64,'+Buffer.from(built.outputFiles[0].text).toString('base64'));
 const wrapper=Buffer.from('export default {}; // test wrapper');
 const releaseZipSha256='e'.repeat(64),wrapperSha256=createHash('sha256').update(wrapper).digest('hex');
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000100,body:custody?'/afw-qa-pre-entry-custody v1 '+source+' '+releaseZipSha256+' '+wrapperSha256:'/afw-qa-native-observe-restore v1 '+source,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}};
 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'41200000100',runAttempt:'1',sourceRevision:source};
 const admissionMono=performance.now();
 const admission=(custody?api.validateQaPreEntryCustodyCommand:api.validateQaNativeObservationCommand)({event,context,now});
 const custodyContext=custody?api.createQaPreEntryCustodyContext({sourceRevision:source,releaseZipSha256,startAt:admission.createdAt,expiresAt:admission.expiresAt}):null;
 const instanceId=custody?'afw-qa-custody-'+custodyContext.id:'afw-qa-arm-'+admission.intentId;
 const parameters=JSON.stringify({operation:custody?'inspect_pre_entry_custody':'inspect_closed_quiescence',
  observationId:custody?custodyContext.id:admission.intentId});
 const normal=f.fetch,posts={upload:0,activate:0,restore:0};let annotation=null,postRestoreQaReads=0,workflow=null,workflowPosts=0,terminatePosts=0,polls=0,workflowAckAt=null,lateCleanupReached=false,restoreProbeDelayed=false;
 const artifact=custody?{sourceRevision:source,bytes:wrapper.length,sha256:wrapperSha256,
  base64:(changedArtifact?Buffer.alloc(wrapper.length,97):wrapper).toString('base64')}:
  {purpose:'test-fixed-native-wrapper',moduleName:'index.mjs',base64:wrapper.toString('base64')};
 const queueIncident={id:'0ocqieaifg7h',name:'Changes to Cloudflare Workers are not producing Event Subscription events',status:'identified',updated_at:'2026-11-11T05:05:06.331Z',
  components:[{id:'57srcl8zcn7c',name:'Workers'},{id:'3z7cmdfch5kb',name:'Queues'}]};
 let mode=null;const response=(result,status=200)=>new Response(JSON.stringify({success:true,errors:[],messages:[],result}),{status,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
 const fetchImpl=async(input,init)=>{
  const url=new URL(input),p=url.pathname;
  if(transport){const intercepted=await transport({url,init,f,admission,response});if(intercepted!==undefined)return intercepted;}
  if(effect&&['POST','PATCH'].includes(init.method)&&url.origin==='https://api.cloudflare.com'){
   const b=JSON.parse(init.body),kind=init.method==='PATCH'?'terminateWorkflow':p.endsWith('/versions')?'upload':p.endsWith('/instances')?'createWorkflow':b.versions?.[0]?.version_id===CANDIDATE?'activate':'restore';
   const intercepted=await effect({kind,url,init,f,admission,response});if(intercepted!==undefined)return intercepted;
  }
  if(url.origin==='https://www.cloudflarestatus.com'){
   f.requests.push({url,init});assert.equal(p,'/api/v2/incidents/unresolved.json');assert.equal(init.method,'GET');assert.equal(Object.keys(init.headers).some(k=>k.toLowerCase()==='authorization'),false);
   return new Response(JSON.stringify({incidents:mode==='providerIncident'?[{id:'synthetic',name:'Workers errors',status:'investigating'}]:mode==='unrelatedIncident'?[{id:'other',name:'Email routing statistics',status:'investigating',components:[{name:'Email Routing'}]}]:mode==='broaderEventIncident'?[{...queueIncident,components:[...queueIncident.components,{id:'new',name:'Workflows'}]}]:mode==='exactQueueIncident'||custody?[queueIncident]:[]}),{status:200,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
  }
  if(custody&&url.origin==='https://api.cloudflare.com'&&p.endsWith('/tokens/verify')){
   f.requests.push({url,init});assert.equal(init.method,'GET');
   const supplied=init.headers.Authorization;
   assert.ok([readerCredential,publisherCredential].some(value=>supplied==='Bearer '+value));
   const reader=supplied==='Bearer '+readerCredential;
   if(mode==='readerDenied')return response(null,401);
   const id=reader&&mode!=='crossedCredentials'?'cc9aeb666b3616232df10a17598ced52':'0821b27a745d1ef581b445c75311711b';
   return Response.json({success:true,errors:[],messages:[{code:10000,message:'This API Token is valid and active',type:null}],
    result:{id,status:'active',expires_on:'2026-11-27T02:59:59Z'}},{headers:{date:new Date(f.wall).toUTCString()}});
  }
  if(url.origin==='https://api.cloudflare.com'&&p.includes('/workflows/afw-own-qa-private-bootstrap/instances/')){
   f.requests.push({url,init});const own='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap/instances/'+instanceId;
   assert.ok(p===own||p===own+'/status');
   if(init.method==='PATCH'){assert.equal(p,own+'/status');assert.deepEqual(JSON.parse(init.body),{status:'terminate',rollback:false});terminatePosts++;if(mode==='terminateUnknown')throw Error('PRIVATE_TERM');workflow.status='terminated';return response({status:'terminated',timestamp:new Date(f.wall).toISOString()});}
   assert.equal(init.method,'GET');
   if(!workflow)return mode==='absence403'?response(null,403):new Response(JSON.stringify({success:false,errors:[{code:10000,message:'not found'}],messages:[],result:null}),{status:404,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
   if(mode==='preexisting'&&workflowPosts===0)workflow.status='complete';
   if(mode==='pollNeverSettles'&&workflowPosts&&polls++===0)return new Promise(()=>{});
   if(workflowPosts)polls++;
   if(mode==='lateWorkflowCleanup'&&polls===2){f.wall=admission.cleanupExpiresAt-125010;lateCleanupReached=true;}
   if(mode==='workflowQueued'&&workflow.status!=='terminated')workflow.status='queued';
   if(mode==='nativeCompletesAfter7800'&&workflow.status!=='terminated')workflow.status=performance.now()-workflowAckAt>=7800?'complete':'running';
   if(mode==='workflowPaused')workflow.status='paused';
   if((mode==='workflowRunning'||mode==='terminateUnknown')&&workflow.status!=='terminated')workflow.status='running';
   if(mode==='wrongParams')workflow.params=JSON.stringify({operation:'inspect_closed_quiescence',observationId:'0'.repeat(64)});
   return response(workflow);
  }
  if(custody&&url.origin==='https://api.github.com'&&init.method==='POST'){
   const b=JSON.parse(init.body),ref='refs/tags/afw-qa-closed-custody-ready/'+admission.intentId;
   if(b.ref===ref){
    assert.equal(f.version,CANDIDATE);
    assert.equal(b.sha,source);
    f.requests.push({url,init});
    workflowPosts++;
    const role={status:'active',expiresAt:new Date(admission.expiresAt+60000).toISOString(),notBefore:null};
    const output={purpose:'afw.qa-pre-entry-custody.v3',status:'observed',observationId:custodyContext.id,
     sourceRevision:source,releaseZipSha256:mode==='wrongArchive'?'f'.repeat(64):releaseZipSha256,
     qaVersionId:mode==='wrongRuntime'?RESTORE:CANDIDATE,observedAt:f.wall,reader:role,publisher:{...role},
     guardVerified:true,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false};
    if(mode!=='externalStartTimeout')workflow={params:parameters,status:'complete',success:mode!=='unsuccessfulWorkflow',
     output,versionId:'opaque-native-version'};
    const date=new Date(f.wall).toUTCString();
    if(mode==='externalStartTimeout')f.wall=admission.expiresAt;
    return new Response(JSON.stringify({ref,object:{sha:source,type:'commit'}}),{status:201,headers:{'content-type':'application/json',date}});
   }
  }
  if(url.origin==='https://api.cloudflare.com'&&init.method==='POST'&&p.endsWith('/workflows/afw-own-qa-private-bootstrap/instances')){
   assert.equal(custody,false,'the limited credential is never used to start a Workflow');
   workflowPosts++;f.requests.push({url,init});const b=JSON.parse(init.body);
   assert.deepEqual(b,{instance_id:instanceId,params:parameters});
   if(mode==='workflow403')return response(null,403);
   const flags={armEligibilityVerified:false,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
   const output={purpose:'afw.qa-closed-quiescence-observation.v2',status:'observed',context:'workflow',runtimeVersionId:CANDIDATE,sourceRevision:source,qaCodeProvenanceVerified:false,snapshotsVerified:2,reads:46,elapsedMs:4,observedAt:f.wall,enqueueAgeMs:3,executionBudgetMs:5000,capturedTotalAgeMs:7,diagnostic:{purpose:'afw.qa-cloud-closed-http-diagnostic.v1',stage:'complete',reason:'none',httpStatus:200,reads:46,authorizesEffects:false,operationalReadiness:false},...flags};
   if(mode==='wrongRuntime')output.runtimeVersionId=RESTORE;
   if(mode==='wrongSource')output.sourceRevision='b'.repeat(40);
   if(mode==='authorityTrue')output.armEligibilityVerified=true;
   if(mode==='extraDTO')output.privateRaw='PRIVATE_DTO';
   if(mode==='nativeBlocked'||mode==='lateWorkflowCleanup')output.status='blocked';
   if(mode==='nativeTooSlow')output.elapsedMs=5000;
   if(mode==='nativeCompletesAfter7800'){output.enqueueAgeMs=3845;output.elapsedMs=4022;output.capturedTotalAgeMs=7867;}
   workflow={params:b.params,status:'complete',output,versionId:'opaque-native-version'};
   workflowAckAt=performance.now();
   if(mode==='createDeniedRace403'||mode==='createDeniedRace409'){workflow.status='running';return response(null,mode==='createDeniedRace403'?403:409);}
   if(mode==='createUnknown')throw Error('PRIVATE_CREATE_ACK');
   return response({id:mode==='wrongCreateId'?'foreign':instanceId,workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',version_id:'opaque-create-ref'});
  }
  if(url.origin==='https://api.cloudflare.com'&&p.endsWith('/workflows/afw-own-qa-private-bootstrap/instances')&&workflow){
   const status=workflow.status;const rows=[{id:instanceId,status,workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da'}];
   return new Response(JSON.stringify({success:true,errors:[],messages:[],result:rows,result_info:{per_page:100,count:1,total_count:1}}),{status:200,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
  }
  if(url.origin==='https://api.cloudflare.com'&&init.method==='POST'){
   f.requests.push({url,init});assert.equal(init.redirect,'error');assert.equal(init.cache,'no-store');assert.ok(init.signal instanceof AbortSignal);
   const body=JSON.parse(init.body);
   if(p.endsWith('/versions')){
    posts.upload++;assert.equal(p,'/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/'+f.pins.qaClosed.name+'/versions');assert.equal(url.searchParams.get('deploy'),'false');assert.equal(body.modules.length,3);assert.equal(body.main_module,'index.mjs');assert.deepEqual(body.modules.find(m=>m.name==='closed-rollback.mjs'),f.versions[f.pins.qaClosed.id].modules[0]);
 const compiled=JSON.parse(Buffer.from(body.modules.find(m=>m.name===(custody?'pre-entry-custody-context.mjs':'closed-observation-context-v2.mjs')).content_base64,'base64').toString().match(/Object.freeze\((.*)\);/s)[1]);assert.equal(compiled.id,custody?custodyContext.id:admission.intentId);assert.equal(compiled.startAt,admission.createdAt);assert.equal(compiled.expiresAt,admission.expiresAt);if(custody)assert.equal(compiled.releaseZipSha256,releaseZipSha256);else assert.equal(Object.keys(compiled).length,7);
    assert.deepEqual(body.bindings,f.versions[f.pins.qaClosed.id].bindings.map(b=>{
     if(custody&&b.name==='AFW_MCP_CLOSURE_READ_TOKEN')return {name:b.name,type:'secret_text',text:readerCredential};
     if(custody&&b.name==='AFW_MCP_CLOSURE_PUBLISH_TOKEN')return {name:b.name,type:'secret_text',text:publisherCredential};
     return {name:b.name,type:'inherit',version_id:f.pins.qaClosed.id};
    }));assert.equal(body.annotations['workers/tag'],admission.intentId);
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
   if(mode==='lateWorkflowCleanup'&&lateCleanupReached&&!restoreProbeDelayed){f.wall+=20;restoreProbeDelayed=true;}
   if(mode==='cleanupNeverSettles'&&posts.restore&&++postRestoreQaReads>1)return new Promise(()=>{});
   f.requests.push({url,init});return response({deployments:[{id:f.deployment,strategy:'percentage',versions:[{version_id:f.version,percentage:100}],annotations:annotation?{'workers/message':annotation}:{}}]});
  }
  if(mode==='nominalNeverSettles'&&p.endsWith('/versions/'+CANDIDATE))return new Promise(()=>{});
  if(mode==='finalReadbackFailure'&&posts.restore&&p.endsWith('/tails'))return response([{id:'PRIVATE_ACTIVE_TAIL'}]);
  return normal(input,init);
 };
 return{f,api,admission,admissionMono,posts,get workflowPosts(){return workflowPosts;},get terminatePosts(){return terminatePosts;},get polls(){return polls;},get workflowStatus(){return workflow?.status;},fetchImpl,setMode(v){mode=v;},run:()=>(custody?api.runQaClosedCustodyObservation:api.runQaNativeMetadataObservation)({admission,credential:'PRIVATE-cf-token-for-test',githubCredential:mode==='modernGithubCredential'?'ghs_SYNTHETIC_APPID_'+'a'.repeat(200)+'.'+'b'.repeat(280)+'.'+'c'.repeat(100):'PRIVATE-gh-token-for-test',fetchImpl,now,artifact,...custody?{readerCredential,publisherCredential}:{}}),event,context,now};
}

test('native closed lifecycle creates one correlated metadata Workflow, restores once and proves all terminal',async()=>{
 const x=await fixture(),r=await x.run();assert.equal(r.status,'verified',JSON.stringify(r));assert.equal(r.purpose,'afw.qa-cloud-native-observation.v1');assert.equal(r.nativeMetadataObservationVerified,true);assert.equal(r.nativeResult.runtimeVersionId,CANDIDATE);assert.equal(r.finalClosedVerified,true);assert.equal(r.finalReadback.reads,25);assert.equal(x.workflowPosts,1);assert.equal(x.terminatePosts,0);assert.deepEqual(x.posts,{upload:1,activate:1,restore:1});assert.equal(r.posts.createWorkflow,1);assert.equal(r.posts.terminateWorkflow,0);
 for(const k of ['armEligibilityVerified','authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);
 assert.equal(JSON.stringify(r).includes('PRIVATE'),false);assert.equal(JSON.stringify(r).includes('content_base64'),false);
});
for(const mode of ['workflow403','absence403','preexisting','wrongCreateId','wrongParams','wrongRuntime','wrongSource','authorityTrue','extraDTO','nativeBlocked','nativeTooSlow']){
 test(mode+' never accepts observation and independently restores QA',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(r.nativeMetadataObservationVerified,false);assert.equal(x.posts.restore,1);assert.equal(x.f.version,x.f.pins.qaClosed.id);assert.ok(x.workflowPosts<=1);assert.ok(x.terminatePosts<=1);assert.equal(r.mayRetry,false);assert.equal(JSON.stringify(r).includes('PRIVATE'),false);});
}
test('lost Workflow create ACK retains uncertainty after full closed restoration',async()=>{const x=await fixture();x.setMode('createUnknown');const r=await x.run();assert.equal(r.uncertain,true);assert.equal(r.status,'uncertain');assert.equal(x.workflowPosts,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);});
test('observed paused instance is preserved and does not prevent owned Worker restoration',async()=>{const x=await fixture();x.setMode('workflowPaused');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(r.conflict,true);assert.equal(x.terminatePosts,0);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,false);});
test('bounded poll cutoff terminates only own running Workflow then restores independently',async()=>{const x=await fixture();x.setMode('workflowRunning');const r=await x.run();assert.notEqual(r.status,'verified');assert.equal(x.terminatePosts,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);assert.ok(x.polls<=16);assert.deepEqual(r.effectHttp.terminateWorkflow,{httpStatus:200,errorCodes:[]});});
test('unknown termination ACK never causes second mutation or blocks Worker restoration',async()=>{const x=await fixture();x.setMode('terminateUnknown');const r=await x.run();assert.equal(r.uncertain,true);assert.equal(x.terminatePosts,1);assert.equal(x.posts.restore,1);assert.notEqual(r.status,'verified');});
for(const mode of ['activationUnknown','restoreUnknown','foreignPointer','nominalExpires','cleanupExpires']){
 test(mode+' preserves original clone safety semantics in native route',async()=>{const x=await fixture();x.setMode(mode);const r=await x.run();assert.notEqual(r.status,'verified');assert.ok(Object.values(x.posts).every(n=>n<=1));if(mode==='foreignPointer')assert.equal(x.posts.restore,0);if(mode==='nominalExpires')assert.equal(x.posts.restore,1);if(mode==='cleanupExpires')assert.equal(x.posts.restore,0);});
}
test('old kind and forged native metadata cannot reach even provider GET',async()=>{
 const x=await fixture();let calls=0;await assert.rejects(x.api.runQaNativeMetadataObservation({admission:{...x.admission},credential:'PRIVATE-cf-token-for-test',githubCredential:'PRIVATE-gh-token-for-test',fetchImpl:async()=>{calls++;},now:x.now,artifact:{purpose:'test-fixed-native-wrapper'}}));assert.equal(calls,0);
});

test('403 Workflow create uses no broader credential or retry and restores exact BASE',async()=>{
 const x=await fixture();x.setMode('workflow403');const r=await x.run();assert.equal(x.workflowPosts,1);assert.equal(x.posts.restore,1);assert.equal(r.outcomes.createWorkflow,'denied');assert.equal(r.finalClosedVerified,true);assert.equal(r.status,'blocked');
 assert.ok(x.f.requests.filter(q=>q.url.origin==='https://api.cloudflare.com').every(q=>q.init.headers.Authorization==='Bearer PRIVATE-cf-token-for-test'));assert.equal(r.operationalReadiness,false);
});
test('stalled wall and original nominal mono deadline fence a noncooperative native poll while cleanup remains independent',async()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'performance'),native=performance,parse=JSON.parse,realOrigin=native.now();let offset=100,jumped=false,x;
 Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>native.now()-realOrigin+offset}});
 try{
  x=await fixture();x.setMode('pollNeverSettles');
  JSON.parse=(...args)=>{const value=parse(...args);if(value?.result?.id==='afw-qa-arm-'+x.admission.intentId)Object.defineProperty(value.result,'id',{enumerable:true,get(){if(!jumped){const target=x.admissionMono+(x.admission.expiresAt-x.admission.admittedAt)-30;offset+=target-(native.now()-realOrigin+offset);jumped=true;}return 'afw-qa-arm-'+x.admission.intentId;}});return value;};
  const begin=native.now(),r=await x.run();assert.equal(jumped,true);assert.ok(native.now()-begin<500);assert.notEqual(r.status,'verified');assert.equal(x.workflowPosts,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);
 }finally{JSON.parse=parse;Object.defineProperty(globalThis,'performance',descriptor);}
});
test('stalled wall and original cleanup mono deadline reject late final proof without replay',async()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'performance'),native=performance,parse=JSON.parse,realOrigin=native.now();let offset=100,jumped=false,x;
 Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>native.now()-realOrigin+offset}});
 try{
  x=await fixture();
  JSON.parse=(...args)=>{const value=parse(...args);if(value?.result?.id===RESTORE)Object.defineProperty(value.result,'id',{enumerable:true,get(){if(!jumped){const target=x.admissionMono+(x.admission.cleanupExpiresAt-x.admission.admittedAt)-30;offset+=target-(native.now()-realOrigin+offset);jumped=true;}return RESTORE;}});return value;};
  const begin=native.now(),r=await x.run();assert.equal(jumped,true);assert.ok(native.now()-begin<500);assert.notEqual(r.status,'verified');assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,false);assert.equal(r.mayRetry,false);
 }finally{JSON.parse=parse;Object.defineProperty(globalThis,'performance',descriptor);}
});

test('genuine old and native admissions cannot cross controller kinds before provider access',async()=>{
 const x=await fixture(),old=x.api.validateQaLifecycleCommand({event:{...x.event,comment:{...x.event.comment,body:'/afw-qa-deploy-observe-restore v1 '+x.context.sourceRevision}},context:x.context,now:x.now});let calls=0;
 const common={credential:'PRIVATE-cf-token-for-test',githubCredential:'PRIVATE-gh-token-for-test',fetchImpl:async()=>{calls++;},now:x.now};
 await assert.rejects(x.api.runQaNativeMetadataObservation({...common,admission:old,artifact:{purpose:'test-fixed-native-wrapper'}}));
 await assert.rejects(x.api.runQaClosedCloudClone({...common,admission:x.admission}));assert.equal(calls,0);
});

for(const boundary of ['dtoSubBudget','dtoNominal','recipientNominal']){
 test('native settlement rejects '+boundary+' expiry and still restores once',async()=>{
  const x=await fixture(),parse=JSON.parse;let reached=false;
  try{
   JSON.parse=(...args)=>{const value=parse(...args);if(!reached&&value?.purpose==='afw.qa-closed-quiescence-observation.v2'){
    reached=true;
    if(boundary==='recipientNominal')queueMicrotask(()=>{x.f.wall=x.admission.expiresAt;});
    else x.f.wall=boundary==='dtoSubBudget'?x.f.wall+20000:x.admission.expiresAt;
   }return value;};
   const r=await x.run();assert.equal(reached,true);assert.notEqual(r.status,'verified');assert.equal(r.nativeMetadataObservationVerified,false);assert.equal(x.workflowPosts,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);assert.equal(r.mayRetry,false);
  }finally{JSON.parse=parse;}
 });
}
test('late failed Workflow cleanup keeps a full best-effort restore budget above the final-proof reserve',async()=>{
 const x=await fixture();x.setMode('lateWorkflowCleanup');const r=await x.run();
 assert.equal(r.workflowCleanupFailure,true);assert.equal(x.posts.restore,1);assert.equal(x.f.version,x.f.pins.qaClosed.id);assert.equal(r.finalClosedVerified,true);assert.notEqual(r.status,'verified');assert.equal(r.mayRetry,false);assert.ok(Object.values(r.posts).every(n=>n<=1));
});
test('queued native poll sleeps only until the original nominal cutoff before cleanup',async()=>{
 const x=await fixture(),parse=JSON.parse;let reached=false,armed=false,cutoff,started=0;x.setMode('workflowQueued');
 try{
  JSON.parse=(...args)=>{const value=parse(...args);if(!armed&&value?.result?.status==='queued'){
   armed=true;let reads=0;Object.defineProperty(value.result,'status',{enumerable:true,get(){if(++reads===3){reached=true;x.f.wall=x.admission.expiresAt-100;started=performance.now();cutoff=setTimeout(()=>{x.f.wall=x.admission.expiresAt;},100);}return 'queued';}});
  }return value;};
  const r=await x.run(),elapsed=performance.now()-started;assert.equal(reached,true);assert.ok(elapsed<300,'cleanup took '+elapsed+'ms after 100ms nominal cutoff');assert.notEqual(r.status,'verified');assert.equal(x.terminatePosts,1);assert.equal(x.posts.restore,1);assert.equal(r.finalClosedVerified,true);assert.equal(r.mayRetry,false);
 }finally{clearTimeout(cutoff);JSON.parse=parse;}
});
test('real native controller includes original comment and run correlation',async()=>{
 const x=await fixture(),r=await x.run();assert.equal(r.commentId,x.admission.commentId);assert.equal(r.runId,x.admission.runId);
});

for(const status of [403,409])test('denied Workflow create '+status+' never terminates a concurrent matching instance',async()=>{
 const x=await fixture();x.setMode('createDeniedRace'+status);const r=await x.run();
 assert.equal(x.workflowPosts,1);assert.equal(r.outcomes.createWorkflow,'denied');assert.equal(x.terminatePosts,0);assert.equal(x.workflowStatus,'running');assert.equal(x.posts.restore,1);assert.notEqual(r.status,'verified');assert.equal(r.finalClosedVerified,false);assert.equal(r.mayRetry,false);
});

test('healthy native metadata completion near eight seconds is observed before exhausting twelve polls',async()=>{
 const x=await fixture();x.setMode('nativeCompletesAfter7800');const started=performance.now(),r=await x.run(),elapsed=performance.now()-started;
 assert.equal(r.status,'verified',JSON.stringify({status:r.status,polls:x.polls,terminatePosts:x.terminatePosts,elapsed}));assert.equal(r.nativeMetadataObservationVerified,true);assert.equal(r.finalClosedVerified,true);assert.equal(x.terminatePosts,0);assert.equal(x.workflowPosts,1);assert.equal(x.posts.restore,1);assert.ok(x.polls<=12);assert.ok(elapsed>=7800);assert.equal(r.nativeResult.capturedTotalAgeMs,7867);assert.equal(r.mayRetry,false);
});


test('native diagnostic records actual denied create HTTP and safe codes without authority',async()=>{
 const x=await fixture({effect:({kind,f})=>kind==='createWorkflow'?new Response(JSON.stringify({success:false,errors:[{code:10000,message:'PRIVATE_PROVIDER'}],messages:[],result:null}),{status:403,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}}):undefined});
 const r=await x.run();assert.equal(r.effectHttp?.purpose,'afw.qa-native-effect-http.v1');
 assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[10000]});assert.equal(r.outcomes.createWorkflow,'denied');assert.equal(r.posts.terminateWorkflow,0);assert.equal(r.posts.restore,1);assert.doesNotMatch(JSON.stringify(r),/PRIVATE_PROVIDER/);
});

const effectNames=['upload','activate','createWorkflow','restore','terminateWorkflow'];
const deniedResponse=(f,status=403,errors=[{code:10000,message:'PRIVATE_PROVIDER'}],headers={},raw)=>new Response(raw??JSON.stringify({success:false,errors,messages:[],result:null}),{status,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString(),...headers}});
const diagnosticSafe=r=>{
 assert.deepEqual(Object.keys(r.effectHttp),['purpose',...effectNames]);assert.ok(Object.isFrozen(r.effectHttp));
 for(const kind of effectNames){const e=r.effectHttp[kind];assert.deepEqual(Object.keys(e),['httpStatus','errorCodes']);assert.ok(Object.isFrozen(e));assert.ok(Object.isFrozen(e.errorCodes));}
 assert.doesNotMatch(JSON.stringify(r),/PRIVATE_PROVIDER|PRIVATE_NETWORK|PRIVATE_ACCESSOR/);
};
test('native normal lifecycle has honest success statuses and null skipped termination',async()=>{
 const x=await fixture(),r=await x.run();diagnosticSafe(r);
 for(const kind of effectNames)assert.deepEqual(r.effectHttp[kind],{httpStatus:kind==='terminateWorkflow'?null:200,errorCodes:[]});
 assert.throws(()=>{r.effectHttp.upload.errorCodes.push(1);});
});
test('native skipped effects remain null after preflight block',async()=>{
 const x=await fixture();x.setMode('providerIncident');const r=await x.run();diagnosticSafe(r);for(const kind of effectNames)assert.deepEqual(r.effectHttp[kind],{httpStatus:null,errorCodes:[]});
});
for(const kind of effectNames)test('actual '+kind+' effect has bounded numeric denial metadata',async()=>{
 let cut=false;
 const x=await fixture({effect:q=>q.kind===kind?deniedResponse(q.f,409,[{code:0},{code:2147483647},{code:0}]):undefined,transport:({url,init,f})=>{
  if(kind==='terminateWorkflow'&&!cut&&init.method==='GET'&&url.pathname.endsWith('/instances/afw-qa-arm-'+x.admission.intentId)&&x.workflowPosts){cut=true;f.wall+=20001;}
 }});
 if(kind==='terminateWorkflow')x.setMode('workflowRunning');
 const r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp[kind],{httpStatus:409,errorCodes:[0,2147483647]});assert.equal(r.outcomes[kind],'denied');assert.equal(r.posts[kind],1);assert.ok(Object.values(r.posts).every(n=>n<=1));
 if(kind==='createWorkflow')assert.equal(r.posts.terminateWorkflow,0);
});
for(const [status,outcome]of [[400,'denied'],[403,'denied'],[409,'denied'],[500,'unknown']])test('HTTP '+status+' observation preserves '+outcome+' classification',async()=>{
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f,status):undefined}),r=await x.run();diagnosticSafe(r);assert.equal(r.effectHttp.createWorkflow.httpStatus,status);assert.equal(r.outcomes.createWorkflow,outcome);assert.equal(r.uncertain,outcome==='unknown');assert.equal(r.posts.restore,1);
});
test('network exception has null HTTP and no provider text',async()=>{
 const x=await fixture({effect:q=>{if(q.kind==='createWorkflow')throw Error('PRIVATE_NETWORK');}}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:null,errorCodes:[]});assert.equal(r.outcomes.createWorkflow,'unknown');
});
for(const errors of [[{code:'403'}],[{code:1.1}],[{code:-1}],[{code:2147483648}],[{code:null}],Array.from({length:9},()=>({code:1})),[{message:'PRIVATE_PROVIDER'}]])test('invalid numerical code envelope '+JSON.stringify(errors)+' is suppressed',async()=>{
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f,403,errors):undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});assert.equal(r.outcomes.createWorkflow,'denied');
});
for(const [label,headers,raw]of [
 ['stale Date',{date:'Thu, 01 Jan 1970 00:00:00 GMT'}],
 ['invalid Date',{date:'PRIVATE_PROVIDER'}],
 ['cache age',{age:'1'}],
 ['cache hit',{'cf-cache-status':'HIT'}],
 ['HTML',{'content-type':'text/html'},'<html>PRIVATE_PROVIDER</html>'],
 ['malformed JSON',{},'{PRIVATE_PROVIDER'],
 ['oversize length',{'content-length':'8193'}],
 ['invalid length',{'content-length':'PRIVATE_PROVIDER'}],
 ['oversize chunked',{},JSON.stringify({success:false,errors:[{code:1}],messages:[],padding:'X'.repeat(8200)})]
])test(label+' preserves HTTP but suppresses codes',async()=>{
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f,403,undefined,headers,raw):undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});assert.equal(r.outcomes.createWorkflow,'denied');
});
test('descriptor-safe numeric selection never invokes code getters',async()=>{
 const parse=JSON.parse;let invoked=0;
 try{
  JSON.parse=(...args)=>{const e=parse(...args);if(e?.success===false&&e.errors?.[0]?.message==='PRIVATE_PROVIDER')Object.defineProperty(e.errors[0],'code',{enumerable:true,get(){invoked++;throw Error('PRIVATE_ACCESSOR');}});return e;};
  const x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f):undefined}),r=await x.run();diagnosticSafe(r);assert.equal(invoked,0);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});
 }finally{JSON.parse=parse;}
});
for(const padding of [0,8200])test('HTTP200 soft failure remains unknown with '+padding+' padding bytes',async()=>{
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f,200,undefined,{},JSON.stringify({success:false,errors:[{code:10000,message:'PRIVATE_PROVIDER'}],messages:[],padding:'X'.repeat(padding)})):undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:200,errorCodes:padding?[]:[10000]});assert.equal(r.outcomes.createWorkflow,'unknown');assert.equal(r.workflowCreateAcknowledged,false);
});
test('late4xx is observable but never moves original classification latch',async()=>{
 const x=await fixture({effect:q=>{if(q.kind==='createWorkflow'){q.f.wall+=5001;return deniedResponse(q.f);}}}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});assert.equal(r.outcomes.createWorkflow,'unknown');assert.equal(r.uncertain,true);assert.equal(r.posts.restore,1);
});
for(const cancelMode of ['throw','reject','hang'])test('diagnostic reader cancel '+cancelMode+' is contained and non-awaited',async()=>{
 let cancels=0;
 const x=await fixture({effect:q=>{
  if(q.kind!=='createWorkflow')return;
  const r=deniedResponse(q.f);Object.defineProperty(r,'body',{value:{getReader:()=>({read:async()=>({done:false,value:new Uint8Array(8193)}),cancel(){cancels++;if(cancelMode==='throw')throw Error('PRIVATE_PROVIDER');return cancelMode==='reject'?Promise.reject(Error('PRIVATE_PROVIDER')):new Promise(()=>{});}})}});return r;
 }}),started=performance.now(),r=await x.run();diagnosticSafe(r);assert.ok(performance.now()-started<1500);assert.equal(cancels,1);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});assert.equal(r.posts.restore,1);
});
test('timely4xx hanging body uses original request timer and keeps denied classification',async()=>{
 let release,cancels=0;
 const x=await fixture({effect:q=>{
  if(q.kind!=='createWorkflow')return;
  const r=deniedResponse(q.f);Object.defineProperty(r,'body',{value:{getReader:()=>({read:()=>new Promise(resolve=>{release=resolve;}),cancel:()=>{cancels++;return new Promise(()=>{});}})}});return r;
 }}),started=performance.now(),r=await x.run();diagnosticSafe(r);assert.ok(performance.now()-started<6500);assert.equal(r.outcomes.createWorkflow,'denied');assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});assert.equal(r.posts.terminateWorkflow,0);assert.equal(r.posts.restore,1);assert.equal(cancels,1);
 const captured=JSON.stringify(r);release({done:false,value:new TextEncoder().encode(JSON.stringify({success:false,errors:[{code:999}],messages:[]}))});await new Promise(resolve=>setImmediate(resolve));assert.equal(JSON.stringify(r),captured);
});
test('deferred fetch after final return cannot mutate detached diagnostic or outcomes',async()=>{
 let release,response;
 const x=await fixture({effect:q=>{if(q.kind==='createWorkflow'){response=deniedResponse(q.f);return new Promise(resolve=>{release=resolve;});}}}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:null,errorCodes:[]});assert.equal(r.outcomes.createWorkflow,'unknown');const captured=JSON.stringify(r);release(response);await new Promise(resolve=>setImmediate(resolve));assert.equal(JSON.stringify(r),captured);
});

test('old clone has no effectHttp and never consumes denied effect body',async()=>{
 let bodyReads=0;
 const x=await fixture({effect:q=>{if(q.kind==='upload'){const r=deniedResponse(q.f);Object.defineProperty(r,'body',{value:{getReader(){bodyReads++;throw Error('PRIVATE_PROVIDER');}}});return r;}}});
 const admission=x.api.validateQaLifecycleCommand({event:{...x.event,comment:{...x.event.comment,body:'/afw-qa-deploy-observe-restore v1 '+x.context.sourceRevision}},context:x.context,now:x.now});
 const r=await x.api.runQaClosedCloudClone({admission,credential:'PRIVATE-cf-token-for-test',githubCredential:'PRIVATE-gh-token-for-test',fetchImpl:x.fetchImpl,now:x.now});assert.equal(Object.hasOwn(r,'effectHttp'),false);assert.equal(r.outcomes.upload,'denied');assert.equal(bodyReads,0);assert.equal(r.posts.upload,1);assert.equal(r.mayRetry,false);
});
test('genuine create201 is observed honestly without inferring native completion',async()=>{
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?q.response({id:'afw-qa-arm-'+q.admission.intentId,workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',version_id:'opaque-create-ref'},201):undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:201,errorCodes:[]});assert.equal(r.workflowCreateAcknowledged,true);assert.notEqual(r.status,'verified');assert.equal(r.posts.createWorkflow,1);
});
for(const bytes of [8192,8193])test('exact '+bytes+' byte error envelope enforces diagnostic cap',async()=>{
 const envelope={success:false,errors:[{code:7,message:'PRIVATE_PROVIDER'}],messages:[],padding:''};envelope.padding='X'.repeat(bytes-Buffer.byteLength(JSON.stringify(envelope)));const raw=JSON.stringify(envelope);assert.equal(Buffer.byteLength(raw),bytes);
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f,403,undefined,{},raw):undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:bytes===8192?[7]:[]});assert.equal(r.outcomes.createWorkflow,'denied');
});
for(const raw of ['[]','{"success":false,"errors":[{"code":7}]}','{"success":false,"errors":[],"messages":[]}','{"success":true,"errors":[{"code":7}],"messages":[]}'])test('unknown envelope shape is never projected '+raw,async()=>{
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f,403,undefined,{},raw):undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});
});
test('incomplete error JSON and invalid UTF8 never yield numeric codes',async()=>{
 for(const malformed of [false,true]){
  let reads=0;const x=await fixture({effect:q=>{
   if(q.kind!=='createWorkflow')return;
   const r=deniedResponse(q.f);Object.defineProperty(r,'body',{value:{getReader:()=>({read:async()=>{if(reads++===0)return{done:false,value:malformed?new Uint8Array([255]):new TextEncoder().encode('{"success":false,"errors":[{"code":7}],"messages":[]}')};if(!malformed)throw Error('PRIVATE_PROVIDER');return{done:true};},cancel:async()=>{}})}});return r;
  }}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:[]});assert.equal(r.outcomes.createWorkflow,'denied');
 }
});

test('eight unique numeric error codes are retained at the accepted array bound',async()=>{
 const codes=[0,1,2,3,4,5,6,2147483647],x=await fixture({effect:q=>q.kind==='createWorkflow'?deniedResponse(q.f,403,codes.map(code=>({code}))):undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:403,errorCodes:codes});assert.equal(r.outcomes.createWorkflow,'denied');
});
test('response-shaped status is not evidence of a genuine HTTP response',async()=>{
 const x=await fixture({effect:q=>q.kind==='createWorkflow'?{status:403}:undefined}),r=await x.run();diagnosticSafe(r);assert.deepEqual(r.effectHttp.createWorkflow,{httpStatus:null,errorCodes:[]});assert.equal(r.outcomes.createWorkflow,'unknown');
});

test('closed custody observes the exact ZIP and restores QA with the Queue incident isolated',async()=>{
 const x=await fixture({custody:true}),r=await x.run();
 assert.equal(r.status,'verified',JSON.stringify(r));
 assert.equal(r.purpose,'afw.qa-cloud-closed-custody-observation.v1');
 assert.equal(r.nativeCustodyObservationVerified,true);
 assert.equal(r.nativeResult.releaseZipSha256,'e'.repeat(64));
 assert.equal(r.eventSubscriptionIncidentExcluded,true);
 assert.equal(r.externalStartReady,true);
 assert.equal(r.externalInstanceObserved,true);
 assert.equal(r.posts.createWorkflow,0);
 assert.equal(r.posts.terminateWorkflow,0);
 assert.deepEqual(r.credentialPreflight,{reader:{httpStatus:200,verified:true},publisher:{httpStatus:200,verified:true}});
 assert.equal(r.nativeResult.qaVersionId,CANDIDATE);
 assert.equal(r.finalClosedVerified,true);
 assert.equal(r.operationalReadiness,false);
 assert.equal(r.authorizesEffects,false);
 assert.deepEqual(x.posts,{upload:1,activate:1,restore:1});
 assert.equal(x.workflowPosts,1);
 assert.equal(JSON.stringify(r).includes('content_base64'),false);
});

for(const mode of ['wrongArchive','wrongRuntime','unsuccessfulWorkflow','finalReadbackFailure','externalStartTimeout']){
 test('closed custody rejects '+mode+' and restores the pinned version',async()=>{
  const x=await fixture({custody:true});x.setMode(mode);const r=await x.run();
  assert.notEqual(r.status,'verified');
  assert.equal(r.nativeCustodyObservationVerified,false);
  assert.equal(r.nativeResult,null);
  assert.deepEqual(x.posts,{upload:1,activate:1,restore:1});
  assert.equal(x.f.version,x.f.pins.qaClosed.id);
  assert.equal(r.mayRetry,false);
 });
}

test('closed custody rejects broader incidents and keeps legacy observations conservative',async()=>{
 const scoped=await fixture({custody:true});scoped.setMode('broaderEventIncident');
 const legacy=await fixture();legacy.setMode('exactQueueIncident');
 for(const x of [scoped,legacy]){
  const r=await x.run();
  assert.equal(r.stage,'provider');
  assert.deepEqual(x.posts,{upload:0,activate:0,restore:0});
  assert.equal(x.workflowPosts,0);
 }
});

test('closed custody rejects a changed wrapper and old command before any provider read',async()=>{
 const x=await fixture({custody:true,changedArtifact:true});
 await assert.rejects(()=>x.run());
 assert.equal(x.f.requests.length,0);
 const old=await fixture();
 assert.throws(()=>x.api.validateQaPreEntryCustodyCommand({event:old.event,context:old.context,now:old.now}));
});

test('closed custody rejects crossed credentials before any upload or claim',async()=>{
 const x=await fixture({custody:true});x.setMode('crossedCredentials');
 const r=await x.run();
 assert.equal(r.status,'blocked');
 assert.equal(r.stage,'credential_preflight');
 assert.equal(r.claimAcknowledged,false);
 assert.deepEqual(x.posts,{upload:0,activate:0,restore:0});
 assert.equal(x.f.requests.filter(q=>q.url.pathname.endsWith('/tokens/verify')).length,1);
 assert.deepEqual(r.credentialPreflight,{reader:{httpStatus:200,verified:false},publisher:{httpStatus:null,verified:false}});
 assert.equal(JSON.stringify(r).includes('PRIVATE'),false);
});

test('closed custody keeps a reader HTTP denial separate from an identity mismatch',async()=>{
 const x=await fixture({custody:true});x.setMode('readerDenied');
 const r=await x.run();
 assert.equal(r.status,'blocked');
 assert.equal(r.stage,'credential_preflight');
 assert.deepEqual(r.credentialPreflight,{reader:{httpStatus:401,verified:false},publisher:{httpStatus:null,verified:false}});
 assert.equal(r.claimAcknowledged,false);
 assert.deepEqual(x.posts,{upload:0,activate:0,restore:0});
 assert.equal(JSON.stringify(r).includes('PRIVATE'),false);
});

