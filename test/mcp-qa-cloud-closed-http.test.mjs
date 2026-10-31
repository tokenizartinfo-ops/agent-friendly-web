import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createPrivateQaCloudClosedRollback} from '../lib/mcp-qa-cloud-closed-rollback.mjs';
import {createQaCloudClosedHttpAdapters} from '../lib/mcp-qa-cloud-closed-http.mjs';
import {AFW_FIXED_WORKFLOWS} from '../lib/mcp-fixed-terminal-workflows.mjs';
const hash=x=>createHash('sha256').update(x).digest('hex');
const canonical=x=>JSON.stringify(x&&typeof x==='object'?Array.isArray(x)?x.map(y=>JSON.parse(canonical(y))):Object.fromEntries(Object.keys(x).sort().map(k=>[k,JSON.parse(canonical(x[k]))])):x);
const names=['agent-friendly-web-independent-closure-qa','agent-friendly-web-delegated-canary','agent-friendly-web-release-operator'];
const ids=['0771c5f5-88b1-428a-b700-d51aa726b35f','c570b60b-95dc-48e1-89f3-9c4651691dbc','2607abae-cec3-4e35-89eb-8b8572262b54','855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'];
const deployments=['11111111-1111-4111-8111-111111111111','22222222-2222-4222-8222-222222222222','33333333-3333-4333-8333-333333333333','44444444-4444-4444-8444-444444444444'];
function fixture(){
 const start=Date.now(),parent=new AbortController(),f={wall:start,version:ids[0],deployment:deployments[0],requests:[],claims:new Set(),mutate:()=>{},cfAckLost:false,claimAckLost:false,bodyMode:null};
 const module=Buffer.from('export default {};'),versions=Object.fromEntries(ids.map(id=>[id,{id,compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',bindings:[{name:'AFW_TEST_ENABLED',type:'plain_text',text:'false'},{name:'SYNTHETIC_SECRET',type:'secret_text'}],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:module.toString('base64')}],urls:[]}]));
 const pin=(name,id,deploymentId)=>({name,id,configurationHash:hash('afw.qa-closed-rollback-configuration.v1\n'+canonical(Object.fromEntries(['compatibility_date','compatibility_flags','main_module','usage_model','bindings'].map(k=>[k,versions[id][k]])))),bindingCount:2,module:{name:'index.mjs',bytes:module.length,sha256:hash(module)},flagCount:1,...deploymentId?{deploymentId}:{}});
 f.parent=parent;f.pins={qaCandidate:pin(names[0],ids[0]),qaClosed:pin(names[0],ids[1]),canary:pin(names[1],ids[2],deployments[1]),operator:pin(names[2],ids[3],deployments[2])};f.versions=versions;
 const info=rows=>({per_page:100,count:rows.length,total_count:rows.length});
 const answer=(result,result_info)=>({success:true,errors:[],messages:[],result,...result_info?{result_info}:{}});
 f.fetch=async(input,init)=>{
  const url=new URL(input),path=url.pathname;f.requests.push({url,init});
  assert.equal(init.redirect,'error');assert.equal(init.cache,'no-store');assert.ok(init.signal instanceof AbortSignal);assert.equal(init.signal.aborted,false);
  let status=200,body;
  if(url.origin==='https://api.github.com'){
   assert.equal(path,'/repos/tokenizartinfo-ops/agent-friendly-web/git/refs');assert.equal(init.method,'POST');
   const data=JSON.parse(init.body);assert.match(data.ref,/^refs\/tags\/afw-qa-closed-rollback\/[a-f0-9]{64}$/);assert.equal(data.sha,'a'.repeat(40));
   if(f.claims.has(data.ref)){status=422;body={message:'Reference already exists'};}else {f.claims.add(data.ref);status=201;body={ref:data.ref,object:{sha:data.sha,type:'commit'}};if(f.claimAckLost)throw Error('synthetic-claim-private');}
  }else{
   assert.equal(url.origin,'https://api.cloudflare.com');assert.ok(path.startsWith('/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/'));
   const p=path.split('/85d0d5dadac3341a564f22ce885e9eec')[1];
   if(init.method==='POST'){
    assert.equal(p,'/workers/scripts/'+names[0]+'/deployments');const b=JSON.parse(init.body);assert.equal(b.versions[0].version_id,ids[1]);assert.equal(b.versions[0].percentage,100);f.version=ids[1];f.deployment=deployments[3];body=answer({id:f.deployment});if(f.cfAckLost)throw Error('synthetic-cf-private');
   }else if(p.endsWith('/deployments')){
    const index=names.findIndex(n=>p.includes('/'+n+'/'));assert.notEqual(index,-1);body=answer({deployments:[{id:index===0?f.deployment:deployments[index],strategy:'percentage',versions:[{version_id:index===0?f.version:ids[index+1],percentage:100}]}]});
   }else if(p.includes('/versions/')){assert.equal(url.searchParams.get('include'),'modules');body=answer(structuredClone(versions[p.split('/').at(-1)]));}
   else if(p.endsWith('/schedules'))body=answer({schedules:[]});
   else if(p.endsWith('/tails'))body=answer([]);
   else if(p.endsWith('/subdomain'))body=answer({enabled:false,previews_enabled:false});
   else if(p==='/workers/durable_objects/namespaces')body=answer([{id:'070c4a7708eb4592a3ded7c117a88225',class:'IndependentClosure',script:names[0],use_sqlite:true},{id:'6f30104244424152b800bc64d5f4cfac',class:'PrivateQaPreregistration',script:names[0],use_sqlite:true}],{page:1,per_page:1000,count:2,total_count:2,total_pages:1});
   else if(p.endsWith('/instances-v2'))body=answer([],{per_page:100});
   else if(p==='/workflows')body=answer(structuredClone(AFW_FIXED_WORKFLOWS.map(s=>({id:s.id,name:s.name,script_name:s.script,class_name:s.className,script_deleted:false,schedules:[]}))),info(AFW_FIXED_WORKFLOWS));
   else if(p.startsWith('/workflows/')){
    const s=AFW_FIXED_WORKFLOWS.find(s=>p.startsWith('/workflows/'+s.name));assert.ok(s);
    body=p.endsWith('/instances')?answer([{id:'terminal-'+s.name,status:'complete',workflow_id:s.id}],info([1])):answer({id:s.id,name:s.name,script_name:s.script,class_name:s.className,script_deleted:false,schedules:[]});
   }else assert.fail('unregistered path');
  }
  const response={status,body,headers:{date:new Date(f.wall).toUTCString(),'content-type':'application/json'}};f.mutate({url,init,response});
  if(f.bodyMode==='huge')return new Response('x'.repeat(4194305),{status:200,headers:response.headers});
  return new Response(JSON.stringify(response.body),{status:response.status,headers:response.headers});
 };
 f.plan={purpose:'afw.qa-cloud-closed-rollback.v1',sessionId:'b'.repeat(64),startAt:start-1000,expiresAt:start+599000};
 f.options=()=>({plan:f.plan,pins:f.pins,credential:'synthetic-cf-token',githubToken:'synthetic-gh-token',sourceSha:'a'.repeat(40),fetchImpl:f.fetch,now:()=>f.wall});
 f.run=operation=>{const a=createQaCloudClosedHttpAdapters(f.options());return createPrivateQaCloudClosedRollback({plan:f.plan,pins:{candidateVersionId:ids[0],closedVersionId:ids[1]},...a,now:()=>f.wall,timeoutMs:30000,signal:parent.signal}).run(operation);};
 return f;
}
const posts=f=>f.requests.filter(r=>r.init.method==='POST');
const safe=r=>{assert.equal(r.operationalReadiness,false);assert.equal(r.mayRetry,false);assert.equal(JSON.stringify(r).includes('synthetic-'),false);};
test('fixed real HTTP adapter verifies source/config/native inventories, claims before one fixed restore and reads independently',async()=>{
 const f=fixture(),r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'restored_observed');assert.equal(posts(f).length,2);assert.equal(posts(f)[0].url.origin,'https://api.github.com');assert.equal(posts(f)[1].url.origin,'https://api.cloudflare.com');assert.ok(f.requests.filter(x=>x.init.method==='GET').length<=128);safe(r);
});
test('inspect does not write durable refs or deploy',async()=>{
 const f=fixture(),r=await f.run('inspect');assert.equal(r.status,'closed_candidate_observed');assert.equal(posts(f).length,0);safe(r);
});
for(const status of [409,422])test('existing claim '+status+' stays consumed even for the same source SHA',async()=>{
 const f=fixture();f.mutate=({url,response})=>{if(url.origin==='https://api.github.com'){response.status=status;response.body={message:'already exists'};}};const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'consumed');assert.equal(posts(f).length,1);safe(r);
});
test('a renamed session cannot refund the durable candidate deployment claim',async()=>{
 const f=fixture();f.cfAckLost=true;await f.run('restore_known_closed_candidate');f.version=ids[0];f.deployment=deployments[0];f.plan={...f.plan,sessionId:'c'.repeat(64)};const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'consumed');assert.equal(posts(f).filter(x=>x.url.origin==='https://api.cloudflare.com').length,1);safe(r);
});
for(const what of ['claim','provider'])test('unknown '+what+' ACK cannot issue the same effect twice',async()=>{
 const f=fixture();f.claimAckLost=what==='claim';f.cfAckLost=what==='provider';const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,what==='provider'?'closed_observed_uncertain':'uncertain');assert.equal(posts(f).filter(x=>x.url.origin==='https://api.cloudflare.com').length,what==='provider'?1:0);safe(r);
});
const attacks={
 'code fingerprint':({url,response})=>{if(url.pathname.endsWith('/versions/'+ids[0]))response.body.result.modules[0].content_base64=Buffer.from('changed').toString('base64');},
 'configuration':({url,response})=>{if(url.pathname.endsWith('/versions/'+ids[0]))response.body.result.bindings[0].text='true';},
 'secret value leakage':({url,response})=>{if(url.pathname.endsWith('/versions/'+ids[0]))response.body.result.bindings[1].text='never-log-this';},
 'foreign peer deployment':({url,response})=>{if(url.pathname.includes(names[1])&&url.pathname.endsWith('/deployments'))response.body.result.deployments[0].id=deployments[3];},
 'nonterminal bootstrap':({url,response})=>{if(url.pathname.includes('private-bootstrap/instances'))response.body.result[0].status='running';},
 'foreign workflow instance':({url,response})=>{if(url.pathname.endsWith('/instances')&&url.pathname.includes('/workflows/'))response.body.result[0].workflow_id=deployments[3];},
 'unregistered QA workflow':({url,response})=>{if(url.pathname.endsWith('/workflows')){response.body.result.push({name:'unknown',id:deployments[3],script_name:names[0],class_name:'Other'});response.body.result_info.count++;response.body.result_info.total_count++;}},
 'incomplete workflow registry':({url,response})=>{if(url.pathname.endsWith('/workflows'))response.body.result_info.total_count=999;},
 'active container':({url,response})=>{if(url.pathname.endsWith('/instances-v2'))response.body.result.push({id:'f'.repeat(64)});},
 'container remainder':({url,response})=>{if(url.pathname.endsWith('/instances-v2'))response.body.result_info.next_page_token='more';},
 'foreign namespace':({url,response})=>{if(url.pathname.endsWith('/namespaces'))response.body.result[0].id='f'.repeat(32);},
 'cron':({url,response})=>{if(url.pathname.endsWith('/schedules'))response.body.result.schedules.push({cron:'* * * * *'});},
 'tail':({url,response})=>{if(url.pathname.endsWith('/tails'))response.body.result.push({id:'x'});},
 'QA public preview':({url,response})=>{if(url.pathname.endsWith('/subdomain'))response.body.result.previews_enabled=true;},
 'stale response':({response})=>{response.headers.date='Thu, 01 Jan 1970 00:00:00 GMT';},
 'redirect':({response})=>{response.status=302;response.headers.location='https://invalid.example/';},
 'failed provider envelope':({response})=>{response.body.success=false;},
 'stale CDN cache':({response})=>{response.headers.age='99';}
};
for(const [label,attack]of Object.entries(attacks))test(label+' blocks before any durable intent or provider effect',async()=>{
 const f=fixture();f.mutate=attack;const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);safe(r);
});
test('oversized response is bounded and never echoed',async()=>{const f=fixture();f.bodyMode='huge';const r=await f.run('inspect');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);safe(r);});
test('HTTP child deadline and parent abort stop a fetch that ignores its signal',async()=>{
 const f=fixture(),options=f.options();options.fetchImpl=async()=>new Promise(()=>{});const a=createQaCloudClosedHttpAdapters(options),parent=new AbortController();const result=a.readSnapshot(parent.signal);setTimeout(()=>parent.abort(),5);await assert.rejects(result,/unavailable/i);
});
test('direct deployment cannot bypass an acknowledged claim and fresh second snapshot',async()=>{
 const f=fixture(),a=createQaCloudClosedHttpAdapters(f.options());await assert.rejects(a.deploy({sessionId:f.plan.sessionId,closedVersionId:ids[1]},f.parent.signal),/unavailable/i);assert.equal(posts(f).length,0);
});
test('untrusted caller cannot add a target or arbitrary request option',()=>{
 const f=fixture();assert.throws(()=>createQaCloudClosedHttpAdapters({...f.options(),target:'foreign'}));assert.throws(()=>createQaCloudClosedHttpAdapters({...f.options(),pins:{...f.pins,qaCandidate:{...f.pins.qaCandidate,name:'other'}}}));
});
export {fixture};
