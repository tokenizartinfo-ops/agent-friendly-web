export const PRIVATE_CONFIRMATION_FORMAT='afw-private-confirmation-template-v1';
export const PRIVATE_CONFIRMATION_SLOT='__AFW_PRIVATE_CONFIRMATION_POLICY_V1_7fbe62d8c5434d0c9b171f392c7780dd__';
export const PRIVATE_CONFIRMATION_SCRIPT_CAP=2097152;
export const PRIVATE_CONFIRMATION_POLICY_CAP=65536;
const fail=()=>{throw Error('Private confirmation preparation unavailable');};
const exact=(x,keys)=>{if(!x||Object.getPrototypeOf(x)!==Object.prototype||Reflect.ownKeys(x).length!==keys.length||keys.some(k=>{const d=Object.getOwnPropertyDescriptor(x,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const bytes=x=>new TextEncoder().encode(x);
async function digest(value){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes(value)))).map(x=>x.toString(16).padStart(2,'0')).join('');}

/** Data-only private assembly. It is not a consent/clock/authority check.
 * Caller pins the public template independently and keeps the returned script
 * private. Existing runtime validation and the original admission still apply. */
export async function materializeMcpPrivateConfirmation(input){
 try{
  exact(input,['template','manifest','policyJson','expectedTemplateHash']);
  const {template,manifest:m,policyJson,expectedTemplateHash}=input;
  exact(m,['format','templateHash','templateBytes','slot','artifactKey','workerHash','programHash','artifactSourceRevision','artifactSourceTree','materialized','remotePublished']);
  if(typeof template!=='string'||bytes(template).length>PRIVATE_CONFIRMATION_SCRIPT_CAP||
   m.format!==PRIVATE_CONFIRMATION_FORMAT||m.slot!==PRIVATE_CONFIRMATION_SLOT||m.materialized!==false||m.remotePublished!==false||
   !hex(expectedTemplateHash,64)||m.templateHash!==expectedTemplateHash||!Number.isSafeInteger(m.templateBytes)||m.templateBytes!==bytes(template).length||
   !['artifactKey','workerHash','programHash'].every(k=>hex(m[k],64))||!hex(m.artifactSourceRevision,40)||!hex(m.artifactSourceTree,40)||
   await digest(template)!==expectedTemplateHash)fail();
  const literal=JSON.stringify(m.slot),first=template.indexOf(literal);
  if(first<0||first!==template.lastIndexOf(literal)||template.split(m.slot).length!==2)fail();
  if(typeof policyJson!=='string'||bytes(policyJson).length>PRIVATE_CONFIRMATION_POLICY_CAP||policyJson.includes(m.slot))fail();
  const p=JSON.parse(policyJson);exact(p,['operation','startAt','expiresAt','plan','observation']);
  if(JSON.stringify(p)!==policyJson||p.operation!=='confirm_named'||!Number.isSafeInteger(p.startAt)||p.startAt<0||
   !Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
  exact(p.plan,['activationKey','artifactKey','trialId','configurationHash','startAt','expiresAt']);
  if(!['activationKey','artifactKey','trialId','configurationHash'].every(k=>hex(p.plan[k],64))||
   p.plan.artifactKey!==m.artifactKey||p.plan.startAt!==p.startAt||p.plan.expiresAt!==p.expiresAt)fail();
  exact(p.observation,['versionId','deploymentId','namespaceId','applicationId','configuration']);
  const bindings=p.observation.configuration?.bindings;if(!Array.isArray(bindings))fail();
  for(const b of bindings){
   if(!b||typeof b.name!=='string'||typeof b.type!=='string')fail();
   if(b.type==='secret_text')exact(b,['name','type']);
   else if(/(?:_TOKEN|_SECRET|_KEY)$/.test(b.name))fail();
  }
  const script=template.slice(0,first)+JSON.stringify(policyJson)+template.slice(first+literal.length);
  if(bytes(script).length>PRIVATE_CONFIRMATION_SCRIPT_CAP||script.includes(m.slot))fail();
  return Object.freeze({script,operatorHash:await digest(script),policyHash:await digest(policyJson),templateHash:expectedTemplateHash,
   startAt:p.startAt,expiresAt:p.expiresAt,materialized:true,remotePublished:false});
 }catch{fail();}
}
