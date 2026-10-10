import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
import {matchPrivateInstallationD1} from './assistance-private-installation-finalization.mjs';
import {createOccurrenceApprovalCatalog,approvalValues} from './assistance-occurrence-approvals.mjs';
import {validateQaClosureApproval,isQaProvisioningReservation} from './assistance-qa-closure-catalog.mjs';
import {createPrivateQaCatalogHost} from './assistance-private-qa-catalog-host.mjs';
const POINTER='afw-private-qa-catalog/v1:current',MARKER='afw-private-qa-installation/v1:current';
const denied=()=>{throw Error('Private QA installation unavailable');};
const sameApproval=(a,b)=>approvalValues(a).every((v,i)=>v===approvalValues(b)[i]);
/** Internal operator bootstrap, deliberately not exposed by the Worker.
 * readInstallation/readProvisioning are independently trusted administrative
 * sources, not client payloads or metadata-derived assertions of real custody.
 * A stranded reservation is a recovery gate, never implicit authorization.
 */
export function createPrivateQaInstaller({storage,db,readInstallation,readProvisioning,now=Date.now}={}){
 let last=-1;
 const clock=r=>{const t=now();if(!Number.isSafeInteger(t)||t<last||t<r.provisioning.createdAt||t>=r.plan.closeAt)denied();last=t;return t;};
 async function install(){
  let r,a,primary,created=false,reserved=false,approvalUnknown=false;
  try{
   if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof readInstallation!=='function'||typeof readProvisioning!=='function'||typeof now!=='function')denied();
   const input=structuredClone(await readInstallation());
   if(!input||Object.keys(input).length!==2||!Object.hasOwn(input,'registration')||!Object.hasOwn(input,'approval'))denied();
   a=input.approval;r=await validateQaClosureApproval(input.registration,a);clock(r);
   const primaryDb=typeof db?.withSession==='function'?db.withSession('first-primary'):db;
   primary=createOccurrenceApprovalCatalog({db:primaryDb});
   const proof=async()=>{clock(r);const p=await readProvisioning(r.provisioning.creationRef);clock(r);if(!isQaProvisioningReservation(p,r.plan.baselineRef))denied();};
   await proof();
   const marker=await storage.get(MARKER);clock(r);
   if(marker!==undefined){
    if(marker?.state!=='complete'||marker.recordRef!==r.plan.baselineRef)denied();
    const reader=createPrivateQaCatalogHost({storage,db,readProvisioning,now});
    const registration=await reader.read();clock(r);
    if(!registration||registration.plan.baselineRef!==r.plan.baselineRef)denied();
    const current=await reader.readOccurrenceApproval();clock(r);
    if(!current||!sameApproval(current,a))denied();
    const row=await primary.read(a.manifest.occurrenceId);clock(r);
    if(!row||row.revoked||!sameApproval(row.approval,a))denied();
    const finalRegistration=await reader.read();clock(r);
    if(!finalRegistration||finalRegistration.plan.baselineRef!==r.plan.baselineRef)denied();
    return 'installed';
   }
   // Never adopt a pre-existing approval, even an identical one: the operator
   // must reconcile its provenance and possible partial installation explicitly.
   if(await primary.read(a.manifest.occurrenceId))denied();clock(r);
   const qaKey='afw-qa-closure-approval/v1:'+r.plan.occurrenceId;
   const tokenKey='afw-qa-closure-token/v1:'+r.resources.accountId+':'+r.resources.tokenId;
   await storage.transaction(async tx=>{
    for(const k of [MARKER,POINTER,qaKey,qaKey+':revoked',tokenKey])if(await tx.get(k)!==undefined)denied();
    clock(r);await tx.put(MARKER,{recordRef:r.plan.baselineRef,state:'pending'});clock(r);
   });reserved=true;
   try{created=await primary.approve(a);}catch{approvalUnknown=true;denied();}
   if(!created)denied();clock(r);
   const row=await primary.read(a.manifest.occurrenceId);clock(r);
   if(!row||row.revoked||!sameApproval(row.approval,a))denied();
   await proof();
   await storage.transaction(async tx=>{
    const current=await tx.get(MARKER);clock(r);
    if(current?.state!=='pending'||current.recordRef!==r.plan.baselineRef)denied();
    for(const k of [POINTER,qaKey,qaKey+':revoked',tokenKey])if(await tx.get(k)!==undefined)denied();
    await proof();
    await tx.put(tokenKey,r.plan.baselineRef);clock(r);
    await tx.put(qaKey,r);clock(r);
    await tx.put(POINTER,{contract:'afw-private-qa-catalog/v1',registration:r});clock(r);
    await tx.put(MARKER,{recordRef:r.plan.baselineRef,state:'complete'});clock(r);
   });
   return 'installed';
  }catch{
   // Compensate only a row created by this attempt; never delete history or
   // revoke an unrelated/pre-existing approval. Unknown cleanup stays pending.
   let cleanupCertain=!created&&!approvalUnknown;
   if(created)try{cleanupCertain=await primary.revoke({occurrenceId:a.manifest.occurrenceId,reason:'operator_closed'});}catch{/* manual recovery */}
   // An unknown INSERT acknowledgement is not proof of ownership. A different
   // private catalog writer could have inserted an identical approval. Preserve
   // that row and require operator reconciliation rather than revoke by digest.
   if(reserved&&cleanupCertain)try{await storage.transaction(async tx=>{const m=await tx.get(MARKER);if(m?.state==='pending'&&m.recordRef===r.plan.baselineRef)await tx.put(MARKER,{recordRef:r.plan.baselineRef,state:'failed'});});}catch{/* pending prevents reinstallation */}
   return 'unavailable';
  }
 }
 return Object.freeze({install});
}

