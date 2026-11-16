function c2V2CheckModeCases(mode,cases,exitCode){
 const bad=()=>{throw Error('C2_V2_MODE_CASES_REJECTED');};
 const keys=(v,k)=>{if(v===null||typeof v!=='object'||Array.isArray(v))return false;const a=Object.keys(v);return a.length===k.length&&a.every((key,i)=>key===k[i]);};
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const allIds=['CONNECTION','OAUTH','HANDLE','PROJECTREF','SUBJECT','PHASE_RENAME','SOURCE_BYTES','APPROVAL','PREDECESSOR','GRANT_REVOKED','EXTRA_KEY','NOTICES','MONITOR_COOKIE','MONITOR','SCOPE_MISSING','FINITE','SELECTION','LOST_ACK_DUPLICATE','UNRESOLVED_WRITER','OWN_PROMISE'].map(x=>'C2T1_'+x);
 const phases=['connection','oauth','negative','negative','negative','negative','negative','negative','negative','negative','negative','notices','monitor','monitor','scope','finite','selection','negative','negative','negative'];
 if(!['baseline-red','proposal-green','mutant-prefix'].includes(mode)||!Array.isArray(cases)||![0,1].includes(exitCode))bad();
 const selected=mode==='baseline-red'?[0,1,11]:allIds.map((_,i)=>i);
 if(cases.length!==selected.length)bad();
 let previous={upload:0,activation:0,receipts:0};
 for(let i=0;i<cases.length;i++){
  const row=cases[i],original=selected[i];
  if(!keys(row,["id","status","phase","counters","code"])||row.id!==allIds[original]||row.phase!==phases[original]||!['pass','fail'].includes(row.status)||row.code!==(row.status==='pass'?'OK':'TEST_FAILED')||!keys(row.counters,["upload","activation","receipts"]))bad();
  const n=row.counters;if([n.upload,n.activation,n.receipts].some(v=>!Number.isSafeInteger(v)||v<0||v>3)||n.receipts>n.activation||n.activation>n.upload)bad();
  if(original<17){if(Object.keys(n).some(k=>n[k]<previous[k]))bad();previous=n;}
  if(mode==='baseline-red'&&(!same(n,{upload:1,activation:1,receipts:1})||row.status!==(i<2?'pass':'fail')))bad();
  if(mode==='proposal-green'){
   if(row.status!=='pass')bad();if(original<17){const level=original<11?1:original<15?2:3;if(!same(n,{upload:level,activation:level,receipts:level}))bad();}
  }
 }
 if(mode==='baseline-red'&&exitCode!==1||mode==='proposal-green'&&exitCode!==0||mode==='mutant-prefix'&&(exitCode!==1||cases[10].status!=='fail'))bad();
 return {mode,observedCases:cases.length,expectedOutcomeSatisfied:true};
}

