import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash} from './mcp-qa-finite-initial-material-records.mjs';
import {validateFinitePreparationIssuerIdentity as identity,issuerTime,issuerUuid,issuerIso,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
// SOURCE ONLY. This exact schema must be installed separately; never installed here.
export const FINITE_PREPARATION_ISSUER_SCHEMA=Object.freeze([
 "CREATE TABLE finite_preparation_issuer_fences (\n preconnection_id TEXT PRIMARY KEY NOT NULL CHECK (length(preconnection_id)=64 AND preconnection_id NOT GLOB '*[^a-f0-9]*'),\n authorization_hash TEXT UNIQUE NOT NULL CHECK (length(authorization_hash)=64 AND authorization_hash NOT GLOB '*[^a-f0-9]*'),\n grant_id TEXT UNIQUE NOT NULL CHECK (length(grant_id)=36 AND substr(grant_id,9,1)='-' AND substr(grant_id,14,1)='-' AND substr(grant_id,19,1)='-' AND substr(grant_id,24,1)='-' AND length(replace(grant_id,'-',''))=32 AND replace(grant_id,'-','') NOT GLOB '*[^a-f0-9]*'),\n enrollment_hash TEXT NOT NULL CHECK (length(enrollment_hash)=64 AND enrollment_hash NOT GLOB '*[^a-f0-9]*'),\n identity_hash TEXT NOT NULL CHECK (length(identity_hash)=64 AND identity_hash NOT GLOB '*[^a-f0-9]*'),\n reserved_at INTEGER NOT NULL CHECK (typeof(reserved_at)='integer' AND reserved_at>=0),\n forward_until INTEGER NOT NULL CHECK (typeof(forward_until)='integer'),\n cleanup_until INTEGER NOT NULL CHECK (typeof(cleanup_until)='integer' AND cleanup_until<=8640000000000000),\n fence_request_id TEXT NULL CHECK (fence_request_id IS NULL OR (length(fence_request_id)=36 AND substr(fence_request_id,9,1)='-' AND substr(fence_request_id,14,1)='-' AND substr(fence_request_id,19,1)='-' AND substr(fence_request_id,24,1)='-' AND length(replace(fence_request_id,'-',''))=32 AND replace(fence_request_id,'-','') NOT GLOB '*[^a-f0-9]*')),\n fenced_at INTEGER NULL CHECK (fenced_at IS NULL OR (typeof(fenced_at)='integer' AND reserved_at<=fenced_at AND fenced_at<cleanup_until)),\n CHECK (reserved_at<forward_until AND forward_until<cleanup_until),\n CHECK ((fence_request_id IS NULL)=(fenced_at IS NULL))\n)",
 "CREATE TRIGGER finite_preparation_issuer_fences_no_delete BEFORE DELETE ON finite_preparation_issuer_fences BEGIN SELECT RAISE(ABORT,'issuer fence retained'); END",
 "CREATE TRIGGER finite_preparation_issuer_fences_immutable_identity BEFORE UPDATE ON finite_preparation_issuer_fences WHEN NEW.preconnection_id IS NOT OLD.preconnection_id OR NEW.authorization_hash IS NOT OLD.authorization_hash OR NEW.grant_id IS NOT OLD.grant_id OR NEW.enrollment_hash IS NOT OLD.enrollment_hash OR NEW.identity_hash IS NOT OLD.identity_hash OR NEW.reserved_at IS NOT OLD.reserved_at OR NEW.forward_until IS NOT OLD.forward_until OR NEW.cleanup_until IS NOT OLD.cleanup_until BEGIN SELECT RAISE(ABORT,'issuer identity immutable'); END",
 "CREATE TRIGGER finite_preparation_issuer_fences_terminal_fence BEFORE UPDATE ON finite_preparation_issuer_fences WHEN OLD.fenced_at IS NOT NULL AND (NEW.fenced_at IS NOT OLD.fenced_at OR NEW.fence_request_id IS NOT OLD.fence_request_id) BEGIN SELECT RAISE(ABORT,'issuer fence terminal'); END"
]);

const T='finite_preparation_issuer_fences',NOW="CAST(unixepoch('subsec')*1000 AS INTEGER)";
const fail=()=>{throw Error('Finite preparation issuer SQL unavailable');};
const check=x=>{if(!x)fail();};
const isoMs=x=>"(CAST(strftime('%s',"+x+") AS INTEGER)*1000+CAST(substr("+x+",21,3) AS INTEGER))";
const canonicalIso=x=>"typeof("+x+")='text' AND length("+x+")=24 AND strftime('%Y-%m-%dT%H:%M:%fZ',"+x+")="+x;
const columns=['preconnection_id','authorization_hash','grant_id','enrollment_hash','identity_hash','reserved_at','forward_until','cleanup_until'];
const match=(a='f',b='q')=>columns.map(k=>a+'.'+k+'='+b+'.'+k).join(' AND ');
const qcols=[...columns,'subject','project','revision','client','resource','scopes','consent','started','deadline'];
const cte='WITH q('+qcols.join(',')+') AS (SELECT '+qcols.map(()=>'?').join(',')+'), n(ms) AS (SELECT '+NOW+') ';
const owner='EXISTS (SELECT 1 FROM site_projects p WHERE p.id=q.project AND p.user_id=q.subject AND p.revision=q.revision)';
const windowSql='n.ms>=q.started AND n.ms<q.deadline';
const live=windowSql+' AND n.ms<q.forward_until AND n.ms<'+isoMs('q.consent')+' AND '+canonicalIso('q.consent');
const fence='EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fenced_at IS NULL)';
const consent="c.handle_hash=q.authorization_hash AND c.user_id=q.subject AND c.kind='authorize' AND c.project_id=q.project AND c.client_id=q.client AND c.resource=q.resource AND c.scopes_json=q.scopes AND c.expires_at=q.consent";
const consentCols='handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at';
const grantCols='id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at';
const normalized=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'');

