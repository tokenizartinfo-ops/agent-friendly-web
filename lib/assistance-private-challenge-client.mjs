import {createOperationsHttpTransport} from './operations-http-transport.mjs';
const HASH=/^[0-9a-f]{64}$/,PATH='/assistance/custody/confirm';
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
const time=t=>Number.isSafeInteger(t)&&t>=0&&t<=8640000000000000;
const fail=()=>{throw Error('Private challenge exchange unavailable');};
const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
/** One attempt per client; at most two POSTs, no retry, no file/cache or nonce
 * output. Receipt metadata is not provisioning or permission to install.
 */
export function createPrivateChallengeClient({env={},fetchImpl=fetch,timeoutMs=10000,now=Date.now}={}){
 const request=createOperationsHttpTransport({env,fetchImpl,timeoutMs});let used=false,last=-1;
 return Object.freeze({async confirm(plan){try{
  if(used||!exact(plan,['recordRef','startAt','deadline'])||typeof plan.recordRef!=='string'||!HASH.test(plan.recordRef)||!time(plan.startAt)||!time(plan.deadline)||plan.deadline<=plan.startAt||plan.deadline-plan.startAt>600000||typeof now!=='function')fail();
  const p=Object.freeze({...plan});
  const clock=()=>{const t=now();if(!time(t)||t<last||t<p.startAt||t>=p.deadline)fail();last=t;return t;};
  clock();used=true;
  const issued=await request(PATH,{challenge:'request'});clock();
  if(!exact(issued,['nonce','recordRef'])||issued.recordRef!==p.recordRef||typeof issued.nonce!=='string'||!HASH.test(issued.nonce))fail();
  const receipt=await request(PATH,{nonce:issued.nonce}),at=clock();
  if(!exact(receipt,['contract','state','recordRef','receiptRef','issuedAt','deadline','consumedAt'])||receipt.contract!=='afw-private-custody-challenge/v1'||receipt.state!=='confirmed'||receipt.recordRef!==p.recordRef||typeof receipt.receiptRef!=='string'||!HASH.test(receipt.receiptRef)||receipt.deadline!==p.deadline||!time(receipt.issuedAt)||!time(receipt.consumedAt)||receipt.issuedAt<p.startAt||receipt.consumedAt<receipt.issuedAt||receipt.consumedAt>at||receipt.consumedAt>=p.deadline)fail();
  const nonceDigest=await digest(issued.nonce);clock();
  const receiptRef=await digest(JSON.stringify([p.recordRef,nonceDigest,receipt.issuedAt,p.deadline]));clock();
  if(receiptRef!==receipt.receiptRef)fail();
  return Object.freeze({...receipt});
 }catch{fail();}}});
}