function c2V2ReadFrame(line,expected,admitted,checkCases){
 const reject=()=>{throw Error('C2_V2_RECEIPT_UNQUALIFIED');};
 const keys=(v,k)=>{if(v===null||typeof v!=='object'||Array.isArray(v))return false;const a=Object.keys(v);return a.length===k.length&&a.every((key,i)=>key===k[i]);};
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bytes=s=>encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;
 const constants={repository:'tokenizartinfo-ops/agent-friendly-web',baselineSource:'6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',baselineTree:'62e78926635d6b74f288d6c0d69e0f2516306989',proposalIndexHash:'b0af9ed81c8e7b21a35a3a8a08ca7b465b4549c625b20fcc883b1982ff97db03'};
 if(!keys(expected,["repository","baselineSource","baselineTree","proposalIndexHash","head","tree","runId","runAttempt","job","node"])||!Object.entries(constants).every(([k,v])=>expected[k]===v)||!/^[a-f0-9]{40}$/.test(expected.head)||!/^[a-f0-9]{40}$/.test(expected.tree)||!/^[1-9][0-9]*$/.test(expected.runId)||expected.runAttempt!==1||expected.job!=='c2-source-lab-v2-fix1'||expected.node!=='v22.23.4')reject();
 const kinds={AFW_C2_SOURCE_SYNTHETIC_V2_FIX1:['synthetic',2048],AFW_C2_DEPENDENCY_CONTROL:['dependency',1024],AFW_C2_SOURCE_MODE_V2:['mode',12288],AFW_C2_SOURCE_CUSTODY_V2:['custody',1024],AFW_C2_SOURCE_RECEIPT_V2:['receipt',24576]};
 if(typeof line!=='string'||!line.endsWith('\n')||line.slice(0,-1).includes('\n'))reject();
 const at=line.indexOf(' '),marker=line.slice(0,at),kind=kinds[marker],body=line.slice(at+1,-1);
 if(!kind||bytes(body)>kind[1])reject();
 let value;try{value=JSON.parse(body);}catch{reject();}
 if(body!==JSON.stringify(value))reject();
 const hashes=['7daaeb72f174744ecc11e234f899c75ed5a17daa1e820271e015bf179e9aac6b','ecb5037b4f3274c5afcab5bb2a7fdc4ca3795e450583db7b13e3eed98955d3f3','7b77711a74b39e7e4381dc66fa7044c31d532b9f52a118f5990df3c9246ed29e','e2100bd28bf4143ed768ce5f0441baa42f7b19a14fc1c28249f68dfa961a68d6'];
 const modes=['baseline-red','proposal-green','mutant-prefix','regressions'];
 const witness={caseId:'C2T1_NOTICES',phase:'notices',failureType:'testCodeFailure',code:'ERR_ASSERTION',operator:'strictEqual',definitionFile:'S07',definitionBlob:'d4db10ee8a091434835a9ac28e0d607a5e9efd21',definitionLine:6,actionLine:36,fixtureFile:'S08',fixtureBlob:'65933f3ebd753859a3b341f684b46d11f5c43a5a',function:'choose',line:18,method:'GET',route:'/connections/finite-prepare',boundary:'before-form-parse-and-post',actual:503,expected:200};
 const observation=o=>{
  if(!keys(o,["mode","selectionHash","verdict","code","exitCode","totals","cases","witness"]))reject();
  const n=modes.indexOf(o.mode);
  if(n<0||o.selectionHash!==hashes[n]||o.verdict!=='qualified'||o.code!=='OK'||!Array.isArray(o.cases))reject();
  if(n===3){
   if(o.exitCode!==0||o.cases.length!==11)reject();
   for(let i=0;i<11;i++){const c=o.cases[i];if(!keys(c,["id","status","code"])||c.id!=='C2T1_REG_'+String(i+1).padStart(2,'0')||c.status!=='pass'||c.code!=='OK')reject();}
  }else{checkCases(o.mode,o.cases,o.exitCode);}
  if(n===0?!same(o.witness,witness):o.witness!==null)reject();
  const count=o.cases.length,passed=o.cases.filter(c=>c.status==='pass').length;
  if(!same(o.totals,{plan:count,tests:count,suites:0,pass:passed,fail:count-passed,cancelled:0,skipped:0,todo:0}))reject();
 };
 const checkContext=()=>{if(!same(value.context,expected))reject();};
 if(kind[0]==='dependency'){
  if(!same(value,{schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status:'pass',observation:'EXPECTED_ENOENT'}))reject();
 }else if(kind[0]==='synthetic'){
  if(!keys(value,["schema","context","vectorsHash","accepted","rejected"])||value.schema!=='afw.c2-source-synthetic.v2'||value.vectorsHash!=='c630dc5d213f8102ad5b36ae30e8251f14d6b9652207c6ab4044d57fc1b5f402'||value.accepted!==3||value.rejected!==35)reject();checkContext();
 }else if(kind[0]==='custody'){
  if(!keys(value,["schema","context","parentNonRoot","preflightOwned","preflightRemoved","checkedLaunches","checkedProcesses","uidGidGroupsLoopbackMatched","ownRootVerified","ownTempRemoved"])||value.schema!=='afw.c2-source-custody.v2'||!same(value.context,{head:expected.head,runId:expected.runId,runAttempt:1,job:expected.job,proposalIndexHash:expected.proposalIndexHash})||value.checkedLaunches!==6||!Number.isSafeInteger(value.checkedProcesses)||value.checkedProcesses<6||value.checkedProcesses>24||!['parentNonRoot','preflightOwned','preflightRemoved','uidGidGroupsLoopbackMatched','ownRootVerified','ownTempRemoved'].every(k=>value[k]===true))reject();
 }else if(kind[0]==='mode'){
  if(!keys(value,["schema","context","observation"])||value.schema!=='afw.c2-source-mode.v2')reject();checkContext();observation(value.observation);
 }else{
  if(!keys(value,["schema","context","admitted","observations","nonclaims"])||value.schema!=='afw.c2-source-lab-receipt.v2')reject();checkContext();
  if(!Array.isArray(admitted)||admitted.length!==13||!same(value.admitted,admitted)||!Array.isArray(value.observations)||value.observations.length!==4)reject();
  for(let i=0;i<4;i++){if(value.observations[i].mode!==modes[i])reject();observation(value.observations[i]);}
  if(!same(value.nonclaims,{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}))reject();
 }
 return {kind:kind[0],value};
}

function c2V2ReadBundle(lines,expected,admitted,readFrame,checkCases){
 if(!Array.isArray(lines)||lines.length!==8)throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 const parsed=lines.map(line=>readFrame(line,expected,admitted,checkCases));
 if(!['synthetic','dependency','mode','mode','mode','mode','custody','receipt'].every((k,i)=>parsed[i].kind===k))throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 const receipt=parsed[7].value;
 if(JSON.stringify(parsed.slice(2,6).map(p=>p.value.observation))!==JSON.stringify(receipt.observations))throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 return receipt;
}

