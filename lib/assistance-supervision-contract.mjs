const VERSION='afw-assistance-event-v1';
const HASH=/^[0-9a-f]{64}$/;
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const topics=new Set(['orientation','save','comparison','delivery']);
const fields=['version','eventId','projectRef','revision','kind','topic','observedAt'];
const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const date=value=>typeof value==='string'&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString()===value;
const fail=()=>{throw Error('Invalid assistance signal');};
export function validateAssistanceSignal(value){
 if(!exact(value,fields)||value.version!==VERSION||!HASH.test(value.eventId)||!HASH.test(value.projectRef)||!Number.isSafeInteger(value.revision)||value.revision<1||value.kind!=='assistance_requested'||!topics.has(value.topic)||!date(value.observedAt))fail();
 return Object.fromEntries(fields.map(key=>[key,value[key]]));
}
// Input is a committed journal row selected by a future owner-scoped producer.
// This pure projection neither reads private answers nor enables any transport.
export async function projectAssistanceSignal(source,secret){
 if(typeof secret!=='string'||secret.length<32||secret.length>8192||!source||typeof source.id!=='string'||!/^help-[0-9a-f]{64}$/.test(source.id)||typeof source.projectId!=='string'||!source.projectId||source.projectId.length>256||source.type!=='assistance_requested'||!date(source.createdAt))fail();
 const payload=source.payload;
 if(!exact(payload,['contract','requestId','expectedRevision','topic'])||payload.contract!=='afw.assistance-request.v1'||typeof payload.requestId!=='string'||!UUID.test(payload.requestId)||!Number.isSafeInteger(payload.expectedRevision)||payload.expectedRevision<1||!topics.has(payload.topic))fail();
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const opaque=async purpose=>Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(JSON.stringify([VERSION,purpose,source.projectId,...(purpose==='event'?[source.id]:[])])))),x=>x.toString(16).padStart(2,'0')).join('');
 return validateAssistanceSignal({version:VERSION,eventId:await opaque('event'),projectRef:await opaque('project'),revision:payload.expectedRevision,kind:'assistance_requested',topic:payload.topic,observedAt:source.createdAt});
}
