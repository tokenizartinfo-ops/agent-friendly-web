import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
let buildNumber=0;
export async function captureRetentionBuild(kind,built){
 if(!process.env.AFW_RETENTION_EVIDENCE)return;
 const prefix=process.env.AFW_RETENTION_EVIDENCE+'/'+kind+'-'+process.pid+'-'+(++buildNumber);
 await mkdir(process.env.AFW_RETENTION_EVIDENCE,{recursive:true});
 await writeFile(prefix+'.metafile.json',JSON.stringify(built.metafile,null,2));
 await writeFile(prefix+'.mjs',built.outputFiles[0].text);
 console.log('I1_BUNDLE '+JSON.stringify({kind,sha256:createHash('sha256').update(built.outputFiles[0].text).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
}


// Test-only native workerd boundary. Provider timing/data are SYN; holders,
// Root, Response/ReadableStream and cancellation promises remain actual native.
export const retentionImports=`
import {createFiniteOwnerRequestLease as retentionRoot} from './lib/mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerStageWork as retentionScope} from './lib/mcp-qa-finite-stage-work.mjs';
`;
export function retentionMethods(call,ownsScope=false){
 return `
 async bodyRetentionStart(mode){
  if(!['invalid-status','late-response'].includes(mode))throw Error('SYN mode');
  const parent=retentionRoot(new Request('https://fixture.invalid/'));
  const s=this.retention={parent,mode,fetchEntered:0,acquired:0,readerCalls:0,cancelEntered:0,cancelSettled:false,logicalDenied:false,rootAborted:false};
  const nativeFetch=globalThis.fetch;
  s.nativeFetch=nativeFetch;
  const held=new Promise(resolve=>{s.releaseCancel=resolve;});
  globalThis.fetch=async()=>{
   s.fetchEntered++;if(s.fetchEntered!==1)throw Error('Unexpected following IO');
   parent.lease.assertCurrent();s.validAtFetch=true;
   if(mode==='late-response')await new Promise(resolve=>{s.releaseAcquisition=resolve;});
   const body=new ReadableStream({cancel(){s.cancelEntered++;return held;}});
   const nativeCancel=body.cancel,nativeReader=body.getReader;
   body.cancel=(...args)=>{const actual=Reflect.apply(nativeCancel,body,args);s.cancelPromise=actual;actual.then(()=>{s.cancelSettled=true;},()=>{s.cancelSettled=true;});return actual;};
   body.getReader=(...args)=>{s.readerCalls++;return Reflect.apply(nativeReader,body,args);};
   const response=new Response(body,{status:mode==='invalid-status'?503:200,headers:{'Content-Type':'application/json',Date:new Date().toUTCString()}});
   s.nativeResponse=response instanceof Response;s.nativeStream=response.body===body;s.acquired++;
   return response;
  };
  try{
   const operation=()=>@CALL@;
   const result=await @OPERATION@;
   s.logicalDenied=result?.status==='admin_pending';
  }catch(e){s.logicalDenied=true;s.error=e.message;}
  finally{parent.finish();s.rootAborted=parent.lease.signal.aborted;}
  return this.bodyRetentionState();
 }
 bodyRetentionState(){
  const s=this.retention;if(!s)return null;
  return Object.fromEntries(['mode','fetchEntered','acquired','readerCalls','cancelEntered','cancelSettled','logicalDenied','rootAborted','validAtFetch','nativeResponse','nativeStream','error'].filter(k=>s[k]!==undefined).map(k=>[k,s[k]]));
 }
 bodyRetentionAbort(){this.retention.parent.finish();}
 bodyRetentionAcquire(){this.retention.releaseAcquisition?.();}
 async bodyRetentionProbe(){
  const parent=retentionRoot(new Request('https://fixture.invalid/'));let entered=false,error;
  parent.lease.assertCurrent();const live=!parent.lease.signal.aborted;
  try{await retentionScope({ctx:this.ctx,env:this.env,admission:{lease:parent.lease},originalLease:parent.lease},async()=>{entered=true;});}catch(e){error=e.message;}finally{parent.finish();}
  return{live,entered,error};
 }
 async bodyRetentionRelease(){
  const s=this.retention;if(!s)return null;
  s.parent.finish();s.releaseAcquisition?.();s.releaseCancel();
  if(s.cancelPromise)await s.cancelPromise;
  await new Promise(resolve=>setTimeout(resolve,10));
  globalThis.fetch=s.nativeFetch;
  return this.bodyRetentionState();
 }
 async bodyRetentionRows(){return [...await this.ctx.storage.list()];}
`.replace('@CALL@',()=>call).replace('@OPERATION@',()=>ownsScope?'operation()':'retentionScope({ctx:this.ctx,env:this.env,admission:{lease:parent.lease},originalLease:parent.lease},operation)');
}

async function until(stub,predicate,label){
 const end=Date.now()+2000;let state;
 do{state=await stub.bodyRetentionState();if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}while(Date.now()<end);
 assert.fail(label+': '+JSON.stringify(state));
}
export async function checkBodyRetention(f,mode){
 let running;const before=await f.stub.bodyRetentionRows();
 try{
  running=f.stub.bodyRetentionStart(mode);
  const entered=await until(f.stub,s=>s?.fetchEntered===1,'valid native fetch entry');
  assert.equal(entered.validAtFetch,true);
  if(mode==='late-response'){
   await f.stub.bodyRetentionAbort();
   const denied=await running;assert.equal(denied.logicalDenied,true);assert.equal(denied.acquired,0);
   const held=await f.stub.bodyRetentionProbe();assert.equal(held.live,true);assert.equal(held.entered,false);
   await f.stub.bodyRetentionAcquire();
  }else{assert.equal((await running).logicalDenied,true);}
  const acquired=await until(f.stub,s=>s.acquired===1,'actual Response acquisition');
  assert.equal(acquired.nativeResponse,true);assert.equal(acquired.nativeStream,true);
  assert.equal(acquired.rootAborted,true);assert.equal(acquired.readerCalls,0);
  const cancelled=await until(f.stub,s=>s.cancelEntered===1,'required acquired-body cancellation entry');
  assert.equal(cancelled.logicalDenied,true);assert.equal(cancelled.cancelSettled,false);
  const excluded=await f.stub.bodyRetentionProbe();
  assert.equal(excluded.live,true);assert.equal(excluded.entered,false,'different LIVE root excluded until actual cancel settlement');
  assert.equal(excluded.error,'Finite stage work remains outstanding');
  assert.deepEqual(await f.stub.bodyRetentionRows(),before,'no publication or subsequent storage write');
  assert.equal((await f.stub.bodyRetentionState()).fetchEntered,1,'no following business IO');
  const settled=await f.stub.bodyRetentionRelease();assert.equal(settled.cancelSettled,true);
  const released=await f.stub.bodyRetentionProbe();assert.equal(released.live,true);assert.equal(released.entered,true,'new scope only after actual cancellation settles');
  console.log('I1_NATIVE '+JSON.stringify({mode,acquired:1,readerCalls:0,cancelEntered:1,logicalDenied:true,pendingExcluded:true,settled:true,released:true,fetches:1,storageUnchanged:true}));
 }finally{
  try{await f.stub.bodyRetentionRelease();if(running)await running;}finally{await f.mf.dispose();}
 }
}