function c2RootApiJoin({run,jobs,commit,expected}){
 const bad=()=>{throw Error('C2_API_UNQUALIFIED');};
 const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 const hex=x=>typeof x==='string'&&/^[a-f0-9]{40}$/.test(x);
 const id=x=>Number.isSafeInteger(x)&&x>0;
 if(!obj(run)||!obj(jobs)||!obj(commit)||!obj(expected))bad();
 if(expected.repository!=='tokenizartinfo-ops/agent-friendly-web'||expected.branch!=='lab/afw-c2-source-20261116-t1-v2-fix1'||expected.workflowPath!=='.github/workflows/afw-c2-source-lab-v2-fix1.yml'||expected.oneUseMessage!=='AFW-C2-OWNER-STAGES-SOURCE-T1-V2-FIX1-ONEUSE-20261116'||expected.job!=='c2-source-lab-v2-fix1')bad();
 if(![expected.head,expected.tree,expected.parent].every(hex)||expected.parent!=='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68'||!id(expected.runId)||!id(expected.jobId)||!Array.isArray(expected.requiredSteps)||!expected.requiredSteps.length||expected.requiredSteps.some(x=>typeof x!=='string'||!x.length)||new Set(expected.requiredSteps).size!==expected.requiredSteps.length)bad();
 if(run.id!==expected.runId||run.head_sha!==expected.head||run.head_branch!==expected.branch||run.run_attempt!==1||run.event!=='push'||run.path!==expected.workflowPath||run.status!=='completed'||run.conclusion!=='success'||run.repository?.full_name!==expected.repository||run.head_repository?.full_name!==expected.repository)bad();
 if(commit.sha!==expected.head||commit.tree?.sha!==expected.tree||commit.message!==expected.oneUseMessage||!Array.isArray(commit.parents)||commit.parents.length!==1||commit.parents[0]?.sha!==expected.parent)bad();
 if(jobs.total_count!==1||!Array.isArray(jobs.jobs)||jobs.jobs.length!==1)bad();
 const job=jobs.jobs[0];
 if(!obj(job)||job.id!==expected.jobId||job.run_id!==expected.runId||job.run_attempt!==1||job.name!==expected.job||job.head_sha!==expected.head||job.status!=='completed'||job.conclusion!=='success'||!Array.isArray(job.steps)||!job.steps.length)bad();
 if(job.steps.some(s=>!obj(s)||!Number.isSafeInteger(s.number)||s.number<1||typeof s.name!=='string'||s.status!=='completed'||!(s.conclusion==='success'||s.name==='Post Use the fixed Node runtime'&&s.conclusion==='skipped'))||new Set(job.steps.map(s=>s.number)).size!==job.steps.length)bad();
 const selected=expected.requiredSteps.map(name=>{const found=job.steps.filter(s=>s.name===name);if(found.length!==1||found[0].conclusion!=='success')bad();return found[0].number;});
 if(selected.some((n,i)=>i&&n<=selected[i-1]))bad();
 return {repository:expected.repository,baselineSource:expected.parent,head:expected.head,tree:expected.tree,runId:String(expected.runId),runAttempt:1,job:expected.job,jobId:expected.jobId,commandStepNumbers:selected};
}

// Independent Root OWN diagnostic consumer. No Source imports, execution, I/O or verdict reuse.
const C2OWN_IDS=['CONNECTION','OAUTH','HANDLE','PROJECTREF','SUBJECT','PHASE_RENAME','SOURCE_BYTES','APPROVAL','PREDECESSOR','GRANT_REVOKED','EXTRA_KEY','NOTICES','MONITOR_COOKIE','MONITOR','SCOPE_MISSING','FINITE','SELECTION','LOST_ACK_DUPLICATE','UNRESOLVED_WRITER','OWN_PROMISE'].map(x=>'C2T1_'+x);
const c2OwnBad=()=>{throw Error('C2_OWN_DIAGNOSTIC_REJECTED');};
const c2OwnSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const c2OwnObj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const c2OwnKeys=(x,n)=>{if(!c2OwnObj(x))return false;const a=Object.keys(x);return a.length===n.length&&a.every((k,i)=>k===n[i]);};
const c2OwnInt=(x,a,b)=>Number.isSafeInteger(x)&&x>=a&&x<=b;
const c2OwnBytes=s=>new TextEncoder().encode(s).length;

