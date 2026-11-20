import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {readPrivateQaFiniteSharedOrigin} from './mcp-qa-finite-shared-origin.mjs';
import {finiteHex as hex} from './mcp-finite-evidence.mjs';

const revision=globalThis.__AFW_QA_SOURCE_REVISION__??'';
const fail=()=>{throw Error('Finite observer installation unavailable');};

/** Fixed QA preview from the same native origin as launch, before any claim. */
export async function readPrivateQaFiniteObserverInstallation({ctx,env}){
 const started=Date.now(),monotonic=performance.now(),deadline=started+4800,controller=new AbortController();
 let last=started,timer;
 const check=()=>{
  const now=Date.now();
  if(controller.signal.aborted||now<last||now>=deadline||performance.now()-monotonic>=4800)fail();
  last=now;return now;
 };
 if(!hex(revision,40))fail();
 const parent=Object.freeze({signal:controller.signal,deadline,check}),lease=Object.freeze({signal:parent.signal,assertCurrent:check});
 try{
  const read=async()=>{
   const selected=await createFiniteOwnerPreparationStore({storage:ctx.storage,now:check}).readSelected({sourceRevision:revision},lease);check();
   if(!selected?.binding)fail();
   const refs={intentId:selected.binding.intentId,sourceRevision:revision};
   const {preview,setupReceiptHash,external}=await readPrivateQaFiniteSharedOrigin({ctx,env,refs,parent});check();
   return Object.freeze({material:preview,setupReceiptHash,plan:external});
  };
  return await Promise.race([read(),new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Finite observer installation unavailable'));},Math.max(1,deadline-Date.now()));})]);
 }finally{clearTimeout(timer);controller.abort();}
}
