import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
export {finiteNativeOrigin,finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativeCancel,finiteNativePending} from './mcp-qa-finite-owner-native-wire.mjs';
export const finiteOwnerOAuthTarget='https://afw-private.invalid/_finite-owner/authorize';
const max=16384;
function shape(params,keys,multiple=[]){
 for(const key of params.keys())if(!keys.includes(key))fail(400);
 for(const key of keys)if(params.getAll(key).length>1&&!multiple.includes(key))fail(400);
 for(const [key,value]of params)if(!value||value.length>4096||/[\u0000-\u001f\u007f]/.test(key+value))fail(400);
}
export function qualifyFiniteOwnerOAuthRequest(request,bytes){
 if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length>max)fail(400);
 const url=new URL(request.url);
 if(url.origin!==origin||url.pathname!=='/authorize'||url.hash||url.username||url.password||request.url.length>max)fail(404);
 if(!['GET','POST'].includes(request.method))fail(405);
 let form=null;
 if(request.method==='GET'){
  if(bytes.length)fail(400);
  const q=url.searchParams,keys=['client_id','redirect_uri','response_type','resource','scope','state','code_challenge','code_challenge_method'];
  shape(q,keys);if(keys.some(k=>q.getAll(k).length!==1)||q.get('response_type')!=='code'||q.get('resource')!==origin+'/mcp'||q.get('code_challenge_method')!=='S256'||!/^[-_A-Za-z0-9]{43}$/.test(q.get('code_challenge')))fail(400);
  const redirect=new URL(q.get('redirect_uri'));if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.hash)fail(400);
 }else{
  if(url.search||request.headers.get('Origin')!==origin||!/^application\/x-www-form-urlencoded(?:;\s*charset=UTF-8)?$/i.test(request.headers.get('Content-Type')??''))fail(400);
  let raw;try{raw=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{fail(400);}
  if(/%(?![a-f0-9]{2})/i.test(raw))fail(400);
  form=new URLSearchParams(raw);shape(form,['handle','decision','scope','project'],['scope']);
  if(form.getAll('handle').length!==1||!/^[-_A-Za-z0-9]{43}$/.test(form.get('handle'))||form.getAll('decision').length!==1||form.get('decision')!=='approve'||!form.getAll('scope').length||form.getAll('scope').length>2||new Set(form.getAll('scope')).size!==form.getAll('scope').length||form.getAll('scope')[0]!=='afw:project:read'||form.getAll('scope').some(s=>!['afw:project:read','afw:evidence:read'].includes(s)))fail(400);
 }
 const cookie=request.headers.get('Cookie')??'',assertion=request.headers.get('Cf-Access-Jwt-Assertion')??'';
 if(cookie.length>8192||assertion.length>8192||/[\r\n]/.test(cookie+assertion))fail(400);
 const names=new Set();for(const part of cookie.split(';').filter(x=>x.trim())){const match=/^\s*([^=\s]+)=([^;\s]*)\s*$/.exec(part);if(!match||names.has(match[1]))fail(400);names.add(match[1]);}
 return Object.freeze({method:request.method,url:request.url,form});
}
export function readFiniteOwnerOAuthMetadata(headers){
 const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
 if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
 const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
 if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
 const method=headers.get('x-afw-finite-original-method'),url=headers.get('x-afw-finite-original-url'),mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
 if(!['GET','POST'].includes(method)||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
 const original=new URL(url);if(original.origin!==origin||original.pathname!=='/authorize'||original.hash||method==='POST'&&original.search)fail(400);
 return Object.freeze({boundary,method,url,mVersionId,requestId});
}
