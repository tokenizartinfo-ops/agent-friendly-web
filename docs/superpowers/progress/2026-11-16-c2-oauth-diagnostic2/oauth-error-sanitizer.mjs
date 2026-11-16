import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {types} from 'node:util';
const files=[{"fileId":"S00","path":"lib/mcp-qa-finite-owner-phase-context.mjs"},{"fileId":"S01","path":"lib/mcp-qa-finite-owner-preparation.mjs"},{"fileId":"S02","path":"lib/mcp-qa-finite-owner-native-receiver.mjs"},{"fileId":"S03","path":"worker/mcp-own/finite.mjs"},{"fileId":"S04","path":"lib/mcp-qa-finite-owner-cleanup-scope.mjs"},{"fileId":"S05","path":"lib/mcp-qa-finite-owner-cleanup.mjs"},{"fileId":"S06","path":"lib/mcp-qa-finite-initial-cleanup.mjs"},{"fileId":"S07","path":"test/mcp-qa-finite-owner-three-stage-native.test.mjs"},{"fileId":"S08","path":"test/fixtures/finite-coupled-native.mjs"},{"fileId":"S09","path":"test/fixtures/finite-first-connection-publication.mjs"},{"fileId":"S10","path":"test/fixtures/finite-initial-entry-world.mjs"},{"fileId":"S11","path":"test/mcp-qa-finite-first-connection-publication-native.test.mjs"},{"fileId":"S12","path":"lib/mcp-qa-finite-owner-notice-get-forward.mjs"}],root=resolve(process.env.AFW_C2_DIAG_ROOT??'');
const kinds=['Error','TypeError','AssertionError','SyntaxError','RangeError','AbortError'];
const codes=['ERR_ASSERTION','ERR_TEST_FAILURE','ENOENT','EACCES','EPERM','ERR_MODULE_NOT_FOUND','ETIMEDOUT','ERR_INVALID_ARG_TYPE','ERR_STREAM_PREMATURE_CLOSE'];
const codeOf=value=>value===undefined||value===null?null:codes.includes(value)?value:'other';
const number=(n,max)=>Number.isSafeInteger(n)&&n>0&&n<=max?n:null;
export function position(file,line,column){
 const f=files.find(f=>file===join(root,f.path)||file===pathToFileURL(join(root,f.path)).href),l=number(line,5000),c=number(column,16384);
 return f&&l&&c?{fileId:f.fileId,line:l,column:c}:null;
}
function stackPosition(error){
 if(typeof error.stack!=='string'||error.stack.length>65536)return null;
 for(const line of error.stack.split(/\r?\n/).slice(1,33)){
  if(!/^\s+at\s/.test(line))continue;
  for(const f of files)for(const prefix of [join(root,f.path),pathToFileURL(join(root,f.path)).href]){
   const at=line.lastIndexOf(prefix+':');if(at<0)continue;
   const m=/^([0-9]+):([0-9]+)\)?$/.exec(line.slice(at+prefix.length+1));if(m){const p=position(prefix,Number(m[1]),Number(m[2]));if(p)return p;}
  }
 }
 return null;
}
function sitePhase(pos){
 if(pos?.fileId!=='S08')return null;
 if(pos.line===62)return 'oauth-context';if(pos.line===63)return 'oauth-kv';if(pos.line===64)return 'oauth-client-registration';
 if(pos.line===65||pos.line===66)return 'oauth-get';if(pos.line===67||pos.line===68)return 'oauth-post';if(pos.line===69)return 'oauth-sdk-observation';
 return null;
}
const unavailable=()=>({kind:'unavailable',code:null,position:null,sitePhase:null,httpActual:null,httpExpected:null,booleanActual:null,booleanExpected:null});
function projectError(value){
 try{
  const kind=kinds.includes(value.name)?value.name:typeof value.name==='string'?'other':'unavailable',code=codeOf(value.code),pos=stackPosition(value),assertion=code==='ERR_ASSERTION'||kind==='AssertionError';
  const http=n=>Number.isSafeInteger(n)&&n>=100&&n<=599?n:null;
  const expected=assertion&&[200,302].includes(value.expected)?http(value.expected):null;
  return {error:{kind,code,position:pos,sitePhase:sitePhase(pos),httpActual:expected!==null?http(value.actual):null,httpExpected:expected,booleanActual:assertion&&typeof value.actual==='boolean'?value.actual:null,booleanExpected:assertion&&typeof value.expected==='boolean'?value.expected:null},sanitized:true};
 }catch{return {error:unavailable(),sanitized:false};}
}
export function projectThrown(value){
 try{return types.isNativeError(value)?projectError(value):{error:unavailable(),sanitized:true};}catch{return {error:unavailable(),sanitized:false};}
}
export function projectNativeFailure(wrapped){
 // Node22.23.4 error_serdes recreates Error via ObjectCreate(ctor.prototype, properties).
 try{const value=wrapped&&Object.hasOwn(wrapped,'cause')?wrapped.cause:wrapped;return types.isNativeError(value)||value instanceof Error?projectError(value):{error:unavailable(),sanitized:true};}catch{return {error:unavailable(),sanitized:false};}
}
export function validError(e){
 return e&&Object.keys(e).join(',')==='kind,code,position,sitePhase,httpActual,httpExpected,booleanActual,booleanExpected'&&[...kinds,'other','unavailable'].includes(e.kind)&&[null,...codes,'other'].includes(e.code)&&(e.position===null||e.position&&files.some(f=>f.fileId===e.position.fileId)&&Object.keys(e.position).join(',')==='fileId,line,column'&&number(e.position.line,5000)&&number(e.position.column,16384))&&[null,'oauth-context','oauth-kv','oauth-client-registration','oauth-get','oauth-post','oauth-sdk-observation'].includes(e.sitePhase)&&[e.httpActual,e.httpExpected].every(v=>v===null||Number.isSafeInteger(v)&&v>=100&&v<=599)&&[e.booleanActual,e.booleanExpected].every(v=>v===null||typeof v==='boolean');
}
