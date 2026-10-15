import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {assessCronProviderSnapshot,checkOwnCronProvider} from '../scripts/check-own-cron-provider.mjs';
const now=Date.parse('2026-10-13T18:00:00Z');
const incident=status=>({id:'cbvocc87nsne',name:'Cloudflare Workers - Cron Trigger Activation Issues',status,updated_at:'2026-10-13T17:00:00Z'});
const snapshot=(status='identified',extra=[])=>({page:{url:'https://www.cloudflarestatus.com'},incidents:[incident(status),...extra]});
const response=s=>new Response(JSON.stringify(s),{headers:{'Content-Type':'application/json'}});
test('active or monitoring provider incident blocks a new own cron trial without approval claims',()=>{
 for(const status of ['investigating','identified','monitoring']){const r=assessCronProviderSnapshot(snapshot(status),{now});assert.equal(r.providerGate,'blocked');assert.equal(r.mayRunClosedVerification,false);assert.equal(r.operationalReadiness,false);}
});
test('resolved original plus no other active cron issue permits only closed verification',()=>{
 const r=assessCronProviderSnapshot(snapshot('resolved'),{now});assert.equal(r.providerGate,'resolved');assert.equal(r.mayRunClosedVerification,true);assert.equal(r.operationalReadiness,false);
});
test('another active workers cron incident still blocks after original resolution',()=>{
 const other={...incident('identified'),id:'newcronissue',name:'Workers Cron Triggers degraded'};
 assert.equal(assessCronProviderSnapshot(snapshot('resolved',[other]),{now}).providerGate,'blocked');
});
test('affected components prevent a differently titled active cron incident from being ignored',()=>{
 const other={...incident('identified'),id:'newcronissue',name:'Scheduled jobs delayed',components:[{name:'Workers Cron Triggers'}]};
 assert.equal(assessCronProviderSnapshot(snapshot('resolved',[other]),{now}).providerGate,'blocked');
});
test('ambiguous active Workers impact cannot certify provider clearance',()=>{
 const other={...incident('identified'),id:'newworkerissue',name:'Service delays',incident_updates:[{affected_components:[{name:'Workers'}]}]};
 assert.equal(assessCronProviderSnapshot(snapshot('resolved',[other]),{now}).providerGate,'unknown');
});

