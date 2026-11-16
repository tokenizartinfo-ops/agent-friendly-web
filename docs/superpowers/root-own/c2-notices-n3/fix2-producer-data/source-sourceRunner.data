import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir,mkdtemp,symlink,rm,lstat,readdir,open} from 'node:fs/promises';
import {resolve,join,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',TREE='62e78926635d6b74f288d6c0d69e0f2516306989',REPO='tokenizartinfo-ops/agent-friendly-web';
const PREFIX='docs/superpowers/source-lab/c2-t1',INDEX_HASH="0681cadc774fcddf7a009e86e24b22fa879857af1e900f6143d23c2d7eaa9be7";
const CUSTODY_HELPERS={"guard":{"path":"docs/superpowers/source-lab/c2-t1/c2-source-custody-guard.mjs","bytes":1208,"sha256":"c21d600503bee20abfacc36779c846a34e46023d921ef6d6ceb697abcef50ebf"},"preflight":{"path":"docs/superpowers/source-lab/c2-t1/c2-source-custody-preflight.mjs","bytes":417,"sha256":"3e548a2dc9527e72997bf147dedcab1b8c34f49848ece68cff498991f200a9ae"}};
const BOOTSTRAP_DATA={"path":".github/workflows/afw-finite-qa-bootstrap.yml","blob":"22f324e480dbe0295fe23fb7415328cba7952b1b","bytes":1844,"sha256":"ff64a890db1b55f8ed922e036673ebaf0a494c4833023bbc3317f28c6ededd14","gitBlob":"22f324e480dbe0295fe23fb7415328cba7952b1b"};
const BOOTSTRAP_ABSENCE_PROGRAM="import {bootstrapWorld} from './test/fixtures/finite-bootstrap-world.mjs';\nimport {BOOTSTRAP} from './lib/mcp-qa-finite-bootstrap-record.mjs';\nlet status='fail',observation='UNEXPECTED_SUCCESS';\ntry{await bootstrapWorld();}\ncatch(error){if(error?.code==='ENOENT'&&error?.path===BOOTSTRAP.workflowPath){status='pass';observation='EXPECTED_ENOENT';}else observation='UNEXPECTED_ERROR';}\nprocess.stdout.write('AFW_C2_DEPENDENCY_CONTROL '+JSON.stringify({schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status,observation})+'\\n');\nif(status!=='pass')process.exitCode=1;\n";
import {constants as fsFlags} from 'node:fs';
const BRANCH='refs/heads/lab/afw-c2-source-20261116-t1-notices-n3',MESSAGE='AFW-C2-T1-NOTICES-N3-ONEUSE-20261116';
const ALLOWED=["lib/mcp-qa-finite-owner-phase-context.mjs","lib/mcp-qa-finite-owner-preparation.mjs","lib/mcp-qa-finite-owner-native-receiver.mjs","worker/mcp-own/finite.mjs","lib/mcp-qa-finite-owner-cleanup-scope.mjs","lib/mcp-qa-finite-owner-cleanup.mjs","lib/mcp-qa-finite-initial-cleanup.mjs","test/mcp-qa-finite-owner-three-stage-native.test.mjs","test/fixtures/finite-coupled-native.mjs","test/fixtures/finite-first-connection-publication.mjs","test/fixtures/finite-initial-entry-world.mjs","test/mcp-qa-finite-first-connection-publication-native.test.mjs","lib/mcp-qa-finite-owner-notice-get-forward.mjs"],ROOT_FILES=["package-lock.json","package.json","tsconfig.json","wrangler.a2a-canary.jsonc","wrangler.a2a-production.jsonc","wrangler.assistance-goal-context.jsonc","wrangler.assistance-goal-context.qa.jsonc","wrangler.assistance-supervision-producer.jsonc","wrangler.contact.jsonc","wrangler.delegated-canary.jsonc","wrangler.delegated-real-pilot.example.jsonc","wrangler.delegated-real-pilot.jsonc","wrangler.delegated.jsonc","wrangler.dossier-supervision-producer.jsonc","wrangler.independent-closure-qa.finite.jsonc","wrangler.independent-closure-qa.jsonc","wrangler.independent-closure-qa.rollback.jsonc","wrangler.mail-canary.jsonc","wrangler.mcp-own-events.example.jsonc","wrangler.mcp-own.finite.jsonc","wrangler.mcp.jsonc","wrangler.operations-manager.jsonc","wrangler.operations-producer.jsonc","wrangler.operations-review-qa.jsonc","wrangler.operations-review.jsonc","wrangler.operations-watchdog.jsonc","wrangler.operations.jsonc","wrangler.release-operator.jsonc"],CASES=[{"id":"C2T1_CONNECTION","phase":"connection"},{"id":"C2T1_OAUTH","phase":"oauth"},{"id":"C2T1_HANDLE","phase":"negative"},{"id":"C2T1_PROJECTREF","phase":"negative"},{"id":"C2T1_SUBJECT","phase":"negative"},{"id":"C2T1_PHASE_RENAME","phase":"negative"},{"id":"C2T1_SOURCE_BYTES","phase":"negative"},{"id":"C2T1_APPROVAL","phase":"negative"},{"id":"C2T1_PREDECESSOR","phase":"negative"},{"id":"C2T1_GRANT_REVOKED","phase":"negative"},{"id":"C2T1_EXTRA_KEY","phase":"negative"},{"id":"C2T1_NOTICES","phase":"notices"},{"id":"C2T1_MONITOR_COOKIE","phase":"monitor"},{"id":"C2T1_MONITOR","phase":"monitor"},{"id":"C2T1_SCOPE_MISSING","phase":"scope"},{"id":"C2T1_FINITE","phase":"finite"},{"id":"C2T1_SELECTION","phase":"selection"},{"id":"C2T1_LOST_ACK_DUPLICATE","phase":"negative"},{"id":"C2T1_UNRESOLVED_WRITER","phase":"negative"},{"id":"C2T1_OWN_PROMISE","phase":"negative"}];
const sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const failure=()=>{throw Error('CAPTURE_INVALID');};
const exact=(a,b)=>{if(JSON.stringify(a)!==JSON.stringify(b))failure();};
const enter=Date.now(),end=enter+330000,workspace=resolve(process.cwd()),node=process.execPath,uid=process.getuid?.(),gid=process.getgid?.();
const hostEnv={PATH:dirname(node)+':/usr/bin:/bin:/usr/sbin:/sbin',HOME:resolve(process.env.RUNNER_TEMP??''),LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
const LAB='docs/superpowers/source-lab/c2-t1-notices-n3',JOB='c2-notices-n3';
const TOOLING={"selection":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/selection.json","bytes":2048,"blob":"3db514b655917bd05917a90a53cb69667041fd36","sha256":"ea902f464b5530f3b7894c259ec7ed5420e01a87eecfe8b49c46d175d4d59324"},"contract":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/diagnostic-contract.json","bytes":19539,"blob":"40e93f21d6564e2a0bbe9a4ace266d992a357718","sha256":"d8260b4e7280d36416e6a1731fcc8135e381684508d22b7d0d9ad258dfb9f886"},"schema":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/diagnostic-schema.json","bytes":29785,"blob":"1c336fe190816b46223546971afcf34b2c216089","sha256":"2e44cb86b98dd052a643b0d1ee157a7d072ddf2185895893067770758089e6eb"},"seams":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/seams.json","bytes":14141,"blob":"ac4b57435939d0d4c6c2d2d03086bc7ffd4d6640","sha256":"d6e41eaf3f811a82eeb38f97f1c7e5aa0ab1ae081616e5b221e75ac09720e3b5"},"vectors":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/synthetic-vectors.json","bytes":915177,"blob":"ce6aa394580a0c26e5fe5c9006cafe06db109530","sha256":"dcd3c592e568e046a837873609cdecd11dddf2d9bf5271788df2710f18db0cdf"},"driver":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/observer-driver.txt","bytes":1812,"blob":"2bcfa9b4adc14bfe268ba7a10a1321651e76f95b","sha256":"88137ed32bf1e657be72820529afde0ea1f1c791763e99cdded7da3d0d4f682d"},"coupled":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/observer-coupled.txt","bytes":19642,"blob":"3c9081cb2a04759bbe58ef317ea9db4753ce4235","sha256":"a85e1c33412e05095ce56dce7553165f36c0235809e20acd0df3180fd4917764"},"world":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/observer-world.txt","bytes":89873,"blob":"a21a3614f0cd6b21ce37b99690043507ea105a23","sha256":"7dc4442f09b8ced3a317237a3d9c746d4bc2082f097207907db519455c1849b9"},"helper":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-helper.mjs","bytes":5764,"blob":"bff0415fbbf37c787439d4c526b1c77c8fdf2a65","sha256":"69386a941f9f565bfffd9846f9b8ec504b2e1c446075b72c368a8d68aaf17eb6"},"reader":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-reader.mjs","bytes":31798,"blob":"83b62b4dc84bdde7b1c7d343b328a3e3f09c0626","sha256":"bdb227d557e058da7c7df3f5d7c2ff04663afaa09714c479a8f7e810634cd4c5"},"logger":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-logger.mjs","bytes":8370,"blob":"4eeaad011444e566f2e0cc99bd897e4a01848a77","sha256":"e2fe1fd58cfe5c1959643c80a2efe6c3fa43982bde7b2da2b5ef06612e1fe6d3"},"slot":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-slot.mjs","bytes":2072,"blob":"6507ca2410ac27606f4996e97a91736c5e14b615","sha256":"d4a82b40841cc9277f3cdd1c1355f95fcd4e00cc283fa73d54266c08f982247a"},"ledger":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-qa-ledger.mjs","bytes":16602,"blob":"d9d3a0af3b6f1e6738957f703e368f19852cdce8","sha256":"b23473dd06df58cd7390207f5ba5a8100992957092711b57a52b0930b59d0bf1"},"compiler":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-qa-compiler.mjs","bytes":12694,"blob":"94e30c896056dc35b3bb75b072022644c68bfb74","sha256":"624ef2a8507643936aa9564bb0f978b11e31572b49c5678a6e6c4706af9ea255"},"coreControls":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-core-controls.mjs","bytes":13179,"blob":"ef73fa56b9b6dd9acacffbe25522f9e0e7ad2542","sha256":"fa77a9c7509d8645e78e913181a27fc4e556fd2f0e07dbf377b2965960371b95"},"traceReader":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-trace-reader.mjs","bytes":11567,"blob":"4878edb13dad6a9421c457cc850a370d75b84b1c","sha256":"e4d7ca27660a979dcfc018f0585bdd0ae647e158c0792d0e49f72666580f1829"},"traceControls":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/n3-trace-controls.mjs","bytes":854,"blob":"adff3fbc4649f95389b03896ff82bc7ed538c516","sha256":"ae170334b83432764f36e8ead26159207c3324f62b8d0c3ce46232795836f758"},"manifest":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/producer-manifest.json","bytes":1334,"blob":"75e0a0f52287e6b1eed46a821621e3a85e55d1a0","sha256":"27f9b289888ba4155fcaca9739f0b074aeda7e781c7796a1e8e83501fcf79a5e"},"compilationVectors":{"path":"docs/superpowers/source-lab/c2-t1-notices-n3/compilation-vectors.json","bytes":53497,"blob":"eb32ae05bc86ae943f155e36baa89844fceb8005","sha256":"57b3f91bc5fb0102d8b8b9233ecac106138642535f0cd519c1a588cf02a0fa51"}};
const MANIFEST_HASH='44a2527e1a54cb79a6feec9a04a996ad1b288a35117763e2037c7e8d64cf18f8';
const SELECTION_HASH='fa42fdb50fd0b3a04e1cdfe903a8de56bdb0ddf4e51cbbd5f570895a6bfcff8c';
let temp,phase='admission',frontier='launch',lastCapture=null,custodyContext=null,pendingOutcome=null,pendingCompilation=null,context=null,diagnosticCode="CAPTURE_INVALID",preflightOwned=false,preflightRemoved=false,checkedLaunches=0,checkedProcesses=0,custodyValid=true,ownRootVerified=false,ownTempRemoved=false;
function safeCapture(result){
 const output=value=>Buffer.isBuffer(value)?{bytes:value.length,sha256:sha(value)}:null;
 const errorCode=result?.error?.code;
 const errorKind=result?.error?({ENOENT:'spawn-enoent',EACCES:'spawn-eacces',EPERM:'spawn-eperm',ETIMEDOUT:'timeout',ENOBUFS:'buffer-limit'}[errorCode]??'spawn-other'):'none';
 const exitCode=Number.isInteger(result?.status)&&result.status>=0&&result.status<=255?result.status:null;
 const signal=result?.signal===null?'none':['SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE'].includes(result?.signal)?result.signal:typeof result?.signal==='string'?'other':'unavailable';
 return {exitCode,signal,errorKind,stdout:output(result?.stdout),stderr:output(result?.stderr)};
}
function diagnostic() {
 const frame={schema:'afw.c2-notices-n3.frontier.v1',context,phase,frontier,code:diagnosticCode,capture:lastCapture};
 const line='AFW_C2_NOTICES_N3_FRONTIER '+JSON.stringify(frame)+'\n';
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
  await mkdir(dirname(file),{recursive:true});await writeFile(file,admitted,{flag:entry.before?'w':'wx'});const actual=await readFile(file);if(actual.length!==entry.after.bytes||blob(actual)!==entry.after.blob||sha(actual)!==entry.after.sha256)failure();
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
 const childEnv={PATH:hostEnv.PATH,HOME:temp,TMPDIR:temp,RUNNER_TEMP:temp,XDG_CACHE_HOME:join(temp,'cache'),XDG_CONFIG_HOME:join(temp,'config'),LANG:'C.UTF-8',LC_ALL:'C.UTF-8',CI:'true',NODE_ENV:'test',GITHUB_SHA:process.env.GITHUB_SHA,GITHUB_REPOSITORY:REPO,AFW_N3_INDEX_HASH:INDEX_HASH,AFW_N3_DRIVER_HASH:TOOLING.driver.sha256,AFW_N3_SELECTION_HASH:SELECTION_HASH,AFW_N3_HELPER_HASH:TOOLING.helper.sha256,AFW_N3_READER_HASH:TOOLING.reader.sha256,AFW_N3_SLOT_HASH:TOOLING.slot.sha256,AFW_N3_LOGGER_HASH:TOOLING.logger.sha256,AFW_N3_WORLD_HASH:TOOLING.world.sha256,AFW_N3_LEDGER_HASH:TOOLING.ledger.sha256,AFW_N3_TRANSFORM_HASH:TOOLING.compiler.sha256,AFW_N3_MANIFEST_HASH:MANIFEST_HASH,AFW_C2_DIAG_ROOT:target,AFW_C2_DIAG_PARENT_UID:String(uid),AFW_C2_DIAG_PARENT_GID:String(gid)};
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
function validateCompilation(raw,records,ledger){
 const keys=(v,k)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===k.length&&Object.keys(v).every((x,i)=>x===k[i]);
 const desc=v=>keys(v,['bytes','sha256'])&&Number.isSafeInteger(v.bytes)&&v.bytes>=0&&v.bytes<=33554432&&typeof v.sha256==='string'&&/^[a-f0-9]{64}$/.test(v.sha256);
 const same=(a,b)=>desc(a)&&desc(b)&&a.bytes===b.bytes&&a.sha256===b.sha256;
 if(!Buffer.isBuffer(raw)||raw.length>8192||!Array.isArray(records)||records.length>128||!desc(ledger))failure();
 let text,value;try{text=new TextDecoder('utf-8',{fatal:true}).decode(raw);value=JSON.parse(text);}catch{failure();}
 if(JSON.stringify(value)+'\n'!==text||!keys(value,['M','QA'])||!desc(value.M)||!keys(value.QA,['bytes','sha256','deliberatelyChanged','inputManifestHash','inputs']))failure();
 const qa=value.QA,qaDesc={bytes:qa.bytes,sha256:qa.sha256};
 if(!desc(qaDesc)||qa.deliberatelyChanged!==true||typeof qa.inputManifestHash!=='string'||!/^[a-f0-9]{64}$/.test(qa.inputManifestHash)||!Array.isArray(qa.inputs)||qa.inputs.length!==5)failure();
 const order=['ledger','PH','OP','LEASE','STDIN'];
 for(let i=0;i<5;i++){
  const row=qa.inputs[i];
  if(!keys(row,['id','before','after'])||row.id!==order[i]||!desc(row.after)||(i===0?row.before!==null:!desc(row.before)||row.before.sha256===row.after.sha256))failure();
 }
 if(!same(qa.inputs[0].after,ledger)||sha(Buffer.from(JSON.stringify(qa.inputs)))!==qa.inputManifestHash)failure();
 const prepared=new Map(),returned=new Set();
 for(const r of records){
  if(r.kind!=='host-proof')continue;
  if(r.stage==='constructor'){
   if(r.M!==null||r.QA!==null||r.compiledMatch!==null)failure();
   continue;
  }
  if(!['assembly','mount','adopt'].includes(r.stage)||!['prepared','returned'].includes(r.edge)||!Number.isSafeInteger(r.call)||r.call<2||r.call>5||r.settingsEqual!==true||r.callbackSame!==true||r.referencesSame!==true||r.compiledMatch!==true||!same(r.M,value.M)||!same(r.QA,qaDesc))failure();
  if(r.edge==='prepared'){if(prepared.has(r.call))failure();prepared.set(r.call,r.stage);}
  else{if(prepared.get(r.call)!==r.stage||returned.has(r.call))failure();returned.add(r.call);}
 }
 if(prepared.get(2)!=='assembly'||!returned.has(2))failure();
 return {M:{bytes:value.M.bytes,sha256:value.M.sha256,argumentMatched:true},QA:qa};
}
async function readCompilation(target,records){
 const handle=await open(join(target,'n3-compilation.json'),fsFlags.O_RDONLY|fsFlags.O_NOFOLLOW);
 try{
  const before=await handle.stat();if(!owned(before)||before.size>8192)failure();
  const bytes=Buffer.alloc(before.size),result=await handle.read(bytes,0,bytes.length,0),after=await handle.stat();
  if(result.bytesRead!==before.size||!owned(after)||after.ino!==before.ino||after.dev!==before.dev||after.size!==before.size||after.mtimeMs!==before.mtimeMs||after.ctimeMs!==before.ctimeMs)failure();
  return validateCompilation(bytes,records,{bytes:TOOLING.ledger.bytes,sha256:TOOLING.ledger.sha256});
 }finally{await handle.close();}
}

try{
 if(process.argv.length!==2||process.version!=='v22.23.4'||!Number.isSafeInteger(uid)||uid<=0||!Number.isSafeInteger(gid)||gid<0||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_JOB!==JOB||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')||!process.env.RUNNER_TEMP||workspace!==resolve(process.env.GITHUB_WORKSPACE??'')||fileURLToPath(import.meta.url)!==join(workspace,LAB,'run-c2-notices-n3.mjs'))failure();
 if(textCommand(['rev-parse','HEAD'])!==process.env.GITHUB_SHA||textCommand(['rev-parse','HEAD^'])!==BASE||textCommand(['rev-parse',BASE+'^{tree}'])!==TREE||textCommand(['show','-s','--format=%B','HEAD'])!==MESSAGE)failure();
 const tree=textCommand(['rev-parse','HEAD^{tree}']);if(!/^[a-f0-9]{40}$/.test(tree))failure();
 const rawIndex=await readFile(join(workspace,PREFIX,'source-index.json'));if(rawIndex.length!==11467||blob(rawIndex)!=='26b62b5ce8f413b6f7fd146e03b8f8cdcf6995ac'||sha(rawIndex)!==INDEX_HASH)failure();
 const index=JSON.parse(rawIndex);if(index.schema!=='afw.c2-source-index.v1'||index.context.repository!==REPO||index.context.baselineSource!==BASE||index.context.baselineTree!==TREE||index.context.status!=='SOURCE_TESTS_PENDING')failure();
 exact(index.entries.map(e=>e.path),ALLOWED);exact(index.caseMap,CASES);
 for(let i=0;i<index.entries.length;i++){const e=index.entries[i];if(e.dataPath!==PREFIX+'/body-'+String(i).padStart(2,'0')+'.txt'||e.role!==(e.path.startsWith('test/')?'test':'product')||e.fullReadback!==true)failure();}
 const lock=await readFile(join(workspace,'package-lock.json')),baseLock=command('git',['show',BASE+':package-lock.json']);if(!lock.equals(baseLock)||JSON.parse(lock).packages?.['node_modules/@cloudflare/workers-oauth-provider']?.version!=='1.2.1'||JSON.parse(lock).packages?.['node_modules/miniflare']?.version!=='5.20260831.0-alpha'||JSON.parse(lock).packages?.['node_modules/workerd']?.version!=='1.20260831.1')failure();
 context={repository:REPO,baselineSource:BASE,baselineTree:TREE,proposalIndexHash:INDEX_HASH,head:process.env.GITHUB_SHA,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:JOB,node:process.version};
 custodyContext={head:context.head,runId:context.runId,runAttempt:1,job:JOB,proposalIndexHash:INDEX_HASH};
 const selection=JSON.parse(await checkedTool('selection'));
 if(sha(Buffer.from(JSON.stringify(selection)))!==SELECTION_HASH||selection.normalSourceIndexHash!==INDEX_HASH||selection.file!=='test/mcp-qa-finite-owner-three-stage-native.test.mjs')failure();
 exact(selection.ids,['N3_CONNECTION','N3_OAUTH','N3_PHASE','N3_NOTICES']);
 for(const role of Object.keys(TOOLING))await checkedTool(role);
 const manifest=JSON.parse(await checkedTool('manifest'));
 exact(Object.keys(manifest),['schema','normalSourceIndexHash','selectionHash','contractHash','schemaHash','seamsHash','vectorsHash','driverHash','coupledHash','worldHash','helperHash','readerHash','loggerHash','slotHash','ledgerHash','transformHash']);
 if(sha(Buffer.from(JSON.stringify(manifest)))!==MANIFEST_HASH||manifest.schema!=='afw.c2-notices-n3.producer-manifest.v1'||manifest.normalSourceIndexHash!==INDEX_HASH||manifest.selectionHash!==SELECTION_HASH)failure();
 for(const [key,role]of [['contractHash','contract'],['schemaHash','schema'],['seamsHash','seams'],['vectorsHash','vectors'],['driverHash','driver'],['coupledHash','coupled'],['worldHash','world'],['helperHash','helper'],['readerHash','reader'],['loggerHash','logger'],['slotHash','slot'],['ledgerHash','ledger'],['transformHash','compiler']])if(manifest[key]!==TOOLING[role].sha256)failure();
 const {readObservation,parseNative,nativeJoin,safeWitness,verifyWitness}=await import('./n3-reader.mjs');
 const {runControls}=await import('./n3-core-controls.mjs');
 const {runTraceControls}=await import('./n3-trace-controls.mjs');
 phase='synthetic-controls';frontier='parser';diagnosticCode='SYNTHETIC_CONTROL_INVALID';
 const vectorData=JSON.parse(await checkedTool('vectors')),synthetic=await runControls(vectorData.core),causal=runTraceControls(vectorData.causal);
 if(causal.accepted!==31||causal.rejected!==32)failure();
 const compilationVectors=JSON.parse(await checkedTool('compilationVectors'));
 if(compilationVectors.cases.length!==15)failure();
 for(const c of compilationVectors.cases){let accepted=false;try{validateCompilation(Buffer.from(c.input.raw),c.input.hostRecords,c.input.ledger);accepted=true;}catch{}if(accepted!==c.expected)failure();}
 if(synthetic.accepted!==6||synthetic.rejected!==21||synthetic.probeChecks!==3||synthetic.roundtrips!==6||synthetic.witnessRejected!==2||synthetic.slotChecks!==5||synthetic.guardAccepted!==3||synthetic.guardRejected!==7||synthetic.guardTransitions!==6||synthetic.invarianceChecks!==10||synthetic.guardRecordRejected!==12)failure();
 const controls={...synthetic,vectorsHash:TOOLING.vectors.sha256,causal};
 emit('AFW_C2_NOTICES_N3_SYNTHETIC',{schema:'afw.c2-notices-n3.synthetic.v1',context,selectionHash:SELECTION_HASH,...controls},2048);
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

 phase='notices-observer';frontier='overlays';
 // All frozen normal13 verified first. Node S07/S08/S10 overlays compose the reviewed QA-only compiler/ledger; M/normal libraries remain untouched on disk.
 const overlays=[
  {role:'driver',path:selection.file,sourceIndex:7},
  {role:'coupled',path:'test/fixtures/finite-coupled-native.mjs',sourceIndex:8},
  {role:'world',path:'test/fixtures/finite-initial-entry-world.mjs',sourceIndex:10}
 ];
 for(const overlay of overlays){
  const path=join(target,overlay.path),before=await readFile(path),admitted=index.entries[overlay.sourceIndex].after;
  if(blob(before)!==admitted.blob||sha(before)!==admitted.sha256)failure();
  const body=await checkedTool(overlay.role);await writeFile(path,body,{flag:'w'});if(blob(await readFile(path))!==TOOLING[overlay.role].blob)failure();
 }
 for(const [role,path]of [['reader','test/n3-reader.mjs'],['slot','test/n3-slot.mjs'],['helper','test/n3-helper.mjs'],['logger','test/n3-logger.mjs'],['ledger','test/fixtures/n3-qa-causal-ledger.mjs'],['compiler','test/fixtures/n3-qa-compiler.mjs']]){
  const body=await checkedTool(role);await writeFile(join(target,path),body,{flag:'wx'});if(blob(await readFile(join(target,path)))!==TOOLING[role].blob)failure();
 }
 const path=join(target,'n3-progress.ndjson');
 const fresh=await open(path,fsFlags.O_CREAT|fsFlags.O_EXCL|fsFlags.O_WRONLY|fsFlags.O_NOFOLLOW,0o600);let initial;
 try{initial=await fresh.stat();if(!owned(initial)||initial.size!==0)failure();}finally{await fresh.close();}
 const child=await runSource(target,['--experimental-vm-modules','--test','--test-reporter=tap','--test-concurrency=1','--test-name-pattern='+selection.pattern,selection.file]);
 if(!Buffer.isBuffer(child.stdout)||child.stdout.length>1048576||!Buffer.isBuffer(child.stderr)||child.stderr.length>65536)failure();
 const capture=lastCapture;frontier='journal';const journal=await readJournal(path,initial);
 const flagged=[child.stdout,child.stderr].some(bytes=>Buffer.isBuffer(bytes)&&/^(?:# )?AFW_C2_N3_RECORDER_FAULT$/m.test(bytes.toString('utf8')));
 const binding={sourceIndexHash:INDEX_HASH,driverHash:TOOLING.driver.sha256,selectionHash:SELECTION_HASH,helperHash:TOOLING.helper.sha256,readerHash:TOOLING.reader.sha256,slotHash:TOOLING.slot.sha256,loggerHash:TOOLING.logger.sha256,worldHash:TOOLING.world.sha256,ledgerHash:TOOLING.ledger.sha256,transformHash:TOOLING.compiler.sha256,producerManifestHash:MANIFEST_HASH},condition=capture.errorKind==='timeout'?'timeout':'normal';
 const observation=readObservation(journal.bytes,binding,condition,flagged||!journal.stable),native=parseNative(child.stdout);
 if(!nativeJoin(observation,native)){observation.valid=false;observation.code='NATIVE_INVALID';observation.integrity='unknown';}
 const witness=safeWitness(journal.bytes,binding,condition,flagged||!journal.stable);
 if(!verifyWitness(witness)||observation.valid&&(witness.prefixBytes!==journal.bytes.length||witness.prefixSha256!==sha(journal.bytes)))failure();
 pendingCompilation=await readCompilation(target,witness.records);
 const bindings={driverHash:TOOLING.driver.sha256,helperHash:TOOLING.helper.sha256,readerHash:TOOLING.reader.sha256,slotHash:TOOLING.slot.sha256,fixtureHash:TOOLING.coupled.sha256,vectorsHash:TOOLING.vectors.sha256,loggerHash:TOOLING.logger.sha256,worldHash:TOOLING.world.sha256,ledgerHash:TOOLING.ledger.sha256,transformHash:TOOLING.compiler.sha256,producerManifestHash:MANIFEST_HASH};
 pendingOutcome={selectionHash:SELECTION_HASH,bindings,controls,capture,journal:{bytes:journal.bytes.length,sha256:sha(journal.bytes),stable:journal.stable,recorderFaultObserved:flagged,witness},observation,native};

}catch{diagnostic();process.exitCode=1;}
finally{if(temp){try{phase='cleanup';frontier='launch';lastCapture=null;diagnosticCode='CLEANUP_INVALID';const root=resolve(process.env.RUNNER_TEMP??'');ownRootVerified=resolve(temp).startsWith(root+sep)&&(await lstat(temp)).uid===uid;if(!ownRootVerified)failure();await rm(temp,{recursive:true,force:false});try{await lstat(temp);failure();}catch(error){if(error?.code!=='ENOENT')failure();}ownTempRemoved=true;}catch{diagnostic();process.exitCode=1;}}}
const custodyProof={schema:'afw.c2-notices-n3.custody.v1',context:custodyContext,parentNonRoot:Number.isSafeInteger(uid)&&uid>0,preflightOwned,preflightRemoved,checkedLaunches,checkedProcesses,uidGidGroupsLoopbackMatched:checkedLaunches>0&&custodyValid,ownRootVerified,ownTempRemoved};
const custodyOutput=JSON.stringify(custodyProof);if(Buffer.byteLength(custodyOutput)>1024)process.exitCode=1;else process.stdout.write('AFW_C2_NOTICES_N3_CUSTODY '+custodyOutput+'\n');
const custodyQualified=Buffer.byteLength(custodyOutput)<=1024&&custodyContext!==null&&custodyProof.parentNonRoot&&preflightOwned&&preflightRemoved&&checkedLaunches===3&&checkedProcesses>=3&&checkedProcesses<=24&&custodyProof.uidGidGroupsLoopbackMatched&&ownRootVerified&&ownTempRemoved;

if(pendingOutcome&&custodyQualified&&!process.exitCode&&Date.now()<end){
 try{
  phase='publication';frontier='frames';diagnosticCode='PUBLICATION_INVALID';
  const outcome={schema:'afw.c2-notices-n3.observation.v1',context,...pendingOutcome,custody:custodyProof,compilation:pendingCompilation,diagnosticToolingExecuted:true,sourceBusinessExecuted:true,
   SourceQualified:false,Task1Pass:false,nonclaims:{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}};
  const bytes=JSON.stringify(outcome);
  if(Buffer.byteLength(bytes+'\n')>24576){diagnosticCode='OUTCOME_LIMIT';failure();}
  await mkdir(join(workspace,'output'),{recursive:true});
  await writeFile(join(workspace,'output','c2-notices-n3.json'),bytes+'\n',{flag:'wx'});
  process.stdout.write('AFW_C2_NOTICES_N3_OUTCOME '+bytes+'\n');
  const capture=pendingOutcome.capture;
  if(!pendingOutcome.observation.valid||pendingOutcome.native.integrity==='unknown'||!(capture.errorKind==='timeout'||(capture.errorKind==='none'&&capture.signal==='none'&&[0,1].includes(capture.exitCode))))process.exitCode=1;
 }catch{diagnostic();process.exitCode=1;}
}else{process.exitCode=1;}
