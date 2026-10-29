import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {withdrawOwnPermissions} from '../lib/mcp-own-permission-withdrawal-host.mjs';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';

function setup(){
 const f=fixture();f.grant();const program='synthetic own Node host',sourceRevision='c'.repeat(40),containerId='a'.repeat(64);
 const c=f.db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE action='grant'").get();
 const id={toString:()=>containerId},namespace={idFromName:()=>id,idFromString:()=>id,get:()=>{throw Error('unexpected RPC');}};
 const db={...f.config.db,withSession:mode=>{assert.equal(mode,'first-primary');return f.config.db;}};
 const event={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:f.config.context.resource,...f.config.window};
 const policy={purpose:'afw.private-permission-withdrawal.v1',requestId:'22222222-2222-4222-8222-222222222222',startAt:Date.now()-500,expiresAt:Date.now()+60000,
  originalConsent:{sequence:c.sequence,revision:c.revision,issuedAt:c.issued_at,expiresAt:c.expires_at},
  containerId,programHash:createHash('sha256').update(program).digest('hex'),sourceRevision};
 const env={AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED:'true',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:JSON.stringify(policy),
  AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(event),AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-one-occurrence-v1',
  AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:event.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',
  DB:db,AFW_DOSSIER_EVENTS_NODE:namespace};
 let closes=0;const options={env,ctx:{id,storage:{transaction:()=>{throw Error('unexpected storage');}}},program,sourceRevision,close:async signal=>{assert.equal(signal.aborted,false);closes++;return{closed:true,runtimeStopRequested:true};},now:Date.now};
 return{f,env,policy,options,closes:()=>closes,read:()=>f.db.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='g'").get().revoked_at};
}
test('host derives original authority, reduces only fixed grant and reports no native proof',async t=>{
 const x=setup();t.after(()=>x.f.close());const r=await withdrawOwnPermissions(x.options);
 assert.equal(r.permissionsWithdrawn,true);assert.equal(r.runtimeStopRequested,true);assert.equal(r.nativeWithdrawalVerified,false);assert.equal(r.physicalStopVerified,false);assert.equal(r.operationalReadiness,false);assert.equal(x.closes(),1);assert.ok(x.read());
});
for(const value of [undefined,'false',true])test('absent or nonliteral opt-in denies before mutation',async t=>{
 const x=setup();t.after(()=>x.f.close());x.env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED=value;
 await assert.rejects(()=>withdrawOwnPermissions(x.options));assert.equal(x.closes(),0);assert.equal(x.read(),'');
});
for(const key of ['sourceRevision','programHash','containerId'])test('wrong original '+key+' denies before effects',async t=>{
 const x=setup();t.after(()=>x.f.close());x.policy[key]='d'.repeat(key==='sourceRevision'?40:64);x.env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY=JSON.stringify(x.policy);
 await assert.rejects(()=>withdrawOwnPermissions(x.options));assert.equal(x.closes(),0);assert.equal(x.read(),'');
});
test('different DO identity and extra policy fields are denied',async t=>{
 const x=setup();t.after(()=>x.f.close());
 await assert.rejects(()=>withdrawOwnPermissions({...x.options,ctx:{...x.options.ctx,id:{toString:()=> 'b'.repeat(64)}}}));
 x.policy.extra=true;x.env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY=JSON.stringify(x.policy);await assert.rejects(()=>withdrawOwnPermissions(x.options));assert.equal(x.closes(),0);assert.equal(x.read(),'');
});
for(const change of [p=>{p.expiresAt=p.startAt+600001;},p=>{p.startAt=0;p.expiresAt=100;},p=>{p.startAt-=5000;},p=>{p.originalConsent.expiresAt+=1;}])test('invalid administrative or original consent window denies',async t=>{
 const x=setup();t.after(()=>x.f.close());change(x.policy);x.env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY=JSON.stringify(x.policy);
 await assert.rejects(()=>withdrawOwnPermissions(x.options));assert.equal(x.closes(),0);assert.equal(x.read(),'');
});
test('env opt-in withdrawal during primary read prevents writes and close',async t=>{
 const x=setup();t.after(()=>x.f.close());const original=x.env.DB;
 x.env.DB={...original,withSession(){const p=original.withSession('first-primary');return{prepare(sql){return{bind(...args){const s=p.prepare(sql).bind(...args);return{run:()=>s.run(),first:async()=>{const row=await s.first();x.env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED='false';return row;}};}};}};}};
 await assert.rejects(()=>withdrawOwnPermissions(x.options));assert.equal(x.read(),'');assert.equal(x.closes(),0);
});
test('namespace method replacement during a read cannot reach close',async t=>{
 const x=setup();t.after(()=>x.f.close());const original=x.env.DB;
 x.env.DB={...original,withSession(){const p=original.withSession('first-primary');return{prepare(sql){return{bind(...args){const s=p.prepare(sql).bind(...args);return{run:()=>s.run(),first:async()=>{const row=await s.first();x.env.AFW_DOSSIER_EVENTS_NODE.idFromName=()=>({toString:()=> 'b'.repeat(64)});return row;}};}};}};}};
 await assert.rejects(()=>withdrawOwnPermissions(x.options));assert.equal(x.read(),'');assert.equal(x.closes(),0);
});
test('source method accepts no caller-selected options beyond the host contract',async t=>{
 const x=setup();t.after(()=>x.f.close());await assert.rejects(()=>withdrawOwnPermissions({...x.options,grantId:'foreign'}));assert.equal(x.read(),'');assert.equal(x.closes(),0);
});

test('host passes the fixed close stage authority and deadline into custody',async t=>{
 const x=setup();t.after(()=>x.f.close());let called=0;
 const close=async(signal,assertCurrent,expiresAt)=>{
  assert.equal(signal.aborted,false);assert.equal(typeof assertCurrent,'function');
  const at=assertCurrent();assert.ok(expiresAt>at&&expiresAt-at<=5000);
  x.env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED='false';
  assert.throws(assertCurrent);called++;return{closed:true,runtimeStopRequested:true};
 };
 await assert.rejects(()=>withdrawOwnPermissions({...x.options,close}));assert.equal(called,1);
});
