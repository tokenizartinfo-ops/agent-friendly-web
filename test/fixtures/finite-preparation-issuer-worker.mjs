import {initialHash as hash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
import {createDossierMonitoringAuthorization} from '../../lib/dossier-monitoring-authority.mjs';
import {DurableObject} from 'cloudflare:workers';
import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA as schema} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
import {createFinitePreparationIssuerJournal} from '../../lib/mcp-qa-finite-preparation-issuer-journal.mjs';
import {sealFinitePreparationIssuerRecord as seal,FINITE_PREPARATION_ISSUER_PREFIX as P} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
// SYN internal identities/lease/queue faults, REAL native D1 SQL time and DO transactions.
// No SDK approval, capsule validity or source authority is inferred.
export class FiniteIssuerFixture extends DurableObject{
 async fetch(request){
  const b=await request.json(),db=this.env.RELEASE_DB,events=[];
  const exec=async(sql,...args)=>db.prepare(sql).bind(...args).run();
  await exec('CREATE TABLE IF NOT EXISTS site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
  await exec("CREATE TABLE IF NOT EXISTS delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
  await exec("CREATE TABLE IF NOT EXISTS delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
  if(b.case!=='missing_schema')for(const sql of schema)await exec(sql);
  if(b.case.startsWith('notice-'))for(const sql of b.monitoringSchema)await exec(sql);
  const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms;
  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+(b.case.startsWith('notice-')?24000:12000)).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
  const i=b.case.startsWith('notice-')&&b.ceiling==='C0'?seal('Identity',{...identity,I0:at-897000,C0:at+3000,C1:at+183000,consentExpiresAt:new Date(at+3000).toISOString()}):b.case.startsWith('notice-')&&b.ceiling==='consent'?seal('Identity',{...identity,consentExpiresAt:new Date(at+3000).toISOString()}):['C0_queue','expired_cleanup','C0_grant_queue'].includes(b.case)?seal('Identity',{...identity,I0:at-899200,C0:at+800,C1:at+180800,consentExpiresAt:new Date(at+800).toISOString()}):b.case==='consent_queue'?seal('Identity',{...identity,consentExpiresAt:new Date(at+500).toISOString()}):identity;
  const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=at+30000)throw Error('SYN original lease expired');}});
  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false,noticeGate=null,noticeClock=null,noticeConcurrent=null;
  const wrapper={withSession(mode){events.push({session:++sessionId,mode});const sid=sessionId,s=db.withSession(mode);return {prepare(sql){events.push({sid,sql});const actualSql=(b.case==='unsupported_clock'||noticeClock==='clock')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'subsec'","'SYN-unsupported'"):(b.case==='unsupported_iso'||noticeClock==='iso')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'2026-11-04T12:00:00.123Z'","'SYN-not-iso'"):sql;const stmt=s.prepare(actualSql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{sqlCount++;if(delay&&sql.includes(delay.needle)){const d=delay;delay=null;await sleep(d.ms);}const gate=noticeGate&&sql.includes(noticeGate.needle)?noticeGate:null;
      if(gate&&!['notice-ack','notice-held'].includes(b.case)){gate.reached=true;gate.at=Date.now();await gate.wait;}
      const nc=noticeConcurrent,nb=nc?.boundary;
      if(nc?.phase==='preflight'&&sql.includes('SELECT type,name,tbl_name,sql FROM sqlite_schema')&&!nb.reached){nb.reached=true;nb.at=Date.now();await nb.wait;}
      if(nc&&sql.includes('INSERT INTO dossier_monitoring_'))nc.emitted.push({kind:sql.includes('owner_tickets')?'ticket':'consent',at:Date.now(),afterFailure:nc.failureKnown});
      const result=await bound[method]();
      if(nc&&sql.includes('INSERT INTO dossier_monitoring_owner_tickets')){const tg=nc.ticketAck;tg.nativeRow=!!result;tg.at=Date.now();tg.reached=true;await tg.wait;throw Error('SYN actual concurrent ticket ACK lost');}
      if(nc&&((nc.phase==='observation'&&sql.includes('SELECT t.*'))||(nc.phase==='consent-ack'&&sql.includes('INSERT INTO dossier_monitoring_consent_events')))){nb.nativeRow=!!result;nb.at=Date.now();nb.reached=true;await nb.wait;}
      if(gate&&['notice-ack','notice-held'].includes(b.case)){gate.committed=true;gate.reached=true;gate.at=Date.now();await gate.wait;if(b.case==='notice-ack')throw Error('SYN post-commit notice ACK loss');}if(sql.includes('INSERT INTO delegated_access_grants'))grantCommitted=true;if(holdAck&&sql.includes(holdAck.needle)){const d=holdAck;holdAck=null;await sleep(d.ms);}if(lose&&sql.includes(lose)){lose=null;throw Error('SYN lost actual native SQL ACK');}return result;};return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
  let txFault=null,txCommitted=false;
  const nativeStorage=this.ctx.storage;
  const storage={get:async(...args)=>{const v=await nativeStorage.get(...args);return txFault==='readback_loss'&&txCommitted?'SYN-readback-loss':v;},list:(...args)=>nativeStorage.list(...args),sync:async()=>{if(txFault==='readback_loss')return nativeStorage.sync();if(txFault==='sync_loss')throw Error('SYN sync loss');return nativeStorage.sync();},transaction:async callback=>{
   const result=await nativeStorage.transaction(async tx=>{const r=await callback(tx);if(txFault==='callback_throw')throw Error('SYN final native transaction callback throw');return r;});txCommitted=true;
   // Hold AFTER the actual transaction final return; no interior read/release deadlock.
   if(txFault==='post_commit_hold'){parent.abort();await sleep(20);}
   if(txFault==='final_throw')throw Error('SYN native final ACK loss');return result;
  }};
  const ctx={storage,id:this.ctx.id},env={RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE};
  const store=createFinitePreparationIssuerStore({ctx,env});
  const window=(until=i.C0)=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,until,Date.parse(i.consentExpiresAt))});
  const clean=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,i.C1)});
  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(Math.min(at+(b.case.startsWith('notice-')?(b.ceiling==='grant'?3000:22000):10000),Date.parse(i.consentExpiresAt))).toISOString()};
  const opts=()=>({identity:i,window:window()});
  await exec('INSERT INTO site_projects VALUES (?,?,?)',i.projectId,i.subject,1);
  const snapshot=async()=>({fences:await db.prepare('SELECT * FROM finite_preparation_issuer_fences').all(),consents:await db.prepare('SELECT * FROM delegated_consent_sessions').all(),grants:await db.prepare('SELECT * FROM delegated_access_grants').all()});
  const rejected=async fn=>{try{await fn();return false;}catch{return true;}};
  const opened=()=>store.openFence(opts(),lease);
  const authorized=()=>store.insertAuthorization(opts(),lease);
  const consume=()=>store.consumeAuthorization({...opts(),consumedAt:new Date(at).toISOString()},lease);
  const close=()=>store.closeFence({identity:i,fenceRequestId:F,window:clean()},lease);
  const observe=barrier=>store.observeGrant({identity:i,barrier,expectedGrant:grant,window:clean()},lease);
  let result={};
  try{

   if(b.case.startsWith('notice-')){
    // Every positive scenario issues the original UUID through the real issuer first.
    result.open=await opened();result.authorization=await authorized();
    const consumption=await consume();result.consumed=!!consumption;
    result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
    if(result.grant.status!=='applied')throw Error('SYN original grant not reached');
    const beforeGrant=JSON.stringify(result.grant.row),end=Date.parse(grant.expiresAt);
    const short=b.ceiling?at+3000:end;
    const ceilings={C0:i.C0,consent:Date.parse(i.consentExpiresAt),grant:end,Access:b.ceiling==='Access'?short:end,preconnection:b.ceiling==='preconnection'?short:end};
    const ticketEnd=Math.min(...Object.values(ceilings),b.ceiling==='ticket'?short:end);
    const permissionEnd=Math.min(ticketEnd,b.ceiling==='permission'?short:end);
    const ticket={handleHash:'d'.repeat(64),requestId:F,expectedSequence:0,issuedAt:at,expiresAt:ticketEnd,permissionExpiresAt:permissionEnd};
    const common={identity:i,expectedGrant:grant,consumedAt:consumption.consumed_at,accessExpiresAt:ceilings.Access,preconnectionExpiresAt:ceilings.preconnection,window:window()};
    const data=()=>({...common,ticket});
    const counts=async()=>({tickets:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_owner_tickets').first()).n,notices:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n});
    const writes=()=>events.filter(e=>e.sql?.includes('INSERT INTO dossier_monitoring_')).length;
    const issue=()=>store.insertMonitoringTicket(data(),lease);
    const observeTicket=()=>store.observeMonitoringTicket(data(),lease);
    const insertNotice=(w,s=store,l=lease,d=common)=>s.insertMonitoringConsent({...d,ticketWitness:w},l);
    const competing=async(foreign=false)=>{
     await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",foreign?'SYN-foreign':i.grantId,i.projectId,i.subject,i.clientId,i.resource,foreign?U:'33333333-3333-4333-8333-333333333333',at,at+15000);
    };
    if(b.case==='notice-global'){await competing(true);await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES ('SYN-second',?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",i.projectId,i.subject,i.clientId,i.resource,U,at,at+15000);result.priorMax=(await db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n;}

    if(b.case.startsWith('notice-concurrent-')){
     // SYN scheduling gates only; every result below comes from real D1.
     const latch=()=>{let release;const wait=new Promise(resolve=>{release=resolve;});return {wait,release,reached:false,at:null,nativeRow:false};};
     const ticketAck=latch(),boundary=latch();
     noticeConcurrent={ticketAck,boundary,phase:null,failureKnown:false,emitted:[],kind:b.case};
     let ticketSettled=false;const ticketPending=issue().then(value=>{ticketSettled=true;return {value};},()=>{ticketSettled=true;return {rejected:true};});
     while(!ticketAck.reached&&!ticketSettled)await sleep(1);
     if(!ticketAck.reached||!ticketAck.nativeRow)throw Error('SYN concurrent ticket commit gate not reached');
     result.ticketCommitGate=true;result.ticketGateBeforeDeadline=ticketAck.at<common.window.deadline;
     let pendingSettled=false,pending;
     if(b.case==='notice-concurrent-observation'){
      noticeConcurrent.phase='observation';
      pending=observeTicket().then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
     }else{
      const witness=await observeTicket();result.observed=!!witness;
      if(!witness)throw Error('SYN concurrent native witness not reached');
      noticeConcurrent.phase=b.case==='notice-concurrent-before'?'preflight':'consent-ack';
      pending=insertNotice(witness).then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
     }
     while(!boundary.reached&&!pendingSettled)await sleep(1);
     if(!boundary.reached)throw Error('SYN concurrent boundary not reached');
     result.boundaryGate=true;result.boundaryBeforeDeadline=boundary.at<common.window.deadline;
     result.nativeBoundaryRow=boundary.nativeRow;result.boundaryAt=boundary.at;
     ticketAck.release();result.ticketFailure=await ticketPending;
     if(!result.ticketFailure.rejected)throw Error('SYN actual ticket ACK failure not observed');
     noticeConcurrent.failureKnown=true;result.failureKnown=true;result.failureAt=Date.now();
     await sleep(20);result.pendingAfterFailure=!pendingSettled;
     result.emittedBeforeRelease=noticeConcurrent.emitted.filter(e=>e.kind==='consent').length;
     boundary.release();result.pending=await pending;
     result.consentEmitted=noticeConcurrent.emitted.filter(e=>e.kind==='consent').length;
     result.newEmissionsAfterFailure=noticeConcurrent.emitted.filter(e=>e.afterFailure).length;
     result.emitted=noticeConcurrent.emitted.map(e=>({kind:e.kind,at:e.at,afterFailure:e.afterFailure}));
     result.counts=await counts();result.nativeObservationRow=b.case==='notice-concurrent-observation'&&boundary.nativeRow;
    }else if(b.case==='notice-schema'){
     if(b.fault==='clock')noticeClock='clock';else if(b.fault==='iso')noticeClock='iso';
     else if(b.fault==='type'){await exec('DROP TABLE dossier_monitoring_owner_tickets');await exec('CREATE TABLE dossier_monitoring_owner_tickets (handle_hash TEXT PRIMARY KEY,request_id TEXT,user_id TEXT,grant_id TEXT,project_id TEXT,client_id TEXT,resource TEXT,purpose TEXT,action TEXT,revision TEXT,expected_sequence INTEGER,issued_at INTEGER,expires_at INTEGER,permission_expires_at INTEGER)');}
     else if(b.fault==='extra')await exec('CREATE INDEX SYN_extra_notice ON dossier_monitoring_owner_tickets(grant_id)');
     else{
      const table=b.fault==='missing-consent'?'dossier_monitoring_consent_events':'dossier_monitoring_owner_tickets';
      if(b.fault.startsWith('missing-'))await exec('DROP TABLE '+table);
      else if(b.fault==='index')await exec('DROP INDEX dossier_monitoring_consent_grant_sequence');
      else if(b.fault==='trigger')await exec('DROP TRIGGER dossier_monitoring_tickets_no_delete');
      else{
       // SYN only: reconstruct an empty table with exactly one missing constraint.
       await exec('DROP TABLE dossier_monitoring_owner_tickets');
       const original=b.monitoringSchema.find(sql=>sql.startsWith('CREATE TABLE IF NOT EXISTS dossier_monitoring_owner_tickets'));
       await exec(b.fault==='unique'?original.replace('request_id TEXT NOT NULL UNIQUE','request_id TEXT NOT NULL'):original.replace("CHECK(purpose='afw.dossier-monitoring-owner.v1')",''));
       for(const sql of b.monitoringSchema.filter(sql=>sql.startsWith('CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_')))await exec(sql);
      }
     }
     const n=writes();result.denied=await rejected(issue);result.newWrites=writes()-n;
    }else if(b.case==='notice-hostile'){
     result.ticket=await issue();const witness=await observeTicket();result.observed=!!witness;let getters=0;
     const n=writes(),otherLease=Object.freeze({signal:lease.signal,assertCurrent:lease.assertCurrent}),foreign=createFinitePreparationIssuerStore({ctx,env});
     let d={...common,ticketWitness:witness},s=store,l=lease,arity='normal';
     if(b.fault==='clone')d.ticketWitness={...witness};
     else if(b.fault==='json')d.ticketWitness=JSON.parse(JSON.stringify(witness));
     else if(b.fault==='row')d.ticketWitness=witness.row;
     else if(b.fault==='store')s=foreign;
     else if(b.fault==='lease')l=otherLease;
     else if(b.fault==='getter')Object.defineProperty(d,'consumedAt',{enumerable:true,get(){getters++;return common.consumedAt;}});
     else if(b.fault==='witness-getter')Object.defineProperty(d,'ticketWitness',{enumerable:true,get(){getters++;return witness;}});
     else if(b.fault==='symbol')d[Symbol('SYN')]=1;
     else if(b.fault==='prototype')Object.setPrototypeOf(d,{});
     else if(b.fault==='sparse'){d.expectedGrant={...grant,scopes:new Array(1)};}
     else if(b.fault==='oversize')d.expectedGrant={...grant,scopes:['x'.repeat(65537)]};
     else if(b.fault==='depth'){let x={};for(let k=0;k<26;k++)x={x};d.expectedGrant=x;}
     else if(b.fault==='extra')d.approved=true;
     else if(b.fault==='args-missing')arity='missing';
     else if(b.fault==='args-extra')arity='extra';
     else if(b.fault==='identity')d.identity=seal('Identity',{...i,projectRevision:2});
     else if(b.fault==='grant-scopes')d.expectedGrant={...grant,scopes:i.requestedScopes};
     else if(b.fault==='grant-created')d.expectedGrant={...grant,createdAt:new Date(at+1).toISOString()};
     else if(b.fault==='grant-expires')d.expectedGrant={...grant,expiresAt:new Date(end-1).toISOString()};
     else if(b.fault==='consumed')d.consumedAt=new Date(at-1).toISOString();
     else if(b.fault==='Access')d.accessExpiresAt--;
     else if(b.fault==='preconnection')d.preconnectionExpiresAt--;
     else if(b.fault==='started')d.window={...common.window,startedAt:common.window.startedAt+1};
     else if(b.fault==='deadline')d.window={...common.window,deadline:common.window.deadline+1};
     result.denied=await rejected(()=>arity==='missing'?s.insertMonitoringConsent(d):arity==='extra'?s.insertMonitoringConsent(d,l,{}):s.insertMonitoringConsent(d,l));
     result.getters=getters;result.newWrites=writes()-n;result.counts=await counts();
    }else if(b.case==='notice-ticket-data'){
     result.ticket=await issue();const changed={...ticket};
     const changes={handleHash:'e'.repeat(64),requestId:U,expectedSequence:1,issuedAt:at+1,expiresAt:ticket.expiresAt-1,permissionExpiresAt:ticket.permissionExpiresAt-1};
     changed[b.fault]=changes[b.fault];const n=writes();
     try{result.witness=await store.observeMonitoringTicket({...common,ticket:changed},lease);}catch{result.denied=true;}
     result.newWrites=writes()-n;result.counts=await counts();
    }else if(b.case==='notice-signatures'){
     const n=writes();let getters=0;const d=data();let args=[d,lease];
     if(b.fault==='missing')args=[d];else if(b.fault==='extra')args.push({});
     else if(b.fault==='ticket-getter')Object.defineProperty(d,'ticket',{enumerable:true,get(){getters++;return ticket;}});
     else if(b.fault==='symbol')d[Symbol('SYN')]=1;
     else if(b.fault==='extra-key')d.action='grant';
     else if(b.fault==='ticket-key')d.ticket={...ticket,subject:i.subject};
     else if(b.fault==='window-key')d.window={...common.window,C0:i.C0};
     else if(b.fault==='grant-key')d.expectedGrant={...grant,exchangedAt:''};
     else if(b.fault==='cap')d.identity={...i,subject:'x'.repeat(17000)};
     result.denied=await rejected(()=>store[b.method](...args));result.getters=getters;result.newWrites=writes()-n;
    }else{
     if(b.target!=='ticket')result.ticket=await issue();
     let witness=b.target==='ticket'?null:await observeTicket();if(b.target!=='ticket')result.observed=!!witness;
     if(b.case==='notice-positive'||b.case==='notice-absolute'||b.case==='notice-global'||b.case==='notice-reduction'){
      result.consent=await insertNotice(witness);result.witnessFrozen=Object.isFrozen(witness)&&Object.isFrozen(witness.row);
      result.resultFrozen=Object.isFrozen(result.consent)&&Object.isFrozen(result.consent.row);
      result.secondDenied=await rejected(()=>insertNotice(witness));
      result.freshPrior=await createFinitePreparationIssuerStore({ctx,env}).insertMonitoringTicket(data(),lease);
      if(b.case==='notice-reduction'){
       const authority=createDossierMonitoringAuthorization({db,context:{grantId:i.grantId,subject:i.subject,clientId:i.clientId,resource:i.resource,scopes:grant.scopes},projectId:i.projectId,projectionSecret:'SYN-only-projection-secret-32-bytes'});
       result.enabledBefore=(await authority()).enabled;const barrier=await close();result.enabledAfterClose=(await authority()).enabled;
       const observation=await observe(barrier);result.revoke=await store.revokeGrant({identity:i,barrier,observation,window:clean()},lease);
       result.resolverDeniedAfterRevoke=await rejected(authority);
      }
     }else{
      const needle='INSERT INTO dossier_monitoring_'+(b.target==='ticket'?'owner_tickets':'consent_events');
      const gate={needle,reached:false,committed:false,release:null};let release;
      gate.wait=new Promise(resolve=>{release=resolve;});gate.release=release;noticeGate=gate;
      const n=writes();let settled=false;
      const pending=(b.target==='ticket'?issue():insertNotice(witness)).then(value=>{settled=true;return {value};},()=>{settled=true;return {rejected:true};});
      while(!gate.reached&&!settled)await sleep(1);
      if(!gate.reached)throw Error('SYN notice gate not reached');
      result.gateReached=true;result.gateAt=gate.at;result.gateBeforeDeadline=gate.at<common.window.deadline;result.windowDeadline=common.window.deadline;
      result.ceilings={...ceilings,ticket:ticketEnd,permission:permissionEnd};result.minimum=Math.min(...Object.values(result.ceilings));
      result.ceiling=b.ceiling??'window';result.gateBeforeMinimum=gate.at<result.minimum;result.ties=Object.entries(result.ceilings).filter(([,v])=>v===result.minimum).map(([k])=>k);
      if(b.case==='notice-queue')await sleep(b.ceiling?Math.max(0,result.minimum+50-Date.now()):5100);
      else if(b.case==='notice-barrier'){result.barrier=await close();result.primaryBarrierCompleted=true;}
      else if(b.case==='notice-race'){
       if(b.fault==='owner')await exec('UPDATE site_projects SET user_id=? WHERE id=?','SYN-foreign-owner',i.projectId);
       else if(b.fault==='revision')await exec('UPDATE site_projects SET revision=2 WHERE id=?',i.projectId);
       else if(b.fault==='auth')await exec("UPDATE delegated_consent_sessions SET consumed_at='' WHERE handle_hash=?",i.authorizationHash);
       else if(b.fault==='fence')result.barrier=await close();
       else if(b.fault==='event')await competing();
       else if(b.fault==='ticket'){
        result.ordinaryUpdateDenied=await rejected(()=>exec('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE handle_hash=?',U,ticket.handleHash));
        await exec('DROP TRIGGER dossier_monitoring_tickets_no_update');await exec('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE handle_hash=?',U,ticket.handleHash);
        result.synSchemaTamperAfterPreflight=true;
       }else{
        const changes={user_id:'SYN-foreign-owner',project_id:'SYN-foreign-project',client_id:'SYN-foreign-client',resource:'https://foreign.invalid/mcp',scopes_json:'[]',revoked_at:new Date(at).toISOString(),created_at:new Date(at+1).toISOString(),expires_at:new Date(end-1).toISOString(),exchanged_at:'SYN-not-iso'};
        await exec('UPDATE delegated_access_grants SET '+b.fault+'=? WHERE id=?',changes[b.fault],i.grantId);
       }
      }else if(b.case==='notice-ack'||b.case==='notice-held'){
       if(!gate.committed)throw Error('SYN expected actual commit before ACK gate');
       result.committed=true;
       if(b.case==='notice-held'){parent.abort();await sleep(20);result.pendingAfterAbort=!settled;}
      }
      gate.release();result.pending=await pending;result.newWrites=writes()-n;
      if(b.case==='notice-ack'||b.case==='notice-held'){
       const before=writes();result.ticketRetryDenied=await rejected(issue);result.consentRetryDenied=await rejected(()=>insertNotice(witness));result.observationDenied=await rejected(observeTicket);result.retryWrites=writes()-before;
      }
     }
     result.counts=await counts();result.eventsRows=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
     result.ticketRows=(await db.prepare('SELECT * FROM dossier_monitoring_owner_tickets').all()).results;
     result.grantUnchanged=JSON.stringify(await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first())===beforeGrant;
    }
    result.rows=await snapshot();result.ticketData=ticket;result.commonWindow=common.window;
   }else if(['missing_schema','unsupported_clock','unsupported_iso'].includes(b.case))result={rejected:await rejected(opened),consents:(await db.prepare('SELECT * FROM delegated_consent_sessions').all()).results};
   else if(b.case==='tamper_schema'){await exec('DROP TRIGGER finite_preparation_issuer_fences_terminal_fence');await exec('CREATE TRIGGER finite_preparation_issuer_fences_terminal_fence BEFORE UPDATE ON finite_preparation_issuer_fences BEGIN SELECT 1; END');result={rejected:await rejected(opened),rows:(await snapshot())};}
   else if(b.case==='schema'){
    const barrier=await close();result.barrier=barrier;result.delayedOpen=await rejected(opened);
    result.noDelete=await rejected(()=>exec('DELETE FROM finite_preparation_issuer_fences'));
    result.immutable=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET forward_until=forward_until+1'));
    result.noReopen=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET fence_request_id=NULL,fenced_at=NULL'));
    result.noReterminal=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET fenced_at=fenced_at+1'));
    result.collision=await rejected(()=>exec('INSERT INTO finite_preparation_issuer_fences SELECT ?,authorization_hash,grant_id,enrollment_hash,identity_hash,reserved_at,forward_until,cleanup_until,fence_request_id,fenced_at FROM finite_preparation_issuer_fences','d'.repeat(64)));
    result.rows=await snapshot();
   }else if(b.case==='open_then_close'){result.open=await opened();result.barrier=await close();result.authorization=await authorized();result.rows=await snapshot();}
   else if(['journal','journal_chain'].includes(b.case)){
    const journal=createFinitePreparationIssuerJournal({ctx,env});
    const reservation=seal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash:H,issuedAt:at,deadline:at+4000});
    if(b.fault)txFault=b.fault;
    result.append=await journal.appendReservation(reservation,lease);result.txCommitted=txCommitted;result.sqlBefore=sqlCount;
    if(result.append.status==='recorded')result.sql=await opened();
    result.sqlAfter=sqlCount;
    if(!parent.signal.aborted){result.existing=await journal.appendReservation(reservation,lease);result.data=await journal.read({preconnectionId:i.preconnectionId},lease);}
    if(b.case==='journal_chain'){
     const send=seal('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'open_fence',requestId:null,requestHash:H,issuedAt:at+1,deadline:at+4000});
     result.send=await journal.appendSend({preconnectionId:i.preconnectionId,record:send},lease);
     result.ack=await journal.appendAck({preconnectionId:i.preconnectionId,operation:'open_fence',record:seal('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:send.recordHash,rowHash:hash('afw.finite-preparation-issuer-row.v1',result.sql.row),outcome:'applied',observedAt:at+2})},lease);
     result.freeze=await journal.freeze({preconnectionId:i.preconnectionId,record:seal('Freeze',{purpose:'afw.finite-preparation-issuer-freeze.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,frozenAt:at+3})},lease);
     result.frozenGrant=await journal.appendSend({preconnectionId:i.preconnectionId,record:seal('Send',{...send,operation:'grant',issuedAt:at+4})},lease);
     result.cleanupSend=await journal.appendSend({preconnectionId:i.preconnectionId,record:seal('Send',{...send,operation:'close_fence',requestId:F,issuedAt:at+4})},lease);
     result.replacement=await journal.appendReservation(seal('Reservation',{...reservation,identity:seal('Identity',{...i,grantId:F})}),lease);
     result.chain=await journal.read({preconnectionId:i.preconnectionId},lease);
     await nativeStorage.put(P+i.preconnectionId+':unknown','{}');result.unknownDenied=await rejected(()=>journal.read({preconnectionId:i.preconnectionId},lease));
    }
    result.rows=[...await nativeStorage.list({prefix:P})];
   }else if(b.case==='queued_barrier'){
    let consumption;
    if(b.target!=='open'){await opened();await authorized();}
    if(b.target==='grant')consumption=await consume();
    const needles={open:'INSERT INTO finite_preparation_issuer_fences',consume:'UPDATE delegated_consent_sessions',grant:'INSERT INTO delegated_access_grants'};
    delay={needle:needles[b.target],ms:250};
    const work=b.target==='open'?()=>opened():b.target==='consume'?()=>consume():()=>store.insertReadGrant({...opts(),consumption,grant},lease);
    let pendingSettled=false;const pending=work().then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
    while(delay!==null&&!pendingSettled)await sleep(1);if(delay!==null)throw Error('SYN queue did not reach actual SQL');
    result.barrier=await close();result.pending=await pending;result.rows=await snapshot();
   }else if(['authorization_queue','open_queue'].includes(b.case)){
    if(b.case==='authorization_queue')await opened();
    const o=opts();o.window.deadline=o.window.startedAt+300;
    delay={needle:b.case==='open_queue'?'INSERT INTO finite_preparation_issuer_fences':'INSERT INTO delegated_consent_sessions',ms:650};
    result.operation=await store[b.case==='open_queue'?'openFence':'insertAuthorization'](o,lease);result.rows=await snapshot();
   }else{
    await opened();await authorized();
    if(['consent_queue','C0_queue','deadline_queue'].includes(b.case)){
     const w=window();if(b.case==='deadline_queue')w.deadline=w.startedAt+300;
     delay={needle:'UPDATE delegated_consent_sessions',ms:b.case==='C0_queue'?1000:650};
     result.consumption=await store.consumeAuthorization({identity:i,consumedAt:new Date(at).toISOString(),window:w},lease);result.rows=await snapshot();
    }else{
     const consumption=await consume();result.consumed=!!consumption;
     if(b.case==='witness'){
      result.rebuiltDenied=await rejected(async()=>store.insertReadGrant({...opts(),consumption:await db.prepare('SELECT * FROM delegated_consent_sessions WHERE handle_hash=?').bind(i.authorizationHash).first(),grant},lease));
      result.cloneDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption:{...consumption},grant},lease));
      result.foreignDenied=await rejected(()=>createFinitePreparationIssuerStore({ctx,env}).insertReadGrant({...opts(),consumption,grant},lease));
      const otherLease=Object.freeze({signal:lease.signal,assertCurrent:lease.assertCurrent});
      result.leaseDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption,grant},otherLease));
      result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
      result.replayDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption,grant},lease));
     }else if(['grant_expiry_queue','deadline_grant_queue','C0_grant_queue'].includes(b.case)){
      const g=b.case==='grant_expiry_queue'?{...grant,expiresAt:new Date(Date.now()+300).toISOString()}:grant;
      const o=opts();if(b.case==='deadline_grant_queue')o.window.deadline=o.window.startedAt+300;
      delay={needle:'INSERT INTO delegated_access_grants',ms:b.case==='C0_grant_queue'?1000:650};
      result.grant=await store.insertReadGrant({...o,consumption,grant:g},lease);
     }else if(b.case==='grant_after_barrier'){
      result.barrier=await close();result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);result.observation=await observe(result.barrier);
     }else if(b.case==='unknown_fence'){
      lose='INSERT INTO finite_preparation_issuer_fences';result.unknown=await rejected(close);result.lookupBeforeBarrier=await rejected(()=>observe({status:'fenced'}));
      result.foreignReconcile=await rejected(()=>store.reconcileFence({identity:i,fenceRequestId:U,window:clean()},lease));
      const restart=createFinitePreparationIssuerStore({ctx,env});const barrier=await restart.reconcileFence({identity:i,fenceRequestId:F,window:clean()},lease);
      result.barrier=barrier;result.observation=await restart.observeGrant({identity:i,barrier,expectedGrant:grant,window:clean()},lease);
     }else{
      // Commit the real INSERT first but retain its response, then serialize a terminal barrier.
      if(b.case==='held_grant_ack')holdAck={needle:'INSERT INTO delegated_access_grants',ms:2000};
      let grantSettled=false;const pending=store.insertReadGrant({...opts(),consumption,grant},lease);pending.then(()=>{grantSettled=true;},()=>{grantSettled=true;});
      let earlyBarrier=null;
      if(b.case==='held_grant_ack'){while(!grantCommitted&&!grantSettled)await sleep(1);if(!grantCommitted)await pending;earlyBarrier=await close();result.barrierBeforeGrantAck=!grantSettled;}
      const issued=await pending;result.grant=issued;
      if(b.case==='expired_cleanup')await sleep(1000);
      if(b.case==='foreign_grants'){
       const bad={user_id:'foreign-owner',client_id:'foreign-client',project_id:'foreign-project',resource:'https://foreign.invalid/mcp',scopes_json:'[]',created_at:new Date(at+1).toISOString(),expires_at:new Date(at+11000).toISOString()};
       const original=await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first(),barrier=await close();result.denials={};
       for(const [field,value]of Object.entries(bad)){await exec('UPDATE delegated_access_grants SET '+field+'=? WHERE id=?',value,i.grantId);result.denials[field]=await rejected(()=>observe(barrier));await exec('UPDATE delegated_access_grants SET '+field+'=? WHERE id=?',original[field],i.grantId);}
       result.rows=await snapshot();return Response.json({result,events,at,identity:i});
      }
      if(b.case==='history')await exec('UPDATE delegated_access_grants SET exchanged_at=?,revoked_at=? WHERE id=?',new Date(at+1).toISOString(),new Date(at+2).toISOString(),i.grantId);
      await exec("INSERT INTO delegated_access_grants VALUES (?,?,?,?,?,?,?,?,?,?)",'unrelated',i.subject,i.clientId,i.projectId,i.resource,'[]',grant.createdAt,grant.expiresAt,'','');
      const before=(await db.prepare("SELECT * FROM delegated_access_grants WHERE id='unrelated'").first());
      const barrier=earlyBarrier??await close();result.barrier=barrier;
      result.clonedBarrierDenied=await rejected(()=>observe({...barrier}));
      if(b.case==='foreign_owner')await exec('UPDATE site_projects SET revision=revision+1');
      const observation=await observe(barrier);result.observation=observation;
      result.clonedObservationDenied=await rejected(()=>store.revokeGrant({identity:i,barrier,observation:{...observation},window:clean()},lease));
      result.revoke=await store.revokeGrant({identity:i,barrier,observation,window:clean()},lease);
      result.unrelatedUnchanged=JSON.stringify(before)===JSON.stringify(await db.prepare("SELECT * FROM delegated_access_grants WHERE id='unrelated'").first());
     }
     result.rows=await snapshot();
    }
   }
  }catch(e){result.error=e.message;}
  return Response.json({result,events,at,identity:i});
 }
}
const handler={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};
export default handler;
