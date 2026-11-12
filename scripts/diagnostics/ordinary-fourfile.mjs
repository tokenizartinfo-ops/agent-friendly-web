// ORD-1. Inert until a separately reviewed workflow release. No business authority.
import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,lstat,copyFile,symlink,chmod,open} from 'node:fs/promises';
import {spawn,spawnSync} from 'node:child_process';
import {resolve,join,dirname,relative,isAbsolute} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import * as net from 'node:net';
import * as tls from 'node:tls';
import * as http from 'node:http';
import * as https from 'node:https';
const SUBJECT='f5f52660d19ec9fc634bbc49558db75582fdaf88';
const REPO='tokenizartinfo-ops/agent-friendly-web';
const BRANCH='refs/heads/diag/afw-ordinary-fourfile-20261112';
const SELF=fileURLToPath(import.meta.url);
const TESTS=['test/mcp-own-finite-entrypoints.test.mjs','test/mcp-qa-cloud-native-cli.test.mjs','test/mcp-qa-finite-adoption-wait.test.mjs','test/mcp-qa-finite-command.test.mjs'];
const HTTP_FIXTURE='test/fixtures/finite-http-module.mjs';
const ENTRY='scripts/qa-cloud-native-observation.mjs',PIN='lib/mcp-qa-native-wrapper-pin.mjs';
const PINS={"test/mcp-own-finite-entrypoints.test.mjs":"674419ca51328b128bba483f44001e12f1e4b9f5","test/mcp-qa-cloud-native-cli.test.mjs":"8446a0d92cf97375ba76bb14fe9404a6b7879e8d","test/mcp-qa-finite-adoption-wait.test.mjs":"e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55","test/mcp-qa-finite-command.test.mjs":"2f8eecbf8972ec6fd4ab2c9d2e8e37a8cb627e87","test/fixtures/finite-http-module.mjs":"cfbc564074d298cc333ddbb922ba7c19a96065fb","scripts/qa-cloud-native-observation.mjs":"db4de40f3bcccb5a992ed41de388b0a550d5d64c","lib/mcp-qa-native-wrapper-pin.mjs":"075a52bf0fb8fa649520f17fa15eacc9b4738222"};
const PIN_SOURCE="// Exact source-only Actions receipt: run 41282383977, attempt 1.\n// Checkout 080b72daa29299c728093604075f9fc09e3653a4; wrapper bytes do not\n// contain sourceRevision or observation H (the context is a separate module).\nexport const QA_NATIVE_WRAPPER_PIN=Object.freeze({\n sha256:'5b06e2012d906269b6ad829f666d3d01fd197f6b4ea90f04bb6591dad4d18953',\n bytes:48388,\n});\n";
const PIN_EXPECTED={bytes:48388,sha256:'5b06e2012d906269b6ad829f666d3d01fd197f6b4ea90f04bb6591dad4d18953'};
const PREFIX='ORD1_SAFE_V1 ';
const MAX_SAFE=65536,MAX_MESSAGE=1048576,MAX_RAW=8388608;
const STAGES=['build','import','fixture','artifact_load','controller','settlement'];
const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','AssertionError'];
const hash=v=>createHash('sha256').update(v).digest('hex');
const blob=v=>createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0').update(v).digest('hex');
const flags={operationalReadiness:false,completePackage:false,PCoff:false};
const reject=()=>{throw Error('ORD-1 diagnostic unavailable');};
const own=(v,k)=>{try{const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
function safeError(error){
 const out=[],seen=new Set();let e=error;
 for(let i=0;i<4&&e&&typeof e==='object'&&!seen.has(e);i++){
  seen.add(e);const m=own(e,'message'),c=own(e,'code'),n=own(e,'name');
  let messageHash=null,messageTooLarge=false;
  if(typeof m==='string'){
   messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;
   if(!messageTooLarge)messageHash=hash(m);
  }
  out.push({name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge});
  e=own(e,'cause');
 }
 return out;
}
function controls(){
 const canary='ORD1_PRIVATE_CANARY_NEVER_EMIT_20261112';
 const e=new Error(canary);let touched=0;
 Object.defineProperty(e,'stack',{get(){touched++;throw Error('unreadable');}});
 Object.defineProperty(e,'code',{get(){touched++;throw Error('unreadable');}});
 const small=safeError(e),large=safeError(new Error('X'.repeat(MAX_MESSAGE+1)));
 const wire=JSON.stringify({small,large});
 return {pass:touched===0&&!wire.includes(canary)&&small[0].messageHash===hash(canary)&&large[0].messageHash===null&&large[0].messageTooLarge===true,stackReads:touched,oversizeSuppressed:large[0].messageTooLarge};
}
function fixedLocation(v){
 const f=own(v,'file'),line=own(v,'line'),column=own(v,'column');
 if(typeof f!=='string'||f.length>256||f.startsWith('data:'))return null;
 const norm=f.replaceAll('\\','/'),p=TESTS.find(x=>norm===x||norm.endsWith('/'+x));
 return p&&Number.isSafeInteger(line)&&line>=1&&line<=10000&&Number.isSafeInteger(column)&&column>=0&&column<=10000?{file:p,line,column}:null;
}
function emit(value){try{const s=JSON.stringify(value);if(Buffer.byteLength(s)<=4096)process.stdout.write(PREFIX+s+'\n');}catch{}}
function installChild(){
 const arm=process.env.ORD1_CHILD_ARM;if(!['A','B'].includes(arm)||process.env.ORD1_SUBJECT!==SUBJECT)reject();
 let seq=0;
 const record=x=>emit({...x,seq:++seq});
 const stage=(site,stage,phase='enter')=>{if(Number.isInteger(site)&&site>=0&&site<=4&&STAGES.includes(stage)&&['enter','return','throw'].includes(phase))record({kind:'boundary',site,stage,phase});};
 // Observer side branches retain each original Promise/receiver/arguments/error.
 globalThis.__ordCall=(site,stageName,fn)=>function(...args){
  const note=(phase,error)=>{try{stage(site,stageName,phase);if(error)record({kind:'error',site,stage:stageName,errors:safeError(error)});}catch{}};
  note('enter');let result;try{result=Reflect.apply(fn,this,args);}catch(error){note('throw',error);throw error;}
  if(result instanceof Promise)void Promise.prototype.then.call(result,()=>note('return'),error=>note('throw',error));
  else note('return');return result;
 };
 const originalEntryEdits=[
  ["entryStage='artifact_load';","entryStage='artifact_load';globalThis.__ordVM?.('artifact_load','enter');",1],
  ["entryStage='controller';","entryStage='controller';globalThis.__ordVM?.('controller','enter');",1],
  ["entryStage='settlement';","entryStage='settlement';globalThis.__ordVM?.('settlement','enter');",1],
  ["}catch{\n const blocked=","}catch{\n globalThis.__ordVM?.(entryStage,'throw');\n const blocked=",1]
 ];
 globalThis.__ord=Object.freeze({
  stage,
  artifact(a){record({kind:'artifact',bytes:a.bytes,sha256:a.sha256,bytesEqual:a.bytes===PIN_EXPECTED.bytes,hashEqual:a.sha256===PIN_EXPECTED.sha256});},
  pinSource(a){
   if(!Number.isSafeInteger(a.bytes)||a.bytes<1||a.bytes>131072||typeof a.sha256!=='string'||!/^[a-f0-9]{64}$/.test(a.sha256))reject();
   const source=arm==='A'?PIN_SOURCE:"export const QA_NATIVE_WRAPPER_PIN=Object.freeze("+JSON.stringify({sha256:a.sha256,bytes:a.bytes})+");\n";
   record({kind:'pin_model',arm,sourceHash:hash(source),productionPinUnchanged:true,modeled:arm==='B'});
   return source;
  },
  entrySource(source){
   if(blob(source)!==PINS[ENTRY])reject();
   const edited=applyEdits(source,originalEntryEdits);
   record({kind:'loaded_entry',originalHash:hash(source),newHash:hash(edited.text),normalized:true,occurrences:edited.edits.map(x=>x.count)});
   return edited.text;
  },
  controller(){record({kind:'controller',invoked:1});},
  nativeResult(runs,exitCode,writes){if([runs,exitCode,writes].every(Number.isSafeInteger))record({kind:'native_result',runs,exitCode,writes});}
 });
 let networkDenied=0;
 const denyNetwork=()=>{networkDenied++;record({kind:'network_denied',count:networkDenied});throw Error('ORD-1 network disabled');};
 globalThis.fetch=denyNetwork;
 net.Socket.prototype.connect=denyNetwork;
 // Named module exports remain untouched. Socket.connect fences Node/undici I/O;
 // HTTP/TLS entry functions are additionally fenced through their mutable defaults.
 net.default.connect=denyNetwork;net.default.createConnection=denyNetwork;
 tls.default.connect=denyNetwork;http.default.request=denyNetwork;http.default.get=denyNetwork;
 https.default.request=denyNetwork;https.default.get=denyNetwork;
 record({kind:'privacy_control',...controls()});
}
function applyEdits(original,edits){
 let text=original;const inventory=[];
 for(const [from,to,expected]of edits){
  const count=text.split(from).length-1;if(count!==expected||from===to)reject();
  text=text.split(from).join(to);inventory.push({from,to,count});
 }
 let normalized=text;
 for(const {from,to,count}of [...inventory].reverse()){
  if(normalized.split(to).length-1!==count)reject();normalized=normalized.split(to).join(from);
 }
 if(normalized!==original)reject();
 return {text,edits:inventory};
}
const nativePlugin=String.raw`
b.onLoad({filter:/\/scripts\/qa-cloud-native-observation\.mjs$/},async o=>({loader:'js',contents:globalThis.__ord.entrySource(await ordReadFile(o.path,'utf8')),resolveDir:posix.dirname(o.path)}));
b.onLoad({filter:/mcp-qa-native-wrapper-pin\.mjs$/},()=>({loader:'js',contents:globalThis.__ord.pinSource(a)}));
`;
function editsFor(path){
 if(path===TESTS[0])return [
  ["await build(","await globalThis.__ordCall(0,'build',build)(",1],
  ["return import(","return globalThis.__ordCall(0,'import',specifier=>import(specifier))(",1]
 ];
 if(path===TESTS[1])return [
  ["import test from 'node:test';","import {readFile as ordReadFile} from 'node:fs/promises';\nimport test from 'node:test';",1],
  ["pinned??=buildQaNativeWrapper(","pinned??=globalThis.__ordCall(1,'build',buildQaNativeWrapper)(",1],
  ["const a=await artifact(),{base64,...manifest}=a;","const a=await artifact(),{base64,...manifest}=a;globalThis.__ord.artifact(a);",1],
  ["await build(","await globalThis.__ordCall(1,'build',build)(",1],
  ["setup(b){","setup(b){"+nativePlugin,1],
  ["{process,Date:ClockDate,","{__ordVM:(stage,phase)=>globalThis.__ord.stage(1,stage,phase),process,Date:ClockDate,",1],
  ["runs++;if(mode===","runs++;globalThis.__ord.controller();if(mode===",1],
  ["return{process,writes,logs,runs,","globalThis.__ord.nativeResult(runs,process.exitCode,writes.length);return{process,writes,logs,runs,",1]
 ];
 if(path===TESTS[2]||path===TESTS[3]){
  const site=path===TESTS[2]?2:3;
  return [["await cfFiniteFixture(","await globalThis.__ordCall("+site+",'fixture',cfFiniteFixture)(",site===2?1:2]];
 }
 if(path===HTTP_FIXTURE)return [
  ["await build(","await globalThis.__ordCall(4,'build',build)(",2],
  ["return import(","return globalThis.__ordCall(4,'import',specifier=>import(specifier))(",2]
 ];
 reject();
}
function absorbMarker(data,state){
 const text=own(data,'message');
 if(typeof text!=='string'||text.length>65536||!text.startsWith(PREFIX))return;
 for(const line of text.split('\n')){
  if(!line.startsWith(PREFIX)||line.length>4096)continue;
  let v;try{v=JSON.parse(line.slice(PREFIX.length));}catch{continue;}
  if(!v||typeof v!=='object')continue;
  // Closed schemas: never forward arbitrary test-origin objects/strings.
  if(v.kind==='boundary'&&Number.isInteger(v.site)&&v.site>=0&&v.site<=4&&STAGES.includes(v.stage)&&['enter','return','throw'].includes(v.phase)){
   const k=v.site+':'+v.stage+':'+v.phase;state.boundaries[k]=(state.boundaries[k]??0)+1;
  }else if(v.kind==='error'&&Number.isInteger(v.site)&&v.site>=0&&v.site<=4&&STAGES.includes(v.stage)&&Array.isArray(v.errors)){
   for(const e of v.errors.slice(0,4))addError(state,{site:v.site,stage:v.stage,...closedError(e)});
  }else if(v.kind==='artifact'&&Number.isSafeInteger(v.bytes)&&v.bytes>0&&v.bytes<=131072&&/^[a-f0-9]{64}$/.test(v.sha256)&&typeof v.bytesEqual==='boolean'&&typeof v.hashEqual==='boolean'){
   const k=v.bytes+':'+v.sha256;state.artifacts[k]={bytes:v.bytes,sha256:v.sha256,bytesEqual:v.bytesEqual,hashEqual:v.hashEqual};
  }else if(v.kind==='controller'&&v.invoked===1)state.controllerInvoked++;
  else if(v.kind==='native_result'&&[v.runs,v.exitCode,v.writes].every(Number.isSafeInteger)){
   const k=[v.runs,v.exitCode,v.writes].join(':');state.nativeResults[k]=(state.nativeResults[k]??0)+1;
  }else if(v.kind==='network_denied')state.networkDenied++;
  else if(v.kind==='privacy_control'&&state.privacyControls.length<16)state.privacyControls.push({pass:v.pass===true,stackReads:Number.isSafeInteger(v.stackReads)?v.stackReads:null,oversizeSuppressed:v.oversizeSuppressed===true});
  else if(v.kind==='pin_model'&&['A','B'].includes(v.arm)&&/^[a-f0-9]{64}$/.test(v.sourceHash)){
   const k=v.arm+':'+v.sourceHash;state.pinModels[k]={arm:v.arm,sourceHash:v.sourceHash,productionPinUnchanged:v.productionPinUnchanged===true,modeled:v.modeled===true};
  }else if(v.kind==='loaded_entry'&&[v.originalHash,v.newHash].every(x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x))&&Array.isArray(v.occurrences)&&v.occurrences.length===4){
   state.loadedEntry={originalHash:v.originalHash,newHash:v.newHash,normalized:v.normalized===true,occurrences:v.occurrences.map(x=>Number.isSafeInteger(x)?x:null)};
  }
 }
}
function closedError(e){return {name:NAMES.includes(e?.name)?e.name:null,code:CODES.includes(e?.code)?e.code:null,messageHash:typeof e?.messageHash==='string'&&/^[a-f0-9]{64}$/.test(e.messageHash)?e.messageHash:null,messageTooLarge:e?.messageTooLarge===true};}
function addError(state,e){
 const k=JSON.stringify(e);if(state.errors[k])state.errors[k].count++;else if(Object.keys(state.errors).length<64)state.errors[k]={...e,count:1};else state.errorOverflow++;
}
export default async function* reporter(source){
 const state={purpose:'afw.ordinary-fourfile.reporter.v1',testEvents:{passed:0,failed:0,wrapperFailed:0},summary:{},boundaries:{},errors:{},errorOverflow:0,artifacts:{},pinModels:{},loadedEntry:null,controllerInvoked:0,nativeResults:{},privacyControls:[],networkDenied:0,...flags};
 for await(const event of source){
  const d=event.data;
  if(event.type==='test:stdout'||event.type==='test:stderr')absorbMarker(d,state);
  else if(event.type==='test:pass')state.testEvents.passed++;
  else if(event.type==='test:fail'){
   const details=own(d,'details'),error=own(details,'error'),failureType=own(error,'failureType');
   if(failureType==='subtestsFailed')state.testEvents.wrapperFailed++;else state.testEvents.failed++;
   const location=fixedLocation(d);
   for(const e of safeError(error))addError(state,{location,failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(failureType)?failureType:null,...e});
  }else if(event.type==='test:diagnostic'){
   const message=own(d,'message');
   if(typeof message==='string'&&message.length<=64){
    const m=/^(tests|pass|fail|cancelled|skipped|todo) ([0-9]{1,6})$/.exec(message);
    if(m)state.summary[m[1]]=Number(m[2]);
   }
  }else if(event.type==='test:summary'){
   const c=own(d,'counts');
   for(const [from,to]of [['tests','tests'],['passed','pass'],['failed','fail'],['cancelled','cancelled'],['skipped','skipped'],['todo','todo']]){
    const n=own(c,from);if(Number.isSafeInteger(n)&&n>=0&&n<=10000)state.summary[to]=n;
   }
  }
 }
 const result={...state,errors:Object.values(state.errors),artifacts:Object.values(state.artifacts),pinModels:Object.values(state.pinModels)};
 const text=JSON.stringify(result);
 yield Buffer.byteLength(text)<=MAX_SAFE?text+'\n':JSON.stringify({purpose:state.purpose,status:'safe_output_cap',...flags})+'\n';
}
function git(cwd,args){const r=spawnSync('git',args,{cwd,encoding:'utf8',timeout:10000,maxBuffer:2097152,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,GIT_CONFIG_NOSYSTEM:'1'}});if(r.status!==0)reject();return r.stdout;}
function tuples(raw){return raw.split('\0').filter(Boolean).map(x=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(x);if(!m||m[4].startsWith('/')||m[4].split('/').includes('..'))reject();return {mode:m[1],sha:m[2],path:m[4]};});}
async function inventory(root,leaves){
 const rows=[];for(const leaf of leaves){const p=join(root,leaf.path),s=await lstat(p);if(!s.isFile()||s.isSymbolicLink()||((s.mode&0o111)!==0)!==(leaf.mode==='100755'))reject();const bytes=await readFile(p);if(blob(bytes)!==leaf.sha)reject();rows.push([leaf.path,leaf.mode,leaf.sha]);}
 return hash(JSON.stringify(rows));
}
async function runChild(cwd,arm,outDir,privateDir){
 const handles=await Promise.all(['stdout','stderr'].map(n=>open(join(privateDir,'raw.'+n),'wx',0o600)));
 const digests=[createHash('sha256'),createHash('sha256')],sizes=[0,0];let reason=null,deadline=null,killer=null;
 const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',ORD1_CHILD_ARM:arm,ORD1_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
 const child=spawn(process.execPath,['--import',pathToFileURL(SELF).href,'--test','--test-reporter='+pathToFileURL(SELF).href,...TESTS],{cwd,env,detached:true,stdio:['ignore','pipe','pipe']});
 const terminate=why=>{if(reason)return;reason=why;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},5000);};
 const parentStop=()=>terminate('parent_terminated');process.once('SIGTERM',parentStop);process.once('SIGINT',parentStop);
 deadline=setTimeout(()=>terminate('deadline_110s'),110000);
 const chunks=[];
 const pumps=[child.stdout,child.stderr].map(async(stream,i)=>{for await(const chunk of stream){
  if(sizes[i]+chunk.length>MAX_RAW){terminate('raw_output_cap');continue;}
  sizes[i]+=chunk.length;digests[i].update(chunk);await handles[i].write(chunk);
  if(i===0&&sizes[0]<=MAX_SAFE)chunks.push(chunk);else if(i===0)terminate('safe_output_cap');
 }});
 const exit=await new Promise(resolve=>{child.once('error',()=>resolve({code:null,signal:null,spawnFailed:true}));child.once('close',(code,signal)=>resolve({code,signal:['SIGTERM','SIGKILL'].includes(signal)?signal:null,spawnFailed:false}));});
 await Promise.all(pumps);clearTimeout(deadline);clearTimeout(killer);process.removeListener('SIGTERM',parentStop);process.removeListener('SIGINT',parentStop);await Promise.all(handles.map(h=>h.close()));
 let evidence=null;try{const raw=Buffer.concat(chunks);if(raw.length<=MAX_SAFE)evidence=JSON.parse(raw.toString('utf8'));}catch{}
 return {exit,termination:reason,evidence,rawFiles:['stdout','stderr'].map((name,i)=>({name:'raw.'+name,bytes:sizes[i],sha256:digests[i].digest('hex'),uploaded:false})),privateLogsUploaded:false};
}
async function main(arm){
 if(!['A','B'].includes(arm)||process.argv.length!==3||process.platform!=='linux'||process.version!=='v22.23.4')reject();
 if(!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??''))reject();
 if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1')reject();
 if(typeof process.env.ORD1_WORKFLOW_SHA!=='string'||!/^[a-f0-9]{40}$/.test(process.env.ORD1_WORKFLOW_SHA))reject();
 const subject=resolve('subject'),runner=process.env.RUNNER_TEMP;if(!runner||!isAbsolute(runner)||resolve(runner)===subject)reject();
 const parent=join(resolve(runner),'ord1-'+process.env.GITHUB_RUN_ID+'-'+arm);
 await mkdir(parent,{recursive:false,mode:0o700});
 const output=resolve('ord1-safe-'+arm);await mkdir(output,{recursive:false,mode:0o700});
 const context={repository:REPO,workflowRef:BRANCH,trigger:process.env.GITHUB_EVENT_NAME,workflowSource:process.env.ORD1_WORKFLOW_SHA,workflowCheckout:git(dirname(dirname(dirname(SELF))),['rev-parse','HEAD']).trim(),testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,arm,node:process.version,os:'Ubuntu24.04',group:'UNSET',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,helperHash:hash(await readFile(SELF)),...flags};
 let report={purpose:'afw.ordinary-fourfile.diagnostic.v1',status:'incomplete',context,privacy:controls(),unknowns:['No production or operational inference.','A must match baseline or context differences remain unresolved.'],...flags};
 try{
  if(git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')reject();
  const leaves=tuples(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
  if(leaves.length!==3188||leaves.find(x=>x.path==='package.json')?.sha!=='f4fd38ac380c46a149d8cf0f3bd828a28406f761'||leaves.find(x=>x.path==='package-lock.json')?.sha!=='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b')reject();
  const before=await inventory(subject,leaves),overlay=join(parent,'overlay');await mkdir(overlay,{mode:0o700});
  for(const leaf of leaves){const dest=join(overlay,leaf.path);await mkdir(dirname(dest),{recursive:true});await copyFile(join(subject,leaf.path),dest);await chmod(dest,leaf.mode==='100755'?0o700:0o600);}
  await symlink(join(subject,'node_modules'),join(overlay,'node_modules'),'dir');
  const overlays=[];
  for(const path of [...TESTS,HTTP_FIXTURE]){
   const original=await readFile(join(subject,path),'utf8');if(blob(original)!==PINS[path])reject();
   const edited=applyEdits(original,editsFor(path));await writeFile(join(overlay,path),edited.text,{mode:0o600});
   overlays.push({path,originalBlob:PINS[path],originalHash:hash(original),newHash:hash(edited.text),normalized:true,seams:edited.edits.map(x=>({originalLiteralHash:hash(x.from),newLiteralHash:hash(x.to),count:x.count}))});
  }
  await writeFile(join(output,'result.json'),JSON.stringify({...report,status:'running_or_interrupted',protectedBase:{leaves:leaves.length,before},overlays,...flags})+'\n',{flag:'wx',mode:0o600});
  const execution=await runChild(overlay,arm,output,parent);
  const after=await inventory(subject,leaves),e=execution.evidence;
  const baseline=e?.summary?.tests===109&&e.summary.pass===73&&e.summary.fail===36;
  const hasCounters=['tests','pass','fail'].every(k=>Number.isSafeInteger(e?.summary?.[k]));
  const hasSites=[0,1,2,3].every(site=>Object.keys(e?.boundaries??{}).some(k=>k.startsWith(site+':')&&k.endsWith(':enter')));
  const diagnosticComplete=execution.termination===null&&execution.exit.spawnFailed===false&&e?.purpose==='afw.ordinary-fourfile.reporter.v1'&&e.errorOverflow===0&&hasCounters&&hasSites&&e.networkDenied===0&&e.privacyControls.length>=4&&e.privacyControls.every(x=>x.pass)&&report.privacy.pass&&before===after;
  report={...report,status:diagnosticComplete?'diagnostic_complete':'incomplete',protectedBase:{leaves:leaves.length,before,after,equal:before===after},overlays,execution,baselineMatches109_73_36:baseline,baselineRequiredForCausalConclusion:true,causalConclusion:'DEFERRED_TO_ROOT_TWO_ARM_REVIEW',noRetry:true};
 }catch(error){report={...report,preparationError:safeError(error),noRetry:true};}
 const text=JSON.stringify(report,null,2)+'\n';if(Buffer.byteLength(text)>MAX_SAFE)reject();
 await writeFile(join(output,'result.json'),text,{mode:0o600});
 await writeFile(join(output,'manifest.json'),JSON.stringify({purpose:'afw.ordinary-fourfile.safe-manifest.v1',file:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text),context,...flags})+'\n',{flag:'wx',mode:0o600});
 process.exitCode=report.status==='diagnostic_complete'?0:1;
}
// Node 22's isolated test-file process only; never emit preload markers in the
// coordinator or reporter worker. If this context is unavailable, completeness fails.
if(process.env.ORD1_CHILD_ARM&&process.env.NODE_TEST_CONTEXT==='child-v8')installChild();
if(process.argv[1]&&resolve(process.argv[1])===SELF){
 try{await main(process.argv[2]);}catch{process.stderr.write('ORD-1 diagnostic preparation or preservation blocked.\n');process.exitCode=1;}
}
