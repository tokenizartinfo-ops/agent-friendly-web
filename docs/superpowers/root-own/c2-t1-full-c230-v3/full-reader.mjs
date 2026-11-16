import {C230_ADMISSION} from './admission.mjs';
// Independent OWN c230 version; prior OWN modules and actual receipts remain frozen.
function c230CheckModeCases(mode,cases,exitCode){
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

function c230ReadFrame(line,expected){
 const admitted=C230_ADMISSION.admitted,checkCases=c230CheckModeCases;
 const reject=()=>{throw Error('C2_V2_RECEIPT_UNQUALIFIED');};
 const keys=(v,k)=>{if(v===null||typeof v!=='object'||Array.isArray(v))return false;const a=Object.keys(v);return a.length===k.length&&a.every((key,i)=>key===k[i]);};
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bytes=s=>encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;
 const constants={repository:'tokenizartinfo-ops/agent-friendly-web',baselineSource:'6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',baselineTree:'62e78926635d6b74f288d6c0d69e0f2516306989',proposalIndexHash:'0681cadc774fcddf7a009e86e24b22fa879857af1e900f6143d23c2d7eaa9be7'};
 if(!keys(expected,["repository","baselineSource","baselineTree","proposalIndexHash","head","tree","runId","runAttempt","job","node"])||!Object.entries(constants).every(([k,v])=>expected[k]===v)||!/^[a-f0-9]{40}$/.test(expected.head)||!/^[a-f0-9]{40}$/.test(expected.tree)||!/^[1-9][0-9]*$/.test(expected.runId)||expected.runAttempt!==1||expected.job!=='c2-source-lab-fixture-fix1'||expected.node!=='v22.23.4')reject();
 const kinds={AFW_C2_SOURCE_SYNTHETIC_V2_FIX1:['synthetic',2048],AFW_C2_DEPENDENCY_CONTROL:['dependency',1024],AFW_C2_SOURCE_MODE_V2:['mode',12288],AFW_C2_SOURCE_CUSTODY_V2:['custody',1024],AFW_C2_SOURCE_RECEIPT_V2:['receipt',24576]};
 if(typeof line!=='string'||!line.endsWith('\n')||line.slice(0,-1).includes('\n'))reject();
 const at=line.indexOf(' '),marker=line.slice(0,at),kind=kinds[marker],body=line.slice(at+1,-1);
 if(!kind||bytes(body)>kind[1])reject();
 let value;try{value=JSON.parse(body);}catch{reject();}
 if(body!==JSON.stringify(value))reject();
 const hashes=['24a24cf5dd911d7675f1007ca4d4ddd5881757885f3849aa61d88bc923c628fa','0201035afa5925bd24b218ed63cbbcf0db5c660e56a9cc13db4083778e0f1af5','46239e665ffe9154fbfb81725c81ac05c0228129f49db466b061397114f970a4','e2100bd28bf4143ed768ce5f0441baa42f7b19a14fc1c28249f68dfa961a68d6'];
 const modes=['baseline-red','proposal-green','mutant-prefix','regressions'];
 const witness={caseId:'C2T1_NOTICES',phase:'notices',failureType:'testCodeFailure',code:'ERR_ASSERTION',operator:'strictEqual',definitionFile:'S07',definitionBlob:'d4db10ee8a091434835a9ac28e0d607a5e9efd21',definitionLine:6,actionLine:36,fixtureFile:'S08',fixtureBlob:'de8a51e5a6023342b1b3aeccadf66e90611d268f',function:'choose',line:18,method:'GET',route:'/connections/finite-prepare',boundary:'before-form-parse-and-post',actual:503,expected:200};
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

function c230ReadBundle(lines,expected){
 const admitted=C230_ADMISSION.admitted,readFrame=c230ReadFrame,checkCases=c230CheckModeCases;
 if(!Array.isArray(lines)||lines.length!==8)throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 const parsed=lines.map(line=>readFrame(line,expected,admitted,checkCases));
 if(!['synthetic','dependency','mode','mode','mode','mode','custody','receipt'].every((k,i)=>parsed[i].kind===k))throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 const receipt=parsed[7].value;
 if(JSON.stringify(parsed.slice(2,6).map(p=>p.value.observation))!==JSON.stringify(receipt.observations))throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 return receipt;
}

// Root-provided independent actual GitHub API context; outcome never chooses authority.
const c230Obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const c230Keys=(x,k)=>c230Obj(x)&&Object.keys(x).length===k.length&&Object.keys(x).every((v,i)=>v===k[i]);
const c230Same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const c230Int=(n,a,b)=>Number.isSafeInteger(n)&&n>=a&&n<=b;
const c230Bad=()=>{throw Error('C230_OWN_UNQUALIFIED');};
function c230Time(v){
 if(typeof v!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?Z$/.test(v))c230Bad();
 const n=Date.parse(v);if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,19)!==v.slice(0,19))c230Bad();return n;
}
function c230ApiJoin(run,jobs,commit,expected){
 const a=C230_ADMISSION,s=a.sourceNomination,keys=['repository','branch','workflowPath','oneUseMessage','job','parent','head','tree','runId','jobId','requiredSteps'];
 if(!c230Keys(expected,keys)||expected.repository!=='tokenizartinfo-ops/agent-friendly-web'||expected.branch!==s.branch||expected.workflowPath!==s.workflow||expected.oneUseMessage!==s.message||expected.job!==s.job||expected.parent!==a.base||!c230Same(expected.requiredSteps,a.sourceSteps)||![expected.head,expected.tree].every(x=>typeof x==='string'&&/^[a-f0-9]{40}$/.test(x))||!c230Int(expected.runId,1,Number.MAX_SAFE_INTEGER)||!c230Int(expected.jobId,1,Number.MAX_SAFE_INTEGER))c230Bad();
 if(!c230Obj(run)||run.id!==expected.runId||run.head_sha!==expected.head||run.head_branch!==expected.branch||run.run_attempt!==1||run.event!=='push'||run.path!==expected.workflowPath||run.status!=='completed'||run.conclusion!=='success'||run.repository?.full_name!==expected.repository||run.head_repository?.full_name!==expected.repository)c230Bad();
 if(!c230Obj(commit)||commit.sha!==expected.head||commit.tree?.sha!==expected.tree||commit.message!==expected.oneUseMessage||!Array.isArray(commit.parents)||commit.parents.length!==1||commit.parents[0]?.sha!==expected.parent)c230Bad();
 if(!c230Obj(jobs)||jobs.total_count!==1||!Array.isArray(jobs.jobs)||jobs.jobs.length!==1)c230Bad();
 const j=jobs.jobs[0];if(!c230Obj(j)||j.id!==expected.jobId||j.run_id!==expected.runId||j.run_attempt!==1||j.name!==expected.job||j.head_sha!==expected.head||j.status!=='completed'||j.conclusion!=='success'||!Array.isArray(j.steps)||!j.steps.length||j.steps.length>128)c230Bad();
 const rc=c230Time(run.created_at),rs=c230Time(run.run_started_at),re=c230Time(run.updated_at),js=c230Time(j.started_at),je=c230Time(j.completed_at);
 if(!(rc<=rs&&rs<=js&&js<=je&&je<=re)||je-js>420000)c230Bad();
 const numbers=new Set(),names=new Set();for(const step of j.steps){
  if(!c230Obj(step)||!c230Int(step.number,1,1000)||typeof step.name!=='string'||!step.name.length||numbers.has(step.number)||names.has(step.name)||step.status!=='completed'||!(step.conclusion==='success'||step.conclusion==='skipped'&&step.name==='Post Use the fixed Node runtime'))c230Bad();
  numbers.add(step.number);names.add(step.name);
  if(step.conclusion==='success'||step.started_at!=null||step.completed_at!=null){const ss=c230Time(step.started_at),se=c230Time(step.completed_at);if(ss<js||se>je||ss>se)c230Bad();}
 }
 const selected=a.sourceSteps.map(name=>{const found=j.steps.filter(x=>x.name===name);if(found.length!==1||found[0].conclusion!=='success')c230Bad();return found[0];});
 for(let i=0;i<selected.length;i++)if(i&&(selected[i].number<=selected[i-1].number||c230Time(selected[i].started_at)<c230Time(selected[i-1].completed_at)))c230Bad();
 const context={repository:expected.repository,baselineSource:a.base,baselineTree:a.baseTree,proposalIndexHash:a.indexHash,head:expected.head,tree:expected.tree,runId:String(expected.runId),runAttempt:1,job:s.job,node:'v22.23.4'};
 return {context,jobId:j.id,commandStepNumbers:selected.map(x=>x.number),commandStep:selected[3]};
}
function c230Tree(tree,expected){
 if(!c230Obj(tree)||tree.sha!==expected.tree||tree.truncated!==false||!Array.isArray(tree.tree)||tree.tree.length>8192||Buffer.byteLength(JSON.stringify(tree),'utf8')>4194304)c230Bad();
 const paths=new Map();for(const e of tree.tree){
  if(!c230Obj(e)||typeof e.path!=='string'||!e.path.length||e.path.length>2048||e.path.startsWith('/')||e.path.includes('\\')||e.path.split('/').some(p=>p===''||p==='.'||p==='..')||paths.has(e.path))c230Bad();paths.set(e.path,e);
 }
 for(const p of C230_ADMISSION.edges){const e=paths.get(p.path);if(!e||e.type!=='blob'||e.mode!==p.mode||e.sha!==p.sha||Object.hasOwn(e,'size')&&e.size!==p.bytes)c230Bad();}
 const admitted=new Set(C230_ADMISSION.edges.map(e=>e.path));
 for(const p of paths.keys())if((p.startsWith('docs/superpowers/source-lab/c2-t1/')||p.startsWith('docs/superpowers/source-lab/c2-t1-fixture-fix1/'))&&!admitted.has(p))c230Bad();
 return {checkedEdges:25};
}
function c230Log(raw,joined){
 if(typeof raw!=='string'||Buffer.byteLength(raw,'utf8')>4194304||!raw.endsWith('\n'))c230Bad();
 const start=c230Time(joined.commandStep.started_at)-1000,end=c230Time(joined.commandStep.completed_at)+1000,command=C230_ADMISSION.sourceNomination.command,frames=[];
 let opened=false,seen=0,closed=false,window=false;
 for(const row of raw.split('\n')){
  if(!row)continue;const m=/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?Z) (.*)$/.exec(row);
  if(!m){if(row.includes('AFW_C2_')||row.includes('##[group]Run '+command))c230Bad();continue;}
  const t=c230Time(m[1]),line=m[2],inside=t>=start&&t<=end;
  if(line==='##[group]Run '+command){if(++seen!==1||opened||!inside)c230Bad();opened=true;window=true;continue;}
  if(opened&&line==='##[endgroup]'){if(!inside)c230Bad();opened=false;closed=true;continue;}
  if(closed&&line.startsWith('##[group]'))window=false;
  if(line.includes('AFW_C2_')){if(!line.startsWith('AFW_C2_')||seen!==1||!closed||!window||!inside)c230Bad();frames.push(line+'\n');}
 }
 if(seen!==1||opened||!closed||frames.length!==8)c230Bad();return frames;
}
function c2OwnReadSourceFixtureFix1(input,trustedExpected,sha256,inflateRawSync){
 if(!c230Keys(input,['run','jobs','commit','tree','transport','artifact'])||typeof sha256!=='function')c230Bad();
 const joined=c230ApiJoin(input.run,input.jobs,input.commit,trustedExpected),tree=c230Tree(input.tree,trustedExpected),t=input.transport;
 if(!c230Keys(t,['runId','jobId','rawLog'])||t.runId!==input.run.id||t.jobId!==joined.jobId)c230Bad();
 const frames=c230Log(t.rawLog,joined),receipt=c230ReadBundle(frames,joined.context),a=input.artifact;
 if(!c230Keys(a,['runId','jobId','listing','artifactId','fileName','archiveBase64','payloadText'])||a.runId!==input.run.id||a.jobId!==joined.jobId||a.fileName!==C230_ADMISSION.sourceNomination.artifact.fileName||typeof a.payloadText!=='string'||Buffer.byteLength(a.payloadText)>24577||a.payloadText!==JSON.stringify(receipt)+'\n'||a.listing?.total_count!==1||!Array.isArray(a.listing.artifacts)||a.listing.artifacts.length!==1)c230Bad();
 const item=a.listing.artifacts[0],zip=c230ZipPayload(a.archiveBase64,a.fileName,inflateRawSync),digest=sha256(zip.archive);
 if(!/^[a-f0-9]{64}$/.test(digest)||!c230Obj(item)||item.id!==a.artifactId||!c230Int(item.id,1,Number.MAX_SAFE_INTEGER)||item.name!==C230_ADMISSION.sourceNomination.artifact.name||item.expired!==false||item.size_in_bytes!==zip.archive.length||item.workflow_run?.id!==input.run.id||item.workflow_run?.head_sha!==trustedExpected.head||item.workflow_run?.head_branch!==trustedExpected.branch||item.digest!=='sha256:'+digest||!zip.payload.equals(Buffer.from(a.payloadText,'utf8')))c230Bad();
 return {receiverChecksSatisfied:true,context:joined.context,jobId:joined.jobId,commandStepNumbers:joined.commandStepNumbers,tree,receipt,artifact:{id:item.id,archiveBytes:zip.archive.length,archiveSha256:digest,payloadBytes:zip.payload.length,payloadSha256:sha256(zip.payload)},SourceQualified:false,Task1Pass:false,nonclaims:JSON.parse(JSON.stringify(C230_ADMISSION.nonclaims))};
}

