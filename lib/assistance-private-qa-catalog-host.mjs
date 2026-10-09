import {createQaClosureCatalog,validateQaClosureRegistration,validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {createOccurrenceApprovalCatalog,approvalValues} from './assistance-occurrence-approvals.mjs';
const KEY='afw-private-qa-catalog/v1:current';
const denied=()=>{throw Error('Private QA catalog unavailable');};
const canonical=v=>JSON.stringify(v,(_key,value)=>value&&typeof value==='object'&&!Array.isArray(value)?Object.fromEntries(Object.keys(value).sort().map(k=>[k,value[k]])):value);
function pointerRegistration(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||Object.keys(raw).length!==2||raw.contract!=='afw-private-qa-catalog/v1'||!Object.hasOwn(raw,'registration'))denied();
 const r=validateQaClosureRegistration(raw.registration);if(r.contract!=='afw-qa-closure-approval/v2')denied();return r;
}

/** Read-only private host, NOT an installer or proof of provisioning. Reads
 * current private storage plus primary D1 and an independently trusted proof
 * reader. Caller arguments never select authority, storage keys or resources.
 * D1 plan revocation permits closure recovery; QA withdrawal remains decisive.
 */
export function createPrivateQaCatalogHost({storage,db,readProvisioning,now=Date.now,authorizationTimeoutMs=5000}={}){
 let last=-1;
 async function readScope(){
  if(typeof storage?.get!=='function'||typeof storage?.transaction!=='function'||typeof readProvisioning!=='function'||typeof now!=='function'||!Number.isSafeInteger(authorizationTimeoutMs)||authorizationTimeoutMs<1||authorizationTimeoutMs>10000)return null;
  let timer,active=true;
  const clock=()=>{const t=now();if(!active||!Number.isSafeInteger(t)||t<0||t>8640000000000000||t<last)denied();last=t;return t;};
  const current=async()=>{
   clock();const raw=structuredClone(await storage.get(KEY));clock();
   return pointerRegistration(raw);
  };
  async function resolve(){
   const r=await current();clock();
   const primaryDb=typeof db?.withSession==='function'?db.withSession('first-primary'):db;
   const primary=createOccurrenceApprovalCatalog({db:primaryDb});
   // The pointer and QA registration/revocation share one primary transaction.
   // Reordering independent awaits cannot provide this storage-level fence.
   const fingerprint=canonical(r);
   const pinnedStorage={transaction:fn=>storage.transaction(async tx=>{
    const check=async()=>{clock();const raw=structuredClone(await tx.get(KEY));clock();if(canonical(pointerRegistration(raw))!==fingerprint)denied();};
    await check();const result=await fn(tx);await check();return result;
   })};
   const catalog=createQaClosureCatalog({storage:pinnedStorage,registration:r,readProvisioning:async ref=>{clock();const proof=await readProvisioning(ref);clock();return proof;},now:clock});
   if(!await catalog.read())denied();clock();
   const first=await primary.read(r.plan.occurrenceId);clock();if(!first)denied();
   await validateQaClosureApproval(r,first.approval);clock();
   const final=await catalog.read();clock();if(!final)denied();
   await validateQaClosureApproval(final,first.approval);clock();
   const second=await primary.read(r.plan.occurrenceId);clock();
   if(!second||!approvalValues(second.approval).every((v,i)=>v===approvalValues(first.approval)[i]))denied();
   const pointer=await current();await validateQaClosureApproval(pointer,second.approval);clock();
   if(pointer.plan.baselineRef!==r.plan.baselineRef)denied();
   // QA/provisioning can be withdrawn during final D1/pointer/hash awaits.
   // Nothing asynchronous follows this last authority check.
   const authority=await catalog.read();clock();if(!authority)denied();
   return {registration:structuredClone(authority),approval:structuredClone(second.approval)};
  }
  try{return await Promise.race([resolve(),new Promise(resolve=>{timer=setTimeout(()=>{active=false;resolve(null);},authorizationTimeoutMs);})]);}
  catch{return null;}finally{active=false;clearTimeout(timer);}
 }
 return Object.freeze({read:async()=> (await readScope())?.registration??null,readOccurrenceApproval:async()=> (await readScope())?.approval??null});
}
