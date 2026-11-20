import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
import {finiteHash as hash} from '../lib/mcp-finite-evidence.mjs';
import {readPrivateQaFiniteLaunchReady} from '../lib/mcp-qa-finite-launch-ready.mjs';

const root='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
async function fixture(t,mutate=()=>{}){
 const {plan:p}=await finiteFinalizerFixture({at:Date.parse('2026-11-01T18:00:00Z')});
 const v=p.preview,f=p.finalizer,now=v.T0+80000,iso=x=>new Date(x).toISOString();
 const owner={id:290715446,login:'tokenizartinfo-ops',type:'User'},repo={id:1347578006,full_name:p.finalizer.repository};
 const tagSha='e'.repeat(40),key='afw-finite-ready/'+v.intentId+'/'+v.controlHash;
 const {id,expiresAt,policyHash}=p.custody;
 const body={commandId:p.commandId,controlPlanHash:v.planHash,R1:v.R1,resourceHash:v.resourceHash,custodyHash:hash({id,expiresAt,policyHash}),validatedAt:v.T0+60000};
 const step={name:f.readyStep,status:'completed',conclusion:'success',started_at:iso(v.T0+50000),completed_at:iso(v.T0+70000)};
 const job={name:'admit',id:f.jobId,run_id:f.runId,head_sha:v.sourceRevision,status:'in_progress',conclusion:null,started_at:iso(v.T0+20000),steps:[step]};
 const run={id:f.runId,run_attempt:1,head_sha:v.sourceRevision,head_branch:'main',event:'issue_comment',path:'.github/workflows/afw-finite-finalizer.yml',
  actor:owner,triggering_actor:owner,head_repository:repo,repository:repo,display_title:'AFW finite finalizer comment-'+p.commandId+' source-'+v.sourceRevision,
  status:'in_progress',conclusion:null};
 const tag={sha:tagSha,tag:'afw-finite-ready-'+v.intentId,object:{type:'commit',sha:v.sourceRevision}};
 mutate({job,run,step,tag,body,p});
 tag.message=JSON.stringify(body);
 const rows=new Map([
  ['/git/ref/tags/'+key,{ref:'refs/tags/'+key,object:{type:'tag',sha:tagSha}}],
  ['/issues/comments/'+p.commandId,{id:Number(p.commandId),body:'/afw-qa-finite-confirmation v1 '+v.sourceRevision,issue_url:root+'/issues/497',author_association:'OWNER',user:owner,created_at:iso(v.T0)}],
  ['/git/ref/heads/main',{ref:'refs/heads/main',object:{type:'commit',sha:v.sourceRevision}}],
  ['/actions/runs/'+f.runId,run],['/actions/runs/'+f.runId+'/attempts/1/jobs?per_page=100',{total_count:1,jobs:[job]}],
  ['/git/tags/'+tagSha,tag],
 ]);
 const old=globalThis.fetch,reads=[];
 globalThis.fetch=async(url,request)=>{
  assert.equal(request.method,'GET');assert.equal(request.headers.Authorization,undefined);
  assert(url.startsWith(root));reads.push(url.slice(root.length));assert(rows.has(reads.at(-1)));
  return new Response(JSON.stringify(rows.get(reads.at(-1))),{headers:{Date:new Date(now).toUTCString(),'Content-Type':'application/json'}});
 };t.after(()=>{globalThis.fetch=old;});
 const parent={check:()=>now,deadline:now+4999,signal:new AbortController().signal};
 return {p,parent,reads};
}

test('launch reads original successful READY and exact tag without a credential or any write',async t=>{
 const {p,parent,reads}=await fixture(t),ready=await readPrivateQaFiniteLaunchReady({external:p,parent});
 assert.equal(ready.planHash,p.preview.planHash);
 assert.equal(ready.job.steps[0].conclusion,'success');assert.equal(reads.length,6);
});

for(const [mode,mutate] of Object.entries({
 'different job':({job})=>job.id++,
 'replayed attempt':({run})=>run.run_attempt++,
 'future step':({step,p})=>{step.completed_at=new Date(p.preview.T0+90001).toISOString();},
 'different custody':({body})=>{body.custodyHash='a'.repeat(64);},
 'different plan':({body})=>{body.controlPlanHash='a'.repeat(64);},
 'foreign tag commit':({tag})=>{tag.object.sha='a'.repeat(40);},
 'failed READY':({step})=>{step.conclusion='failure';},
}))test('launch denies '+mode,async t=>{
 const {p,parent}=await fixture(t,mutate);
 await assert.rejects(readPrivateQaFiniteLaunchReady({external:p,parent}));
});