function c230Crc32(bytes){let crc=0xffffffff;for(const x of bytes){crc^=x;for(let k=0;k<8;k++)crc=crc&1?(crc>>>1)^0xedb88320:crc>>>1;}return (crc^0xffffffff)>>>0;}
function c230ZipPayload(base64,name,inflate){
 if(typeof base64!=='string'||base64.length>1500000)c230Bad();const z=Buffer.from(base64,'base64');if(z.toString('base64')!==base64||z.length<22||z.length>1048576)c230Bad();
 let e=-1;for(let p=z.length-22;p>=Math.max(0,z.length-65557);p--)if(z.readUInt32LE(p)===0x06054b50&&p+22+z.readUInt16LE(p+20)===z.length){e=p;break;}
 if(e<0||z.readUInt16LE(e+4)!==0||z.readUInt16LE(e+6)!==0||z.readUInt16LE(e+8)!==1||z.readUInt16LE(e+10)!==1)c230Bad();
 const size=z.readUInt32LE(e+12),c=z.readUInt32LE(e+16);if(c+size!==e||size<46||c<30||z.readUInt32LE(c)!==0x02014b50)c230Bad();
 const flags=z.readUInt16LE(c+8),method=z.readUInt16LE(c+10),crc=z.readUInt32LE(c+16),compressed=z.readUInt32LE(c+20),length=z.readUInt32LE(c+24),nl=z.readUInt16LE(c+28),el=z.readUInt16LE(c+30),cl=z.readUInt16LE(c+32),local=z.readUInt32LE(c+42);
 if(flags&~0x80e||![0,8].includes(method)||length<1||length>24577||compressed>1048576||46+nl+el+cl!==size||z.readUInt16LE(c+34)!==0||local!==0||((z.readUInt32LE(c+38)>>>16)&0xf000)!==0&&((z.readUInt32LE(c+38)>>>16)&0xf000)!==0x8000)c230Bad();
 if(z.subarray(c+46,c+46+nl).toString('utf8')!==name||z.readUInt32LE(0)!==0x04034b50||z.readUInt16LE(6)!==flags||z.readUInt16LE(8)!==method)c230Bad();
 const lnl=z.readUInt16LE(26),lel=z.readUInt16LE(28),start=30+lnl+lel,end=start+compressed;
 if(z.subarray(30,30+lnl).toString('utf8')!==name||end>c)c230Bad();
 if(flags&8){let d=end;if(c-d===16&&z.readUInt32LE(d)===0x08074b50)d+=4;if(c-d!==12||z.readUInt32LE(d)!==crc||z.readUInt32LE(d+4)!==compressed||z.readUInt32LE(d+8)!==length)c230Bad();}
 else if(end!==c||z.readUInt32LE(14)!==crc||z.readUInt32LE(18)!==compressed||z.readUInt32LE(22)!==length)c230Bad();
 let payload;if(method===0)payload=z.subarray(start,end);else{
  if(typeof inflate!=='function')c230Bad();let decoded;
  try{decoded=inflate(z.subarray(start,end),{maxOutputLength:24577,info:true});}catch{c230Bad();}
  if(!c230Obj(decoded)||!Buffer.isBuffer(decoded.buffer)||!decoded.engine||!Number.isSafeInteger(decoded.engine.bytesWritten)||decoded.engine.bytesWritten!==compressed)c230Bad();
  payload=decoded.buffer;
 }
 if(!Buffer.isBuffer(payload)||payload.length!==length||c230Crc32(payload)!==crc)c230Bad();return {archive:z,payload};
}



export {c2OwnReadSourceFixtureFix1,c230CheckModeCases,c230ReadFrame,c230ReadBundle,c230ApiJoin,c230Tree,c230Log,c230Time,c230ZipPayload,c230Crc32};
