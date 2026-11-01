import {finiteFields as fields,finiteSame as same,finiteControlIdentity} from './mcp-finite-evidence.mjs';
import {validatePrivateQaFiniteCleanupProof} from './mcp-own-finite-cleanup-proof.mjs';
const fail=()=>{throw Error('Finite proof collection unavailable');};
/** Two fact consumers share one retained proof, never one effect claim.
 * Fresh independent first-primary/provider reads precede retaining native output. */
export function createPrivateQaFiniteCleanupProofCollector({control,nativeProof,primaryRead,providerRead,now=Date.now}={}){
 const c=finiteControlIdentity(control?.identity);
 if(typeof control?.capture!=='function'||[nativeProof,primaryRead,providerRead,now].some(f=>typeof f!=='function'))fail();
 return Object.freeze({read:()=>control.capture(async proofChallenge=>{
  const value=fields(await nativeProof({intentId:c.plan.intentId,planHash:c.planHash,proofChallenge}),['proof','support']);
  validatePrivateQaFiniteCleanupProof({...value,control:c,expectedChallenge:proofChallenge,now});
  const primary=await primaryRead(),provider=await providerRead(),strip=v=>Object.fromEntries(Object.entries(v).filter(([k])=>k!=='observedAt'));
  if(!same(strip(primary),strip(value.support.primary))||!same(strip(provider),strip(value.support.providerAfter))||primary.observedAt<value.proof.observedAt||provider.observedAt<primary.observedAt||now()>=c.plan.C1)fail();
  return value;
 })});
}
