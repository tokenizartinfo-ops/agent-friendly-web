import {createFinitePreparationNoticeJournal} from '../../lib/mcp-qa-finite-preparation-notice-journal.mjs';
import {initialHash as hash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
import {DurableObject} from 'cloudflare:workers';
import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA as schema,FINITE_PREPARATION_MONITORING_SCHEMA as monitoringSchema} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
import {createFinitePreparationIssuerJournal} from '../../lib/mcp-qa-finite-preparation-issuer-journal.mjs';
import {sealFinitePreparationIssuerRecord as seal,FINITE_PREPARATION_ISSUER_PREFIX as P} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
// SYN internal identities/lease/queue faults, REAL native D1 SQL time and DO transactions.
// No SDK approval, capsule validity or source authority is inferred.
export class FiniteIssuerFixture extends DurableObject{
 async fetch(request){
  const b={case:'notice-red',...await request.json()},db=this.env.RELEASE_DB,events=[];
  const exec=async(sql,...args)=>db.prepare(sql).bind(...args).run();
  await exec('CREATE TABLE IF NOT EXISTS site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
  await exec("CREATE TABLE IF NOT EXISTS delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
  await exec("CREATE TABLE IF NOT EXISTS delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
  if(b.case!=='missing_schema')for(const sql of schema)await exec(sql);
  for(const sql of monitoringSchema)await exec(sql);
  const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms;
  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+(b.case.startsWith('notice-')?24000:12000)).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
  const i=b.case.startsWith('notice-')&&b.ceiling==='C0'?seal('Identity',{...identity,I0:at-897000,C0:at+3000,C1:at+183000,consentExpiresAt:new Date(at+3000).toISOString()}):b.case.startsWith('notice-')&&b.ceiling==='consent'?seal('Identity',{...identity,consentExpiresAt:new Date(at+3000).toISOString()}):['C0_queue','expired_cleanup','C0_grant_queue'].includes(b.case)?seal('Identity',{...identity,I0:at-899200,C0:at+800,C1:at+180800,consentExpiresAt:new Date(at+800).toISOString()}):b.case==='consent_queue'?seal('Identity',{...identity,consentExpiresAt:new Date(at+500).toISOString()}):identity;
  const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=at+30000)throw Error('SYN original lease expired');}});
  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false,noticeGate=null,noticeClock=null,noticeConcurrent=null;
  const wrapper={withSession(mode){events.push({session:++sessionId,mode});const sid=sessionId,s=db.withSession(mode);return {prepare(sql){events.push({sid,sql});const actualSql=(b.case==='unsupported_clock'||noticeClock==='clock')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'subsec'","'SYN-unsupported'"):(b.case==='unsupported_iso'||noticeClock==='iso')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'2026-11-04T12:00:00.123Z'","'SYN-not-iso'"):sql;const stmt=s.prepare(actualSql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{sqlCount++;if(delay&&sql.includes(delay.needle)){const d=delay;delay=null;await sleep(d.ms);}const gate=noticeGate&&sql.includes(noticeGate.needle)?noticeGate:null;
      if(gate&&!['notice-ack','notice-held'].includes(b.case)){gate.reached=true;gate.at=Date.now();await gate.wait;}
      const nc=noticeConcurrent,nb=nc?.boundary;
      if(nc?.phase==='preflight'&&sql.includes('SELECT type,name,tbl_name,sql FROM sqlite_schema')&&!nb.reached){nb.reached=true;nb.at=Date.now();await nb.wait;}
      if(nc&&sql.includes('INSERT INTO dossier_monitoring_'))nc.emitted.push({kind:sql.includes('INSERT INTO dossier_monitoring_owner_tickets')?'ticket':'consent',at:Date.now(),afterFailure:nc.failureKnown});
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
   result.open=await opened();result.authorization=await authorized();
   const consumption=await consume();result.consumed=!!consumption;
   result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
   if(result.grant.status!=='applied'||result.grant.row.id!==i.grantId)throw Error('SYN native original grant not reached');
   result.reachedNativeGrant=true;
   const journal=createFinitePreparationNoticeJournal({ctx,env});
   result.reservation=await journal.appendReservation({},lease);
  }catch(e){result.error=e.message;}
  return Response.json({result,identity:i});
 }
}
export default {fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};
