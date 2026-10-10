import {computeServiceIdentityDigest} from './assistance-service-identity-disable.mjs';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const fail=()=>{throw Error('Provider token name unavailable');};
function metadata(value){if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();const out={};for(const key of Reflect.ownKeys(value)){const d=Object.getOwnPropertyDescriptor(value,key);if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value')||(d.value!==null&&!['string','boolean','number'].includes(typeof d.value)))fail();Object.defineProperty(out,key,{value:d.value,enumerable:true});}return Object.freeze(out);}
/** Private fallback for the observed point-GET shape. Independently listed exact
 * ID supplies name only; metadata/state/version must agree. No rename, retry,
 * custody attestation, consumer endpoint or permission to PUT is returned. */
export async function resolveProviderTokenName({point,accountId,tokenId,expectedName,credential,fetchImpl,signal,live}){
 const original=metadata(point);if(!/^[0-9a-f]{32}$/.test(accountId)||!UUID.test(tokenId)||original.id!==tokenId||Object.hasOwn(original,'name')||typeof original.enabled!=='boolean'||typeof fetchImpl!=='function'||typeof live!=='function'||!live())fail();
 // Validate every point field before sending a fallback request. The placeholder
 // validates schema only and is never persisted, returned or used as evidence.
 await computeServiceIdentityDigest({...original,name:'schema-only-placeholder'});if(!live())fail();
 const rows=[],seen=new Set();let total,totalPages;
 for(let page=1;page<=4;page++){
  if(!live())fail();const response=await fetchImpl('https://api.cloudflare.com/client/v4/accounts/'+accountId+'/access/service_tokens?page='+page+'&per_page=100',{method:'GET',headers:{Authorization:'Bearer '+credential,Accept:'application/json'},redirect:'manual',signal});
  if(!live()||response?.status!==200||!/^application\/json(?:\s*;.*)?$/i.test(response.headers.get('Content-Type')?.trim()||'')||!response.body)fail();
  const declared=response.headers.get('Content-Length');if(declared!==null&&(!/^\d+$/.test(declared)||Number(declared)>262144))fail();
  const reader=response.body.getReader(),chunks=[];let length=0,payload;
  const cancel=()=>{Promise.resolve(reader.cancel()).catch(()=>{});};
  signal.addEventListener('abort',cancel,{once:true});
  try{if(!live())fail();for(;;){const {done,value}=await reader.read();if(!live())fail();if(done)break;length+=value.byteLength;if(length>262144)fail();chunks.push(value);}const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}payload=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}finally{signal.removeEventListener('abort',cancel);cancel();}
  if(!live()||payload?.success!==true||(payload.errors!==undefined&&(!Array.isArray(payload.errors)||payload.errors.length))||!Array.isArray(payload.result))fail();
  const info=payload.result_info;if(!info||![info.page,info.per_page,info.count,info.total_count,info.total_pages].every(Number.isSafeInteger)||info.page!==page||info.per_page!==100||info.count!==payload.result.length||info.count<0||info.count>100||info.total_count<0||info.total_count>400||info.total_pages<1||info.total_pages>4)fail();
  if(page===1){total=info.total_count;totalPages=info.total_pages;}else if(info.total_count!==total||info.total_pages!==totalPages)fail();
  for(const row of payload.result){if(!row||typeof row.id!=='string'||!UUID.test(row.id)||seen.has(row.id))fail();seen.add(row.id);rows.push(row);}
  if(page===totalPages)break;
 }
 if(rows.length!==total||!live())fail();const raw=rows.find(row=>row.id===tokenId);if(!raw)fail();const selected=metadata(raw);
 if(typeof selected.name!=='string'||(expectedName!==undefined&&selected.name!==expectedName)||selected.enabled!==original.enabled)fail();
 const normalized=Object.freeze({...original,name:selected.name});if(await computeServiceIdentityDigest(normalized)!==await computeServiceIdentityDigest(selected)||!live())fail();return normalized;
}
