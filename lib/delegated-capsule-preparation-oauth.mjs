import {createDelegatedCapsulePreparationHost} from './delegated-capsule-preparation-host.mjs';
import {readRecord,readList,ref} from './agent-consumption-input.mjs';

const unavailable=()=>new Error('Preparation host unavailable');
// Project only required authority fields. In particular, do not read token,
// enumerate provider metadata or invoke accessors while copying authority.
function ownFields(value,keys){
 try{
  if(!value||typeof value!=='object'||Array.isArray(value))return null;
  const prototype=Object.getPrototypeOf(value);
  if(prototype!==Object.prototype&&prototype!==null)return null;
  const result={};
  for(const key of keys){
   const descriptor=Object.getOwnPropertyDescriptor(value,key);
   if(!descriptor||!Object.hasOwn(descriptor,'value'))return null;
   result[key]=descriptor.value;
  }
  return result;
 }catch{return null;}
}
function inspect(value){
 try{
  const pair=readRecord(value,['auth','props']);
  const auth=ownFields(pair?.auth,['userId','clientId','audience','scope','expiresAt']);
  const props=readRecord(pair?.props,['applicationGrantId','userId','projectId']);
  const scopes=readList(auth?.scope,10);
  if(!auth||!props||![auth.userId,auth.clientId,props.applicationGrantId,props.userId,props.projectId].every(ref)
   ||props.userId!==auth.userId||!scopes||scopes.some(s=>typeof s!=='string'||s.length>80||!s.length||/[\s\u0000-\u001f\u007f]/.test(s))
   ||!Number.isSafeInteger(auth.expiresAt)||auth.expiresAt<=0||auth.expiresAt>8640000000000
   ||typeof auth.audience!=='string'||auth.audience.length>512)return null;
  const url=new URL(auth.audience);
  if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||url.href!==auth.audience)return null;
  return {auth:pair.auth,props:pair.props,authorization:{
   context:{grantId:props.applicationGrantId,subject:auth.userId,clientId:auth.clientId,resource:auth.audience,scopes},
   projectId:props.projectId,tokenExpiresAt:auth.expiresAt*1000}};
 }catch{return null;}
}

/** Pure projection only: accepts already-verified server context, never a token,
 * unverified JWT, request header or tool argument. The SDK is the verifier.
 * v1.2.1 exposes expiresAt as Unix seconds; the finite host needs milliseconds.
 */
export function readCapsulePreparationOAuthAuthorization(value){
 return inspect(value)?.authorization??null;
}

/** Source-only bridge; not imported/mounted by any runtime entrypoint.
 * getVerifiedContext must be a server closure inside the SDK protected handler:
 * () => ({auth:ctx.auth,props:ctx.props}). It is not a client-supplied function.
 * Construct once per verified request. No change to scopes, consent or DDL.
 */
export function createDelegatedCapsulePreparationOAuthHost({env,resource,getVerifiedContext,
 now=()=>Date.now(),monotonic=()=>performance.now()}={}){
 if(env?.AFW_DELEGATED_PREPARATION_ENABLED!=='true')return null;
 try{
  if(typeof getVerifiedContext!=='function')throw unavailable();
  const initial=inspect(getVerifiedContext());if(!initial)throw unavailable();
  Object.freeze(initial.authorization.context.scopes);Object.freeze(initial.authorization.context);Object.freeze(initial.authorization);
  const signature=JSON.stringify(initial.authorization);
  let invalidated=false;
  function guard(){
   if(invalidated)throw unavailable();
   try{
    const current=inspect(getVerifiedContext());
    if(!current||current.auth!==initial.auth||current.props!==initial.props||JSON.stringify(current.authorization)!==signature)throw unavailable();
   }catch{invalidated=true;throw unavailable();}
  }
  const clock=fn=>()=>{guard();const time=fn();guard();return time;};
  return createDelegatedCapsulePreparationHost({env,resource,now:clock(now),monotonic:clock(monotonic),
   resolveAuthorization:()=>{guard();return initial.authorization;}});
 }catch{throw unavailable();}
}
