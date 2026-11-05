// Explicit SYN external history/provider clocks. All factual readers/codecs run intact.
export function extendFiniteOwnerPhaseContext(entry){
 const imports=String.raw`import {readPrivateQaFiniteOwnerContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';
import {readPrivateQaFiniteInitialAnchors as phaseAnchors} from './lib/mcp-qa-finite-initial-anchors.mjs';
import {createFiniteOwnerPreparationStore as phaseStore} from './lib/mcp-qa-finite-preparation-store.mjs';
import {hashFiniteOwnerEvidence as phaseEvidence,hashFinitePreparationRecord as phaseHash,hashFiniteOwnerPreparationProject as phaseProjectHash,encodeFinitePreparationRecord as phaseEncode} from './lib/mcp-qa-finite-preparation-records.mjs';
import {sealFinitePreparationCleanupRecord as phaseSealEnrollment,encodeFinitePreparationCleanupRecord as phaseEncodeEnrollment} from './lib/mcp-qa-finite-preparation-cleanup-records.mjs';
import {qualifyFinitePreparationEnrollmentFacts as phaseEnrollmentFacts} from './lib/mcp-qa-finite-preparation-enrollment-facts.mjs';
import {createFinitePolicyEffectJournal as phaseJournal} from './lib/mcp-qa-finite-policy-journal.mjs';
import {initialHash as phaseDigest} from './lib/mcp-qa-finite-initial-material-records.mjs';
import {finiteActivationConfigurationHash as phaseConfigurationHash} from './lib/mcp-activation-observer.mjs';
import {createFinitePreparationIssuerJournal as phaseIssuerJournal} from './lib/mcp-qa-finite-preparation-issuer-journal.mjs';
import {createFinitePreparationIssuerStore as phaseIssuerStore} from './lib/mcp-qa-finite-preparation-issuer-store.mjs';
import {sealFinitePreparationIssuerRecord as phaseSealIssuer,encodeFinitePreparationIssuerRecord as phaseEncodeIssuer} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';
import {createHash as phaseCreateHash} from 'node:crypto';
const phaseRawSha=x=>phaseCreateHash('sha256').update(x).digest('hex');
import {sealFiniteInitialUploadRecord as phaseSealUpload,encodeFiniteInitialUploadRecord as phaseEncodeUpload} from './lib/mcp-qa-finite-initial-upload-records.mjs';
`;
 const methods=String.raw` async seedPhaseFacts(kind='settled',delta=410000){
  const storage=this.ctx.storage,now=Date.now,capsule=JSON.parse(await storage.get('afw.finite-initial-preparation.v1:capsule')),offset=delta===null?0:capsule.I0+delta-now();
  Date.now=()=>now()+offset;const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'));
  try{
   const original=await readPrivateQaFiniteInitialOwnerSource({ctx:this.ctx,env:this.env,parent:parent.lease}),anchors=await phaseAnchors({ctx:this.ctx,env:this.env},parent.lease),source=original.source,at=Date.now(),id=capsule.preconnectionId;
   const realm=phaseEvidence('realm',{...source.access,origin:source.origin}),subject=phaseEvidence('subject',{accessRealmHash:realm,subject:anchors.material.ownerSelection.subject}),ticketHash='7'.repeat(64),projectRef='8'.repeat(64);
   const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash:subject,sourceRevision:source.sourceRevision,projectRef,connectionRef:null,preconnectionId:id,action:'connection',createdAt:at,expiresAt:capsule.C0};
   const map={projectRef,preconnectionId:id,subjectHash:subject,sourceRevision:source.sourceRevision,projectId:source.project.projectId,revision:source.project.revision,issuedAt:at,expiresAt:capsule.C0};
   const snapshot={preconnectionId:id,initialTicketHash:ticketHash,source};snapshot.sourceHash=phaseHash('OwnerSourceSnapshot',snapshot);
   const approval={purpose:'afw.finite-connection-approval.v1',subjectHash:subject,sourceRevision:source.sourceRevision,projectHash:phaseProjectHash(source.project),clientId:source.clientId,approvedAt:at,expiresAt:capsule.C0};
   approval.csrfReceiptHash=phaseEvidence('decision',{ticket,decision:'approve',projectHash:approval.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:at,expiresAt:capsule.C0});
   const pre={purpose:'afw.finite-connection-preparation.v1',preconnectionId:id,sourceRevision:source.sourceRevision,actorId:source.actorId,owner:{subject:anchors.material.ownerSelection.subject,accessRealmHash:realm,accessVerifiedAt:at,accessExpiresAt:capsule.C0},project:source.project,clientId:source.clientId,resource:source.resource,startedAt:at,expiresAt:capsule.C0,approvalHash:phaseHash('ConfigurationApproval',approval),baselineHash:phaseEvidence('baseline',source.initialBaseline)};
   pre.recordHash=phaseHash('Preconnection',pre);
   const stageApproval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection',ticketHash,approvalHash:pre.approvalHash};
   const store=phaseStore({storage,now:Date.now}),put=async(method,v)=>{const result=await store[method](v,parent.lease);if(result.status!=='recorded')throw Error('SYN seed '+method+' '+result.status);};
   await put('putOwnerSourceSnapshot',snapshot);if(kind==='snapshot-only')return {provenance:'SYN exact native snapshot prefix',preconnectionId:id};await put('putProjectRef',map);if(kind==='snapshot-map')return {provenance:'SYN exact native snapshot/project-ref prefix',preconnectionId:id};await put('putTicket',ticket);await put('putConfigurationApproval',approval);await put('consumeTicket',{ticketHash,recordHash:approval.csrfReceiptHash});await put('putPreconnection',pre);await put('putStageApproval',stageApproval);
   if(kind==='approval')return {provenance:'SYN evidence via actual preparation store',preconnectionId:id};
   const p=anchors.plan,r=anchors.records,c=anchors.capsule,values={capsuleHash:c.capsuleHash,planHash:p.recordHash,armAckHash:r['arm-ack'].recordHash,activationCompletionHash:r['activation-completion'].recordHash,entryHash:c.entryHash,materialHash:c.materialHash,actorId:anchors.actorId,ownerSourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHash:phaseHash('StageApproval',stageApproval),configurationApprovalHash:phaseHash('ConfigurationApproval',approval),issuedAt:Date.now()};values.deadline=values.issuedAt+5000;
   for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])values[k]=c[k];
   for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])values[k]=p[k];
   const enrollment=phaseSealEnrollment('Enrollment',values),ack=phaseSealEnrollment('Ack',{enrollmentHash:enrollment.recordHash,stateHash:anchors.zero.recordHash,alarmAt:c.C0,acknowledgedAt:Date.now()});
   await storage.put('afw.finite-preparation-cleanup.v1:enrollment',phaseEncodeEnrollment('Enrollment',enrollment));
   if(kind!=='enrollment-no-ack')await storage.put('afw.finite-preparation-cleanup.v1:ack',phaseEncodeEnrollment('Ack',ack));
   const use=(await store.readTicketUse({ticketHash},parent.lease)).record;
   const facts={anchors,enrollment,ack,preconnection:pre,sourceSnapshot:snapshot,stageApproval,approval,ticket,ticketUse:use,projectRef:map};
   phaseEnrollmentFacts(facts);this.phaseSeededFacts=facts;
   if(['enrollment','enrollment-no-ack'].includes(kind))return {provenance:'SYN enrollment DATA',preconnectionId:id};
   const contextHash=phaseDigest('afw.finite-connection-context.v1',{preconnection:pre,stageApproval,predecessors:[],grant:null,notice:null}),identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'};
   const cfg=structuredClone(p.configuration);if(kind!=='settled-original')cfg.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
   const journal=effect=>phaseJournal({storage,identity:{...identity,effect},now:Date.now});
   const versionId=kind==='settled-original'?c.activatedVersionId:'77777777-7777-4777-8777-777777777777',deploymentId=kind==='settled-original'?c.activatedDeploymentId:'88888888-8888-4888-8888-888888888888';
   let activation;
   for(const effect of ['upload','activation']){
    const send={purpose:'afw.finite-connection-send.v1',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection',contextHash,effect,baselineVersionId:c.activatedVersionId,baselineDeploymentId:c.activatedDeploymentId,requestHash:'6'.repeat(64),issuedAt:Date.now(),deadline:Date.now()+5000},j=journal(effect);
    if((await j.issue(send,parent.lease)).status!=='recorded')throw Error('SYN journal SEND');
    if(kind==='upload-send'&&effect==='upload'||kind==='activation-send'&&effect==='activation')return {provenance:'SYN unresolved SEND',preconnectionId:id};
    const ack={purpose:'afw.finite-connection-ack.v1',sendHash:phaseHash('ConnectionSend',send),resourceId:effect==='upload'?versionId:deploymentId,acknowledgedAt:Date.now()};
    if((await j.acknowledge(ack,parent.lease)).status!=='recorded')throw Error('SYN journal ACK');
    if(kind==='upload-ack'&&effect==='upload')return {provenance:'SYN upload ACK',preconnectionId:id};
    if(effect==='activation')activation=j;
   }
   const receipt={purpose:'afw.finite-connection-installed.v1',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection',baselineVersionId:c.activatedVersionId,baselineDeploymentId:c.activatedDeploymentId,versionId,deploymentId,moduleHash:c.moduleHash,configurationHash:phaseConfigurationHash(cfg),completedAt:Date.now()};receipt.receiptHash=phaseHash('ConnectionReceipt',receipt);
   if((await activation.finish(receipt,parent.lease)).status!=='recorded')throw Error('SYN journal receipt');
   await storage.sync();return {provenance:'SYN external publication evidence; real native journals',receipt,configuration:cfg};
  }catch(e){return {fixtureError:String(e),stack:e.stack};}finally{parent.finish();Date.now=now;}
 }
 async phaseEnrollmentMutations(){
  const original=this.phaseSeededFacts;if(!original)throw Error('SYN facts absent');
  const results={exact:!!phaseEnrollmentFacts(original),nullAck:phaseEnrollmentFacts({...original,ack:null}).ack===null};
  for(const key of ['capsuleHash','planHash','stateHash','decision','subject','project','originalA','ackHash','extra','accessor','symbol','zero-state']){
   const f=structuredClone(original);let accessorExecuted=false;
   if(['capsuleHash','planHash'].includes(key)){const v={...f.enrollment};delete v.purpose;delete v.recordHash;v[key]='f'.repeat(64);f.enrollment=phaseSealEnrollment('Enrollment',v);}
   if(key==='stateHash'||key==='ackHash'){const v={...f.ack};delete v.purpose;delete v.recordHash;v[key==='stateHash'?'stateHash':'enrollmentHash']='f'.repeat(64);f.ack=phaseSealEnrollment('Ack',v);}
   if(key==='decision')f.ticketUse.recordHash='f'.repeat(64);
   if(key==='subject')f.ticket.subjectHash='f'.repeat(64);
   if(key==='project')f.projectRef.revision++;
   if(key==='originalA')f.stageApproval.preconnectionId='f'.repeat(64);
   if(key==='extra')f.anchors.material.ownerSelection.extra='SYN unknown';
   if(key==='symbol')f.ticket[Symbol('SYN unknown')]=1;
   if(key==='accessor')Object.defineProperty(f.ticket,'subjectHash',{enumerable:true,get(){accessorExecuted=true;return 'f'.repeat(64);}});
   if(key==='zero-state')f.anchors.zero.recordHash='f'.repeat(64);
   try{phaseEnrollmentFacts(f);results[key]=false;}catch{results[key]=true;}if(accessorExecuted)results[key]=false;
  }return results;
 }
 async phaseCorrupt(kind){
  const s=this.ctx.storage,rows=[...await s.list()],capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]),prefix='connection-preparation:'+capsule.preconnectionId+':';
  if(kind.startsWith('missing-')){const suffix=kind.slice(8),key=rows.find(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&(suffix==='chunk'?k.includes(':chunk:'):k.endsWith(':'+suffix)))?.[0];if(!key)throw Error('SYN missing key');await s.delete(key);}
  else if(kind.startsWith('tamper-')){const suffix=kind.slice(7),[key,raw]=rows.find(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&(suffix==='chunk'?k.includes(':chunk:'):k.endsWith(':'+suffix)));await s.put(key,raw+' ');}
  else if(kind.startsWith('mismatch-')){
   const name=kind.slice(9),isChunk=name==='chunk-manifest',entry=rows.find(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&(isChunk?k.includes(':chunk:'):k.endsWith(':receipt'))),v=JSON.parse(entry[1]);delete v.purpose;delete v.recordHash;
   if(name==='receipt-material')v.materialHash='f'.repeat(64);else if(name==='receipt-manifest'||isChunk)v.manifestHash='f'.repeat(64);else if(name==='receipt-baseline')v.baselineDeploymentId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';else throw Error('SYN mismatch');
   await s.put(entry[0],phaseEncodeUpload(isChunk?'Chunk':'Receipt',phaseSealUpload(isChunk?'Chunk':'Receipt',v)));
  }
  else if(kind==='orphan-ticket-use'){const snap=JSON.parse(await s.get(prefix+'source'));await s.put('owner-ticket:'+snap.initialTicketHash+':use',phaseEncode('TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',ticketHash:snap.initialTicketHash,recordHash:'f'.repeat(64),consumedAt:capsule.I0+410000}));}
  else if(kind==='foreign-snapshot'||kind==='stale-snapshot'){const snap=JSON.parse(await s.get(prefix+'source'));if(kind==='foreign-snapshot')snap.preconnectionId='f'.repeat(64);else snap.source.project.revision++;snap.sourceHash=phaseHash('OwnerSourceSnapshot',snap);await s.put(prefix+'source',phaseEncode('OwnerSourceSnapshot',snap));}
  else if(kind==='issuer-ack'){const row=rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':ack')),v=JSON.parse(row[1]);v.sendHash='f'.repeat(64);delete v.recordHash;await s.put(row[0],phaseEncodeIssuer('Ack',phaseSealIssuer('Ack',v)));}
  else if(kind==='later-approval')await s.put(prefix+'notices:approval','SYN unsupported');
  else if(kind==='extra')await s.put(prefix+'unknown','SYN unknown');
  else if(kind==='writer-head')await s.put('afw.finite-policy-effect.v1:writer-head',JSON.stringify({identityHash:'f'.repeat(64),sendHash:'f'.repeat(64)}));
  else if(kind==='orphan-grant')await s.put(prefix+'grant','SYN orphan');
  else if(kind==='orphan-receipt'||kind==='orphan-ack'){const row=rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'));await s.delete(row[0]);}
  else if(kind==='foreign-A'){const key=prefix+'connection:approval',v=JSON.parse(await s.get(key));v.preconnectionId='f'.repeat(64);await s.put(key,phaseEncode('StageApproval',v));}
  else if(kind==='contextHash'){for(const [key,raw]of rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'))){const v=JSON.parse(raw);v.contextHash='f'.repeat(64);await s.put(key,phaseEncode('ConnectionSend',v));}}
  else throw Error('SYN unknown mutation');
  await s.sync();
 }
 async seedPhaseIssuer(kind='reservation'){
  const f=this.phaseSeededFacts;if(!f)throw Error('SYN phase facts absent');
  const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'));
  try{
   const c=f.anchors.capsule,pre=f.preconnection,at=Date.now(),identity=phaseSealIssuer('Identity',{preconnectionId:c.preconnectionId,enrollmentHash:f.enrollment.recordHash,capsuleHash:c.capsuleHash,sourceRevision:c.sourceRevision,qaVersionId:c.qaVersionId,actorId:pre.actorId,subject:pre.owner.subject,accessRealmHash:pre.owner.accessRealmHash,projectId:pre.project.projectId,projectRevision:pre.project.revision,clientId:pre.clientId,resource:pre.resource,authorizationHash:'5'.repeat(64),grantId:'99999999-9999-4999-8999-999999999999',requestedScopes:['afw:project:read'],consentExpiresAt:new Date(c.C0).toISOString(),I0:c.I0,C0:c.C0,C1:c.C1,reservedAt:at});
   const journal=phaseIssuerJournal({ctx:this.ctx,env:this.env}),store=phaseIssuerStore({ctx:this.ctx,env:this.env}),reservation=phaseSealIssuer('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity,requestHash:'4'.repeat(64),issuedAt:at,deadline:at+5000});
   if((await journal.appendReservation(reservation,parent.lease)).status!=='recorded')throw Error('SYN issuer reservation');
   this.phaseIssuerIdentity=identity;if(kind==='reservation')return {provenance:'actual issuer journal; SYN original identity',identity};
   const step=async(operation,fn)=>{
    const time=Date.now(),window={startedAt:time,deadline:time+5000},send=phaseSealIssuer('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:identity.identityHash,reservationHash:reservation.recordHash,operation,requestId:null,requestHash:'3'.repeat(64),issuedAt:time,deadline:window.deadline});
    if((await journal.appendSend({preconnectionId:c.preconnectionId,record:send},parent.lease)).status!=='recorded')throw Error('SYN issuer send');
    if(kind==='unknown-'+operation)return null;
    const result=await fn(window),row=result?.row??result;
    if(!row||result?.status==='no_mutation')throw Error('SYN actual issuer operation did not apply '+operation);
    const ack=phaseSealIssuer('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:send.recordHash,rowHash:phaseDigest('afw.finite-preparation-issuer-row.v1',row),outcome:'applied',observedAt:Date.now()});
    if((await journal.appendAck({preconnectionId:c.preconnectionId,operation,record:ack},parent.lease)).status!=='recorded')throw Error('SYN issuer ack');
    return row;
   };
   await step('open_fence',window=>store.openFence({identity,window},parent.lease));if(['open','unknown-open_fence'].includes(kind))return {identity};
   await step('authorization',window=>store.insertAuthorization({identity,window},parent.lease));if(['authorization','unknown-authorization'].includes(kind))return {identity};
   const pstore=phaseStore({storage:this.ctx.storage,now:Date.now}),link={preconnectionId:c.preconnectionId,authorizationHash:identity.authorizationHash,subjectHash:f.ticket.subjectHash,sourceRevision:c.sourceRevision,projectRef:f.ticket.projectRef,clientId:pre.clientId,resource:pre.resource,issuedAt:Date.now(),expiresAt:c.C0};
   if((await pstore.putAuthorizationLink(link,parent.lease)).status!=='recorded')throw Error('SYN authorization link');
   const consumed=await step('consume',window=>store.consumeAuthorization({identity,window,consumedAt:new Date().toISOString()},parent.lease));if(['consumed','unknown-consume'].includes(kind))return {identity};
   await step('grant',window=>store.insertReadGrant({identity,window,consumption:consumed,grant:{scopes:['afw:project:read'],createdAt:new Date().toISOString(),expiresAt:new Date(c.C0).toISOString()}},parent.lease));if(['grant','unknown-grant'].includes(kind))return {identity};
   const grantLink={preconnectionId:c.preconnectionId,authorizationHash:identity.authorizationHash,grantId:identity.grantId,grantHash:phaseRawSha(identity.grantId),acceptedAt:Date.now()};
   if((await pstore.putLink({kind:'grant',record:grantLink},parent.lease)).status!=='recorded')throw Error('SYN grant link');
   const connectionRef='2'.repeat(64),linkedAt=Date.now(),relation={preconnectionId:c.preconnectionId,connectionRef,grantHash:grantLink.grantHash,linkedAt},connection={connectionRef,subject:pre.owner.subject,grantId:identity.grantId,clientId:pre.clientId,projectId:pre.project.projectId,resource:pre.resource,issuedAt:linkedAt,expiresAt:c.C0};
   if((await pstore.putPreconnectionConnection({relation,connection},parent.lease)).status!=='recorded')throw Error('SYN connection pair');
   return {identity,provenance:'actual D1/store mutation with real SQL clock; synthetic isolated evidence'};
  }catch(e){return {fixtureError:String(e),stack:e.stack};}finally{parent.finish();}
 }
 async removePhaseIssuerFixture(){for(const [key]of await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:'}))await this.ctx.storage.delete(key);await this.ctx.storage.sync();}
`;
 const start=entry.indexOf(' async ownerSourceRead('),end=entry.indexOf(' async ownerEffectCount()',start);
 if(start<0||end<start)throw Error('Original native request harness missing');
 let method=entry.slice(start,end).replace('async ownerSourceRead(','async phaseContextRead(').replaceAll('readPrivateQaFiniteInitialOwnerSource(','readPrivateQaFiniteOwnerContext(');
 // These legacy regressions intentionally hold ONE actual operation. Concurrent
 // source credentials must not overwrite the single release RPC's callback.
 const heldNeedle="if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{";
 const heldReplacement="if(['held-fetch','held-body','held-cancel'].includes(mode)){let phaseHeld=false;const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{if(phaseHeld)return response;phaseHeld=true;";
 if(method.split(heldNeedle).length!==2)throw Error('SYN exact phase held-operation hook changed');
 method=method.replace(heldNeedle,heldReplacement);

 // Read-only journal transactions are real transactions; mutation methods throw.
 method=method.replace("s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;","s.put=noWrite;s.delete=noWrite;s.sync=noWrite;s.transaction=fn=>Reflect.apply(transaction,s,[tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:noWrite,delete:noWrite,setAlarm:noWrite,deleteAlarm:noWrite})]);");
 method=method.replace('put=s.put,transaction=', 'put=s.put,del=s.delete,transaction=').replace('s.put=put;s.transaction=', 's.put=put;s.delete=del;s.transaction=');
 // Every independent current observation must begin with SELECT, never PRAGMA.
 method=method.replace('this.ownerRestore=restore;', `this.ownerRestore=restore;
  this.phasePrimary=[];db.withSession=(constraint)=>{if(constraint!=='first-primary')throw Error('SYN non-primary');const session=Reflect.apply(withSession,db,[constraint]),prepare=session.prepare,queries=[];this.phasePrimary.push(queries);session.prepare=sql=>{if(!/^SELECT\\b/i.test(sql.trim()))throw Error('SYN non-read/first SQL');queries.push(sql);if(mode==='schema-failure'&&sql.includes('FROM sqlite_schema'))throw Error('SYN failed schema read');return Reflect.apply(prepare,session,[sql]);};return session;};`);
 method=method.replace('catch{return{status:', 'catch(e){return{fixtureError:String(e),status:');
 return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods+method+" async phasePrimaryReads(){return this.phasePrimary;}\n");
}

/** Seed the existing history through native D1 with the accepted ordinary
 * issuer column defaults from the start. No rename/drop of referenced history. */
export async function seedFiniteOwnerPhaseHistory(db,history,seedHistory){
 const needle='revoked_at TEXT,exchanged_at TEXT)',replacement="revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')";
 let adjusted=false;
 const setupDb={prepare:sql=>db.prepare(sql),exec:sql=>{
  if(sql.includes('CREATE TABLE delegated_access_grants')){if(adjusted||sql.split(needle).length!==2)throw Error('SYN grant schema drift');adjusted=true;sql=sql.replace(needle,replacement);}
  return db.exec(sql);
 }};
 await seedHistory(setupDb,history);if(!adjusted)throw Error('SYN grant schema not initialized');
 await db.prepare("CREATE TABLE delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')").run();
}
