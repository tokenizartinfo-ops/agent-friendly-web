import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
import {createPrivateQaFiniteGithub} from '../lib/mcp-qa-finite-http.mjs';
import {finiteSendRecord} from '../lib/mcp-qa-finite-external-contract.mjs';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
async function fixture(){
 const f=await finiteFinalizerFixture(),v=f.preview,rows=new Map(),tags=new Map(),requests=[];let refPosts=0,tagPosts=0;
 const state={job:99,mode:'normal',attempt:1,source:v.sourceRevision,admitStatus:'completed',admitConclusion:'success',restoreStatus:'in_progress',main:v.sourceRevision};
 const iso=n=>new Date(n).toISOString(),response=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{date:new Date(f.f.now()).toUTCString(),'content-type':'application/json'}});
 const fetchImpl=async(url,init)=>{
  requests.push({url,method:init.method});assert.ok(url.startsWith(GH));assert.equal(init.redirect,'error');
  const path=url.slice(GH.length),body=init.body?JSON.parse(init.body):null;
  if(path==='/issues/comments/'+f.plan.commandId)return response({id:Number(f.plan.commandId),body:'/afw-qa-finite-confirmation v1 '+v.sourceRevision,created_at:iso(v.T0),user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',issue_url:GH+'/issues/497'});
  if(path==='/git/ref/heads/main')return response({object:{sha:state.main}});
  if(path==='/actions/runs/11')return response({id:11,run_attempt:state.attempt,head_sha:state.source,head_branch:'main',event:'issue_comment',path:'.github/workflows/afw-finite-finalizer.yml',repository:{full_name:f.plan.finalizer.repository},actor:{id:290715446,login:'tokenizartinfo-ops'},status:'in_progress'});
  if(path==='/actions/runs/11/attempts/1/jobs?per_page=100')return response({total_count:2,jobs:[{id:12,name:'admit',status:state.admitStatus,conclusion:state.admitConclusion,started_at:iso(v.T0),steps:[{name:'admit-and-ready',status:'completed',conclusion:'success',started_at:iso(v.T0),completed_at:iso(v.T0+1)}]},{id:state.job,name:'restore',run_id:11,head_sha:state.source,status:state.restoreStatus}]});
  if(path==='/git/tags'&&init.method==='POST'){tagPosts++;const sha=String(tagPosts).padStart(40,'a'),tag={sha,message:body.message,object:{type:body.type,sha:body.object}};tags.set(sha,tag);return response(tag,201);}
  if(path==='/git/refs'&&init.method==='POST'){
   refPosts++;if(rows.has(body.ref))return response({},422);
   const value={ref:body.ref,object:{type:'tag',sha:body.sha}};rows.set(body.ref,value);
   if(state.mode==='lost')throw Error('fixture secret');if(state.mode==='late')f.f.setNow(v.R1);
   return response(value,201);
  }
  if(path.startsWith('/git/ref/'))return response(rows.get('refs/'+path.slice('/git/ref/'.length))??{},rows.has('refs/'+path.slice('/git/ref/'.length))?200:404);
  if(path.startsWith('/git/tags/'))return response(tags.get(path.split('/').at(-1)));
  throw Error('unexpected fixed path');
 };
 const make=()=>createPrivateQaFiniteGithub({plan:f.plan,githubToken:'synthetic_opaque',fetchImpl,now:f.f.now,signal:new AbortController().signal});
 const record=()=>finiteSendRecord({plan:f.plan,output:f.output,restoreJobId:state.job,issuedAt:f.f.now()});
 return {f,state,make,record,requests,get refPosts(){return refPosts;},get tagPosts(){return tagPosts;}};
}
test('durable unique ref fences changed job/reconstructed client; tag object alone grants nothing',async()=>{
 const x=await fixture(),client=x.make(),record=x.record();
 assert.throws(()=>client.consumeNewSend(record));assert.equal(await client.claimSend(record,new AbortController().signal,()=>{}),'issued');
 assert.deepEqual(await client.readSend(),record);client.consumeNewSend(record);assert.throws(()=>client.consumeNewSend(record));
 x.state.job=100;const restarted=x.make();assert.equal(await restarted.claimSend(x.record(),new AbortController().signal,()=>{}),'existing');assert.throws(()=>restarted.consumeNewSend(x.record()));
 assert.equal(x.refPosts,2);assert.equal(x.requests.filter(x=>['PATCH','DELETE','PUT'].includes(x.method)).length,0);
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
