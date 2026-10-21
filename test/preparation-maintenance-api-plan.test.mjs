import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const fixed=Date.parse('2026-10-21T13:06:20.000Z');
const policy=()=>({method:'register',operationId:'afw-prep-chatgpt-20261021-1-transport2',issuer:'https://preparation-canary.agentfriendlyweb.dev',
 resource:'https://preparation-canary.agentfriendlyweb.dev/mcp',redirectUri:'https://chatgpt.com/connector/oauth/ka98xNmiF02O',
 startedAt:'2026-10-21T12:58:49.817Z',expiresAt:'2026-10-21T13:08:49.817Z'});
const liveHash='2bd5715294cb3158ab52377a8f77e7e0c025a6fb0e92eefe0ee4cb0d9517bd53';
const root='/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-preparation-client-maintenance/instances';
function closed(r){for(const k of ['automaticRetry','authorizationGranted','operationalReadiness','executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(r[k],false);}
test('pure preparation administrative API planning',async t=>{
 let source;try{source=await readFile('lib/preparation-maintenance-api-plan.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source,'missing preparation administrative API planner');
 const {buildPreparationMaintenanceApiPlan:build}=await import('../lib/preparation-maintenance-api-plan.mjs');
 await t.test('live-proven object payload and exact original hash',async()=>{
  const p=policy(),r=await build({policy:p,state:'unstarted',now:()=>fixed});closed(r);assert.equal(r.status,'planned');
  assert.equal(r.planHash,liveHash);assert.equal(r.instanceId,'afw-prep-'+liveHash);assert.equal(r.expiresAt,p.expiresAt);
  assert.deepEqual(r.create,{method:'POST',path:root,body:{instance_id:r.instanceId,params:{planHash:liveHash},instance_retention:{success_retention:'1 day',error_retention:'1 day'}}});
  assert.equal(typeof r.create.body.params,'object');assert.deepEqual(r.inspect,{method:'GET',path:root+'/'+r.instanceId});
  assert.ok(Object.isFrozen(r)&&Object.isFrozen(r.create)&&Object.isFrozen(r.create.body)&&Object.isFrozen(r.create.body.params)&&Object.isFrozen(r.create.body.instance_retention)&&Object.isFrozen(r.inspect));
  p.operationId='later';assert.equal(r.instanceId,'afw-prep-'+liveHash);assert.doesNotMatch(JSON.stringify(r),/access_token|client_secret|refresh_token/);
 });
 for(const state of ['unknown_ack','queued','running','complete','unconfirmed'])await t.test(state+' never emits a second create',async()=>{
  const r=await build({policy:policy(),state,now:()=>fixed});closed(r);assert.equal(r.status,'inspect_only');assert.equal(r.create,null);
  assert.equal(r.inspect.path,root+'/afw-prep-'+liveHash);assert.equal(r.planHash,liveHash);
 });
 for(const when of [Date.parse('2026-10-21T13:08:49.817Z'),Date.parse('2026-10-22T13:00:00.000Z'),Date.parse('2026-10-21T12:58:49.816Z')])await t.test('out-of-window keeps original GET and never renews',async()=>{
  const p=policy(),r=await build({policy:p,state:'unstarted',now:()=>when});closed(r);assert.equal(r.create,null);assert.equal(r.status,'inspect_only');
  assert.equal(r.inspect.path,root+'/afw-prep-'+liveHash);assert.equal(r.expiresAt,p.expiresAt);
 });
 await t.test('trusted wall regression during hash cannot emit POST',async()=>{
  let calls=0;const r=await build({policy:policy(),state:'unstarted',now:()=>calls++?fixed-1:fixed});closed(r);assert.equal(r.create,null);assert.equal(r.inspect.path,root+'/afw-prep-'+liveHash);
 });
 await t.test('reconcile has a separate exact ID, retaining original dates',async()=>{
  const p={...policy(),method:'reconcile'},r=await build({policy:p,state:'unstarted',now:()=>fixed});closed(r);
  assert.equal(r.planHash,'b6a19675532e60d8964557983ecad1623111cb0bad2dff9a03818ed91a9beafe');
  assert.deepEqual(r.create.body.params,{planHash:r.planHash});assert.equal(r.expiresAt,p.expiresAt);
 });
 for(const [name,change]of Object.entries({
  'unknown policy key':p=>{p.accountId='other';},
  'wrong callback':p=>{p.redirectUri='https://other.invalid/callback';},
  'callback query':p=>{p.redirectUri+='?PRIVATE=1';},
  'wrong resource':p=>{p.resource='https://other.invalid/mcp';},
  'unknown method':p=>{p.method='delete';},
  'invalid operation':p=>{p.operationId='../PRIVATE';},
  'excessive window':p=>{p.expiresAt='2026-10-21T13:08:49.818Z';},
  'policy accessor':p=>{Object.defineProperty(p,'operationId',{get(){assert.fail('accessor executed');}});},
 }))await t.test(name+' has no request descriptor',async()=>{
  const p=policy();change(p);const r=await build({policy:p,state:'unstarted',now:()=>fixed});closed(r);assert.equal(r.status,'blocked');assert.equal(r.create,null);assert.equal(r.inspect,null);assert.doesNotMatch(JSON.stringify(r),/PRIVATE/);
 });
 await t.test('unknown caller fields/state and non-function clock are blocked',async()=>{
  for(const cfg of [{policy:policy(),state:'PRIVATE',now:()=>fixed},{policy:policy(),state:'unstarted',now:fixed},{policy:policy(),state:'unstarted',now:()=>fixed,accountId:'other'}]){
   const r=await build(cfg);closed(r);assert.equal(r.status,'blocked');assert.equal(r.create,null);assert.equal(r.inspect,null);
  }
 });
});
