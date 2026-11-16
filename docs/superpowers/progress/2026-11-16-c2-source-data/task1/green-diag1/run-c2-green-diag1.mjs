import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir,mkdtemp,symlink,rm,lstat,readdir,open} from 'node:fs/promises';
import {resolve,join,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',TREE='62e78926635d6b74f288d6c0d69e0f2516306989',REPO='tokenizartinfo-ops/agent-friendly-web';
const PREFIX='docs/superpowers/source-lab/c2-t1',INDEX_HASH="b0af9ed81c8e7b21a35a3a8a08ca7b465b4549c625b20fcc883b1982ff97db03";
const CUSTODY_HELPERS={"guard":{"path":"docs/superpowers/source-lab/c2-t1/c2-source-custody-guard.mjs","bytes":1208,"sha256":"c21d600503bee20abfacc36779c846a34e46023d921ef6d6ceb697abcef50ebf"},"preflight":{"path":"docs/superpowers/source-lab/c2-t1/c2-source-custody-preflight.mjs","bytes":417,"sha256":"3e548a2dc9527e72997bf147dedcab1b8c34f49848ece68cff498991f200a9ae"}};
const BOOTSTRAP_DATA={"path":".github/workflows/afw-finite-qa-bootstrap.yml","blob":"22f324e480dbe0295fe23fb7415328cba7952b1b","bytes":1844,"sha256":"ff64a890db1b55f8ed922e036673ebaf0a494c4833023bbc3317f28c6ededd14","gitBlob":"22f324e480dbe0295fe23fb7415328cba7952b1b"};
const BOOTSTRAP_ABSENCE_PROGRAM="import {bootstrapWorld} from './test/fixtures/finite-bootstrap-world.mjs';\nimport {BOOTSTRAP} from './lib/mcp-qa-finite-bootstrap-record.mjs';\nlet status='fail',observation='UNEXPECTED_SUCCESS';\ntry{await bootstrapWorld();}\ncatch(error){if(error?.code==='ENOENT'&&error?.path===BOOTSTRAP.workflowPath){status='pass';observation='EXPECTED_ENOENT';}else observation='UNEXPECTED_ERROR';}\nprocess.stdout.write('AFW_C2_DEPENDENCY_CONTROL '+JSON.stringify({schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status,observation})+'\\n');\nif(status!=='pass')process.exitCode=1;\n";
import {constants as fsFlags} from 'node:fs';
const BRANCH='refs/heads/lab/afw-c2-source-20261116-t1-green-diag1',MESSAGE='AFW-C2-SOURCE-T1-GREEN-DIAG1-ONEUSE-20261116';
const ALLOWED=["lib/mcp-qa-finite-owner-phase-context.mjs","lib/mcp-qa-finite-owner-preparation.mjs","lib/mcp-qa-finite-owner-native-receiver.mjs","worker/mcp-own/finite.mjs","lib/mcp-qa-finite-owner-cleanup-scope.mjs","lib/mcp-qa-finite-owner-cleanup.mjs","lib/mcp-qa-finite-initial-cleanup.mjs","test/mcp-qa-finite-owner-three-stage-native.test.mjs","test/fixtures/finite-coupled-native.mjs","test/fixtures/finite-first-connection-publication.mjs","test/fixtures/finite-initial-entry-world.mjs","test/mcp-qa-finite-first-connection-publication-native.test.mjs","lib/mcp-qa-finite-owner-notice-get-forward.mjs"],ROOT_FILES=["package-lock.json","package.json","tsconfig.json","wrangler.a2a-canary.jsonc","wrangler.a2a-production.jsonc","wrangler.assistance-goal-context.jsonc","wrangler.assistance-goal-context.qa.jsonc","wrangler.assistance-supervision-producer.jsonc","wrangler.contact.jsonc","wrangler.delegated-canary.jsonc","wrangler.delegated-real-pilot.example.jsonc","wrangler.delegated-real-pilot.jsonc","wrangler.delegated.jsonc","wrangler.dossier-supervision-producer.jsonc","wrangler.independent-closure-qa.finite.jsonc","wrangler.independent-closure-qa.jsonc","wrangler.independent-closure-qa.rollback.jsonc","wrangler.mail-canary.jsonc","wrangler.mcp-own-events.example.jsonc","wrangler.mcp-own.finite.jsonc","wrangler.mcp.jsonc","wrangler.operations-manager.jsonc","wrangler.operations-producer.jsonc","wrangler.operations-review-qa.jsonc","wrangler.operations-review.jsonc","wrangler.operations-watchdog.jsonc","wrangler.operations.jsonc","wrangler.release-operator.jsonc"],CASES=[{"id":"C2T1_CONNECTION","phase":"connection"},{"id":"C2T1_OAUTH","phase":"oauth"},{"id":"C2T1_HANDLE","phase":"negative"},{"id":"C2T1_PROJECTREF","phase":"negative"},{"id":"C2T1_SUBJECT","phase":"negative"},{"id":"C2T1_PHASE_RENAME","phase":"negative"},{"id":"C2T1_SOURCE_BYTES","phase":"negative"},{"id":"C2T1_APPROVAL","phase":"negative"},{"id":"C2T1_PREDECESSOR","phase":"negative"},{"id":"C2T1_GRANT_REVOKED","phase":"negative"},{"id":"C2T1_EXTRA_KEY","phase":"negative"},{"id":"C2T1_NOTICES","phase":"notices"},{"id":"C2T1_MONITOR_COOKIE","phase":"monitor"},{"id":"C2T1_MONITOR","phase":"monitor"},{"id":"C2T1_SCOPE_MISSING","phase":"scope"},{"id":"C2T1_FINITE","phase":"finite"},{"id":"C2T1_SELECTION","phase":"selection"},{"id":"C2T1_LOST_ACK_DUPLICATE","phase":"negative"},{"id":"C2T1_UNRESOLVED_WRITER","phase":"negative"},{"id":"C2T1_OWN_PROMISE","phase":"negative"}];
const sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const failure=()=>{throw Error('CAPTURE_INVALID');};
const exact=(a,b)=>{if(JSON.stringify(a)!==JSON.stringify(b))failure();};
const enter=Date.now(),end=enter+330000,workspace=resolve(process.cwd()),node=process.execPath,uid=process.getuid?.(),gid=process.getgid?.();
const hostEnv={PATH:dirname(node)+':/usr/bin:/bin:/usr/sbin:/sbin',HOME:resolve(process.env.RUNNER_TEMP??''),LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
const LAB='docs/superpowers/source-lab/c2-t1-green-diag1',JOB='c2-green-diag1';
const TOOLING={"selection":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/mode-selection.json","bytes":5460,"blob":"bf500cccd9d6e828f74e9328f849d837ee2d0db4","sha256":"0dc71e54f901c91e4be06810eaead653862ae8365328e37673a548c0a3b8fb59"},"vectors":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/synthetic-vectors.json","bytes":14802,"blob":"d8cdb6f14f0c4dcd9101e2af76deeefde3862b9f","sha256":"c630dc5d213f8102ad5b36ae30e8251f14d6b9652207c6ab4044d57fc1b5f402"},"parser":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/tap-protocol.mjs","bytes":10291,"blob":"cac11bfac3c19397c5074a7c52767c4990a48a87","sha256":"3de67d5b30f7a0019b8f02118cf3727be7ae79d22ecfdc56bc7d39e60681dfd4"},"selftest":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/synthetic-controls.mjs","bytes":3313,"blob":"bc33365eaf302d2296a759202a822af4a443f143","sha256":"2f49b434e3e51a4a3c225903b3a681e4f01ea3f62b58f337e6a26d0fdde8fcae"},"driver":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/observer-driver.txt","bytes":3169,"blob":"9e29c5197207b03bdb4b10069089f37df289e88c","sha256":"3363ff3be3fedb244f22f965be04925c579a3cfe33b7a718ec76428e3b4ca5bc"},"recorder":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/progress-recorder.mjs","bytes":3812,"blob":"e12bfc1c6734767c3eabb10c6d57d8ff5d1de1c3","sha256":"271b9abeb806acaa5e6a1d35e6e72c77cf9b25bb5cad3603f0ccbb05745f7508"},"reader":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/read-progress.mjs","bytes":5507,"blob":"62a31e3c16cc710c84ebfb5b0242abb00671363c","sha256":"c9e0fa37a70a503ea172450abe5593bce98b4218905eb8fe0af26047986c003f"},"progressVectors":{"path":"docs/superpowers/source-lab/c2-t1-green-diag1/progress-vectors.json","bytes":8624,"blob":"32777d8b2d5676688d4bf7546bf6bb8ed296e3b4","sha256":"71c979c34d8a9fc8fcce7e99463ca0479160b32620517e69849021715c21570b"}};
const SELECTION_HASHES=["7daaeb72f174744ecc11e234f899c75ed5a17daa1e820271e015bf179e9aac6b","ecb5037b4f3274c5afcab5bb2a7fdc4ca3795e450583db7b13e3eed98955d3f3","7b77711a74b39e7e4381dc66fa7044c31d532b9f52a118f5990df3c9246ed29e"];
let temp,phase='admission',frontier='launch',lastCapture=null,custodyContext=null,pendingOutcome=null,context=null,diagnosticCode="CAPTURE_INVALID",preflightOwned=false,preflightRemoved=false,checkedLaunches=0,checkedProcesses=0,custodyValid=true,ownRootVerified=false,ownTempRemoved=false;
function safeCapture(result){
 const output=value=>Buffer.isBuffer(value)?{bytes:value.length,sha256:sha(value)}:null;
 const errorCode=result?.error?.code;
 const errorKind=result?.error?({ENOENT:'spawn-enoent',EACCES:'spawn-eacces',EPERM:'spawn-eperm',ETIMEDOUT:'timeout',ENOBUFS:'buffer-limit'}[errorCode]??'spawn-other'):'none';
 const exitCode=Number.isInteger(result?.status)&&result.status>=0&&result.status<=255?result.status:null;
 const signal=result?.signal===null?'none':['SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE'].includes(result?.signal)?result.signal:typeof result?.signal==='string'?'other':'unavailable';
 return {exitCode,signal,errorKind,stdout:output(result?.stdout),stderr:output(result?.stderr)};
}
function diagnostic() {
 const frame={schema:'afw.c2-green-frontier.v1',context,phase,frontier,code:diagnosticCode,capture:lastCapture};
 const line='AFW_C2_GREEN_FRONTIER '+JSON.stringify(frame)+'\n';
 if(Buffer.byteLength(line)<=2048)process.stderr.write(line);
}
function emit(marker,value,max) {
 const line=JSON.stringify(value);
 if(Buffer.byteLength(line)>max)failure();
 process.stdout.write(marker+' '+line+'\n');
}
async function checkedTool(role) {
 const pin=TOOLING[role], data=await readFile(join(workspace,pin.path));
 if(data.length!==pin.bytes||sha(data)!==pin.sha256||blob(data)!==pin.blob)failure();
 return data;
}
function command(executable,args,cwd=workspace,max=1048576,env=hostEnv){
 if(Date.now()>=end)failure();
 const result=spawnSync(executable,args,{cwd,env,encoding:null,maxBuffer:max,timeout:Math.max(1,end-Date.now()),stdio:['ignore','pipe','pipe']});
 if(result.error||result.signal||result.status!==0||!Buffer.isBuffer(result.stdout)||!Buffer.isBuffer(result.stderr)||result.stderr.length>65536)failure();
 return result.stdout;
}
function textCommand(args){return new TextDecoder('utf-8',{fatal:true}).decode(command('git',args)).trim();}
async function materialize(index){
 const target=join(temp,'proposal-green');await mkdir(target);
 const archive=command('git',['archive','--format=tar',BASE,'--','lib','worker','scripts','test','db','config',BOOTSTRAP_DATA.path,...ROOT_FILES],workspace,33554432);
 if(archive.length>33554432)failure();
 const extracted=spawnSync('tar',['-xf','-','-C',target],{env:hostEnv,input:archive,encoding:null,maxBuffer:65536,timeout:Math.max(1,Math.min(30000,end-Date.now()))});
 if(extracted.error||extracted.signal||extracted.status!==0)failure();
 const bootstrap=await readFile(join(target,BOOTSTRAP_DATA.path));if(bootstrap.length!==BOOTSTRAP_DATA.bytes||sha(bootstrap)!==BOOTSTRAP_DATA.sha256||blob(bootstrap)!==BOOTSTRAP_DATA.blob)failure();
 for(const entry of index.entries){
  const admitted=await readFile(join(workspace,entry.dataPath));
  if(admitted.length!==entry.after.bytes||sha(admitted)!==entry.after.sha256||blob(admitted)!==entry.after.blob)failure();
  const file=join(target,entry.path);
  if(entry.before){const before=await readFile(file);if(before.length!==entry.before.bytes||blob(before)!==entry.before.blob)failure();}
  else{try{await lstat(file);failure();}catch(error){if(error?.code!=='ENOENT')failure();}}
  await mkdir(dirname(file),{recursive:true});await writeFile(file,admitted,{flag:entry.before?'w':'wx'});
 }
 await symlink(join(workspace,'node_modules'),join(target,'node_modules'),'dir');
 for(const [name,h]of Object.entries(CUSTODY_HELPERS)){const body=await readFile(join(workspace,h.path));if(body.length!==h.bytes||sha(body)!==h.sha256)failure();await writeFile(join(target,name==='guard'?'c2-source-custody-guard.mjs':'c2-source-custody-preflight.mjs'),body,{flag:'wx'});}
 return target;
}
function custodyRecord(v){return v&&Object.keys(v).length===5&&Object.keys(v).every((k,i)=>k===['schema','uidMatches','gidMatches','groupsCleared','loopbackOnly'][i])&&v.schema==='afw.c2-oauth-custody.v1'&&['uidMatches','gidMatches','groupsCleared','loopbackOnly'].every(k=>v[k]===true);}
async function probeNames(target){
 let names;try{names=await readdir(join(target,'custody-probes'));}catch(error){if(error?.code!=='ENOENT')throw error;names=[];}
 if(names.length>8||names.some(n=>!/^[1-9][0-9]*\.json$/.test(n)))failure();return names;
}
async function runSource(target,args,workingDirectory=target,limit=180000){
 try{
 if(Date.now()>=end)failure();
 const before=await probeNames(target);
 const childEnv={PATH:hostEnv.PATH,HOME:temp,TMPDIR:temp,RUNNER_TEMP:temp,XDG_CACHE_HOME:join(temp,'cache'),XDG_CONFIG_HOME:join(temp,'config'),LANG:'C.UTF-8',LC_ALL:'C.UTF-8',CI:'true',NODE_ENV:'test',GITHUB_SHA:process.env.GITHUB_SHA,GITHUB_REPOSITORY:REPO,AFW_C2_DIAG_ROOT:target,AFW_C2_DIAG_PARENT_UID:String(uid),AFW_C2_DIAG_PARENT_GID:String(gid)};
 // Same verified ephemeral namespace/drop as diagnostic2; no ambient env or external interface.
 frontier='launch';lastCapture=null;const result=spawnSync('sudo',['-n','/usr/bin/env','-i',...Object.entries(childEnv).map(([key,value])=>key+'='+value),'unshare','--net','/bin/sh','-c','uid="$1"; gid="$2"; shift 2; ip link set lo up && exec /usr/bin/setpriv --reuid "$uid" --regid "$gid" --clear-groups --no-new-privs "$@"','c2-source',String(uid),String(gid),node,'--import',join(target,'c2-source-custody-guard.mjs'),...args],{cwd:workingDirectory,env:childEnv,encoding:null,maxBuffer:1048576,timeout:Math.max(1,Math.min(limit,end-Date.now())),stdio:['ignore','pipe','pipe']});lastCapture=safeCapture(result);
 const after=await probeNames(target),fresh=after.filter(n=>!before.includes(n));if(fresh.length<1||fresh.length>8||before.some(n=>!after.includes(n))||checkedLaunches>=3||checkedProcesses+fresh.length>24)failure();
 for(const name of after){const path=join(target,'custody-probes',name),stat=await lstat(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.uid!==uid||stat.gid!==gid||stat.size>1024)failure();const body=await readFile(path);if(body.length>1024||!custodyRecord(JSON.parse(body.toString('utf8'))))failure();}
 checkedLaunches++;checkedProcesses+=fresh.length;return result;
 }catch(error){custodyValid=false;throw error;}
}

