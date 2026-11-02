import {createHash} from 'node:crypto';
import receiptSource from '../scripts/mcp-confirmation-frozen-artifact.json' with {type:'json'};
import historicalSource from '../scripts/mcp-qa-legacy-historical-context.json' with {type:'json'};
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {validatePrivateQaLegacyHistoricalContext} from './mcp-qa-legacy-predecessor.mjs';
import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {parseDossierEventPolicyFields,validateDossierEventPolicyData,parseDossierRetirementFields} from './dossier-event-policy-data.mjs';
import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
const ROOT='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const VERSION='2607abae-cec3-4e35-89eb-8b8572262b54',WORKER='agent-friendly-web-delegated-canary',CONTAINER=WORKER+'-afwowneventnode';
const TOKEN='9aa97ad1fc9afe3021cf69ea497d5190',CEILING=Date.parse('2026-11-03T02:59:00Z');
const SLOT='afw-own-successor-closure-v1',ORIGINAL='afw-own-event-one-occurrence-v1';
const KEYS=['afw.canary-restoration-control.v1','afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1','afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1'];
const CONFIG=['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'],OPTIONAL=['limits','placement','cache_options','assets','package_dependencies'];
const READONLY=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
const hash=x=>createHash('sha256').update(x).digest('hex'),json=JSON.stringify;
const hex=(x,n=64)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x),uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000,positive=x=>Number.isSafeInteger(x)&&x>0;
const id=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{1,200}$/.test(x);
const fail=gate=>{throw Error('Finite historical source unavailable:'+gate);};
function fields(v,keys,gate='input'){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail(gate);
 for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail(gate);}return v;
}
function own(v,max=131072){
 // Native inputs are detached before use; reject accessors/prototypes/cycles.
 let nodes=0,bytes=0;
 const copy=(x,depth=0)=>{
  if(++nodes>20000||depth>24)fail('coherence');
  if(x===null||typeof x==='boolean'||typeof x==='number'&&Number.isFinite(x))return x;
  if(typeof x==='string'){bytes+=Buffer.byteLength(x);if(bytes>max)fail('coherence');return x;}
  const array=Array.isArray(x);if(!x||typeof x!=='object'||Object.getPrototypeOf(x)!==(array?Array.prototype:Object.prototype))fail('coherence');
  const ks=Reflect.ownKeys(x);if(array&&(ks.length!==x.length+1||x.length>1024))fail('coherence');
  const out=array?[]:{};
  for(const k of ks){if(array&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(x,k);if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value'))fail('coherence');out[k]=copy(d.value,depth+1);}return out;
 };const result=copy(v);if(Buffer.byteLength(json(result))>max)fail('coherence');return result;
}
function freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;}
function canonical(raw,max,gate){if(typeof raw!=='string'||Buffer.byteLength(raw)>max)fail(gate);const v=JSON.parse(raw);if(json(v)!==raw)fail(gate);return v;}
const receipt=freeze(own(receiptSource)),historical=freeze(own(validatePrivateQaLegacyHistoricalContext(historicalSource))),pin=freeze(own(QA_CLOUD_CLOSED_PINS.canary));
function configuration(v){
 fields(v,[...CONFIG,...OPTIONAL.filter(k=>Object.hasOwn(v,k)),...READONLY.filter(k=>Object.hasOwn(v,k))],'metadata');
 if(v.id!==VERSION||v.main_module!=='index.mjs'||v.compatibility_date!=='2026-09-07'||json(v.compatibility_flags)!==json(['nodejs_compat','global_fetch_strictly_public'])||v.usage_model!=='standard'||!Array.isArray(v.urls)||v.urls.length)fail('metadata');
 for(const k of ['number','startup_time_ms'])if(Object.hasOwn(v,k)&&(!Number.isSafeInteger(v[k])||v[k]<0))fail('metadata');
 for(const k of ['source','created_on','author_id','author_email'])if(Object.hasOwn(v,k)&&(typeof v[k]!=='string'||v[k].length>512))fail('metadata');
 if(Object.hasOwn(v,'annotations')){const a=own(v.annotations,4096);if(!a||Array.isArray(a)||Object.keys(a).length>16||Object.entries(a).some(([k,x])=>k.length>128||typeof x!=='string'||x.length>512))fail('metadata');}
 if(!Array.isArray(v.bindings)||v.bindings.length!==pin.bindingCount)fail('metadata');
 const names=new Set();
 for(const b of v.bindings){
  if(!b||typeof b.name!=='string'||!/^[A-Za-z_][A-Za-z0-9_]{0,127}$/.test(b.name)||names.has(b.name))fail('metadata');names.add(b.name);
  // Reject secret content BEFORE any raw fingerprint/copy.
  if(b.type==='secret_text')fields(b,['name','type'],'metadata');
  else if(b.type==='plain_text'){fields(b,['name','type','text'],'metadata');if(typeof b.text!=='string'||Buffer.byteLength(b.text)>16384)fail('metadata');}
  else if(b.type==='d1'){fields(b,['name','type','id'],'metadata');if(!uuid(b.id))fail('metadata');}
  else if(b.type==='kv_namespace'){fields(b,['name','type','namespace_id'],'metadata');if(!hex(b.namespace_id,32))fail('metadata');}
  else if(b.type==='durable_object_namespace'){fields(b,['name','type','namespace_id','class_name',...Object.hasOwn(b,'script_name')?['script_name']:[]],'metadata');if(!hex(b.namespace_id,32)||typeof b.class_name!=='string'||b.script_name!==undefined&&b.script_name!==WORKER)fail('metadata');}
  else if(b.type==='ratelimit'){fields(b,['name','type','namespace_id','simple'],'metadata');fields(b.simple,['limit','period'],'metadata');if(typeof b.namespace_id!=='string'||!positive(b.simple.limit)||!positive(b.simple.period))fail('metadata');}
  else fail('metadata');
 }
 const flags=v.bindings.filter(b=>b.name.startsWith('AFW_')&&b.name.endsWith('_ENABLED'));if(flags.length!==pin.flagCount||flags.some(b=>b.type!=='plain_text'||b.text!=='false'))fail('metadata');
 if(!Array.isArray(v.containers)||v.containers.length!==1)fail('metadata');fields(v.containers[0],['class_name','name'],'metadata');if(v.containers[0].class_name!=='AfwOwnEventNode'||v.containers[0].name!==CONTAINER)fail('metadata');
 fields(v.exports,['default','AfwNodeControl','AfwOwnEventNode'],'metadata');
 for(const [name,e]of Object.entries(v.exports)){
  const worker=name!=='AfwOwnEventNode';fields(e,[...worker?['type']:['type','storage','container'],...Object.hasOwn(e,'state')?['state']:[],...Object.hasOwn(e,'cache')?['cache']:[]],'metadata');
  if(e.type!==(worker?'worker':'durable-object')||!worker&&(e.storage!=='sqlite'||e.container!==CONTAINER)||e.state!==undefined&&e.state!=='created'||!worker&&Object.hasOwn(e,'cache'))fail('metadata');
  if(Object.hasOwn(e,'cache')){fields(e.cache,['enabled'],'metadata');if(e.cache.enabled!==false)fail('metadata');}
 }
 if(Object.hasOwn(v,'cache_options')){
  const c=v.cache_options,ks=['enabled','cross_version_cache'].filter(k=>Object.hasOwn(c??{},k));if(!ks.length)fail('metadata');fields(c,ks,'metadata');if(ks.some(k=>c[k]!==false))fail('metadata');
 }
 const raw=own(Object.fromEntries([...CONFIG,...OPTIONAL.filter(k=>Object.hasOwn(v,k))].map(k=>[k,v[k]]))),rawHash=restorationConfigurationHash(raw),normalized=own(raw),normalizations=[];
 if(rawHash!==pin.configurationHash){
  for(const [name,e]of Object.entries(normalized.exports)){
   if(Object.hasOwn(e,'state')){delete e.state;normalizations.push('exports.'+name+'.state');}
   if(Object.hasOwn(e,'cache')){delete e.cache;normalizations.push('exports.'+name+'.cache');}
  }
  if(Object.hasOwn(normalized,'cache_options')){delete normalized.cache_options;normalizations.push('cache_options');}
 }
 const normalizedHash=restorationConfigurationHash(normalized);
 if(normalizedHash!==pin.configurationHash)fail('metadata');
 return{configuration:normalized,metadataProof:{versionId:VERSION,rawConfigurationHash:rawHash,normalizedConfigurationHash:normalizedHash,normalizations:normalizations.sort()}};
}
/** Shared pure byte/configuration trust boundary for both historical consumers. */
function qualifyHistoricalVersionMaterial(v){
 const p=configuration(v);
 if(!Array.isArray(v.modules)||v.modules.length!==1)fail('metadata');
 const m=fields(v.modules[0],['name','content_type','content_base64'],'metadata');
 if(m.name!=='index.mjs'||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string'||m.content_base64.length>2796204)fail('metadata');
 const bytes=Buffer.from(m.content_base64,'base64');
 if(bytes.toString('base64')!==m.content_base64||bytes.byteLength!==receipt.workerBytes||bytes.byteLength!==pin.module.bytes||hash(bytes)!==receipt.workerHash||receipt.workerHash!==pin.module.sha256||receipt.baseVersionId!==VERSION||receipt.sourceCheck!=='git-inputs-before-after-v1'||receipt.artifactKey!==hash(json([RELEASE_TARGET.accountId,WORKER,receipt.workerHash])))fail('metadata');
 for(const [a,b]of [['artifactSourceRevision','sourceRevision'],['artifactSourceTree','sourceTree'],['artifactProgramHash','programHash'],['artifactWorkerHash','workerHash']])if(historical[a]!==receipt[b])fail('metadata');
 return {...p,bytes};
}
/** Pure, private-package metadata/byte qualification. No reader or effect authority. */
export function qualifyFiniteInitialHistoricalBaseline(v){
 const {bytes,...p}=qualifyHistoricalVersionMaterial(v);
 const rawConfiguration=own(Object.fromEntries([...CONFIG,...OPTIONAL.filter(k=>Object.hasOwn(v,k))].map(k=>[k,v[k]])));
 return {...p,rawConfiguration,bytes:new Uint8Array(bytes),sourceRevision:receipt.sourceRevision,sourceTree:receipt.sourceTree};
}
function version(v,node){
 const {bytes,...p}=qualifyHistoricalVersionMaterial(v);
 const artifact={script:new TextDecoder('utf-8',{fatal:true}).decode(bytes),...Object.fromEntries(['sourceRevision','sourceTree','programHash','workerHash','sourceCheck'].map(k=>[k,receipt[k]]))};
 const get=name=>{const b=p.configuration.bindings.find(b=>b.name===name);if(b?.type!=='plain_text'||!b.text)fail('historical_slots');return b.text;};
 const bindings={successorPolicy:get('AFW_DOSSIER_SUCCESSOR_POLICY'),eventsPolicy:get('AFW_DOSSIER_EVENTS_POLICY'),retirementPolicy:get('AFW_DOSSIER_RETIREMENT_POLICY')};
 const manifest=canonical(bindings.successorPolicy,8192,'historical_slots');fields(manifest,['scope','original','candidate','publication'],'historical_slots');
 const resolved=resolveSuccessorPreparation({...Object.fromEntries(['scope','original','candidate'].map(k=>[k,manifest[k]])),namespace:node}),s=manifest.scope;
 if(s.accountId!==RELEASE_TARGET.accountId||s.namespaceId!==RELEASE_TARGET.namespaceId||s.applicationId!==RELEASE_TARGET.namespaceId||node.idFromName(ORIGINAL).toString()!==manifest.original.containerId)fail('historical_slots');
 const publication=fields(manifest.publication,['artifactKey','workerHash','activationKey'],'historical_slots');if(Object.values(publication).some(x=>!hex(x)))fail('historical_slots');
 canonical(bindings.eventsPolicy,4096,'historical_slots');const event=parseDossierEventPolicyFields(bindings.eventsPolicy,true);event.containerId=resolved.candidate.containerId;
 const context={clientId:get('AFW_OAUTH_PILOT_CLIENT_ID'),projectId:get('AFW_OAUTH_PILOT_PROJECT_ID'),resource:get('AFW_OAUTH_RESOURCE'),issuer:get('AFW_OAUTH_ISSUER')};validateDossierEventPolicyData(event,context);
 if(event.resource!==s.resource||event.startAt!==manifest.candidate.startAt||event.expiresAt!==manifest.candidate.expiresAt||hash(event.grantId)!==historical.grantIdHash||hash(manifest.candidate.trialId)!==historical.trialIdHash)fail('historical_slots');
 canonical(bindings.retirementPolicy,4096,'historical_slots');
 const retired=parseDossierRetirementFields(bindings.retirementPolicy),retirement=parseDossierEventPolicyFields(json(retired.policy),false);
 validateDossierEventPolicyData(retirement,context); // Target is the policy's explicit container, not forced Q/M.
 return{...p,artifact,bindings,manifest,resolved,event};
}
function legacy(rows,v,at){
 if(rows[3]!==undefined||rows[4]!==undefined)fail('legacy');
 const c=fields(own(rows[0],65536),['purpose','planHash','policy','armedAt','withdrawnAt'],'legacy'),p=fields(own(rows[1],65536),['purpose','planHash','withdrawalHash','phase','issuedAt','completedAt','dispatchPolicyHash'],'legacy'),r=fields(own(rows[2],65536),['purpose','planHash','withdrawalHash','phase','issuedAt','completedAt'],'legacy');
 const raw=[json(c),json(p),json(r)],hashes=raw.map(hash),closure=parseCanaryRestorationPolicy(c.policy);
 if(Buffer.byteLength(json(raw))>65536||c.purpose!==KEYS[0]||hashes[0]!==historical.controlHash||c.planHash!==historical.closurePolicyHash||hash(c.policy)!==c.planHash||hashes[1]!==historical.journalHashes.preparedDispatch||hashes[2]!==historical.journalHashes.reductionDispatch||!time(c.armedAt)||!time(c.withdrawnAt)||c.armedAt<closure.startAt-600000||c.armedAt>=closure.expiresAt||c.withdrawnAt<c.armedAt||c.withdrawnAt>at||closure.expiresAt>at)fail('legacy');
 if(p.purpose!==KEYS[1]||r.purpose!==KEYS[2]||p.phase!=='issued'||p.completedAt!==null||r.phase!=='complete'||!time(r.completedAt)||r.completedAt<r.issuedAt||r.completedAt>=closure.expiresAt||r.completedAt>at||p.dispatchPolicyHash!==historical.dispatchPolicyHash)fail('legacy');
 for(const j of [p,r])if(j.planHash!==c.planHash||j.withdrawalHash!==historical.withdrawalPolicyHash||!time(j.issuedAt)||j.issuedAt<c.armedAt||j.issuedAt>=closure.expiresAt||j.issuedAt>at)fail('legacy');
 const candidate={containerId:v.resolved.candidate.containerId,applicationId:RELEASE_TARGET.namespaceId,programHash:v.manifest.candidate.programHash,sourceRevision:v.manifest.candidate.sourceRevision};
 if(json(closure.candidate)!==json(candidate))fail('legacy');
 return{control:raw[0],preparedDispatch:raw[1],reductionDispatch:raw[2],restoration:null,retirement:null,controlHash:hashes[0],preparedDispatchHash:hashes[1],reductionDispatchHash:hashes[2]};
}
// One bounded statement preserves GLOBAL inventory discrepancy before decoding.
// LEFT joins do not hide malformed/missing/foreign closures. Original selectors
// originate only in the fixed qualified private metadata, never caller arguments.
const SQL=String.raw`WITH original AS (
 SELECT * FROM dossier_node_process_admissions WHERE container_id=? AND program_hash=? AND source_revision=? AND user_id=? AND project_id=? AND client_id=? AND resource=?
), counts AS (SELECT (SELECT COUNT(*) FROM dossier_node_process_admissions) admissionCount,(SELECT COUNT(*) FROM dossier_node_process_closures) closureCount,(SELECT COUNT(*) FROM dossier_node_process_closures WHERE process_generation IS NOT NULL) processClosureCount)
SELECT counts.*,CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER) dbNow,
json_object('grantId',a.grant_id,'subject',a.user_id,'projectId',a.project_id,'clientId',a.client_id,'resource',a.resource,'containerId',a.container_id,'processGeneration',a.process_generation,'programHash',a.program_hash,'sourceRevision',a.source_revision,'image',a.image,'createdAt',a.created_at,'expiresAt',a.expires_at,'consentExpiresAt',a.consent_expires_at,'consentSequence',a.consent_sequence,'consentIssuedAt',a.consent_issued_at) admission,
json_object('grantId',z.grant_id,'containerId',z.container_id,'processGeneration',z.process_generation,'programHash',z.program_hash,'sourceRevision',z.source_revision,'image',z.image,'closedAt',z.closed_at) closure,
json_object('grantId',g.id,'subject',g.user_id,'projectId',g.project_id,'clientId',g.client_id,'resource',g.resource,'scopes',g.scopes_json,'createdAt',g.created_at,'expiresAt',g.expires_at,'revokedAt',g.revoked_at,'exchangedAt',g.exchanged_at) grantData,
json_object('sequence',m.sequence,'revision',m.revision,'grantId',m.grant_id,'subject',m.user_id,'projectId',m.project_id,'clientId',m.client_id,'resource',m.resource,'action',m.action,'purpose',m.purpose,'issuedAt',m.issued_at,'expiresAt',m.expires_at) monitor,
json_object('sequence',e.sequence,'revision',e.revision,'grantId',e.grant_id,'subject',e.user_id,'projectId',e.project_id,'clientId',e.client_id,'resource',e.resource,'action',e.action,'purpose',e.purpose,'issuedAt',e.issued_at,'expiresAt',e.expires_at) earlier,
(SELECT COUNT(*) FROM dossier_node_process_admissions WHERE grant_id=z.grant_id) grantAdmissionCount,
(SELECT COUNT(*) FROM site_projects WHERE id=a.project_id AND user_id=a.user_id) ownedProject
FROM counts LEFT JOIN original a ON 1=1 LEFT JOIN dossier_node_process_closures z ON 1=1
LEFT JOIN delegated_access_grants g ON g.id=z.grant_id
LEFT JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id AND m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)
LEFT JOIN dossier_monitoring_consent_events e ON e.grant_id=g.id AND e.sequence=(SELECT MIN(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='grant' AND sequence<m.sequence)
ORDER BY z.grant_id LIMIT 10`;
const admissionKeys=['grantId','subject','projectId','clientId','resource','containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt','consentExpiresAt','consentSequence','consentIssuedAt'];
const closureKeys=['grantId','containerId','processGeneration','programHash','sourceRevision','image','closedAt'],scopeKeys=['subject','projectId','clientId','resource'];
const grantKeys=['grantId',...scopeKeys,'scopes','createdAt','expiresAt','revokedAt','exchangedAt'];
const monitorKeys=['sequence','revision','grantId',...scopeKeys,'action','purpose','issuedAt','expiresAt'];
const iso=x=>typeof x==='string'&&time(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
function history(rows,v,at){
 if(!Array.isArray(rows)||rows.length<2||rows.length>9||Buffer.byteLength(json(rows))>65536)fail('history');
 const a=fields(JSON.parse(rows[0].admission),admissionKeys,'history'),o=v.manifest.original,e=v.event;
 if(!id(a.grantId)||!hex(a.processGeneration)||a.image!=='cloudflare/debian-trixie'||['containerId','programHash','sourceRevision'].some(k=>a[k]!==o[k])||scopeKeys.some(k=>a[k]!==e[k])||!time(a.createdAt)||!time(a.expiresAt)||!time(a.consentExpiresAt)||!time(a.consentIssuedAt)||!positive(a.consentSequence)||a.createdAt>=a.expiresAt||a.expiresAt-a.createdAt>600000||a.consentIssuedAt>a.createdAt||a.consentExpiresAt<a.expiresAt)fail('history');
 const cancellations=[],seen=new Set();let originalClosure;
 for(const row of rows){
  fields(row,['admissionCount','closureCount','processClosureCount','dbNow','admission','closure','grantData','monitor','earlier','grantAdmissionCount','ownedProject'],'history');
  if(row.admissionCount!==1||row.closureCount!==rows.length||row.processClosureCount!==1||row.ownedProject!==1||row.admission!==rows[0].admission||!time(row.dbNow)||Math.abs(row.dbNow-at)>5000||a.expiresAt>Math.min(row.dbNow,at)||a.consentExpiresAt>Math.min(row.dbNow,at))fail('history');
  const z=fields(JSON.parse(row.closure),closureKeys,'history');
  if(!id(z.grantId)||seen.has(z.grantId)||!['containerId','programHash'].every(k=>hex(z[k]))||!hex(z.sourceRevision,40)||z.image!=='cloudflare/debian-trixie'||!time(z.closedAt)||z.closedAt>Math.min(row.dbNow,at))fail('history');seen.add(z.grantId);
  if(z.processGeneration!==null){
   if(originalClosure||row.grantAdmissionCount!==1||['grantId','containerId','processGeneration','programHash','sourceRevision','image'].some(k=>z[k]!==a[k])||z.closedAt<a.createdAt)fail('history');originalClosure=z;continue;
  }
  if(row.grantAdmissionCount!==0||z.grantId===a.grantId)fail('history');
  const g=fields(JSON.parse(row.grantData),grantKeys,'history'),m=fields(JSON.parse(row.monitor),monitorKeys,'history'),earlier=fields(JSON.parse(row.earlier),monitorKeys,'history');
  if(g.grantId!==z.grantId||scopeKeys.some(k=>g[k]!==a[k])||json(JSON.parse(g.scopes))!==json(['afw:project:read'])||!['createdAt','expiresAt','revokedAt','exchangedAt'].every(k=>iso(g[k]))||g.createdAt>g.exchangedAt||g.exchangedAt>=g.expiresAt||g.exchangedAt>g.revokedAt||Date.parse(g.expiresAt)>Math.min(row.dbNow,at)||Date.parse(g.revokedAt)>z.closedAt)fail('history');
  for(const mon of [m,earlier])if(mon.grantId!==z.grantId||scopeKeys.some(k=>mon[k]!==a[k])||!positive(mon.sequence)||!positive(mon.revision)||mon.purpose!=='afw.dossier-monitoring.v1'||!time(mon.issuedAt)||!time(mon.expiresAt))fail('history');
  if(m.action!=='revoke'||m.issuedAt!==m.expiresAt||m.issuedAt>z.closedAt||earlier.action!=='grant'||earlier.sequence>=m.sequence||earlier.expiresAt<=earlier.issuedAt||earlier.expiresAt-earlier.issuedAt>600000||earlier.issuedAt>m.issuedAt)fail('history');
  if(z.grantId===e.grantId&&['containerId','programHash','sourceRevision'].some(k=>z[k]!==v.resolved.candidate[k]))fail('history');
  cancellations.push({grantId:z.grantId,containerId:z.containerId,programHash:z.programHash,sourceRevision:z.sourceRevision,image:z.image,closedAt:z.closedAt,revokedAt:g.revokedAt,monitorSequence:m.sequence,monitorRevision:m.revision,monitorRevokedAt:m.issuedAt});
 }
 if(!originalClosure||!cancellations.some(z=>z.grantId===e.grantId)||cancellations.length<1||cancellations.length>8)fail('history');
 return{originalAdmission:Object.fromEntries(admissionKeys.filter(k=>!['consentSequence','consentIssuedAt'].includes(k)).map(k=>[k,a[k]])),originalClosure,cancellations};
}
/** PRIVATE READ-ONLY factual producer. No native code/custody-policy identity,
 * permission, effect admission or physical settlement authority. Unmounted. */
export async function readPrivateQaFiniteHistoricalSource(options,originalLease){
 let gate='input',finished=false,effectiveExpiry=CEILING,controller,timer,onAbort;
 try{
  if(arguments.length!==2)fail(gate);fields(options,['ctx','env']);fields(originalLease,['signal','assertCurrent']);
  const {ctx,env}=options,{signal,assertCurrent}=originalLease;
  if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function')fail(gate);
  const storage=ctx?.storage,transaction=storage?.transaction,actor=ctx?.id,toString=actor?.toString,db=env?.RELEASE_DB,prepare=db?.prepare,withSession=db?.withSession,node=env?.AFW_RELEASE_EVENTS_NODE,self=env?.AFW_INDEPENDENT_CLOSURE,metadata=env?.AFW_QA_VERSION,versionId=metadata?.id,credential=env?.AFW_MCP_CLOSURE_READ_TOKEN,fetcher=globalThis.fetch;
  const nodeName=node?.idFromName,nodeString=node?.idFromString,selfName=self?.idFromName;
  if([transaction,toString,prepare,withSession,nodeName,nodeString,selfName,fetcher].some(f=>typeof f!=='function')||!uuid(versionId)||typeof credential!=='string'||credential.length<1||credential.length>8192||/[^\x21-\x7e]/.test(credential))fail(gate);
  const actorId=Reflect.apply(toString,actor,[]);if(!hex(actorId)||self.idFromName(SLOT).toString()!==actorId)fail(gate);
  const entered=Date.now(),origin=performance.now();let lastWall=entered,lastMono=origin;
  controller=new AbortController();onAbort=()=>controller.abort();signal.addEventListener('abort',onAbort,{once:true});if(signal.aborted)onAbort();
  // This ceiling only narrows; the parent's original deadline is checked at
  // every boundary and its abort wins. No forwarded clock is manufactured.
  timer=setTimeout(onAbort,30000);
  const check=()=>{
   if(finished||signal.aborted||controller.signal.aborted)fail('deadline');assertCurrent();
   const at=Date.now(),mono=performance.now();if(!time(at)||at<lastWall||at-entered>=30000||at>=effectiveExpiry||!Number.isFinite(mono)||mono<lastMono||mono-origin>=30000)fail('deadline');lastWall=at;lastMono=mono;
   if(options.ctx!==ctx||options.env!==env||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==selfName||env.AFW_QA_VERSION!==metadata||metadata.id!==versionId||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher||self.idFromName(SLOT).toString()!==actorId)fail('coherence');return at;
  };
  const child=async work=>{
   check();const start=Date.now(),mono=performance.now(),abort=new AbortController();let active=true,t,on;
   const current=()=>{check();if(!active||abort.signal.aborted||Date.now()-start>=5000||performance.now()-mono>=5000)fail('deadline');};
   const stopped=new Promise((_,reject)=>{on=()=>{active=false;abort.abort();reject(Error('Finite historical source unavailable:deadline'));};controller.signal.addEventListener('abort',on,{once:true});t=setTimeout(on,5000);});
   const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(()=>{current();return work(abort.signal,current);}));
   try{const value=await Promise.race([actual,stopped]);current();return value;}finally{active=false;clearTimeout(t);controller.signal.removeEventListener('abort',on);abort.abort();}
  };
  const request=(path,cap)=>child(async(childSignal,current)=>{
   let reader;try{
    const response=await fetcher(ROOT+path,{method:'GET',redirect:'manual',cache:'no-store',signal:childSignal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache'}});current();
    if(!(response instanceof Response)||response.status!==200||!response.body||!(response.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail('http');
    const date=Date.parse(response.headers.get('date')??''),length=response.headers.get('content-length');if(!time(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail('http');
    reader=response.body.getReader();let size=0;const chunks=[];for(;;){current();const r=await reader.read();current();if(r.done)break;if(!(r.value instanceof Uint8Array)||(size+=r.value.byteLength)>cap)fail('http');chunks.push(r.value);}
    const body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));current();
    fields(body,['success','errors','messages','result',...Object.hasOwn(body,'result_info')?['result_info']:[]],'http');
    if(body.success!==true||!Array.isArray(body.errors)||body.errors.length||!Array.isArray(body.messages)||body.messages.length>16)fail('http');
    for(const message of body.messages){fields(message,['code','message',...Object.hasOwn(message,'type')?['type']:[]],'http');if(!Number.isSafeInteger(message.code)||typeof message.message!=='string'||message.message.length>4096||message.type!==undefined&&message.type!==null&&typeof message.type!=='string')fail('http');}
    return body.result;
   }finally{if(reader){const cancel=reader.cancel();retainFiniteOwnerStagePromise(cancel).catch(()=>{});}}
  });
  check();gate='custody';
  const token=await request('/tokens/verify',8192);check();fields(token,['id','status','expires_on',...Object.hasOwn(token,'not_before')?['not_before']:[]],'custody');
  const expiry=Date.parse(token.expires_on);if(token.id!==TOKEN||token.status!=='active'||!time(expiry)||expiry<=Date.now()||token.not_before!=null&&(!time(Date.parse(token.not_before))||Date.parse(token.not_before)>Date.now()))fail('custody');effectiveExpiry=Math.min(expiry,CEILING);check();
  gate='metadata';const path='/workers/workers/'+WORKER+'/versions/'+VERSION+'?include=modules',first=version(await request(path,3145728),node);check();
  const snapshot=()=>child(async(_signal,current)=>{
   const operation=Reflect.apply(transaction,storage,[async tx=>{
    const get=tx?.get;if(typeof get!=='function')fail('legacy');const rows=[];
    for(const key of KEYS){current();if(tx.get!==get)fail('coherence');const value=await tx.get(key);current();rows.push(value===undefined?undefined:own(value,65536));}
    return legacy(rows,first,check());
   }]);const rows=await retainFiniteOwnerStagePromise(operation);current();return rows;
  });
  gate='legacy';const originalLegacy=await snapshot();check();
  const query=()=>child(async(_signal,current)=>{
   const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;if(typeof method!=='function')fail('history');
   const statement=Reflect.apply(method,session,[SQL]),bind=statement?.bind;if(typeof bind!=='function')fail('history');
   const o=first.manifest.original,e=first.event,bound=Reflect.apply(bind,statement,[o.containerId,o.programHash,o.sourceRevision,e.subject,e.projectId,e.clientId,e.resource]),all=bound?.all;if(typeof all!=='function')fail('history');
   const result=await retainFiniteOwnerStagePromise(Reflect.apply(all,bound,[]));current();
   if(session.prepare!==method||statement.bind!==bind||bound.all!==all||result?.success!==true)fail('history');
   const rows=own(result.results,65536),value=history(rows,first,check());
   return{value,coherence:json(rows.map(({dbNow:unused,...r})=>{void unused;return r;}))};
  });
  gate='history';const h1=await query(),h2=await query();check();if(h1.coherence!==h2.coherence)fail('coherence');
  gate='legacy';if(json(await snapshot())!==json(originalLegacy))fail('coherence');check();
  gate='metadata';const last=version(await request(path,3145728),node);check();
  if(json(first.metadataProof)!==json(last.metadataProof)||json(first.configuration)!==json(last.configuration)||first.artifact.script!==last.artifact.script)fail('coherence');
  const result={purpose:'afw.finite-historical-source.v1',artifact:first.artifact,receipt,configuration:first.configuration,metadataProof:first.metadataProof,bindings:first.bindings,legacy:originalLegacy,history:h1.value,observedAt:check(),sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,operationalReadiness:false};
  const {script,...identity}=result.artifact,metadataBytes=Buffer.byteLength(json({...result,artifact:identity}));
  if(metadataBytes>131072||Buffer.byteLength(script)+metadataBytes>2097152)fail('metadata');
  freeze(result);check();return result;
 }catch(error){const match=/^Finite historical source unavailable:(input|custody|http|metadata|historical_slots|legacy|history|coherence|deadline)$/.exec(error?.message??'');fail(match?.[1]??gate);}
 finally{finished=true;clearTimeout(timer);originalLease?.signal?.removeEventListener('abort',onAbort);controller?.abort();}
}
