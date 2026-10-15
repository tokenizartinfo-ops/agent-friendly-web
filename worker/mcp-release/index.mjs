import {WorkerEntrypoint} from 'cloudflare:workers';
import {createHash} from 'node:crypto';
import {createClosedPublication} from '../../lib/mcp-closed-publication.mjs';
import {createActivationJournal} from '../../lib/mcp-activation-journal.mjs';
import {createActivationObserver} from '../../lib/mcp-activation-observer.mjs';
import {validateReleaseOperatorBundle,resolveNamedActivationPlan,RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';

// Build-time inputs, not RPC arguments or public environment metadata.
const bundle=globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__;
const closedHttp={fetch(){return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});}};
export default closedHttp;
export class AfwReleaseOperator extends WorkerEntrypoint {
 async run(...args){
  const fail=()=>{throw Error('Release operator unavailable');};
  let timer;
  const controller=new AbortController();
  try{
   if(args.length!==1||typeof args[0]!=='string'||this.env.AFW_RELEASE_OPERATOR_ENABLED!=='true')fail();
   validateReleaseOperatorBundle(bundle);
   if(args[0]!==createHash('sha256').update(JSON.stringify(bundle)).digest('hex'))fail();
   const {artifact,policy}=bundle;
   let named;const namespace=this.env.AFW_RELEASE_EVENTS_NODE;
   const check=()=>{const now=Date.now();if(this.env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||controller.signal.aborted||now<policy.startAt||now>=policy.expiresAt)fail();if(named){if(this.env.AFW_RELEASE_EVENTS_NODE!==namespace)fail();named.current();}};
   check();timer=setTimeout(()=>controller.abort(),policy.expiresAt-Date.now());
   if(policy.operation==='confirm_named')named=resolveNamedActivationPlan(bundle,namespace);
   const db=this.env.RELEASE_DB;if(!db?.withSession)fail();
   const readCredential=async()=>{check();const value=this.env[policy.operation==='publish'?'AFW_RELEASE_PUBLISH_TOKEN':'AFW_RELEASE_READ_TOKEN'];if(typeof value!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(value))fail();return value;};
   await readCredential();check();
   // All provider requests remain under the same finite operator window.
   const fetchImpl=async(url,init)=>{check();const result=await fetch(url,init);check();return result;};
   if(policy.operation==='publish'){
    const result=await createClosedPublication({db,artifact,pins:policy.pins,readCredential,fetchImpl,timeoutMs:Math.min(60000,policy.expiresAt-Date.now())}).publish(controller.signal);
    check();return result;
   }
   // Do not confirm a receipt for a different build or administrative target.
   const row=await db.withSession('first-primary').prepare('SELECT account_id,worker_name,source_revision,source_tree,program_hash,worker_hash FROM dossier_publication_attempts WHERE artifact_key=?').bind(policy.plan.artifactKey).first();check();
   if(!row||row.account_id!==RELEASE_TARGET.accountId||row.worker_name!==RELEASE_TARGET.workerName||row.source_revision!==artifact.sourceRevision||row.source_tree!==artifact.sourceTree||row.program_hash!==artifact.programHash||row.worker_hash!==artifact.workerHash)fail();
   const expectedKey=createHash('sha256').update(JSON.stringify([row.account_id,row.worker_name,row.worker_hash])).digest('hex');if(expectedKey!==policy.plan.artifactKey)fail();
   const reader=createActivationObserver({...policy.observation,readCredential,fetchImpl});
   const observe=async(...args)=>{check();const result=await reader(...args);check();return result;};
   const result=await createActivationJournal({db,plan:named?.plan??policy.plan,observe,timeoutMs:Math.min(20000,policy.expiresAt-Date.now())}).confirm(controller.signal);
   check();return result;
  }catch{fail();}finally{clearTimeout(timer);controller.abort();}
 }
}