// Metadata only: ordinary DDL is installed exclusively by the SYN fixture.
export const FINITE_PREPARATION_MONITORING_SCHEMA=Object.freeze([
 "CREATE TABLE IF NOT EXISTS dossier_monitoring_consent_events (\n sequence INTEGER PRIMARY KEY AUTOINCREMENT,\n grant_id TEXT NOT NULL,\n project_id TEXT NOT NULL,\n user_id TEXT NOT NULL,\n client_id TEXT NOT NULL,\n resource TEXT NOT NULL,\n revision INTEGER NOT NULL CHECK(revision>0),\n action TEXT NOT NULL CHECK(action IN ('grant','revoke')),\n purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring.v1'),\n request_id TEXT NOT NULL,\n issued_at INTEGER NOT NULL CHECK(issued_at>=0),\n expires_at INTEGER NOT NULL,\n CHECK((action='grant' AND expires_at>issued_at AND expires_at-issued_at<=600000) OR (action='revoke' AND expires_at=issued_at)),\n UNIQUE(grant_id,request_id)\n)",
 "CREATE INDEX IF NOT EXISTS dossier_monitoring_consent_grant_sequence ON dossier_monitoring_consent_events(grant_id,sequence)",
 "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_update BEFORE UPDATE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END",
 "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_delete BEFORE DELETE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END",
 "CREATE TABLE IF NOT EXISTS dossier_monitoring_owner_tickets (\n handle_hash TEXT PRIMARY KEY,\n request_id TEXT NOT NULL UNIQUE,\n user_id TEXT NOT NULL,\n grant_id TEXT NOT NULL,\n project_id TEXT NOT NULL,\n client_id TEXT NOT NULL,\n resource TEXT NOT NULL,\n purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring-owner.v1'),\n action TEXT NOT NULL CHECK(action IN ('grant','revoke')),\n revision INTEGER NOT NULL CHECK(revision>0),\n expected_sequence INTEGER NOT NULL CHECK(expected_sequence>=0),\n issued_at INTEGER NOT NULL,\n expires_at INTEGER NOT NULL CHECK(expires_at>issued_at AND expires_at-issued_at<=600000),\n permission_expires_at INTEGER NOT NULL\n)",
 "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_update BEFORE UPDATE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END",
 "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_delete BEFORE DELETE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END"
]);
const monitoringTables=['dossier_monitoring_consent_events','dossier_monitoring_owner_tickets'];
const ticketColumns='handle_hash request_id user_id grant_id project_id client_id resource purpose action revision expected_sequence issued_at expires_at permission_expires_at'.split(' ');
const eventColumns='sequence grant_id project_id user_id client_id resource revision action purpose request_id issued_at expires_at'.split(' ');
const monitoringNames=['identity','expectedGrant','consumedAt','accessExpiresAt','preconnectionExpiresAt','window'];
const monitoringQ=[...qcols,'grant_scopes','created','grant_expiry','consumed','access_until','preconnection_until','handle','request','expected_sequence','issued','ticket_expiry','permission'];
const monitoringCte='WITH q('+monitoringQ.join(',')+') AS (SELECT '+monitoringQ.map(()=>'?').join(',')+'), n(ms) AS (SELECT '+NOW+') ';
const monitoringNormalize=x=>normalized(x).replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
const monitoringFence='EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fenced_at IS NULL AND f.fence_request_id IS NULL)';
const monitoringGrant="g.id=q.grant_id AND g.user_id=q.subject AND g.project_id=q.project AND g.client_id=q.client AND g.resource=q.resource AND g.scopes_json=q.grant_scopes AND g.created_at=q.created AND g.expires_at=q.grant_expiry AND g.revoked_at='' AND "+canonicalIso('g.created_at')+' AND '+canonicalIso('g.expires_at')+' AND '+isoMs('g.created_at')+'>='+isoMs('q.consumed')+' AND '+isoMs('g.created_at')+'<=n.ms AND (g.exchanged_at=\'\' OR ('+canonicalIso('g.exchanged_at')+' AND '+isoMs('g.exchanged_at')+'>='+isoMs('g.created_at')+' AND '+isoMs('g.exchanged_at')+'<=n.ms AND '+isoMs('g.exchanged_at')+'<'+isoMs('g.expires_at')+'))';
const monitoringLive=owner+' AND '+monitoringFence+' AND '+live+' AND n.ms>=q.issued AND n.ms<'+isoMs('g.expires_at')+' AND n.ms<q.access_until AND n.ms<q.preconnection_until AND n.ms<q.ticket_expiry AND n.ms<q.permission AND '+canonicalIso('q.consumed')+" AND c.consumed_at=q.consumed AND c.consumed_at<>'' AND COALESCE((SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id),0)=q.expected_sequence AND q.expected_sequence=0 AND NOT EXISTS (SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id)";
const monitoringFrom=' FROM q,n JOIN delegated_consent_sessions c ON '+consent+' JOIN delegated_access_grants g ON '+monitoringGrant;
const ticketExpressions=["q.handle","q.request","q.subject","q.grant_id","q.project","q.client","q.resource","'afw.dossier-monitoring-owner.v1'","'grant'","q.revision","q.expected_sequence","q.issued","q.ticket_expiry","q.permission"];
const monitoringTicketMatch=ticketColumns.map((k,j)=>'t.'+k+'='+ticketExpressions[j]).join(' AND ');

