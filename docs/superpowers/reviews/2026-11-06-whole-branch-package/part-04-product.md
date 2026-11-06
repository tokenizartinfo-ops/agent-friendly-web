# Whole-branch review packet 4/26 — product

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 24 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- lib/mcp-qa-finite-preparation-records.mjs: ABSENT -> e9b66f68b6dbabbfecc46072949a0d5d9f059141; full diff chars=18630
- lib/mcp-qa-finite-preparation-store.mjs: ABSENT -> 122bc0e52870c71da7ae98ef73cd7762171d89ca; full diff chars=21403
- lib/mcp-qa-finite-profile.mjs: ABSENT -> 547eb82f4ec83a2e7bcec88dd18622fc636dc477; full diff chars=17088
- lib/mcp-qa-finite-publication-bridge.mjs: ABSENT -> e302ff930f775c4aa1548ea8631363f2c66cca74; full diff chars=3965
- lib/mcp-qa-finite-publication.mjs: ABSENT -> 6a5572327bb48be9d5683074fa26a8c4abbe86ac; full diff chars=4067
- lib/mcp-qa-finite-seed-http.mjs: ABSENT -> 24072d6eb623a034fef9cf1540f42b40eaba0e41; full diff chars=2104
- lib/mcp-qa-finite-seed-issuer.mjs: ABSENT -> b6744c0748631e79b18b518a435fd2de96c9a6f8; full diff chars=6411
- lib/mcp-qa-finite-seed-primary.mjs: ABSENT -> 8439a5d211849e4b05d98f76a92782fa977e9772; full diff chars=6779
- lib/mcp-qa-finite-seed-wire.mjs: ABSENT -> 44b81e34b68e37604bd4937ec7bd052ae00ee818; full diff chars=4150
- lib/mcp-qa-finite-seed.mjs: ABSENT -> 644ab9fe7234950b92122daa0292c37f5ab83ec2; full diff chars=8796
- lib/mcp-qa-finite-source-authority.mjs: ABSENT -> c2d6947196755bcaf075f8a0fdb60762973d702b; full diff chars=603
- lib/mcp-qa-finite-source.mjs: ABSENT -> 4df75093247f243828229a84654f49733cf54217; full diff chars=675
- lib/mcp-qa-finite-stage-work.mjs: ABSENT -> a89baeb2578856dadedf700f9d66e180eb09120e; full diff chars=6910
- lib/mcp-qa-finite-trial-control.mjs: ABSENT -> 18996dc32972e3e33726b242e508d9635147a7e5; full diff chars=45484
- lib/mcp-qa-finite-trial-finalizer.mjs: ABSENT -> a2168330825f1733c9b75d134cb7772ca110a86f; full diff chars=5065
- lib/mcp-qa-finite-trial-guard.mjs: ABSENT -> 0e4a6f059c5e094409473f99fead676fcf92cd6d; full diff chars=14835
- scripts/build-finite-native-package.mjs: ABSENT -> e8a73ce9f541993657bf8bf4c9bd8d3b02b8598d; full diff chars=9213
- scripts/mcp-qa-finite-custody-receipt.json: ABSENT -> 6012e07fb3a518bfb2d18b62144067a22de02bef; full diff chars=1135
- scripts/qa-finite-pre-entry-custody-wrapper.mjs: ABSENT -> 6aaee20e696dec407c819abcdc6e951e3d2fc0c9; full diff chars=6161
- scripts/run-qa-finite-bootstrap.mjs: ABSENT -> e67e8fd7b3b530e852a520a0ea4b61e21d498d48; full diff chars=1482
- scripts/run-qa-finite-trial-finalizer.mjs: ABSENT -> 511dfbe56634b07f9fee5a37e226822d683420f7; full diff chars=7035
- scripts/verify-qa-finite-archive.py: ABSENT -> f9c2d1ad3fa47109fee54f670b4b35171767c4ea; full diff chars=6988
- worker/independent-closure/finite.mjs: ABSENT -> 1f1e5b95776b189fc8d952930467e6ff99c233c3; full diff chars=3888
- worker/mcp-own/finite.mjs: ABSENT -> 15441b6c0c779f733db65a3b59a3a9e1738d19dc; full diff chars=2932

## lib/mcp-qa-finite-preparation-records.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-records.mjs b/lib/mcp-qa-finite-preparation-records.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-records.mjs
@@ -0,0 +1,175 @@
+import {createHash} from 'node:crypto';
+import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
+import {validatePrivateQaFiniteLegacy} from './mcp-qa-finite-trial-control.mjs';
+import {activationConfigurationHash,finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
+import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
+// Private factual data only. No authenticated source capability is reconstructed.
+const fail=()=>{throw Error('Finite preparation record unavailable');};
+const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+const id=v=>typeof v==='string'&&v.length>0&&v.length<=200&&!/[\u0000-\u001f\u007f]/.test(v);
+const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
+const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
+const positive=v=>Number.isSafeInteger(v)&&v>0;
+const goal=v=>['discovery','content'].includes(v);
+const stage=v=>['connection','notices','finite'].includes(v);
+const effect=v=>['upload','activation'].includes(v);
+const canonical=v=>JSON.stringify(v);
+const digest=(domain,v)=>createHash('sha256').update(domain+'\n'+canonical(v)).digest('hex');
+function copy(v,depth=0,b={nodes:0,bytes:0}){
+ if(++b.nodes>8192||depth>24)fail();
+ if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
+ if(typeof v==='string'){b.bytes+=Buffer.byteLength(v);if(b.bytes>65536)fail();return v;}
+ const array=Array.isArray(v);
+ if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
+ const keys=Reflect.ownKeys(v);
+ if(array&&(keys.length!==v.length+1||v.length>1024))fail();
+ const out=array?[]:{};
+ for(const k of keys.filter(k=>!(array&&k==='length')).sort()){
+  const d=Object.getOwnPropertyDescriptor(v,k);
+  if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();
+  out[k]=copy(d.value,depth+1,b);
+ }return Object.freeze(out);
+}
+function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Object.keys(v).length!==keys.length||keys.some(k=>!Object.hasOwn(v,k)))fail();return v;}
+const check=(condition)=>{if(!condition)fail();};
+function owner(v){fields(v,['subject','accessRealmHash','accessVerifiedAt','accessExpiresAt']);check(id(v.subject)&&hex(v.accessRealmHash)&&time(v.accessVerifiedAt)&&time(v.accessExpiresAt)&&v.accessVerifiedAt<v.accessExpiresAt);}
+function project(v){fields(v,['projectId','revision','synthetic']);check(id(v.projectId)&&positive(v.revision)&&v.synthetic===true);}
+export function hashFiniteOwnerPreparationProject(value){const p=copy(value);project(p);return digest('afw.finite-owner-project.v1',p);}
+function connection(v){fields(v,['connectionRef','grantId','clientId','resource','grantHash','consentHash','noticesHash','permissionExpiresAt']);check(hex(v.connectionRef)&&id(v.grantId)&&id(v.clientId)&&id(v.resource)&&['grantHash','consentHash','noticesHash'].every(k=>hex(v[k]))&&time(v.permissionExpiresAt));}
+function approval(v){fields(v,['purpose','decision','sourceRevision','projectHash','goal','approvedAt','expiresAt','csrfReceiptHash']);check(v.purpose==='afw.own-synthetic-policy-preparation.v1'&&v.decision==='approve'&&hex(v.sourceRevision,40)&&hex(v.projectHash)&&goal(v.goal)&&time(v.approvedAt)&&time(v.expiresAt)&&v.approvedAt<v.expiresAt&&hex(v.csrfReceiptHash));}
+/** Strict factual source grammar. Only the fixed unavailable source producer may qualify it. */
+export function validateFiniteOwnerSource(value){
+ const v=copy(value);
+ fields(v,['sourceRevision','actorId','qaNamespaceId','qaVersionId','origin','phase','access','clientId','resource','project','goal','programContext','initialBaseline','currentPublication','window']);
+ check(hex(v.sourceRevision,40)&&hex(v.actorId)&&hex(v.qaNamespaceId,32)&&uuid(v.qaVersionId)&&v.origin==='https://delegated-canary.agentfriendlyweb.dev'&&v.resource===v.origin+'/mcp'&&id(v.clientId)&&goal(v.goal));
+ fields(v.access,['teamDomain','audience']);check(typeof v.access.teamDomain==='string'&&/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(v.access.teamDomain)&&id(v.access.audience));
+ project(v.project);
+ fields(v.programContext,['programHash','sourceRevision','originalContextHash']);check(hex(v.programContext.programHash)&&hex(v.programContext.sourceRevision,40)&&hex(v.programContext.originalContextHash));
+ fields(v.initialBaseline,['versionId','deploymentId','moduleHash','configurationHash','bindingsHash']);check(uuid(v.initialBaseline.versionId)&&uuid(v.initialBaseline.deploymentId)&&['moduleHash','configurationHash','bindingsHash'].every(k=>hex(v.initialBaseline[k])));
+ fields(v.currentPublication,['stage','versionId','deploymentId','receiptHash']);
+ const phases={closed_ui:null,read_consent:'connection',notice_consent:'notices',finite_prearm:'finite'},c=v.currentPublication;
+ check(Object.hasOwn(phases,v.phase)&&c.stage===phases[v.phase]&&uuid(c.versionId)&&uuid(c.deploymentId));
+ check(c.stage===null?c.receiptHash===null&&c.versionId===v.initialBaseline.versionId&&c.deploymentId===v.initialBaseline.deploymentId:hex(c.receiptHash));
+ fields(v.window,['startedAt','expiresAt']);check(time(v.window.startedAt)&&time(v.window.expiresAt)&&v.window.startedAt<v.window.expiresAt&&v.window.expiresAt-v.window.startedAt<=900000);
+ return v;
+}
+const definitions={
+ StageApproval:['afw.finite-connection-stage-approval.v1','preconnectionId sourceRevision stage ticketHash approvalHash'],
+ PreconnectionConnection:['afw.finite-preconnection-connection.v1','preconnectionId connectionRef grantHash linkedAt',null,8192,false],
+ ProjectRef:['afw.finite-project-ref.v1','projectRef preconnectionId subjectHash sourceRevision projectId revision issuedAt expiresAt',null,8192,false],
+ AuthorizationLink:['afw.finite-authorization-link.v1','preconnectionId authorizationHash subjectHash sourceRevision projectRef clientId resource issuedAt expiresAt',null,8192,false],
+ OwnerSourceSnapshot:['afw.finite-owner-choice.v1','preconnectionId initialTicketHash source sourceHash','sourceHash',16384,false],
+ Preconnection:['afw.finite-connection-preparation.v1','preconnectionId sourceRevision actorId owner project clientId resource startedAt expiresAt approvalHash baselineHash recordHash','recordHash',16384],
+ ConfigurationApproval:['afw.finite-connection-approval.v1','subjectHash sourceRevision projectHash clientId approvedAt expiresAt csrfReceiptHash'],
+ OwnerPreparation:['afw.finite-owner-preparation.v1','prepId sourceRevision actorId selectedAt expiresAt commandBy owner connection project goal programContext approval auditHash preparationHash','preparationHash',16384],
+ Selection:['afw.finite-owner-selection.v1','sourceRevision prepId preparationHash selectedAt sequence previousSelectionHash selectionHash','selectionHash'],
+ Binding:['afw.finite-owner-binding.v1','prepId preparationHash selectionHash intentId sourceRevision T0 boundAt'],
+ GrantLink:['afw.finite-grant-link.v1','preconnectionId authorizationHash grantId grantHash acceptedAt',null,8192,false],
+ NoticeLink:['afw.finite-notice-link.v1','preconnectionId grantHash eventHash sequence acceptedAt',null,8192,false],
+ ConnectionRef:['afw.finite-connection-ref.v1','connectionRef subject grantId clientId projectId resource issuedAt expiresAt',null,8192,false],
+ Ticket:['afw.finite-owner-ticket.v1','ticketHash subjectHash sourceRevision projectRef connectionRef preconnectionId action createdAt expiresAt'],
+ TicketUse:['afw.finite-owner-ticket-use.v1','ticketHash recordHash consumedAt'],
+ SetupContext:['afw.finite-policy-context.v1','intentId sourceRevision seedHash preparationHash selectionHash bindingHash T0 C0 C1 ownerPreparation baselineProjectRevision goal saveIdempotencyKey legacy policies baseline rollback expectedFull',null,65536],
+ ConnectionSend:['afw.finite-connection-send.v1','preconnectionId sourceRevision stage contextHash effect baselineVersionId baselineDeploymentId requestHash issuedAt deadline'],
+ ConnectionAck:['afw.finite-connection-ack.v1','sendHash resourceId acknowledgedAt'],
+ ConnectionReceipt:['afw.finite-connection-installed.v1','preconnectionId sourceRevision stage baselineVersionId baselineDeploymentId versionId deploymentId moduleHash configurationHash completedAt receiptHash','receiptHash'],
+ PolicySend:['afw.finite-policy-send.v1','intentId sourceRevision setupInstanceId contextHash effect requestHash issuedAt deadline'],
+ PolicyAck:['afw.finite-policy-ack.v1','sendHash resourceId acknowledgedAt'],
+ PolicyReceipt:['afw.finite-policy-installed.v1','intentId sourceRevision setupInstanceId qaVersionId seedHash contextHash baselineVersionId baselineDeploymentId versionId deploymentId moduleHash publicStaticHash activationHash restorationHash bindingsHash installedAt receiptHash','receiptHash',8192],
+ Failure:['afw.finite-policy-failure.v1','identityHash reasonCode observedAt']
+};
+function shape(kind,input,hashing=false){
+ if(typeof kind!=='string'||!Object.hasOwn(definitions,kind))fail();
+ const [purpose,names,self,max=8192,hasPurpose=true]=definitions[kind],v=copy(input),keys=names.split(' ');
+ if(hasPurpose)keys.unshift('purpose');
+ if(hashing&&self&&!Object.hasOwn(v,self))keys.splice(keys.indexOf(self),1);
+ fields(v,keys);if(hasPurpose&&v.purpose!==purpose)fail();
+ if(Buffer.byteLength(canonical(v))>max)fail();
+ for(const [k,x]of Object.entries(v)){
+  if(k==='sourceRevision')check(hex(x,40));
+  if(k.endsWith('Hash')&&k!=='previousSelectionHash')check(hex(x));
+  if(['preconnectionId','prepId','actorId','projectRef','connectionRef'].includes(k))check(k==='connectionRef'&&kind==='Ticket'&&x===null||hex(x));
+  if(['intentId','setupInstanceId','subject','grantId','clientId','projectId','resource'].includes(k))check(id(x));
+  if(['linkedAt','createdAt','expiresAt','startedAt','approvedAt','selectedAt','commandBy','T0','C0','C1','boundAt','acceptedAt','consumedAt','issuedAt','deadline','acknowledgedAt','completedAt','installedAt','observedAt'].includes(k))check(time(x));
+  if(['baselineVersionId','baselineDeploymentId','versionId','deploymentId','qaVersionId','resourceId','saveIdempotencyKey'].includes(k))check(uuid(x));
+  if(k==='stage')check(stage(x));if(k==='effect')check(effect(x));
+ }
+ if(kind==='OwnerSourceSnapshot'){const s=validateFiniteOwnerSource(v.source);check(s.phase==='closed_ui');}
+ if(kind==='ProjectRef'||kind==='AuthorizationLink')check(v.issuedAt<v.expiresAt&&v.expiresAt-v.issuedAt<=900000);
+ if(kind==='ProjectRef')check(positive(v.revision));
+ if(kind==='Preconnection'){
+  owner(v.owner);project(v.project);check(v.startedAt<v.expiresAt&&v.expiresAt-v.startedAt<=900000&&v.owner.accessVerifiedAt<=v.startedAt&&v.expiresAt<=v.owner.accessExpiresAt);
+ }
+ if(kind==='ConfigurationApproval')check(v.approvedAt<v.expiresAt&&v.expiresAt-v.approvedAt<=900000);
+ if(kind==='OwnerPreparation'){
+  owner(v.owner);project(v.project);connection(v.connection);approval(v.approval);fields(v.programContext,['programHash','sourceRevision','originalContextHash']);
+  check(goal(v.goal)&&v.selectedAt<v.commandBy&&v.commandBy<=v.expiresAt&&v.commandBy+510000<=Math.min(v.expiresAt,v.owner.accessExpiresAt,v.connection.permissionExpiresAt,v.approval.expiresAt)&&v.owner.accessVerifiedAt<=v.selectedAt&&v.approval.approvedAt<=v.selectedAt&&v.approval.sourceRevision===v.sourceRevision&&v.approval.goal===v.goal&&v.approval.projectHash===hashFiniteOwnerPreparationProject(v.project)&&hex(v.programContext.programHash)&&hex(v.programContext.originalContextHash)&&hex(v.programContext.sourceRevision,40));
+ }
+ if(kind==='Selection')check(positive(v.sequence)&&(v.sequence===1?v.previousSelectionHash===null:hex(v.previousSelectionHash)));
+ if(kind==='Binding')check(v.boundAt>=v.T0);
+ if(kind==='NoticeLink')check(positive(v.sequence));
+ if(kind==='ConnectionRef')check(v.issuedAt<v.expiresAt);
+ if(kind==='Ticket')check(['connection','notices','finite'].includes(v.action)&&v.createdAt<v.expiresAt&&v.expiresAt-v.createdAt<=900000&&(v.connectionRef!==null||v.action==='connection'));
+ if(kind==='ConnectionSend'||kind==='PolicySend')check(v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=30000);
+ if(kind==='Failure')check(['validation','claim_uncertain','provider_uncertain','deadline','conflict'].includes(v.reasonCode));
+ if(kind==='SetupContext'){
+  shape('OwnerPreparation',v.ownerPreparation);check(v.ownerPreparation.preparationHash===v.preparationHash&&v.ownerPreparation.sourceRevision===v.sourceRevision&&v.ownerPreparation.goal===v.goal&&v.baselineProjectRevision===v.ownerPreparation.project.revision&&v.C0===v.T0+240000&&v.C1===v.T0+420000&&v.ownerPreparation.selectedAt<=v.T0&&v.T0<v.ownerPreparation.commandBy);
+  validatePrivateQaFiniteLegacy({legacy:v.legacy,T0:v.T0});
+  const slots=['AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY','AFW_DOSSIER_RETIREMENT_POLICY','AFW_DOSSIER_SUCCESSOR_POLICY','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID'];
+  fields(v.policies,slots);check(slots.every(k=>typeof v.policies[k]==='string'&&v.policies[k].length>0));
+  for(const p of [v.baseline,v.rollback]){fields(p,['versionId','deploymentId','module','configuration']);check(uuid(p.versionId)&&uuid(p.deploymentId));validateFiniteModule(p.module);restorationConfigurationHash(p.configuration);}
+  finiteActivationConfigurationHash(v.baseline.configuration);activationConfigurationHash(v.rollback.configuration);
+  fields(v.expectedFull,['activationHash','restorationHash','bindingsHash']);check(Object.values(v.expectedFull).every(x=>hex(x)));
+ }
+ if(self&&!hashing)check(v[self]===recordHash(kind,v));
+ return v;
+}
+function recordHash(kind,v){const [domain,,self]=definitions[kind],body=Object.fromEntries(Object.entries(v).filter(([k])=>k!==self));return digest(domain,body);}
+/** Fixed enum codecs, digests and identities are facts, never authorization. */
+export function hashFinitePreparationRecord(kind,value){return recordHash(kind,shape(kind,value,true));}
+export function encodeFinitePreparationRecord(kind,value){return canonical(shape(kind,value));}
+export function decodeFinitePreparationRecord(kind,text){
+ if(typeof text!=='string'||Buffer.byteLength(text)>65536)fail();
+ const v=shape(kind,JSON.parse(text));if(canonical(v)!==text)fail();return v;
+}
+export function validateFinitePolicyEffectIdentity(value){
+ const v=copy(value);fields(v,v.kind==='connection'?['kind','preconnectionId','sourceRevision','stage','effect']:['kind','intentId','sourceRevision','setupInstanceId','effect']);
+ check(hex(v.sourceRevision,40)&&effect(v.effect));
+ if(v.kind==='connection')check(hex(v.preconnectionId)&&stage(v.stage));else check(v.kind==='policy'&&id(v.intentId)&&id(v.setupInstanceId));
+ return v;
+}
+export function hashFinitePolicyEffectIdentity(value){return digest('afw.finite-policy-effect-identity.v1',validateFinitePolicyEffectIdentity(value));}
+
+/** Fixed C2 correlation domains, never configurable or credential-bearing. */
+export function hashFiniteOwnerEvidence(kind,value){
+ const v=copy(value);
+ const sets={
+  realm:['afw.finite-access-realm.v1',['teamDomain','audience','origin']],
+  subject:['afw.finite-access-subject.v1',['accessRealmHash','subject']],
+  baseline:['afw.finite-preparation-baseline.v1',['versionId','deploymentId','moduleHash','configurationHash','bindingsHash']],
+  decision:['afw.finite-preparation-decision.v1',['ticket','decision','projectHash','goal','clientId','approvedAt','expiresAt']],
+  consent:['afw.finite-read-consent.v1',['handle_hash','user_id','kind','project_id','client_id','resource','scopes','expires_at','consumed_at']],
+  event:['afw.finite-monitor-consent-event.v1',['grantId','projectId','subject','clientId','resource','revision','action','purpose','requestId','sequence','issuedAt','expiresAt']]
+ };
+ if(!Object.hasOwn(sets,kind))fail();const [domain,keys]=sets[kind];fields(v,keys);
+ const iso=x=>typeof x==='string'&&time(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
+ if(kind==='realm')check(typeof v.teamDomain==='string'&&/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(v.teamDomain)&&id(v.audience)&&v.origin==='https://delegated-canary.agentfriendlyweb.dev');
+ if(kind==='subject')check(hex(v.accessRealmHash)&&id(v.subject));
+ if(kind==='baseline')check(uuid(v.versionId)&&uuid(v.deploymentId)&&['moduleHash','configurationHash','bindingsHash'].every(k=>hex(v[k])));
+ if(kind==='decision'){shape('Ticket',v.ticket);check(v.decision==='approve'&&hex(v.projectHash)&&goal(v.goal)&&id(v.clientId)&&time(v.approvedAt)&&time(v.expiresAt)&&v.approvedAt>=v.ticket.createdAt&&v.approvedAt<v.expiresAt&&v.expiresAt<=v.ticket.expiresAt);}
+ if(kind==='consent')check(hex(v.handle_hash)&&['user_id','project_id','client_id','resource'].every(k=>id(v[k]))&&v.kind==='authorize'&&Array.isArray(v.scopes)&&v.scopes.length>0&&v.scopes.length<=2&&new Set(v.scopes).size===v.scopes.length&&v.scopes.includes('afw:project:read')&&v.scopes.every(x=>['afw:project:read','afw:evidence:read'].includes(x))&&iso(v.expires_at)&&iso(v.consumed_at)&&Date.parse(v.consumed_at)<Date.parse(v.expires_at));
+ if(kind==='event')check(['grantId','projectId','subject','clientId','resource'].every(k=>id(v[k]))&&positive(v.revision)&&positive(v.sequence)&&v.action==='grant'&&v.purpose==='afw.dossier-monitoring.v1'&&uuid(v.requestId)&&time(v.issuedAt)&&time(v.expiresAt)&&v.issuedAt<v.expiresAt&&v.expiresAt-v.issuedAt<=600000);
+ return digest(domain,v);
+}
+
+/** Hash-only factual audit; no preparation/selection self reference or authority. */
+export function hashFiniteOwnerPreparationAudit(value){
+ const v=copy(value);
+ fields(v,['preconnectionId','sourceRevision','sourceHash','preconnectionHash','stageApprovalHashes','stageReceiptHashes','grantLinkHash','noticeLinkHash','connectionRelationHash','connectionRefHash']);
+ check(hex(v.preconnectionId)&&hex(v.sourceRevision,40));
+ for(const key of ['sourceHash','preconnectionHash','grantLinkHash','noticeLinkHash','connectionRelationHash','connectionRefHash'])check(hex(v[key]));
+ for(const key of ['stageApprovalHashes','stageReceiptHashes']){
+  fields(v[key],['connection','notices','finite']);check(Object.values(v[key]).every(x=>hex(x)));
+ }
+ return digest('afw.finite-owner-preparation-audit.v1',v);
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-store.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-store.mjs b/lib/mcp-qa-finite-preparation-store.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-store.mjs
@@ -0,0 +1,224 @@
+import {createHash} from 'node:crypto';
+import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
+const fail=()=>{throw new InvalidPreparation();};
+class InvalidPreparation extends Error{constructor(){super('Finite preparation storage unavailable');}}
+const immutable=v=>{if(v&&typeof v==='object'){for(const x of Object.values(v))immutable(x);Object.freeze(v);}return v;};
+const fields=(v,names)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==names.length||names.some(k=>!Object.getOwnPropertyDescriptor(v,k)?.enumerable||!Object.hasOwn(Object.getOwnPropertyDescriptor(v,k),'value')))fail();return v;};
+const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+const id=v=>typeof v==='string'&&v.length>0&&v.length<=200&&!/[\u0000-\u001f\u007f]/.test(v);
+const observation=(status,recordHash)=>Object.freeze({status,recordHash});
+function witness(raw){
+ if(typeof raw!=='string'||Buffer.byteLength(raw)>256)fail();let v;try{v=JSON.parse(raw);}catch{fail();}
+ fields(v,['selectionHash','publishedAt']);if(!hex(v.selectionHash)||!Number.isSafeInteger(v.publishedAt)||v.publishedAt<0||v.publishedAt>8640000000000000||JSON.stringify({publishedAt:v.publishedAt,selectionHash:v.selectionHash})!==raw)fail();
+ return Object.freeze(v);
+}
+export function createFiniteOwnerPreparationStore({storage,now}){
+ if(!storage||typeof storage.transaction!=='function'||typeof storage.get!=='function'||typeof now!=='function')fail();
+ const current=lease=>{
+  fields(lease,['signal','assertCurrent']);
+  if(!(lease.signal instanceof AbortSignal)||lease.signal.aborted||typeof lease.assertCurrent!=='function')fail();
+  try{lease.assertCurrent();}catch{fail();}
+  const at=now();if(!Number.isSafeInteger(at)||at<0||at>8640000000000000)fail();return at;
+ };
+ const prepare=(kind,value)=>{try{return decode(kind,encode(kind,value));}catch{fail();}};
+ async function transaction(lease,fn){
+  current(lease);let recordHash=null;
+  try{
+   const result=await storage.transaction(async tx=>{
+    current(lease);
+    const io={
+     async get(key,kind){current(lease);const raw=await tx.get(key);current(lease);return raw===undefined?null:prepareText(kind,raw);},
+     async put(key,kind,v){current(lease);await tx.put(key,encode(kind,v));current(lease);},
+     async head(key){current(lease);const h=await tx.get(key);current(lease);if(h!==undefined&&!hex(h))fail();return h??null;},
+     async setHead(key,h){current(lease);await tx.put(key,h);current(lease);},
+     async witness(key){current(lease);const raw=await tx.get(key);current(lease);return raw===undefined?null:witness(raw);},
+     async putWitness(key,v){current(lease);await tx.put(key,JSON.stringify({publishedAt:v.publishedAt,selectionHash:v.selectionHash}));current(lease);}
+    };
+    const result=await fn(io,at=>{recordHash=at;});current(lease);return result;
+   });
+   try{current(lease);}catch{return observation('uncertain',recordHash);}
+   return result;
+  }catch(e){if(e instanceof InvalidPreparation)throw e;return observation('uncertain',recordHash);}
+ }
+ function prepareText(kind,raw){try{return decode(kind,raw);}catch{fail();}}
+ async function append(io,key,kind,record,setHash){
+  const h=hash(kind,record);setHash(h);
+  const old=await io.get(key,kind);
+  if(old){if(encode(kind,old)!==encode(kind,record))fail();return observation('existing',h);}
+  await io.put(key,kind,record);return observation('recorded',h);
+ }
+ const prepKey=id=>'preparation:'+id+':record';
+ const boundKey=id=>'preparation:'+id+':bound';
+ const selectionKey=h=>'afw.finite-owner-selection.v1:'+h;
+ const headKey=source=>'source-selection:'+source+':head';
+ const witnessKey=(source,selection)=>'source-selection:'+source+':publication:'+selection;
+ async function readWitness(source,selection,lease){current(lease);const raw=await storage.get(witnessKey(source,selection));current(lease);if(raw===undefined)return null;const v=witness(raw);if(v.selectionHash!==selection)fail();return v;}
+ async function selected(io,source){
+  const head=await io.head(headKey(source));if(head===null)return null;
+  const selection=await io.get(selectionKey(head),'Selection');if(!selection||selection.selectionHash!==head||selection.sourceRevision!==source)fail();
+  const preparation=await io.get(prepKey(selection.prepId),'OwnerPreparation');
+  if(!preparation||preparation.preparationHash!==selection.preparationHash||preparation.sourceRevision!==source)fail();
+  const binding=await io.get(boundKey(selection.prepId),'Binding');
+  return immutable({preparation,selection,binding});
+ }
+ async function readRecord(key,kind,lease){current(lease);const raw=await storage.get(key);current(lease);return immutable({status:raw===undefined?'absent':'observed',record:raw===undefined?null:prepareText(kind,raw)});}
+ return Object.freeze({
+  async putStageApproval(value,lease){
+   const v=prepare('StageApproval',value);
+   return transaction(lease,async(io,h)=>{
+    const prefix='connection-preparation:'+v.preconnectionId;
+    const pre=await io.get(prefix+':record','Preconnection'),snapshot=await io.get(prefix+':source','OwnerSourceSnapshot');
+    const ticket=await io.get('owner-ticket:'+v.ticketHash,'Ticket'),use=await io.get('owner-ticket:'+v.ticketHash+':use','TicketUse'),approval=await io.get('connection-approval:'+v.approvalHash,'ConfigurationApproval');
+    if(!pre||!snapshot||!ticket||!use||!approval)fail();
+    const source=snapshot.source,at=current(lease),map=await io.get('owner-project-ref:'+ticket.projectRef,'ProjectRef');
+    const realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject});
+    if(!map||pre.preconnectionId!==v.preconnectionId||snapshot.preconnectionId!==v.preconnectionId||ticket.preconnectionId!==v.preconnectionId||map.preconnectionId!==v.preconnectionId||
+     [pre.sourceRevision,source.sourceRevision,ticket.sourceRevision,map.sourceRevision,approval.sourceRevision].some(x=>x!==v.sourceRevision)||pre.actorId!==source.actorId||
+     pre.owner.accessRealmHash!==realm||[ticket.subjectHash,map.subjectHash,approval.subjectHash].some(x=>x!==subject)||ticket.action!==v.stage||
+     pre.clientId!==source.clientId||approval.clientId!==pre.clientId||pre.resource!==source.resource||projectHash(pre.project)!==projectHash(source.project)||approval.projectHash!==projectHash(pre.project)||map.projectId!==pre.project.projectId||map.revision!==pre.project.revision||
+     pre.baselineHash!==evidence('baseline',source.initialBaseline)||hash('ConfigurationApproval',approval)!==v.approvalHash||
+     use.ticketHash!==v.ticketHash||use.recordHash!==approval.csrfReceiptHash||approval.csrfReceiptHash!==evidence('decision',{ticket,decision:'approve',projectHash:projectHash(pre.project),goal:source.goal,clientId:pre.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt})||
+     approval.approvedAt<pre.startedAt||approval.approvedAt>at||use.consumedAt<approval.approvedAt||use.consumedAt>at||
+     ticket.createdAt<source.window.startedAt||ticket.expiresAt>map.expiresAt||approval.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,source.window.expiresAt,ticket.expiresAt)||at>=approval.expiresAt)fail();
+    if(v.stage==='connection'){
+     if(v.approvalHash!==pre.approvalHash||v.ticketHash!==snapshot.initialTicketHash||ticket.connectionRef!==null)fail();
+    }else{
+     const relation=await io.get(prefix+':connection','PreconnectionConnection'),grant=await io.get(prefix+':grant','GrantLink');
+     if(!relation||!grant||ticket.connectionRef!==relation.connectionRef||relation.grantHash!==grant.grantHash)fail();
+     const connection=await io.get('owner-connection-ref:'+relation.connectionRef,'ConnectionRef');
+     if(!connection||connection.connectionRef!==relation.connectionRef||connection.grantId!==grant.grantId||connection.subject!==pre.owner.subject||connection.clientId!==pre.clientId||connection.projectId!==pre.project.projectId||connection.resource!==pre.resource||connection.issuedAt!==relation.linkedAt||at>=connection.expiresAt||approval.expiresAt>connection.expiresAt)fail();
+    }
+    return append(io,prefix+':'+v.stage+':approval','StageApproval',v,h);
+   });
+  },
+  async readStageApproval(value,lease){
+   value=Object.freeze({...fields(value,['preconnectionId','stage'])});
+   if(!hex(value.preconnectionId)||!['connection','notices','finite'].includes(value.stage))fail();
+   return readRecord('connection-preparation:'+value.preconnectionId+':'+value.stage+':approval','StageApproval',lease);
+  },
+
+  async putPreconnectionConnection(value,lease){
+   value=Object.freeze({...fields(value,['relation','connection'])});
+   const relation=prepare('PreconnectionConnection',value.relation),connection=prepare('ConnectionRef',value.connection),relationHash=hash('PreconnectionConnection',relation);
+   if(relation.connectionRef!==connection.connectionRef||connection.issuedAt!==relation.linkedAt||relation.grantHash!==createHash('sha256').update(connection.grantId).digest('hex'))fail();
+   return transaction(lease,async(io,h)=>{
+    h(relationHash);
+    const prefix='connection-preparation:'+relation.preconnectionId,pre=await io.get(prefix+':record','Preconnection'),grant=await io.get(prefix+':grant','GrantLink'),at=current(lease);
+    if(!pre||!grant||pre.preconnectionId!==relation.preconnectionId||grant.preconnectionId!==relation.preconnectionId||grant.grantId!==connection.grantId||grant.grantHash!==relation.grantHash||connection.subject!==pre.owner.subject||connection.clientId!==pre.clientId||connection.projectId!==pre.project.projectId||connection.resource!==pre.resource||relation.linkedAt<grant.acceptedAt||relation.linkedAt>at||connection.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt)||at>=connection.expiresAt)fail();
+    const key=prefix+':connection',mapKey='owner-connection-ref:'+connection.connectionRef,old=await io.get(key,'PreconnectionConnection'),map=await io.get(mapKey,'ConnectionRef');
+    if(old||map){
+     if(!old||!map||encode('PreconnectionConnection',old)!==encode('PreconnectionConnection',relation)||encode('ConnectionRef',map)!==encode('ConnectionRef',connection))fail();
+     return observation('existing',relationHash);
+    }
+    await append(io,mapKey,'ConnectionRef',connection,()=>{});
+    await append(io,key,'PreconnectionConnection',relation,()=>{});
+    return observation('recorded',relationHash);
+   });
+  },
+  async readPreconnectionConnection(value,lease){value=Object.freeze({...fields(value,['preconnectionId'])});if(!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':connection','PreconnectionConnection',lease);},
+  async putProjectRef(value,lease){const v=prepare('ProjectRef',value),key=v.projectRef;return transaction(lease,(io,h)=>append(io,'owner-project-ref:'+key+'','ProjectRef',v,h));},
+  async readProjectRef(value,lease){value=Object.freeze({...fields(value,['projectRef'])});if(!hex(value.projectRef))fail();return readRecord('owner-project-ref:'+value.projectRef+'','ProjectRef',lease);},
+  async putAuthorizationLink(value,lease){const v=prepare('AuthorizationLink',value),key=v.authorizationHash;return transaction(lease,(io,h)=>append(io,'connection-authorization:'+key+'','AuthorizationLink',v,h));},
+  async readAuthorizationLink(value,lease){value=Object.freeze({...fields(value,['authorizationHash'])});if(!hex(value.authorizationHash))fail();return readRecord('connection-authorization:'+value.authorizationHash+'','AuthorizationLink',lease);},
+  async putConfigurationApproval(value,lease){const v=prepare('ConfigurationApproval',value),key=hash('ConfigurationApproval',v);return transaction(lease,(io,h)=>append(io,'connection-approval:'+key+'','ConfigurationApproval',v,h));},
+  async readConfigurationApproval(value,lease){value=Object.freeze({...fields(value,['approvalHash'])});if(!hex(value.approvalHash))fail();return readRecord('connection-approval:'+value.approvalHash+'','ConfigurationApproval',lease);},
+  async putConnectionRef(value,lease){const v=prepare('ConnectionRef',value),key=v.connectionRef;return transaction(lease,(io,h)=>append(io,'owner-connection-ref:'+key+'','ConnectionRef',v,h));},
+  async readConnectionRef(value,lease){value=Object.freeze({...fields(value,['connectionRef'])});if(!hex(value.connectionRef))fail();return readRecord('owner-connection-ref:'+value.connectionRef+'','ConnectionRef',lease);},
+  async putOwnerSourceSnapshot(value,lease){const v=prepare('OwnerSourceSnapshot',value),key=v.preconnectionId;return transaction(lease,(io,h)=>append(io,'connection-preparation:'+key+':source','OwnerSourceSnapshot',v,h));},
+  async readOwnerSourceSnapshot(value,lease){value=Object.freeze({...fields(value,['preconnectionId'])});if(!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':source','OwnerSourceSnapshot',lease);},
+  async readPreconnection(value,lease){value=Object.freeze({...fields(value,['preconnectionId'])});if(!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':record','Preconnection',lease);},
+  async readTicket(value,lease){value=Object.freeze({...fields(value,['ticketHash'])});if(!hex(value.ticketHash))fail();return readRecord('owner-ticket:'+value.ticketHash,'Ticket',lease);},
+  async readTicketUse(value,lease){value=Object.freeze({...fields(value,['ticketHash'])});if(!hex(value.ticketHash))fail();return readRecord('owner-ticket:'+value.ticketHash+':use','TicketUse',lease);},
+  async readLink(value,lease){value=Object.freeze({...fields(value,['kind','preconnectionId'])});if(!['grant','notice'].includes(value.kind)||!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':'+value.kind,value.kind==='grant'?'GrantLink':'NoticeLink',lease);},
+  async putPreconnection(value,lease){const v=prepare('Preconnection',value);return transaction(lease,(io,h)=>append(io,'connection-preparation:'+v.preconnectionId+':record','Preconnection',v,h));},
+  async putTicket(value,lease){const v=prepare('Ticket',value);return transaction(lease,(io,h)=>append(io,'owner-ticket:'+v.ticketHash,'Ticket',v,h));},
+  async consumeTicket(value,lease){
+   value=Object.freeze({...fields(value,['ticketHash','recordHash'])});if(!hex(value.ticketHash)||!hex(value.recordHash))fail();
+   return transaction(lease,async(io,h)=>{
+    const key='owner-ticket:'+value.ticketHash+':use',old=await io.get(key,'TicketUse');
+    if(old){if(old.recordHash!==value.recordHash)fail();h(hash('TicketUse',old));return observation('existing',hash('TicketUse',old));}
+    const ticket=await io.get('owner-ticket:'+value.ticketHash,'Ticket'),at=current(lease);if(!ticket||at<ticket.createdAt||at>=ticket.expiresAt)fail();
+    return append(io,key,'TicketUse',prepare('TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',...value,consumedAt:at}),h);
+   });
+  },
+  async putLink(value,lease){
+   value=Object.freeze({...fields(value,['kind','record'])});if(!['grant','notice'].includes(value.kind))fail();
+   const kind=value.kind==='grant'?'GrantLink':'NoticeLink',v=prepare(kind,value.record);
+   return transaction(lease,async(io,h)=>{
+    const pre=await io.get('connection-preparation:'+v.preconnectionId+':record','Preconnection'),at=current(lease);
+    if(!pre||v.acceptedAt<pre.startedAt||v.acceptedAt>at||at>=pre.expiresAt)fail();
+    if(value.kind==='notice'){const grant=await io.get('connection-preparation:'+v.preconnectionId+':grant','GrantLink');if(!grant||grant.grantHash!==v.grantHash||v.acceptedAt<grant.acceptedAt)fail();}
+    return append(io,'connection-preparation:'+v.preconnectionId+':'+value.kind,kind,v,h);
+   });
+  },
+  async publishSelection(value,lease){
+   fields(value,['preparation','selection','expectedHeadHash']);if(value.expectedHeadHash!==null&&!hex(value.expectedHeadHash))fail();
+   const p=prepare('OwnerPreparation',value.preparation),s=prepare('Selection',value.selection);
+   if(s.prepId!==p.prepId||s.preparationHash!==p.preparationHash||s.sourceRevision!==p.sourceRevision||s.selectedAt<p.selectedAt)fail();
+   const result=await transaction(lease,async(io,h)=>{
+    const head=await io.head(headKey(s.sourceRevision));
+    if(head===s.selectionHash){const old=await selected(io,s.sourceRevision);if(encode('OwnerPreparation',old.preparation)!==encode('OwnerPreparation',p))fail();h(s.selectionHash);return observation('existing',s.selectionHash);}
+    if(head!==value.expectedHeadHash||s.previousSelectionHash!==head||s.selectedAt>current(lease)||s.selectedAt>=p.commandBy)fail();
+    const previous=head===null?null:await io.get(selectionKey(head),'Selection');
+    if(s.sequence!==(previous?previous.sequence+1:1)||previous&&s.selectedAt<previous.selectedAt)fail();
+    await append(io,prepKey(p.prepId),'OwnerPreparation',p,h);
+    await append(io,selectionKey(s.selectionHash),'Selection',s,h);
+    await io.setHead(headKey(s.sourceRevision),s.selectionHash);h(s.selectionHash);return observation('recorded',s.selectionHash);
+   });
+   // This timestamp is sampled only AFTER the actual head transaction ACK.
+   // Reconstructed/existing heads can never create or renew this witness.
+   if(result.status==='uncertain')return result;
+   try{
+    const publishedAt=current(lease);
+    if(result.status==='recorded'){
+     const w=await transaction(lease,async(io,h)=>{
+      h(s.selectionHash);const key=witnessKey(s.sourceRevision,s.selectionHash);
+      const old=await io.witness(key);
+      if(old)fail();
+      await io.putWitness(key,{selectionHash:s.selectionHash,publishedAt});return observation('recorded',s.selectionHash);
+     });
+     current(lease);if(w.status==='uncertain')return w;
+    }
+    const durable=await readWitness(s.sourceRevision,s.selectionHash,lease);current(lease);
+    if(!durable||durable.publishedAt<s.selectedAt)return observation('uncertain',s.selectionHash);
+    return result;
+   }catch{return observation('uncertain',s.selectionHash);}
+  },
+  async bindSelection(value,lease){
+   const b=prepare('Binding',value);
+   return transaction(lease,async(io,h)=>{
+    const old=await io.get(boundKey(b.prepId),'Binding');
+    if(old){if(encode('Binding',old)!==encode('Binding',b))fail();h(hash('Binding',old));return observation('existing',hash('Binding',old));}
+    const s=await selected(io,b.sourceRevision),w=await io.witness(witnessKey(b.sourceRevision,b.selectionHash)),at=current(lease);
+    if(!w||w.selectionHash!==b.selectionHash||w.publishedAt>b.T0||w.publishedAt<s?.selection.selectedAt)fail();
+    if(!s||s.selection.selectionHash!==b.selectionHash||s.preparation.preparationHash!==b.preparationHash||s.preparation.prepId!==b.prepId||s.selection.selectedAt>b.T0||b.T0>=s.preparation.commandBy||b.boundAt>at||at>=Math.min(s.preparation.expiresAt,s.preparation.owner.accessExpiresAt,s.preparation.connection.permissionExpiresAt,s.preparation.approval.expiresAt))fail();
+    return append(io,boundKey(b.prepId),'Binding',b,h);
+   });
+  },
+  async putContext(value,lease){
+   const c=prepare('SetupContext',value);
+   return transaction(lease,async(io,h)=>{
+    const b=await io.get(boundKey(c.ownerPreparation.prepId),'Binding');
+    if(!b||b.intentId!==c.intentId||b.sourceRevision!==c.sourceRevision||b.T0!==c.T0||hash('Binding',b)!==c.bindingHash||b.selectionHash!==c.selectionHash||b.preparationHash!==c.preparationHash)fail();
+    return append(io,'afw.qa-finite-policy-setup.v1:'+c.intentId+':context','SetupContext',c,h);
+   });
+  },
+  async readSelectionPublication(value,lease){
+   fields(value,['sourceRevision','selectionHash']);if(!hex(value.sourceRevision,40)||!hex(value.selectionHash))fail();
+   const record=await readWitness(value.sourceRevision,value.selectionHash,lease);current(lease);return record;
+  },
+  async readSelected(value,lease){
+   fields(value,['sourceRevision']);if(!hex(value.sourceRevision,40))fail();current(lease);
+   const result=await storage.transaction(async tx=>{
+    current(lease);
+    const io={async head(k){current(lease);const v=await tx.get(k);current(lease);if(v!==undefined&&!hex(v))fail();return v??null;},async get(k,kind){current(lease);const v=await tx.get(k);current(lease);return v===undefined?null:prepareText(kind,v);}};
+    const result=await selected(io,value.sourceRevision);current(lease);return result;
+   });current(lease);return result;
+  },
+  async readContext(value,lease){
+   fields(value,['intentId','sourceRevision']);if(!id(value.intentId)||!hex(value.sourceRevision,40))fail();current(lease);
+   const raw=await storage.get('afw.qa-finite-policy-setup.v1:'+value.intentId+':context');current(lease);
+   if(raw===undefined)return null;const c=prepareText('SetupContext',raw);if(c.intentId!==value.intentId||c.sourceRevision!==value.sourceRevision)fail();return c;
+  }
+ });
+}

