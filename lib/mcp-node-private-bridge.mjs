import {createHmac,createHash,hkdfSync,timingSafeEqual} from 'node:crypto';
import {sendSignedMcpCallback} from './mcp-callback-transport.mjs';

const sha=/^[0-9a-f]{64}$/, prefix='afw.private-node-bridge.v1:', purposes=['dispatch','consume','handoff','receipt'];
const unavailable=()=>new Error('Private Node bridge unavailable');
const fail=()=>{throw unavailable();};
const time=t=>Number.isSafeInteger(t)&&t>=0;
function exact(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
 const d=Object.getOwnPropertyDescriptors(value),own=Reflect.ownKeys(d);
 if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();
 return Object.fromEntries(keys.map(k=>[k,d[k].value]));
}
function reference(value){
 const r=exact(value,['id','generation','phase','digest','processGeneration','expiresAt']);
 if(typeof r.id!=='string'||!/^sub_[0-9a-f]{64}$/.test(r.id)||['generation','digest','processGeneration'].some(k=>typeof r[k]!=='string'||!sha.test(r[k]))||!['verification','delivery'].includes(r.phase)||!time(r.expiresAt))fail();
 return Object.freeze(r);
}
function payload(purpose,value,ref){
 if(purpose==='dispatch'||purpose==='consume'){if(value!==null)fail();return null;}
 if(purpose==='receipt'){
  const p=exact(value,['status','body']);if(!Number.isInteger(p.status)||p.status<200||p.status>299||typeof p.body!=='string'||Buffer.byteLength(p.body)>1024)fail();return Object.freeze(p);
 }
 const p=exact(value,['url','envelope','dispatchExpiresAt']),e=exact(p.envelope,['body','headers']);
 if(typeof p.url!=='string'||typeof e.body!=='string'||Buffer.byteLength(e.body)>262144||!time(p.dispatchExpiresAt)||p.dispatchExpiresAt>ref.expiresAt)fail();
 const h=exact(e.headers,['Content-Type','webhook-id','webhook-timestamp','webhook-signature','X-MCP-Subscription-Id']);if(Object.values(h).some(v=>typeof v!=='string'))fail();
 const envelope=Object.freeze({body:e.body,headers:Object.freeze(h)});
 if(createHash('sha256').update(JSON.stringify({url:p.url,envelope})).digest('hex')!==ref.digest)fail();
 return Object.freeze({url:p.url,envelope,dispatchExpiresAt:p.dispatchExpiresAt});
}

/** Server-only per-process service capability, never the journal custody key.
 * Cryptographic message integrity does not establish Container provenance or
 * permission: the host must resolve both independently for every consumption. */
