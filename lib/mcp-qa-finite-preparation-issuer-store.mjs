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
 return Object.freeze({
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
