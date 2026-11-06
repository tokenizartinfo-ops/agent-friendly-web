# Whole-branch review packet 6/26 — tests

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 43 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- test/fixtures/finite-owner-phase-context.mjs: ABSENT -> f1ddbfff29b1d5e4da4dbf70c649e0df20582b46; full diff chars=23698
- test/fixtures/finite-owner-qa-sdk.mjs: ABSENT -> 62fde9dcefb78bf57585a184901cb3c4d79c4c4d; full diff chars=26967
- test/fixtures/finite-owner-source.mjs: ABSENT -> 6f8e9bacfd15a3722f52391cb58db2722217bcf1; full diff chars=1497
- test/fixtures/finite-owner-worker.mjs: ABSENT -> 8bb5a6e776b16093767f76b3b5e2f27f05b576bb; full diff chars=16673
- test/fixtures/finite-package-resolver.mjs: ABSENT -> 23788564362c8391064cb77d690b1f7b323eed56; full diff chars=1996
- test/fixtures/finite-policy-configuration-data.mjs: ABSENT -> 1b208180d1c2b127564cdb4364ab24a0b40c44ac; full diff chars=3217
- test/fixtures/finite-policy-setup-facts-seed.mjs: ABSENT -> 18270f02fce02631aad153ee28d64c5466273488; full diff chars=654
- test/fixtures/finite-policy-setup-facts-source.mjs: ABSENT -> 064516a817853fdd98709b1f0f2f1ec68d55d69f; full diff chars=2667
- test/fixtures/finite-policy-setup-facts-worker.mjs: ABSENT -> da42dbc022d66689cbe30761eb0ab70806807e92; full diff chars=2561
- test/fixtures/finite-policy-setup-native.mjs: ABSENT -> 076b84ae304fe7e607a7eb65dda513dd5779547a; full diff chars=5744
- test/fixtures/finite-policy-setup-worker.mjs: ABSENT -> 3b5a48f842ccbc1357e778ab6c41edf3ce8bffe0; full diff chars=10064
- test/fixtures/finite-premature-admission-native.mjs: ABSENT -> 12242ae22d278827a3e72a16ac7c1dabba0a1e74; full diff chars=1938
- test/fixtures/finite-premature-admission-worker.mjs: ABSENT -> 523a85eb3482c8c185b74f76ff002b13c2797323; full diff chars=18178
- test/fixtures/finite-preparation-cleanup-entry.mjs: ABSENT -> aea6d1f727f71d7a298b214e8a67380a60961fe6; full diff chars=9074
- test/fixtures/finite-preparation-cleanup-source.mjs: ABSENT -> 8baf5ea379cb3cc359803be9e76f967631b9dca3; full diff chars=1595
- test/fixtures/finite-preparation-issuer-worker.mjs: ABSENT -> ab77081da5b3112adb841dd362af116eb8c55b90; full diff chars=36498
- test/fixtures/finite-preparation-notice-provenance-worker.mjs: ABSENT -> a1824dd8548033d318ec2c80f4a8a97c53265c85; full diff chars=21341
- test/fixtures/finite-preparation-store-worker.mjs: ABSENT -> bd90078326363abb7db92e5b09dc4bbec8c34317; full diff chars=8960
- test/fixtures/finite-restoration.mjs: ABSENT -> ad53cfeca0b6c94b3e062bcb50e0a4644a667b31; full diff chars=5122
- test/fixtures/finite-seed-primary.mjs: ABSENT -> 78224487be5acba7daf699a0998a54daca4a7247; full diff chars=6627
- test/fixtures/finite-seed-world.mjs: ABSENT -> 16f5a424493da0258a67d29d271721eaa47e72d5; full diff chars=12326
- test/fixtures/finite-transport-native.mjs: ABSENT -> 29eb937663540e71d31857d23360866a76d65b1c; full diff chars=5713
- test/fixtures/finite-v2.mjs: ABSENT -> ffa3054520eacc8c4bdffdbdf25b56beaef48795; full diff chars=1127
- test/fixtures/qa-finite-trial.mjs: ABSENT -> 8297a9ae39fd4bdd228a2b1f64105683cb768203; full diff chars=9305
- test/mcp-finite-activation-compatibility.test.mjs: ABSENT -> b686de7d7b9e99de33d38e966f7d388694d1f848; full diff chars=5534
- test/mcp-finite-cleanup-readiness.test.mjs: ABSENT -> 84c11db14818cbc9db090dd5f9e3d1688399caa6; full diff chars=2967
- test/mcp-finite-named-activation.test.mjs: ABSENT -> b7c610a587fb6543f18d052eab70ac8fdafe131f; full diff chars=6094
- test/mcp-finite-nominal-control.test.mjs: ABSENT -> 5ba81c275eef953b4a5c4c5feb1702f4229ff0aa; full diff chars=6537
- test/mcp-own-finite-admission-gate.test.mjs: ABSENT -> fa611d741eb954524b5fe249a25b02eb95496707; full diff chars=5712
- test/mcp-own-finite-cleanup-native.test.mjs: ABSENT -> 3e0100f3d48b54ffc6434c5347c1f1ccbe52ea56; full diff chars=8085
- test/mcp-own-finite-cleanup-proof.test.mjs: ABSENT -> 30eda45b058e0f6fc9a6d2c1cb200c4a8908e682; full diff chars=5953
- test/mcp-own-finite-entrypoints-native.test.mjs: ABSENT -> 4341c4119c3948cee6ae9f252406ddee273c1e6d; full diff chars=2359
- test/mcp-own-finite-entrypoints.test.mjs: ABSENT -> 674419ca51328b128bba483f44001e12f1e4b9f5; full diff chars=2124
- test/mcp-own-finite-premature-admission-native.test.mjs: ABSENT -> ce7bdbc226b57d5b0026a02c163474965275e136; full diff chars=6184
- test/mcp-own-finite-reduction-native.test.mjs: ABSENT -> c749d84d5a654dd0ad3bc67c53a498f45dac5939; full diff chars=7433
- test/mcp-qa-finite-adoption-wait.test.mjs: ABSENT -> e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55; full diff chars=7081
- test/mcp-qa-finite-bootstrap-compiler.test.mjs: ABSENT -> 3eae948a7bdc5e3610b058d484970b9db221c417; full diff chars=3149
- test/mcp-qa-finite-bootstrap-issuer.test.mjs: ABSENT -> d63e090434967188a376655025b38e3d01d028f4; full diff chars=10712
- test/mcp-qa-finite-bootstrap-native.test.mjs: ABSENT -> 1b871f097eb8c1dc67f4cb8ff174b6970c2cf4e4; full diff chars=7353
- test/mcp-qa-finite-bootstrap-primary.test.mjs: ABSENT -> 23f0b3830e3cc2b51b013bca6cd6a386da33efc7; full diff chars=4317
- test/mcp-qa-finite-bootstrap.test.mjs: ABSENT -> 089db24ae5f10547259eeaef699f68ebccf580da; full diff chars=6417
- test/mcp-qa-finite-canary-restorer.test.mjs: ABSENT -> 85e03c1a6618cfa91420d3c1fdd70d0a2afb514e; full diff chars=6094
- test/mcp-qa-finite-candidate-residency.test.mjs: ABSENT -> 654109b27b9327f4c24bd84689aa386b1a600808; full diff chars=9132

## test/fixtures/finite-owner-phase-context.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-phase-context.mjs b/test/fixtures/finite-owner-phase-context.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-phase-context.mjs
@@ -0,0 +1,169 @@
+// Explicit SYN external history/provider clocks. All factual readers/codecs run intact.
+export function extendFiniteOwnerPhaseContext(entry){
+ const imports=String.raw`import {readPrivateQaFiniteOwnerContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';
+import {readPrivateQaFiniteInitialAnchors as phaseAnchors} from './lib/mcp-qa-finite-initial-anchors.mjs';
+import {createFiniteOwnerPreparationStore as phaseStore} from './lib/mcp-qa-finite-preparation-store.mjs';
+import {hashFiniteOwnerEvidence as phaseEvidence,hashFinitePreparationRecord as phaseHash,hashFiniteOwnerPreparationProject as phaseProjectHash,encodeFinitePreparationRecord as phaseEncode} from './lib/mcp-qa-finite-preparation-records.mjs';
+import {sealFinitePreparationCleanupRecord as phaseSealEnrollment,encodeFinitePreparationCleanupRecord as phaseEncodeEnrollment} from './lib/mcp-qa-finite-preparation-cleanup-records.mjs';
+import {qualifyFinitePreparationEnrollmentFacts as phaseEnrollmentFacts} from './lib/mcp-qa-finite-preparation-enrollment-facts.mjs';
+import {createFinitePolicyEffectJournal as phaseJournal} from './lib/mcp-qa-finite-policy-journal.mjs';
+import {initialHash as phaseDigest} from './lib/mcp-qa-finite-initial-material-records.mjs';
+import {finiteActivationConfigurationHash as phaseConfigurationHash} from './lib/mcp-activation-observer.mjs';
+import {createFinitePreparationIssuerJournal as phaseIssuerJournal} from './lib/mcp-qa-finite-preparation-issuer-journal.mjs';
+import {createFinitePreparationIssuerStore as phaseIssuerStore} from './lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {sealFinitePreparationIssuerRecord as phaseSealIssuer,encodeFinitePreparationIssuerRecord as phaseEncodeIssuer} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';
+import {createHash as phaseCreateHash} from 'node:crypto';
+const phaseRawSha=x=>phaseCreateHash('sha256').update(x).digest('hex');
+import {sealFiniteInitialUploadRecord as phaseSealUpload,encodeFiniteInitialUploadRecord as phaseEncodeUpload} from './lib/mcp-qa-finite-initial-upload-records.mjs';
+`;
+ const methods=String.raw` async seedPhaseFacts(kind='settled',delta=410000){
+  const storage=this.ctx.storage,now=Date.now,capsule=JSON.parse(await storage.get('afw.finite-initial-preparation.v1:capsule')),offset=delta===null?0:capsule.I0+delta-now();
+  Date.now=()=>now()+offset;const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'));
+  try{
+   const original=await readPrivateQaFiniteInitialOwnerSource({ctx:this.ctx,env:this.env,parent:parent.lease}),anchors=await phaseAnchors({ctx:this.ctx,env:this.env},parent.lease),source=original.source,at=Date.now(),id=capsule.preconnectionId;
+   const realm=phaseEvidence('realm',{...source.access,origin:source.origin}),subject=phaseEvidence('subject',{accessRealmHash:realm,subject:anchors.material.ownerSelection.subject}),ticketHash='7'.repeat(64),projectRef='8'.repeat(64);
+   const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash:subject,sourceRevision:source.sourceRevision,projectRef,connectionRef:null,preconnectionId:id,action:'connection',createdAt:at,expiresAt:capsule.C0};
+   const map={projectRef,preconnectionId:id,subjectHash:subject,sourceRevision:source.sourceRevision,projectId:source.project.projectId,revision:source.project.revision,issuedAt:at,expiresAt:capsule.C0};
+   const snapshot={preconnectionId:id,initialTicketHash:ticketHash,source};snapshot.sourceHash=phaseHash('OwnerSourceSnapshot',snapshot);
+   const approval={purpose:'afw.finite-connection-approval.v1',subjectHash:subject,sourceRevision:source.sourceRevision,projectHash:phaseProjectHash(source.project),clientId:source.clientId,approvedAt:at,expiresAt:capsule.C0};
+   approval.csrfReceiptHash=phaseEvidence('decision',{ticket,decision:'approve',projectHash:approval.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:at,expiresAt:capsule.C0});
+   const pre={purpose:'afw.finite-connection-preparation.v1',preconnectionId:id,sourceRevision:source.sourceRevision,actorId:source.actorId,owner:{subject:anchors.material.ownerSelection.subject,accessRealmHash:realm,accessVerifiedAt:at,accessExpiresAt:capsule.C0},project:source.project,clientId:source.clientId,resource:source.resource,startedAt:at,expiresAt:capsule.C0,approvalHash:phaseHash('ConfigurationApproval',approval),baselineHash:phaseEvidence('baseline',source.initialBaseline)};
+   pre.recordHash=phaseHash('Preconnection',pre);
+   const stageApproval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection',ticketHash,approvalHash:pre.approvalHash};
+   const store=phaseStore({storage,now:Date.now}),put=async(method,v)=>{const result=await store[method](v,parent.lease);if(result.status!=='recorded')throw Error('SYN seed '+method+' '+result.status);};
+   await put('putOwnerSourceSnapshot',snapshot);if(kind==='snapshot-only')return {provenance:'SYN exact native snapshot prefix',preconnectionId:id};await put('putProjectRef',map);if(kind==='snapshot-map')return {provenance:'SYN exact native snapshot/project-ref prefix',preconnectionId:id};await put('putTicket',ticket);await put('putConfigurationApproval',approval);await put('consumeTicket',{ticketHash,recordHash:approval.csrfReceiptHash});await put('putPreconnection',pre);await put('putStageApproval',stageApproval);
+   if(kind==='approval')return {provenance:'SYN evidence via actual preparation store',preconnectionId:id};
+   const p=anchors.plan,r=anchors.records,c=anchors.capsule,values={capsuleHash:c.capsuleHash,planHash:p.recordHash,armAckHash:r['arm-ack'].recordHash,activationCompletionHash:r['activation-completion'].recordHash,entryHash:c.entryHash,materialHash:c.materialHash,actorId:anchors.actorId,ownerSourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHash:phaseHash('StageApproval',stageApproval),configurationApprovalHash:phaseHash('ConfigurationApproval',approval),issuedAt:Date.now()};values.deadline=values.issuedAt+5000;
+   for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])values[k]=c[k];
+   for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])values[k]=p[k];
+   const enrollment=phaseSealEnrollment('Enrollment',values),ack=phaseSealEnrollment('Ack',{enrollmentHash:enrollment.recordHash,stateHash:anchors.zero.recordHash,alarmAt:c.C0,acknowledgedAt:Date.now()});
+   await storage.put('afw.finite-preparation-cleanup.v1:enrollment',phaseEncodeEnrollment('Enrollment',enrollment));
+   if(kind!=='enrollment-no-ack')await storage.put('afw.finite-preparation-cleanup.v1:ack',phaseEncodeEnrollment('Ack',ack));
+   const use=(await store.readTicketUse({ticketHash},parent.lease)).record;
+   const facts={anchors,enrollment,ack,preconnection:pre,sourceSnapshot:snapshot,stageApproval,approval,ticket,ticketUse:use,projectRef:map};
+   phaseEnrollmentFacts(facts);this.phaseSeededFacts=facts;
+   if(['enrollment','enrollment-no-ack'].includes(kind))return {provenance:'SYN enrollment DATA',preconnectionId:id};
+   const contextHash=phaseDigest('afw.finite-connection-context.v1',{preconnection:pre,stageApproval,predecessors:[],grant:null,notice:null}),identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'};
+   const cfg=structuredClone(p.configuration);if(kind!=='settled-original')cfg.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+   const journal=effect=>phaseJournal({storage,identity:{...identity,effect},now:Date.now});
+   const versionId=kind==='settled-original'?c.activatedVersionId:'77777777-7777-4777-8777-777777777777',deploymentId=kind==='settled-original'?c.activatedDeploymentId:'88888888-8888-4888-8888-888888888888';
+   let activation;
+   for(const effect of ['upload','activation']){
+    const send={purpose:'afw.finite-connection-send.v1',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection',contextHash,effect,baselineVersionId:c.activatedVersionId,baselineDeploymentId:c.activatedDeploymentId,requestHash:'6'.repeat(64),issuedAt:Date.now(),deadline:Date.now()+5000},j=journal(effect);
+    if((await j.issue(send,parent.lease)).status!=='recorded')throw Error('SYN journal SEND');
+    if(kind==='upload-send'&&effect==='upload'||kind==='activation-send'&&effect==='activation')return {provenance:'SYN unresolved SEND',preconnectionId:id};
+    const ack={purpose:'afw.finite-connection-ack.v1',sendHash:phaseHash('ConnectionSend',send),resourceId:effect==='upload'?versionId:deploymentId,acknowledgedAt:Date.now()};
+    if((await j.acknowledge(ack,parent.lease)).status!=='recorded')throw Error('SYN journal ACK');
+    if(kind==='upload-ack'&&effect==='upload')return {provenance:'SYN upload ACK',preconnectionId:id};
+    if(effect==='activation')activation=j;
+   }
+   const receipt={purpose:'afw.finite-connection-installed.v1',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection',baselineVersionId:c.activatedVersionId,baselineDeploymentId:c.activatedDeploymentId,versionId,deploymentId,moduleHash:c.moduleHash,configurationHash:phaseConfigurationHash(cfg),completedAt:Date.now()};receipt.receiptHash=phaseHash('ConnectionReceipt',receipt);
+   if((await activation.finish(receipt,parent.lease)).status!=='recorded')throw Error('SYN journal receipt');
+   await storage.sync();return {provenance:'SYN external publication evidence; real native journals',receipt,configuration:cfg};
+  }catch(e){return {fixtureError:String(e),stack:e.stack};}finally{parent.finish();Date.now=now;}
+ }
+ async phaseEnrollmentMutations(){
+  const original=this.phaseSeededFacts;if(!original)throw Error('SYN facts absent');
+  const results={exact:!!phaseEnrollmentFacts(original),nullAck:phaseEnrollmentFacts({...original,ack:null}).ack===null};
+  for(const key of ['capsuleHash','planHash','stateHash','decision','subject','project','originalA','ackHash','extra','accessor','symbol','zero-state']){
+   const f=structuredClone(original);let accessorExecuted=false;
+   if(['capsuleHash','planHash'].includes(key)){const v={...f.enrollment};delete v.purpose;delete v.recordHash;v[key]='f'.repeat(64);f.enrollment=phaseSealEnrollment('Enrollment',v);}
+   if(key==='stateHash'||key==='ackHash'){const v={...f.ack};delete v.purpose;delete v.recordHash;v[key==='stateHash'?'stateHash':'enrollmentHash']='f'.repeat(64);f.ack=phaseSealEnrollment('Ack',v);}
+   if(key==='decision')f.ticketUse.recordHash='f'.repeat(64);
+   if(key==='subject')f.ticket.subjectHash='f'.repeat(64);
+   if(key==='project')f.projectRef.revision++;
+   if(key==='originalA')f.stageApproval.preconnectionId='f'.repeat(64);
+   if(key==='extra')f.anchors.material.ownerSelection.extra='SYN unknown';
+   if(key==='symbol')f.ticket[Symbol('SYN unknown')]=1;
+   if(key==='accessor')Object.defineProperty(f.ticket,'subjectHash',{enumerable:true,get(){accessorExecuted=true;return 'f'.repeat(64);}});
+   if(key==='zero-state')f.anchors.zero.recordHash='f'.repeat(64);
+   try{phaseEnrollmentFacts(f);results[key]=false;}catch{results[key]=true;}if(accessorExecuted)results[key]=false;
+  }return results;
+ }
+ async phaseCorrupt(kind){
+  const s=this.ctx.storage,rows=[...await s.list()],capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]),prefix='connection-preparation:'+capsule.preconnectionId+':';
+  if(kind.startsWith('missing-')){const suffix=kind.slice(8),key=rows.find(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&(suffix==='chunk'?k.includes(':chunk:'):k.endsWith(':'+suffix)))?.[0];if(!key)throw Error('SYN missing key');await s.delete(key);}
+  else if(kind.startsWith('tamper-')){const suffix=kind.slice(7),[key,raw]=rows.find(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&(suffix==='chunk'?k.includes(':chunk:'):k.endsWith(':'+suffix)));await s.put(key,raw+' ');}
+  else if(kind.startsWith('mismatch-')){
+   const name=kind.slice(9),isChunk=name==='chunk-manifest',entry=rows.find(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&(isChunk?k.includes(':chunk:'):k.endsWith(':receipt'))),v=JSON.parse(entry[1]);delete v.purpose;delete v.recordHash;
+   if(name==='receipt-material')v.materialHash='f'.repeat(64);else if(name==='receipt-manifest'||isChunk)v.manifestHash='f'.repeat(64);else if(name==='receipt-baseline')v.baselineDeploymentId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';else throw Error('SYN mismatch');
+   await s.put(entry[0],phaseEncodeUpload(isChunk?'Chunk':'Receipt',phaseSealUpload(isChunk?'Chunk':'Receipt',v)));
+  }
+  else if(kind==='orphan-ticket-use'){const snap=JSON.parse(await s.get(prefix+'source'));await s.put('owner-ticket:'+snap.initialTicketHash+':use',phaseEncode('TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',ticketHash:snap.initialTicketHash,recordHash:'f'.repeat(64),consumedAt:capsule.I0+410000}));}
+  else if(kind==='foreign-snapshot'||kind==='stale-snapshot'){const snap=JSON.parse(await s.get(prefix+'source'));if(kind==='foreign-snapshot')snap.preconnectionId='f'.repeat(64);else snap.source.project.revision++;snap.sourceHash=phaseHash('OwnerSourceSnapshot',snap);await s.put(prefix+'source',phaseEncode('OwnerSourceSnapshot',snap));}
+  else if(kind==='issuer-ack'){const row=rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':ack')),v=JSON.parse(row[1]);v.sendHash='f'.repeat(64);delete v.recordHash;await s.put(row[0],phaseEncodeIssuer('Ack',phaseSealIssuer('Ack',v)));}
+  else if(kind==='later-approval')await s.put(prefix+'notices:approval','SYN unsupported');
+  else if(kind==='extra')await s.put(prefix+'unknown','SYN unknown');
+  else if(kind==='writer-head')await s.put('afw.finite-policy-effect.v1:writer-head',JSON.stringify({identityHash:'f'.repeat(64),sendHash:'f'.repeat(64)}));
+  else if(kind==='orphan-grant')await s.put(prefix+'grant','SYN orphan');
+  else if(kind==='orphan-receipt'||kind==='orphan-ack'){const row=rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'));await s.delete(row[0]);}
+  else if(kind==='foreign-A'){const key=prefix+'connection:approval',v=JSON.parse(await s.get(key));v.preconnectionId='f'.repeat(64);await s.put(key,phaseEncode('StageApproval',v));}
+  else if(kind==='contextHash'){for(const [key,raw]of rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'))){const v=JSON.parse(raw);v.contextHash='f'.repeat(64);await s.put(key,phaseEncode('ConnectionSend',v));}}
+  else throw Error('SYN unknown mutation');
+  await s.sync();
+ }
+ async seedPhaseIssuer(kind='reservation'){
+  const f=this.phaseSeededFacts;if(!f)throw Error('SYN phase facts absent');
+  const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'));
+  try{
+   const c=f.anchors.capsule,pre=f.preconnection,at=Date.now(),identity=phaseSealIssuer('Identity',{preconnectionId:c.preconnectionId,enrollmentHash:f.enrollment.recordHash,capsuleHash:c.capsuleHash,sourceRevision:c.sourceRevision,qaVersionId:c.qaVersionId,actorId:pre.actorId,subject:pre.owner.subject,accessRealmHash:pre.owner.accessRealmHash,projectId:pre.project.projectId,projectRevision:pre.project.revision,clientId:pre.clientId,resource:pre.resource,authorizationHash:'5'.repeat(64),grantId:'99999999-9999-4999-8999-999999999999',requestedScopes:['afw:project:read'],consentExpiresAt:new Date(c.C0).toISOString(),I0:c.I0,C0:c.C0,C1:c.C1,reservedAt:at});
+   const journal=phaseIssuerJournal({ctx:this.ctx,env:this.env}),store=phaseIssuerStore({ctx:this.ctx,env:this.env}),reservation=phaseSealIssuer('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity,requestHash:'4'.repeat(64),issuedAt:at,deadline:at+5000});
+   if((await journal.appendReservation(reservation,parent.lease)).status!=='recorded')throw Error('SYN issuer reservation');
+   this.phaseIssuerIdentity=identity;if(kind==='reservation')return {provenance:'actual issuer journal; SYN original identity',identity};
+   const step=async(operation,fn)=>{
+    const time=Date.now(),window={startedAt:time,deadline:time+5000},send=phaseSealIssuer('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:identity.identityHash,reservationHash:reservation.recordHash,operation,requestId:null,requestHash:'3'.repeat(64),issuedAt:time,deadline:window.deadline});
+    if((await journal.appendSend({preconnectionId:c.preconnectionId,record:send},parent.lease)).status!=='recorded')throw Error('SYN issuer send');
+    if(kind==='unknown-'+operation)return null;
+    const result=await fn(window),row=result?.row??result;
+    if(!row||result?.status==='no_mutation')throw Error('SYN actual issuer operation did not apply '+operation);
+    const ack=phaseSealIssuer('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:send.recordHash,rowHash:phaseDigest('afw.finite-preparation-issuer-row.v1',row),outcome:'applied',observedAt:Date.now()});
+    if((await journal.appendAck({preconnectionId:c.preconnectionId,operation,record:ack},parent.lease)).status!=='recorded')throw Error('SYN issuer ack');
+    return row;
+   };
+   await step('open_fence',window=>store.openFence({identity,window},parent.lease));if(['open','unknown-open_fence'].includes(kind))return {identity};
+   await step('authorization',window=>store.insertAuthorization({identity,window},parent.lease));if(['authorization','unknown-authorization'].includes(kind))return {identity};
+   const pstore=phaseStore({storage:this.ctx.storage,now:Date.now}),link={preconnectionId:c.preconnectionId,authorizationHash:identity.authorizationHash,subjectHash:f.ticket.subjectHash,sourceRevision:c.sourceRevision,projectRef:f.ticket.projectRef,clientId:pre.clientId,resource:pre.resource,issuedAt:Date.now(),expiresAt:c.C0};
+   if((await pstore.putAuthorizationLink(link,parent.lease)).status!=='recorded')throw Error('SYN authorization link');
+   const consumed=await step('consume',window=>store.consumeAuthorization({identity,window,consumedAt:new Date().toISOString()},parent.lease));if(['consumed','unknown-consume'].includes(kind))return {identity};
+   await step('grant',window=>store.insertReadGrant({identity,window,consumption:consumed,grant:{scopes:['afw:project:read'],createdAt:new Date().toISOString(),expiresAt:new Date(c.C0).toISOString()}},parent.lease));if(['grant','unknown-grant'].includes(kind))return {identity};
+   const grantLink={preconnectionId:c.preconnectionId,authorizationHash:identity.authorizationHash,grantId:identity.grantId,grantHash:phaseRawSha(identity.grantId),acceptedAt:Date.now()};
+   if((await pstore.putLink({kind:'grant',record:grantLink},parent.lease)).status!=='recorded')throw Error('SYN grant link');
+   const connectionRef='2'.repeat(64),linkedAt=Date.now(),relation={preconnectionId:c.preconnectionId,connectionRef,grantHash:grantLink.grantHash,linkedAt},connection={connectionRef,subject:pre.owner.subject,grantId:identity.grantId,clientId:pre.clientId,projectId:pre.project.projectId,resource:pre.resource,issuedAt:linkedAt,expiresAt:c.C0};
+   if((await pstore.putPreconnectionConnection({relation,connection},parent.lease)).status!=='recorded')throw Error('SYN connection pair');
+   return {identity,provenance:'actual D1/store mutation with real SQL clock; synthetic isolated evidence'};
+  }catch(e){return {fixtureError:String(e),stack:e.stack};}finally{parent.finish();}
+ }
+ async removePhaseIssuerFixture(){for(const [key]of await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:'}))await this.ctx.storage.delete(key);await this.ctx.storage.sync();}
+`;
+ const start=entry.indexOf(' async ownerSourceRead('),end=entry.indexOf(' async ownerEffectCount()',start);
+ if(start<0||end<start)throw Error('Original native request harness missing');
+ let method=entry.slice(start,end).replace('async ownerSourceRead(','async phaseContextRead(').replaceAll('readPrivateQaFiniteInitialOwnerSource(','readPrivateQaFiniteOwnerContext(');
+ // These legacy regressions intentionally hold ONE actual operation. Concurrent
+ // source credentials must not overwrite the single release RPC's callback.
+ const heldNeedle="if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{";
+ const heldReplacement="if(['held-fetch','held-body','held-cancel'].includes(mode)){let phaseHeld=false;const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{if(phaseHeld)return response;phaseHeld=true;";
+ if(method.split(heldNeedle).length!==2)throw Error('SYN exact phase held-operation hook changed');
+ method=method.replace(heldNeedle,heldReplacement);
+
+ // Read-only journal transactions are real transactions; mutation methods throw.
+ method=method.replace("s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;","s.put=noWrite;s.delete=noWrite;s.sync=noWrite;s.transaction=fn=>Reflect.apply(transaction,s,[tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:noWrite,delete:noWrite,setAlarm:noWrite,deleteAlarm:noWrite})]);");
+ method=method.replace('put=s.put,transaction=', 'put=s.put,del=s.delete,transaction=').replace('s.put=put;s.transaction=', 's.put=put;s.delete=del;s.transaction=');
+ // Every independent current observation must begin with SELECT, never PRAGMA.
+ method=method.replace('this.ownerRestore=restore;', `this.ownerRestore=restore;
+  this.phasePrimary=[];db.withSession=(constraint)=>{if(constraint!=='first-primary')throw Error('SYN non-primary');const session=Reflect.apply(withSession,db,[constraint]),prepare=session.prepare,queries=[];this.phasePrimary.push(queries);session.prepare=sql=>{if(!/^SELECT\\b/i.test(sql.trim()))throw Error('SYN non-read/first SQL');queries.push(sql);if(mode==='schema-failure'&&sql.includes('FROM sqlite_schema'))throw Error('SYN failed schema read');return Reflect.apply(prepare,session,[sql]);};return session;};`);
+ method=method.replace('catch{return{status:', 'catch(e){return{fixtureError:String(e),status:');
+ return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods+method+" async phasePrimaryReads(){return this.phasePrimary;}\n");
+}
+
+/** Seed the existing history through native D1 with the accepted ordinary
+ * issuer column defaults from the start. No rename/drop of referenced history. */
+export async function seedFiniteOwnerPhaseHistory(db,history,seedHistory){
+ const needle='revoked_at TEXT,exchanged_at TEXT)',replacement="revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')";
+ let adjusted=false;
+ const setupDb={prepare:sql=>db.prepare(sql),exec:sql=>{
+  if(sql.includes('CREATE TABLE delegated_access_grants')){if(adjusted||sql.split(needle).length!==2)throw Error('SYN grant schema drift');adjusted=true;sql=sql.replace(needle,replacement);}
+  return db.exec(sql);
+ }};
+ await seedHistory(setupDb,history);if(!adjusted)throw Error('SYN grant schema not initialized');
+ await db.prepare("CREATE TABLE delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')").run();
+}

~~~~~~~~~~

## test/fixtures/finite-owner-qa-sdk.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-qa-sdk.mjs b/test/fixtures/finite-owner-qa-sdk.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-qa-sdk.mjs
@@ -0,0 +1,186 @@
+import {captureNoticeBundle} from './finite-owner-notice-get.mjs';
+import {build} from 'esbuild';
+import {createHash} from 'node:crypto';
+import {readFile} from 'node:fs/promises';
+import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+// SYN fixture composition only. Actual source/SDK/journals/Unit2a modules remain.
+export function extendFiniteOwnerQaSdk(entry,{observed=false,noticeGet=false}={}){
+ const imports=`import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal,encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode} from './lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';\nimport {createPrivateQaFiniteOwnerOAuthReceiver} from './lib/mcp-qa-finite-owner-oauth-qa.mjs';\n`;
+ let methods=`
+ async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
+ async sdkObservation(){return {queue:this.sdkQueue??null,signals:this.sdkSignals??null,leaseSignals:globalThis.__d02QaSignals??null,held:!!this.sdkRelease,probes:globalThis.__d02Probes??[],primary:this.sdkPrimary??[],rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})],calls:this.sdkCalls??[]};}
+
+ async sdkReduceOriginal(){
+  const rows=[...await this.ctx.storage.list()],reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]),expected=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-owner-issuer-provenance.v1:')&&k.endsWith(':grant'))[1]);
+  const identity=reservation.identity,parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/reduction'));
+  try{
+   const store=phaseIssuerStore({ctx:this.ctx,env:this.env}),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,identity.C1)});
+   const barrier=await store.closeFence({identity,window:window(),fenceRequestId:'22222222-2222-4222-8222-222222222222'},parent.lease);
+   const before=await this.sdkGrant(identity.grantId),observation=await store.observeGrant({identity,barrier,expectedGrant:{scopes:expected.scopes,createdAt:expected.createdAt,expiresAt:expected.expiresAt},window:window()},parent.lease);
+   const reduced=await store.revokeGrant({identity,barrier,observation,window:window()},parent.lease);
+   return {fence:barrier.status,activeAfterFence:before.revoked_at==='',observation:observation.status,reduction:reduced.status,row:reduced.row};
+  }finally{parent.finish();}
+ }
+ async sdkTakeLateCode(){const code=globalThis.__d03LateCode??null;delete globalThis.__d03LateCode;return code;}
+ async sdkConfigure(mode='normal'){
+  globalThis.__d02Probes=[];
+
+  const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.sdkCalls=[];this.sdkMode=mode;this.sdkRelease=null;this.sdkRestore?.();
+  const methods={get:kv.get,put:kv.put,delete:kv.delete,list:kv.list};this.sdkRestore=()=>{for(const key of Object.keys(methods))kv[key]=methods[key];};
+  for(const key of Object.keys(methods))kv[key]=async(...args)=>{
+   const call={method:key,prefix:String(args[0]).split(':')[0]};this.sdkCalls.push(call);
+   if(key==='put'&&String(args[0]).startsWith('grant:'))call.actualGrantAck=[...await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:'})].some(([k])=>k.endsWith(':grant:ack'));
+   if(this.sdkMode==='stale'&&key==='get'&&String(args[0]).startsWith('transaction:'))return null;
+   if(key==='list')throw Error('SYN prohibited SDK list');
+   if(this.sdkMode==='miss'&&key==='get'&&String(args[0]).startsWith('client:'))return null;
+   if(this.sdkMode==='error'&&key==='get')throw Error('SYN KV error');
+   const actual=Reflect.apply(methods[key],kv,args);
+   if(this.sdkMode==='hold-'+key){this.sdkMode='held';return actual.then(value=>new Promise(resolve=>{this.sdkRelease=()=>resolve(value);}));}
+   return actual;
+  };
+ }
+ async sdkCorrupt(kind){
+  const rows=[...await this.ctx.storage.list()],capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]),id=capsule.preconnectionId,sp='afw.finite-owner-issuer-provenance.v1:'+id+':',ip='afw.finite-preparation-issuer.v1:'+id+':';
+  if(kind==='sdk-extra')await this.ctx.storage.put(sp+'unknown','SYN forbidden extra');
+  else if(kind==='sdk-observed'){const send=JSON.parse(await this.ctx.storage.get(sp+'sdk_begin:send'));await this.ctx.storage.put(sp+'sdk_begin:observed',sdkEncode('SdkObserved',sdkSeal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:'f'.repeat(64),observedAt:Date.now(),outcome:'resolved'})));}
+  else if(kind==='issuer-extra')await this.ctx.storage.put(ip+'unknown','SYN forbidden extra');
+  else if(kind==='issuer-freeze'){const r=JSON.parse(await this.ctx.storage.get(ip+'reservation'));await this.ctx.storage.put(ip+'freeze',phaseEncodeIssuer('Freeze',phaseSealIssuer('Freeze',{purpose:'afw.finite-preparation-issuer-freeze.v1',identityHash:r.identity.identityHash,reservationHash:r.recordHash,frozenAt:Date.now()})));}
+  else if(kind==='policy-send'){const ack=rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':ack'));if(!ack)throw Error('SYN policy ACK missing');await this.ctx.storage.delete(ack[0]);}
+  else if(kind==='absent-schema')await this.env.RELEASE_DB.prepare('DROP TABLE finite_preparation_issuer_fences').run();
+  else throw Error('SYN unknown fault');await this.ctx.storage.sync();
+ }
+ async sdkGrants(){return (await this.env.RELEASE_DB.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results;}
+ async sdkGrant(id){if(!/^[a-f0-9-]{36}$/.test(id))throw Error('SYN UUID');return this.env.RELEASE_DB.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(id).first();}
+ async sdkReplaceHolder(){const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,original=kv.get;kv.get=(...args)=>Reflect.apply(original,kv,args);}
+ async sdkAliasAbsent(absent){if(absent){this.sdkAlias=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.env.AFW_FINITE_OWNER_OAUTH_KV=undefined;}else this.env.AFW_FINITE_OWNER_OAUTH_KV=this.sdkAlias;}
+ async sdkPrimaryObserve(){
+  this.sdkPrimary=[];const db=this.env.RELEASE_DB,original=db.withSession;
+  db.withSession=constraint=>{const session=Reflect.apply(original,db,[constraint]),prepare=session.prepare,queries=[];this.sdkPrimary.push({constraint,queries});session.prepare=sql=>{queries.push(sql);const statement=Reflect.apply(prepare,session,[sql]);
+   if(this.sdkMode==='queue-grant'&&sql.includes('INSERT INTO delegated_access_grants')||this.sdkMode==='queue-open'&&sql.includes('INSERT INTO finite_preparation_issuer_fences')){
+    this.sdkMode='queued';const seen=this.sdkQueue={entered:false,returned:false,rowAbsent:null};return {bind(...args){const bound=statement.bind(...args);return {async first(){seen.entered=true;await new Promise(resolve=>setTimeout(resolve,5100));const row=await bound.first();seen.returned=true;seen.rowAbsent=row===null;return row;}};}};
+   }return statement;};return session;};
+ }
+ async sdkOldPath(path,headers={},body=''){
+  if(!['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve'].includes(path))throw Error('SYN path');
+  const h=new Headers(headers),at=Date.now();h.set('x-afw-finite-boundary',JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}));h.set('x-afw-finite-original-method','POST');h.set('x-afw-finite-original-url','https://delegated-canary.agentfriendlyweb.dev/authorize');h.set('x-afw-finite-version','77777777-7777-4777-8777-777777777777');h.set('x-afw-finite-request-id','77777777-7777-4777-8777-777777777777');
+  const response=await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(new Request('https://afw-private.invalid/_finite-owner'+path,{method:'POST',headers:h,body}));await response.body?.cancel();return response.status;
+ }
+ async sdkReleaseHeld(){this.sdkRelease?.();this.sdkRelease=null;}
+ async sdkReadCurrent(){
+  const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/authorize'));
+  try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}
+ }
+`;
+ if(observed)methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){this.sdkSignals={entryAborted:request.signal.aborted,abortObserved:false,settled:false,settledAborted:null};const seen=this.sdkSignals;request.signal.addEventListener('abort',()=>{seen.abortObserved=true;},{once:true});try{return await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}finally{seen.settled=true;seen.settledAborted=request.signal.aborted;}}");
+ // Ticket fixture is external SYN approval DATA, generated through genuine store.
+ // It must match a real bounded preparation cookie, never a positive source alias.
+ const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
+ if(!entry.includes(old))throw Error('SYN exact phase seed changed');
+ if(noticeGet){
+  methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){if(request.url==='https://afw-private.invalid/_finite-owner/monitoring')return createPrivateQaFiniteOwnerNoticeGetReceiver({ctx:this.ctx,env:this.env}).fetch(request);if(request.url==='https://afw-private.invalid/_finite-owner/monitoring/grant')return createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx:this.ctx,env:this.env}).fetch(request);return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}");
+ }
+ return (noticeGet?"import {createPrivateQaFiniteOwnerNoticeGetReceiver,createPrivateQaFiniteOwnerNoticeConsentReceiver} from './lib/mcp-qa-finite-owner-notice-get-qa.mjs';\n":"")+imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+}
+export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false,io=false,noticeGet=false}={}){
+ const mProfile=finiteWranglerProfileTemplate('canaryLive');let outgoingInstrumentations=0;
+ let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
+ import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
+ export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
+ if(token)source=`import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
+ import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
+ import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
+ const issuer='https://delegated-canary.agentfriendlyweb.dev',worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp'});let tokenPins=null,wrongNamespace=false;
+ export default{async fetch(request,env,ctx){
+  const path=new URL(request.url).pathname;
+  if(path==='/fixture/token-config'&&request.method==='POST'){
+   const pins=await request.json();tokenPins={AFW_OAUTH_PILOT_CLIENT_ID:pins.clientId,AFW_OAUTH_PILOT_PROJECT_ID:pins.projectId,AFW_OAUTH_PILOT_EXPIRES_AT:pins.expiresAt,ACCESS_AUD:pins.audience,ACCESS_TEAM_DOMAIN:pins.teamDomain};return new Response(null,{status:204});
+  }
+  if(path==='/fixture/token-namespace'&&request.method==='POST'){wrongNamespace=true;return new Response(null,{status:204});}
+  if(path==='/oauth/token'||path==='/mcp'){const headers=new Headers(request.headers);headers.set('Host',new URL(issuer).host);return worker.fetch(new Request(request,{headers}),{...env,...tokenPins,...(wrongNamespace?{OAUTH_KV:env.SYN_WRONG_KV}:{})},ctx);}
+  if(path!=='/authorize')return new Response(null,{status:404});
+  const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}
+ }};`;
+ if(noticeGet){
+  source="import {readFiniteOwnerRequestDeadline as noticeDeadline} from './lib/mcp-qa-finite-owner-preparation.mjs';\nimport {observeFiniteOwnerRequestWork as noticeObserve} from './lib/mcp-qa-finite-stage-work.mjs';\nimport {forwardPrivateFiniteOwnerNoticeGet,forwardPrivateFiniteOwnerNoticeConsent} from './lib/mcp-qa-finite-owner-notice-get-forward.mjs';\n"+source;
+  source=source.replace("if(path!=='/authorize')return new Response(null,{status:404});", "if(path==='/fixture/consent-abort'){globalThis.__noticeMRoot?.finish();return new Response(null,{status:204});}\n  if(path==='/fixture/consent-body-state')return Response.json(globalThis.__noticeMBody?.state??{});\n  if(path==='/fixture/consent-body-release'){if(globalThis.__noticeMBody)globalThis.__noticeMBody.state.releaseCancelRequested=true;return new Response(null,{status:204});}\n  if(path==='/fixture/consent-body-probe'){\n   const held=globalThis.__noticeMBody,root=createFiniteOwnerRequestLease(request);let allowed=false,reason=null;try{await noticeObserve({ctx:held.ctx,env:held.env,originalLease:root.lease},async()=>{});allowed=true;}catch(error){reason=error.message;}finally{root.finish();}return Response.json({allowed,reason,cancelSettled:held.state.cancelSettled,rootAborted:held.root?.lease.signal.aborted??null});\n  }\n  if(path==='/fixture/consent-body-release-read'){if(globalThis.__noticeMBody)globalThis.__noticeMBody.state.releaseReadRequested=true;return new Response(null,{status:204});}\n  if(path==='/fixture/consent-body-start'||path==='/fixture/consent-body-read-start'){\n   const kind=path==='/fixture/consent-body-read-start'?'read':'overflow',state={readEntered:false,readSettled:false,cancelEntered:false,cancelSettled:false,releaseReadRequested:false,releaseCancelRequested:false},held=globalThis.__noticeMBody={state,ctx,env};\n   let originalDeadline;\n   // SYN controls only set DATA. Stream IO stays in its original invocation.\n   const released=flag=>new Promise((resolve,reject)=>{\n    const tick=()=>{const remaining=originalDeadline-Date.now();if(!Number.isSafeInteger(remaining)||remaining<=0){reject(Error('SYN original body deadline'));return;}if(state[flag]){resolve();return;}setTimeout(tick,Math.min(10,remaining));};tick();\n   });\n   const body=new ReadableStream({\n    start(c){if(kind==='overflow')c.enqueue(new Uint8Array(1025));},\n    pull(c){if(kind==='read'&&!state.readEntered){state.readEntered=true;return released('releaseReadRequested').then(()=>{state.readSettled=true;c.enqueue(new TextEncoder().encode('handle='+'a'.repeat(43)));});}},\n    cancel(){state.cancelEntered=true;return released('releaseCancelRequested').then(()=>{state.cancelSettled=true;});}\n   },{highWaterMark:0});\n   const original=new Request(issuer+'/monitoring/grant',{method:'POST',headers:request.headers,body}),root=createFiniteOwnerRequestLease(original);originalDeadline=noticeDeadline(root.lease);globalThis.__noticeMRoot=root;held.root=root;\n   try{const response=await forwardPrivateFiniteOwnerNoticeConsent({request:original,env,ctx},root.lease);state.response=response.status;await response.body?.cancel();return Response.json(state);}finally{root.finish();}\n  }\n    "+"if(['/monitoring','/monitoring/grant','/monitoring/revoke'].includes(path)){if(!(request.method==='GET'&&path==='/monitoring'||request.method==='POST'&&path==='/monitoring/grant'))return new Response(null,{status:405});const root=createFiniteOwnerRequestLease(request);try{globalThis.__noticeMRoot=root;return await (path==='/monitoring'?forwardPrivateFiniteOwnerNoticeGet:forwardPrivateFiniteOwnerNoticeConsent)({request,env,ctx},root.lease);}finally{root.finish();}}if(path!=='/authorize')return new Response(null,{status:404});");
+ }
+ if(observed||io)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
+ const plugins=observed||io?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
+  outgoingInstrumentations++;let contents=await readFile(args.path,'utf8');const needle="const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();";
+  if(contents.split(needle).length!==2)throw Error('SYN outgoing observation changed');
+  contents=contents.replace(needle,"const outgoing=new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});globalThis.__d02M.outgoingEntryAborted=outgoing.signal.aborted;globalThis.__d02M.outgoingAbortObserved=false;outgoing.signal.addEventListener('abort',()=>{globalThis.__d02M.outgoingAbortObserved=true;},{once:true});const response=await Reflect.apply(fetcher,stub,[outgoing]);check();");
+  return {contents,loader:'js'};
+ });}}]:[];
+
+ if(noticeGet)plugins.push({name:'SYN-notice-M-body-observation',setup(b){
+  b.onLoad({filter:/mcp-qa-finite-owner-notice-consent-body\.mjs$/},async args=>{
+   let contents=await readFile(args.path,'utf8');
+   const once=(needle,next)=>{if(contents.split(needle).length!==2)throw Error('SYN body observation marker');contents=contents.replace(needle,next);};
+   once(" const reader=message.body?.getReader();"," const seen=globalThis.__noticeMBody?.state;const reader=message.body?.getReader();");
+   once("const {done,value}=await retain(reader.read());","const actualRead=reader.read();if(seen)seen.readNativeEntered=true;actualRead.then(()=>{if(seen)seen.readNativeSettled=true;},()=>{if(seen)seen.readNativeRejected=true;});const {done,value}=await retain(actualRead);");
+   once("try{await retain(reader.cancel());}catch{}throw error;}","try{const actualCancel=reader.cancel();if(seen)seen.cancelNativeEntered=true;actualCancel.then(()=>{if(seen)seen.cancelNativeSettled=true;},()=>{if(seen)seen.cancelNativeRejected=true;});await retain(actualCancel);}catch{}throw error;}finally{if(seen)seen.bodyFinally=true;}");
+   return {contents,loader:'js'};
+  });
+  b.onLoad({filter:/mcp-qa-finite-owner-notice-get-forward\.mjs$/},async args=>{
+   let contents=await readFile(args.path,'utf8');
+   const once=(needle,next)=>{if(contents.split(needle).length!==2)throw Error('SYN forward observation marker');contents=contents.replace(needle,next);};
+   once("async signalFailure=>{","async signalFailure=>{try{");
+   once("  }));","  }finally{const seen=globalThis.__noticeMBody?.state;if(seen)seen.actualCallbackFinally=true;}}));");
+   once("const bytes=await (consent?readFiniteOwnerNoticeConsentBody:finiteNativeBytes)(request,check,first);","const actualBody=(consent?readFiniteOwnerNoticeConsentBody:finiteNativeBytes)(request,check,first),seen=globalThis.__noticeMBody?.state;if(seen)seen.bodyPromiseEntered=true;actualBody.then(()=>{if(seen)seen.bodyPromiseSettled=true;},()=>{if(seen)seen.bodyPromiseRejected=true;});const bytes=await actualBody;");
+   once(" }catch{return pending();}"," }catch{return pending();}finally{const seen=globalThis.__noticeMBody?.state;if(seen)seen.outerFinally=true;}");
+   return {contents,loader:'js'};
+  });
+ }});
+
+ const built=await build({plugins,stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
+ if((observed||io)&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
+ if(noticeGet)await captureNoticeBundle(built,'M',{'<stdin>':source});
+ console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
+ return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
+  name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:mProfile.compatibility_date,compatibilityFlags:mProfile.compatibility_flags,
+  kvNamespaces:{OAUTH_KV:'finite-sdk-shared',...(token?{SYN_WRONG_KV:'finite-sdk-wrong'}:{})},
+  ...(token?{d1Databases:{DB:qa.d1Databases.RELEASE_DB},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99123',simple:{limit:1000,period:60}}}}:{}),
+  bindings:{...(token?{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_REFRESH_ENABLED:'false',AFW_OAUTH_SERVICE_MODE:'window',AFW_DOSSIER_EVENTS_ENABLED:'false'}:{}),AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
+  durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}
+ }].reverse()};
+}
+export async function seedFiniteOwnerSdkClient(mf,source){
+ const kv=await mf.getKVNamespace('OAUTH_KV','m-sdk');
+ await kv.put('client:'+source.clientId,JSON.stringify({clientId:source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
+}
+
+/** Fixed read-only observation in the same genuine request scope, used only in
+ * hostile fixtures. No witness/root/source result leaves the lexical stack. */
+export function instrumentFiniteOwnerQaSdk(source){
+ const noticeStart=source.indexOf('/** UNMOUNTED fixed GET.'),noticeSuffix=noticeStart<0?'':source.slice(noticeStart);if(noticeStart>=0)source=source.slice(0,noticeStart);
+ const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN observation point changed');source=source.replace(needle,replacement);};
+ once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","globalThis.__d02QaSignals={entryAborted:originalLease.signal.aborted,abortObserved:false,sdkSettledAborted:null};const signalSeen=globalThis.__d02QaSignals;onAbort=()=>{signalSeen.abortObserved=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
+ once("actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';","actualPromise=retain(Promise.resolve().then(()=>{check();return call();}).then(value=>{signalSeen.sdkSettledAborted=originalLease.signal.aborted;return value;}));position='sdk-pending';");
+ const probe=kind=>`let strictUnavailable=false;try{await readPrivateQaFiniteOwnerContext({ctx,env,parent:originalLease});}catch{strictUnavailable=true;}(globalThis.__d02Probes??=[]).push({kind:'${kind}',op,strictUnavailable});`;
+ once("await sdkAppend('SdkSend',send,op);await recheckOwned();check();","await sdkAppend('SdkSend',send,op);"+probe('sdk')+"await recheckOwned();check();");
+ once("await issuerAppend('Send',send,op);await recheckOwned();check();","await issuerAppend('Send',send,op);"+probe('issuer')+"await recheckOwned();check();");
+ once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();(globalThis.__d02Probes??=[]).push({kind:'consumption',sameChild:consumptionChild===l,sameStore:consumptionStore===store,remainingMs:w.deadline-Date.now(),windowMs:w.deadline-w.startedAt});");
+ return source+noticeSuffix;
+}
+
+/** Read-only audit of this test's actual SDK1.2.1 encrypted grant. This public
+ * wrapping constant and HMAC/AES-KW/AES-GCM format are from pinned
+ * cloudflare/workers-oauth-provider v1.2.1 src/oauth-provider.ts:6334-6408.
+ * No token exchange, SDK substitute, code logging or production key access. */
+export async function readSyntheticIssuedGrantProps(code,grant){
+ const publicWrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
+ const hmac=await crypto.subtle.importKey('raw',publicWrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
+ const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code));
+ const wrapping=await crypto.subtle.importKey('raw',material,{name:'AES-KW'},false,['unwrapKey']);
+ const key=await crypto.subtle.unwrapKey('raw',Buffer.from(grant.authCodeWrappedKey,'base64'),wrapping,{name:'AES-KW'},{name:'AES-GCM'},false,['decrypt']);
+ const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,Buffer.from(grant.encryptedProps,'base64'));
+ return JSON.parse(new TextDecoder().decode(bytes));
+}
+
+/** Test-only observation of the actual SDK Promise result, before the original
+ * await/recheck rejects a terminally reduced operation. No result substitution. */
+export function instrumentFiniteOwnerQaSdkLate(source){
+ const needle="actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';";
+ if(source.split(needle).length!==2)throw Error('SYN late observation point changed');
+ return source.replace(needle,"actualPromise=retain(Promise.resolve().then(()=>{check();return call();}).then(value=>{if(op==='sdk_complete')globalThis.__d03LateCode=new URL(value.redirectTo).searchParams.get('code');return value;}));position='sdk-pending';");
+}

~~~~~~~~~~

## test/fixtures/finite-owner-source.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-source.mjs b/test/fixtures/finite-owner-source.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-source.mjs
@@ -0,0 +1,15 @@
+import * as ownerLeases from '../../lib/mcp-qa-finite-owner-preparation.mjs';
+// SYNTHETIC SOURCE ONLY, substituted statically by esbuild in native tests.
+// No fixture is imported by any production module or qualified as runtime evidence.
+export async function readPrivateQaFiniteOwnerSource({ctx,env,parent,preconnectionId}){
+ parent.assertCurrent();
+ if(ctx.requestLineage){const context=ownerLeases.readFiniteOwnerRequestContext(parent);let cloneDenied=false;try{ownerLeases.readFiniteOwnerRequestContext({...parent});}catch{cloneDenied=true;}ctx.requestLineage.push({sameRoot:context?.root===ctx.requestRoot,remaining:context?.deadline-Date.now(),cloneDenied,frozen:Object.isFrozen(context)});}
+ if(env.RELEASE_DB===env.DB)throw Error('synthetic wrong release binding');
+ const source=await ctx.storage.get('fixture:source');
+ const delay=await ctx.storage.get('fixture:delay');
+ if(delay){delay.calls++;if(delay.calls===delay.atCall){delay.fired=true;await ctx.storage.put('fixture:delay',delay);await new Promise(resolve=>setTimeout(resolve,delay.ms));}else await ctx.storage.put('fixture:delay',delay);}
+ parent.assertCurrent();
+ if(!source)throw Error('synthetic source absent');
+ if(source.phase!=='closed_ui'&&preconnectionId===null)throw Error('exact later-stage source ref required');
+ return source;
+}

~~~~~~~~~~

## test/fixtures/finite-owner-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-worker.mjs b/test/fixtures/finite-owner-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-worker.mjs
@@ -0,0 +1,187 @@
+import * as ownerPreparation from '../../lib/mcp-qa-finite-owner-preparation.mjs';
+import {createDelegatedOAuthStore} from '../../lib/delegated-oauth-store.mjs';
+import {recordDossierMonitoringConsent} from '../../lib/dossier-monitoring-authority.mjs';
+import {DurableObject} from 'cloudflare:workers';
+import {createFiniteOwnerComponentHost} from './finite-owner-component-host.mjs';
+import * as stageWork from '../../lib/mcp-qa-finite-stage-work.mjs';
+import {createFiniteOwnerPreparationHost} from '../../lib/mcp-qa-finite-owner-http.mjs';
+import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
+import {createFiniteOwnerRequestLease,readFiniteOwnerPreparation,recordFinitePreparationGrant,recordFinitePreparationNotice,recordFinitePreparationAuthorization} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
+const origin='https://delegated-canary.agentfriendlyweb.dev';
+const H='a'.repeat(64),M='b'.repeat(40),U='11111111-1111-4111-8111-111111111111';
+export class FiniteOwnerFixture extends DurableObject{
+ async fetch(request){
+  const path=new URL(request.url).pathname;
+
+  if(path==='/fixture/pending-host')return createFiniteOwnerPreparationHost({ctx:this.ctx,env:this.env}).fetch(new Request(origin+'/connections/finite-prepare',{method:request.method==='POST'?'POST':'GET',headers:request.headers,body:request.method==='POST'?'decision=approve':undefined}));
+  if(path==='/fixture/request-state')return Response.json({held:!!this.requestGate?.held,cancelHeld:!!this.requestGate?.cancelHeld,settled:!!this.requestGate?.settled,denied:this.requestGate?.denied??null});
+  if(path==='/fixture/request-release'){this.requestGate?.release?.();return Response.json({released:true});}
+  if(path==='/fixture/request-probe'){
+   const p=createFiniteOwnerRequestLease(request),ctx=this.requestCtx??this.ctx;
+   const probe=fn=>{try{return fn(),true;}catch{return false;}};
+   const observer=stageWork.observeFiniteOwnerRequestWork;
+   const admission={lease:p.lease};
+   let requestAllowed=false,readAllowed=false,ownerAllowed=false;
+   try{requestAllowed=await observer({ctx,env:this.env,originalLease:p.lease},async()=>true);}catch{}
+   try{readAllowed=await stageWork.observeFiniteReadOnlyWork({ctx,env:this.env,originalLease:p.lease},async()=>true);}catch{}
+   try{ownerAllowed=await stageWork.observeFiniteOwnerStageWork({ctx,env:this.env,originalLease:p.lease,admission},async()=>true);}catch{}
+   p.finish();return Response.json({requestAllowed,readAllowed,ownerAllowed,continueAllowed:probe(()=>stageWork.continueFiniteOwnerStageWork({ctx,env:this.env,originalLease:p.lease},async()=>true))});
+  }
+  if(path==='/fixture/request-prepare'){
+   const input=await request.json(),actual=this.ctx.storage,gate={held:false,cancelHeld:false,settled:false};this.requestGate=gate;
+   const wait=()=>new Promise(resolve=>{gate.held=true;gate.release=()=>{gate.settled=true;resolve();};});
+   const storage={get:async(...a)=>{const v=await actual.get(...a);if(input.mode==='source'&&!gate.held&&a[0]==='fixture:source')await wait();return v;},put:(...a)=>actual.put(...a),transaction:async fn=>{
+    if(input.mode==='ticket'||input.mode==='approval'){
+     let target=false;const wrapped=tx=>fn({get:(...a)=>tx.get(...a),put:(key,...a)=>{if(input.mode==='ticket'?key.startsWith('owner-ticket:')&&!key.endsWith(':use'):key.startsWith('connection-approval:'))target=true;return tx.put(key,...a);}});
+     const v=await actual.transaction(wrapped);if(target&&!gate.held)await wait();return v;
+    }return actual.transaction(fn);
+   }};
+   const ctx={id:this.ctx.id,storage,requestLineage:[]};this.requestCtx=ctx;
+   let body=input.body;
+   if(input.mode==='body')body=new ReadableStream({pull(controller){return new Promise(resolve=>{gate.held=true;gate.release=()=>{controller.enqueue(new Uint8Array([104]));resolve();};});},cancel(){gate.cancelHeld=true;return new Promise(resolve=>{gate.release=()=>{gate.settled=true;resolve();};});}});
+   if(input.mode==='oversize')body=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(1025));},cancel(){gate.cancelHeld=true;return new Promise(resolve=>{gate.release=()=>{gate.settled=true;resolve();};});}});
+   const original=new Request(origin+'/connections/finite-prepare',{method:input.method??'GET',headers:input.headers,body}),parent=createFiniteOwnerRequestLease(original);ctx.requestRoot=parent.lease;
+   const observer=stageWork.observeFiniteOwnerRequestWork;
+   try{return await observer({ctx,env:this.env,originalLease:parent.lease},async()=>{try{return Response.json({result:await ownerPreparation.prepareFiniteOwnerChoice({ctx,env:this.env,request:original},parent.lease),lineage:ctx.requestLineage});}catch(e){gate.denied=true;return Response.json({rejected:true,status:e.status??503});}finally{parent.finish();}});}
+   finally{parent.finish();}
+  }
+
+
+  if(path==='/fixture/owner-borrow'){
+   const input=await request.json(),original=new Request(origin+'/connections/finite-prepare',{method:'POST',headers:input.headers,body:input.body}),parent=createFiniteOwnerRequestLease(original);
+   const ctx=this.ctx,env=this.env,gate={held:false,settled:false};this.requestCtx=ctx;this.requestGate=gate;
+   try{return await stageWork.observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>{
+    const prepared=await ownerPreparation.prepareFiniteOwnerChoice({ctx,env,request:original},parent.lease);
+    const refs={ctx,env,preconnectionId:prepared.preconnectionId,stage:prepared.stage};
+    const admission=ownerPreparation.consumeFiniteOwnerStageAdmission(refs,parent.lease);
+    let replayDenied=false;try{ownerPreparation.consumeFiniteOwnerStageAdmission(refs,parent.lease);}catch{replayDenied=true;}
+    return await stageWork.adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease:parent.lease},async()=>{
+     const borrow=arg=>stageWork.observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:parent.lease,...arg},async()=>true);
+     const denied={};const reject=(key,fn)=>{try{fn();denied[key]=false;}catch{denied[key]=true;}};
+     const foreign=createFiniteOwnerRequestLease(new Request(origin));
+     try{reject('foreign',()=>borrow({requestLease:foreign.lease}));reject('clone',()=>borrow({requestLease:{...parent.lease}}));}
+     finally{foreign.finish();}
+     reject('ctx',()=>borrow({ctx:{storage:ctx.storage}}));
+     const storage=ctx.storage,db=env.RELEASE_DB;
+     // Native ctx.storage is readonly. Substitution is tested through a distinct
+     // context; the actual DB binding can drift and must not be borrowed.
+     reject('storage',()=>borrow({ctx:{id:ctx.id,storage:{}}}));
+     env.RELEASE_DB={};reject('db',()=>borrow({}));env.RELEASE_DB=db;
+     let borrowed=false;
+     try{borrowed=await stageWork.observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:parent.lease},async()=>{
+      const actual=Promise.resolve(storage.get('fixture:source')).then(()=>new Promise(resolve=>{gate.held=true;gate.release=()=>{gate.settled=true;resolve();};}));
+      stageWork.retainFiniteOwnerStagePromise(actual);await Promise.resolve();return true;
+     });}catch{}
+     if(input.probeExpiry){const now=Date.now;Date.now=()=>now()+10000;try{reject('admissionExpiry',()=>borrow({}));}finally{Date.now=now;}}
+     return Response.json({borrowed,replayDenied,denied});
+    });
+   });}finally{parent.finish();}
+  }
+
+  if(path==='/fixture/admission'){
+   const input=await request.json(),original=new Request(input.url,{method:'POST',headers:input.headers,body:input.body}),parent=ownerPreparation.createFiniteOwnerRequestLease(original);
+   let result,first=false,second=false,wrong=false,expired=false,qualified=false,deadlineBound=false,cloneDenied=false,finishedDenied=false;
+   try{const end=ownerPreparation.readFiniteOwnerRequestDeadline(parent.lease);deadlineBound=Number.isSafeInteger(end)&&end>Date.now()&&end<=Date.now()+30000;}catch{}
+   try{ownerPreparation.readFiniteOwnerRequestDeadline({...parent.lease});}catch{cloneDenied=true;}
+   try{
+    result=await ownerPreparation.prepareFiniteOwnerChoice({ctx:this.ctx,env:this.env,request:original},parent.lease);
+    const refs={ctx:this.ctx,env:this.env,preconnectionId:result.preconnectionId,stage:result.stage};
+    if(input.finish)parent.finish();
+    if(input.wrong)try{ownerPreparation.consumeFiniteOwnerStageAdmission({...refs,preconnectionId:'e'.repeat(64)},parent.lease);wrong=true;}catch{}
+    try{const admission=ownerPreparation.consumeFiniteOwnerStageAdmission(refs,parent.lease);admission.lease.assertCurrent();first=true;qualified=Object.isFrozen(admission)&&admission.ownerSource.actorId===this.ctx.id.toString()&&/^[a-f0-9]{64}$/.test(admission.stageApprovalHash);}catch{}
+    try{ownerPreparation.consumeFiniteOwnerStageAdmission(refs,parent.lease);second=true;}catch{}
+    parent.finish();
+    expired=parent.lease.signal.aborted;
+    try{ownerPreparation.readFiniteOwnerRequestDeadline(parent.lease);}catch{finishedDenied=true;}
+    return Response.json({prepared:result.status===202,first,second,wrong,expired,qualified,deadlineBound,cloneDenied,finishedDenied});
+   }catch{return Response.json({rejected:true});}finally{parent.finish();}
+  }
+  if(path==='/fixture/init'){
+   const at=Date.now(),source={sourceRevision:M,actorId:this.ctx.id.toString(),qaNamespaceId:'c'.repeat(32),qaVersionId:U,origin,phase:'closed_ui',access:{teamDomain:'finite-fixture.cloudflareaccess.com',audience:'finite-owner'},clientId:'synthetic-client',resource:origin+'/mcp',project:{projectId:'synthetic-owned',revision:1,synthetic:true},goal:'discovery',programContext:{programHash:H,sourceRevision:'d'.repeat(40),originalContextHash:H},initialBaseline:{versionId:U,deploymentId:U,moduleHash:H,configurationHash:H,bindingsHash:H},currentPublication:{stage:null,versionId:U,deploymentId:U,receiptHash:null},window:{startedAt:at-100,expiresAt:at+899000}};
+   await this.ctx.storage.put('fixture:source',source);
+   return Response.json({initialized:true});
+  }
+  if(path==='/fixture/delay'){await this.ctx.storage.put('fixture:delay',{...await request.json(),calls:0,fired:false});return Response.json({configured:true});}
+  if(path==='/fixture/delay-state')return Response.json(await this.ctx.storage.get('fixture:delay'));
+  if(path==='/fixture/source'){
+   const source=await this.ctx.storage.get('fixture:source'),changes=await request.json();
+   await this.ctx.storage.put('fixture:source',{...source,...changes});return Response.json({changed:true});
+  }
+  if(path==='/fixture/rows'){
+   const rows=[...await this.ctx.storage.list()].filter(([k])=>!k.startsWith('fixture:'));
+   return Response.json(rows);
+  }
+  if(path==='/fixture/store'){
+   const {method,arg,loseAck}=await request.json(),actual=this.ctx.storage,storage=loseAck?{get:(...a)=>actual.get(...a),transaction:async fn=>{await actual.transaction(fn);throw Error('synthetic lost pair ACK');}}:actual,store=createFiniteOwnerPreparationStore({storage,now:Date.now}),lease={signal:new AbortController().signal,assertCurrent(){}};
+   try{return Response.json({result:await store[method](arg,lease)});}catch{return Response.json({rejected:true});}
+  }
+  if(path==='/fixture/read'){
+   const input=await request.json();try{return Response.json({result:await readFiniteOwnerPreparation({ctx:this.ctx,env:this.env,...input,signal:request.signal})});}catch{return Response.json({rejected:true});}
+  }
+  if(path==='/fixture/monitoring'){
+   const input=await request.json(),now=Date.now();
+   return Response.json(await recordDossierMonitoringConsent({db:this.env.RELEASE_DB,subject:'owner',grantId:'accepted-grant',projectId:'synthetic-owned',expectedRevision:1,expectedSequence:input.expectedSequence,requestId:input.requestId,action:input.action,now,expiresAt:input.expiresAt,expectedClientId:'synthetic-client',expectedResource:origin+'/mcp'}));
+  }
+  if(path==='/fixture/held-child'){
+   const parent=createFiniteOwnerRequestLease(request);
+   try{
+    const {mode,authorizationHash,secondHash,url,headers}=await request.json(),actual=this.ctx.storage;
+    let releaseFirst,releaseSecond,secondEnteredResolve,firstSettledResolve,firstCommitted=false,transactions=0;
+    const firstGate=new Promise(resolve=>{releaseFirst=resolve;}),secondGate=new Promise(resolve=>{releaseSecond=resolve;});
+    const secondEntered=new Promise(resolve=>{secondEnteredResolve=resolve;}),firstSettled=new Promise(resolve=>{firstSettledResolve=resolve;});
+    const storage={get:(...a)=>actual.get(...a),put:(...a)=>actual.put(...a),transaction:async fn=>{
+     const number=++transactions;
+     if(number===1){
+      try{
+       if(mode==='before')await firstGate;
+       const result=await actual.transaction(fn);firstCommitted=true;
+       if(mode==='after')await firstGate;
+       return result;
+      }finally{firstSettledResolve();}
+     }
+     if(number===2){secondEnteredResolve();await secondGate;}
+     return actual.transaction(fn);
+    }};
+    const ctx={id:this.ctx.id,storage},original=()=>new Request(url,{headers});
+    let hookRejected=false;
+    try{await recordFinitePreparationAuthorization({ctx,env:this.env,request:original(),authorizationHash},parent.lease);}catch{hookRejected=true;}
+    parent.lease.assertCurrent();
+    const now=new Date().toISOString(),grantStore=createDelegatedOAuthStore(this.env.RELEASE_DB.withSession('first-primary'));
+    const consumed=await grantStore.consumeConsent(authorizationHash,'owner','authorize',now);
+    await grantStore.createGrant({grantId:'held-child-grant',subject:'owner',clientId:'synthetic-client',projectId:'synthetic-owned',resource:origin+'/mcp',scopes:['afw:project:read'],createdAt:now,expiresAt:new Date(Date.now()+300000).toISOString()});
+    // A later child of the SAME still-live parent remains outstanding while the
+    // first one resumes; mutable shared current-child aliases must not revive it.
+    const second=recordFinitePreparationAuthorization({ctx,env:this.env,request:original(),authorizationHash:secondHash},parent.lease).then(r=>({result:r}),()=>({rejected:true}));
+    await secondEntered;await new Promise(resolve=>setTimeout(resolve,1000));
+    parent.lease.assertCurrent();const committedBeforeRelease=firstCommitted;
+    releaseFirst();await firstSettled;
+    releaseSecond();const secondResult=await second;
+    parent.lease.assertCurrent();
+    const first=await actual.get('connection-authorization:'+authorizationHash),other=await actual.get('connection-authorization:'+secondHash);
+    const grant=await createDelegatedOAuthStore(this.env.RELEASE_DB.withSession('first-primary')).getGrant('held-child-grant');
+    return Response.json({hookRejected,transactions,parentAlive:true,committedBeforeRelease,firstPresent:first!==undefined,secondPresent:other!==undefined,secondStatus:secondResult.result?.status,consumed:!!consumed,grantActive:grant?.status==='active'&&!grant.revokedAt});
+   }finally{parent.finish();}
+  }
+  if(path==='/fixture/link'){
+   const {kind,grantId,requestId,sequence,authorizationHash,url,headers,body,expired}=await request.json();
+   const original=new Request(url,{method:body?'POST':'GET',headers,body:body||undefined});
+   const lease={signal:new AbortController().signal,assertCurrent(){if(expired)throw Error('expired original parent');}};
+   try{const op={grant:recordFinitePreparationGrant,notice:recordFinitePreparationNotice,authorization:recordFinitePreparationAuthorization}[kind];
+    return Response.json({result:await op({ctx:this.ctx,env:this.env,request:original,...(kind==='grant'?{grantId}:kind==='notice'?{requestId,sequence}:{authorizationHash})},lease)});
+   }catch{return Response.json({rejected:true});}
+  }
+  let ctx=this.ctx;
+  if(request.headers.get('X-Fixture-Lose-Ack')==='true'){
+   const actual=this.ctx.storage;let lost=false;
+   const storage={get:(...a)=>actual.get(...a),transaction:async fn=>{const result=await actual.transaction(fn);if(!lost){lost=true;throw Error('synthetic lost native transaction acknowledgement');}return result;}};
+   ctx={id:this.ctx.id,storage};
+  }
+  return createFiniteOwnerComponentHost({ctx,env:this.env}).fetch(request);
+ }
+}
+const worker={fetch(request,env){
+ const name=request.headers.get('X-Fixture-Actor')||'owner';
+ return env.FIXTURE.get(env.FIXTURE.idFromName(name)).fetch(request);
+}};
+
+export default worker;

~~~~~~~~~~

## test/fixtures/finite-package-resolver.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-package-resolver.mjs b/test/fixtures/finite-package-resolver.mjs
--- /dev/null
+++ b/test/fixtures/finite-package-resolver.mjs
@@ -0,0 +1,17 @@
+import {build} from 'esbuild';
+import {readFile} from 'node:fs/promises';
+import {resolve} from 'node:path';
+import {QA_CLOUD_CLOSED_PINS} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
+import {createHash} from 'node:crypto';
+// Explicit synthetic SOURCE receipt mapping for transport tests. Production
+// has no injectable pins; actual receipt blob checks still use committed bytes.
+const bytes=Buffer.from("throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n");
+const pins=structuredClone(QA_CLOUD_CLOSED_PINS);
+for(const [key,p] of Object.entries(pins))p.module={name:key==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
+const b=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-package.mjs';export * from './lib/mcp-qa-finite-source.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as cr} from 'node:module';const require=cr(process.cwd()+'/package.json');"},plugins:[{name:'synthetic-literal-receipts',setup(api){
+ api.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins),loader:'js'}));
+ api.onLoad({filter:/mcp-qa-finite-package\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8')).replace("fileURLToPath(new URL('../scripts/verify-qa-finite-archive.py',import.meta.url))",JSON.stringify(resolve('scripts/verify-qa-finite-archive.py'))),loader:'js'}));
+}}]});
+const api=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64'));
+export const resolveFiniteNativePackage=api.resolveFiniteNativePackage;
+export const resolvePrivateQaFiniteExternalSource=api.resolvePrivateQaFiniteExternalSource;

~~~~~~~~~~

## test/fixtures/finite-policy-configuration-data.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-policy-configuration-data.mjs b/test/fixtures/finite-policy-configuration-data.mjs
--- /dev/null
+++ b/test/fixtures/finite-policy-configuration-data.mjs
@@ -0,0 +1,35 @@
+import {finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+
+// Explicit, expired synthetic DATA for pure configuration tests only.
+// These strings are structural grammar examples, not source or consent evidence.
+export function finitePolicyConfigurationFixture(){
+ const template=structuredClone(finitePublicProfileTemplate('canaryLive'));
+ const closedNames=new Set(['AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED']);
+ for(const binding of template.bindings){
+  if(binding.privateSlot){
+   delete binding.privateSlot;
+   binding.text=binding.name==='AFW_OAUTH_PILOT_PROJECT_ID'?'ci-prearm-project':binding.name==='AFW_OAUTH_PILOT_CLIENT_ID'?'ci-prearm-client':'';
+  }else if(closedNames.has(binding.name))binding.text='false';
+ }
+ template.bindings.push(
+  {name:'ACCESS_TEAM_DOMAIN',type:'plain_text',text:'ci-prearm.cloudflareaccess.com'},
+  {name:'ACCESS_AUD',type:'plain_text',text:'ci-prearm-aud'},
+  {name:'AFW_OAUTH_PILOT_EXPIRES_AT',type:'plain_text',text:'2026-11-03T02:59:00.000Z'},
+  {name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'2026101001',simple:{limit:10,period:60}},
+  {name:'AFW_DOSSIER_MONITORING_OWNER_POLICY',type:'plain_text',text:''}
+ );
+ const scope={accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',ownerRef:'1'.repeat(64),projectRef:'2'.repeat(64),resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'};
+ const original={containerId:'3'.repeat(64),applicationId:scope.applicationId,programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40)};
+ const candidate={trialId:'6'.repeat(64),programHash:'7'.repeat(64),sourceRevision:'8'.repeat(40),startAt:1000,expiresAt:301000,budget:1};
+ const publication={artifactKey:'9'.repeat(64),workerHash:'a'.repeat(64),activationKey:'b'.repeat(64)};
+ const event={grantId:'ci-synthetic-grant',subject:'ci-synthetic-subject',projectId:'ci-prearm-project',clientId:'ci-prearm-client',resource:scope.resource,startAt:1000,expiresAt:301000};
+ const policies={
+  AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(event),
+  AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:JSON.stringify({purpose:'afw.private-permission-withdrawal.v1',requestId:'11111111-2222-4333-8444-555555555555',startAt:241000,expiresAt:421000,originalConsent:{sequence:1,revision:1,issuedAt:1000,expiresAt:301000},containerId:'c'.repeat(64),programHash:candidate.programHash,sourceRevision:candidate.sourceRevision}),
+  AFW_DOSSIER_RETIREMENT_POLICY:JSON.stringify({programHash:original.programHash,sourceRevision:original.sourceRevision,...event,containerId:original.containerId}),
+  AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication}),
+  AFW_OAUTH_PILOT_CLIENT_ID:'ci-prearm-client',
+  AFW_OAUTH_PILOT_PROJECT_ID:'ci-prearm-project'
+ };
+ return {prearmConfiguration:template,policies};
+}

~~~~~~~~~~

## test/fixtures/finite-policy-setup-facts-seed.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-policy-setup-facts-seed.mjs b/test/fixtures/finite-policy-setup-facts-seed.mjs
--- /dev/null
+++ b/test/fixtures/finite-policy-setup-facts-seed.mjs
@@ -0,0 +1,3 @@
+import {syntheticMaterial} from './finite-policy-setup-facts-source.mjs';
+// SYNTHETIC original GitHub seed primary; actual setup facts reader is intact.
+export async function readFiniteMaterialSeed({intentId,sourceRevision,signal}){if(signal.aborted)throw Error('SYNTHETIC seed aborted');const value=syntheticMaterial();if(value.seed.intentId!==intentId||value.seed.sourceRevision!==sourceRevision)throw Error('SYNTHETIC seed mismatch');return value;}

~~~~~~~~~~

## test/fixtures/finite-policy-setup-facts-source.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-policy-setup-facts-source.mjs b/test/fixtures/finite-policy-setup-facts-source.mjs
--- /dev/null
+++ b/test/fixtures/finite-policy-setup-facts-source.mjs
@@ -0,0 +1,23 @@
+// SYNTHETIC fixed native source/GitHub primary only. No real provenance claim.
+// The actual readFiniteOwnerSetupFacts, current D1 owner/grant/notice reads,
+// historical stage receipts, selected/witness codec and SQLite store run intact.
+import {finitePolicySetupInstanceId} from '../../lib/mcp-qa-finite-policy-setup.mjs';
+let seed;
+export function syntheticMaterial(){if(!seed)throw Error('SYNTHETIC seed absent');return seed;}
+export async function readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},lease){
+ lease.assertCurrent();const arm=await ctx.storage.get('fixture:task4Arm'),ownerSource=await ctx.storage.get('fixture:source');lease.assertCurrent();
+ if(!arm||sourceRevision!==ownerSource.sourceRevision)throw Error('SYNTHETIC native source absent');
+ const T0=arm.T0,at=Date.now();
+ seed={seedHash:'a'.repeat(64),seed:{intentId,sourceRevision,qaPublication:{qaLive:{versionId:env.AFW_QA_VERSION.id}}},primaryEvidence:{T0,seedStepCompletedAt:arm.commandBy,R1:T0+480000}};
+ return {native:{setupInstanceId:finitePolicySetupInstanceId({intentId,sourceRevision}),sourceRevision,qaVersionId:env.AFW_QA_VERSION.id,eventTimestamp:at,queuedAt:at,startedAt:at,T0},ownerSource,originalContext:{},baseline:{},rollback:{},bytes:{},async assertCurrent(l){
+  l.assertCurrent();const current=await ctx.storage.get('fixture:source');l.assertCurrent();if(JSON.stringify(current)!==JSON.stringify(ownerSource))throw Error('SYNTHETIC source drift');
+ }};
+}
+export async function readPrivateQaFinitePolicyEntry(){throw Error('SYNTHETIC DO facts fixture only');}
+export async function observeActualFacts(actual,options,lease){
+ let facts;try{facts=await actual(options,lease);}catch(error){await options.ctx.storage.put('fixture:task4FactsResult',{accepted:false});throw error;}
+ lease.assertCurrent();
+ await options.ctx.storage.put('fixture:task4FactsResult',{accepted:true,T0:facts.material.primaryEvidence.T0,commandBy:facts.selected.preparation.commandBy,observedAt:Date.now(),selectedAt:facts.selected.selection.selectedAt,publishedAt:facts.witness.publishedAt,phase:facts.ownerSource.phase,publicationStage:facts.ownerSource.currentPublication.stage,programRevision:facts.value.programContext.sourceRevision,sourceRevision:facts.value.sourceRevision});
+ // STOP before binding/context/effects: positive qualification tests this reader.
+ throw Error('SYNTHETIC actual setup facts observed; no effect authority requested');
+}

~~~~~~~~~~

## test/fixtures/finite-policy-setup-facts-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-policy-setup-facts-worker.mjs b/test/fixtures/finite-policy-setup-facts-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-policy-setup-facts-worker.mjs
@@ -0,0 +1,27 @@
+import {FiniteConnectionFixture} from './finite-connection-worker.mjs';
+import {createPrivateQaFinitePolicySetup} from '../../lib/mcp-qa-finite-policy-setup.mjs';
+import {hashFinitePreparationRecord as hash} from '../../lib/mcp-qa-finite-preparation-records.mjs';
+import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
+export class SetupFactsFixture extends FiniteConnectionFixture{
+ async fetch(request){
+  const path=new URL(request.url).pathname;
+  if(path==='/fixture/task4-arm'){
+   const {mode}=await request.json(),lease={signal:new AbortController().signal,assertCurrent(){}},selected=await createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:Date.now}).readSelected({sourceRevision:'b'.repeat(40)},lease);
+   if(!selected)throw Error('SYNTHETIC actual selected preparation absent');
+   await this.ctx.storage.put('fixture:task4Arm',{commandBy:selected.preparation.commandBy,T0:mode==='selection'?Date.now():selected.preparation.commandBy-1});
+   return Response.json({commandBy:selected.preparation.commandBy});
+  }
+  if(path==='/fixture/task4-drift-selection'){
+   const lease={signal:new AbortController().signal,assertCurrent(){}},store=createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:Date.now}),previous=await store.readSelected({sourceRevision:'b'.repeat(40)},lease);
+   const raw={purpose:'afw.finite-owner-selection.v1',sourceRevision:previous.selection.sourceRevision,prepId:previous.preparation.prepId,preparationHash:previous.preparation.preparationHash,selectedAt:Date.now(),sequence:previous.selection.sequence+1,previousSelectionHash:previous.selection.selectionHash},selection={...raw,selectionHash:hash('Selection',raw)};
+   return Response.json(await store.publishSelection({preparation:previous.preparation,selection,expectedHeadHash:previous.selection.selectionHash},lease));
+  }
+  if(path==='/fixture/task4-facts'){
+   const outcome=await createPrivateQaFinitePolicySetup({ctx:this.ctx,env:this.env}).run({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)});
+   return Response.json({outcome,facts:await this.ctx.storage.get('fixture:task4FactsResult')});
+  }
+  return super.fetch(request);
+ }
+}
+const worker={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('owner')).fetch(request);}};
+export default worker;

~~~~~~~~~~

## test/fixtures/finite-policy-setup-native.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-policy-setup-native.mjs b/test/fixtures/finite-policy-setup-native.mjs
--- /dev/null
+++ b/test/fixtures/finite-policy-setup-native.mjs
@@ -0,0 +1,50 @@
+import assert from 'node:assert/strict';
+import {readFileSync} from 'node:fs';
+import {randomUUID} from 'node:crypto';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+const bundles=new Map();
+export async function policyFixture(t,mode='normal'){
+ const actualFacts=mode==='actual_facts_unavailable';
+ if(!bundles.has(actualFacts))bundles.set(actualFacts,(await build({entryPoints:['test/fixtures/finite-policy-setup-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'SYNTHETIC-fixed-qualification',setup(b){
+  if(!actualFacts)b.onLoad({filter:/mcp-qa-finite-owner-preparation\.mjs$/},args=>({contents:readFileSync(args.path,'utf8').replace('export async function readFiniteOwnerSetupFacts','async function unusedActualSetupFacts')+"\nexport {syntheticFacts as readFiniteOwnerSetupFacts} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-worker.mjs';",resolveDir:process.cwd()+'/lib',loader:'js'}));
+  b.onLoad({filter:/mcp-qa-finite-policy-setup-source\.mjs$/},args=>({contents:readFileSync(args.path,'utf8').replace('export async function readPrivateQaFinitePolicyEntry','async function unusedActualEntry')+"\nexport {syntheticEntry as readPrivateQaFinitePolicyEntry} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-worker.mjs';",resolveDir:process.cwd()+'/lib',loader:'js'}));
+ }}]})).outputFiles[0].text);
+ let state,pointer,versionId,deploymentId,posts=0;const requests=[],versions=new Map(),reads=[];
+ const envelope=result=>Response.json({success:true,errors:[],messages:[],result});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundles.get(actualFacts),compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'SetupFixture',useSQLite:true,uniqueKey:'finite-policy-setup'},AFW_RELEASE_EVENTS_NODE:{className:'SetupFixture',useSQLite:true,uniqueKey:'finite-policy-events'}},d1Databases:{RELEASE_DB:'SYNTHETIC_RELEASE'},bindings:{AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'},AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_00000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},outboundService:async request=>{
+  const url=new URL(request.url),root='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/';assert.equal(url.origin,'https://api.cloudflare.com');
+  assert(request.headers.get('Authorization').startsWith('Bearer SYNTHETIC_'));
+  if(request.method==='POST'){
+   posts++;const body=await request.json();requests.push({method:request.method,url:request.url,body});
+   if(url.pathname===root+'workers/agent-friendly-web-delegated-canary/versions'){
+    assert.equal(url.search,'?deploy=false');versionId=randomUUID();versions.set(versionId,body);
+    for(const binding of body.bindings.filter(b=>b.type==='inherit'))assert.deepEqual(binding,{name:binding.name,type:'inherit',version_id:state.baseline.versionId});
+    if(mode==='lost_ack')throw Error('SYNTHETIC upload ACK lost');
+    if(mode==='late_upload')await new Promise(r=>setTimeout(r,5200));
+    if(mode==='provider404')return Response.json({success:false,errors:[{}],result:null},{status:404});
+    return envelope({id:versionId});
+   }
+   assert.equal(url.pathname,root+'scripts/agent-friendly-web-delegated-canary/deployments');
+   assert.deepEqual(body,{strategy:'percentage',versions:[{version_id:versionId,percentage:100}]});
+   deploymentId=randomUUID();pointer={id:deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]};
+   if(mode==='lost_activation')throw Error('SYNTHETIC activation ACK lost');
+   return envelope(pointer);
+  }
+  reads.push(request.url);
+  if(url.pathname===root+'scripts/agent-friendly-web-delegated-canary/deployments'){
+   const observed=(mode==='foreign_pointer'||mode==='foreign_after_upload'&&posts>0)?{...pointer,id:randomUUID()}:pointer;
+   return envelope({deployments:[observed]});
+  }
+  const id=url.pathname.split('/').at(-1),uploaded=versions.get(id),pin=id===state.rollback.versionId?state.rollback:state.baseline;
+  const config=uploaded?{...uploaded,bindings:uploaded.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b),containers:uploaded.containers.map(b=>({...b,name:'agent-friendly-web-delegated-canary-afwowneventnode'}))}:pin.configuration;
+  const modules=uploaded?uploaded.modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(state.script).toString('base64')}];
+  if(uploaded&&mode==='wrong_bytes')modules[0].content_base64=Buffer.from('SYNTHETIC WRONG BYTES').toString('base64');
+  if(uploaded&&mode==='wrong_full')config.bindings=config.bindings.map(b=>b.name==='AFW_OAUTH_PILOT_CLIENT_ID'?{...b,text:'FOREIGN_SYNTHETIC_CLIENT'}:b);
+  return envelope({...config,id,urls:[],modules});
+ }}));
+ t.after(()=>mf.dispose());
+ const json=async(path,value={})=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,{method:'POST',body:JSON.stringify(value)});assert.equal(r.status,200,await r.clone().text());return r.json();};
+ state=await json('/init',{mode});pointer={id:state.baseline.deploymentId,strategy:'percentage',versions:[{version_id:state.baseline.versionId,percentage:100}]};
+ return {run:(direct=false)=>json('/run',{T0:state.T0,direct}),rows:()=>json('/rows'),hydration:()=>json('/hydration'),posts:()=>posts,requests,reads,state,actual:()=>({versionId,deploymentId})};
+}

~~~~~~~~~~

## test/fixtures/finite-policy-setup-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-policy-setup-worker.mjs b/test/fixtures/finite-policy-setup-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-policy-setup-worker.mjs
@@ -0,0 +1,79 @@
+import {retainFiniteOwnerStagePromise} from '../../lib/mcp-qa-finite-stage-work.mjs';
+import {createHash} from 'node:crypto';
+import {PrivateQaBootstrap,IndependentClosure} from '../../worker/independent-closure/finite.mjs';
+import {narrowFinitePolicySetupClock} from '../../lib/mcp-qa-finite-policy-setup.mjs';
+import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
+import {hashFinitePreparationRecord as hash,hashFiniteOwnerPreparationProject} from '../../lib/mcp-qa-finite-preparation-records.mjs';
+import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../../lib/mcp-qa-finite-profile.mjs';
+import {finiteActivationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
+import {finiteFixture} from './qa-finite-trial.mjs';
+// SYNTHETIC source/GitHub/CF/custody/owner qualification. Actual native class,
+// original clock logic, store, context/journal, transport and byte checks.
+const H='a'.repeat(64),M='b'.repeat(40),Q='c'.repeat(40),U='11111111-1111-4111-8111-111111111111',V='22222222-2222-4222-8222-222222222222',D='33333333-3333-4333-8333-333333333333',R='44444444-4444-4444-8444-444444444444';
+const sha=v=>createHash('sha256').update(v).digest('hex');
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
+const seal=(kind,value,key)=>({...value,[key]:hash(kind,value)});
+const script='export class AfwOwnEventNode{};export class AfwNodeControl{};export default {fetch(){return new Response(null,{status:404})}};';
+const refs={intentId:H,sourceRevision:M},hydrations=new WeakMap();
+function native(T0){return {setupInstanceId:'afw-finite-policy-'+sha('afw.finite-private-policy-setup.v1\n'+canonical(refs)),sourceRevision:M,qaVersionId:U,eventTimestamp:T0+200,queuedAt:T0+100,startedAt:T0+300,T0};}
+function make(env,T0,mode){
+ const config=structuredClone(finitePublicProfileTemplate('canaryLive'));for(const b of config.bindings)if(b.privateSlot){delete b.privateSlot;b.text='SYNTHETIC_PREARM';}
+ const closed=structuredClone(config);closed.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];for(const b of closed.bindings)if(b.type==='plain_text'&&b.name.endsWith('_ENABLED'))b.text='false';
+ const originalId=env.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString();
+ const artifact={script:mode==='oversize'?script+' '.repeat(2097153):script,sourceRevision:M,sourceTree:'d'.repeat(40),programHash:'e'.repeat(64),workerHash:sha(script),sourceCheck:'git-inputs-before-after-v1'};
+ if(mode==='oversize')artifact.workerHash=sha(artifact.script);
+ const {legacy}=finiteFixture({at:T0}).plan;
+ const originalContext={artifact,scope:{accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',ownerRef:H,projectRef:H,resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'},original:{containerId:originalId,applicationId:'d6fc71552de7494a863aca20365a572d',programHash:'f'.repeat(64),sourceRevision:Q},publication:{artifactKey:sha(JSON.stringify(['85d0d5dadac3341a564f22ce885e9eec','agent-friendly-web-delegated-canary',artifact.workerHash])),workerHash:artifact.workerHash,activationKey:H},cancellations:[],retirementPolicy:'SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT',withdrawalRequestId:U,saveIdempotencyKey:V,legacy,trialId:H};
+ const {script:unused,...artifactIdentity}=artifact;void unused;
+ const originalContextHash=sha('afw.finite-original-context.v1\n'+canonical({...originalContext,artifact:artifactIdentity}));
+ const project={projectId:'SYNTHETIC_OWN_PROJECT',revision:1,synthetic:true},expiry=T0+510001;
+ const preparation=seal('OwnerPreparation',{purpose:'afw.finite-owner-preparation.v1',prepId:H,sourceRevision:M,actorId:env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1').toString(),selectedAt:T0-100,expiresAt:expiry,commandBy:mode==='command_at_boundary'?T0:T0+1,owner:{subject:'SYNTHETIC_OWNER',accessRealmHash:H,accessVerifiedAt:T0-1000,accessExpiresAt:expiry},connection:{connectionRef:H,grantId:'SYNTHETIC_GRANT',clientId:'SYNTHETIC_CLIENT',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',grantHash:H,consentHash:H,noticesHash:H,permissionExpiresAt:expiry},project,goal:'discovery',programContext:{programHash:'f'.repeat(64),sourceRevision:Q,originalContextHash},approval:{purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:M,projectHash:hashFiniteOwnerPreparationProject(project),goal:'discovery',approvedAt:T0-1000,expiresAt:expiry,csrfReceiptHash:H},auditHash:H},'preparationHash');
+ const selection=seal('Selection',{purpose:'afw.finite-owner-selection.v1',sourceRevision:M,prepId:H,preparationHash:preparation.preparationHash,selectedAt:T0-100,sequence:1,previousSelectionHash:null},'selectionHash');
+ const descriptor={name:'index.mjs',sha256:artifact.workerHash,bytes:Buffer.byteLength(artifact.script)};
+ const baseline={versionId:V,deploymentId:D,module:descriptor,configuration:config},rollback={versionId:R,deploymentId:U,module:descriptor,configuration:closed};
+ return {T0,mode,preparation,selection,originalContext,baseline,rollback,module:descriptor};
+}
+export async function syntheticFacts({ctx,env,intentId,sourceRevision},lease){
+ lease.assertCurrent();const x=await ctx.storage.get('fixture:scenario');lease.assertCurrent();
+ if(x.mode==='held_hydration'){
+  const state=hydrations.get(ctx)??{reads:0,lateDenied:0};hydrations.set(ctx,state);state.reads++;
+  const underlying=retainFiniteOwnerStagePromise((async()=>{await new Promise(r=>setTimeout(r,6500));try{lease.assertCurrent();await ctx.storage.put('fixture:late-write',true);}catch{state.lateDenied++;}})());
+  await Promise.race([underlying,new Promise((_,reject)=>setTimeout(()=>reject(Error('SYNTHETIC source pending')),100))]);
+  throw Error('SYNTHETIC held qualification unavailable');
+ }
+ if(intentId!==H||sourceRevision!==M||x.mode==='owner_incomplete'||x.mode==='seed_incomplete')throw Error('SYNTHETIC qualification denied');
+ const n=native(x.T0);if(x.mode==='queue_expired')n.queuedAt=Date.now()-30001;if(x.mode==='setup_expired')n.T0=Date.now()-50001;
+ narrowFinitePolicySetupClock(lease,n,refs,env);
+ const selected=await createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}).readSelected({sourceRevision:M},lease);
+ const assertCurrent=async c=>{c.assertCurrent();if(['changed_grant','changed_revision','changed_selection','publisher_unavailable'].includes(x.mode))throw Error('SYNTHETIC primary drift');};
+ const {script:bytes}=x.originalContext.artifact,source={native:n,ownerSource:{window:{startedAt:x.T0-1000,expiresAt:x.preparation.expiresAt}},originalContext:x.originalContext,baseline:x.baseline,rollback:x.rollback,bytes:{baseline:new TextEncoder().encode(bytes),rollback:new TextEncoder().encode(bytes),candidate:new TextEncoder().encode(bytes)},assertCurrent};
+ const material={seedHash:H,seed:{sourceRevision:M,intentId:H,manifest:{sourceRevision:M,sourceTree:'d'.repeat(40),modules:{canaryLive:{module:{...x.module,exports:['AfwNodeControl','AfwOwnEventNode','default']},publicStatic:finitePublicStaticExpectation('canaryLive')}}},qaPublication:{qaLive:{versionId:U}}},primaryEvidence:{T0:x.T0,N1:x.T0+300000,R1:x.T0+480000,seedStepCompletedAt:x.T0+50}};
+ const notice={sequence:1,revision:1,issuedAt:x.T0-200,expiresAt:x.preparation.connection.permissionExpiresAt};
+ const receipt={versionId:V,deploymentId:D,moduleHash:x.module.sha256,configurationHash:finiteActivationConfigurationHash(x.baseline.configuration)};
+ await assertCurrent(lease);
+ return {value:{},selected,witness:{selectionHash:x.selection.selectionHash,publishedAt:x.T0-50},receipt,ownerSource:source.ownerSource,source,material,notice};
+}
+export async function syntheticEntry({env,event},lease){lease.assertCurrent();return {...native(event.timestamp.getTime()-200),qaVersionId:env.AFW_QA_VERSION.id};}
+export class SetupFixture extends IndependentClosure{
+ async initialize(mode){
+  const T0=Date.now()-(mode==='original_queue_budget'?22000:1000),x=make(this.env,T0,mode);await this.ctx.storage.put('fixture:scenario',x);
+  const lease={signal:new AbortController().signal,assertCurrent(){}},store=createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:()=>T0-50});
+  await store.publishSelection({preparation:x.preparation,selection:x.selection,expectedHeadHash:null},lease);
+  if(mode==='head_touched')await this.ctx.storage.put('afw.qa-finite-trial.v1:head',{SYNTHETIC:true});
+  return {T0,baseline:x.baseline,rollback:x.rollback,script:x.originalContext.artifact.script};
+ }
+ async hydrationState(){return hydrations.get(this.ctx)??{reads:0,lateDenied:0};}
+ async rows(){return [...await this.ctx.storage.list()].filter(([k])=>k!=='fixture:scenario');}
+}
+const worker={async fetch(request,env,ctx){
+ const path=new URL(request.url).pathname,actor=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+ if(path==='/init')return Response.json(await actor.initialize((await request.json()).mode));
+ if(path==='/hydration')return Response.json(await actor.hydrationState());
+ if(path==='/rows')return Response.json(await actor.rows());
+ const {T0,direct}=await request.json();if(direct)return Response.json(await actor.setupFinitePrivatePolicy(refs));
+ const event={timestamp:new Date(T0+200),instanceId:native(T0).setupInstanceId,workflowName:'afw-own-qa-private-bootstrap',payload:{operation:'finite_private_policy_setup',...refs}};
+ const step={async do(name,options,fn){return fn();}};
+ return Response.json(await new PrivateQaBootstrap(ctx,env).run(event,step));
+}};
+
+export default worker;

~~~~~~~~~~

## test/fixtures/finite-premature-admission-native.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-premature-admission-native.mjs b/test/fixtures/finite-premature-admission-native.mjs
--- /dev/null
+++ b/test/fixtures/finite-premature-admission-native.mjs
@@ -0,0 +1,16 @@
+import assert from 'node:assert/strict';
+import {readFileSync} from 'node:fs';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+const schemas=['dossier-monitoring-consent','dossier-node-process','dossier-successor-reservation','dossier-successor-launch','dossier-subscription-receipt'].flatMap(file=>[...readFileSync('db/'+file+'.sql','utf8').matchAll(/CREATE TABLE(?: IF NOT EXISTS)?[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]));
+const bundle=await build({entryPoints:['test/fixtures/finite-premature-admission-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
+export async function exercise(mode,extra={}){
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(Date.now()-1000)},durableObjects:{AFW_DOSSIER_EVENTS_NODE:{className:'Native',useSQLite:true}},d1Databases:{DB:'c3-premature'}}));
+ try{
+  const db=await mf.getD1Database('DB');
+  await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
+  for(const sql of schemas)await db.prepare(sql).run();
+  const response=await mf.dispatchFetch('https://synthetic.invalid',{method:'POST',body:JSON.stringify({mode,...extra})});
+  assert.equal(response.status,200,await response.clone().text());return await response.json();
+ }finally{await mf.dispose();}
+}

~~~~~~~~~~

## test/fixtures/finite-premature-admission-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-premature-admission-worker.mjs b/test/fixtures/finite-premature-admission-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-premature-admission-worker.mjs
@@ -0,0 +1,156 @@
+import {createHash} from 'node:crypto';
+import {createNodeProcessCustody} from '../../lib/mcp-node-process-custody.mjs';
+import {createOwnDurableEventHost} from '../../lib/mcp-own-durable-host.mjs';
+import {createFiniteOwnNativeCleanupHost} from '../../lib/mcp-own-finite-cleanup-host.mjs';
+import {createFiniteNativePrimaryReader} from '../../lib/mcp-own-finite-primary.mjs';
+import {createFiniteAdmissionGate} from '../../lib/mcp-own-finite-admission-gate.mjs';
+import {finiteAdmissionIdentity} from '../../lib/mcp-own-finite-cleanup-proof.mjs';
+import {createDossierMonitoringAuthorization} from '../../lib/dossier-monitoring-authority.mjs';
+import {resolveSuccessorPreparation} from '../../lib/mcp-successor-manifest.mjs';
+import {createSuccessorReservation} from '../../lib/mcp-successor-reservation.mjs';
+import {createPrivateNodeBridge,createPrivateNodeDispatchHandler} from '../../lib/mcp-node-private-bridge.mjs';
+import {createNodeReadiness} from '../../lib/mcp-node-readiness.mjs';
+import {finiteFixture,digest} from './qa-finite-trial.mjs';
+import {nominalFixture} from './finite-nominal-control.mjs';
+import {finiteHash} from '../../lib/mcp-finite-evidence.mjs';
+// Test-only external source/control approval, provider and Container boundaries.
+// All business admission/reservation SQL and DO transactions run in workerd/D1.
+const sha=v=>createHash('sha256').update(v).digest('hex'),HEAD='afw.own-finite-admission.v1:head';
+const program='SYN native program; Container API fixture only',sourceRevision='c'.repeat(40);
+const params=projectRef=>({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')},ttlMs:30000});
+export class Native {
+ constructor(ctx,env){this.ctx=ctx;this.env=env;}
+ async fetch(request){
+  const {mode='missing',field,value}=await request.json(),nativeDb=this.env.DB,ctx=this.ctx;
+  let offset=0,launches=0,closes=0,callbacks=0,reads=0,runs=0,rerun=false,held=null,release,heldRead=false,heldControl=false,pendingObservation=null,sourceChecks=[],reused=null,reuseBefore=null,reuseAfter=null,sealedDenied=false;
+  const now=()=>Date.now()+offset,T0=Number(this.env.T0);
+  const f=finiteFixture({at:T0}),p=f.plan,s=p.selectors;
+  s.resource='https://delegated-canary.agentfriendlyweb.dev/mcp';s.programHash=sha(program);
+  p.resources.containerId=ctx.id.toString();
+  const originalDeadline=T0+20000;
+  const context={grantId:s.grantId,subject:s.subject,clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']};
+  const sqlTime=async()=> (await nativeDb.prepare("SELECT CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER) AS t").first()).t;
+  await nativeDb.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind(s.projectId,s.subject,1).run();
+  for(const grant of [s.grantId,'predecessor'])await nativeDb.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind(grant,s.subject,s.clientId,s.projectId,s.resource,JSON.stringify(context.scopes),new Date(s.expiresAt).toISOString(),'').run();
+  await nativeDb.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind(s.grantId,s.projectId,s.subject,s.clientId,s.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',T0,s.expiresAt).run();
+  const auth=await createDossierMonitoringAuthorization({db:nativeDb,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),now})();
+  const original={containerId:'e'.repeat(64),applicationId:p.resources.applicationId,programHash:'d'.repeat(64),sourceRevision:'e'.repeat(40)};
+  const scope={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:p.resources.namespaceId,applicationId:p.resources.applicationId,ownerRef:auth.principalRef,projectRef:auth.projectRef,resource:s.resource};
+  const candidate={trialId:p.trialId,programHash:s.programHash,sourceRevision,startAt:s.startAt,expiresAt:s.expiresAt,budget:1};
+  const plan={scope,original,candidate,namespace:this.env.AFW_DOSSIER_EVENTS_NODE},resolved=resolveSuccessorPreparation(plan);
+  const closedAt=T0-500;
+  await nativeDb.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('predecessor',s.projectId,s.subject,s.clientId,s.resource,1,T0-2000,s.expiresAt,original.containerId,'a'.repeat(64),original.programHash,original.sourceRevision,'cloudflare/debian-trixie',T0-2000,s.expiresAt).run();
+  await nativeDb.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('predecessor','a'.repeat(64),original.containerId,original.programHash,original.sourceRevision,'cloudflare/debian-trixie',closedAt).run();
+  const retirement=async()=>({purpose:'afw.retirement-evidence.v1',...original,processGeneration:'a'.repeat(64),closedAt,stoppedAt:closedAt,observedAt:await sqlTime(),physicalStopVerified:true,mayStartSuccessor:false});
+  const mutate=async()=>{await nativeDb.prepare('DROP TRIGGER dossier_successor_no_update').run();await nativeDb.prepare("UPDATE dossier_successor_reservations SET scope_hash=?").bind('0'.repeat(64)).run();};
+  const db={withSession(){return db;},prepare(sql){
+   const base=nativeDb.withSession('first-primary').prepare(sql);
+   return {bind(...args){const q=base.bind(...args);return {
+    first:()=>q.first(),
+    async all(){
+     if(sql.includes('finite-prepared-admission')){
+      reads++;
+      if(mode==='guard-race'&&reads===2)await mutate();
+      if(mode==='read-throw')throw Error('SYN primary unavailable');
+      if(mode==='read-malformed')return {success:true,results:[]};
+     }
+     return q.all();
+    },
+    async run(){
+     if(!sql.startsWith('INSERT INTO dossier_node_process_admissions'))return q.run();
+     runs++;
+     if(mode==='rerun-zero-prior'&&runs===1)await mutate();
+     if(['race-reservation','rerun-inserted-zero','rerun-unknown-zero'].includes(mode)&&runs===(mode==='race-reservation'?1:2))await mutate();
+     if(mode==='race-consent')await nativeDb.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date().toISOString(),s.grantId).run();
+     if(mode==='throw')throw Object.assign(Error('SYN knownNoAdmissionFailure'),{code:'known_no_admission',knownNoAdmission:true});
+     if(mode==='successfalse')return {success:false,meta:{changes:0}};
+     if(mode==='malformed')return {success:true,meta:{}};
+     if(mode==='pending'){held=new Promise(resolve=>{release=resolve;});pendingObservation={settled:false,closes,launches};queueMicrotask(()=>{offset=originalDeadline-Date.now()+1;release();});await held;}
+     if(mode==='unique')await q.run();
+     const result=await q.run();
+     if(mode==='lostack'||mode==='rerun-unknown-zero'&&runs===1)throw Error('SYN lost admission ACK');
+     if(mode==='postinsert')await nativeDb.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date().toISOString(),s.grantId).run();
+     return result;
+    }
+   };}};
+  }};
+  const env={DB:db,AFW_DOSSIER_EVENTS_NODE:this.env.AFW_DOSSIER_EVENTS_NODE,AFW_FINITE_TRIAL_VERSION:{id:p.canaryContainment.runtimeVersionId},
+   AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_PROVIDER_READ_TOKEN:'SYN_not_a_provider_credential',
+   AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication:{artifactKey:'1'.repeat(64),workerHash:'2'.repeat(64),activationKey:'3'.repeat(64)}}),
+   AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',
+   AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(Object.fromEntries(['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].map(k=>[k,s[k]]))),
+   AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_OAUTH_RESOURCE:s.resource,AFW_OAUTH_PILOT_CLIENT_ID:s.clientId,AFW_OAUTH_PILOT_PROJECT_ID:s.projectId,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:'z'.repeat(32)};
+  const control={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)};
+  const nativeAdmission={ctx,env,program,programSourceRevision:sourceRevision};
+  const primary=createFiniteNativePrimaryReader({db,control,now,nativeAdmission});
+  const identity=finiteAdmissionIdentity(control);
+  const readNominalControl=async()=>{
+   const n=nominalFixture(identity,{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:['read-held','runtime-held','pending'].includes(mode)?originalDeadline:s.expiresAt},now());
+   const raw=await ctx.storage.get(HEAD);
+   return {...n.value,ownedWriters:['reservation','admission','launch'].filter(k=>raw?.writers[k]).map(kind=>({intentId:p.intentId,controlHash:control.controlHash,actorId:p.resources.containerId,kind,claimHash:finiteHash(raw.writers[kind].claim),phase:raw.writers[kind].settlement===null?'issued':'settled'}))};
+  };
+  const gateOptions={storage:ctx.storage,identity,readPrimary:{reservation:primary.reservation,admission:primary.admission,launch:primary.launch},readNominalControl,nominalIdentity:{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:s.expiresAt},now,timeoutMs:5000};
+  // Baseline has no source helper: omit the optional field for meaningful causal RED.
+  const gate=createFiniteAdmissionGate({...gateOptions,...(primary.admissionSource&&mode!=='no-source'?{admissionSource:primary.admissionSource}:{})});
+  const reserve=()=>createSuccessorReservation({db:nativeDb,original,candidate:resolved.candidate,readRetirement:retirement,now}).reserve();
+  if(!['missing','reservation-pending','prior-admission','prior-launch','prior-custody','prior-row','source-shapes'].includes(mode))await reserve();
+  if(mode==='wrong-row'){
+   await nativeDb.prepare('DROP TRIGGER dossier_successor_no_update').run();
+   await nativeDb.prepare('PRAGMA ignore_check_constraints = ON').run();
+   await nativeDb.prepare('UPDATE dossier_successor_reservations SET '+field+'=?').bind(value).run();
+  }
+  if(mode==='reservation-pending')await gate.beginReservation();
+  if(mode==='prior-admission')await gate.beginAdmission();
+  if(mode==='prior-launch')await gate.beginLaunch();
+  if(mode==='prior-row')await nativeDb.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(s.grantId,s.projectId,s.subject,s.clientId,s.resource,1,T0,s.expiresAt,p.resources.containerId,'f'.repeat(64),s.programHash,sourceRevision,'cloudflare/debian-trixie',T0,s.expiresAt).run();
+  if(mode==='prior-launch-row')await nativeDb.prepare('INSERT INTO dossier_successor_launch_claims VALUES(?,?,?,?,?,?)').bind(p.trialId,resolved.candidate.scopeHash,p.resources.containerId,'f'.repeat(64),s.grantId,T0).run();
+  if(mode==='prior-custody')await ctx.storage.put('afw.node-process-custody.v1:original',{malformed:true});
+  let manifest,key,server,nodeControl,host;
+  const container={running:false,
+   async start(options){launches++;const boot=JSON.parse(options.env.AFW_NODE_BOOTSTRAP);manifest=boot.manifest;key=Buffer.from(boot.key,'base64');this.running=true;
+    const bridge=createPrivateNodeBridge({key,...Object.fromEntries(['containerId','processGeneration','expiresAt'].map(k=>[k,manifest[k]])),now});
+    server=createPrivateNodeDispatchHandler({enabled:true,bridge,now,consume:r=>nodeControl.fetch(r),send:async(_url,envelope)=>{callbacks++;const body=JSON.parse(envelope.body);return {status:200,body:body.type==='verification'?JSON.stringify({challenge:body.challenge}):''};}});
+   },async setInactivityTimeout(){},async interceptOutboundHttp(_name,v){nodeControl=v;},
+   getTcpPort(){return {fetch:async request=>{if(new URL(request.url).pathname==='/ready'){const proof=createNodeReadiness({key,manifest,now}).respond({body:await request.text(),signature:request.headers.get('x-afw-node-signature')});return new Response(proof.body,{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':proof.signature}});}return server(request);}};},
+   async destroy(){closes++;this.running=false;}
+  };
+  const guardedStorage={transaction:fn=>ctx.storage.transaction(tx=>fn({get:async k=>{const v=await tx.get(k);if(mode==='read-held'&&!heldRead&&k==='afw.node-process-custody.v1:original'&&(await ctx.storage.get(HEAD))?.writers.admission){await Promise.resolve();heldRead=true;offset=originalDeadline-Date.now()+1;}return v;},put:async(k,v)=>{if(mode==='persist-fail'&&k==='afw.node-process-custody.v1:original')throw Error('SYN custody persistence failure');return tx.put(k,v);}}))};
+  const storage=mode.startsWith('rerun-')?{transaction:async fn=>{
+   if(rerun)return ctx.storage.transaction(fn);
+   try{return await ctx.storage.transaction(async tx=>{const out=await fn(tx);if(runs===1){rerun=true;throw Error('SYN retriable callback abort after insert');}return out;});}
+   catch(error){if(!rerun&&runs!==1)throw error;if(mode==='rerun-zero-prior')await ctx.storage.put('afw.node-process-custody.v1:original',{malformed:true});rerun=true;return ctx.storage.transaction(fn);}
+  }}:['read-held','persist-fail'].includes(mode)?guardedStorage:ctx.storage;
+  const hostCtx={storage,id:ctx.id,container};
+  const config={enabled:true,db,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),custodyKey:Buffer.alloc(32,7),ctx:hostCtx,program,sourceRevision,window:{startAt:s.startAt,expiresAt:s.expiresAt},
+   makeControl:async props=>{if(mode==='runtime-held'){await Promise.resolve();heldControl=true;offset=originalDeadline-Date.now()+1;}return {fetch:r=>host.consume(r,props)};},now,
+   successor:{version:'afw.successor-host.v1',plan,readRetirement:retirement,readDeployment:async()=>({scopeHash:resolved.candidate.scopeHash,sourceRevision,programHash:s.programHash,observedAt:await sqlTime()})},
+   ...(mode==='ordinary'?{}:{finiteGate:gate})};
+  host=createOwnDurableEventHost(config);
+  const tables=['site_projects','delegated_access_grants','dossier_monitoring_consent_events','dossier_node_process_admissions','dossier_node_process_closures','dossier_successor_reservations','dossier_successor_launch_claims','dossier_event_subscription_receipts'];
+  const snapshot=async()=>({do:[...await ctx.storage.list()],d1:Object.fromEntries(await Promise.all(tables.map(async name=>[name,(await nativeDb.prepare('SELECT * FROM '+name).all()).results])))});
+  const before=await snapshot();let error=null,result=null,laterReservation=null,constructed=null;
+  if(mode==='source-shapes'){
+   const variants=[{}, {...nativeAdmission,program:''},{...nativeAdmission,programSourceRevision:'f'.repeat(40)},{...nativeAdmission,ctx:{...ctx,id:{toString:()=> '0'.repeat(64)}}},{...nativeAdmission,env:{...env,DB:{}}},{...nativeAdmission,env:{...env,AFW_FINITE_TRIAL_VERSION:{id:'00000000-0000-4000-8000-000000000000'}}}];
+   for(const native of variants){let denied=false;try{createFiniteNativePrimaryReader({db,control,now,nativeAdmission:native});}catch{denied=true;}sourceChecks.push({denied});}
+   for(const options of [{...gateOptions,admissionSource:{}},{...gateOptions,identity:{...identity,controlHash:'0'.repeat(64)},admissionSource:primary.admissionSource}]){let denied=false;try{createFiniteAdmissionGate(options);}catch{denied=true;}sourceChecks.push({denied});}
+  }else if(mode==='historical'){
+   offset=p.N1-Date.now()+1;env.AFW_DOSSIER_EVENTS_ENABLED='false';env.AFW_DOSSIER_SUCCESSOR_ENABLED='false';
+   await nativeDb.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date().toISOString(),s.grantId).run();
+   const h=createFiniteOwnNativeCleanupHost({ctx,env,control,sourceRevision:p.canaryContainment.sourceRevision,providerRead:async()=>{throw Error('SYN no provider');},readCustody:async()=>{throw Error('SYN no custody');},readInstance:async()=>{throw Error('SYN no provider');},readNominalControl,nativeCleanup:{program,programSourceRevision:sourceRevision,close:host.close},now});
+   constructed={read:await h.gate.read(),seal:await h.gate.seal(),primary:await primary.read()};
+   await host.close();
+  }else if(['valid','ordinary','reuse'].includes(mode)){
+   const direct=createNodeProcessCustody({...(mode!=='ordinary'?{finiteGate:gate}:{}),enabled:true,db,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),storage:ctx.storage,custodyKey:Buffer.alloc(32,7),containerId:ctx.id.toString(),programHash:s.programHash,sourceRevision,image:'cloudflare/debian-trixie',window:config.window,now,runtime:{launch:async boot=>{const {key:ignored,...m}=boot;void ignored;manifest=m;launches++;},observe:async()=>({...manifest,running:true}),close:async()=>{closes++;}}});
+   try{result=await direct.start();if(mode==='reuse'){reuseBefore=await snapshot();reused=await direct.start();reuseAfter=await snapshot();await gate.seal();try{await direct.start();}catch{sealedDenied=true;}}}catch(e){error=e.message;}
+  }else{
+   try{result=await host.subscribe(params(auth.projectRef));}catch(e){error=e.message;}
+  }
+  const after=await snapshot();
+  if(['missing','reservation-pending'].includes(mode)){try{laterReservation=await reserve();}catch(e){laterReservation={error:e.message};}}
+  // Direct custody is an alternate trusted composition; no host suppression logic.
+  if(release)release();
+  return Response.json({mode,before,after,error,result,laterReservation,constructed,launches,closes,callbacks,reads,runs,rerun,heldRead,heldControl,pendingObservation,sourceChecks,reused,reuseBefore,reuseAfter,sealedDenied,originalDeadline});
+ }
+}
+const worker={fetch(request,env){return env.AFW_DOSSIER_EVENTS_NODE.get(env.AFW_DOSSIER_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1')).fetch(request);}};
+export default worker;

~~~~~~~~~~

## test/fixtures/finite-preparation-cleanup-entry.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-preparation-cleanup-entry.mjs b/test/fixtures/finite-preparation-cleanup-entry.mjs
--- /dev/null
+++ b/test/fixtures/finite-preparation-cleanup-entry.mjs
@@ -0,0 +1,6 @@
+// Explicit SYN native extension; product implementations are the actual imports.
+export function extendPreparationCleanupFixture(entry){
+ const imports="import {observeFiniteReadOnlyWork} from './lib/mcp-qa-finite-stage-work.mjs';\n\nimport {prepareFiniteOwnerChoice} from './lib/mcp-qa-finite-owner-preparation.mjs';\nimport {createFiniteOwnerPreparationStore} from './lib/mcp-qa-finite-preparation-store.mjs';\nimport {hashFiniteOwnerEvidence as evidence,hashFinitePreparationRecord as recordHash} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {createFinitePolicyTransport} from './lib/mcp-qa-finite-policy-transport.mjs';\nimport {createHash} from 'node:crypto';\n\nimport {readPrivateQaFinitePreparationCleanup} from './lib/mcp-qa-finite-preparation-cleanup.mjs';\nimport {sealFinitePreparationCleanupRecord as sealCleanupData,encodeFinitePreparationCleanupRecord as encodeCleanupData} from './lib/mcp-qa-finite-preparation-cleanup-records.mjs';\n";
+ const methods=" async enrollmentScreen(token,generic=false){\n  const now=Date.now,capsule=JSON.parse(await this.ctx.storage.get('afw.finite-initial-preparation.v1:capsule'));\n  const delta=capsule.I0+400000-now();Date.now=()=>now()+delta;\n  const req=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});\n  const parent=createFiniteOwnerRequestLease(req);\n  try{\n   const facts=await readPrivateQaFiniteInitialOwnerSource({ctx:this.ctx,env:this.env,parent:parent.lease});\n   this.ctx.fixtureEnrollmentSource=facts.source;\n   if(generic)return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:parent.lease},()=>prepareFiniteOwnerChoice({ctx:this.ctx,env:this.env,request:req},parent.lease));\n   const source=facts.source,at=Date.now(),preconnectionId=facts.preconnectionId,handle='8'.repeat(64),projectRef='7'.repeat(64),ticketHash=createHash('sha256').update(handle).digest('hex');\n   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:'owner'});\n   const store=createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:Date.now});\n   const map={projectRef,preconnectionId,subjectHash,sourceRevision:source.sourceRevision,projectId:source.project.projectId,revision:source.project.revision,issuedAt:at,expiresAt:source.window.expiresAt};\n   const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision:source.sourceRevision,projectRef,connectionRef:null,preconnectionId,action:'connection',createdAt:at,expiresAt:source.window.expiresAt};\n   const snapshot={preconnectionId,initialTicketHash:ticketHash,source};snapshot.sourceHash=recordHash('OwnerSourceSnapshot',snapshot);\n   for(const result of [await store.putOwnerSourceSnapshot(snapshot,parent.lease),await store.putProjectRef(map,parent.lease),await store.putTicket(ticket,parent.lease)])if(result.status!=='recorded')throw Error('SYN exact original selector ticket seed');\n   return {handle,projectRef,preconnectionId,source};\n  }catch(e){return {fixtureError:String(e),stack:e.stack};}finally{parent.finish();Date.now=now;}\n }\n async enrollmentPost(token,screen,mode='normal'){\n  const now=Date.now,capsule=JSON.parse(await this.ctx.storage.get('afw.finite-initial-preparation.v1:capsule'));let delta=capsule.I0+410000-now();\n  Date.now=()=>now()+delta;\n  const storage=this.ctx.storage,transaction=storage.transaction,sync=storage.sync,get=storage.get,getAlarm=storage.getAlarm;\n  let committed=null,drifted=false;const originalDb=this.env.RELEASE_DB,originalVersion=this.env.AFW_QA_VERSION,originalSource=this.ctx.fixtureEnrollmentSource;\n  const hold=v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n  // Hold only AFTER native transaction completion; release RPC cannot enter an input-gated transaction.\n  storage.transaction=async fn=>{\n   let writes=null;\n   const value=await Reflect.apply(transaction,storage,[async tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:(k,v)=>{if(k.startsWith('afw.finite-preparation-cleanup.v1:'))writes=k;return tx.put(k,v);}})]);\n   if(writes){committed=writes;this.enrollmentCommitted=writes;\n    if(mode==='throw-'+writes.split(':').at(-1))throw Error('SYN post-native-commit final return lost');\n    if(mode==='hold-'+writes.split(':').at(-1))return hold(value);\n   }return value;\n  };\n  storage.sync=async()=>{const v=await Reflect.apply(sync,storage,[]);if(committed&&(mode==='sync-reject'||mode==='ack-sync-reject'&&committed.endsWith(':ack')))throw Error('SYN sync rejected');if(committed&&mode==='sync-hold')return hold(v);return v;};\n  storage.get=async k=>{const v=await Reflect.apply(get,storage,[k]);if(!drifted&&k.endsWith(':capsule')){\n   drifted=true;if(mode==='holder-drift')this.env.RELEASE_DB={};if(mode==='qa-drift')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n   if(mode==='clock-backward')delta-=100;if(mode==='clock-forward')delta+=5001;\n  }if(committed&&(mode==='readback-lost'||mode==='ack-readback-lost'&&committed.endsWith(':ack'))&&k===committed)return undefined;if(committed&&mode==='readback-hold'&&k===committed)return hold(v);return v;};\n  storage.getAlarm=async()=>{const v=await Reflect.apply(getAlarm,storage,[]);if(committed&&(mode==='alarm-lost'||mode==='ack-alarm-lost'&&committed.endsWith(':ack')))return v+1;return v;};\n  const request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':token,Origin:'https://delegated-canary.agentfriendlyweb.dev','Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+screen.handle},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'})});\n  const parent=createFiniteOwnerRequestLease(request);\n  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:parent.lease},async()=>{\n   const prepared=await prepareFiniteOwnerChoice({ctx:this.ctx,env:this.env,request},parent.lease);\n   if(mode==='source-drift')this.ctx.fixtureEnrollmentSource={...originalSource,project:{...originalSource.project,revision:originalSource.project.revision+1}};\n   const result=await createFinitePolicyTransport({ctx:this.ctx,env:this.env}).run({preconnectionId:prepared.preconnectionId,stage:mode==='wrong-stage'?'notices':prepared.stage},mode==='clone-admission'?{...parent.lease}:parent.lease);\n   return {prepared,result:{outcome:result.outcome,admitted:result.admission.stageApprovalHash}};\n  });}catch(e){return {status:'unavailable',fixtureError:String(e),stack:e.stack};}\n  finally{parent.finish();this.env.RELEASE_DB=originalDb;this.env.AFW_QA_VERSION=originalVersion;this.ctx.fixtureEnrollmentSource=originalSource;storage.transaction=transaction;storage.sync=sync;storage.get=get;storage.getAlarm=getAlarm;Date.now=now;}\n }\n async enrollmentRead(){\n  const c=new AbortController(),lease=Object.freeze({signal:c.signal,assertCurrent(){if(c.signal.aborted)throw Error('SYN expired');}});\n  try{return await readPrivateQaFinitePreparationCleanup({ctx:this.ctx,env:this.env},lease);}catch{return {status:'unavailable'};}finally{c.abort();}\n }\n\n async enrollmentCorrupt(mode){\n  const s=this.ctx.storage,p='afw.finite-preparation-cleanup.v1:',raw=await s.get(p+'enrollment'),v=JSON.parse(raw);\n  if(mode==='orphan')await s.delete(p+'enrollment');\n  else if(mode==='hash')await s.put(p+'enrollment',raw+' ');\n  else if(mode==='unknown')await s.put(p+'unexpected','SYN unknown');\n  else if(mode==='head')await s.put('afw.qa-finite-trial.v1:head','SYN nominal');\n  else if(mode==='policy')await s.put('afw.finite-policy-effect.v1:SYN:send','SYN issued');\n  else if(mode==='permission')await s.put('connection-preparation:'+v.preconnectionId+':grant','SYN permission');\n  else if(mode==='foreign'){const other={...v,preconnectionId:'f'.repeat(64)};delete other.purpose;delete other.recordHash;await s.put(p+'enrollment',encodeCleanupData('Enrollment',sealCleanupData('Enrollment',other)));}\n  await s.sync();\n }\n\n async enrollmentProbe(){\n  const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'));\n  let requestAllowed=false,readAllowed=false;\n  try{try{requestAllowed=await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:parent.lease},async()=>true);}catch{}\n   try{readAllowed=await observeFiniteReadOnlyWork({ctx:this.ctx,env:this.env,originalLease:parent.lease},async()=>true);}catch{}\n   return {requestAllowed,readAllowed};\n  }finally{parent.finish();}\n }\n";
+ return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+}

~~~~~~~~~~

## test/fixtures/finite-preparation-cleanup-source.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-preparation-cleanup-source.mjs b/test/fixtures/finite-preparation-cleanup-source.mjs
--- /dev/null
+++ b/test/fixtures/finite-preparation-cleanup-source.mjs
@@ -0,0 +1,13 @@
+// SYN only. Source is derived first from the real initial native capsule reader.
+import {initialCanonical as canonical} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
+import {readPrivateQaFiniteCandidate} from '../../lib/mcp-qa-finite-candidate-residency.mjs';
+export async function readPrivateQaFiniteOwnerSource({ctx,parent}){
+ parent.assertCurrent();if(!ctx.fixtureEnrollmentSource)throw Error('SYN source absent');return ctx.fixtureEnrollmentSource;
+}
+export async function readPrivateQaFiniteConnectionSource({ctx},lease){
+ lease.assertCurrent();const ownerSource=ctx.fixtureEnrollmentSource;
+ const plan=JSON.parse(await ctx.storage.get('afw.finite-initial-cleanup.v1:plan'));
+ const baseline={versionId:ownerSource.currentPublication.versionId,deploymentId:ownerSource.currentPublication.deploymentId,module:{name:'index.mjs',bytes:plan.moduleBytes,sha256:plan.moduleHash},configuration:plan.configuration};
+ const bytes=readPrivateQaFiniteCandidate().bytes;
+ return {ownerSource,baseline,rollback:baseline,candidate:{sourceRevision:ownerSource.sourceRevision,role:'preparation',module:baseline.module,configuration:baseline.configuration,publicStatic:null},bytes:{baseline:bytes,rollback:bytes,candidate:bytes},assertCurrent(c){c.assertCurrent();if(canonical(ctx.fixtureEnrollmentSource)!==canonical(ownerSource))throw Error('SYN source drift');}};
+}

~~~~~~~~~~

## test/fixtures/finite-preparation-issuer-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-preparation-issuer-worker.mjs b/test/fixtures/finite-preparation-issuer-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-preparation-issuer-worker.mjs
@@ -0,0 +1,344 @@
+import {initialHash as hash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
+import {createDossierMonitoringAuthorization} from '../../lib/dossier-monitoring-authority.mjs';
+import {DurableObject} from 'cloudflare:workers';
+import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA as schema} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {createFinitePreparationIssuerJournal} from '../../lib/mcp-qa-finite-preparation-issuer-journal.mjs';
+import {sealFinitePreparationIssuerRecord as seal,FINITE_PREPARATION_ISSUER_PREFIX as P} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222';
+const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
+// SYN internal identities/lease/queue faults, REAL native D1 SQL time and DO transactions.
+// No SDK approval, capsule validity or source authority is inferred.
+export class FiniteIssuerFixture extends DurableObject{
+ async fetch(request){
+  const b=await request.json(),db=this.env.RELEASE_DB,events=[];
+  const exec=async(sql,...args)=>db.prepare(sql).bind(...args).run();
+  await exec('CREATE TABLE IF NOT EXISTS site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
+  await exec("CREATE TABLE IF NOT EXISTS delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
+  await exec("CREATE TABLE IF NOT EXISTS delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
+  if(b.case!=='missing_schema')for(const sql of schema)await exec(sql);
+  if(b.case.startsWith('notice-'))for(const sql of b.monitoringSchema)await exec(sql);
+  const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms;
+  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+(b.case.startsWith('notice-')?24000:12000)).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
+  const i=b.case.startsWith('notice-')&&b.ceiling==='C0'?seal('Identity',{...identity,I0:at-897000,C0:at+3000,C1:at+183000,consentExpiresAt:new Date(at+3000).toISOString()}):b.case.startsWith('notice-')&&b.ceiling==='consent'?seal('Identity',{...identity,consentExpiresAt:new Date(at+3000).toISOString()}):['C0_queue','expired_cleanup','C0_grant_queue'].includes(b.case)?seal('Identity',{...identity,I0:at-899200,C0:at+800,C1:at+180800,consentExpiresAt:new Date(at+800).toISOString()}):b.case==='consent_queue'?seal('Identity',{...identity,consentExpiresAt:new Date(at+500).toISOString()}):identity;
+  const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=at+30000)throw Error('SYN original lease expired');}});
+  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false,noticeGate=null,noticeClock=null,noticeConcurrent=null;
+  const wrapper={withSession(mode){events.push({session:++sessionId,mode});const sid=sessionId,s=db.withSession(mode);return {prepare(sql){events.push({sid,sql});const actualSql=(b.case==='unsupported_clock'||noticeClock==='clock')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'subsec'","'SYN-unsupported'"):(b.case==='unsupported_iso'||noticeClock==='iso')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'2026-11-04T12:00:00.123Z'","'SYN-not-iso'"):sql;const stmt=s.prepare(actualSql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{sqlCount++;if(delay&&sql.includes(delay.needle)){const d=delay;delay=null;await sleep(d.ms);}const gate=noticeGate&&sql.includes(noticeGate.needle)?noticeGate:null;
+      if(gate&&!['notice-ack','notice-held'].includes(b.case)){gate.reached=true;gate.at=Date.now();await gate.wait;}
+      const nc=noticeConcurrent,nb=nc?.boundary;
+      if(nc?.phase==='preflight'&&sql.includes('SELECT type,name,tbl_name,sql FROM sqlite_schema')&&!nb.reached){nb.reached=true;nb.at=Date.now();await nb.wait;}
+      if(nc&&sql.includes('INSERT INTO dossier_monitoring_'))nc.emitted.push({kind:sql.includes('INSERT INTO dossier_monitoring_owner_tickets')?'ticket':'consent',at:Date.now(),afterFailure:nc.failureKnown});
+      const result=await bound[method]();
+      if(nc&&sql.includes('INSERT INTO dossier_monitoring_owner_tickets')){const tg=nc.ticketAck;tg.nativeRow=!!result;tg.at=Date.now();tg.reached=true;await tg.wait;throw Error('SYN actual concurrent ticket ACK lost');}
+      if(nc&&((nc.phase==='observation'&&sql.includes('SELECT t.*'))||(nc.phase==='consent-ack'&&sql.includes('INSERT INTO dossier_monitoring_consent_events')))){nb.nativeRow=!!result;nb.at=Date.now();nb.reached=true;await nb.wait;}
+      if(gate&&['notice-ack','notice-held'].includes(b.case)){gate.committed=true;gate.reached=true;gate.at=Date.now();await gate.wait;if(b.case==='notice-ack')throw Error('SYN post-commit notice ACK loss');}if(sql.includes('INSERT INTO delegated_access_grants'))grantCommitted=true;if(holdAck&&sql.includes(holdAck.needle)){const d=holdAck;holdAck=null;await sleep(d.ms);}if(lose&&sql.includes(lose)){lose=null;throw Error('SYN lost actual native SQL ACK');}return result;};return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
+  let txFault=null,txCommitted=false;
+  const nativeStorage=this.ctx.storage;
+  const storage={get:async(...args)=>{const v=await nativeStorage.get(...args);return txFault==='readback_loss'&&txCommitted?'SYN-readback-loss':v;},list:(...args)=>nativeStorage.list(...args),sync:async()=>{if(txFault==='readback_loss')return nativeStorage.sync();if(txFault==='sync_loss')throw Error('SYN sync loss');return nativeStorage.sync();},transaction:async callback=>{
+   const result=await nativeStorage.transaction(async tx=>{const r=await callback(tx);if(txFault==='callback_throw')throw Error('SYN final native transaction callback throw');return r;});txCommitted=true;
+   // Hold AFTER the actual transaction final return; no interior read/release deadlock.
+   if(txFault==='post_commit_hold'){parent.abort();await sleep(20);}
+   if(txFault==='final_throw')throw Error('SYN native final ACK loss');return result;
+  }};
+  const ctx={storage,id:this.ctx.id},env={RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE};
+  const store=createFinitePreparationIssuerStore({ctx,env});
+  const window=(until=i.C0)=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,until,Date.parse(i.consentExpiresAt))});
+  const clean=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,i.C1)});
+  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(Math.min(at+(b.case.startsWith('notice-')?(b.ceiling==='grant'?3000:22000):10000),Date.parse(i.consentExpiresAt))).toISOString()};
+  const opts=()=>({identity:i,window:window()});
+  await exec('INSERT INTO site_projects VALUES (?,?,?)',i.projectId,i.subject,1);
+  const snapshot=async()=>({fences:await db.prepare('SELECT * FROM finite_preparation_issuer_fences').all(),consents:await db.prepare('SELECT * FROM delegated_consent_sessions').all(),grants:await db.prepare('SELECT * FROM delegated_access_grants').all()});
+  const rejected=async fn=>{try{await fn();return false;}catch{return true;}};
+  const opened=()=>store.openFence(opts(),lease);
+  const authorized=()=>store.insertAuthorization(opts(),lease);
+  const consume=()=>store.consumeAuthorization({...opts(),consumedAt:new Date(at).toISOString()},lease);
+  const close=()=>store.closeFence({identity:i,fenceRequestId:F,window:clean()},lease);
+  const observe=barrier=>store.observeGrant({identity:i,barrier,expectedGrant:grant,window:clean()},lease);
+  let result={};
+  try{
+
+   if(b.case.startsWith('notice-')){
+    // Every positive scenario issues the original UUID through the real issuer first.
+    result.open=await opened();result.authorization=await authorized();
+    const consumption=await consume();result.consumed=!!consumption;
+    result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
+    if(result.grant.status!=='applied')throw Error('SYN original grant not reached');
+    const beforeGrant=JSON.stringify(result.grant.row),end=Date.parse(grant.expiresAt);
+    const short=b.ceiling?at+3000:end;
+    const ceilings={C0:i.C0,consent:Date.parse(i.consentExpiresAt),grant:end,Access:b.ceiling==='Access'?short:end,preconnection:b.ceiling==='preconnection'?short:end};
+    const ticketEnd=Math.min(...Object.values(ceilings),b.ceiling==='ticket'?short:end);
+    const permissionEnd=Math.min(ticketEnd,b.ceiling==='permission'?short:end);
+    const ticket={handleHash:'d'.repeat(64),requestId:F,expectedSequence:0,issuedAt:at,expiresAt:ticketEnd,permissionExpiresAt:permissionEnd};
+    const common={identity:i,expectedGrant:grant,consumedAt:consumption.consumed_at,accessExpiresAt:ceilings.Access,preconnectionExpiresAt:ceilings.preconnection,window:window()};
+    const data=()=>({...common,ticket});
+    const counts=async()=>({tickets:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_owner_tickets').first()).n,notices:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n});
+    const writes=()=>events.filter(e=>e.sql?.includes('INSERT INTO dossier_monitoring_')).length;
+    const issue=()=>store.insertMonitoringTicket(data(),lease);
+    const observeTicket=()=>store.observeMonitoringTicket(data(),lease);
+    const insertNotice=(w,s=store,l=lease,d=common)=>s.insertMonitoringConsent({...d,ticketWitness:w},l);
+    const competing=async(foreign=false)=>{
+     await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",foreign?'SYN-foreign':i.grantId,i.projectId,i.subject,i.clientId,i.resource,foreign?U:'33333333-3333-4333-8333-333333333333',at,at+15000);
+    };
+    if(b.case==='notice-global'){await competing(true);await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES ('SYN-second',?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",i.projectId,i.subject,i.clientId,i.resource,U,at,at+15000);result.priorMax=(await db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n;}
+
+    if(b.case.startsWith('notice-concurrent-')){
+     // SYN scheduling gates only; every result below comes from real D1.
+     const latch=()=>{let release;const wait=new Promise(resolve=>{release=resolve;});return {wait,release,reached:false,at:null,nativeRow:false};};
+     const ticketAck=latch(),boundary=latch();
+     noticeConcurrent={ticketAck,boundary,phase:null,failureKnown:false,emitted:[],kind:b.case};
+     let ticketSettled=false;const ticketPending=issue().then(value=>{ticketSettled=true;return {value};},()=>{ticketSettled=true;return {rejected:true};});
+     while(!ticketAck.reached&&!ticketSettled)await sleep(1);
+     if(!ticketAck.reached||!ticketAck.nativeRow)throw Error('SYN concurrent ticket commit gate not reached');
+     result.ticketCommitGate=true;result.ticketGateBeforeDeadline=ticketAck.at<common.window.deadline;
+     let pendingSettled=false,pending;
+     if(b.case==='notice-concurrent-observation'){
+      noticeConcurrent.phase='observation';
+      pending=observeTicket().then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
+     }else{
+      const witness=await observeTicket();result.observed=!!witness;
+      if(!witness)throw Error('SYN concurrent native witness not reached');
+      noticeConcurrent.phase=b.case==='notice-concurrent-before'?'preflight':'consent-ack';
+      pending=insertNotice(witness).then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
+     }
+     while(!boundary.reached&&!pendingSettled)await sleep(1);
+     if(!boundary.reached)throw Error('SYN concurrent boundary not reached');
+     result.boundaryGate=true;result.boundaryBeforeDeadline=boundary.at<common.window.deadline;
+     result.nativeBoundaryRow=boundary.nativeRow;result.boundaryAt=boundary.at;
+     ticketAck.release();result.ticketFailure=await ticketPending;
+     if(!result.ticketFailure.rejected)throw Error('SYN actual ticket ACK failure not observed');
+     noticeConcurrent.failureKnown=true;result.failureKnown=true;result.failureAt=Date.now();
+     await sleep(20);result.pendingAfterFailure=!pendingSettled;
+     result.emittedBeforeRelease=noticeConcurrent.emitted.filter(e=>e.kind==='consent').length;
+     boundary.release();result.pending=await pending;
+     result.consentEmitted=noticeConcurrent.emitted.filter(e=>e.kind==='consent').length;
+     result.newEmissionsAfterFailure=noticeConcurrent.emitted.filter(e=>e.afterFailure).length;
+     result.emitted=noticeConcurrent.emitted.map(e=>({kind:e.kind,at:e.at,afterFailure:e.afterFailure}));
+     result.counts=await counts();result.nativeObservationRow=b.case==='notice-concurrent-observation'&&boundary.nativeRow;
+    }else if(b.case==='notice-schema'){
+     if(b.fault==='clock')noticeClock='clock';else if(b.fault==='iso')noticeClock='iso';
+     else if(b.fault==='type'){await exec('DROP TABLE dossier_monitoring_owner_tickets');await exec('CREATE TABLE dossier_monitoring_owner_tickets (handle_hash TEXT PRIMARY KEY,request_id TEXT,user_id TEXT,grant_id TEXT,project_id TEXT,client_id TEXT,resource TEXT,purpose TEXT,action TEXT,revision TEXT,expected_sequence INTEGER,issued_at INTEGER,expires_at INTEGER,permission_expires_at INTEGER)');}
+     else if(b.fault==='extra')await exec('CREATE INDEX SYN_extra_notice ON dossier_monitoring_owner_tickets(grant_id)');
+     else{
+      const table=b.fault==='missing-consent'?'dossier_monitoring_consent_events':'dossier_monitoring_owner_tickets';
+      if(b.fault.startsWith('missing-'))await exec('DROP TABLE '+table);
+      else if(b.fault==='index')await exec('DROP INDEX dossier_monitoring_consent_grant_sequence');
+      else if(b.fault==='trigger')await exec('DROP TRIGGER dossier_monitoring_tickets_no_delete');
+      else{
+       // SYN only: reconstruct an empty table with exactly one missing constraint.
+       await exec('DROP TABLE dossier_monitoring_owner_tickets');
+       const original=b.monitoringSchema.find(sql=>sql.startsWith('CREATE TABLE IF NOT EXISTS dossier_monitoring_owner_tickets'));
+       await exec(b.fault==='unique'?original.replace('request_id TEXT NOT NULL UNIQUE','request_id TEXT NOT NULL'):original.replace("CHECK(purpose='afw.dossier-monitoring-owner.v1')",''));
+       for(const sql of b.monitoringSchema.filter(sql=>sql.startsWith('CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_')))await exec(sql);
+      }
+     }
+     const n=writes();result.denied=await rejected(issue);result.newWrites=writes()-n;
+    }else if(b.case==='notice-hostile'){
+     result.ticket=await issue();const witness=await observeTicket();result.observed=!!witness;let getters=0;
+     const n=writes(),otherLease=Object.freeze({signal:lease.signal,assertCurrent:lease.assertCurrent}),foreign=createFinitePreparationIssuerStore({ctx,env});
+     let d={...common,ticketWitness:witness},s=store,l=lease,arity='normal';
+     if(b.fault==='clone')d.ticketWitness={...witness};
+     else if(b.fault==='json')d.ticketWitness=JSON.parse(JSON.stringify(witness));
+     else if(b.fault==='row')d.ticketWitness=witness.row;
+     else if(b.fault==='store')s=foreign;
+     else if(b.fault==='lease')l=otherLease;
+     else if(b.fault==='getter')Object.defineProperty(d,'consumedAt',{enumerable:true,get(){getters++;return common.consumedAt;}});
+     else if(b.fault==='witness-getter')Object.defineProperty(d,'ticketWitness',{enumerable:true,get(){getters++;return witness;}});
+     else if(b.fault==='symbol')d[Symbol('SYN')]=1;
+     else if(b.fault==='prototype')Object.setPrototypeOf(d,{});
+     else if(b.fault==='sparse'){d.expectedGrant={...grant,scopes:new Array(1)};}
+     else if(b.fault==='oversize')d.expectedGrant={...grant,scopes:['x'.repeat(65537)]};
+     else if(b.fault==='depth'){let x={};for(let k=0;k<26;k++)x={x};d.expectedGrant=x;}
+     else if(b.fault==='extra')d.approved=true;
+     else if(b.fault==='args-missing')arity='missing';
+     else if(b.fault==='args-extra')arity='extra';
+     else if(b.fault==='identity')d.identity=seal('Identity',{...i,projectRevision:2});
+     else if(b.fault==='grant-scopes')d.expectedGrant={...grant,scopes:i.requestedScopes};
+     else if(b.fault==='grant-created')d.expectedGrant={...grant,createdAt:new Date(at+1).toISOString()};
+     else if(b.fault==='grant-expires')d.expectedGrant={...grant,expiresAt:new Date(end-1).toISOString()};
+     else if(b.fault==='consumed')d.consumedAt=new Date(at-1).toISOString();
+     else if(b.fault==='Access')d.accessExpiresAt--;
+     else if(b.fault==='preconnection')d.preconnectionExpiresAt--;
+     else if(b.fault==='started')d.window={...common.window,startedAt:common.window.startedAt+1};
+     else if(b.fault==='deadline')d.window={...common.window,deadline:common.window.deadline+1};
+     result.denied=await rejected(()=>arity==='missing'?s.insertMonitoringConsent(d):arity==='extra'?s.insertMonitoringConsent(d,l,{}):s.insertMonitoringConsent(d,l));
+     result.getters=getters;result.newWrites=writes()-n;result.counts=await counts();
+    }else if(b.case==='notice-ticket-data'){
+     result.ticket=await issue();const changed={...ticket};
+     const changes={handleHash:'e'.repeat(64),requestId:U,expectedSequence:1,issuedAt:at+1,expiresAt:ticket.expiresAt-1,permissionExpiresAt:ticket.permissionExpiresAt-1};
+     changed[b.fault]=changes[b.fault];const n=writes();
+     try{result.witness=await store.observeMonitoringTicket({...common,ticket:changed},lease);}catch{result.denied=true;}
+     result.newWrites=writes()-n;result.counts=await counts();
+    }else if(b.case==='notice-signatures'){
+     const n=writes();let getters=0;const d=data();let args=[d,lease];
+     if(b.fault==='missing')args=[d];else if(b.fault==='extra')args.push({});
+     else if(b.fault==='ticket-getter')Object.defineProperty(d,'ticket',{enumerable:true,get(){getters++;return ticket;}});
+     else if(b.fault==='symbol')d[Symbol('SYN')]=1;
+     else if(b.fault==='extra-key')d.action='grant';
+     else if(b.fault==='ticket-key')d.ticket={...ticket,subject:i.subject};
+     else if(b.fault==='window-key')d.window={...common.window,C0:i.C0};
+     else if(b.fault==='grant-key')d.expectedGrant={...grant,exchangedAt:''};
+     else if(b.fault==='cap')d.identity={...i,subject:'x'.repeat(17000)};
+     result.denied=await rejected(()=>store[b.method](...args));result.getters=getters;result.newWrites=writes()-n;
+    }else{
+     if(b.target!=='ticket')result.ticket=await issue();
+     let witness=b.target==='ticket'?null:await observeTicket();if(b.target!=='ticket')result.observed=!!witness;
+     if(b.case==='notice-positive'||b.case==='notice-absolute'||b.case==='notice-global'||b.case==='notice-reduction'){
+      result.consent=await insertNotice(witness);result.witnessFrozen=Object.isFrozen(witness)&&Object.isFrozen(witness.row);
+      result.resultFrozen=Object.isFrozen(result.consent)&&Object.isFrozen(result.consent.row);
+      result.secondDenied=await rejected(()=>insertNotice(witness));
+      result.freshPrior=await createFinitePreparationIssuerStore({ctx,env}).insertMonitoringTicket(data(),lease);
+      if(b.case==='notice-reduction'){
+       const authority=createDossierMonitoringAuthorization({db,context:{grantId:i.grantId,subject:i.subject,clientId:i.clientId,resource:i.resource,scopes:grant.scopes},projectId:i.projectId,projectionSecret:'SYN-only-projection-secret-32-bytes'});
+       result.enabledBefore=(await authority()).enabled;const barrier=await close();result.enabledAfterClose=(await authority()).enabled;
+       const observation=await observe(barrier);result.revoke=await store.revokeGrant({identity:i,barrier,observation,window:clean()},lease);
+       result.resolverDeniedAfterRevoke=await rejected(authority);
+      }
+     }else{
+      const needle='INSERT INTO dossier_monitoring_'+(b.target==='ticket'?'owner_tickets':'consent_events');
+      const gate={needle,reached:false,committed:false,release:null};let release;
+      gate.wait=new Promise(resolve=>{release=resolve;});gate.release=release;noticeGate=gate;
+      const n=writes();let settled=false;
+      const pending=(b.target==='ticket'?issue():insertNotice(witness)).then(value=>{settled=true;return {value};},()=>{settled=true;return {rejected:true};});
+      while(!gate.reached&&!settled)await sleep(1);
+      if(!gate.reached)throw Error('SYN notice gate not reached');
+      result.gateReached=true;result.gateAt=gate.at;result.gateBeforeDeadline=gate.at<common.window.deadline;result.windowDeadline=common.window.deadline;
+      result.ceilings={...ceilings,ticket:ticketEnd,permission:permissionEnd};result.minimum=Math.min(...Object.values(result.ceilings));
+      result.ceiling=b.ceiling??'window';result.gateBeforeMinimum=gate.at<result.minimum;result.ties=Object.entries(result.ceilings).filter(([,v])=>v===result.minimum).map(([k])=>k);
+      if(b.case==='notice-queue')await sleep(b.ceiling?Math.max(0,result.minimum+50-Date.now()):5100);
+      else if(b.case==='notice-barrier'){result.barrier=await close();result.primaryBarrierCompleted=true;}
+      else if(b.case==='notice-race'){
+       if(b.fault==='owner')await exec('UPDATE site_projects SET user_id=? WHERE id=?','SYN-foreign-owner',i.projectId);
+       else if(b.fault==='revision')await exec('UPDATE site_projects SET revision=2 WHERE id=?',i.projectId);
+       else if(b.fault==='auth')await exec("UPDATE delegated_consent_sessions SET consumed_at='' WHERE handle_hash=?",i.authorizationHash);
+       else if(b.fault==='fence')result.barrier=await close();
+       else if(b.fault==='event')await competing();
+       else if(b.fault==='ticket'){
+        result.ordinaryUpdateDenied=await rejected(()=>exec('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE handle_hash=?',U,ticket.handleHash));
+        await exec('DROP TRIGGER dossier_monitoring_tickets_no_update');await exec('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE handle_hash=?',U,ticket.handleHash);
+        result.synSchemaTamperAfterPreflight=true;
+       }else{
+        const changes={user_id:'SYN-foreign-owner',project_id:'SYN-foreign-project',client_id:'SYN-foreign-client',resource:'https://foreign.invalid/mcp',scopes_json:'[]',revoked_at:new Date(at).toISOString(),created_at:new Date(at+1).toISOString(),expires_at:new Date(end-1).toISOString(),exchanged_at:'SYN-not-iso'};
+        await exec('UPDATE delegated_access_grants SET '+b.fault+'=? WHERE id=?',changes[b.fault],i.grantId);
+       }
+      }else if(b.case==='notice-ack'||b.case==='notice-held'){
+       if(!gate.committed)throw Error('SYN expected actual commit before ACK gate');
+       result.committed=true;
+       if(b.case==='notice-held'){parent.abort();await sleep(20);result.pendingAfterAbort=!settled;}
+      }
+      gate.release();result.pending=await pending;result.newWrites=writes()-n;
+      if(b.case==='notice-ack'||b.case==='notice-held'){
+       const before=writes();result.ticketRetryDenied=await rejected(issue);result.consentRetryDenied=await rejected(()=>insertNotice(witness));result.observationDenied=await rejected(observeTicket);result.retryWrites=writes()-before;
+      }
+     }
+     result.counts=await counts();result.eventsRows=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+     result.ticketRows=(await db.prepare('SELECT * FROM dossier_monitoring_owner_tickets').all()).results;
+     result.grantUnchanged=JSON.stringify(await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first())===beforeGrant;
+    }
+    result.rows=await snapshot();result.ticketData=ticket;result.commonWindow=common.window;
+   }else if(['missing_schema','unsupported_clock','unsupported_iso'].includes(b.case))result={rejected:await rejected(opened),consents:(await db.prepare('SELECT * FROM delegated_consent_sessions').all()).results};
+   else if(b.case==='tamper_schema'){await exec('DROP TRIGGER finite_preparation_issuer_fences_terminal_fence');await exec('CREATE TRIGGER finite_preparation_issuer_fences_terminal_fence BEFORE UPDATE ON finite_preparation_issuer_fences BEGIN SELECT 1; END');result={rejected:await rejected(opened),rows:(await snapshot())};}
+   else if(b.case==='schema'){
+    const barrier=await close();result.barrier=barrier;result.delayedOpen=await rejected(opened);
+    result.noDelete=await rejected(()=>exec('DELETE FROM finite_preparation_issuer_fences'));
+    result.immutable=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET forward_until=forward_until+1'));
+    result.noReopen=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET fence_request_id=NULL,fenced_at=NULL'));
+    result.noReterminal=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET fenced_at=fenced_at+1'));
+    result.collision=await rejected(()=>exec('INSERT INTO finite_preparation_issuer_fences SELECT ?,authorization_hash,grant_id,enrollment_hash,identity_hash,reserved_at,forward_until,cleanup_until,fence_request_id,fenced_at FROM finite_preparation_issuer_fences','d'.repeat(64)));
+    result.rows=await snapshot();
+   }else if(b.case==='open_then_close'){result.open=await opened();result.barrier=await close();result.authorization=await authorized();result.rows=await snapshot();}
+   else if(['journal','journal_chain'].includes(b.case)){
+    const journal=createFinitePreparationIssuerJournal({ctx,env});
+    const reservation=seal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash:H,issuedAt:at,deadline:at+4000});
+    if(b.fault)txFault=b.fault;
+    result.append=await journal.appendReservation(reservation,lease);result.txCommitted=txCommitted;result.sqlBefore=sqlCount;
+    if(result.append.status==='recorded')result.sql=await opened();
+    result.sqlAfter=sqlCount;
+    if(!parent.signal.aborted){result.existing=await journal.appendReservation(reservation,lease);result.data=await journal.read({preconnectionId:i.preconnectionId},lease);}
+    if(b.case==='journal_chain'){
+     const send=seal('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'open_fence',requestId:null,requestHash:H,issuedAt:at+1,deadline:at+4000});
+     result.send=await journal.appendSend({preconnectionId:i.preconnectionId,record:send},lease);
+     result.ack=await journal.appendAck({preconnectionId:i.preconnectionId,operation:'open_fence',record:seal('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:send.recordHash,rowHash:hash('afw.finite-preparation-issuer-row.v1',result.sql.row),outcome:'applied',observedAt:at+2})},lease);
+     result.freeze=await journal.freeze({preconnectionId:i.preconnectionId,record:seal('Freeze',{purpose:'afw.finite-preparation-issuer-freeze.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,frozenAt:at+3})},lease);
+     result.frozenGrant=await journal.appendSend({preconnectionId:i.preconnectionId,record:seal('Send',{...send,operation:'grant',issuedAt:at+4})},lease);
+     result.cleanupSend=await journal.appendSend({preconnectionId:i.preconnectionId,record:seal('Send',{...send,operation:'close_fence',requestId:F,issuedAt:at+4})},lease);
+     result.replacement=await journal.appendReservation(seal('Reservation',{...reservation,identity:seal('Identity',{...i,grantId:F})}),lease);
+     result.chain=await journal.read({preconnectionId:i.preconnectionId},lease);
+     await nativeStorage.put(P+i.preconnectionId+':unknown','{}');result.unknownDenied=await rejected(()=>journal.read({preconnectionId:i.preconnectionId},lease));
+    }
+    result.rows=[...await nativeStorage.list({prefix:P})];
+   }else if(b.case==='queued_barrier'){
+    let consumption;
+    if(b.target!=='open'){await opened();await authorized();}
+    if(b.target==='grant')consumption=await consume();
+    const needles={open:'INSERT INTO finite_preparation_issuer_fences',consume:'UPDATE delegated_consent_sessions',grant:'INSERT INTO delegated_access_grants'};
+    delay={needle:needles[b.target],ms:250};
+    const work=b.target==='open'?()=>opened():b.target==='consume'?()=>consume():()=>store.insertReadGrant({...opts(),consumption,grant},lease);
+    let pendingSettled=false;const pending=work().then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
+    while(delay!==null&&!pendingSettled)await sleep(1);if(delay!==null)throw Error('SYN queue did not reach actual SQL');
+    result.barrier=await close();result.pending=await pending;result.rows=await snapshot();
+   }else if(['authorization_queue','open_queue'].includes(b.case)){
+    if(b.case==='authorization_queue')await opened();
+    const o=opts();o.window.deadline=o.window.startedAt+300;
+    delay={needle:b.case==='open_queue'?'INSERT INTO finite_preparation_issuer_fences':'INSERT INTO delegated_consent_sessions',ms:650};
+    result.operation=await store[b.case==='open_queue'?'openFence':'insertAuthorization'](o,lease);result.rows=await snapshot();
+   }else{
+    await opened();await authorized();
+    if(['consent_queue','C0_queue','deadline_queue'].includes(b.case)){
+     const w=window();if(b.case==='deadline_queue')w.deadline=w.startedAt+300;
+     delay={needle:'UPDATE delegated_consent_sessions',ms:b.case==='C0_queue'?1000:650};
+     result.consumption=await store.consumeAuthorization({identity:i,consumedAt:new Date(at).toISOString(),window:w},lease);result.rows=await snapshot();
+    }else{
+     const consumption=await consume();result.consumed=!!consumption;
+     if(b.case==='witness'){
+      result.rebuiltDenied=await rejected(async()=>store.insertReadGrant({...opts(),consumption:await db.prepare('SELECT * FROM delegated_consent_sessions WHERE handle_hash=?').bind(i.authorizationHash).first(),grant},lease));
+      result.cloneDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption:{...consumption},grant},lease));
+      result.foreignDenied=await rejected(()=>createFinitePreparationIssuerStore({ctx,env}).insertReadGrant({...opts(),consumption,grant},lease));
+      const otherLease=Object.freeze({signal:lease.signal,assertCurrent:lease.assertCurrent});
+      result.leaseDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption,grant},otherLease));
+      result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
+      result.replayDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption,grant},lease));
+     }else if(['grant_expiry_queue','deadline_grant_queue','C0_grant_queue'].includes(b.case)){
+      const g=b.case==='grant_expiry_queue'?{...grant,expiresAt:new Date(Date.now()+300).toISOString()}:grant;
+      const o=opts();if(b.case==='deadline_grant_queue')o.window.deadline=o.window.startedAt+300;
+      delay={needle:'INSERT INTO delegated_access_grants',ms:b.case==='C0_grant_queue'?1000:650};
+      result.grant=await store.insertReadGrant({...o,consumption,grant:g},lease);
+     }else if(b.case==='grant_after_barrier'){
+      result.barrier=await close();result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);result.observation=await observe(result.barrier);
+     }else if(b.case==='unknown_fence'){
+      lose='INSERT INTO finite_preparation_issuer_fences';result.unknown=await rejected(close);result.lookupBeforeBarrier=await rejected(()=>observe({status:'fenced'}));
+      result.foreignReconcile=await rejected(()=>store.reconcileFence({identity:i,fenceRequestId:U,window:clean()},lease));
+      const restart=createFinitePreparationIssuerStore({ctx,env});const barrier=await restart.reconcileFence({identity:i,fenceRequestId:F,window:clean()},lease);
+      result.barrier=barrier;result.observation=await restart.observeGrant({identity:i,barrier,expectedGrant:grant,window:clean()},lease);
+     }else{
+      // Commit the real INSERT first but retain its response, then serialize a terminal barrier.
+      if(b.case==='held_grant_ack')holdAck={needle:'INSERT INTO delegated_access_grants',ms:2000};
+      let grantSettled=false;const pending=store.insertReadGrant({...opts(),consumption,grant},lease);pending.then(()=>{grantSettled=true;},()=>{grantSettled=true;});
+      let earlyBarrier=null;
+      if(b.case==='held_grant_ack'){while(!grantCommitted&&!grantSettled)await sleep(1);if(!grantCommitted)await pending;earlyBarrier=await close();result.barrierBeforeGrantAck=!grantSettled;}
+      const issued=await pending;result.grant=issued;
+      if(b.case==='expired_cleanup')await sleep(1000);
+      if(b.case==='foreign_grants'){
+       const bad={user_id:'foreign-owner',client_id:'foreign-client',project_id:'foreign-project',resource:'https://foreign.invalid/mcp',scopes_json:'[]',created_at:new Date(at+1).toISOString(),expires_at:new Date(at+11000).toISOString()};
+       const original=await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first(),barrier=await close();result.denials={};
+       for(const [field,value]of Object.entries(bad)){await exec('UPDATE delegated_access_grants SET '+field+'=? WHERE id=?',value,i.grantId);result.denials[field]=await rejected(()=>observe(barrier));await exec('UPDATE delegated_access_grants SET '+field+'=? WHERE id=?',original[field],i.grantId);}
+       result.rows=await snapshot();return Response.json({result,events,at,identity:i});
+      }
+      if(b.case==='history')await exec('UPDATE delegated_access_grants SET exchanged_at=?,revoked_at=? WHERE id=?',new Date(at+1).toISOString(),new Date(at+2).toISOString(),i.grantId);
+      await exec("INSERT INTO delegated_access_grants VALUES (?,?,?,?,?,?,?,?,?,?)",'unrelated',i.subject,i.clientId,i.projectId,i.resource,'[]',grant.createdAt,grant.expiresAt,'','');
+      const before=(await db.prepare("SELECT * FROM delegated_access_grants WHERE id='unrelated'").first());
+      const barrier=earlyBarrier??await close();result.barrier=barrier;
+      result.clonedBarrierDenied=await rejected(()=>observe({...barrier}));
+      if(b.case==='foreign_owner')await exec('UPDATE site_projects SET revision=revision+1');
+      const observation=await observe(barrier);result.observation=observation;
+      result.clonedObservationDenied=await rejected(()=>store.revokeGrant({identity:i,barrier,observation:{...observation},window:clean()},lease));
+      result.revoke=await store.revokeGrant({identity:i,barrier,observation,window:clean()},lease);
+      result.unrelatedUnchanged=JSON.stringify(before)===JSON.stringify(await db.prepare("SELECT * FROM delegated_access_grants WHERE id='unrelated'").first());
+     }
+     result.rows=await snapshot();
+    }
+   }
+  }catch(e){result.error=e.message;}
+  return Response.json({result,events,at,identity:i});
+ }
+}
+const handler={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};
+export default handler;

~~~~~~~~~~

## test/fixtures/finite-preparation-notice-provenance-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-preparation-notice-provenance-worker.mjs b/test/fixtures/finite-preparation-notice-provenance-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-preparation-notice-provenance-worker.mjs
@@ -0,0 +1,203 @@
+import {createHash} from 'node:crypto';
+import {DurableObject} from 'cloudflare:workers';
+import {initialHash as hash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
+import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA as schema,FINITE_PREPARATION_MONITORING_SCHEMA as monitoringSchema} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {createFinitePreparationIssuerJournal} from '../../lib/mcp-qa-finite-preparation-issuer-journal.mjs';
+import {sealFinitePreparationIssuerRecord as issuer} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+import {encodeFinitePreparationRecord as prepEncode,decodeFinitePreparationRecord as prepDecode,hashFinitePreparationRecord as prepHash} from '../../lib/mcp-qa-finite-preparation-records.mjs';
+import {createFinitePreparationNoticeJournal as createJournal} from '../../lib/mcp-qa-finite-preparation-notice-journal.mjs';
+import {sealFinitePreparationNoticeRecord as seal,encodeFinitePreparationNoticeRecord as encode,FINITE_PREPARATION_NOTICE_PREFIX as P} from '../../lib/mcp-qa-finite-preparation-notice-records.mjs';
+import {observeFiniteReadOnlyWork} from '../../lib/mcp-qa-finite-stage-work.mjs';
+const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222';
+const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
+const denied=async fn=>{try{await fn();return false;}catch(e){if(e.message!=='Finite preparation notice unavailable')throw e;return true;}};
+const latch=()=>{let release;const wait=new Promise(resolve=>{release=resolve;});return {wait,release,reached:false};};
+// SYN identities/leases/fault gates. D1 results, SQL clocks and DO transactions are native.
+// No factual source, signed Access, CSRF/human approval or cross-RPC drain is claimed.
+export class FiniteNoticeProvenanceFixture extends DurableObject{
+ async fetch(request){
+  const b=await request.json(),db=this.env.RELEASE_DB,native=this.ctx.storage,events=[],result={};
+  const exec=(sql,...args)=>db.prepare(sql).bind(...args).run();
+  await exec('CREATE TABLE site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
+  await exec("CREATE TABLE delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
+  await exec("CREATE TABLE delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
+  for(const sql of [...schema,...monitoringSchema])await exec(sql);
+  const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms,originalDeadline=at+30000;
+  const i=issuer('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+24000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
+  const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=originalDeadline)throw Error('SYN original lease expired');}});
+  let txFault=null,txCommitted=false,txGate=null,sqlGate=null,sqlLoss=null,puts=0;
+  const wrapper={withSession(mode){events.push({mode});const session=db.withSession(mode);return {prepare(sql){events.push({sql});const stmt=session.prepare(sql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{
+   const actual=await bound[method]();
+   if(sqlGate&&sql.includes(sqlGate.needle)){const gate=sqlGate;sqlGate=null;gate.reached=true;gate.committed=!!actual;await gate.wait;}
+   if(sqlLoss&&sql.includes(sqlLoss)){sqlLoss=null;throw Error('SYN actual SQL result lost after commit');}
+   return actual;
+  };return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
+  const storage={
+   get:async(...args)=>{const v=await native.get(...args);if(txFault==='readback_loss'&&txCommitted)throw Error('SYN readback lost');return v;},
+   list:(...args)=>native.list(...args),
+   sync:async()=>{await native.sync();if(txFault==='sync_loss')throw Error('SYN sync lost');},
+   transaction:async callback=>{
+    const r=await native.transaction(async tx=>{
+     const proxy={get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:(...a)=>{puts++;return tx.put(...a);}};
+     const v=await callback(proxy);if(txFault==='callback_throw')throw Error('SYN callback throw');return v;
+    });txCommitted=true;
+    if(txGate){const gate=txGate;txGate=null;gate.reached=true;await gate.wait;}
+    if(txFault==='final_throw')throw Error('SYN final transaction return lost');return r;
+   }
+  };
+  const ctx={storage,id:this.ctx.id},env={RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE};
+  const store=createFinitePreparationIssuerStore({ctx,env}),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,at+14000)}),opts=()=>({identity:i,window:window()});
+  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(at+22000).toISOString()};
+  const writes=()=>events.filter(e=>e.sql?.includes('INSERT INTO dossier_monitoring_')).length;
+  const make=(kind,v)=>seal(kind,{purpose:'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1',...v});
+  let r,journal,ticketSend;
+  try{
+   await exec('INSERT INTO site_projects VALUES (?,?,?)',i.projectId,i.subject,1);
+   result.open=await store.openFence(opts(),lease);result.authorization=await store.insertAuthorization(opts(),lease);
+   const consumption=await store.consumeAuthorization({...opts(),consumedAt:new Date(at).toISOString()},lease);result.consumed=!!consumption;
+   const ij=createFinitePreparationIssuerJournal({ctx,env});
+   const ir=issuer('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash:hash('SYN-original-issuer-request',opts()),issuedAt:Date.now(),deadline:Date.now()+4000});
+   result.issuerReservation=await ij.appendReservation(ir,lease);
+   const gs=issuer('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:ir.recordHash,operation:'grant',requestId:null,requestHash:hash('SYN-original-grant-request',grant),issuedAt:Date.now(),deadline:Date.now()+4000});
+   await ij.appendSend({preconnectionId:H,record:gs},lease);
+   result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
+   if(result.grant.status!=='applied'||result.grant.row.id!==i.grantId)throw Error('SYN native original grant not reached');
+   result.reachedNativeGrant=true;
+   const ga=issuer('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:gs.recordHash,rowHash:hash('afw.finite-preparation-issuer-row.v1',result.grant.row),outcome:'applied',observedAt:Date.now()});
+   result.originalGrantAck=await ij.appendAck({preconnectionId:H,operation:'grant',record:ga},lease);
+   // Persist and read the ORIGINAL SYN reference rows before notice reservation.
+   const link={preconnectionId:H,authorizationHash:i.authorizationHash,grantId:i.grantId,grantHash:createHash('sha256').update(i.grantId).digest('hex'),acceptedAt:Date.now()};
+   const connection={connectionRef:H,subject:i.subject,grantId:i.grantId,clientId:i.clientId,projectId:i.projectId,resource:i.resource,issuedAt:at,expiresAt:at+22000};
+   await native.put('SYN:original:GrantLink',prepEncode('GrantLink',link));await native.put('SYN:original:ConnectionRef',prepEncode('ConnectionRef',connection));
+   const originalLink=prepDecode('GrantLink',await native.get('SYN:original:GrantLink')),originalConnection=prepDecode('ConnectionRef',await native.get('SYN:original:ConnectionRef'));
+   const issued=Date.now(),ticket={handleHash:'d'.repeat(64),requestId:F,expectedSequence:0,issuedAt:issued,expiresAt:at+19000,permissionExpiresAt:at+18000};
+   r=make('Reservation',{identity:i,issuerReservationHash:ir.recordHash,originalGrantAckHash:ga.recordHash,grantLinkHash:prepHash('GrantLink',originalLink),connectionHash:prepHash('ConnectionRef',originalConnection),expectedGrant:grant,consumedAt:consumption.consumed_at,accessExpiresAt:at+21000,preconnectionExpiresAt:at+23000,ticket,issuedAt:Date.now()});
+   result.originalBindings={issuer:ir.recordHash,ack:ga.recordHash,grantLink:prepHash('GrantLink',originalLink),connection:prepHash('ConnectionRef',originalConnection)};
+   journal=createJournal({ctx,env});
+   const data=s=>({identity:i,expectedGrant:grant,consumedAt:r.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:r.preconnectionExpiresAt,window:s.window});
+   const send=(operation='ticket',extra={})=>{
+    const issuedAt=Date.now(),window={startedAt:issuedAt,deadline:Math.min(issuedAt+4500,at+14000)};
+    const base={identityHash:i.identityHash,reservationHash:r.recordHash,operation,accessExpiresAt:r.accessExpiresAt,window,issuedAt,...extra};
+    const decisionHash=operation==='ticket'?null:hash('afw.finite-preparation-notice-decision.v1',{identityHash:i.identityHash,ticketRequestId:ticket.requestId,handleHash:ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt:base.issuedAt});
+    return make('Send',{...base,decisionHash,requestHash:hash('afw.finite-preparation-notice-request.v1',{operation,common:data(base),ticket,decisionHash})});
+   };
+   const append=s=>journal.appendSend({preconnectionId:H,record:s},lease);
+   const ack=(s,actual)=>make('Ack',{sendHash:s.recordHash,outcome:actual.status,rowHash:actual.status==='applied'?hash('afw.finite-preparation-notice-row.v1',actual.row):null,sequence:actual.status==='applied'&&s.operation==='consent'?actual.row.sequence:null,observedAt:Date.now()});
+   const appendAck=(s,a)=>journal.appendAck({preconnectionId:H,operation:s.operation,record:a},lease);
+   const freeze=()=>make('Freeze',{identityHash:i.identityHash,reservationHash:r.recordHash,frozenAt:Date.now()});
+   const read=()=>journal.read({preconnectionId:H},lease);
+   const issue=s=>store.insertMonitoringTicket({...data(s),ticket},lease);
+   const retain=async(kind,work)=>{
+    const gate=latch();if(kind==='transaction')txGate=gate;else{gate.needle='INSERT INTO dossier_monitoring_owner_tickets';sqlGate=gate;}
+    let settled=false;
+    const pending=observeFiniteReadOnlyWork({ctx,env,originalLease:lease},work).then(v=>{settled=true;return {value:v};},()=>{settled=true;return {rejected:true};});
+    while(!gate.reached&&!settled)await sleep(1);
+    if(!gate.reached)throw Error('SYN actual retained gate not reached');
+    result.gateReached=true;result.gateCommitted=kind==='transaction'?txCommitted:gate.committed;parent.abort();await sleep(10);result.pendingAfterAbort=!settled;
+    const other=new AbortController(),otherLease=Object.freeze({signal:other.signal,assertCurrent(){if(other.signal.aborted||Date.now()>=originalDeadline)throw Error('SYN same original deadline expired');}});
+    otherLease.assertCurrent();result.otherLeaseDistinct=otherLease!==lease;result.otherLeaseLive=!otherLease.signal.aborted;result.withinOriginalDeadline=Date.now()<originalDeadline;
+    try{await observeFiniteReadOnlyWork({ctx,env,originalLease:otherLease},()=>true);result.observerDenied=false;}catch(e){result.observerDenied=e.message==='Finite stage work remains outstanding';}
+    gate.release();result.pending=await pending;await sleep(0);otherLease.assertCurrent();
+    result.observerAfterSettle=await observeFiniteReadOnlyWork({ctx,env,originalLease:otherLease},()=>true);other.abort();
+   };
+   if(b.case==='retained-transaction'){
+    await retain('transaction',()=>journal.appendReservation(r,lease));result.noticeRows=[...await native.list({prefix:P})];result.writes=writes();
+   }else{
+    txCommitted=false;if(b.case==='transaction-fault')txFault=b.fault;
+    result.reservation=await journal.appendReservation(r,lease);result.txCommitted=txCommitted;
+    if(b.case==='transaction-fault'){
+     result.noticeRows=[...await native.list({prefix:P})];result.writes=writes();
+    }else{
+     result.reservationReplay=await journal.appendReservation(r,lease);
+     result.reservationConflict=await journal.appendReservation(make('Reservation',{...r,connectionHash:'e'.repeat(64)}),lease);
+     result.ticketReservationConflict=await journal.appendReservation(make('Reservation',{...r,ticket:{...ticket,requestId:U}}),lease);
+     if(b.case==='corrupt'){
+      const prefix=P+H+':';
+      if(b.fault==='unknown')await native.put(prefix+'unknown','{}');
+      if(b.fault==='seventh')for(let n=0;n<6;n++)await native.put(prefix+'extra'+n,'{}');
+      if(b.fault==='orphan'){await native.delete(prefix+'reservation');await native.put(prefix+'freeze',encode('Freeze',freeze()));}
+      if(b.fault==='noncanonical')await native.put(prefix+'reservation',' '+encode('Reservation',r));
+      if(b.fault==='actor')ctx.id={toString(){return i.actorId;}};
+      if(b.fault==='version')env.AFW_QA_VERSION.id=F;
+      if(b.fault==='metadata')env.AFW_QA_VERSION={id:U};
+      if(b.fault==='storage')ctx.storage={...storage};
+      if(b.fault==='binding')env.RELEASE_DB={...wrapper};
+      result.denied=await denied(read);result.writes=writes();
+     }else if(b.case==='invalid'){
+      let getters=0;ticketSend=send();
+      if(b.fault==='Access')ticketSend=send('ticket',{accessExpiresAt:r.ticket.expiresAt-1});
+      if(b.fault==='consent-without-ticket-ACK')ticketSend=send('consent');
+      if(b.fault==='request-hash')ticketSend=make('Send',{...ticketSend,requestHash:H});
+      if(b.fault==='decision-hash')ticketSend=make('Send',{...send('consent'),decisionHash:H});
+      if(b.fault==='pre-reservation')ticketSend=send('ticket',{issuedAt:r.issuedAt-1,window:{startedAt:r.issuedAt-1,deadline:r.issuedAt+1000}});
+      if(b.fault==='ceiling')ticketSend=send('ticket',{window:{startedAt:at+17000,deadline:at+19000},issuedAt:at+17000});
+      if(b.fault==='getter'){const v={...ticketSend};Object.defineProperty(v,'issuedAt',{enumerable:true,get(){getters++;return Date.now();}});ticketSend=v;}
+      try{result.invalid=await append(ticketSend);}catch(e){result.errorMessage=e.message;result.invalid={status:'denied'};}
+      result.getters=getters;result.history=await read();result.writes=writes();
+     }else{
+      ticketSend=send();
+      if(b.case==='freeze-empty'){
+       const f=freeze();result.freeze=await journal.freeze({preconnectionId:H,record:f},lease);result.freezeReplay=await journal.freeze({preconnectionId:H,record:f},lease);result.blockedSend=await append(ticketSend);result.history=await read();result.writes=writes();
+      }else{
+       const sends=await Promise.all([append(ticketSend),append(ticketSend)]);result.concurrent=sends;result.sendConflict=await append(send('ticket',{window:ticketSend.window,issuedAt:ticketSend.issuedAt+1}));
+       // Only a newly recorded SEND emits SQL; existing is DATA history, never permission.
+       if(sends.filter(v=>v.status==='recorded').length!==1)throw Error('SYN SEND must have exactly one recorded result');
+       if(b.case==='retained-sql'){
+        await retain('sql',()=>issue(ticketSend));result.history=await createJournal({ctx,env}).read({preconnectionId:H},Object.freeze({signal:new AbortController().signal,assertCurrent(){if(Date.now()>=originalDeadline)throw Error('SYN deadline');}}));result.writes=writes();
+       }else{
+        if(b.case==='sql-loss'&&b.target==='ticket')sqlLoss='INSERT INTO dossier_monitoring_owner_tickets';
+        if(b.case==='no-mutation')await exec('UPDATE site_projects SET revision=2');
+        try{result.ticket=await issue(ticketSend);}catch{result.actualSqlRejected=true;}
+        if(result.ticket?.status==='no_mutation'){
+         const ta=ack(ticketSend,result.ticket);result.ticketAck=await appendAck(ticketSend,ta);result.blockedConsent=await append(send('consent'));
+        }else if(result.ticket){
+         const ta=ack(ticketSend,result.ticket);result.ticketAckData=ta;
+         if(b.case==='invalid-ticket-ack'){
+          const changes={sendHash:H,sequence:17,observedAt:b.fault==='late'?ticketSend.window.deadline:ticketSend.issuedAt-1};
+          const invalid=make('Ack',{...ta,[b.fault==='late'||b.fault==='early'?'observedAt':b.fault]:changes[b.fault==='late'||b.fault==='early'?'observedAt':b.fault]});
+          result.invalidAck=await appendAck(ticketSend,invalid);result.history=await read();result.writes=writes();return Response.json({result,identity:i});
+         }
+         if(b.case==='freeze-ticket-send'){
+          result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedAck=await appendAck(ticketSend,ta);
+         }else{
+          result.ticketAck=await appendAck(ticketSend,ta);
+          journal=createJournal({ctx,env});result.betweenGetPost=await read();
+          if(b.case==='freeze-ticket-ack'){
+           result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedSend=await append(send('consent'));result.history=await read();result.writes=writes();return Response.json({result,identity:i});
+          }
+          // Foreign native events preserve MAX(current grant)=0 and assign sequence 17 globally.
+          for(let n=0;n<16;n++)await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",'SYN-foreign-'+n,i.projectId,i.subject,i.clientId,i.resource,'33333333-3333-4333-8333-'+String(n).padStart(12,'0'),at,at+19000);
+          result.foreignBefore=(await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id<>? ORDER BY sequence").bind(i.grantId).all()).results;
+          result.priorGrantMax=(await db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n;
+          const cs=send('consent',b.case==='consent-reduced'?{accessExpiresAt:ticket.expiresAt}:{});result.consentSend=await append(cs);
+          if(result.consentSend.status==='recorded'){
+           const common=data(cs),witness=await store.observeMonitoringTicket({...common,ticket},lease);result.observed=!!witness;result.witnessFrozen=Object.isFrozen(witness)&&Object.isFrozen(witness.row);
+           if(b.case==='sql-loss'&&b.target==='consent')sqlLoss='INSERT INTO dossier_monitoring_consent_events';
+           try{result.consent=await store.insertMonitoringConsent({...common,ticketWitness:witness},lease);}catch{result.actualSqlRejected=true;}
+           if(result.consent){const ca=ack(cs,result.consent);result.consentAckData=ca;
+            if(b.case==='freeze-consent-send'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedAck=await appendAck(cs,ca);}
+            else if(b.case==='invalid-consent-ack')result.invalidAck=await appendAck(cs,make('Ack',{...ca,sequence:null}));
+            else result.consentAck=await appendAck(cs,ca);}
+          }
+          result.foreignAfter=(await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id<>? ORDER BY sequence").bind(i.grantId).all()).results;
+          if(b.case==='freeze-complete'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.replayAck=await appendAck(ticketSend,ta);result.replaySend=await append(ticketSend);}
+         }
+        }
+        if(b.case==='sql-loss')journal=createJournal({ctx,env});result.history=await read();
+        if(b.case==='sql-loss'&&b.target==='ticket')result.blockedConsent=await append(send('consent'));
+        if(b.case==='sql-loss'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.afterFreeze=await read();}
+        result.ticketRows=(await db.prepare('SELECT * FROM dossier_monitoring_owner_tickets').all()).results;
+        result.eventRows=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).all()).results;
+        result.writes=writes();result.grantUnchanged=JSON.stringify(result.grant.row)===JSON.stringify(await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first());
+       }
+      }
+     }
+    }
+   }
+   result.puts=puts;result.reservationData=r;result.sendData=ticketSend;
+  }catch(e){result.error=e.message;}
+  return Response.json({result,identity:i});
+ }
+}
+const handler={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};
+export default handler;

~~~~~~~~~~

## test/fixtures/finite-preparation-store-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-preparation-store-worker.mjs b/test/fixtures/finite-preparation-store-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-preparation-store-worker.mjs
@@ -0,0 +1,76 @@
+import {finiteFixture} from './qa-finite-trial.mjs';
+import {finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+import {createHash} from 'node:crypto';
+import {DurableObject} from 'cloudflare:workers';
+import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
+import {createFinitePolicyEffectJournal} from '../../lib/mcp-qa-finite-policy-journal.mjs';
+import {hashFinitePreparationRecord} from '../../lib/mcp-qa-finite-preparation-records.mjs';
+// SYNTHETIC clock/leases/identity, actual native SQLite transactions. No source authority.
+const H='a'.repeat(64),M='b'.repeat(40),U='11111111-1111-4111-8111-111111111111';
+const domain=(kind,value)=>hashFinitePreparationRecord(kind,value);
+const seal=(kind,value,key)=>({...value,[key]:domain(kind,value)});
+function fixtures(){
+ const owner={subject:'synthetic-subject',accessRealmHash:H,accessVerifiedAt:1,accessExpiresAt:900000};
+ const project={projectId:'synthetic-project',revision:1,synthetic:true};
+ const projectHash=createHash('sha256').update('afw.finite-owner-project.v1\n'+JSON.stringify({projectId:project.projectId,revision:project.revision,synthetic:project.synthetic})).digest('hex');
+ const approval={purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:M,projectHash,goal:'discovery',approvedAt:1,expiresAt:900000,csrfReceiptHash:H};
+ const preparation=seal('OwnerPreparation',{purpose:'afw.finite-owner-preparation.v1',prepId:H,sourceRevision:M,actorId:H,selectedAt:10,expiresAt:900000,commandBy:390000,owner,connection:{connectionRef:H,grantId:'grant',clientId:'client',resource:'https://fixture.invalid/mcp',grantHash:H,consentHash:H,noticesHash:H,permissionExpiresAt:900000},project,goal:'discovery',programContext:{programHash:H,sourceRevision:M,originalContextHash:H},approval,auditHash:H},'preparationHash');
+ const selection=seal('Selection',{purpose:'afw.finite-owner-selection.v1',sourceRevision:M,prepId:H,preparationHash:preparation.preparationHash,selectedAt:10,sequence:1,previousSelectionHash:null},'selectionHash');
+ const binding={purpose:'afw.finite-owner-binding.v1',prepId:H,preparationHash:preparation.preparationHash,selectionHash:selection.selectionHash,intentId:'intent-1',sourceRevision:M,T0:20,boundAt:30};
+ const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash:H,subjectHash:H,sourceRevision:M,projectRef:H,connectionRef:null,preconnectionId:H,action:'connection',createdAt:1,expiresAt:900000};
+ const identity={kind:'policy',intentId:'intent-1',sourceRevision:M,setupInstanceId:'setup-1',effect:'upload'};
+ const send={purpose:'afw.finite-policy-send.v1',intentId:'intent-1',sourceRevision:M,setupInstanceId:'setup-1',contextHash:H,effect:'upload',requestHash:H,issuedAt:30,deadline:5000};
+ const ack={purpose:'afw.finite-policy-ack.v1',sendHash:domain('PolicySend',send),resourceId:U,acknowledgedAt:35};
+ const preconnection=seal('Preconnection',{purpose:'afw.finite-connection-preparation.v1',preconnectionId:H,sourceRevision:M,actorId:H,owner,project,clientId:'client',resource:'https://fixture.invalid/mcp',startedAt:1,expiresAt:900000,approvalHash:H,baselineHash:H},'recordHash');
+ const receipt=seal('PolicyReceipt',{purpose:'afw.finite-policy-installed.v1',intentId:'intent-1',sourceRevision:M,setupInstanceId:'setup-1',qaVersionId:U,seedHash:H,contextHash:H,baselineVersionId:U,baselineDeploymentId:U,versionId:U,deploymentId:U,moduleHash:H,publicStaticHash:H,activationHash:H,restorationHash:H,bindingsHash:H,installedAt:100},'receiptHash');
+ const {legacy,T0}=finiteFixture().plan,contextPreparation=structuredClone(preparation);
+ contextPreparation.selectedAt=T0-10;contextPreparation.expiresAt=T0+900000;contextPreparation.commandBy=T0+390000;contextPreparation.owner.accessVerifiedAt=T0-100;contextPreparation.owner.accessExpiresAt=T0+900000;contextPreparation.connection.permissionExpiresAt=T0+900000;contextPreparation.approval.approvedAt=T0-100;contextPreparation.approval.expiresAt=T0+900000;contextPreparation.preparationHash=domain('OwnerPreparation',contextPreparation);
+ const contextSelection=seal('Selection',{...selection,preparationHash:contextPreparation.preparationHash,selectedAt:T0-10},'selectionHash');
+ const contextBinding={...binding,T0,boundAt:T0+1,preparationHash:contextPreparation.preparationHash,selectionHash:contextSelection.selectionHash};
+ const config=structuredClone(finitePublicProfileTemplate('canaryLive'));for(const b of config.bindings)if(b.privateSlot){delete b.privateSlot;b.text='synthetic';}
+ const context={purpose:'afw.finite-policy-context.v1',intentId:'intent-1',sourceRevision:M,seedHash:H,preparationHash:contextPreparation.preparationHash,selectionHash:contextSelection.selectionHash,bindingHash:domain('Binding',contextBinding),T0,C0:T0+240000,C1:T0+420000,ownerPreparation:contextPreparation,baselineProjectRevision:1,goal:'discovery',saveIdempotencyKey:U,legacy,policies:{AFW_DOSSIER_EVENTS_POLICY:'synthetic',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:'synthetic',AFW_DOSSIER_RETIREMENT_POLICY:'synthetic',AFW_DOSSIER_SUCCESSOR_POLICY:'synthetic',AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'project'},baseline:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:config},rollback:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:config},expectedFull:{activationHash:H,restorationHash:H,bindingsHash:H}};
+ return {preparation,selection,binding,ticket,identity,send,ack,preconnection,receipt,context,contextSelection,contextBinding};
+}
+export class FinitePreparationFixture extends DurableObject{
+ async fetch(request){
+  const b=await request.json();let at=b.now??100,assertions=0;
+  const controller=new AbortController();
+  const lease={signal:controller.signal,assertCurrent(){assertions++;if(controller.signal.aborted||b.expireAtAssertion===assertions)throw Error('synthetic lease expired');}};
+  let committed=false,transactions=0,argumentMutations=0;
+  const storage={get:(...a)=>this.ctx.storage.get(...a),transaction:async fn=>{
+   const ordinal=++transactions;
+   const result=await this.ctx.storage.transaction(async tx=>{
+    const interleaved=b.mutateArgumentAfterGet?{
+     async get(key){const pending=tx.get(key),value=await pending;if(key===b.mutateArgumentAfterGet.key&&argumentMutations===0){await Promise.resolve();Object.assign(b.arg,b.mutateArgumentAfterGet.changes);argumentMutations++;}return value;},
+     put:(...args)=>tx.put(...args)
+    }:tx;
+    const r=await fn(interleaved);if(b.holdFirstCommitUntil&&ordinal===1){await new Promise(resolve=>setTimeout(resolve,20));at=b.holdFirstCommitUntil;}return r;});committed=true;
+   if(b.loseCommitAck||b.loseCommitNumber===ordinal)throw Error('synthetic lost response AFTER native transaction commit');
+   return result;
+  }};
+  try{
+   if(b.op==='fixtures')return Response.json(fixtures());
+   if(b.op==='recordHash')return Response.json({result:domain(b.arg.kind,b.arg.record)});
+   if(b.op==='rows')return Response.json([...await this.ctx.storage.list()]);
+   const store=createFiniteOwnerPreparationStore({storage,now:()=>at});
+   const journal=createFinitePolicyEffectJournal({storage,identity:b.identity??fixtures().identity,now:()=>at});
+   const target=b.target==='journal'?journal:store;
+   if(b.op==='concurrentJournal'){
+    const outcomes=await Promise.allSettled(b.args.map(x=>createFinitePolicyEffectJournal({storage,identity:x.identity,now:()=>at}).issue(x.send,lease)));
+    return Response.json(outcomes.map(x=>x.status==='fulfilled'?x.value:{rejected:true}));
+   }
+   if(b.op==='concurrent'){
+    const outcomes=await Promise.allSettled(b.args.map(args=>{args.preparation=seal('OwnerPreparation',args.preparation,'preparationHash');args.selection=seal('Selection',{...args.selection,preparationHash:args.preparation.preparationHash},'selectionHash');return store.publishSelection(args,lease);}));
+    return Response.json(outcomes.map(x=>x.status==='fulfilled'?x.value:{rejected:true}));
+   }
+   if(b.reseal){b.arg.preparation=seal('OwnerPreparation',b.arg.preparation,'preparationHash');b.arg.selection=seal('Selection',{...b.arg.selection,preparationHash:b.arg.preparation.preparationHash},'selectionHash');}
+   const result=await (b.op==='read'?target.read(lease):target[b.op](b.arg,lease));
+   return Response.json({result,committed,assertions,argumentMutations});
+  }catch{return Response.json({rejected:true,committed,assertions,argumentMutations});}
+ }
+}
+const handler={async fetch(request,env){
+ const stub=env.FIXTURE.get(env.FIXTURE.idFromName(new URL(request.url).pathname));
+ return stub.fetch(request);
+}};
+export default handler;

~~~~~~~~~~

## test/fixtures/finite-restoration.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-restoration.mjs b/test/fixtures/finite-restoration.mjs
--- /dev/null
+++ b/test/fixtures/finite-restoration.mjs
@@ -0,0 +1,40 @@
+import {finiteFixture,digest} from './qa-finite-trial.mjs';
+import {finiteProofFixture} from './finite-cleanup-proof.mjs';
+import {restorationFixture,ROOT,W,OP,fixtureConfigHash} from './canary-restoration.mjs';
+import {finiteCleanupPolicyHash} from '../../lib/mcp-finite-cleanup-policy.mjs';
+import {finiteHash} from '../../lib/mcp-finite-evidence.mjs';
+import * as controls from '../../lib/mcp-qa-finite-trial-control.mjs';
+import {createPrivateQaFiniteCleanupStore} from '../../lib/mcp-qa-finite-cleanup-store.mjs';
+import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
+export async function finiteRestorationFixture({configure=()=>{},at}={}){
+ const f=finiteFixture({at}),old=restorationFixture({at:f.plan.C0+3,containerId:f.plan.resources.containerId}),p=f.plan;
+ const pin=(v,dep)=>({versionId:v.id,deploymentId:dep,configurationHash:fixtureConfigHash(v),module:{name:v.main_module,sha256:old.policy.closed.moduleHash,bytes:old.policy.closed.moduleBytes}});
+ p.deployments.canaryLive=pin(old.state.live,old.ids.liveDep);p.deployments.canaryClosed=pin(old.state.closed,old.ids.closedDep);p.deployments.operatorClosed=pin(old.state.operatorVersion,old.ids.opDep);
+ p.canaryContainment.runtimeVersionId=p.deployments.canaryLive.versionId;p.canaryContainment.moduleHash=p.deployments.canaryLive.module.sha256;p.closePolicyHash=finiteCleanupPolicyHash(p);
+ configure(p,f);p.closePolicyHash=finiteCleanupPolicyHash(p);
+ let store,identity;
+ f.primary.effect=async kind=>{const r=await store.read();return {purpose:'afw.qa-finite-effect-eligibility.v1',intentId:p.intentId,controlHash:identity.controlHash,kind,proofHash:r.record.proofHash,observedAt:f.now(),eligible:true,evidenceHash:'a'.repeat(64)};};
+ const ctl=controls.createPrivateQaFiniteTrialControl(f.options(controls)),armed=await ctl.prepare();if(armed.status!=='armed')throw Error('fixture control '+armed.status);
+ identity={plan:p,planHash:digest(p.purpose,p),controlHash:armed.controlHash};const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash});f.setNow(p.C0+3);
+ store=createPrivateQaFiniteCleanupStore({storage:f.storage,control:identity,now:f.now});
+ await store.capture(async challenge=>({proof:{...proof.proof,proofChallenge:challenge,evidenceHash:finiteHash({proofChallenge:challenge,sealHash:proof.proof.sealHash,support:proof.support})},support:proof.support}));
+ const retained=await store.read(),issued=await ctl.claimEffect('canary_restore');if(issued.status!=='issued')throw Error('fixture claim');
+ const qualifiedExecution={intentId:p.intentId,controlHash:armed.controlHash,sourceRevision:p.source.revision,moduleHash:p.source.moduleHash,confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,admissionHash:'a'.repeat(64)};
+ const state={nominal:'complete',observer:'running',extra:false,providerRunning:false,lostPost:false};let posts=0;
+ const ok=(result,result_info)=>({success:true,status:200,errors:[],result,...(result_info?{result_info}:{})});
+ const request=async x=>{
+  if(x.method==='POST'){posts++;const result=await old.request(x);old.state.canary.annotations=structuredClone(x.body.annotations);if(state.lostPost)throw Error('synthetic lost POST ACK');return result;}
+  if(x.path===ROOT+'/workflows')return ok(AFW_FIXED_WORKFLOWS.map(s=>({name:s.name,id:s.id,script_name:s.script,class_name:s.className})),{per_page:100,page:1,count:3,total_count:3});
+  for(const spec of AFW_FIXED_WORKFLOWS){
+   if(x.path===ROOT+'/workflows/'+spec.name)return ok({name:spec.name,id:spec.id,script_name:spec.script,class_name:spec.className});
+   if(x.path===ROOT+'/workflows/'+spec.name+'/instances'){
+    const rows=spec.className==='PrivateQaNamedConfirmation'?[{id:p.workflows.confirmation,status:state.nominal,workflow_id:spec.id}]:spec.className==='PrivateQaBootstrap'?[{id:p.workflows.bootstrap,status:state.observer,workflow_id:spec.id},...(state.launcher===null?[]:[{id:p.workflows.launcher,status:state.launcher??'complete',workflow_id:spec.id}])]:[];
+    if(state.extra&&spec.className==='PrivateQaBootstrap')rows.push({id:'another-active-observer',status:'running',workflow_id:spec.id});
+    return ok(rows,{per_page:100,count:rows.length,total_count:rows.length});
+   }
+  }
+  if(x.path.includes('/instances-v2')){if(Object.hasOwn(x.query,'state'))throw Error('must enumerate all states');return state.providerRunning?ok([{id:p.resources.containerId,application_id:p.resources.applicationId,image:'cloudflare/debian-trixie',status:{state:'running'}}],{per_page:100}):ok([],{per_page:100});}
+  return old.request(x);
+ };
+ return {f,old,state,identity,store,retained,ctl,qualifiedExecution,request,get posts(){return posts;},input:{claim:issued.claim,proofHash:retained.record.proofHash},options:{storage:f.storage,control:identity,proofStore:store,request,primaryRead:async()=>({...proof.support.primary,observedAt:f.now()}),qualifiedExecution,now:f.now},ROOT,W,OP};
+}

~~~~~~~~~~

## test/fixtures/finite-seed-primary.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-seed-primary.mjs b/test/fixtures/finite-seed-primary.mjs
--- /dev/null
+++ b/test/fixtures/finite-seed-primary.mjs
@@ -0,0 +1,36 @@
+import {v2Manifest} from './finite-v2.mjs';
+import {createHash} from 'node:crypto';
+import {readFile} from 'node:fs/promises';
+import {encodeFiniteMaterialSeed,hashFinitePackageManifest} from '../../lib/mcp-qa-finite-seed.mjs';
+export const SEED_GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
+export const digest=x=>createHash('sha256').update(x).digest('hex');
+export const seedFile=(path,text)=>({type:'file',path,encoding:'base64',size:Buffer.byteLength(text),sha:createHash('sha1').update('blob '+Buffer.byteLength(text)+'\0').update(text).digest('hex'),content:Buffer.from(text).toString('base64')});
+export async function seedPrimaryFixture({T0=Date.parse('2026-11-01T18:00:00Z'),sourceRevision='b'.repeat(40),commandId='123',qaLive,manifest:inputManifest,build:inputBuild}={}){
+ const sourceTree='c'.repeat(40),actor={id:290715446,login:'tokenizartinfo-ops',type:'User'},repository={id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'};
+ const intentId=digest('afw.qa-finite-confirmation-command.v1\n1347578006\n'+commandId+'\n'+sourceRevision+'\n'+T0);
+ const buildPath='.github/workflows/afw-finite-native-package.yml',workflow='name: Synthetic package\non:\n  push:\n    branches: [main]\n',finalizerPath='.github/workflows/afw-finite-finalizer.yml';
+ const modulePin={name:'index.mjs',sha256:'1'.repeat(64),bytes:1,exports:[]};
+ const manifest=inputManifest??{purpose:'afw.finite-native-package.v2',sourceRevision,sourceTree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:digest(workflow),modules:Object.fromEntries(['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'].map(role=>[role,{sourceRevision:role==='operatorClosed'?'d'.repeat(40):sourceRevision,sourceTree:role==='operatorClosed'?'e'.repeat(40):sourceTree,module:{...modulePin,name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',...(role==='qaLive'&&qaLive?qaLive.module:{})},configurationHash:role==='qaLive'&&qaLive?qaLive.configurationHash:'2'.repeat(64),profileHash:'3'.repeat(64),bindingsHash:'4'.repeat(64)}])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};
+ v2Manifest(manifest);
+ const build=inputBuild??{workflowPath:buildPath,runId:101,attempt:1,artifactId:202,artifactName:'afw-finite-native-package-'+sourceRevision,artifactDigest:'sha256:'+'5'.repeat(64),manifestHash:hashFinitePackageManifest(manifest)};
+ const live={versionId:qaLive?.versionId??'11111111-1111-4111-8111-111111111111',deploymentId:qaLive?.deploymentId??'22222222-2222-4222-8222-222222222222'},closedId='c570b60b-95dc-48e1-89f3-9c4651691dbc';
+ const pubRole=role=>({configurationHash:role==='qaLive'&&qaLive?qaLive.configurationHash:'2'.repeat(64),...Object.fromEntries(['module','publicStatic'].map(k=>[k,structuredClone(manifest.modules[role][k])]))});
+ const seed={purpose:'afw.finite-material-seed.v2',repository:repository.full_name,repositoryId:repository.id,intentId,sourceRevision,commandId,finalizer:{runId:11,attempt:1,jobId:12,workflowPath:finalizerPath,seedStep:'seed-material'},build,manifest,qaPublication:{purpose:'afw.finite-qa-publication.v1',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-independent-closure-qa',qaLive:{...live,...pubRole('qaLive')},qaClosed:{versionId:closedId,...pubRole('qaClosed')},observedAt:T0+1000}};
+ const ref='refs/tags/afw-finite-observer-create/'+intentId,tagSha='f'.repeat(40),map=new Map();
+ map.set('/git/ref/tags/afw-finite-observer-create/'+intentId,{ref,object:{type:'tag',sha:tagSha}});
+ map.set('/git/tags/'+tagSha,{sha:tagSha,tag:'afw-finite-observer-seed-'+intentId,object:{type:'commit',sha:sourceRevision},message:encodeFiniteMaterialSeed(seed)});
+ map.set('/issues/comments/'+commandId,{id:Number(commandId),body:'/afw-qa-finite-confirmation v1 '+sourceRevision,created_at:new Date(T0).toISOString(),user:actor,author_association:'OWNER',issue_url:SEED_GH+'/issues/497'});
+ map.set('/git/ref/heads/main',{ref:'refs/heads/main',object:{type:'commit',sha:sourceRevision}});
+ map.set('/actions/runs/11',{id:11,run_attempt:1,head_sha:sourceRevision,head_branch:'main',event:'issue_comment',path:finalizerPath,repository,head_repository:repository,actor,triggering_actor:actor,display_title:'AFW finite finalizer comment-'+commandId+' source-'+sourceRevision,status:'in_progress'});
+ const seedStep={name:'seed-material',number:3,status:'completed',conclusion:'success',started_at:new Date(T0).toISOString(),completed_at:new Date(T0+2000).toISOString()};
+ map.set('/actions/runs/11/attempts/1/jobs?per_page=100',{total_count:1,jobs:[{id:12,run_id:11,head_sha:sourceRevision,name:'admit',status:'in_progress',conclusion:null,started_at:new Date(T0).toISOString(),steps:[seedStep]}]});
+ map.set('/git/commits/'+sourceRevision,{sha:sourceRevision,tree:{sha:manifest.sourceTree}});
+ map.set('/actions/runs/101',{id:101,run_attempt:1,head_sha:sourceRevision,head_branch:'main',event:'push',path:buildPath,repository,head_repository:repository,status:'completed',conclusion:'success'});
+ map.set('/actions/artifacts/202',{id:202,name:build.artifactName,digest:build.artifactDigest,expired:false,expires_at:new Date(T0+86400000).toISOString(),size_in_bytes:1000,workflow_run:{id:101,repository_id:repository.id,head_repository_id:repository.id,head_sha:sourceRevision,head_branch:'main'}});
+ map.set('/contents/'+buildPath+'?ref='+sourceRevision,seedFile(buildPath,workflow));
+ map.set('/contents/'+finalizerPath+'?ref='+sourceRevision,seedFile(finalizerPath,await readFile(finalizerPath,'utf8')));
+ let at=T0+3000;const calls=[];
+ const response=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{date:new Date(at).toUTCString(),'content-type':'application/json'}});
+ const fetchImpl=async(url,init)=>{calls.push({url,init});if(init.method!=='GET'||!url.startsWith(SEED_GH))throw Error('synthetic fixed GET');const path=url.slice(SEED_GH.length);return response(map.get(path)??{},map.has(path)?200:404);};
+ return {T0,seed,map,seedStep,tagSha,ref,actor,repository,live,workflow,buildPath,calls,response,fetchImpl,now:()=>at,setNow:value=>{at=value;},refresh(){map.get('/git/tags/'+tagSha).message=encodeFiniteMaterialSeed(seed);},options:{intentId,sourceRevision,fetchImpl,now:()=>at,signal:new AbortController().signal}};
+}

~~~~~~~~~~

## test/fixtures/finite-seed-world.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-seed-world.mjs b/test/fixtures/finite-seed-world.mjs
--- /dev/null
+++ b/test/fixtures/finite-seed-world.mjs
@@ -0,0 +1,103 @@
+import {QA_CLOUD_CLOSED_PINS} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
+Error.stackTraceLimit=0;
+import {readFileSync} from 'node:fs';
+import {build} from 'esbuild';
+import {spawnSync} from 'node:child_process';
+import {fileURLToPath,pathToFileURL} from 'node:url';
+import {resolve} from 'node:path';
+import {randomUUID} from 'node:crypto';
+import {qaClosedConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
+import {finiteGhaCustody} from '../../lib/mcp-qa-finite-custody.mjs';
+import {hashFinitePackageManifest} from '../../lib/mcp-qa-finite-seed.mjs';
+import {seedPrimaryFixture,digest,SEED_GH} from './finite-seed-primary.mjs';
+const MODULE=Buffer.from("throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n");
+const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa',CF='https://api.cloudflare.com/client/v4';
+const SIGNED='https://productionresultssa1.blob.core.windows.net/actions-results/fixture/archive.zip?sig=SYNTHETIC';
+/** Synthetic EXTERNAL PLATFORM + SOURCE AUTHORITY. Actual resolver/ZIP/parser/
+ * hash/CLI/fences/native reader execute. No production reset/override hook. */
+export async function seedWorld({sourceAuthority=true}={}){
+ const f=await seedPrimaryFixture(),m=f.seed.manifest,versions={},closedId=f.seed.qaPublication.qaClosed.versionId,liveId=f.live.versionId;
+ for(const role of Object.keys(m.modules)){
+  const d=m.modules[role];d.module={name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:digest(MODULE),bytes:MODULE.length,exports:['default']};
+  const v={id:role==='qaClosed'?closedId:liveId,main_module:d.module.name,compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],usage_model:'standard',urls:[],exports:['default'],modules:[{name:d.module.name,content_type:'application/javascript+module',content_base64:MODULE.toString('base64')}],bindings:[{name:'AFW_INDEPENDENT_CLOSURE',type:'durable_object_namespace',class_name:'IndependentClosure',namespace_id:'070c4a7708eb4592a3ded7c117a88225'}]};
+  d.publicStatic.configurationHash=digest('PUBLIC-CONFIG:'+role);
+  // Explicit SYNTHETIC commitments. Production semantics remain unimplemented.
+  d.publicStatic.profileHash=digest('SYNTHETIC-PROFILE:'+role);d.publicStatic.bindingsHash=digest('SYNTHETIC-BINDINGS:'+role);
+  if(['qaLive','qaClosed'].includes(role))versions[v.id]=v;
+ }
+ const built=spawnSync('python3',[fileURLToPath(new URL('../finite_archive_test.py',import.meta.url)),'--fixture'],{input:JSON.stringify({manifest:m}),maxBuffer:67108864,timeout:5000});
+ if(built.status!==0)throw Error('synthetic ZIP failed');const zip=built.stdout;
+ f.seed.build.manifestHash=hashFinitePackageManifest(m);f.seed.build.artifactDigest='sha256:'+digest(zip);
+ for(const role of ['qaLive','qaClosed'])for(const key of ['module','publicStatic'])f.seed.qaPublication[role][key]=structuredClone(m.modules[role][key]);
+ for(const role of ['qaLive','qaClosed'])f.seed.qaPublication[role].configurationHash=qaClosedConfigurationHash(versions[f.seed.qaPublication[role].versionId]);
+ f.refresh();
+ const artifact=f.map.get('/actions/artifacts/202');artifact.digest=f.seed.build.artifactDigest;artifact.size_in_bytes=zip.length;
+ f.seedStep.status='in_progress';f.seedStep.conclusion=null;f.seedStep.completed_at=null;f.setNow(f.T0+1000);
+ f.map.delete('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId);f.map.delete('/git/tags/'+f.tagSha);
+ const pins={...QA_CLOUD_CLOSED_PINS,qaClosed:{name:QA,id:closedId,configurationHash:f.seed.qaPublication.qaClosed.configurationHash,bindingCount:1,flagCount:0,module:{name:'closed-rollback.mjs',bytes:MODULE.length,sha256:digest(MODULE)}}};
+ const syntheticAuthority=`
+ import assert from 'node:assert/strict';
+ const expected=${JSON.stringify(m)},versions=${JSON.stringify(versions)};
+ const fail=()=>{throw Error('synthetic source authority mismatch');};
+ export function qualifyFiniteSourcePackage({manifest}){assert.deepEqual(manifest,expected);return expected.modules;}
+ export function qualifyFiniteSourceRoleMetadata({manifest,role,metadata}){qualifyFiniteSourcePackage({manifest});const v=versions[role==='qaLive'?"11111111-1111-4111-8111-111111111111":"c570b60b-95dc-48e1-89f3-9c4651691dbc"];const config=Object.fromEntries(['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'].map(k=>[k,v[k]??(k==='containers'?[]:undefined)]));if(!['qaLive','qaClosed'].includes(role)||JSON.stringify(metadata)!==JSON.stringify(config))fail();return {publicStatic:expected.modules[role].publicStatic};}
+ export function qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed}){
+  if(ctx.id.toString()!=='synthetic-actor'||env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1').toString()!=='synthetic-actor'||env.AFW_QA_VERSION.id!==${JSON.stringify(liveId)}||env.SOURCE_TEMPLATE!==${JSON.stringify(m.sourceRevision)}||sourceRevision!==env.SOURCE_TEMPLATE||intentId!==${JSON.stringify(f.seed.intentId)})fail();
+  if(seed){qualifyFiniteSourcePackage({manifest:seed.manifest});if(seed.qaPublication.qaLive.publicStatic.profileHash!==expected.modules.qaLive.publicStatic.profileHash||seed.qaPublication.qaLive.publicStatic.bindingsHash!==expected.modules.qaLive.publicStatic.bindingsHash)fail();}
+ }
+ export function readFiniteNativeCustody(){return {id:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',tokenKind:'account',expiresAt:${f.T0+86400000}};}
+ `;
+ const authorityPath=resolve('lib/mcp-qa-finite-source-authority.mjs'),pinsPath=resolve('lib/mcp-qa-cloud-closed-pins.mjs');
+ const bundle=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-seed-issuer.mjs';export * from './lib/mcp-qa-finite-seed-http.mjs';export * from './lib/mcp-qa-finite-publication-bridge.mjs';export * from './lib/mcp-qa-cloud-lifecycle-admission.mjs';export * from './scripts/run-qa-finite-trial-finalizer.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as __createRequire} from 'node:module'; const require = __createRequire(process.cwd()+'/package.json');"},plugins:[{name:'explicit-synthetic-source-authority',setup(b){
+  b.onResolve({filter:/mcp-qa-finite-package\.mjs$/},()=>({path:pathToFileURL(resolve('test/fixtures/finite-package-resolver.mjs')).href,external:true}));
+  b.onLoad({filter:/mcp-qa-finite-source-authority\.mjs$/},async args=>args.path===authorityPath&&sourceAuthority?{contents:syntheticAuthority,loader:'js'}:undefined);
+  b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},async args=>args.path===pinsPath&&sourceAuthority?{contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins)+';',loader:'js'}:undefined);
+ }}]});
+ const api=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64')+'#'+randomUUID());
+ const state={mode:'normal',tagPosts:0,refPosts:0,phase:'issuer',hook:null},calls=[],tags=new Map();
+ const respond=(value,status=200)=>f.response(value,status);
+ const fetchImpl=async(url,init)=>{
+  calls.push({url,init});
+  if(state.hook){const response=await state.hook(url,init);if(response)return response;}
+  if(url===SIGNED)return new Response(zip);
+  if(url.startsWith(CF)){
+   const path=url.slice(CF.length);
+   if(init.method!=='GET')throw Error('NO CF MUTATION');
+   const envelope=result=>respond({success:true,errors:[],messages:[{code:10000,message:'Valid',type:null}],result});
+   if(path===ROOT+'/tokens/verify'){
+    const native=init.headers.Authorization==='Bearer synthetic-native';
+    return envelope({id:native?'a'.repeat(32):finiteGhaCustody().id,status:'active',expires_on:new Date(native?f.T0+86400000:finiteGhaCustody().expiresAt).toISOString(),not_before:null});
+   }
+   if(path===ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1')return envelope({deployments:[{id:f.live.deploymentId,strategy:'percentage',versions:[{version_id:f.live.versionId,percentage:100}]}]});
+   if(path.startsWith(ROOT+'/workers/workers/'+QA+'/versions/'))return envelope(versions[path.split('/').at(-1).split('?')[0]]);
+   throw Error('unexpected synthetic CF path');
+  }
+  if(!url.startsWith(SEED_GH))throw Error('unexpected synthetic origin');
+  const path=url.slice(SEED_GH.length);
+  if(path==='/contents/lib/mcp-qa-cloud-closed-pins.mjs?ref='+m.sourceRevision){const text=readFileSync('lib/mcp-qa-cloud-closed-pins.mjs','utf8');return respond({type:'file',path:'lib/mcp-qa-cloud-closed-pins.mjs',sha:'26213123304eea25e652a52d808d25b7e0e3475e',size:Buffer.byteLength(text),encoding:'base64',content:Buffer.from(text).toString('base64')});}
+  if(path==='/actions/workflows/afw-finite-native-package.yml')return respond({id:7,path:f.buildPath,state:'active'});
+  if(path.startsWith('/actions/workflows/afw-finite-native-package.yml/runs?'))return respond({total_count:1,workflow_runs:[{...f.map.get('/actions/runs/101'),workflow_id:7}]});
+  if(path==='/actions/runs/101/artifacts?per_page=100&page=1')return respond({total_count:1,artifacts:[artifact]});
+  if(path==='/actions/artifacts/202/zip')return new Response(null,{status:302,headers:{location:SIGNED}});
+  if(path==='/git/commits/'+'d'.repeat(40))return respond({sha:'d'.repeat(40),tree:{sha:'e'.repeat(40)}});
+  if(path==='/git/tags'&&init.method==='POST'){
+   state.tagPosts++;const b=JSON.parse(init.body),tag={sha:f.tagSha,tag:b.tag,message:b.message,object:{type:b.type,sha:b.object}};tags.set(f.tagSha,tag);
+   if(state.mode==='tag-lost')throw Error('SYNTHETIC lost ACK');if(state.mode==='tag-late')f.setNow(f.T0+120001);return respond(tag,201);
+  }
+  if(path==='/git/refs'&&init.method==='POST'){
+   state.refPosts++;const b=JSON.parse(init.body),v={ref:b.ref,object:{type:'tag',sha:b.sha}};
+   f.map.set('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId,v);
+   if(state.mode==='ref-lost')throw Error('SYNTHETIC lost ACK');if(state.mode==='ref-late')f.setNow(f.T0+120001);return respond(v,201);
+  }
+  if(path==='/git/tags/'+f.tagSha&&tags.has(f.tagSha))return respond(tags.get(f.tagSha));
+  return respond(f.map.get(path)??{},f.map.has(path)?200:404);
+ };
+ Object.assign(process.env,{AFW_FINITE_SEED_ORIGINAL_PID:String(process.pid),GITHUB_JOB:'admit',GITHUB_ACTION:'finite_seed_once',GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:m.sourceRevision});
+ const event={action:'created',repository:f.repository,issue:{number:497},sender:f.actor,comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+m.sourceRevision,created_at:new Date(f.T0).toISOString(),author_association:'OWNER',user:f.actor}};
+ const context={repository:f.repository.full_name,repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:m.sourceRevision};
+ const admission=api.validateQaFiniteConfirmationCommand({event,context,now:f.now});
+ const options={admission,githubToken:'synthetic-gh',credential:'synthetic-cf',fetchImpl,now:f.now,signal:new AbortController().signal};
+ const env={GITHUB_EVENT_PATH:'synthetic-event',GITHUB_REPOSITORY:context.repository,GITHUB_REPOSITORY_ID:context.repositoryId,GITHUB_REF:context.ref,GITHUB_EVENT_NAME:context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:m.sourceRevision,GITHUB_TOKEN:'synthetic-gh',AFW_QA_CLOSED_TOKEN:'synthetic-cf'};
+ const nativeEnv={AFW_QA_VERSION:{id:liveId},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native',SOURCE_TEMPLATE:m.sourceRevision,AFW_INDEPENDENT_CLOSURE:{idFromName:()=>({toString:()=> 'synthetic-actor'})}};
+ return {...f,api,state,calls,tags,versions,fetchImpl,options,event,env,nativeEnv,complete(){f.setNow(f.T0+3000);f.seedStep.status='completed';f.seedStep.conclusion='success';f.seedStep.completed_at=new Date(f.T0+2000).toISOString();},nativeOptions(){return {ctx:{id:{toString:()=> 'synthetic-actor'}},env:nativeEnv,intentId:f.seed.intentId,sourceRevision:m.sourceRevision,fetchImpl,now:f.now,signal:new AbortController().signal};},async cli(){return api.runFiniteFinalizerCli({phase:'seed-material',env,read:async()=>JSON.stringify(event),write:async()=>{},fetchImpl,now:f.now});}};
+}

~~~~~~~~~~

## test/fixtures/finite-transport-native.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-transport-native.mjs b/test/fixtures/finite-transport-native.mjs
--- /dev/null
+++ b/test/fixtures/finite-transport-native.mjs
@@ -0,0 +1,52 @@
+import assert from 'node:assert/strict';
+import {native} from './finite-owner-native.mjs';
+const O='https://delegated-canary.agentfriendlyweb.dev',V='22222222-2222-4222-8222-222222222222',D='33333333-3333-4333-8333-333333333333';
+export async function setup(t,mode='normal',options={}){
+ let material,current,posts=0,uploads=0,latestV=V,latestD=D;const calls=[],requests=[],versions=new Map();
+ const envelope=result=>Response.json({success:true,errors:[],messages:[{code:10000,message:'SYNTHETIC informational',type:null}],result});
+ const f=await native(t,'normal',undefined,undefined,{...options,outbound:async request=>{
+  const url=new URL(request.url);calls.push({method:request.method,path:url.pathname,query:url.search});assert.equal(url.origin,'https://api.cloudflare.com');
+  const root='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/';
+  assert(request.headers.get('Authorization').startsWith('Bearer SYNTHETIC_'));
+  if(request.method==='POST'){
+   posts++;const body=await request.json();requests.push({method:request.method,url:request.url,body});
+   if(url.pathname===root+'workers/agent-friendly-web-delegated-canary/versions'){
+    assert.equal(url.search,'?deploy=false');
+    assert.equal(request.headers.get('Content-Type'),'application/json');
+    assert.deepEqual(body.containers,[{class_name:'AfwOwnEventNode'}]);
+    assert.equal(body.exports.AfwOwnEventNode.container,'agent-friendly-web-delegated-canary-afwowneventnode');
+    const secrets=body.bindings.filter(b=>b.type==='inherit');
+    assert.equal(secrets.length,2);for(const b of secrets)assert.deepEqual(Object.keys(b).sort(),['name','type','version_id']);
+    for(const b of secrets)assert.equal(b.version_id,current.versions[0].version_id);
+    uploads++;latestV=[V,'44444444-4444-4444-8444-444444444444','66666666-6666-4666-8666-666666666666','88888888-8888-4888-8888-888888888888'][uploads-1];latestD=[D,'55555555-5555-4555-8555-555555555555','77777777-7777-4777-8777-777777777777','99999999-9999-4999-8999-999999999999'][uploads-1];versions.set(latestV,body);if(mode==='lost')throw Error('SYNTHETIC lost upload ACK');
+    if(mode==='late')await new Promise(r=>setTimeout(r,6000));
+    if(mode==='not_found')return Response.json({success:false,errors:[{code:1000,message:'SYNTHETIC missing'}],result:null},{status:404});
+    return envelope({id:latestV,...(mode==='unexpected_reconciliation'?{exports_reconciliation:{created:['UNEXPECTED_SYNTHETIC_CONTAINER']}}:{})});
+   }
+   assert.equal(url.pathname,root+'scripts/agent-friendly-web-delegated-canary/deployments');
+   assert.deepEqual(body,{strategy:'percentage',versions:[{version_id:latestV,percentage:100}]});
+   current={id:latestD,strategy:'percentage',versions:[{version_id:latestV,percentage:100}]};return envelope(current);
+  }
+  if(url.pathname===root+'scripts/agent-friendly-web-delegated-canary/deployments')return envelope({deployments:[mode==='foreign'?{...current,id:D}:current]});
+  const id=url.pathname.split('/').at(-1),isNew=versions.has(id),version=versions.get(id),cfg=isNew?{...version,bindings:version.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b)}:material.configuration;
+  const {modules:unused,...configuration}=cfg;void unused;
+  if(mode==='wrong_secret'&&isNew)configuration.bindings=configuration.bindings.map(b=>b.type==='secret_text'?{...b,name:b.name+'_FOREIGN'}:b);
+  if(mode==='extra_binding'&&!isNew)configuration.bindings=[...configuration.bindings,{name:'UNAPPROVED',type:'plain_text',text:'x'}];
+  if(mode==='namespace'&&!isNew)configuration.bindings=configuration.bindings.map(b=>b.type==='durable_object_namespace'?{...b,namespace_id:'f'.repeat(32)}:b);
+  return envelope({id,...configuration,containers:configuration.containers.map(b=>({...b,name:'agent-friendly-web-delegated-canary-afwowneventnode'})),urls:[],modules:isNew?version.modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(material.script).toString('base64')}]});
+ }});
+ material=await f.json('/fixture/material',{});current={id:material.source.currentPublication.deploymentId,strategy:'percentage',versions:[{version_id:material.source.currentPublication.versionId,percentage:100}]};
+ if(mode==='held_claim')await f.json('/fixture/hold-claim',{});
+ if(mode==='held_source')await f.json('/fixture/hold-source',{});
+ const publish=async screen=>f.json('/fixture/publish',{url:O+'/connections/finite-prepare',headers:{'Cf-Access-Jwt-Assertion':f.token,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()});
+ // SYNTHETIC alternate qualified baseline for the competing-writer barrier test.
+ // No product source override and no journal/history mutation.
+ const separateSyntheticChoice=async()=>{
+  const currentPublication={stage:null,versionId:material.source.initialBaseline.versionId,deploymentId:material.source.initialBaseline.deploymentId,receiptHash:null};
+  await f.json('/fixture/source',{phase:'closed_ui',currentPublication});
+  material=await f.json('/fixture/material',{});
+  current={id:currentPublication.deploymentId,strategy:'percentage',versions:[{version_id:currentPublication.versionId,percentage:100}]};
+  return f.screen();
+ };
+ return {...f,publish,calls,requests,separateSyntheticChoice,posts:()=>posts};
+}
[Source lacks final newline: before=true, after=true; exact blob references control.]

~~~~~~~~~~

## test/fixtures/finite-v2.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-v2.mjs b/test/fixtures/finite-v2.mjs
--- /dev/null
+++ b/test/fixtures/finite-v2.mjs
@@ -0,0 +1,10 @@
+// Structural test fixtures only; synthetic modules do not claim historical bytes.
+export function v2Manifest(m){
+ m.purpose='afw.finite-native-package.v2';
+ const versions={qaClosed:'c570b60b-95dc-48e1-89f3-9c4651691dbc',canaryClosed:'2607abae-cec3-4e35-89eb-8b8572262b54',operatorClosed:'855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'};
+ for(const [role,d] of Object.entries(m.modules)){
+  if(d.provenance)continue;
+  const key={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'}[role];
+  m.modules[role]={provenance:key?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:key,versionId:versions[role]}:{kind:'compiled-source.v1',sourceRevision:m.sourceRevision,sourceTree:m.sourceTree},module:d.module,publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:d.configurationHash,profileHash:d.profileHash,bindingsHash:d.bindingsHash}};
+ }return m;
+}

~~~~~~~~~~

## test/fixtures/qa-finite-trial.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/qa-finite-trial.mjs b/test/fixtures/qa-finite-trial.mjs
--- /dev/null
+++ b/test/fixtures/qa-finite-trial.mjs
@@ -0,0 +1,67 @@
+import {finiteLauncherInstanceId} from '../../lib/mcp-qa-finite-launch-records.mjs';
+import {finiteCleanupPolicyHash} from '../../lib/mcp-finite-cleanup-policy.mjs';
+import {createHash} from 'node:crypto';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../../lib/mcp-qa-closed-context.mjs';
+import {generationFixture} from './qa-generation-ledger.mjs';
+export const hash=v=>createHash('sha256').update(v).digest('hex');
+export const ROOT='afw.qa-finite-trial.v1',HEAD=ROOT+':head';
+export const digest=(domain,v)=>hash(domain+'\n'+JSON.stringify(v));
+export function finiteFixture({at:override}={}){
+ const old=generationFixture();let at=override??old.now()+1000000;
+ const T0=at,N1=T0+300000,C0=N1-60000,C1=N1+120000,R1=N1+180000;
+ const version='11111111-1111-4111-8111-111111111111',actorId='a'.repeat(64);
+ const legacy=old.legacy;
+ const prepared={purpose:'afw.private-prepared-dispatch.v1',planHash:legacy.planHash,withdrawalHash:'1'.repeat(64),phase:'issued',issuedAt:legacy.armedAt+1000,completedAt:null,dispatchPolicyHash:'2'.repeat(64)};
+ const reduction={purpose:'afw.private-reduction-dispatch.v1',planHash:legacy.planHash,withdrawalHash:'1'.repeat(64),phase:'complete',issuedAt:legacy.armedAt+1000,completedAt:legacy.armedAt+2000};
+ const pin=n=>({versionId:version.replace(/^1/,String(n)),deploymentId:version.replace(/^1/,String(n+1)),configurationHash:String(n).repeat(64),module:{name:'worker.mjs',sha256:n===1?'d'.repeat(64):n===3?'0'.repeat(64):String(n).repeat(64),bytes:1024}});
+ const plan={
+ purpose:'afw.qa-finite-trial-plan.v1',intentId:'finite-test-001',
+ command:{kind:'finite_native_confirmation',id:'123',createdAt:T0,repository:'tokenizartinfo-ops/agent-friendly-web',sourceRevision:'b'.repeat(40)},
+ source:{revision:'b'.repeat(40),tree:'c'.repeat(40),moduleHash:'d'.repeat(64),profileHash:'e'.repeat(64),bindingsHash:'f'.repeat(64)},
+ trialId:'3'.repeat(64),grantHash:hash('current-grant'),monitorHash:'4'.repeat(64),eventPlanHash:'5'.repeat(64),bundleHash:'6'.repeat(64),
+ T0,N1,C0,C1,R1,
+ resources:{actorId,containerId:'7'.repeat(64),applicationId:'d6fc71552de7494a863aca20365a572d',namespaceId:'8'.repeat(32),qaD1Id:version,releaseD1Id:version.replace(/^1/,'2'),canaryActorId:'9'.repeat(64)},
+ deployments:{qaLive:{...pin(1),versionId:version},qaClosed:pin(2),canaryLive:pin(3),canaryClosed:pin(4),operatorClosed:pin(5)},
+ canaryContainment:{sourceRevision:'f'.repeat(40),runtimeVersionId:pin(3).versionId,moduleHash:'0'.repeat(64),profileHash:'1'.repeat(64),bindingsHash:'2'.repeat(64)},
+ selectors:{grantId:'current-grant',subject:'subject',projectId:'project',clientId:'client',resource:'https://fixed.invalid/mcp',consentHash:'a'.repeat(64),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),startAt:T0,expiresAt:N1,saveIdempotencyKey:'11111111-1111-4111-8111-111111111111',expectedProjectRevision:1,goal:'discovery'},
+ withdrawalPolicyHash:'1'.repeat(64),closePolicyHash:'2'.repeat(64),
+ launchPolicy:{armAckBy:T0+90000,launchAt:T0+150000,lastCreateAt:T0+160000},
+ workflows:{confirmation:'afw-release-'+'6'.repeat(64),bootstrap:'fixed-bootstrap',launcher:finiteLauncherInstanceId({intentId:'finite-test-001',sourceRevision:'b'.repeat(40)})},
+ finalizer:{repository:'tokenizartinfo-ops/agent-friendly-web',runId:11,attempt:1,jobId:12,workflow:'afw-finite-finalizer',sourceRevision:'b'.repeat(40),readyStep:'admit-and-ready'},
+ legacy:{control:JSON.stringify(legacy),controlHash:hash(JSON.stringify(legacy)),preparedDispatch:JSON.stringify(prepared),preparedDispatchHash:hash(JSON.stringify(prepared)),reductionDispatch:JSON.stringify(reduction),reductionDispatchHash:hash(JSON.stringify(reduction)),restoration:null,retirement:null,sourceRevision:'d'.repeat(40),sourceHash:'e'.repeat(64)}
+ };
+ plan.closePolicyHash=finiteCleanupPolicyHash(plan);
+ let alarm=null,transactions=0,puts=0,chain=Promise.resolve();
+ const rows=new Map([['afw.canary-restoration-control.v1',legacy],['afw.private-prepared-dispatch.v1',prepared],['afw.private-reduction-dispatch.v1',reduction]]),lost=new Set();
+ const storage={
+ get:async k=>structuredClone(rows.get(k)),
+ getAlarm:async()=>alarm,
+ transaction(fn){const p=chain.then(async()=>{
+  const n=++transactions,copy=new Map([...rows].map(([k,v])=>[k,structuredClone(v)]));let nextAlarm=alarm;
+  const result=await fn({get:async k=>structuredClone(copy.get(k)),put:async(k,v)=>{puts++;copy.set(k,structuredClone(v));},list:async({prefix,limit})=>new Map([...copy].filter(([k])=>k.startsWith(prefix)).slice(0,limit)),setAlarm:async v=>{nextAlarm=v;},getAlarm:async()=>nextAlarm});
+  rows.clear();for(const [k,v]of copy)rows.set(k,v);alarm=nextAlarm;if(lost.has(n))throw Error('lost ACK');return result;
+ });chain=p.catch(()=>{});return p;}
+ };
+ const namespace={idFromName:name=>({toString:()=>name==='afw-own-successor-closure-v1'?actorId:'0'.repeat(64)})};
+ const env={AFW_QA_VERSION:{id:version},AFW_INDEPENDENT_CLOSURE:namespace,RELEASE_DB:{},AFW_RELEASE_EVENTS_NODE:{},AFW_RELEASE_READ_TOKEN:'not-accessed'};
+ for(const k of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'])env[k]='true';
+ for(const k of PRIVATE_QA_CLOSED_FLAGS)env[k]='false';
+ const ctx={storage,id:{toString:()=>actorId}};
+ const eventId=hash(JSON.stringify(['afw.own-synthetic-save.v1',plan.selectors.subject,plan.selectors.projectId,plan.selectors.saveIdempotencyKey]));
+ const fingerprint=hash(JSON.stringify(['afw.own-synthetic-save.v1',plan.selectors.grantId,1,'discovery']));
+ const identity=()=>({intentId:plan.intentId,sourceRevision:plan.source.revision,runtimeVersionId:version,actorId:plan.resources.actorId,planHash:digest(plan.purpose,plan)});
+ const admission=()=>({purpose:'afw.qa-finite-primary.v1',...identity(),observedAt:at,command:structuredClone(plan.command),source:structuredClone(plan.source),resources:structuredClone(plan.resources),deployments:structuredClone(plan.deployments),legacyControlHash:plan.legacy.controlHash,legacyPreparedHash:plan.legacy.preparedDispatchHash,legacyReductionHash:plan.legacy.reductionDispatchHash,legacySourceHash:plan.legacy.sourceHash,retainedUncertainty:true,
+ containment:{entrypoint:'legacy_saved_event',finiteEntrypoint:'finite_trial_event',sourceRevision:plan.canaryContainment.sourceRevision,runtimeVersionId:plan.canaryContainment.runtimeVersionId,sourceHash:plan.canaryContainment.moduleHash,profileHash:plan.canaryContainment.profileHash,bindingsHash:plan.canaryContainment.bindingsHash,denyBeforeAccess:true,enteredWritersIsolated:true,signedPacketsFenced:true,separateLegacyWritersTerminal:true,legacyGrantRevoked:true,legacyMonitorExpired:true,evidenceHash:'1'.repeat(64)},
+ quiescence:{currentWriters:0,newScopeWriters:0,unresolvedWrites:0,completeInventory:true,inventoryHash:'2'.repeat(64),receiptsHash:'3'.repeat(64),snapshotHash:'4'.repeat(64)},
+ consent:{grantHash:plan.grantHash,monitorHash:plan.monitorHash,selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),valid:true,expiresAt:N1}});
+ const finalizer=()=>({purpose:'afw.qa-finite-finalizer-ready.v1',...identity(),observedAt:at,repository:plan.finalizer.repository,runId:11,attempt:1,sourceRevision:plan.source.revision,intentId:plan.intentId,workflow:plan.finalizer.workflow,status:'in_progress',job:{id:12,status:'in_progress',startedAt:T0,steps:[{name:'admit-and-ready',status:'completed',conclusion:'success',startedAt:T0,completedAt:T0}]},admission:{commandId:'123',controlPlanHash:identity().planHash,R1,resourceHash:digest('afw.qa-finite-resources.v1',plan.resources),custodyHash:'5'.repeat(64),validatedAt:T0},evidenceHash:'6'.repeat(64)});
+ const primary={admission:async()=>admission(),finalizer:async()=>finalizer(),subscription:async()=>null,process:async()=>null,savedEvent:async()=>null,effect:async()=>null};
+ const facts={
+ subscription:()=>({purpose:'afw.qa-finite-subscription.v1',...identity(),selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),observedAt:at,candidates:1,subscriptionId:'subscription',processGeneration:'generation',expiresAt:N1,receiptHash:'7'.repeat(64)}),
+ process:()=>({purpose:'afw.qa-finite-process.v1',...identity(),selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),observedAt:at,candidates:1,processGeneration:'generation',manifestHash:'8'.repeat(64),receiptHash:'9'.repeat(64)}),
+ saved_event:()=>({purpose:'afw.qa-finite-saved_event.v1',...identity(),selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),observedAt:at,candidates:1,eventId,revision:2,fingerprint,subscriptionReceiptHash:'7'.repeat(64),processReceiptHash:'9'.repeat(64),receiptHash:'a'.repeat(64)})
+ };
+ const f={plan,rows,storage,ctx,env,primary,facts,lost,admission,finalizer,now:()=>at,setNow:v=>{at=v;},get alarm(){return alarm;},setAlarm:v=>{alarm=v;},get puts(){return puts;},get transactions(){return transactions;}};
+ f.options=api=>({storage,nativePin:api.createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:plan.source.revision}),plan:JSON.stringify(plan),readPrimary:primary,now:f.now,timeoutMs:1000});
+ return f;
+}

~~~~~~~~~~

## test/mcp-finite-activation-compatibility.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-finite-activation-compatibility.test.mjs b/test/mcp-finite-activation-compatibility.test.mjs
--- /dev/null
+++ b/test/mcp-finite-activation-compatibility.test.mjs
@@ -0,0 +1,54 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import * as activation from '../lib/mcp-activation-observer.mjs';
+
+const LEGACY_GOLDEN='b35fa92f070cde9b87142997c223c5a3067c702fc594c435a9164f50bbee4f33';
+const legacy=()=>({compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'TOKEN',type:'secret_text'},{name:'ENABLED',type:'plain_text',text:'true'},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'b'.repeat(32),class_name:'AfwOwnEventNode'}],usage_model:'standard',containers:[]});
+const finite=()=>({...legacy(),compatibility_flags:['nodejs_compat','global_fetch_strictly_public','enable_request_signal']});
+const canonical=value=>JSON.stringify(value,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
+const independent=value=>createHash('sha256').update(canonical({...value,bindings:[...value.bindings].sort((a,b)=>a.name.localeCompare(b.name))})).digest('hex');
+const copy=value=>structuredClone(value);
+const ids={versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',namespaceId:'b'.repeat(32),applicationId:'app'};
+async function observe(configuration,make,actual=configuration){
+ const script='export default {}',workerHash=createHash('sha256').update(script).digest('hex'),etag='c'.repeat(64),calls=[];
+ const fetchImpl=async(url,init)=>{calls.push(url);assert.equal(init.method,'GET');let result;
+  if(url.endsWith('/deployments'))result={deployments:[{id:ids.deploymentId,strategy:'percentage',versions:[{version_id:ids.versionId,percentage:100}]}]};
+  else if(url.includes('/containers/'))result={id:ids.applicationId,account_id:'a'.repeat(32),scheduling_policy:'durable_object',durable_objects:{namespace_id:ids.namespaceId}};
+  else if(url.includes('/scripts/'))result={id:ids.versionId,resources:{script:{etag},bindings:actual.bindings}};
+  else result={id:ids.versionId,...actual,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]};
+  return Response.json({success:true,errors:[],result});
+ };
+ const fn=make({...ids,configuration,readCredential:async()=>'synthetic_read_only_token',fetchImpl});
+ const input={accountId:'a'.repeat(32),workerName:'agent-friendly-web-delegated-canary',workerHash,configurationHash:independent(configuration),sourceRevision:'e'.repeat(40),programHash:'f'.repeat(64),scopeHash:'d'.repeat(64)};
+ return {run:()=>fn(input,new AbortController().signal),calls};
+}
+test('legacy_pair_digest_and_positive_observer_preserved',async()=>{
+ const value=legacy();assert.equal(independent(value),LEGACY_GOLDEN);assert.equal(activation.activationConfigurationHash(value),LEGACY_GOLDEN);
+ const {run,calls}=await observe(value,activation.createActivationObserver);
+ assert.equal((await run()).configurationHash,independent(value));assert.equal(calls.length,7);
+});
+test('finite_triple_hashes_actual_flags',()=>{
+ const value=finite(),before=copy(value),expected=independent(value);
+ assert.equal(activation.finiteActivationConfigurationHash(value),expected);
+ assert.notEqual(expected,independent(legacy()));assert.deepEqual(value,before);
+});
+test('profiles_reject_each_other',async()=>{
+ assert.throws(()=>activation.activationConfigurationHash(finite()));
+ assert.throws(()=>activation.finiteActivationConfigurationHash(legacy()));
+ assert.throws(()=>activation.createActivationObserver({...ids,configuration:finite(),readCredential:async()=>'',fetchImpl:async()=>{}}));
+ assert.throws(()=>activation.createFiniteActivationObserver({...ids,configuration:legacy(),readCredential:async()=>'',fetchImpl:async()=>{}}));
+});
+test('exact_flags_date_and_plain_data',()=>{
+ const value=finite();
+ for(const flags of [[],['nodejs_compat','global_fetch_strictly_public'],['nodejs_compat','enable_request_signal','global_fetch_strictly_public'],['nodejs_compat','global_fetch_strictly_public','enable_request_signal','other'],['nodejs_compat','global_fetch_strictly_public','other']])assert.throws(()=>activation.finiteActivationConfigurationHash({...value,compatibility_flags:flags}));
+ assert.throws(()=>activation.finiteActivationConfigurationHash({...value,compatibility_date:'2026-09-08'}));
+ assert.throws(()=>activation.finiteActivationConfigurationHash({...value,bindings:[{name:'TOKEN',type:'secret_text',text:'sensitive'}]}));
+ let invoked=false;const accessor=Object.defineProperty({...value},'bindings',{get(){invoked=true;return value.bindings},enumerable:true});
+ assert.throws(()=>activation.finiteActivationConfigurationHash(accessor));assert.equal(invoked,false);
+});
+test('finite_observer_checks_approved_and_observed_profile',async()=>{
+ const value=finite(),{run,calls}=await observe(value,activation.createFiniteActivationObserver);
+ assert.equal((await run()).configurationHash,independent(value));assert.equal(calls.length,7);
+ const wrong=await observe(value,activation.createFiniteActivationObserver,legacy());await assert.rejects(wrong.run());assert.ok(wrong.calls.length>0);
+});

~~~~~~~~~~

## test/mcp-finite-cleanup-readiness.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-finite-cleanup-readiness.test.mjs b/test/mcp-finite-cleanup-readiness.test.mjs
--- /dev/null
+++ b/test/mcp-finite-cleanup-readiness.test.mjs
@@ -0,0 +1,24 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createFiniteNativeCleanupProofProducer} from '../lib/mcp-own-finite-cleanup-proof.mjs';
+import {createPrivateQaFiniteCleanupProofCollector} from '../lib/mcp-qa-finite-cleanup-collector.mjs';
+import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
+import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
+test('readiness waits for stop without spending the sole native challenge',async()=>{
+ const f=finiteProofFixture(),rows=new Map();let stopped=false,claims=0;
+ const storage={transaction:async fn=>fn({get:async k=>rows.get(k),put:async(k,v)=>{claims++;rows.set(k,v);}})};
+ const producer=createFiniteNativeCleanupProofProducer({storage,control:f.control,gate:{read:async()=>f.support.gate},primaryRead:async()=>f.support.primary,providerRead:async()=>{if(!stopped)throw Error('synthetic provider still running');return {...f.support.providerAfter,observedAt:f.support.primary.observedAt};},retirementRead:async()=>{throw Error('no admission');},now:f.now});
+ assert.equal(typeof producer.ready,'function');
+ assert.equal((await producer.ready()).status,'not_yet_observed');assert.equal(claims,0);
+ stopped=true;assert.equal((await producer.ready()).status,'ready_for_capture');assert.equal(claims,0);
+ const result=await producer.observe({intentId:f.control.plan.intentId,planHash:f.control.planHash,proofChallenge:f.expectedChallenge});
+ assert.equal(claims,1);assert.equal(result.proof.evidenceHash,finiteHash({proofChallenge:f.expectedChallenge,sealHash:result.proof.sealHash,support:result.support}));
+ await assert.rejects(()=>producer.observe({intentId:f.control.plan.intentId,planHash:f.control.planHash,proofChallenge:'3'.repeat(64)}));assert.equal(claims,1);
+});
+test('collector waits without calling capture and rejects malformed readiness time',async()=>{
+ const f=finiteProofFixture();let capture=0,ready=false;
+ const control={identity:f.control,read:async()=>({status:'not_yet_observed'}),capture:async()=>{capture++;throw Error('unexpected capture');}};
+ const nativeProof={ready:async()=>ready?{status:'ready_for_capture',intentId:f.control.plan.intentId,controlHash:f.control.controlHash,sourceRevision:f.control.plan.canaryContainment.sourceRevision,runtimeVersionId:f.control.plan.canaryContainment.runtimeVersionId,observedAt:undefined}:{status:'not_yet_observed'},observe:async()=>{throw Error('unexpected observe');}};
+ const collector=createPrivateQaFiniteCleanupProofCollector({control,nativeProof,primaryRead:async()=>null,providerRead:async()=>null,now:f.now});
+ assert.equal((await collector.read()).status,'not_yet_observed');assert.equal(capture,0);ready=true;await assert.rejects(()=>collector.read());assert.equal(capture,0);
+});

~~~~~~~~~~

## test/mcp-finite-named-activation.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-finite-named-activation.test.mjs b/test/mcp-finite-named-activation.test.mjs
--- /dev/null
+++ b/test/mcp-finite-named-activation.test.mjs
@@ -0,0 +1,42 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import * as policy from '../lib/mcp-release-operator-policy.mjs';
+import {activationConfigurationHash,finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
+
+const hash=s=>createHash('sha256').update(s).digest('hex');
+function fixture(){
+ const t=policy.RELEASE_TARGET,script='export default {}',window={startAt:1000,expiresAt:601000};
+ const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
+ const plan={activationKey:'d'.repeat(64),artifactKey:hash(JSON.stringify([t.accountId,t.workerName,artifact.workerHash])),trialId:'e'.repeat(64),configurationHash:'',...window};
+ const manifest={scope:{accountId:t.accountId,workerName:t.workerName,namespaceId:t.namespaceId,applicationId:t.namespaceId,ownerRef:'1'.repeat(64),projectRef:'2'.repeat(64),resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'},original:{containerId:'3'.repeat(64),applicationId:t.namespaceId,programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40)},candidate:{trialId:plan.trialId,programHash:artifact.programHash,sourceRevision:artifact.sourceRevision,...window,budget:1},publication:{artifactKey:plan.artifactKey,workerHash:artifact.workerHash,activationKey:plan.activationKey}};
+ const eventPolicy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:manifest.scope.resource,...window};
+ const bindings=[{name:'DB',type:'d1',id:t.databaseId},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:t.kvId},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:t.namespaceId,class_name:'AfwOwnEventNode'},...Object.entries({AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify(manifest),AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(eventPolicy),AFW_OAUTH_ISSUER:manifest.scope.resource.slice(0,-4),AFW_OAUTH_RESOURCE:manifest.scope.resource,AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_OAUTH_PILOT_CLIENT_ID:'client'}).map(([name,text])=>({name,type:'plain_text',text}))];
+ const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public','enable_request_signal'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings,usage_model:'standard',containers:[]};
+ plan.configurationHash=finiteActivationConfigurationHash(configuration);
+ const bundle={artifact,policy:{operation:'confirm_named',...window,plan,observation:{versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',namespaceId:t.namespaceId,applicationId:t.namespaceId,configuration}}};
+ let gets=0;const namespace={idFromName:name=>({toString:()=>name==='afw-own-event-one-occurrence-v1'?'3'.repeat(64):'6'.repeat(64)}),idFromString:id=>({toString:()=>id}),get(){gets++;throw Error('No IO');}};
+ return {bundle,manifest,namespace,gets:()=>gets,update(){bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text=JSON.stringify(manifest);plan.configurationHash=finiteActivationConfigurationHash(configuration)}};
+}
+const history=(grant='g')=>JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:grant,consentSequence:1,consentRevision:1,issuedAt:1000,expiresAt:601000},cancellations:[]});
+test('finite_named_plan_and_history_positive',()=>{
+ const f=fixture(),before=structuredClone(f.bundle);assert.equal(policy.validateFiniteReleaseOperatorBundle(f.bundle),true);
+ const resolved=policy.resolveFiniteNamedActivationPlan(f.bundle,f.namespace);assert.ok(Object.isFrozen(resolved));assert.equal(typeof resolved.plan.scopeHash,'string');resolved.current();
+ assert.equal(policy.validateFiniteNamedCancellationHistory(f.bundle,history()),true);assert.deepEqual(f.bundle,before);assert.equal(f.gets(),0);
+});
+test('finite_bundle_requires_confirm_named',()=>{
+ const f=fixture();
+ const publish={artifact:f.bundle.artifact,policy:{operation:'publish',startAt:1000,expiresAt:601000,pins:{...policy.RELEASE_TARGET,baseVersionId:'33333333-3333-4333-8333-333333333333'}}};
+ assert.equal(policy.validateReleaseOperatorBundle(publish),true);assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(publish));
+ const confirm={...f.bundle,policy:{...f.bundle.policy,operation:'confirm',plan:{...f.bundle.policy.plan,scopeHash:'f'.repeat(64)}}};
+ assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(confirm));
+ const old=structuredClone(f.bundle);old.policy.observation.configuration.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];old.policy.plan.configurationHash=activationConfigurationHash(old.policy.observation.configuration);
+ assert.equal(policy.validateReleaseOperatorBundle(old),true);assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(old),{message:'Release operator plan unavailable'});assert.throws(()=>policy.validateReleaseOperatorBundle(f.bundle));
+});
+test('finite_private_binding_and_current_grant_correlated',()=>{
+ const f=fixture(),original=f.bundle.policy.plan.configurationHash;
+ f.bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_ENABLED').text='false';f.update();
+ assert.notEqual(f.bundle.policy.plan.configurationHash,original);assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(f.bundle));assert.equal(f.gets(),0);
+ const g=fixture();assert.throws(()=>policy.validateFiniteNamedCancellationHistory(g.bundle,history('other')));assert.equal(g.gets(),0);
+ const r=policy.resolveFiniteNamedActivationPlan(g.bundle,g.namespace);g.namespace.idFromName=()=>({toString:()=> '7'.repeat(64)});assert.throws(()=>r.current());assert.equal(g.gets(),0);
+});

~~~~~~~~~~

## test/mcp-finite-nominal-control.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-finite-nominal-control.test.mjs b/test/mcp-finite-nominal-control.test.mjs
--- /dev/null
+++ b/test/mcp-finite-nominal-control.test.mjs
@@ -0,0 +1,69 @@
+import {finiteAdmissionIdentity} from '../lib/mcp-own-finite-cleanup-proof.mjs';
+import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
+import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createFiniteAdmissionGate} from '../lib/mcp-own-finite-admission-gate.mjs';
+import {finiteGateFixture} from './fixtures/finite-admission-gate.mjs';
+import {nominalFixture} from './fixtures/finite-nominal-control.mjs';
+import * as controlApi from '../lib/mcp-qa-finite-trial-control.mjs';
+import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
+test('only actual issued nominal claim permits children after nominalEligible is spent',async()=>{
+ const f=finiteFixture(),ctl=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));
+ await ctl.prepare();assert.equal((await ctl.readNominalControl()).status,'blocked');
+ const issued=await ctl.claimEffect('nominal');assert.equal(issued.status,'issued');assert.equal((await ctl.read()).nominalEligible,false);
+ const view=await ctl.readNominalControl();assert.equal(view.status,'observed');assert.deepEqual(view.value.claim,issued.claim);
+ const rebuilt=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));assert.equal((await rebuilt.readNominalControl()).status,'observed');
+ await ctl.withdrawNominal();assert.equal((await rebuilt.readNominalControl()).status,'blocked');
+});
+for(const mode of ['pending','missing_claim','withdrawn','wrong_source','expiry','narrow_consent','held_read']){
+ test('every finite begin rejects '+mode+' while seal remains available',async()=>{
+  const f=finiteGateFixture(),q=nominalFixture(f.identity);let reads=0;
+  const read=async()=>{reads++;const v=structuredClone(q.value);
+   if(mode==='pending')v.phase='pending';if(mode==='missing_claim')v.claim=null;if(mode==='withdrawn')v.withdrawnAt=f.identity.T0;
+   if(mode==='wrong_source')v.sourceRevision='f'.repeat(40);if(mode==='expiry')f.setTime(f.identity.N1);
+   if(mode==='narrow_consent')v.consent.expiresAt=f.identity.T0;
+   if(mode==='held_read'&&reads===2)f.setTime(f.identity.N1);
+   return v;
+  };
+  const gate=createFiniteAdmissionGate({...f.options,readNominalControl:read,nominalIdentity:q.nominalIdentity});
+  for(const kind of ['Reservation','Admission','Launch'])assert.equal((await gate['begin'+kind]()).status,'blocked');
+  assert.equal((await gate.read()).unresolvedWriters,0);assert.equal((await gate.seal()).status,'sealed');
+ });
+}
+
+test('child primary permits exact pending own admission, rejects identical counts for another writer',async()=>{
+ const f=finiteFixture();let nativeJournal,writers;
+ f.primary.nominal=async()=>{const primary=f.admission();primary.quiescence={currentWriters:1,newScopeWriters:1,unresolvedWrites:1,completeInventory:true,inventoryHash:finiteHash(writers),receiptsHash:finiteHash(nativeJournal),snapshotHash:'1'.repeat(64)};return {purpose:'afw.qa-finite-child-primary.v1',primary,nativeJournal,writers};};
+ const ctl=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));const armed=await ctl.prepare();await ctl.claimEffect('nominal');
+ const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash}),g=structuredClone(proof.support.gate),p=f.plan;
+ g.sealed=false;g.seal=null;g.sealHash=null;
+ const claim={purpose:'afw.own-finite-admission.v1:writer',identityHash:g.identityHash,kind:'admission',issuedAt:p.T0,deadline:p.N1};
+ g.writers.admission={claim,settlement:null};g.unresolvedWriters=1;nativeJournal=g;
+ const own={intentId:p.intentId,controlHash:armed.controlHash,actorId:p.resources.containerId,kind:'admission',claimHash:finiteHash(claim),phase:'issued',current:true,newScope:true,unresolved:true};writers=[own];
+ assert.equal((await ctl.readNominalControl()).status,'observed');
+ for(const patch of [{actorId:'f'.repeat(64)},{controlHash:'f'.repeat(64)},{kind:'launch'},{claimHash:'f'.repeat(64)},{phase:'unknown'}]){
+  writers=[{...own,...patch}];assert.equal((await ctl.readNominalControl()).status,'blocked');
+ }
+ writers=[own,{...own,kind:'launch'}];assert.equal((await ctl.readNominalControl()).status,'blocked');
+});
+test('candidate independently matches child exclusions against its own exact journal',async()=>{
+ const f=finiteGateFixture(),g=createFiniteAdmissionGate(f.options);assert.equal((await g.beginAdmission()).status,'issued');
+ assert.equal((await g.beginLaunch()).status,'issued');
+ const h=finiteGateFixture(),base=h.options.readNominalControl;
+ h.options.readNominalControl=async()=>{const v=await base();return {...v,ownedWriters:v.ownedWriters.map(x=>({...x,actorId:'f'.repeat(64)}))};};
+ const other=createFiniteAdmissionGate(h.options);assert.equal((await other.beginAdmission()).status,'issued');assert.equal((await other.beginLaunch()).status,'blocked');
+ assert.equal((await other.read()).writers.launch,null);
+});
+
+test('actual Task1 narrower observed consent claim admits before its deadline and never extends it',async()=>{
+ const f=finiteFixture(),original=f.primary.admission,end=f.plan.T0+250000;
+ f.primary.admission=async()=>{const p=await original();p.consent.expiresAt=end;return p;};
+ const ctl=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));const armed=await ctl.prepare();assert.equal(armed.status,'armed');
+ const claim=await ctl.claimEffect('nominal');assert.equal(claim.claim.deadline,end);assert.ok(end<f.plan.selectors.expiresAt);
+ const identity=finiteAdmissionIdentity({plan:f.plan,planHash:armed.planHash,controlHash:armed.controlHash}),g=finiteGateFixture(f.plan.T0);
+ const gate=createFiniteAdmissionGate({...g.options,identity,nominalIdentity:{sourceRevision:f.plan.source.revision,runtimeVersionId:f.plan.deployments.qaLive.versionId,actorId:f.plan.resources.actorId,monitorHash:f.plan.monitorHash,consentExpiresAt:f.plan.selectors.expiresAt},readNominalControl:async()=>(await ctl.readNominalControl()).value,now:f.now});
+ const begun=await gate.beginReservation();assert.equal(begun.status,'issued');assert.equal(begun.claim.deadline,end);const before=JSON.stringify([...g.rows]);
+ f.setNow(end);assert.equal((await gate.beginAdmission()).status,'blocked');assert.equal(JSON.stringify([...g.rows]),before);
+ assert.equal((await gate.read()).writers.admission,null);
+});

~~~~~~~~~~

## test/mcp-own-finite-admission-gate.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-finite-admission-gate.test.mjs b/test/mcp-own-finite-admission-gate.test.mjs
--- /dev/null
+++ b/test/mcp-own-finite-admission-gate.test.mjs
@@ -0,0 +1,61 @@
+import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
+import {nominalFixture} from './fixtures/finite-nominal-control.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+const api=await import('../lib/mcp-own-finite-admission-gate.mjs').catch(()=>({}));
+function fixture(){
+ let at=1000,alarm=null,chain=Promise.resolve(),lost=false;
+ const rows=new Map();
+ const storage={get:async k=>structuredClone(rows.get(k)),transaction(fn){const work=chain.then(async()=>{const copy=new Map(rows);const result=await fn({get:async k=>structuredClone(copy.get(k)),put:async(k,v)=>copy.set(k,structuredClone(v)),list:async({prefix})=>new Map([...copy].filter(([k])=>k.startsWith(prefix))),setAlarm:async v=>{alarm=v;}});rows.clear();for(const [k,v]of copy)rows.set(k,v);if(lost){lost=false;throw Error('lost ACK');}return result;});chain=work.catch(()=>{});return work;}};
+ const identity={intentId:'finite-1',controlHash:'1'.repeat(64),planHash:'2'.repeat(64),containerId:'3'.repeat(64),applicationId:'d6fc71552de7494a863aca20365a572d',grantHash:'4'.repeat(64),trialId:'5'.repeat(64),sourceRevision:'6'.repeat(40),runtimeVersionId:'22222222-2222-4222-8222-222222222222',T0:1000,N1:301000,C1:421000};
+ const primary={reservation:async()=>null,admission:async()=>null,launch:async()=>null};
+ const nominal=nominalFixture(identity);const options={storage,identity,readPrimary:primary,readNominalControl:async()=>({...nominal.value,observedAt:at,ownedWriters:['reservation','admission','launch'].filter(k=>rows.get('afw.own-finite-admission.v1:head')?.writers[k]).map(kind=>{const w=rows.get('afw.own-finite-admission.v1:head').writers[kind];return {intentId:identity.intentId,controlHash:identity.controlHash,actorId:identity.containerId,kind,claimHash:finiteHash(w.claim),phase:w.settlement===null?'issued':'settled'};})}),nominalIdentity:nominal.nominalIdentity,now:()=>at,timeoutMs:1000};
+ return {options,identity,primary,rows,setTime:v=>{at=v;},lose:()=>{lost=true;},get alarm(){return alarm;}};
+}
+test('finite gate factory required',()=>assert.equal(typeof api.createFiniteAdmissionGate,'function'));
+test('seal persists independently and blocks every new fixed writer after reconstruction',async()=>{
+ const f=fixture(),g=api.createFiniteAdmissionGate(f.options);
+ assert.equal((await g.seal()).status,'sealed');
+ for(const k of ['beginReservation','beginAdmission','beginLaunch'])assert.equal((await g[k]()).status,'blocked');
+ const rebuilt=api.createFiniteAdmissionGate(f.options);assert.equal((await rebuilt.read()).sealed,true);
+ assert.equal((await rebuilt.beginAdmission()).status,'blocked');
+});
+test('issued reservation remains unresolved across seal, reconstruction and empty primary',async()=>{
+ const f=fixture(),g=api.createFiniteAdmissionGate(f.options);
+ assert.equal((await g.beginReservation()).status,'issued');assert.equal((await g.beginReservation()).status,'reconcile_only');
+ await g.seal();assert.equal((await g.settleReservation()).status,'admin_pending');
+ const read=await api.createFiniteAdmissionGate(f.options).read();assert.equal(read.unresolvedWriters,1);assert.equal(read.launchNeverIssued,true);
+});
+test('launch marker is durable before runtime can be called and never becomes never-issued',async()=>{
+ const f=fixture(),g=api.createFiniteAdmissionGate(f.options);
+ assert.equal((await g.beginLaunch()).status,'issued');await g.seal();
+ assert.equal((await g.read()).launchNeverIssued,false);
+});
+test('lost seal ACK cannot authorize no-admission without independent exact readback',async()=>{
+ const f=fixture(),g=api.createFiniteAdmissionGate(f.options);f.lose();
+ assert.equal((await g.seal()).status,'uncertain');
+ assert.equal((await g.read()).sealed,true);assert.equal((await g.seal()).status,'reconcile_only');
+});
+test('original deadlines reject first effect, preserve claims and permit read only recovery',async()=>{
+ const f=fixture(),g=api.createFiniteAdmissionGate(f.options);await g.beginAdmission();
+ f.setTime(f.identity.N1);assert.equal((await g.beginLaunch()).status,'blocked');
+ f.setTime(f.identity.C1);assert.equal((await g.seal()).status,'blocked');
+ assert.equal((await g.read()).unresolvedWriters,1);
+});
+test('constructor rejects replacement intent and never resets retained gate',async()=>{
+ const f=fixture();await api.createFiniteAdmissionGate(f.options).seal();
+ const options={...f.options,identity:{...f.identity,intentId:'replacement'}};
+ assert.equal((await api.createFiniteAdmissionGate(options).read()).status,'blocked');
+});
+
+test('narrow writer deadline survives reconstruction while settlement keeps original C1',async()=>{
+ const {finiteWriterFixture}=await import('./fixtures/finite-admission-gate.mjs');let at=1000;
+ const f=finiteWriterFixture({now:()=>at,deadline:2000});
+ f.primary.reservation=async({identityHash,claimHash})=>({purpose:'afw.own-finite-admission.v1:settled',identityHash,kind:'reservation',claimHash,primaryRowHash:'a'.repeat(64),settledAt:at});
+ const g=api.createFiniteAdmissionGate(f.options),begun=await g.beginReservation();
+ assert.equal(begun.status,'issued');assert.equal(begun.claim.deadline,2000);
+ at=2000;const restored=api.createFiniteAdmissionGate(f.options);assert.equal((await restored.beginLaunch()).status,'blocked');
+ assert.equal((await restored.read()).writers.reservation.claim.deadline,2000);
+ assert.equal((await restored.settleReservation()).status,'settled');
+ assert.equal((await restored.read()).unresolvedWriters,0);
+});

~~~~~~~~~~

## test/mcp-own-finite-cleanup-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-finite-cleanup-native.test.mjs b/test/mcp-own-finite-cleanup-native.test.mjs
--- /dev/null
+++ b/test/mcp-own-finite-cleanup-native.test.mjs
@@ -0,0 +1,77 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFileSync} from 'node:fs';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+// Actual workerd DO SQLite + D1 tables + inherited fixed native RPC methods.
+// Synthetic provider, custody reader, source/version tuple and persisted clock.
+// No deployed profile, new grant, live Container or physical stop is asserted.
+test('native finite seal survives restart and accounts for every held writer',async()=>{
+ const schemas=['dossier-node-process.sql','dossier-successor-reservation.sql','dossier-successor-launch.sql'].flatMap(file=>[...readFileSync('db/'+file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]));
+ const contents=`
+ import {AfwOwnEventNode} from './worker/mcp-own/index.mjs';
+ import {createFiniteOwnNativeCleanupHost,installFiniteOwnNativeCleanupFactory} from './lib/mcp-own-finite-cleanup-host.mjs';
+ import {nominalFixture} from './test/fixtures/finite-nominal-control.mjs';
+ import {finiteAdmissionIdentity} from './lib/mcp-own-finite-cleanup-proof.mjs';
+ import {finiteFixture,digest} from './test/fixtures/qa-finite-trial.mjs';
+ async function make(ctx,env){
+  const f=finiteFixture({at:Number(env.T0)}),p=f.plan;p.resources.containerId=env.AFW_DOSSIER_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString();
+  const clock=await ctx.storage.get('fixture:clock')??p.T0;
+  const control={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)};
+  const nominal=nominalFixture(finiteAdmissionIdentity(control),{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:p.selectors.expiresAt},clock);
+  const options={ctx,env,control,readNominalControl:async()=>nominal.value,sourceRevision:p.canaryContainment.sourceRevision,now:()=>clock,providerRead:async()=>({purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:clock,instances:[],totalCount:0}),readCustody:async()=>{throw Error('synthetic absent custody');},readInstance:async()=>{throw Error('synthetic absent instance');}};
+  return createFiniteOwnNativeCleanupHost(options);
+ }
+ installFiniteOwnNativeCleanupFactory(({ctx,env})=>make(ctx,env));
+ export class Native extends AfwOwnEventNode {
+  async fixture(method,value){
+   if(method==='clock'){await this.ctx.storage.put('fixture:clock',value);return {};}
+   const h=await make(this.ctx,this.env),c=h.identity,refs={intentId:c.plan.intentId,planHash:c.planHash};
+   if(method==='begin')return h.gate['begin'+value]();
+   if(method==='seal')return this.sealFiniteTrialAdmission(refs);
+   if(method==='read')return h.gate.read();
+   if(method==='ready')return this.readFiniteTrialCleanupReadiness(refs);
+   if(method==='proof')return this.observeFiniteTrialCleanup({...refs,proofChallenge:'2'.repeat(64)});
+   if(method==='badshape')return this.sealFiniteTrialAdmission({...refs,proofChallenge:'2'.repeat(64)});
+   if(method==='reservation'){
+    const p=c.plan,at=p.T0;
+    await this.env.DB.prepare('INSERT INTO dossier_successor_reservations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('afw.own-successor.v1',p.trialId,'e'.repeat(64),'d'.repeat(64),p.selectors.programHash,p.selectors.sourceRevision,p.resources.applicationId,p.resources.containerId,p.selectors.programHash,p.selectors.sourceRevision,'a'.repeat(64),p.selectors.startAt,p.selectors.expiresAt,1,at,at,at,at,'prepared').run();return {};
+   }
+   if(method==='admission'){
+    const p=c.plan,s=p.selectors;
+    await this.env.DB.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(s.grantId,s.projectId,s.subject,s.clientId,s.resource,1,p.T0,s.expiresAt,p.resources.containerId,'8'.repeat(64),s.programHash,s.sourceRevision,'cloudflare/debian-trixie',p.T0,s.expiresAt).run();return {};
+   }
+   if(method==='settle')return this.settleFiniteTrialReservation({intentId:c.plan.intentId,controlHash:c.controlHash});
+   throw Error('fixture');
+  }
+ }
+ export default {async fetch(r,e){const x=await r.json();
+  if(x.method==='seed'){
+   await e.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
+   const f=finiteFixture({at:Number(e.T0)}),p=f.plan,s=p.selectors;
+   await e.DB.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind(s.projectId,s.subject,1).run();
+   await e.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind(s.grantId,s.subject,s.clientId,s.projectId,s.resource,'[]',new Date(s.expiresAt).toISOString(),'').run();
+   for(const sql of ${JSON.stringify(schemas)})await e.DB.prepare(sql).run();return Response.json({});}
+  const stub=e.AFW_DOSSIER_EVENTS_NODE.get(e.AFW_DOSSIER_EVENTS_NODE.idFromName(x.actor??'afw-own-event-first-successor-v1'));
+  try{return Response.json(await stub.fixture(x.method,x.value));}catch{return Response.json({status:'denied'},{status:409});}
+ }};
+ `;
+ const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
+ for(const mode of ['none','Reservation','Admission','Launch','reservation_settled','reservation_late','admission_late']){
+  const T0=Date.now(),options=rev=>convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(T0),REV:rev,AFW_FINITE_TRIAL_VERSION:{id:'31111111-1111-4111-8111-111111111111'}},durableObjects:{AFW_DOSSIER_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'finite-native-'+mode}},d1Databases:{DB:'finite-db-'+mode}});
+  const mf=new Miniflare(options('first'));
+  const call=async(method,value,status=200,actor)=>{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({method,value,actor})});assert.equal(r.status,status);return r.json();};
+  try{
+   await call('seed');if(mode!=='none')assert.equal((await call('begin',mode.startsWith('reservation_')?'Reservation':mode==='admission_late'?'Admission':mode)).status,'issued');
+   if(mode==='reservation_settled'){await call('reservation');assert.equal((await call('settle')).status,'settled');}
+   await call('clock',T0+240003);assert.equal((await call('seal')).status,'sealed');
+   await call('badshape',null,409);await call('read',null,409,'wrong-actor');
+   await mf.setOptions(options('recreated'));assert.equal((await call('read')).sealed,true);
+   assert.equal((await call('begin','Reservation')).status,mode==='Reservation'||mode.startsWith('reservation_')?'reconcile_only':'blocked');
+   if(mode==='none'||mode==='reservation_settled'){assert.equal((await call('ready')).status,'ready_for_capture');assert.equal((await call('proof')).proof.kind,'sealed_without_admission');await call('proof',null,409);}
+   else {assert.equal((await call('ready')).status,'not_yet_observed');
+    if(mode==='admission_late'){await call('admission');assert.equal((await call('ready')).status,'not_yet_observed');}
+    if(mode==='reservation_late'){await call('reservation');assert.equal((await call('ready')).status,'not_yet_observed');assert.equal((await call('settle')).status,'settled');assert.equal((await call('ready')).status,'ready_for_capture');assert.equal((await call('proof')).proof.kind,'sealed_without_admission');continue;}assert.equal((await call('read')).unresolvedWriters,1);assert.ok(['admin_pending','blocked'].includes((await call('settle')).status));}
+  }finally{await mf.dispose();}
+ }
+});

~~~~~~~~~~

## test/mcp-own-finite-cleanup-proof.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-finite-cleanup-proof.test.mjs b/test/mcp-own-finite-cleanup-proof.test.mjs
--- /dev/null
+++ b/test/mcp-own-finite-cleanup-proof.test.mjs
@@ -0,0 +1,51 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {finiteFixture,digest} from './fixtures/qa-finite-trial.mjs';
+const api=await import('../lib/mcp-own-finite-cleanup-proof.mjs').catch(()=>({}));
+const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
+function fixture(){
+ const f=finiteFixture(),p=f.plan,c={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)};
+ const identity={intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,T0:p.T0,N1:p.N1,C1:p.C1};
+ const identityHash=hash({purpose:'afw.own-finite-admission.v1',identity}),seal={purpose:'afw.own-finite-admission.v1:seal',identityHash,sealedAt:p.C0};
+ const gate={status:'observed',identity,identityHash,sealed:true,seal,sealHash:hash(seal),writers:{reservation:null,admission:null,launch:null},unresolvedWriters:0,launchNeverIssued:true,authorizesEffects:false,operationalReadiness:false};
+ const primary={purpose:'afw.finite-primary-snapshot.v1',intentId:p.intentId,controlHash:c.controlHash,observedAt:p.C0+1,reservationHash:null,admissionHash:null,launchHash:null,closureHash:null,processGeneration:null};
+ const provider=at=>({purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:at,instances:[],totalCount:0});
+ const support={gate,primary,providerBefore:provider(p.C0),providerAfter:provider(p.C0+2)};
+ const proof={purpose:'afw.finite-trial-cleanup-proof.v1',kind:'sealed_without_admission',intentId:p.intentId,planHash:c.planHash,controlHash:c.controlHash,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sealHash:gate.sealHash,proofChallenge:'2'.repeat(64),observedAt:p.C0+3,evidenceHash:hash({proofChallenge:'2'.repeat(64),sealHash:gate.sealHash,support}),sealedAt:p.C0,admissionClosed:true,launchNeverIssued:true,primaryWriterSetHash:hash(gate.writers),primaryWriterTerminal:true,primarySnapshotHash:hash(primary),providerAbsenceHash:hash([support.providerBefore,support.providerAfter])};
+ return {control:c,proof,support,expectedChallenge:proof.proofChallenge,now:()=>p.C0+3};
+}
+test('strict finite proof validator is available',()=>assert.equal(typeof api.validatePrivateQaFiniteCleanupProof,'function'));
+test('sealed no-admission proof is distinct and contains no physical-stop assertion',()=>{
+ const f=fixture(),v=api.validatePrivateQaFiniteCleanupProof(f);assert.equal(v.kind,'sealed_without_admission');assert.equal(Object.hasOwn(v,'physicalStopVerified'),false);
+});
+for(const mode of ['unresolved','launch','provider','source','challenge','tamper','extra']){
+ test('finite proof blocks '+mode,()=>{
+  const f=fixture();
+  if(mode==='unresolved')f.support.gate.unresolvedWriters=1;
+  if(mode==='launch')f.support.gate.launchNeverIssued=false;
+  if(mode==='provider')f.support.providerAfter.totalCount=1;
+  if(mode==='source')f.proof.runtimeVersionId=f.control.plan.deployments.qaLive.versionId;
+  if(mode==='challenge')f.expectedChallenge='9'.repeat(64);
+  if(mode==='tamper')f.proof.evidenceHash='8'.repeat(64);
+  if(mode==='extra')f.proof.physicalStopVerified=true;
+  if(mode!=='tamper')f.proof.evidenceHash=hash({proofChallenge:f.proof.proofChallenge,sealHash:f.proof.sealHash,support:f.support});
+  assert.throws(()=>api.validatePrivateQaFiniteCleanupProof(f));
+ });
+}
+
+test('retired process proof requires genuine handoff, settled writers and exact stopped instance',()=>{
+ const f=fixture(),p=f.control.plan,g=f.support.gate;
+ for(const [i,kind] of ['reservation','admission','launch'].entries()){
+  const claim={purpose:'afw.own-finite-admission.v1:writer',identityHash:g.identityHash,kind,issuedAt:p.T0+1,deadline:p.N1-10000};
+  const primaryRowHash=String(i+3).repeat(64);g.writers[kind]={claim,settlement:{purpose:'afw.own-finite-admission.v1:settled',identityHash:g.identityHash,kind,claimHash:hash(claim),primaryRowHash,settledAt:p.T0+2}};f.support.primary[kind+'Hash']=primaryRowHash;
+ }
+ g.launchNeverIssued=false;f.support.primary.closureHash='6'.repeat(64);f.support.primary.processGeneration='7'.repeat(64);
+ const stoppedAt=p.C0-1,instance={containerId:p.resources.containerId,applicationId:p.resources.applicationId,image:'cloudflare/debian-trixie',startedAt:p.T0+3,stoppedAt,state:'stopped',exitCode:0};
+ for(const provider of [f.support.providerBefore,f.support.providerAfter]){provider.instances=[instance];provider.totalCount=1;}
+ for(const k of ['sealedAt','admissionClosed','launchNeverIssued','primaryWriterSetHash','primaryWriterTerminal','primarySnapshotHash','providerAbsenceHash'])delete f.proof[k];
+ f.proof.kind='retired_process';f.proof.retirementHandoff={status:'retired_handoff_observed',physicalStopVerified:true,mayStartSuccessor:false,mayRestoreAdministration:false,operationalReadiness:false,containerId:p.resources.containerId,applicationId:p.resources.applicationId,programHash:p.selectors.programHash,sourceRevision:p.selectors.sourceRevision,processGeneration:'7'.repeat(64),closedAt:p.C0-2,stoppedAt,capturedAt:p.C0,observedAt:p.C0+2};
+ f.proof.evidenceHash=hash({proofChallenge:f.proof.proofChallenge,sealHash:f.proof.sealHash,support:f.support});
+ assert.equal(api.validatePrivateQaFiniteCleanupProof(f).kind,'retired_process');
+ f.proof.retirementHandoff.physicalStopVerified=false;assert.throws(()=>api.validatePrivateQaFiniteCleanupProof(f));
+});

~~~~~~~~~~

## test/mcp-own-finite-entrypoints-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-finite-entrypoints-native.test.mjs b/test/mcp-own-finite-entrypoints-native.test.mjs
--- /dev/null
+++ b/test/mcp-own-finite-entrypoints-native.test.mjs
@@ -0,0 +1,25 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+// Actual compiled Worker/DO entrypoints under workerd. No provider, credentials,
+// Container or grant is provisioned; all trap instrumentation is fixture-only.
+test('native finite legacy delivery and schedule cannot enter any host capability',async()=>{
+ const contents=`
+ import worker,{AfwOwnEventNode} from './worker/mcp-own/index.mjs';
+ export class Native extends AfwOwnEventNode{
+  constructor(ctx,env){const touches=[];super(ctx,new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));this.touches=touches;}
+  async fixture(method){try{await this[method]('old-event','old-subscription');return {denied:false,touches:this.touches};}catch{return {denied:true,touches:this.touches};}}
+ }
+ export default{async fetch(request,env){const method=new URL(request.url).pathname.slice(1);
+  if(method==='schedule'){const touches=[];const result=await worker.scheduled({scheduledTime:Date.now()},new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));return Response.json({result,touches});}
+  return Response.json(await env.NODE.get(env.NODE.idFromName('receiver')).fixture(method));
+ }};
+ `;
+ const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':'"finite_trial_event"'}});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{NODE:{className:'Native',useSQLite:true}}}));
+ try{
+  for(const method of ['deliverOwnSaved','deliverSaved'])assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/'+method)).json(),{denied:true,touches:[]});
+  assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/schedule')).json(),{result:null,touches:[]});
+ }finally{await mf.dispose();}
+});

~~~~~~~~~~

## test/mcp-own-finite-entrypoints.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-finite-entrypoints.test.mjs b/test/mcp-own-finite-entrypoints.test.mjs
--- /dev/null
+++ b/test/mcp-own-finite-entrypoints.test.mjs
@@ -0,0 +1,24 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+// Actual source class, isolated bundled module. Only the platform base-class
+// constructors are synthetic here; workerd composition is qualified separately.
+async function source(profile){
+ const result=await build({entryPoints:['worker/mcp-own/index.mjs'],bundle:true,write:false,format:'esm',platform:'node',define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify(profile)},plugins:[{name:'synthetic-platform-base',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'base',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:'export class DurableObject{constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint{constructor(ctx,env){this.ctx=ctx;this.env=env;}}'}));}}]});
+ return import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text+'\n// '+profile).toString('base64'));
+}
+test('compiled finite receiver denies legacy delivery before every host capability',async()=>{
+ const {AfwOwnEventNode}=await source('finite_trial_event');
+ for(const [method,args] of [['deliverOwnSaved',['old-event']],['deliverSaved',['old-subscription','old-event']]]){
+  const touches=[],trap=new Proxy({},{get(_o,key){touches.push(String(key));throw Error('must not touch host');}});
+  const node=new AfwOwnEventNode(trap,trap);
+  await assert.rejects(node[method](...args));
+  assert.deepEqual(touches,[],method+' touched a host capability');
+ }
+});
+test('finite scheduled legacy event route stops before policy, storage or transport',async()=>{
+ const {default:worker}=await source('finite_trial_event'),touches=[];
+ const env=new Proxy({},{get(_o,key){touches.push(String(key));throw Error('must not inspect policy');}});
+ assert.equal(await worker.scheduled({scheduledTime:Date.now()},env),null);
+ assert.deepEqual(touches,[]);
+});

~~~~~~~~~~

## test/mcp-own-finite-premature-admission-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-finite-premature-admission-native.test.mjs b/test/mcp-own-finite-premature-admission-native.test.mjs
--- /dev/null
+++ b/test/mcp-own-finite-premature-admission-native.test.mjs
@@ -0,0 +1,45 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {exercise} from './fixtures/finite-premature-admission-native.mjs';
+const additions=r=>({admissions:r.after.d1.dossier_node_process_admissions.length-r.before.d1.dossier_node_process_admissions.length,closures:r.after.d1.dossier_node_process_closures.length-r.before.d1.dossier_node_process_closures.length});
+for(const mode of ['missing','reservation-pending'])test('premature '+mode+' leaves full snapshots unchanged and intended reservation insertable',async()=>{
+ const r=await exercise(mode);assert.equal(r.error,'Own durable event host unavailable');assert.deepEqual(r.after,r.before);assert.equal(r.launches,0);assert.equal(r.closes,0);assert.equal(r.callbacks,0);assert.equal(r.runs,0);assert.equal(r.laterReservation.state,'prepared');
+});
+test('atomic prepared reservation predicate denies mutation after both guards; marker stays unresolved',async()=>{
+ const r=await exercise('race-reservation');assert.deepEqual(additions(r),{admissions:0,closures:0});assert.ok(r.reads>=2);assert.equal(r.closes,0);assert.equal(r.launches,0);assert.equal(r.callbacks,0);assert.equal(r.runs,1);const raw=r.after.do.find(([k])=>k==='afw.own-finite-admission.v1:head')[1];assert.ok(raw.writers.admission);assert.equal(raw.writers.admission.settlement,null);
+});
+test('historical construction, primary read, seal and close survive revoked policy and N1',async()=>{
+ const r=await exercise('historical');assert.equal(r.constructed.read.status,'observed');assert.equal(r.constructed.seal.status,'sealed');assert.equal(r.launches,0);assert.equal(r.closes,1);
+});
+test('valid exact prepared reservation traverses actual custody and gate once under SYN runtime',async()=>{
+ const r=await exercise('valid');assert.equal(r.error,null);assert.equal(r.launches,1);assert.equal(r.callbacks,0);assert.equal(r.closes,0);assert.deepEqual(additions(r),{admissions:1,closures:0});
+});
+test('ordinary nonfinite custody remains successful',async()=>{const r=await exercise('ordinary');assert.equal(r.error,null);assert.equal(r.launches,1);assert.equal(r.callbacks,0);});
+
+test('host guard passes then custody denies: no admission marker or close',async()=>{
+ const r=await exercise('guard-race');assert.equal(r.reads,2);assert.deepEqual(r.after.do,r.before.do);assert.deepEqual(additions(r),{admissions:0,closures:0});assert.equal(r.closes,0);assert.equal(r.launches,0);assert.equal(r.runs,0);
+});
+test('latest consent changes at actual INSERT: acknowledged zero retains spent unresolved marker without close',async()=>{
+ const r=await exercise('race-consent');assert.deepEqual(additions(r),{admissions:0,closures:0});assert.equal(r.closes,0);assert.equal(r.runs,1);assert.equal(r.launches,0);assert.ok(r.after.do.find(([k])=>k==='afw.own-finite-admission.v1:head')[1].writers.admission);
+});
+for(const mode of ['throw','successfalse','malformed','lostack','postinsert','read-throw','read-malformed','prior-admission','prior-launch','prior-custody','rerun-inserted-zero','rerun-unknown-zero'])test('uncertain '+mode+' retains actual host close and sanitized failure',async()=>{
+ const r=await exercise(mode);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.closes,1);assert.equal(r.callbacks,0);assert.equal(additions(r).closures,1);if(mode.startsWith('rerun-')){assert.equal(r.runs,2);assert.equal(r.rerun,true);assert.equal(additions(r).admissions,1);}
+});
+for(const [field,value] of [['trial_id','0'.repeat(64)],['scope_hash','0'.repeat(64)],['application_id','foreign'],['predecessor_container_id','0'.repeat(64)],['predecessor_generation','0'.repeat(64)],['predecessor_program_hash','0'.repeat(64)],['predecessor_source_revision','0'.repeat(40)],['container_id','0'.repeat(64)],['program_hash','0'.repeat(64)],['source_revision','0'.repeat(40)],['start_at',1],['expires_at',2],['closed_at',1],['budget',2],['state','pending'],['reserved_at',1]])test('wrong reservation '+field+' rejects before finite marker',async()=>{
+ const r=await exercise('wrong-row',{field,value});assert.equal(r.error,'Own durable event host unavailable');assert.deepEqual(r.after,r.before);assert.equal(r.runs,0);assert.equal(r.launches,0);assert.equal(r.closes,0);assert.equal(r.callbacks,0);
+});
+
+test('pending underlying INSERT cannot be classified or closed as acknowledged zero',async()=>{
+ const r=await exercise('pending');assert.equal(r.pendingObservation.settled,false);assert.equal(r.pendingObservation.closes,0);assert.equal(r.pendingObservation.launches,0);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.launches,0);assert.equal(r.closes,1);assert.equal(additions(r).admissions,1);assert.equal(additions(r).closures,1);
+});
+test('opaque native source rejects partial/foreign provenance and forged source token',async()=>{
+ const r=await exercise('source-shapes');assert.equal(r.sourceChecks.length,8);assert.ok(r.sourceChecks.every(x=>x.denied));assert.deepEqual(r.after,r.before);assert.equal(r.runs,0);
+});
+for(const mode of ['unique','persist-fail','prior-row','prior-launch-row'])test('actual '+mode+' retains possible-process cleanup',async()=>{
+ const r=await exercise(mode);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.closes,1);assert.equal(r.launches,0);assert.equal(additions(r).closures,1);
+});
+test('native source absence never permits finite custody',async()=>{const r=await exercise('no-source');assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.launches,0);assert.equal(r.runs,0);});
+
+test('rerun-zero-prior: unreadable custody after ACK0 disqualifies no-admission classification',async()=>{
+ const r=await exercise('rerun-zero-prior');assert.equal(r.runs,1);assert.equal(r.rerun,true);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.closes,1);assert.equal(additions(r).admissions,0);assert.equal(additions(r).closures,1);
+});

~~~~~~~~~~

## test/mcp-own-finite-reduction-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-finite-reduction-native.test.mjs b/test/mcp-own-finite-reduction-native.test.mjs
--- /dev/null
+++ b/test/mcp-own-finite-reduction-native.test.mjs
@@ -0,0 +1,64 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFileSync} from 'node:fs';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+// Actual DO storage/D1 and custody close + permissions-only primitives.
+// Runtime stop callback and source/config are synthetic; no physical-stop claim.
+test('native first cleanup after N1 uses original C1; unknown close ACK never resends',async()=>{
+ const schemas=['dossier-monitoring-consent.sql','dossier-node-process.sql'].flatMap(file=>[...readFileSync('db/'+file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]));
+ const contents=`
+ import {createHash} from 'node:crypto';
+ import {createFiniteOwnReductionActions} from './lib/mcp-own-finite-reduction.mjs';
+ import {createNodeProcessCustody} from './lib/mcp-node-process-custody.mjs';
+ import {finiteFixture,digest} from './test/fixtures/qa-finite-trial.mjs';
+ import {finiteCleanupPolicyHash} from './lib/mcp-finite-cleanup-policy.mjs';
+ const program='synthetic source-only finite custody';
+ export class Own {
+  constructor(ctx,env){this.ctx=ctx;this.env=env;}
+  async fetch(request){
+   const f=finiteFixture({at:Number(this.env.T0)}),p=f.plan,s=p.selectors,db=this.env.DB;
+   p.resources.containerId=this.ctx.id.toString();s.programHash=createHash('sha256').update(program).digest('hex');
+   const context={grantId:s.grantId,subject:s.subject,clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']};
+   const a=createNodeProcessCustody({enabled:true,db,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),storage:this.ctx.storage,custodyKey:Buffer.alloc(32,7),containerId:p.resources.containerId,programHash:s.programHash,sourceRevision:s.sourceRevision,image:'cloudflare/debian-trixie',window:{startAt:s.startAt,expiresAt:s.expiresAt},runtime:{launch:async()=>{throw Error('forbidden');},observe:async()=>{throw Error('no admission');},close:async()=>{await db.prepare('UPDATE fixture_stop SET calls=calls+1').run();}},now:Date.now});
+   const policy={purpose:'afw.private-permission-withdrawal.v1',requestId:'22222222-2222-4222-8222-222222222222',startAt:p.C0,expiresAt:p.C1,originalConsent:{sequence:1,revision:1,issuedAt:s.startAt,expiresAt:s.expiresAt},containerId:p.resources.containerId,programHash:s.programHash,sourceRevision:s.sourceRevision};
+   const raw=JSON.stringify(policy);p.withdrawalPolicyHash=createHash('sha256').update(raw).digest('hex');p.closePolicyHash=finiteCleanupPolicyHash(p);
+   const env={DB:db,AFW_DOSSIER_EVENTS_NODE:this.env.QA,AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:s.grantId,subject:s.subject,projectId:s.projectId,clientId:s.clientId,resource:s.resource,startAt:s.startAt,expiresAt:s.expiresAt}),AFW_OAUTH_ISSUER:'https://fixed.invalid',AFW_OAUTH_RESOURCE:s.resource,AFW_OAUTH_PILOT_CLIENT_ID:s.clientId,AFW_OAUTH_PILOT_PROJECT_ID:s.projectId,AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED:'true',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:raw};
+   const control={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)},refs={intentId:p.intentId,controlHash:control.controlHash};
+   const actions=createFiniteOwnReductionActions({ctx:this.ctx,env,control,program,programSourceRevision:s.sourceRevision,close:async boundary=>{const r=await a.close(boundary);if(this.env.LOST==='true')throw Error('synthetic lost close ACK');return r;},now:Date.now});
+   const path=new URL(request.url).pathname;
+   try{
+    if(path==='/withdraw')return Response.json(await actions.withdraw(refs));
+    if(path==='/close')return Response.json(await actions.close(refs));
+    if(path==='/read')return Response.json(await actions.read(refs));
+    return Response.json({stop:(await db.prepare('SELECT calls FROM fixture_stop').first()).calls,monitor:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_consent_events').first()).n,now:Date.now(),N1:p.N1,C1:p.C1});
+   }catch{return Response.json({status:'unavailable'},{status:409});}
+  }
+ }
+ export default {async fetch(r,e){
+  if(new URL(r.url).pathname==='/seed'){
+   await e.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);CREATE TABLE fixture_stop(calls INTEGER);INSERT INTO fixture_stop VALUES(0);');
+   for(const sql of ${JSON.stringify(schemas)})await e.DB.prepare(sql).run();
+   const f=finiteFixture({at:Number(e.T0)}),s=f.plan.selectors;
+   await e.DB.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind(s.projectId,s.subject,1).run();
+   await e.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind(s.grantId,s.subject,s.clientId,s.projectId,s.resource,'["afw:project:read"]',new Date(s.expiresAt).toISOString(),'').run();
+   await e.DB.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind(s.grantId,s.projectId,s.subject,s.clientId,s.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',s.startAt,s.expiresAt).run();return Response.json({});
+  }
+  return e.QA.get(e.QA.idFromName('afw-own-event-first-successor-v1')).fetch(r);
+ }};
+ `;
+ const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
+ for(const mode of ['normal','lost','expired']){
+  const T0=Date.now()-(mode==='expired'?420001:301000),opts=revision=>convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(T0),REV:revision,LOST:mode==='lost'?'true':'false'},durableObjects:{QA:{className:'Own',useSQLite:true,uniqueKey:'finite-reduce-'+mode}},d1Databases:{DB:'finite-reduce-'+mode}});
+  const mf=new Miniflare(opts('first'));const call=async(path,status=200)=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path);assert.equal(r.status,status);return r.json();};
+  try{
+   await call('/seed');const first=await call('/state');assert.ok(first.now>first.N1);
+   if(mode==='expired'){await call('/withdraw',409);await call('/close',409);assert.equal((await call('/state')).stop,0);continue;}
+   assert.ok(first.now<first.C1);assert.equal((await call('/withdraw')).permissionsWithdrawn,true);
+   const close=await call('/close',mode==='lost'?409:200);if(mode==='normal')assert.equal(close.runtimeStopRequested,true);
+   await mf.setOptions(opts('recreated'));await call('/withdraw',409);await call('/close',409);
+   const read=await call('/read');assert.equal(read.withdraw.permissionsWithdrawn,true);assert.equal(read.close?.runtimeStopRequested??null,mode==='normal'?true:null);
+   const state=await call('/state');assert.equal(state.stop,1);assert.equal(state.monitor,2);
+  }finally{await mf.dispose();}
+ }
+});

~~~~~~~~~~

## test/mcp-qa-finite-adoption-wait.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-adoption-wait.test.mjs b/test/mcp-qa-finite-adoption-wait.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-adoption-wait.test.mjs
@@ -0,0 +1,51 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {readFiniteMaterialSeed} from '../lib/mcp-qa-finite-seed-http.mjs';
+import {cfFiniteFixture} from './fixtures/finite-cf-http.mjs';
+import {finiteCliSyntheticSource} from './fixtures/finite-http-module.mjs';
+import {finiteObserverInstanceId} from '../lib/mcp-qa-finite-observer.mjs';
+import {validateQaFiniteConfirmationCommand} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
+const hash=s=>createHash('sha256').update(s).digest('hex');
+async function fixture(mode='normal',offset=100){
+ const T0=Date.now(),sha='b'.repeat(40),actor={id:290715446,login:'tokenizartinfo-ops',type:'User'},context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:sha};
+ const event={action:'created',repository:{id:1347578006,full_name:context.repository},issue:{number:497},sender:actor,comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+sha,created_at:new Date(T0).toISOString(),author_association:'OWNER',user:actor}};
+ const a=validateQaFiniteConfirmationCommand({event,context,now:()=>T0}),f=await cfFiniteFixture({at:T0,configure:p=>{p.intentId=a.intentId;p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:sha});}});
+ f.base.f.setNow(T0+offset);f.state.observerStatus='running';f.gh.state.admitStatus='in_progress';
+ const env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:context.repository,GITHUB_REPOSITORY_ID:context.repositoryId,GITHUB_REF:context.ref,GITHUB_EVENT_NAME:context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:sha,GITHUB_TOKEN:'synthetic_gh',AFW_QA_CLOSED_TOKEN:'synthetic_cf'};
+ const reads=[],sleeps=[],writes=[],all=[];const material=await readFiniteMaterialSeed({intentId:a.intentId,sourceRevision:sha,fetchImpl:f.fetchImpl,now:f.base.f.now});const api=await finiteCliSyntheticSource(f.p,{setupMode:mode,seedHash:material.seedHash});
+ const fetchImpl=async(url,init)=>{
+  all.push({url,method:init.method,at:f.base.f.now()-T0});
+  if(mode==='missing-seed'&&url.includes('/git/ref/tags/afw-finite-observer-create/'))return response({},404);
+  if(url.includes('/workflows/afw-own-qa-private-bootstrap/instances/')){
+   reads.push(f.base.f.now()-T0);
+   if(mode==='unknown')return response({success:true,errors:[],result:{status:'unknown'}});
+   if(mode==='auth')return response({},401);
+   if(mode==='transport')throw Error('synthetic transport');
+   if(['authmask','generic404','extra404','oversize404'].includes(mode))return response({success:false,messages:[],errors:[{code:mode==='authmask'?10000:10400,message:mode==='generic404'?'not found':'workflows.api.error.instance.not_found'}],result:null,...(mode==='extra404'?{extra:true}:{}),...(mode==='oversize404'?{padding:'x'.repeat(3000)}:{})},404);
+   if(mode==='bad404')return new Response('not json',{status:404,headers:{date:new Date(f.base.f.now()).toUTCString()}});
+   if(mode==='skip'&&reads.length===1)f.base.f.setNow(T0+5700);
+   if(mode==='clip'){const start=performance.now();await new Promise(resolve=>init.signal.addEventListener('abort',resolve,{once:true}));reads.push({abortedAfter:performance.now()-start});throw Error('clipped child');}
+   if(mode==='pending'&&f.base.f.now()<T0+50000){const response=await f.fetchImpl(url,init),body=await response.json();body.result.steps=[];body.result.step_count=0;return new Response(JSON.stringify(body),{status:200,headers:response.headers});}
+   if(f.base.f.now()<T0+50000&&mode!=='pending'||mode==='never')return response({success:false,messages:[],errors:[{code:10400,message:'workflows.api.error.instance.not_found'}],result:null},404);
+  }
+  return f.fetchImpl(url,init);
+ };
+ const response=(v,status=200)=>new Response(JSON.stringify(v),{status,headers:{date:new Date(f.base.f.now()).toUTCString(),'content-type':'application/json'}});
+ const result=await api.runFiniteFinalizerCli({phase:'admit',env,now:f.base.f.now,read:async()=>JSON.stringify(event),write:async(path,value)=>writes.push({path,value}),fetchImpl,sleep:async ms=>{sleeps.push(ms);if(mode!=='early-wake')f.base.f.setNow(f.base.f.now()+ms);}});
+ return {result,reads,sleeps,writes,all,f,hash};
+}
+test('actual CLI waits for attended observer until 50s after successful primary seed; GET only',async()=>{
+ const r=await fixture();assert.equal(r.result.status,'ready');assert.deepEqual(r.reads.slice(0,25),Array.from({length:25},(_,i)=>(i+1)*2000));assert.ok(r.writes.some(x=>x.path==='afw-finite-plan.json'));assert.equal(r.all.some(x=>x.method!=='GET'&&x.url.includes('api.cloudflare.com')),false);
+});
+test('absolute slots skip elapsed time without catch-up bursts',async()=>{const r=await fixture('skip');assert.equal(r.result.status,'ready');assert.equal(r.reads[0],2000);assert.equal(r.reads[1],6000);});
+test('never observed consumes at most 35 nonzero-budget slots; 70s starts no network',async()=>{const r=await fixture('never');assert.equal(r.result.status,'admin_pending');assert.deepEqual(r.reads,Array.from({length:34},(_,i)=>(i+1)*2000));});
+test('zero original budget starts no network',async()=>{const r=await fixture('normal',70000);assert.equal(r.result.status,'admin_pending');assert.equal(r.all.length,0);});
+for(const mode of ['missing-seed','auth','unknown','bad404','authmask','generic404','extra404','oversize404','transport','setup-missing','setup-running','setup-bad-hash'])test('adoption denies '+mode+' without catch-all retry',async()=>{const r=await fixture(mode,50000);assert.equal(r.result.status,'admin_pending');assert.equal(r.sleeps.length,0);assert.ok(r.reads.length<=1);assert.equal(r.all.some(x=>x.method!=='GET'&&x.url.includes('api.cloudflare.com')),false);});
+
+test('genuine qualified preview pending waits without expanding observer budget',async()=>{const r=await fixture('pending');assert.equal(r.result.status,'ready');assert.equal(r.reads[0],2000);assert.ok(r.reads.includes(50000));});
+test('last eligible slot clips child to remaining original two seconds',async()=>{const r=await fixture('clip',68000);assert.equal(r.result.status,'admin_pending');assert.equal(r.reads[0],68000);assert.ok(r.reads[1].abortedAfter<3000);assert.equal(r.all.some(x=>x.method!=='GET'&&x.url.includes('api.cloudflare.com')),false);});
+
+test('early sleep wake cannot spend a future absolute slot',async()=>{const r=await fixture('early-wake',50001);assert.equal(r.result.status,'admin_pending');assert.equal(r.reads.length,0);});
+
+test('held source setup read is bounded by the original five-second child',async()=>{const entered=performance.now(),r=await fixture('setup-held',50000);assert.equal(r.result.status,'admin_pending');assert.ok(performance.now()-entered<7000);assert.equal(r.reads.length,1);assert.equal(r.sleeps.length,0);});

~~~~~~~~~~

## test/mcp-qa-finite-bootstrap-compiler.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-bootstrap-compiler.test.mjs b/test/mcp-qa-finite-bootstrap-compiler.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-bootstrap-compiler.test.mjs
@@ -0,0 +1,25 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {execFileSync} from 'node:child_process';
+import {createHash} from 'node:crypto';
+import {compileFiniteNativeStaging,buildFiniteNativePackage} from '../scripts/build-finite-native-package.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex');
+test('real compiler binds exact tracked workflow/CLI hashes in QA only and excludes issuer build graph',async()=>{
+ const M=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),r=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:M});
+ assert(r.bootstrapSource,'independent source file commitments required');
+ assert.equal(r.bootstrapSource.sourceRevision,M);assert.equal(r.bootstrapSource.sourceTree,r.sourceTree);
+ for(const [key,path] of [['workflowHash','.github/workflows/afw-finite-qa-bootstrap.yml'],['cliHash','scripts/run-qa-finite-bootstrap.mjs']]){
+  const hash=sha(await readFile(path));assert.equal(r.bootstrapSource[key],hash);assert(r.files['qaLive/index.mjs'].includes(Buffer.from(hash)));assert(!r.files['canaryLive/index.mjs'].includes(Buffer.from(hash)));
+ }
+ assert(r.metafiles.qaLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);
+ for(const path of ['lib/mcp-qa-finite-initial-entry.mjs','lib/mcp-qa-finite-initial-entry-records.mjs'])assert(r.metafiles.qaLive.inputs[path]);
+ assert.equal(r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-initial-entry.mjs'],undefined);
+ // Accepted M phase-context reads the original capsule codec; it imports Entry records as DATA only.
+ assert(r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-initial-entry-records.mjs']);
+ for(const role of ['qaLive','canaryLive'])for(const output of Object.values(r.metafiles[role].outputs))assert(output.imports.every(x=>!/^node:fs(?:\/|$)/.test(x.path)),'no filesystem import in runtime graph');assert(!r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);
+ for(const role of ['qaLive','canaryLive'])assert(Object.keys(r.metafiles[role].inputs).every(x=>!x.includes('bootstrap-issuer')&&!x.includes('build-finite-native-package')&&!x.includes('node_modules/esbuild')));
+ assert.equal(r.completePackage,false);assert.equal(r.manifest,undefined);
+ console.log('D0.1 ACTUAL compiler '+JSON.stringify({sourceRevision:r.sourceRevision,sourceTree:r.sourceTree,qa:{bytes:r.files['qaLive/index.mjs'].length,sha256:sha(r.files['qaLive/index.mjs']),publicStatic:r.modules.qaLive.publicStatic,inputs:Object.keys(r.metafiles.qaLive.inputs).length},m:{bytes:r.files['canaryLive/index.mjs'].length,sha256:sha(r.files['canaryLive/index.mjs']),publicStatic:r.modules.canaryLive.publicStatic,inputs:Object.keys(r.metafiles.canaryLive.inputs).length},completePackage:r.completePackage,operationalReadiness:r.operationalReadiness}));
+ await assert.rejects(buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:M}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-bootstrap-issuer.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-bootstrap-issuer.test.mjs b/test/mcp-qa-finite-bootstrap-issuer.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-bootstrap-issuer.test.mjs
@@ -0,0 +1,109 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile,mkdtemp,writeFile,rm} from 'node:fs/promises';
+import {execFileSync} from 'node:child_process';
+import {tmpdir} from 'node:os';
+import {join,resolve} from 'node:path';
+import {pathToFileURL} from 'node:url';
+import {randomUUID} from 'node:crypto';
+import {build} from 'esbuild';
+let product;try{product=await import('../lib/mcp-qa-finite-bootstrap-issuer.mjs');}catch{/* absent-product RED */}
+let staged;
+async function fixture(mode='normal'){
+ assert.equal(typeof product?.issueFiniteQaBootstrap,'function');
+ const {compileFiniteNativeStaging}=await import('../scripts/build-finite-native-package.mjs');
+ staged??=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()});
+ const {bootstrapWorld,GH,CF}=await import('./fixtures/finite-bootstrap-world.mjs'),w=await bootstrapWorld(staged);w.issuer();
+ const receipt=JSON.parse(await readFile('scripts/mcp-qa-finite-custody-receipt.json','utf8'));receipt.expiresAt=new Date(Date.now()+86400000).toISOString();
+ const bundle=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-bootstrap-issuer.mjs';export * from './lib/mcp-qa-finite-bootstrap-admission.mjs';export * from './scripts/run-qa-finite-bootstrap.mjs';",resolveDir:process.cwd()},bundle:true,write:false,platform:'node',format:'esm',external:['node:*'],define:{'import.meta.url':JSON.stringify(pathToFileURL(resolve('lib/mcp-qa-finite-bootstrap-issuer.mjs')).href)},plugins:[{name:'explicit-SYN-custody-only-real-compiler',setup(b){
+  b.onResolve({filter:/build-finite-native-package\.mjs$/},()=>({path:pathToFileURL(resolve('scripts/build-finite-native-package.mjs')).href,external:true}));
+  b.onLoad({filter:/mcp-qa-finite-custody-receipt\.json$/},()=>({contents:JSON.stringify(receipt),loader:'json'}));
+ }}]});
+ const api=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64')+'#'+randomUUID());
+ const originalFetch=globalThis.fetch,oldEnv={...process.env},calls=[],state={tagPosts:0,refPosts:0,pointers:0,requestDurations:[],observation:null};const sha='f'.repeat(40);
+ Object.assign(process.env,{GITHUB_JOB:'publish',GITHUB_ACTION:'finite_bootstrap_once',GITHUB_RUN_ID:'456',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:staged.sourceRevision,GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/main',GITHUB_EVENT_NAME:'issue_comment',AFW_FINITE_BOOTSTRAP_ORIGINAL_PID:String(process.pid)});
+ if(mode==='marker')process.env.AFW_FINITE_BOOTSTRAP_ORIGINAL_PID='0';
+ if(mode==='wrong-action')process.env.GITHUB_ACTION='finite_seed_once';
+ if(mode==='wrong-attempt')process.env.GITHUB_RUN_ATTEMPT='2';
+ if(mode==='wrong-owner')w.comment.user.id=1;
+ if(mode==='completed')w.run.status=w.job.status=w.step.status='completed';
+ if(mode==='existing')w.refresh();
+ globalThis.fetch=async(url,init)=>{
+  calls.push({url,method:init.method});const requestStarted=performance.now();let value,status=200;
+  // Real elapsed SYN transport latency, never a clock/deadline substitution.
+  // Ten sequential waves after the QA observation cumulatively exceed5s;
+  // every individual response remains fresh and well within its own5s child.
+  if(mode==='cumulative-latency'&&state.observation&&url.startsWith(GH))await new Promise(resolve=>setTimeout(resolve,650));
+  if(url.startsWith(CF)){
+   assert.equal(init.headers.Authorization,'Bearer SYN-gha-token');assert.equal(init.method,'GET');
+   if(url===CF+'/tokens/verify')value={id:mode==='wrong-token'?'9aa97ad1fc9afe3021cf69ea497d5190':receipt.tokenId,status:'active',expires_on:receipt.expiresAt,not_before:null};
+   else if(url.includes('/deployments?')){value=structuredClone(w.pointer);state.pointers++;if(mode==='pointer-drift'&&state.pointers===2)value.deployments[0].id='33333333-3333-4333-8333-333333333333';}
+   else{
+    assert(url.endsWith('/versions/'+w.record.qaLive.versionId+'?include=modules'));value=structuredClone(w.version);
+    if(mode==='wrong-bytes')value.modules[0].content_base64=Buffer.from('wrong').toString('base64');
+    if(mode==='wrong-profile')value.bindings.find(b=>b.type==='d1').id='wrong';
+    if(mode==='secret-value')value.bindings.find(b=>b.type==='secret_text').text='PRIVATE_MUST_NOT_HASH';
+    if(mode==='extra-module')value.modules.push({...value.modules[0]});
+    if(mode==='wrong-export')value.exports=['default'];
+   }
+   value={success:true,errors:[],messages:[],result:value};
+  }else{
+   assert(url.startsWith(GH));assert.equal(init.headers.Authorization,'Bearer SYN-github-token');
+   const path=url.slice(GH.length);
+   if(init.method==='POST'){
+    const body=JSON.parse(init.body);status=201;
+    if(path==='/git/tags'){state.tagPosts++;value={...body,object:{sha:body.object,type:body.type},sha};w.map.set('/git/tags/'+sha,value);if(mode==='tag-lost')throw Error('SYN unknown ACK');}
+    else{assert.equal(path,'/git/refs');state.refPosts++;value={ref:body.ref,object:{type:'tag',sha:body.sha}};w.map.set(w.refPath,value);if(mode==='ref-lost')throw Error('SYN unknown ACK');}
+   }else if(path===w.refPath&&!w.map.has(path)){status=404;value={message:'Not Found'};}
+   else value=await w.get(path);
+  }
+  const response=new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json',Date:new Date().toUTCString()}});
+  if(url.startsWith(CF)&&url.includes('/deployments?')&&state.pointers===2)state.observation={observedAt:Date.parse(response.headers.get('date')),wall:Date.now(),mono:performance.now()};
+  state.requestDurations.push(performance.now()-requestStarted);return response;
+ };
+ const admission=api.validateQaBootstrapCommand({event:w.event,context:w.context,now:Date.now}),options={admission,githubToken:'SYN-github-token',credential:'SYN-gha-token',signal:new AbortController().signal};
+ return {api,options,w,calls,state,async close(){globalThis.fetch=originalFetch;for(const k of Object.keys(process.env))if(!Object.hasOwn(oldEnv,k))delete process.env[k];Object.assign(process.env,oldEnv);}};
+}
+test('actual issuer compiles same checkout, checks actual QA bytes and creates exact public record once',async()=>{
+ const f=await fixture();try{
+  const r=await f.api.issueFiniteQaBootstrap(f.options);assert.equal(r.status,'qa_bootstrap_created');assert.equal(r.qaPublicationBridgeVerified,false);assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
+  const tag=f.w.map.get('/git/tags/'+r.tagSha);assert(!tag.message.includes('SYN-gha-token'));assert(!tag.message.includes('content_base64'));assert(!tag.message.includes('PRIVATE'));
+  assert.equal(JSON.parse(tag.message).record.qaLive.module.sha256,staged.modules.qaLive.module.sha256);
+  await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));assert.equal(f.state.tagPosts,1);
+ }finally{await f.close();}
+});
+for(const mode of ['marker','wrong-action','wrong-attempt','completed','existing','wrong-token','wrong-bytes','wrong-profile','secret-value','extra-module','wrong-export','pointer-drift'])test('actual issuer denies before POST: '+mode,async()=>{
+ const f=await fixture(mode);try{await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));assert.equal(f.state.tagPosts,0);assert.equal(f.state.refPosts,0);}finally{await f.close();}
+});
+for(const mode of ['tag-lost','ref-lost'])test('unknown ACK stays spent: '+mode,async()=>{
+ const f=await fixture(mode);try{await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));const count=f.state.tagPosts+f.state.refPosts;await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));assert.equal(f.state.tagPosts+f.state.refPosts,count);assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,mode==='tag-lost'?0:1);}finally{await f.close();}
+});
+test('caller compiler/pins/provider URL cannot replace source producer',async()=>{
+ const f=await fixture();try{for(const k of ['compile','pins','source','url','now'])await assert.rejects(f.api.issueFiniteQaBootstrap({...f.options,[k]:true}));assert.equal(f.calls.length,0);}finally{await f.close();}
+});
+test('actual fixed CLI consumes event file and original environment without fake native ctx',async()=>{
+ const f=await fixture(),dir=await mkdtemp(join(tmpdir(),'afw-bootstrap-event-'));try{
+  const path=join(dir,'event.json');await writeFile(path,JSON.stringify(f.w.event));process.env.GITHUB_EVENT_PATH=path;process.env.GITHUB_TOKEN='SYN-github-token';process.env.AFW_QA_CLOSED_TOKEN='SYN-gha-token';
+  const r=await f.api.runFiniteQaBootstrapCli();assert.equal(r.status,'qa_bootstrap_created');assert.equal(f.state.refPosts,1);
+ }finally{await f.close();assert(dir.startsWith(join(tmpdir(),'afw-bootstrap-event-')));await rm(dir,{recursive:true,force:true});}
+});
+
+test('original QA observation survives cumulative post-observation latency beyond5s inside original Pend',async()=>{
+ const f=await fixture('cumulative-latency');try{
+  let result,error;try{result=await f.api.issueFiniteQaBootstrap(f.options);}catch(e){error=e.message;}
+  const original=f.state.observation;assert(original,'actual final CF observation was reached');
+  const elapsedWall=Date.now()-original.wall,elapsedMono=performance.now()-original.mono;
+  assert(elapsedWall>5000&&elapsedMono>5000,'actual original clocks crossed5s');
+  assert(Date.now()<f.options.admission.Pend,'original unextended Pend remains live');
+  assert(f.state.requestDurations.every(ms=>ms<5000),'every actual request stayed within5s');
+  assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
+  const tag=f.w.map.get('/git/tags/'+f.w.tagSha),record=JSON.parse(tag.message).record;
+  assert.equal(record.observedAt,original.observedAt,'original observation was never rewritten');
+  assert.equal(record.P0,f.options.admission.P0);assert.equal(record.Pend,f.options.admission.Pend);
+  const calls=f.calls.length;await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));
+  assert.equal(f.calls.length,calls);assert.equal(f.state.tagPosts+f.state.refPosts,2);
+  console.log('SYN cumulative elapsed wall='+elapsedWall+'ms mono='+Math.floor(elapsedMono)+'ms maxRequest='+Math.ceil(Math.max(...f.state.requestDurations))+'ms POSTs=2 originalObservedAtUnchanged=true');
+  assert.equal(error,undefined,'valid original publication must reconcile successfully');
+  assert.equal(result.status,'qa_bootstrap_created');
+ }finally{await f.close();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-bootstrap-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-bootstrap-native.test.mjs b/test/mcp-qa-finite-bootstrap-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-bootstrap-native.test.mjs
@@ -0,0 +1,82 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+let api;try{api=await import('../lib/mcp-qa-finite-bootstrap-native.mjs');}catch{/* absent-product RED */}
+const REAL_CEILING=Date.parse('2026-11-03T02:59:00Z'),DECLARATION="CEILING=Date.parse('2026-11-03T02:59:00Z')";
+async function fixture({productionExpiry=false}={}){
+ assert.equal(typeof api?.readPrivateQaFiniteBootstrap,'function');
+ const {bootstrapWorld,UUID,GH,CF}=await import('./fixtures/finite-bootstrap-world.mjs'),w=await bootstrapWorld();
+ let source=await readFile('lib/mcp-qa-finite-bootstrap-native.mjs','utf8');
+ assert.equal(source.split(DECLARATION).length,2);
+ const approval=Date.now()+86400000;
+ if(productionExpiry){source=source.replaceAll('Date.now()',String(REAL_CEILING));assert.equal(source.split(DECLARATION).length,2);}
+ else source=source.replace(DECLARATION,'CEILING='+approval);
+ const entry=`
+ import{DurableObject}from'cloudflare:workers';
+ import{readPrivateQaFiniteBootstrap}from'./lib/mcp-qa-finite-bootstrap-native.mjs';
+ export class Check extends DurableObject{
+  async read(mode){
+   const controller=new AbortController(),start=Date.now(),env=this.env,version=env.AFW_QA_VERSION;
+   const lease={signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()-start>=30000||mode==='expired-parent')throw Error('parent');}};
+   let timer;if(mode==='abort')controller.abort();if(mode==='held-abort')timer=setTimeout(()=>controller.abort(),25);
+   if(mode==='holder-swap')timer=setTimeout(()=>{env.AFW_QA_VERSION={id:version.id};},0);
+   try{return await readPrivateQaFiniteBootstrap({ctx:this.ctx,env},lease);}
+   catch{return {denied:true};}finally{clearTimeout(timer);controller.abort();env.AFW_QA_VERSION=version;}
+  }
+ }export default{fetch(){return new Response(null,{status:404});}};
+ `;
+ const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':JSON.stringify(w.expected)},plugins:[{name:'explicit-SYN-custody-boundary',setup(b){b.onLoad({filter:/mcp-qa-finite-bootstrap-native\.mjs$/},()=>({contents:source,loader:'js'}));}}]});
+ const f={w,mode:'normal',requests:[],pointerReads:0,held:null,approval};
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'SYN-native-token'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Check',useSQLite:true,uniqueKey:'bootstrap-c1'}},script:built.outputFiles[0].text,outboundService:async req=>{
+  f.requests.push({url:req.url,authorization:req.headers.get('authorization')});assert.equal(req.method,'GET');
+  if(f.mode==='held')await new Promise(resolve=>{f.held=resolve;});
+  let value;
+  if(req.url.startsWith(CF)){
+   assert.equal(req.headers.get('authorization'),'Bearer SYN-native-token');
+   if(req.url===CF+'/tokens/verify')value={success:true,errors:[],messages:[],result:{id:f.mode==='wrong-token'?'9db7901af95faf07e6f7ef378045328e':'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:new Date(f.mode==='expired-token'?0:approval+60000).toISOString(),not_before:null}};
+   else{
+    assert.equal(req.url,CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1');
+    const p=structuredClone(w.pointer);f.pointerReads++;
+    if(f.mode==='pointer-drift'&&f.pointerReads%2===0)p.deployments[0].id='33333333-3333-4333-8333-333333333333';
+    if(f.mode==='wrong-qa')p.deployments[0].versions[0].version_id='44444444-4444-4444-8444-444444444444';
+    value={success:true,errors:[],messages:[],result:p};
+   }
+  }else{
+   assert(req.url.startsWith(GH));assert.equal(req.headers.get('authorization'),null);
+   value=await w.get(req.url.slice(GH.length));
+   if(f.mode==='ref-drift'&&req.url.endsWith(w.refPath)&&f.requests.filter(x=>x.url===req.url).length%2===0)value.object.sha='0'.repeat(40);
+   if(f.mode==='wrong-body'&&req.url.includes('/git/tags/'))value.message=value.message.replace('"index.mjs"','"wrong.mjs"');
+   if(f.mode==='unfinished'&&req.url.endsWith('/actions/runs/456'))value.status='in_progress';
+  }
+  return new Response(JSON.stringify(value),{headers:{'Content-Type':'application/json',Date:new Date(f.mode==='stale'?Date.now()-60000:Date.now()).toUTCString(),...f.mode==='cached'?{Age:'1'}:{}}});
+ }}));
+ f.mf=mf;const env=await mf.getBindings();f.stub=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.wrong=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('other'));
+ return f;
+}
+test('actual workerd DO reader returns bounded bridge facts with direct/source authority false',async t=>{
+ const f=await fixture();t.after(()=>f.mf.dispose());const r=await f.stub.read('normal');
+ assert.equal(r.qaPublicationBridgeVerified,true);assert.equal(r.qaCodeProvenanceVerified,false);
+ for(const k of ['sourceIdentityVerified','scopeVerified','authorizesEffects','operationalReadiness','completePackage','historicalRefNonmutationVerified'])assert.equal(r[k],false);
+ assert.equal(r.repositoryWriterTrustAssumed,true);assert.equal(f.requests.length,14);
+ assert.equal(f.requests.filter(x=>x.authorization).length,3);assert(f.requests.every(x=>!x.url.includes('/versions/')));
+ assert.equal(JSON.stringify(r).includes('SYN-native-token'),false);
+});
+for(const mode of ['wrong-token','expired-token','wrong-qa','pointer-drift','ref-drift','wrong-body','unfinished','stale','cached'])test('native actual reader rejects '+mode,async t=>{
+ const f=await fixture();t.after(()=>f.mf.dispose());f.mode=mode;assert.equal((await f.stub.read('normal')).denied,true);
+});
+for(const mode of ['abort','expired-parent','holder-swap'])test('native original lease and holder coherence rejects '+mode,async t=>{
+ const f=await fixture();t.after(()=>f.mf.dispose());assert.equal((await f.stub.read(mode)).denied,true);
+});
+test('actual namespace identity mismatch denies before HTTP',async t=>{
+ const f=await fixture();t.after(()=>f.mf.dispose());assert.equal((await f.wrong.read('normal')).denied,true);assert.equal(f.requests.length,0);
+});
+test('held actual provider promise cannot renew original aborted parent or continue GH reads',async t=>{
+ const f=await fixture();t.after(()=>f.mf.dispose());f.mode='held';
+ const promise=f.stub.read('held-abort');const r=await promise;assert.equal(r.denied,true);assert.equal(f.requests.length,1);
+ f.held?.();await new Promise(resolve=>setTimeout(resolve,50));assert.equal(f.requests.length,1);
+});
+test('unmodified production approval ceiling denies at expiry before all HTTP (SYN reader clock only)',async t=>{
+ const f=await fixture({productionExpiry:true});t.after(()=>f.mf.dispose());assert.equal((await f.stub.read('normal')).denied,true);assert.equal(f.requests.length,0);
+});

~~~~~~~~~~

## test/mcp-qa-finite-bootstrap-primary.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-bootstrap-primary.test.mjs b/test/mcp-qa-finite-bootstrap-primary.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-bootstrap-primary.test.mjs
@@ -0,0 +1,57 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+let api;try{api=await import('../lib/mcp-qa-finite-bootstrap-primary.mjs');}catch{/* expected absent-product RED */}
+const world=async()=>{assert.equal(typeof api?.readFiniteQaBootstrapPrimary,'function');return (await import('./fixtures/finite-bootstrap-world.mjs')).bootstrapWorld();};
+const read=f=>api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'reader',now:Date.now,expected:f.expected});
+test('primary reader qualifies actual successful step/job facts after issuer deadline',async()=>{
+ const f=await world();const p=await api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'reader',now:()=>f.record.Pend+1000,expected:f.expected});
+ assert.equal(p.jobId,789);assert(p.jobCompletedAt<f.record.Pend);
+});
+for(const mode of ['owner','body','repo','branch','workflow','attempt','run-not-complete','job-not-complete','step-not-complete','step-name','step-time','job-time','future-completion','source-tree','source-file','file-size','file-blob','expected-hash','main','duplicate-job','truncated-jobs','observation-before-step'])test('primary rejects '+mode,async()=>{
+ const f=await world(),r=f.record;
+ if(mode==='owner')f.comment.user.id=1;
+ if(mode==='body')f.comment.body+=' ';
+ if(mode==='repo')f.run.repository.id=1;
+ if(mode==='branch')f.run.head_branch='other';
+ if(mode==='workflow')f.run.path='.github/workflows/other.yml';
+ if(mode==='attempt')f.run.run_attempt=2;
+ if(mode==='run-not-complete')f.run.status='in_progress';
+ if(mode==='job-not-complete')f.job.status='in_progress';
+ if(mode==='step-not-complete')f.step.status='in_progress';
+ if(mode==='step-name')f.step.name='seed-material';
+ if(mode==='step-time')f.step.started_at=new Date(r.P0-1).toISOString();
+ if(mode==='job-time')f.job.completed_at=new Date(r.Pend).toISOString();
+ if(mode==='future-completion')f.job.completed_at=new Date(Date.now()+10000).toISOString();
+ if(mode==='source-tree')f.map.get('/git/commits/'+r.sourceRevision).tree.sha='0'.repeat(40);
+ const file=f.map.get('/contents/'+r.workflowPath+'?ref='+r.sourceRevision);
+ if(mode==='source-file')file.content=Buffer.from('other').toString('base64');
+ if(mode==='file-size')file.size++;
+ if(mode==='file-blob')file.sha='0'.repeat(40);
+ if(mode==='expected-hash')f.expected.workflowHash='0'.repeat(64);
+ if(mode==='main')f.map.get('/git/ref/heads/main').object.sha='0'.repeat(40);
+ const jobs=f.map.get('/actions/runs/456/attempts/1/jobs?per_page=100');
+ if(mode==='duplicate-job'){jobs.jobs.push(structuredClone(f.job));jobs.total_count++;}
+ if(mode==='truncated-jobs')jobs.total_count++;
+ if(mode==='observation-before-step')r.observedAt=r.stepStartedAt-1;
+ await assert.rejects(read(f));
+});
+test('issuer cannot claim its own future step/job completion',async()=>{
+ const f=await world();
+ await assert.rejects(api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'issuer',now:Date.now,expected:f.expected}));
+ f.issuer();f.record.observedAt=Date.now();
+ const p=await api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'issuer',now:Date.now,expected:f.expected});
+ assert.equal(p.stepCompletedAt,undefined);
+ await assert.rejects(read(f));
+});
+
+test('issuer primary treats original observation as historical within step and Pend',async()=>{
+ const f=await world();f.issuer();
+ assert(Date.now()-f.record.observedAt>5000);
+ const result=await api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'issuer',now:Date.now,expected:f.expected});
+ assert.equal(result.stepStartedAt,f.record.stepStartedAt);
+});
+for(const value of ['nan','infinity','future','before-step','at-Pend'])test('issuer historical observation still rejects '+value,async()=>{
+ const f=await world();f.issuer();
+ f.record.observedAt=value==='nan'?NaN:value==='infinity'?Infinity:value==='future'?Date.now()+3000:value==='before-step'?f.record.stepStartedAt-1:f.record.Pend;
+ await assert.rejects(api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'issuer',now:Date.now,expected:f.expected}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-bootstrap.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-bootstrap.test.mjs b/test/mcp-qa-finite-bootstrap.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-bootstrap.test.mjs
@@ -0,0 +1,76 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {finitePublicStaticExpectation,finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+let recordApi,admissionApi;
+try{recordApi=await import('../lib/mcp-qa-finite-bootstrap-record.mjs');}catch{/* behavioral RED: product absent */}
+try{admissionApi=await import('../lib/mcp-qa-finite-bootstrap-admission.mjs');}catch{/* behavioral RED: product absent */}
+const M='a'.repeat(40),UUID='11111111-1111-4111-8111-111111111111';
+function record(){
+ const P0=Date.now()-1000;
+ return {purpose:'afw.finite-qa-bootstrap.v1',repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,sourceRevision:M,sourceTree:'b'.repeat(40),sourceCheck:'git-inputs-and-configuration-before-after-v1',workflowHash:'c'.repeat(64),cliHash:'d'.repeat(64),commandId:123,runId:456,jobId:789,attempt:1,workflowPath:'.github/workflows/afw-finite-qa-bootstrap.yml',job:'publish',step:'qa-bootstrap-provenance',P0,Pend:P0+300000,jobStartedAt:P0+100,stepStartedAt:P0+200,observedAt:P0+500,qaLive:{versionId:UUID,deploymentId:'22222222-2222-4222-8222-222222222222',module:{name:'index.mjs',sha256:'e'.repeat(64),bytes:123,exports:[...finitePublicProfileTemplate('qaLive').exports]},publicStatic:finitePublicStaticExpectation('qaLive')}};
+}
+function command(){
+ const actor={id:290715446,login:'tokenizartinfo-ops',type:'User'},P0=Date.now()-1000;
+ return {event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},comment:{id:123,user:actor,author_association:'OWNER',body:'/afw-qa-finite-bootstrap v1 '+M,created_at:new Date(P0).toISOString()},sender:actor},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'456',runAttempt:'1',sourceRevision:M},now:Date.now};
+}
+test('canonical record roundtrip commits only exact QA-live public technical facts',()=>{
+ assert.equal(typeof recordApi?.encodeFiniteQaBootstrap,'function');
+ const r=record(),encoded=recordApi.encodeFiniteQaBootstrap(r),decoded=recordApi.decodeFiniteQaBootstrap(encoded);
+ assert.deepEqual(decoded.record,r);assert.match(decoded.recordHash,/^[a-f0-9]{64}$/);
+ assert.equal(recordApi.encodeFiniteQaBootstrap({...r,qaLive:{...r.qaLive}}),encoded);
+ assert(Object.isFrozen(decoded.record.qaLive.module));
+ assert(Buffer.byteLength(encoded)<=16384);
+});
+for(const mutation of ['private','accessor','symbol','prototype','wrong-role','wrong-export','wrong-static','clock','uuid-prefix','oversize','source-check'])test('exact bootstrap record denies '+mutation,()=>{
+ assert.equal(typeof recordApi?.validateFiniteQaBootstrap,'function');const r=record();
+ if(mutation==='private')r.controlHash='f'.repeat(64);
+ if(mutation==='accessor')Object.defineProperty(r,'workflowHash',{enumerable:true,get(){throw Error('must not execute');}});
+ if(mutation==='symbol')r[Symbol('private')]=1;
+ if(mutation==='prototype')Object.setPrototypeOf(r,{});
+ if(mutation==='wrong-role')r.qaClosed=r.qaLive;
+ if(mutation==='wrong-export')r.qaLive.module.exports=['default'];
+ if(mutation==='wrong-static')r.qaLive.publicStatic={...r.qaLive.publicStatic,profileHash:'0'.repeat(64)};
+ if(mutation==='clock')r.observedAt=r.Pend;
+ if(mutation==='uuid-prefix')r.qaLive.versionId=r.qaLive.versionId.slice(0,8);
+ if(mutation==='oversize')r.qaLive.module.bytes=3145729;
+ if(mutation==='source-check')r.sourceCheck='git-inputs-before-after-v1';
+ assert.throws(()=>recordApi.validateFiniteQaBootstrap(r));
+});
+test('record decoder denies changed body, noncanonical wire, hash mismatch and extras',()=>{
+ assert.equal(typeof recordApi?.encodeFiniteQaBootstrap,'function');
+ const encoded=recordApi.encodeFiniteQaBootstrap(record()),v=JSON.parse(encoded);
+ for(const bad of [encoded+' ',JSON.stringify({...v,private:'no'}),encoded.replace('"index.mjs"','"other.mjs"')])assert.throws(()=>recordApi.decodeFiniteQaBootstrap(bad));
+});
+test('dedicated admission preserves P0 and excludes finite confirmation and caller DTO authority',()=>{
+ assert.equal(typeof admissionApi?.validateQaBootstrapCommand,'function');
+ const input=command(),a=admissionApi.validateQaBootstrapCommand(input);
+ assert.equal(a.P0,Date.parse(input.event.comment.created_at));assert.equal(a.Pend,a.P0+300000);
+ assert.equal(a.T0,undefined);assert.equal(a.expiresAt,undefined);assert.equal(a.authorizesEffects,false);
+ assert.equal(admissionApi.assertQaBootstrapAdmission(a),a);
+ assert.throws(()=>admissionApi.assertQaBootstrapAdmission({...a}));
+ input.event.comment.body='/afw-qa-finite-confirmation v1 '+M;
+ assert.throws(()=>admissionApi.validateQaBootstrapCommand(input));
+});
+for(const mutation of ['owner','repo','branch','attempt','event','issue','pull-request','future','expired'])test('bootstrap admission rejects '+mutation,()=>{
+ assert.equal(typeof admissionApi?.validateQaBootstrapCommand,'function');const c=command();
+ if(mutation==='owner')c.event.sender={...c.event.sender,id:1};
+ if(mutation==='repo')c.context.repositoryId='1';
+ if(mutation==='branch')c.context.ref='refs/heads/other';
+ if(mutation==='attempt')c.context.runAttempt='2';
+ if(mutation==='event')c.event.action='edited';
+ if(mutation==='issue')c.event.issue.number=1;
+ if(mutation==='pull-request')c.event.issue.pull_request={};
+ if(mutation==='future')c.event.comment.created_at=new Date(Date.now()+60000).toISOString();
+ if(mutation==='expired')c.event.comment.created_at=new Date(Date.now()-300000).toISOString();
+ assert.throws(()=>admissionApi.validateQaBootstrapCommand(c));
+});
+
+test('D0.1 old sealed QA public binding commitment is rejected by actual bootstrap codec',()=>{
+ const old=record(),qa=finitePublicProfileTemplate('qaLive');
+ const prior=qa.bindings.filter(x=>x.name!=='AFW_FINITE_OWNER_OAUTH_KV');
+ const oldHash=initialHash('afw.finite-public-bindings.v1',prior);
+ assert.notEqual(oldHash,old.qaLive.publicStatic.bindingsHash);
+ old.qaLive.publicStatic={...old.qaLive.publicStatic,bindingsHash:oldHash};
+ assert.throws(()=>recordApi.encodeFiniteQaBootstrap(old));
+});

~~~~~~~~~~

## test/mcp-qa-finite-canary-restorer.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-canary-restorer.test.mjs b/test/mcp-qa-finite-canary-restorer.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-canary-restorer.test.mjs
@@ -0,0 +1,60 @@
+import {createCanaryRestorationTransport} from '../lib/mcp-canary-restoration-transport.mjs';
+import {finiteCleanupPolicy} from '../lib/mcp-finite-cleanup-policy.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {finiteRestorationFixture} from './fixtures/finite-restoration.mjs';
+import {readFiniteTrialAfwWorkflows} from '../lib/mcp-fixed-terminal-workflows.mjs';
+const api=await import('../lib/mcp-qa-finite-canary-restorer.mjs').catch(()=>({}));
+const inventory=await import('../lib/mcp-finite-primary-inventory.mjs').catch(()=>({}));
+test('finite restore uses retained proof and exact closed bytes once; lost POST only reconciles',async()=>{
+ for(const lost of [false,true]){
+  const f=await finiteRestorationFixture();f.state.lostPost=lost;
+  const restorer=api.createPrivateQaFiniteCanaryRestorer(f.options);
+  if(lost)await assert.rejects(()=>restorer.execute(f.input));else assert.equal((await restorer.execute(f.input)).proofHash,f.input.proofHash);
+  assert.equal(f.posts,1);await assert.rejects(()=>api.createPrivateQaFiniteCanaryRestorer(f.options).execute(f.input));assert.equal(f.posts,1);
+  const r=await api.createPrivateQaFiniteCanaryRestorer(f.options).reconcile(f.input);assert.equal(r.versionId,f.identity.plan.deployments.canaryClosed.versionId);assert.equal(f.posts,1);
+ }
+});
+for(const mode of ['running','nominal','extra','pointer','module','closedflag','proof']){
+ test('finite restore rejects '+mode+' before POST',async()=>{
+  const f=await finiteRestorationFixture();
+  if(mode==='running')f.state.providerRunning=true;
+  if(mode==='nominal')f.state.nominal='running';
+  if(mode==='extra')f.state.extra=true;
+  if(mode==='pointer')f.old.state.canary.id='ffffffff-ffff-4fff-8fff-ffffffffffff';
+  if(mode==='module')f.old.state.closed.modules[0].content_base64=Buffer.from('changed').toString('base64');
+  if(mode==='closedflag')f.old.state.closed.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';
+  if(mode==='proof')f.options.proofStore={read:async()=>({status:'not_yet_observed'})};
+  await assert.rejects(()=>api.createPrivateQaFiniteCanaryRestorer(f.options).execute(f.input));assert.equal(f.posts,0);
+ });
+}
+test('phase inventory allows exact observer during canary restore, requires its completion for QA',async()=>{
+ const f=await finiteRestorationFixture(),options={read:async(path,query)=>{const r=await f.request({method:'GET',path:f.ROOT+path,query});return {value:r.result,info:r.result_info};},assertCurrent:()=>{},phase:'canary_restore',confirmationId:f.identity.plan.workflows.confirmation,observerId:f.identity.plan.workflows.bootstrap,qualifiedExecution:f.qualifiedExecution};
+ assert.equal((await readFiniteTrialAfwWorkflows(options)).instanceCount,3);
+ await assert.rejects(()=>readFiniteTrialAfwWorkflows({...options,phase:'qa_restore'}));f.state.observer='complete';assert.equal((await readFiniteTrialAfwWorkflows({...options,phase:'qa_restore'})).instanceCount,3);
+ f.state.extra=true;await assert.rejects(()=>readFiniteTrialAfwWorkflows(options));
+});
+test('exact approved module digest alone does not grant static closed-profile compatibility',async()=>{
+ const f=await finiteRestorationFixture(),v=structuredClone(f.old.state.closed),pin=f.identity.plan.deployments.canaryClosed;
+ assert.equal(inventory.qualifyFiniteWorkerVersion({metadata:v,pin,role:'canary',closed:true}).moduleHash,pin.module.sha256);
+ v.bindings.push({name:'NEW_ENABLED',type:'plain_text',text:'true'});assert.throws(()=>inventory.qualifyFiniteWorkerVersion({metadata:v,pin,role:'canary',closed:true}));
+});
+
+test('finite-only transport keeps fixed all-state inventory and restoration body allowlists',async()=>{
+ const f=await finiteRestorationFixture(),raw=JSON.stringify(finiteCleanupPolicy(f.identity.plan));let sends=0;
+ const request=createCanaryRestorationTransport({finiteTrial:f.identity,readControl:()=>({enabled:true,policy:raw}),readReadCredential:async()=>'synthetic-reader-token',readPublishCredential:async()=>'synthetic-publisher-token',now:f.f.now,fetchImpl:async(url,init)=>{sends++;const u=new URL(url),r=await f.request({method:init.method,path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,['per_page','page'].includes(k)?Number(v):v])),...(init.body?{body:JSON.parse(init.body)}:{})});const {status,...body}=r;return Response.json(body,{status});}});
+ const x={method:'GET',path:f.ROOT+'/containers/applications/'+f.identity.plan.resources.applicationId+'/instances-v2',query:{per_page:100},signal:new AbortController().signal};
+ assert.equal((await request(x)).result.length,0);
+ await assert.rejects(()=>request({...x,query:{state:'active',per_page:100}}));assert.equal(sends,1);
+ assert.equal((await request({method:'GET',path:f.ROOT+'/workflows',query:{per_page:100,page:1},signal:x.signal})).result.length,3);
+ const restorer=api.createPrivateQaFiniteCanaryRestorer({...f.options,request});assert.equal((await restorer.execute(f.input)).proofHash,f.input.proofHash);assert.equal(f.posts,1);
+});
+
+test('expired parent lease forbids a child restore POST even within the child C1 window',async()=>{
+ const f=await finiteRestorationFixture();let expired=false;
+ const request=async(...args)=>{const r=await f.request(...args);expired=true;return r;};
+ await assert.rejects(()=>api.createPrivateQaFiniteCanaryRestorer({...f.options,request}).execute(f.input,()=>{if(expired)throw Error('original guard lease ended');}));
+ assert.equal(f.posts,0);
+});
+
+for(const launcher of [null,'running','waiting','queued','unknown'])test('actual canary restoration denies absent or unresolved launcher '+launcher,async()=>{const f=await finiteRestorationFixture();f.state.launcher=launcher;await assert.rejects(()=>api.createPrivateQaFiniteCanaryRestorer(f.options).execute(f.input));assert.equal(f.posts,0);});

~~~~~~~~~~

## test/mcp-qa-finite-candidate-residency.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-candidate-residency.test.mjs b/test/mcp-qa-finite-candidate-residency.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-candidate-residency.test.mjs
@@ -0,0 +1,90 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {execFileSync} from 'node:child_process';
+import {createHash} from 'node:crypto';
+import {gzipSync,gunzipSync} from 'node:zlib';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
+import {buildMcpNodeProgram} from '../scripts/build-mcp-node-program.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex');
+const M=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
+const compiled=compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:M});
+const node=buildMcpNodeProgram();
+const decoder='lib/mcp-qa-finite-candidate-residency.mjs';
+async function bundle(envelope,program,tree,native=false){
+ const contents=native?
+  `import {readPrivateQaFiniteCandidate} from './${decoder}';import {createHash} from 'node:crypto';import {gzipSync,gunzipSync} from 'node:zlib';export default {fetch(){const x=readPrivateQaFiniteCandidate(),probe=gzipSync(new Uint8Array(4096)),unbounded=gunzipSync(probe).length;let boundedRejected=false;try{gunzipSync(probe,{maxOutputLength:16});}catch{boundedRejected=true;}return Response.json({nativeInflate:{unbounded,boundedRejected},module:x.module,sourceRevision:x.sourceRevision,sourceTree:x.sourceTree,sourceCheck:x.sourceCheck,programHash:x.programHash,decodedHash:createHash('sha256').update(x.bytes).digest('hex')});}};`:
+  `export {readPrivateQaFiniteCandidate} from './${decoder}';`;
+ const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*','cloudflare:*'],define:{
+  'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':JSON.stringify(envelope),
+  'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(M),
+  'globalThis.__AFW_FINITE_SOURCE_TREE__':JSON.stringify(tree),
+  'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(program)
+ }});return b.outputFiles[0].text;
+}
+let sequence=0;
+async function reader(e,program,tree){const code=await bundle(e,program,tree);return import('data:text/javascript;base64,'+Buffer.from(code+'\n//instance'+sequence++).toString('base64'));}
+test('real compiler creates QA-only exact candidate residency without hash cycle',async()=>{
+ const r=await compiled,n=await node,c=r.files['canaryLive/index.mjs'],q=r.files['qaLive/index.mjs'];
+ console.info('B1 measured '+JSON.stringify({sourceRevision:M,sourceTree:r.sourceTree,canaryBytes:c.length,qaBytes:q.length,canarySha256:sha(c),qaSha256:sha(q),programHash:n.programHash}));
+ assert(c.length<=2097152,'Known candidate 2MiB cap');assert(q.length<=3145728,'QA 3MiB cap');
+ const e=r.candidateResidency;assert(e,'actual source compiler must produce residency');
+ assert.deepEqual(Object.keys(e).sort(),['compressedBytes','compressedSha256','content','encoding','module','programHash','purpose','sourceCheck','sourceRevision','sourceTree']);
+ assert.deepEqual(Object.keys(e.module).sort(),['bytes','name','sha256']);
+ assert.deepEqual(e.module,{name:'index.mjs',sha256:sha(c),bytes:c.length});
+ assert.equal(e.sourceRevision,M);assert.equal(e.sourceTree,r.sourceTree);assert.equal(e.programHash,n.programHash);assert.equal(e.sourceCheck,'git-inputs-before-after-v1');
+ const zipped=Buffer.from(e.content,'base64');assert.equal(zipped.length,e.compressedBytes);assert.equal(sha(zipped),e.compressedSha256);assert.deepEqual(gunzipSync(zipped),c);assert.deepEqual(gzipSync(c,{level:9,mtime:0}),zipped);
+ for(const role of ['qaLive','canaryLive']){
+  const graph=r.metafiles[role],paths=Object.keys(graph.inputs),imports=[...Object.values(graph.inputs),...Object.values(graph.outputs)].flatMap(v=>v.imports??[]).map(v=>v.path);
+  assert.equal(paths.some(p=>/bootstrap-issuer|build-finite-native-package|node_modules\/esbuild/.test(p)),false,'issuer/compiler/esbuild forbidden in runtime graph');
+  assert.equal(imports.some(p=>/^(?:node:)?fs(?:\/|$)|(?:^|\/)esbuild(?:\/|$)/.test(p)),false,'filesystem/esbuild imports forbidden in runtime graph');
+  console.info('B2a runtime graph '+JSON.stringify({role,inputs:paths.length,issuerCompilerFsEsbuildAbsent:true}));
+ }
+ assert(r.metafiles.qaLive.inputs[decoder]);assert.equal(r.metafiles.canaryLive.inputs[decoder],undefined);
+ assert(q.includes(Buffer.from(e.content)));assert.equal(c.includes(Buffer.from(e.content)),false);
+ assert.equal(r.completePackage,false);assert.equal(r.manifest,undefined);assert.equal(r.operationalReadiness,false);
+ console.info('B1 resident metadata '+JSON.stringify({...e,content:undefined}));
+});
+test('actual fixed decoder returns fresh private bytes and independently checks compiled programM',async()=>{
+ const r=await compiled,n=await node,{readPrivateQaFiniteCandidate:read}=await reader(r.candidateResidency,n.program,r.sourceTree);
+ const first=read(),second=read();assert.deepEqual(Buffer.from(first.bytes),r.files['canaryLive/index.mjs']);
+ assert.notEqual(first.bytes,second.bytes);first.bytes[0]^=255;assert.equal(sha(read().bytes),r.candidateResidency.module.sha256);
+ assert(Object.isFrozen(first));assert(Object.isFrozen(first.module));assert.throws(()=>read({bytes:first.bytes}),/unavailable/);
+ await assert.rejects(reader(r.candidateResidency,n.program+'changed',r.sourceTree),/unavailable/);
+});
+test('fixed decoder rejects malformed encoding, metadata, limits and gzip ambiguity before use',async t=>{
+ const r=await compiled,n=await node,e=r.candidateResidency;assert(e,'real compiler envelope');
+ const zipped=bytes=>({content:bytes.toString('base64'),compressedBytes:bytes.length,compressedSha256:sha(bytes)});
+ const cases={
+  extra:x=>{x.authorized=true;},revision:x=>{x.sourceRevision='0'.repeat(40);},tree:x=>{x.sourceTree='0'.repeat(40);},
+  program:x=>{x.programHash='0'.repeat(64);},sourceCheck:x=>{x.sourceCheck='fixture';},exports:x=>{x.module.exports=[];},
+  base64:x=>{x.content+='\n';},digest:x=>{x.compressedSha256='0'.repeat(64);},length:x=>{x.compressedBytes++;},
+  decodedHash:x=>{x.module.sha256='0'.repeat(64);},decodedLength:x=>{x.module.bytes--;},cap:x=>{x.module.bytes=2097153;},
+  bomb:x=>{const bytes=Buffer.alloc(2097153,65);Object.assign(x,zipped(gzipSync(bytes,{level:9,mtime:0})));},
+  trailing:x=>{Object.assign(x,zipped(Buffer.concat([Buffer.from(x.content,'base64'),Buffer.from([0])])));},
+  concatenated:x=>{Object.assign(x,zipped(Buffer.concat([Buffer.from(x.content,'base64'),gzipSync(Buffer.alloc(0),{level:9,mtime:0})])));},
+  alternateCompression:x=>{Object.assign(x,zipped(gzipSync(r.files['canaryLive/index.mjs'],{level:1,mtime:0})));},
+ };
+ for(const [name,mutate] of Object.entries(cases))await t.test(name,async()=>{const x=structuredClone(e);mutate(x);await assert.rejects(reader(x,n.program,r.sourceTree),/unavailable/);});
+ const absent=await reader(null,n.program,r.sourceTree);assert.throws(()=>absent.readPrivateQaFiniteCandidate(),/unavailable/);
+});
+test('real workerd executes decoder with actual emitted candidate and exposes metadata only in test fixture',async()=>{
+ const r=await compiled,n=await node,script=await bundle(r.candidateResidency,n.program,r.sourceTree,true);
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']}));
+ try{const response=await mf.dispatchFetch('https://fixture.invalid');assert.equal(response.status,200);const x=await response.json();assert.deepEqual(x.nativeInflate,{unbounded:4096,boundedRejected:true});assert.deepEqual(x.module,r.candidateResidency.module);assert.equal(x.decodedHash,sha(r.files['canaryLive/index.mjs']));assert.equal(x.programHash,n.programHash);assert.equal(x.sourceRevision,M);assert.equal(x.sourceTree,r.sourceTree);assert.equal(x.bytes,undefined);assert.equal(x.script,undefined);assert.equal(x.content,undefined);}finally{await mf.dispose();}
+});
+
+test('workerd enforces bounded inflate and canonical single gzip member with actual decoder',async t=>{
+ const r=await compiled,n=await node;
+ for(const [name,bytes] of [
+  ['inflate cap',gzipSync(Buffer.alloc(2097153,65),{level:9,mtime:0})],
+  ['trailing gzip data',Buffer.concat([Buffer.from(r.candidateResidency.content,'base64'),Buffer.from([0])])],
+ ])await t.test(name,async()=>{
+  const e={...r.candidateResidency,content:bytes.toString('base64'),compressedBytes:bytes.length,compressedSha256:sha(bytes)};
+  const script=await bundle(e,n.program,r.sourceTree,true);
+  const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']}));
+  const rejected=e=>{assert.equal(e.code,'ERR_RUNTIME_FAILURE');assert.match(e.message,/Finite candidate residency unavailable/);return true;};
+  try{await assert.rejects(mf.ready,rejected);}finally{try{await mf.dispose();}catch(e){rejected(e);}}
+ });
+});

~~~~~~~~~~
