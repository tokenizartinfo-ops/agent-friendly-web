import {createServer} from 'node:http';
import {createNodeReadiness} from './mcp-node-readiness.mjs';
import {createPrivateNodeBridge,createPrivateNodeDispatchHandler} from './mcp-node-private-bridge.mjs';

const unavailable=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const fail=()=>{throw Error('AFW Node unavailable');};

/** Product private port. No injected callback sender, DNS, TLS, control origin
 * or listening port. Original authority is resolved by the fixed control host. */
export async function startMcpNodeHttpServer({manifest,key}){
 const readiness=createNodeReadiness({manifest,key,now:Date.now});
 const bridge=createPrivateNodeBridge({key,containerId:manifest.containerId,processGeneration:manifest.processGeneration,expiresAt:manifest.expiresAt,now:Date.now});
 const dispatch=createPrivateNodeDispatchHandler({enabled:true,bridge,consume:r=>fetch('http://afw-node-control.internal/consume',{method:'POST',headers:r.headers,body:r.body,duplex:'half',redirect:'error',signal:r.signal})});
 const duration=manifest.expiresAt-Date.now();if(duration<=0||duration>600000)fail();
 const end=performance.now()+duration,active=new Set();let closed=false,leaseTimer;
 const stop=()=>{if(closed)return;closed=true;clearTimeout(leaseTimer);for(const c of active)c.abort();server.close();server.closeAllConnections();};
 const server=createServer({maxHeaderSize:8192},async(req,res)=>{
  const c=new AbortController();active.add(c);const abort=()=>{c.abort();req.destroy();},timer=setTimeout(abort,Math.max(1,Math.min(5000,end-performance.now())));
  req.once('aborted',abort);res.once('close',abort);
  res.setHeader('Connection','close');
  try{
   if(closed||performance.now()>=end||Date.now()>=manifest.expiresAt||req.method!=='POST'||!['/ready','/dispatch'].includes(req.url)||req.headers['content-type']!=='application/json'||req.headers['content-encoding']!==undefined)throw Error();
   const chunks=[];let count=0;
   const body=await Promise.race([(async()=>{for await(const chunk of req){if(c.signal.aborted)throw Error();count+=chunk.length;if(count>2048)throw Error();chunks.push(chunk);}return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(Buffer.concat(chunks));})(),new Promise((_,reject)=>c.signal.addEventListener('abort',()=>reject(Error()),{once:true}))]);
   if(c.signal.aborted||closed||performance.now()>=end)throw Error();
   const headers=new Headers();for(const name of ['content-type','x-afw-node-signature'])if(typeof req.headers[name]==='string')headers.set(name,req.headers[name]);
   let result;
   if(req.url==='/ready'){
    const p=readiness.respond({body,signature:headers.get('x-afw-node-signature')});
    result=new Response(p.body,{headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-AFW-Node-Signature':p.signature}});
   }else result=await dispatch(new Request('http://afw-node.internal/dispatch',{method:'POST',headers,body,signal:c.signal}));
   if(c.signal.aborted||closed||performance.now()>=end)throw Error();
   const text=await result.text();if(Buffer.byteLength(text)>8192)throw Error();res.writeHead(result.status,Object.fromEntries(result.headers));res.end(text);
  }catch{if(!res.destroyed){const r=unavailable();res.writeHead(r.status,Object.fromEntries(r.headers));res.end(await r.text());}}
  finally{clearTimeout(timer);active.delete(c);req.removeListener('aborted',abort);res.removeListener('close',abort);}
 });
 server.requestTimeout=5000;server.headersTimeout=5000;server.keepAliveTimeout=1000;
 // Native header checks are periodic. This absolute acceptance deadline also
 // covers partial headers, slow drips, and total headers+body time; no renewal.
 server.on('connection',socket=>{const timer=setTimeout(()=>socket.destroy(),Math.max(1,Math.min(5000,end-performance.now())));socket.once('close',()=>clearTimeout(timer));});
 server.on('clientError',(_error,socket)=>socket.destroy());
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(8080,'0.0.0.0',()=>{server.removeListener('error',reject);resolve();});});
 leaseTimer=setTimeout(stop,Math.max(1,end-performance.now()));
 return Object.freeze({stop});
}