// A minimal independent interpreter of frozen normative DATA: ordered arrays at every object.
function c2OwnSchema(value,node,document){
 if(node.$ref)return c2OwnSchema(value,document.$defs[node.$ref.slice(8)],document);
 if(Object.hasOwn(node,'const')&&!c2OwnSame(value,node.const))return false;
 if(node.enum&&!node.enum.some(v=>c2OwnSame(v,value)))return false;
 if(node.anyOf&&!node.anyOf.some(s=>c2OwnSchema(value,s,document)))return false;
 if(node.oneOf&&node.oneOf.filter(s=>c2OwnSchema(value,s,document)).length!==1)return false;
 if(node.allOf&&!node.allOf.every(s=>c2OwnSchema(value,s,document)))return false;
 if(node.if){const branch=c2OwnSchema(value,node.if,document)?node.then:node.else;if(branch&&!c2OwnSchema(value,branch,document))return false;}
 if(node.not&&c2OwnSchema(value,node.not,document))return false;
 if(node.type==='object'&&!c2OwnObj(value)||node.type==='array'&&!Array.isArray(value)||node.type==='integer'&&!Number.isSafeInteger(value)||node.type==='string'&&typeof value!=='string'||node.type==='null'&&value!==null||node.type==='boolean'&&typeof value!=='boolean')return false;
 if(node.properties&&c2OwnObj(value)){
  const names=Object.keys(node.properties);
  if(node.additionalProperties===false&&!c2OwnKeys(value,names))return false;
  if(node.required&&!node.required.every(k=>Object.hasOwn(value,k)))return false;
  for(const k of names)if(Object.hasOwn(value,k)&&!c2OwnSchema(value[k],node.properties[k],document))return false;
 }
 if(typeof value==='number'&&(node.minimum!==undefined&&value<node.minimum||node.maximum!==undefined&&value>node.maximum))return false;
 if(typeof value==='string'&&node.pattern&&!new RegExp(node.pattern).test(value))return false;
 if(Array.isArray(value)){
  if(node.minItems!==undefined&&value.length<node.minItems||node.maxItems!==undefined&&value.length>node.maxItems)return false;
  for(let i=0;i<value.length;i++){const rule=node.prefixItems?.[i]??node.items;if(rule===false||rule&& !c2OwnSchema(value[i],rule,document))return false;}
 }
 return true;
}

// Reduce recorded intervals only. Global close is an independent interval and may overlap.
function c2OwnReduce(events,condition,integrity='prefix',fault=false){
 if(!Array.isArray(events)||events.length>128||!['timeout','normal'].includes(condition)||!['empty','prefix','complete','torn','ambiguous'].includes(integrity))c2OwnBad();
 let cursor=0,next='action-enter',active=null,hook='unseen',threw=false,lastMs=0;
 for(let i=0;i<events.length;i++){
  const e=events[i];
  if(!c2OwnKeys(e,['sequence','elapsedMs','id','operation','edge','error'])||e.sequence!==i+1||!c2OwnInt(e.elapsedMs,lastMs,330000)||!['enter','return','throw'].includes(e.edge))c2OwnBad();
  lastMs=e.elapsedMs;
  if(e.edge==='throw'){
   if(!c2OwnKeys(e.error,['name','code','site'])||!([null,'AssertionError','Error','TypeError','RangeError','SyntaxError','AggregateError','AbortError','TimeoutError'].includes(e.error.name))||!([null,'ERR_ASSERTION','ERR_TEST_FAILURE','ABORT_ERR','ETIMEDOUT','ENOENT','ERR_MODULE_NOT_FOUND','ECONNRESET','ERR_INVALID_ARG_TYPE'].includes(e.error.code)))c2OwnBad();
   const s=e.error.site;
   if(s!==null&&(!c2OwnKeys(s,['file','line','column'])||!['S00','S01','S02','S03','S04','S05','S06','D07','S08','S09','S10','S11','S12'].includes(s.file)||!c2OwnInt(s.line,1,999999)||!c2OwnInt(s.column,1,999999)))c2OwnBad();
   threw=true;
  }else if(e.error!==null)c2OwnBad();
  if(e.id==='AFTER'){
   if(e.operation!=='close')c2OwnBad();
   if(e.edge==='enter'){if(hook!=='unseen')c2OwnBad();hook='open';}
   else{if(hook!=='open')c2OwnBad();hook='settled';}
   continue;
  }
  if(e.id!==C2OWN_IDS[cursor])c2OwnBad();
  if(next==='action-enter'){
   if(e.operation!=='action'||e.edge!=='enter')c2OwnBad();
   active={id:e.id,operation:'action'};next='action-exit';
  }else if(next==='action-exit'){
   if(e.operation!=='action'||e.edge==='enter')c2OwnBad();
   active=null;next='count-enter';
  }else if(next==='count-enter'){
   if(e.operation!=='count'||e.edge!=='enter')c2OwnBad();
   active={id:e.id,operation:'count'};next='count-exit';
  }else{
   if(e.operation!=='count'||e.edge==='enter')c2OwnBad();
   active=null;cursor++;next='action-enter';
  }
 }
 const complete=cursor===20&&hook==='settled';
 if(integrity==='empty'&&events.length||integrity==='complete'&&!complete)c2OwnBad();
 let state=events.length?(complete?'complete':'prefix'):'empty',frontier='unknown';
 if(fault||integrity==='ambiguous'||integrity==='torn'){
  state=fault?'ambiguous':integrity;return {integrity:state,frontier,events,openCase:null,afterOpen:false};
 }
 const afterOpen=hook==='open';
 if(active&&afterOpen)frontier='case-and-after';
 else if(active)frontier=active.operation;
 else if(afterOpen)frontier='after-close';
 else if(complete)frontier=condition==='timeout'?(threw?'post-settlement-process-exit':'post-teardown-process-exit'):'all-settled';
 else if(events.length)frontier=next==='count-enter'?'between-action-and-count':cursor===20?'before-after':'between-cases';
 return {integrity:state,frontier,events,openCase:active,afterOpen};
}

