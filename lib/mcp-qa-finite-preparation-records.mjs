import {createHash} from 'node:crypto';
import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
import {validatePrivateQaFiniteLegacy} from './mcp-qa-finite-trial-control.mjs';
import {activationConfigurationHash} from './mcp-activation-observer.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
// Private factual data only. No authenticated source capability is reconstructed.
const fail=()=>{throw Error('Finite preparation record unavailable');};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const id=v=>typeof v==='string'&&v.length>0&&v.length<=200&&!/[\u0000-\u001f\u007f]/.test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const positive=v=>Number.isSafeInteger(v)&&v>0;
const goal=v=>['discovery','content'].includes(v);
const stage=v=>['connection','notices','finite'].includes(v);
const effect=v=>['upload','activation'].includes(v);
const canonical=v=>JSON.stringify(v);
const digest=(domain,v)=>createHash('sha256').update(domain+'\n'+canonical(v)).digest('hex');
function copy(v,depth=0,b={nodes:0,bytes:0}){
 if(++b.nodes>8192||depth>24)fail();
 if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
 if(typeof v==='string'){b.bytes+=Buffer.byteLength(v);if(b.bytes>65536)fail();return v;}
 const array=Array.isArray(v);
 if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
 const keys=Reflect.ownKeys(v);
 if(array&&(keys.length!==v.length+1||v.length>1024))fail();
 const out=array?[]:{};
 for(const k of keys.filter(k=>!(array&&k==='length')).sort()){
  const d=Object.getOwnPropertyDescriptor(v,k);
  if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();
  out[k]=copy(d.value,depth+1,b);
 }return Object.freeze(out);
}
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Object.keys(v).length!==keys.length||keys.some(k=>!Object.hasOwn(v,k)))fail();return v;}
const check=(condition)=>{if(!condition)fail();};
function owner(v){fields(v,['subject','accessRealmHash','accessVerifiedAt','accessExpiresAt']);check(id(v.subject)&&hex(v.accessRealmHash)&&time(v.accessVerifiedAt)&&time(v.accessExpiresAt)&&v.accessVerifiedAt<v.accessExpiresAt);}
function project(v){fields(v,['projectId','revision','synthetic']);check(id(v.projectId)&&positive(v.revision)&&v.synthetic===true);}
export function hashFiniteOwnerPreparationProject(value){const p=copy(value);project(p);return digest('afw.finite-owner-project.v1',p);}
function connection(v){fields(v,['connectionRef','grantId','clientId','resource','grantHash','consentHash','noticesHash','permissionExpiresAt']);check(hex(v.connectionRef)&&id(v.grantId)&&id(v.clientId)&&id(v.resource)&&['grantHash','consentHash','noticesHash'].every(k=>hex(v[k]))&&time(v.permissionExpiresAt));}
function approval(v){fields(v,['purpose','decision','sourceRevision','projectHash','goal','approvedAt','expiresAt','csrfReceiptHash']);check(v.purpose==='afw.own-synthetic-policy-preparation.v1'&&v.decision==='approve'&&hex(v.sourceRevision,40)&&hex(v.projectHash)&&goal(v.goal)&&time(v.approvedAt)&&time(v.expiresAt)&&v.approvedAt<v.expiresAt&&hex(v.csrfReceiptHash));}
/** Strict factual source grammar. Only the fixed unavailable source producer may qualify it. */
export function validateFiniteOwnerSource(value){
 const v=copy(value);
 fields(v,['sourceRevision','actorId','qaNamespaceId','qaVersionId','origin','phase','access','clientId','resource','project','goal','programContext','initialBaseline','currentPublication','window']);
 check(hex(v.sourceRevision,40)&&hex(v.actorId)&&hex(v.qaNamespaceId,32)&&uuid(v.qaVersionId)&&v.origin==='https://delegated-canary.agentfriendlyweb.dev'&&v.resource===v.origin+'/mcp'&&id(v.clientId)&&goal(v.goal));
 fields(v.access,['teamDomain','audience']);check(typeof v.access.teamDomain==='string'&&/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(v.access.teamDomain)&&id(v.access.audience));
 project(v.project);
 fields(v.programContext,['programHash','sourceRevision','originalContextHash']);check(hex(v.programContext.programHash)&&hex(v.programContext.sourceRevision,40)&&hex(v.programContext.originalContextHash));
 fields(v.initialBaseline,['versionId','deploymentId','moduleHash','configurationHash','bindingsHash']);check(uuid(v.initialBaseline.versionId)&&uuid(v.initialBaseline.deploymentId)&&['moduleHash','configurationHash','bindingsHash'].every(k=>hex(v.initialBaseline[k])));
 fields(v.currentPublication,['stage','versionId','deploymentId','receiptHash']);
 const phases={closed_ui:null,read_consent:'connection',notice_consent:'notices',finite_prearm:'finite'},c=v.currentPublication;
 check(Object.hasOwn(phases,v.phase)&&c.stage===phases[v.phase]&&uuid(c.versionId)&&uuid(c.deploymentId));
 check(c.stage===null?c.receiptHash===null&&c.versionId===v.initialBaseline.versionId&&c.deploymentId===v.initialBaseline.deploymentId:hex(c.receiptHash));
 fields(v.window,['startedAt','expiresAt']);check(time(v.window.startedAt)&&time(v.window.expiresAt)&&v.window.startedAt<v.window.expiresAt&&v.window.expiresAt-v.window.startedAt<=900000);
 return v;
}
const definitions={
 ProjectRef:['afw.finite-project-ref.v1','projectRef preconnectionId subjectHash sourceRevision projectId revision issuedAt expiresAt',null,8192,false],
 AuthorizationLink:['afw.finite-authorization-link.v1','preconnectionId authorizationHash subjectHash sourceRevision projectRef clientId resource issuedAt expiresAt',null,8192,false],
 OwnerSourceSnapshot:['afw.finite-owner-choice.v1','preconnectionId initialTicketHash source sourceHash','sourceHash',16384,false],
 Preconnection:['afw.finite-connection-preparation.v1','preconnectionId sourceRevision actorId owner project clientId resource startedAt expiresAt approvalHash baselineHash recordHash','recordHash',16384],
 ConfigurationApproval:['afw.finite-connection-approval.v1','subjectHash sourceRevision projectHash clientId approvedAt expiresAt csrfReceiptHash'],
 OwnerPreparation:['afw.finite-owner-preparation.v1','prepId sourceRevision actorId selectedAt expiresAt commandBy owner connection project goal programContext approval auditHash preparationHash','preparationHash',16384],
 Selection:['afw.finite-owner-selection.v1','sourceRevision prepId preparationHash selectedAt sequence previousSelectionHash selectionHash','selectionHash'],
 Binding:['afw.finite-owner-binding.v1','prepId preparationHash selectionHash intentId sourceRevision T0 boundAt'],
 GrantLink:['afw.finite-grant-link.v1','preconnectionId authorizationHash grantId grantHash acceptedAt',null,8192,false],
 NoticeLink:['afw.finite-notice-link.v1','preconnectionId grantHash eventHash sequence acceptedAt',null,8192,false],
 ConnectionRef:['afw.finite-connection-ref.v1','connectionRef subject grantId clientId projectId resource issuedAt expiresAt',null,8192,false],
 Ticket:['afw.finite-owner-ticket.v1','ticketHash subjectHash sourceRevision projectRef connectionRef preconnectionId action createdAt expiresAt'],
 TicketUse:['afw.finite-owner-ticket-use.v1','ticketHash recordHash consumedAt'],
 SetupContext:['afw.finite-policy-context.v1','intentId sourceRevision seedHash preparationHash selectionHash bindingHash T0 C0 C1 ownerPreparation baselineProjectRevision goal saveIdempotencyKey legacy policies baseline rollback expectedFull',null,65536],
 ConnectionSend:['afw.finite-connection-send.v1','preconnectionId sourceRevision stage contextHash effect baselineVersionId baselineDeploymentId requestHash issuedAt deadline'],
 ConnectionAck:['afw.finite-connection-ack.v1','sendHash resourceId acknowledgedAt'],
 ConnectionReceipt:['afw.finite-connection-installed.v1','preconnectionId sourceRevision stage baselineVersionId baselineDeploymentId versionId deploymentId moduleHash configurationHash completedAt receiptHash','receiptHash'],
 PolicySend:['afw.finite-policy-send.v1','intentId sourceRevision setupInstanceId contextHash effect requestHash issuedAt deadline'],
 PolicyAck:['afw.finite-policy-ack.v1','sendHash resourceId acknowledgedAt'],
 PolicyReceipt:['afw.finite-policy-installed.v1','intentId sourceRevision setupInstanceId qaVersionId seedHash contextHash baselineVersionId baselineDeploymentId versionId deploymentId moduleHash publicStaticHash activationHash restorationHash bindingsHash installedAt receiptHash','receiptHash',8192],
 Failure:['afw.finite-policy-failure.v1','identityHash reasonCode observedAt']
};
function shape(kind,input,hashing=false){
 if(typeof kind!=='string'||!Object.hasOwn(definitions,kind))fail();
 const [purpose,names,self,max=8192,hasPurpose=true]=definitions[kind],v=copy(input),keys=names.split(' ');
 if(hasPurpose)keys.unshift('purpose');
 if(hashing&&self&&!Object.hasOwn(v,self))keys.splice(keys.indexOf(self),1);
 fields(v,keys);if(hasPurpose&&v.purpose!==purpose)fail();
 if(Buffer.byteLength(canonical(v))>max)fail();
 for(const [k,x]of Object.entries(v)){
  if(k==='sourceRevision')check(hex(x,40));
  if(k.endsWith('Hash')&&k!=='previousSelectionHash')check(hex(x));
  if(['preconnectionId','prepId','actorId','projectRef','connectionRef'].includes(k))check(k==='connectionRef'&&kind==='Ticket'&&x===null||hex(x));
  if(['intentId','setupInstanceId','subject','grantId','clientId','projectId','resource'].includes(k))check(id(x));
  if(['createdAt','expiresAt','startedAt','approvedAt','selectedAt','commandBy','T0','C0','C1','boundAt','acceptedAt','consumedAt','issuedAt','deadline','acknowledgedAt','completedAt','installedAt','observedAt'].includes(k))check(time(x));
  if(['baselineVersionId','baselineDeploymentId','versionId','deploymentId','qaVersionId','resourceId','saveIdempotencyKey'].includes(k))check(uuid(x));
  if(k==='stage')check(stage(x));if(k==='effect')check(effect(x));
 }
 if(kind==='OwnerSourceSnapshot'){const s=validateFiniteOwnerSource(v.source);check(s.phase==='closed_ui');}
 if(kind==='ProjectRef'||kind==='AuthorizationLink')check(v.issuedAt<v.expiresAt&&v.expiresAt-v.issuedAt<=900000);
 if(kind==='ProjectRef')check(positive(v.revision));
 if(kind==='Preconnection'){
  owner(v.owner);project(v.project);check(v.startedAt<v.expiresAt&&v.expiresAt-v.startedAt<=900000&&v.owner.accessVerifiedAt<=v.startedAt&&v.expiresAt<=v.owner.accessExpiresAt);
 }
 if(kind==='ConfigurationApproval')check(v.approvedAt<v.expiresAt&&v.expiresAt-v.approvedAt<=900000);
 if(kind==='OwnerPreparation'){
  owner(v.owner);project(v.project);connection(v.connection);approval(v.approval);fields(v.programContext,['programHash','sourceRevision','originalContextHash']);
  check(goal(v.goal)&&v.selectedAt<v.commandBy&&v.commandBy<=v.expiresAt&&v.commandBy+510000<=Math.min(v.expiresAt,v.owner.accessExpiresAt,v.connection.permissionExpiresAt,v.approval.expiresAt)&&v.owner.accessVerifiedAt<=v.selectedAt&&v.approval.approvedAt<=v.selectedAt&&v.approval.sourceRevision===v.sourceRevision&&v.approval.goal===v.goal&&v.approval.projectHash===hashFiniteOwnerPreparationProject(v.project)&&hex(v.programContext.programHash)&&hex(v.programContext.originalContextHash)&&hex(v.programContext.sourceRevision,40));
 }
 if(kind==='Selection')check(positive(v.sequence)&&(v.sequence===1?v.previousSelectionHash===null:hex(v.previousSelectionHash)));
 if(kind==='Binding')check(v.boundAt>=v.T0);
 if(kind==='NoticeLink')check(positive(v.sequence));
 if(kind==='ConnectionRef')check(v.issuedAt<v.expiresAt);
 if(kind==='Ticket')check(['connection','notices','finite'].includes(v.action)&&v.createdAt<v.expiresAt&&v.expiresAt-v.createdAt<=900000&&(v.connectionRef!==null||v.action==='connection'));
 if(kind==='ConnectionSend'||kind==='PolicySend')check(v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=30000);
 if(kind==='Failure')check(['validation','claim_uncertain','provider_uncertain','deadline','conflict'].includes(v.reasonCode));
 if(kind==='SetupContext'){
  shape('OwnerPreparation',v.ownerPreparation);check(v.ownerPreparation.preparationHash===v.preparationHash&&v.ownerPreparation.sourceRevision===v.sourceRevision&&v.ownerPreparation.goal===v.goal&&v.baselineProjectRevision===v.ownerPreparation.project.revision&&v.C0===v.T0+240000&&v.C1===v.T0+420000&&v.ownerPreparation.selectedAt<=v.T0&&v.T0<v.ownerPreparation.commandBy);
  validatePrivateQaFiniteLegacy({legacy:v.legacy,T0:v.T0});
  const slots=['AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY','AFW_DOSSIER_RETIREMENT_POLICY','AFW_DOSSIER_SUCCESSOR_POLICY','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID'];
  fields(v.policies,slots);check(slots.every(k=>typeof v.policies[k]==='string'&&v.policies[k].length>0));
  for(const p of [v.baseline,v.rollback]){fields(p,['versionId','deploymentId','module','configuration']);check(uuid(p.versionId)&&uuid(p.deploymentId));validateFiniteModule(p.module);activationConfigurationHash(p.configuration);restorationConfigurationHash(p.configuration);}
  fields(v.expectedFull,['activationHash','restorationHash','bindingsHash']);check(Object.values(v.expectedFull).every(x=>hex(x)));
 }
 if(self&&!hashing)check(v[self]===recordHash(kind,v));
 return v;
}
function recordHash(kind,v){const [domain,,self]=definitions[kind],body=Object.fromEntries(Object.entries(v).filter(([k])=>k!==self));return digest(domain,body);}
/** Fixed enum codecs, digests and identities are facts, never authorization. */
export function hashFinitePreparationRecord(kind,value){return recordHash(kind,shape(kind,value,true));}
export function encodeFinitePreparationRecord(kind,value){return canonical(shape(kind,value));}
export function decodeFinitePreparationRecord(kind,text){
 if(typeof text!=='string'||Buffer.byteLength(text)>65536)fail();
 const v=shape(kind,JSON.parse(text));if(canonical(v)!==text)fail();return v;
}
export function validateFinitePolicyEffectIdentity(value){
 const v=copy(value);fields(v,v.kind==='connection'?['kind','preconnectionId','sourceRevision','stage','effect']:['kind','intentId','sourceRevision','setupInstanceId','effect']);
 check(hex(v.sourceRevision,40)&&effect(v.effect));
 if(v.kind==='connection')check(hex(v.preconnectionId)&&stage(v.stage));else check(v.kind==='policy'&&id(v.intentId)&&id(v.setupInstanceId));
 return v;
}
export function hashFinitePolicyEffectIdentity(value){return digest('afw.finite-policy-effect-identity.v1',validateFinitePolicyEffectIdentity(value));}

