import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {posix} from 'node:path';
import {runInNewContext} from 'node:vm';
import {buildQaNativeWrapper} from '../lib/mcp-qa-native-wrapper-build.mjs';

const source='a'.repeat(40),runner='/synthetic/runner',dir=runner+'/afw-native-observation';
let pinned;
const artifact=()=>pinned??=buildQaNativeWrapper({sourceRevision:source});
// Only I/O and controller/profile boundaries are synthetic. The entry, fixed parser,
// private-file loader, committed-pin validator and settlement clock are real source.
async function execute(mode='normal',{prepare=false}={}){
 let wall=Date.now(),mono=100,runs=0,apiCalls=0,validated=0,closed=0;
 const writes=[],logs=[],requests=[],reads=[];
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000199,body:'/afw-qa-native-observe-restore v1 '+source,created_at:new Date(wall-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}};
 if(mode==='badEvent')event.comment.body+=';echo PRIVATE_EVENT';
 if(mode==='oldCommand')event.comment.body='/afw-qa-deploy-observe-restore v1 '+source;
 if(mode==='stale')event.comment.created_at=new Date(wall-300000).toISOString();
 if(mode==='future')event.comment.created_at=new Date(wall+1).toISOString();
 const env={GITHUB_ACTIONS:'true',RUNNER_TEMP:runner,GITHUB_EVENT_PATH:'/synthetic/event.json',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/main',GITHUB_EVENT_NAME:'issue_comment',GITHUB_RUN_ID:'41200000199',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:source,AFW_QA_CLOSED_TOKEN:'PRIVATE_CF_TOKEN_123456789012345',GITHUB_TOKEN:'ghs_PRIVATE_SYNTHETIC_'+'a'.repeat(200)+'.'+'b'.repeat(280)};
 if(mode==='attempt2')env.GITHUB_RUN_ATTEMPT='2';
 if(mode==='notActions')env.GITHUB_ACTIONS='false';
 if(mode==='relativeRunner')env.RUNNER_TEMP='relative';
 const process={env,argv:['node',prepare?'scripts/qa-native-baseline-prepare.mjs':'scripts/qa-cloud-native-observation.mjs'],exitCode:0};
 if(mode==='extraArg')process.argv.push('--output=PRIVATE');
 const a=await artifact(),{base64,...manifest}=a;
 let entryModule=Buffer.from(base64,'base64');
 if(mode==='mutatedBytes'||mode==='mutatedBytesAndHash'){entryModule=Buffer.from(entryModule);entryModule[0]^=1;}
 if(mode==='mutatedBytesAndHash')manifest.sha256=createHash('sha256').update(entryModule).digest('hex');
 if(mode==='wrongHash')manifest.sha256='0'.repeat(64);
 if(mode==='wrongArtifactSource')manifest.sourceRevision='b'.repeat(40);
 if(mode==='wrongBaseline')manifest.baselineVersionId='00000000-0000-0000-0000-000000000000';
 if(mode==='manifestUnknown')manifest.PRIVATE_EXTRA=true;
 if(mode==='manifestBase64')manifest.base64='PRIVATE';
 let manifestBytes=Buffer.from(mode==='malformedManifest'?'{PRIVATE':JSON.stringify(manifest));
 const eventRaw=mode==='malformedEvent'?'{PRIVATE':JSON.stringify(event);
 const baselineBytes=Buffer.from('PRIVATE_SYNTHETIC_BASE');
 const fs={
  stat:async p=>{assert.equal(p,env.GITHUB_EVENT_PATH);return{size:mode==='eventOversize'?1048577:Buffer.byteLength(eventRaw),isFile:()=>true};},
  realpath:async p=>mode==='runnerAlias'&&p===runner?'/other':mode==='directoryAlias'&&p===dir?'/other':p,
  lstat:async p=>{
   assert.ok([runner,dir,dir+'/index.mjs',dir+'/wrapper-manifest.json'].includes(p),p);
   const isModule=p===dir+'/index.mjs',isManifest=p===dir+'/wrapper-manifest.json';
   return{size:isModule?(mode==='moduleOversize'?131073:entryModule.length):isManifest?(mode==='manifestOversize'?4097:manifestBytes.length):0,nlink:mode==='hardlink'&&isModule?2:1,mode:mode==='nonprivate'&&isModule?0o644:0o600,isFile:()=>!(mode==='notFile'&&isModule),isSymbolicLink:()=>mode==='symlink'&&isModule||mode==='runnerSymlink'&&p===runner||mode==='directorySymlink'&&p===dir};
  },
  readFile:async(p,encoding)=>{
   reads.push(p);
   if(p===env.GITHUB_EVENT_PATH){assert.equal(encoding,'utf8');return mode==='eventReadOversize'?' '.repeat(1048577):eventRaw;}
   assert.ok([dir+'/index.mjs',dir+'/wrapper-manifest.json'].includes(p),p);
   return p.endsWith('/index.mjs')?(mode==='moduleReadOversize'?Buffer.alloc(131073):entryModule):manifestBytes;
  },
  writeFile:async(path,text,options)=>{if(mode==='existingOutput')throw Error('PRIVATE_EEXIST');writes.push({path,text:Buffer.isBuffer(text)?text.toString():text,options});}
 };
 const api={
  request:async o=>{requests.push(JSON.parse(JSON.stringify(o)));if(mode==='forbidden'||mode==='privateFetch')throw Error('PRIVATE_403');if(mode==='staleAfterRead')wall+=300000;return{result:{modules:[{content_base64:baselineBytes.toString('base64')}]}};},
  assertCurrent:()=>{if(mode==='expiredApi')throw Error('PRIVATE_EXPIRED');},
  readDiagnostic:()=>({purpose:'afw.own-closed-read-transport.v1',state:requests.length?'blocked':'idle',httpStatus:mode==='forbidden'?403:null,reads:requests.length,PRIVATE:'PRIVATE_TRANSPORT_BODY',authorizesEffects:false,operationalReadiness:false}),
  close:()=>closed++
 };
 const __run=async({admission,credential,githubCredential,artifact:loaded})=>{
  runs++;if(mode==='controllerThrows')throw Error('PRIVATE_PROVIDER_STACK');
  assert.equal(credential,env.AFW_QA_CLOSED_TOKEN);assert.equal(githubCredential,env.GITHUB_TOKEN);
  assert.equal(loaded.base64,a.base64);assert.equal(loaded.sourceRevision,source);
  assert.equal(admission.purpose,'afw.qa-native-observation-command.v1');
  const r={purpose:'afw.qa-cloud-native-observation.v1',status:'verified',intentId:admission.intentId,sourceRevision:source,commentId:admission.commentId,runId:admission.runId,candidateVersionId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',workflowInstanceId:'afw-qa-arm-'+admission.intentId,nativeMetadataObservationVerified:true,finalClosedVerified:true,finalReadback:{observedAt:new Date(wall).toISOString()},authorizesEffects:false,armEligibilityVerified:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
  if(['diagnosticResult','diagnosticAtCap','diagnosticOverCap'].includes(mode))r.effectHttp={purpose:'afw.qa-native-effect-http.v1',...Object.fromEntries(['upload','activate','createWorkflow','restore','terminateWorkflow'].map(k=>[k,{httpStatus:599,errorCodes:[2147483640,2147483641,2147483642,2147483643,2147483644,2147483645,2147483646,2147483647]}]))};
  if(['diagnosticAtCap','diagnosticOverCap'].includes(mode)){r.padding='';r.padding='X'.repeat((mode==='diagnosticAtCap'?15000:15001)-Buffer.byteLength(JSON.stringify(r)));}
  if(mode==='wrongResultSource')r.sourceRevision='b'.repeat(40);
  if(mode==='wrongResultIntent')r.intentId='b'.repeat(64);
  if(mode==='oversizeResult')r.extra='X'.repeat(15001);
  if(mode==='resultAuthority')r.authorizesEffects=true;
  if(mode==='lateWall'||mode==='lateMono')Object.defineProperty(r,'settlement',{enumerable:true,get(){if(mode==='lateWall')wall=admission.cleanupExpiresAt;else mono+=480000;return 'captured';}});
  return r;
 };
 const built=await build({entryPoints:[prepare?'scripts/qa-native-baseline-prepare.mjs':'scripts/qa-cloud-native-observation.mjs'],bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'real-native-entry-synthetic-io',setup(b){
  for(const [filter,path]of [[/^node:fs\/promises$/,'fs'],[/^node:path$/,'path'],[/^node:crypto$/,'crypto'],[/mcp-qa-cloud-clone\.mjs$/,'controller'],[/mcp-qa-own-closed-api\.mjs$/,'api']])b.onResolve({filter},()=>({path,namespace:'entry-test'}));
  b.onLoad({filter:/.*/,namespace:'entry-test'},o=>({loader:'js',contents:{
   fs:'export const readFile=globalThis.__fs.readFile,writeFile=globalThis.__fs.writeFile,stat=globalThis.__fs.stat,lstat=globalThis.__fs.lstat,realpath=globalThis.__fs.realpath;',
   path:'export const join=globalThis.__path.join,resolve=globalThis.__path.resolve,isAbsolute=globalThis.__path.isAbsolute;',
   crypto:'export const createHash=globalThis.__crypto.createHash;',
   controller:'export const runQaNativeMetadataObservation=globalThis.__run,validateQaClosedBaseVersion=globalThis.__validate;',
   api:'export const createOwnClosedReadbackApi=globalThis.__createApi;'
  }[o.path]}));
 }}]});
 const ClockDate=class extends Date{static now(){if(mode==='privateClock')throw Error('PRIVATE_ADMISSION_EXCEPTION');return wall;}};
 await runInNewContext('(async()=>{'+built.outputFiles[0].text+'})()',{process,Date:ClockDate,performance:{now:()=>mono},Buffer,Response,AbortController,TextDecoder,setTimeout,clearTimeout,fetch:async()=>{throw Error('Unexpected network');},console:{log:s=>logs.push(s),error:s=>logs.push(s)},__fs:fs,__path:posix,__crypto:{createHash},__run,__createApi:({credential})=>{apiCalls++;assert.equal(credential,env.AFW_QA_CLOSED_TOKEN);return api;},__validate:v=>{validated++;if(mode==='wrongProfile')throw Error('PRIVATE_PROFILE');return v;}});
 return{process,writes,logs,runs,apiCalls,validated,closed,requests,reads,baselineBytes};
}
const safe=r=>{assert.doesNotMatch(JSON.stringify([r.writes.map(w=>({...w,text:w.path.startsWith(runner)?'<private-baseline>':w.text})),r.logs]),/PRIVATE|ghs_/);};
const output=r=>JSON.parse(r.writes[0].text);
test('real native CLI validates source-correlated metadata and writes only fixed private result',async()=>{
 const r=await execute();assert.equal(r.runs,1);assert.equal(r.apiCalls,0);assert.equal(r.process.exitCode,0);assert.equal(r.writes.length,1);
 assert.equal(r.writes[0].path,'afw-qa-native-observation-result.json');assert.deepEqual(JSON.parse(JSON.stringify(r.writes[0].options)),{flag:'wx',mode:0o600});
 const out=output(r);assert.equal(out.sourceRevision,source);assert.equal(out.commentId,'6550000199');assert.equal(out.runId,'41200000199');assert.equal(out.workflowInstanceId,'afw-qa-arm-'+out.intentId);assert.equal(out.nativeMetadataObservationVerified,true);assert.equal(out.finalClosedVerified,true);
 const marker=r.logs.find(s=>s.startsWith('AFW_QA_NATIVE_OBSERVATION_RESULT '));assert.deepEqual(JSON.parse(marker.slice('AFW_QA_NATIVE_OBSERVATION_RESULT '.length)),out);safe(r);
});
for(const mode of ['lateWall','lateMono'])test('real native CLI retains correlation but rejects '+mode+' settlement',async()=>{
 const r=await execute(mode),out=output(r);assert.equal(r.runs,1);assert.equal(r.process.exitCode,1);assert.equal(out.status,'uncertain');assert.equal(out.entrySettlementTimely,false);assert.equal(out.nativeMetadataObservationVerified,false);assert.equal(out.finalClosedVerified,false);assert.equal(out.finalReadback,null);assert.ok(out.retainedDatedReadback.observedAt);assert.equal(out.candidateVersionId,'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');assert.equal(out.sourceRevision,source);assert.equal(out.mayRetry,false);safe(r);
});
for(const [stage,modes]of [
 ['event_file',['malformedEvent','eventOversize','eventReadOversize','notActions','extraArg']],
 ['admission',['badEvent','oldCommand','stale','attempt2']],
 ['artifact_load',['relativeRunner','runnerAlias','runnerSymlink','directoryAlias','directorySymlink','mutatedBytes','mutatedBytesAndHash','wrongHash','wrongArtifactSource','wrongBaseline','manifestUnknown','manifestBase64','malformedManifest','symlink','hardlink','nonprivate','notFile','moduleOversize','manifestOversize','moduleReadOversize']],
 ['controller',['controllerThrows']],
 ['settlement',['wrongResultSource','wrongResultIntent','oversizeResult','resultAuthority','diagnosticOverCap']]
])for(const mode of modes)test('real native CLI safely blocks '+mode+' at '+stage,async()=>{
 const r=await execute(mode);assert.equal(r.process.exitCode,1);assert.equal(r.runs,['controller','settlement'].includes(stage)?1:0);assert.equal(r.apiCalls,0);assert.equal(r.writes[0].path,'afw-qa-native-observation-entry-failure.json');const out=output(r);assert.equal(out.stage,stage);assert.equal(out.status,'blocked');assert.deepEqual(Object.keys(out).sort(),['purpose','status','stage','authorizesEffects','operationalReadiness','mayRetry'].sort());const marker=r.logs.find(s=>s.startsWith('AFW_QA_NATIVE_OBSERVATION_ENTRY_RESULT '));assert.deepEqual(JSON.parse(marker.slice('AFW_QA_NATIVE_OBSERVATION_ENTRY_RESULT '.length)),out);safe(r);
});
test('real native CLI refuses evidence overwrite and still emits bounded stage marker',async()=>{
 const r=await execute('existingOutput');assert.equal(r.process.exitCode,1);assert.equal(r.writes.length,0);const marker=r.logs.find(s=>s.startsWith('AFW_QA_NATIVE_OBSERVATION_ENTRY_RESULT '));assert.equal(JSON.parse(marker.slice('AFW_QA_NATIVE_OBSERVATION_ENTRY_RESULT '.length)).stage,'artifact');safe(r);
});
test('real preparer uses stateless exact event, one fixed GET/profile check and one private exclusive baseline write',async()=>{
 const r=await execute('normal',{prepare:true});assert.equal(r.process.exitCode,0);assert.equal(r.runs,0);assert.equal(r.apiCalls,1);assert.equal(r.validated,1);assert.equal(r.closed,1);
 assert.deepEqual(r.requests,[{method:'GET',path:'/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-independent-closure-qa/versions/c570b60b-95dc-48e1-89f3-9c4651691dbc',query:{include:'modules'}}]);
 assert.equal(r.writes.length,1);assert.equal(r.writes[0].path,runner+'/afw-qa-legacy-exact-base.mjs');assert.equal(r.writes[0].text,r.baselineBytes.toString());assert.deepEqual(JSON.parse(JSON.stringify(r.writes[0].options)),{flag:'wx',mode:0o600});
 const marker=r.logs.find(s=>s.startsWith('AFW_NATIVE_BASE_PREPARATION ')),out=JSON.parse(marker.slice('AFW_NATIVE_BASE_PREPARATION '.length));assert.equal(out.readOnly,true);assert.equal(out.authorizesEffects,false);assert.equal(out.operationalReadiness,false);assert.equal(out.sourceRevision,source);assert.ok(out.intentId);safe(r);
});
for(const mode of ['badEvent','oldCommand','stale','attempt2','malformedEvent','notActions','extraArg','relativeRunner','runnerAlias','runnerSymlink','forbidden','wrongProfile','expiredApi','staleAfterRead','existingOutput'])test('real preparer rejects '+mode+' without writes or effects',async()=>{
 const r=await execute(mode,{prepare:true});assert.equal(r.process.exitCode,1);assert.equal(r.runs,0);assert.equal(r.writes.length,0);assert.ok(r.requests.length<=1);assert.ok(r.requests.every(r=>r.method==='GET'));assert.equal(r.logs.length,1);assert.ok(r.logs[0].startsWith('AFW_NATIVE_BASE_PREPARATION_RESULT '));assert.equal(r.closed,r.apiCalls);safe(r);
});

