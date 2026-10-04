import {validateSignal} from './operations-ledger.mjs';

async function receipt(response,abort) {
  if(response.status!==202||!response.headers.get('content-type')?.startsWith('application/json')||!response.body)throw Error('Invalid receipt');
  const reader=response.body.getReader();let text='',size=0;const decoder=new TextDecoder();
  const cancel=()=>{void reader.cancel().catch(()=>{});};abort.addEventListener('abort',cancel,{once:true});
  try {for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>1024)throw Error('Receipt too large');text+=decoder.decode(value,{stream:true});}return JSON.parse(text+decoder.decode());}
  finally {abort.removeEventListener('abort',cancel);cancel();}
}

/** Fixed internal receiver only; signing values never returned or logged. */
export async function deliverOperationalSignal({signal,secret,receiver,now=Date.now}={}) {
  const time=now(),validated=validateSignal(signal,time);
  if(typeof secret!=='string'||secret.length<32||typeof receiver?.fetch!=='function')throw Error('Producer not configured');
  const body=JSON.stringify(validated),timestamp=String(time);
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const signature=Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(timestamp+'.'+body))),x=>x.toString(16).padStart(2,'0')).join('');
  const controller=new AbortController();let timer;
  try {
    const request=new Request('https://operations.agentfriendlyweb.dev/signals',{method:'POST',redirect:'error',signal:controller.signal,headers:{'content-type':'application/json','x-afw-timestamp':timestamp,'x-afw-signature':signature},body});
    const delivered=(async()=>{const response=await receiver.fetch(request);try{return await receipt(response,controller.signal);}finally{void response.body?.cancel().catch(()=>{});}})();
    const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Delivery timeout'));},5000);});
    const value=await Promise.race([delivered,timeout]);
    if(value?.accepted!==true||typeof value.duplicate!=='boolean'||! /^[0-9a-f]{64}$/.test(value.fingerprint??''))return {ok:false,reason:'receipt_invalid'};
    return {ok:true,duplicate:value.duplicate};
  } catch {return {ok:false,reason:'delivery_unconfirmed'};}
  finally {clearTimeout(timer);controller.abort();}
}
