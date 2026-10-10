import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {validateOccurrenceApproval} from './assistance-occurrence-approvals.mjs';
import {administrativeClosurePaths,computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
import {computeServiceIdentityDigest} from './assistance-service-identity-disable.mjs';
const SHA=/^[0-9a-f]{64}$/,UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
const fail=()=>{throw Error('Provider observation unavailable');};
function data(value,depth=0){
 if(depth>20)fail();if(value===null||['string','boolean'].includes(typeof value))return value;if(typeof value==='number'&&Number.isFinite(value))return value;
 if(!value||![Object.prototype,Array.prototype].includes(Object.getPrototypeOf(value)))fail();
 const array=Array.isArray(value),out=array?[]:{};if(array&&value.length>1000)fail();
 for(const key of Reflect.ownKeys(value)){if(array&&key==='length')continue;const d=Object.getOwnPropertyDescriptor(value,key);if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value')||(array&&!/^(0|[1-9][0-9]*)$/.test(key)))fail();Object.defineProperty(out,key,{value:data(d.value,depth+1),enumerable:true,writable:true,configurable:true});}
 if(array&&Object.keys(out).length!==value.length)fail();return out;
}
/** Private GET adapter; two snapshots are observations, never authority.
 * Inventory is token metadata in the fixed account and policies of the own app,
 * not global custody or unrelated-application exclusivity. Host must honor the
 * AbortSignal, fix credentials/origin, and never mount readPins for consumers. */
export function createPrivateProviderObservation({readPins,request,now=Date.now,timeoutMs=5000}={}){
 let last=-1;
 return Object.freeze({async read(recordRef){let timer,active=true,calls=0,createdAt=0,closeAt=8640000000000000;const wallDeadline=performance.now()+timeoutMs,controller=new AbortController();try{
  if(typeof recordRef!=='string'||!SHA.test(recordRef)||typeof readPins!=='function'||typeof request!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000)return null;
  const clock=()=>{const t=now();if(!active||performance.now()>=wallDeadline||!Number.isSafeInteger(t)||t<createdAt||t>=closeAt||t<last)fail();last=t;return t;};
  const source=async()=>{clock();const raw=await readPins();clock();if(!exact(raw,['registration','approval','provider'])||!exact(raw.provider,['applicationDomain','applicationAudience']))fail();const p=data(raw),a=validateOccurrenceApproval(p.approval),r=await validateQaClosureApproval(p.registration,a);const t=clock();if(r.plan.baselineRef!==recordRef||t<r.provisioning.createdAt||t>=r.plan.closeAt||p.provider.applicationDomain!=='operations-manager.agentfriendlyweb.dev/assistance/custody/confirm'||!SHA.test(p.provider.applicationAudience))fail();return {r,provider:p.provider,digest:await computeAdministrativeResultDigest({registration:r,approval:a,provider:p.provider})};};
  const get=async(path,query)=>{clock();if(++calls>26)fail();const raw=await request(Object.freeze({method:'GET',path,...(query?{query:Object.freeze(query)}:{}),signal:controller.signal}));clock();const response=data(raw);if(response.success!==true||!Object.hasOwn(response,'result')||(response.errors!==undefined&&(!Array.isArray(response.errors)||response.errors.length)))fail();await computeAdministrativeResultDigest(response);clock();return response;};
  const list=async(path)=>{let rows=[],total,totalPages;for(let page=1;page<=4;page++){const response=await get(path,{page,per_page:100}),info=response.result_info;if(!Array.isArray(response.result)||!info||![info.page,info.per_page,info.count,info.total_count,info.total_pages].every(Number.isSafeInteger)||info.page!==page||info.per_page!==100||info.count!==response.result.length||info.count>100||info.count<0||info.total_count<0||info.total_count>400||info.total_pages<1||info.total_pages>4)fail();if(page===1){total=info.total_count;totalPages=info.total_pages;}else if(total!==info.total_count||totalPages!==info.total_pages)fail();rows.push(...response.result);if(page===totalPages)break;}if(rows.length!==total||new Set(rows.map(r=>r.id)).size!==rows.length||rows.some(r=>typeof r.id!=='string'||!UUID.test(r.id)))fail();return rows;};
  const work=async()=>{
   const first=await source(),r=first.r,paths=administrativeClosurePaths(r.resources),appPath='/accounts/'+r.resources.accountId+'/access/apps/'+r.resources.applicationId;createdAt=r.provisioning.createdAt;closeAt=r.plan.closeAt;clock();let prior;
   for(let pass=0;pass<2;pass++){
    if((await source()).digest!==first.digest)fail();
    const token=(await get(paths[0])).result,settings=(await get(paths[1])).result,schedules=(await get(paths[2])).result,policy=(await get(paths[3])).result,application=(await get(appPath)).result;
    if(token.id!==r.resources.tokenId||token.enabled!==true||Date.parse(token.created_at)!==r.provisioning.createdAt||Date.parse(token.expires_at)!==r.provisioning.expiresAt)fail();
    if(application.id!==r.resources.applicationId||application.type!=='self_hosted'||application.domain!==first.provider.applicationDomain||application.aud!==first.provider.applicationAudience||policy.id!==r.resources.policyId||policy.decision!=='non_identity'||!Array.isArray(policy.include)||policy.include.length!==1||!exact(policy.include[0],['service_token'])||!exact(policy.include[0].service_token,['token_id'])||policy.include[0].service_token.token_id!==r.resources.tokenId||!Array.isArray(policy.exclude)||policy.exclude.length||!Array.isArray(policy.require)||policy.require.length||!Array.isArray(settings.bindings)||!Array.isArray(schedules.schedules)||schedules.schedules.length)fail();
    const tokens=await list('/accounts/'+r.resources.accountId+'/access/service_tokens'),policies=await list(appPath+'/policies');
    const tokenMetadata=[];for(const t of tokens){tokenMetadata.push({id:t.id,enabled:t.enabled,digest:await computeServiceIdentityDigest(t)});clock();}
    const selected=tokens.find(t=>t.id===r.resources.tokenId);if(!selected||selected.enabled!==true||selected.name!==r.identity.name)fail();
    // The actual point GET may omit name. Recover that field only from the
    // independently requested, exact-ID listing; never invent version metadata.
    const identityDigest=await computeServiceIdentityDigest(Object.hasOwn(token,'name')?token:{...token,name:selected.name});clock();
    if(identityDigest!==r.identity.metadataDigest||(await computeServiceIdentityDigest(selected))!==identityDigest||policies.length!==1||policies[0].id!==policy.id||(await computeAdministrativeResultDigest(policies[0]))!==(await computeAdministrativeResultDigest(policy)))fail();
    const snapshot={token:{id:token.id,enabled:token.enabled,createdAt:r.provisioning.createdAt,expiresAt:r.provisioning.expiresAt,metadataDigest:identityDigest},applicationDigest:await computeAdministrativeResultDigest(application),settingsDigest:await computeAdministrativeResultDigest(settings),schedulesDigest:await computeAdministrativeResultDigest(schedules),policyDigest:await computeAdministrativeResultDigest(policy),inventory:{scope:'account-token-metadata-and-own-application-policies',tokenCount:tokens.length,policyCount:policies.length,tokenDigest:await computeAdministrativeResultDigest(tokenMetadata.sort((a,b)=>a.id.localeCompare(b.id))),policyDigest:await computeAdministrativeResultDigest(policies)}};
    const digest=await computeAdministrativeResultDigest(snapshot);clock();if(prior&&prior.digest!==digest)fail();prior={snapshot,digest};
    if((await source()).digest!==first.digest)fail();
   }
   return {contract:'afw-private-provider-observation/v1',state:'observed',recordRef,observedAt:clock(),...prior.snapshot};
  };
  return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{active=false;controller.abort();resolve(null);},timeoutMs);})]);
 }catch{return null;}finally{active=false;controller.abort();clearTimeout(timer);}}});
}
