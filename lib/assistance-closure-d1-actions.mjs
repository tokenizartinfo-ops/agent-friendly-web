import {exact,timestamp,validateOccurrenceApproval,approvalValues,createOccurrenceApprovalCatalog} from './assistance-occurrence-approvals.mjs';
import {computeOccurrencePlanDigest} from './assistance-occurrence-digest.mjs';
import {createOccurrenceD1Store} from './assistance-occurrence-d1.mjs';
const PLAN_KEYS=['occurrenceId','baselineRef','closeAt'];
const receipt=(verified,state)=>Object.freeze({verified,state});
const unknown=()=>receipt(false,'unknown');

/** Trusted server configuration only. No routes, credentials or provider administration.
 * Bind db to verified primary QA and never accept approval/plan from a consumer body.
 * Unknown writes must be reconciled by readback, never blindly retried.
 */
export function createClosureD1Actions({db,approval,plan,now=Date.now,authorizeWrite}={}){
 if(authorizeWrite!==undefined&&typeof authorizeWrite!=='function')throw Error('Invalid closure D1 configuration');
 const approved=validateOccurrenceApproval(approval);
 if(typeof db?.prepare!=='function'||typeof db?.batch!=='function'||typeof now!=='function'||!exact(plan,PLAN_KEYS)||plan.occurrenceId!==approved.manifest.occurrenceId||typeof plan.baselineRef!=='string'||!/^[0-9a-f]{64}$/.test(plan.baselineRef)||plan.closeAt!==approved.manifest.deadline)throw Error('Invalid closure D1 configuration');
 const pin=Object.freeze({...plan}),expected=approvalValues(approved),catalog=createOccurrenceApprovalCatalog({db});
 let digestPromise,lastTime=-1;
 function allowed(input,step){
  if(!exact(input,step===undefined?PLAN_KEYS:[...PLAN_KEYS,'step'])||!PLAN_KEYS.every(k=>input[k]===pin[k])||(step!==undefined&&input.step!==step))return false;
  const t=now();if(!timestamp(t)||t<lastTime||t<pin.closeAt)return false;lastTime=t;return true;
 }
 const digest=()=>digestPromise??=computeOccurrencePlanDigest({manifest:approved.manifest,identityRef:approved.identityRef,admissionContract:'server-v1',approval:approved});
 async function primary(){
  const current=await catalog.read(pin.occurrenceId);
  if(!current||!approvalValues(current.approval).every((v,i)=>v===expected[i]))return null;
  return current;
 }
 async function ledgerReceipt(){
  const key=await digest();
  const row=await db.prepare('SELECT identity_ref,manifest_digest,state FROM assistance_occurrence_journal WHERE occurrence_id=? ORDER BY sequence DESC LIMIT 1').bind(pin.occurrenceId).first();
  if(!row||row.identity_ref!==approved.identityRef||row.manifest_digest!==key||!['completed','stopped'].includes(row.state))return unknown();
  return receipt(true,row.state);
 }
 return Object.freeze({
  async revokePlan(input){
   try{
    if(!allowed(input))return unknown();
    const current=await primary();if(!current)return unknown();
    if(current.revoked)return receipt(true,'revoked');
    // Catalog read already checked schema and every immutable approval pin.
    // Avoid catalog.revoke's additional schema await: guard the actual write
    // synchronously after all reads, with no intervening asynchronous work.
    const insert=db.prepare("INSERT INTO assistance_occurrence_plan_revocations(occurrence_id,reason,recorded_at) SELECT occurrence_id,'window_expired',CAST(unixepoch('subsec')*1000 AS INTEGER) FROM assistance_occurrence_approved_plans WHERE occurrence_id=?").bind(pin.occurrenceId);
    if(authorizeWrite&&(await authorizeWrite(pin))!==true)return unknown();
    if(!allowed(input))return unknown();
    await insert.run();
    const after=await primary();return after?.revoked?receipt(true,'revoked'):unknown();
   }catch{return unknown();}
  },
  async closeLedger(input){
   try{
    if(!allowed(input))return unknown();
    const current=await primary();if(!current?.revoked)return unknown();
    const terminal=await ledgerReceipt();if(terminal.verified)return terminal;
    const store=createOccurrenceD1Store({db,manifest:approved.manifest,identityRef:approved.identityRef,admissionContract:'server-v1',approval:approved,now,readServerAdmission:async()=>{throw Error('Closure cannot admit work');},beforeCloseAuthorize:authorizeWrite?()=>authorizeWrite(pin):undefined,beforeCloseCommit:()=>allowed(input)});
    await store.close({reason:'window_expired'});
    // A racing terminal transition is acceptable only from primary readback.
    return await ledgerReceipt();
   }catch{return unknown();}
  },
  async readIssuedReceipt(input){
   try{
    if(!['revokePlan','closeLedger'].includes(input?.step)||!allowed(input,input.step))return unknown();
    const current=await primary();if(!current?.revoked)return unknown();
    return input.step==='revokePlan'?receipt(true,'revoked'):await ledgerReceipt();
   }catch{return unknown();}
  }
 });
}
