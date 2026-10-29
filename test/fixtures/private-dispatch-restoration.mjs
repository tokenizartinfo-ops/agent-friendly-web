import {privateReductionRestorationFixture} from './private-reduction-restoration.mjs';
import {fixtureConfigHash,digest} from './canary-restoration.mjs';
export function privateDispatchRestorationFixture(options){
 const f=privateReductionRestorationFixture(options),at=f.at,dispatchAt=Math.ceil((at+1000)/60000)*60000;
 f.policy.startAt=dispatchAt+60000;f.policy.expiresAt=dispatchAt+120000;
 const w=f.state.live.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY'),withdrawal=JSON.parse(w.text);
 withdrawal.startAt=f.policy.startAt;withdrawal.expiresAt=f.policy.expiresAt;withdrawal.originalConsent.issuedAt=at-1000;withdrawal.originalConsent.expiresAt=dispatchAt+90000;
 w.text=JSON.stringify(withdrawal);f.withdrawalHash=digest(w.text);
 const key='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',eventId=digest(JSON.stringify(['afw.own-synthetic-save.v1','owner','own',key]));
 const env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'true',AFW_DOSSIER_MONITORING_OWNER_ENABLED:'true',AFW_DOSSIER_OWN_SAVE_ENABLED:'true',
 AFW_DOSSIER_OWN_SAVE_KEY:key,AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',
 AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:'own-grant',subject:'owner',projectId:'own',clientId:'own-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',startAt:at-1000,expiresAt:dispatchAt+90000}),
 AFW_DOSSIER_EVENTS_SCHEDULE:JSON.stringify({receipt:'original',eventId,dispatchAt,closeAt:dispatchAt+120000})};
 for(const[name,text]of Object.entries(env)){const b=f.state.live.bindings.find(b=>b.name===name);if(b)b.text=text;else f.state.live.bindings.push({name,type:'plain_text',text});}
 f.policy.live.configurationHash=fixtureConfigHash(f.state.live);f.savePolicy();f.planHash=digest(f.control.policy);
 f.dispatch={purpose:'afw.private-prepared-dispatch.v1',eventId,dispatchAt,expiresAt:dispatchAt+30000,closurePolicyHash:f.planHash,withdrawalPolicyHash:f.withdrawalHash};
 f.dispatchRaw=JSON.stringify(f.dispatch);f.dispatchHash=digest(f.dispatchRaw);return f;
}
