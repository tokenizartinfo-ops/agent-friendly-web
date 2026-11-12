// O4 fixed compile-only diagnostic. Inactive until a separately reviewed release.
import {createHash} from 'node:crypto';
import {types} from 'node:util';
import {runInNewContext} from 'node:vm';
import {createRequire} from 'node:module';
import {getHeapStatistics} from 'node:v8';
import {readFile,writeFile,mkdir,lstat,open} from 'node:fs/promises';
import {spawn,spawnSync} from 'node:child_process';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import * as net from 'node:net';
import * as tls from 'node:tls';
import * as http from 'node:http';
import * as https from 'node:https';
const SELF=fileURLToPath(import.meta.url);
const SUBJECT='f5f52660d19ec9fc634bbc49558db75582fdaf88';
const SOURCE_TREE='7bc8b997a968dca32fc567b627de70b774d6489c';
const REPO='tokenizartinfo-ops/agent-friendly-web';
const REF='refs/heads/diag/afw-own-literal-20261112';
const TEST='test/mcp-own-finite-entrypoints.test.mjs';
const TEST_BLOB='674419ca51328b128bba483f44001e12f1e4b9f5';
const LOCK_BLOB='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b';
const PACKAGE_BLOB='f4fd38ac380c46a149d8cf0f3bd828a28406f761';
const TARGET='9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff';
const HEAP_BYTES=268435456,HEAP_FLAG='--max-heap-size=256';
const EXPECTED_EMISSION=Object.freeze({bytes:2111553,sha256:'2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2'});
const LIMITS=Object.freeze({emission:4194304,allocations:600000,visits:600000,candidates:4096,depth:32,payload:1048576,folded:8388608,result:65536,raw:8388608,matches:128});
const MAX_MESSAGE=1048576;
const REASONS=['admission','source_pin','dependency_pin','ast_shape','allocation_cap','visit_cap','heap_limit','emission_identity','candidate_cap','fold_depth','payload_cap','folded_cap','match_cap','emission_cap','control_failure','unexpected_failure'];
const PHASES=['admission','source','dependencies','build','parse','dictionary','complete'];
const STATES=['incomplete','inspection_complete'];
const UNKNOWN=['unsupported_ast','invalid_template','nonfinite_number','missing_payload','nonstring_payload'];
const flags={operationalReadiness:false,completePackage:false,PCoff:false};
const hash=value=>createHash('sha256').update(value).digest('hex');
const blob=value=>createHash('sha1').update('blob '+Buffer.byteLength(value)+'\0').update(value).digest('hex');
const own=(value,key)=>{try{if(types.isProxy(value))return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
const hex=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value)?value:null;
const number=(value,max=200000)=>Number.isSafeInteger(value)&&value>=0&&value<=max?value:null;
const stop=reason=>{const e=new Error('O4 inspection unavailable');Object.defineProperty(e,'o4Reason',{value:REASONS.includes(reason)?reason:'unexpected_failure'});throw e;};
const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
const PROTOS=INTRINSICS.map(x=>x.prototype);
const CLASS_NAMES=NAMES.slice(0,8);
const ORIGINAL_BUILD=" const result=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'node',define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify(profile)},plugins:[{name:'synthetic-platform-base',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'base',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:'export class DurableObject{constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint{constructor(ctx,env){this.ctx=ctx;this.env=env;}}'}));}}]});";
const DEPENDENCY_PINS={"esbuild":{"version":"0.28.2","integrity":"sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA=="},"acorn":{"version":"8.18.0","integrity":"sha512-lGq+9yr1/GuAWaVYIHRjvvySG5/4VfKIvC8EWxStPdcDh/Ka7FG3twP6v4d5BkravUilhIAsG4Qj83t02LWUPQ=="}};
function profile(error,depth){
 let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
 try{
  nativeError=types.isNativeError(error);
  if(nativeError){
   let p=Object.getPrototypeOf(error);
   const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
   for(let i=1;i<=4&&p;i++){
    if(types.isProxy(p))break;
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
 let proxyTrapTouches=0;
 const proxyRows=['direct','nested','revoked'].map(kind=>{
  const handler={getPrototypeOf(){proxyTrapTouches++;throw new Error('private proxy trap');},getOwnPropertyDescriptor(){proxyTrapTouches++;throw new Error('private proxy trap');},get(){proxyTrapTouches++;throw new Error('private proxy trap');}};
  const revocable=Proxy.revocable({},handler),proxy=revocable.proxy,error=new Error(canary);
  Object.setPrototypeOf(error,kind==='nested'?Object.create(proxy):proxy);
  if(kind==='revoked')revocable.revoke();
  return safeError(error)[0];
 });
 const proxyPrototypesSafe=proxyTrapTouches===0&&proxyRows.every(row=>row.nativeError&&row.currentRealmPrototype===null&&row.observedDataPrototypeName===null&&row.prototypeDepth===null);
 const rows=[ordinary,cross,spoof,guarded,large,cycle].map(safeError),wire=JSON.stringify({rows,proxyRows});
 const pass=touches===0&&proxyPrototypesSafe&&!wire.includes(canary)&&rows[0][0].nativeError&&rows[0][0].currentRealmPrototype==='TypeError'&&rows[1][0].nativeError&&rows[1][0].currentRealmPrototype===null&&rows[1][0].observedDataPrototypeName==='TypeError'&&!rows[2][0].nativeError&&rows[2][0].prototypeDepth===null&&rows[3][0].name===null&&rows[4][0].messageHash===null&&rows[4][0].messageTooLarge&&rows[5].length===1;
 return {pass,getterTouches:touches,proxyTrapTouches,proxyPrototypesSafe,ordinaryNative:rows[0][0].nativeError,crossRealmNative:rows[1][0].nativeError,crossRealmExactUnknown:rows[1][0].currentRealmPrototype===null,spoofRejected:!rows[2][0].nativeError,oversizeSuppressed:rows[4][0].messageTooLarge,cycleBounded:rows[5].length===1,rawCanaryAbsent:!wire.includes(canary)};
}
function closedControl(v){
 return Object.fromEntries(['pass','proxyPrototypesSafe','ordinaryNative','crossRealmNative','crossRealmExactUnknown','spoofRejected','oversizeSuppressed','cycleBounded','rawCanaryAbsent'].map(k=>[k,own(v,k)===true]).concat([['getterTouches',number(own(v,'getterTouches'))],['proxyTrapTouches',number(own(v,'proxyTrapTouches'))]]));
}

function newProgress(){return {state:'observed',allocationAttempts:0,allocationCompletions:0,uniqueVisitAttempts:0,uniqueVisitCompletions:0};}
function beginProgress(progress,kind){
 const allocation=kind==='allocation',key=allocation?'allocationAttempts':'uniqueVisitAttempts',limit=allocation?LIMITS.allocations:LIMITS.visits;
 progress[key]++;if(progress[key]>limit)stop(allocation?'allocation_cap':'visit_cap');
}
function completeProgress(progress,kind){progress[kind==='allocation'?'allocationCompletions':'uniqueVisitCompletions']++;}
function closedProgress(progress){
 const unknown={state:'UNKNOWN',allocationAttempts:null,allocationCompletions:null,uniqueVisitAttempts:null,uniqueVisitCompletions:null};
 if(own(progress,'state')!=='observed')return unknown;
 const out={state:'observed'};
 for(const [key,maximum]of [['allocationAttempts',LIMITS.allocations+1],['allocationCompletions',LIMITS.allocations],['uniqueVisitAttempts',LIMITS.visits+1],['uniqueVisitCompletions',LIMITS.visits]]){
  const n=number(own(progress,key),maximum);if(n===null)return unknown;out[key]=n;
 }
 if(out.allocationCompletions>out.allocationAttempts||out.uniqueVisitCompletions>out.uniqueVisitAttempts)return unknown;
 return out;
}
function heapRecord(limit){
 return {kind:'V8_HEAP_ONLY',flag:HEAP_FLAG,requestedBytes:HEAP_BYTES,heapSizeLimitBytes:number(limit,2147483648),verified:Number.isSafeInteger(limit)&&limit>0&&limit<=HEAP_BYTES,rssBounded:false,externalBuffersBounded:false,compilerSubprocessBounded:false};
}
function fold(node,depth,state){
 if(depth>32)stop('fold_depth');
 const type=own(node,'type');
 const made=value=>{
  if(typeof value==='string'){
   const bytes=Buffer.byteLength(value);
   if(bytes>LIMITS.payload)stop('payload_cap');
   state.foldedBytes+=bytes;if(state.foldedBytes>LIMITS.folded)stop('folded_cap');
  }
  return {known:true,value};
 };
 if(type==='Literal'){
  if(own(node,'regex')!==undefined||own(node,'bigint')!==undefined)return {known:false,reason:'unsupported_ast'};
  const value=own(node,'value');
  if(value===null||['string','boolean'].includes(typeof value))return made(value);
  if(typeof value==='number'&&Number.isFinite(value))return made(value);
  return {known:false,reason:'unsupported_ast'};
 }
 if(type==='BinaryExpression'&&own(node,'operator')==='+'){
  const left=fold(own(node,'left'),depth+1,state);if(!left.known)return left;
  const right=fold(own(node,'right'),depth+1,state);if(!right.known)return right;
  if(typeof left.value==='string'||typeof right.value==='string')return made(primitiveString(left.value)+primitiveString(right.value));
  const number=primitiveNumber(left.value)+primitiveNumber(right.value);
  return Number.isFinite(number)?made(number):{known:false,reason:'nonfinite_number'};
 }
 if(type==='TemplateLiteral'){
  const parts=own(node,'quasis'),values=own(node,'expressions'),pl=own(parts,'length'),vl=own(values,'length');
  if(types.isProxy(parts)||types.isProxy(values)||!Array.isArray(parts)||!Array.isArray(values)||!Number.isSafeInteger(pl)||!Number.isSafeInteger(vl)||pl!==vl+1)return {known:false,reason:'invalid_template'};
  let text='';
  for(let i=0;i<pl;i++){
   const cooked=own(own(own(parts,String(i)),'value'),'cooked');
   if(typeof cooked!=='string')return {known:false,reason:'invalid_template'};
   text+=cooked;made(text);
   if(i<vl){const item=fold(own(values,String(i)),depth+1,state);if(!item.known)return item;text+=primitiveString(item.value);made(text);}
  }
  return made(text);
 }
 return {known:false,reason:'unsupported_ast'};
}
function primitiveString(value){
 if(value===null)return 'null';
 if(typeof value==='string')return value;
 if(typeof value==='boolean')return value?'true':'false';
 if(typeof value==='number'&&Number.isFinite(value))return String(value);
 stop('ast_shape');
}
function primitiveNumber(value){
 if(value===null)return 0;
 if(typeof value==='boolean')return value?1:0;
 if(typeof value==='number'&&Number.isFinite(value))return value;
 stop('ast_shape');
}
function errorSyntax(node){
 return ['NewExpression','CallExpression'].includes(own(node,'type'))&&CLASS_NAMES.includes(own(own(node,'callee'),'name'))&&own(own(node,'callee'),'type')==='Identifier';
}
function inspect(ast,progress){
 const pending=[ast],seen=new Set(),candidates=[];let nodes=0;
 while(pending.length){
  const node=pending.pop();if(!node||typeof node!=='object')continue;
  if(types.isProxy(node))stop('ast_shape');
  if(seen.has(node))continue;seen.add(node);
  const type=own(node,'type');
  if(typeof type==='string'){
   beginProgress(progress,'visit');nodes++;
   let candidate=null;
   if(errorSyntax(node)){
    candidate={node:own(own(node,'arguments'),'0'),syntax:type==='NewExpression'?'named_error_new':'named_error_call',start:own(node,'start')};
   }else if(type==='ThrowStatement'&&!errorSyntax(own(node,'argument'))){
    candidate={node:own(node,'argument'),syntax:'throw_payload',start:own(node,'start')};
   }
   if(candidate){if(!Number.isSafeInteger(candidate.start)||candidate.start<0||candidate.start>LIMITS.emission)stop('ast_shape');candidates.push(candidate);}
   if(candidates.length>LIMITS.candidates)stop('candidate_cap');
  }
  for(const descriptor of Object.values(Object.getOwnPropertyDescriptors(node))){
   if(!Object.hasOwn(descriptor,'value'))stop('ast_shape');
   const value=descriptor.value;
   if(value&&typeof value==='object'&&(Array.isArray(value)||typeof own(value,'type')==='string'))pending.push(value);
  }
  if(typeof type==='string')completeProgress(progress,'visit');
 }
 candidates.sort((a,b)=>a.start-b.start);
 const state={foldedBytes:0},unknown={},matches=[];let folded=0;
 for(let index=0;index<candidates.length;index++){
  const candidate=candidates[index];
  const value=candidate.node?fold(candidate.node,0,state):{known:false,reason:'missing_payload'};
  if(!value.known||typeof value.value!=='string'){
   const reason=value.known?'nonstring_payload':value.reason;unknown[reason]=(unknown[reason]??0)+1;continue;
  }
  folded++;const sha256=hash(value.value);
  if(sha256===TARGET){if(matches.length>=128)stop('match_cap');matches.push({site:index,syntax:candidate.syntax,payloadHash:TARGET,intrinsicConstructorIdentityProven:false,executedOriginProven:false});}
 }
 return {nodes,candidates:candidates.length,folded,unknown,foldedBytes:state.foldedBytes,matches,conclusion:matches.length?'STATIC_CANDIDATE_MATCH_NOT_EXECUTION_PROOF':'NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY',moduleAttribution:false};
}
function metadataControls(){
 const literal=value=>({type:'Literal',value});
 const plus=(left,right)=>({type:'BinaryExpression',operator:'+',left,right});
 const state=()=>({foldedBytes:0});
 const a=fold(literal('O4_PRIVATE_CANARY'),0,state());
 const b=fold(plus(literal('a'),plus(literal(1),literal(2))),0,state());
 const c=fold({type:'TemplateLiteral',quasis:[{value:{cooked:'a'}},{value:{cooked:'b'}}],expressions:[literal(null)]},0,state());
 const d=fold(plus(literal(true),literal(null)),0,state());
 let touches=0;const getter={type:'Literal'};Object.defineProperty(getter,'value',{get(){touches++;throw 0;}});
 const e=fold(getter,0,state()),f=fold(new Proxy({},{get(){touches++;throw 0;},getOwnPropertyDescriptor(){touches++;throw 0;}}),0,state());
 const g=fold({type:'CallExpression'},0,state());
 const flags={literal:a.known&&hash(a.value)===hash('O4_PRIVATE_CANARY'),addition:b.known&&b.value==='a3',template:c.known&&c.value==='anullb',primitiveAddition:d.known&&d.value===1,gettersUntouched:touches===0&&!e.known,proxyUntouched:touches===0&&!f.known,callNotEvaluated:!g.known};
 return {pass:Object.values(flags).every(Boolean),cases:7,touches,...flags};
}


let deniedNetwork=0;
function fenceNetwork(){
 const denied=()=>{deniedNetwork++;stop('admission');};
 globalThis.fetch=denied;net.Socket.prototype.connect=denied;
 net.default.connect=denied;net.default.createConnection=denied;tls.default.connect=denied;
 http.default.request=denied;http.default.get=denied;https.default.request=denied;https.default.get=denied;
}
async function compileChild(){
 const progress=newProgress();
 let phase='admission',report={purpose:'afw.own-literal.child.v1',status:'incomplete',...flags};
 try{
  if(process.argv.length!==2||process.version!=='v22.23.4'||process.platform!=='linux'||process.env.O4_COMPILE_CHILD!=='FIXED_OWN_LITERAL'||process.env.O4_SUBJECT!==SUBJECT)stop('admission');
  report.heap=heapRecord(getHeapStatistics().heap_size_limit);
  if(process.execArgv.length!==1||process.execArgv[0]!==HEAP_FLAG||!report.heap.verified)stop('heap_limit');
  fenceNetwork();
  report.privacy=controls();report.metadata=metadataControls();
  if(!report.privacy.pass||!report.metadata.pass)stop('control_failure');
  phase='source';const subject=process.cwd(),test=await readFile(join(subject,TEST),'utf8'),lockText=await readFile(join(subject,'package-lock.json'),'utf8');
  if(blob(test)!==TEST_BLOB||blob(lockText)!==LOCK_BLOB||test.split('\n')[6]!==ORIGINAL_BUILD)stop('source_pin');
  const lock=JSON.parse(lockText),requireSubject=createRequire(pathToFileURL(join(subject,TEST)));
  phase='dependencies';
  for(const name of ['esbuild','acorn']){
   const actual=lock.packages?.['node_modules/'+name],pin=DEPENDENCY_PINS[name];
   if(actual?.version!==pin.version||actual?.integrity!==pin.integrity)stop('dependency_pin');
   const installed=JSON.parse(await readFile(join(subject,'node_modules',name,'package.json'),'utf8'));
   if(installed.version!==pin.version)stop('dependency_pin');
   if(name==='esbuild'&&(installed.exports!==undefined||installed.main!=='lib/main.js'||installed.type==='module'))stop('dependency_pin');
  }
  const compilerEntry=requireSubject.resolve('esbuild');
  if(resolve(compilerEntry)!==join(subject,'node_modules','esbuild','lib','main.js'))stop('dependency_pin');
  const binary=await lstat(join(subject,'node_modules','@esbuild','linux-x64','bin','esbuild'));
  if(!binary.isFile()||binary.isSymbolicLink())stop('dependency_pin');
  const {build}=await import(pathToFileURL(compilerEntry).href);
  const profile='finite_trial_event';
  phase='build';
 const result=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'node',define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify(profile)},plugins:[{name:'synthetic-platform-base',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'base',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:'export class DurableObject{constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint{constructor(ctx,env){this.ctx=ctx;this.env=env;}}'}));}}]});
  if(!Array.isArray(result.outputFiles)||result.outputFiles.length!==1)stop('emission_cap');
  const emission=result.outputFiles[0].text;
  if(typeof emission!=='string'||Buffer.byteLength(emission)>LIMITS.emission)stop('emission_cap');
  report.emission={bytes:Buffer.byteLength(emission),sha256:hash(emission),imported:false,evaluated:false};
  report.emission.identityMatches=report.emission.bytes===EXPECTED_EMISSION.bytes&&report.emission.sha256===EXPECTED_EMISSION.sha256;
  if(!report.emission.identityMatches)stop('emission_identity');
  report.build={profile:'finite_trial_event',literalHash:hash(ORIGINAL_BUILD),compiler:'0.28.2',warnings:number(result.warnings?.length),outputFiles:1};
  phase='parse';
  const parserEntry=requireSubject.resolve('acorn');
  if(resolve(parserEntry)!==join(subject,'node_modules','acorn','dist','acorn.js'))stop('dependency_pin');
  const {Parser}=requireSubject('acorn');
  class BoundedParser extends Parser{
   startNode(){beginProgress(progress,'allocation');const node=super.startNode();completeProgress(progress,'allocation');return node;}
   startNodeAt(...args){beginProgress(progress,'allocation');const node=super.startNodeAt(...args);completeProgress(progress,'allocation');return node;}
   copyNode(...args){beginProgress(progress,'allocation');const node=super.copyNode(...args);completeProgress(progress,'allocation');return node;}
  }
  const ast=BoundedParser.parse(emission,{ecmaVersion:'latest',sourceType:'module'});
  phase='dictionary';report.inspection=inspect(ast,progress);
  report.parser={name:'acorn',version:'8.18.0',sourceType:'module',errorRecovery:false,allocationAttempts:progress.allocationAttempts,allocationCompletions:progress.allocationCompletions};
  if(deniedNetwork!==0)stop('control_failure');
  phase='complete';report.status='inspection_complete';
 }catch(error){report={...report,status:'incomplete',phase,reason:REASONS.includes(own(error,'o4Reason'))?own(error,'o4Reason'):'unexpected_failure',error:safeError(error)};}
 report.progress=closedProgress(progress);
 report.networkDenied=deniedNetwork;
 const text=JSON.stringify(report);
 process.stdout.write(Buffer.byteLength(text)<=LIMITS.result?text+'\n':JSON.stringify({purpose:report.purpose,status:'incomplete',reason:'unexpected_failure',...flags})+'\n');
 process.exitCode=report.status==='inspection_complete'?0:1;
}