for(const mode of ['diagnosticResult','diagnosticAtCap'])test('real CLI serializes bounded numerical diagnostics '+mode+' under unchanged caps',async()=>{
 const r=await execute(mode);assert.equal(r.process.exitCode,0);assert.equal(r.writes.length,1);const out=output(r);assert.equal(out.effectHttp.purpose,'afw.qa-native-effect-http.v1');assert.deepEqual(out.effectHttp.createWorkflow.errorCodes,[2147483640,2147483641,2147483642,2147483643,2147483644,2147483645,2147483646,2147483647]);assert.ok(Buffer.byteLength(r.writes[0].text)<=16384);if(mode==='diagnosticAtCap')assert.equal(Buffer.byteLength(r.writes[0].text),15001);safe(r);
});

const preparationFailure=r=>{
 assert.equal(r.process.exitCode,1);assert.equal(r.runs,0);assert.equal(r.writes.length,0);assert.equal(r.logs.length,1);
 const prefix='AFW_NATIVE_BASE_PREPARATION_RESULT ';assert.ok(r.logs[0].startsWith(prefix));assert.ok(Buffer.byteLength(r.logs[0])<=512);
 const out=JSON.parse(r.logs[0].slice(prefix.length));
 assert.deepEqual(Object.keys(out).sort(),['purpose','status','stage','admissionStatus','transport','readOnly','authorizesEffects','operationalReadiness','mayRetry'].sort());
 assert.equal(out.purpose,'afw.qa-native-base-preparation-failure.v1');assert.equal(out.status,'blocked');assert.equal(out.readOnly,true);
 for(const k of ['authorizesEffects','operationalReadiness','mayRetry'])assert.equal(out[k],false);
 assert.equal(r.closed,r.apiCalls);assert.ok(r.requests.length<=1);assert.ok(r.requests.every(q=>q.method==='GET'));safe(r);return out;
};
// Removing or misplacing a stage must fail: these exercise the bundled real entry,
// real JSON event parser and admission parser, with only external I/O/profile mocked.
for(const [mode,stage,admissionStatus,calls]of [
 ['notActions','event_file',null,0],['relativeRunner','event_file',null,0],
 ['malformedEvent','event_parse',null,0],['badEvent','admission','denied',0],
 ['future','admission','denied',0],['stale','admission','denied',0],
 ['privateClock','admission','exception',0],['forbidden','metadata_get',null,1],
 ['privateFetch','metadata_get',null,1],['expiredApi','metadata_current',null,1],
 ['wrongProfile','baseline_correlation',null,1],['staleAfterRead','readmission','denied',1],
 ['existingOutput','baseline_write',null,1]
])test('preparer reports sanitized stage without effects for '+mode,async()=>{
 const r=await execute(mode,{prepare:true}),out=preparationFailure(r);
 assert.equal(out.stage,stage);assert.equal(out.admissionStatus,admissionStatus);assert.equal(r.requests.length,calls);
 assert.equal(out.transport?.httpStatus??null,mode==='forbidden'?403:null);
 if(calls)assert.deepEqual(out.transport,{state:'blocked',httpStatus:mode==='forbidden'?403:null,reads:1});else assert.equal(out.transport,null);
});
