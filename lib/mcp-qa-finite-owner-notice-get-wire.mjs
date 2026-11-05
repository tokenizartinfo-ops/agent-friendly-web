import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
export const finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
// Historical get filename; both fixed notice conduits share grammar only.
export const finiteOwnerNoticeConsentTarget='https://afw-private.invalid/_finite-owner/monitoring/grant';
const max=16384;
function cookieList(headers){
 const raw=headers.get('Cookie'),assertion=headers.get('Cf-Access-Jwt-Assertion')??'';
 if((raw?.length??0)>8192||assertion.length>8192||/[\r\n]/.test((raw??'')+assertion))fail(400);
 if(raw===null)return;
 const cookie=raw.replace(/^[ \t]+|[ \t]+$/g,'');if(!cookie)fail(400);
 const names=new Set();
 for(const part of cookie.split('; ')){
  const at=part.indexOf('='),name=part.slice(0,at),value=part.slice(at+1);
  if(at<1||!/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(name)||names.has(name))fail(400);
  names.add(name);
  const octets=value.startsWith('"')&&value.endsWith('"')&&value.length>=2?value.slice(1,-1):value;
  if(!/^[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*$/.test(octets))fail(400);
 }
}
function metadata(headers,method,url){
 const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
 if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
 const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
 if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
 const mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
 if(headers.get('x-afw-finite-original-method')!==method||headers.get('x-afw-finite-original-url')!==url||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
 return Object.freeze({boundary,method,url,mVersionId,requestId});
}
export function qualifyFiniteOwnerNoticeGetRequest(request,bytes){
 if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length||request.url.length>max)fail(400);
 if(request.url!==origin+'/monitoring')fail(404);
 if(request.method!=='GET')fail(405);
 const from=request.headers.get('Origin');if(from!==null&&from!==origin)fail(403);
 cookieList(request.headers);
 return Object.freeze({method:'GET',url:request.url});
}
export function readFiniteOwnerNoticeGetMetadata(headers){return metadata(headers,'GET',origin+'/monitoring');}
export function readFiniteOwnerNoticeConsentMetadata(headers){return metadata(headers,'POST',origin+'/monitoring/grant');}
export function qualifyFiniteOwnerNoticeConsentRequest(request,bytes){
 if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||!bytes.length||bytes.length>1024||request.url.length>max)fail(400);
 if(request.url!==origin+'/monitoring/grant')fail(404);
 if(request.method!=='POST')fail(405);
 if(request.headers.get('Origin')!==origin)fail(403);
 if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')fail(400);
 cookieList(request.headers);
 let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{fail(400);}
 if(/%(?![a-f0-9]{2})/i.test(text))fail(400);
 const form=new URLSearchParams(text),entries=[...form];
 if(entries.length!==1||entries[0][0]!=='handle'||form.getAll('handle').length!==1||!/^[A-Za-z0-9_-]{43}$/.test(entries[0][1]))fail(400);
 return Object.freeze({method:'POST',url:request.url,handle:entries[0][1]});
}
