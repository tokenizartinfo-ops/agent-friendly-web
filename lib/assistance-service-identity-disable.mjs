import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SHA=/^[0-9a-f]{64}$/;
const PLAN=['occurrenceId','baselineRef','closeAt'];
const METADATA=['id','client_id','name','duration','created_at','expires_at','enabled','updated_at','last_seen_at','client_secret_version','previous_client_secret_expires_at','version'];
const exact=(v,keys)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const unknown=()=>Object.freeze({verified:false,state:'unknown'});
const disabled=()=>Object.freeze({verified:true,state:'disabled'});
const envelope=r=>r?.success===true&&Object.hasOwn(r,'result')&&(r.errors===undefined||(Array.isArray(r.errors)&&r.errors.length===0));

export async function computeServiceIdentityDigest(token){
 if(!token||Object.getPrototypeOf(token)!==Object.prototype||!Object.keys(token).every(k=>METADATA.includes(k))||typeof token.id!=='string'||!UUID.test(token.id)||typeof token.enabled!=='boolean'||!['client_id','name','duration','created_at','expires_at'].every(k=>typeof token[k]==='string'&&token[k].length>0&&token[k].length<=4096)||token.duration==='forever'||!Number.isFinite(Date.parse(token.created_at))||!Number.isFinite(Date.parse(token.expires_at)))throw Error('Invalid service identity metadata');
 for(const key of ['client_secret_version','version'])if(Object.hasOwn(token,key)&&(!Number.isSafeInteger(token[key])||token[key]<1))throw Error('Invalid service identity metadata');
 for(const key of ['updated_at','last_seen_at','previous_client_secret_expires_at'])if(Object.hasOwn(token,key)&&token[key]!==null&&typeof token[key]!=='string')throw Error('Invalid service identity metadata');
 if(token.previous_client_secret_expires_at!==undefined&&token.previous_client_secret_expires_at!==null&&!Number.isFinite(Date.parse(token.previous_client_secret_expires_at)))throw Error('Invalid service identity metadata');
 const stable=Object.fromEntries(Object.entries(token).filter(([k])=>!['enabled','updated_at','last_seen_at'].includes(k)));
 return computeAdministrativeResultDigest(stable);
}

/** Internal server-only action, not a transport or a complete administrative closer.
 * Trusted request must enforce fixed origin, bounded I/O and independent custody.
 * Mount only behind the coordinator's durable issued fence: local issued alone
 * does not survive reconstruction and never authorizes a replay after restart.
 */
export function createServiceIdentityDisableAction({plan,identity,request,now=Date.now}={}){
 if(!exact(plan,PLAN)||typeof plan.occurrenceId!=='string'||!UUID.test(plan.occurrenceId)||typeof plan.baselineRef!=='string'||!SHA.test(plan.baselineRef)||!Number.isSafeInteger(plan.closeAt)||plan.closeAt<1||!exact(identity,['accountId','tokenId','metadataDigest'])||typeof identity.accountId!=='string'||!/^[0-9a-f]{32}$/.test(identity.accountId)||typeof identity.tokenId!=='string'||!UUID.test(identity.tokenId)||typeof identity.metadataDigest!=='string'||!SHA.test(identity.metadataDigest)||typeof request!=='function'||typeof now!=='function')throw Error('Invalid service identity configuration');
 const pin=Object.freeze({...plan}),resource=Object.freeze({...identity});
 const path='/accounts/'+resource.accountId+'/access/service_tokens/'+resource.tokenId;
 let lastTime=-1,issued=false;
 function allowed(input){
  if(!exact(input,PLAN)||!PLAN.every(k=>input[k]===pin[k]))return false;
  const t=now();if(!Number.isSafeInteger(t)||t<lastTime||t<pin.closeAt)return false;lastTime=t;return true;
 }
 async function read(input){
  if(!allowed(input))return null;
  const r=await request(Object.freeze({method:'GET',path}));
  if(!allowed(input)||!envelope(r)||r.result?.id!==resource.tokenId)return null;
  // Capture enabled before awaiting hashing: a callback cannot edit the response
  // while the digest is being computed and supply a different accepted state.
  const state=r.result.enabled,digest=await computeServiceIdentityDigest(r.result);
  if(!allowed(input)||digest!==resource.metadataDigest)return null;
  return state;
 }
 return Object.freeze({
  async readDisabledIdentity(input){try{return await read(input)===false?disabled():unknown();}catch{return unknown();}},
  async disableServiceIdentity(input){
   try{
    const before=await read(input);if(before===null)return unknown();if(before===false)return disabled();
    if(issued||!allowed(input))return unknown();
    // Last synchronous fence before the only permitted provider write.
    issued=true;
    const r=await request(Object.freeze({method:'PUT',path,body:Object.freeze({enabled:false})}));
    if(!allowed(input)||!envelope(r))return unknown();
    // PUT response alone cannot attest primary identity state or side effects.
    return await read(input)===false?disabled():unknown();
   }catch{return unknown();}
  }
 });
}
