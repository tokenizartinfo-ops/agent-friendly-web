import test from 'node:test';
import assert from 'node:assert/strict';
import * as withdrawal from '../lib/mcp-own-permission-withdrawal.mjs';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
function setup(t){
 const f=fixture();t.after(()=>f.close());f.grant();const c=f.db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE action='grant'").get();
 const options={enabled:true,db:f.config.db,context:{grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:f.config.context.resource},originalConsent:{sequence:c.sequence,revision:c.revision,issuedAt:c.issued_at,expiresAt:c.expires_at},window:{startAt:Date.now()-1000,expiresAt:Date.now()+60000},requestId:'22222222-2222-4222-8222-222222222222',now:Date.now};
 const state=()=>({revoked:f.db.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='g'").get().revoked_at,events:f.db.prepare("SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence").all()});
 return{f,options,state};
}
const make=o=>{assert.equal(typeof withdrawal.createOwnPermissionsOnlyReduction,'function');return withdrawal.createOwnPermissionsOnlyReduction(o);};
const limited=r=>{assert.equal(r.purpose,'afw.own-permissions-only-reduction.v1');for(const field of ['runtimeStopRequested','physicalStopVerified','nativeWithdrawalVerified','operationalReadiness'])assert.equal(r[field],false);assert.equal(JSON.stringify(r).includes('owner'),false);};
const wrapped=(db,afterRun)=>({withSession(mode){assert.equal(mode,'first-primary');return this;},prepare(sql){return{bind(...args){const statement=db.prepare(sql).bind(...args);return{first:()=>statement.first(),run:async()=>{const result=await statement.run();await afterRun(sql);return result;}};}};}});
test('permissions-only reduction reconciles exact permissions and replays without another revoke',async t=>{
 const x=setup(t),r=await make(x.options).withdraw();limited(r);assert.equal(r.permissionsWithdrawn,true);assert.equal(r.readWithdrawn,true);assert.equal(r.monitoringWithdrawn,true);
 const before=x.state();assert.ok(before.revoked);assert.equal(before.events.length,2);assert.equal(before.events[1].action,'revoke');
 const replay=await make(x.options).withdraw();limited(replay);assert.equal(replay.permissionsWithdrawn,true);assert.deepEqual(x.state(),before);
});
test('new constructor rejects close, mode and accessors without effects',t=>{
 const x=setup(t),before=x.state();assert.equal(typeof withdrawal.createOwnPermissionsOnlyReduction,'function');
 for(const extra of [{close:async()=>{throw Error('must not call');}},{mode:'withdraw'},{requestStop:true}])assert.throws(()=>make({...x.options,...extra}));
 let calls=0;const o={...x.options};Object.defineProperty(o,'requestId',{get(){calls++;return x.options.requestId;}});assert.throws(()=>make(o));assert.equal(calls,0);assert.deepEqual(x.state(),before);
});
for(const field of ['grantId','subject','projectId','clientId','resource'])test('permissions-only foreign '+field+' cannot reduce',async t=>{
 const x=setup(t),before=x.state(),r=await make({...x.options,context:{...x.options.context,[field]:'foreign'}}).withdraw();limited(r);assert.equal(r.permissionsWithdrawn,false);assert.deepEqual(x.state(),before);
});
test('changed consent and selector args cannot reduce',async t=>{
 const x=setup(t),before=x.state();const r=await make({...x.options,originalConsent:{...x.options.originalConsent,revision:x.options.originalConsent.revision+1}}).withdraw();limited(r);assert.equal(r.permissionsWithdrawn,false);assert.deepEqual(x.state(),before);
 const extra=await make(x.options).withdraw({grantId:'foreign'});limited(extra);assert.equal(extra.permissionsWithdrawn,false);assert.deepEqual(x.state(),before);
});
test('lost acknowledgement reconciles both reductions without stop claims',async t=>{
 const x=setup(t),r=await make({...x.options,db:wrapped(x.options.db,async()=>{throw Error('SYNTHETIC_PRIVATE');})}).withdraw();limited(r);assert.equal(r.permissionsWithdrawn,true);assert.equal(x.state().events.length,2);assert.equal(JSON.stringify(r).includes('SYNTHETIC_PRIVATE'),false);
});
test('expired invocation preserves both permissions and old history',async t=>{
 const x=setup(t),before=x.state(),r=await make({...x.options,now:()=>x.options.window.expiresAt}).withdraw();limited(r);assert.equal(r.permissionsWithdrawn,false);assert.deepEqual(x.state(),before);
});
test('late acknowledgement cannot claim completion or request stop',async t=>{
 const x=setup(t);let now=Date.now();const r=await make({...x.options,now:()=>now,db:wrapped(x.options.db,async()=>{now=x.options.window.expiresAt;})}).withdraw();limited(r);assert.equal(r.permissionsWithdrawn,false);assert.equal(x.state().events.length,2);assert.equal(x.state().revoked,'');
});
