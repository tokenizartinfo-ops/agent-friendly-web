import test from 'node:test';
import assert from 'node:assert/strict';
import {githubFixture as fixture} from './fixtures/finite-github.mjs';

test('durable unique ref fences changed job/reconstructed client; tag object alone grants nothing',async()=>{
 const x=await fixture(),client=x.make(),record=x.record();
 assert.throws(()=>client.consumeNewSend(record));assert.equal(await client.claimSend(record,new AbortController().signal,()=>{}),'issued');
 assert.deepEqual(await client.readSend(),record);client.consumeNewSend(record);assert.throws(()=>client.consumeNewSend(record));
 x.state.job=100;const restarted=x.make();assert.equal(await restarted.claimSend(x.record(),new AbortController().signal,()=>{}),'existing');assert.throws(()=>restarted.consumeNewSend(x.record()));
 assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.equal(x.requests.filter(x=>['PATCH','DELETE','PUT'].includes(x.method)).length,0);
});
for(const mode of ['lost','late'])test('send fence '+mode+' ACK never becomes POST authority',async()=>{
 const x=await fixture();x.state.mode=mode;const client=x.make(),r=x.record();
 assert.equal(await client.claimSend(r,new AbortController().signal,()=>{}),'uncertain');assert.throws(()=>client.consumeNewSend(r));assert.equal(x.refPosts,1);
 assert.equal(await client.claimSend(r,new AbortController().signal,()=>{}),'existing');assert.equal(x.refPosts,1);
});
for(const[mode,attack]of Object.entries({attempt:x=>{x.state.attempt=2;},source:x=>{x.state.source='f'.repeat(40);},main:x=>{x.state.main='f'.repeat(40);},nominalDeadlock:x=>{x.state.admitStatus='in_progress';},restoreTerminal:x=>{x.state.restoreStatus='completed';}}))test('primary GitHub '+mode+' blocks tag/ref effects',async()=>{
 const x=await fixture();attack(x);assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
test('ready phase requires admit job in progress; restore phase requires it terminal',async()=>{
 const x=await fixture(),g=x.make();await assert.rejects(g.inspect('ready'));assert.equal((await g.inspect('restore')).restoreJobId,99);
 x.state.admitStatus='in_progress';assert.equal((await g.inspect('ready')).jobId,12);await assert.rejects(g.inspect('restore'));
});

test('lost send-ref ACK remains GET-only after reconstructing the GitHub client',async()=>{
 const x=await fixture();x.state.mode='lost';const record=x.record();
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 const before=x.requests.length,refPosts=x.refPosts,tagPosts=x.tagPosts;x.state.mode='normal';
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'existing');
 assert.equal(x.refPosts,refPosts);assert.equal(x.tagPosts,tagPosts);
 assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
});

test('unknown deferred ref POST plus 404 cannot renew a reconstructed client',async()=>{
 const x=await fixture();x.state.mode='deferred';const record=x.record(),original=x.make();
 assert.equal(await original.claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 const before=x.requests.length;
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
 x.finishPending();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'existing');
 assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.throws(()=>original.consumeNewSend(record));
});
test('lost annotated-tag ACK consumes eligibility even when no send ref exists',async()=>{
 const x=await fixture();x.state.mode='tag-lost';const record=x.record();
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');x.state.mode='normal';
 const before=x.requests.length;
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.tagPosts,1);assert.equal(x.refPosts,0);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
});
test('default recovery with 404 has no capability and performs no mutation',async()=>{
 const x=await fixture(undefined,{origin:'none'}),before=x.requests.length;
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
});
test('first failed claim consumes the one capability across clients and cannot re-admit',async()=>{
 const x=await fixture();x.state.attempt=2;
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');x.state.attempt=1;
 assert.equal(await x.make().admitOriginalExecution({admission:x.admission,output:x.f.output}),false);
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
for(const mode of ['attempt2','unqualified-admission','wrong-proof','wrong-job','wrong-step'])test('original capability rejects '+mode,async()=>{
 const {syntheticOriginalEnvironment}=await import('./fixtures/finite-http-module.mjs');
 const x=await fixture(undefined,{origin:'none'});syntheticOriginalEnvironment(x.f.plan);
 let admission=x.admission,output=structuredClone(x.f.output);
 if(mode==='attempt2')x.state.attempt=2;
 if(mode==='unqualified-admission')admission={...admission};
 if(mode==='wrong-proof')output.retained.proofHash='f'.repeat(64);
 if(mode==='wrong-step')x.state.step=0;
 if(mode==='wrong-job')x.state.restoreStatus='completed';
 assert.equal(await x.make().admitOriginalExecution({admission,output}),false);
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
for(const mode of ['proof','job','step'])test('admitted capability does not survive changed '+mode,async()=>{
 const x=await fixture(),record=structuredClone(x.record());
 if(mode==='proof')record.proofHash='f'.repeat(64);
 if(mode==='job'){x.state.job=100;record.jobId=100;}
 if(mode==='step')x.state.step++;
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
test('actual child process inheriting original PID marker cannot admit a send capability',async()=>{
 const {spawnSync}=await import('node:child_process');
 process.env.AFW_FINITE_RESTORE_ORIGINAL_PID=String(process.pid);
 const code="import {githubFixture} from './test/fixtures/finite-github.mjs';const x=await githubFixture(undefined,{origin:'none'});const admitted=await x.make().admitOriginalExecution({admission:x.admission,output:x.f.output});process.stdout.write(JSON.stringify({admitted,requests:x.requests.length,child:process.pid!==Number(process.env.AFW_FINITE_RESTORE_ORIGINAL_PID)}));";
 const child=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',timeout:20000});
 assert.equal(child.status,0,child.stderr);assert.deepEqual(JSON.parse(child.stdout),{admitted:false,requests:0,child:true});
});

test('cached 404 cannot authorize the original tag POST or refund the consumed capability',async()=>{
 const x=await fixture();x.state.mode='cached-404';
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');x.state.mode='normal';
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});

test('fixed export-and-exec launcher retains actual PID and admits one original synthetic send',async()=>{
 const {spawnSync}=await import('node:child_process');
 const code="import {githubFixture} from './test/fixtures/finite-github.mjs';const x=await githubFixture(undefined,{origin:'none'});const client=x.make(),admitted=await client.admitOriginalExecution({admission:x.admission,output:x.f.output});const send=await client.claimSend(x.record(),new AbortController().signal,()=>{});process.stdout.write(JSON.stringify({admitted,send,tagPosts:x.tagPosts,refPosts:x.refPosts,pidMatches:String(process.pid)===process.env.AFW_FINITE_RESTORE_ORIGINAL_PID}));";
 const child=spawnSync('bash',['-c','export AFW_FINITE_RESTORE_ORIGINAL_PID=$$; exec "$@"','finite-fixture',process.execPath,'--input-type=module','-e',code],{encoding:'utf8',timeout:20000,env:{...process.env,GITHUB_JOB:'restore',GITHUB_ACTION:'finite_restore_once',GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:'b'.repeat(40)}});
 assert.equal(child.status,0,child.stderr);assert.deepEqual(JSON.parse(child.stdout),{admitted:true,send:'issued',tagPosts:1,refPosts:1,pidMatches:true});
});

import custodyRecord from '../scripts/mcp-qa-finite-custody-receipt.json' with {type:'json'};
import {finiteHash as hash} from '../lib/mcp-finite-evidence.mjs';
import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
import * as transport from '../lib/mcp-qa-finite-http.mjs';
import {validateQaFiniteConfirmationCommand} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';

async function fixedLauncherFixture({lost=false}={}){
 const deadline=Date.parse(custodyRecord.expiresAt),sample=await finiteFinalizerFixture({authenticatedIntent:true,at:deadline-1200000});
 const x=await fixture(sample,{origin:'recovery'}),{f,state}=x,{preview:v,plan}=f,calls=[],cf=[];
 f.f.setNow(v.T0+30000);
 state.admitStatus='in_progress';state.admitConclusion=null;
 const response=(result,status=200)=>Response.json(result,{status,headers:{date:new Date(f.f.now()).toUTCString()}});
 const event={GITHUB_EVENT_NAME:'issue_comment',GITHUB_REPOSITORY:plan.finalizer.repository,GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/main',
  GITHUB_SHA:v.sourceRevision,GITHUB_RUN_ID:String(plan.finalizer.runId),GITHUB_RUN_ATTEMPT:'1',GITHUB_ACTOR:'tokenizartinfo-ops',
  GITHUB_JOB:'admit',GITHUB_ACTION:'finite_nominal_launch_once',AFW_FINITE_LAUNCH_ORIGINAL_PID:String(process.pid)};
 const readyRef='refs/tags/afw-finite-ready/'+v.intentId+'/'+v.controlHash,sha='6'.repeat(40);
 const meta={commandId:plan.commandId,controlPlanHash:v.planHash,R1:v.R1,resourceHash:v.resourceHash,
   custodyHash:hash({id:plan.custody.id,expiresAt:plan.custody.expiresAt,policyHash:plan.custody.policyHash}),validatedAt:v.T0+1};
 x.rows.set(readyRef,{ref:readyRef,object:{type:'tag',sha}});
 x.tags.set(sha,{object:{type:'commit',sha:v.sourceRevision},message:JSON.stringify(meta)});
 const get=async(url,init)=>{
  const u=new URL(url);calls.push({url,method:init.method});
  if(u.hostname==='api.github.com'){
   const result=await x.fetchImpl(url,init);
   if(!u.pathname.endsWith('/attempts/1/jobs'))return result;
   const job=await result.json();
   job.jobs[0].steps.push({name:'Create the exact AFW nominal launcher once',number:5,status:'in_progress',conclusion:null,started_at:new Date(v.T0+2000).toISOString()});
   return response(job);
  }
  assert.equal(u.hostname,'api.cloudflare.com');cf.push({path:u.pathname,method:init.method});
  const base='/client/v4/accounts/'+custodyRecord.accountId;
  if(u.pathname===base+'/tokens/verify')return response({success:true,errors:[],messages:[],result:{id:custodyRecord.tokenId,status:'active',expires_on:custodyRecord.expiresAt,...custodyRecord.notBefore===null?{}:{not_before:custodyRecord.notBefore}}});
  if(u.pathname===base+'/workflows/afw-own-qa-private-bootstrap')return response({success:true,errors:[],result:{id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',
   name:'afw-own-qa-private-bootstrap',script_name:'agent-friendly-web-independent-closure-qa',class_name:'PrivateQaBootstrap'}});
  assert.equal(u.pathname,base+'/workflows/afw-own-qa-private-bootstrap/instances');assert.equal(init.method,'POST');
  assert.equal(x.refPosts,1);
  const body=JSON.parse(init.body);
  assert.deepEqual(body,{instance_id:plan.workflows.launcher,params:JSON.stringify({operation:'finite_nominal_launcher',intentId:v.intentId,sourceRevision:v.sourceRevision})});
  if(lost)throw Error('synthetic unavailable acknowledgement');
  return response({success:true,errors:[],result:{id:plan.workflows.launcher}});
 };
 const owner={id:290715446,login:'tokenizartinfo-ops',type:'User'};
 const admission=validateQaFiniteConfirmationCommand({event:{action:'created',repository:{id:1347578006,full_name:plan.finalizer.repository},issue:{number:497},sender:owner,
   comment:{id:Number(plan.commandId),body:'/afw-qa-finite-confirmation v1 '+v.sourceRevision,created_at:new Date(v.T0).toISOString(),author_association:'OWNER',user:owner}},
  context:{repository:plan.finalizer.repository,repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:String(plan.finalizer.runId),runAttempt:'1',sourceRevision:v.sourceRevision},now:f.f.now});
 return {x,cf,calls,event,options:{plan,runtime:event,admission,credential:'SYNTHETIC-PROVIDER',githubToken:'SYNTHETIC-GITHUB',fetchImpl:get,now:f.f.now,signal:new AbortController().signal}};
}

for(const lost of [false,true])test('original READY launches exactly the named Cloudflare Workflow, lost ACK='+lost,async()=>{
 const run=transport.issuePrivateQaFiniteLauncher;
 assert.equal(typeof run,'function');
 const f=await fixedLauncherFixture({lost});
 assert.equal((await run(f.options)).status,lost?'uncertain':'launcher_created');
 assert.equal(f.cf.filter(c=>c.method==='POST').length,1);
 assert.equal((await run(f.options)).status,'admin_pending');
 assert.equal(f.cf.filter(c=>c.method==='POST').length,1);
});
test('the fixed launcher step does not dispatch before the actual owner READY gate',async()=>{
 const run=transport.issuePrivateQaFiniteLauncher;
 assert.equal(typeof run,'function');
 const f=await fixedLauncherFixture();
 f.x.state.admitStatus='completed';
 assert.equal((await run(f.options)).status,'admin_pending');
 assert.equal(f.x.refPosts,0);assert.equal(f.cf.filter(c=>c.method==='POST').length,0);
});
