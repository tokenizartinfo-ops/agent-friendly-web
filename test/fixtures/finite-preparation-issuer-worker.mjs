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
  const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms;
  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+12000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
  const i=b.case==='C0_queue'?seal('Identity',{...identity,I0:at-899500,C0:at+500,C1:at+180500,consentExpiresAt:new Date(at+500).toISOString()}):b.case==='consent_queue'?seal('Identity',{...identity,consentExpiresAt:new Date(at+500).toISOString()}):identity;
  const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=at+30000)throw Error('SYN original lease expired');}});
  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false;
  const wrapper={withSession(mode){events.push({session:++sessionId,mode});const sid=sessionId,s=db.withSession(mode);return {prepare(sql){events.push({sid,sql});const actualSql=b.case==='unsupported_clock'&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'subsec'","'SYN-unsupported'"):b.case==='unsupported_iso'&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'2026-11-04T12:00:00.123Z'","'SYN-not-iso'"):sql;const stmt=s.prepare(actualSql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{sqlCount++;if(delay&&sql.includes(delay.needle)){const d=delay;delay=null;await sleep(d.ms);}const result=await bound[method]();if(sql.includes('INSERT INTO delegated_access_grants'))grantCommitted=true;if(holdAck&&sql.includes(holdAck.needle)){const d=holdAck;holdAck=null;await sleep(d.ms);}if(lose&&sql.includes(lose)){lose=null;throw Error('SYN lost actual native SQL ACK');}return result;};return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
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
  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(Math.min(at+10000,Date.parse(i.consentExpiresAt))).toISOString()};
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
   if(['missing_schema','unsupported_clock','unsupported_iso'].includes(b.case))result={rejected:await rejected(opened),consents:(await db.prepare('SELECT * FROM delegated_consent_sessions').all()).results};
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
   else if(b.case==='journal'){
    const journal=createFinitePreparationIssuerJournal({ctx,env});
    const reservation=seal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash:H,issuedAt:at,deadline:at+4000});
    if(b.fault)txFault=b.fault;
    result.append=await journal.appendReservation(reservation,lease);result.txCommitted=txCommitted;result.sqlBefore=sqlCount;
    if(result.append.status==='recorded')result.sql=await opened();
    result.sqlAfter=sqlCount;
    if(!parent.signal.aborted){result.existing=await journal.appendReservation(reservation,lease);result.data=await journal.read({preconnectionId:i.preconnectionId},lease);}
    result.rows=[...await nativeStorage.list({prefix:P})];
   }else{
    await opened();await authorized();
    if(['consent_queue','C0_queue','deadline_queue'].includes(b.case)){
     const w=window();if(b.case==='deadline_queue')w.deadline=w.startedAt+300;
     delay={needle:'UPDATE delegated_consent_sessions',ms:650};
     result.consumption=await store.consumeAuthorization({identity:i,consumedAt:new Date(at).toISOString(),window:w},lease);result.rows=await snapshot();
    }else{
     const consumption=await consume();result.consumed=!!consumption;
     if(b.case==='witness'){
      result.cloneDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption:{...consumption},grant},lease));
      result.foreignDenied=await rejected(()=>createFinitePreparationIssuerStore({ctx,env}).insertReadGrant({...opts(),consumption,grant},lease));
      const otherLease=Object.freeze({signal:lease.signal,assertCurrent:lease.assertCurrent});
      result.leaseDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption,grant},otherLease));
      result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
      result.replayDenied=await rejected(()=>store.insertReadGrant({...opts(),consumption,grant},lease));
     }else if(b.case==='grant_expiry_queue'){
      const g={...grant,expiresAt:new Date(Date.now()+300).toISOString()};delay={needle:'INSERT INTO delegated_access_grants',ms:650};
      result.grant=await store.insertReadGrant({...opts(),consumption,grant:g},lease);
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
export default {fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};
