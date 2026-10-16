import {createHash} from 'node:crypto';

const fields=['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt'],sha=/^[0-9a-f]{64}$/;
const fail=()=>{throw Error('Original Container runtime unavailable');};
const time=t=>Number.isSafeInteger(t)&&t>=0;
function exact(value,names){if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(value),keys=Reflect.ownKeys(d);if(keys.length!==names.length||keys.some(k=>typeof k!=='string'||!names.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.fromEntries(names.map(k=>[k,d[k].value]));}
async function bounded(ms,parent,fn){
 if(!(parent instanceof AbortSignal)||ms<=0)fail();const c=new AbortController(),abort=()=>c.abort();let rejectAbort;
 const rejection=new Promise((_,reject)=>{rejectAbort=()=>reject(Error('Original Container runtime unavailable'));c.signal.addEventListener('abort',rejectAbort,{once:true});});
 const timer=setTimeout(abort,ms);parent.addEventListener('abort',abort,{once:true});if(parent.aborted)abort();
 try{const result=await Promise.race([Promise.resolve().then(()=>{if(c.signal.aborted)fail();return fn(c.signal);}),rejection]);if(c.signal.aborted)fail();return result;}
 finally{clearTimeout(timer);parent.removeEventListener('abort',abort);c.signal.removeEventListener('abort',rejectAbort);c.abort();}
}
async function packet(response,signal){
 if(!(response instanceof Response)||response.status!==200||response.redirected||response.headers.get('content-type')!=='application/json'||response.headers.has('content-encoding')||!response.body)fail();
 const reader=response.body.getReader(),chunks=[];let size=0;const cancel=()=>{void reader.cancel().catch(()=>{});};signal.addEventListener('abort',cancel,{once:true});
 try{while(true){if(signal.aborted)fail();const {value,done}=await reader.read();if(signal.aborted)fail();if(done)break;size+=value.byteLength;if(size>2048)fail();chunks.push(Buffer.from(value));}return {body:new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(Buffer.concat(chunks)),signature:response.headers.get('x-afw-node-signature')};}
 finally{signal.removeEventListener('abort',cancel);void reader.cancel().catch(()=>{});reader.releaseLock();}
}

/** INTERNAL host-trusted hooks, not standalone permission or remote mounting.
 * ctx must be the original platform DO, makeControl a server-fixed entrypoint.
 * Custody supplies the first-ACK boot budget and fresh primary authorization. */
export function createOriginalContainerRuntime(options,observe){
 const invalid=stage=>{try{if(typeof observe==='function')observe(stage);}catch{}fail();};
 let o;try{o=exact(options,['enabled','ctx','program','sourceRevision','window','makeControl','now']);}catch{invalid('native_runtime_options_invalid');}
 if(o.enabled!==true)invalid('native_runtime_options_invalid');
 if(typeof o.program!=='string'||!o.program||Buffer.byteLength(o.program)>262144||typeof o.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(o.sourceRevision)||typeof o.makeControl!=='function'||typeof o.now!=='function')invalid('native_runtime_inputs_invalid');
 let w;try{w=Object.freeze(exact(o.window,['startAt','expiresAt']));}catch{invalid('native_runtime_window_invalid');}
 if(!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000)invalid('native_runtime_window_invalid');
 let id,container;try{id=o.ctx?.id?.toString();container=o.ctx?.container;}catch{invalid('native_runtime_context_invalid');}
 if(typeof id!=='string'||!sha.test(id))invalid('native_runtime_identity_invalid');
 if(!container)invalid('native_container_absent');
 for(const [key,stage]of [['start','native_container_start_unavailable'],['setInactivityTimeout','native_container_timeout_unavailable'],['interceptOutboundHttp','native_container_intercept_unavailable'],['getTcpPort','native_container_port_unavailable'],['destroy','native_container_destroy_unavailable']]){
  let method;try{method=container[key];}catch{invalid(stage);}if(typeof method!=='function')invalid(stage);
 }
 const hash=createHash('sha256').update(o.program).digest('hex');let last=-1,attempted=false,closed=false;
 const clock=()=>{const t=o.now();if(!time(t)||t<last||t<w.startAt||t>=w.expiresAt||closed)fail();last=t;return t;};
 const check=(value,signal)=>{if(!(signal instanceof AbortSignal)||signal.aborted)fail();const m=Object.freeze(exact(value,fields)),t=clock();if(m.containerId!==id||m.programHash!==hash||m.sourceRevision!==o.sourceRevision||m.image!=='cloudflare/debian-trixie'||typeof m.processGeneration!=='string'||!sha.test(m.processGeneration)||!time(m.createdAt)||m.createdAt<w.startAt||m.createdAt>t||!time(m.expiresAt)||m.expiresAt<=t||m.expiresAt>w.expiresAt||m.expiresAt<=m.createdAt||m.expiresAt-m.createdAt>600000)fail();return m;};
 const keepOriginal=async(m,signal)=>{check(m,signal);if(container.running!==true)fail();await container.setInactivityTimeout(m.expiresAt-clock());check(m,signal);if(container.running!==true)fail();};
 return Object.freeze({
  async launch(value,signal){
   const data=exact(value,[...fields,'key']),m=check(Object.fromEntries(fields.map(k=>[k,data[k]])),signal);if(attempted||container.running!==false||!Buffer.isBuffer(data.key)||data.key.length!==32)fail();attempted=true;
   const control=await o.makeControl(Object.freeze({containerId:id,processGeneration:m.processGeneration,expiresAt:m.expiresAt}));check(m,signal);if(!control||typeof control.fetch!=='function'||container.running!==false)fail();
   await container.start({image:m.image,instance:'lite',enableInternet:true,entrypoint:['node','--input-type=module','-e',o.program],env:{AFW_NODE_BOOTSTRAP:JSON.stringify({manifest:m,key:data.key.toString('base64')})}});
   check(m,signal);if(container.running!==true)fail();await container.interceptOutboundHttp('afw-node-control.internal',control);await keepOriginal(m,signal);
  },
  async observe(value,signal,makeProbe){
   const m=check(value,signal);if(typeof makeProbe!=='function'||container.running!==true)fail();await keepOriginal(m,signal);
   return bounded(Math.min(30000,m.expiresAt-clock()),signal,async active=>{
    for(let attempt=0;attempt<60;attempt++){
     check(m,active);if(container.running!==true)fail();const probe=await makeProbe();check(m,active);if(!probe?.request||typeof probe.accept!=='function')fail();
     let refused=false;
     const result=await bounded(Math.min(5000,m.expiresAt-clock()),active,async current=>{
      let response;try{response=await container.getTcpPort(8080).fetch(new Request('http://afw-node.internal/ready',{method:'POST',headers:{'Content-Type':'application/json','X-AFW-Node-Signature':probe.request.signature},body:probe.request.body,signal:current}));}catch{if(current.aborted)fail();refused=true;return null;}
      return probe.accept(await packet(response,current));
     });
     check(m,active);if(container.running!==true)fail();
     if(!refused){const r=exact(result,[...fields,'running']);if(r.running!==true||fields.some(k=>r[k]!==m[k]))fail();return Object.freeze(r);}
     await bounded(Math.min(250,m.expiresAt-clock()),active,s=>new Promise(resolve=>{const timer=setTimeout(resolve,200);s.addEventListener('abort',()=>{clearTimeout(timer);resolve();},{once:true});}));
    }fail();
   });
  },
  async close(){closed=true;await container.destroy();return Object.freeze({stopRequested:true});},
 });
}
