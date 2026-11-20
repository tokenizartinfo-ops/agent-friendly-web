import backup from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {createHash} from 'node:crypto';

const host='85d0d5dadac3341a564f22ce885e9eec.r2.cloudflarestorage.com';
const allowed=new Set(['X-Amz-Algorithm','X-Amz-Credential','X-Amz-Date','X-Amz-Expires','X-Amz-Signature',
 'X-Amz-SignedHeaders','X-Amz-Content-Sha256','X-Amz-Security-Token','x-id']);
const fail=()=>{throw Error('Finite R2 archive unavailable');};

function signedObject(credential,at,requiredUntil,objectKey=backup.objectKey,method='GET'){
 if(typeof credential!=='string'||credential.length>8192||!/^https:\/\/[!-~]+$/.test(credential)||
    !Number.isSafeInteger(at)||!Number.isSafeInteger(requiredUntil)||requiredUntil<at)fail();
 const url=new URL(credential);
 if(url.protocol!=='https:'||url.port||url.username||url.password||url.hash||backup.bucket!=='afw-release-backups'||
    !/^historical-v1\/sha256-[a-f0-9]{64}\.zip$/.test(backup.objectKey)||
    backup.objectKey!=='historical-v1/sha256-'+backup.archiveSha256+'.zip')fail();
 const path='/'+objectKey,write=method==='PUT';
 if(!(url.hostname===host&&url.pathname==='/'+backup.bucket+path||
      url.hostname===backup.bucket+'.'+host&&url.pathname===path))fail();
 const p=url.searchParams,keys=[...p.keys()];
 if(keys.some(k=>!allowed.has(k))||new Set(keys).size!==keys.length||
    p.get('X-Amz-Algorithm')!=='AWS4-HMAC-SHA256'||p.get('X-Amz-SignedHeaders')!==(write?'host;if-none-match':'host')||
    !/^[a-f0-9]{64}$/.test(p.get('X-Amz-Signature')??'')||
    p.has('X-Amz-Content-Sha256')&&p.get('X-Amz-Content-Sha256')!=='UNSIGNED-PAYLOAD'||
    p.has('x-id')&&p.get('x-id')!==(write?'PutObject':'GetObject')||p.has('X-Amz-Security-Token')&&!p.get('X-Amz-Security-Token'))fail();
 const stamp=p.get('X-Amz-Date')??'',ttl=p.get('X-Amz-Expires')??'',scope=(p.get('X-Amz-Credential')??'').split('/');
 if(!/^\d{8}T\d{6}Z$/.test(stamp)||!/^\d{1,6}$/.test(ttl)||Number(ttl)<1||Number(ttl)>604800||
    scope.length!==5||!/^[A-Za-z0-9]{16,128}$/.test(scope[0])||scope[1]!==stamp.slice(0,8)||
    scope[2]!=='auto'||scope[3]!=='s3'||scope[4]!=='aws4_request')fail();
 const signedAt=Date.parse(stamp.slice(0,4)+'-'+stamp.slice(4,6)+'-'+stamp.slice(6,8)+'T'+
  stamp.slice(9,11)+':'+stamp.slice(11,13)+':'+stamp.slice(13,15)+'Z');
 if(!Number.isSafeInteger(signedAt)||stamp!==new Date(signedAt).toISOString().replace(/[-:]/g,'').replace('.000','')||
    signedAt>at||signedAt+Number(ttl)*1000<=Math.max(at,requiredUntil))fail();
 return url.href;
}

export function assertFiniteR2ArchiveCredential(credential,{now=Date.now,requiredUntil}={}){
 try{const at=now();signedObject(credential,at,requiredUntil??at+15000);}catch{fail();}
}

/** Retrieve a signing-authorized GET for the fixed archive. Cloudflare
 * verifies the signature and the callers independently verify the bytes. */
export async function readFiniteR2Archive({credential,fetchImpl=fetch,now=Date.now,requiredUntil,signal}={}){
 try{
  const at=now(),url=signedObject(credential,at,requiredUntil??at+15000);
  if(!(signal instanceof AbortSignal)||signal.aborted)fail();
  const r=await fetchImpl(url,{method:'GET',redirect:'error',cache:'no-store',credentials:'omit',
   referrerPolicy:'no-referrer',signal,headers:{Accept:'application/octet-stream'}});
  const length=r?.headers?.get('content-length'),mime=r?.headers?.get('content-type')?.split(';')[0].toLowerCase();
  if(signal.aborted||!(r instanceof Response)||r.redirected||r.status!==200||!r.body||
     !['application/zip','application/octet-stream'].includes(mime)||length!==null&&length!==String(backup.archiveBytes))fail();
  return r;
 }catch{fail();}
}

/** One create-only write, followed by an independent read of the same
 * immutable source key. A lost response can reconcile but never replay. */
export async function storeFiniteR2Bundle({sourceRevision,bytes,writeCredential,readCredential,fetchImpl=fetch,now=Date.now,signal}={}){
 try{
  if(typeof sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(sourceRevision)||!(bytes instanceof Uint8Array)||
     bytes.byteLength<1||bytes.byteLength>64*1024*1024||!(signal instanceof AbortSignal)||signal.aborted)fail();
  const objectKey='finite-bundles-v1/'+sourceRevision+'.zip',at=now();
  const write=signedObject(writeCredential,at,at+15000,objectKey,'PUT');
  const read=signedObject(readCredential,at,at+15000,objectKey);
  const expected=createHash('sha256').update(bytes).digest('hex');
  const common={redirect:'error',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal};
  let put;
  try{
   put=await fetchImpl(write,{...common,method:'PUT',headers:{'If-None-Match':'*','Content-Type':'application/zip'},body:bytes});
  }catch{/* An unacknowledged write is observed once through the separate GET. */}
  if(put!==undefined){
   if(!(put instanceof Response)||put.redirected||![200,412].includes(put.status))fail();
   await put.body?.cancel();
  }
  if(signal.aborted)fail();
  const r=await fetchImpl(read,{...common,method:'GET',headers:{Accept:'application/octet-stream'}});
  const mime=r?.headers?.get('content-type')?.split(';')[0].toLowerCase();
  if(!(r instanceof Response)||r.redirected||r.status!==200||!r.body||
     !['application/zip','application/octet-stream'].includes(mime)||
     r.headers.get('content-length')!==String(bytes.byteLength))fail();
  const sha=createHash('sha256');let size=0;
  for await(const chunk of r.body){
   if(signal.aborted||!(chunk instanceof Uint8Array)||(size+=chunk.byteLength)>bytes.byteLength)fail();
   sha.update(chunk);
  }
  if(signal.aborted||size!==bytes.byteLength||sha.digest('hex')!==expected)fail();
  return Object.freeze({objectKey,archiveSha256:expected,archiveBytes:size,status:put?.status===200?'created_verified':'readback_verified'});
 }catch{fail();}
}
