import {execFile} from 'node:child_process';
import {realpath} from 'node:fs/promises';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {runAssistanceHttpOccurrence} from './assistance-http-occurrence.mjs';

const VERSION='afw-host-observe-v1';
const ORIGIN='https://github.com/tokenizartinfo-ops/agent-friendly-web.git';
const RUNNER=new URL('./assistance-http-occurrence.mjs',import.meta.url);
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const stamp=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const revision=v=>Number.isSafeInteger(v)&&v>0;
const denied=()=>Error('Host observation denied');
const fail=()=>{throw denied();};
const pinKeys=['sourceRevision','configId','publicationId'];
function validPins(p){
 if(!exact(p,pinKeys)||!pinKeys.every(k=>typeof p[k]==='string')||! /^[0-9a-f]{40}$/.test(p.sourceRevision)||! /^cecfg_[a-zA-Z0-9]{1,128}$/.test(p.configId)||! /^cecfgver_[a-zA-Z0-9]{1,128}$/.test(p.publicationId))fail();
 return Object.freeze({...p});
}
const cloudKeys=['configId','publicationId','configurationRevision','observationRevision','observationsCurrent','networkMode','networkEnforced','operationsBindingsReady'];
function validCloud(c,p){
 if(!exact(c,cloudKeys)||c.configId!==p.configId||c.publicationId!==p.publicationId||!revision(c.configurationRevision)||c.configurationRevision!==c.observationRevision||c.observationsCurrent!==true||c.networkMode!=='restricted'||c.networkEnforced!==true||c.operationsBindingsReady!==true)fail();
 return {...c};
}
/** Pure projection of the supported tool's structuredContent, NOT a cloud SDK.
 * No credential values, env dumps, provider timestamps or source attestation.
 */
export function projectEnvironmentStatus(s){
 const ref=(v,prefix)=>{if(typeof v!=='string')fail();const parts=v.split('~');if(parts.length!==2||!parts[0]||!new RegExp('^'+prefix+'[a-zA-Z0-9]{1,128}$').test(parts[1]))fail();return parts[1];};
 const rev=v=>{if(typeof v!=='string'||! /^[1-9][0-9]*$/.test(v))fail();const n=Number(v);if(!revision(n))fail();return n;};
 if(!s||s.failure!=null||s.observations_current!==true||s.network_policy?.mode!=='restricted'||s.network_policy.state!=='enforced'||!Array.isArray(s.secrets))fail();
 if(typeof s.source_config_id!=='string'||typeof s.source_config_version_id!=='string'||s.source_config_id.split('~')[0]!==s.source_config_version_id.split('~')[0])fail();
 const ready=['AFW_OPERATIONS_ACCESS_CLIENT_ID','AFW_OPERATIONS_ACCESS_CLIENT_SECRET'].every(name=>{
  const selected=s.secrets.filter(x=>x?.name===name);if(selected.length!==1)return false;
  const x=selected[0];return x.state==='ready'&&x.target?.environment_variable===name&&Array.isArray(x.target.allowed_domains)&&x.target.allowed_domains.length===1&&x.target.allowed_domains[0]==='operations-manager.agentfriendlyweb.dev';
 });
 const c={configId:ref(s.source_config_id,'cecfg_'),publicationId:ref(s.source_config_version_id,'cecfgver_'),configurationRevision:rev(s.spec_revision),observationRevision:rev(s.observed_spec_revision),observationsCurrent:s.observations_current,networkMode:s.network_policy.mode,networkEnforced:s.network_policy.state==='enforced',operationsBindingsReady:ready};
 return validCloud(c,c);
}
/** Internal trusted module URL only; runtime always derives RUNNER above.
 * Caller request/IPC cannot select a repo. Errors never include Git output.
 */
export async function readOccurrenceModuleGit({moduleUrl=RUNNER,sourceRevision,signal}={}){
 try{
  if(typeof sourceRevision!=='string'||! /^[0-9a-f]{40}$/.test(sourceRevision))fail();
  const cwd=dirname(await realpath(fileURLToPath(moduleUrl)));
  const git=args=>new Promise((resolve,reject)=>{
   execFile('git',args,{cwd,encoding:'utf8',timeout:3000,maxBuffer:65536,signal,windowsHide:true},(error,stdout)=>error?reject(denied()):resolve(stdout.trim()));
  });
  await git(['rev-parse','--show-toplevel']);
  const head=await git(['rev-parse','HEAD']),origin=await git(['remote','get-url','origin']),dirty=await git(['status','--porcelain','--untracked-files=all']);
  const finalOrigin=await git(['remote','get-url','origin']),finalHead=await git(['rev-parse','HEAD']);
  if(signal?.aborted||head!==sourceRevision||finalHead!==head||origin!==ORIGIN||finalOrigin!==origin||dirty!=='')fail();
  return {sourceRevision:head,origin,checkoutClean:true};
 }catch{throw denied();}
}

