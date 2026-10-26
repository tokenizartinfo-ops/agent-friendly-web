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

test('bounded provider diagnostics distinguish causes without granting authority or echoing response text',async()=>{
 const privateText='SYNTHETIC_PRIVATE_DIAGNOSTIC_MUST_NOT_ESCAPE';
 const cases=[
  {reason:'http_status',httpStatus:302,receivedBytes:0,fetchImpl:async()=>new Response(privateText,{status:302,headers:{Location:'https://outside.invalid/'+privateText}})},
  {reason:'unexpected_content_type',httpStatus:200,receivedBytes:0,fetchImpl:async()=>new Response(privateText,{headers:{'Content-Type':'text/html; '+privateText}})},
  {reason:'invalid_json',httpStatus:200,receivedBytes:privateText.length,fetchImpl:async()=>new Response(privateText,{headers:{'Content-Type':'application/json'}})},
  {reason:'invalid_snapshot',httpStatus:200,receivedBytes:null,fetchImpl:async()=>response({body:privateText})},
  {reason:'request_failed',httpStatus:null,receivedBytes:0,fetchImpl:async()=>{throw Error(privateText);}}
 ];
 for(const c of cases){
  const r=await checkOwnCronProvider({now:()=>now,fetchImpl:c.fetchImpl});
  assert.equal(r.providerGate,'unknown');assert.equal(r.reason,c.reason);
  assert.equal(r.httpStatus,c.httpStatus);
  if(c.receivedBytes!==null)assert.equal(r.receivedBytes,c.receivedBytes);
  assert.equal(r.mayRunClosedVerification,false);assert.equal(r.operationalReadiness,false);
  assert.equal(JSON.stringify(r).includes(privateText),false);
 }
});
test('body limit and timeout remain terminal with bounded diagnostic counts',async()=>{
 let calls=0,cancelled=0;
 const tooLarge=new ReadableStream({start(c){c.enqueue(new Uint8Array(262145));},cancel(){cancelled++;}});
 const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async()=>{calls++;return new Response(tooLarge,{headers:{'Content-Type':'application/json'}});}});
 assert.equal(r.reason,'body_too_large');assert.equal(r.receivedBytes,262145);assert.equal(calls,1);assert.equal(cancelled,1);
 const stalled=new ReadableStream({start(){},cancel(){cancelled++;}});
 const timeout=await checkOwnCronProvider({now:()=>now,timeoutMs:10,fetchImpl:async()=>{calls++;return new Response(stalled,{headers:{'Content-Type':'application/json'}});}});
 assert.equal(timeout.reason,'deadline_exceeded');assert.equal(timeout.receivedBytes,0);assert.equal(calls,2);assert.equal(cancelled,2);
});

const buildsIncident=()=>({id:'buildsonly',name:'Cloudflare Workers build delays',status:'monitoring',updated_at:'2026-10-13T17:00:00Z',components:[{id:'vcpsk0w6g86k',name:'Workers Builds'}],incident_updates:[{affected_components:[{code:'vcpsk0w6g86k',name:'Cloudflare Sites and Services - Workers Builds'}]}]});
test('prebuilt closed publication scopes an exclusive Builds incident without changing default or claiming readiness',()=>{
 const input=snapshot('resolved',[buildsIncident()]);
 assert.equal(assessCronProviderSnapshot(input,{now}).providerGate,'unknown');
 const r=assessCronProviderSnapshot(input,{now,dependencyProfile:'prebuilt-closed-publication'});
 assert.equal(r.providerGate,'resolved');assert.equal(r.dependencyProfile,'prebuilt-closed-publication');
 assert.equal(r.mayRunClosedVerification,true);assert.equal(r.operationalReadiness,false);
 assert.deepEqual(r.nonBlockingIncidents,[{id:'buildsonly',status:'monitoring',updatedAt:'2026-10-13T17:00:00Z',url:'https://www.cloudflarestatus.com/incidents/buildsonly'}]);
});
test('prebuilt profile rejects ambiguous Builds attribution and every runtime dependency',()=>{
 const builds=buildsIncident();
 const cases=[
  {...builds,components:[]},
  {...builds,components:[{id:'wrong',name:'Workers Builds'}]},
  {...builds,components:[{id:'vcpsk0w6g86k',name:'Workers'}]},
  {...builds,name:'Workers Builds and API errors'},
  {...builds,components:[...builds.components,{id:'runtime',name:'Workers'}]},
  {...builds,incident_updates:[{affected_components:[{code:'runtime',name:'Cloudflare Sites and Services - Workers'}]}]},
  {...builds,updated_at:'2027-01-01T00:00:00Z'},
  {...builds,status:'mystery'}
 ];
 cases.push({...builds,incident_updates:[]},{...builds,incident_updates:[{affected_components:[{code:'wrong',name:'Cloudflare Sites and Services - Workers Builds'}]}]});
 for(const other of cases)assert.equal(assessCronProviderSnapshot(snapshot('resolved',[other]),{now,dependencyProfile:'prebuilt-closed-publication'}).providerGate,'unknown');
 for(const name of ['Workers','Workers Cron Triggers','Durable Objects','Containers','D1','Workflows']){
  const other={id:'runtime',name,status:'identified',updated_at:'2026-10-13T17:00:00Z'};
  const r=assessCronProviderSnapshot(snapshot('resolved',[builds,other]),{now,dependencyProfile:'prebuilt-closed-publication'});
  assert.notEqual(r.providerGate,'resolved');assert.equal(r.mayRunClosedVerification,false);
 }
 assert.equal(assessCronProviderSnapshot(snapshot('resolved',[builds]),{now,dependencyProfile:'caller-bypass'}).providerGate,'unknown');
 assert.equal(assessCronProviderSnapshot(snapshot('resolved'),{now,dependencyProfile:'caller-bypass'}).providerGate,'unknown');
});
test('prebuilt profile uses the same single bounded credential-free provider GET',async()=>{
 let calls=0;
 const r=await checkOwnCronProvider({now:()=>now,dependencyProfile:'prebuilt-closed-publication',fetchImpl:async(url,options)=>{calls++;assert.equal(url,'https://www.cloudflarestatus.com/api/v2/incidents.json');assert.equal(options.redirect,'error');assert.deepEqual(Object.keys(options.headers),['User-Agent']);return response(snapshot('resolved',[buildsIncident()]));}});
 assert.equal(calls,1);assert.equal(r.providerGate,'resolved');assert.equal(r.dependencyProfile,'prebuilt-closed-publication');assert.equal(r.httpStatus,200);assert.equal(r.operationalReadiness,false);
});

