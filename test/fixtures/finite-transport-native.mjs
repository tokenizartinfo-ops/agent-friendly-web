import assert from 'node:assert/strict';
import {native} from './finite-owner-native.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev',V='22222222-2222-4222-8222-222222222222',D='33333333-3333-4333-8333-333333333333';
export async function setup(t,mode='normal'){
 let material,current,posts=0,uploads=0,latestV=V,latestD=D;const calls=[],requests=[],versions=new Map();
 const envelope=result=>Response.json({success:true,errors:[],messages:[{code:10000,message:'SYNTHETIC informational',type:null}],result});
 const f=await native(t,'normal',undefined,undefined,{outbound:async request=>{
  const url=new URL(request.url);calls.push({method:request.method,path:url.pathname,query:url.search});assert.equal(url.origin,'https://api.cloudflare.com');
  const root='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/';
  assert(request.headers.get('Authorization').startsWith('Bearer SYNTHETIC_'));
  if(request.method==='POST'){
   posts++;const body=await request.json();requests.push({method:request.method,url:request.url,body});
   if(url.pathname===root+'workers/agent-friendly-web-delegated-canary/versions'){
    assert.equal(url.search,'?deploy=false');
    assert.equal(request.headers.get('Content-Type'),'application/json');
    assert.deepEqual(body.containers,[{class_name:'AfwOwnEventNode'}]);
    assert.equal(body.exports.AfwOwnEventNode.container,'agent-friendly-web-delegated-canary-afwowneventnode');
    const secrets=body.bindings.filter(b=>b.type==='inherit');
    assert.equal(secrets.length,2);for(const b of secrets)assert.deepEqual(Object.keys(b).sort(),['name','type','version_id']);
    for(const b of secrets)assert.equal(b.version_id,current.versions[0].version_id);
    uploads++;latestV=[V,'44444444-4444-4444-8444-444444444444','66666666-6666-4666-8666-666666666666'][uploads-1];latestD=[D,'55555555-5555-4555-8555-555555555555','77777777-7777-4777-8777-777777777777'][uploads-1];versions.set(latestV,body);if(mode==='lost')throw Error('SYNTHETIC lost upload ACK');
    if(mode==='late')await new Promise(r=>setTimeout(r,6000));
    if(mode==='not_found')return Response.json({success:false,errors:[{code:1000,message:'SYNTHETIC missing'}],result:null},{status:404});
    return envelope({id:latestV,...(mode==='unexpected_reconciliation'?{exports_reconciliation:{created:['UNEXPECTED_SYNTHETIC_CONTAINER']}}:{})});
   }
   assert.equal(url.pathname,root+'scripts/agent-friendly-web-delegated-canary/deployments');
   assert.deepEqual(body,{strategy:'percentage',versions:[{version_id:latestV,percentage:100}]});
   current={id:latestD,strategy:'percentage',versions:[{version_id:latestV,percentage:100}]};return envelope(current);
  }
  if(url.pathname===root+'scripts/agent-friendly-web-delegated-canary/deployments')return envelope({deployments:[mode==='foreign'?{...current,id:D}:current]});
  const id=url.pathname.split('/').at(-1),isNew=versions.has(id),version=versions.get(id),cfg=isNew?{...version,bindings:version.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b)}:material.configuration;
  const {modules:unused,...configuration}=cfg;void unused;
  if(mode==='wrong_secret'&&isNew)configuration.bindings=configuration.bindings.map(b=>b.type==='secret_text'?{...b,name:b.name+'_FOREIGN'}:b);
  if(mode==='extra_binding'&&!isNew)configuration.bindings=[...configuration.bindings,{name:'UNAPPROVED',type:'plain_text',text:'x'}];
  if(mode==='namespace'&&!isNew)configuration.bindings=configuration.bindings.map(b=>b.type==='durable_object_namespace'?{...b,namespace_id:'f'.repeat(32)}:b);
  return envelope({id,...configuration,containers:configuration.containers.map(b=>({...b,name:'agent-friendly-web-delegated-canary-afwowneventnode'})),urls:[],modules:isNew?version.modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(material.script).toString('base64')}]});
 }});
 material=await f.json('/fixture/material',{});current={id:material.source.currentPublication.deploymentId,strategy:'percentage',versions:[{version_id:material.source.currentPublication.versionId,percentage:100}]};
 if(mode==='held_claim')await f.json('/fixture/hold-claim',{});
 if(mode==='held_source')await f.json('/fixture/hold-source',{});
 const publish=async screen=>f.json('/fixture/publish',{url:O+'/connections/finite-prepare',headers:{'Cf-Access-Jwt-Assertion':f.token,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()});
 return {...f,publish,calls,requests,posts:()=>posts};
}