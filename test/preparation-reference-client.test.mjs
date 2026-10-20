import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const request=()=>({contract:'agentfriendly.capsule-prepare.v1',expectedRevision:3,idempotencyKey:'reference-intent-0001'});
const options=(method='prepare')=>({method,request:request()});
const flags={executionAllowed:false,chargeAllowed:false,publicationAllowed:false};
const capsule=()=>({capsuleRef:'123e4567-e89b-42d3-a456-426614174000',version:1,manifestSha256:'a'.repeat(64),sourceRevision:3});
const prepared=(replayed=false)=>({contract:'agentfriendly.capsule-prepare.v1',code:'prepared',replayed,preparation:capsule(),...flags,
 recovery:{action:'review_capsule',nextTool:null,reuseOriginalRequest:false,automaticRetry:false,automaticReconnect:false,message:'Borrador preparado para revisar.'}});
const uncertain=()=>({contract:'agentfriendly.capsule-prepare.v1',code:'unknown_ack',replayed:null,preparation:null,...flags,
 recovery:{action:'check_preparation',nextTool:'reconcile_capsule_preparation',reuseOriginalRequest:true,automaticRetry:false,automaticReconnect:false,message:'Conservar la solicitud original.'}});
const denied=()=>({contract:'agentfriendly.capsule-prepare.v1',code:'insufficient_scope',replayed:null,preparation:null,...flags,
 recovery:{action:'review_permission',nextTool:null,reuseOriginalRequest:false,automaticRetry:false,automaticReconnect:false,message:'Revisar permiso.'}});
const unchanged=r=>{for(const k of Object.keys(flags))assert.equal(r[k],false);assert.equal(r.automaticRetry,false);assert.equal(r.automaticReconnect,false);};

test('preparation consumer retains one original intent and never turns a receipt into authority',async t=>{
 const file=new URL('../examples/agent-consumer/preparation-client.mjs',import.meta.url);
 assert.ok(await readFile(file,'utf8').catch(()=>null),'missing preparation outcome consumer');
 const {consumeCapsulePreparation:consume}=await import(file.href);
 await t.test('prepared and reconciled DTOs are detached drafts for review only',()=>{
  const raw=prepared(),o=options(),r=consume(raw,o);assert.equal(r.status,'draft_ready');assert.equal(r.action,'review_draft');unchanged(r);
  assert.deepEqual(r.preparation,capsule());assert.deepEqual(r.originalRequest,request());assert.equal(r.nextRead,null);
  raw.preparation.version=9;o.request.expectedRevision=99;assert.equal(r.preparation.version,1);assert.equal(r.originalRequest.expectedRevision,3);
  assert.equal(consume(prepared(true),options('reconcile')).status,'draft_ready');
  assert.equal(consume(prepared(false),options('reconcile')).status,'blocked');
 });
 await t.test('lost ACK and malformed write responses preserve the same manual read',()=>{
  for(const raw of [uncertain(),undefined,{}, {content:[{type:'text',text:JSON.stringify(prepared())}]}]){
   const r=consume(raw,options());assert.equal(r.status,'blocked');assert.equal(r.action,'reconcile_manually');unchanged(r);
   assert.deepEqual(r.nextRead,{tool:'reconcile_capsule_preparation',arguments:request()});
   assert.deepEqual(r.originalRequest,request());assert.equal(r.preparation,null);
  }
 });
 await t.test('permission denial never becomes reconnect or another write',()=>{
  const r=consume(denied(),options());assert.equal(r.code,'insufficient_scope');assert.equal(r.action,'review_permission');assert.equal(r.nextRead,null);unchanged(r);
 });
 await t.test('revision or key conflict preserves original fields for human review',()=>{
  for(const code of ['revision_conflict','idempotency_conflict','preparation_not_found']){
   const raw={...denied(),code,recovery:{...denied().recovery,action:'review_request'}};
   const r=consume(raw,options('reconcile'));assert.equal(r.action,'review_request');assert.equal(r.nextRead,null);assert.deepEqual(r.originalRequest,request());unchanged(r);
  }
 });
 await t.test('wrong revision unsafe flags contradictory recovery and error capsule never leak a DTO',()=>{
  const changes=[
   r=>{r.preparation.sourceRevision=4;},r=>{r.publicationAllowed=true;},r=>{r.recovery.automaticRetry=true;},
   r=>{r.recovery.action='publish';},r=>{r.recovery.nextTool='prepare_capsule_draft';},r=>{r.extra='untrusted';},
   r=>{r.preparation.extra='untrusted';},r=>{r.preparation.manifestSha256='bad';}
  ];
  for(const change of changes){const raw=prepared();change(raw);const r=consume(raw,options());assert.equal(r.status,'blocked');assert.equal(r.code,'invalid_response');assert.equal(r.preparation,null);unchanged(r);}
  const raw=denied();raw.preparation=capsule();assert.equal(consume(raw,options()).code,'invalid_response');
 });
 await t.test('unknown readonly response offers only a manual read retry',()=>{
  const r=consume(undefined,options('reconcile'));assert.equal(r.action,'retry_read_manually');assert.deepEqual(r.nextRead.arguments,request());unchanged(r);
  assert.equal(consume(uncertain(),options('reconcile')).code,'invalid_response');
 });
 await t.test('invalid caller context accessors or request extras cannot create recovery authority',()=>{
  const bad=[{method:'publish',request:request()},{method:'prepare',request:{...request(),idempotencyKey:'short'}},
   {method:'prepare',request:{...request(),expectedRevision:0}},{method:'prepare',request:{...request(),projectRef:'foreign'}},
   {method:'prepare',get request(){throw Error('not data');}}];
  for(const o of bad){const r=consume(prepared(),o);assert.equal(r.code,'invalid_context');assert.equal(r.originalRequest,null);assert.equal(r.nextRead,null);unchanged(r);}
 });
 await t.test('source demo stays synthetic and shows uncertainty before a draft',async()=>{
  const {buildPreparationDemo}=await import('../examples/agent-consumer/preparation-demo.mjs');const d=buildPreparationDemo();
  assert.equal(d.synthetic,true);assert.equal(d.isEfficiencyEvidence,false);
  assert.equal(d.uncertain.action,'reconcile_manually');assert.equal(d.reconciled.status,'draft_ready');
  assert.deepEqual(d.uncertain.nextRead.arguments,d.reconciled.originalRequest);
 });
});