function closedChild(value){
 if(own(value,'purpose')!=='afw.own-literal.child.v1'||!STATES.includes(own(value,'status')))return null;
 const out={purpose:'afw.own-literal.child.v1',status:own(value,'status'),progress:closedProgress(own(value,'progress')),networkDenied:number(own(value,'networkDenied')),phase:PHASES.includes(own(value,'phase'))?own(value,'phase'):null,reason:REASONS.includes(own(value,'reason'))?own(value,'reason'):null,...flags};
 const rawHeap=own(value,'heap');
 if(rawHeap){
  out.heap=heapRecord(own(rawHeap,'heapSizeLimitBytes'));
  out.heap.verified=out.heap.verified&&own(rawHeap,'verified')===true&&own(rawHeap,'kind')==='V8_HEAP_ONLY'&&own(rawHeap,'flag')===HEAP_FLAG&&own(rawHeap,'requestedBytes')===HEAP_BYTES&&own(rawHeap,'rssBounded')===false&&own(rawHeap,'externalBuffersBounded')===false&&own(rawHeap,'compilerSubprocessBounded')===false;
 }
 out.privacy=closedControl(own(value,'privacy'));
 const meta=own(value,'metadata');
 out.metadata=Object.fromEntries(['pass','literal','addition','template','primitiveAddition','gettersUntouched','proxyUntouched','callNotEvaluated'].map(key=>[key,own(meta,key)===true]));
 out.metadata.cases=number(own(meta,'cases'),7);out.metadata.touches=number(own(meta,'touches'));
 const errors=own(value,'error');out.error=Array.isArray(errors)?errors.slice(0,4).map(closedError):[];
 const emission=own(value,'emission');
 if(emission){const bytes=number(own(emission,'bytes'),LIMITS.emission),sha256=hex(own(emission,'sha256'));out.emission={bytes,sha256,identityMatches:bytes===EXPECTED_EMISSION.bytes&&sha256===EXPECTED_EMISSION.sha256,imported:false,evaluated:false};}
 const build=own(value,'build');
 if(build)out.build={profile:'finite_trial_event',literalHash:hex(own(build,'literalHash')),compiler:'0.28.2',warnings:number(own(build,'warnings')),outputFiles:number(own(build,'outputFiles'),1)};
 const parser=own(value,'parser');
 if(parser)out.parser={name:'acorn',version:'8.18.0',sourceType:'module',errorRecovery:false,allocationAttempts:number(own(parser,'allocationAttempts'),LIMITS.allocations+1),allocationCompletions:number(own(parser,'allocationCompletions'),LIMITS.allocations)};
 const inspection=own(value,'inspection');
 if(inspection){
  const unknown={};for(const key of UNKNOWN){const n=number(own(own(inspection,'unknown'),key),LIMITS.candidates);if(n!==null)unknown[key]=n;}
  const rows=own(inspection,'matches');if(!Array.isArray(rows)||rows.length>128)return null;
  const matches=[];
  for(const row of rows){
   const site=number(own(row,'site'),LIMITS.candidates-1),syntax=own(row,'syntax');
   if(site===null||!['named_error_new','named_error_call','throw_payload'].includes(syntax)||own(row,'payloadHash')!==TARGET)return null;
   matches.push({site,syntax,payloadHash:TARGET,intrinsicConstructorIdentityProven:false,executedOriginProven:false});
  }
  out.inspection={nodes:number(own(inspection,'nodes'),LIMITS.visits),candidates:number(own(inspection,'candidates'),LIMITS.candidates),folded:number(own(inspection,'folded'),LIMITS.candidates),foldedBytes:number(own(inspection,'foldedBytes'),LIMITS.folded),unknown,matches,conclusion:matches.length?'STATIC_CANDIDATE_MATCH_NOT_EXECUTION_PROOF':'NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY',moduleAttribution:false};
 }
 if(out.status==='inspection_complete'){
  const i=out.inspection,b=out.build,e=out.emission;
  if(!out.privacy.pass||out.privacy.getterTouches!==0||out.privacy.proxyTrapTouches!==0||!out.metadata.pass||out.metadata.cases!==7||out.metadata.touches!==0||!['literal','addition','template','primitiveAddition','gettersUntouched','proxyUntouched','callNotEvaluated'].every(key=>out.metadata[key])||out.networkDenied!==0||!i||!b||!e||e.bytes===null||e.sha256===null||b.literalHash!==hash(ORIGINAL_BUILD)||b.warnings===null||b.outputFiles!==1||!out.heap?.verified||!e.identityMatches||out.progress.state!=='observed'||out.progress.allocationAttempts!==out.progress.allocationCompletions||out.progress.uniqueVisitAttempts!==out.progress.uniqueVisitCompletions||!out.parser||out.parser.allocationAttempts===null||out.parser.allocationCompletions===null||out.progress.allocationAttempts!==out.parser.allocationAttempts||out.progress.allocationCompletions!==out.parser.allocationCompletions||out.progress.uniqueVisitCompletions!==i.nodes||i.nodes===null||i.candidates===null||i.folded===null||i.foldedBytes===null||i.folded+Object.values(i.unknown).reduce((a,n)=>a+n,0)!==i.candidates||i.matches.length>i.folded)return null;
 }
 return out;
}
function git(cwd,args){
 const result=spawnSync('git',args,{cwd,encoding:'utf8',timeout:5000,maxBuffer:2097152,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,GIT_CONFIG_NOSYSTEM:'1'}});
 if(result.status!==0)stop('source_pin');return result.stdout;
}
function leaves(raw){return raw.split('\0').filter(Boolean).map(value=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(value);if(!m||m[3].startsWith('/')||m[3].split('/').includes('..'))stop('source_pin');return {mode:m[1],sha:m[2],path:m[3]};});}
async function inventory(subject,files){
 const rows=[];
 for(const file of files){
  const path=join(subject,file.path),info=await lstat(path);
  if(!info.isFile()||info.isSymbolicLink()||((info.mode&0o111)!==0)!==(file.mode==='100755')||blob(await readFile(path))!==file.sha)stop('source_pin');
  rows.push([file.path,file.mode,file.sha]);
 }
 return hash(JSON.stringify(rows));
}
async function capture(subject,privateDir){
 const handles=await Promise.all(['stdout','stderr'].map(name=>open(join(privateDir,'raw.'+name),'wx',0o600)));
 const sizes=[0,0],digests=[createHash('sha256'),createHash('sha256')],chunks=[];let termination=null,killer=null;
 const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',O4_COMPILE_CHILD:'FIXED_OWN_LITERAL',O4_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
 const child=spawn(process.execPath,[HEAP_FLAG,SELF],{cwd:subject,env,detached:true,stdio:['ignore','pipe','pipe']});
 const end=reason=>{if(termination)return;termination=reason;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},3000);};
 const parentStop=()=>end('parent_terminated');process.once('SIGTERM',parentStop);process.once('SIGINT',parentStop);
 const deadline=setTimeout(()=>end('child_45s'),45000);
 const pumps=[child.stdout,child.stderr].map(async(stream,index)=>{for await(const bytes of stream){
  if(sizes[0]+sizes[1]+bytes.length>LIMITS.raw){end('raw_cap');continue;}
  sizes[index]+=bytes.length;digests[index].update(bytes);await handles[index].write(bytes);
  if(index===0&&sizes[0]<=LIMITS.result)chunks.push(bytes);else if(index===0)end('safe_cap');
 }});
 const exit=await new Promise(done=>{child.once('error',()=>done({code:null,signal:null,spawnFailed:true}));child.once('close',(code,signal)=>done({code,signal:['SIGTERM','SIGKILL'].includes(signal)?signal:null,spawnFailed:false}));});
 await Promise.all(pumps);clearTimeout(deadline);clearTimeout(killer);process.removeListener('SIGTERM',parentStop);process.removeListener('SIGINT',parentStop);await Promise.all(handles.map(handle=>handle.close()));
 let evidence=null;try{const raw=Buffer.concat(chunks);if(raw.length<=LIMITS.result)evidence=closedChild(JSON.parse(raw.toString('utf8')));}catch{}
 return {exit,termination,evidence,progress:closedProgress(own(evidence,'progress')),rawFiles:['stdout','stderr'].map((name,index)=>({name:'raw.'+name,bytes:sizes[index],sha256:digests[index].digest('hex'),uploaded:false})),rawLogsUploaded:false};
}
async function preserve(output,report){
 let text=JSON.stringify(report,null,2)+'\n';
 if(Buffer.byteLength(text)>LIMITS.result)text=JSON.stringify({purpose:'afw.own-literal.inspection.v1',status:'incomplete',reason:'safe_cap',...flags})+'\n';
 await writeFile(join(output,'result.json'),text,{mode:0o600});
 await writeFile(join(output,'manifest.json'),JSON.stringify({purpose:'afw.own-literal.manifest.v1',inventory:[{name:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text)}],rawLogsUploaded:false,...flags})+'\n',{mode:0o600});
}
async function main(){
 if(process.argv.length!==2||process.platform!=='linux'||process.version!=='v22.23.4'||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==REF||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.O4_WORKFLOW_SHA??''))stop('admission');
 const output=resolve('own-literal-safe');await mkdir(output,{recursive:true,mode:0o700});
 const context={repository:REPO,workflowRef:REF,trigger:process.env.GITHUB_EVENT_NAME,workflowSource:process.env.O4_WORKFLOW_SHA,testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,node:process.version,os:'Ubuntu24.04',mode:'SYN_COMPILE_ONLY_NO_IMPORT',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,...flags};
 let report={purpose:'afw.own-literal.inspection.v1',status:'incomplete',context,targetHash:TARGET,expectedEmission:EXPECTED_EMISSION,heapBudget:{flag:HEAP_FLAG,bytes:HEAP_BYTES,kind:'V8_HEAP_ONLY',rssBounded:false,externalBuffersBounded:false,compilerSubprocessBounded:false},progress:closedProgress(null),limits:LIMITS,noRetry:true,...flags};
 await preserve(output,report);
 const subject=resolve('subject');let files=null,before=null;
 try{
  if(git(dirname(dirname(dirname(SELF))),['rev-parse','HEAD']).trim()!==context.workflowSource||git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['rev-parse','HEAD^{tree}']).trim()!==SOURCE_TREE||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')stop('source_pin');
  files=leaves(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
  if(files.length!==3188||files.find(x=>x.path===TEST)?.sha!==TEST_BLOB||files.find(x=>x.path==='package-lock.json')?.sha!==LOCK_BLOB||files.find(x=>x.path==='package.json')?.sha!==PACKAGE_BLOB)stop('source_pin');
  before=await inventory(subject,files);
  const privateRoot=process.env.RUNNER_TEMP;if(typeof privateRoot!=='string'||!privateRoot.startsWith('/'))stop('admission');
  const privateDir=join(resolve(privateRoot),'o4-'+context.runId);await mkdir(privateDir,{recursive:false,mode:0o700});
  report={...report,status:'running_or_interrupted',protectedBase:{leaves:3188,before},helperHash:hash(await readFile(SELF)),privacy:controls(),metadata:metadataControls()};
  await preserve(output,report);
  if(!report.privacy.pass||!report.metadata.pass)stop('control_failure');
  const execution=await capture(subject,privateDir);
  report={...report,progress:execution.progress,execution};
  const after=await inventory(subject,files),e=execution.evidence;
  const complete=execution.termination===null&&execution.exit.code===0&&!execution.exit.spawnFailed&&e?.status==='inspection_complete'&&e.privacy.pass&&e.privacy.getterTouches===0&&e.privacy.proxyTrapTouches===0&&e.metadata.pass&&e.networkDenied===0&&number(e.emission?.bytes,LIMITS.emission)!==null&&hex(e.emission?.sha256)!==null&&number(e.inspection?.nodes,LIMITS.visits)!==null&&number(e.inspection?.candidates,LIMITS.candidates)!==null&&before===after;
  report={...report,status:complete?'inspection_complete':'incomplete',progress:execution.progress,protectedBase:{leaves:3188,before,after,equal:before===after},execution};
 }catch(error){report={...report,status:'incomplete',reason:REASONS.includes(own(error,'o4Reason'))?own(error,'o4Reason'):'unexpected_failure',error:safeError(error)};}
 finally{
  if(files&&before){try{const after=await inventory(subject,files);report.protectedBase={leaves:3188,before,after,equal:before===after};if(before!==after)report.status='incomplete';}catch{report.status='incomplete';report.protectedBase={leaves:3188,before,after:null,equal:false};}}
  await preserve(output,report);
 }
 process.exitCode=report.status==='inspection_complete'?0:1;
}
if(process.argv[1]&&resolve(process.argv[1])===SELF){
 try{if(process.env.O4_COMPILE_CHILD==='FIXED_OWN_LITERAL')await compileChild();else await main();}
 catch{process.stderr.write('O4 admission or safe preservation incomplete.\n');process.exitCode=1;}
}
