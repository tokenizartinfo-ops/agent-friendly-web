import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
export const finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
const max=16384;
export function qualifyFiniteOwnerNoticeGetRequest(request,bytes){
 if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length||request.url.length>max)fail(400);
 if(request.url!==origin+'/monitoring')fail(404);
 if(request.method!=='GET')fail(405);
 const from=request.headers.get('Origin');if(from!==null&&from!==origin)fail(403);
 const cookie=request.headers.get('Cookie')??'',assertion=request.headers.get('Cf-Access-Jwt-Assertion')??'';
 if(cookie.length>8192||assertion.length>8192||/[\r\n]/.test(cookie+assertion))fail(400);
 const names=new Set();for(const part of cookie.split(';').filter(x=>x.trim())){const match=/^\s*([^=\s]+)=([^;\s]*)\s*$/.exec(part);if(!match||names.has(match[1]))fail(400);names.add(match[1]);}
 return Object.freeze({method:'GET',url:request.url});
}
export function readFiniteOwnerNoticeGetMetadata(headers){
 const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
 if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
 const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
 if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
 const method=headers.get('x-afw-finite-original-method'),url=headers.get('x-afw-finite-original-url'),mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
 if(method!=='GET'||url!==origin+'/monitoring'||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
 return Object.freeze({boundary,method:'GET',url,mVersionId,requestId});
}
