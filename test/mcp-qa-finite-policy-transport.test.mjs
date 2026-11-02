import test from 'node:test';
import assert from 'node:assert/strict';
import {native} from './fixtures/finite-owner-native.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev',V='22222222-2222-4222-8222-222222222222',D='33333333-3333-4333-8333-333333333333';
async function setup(t,mode='normal'){
 let material,uploaded,current,posts=0;const calls=[];
 const envelope=result=>Response.json({success:true,errors:[],messages:[{code:10000,message:'SYNTHETIC informational',type:null}],result});
 const f=await native(t,'normal',undefined,undefined,{outbound:async request=>{
  const url=new URL(request.url);calls.push({method:request.method,path:url.pathname,query:url.search});assert.equal(url.origin,'https://api.cloudflare.com');
  const root='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/';
  assert(request.headers.get('Authorization').startsWith('Bearer SYNTHETIC_'));
  if(request.method==='POST'){
   posts++;const body=await request.json();
   if(url.pathname===root+'workers/agent-friendly-web-delegated-canary/versions'){
    assert.equal(url.search,'?deploy=false');
    assert.equal(request.headers.get('Content-Type'),'application/json');
    assert.deepEqual(body.containers,[{class_name:'AfwOwnEventNode'}]);
    assert.equal(body.exports.AfwOwnEventNode.container,'agent-friendly-web-delegated-canary-afwowneventnode');
    const secrets=body.bindings.filter(b=>b.type==='inherit');
    assert.equal(secrets.length,2);for(const b of secrets)assert.deepEqual(Object.keys(b).sort(),['name','type','version_id']);
    for(const b of secrets)assert.equal(b.version_id,material.source.currentPublication.versionId);
    uploaded=body;if(mode==='lost')throw Error('SYNTHETIC lost upload ACK');
    if(mode==='late')await new Promise(r=>setTimeout(r,6000));
    return envelope({id:V});
   }
   assert.equal(url.pathname,root+'scripts/agent-friendly-web-delegated-canary/deployments');
   assert.deepEqual(body,{strategy:'percentage',versions:[{version_id:V,percentage:100}]});
   current={id:D,strategy:'percentage',versions:[{version_id:V,percentage:100}]};return envelope(current);
  }
  if(url.pathname===root+'scripts/agent-friendly-web-delegated-canary/deployments')return envelope({deployments:[mode==='foreign'?{...current,id:D}:current]});
  const id=url.pathname.split('/').at(-1),isNew=id===V,cfg=isNew?{...uploaded,bindings:uploaded.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b)}:material.configuration;
  const {modules:unused,...configuration}=cfg;void unused;
  return envelope({id,...configuration,containers:configuration.containers.map(b=>({...b,name:'agent-friendly-web-delegated-canary-afwowneventnode'})),urls:[],modules:isNew?uploaded.modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(material.script).toString('base64')}]});
 }});
 material=await f.json('/fixture/material',{});current={id:material.source.currentPublication.deploymentId,strategy:'percentage',versions:[{version_id:material.source.currentPublication.versionId,percentage:100}]};
 const publish=async screen=>f.json('/fixture/publish',{url:O+'/connections/finite-prepare',headers:{'Cf-Access-Jwt-Assertion':f.token,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()});
 return {...f,publish,calls,posts:()=>posts};
}
test('Task3 actual owner admission and native journal issue fixed Beta JSON upload and fixed activation',async t=>{
 const f=await setup(t),screen=await f.screen(),r=await f.publish(screen);
 assert.equal(r.status,'installed');assert.equal(r.receipt.versionId,V);assert.equal(r.receipt.deploymentId,D);assert.equal(f.posts(),2);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,2);assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,2);
 assert.equal((await f.publish(screen)).status,'admin_pending');assert.equal(f.posts(),2);
});
for(const mode of ['lost','late'])test('Task3 '+mode+' actual upload ACK never activates or resends from another preparation',async t=>{
 const f=await setup(t,mode),r=await f.publish(await f.screen());
 assert.equal(r.status,'admin_pending');assert.equal(f.posts(),1);
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),1);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,1);assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,0);
});
test('Task3 foreign pointer denies before native publication SEND',async t=>{
 const f=await setup(t,'foreign');assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
});

import {qualifyFiniteConnectionProfile} from '../lib/mcp-qa-finite-connection-profile.mjs';
import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
test('Task3 preparation grammar preserves Access/limiter and closed business flags in each exact phase',()=>{
 const source={clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}};
 for(const phase of ['closed_ui','read_consent']){
  const metadata=syntheticPreparation(phase,source),r=qualifyFiniteConnectionProfile({phase,metadata});
  assert.deepEqual(r,metadata);assert(Object.isFrozen(r));
  for(const mutate of [v=>v.bindings.pop(),v=>v.bindings.push({name:'UNAPPROVED',type:'plain_text',text:'x'}),v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true',v=>delete v.exports.AfwOwnEventNode.container]){
   const v=structuredClone(metadata);mutate(v);assert.throws(()=>qualifyFiniteConnectionProfile({phase,metadata:v}));
  }
 }
 assert.throws(()=>qualifyFiniteConnectionProfile({phase:'finite_prearm',metadata:syntheticPreparation('closed_ui',source)}));
});
