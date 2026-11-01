import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import * as runtime from '../lib/mcp-release-runtime.mjs';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
import {namedHistoryFixture,seedNamedHistoryFixture} from './fixtures/named-known-cancellation.mjs';
import {rehearseExactNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';
const hash=x=>createHash('sha256').update(x).digest('hex');
const script='export default {fetch(){return new Response(null,{status:404})}}';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
const blocked={status:'blocked',mayRetry:false,operationalReadiness:false};
const call=f=>runtime.runKnownCancellationReleaseWorkflow(f.input);
async function fixture(){
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default{fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'adapter-only-synthetic'}}));
 try{
 const db=await mf.getD1Database('DB'),at=Date.now(),window={startAt:at-1000,expiresAt:at+120000},policy=inertNamedConfirmationPolicy(artifact);
 Object.assign(policy,window);Object.assign(policy.plan,window);
 const bindings=policy.observation.configuration.bindings,mb=bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(mb.text);
 Object.assign(manifest.candidate,window);mb.text=JSON.stringify(manifest);
 const eb=bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');eb.text=JSON.stringify({...JSON.parse(eb.text),...window});
 policy.plan.configurationHash=activationConfigurationHash(policy.observation.configuration);
 const bundle={artifact,policy},history=namedHistoryFixture(bundle),retired={...manifest.original,processGeneration:'8'.repeat(64),image:'cloudflare/debian-trixie',createdAt:at-20000,expiresAt:at-10000,closedAt:at-5000};
 await seedNamedHistoryFixture(db,history,retired);
 const f={mf,db,bundle,history,retired,reads:[],steps:0,credentials:0,afterRead:async()=>{},stepResult:blocked};
 const audited={prepare:db.prepare.bind(db),withSession(mode){
  assert.equal(mode,'first-primary');const s=db.withSession(mode);
  return{prepare(sql){assert.ok(!/SELECT \*/i.test(sql));const q=s.prepare(sql);return{bind(...params){const b=q.bind(...params);return{
   async all(){f.reads.push(sql);const r=await b.all();await f.afterRead(sql,r);return r;},
   async first(){f.reads.push(sql);const r=await b.first();await f.afterRead(sql,r);return r;}
  };}};}};}
 };
 const node={idFromName(name){return {toString:()=>name==='afw-own-event-one-occurrence-v1'?manifest.original.containerId:'6'.repeat(64)};},idFromString(id){return{toString:()=>id};},get(){throw Error('fixture cannot launch');}};
 const env={AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_EVENTS_NODE:node,RELEASE_DB:audited};
 Object.defineProperty(env,'AFW_RELEASE_READ_TOKEN',{get(){f.credentials++;throw Error('private credential must not be read');}});
 const planHash=hash(JSON.stringify(bundle)),event={timestamp:new Date(at),instanceId:'afw-release-'+planHash,payload:{planHash}};
 const step={async do(name,options){f.steps++;f.timeout=options.timeout;assert.equal(name,'confirm-named-activation');return f.stepResult;}};
 f.input={bundle,env,event,step};return f;
 }catch(e){await mf.dispose();throw e;}
}
test('fixed adapter exists without exporting a lease mint or registry',()=>{
 assert.equal(typeof runtime.runKnownCancellationReleaseWorkflow,'function');
 assert.deepEqual(Object.keys(runtime).sort(),['runKnownCancellationReleaseWorkflow','runReleaseOperator','runReleaseWorkflow']);
});
test('two primary snapshots plus initial and Workflow eligibility precede the fixed named step',async()=>{
 const f=await fixture();try{
 assert.deepEqual(await call(f),blocked);assert.equal(f.steps,1);assert.equal(f.credentials,0);
 assert.equal(f.reads.filter(s=>s.includes('SELECT 1 AS eligible')).length,2);
 assert.equal(f.reads.filter(s=>s.includes('LIMIT 2')).length,4);
 assert.equal(f.reads.filter(s=>s.includes('LIMIT 9')).length,2);
 assert.ok(f.timeout>0&&f.timeout<=70000-(Date.now()-f.input.event.timestamp.getTime())+200);
 }finally{await f.mf.dispose();}
});
for(const mode of ['hash','instance','payload-extra','history-input','authorize-input','schedule','future-event','queue-expired','flag','namespace','invalid-date'])test('fixed admission denies '+mode+' before primary reads',async()=>{
 const f=await fixture();try{
 const {event,env}=f.input;
 if(mode==='hash')event.payload.planHash='0'.repeat(64);
 if(mode==='instance')event.instanceId='foreign';
 if(mode==='payload-extra')event.payload.authorize=true;
 if(mode==='history-input')f.input.cancellationHistory=f.history.providedRaw;
 if(mode==='authorize-input')f.input.authorize=async()=>true;
 if(mode==='schedule')event.schedule='* * * * *';
 if(mode==='future-event')event.timestamp=new Date(Date.now()+10000);
 if(mode==='queue-expired')event.timestamp=new Date(Date.now()-70001);
 if(mode==='flag')env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED='false';
 if(mode==='namespace')env.AFW_RELEASE_EVENTS_NODE={};
 if(mode==='invalid-date')event.timestamp=new Date(NaN);
 assert.deepEqual(await call(f),blocked);assert.equal(f.reads.length,0);assert.equal(f.steps,0);assert.equal(f.credentials,0);
 }finally{await f.mf.dispose();}
});
const faults={
 'missing-current':"DELETE FROM delegated_access_grants WHERE id='ci-only-inert'",
 'revoked-current':"UPDATE delegated_access_grants SET revoked_at='2026-01-01T00:00:00.000Z' WHERE id='ci-only-inert'",
 'expired-current':"UPDATE delegated_access_grants SET expires_at='2026-01-01T00:00:00.000Z' WHERE id='ci-only-inert'",
 'wrong-current-owner':"UPDATE delegated_access_grants SET user_id='foreign' WHERE id='ci-only-inert'",
 'wrong-original-owner':"UPDATE site_projects SET user_id='foreign'",
 'wrong-cancelled-owner':"UPDATE delegated_access_grants SET user_id='foreign' WHERE id='fixture-cancelled'",
 'unexchanged-current':"UPDATE delegated_access_grants SET exchanged_at='' WHERE id='ci-only-inert'",
 'future-current-exchange':"UPDATE delegated_access_grants SET exchanged_at='2099-01-01T00:00:00.000Z' WHERE id='ci-only-inert'",
 'extra-current-scope':"UPDATE delegated_access_grants SET scopes_json='[\"afw:project:read\",\"afw:evidence:read\"]' WHERE id='ci-only-inert'",
 'missing-cancellation-join':"DELETE FROM delegated_access_grants WHERE id='fixture-cancelled'"
};
for(const [mode,sql] of Object.entries(faults))test('complete primary authority denies '+mode+' without runtime',async()=>{
 const f=await fixture();try{await f.db.prepare(sql).run();assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);assert.equal(f.credentials,0);}finally{await f.mf.dispose();}
});
test('current monitoring revocation after the first snapshot cannot be adopted as a new history',async()=>{
 const f=await fixture();try{
 let changed=false;f.afterRead=async sql=>{if(!changed&&sql.includes('LIMIT 9')){changed=true;const e=f.history.events,at=Date.now();await f.db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(5,e.grantId,e.projectId,e.subject,e.clientId,e.resource,1,'revoke','afw.dossier-monitoring.v1','fixture-revoke',at,at).run();}};
 assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);
 }finally{await f.mf.dispose();}
});
test('unknown NULL-generation history cannot be hidden by missing joins',async()=>{
 const f=await fixture();try{
 const r=f.retired;await f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('unknown',null,'7'.repeat(64),r.programHash,r.sourceRevision,r.image,r.closedAt).run();
 assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);
 }finally{await f.mf.dispose();}
});
test('strict projection refuses row accessors and never exposes provider errors',async()=>{
 const f=await fixture();try{let touched=0;f.afterRead=async(sql,r)=>{if(sql.includes('LIMIT 2'))Object.defineProperty(r.results[0],'user_id',{enumerable:true,get(){touched++;throw Error('private subject');}});};assert.deepEqual(await call(f),blocked);assert.equal(touched,0);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
 const g=await fixture();try{g.afterRead=async()=>{throw Error('private primary detail');};assert.deepEqual(await call(g),blocked);}finally{await g.mf.dispose();}
});
test('binding drift during projection is permanently denied',async()=>{
 const f=await fixture();try{f.afterRead=async()=>{f.input.env.RELEASE_DB={};};assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
});
test('outer step settlement past the original event ceiling cannot report confirmed',async()=>{
 const f=await fixture(),realNow=Date.now;try{
 f.input.step.do=async()=>{f.steps++;Date.now=()=>f.input.event.timestamp.getTime()+70001;return{status:'confirmed',mayRetry:false,operationalReadiness:false};};
 assert.deepEqual(await call(f),{status:'uncertain',mayRetry:false,operationalReadiness:false});assert.equal(f.steps,1);
 }finally{Date.now=realNow;await f.mf.dispose();}
});
test('a shape-compatible or copied request lease is rejected before its methods are invoked',async()=>{
 const f=await fixture();try{let calls=0;for(const lease of [{current(){calls++;return true;},remaining(){calls++;return 70000;}},{},null]){
 assert.deepEqual(await runtime.runReleaseWorkflow({...f.input,requestLease:lease}),blocked);
 }assert.equal(calls,0);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
});
async function nativeBuild(bundle){
 const fixtureHistory=namedHistoryFixture(bundle),planHash=hash(JSON.stringify(bundle));
 const source="import {WorkflowEntrypoint} from 'cloudflare:workers';import {runKnownCancellationReleaseWorkflow} from './lib/mcp-release-runtime.mjs';const bundle="+JSON.stringify(bundle)+";export class AfwReleaseWorkflow extends WorkflowEntrypoint{async run(event,step){return runKnownCancellationReleaseWorkflow({bundle,env:this.env,event,step});}}export default{fetch(){return new Response(null,{status:404});}};";
 const compiled=await build({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'adapter-native-test.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 return{script:compiled.outputFiles[0].text,planHash,fixtureHistory};
}
test('actual native Workflow/D1/retirement composition reserves exactly once with the fixed adapter',async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:nativeBuild,mode:'confirmed',reserve:'true',historyFixture:true});
 assert.equal(r.output.status,'confirmed',JSON.stringify(r.output));
 assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});assert.equal(r.reservationCount,1);
 assert.equal(r.counters.retirementReads,2);assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
});
test('late reservation acknowledgement preserves the committed row and all journals',async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:nativeBuild,mode:'confirmed',reserve:'true',historyFixture:true,fault:'reservation-ack-lost'});
 assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
 assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
});
