import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir,mkdtemp,symlink,rm,lstat,readdir} from 'node:fs/promises';
import {resolve,join,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',TREE='62e78926635d6b74f288d6c0d69e0f2516306989',REPO='tokenizartinfo-ops/agent-friendly-web';
const PREFIX='docs/superpowers/source-lab/c2-t1',INDEX_HASH="b0af9ed81c8e7b21a35a3a8a08ca7b465b4549c625b20fcc883b1982ff97db03";
const CUSTODY_HELPERS={"guard":{"path":"docs/superpowers/source-lab/c2-t1/c2-source-custody-guard.mjs","bytes":1208,"sha256":"c21d600503bee20abfacc36779c846a34e46023d921ef6d6ceb697abcef50ebf"},"preflight":{"path":"docs/superpowers/source-lab/c2-t1/c2-source-custody-preflight.mjs","bytes":417,"sha256":"3e548a2dc9527e72997bf147dedcab1b8c34f49848ece68cff498991f200a9ae"}};
const BOOTSTRAP_DATA={"path":".github/workflows/afw-finite-qa-bootstrap.yml","blob":"22f324e480dbe0295fe23fb7415328cba7952b1b","bytes":1844,"sha256":"ff64a890db1b55f8ed922e036673ebaf0a494c4833023bbc3317f28c6ededd14","gitBlob":"22f324e480dbe0295fe23fb7415328cba7952b1b"};
const BOOTSTRAP_ABSENCE_PROGRAM="import {bootstrapWorld} from './test/fixtures/finite-bootstrap-world.mjs';\nimport {BOOTSTRAP} from './lib/mcp-qa-finite-bootstrap-record.mjs';\nlet status='fail',observation='UNEXPECTED_SUCCESS';\ntry{await bootstrapWorld();}\ncatch(error){if(error?.code==='ENOENT'&&error?.path===BOOTSTRAP.workflowPath){status='pass';observation='EXPECTED_ENOENT';}else observation='UNEXPECTED_ERROR';}\nprocess.stdout.write('AFW_C2_DEPENDENCY_CONTROL '+JSON.stringify({schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status,observation})+'\\n');\nif(status!=='pass')process.exitCode=1;\n";
const BRANCH='refs/heads/lab/afw-c2-source-20261116-t1-fix2',MESSAGE='AFW-C2-OWNER-STAGES-SOURCE-T1-FIX2-ONEUSE-20261116';
const ALLOWED=["lib/mcp-qa-finite-owner-phase-context.mjs","lib/mcp-qa-finite-owner-preparation.mjs","lib/mcp-qa-finite-owner-native-receiver.mjs","worker/mcp-own/finite.mjs","lib/mcp-qa-finite-owner-cleanup-scope.mjs","lib/mcp-qa-finite-owner-cleanup.mjs","lib/mcp-qa-finite-initial-cleanup.mjs","test/mcp-qa-finite-owner-three-stage-native.test.mjs","test/fixtures/finite-coupled-native.mjs","test/fixtures/finite-first-connection-publication.mjs","test/fixtures/finite-initial-entry-world.mjs","test/mcp-qa-finite-first-connection-publication-native.test.mjs","lib/mcp-qa-finite-owner-notice-get-forward.mjs"],ROOT_FILES=["package-lock.json","package.json","tsconfig.json","wrangler.a2a-canary.jsonc","wrangler.a2a-production.jsonc","wrangler.assistance-goal-context.jsonc","wrangler.assistance-goal-context.qa.jsonc","wrangler.assistance-supervision-producer.jsonc","wrangler.contact.jsonc","wrangler.delegated-canary.jsonc","wrangler.delegated-real-pilot.example.jsonc","wrangler.delegated-real-pilot.jsonc","wrangler.delegated.jsonc","wrangler.dossier-supervision-producer.jsonc","wrangler.independent-closure-qa.finite.jsonc","wrangler.independent-closure-qa.jsonc","wrangler.independent-closure-qa.rollback.jsonc","wrangler.mail-canary.jsonc","wrangler.mcp-own-events.example.jsonc","wrangler.mcp-own.finite.jsonc","wrangler.mcp.jsonc","wrangler.operations-manager.jsonc","wrangler.operations-producer.jsonc","wrangler.operations-review-qa.jsonc","wrangler.operations-review.jsonc","wrangler.operations-watchdog.jsonc","wrangler.operations.jsonc","wrangler.release-operator.jsonc"],CASES=[{"id":"C2T1_CONNECTION","phase":"connection"},{"id":"C2T1_OAUTH","phase":"oauth"},{"id":"C2T1_HANDLE","phase":"negative"},{"id":"C2T1_PROJECTREF","phase":"negative"},{"id":"C2T1_SUBJECT","phase":"negative"},{"id":"C2T1_PHASE_RENAME","phase":"negative"},{"id":"C2T1_SOURCE_BYTES","phase":"negative"},{"id":"C2T1_APPROVAL","phase":"negative"},{"id":"C2T1_PREDECESSOR","phase":"negative"},{"id":"C2T1_GRANT_REVOKED","phase":"negative"},{"id":"C2T1_EXTRA_KEY","phase":"negative"},{"id":"C2T1_NOTICES","phase":"notices"},{"id":"C2T1_MONITOR_COOKIE","phase":"monitor"},{"id":"C2T1_MONITOR","phase":"monitor"},{"id":"C2T1_SCOPE_MISSING","phase":"scope"},{"id":"C2T1_FINITE","phase":"finite"},{"id":"C2T1_SELECTION","phase":"selection"},{"id":"C2T1_LOST_ACK_DUPLICATE","phase":"negative"},{"id":"C2T1_UNRESOLVED_WRITER","phase":"negative"},{"id":"C2T1_OWN_PROMISE","phase":"negative"}],REGS=[{"id":"C2T1_REG_01","file":"test/mcp-qa-finite-first-connection-publication-native.test.mjs","name":"T2 finite dispatch never falls through ordinary"},{"id":"C2T1_REG_02","file":"test/mcp-qa-finite-first-connection-publication-native.test.mjs","name":"T2 closed mounted conduits cannot authorize business"},{"id":"C2T1_REG_03","file":"test/mcp-qa-finite-first-connection-publication-native.test.mjs","name":"T3 same initial bytes produce connection and downstream"},{"id":"C2T1_REG_04","file":"test/mcp-qa-finite-initial-cleanup-native.test.mjs","name":"B2b only actual finite alarm with no initial records delegates nominal unchanged"},{"id":"C2T1_REG_05","file":"test/mcp-qa-finite-initial-cleanup-native.test.mjs","name":"Unit2a unresolved issuer prefix refuses initial alarm without inventing authority"},{"id":"C2T1_REG_06","file":"test/mcp-qa-finite-owner-cleanup-native.test.mjs","name":"R2 native monitoring revoke rejects foreign revision and sequence"},{"id":"C2T1_REG_07","file":"test/mcp-qa-finite-owner-cleanup-native.test.mjs","name":"R2 native monitoring revoke enforces native C1 and child window"},{"id":"C2T1_REG_08","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"pure fixed GET wire rejects caller authority and noncanonical metadata"},{"id":"C2T1_REG_09","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"notice cookie-list accepts token names and legitimate values"},{"id":"C2T1_REG_10","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"notice cookie-list rejects malformed list"},{"id":"C2T1_REG_11","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"notice cookie-list bounds assertion and native header envelope"}];
const sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const failure=()=>{throw Error('CAPTURE_INVALID');};
const exact=(a,b)=>{if(JSON.stringify(a)!==JSON.stringify(b))failure();};
const enter=Date.now(),end=enter+330000,workspace=resolve(process.cwd()),node=process.execPath,uid=process.getuid?.(),gid=process.getgid?.();
const hostEnv={PATH:dirname(node)+':/usr/bin:/bin:/usr/sbin:/sbin',HOME:resolve(process.env.RUNNER_TEMP??''),LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
let temp,phase='admission',frontier='launch',lastCapture=null,custodyContext=null,pendingReceipt=null,pendingAccepted=false,preflightOwned=false,preflightRemoved=false,checkedLaunches=0,checkedProcesses=0,custodyValid=true,ownRootVerified=false,ownTempRemoved=false;
function safeCapture(result){
 const output=value=>Buffer.isBuffer(value)?{bytes:value.length,sha256:sha(value)}:null;
 const errorCode=result?.error?.code;
 const errorKind=result?.error?({ENOENT:'spawn-enoent',EACCES:'spawn-eacces',EPERM:'spawn-eperm',ETIMEDOUT:'timeout',ENOBUFS:'buffer-limit'}[errorCode]??'spawn-other'):'none';
 const exitCode=Number.isInteger(result?.status)&&result.status>=0&&result.status<=255?result.status:null;
 const signal=result?.signal===null?'none':['SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE'].includes(result?.signal)?result.signal:typeof result?.signal==='string'?'other':'unavailable';
 const observed={tapResults:0,knownResults:0,knownFrames:0,firstKnownFailure:null,sourceFileFailure:false,dependencyOutcome:null,errorKinds:[]};
 try{
  const text=Buffer.isBuffer(result.stdout)?new TextDecoder('utf-8',{fatal:true}).decode(result.stdout):'';
  const known=new Set([...CASES.map(c=>c.id),...REGS.map(c=>c.name)]);
  for(const line of text.split(/\r?\n/)){
   const match=/^(not )?ok [0-9]+ - (.+)$/.exec(line);
   if(match){
    observed.tapResults++;if(known.has(match[2])){observed.knownResults++;if(match[1]&&!observed.firstKnownFailure)observed.firstKnownFailure=CASES.find(c=>c.id===match[2])?.id??REGS.find(c=>c.name===match[2])?.id??null;}
    if(match[1]&&(match[2]==='test/mcp-qa-finite-owner-three-stage-native.test.mjs'||match[2].endsWith('/test/mcp-qa-finite-owner-three-stage-native.test.mjs')))observed.sourceFileFailure=true;
   }
   if(line.startsWith('# C2SOURCE ')){try{const f=JSON.parse(line.slice('# C2SOURCE '.length));if(CASES.some(c=>c.id===f?.id))observed.knownFrames++;}catch{}}
   if(line.startsWith('AFW_C2_DEPENDENCY_CONTROL ')){try{const d=JSON.parse(line.slice('AFW_C2_DEPENDENCY_CONTROL '.length));if(d?.schema==='afw.c2-bootstrap-dependency-control.v1'&&d.id==='BOOTSTRAP_DEPENDENCY_ABSENT'&&['EXPECTED_ENOENT','UNEXPECTED_SUCCESS','UNEXPECTED_ERROR'].includes(d.observation))observed.dependencyOutcome=d.observation;}catch{}}
  }
  for(const [literal,kind]of [["code: 'ENOENT'",'file-not-found'],["code: 'ERR_MODULE_NOT_FOUND'",'module-not-found'],["code: 'ERR_ASSERTION'",'assertion'],["name: 'SyntaxError'",'syntax']])if(text.includes(literal))observed.errorKinds.push(kind);
  if(observed.tapResults>128||observed.knownResults>31||observed.knownFrames>20)return {exitCode,signal,errorKind,complete:false,stdout:output(result.stdout),stderr:output(result.stderr),observed:null};
 }catch{return {exitCode,signal,errorKind,complete:false,stdout:output(result?.stdout),stderr:output(result?.stderr),observed:null};}
 return {exitCode,signal,errorKind,complete:!result?.error&&!result?.signal,stdout:output(result?.stdout),stderr:output(result?.stderr),observed};
}
function diagnostic(){
 const line=JSON.stringify({phase,frontier,code:'CAPTURE_INVALID',capture:lastCapture});
 if(Buffer.byteLength('AFW_C2_SOURCE_DIAGNOSTIC '+line+'\n')>2048){process.stderr.write('AFW_C2_SOURCE_DIAGNOSTIC '+JSON.stringify({phase,frontier,code:'CAPTURE_INVALID',capture:null})+'\n');return;}
 process.stderr.write('AFW_C2_SOURCE_DIAGNOSTIC '+line+'\n');
}

function command(executable,args,cwd=workspace,max=1048576,env=hostEnv){
 if(Date.now()>=end)failure();
 const result=spawnSync(executable,args,{cwd,env,encoding:null,maxBuffer:max,timeout:Math.max(1,end-Date.now()),stdio:['ignore','pipe','pipe']});
 if(result.error||result.signal||result.status!==0||!Buffer.isBuffer(result.stdout)||!Buffer.isBuffer(result.stderr)||result.stderr.length>65536)failure();
 return result.stdout;
}
function textCommand(args){return new TextDecoder('utf-8',{fatal:true}).decode(command('git',args)).trim();}
function counters(v){frontier='counters';if(!v||Object.keys(v).join(',')!=='upload,activation,receipts'||Object.values(v).some(n=>!Number.isSafeInteger(n)||n<0||n>3))failure();return v;}
function parseTap(result,withFrames){
 frontier='launch';if(result.error||result.signal||!Number.isInteger(result.status)||![0,1].includes(result.status)||!Buffer.isBuffer(result.stdout)||!Buffer.isBuffer(result.stderr)||result.stdout.length>1048576||result.stderr.length>65536)failure();
 frontier='TAP';const out=new TextDecoder('utf-8',{fatal:true}).decode(result.stdout),lines=out.split(/\r?\n/),results=[],frames=[];
 for(const line of lines){
  frontier='TAP';if(/\b(?:SKIP|TODO)\b/.test(line)||/\bcancelled [1-9][0-9]*/.test(line))failure();
  const match=/^(not )?ok ([0-9]+) - (.+)$/.exec(line);
  if(match)results.push({name:match[3],status:match[1]?'fail':'pass'});
  if(line.startsWith('# C2SOURCE ')){
   frontier='frames';const raw=line.slice('# C2SOURCE '.length);let frame;try{frame=JSON.parse(raw);}catch{failure();}
   if(JSON.stringify(frame)!==raw||Object.keys(frame).join(',')!=='id,status,phase,counters,code'||!['pass','fail'].includes(frame.status)||frame.code!==(frame.status==='pass'?'OK':'TEST_FAILED'))failure();
   counters(frame.counters);frontier='frames';frames.push(frame);
  }
 }
 frontier='TAP';const expected=withFrames?CASES.map(c=>c.id):REGS.map(c=>c.name);exact(results.map(r=>r.name),expected);
 if(withFrames){
  frontier='frames';exact(frames.map(f=>f.id),CASES.map(c=>c.id));
  const cases=frames.map((f,i)=>{if(f.status!==results[i].status||f.phase!==CASES[i].phase)failure();return f;});
  frontier='counters';for(let i=1;i<17;i++)for(const key of ['upload','activation','receipts'])if(cases[i].counters[key]<cases[i-1].counters[key])failure();
  return {exitCode:result.status,qualified:result.status===0&&cases.every(c=>c.status==='pass'),cases};
 }
 if(frames.length)failure();
 return {exitCode:result.status,cases:results.map((r,i)=>({id:REGS[i].id,status:r.status,code:r.status==='pass'?'OK':'TEST_FAILED'}))};
}
async function materialize(mode,index){
 const target=join(temp,mode);await mkdir(target);
 const archive=command('git',['archive','--format=tar',BASE,'--','lib','worker','scripts','test','db','config',BOOTSTRAP_DATA.path,...ROOT_FILES],workspace,33554432);
 if(archive.length>33554432)failure();
 const extracted=spawnSync('tar',['-xf','-','-C',target],{env:hostEnv,input:archive,encoding:null,maxBuffer:65536,timeout:30000});
 if(extracted.error||extracted.signal||extracted.status!==0)failure();
 const bootstrap=await readFile(join(target,BOOTSTRAP_DATA.path));if(bootstrap.length!==BOOTSTRAP_DATA.bytes||sha(bootstrap)!==BOOTSTRAP_DATA.sha256||blob(bootstrap)!==BOOTSTRAP_DATA.blob)failure();
 for(const entry of index.entries){
  const admitted=await readFile(join(workspace,entry.dataPath));
  if(admitted.length!==entry.after.bytes||sha(admitted)!==entry.after.sha256||blob(admitted)!==entry.after.blob)failure();
  const file=join(target,entry.path);
  if(entry.before){const before=await readFile(file);if(before.length!==entry.before.bytes||blob(before)!==entry.before.blob)failure();}
  else{try{await lstat(file);failure();}catch(error){if(error?.code!=='ENOENT')failure();}}
  if(mode!=='baseline-red'||entry.role==='test'){await mkdir(dirname(file),{recursive:true});await writeFile(file,admitted,{flag:entry.before?'w':'wx'});}
 }
 await symlink(join(workspace,'node_modules'),join(target,'node_modules'),'dir');
 for(const [name,h]of Object.entries(CUSTODY_HELPERS)){const body=await readFile(join(workspace,h.path));if(body.length!==h.bytes||sha(body)!==h.sha256)failure();await writeFile(join(target,name==='guard'?'c2-source-custody-guard.mjs':'c2-source-custody-preflight.mjs'),body,{flag:'wx'});}
 return target;
}
function custodyRecord(v){return v&&Object.keys(v).join(',')==='schema,uidMatches,gidMatches,groupsCleared,loopbackOnly'&&v.schema==='afw.c2-oauth-custody.v1'&&['uidMatches','gidMatches','groupsCleared','loopbackOnly'].every(k=>v[k]===true);}
async function probeNames(target){
 let names;try{names=await readdir(join(target,'custody-probes'));}catch(error){if(error?.code!=='ENOENT')throw error;names=[];}
 if(names.length>8||names.some(n=>!/^[1-9][0-9]*\.json$/.test(n)))failure();return names;
}
async function runSource(target,args,mode,regression=false,workingDirectory=target,limit=180000){
 try{
 const before=await probeNames(target);
 const childEnv={PATH:hostEnv.PATH,HOME:temp,TMPDIR:temp,RUNNER_TEMP:temp,XDG_CACHE_HOME:join(temp,'cache'),XDG_CONFIG_HOME:join(temp,'config'),LANG:'C.UTF-8',LC_ALL:'C.UTF-8',CI:'true',NODE_ENV:'test',GITHUB_SHA:process.env.GITHUB_SHA,GITHUB_REPOSITORY:REPO,AFW_C2_DIAG_ROOT:target,AFW_C2_DIAG_PARENT_UID:String(uid),AFW_C2_DIAG_PARENT_GID:String(gid),...mode==='mutant-prefix'?{AFW_C2_T1_MUTANT:'prefix'}:{},...regression?{AFW_R2_GROUP:'components'}:{}};
 // Same verified ephemeral namespace/drop as diagnostic2; no ambient env or external interface.
 frontier='launch';lastCapture=null;const result=spawnSync('sudo',['-n','/usr/bin/env','-i',...Object.entries(childEnv).map(([key,value])=>key+'='+value),'unshare','--net','/bin/sh','-c','uid="$1"; gid="$2"; shift 2; ip link set lo up && exec /usr/bin/setpriv --reuid "$uid" --regid "$gid" --clear-groups --no-new-privs "$@"','c2-source',String(uid),String(gid),node,'--import',join(target,'c2-source-custody-guard.mjs'),...args],{cwd:workingDirectory,env:childEnv,encoding:null,maxBuffer:1048576,timeout:Math.max(1,Math.min(limit,end-Date.now())),stdio:['ignore','pipe','pipe']});lastCapture=safeCapture(result);
 const after=await probeNames(target),fresh=after.filter(n=>!before.includes(n));if(fresh.length<1||fresh.length>8||before.some(n=>!after.includes(n))||checkedLaunches>=6)failure();
 for(const name of after){const path=join(target,'custody-probes',name),stat=await lstat(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.uid!==uid||stat.gid!==gid||stat.size>1024)failure();const body=await readFile(path);if(body.length>1024||!custodyRecord(JSON.parse(body.toString('utf8'))))failure();}
 checkedLaunches++;checkedProcesses+=fresh.length;return result;
 }catch(error){custodyValid=false;throw error;}
}

try{
 if(process.argv.length!==2||process.version!=='v22.23.4'||!Number.isSafeInteger(uid)||uid<=0||!Number.isSafeInteger(gid)||gid<0||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_JOB!=='c2-source-lab'||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')||!process.env.RUNNER_TEMP||workspace!==resolve(process.env.GITHUB_WORKSPACE??'')||fileURLToPath(import.meta.url)!==join(workspace,PREFIX,'run-c2-source-lab.mjs'))failure();
 if(textCommand(['rev-parse','HEAD'])!==process.env.GITHUB_SHA||textCommand(['rev-parse',BASE+'^{tree}'])!==TREE||textCommand(['show','-s','--format=%B','HEAD'])!==MESSAGE)failure();
 const tree=textCommand(['rev-parse','HEAD^{tree}']);if(!/^[a-f0-9]{40}$/.test(tree))failure();
 const rawIndex=await readFile(join(workspace,PREFIX,'source-index.json'));if(rawIndex.length>24576||sha(rawIndex)!==INDEX_HASH)failure();
 const index=JSON.parse(rawIndex);if(index.schema!=='afw.c2-source-index.v1'||index.context.repository!==REPO||index.context.baselineSource!==BASE||index.context.baselineTree!==TREE||index.context.status!=='SOURCE_TESTS_PENDING')failure();
 exact(index.entries.map(e=>e.path),ALLOWED);exact(index.caseMap,CASES);
 for(let i=0;i<index.entries.length;i++){const e=index.entries[i];if(e.dataPath!==PREFIX+'/body-'+String(i).padStart(2,'0')+'.txt'||e.role!==(e.path.startsWith('test/')?'test':'product')||e.fullReadback!==true)failure();}
 const manifestRaw=await readFile(join(workspace,PREFIX,'regression-selection.json')),manifest=JSON.parse(manifestRaw);
 if(manifestRaw.length!==index.regressionSelection.bytes||sha(manifestRaw)!==index.regressionSelection.bodyHash||sha(Buffer.from(JSON.stringify(manifest)))!==index.regressionSelection.selectionHash)failure();exact(manifest.selection,REGS);
 const lock=await readFile(join(workspace,'package-lock.json')),baseLock=command('git',['show',BASE+':package-lock.json']);if(!lock.equals(baseLock)||JSON.parse(lock).packages?.['node_modules/@cloudflare/workers-oauth-provider']?.version!=='1.2.1')failure();
 custodyContext={head:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:'c2-source-lab',proposalIndexHash:INDEX_HASH};
 const root=resolve(process.env.RUNNER_TEMP);temp=await mkdtemp(join(root,'afw-c2-t1-'));if(!resolve(temp).startsWith(root+sep)||(await lstat(temp)).uid!==uid)failure();
 const modes=['baseline-red','proposal-green','mutant-prefix'],runs=[];let green;
 for(const mode of modes){phase='materialize';frontier='launch';lastCapture=null;const target=await materialize(mode,index);
  if(mode==='baseline-red'){
   phase='custody-preflight';const preflight=await runSource(target,[join(target,'c2-source-custody-preflight.mjs')],mode,false,target,10000);
   const expectedPreflight='AFW_C2_OAUTH_PREFLIGHT '+JSON.stringify({schema:'afw.c2-oauth-preflight.v1',written:true})+'\n';
   if(preflight.error||preflight.signal||preflight.status!==0||!Buffer.isBuffer(preflight.stdout)||!Buffer.isBuffer(preflight.stderr)||preflight.stdout.toString('utf8')!==expectedPreflight||preflight.stderr.length!==0)failure();
   const probe=join(target,'preflight-owned','probe'),stat=await lstat(probe);preflightOwned=stat.isFile()&&!stat.isSymbolicLink()&&stat.uid===uid&&stat.gid===gid&&stat.size===15&&(await readFile(probe,'utf8'))==='C2_OAUTH_OWNED\n';if(!preflightOwned)failure();
   await rm(join(target,'preflight-owned'),{recursive:true,force:false});try{await lstat(join(target,'preflight-owned'));failure();}catch(error){if(error?.code!=='ENOENT')failure();}preflightRemoved=true;
   phase='materialize';const absent=join(temp,'bootstrap-absent-cwd');await mkdir(absent);
   const controlFile=join(target,'c2-bootstrap-absent-control.mjs');await writeFile(controlFile,BOOTSTRAP_ABSENCE_PROGRAM,{flag:'wx'});
   const control=await runSource(target,[controlFile],mode,false,absent);frontier='frames';
   const expected='AFW_C2_DEPENDENCY_CONTROL '+JSON.stringify({schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status:'pass',observation:'EXPECTED_ENOENT'})+'\n';
   if(control.error||control.signal||control.status!==0||!Buffer.isBuffer(control.stdout)||!Buffer.isBuffer(control.stderr)||control.stdout.toString('utf8')!==expected||control.stderr.length!==0)failure();
   process.stdout.write(control.stdout);
  }
  if(mode==='proposal-green')green=target;phase=mode;const parsed=parseTap(await runSource(target,['--experimental-vm-modules','--test','--test-reporter=tap','--test-concurrency=1','test/mcp-qa-finite-owner-three-stage-native.test.mjs'],mode),true);runs.push({mode,...parsed});}
 phase='regressions';const regressions={...parseTap(await runSource(green,manifest.command.arguments,'proposal-green',true),false),selectionHash:index.regressionSelection.selectionHash};
 const nonclaims={historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
 const receipt={schema:'afw.c2-source-lab-receipt.v1',context:{repository:REPO,baselineSource:BASE,baselineTree:TREE,proposalIndexHash:INDEX_HASH,head:process.env.GITHUB_SHA,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:'c2-source-lab',node:process.version},admitted:index.entries.map(e=>({path:e.path,sha256:e.after.sha256,bytes:e.after.bytes})),runs,regressions,nonclaims};
 const output=JSON.stringify(receipt);if(Buffer.byteLength(output)>24576)failure();
 const baseline=runs[0],proposal=runs[1],mutant=runs[2],named=(run,id)=>run.cases.find(c=>c.id===id);
 const accepted=baseline.exitCode!==0&&!baseline.qualified&&named(baseline,'C2T1_CONNECTION').status==='pass'&&named(baseline,'C2T1_OAUTH').status==='pass'&&named(baseline,'C2T1_NOTICES').status==='fail'&&JSON.stringify(named(baseline,'C2T1_NOTICES').counters)==='{"upload":1,"activation":1,"receipts":1}'&&proposal.qualified&&proposal.exitCode===0&&!mutant.qualified&&mutant.exitCode!==0&&named(mutant,'C2T1_EXTRA_KEY').status==='fail'&&regressions.exitCode===0&&regressions.cases.every(c=>c.status==='pass');
 pendingReceipt=output;pendingAccepted=accepted;
}catch{diagnostic();process.exitCode=1;}
finally{if(temp){try{phase='cleanup';frontier='launch';lastCapture=null;const root=resolve(process.env.RUNNER_TEMP??'');ownRootVerified=resolve(temp).startsWith(root+sep)&&(await lstat(temp)).uid===uid;if(!ownRootVerified)failure();await rm(temp,{recursive:true,force:false});try{await lstat(temp);failure();}catch(error){if(error?.code!=='ENOENT')failure();}ownTempRemoved=true;}catch{diagnostic();process.exitCode=1;}}}
const custodyProof={schema:'afw.c2-source-custody.v1',context:custodyContext,parentNonRoot:Number.isSafeInteger(uid)&&uid>0,preflightOwned,preflightRemoved,checkedLaunches,checkedProcesses,uidGidGroupsLoopbackMatched:checkedLaunches>0&&custodyValid,ownRootVerified,ownTempRemoved};
const custodyOutput=JSON.stringify(custodyProof);if(Buffer.byteLength(custodyOutput)>1024)process.exitCode=1;else process.stdout.write('AFW_C2_SOURCE_CUSTODY '+custodyOutput+'\n');
const custodyQualified=Buffer.byteLength(custodyOutput)<=1024&&custodyContext!==null&&custodyProof.parentNonRoot&&preflightOwned&&preflightRemoved&&checkedLaunches===6&&checkedProcesses>=6&&checkedProcesses<=24&&custodyProof.uidGidGroupsLoopbackMatched&&ownRootVerified&&ownTempRemoved;
if(pendingReceipt&&custodyQualified){try{frontier='frames';await mkdir(join(workspace,'output'),{recursive:true});await writeFile(join(workspace,'output','c2-source-lab-receipt.json'),pendingReceipt+'\n');process.stdout.write('AFW_C2_SOURCE_RECEIPT '+pendingReceipt+'\n');if(!pendingAccepted)process.exitCode=1;}catch{diagnostic();process.exitCode=1;}}else process.exitCode=1;
