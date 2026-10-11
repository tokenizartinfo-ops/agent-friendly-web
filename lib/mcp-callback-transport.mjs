import {Resolver} from 'node:dns/promises';
import {request} from 'node:https';
import {checkServerIdentity} from 'node:tls';
import {isIP} from 'node:net';
import {parseMcpCallbackUrl,isPublicCallbackIp} from './mcp-callback-network.mjs';

const headerNames=['Content-Type','webhook-id','webhook-timestamp','webhook-signature','X-MCP-Subscription-Id'];
const unavailable=()=>new Error('MCP callback transport unavailable');
const signalAborted=Object.getOwnPropertyDescriptor(AbortSignal.prototype,'aborted').get;
const addListener=EventTarget.prototype.addEventListener;
const removeListener=EventTarget.prototype.removeEventListener;
function data(object,keys){
 if(!object||Object.getPrototypeOf(object)!==Object.prototype||!Object.isFrozen(object))throw unavailable();
 const descriptors=Object.getOwnPropertyDescriptors(object),own=Reflect.ownKeys(descriptors);
 if(own.length!==keys.length||own.some(key=>!keys.includes(key)))throw unavailable();
 const result={};
 for(const key of keys){const d=descriptors[key];if(!d||!Object.hasOwn(d,'value')||typeof d.value!=='string'&&key!=='headers')throw unavailable();result[key]=d.value;}
 return result;
}
function snapshot(envelope){
 const message=data(envelope,['body','headers']),headers=data(message.headers,headerNames);
 if(typeof message.body!=='string'||Buffer.byteLength(message.body)>262144||headers['Content-Type']!=='application/json'||!/^\d{1,16}$/.test(headers['webhook-timestamp'])||!Number.isSafeInteger(Number(headers['webhook-timestamp']))||String(Number(headers['webhook-timestamp']))!==headers['webhook-timestamp'])throw unavailable();
 for(const name of ['webhook-id','X-MCP-Subscription-Id'])if(!/^[a-zA-Z0-9_-]{1,128}$/.test(headers[name]))throw unavailable();
 const signature=headers['webhook-signature'];
 if(!/^v1,[A-Za-z0-9+/]{43}=$/.test(signature)||Buffer.from(signature.slice(3),'base64').toString('base64')!==signature.slice(3))throw unavailable();
 if(headerNames.reduce((size,name)=>size+Buffer.byteLength(name)+Buffer.byteLength(headers[name])+4,0)>8192)throw unavailable();
 return {body:Buffer.from(message.body,'utf8'),headers};
}

// Authority, subscription state and durable delivery budgets belong to the host.
// This primitive performs one connection only, with no redirect or retry.
export async function sendSignedMcpCallback(destination,envelope,signal){
 return new Promise((resolve,reject)=>{
  let settled=false,resolver,req,res,activeSignal;
  const started=performance.now();
  const finish=(error,result)=>{
   if(settled)return;settled=true;clearTimeout(timer);
   if(activeSignal)removeListener.call(activeSignal,'abort',abort);
   error=error||performance.now()-started>=5000;
   resolver?.cancel();
   if(error){res?.destroy();req?.destroy();reject(unavailable());}else resolve(Object.freeze(result));
  };
  const abort=()=>finish(true),timer=setTimeout(abort,5000);
  (async()=>{
   try{
    if(signal!==undefined&&!(signal instanceof AbortSignal))throw unavailable();
    if(signal&&signalAborted.call(signal))throw unavailable();
    activeSignal=signal;if(activeSignal)addListener.call(activeSignal,'abort',abort,{once:true});
    const {hostname,path}=parseMcpCallbackUrl(destination),message=snapshot(envelope);
    resolver=new Resolver();
    const familyRecords=async family=>{
     try{return await (family===4?resolver.resolve4(hostname):resolver.resolve6(hostname));}
     catch(error){if(error.code==='ENODATA'||error.code==='ENOTFOUND')return [];throw error;}
    };
    const [a,aaaa]=await Promise.all([familyRecords(4),familyRecords(6)]);
    if(settled)return;
    if(performance.now()-started>=5000)throw unavailable();
    if(!Array.isArray(a)||!Array.isArray(aaaa)||a.length+aaaa.length===0||a.length+aaaa.length>64||a.some(ip=>isIP(ip)!==4||!isPublicCallbackIp(ip))||aaaa.some(ip=>isIP(ip)!==6||!isPublicCallbackIp(ip)))throw unavailable();
    const address=a[0]??aaaa[0],family=isIP(address);
    req=request({hostname,port:443,path,method:'POST',agent:false,autoSelectFamily:false,family,servername:hostname,rejectUnauthorized:true,checkServerIdentity,maxHeaderSize:8192,
     headers:{...message.headers,Host:hostname,'Content-Length':message.body.length},
     lookup:(host,options,callback)=>{
      if(host!==hostname){callback(unavailable());return;}
      if(options?.all)callback(null,[{address,family}]);else callback(null,address,family);
     }
    },response=>{
     res=response;if(settled){response.destroy();return;}
     const status=response.statusCode,encoding=response.headers['content-encoding'],length=response.headers['content-length'];
     if(!Number.isInteger(status)||status<200||status>=300||encoding!==undefined&&encoding!=='identity'||length!==undefined&&(!/^\d+$/.test(length)||Number(length)>1024)){finish(true);return;}
     let bytes=0;const chunks=[];
     response.on('data',chunk=>{if(settled)return;bytes+=chunk.length;if(bytes>1024){finish(true);return;}chunks.push(chunk);});
     response.on('error',abort);response.on('aborted',abort);
     response.on('end',()=>{if(settled)return;try{if(!response.complete)throw unavailable();const body=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(Buffer.concat(chunks));finish(false,{status,body});}catch{finish(true);}});
     response.on('close',()=>{if(!response.complete)finish(true);});
    });
    req.on('error',abort);req.end(message.body);
   }catch{finish(true);}
  })();
 });
}
