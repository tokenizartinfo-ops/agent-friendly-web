import {createCanaryRestorationTransport} from './mcp-canary-restoration-transport.mjs';
import {createFiniteProviderInventoryReader} from './mcp-finite-primary-inventory.mjs';
import {finiteCleanupPolicy} from './mcp-finite-cleanup-policy.mjs';
import {readPrivateQaFiniteReductionControl} from './mcp-qa-finite-reduction-control.mjs';
import {finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite proof inventory unavailable');};

/** The canary has no provider credential. Observe only the fixed application
 * through the same QA actor and its outstanding cleanup authorization. */
export async function readPrivateQaFiniteProofInventory({ctx,env,compiledRevision,refs,now=Date.now}={}){
 if(!['proofReadiness','proofCapture'].includes(refs?.operation))fail();
 const signal=AbortSignal.timeout(4800),started=now(),storage=ctx.storage,version=env.AFW_QA_VERSION,fetchImpl=globalThis.fetch;
 const credential=env.AFW_MCP_CLOSURE_READ_TOKEN;
 if(typeof credential!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(credential))fail();
 let last=started;
 const current=()=>{
  const at=now();
  if(signal.aborted||!time(at)||at<last||at-started>=4800||ctx.storage!==storage||
     env.AFW_QA_VERSION!==version||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetchImpl)fail();
  last=at;return at;
 };
 const read=()=>readPrivateQaFiniteReductionControl({ctx,env,compiledRevision,refs,now:current});
 current();const first=await read();current();
 const policy=JSON.stringify(finiteCleanupPolicy(first.control.plan));
 const request=createCanaryRestorationTransport({finiteTrial:first.control,now:current,fetchImpl,
  readControl:()=>{current();return {enabled:true,policy};},readReadCredential:()=>{current();return credential;},
  readPublishCredential:fail});
 const inventory=createFiniteProviderInventoryReader({control:first.control,request,now:current});
 const result=await inventory({signal,assertCurrent:current});current();
 const again=await read();current();
 if(!same(first.control,again.control)||result.observedAt<first.observedAt||result.observedAt>again.observedAt)fail();
 return result;
}
