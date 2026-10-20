import {readRecord,readList,clock as isClock} from './agent-consumption-input.mjs';

const READ='afw:project:read';
const DRAFTS='afw:capsule:prepare';
const MAX_WINDOW=600000;
const POLICY_KEYS=['enabled','requestedScopes','transactionStartedAt','transactionExpiresAt','trialStartedAt','trialExpiresAt'];

function result(code,scopes=[],expiresAt=null){
 return Object.freeze({
  contract:'agentfriendly.preparation-consent-policy.v1',code,
  scopes:Object.freeze([...scopes]),expiresAt,
  refreshAllowed:false,consentRecorded:false,grantIssued:false,
  executionAllowed:false,chargeAllowed:false,publicationAllowed:false,
 });
}

/**
 * Pure candidate selection only: does NOT verify identity, original SDK
 * transaction, schema, clock provenance or authority; records/authorizes nothing.
 * policy and clock must come from the future trusted host, never public input.
 * Absolute timestamps span requests; their original monotonic leases stay with
 * the host. No clock read/fallback, refresh, persistence or runtime caller.
 */
export function evaluatePreparationConsentChoice(choice,policy,clock){
 const p=readRecord(policy,POLICY_KEYS),c=readRecord(clock,['now']);
 if(!p||p.enabled!==true||!c||!isClock(c.now))return result('unavailable');
 const scopes=readList(p.requestedScopes,2);
 if(!scopes||!scopes.includes(READ)||new Set(scopes).size!==scopes.length
  ||scopes.some(scope=>scope!==READ&&scope!==DRAFTS))return result('unavailable');
 if(!['transactionStartedAt','transactionExpiresAt','trialStartedAt','trialExpiresAt'].every(key=>isClock(p[key])))
  return result('unavailable');
 const ts=p.transactionStartedAt,te=p.transactionExpiresAt;
 const ws=p.trialStartedAt,we=p.trialExpiresAt;
 if(te<=ts||te-ts>MAX_WINDOW||we<=ws||we-ws>MAX_WINDOW||ts<ws||ts>=we)
  return result('unavailable');
 if(c.now<ts||c.now<ws)return result('unavailable');
 if(c.now>=te||c.now>=we)return result('expired');
 const input=readRecord(choice,['decision']);
 if(!input||!['read','drafts','cancel'].includes(input.decision))return result('invalid_choice');
 if(input.decision==='cancel')return result('cancelled');
 if(input.decision==='drafts'&&!scopes.includes(DRAFTS))return result('invalid_choice');
 const selected=input.decision==='drafts'?[READ,DRAFTS]:[READ];
 return result('choice_valid',selected,Math.min(te,we,c.now+MAX_WINDOW));
}
