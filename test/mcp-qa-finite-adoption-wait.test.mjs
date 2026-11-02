import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFiniteMaterialSeed} from '../lib/mcp-qa-finite-seed-http.mjs';
import {cfFiniteFixture} from './fixtures/finite-cf-http.mjs';
import {finiteCliSyntheticSource} from './fixtures/finite-http-module.mjs';
import {finiteObserverInstanceId} from '../lib/mcp-qa-finite-observer.mjs';
import {validateQaFiniteConfirmationCommand} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
const hash=s=>createHash('sha256').update(s).digest('hex');
async function fixture(mode='normal',offset=0){
 const T0=Date.now(),sha='b'.repeat(40),actor={id:290715446,login:'tokenizartinfo-ops',type:'User'},context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:sha};
 const event={action:'created',repository:{id:1347578006,full_name:context.repository},issue:{number:497},sender:actor,comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+sha,created_at:new Date(T0).toISOString(),author_association:'OWNER',user:actor}};
 const a=validateQaFiniteConfirmationCommand({event,context,now:()=>T0}),f=await cfFiniteFixture({at:T0,configure:p=>{p.intentId=a.intentId;p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:sha});}});
 f.base.f.setNow(T0+offset);f.state.observerStatus='running';f.gh.state.admitStatus='in_progress';
 const env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:context.repository,GITHUB_REPOSITORY_ID:context.repositoryId,GITHUB_REF:context.ref,GITHUB_EVENT_NAME:context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:sha,GITHUB_TOKEN:'synthetic_gh',AFW_QA_CLOSED_TOKEN:'synthetic_cf'};
 const reads=[],sleeps=[],writes=[],all=[];const material=await readFiniteMaterialSeed({intentId:a.intentId,sourceRevision:sha,fetchImpl:f.fetchImpl,now:f.base.f.now});const api=await finiteCliSyntheticSource(f.p,{setupMode:mode,seedHash:material.seedHash});
 const fetchImpl=async(url,init)=>{
  all.push({url,method:init.method,at:f.base.f.now()-T0});
  if(mode==='missing-seed'&&url.includes('/git/ref/tags/afw-finite-observer-create/'))return response({},404);
  if(url.includes('/workflows/afw-own-qa-private-bootstrap/instances/')){
   reads.push(f.base.f.now()-T0);
   if(mode==='unknown')return response({success:true,errors:[],result:{status:'unknown'}});
   if(mode==='auth')return response({},401);
   if(mode==='transport')throw Error('synthetic transport');
   if(['authmask','generic404','extra404','oversize404'].includes(mode))return response({success:false,messages:[],errors:[{code:mode==='authmask'?10000:10400,message:mode==='generic404'?'not found':'workflows.api.error.instance.not_found'}],result:null,...(mode==='extra404'?{extra:true}:{}),...(mode==='oversize404'?{padding:'x'.repeat(3000)}:{})},404);
   if(mode==='bad404')return new Response('not json',{status:404,headers:{date:new Date(f.base.f.now()).toUTCString()}});
   if(mode==='skip'&&reads.length===1)f.base.f.setNow(T0+5700);
   if(f.base.f.now()<T0+50000||mode==='never'||mode==='clip')return response({success:false,messages:[],errors:[{code:10400,message:'workflows.api.error.instance.not_found'}],result:null},404);
  }
  return f.fetchImpl(url,init);
 };
 const response=(v,status=200)=>new Response(JSON.stringify(v),{status,headers:{date:new Date(f.base.f.now()).toUTCString(),'content-type':'application/json'}});
 const result=await api.runFiniteFinalizerCli({phase:'admit',env,now:f.base.f.now,read:async()=>JSON.stringify(event),write:async(path,value)=>writes.push({path,value}),fetchImpl,sleep:async ms=>{sleeps.push(ms);f.base.f.setNow(f.base.f.now()+ms);}});
 return {result,reads,sleeps,writes,all,f,hash};
}
test('actual CLI waits for attended observer until 50s after successful primary seed; GET only',async()=>{
 const r=await fixture();assert.equal(r.result.status,'ready');assert.deepEqual(r.reads.slice(0,26),Array.from({length:26},(_,i)=>i*2000));assert.ok(r.writes.some(x=>x.path==='afw-finite-plan.json'));assert.equal(r.all.some(x=>x.method!=='GET'&&x.url.includes('api.cloudflare.com')),false);
});
test('absolute slots skip elapsed time without catch-up bursts',async()=>{const r=await fixture('skip');assert.equal(r.result.status,'ready');assert.equal(r.reads[0],0);assert.equal(r.reads[1],6000);});
test('never observed consumes at most 35 nonzero-budget slots; 70s starts no network',async()=>{const r=await fixture('never');assert.equal(r.result.status,'admin_pending');assert.deepEqual(r.reads,Array.from({length:35},(_,i)=>i*2000));});
test('zero original budget starts no network',async()=>{const r=await fixture('normal',70000);assert.equal(r.result.status,'admin_pending');assert.equal(r.all.length,0);});
for(const mode of ['missing-seed','auth','unknown','bad404','authmask','generic404','extra404','oversize404','transport','setup-missing','setup-running','setup-bad-hash'])test('adoption denies '+mode+' without catch-all retry',async()=>{const r=await fixture(mode,50000);assert.equal(r.result.status,'admin_pending');assert.equal(r.sleeps.length,0);assert.ok(r.reads.length<=1);assert.equal(r.all.some(x=>x.method!=='GET'&&x.url.includes('api.cloudflare.com')),false);});