function c2OwnGreenApi({run,jobs,commit,expected}){
 const e=expected;
 if(!c2OwnKeys(e,['repository','branch','workflowPath','oneUseMessage','job','parent','head','tree','runId','jobId'])||e.repository!=='tokenizartinfo-ops/agent-friendly-web'||e.branch!=='lab/afw-c2-source-20261116-t1-green-diag1'||e.workflowPath!=='.github/workflows/afw-c2-green-diag1.yml'||e.oneUseMessage!=='AFW-C2-SOURCE-T1-GREEN-DIAG1-ONEUSE-20261116'||e.job!=='c2-green-diag1'||e.parent!=='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68'||![e.head,e.tree].every(x=>typeof x==='string'&&/^[a-f0-9]{40}$/.test(x))||!c2OwnInt(e.runId,1,Number.MAX_SAFE_INTEGER)||!c2OwnInt(e.jobId,1,Number.MAX_SAFE_INTEGER))c2OwnBad();
 if(!c2OwnObj(run)||!c2OwnObj(jobs)||!c2OwnObj(commit)||run.id!==e.runId||run.run_attempt!==1||run.head_sha!==e.head||run.head_branch!==e.branch||run.path!==e.workflowPath||run.event!=='push'||run.status!=='completed'||run.conclusion!=='success'||run.repository?.full_name!==e.repository||run.head_repository?.full_name!==e.repository)c2OwnBad();
 if(commit.sha!==e.head||commit.tree?.sha!==e.tree||commit.message!==e.oneUseMessage||!Array.isArray(commit.parents)||commit.parents.length!==1||commit.parents[0].sha!==e.parent)c2OwnBad();
 if(jobs.total_count!==1||!Array.isArray(jobs.jobs)||jobs.jobs.length!==1)c2OwnBad();
 const j=jobs.jobs[0];
 if(j.id!==e.jobId||j.run_id!==e.runId||j.run_attempt!==1||j.head_sha!==e.head||j.name!==e.job||j.status!=='completed'||j.conclusion!=='success'||!Array.isArray(j.steps)||new Set(j.steps.map(s=>s.number)).size!==j.steps.length)c2OwnBad();
 const required=['Read the exact one-use lab head','Use the fixed Node runtime','Install only the existing locked dependencies','Observe isolated proposal-green boundaries','Preserve the bounded green diagnostic'];
 let n=0,command=null;
 for(const step of j.steps)if(!c2OwnObj(step)||!c2OwnInt(step.number,1,100)||typeof step.name!=='string'||step.status!=='completed'||!(step.conclusion==='success'||step.name==='Post Use the fixed Node runtime'&&step.conclusion==='skipped'))c2OwnBad();
 for(const name of required){const found=j.steps.filter(s=>s.name===name);if(found.length!==1||found[0].number<=n||found[0].conclusion!=='success')c2OwnBad();n=found[0].number;if(name===required[3])command=found[0];}
 const validTime=t=>typeof t==='string'&&Number.isFinite(Date.parse(t));
 if(!validTime(command.started_at)||!validTime(command.completed_at)||Date.parse(command.completed_at)<Date.parse(command.started_at)||Date.parse(command.completed_at)-Date.parse(command.started_at)>420000)c2OwnBad();
 return {context:{repository:e.repository,baselineSource:e.parent,baselineTree:'62e78926635d6b74f288d6c0d69e0f2516306989',proposalIndexHash:'b0af9ed81c8e7b21a35a3a8a08ca7b465b4549c625b20fcc883b1982ff97db03',head:e.head,tree:e.tree,runId:String(e.runId),runAttempt:1,job:e.job,node:'v22.23.4'},jobId:j.id,commandStep:command};
}

