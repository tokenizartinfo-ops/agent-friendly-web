import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {ngRootJournal,ngRootRaw,ngNative,ngTickets,ngRetention,ngTime,ngApiJoin,ngLogFrames,ngSchema,ngReadNext,ngSame,ngBad,NG_IDS,NG_SITES} from './reader.mjs';
const bad=()=>{throw Error('ROOT_OWN_CONTROL_FAILED');};
const digest=x=>createHash('sha256').update(x).digest('hex');
const repository='tokenizartinfo-ops/agent-friendly-web',branch='refs/heads/lab/afw-c2-own-receiver-20261116-nextget1',message='AFW-C2-NEXT-GET-OWN-ONEUSE-20261116',parent='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
if(process.argv.length!==2||process.version!=='v22.23.4'||process.env.GITHUB_REPOSITORY!==repository||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_REF!==branch||process.env.GITHUB_JOB!=='c2-next-get-own1'||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9]\d*$/.test(process.env.GITHUB_RUN_ID??'')||git('rev-parse','HEAD')!==process.env.GITHUB_SHA||git('rev-parse','HEAD^')!==parent||git('show','-s','--format=%B','HEAD')!==message)bad();
const read=name=>readFileSync(new URL(name,import.meta.url));
const ngSynthetic=JSON.parse(read('vectors.json')),schemaData=JSON.parse(read('schema.json')),admitted=JSON.parse(read('admission.json'));
const reports=[];
function report(value){if(value.sourceExecuted!==false||value.fail?.length||value.failed?.length)bad();reports.push(value);}
function ngTestEdits(base,edits){
 const x=structuredClone(base);x.tail='';
 for(const e of edits){
  if(e.op==='insert'){x.records.splice(e.index,0,{sequence:0,elapsedMs:0,...e.value});x.records.forEach((r,i)=>{r.sequence=i+1;r.elapsedMs=i;});continue;}
  if(e.op==='truncate'){x.records.length=e.count;continue}
  if(e.op==='tail'){x.tail+=e.value;continue}
  let target=x;for(let i=0;i<e.path.length-1;i++)target=target[e.path[i]];
  target[e.path[e.path.length-1]]=structuredClone(e.value);
 }
 return x;
}
function ngTestTap(tap){
 if(typeof tap!=='string'||/\b(SKIP|TODO|cancelled)\b/i.test(tap))ngBad();
 const cases=[];for(const l of tap.split('\n')){
  const m=/^(not ok|ok) (\d+) - (NG_[A-Z_]+)$/.exec(l);
  if(m){if(Number(m[2])!==cases.length+1||m[3]!==NG_IDS[cases.length])ngBad();cases.push({id:m[3],status:m[1]==='ok'?'pass':'fail'});}
  else if(l&&l!=='TAP version 13'&&l!=='1..6')ngBad();
 }
 return {integrity:cases.length===6?'complete':'prefix',cases,sourceFileFailure:false};
}
const results=[];
for(const v of [...ngSynthetic.accepted,...ngSynthetic.rejected]){
 const x=ngTestEdits(ngSynthetic.base,v.edits);let actual;
 try{const n=ngTestTap(x.tap),raw=x.records.map(r=>JSON.stringify(r)+'\n').join('')+x.tail;actual=ngRootRaw(raw,x.binding,x.condition,n,x.writerFault);}
 catch{actual=null;}
 const pass=v.expected.valid===!!actual&&(!actual||Object.entries(v.expected).every(([k,n])=>k==='valid'||k==='code'||k==='integrity'&&actual.integrity===n||k==='status'&&actual.http.status===n||k==='bodyReadSettled'&&actual.http.bodyReadSettled===n||k==='ticketDelta'&&actual.tickets.delta===n||k==='latestRetention'&&actual.retention.latest.state===n));
 results.push({id:v.id,pass,actual:actual?{integrity:actual.integrity,status:actual.http.status,body:actual.http.bodyReadSettled,delta:actual.tickets.delta}:null});
}
report({syntheticOnly:true,RootOwnPureRamOnly:true,sourceExecuted:false,pass:results.filter(x=>x.pass).length,fail:results.filter(x=>!x.pass)});