const owned = s => s.isFile() && s.nlink===1 && (s.mode&0o777)===0o600 && s.uid===uid && s.gid===gid;
async function readJournal(path,initial) {
 const handle=await open(path,fsFlags.O_RDONLY|fsFlags.O_NOFOLLOW);
 try {
  const before=await handle.stat();
  if(!owned(before)||before.ino!==initial.ino||before.dev!==initial.dev||before.size>32768)failure();
  const bytes=Buffer.alloc(before.size);
  const {bytesRead}=await handle.read(bytes,0,bytes.length,0);
  const after=await handle.stat();
  if(!owned(after)||after.ino!==before.ino||after.dev!==before.dev)failure();
  const stable=bytesRead===before.size&&after.size===before.size&&after.mtimeMs===before.mtimeMs&&after.ctimeMs===before.ctimeMs;
  return {bytes:bytes.subarray(0,bytesRead),stable};
 }finally{await handle.close();}
}
try{
 if(process.argv.length!==2||process.version!=='v22.23.4'||!Number.isSafeInteger(uid)||uid<=0||!Number.isSafeInteger(gid)||gid<0||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_JOB!==JOB||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')||!process.env.RUNNER_TEMP||workspace!==resolve(process.env.GITHUB_WORKSPACE??'')||fileURLToPath(import.meta.url)!==join(workspace,LAB,'run-c2-green-diag1.mjs'))failure();
 if(textCommand(['rev-parse','HEAD'])!==process.env.GITHUB_SHA||textCommand(['rev-parse','HEAD^'])!==BASE||textCommand(['rev-parse',BASE+'^{tree}'])!==TREE||textCommand(['show','-s','--format=%B','HEAD'])!==MESSAGE)failure();
 const tree=textCommand(['rev-parse','HEAD^{tree}']);if(!/^[a-f0-9]{40}$/.test(tree))failure();
 const rawIndex=await readFile(join(workspace,PREFIX,'source-index.json'));if(rawIndex.length!==11467||blob(rawIndex)!=='f9f36a61875be344d38f19d77caf1a46c48e8f37'||sha(rawIndex)!==INDEX_HASH)failure();
 const index=JSON.parse(rawIndex);if(index.schema!=='afw.c2-source-index.v1'||index.context.repository!==REPO||index.context.baselineSource!==BASE||index.context.baselineTree!==TREE||index.context.status!=='SOURCE_TESTS_PENDING')failure();
 exact(index.entries.map(e=>e.path),ALLOWED);exact(index.caseMap,CASES);
 for(let i=0;i<index.entries.length;i++){const e=index.entries[i];if(e.dataPath!==PREFIX+'/body-'+String(i).padStart(2,'0')+'.txt'||e.role!==(e.path.startsWith('test/')?'test':'product')||e.fullReadback!==true)failure();}
 const lock=await readFile(join(workspace,'package-lock.json')),baseLock=command('git',['show',BASE+':package-lock.json']);if(!lock.equals(baseLock)||JSON.parse(lock).packages?.['node_modules/@cloudflare/workers-oauth-provider']?.version!=='1.2.1')failure();
 context={repository:REPO,baselineSource:BASE,baselineTree:TREE,proposalIndexHash:INDEX_HASH,head:process.env.GITHUB_SHA,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:JOB,node:process.version};
 custodyContext={head:context.head,runId:context.runId,runAttempt:1,job:JOB,proposalIndexHash:INDEX_HASH};
 const selections=JSON.parse(await checkedTool('selection')).modes;
 exact(selections.map(s=>sha(Buffer.from(JSON.stringify(s)))),SELECTION_HASHES);
 const vectors=JSON.parse(await checkedTool('vectors'));
 await checkedTool('parser');await checkedTool('selftest');
 await checkedTool('reader');
 const {runSyntheticControls}=await import('./synthetic-controls.mjs');
 phase='synthetic-controls';frontier='parser';diagnosticCode='SYNTHETIC_CONTROL_INVALID';
 const synthetic=runSyntheticControls(vectors,selections,SELECTION_HASHES);
 const {progress,nativePrefix,syntheticProgress}=await import('./read-progress.mjs');
 const ids=CASES.map(c=>c.id);
 const progressChecks=syntheticProgress(JSON.parse(await checkedTool('progressVectors')),ids);
 if(synthetic.accepted!==3||synthetic.rejected!==35||progressChecks!==13)failure();
 emit('AFW_C2_GREEN_SYNTHETIC',{schema:'afw.c2-green-synthetic.v1',context,parserVectorsHash:TOOLING.vectors.sha256,
  progressVectorsHash:TOOLING.progressVectors.sha256,...synthetic,progressChecks},2048);
 diagnosticCode='CAPTURE_INVALID';
 const root=resolve(process.env.RUNNER_TEMP);temp=await mkdtemp(join(root,'afw-c2-t1-'));if(!resolve(temp).startsWith(root+sep)||(await lstat(temp)).uid!==uid)failure();
 phase='materialize';frontier='launch';
 const target=await materialize(index);
   phase='custody-preflight';const preflight=await runSource(target,[join(target,'c2-source-custody-preflight.mjs')],target,10000);
   const expectedPreflight='AFW_C2_OAUTH_PREFLIGHT '+JSON.stringify({schema:'afw.c2-oauth-preflight.v1',written:true})+'\n';
   if(preflight.error||preflight.signal||preflight.status!==0||!Buffer.isBuffer(preflight.stdout)||!Buffer.isBuffer(preflight.stderr)||preflight.stdout.toString('utf8')!==expectedPreflight||preflight.stderr.length!==0)failure();
   const probe=join(target,'preflight-owned','probe'),stat=await lstat(probe);preflightOwned=stat.isFile()&&!stat.isSymbolicLink()&&stat.uid===uid&&stat.gid===gid&&stat.size===15&&(await readFile(probe,'utf8'))==='C2_OAUTH_OWNED\n';if(!preflightOwned)failure();
   await rm(join(target,'preflight-owned'),{recursive:true,force:false});try{await lstat(join(target,'preflight-owned'));failure();}catch(error){if(error?.code!=='ENOENT')failure();}preflightRemoved=true;
   phase='materialize';const absent=join(temp,'bootstrap-absent-cwd');await mkdir(absent);
   const controlFile=join(target,'c2-bootstrap-absent-control.mjs');await writeFile(controlFile,BOOTSTRAP_ABSENCE_PROGRAM,{flag:'wx'});
   const control=await runSource(target,[controlFile],absent);frontier='frames';
   const expected='AFW_C2_DEPENDENCY_CONTROL '+JSON.stringify({schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status:'pass',observation:'EXPECTED_ENOENT'})+'\n';
   if(control.error||control.signal||control.status!==0||!Buffer.isBuffer(control.stdout)||!Buffer.isBuffer(control.stderr)||control.stdout.toString('utf8')!==expected||control.stderr.length!==0)failure();
   process.stdout.write(control.stdout);

 phase='green-observer';frontier='driver';
 const driver=await checkedTool('driver'),recorder=await checkedTool('recorder');
 const nativeFile=join(target,selections[1].file);
 const original=await readFile(nativeFile);
 if(blob(original)!==index.entries[7].after.blob||sha(original)!==index.entries[7].after.sha256)failure();
 await writeFile(nativeFile,driver,{flag:'w'});
 await writeFile(join(target,'test','finite-green-progress-recorder.mjs'),recorder,{flag:'wx'});
 if(blob(await readFile(nativeFile))!==TOOLING.driver.blob||blob(await readFile(join(target,'test','finite-green-progress-recorder.mjs')))!==TOOLING.recorder.blob)failure();
 const path=join(target,'green-progress.ndjson');
 const fresh=await open(path,fsFlags.O_CREAT|fsFlags.O_EXCL|fsFlags.O_WRONLY|fsFlags.O_NOFOLLOW,0o600);
 let initial;
 try{initial=await fresh.stat();if(!owned(initial)||initial.size!==0)failure();}finally{await fresh.close();}
 const child=await runSource(target,['--experimental-vm-modules','--test','--test-reporter=tap','--test-concurrency=1',selections[1].file]);
 const capture=lastCapture;
 frontier='journal';
 const journal=await readJournal(path,initial);
 const flagged=[child.stdout,child.stderr].some(b=>Buffer.isBuffer(b)&&
  /^(?:# )?AFW_C2_GREEN_RECORDER_FAULT$/m.test(b.toString('utf8')));
 const witness=progress(journal.bytes,ids,capture.errorKind==='timeout'?'timeout':'normal',flagged||!journal.stable);
 const native=nativePrefix(child.stdout,ids);
 pendingOutcome={selectionHash:SELECTION_HASHES[1],originalDriverBlob:index.entries[7].after.blob,
  driverHash:TOOLING.driver.sha256,recorderHash:TOOLING.recorder.sha256,readerHash:TOOLING.reader.sha256,
  parserVectorsHash:TOOLING.vectors.sha256,progressVectorsHash:TOOLING.progressVectors.sha256,
  capture,journal:{bytes:journal.bytes.length,sha256:sha(journal.bytes),stable:journal.stable,recorderFaultObserved:flagged},witness,native};
}catch{diagnostic();process.exitCode=1;}
finally{if(temp){try{phase='cleanup';frontier='launch';lastCapture=null;diagnosticCode='CLEANUP_INVALID';const root=resolve(process.env.RUNNER_TEMP??'');ownRootVerified=resolve(temp).startsWith(root+sep)&&(await lstat(temp)).uid===uid;if(!ownRootVerified)failure();await rm(temp,{recursive:true,force:false});try{await lstat(temp);failure();}catch(error){if(error?.code!=='ENOENT')failure();}ownTempRemoved=true;}catch{diagnostic();process.exitCode=1;}}}
const custodyProof={schema:'afw.c2-green-custody.v1',context:custodyContext,parentNonRoot:Number.isSafeInteger(uid)&&uid>0,preflightOwned,preflightRemoved,checkedLaunches,checkedProcesses,uidGidGroupsLoopbackMatched:checkedLaunches>0&&custodyValid,ownRootVerified,ownTempRemoved};
const custodyOutput=JSON.stringify(custodyProof);if(Buffer.byteLength(custodyOutput)>1024)process.exitCode=1;else process.stdout.write('AFW_C2_GREEN_CUSTODY '+custodyOutput+'\n');
const custodyQualified=Buffer.byteLength(custodyOutput)<=1024&&custodyContext!==null&&custodyProof.parentNonRoot&&preflightOwned&&preflightRemoved&&checkedLaunches===3&&checkedProcesses>=3&&checkedProcesses<=24&&custodyProof.uidGidGroupsLoopbackMatched&&ownRootVerified&&ownTempRemoved;

if(pendingOutcome&&custodyQualified&&!process.exitCode&&Date.now()<end){
 try{
  phase='publication';frontier='frames';diagnosticCode='PUBLICATION_INVALID';
  const outcome={schema:'afw.c2-green-observation.v1',context,observation:pendingOutcome,custody:custodyProof,
   SourceQualified:false,Task1Pass:false,nonclaims:{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}};
  const bytes=JSON.stringify(outcome);
  if(Buffer.byteLength(bytes)>24576)failure();
  await mkdir(join(workspace,'output'),{recursive:true});
  await writeFile(join(workspace,'output','c2-green-diag1.json'),bytes+'\n',{flag:'wx'});
  process.stdout.write('AFW_C2_GREEN_OUTCOME '+bytes+'\n');
  const capture=pendingOutcome.capture;
  if(!(capture.errorKind==='timeout'||(capture.errorKind==='none'&&capture.signal==='none'&&[0,1].includes(capture.exitCode))))process.exitCode=1;
 }catch{diagnostic();process.exitCode=1;}
}else{process.exitCode=1;}
