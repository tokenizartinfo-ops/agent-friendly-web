import {position,projectNativeFailure,validError} from './oauth-error-sanitizer.mjs';
const ids=['C2T1_CONNECTION','C2T1_OAUTH'];
function operation(v){
 return v&&Object.keys(v).join(',')==='schema,sequence,id,operation,status,error,sanitized'&&v.schema==='afw.c2-oauth-operation.v1'&&Number.isSafeInteger(v.sequence)&&v.sequence>=1&&v.sequence<=6&&ids.includes(v.id)&&['action','counter'].includes(v.operation)&&['returned','threw'].includes(v.status)&&typeof v.sanitized==='boolean'&&(v.status==='returned'?v.error===null:validError(v.error));
}
function lifecycle(v){return v&&Object.keys(v).join(',')==='schema,sequence,hook,driverPhase,status,error,sanitized'&&v.schema==='afw.c2-oauth-lifecycle.v1'&&Number.isSafeInteger(v.sequence)&&v.sequence>=1&&v.sequence<=6&&v.hook==='after'&&['initial','connection-action','connection-counter','between-cases','oauth-action','oauth-counter','complete'].includes(v.driverPhase)&&['entered','close-returned','close-threw'].includes(v.status)&&typeof v.sanitized==='boolean'&&(v.status==='close-threw'?validError(v.error):v.error===null);}
function custody(v){return v&&Object.keys(v).join(',')==='schema,uidMatches,gidMatches,groupsCleared,loopbackOnly'&&v.schema==='afw.c2-oauth-custody.v1'&&['uidMatches','gidMatches','groupsCleared','loopbackOnly'].every(k=>v[k]===true);}
export default async function* reporter(source){
 for await(const event of source){
  if(event.type==='test:stdout'){
   const text=event.data?.message;if(typeof text!=='string'||text.length>4096)continue;
   for(const line of text.split('\n').filter(Boolean)){
    const prefix=line.startsWith('AFW_C2_OAUTH_OPERATION ')?'AFW_C2_OAUTH_OPERATION ':line.startsWith('AFW_C2_OAUTH_LIFECYCLE ')?'AFW_C2_OAUTH_LIFECYCLE ':line.startsWith('AFW_C2_OAUTH_CUSTODY ')?'AFW_C2_OAUTH_CUSTODY ':null;
    if(!prefix)continue;
    try{const raw=line.slice(prefix.length),v=JSON.parse(raw);if(JSON.stringify(v)!==raw||Buffer.byteLength(line)>2048)continue;if(prefix==='AFW_C2_OAUTH_OPERATION '?operation(v):prefix==='AFW_C2_OAUTH_LIFECYCLE '?lifecycle(v):custody(v))yield prefix+raw+'\n';}catch{}
   }
   continue;
  }
  if(event.type!=='test:pass'&&event.type!=='test:fail')continue;
  const data=event.data??{},id=ids.includes(data.name)?data.name:null;
  const projected=event.type==='test:fail'?projectNativeFailure(data.details?.error):null;
  const value={schema:'afw.c2-oauth-event.v1',id,status:event.type==='test:pass'?'pass':'fail',casePhase:id==='C2T1_CONNECTION'?'connection':id==='C2T1_OAUTH'?'oauth':null,skip:data.skip!==undefined,todo:data.todo!==undefined,definition:position(data.file,data.line,data.column),error:projected?.error??null,sanitized:projected?.sanitized??true};
  yield 'AFW_C2_OAUTH_EVENT '+JSON.stringify(value)+'\n';
 }
}
