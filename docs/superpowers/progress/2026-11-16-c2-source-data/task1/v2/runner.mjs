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
const BRANCH='refs/heads/lab/afw-c2-source-20261116-t1-v2',MESSAGE='AFW-C2-OWNER-STAGES-SOURCE-T1-V2-ONEUSE-20261116';
const ALLOWED=["lib/mcp-qa-finite-owner-phase-context.mjs","lib/mcp-qa-finite-owner-preparation.mjs","lib/mcp-qa-finite-owner-native-receiver.mjs","worker/mcp-own/finite.mjs","lib/mcp-qa-finite-owner-cleanup-scope.mjs","lib/mcp-qa-finite-owner-cleanup.mjs","lib/mcp-qa-finite-initial-cleanup.mjs","test/mcp-qa-finite-owner-three-stage-native.test.mjs","test/fixtures/finite-coupled-native.mjs","test/fixtures/finite-first-connection-publication.mjs","test/fixtures/finite-initial-entry-world.mjs","test/mcp-qa-finite-first-connection-publication-native.test.mjs","lib/mcp-qa-finite-owner-notice-get-forward.mjs"],ROOT_FILES=["package-lock.json","package.json","tsconfig.json","wrangler.a2a-canary.jsonc","wrangler.a2a-production.jsonc","wrangler.assistance-goal-context.jsonc","wrangler.assistance-goal-context.qa.jsonc","wrangler.assistance-supervision-producer.jsonc","wrangler.contact.jsonc","wrangler.delegated-canary.jsonc","wrangler.delegated-real-pilot.example.jsonc","wrangler.delegated-real-pilot.jsonc","wrangler.delegated.jsonc","wrangler.dossier-supervision-producer.jsonc","wrangler.independent-closure-qa.finite.jsonc","wrangler.independent-closure-qa.jsonc","wrangler.independent-closure-qa.rollback.jsonc","wrangler.mail-canary.jsonc","wrangler.mcp-own-events.example.jsonc","wrangler.mcp-own.finite.jsonc","wrangler.mcp.jsonc","wrangler.operations-manager.jsonc","wrangler.operations-producer.jsonc","wrangler.operations-review-qa.jsonc","wrangler.operations-review.jsonc","wrangler.operations-watchdog.jsonc","wrangler.operations.jsonc","wrangler.release-operator.jsonc"],CASES=[{"id":"C2T1_CONNECTION","phase":"connection"},{"id":"C2T1_OAUTH","phase":"oauth"},{"id":"C2T1_HANDLE","phase":"negative"},{"id":"C2T1_PROJECTREF","phase":"negative"},{"id":"C2T1_SUBJECT","phase":"negative"},{"id":"C2T1_PHASE_RENAME","phase":"negative"},{"id":"C2T1_SOURCE_BYTES","phase":"negative"},{"id":"C2T1_APPROVAL","phase":"negative"},{"id":"C2T1_PREDECESSOR","phase":"negative"},{"id":"C2T1_GRANT_REVOKED","phase":"negative"},{"id":"C2T1_EXTRA_KEY","phase":"negative"},{"id":"C2T1_NOTICES","phase":"notices"},{"id":"C2T1_MONITOR_COOKIE","phase":"monitor"},{"id":"C2T1_MONITOR","phase":"monitor"},{"id":"C2T1_SCOPE_MISSING","phase":"scope"},{"id":"C2T1_FINITE","phase":"finite"},{"id":"C2T1_SELECTION","phase":"selection"},{"id":"C2T1_LOST_ACK_DUPLICATE","phase":"negative"},{"id":"C2T1_UNRESOLVED_WRITER","phase":"negative"},{"id":"C2T1_OWN_PROMISE","phase":"negative"}],REGS=[{"id":"C2T1_REG_01","file":"test/mcp-qa-finite-first-connection-publication-native.test.mjs","name":"T2 finite dispatch never falls through ordinary"},{"id":"C2T1_REG_02","file":"test/mcp-qa-finite-first-connection-publication-native.test.mjs","name":"T2 closed mounted conduits cannot authorize business"},{"id":"C2T1_REG_03","file":"test/mcp-qa-finite-first-connection-publication-native.test.mjs","name":"T3 same initial bytes produce connection and downstream"},{"id":"C2T1_REG_04","file":"test/mcp-qa-finite-initial-cleanup-native.test.mjs","name":"B2b only actual finite alarm with no initial records delegates nominal unchanged"},{"id":"C2T1_REG_05","file":"test/mcp-qa-finite-initial-cleanup-native.test.mjs","name":"Unit2a unresolved issuer prefix refuses initial alarm without inventing authority"},{"id":"C2T1_REG_06","file":"test/mcp-qa-finite-owner-cleanup-native.test.mjs","name":"R2 native monitoring revoke rejects foreign revision and sequence"},{"id":"C2T1_REG_07","file":"test/mcp-qa-finite-owner-cleanup-native.test.mjs","name":"R2 native monitoring revoke enforces native C1 and child window"},{"id":"C2T1_REG_08","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"pure fixed GET wire rejects caller authority and noncanonical metadata"},{"id":"C2T1_REG_09","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"notice cookie-list accepts token names and legitimate values"},{"id":"C2T1_REG_10","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"notice cookie-list rejects malformed list"},{"id":"C2T1_REG_11","file":"test/mcp-qa-finite-owner-notice-get-native.test.mjs","name":"notice cookie-list bounds assertion and native header envelope"}];
const sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const failure=()=>{throw Error('CAPTURE_INVALID');};
const exact=(a,b)=>{if(JSON.stringify(a)!==JSON.stringify(b))failure();};
const enter=Date.now(),end=enter+330000,workspace=resolve(process.cwd()),node=process.execPath,uid=process.getuid?.(),gid=process.getgid?.();
const hostEnv={PATH:dirname(node)+':/usr/bin:/bin:/usr/sbin:/sbin',HOME:resolve(process.env.RUNNER_TEMP??''),LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
const LAB='docs/superpowers/source-lab/c2-t1-v2', JOB='c2-source-lab-v2';
const TOOLING={"selection":{"path":"docs/superpowers/source-lab/c2-t1-v2/mode-selection.json","blob":"bf500cccd9d6e828f74e9328f849d837ee2d0db4","bytes":5460,"sha256":"0dc71e54f901c91e4be06810eaead653862ae8365328e37673a548c0a3b8fb59"},"vectors":{"path":"docs/superpowers/source-lab/c2-t1-v2/synthetic-vectors.json","blob":"40b1f06404470a73f9def3b68d366c90b6ebf7e1","bytes":9873,"sha256":"30634f2a8c173f670ed2b4cc33a8a8846ac54ad4b5b15d8cb6b17a1ca64acac3"},"parser":{"path":"docs/superpowers/source-lab/c2-t1-v2/tap-protocol.mjs","blob":"3749ba14502f251f1aa8008ff3c6d7bd70263538","bytes":10020,"sha256":"202b312452989d6bcda5fae18e64fa392880750ea9b3b498d19ca52366f28205"},"selftest":{"path":"docs/superpowers/source-lab/c2-t1-v2/synthetic-controls.mjs","blob":"b108562ad11b3af1dbe291fdcd3b55b0c22bc1d1","bytes":1672,"sha256":"b9feaefc6e3b15cd95b10c75fe55f44f50bb4c33ba8ae4a10c96c12e3e5b8665"}};
const SELECTION_HASHES=["7daaeb72f174744ecc11e234f899c75ed5a17daa1e820271e015bf179e9aac6b","ecb5037b4f3274c5afcab5bb2a7fdc4ca3795e450583db7b13e3eed98955d3f3","7b77711a74b39e7e4381dc66fa7044c31d532b9f52a118f5990df3c9246ed29e"];
let temp,phase='admission',frontier='launch',lastCapture=null,custodyContext=null,pendingReceipt=null,context=null,diagnosticCode="CAPTURE_INVALID",preflightOwned=false,preflightRemoved=false,checkedLaunches=0,checkedProcesses=0,custodyValid=true,ownRootVerified=false,ownTempRemoved=false;
function safeCapture(result){
 const output=value=>Buffer.isBuffer(value)?{bytes:value.length,sha256:sha(value)}:null;
 const errorCode=result?.error?.code;
 const errorKind=result?.error?({ENOENT:'spawn-enoent',EACCES:'spawn-eacces',EPERM:'spawn-eperm',ETIMEDOUT:'timeout',ENOBUFS:'buffer-limit'}[errorCode]??'spawn-other'):'none';
 const exitCode=Number.isInteger(result?.status)&&result.status>=0&&result.status<=255?result.status:null;
 const signal=result?.signal===null?'none':['SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE'].includes(result?.signal)?result.signal:typeof result?.signal==='string'?'other':'unavailable';
 return {exitCode,signal,errorKind,stdout:output(result?.stdout),stderr:output(result?.stderr)};
}
function diagnostic() {
 const frame={schema:'afw.c2-source-diagnostic.v2',context,phase,frontier,code:diagnosticCode,capture:lastCapture};
 const line='AFW_C2_SOURCE_DIAGNOSTIC_V2 '+JSON.stringify(frame)+'\n';
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
async function materialize(mode,index){
 const target=join(temp,mode);await mkdir(target);
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
 if(Date.now()>=end)failure();
 const before=await probeNames(target);
 const childEnv={PATH:hostEnv.PATH,HOME:temp,TMPDIR:temp,RUNNER_TEMP:temp,XDG_CACHE_HOME:join(temp,'cache'),XDG_CONFIG_HOME:join(temp,'config'),LANG:'C.UTF-8',LC_ALL:'C.UTF-8',CI:'true',NODE_ENV:'test',GITHUB_SHA:process.env.GITHUB_SHA,GITHUB_REPOSITORY:REPO,AFW_C2_DIAG_ROOT:target,AFW_C2_DIAG_PARENT_UID:String(uid),AFW_C2_DIAG_PARENT_GID:String(gid),...mode==='mutant-prefix'?{AFW_C2_T1_MUTANT:'prefix'}:{},...regression?{AFW_R2_GROUP:'components'}:{}};
 // Same verified ephemeral namespace/drop as diagnostic2; no ambient env or external interface.
 frontier='launch';lastCapture=null;const result=spawnSync('sudo',['-n','/usr/bin/env','-i',...Object.entries(childEnv).map(([key,value])=>key+'='+value),'unshare','--net','/bin/sh','-c','uid="$1"; gid="$2"; shift 2; ip link set lo up && exec /usr/bin/setpriv --reuid "$uid" --regid "$gid" --clear-groups --no-new-privs "$@"','c2-source',String(uid),String(gid),node,'--import',join(target,'c2-source-custody-guard.mjs'),...args],{cwd:workingDirectory,env:childEnv,encoding:null,maxBuffer:1048576,timeout:Math.max(1,Math.min(limit,end-Date.now())),stdio:['ignore','pipe','pipe']});lastCapture=safeCapture(result);
 const after=await probeNames(target),fresh=after.filter(n=>!before.includes(n));if(fresh.length<1||fresh.length>8||before.some(n=>!after.includes(n))||checkedLaunches>=6||checkedProcesses+fresh.length>24)failure();
 for(const name of after){const path=join(target,'custody-probes',name),stat=await lstat(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.uid!==uid||stat.gid!==gid||stat.size>1024)failure();const body=await readFile(path);if(body.length>1024||!custodyRecord(JSON.parse(body.toString('utf8'))))failure();}
 checkedLaunches++;checkedProcesses+=fresh.length;return result;
 }catch(error){custodyValid=false;throw error;}
}
try{
 if(process.argv.length!==2||process.version!=='v22.23.4'||!Number.isSafeInteger(uid)||uid<=0||!Number.isSafeInteger(gid)||gid<0||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_JOB!==JOB||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')||!process.env.RUNNER_TEMP||workspace!==resolve(process.env.GITHUB_WORKSPACE??'')||fileURLToPath(import.meta.url)!==join(workspace,LAB,'run-c2-source-lab-v2.mjs'))failure();
 if(textCommand(['rev-parse','HEAD'])!==process.env.GITHUB_SHA||textCommand(['rev-parse','HEAD^'])!==BASE||textCommand(['rev-parse',BASE+'^{tree}'])!==TREE||textCommand(['show','-s','--format=%B','HEAD'])!==MESSAGE)failure();
 const tree=textCommand(['rev-parse','HEAD^{tree}']);if(!/^[a-f0-9]{40}$/.test(tree))failure();
 const rawIndex=await readFile(join(workspace,PREFIX,'source-index.json'));if(rawIndex.length!==11467||blob(rawIndex)!=='f9f36a61875be344d38f19d77caf1a46c48e8f37'||sha(rawIndex)!==INDEX_HASH)failure();
 const index=JSON.parse(rawIndex);if(index.schema!=='afw.c2-source-index.v1'||index.context.repository!==REPO||index.context.baselineSource!==BASE||index.context.baselineTree!==TREE||index.context.status!=='SOURCE_TESTS_PENDING')failure();
 exact(index.entries.map(e=>e.path),ALLOWED);exact(index.caseMap,CASES);
 for(let i=0;i<index.entries.length;i++){const e=index.entries[i];if(e.dataPath!==PREFIX+'/body-'+String(i).padStart(2,'0')+'.txt'||e.role!==(e.path.startsWith('test/')?'test':'product')||e.fullReadback!==true)failure();}
 const manifestRaw=await readFile(join(workspace,PREFIX,'regression-selection.json')),manifest=JSON.parse(manifestRaw);
 if(manifestRaw.length!==index.regressionSelection.bytes||sha(manifestRaw)!==index.regressionSelection.bodyHash||sha(Buffer.from(JSON.stringify(manifest)))!==index.regressionSelection.selectionHash)failure();exact(manifest.selection,REGS);
 const lock=await readFile(join(workspace,'package-lock.json')),baseLock=command('git',['show',BASE+':package-lock.json']);if(!lock.equals(baseLock)||JSON.parse(lock).packages?.['node_modules/@cloudflare/workers-oauth-provider']?.version!=='1.2.1')failure();
 context={repository:REPO,baselineSource:BASE,baselineTree:TREE,proposalIndexHash:INDEX_HASH,head:process.env.GITHUB_SHA,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:JOB,node:process.version};
 custodyContext={head:context.head,runId:context.runId,runAttempt:1,job:JOB,proposalIndexHash:INDEX_HASH};
 const selections=JSON.parse(await checkedTool('selection')).modes;
 exact(selections.map(s=>sha(Buffer.from(JSON.stringify(s)))),SELECTION_HASHES);
 const vectors=JSON.parse(await checkedTool('vectors'));
 await checkedTool('parser');await checkedTool('selftest');
 const {observe,requireScopeOrder}=await import('./tap-protocol.mjs');
 const {runSyntheticControls}=await import('./synthetic-controls.mjs');
 phase='synthetic-controls';frontier='parser';diagnosticCode='SYNTHETIC_CONTROL_INVALID';
 const synthetic=runSyntheticControls(vectors,selections[0],SELECTION_HASHES[0]);
 emit('AFW_C2_SOURCE_SYNTHETIC_V2',{schema:'afw.c2-source-synthetic.v2',context,vectorsHash:TOOLING.vectors.sha256,...synthetic},2048);
 diagnosticCode='CAPTURE_INVALID';
 const root=resolve(process.env.RUNNER_TEMP);temp=await mkdtemp(join(root,'afw-c2-t1-'));if(!resolve(temp).startsWith(root+sep)||(await lstat(temp)).uid!==uid)failure();
 const observations=[];
 function retain(record) {
  emit('AFW_C2_SOURCE_MODE_V2',{schema:'afw.c2-source-mode.v2',context,observation:record},12288);
  if(record.verdict!=='qualified'){diagnosticCode=record.code;failure();}
  observations.push(record);
 }
 let greenTarget;
 for(const [position,selection] of selections.entries()){
  const mode=selection.mode;
  phase='materialize';frontier='launch';lastCapture=null;
  const target=await materialize(mode,index);
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
  if(mode==='proposal-green')greenTarget=target;
  phase=mode;
  const args=['--experimental-vm-modules','--test','--test-reporter=tap','--test-concurrency=1'];
  if(selection.pattern!==null)args.push('--test-name-pattern='+selection.pattern);
  args.push(selection.file);
  const child=await runSource(target,args,mode);
  frontier='parser';
  retain(observe(child,target,selection,SELECTION_HASHES[position],observations.find(o=>o.mode==='proposal-green')));
 }
 phase='regressions';
 const child=await runSource(greenTarget,manifest.command.arguments,'proposal-green',true);
 frontier='parser';
 retain(observe(child,greenTarget,{mode:'regressions',selected:REGS},index.regressionSelection.selectionHash,null));
 requireScopeOrder(observations.map(o=>o.mode));
 const nonclaims={historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
 const receipt={schema:'afw.c2-source-lab-receipt.v2',context,admitted:index.entries.map(e=>({path:e.path,sha256:e.after.sha256,bytes:e.after.bytes})),observations,nonclaims};
 pendingReceipt=JSON.stringify(receipt);if(Buffer.byteLength(pendingReceipt)>24576)failure();
}catch{diagnostic();process.exitCode=1;}
finally{if(temp){try{phase='cleanup';frontier='launch';lastCapture=null;diagnosticCode='CLEANUP_INVALID';const root=resolve(process.env.RUNNER_TEMP??'');ownRootVerified=resolve(temp).startsWith(root+sep)&&(await lstat(temp)).uid===uid;if(!ownRootVerified)failure();await rm(temp,{recursive:true,force:false});try{await lstat(temp);failure();}catch(error){if(error?.code!=='ENOENT')failure();}ownTempRemoved=true;}catch{diagnostic();process.exitCode=1;}}}
const custodyProof={schema:'afw.c2-source-custody.v2',context:custodyContext,parentNonRoot:Number.isSafeInteger(uid)&&uid>0,preflightOwned,preflightRemoved,checkedLaunches,checkedProcesses,uidGidGroupsLoopbackMatched:checkedLaunches>0&&custodyValid,ownRootVerified,ownTempRemoved};
const custodyOutput=JSON.stringify(custodyProof);if(Buffer.byteLength(custodyOutput)>1024)process.exitCode=1;else process.stdout.write('AFW_C2_SOURCE_CUSTODY_V2 '+custodyOutput+'\n');
const custodyQualified=Buffer.byteLength(custodyOutput)<=1024&&custodyContext!==null&&custodyProof.parentNonRoot&&preflightOwned&&preflightRemoved&&checkedLaunches===6&&checkedProcesses>=6&&checkedProcesses<=24&&custodyProof.uidGidGroupsLoopbackMatched&&ownRootVerified&&ownTempRemoved;
if(pendingReceipt&&custodyQualified&&!process.exitCode&&Date.now()<end){
 try{
  phase='publication';frontier='frames';diagnosticCode='PUBLICATION_INVALID';
  await mkdir(join(workspace,'output'),{recursive:true});
  await writeFile(join(workspace,'output','c2-source-lab-v2-receipt.json'),pendingReceipt+'\n',{flag:'wx'});
  process.stdout.write('AFW_C2_SOURCE_RECEIPT_V2 '+pendingReceipt+'\n');
 }catch{diagnostic();process.exitCode=1;}
}else{process.exitCode=1;}