~~~~~~~~~~

## lib/mcp-qa-finite-profile.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-profile.mjs b/lib/mcp-qa-finite-profile.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-profile.mjs
@@ -0,0 +1,64 @@
+import {createHash} from 'node:crypto';
+import {validateFinitePackageManifest} from './mcp-qa-finite-seed.mjs';
+const fail=()=>{throw Error('Finite source authority unavailable');};
+const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
+const hash=(domain,v)=>createHash('sha256').update(domain+'\n'+canonical(v)).digest('hex');
+function freeze(v){if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v);}return v;}
+function snapshot(v,depth=0,budget={nodes:0,bytes:0}){
+ if(++budget.nodes>4096||depth>20)fail();
+ if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
+ if(typeof v==='string'){budget.bytes+=Buffer.byteLength(v);if(budget.bytes>262144)fail();return v;}
+ const array=Array.isArray(v);if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
+ const keys=Reflect.ownKeys(v),out=array?[]:{};
+ if(array&&(keys.length!==v.length+1||v.length>1024))fail();
+ for(const k of keys){if(array&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);
+  if(typeof k!=='string'||['__proto__','constructor','toJSON','prototype'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();
+  out[k]=snapshot(d.value,depth+1,budget);
+ }return out;
+}
+// Reviewed live source templates. Typed markers are NOT provider metadata and
+// must never be passed to activationConfigurationHash/Known or deployed as vars.
+const templates=freeze({"qaLive":{"compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","enable_request_signal"],"main_module":"index.mjs","usage_model":"standard","containers":[],"exports":["IndependentClosure","PrivateQaBootstrap","PrivateQaCatalog","PrivateQaNamedConfirmation","PrivateQaPreregistration","default","observePrivateQa"],"bindings":[{"name":"AFW_FINITE_OWNER_OAUTH_KV","type":"kv_namespace","namespace_id":"6b94ff702e504e14a7730cee73a0f6ff"},{"name":"AFW_INDEPENDENT_CLOSURE","class_name":"IndependentClosure","type":"durable_object_namespace","namespace_id":"070c4a7708eb4592a3ded7c117a88225"},{"name":"AFW_MCP_CLOSURE_DISPATCH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_CLOSURE_DISPATCH_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_CLOSURE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_CLOSURE_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_MCP_CLOSURE_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_CLOSURE_PUBLISH_TOKEN","type":"secret_text"},{"name":"AFW_MCP_CLOSURE_READ_TOKEN","type":"secret_text"},{"name":"AFW_MCP_CLOSURE_REDUCTION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_PUBLISHER_PROBE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_PUBLISHER_PROBE_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_READER_PROBE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_READER_PROBE_POLICY","type":"plain_text","text":""},{"name":"AFW_QA_BOOTSTRAP","type":"workflow","workflow_name":"afw-own-qa-private-bootstrap","class_name":"PrivateQaBootstrap"},{"name":"AFW_QA_BOOTSTRAP_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_CHALLENGE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_CHALLENGE_IDENTITY","type":"plain_text","text":""},{"name":"AFW_QA_DB","type":"d1","id":"676ca49e-af71-4f2f-a12d-11f13de78a51"},{"name":"AFW_QA_DOSSIER_DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"},{"name":"AFW_QA_HTTP_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_HTTP_POLICY","type":"plain_text","text":""},{"name":"AFW_QA_INSTALLATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_NAMED_CONFIRMATION","type":"workflow","workflow_name":"afw-own-qa-private-confirmation","class_name":"PrivateQaNamedConfirmation"},{"name":"AFW_QA_OCCURRENCE_RATE_LIMITER","type":"ratelimit","namespace_id":"2026101003","simple":{"limit":10,"period":60}},{"name":"AFW_QA_ORIGINALS_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PREREGISTRATION","type":"plain_text","text":""},{"name":"AFW_QA_PREREGISTRY","class_name":"PrivateQaPreregistration","type":"durable_object_namespace","namespace_id":"6f30104244424152b800bc64d5f4cfac"},{"name":"AFW_QA_PRIMARY_ADMISSION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PRIMARY_CATALOG_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PRIMARY_RESERVATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PROVIDER_OBSERVATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_VERSION","type":"version_metadata"},{"name":"AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_EVENTS_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_RELEASE_OPERATOR_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"RELEASE_DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"}]},"canaryLive":{"compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","global_fetch_strictly_public","enable_request_signal"],"main_module":"index.mjs","usage_model":"standard","containers":[{"class_name":"AfwOwnEventNode","name":"agent-friendly-web-delegated-canary-afwowneventnode"}],"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"bindings":[{"name":"AFW_DELEGATED_OAUTH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_EVENTS_CUSTODY_KEY","type":"secret_text"},{"name":"AFW_DOSSIER_EVENTS_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_EVENTS_NODE","class_name":"AfwOwnEventNode","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_DOSSIER_EVENTS_NODE_NAME","type":"plain_text","text":"afw-own-event-first-successor-v1"},{"name":"AFW_DOSSIER_EVENTS_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"events-policy"}},{"name":"AFW_DOSSIER_EVENTS_PROJECTION_SECRET","type":"secret_text"},{"name":"AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_MONITORING_OWNER_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_OWN_SAVE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"withdrawal-policy"}},{"name":"AFW_DOSSIER_RETIREMENT_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"retirement-policy"}},{"name":"AFW_DOSSIER_RETIREMENT_READ_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_SUCCESSOR_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_SUCCESSOR_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"successor-policy"}},{"name":"AFW_FINITE_TRIAL_CONTROL","class_name":"IndependentClosure","script_name":"agent-friendly-web-independent-closure-qa","type":"durable_object_namespace","namespace_id":"070c4a7708eb4592a3ded7c117a88225"},{"name":"AFW_FINITE_TRIAL_VERSION","type":"version_metadata"},{"name":"AFW_OAUTH_ISSUER","type":"plain_text","text":"https://delegated-canary.agentfriendlyweb.dev"},{"name":"AFW_OAUTH_PILOT_CLIENT_ID","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"client-id"}},{"name":"AFW_OAUTH_PILOT_PROJECT_ID","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"project-id"}},{"name":"AFW_OAUTH_REFRESH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_OAUTH_RESOURCE","type":"plain_text","text":"https://delegated-canary.agentfriendlyweb.dev/mcp"},{"name":"AFW_OAUTH_SERVICE_MODE","type":"plain_text","text":"window"},{"name":"DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"},{"name":"OAUTH_KV","type":"kv_namespace","namespace_id":"6b94ff702e504e14a7730cee73a0f6ff"}]}});
+const configs=freeze({"qaLive":{"name":"agent-friendly-web-independent-closure-qa","account_id":"85d0d5dadac3341a564f22ce885e9eec","main":"worker/independent-closure/finite.mjs","compatibility_date":"2026-09-07","workers_dev":false,"preview_urls":false,"routes":[],"triggers":{"crons":[]},"durable_objects":{"bindings":[{"name":"AFW_INDEPENDENT_CLOSURE","class_name":"IndependentClosure"},{"name":"AFW_QA_PREREGISTRY","class_name":"PrivateQaPreregistration"},{"name":"AFW_MCP_CLOSURE_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary"},{"name":"AFW_RELEASE_EVENTS_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary"}]},"migrations":[{"tag":"afw-own-qa-closed-v1","new_sqlite_classes":["IndependentClosure"]},{"tag":"afw-private-preregistry-v1","new_sqlite_classes":["PrivateQaPreregistration"]}],"d1_databases":[{"database_id":"676ca49e-af71-4f2f-a12d-11f13de78a51","database_name":"agent-friendly-web-independent-closure-qa","binding":"AFW_QA_DB"},{"binding":"RELEASE_DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"},{"binding":"AFW_QA_DOSSIER_DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"}],"kv_namespaces":[{"binding":"AFW_FINITE_OWNER_OAUTH_KV","id":"6b94ff702e504e14a7730cee73a0f6ff"}],"workflows":[{"name":"afw-own-qa-private-bootstrap","binding":"AFW_QA_BOOTSTRAP","class_name":"PrivateQaBootstrap"},{"name":"afw-own-qa-private-confirmation","binding":"AFW_QA_NAMED_CONFIRMATION","class_name":"PrivateQaNamedConfirmation"}],"ratelimits":[{"name":"AFW_QA_OCCURRENCE_RATE_LIMITER","namespace_id":"2026101003","simple":{"limit":10,"period":60}}],"vars":{"AFW_QA_HTTP_ENABLED":"false","AFW_QA_HTTP_POLICY":"","AFW_QA_BOOTSTRAP_ENABLED":"false","AFW_QA_PREREGISTRATION":"","AFW_QA_CHALLENGE_ENABLED":"false","AFW_QA_CHALLENGE_IDENTITY":"","AFW_MCP_CLOSURE_ENABLED":"false","AFW_MCP_CLOSURE_POLICY":"","AFW_MCP_READER_PROBE_ENABLED":"false","AFW_MCP_READER_PROBE_POLICY":"","AFW_MCP_PUBLISHER_PROBE_ENABLED":"false","AFW_MCP_PUBLISHER_PROBE_POLICY":"","AFW_MCP_CLOSURE_DISPATCH_ENABLED":"false","AFW_MCP_CLOSURE_DISPATCH_POLICY":"","AFW_QA_ORIGINALS_ENABLED":"false","AFW_QA_PROVIDER_OBSERVATION_ENABLED":"false","AFW_QA_PRIMARY_RESERVATION_ENABLED":"false","AFW_QA_INSTALLATION_ENABLED":"false","AFW_QA_PRIMARY_CATALOG_ENABLED":"false","AFW_QA_PRIMARY_ADMISSION_ENABLED":"false","AFW_MCP_CLOSURE_REDUCTION_ENABLED":"false","AFW_RELEASE_OPERATOR_ENABLED":"true","AFW_RELEASE_WORKFLOW_ENABLED":"true","AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED":"true","AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED":"true"},"compatibility_flags":["nodejs_compat","enable_request_signal"],"version_metadata":{"binding":"AFW_QA_VERSION"},"tail_consumers":[]},"canaryLive":{"name":"agent-friendly-web-delegated-canary","account_id":"85d0d5dadac3341a564f22ce885e9eec","main":"worker/mcp-own/finite.mjs","compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","global_fetch_strictly_public","enable_request_signal"],"workers_dev":false,"preview_urls":false,"routes":[],"triggers":{"crons":[]},"tail_consumers":[],"observability":{"enabled":false},"vars":{"AFW_DELEGATED_OAUTH_ENABLED":"false","AFW_OAUTH_REFRESH_ENABLED":"false","AFW_OAUTH_SERVICE_MODE":"window","AFW_OAUTH_ISSUER":"https://delegated-canary.agentfriendlyweb.dev","AFW_OAUTH_RESOURCE":"https://delegated-canary.agentfriendlyweb.dev/mcp","AFW_DOSSIER_EVENTS_ENABLED":"true","AFW_DOSSIER_SUCCESSOR_ENABLED":"true","AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED":"true","AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED":"false","AFW_DOSSIER_RETIREMENT_READ_ENABLED":"false","AFW_DOSSIER_OWN_SAVE_ENABLED":"false","AFW_DOSSIER_MONITORING_OWNER_ENABLED":"false","AFW_DOSSIER_EVENTS_NODE_NAME":"afw-own-event-first-successor-v1"},"d1_databases":[{"binding":"DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"}],"kv_namespaces":[{"binding":"OAUTH_KV","id":"6b94ff702e504e14a7730cee73a0f6ff"}],"durable_objects":{"bindings":[{"name":"AFW_DOSSIER_EVENTS_NODE","class_name":"AfwOwnEventNode"},{"name":"AFW_FINITE_TRIAL_CONTROL","class_name":"IndependentClosure","script_name":"agent-friendly-web-independent-closure-qa"}]},"version_metadata":{"binding":"AFW_FINITE_TRIAL_VERSION"},"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"unsafe":{"metadata":{"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"containers":[{"class_name":"AfwOwnEventNode"}]}}}});
+export function finitePublicProfileTemplate(role){if(typeof role!=='string'||!Object.hasOwn(templates,role))fail();return templates[role];}
+export function finiteWranglerProfileTemplate(role){if(typeof role!=='string'||!Object.hasOwn(configs,role))fail();return configs[role];}
+export function projectFinitePublicConfiguration(input){
+ const args=snapshot(input);if(!args||canonical(Object.keys(args).sort())!=='["metadata","role"]')fail();
+ const {role,metadata:value}=args,expected=finitePublicProfileTemplate(role);
+ // Provider wrapper fields must be consumed outside this function. Exact
+ // normalized supported configuration only; no author/env/modules/private DTOs.
+ if(canonical(Object.keys(value).sort())!==canonical(Object.keys(expected).sort())||!Array.isArray(value.bindings)||value.bindings.length!==expected.bindings.length)fail();
+ const names=new Set();
+ for(let i=0;i<value.bindings.length;i++){
+  const b=value.bindings[i];if(!b||typeof b.name!=='string'||names.has(b.name))fail();names.add(b.name);
+  const rule=expected.bindings.find(x=>x.name===b.name);if(!rule)fail();
+  if(rule.privateSlot){
+   if(role!=='canaryLive'||canonical(Object.keys(b).sort())!=='["name","text","type"]'||b.type!=='plain_text'||typeof b.text!=='string'||!b.text.length||Buffer.byteLength(b.text)>65536)fail();
+   value.bindings[i]={name:b.name,type:'plain_text',privateSlot:rule.privateSlot};
+  }else if(canonical(b)!==canonical(rule))fail();
+ }
+ value.bindings.sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0);
+ if(canonical(value)!==canonical(expected))fail();
+ return freeze(value);
+}
+function staticCommitment(role,projection){
+ const c=configs[role];
+ return freeze({purpose:'afw.finite-public-static-profile.v1',
+  configurationHash:hash('afw.finite-public-configuration.v1',projection),
+  profileHash:hash('afw.finite-profile.v1',{role,configuration:projection,accountId:c.account_id,workerName:c.name,routes:c.routes,workersDev:c.workers_dev,previewUrls:c.preview_urls,crons:c.triggers.crons,tails:c.tail_consumers,entrypoint:role==='qaLive'?'finite_qa':'finite_trial_event',readAlias:role==='qaLive'?'AFW_MCP_CLOSURE_READ_TOKEN':null}),
+  bindingsHash:hash('afw.finite-public-bindings.v1',projection.bindings)});
+}
+export function finitePublicStaticExpectation(role){return staticCommitment(role,finitePublicProfileTemplate(role));}
+export function qualifyFiniteSourceRoleMetadata({manifest,role,metadata}){
+ const m=validateFinitePackageManifest(manifest),projection=projectFinitePublicConfiguration({role,metadata});
+ const publicStatic=staticCommitment(role,projection);
+ if(canonical(m.modules[role].publicStatic)!==canonical(publicStatic))fail();
+ return freeze({publicStatic,privateFull:{configurationAlgorithm:role==='qaLive'?'qaClosedConfigurationHash':'restorationConfigurationHash',activationAlgorithm:role==='canaryLive'?'finiteActivationConfigurationHash':null,privateSlots:projection.bindings.filter(b=>b.privateSlot).map(b=>b.name),nativeValidationRequired:true}});
+}
+export function qualifyFiniteSourcePackage({manifest}){
+ const m=validateFinitePackageManifest(manifest);
+ for(const role of ['qaLive','canaryLive'])if(canonical(m.modules[role].publicStatic)!==canonical(finitePublicStaticExpectation(role)))fail();
+ // Historical immutable normalized metadata, Native5/4C2/4C3 mounts and
+ // rollback compatibility are unqualified. No caller witness can open this.
+ fail();
+}

