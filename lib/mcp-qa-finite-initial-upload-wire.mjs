import {createHash} from 'node:crypto';
import {initialOwn as own,initialFields as fields,initialCanonical as canonical,decodeFiniteInitialMaterialRecord} from './mcp-qa-finite-initial-material-records.mjs';
import {finitePublicProfileTemplate} from './mcp-qa-finite-profile.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
const fail=()=>{throw Error('Finite initial upload wire unavailable');};
export const initialUploadSha=x=>createHash('sha256').update(x).digest('hex');
const sha=initialUploadSha,BASE='2607abae-cec3-4e35-89eb-8b8572262b54';
const CONFIG=['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'];
const READONLY=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
const same=(a,b)=>canonical(a)===canonical(b);
/** Pure supported profile projection; neither caller data nor this output grants upload. */
export function buildFiniteInitialUpload(material,baseline,bytes){
 const m=decodeFiniteInitialMaterialRecord('InitialMaterial',canonical(material)),p=m.ownerSelection;
 if(!(bytes instanceof Uint8Array)||bytes.length<1||bytes.length>2097152||sha(bytes)!==m.originalContext.artifact.workerHash)fail();
 const cfg=structuredClone(finitePublicProfileTemplate('canaryLive'));
 cfg.bindings=cfg.bindings.map(b=>b.name.endsWith('_ENABLED')?{name:b.name,type:'plain_text',text:'false'}:b.privateSlot?{name:b.name,type:'plain_text',text:b.name==='AFW_OAUTH_PILOT_CLIENT_ID'?p.clientId:b.name==='AFW_OAUTH_PILOT_PROJECT_ID'?p.project.projectId:''}:b);
 cfg.bindings.push({name:'ACCESS_TEAM_DOMAIN',type:'plain_text',text:p.access.teamDomain},{name:'ACCESS_AUD',type:'plain_text',text:p.access.audience},{name:'AFW_OAUTH_PILOT_EXPIRES_AT',type:'plain_text',text:new Date(m.intent.initialDeadline).toISOString()},structuredClone(p.limiter),{name:'AFW_DOSSIER_MONITORING_OWNER_POLICY',type:'plain_text',text:''});
 qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:cfg});
 // Every physical/secret binding must already exist under the same actual ID;
 // the two explicitly reviewed profile references are the only exceptions.
 const physical=b=>!['plain_text','version_metadata'].includes(b.type);
 const original=baseline.configuration.bindings.filter(physical),next=cfg.bindings.filter(physical).filter(b=>b.name!=='AFW_FINITE_TRIAL_CONTROL');
 if(!same(original.slice().sort((a,b)=>a.name.localeCompare(b.name)),next.slice().sort((a,b)=>a.name.localeCompare(b.name))))fail();
 const configuration=own(cfg),body=JSON.stringify({...configuration,containers:[{class_name:'AfwOwnEventNode'}],bindings:configuration.bindings.map(b=>b.type==='secret_text'?{name:b.name,type:'inherit',version_id:BASE}:b),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(bytes).toString('base64')}]});
 return {configuration,body,bodyHash:sha(body)};
}
/** Strict provider normalization; reject dangerous/unknown fields before copying. */
export function qualifyFiniteInitialUploadedVersion(v,versionId,configuration,bytes){
 fields(v,[...CONFIG,...READONLY.filter(k=>Object.hasOwn(v,k)),...Object.hasOwn(v,'cache_options')?['cache_options']:[]]);
 if(v.id!==versionId||!Array.isArray(v.urls)||v.urls.length)fail();
 // Raw module is large; every other field is copied under the 64KiB bound.
 const raw=own(Object.fromEntries(Object.entries(v).filter(([k])=>k!=='modules')));
 const cfg=structuredClone(Object.fromEntries(CONFIG.map(k=>[k,raw[k]])));
 fields(cfg.exports,['default','AfwNodeControl','AfwOwnEventNode']);
 for(const [name,e]of Object.entries(cfg.exports)){
  const keys=name==='AfwOwnEventNode'?['type','storage','container']:['type'];
  fields(e,[...keys,...Object.hasOwn(e,'state')?['state']:[],...Object.hasOwn(e,'cache')?['cache']:[]]);
  if(Object.hasOwn(e,'state')){if(e.state!=='created')fail();delete e.state;}
  if(Object.hasOwn(e,'cache')){fields(e.cache,['enabled']);if(name==='AfwOwnEventNode'||e.cache.enabled!==false)fail();delete e.cache;}
 }
 if(Object.hasOwn(raw,'cache_options')){const keys=['enabled','cross_version_cache'].filter(k=>Object.hasOwn(raw.cache_options??{},k));if(!keys.length)fail();fields(raw.cache_options,keys);if(keys.some(k=>raw.cache_options[k]!==false))fail();}
 if(!same(cfg,configuration))fail();
 qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:cfg});
 fields(v.modules?.[0],['name','content_type','content_base64']);
 qualifyFiniteWorkerVersion({metadata:{...cfg,id:v.id,urls:v.urls,modules:v.modules},pin:{versionId,module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},configurationHash:restorationConfigurationHash(cfg)},role:'canary',closed:true});
 return own(cfg);
}