// Fixed private composition. Legacy install above is retained for its existing
// consumers; it does not provide the SAME-primary dispatch permits used here.
function boundedInstallation(v,depth=0,budget={left:2048}){
 if(depth>14||--budget.left<0)denied();if(v===null||typeof v==='boolean'||(typeof v==='number'&&Number.isFinite(v)))return v;
 if(typeof v==='string'){if(v.length>8192)denied();return v;}if(!v||Object.getPrototypeOf(v)!==Object.prototype)denied();const out={},keys=Reflect.ownKeys(v);if(keys.length>32)denied();for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))denied();Object.defineProperty(out,k,{value:boundedInstallation(d.value,depth+1,budget),enumerable:true});}return Object.freeze(out);
}
const exactInstallation=(v,keys)=>v&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
/** UNMOUNTED. Fixed administrative host must authenticate original inputs and
 * current write permission, and enforce actual cloud preflight/server admission
 * at dispatch. A callback, historical locator or source test is not authority. */
export function createPrimaryQaInstaller({creationRef,provisioning,installation,readInstallation,dispatchOccurrence,now=Date.now,timeoutMs=5000}={}){
 const names=['reserve','read','beginInstallation','startInstallationWrite','readInstallationIntent','finalizeInstallation','readFinalizedInstallation','consumeInstallation'];
 if(typeof creationRef!=='string'||!/^[0-9a-f]{64}$/.test(creationRef)||names.some(k=>typeof provisioning?.[k]!=='function')||['read','write'].some(k=>typeof installation?.[k]!=='function')||typeof readInstallation!=='function'||typeof dispatchOccurrence!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000)denied();
 const p=Object.fromEntries(names.map(k=>[k,provisioning[k].bind(provisioning)])),d=Object.fromEntries(['read','write'].map(k=>[k,installation[k].bind(installation)]));let last=-1;
 const install=async()=>{
  const abort=new AbortController(),wall=performance.now()+timeoutMs;let active=true,timer,attempted=false,limit=8640000000000000;
  const clock=()=>{const t=now();if(!active||abort.signal.aborted||performance.now()>=wall||!Number.isSafeInteger(t)||t<0||t<last||t>=limit)denied();last=t;return t;};
  const source=async()=>{clock();const input=boundedInstallation(await readInstallation());clock();if(!exactInstallation(input,['registration','approval']))denied();const r=await validateQaClosureApproval(input.registration,input.approval);limit=Math.min(limit,r.plan.closeAt,input.approval.manifest.tokenExpiresAt,input.approval.manifest.serverDeadline);if(r.provisioning.creationRef!==creationRef||clock()<r.provisioning.createdAt)denied();const digest=await computeAdministrativeResultDigest(input);clock();return {input,r,digest};};
  const work=async()=>{
   const s=await source(),ref=s.r.plan.baselineRef,pinsDigest=await computeAdministrativeResultDigest(s.input);clock();
   const originals=async()=>{const fresh=await source();if(fresh.digest!==s.digest)denied();};
   const live=async()=>{await originals();const reserved=boundedInstallation(await p.read(creationRef));clock();if(!isQaProvisioningReservation(reserved,ref))denied();const intent=boundedInstallation(await p.readInstallationIntent(creationRef));clock();if(!intent||intent.recordRef!==ref||intent.creationRef!==creationRef||intent.approvalPinsDigest!==pinsDigest||intent.occurrenceId!==s.r.plan.occurrenceId||intent.deadline!==s.r.plan.closeAt)denied();await originals();return intent;};
   attempted=true;const reserved=boundedInstallation(await p.reserve(creationRef));clock();if(!isQaProvisioningReservation(reserved,ref))return {state:'pending'};
   const initial=boundedInstallation(await p.beginInstallation(creationRef));clock();if(!initial)return {state:'pending'};let intent=await live();if(intent.intentId!==initial.intentId)denied();
   if(intent.state==='prepared'){
    let permit;try{permit=boundedInstallation(await p.startInstallationWrite(creationRef,intent.intentId,1));}catch{}clock();
    if(!permit)return {state:'pending'};intent=await live();if(!exactInstallation(permit,['contract','recordRef','intentId','sequence'])||permit.contract!=='afw-private-installation-dispatch/v1'||permit.recordRef!==ref||permit.intentId!==intent.intentId||permit.sequence!==2||intent.state!=='write_started')denied();
    // Only this newly acknowledged transition can invoke write, once. A lost
    // D1 response can be reconciled by finalization; never by another write.
    clock();try{await d.write(Object.freeze({...s.input,intent}));}catch{}clock();
   }
   intent=await live();if(intent.state!=='write_started')denied();
   const own=boundedInstallation(await d.read(intent.occurrenceId));clock();if(!await matchPrivateInstallationD1({recordRef:ref,approvalPinsDigest:pinsDigest,deadline:s.r.plan.closeAt},intent,s.input.approval,own,clock))return {state:'pending'};
   await live();try{await p.finalizeInstallation(creationRef);}catch{}clock();const finalized=boundedInstallation(await p.readFinalizedInstallation(creationRef));clock();if(!finalized||finalized.intentId!==intent.intentId||finalized.recordRef!==ref)return {state:'pending'};await originals();
   let permit;try{permit=boundedInstallation(await p.consumeInstallation(creationRef));}catch{}clock();if(!permit)return {state:'pending'};
   if(!exactInstallation(permit,['contract','recordRef','intentId','occurrenceId','admissionId'])||permit.contract!=='afw-private-installation-consumption-dispatch/v1'||permit.recordRef!==ref||permit.intentId!==intent.intentId||permit.occurrenceId!==intent.occurrenceId||typeof permit.admissionId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(permit.admissionId))denied();
   await live();const final=boundedInstallation(await p.readFinalizedInstallation(creationRef));clock();if(!final||final.recordDigest!==finalized.recordDigest)denied();await originals();
   // This state reports a call, never a successful customer/cloud result.
   clock();await dispatchOccurrence(Object.freeze({creationRef,recordRef:ref,admissionId:permit.admissionId,approval:s.input.approval,signal:abort.signal}));clock();return {state:'dispatch_attempted',recordRef:ref};
  };
  try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{active=false;abort.abort();resolve({state:'pending'});},timeoutMs);})]);}catch{return {state:attempted?'pending':'unavailable'};}finally{active=false;abort.abort();clearTimeout(timer);}
 };
 return Object.freeze({install:()=>install()});
}