export function createFinitePreparationIssuerStore(options){
 fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options),consumptions=new WeakMap(),barriers=new WeakMap(),observations=new WeakMap(),grantAttempts=new Set(),closeAttempts=new Set();
 function input(options,names){
  // Snapshot DATA before the first await; witnesses are kept by identity separately.
  fields(options,names);const data=own(Object.fromEntries(names.filter(k=>!['consumption','barrier','observation'].includes(k)).map(k=>[k,Object.getOwnPropertyDescriptor(options,k).value])));
  const i=identity(data.identity),w=data.window;fields(w,['startedAt','deadline']);
  check(issuerTime(w.startedAt)&&issuerTime(w.deadline)&&w.startedAt<w.deadline&&w.deadline-w.startedAt<=5000&&w.startedAt>=i.reservedAt);
  check(i.actorId===c.actorId&&i.qaVersionId===c.qa);
  return {...data,identity:i,window:w};
 }
 function values(i,w){return [i.preconnectionId,i.authorizationHash,i.grantId,i.enrollmentHash,i.identityHash,i.reservedAt,i.C0,i.C1,i.subject,i.projectId,i.projectRevision,i.clientId,i.resource,JSON.stringify(i.requestedScopes),i.consentExpiresAt,w.startedAt,w.deadline];}
 function forward(i,w){check(w.deadline<=Math.min(i.C0,Date.parse(i.consentExpiresAt)));}
 function cleanup(i,w){check(w.deadline<=i.C1);}
 function exactFence(row,i,requestId,terminal=true){
  check(row&&columns.every((k,n)=>row[k]===values(i,{startedAt:0,deadline:1})[n]));
  if(terminal)check(row.fence_request_id===requestId&&issuerTime(row.fenced_at)&&row.fenced_at>=i.reservedAt&&row.fenced_at<i.C1);
  return Object.freeze({...row});
 }
 async function query(sql,args,g,session=null,mode='first'){
  g();const s=session??Reflect.apply(c.session,c.db,['first-primary']),prepare=s?.prepare;
  check(typeof prepare==='function');const stmt=Reflect.apply(prepare,s,[sql]),bind=stmt?.bind;check(typeof bind==='function');
  const bound=Reflect.apply(bind,stmt,args),method=bound?.[mode];check(typeof method==='function');
  const r=await c.wait(Reflect.apply(method,bound,[]),g);g();return r;
 }
 async function preflight(g){
  const s=Reflect.apply(c.session,c.db,['first-primary']);
  const r=await query("SELECT type,name,sql FROM sqlite_schema WHERE tbl_name='"+T+"' AND type IN ('table','trigger') ORDER BY type,name",[],g,s,'all');
  const rows=r.results??[];check(rows.length===4);
  for(const def of FINITE_PREPARATION_ISSUER_SCHEMA){const name=def.match(/^CREATE (?:TABLE|TRIGGER) (\w+)/)[1];check(rows.some(x=>x.name===name&&normalized(x.sql)===normalized(def)));}
  const clock=await query("SELECT "+NOW+" AS ms,typeof("+NOW+") AS kind,"+isoMs("'2026-11-04T12:00:00.123Z'")+" AS iso,strftime('%Y-%m-%dT%H:%M:%fZ','2026-11-04T12:00:00.123Z') AS canonical",[],g,s);
  check(issuerTime(clock?.ms)&&clock.ms>0&&clock.kind==='integer'&&clock.iso===1793793600123&&clock.canonical==='2026-11-04T12:00:00.123Z');
  await query('SELECT '+consentCols+' FROM delegated_consent_sessions LIMIT 0',[],g,s,'all');
  await query('SELECT '+grantCols+' FROM delegated_access_grants LIMIT 0',[],g,s,'all');
  await query('SELECT id,user_id,revision FROM site_projects LIMIT 0',[],g,s,'all');
  // The ordinary tables retain their semantics; qualify their actual declared domains.
  for(const [table,expected]of [
   ['delegated_consent_sessions',Object.fromEntries(consentCols.split(',').map(k=>[k,'TEXT']))],
   ['delegated_access_grants',Object.fromEntries(grantCols.split(',').map(k=>[k,'TEXT']))],
   ['site_projects',{id:'TEXT',user_id:'TEXT',revision:'INTEGER'}]
  ]){
   const shape=await query('PRAGMA table_info('+table+')',[],g,s,'all');
   check(Object.entries(expected).every(([name,type])=>(shape.results??[]).some(col=>col.name===name&&col.type.toUpperCase()===type)));
  }g();
 }
 function grantData(v,i){
  fields(v,['scopes','createdAt','expiresAt']);check(issuerScopes(v.scopes)&&v.scopes.every(x=>i.requestedScopes.includes(x))&&issuerIso(v.createdAt)&&issuerIso(v.expiresAt)&&Date.parse(v.createdAt)>=i.reservedAt&&Date.parse(v.createdAt)<Date.parse(v.expiresAt)&&Date.parse(v.expiresAt)<=Math.min(Date.parse(i.consentExpiresAt),i.C0));
  return v;
 }
 function consumptionRow(row,i,consumedAt){
  check(issuerIso(consumedAt)&&Date.parse(consumedAt)>=i.reservedAt&&Date.parse(consumedAt)<Math.min(Date.parse(i.consentExpiresAt),i.C0));
  check(row&&row.handle_hash===i.authorizationHash&&row.user_id===i.subject&&row.kind==='authorize'&&row.project_id===i.projectId&&row.client_id===i.clientId&&row.resource===i.resource&&row.scopes_json===JSON.stringify(i.requestedScopes)&&row.expires_at===i.consentExpiresAt&&row.consumed_at===consumedAt);
  return Object.freeze({...row});
 }
 function grantRow(row,i,g){
  check(row&&row.id===i.grantId&&row.user_id===i.subject&&row.client_id===i.clientId&&row.project_id===i.projectId&&row.resource===i.resource&&row.scopes_json===JSON.stringify(g.scopes)&&row.created_at===g.createdAt&&row.expires_at===g.expiresAt&&typeof row.revoked_at==='string'&&(row.revoked_at===''||issuerIso(row.revoked_at))&&typeof row.exchanged_at==='string'&&(row.exchanged_at===''||issuerIso(row.exchanged_at)));
  return Object.freeze({...row});
 }
 function witness(map,v,i,lease){const w=map.get(v);check(w&&w.identityHash===i.identityHash&&w.lease===lease);return w;}
 async function readBarrier(i,requestId,w,g){
  // SELECT is deliberately the FIRST statement on a NEW first-primary session.
  const s=Reflect.apply(c.session,c.db,['first-primary']);
  const r=await query(cte+'SELECT f.* FROM '+T+' f,q,n WHERE '+match()+' AND f.fence_request_id=? AND f.fenced_at IS NOT NULL AND '+owner+' AND '+windowSql+' AND n.ms<q.cleanup_until', [...values(i,w),requestId],g,s);
  return exactFence(r,i,requestId);
 }
 async function barrierResult(i,requestId,w,g,lease,ack=null){
  const row=await readBarrier(i,requestId,w,g);if(ack)check(canonical(row)===canonical(ack));
  const result=Object.freeze({status:'fenced',row,rowHash:hash('afw.finite-preparation-issuer-row.v1',row)});
  barriers.set(result,{identityHash:i.identityHash,lease,row});return result;
 }

 // New notice boundary deliberately leaves the original input/preflight untouched.
 const monitoringWitnesses=new WeakMap(),ticketAttempts=new Set(),noticeAttempts=new Set(),monitoringFailed=new Set();
 function monitoringGuard(id,lease){
  const original=c.leaseGuard(lease);
  return ()=>{check(!monitoringFailed.has(id));original();check(!monitoringFailed.has(id));};
 }
 function monitoringInput(options,hasWitness,argc){
  check(argc===2);const names=[...monitoringNames,hasWitness?'ticketWitness':'ticket'];fields(options,names);
  const data=own(Object.fromEntries(names.filter(k=>k!=='ticketWitness').map(k=>[k,Object.getOwnPropertyDescriptor(options,k).value])));
  const i=identity(data.identity),w=data.window;fields(w,['startedAt','deadline']);
  check(issuerTime(w.startedAt)&&issuerTime(w.deadline)&&w.startedAt<w.deadline&&w.deadline-w.startedAt<=5000&&w.startedAt>=i.reservedAt);
  check(i.actorId===c.actorId&&i.qaVersionId===c.qa);forward(i,w);grantData(data.expectedGrant,i);
  check(issuerIso(data.consumedAt)&&Date.parse(data.consumedAt)>=i.reservedAt&&Date.parse(data.expectedGrant.createdAt)>=Date.parse(data.consumedAt));
  check(issuerTime(data.accessExpiresAt)&&issuerTime(data.preconnectionExpiresAt)&&data.accessExpiresAt<=i.C0&&data.preconnectionExpiresAt<=i.C0);
  return data;
 }
 function monitoringTicket(data,t){
  const i=data.identity,g=data.expectedGrant;
  fields(t,['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt']);
  check(typeof t.handleHash==='string'&&/^[a-f0-9]{64}$/.test(t.handleHash)&&issuerUuid(t.requestId)&&t.expectedSequence===0);
  check(['issuedAt','expiresAt','permissionExpiresAt'].every(k=>issuerTime(t[k]))&&t.issuedAt>=Math.max(i.reservedAt,Date.parse(g.createdAt),Date.parse(data.consumedAt)));
  check(t.issuedAt<t.permissionExpiresAt&&t.permissionExpiresAt<=t.expiresAt&&t.expiresAt-t.issuedAt<=600000);
  check(t.expiresAt<=Math.min(i.C0,Date.parse(i.consentExpiresAt),Date.parse(g.expiresAt),data.accessExpiresAt,data.preconnectionExpiresAt));
  check(Buffer.byteLength(canonical({...data,ticket:t}))<=16384);
  return t;
 }
 const monitoringCommon=data=>Object.freeze(Object.fromEntries(monitoringNames.map(k=>[k,data[k]])));
 function monitoringValues(d,t){return [...values(d.identity,d.window),JSON.stringify(d.expectedGrant.scopes),d.expectedGrant.createdAt,d.expectedGrant.expiresAt,d.consumedAt,d.accessExpiresAt,d.preconnectionExpiresAt,t.handleHash,t.requestId,t.expectedSequence,t.issuedAt,t.expiresAt,t.permissionExpiresAt];}
 function expectedTicket(d,t){const i=d.identity;return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
 function monitoringRow(row,expected,names){
  const snapshot=own(row);fields(snapshot,names);check(Object.entries(expected).every(([k,v])=>snapshot[k]===v));return snapshot;
 }
 async function monitoringPreflight(g){
  await preflight(g);g();
  const s=Reflect.apply(c.session,c.db,['first-primary']);
  const rows=(await query("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name",[],g,s,'all')).results??[];
  check(rows.length===FINITE_PREPARATION_MONITORING_SCHEMA.length);
  for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
   const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/);
   const table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
   // Index syntax has ON table without surrounding spaces; triggers have ON table.
   check(rows.some(r=>r.type===kind.toLowerCase()&&r.name===name&&r.tbl_name===table&&typeof r.sql==='string'&&monitoringNormalize(r.sql)===monitoringNormalize(def)));
  }
  for(const table of monitoringTables){
   const ticket=table===monitoringTables[1],names=ticket?ticketColumns:eventColumns;
   const integers=new Set(ticket?['revision','expected_sequence','issued_at','expires_at','permission_expires_at']:['sequence','revision','issued_at','expires_at']);
   const shape=(await query('PRAGMA table_info('+table+')',[],g,s,'all')).results??[];
   check(shape.length===names.length&&shape.every((col,j)=>col.cid===j&&col.name===names[j]&&col.type.toUpperCase()===(integers.has(col.name)?'INTEGER':'TEXT')&&col.pk===(j===0?1:0)&&col.notnull===(j===0?0:1)&&col.dflt_value===null));
  }g();
 }
 return Object.freeze({
  async insertMonitoringTicket(options,lease){
   let id;
   try{
    const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket);id=d.identity.identityHash;
    check(!monitoringFailed.has(id)&&!ticketAttempts.has(id)&&!noticeAttempts.has(id));ticketAttempts.add(id);
    const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
    const row=await query(monitoringCte+'INSERT INTO dossier_monitoring_owner_tickets ('+ticketColumns.join(',')+') SELECT '+ticketExpressions.join(',')+monitoringFrom+' WHERE '+monitoringLive+' RETURNING '+ticketColumns.join(','),monitoringValues(d,t),g);
    g();return row?Object.freeze({status:'applied',row:monitoringRow(row,expectedTicket(d,t),ticketColumns)}):Object.freeze({status:'no_mutation'});
   }catch{if(id)monitoringFailed.add(id);fail();}
  },
  async observeMonitoringTicket(options,lease){
   try{
    const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket),id=d.identity.identityHash;
    check(!monitoringFailed.has(id));const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
    // This conditional SELECT is the FIRST statement on a NEW first-primary.
    const s=Reflect.apply(c.session,c.db,['first-primary']);
    const row=await query(monitoringCte+'SELECT t.*'+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive,monitoringValues(d,t),g,s);
    g();if(!row)return null;
    const detached=monitoringRow(row,expectedTicket(d,t),ticketColumns),out=Object.freeze({status:'observed',row:detached});
    monitoringWitnesses.set(out,{row:detached,identityHash:id,common:monitoringCommon(d),ticket:t,lease,used:false});return out;
   }catch{fail();}
  },
  async insertMonitoringConsent(options,lease){
   let id;
   try{
    const d=monitoringInput(options,true,arguments.length),fact=monitoringWitnesses.get(Object.getOwnPropertyDescriptor(options,'ticketWitness').value);id=d.identity.identityHash;
    check(fact&&!fact.used&&fact.identityHash===id&&fact.lease===lease&&canonical(fact.common)===canonical(monitoringCommon(d)));
    const t=monitoringTicket(d,fact.ticket);
    check(!monitoringFailed.has(id)&&!noticeAttempts.has(id));fact.used=true;noticeAttempts.add(id);
    const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
    const row=await query(monitoringCte+"INSERT INTO dossier_monitoring_consent_events ("+eventColumns.slice(1).join(',')+") SELECT q.grant_id,q.project,q.subject,q.client,q.resource,q.revision,'grant','afw.dossier-monitoring.v1',q.request,n.ms,q.permission"+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive+' RETURNING '+eventColumns.join(','),monitoringValues(d,t),g);
    g();if(!row)return Object.freeze({status:'no_mutation'});
    check(Number.isSafeInteger(row.sequence)&&row.sequence>0&&issuerTime(row.issued_at)&&row.issued_at>=Math.max(d.window.startedAt,t.issuedAt)&&row.issued_at<Math.min(d.window.deadline,t.permissionExpiresAt));
    const i=d.identity,expected={grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,expires_at:t.permissionExpiresAt};
    return Object.freeze({status:'applied',row:monitoringRow(row,expected,eventColumns)});
   }catch{if(id)monitoringFailed.add(id);fail();}
  },

  async insertMonitoringRevocation(options,lease){
   // Terminal cleanup uses the existing same-store barrier witness. Expired
   // permission is historical input, never renewed authorization.
   let id;
   try{
    check(arguments.length===2);
    const {identity:i,window:w,expectedGrant,expectedConsent:e,requestId}=input(options,['identity','barrier','expectedGrant','expectedConsent','requestId','window']);
    id=i.identityHash;cleanup(i,w);grantData(expectedGrant,i);
    check(issuerUuid(requestId)&&!monitoringFailed.has(id)&&!noticeAttempts.has('cleanup:'+id));
    const b=witness(barriers,options.barrier,i,lease),g=monitoringGuard(id,lease);
    fields(e,eventColumns);
    check(Number.isSafeInteger(e.sequence)&&e.sequence>0&&e.grant_id===i.grantId&&e.project_id===i.projectId&&e.user_id===i.subject&&e.client_id===i.clientId&&e.resource===i.resource&&e.revision===i.projectRevision&&e.action==='grant'&&e.purpose==='afw.dossier-monitoring.v1'&&issuerUuid(e.request_id)&&issuerTime(e.issued_at)&&issuerTime(e.expires_at)&&e.issued_at>=Date.parse(expectedGrant.createdAt)&&e.issued_at<e.expires_at&&e.expires_at<=Math.min(i.C0,Date.parse(expectedGrant.expiresAt))&&e.expires_at-e.issued_at<=600000);
    g();await monitoringPreflight(g);await readBarrier(i,b.row.fence_request_id,w,g);
    const eventMatch=eventColumns.map(k=>'e.'+k+'=?').join(' AND ');
    const grantMatch="g.id=q.grant_id AND g.user_id=q.subject AND g.project_id=q.project AND g.client_id=q.client AND g.resource=q.resource AND g.scopes_json=? AND g.created_at=? AND g.expires_at=? AND g.revoked_at<>'' AND "+canonicalIso('g.revoked_at');
    const constraint=owner+' AND '+windowSql+' AND n.ms<q.cleanup_until AND EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fence_request_id=? AND f.fenced_at=?) AND EXISTS (SELECT 1 FROM delegated_access_grants g WHERE '+grantMatch+') AND EXISTS (SELECT 1 FROM dossier_monitoring_consent_events e WHERE '+eventMatch+')';
    const args=[...values(i,w),b.row.fence_request_id,b.row.fenced_at,JSON.stringify(expectedGrant.scopes),expectedGrant.createdAt,expectedGrant.expiresAt,...eventColumns.map(k=>e[k])];
    // New first-primary SELECT; preserve a legitimate later withdrawal.
    const latest=await query(cte+'SELECT v.* FROM dossier_monitoring_consent_events v,q,n WHERE v.grant_id=q.grant_id AND '+constraint+' ORDER BY v.sequence DESC LIMIT 1',args,g);
    if(!latest)return Object.freeze({status:'no_mutation'});
    if(latest.sequence!==e.sequence){
     check(latest.sequence>e.sequence&&latest.action==='revoke'&&latest.purpose===e.purpose&&latest.grant_id===i.grantId&&latest.project_id===i.projectId&&latest.user_id===i.subject&&latest.client_id===i.clientId&&latest.resource===i.resource&&latest.revision===i.projectRevision&&issuerUuid(latest.request_id)&&issuerTime(latest.issued_at)&&latest.issued_at>=e.issued_at&&latest.issued_at===latest.expires_at&&latest.issued_at<=Date.now());
     return Object.freeze({status:'already_withdrawn',row:Object.freeze({...latest})});
    }
    check(canonical(latest)===canonical(e));noticeAttempts.add('cleanup:'+id);
    const actual=await query(cte+"INSERT INTO dossier_monitoring_consent_events ("+eventColumns.slice(1).join(',')+") SELECT q.grant_id,q.project,q.subject,q.client,q.resource,q.revision,'revoke','afw.dossier-monitoring.v1',?,n.ms,n.ms FROM q,n WHERE "+constraint+' AND (SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id)=? RETURNING '+eventColumns.join(','),[...values(i,w),requestId,...args.slice(qcols.length),e.sequence],g);
    if(!actual)return Object.freeze({status:'no_mutation'});
    check(actual.sequence>e.sequence&&actual.request_id===requestId&&actual.action==='revoke'&&actual.issued_at===actual.expires_at&&actual.issued_at>=w.startedAt&&actual.issued_at<w.deadline);
    const row=await query(cte+'SELECT v.* FROM dossier_monitoring_consent_events v,q,n WHERE v.grant_id=q.grant_id AND v.request_id=? AND '+constraint,[...values(i,w),requestId,...args.slice(qcols.length)],g);
    check(row&&canonical(row)===canonical(actual));g();
    return Object.freeze({status:'applied',row:Object.freeze({...actual})});
   }catch{if(id)monitoringFailed.add(id);fail();}
  },

  async openFence(options,lease){
   const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
   const row=await query(cte+'INSERT INTO '+T+' ('+columns.join(',')+') SELECT '+columns.map(k=>'q.'+k).join(',')+' FROM q,n WHERE '+owner+' AND '+live+' RETURNING *',values(i,w),g);
   return row?Object.freeze({status:'applied',row:exactFence(row,i,null,false)}):Object.freeze({status:'no_mutation'});
  },
  async insertAuthorization(options,lease){
   const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
   const row=await query(cte+"INSERT INTO delegated_consent_sessions ("+consentCols+") SELECT q.authorization_hash,q.subject,'authorize',q.project,q.client,q.resource,q.scopes,q.consent,'' FROM q,n WHERE "+owner+' AND '+fence+' AND '+live+' RETURNING *',values(i,w),g);
   return row?Object.freeze({status:'applied',row:Object.freeze({...row})}):Object.freeze({status:'no_mutation'});
  },
  async consumeAuthorization(options,lease){
   const {identity:i,window:w,consumedAt}=input(options,['identity','consumedAt','window']);forward(i,w);check(issuerIso(consumedAt)&&Date.parse(consumedAt)>=i.reservedAt&&Date.parse(consumedAt)<Math.min(Date.parse(i.consentExpiresAt),i.C0));
   const g=c.leaseGuard(lease);await preflight(g);
   const row=await query(cte+"UPDATE delegated_consent_sessions AS c SET consumed_at=? FROM q,n WHERE "+consent+" AND c.consumed_at='' AND "+owner+' AND '+fence+' AND '+live+' AND n.ms<'+isoMs('c.expires_at')+' RETURNING '+consentCols,[...values(i,w),consumedAt],g);
   if(!row)return null;
   const result=consumptionRow(row,i,consumedAt);consumptions.set(result,{identityHash:i.identityHash,lease,used:false});return result;
  },
  async insertReadGrant(options,lease){
   const {identity:i,window:w,grant}=input(options,['identity','consumption','grant','window']);forward(i,w);grantData(grant,i);
   const fact=witness(consumptions,options.consumption,i,lease);check(!fact.used&&!grantAttempts.has(i.identityHash));fact.used=true;grantAttempts.add(i.identityHash);
   const consumed=options.consumption,guard=c.leaseGuard(lease);check(Date.parse(grant.createdAt)>=Date.parse(consumed.consumed_at));guard();await preflight(guard);
   const row=await query(cte+'INSERT INTO delegated_access_grants (id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) SELECT q.grant_id,q.subject,q.client,q.project,q.resource,?,?,?,\'\' FROM q,n JOIN delegated_consent_sessions c ON '+consent+' AND c.consumed_at=? WHERE '+owner+' AND '+fence+' AND '+live+' AND n.ms<'+isoMs('c.expires_at')+' AND n.ms<'+isoMs('?')+' RETURNING '+grantCols,[...values(i,w),JSON.stringify(grant.scopes),grant.createdAt,grant.expiresAt,consumed.consumed_at,grant.expiresAt,grant.expiresAt],guard);
   return row?Object.freeze({status:'applied',row:grantRow(row,i,grant)}):Object.freeze({status:'no_mutation'});
  },
  async closeFence(options,lease){
   const {identity:i,window:w,fenceRequestId}=input(options,['identity','fenceRequestId','window']);cleanup(i,w);check(issuerUuid(fenceRequestId)&&!closeAttempts.has(i.identityHash));closeAttempts.add(i.identityHash);
   const g=c.leaseGuard(lease);await preflight(g);
   const row=await query(cte+'INSERT INTO '+T+' ('+columns.join(',')+',fence_request_id,fenced_at) SELECT '+columns.map(k=>'q.'+k).join(',')+',?,n.ms FROM q,n WHERE '+owner+' AND '+windowSql+' AND n.ms<q.cleanup_until AND n.ms>=q.reserved_at ON CONFLICT(preconnection_id) DO UPDATE SET fence_request_id=excluded.fence_request_id,fenced_at=CASE WHEN '+T+'.fenced_at IS NULL THEN excluded.fenced_at ELSE '+T+'.fenced_at END WHERE '+columns.map(k=>T+'.'+k+'=excluded.'+k).join(' AND ')+' AND ('+T+'.fenced_at IS NULL OR '+T+'.fence_request_id=excluded.fence_request_id) RETURNING *',[...values(i,w),fenceRequestId],g);
   exactFence(row,i,fenceRequestId);return barrierResult(i,fenceRequestId,w,g,lease,row);
  },
  async reconcileFence(options,lease){
   const {identity:i,window:w,fenceRequestId}=input(options,['identity','fenceRequestId','window']);cleanup(i,w);check(issuerUuid(fenceRequestId));const g=c.leaseGuard(lease);await preflight(g);
   return barrierResult(i,fenceRequestId,w,g,lease);
  },
  async observeGrant(options,lease){
   const {identity:i,window:w,expectedGrant}=input(options,['identity','barrier','expectedGrant','window']);cleanup(i,w);grantData(expectedGrant,i);const b=witness(barriers,options.barrier,i,lease),g=c.leaseGuard(lease);await preflight(g);
   // Reconfirm the terminal barrier BEFORE the original-UUID lookup.
   await readBarrier(i,b.row.fence_request_id,w,g);
   const result=await query(cte+'SELECT g.* FROM q,n JOIN site_projects p ON p.id=q.project AND p.user_id=q.subject AND p.revision=q.revision LEFT JOIN delegated_access_grants g ON g.id=q.grant_id WHERE '+windowSql+' AND n.ms<q.cleanup_until',values(i,w),g);
   // LEFT JOIN preserves current-owner proof even when the grant is absent.
   check(result);let row=null,consumedAt=null;
   if(result.id!==null){
    row=grantRow(result,i,expectedGrant);
    const consumed=await query(cte+'SELECT c.* FROM delegated_consent_sessions c,q,n WHERE '+consent+" AND c.consumed_at<>'' AND "+owner+' AND '+windowSql+' AND n.ms<q.cleanup_until',values(i,w),g);
    check(consumed&&issuerIso(consumed.consumed_at));consumptionRow(consumed,i,consumed.consumed_at);consumedAt=consumed.consumed_at;
   }
   const out=Object.freeze({status:row?'observed':'absent',row});observations.set(out,{identityHash:i.identityHash,lease,row,barrier:options.barrier,expectedGrant,consumedAt});return out;
  },
  async revokeGrant(options,lease){
   const {identity:i,window:w}=input(options,['identity','barrier','observation','window']);cleanup(i,w);
   const b=witness(barriers,options.barrier,i,lease),o=witness(observations,options.observation,i,lease);check(o.barrier===options.barrier&&o.row);const g=c.leaseGuard(lease);await preflight(g);await readBarrier(i,b.row.fence_request_id,w,g);
   if(o.row.revoked_at!=='')return Object.freeze({status:'already_revoked',row:o.row});
   const grant=o.expectedGrant;
   const row=await query(cte+"UPDATE delegated_access_grants AS g SET revoked_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') FROM q,n WHERE g.id=q.grant_id AND g.user_id=q.subject AND g.client_id=q.client AND g.project_id=q.project AND g.resource=q.resource AND g.scopes_json=? AND g.created_at=? AND g.expires_at=? AND g.revoked_at='' AND "+owner+' AND EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fence_request_id=? AND f.fenced_at=?) AND EXISTS (SELECT 1 FROM delegated_consent_sessions c WHERE '+consent+" AND c.consumed_at=?) AND "+windowSql+' AND n.ms<q.cleanup_until AND '+canonicalIso('g.expires_at')+' AND '+canonicalIso('q.consent')+' RETURNING '+grantCols,[...values(i,w),JSON.stringify(grant.scopes),grant.createdAt,grant.expiresAt,b.row.fence_request_id,b.row.fenced_at,o.consumedAt],g);
   // Actual UPDATE result only. A race/unknown never becomes a successful DTO.
   return row?Object.freeze({status:'revoked',row:grantRow(row,i,grant)}):Object.freeze({status:'no_mutation'});
  }
 });
}