// Inputs retain actual raw unique run/job/commit API objects. No stripped run summary is accepted.
// rawLog is exact job log text with GitHub timestamps; file provenance carries run/job IDs from endpoint.
// artifact: raw GitHub artifacts-list response plus selected payload text and archive digest facts.
function c2OwnReadGreen(input,schema,sha256){
 if(!c2OwnKeys(input,['run','jobs','commit','expected','transport','artifact']))c2OwnBad();
 const {run,jobs,commit,expected,transport,artifact}=input,joined=c2OwnGreenApi({run,jobs,commit,expected});
 if(typeof sha256!=='function'||!c2OwnObj(schema)||schema.title!=='AFW C2 green diagnostic 1'||sha256(JSON.stringify(schema))!=='6040fc9c6afe310c51429a7df7c4233a7ae70a7f4652e70f9a32fe712ad5d197')c2OwnBad();
 if(!c2OwnKeys(transport,['runId','jobId','rawLog'])||transport.runId!==run.id||transport.jobId!==joined.jobId||typeof transport.rawLog!=='string'||c2OwnBytes(transport.rawLog)>4194304)c2OwnBad();
 const step=joined.commandStep,rows=transport.rawLog.split('\n'),frames=[];
 const exactCommand='node docs/superpowers/source-lab/c2-t1-green-diag1/run-c2-green-diag1.mjs';
 let inCommand=false,seenCommand=0,closed=false,commandWindow=false;
 for(const physical of rows){
  if(!physical)continue;
  const m=/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+Z) (.*)$/.exec(physical);
  if(!m){if(physical.includes('AFW_C2_'))c2OwnBad();continue;}
  const t=Date.parse(m[1]),line=m[2];
  if(line==='##[group]Run '+exactCommand){if(!Number.isFinite(t)||++seenCommand!==1||inCommand||t<Date.parse(step.started_at)-1000||t>Date.parse(step.completed_at)+1000)c2OwnBad();inCommand=true;commandWindow=true;continue;}
  if(inCommand&&line==='##[endgroup]'){closed=true;inCommand=false;continue;}
  // GitHub's setup command group ends before executable stdout: join by actual step time as well.
  if(line.startsWith('##[group]')&&closed)commandWindow=false;
  if(line.includes('AFW_C2_')&&!line.startsWith('AFW_C2_'))c2OwnBad();
  if(line.startsWith('AFW_C2_')){
   if(!Number.isFinite(t)||!commandWindow||!closed||seenCommand!==1||t<Date.parse(step.started_at)-1000||t>Date.parse(step.completed_at)+1000)c2OwnBad();
   frames.push(line+'\n');
  }
 }
 if(seenCommand!==1||!closed||frames.length!==4)c2OwnBad();
 const markers=['AFW_C2_GREEN_SYNTHETIC','AFW_C2_DEPENDENCY_CONTROL','AFW_C2_GREEN_CUSTODY','AFW_C2_GREEN_OUTCOME'],defs=['synthetic','dependency','custody','outcome'],caps=[2048,1024,1024,24576],values=[];
 for(let i=0;i<4;i++){
  const line=frames[i],prefix=markers[i]+' ';
  if(!line.startsWith(prefix))c2OwnBad();const body=line.slice(prefix.length,-1);
  if(c2OwnBytes(body)>caps[i])c2OwnBad();
  let v;try{v=JSON.parse(body);}catch{c2OwnBad();}
  if(JSON.stringify(v)!==body||!c2OwnSchema(v,schema.$defs[defs[i]],schema))c2OwnBad();
  values.push(v);
 }
 const [synthetic,,custody,outcome]=values;
 if(!c2OwnSame(synthetic.context,joined.context)||!c2OwnSame(outcome.context,joined.context)||!c2OwnSame(outcome.custody,custody)||!c2OwnSame(custody.context,{head:joined.context.head,runId:joined.context.runId,runAttempt:1,job:joined.context.job,proposalIndexHash:joined.context.proposalIndexHash}))c2OwnBad();
 if(custody.checkedLaunches!==3||!c2OwnInt(custody.checkedProcesses,3,8)||!['parentNonRoot','preflightOwned','preflightRemoved','uidGidGroupsLoopbackMatched','ownRootVerified','ownTempRemoved'].every(k=>custody[k]===true))c2OwnBad();
 const o=outcome.observation,c=o.capture,j=o.journal;
 if(!(c.errorKind==='timeout'||c.errorKind==='none'&&c.signal==='none'&&[0,1].includes(c.exitCode))||c.stdout===null||c.stderr===null||c.stdout.bytes>1048576||c.stderr.bytes>65536)c2OwnBad();
 const reduced=c2OwnReduce(o.witness.events,c.errorKind==='timeout'?'timeout':'normal',o.witness.integrity,j.recorderFaultObserved||!j.stable);
 if(!c2OwnSame(reduced,o.witness))c2OwnBad();
 const prefix=o.witness.events.map(e=>JSON.stringify(e)+'\n').join('');
 if(c2OwnBytes(prefix)>j.bytes)c2OwnBad();
 if(['complete','prefix','empty'].includes(o.witness.integrity)&&(j.bytes!==c2OwnBytes(prefix)||j.sha256!==sha256(prefix)))c2OwnBad();
 if(!Array.isArray(o.native.cases)||o.native.cases.some((row,i)=>row.id!==C2OWN_IDS[i]))c2OwnBad();
 if(o.native.integrity==='empty'&&o.native.cases.length)c2OwnBad();
 // D07 rethrows a recorded action/count error. Preserve missing results and independent AFTER facts.
 if(j.stable&&o.native.cases.some(n=>n.status==='pass'&&reduced.events.some(e=>e.id===n.id&&(e.operation==='action'||e.operation==='count')&&e.edge==='throw')))c2OwnBad();
 if(!c2OwnKeys(artifact,['runId','jobId','listing','artifactId','fileName','payloadText','archiveSha256'])||artifact.runId!==run.id||artifact.jobId!==joined.jobId||artifact.fileName!=='c2-green-diag1.json'||typeof artifact.payloadText!=='string'||artifact.payloadText!==JSON.stringify(outcome)+'\n'||!/^[a-f0-9]{64}$/.test(artifact.archiveSha256))c2OwnBad();
 const list=artifact.listing;
 if(!c2OwnObj(list)||list.total_count!==1||!Array.isArray(list.artifacts)||list.artifacts.length!==1)c2OwnBad();
 const a=list.artifacts[0];
 if(a.id!==artifact.artifactId||!c2OwnInt(a.id,1,Number.MAX_SAFE_INTEGER)||a.name!=='afw-c2-green-diag1'||a.expired!==false||!c2OwnInt(a.size_in_bytes,1,1048576)||a.workflow_run?.id!==run.id||a.workflow_run?.head_sha!==expected.head||a.workflow_run?.head_branch!==expected.branch||a.digest!=='sha256:'+artifact.archiveSha256)c2OwnBad();
 return {diagnosticCaptureAccepted:j.stable&&!j.recorderFaultObserved,journalUsable:j.stable&&!j.recorderFaultObserved,context:joined.context,jobId:joined.jobId,commandStepNumber:step.number,frontier:reduced.frontier,integrity:reduced.integrity,openCase:reduced.openCase,afterOpen:reduced.afterOpen,native:o.native,SourceQualified:false,Task1Pass:false,PCoff:false};
}

