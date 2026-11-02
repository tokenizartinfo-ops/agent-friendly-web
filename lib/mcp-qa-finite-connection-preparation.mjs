import {createFinitePolicyTransport} from './mcp-qa-finite-policy-transport.mjs';
import {readFiniteOwnerPreparationFacts,readFiniteOwnerRequestDeadline} from './mcp-qa-finite-owner-preparation.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode} from './mcp-qa-finite-preparation-records.mjs';
const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const fail=()=>{throw Error('Finite connection preparation unavailable');};
const nativeWork=new WeakMap();
/** Fixed owner-stage coordinator; accepts only refs and the original admitted lease. */
export function createFiniteConnectionPreparation({ctx,env}){
 return Object.freeze({async run(refs,originalLease){
  // Transport synchronously consumes admission before source IO. Its context
  // remains occupied through original parent finish and all retained work.
  const result=await createFinitePolicyTransport({ctx,env}).run(refs,originalLease);
  if(result.outcome.status!=='installed'||refs.stage!=='finite')return result.outcome;
  const admission=result.admission,lease=admission.lease,storage=ctx.storage,db=env.RELEASE_DB,end=readFiniteOwnerRequestDeadline(originalLease),work=new Set();
  if(nativeWork.has(ctx))return pending();nativeWork.set(ctx,work);
  let done=false,commandBy=end;
  const release=()=>{if(done&&!work.size&&nativeWork.get(ctx)===work)nativeWork.delete(ctx);};
  const track=p=>{work.add(p);p.then(()=>{work.delete(p);release();},()=>{work.delete(p);release();});return p;};
  const guard=()=>{lease.assertCurrent();if(lease.signal.aborted||ctx.storage!==storage||env.RELEASE_DB!==db||Date.now()>=Math.min(end,commandBy))fail();};
  async function child(fn){
   guard();const at=Date.now(),mono=performance.now(),deadline=Math.min(end,commandBy,at+5000),controller=new AbortController();let alive=true,timer,last=at;
   const c=Object.freeze({signal:controller.signal,assertCurrent(){guard();const now=Date.now(),elapsed=performance.now()-mono;if(!alive||now<last||now>=deadline||elapsed<0||elapsed>=deadline-at)fail();last=now;}});
   const actual=track(Promise.resolve().then(()=>{c.assertCurrent();return fn(c);}));
   try{const answer=await Promise.race([actual,new Promise((_,reject)=>{timer=setTimeout(()=>{alive=false;controller.abort();reject(Error('Finite preparation child expired'));},Math.max(1,deadline-Date.now()));})]);c.assertCurrent();return answer;}
   finally{alive=false;controller.abort();clearTimeout(timer);}
  }
  const actual=track((async()=>{
   guard();
   const facts=await child(l=>readFiniteOwnerPreparationFacts({ctx,env,preconnectionId:refs.preconnectionId},l));guard();commandBy=facts.value.commandBy;guard();
   const stable=v=>JSON.stringify(Object.fromEntries(Object.entries(v).filter(([k])=>!['phase','currentPublication'].includes(k))));
   if(facts.stageApprovalHash!==admission.stageApprovalHash||encode('ConnectionReceipt',facts.receipt)!==encode('ConnectionReceipt',result.outcome.receipt)||stable(facts.ownerSource)!==stable(admission.ownerSource))fail();
   const selectedAt=Date.now(),preparation={...facts.value,selectedAt};preparation.preparationHash=hash('OwnerPreparation',preparation);
   const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),prior=await child(l=>store.readSelected({sourceRevision:preparation.sourceRevision},l));
   // A prior factual selection is not admission or an opportunity to overwrite
   // another live preparation; source qualification owns lineage reconciliation.
   if(prior)fail();
   const selection={purpose:'afw.finite-owner-selection.v1',sourceRevision:preparation.sourceRevision,prepId:preparation.prepId,preparationHash:preparation.preparationHash,selectedAt,sequence:1,previousSelectionHash:null};selection.selectionHash=hash('Selection',selection);
   const saved=await child(l=>store.publishSelection({preparation,selection,expectedHeadHash:null},l));guard();
   if(saved.status!=='recorded'||saved.recordHash!==selection.selectionHash)fail();
   const read=await child(l=>store.readSelected({sourceRevision:preparation.sourceRevision},l)),witness=await child(l=>store.readSelectionPublication({sourceRevision:preparation.sourceRevision,selectionHash:selection.selectionHash},l));
   if(!read||encode('OwnerPreparation',read.preparation)!==encode('OwnerPreparation',preparation)||encode('Selection',read.selection)!==encode('Selection',selection)||!witness||witness.publishedAt<selectedAt||witness.publishedAt>=commandBy)fail();
   const final=await child(l=>readFiniteOwnerPreparationFacts({ctx,env,preconnectionId:refs.preconnectionId},l));
   if(final.value.auditHash!==facts.value.auditHash||final.stageApprovalHash!==admission.stageApprovalHash)fail();guard();return result.outcome;
  })());
  try{return await actual;}catch{return pending();}finally{done=true;release();}
 }});
}