export function createPrivateNodeBridge(options){
 const o=exact(options,['key','containerId','processGeneration','expiresAt','now']);
 if(!Buffer.isBuffer(o.key)||o.key.length!==32||typeof o.containerId!=='string'||!sha.test(o.containerId)||typeof o.processGeneration!=='string'||!sha.test(o.processGeneration)||!time(o.expiresAt)||typeof o.now!=='function')fail();
 const createdAt=o.now();if(!time(createdAt)||o.expiresAt<=createdAt||o.expiresAt-createdAt>600000)fail();
 const keys=Object.fromEntries(purposes.map(p=>[p,Buffer.from(hkdfSync('sha256',o.key,prefix,p,32))]));let last=createdAt;
 const clock=()=>{const t=o.now();if(!time(t)||t<last||t>=o.expiresAt)fail();last=t;return t;};
 const mac=(p,body)=>createHmac('sha256',keys[p]).update(prefix+p+':'+body).digest('hex');
 const checked=(r,t)=>{const ref=reference(r);if(ref.processGeneration!==o.processGeneration||ref.expiresAt<=t||ref.expiresAt>o.expiresAt)fail();return ref;};
 const verify=(purpose,packet)=>{
  if(!purposes.includes(purpose))fail();const t=clock(),p=exact(packet,['body','signature']);
  if(typeof p.body!=='string'||Buffer.byteLength(p.body)>300000||typeof p.signature!=='string'||!sha.test(p.signature)||!timingSafeEqual(Buffer.from(p.signature,'hex'),Buffer.from(mac(purpose,p.body),'hex')))fail();
  const m=exact(JSON.parse(p.body),['version','purpose','containerId','processGeneration','processExpiresAt','issuedAt','reference','payload']);
  if(JSON.stringify(m)!==p.body||m.version!==1||m.purpose!==purpose||m.containerId!==o.containerId||m.processGeneration!==o.processGeneration||m.processExpiresAt!==o.expiresAt||!time(m.issuedAt)||m.issuedAt-t>1000)fail();
  const ref=checked(m.reference,t);if(m.issuedAt>=ref.expiresAt)fail();const data=payload(purpose,m.payload,ref);if(data?.dispatchExpiresAt!==undefined&&data.dispatchExpiresAt<=t)fail();
  return Object.freeze({...m,reference:ref,payload:data});
 };
 return Object.freeze({
  sign(purpose,r,value=null){if(!purposes.includes(purpose))fail();const t=clock(),ref=checked(r,t),data=payload(purpose,value,ref);if(data?.dispatchExpiresAt!==undefined&&data.dispatchExpiresAt<=t)fail();const body=JSON.stringify({version:1,purpose,containerId:o.containerId,processGeneration:o.processGeneration,processExpiresAt:o.expiresAt,issuedAt:t,reference:ref,payload:data});return Object.freeze({body,signature:mac(purpose,body)});},
  verify,
  async identity(packet,readPlatformContext){
   const original=verify('consume',packet);if(typeof readPlatformContext!=='function')fail();
   const c=exact(await readPlatformContext(),['containerId','processGeneration','expiresAt']);
   verify('consume',packet);if(c.containerId!==o.containerId||c.processGeneration!==o.processGeneration||c.expiresAt!==o.expiresAt)fail();
   return Object.freeze({purpose:'afw.mcp-native-dispatch.v1',processGeneration:o.processGeneration,verified:true,expiresAt:Math.min(original.reference.expiresAt,o.expiresAt)});
  },
 });
}

