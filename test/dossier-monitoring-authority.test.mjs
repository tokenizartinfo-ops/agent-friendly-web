import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,existsSync} from 'node:fs';
import {projectDossierEvent} from '../lib/dossier-supervision.mjs';
const api=await import('../lib/dossier-monitoring-authority.mjs').catch(()=>({}));
const now=1791720000000,resource='https://private.example.invalid/mcp';
const requestId='11111111-1111-4111-8111-111111111111',revokeId='22222222-2222-4222-8222-222222222222';
function fixture(){
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
 const path='db/dossier-monitoring-consent.sql';if(existsSync(path))sqlite.exec(readFileSync(path,'utf8'));
 sqlite.prepare('INSERT INTO site_projects VALUES(?,?,?)').run('p','owner',3);
 sqlite.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').run('g','owner','client','p',resource,'["afw:project:read"]',new Date(now+600000).toISOString(),'');
 const statement=(sql,args=[])=>({bind:(...values)=>statement(sql,values),first:async()=>sqlite.prepare(sql).get(...args)||null,run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}})});
 const db={withSession(mode){assert.equal(mode,'first-primary');return this;},prepare:sql=>statement(sql)};
 const options={db,subject:'owner',grantId:'g',projectId:'p',expectedRevision:3,expectedSequence:0,requestId,action:'grant',now};
 const context={grantId:'g',subject:'owner',clientId:'client',resource,scopes:['afw:project:read']};
 return{sqlite,db,options,context};
}

test('read consent does not become monitoring; explicit purpose grant is finite and retry does not renew',async()=>{
 assert.equal(typeof api.recordDossierMonitoringConsent,'function');
 const f=fixture();try{
  const read=api.createDossierMonitoringAuthorization({db:f.db,context:f.context,projectId:'p',projectionSecret:'x'.repeat(32),now:()=>now});
  assert.equal((await read()).enabled,false);
  const result=await api.recordDossierMonitoringConsent(f.options);assert.equal(result.status,200);
  assert.equal((await read()).enabled,true);assert.equal((await read()).expiresAt,now+600000);
  assert.deepEqual(await api.recordDossierMonitoringConsent({...f.options,now:now+10000}),result);
  assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_monitoring_consent_events').get().n,1);
  const projected=await projectDossierEvent({id:'original',projectId:'p',type:'project_created',revision:1,createdAt:new Date(now).toISOString()},'x'.repeat(32));
  assert.equal((await read()).projectRef,projected.projectRef);
 }finally{f.sqlite.close();}
});

test('withdrawal is terminal for this grant and history cannot be updated or erased',async()=>{
 assert.equal(typeof api.recordDossierMonitoringConsent,'function');const f=fixture();try{
  const grant=await api.recordDossierMonitoringConsent(f.options);
  const revoke=await api.recordDossierMonitoringConsent({...f.options,action:'revoke',expectedSequence:grant.sequence,requestId:revokeId,now:now+1});assert.equal(revoke.status,200);
  const read=api.createDossierMonitoringAuthorization({db:f.db,context:f.context,projectId:'p',projectionSecret:'x'.repeat(32),now:()=>now+2});assert.equal((await read()).enabled,false);
  assert.equal((await api.recordDossierMonitoringConsent({...f.options,requestId:'33333333-3333-4333-8333-333333333333',expectedSequence:revoke.sequence,now:now+2})).status,409);
  assert.throws(()=>f.sqlite.exec('DELETE FROM dossier_monitoring_consent_events'));assert.throws(()=>f.sqlite.exec('UPDATE dossier_monitoring_consent_events SET expires_at=9999999999999'));
 }finally{f.sqlite.close();}
});

for(const [name,mutation] of [
 ['grant revocation',f=>f.sqlite.exec("UPDATE delegated_access_grants SET revoked_at='2026-10-11T12:00:00.000Z'")],
 ['owner change',f=>f.sqlite.exec("UPDATE site_projects SET user_id='other'")],
 ['scope withdrawal',f=>f.sqlite.exec("UPDATE delegated_access_grants SET scopes_json='[]'")],
 ['client change',f=>f.sqlite.exec("UPDATE delegated_access_grants SET client_id='other'")],
 ['malformed scope object',f=>f.sqlite.prepare('UPDATE delegated_access_grants SET scopes_json=?').run('{"scope":"afw:project:read"}')],
 ['mixed scope members',f=>f.sqlite.prepare('UPDATE delegated_access_grants SET scopes_json=?').run('["afw:project:read",1]')],
])test('live primary authority rejects '+name,async()=>{
 assert.equal(typeof api.recordDossierMonitoringConsent,'function');const f=fixture();try{
  await api.recordDossierMonitoringConsent(f.options);const read=api.createDossierMonitoringAuthorization({db:f.db,context:f.context,projectId:'p',projectionSecret:'x'.repeat(32),now:()=>now});assert.equal((await read()).enabled,true);mutation(f);await assert.rejects(read,/Monitoring authorization unavailable/);
 }finally{f.sqlite.close();}
});

