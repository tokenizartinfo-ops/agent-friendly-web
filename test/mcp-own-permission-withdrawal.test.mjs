import test from 'node:test';
import assert from 'node:assert/strict';
import {createOwnPermissionWithdrawal} from '../lib/mcp-own-permission-withdrawal.mjs';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';

function setup(){
 const f=fixture();f.grant();const c=f.db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE action='grant'").get();
 let closes=0;const o={enabled:true,db:f.config.db,context:{grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:f.config.context.resource},
 originalConsent:{sequence:c.sequence,revision:c.revision,issuedAt:c.issued_at,expiresAt:c.expires_at},
 window:{startAt:Date.now()-1000,expiresAt:Date.now()+60000},requestId:'22222222-2222-4222-8222-222222222222',
 close:async()=>{closes++;return{closed:true,runtimeStopRequested:true};},now:Date.now};
 return{f,o,closes:()=>closes,revoked:()=>f.db.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='g'").get().revoked_at,
 events:()=>f.db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id='g' ORDER BY sequence").all()};
}
const limited=r=>{assert.equal(r.nativeWithdrawalVerified,false);assert.equal(r.physicalStopVerified,false);assert.equal(r.operationalReadiness,false);assert.equal(JSON.stringify(r).includes('owner'),false);};
test('reduces the exact permissions, preserves the audit and requests only stop',async t=>{
 const x=setup();t.after(()=>x.f.close());const a=createOwnPermissionWithdrawal(x.o),r=await a.withdraw();
 assert.equal(r.permissionsWithdrawn,true);assert.equal(r.monitoringWithdrawn,true);assert.equal(r.readWithdrawn,true);assert.equal(r.runtimeStopRequested,true);limited(r);
 assert.equal(x.events().length,2);assert.equal(x.events()[1].action,'revoke');assert.ok(x.revoked());assert.equal(x.closes(),1);
 assert.throws(()=>x.f.db.prepare("DELETE FROM dossier_monitoring_consent_events WHERE action='revoke'").run());
});
test('replay and fresh factory preserve first revocation and one terminal journal event',async t=>{
 const x=setup();t.after(()=>x.f.close());await createOwnPermissionWithdrawal(x.o).withdraw();const before=x.revoked();
 const result=await createOwnPermissionWithdrawal(x.o).withdraw();assert.equal(result.permissionsWithdrawn,true);assert.equal(x.revoked(),before);assert.equal(x.events().length,2);limited(result);
});
for(const key of ['grantId','subject','projectId','clientId','resource'])test('foreign '+key+' cannot mutate or stop',async t=>{
 const x=setup();t.after(()=>x.f.close());const o={...x.o,context:{...x.o.context,[key]:'foreign'}};
 const r=await createOwnPermissionWithdrawal(o).withdraw();assert.equal(r.permissionsWithdrawn,false);assert.equal(x.closes(),0);assert.equal(x.revoked(),'');assert.equal(x.events().length,1);limited(r);
});
for(const key of ['sequence','revision','issuedAt','expiresAt'])test('changed original '+key+' cannot mutate or stop',async t=>{
 const x=setup();t.after(()=>x.f.close());const r=await createOwnPermissionWithdrawal({...x.o,originalConsent:{...x.o.originalConsent,[key]:x.o.originalConsent[key]+1}}).withdraw();
 assert.equal(r.permissionsWithdrawn,false);assert.equal(x.closes(),0);assert.equal(x.revoked(),'');limited(r);
});
test('strict options reject enabled false, selector args and accessors before effects',async t=>{
 const x=setup();t.after(()=>x.f.close());
 for(const o of [{...x.o,enabled:false},{...x.o,unexpected:true},{...x.o,window:{startAt:0,expiresAt:600001}}])assert.throws(()=>createOwnPermissionWithdrawal(o));
 let evaluated=0;const o={...x.o};Object.defineProperty(o,'requestId',{get(){evaluated++;return x.o.requestId;}});
 assert.throws(()=>createOwnPermissionWithdrawal(o));assert.equal(evaluated,0);
 const r=await createOwnPermissionWithdrawal(x.o).withdraw({grantId:'foreign'});assert.equal(r.permissionsWithdrawn,false);assert.equal(x.closes(),0);assert.equal(x.events().length,1);
});
test('expired or regressing invocation cannot mutate or stop',async t=>{
 const x=setup();t.after(()=>x.f.close());let n=x.o.window.expiresAt;
 const a=createOwnPermissionWithdrawal({...x.o,now:()=>n});assert.equal((await a.withdraw()).permissionsWithdrawn,false);
 n=Date.now();assert.equal((await a.withdraw()).permissionsWithdrawn,false);assert.equal(x.closes(),0);assert.equal(x.events().length,1);
});
function wrapped(db,{beforeRun=async()=>{},afterRun=async()=>{}}={}){
 return{withSession(mode){assert.equal(mode,'first-primary');return this;},prepare(sql){return{bind(...args){const s=db.prepare(sql).bind(...args);return{first:()=>s.first(),run:async()=>{await beforeRun(sql);const r=await s.run();await afterRun(sql);return r;}};}};}};
}
test('lost ACKs are reconciled by primary records without duplicate writes or secret error leakage',async t=>{
 const x=setup();t.after(()=>x.f.close());const r=await createOwnPermissionWithdrawal({...x.o,db:wrapped(x.o.db,{afterRun:async()=>{throw Error('SECRET do not echo');}})}).withdraw();
 assert.equal(r.permissionsWithdrawn,true);assert.equal(r.runtimeStopRequested,true);assert.equal(x.events().length,2);assert.equal(JSON.stringify(r).includes('SECRET'),false);limited(r);
});
for(const failed of ['INSERT INTO dossier_monitoring','UPDATE delegated_access'])test('partial '+failed+' failure still reduces other permission and requests close',async t=>{
 const x=setup();t.after(()=>x.f.close());const r=await createOwnPermissionWithdrawal({...x.o,db:wrapped(x.o.db,{beforeRun:async sql=>{if(sql.startsWith(failed))throw Error('write failed');}})}).withdraw();
 assert.equal(r.permissionsWithdrawn,false);assert.equal(r.runtimeStopRequested,true);assert.equal(x.closes(),1);
 assert.equal(r.readWithdrawn,failed.startsWith('INSERT'));assert.equal(r.monitoringWithdrawn,failed.startsWith('UPDATE'));limited(r);
});
test('identity changed between awaits cannot revoke a foreign grant or report completion',async t=>{
 const x=setup();t.after(()=>x.f.close());const db=wrapped(x.o.db,{afterRun:async sql=>{if(sql.startsWith('INSERT INTO dossier_monitoring'))x.f.db.prepare("UPDATE site_projects SET user_id='other' WHERE id='p'").run();}});
 const r=await createOwnPermissionWithdrawal({...x.o,db}).withdraw();assert.equal(r.permissionsWithdrawn,false);assert.equal(x.revoked(),'');assert.equal(x.closes(),0);limited(r);
});
test('database clock rejects writes after administrative deadline even with a stale process clock',async t=>{
 const x=setup();t.after(()=>x.f.close());const now=Date.now(),o={...x.o,window:{startAt:now-1000,expiresAt:now+100},now:()=>now};
 const db=wrapped(x.o.db,{beforeRun:async()=>{await new Promise(resolve=>setTimeout(resolve,150));}});
 const r=await createOwnPermissionWithdrawal({...o,db}).withdraw();assert.equal(r.permissionsWithdrawn,false);assert.equal(x.revoked(),'');assert.equal(x.events().length,1);limited(r);
});
for(const answer of [null,{}, {closed:true,runtimeStopRequested:false}])test('malformed stop ACK does not undo permission withdrawal or prove stop',async t=>{
 const x=setup();t.after(()=>x.f.close());const r=await createOwnPermissionWithdrawal({...x.o,close:async()=>answer}).withdraw();
 assert.equal(r.permissionsWithdrawn,true);assert.equal(r.runtimeStopRequested,false);limited(r);
});
test('late close ACK cannot prove stop',async t=>{
 const x=setup();t.after(()=>x.f.close());let now=Date.now();const o={...x.o,now:()=>now,close:async()=>{now=x.o.window.expiresAt;return{closed:true,runtimeStopRequested:true};}};
 const r=await createOwnPermissionWithdrawal(o).withdraw();assert.equal(r.runtimeStopRequested,false);assert.equal(r.permissionsWithdrawn,false);assert.ok(x.revoked());limited(r);
});
test('a foreign grant and its audit remain intact',async t=>{
 const x=setup();t.after(()=>x.f.close());x.f.db.prepare("INSERT INTO delegated_access_grants SELECT 'foreign',user_id,client_id,project_id,resource,scopes_json,expires_at,revoked_at FROM delegated_access_grants WHERE id='g'").run();
 await createOwnPermissionWithdrawal(x.o).withdraw();assert.equal(x.f.db.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='foreign'").get().revoked_at,'');
});
