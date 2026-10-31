import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createPrivateQaCloudClosedRollback} from '../../lib/mcp-qa-cloud-closed-rollback.mjs';
import {createQaCloudClosedHttpAdapters} from '../../lib/mcp-qa-cloud-closed-http.mjs';
import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
export const hash=x=>createHash('sha256').update(x).digest('hex');
export const canonical=x=>JSON.stringify(x&&typeof x==='object'?Array.isArray(x)?x.map(y=>JSON.parse(canonical(y))):Object.fromEntries(Object.keys(x).sort().map(k=>[k,JSON.parse(canonical(x[k]))])):x);
export const names=['agent-friendly-web-independent-closure-qa','agent-friendly-web-delegated-canary','agent-friendly-web-release-operator'];
export const ids=['0771c5f5-88b1-428a-b700-d51aa726b35f','c570b60b-95dc-48e1-89f3-9c4651691dbc','2607abae-cec3-4e35-89eb-8b8572262b54','855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'];
export const deployments=['11111111-1111-4111-8111-111111111111','22222222-2222-4222-8222-222222222222','33333333-3333-4333-8333-333333333333','44444444-4444-4444-8444-444444444444'];
export function qaClosedHttpFixture(){
 const start=Date.now(),parent=new AbortController(),f={wall:start,version:ids[0],deployment:deployments[0],requests:[],claims:new Set(),mutate:()=>{},cfAckLost:false,claimAckLost:false,bodyMode:null};
 const moduleBytes=Buffer.from('export default {};'),versions=Object.fromEntries(ids.map(id=>[id,{id,compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',bindings:[{name:'AFW_TEST_ENABLED',type:'plain_text',text:'false'},{name:'SYNTHETIC_SECRET',type:'secret_text'}],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:moduleBytes.toString('base64')}],urls:[]}]));
 const pin=(name,id,deploymentId)=>({name,id,configurationHash:hash('afw.qa-closed-rollback-configuration.v1\n'+canonical(Object.fromEntries(['compatibility_date','compatibility_flags','main_module','usage_model','bindings'].map(k=>[k,versions[id][k]])))),bindingCount:2,module:{name:'index.mjs',bytes:moduleBytes.length,sha256:hash(moduleBytes)},flagCount:1,...deploymentId?{deploymentId}:{}});
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
   else if(p==='/workflows')body=answer(structuredClone(AFW_FIXED_WORKFLOWS.map(s=>({id:s.id,name:s.name,script_name:s.script,class_name:s.className,script_deleted:false,schedules:[]}))),{...info(AFW_FIXED_WORKFLOWS),page:1,total_pages:1});
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