/** Trusted process IPC. Failures are sticky; a successful exchange does not
 * attest a VM or independently date the platform's credential observations.
 */
export function createOccurrenceHostBridge({input,output,pins,now=Date.now,timeoutMs=10000}={}){
 const p=validPins(pins);
 if(!input||typeof input.on!=='function'||!output||typeof output.write!=='function'||typeof now!=='function'||!Number.isInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000)fail();
 let pending=null,closed=false,id=0,buffer=Buffer.alloc(0),last=-1;
 function stop(){
  closed=true;buffer=Buffer.alloc(0);if(pending){const x=pending;pending=null;x.abort.abort();x.reject(denied());}
 }
 const time=()=>{const t=now();if(!stamp(t)||t<last)fail();last=t;return t;};
 function data(chunk){
  if(closed)return;
  try{
   if(typeof chunk==='string')fail(); // input must preserve raw UTF8 bytes
   if(buffer.length+chunk.length>2049)fail();buffer=Buffer.concat([buffer,chunk]);
   if(buffer.length>2048&&buffer.indexOf(10)===-1)fail();
   let index;
   while((index=buffer.indexOf(10))!==-1){
    if(index>2048||!pending||pending.received)fail();
    const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(buffer.subarray(0,index)));buffer=buffer.subarray(index+1);
    if(!exact(value,['version','type','id','nonce','cloud'])||value.version!==VERSION||value.type!=='observation'||value.id!==pending.id||value.nonce!==pending.nonce)fail();
    const c=validCloud(value.cloud,p),t=time();if(t-pending.startedAt>timeoutMs)fail();
    pending.received=true;pending.resolve(c);
   }
  }catch{stop();}
 }
 input.on('data',data);input.on('end',stop);input.on('close',stop);input.on('error',stop);output.on('error',stop);output.on('close',stop);
 async function preflight({signal}={}){
  if(closed||pending||id>=6||signal?.aborted){stop();throw denied();}
  let timer,listener,x;
  try{
   const startedAt=time(),abort=new AbortController();
   const received=new Promise((resolve,reject)=>{x={id:++id,nonce:randomUUID(),startedAt,abort,resolve,reject,received:false};pending=x;});
   // Writing can throw synchronously before Promise.all is reached. Preserve
   // the original rejection for await, but never leave cleanup unhandled.
   received.catch(()=>{});
   timer=setTimeout(stop,timeoutMs);listener=stop;signal?.addEventListener('abort',listener,{once:true});
   const frame={version:VERSION,type:'observe',id:x.id,nonce:x.nonce,startedAt};
   output.write(JSON.stringify(frame)+'\n',error=>{if(error)stop();});
   // Start both promptly; Promise.all installs rejection handlers on both.
   const [cloud,git]=await Promise.all([received,readOccurrenceModuleGit({sourceRevision:p.sourceRevision,signal:abort.signal})]);
   const t=time();if(closed||pending!==x||buffer.length||t-startedAt>timeoutMs||signal?.aborted)fail();
   pending=null;
   return Object.freeze({...cloud,...git,observedAt:startedAt});
  }catch{stop();throw denied();}
  finally{clearTimeout(timer);signal?.removeEventListener('abort',listener);x?.abort.abort();}
 }
 function close(){stop();input.off('data',data);input.off('end',stop);input.off('close',stop);input.off('error',stop);output.off('error',stop);output.off('close',stop);}
 return Object.freeze({preflight,close});
}

export async function runAssistanceHttpOccurrenceWithHostBridge(options,streams){
 if(!options||Object.hasOwn(options,'preflight'))fail();
 const pins=Object.fromEntries(pinKeys.map(k=>[k,options.manifest?.[k]]));
 const bridge=createOccurrenceHostBridge({...streams,pins,now:options.now??Date.now});
 try{return await runAssistanceHttpOccurrence({...options,preflight:bridge.preflight});}
 finally{bridge.close();}
}