/** Fixed C2 correlation domains, never configurable or credential-bearing. */
export function hashFiniteOwnerEvidence(kind,value){
 const v=copy(value);
 const sets={
  realm:['afw.finite-access-realm.v1',['teamDomain','audience','origin']],
  subject:['afw.finite-access-subject.v1',['accessRealmHash','subject']],
  baseline:['afw.finite-preparation-baseline.v1',['versionId','deploymentId','moduleHash','configurationHash','bindingsHash']],
  decision:['afw.finite-preparation-decision.v1',['ticket','decision','projectHash','goal','clientId','approvedAt','expiresAt']],
  consent:['afw.finite-read-consent.v1',['handle_hash','user_id','kind','project_id','client_id','resource','scopes','expires_at','consumed_at']],
  event:['afw.finite-monitor-consent-event.v1',['grantId','projectId','subject','clientId','resource','revision','action','purpose','requestId','sequence','issuedAt','expiresAt']]
 };
 if(!Object.hasOwn(sets,kind))fail();const [domain,keys]=sets[kind];fields(v,keys);
 const iso=x=>typeof x==='string'&&time(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
 if(kind==='realm')check(typeof v.teamDomain==='string'&&/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(v.teamDomain)&&id(v.audience)&&v.origin==='https://delegated-canary.agentfriendlyweb.dev');
 if(kind==='subject')check(hex(v.accessRealmHash)&&id(v.subject));
 if(kind==='baseline')check(uuid(v.versionId)&&uuid(v.deploymentId)&&['moduleHash','configurationHash','bindingsHash'].every(k=>hex(v[k])));
 if(kind==='decision'){shape('Ticket',v.ticket);check(v.decision==='approve'&&hex(v.projectHash)&&goal(v.goal)&&id(v.clientId)&&time(v.approvedAt)&&time(v.expiresAt)&&v.approvedAt>=v.ticket.createdAt&&v.approvedAt<v.expiresAt&&v.expiresAt<=v.ticket.expiresAt);}
 if(kind==='consent')check(hex(v.handle_hash)&&['user_id','project_id','client_id','resource'].every(k=>id(v[k]))&&v.kind==='authorize'&&Array.isArray(v.scopes)&&v.scopes.length>0&&v.scopes.length<=2&&new Set(v.scopes).size===v.scopes.length&&v.scopes.includes('afw:project:read')&&v.scopes.every(x=>['afw:project:read','afw:evidence:read'].includes(x))&&iso(v.expires_at)&&iso(v.consumed_at)&&Date.parse(v.consumed_at)<Date.parse(v.expires_at));
 if(kind==='event')check(['grantId','projectId','subject','clientId','resource'].every(k=>id(v[k]))&&positive(v.revision)&&positive(v.sequence)&&v.action==='grant'&&v.purpose==='afw.dossier-monitoring.v1'&&uuid(v.requestId)&&time(v.issuedAt)&&time(v.expiresAt)&&v.issuedAt<v.expiresAt&&v.expiresAt-v.issuedAt<=600000);
 return digest(domain,v);
}
