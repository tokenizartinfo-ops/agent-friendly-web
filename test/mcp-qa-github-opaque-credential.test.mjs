import test from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
const MODERN='ghs_SYNTHETIC_APPID_'+'a'.repeat(200)+'.'+'b'.repeat(280)+'.'+'c'.repeat(100);
function fixture(){const at=Date.now(),source='a'.repeat(40),now=()=>at,event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000300,body:'/afw-qa-deploy-observe-restore v1 '+source,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}},context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'41200000300',runAttempt:'1',sourceRevision:source};return{at,source,admission:api.validateQaLifecycleCommand({event,context,now})};}
for(const[name,credential]of [['legacy','ghs_'+'a'.repeat(36)],['current stateless synthetic',MODERN],['future opaque punctuation','opaque+/=~.future-'+'z'.repeat(30)],['opaque one character','X'],['transport boundary8192','z'.repeat(8192)]]){
 test('GitHub bearer transport accepts '+name+' without interpreting identity or claims',async()=>{
  assert.equal(typeof api.isQaGithubBearerTransportValue,'function');assert.equal(api.isQaGithubBearerTransportValue(credential),true);const f=fixture();let calls=0;
  const r=await api.claimQaLifecycleOnce({admission:f.admission,credential,fetchImpl:async(url,init)=>{calls++;assert.equal(url,'https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/refs');assert.equal(init.headers.Authorization,'Bearer '+credential);assert.equal(init.redirect,'error');return new Response(JSON.stringify({ref:'refs/tags/afw-qa-closed-rollback/'+f.admission.intentId,object:{type:'commit',sha:f.source}}),{status:201,headers:{date:new Date(f.at).toUTCString(),'content-type':'application/json'}});}});
  assert.equal(r.claimed,true);assert.equal(calls,1);assert.equal(JSON.stringify(r).includes(credential),false);assert.equal(r.authorizesEffects,false);assert.equal(r.mayRetry,false);
 });
}
const invalid=[undefined,null,{},12,'','two words','line\nbreak','carriage\rreturn','tab\tvalue','nul\u0000value','del\u007fvalue','nonascii\u0080','x'.repeat(8193)];
for(let index=0;index<invalid.length;index++)test('unsafe or over-budget bearer transport denies case'+index+' before fetch',async()=>{
 const credential=invalid[index];assert.equal(typeof api.isQaGithubBearerTransportValue,'function');assert.equal(api.isQaGithubBearerTransportValue(credential),false);const f=fixture();let calls=0;
 await assert.rejects(api.claimQaLifecycleOnce({admission:f.admission,credential,fetchImpl:async()=>{calls++;throw Error('PRIVATE');}}));assert.equal(calls,0);
});
test('current-format bearer remains opaque and is not authority after denied server ACK',async()=>{
 const f=fixture();let calls=0;await assert.rejects(api.claimQaLifecycleOnce({admission:f.admission,credential:MODERN,fetchImpl:async()=>{calls++;return new Response('{}',{status:403,headers:{'content-type':'application/json',date:new Date(f.at).toUTCString()}});}}));assert.equal(calls,1);assert.throws(()=>api.assertQaLifecycleClaim(f.admission));assert.equal(f.admission.operationalReadiness,false);
});
