import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as policy from '../lib/mcp-release-operator-policy.mjs';
import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
const script='export default{fetch(){return new Response(null,{status:404})}}',artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};
function fixture(){const bundle={artifact,policy:inertNamedConfirmationPolicy(artifact)},event=JSON.parse(bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text);return{bundle,history:{purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:event.grantId,consentSequence:1,consentRevision:1,issuedAt:0,expiresAt:1},cancellations:[]}};}
test('server history qualifier accepts only the exact validated bundle grant',()=>{
 assert.equal(typeof policy.validateNamedCancellationHistory,'function');
 const {bundle,history}=fixture();assert.equal(policy.validateNamedCancellationHistory(bundle,JSON.stringify(history)),true);history.currentGrant.grantId='another-valid-grant';assert.throws(()=>policy.validateNamedCancellationHistory(bundle,JSON.stringify(history)));
});
test('server history qualifier rejects null malformed and oversized input',()=>{
 const {bundle}=fixture();for(const raw of [null,'','{',' '.repeat(16385)])assert.throws(()=>policy.validateNamedCancellationHistory(bundle,raw));
});
test('server history cannot qualify a publish operation',()=>{
 const {history}=fixture(),bundle={artifact,policy:{operation:'publish',startAt:0,expiresAt:1,pins:{...policy.RELEASE_TARGET,baseVersionId:'11111111-1111-4111-8111-111111111111'}}};assert.throws(()=>policy.validateNamedCancellationHistory(bundle,JSON.stringify(history)));
});