test('active runtime dependencies keep verification closed and identify the official incident',()=>{
 for(const component of ['Durable Objects','Containers','D1','Workflows']){
  const other={id:'9yl8m5h16g1z',name:'Regional service errors',status:'identified',updated_at:'2026-10-13T17:00:00Z',components:[{name:component}]};
  const r=assessCronProviderSnapshot(snapshot('resolved',[other]),{now});
  assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);assert.equal(r.operationalReadiness,false);
  assert.equal(r.reason,'active_related_incident');assert.deepEqual(r.relatedIncidents,[{id:other.id,status:'identified',updatedAt:other.updated_at,url:'https://www.cloudflarestatus.com/incidents/9yl8m5h16g1z'}]);
  assert.equal(r.impactAttribution,'not-established');
 }
});
test('diagnostic never echoes arbitrary incident titles or unsafe identifiers',()=>{
 const other={id:'https://private.invalid/SECRET',name:'PRIVATE_TEXT',status:'identified',updated_at:'2026-10-13T17:00:00Z',components:[{name:'Workers'}]};
 const r=assessCronProviderSnapshot(snapshot('resolved',[other]),{now});assert.equal(r.providerGate,'unknown');assert.equal(JSON.stringify(r).includes('SECRET'),false);assert.equal(JSON.stringify(r).includes('PRIVATE_TEXT'),false);
});
test('dependency incident title is sufficient when component metadata is absent',()=>{
 const other={id:'newdependency',name:'Increased Errors for Durable Objects',status:'identified',updated_at:'2026-10-13T17:00:00Z'};
 assert.equal(assessCronProviderSnapshot(snapshot('resolved',[other]),{now}).providerGate,'unknown');
});
test('malformed affected component metadata is not silently discarded',()=>{
 const other={...incident('identified'),id:'newworkerissue',name:'Service delays',components:'Workers Cron Triggers'};
 assert.equal(assessCronProviderSnapshot(snapshot('resolved',[other]),{now}).providerGate,'unknown');
});
test('absence, duplicates, unknown status, foreign page and impossible dated evidence stay unknown',()=>{
 const candidates=[{page:{url:'https://www.cloudflarestatus.com'},incidents:[]},snapshot('resolved',[incident('resolved')]),snapshot('mystery'),{...snapshot('resolved'),page:{url:'https://foreign.invalid'}},snapshot('resolved',[{id:'other',name:'Workers Cron Triggers degraded',status:'mystery',updated_at:'2026-10-13T17:00:00Z'}])];
 candidates.push({...snapshot('resolved'),incidents:[{...incident('resolved'),updated_at:'2027-01-01T00:00:00Z'}]});
 for(const s of candidates)assert.equal(assessCronProviderSnapshot(s,{now}).providerGate,'unknown');
});
test('fetch stays fixed to public official API, no redirects and no account credentials',async()=>{
 let calls=0;const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async(url,options)=>{calls++;assert.equal(url,'https://www.cloudflarestatus.com/api/v2/incidents.json');assert.equal(options.redirect,'error');assert.match(options.headers['User-Agent'],/agentfriendlyweb.dev/);assert.deepEqual(Object.keys(options.headers),['User-Agent']);return response(snapshot());}});
 assert.equal(calls,1);assert.equal(r.providerGate,'blocked');
});
test('network or invalid HTTP/body failures do not print provider text or permit verification',async()=>{
 const secret='PRIVATE_STRING_MUST_NOT_ESCAPE';const bad=[async()=>{throw Error(secret);},async()=>new Response(secret,{status:503}),async()=>new Response(secret,{headers:{'Content-Type':'text/html'}}),async()=>response({body:secret})];
 for(const fetchImpl of bad){const r=await checkOwnCronProvider({fetchImpl,now:()=>now});assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);assert.equal(JSON.stringify(r).includes(secret),false);}
});
test('oversized streaming response is cancelled and does not become a resolved receipt',async()=>{
 let cancelled=false;const stream=new ReadableStream({pull(c){c.enqueue(new Uint8Array(262145));},cancel(){cancelled=true;}});
 const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async()=>new Response(stream,{headers:{'Content-Type':'application/json'}})});assert.equal(r.providerGate,'unknown');assert.equal(cancelled,true);
});
test('deadline covers response body and cancels a stalled stream',async()=>{
 let cancelled=false;const stream=new ReadableStream({start(){},cancel(){cancelled=true;}});
 const r=await checkOwnCronProvider({now:()=>now,timeoutMs:20,fetchImpl:async()=>new Response(stream,{headers:{'Content-Type':'application/json'}})});assert.equal(r.providerGate,'unknown');assert.equal(cancelled,true);
});
test('native CLI exposes distinct hold and unknown exit codes without a live network call',()=>{
 const url=new URL('../scripts/check-own-cron-provider.mjs',import.meta.url).href;
 for(const [s,code,gate] of [[snapshot(),2,'blocked'],[snapshot('resolved'),0,'resolved'],[{page:{url:'https://www.cloudflarestatus.com'},incidents:[]},1,'unknown']]){
  const script=`import {fileURLToPath} from 'node:url';process.argv[1]=fileURLToPath(${JSON.stringify(url)});globalThis.fetch=async()=>new Response(${JSON.stringify(JSON.stringify(s))},{headers:{'Content-Type':'application/json'}});await import(${JSON.stringify(url)});`;
  const child=spawnSync(process.execPath,['--input-type=module','-e',script],{encoding:'utf8',timeout:3000});
  assert.equal(child.status,code);assert.equal(JSON.parse(child.stdout).providerGate,gate);assert.equal(child.stderr,'');
 }
});
