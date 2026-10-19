import test from 'node:test';
import assert from 'node:assert/strict';

const moduleUrl=new URL('../lib/delegated-preparation-consent-policy.mjs',import.meta.url);
let policyModule;
try{policyModule=await import(moduleUrl.href);}catch(error){
 if(error.code!=='ERR_MODULE_NOT_FOUND'||error.url!==moduleUrl.href)throw error;
 policyModule={};
}
const read='afw:project:read',drafts='afw:capsule:prepare';
const start=1792454400000;
const choice=decision=>({decision});
const context=extra=>({enabled:true,requestedScopes:[read,drafts],transactionStartedAt:start,
 transactionExpiresAt:start+600000,trialStartedAt:start-1000,trialExpiresAt:start+300000,...extra});
function evaluate(input=choice('drafts'),host=context(),clock={now:start+1000}){
 assert.equal(typeof policyModule.evaluatePreparationConsentChoice,'function','detached policy must be implemented');
 return policyModule.evaluatePreparationConsentChoice(input,host,clock);
}
function closed(result,code){
 assert.equal(result.contract,'agentfriendly.preparation-consent-policy.v1');
 if(code)assert.equal(result.code,code);
 for(const key of ['refreshAllowed','consentRecorded','grantIssued','executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(result[key],false,key);
 assert.ok(Object.isFrozen(result));assert.ok(Object.isFrozen(result.scopes));
}
function denied(input,host,clock,code){
 const result=evaluate(input,host,clock);closed(result,code);
 assert.deepEqual(result.scopes,[]);assert.equal(result.expiresAt,null);return result;
}

test('draft choice preserves only the originally requested read and draft scopes',()=>{
 const result=evaluate();closed(result,'choice_valid');
 assert.deepEqual(result.scopes,[read,drafts]);assert.equal(result.expiresAt,start+300000);
});
test('read choice explicitly downscopes without a latent draft permission',()=>{
 const result=evaluate(choice('read'));closed(result,'choice_valid');assert.deepEqual(result.scopes,[read]);
});
test('read-only request cannot gain draft authority from the submitted choice',()=>{
 denied(choice('drafts'),context({requestedScopes:[read]}),undefined,'invalid_choice');
 const result=evaluate(choice('read'),context({requestedScopes:[read]}));closed(result,'choice_valid');assert.deepEqual(result.scopes,[read]);
});
test('cancel records no consent, grant, scope or expiry',()=>{
 denied(choice('cancel'),context(),undefined,'cancelled');
});
test('closed or missing server opt-in never admits a choice',()=>{
 for(const enabled of [undefined,false,'true',1,null])denied(choice('drafts'),context({enabled}),undefined,'unavailable');
 denied(choice('drafts'),null,undefined,'unavailable');
});
test('unknown, extra, accessor and non-record client decisions are rejected without reading getters',()=>{
 let reads=0;
 const accessor={};Object.defineProperty(accessor,'decision',{get(){reads++;return 'drafts';},enumerable:true});
 for(const input of [{decision:'approve'},{decision:'drafts',scope:drafts},{decision:'drafts',subject:'other'},accessor,[],null,'drafts']){
  denied(input,context(),undefined,'invalid_choice');
 }
 assert.equal(reads,0);
});
test('only the two exact proposed scope sets are admissible; order is canonicalized',()=>{
 for(const requestedScopes of [[],[drafts],[read,read],[read,'afw:evidence:read'],[read,drafts,'afw:evidence:read'],[read,'afw:capsule:prepare '],[' '+read,drafts],[read,{}]]){
  denied(choice('drafts'),context({requestedScopes}),undefined,'unavailable');
 }
 const result=evaluate(choice('drafts'),context({requestedScopes:[drafts,read]}));closed(result,'choice_valid');assert.deepEqual(result.scopes,[read,drafts]);
});
test('sparse, accessor-bearing and oversized scope arrays fail before evaluating their entries',()=>{
 let reads=0;
 const sparse=[];sparse.length=2;sparse[0]=read;
 const accessor=[read,drafts];Object.defineProperty(accessor,'1',{get(){reads++;return drafts;}});
 const oversized=[];oversized.length=1000000;Object.defineProperty(oversized,'0',{get(){reads++;return read;}});
 for(const requestedScopes of [sparse,accessor,oversized])denied(choice('drafts'),context({requestedScopes}),undefined,'unavailable');
 assert.equal(reads,0);
});
test('host records reject unknown fields, non-data clocks and malformed shapes',()=>{
 let reads=0;
 const accessor=context();Object.defineProperty(accessor,'trialExpiresAt',{get(){reads++;return start+300000;}});
 const clockAccessor={};Object.defineProperty(clockAccessor,'now',{get(){reads++;return start+1000;}});
 denied(choice('drafts'),context({scope:drafts}),undefined,'unavailable');
 denied(choice('drafts'),accessor,undefined,'unavailable');
 denied(choice('drafts'),context(),clockAccessor,'unavailable');
 denied(choice('drafts'),context(),{now:start+1000,authorized:true},'unavailable');
 denied(choice('drafts'),[],undefined,'unavailable');
 assert.equal(reads,0);
});
test('an explicit valid clock is required; policy never falls back to wall time',()=>{
 for(const clock of [null,{},[],{now:undefined},{now:NaN},{now:Infinity},{now:-1},{now:start+0.5},{now:8640000000000001}])denied(choice('drafts'),context(),clock,'unavailable');
});
test('transaction and trial must each be finite nonempty windows no longer than ten minutes',()=>{
 for(const changes of [
  {transactionStartedAt:start+600000},{transactionExpiresAt:start},
  {transactionExpiresAt:start+600001},{trialExpiresAt:start-1000},
  {trialExpiresAt:start+600000},{trialStartedAt:start+1},
  {transactionStartedAt:NaN},{transactionExpiresAt:'2026-10-19T00:00:00.000Z'},
  {trialStartedAt:-1},{trialExpiresAt:Infinity}
 ])denied(choice('drafts'),context(changes),undefined,'unavailable');
});
test('time before either original start cannot admit the decision',()=>{
 denied(choice('drafts'),context(),{now:start-1},'unavailable');
});
test('both original ends are exclusive and no expired choice is silently renewed',()=>{
 denied(choice('drafts'),context(),{now:start+300000},'expired');
 denied(choice('drafts'),context({transactionExpiresAt:start+2000}),{now:start+2000},'expired');
 denied(choice('cancel'),context(),{now:start+300001},'expired');
});
test('approval near expiry retains the original end instead of granting another ten minutes',()=>{
 const result=evaluate(choice('drafts'),context(),{now:start+299999});closed(result,'choice_valid');assert.equal(result.expiresAt,start+300000);
 const shorter=evaluate(choice('drafts'),context({transactionExpiresAt:start+2500}));assert.equal(shorter.expiresAt,start+2500);
});
test('input mutation cannot alter a completed immutable choice and repeated evaluation is deterministic',()=>{
 const host=context(),input=choice('drafts'),clock={now:start+1000};
 const first=evaluate(input,host,clock),second=evaluate(input,host,clock);
 assert.deepEqual(first,second);host.requestedScopes.push('afw:evidence:read');input.decision='read';host.trialExpiresAt=start+5000;
 assert.deepEqual(first.scopes,[read,drafts]);assert.equal(first.expiresAt,start+300000);
 assert.throws(()=>first.scopes.push('other'),TypeError);
});
test('scope errors and invalid choices never echo private or untrusted payloads',()=>{
 const secret='private-value-must-not-appear';
 for(const result of [denied({decision:'drafts',private:secret},context(),undefined,'invalid_choice'),
  denied(choice('drafts'),context({requestedScopes:[read,secret]}),undefined,'unavailable')]){
  assert.equal(JSON.stringify(result).includes(secret),false);
  assert.deepEqual(Object.keys(result),['contract','code','scopes','expiresAt','refreshAllowed','consentRecorded','grantIssued','executionAllowed','chargeAllowed','publicationAllowed']);
 }
});
