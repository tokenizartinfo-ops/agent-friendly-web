# C2 Task1 · Root independent controller checkpoint

2026-11-16 03:25:29 UTC. Controller implementation is independent of proposed Source runner. No Source execution or actual cloud acceptance. Final producer contract62f51b0114aaa0a3697ceaedd00f1f1b9750501c was read in full; whole-receipt marker AFW_C2_SOURCE_RECEIPT SPACE + canonical JSON + LF nominated by Root, pending confirmation in final runner. C2SOURCE case frames remain private TAP capture only.

Immutable OWN record code9cec69cafc759a63240f9144d6470d91fc414227, API join00976d454192ed680c00200b084e9c9c46c6f3cd, controls+full synthetic fixturese1007f5be4c565f09a81af822d0776cbbcde719c. Executed in Root V8 only: record1 positive/60 negative; API1 positive/34 negative. Their sourceLabQualified field on the positive fixture is solely the expected controller result for synthetic all-bound evidence; it is NOT current eligibility. All seven operational nonclaims remain false.

Record checks canonical UTF8 frame cap24576 and exact shapes/context/admissions/mode/case order, actual integer counters0..3, first17 monotonic main-graph observations and last3 isolated graphs. Green requires real stage1/2/3 counters at causal checkpoints; baseline requires original connection/OAuth pass and noticesfail at1/1/1; one-edit prefix mutant must kill EXTRA_KEY. Unknown/missing capture/skip/nonclaimtrue fails. API joins exact one-use branch/message/head/tree/parent/run_attempt1/push/workflow/job and successful ordered named steps from authenticated GitHub metadata. Final exact step names must be fixed against inspected workflow before running.

Missing final runner/index/workflow/body admissions, line-to-API-step mapping and final Rootgate. Controller code may be finalized only against those fixed artifacts; no retry/refetch or local Source execution. No C2 ref/run created. Source/main/runtime unchanged by this checkpoint.

## Record receiver

```javascript
function c2RootReceive(frame,expected){
 const bad=()=>{throw Error('C2_RECEIPT_UNQUALIFIED');};
 const keys=(v,k)=>{if(v===null||typeof v!=='object'||Array.isArray(v)||JSON.stringify(Object.keys(v))!==JSON.stringify(k))bad();};
 const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bytes=s=>{try{return encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;}catch{bad();}};
 const marker='AFW_C2_SOURCE_RECEIPT ';
 if(typeof frame!=='string'||!frame.startsWith(marker)||!frame.endsWith('\n')||frame.slice(0,-1).includes('\n')||bytes(frame)>24576)bad();
 const body=frame.slice(marker.length,-1);let value;try{value=JSON.parse(body);}catch{bad();}
 if(JSON.stringify(value)!==body)bad();
 keys(value,['schema','context','admitted','runs','nonclaims']);
 if(value.schema!=='afw.c2-source-lab-receipt.v1')bad();
 const contextKeys=['repository','baselineSource','baselineTree','proposalIndexHash','head','tree','runId','runAttempt','job','node'];
 keys(value.context,contextKeys);keys(expected.context,contextKeys);
 const c=value.context;
 if(c.repository!=='tokenizartinfo-ops/agent-friendly-web'||c.baselineSource!=='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68'||c.baselineTree!=='62e78926635d6b74f288d6c0d69e0f2516306989'||!/^[a-f0-9]{64}$/.test(c.proposalIndexHash)||!/^[a-f0-9]{40}$/.test(c.head)||!/^[a-f0-9]{40}$/.test(c.tree)||typeof c.runId!=='string'||!(/^[1-9][0-9]*$/).test(c.runId)||c.runAttempt!==1||c.job!=='c2-source-lab'||c.node!=='v22.23.4'||!eq(c,expected.context))bad();
 if(!Array.isArray(value.admitted)||!value.admitted.length||!Array.isArray(expected.admitted)||!eq(value.admitted,expected.admitted))bad();
 const paths=new Set();for(const a of value.admitted){keys(a,['path','sha256','bytes']);if(typeof a.path!=='string'||!(/^[a-zA-Z0-9_.\/-]+$/).test(a.path)||a.path.startsWith('/')||a.path.split('/').some(x=>x===''||x==='.'||x==='..')||paths.has(a.path)||!(/^[a-f0-9]{64}$/).test(a.sha256)||!Number.isSafeInteger(a.bytes)||a.bytes<1)bad();paths.add(a.path);}
 const ids=['CONNECTION','OAUTH','HANDLE','PROJECTREF','SUBJECT','PHASE_RENAME','SOURCE_BYTES','APPROVAL','PREDECESSOR','GRANT_REVOKED','EXTRA_KEY','NOTICES','MONITOR_COOKIE','MONITOR','SCOPE_MISSING','FINITE','SELECTION','LOST_ACK_DUPLICATE','UNRESOLVED_WRITER','OWN_PROMISE'].map(x=>'C2T1_'+x);
 const phases=['connection','oauth','negative','negative','negative','negative','negative','negative','negative','negative','negative','notices','monitor','monitor','scope','finite','selection','negative','negative','negative'];
 const modes=['baseline-red','proposal-green','mutant-prefix'];
 if(!Array.isArray(value.runs)||value.runs.length!==3)bad();
 for(let m=0;m<3;m++){
  const run=value.runs[m];keys(run,['mode','exitCode','qualified','cases']);
  if(run.mode!==modes[m]||!Number.isInteger(run.exitCode)||run.exitCode<0||run.exitCode>255||typeof run.qualified!=='boolean'||!Array.isArray(run.cases)||run.cases.length!==20)bad();
  let previous={upload:0,activation:0,receipts:0};
  for(let i=0;i<20;i++){
   const row=run.cases[i];keys(row,['id','status','phase','counters','code']);keys(row.counters,['upload','activation','receipts']);
   if(row.id!==ids[i]||row.phase!==phases[i]||!['pass','fail'].includes(row.status)||row.code!==(row.status==='pass'?'OK':'TEST_FAILED'))bad();
   const n=row.counters;if(Object.values(n).some(x=>!Number.isInteger(x)||x<0||x>3)||n.receipts>n.activation||n.activation>n.upload)bad();
   if(i<17){for(const key of ['upload','activation','receipts'])if(n[key]<previous[key])bad();previous=n;}
  }
  const allPass=run.cases.every(x=>x.status==='pass');
  if(run.qualified!==(run.exitCode===0&&allPass))bad();
  if(m===0){if(run.qualified||run.exitCode===0||run.cases[0].status!=='pass'||run.cases[1].status!=='pass'||run.cases[11].status!=='fail'||!eq(run.cases[11].counters,{upload:1,activation:1,receipts:1}))bad();}
  if(m===1){if(!run.qualified||!allPass||run.exitCode!==0)bad();for(let i=0;i<17;i++){const n=i<11?1:i<15?2:3;if(!eq(run.cases[i].counters,{upload:n,activation:n,receipts:n}))bad();}}
  if(m===2){if(run.qualified||run.exitCode===0||run.cases[10].status!=='fail')bad();}
 }
 const flags=['historicalCauseProven','receiptAuthenticated','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'];
 keys(value.nonclaims,flags);if(Object.values(value.nonclaims).some(x=>x!==false))bad();
 return {schema:value.schema,sourceLabQualified:true,context:value.context,admitted:value.admitted.length,casesPerMode:20,modes:modes.slice(),nonclaims:value.nonclaims};
}
```

