import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/assistance-http-occurrence.mjs');
const t=Date.parse('2026-10-08T14:00:00.000Z');
const uuid='12345678-1234-4234-8234-123456789abc',runId='87654321-1234-4234-8234-123456789abc';
const signal={version:'afw-assistance-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:10,kind:'assistance_requested',topic:'orientation',observedAt:new Date(t).toISOString()};
function fixture(){
 let current=t;const calls=[];let observations=0;
 const manifest={occurrenceId:uuid,requestId:uuid,signal:{...signal},sourceRevision:'c'.repeat(40),configId:'cecfg_test',publicationId:'cecfgver_test',startAt:t,deadline:t+60000,tokenExpiresAt:t+120000,serverDeadline:t+60000};
 const planDigest='d'.repeat(64);
 const observation=()=>({sourceRevision:manifest.sourceRevision,configId:manifest.configId,publicationId:manifest.publicationId,origin:'https://github.com/tokenizartinfo-ops/agent-friendly-web.git',checkoutClean:true,observationsCurrent:true,networkMode:'restricted',networkEnforced:true,operationsBindingsReady:true,configurationRevision:1,observationRevision:1,observedAt:current});
 const phases=['create','list','admitClaim','claim','admitFinish','finish'];
 const response=phase=>({version:'afw-occurrence-http-v1',occurrenceId:uuid,phase,sequence:phase==='stop'?6:phases.indexOf(phase)+1,planDigest,result:phase==='list'?[{...signal}]:phase==='claim'?{eventId:signal.eventId,requestId:uuid,runId,expiresAt:t+50000}:phase==='finish'?'intervention_required':phase==='stop'?'stopped':'accepted'});
 const opts={manifest,planDigest,now:()=>current,env:{AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'},preflight:async()=>{observations++;return observation();},fetchImpl:async req=>{const suffix=new URL(req.url).pathname.split('/').at(-1),phase=({ 'admit-claim':'admitClaim','admit-finish':'admitFinish'})[suffix]??suffix;calls.push({phase,body:await req.json()});return Response.json(response(phase));}};
 return {opts,calls,response,observation,observations:()=>observations,move:d=>{current+=d;}};
}
test('six correlated phases complete with exactly six host observations and no extra stop',async()=>{
 const {runAssistanceHttpOccurrence}=await load(),f=fixture();const r=await runAssistanceHttpOccurrence(f.opts);
 assert.equal(r.status,'completed');assert.equal(r.outcome,'intervention_required');assert.equal(r.total,6);assert.equal(r.controls,3);assert.equal(r.operational,3);assert.equal(f.observations(),6);assert.deepEqual(f.calls.map(x=>x.phase),['create','list','admitClaim','claim','admitFinish','finish']);
 assert.deepEqual(f.calls[3].body,{occurrenceId:uuid,expectedSequence:3});
});
test('malformed or lost reply at every phase consumes its attempt and stops once without recovery',async()=>{
 const {runAssistanceHttpOccurrence}=await load();
 for(let failAt=0;failAt<6;failAt++)for(const lost of [false,true]){
  const f=fixture(),fetch=f.opts.fetchImpl;f.opts.fetchImpl=async req=>{const response=await fetch(req);if(f.calls.length===failAt+1){if(lost)throw Error('private-error');return Response.json({...await response.json(),privateText:'forbidden'});}return response;};
  const r=await runAssistanceHttpOccurrence(f.opts);assert.equal(r.status,'stopped');assert.equal(r.total,failAt+2);assert.equal(f.calls.at(-1).phase,'stop');assert.equal(r.stopConfirmed,true);assert.equal(JSON.stringify(r).includes('private'),false);
 }
});
test('stale or mismatched preflight makes no normal send and cannot fabricate readiness',async()=>{
 const {runAssistanceHttpOccurrence}=await load();
 for(const patch of [{observedAt:t-31000},{observedAt:t+1},{sourceRevision:'e'.repeat(40)},{networkEnforced:false},{observationsCurrent:false},{operationsBindingsReady:false},{checkoutClean:false}]){
  const f=fixture();f.opts.preflight=async()=>({...f.observation(),...patch});const r=await runAssistanceHttpOccurrence(f.opts);assert.equal(r.status,'stopped');assert.equal(f.calls.length,0);
 }
});
test('a stuck first or second host observer is bounded and cancelled without more work',async ctx=>{
 const {runAssistanceHttpOccurrence}=await load();
 ctx.mock.timers.enable({apis:['setTimeout']});
 for(const stuckAt of [1,2]){
  const f=fixture();let cancelled=false,result,n=0;
  f.opts.preflight=({signal})=>{if(++n!==stuckAt)return f.observation();signal.addEventListener('abort',()=>{cancelled=true;});return new Promise(()=>{});};
  void runAssistanceHttpOccurrence(f.opts).then(r=>{result=r;});
  await new Promise(resolve=>setImmediate(resolve));ctx.mock.timers.tick(10000);f.move(10000);
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(cancelled,true);assert.equal(result?.status,'stopped');assert.deepEqual(f.calls.map(x=>x.phase),stuckAt===1?[]:['create','stop']);
 }
});
test('expiry or stale observation after HTTP reply fails inside callback before the next phase',async()=>{
 const {runAssistanceHttpOccurrence}=await load(),f=fixture();f.opts.manifest.deadline=t+12000;
 const fetch=f.opts.fetchImpl;f.opts.fetchImpl=async req=>{const response=await fetch(req);if(f.calls.length===1)f.move(3000);return response;};
 const r=await runAssistanceHttpOccurrence(f.opts);assert.equal(r.status,'stopped');assert.deepEqual(f.calls.map(x=>x.phase),['create','stop']);
});
test('manifest mutation during host observation cannot extend authorization',async()=>{
 const {runAssistanceHttpOccurrence}=await load(),f=fixture();
 f.opts.preflight=async()=>{f.opts.manifest.deadline+=120000;f.opts.manifest.serverDeadline+=120000;f.move(60000);return f.observation();};
 const r=await runAssistanceHttpOccurrence(f.opts);assert.equal(r.status,'stopped');assert.equal(f.calls.length,0);
});
test('stop loss never retries and finish with claimed resolution cannot complete',async()=>{
 const {runAssistanceHttpOccurrence}=await load(),f=fixture(),fetch=f.opts.fetchImpl;
 f.opts.fetchImpl=async req=>{const response=await fetch(req);if(f.calls.at(-1).phase==='finish')return Response.json({...await response.json(),result:'resolved'});if(f.calls.at(-1).phase==='stop')throw Error('lost');return response;};
 const r=await runAssistanceHttpOccurrence(f.opts);assert.equal(r.status,'stopped');assert.equal(r.stopConfirmed,false);assert.equal(r.total,7);assert.equal(r.controls,4);assert.equal(r.operational,3);
});
