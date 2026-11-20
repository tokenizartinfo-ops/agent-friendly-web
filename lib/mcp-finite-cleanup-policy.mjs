import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite cleanup policy unavailable');};
export function validateFiniteModule(value){
 const m=fields(value,['name','sha256','bytes']);
 if(typeof m.name!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._/-]{0,127}$/.test(m.name)||m.name.includes('..')||!hex(m.sha256)||!Number.isSafeInteger(m.bytes)||m.bytes<1||m.bytes>4194304)fail();return m;
}
/** Canonical private policy derived from immutable plan fields; no historical
 * policy reuse, caller-selected operation/path/body, or additional permission. */
export function finiteCleanupPolicy(plan){
 const p=plan,s=p.selectors,r=p.resources,target=p.deployments.canaryClosed;
 const policy=data({purpose:'afw.finite-cleanup-policy.v1',intentId:p.intentId,trialId:p.trialId,grantHash:p.grantHash,containerId:r.containerId,applicationId:r.applicationId,programHash:s.programHash,programSourceRevision:s.sourceRevision,notBefore:p.C0,expiresAt:p.C1,withdrawalPolicyHash:p.withdrawalPolicyHash,canaryClosed:{versionId:target.versionId,configurationHash:target.configurationHash,module:validateFiniteModule(target.module)}});
 if(!time(policy.notBefore)||!time(policy.expiresAt)||policy.expiresAt-policy.notBefore!==180000)fail();return policy;
}
export const finiteCleanupPolicyHash=p=>createHash('sha256').update(JSON.stringify(finiteCleanupPolicy(p))).digest('hex');
export function parseFiniteCleanupPolicy(raw,plan){if(typeof raw!=='string'||Buffer.byteLength(raw)>4096)fail();const v=data(JSON.parse(raw)),expected=finiteCleanupPolicy(plan);if(JSON.stringify(v)!==raw||!same(v,expected)||createHash('sha256').update(raw).digest('hex')!==plan.closePolicyHash)fail();return v;}
