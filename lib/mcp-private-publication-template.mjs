export const PRIVATE_PUBLICATION_FORMAT='afw-private-publication-template-v1';
export const PRIVATE_PUBLICATION_SLOT='__AFW_PRIVATE_PUBLICATION_POLICY_V1_1de5978cb6e34bf1aa13bb4ba11d732e__';
export const PRIVATE_PUBLICATION_SCRIPT_CAP=2097152;
export const PRIVATE_PUBLICATION_POLICY_CAP=65536;
// Public fixed resources only. Kept standalone for pure cloud materialization;
// the build tests compare this target with the native release policy.
export const PRIVATE_PUBLICATION_TARGET=Object.freeze({accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',databaseId:'6a728254-1494-4039-802e-b39288a55fcc',kvId:'6b94ff702e504e14a7730cee73a0f6ff'});
const fail=()=>{throw Error('Private publication preparation unavailable');};
const exact=(x,keys)=>{if(!x||Object.getPrototypeOf(x)!==Object.prototype||Reflect.ownKeys(x).length!==keys.length||keys.some(k=>{const d=Object.getOwnPropertyDescriptor(x,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const bytes=x=>new TextEncoder().encode(x);
async function digest(value){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes(value)))).map(x=>x.toString(16).padStart(2,'0')).join('');}

/** Pure assembly only: the independent template pin authenticates code.
 * Manifest provenance must separately match the accepted build receipt.
 * No clock, consent, credential, provider or runtime authority is granted. */
export async function materializeMcpPrivatePublication(input){
 try{
  exact(input,['template','manifest','policyJson','expectedTemplateHash']);
  const {template,manifest:sourceManifest,policyJson,expectedTemplateHash}=input;
  exact(sourceManifest,['format','templateHash','templateBytes','slot','artifactKey','workerHash','programHash','artifactSourceRevision','artifactSourceTree','materialized','remotePublished']);
  const m=Object.freeze({...sourceManifest});
  if(typeof template!=='string'||bytes(template).length>PRIVATE_PUBLICATION_SCRIPT_CAP||
   m.format!==PRIVATE_PUBLICATION_FORMAT||m.slot!==PRIVATE_PUBLICATION_SLOT||m.materialized!==false||m.remotePublished!==false||
   !hex(expectedTemplateHash,64)||m.templateHash!==expectedTemplateHash||!Number.isSafeInteger(m.templateBytes)||m.templateBytes!==bytes(template).length||
   !['artifactKey','workerHash','programHash'].every(k=>hex(m[k],64))||!hex(m.artifactSourceRevision,40)||!hex(m.artifactSourceTree,40)||
   await digest(template)!==expectedTemplateHash||
   m.artifactKey!==await digest(JSON.stringify([PRIVATE_PUBLICATION_TARGET.accountId,PRIVATE_PUBLICATION_TARGET.workerName,m.workerHash])))fail();
  const literal=JSON.stringify(m.slot),first=template.indexOf(literal);
  if(first<0||first!==template.lastIndexOf(literal)||template.split(m.slot).length!==2)fail();
  if(typeof policyJson!=='string'||bytes(policyJson).length>PRIVATE_PUBLICATION_POLICY_CAP||policyJson.includes(m.slot))fail();
  const p=JSON.parse(policyJson);exact(p,['operation','startAt','expiresAt','pins']);
  if(JSON.stringify(p)!==policyJson||p.operation!=='publish'||!Number.isSafeInteger(p.startAt)||p.startAt<0||
   !Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
  exact(p.pins,[...Object.keys(PRIVATE_PUBLICATION_TARGET),'baseVersionId']);
  if(Object.entries(PRIVATE_PUBLICATION_TARGET).some(([k,v])=>p.pins[k]!==v)||
   typeof p.pins.baseVersionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(p.pins.baseVersionId))fail();
  const script=template.slice(0,first)+JSON.stringify(policyJson)+template.slice(first+literal.length);
  if(bytes(script).length>PRIVATE_PUBLICATION_SCRIPT_CAP||script.includes(m.slot))fail();
  return Object.freeze({script,operatorHash:await digest(script),policyHash:await digest(policyJson),templateHash:expectedTemplateHash,
   startAt:p.startAt,expiresAt:p.expiresAt,materialized:true,remotePublished:false});
 }catch{fail();}
}