test('permission expiry is checked after database awaits and withdrawal survives monitor expiry',async()=>{
 assert.equal(typeof api.recordDossierMonitoringConsent,'function');const f=fixture();try{
  const grant=await api.recordDossierMonitoringConsent({...f.options,expiresAt:now+100});let clock=now;
  const prepare=f.db.prepare;f.db.prepare=sql=>{const stmt=prepare(sql),bind=stmt.bind;stmt.bind=(...args)=>{const bound=bind(...args),first=bound.first;bound.first=async()=>{const row=await first();clock=now+100;return row;};return bound;};return stmt;};
  const read=api.createDossierMonitoringAuthorization({db:f.db,context:f.context,projectId:'p',projectionSecret:'x'.repeat(32),now:()=>clock});assert.equal((await read()).enabled,false);
  f.db.prepare=prepare;assert.equal((await api.recordDossierMonitoringConsent({...f.options,action:'revoke',requestId:revokeId,expectedSequence:grant.sequence,now:now+100})).status,200);
 }finally{f.sqlite.close();}
});

test('monitoring cannot outlive the original OAuth permission window',async()=>{
 const f=fixture();try{
  f.sqlite.prepare('UPDATE delegated_access_grants SET expires_at=?').run(new Date(now+100).toISOString());
  assert.equal((await api.recordDossierMonitoringConsent(f.options)).status,409);
  assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_monitoring_consent_events').get().n,0);
 }finally{f.sqlite.close();}
});

test('malformed request identifiers never write a permission',async()=>{
 const f=fixture();try{assert.equal((await api.recordDossierMonitoringConsent({...f.options,requestId:'-'.repeat(36)})).status,400);assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sqlite.close();}
});

test('a malformed live scope array cannot create monitoring consent',async()=>{
 const f=fixture();try{
  f.sqlite.prepare('UPDATE delegated_access_grants SET scopes_json=?').run('["afw:project:read",null]');
  assert.equal((await api.recordDossierMonitoringConsent(f.options)).status,409);assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_monitoring_consent_events').get().n,0);
 }finally{f.sqlite.close();}
});

test('malformed OAuth context scope members are refused before constructing authority',()=>{
 const f=fixture();try{assert.throws(()=>api.createDossierMonitoringAuthorization({db:f.db,context:{...f.context,scopes:['afw:project:read',1]},projectId:'p',projectionSecret:'x'.repeat(32),now:()=>now}),/Monitoring authorization unavailable/);}finally{f.sqlite.close();}
});

test('grant withdrawal between consent preparation and native INSERT cannot create permission',async()=>{
 const f=fixture();try{
  const prepare=f.db.prepare;f.db.prepare=sql=>{if(sql.startsWith('INSERT INTO dossier_monitoring_consent_events'))f.sqlite.exec("UPDATE delegated_access_grants SET revoked_at='2026-10-11T12:00:00.000Z'");return prepare(sql);};
  assert.equal((await api.recordDossierMonitoringConsent(f.options)).status,409);assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_monitoring_consent_events').get().n,0);
 }finally{f.sqlite.close();}
});

test('live ownership withdrawal during the first authority await denies stale authorization',async()=>{
 const f=fixture();try{
  await api.recordDossierMonitoringConsent(f.options);const prepare=f.db.prepare;let changed=false;
  f.db.prepare=sql=>{const stmt=prepare(sql),bind=stmt.bind;stmt.bind=(...args)=>{const bound=bind(...args),first=bound.first;bound.first=async()=>{const row=await first();if(!changed){changed=true;f.sqlite.exec("UPDATE site_projects SET user_id='other'");}return row;};return bound;};return stmt;};
  const read=api.createDossierMonitoringAuthorization({db:f.db,context:f.context,projectId:'p',projectionSecret:'x'.repeat(32),now:()=>now});await assert.rejects(read,/Monitoring authorization unavailable/);
 }finally{f.sqlite.close();}
});

