import {DurableObject} from 'cloudflare:workers';
import {initialHash as hash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA as schema,FINITE_PREPARATION_MONITORING_SCHEMA as monitoringSchema} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
import {createFinitePreparationIssuerJournal} from '../../lib/mcp-qa-finite-preparation-issuer-journal.mjs';
import {sealFinitePreparationIssuerRecord as issuer} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
import {encodeFinitePreparationRecord as prepEncode,decodeFinitePreparationRecord as prepDecode,hashFinitePreparationRecord as prepHash} from '../../lib/mcp-qa-finite-preparation-records.mjs';
import {createFinitePreparationNoticeJournal as createJournal} from '../../lib/mcp-qa-finite-preparation-notice-journal.mjs';
import {sealFinitePreparationNoticeRecord as seal,encodeFinitePreparationNoticeRecord as encode,FINITE_PREPARATION_NOTICE_PREFIX as P} from '../../lib/mcp-qa-finite-preparation-notice-records.mjs';
import {observeFiniteReadOnlyWork} from '../../lib/mcp-qa-finite-stage-work.mjs';
const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const denied=async fn=>{try{await fn();return false;}catch(e){if(e.message!=='Finite preparation notice unavailable')throw e;return true;}};
const latch=()=>{let release;const wait=new Promise(resolve=>{release=resolve;});return {wait,release,reached:false};};
// SYN identities/leases/fault gates. D1 results, SQL clocks and DO transactions are native.
// No factual source, signed Access, CSRF/human approval or cross-RPC drain is claimed.
export class FiniteNoticeProvenanceFixture extends DurableObject{
 async fetch(request){
  const b=await request.json(),db=this.env.RELEASE_DB,native=this.ctx.storage,events=[],result={};
  const exec=(sql,...args)=>db.prepare(sql).bind(...args).run();
  await exec('CREATE TABLE site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
  await exec("CREATE TABLE delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
  await exec("CREATE TABLE delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
  for(const sql of [...schema,...monitoringSchema])await exec(sql);
  const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms,originalDeadline=at+30000;
  const i=issuer('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+24000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
  const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=originalDeadline)throw Error('SYN original lease expired');}});
  let txFault=null,txCommitted=false,txGate=null,sqlGate=null,sqlLoss=null,puts=0;
  const wrapper={withSession(mode){events.push({mode});const session=db.withSession(mode);return {prepare(sql){events.push({sql});const stmt=session.prepare(sql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{
   const actual=await bound[method]();
   if(sqlGate&&sql.includes(sqlGate.needle)){const gate=sqlGate;sqlGate=null;gate.reached=true;gate.committed=!!actual;await gate.wait;}
   if(sqlLoss&&sql.includes(sqlLoss)){sqlLoss=null;throw Error('SYN actual SQL result lost after commit');}
   return actual;
  };return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
  const storage={
   get:async(...args)=>{const v=await native.get(...args);if(txFault==='readback_loss'&&txCommitted)throw Error('SYN readback lost');return v;},
   list:(...args)=>native.list(...args),
   sync:async()=>{await native.sync();if(txFault==='sync_loss')throw Error('SYN sync lost');},
   transaction:async callback=>{
    const r=await native.transaction(async tx=>{
     const proxy={get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:(...a)=>{puts++;return tx.put(...a);}};
     const v=await callback(proxy);if(txFault==='callback_throw')throw Error('SYN callback throw');return v;
    });txCommitted=true;
    if(txGate){const gate=txGate;txGate=null;gate.reached=true;await gate.wait;}
    if(txFault==='final_throw')throw Error('SYN final transaction return lost');return r;
   }
  };
  const ctx={storage,id:this.ctx.id},env={RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE};
  const store=createFinitePreparationIssuerStore({ctx,env}),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,at+14000)}),opts=()=>({identity:i,window:window()});
  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(at+22000).toISOString()};
  const writes=()=>events.filter(e=>e.sql?.includes('INSERT INTO dossier_monitoring_')).length;
  const make=(kind,v)=>seal(kind,{purpose:'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1',...v});
  let r,journal,ticketSend;
  try{
   await exec('INSERT INTO site_projects VALUES (?,?,?)',i.projectId,i.subject,1);
   result.open=await store.openFence(opts(),lease);result.authorization=await store.insertAuthorization(opts(),lease);
   const consumption=await store.consumeAuthorization({...opts(),consumedAt:new Date(at).toISOString()},lease);result.consumed=!!consumption;
   const ij=createFinitePreparationIssuerJournal({ctx,env});
   const ir=issuer('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash:hash('SYN-original-issuer-request',opts()),issuedAt:Date.now(),deadline:Date.now()+4000});
   result.issuerReservation=await ij.appendReservation(ir,lease);
   const gs=issuer('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:ir.recordHash,operation:'grant',requestId:null,requestHash:hash('SYN-original-grant-request',grant),issuedAt:Date.now(),deadline:Date.now()+4000});
   await ij.appendSend({preconnectionId:H,record:gs},lease);
   result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
   if(result.grant.status!=='applied'||result.grant.row.id!==i.grantId)throw Error('SYN native original grant not reached');
   result.reachedNativeGrant=true;
   const ga=issuer('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:gs.recordHash,rowHash:hash('afw.finite-preparation-issuer-row.v1',result.grant.row),outcome:'applied',observedAt:Date.now()});
   result.originalGrantAck=await ij.appendAck({preconnectionId:H,operation:'grant',record:ga},lease);
   // Persist and read the ORIGINAL SYN reference rows before notice reservation.
   const link={preconnectionId:H,authorizationHash:i.authorizationHash,grantId:i.grantId,grantHash:hash('SYN-original-grant-row',result.grant.row),acceptedAt:Date.now()};
   const connection={connectionRef:H,subject:i.subject,grantId:i.grantId,clientId:i.clientId,projectId:i.projectId,resource:i.resource,issuedAt:at,expiresAt:at+22000};
   await native.put('SYN:original:GrantLink',prepEncode('GrantLink',link));await native.put('SYN:original:ConnectionRef',prepEncode('ConnectionRef',connection));
   const originalLink=prepDecode('GrantLink',await native.get('SYN:original:GrantLink')),originalConnection=prepDecode('ConnectionRef',await native.get('SYN:original:ConnectionRef'));
   const issued=Date.now(),ticket={handleHash:'d'.repeat(64),requestId:F,expectedSequence:0,issuedAt:issued,expiresAt:at+19000,permissionExpiresAt:at+18000};
   r=make('Reservation',{identity:i,issuerReservationHash:ir.recordHash,originalGrantAckHash:ga.recordHash,grantLinkHash:prepHash('GrantLink',originalLink),connectionHash:prepHash('ConnectionRef',originalConnection),expectedGrant:grant,consumedAt:consumption.consumed_at,accessExpiresAt:at+21000,preconnectionExpiresAt:at+23000,ticket,issuedAt:Date.now()});
   result.originalBindings={issuer:ir.recordHash,ack:ga.recordHash,grantLink:prepHash('GrantLink',originalLink),connection:prepHash('ConnectionRef',originalConnection)};
   journal=createJournal({ctx,env});
   const data=s=>({identity:i,expectedGrant:grant,consumedAt:r.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:r.preconnectionExpiresAt,window:s.window});
   const send=(operation='ticket',extra={})=>{
    const issuedAt=Date.now(),window={startedAt:issuedAt,deadline:Math.min(issuedAt+4500,at+14000)};
    const base={identityHash:i.identityHash,reservationHash:r.recordHash,operation,accessExpiresAt:r.accessExpiresAt,window,issuedAt,...extra};
    const decisionHash=operation==='ticket'?null:hash('afw.finite-preparation-notice-decision.v1',{identityHash:i.identityHash,ticketRequestId:ticket.requestId,handleHash:ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt:base.issuedAt});
    return make('Send',{...base,decisionHash,requestHash:hash('afw.finite-preparation-notice-request.v1',{operation,common:data(base),ticket,decisionHash})});
   };
   const append=s=>journal.appendSend({preconnectionId:H,record:s},lease);
   const ack=(s,actual)=>make('Ack',{sendHash:s.recordHash,outcome:actual.status,rowHash:actual.status==='applied'?hash('afw.finite-preparation-notice-row.v1',actual.row):null,sequence:actual.status==='applied'&&s.operation==='consent'?actual.row.sequence:null,observedAt:Date.now()});
   const appendAck=(s,a)=>journal.appendAck({preconnectionId:H,operation:s.operation,record:a},lease);
   const freeze=()=>make('Freeze',{identityHash:i.identityHash,reservationHash:r.recordHash,frozenAt:Date.now()});
   const read=()=>createJournal({ctx,env}).read({preconnectionId:H},lease);
   const issue=s=>store.insertMonitoringTicket({...data(s),ticket},lease);
   const retain=async(kind,work)=>{
    const gate=latch();if(kind==='transaction')txGate=gate;else{gate.needle='INSERT INTO dossier_monitoring_owner_tickets';sqlGate=gate;}
    let settled=false;
    const pending=observeFiniteReadOnlyWork({ctx,env,originalLease:lease},work).then(v=>{settled=true;return {value:v};},()=>{settled=true;return {rejected:true};});
    while(!gate.reached&&!settled)await sleep(1);
    if(!gate.reached)throw Error('SYN actual retained gate not reached');
    result.gateReached=true;result.gateCommitted=kind==='transaction'?txCommitted:gate.committed;parent.abort();await sleep(10);result.pendingAfterAbort=!settled;
    const other=new AbortController(),otherLease=Object.freeze({signal:other.signal,assertCurrent(){if(other.signal.aborted||Date.now()>=originalDeadline)throw Error('SYN same original deadline expired');}});
    otherLease.assertCurrent();result.otherLeaseDistinct=otherLease!==lease;result.otherLeaseLive=!otherLease.signal.aborted;result.withinOriginalDeadline=Date.now()<originalDeadline;
    try{await observeFiniteReadOnlyWork({ctx,env,originalLease:otherLease},()=>true);result.observerDenied=false;}catch(e){result.observerDenied=e.message==='Finite stage work remains outstanding';}
    gate.release();result.pending=await pending;await sleep(0);otherLease.assertCurrent();
    result.observerAfterSettle=await observeFiniteReadOnlyWork({ctx,env,originalLease:otherLease},()=>true);other.abort();
   };
   if(b.case==='retained-transaction'){
    await retain('transaction',()=>journal.appendReservation(r,lease));result.noticeRows=[...await native.list({prefix:P})];result.writes=writes();
   }else{
    txCommitted=false;if(b.case==='transaction-fault')txFault=b.fault;
    result.reservation=await journal.appendReservation(r,lease);result.txCommitted=txCommitted;
    if(b.case==='transaction-fault'){
     result.noticeRows=[...await native.list({prefix:P})];result.writes=writes();
    }else{
     result.reservationReplay=await journal.appendReservation(r,lease);
     result.reservationConflict=await journal.appendReservation(make('Reservation',{...r,connectionHash:'e'.repeat(64)}),lease);
     if(b.case==='corrupt'){
      const prefix=P+H+':';
      if(b.fault==='unknown')await native.put(prefix+'unknown','{}');
      if(b.fault==='seventh')for(let n=0;n<6;n++)await native.put(prefix+'extra'+n,'{}');
      if(b.fault==='orphan'){await native.delete(prefix+'reservation');await native.put(prefix+'freeze',encode('Freeze',freeze()));}
      if(b.fault==='noncanonical')await native.put(prefix+'reservation',' '+encode('Reservation',r));
      if(b.fault==='actor')ctx.id={toString(){return i.actorId;}};
      if(b.fault==='version')env.AFW_QA_VERSION.id=F;
      if(b.fault==='metadata')env.AFW_QA_VERSION={id:U};
      if(b.fault==='storage')ctx.storage={...storage};
      if(b.fault==='binding')env.RELEASE_DB={...wrapper};
      result.denied=await denied(read);result.writes=writes();
     }else if(b.case==='invalid'){
      let getters=0;ticketSend=send();
      if(b.fault==='Access')ticketSend=send('ticket',{accessExpiresAt:r.ticket.expiresAt-1});
      if(b.fault==='consent-without-ticket-ACK')ticketSend=send('consent');
      if(b.fault==='request-hash')ticketSend=make('Send',{...ticketSend,requestHash:H});
      if(b.fault==='decision-hash')ticketSend=make('Send',{...send('consent'),decisionHash:H});
      if(b.fault==='pre-reservation')ticketSend=send('ticket',{issuedAt:r.issuedAt-1,window:{startedAt:r.issuedAt-1,deadline:r.issuedAt+1000}});
      if(b.fault==='ceiling')ticketSend=send('ticket',{window:{startedAt:at+17000,deadline:at+19000},issuedAt:at+17000});
      if(b.fault==='getter'){const v={...ticketSend};Object.defineProperty(v,'issuedAt',{enumerable:true,get(){getters++;return Date.now();}});ticketSend=v;}
      try{result.invalid=await append(ticketSend);}catch(e){result.errorMessage=e.message;result.invalid={status:'denied'};}
      result.getters=getters;result.history=await read();result.writes=writes();
     }else{
      ticketSend=send();
      if(b.case==='freeze-empty'){
       const f=freeze();result.freeze=await journal.freeze({preconnectionId:H,record:f},lease);result.freezeReplay=await journal.freeze({preconnectionId:H,record:f},lease);result.blockedSend=await append(ticketSend);result.history=await read();result.writes=writes();
      }else{
       const sends=await Promise.all([append(ticketSend),append(ticketSend)]);result.concurrent=sends;
       // Only a newly recorded SEND emits SQL; existing is DATA history, never permission.
       if(sends.filter(v=>v.status==='recorded').length!==1)throw Error('SYN SEND must have exactly one recorded result');
       if(b.case==='retained-sql'){
        await retain('sql',()=>issue(ticketSend));result.history=await createJournal({ctx,env}).read({preconnectionId:H},Object.freeze({signal:new AbortController().signal,assertCurrent(){if(Date.now()>=originalDeadline)throw Error('SYN deadline');}}));result.writes=writes();
       }else{
        if(b.case==='sql-loss'&&b.target==='ticket')sqlLoss='INSERT INTO dossier_monitoring_owner_tickets';
        if(b.case==='no-mutation')await exec('UPDATE site_projects SET revision=2');
        try{result.ticket=await issue(ticketSend);}catch{result.actualSqlRejected=true;}
        if(result.ticket?.status==='no_mutation'){
         const ta=ack(ticketSend,result.ticket);result.ticketAck=await appendAck(ticketSend,ta);result.blockedConsent=await append(send('consent'));
        }else if(result.ticket){
         const ta=ack(ticketSend,result.ticket);result.ticketAckData=ta;
         if(b.case==='invalid-ticket-ack'){
          const changes={sendHash:H,sequence:17,observedAt:b.fault==='late'?ticketSend.window.deadline:ticketSend.issuedAt-1};
          const invalid=make('Ack',{...ta,[b.fault==='late'||b.fault==='early'?'observedAt':b.fault]:changes[b.fault==='late'||b.fault==='early'?'observedAt':b.fault]});
          result.invalidAck=await appendAck(ticketSend,invalid);result.history=await read();result.writes=writes();return Response.json({result,identity:i});
         }
         if(b.case==='freeze-ticket-send'){
          result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedAck=await appendAck(ticketSend,ta);
         }else{
          result.ticketAck=await appendAck(ticketSend,ta);
          journal=createJournal({ctx,env});result.betweenGetPost=await read();
          if(b.case==='freeze-ticket-ack'){
           result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedSend=await append(send('consent'));result.history=await read();result.writes=writes();return Response.json({result,identity:i});
          }
          // Foreign native events preserve MAX(current grant)=0 and assign sequence 17 globally.
          for(let n=0;n<16;n++)await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",'SYN-foreign-'+n,i.projectId,i.subject,i.clientId,i.resource,'33333333-3333-4333-8333-'+String(n).padStart(12,'0'),at,at+19000);
          result.foreignBefore=(await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id<>? ORDER BY sequence").bind(i.grantId).all()).results;
          result.priorGrantMax=(await db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n;
          const cs=send('consent');result.consentSend=await append(cs);
          if(result.consentSend.status==='recorded'){
           const common=data(cs),witness=await store.observeMonitoringTicket({...common,ticket},lease);result.observed=!!witness;result.witnessFrozen=Object.isFrozen(witness)&&Object.isFrozen(witness.row);
           if(b.case==='sql-loss'&&b.target==='consent')sqlLoss='INSERT INTO dossier_monitoring_consent_events';
           try{result.consent=await store.insertMonitoringConsent({...common,ticketWitness:witness},lease);}catch{result.actualSqlRejected=true;}
           if(result.consent){const ca=ack(cs,result.consent);result.consentAckData=ca;
            if(b.case==='freeze-consent-send'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedAck=await appendAck(cs,ca);}
            else if(b.case==='invalid-consent-ack')result.invalidAck=await appendAck(cs,make('Ack',{...ca,sequence:null}));
            else result.consentAck=await appendAck(cs,ca);}
          }
          result.foreignAfter=(await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id<>? ORDER BY sequence").bind(i.grantId).all()).results;
          if(b.case==='freeze-complete'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.replayAck=await appendAck(ticketSend,ta);result.replaySend=await append(ticketSend);}
         }
        }
        result.history=await read();
        if(b.case==='sql-loss'&&b.target==='ticket')result.blockedConsent=await append(send('consent'));
        if(b.case==='sql-loss'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.afterFreeze=await read();}
        result.ticketRows=(await db.prepare('SELECT * FROM dossier_monitoring_owner_tickets').all()).results;
        result.eventRows=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).all()).results;
        result.writes=writes();result.grantUnchanged=JSON.stringify(result.grant.row)===JSON.stringify(await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first());
       }
      }
     }
    }
   }
   result.puts=puts;result.reservationData=r;result.sendData=ticketSend;
  }catch(e){result.error=e.message;}
  return Response.json({result,identity:i});
 }
}
export default {fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};
