import {resolveFiniteNativePackage} from './mcp-qa-finite-package.mjs';
import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
import {finiteGhaCustody} from './mcp-qa-finite-custody.mjs';
import {assertQaFiniteConfirmationAdmission} from './mcp-qa-cloud-lifecycle-admission.mjs';

const fail=()=>{throw Error('Finite external source unavailable');};

/** Seed material identifies only the original QA version. Complete external
 * plan evidence comes from the native observer's qualified Workflow step. */
export async function resolvePrivateQaFiniteExternalSource({admission,phase,sourceRevision,githubToken,fetchImpl,now,signal}={}){
 if(phase==='seed-material')return resolveFiniteNativePackage({sourceRevision,githubToken,fetchImpl,now,signal});
 if(!['admit','poll','restore'].includes(phase)||sourceRevision!==admission?.sourceRevision)fail();
 const mode=phase==='admit'?'nominal':'cleanup';
 assertQaFiniteConfirmationAdmission(admission,mode);
 const {seed,primaryEvidence}=await readFiniteMaterialSeed({intentId:admission.intentId,sourceRevision,fetchImpl,now,signal});
 assertQaFiniteConfirmationAdmission(admission,mode);
 if(primaryEvidence.T0!==admission.createdAt||primaryEvidence.R1!==admission.cleanupExpiresAt||
    primaryEvidence.runId!==Number(admission.runId)||seed.commandId!==admission.commentId)fail();
 const {versionId,deploymentId,configurationHash,module}=seed.qaPublication.qaLive;
 const qaLive={versionId,deploymentId,configurationHash,module:{name:module.name,sha256:module.sha256,bytes:module.bytes}};
 return Object.freeze({qaLive,custody:finiteGhaCustody()});
}