test('original primary monitoring authority composes the real lifecycle without read-permission promotion',async()=>{
 assert.equal(typeof api.createDossierMonitoringEventsAuthority,'function');const f=fixture();let sends=0;
 const state=new DatabaseSync(':memory:');state.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT NOT NULL)');let queue=Promise.resolve();
 const storage={transaction(fn){const result=queue.then(async()=>{state.exec('BEGIN');try{const out=await fn({get:async k=>{const row=state.prepare('SELECT v FROM records WHERE k=?').get(k);return row?JSON.parse(row.v):undefined;},put:async(k,v)=>state.prepare('INSERT INTO records VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k,JSON.stringify(v))});state.exec('COMMIT');return out;}catch(error){state.exec('ROLLBACK');throw error;}});queue=result.catch(()=>{});return result;}};
 try{
  const authority=api.createDossierMonitoringEventsAuthority({db:f.db,context:f.context,projectId:'p',projectionSecret:'x'.repeat(32),storage,custodyKey:Buffer.alloc(32,1),now:()=>now,send:async(_,message)=>{sends++;return{status:200,body:JSON.stringify({challenge:JSON.parse(message.body).challenge})};}});
  assert.equal(await authority.list(),null);
  const grant=await api.recordDossierMonitoringConsent(f.options),projectRef=await authority.list();assert.equal(typeof projectRef,'string');
  const params={name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.example.com/own',secret:'whsec_'+Buffer.alloc(32,2).toString('base64')}};
  const first=await authority.subscribe(params);assert.deepEqual(await authority.subscribe(params),first);assert.equal(sends,1);
  await api.recordDossierMonitoringConsent({...f.options,action:'revoke',expectedSequence:grant.sequence,requestId:revokeId});assert.equal(await authority.list(),null);
  const {secret:ignored,...delivery}=params.delivery;void ignored;await authority.unsubscribe({...params,delivery});await assert.rejects(authority.subscribe(params));assert.equal(sends,1);
 }finally{state.close();f.sqlite.close();}
});
test('monitoring composition honors closed Node readiness and exposes only a separate internal consume method',async()=>{
 const f=fixture(),state=new DatabaseSync(':memory:');state.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT NOT NULL)');let localSends=0;
 const storage={transaction:async fn=>fn({get:async k=>{const row=state.prepare('SELECT v FROM records WHERE k=?').get(k);return row?JSON.parse(row.v):undefined;},put:async(k,v)=>state.prepare('INSERT INTO records VALUES(?,?)').run(k,JSON.stringify(v))})};
 try{
 const nodeHost={processGeneration:'f'.repeat(64),readReadiness:async()=>({purpose:'afw.mcp-node-readiness.v1',processGeneration:'f'.repeat(64),ready:false,expiresAt:now+600000}),readIdentity:async()=>{throw Error('not reached');},send:async()=>{throw Error('not reached');}};
 const authority=api.createDossierMonitoringEventsAuthority({db:f.db,context:f.context,projectId:'p',projectionSecret:'x'.repeat(32),storage,custodyKey:Buffer.alloc(32,1),now:()=>now,nodeHost,send:async()=>{localSends++;return{status:200,body:''};}});
 assert.equal(typeof authority.consumeNodeDispatch,'function');await api.recordDossierMonitoringConsent(f.options);const projectRef=await authority.list();
 await assert.rejects(authority.subscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.example.com/own',secret:'whsec_'+Buffer.alloc(32,2).toString('base64')}}));
 assert.equal(localSends,0);assert.equal(state.prepare('SELECT count(*) n FROM records').get().n,0);
 }finally{state.close();f.sqlite.close();}
});

test('consent writer snapshots server actor and grant before awaits',async()=>{
 const f=fixture();try{
  f.sqlite.prepare('INSERT INTO site_projects VALUES(?,?,?)').run('foreign','other',3);
  f.sqlite.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').run('foreign-g','other','client','foreign',resource,'["afw:project:read"]',new Date(now+600000).toISOString(),'');
  const prepare=f.db.prepare;let changed=false;
  f.db.prepare=sql=>{const stmt=prepare(sql),bind=stmt.bind;stmt.bind=(...args)=>{const bound=bind(...args),first=bound.first;bound.first=async()=>{const row=await first();if(!changed){changed=true;Object.assign(f.options,{subject:'other',projectId:'foreign',grantId:'foreign-g'});}return row;};return bound;};return stmt;};
  assert.equal((await api.recordDossierMonitoringConsent(f.options)).status,200);
  assert.equal(f.sqlite.prepare('SELECT project_id FROM dossier_monitoring_consent_events').get().project_id,'p');
 }finally{f.sqlite.close();}
});

test('concurrent different requests cannot create two original monitoring grants',async()=>{
 const f=fixture();try{
  const results=await Promise.all([api.recordDossierMonitoringConsent(f.options),api.recordDossierMonitoringConsent({...f.options,requestId:revokeId})]);
  assert.deepEqual(results.map(x=>x.status).sort(),[200,409]);assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_monitoring_consent_events').get().n,1);
 }finally{f.sqlite.close();}
});
