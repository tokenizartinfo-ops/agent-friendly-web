import assert from 'node:assert/strict';
import test from 'node:test';
import {createHash} from 'node:crypto';
import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
import {finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {projectPrivateQaFiniteConfirmationBundle,reconstructPrivateQaFiniteConfirmationBundle,readPrivateQaFiniteConfirmationBundleRecord} from '../lib/mcp-qa-finite-confirmation-bundle.mjs';

function fixture(){
 const script='export default {}',workerHash=createHash('sha256').update(script).digest('hex');
 const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash,sourceCheck:'git-inputs-before-after-v1'};
 const policy=inertNamedConfirmationPolicy(artifact);
 policy.observation.configuration.compatibility_flags=['nodejs_compat','global_fetch_strictly_public','enable_request_signal'];
 policy.plan.configurationHash=finiteActivationConfigurationHash(policy.observation.configuration);
 const receipt={receiptHash:'d'.repeat(64),sourceRevision:artifact.sourceRevision,moduleHash:workerHash,versionId:policy.observation.versionId,deploymentId:policy.observation.deploymentId,activationHash:policy.plan.configurationHash};
 const resident={...artifact,module:{sha256:workerHash},bytes:Buffer.from(script)};
 return {bundle:{artifact,policy},receipt,resident};
}
test('installed policy retains its exact named bundle commitment without duplicating the script',()=>{
 const {bundle,receipt,resident}=fixture();
 const retained=projectPrivateQaFiniteConfirmationBundle(bundle,receipt);
 assert.equal(Object.hasOwn(retained.artifact,'script'),false);
 assert.deepEqual(reconstructPrivateQaFiniteConfirmationBundle(retained,resident),bundle);
 assert.throws(()=>readPrivateQaFiniteConfirmationBundleRecord(retained,{...receipt,deploymentId:'other'}));
 assert.throws(()=>readPrivateQaFiniteConfirmationBundleRecord(retained,{...receipt,receiptHash:'e'.repeat(64)}));
 assert.throws(()=>reconstructPrivateQaFiniteConfirmationBundle({...retained,bundleHash:'f'.repeat(64)},resident));
 assert.throws(()=>reconstructPrivateQaFiniteConfirmationBundle(retained,{...resident,bytes:Buffer.from('different')})); 
});
