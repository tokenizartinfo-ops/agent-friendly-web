import test from 'node:test';
import assert from 'node:assert/strict';
import {qaClosedHttpFixture,names,ids,deployments} from './fixtures/qa-closed-http.mjs';
import {createPrivateQaArmHttpAdapters} from '../lib/mcp-qa-cloud-closed-http.mjs';
const H='e'.repeat(64),self='afw-qa-arm-'+H,purpose='afw.qa-arm-quiescence.v1';
function fixture(){
 const f=qaClosedHttpFixture(),base=f.fetch;f.expectedRedirect='manual';f.mutate=()=>{};
 f.fetch=async(input,init)=>{const r=await base(input,init),body=await r.json(),u=new URL(input);
 if(u.pathname.includes('/afw-own-qa-private-bootstrap/instances'))body.result=[{id:self,status:'running',workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',version_id:'workflow-version-is-not-worker-uuid'}];
 f.armMutate?.({url:u,init,body});return new Response(JSON.stringify(body),{status:r.status,headers:r.headers});
 };
 f.options=()=>({plan:{purpose,sessionId:H,startAt:f.wall-1,expiresAt:f.wall+4000},pins:{canary:f.pins.canary,operator:f.pins.operator},credential:'synthetic-cf-token',sourceRevision:'a'.repeat(40),qaVersionId:f.version,currentBootstrapId:self,fetchImpl:f.fetch,now:()=>f.wall});
 return f;
}
test('ARM HTTP reuses fixed external code proofs, verifies all inventories, and exposes only readonly snapshots',async()=>{
 const f=fixture(),o=f.options(),a=createPrivateQaArmHttpAdapters(o);
 assert.deepEqual(Object.keys(a),['readSnapshot']);
 const first=await a.readSnapshot(f.parent.signal),n=f.requests.length,second=await a.readSnapshot(f.parent.signal);
 for(const r of [first,second]){
 assert.equal(r.purpose,purpose);assert.equal(r.externalClosedProfilesVerified,true);assert.equal(r.qaCodeProvenanceVerified,false);
 assert.equal(r.otherWorkflowsTerminal,true);assert.equal(r.currentBootstrapObserved,true);assert.equal(r.ownContainerEmpty,true);assert.equal(r.qaVersionId,o.qaVersionId);
 for(const key of ['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'])assert.equal(r[key],false);
 assert.equal(JSON.stringify(r).includes('synthetic-cf-token'),false);assert.ok(Object.isFrozen(r));
 }
 assert.ok(f.requests.every(x=>x.init.method==='GET'&&x.url.origin==='https://api.cloudflare.com'));
 const profiles=f.requests.filter(x=>x.url.pathname.includes('/versions/'));assert.equal(profiles.length,2);assert.equal(f.requests.slice(n).filter(x=>x.url.pathname.includes('/versions/')).length,0);
 assert.ok(f.requests.some(x=>x.url.pathname.endsWith('/workflows')));assert.ok(f.requests.some(x=>x.url.pathname.endsWith('/namespaces')));
 await assert.rejects(a.readSnapshot(f.parent.signal));assert.equal(f.requests.length<128,true);
});
const attacks={
 'foreign active bootstrap':({url,body})=>{if(url.pathname.includes('private-bootstrap/instances'))body.result[0].id='afw-qa-arm-'+'f'.repeat(64);},
 'active other workflow':({url,body})=>{if(url.pathname.includes('private-confirmation/instances'))body.result[0].status='running';},
 'paused self':({url,body})=>{if(url.pathname.includes('private-bootstrap/instances'))body.result[0].status='paused';},
 'missing self':({url,body})=>{if(url.pathname.includes('private-bootstrap/instances')){body.result=[];body.result_info.count=0;body.result_info.total_count=0;}},
 'self wrong workflow_id':({url,body})=>{if(url.pathname.includes('private-bootstrap/instances'))body.result[0].workflow_id='1'.repeat(32);},
 'fourth QA definition':({url,body})=>{if(url.pathname.endsWith('/workflows')){body.result.push({id:'f'.repeat(32),name:'foreign-qa',script_name:names[0],class_name:'Other'});body.result_info.count++;body.result_info.total_count++;}},
 'workflow remainder':({url,body})=>{if(url.pathname.endsWith('/workflows'))body.result_info.next_cursor='hidden';},
 'workflow duplicate':({url,body})=>{if(url.pathname.includes('private-bootstrap/instances')){body.result.push({...body.result[0]});body.result_info.count++;body.result_info.total_count++;}},
 'active container':({url,body})=>{if(url.pathname.endsWith('/instances-v2'))body.result.push({id:'f'.repeat(64)});},
 'container hidden remainder':({url,body})=>{if(url.pathname.endsWith('/instances-v2'))body.result_info.cursor='hidden';},
 'wrong canary code':({url,body})=>{if(url.pathname.endsWith('/versions/'+ids[2]))body.result.modules[0].content_base64=Buffer.from('different').toString('base64');},
 'foreign operator deployment':({url,body})=>{if(url.pathname.includes(names[2])&&url.pathname.endsWith('/deployments'))body.result.deployments[0].id=deployments[3];},
 'cron':({url,body})=>{if(url.pathname.endsWith('/schedules'))body.result.schedules.push({cron:'* * * * *'});},
 'tail':({url,body})=>{if(url.pathname.endsWith('/tails'))body.result.push({id:'tail'});},
 'foreign namespace':({url,body})=>{if(url.pathname.endsWith('/namespaces'))body.result[0].id='f'.repeat(32);},
};
for(const [name,attack]of Object.entries(attacks))test('ARM readonly '+name+' fails closed before metadata writer is available',async()=>{
 const f=fixture();f.armMutate=attack;const a=createPrivateQaArmHttpAdapters(f.options());
 await assert.rejects(a.readSnapshot(f.parent.signal));assert.equal(f.requests.some(x=>x.init.method!=='GET'),false);
});
test('same deployment must remain current across the two CAS-side snapshots',async()=>{
 const f=fixture(),a=createPrivateQaArmHttpAdapters(f.options());await a.readSnapshot(f.parent.signal);f.deployment=deployments[3];await assert.rejects(a.readSnapshot(f.parent.signal));
});
test('a failed snapshot cannot become a fresh eligibility check through the same adapter',async()=>{
 const f=fixture(),a=createPrivateQaArmHttpAdapters(f.options());f.armMutate=attacks['active container'];await assert.rejects(a.readSnapshot(f.parent.signal));const n=f.requests.length;f.armMutate=undefined;await assert.rejects(a.readSnapshot(f.parent.signal));assert.equal(f.requests.length,n);
});
test('legacy terminal/rollback mode still rejects even this exact running self',async()=>{
 const f=qaClosedHttpFixture();f.mutate=({url,response})=>{if(url.pathname.includes('private-bootstrap/instances'))response.body.result[0].status='running';};
 assert.equal((await f.run('inspect')).status,'blocked');
});
for(const mode of ['deadline','abort','final-deadline','qa-id'])test('ARM original '+mode+' fence survives asynchronous settlement',async()=>{
 const f=fixture(),o=f.options(),a=createPrivateQaArmHttpAdapters(o),race=Promise.race;
 if(mode==='deadline')f.wall=o.plan.expiresAt;
 if(mode==='abort')f.parent.abort();
 if(mode==='qa-id')o.qaVersionId=ids[1];
 if(mode==='final-deadline')Promise.race=function(values){return Reflect.apply(race,this,[values]).then(x=>{if(x&&typeof x==='object'&&x.value)f.wall=o.plan.expiresAt;return x;});};
 try{await assert.rejects(a.readSnapshot(f.parent.signal));}finally{Promise.race=race;}
});
test('workflow version_id is not compared or exposed as a Worker UUID',async()=>{
 const f=fixture(),a=createPrivateQaArmHttpAdapters(f.options()),r=await a.readSnapshot(f.parent.signal);
 assert.equal(r.currentBootstrapObserved,true);assert.equal(r.qaCodeProvenanceVerified,false);assert.equal(JSON.stringify(r).includes('workflow-version-is-not-worker-uuid'),false);
});
