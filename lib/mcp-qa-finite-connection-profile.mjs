import {finiteData as data,finiteFields as fields} from './mcp-finite-evidence.mjs';
import {finitePublicProfileTemplate} from './mcp-qa-finite-profile.mjs';
const fail=()=>{throw Error('Finite connection profile unavailable');};
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&!/[\u0000-\u001f\u007f]/.test(x);
/** Exact preparation grammar. Private source independently pins actual values;
 * grammar/profile hashes are facts, never approval or provider authority. */
export function qualifyFiniteConnectionProfile(input){
 const {phase,metadata}=fields(input,['phase','metadata']);
 if(!['closed_ui','read_consent','notice_consent'].includes(phase))fail();
 const value=data(metadata),base=finitePublicProfileTemplate('canaryLive');
 fields(value,Object.keys(base));
 for(const k of Object.keys(base).filter(k=>k!=='bindings'))if(canonical(value[k])!==canonical(base[k]))fail();
 const extras=['ACCESS_AUD','ACCESS_TEAM_DOMAIN','AFW_OAUTH_PILOT_EXPIRES_AT','DELEGATED_RATE_LIMITER','AFW_DOSSIER_MONITORING_OWNER_POLICY'];
 const names=[...base.bindings.map(b=>b.name),...extras];
 if(!Array.isArray(value.bindings)||value.bindings.length!==names.length||new Set(value.bindings.map(b=>b.name)).size!==names.length||value.bindings.some(b=>!names.includes(b.name)))fail();
 const binding=name=>value.bindings.find(b=>b.name===name),text=name=>{const b=fields(binding(name),['name','type','text']);if(b.type!=='plain_text'||typeof b.text!=='string')fail();return b.text;};
 for(const rule of base.bindings){
  const actual=binding(rule.name);
  if(rule.name.endsWith('_ENABLED')){
   const expected=rule.name==='AFW_DELEGATED_OAUTH_ENABLED'&&phase!=='closed_ui'||rule.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED'&&phase==='notice_consent'?'true':'false';
   if(text(rule.name)!==expected)fail();
  }else if(rule.privateSlot){
   const v=text(rule.name);
   if(['AFW_OAUTH_PILOT_PROJECT_ID','AFW_OAUTH_PILOT_CLIENT_ID'].includes(rule.name)?!id(v):v!=='')fail();
  }else if(canonical(actual)!==canonical(rule))fail();
 }
 if(!id(text('ACCESS_AUD'))||!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(text('ACCESS_TEAM_DOMAIN')))fail();
 const expiry=text('AFW_OAUTH_PILOT_EXPIRES_AT');if(!Number.isSafeInteger(Date.parse(expiry))||new Date(Date.parse(expiry)).toISOString()!==expiry)fail();
 const limiter=fields(binding('DELEGATED_RATE_LIMITER'),['name','type','namespace_id','simple']),simple=fields(limiter.simple,['limit','period']);
 if(limiter.type!=='ratelimit'||typeof limiter.namespace_id!=='string'||!/^\d+$/.test(limiter.namespace_id)||!Number.isSafeInteger(simple.limit)||simple.limit<1||![10,60].includes(simple.period))fail();
 const raw=text('AFW_DOSSIER_MONITORING_OWNER_POLICY');
 if(phase!=='notice_consent'){if(raw!=='')fail();}else{
  if(raw.length>2048)fail();let policy;try{policy=fields(JSON.parse(raw),['grantId','projectId','clientId','startAt','expiresAt']);}catch{fail();}
  if(!id(policy.grantId)||policy.projectId!==text('AFW_OAUTH_PILOT_PROJECT_ID')||policy.clientId!==text('AFW_OAUTH_PILOT_CLIENT_ID')||!Number.isSafeInteger(policy.startAt)||policy.startAt<0||!Number.isSafeInteger(policy.expiresAt)||policy.expiresAt<=policy.startAt||policy.expiresAt-policy.startAt>600000||policy.expiresAt>Date.parse(expiry))fail();
 }
 return value;
}