## API join

```javascript
function c2RootApiJoin({run,jobs,commit,expected}){
 const bad=()=>{throw Error('C2_API_UNQUALIFIED');};
 const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 const hex=x=>typeof x==='string'&&/^[a-f0-9]{40}$/.test(x);
 const id=x=>Number.isSafeInteger(x)&&x>0;
 if(!obj(run)||!obj(jobs)||!obj(commit)||!obj(expected))bad();
 if(expected.repository!=='tokenizartinfo-ops/agent-friendly-web'||expected.branch!=='lab/afw-c2-source-20261116-t1'||expected.workflowPath!=='.github/workflows/afw-c2-source-lab.yml'||expected.oneUseMessage!=='AFW-C2-OWNER-STAGES-SOURCE-T1-ONEUSE-20261116'||expected.job!=='c2-source-lab')bad();
 if(![expected.head,expected.tree,expected.parent].every(hex)||expected.parent!=='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68'||!id(expected.runId)||!id(expected.jobId)||!Array.isArray(expected.requiredSteps)||!expected.requiredSteps.length||expected.requiredSteps.some(x=>typeof x!=='string'||!x.length)||new Set(expected.requiredSteps).size!==expected.requiredSteps.length)bad();
 if(run.id!==expected.runId||run.head_sha!==expected.head||run.head_branch!==expected.branch||run.run_attempt!==1||run.event!=='push'||run.path!==expected.workflowPath||run.status!=='completed'||run.conclusion!=='success'||run.repository?.full_name!==expected.repository||run.head_repository?.full_name!==expected.repository)bad();
 if(commit.sha!==expected.head||commit.tree?.sha!==expected.tree||commit.message!==expected.oneUseMessage||!Array.isArray(commit.parents)||commit.parents.length!==1||commit.parents[0]?.sha!==expected.parent)bad();
 if(jobs.total_count!==1||!Array.isArray(jobs.jobs)||jobs.jobs.length!==1)bad();
 const job=jobs.jobs[0];
 if(!obj(job)||job.id!==expected.jobId||job.run_id!==expected.runId||job.run_attempt!==1||job.name!==expected.job||job.head_sha!==expected.head||job.status!=='completed'||job.conclusion!=='success'||!Array.isArray(job.steps)||!job.steps.length)bad();
 if(job.steps.some(s=>!obj(s)||!Number.isSafeInteger(s.number)||s.number<1||typeof s.name!=='string'||s.status!=='completed'||s.conclusion!=='success')||new Set(job.steps.map(s=>s.number)).size!==job.steps.length)bad();
 const selected=expected.requiredSteps.map(name=>{const found=job.steps.filter(s=>s.name===name);if(found.length!==1)bad();return found[0].number;});
 if(selected.some((n,i)=>i&&n<=selected[i-1]))bad();
 return {repository:expected.repository,baselineSource:expected.parent,head:expected.head,tree:expected.tree,runId:String(expected.runId),runAttempt:1,job:expected.job,jobId:expected.jobId,commandStepNumbers:selected};
}
```
