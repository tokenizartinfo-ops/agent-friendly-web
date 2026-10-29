import {restorationFixture,fixtureConfigHash,digest} from './canary-restoration.mjs';
export const withdrawalPolicy=JSON.stringify({purpose:'synthetic-withdrawal-policy'});
export const withdrawalHash=digest(withdrawalPolicy);
export function privateReductionRestorationFixture(options){
 const f=restorationFixture(options);
 f.state.live.bindings.push(
  {name:'AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED',type:'plain_text',text:'true'},
  {name:'AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY',type:'plain_text',text:withdrawalPolicy});
 f.policy.live.configurationHash=fixtureConfigHash(f.state.live);f.savePolicy();return f;
}
