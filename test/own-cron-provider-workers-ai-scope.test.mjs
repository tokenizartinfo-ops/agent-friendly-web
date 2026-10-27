import test from 'node:test';
import assert from 'node:assert/strict';
import {assessCronProviderSnapshot,checkOwnCronProvider} from '../scripts/check-own-cron-provider.mjs';
const now=Date.parse('2026-10-27T17:00:00Z'),profile='prebuilt-closed-publication';
const ai=()=>({id:'03gc4o049emd',name:'Issues with AI Security for Apps',status:'monitoring',updated_at:'2026-10-27T16:46:01.668Z',components:[{id:'zvm7mqn92xzc',name:'Workers AI',status:'degraded_performance'}],incident_updates:[{status:'monitoring',affected_components:[{code:'zvm7mqn92xzc',name:'Cloudflare Sites and Services - Workers AI',old_status:'operational',new_status:'degraded_performance'}]},{status:'identified',affected_components:null}]});
const feed=x=>({page:{url:'https://www.cloudflarestatus.com'},incidents:[{id:'cbvocc87nsne',name:'Cloudflare Workers - Cron Trigger Activation Issues',status:'resolved',updated_at:'2026-10-15T18:00:00Z'},x]});
const assess=x=>assessCronProviderSnapshot(feed(x),{now,dependencyProfile:profile});

test('closed prebuilt publication reports an exclusive Workers AI safety issue as nonblocking',()=>{
 const r=assess(ai());assert.equal(r.providerGate,'resolved');assert.equal(r.mayRunClosedVerification,true);assert.equal(r.operationalReadiness,false);assert.deepEqual(r.nonBlockingIncidents,[{id:'03gc4o049emd',status:'monitoring',updatedAt:'2026-10-27T16:46:01.668Z',url:'https://www.cloudflarestatus.com/incidents/03gc4o049emd'}]);
});
test('all-workers remains conservative for the same Workers AI incident',()=>{
 const r=assessCronProviderSnapshot(feed(ai()),{now});assert.equal(r.providerGate,'unknown');assert.equal(r.reason,'active_related_incident');assert.equal(r.mayRunClosedVerification,false);
});
test('title, component identity and affected component evidence are all mandatory',()=>{
 const changes=[x=>x.name='Workers runtime failures',x=>x.components[0].id='other',x=>x.components[0].name='Workers',x=>x.components[0].code='other',x=>delete x.components,x=>x.components=[],x=>delete x.incident_updates,x=>x.incident_updates=[],x=>x.incident_updates[0].affected_components=null,x=>x.incident_updates[0].affected_components[0].code='other',x=>x.incident_updates[0].affected_components[0].id='other',x=>x.incident_updates[0].affected_components[0].name='Cloudflare Sites and Services - Workers'];
 for(const mutate of changes){const x=ai();mutate(x);const r=assess(x);assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);assert.deepEqual(r.nonBlockingIncidents,[]);}
});
test('mixed Workers runtime or durable dependencies cannot be hidden by the AI title',()=>{
 for(const name of ['Workers','Workers Cron Triggers','D1','Containers','Durable Objects','Workflows']){
  for(const place of ['top','update']){const x=ai();if(place==='top')x.components.push({id:'another',name});else x.incident_updates[0].affected_components.push({code:'another',name});const r=assess(x);assert.notEqual(r.providerGate,'resolved');assert.equal(r.mayRunClosedVerification,false);}
 }
});
test('another active dependency and active Cron keep the closed verification gated',()=>{
 for(const name of ['D1','Containers','Workers','Workflows']){
  const s=feed(ai());s.incidents.push({id:'anotherincident',name,status:'identified',updated_at:'2026-10-27T16:45:00Z'});const r=assessCronProviderSnapshot(s,{now,dependencyProfile:profile});assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);assert.equal(r.nonBlockingIncidents.length,1);
 }
 const s=feed(ai());s.incidents[0].status='monitoring';const r=assessCronProviderSnapshot(s,{now,dependencyProfile:profile});assert.equal(r.providerGate,'blocked');assert.equal(r.mayRunClosedVerification,false);
});
test('invalid timestamps, duplicate IDs and malformed component metadata still fail closed',()=>{
 for(const mutate of [x=>x.updated_at='2027-01-01T00:00:00Z',x=>x.status='mystery',x=>x.id='bad/ID',x=>x.components='Workers AI',x=>x.incident_updates[0].affected_components='Workers AI']){
  const x=ai();mutate(x);const r=assess(x);assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);assert.deepEqual(r.nonBlockingIncidents,[]);
 }
 const s=feed(ai());s.incidents.push(ai());const r=assessCronProviderSnapshot(s,{now,dependencyProfile:profile});assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);assert.deepEqual(r.nonBlockingIncidents,[]);
});
test('public observer retains one bounded official read and sanitizes the nonblocking report',async()=>{
 let requests=0;const r=await checkOwnCronProvider({now:()=>now,dependencyProfile:profile,fetchImpl:async(url,options)=>{requests++;assert.equal(url,'https://www.cloudflarestatus.com/api/v2/incidents.json');assert.equal(options.redirect,'error');assert.deepEqual(Object.keys(options.headers),['User-Agent']);return new Response(JSON.stringify(feed(ai())),{headers:{'Content-Type':'application/json'}});}});
 assert.equal(requests,1);assert.equal(r.requestCount,1);assert.equal(r.providerGate,'resolved');assert.equal(r.operationalReadiness,false);assert.equal(JSON.stringify(r).includes('unsafe topic'),false);assert.equal(JSON.stringify(r).includes('AI Security'),false);
});