const recentWithoutTracked=()=>({page:{url:'https://www.cloudflarestatus.com'},incidents:Array.from({length:50},(_,i)=>({id:'history'+i,name:'Network maintenance',status:'resolved',updated_at:'2026-10-13T17:00:00Z'}))});
const trackedSnapshot=(status='resolved')=>({page:{url:'https://www.cloudflarestatus.com'},incident:incident(status)});
test('rolling recent feed uses one exact historical lookup when the tracked incident ages out',async()=>{
 const urls=[];const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async(url,options)=>{urls.push(url);assert.equal(options.redirect,'error');assert.deepEqual(Object.keys(options.headers),['User-Agent']);return response(urls.length===1?recentWithoutTracked():trackedSnapshot());}});
 assert.deepEqual(urls,['https://www.cloudflarestatus.com/api/v2/incidents.json','https://www.cloudflarestatus.com/api/v2/incidents/cbvocc87nsne.json']);
 assert.equal(r.providerGate,'resolved');assert.equal(r.operationalReadiness,false);assert.equal(r.requestCount,2);assert.equal(r.trackedIncidentLookup,true);
});
test('tracked history cannot hide a new active cron incident in the current fifty',async()=>{
 const current=recentWithoutTracked();current.incidents[0]={...incident('investigating'),id:'newactivecron'};
 let calls=0;const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async()=>response(++calls===1?current:trackedSnapshot())});
 assert.equal(calls,2);assert.equal(r.providerGate,'blocked');assert.equal(r.reason,'active_cron_incident');
});
test('a supplemental tracked snapshot must have exact official page, identity, status and date',()=>{
 const current=recentWithoutTracked();
 for(const bad of [{...trackedSnapshot(),page:{url:'https://foreign.invalid'}},{...trackedSnapshot(),incident:{...incident('resolved'),id:'other'}},trackedSnapshot('mystery'),{...trackedSnapshot(),incident:{...incident('resolved'),updated_at:'2027-01-01T00:00:00Z'}}]){
  const r=assessCronProviderSnapshot(current,{now,trackedSnapshot:bad});assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);
 }
 assert.equal(assessCronProviderSnapshot(current,{now,trackedSnapshot:trackedSnapshot()}).providerGate,'resolved');
 assert.equal(assessCronProviderSnapshot(current,{now}).providerGate,'unknown');
});
test('oversized recent lists and malformed roots never request a historical fallback',async()=>{
 for(const current of [{...recentWithoutTracked(),incidents:[...recentWithoutTracked().incidents,{...incident('resolved'),id:'fiftyone'}]},{page:{url:'https://foreign.invalid'},incidents:[]},{page:{url:'https://www.cloudflarestatus.com'},incidents:[null]}]){
  let calls=0;const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async()=>{calls++;return response(current);}});
  assert.equal(calls,1);assert.equal(r.providerGate,'unknown');
 }
});
test('failed historical HTTP never clears the gate or echoes provider response bodies',async()=>{
 let calls=0;const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async()=>++calls===1?response(recentWithoutTracked()):new Response('PRIVATE_TRACKED_BODY',{status:404})});
 assert.equal(calls,2);assert.equal(r.providerGate,'unknown');assert.equal(r.reason,'http_status');assert.equal(JSON.stringify(r).includes('PRIVATE_TRACKED_BODY'),false);
});
test('the historical response shares the original cumulative byte cap',async()=>{
 let calls=0,cancelled=false;const stream=new ReadableStream({pull(c){c.enqueue(new Uint8Array(262144));},cancel(){cancelled=true;}});
 const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async()=>++calls===1?response(recentWithoutTracked()):new Response(stream,{headers:{'Content-Type':'application/json'}})});
 assert.equal(calls,2);assert.equal(r.providerGate,'unknown');assert.equal(r.reason,'body_too_large');assert.equal(cancelled,true);
});
test('historical lookup shares the original deadline and abort signal',async()=>{
 let calls=0,firstSignal,cancelled=false;const r=await checkOwnCronProvider({now:()=>now,timeoutMs:35,fetchImpl:async(url,o)=>{calls++;if(calls===1){firstSignal=o.signal;await new Promise(resolve=>setTimeout(resolve,15));return response(recentWithoutTracked());}assert.equal(o.signal,firstSignal);return new Response(new ReadableStream({pull(){return new Promise(()=>{});},cancel(){cancelled=true;}}),{headers:{'Content-Type':'application/json'}});}});
 assert.equal(calls,2);assert.equal(r.providerGate,'unknown');assert.equal(r.reason,'deadline_exceeded');assert.equal(firstSignal.aborted,true);assert.equal(cancelled,true);
});
test('late completion of the recent request cannot open a historical request after timeout',async()=>{
 let calls=0,release;const held=new Promise(resolve=>{release=resolve;});
 const r=await checkOwnCronProvider({now:()=>now,timeoutMs:5,fetchImpl:async()=>{calls++;await held;return response(recentWithoutTracked());}});
 assert.equal(r.reason,'deadline_exceeded');release();await new Promise(resolve=>setTimeout(resolve,10));assert.equal(calls,1);
});
test('prebuilt profile still excludes only narrow Builds incidents after historical lookup',()=>{
 const current=recentWithoutTracked();current.incidents[0]={id:'buildissue',name:'Workers Builds delays',status:'identified',updated_at:'2026-10-13T17:00:00Z',components:[{id:'vcpsk0w6g86k',name:'Workers Builds'}],incident_updates:[{affected_components:[{code:'vcpsk0w6g86k',name:'Cloudflare Sites and Services - Workers Builds'}]}]};
 assert.equal(assessCronProviderSnapshot(current,{now,trackedSnapshot:trackedSnapshot(),dependencyProfile:'all-workers'}).providerGate,'unknown');
 assert.equal(assessCronProviderSnapshot(current,{now,trackedSnapshot:trackedSnapshot(),dependencyProfile:'prebuilt-closed-publication'}).providerGate,'resolved');
 current.incidents[1]={id:'runtimeissue',name:'Durable Objects errors',status:'identified',updated_at:'2026-10-13T17:00:00Z'};
 assert.equal(assessCronProviderSnapshot(current,{now,trackedSnapshot:trackedSnapshot(),dependencyProfile:'prebuilt-closed-publication'}).providerGate,'unknown');
});

