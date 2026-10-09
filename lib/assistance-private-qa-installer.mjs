import {createOccurrenceApprovalCatalog,approvalValues} from './assistance-occurrence-approvals.mjs';
import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
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
   const proof=async()=>{clock(r);const p=await readProvisioning(r.provisioning.creationRef);clock(r);if(!p||Object.getPrototypeOf(p)!==Object.prototype||Object.keys(p).length!==3||p.contract!=='afw-qa-provisioning/v1'||p.recordRef!==r.plan.baselineRef||p.state!=='exclusive')denied();};
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