function rootApiControls(){

const expected={repository:'tokenizartinfo-ops/agent-friendly-web',branch:'lab/afw-c2-source-20261116-t1-next-get1',workflowPath:'.github/workflows/afw-c2-next-get1.yml',oneUseMessage:'AFW-C2-T1-NEXT-GET1-ONEUSE-20261116',job:'c2-next-get1',parent:'6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',head:'1'.repeat(40),tree:'2'.repeat(40),runId:42,jobId:43};
const admission={requiredSteps:['Read the exact one-use lab head','Use the fixed Node runtime','Install only the existing locked dependencies','Observe one next GET','Preserve one next GET'],commandStep:'Observe one next GET'};
const base={run:{id:42,run_attempt:1,head_sha:expected.head,head_branch:expected.branch,path:expected.workflowPath,event:'push',status:'completed',conclusion:'success',repository:{full_name:expected.repository},head_repository:{full_name:expected.repository}},jobs:{total_count:1,jobs:[{id:43,run_id:42,run_attempt:1,head_sha:expected.head,name:expected.job,status:'completed',conclusion:'success',started_at:'2026-11-16T07:00:00Z',completed_at:'2026-11-16T07:00:06Z',steps:admission.requiredSteps.map((name,i)=>({name,number:i+2,status:'completed',conclusion:'success',started_at:'2026-11-16T07:00:0'+i+'Z',completed_at:'2026-11-16T07:00:0'+(i+1)+'Z'}))}]},commit:{sha:expected.head,tree:{sha:expected.tree},message:expected.oneUseMessage,parents:[{sha:expected.parent}]}};
let total=0,failed=[];
function check(id,wanted,fn){let ok=true;try{fn();}catch{ok=false;}total++;if(ok!==wanted)failed.push(id);}
check('API valid',true,()=>ngApiJoin(base,expected,admission));
const mutations=[
 ['run-id',['run','id'],44],['attempt',['run','run_attempt'],2],['head',['run','head_sha'],'3'.repeat(40)],['branch',['run','head_branch'],'other'],['workflow',['run','path'],'.github/workflows/other.yml'],['event',['run','event'],'workflow_dispatch'],['run-status',['run','status'],'in_progress'],['run-failed',['run','conclusion'],'failure'],['repo',['run','repository','full_name'],'else/project'],['head-repo',['run','head_repository','full_name'],'else/project'],['commit-head',['commit','sha'],'3'.repeat(40)],['commit-tree',['commit','tree','sha'],'3'.repeat(40)],['message',['commit','message'],'other'],['parent',['commit','parents',0,'sha'],'3'.repeat(40)],['job-count',['jobs','total_count'],2],['job-id',['jobs','jobs',0,'id'],44],['job-run',['jobs','jobs',0,'run_id'],44],['job-attempt',['jobs','jobs',0,'run_attempt'],2],['job-head',['jobs','jobs',0,'head_sha'],'3'.repeat(40)],['job-name',['jobs','jobs',0,'name'],'other'],['job-failed',['jobs','jobs',0,'conclusion'],'failure'],['bad-date',['jobs','jobs',0,'started_at'],'2026-99-99T07:00:00Z'],['calendar-normalization',['jobs','jobs',0,'started_at'],'2026-02-31T07:00:00Z'],['step-skipped',['jobs','jobs',0,'steps',3,'conclusion'],'skipped'],['step-name',['jobs','jobs',0,'steps',3,'name'],'other'],['step-number',['jobs','jobs',0,'steps',3,'number'],2],['step-nan',['jobs','jobs',0,'steps',3,'started_at'],'2026-99-99T07:00:03Z'],['step-outside',['jobs','jobs',0,'steps',3,'completed_at'],'2026-11-16T07:00:09Z']
];
for(const [id,path,value] of mutations){const x=structuredClone(base);let target=x;for(const k of path.slice(0,-1))target=target[k];target[path.at(-1)]=value;check(id,false,()=>ngApiJoin(x,expected,admission));}
const joined=ngApiJoin(base,expected,admission),command='node docs/superpowers/source-lab/c2-t1-next-get1/run-c2-next-get1.mjs',markers=['AFW_C2_NG_SYNTHETIC','AFW_C2_DEPENDENCY_CONTROL','AFW_C2_NG_CUSTODY','AFW_C2_NEXT_GET_OUTCOME'];
const logBase=['2026-11-16T07:00:03.001Z ##[group]Run '+command,'2026-11-16T07:00:03.002Z ##[endgroup]',...markers.map((m,i)=>'2026-11-16T07:00:03.'+(100+i)+'Z '+m+' {}')].join('\n')+'\n';
check('log-valid',true,()=>ngLogFrames(logBase,joined,command,markers));
for(const [id,raw] of [
 ['log-nan',logBase.replace('2026-11-16T07:00:03.100Z','2026-99-99T07:00:03.100Z')],
 ['log-outside',logBase.replace('2026-11-16T07:00:03.100Z','2026-11-16T07:01:03.100Z')],
 ['log-duplicate',logBase+'2026-11-16T07:00:03.200Z '+markers[3]+' {}\n'],
 ['log-extra-key-frame',logBase.replace(markers[2]+' {}',markers[2]+' {"key":1, "key":2}')],
 ['log-frame-before-window','2026-11-16T07:00:03.000Z '+markers[0]+' {}\n'+logBase],
 ['log-embedded',logBase.replace(markers[0]+' {}','prefix '+markers[0]+' {}')],
 ['log-wrong-command',logBase.replace(command,'node wrong.mjs')],
 ['log-wrong-frame',logBase.replace(markers[1],'AFW_C2_OTHER')],
 ['log-no-newline-json',logBase.replace(markers[0]+' {}',markers[0]+' { }')]
])check(id,false,()=>ngLogFrames(raw,joined,command,markers));
const union={type:['boolean','null']};for(const v of [true,false,null])check('union-'+v,true,()=>{if(!ngSchema(v,union,union))throw 0;});for(const v of ['true',0,{},[]])check('union-reject-'+JSON.stringify(v),false,()=>{if(!ngSchema(v,union,union))throw 0;});
report({pureRootSynthetic:true,sourceExecuted:false,total,pass:total-failed.length,failed});
return {ngApiJoin,ngLogFrames,ngSchema,ngTime,ngRootJournal,ngRootRaw,base,expected,admission};

}
rootApiControls();