test('supplemental incident names must obey the recent-feed string schema',()=>{
 for(const name of [undefined,null,42,{toString(){return 'Workers Cron Triggers';}}]){
  const r=assessCronProviderSnapshot(recentWithoutTracked(),{now,trackedSnapshot:{...trackedSnapshot(),incident:{...incident('resolved'),name,components:[{name:'Workers Cron Triggers'}]}}});
  assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);
 }
});
test('duplicate unrelated recent IDs cannot be cleared by tracked history or trigger fallback',async()=>{
 const current={...recentWithoutTracked(),incidents:Array.from({length:50},()=>recentWithoutTracked().incidents[0])};
 assert.equal(assessCronProviderSnapshot(current,{now,trackedSnapshot:trackedSnapshot()}).providerGate,'unknown');
 let calls=0;const r=await checkOwnCronProvider({now:()=>now,fetchImpl:async()=>{calls++;return response(current);}});
 assert.equal(calls,1);assert.equal(r.providerGate,'unknown');
});
test('synchronous timer starvation cannot start a fallback after the original absolute cutoff',async()=>{
 let calls=0;const r=await checkOwnCronProvider({now:()=>now,timeoutMs:5,fetchImpl:async()=>{calls++;const until=performance.now()+25;while(performance.now()<until){}return response(calls===1?recentWithoutTracked():trackedSnapshot());}});
 assert.equal(calls,1);assert.equal(r.reason,'deadline_exceeded');assert.equal(r.providerGate,'unknown');assert.equal(r.mayRunClosedVerification,false);
});
test('a historical response arriving after a starved deadline cannot clear the gate',async()=>{
 let calls=0;const r=await checkOwnCronProvider({now:()=>now,timeoutMs:20,fetchImpl:async()=>{calls++;if(calls===2){const until=performance.now()+30;while(performance.now()<until){}}return response(calls===1?recentWithoutTracked():trackedSnapshot());}});
 assert.equal(calls,2);assert.equal(r.reason,'deadline_exceeded');assert.equal(r.providerGate,'unknown');
});
