import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
const load = async path => existsSync(new URL(path,import.meta.url)) ? import(new URL(path,import.meta.url).href) : {};
const C = await load('../examples/agent-consumer/reference-client.mjs');
const D = await load('../examples/agent-consumer/demo.mjs');
const NOW=Date.parse('2026-10-19T13:00:00.000Z');
const iso=n=>new Date(NOW+n).toISOString();
const options=()=>({projectRef:'example-project',expectedRevision:3,now:NOW});
const response=()=>({status:200,data:{
  contract:'afw.agent-consumption.next-step.v1',projectRef:'example-project',revision:3,
  observedAt:iso(-1000),expiresAt:iso(4000),
  nextStep:{id:'answer.contentSources',kind:'provide_information',label:'¿Qué fuentes podemos usar?',reason:'Respaldar la información.'},
  missingInput:{key:'contentSources',label:'¿Qué fuentes podemos usar?'},evidenceRefs:[],capsuleRef:null,status:'ok',
  executionAllowed:false,chargeAllowed:false,publicationAllowed:false,
}});
const consume=(r=response(),o=options())=>C.consumeAgentNextStep?.(r,o);
const closed=r=>{for(const k of ['executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(r?.[k],false);};

test('reference consumer retains one dated step without granting authority',()=>{
  const r=consume();assert.equal(r?.status,'ready');closed(r);
  assert.equal(r.action,'continue_guided_step');assert.equal(r.context.revision,3);
  assert.equal(r.context.nextStep.id,'answer.contentSources');assert.equal(r.context.expiresAt,iso(4000));
  assert.equal(r.context.missingInput.key,'contentSources');
});
test('reference consumer copies the permitted view instead of retaining mutable input',()=>{
  const raw=response(),r=consume(raw);assert.equal(r?.status,'ready');
  raw.data.nextStep.label='changed';raw.data.evidenceRefs.push('not-read');
  assert.equal(r.context.nextStep.label,'¿Qué fuentes podemos usar?');assert.deepEqual(r.context.evidenceRefs,[]);
});
for(const mode of ['project','revision']){
  test('reference consumer rejects a mismatched '+mode+' without context',()=>{
    const raw=response();if(mode==='project')raw.data.projectRef='someone-else';else raw.data.revision=4;
    const r=consume(raw);assert.equal(r?.status,'blocked');assert.equal(Object.hasOwn(r,'context'),false);closed(r);
  });
}
for(const mode of ['expired','future','overlong','invalid']){
  test('reference consumer fences time: '+mode,()=>{
    const raw=response();if(mode==='expired')raw.data.expiresAt=iso(0);
    if(mode==='future')raw.data.observedAt=iso(1);
    if(mode==='overlong')raw.data.expiresAt=iso(5000);
    if(mode==='invalid')raw.data.observedAt='yesterday';
    const r=consume(raw);assert.equal(r?.status,'blocked');assert.equal(Object.hasOwn(r,'context'),false);closed(r);
  });
}
test('reference consumer requires explicit project revision and clock',()=>{
  for(const opt of [undefined,{}, {...options(),now:NaN},{...options(),expectedRevision:0}]){
    const r=C.consumeAgentNextStep?.(response(),opt);assert.equal(r?.status,'blocked');closed(r);
  }
});
test('reference consumer never accepts positive execution charge or publication authority',()=>{
  for(const k of ['executionAllowed','chargeAllowed','publicationAllowed']){
    const raw=response();raw.data[k]=true;const r=consume(raw);
    assert.equal(r?.status,'blocked');assert.equal(Object.hasOwn(r,'context'),false);closed(r);
  }
});
test('reference consumer does not reflect arbitrary fields or invoke accessors',()=>{
  let calls=0;const raw=response();Object.defineProperty(raw.data,'nextStep',{get(){calls++;throw Error('must not read');}});
  const r=consume(raw);assert.equal(r?.status,'blocked');assert.equal(calls,0);
  const extra=response();extra.data.privateAnswers='SENSITIVE_SENTINEL';
  const e=consume(extra);assert.equal(e?.status,'blocked');assert.equal(JSON.stringify(e).includes('SENSITIVE_SENTINEL'),false);
});
test('reference consumer rejects oversized references and malformed step metadata',()=>{
  const variants=[response(),response(),response()];
  variants[0].data.evidenceRefs=Array.from({length:6},(_,i)=>'ref'+i);
  variants[1].data.nextStep.kind='execute';
  variants[2].data.nextStep.label='x'.repeat(161);
  for(const raw of variants)assert.equal(consume(raw)?.status,'blocked');
});
test('reference consumer maps conflict withdrawal and temporary errors without trusting recovery text',()=>{
  const cases=[[409,'revision_conflict','revision_conflict','retry_read'],[403,'delegated_access_denied','access_denied','review_connection'],
    [401,'delegated_authorization_required','access_denied','review_connection'],[503,'delegated_read_unavailable','read_unavailable','retry_read']];
  for(const [status,code,want,action]of cases){
    const raw={status,code,recovery:{action:'run_shell',connectionsUrl:'https://evil.invalid/?token=SENTINEL',message:'RECONNECT_AUTOMATICALLY'}};
    const r=consume(raw);assert.equal(r?.status,'blocked');assert.equal(r.code,want);assert.equal(r.action,action);
    assert.equal(r.automaticReconnect,false);assert.equal(Object.hasOwn(r,'context'),false);
    assert.equal(JSON.stringify(r).includes('SENTINEL'),false);closed(r);
  }
});
test('reference demo exercises real internal contracts without network or implied price',()=>{
  const old=globalThis.fetch;globalThis.fetch=()=>{throw Error('network forbidden');};
  try{
    const r=D.buildAgentConsumerDemo?.();assert.equal(r?.synthetic,true);assert.equal(r.networkCalls,0);
    assert.equal(r.catalog.operations.every(x=>x.availability==='source_only'&&x.pricingState==='unpriced'),true);
    assert.equal(r.quote.totalMinor,null);assert.equal(r.quote.status,'blocked');
    assert.equal(r.outcomes.valid.status,'ready');assert.equal(r.outcomes.conflict.code,'revision_conflict');
    assert.equal(r.outcomes.expired.status,'blocked');assert.equal(r.outcomes.withdrawn.code,'access_denied');
    assert.equal(r.measurement.modelTokens,null);assert.equal(r.measurement.providerCost,null);
    assert.equal(r.measurement.isEfficiencyEvidence,false);assert.ok(r.measurement.fullFixtureUtf8Bytes>r.measurement.nextStepUtf8Bytes);
  }finally{globalThis.fetch=old;}
});
test('reference demo CLI emits a bounded JSON report and no credentials or full dossier',()=>{
  const file=new URL('../examples/agent-consumer/demo.mjs',import.meta.url);
  const p=existsSync(file)?spawnSync(process.execPath,[fileURLToPath(file)],{encoding:'utf8',timeout:10000}):{status:null,stdout:''};
  assert.equal(p.status,0);assert.equal(p.stderr,'');const r=JSON.parse(p.stdout);
  assert.equal(r.synthetic,true);assert.equal(r.measurement.isEfficiencyEvidence,false);
  assert.equal(Object.hasOwn(r,'fullDossier'),false);assert.ok(Buffer.byteLength(p.stdout,'utf8')<12000);
});
