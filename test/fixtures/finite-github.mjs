import assert from 'node:assert/strict';
import {finiteFinalizerFixture} from './finite-finalizer.mjs';
import {createPrivateQaFiniteGithub} from '../../lib/mcp-qa-finite-http.mjs';
import {finiteSendRecord} from '../../lib/mcp-qa-finite-external-contract.mjs';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
export async function githubFixture(base){
 const f=base??await finiteFinalizerFixture(),v=f.preview,rows=new Map(),tags=new Map(),requests=[];let refPosts=0,tagPosts=0;
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
   const value={ref:body.ref,object:{type:tags.has(body.sha)?'tag':'commit',sha:body.sha}};rows.set(body.ref,value);
   if(state.mode==='lost')throw Error('fixture secret');if(state.mode==='late')f.f.setNow(v.R1);
   return response(value,201);
  }
  if(path.startsWith('/git/ref/'))return response(rows.get('refs/'+path.slice('/git/ref/'.length))??{},rows.has('refs/'+path.slice('/git/ref/'.length))?200:404);
  if(path.startsWith('/git/tags/'))return response(tags.get(path.split('/').at(-1)));
  throw Error('unexpected fixed path');
 };
 const make=()=>createPrivateQaFiniteGithub({plan:f.plan,githubToken:'synthetic_opaque',fetchImpl,now:f.f.now,signal:new AbortController().signal});
 const record=()=>finiteSendRecord({plan:f.plan,output:f.output,restoreJobId:state.job,issuedAt:f.f.now()});
 return {f,state,make,record,requests,fetchImpl,rows,tags,get refPosts(){return refPosts;},get tagPosts(){return tagPosts;}};
}