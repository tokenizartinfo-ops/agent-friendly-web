import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir,mkdtemp,symlink,rm,lstat,readdir} from 'node:fs/promises';
import {join,resolve,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const REPO='tokenizartinfo-ops/agent-friendly-web',BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',TREE='62e78926635d6b74f288d6c0d69e0f2516306989';
const SOURCE_INDEX_HASH='71ca47bfd1f793f7ac6a4738fb6431e20a23dd95a06d3c67728a894f929ed26b',DATA='docs/superpowers/source-lab/c2-t1',DIAG='docs/superpowers/source-lab/c2-t1-oauth-diag1';
const REF='refs/heads/lab/afw-c2-source-20261116-t1-oauth-diag1',MESSAGE='AFW-C2-OWNER-STAGES-OAUTH-DIAGNOSTIC-ONEUSE-20261116',JOB='c2-oauth-diagnostic';
const HELPERS={"guard":{"path":"docs/superpowers/source-lab/c2-t1-oauth-diag1/oauth-custody-guard.mjs","bytes":1283,"sha256":"13d77562658316ebc7d9b29bfc4063977b310751ae2fd3e7c08880fd884e530f"},"reporter":{"path":"docs/superpowers/source-lab/c2-t1-oauth-diag1/oauth-event-reporter.mjs","bytes":5111,"sha256":"f25e0791f6e29126dc7e9f65575e38e520713c8d68f2d1e3ad8b2b9476d0cdaf"},"preflight":{"path":"docs/superpowers/source-lab/c2-t1-oauth-diag1/oauth-custody-preflight.mjs","bytes":417,"sha256":"3e548a2dc9527e72997bf147dedcab1b8c34f49848ece68cff498991f200a9ae"}},WHITELIST=[{"fileId":"S00","path":"lib/mcp-qa-finite-owner-phase-context.mjs"},{"fileId":"S01","path":"lib/mcp-qa-finite-owner-preparation.mjs"},{"fileId":"S02","path":"lib/mcp-qa-finite-owner-native-receiver.mjs"},{"fileId":"S03","path":"worker/mcp-own/finite.mjs"},{"fileId":"S04","path":"lib/mcp-qa-finite-owner-cleanup-scope.mjs"},{"fileId":"S05","path":"lib/mcp-qa-finite-owner-cleanup.mjs"},{"fileId":"S06","path":"lib/mcp-qa-finite-initial-cleanup.mjs"},{"fileId":"S07","path":"test/mcp-qa-finite-owner-three-stage-native.test.mjs"},{"fileId":"S08","path":"test/fixtures/finite-coupled-native.mjs"},{"fileId":"S09","path":"test/fixtures/finite-first-connection-publication.mjs"},{"fileId":"S10","path":"test/fixtures/finite-initial-entry-world.mjs"},{"fileId":"S11","path":"test/mcp-qa-finite-first-connection-publication-native.test.mjs"},{"fileId":"S12","path":"lib/mcp-qa-finite-owner-notice-get-forward.mjs"}],ROOT_FILES=["package-lock.json","package.json","tsconfig.json","wrangler.a2a-canary.jsonc","wrangler.a2a-production.jsonc","wrangler.assistance-goal-context.jsonc","wrangler.assistance-goal-context.qa.jsonc","wrangler.assistance-supervision-producer.jsonc","wrangler.contact.jsonc","wrangler.delegated-canary.jsonc","wrangler.delegated-real-pilot.example.jsonc","wrangler.delegated-real-pilot.jsonc","wrangler.delegated.jsonc","wrangler.dossier-supervision-producer.jsonc","wrangler.independent-closure-qa.finite.jsonc","wrangler.independent-closure-qa.jsonc","wrangler.independent-closure-qa.rollback.jsonc","wrangler.mail-canary.jsonc","wrangler.mcp-own-events.example.jsonc","wrangler.mcp-own.finite.jsonc","wrangler.mcp.jsonc","wrangler.operations-manager.jsonc","wrangler.operations-producer.jsonc","wrangler.operations-review-qa.jsonc","wrangler.operations-review.jsonc","wrangler.operations-watchdog.jsonc","wrangler.operations.jsonc","wrangler.release-operator.jsonc"];
const BOOTSTRAP={path:'.github/workflows/afw-finite-qa-bootstrap.yml',blob:'22f324e480dbe0295fe23fb7415328cba7952b1b',bytes:1844,sha256:'ff64a890db1b55f8ed922e036673ebaf0a494c4833023bbc3317f28c6ededd14'};
const IDS=['C2T1_CONNECTION','C2T1_OAUTH'],PATTERN='^(C2T1_CONNECTION|C2T1_OAUTH)$';
const nonclaims={historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
const sha=v=>createHash('sha256').update(v).digest('hex'),blob=v=>createHash('sha1').update(Buffer.from('blob '+v.length+'\0')).update(v).digest('hex');
const fail=()=>{throw Error('C2_OAUTH_DIAGNOSTIC_INVALID');};
const uid=process.getuid?.(),gid=process.getgid?.(),workspace=resolve(process.cwd()),node=process.execPath,end=Date.now()+330000;
const env={PATH:dirname(node)+':/usr/bin:/bin:/usr/sbin:/sbin',HOME:resolve(process.env.RUNNER_TEMP??''),LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
let temp,target,phase='admission',context=null,capture=null,cases=[],auxiliary=[],custodyRecords=[],protocolValid=true,preflightOwned=false,preflightRemoved=false,custodyFilesOwned=false,preflightSeen=false,preflightCapture=null,cleanup={attempted:false,ownRootVerified:false,success:false,errorKind:null};
function command(executable,args,max=1048576,input=undefined){
 const r=spawnSync(executable,args,{cwd:workspace,env,input,encoding:null,maxBuffer:max,timeout:Math.max(1,Math.min(30000,end-Date.now())),stdio:[input===undefined?'ignore':'pipe','pipe','pipe']});
 if(r.error||r.signal||r.status!==0||!Buffer.isBuffer(r.stdout)||!Buffer.isBuffer(r.stderr)||r.stderr.length>65536)fail();return r.stdout;
}
const git=args=>new TextDecoder('utf-8',{fatal:true}).decode(command('git',args)).trim();
function captureOf(result){
 const bytes=v=>Buffer.isBuffer(v)?{bytes:v.length,sha256:sha(v)}:null;
 return {exitCode:Number.isInteger(result?.status)&&result.status>=0&&result.status<=255?result.status:null,signal:result?.signal===null?'none':['SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE'].includes(result?.signal)?result.signal:'other',errorKind:result?.error?({ETIMEDOUT:'timeout',ENOBUFS:'buffer-limit',ENOENT:'spawn-enoent',EACCES:'spawn-eacces',EPERM:'spawn-eperm'}[result.error.code]??'spawn-other'):'none',complete:Boolean(result)&&Number.isInteger(result.status)&&!result.error&&!result.signal,stdout:bytes(result?.stdout),stderr:bytes(result?.stderr)};
}
function launch(args,limit){
 const childEnv={PATH:env.PATH,HOME:temp,TMPDIR:temp,RUNNER_TEMP:temp,XDG_CACHE_HOME:join(temp,'cache'),XDG_CONFIG_HOME:join(temp,'config'),LANG:'C.UTF-8',LC_ALL:'C.UTF-8',CI:'true',NODE_ENV:'test',GITHUB_SHA:context.head,GITHUB_REPOSITORY:REPO,AFW_C2_DIAG_ROOT:target,AFW_C2_DIAG_PARENT_UID:String(uid),AFW_C2_DIAG_PARENT_GID:String(gid)};
 // Only this ephemeral child changes credentials. No sudo -E, account/group/policy mutation or external interface.
 return spawnSync('sudo',['-n','/usr/bin/env','-i',...Object.entries(childEnv).map(([k,v])=>k+'='+v),'unshare','--net','/bin/sh','-c','uid="$1"; gid="$2"; shift 2; ip link set lo up && exec /usr/bin/setpriv --reuid "$uid" --regid "$gid" --clear-groups --no-new-privs "$@"','c2-oauth-diagnostic',String(uid),String(gid),node,'--import',join(target,'oauth-custody-guard.mjs'),...args],{cwd:target,env:childEnv,encoding:null,maxBuffer:1048576,timeout:Math.max(1,Math.min(limit,end-Date.now())),stdio:['ignore','pipe','pipe']});
}
function custody(value){
 return value&&Object.keys(value).join(',')==='schema,uidMatches,gidMatches,groupsCleared,loopbackOnly'&&value.schema==='afw.c2-oauth-custody.v1'&&['uidMatches','gidMatches','groupsCleared','loopbackOnly'].every(k=>value[k]===true);
}
function position(p){return p===null||p&&Object.keys(p).join(',')==='fileId,line,column'&&WHITELIST.some(w=>w.fileId===p.fileId)&&Number.isSafeInteger(p.line)&&p.line>0&&p.line<=5000&&Number.isSafeInteger(p.column)&&p.column>0&&p.column<=16384;}
function event(value){
 if(!value||Object.keys(value).join(',')!=='schema,id,status,casePhase,skip,todo,definition,error,sanitized'||value.schema!=='afw.c2-oauth-event.v1'||value.id!==null&&!IDS.includes(value.id)||!['pass','fail'].includes(value.status)||!['connection','oauth',null].includes(value.casePhase)||typeof value.skip!=='boolean'||typeof value.todo!=='boolean'||typeof value.sanitized!=='boolean'||!position(value.definition))return false;
 if(value.id&&value.casePhase!==(value.id==='C2T1_CONNECTION'?'connection':'oauth'))return false;
 const e=value.error;if(e===null)return true;
 return Object.keys(e).join(',')==='kind,code,position,sitePhase,httpActual,httpExpected,booleanActual,booleanExpected'&&['Error','TypeError','AssertionError','SyntaxError','RangeError','AbortError','other','unavailable'].includes(e.kind)&&[null,'ERR_ASSERTION','ERR_TEST_FAILURE','ENOENT','EACCES','EPERM','ERR_MODULE_NOT_FOUND','ETIMEDOUT','ERR_INVALID_ARG_TYPE','ERR_STREAM_PREMATURE_CLOSE','other'].includes(e.code)&&position(e.position)&&[null,'oauth-context','oauth-kv','oauth-client-registration','oauth-get','oauth-post','oauth-sdk-observation'].includes(e.sitePhase)&&[e.httpActual,e.httpExpected].every(v=>v===null||Number.isSafeInteger(v)&&v>=100&&v<=599)&&[e.booleanActual,e.booleanExpected].every(v=>v===null||typeof v==='boolean');
}
function linesOf(result){
 if(!Buffer.isBuffer(result.stdout)||!Buffer.isBuffer(result.stderr)||result.stdout.length>1048576||result.stderr.length>65536){protocolValid=false;return [];}
 try{return new TextDecoder('utf-8',{fatal:true}).decode(result.stdout).split('\n').filter(Boolean);}catch{protocolValid=false;return [];}
}
function parse(result,preflight=false){
 for(const line of linesOf(result)){
  let prefix;
  if(line.startsWith('AFW_C2_OAUTH_CUSTODY '))prefix='AFW_C2_OAUTH_CUSTODY ';
  else if(preflight&&line.startsWith('AFW_C2_OAUTH_PREFLIGHT '))prefix='AFW_C2_OAUTH_PREFLIGHT ';
  else if(!preflight&&line.startsWith('AFW_C2_OAUTH_EVENT '))prefix='AFW_C2_OAUTH_EVENT ';
  else{protocolValid=false;continue;}
  const raw=line.slice(prefix.length);let value;try{value=JSON.parse(raw);}catch{protocolValid=false;continue;}
  if(JSON.stringify(value)!==raw||Buffer.byteLength(line)>2048){protocolValid=false;continue;}
  if(prefix==='AFW_C2_OAUTH_CUSTODY '){if(!custody(value)||custodyRecords.length>=8)protocolValid=false;else custodyRecords.push(value);}
  else if(prefix==='AFW_C2_OAUTH_PREFLIGHT '){if(preflightSeen||Object.keys(value).join(',')!=='schema,written'||value.schema!=='afw.c2-oauth-preflight.v1'||value.written!==true)protocolValid=false;else preflightSeen=true;}
  else if(!event(value)){protocolValid=false;}
  else if(value.id===null){if(auxiliary.length>=4)protocolValid=false;else auxiliary.push(value);}
  else if(cases.length>=2||cases.some(c=>c.id===value.id)){protocolValid=false;}
  else cases.push(value);
 }
}
try{
 if(process.argv.length!==2||process.version!=='v22.23.4'||!Number.isSafeInteger(uid)||uid<=0||!Number.isSafeInteger(gid)||gid<0||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_REF!==REF||process.env.GITHUB_JOB!==JOB||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')||!process.env.RUNNER_TEMP||workspace!==resolve(process.env.GITHUB_WORKSPACE??'')||fileURLToPath(import.meta.url)!==join(workspace,DIAG,'run-oauth-diagnostic.mjs'))fail();
 if(git(['rev-parse','HEAD'])!==process.env.GITHUB_SHA||git(['rev-parse',BASE+'^{tree}'])!==TREE||git(['show','-s','--format=%B','HEAD'])!==MESSAGE)fail();
 context={repository:REPO,baselineSource:BASE,baselineTree:TREE,sourceIndexHash:SOURCE_INDEX_HASH,head:process.env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:JOB,node:process.version,pattern:PATTERN};
 const raw=await readFile(join(workspace,DATA,'source-index.json'));if(sha(raw)!==SOURCE_INDEX_HASH||raw.length>24576)fail();const index=JSON.parse(raw);
 if(index.context.baselineSource!==BASE||index.context.baselineTree!==TREE||JSON.stringify(index.entries.map(e=>e.path))!==JSON.stringify(WHITELIST.map(e=>e.path)))fail();
 const lock=await readFile(join(workspace,'package-lock.json'));if(!lock.equals(command('git',['show',BASE+':package-lock.json']))||JSON.parse(lock).packages?.['node_modules/@cloudflare/workers-oauth-provider']?.version!=='1.2.1')fail();
 const ownedRoot=resolve(process.env.RUNNER_TEMP);temp=await mkdtemp(join(ownedRoot,'afw-c2-oauth-diag-'));if(!resolve(temp).startsWith(ownedRoot+sep)||(await lstat(temp)).uid!==uid)fail();
 phase='materialize';target=join(temp,'baseline');await mkdir(target);
 const archive=command('git',['archive','--format=tar',BASE,'--','lib','worker','scripts','test','db','config',BOOTSTRAP.path,...ROOT_FILES],33554432);
 const tar=spawnSync('tar',['-xf','-','-C',target],{env,input:archive,encoding:null,maxBuffer:65536,timeout:30000});if(tar.error||tar.signal||tar.status!==0)fail();
 const bootstrap=await readFile(join(target,BOOTSTRAP.path));if(bootstrap.length!==BOOTSTRAP.bytes||blob(bootstrap)!==BOOTSTRAP.blob||sha(bootstrap)!==BOOTSTRAP.sha256)fail();
 for(let i=0;i<index.entries.length;i++){
  const entry=index.entries[i];if(entry.dataPath!==DATA+'/body-'+String(i).padStart(2,'0')+'.txt')fail();
  const admitted=await readFile(join(workspace,entry.dataPath));if(admitted.length!==entry.after.bytes||sha(admitted)!==entry.after.sha256||blob(admitted)!==entry.after.blob)fail();
  const file=join(target,entry.path);if(entry.before){const before=await readFile(file);if(before.length!==entry.before.bytes||blob(before)!==entry.before.blob)fail();}
  else{try{await lstat(file);fail();}catch(e){if(e?.code!=='ENOENT')fail();}}
  if(entry.role==='test'){await mkdir(dirname(file),{recursive:true});await writeFile(file,admitted,{flag:entry.before?'w':'wx'});}
 }
 await symlink(join(workspace,'node_modules'),join(target,'node_modules'),'dir');
 for(const [name,h]of Object.entries(HELPERS)){const body=await readFile(join(workspace,h.path));if(body.length!==h.bytes||sha(body)!==h.sha256)fail();await writeFile(join(target,{guard:'oauth-custody-guard.mjs',reporter:'oauth-event-reporter.mjs',preflight:'oauth-custody-preflight.mjs'}[name]),body,{flag:'wx'});}
 phase='custody-preflight';const check=launch([join(target,'oauth-custody-preflight.mjs')],10000);preflightCapture=captureOf(check);parse(check,true);if(check.error||check.signal||check.status!==0||!protocolValid||!preflightSeen||custodyRecords.length!==1)fail();
 const probe=join(target,'preflight-owned','probe'),stat=await lstat(probe);preflightOwned=stat.isFile()&&!stat.isSymbolicLink()&&stat.uid===uid&&stat.gid===gid&&(await readFile(probe,'utf8'))==='C2_OAUTH_OWNED\n';if(!preflightOwned)fail();
 await rm(join(target,'preflight-owned'),{recursive:true,force:false});try{await lstat(join(target,'preflight-owned'));fail();}catch(e){if(e?.code!=='ENOENT')fail();}preflightRemoved=true;
 phase='connection-oauth';const result=launch(['--experimental-vm-modules','--test','--test-concurrency=1','--test-name-pattern='+PATTERN,'--test-reporter='+join(target,'oauth-event-reporter.mjs'),'test/mcp-qa-finite-owner-three-stage-native.test.mjs'],90000);
 capture=captureOf(result);parse(result,false);
 phase='custody-observation';const probeNames=await readdir(join(target,'custody-probes'));if(probeNames.length<2||probeNames.length>8)fail();
 let owned=true;for(const name of probeNames){if(!/^[1-9][0-9]*\.json$/.test(name))fail();const s=await lstat(join(target,'custody-probes',name));if(!s.isFile()||s.isSymbolicLink()||s.uid!==uid||s.gid!==gid||!custody(JSON.parse(await readFile(join(target,'custody-probes',name),'utf8'))))owned=false;}custodyFilesOwned=owned;
 if(!custodyFilesOwned)fail();
}catch{protocolValid=false;}
finally{
 if(temp){cleanup.attempted=true;try{const root=resolve(process.env.RUNNER_TEMP??'');cleanup.ownRootVerified=resolve(temp).startsWith(root+sep)&&(await lstat(temp)).uid===uid;if(!cleanup.ownRootVerified)fail();await rm(temp,{recursive:true,force:false});try{await lstat(temp);fail();}catch(e){if(e?.code!=='ENOENT')fail();}cleanup.success=true;}catch(e){cleanup.errorKind=['EACCES','EPERM','ENOTEMPTY','EBUSY','ENOENT'].includes(e?.code)?e.code:'other';}}
}
const observedOnly=cases.length<=2&&cases.every((c,i)=>c.id===IDS[i]&&!c.skip&&!c.todo&&c.sanitized),custodyVerified=preflightOwned&&preflightRemoved&&custodyFilesOwned&&custodyRecords.length>=2&&custodyRecords.every(custody);
const captureAvailable=Boolean(capture?.stdout&&capture?.stderr)&&['none','timeout'].includes(capture?.errorKind);
const diagnosticCaptureValid=Boolean(context)&&protocolValid&&captureAvailable&&observedOnly&&cases.length===2&&auxiliary.every(a=>a.sanitized&&!a.skip&&!a.todo)&&custodyVerified&&cleanup.success;
const report={schema:'afw.c2-oauth-diagnostic.v1',context,phase,SourceQualified:false,Task1Pass:false,diagnosticCaptureValid,capture,cases,auxiliaryEvents:auxiliary,custody:{parentNonRoot:uid>0,observedGuardRecords:custodyRecords.length,uidGidAndGroupsAndLoopbackMatched:custodyRecords.length>0&&custodyRecords.every(custody),preflightCapture,preflightOwned,preflightRemoved,custodyFilesOwned},cleanup,nonclaims};
const output=JSON.stringify(report);if(Buffer.byteLength(output)>24576){process.stderr.write('C2_OAUTH_DIAGNOSTIC_INVALID\n');process.exitCode=1;}else{await mkdir(join(workspace,'output'),{recursive:true});await writeFile(join(workspace,'output','c2-oauth-diagnostic.json'),output+'\n');process.stdout.write('AFW_C2_OAUTH_DIAGNOSTIC '+output+'\n');if(!diagnosticCaptureValid)process.exitCode=1;}