~~~~~~~~~~

## lib/mcp-qa-finite-publication-bridge.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-publication-bridge.mjs b/lib/mcp-qa-finite-publication-bridge.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-publication-bridge.mjs
@@ -0,0 +1,37 @@
+import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
+import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
+import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
+import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {qualifyFiniteNativeSourceContext,readFiniteNativeCustody} from './mcp-qa-finite-source-authority.mjs';
+const fail=()=>{throw Error('Finite QA publication bridge unavailable');};
+const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa';
+/** Private source composition only. Missing separately approved native custody
+ * or 4C native context keeps this unavailable. No caller success/pins accepted.
+ * Does not replace existing direct canary/operator-byte qualification. */
+export async function readFiniteQaPublicationBridge(options={}){
+ let wire,timer,stop,parent,controller;
+ try{
+  if(!options||Object.keys(options).some(k=>!['ctx','env','intentId','sourceRevision','fetchImpl','now','signal'].includes(k)))fail();
+  const {ctx,env,intentId,sourceRevision,fetchImpl=fetch,now=Date.now}=options;
+  parent=options.signal;if(!(parent instanceof AbortSignal))fail();controller=new AbortController();stop=()=>controller.abort();parent.addEventListener('abort',stop,{once:true});if(parent.aborted)stop();timer=setTimeout(stop,5000);const signal=controller.signal;
+  const version=env?.AFW_QA_VERSION?.id,began=now(),mono=performance.now();let last=began;
+  const check=()=>{const at=now();if(signal.aborted||!Number.isSafeInteger(at)||at<last||at-began>=5000||performance.now()-mono>=5000||env.AFW_QA_VERSION?.id!==version)fail();last=at;qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision});};
+  check();const custody=readFiniteNativeCustody();check();
+  // The native identity must be independently source-qualified, never GHA9db.
+  if(!custody||custody.id==='9db7901af95faf07e6f7ef378045328e'||custody.tokenKind!=='account')fail();
+  wire=finiteSeedWire({fetchImpl,now,signal,credential:env.AFW_MCP_CLOSURE_READ_TOKEN,origin:'https://api.cloudflare.com/client/v4',check,limit:1048576,requests:3});
+  const verified=finiteCfEnvelope((await wire.request(ROOT+'/tokens/verify')).value);check();
+  if(!verified||Object.keys(verified).some(k=>!['id','status','expires_on','not_before'].includes(k))||verified.id!==custody.id||verified.status!=='active'||!Number.isSafeInteger(custody.expiresAt)||Date.parse(verified.expires_on)!==custody.expiresAt||custody.expiresAt<=now()||verified.not_before!=null&&(!Number.isSafeInteger(Date.parse(verified.not_before))||Date.parse(verified.not_before)>now()))fail();
+  const path=ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1',before=finiteQaPointer(await wire.request(path));check();
+  if(before.versionId!==version)fail();
+  const material=await readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl,now,signal});check();
+  const pub=material.seed.qaPublication;
+  if(pub.qaLive.versionId!==version||pub.qaLive.deploymentId!==before.deploymentId||custody.expiresAt<material.primaryEvidence.R1)fail();
+  // This fixed source check must bind the actual native actor/bindings/profile
+  // to the same-role manifest; a metadata UUID match is insufficient.
+  qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed:material.seed});check();
+  const after=finiteQaPointer(await wire.request(path));check();
+  if(after.versionId!==before.versionId||after.deploymentId!==before.deploymentId)fail();
+  return Object.freeze({...material,qaPublicationBridgeVerified:true,qaCodeProvenanceVerified:false,scopeVerified:false,operationalReadiness:false});
+ }catch{fail();}finally{wire?.close();clearTimeout(timer);parent?.removeEventListener('abort',stop);controller?.abort();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-publication.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-publication.mjs b/lib/mcp-qa-finite-publication.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-publication.mjs
@@ -0,0 +1,41 @@
+import {qaClosedConfigurationHash} from './mcp-restoration-configuration.mjs';
+import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
+import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
+import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {qualifyFiniteSourcePackage,qualifyFiniteSourceRoleMetadata} from './mcp-qa-finite-source-authority.mjs';
+import {validateFinitePackageManifest} from './mcp-qa-finite-seed.mjs';
+const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa';
+const fail=()=>{throw Error('Finite QA publication unavailable');};
+const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
+export function finiteQaPointer(response){
+ const result=finiteCfEnvelope(response.value),d=result?.deployments?.[0];
+ if(!Array.isArray(result?.deployments)||result.deployments.length!==1||!uuid(d.id)||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].percentage!==100||!uuid(d.versions[0].version_id))fail();
+ return Object.freeze({versionId:d.versions[0].version_id,deploymentId:d.id});
+}
+/** Actual bytes first; independently approved SOURCE semantics are mandatory.
+ * No caller expected-hash callback, override locator or source-success DTO. */
+export async function readFiniteQaPublication({manifest,request,check}){
+ const m=validateFinitePackageManifest(manifest);qualifyFiniteSourcePackage({manifest:m});check();
+ const first=finiteQaPointer(await request(ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1'));check();
+ const closed=QA_CLOUD_CLOSED_PINS.qaClosed,roles={};
+ if(first.versionId===closed.id)fail();
+ for(const role of ['qaLive','qaClosed']){
+  const descriptor=m.modules[role],versionId=role==='qaLive'?first.versionId:closed.id;
+  if(role==='qaClosed'&&(descriptor.module.name!==closed.module.name||descriptor.module.sha256!==closed.module.sha256||descriptor.module.bytes!==closed.module.bytes))fail();
+  const response=await request(ROOT+'/workers/workers/'+QA+'/versions/'+versionId+'?include=modules');check();
+  const metadata=finiteCfEnvelope(response.value),{exports,...module}=descriptor.module;
+  const configurationHash=qaClosedConfigurationHash(metadata);
+  if(role==='qaClosed'&&configurationHash!==closed.configurationHash)fail();
+  qualifyFiniteWorkerVersion({metadata,pin:{versionId,module,configurationHash},role:'qa',closed:role==='qaClosed'});
+  if(!Array.isArray(metadata.exports)||JSON.stringify(metadata.exports)!==JSON.stringify(exports))fail();
+  if(role==='qaClosed'&&(metadata.bindings.length!==closed.bindingCount||metadata.bindings.filter(b=>b.name.startsWith('AFW_')&&b.name.endsWith('_ENABLED')).length!==closed.flagCount))fail();
+  // 4C validates exact profile/binding semantics and their independently built
+  // manifest commitments, exports/classes/namespaces and closed history.
+  const configuration=Object.fromEntries(['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings',...['limits','placement','cache_options','assets','package_dependencies'].filter(k=>Object.hasOwn(metadata,k))].map(k=>[k,metadata[k]??(k==='containers'?[]:k==='usage_model'?'standard':undefined)]));
+  const qualified=qualifyFiniteSourceRoleMetadata({manifest:m,role,metadata:configuration});check();
+  roles[role]={versionId,...(role==='qaLive'?{deploymentId:first.deploymentId}:{}),module:descriptor.module,configurationHash,publicStatic:qualified.publicStatic};
+ }
+ const last=await request(ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1');check();
+ if(JSON.stringify(finiteQaPointer(last))!==JSON.stringify(first))fail();
+ return Object.freeze({purpose:'afw.finite-qa-publication.v1',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:QA,...roles,observedAt:last.date});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-seed-http.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-seed-http.mjs b/lib/mcp-qa-finite-seed-http.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-seed-http.mjs
@@ -0,0 +1,27 @@
+import {decodeFiniteMaterialSeed} from './mcp-qa-finite-seed.mjs';
+import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
+import {readFiniteSeedPrimary,qualifyFiniteSeedLineage} from './mcp-qa-finite-seed-primary.mjs';
+const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
+const fail=()=>{throw Error('Finite material seed unavailable');};
+const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+/** Public immutable technical seed, never an authorization or fresh-ready cache.
+ * Fixed anonymous GET only, 11 requests maximum under the original 5s lease. */
+export async function readFiniteMaterialSeed(options={}){
+ let wire;
+ try{
+  if(!options||Object.keys(options).some(k=>!['intentId','sourceRevision','fetchImpl','now','signal'].includes(k)))fail();
+  const {intentId,sourceRevision,fetchImpl=fetch,now=Date.now,signal=new AbortController().signal}=options;
+  if(!hex(intentId,64)||!hex(sourceRevision,40))fail();
+  wire=finiteSeedWire({fetchImpl,now,signal,origin:GH});
+  const get=async path=>(await wire.request(path)).value;
+  const ref=await get('/git/ref/tags/afw-finite-observer-create/'+intentId);
+  if(ref.ref!=='refs/tags/afw-finite-observer-create/'+intentId||ref.object?.type!=='tag'||!hex(ref.object.sha,40))fail();
+  const tagSha=ref.object.sha,tag=await get('/git/tags/'+tagSha);
+  if(tag.sha!==tagSha||tag.tag!=='afw-finite-observer-seed-'+intentId||tag.object?.type!=='commit'||tag.object.sha!==sourceRevision)fail();
+  const {seed,seedHash}=decodeFiniteMaterialSeed(tag.message);
+  if(seed.intentId!==intentId||seed.sourceRevision!==sourceRevision)fail();
+  const primary=await readFiniteSeedPrimary({get,seed,phase:'reader',now}),lineage=await qualifyFiniteSeedLineage({get,seed,now});
+  wire.assert();
+  return Object.freeze({seed,seedHash,tagSha,primaryEvidence:Object.freeze({...primary,...lineage})});
+ }catch{fail();}finally{wire?.close();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-seed-issuer.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-seed-issuer.mjs b/lib/mcp-qa-finite-seed-issuer.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-seed-issuer.mjs
@@ -0,0 +1,61 @@
+import process from 'node:process';
+import {assertQaFiniteConfirmationAdmission,isQaGithubBearerTransportValue} from './mcp-qa-cloud-lifecycle-admission.mjs';
+import {resolvePrivateQaFiniteExternalSource} from './mcp-qa-finite-source.mjs';
+import {qualifyFiniteSourcePackage} from './mcp-qa-finite-source-authority.mjs';
+import {finiteGhaCustody,verifyFiniteGhaCustody} from './mcp-qa-finite-custody.mjs';
+import {readFiniteQaPublication} from './mcp-qa-finite-publication.mjs';
+import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
+import {readFiniteSeedPrimary} from './mcp-qa-finite-seed-primary.mjs';
+import {encodeFiniteMaterialSeed,decodeFiniteMaterialSeed} from './mcp-qa-finite-seed.mjs';
+const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
+const fail=()=>{throw Error('Finite seed issuer unavailable');};
+let originalAttempted=false,consumed=false;
+const hex=v=>typeof v==='string'&&/^[a-f0-9]{40}$/.test(v);
+/** ONE trusted original launcher boundary. PID is coherence ONLY.
+ * Whole-launcher same-attempt reexecution is explicitly excluded by that host,
+ * not durably prevented. Every issuer in this process shares the spent cap. */
+export async function issueFiniteMaterialSeed(options={}){
+ let gh,cf;
+ try{
+  if(!options||Object.keys(options).some(k=>!['admission','githubToken','credential','fetchImpl','now','signal'].includes(k)))fail();
+  const {admission,githubToken,credential,fetchImpl=fetch,now=Date.now,signal}=options;
+  assertQaFiniteConfirmationAdmission(admission);
+  if(originalAttempted||consumed)fail();originalAttempted=true;
+  const pid=process.pid,marker=process.env.AFW_FINITE_SEED_ORIGINAL_PID;
+  const expected={GITHUB_JOB:'admit',GITHUB_ACTION:'finite_seed_once',GITHUB_RUN_ID:admission.runId,GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:admission.sourceRevision};
+  const check=()=>{assertQaFiniteConfirmationAdmission(admission);if(signal.aborted||marker!==String(pid)||process.pid!==pid||process.env.AFW_FINITE_SEED_ORIGINAL_PID!==marker||Object.entries(expected).some(([k,v])=>process.env[k]!==v))fail();};
+  check();if(!isQaGithubBearerTransportValue(githubToken))fail();
+  const source=await resolvePrivateQaFiniteExternalSource({phase:'seed-material',sourceRevision:admission.sourceRevision,githubToken,fetchImpl,now,signal});check();
+  qualifyFiniteSourcePackage({manifest:source.manifest});check();
+  gh=finiteSeedWire({fetchImpl,now,signal,credential:githubToken,origin:GH,check,duration:30000,limit:1048576,requests:24});
+  const get=async path=>(await gh.request(path)).value;
+  const jobs=await get('/actions/runs/'+admission.runId+'/attempts/1/jobs?per_page=100'),admit=jobs.jobs?.filter(j=>j.name==='admit');
+  if(!Array.isArray(jobs.jobs)||jobs.jobs.length>100||jobs.total_count!==jobs.jobs.length||admit?.length!==1||!Number.isSafeInteger(admit[0].id)||admit[0].id<1)fail();
+  const seed={purpose:'afw.finite-material-seed.v2',repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,intentId:admission.intentId,sourceRevision:admission.sourceRevision,commandId:admission.commentId,finalizer:{runId:Number(admission.runId),attempt:1,jobId:admit[0].id,workflowPath:'.github/workflows/afw-finite-finalizer.yml',seedStep:'seed-material'},...source};
+  const primary=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();
+  if(primary.T0!==admission.createdAt)fail();
+  if(!isQaGithubBearerTransportValue(credential))fail();
+  cf=finiteSeedWire({fetchImpl,now,signal,credential,origin:'https://api.cloudflare.com/client/v4',check,duration:30000,limit:12582912,requests:5});
+  await verifyFiniteGhaCustody({custody:finiteGhaCustody(),request:path=>cf.request(path),check,now,R1:admission.cleanupExpiresAt});check();
+  seed.qaPublication=await readFiniteQaPublication({manifest:source.manifest,request:path=>cf.request(path),check});check();
+  const qualified=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();
+  if(JSON.stringify(primary)!==JSON.stringify(qualified)||seed.qaPublication.observedAt<primary.seedStepStartedAt||seed.qaPublication.observedAt<admission.createdAt||seed.qaPublication.observedAt>=admission.expiresAt||Math.abs(now()-seed.qaPublication.observedAt)>5000)fail();
+  const message=encodeFiniteMaterialSeed(seed),ref='refs/tags/afw-finite-observer-create/'+seed.intentId,tagName='afw-finite-observer-seed-'+seed.intentId;
+  const existing=await gh.request('/git/ref/tags/afw-finite-observer-create/'+seed.intentId,{allow404:true});check();
+  if(existing.status!==404)fail();
+  // Consume BEFORE first POST; no failure path refunds or creates a new intent.
+  if(consumed)fail();consumed=true;
+  const tag=await gh.request('/git/tags',{method:'POST',body:{tag:tagName,message,object:seed.sourceRevision,type:'commit'}});check();
+  if(tag.status!==201||!hex(tag.value.sha)||tag.value.tag!==tagName||tag.value.object?.sha!==seed.sourceRevision||tag.value.object.type!=='commit'||tag.value.message!==message)fail();
+  const beforeRef=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();if(JSON.stringify(beforeRef)!==JSON.stringify(primary))fail();
+  const created=await gh.request('/git/refs',{method:'POST',body:{ref,sha:tag.value.sha}});check();
+  if(created.status!==201||created.value.ref!==ref||created.value.object?.type!=='tag'||created.value.object.sha!==tag.value.sha)fail();
+  const readRef=await get('/git/ref/tags/afw-finite-observer-create/'+seed.intentId);check();
+  if(readRef.ref!==ref||readRef.object?.type!=='tag'||readRef.object.sha!==tag.value.sha)fail();
+  const readTag=await get('/git/tags/'+tag.value.sha);check();
+  if(readTag.sha!==tag.value.sha||readTag.tag!==tagName||readTag.object?.type!=='commit'||readTag.object.sha!==seed.sourceRevision||readTag.message!==message)fail();
+  const finalPrimary=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();if(JSON.stringify(finalPrimary)!==JSON.stringify(primary))fail();
+  const decoded=decodeFiniteMaterialSeed(readTag.message);check();
+  return Object.freeze({status:'seed_material_created',seedHash:decoded.seedHash,tagSha:readTag.sha,qaPublicationBridgeVerified:false,operationalReadiness:false});
+ }catch{fail();}finally{gh?.close();cf?.close();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-seed-primary.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-seed-primary.mjs b/lib/mcp-qa-finite-seed-primary.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-seed-primary.mjs
@@ -0,0 +1,50 @@
+import {createHash} from 'node:crypto';
+import {parseDocument} from 'yaml';
+const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
+const fail=()=>{throw Error('Finite seed primary unavailable');};
+const OWNER=290715446,REPO=1347578006;
+const actor=a=>a?.id===OWNER&&a.login==='tokenizartinfo-ops'&&a.type==='User';
+const repository=r=>r?.id===REPO&&r.full_name==='tokenizartinfo-ops/agent-friendly-web';
+const hash=b=>createHash('sha256').update(b).digest('hex');
+export function finiteSourceFile(file,path){
+ if(file?.type!=='file'||file.path!==path||file.encoding!=='base64'||!Number.isSafeInteger(file.size)||file.size<1||file.size>65536||typeof file.content!=='string'||file.content.length>90000)fail();
+ const text=file.content.replace(/\n/g,''),bytes=Buffer.from(text,'base64');
+ if(bytes.toString('base64')!==text||bytes.length!==file.size||createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')!==file.sha)fail();
+ return {text:new TextDecoder('utf-8',{fatal:true}).decode(bytes),sha256:hash(bytes)};
+}
+export async function readFiniteSeedPrimary({get,seed,phase,now}){
+ const s=seed,comment=await get('/issues/comments/'+s.commandId),main=await get('/git/ref/heads/main'),run=await get('/actions/runs/'+s.finalizer.runId);
+ const T0=Date.parse(comment?.created_at),intent=createHash('sha256').update('afw.qa-finite-confirmation-command.v1\n1347578006\n'+s.commandId+'\n'+s.sourceRevision+'\n'+T0).digest('hex');
+ if(comment.id!==Number(s.commandId)||comment.body!=='/afw-qa-finite-confirmation v1 '+s.sourceRevision||!actor(comment.user)||comment.author_association!=='OWNER'||comment.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(T0)||T0>now()||intent!==s.intentId||main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==s.sourceRevision)fail();
+ if(run.id!==s.finalizer.runId||run.run_attempt!==1||run.head_sha!==s.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||run.path!==s.finalizer.workflowPath||!repository(run.repository)||!repository(run.head_repository)||!actor(run.actor)||!actor(run.triggering_actor)||run.display_title!=='AFW finite finalizer comment-'+s.commandId+' source-'+s.sourceRevision||!['in_progress','completed'].includes(run.status)||run.status==='completed'&&run.conclusion!=='success'||phase==='issuer'&&run.status!=='in_progress')fail();
+ const jobs=await get('/actions/runs/'+run.id+'/attempts/1/jobs?per_page=100');
+ if(!Array.isArray(jobs.jobs)||jobs.jobs.length>100||jobs.total_count!==jobs.jobs.length||new Set(jobs.jobs.map(j=>j.id)).size!==jobs.jobs.length)fail();
+ const found=jobs.jobs.filter(j=>j.name==='admit');if(found.length!==1)fail();const j=found[0];
+ if(j.id!==s.finalizer.jobId||j.run_id!==run.id||j.head_sha!==s.sourceRevision||!Array.isArray(j.steps)||j.steps.length>100||!['in_progress','completed'].includes(j.status)||j.status==='completed'&&j.conclusion!=='success')fail();
+ if(typeof j.started_at!=='string')fail();const jobStartedAt=Date.parse(j.started_at);
+ const steps=j.steps.filter(x=>x.name==='seed-material');if(steps.length!==1)fail();const step=steps[0],startedAt=Date.parse(step.started_at),completedAt=Date.parse(step.completed_at),observedAt=s.qaPublication?.observedAt;
+ if(!Number.isSafeInteger(step.number)||step.number<1||!Number.isSafeInteger(startedAt)||startedAt<T0||startedAt>now()||!Number.isSafeInteger(jobStartedAt)||jobStartedAt<T0||jobStartedAt>startedAt)fail();
+ if(phase==='issuer'){
+  if(j.status!=='in_progress'||step.status!=='in_progress'||step.conclusion!==null||step.completed_at!==null&&step.completed_at!==undefined||observedAt!==undefined&&(observedAt<startedAt||observedAt<T0||observedAt>=T0+300000||Math.abs(now()-observedAt)>5000))fail();
+ }else if(step.status!=='completed'||step.conclusion!=='success'||!Number.isSafeInteger(completedAt)||completedAt<startedAt||completedAt>now()||!Number.isSafeInteger(observedAt)||observedAt<startedAt||observedAt>completedAt||observedAt<T0||observedAt>=T0+300000)fail();
+ return Object.freeze({T0,N1:T0+300000,R1:T0+480000,runId:run.id,jobId:j.id,seedStepStartedAt:startedAt,...(phase==='issuer'?{}:{seedStepCompletedAt:completedAt})});
+}
+export async function qualifyFiniteSeedLineage({get,seed,now}){
+ const s=seed,b=s.build,commit=await get('/git/commits/'+s.sourceRevision);
+ if(commit.sha!==s.sourceRevision||commit.tree?.sha!==s.manifest.sourceTree)fail();
+ const run=await get('/actions/runs/'+b.runId);
+ if(run.id!==b.runId||run.run_attempt!==1||run.head_sha!==s.sourceRevision||run.head_branch!=='main'||run.event!=='push'||run.path!==b.workflowPath||run.status!=='completed'||run.conclusion!=='success'||!repository(run.repository)||!repository(run.head_repository))fail();
+ const a=await get('/actions/artifacts/'+b.artifactId),ar=a.workflow_run;
+ if(a.id!==b.artifactId||a.name!==b.artifactName||a.digest!==b.artifactDigest||a.expired!==false||Date.parse(a.expires_at)<=now()||!Number.isSafeInteger(Date.parse(a.expires_at))||!Number.isSafeInteger(a.size_in_bytes)||a.size_in_bytes<1||a.size_in_bytes>67108864||ar?.id!==b.runId||ar.repository_id!==REPO||ar.head_repository_id!==REPO||ar.head_sha!==s.sourceRevision||ar.head_branch!=='main')fail();
+ const file=finiteSourceFile(await get('/contents/'+b.workflowPath+'?ref='+s.sourceRevision),b.workflowPath);
+ if(file.sha256!==s.manifest.buildWorkflowHash)fail();
+ const doc=parseDocument(file.text,{uniqueKeys:true});if(doc.errors.length||doc.warnings.length)fail();
+ const config=doc.toJS({maxAliasCount:0});if(JSON.stringify(config?.on?.push?.branches)!=='["main"]'||config.on.push['branches-ignore'])fail();
+ const finalizer=finiteSourceFile(await get('/contents/'+s.finalizer.workflowPath+'?ref='+s.sourceRevision),s.finalizer.workflowPath);
+ const yaml=parseDocument(finalizer.text,{uniqueKeys:true});if(yaml.errors.length||yaml.warnings.length)fail();
+ const f=yaml.toJS({maxAliasCount:0}),steps=f?.jobs?.admit?.steps;
+ if(!Array.isArray(steps)||f.name!=='afw-finite-finalizer')fail();
+ const seedSteps=steps.filter(x=>x.name==='seed-material'),index=steps.indexOf(seedSteps[0]),ready=steps.findIndex(x=>x.name==='admit-and-ready');
+ if(seedSteps.length!==1||index<0||ready<=index||seedSteps[0].id!=='finite_seed_once'||seedSteps[0].shell!=='bash'||seedSteps[0]['continue-on-error']||seedSteps[0].run!=='export AFW_FINITE_SEED_ORIGINAL_PID=$$\nexec node scripts/run-qa-finite-trial-finalizer.mjs seed-material\n')fail();
+ return Object.freeze({sourceTree:commit.tree.sha,buildRunId:run.id,artifactId:a.id,artifactDigest:a.digest,manifestHash:b.manifestHash});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-seed-wire.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-seed-wire.mjs b/lib/mcp-qa-finite-seed-wire.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-seed-wire.mjs
@@ -0,0 +1,38 @@
+// Fixed-operation transport shared by seed primary readers/issuer. This module
+// is internal: callers choose only named relative paths in the enclosing modules.
+const fail=()=>{throw Error('Finite seed transport unavailable');};
+export function finiteSeedWire({fetchImpl,now,signal,credential,origin,check=()=>{},limit=262144,requests=12,duration=5000}){
+ if(credential!==undefined&&(typeof credential!=='string'||credential.length<1||credential.length>8192||/[^\x21-\x7e]/.test(credential)))fail();
+ const began=now(),mono=performance.now(),controller=new AbortController();let last=began,count=0,total=0,closed=false;
+ if(typeof fetchImpl!=='function'||typeof now!=='function'||!(signal instanceof AbortSignal)||!Number.isSafeInteger(began)||!['https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web','https://api.cloudflare.com/client/v4'].includes(origin))fail();
+ const assert=()=>{check();const at=now();if(closed||signal.aborted||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at-began>=duration||performance.now()-mono>=duration)fail();last=at;};
+ const stop=()=>controller.abort();signal.addEventListener('abort',stop,{once:true});
+ const timer=setTimeout(stop,duration);
+ async function request(path,{method='GET',body,allow404=false}={}){
+  let reader;const child=new AbortController();let rejectAbort,stepTimer;
+  const rejected=new Promise((_,reject)=>{rejectAbort=reject;});
+  const abort=()=>{child.abort();rejectAbort(Error('Finite seed transport unavailable'));};
+  controller.signal.addEventListener('abort',abort,{once:true});signal.addEventListener('abort',abort,{once:true});stepTimer=setTimeout(abort,5000);
+  try{
+   const work=async()=>{
+    assert();if(++count>requests||!path.startsWith('/')||path.includes('..')||method!=='GET'&&!credential)fail();
+    const headers={Accept:'application/json','Cache-Control':'no-cache',...(credential?{Authorization:'Bearer '+credential}:{})};
+    if(origin.includes('github'))headers['X-GitHub-Api-Version']='2022-11-28';
+    if(body!==undefined)headers['Content-Type']='application/json';
+    const r=await fetchImpl(origin+path,{method,headers,redirect:'error',credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',signal:child.signal,...(body===undefined?{}:{body:JSON.stringify(body)})});assert();
+    if(child.signal.aborted||!(r instanceof Response)||r.headers.has('retry-after')||r.headers.get('x-ratelimit-remaining')==='0'||r.headers.has('link')||r.status!==(method==='POST'?201:200)&&!(allow404&&r.status===404))fail();
+    const date=Date.parse(r.headers.get('date')??'');
+    if(!Number.isSafeInteger(date)||Math.abs(now()-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||['HIT','STALE','REVALIDATED','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase())||!(r.headers.get('content-type')??'').startsWith('application/json'))fail();
+    const length=r.headers.get('content-length');if(length!==null&&(!/^(0|[1-9][0-9]*)$/.test(length)||!Number.isSafeInteger(Number(length))||Number(length)>limit-total)||!r.body)fail();
+    reader=r.body.getReader();let size=0;const chunks=[];
+    for(;;){assert();const x=await reader.read();assert();if(child.signal.aborted)fail();if(x.done)break;if(!(x.value instanceof Uint8Array)||(total+=x.value.length)>limit)fail();size+=x.value.length;chunks.push(x.value);}
+    if(length!==null&&Number(length)!==size)fail();
+    const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));assert();
+    return {value,status:r.status,date};
+   };
+   return await Promise.race([work(),rejected]);
+  }catch{controller.abort();fail();}
+  finally{clearTimeout(stepTimer);controller.signal.removeEventListener('abort',abort);signal.removeEventListener('abort',abort);child.abort();if(reader)void reader.cancel().catch(()=>{});}
+ }
+ return {request,assert,close(){closed=true;clearTimeout(timer);signal.removeEventListener('abort',stop);controller.abort();}};
+}

~~~~~~~~~~

## lib/mcp-qa-finite-seed.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-seed.mjs b/lib/mcp-qa-finite-seed.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-seed.mjs
@@ -0,0 +1,115 @@
+import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
+import {createHash} from 'node:crypto';
+
+// Pure structural codec. Hashes/true assertions establish no runtime authority,
+// profile semantics, artifact availability, custody or child-create SEND evidence.
+const fail=()=>{throw Error('Finite material unavailable');};
+const SEED='afw.finite-material-seed.v2',ENVELOPE='afw.finite-material-seed-envelope.v2';
+const MANIFEST='afw.finite-native-package.v2',MANIFEST_DOMAIN='afw.finite-native-manifest.v2';
+const ROLES=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
+const COMPATIBILITY=['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'];
+const bytes=v=>Buffer.byteLength(v,'utf8');
+const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+const positive=v=>Number.isSafeInteger(v)&&v>0;
+const digest=(domain,text)=>createHash('sha256').update(domain+'\n','utf8').update(text,'utf8').digest('hex');
+function fields(v,keys){
+ if(!v||Array.isArray(v)||typeof v!=='object'||Object.keys(v).length!==keys.length||keys.some(k=>!Object.hasOwn(v,k)))fail();
+ return v;
+}
+// Snapshot own data descriptors without invoking getters/toJSON; bounded before
+// schema/canonical processing. Reject exotic prototypes and sparse/extended arrays.
+function snapshot(v,depth=0,budget={nodes:0}){
+ if(++budget.nodes>2048||depth>12)fail();
+ if(v===null||typeof v==='boolean')return v;
+ if(typeof v==='number'){if(!Number.isSafeInteger(v))fail();return v;}
+ if(typeof v==='string'){if(bytes(v)>32768)fail();return v;}
+ if(!v||typeof v!=='object')fail();
+ const array=Array.isArray(v);if(Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
+ const keys=Reflect.ownKeys(v),out=array?[]:{};
+ if(array){if(!Number.isSafeInteger(v.length)||v.length>2048||keys.length!==v.length+1)fail();}
+ for(const key of keys){
+  if(array&&key==='length')continue;
+  if(typeof key!=='string'||['__proto__','prototype','constructor','toJSON'].includes(key))fail();
+  if(array&&(!/^(0|[1-9][0-9]*)$/.test(key)||Number(key)>=v.length))fail();
+  const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();
+  out[key]=snapshot(d.value,depth+1,budget);
+ }
+ if(array&&out.length!==v.length)fail();return Object.freeze(out);
+}
+function canonical(v){
+ if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';
+ if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
+ return JSON.stringify(v);
+}
+function provenance(p,role,m){
+ const live=['qaLive','canaryLive'].includes(role);
+ if(live){
+  fields(p,['kind','sourceRevision','sourceTree']);
+  if(p.kind!=='compiled-source.v1'||p.sourceRevision!==m.sourceRevision||p.sourceTree!==m.sourceTree)fail();
+ }else{
+  const historicalSource=p?.kind==='historical-source-pin.v1';
+  fields(p,['kind','receiptPath','receiptBlobSha','receiptKey','versionId',...(historicalSource?['sourceRevision','sourceTree']:[])]);
+  const key={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'}[role];
+  if(!['historical-content-pin.v1','historical-source-pin.v1'].includes(p.kind)||p.receiptPath!=='lib/mcp-qa-cloud-closed-pins.mjs'||p.receiptBlobSha!=='26213123304eea25e652a52d808d25b7e0e3475e'||p.receiptKey!==key||p.versionId!==QA_CLOUD_CLOSED_PINS[key].id)fail();
+  if(historicalSource&&(role!=='canaryClosed'||p.sourceRevision!=='2a4773737764c5038aaa0b3528b43df2a0572441'||p.sourceTree!=='637af253296ac1c771cb73ea353cb960a2e59204'))fail();
+ }
+}
+function publicStatic(p){
+ fields(p,['purpose','configurationHash','profileHash','bindingsHash']);
+ if(p.purpose!=='afw.finite-public-static-profile.v1'||['configurationHash','profileHash','bindingsHash'].some(k=>!hex(p[k])))fail();
+}
+function manifestShape(m){
+ fields(m,['purpose','sourceRevision','sourceTree','sourceCheck','buildWorkflowHash','modules','compatibility']);
+ if(m.purpose!==MANIFEST||!hex(m.sourceRevision,40)||!hex(m.sourceTree,40)||m.sourceCheck!=='git-inputs-and-configuration-before-after-v1'||!hex(m.buildWorkflowHash))fail();
+ fields(m.modules,ROLES);
+ for(const role of ROLES){
+  const d=fields(m.modules[role],['provenance','module','publicStatic']);
+  provenance(d.provenance,role,m);publicStatic(d.publicStatic);
+  const mod=fields(d.module,['name','sha256','bytes','exports']);
+  if(mod.name!==(role==='qaClosed'?'closed-rollback.mjs':'index.mjs')||!hex(mod.sha256)||!positive(mod.bytes)||mod.bytes>3145728||!Array.isArray(mod.exports)||mod.exports.length>128)fail();
+  for(let i=0;i<mod.exports.length;i++){
+   const name=mod.exports[i];if(typeof name!=='string'||!/^[A-Za-z_$][A-Za-z0-9_$]{0,127}$/.test(name)||i>0&&mod.exports[i-1]>=name)fail();
+  }
+ }
+ fields(m.compatibility,COMPATIBILITY);if(COMPATIBILITY.some(k=>m.compatibility[k]!==true)||bytes(canonical(m))>24576)fail();
+ return m;
+}
+/** Exact five-role structural manifest; historical descriptor pins stay intact. */
+export function validateFinitePackageManifest(value){return manifestShape(snapshot(value));}
+/** Specific manifest encoding/hash helpers share the codec's private validation. */
+export function encodeFinitePackageManifest(value){return canonical(validateFinitePackageManifest(value));}
+export function hashFinitePackageManifest(value){return digest(MANIFEST_DOMAIN,encodeFinitePackageManifest(value));}
+function seedShape(s){
+ fields(s,['purpose','repository','repositoryId','intentId','sourceRevision','commandId','finalizer','build','manifest','qaPublication']);
+ if(s.purpose!==SEED||s.repository!=='tokenizartinfo-ops/agent-friendly-web'||s.repositoryId!==1347578006||!hex(s.intentId)||!hex(s.sourceRevision,40)||typeof s.commandId!=='string'||!/^[1-9][0-9]*$/.test(s.commandId))fail();
+ const f=fields(s.finalizer,['runId','attempt','jobId','workflowPath','seedStep']);
+ if(!positive(f.runId)||!positive(f.jobId)||f.attempt!==1||f.workflowPath!=='.github/workflows/afw-finite-finalizer.yml'||f.seedStep!=='seed-material')fail();
+ const b=fields(s.build,['workflowPath','runId','attempt','artifactId','artifactName','artifactDigest','manifestHash']);
+ if(b.workflowPath!=='.github/workflows/afw-finite-native-package.yml'||!positive(b.runId)||b.attempt!==1||!positive(b.artifactId)||b.artifactName!=='afw-finite-native-package-'+s.sourceRevision||typeof b.artifactDigest!=='string'||!/^sha256:[a-f0-9]{64}$/.test(b.artifactDigest)||!hex(b.manifestHash))fail();
+ const m=manifestShape(s.manifest);
+ if(m.sourceRevision!==s.sourceRevision||b.manifestHash!==digest(MANIFEST_DOMAIN,canonical(m)))fail();
+ const p=fields(s.qaPublication,['purpose','accountId','workerName','qaLive','qaClosed','observedAt']);
+ const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
+ if(p.purpose!=='afw.finite-qa-publication.v1'||p.accountId!=='85d0d5dadac3341a564f22ce885e9eec'||p.workerName!==QA_CLOUD_CLOSED_PINS.qaClosed.name||!Number.isSafeInteger(p.observedAt)||p.observedAt<0||p.observedAt>8640000000000000)fail();
+ for(const role of ['qaLive','qaClosed']){
+  const r=fields(p[role],['versionId',...(role==='qaLive'?['deploymentId']:[]),'module','configurationHash','publicStatic']);
+  if(!uuid(r.versionId)||role==='qaLive'&&!uuid(r.deploymentId)||!hex(r.configurationHash)||['module','publicStatic'].some(k=>canonical(r[k])!==canonical(m.modules[role][k])))fail();
+ }
+ if(p.qaLive.versionId===p.qaClosed.versionId||p.qaClosed.versionId!==QA_CLOUD_CLOSED_PINS.qaClosed.id)fail();
+ return s;
+}
+export function encodeFiniteMaterialSeed(seed){
+ const s=seedShape(snapshot(seed)),text=canonical({purpose:ENVELOPE,seed:s,seedHash:digest(SEED,canonical(s))});
+ if(bytes(text)>32768)fail();return text;
+}
+export function decodeFiniteMaterialSeed(text){
+ if(typeof text!=='string'||bytes(text)>32768)fail();
+ let parsed;try{parsed=JSON.parse(text);}catch{fail();}
+ const envelope=fields(snapshot(parsed),['purpose','seed','seedHash']);
+ if(envelope.purpose!==ENVELOPE||!hex(envelope.seedHash))fail();
+ const seed=seedShape(envelope.seed),encoded=encodeFiniteMaterialSeed(seed);
+ // Exact canonical equality also rejects duplicate (including escaped duplicate)
+ // JSON keys: parsing necessarily loses those bytes, so they cannot roundtrip.
+ if(text!==encoded||envelope.seedHash!==digest(SEED,canonical(seed)))fail();
+ return Object.freeze({seed,seedHash:envelope.seedHash});
+}
[Source lacks final newline: before=true, after=true; exact blob references control.]

~~~~~~~~~~

## lib/mcp-qa-finite-source-authority.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-source-authority.mjs b/lib/mcp-qa-finite-source-authority.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-source-authority.mjs
@@ -0,0 +1,6 @@
+export {qualifyFiniteSourcePackage,qualifyFiniteSourceRoleMetadata} from './mcp-qa-finite-profile.mjs';
+// Native5/4C2/4C3 require actual source constructors, native identity and custody.
+// No registration/caller pins/boolean success escape.
+const unavailable=()=>{throw Error('Finite source authority unavailable');};
+export const qualifyFiniteNativeSourceContext=unavailable;
+export const readFiniteNativeCustody=unavailable;

~~~~~~~~~~

## lib/mcp-qa-finite-source.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-source.mjs b/lib/mcp-qa-finite-source.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-source.mjs
@@ -0,0 +1,8 @@
+import {resolveFiniteNativePackage} from './mcp-qa-finite-package.mjs';
+
+/** Seed-material resolves factual package primaries only. Full native material
+ * assembly/profile qualification remains 4C; no caller plan or fixture fallback. */
+export async function resolvePrivateQaFiniteExternalSource({phase,sourceRevision,githubToken,fetchImpl,now,signal}={}){
+ if(phase!=='seed-material')throw Error('Finite source constructor unavailable');
+ return resolveFiniteNativePackage({sourceRevision,githubToken,fetchImpl,now,signal});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-stage-work.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-stage-work.mjs b/lib/mcp-qa-finite-stage-work.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-stage-work.mjs
@@ -0,0 +1,102 @@
+import {readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
+import {AsyncLocalStorage} from 'node:async_hooks';
+// INTERNAL factual retention only. This module neither issues nor validates a
+// publication admission. Fixed callers supply the exact already-consumed native
+// admission; another object/ctx lineage can only be denied, never authorised.
+const scopes=new AsyncLocalStorage(),outstanding=new WeakMap(),requestEntries=new WeakMap();
+const fail=()=>{throw Error('Finite stage work remains outstanding');};
+function released(entry){
+ if(entry.originalLease.signal.aborted&&entry.promises.size===0&&outstanding.get(entry.ctx)===entry){
+  outstanding.delete(entry.ctx);
+  if(requestEntries.get(entry.originalLease)===entry)requestEntries.delete(entry.originalLease);
+  entry.originalLease.signal.removeEventListener('abort',entry.release);
+ }
+}
+/** Retain the ACTUAL native operation, before a caller races its deadline. */
+export function retainFiniteOwnerStagePromise(promise){
+ if(!(promise instanceof Promise))fail();
+ const entry=scopes.getStore();if(!entry)return promise;
+ if(outstanding.get(entry.ctx)!==entry)fail();
+ entry.promises.add(promise);
+ const settled=()=>{entry.promises.delete(promise);released(entry);};
+ promise.then(settled,settled);
+ return promise;
+}
+/** Scope a fixed source-owned continuation; no capability is returned or minted.
+ * Uses only run/getStore and native Promise chains. It does not cross an RPC or
+ * isolate boundary and cannot substitute for T5 durable/all-path writer inventory.
+ */
+export function observeFiniteOwnerStageWork({ctx,env,admission,originalLease},operation){
+ originalLease.assertCurrent();admission.lease.assertCurrent();
+ if(originalLease.signal.aborted||admission.lease.signal.aborted)fail();
+ let entry=outstanding.get(ctx);
+ if(entry&&(entry.mode!=='owner'||entry.admission!==admission||entry.originalLease!==originalLease||entry.env!==env||entry.storage!==ctx.storage||entry.db!==env.RELEASE_DB))fail();
+ if(!entry){
+  entry={mode:'owner',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,admission,originalLease,promises:new Set(),release:null};
+  entry.release=()=>released(entry);
+  outstanding.set(ctx,entry);
+  originalLease.signal.addEventListener('abort',entry.release,{once:true});
+ }
+ return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
+}
+
+/** Continue only an already-owned source observation scope. No capability or
+ * new admission is created; the exact original parent and holders must match. */
+export function continueFiniteOwnerStageWork({ctx,env,originalLease},operation){
+ const entry=outstanding.get(ctx);
+ if(!entry||entry.mode!=='owner'||entry.originalLease!==originalLease||entry.env!==env||entry.storage!==ctx.storage||entry.db!==env.RELEASE_DB||typeof operation!=='function')fail();
+ originalLease.assertCurrent();entry.admission.lease.assertCurrent();
+ if(originalLease.signal.aborted||entry.admission.lease.signal.aborted)fail();
+ return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
+}
+
+/** Internal retention scope only: does not create or validate an admission. */
+export function observeFiniteReadOnlyWork({ctx,env,originalLease},operation){
+ if(!ctx||!env||typeof operation!=='function'||outstanding.has(ctx))fail();
+ originalLease.assertCurrent();
+ if(originalLease.signal.aborted)fail();
+ const entry={mode:'read-only',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,originalLease,promises:new Set(),release:null};
+ entry.release=()=>released(entry);
+ outstanding.set(ctx,entry);
+ originalLease.signal.addEventListener('abort',entry.release,{once:true});
+ return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
+}
+
+const matching=(entry,ctx,env,root)=>entry.ctx===ctx&&entry.env===env&&entry.storage===ctx.storage&&entry.db===env.RELEASE_DB&&entry.originalLease===root;
+/** Non-authorizing lifetime bookkeeping at actual native request entry. */
+export function observeFiniteOwnerRequestWork({ctx,env,originalLease},operation){
+ if(!ctx||!env||typeof operation!=='function')fail();
+ const context=readFiniteOwnerRequestContext(originalLease);
+ if(context.root!==originalLease||outstanding.has(ctx))fail();
+ const entry={mode:'request',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,originalLease,promises:new Set(),release:null};
+ entry.release=()=>released(entry);outstanding.set(ctx,entry);requestEntries.set(originalLease,entry);
+ originalLease.signal.addEventListener('abort',entry.release,{once:true});
+ return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
+}
+/** Fixed factual reader borrows ONLY its ambient genuine request lineage.
+ * The supplied readonly lease keeps its shortened/child guard. */
+export function observeFiniteFactualReadWork({ctx,env,originalLease,requestLease},operation){
+ if(typeof operation!=='function')fail();
+ originalLease.assertCurrent();if(originalLease.signal.aborted)fail();
+ const context=readFiniteOwnerRequestContext(requestLease),entry=outstanding.get(ctx);
+ if(!entry){if(requestEntries.has(context.root))fail();return observeFiniteReadOnlyWork({ctx,env,originalLease},operation);}
+ const check=()=>{
+  originalLease.assertCurrent();const live=readFiniteOwnerRequestContext(requestLease);
+  if(originalLease.signal.aborted||scopes.getStore()!==entry||outstanding.get(ctx)!==entry||!['request','owner'].includes(entry.mode)||live.root!==context.root||!matching(entry,ctx,env,context.root))fail();
+  if(entry.mode==='owner'){entry.admission.lease.assertCurrent();if(entry.admission.lease.signal.aborted)fail();}
+ };
+ check();
+ return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(()=>{check();return operation();})));
+}
+/** Bookkeeping only. Fixed transport MUST first consume its real one-use stage
+ * admission. This helper cannot authenticate a business admission. */
+export function adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},operation){
+ originalLease.assertCurrent();admission.lease.assertCurrent();
+ if(originalLease.signal.aborted||admission.lease.signal.aborted||typeof operation!=='function')fail();
+ const entry=outstanding.get(ctx);
+ if(!entry)return observeFiniteOwnerStageWork({ctx,env,admission,originalLease},operation);
+ const context=readFiniteOwnerRequestContext(originalLease);
+ if(context.root!==originalLease||entry.mode!=='request'||scopes.getStore()!==entry||!matching(entry,ctx,env,originalLease))fail();
+ entry.mode='owner';entry.admission=admission;
+ return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
+}

~~~~~~~~~~

## lib/mcp-qa-finite-trial-control.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-trial-control.mjs b/lib/mcp-qa-finite-trial-control.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-trial-control.mjs
@@ -0,0 +1,455 @@
+import {finiteLauncherInstanceId,validateFiniteLaunchPolicy,validateFiniteLaunchPrepared,validateFiniteChildCreateSend,validateFiniteChildCreateAck,hashFiniteLaunchRecord} from './mcp-qa-finite-launch-records.mjs';
+import {validateFiniteChildPrimary} from './mcp-finite-child-primary.mjs';
+import {validateFiniteModule,finiteCleanupPolicyHash} from './mcp-finite-cleanup-policy.mjs';
+import {createHash} from 'node:crypto';
+import {PRIVATE_QA_CLOSED_FLAGS} from './mcp-qa-closed-context.mjs';
+import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';
+
+const ROOT='afw.qa-finite-trial.v1',HEAD=ROOT+':head',SLOT='afw-own-successor-closure-v1';
+const LEGACY='afw.canary-restoration-control.v1';
+const LEGACY_KEYS=[LEGACY,'afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1','afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1'];
+const RELEASE_FLAGS=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
+const FACTS=['subscription','process','saved_event'];
+const EFFECTS=['nominal','withdraw','close','seal','canary_restore','qa_restore'];
+const pins=new WeakMap();
+const fail=()=>{throw Error('Private finite trial unavailable');};
+const hash=s=>createHash('sha256').update(s).digest('hex');
+const digest=(domain,value)=>hash(domain+'\n'+JSON.stringify(value));
+const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
+const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
+const id=v=>typeof v==='string'&&/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(v);
+const number=v=>Number.isSafeInteger(v)&&v>0;
+const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
+function data(v,k){if(!v||typeof v!=='object')fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
+function fields(v,keys){
+ if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
+ return Object.freeze(Object.fromEntries(keys.map(k=>[k,data(v,k)])));
+}
+function literal(v,depth=0,budget={nodes:0,bytes:0}){
+ if(++budget.nodes>4096||depth>16)fail();
+ if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
+ if(typeof v==='string'){budget.bytes+=Buffer.byteLength(v);if(budget.bytes>49152)fail();return v;}
+ if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
+ const out=Array.isArray(v)?[]:{};
+ for(const k of Reflect.ownKeys(v)){if(Array.isArray(v)&&k==='length')continue;if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k))fail();out[k]=literal(data(v,k),depth+1,budget);}
+ if(Array.isArray(v)&&(out.length!==v.length||Object.keys(out).length!==out.length))fail();
+ return Object.freeze(out);
+}
+function json(raw,max=49152){
+ if(typeof raw!=='string'||Buffer.byteLength(raw)>max)fail();const v=JSON.parse(raw);if(JSON.stringify(v)!==raw)fail();return literal(v);
+}
+function method(v,key){
+ for(let p=v,n=0;p&&n<32;p=Object.getPrototypeOf(p),n++){
+  const d=Object.getOwnPropertyDescriptor(p,key);if(d){if(!Object.hasOwn(d,'value')||typeof d.value!=='function')fail();return d.value;}
+ }
+ fail();
+}
+function legacy(plan,at){
+ const p=plan.legacy,c=fields(json(p.control),['purpose','planHash','policy','armedAt','withdrawnAt']),policy=parseCanaryRestorationPolicy(c.policy);
+ if(c.armedAt<policy.startAt-600000||c.armedAt>=policy.expiresAt||c.purpose!==LEGACY||hash(JSON.stringify(c))!==p.controlHash||hash(c.policy)!==c.planHash||!time(c.armedAt)||!time(c.withdrawnAt)||c.withdrawnAt<c.armedAt||c.withdrawnAt>at||policy.expiresAt>at)fail();
+ const prepared=fields(json(p.preparedDispatch),['purpose','planHash','withdrawalHash','phase','issuedAt','completedAt','dispatchPolicyHash']);
+ const reduced=fields(json(p.reductionDispatch),['purpose','planHash','withdrawalHash','phase','issuedAt','completedAt']);
+ if(prepared.purpose!==LEGACY_KEYS[1]||reduced.purpose!==LEGACY_KEYS[2]||prepared.phase!=='issued'||prepared.completedAt!==null||reduced.phase!=='complete'||!time(reduced.completedAt)||reduced.completedAt<reduced.issuedAt||reduced.completedAt>at||reduced.completedAt>=policy.expiresAt||hash(JSON.stringify(prepared))!==p.preparedDispatchHash||hash(JSON.stringify(reduced))!==p.reductionDispatchHash)fail();
+ for(const j of [prepared,reduced])if(j.planHash!==c.planHash||!hex(j.withdrawalHash)||!time(j.issuedAt)||j.issuedAt<c.armedAt||j.issuedAt>=policy.expiresAt||j.issuedAt>at)fail();
+ if(prepared.withdrawalHash!==reduced.withdrawalHash||!hex(prepared.dispatchPolicyHash)||p.restoration!==null||p.retirement!==null)fail();
+ return [c,prepared,reduced,undefined,undefined];
+}
+function previousLegacy(value){
+ const previous=fields(value,['control','controlHash','preparedDispatch','preparedDispatchHash','reductionDispatch','reductionDispatchHash','restoration','retirement','sourceRevision','sourceHash']);
+ if(['controlHash','preparedDispatchHash','reductionDispatchHash','sourceHash'].some(k=>!hex(previous[k]))||!hex(previous.sourceRevision,40))fail();
+ return previous;
+}
+/** Read-only exact legacy decoder; no control, claim or fabricated full plan. */
+export function validatePrivateQaFiniteLegacy(value){
+ const input=fields(value,['legacy','T0']);if(!time(input.T0))fail();
+ const previous=previousLegacy(literal(input.legacy));legacy({legacy:previous},input.T0);return previous;
+}
+function parsePlan(raw){
+ const p=fields(json(raw),['purpose','intentId','command','source','trialId','grantHash','monitorHash','eventPlanHash','bundleHash','T0','N1','C0','C1','R1','resources','deployments','canaryContainment','selectors','withdrawalPolicyHash','closePolicyHash','launchPolicy','workflows','finalizer','legacy']);
+ if(p.purpose!=='afw.qa-finite-trial-plan.v1'||!id(p.intentId)||['trialId','grantHash','monitorHash','eventPlanHash','bundleHash','withdrawalPolicyHash','closePolicyHash'].some(k=>!hex(p[k])))fail();
+ const command=fields(p.command,['kind','id','createdAt','repository','sourceRevision']);
+ const source=fields(p.source,['revision','tree','moduleHash','profileHash','bindingsHash']);
+ if(command.kind!=='finite_native_confirmation'||!id(command.id)||command.repository!=='tokenizartinfo-ops/agent-friendly-web'||command.createdAt!==p.T0||command.sourceRevision!==source.revision||!hex(source.revision,40)||!hex(source.tree,40)||['moduleHash','profileHash','bindingsHash'].some(k=>!hex(source[k])))fail();
+ if(['T0','N1','C0','C1','R1'].some(k=>!time(p[k]))||p.N1!==p.T0+300000||p.C0!==p.N1-60000||p.C1!==p.N1+120000||p.R1!==p.N1+180000)fail();
+ const resources=fields(p.resources,['actorId','containerId','applicationId','namespaceId','qaD1Id','releaseD1Id','canaryActorId']);
+ if(['actorId','containerId','canaryActorId'].some(k=>!hex(resources[k]))||!hex(resources.namespaceId,32)||!hex(resources.applicationId,32)||['qaD1Id','releaseD1Id'].some(k=>!uuid(resources[k]))||resources.qaD1Id===resources.releaseD1Id)fail();
+ const deployments=fields(p.deployments,['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed']);
+ for(const d of Object.values(deployments)){fields(d,['versionId','deploymentId','configurationHash','module']);validateFiniteModule(d.module);if(!uuid(d.versionId)||!uuid(d.deploymentId)||!hex(d.configurationHash))fail();}
+ if(deployments.qaLive.versionId===deployments.qaClosed.versionId||deployments.canaryLive.versionId===deployments.canaryClosed.versionId)fail();
+ const canaryContainment=fields(p.canaryContainment,['sourceRevision','runtimeVersionId','moduleHash','profileHash','bindingsHash']);
+ if(!hex(canaryContainment.sourceRevision,40)||canaryContainment.runtimeVersionId!==deployments.canaryLive.versionId||['moduleHash','profileHash','bindingsHash'].some(k=>!hex(canaryContainment[k])))fail();
+ const selectors=fields(p.selectors,['grantId','subject','projectId','clientId','resource','consentHash','programHash','sourceRevision','startAt','expiresAt','saveIdempotencyKey','expectedProjectRevision','goal']);
+ if(['grantId','subject','projectId','clientId'].some(k=>!id(selectors[k]))||typeof selectors.resource!=='string'||selectors.resource.length>256||!/^https:\/\/[A-Za-z0-9./_-]+$/.test(selectors.resource)||!hex(selectors.consentHash)||!hex(selectors.programHash)||!hex(selectors.sourceRevision,40)||!time(selectors.startAt)||!time(selectors.expiresAt)||selectors.startAt>p.T0||selectors.expiresAt<=p.T0||selectors.expiresAt-selectors.startAt>600000||!uuid(selectors.saveIdempotencyKey)||!number(selectors.expectedProjectRevision)||selectors.expectedProjectRevision>=Number.MAX_SAFE_INTEGER||!['discovery','content'].includes(selectors.goal)||hash(selectors.grantId)!==p.grantHash)fail();
+ if(deployments.qaLive.module.sha256!==source.moduleHash||deployments.canaryLive.module.sha256!==canaryContainment.moduleHash||p.closePolicyHash!==finiteCleanupPolicyHash(p))fail();
+ const launchPolicy=validateFiniteLaunchPolicy({T0:p.T0,launchPolicy:p.launchPolicy});
+ const workflows=fields(p.workflows,['confirmation','bootstrap','launcher']);
+ if(workflows.confirmation!=='afw-release-'+p.bundleHash||!id(workflows.bootstrap)||workflows.launcher!==finiteLauncherInstanceId({intentId:p.intentId,sourceRevision:source.revision})||workflows.bootstrap===workflows.launcher)fail();
+ const finalizer=fields(p.finalizer,['repository','runId','attempt','jobId','workflow','sourceRevision','readyStep']);
+ if(finalizer.repository!==command.repository||!number(finalizer.runId)||finalizer.attempt!==1||!number(finalizer.jobId)||finalizer.workflow!=='afw-finite-finalizer'||finalizer.sourceRevision!==source.revision||finalizer.readyStep!=='admit-and-ready')fail();
+ const previous=previousLegacy(p.legacy);
+ const result=literal({...p,command,source,resources,deployments,canaryContainment,selectors,launchPolicy,workflows,finalizer,legacy:previous});legacy(result,p.T0);
+ if(JSON.stringify(result)!==raw)fail();return result;
+}
+
+/** Narrow read-only reuse of the canonical strict decoder; no control/claim. */
+export function readPrivateQaFinitePlan(raw){const plan=parsePlan(raw);return Object.freeze({plan,planHash:digest(plan.purpose,plan)});}
+
+function createControlDecoder({p,pin,planHash,selectorsHash,controlHash,prefix,info,current}){
+ const expectedLegacy=legacy(p,p.T0);
+ function identity(v){
+  if(v.intentId!==p.intentId||v.planHash!==planHash||v.sourceRevision!==p.source.revision||v.runtimeVersionId!==pin.snapshot.runtimeVersionId||v.actorId!==p.resources.actorId)fail();
+ }
+ function fresh(at,current){if(!time(at)||at<p.T0||at>current||current-at>5000)fail();}
+ function admission(value,at,owned=false){
+  const v=fields(literal(value),['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','observedAt','command','source','resources','deployments','legacyControlHash','legacyPreparedHash','legacyReductionHash','legacySourceHash','retainedUncertainty','containment','quiescence','consent']);
+  identity(v);fresh(v.observedAt,at);
+  if(v.purpose!=='afw.qa-finite-primary.v1'||!same(v.command,p.command)||!same(v.source,p.source)||!same(v.resources,p.resources)||!same(v.deployments,p.deployments)||v.legacyControlHash!==p.legacy.controlHash||v.legacyPreparedHash!==p.legacy.preparedDispatchHash||v.legacyReductionHash!==p.legacy.reductionDispatchHash||v.legacySourceHash!==p.legacy.sourceHash||v.retainedUncertainty!==true)fail();
+  const c=fields(v.containment,['entrypoint','finiteEntrypoint','sourceRevision','runtimeVersionId','sourceHash','profileHash','bindingsHash','denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired','evidenceHash']);
+  if(c.entrypoint!=='legacy_saved_event'||c.finiteEntrypoint!=='finite_trial_event'||c.sourceRevision!==p.canaryContainment.sourceRevision||c.runtimeVersionId!==p.canaryContainment.runtimeVersionId||c.sourceHash!==p.canaryContainment.moduleHash||c.profileHash!==p.canaryContainment.profileHash||c.bindingsHash!==p.canaryContainment.bindingsHash||['denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired'].some(k=>c[k]!==true)||!hex(c.evidenceHash))fail();
+  const q=fields(v.quiescence,['currentWriters','newScopeWriters','unresolvedWrites','completeInventory','inventoryHash','receiptsHash','snapshotHash']);
+  if(!owned&&(q.currentWriters!==0||q.newScopeWriters!==0||q.unresolvedWrites!==0)||['currentWriters','newScopeWriters','unresolvedWrites'].some(k=>!Number.isSafeInteger(q[k])||q[k]<0||q[k]>3)||q.completeInventory!==true||['inventoryHash','receiptsHash','snapshotHash'].some(k=>!hex(q[k])))fail();
+  const cns=fields(v.consent,['grantHash','monitorHash','selectorsHash','valid','expiresAt']);
+  if(cns.grantHash!==p.grantHash||cns.monitorHash!==p.monitorHash||cns.selectorsHash!==selectorsHash||typeof cns.valid!=='boolean'||!time(cns.expiresAt)||cns.expiresAt>p.selectors.expiresAt)fail();
+  return v;
+ }
+ function ready(value,at){
+  const v=fields(literal(value),['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','observedAt','repository','runId','attempt','workflow','status','job','admission','evidenceHash']);
+  identity(v);fresh(v.observedAt,at);
+  if(v.purpose!=='afw.qa-finite-finalizer-ready.v1'||['repository','runId','attempt','workflow','sourceRevision'].some(k=>v[k]!==p.finalizer[k])||v.status!=='in_progress'||!hex(v.evidenceHash))fail();
+  const j=fields(v.job,['id','status','startedAt','steps']);if(j.id!==p.finalizer.jobId||j.status!=='in_progress'||!time(j.startedAt)||j.startedAt<p.T0||j.startedAt>at||!Array.isArray(j.steps)||j.steps.length!==1)fail();
+  const step=fields(j.steps[0],['name','status','conclusion','startedAt','completedAt']);
+  if(step.name!==p.finalizer.readyStep||step.status!=='completed'||step.conclusion!=='success'||!time(step.startedAt)||!time(step.completedAt)||step.startedAt<j.startedAt||step.completedAt<step.startedAt||step.completedAt>at)fail();
+  const a=fields(v.admission,['commandId','controlPlanHash','R1','resourceHash','custodyHash','validatedAt']);
+  if(a.commandId!==p.command.id||a.controlPlanHash!==planHash||a.R1!==p.R1||a.resourceHash!==digest('afw.qa-finite-resources.v1',p.resources)||!hex(a.custodyHash)||!time(a.validatedAt)||a.validatedAt<step.startedAt||a.validatedAt>step.completedAt||at>=p.R1)fail();
+  return v;
+ }
+ function fact(value,kind,at){
+  const common=['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','selectorsHash','observedAt','candidates'];
+  const extra=kind==='subscription'?['subscriptionId','processGeneration','expiresAt','receiptHash']:kind==='process'?['processGeneration','manifestHash','receiptHash']:['eventId','revision','fingerprint','subscriptionReceiptHash','processReceiptHash','receiptHash'];
+  const v=fields(literal(value),[...common,...extra]);identity(v);fresh(v.observedAt,at);
+  if(v.purpose!=='afw.qa-finite-'+kind+'.v1'||v.selectorsHash!==selectorsHash||v.candidates!==1||!hex(v.receiptHash))fail();
+  if(kind==='subscription'&&(!id(v.subscriptionId)||!id(v.processGeneration)||!time(v.expiresAt)||v.expiresAt<=at||v.expiresAt>Math.min(p.N1,p.selectors.expiresAt)))fail();
+  if(kind==='process'&&(!id(v.processGeneration)||!hex(v.manifestHash)))fail();
+  if(kind==='saved_event'){
+   const event=hash(JSON.stringify(['afw.own-synthetic-save.v1',p.selectors.subject,p.selectors.projectId,p.selectors.saveIdempotencyKey]));
+   const fingerprint=hash(JSON.stringify(['afw.own-synthetic-save.v1',p.selectors.grantId,p.selectors.expectedProjectRevision,p.selectors.goal]));
+   if(v.eventId!==event||v.revision!==p.selectors.expectedProjectRevision+1||v.fingerprint!==fingerprint||!hex(v.subscriptionReceiptHash)||!hex(v.processReceiptHash))fail();
+  }
+  // Observation time is evidence freshness, not identity of the immutable fact.
+  return literal(Object.fromEntries(Object.entries(v).filter(([k])=>k!=='observedAt')));
+ }
+ function factRecord(v,kind){
+  const r=fields(v,['purpose','intentId','controlHash','kind','factHash','observedAt','fact']);
+  if(!same(fact({...r.fact,observedAt:r.observedAt},kind,r.observedAt),r.fact))fail();
+  if(r.purpose!==ROOT+':fact'||r.intentId!==p.intentId||r.controlHash!==controlHash||r.kind!==kind||!time(r.observedAt)||r.observedAt<p.T0||r.observedAt>=p.N1||r.factHash!==digest(ROOT+':fact:'+kind,r.fact))fail();
+  return r;
+ }
+ async function state({get,list}){
+      for(let i=0;i<LEGACY_KEYS.length;i++)if(!same(await get(LEGACY_KEYS[i]),expectedLegacy[i]))fail();
+      if((await list('afw.qa-generation-')).size)fail();
+      const rows=await list(ROOT+':'),head=rows.get(HEAD);
+      if(head===undefined){if(rows.size)fail();return null;}
+      if(!same(head,{purpose:HEAD,intentId:p.intentId,controlHash,planHash})||!same(rows.get(prefix+'info'),info))fail();
+      const allowed=new Set([HEAD,prefix+'info',prefix+'control',prefix+'ready',...FACTS.flatMap(k=>[prefix+'fact:'+k,prefix+'capture:'+k]),...EFFECTS.map(k=>prefix+'effect:'+k)]);
+      for(const key of rows.keys())if(!allowed.has(key))fail();
+      const c=fields(rows.get(prefix+'control'),['purpose','controlHash','phase','pendingAt','armedAt','withdrawnAt']);
+      if(c.purpose!==ROOT+':control'||c.controlHash!==controlHash||!['pending','armed'].includes(c.phase)||!time(c.pendingAt)||c.pendingAt<p.T0||p.N1-c.pendingAt<180000||c.pendingAt>current()||c.armedAt!==null&&(!time(c.armedAt)||c.armedAt<c.pendingAt||p.N1-c.armedAt<180000||c.armedAt>current())||c.phase==='pending'&&c.armedAt!==null||c.phase==='armed'&&c.armedAt===null||c.withdrawnAt!==null&&(!time(c.withdrawnAt)||c.withdrawnAt<c.pendingAt||c.withdrawnAt>current()))fail();
+      if(c.phase==='armed'){const evidence=rows.get(prefix+'ready');if(!evidence||evidence.controlHash!==controlHash||evidence.hash!==digest(ROOT+':ready',evidence.value))fail();ready(evidence.value,c.armedAt);}
+      const facts={};
+      for(const k of FACTS){const v=rows.get(prefix+'fact:'+k);if(v!==undefined){facts[k]=factRecord(v,k);const claim=rows.get(prefix+'capture:'+k);if(!same(claim,{controlHash,kind:k,factHash:facts[k].factHash,phase:'issued'}))fail();}}
+      for(const k of FACTS){
+       const attempt=rows.get(prefix+'capture:'+k);
+       if(attempt!==undefined){fields(attempt,['controlHash','kind','factHash','phase']);if(attempt.controlHash!==controlHash||attempt.kind!==k||!hex(attempt.factHash)||attempt.phase!=='issued')fail();}
+      }
+      for(const k of EFFECTS){
+       const e=rows.get(prefix+'effect:'+k);if(e===undefined)continue;
+       fields(e,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
+       const deadline=k==='nominal'?e.deadline:k==='qa_restore'?p.R1:p.C1;
+       if(!time(deadline)||k==='nominal'&&deadline>Math.min(p.N1,p.selectors.expiresAt))fail();
+       if(e.purpose!==ROOT+':effect'||e.intentId!==p.intentId||e.controlHash!==controlHash||e.kind!==k||e.phase!=='issued'||!time(e.issuedAt)||e.issuedAt<c.pendingAt||e.issuedAt>=deadline||e.issuedAt>current()||e.deadline!==deadline||(['canary_restore','qa_restore'].includes(k)?!hex(e.proofHash):e.proofHash!==null))fail();
+      }
+      const canary=rows.get(prefix+'effect:canary_restore'),qa=rows.get(prefix+'effect:qa_restore');
+      if(canary&&qa&&canary.proofHash!==qa.proofHash)fail();
+      return {rows,control:c,facts};
+ }
+ return {admission,ready,fact,fresh,state};
+}
+
+/** PRIVATE constructor-only coherence pin. Call ONLY from the native DO with its
+ * actual ctx/env and compiled revision. Branding prevents DTO impersonation; it
+ * does not establish binding class/resource provenance. The fixed primary producer
+ * must independently correlate deployed module, bindings and profile. Reads no
+ * custody value and never freezes/clones env. This module is not mounted as RPC. */
+export function createPrivateQaFiniteTrialNativePin(options){
+ const keys=['ctx','env','sourceRevision'],o=fields(options,keys),{ctx,env,sourceRevision}=o;
+ if(!hex(sourceRevision,40)||!ctx||!ctx.storage||!ctx.id)fail();
+ const storage=ctx.storage,actor=ctx.id,actorString=method(actor,'toString');
+ const ns=data(env,'AFW_INDEPENDENT_CLOSURE'),idFromName=method(ns,'idFromName');
+ const metadata=data(env,'AFW_QA_VERSION'),version=data(metadata,'id');
+ const releaseDb=data(env,'RELEASE_DB'),node=data(env,'AFW_RELEASE_EVENTS_NODE');
+ if(!uuid(version)||!releaseDb||!node)fail();
+ const actorId=Reflect.apply(actorString,actor,[]),expected=Reflect.apply(idFromName,ns,[SLOT]);
+ if(!hex(actorId)||Reflect.apply(method(expected,'toString'),expected,[])!==actorId)fail();
+ let invalid=false;
+ const check=()=>{
+  try{
+   if(invalid)fail();const c=fields(options,keys);if(keys.some(k=>c[k]!==o[k])||ctx.storage!==storage||ctx.id!==actor||method(actor,'toString')!==actorString||Reflect.apply(actorString,actor,[])!==actorId||data(env,'AFW_INDEPENDENT_CLOSURE')!==ns||method(ns,'idFromName')!==idFromName||data(env,'AFW_QA_VERSION')!==metadata||data(metadata,'id')!==version||data(env,'RELEASE_DB')!==releaseDb||data(env,'AFW_RELEASE_EVENTS_NODE')!==node||RELEASE_FLAGS.some(k=>data(env,k)!=='true')||PRIVATE_QA_CLOSED_FLAGS.some(k=>data(env,k)!=='false'))fail();
+   const expectedNow=Reflect.apply(idFromName,ns,[SLOT]);if(Reflect.apply(method(expectedNow,'toString'),expectedNow,[])!==actorId)fail();
+  }catch{invalid=true;fail();}
+ };
+ check();const token=Object.freeze({});pins.set(token,{storage,check,snapshot:Object.freeze({actorId,runtimeVersionId:version,sourceRevision})});return token;
+}
+function observation(status,details={}){
+ return Object.freeze({purpose:'afw.qa-finite-trial-result.v1',status,...details,authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
+}
+/** INTERNAL unmounted control. All producer methods are trusted fixed capabilities,
+ * never public RPC parameters. Task2/4 must install concrete source-qualified
+ * primary producers; this validator does not fabricate their evidence.
+ * prepare is one attempt; pending/unknown permits cleanup but never nominal work.
+ * Nominal claims also require the SAME instance's acknowledged prepare. Restart /
+ * hibernation deliberately loses this eligibility, never restarts the command.
+ * Returned claims are journal facts, not a substitute for the caller's native
+ * authorization and per-effect primary check immediately before its single send. */
+export function createPrivateQaFiniteTrialControl(options){
+ const keys=['storage','nativePin','plan','readPrimary','now','timeoutMs'],o=fields(options,keys);
+ const {storage,nativePin,plan:raw,readPrimary,now,timeoutMs}=o,p=parsePlan(raw),pin=pins.get(nativePin);
+ if(!pin||pin.storage!==storage||typeof now!=='function'||!number(timeoutMs)||timeoutMs>5000)fail();
+ const primaryKeys=['admission','finalizer','subscription','process','savedEvent','effect',...(Object.hasOwn(readPrimary??{},'nominal')?['nominal']:[])],primary=fields(readPrimary,primaryKeys);
+ if(primaryKeys.some(k=>typeof primary[k]!=='function'))fail();
+ const storageKeys=['transaction','get','getAlarm'],methods=Object.fromEntries(storageKeys.map(k=>[k,method(storage,k)]));
+ const planHash=digest(p.purpose,p),selectorsHash=digest('afw.qa-finite-selectors.v1',p.selectors),prefix=ROOT+':'+p.intentId+':';
+ const info=literal({purpose:ROOT+':info',intentId:p.intentId,planHash,plan:raw,native:pin.snapshot});
+ const controlHash=digest(ROOT+':control-hash',info);
+ if(pin.snapshot.actorId!==p.resources.actorId||pin.snapshot.runtimeVersionId!==p.deployments.qaLive.versionId||pin.snapshot.sourceRevision!==p.source.revision)fail();
+ let invalid=false,lastGlobal=-1,acknowledgedPrepare=false;
+ const coherent=()=>{
+  try{
+   if(invalid)fail();pin.check();const c=fields(options,keys);if(keys.some(k=>c[k]!==o[k])||storageKeys.some(k=>method(storage,k)!==methods[k]))fail();
+   const next=fields(readPrimary,primaryKeys);if(primaryKeys.some(k=>next[k]!==primary[k]))fail();
+  }catch{invalid=true;fail();}
+ };
+ coherent();
+ async function invoke(operation,args){
+  if(!(['capture','claim','reconcile'].includes(operation)?args.length===1:args.length===0))return observation('blocked');
+  const kind=args[0];if(operation==='capture'&&!FACTS.includes(kind)||['claim','reconcile'].includes(operation)&&!EFFECTS.includes(kind))return observation('blocked');
+  let issued=false,finished=false,timer,lastWall,lastMono,cleanupEnd=null,nominalRequired=false,nominalEnd=Math.min(p.N1,p.selectors.expiresAt);const enteredMono=performance.now();
+  const current=()=>{
+   coherent();const at=now(),mono=performance.now();
+   if(at<lastGlobal||at<lastWall||mono<lastMono){invalid=true;fail();}
+   if(cleanupEnd!==null&&at>=cleanupEnd)fail();
+   if(nominalRequired&&(at>=nominalEnd||operation==='prepare'&&p.N1-at<180000))fail();
+   if(finished||!time(at)||at<p.T0||at<lastGlobal||at<lastWall||at>=lastWallStart+timeoutMs||!Number.isFinite(mono)||mono<lastMono||mono-enteredMono>=timeoutMs)fail();
+   lastGlobal=at;lastWall=at;lastMono=mono;return at;
+  };
+  let lastWallStart;
+  const work=async()=>{
+   try{
+    coherent();lastWallStart=now();lastWall=lastWallStart;lastMono=enteredMono;current();
+    const decode=createControlDecoder({p,pin,planHash,selectorsHash,controlHash,prefix,info,current});
+    const {admission,ready,fact,fresh}=decode;
+    const bounded=async fn=>{current();const v=await fn();current();return v;};
+    const readPrimaryFixed=name=>bounded(()=>Reflect.apply(primary[name],readPrimary,[]));
+    const nominalWindow=()=>{nominalRequired=true;return current();};
+    const armWindow=()=>{const at=nominalWindow();if(p.N1-at<180000)fail();return at;};
+    const checkConsent=v=>{nominalEnd=Math.min(nominalEnd,v.consent.expiresAt);if(v.consent.valid!==true)fail();nominalWindow();};
+    const tx=async fn=>bounded(()=>Reflect.apply(methods.transaction,storage,[async t=>{
+     const ks=['get','put','list','setAlarm'],m=Object.fromEntries(ks.map(k=>[k,method(t,k)]));
+     const check=()=>{current();if(ks.some(k=>method(t,k)!==m[k]))fail();};
+     const get=async k=>{check();const v=await Reflect.apply(m.get,t,[k]);check();return v;};
+     const put=async(k,v)=>{check();issued=true;await Reflect.apply(m.put,t,[k,v]);check();};
+     const list=async pre=>{check();const v=await Reflect.apply(m.list,t,[{prefix:pre,limit:65}]);check();if(!(v instanceof Map)||v.size>64)fail();return v;};
+     const state=()=>decode.state({get,list});
+     return fn({get,put,state,setAlarm:async at=>{check();issued=true;await Reflect.apply(m.setAlarm,t,[at]);check();}});
+    }]));
+    const readState=()=>tx(async({state})=>state());
+    const details=s=>({intentId:p.intentId,controlHash,planHash,phase:s.control.phase,withdrawnAt:s.control.withdrawnAt,T0:p.T0,N1:p.N1,C0:p.C0,C1:p.C1,R1:p.R1});
+    if(operation==='preview'){
+     armWindow();const a=admission(await readPrimaryFixed('admission'),armWindow());checkConsent(a);
+     return projectPrivateQaFiniteReferences({plan:p,planHash,controlHash});
+    }
+    if(operation==='prepare'){
+     armWindow();const a=admission(await readPrimaryFixed('admission'),armWindow());checkConsent(a);
+     await tx(async({state,put,setAlarm})=>{
+      armWindow();if(await state())fail();armWindow();
+      await put(prefix+'info',info);await put(prefix+'control',{purpose:ROOT+':control',controlHash,phase:'pending',pendingAt:armWindow(),armedAt:null,withdrawnAt:null});
+      await put(HEAD,{purpose:HEAD,intentId:p.intentId,controlHash,planHash});await setAlarm(p.C0);
+     });
+     // Independent readback, not the transaction's returned objects.
+     const stored=await bounded(()=>Reflect.apply(methods.get,storage,[prefix+'info']));
+     if(!same(stored,info)||await bounded(()=>Reflect.apply(methods.getAlarm,storage,[]))!==p.C0)fail();
+     const again=admission(await readPrimaryFixed('admission'),armWindow());checkConsent(again);
+     const final=ready(await readPrimaryFixed('finalizer'),armWindow());
+     const s=await tx(async({state,put})=>{
+      armWindow();const s=await state();if(!s||s.control.phase!=='pending'||s.control.withdrawnAt!==null||s.rows.has(prefix+'ready'))fail();
+      armWindow();const c={...s.control,phase:'armed',armedAt:armWindow()};
+      await put(prefix+'ready',{controlHash,hash:digest(ROOT+':ready',final),value:final});await put(prefix+'control',c);return {...s,control:c};
+     });armWindow();return observation('armed',details(s));
+    }
+    if(operation==='read'){
+     const s=await readState();if(!s)return observation('absent');let nominalEligible=false;
+     if(acknowledgedPrepare&&s.control.phase==='armed'&&s.control.withdrawnAt===null&&!s.rows.has(prefix+'effect:nominal')&&current()<Math.min(p.N1,p.selectors.expiresAt)){
+      const a=admission(await readPrimaryFixed('admission'),current());ready(await readPrimaryFixed('finalizer'),current());checkConsent(a);nominalEligible=true;
+     }
+     return observation('observed',{...details(s),nominalEligible,facts:literal(s.facts)});
+    }
+    if(operation==='read_nominal'||operation==='read_launch'){
+     nominalWindow();const s=await readState(),claim=s?.rows.get(prefix+'effect:nominal');
+     if(!s||s.control.phase!=='armed'||s.control.withdrawnAt!==null||!claim)fail();
+     // The existing durable claim proves acknowledged prepare was consumed.
+     // nominalEligible=false after that claim is not denial of its children.
+     const child=primary.nominal?validateFiniteChildPrimary({control:{plan:p,planHash,controlHash},value:await readPrimaryFixed('nominal'),now:current}):null;
+     const a=admission(child?child.primary:await readPrimaryFixed('admission'),current(),child!==null);checkConsent(a);
+     if(operation==='read_launch')ready(await readPrimaryFixed('finalizer'),current());
+     const again=await readState();nominalWindow();
+     if(again.control.phase!=='armed'||again.control.withdrawnAt!==null||!same(again.rows.get(prefix+'effect:nominal'),claim))fail();
+     return observation('observed',{value:literal({purpose:'afw.qa-finite-nominal-control.v1',intentId:p.intentId,controlHash,planHash,sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,observedAt:current(),phase:'armed',withdrawnAt:null,claim,claimHash:digest(ROOT+':effect',claim),ownedWriters:child?.ownedWriters??[],consent:{grantHash:p.grantHash,monitorHash:p.monitorHash,expiresAt:a.consent.expiresAt,valid:true}})});
+    }
+    if(operation==='withdraw'){
+     const s=await tx(async({state,put})=>{const s=await state();if(!s)fail();if(s.control.withdrawnAt!==null)return s;
+      if(current()>=p.R1)fail();const c={...s.control,withdrawnAt:current()};await put(prefix+'control',c);return {...s,control:c};});
+     return observation('withdrawn',details(s));
+    }
+    if(operation==='capture'){
+     nominalWindow();const a=admission(await readPrimaryFixed('admission'),current());checkConsent(a);
+     const value=await readPrimaryFixed(kind==='saved_event'?'savedEvent':kind);nominalWindow();
+     if(value===null)return observation('not_yet_observed');
+     const observedAt=current(),actual=fact(value,kind,observedAt);
+     const correlate=async()=>{
+      if(kind==='subscription')return {};
+      const sv=await readPrimaryFixed('subscription');if(sv===null)fail();
+      const subscription=fact(sv,'subscription',nominalWindow());let process=null;
+      if(kind==='saved_event'){const pv=await readPrimaryFixed('process');if(pv===null)fail();process=fact(pv,'process',nominalWindow());if(subscription.processGeneration!==process.processGeneration)fail();}
+      return {subscription,process};
+     };
+     const related=await correlate(),factHash=digest(ROOT+':fact:'+kind,actual);
+     const record=literal({purpose:ROOT+':fact',intentId:p.intentId,controlHash,kind,factHash,observedAt,fact:actual});
+     const first=await tx(async({state,put})=>{
+      nominalWindow();const s=await state();if(!s||s.control.phase!=='armed'||s.control.withdrawnAt!==null)fail();
+      if(kind!=='subscription'&&(!s.facts.subscription||!same(s.facts.subscription.fact,related.subscription)))fail();
+      if(kind==='process'&&s.facts.subscription.fact.processGeneration!==actual.processGeneration)fail();
+      if(kind==='saved_event'&&(!s.facts.subscription||!s.facts.process||!same(s.facts.process.fact,related.process)||actual.subscriptionReceiptHash!==s.facts.subscription.fact.receiptHash||actual.processReceiptHash!==s.facts.process.fact.receiptHash))fail();
+      const previous=s.facts[kind];if(previous){if(previous.factHash!==factHash||!same(previous.fact,actual))fail();return 'observed';}
+      const claim=s.rows.get(prefix+'capture:'+kind);if(claim!==undefined){if(!same(claim,{controlHash,kind,factHash,phase:'issued'}))fail();return 'reconcile_only';}
+      await put(prefix+'capture:'+kind,{controlHash,kind,factHash,phase:'issued'});return 'new';
+     });
+     if(first!=='new')return observation(first,{controlHash,kind,factHash});
+     const again=await readPrimaryFixed(kind==='saved_event'?'savedEvent':kind);
+     if(again===null||!same(fact(again,kind,nominalWindow()),actual)||!same(await correlate(),related))fail();
+     await tx(async({state,put})=>{
+      nominalWindow();const s=await state();if(!s||s.control.withdrawnAt!==null||s.facts[kind]||!same(s.rows.get(prefix+'capture:'+kind),{controlHash,kind,factHash,phase:'issued'}))fail();
+      await put(prefix+'fact:'+kind,record);
+     });return observation('captured',{controlHash,kind,factHash});
+    }
+    if(operation==='claim'){
+     let proofHash=null;
+     if(kind==='nominal'){
+      const a=admission(await readPrimaryFixed('admission'),nominalWindow());checkConsent(a);ready(await readPrimaryFixed('finalizer'),current());
+     }else if(['canary_restore','qa_restore'].includes(kind)){
+      // Task2/3 trusted producers supply retained validated proof correlation;
+      // arbitrary caller evidence is never accepted here.
+      const e=await bounded(()=>Reflect.apply(primary.effect,readPrimary,[kind]));
+      const v=fields(literal(e),['purpose','intentId','controlHash','kind','proofHash','observedAt','eligible','evidenceHash']);
+      if(v.purpose!=='afw.qa-finite-effect-eligibility.v1'||v.intentId!==p.intentId||v.controlHash!==controlHash||v.kind!==kind||!hex(v.proofHash)||v.eligible!==true||!hex(v.evidenceHash))fail();fresh(v.observedAt,current());proofHash=v.proofHash;
+     }
+     const s=await tx(async({state,put})=>{
+      const s=await state();if(!s)fail();const previous=s.rows.get(prefix+'effect:'+kind);
+      if(previous!==undefined)return {s,previous};
+      if(kind==='nominal'&&(!acknowledgedPrepare||s.control.phase!=='armed'||s.control.withdrawnAt!==null))fail();
+      const deadline=kind==='nominal'?nominalEnd:kind==='qa_restore'?p.R1:p.C1;
+      // Retain the original cleanup end through the issued write and its ACK.
+      // Existing claims return above; documentary reconciliation stays read-only after expiry.
+      if(kind!=='nominal')cleanupEnd=deadline;if(current()>=deadline)fail();
+      if(proofHash){const other=s.rows.get(prefix+'effect:'+(kind==='canary_restore'?'qa_restore':'canary_restore'));if(other&&other.proofHash!==proofHash)fail();}
+      const claim=literal({purpose:ROOT+':effect',intentId:p.intentId,controlHash,kind,phase:'issued',issuedAt:current(),deadline,proofHash});
+      await put(prefix+'effect:'+kind,claim);return {s,claim};
+     });
+     return observation(s.previous?'reconcile_only':'issued',{...details(s.s),kind,claim:s.previous??s.claim});
+    }
+    const s=await readState();if(!s)fail();const claim=s.rows.get(prefix+'effect:'+kind);if(!claim)return observation('absent');
+    // GET-only producer owns exact receipt selection. Never updates/refunds claims.
+    const v=await bounded(()=>Reflect.apply(primary.effect,readPrimary,[kind]));
+    if(v===null)return observation('unresolved',{controlHash,kind});
+    const r=fields(literal(v),['purpose','intentId','controlHash','kind','claimHash','receiptHash','observedAt','outcome']);
+    if(r.purpose!=='afw.qa-finite-effect-receipt.v1'||r.intentId!==p.intentId||r.controlHash!==controlHash||r.kind!==kind||r.claimHash!==digest(ROOT+':effect',claim)||!hex(r.receiptHash)||r.outcome!=='complete')fail();fresh(r.observedAt,current());
+    return observation('reconciled',{controlHash,kind,receiptHash:r.receiptHash});
+   }catch{return observation(issued?'uncertain':'blocked');}
+  };
+  const deadline=operation==='read_launch'?null:new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(observation(issued?'uncertain':'blocked'));},timeoutMs);});
+  try{const result=operation==='read_launch'?await work():await Promise.race([work(),deadline]);current();if(operation==='prepare'&&result.status==='armed')acknowledgedPrepare=true;return result;}catch{return observation(issued?'uncertain':'blocked');}finally{finished=true;clearTimeout(timer);}
+ }
+ return Object.freeze({preview(...args){return invoke('preview',args);},prepare(...args){return invoke('prepare',args);},read(...args){return invoke('read',args);},readNominalControl(...args){return invoke('read_nominal',args);},readLaunchControl(...args){return invoke('read_launch',args);},captureObservedFacts(...args){return invoke('capture',args);},withdrawNominal(...args){return invoke('withdraw',args);},claimEffect(...args){return invoke('claim',args);},reconcileEffect(...args){return invoke('reconcile',args);}});
+}
+
+/** Technical view of already-derived canonical references, never authority. */
+export function projectPrivateQaFiniteReferences({plan:p,planHash,controlHash}){
+ if(!hex(planHash)||!hex(controlHash))fail();
+ return literal({purpose:'afw.qa-finite-material-preview.v1',intentId:p.intentId,sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,planHash,controlHash,resourceHash:digest('afw.qa-finite-resources.v1',p.resources),T0:p.T0,N1:p.N1,C0:p.C0,C1:p.C1,R1:p.R1});
+}
+
+/** Read-only actual storage snapshot, including true absence before the first
+ * HEAD. Uses the same strict decoder as control; never enters control.read.
+ * Serialisable returned facts confer no permission and carry no armed fiction. */
+export async function readPrivateQaFiniteControlSnapshot(options){
+ return readFiniteControlSnapshot(options,false);
+}
+/** Source-internal coordinator path only. The outer coordinator bounds its
+ * caller while this promise tracks the actual transaction until settlement.
+ * Every check retains the same original parent; no renewed authority. */
+export async function readPrivateQaFiniteControlSnapshotUnderCoordinator(options){
+ return readFiniteControlSnapshot(options,true);
+}
+async function readFiniteControlSnapshot(options,waitForSettlement){
+ const keys=['storage','nativePin','plan','parent'],o=fields(options,keys),{storage,nativePin,plan:raw,parent}=o;
+ const p=parsePlan(raw),pin=pins.get(nativePin);
+ if(!pin||pin.storage!==storage)fail();
+ const budget=fields(parent,['check','signal','deadline']);
+ if(typeof budget.check!=='function'||!(budget.signal instanceof AbortSignal)||!time(budget.deadline))fail();
+ const methods=Object.fromEntries(['transaction','get'].map(k=>[k,method(storage,k)]));
+ let finished=false,timer;
+ const current=()=>{
+  if(finished||budget.signal.aborted||fields(options,keys).parent!==parent||keys.some(k=>options[k]!==o[k])||['check','signal','deadline'].some(k=>parent[k]!==budget[k])||Object.keys(methods).some(k=>method(storage,k)!==methods[k]))fail();
+  pin.check();const at=budget.check();if(!time(at)||at<p.T0||at>=budget.deadline)fail();return at;
+ };
+ const entered=current();if(budget.deadline-entered>5000)fail();
+ const planHash=digest(p.purpose,p),selectorsHash=digest('afw.qa-finite-selectors.v1',p.selectors),prefix=ROOT+':'+p.intentId+':';
+ const info=literal({purpose:ROOT+':info',intentId:p.intentId,planHash,plan:raw,native:pin.snapshot}),controlHash=digest(ROOT+':control-hash',info);
+ if(pin.snapshot.actorId!==p.resources.actorId||pin.snapshot.runtimeVersionId!==p.deployments.qaLive.versionId||pin.snapshot.sourceRevision!==p.source.revision)fail();
+ const decode=createControlDecoder({p,pin,planHash,selectorsHash,controlHash,prefix,info,current});
+ const work=()=>Reflect.apply(methods.transaction,storage,[async tx=>{
+  current();const getMethod=method(tx,'get'),listMethod=method(tx,'list'),alarmMethod=method(tx,'getAlarm');
+  const check=()=>{current();if(method(tx,'get')!==getMethod||method(tx,'list')!==listMethod||method(tx,'getAlarm')!==alarmMethod)fail();};
+  const get=async key=>{check();const v=await Reflect.apply(getMethod,tx,[key]);check();return v;};
+  const list=async prefix=>{check();const v=await Reflect.apply(listMethod,tx,[{prefix,limit:65}]);check();if(!(v instanceof Map)||v.size>64)fail();return v;};
+  const state=await decode.state({get,list});check();
+  const alarm=await Reflect.apply(alarmMethod,tx,[]);check();if(alarm!==null&&!time(alarm))fail();
+  const journalPrefix='afw.qa-finite-child-create.v1:'+p.intentId+':',journal=await list('afw.qa-finite-child-create.v1:');
+  for(const k of journal.keys())if(!['prepared','send','ack'].some(suffix=>k===journalPrefix+suffix))fail();
+  const record=(kind,validate)=>journal.has(journalPrefix+kind)?validate(journal.get(journalPrefix+kind)):null;
+  const prepared=record('prepared',validateFiniteLaunchPrepared),send=record('send',validateFiniteChildCreateSend),ack=record('ack',validateFiniteChildCreateAck);
+  const guardRows=await list('afw.qa-finite-guard.v1:');
+  const guardPrefix='afw.qa-finite-guard.v1:'+p.intentId+':';
+  if(!state&&guardRows.size)fail();
+  for(const key of guardRows.keys())if(![guardPrefix+'state',...['withdraw','close','seal','canary_restore'].map(k=>guardPrefix+'effect:'+k)].includes(key))fail();
+  const guard=guardRows.has(guardPrefix+'state')?fields(guardRows.get(guardPrefix+'state'),['purpose','controlHash','deliveries','state','nextAt']):null;
+  if(guard&&(guard.purpose!=='afw.finite-guard-state.v1'||guard.controlHash!==controlHash||!Number.isSafeInteger(guard.deliveries)||guard.deliveries<0||guard.deliveries>3||!['armed','processing','admin_pending','complete'].includes(guard.state)||guard.nextAt!==null&&(!time(guard.nextAt)||guard.nextAt<p.C0||guard.nextAt>=p.C1)))fail();
+  const nominalClaim=state?.rows.get(prefix+'effect:nominal')??null;
+  const identity={intentId:p.intentId,finitePlanHash:planHash,controlHash,sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,bundleHash:p.bundleHash};
+  for(const r of [prepared,send])if(r&&Object.keys(identity).some(k=>r[k]!==identity[k]))fail();
+  if(prepared){
+   if(!state||state.control.phase!=='armed'||!nominalClaim||!guard||prepared.nominalClaimHash!==digest(ROOT+':effect',nominalClaim)||prepared.guardStateHash!==hash(JSON.stringify(guard))||nominalClaim.issuedAt>prepared.preparedAt||prepared.preparedAt>current()||['armAckBy','launchAt','lastCreateAt'].some(k=>prepared[k]!==p.launchPolicy[k]))fail();
+  }
+  if(send&&(!prepared||send.preparedHash!==hashFiniteLaunchRecord(prepared)||send.nominalClaimHash!==prepared.nominalClaimHash||send.deadline!==p.launchPolicy.lastCreateAt||send.issuedAt<p.launchPolicy.launchAt||send.issuedAt>current()))fail();
+  if(ack&&(!send||ack.intentId!==p.intentId||ack.controlHash!==controlHash||ack.sendHash!==hashFiniteLaunchRecord(send)||ack.nominalId!==p.workflows.confirmation||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline||ack.acknowledgedAt>current()))fail();
+  const sorted=rows=>[...rows].sort(([a],[b])=>a<b?-1:a>b?1:0);
+  const controlRows=state?sorted(state.rows):[];
+  const controlSnapshotHash=digest('afw.qa-finite-control-snapshot.v1',{controlRows,guardRows:sorted(guardRows),alarm});
+  const journalSnapshotHash=digest('afw.qa-finite-launch-journal-snapshot.v1',sorted(journal));
+  check();return literal({control:{plan:p,planHash,controlHash},state:state?state.control:null,nominalClaim,guard,alarm,prepared,send,ack,cleanupStarted:EFFECTS.filter(k=>k!=='nominal').some(k=>state?.rows.has(prefix+'effect:'+k))||[...guardRows.keys()].some(k=>k!==guardPrefix+'state'),sealed:state?.rows.has(prefix+'effect:seal')===true||guardRows.has(guardPrefix+'effect:seal'),controlSnapshotHash,journalSnapshotHash});
+ }]);
+ const onAbort=()=>{finished=true;};
+ budget.signal.addEventListener('abort',onAbort,{once:true});
+ try{
+  const result=waitForSettlement?await work():await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;reject(Error('Private finite trial unavailable'));},budget.deadline-entered);})]);current();return result;
+ }finally{finished=true;clearTimeout(timer);budget.signal.removeEventListener('abort',onAbort);}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-trial-finalizer.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-trial-finalizer.mjs b/lib/mcp-qa-finite-trial-finalizer.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-trial-finalizer.mjs
@@ -0,0 +1,52 @@
+import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteHash as hash,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
+import {validateFiniteExternalPlan,validateFiniteObserverOutput,finiteSendRecord,finiteUuid} from './mcp-qa-finite-external-contract.mjs';
+const fail=()=>{throw Error('Finite QA finalizer unavailable');};
+/** Exact external consumer; readSnapshot is separately GET-only. claim is the
+ * durable GitHub send fence, NOT a native journal claim or readiness flag. */
+export function createPrivateQaFiniteTrialFinalizer({plan,readSnapshot,claim,deployClosed,now=Date.now,signal}={}){
+ const p=validateFiniteExternalPlan(plan),raw=JSON.stringify(p),v=p.preview;
+ if([readSnapshot,claim,deployClosed,now].some(f=>typeof f!=='function')||!(signal instanceof AbortSignal))fail();
+ let used=false;
+ return Object.freeze({async run(...args){
+  let finished=false,started=false,post=false,lastSnapshot;
+  const result=status=>Object.freeze({purpose:'afw.finite-qa-finalizer-result.v1',status,intentId:v.intentId,controlHash:v.controlHash,qaVersionId:lastSnapshot?.qaVersionId??null,qaDeploymentId:lastSnapshot?.qaDeploymentId??null,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
+  if(used)return result('consumed');used=true;
+  const entered=now(),origin=performance.now();let last=entered,lastMono=origin;
+  const check=()=>{const at=now(),mono=performance.now();if(finished||signal.aborted||args.length||JSON.stringify(plan)!==raw||!time(at)||at<last||at<v.T0||at>=v.R1||!Number.isFinite(mono)||mono<lastMono||mono-origin>=v.R1-entered)fail();last=at;lastMono=mono;return at;};
+  async function bounded(fn){
+   const begin=check(),mono=lastMono,child=new AbortController();let timer,ended=false;
+   const assert=()=>{check();if(ended||child.signal.aborted||last-begin>=5000||lastMono-mono>=5000)fail();};
+   const stop=()=>child.abort();signal.addEventListener('abort',stop,{once:true});
+   try{
+    const stopped=new Promise((_,reject)=>{timer=setTimeout(()=>{ended=true;child.abort();reject(Error('Finite finalizer stopped'));},Math.max(1,Math.min(5000,v.R1-begin)));});
+    const work=async()=>{assert();const value=await fn(child.signal,assert);assert();return value;};
+    return await Promise.race([work(),stopped]);
+   }finally{ended=true;clearTimeout(timer);signal.removeEventListener('abort',stop);child.abort();}
+  }
+  async function read(){
+   const begin=check(),r=fields(data(await bounded((s,a)=>readSnapshot(s,a))),['purpose','observedAt','qaVersionId','qaDeploymentId','output','restoreJobId','custodyExpiresAt','profilesVerified','namespacesPreserved','exposureDisabled','providerSettled','workflowsTerminal','primarySealedChainVerified','githubVerified','evidenceHash']);
+   check();if(r.purpose!=='afw.finite-qa-snapshot.v1'||!time(r.observedAt)||r.observedAt<begin||r.observedAt>last||!finiteUuid(r.qaVersionId)||!finiteUuid(r.qaDeploymentId)||!hex(r.evidenceHash)||!time(r.custodyExpiresAt)||r.custodyExpiresAt< v.R1||last>=r.custodyExpiresAt||['profilesVerified','namespacesPreserved','exposureDisabled','providerSettled','workflowsTerminal','primarySealedChainVerified','githubVerified'].some(k=>r[k]!==true))fail();
+   validateFiniteObserverOutput(r.output,p);
+   if(r.qaVersionId!==p.deployments.qaLive.versionId&&r.qaVersionId!==p.deployments.qaClosed.versionId||r.qaVersionId===p.deployments.qaLive.versionId&&r.qaDeploymentId!==p.deployments.qaLive.deploymentId)fail();
+   lastSnapshot=r;return r;
+  }
+  try{
+   check();const first=await read();
+   if(first.qaVersionId===p.deployments.qaClosed.versionId)return result('closed_observed');
+   const record=finiteSendRecord({plan:p,output:first.output,restoreJobId:first.restoreJobId,issuedAt:check()});
+   started=true;const issued=await bounded((s,a)=>claim(record,s,a));check();
+   if(issued!=='issued'){
+    // Unknown/existing authority is never retried, even when current job differs.
+    await read();return result(lastSnapshot.qaVersionId===p.deployments.qaClosed.versionId?'closed_observed_uncertain':'admin_pending');
+   }
+   const before=await read();check();
+   if(before.qaVersionId!==first.qaVersionId||before.qaDeploymentId!==first.qaDeploymentId||before.restoreJobId!==first.restoreJobId||!same(before.output,first.output))fail();
+   post=true;let ack;
+   try{ack=await bounded((s,a)=>deployClosed(Object.freeze({record,recordHash:hash(record)}),s,a));}catch{/* sole POST consumed; final read is independent */}
+   check();const after=await read();check();
+   if(after.qaVersionId!==p.deployments.qaClosed.versionId)return result('uncertain');
+   return result(finiteUuid(ack?.deploymentId)&&after.qaDeploymentId===ack.deploymentId?'restored_observed':'closed_observed_uncertain');
+  }catch{return result(post||started?'uncertain':'admin_pending');}
+  finally{finished=true;}
+ }});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-trial-guard.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-trial-guard.mjs b/lib/mcp-qa-finite-trial-guard.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-trial-guard.mjs
@@ -0,0 +1,142 @@
+import {createPrivateQaFiniteTrialNativePin} from './mcp-qa-finite-trial-control.mjs';
+import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteData as data,finiteSame as same,finiteControlIdentity} from './mcp-finite-evidence.mjs';
+import {createPrivateQaFiniteCleanupStore} from './mcp-qa-finite-cleanup-store.mjs';
+const PREFIX='afw.qa-finite-guard.v1:',SLOT='afw-own-successor-closure-v1';
+const EFFECTS=['withdraw','close','seal','canary_restore'];
+const fail=()=>{throw Error('Finite cleanup guard unavailable');};
+const out=(status,extra={})=>Object.freeze({status,...extra,mayRetry:false,authorizesEffects:false,operationalReadiness:false});
+let nativeFactory;
+/** Source composition only, never an RPC or env-selected callback. Task4's
+ * compiled native constructor supplies actual binding/source-qualified caps. */
+export function installPrivateQaFiniteNativeGuardFactory(factory){if(nativeFactory||typeof factory!=='function')fail();nativeFactory=factory;}
+function primary(value,c,at,arming){
+ const v=fields(data(value),['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','observedAt','command','source','resources','deployments','legacyControlHash','legacyPreparedHash','legacyReductionHash','legacySourceHash','retainedUncertainty','containment','quiescence','consent']),p=c.plan;
+ if(!same(v.command,p.command)||!same(v.source,p.source)||!same(v.resources,p.resources)||!same(v.deployments,p.deployments)||v.purpose!=='afw.qa-finite-primary.v1'||v.intentId!==p.intentId||v.planHash!==c.planHash||v.sourceRevision!==p.source.revision||v.runtimeVersionId!==p.deployments.qaLive.versionId||v.actorId!==p.resources.actorId||!time(v.observedAt)||v.observedAt>at||at-v.observedAt>5000||v.legacyControlHash!==p.legacy.controlHash||v.legacyPreparedHash!==p.legacy.preparedDispatchHash||v.legacyReductionHash!==p.legacy.reductionDispatchHash||v.legacySourceHash!==p.legacy.sourceHash||v.retainedUncertainty!==true)fail();
+ const x=fields(v.containment,['entrypoint','finiteEntrypoint','sourceRevision','runtimeVersionId','sourceHash','profileHash','bindingsHash','denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired','evidenceHash']);
+ if(x.entrypoint!=='legacy_saved_event'||x.finiteEntrypoint!=='finite_trial_event'||x.sourceRevision!==p.canaryContainment.sourceRevision||x.runtimeVersionId!==p.canaryContainment.runtimeVersionId||x.sourceHash!==p.canaryContainment.moduleHash||x.profileHash!==p.canaryContainment.profileHash||x.bindingsHash!==p.canaryContainment.bindingsHash||!hex(x.evidenceHash)||['denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired'].some(k=>x[k]!==true))fail();
+ const q=fields(v.quiescence,['currentWriters','newScopeWriters','unresolvedWrites','completeInventory','inventoryHash','receiptsHash','snapshotHash']);
+ if(q.completeInventory!==true||['inventoryHash','receiptsHash','snapshotHash'].some(k=>!hex(q[k]))||['currentWriters','newScopeWriters','unresolvedWrites'].some(k=>!Number.isSafeInteger(q[k])||q[k]<0||arming&&q[k]!==0))fail();return v;
+}
+function effectReceipt(kind,value,c,proofHash){
+ const r=data(value),p=c.plan;
+ if(kind==='withdraw'){
+  fields(r,['purpose','monitoringWithdrawn','readWithdrawn','permissionsWithdrawn','runtimeStopRequested','physicalStopVerified','nativeWithdrawalVerified','operationalReadiness']);
+  if(r.purpose!=='afw.own-permissions-only-reduction.v1'||r.monitoringWithdrawn!==true||r.readWithdrawn!==true||r.permissionsWithdrawn!==true||['runtimeStopRequested','physicalStopVerified','nativeWithdrawalVerified','operationalReadiness'].some(k=>r[k]!==false))fail();
+ }else if(kind==='close'){fields(r,['closed','runtimeStopRequested']);if(r.closed!==true||r.runtimeStopRequested!==true)fail();}
+ else if(kind==='seal'){fields(r,['sealHash','sealedAt']);if(!hex(r.sealHash)||!time(r.sealedAt)||r.sealedAt<p.T0||r.sealedAt>=p.C1)fail();}
+ else{
+  fields(r,['purpose','intentId','controlHash','proofHash','versionId','deploymentId','readbackHash','observedAt']);
+  if(r.purpose!=='afw.finite-canary-restored.v1'||r.intentId!==p.intentId||r.controlHash!==c.controlHash||r.proofHash!==proofHash||r.versionId!==p.deployments.canaryClosed.versionId||typeof r.deploymentId!=='string'||!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(r.deploymentId)||!hex(r.readbackHash)||!time(r.observedAt)||r.observedAt<p.C0||r.observedAt>=p.C1)fail();
+ }return r;
+}
+/** Fixed versioned adapter of alarm-before-action / issued-before-effect
+ * lifecycle. Legacy singleton keys and APIs are untouched. Third delivery
+ * durably exhausts recovery before effects, matching the existing lifecycle. */
+export function createPrivateQaFiniteTrialGuard({ctx,env,control,capabilities,now=Date.now}={}){
+ const caps=fields(capabilities,['identity','readPrimary','withdraw','close','seal','proof','canary_restore']),c=finiteControlIdentity(caps.identity),p=c.plan;
+ const storage=ctx?.storage,prefix=PREFIX+p.intentId+':',key=prefix+'state';
+ if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof storage?.getAlarm!=='function'||typeof now!=='function'||typeof control?.read!=='function'||typeof control?.claimEffect!=='function'||typeof control?.withdrawNominal!=='function'||typeof caps.readPrimary!=='function'||typeof caps.proof?.read!=='function')fail();
+ for(const k of EFFECTS){fields(caps[k],['execute','reconcile']);if(typeof caps[k].execute!=='function'||typeof caps[k].reconcile!=='function')fail();}
+ const store=createPrivateQaFiniteCleanupStore({storage,control:c,now}),transaction=storage.transaction,get=storage.get;let last=-1,tail=Promise.resolve();
+ const coherent=()=>{
+  const n=now();if(!time(n)||n<p.T0||n<last||ctx.storage!==storage||storage.transaction!==transaction||storage.get!==get||Object.keys(caps).some(k=>capabilities[k]!==caps[k]))fail();last=n;
+  // Captures actual native ctx/env; never normalize release flags or fake version.
+  createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision});
+  if(ctx.id.toString()!==p.resources.actorId||env.AFW_QA_VERSION.id!==p.deployments.qaLive.versionId)fail();return n;
+ };
+ function state(raw){
+  if(raw===undefined)return null;const s=fields(raw,['purpose','controlHash','deliveries','state','nextAt']);
+  if(s.purpose!=='afw.finite-guard-state.v1'||s.controlHash!==c.controlHash||!Number.isSafeInteger(s.deliveries)||s.deliveries<0||s.deliveries>3||!['armed','processing','admin_pending','complete'].includes(s.state)||s.nextAt!==null&&(!time(s.nextAt)||s.nextAt<p.C0||s.nextAt>=p.C1))fail();return s;
+ }
+ const serial=fn=>{const next=tail.then(fn);tail=next.catch(()=>{});return next.catch(()=>out('admin_pending'));};
+ async function exactControl(){const r=await control.read();coherent();if(r.status!=='observed'||r.controlHash!==c.controlHash||r.planHash!==c.planHash||r.intentId!==p.intentId)fail();return r;}
+ async function transact(fn){coherent();const result=await transaction.call(storage,async tx=>{coherent();const s=state(await tx.get(key));coherent();return fn(tx,s);});coherent();return result;}
+ async function status(){const s=state(await get.call(storage,key));return out(s?.state??'unarmed',{deliveries:s?.deliveries??0,nextAt:s?.nextAt??null});}
+ async function runEffect(kind,proofHash,check){
+  check();let claim=await control.claimEffect(kind);check();
+  if(!['issued','reconcile_only'].includes(claim.status)||claim.controlHash!==c.controlHash||claim.claim?.kind!==kind||claim.claim.controlHash!==c.controlHash||kind==='canary_restore'&&claim.claim.proofHash!==proofHash)return false;
+  const claimHash=hash(claim.claim),effectKey=prefix+'effect:'+kind;let existing=await storage.get(effectKey);check();
+  if(existing!==undefined){
+   fields(existing,['purpose','controlHash','kind','claimHash','phase','receipt','completedAt']);
+   if(existing.purpose!=='afw.finite-guard-effect.v1'||existing.controlHash!==c.controlHash||existing.kind!==kind||existing.claimHash!==claimHash||!['issued','complete'].includes(existing.phase))fail();
+   if(existing.phase==='complete'){effectReceipt(kind,existing.receipt,c,proofHash);return true;}
+  }
+  if(claim.status==='issued'){
+   if(existing!==undefined)fail();
+   existing={purpose:'afw.finite-guard-effect.v1',controlHash:c.controlHash,kind,claimHash,phase:'issued',receipt:null,completedAt:null};
+   await storage.transaction(async tx=>{check();if(await tx.get(effectKey)!==undefined)fail();check();await tx.put(effectKey,existing);check();});check();
+   // Claim and guard journal both acknowledged before the one business send.
+   try{await caps[kind].execute({claim:claim.claim,proofHash},check);}catch{/* Unknown send is reconciled only. */}
+   check();
+  }
+  // Execution return is NOT a completion receipt. Independent read-only
+  // reconciliation must establish exact settled primary effects/readback.
+  const value=await caps[kind].reconcile({claim:claim.claim,proofHash},check);check();if(value===null)return false;
+  const receipt=effectReceipt(kind,value,c,proofHash),completedAt=check();
+  await storage.transaction(async tx=>{check();const before=await tx.get(effectKey);check();if(existing!==undefined&&!same(before,existing)||existing===undefined&&before!==undefined)fail();await tx.put(effectKey,{purpose:'afw.finite-guard-effect.v1',controlHash:c.controlHash,kind,claimHash,phase:'complete',receipt,completedAt});check();});check();return true;
+ }
+ return Object.freeze({
+  arm:()=>serial(async()=>{
+   coherent();if(coherent()>=p.C0)fail();const r=await exactControl();if(r.phase!=='armed')fail();
+   primary(await caps.readPrimary(),c,coherent(),true);
+   const s=await transact(async(tx,old)=>{if(old)return old;const initial={purpose:'afw.finite-guard-state.v1',controlHash:c.controlHash,deliveries:0,state:'armed',nextAt:p.C0};await tx.put(key,initial);coherent();await tx.setAlarm(p.C0);coherent();return initial;});
+   if(await storage.getAlarm()!==s.nextAt)fail();coherent();return out(s.state,{deliveries:s.deliveries,nextAt:s.nextAt});
+  }),
+  status:()=>serial(status),
+  alarm:()=>serial(async()=>{
+   const entered=coherent(),mono=performance.now();if(entered>=p.C1)return out('admin_pending');
+   let finished=false,timer;const check=()=>{const n=coherent();if(finished||n>=p.C1||n-entered>=30000||performance.now()-mono>=30000)fail();return n;};
+   const work=async()=>{
+    await exactControl();check();
+    const reserved=await transact(async(tx,old)=>{
+     check();const s=old??{purpose:'afw.finite-guard-state.v1',controlHash:c.controlHash,deliveries:0,state:'armed',nextAt:p.C0};
+     if(s.state==='complete'||s.deliveries===3)return {done:s};
+     if(check()<p.C0){await tx.setAlarm(p.C0);return {done:s};}
+     const deliveries=s.deliveries+1,nextAt=deliveries<3?Math.min(p.C1-1,Math.max(check()+1000,p.C0+deliveries*60000)):null;
+     const next={...s,deliveries,state:deliveries===3?'admin_pending':'processing',nextAt};
+     await tx.put(key,next);check();if(nextAt!==null)await tx.setAlarm(nextAt);else {if(typeof tx.deleteAlarm!=='function')fail();await tx.deleteAlarm();}check();return {deliveries};
+    });check();if(reserved.done)return out(reserved.done.state,{deliveries:reserved.done.deliveries});
+    primary(await caps.readPrimary(),c,check(),false);
+    const withdrawn=await control.withdrawNominal();check();if(withdrawn.status!=='withdrawn')fail();
+    let settled=true;
+    for(const kind of ['withdraw','close','seal'])try{if(!await runEffect(kind,null,check))settled=false;}catch{settled=false;}
+    check();if(!settled)return out('admin_pending');
+    const proof=await caps.proof.read(check);check();if(proof.status!=='observed')return out('admin_pending');
+    // Re-read the actual retained record independently; never trust a callback's
+    // successful status or fabricate evidence after the native version closes.
+    const retained=await store.read();check();if(retained.status!=='observed'||!same(retained.record,proof.record))fail();
+    if(!await runEffect('canary_restore',retained.record.proofHash,check))return out('admin_pending');
+    const completion=await store.retainCompletion(check);check();if(completion.status!=='complete')return out('admin_pending');
+    await transact(async(tx,s)=>{check();if(!s||s.deliveries!==reserved.deliveries)fail();await tx.put(key,{...s,state:'complete',nextAt:null});check();if(typeof tx.deleteAlarm!=='function')fail();await tx.deleteAlarm();check();});
+    return out('complete',{receipt:completion.receipt,deliveries:reserved.deliveries});
+   };
+   try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(out('admin_pending'));},Math.min(30000,p.C1-entered));})]);}finally{finished=true;clearTimeout(timer);}
+  })
+ });
+}
+/** Fixed native actor dispatch. Missing source constructor is closed; Task4
+ * installs it in the compiled module, never in caller payload/env normalization. */
+export async function runPrivateQaFiniteTrialAlarm({ctx,env}={}){
+ try{
+  const ns=env.AFW_INDEPENDENT_CLOSURE;if(ctx.id.toString()!==ns.idFromName(SLOT).toString())return null;
+  const head=await ctx.storage.get('afw.qa-finite-trial.v1:head');if(head===undefined)return null;
+  if(!nativeFactory)return out('admin_pending');
+  const options=await nativeFactory({ctx,env,head});if(options.ctx!==ctx||options.env!==env)fail();
+  return createPrivateQaFiniteTrialGuard(options).alarm();
+ }catch{return out('admin_pending');}
+}
+
+/** Exact GET-only nominal view for candidate children. Native factory resolves
+ * actual primary consent and the existing control; RPC carries no claim bytes. */
+export async function readPrivateQaFiniteNominalControl({ctx,env,refs}={}){
+ const x=fields(refs,['intentId','controlHash']);
+ if(ctx.id.toString()!==env.AFW_INDEPENDENT_CLOSURE.idFromName(SLOT).toString()||!nativeFactory)fail();
+ const head=await ctx.storage.get('afw.qa-finite-trial.v1:head');
+ if(head?.intentId!==x.intentId||head.controlHash!==x.controlHash)fail();
+ const options=await nativeFactory({ctx,env,head});
+ if(options.ctx!==ctx||options.env!==env||typeof options.control?.readNominalControl!=='function')fail();
+ const c=finiteControlIdentity(options.capabilities.identity);
+ if(c.controlHash!==x.controlHash||c.plan.intentId!==x.intentId)fail();
+ createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:c.plan.source.revision});
+ return options.control.readNominalControl();
+}

