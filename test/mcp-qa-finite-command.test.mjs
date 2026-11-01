import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateQaFiniteConfirmationCommand,assertQaFiniteConfirmationAdmission} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {runFiniteFinalizerCli} from '../scripts/run-qa-finite-trial-finalizer.mjs';
function fixture(){
 const at=Date.now(),sha='b'.repeat(40),actor={id:290715446,login:'tokenizartinfo-ops',type:'User'};
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{...actor},comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+sha,created_at:new Date(at).toISOString(),author_association:'OWNER',user:{...actor}}};
 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:sha};
 return {at,event,context,now:()=>at};
}
test('new exact command has separate domain and original clocks through cleanup restart',()=>{
 const f=fixture(),a=validateQaFiniteConfirmationCommand({event:f.event,context:f.context,now:f.now});assert.equal(a.purpose,'afw.qa-finite-confirmation-command.v1');assert.equal(a.createdAt,f.at);assert.equal(a.cleanupExpiresAt,f.at+480000);
 assertQaFiniteConfirmationAdmission(a);f.now=()=>f.at+300001;
 const restored=validateQaFiniteConfirmationCommand({event:f.event,context:f.context,now:f.now});assertQaFiniteConfirmationAdmission(restored,'cleanup');assert.throws(()=>assertQaFiniteConfirmationAdmission(restored));
});
for(const[mode,attack]of Object.entries({actor:f=>{f.event.sender.id=1;},owner:f=>{f.event.comment.user.type='Bot';},issue:f=>{f.event.issue.number=498;},branch:f=>{f.context.ref='refs/heads/feature';},attempt:f=>{f.context.runAttempt='2';},source:f=>{f.context.sourceRevision='c'.repeat(40);},extraCommand:f=>{f.event.comment.body+='\n';},oldKind:f=>{f.event.comment.body='/afw-qa-native-observe-restore v1 '+f.context.sourceRevision;},future:f=>{f.event.comment.created_at=new Date(f.at+1).toISOString();},expired:f=>{f.event.comment.created_at=new Date(f.at-480000).toISOString();}}))test('finite command denies '+mode,()=>{
 const f=fixture();attack(f);assert.throws(()=>validateQaFiniteConfirmationCommand({event:f.event,context:f.context,now:f.now}));
});
test('uninstalled actual source constructor blocks before secret access, transport or effects',async()=>{
 const f=fixture(),env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:f.context.repository,GITHUB_REPOSITORY_ID:f.context.repositoryId,GITHUB_REF:f.context.ref,GITHUB_EVENT_NAME:f.context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:f.context.sourceRevision};
 let secret=0,network=0;Object.defineProperty(env,'AFW_QA_CLOSED_TOKEN',{get(){secret++;throw Error('secret');}});
 const r=await runFiniteFinalizerCli({phase:'admit',env,read:async()=>JSON.stringify(f.event),write:async()=>{},now:f.now,fetchImpl:async()=>{network++;throw Error('network');}});
 assert.equal(r.status,'admin_pending');assert.equal(secret,0);assert.equal(network,0);
});
test('finalizer workflow independent of nominal and lock only in restore after admit completes',async()=>{
 const yaml=await readFile('.github/workflows/afw-finite-finalizer.yml','utf8'),admit=yaml.split('  admit:')[1].split('  restore:')[0],restore=yaml.split('  restore:')[1];
 assert.match(yaml,/group: afw-finite-finalizer-\$\{\{ needs.admission.outputs.intent_id \}\}/);assert.doesNotMatch(admit,/group: afw-qa-cloud-closed-rollback/);
 assert.match(restore,/needs: admit/);assert.match(restore,/group: afw-qa-cloud-closed-rollback/);assert.equal((yaml.match(/cancel-in-progress: false/g)??[]).length,2);
 assert.doesNotMatch(yaml,/needs: nominal|schedule:|workflow_dispatch:|canary.*TOKEN/);assert.match(yaml,/name: admit-and-ready/);
});

test('external poll covers late original C1 completion without exhausting at C0 or renewing R1',async()=>{
 const {cfFiniteFixture}=await import('./fixtures/finite-cf-http.mjs');
 const {finiteObserverInstanceId}=await import('../lib/mcp-qa-finite-observer.mjs');
 const command=fixture(),a=validateQaFiniteConfirmationCommand({event:command.event,context:command.context,now:command.now});
 const f=await cfFiniteFixture({at:command.at,configure:p=>{p.intentId=a.intentId;p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:p.source.revision});}});
 f.base.f.setNow(command.at+100);f.state.observerStatus='running';f.gh.state.admitStatus='in_progress';
 const env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:command.context.repository,GITHUB_REPOSITORY_ID:command.context.repositoryId,GITHUB_REF:command.context.ref,GITHUB_EVENT_NAME:command.context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:command.context.sourceRevision,GITHUB_TOKEN:'synthetic_gh',AFW_QA_CLOSED_TOKEN:'synthetic_cf'};
 const result=await runFiniteFinalizerCli({phase:'poll',env,resolveSource:async()=>f.p,now:f.base.f.now,read:async path=>JSON.stringify(path==='event.json'?command.event:f.p),write:async()=>{},sleep:async ms=>f.base.f.setNow(f.base.f.now()+ms),fetchImpl:async(...args)=>{if(f.base.f.now()>=f.v.C1+1)f.state.observerStatus='complete';return f.fetchImpl(...args);}});
 assert.equal(result.status,'observer_complete');assert.ok(f.base.f.now()>f.v.C1);assert.ok(f.base.f.now()<f.v.R1);assert.equal(f.state.posts,0);
});
