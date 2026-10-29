import {restorationFixture,fixtureConfigHash,digest} from './canary-restoration.mjs';
export function privateReductionRestorationFixture(options){
 const f=restorationFixture(options);
 const policy={purpose:'afw.private-permission-withdrawal.v1',requestId:'22222222-2222-4222-8222-222222222222',
  startAt:f.at-1000,expiresAt:f.at+120000,originalConsent:{sequence:1,revision:1,issuedAt:f.at-60000,expiresAt:f.at+120000},...f.policy.candidate};
 delete policy.applicationId;
 const raw=JSON.stringify(policy);f.withdrawalHash=digest(raw);
 f.state.live.bindings.push(
  {name:'AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED',type:'plain_text',text:'true'},
  {name:'AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY',type:'plain_text',text:raw});
 f.policy.live.configurationHash=fixtureConfigHash(f.state.live);f.savePolicy();return f;
}