~~~~~~~~~~

## scripts/build-finite-native-package.mjs

~~~~~~~~~~diff
diff --git a/scripts/build-finite-native-package.mjs b/scripts/build-finite-native-package.mjs
--- /dev/null
+++ b/scripts/build-finite-native-package.mjs
@@ -0,0 +1,109 @@
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {gzipSync} from 'node:zlib';
+import {execFile} from 'node:child_process';
+import {promisify} from 'node:util';
+import {fileURLToPath} from 'node:url';
+import {resolve} from 'node:path';
+import {readFile,mkdir,writeFile,realpath} from 'node:fs/promises';
+import {build} from 'esbuild';
+import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
+import {buildMcpNodeProgram} from './build-mcp-node-program.mjs';
+import {finiteWranglerProfileTemplate,finitePublicStaticExpectation} from '../lib/mcp-qa-finite-profile.mjs';
+const exec=promisify(execFile),hash=x=>createHash('sha256').update(x).digest('hex');
+const fail=()=>{throw Error('Finite native package unavailable');};
+const workflow='.github/workflows/afw-finite-native-package.yml';
+const bootstrapPaths={workflowHash:'.github/workflows/afw-finite-qa-bootstrap.yml',cliHash:'scripts/run-qa-finite-bootstrap.mjs'};
+// Acyclic residency: nodeM -> canaryM -> QA; never embed QA/package hashes.
+const roles=['canaryLive','qaLive'];
+const paths={qaLive:'wrangler.independent-closure-qa.finite.jsonc',canaryLive:'wrangler.mcp-own.finite.jsonc'};
+const expectedExports={qaLive:['IndependentClosure','PrivateQaBootstrap','PrivateQaCatalog','PrivateQaNamedConfirmation','PrivateQaPreregistration','default','observePrivateQa'],canaryLive:['AfwNodeControl','AfwOwnEventNode','default']};
+function options(v){
+ if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==2)fail();
+ for(const k of ['cwd','sourceRevision']){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value')||typeof d.value!=='string')fail();}
+ if(!/^[a-f0-9]{40}$/.test(v.sourceRevision))fail();return v;
+}
+async function inputs(cwd,revision){
+ const result={};
+ const origin=(await exec('git',['remote','get-url','origin'],{cwd,encoding:'utf8',timeout:10000})).stdout.trim();
+ if(!['https://github.com/tokenizartinfo-ops/agent-friendly-web','https://github.com/tokenizartinfo-ops/agent-friendly-web.git'].includes(origin))fail();
+ for(const path of [workflow,...Object.values(paths),...Object.values(bootstrapPaths)]){
+  const bytes=await readFile(resolve(cwd,path)),tracked=(await exec('git',['show',revision+':'+path],{cwd,encoding:null,timeout:10000,maxBuffer:1048576})).stdout;
+  if(!bytes.equals(tracked))fail();result[path]=hash(bytes);
+  const role=roles.find(r=>paths[r]===path);if(role)assert.deepEqual(JSON.parse(bytes),finiteWranglerProfileTemplate(role));
+ }return result;
+}
+/** Real compiler staging, deliberately NOT a package or deployment attestation.
+ * No provider, private policy, callback, caller pins or readiness flag accepted. */
+export async function compileFiniteNativeStaging(input){
+ try{
+  const {cwd:requestedCwd,sourceRevision}=options(input),cwd=await realpath(requestedCwd);
+  // Imported Node builder resolves its source beside this compiler. Restrict
+  // the exported API to that same physical checkout before any compilation;
+  // use the canonical path throughout so a caller alias cannot retarget inputs.
+  if(cwd!==await realpath(fileURLToPath(new URL('..',import.meta.url))))fail();
+  const before=await verifyMcpReleaseSource({cwd,sourceRevision}),inputBefore=await inputs(cwd,sourceRevision);
+  const node=await buildMcpNodeProgram(),files={},modules={},metafiles={};
+  if(hash(node.program)!==node.programHash)fail();
+  let candidateResidency;
+  for(const role of roles){
+   const config=finiteWranglerProfileTemplate(role),entry=config.main;
+   if(role==='qaLive'&&!candidateResidency)fail();
+   const compiled=await build({absWorkingDir:cwd,entryPoints:[entry],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,metafile:true,define:{
+    'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(sourceRevision),
+    'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(sourceRevision),
+    'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),
+    'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('finite_trial_event'),
+    ...(role==='qaLive'?{
+     'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':JSON.stringify(candidateResidency),
+     'globalThis.__AFW_FINITE_SOURCE_TREE__':JSON.stringify(before.tree),
+     'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':JSON.stringify({sourceRevision,sourceTree:before.tree,...Object.fromEntries(Object.entries(bootstrapPaths).map(([k,p])=>[k,inputBefore[p]]))}),
+    }:{}),
+   }});
+   const out=Object.values(compiled.metafile.outputs);
+   if(compiled.outputFiles.length!==1||out.length!==1)fail();
+   assert.deepEqual(out[0].exports.slice().sort(),expectedExports[role]);
+   const original=role==='qaLive'?'worker/independent-closure/index.mjs':'worker/mcp-own/index.mjs';
+   if(!compiled.metafile.inputs[entry]||!compiled.metafile.inputs[original])fail();
+   const bytes=compiled.outputFiles[0].contents;
+   const bootstrapInput='lib/mcp-qa-finite-bootstrap-source.mjs';
+   if(role==='qaLive'){
+    if(!compiled.metafile.inputs[bootstrapInput]||Object.values(bootstrapPaths).some(p=>!Buffer.from(bytes).includes(Buffer.from(inputBefore[p]))))fail();
+   }else if(compiled.metafile.inputs[bootstrapInput])fail();
+   if(Object.keys(compiled.metafile.inputs).some(p=>['bootstrap-issuer','build-finite-native-package','node_modules/esbuild'].some(name=>p.includes(name))))fail();
+   if(bytes.length<1||bytes.length>(role==='canaryLive'?2097152:3145728))fail();
+   const decoder='lib/mcp-qa-finite-candidate-residency.mjs';
+   if(role==='canaryLive'){
+    if(compiled.metafile.inputs[decoder])fail();
+    const compressed=gzipSync(bytes,{level:9,mtime:0});
+    if(compressed.length>2098176)fail();
+    candidateResidency=Object.freeze({purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision,sourceTree:before.tree,sourceCheck:'git-inputs-before-after-v1',programHash:node.programHash,module:Object.freeze({name:'index.mjs',sha256:hash(bytes),bytes:bytes.length}),compressedSha256:hash(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')});
+   }else if(!compiled.metafile.inputs[decoder]||!Buffer.from(bytes).includes(Buffer.from(candidateResidency.content)))fail();
+   files[role+'/index.mjs']=Buffer.from(bytes);
+   modules[role]={provenance:{kind:'compiled-source.v1',sourceRevision,sourceTree:before.tree},module:{name:'index.mjs',sha256:hash(bytes),bytes:bytes.length,exports:out[0].exports.slice().sort()},publicStatic:finitePublicStaticExpectation(role)};
+   metafiles[role]=compiled.metafile;
+  }
+  const after=await verifyMcpReleaseSource({cwd,sourceRevision});assert.deepEqual(after,before);assert.deepEqual(await inputs(cwd,sourceRevision),inputBefore);
+  return {purpose:'afw.finite-native-compiler-staging.v1',sourceRevision,sourceTree:after.tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:inputBefore[workflow],bootstrapSource:{sourceRevision,sourceTree:after.tree,...Object.fromEntries(Object.entries(bootstrapPaths).map(([k,p])=>[k,inputBefore[p]]))},modules,files,metafiles,candidateResidency,completePackage:false,operationalReadiness:false};
+ }catch{fail();}
+}
+/** Complete-package boundary. Deliberately no positive path until separately
+ * reviewed historical input custody/privacy and actual native mounts qualify.
+ * Class exports and successful compilation are insufficient evidence. */
+export async function buildFiniteNativePackage(input){
+ options(input);
+ await compileFiniteNativeStaging(input);
+ // No exact approved historical artifact locator/normalized metadata exists.
+ // Native5 launcher, 4C2 factories, 4C3 receiver/nominal and rollback compatibility
+ // are also missing. Do not accept a caller boolean, callback or artifact path.
+ fail();
+}
+if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
+ if(process.argv.length!==3&&!(process.argv.length===4&&process.argv[2]==='--staging'))fail();
+ const staging=process.argv[2]==='--staging',sourceRevision=process.argv[staging?3:2],cwd=fileURLToPath(new URL('..',import.meta.url));
+ const built=staging?await compileFiniteNativeStaging({cwd,sourceRevision}):await buildFiniteNativePackage({cwd,sourceRevision});
+ // Separate isolated staging namespace; never eligible artifact name/layout.
+ const root=resolve(cwd,staging?'output/finite-native-staging':'output/finite-native-package');
+ for(const [path,bytes] of Object.entries(built.files)){const target=resolve(root,path);await mkdir(resolve(target,'..'),{recursive:true});await writeFile(target,bytes);}
+ if(staging){const evidence={...built};delete evidence.files;delete evidence.metafiles;evidence.candidateResidency={...built.candidateResidency};delete evidence.candidateResidency.content;await writeFile(resolve(root,'staging.json'),JSON.stringify(evidence,null,2)+'\n');}
+}

~~~~~~~~~~

## scripts/mcp-qa-finite-custody-receipt.json

~~~~~~~~~~diff
diff --git a/scripts/mcp-qa-finite-custody-receipt.json b/scripts/mcp-qa-finite-custody-receipt.json
--- /dev/null
+++ b/scripts/mcp-qa-finite-custody-receipt.json
@@ -0,0 +1,25 @@
+{
+  "purpose": "afw.finite-gha-custody-receipt.v1",
+  "accountId": "85d0d5dadac3341a564f22ce885e9eec",
+  "tokenKind": "account",
+  "tokenId": "9db7901af95faf07e6f7ef378045328e",
+  "metadataObservedAt": "2026-11-01T17:25:31.664Z",
+  "identityObservedAt": "2026-11-01T17:22:52.954Z",
+  "notBefore": null,
+  "expiresAt": "2026-11-08T02:59:59Z",
+  "policyHash": "340050c28f3f4b3d05515d7191a9246f4cfbaa8d73671ee7571c2203519a752b",
+  "permissionGroupIds": [
+    "1b68681d11f443a4979c6d08c3211f13",
+    "7e79ec33834341f28dd431ab73884400",
+    "cfd39eebc07c4e3ea849e4b3d2644637",
+    "da1261c3d38544a4bba805b22566f8b6"
+  ],
+  "sourceQualification": "dated-static-policy-with-unchanged-policy-operator-assumption",
+  "scopeVerified": false,
+  "identityEvidence": {
+    "runId": 41331162110,
+    "jobId": 124921374025,
+    "artifactId": 13093321173
+  },
+  "metadataEvidence": "issue497#6561492793 / root primary2026-11-01T17:25:31.664Z"
+}

~~~~~~~~~~

## scripts/qa-finite-pre-entry-custody-wrapper.mjs

~~~~~~~~~~diff
diff --git a/scripts/qa-finite-pre-entry-custody-wrapper.mjs b/scripts/qa-finite-pre-entry-custody-wrapper.mjs
--- /dev/null
+++ b/scripts/qa-finite-pre-entry-custody-wrapper.mjs
@@ -0,0 +1,76 @@
+import {IndependentClosure as BaselineClosure,PrivateQaBootstrap as BaselineBootstrap} from './closed-rollback.mjs';
+import {custodyContext} from './pre-entry-custody-context.mjs';
+import {readFinitePreEntryCustody} from '../lib/mcp-qa-finite-initial-custody-probe.mjs';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+export {PrivateQaNamedConfirmation,PrivateQaPreregistration,default} from './closed-rollback.mjs';
+
+const slot='afw-own-successor-closure-v1';
+const purpose='afw.qa-pre-entry-custody.v1';
+const policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
+const fail=()=>{throw Error('Closed pre-entry custody unavailable');};
+const blocked=()=>({purpose,status:'blocked',authorizesEffects:false,operationalReadiness:false,mayRetry:false});
+const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+function fields(v,keys){
+ if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
+ for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}
+ return v;
+}
+function guard(env,id,source,minimum){
+ const c=fields(custodyContext,['purpose','id','sourceRevision','baselineVersionId','baselineModuleHash','startAt','expiresAt']);
+ if(c.purpose!=='afw.qa-pre-entry-custody-context.v1'||!hex(c.id,64)||id!==c.id||!hex(c.sourceRevision,40)||source!==c.sourceRevision||c.baselineVersionId!=='c570b60b-95dc-48e1-89f3-9c4651691dbc'||c.baselineModuleHash!=='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f'||!Number.isSafeInteger(c.startAt)||!Number.isSafeInteger(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000)fail();
+ const ns=env.AFW_INDEPENDENT_CLOSURE,version=env.AFW_QA_VERSION,versionId=version?.id;
+ if(!ns||typeof ns.get!=='function'||typeof ns.idFromName!=='function'||typeof versionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(versionId))fail();
+ let wall=Date.now(),mono=performance.now();
+ const check=()=>{
+  const w=Date.now(),m=performance.now();
+  if(!Number.isSafeInteger(w)||!Number.isFinite(m)||w<wall||m<mono||w<c.startAt||w+minimum>=c.expiresAt||env.AFW_INDEPENDENT_CLOSURE!==ns||env.AFW_QA_VERSION!==version||version.id!==versionId)fail();
+  wall=w;mono=m;
+  for(const key of PRIVATE_QA_CLOSED_FLAGS)if(env[key]!=='false')fail();
+  for(const key of policies)if(env[key]!=='')fail();
+ };
+ check();return{check,ns,versionId};
+}
+function receipt(r){
+ fields(r,['purpose','status','reader','publisher','guardVerified','scopeVerified','authorizesEffects','operationalReadiness','mayRetry']);
+ if(r.purpose!==purpose||r.status!=='observed'||r.guardVerified!==true||r.scopeVerified!==false||r.authorizesEffects!==false||r.operationalReadiness!==false||r.mayRetry!==false)fail();
+ for(const v of [r.reader,r.publisher]){
+  fields(v,['status','expiresAt','notBefore']);
+  const expiry=typeof v.expiresAt==='string'?Date.parse(v.expiresAt):NaN,notBefore=v.notBefore===null?null:typeof v.notBefore==='string'?Date.parse(v.notBefore):NaN;
+  if(v.status!=='active'||!Number.isSafeInteger(expiry)||expiry<=Date.now()||new Date(expiry).toISOString()!==v.expiresAt||notBefore!==null&&(!Number.isSafeInteger(notBefore)||notBefore>Date.now()||new Date(notBefore).toISOString()!==v.notBefore))fail();
+ }
+ return r;
+}
+function observation(r){
+ if(!r||r.status!=='observed'||r.guardVerified!==true||r.scopeVerified!==false||r.authorizesEffects!==false||r.operationalReadiness!==false)fail();
+ return receipt({purpose,status:'observed',reader:r.reader,publisher:r.publisher,guardVerified:true,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
+}
+export class IndependentClosure extends BaselineClosure{
+ async readPreEntryCustody(...args){
+  try{
+   if(args.length!==2)fail();
+   const g=guard(this.env,args[0],args[1],15000),ctx=this.ctx,env=this.env,storage=ctx.storage,actor=ctx.id;
+   if(actor.toString()!==g.ns.idFromName(slot).toString())fail();
+   const value=await readFinitePreEntryCustody({ctx,env});
+   g.check();if(this.ctx!==ctx||this.env!==env||ctx.storage!==storage||ctx.id!==actor||actor.toString()!==g.ns.idFromName(slot).toString())fail();
+   return JSON.stringify(observation(value));
+  }catch{return JSON.stringify(blocked());}
+ }
+}
+export class PrivateQaBootstrap extends BaselineBootstrap{
+ async run(event,step){
+  let p=event?.payload;try{if(typeof p==='string'&&new TextEncoder().encode(p).length<=256)p=JSON.parse(p);}catch{/* Preserve the inherited closed handler. */}
+  if(p?.operation!=='inspect_pre_entry_custody')return super.run(event,step);
+  try{
+   fields(p,['operation','observationId']);
+   const g=guard(this.env,p.observationId,custodyContext.sourceRevision,15000),stamp=event.timestamp instanceof Date?event.timestamp.getTime():NaN,started=Date.now(),origin=performance.now();
+   if(event.instanceId!=='afw-qa-custody-'+custodyContext.id||!Number.isSafeInteger(stamp)||stamp>started||started-stamp>=15000||typeof step?.do!=='function')fail();
+   let executed=false;
+   const value=await step.do('inspect-pre-entry-custody',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'15 seconds'},async()=>{
+    if(executed)fail();executed=true;g.check();
+    const actor=g.ns.get(g.ns.idFromName(slot)),raw=await actor.readPreEntryCustody(custodyContext.id,custodyContext.sourceRevision);g.check();if(typeof raw!=='string'||new TextEncoder().encode(raw).length>2048)fail();return raw;
+   });
+   g.check();if(!executed||Date.now()-stamp>=15000||performance.now()-origin>=15000||typeof value!=='string'||new TextEncoder().encode(value).length>2048)fail();
+   return receipt(JSON.parse(value));
+  }catch{return blocked();}
+ }
+}

~~~~~~~~~~

## scripts/run-qa-finite-bootstrap.mjs

~~~~~~~~~~diff
diff --git a/scripts/run-qa-finite-bootstrap.mjs b/scripts/run-qa-finite-bootstrap.mjs
--- /dev/null
+++ b/scripts/run-qa-finite-bootstrap.mjs
@@ -0,0 +1,17 @@
+import process from 'node:process';
+import {readFile} from 'node:fs/promises';
+import {pathToFileURL} from 'node:url';
+import {validateQaBootstrapCommand} from '../lib/mcp-qa-finite-bootstrap-admission.mjs';
+import {issueFiniteQaBootstrap} from '../lib/mcp-qa-finite-bootstrap-issuer.mjs';
+/** Original source CLI only. No artifact/pin/clock/provider URL inputs. */
+export async function runFiniteQaBootstrapCli(){
+ const e=process.env,raw=await readFile(e.GITHUB_EVENT_PATH,'utf8');
+ if(Buffer.byteLength(raw)>262144)throw Error('Finite QA bootstrap unavailable');
+ const event=JSON.parse(raw),context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,eventName:e.GITHUB_EVENT_NAME,runId:e.GITHUB_RUN_ID,runAttempt:e.GITHUB_RUN_ATTEMPT,sourceRevision:e.GITHUB_SHA};
+ const admission=validateQaBootstrapCommand({event,context,now:Date.now});
+ return issueFiniteQaBootstrap({admission,githubToken:e.GITHUB_TOKEN,credential:e.AFW_QA_CLOSED_TOKEN,signal:AbortSignal.timeout(Math.max(1,admission.Pend-Date.now()))});
+}
+if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
+ try{if(process.argv.length!==2)throw Error();await runFiniteQaBootstrapCli();}
+ catch{console.error('Finite QA bootstrap unavailable; no automatic retry');process.exitCode=1;}
+}

~~~~~~~~~~

## scripts/run-qa-finite-trial-finalizer.mjs

~~~~~~~~~~diff
diff --git a/scripts/run-qa-finite-trial-finalizer.mjs b/scripts/run-qa-finite-trial-finalizer.mjs
--- /dev/null
+++ b/scripts/run-qa-finite-trial-finalizer.mjs
@@ -0,0 +1,81 @@
+import {readFiniteMaterialSeed} from '../lib/mcp-qa-finite-seed-http.mjs';
+import {createFiniteAdoptionParent,waitForFiniteObserverAdoption} from '../lib/mcp-qa-finite-adoption.mjs';
+import {issueFiniteMaterialSeed} from '../lib/mcp-qa-finite-seed-issuer.mjs';
+import {readFile,writeFile,appendFile} from 'node:fs/promises';
+import {pathToFileURL} from 'node:url';
+import {validateQaFiniteConfirmationCommand,assertQaFiniteConfirmationAdmission} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
+import {createPrivateQaFiniteObserverHttp,createPrivateQaFiniteRestoreHttp,createPrivateQaFiniteGithub,readFiniteFinalizerGithubContext} from '../lib/mcp-qa-finite-http.mjs';
+import {validateFiniteExternalPlan,validateFiniteObserverOutput} from '../lib/mcp-qa-finite-external-contract.mjs';
+import {createPrivateQaFiniteTrialFinalizer} from '../lib/mcp-qa-finite-trial-finalizer.mjs';
+import {resolvePrivateQaFiniteExternalSource} from '../lib/mcp-qa-finite-source.mjs';
+const fail=()=>{throw Error('Finite finalizer unavailable');};
+/** Fixed phase CLI. Source implementation may be installed only in reviewed code.
+ * Environment contributes GitHub's authenticated event/context, never a plan. */
+export async function runFiniteFinalizerCli({phase,env=process.env,read=readFile,write=writeFile,append=appendFile,fetchImpl=fetch,now=Date.now,sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))}={}){
+ let signal=AbortSignal.timeout(480000),adoption;
+ try{
+  if(!['admission','seed-material','admit','poll','restore'].includes(phase))fail();
+  const raw=await read(env.GITHUB_EVENT_PATH,'utf8');if(Buffer.byteLength(raw)>262144)fail();
+  const event=JSON.parse(raw),context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,eventName:env.GITHUB_EVENT_NAME,runId:env.GITHUB_RUN_ID,runAttempt:env.GITHUB_RUN_ATTEMPT,sourceRevision:env.GITHUB_SHA};
+  const admission=validateQaFiniteConfirmationCommand({event,context,now});
+  assertQaFiniteConfirmationAdmission(admission,phase==='admission'||phase==='seed-material'||phase==='admit'?'nominal':'cleanup');
+  if(phase==='admit'){
+   adoption=createFiniteAdoptionParent({T0:admission.createdAt,N1:admission.expiresAt,now,signal});
+   signal=adoption.parent.signal;adoption.parent.check();
+  }
+  if(phase==='admission'){await append(env.GITHUB_OUTPUT,'intent_id='+admission.intentId+'\n');return {status:'admitted',operationalReadiness:false};}
+  if(phase==='seed-material'){
+   return await issueFiniteMaterialSeed({admission,githubToken:env.GITHUB_TOKEN,credential:env.AFW_QA_CLOSED_TOKEN,fetchImpl,now,signal});
+  }
+  // Missing actual Task4 constructor fails before reading CF custody.
+  const source=await resolvePrivateQaFiniteExternalSource({admission,phase,sourceRevision:admission.sourceRevision,githubToken:env.GITHUB_TOKEN,fetchImpl,now,signal});
+  if(phase==='admit'){
+   adoption.parent.check();
+   // Primary completed-success seed is prerequisite, never a waitable absence.
+   await readFiniteMaterialSeed({intentId:admission.intentId,sourceRevision:admission.sourceRevision,fetchImpl,now,signal});adoption.parent.check();
+  }
+  assertQaFiniteConfirmationAdmission(admission,phase==='admit'?'nominal':'cleanup');
+  const githubToken=env.GITHUB_TOKEN,finalizer=await readFiniteFinalizerGithubContext({admission,githubToken,fetchImpl,now,signal});
+  assertQaFiniteConfirmationAdmission(admission,phase==='admit'?'nominal':'cleanup');
+  const credential=env.AFW_QA_CLOSED_TOKEN;
+  const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:admission.intentId,sourceRevision:admission.sourceRevision,T0:admission.createdAt,R1:admission.cleanupExpiresAt},source:{qaLive:source.deployments.qaLive,custody:source.custody},credential,githubToken,fetchImpl,now,signal});
+  if(phase==='admit'){
+   const check=()=>{adoption.parent.check();assertQaFiniteConfirmationAdmission(admission);};
+   check();
+   const preview=await waitForFiniteObserverAdoption({parent:adoption.parent,T0:admission.createdAt,observer,sleep,now});check();
+   const plan=validateFiniteExternalPlan({...source,preview,commandId:admission.commentId,finalizer});
+   const github=createPrivateQaFiniteGithub({plan,githubToken,fetchImpl,now,signal});
+   await github.persistAdmission(credential,admission);check();
+   await write('afw-finite-plan.json',JSON.stringify(plan));return {status:'ready',operationalReadiness:false};
+  }
+  if(phase==='poll'){
+   const plan=validateFiniteExternalPlan(JSON.parse(await read('afw-finite-plan.json','utf8')));
+   if(plan.preview.intentId!==admission.intentId||plan.preview.sourceRevision!==admission.sourceRevision||JSON.stringify(plan.finalizer)!==JSON.stringify(finalizer))fail();
+   for(let i=0;i<48;i++){
+    assertQaFiniteConfirmationAdmission(admission,'cleanup');
+    const target=admission.createdAt+Math.floor(i*(admission.cleanupExpiresAt-admission.createdAt-5000)/47);
+    if(now()<target)await sleep(target-now());
+    assertQaFiniteConfirmationAdmission(admission,'cleanup');
+    const result=await observer.read();
+    if(result.status==='complete'){const output=validateFiniteObserverOutput(result.output,plan);await write('afw-finite-terminal.json',JSON.stringify(output));return {status:'observer_complete',operationalReadiness:false};}
+   }fail();
+  }
+  // Restart/restore loads the exact ORIGINAL observer primary output. No live
+  // canary proof method, reseal, challenge or replacement observer is invoked.
+  const observed=await observer.read();if(observed.status!=='complete')fail();
+  const plan=validateFiniteExternalPlan(observed.output.plan);
+  if(plan.preview.intentId!==admission.intentId||plan.preview.sourceRevision!==admission.sourceRevision||JSON.stringify(plan.finalizer)!==JSON.stringify(finalizer))fail();
+  validateFiniteObserverOutput(observed.output,plan);
+  const adapters=createPrivateQaFiniteRestoreHttp({plan,credential,githubToken,fetchImpl,now,signal});
+  await adapters.github.admitOriginalExecution({admission,output:observed.output});
+  const result=await createPrivateQaFiniteTrialFinalizer({plan,readSnapshot:adapters.readSnapshot,claim:adapters.claim,deployClosed:adapters.deployClosed,now,signal}).run();
+  await write('afw-finite-result.json',JSON.stringify(result));return result;
+ }catch{
+  const result={status:'admin_pending',operationalReadiness:false,mayRetry:false};
+  await write('afw-finite-result.json',JSON.stringify(result));return result;
+ }finally{adoption?.close();}
+}
+if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
+ const result=await runFiniteFinalizerCli({phase:process.argv[2]});
+ if(!['admitted','seed_material_created','ready','observer_complete','restored_observed','closed_observed','closed_observed_uncertain'].includes(result.status))process.exitCode=1;
+}