const v=structuredClone(ngSynthetic.base);
const readInput=x=>ngRootRaw(x.records.map(r=>JSON.stringify(r)+'\n').join(''),x.binding,x.condition,ngTestTap(x.tap),x.writerFault);
const inject=(input,r)=>{const x=structuredClone(input);x.records.splice(22,0,r);x.records.forEach((r,i)=>{r.sequence=i+1;r.elapsedMs=i;});return x;};
const before=inject(v,{sequence:0,elapsedMs:0,kind:'worker-state',epoch:1,workerSequence:0,workerElapsedMs:0,fault:false,stats:[],retention:{state:'absent',count:0}});
const a=readInput(before);if(a.retention.latest.state!=='absent'||a.retention.after.state!=='absent'||a.flow.length!==6)throw Error('preGET metadata regression');
const unknown=inject(v,{sequence:0,elapsedMs:0,kind:'worker-unavailable'});readInput(unknown);
const absentMeta=readInput(v);if(!ngSame(absentMeta.retention.latest,{state:'absent',count:0}))throw Error('latest should equal newest metadata');
report({RootOnly:true,sourceExecuted:false,extraControls:3,pass:3});


function ngFullControls(ngSynthetic,schema,admission,hash){
 const expected={repository:'tokenizartinfo-ops/agent-friendly-web',branch:'lab/afw-c2-source-20261116-t1-next-get1',workflowPath:'.github/workflows/afw-c2-next-get1.yml',oneUseMessage:'AFW-C2-T1-NEXT-GET1-ONEUSE-20261116',job:'c2-next-get1',parent:'6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',head:'1'.repeat(40),tree:'2'.repeat(40),runId:42,jobId:43};
 const api={run:{id:42,run_attempt:1,head_sha:expected.head,head_branch:expected.branch,path:expected.workflowPath,event:'push',status:'completed',conclusion:'success',repository:{full_name:expected.repository},head_repository:{full_name:expected.repository}},jobs:{total_count:1,jobs:[{id:43,run_id:42,run_attempt:1,head_sha:expected.head,name:expected.job,status:'completed',conclusion:'success',started_at:'2026-11-16T07:00:00Z',completed_at:'2026-11-16T07:00:06Z',steps:admission.requiredSteps.map((name,i)=>({name,number:i+2,status:'completed',conclusion:'success',started_at:'2026-11-16T07:00:0'+i+'Z',completed_at:'2026-11-16T07:00:0'+(i+1)+'Z'}))}]},commit:{sha:expected.head,tree:{sha:expected.tree},message:expected.oneUseMessage,parents:[{sha:expected.parent}]}};
 const joined=ngApiJoin(api,expected,admission),context=joined.context;
 const records=structuredClone(ngSynthetic.base.records);
 records[0].sourceIndexHash=context.proposalIndexHash;records[0].selectionHash=admission.selectionHash;records[0].driverHash=admission.bindings.driverHash;
 const native=ngTestTap(ngSynthetic.base.tap),raw=records.map(x=>JSON.stringify(x)+'\n').join('');
 const parsed=ngRootRaw(raw,{sourceIndexHash:context.proposalIndexHash,selectionHash:admission.selectionHash,driverHash:admission.bindings.driverHash},'normal',native,false);
 const custody={schema:'afw.c2-next-get.custody.v1',context:{head:context.head,runId:context.runId,runAttempt:1,job:context.job,proposalIndexHash:context.proposalIndexHash},parentNonRoot:true,preflightOwned:true,preflightRemoved:true,checkedLaunches:3,checkedProcesses:3,uidGidGroupsLoopbackMatched:true,ownRootVerified:true,ownTempRemoved:true};
 const outcome={schema:'afw.c2-next-get.observation.v1',context,selectionHash:admission.selectionHash,bindings:structuredClone(admission.bindings),controls:structuredClone(admission.controls),capture:{exitCode:0,signal:'none',errorKind:'none',stdout:{bytes:123,sha256:'f'.repeat(64)},stderr:{bytes:0,sha256:hash('')}},journal:{bytes:Buffer.byteLength(raw),sha256:hash(raw),stable:true,recorderFaultObserved:false,witness:{integrity:'complete',records,prefixBytes:Buffer.byteLength(raw),prefixSha256:hash(raw)}},observation:{valid:true,code:'OK',integrity:parsed.integrity,flow:parsed.flow,http:parsed.http,tickets:parsed.tickets,checkpoints:parsed.checkpoints,retention:parsed.retention,writerFault:false},native,custody,SourceQualified:false,Task1Pass:false,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
 const synthetic={schema:'afw.c2-next-get.synthetic.v1',context,selectionHash:admission.selectionHash,...admission.controls},dependency={schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status:'pass',observation:'EXPECTED_ENOENT'};
 const command='node docs/superpowers/source-lab/c2-t1-next-get1/run-c2-next-get1.mjs';
 const markers=['AFW_C2_NEXT_GET_SYNTHETIC','AFW_C2_DEPENDENCY_CONTROL','AFW_C2_NEXT_GET_CUSTODY','AFW_C2_NEXT_GET_OUTCOME'];
 function wire(x){
  const values=[synthetic,dependency,x.custody,x];
  return ['2026-11-16T07:00:03.001Z ##[group]Run '+command,'2026-11-16T07:00:03.002Z ##[endgroup]',...markers.map((m,i)=>'2026-11-16T07:00:03.'+(100+i)+'Z '+m+' '+JSON.stringify(values[i]))].join('\n')+'\n';
 }
 const artifact={runId:42,jobId:43,listing:{total_count:1,artifacts:[{id:44,name:'afw-c2-next-get1',expired:false,size_in_bytes:2048,workflow_run:{id:42,head_sha:expected.head,head_branch:expected.branch},digest:'sha256:'+'e'.repeat(64)}]},artifactId:44,fileName:'c2-next-get1.json',payloadText:JSON.stringify(outcome)+'\n',archiveSha256:'e'.repeat(64)};
 const input={...api,expected,transport:{runId:42,jobId:43,rawLog:wire(outcome)},artifact};
 let total=0,failed=[];
 function check(id,want,fn){let ok=true;try{fn();}catch{ok=false;}total++;if(ok!==want)failed.push(id);}
 check('full-valid',true,()=>ngReadNext(input,schema,admission,hash));
 const mutations=[
 ['source-qualified',['SourceQualified'],true],['task1-pass',['Task1Pass'],true],['pcoff',['nonclaims','PCoff'],true],['wrong-context',['context','head'],'3'.repeat(40)],['wrong-binding',['bindings','readerHash'],'3'.repeat(64)],['wrong-selection',['selectionHash'],'3'.repeat(64)],['controls',['controls','accepted'],4],['custody-launches',['custody','checkedLaunches'],2],['custody-root',['custody','parentNonRoot'],false],['unstable',['journal','stable'],false],['writerfault',['journal','recorderFaultObserved'],true],['prefixbytes',['journal','witness','prefixBytes'],1],['prefixhash',['journal','witness','prefixSha256'],'3'.repeat(64)],['journalhash',['journal','sha256'],'3'.repeat(64)],['null-status-zero',['observation','http','status'],0],['status-forged',['observation','http','status'],503],['body-forged',['observation','http','bodyReadSettled'],false],['delta-forged',['observation','tickets','delta'],0],['retention-forged',['observation','retention','after','count'],1],['native-falsefail',['native','cases',0,'status'],'fail'],['native-unknown',['native','integrity'],'unknown'],['record-extra',['journal','witness','records',1,'private'],'forbidden'],['record-sequence',['journal','witness','records',1,'sequence'],100],['record-time',['journal','witness','records',1,'elapsedMs'],-1],['wrong-flow',['observation','flow',0,'action'],'threw']
 ];
 for(const [id,path,value]of mutations){
  const x=structuredClone(outcome);let at=x;for(const k of path.slice(0,-1))at=at[k];at[path.at(-1)]=value;
  const copy=structuredClone(input);copy.transport.rawLog=wire(x);copy.artifact.payloadText=JSON.stringify(x)+'\n';
  check(id,false,()=>ngReadNext(copy,schema,admission,hash));
 }
 const artifactMutations=[
 ['artifact-id',['artifactId'],45],['artifact-run',['runId'],45],['artifact-job',['jobId'],45],['artifact-filename',['fileName'],'wrong.json'],['artifact-sha',['archiveSha256'],'d'.repeat(64)],['artifact-count',['listing','total_count'],2],['artifact-expired',['listing','artifacts',0,'expired'],true],['artifact-head',['listing','artifacts',0,'workflow_run','head_sha'],'3'.repeat(40)],['artifact-branch',['listing','artifacts',0,'workflow_run','head_branch'],'other'],['artifact-payload',['payloadText'],'{}\n']
 ];
 for(const [id,path,value]of artifactMutations){
  const copy=structuredClone(input);let at=copy.artifact;for(const k of path.slice(0,-1))at=at[k];at[path.at(-1)]=value;
  check(id,false,()=>ngReadNext(copy,schema,admission,hash));
 }
 check('schema-wrong',false,()=>ngReadNext(input,{type:'object'},admission,hash));
 report({pureRootSynthetic:true,sourceExecuted:false,fullGlueControls:total,pass:total-failed.length,failed});
 return {input,outcome,admission,total,failed};
}

ngFullControls(ngSynthetic,schemaData,admitted,digest);

if(reports.length!==4||reports[0].pass!==33||reports[1].pass!==46||reports[2].pass!==3||reports[3].pass!==37)bad();
process.stdout.write('AFW_C2_NEXT_OWN_CONTROL '+JSON.stringify({schema:'afw.c2-next-get.root-own-control.v1',repository,head:process.env.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:process.env.GITHUB_JOB,node:process.version,controls:{journal:33,apiLogSchema:46,preGetMetadata:3,fullInput:37,total:119,failed:0},moduleSha256:digest(read('reader.mjs')),vectorsSha256:digest(read('vectors.json')),schemaSha256:digest(read('schema.json')),admissionSha256:digest(read('admission.json')),actualNativeImportGraph:true,SourceExecuted:false,SourceQualified:false,Task1Pass:false,PCoff:false})+'\n');
