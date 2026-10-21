import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const target='agent-friendly-web-preparation-maintenance',workflow='afw-preparation-client-maintenance';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const fixed=Date.parse('2026-10-21T12:00:00.000Z');
function setup(method='register'){
 let wall=fixed,tick=100,reads=0,calls=0,steps=0,seenArgs,seenStep;
 const policy={method,operationId:'ci-caller-1',issuer:'https://preparation.example.invalid',
  resource:'https://preparation.example.invalid/mcp',redirectUri:'https://chatgpt.com/connector/oauth/ci_caller_1',
  startedAt:new Date(fixed-1000).toISOString(),expiresAt:new Date(fixed+599000).toISOString()};
 const planHash=()=>hash(['afw.preparation.client-caller.v1',target,policy.method,policy.operationId,policy.issuer,policy.resource,policy.redirectUri,policy.startedAt,policy.expiresAt]);
 const manifestHash=()=>hash(['afw.preparation.client-maintenance.v1',policy.operationId,policy.issuer,policy.resource,policy.redirectUri,'AFW preparation '+policy.operationId,policy.startedAt,policy.expiresAt,'authorization_code','code','none']);
 const receipt=()=>({status:'confirmed',code:'preparation_client_observed',automaticRetry:false,authorizationGranted:false,operationalReadiness:false,
  executionAllowed:false,chargeAllowed:false,publicationAllowed:false,contract:'afw.preparation.client-maintenance.v1',operationId:policy.operationId,
  manifestHash:manifestHash(),clientId:'ci_client_0123456789',redirectUri:policy.redirectUri,configuredResource:policy.resource,observedAt:new Date(wall).toISOString(),clientRegistrationObserved:true});
 let action=async()=>receipt();
 const service={async register(...args){calls++;seenArgs=args;return action();},async reconcile(...args){calls++;seenArgs=args;return action();}};
 const env={AFW_PREPARATION_MAINTENANCE_CALLER_ENABLED:'true',AFW_PREPARATION_MAINTENANCE_CALLER_POLICY:JSON.stringify(policy),PREPARATION_MAINTENANCE:service};
 const event={workflowName:workflow,instanceId:'afw-prep-'+planHash(),payload:{planHash:planHash()}};
 const step={async do(name,options,callback){steps++;seenStep={name,options};return callback();}};
 return {env,event,step,policy,service,receipt,clocks:{now:()=>wall,monotonic:()=>tick},resync(){env.AFW_PREPARATION_MAINTENANCE_CALLER_POLICY=JSON.stringify(policy);event.instanceId='afw-prep-'+planHash();event.payload={planHash:planHash()};},
  setAction:f=>{action=f;},advance:(w,m=w)=>{wall+=w;tick+=m;},stats:()=>({reads,calls,steps,seenArgs,seenStep})};
}
function safe(r){
 for(const k of ['executionAllowed','chargeAllowed','publicationAllowed','authorizationGranted','operationalReadiness'])assert.equal(r[k],false);
 assert.equal(r.automaticRetry,false);assert.doesNotMatch(JSON.stringify(r),/PRIVATE|client_secret|access_token|refresh_token/);
}
test('finite administrative preparation caller contract',{timeout:30000},async t=>{
 let source;try{source=await readFile('lib/preparation-maintenance-caller.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source,'missing finite administrative preparation caller');
 const {runPreparationMaintenanceCaller:run}=await import('../lib/preparation-maintenance-caller.mjs');
 await t.test('disabled does not read policy, binding, event or step',async()=>{
  const env={AFW_PREPARATION_MAINTENANCE_CALLER_ENABLED:'false'};
  for(const k of ['AFW_PREPARATION_MAINTENANCE_CALLER_POLICY','PREPARATION_MAINTENANCE'])Object.defineProperty(env,k,{get(){assert.fail('disabled read');}});
  const denied=new Proxy({},{get(){assert.fail('disabled contextual read');}});
  const r=await run(env,denied,denied);safe(r);assert.equal(r.status,'blocked');
 });
 for(const method of ['register','reconcile'])await t.test(method+' uses one zero-argument RPC and step retry0',async()=>{
  const c=setup(method);const r=await run(c.env,c.event,c.step,c.clocks);safe(r);assert.equal(r.status,'confirmed');assert.equal(r.receipt.clientId,'ci_client_0123456789');
  const stats=c.stats();assert.equal(stats.calls,1);assert.equal(stats.steps,1);assert.deepEqual(stats.seenArgs,[]);
  assert.equal(stats.seenStep.name,'preparation-client-'+method);assert.deepEqual(stats.seenStep.options.retries,{limit:0,delay:1000,backoff:'constant'});
  assert.ok(stats.seenStep.options.timeout>0&&stats.seenStep.options.timeout<=5000);
  assert.deepEqual(Object.keys(r.receipt).sort(),['clientId','clientRegistrationObserved','configuredResource','manifestHash','observedAt','operationId','redirectUri'].sort());
 });
 const cases={
  'scheduled':c=>{c.event.schedule={cron:'* * * * *'};},
  'foreign workflow':c=>{c.event.workflowName='other';},
  'foreign instance':c=>{c.event.instanceId='afw-prep-other';},
  'payload selects method':c=>{c.event.payload.method='register';},
  'payload hash mismatch':c=>{c.event.payload.planHash='a'.repeat(64);},
  'payload accessor':c=>{Object.defineProperty(c.event.payload,'planHash',{get(){throw Error('PRIVATE');}});},
  'policy extra key with live dates':c=>{c.env.AFW_PREPARATION_MAINTENANCE_CALLER_POLICY=JSON.stringify({...c.policy,extra:true});},
  'expired':c=>{c.policy.expiresAt=new Date(fixed).toISOString();c.resync();},
  'future':c=>{c.policy.startedAt=new Date(fixed+1).toISOString();c.resync();},
  'more than ten minutes':c=>{c.policy.expiresAt=new Date(fixed+600000).toISOString();c.resync();},
  'malformed policy':c=>{c.env.AFW_PREPARATION_MAINTENANCE_CALLER_POLICY='PRIVATE';},
  'oversize policy':c=>{c.env.AFW_PREPARATION_MAINTENANCE_CALLER_POLICY='x'.repeat(2049);},
  'wrong resource':c=>{c.policy.resource='https://other.invalid/mcp';c.resync();},
  'foreign callback':c=>{c.policy.redirectUri='https://other.invalid/callback';c.resync();},
  'callback search':c=>{c.policy.redirectUri+='?secret=PRIVATE';c.resync();},
  'wrong method':c=>{c.policy.method='delete';c.resync();},
  'wrong operationId':c=>{c.policy.operationId='../../PRIVATE';c.resync();},
  'missing service':c=>{delete c.env.PREPARATION_MAINTENANCE;},
 };
 for(const [name,change]of Object.entries(cases))await t.test(name+' admits no RPC',async()=>{
  const c=setup();change(c);const r=await run(c.env,c.event,c.step,c.clocks);safe(r);assert.equal(r.status,'blocked');assert.equal(c.stats().calls,0);
 });
 for(const [name,change]of Object.entries({
  'flag closes':c=>{c.env.AFW_PREPARATION_MAINTENANCE_CALLER_ENABLED='false';},
  'policy changes':c=>{c.env.AFW_PREPARATION_MAINTENANCE_CALLER_POLICY+=' ';},
  'binding changes':c=>{c.env.PREPARATION_MAINTENANCE={...c.service};},
  'method changes':c=>{c.service.register=async()=>c.receipt();},
  'wall regresses':c=>c.advance(-1,0),
  'monotonic regresses':c=>c.advance(0,-1),
  'five seconds elapsed':c=>c.advance(0,5000),
  'original window expires':c=>c.advance(599000),
 }))await t.test(name+' after dispatched RPC cannot confirm',async()=>{
  const c=setup();c.setAction(async()=>{const result=c.receipt();change(c);return result;});
  const r=await run(c.env,c.event,c.step,c.clocks);safe(r);assert.equal(r.status,'unconfirmed');assert.equal(c.stats().calls,1);
 });
 for(const [name,change]of Object.entries({
  'unknown key':r=>{r.private='PRIVATE';},
  'wrong operation':r=>{r.operationId='another';},
  'wrong manifest':r=>{r.manifestHash='a'.repeat(64);},
  'wrong callback':r=>{r.redirectUri='https://chatgpt.com/connector/oauth/wrong';},
  'wrong resource':r=>{r.configuredResource='https://other.invalid/mcp';},
  'no safe closure':r=>{r.publicationAllowed=true;},
  'bad ID':r=>{r.clientId='PRIVATE secret';},
  'observed after expiry':r=>{r.observedAt=new Date(fixed+600000).toISOString();},
  'wrong contract':r=>{r.contract='wrong';},
  'wrong code':r=>{r.code='wrong';},
 }))await t.test(name+' response is sanitized',async()=>{
  const c=setup();c.setAction(async()=>{const r=c.receipt();change(r);return r;});
  const r=await run(c.env,c.event,c.step,c.clocks);safe(r);assert.equal(r.status,'unconfirmed');assert.equal(r.receipt,undefined);
 });
 await t.test('lost RPC ACK returns unconfirmed without retry',async()=>{
  const c=setup();c.setAction(async()=>{throw Error('PRIVATE unknown ACK');});const r=await run(c.env,c.event,c.step,c.clocks);
  safe(r);assert.equal(r.status,'unconfirmed');assert.equal(c.stats().calls,1);assert.equal(c.stats().steps,1);
 });
 await t.test('cached Workflow step after expiry cannot return confirmed',async()=>{
  const c=setup();c.step.do=async()=>{c.advance(599000);return c.receipt();};
  const r=await run(c.env,c.event,c.step,c.clocks);safe(r);assert.equal(r.status,'unconfirmed');assert.equal(c.stats().calls,0);
 });
 await t.test('queue delay before step callback cannot invoke expired operation',async()=>{
  const c=setup();c.step.do=async(_n,_o,cb)=>{c.advance(599000);return cb();};
  const r=await run(c.env,c.event,c.step,c.clocks);safe(r);assert.equal(r.status,'unconfirmed');assert.equal(c.stats().calls,0);
 });
});
