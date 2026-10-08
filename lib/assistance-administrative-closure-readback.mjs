// Trusted primary transport only. No mutations, credentials, routes or deployment.
const exact=(v,keys)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SHA=/^[0-9a-f]{64}$/;
const KEYS=['occurrenceId','baselineRef','closeAt'];
const RESOURCES=['token','settings','schedules','policy'];
const CLOSED_FLAGS=['AFW_OPERATIONS_CONSUMER_ENABLED','AFW_ASSISTANCE_SUPERVISION_ENABLED','AFW_DOSSIER_SUPERVISION_ENABLED'];
const unknown=()=>Object.freeze({verified:false,state:'unknown'});
function closedSettings(value){
 if(value===null||typeof value!=='object'||Array.isArray(value)||!Array.isArray(value.bindings))return false;
 const seen=new Set();
 return value.bindings.every(b=>{
  if(b===null||typeof b!=='object'||typeof b.name!=='string'||seen.has(b.name))return false;seen.add(b.name);
  if(CLOSED_FLAGS.includes(b.name))return b.type==='plain_text'&&b.text==='false';
  if(b.name==='AFW_OPERATIONS_WINDOW_EXPIRES_AT')return b.type==='plain_text'&&b.text==='';
  return true;
 });
}
function canonical(v,depth=0){
 if(depth>32)throw Error('Invalid administrative JSON');
 if(v===null||typeof v==='string'||typeof v==='boolean')return JSON.stringify(v);
 if(typeof v==='number'&&Number.isFinite(v))return JSON.stringify(v);
 if(typeof v!=='object'||![Object.prototype,null,Array.prototype].includes(Object.getPrototypeOf(v)))throw Error('Invalid administrative JSON');
 if(Array.isArray(v)){
  if(Object.keys(v).length!==v.length)throw Error('Invalid administrative JSON');
  return '['+Array.from(v,x=>canonical(x,depth+1)).join(',')+']';
 }
 return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k],depth+1)).join(',')+'}';
}
export async function computeAdministrativeResultDigest(value){
 const json=canonical(value);if(json.length>262144)throw Error('Administrative result too large');
 return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(json))),x=>x.toString(16).padStart(2,'0')).join('');
}
export function createAdministrativeClosureReadback({plan,baseline,request,now=Date.now}={}){
 if(!exact(plan,KEYS)||typeof plan.occurrenceId!=='string'||!UUID.test(plan.occurrenceId)||typeof plan.baselineRef!=='string'||!SHA.test(plan.baselineRef)||!Number.isSafeInteger(plan.closeAt)||plan.closeAt<1||typeof request!=='function'||typeof now!=='function'||!exact(baseline,['accountId','tokenId','workerName','applicationId','policyId','digests'])||typeof baseline.accountId!=='string'||!/^[0-9a-f]{32}$/.test(baseline.accountId)||!['tokenId','applicationId','policyId'].every(k=>typeof baseline[k]==='string'&&UUID.test(baseline[k]))||typeof baseline.workerName!=='string'||!/^[a-z0-9_][a-z0-9_-]{0,62}$/.test(baseline.workerName)||!exact(baseline.digests,RESOURCES)||!RESOURCES.every(k=>typeof baseline.digests[k]==='string'&&SHA.test(baseline.digests[k])))throw Error('Invalid administrative closure configuration');
 const pin=Object.freeze({...plan}),b=Object.freeze({...baseline,digests:Object.freeze({...baseline.digests})});
 const root='/accounts/'+b.accountId;
 const paths=[root+'/access/service_tokens/'+b.tokenId,root+'/workers/scripts/'+b.workerName+'/settings',root+'/workers/scripts/'+b.workerName+'/schedules',root+'/access/apps/'+b.applicationId+'/policies/'+b.policyId];
 let lastTime=-1;
 function allowed(input,step){
  if(!exact(input,step?[...KEYS,'step']:KEYS)||!KEYS.every(k=>input[k]===pin[k])||(step&&input.step!=='restoreAdministration'))return false;
  const t=now();if(!Number.isSafeInteger(t)||t<lastTime||t<pin.closeAt)return false;lastTime=t;return true;
 }
 async function read(input,step){
  try{
   if(!allowed(input,step))return unknown();
   for(let pass=0;pass<2;pass++)for(let i=0;i<paths.length;i++){
    if(!allowed(input,step))return unknown();
    const envelope=await request(Object.freeze({method:'GET',path:paths[i]}));
    if(!allowed(input,step)||envelope?.success!==true||!Object.hasOwn(envelope,'result')||(envelope.errors!==undefined&&(!Array.isArray(envelope.errors)||envelope.errors.length)))return unknown();
    const value=envelope.result;
    if(i===0&&(value?.id!==b.tokenId||value.enabled!==false))return unknown();
    if(i===1&&!closedSettings(value))return unknown();
    if(i===2&&(!Array.isArray(value?.schedules)||value.schedules.length!==0))return unknown();
    if(i===3&&value?.id!==b.policyId)return unknown();
    const digest=await computeAdministrativeResultDigest(value);
    if(!allowed(input,step)||digest!==b.digests[RESOURCES[i]])return unknown();
   }
   return Object.freeze({verified:true,state:'restored'});
  }catch{return unknown();}
 }
 return Object.freeze({restoreAdministration:input=>read(input,false),readIssuedReceipt:input=>read(input,true)});
}