const response=(status,body)=>new Response(body,{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const denied=()=>response(404,'{"code":"unavailable"}');
const wire=p=>response(200,p.body);
// Bound reading by the original transport deadline; never retry, follow a
// redirect or trust a Content-Length in place of the actual byte count.
async function readBody(stream,limit,signal){
 if(!stream)fail();const reader=stream.getReader(),chunks=[];let length=0;
 const cancel=()=>{void reader.cancel().catch(()=>{});};signal.addEventListener('abort',cancel,{once:true});
 try{while(true){if(signal.aborted)fail();const {value,done}=await reader.read();if(signal.aborted)fail();if(done)break;length+=value.byteLength;if(length>limit)fail();chunks.push(Buffer.from(value));}return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(Buffer.concat(chunks));}
 finally{signal.removeEventListener('abort',cancel);void reader.cancel().catch(()=>{});reader.releaseLock();}
}
async function bounded(expiresAt,now,parent,fn){
 const remaining=expiresAt-now();if(!time(expiresAt)||!Number.isSafeInteger(remaining)||remaining<=0||remaining>5000||parent!==undefined&&!(parent instanceof AbortSignal))fail();
  const c=new AbortController(),abort=()=>c.abort();let cancelled;
 const rejection=new Promise((_,reject)=>{cancelled=()=>reject(unavailable());c.signal.addEventListener('abort',cancelled,{once:true});});
 const timer=setTimeout(abort,remaining);parent?.addEventListener('abort',abort,{once:true});if(parent?.aborted)c.abort();
 // Race installs rejection handlers on both promises. Late completion remains
 // fenced by signal/identity checks; it cannot advance to a new durable stage.
 const operation=Promise.resolve().then(()=>{if(c.signal.aborted)fail();return fn(c.signal);});
 try{const result=await Promise.race([operation,rejection]);if(c.signal.aborted||now()>=expiresAt)fail();return result;}finally{clearTimeout(timer);parent?.removeEventListener('abort',abort);c.signal.removeEventListener('abort',cancelled);c.abort();}
}
function httpPacket(request,path){
 const u=new URL(request.url);if(request.method!=='POST'||u.pathname!==path||u.search||u.hash||request.headers.get('content-type')!=='application/json'||request.headers.has('content-encoding'))fail();
 const signature=request.headers.get('x-afw-node-signature');if(!signature||!sha.test(signature))fail();return signature;
}
async function exchange(fetcher,path,p,signal,limit){
 const r=await fetcher(new Request('http://afw-node.internal'+path,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json','X-AFW-Node-Signature':p.signature},body:p.body,signal}));
 if(!(r instanceof Response)||r.status!==200||r.redirected||r.headers.get('content-type')!=='application/json'||r.headers.has('content-encoding'))fail();
 return {body:await readBody(r.body,limit,signal),signature:r.headers.get('x-afw-node-signature')};
}
const signedResponse=p=>{const r=wire(p);r.headers.set('X-AFW-Node-Signature',p.signature);return r;};
function match(proof,ref){if(JSON.stringify(proof.reference)!==JSON.stringify(reference(ref)))fail();}

/** INTERNAL Worker control handler. No public route; createController must
 * instantiate request-bound identity on the SAME original authority/storage.
 * readPlatformContext comes from the platform, never from request claims. */
export function createPrivateNodeConsumeHandler({enabled=false,bridge,readPlatformContext,createController,now=Date.now}={}){
 if(enabled!==true)return async()=>denied();
 if(!bridge||typeof readPlatformContext!=='function'||typeof createController!=='function'||typeof now!=='function')fail();
 return async request=>{try{
  const signature=httpPacket(request,'/consume');
  // Parsing has a separate <=5s bound; signed reference controls all later work.
  return await bounded(now()+5000,now,request.signal,async signal=>{
   const packet={body:await readBody(request.body,2048,signal),signature},proof=bridge.verify('consume',packet);
   return bounded(proof.reference.expiresAt,now,signal,async active=>{
    const readIdentity=async ref=>{if(active.aborted)fail();match(proof,ref);const identity=await bridge.identity(packet,readPlatformContext);if(active.aborted)fail();return identity;};
    await readIdentity(proof.reference);const controller=await createController(Object.freeze({processGeneration:proof.processGeneration,readIdentity}));
    await readIdentity(proof.reference);const h=await controller.consumeNodeDispatch(proof.reference);
    match({reference:h.reference},proof.reference);await readIdentity(proof.reference);
    return signedResponse(bridge.sign('handoff',proof.reference,{url:h.url,envelope:h.envelope,dispatchExpiresAt:h.dispatchExpiresAt}));
   });
  });
 }catch{return denied();}};
}

/** INTERNAL private Node port handler. consume is fixed server transport to
 * the virtual control hostname. The default HTTPS sender is native/pinned.
 * Test injection cannot prove public callback or Cloudflare provenance. */
export function createPrivateNodeDispatchHandler({enabled=false,bridge,consume,send=sendSignedMcpCallback,now=Date.now}={}){
 if(enabled!==true)return async()=>denied();if(!bridge||typeof consume!=='function'||typeof send!=='function'||typeof now!=='function')fail();
 return async request=>{try{
  const signature=httpPacket(request,'/dispatch');
  return await bounded(now()+5000,now,request.signal,async signal=>{
   const packet={body:await readBody(request.body,2048,signal),signature},proof=bridge.verify('dispatch',packet);
   return bounded(proof.reference.expiresAt,now,signal,async active=>{
    const returned=await exchange(consume,'/consume',bridge.sign('consume',proof.reference),active,300000),handoff=bridge.verify('handoff',returned);match(handoff,proof.reference);
    bridge.verify('dispatch',packet);
    const reply=await bounded(handoff.payload.dispatchExpiresAt,now,active,s=>send(handoff.payload.url,handoff.payload.envelope,s));
    bridge.verify('dispatch',packet);return signedResponse(bridge.sign('receipt',proof.reference,reply));
   });
  });
 }catch{return denied();}};
}

/** Server-only sender: dispatch gets an opaque signed reference, never bytes. */
export function createPrivateNodeSender({bridge,dispatch,now=Date.now}){
 if(!bridge||typeof dispatch!=='function'||typeof now!=='function')fail();
 return async(value,signal)=>{const ref=reference(value);return bounded(ref.expiresAt,now,signal,async active=>{
  const packet=bridge.sign('dispatch',ref),r=await exchange(dispatch,'/dispatch',packet,active,8192),p=bridge.verify('receipt',r);match(p,ref);return p.payload;
 });};
}
