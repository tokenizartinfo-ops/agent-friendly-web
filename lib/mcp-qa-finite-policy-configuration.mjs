import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
import {parseDossierEventPolicyFields,parseDossierRetirementFields} from './dossier-event-policy-data.mjs';
import {parseOwnPermissionWithdrawalPolicy} from './mcp-own-permission-withdrawal-policy.mjs';

const fail=()=>{throw Error('Finite policy configuration unavailable');};
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
const policyNames=['AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY','AFW_DOSSIER_RETIREMENT_POLICY','AFW_DOSSIER_SUCCESSOR_POLICY','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID'];
const preparationNames=['ACCESS_AUD','ACCESS_TEAM_DOMAIN','AFW_DOSSIER_MONITORING_OWNER_POLICY','AFW_OAUTH_PILOT_EXPIRES_AT','DELEGATED_RATE_LIMITER'];

/** Constructs only a full normalized DATA candidate; no source or grant authority. */
export function buildFinitePolicySetupConfiguration(input){
 const {prearmConfiguration,policies}=fields(data(input),['prearmConfiguration','policies']);
 const raw=fields(policies,policyNames);
 for(const name of policyNames)if(typeof raw[name]!=='string'||!raw[name])fail();
 if(Buffer.byteLength(raw.AFW_DOSSIER_RETIREMENT_POLICY)>4096)fail();
 const prearm=qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:prearmConfiguration});
 const template=finitePublicProfileTemplate('canaryLive');
 const originalBinding=name=>prearm.bindings.find(b=>b.name===name);
 if(raw.AFW_OAUTH_PILOT_CLIENT_ID!==originalBinding('AFW_OAUTH_PILOT_CLIENT_ID').text||
    raw.AFW_OAUTH_PILOT_PROJECT_ID!==originalBinding('AFW_OAUTH_PILOT_PROJECT_ID').text)fail();
 parseDossierEventPolicyFields(raw.AFW_DOSSIER_EVENTS_POLICY,true);
 parseOwnPermissionWithdrawalPolicy(raw.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY);
 const retired=parseDossierRetirementFields(raw.AFW_DOSSIER_RETIREMENT_POLICY);
 parseDossierEventPolicyFields(JSON.stringify(retired.policy),false);
 const successor=fields(data(JSON.parse(raw.AFW_DOSSIER_SUCCESSOR_POLICY)),['scope','original','candidate','publication']);
 fields(successor.scope,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']);
 fields(successor.original,['containerId','applicationId','programHash','sourceRevision']);
 fields(successor.candidate,['trialId','programHash','sourceRevision','startAt','expiresAt','budget']);
 fields(successor.publication,['artifactKey','workerHash','activationKey']);
 for(const key of Object.keys(template).filter(k=>k!=='bindings'))if(canonical(prearm[key])!==canonical(template[key]))fail();
 const bindings=template.bindings.map(rule=>{
  if(rule.privateSlot)return{name:rule.name,type:'plain_text',text:raw[rule.name]};
  if(rule.type!=='plain_text'){
   const holder=originalBinding(rule.name);
   if(canonical(holder)!==canonical(rule))fail();
   return holder;
  }
  return rule;
 });
 const before=new Set(prearm.bindings.map(b=>b.name)),after=new Set(bindings.map(b=>b.name));
 if(canonical([...before].filter(n=>!after.has(n)).sort())!==canonical(preparationNames)||
    [...after].some(n=>!before.has(n)))fail();
 const configuration=data({...Object.fromEntries(Object.keys(template).filter(k=>k!=='bindings').map(k=>[k,template[k]])),bindings});
 projectFinitePublicConfiguration({role:'canaryLive',metadata:configuration});
 return configuration;
}
