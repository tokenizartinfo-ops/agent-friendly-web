import {finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';

// Explicit, expired synthetic DATA for pure configuration tests only.
// These strings are structural grammar examples, not source or consent evidence.
export function finitePolicyConfigurationFixture(){
 const template=structuredClone(finitePublicProfileTemplate('canaryLive'));
 const closedNames=new Set(['AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED']);
 for(const binding of template.bindings){
  if(binding.privateSlot){
   delete binding.privateSlot;
   binding.text=binding.name==='AFW_OAUTH_PILOT_PROJECT_ID'?'ci-prearm-project':binding.name==='AFW_OAUTH_PILOT_CLIENT_ID'?'ci-prearm-client':'';
  }else if(closedNames.has(binding.name))binding.text='false';
 }
 template.bindings.push(
  {name:'ACCESS_TEAM_DOMAIN',type:'plain_text',text:'ci-prearm.cloudflareaccess.com'},
  {name:'ACCESS_AUD',type:'plain_text',text:'ci-prearm-aud'},
  {name:'AFW_OAUTH_PILOT_EXPIRES_AT',type:'plain_text',text:'2026-11-03T02:59:00.000Z'},
  {name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'2026101001',simple:{limit:10,period:60}},
  {name:'AFW_DOSSIER_MONITORING_OWNER_POLICY',type:'plain_text',text:''}
 );
 const scope={accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',ownerRef:'1'.repeat(64),projectRef:'2'.repeat(64),resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'};
 const original={containerId:'3'.repeat(64),applicationId:scope.applicationId,programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40)};
 const candidate={trialId:'6'.repeat(64),programHash:'7'.repeat(64),sourceRevision:'8'.repeat(40),startAt:1000,expiresAt:301000,budget:1};
 const publication={artifactKey:'9'.repeat(64),workerHash:'a'.repeat(64),activationKey:'b'.repeat(64)};
 const event={grantId:'ci-synthetic-grant',subject:'ci-synthetic-subject',projectId:'ci-prearm-project',clientId:'ci-prearm-client',resource:scope.resource,startAt:1000,expiresAt:301000};
 const policies={
  AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(event),
  AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:JSON.stringify({purpose:'afw.private-permission-withdrawal.v1',requestId:'11111111-2222-4333-8444-555555555555',startAt:241000,expiresAt:421000,originalConsent:{sequence:1,revision:1,issuedAt:1000,expiresAt:301000},containerId:'c'.repeat(64),programHash:candidate.programHash,sourceRevision:candidate.sourceRevision}),
  AFW_DOSSIER_RETIREMENT_POLICY:JSON.stringify({programHash:original.programHash,sourceRevision:original.sourceRevision,...event,containerId:original.containerId}),
  AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication}),
  AFW_OAUTH_PILOT_CLIENT_ID:'ci-prearm-client',
  AFW_OAUTH_PILOT_PROJECT_ID:'ci-prearm-project'
 };
 return {prearmConfiguration:template,policies};
}