// Full future qualification remains separate from GREEN diagnostic; inputs are actual raw API objects.
function c2OwnReadSource(input,admitted,sha256){
 if(!c2OwnKeys(input,['run','jobs','commit','expected','transport','artifact']))c2OwnBad();
 const {run,jobs,commit,expected,transport,artifact}=input;
 if(!c2OwnKeys(expected,['repository','branch','workflowPath','oneUseMessage','job','parent','head','tree','runId','jobId','requiredSteps']))c2OwnBad();
 if(!c2OwnSame(admitted,[{"path":"lib/mcp-qa-finite-owner-phase-context.mjs","sha256":"02ee98da9239dd28948db664127c579ef69941e5e9c8151b1568527509815210","bytes":148547},{"path":"lib/mcp-qa-finite-owner-preparation.mjs","sha256":"fc227b59b3b5815eadffbd582f018cbd3e64ceaa596f07bc21a2031f7cd1d6e9","bytes":45576},{"path":"lib/mcp-qa-finite-owner-native-receiver.mjs","sha256":"644973221d5dbc3e9bdb87888840c28c370f3b1ed6dff2c89534c4de0e8642f8","bytes":2497},{"path":"worker/mcp-own/finite.mjs","sha256":"7059b9ccc18fccd4da8dff42e9c04c4c7547afef9976852cbefbeef5175504f6","bytes":2810},{"path":"lib/mcp-qa-finite-owner-cleanup-scope.mjs","sha256":"54e2261aac2bbe3d2446d7fa5911f2b921b4d8dc618943abd5d34e3f1125ca4b","bytes":4153},{"path":"lib/mcp-qa-finite-owner-cleanup.mjs","sha256":"5911698fe8de72441d125414f879d725a677dbc26f3c1a40cdcd2999b6d4b40b","bytes":101380},{"path":"lib/mcp-qa-finite-initial-cleanup.mjs","sha256":"f08b914a1e668ad36b4848d0b61cbe8b44dfb3e54bc747480564a8aacc587df4","bytes":22501},{"path":"test/mcp-qa-finite-owner-three-stage-native.test.mjs","sha256":"678fc3c538f2fc29e70c41475794f58e5d690a7c7aae69b1b97ae9309a728b6b","bytes":2785},{"path":"test/fixtures/finite-coupled-native.mjs","sha256":"029db37d98bfee81fec3f1b462c0c2daed4fa4b30fc65a06fffcf80369557318","bytes":14244},{"path":"test/fixtures/finite-first-connection-publication.mjs","sha256":"092a1d8dd44b99a16e522f09234a2b0f4bf62e6575ac99664be516fc7673920d","bytes":60636},{"path":"test/fixtures/finite-initial-entry-world.mjs","sha256":"79a135fbc9897463b566624a4662946089b8b5fd25baeda368663ff65be3cdc7","bytes":88519},{"path":"test/mcp-qa-finite-first-connection-publication-native.test.mjs","sha256":"d9895052eb50bf75ca1a14d743fac5c5e4c9b4cf22ae0b6460268f05878f26f7","bytes":58727},{"path":"lib/mcp-qa-finite-owner-notice-get-forward.mjs","sha256":"0db45a29028284a886b7e2f46b4ef0f8834b9cfefdeed2fc026aa72694a7c8e8","bytes":6030}]))c2OwnBad();
 const required=['Read the exact one-use lab head','Use the fixed Node runtime','Install only the existing locked dependencies','Qualify isolated compiled Source data','Preserve only the bounded sanitized Source receipt'];
 if(!c2OwnSame(expected.requiredSteps,required))c2OwnBad();
 const join=c2RootApiJoin({run,jobs,commit,expected}),step=jobs.jobs[0].steps.find(s=>s.number===join.commandStepNumbers[3]);
 if(!step||!Number.isFinite(Date.parse(step.started_at))||!Number.isFinite(Date.parse(step.completed_at))||Date.parse(step.completed_at)<Date.parse(step.started_at))c2OwnBad();
 if(!c2OwnKeys(transport,['runId','jobId','rawLog'])||transport.runId!==run.id||transport.jobId!==join.jobId||typeof transport.rawLog!=='string'||c2OwnBytes(transport.rawLog)>4194304)c2OwnBad();
 const command='node docs/superpowers/source-lab/c2-t1-v2-fix1/run-c2-source-lab-v2-fix1.mjs';
 let seen=0,header=false,closed=false,window=false;const frames=[];
 for(const line of transport.rawLog.split('\n')){
  if(!line)continue;const m=/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+Z) (.*)$/.exec(line);
  if(!m){if(line.includes('AFW_C2_'))c2OwnBad();continue;}
  const t=Date.parse(m[1]),s=m[2],inside=t>=Date.parse(step.started_at)-1000&&t<=Date.parse(step.completed_at)+1000;
  if(s==='##[group]Run '+command){if(++seen!==1||!inside)c2OwnBad();header=true;window=true;continue;}
  if(header&&s==='##[endgroup]'){closed=true;header=false;continue;}
  if(closed&&s.startsWith('##[group]'))window=false;
  if(s.includes('AFW_C2_')){if(!s.startsWith('AFW_C2_')||seen!==1||!closed||!window||!inside)c2OwnBad();frames.push(s+'\n');}
 }
 if(seen!==1||!closed)c2OwnBad();
 const context={repository:expected.repository,baselineSource:expected.parent,baselineTree:'62e78926635d6b74f288d6c0d69e0f2516306989',proposalIndexHash:'b0af9ed81c8e7b21a35a3a8a08ca7b465b4549c625b20fcc883b1982ff97db03',head:expected.head,tree:expected.tree,runId:String(expected.runId),runAttempt:1,job:expected.job,node:'v22.23.4'};
 const receipt=c2V2ReadBundle(frames,context,admitted,c2V2ReadFrame,c2V2CheckModeCases);
 if(!c2OwnKeys(artifact,['runId','jobId','listing','artifactId','fileName','payloadText','archiveSha256'])||artifact.runId!==run.id||artifact.jobId!==join.jobId||artifact.fileName!=='c2-source-lab-v2-fix1-receipt.json'||artifact.payloadText!==JSON.stringify(receipt)+'\n'||!/^[a-f0-9]{64}$/.test(artifact.archiveSha256)||artifact.listing?.total_count!==1||!Array.isArray(artifact.listing.artifacts)||artifact.listing.artifacts.length!==1)c2OwnBad();
 const a=artifact.listing.artifacts[0];
 if(a.id!==artifact.artifactId||!c2OwnInt(a.id,1,Number.MAX_SAFE_INTEGER)||a.name!=='afw-c2-owner-stages-source-t1-v2-fix1-receipt'||a.expired!==false||!c2OwnInt(a.size_in_bytes,1,1048576)||a.workflow_run?.id!==run.id||a.workflow_run?.head_sha!==expected.head||a.workflow_run?.head_branch!==expected.branch||a.digest!=='sha256:'+artifact.archiveSha256)c2OwnBad();
 return {receiverChecksSatisfied:true,context,jobId:join.jobId,commandStepNumbers:join.commandStepNumbers,receipt};
}

export {c2V2CheckModeCases,c2V2ReadFrame,c2V2ReadBundle,c2RootApiJoin,c2OwnReduce,c2OwnGreenApi,c2OwnReadGreen,c2OwnReadSource,c2OwnBytes,C2OWN_IDS};
