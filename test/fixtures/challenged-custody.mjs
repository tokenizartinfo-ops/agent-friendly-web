import {createRetiredRpcReceipt} from '../../lib/mcp-retired-rpc-receipt.mjs';
// CI-only server adapter: use the actual protocol while retaining each fixture's
// original method, fault injection, counters and clock.
export function withChallengedCustody(target,now,kind='original'){
 const method=kind==='successor'?'observeSuccessorRetired':'observeRetired',receipt=method+'Receipt';
 target[receipt]=(...args)=>{
  if(args.length!==1)throw Error('Unexpected synthetic selector');
  return createRetiredRpcReceipt({challenge:args[0],now,observe:async()=>({value:await target[method]()})});
 };
 return target;
}
