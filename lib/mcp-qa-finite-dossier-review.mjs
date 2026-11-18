import {correlateFiniteDossierReview} from './mcp-finite-dossier-review-receipt.mjs';

/** Only the named service binding can supply the review result. A missing or
 * unavailable receipt still permits the independent protective QA rollback. */
export async function observePrivateQaFiniteDossierReview({env,control,completion,check,remainingMs=()=>5000}){
 const receiver=env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER,read=receiver?.readReview;
 const {notice}=completion,p=control.plan;
 if(typeof read!=='function'||!notice?.httpReceipt||!notice.eventId)return null;
 const budget=Math.min(750,Math.floor(remainingMs()-250));
 if(!Number.isFinite(budget)||budget<=0)return null;
 let expired=false,timer;
 const readback=async()=>{
  let value;
  try{
   check();
   value=await read.call(receiver,{eventId:notice.eventId,controlHash:control.controlHash});
   if(expired)return null;
   check();
   if(env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER!==receiver||receiver.readReview!==read)return null;
   if(value===null)return null;
   const r=correlateFiniteDossierReview(structuredClone(value),{notice,controlHash:control.controlHash,startAt:p.T0,closeAt:p.C0});
   return r.revision===p.selectors.expectedProjectRevision+1?r:null;
  }catch{return null;}
  finally{try{value?.[Symbol.dispose]?.();}catch{}}
 };
 try{
  return await Promise.race([readback(),new Promise(resolve=>{
   timer=setTimeout(()=>{expired=true;resolve(null);},budget);
  })]);
 }finally{expired=true;clearTimeout(timer);}
}
