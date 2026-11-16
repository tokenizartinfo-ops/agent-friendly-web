import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const files=[{"fileId":"S00","path":"lib/mcp-qa-finite-owner-phase-context.mjs"},{"fileId":"S01","path":"lib/mcp-qa-finite-owner-preparation.mjs"},{"fileId":"S02","path":"lib/mcp-qa-finite-owner-native-receiver.mjs"},{"fileId":"S03","path":"worker/mcp-own/finite.mjs"},{"fileId":"S04","path":"lib/mcp-qa-finite-owner-cleanup-scope.mjs"},{"fileId":"S05","path":"lib/mcp-qa-finite-owner-cleanup.mjs"},{"fileId":"S06","path":"lib/mcp-qa-finite-initial-cleanup.mjs"},{"fileId":"S07","path":"test/mcp-qa-finite-owner-three-stage-native.test.mjs"},{"fileId":"S08","path":"test/fixtures/finite-coupled-native.mjs"},{"fileId":"S09","path":"test/fixtures/finite-first-connection-publication.mjs"},{"fileId":"S10","path":"test/fixtures/finite-initial-entry-world.mjs"},{"fileId":"S11","path":"test/mcp-qa-finite-first-connection-publication-native.test.mjs"},{"fileId":"S12","path":"lib/mcp-qa-finite-owner-notice-get-forward.mjs"}],root=resolve(process.env.AFW_C2_DIAG_ROOT??'');
const ids=['C2T1_CONNECTION','C2T1_OAUTH'],kinds=['Error','TypeError','AssertionError','SyntaxError','RangeError','AbortError'];
const codes=['ERR_ASSERTION','ERR_TEST_FAILURE','ENOENT','EACCES','EPERM','ERR_MODULE_NOT_FOUND','ETIMEDOUT','ERR_INVALID_ARG_TYPE','ERR_STREAM_PREMATURE_CLOSE'];
const codeOf=value=>value===undefined||value===null?null:codes.includes(value)?value:'other';
const number=(n,max)=>Number.isSafeInteger(n)&&n>0&&n<=max?n:null;
function position(file,line,column){
 const found=files.find(f=>file===join(root,f.path)||file===pathToFileURL(join(root,f.path)).href);
 const l=number(line,5000),c=number(column,16384);return found&&l&&c?{fileId:found.fileId,line:l,column:c}:null;
}
function stackPosition(error){
 if(typeof error?.stack!=='string'||error.stack.length>65536)return null;
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
 if(pos.line===62)return 'oauth-context';
 if(pos.line===63)return 'oauth-kv';
 if(pos.line===64)return 'oauth-client-registration';
 if(pos.line===65||pos.line===66)return 'oauth-get';
 if(pos.line===67||pos.line===68)return 'oauth-post';
 if(pos.line===69)return 'oauth-sdk-observation';
 return null;
}
function errorData(wrapped){
 const error=wrapped?.cause??wrapped;
 const kind=typeof error?.name==='string'?(kinds.includes(error.name)?error.name:'other'):'unavailable';
 const code=codeOf(error?.code),pos=stackPosition(error);
 const assertion=code==='ERR_ASSERTION'||kind==='AssertionError';
 const http=n=>Number.isSafeInteger(n)&&n>=100&&n<=599?n:null;
 const expected=assertion&&[200,302].includes(error?.expected)?http(error.expected):null;
 const actual=expected!==null?http(error?.actual):null;
 return {kind,code,position:pos,sitePhase:sitePhase(pos),httpActual:actual,httpExpected:expected,booleanActual:assertion&&typeof error?.actual==='boolean'?error.actual:null,booleanExpected:assertion&&typeof error?.expected==='boolean'?error.expected:null};
}
const frame=value=>'AFW_C2_OAUTH_EVENT '+JSON.stringify(value)+'\n';
export default async function* reporter(source){
 for await(const event of source){
  if(event.type==='test:stdout'){
   const text=event.data?.message;
   if(typeof text==='string'&&text.length<=1024&&text.startsWith('AFW_C2_OAUTH_CUSTODY ')){
    try{const raw=text.slice('AFW_C2_OAUTH_CUSTODY '.length).trimEnd(),v=JSON.parse(raw);if(JSON.stringify(v)===raw&&Object.keys(v).join(',')==='schema,uidMatches,gidMatches,groupsCleared,loopbackOnly'&&v.schema==='afw.c2-oauth-custody.v1'&&['uidMatches','gidMatches','groupsCleared','loopbackOnly'].every(k=>v[k]===true))yield 'AFW_C2_OAUTH_CUSTODY '+raw+'\n';}catch{}
   }
   continue;
  }
  if(event.type!=='test:pass'&&event.type!=='test:fail')continue;
  const data=event.data??{},id=ids.includes(data.name)?data.name:null;
  let safe={schema:'afw.c2-oauth-event.v1',id,status:event.type==='test:pass'?'pass':'fail',casePhase:id==='C2T1_CONNECTION'?'connection':id==='C2T1_OAUTH'?'oauth':null,skip:data.skip!==undefined,todo:data.todo!==undefined,definition:position(data.file,data.line,data.column),error:null,sanitized:true};
  try{if(event.type==='test:fail'){if(!data.details?.error)safe.sanitized=false;safe.error=errorData(data.details?.error);}}catch{safe.error={kind:'unavailable',code:null,position:null,sitePhase:null,httpActual:null,httpExpected:null,booleanActual:null,booleanExpected:null};safe.sanitized=false;}
  if(Buffer.byteLength(JSON.stringify(safe),'utf8')>2048){safe={schema:'afw.c2-oauth-event.v1',id,status:safe.status,casePhase:safe.casePhase,skip:safe.skip,todo:safe.todo,definition:null,error:null,sanitized:false};}
  yield frame(safe);
 }
}