~~~~~~~~~~

## scripts/verify-qa-finite-archive.py

~~~~~~~~~~diff
diff --git a/scripts/verify-qa-finite-archive.py b/scripts/verify-qa-finite-archive.py
--- /dev/null
+++ b/scripts/verify-qa-finite-archive.py
@@ -0,0 +1,151 @@
+"""Inspect a finite package from stdin; never extract, import or execute it.
+
+This is a transport parser, not the manifest schema authority. The Node caller
+uses the existing strict manifest codec on this bounded result.
+"""
+import hashlib
+import io
+import json
+import stat
+import struct
+import sys
+import zipfile
+import zlib
+
+ARCHIVE_LIMIT = 64 * 1024 * 1024
+EXPANDED_LIMIT = 128 * 1024 * 1024
+MODULE_LIMIT = 3145728
+MANIFEST_LIMIT = 24576
+ROLES = ("qaLive", "qaClosed", "canaryLive", "canaryClosed", "operatorClosed")
+NAMES = {"manifest.json"} | {
+    role + ("/closed-rollback.mjs" if role == "qaClosed" else "/index.mjs") for role in ROLES
+}
+
+
+def require(condition):
+    if not condition:
+        raise ValueError("unavailable")
+
+
+def pairs(values):
+    result = {}
+    for key, value in values:
+        require(key not in result and key not in ("__proto__", "prototype", "constructor", "toJSON"))
+        result[key] = value
+    return result
+
+
+def invalid_constant(_value):
+    raise ValueError("unavailable")
+
+
+def actual_deflate_size(compressed, expected):
+    # ZipExtFile clips to the declared size. Independently count the actual
+    # deflate expansion so a forged short size/CRC cannot hide a trailing payload.
+    decoder = zlib.decompressobj(-15)
+    size = 0
+    for offset in range(0, len(compressed), 65536):
+        pending = compressed[offset:offset + 65536]
+        while pending:
+            out = decoder.decompress(pending, expected - size + 1)
+            size += len(out)
+            require(size <= expected)
+            pending = decoder.unconsumed_tail
+        require(not decoder.unused_data)
+    require(decoder.eof and size == expected and not decoder.unused_data)
+
+
+def inspect_archive(raw):
+    require(0 < len(raw) <= ARCHIVE_LIMIT)
+    # Reject multi-disk, ZIP64, comments, prefixes and trailing undeclared bytes.
+    require(len(raw) >= 22 and raw[-22:-18] == b"PK\x05\x06")
+    disk, central_disk, disk_count, count, central_size, central_start, comment = struct.unpack_from(
+        "<4H2IH", raw, len(raw) - 18)
+    require(disk == central_disk == comment == 0 and disk_count == count == 6 and count <= 64)
+    require(central_start + central_size == len(raw) - 22)
+    expanded = 0
+    files = {}
+    manifest_text = None
+    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
+        entries = archive.infolist()
+        require(len(entries) == count and archive.start_dir == central_start)
+        names = [entry.filename for entry in entries]
+        require(len(set(names)) == len(names) and set(names) == NAMES)
+        end = 0
+        for entry in sorted(entries, key=lambda item: item.header_offset):
+            name = entry.filename
+            require(name == entry.orig_filename and "\x00" not in name and "\\" not in name)
+            require(name in NAMES and not entry.is_dir())
+            mode = entry.external_attr >> 16
+            require(stat.S_IFMT(mode) in (0, stat.S_IFREG) and not (entry.external_attr & 0x10))
+            require(entry.create_system in (0, 3) and entry.extract_version <= 20)
+            require(entry.flag_bits & ~0x80E == 0 and not entry.flag_bits & 1)
+            require(entry.compress_type in (zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED))
+            limit = MANIFEST_LIMIT if name == "manifest.json" else MODULE_LIMIT
+            require(0 < entry.file_size <= limit and 0 <= entry.compress_size <= ARCHIVE_LIMIT)
+            expanded += entry.file_size
+            require(expanded <= EXPANDED_LIMIT)
+            offset = entry.header_offset
+            require(offset == end and raw[offset:offset + 4] == b"PK\x03\x04")
+            version, flags, method, _time, _date, crc, compressed_size, size, name_len, extra_len = struct.unpack_from(
+                "<5H3I2H", raw, offset + 4)
+            require(version <= 20 and flags == entry.flag_bits and method == entry.compress_type)
+            require(raw[offset + 30:offset + 30 + name_len] == name.encode("ascii"))
+            if flags & 8:
+                require((crc, compressed_size, size) in ((0, 0, 0), (entry.CRC, entry.compress_size, entry.file_size)))
+            else:
+                require((crc, compressed_size, size) == (entry.CRC, entry.compress_size, entry.file_size))
+            start = offset + 30 + name_len + extra_len
+            end = start + entry.compress_size
+            require(start <= end <= central_start)
+            compressed = memoryview(raw)[start:end]
+            if method == zipfile.ZIP_STORED:
+                require(entry.compress_size == entry.file_size)
+            else:
+                actual_deflate_size(compressed, entry.file_size)
+            if flags & 8:
+                if raw[end:end + 4] == b"PK\x07\x08":
+                    end += 4
+                require(end + 12 <= central_start)
+                require(struct.unpack_from("<3I", raw, end) == (entry.CRC, entry.compress_size, entry.file_size))
+                end += 12
+            digest = hashlib.sha256()
+            actual = 0
+            parts = []
+            with archive.open(entry, "r") as source:
+                while True:
+                    chunk = source.read(min(65536, limit - actual + 1))
+                    if not chunk:
+                        break
+                    actual += len(chunk)
+                    require(actual <= limit and actual <= entry.file_size)
+                    digest.update(chunk)
+                    if name == "manifest.json":
+                        parts.append(chunk)
+            require(actual == entry.file_size)
+            if name == "manifest.json":
+                manifest_text = b"".join(parts).decode("utf-8", errors="strict")
+            else:
+                files[name] = {"sha256": digest.hexdigest(), "bytes": actual}
+        require(end == central_start)
+    manifest = json.loads(manifest_text, object_pairs_hook=pairs, parse_constant=invalid_constant)
+    require(isinstance(manifest, dict) and manifest.get("purpose") == "afw.finite-native-package.v2")
+    require(json.dumps(manifest, sort_keys=True, separators=(",", ":"), ensure_ascii=False) == manifest_text)
+    return {"manifest": manifest, "manifestText": manifest_text, "files": files}
+
+
+def main():
+    raw = sys.stdin.buffer.read(ARCHIVE_LIMIT + 1)
+    result = inspect_archive(raw)
+    output = json.dumps(result, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
+    require(len(output) <= 65536)
+    sys.stdout.buffer.write(output)
+
+
+if __name__ == "__main__":
+    try:
+        main()
+    except Exception:
+        # Never emit archive names, contents, exception details or stack traces.
+        sys.stderr.write("Finite archive unavailable\n")
+        sys.exit(1)

~~~~~~~~~~

## worker/independent-closure/finite.mjs

~~~~~~~~~~diff
diff --git a/worker/independent-closure/finite.mjs b/worker/independent-closure/finite.mjs
--- /dev/null
+++ b/worker/independent-closure/finite.mjs
@@ -0,0 +1,39 @@
+import {createFiniteOwnerNativeReceiver} from '../../lib/mcp-qa-finite-owner-native-receiver.mjs';
+import {createPrivateQaFiniteOwnerOAuthReceiver} from '../../lib/mcp-qa-finite-owner-oauth-qa.mjs';
+import {createPrivateQaFiniteOwnerNoticeGetReceiver,createPrivateQaFiniteOwnerNoticeConsentReceiver} from '../../lib/mcp-qa-finite-owner-notice-get-qa.mjs';
+import {finiteNativePending} from '../../lib/mcp-qa-finite-owner-native-wire.mjs';
+import {runPrivateQaFiniteInitialCleanupAlarm} from '../../lib/mcp-qa-finite-initial-cleanup.mjs';
+import {runPrivateQaFiniteInitialPreparation,createPrivateQaFiniteInitialEntry,FINITE_INITIAL_PREPARATION_OPERATION} from '../../lib/mcp-qa-finite-initial-entry.mjs';
+import '../../lib/mcp-qa-finite-bootstrap-source.mjs';
+import '../../lib/mcp-qa-finite-candidate-residency.mjs';
+import {runFinitePrivatePolicySetup,createPrivateQaFinitePolicySetup,FINITE_POLICY_SETUP_OPERATION} from '../../lib/mcp-qa-finite-policy-setup.mjs';
+// SOURCE-selected finite composition. Ordinary index.mjs stays closed.
+import {PrivateQaBootstrap as ClosedBootstrap,PrivateQaNamedConfirmation as ClosedConfirmation,IndependentClosure as ClosedIndependentClosure} from './index.mjs';
+import {runPrivateQaFiniteLauncher,FINITE_LAUNCHER_OPERATION} from '../../lib/mcp-qa-finite-launcher.mjs';
+import {runPrivateQaFiniteConfirmation} from '../../lib/mcp-qa-finite-confirmation.mjs';
+export {PrivateQaCatalog,PrivateQaPreregistration,observePrivateQa,default} from './index.mjs';
+export class PrivateQaBootstrap extends ClosedBootstrap{
+ run(event,step){if(event?.payload?.operation===FINITE_INITIAL_PREPARATION_OPERATION)return runPrivateQaFiniteInitialPreparation({env:this.env,event,step});if(event?.payload?.operation===FINITE_POLICY_SETUP_OPERATION)return runFinitePrivatePolicySetup({env:this.env,event,step});if(event?.payload?.operation===FINITE_LAUNCHER_OPERATION)return runPrivateQaFiniteLauncher({env:this.env,event,step});return super.run(event,step);}
+}
+export class PrivateQaNamedConfirmation extends ClosedConfirmation{
+ run(event,step){if(event?.payload&&Object.hasOwn(event.payload,'planHash'))return runPrivateQaFiniteConfirmation({env:this.env,event,step});return super.run(event,step);}
+}
+export class IndependentClosure extends ClosedIndependentClosure{
+ fetch(request){
+  const factories={
+   'https://afw-private.invalid/_finite-owner/choice':createFiniteOwnerNativeReceiver,
+   'https://afw-private.invalid/_finite-owner/authorize':createPrivateQaFiniteOwnerOAuthReceiver,
+   'https://afw-private.invalid/_finite-owner/monitoring':createPrivateQaFiniteOwnerNoticeGetReceiver,
+   'https://afw-private.invalid/_finite-owner/monitoring/grant':createPrivateQaFiniteOwnerNoticeConsentReceiver
+  };
+  const factory=Object.hasOwn(factories,request.url)?factories[request.url]:null;
+  if(factory){if(request.method!=='POST')return finiteNativePending(405);return factory({ctx:this.ctx,env:this.env}).fetch(request);}
+  const path=new URL(request.url).pathname;
+  if(path==='/_finite-owner'||path.startsWith('/_finite-owner/'))return finiteNativePending(404);
+  return super.fetch(request);
+ }
+
+ async alarm(){const result=await runPrivateQaFiniteInitialCleanupAlarm({ctx:this.ctx,env:this.env});return result===null?super.alarm():result;}
+ prepareFiniteInitialMaterial(...args){if(args.length!==1)return Promise.resolve({status:'admin_pending',mayRetry:false,operationalReadiness:false});return createPrivateQaFiniteInitialEntry({ctx:this.ctx,env:this.env}).run(args[0]);}
+ setupFinitePrivatePolicy(...args){if(args.length!==1)throw Error('Finite setup unavailable');return createPrivateQaFinitePolicySetup({ctx:this.ctx,env:this.env}).run(args[0]);}
+}

~~~~~~~~~~

## worker/mcp-own/finite.mjs

~~~~~~~~~~diff
diff --git a/worker/mcp-own/finite.mjs b/worker/mcp-own/finite.mjs
--- /dev/null
+++ b/worker/mcp-own/finite.mjs
@@ -0,0 +1,44 @@
+import {createFiniteOwnerRequestLease} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
+import {forwardFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-native-bridge.mjs';
+import {forwardPrivateFiniteOwnerOAuth} from '../../lib/mcp-qa-finite-owner-oauth-forward.mjs';
+import {forwardPrivateFiniteOwnerNoticeGet,forwardPrivateFiniteOwnerNoticeConsent} from '../../lib/mcp-qa-finite-owner-notice-get-forward.mjs';
+import {finiteNativeOrigin,finiteNativePending} from '../../lib/mcp-qa-finite-owner-native-wire.mjs';
+import worker,{AfwNodeControl,AfwOwnEventNode as OwnEventNode} from './index.mjs';
+const denyLegacyWithdrawal=()=>{throw Error('Finite legacy withdrawal unavailable');};
+// Same actual SQLite constructor, namespace and inherited finite cleanup path.
+// The finite profile enables only the separately qualified C0/C1 reduction.
+// Legacy withdrawal RPCs must deny before touching any actual env/host state.
+export class AfwOwnEventNode extends OwnEventNode{
+ withdrawPermissions(){return denyLegacyWithdrawal();}
+ withdrawPermissionsForPlan(){return denyLegacyWithdrawal();}
+}
+export {AfwNodeControl};
+const finiteEntrypoint=globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__==='finite_trial_event';
+const finiteWorker={...worker,async fetch(request,env,ctx){
+ const url=new URL(request.url),path=url.pathname;
+ let decoded;try{decoded=decodeURIComponent(path);}catch{decoded=path;}
+ const reserved=value=>['/connections','/authorize','/monitoring'].some(prefix=>value===prefix||value.startsWith(prefix+'/'));
+ if(!reserved(path)&&!reserved(decoded))return worker.fetch(request,env,ctx);
+ const parent=createFiniteOwnerRequestLease(request);
+ try{
+  if(!finiteEntrypoint||url.origin!==finiteNativeOrigin||url.hash||path!==decoded)return finiteNativePending(404);
+  const input={request,env,ctx};
+  if(path==='/connections/finite-prepare'){
+   if(!['GET','POST'].includes(request.method))return finiteNativePending(405);
+   return await forwardFiniteOwnerChoice(input,parent.lease);
+  }
+  if(path==='/authorize'){
+   if(!['GET','POST'].includes(request.method))return finiteNativePending(405);
+   if(env?.AFW_DELEGATED_OAUTH_ENABLED!=='true')return finiteNativePending();
+   return await forwardPrivateFiniteOwnerOAuth(input,parent.lease);
+  }
+  if(path==='/monitoring'||path==='/monitoring/grant'){
+   if(request.method!==(path==='/monitoring'?'GET':'POST'))return finiteNativePending(405);
+   if(env?.AFW_DELEGATED_OAUTH_ENABLED!=='true')return finiteNativePending();
+   return await (path==='/monitoring'?forwardPrivateFiniteOwnerNoticeGet:forwardPrivateFiniteOwnerNoticeConsent)(input,parent.lease);
+  }
+  return finiteNativePending(404);
+ }catch{return finiteNativePending();}finally{parent.finish();}
+}};
+
+export default finiteWorker;

~~~~~~~~~~
