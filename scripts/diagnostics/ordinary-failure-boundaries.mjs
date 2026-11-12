// AFW fixed two-case diagnostic. Inactive preparation; no business authority.
import {createHash} from 'node:crypto';
import {types} from 'node:util';
import {runInNewContext} from 'node:vm';
import {readFile,writeFile,mkdir,lstat,copyFile,symlink,chmod,open} from 'node:fs/promises';
import {spawn,spawnSync} from 'node:child_process';
import {resolve,join,dirname,isAbsolute} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import * as net from 'node:net';
import * as tls from 'node:tls';
import * as http from 'node:http';
import * as https from 'node:https';
const SUBJECT='f5f52660d19ec9fc634bbc49558db75582fdaf88';
const REPO='tokenizartinfo-ops/agent-friendly-web';
const BRANCH='refs/heads/diag/afw-failure-boundaries-20261112';
const SELF=fileURLToPath(import.meta.url);
const TESTS=["test/mcp-own-finite-entrypoints.test.mjs","test/mcp-qa-finite-adoption-wait.test.mjs"];
const CASES=['compiled finite receiver denies legacy delivery before every host capability','actual CLI waits for attended observer until 50s after successful primary seed; GET only'];
const PATTERN='^(?:'+CASES.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')$';
const PINS={"test/mcp-own-finite-entrypoints.test.mjs":"674419ca51328b128bba483f44001e12f1e4b9f5","test/mcp-qa-finite-adoption-wait.test.mjs":"e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55","test/fixtures/finite-cf-http.mjs":"b0897d389ef3c1a0f057422ffc332e3e024d3a93","test/fixtures/finite-finalizer.mjs":"d3b254e9a21fc816ef6520bdff0f4abafe34f6ea","test/fixtures/finite-restoration.mjs":"ad53cfeca0b6c94b3e062bcb50e0a4644a667b31","test/fixtures/qa-finite-trial.mjs":"8297a9ae39fd4bdd228a2b1f64105683cb768203","test/fixtures/finite-http-module.mjs":"cfbc564074d298cc333ddbb922ba7c19a96065fb"};
const EDITS={
 "test/mcp-own-finite-entrypoints.test.mjs": [
  [
   "await build(",
   "await globalThis.__afbWrap('own_build',build)(",
   1
  ],
  [
   "return import(",
   "return globalThis.__afbWrap('own_import',specifier=>import(specifier))(",
   1
  ]
 ],
 "test/mcp-qa-finite-adoption-wait.test.mjs": [
  [
   "await cfFiniteFixture(",
   "await globalThis.__afbWrap('cf_fixture',cfFiniteFixture)(",
   1
  ]
 ],
 "test/fixtures/finite-cf-http.mjs": [
  [
   "await finiteFinalizerFixture(",
   "await globalThis.__afbWrap('cf_finalizer',finiteFinalizerFixture)(",
   1
  ]
 ],
 "test/fixtures/finite-finalizer.mjs": [
  [
   "await finiteRestorationFixture(",
   "await globalThis.__afbWrap('final_restore',finiteRestorationFixture)(",
   1
  ],
  [
   "v=projectPrivateQaFiniteReferences(identity)",
   "v=globalThis.__afbWrap('final_project',projectPrivateQaFiniteReferences)(identity)",
   1
  ]
 ],
 "test/fixtures/finite-restoration.mjs": [
  [
   "f=finiteFixture({at})",
   "f=globalThis.__afbWrap('rest_init',finiteFixture)({at})",
   1
  ],
  [
   "ctl=controls.createPrivateQaFiniteTrialControl(f.options(controls))",
   "ctl=globalThis.__afbMethod('rest_control',controls,'createPrivateQaFiniteTrialControl')(f.options(controls))",
   1
  ],
  [
   "ctl.prepare()",
   "globalThis.__afbMethod('rest_prepare',ctl,'prepare')()",
   1
  ],
  [
   "proof=finiteProofFixture(",
   "proof=globalThis.__afbWrap('rest_proof',finiteProofFixture)(",
   1
  ],
  [
   "await store.capture(",
   "await globalThis.__afbMethod('rest_capture',store,'capture')(",
   1
  ],
  [
   "await store.read()",
   "await globalThis.__afbMethod('rest_read',store,'read')()",
   2
  ],
  [
   "await ctl.claimEffect(",
   "await globalThis.__afbMethod('rest_claim',ctl,'claimEffect')(",
   1
  ]
 ],
 "test/fixtures/qa-finite-trial.mjs": [
  [
   "old=generationFixture()",
   "old=globalThis.__afbWrap('trial_generation',generationFixture)()",
   1
  ]
 ],
 "test/fixtures/finite-http-module.mjs": [
  [
   "await build(",
   "await globalThis.__afbWrap('http_build',build)(",
   2
  ],
  [
   "return import(",
   "return globalThis.__afbWrap('http_import',specifier=>import(specifier))(",
   2
  ]
 ]
};
const PREFIX='AFB_SAFE_V1 ';
const MAX_SAFE=65536,MAX_MESSAGE=1048576,MAX_RAW=8388608;
const STAGES=['own_build','own_import','cf_fixture','cf_finalizer','final_restore','final_project','rest_init','rest_control','rest_prepare','rest_proof','rest_capture','rest_read','rest_claim','trial_generation','http_build','http_import'];
const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
const PROTOS=INTRINSICS.map(x=>x.prototype);
const CLASS_NAMES=NAMES.slice(0,8);
const EXPECTED_HASHES=['9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff','a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e'];
const flags={operationalReadiness:false,completePackage:false,PCoff:false};
const hash=v=>createHash('sha256').update(v).digest('hex');
const blob=v=>createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0').update(v).digest('hex');
const reject=()=>{throw Error('AFB diagnostic unavailable');};
const own=(v,k)=>{try{if(types.isProxy(v))return undefined;const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
const hex=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v)?v:null;
const number=(v,max=10000)=>Number.isSafeInteger(v)&&v>=0&&v<=max?v:null;
function profile(error,depth){
 let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
 try{
  nativeError=types.isNativeError(error);
  if(nativeError){
   let p=Object.getPrototypeOf(error);
   const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
   for(let i=1;i<=4&&p;i++){
    const name=own(p,'name');
    if(CLASS_NAMES.includes(name)){observedDataPrototypeName=name;prototypeDepth=i;break;}
    p=Object.getPrototypeOf(p);
   }
  }
 }catch{}
 const m=own(error,'message'),c=own(error,'code'),n=own(error,'name');
 let messageHash=null,messageTooLarge=false;
 if(typeof m==='string'){messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;if(!messageTooLarge)messageHash=hash(m);}
 return {nativeError,currentRealmPrototype,observedDataPrototypeName,prototypeDepth,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge,depth};
}
function safeError(error){
 const rows=[],seen=new Set();let e=error;
 for(let depth=0;depth<=3&&e&&(typeof e==='object'||typeof e==='function')&&!seen.has(e);depth++){
  seen.add(e);try{rows.push(profile(e,depth));}catch{rows.push(closedError({depth}));}
  e=own(e,'cause');
 }
 return rows.map(x=>({...x,causeDepth:Math.max(0,rows.length-1)}));
}
function closedError(e){
 const d=number(own(e,'depth'),3),cd=number(own(e,'causeDepth'),3),pd=number(own(e,'prototypeDepth'),4);
 return {nativeError:own(e,'nativeError')===true,currentRealmPrototype:CLASS_NAMES.includes(own(e,'currentRealmPrototype'))?own(e,'currentRealmPrototype'):null,observedDataPrototypeName:CLASS_NAMES.includes(own(e,'observedDataPrototypeName'))?own(e,'observedDataPrototypeName'):null,prototypeDepth:pd&&pd>=1?pd:null,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(own(e,'name'))?own(e,'name'):null,code:CODES.includes(own(e,'code'))?own(e,'code'):null,messageHash:hex(own(e,'messageHash')),messageTooLarge:own(e,'messageTooLarge')===true,depth:d,causeDepth:cd};
}
function controls(){
 const canary='AFB_PRIVATE_CANARY_NEVER_EMIT_20261112';
 let touches=0;
 const ordinary=new TypeError(canary),cross=runInNewContext('new TypeError("AFB_PRIVATE_CANARY_NEVER_EMIT_20261112")');
 const spoof=Object.create(TypeError.prototype),guarded=new Error(canary);
 for(const key of ['stack','code','name','cause',Symbol.toStringTag])Object.defineProperty(guarded,key,{get(){touches++;throw new Error('private getter');}});
 const large=new Error('X'.repeat(MAX_MESSAGE+1)),cycle=new Error(canary);Object.defineProperty(cycle,'cause',{value:cycle});
 const rows=[ordinary,cross,spoof,guarded,large,cycle].map(safeError),wire=JSON.stringify(rows);
 const pass=touches===0&&!wire.includes(canary)&&rows[0][0].nativeError&&rows[0][0].currentRealmPrototype==='TypeError'&&rows[1][0].nativeError&&rows[1][0].currentRealmPrototype===null&&rows[1][0].observedDataPrototypeName==='TypeError'&&!rows[2][0].nativeError&&rows[2][0].prototypeDepth===null&&rows[3][0].name===null&&rows[4][0].messageHash===null&&rows[4][0].messageTooLarge&&rows[5].length===1;
 return {pass,getterTouches:touches,ordinaryNative:rows[0][0].nativeError,crossRealmNative:rows[1][0].nativeError,crossRealmExactUnknown:rows[1][0].currentRealmPrototype===null,spoofRejected:!rows[2][0].nativeError,oversizeSuppressed:rows[4][0].messageTooLarge,cycleBounded:rows[5].length===1,rawCanaryAbsent:!wire.includes(canary)};
}
function closedControl(v){
 return Object.fromEntries(['pass','ordinaryNative','crossRealmNative','crossRealmExactUnknown','spoofRejected','oversizeSuppressed','cycleBounded','rawCanaryAbsent'].map(k=>[k,own(v,k)===true]).concat([['getterTouches',number(own(v,'getterTouches'))]]));
}
function emit(value){try{const s=JSON.stringify(value);if(Buffer.byteLength(s)<=4096)process.stdout.write(PREFIX+s+'\n');}catch{}}
function installChild(){
 if(process.env.AFB_CHILD!=='FIXED_TWO_CASES'||process.env.AFB_SUBJECT!==SUBJECT)reject();
 const note=(stage,phase,error)=>{
  try{emit({kind:'boundary',stage,phase});if(phase==='throw')emit({kind:'error',stage,errors:safeError(error)});}catch{}
 };
 const observe=(stage,fn,receiver,args)=>{
  let result;note(stage,'enter');
  try{result=Reflect.apply(fn,receiver,args);}catch(error){note(stage,'throw',error);throw error;}
  try{if(types.isPromise(result))void Promise.prototype.then.call(result,()=>note(stage,'return'),error=>note(stage,'throw',error));else note(stage,'return');}catch{}
  return result;
 };
 globalThis.__afbWrap=(stage,fn)=>function(...args){return observe(stage,fn,this,args);};
 globalThis.__afbMethod=(stage,receiver,key)=>{const fn=receiver[key];return function(...args){return observe(stage,fn,receiver,args);};};
 // Controls observe the original identity, including async return and error identity.
 let methodTouches=0;const receiver={value:7,call(x){methodTouches++;if(this!==receiver)throw new Error('receiver');return x;}};
 const identity={},p=Promise.resolve(identity),thrown=new TypeError('AFB_PRIVATE_CONTROL_THROW');
 const returned=globalThis.__afbMethod('rest_control',receiver,'call')(p);
 let sameError=false;try{globalThis.__afbWrap('rest_control',()=>{throw thrown;})();}catch(e){sameError=e===thrown;}
 emit({kind:'identity_control',pass:returned===p&&sameError&&methodTouches===1,promiseIdentity:returned===p,errorIdentity:sameError,receiverIdentity:methodTouches===1});
 const deny=()=>{emit({kind:'network_denied'});throw new Error('AFB network disabled');};
 globalThis.fetch=deny;net.Socket.prototype.connect=deny;
 net.default.connect=deny;net.default.createConnection=deny;tls.default.connect=deny;
 http.default.request=deny;http.default.get=deny;https.default.request=deny;https.default.get=deny;
 emit({kind:'privacy_control',...controls()});
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
function addError(state,error){
 const key=JSON.stringify(error);
 if(state.errors[key])state.errors[key].count++;
 else if(Object.keys(state.errors).length<96)state.errors[key]={...error,count:1};
 else state.errorOverflow++;
}
function absorbMarker(data,state){
 const message=own(data,'message');if(typeof message!=='string'||message.length>MAX_SAFE)return;
 for(const line of message.split('\n')){
  if(!line.startsWith(PREFIX)||line.length>4096)continue;
  let v;try{v=JSON.parse(line.slice(PREFIX.length));}catch{continue;}
  const stage=own(v,'stage'),phase=own(v,'phase'),kind=own(v,'kind');
  if(kind==='boundary'&&STAGES.includes(stage)&&['enter','return','throw'].includes(phase)){
   const key=stage+':'+phase;state.boundaries[key]=(state.boundaries[key]??0)+1;
  }else if(kind==='error'&&STAGES.includes(stage)&&Array.isArray(own(v,'errors'))){
   for(const e of v.errors.slice(0,4))addError(state,{stage,...closedError(e)});
  }else if(kind==='privacy_control'&&state.privacyControls.length<4)state.privacyControls.push(closedControl(v));
  else if(kind==='identity_control'&&state.identityControls.length<4)state.identityControls.push(Object.fromEntries(['pass','promiseIdentity','errorIdentity','receiverIdentity'].map(k=>[k,own(v,k)===true])));
  else if(kind==='network_denied')state.networkDenied++;
 }
}
function emptyEvidence(){return {purpose:'afw.failure-boundaries.reporter.v1',testEvents:{selectedPassed:0,selectedFailed:0,filteredSkipped:0,wrapperFailed:0,unexpected:0,registered:0},summary:{},boundaries:{},errors:{},errorOverflow:0,privacyControls:[],identityControls:[],networkDenied:0};}
export default async function* reporter(source){
 const state=emptyEvidence();
 for await(const event of source){
  const d=event.data,type=event.type;
  if(type==='test:stdout'||type==='test:stderr')absorbMarker(d,state);
  else if(type==='test:pass'||type==='test:fail'){
   const details=own(d,'details'),e=own(details,'error'),ft=own(e,'failureType'),name=own(d,'name'),selected=CASES.indexOf(name);
   if(ft==='subtestsFailed')state.testEvents.wrapperFailed++;
   else{
    state.testEvents.registered++;
    if(selected>=0){if(type==='test:fail')state.testEvents.selectedFailed++;else if(!own(d,'skip'))state.testEvents.selectedPassed++;else state.testEvents.unexpected++;}
    else if(own(d,'skip'))state.testEvents.filteredSkipped++;else state.testEvents.unexpected++;
   }
   if(type==='test:fail')for(const row of safeError(e))addError(state,{case:selected<0?'wrapper':selected===0?'own':'adoption',failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(ft)?ft:null,...row});
  }else if(type==='test:summary'){
   const c=own(d,'counts');
   for(const [from,to]of [['tests','tests'],['passed','pass'],['failed','fail'],['cancelled','cancelled'],['skipped','skipped'],['todo','todo']]){const n=number(own(c,from));if(n!==null)state.summary[to]=n;}
  }else if(type==='test:diagnostic'){
   const m=own(d,'message');if(typeof m==='string'&&m.length<64){const match=/^(tests|pass|fail|cancelled|skipped|todo) ([0-9]{1,6})$/.exec(m);if(match&&number(Number(match[2]))!==null)state.summary[match[1]]=Number(match[2]);}
  }
 }
 const result={...state,errors:Object.values(state.errors)};
 const text=JSON.stringify(result);yield Buffer.byteLength(text)<=MAX_SAFE?text+'\n':JSON.stringify({purpose:state.purpose,status:'safe_output_cap'})+'\n';
}
function sanitizeEvidence(v){
 if(own(v,'purpose')!=='afw.failure-boundaries.reporter.v1')return null;
 const state=emptyEvidence();state.errors=[];
 for(const k of Object.keys(state.testEvents)){const n=number(own(own(v,'testEvents'),k));if(n===null)return null;state.testEvents[k]=n;}
 for(const k of ['tests','pass','fail','cancelled','skipped','todo']){const n=number(own(own(v,'summary'),k));if(n!==null)state.summary[k]=n;}
 for(const stage of STAGES)for(const phase of ['enter','return','throw']){const k=stage+':'+phase,n=number(own(own(v,'boundaries'),k));if(n!==null)state.boundaries[k]=n;}
 const errors=own(v,'errors');if(!Array.isArray(errors)||errors.length>96)return null;
 for(const e of errors){
  const stage=own(e,'stage'),c=own(e,'case'),failureType=own(e,'failureType'),count=number(own(e,'count'));
  if(count===null)return null;
  state.errors.push({...STAGES.includes(stage)?{stage}:{case:['own','adoption','wrapper'].includes(c)?c:'wrapper',failureType:['subtestsFailed','testCodeFailure','cancelledByParent'].includes(failureType)?failureType:null},...closedError(e),count});
 }
 state.errorOverflow=number(own(v,'errorOverflow'));state.networkDenied=number(own(v,'networkDenied'));
 for(const key of ['privacyControls','identityControls']){const rows=own(v,key);if(!Array.isArray(rows)||rows.length>4)return null;state[key]=rows.map(x=>key==='privacyControls'?closedControl(x):Object.fromEntries(['pass','promiseIdentity','errorIdentity','receiverIdentity'].map(k=>[k,own(x,k)===true])));}
 return state;
}
function git(cwd,args){
 const r=spawnSync('git',args,{cwd,encoding:'utf8',timeout:10000,maxBuffer:2097152,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,GIT_CONFIG_NOSYSTEM:'1'}});
 if(r.status!==0)reject();return r.stdout;
}
function tuples(raw){
 return raw.split('\0').filter(Boolean).map(x=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(x);if(!m||m[3].startsWith('/')||m[3].split('/').includes('..'))reject();return {mode:m[1],sha:m[2],path:m[3]};});
}
async function inventory(root,leaves){
 const rows=[];for(const leaf of leaves){const p=join(root,leaf.path),s=await lstat(p);if(!s.isFile()||s.isSymbolicLink()||((s.mode&0o111)!==0)!==(leaf.mode==='100755'))reject();if(blob(await readFile(p))!==leaf.sha)reject();rows.push([leaf.path,leaf.mode,leaf.sha]);}return hash(JSON.stringify(rows));
}
async function runChild(cwd,privateDir){
 const handles=await Promise.all(['stdout','stderr'].map(n=>open(join(privateDir,'raw.'+n),'wx',0o600)));
 const digests=[createHash('sha256'),createHash('sha256')],sizes=[0,0],chunks=[];let reason=null,killer=null;
 const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',AFB_CHILD:'FIXED_TWO_CASES',AFB_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
 const child=spawn(process.execPath,['--import',pathToFileURL(SELF).href,'--test','--test-name-pattern='+PATTERN,'--test-reporter='+pathToFileURL(SELF).href,...TESTS],{cwd,env,detached:true,stdio:['ignore','pipe','pipe']});
 const terminate=why=>{if(reason)return;reason=why;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},5000);};
 const parentStop=()=>terminate('parent_terminated');process.once('SIGTERM',parentStop);process.once('SIGINT',parentStop);
 const deadline=setTimeout(()=>terminate('deadline_110s'),110000);
 const pumps=[child.stdout,child.stderr].map(async(stream,i)=>{for await(const chunk of stream){if(sizes[0]+sizes[1]+chunk.length>MAX_RAW){terminate('raw_output_cap');continue;}sizes[i]+=chunk.length;digests[i].update(chunk);await handles[i].write(chunk);if(i===0&&sizes[0]<=MAX_SAFE)chunks.push(chunk);else if(i===0)terminate('safe_output_cap');}});
 const exit=await new Promise(resolve=>{child.once('error',()=>resolve({code:null,signal:null,spawnFailed:true}));child.once('close',(code,signal)=>resolve({code,signal:['SIGTERM','SIGKILL'].includes(signal)?signal:null,spawnFailed:false}));});
 await Promise.all(pumps);clearTimeout(deadline);clearTimeout(killer);process.removeListener('SIGTERM',parentStop);process.removeListener('SIGINT',parentStop);await Promise.all(handles.map(h=>h.close()));
 let evidence=null;try{const bytes=Buffer.concat(chunks);if(bytes.length<=MAX_SAFE)evidence=sanitizeEvidence(JSON.parse(bytes.toString('utf8')));}catch{}
 return {exit,termination:reason,evidence,rawFiles:['stdout','stderr'].map((name,i)=>({name:'raw.'+name,bytes:sizes[i],sha256:digests[i].digest('hex'),uploaded:false})),privateLogsUploaded:false};
}
async function preserve(output,report){
 let text=JSON.stringify(report,null,2)+'\n';
 if(Buffer.byteLength(text)>MAX_SAFE)text=JSON.stringify({purpose:'afw.failure-boundaries.diagnostic.v1',status:'safe_output_cap',...flags})+'\n';
 await writeFile(join(output,'result.json'),text,{mode:0o600});
 const manifest={purpose:'afw.failure-boundaries.manifest.v1',inventory:[{name:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text)}],rawLogsUploaded:false,...flags};
 await writeFile(join(output,'manifest.json'),JSON.stringify(manifest)+'\n',{mode:0o600});
}
async function main(){
 if(process.argv.length!==2||process.platform!=='linux'||process.version!=='v22.23.4')reject();
 if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_EVENT_NAME!=='workflow_dispatch'||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();
 const subject=resolve('subject'),runner=process.env.RUNNER_TEMP;
 if(!runner||!isAbsolute(runner)||resolve(runner)===subject)reject();
 const output=resolve('failure-boundaries-safe');await mkdir(output,{recursive:true,mode:0o700});
 const context={repository:REPO,workflowRef:BRANCH,trigger:'workflow_dispatch',workflowSource:process.env.AFB_WORKFLOW_SHA,testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,node:process.version,os:'Ubuntu24.04',group:'UNSET',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,...flags};
 let report={purpose:'afw.failure-boundaries.diagnostic.v1',status:'incomplete',context,noRetry:true,...flags};
 await preserve(output,report);
 let before=null,leaves=null,parent=null,overlays=[];
 try{
  const helperRoot=dirname(dirname(dirname(SELF)));
  if(git(helperRoot,['rev-parse','HEAD']).trim()!==context.workflowSource)reject();
  if(git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')reject();
  leaves=tuples(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
  if(leaves.length!==3188||leaves.find(x=>x.path==='package.json')?.sha!=='f4fd38ac380c46a149d8cf0f3bd828a28406f761'||leaves.find(x=>x.path==='package-lock.json')?.sha!=='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b'||git(subject,['rev-parse','HEAD^{tree}']).trim()!=='7bc8b997a968dca32fc567b627de70b774d6489c')reject();
  before=await inventory(subject,leaves);
  parent=join(resolve(runner),'afb-'+context.runId);await mkdir(parent,{recursive:false,mode:0o700});
  const overlay=join(parent,'overlay');await mkdir(overlay,{mode:0o700});
  for(const leaf of leaves){const dest=join(overlay,leaf.path);await mkdir(dirname(dest),{recursive:true});await copyFile(join(subject,leaf.path),dest);await chmod(dest,leaf.mode==='100755'?0o700:0o600);}
  await symlink(join(subject,'node_modules'),join(overlay,'node_modules'),'dir');
  for(const path of Object.keys(EDITS)){
   const original=await readFile(join(subject,path),'utf8');if(blob(original)!==PINS[path])reject();
   const edited=applyEdits(original,EDITS[path]);await writeFile(join(overlay,path),edited.text,{mode:0o600});
   overlays.push({path,originalBlob:PINS[path],originalHash:hash(original),newHash:hash(edited.text),normalized:true,seams:edited.edits.map(x=>({originalLiteralHash:hash(x.from),newLiteralHash:hash(x.to),count:x.count}))});
  }
  report={...report,status:'running_or_interrupted',protectedBase:{leaves:leaves.length,before},overlays,privacy:controls(),helperHash:hash(await readFile(SELF)),selection:{files:TESTS,namePattern:PATTERN,expectedRegistered:22,expectedSelectedFailures:2,expectedFilteredSkips:20}};
  await preserve(output,report);
  const execution=await runChild(overlay,parent),e=execution.evidence,after=await inventory(subject,leaves);
  const hashes=EXPECTED_HASHES.map(h=>e?.errors.some(x=>x.messageHash===h)===true);
  const counts=e?.testEvents,countsMatch=counts?.registered===22&&counts.selectedFailed===2&&counts.selectedPassed===0&&counts.filteredSkipped===20&&counts.wrapperFailed===0&&counts.unexpected===0;
  const hasSites=['own_build:enter','own_import:throw','cf_fixture:throw','trial_generation:enter'].every(k=>(e?.boundaries[k]??0)>0);
  const complete=execution.termination===null&&execution.exit.spawnFailed===false&&execution.exit.code===1&&e?.purpose==='afw.failure-boundaries.reporter.v1'&&e.errorOverflow===0&&e.networkDenied===0&&countsMatch&&hasSites&&hashes.every(Boolean)&&e.privacyControls.length===2&&e.privacyControls.every(x=>x.pass)&&e.identityControls.length===2&&e.identityControls.every(x=>x.pass)&&report.privacy.pass&&before===after;
  report={...report,status:complete?'diagnostic_complete':'incomplete',protectedBase:{leaves:leaves.length,before,after,equal:before===after},execution,selectionCountsMatch:countsMatch,representativeHashesMatch:hashes,causalConclusion:'DEFERRED_TO_ROOT_BOUNDARY_REVIEW',allRemainingFailuresFixed:false,noRetry:true};
 }catch(error){report={...report,status:'incomplete',preparationError:safeError(error)};}
 finally{
  if(before&&leaves){try{const after=await inventory(subject,leaves);report.protectedBase={leaves:leaves.length,before,after,equal:before===after};if(before!==after)report.status='incomplete';}catch{report.status='incomplete';report.protectedBase={leaves:leaves.length,before,after:null,equal:false};}}
  await preserve(output,report);
 }
 process.exitCode=report.status==='diagnostic_complete'?0:1;
}
if(process.env.AFB_CHILD&&process.env.NODE_TEST_CONTEXT==='child-v8')installChild();
if(process.argv[1]&&resolve(process.argv[1])===SELF){try{await main();}catch{process.stderr.write('AFB diagnostic admission or preservation blocked.\n');process.exitCode=1;}}
