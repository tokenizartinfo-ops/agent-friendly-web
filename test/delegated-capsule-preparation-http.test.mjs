import test from 'node:test';
import assert from 'node:assert/strict';
import {createAgentCapsulePreparation} from '../lib/agent-capsule-preparation.mjs';
import {createDelegatedCapsulePreparationOAuthHost} from '../lib/delegated-capsule-preparation-oauth.mjs';
import {capsulePreparationFixture,input,authority} from './fixtures/agent-capsule-preparation.mjs';
let boundary,createLease,readLease;
try{({createCapsulePreparationHttpBoundary:boundary}=await import('../lib/delegated-capsule-preparation-http.mjs'));}catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
try{({createCapsulePreparationRequestLease:createLease,readCapsulePreparationRequestLease:readLease}=await import('../lib/capsule-preparation-request-lease.mjs'));}catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
const issuer='https://example.invalid';
const bytes=s=>new TextEncoder().encode(s);
function required(){assert.equal(typeof boundary,'function','missing closed request boundary');assert.equal(typeof createLease,'function','missing original request lease');}
function req(body='{}',options={}){return new Request(issuer+'/mcp',{method:'POST',headers:{'Content-Type':'application/json',...options.headers},body,...(body instanceof ReadableStream?{duplex:'half'}:{}),...options});}
function harness(handle=async()=>Response.json({ok:true})){
 required();let wall=Date.now(),mono=0,calls=0;
 const run=boundary({enabled:true,issuer,now:()=>wall,monotonic:()=>mono,handle:async(...args)=>{calls++;return handle(...args);}});
 return {run,get calls(){return calls;},advance(w,m=w){wall+=w;mono+=m;},get wall(){return wall;},get mono(){return mono;}};
}
test('disabled boundary does not touch handler, policy or clocks',()=>{
 required();let touched=0;const boom=()=>{touched++;throw Error('SECRET');};
 for(const enabled of [undefined,false,'true',1])assert.equal(boundary({enabled,get handle(){return boom();},get issuer(){return boom();},now:boom}),null);
 assert.equal(touched,0);
});
test('canonical private origin and server handler are required',()=>{
 required();for(const issuer of ['http://example.invalid','https://example.invalid/','https://a:b@example.invalid','https://example.invalid/x','https://example.invalid?x=1'])assert.throws(()=>boundary({enabled:true,issuer,handle(){}}),{message:'Preparation HTTP boundary unavailable'});
 assert.throws(()=>boundary({enabled:true,issuer,handle:null}),{message:'Preparation HTTP boundary unavailable'});
});
test('foreign origin, path, query and methods fail before reading body or invoking protected server',async()=>{
 const h=harness();for(const [url,options,want] of [
 [issuer+'/other',{},404],[issuer+'/mcp?x=1',{},404],['https://other.invalid/mcp',{},404],
 [issuer+'/mcp',{headers:{Origin:'https://other.invalid'}},403],[issuer+'/mcp',{method:'GET'},405]
 ]){const r=new Request(url,{...options});assert.equal((await h.run(r)).status,want);}
 assert.equal(h.calls,0);
});
test('unsupported and compressed bodies never enter the protected handler',async()=>{
 const h=harness();for(const headers of [{'Content-Type':'text/plain'},{'Content-Encoding':'gzip'},{'Content-Type':'application/json; charset=latin1'}]){
  assert.equal((await h.run(req('{}',{headers}))).status,415);
 }assert.equal(h.calls,0);
});
test('actual streaming bytes are capped even with absent or lying content length',async()=>{
 const h=harness();for(const headers of [{},{'Content-Length':'2'}]){
  let canceled=false;const stream=new ReadableStream({start(c){c.enqueue(bytes('x'.repeat(4097)));},cancel(){canceled=true;}});
  assert.equal((await h.run(req(stream,{headers:{'Content-Type':'application/json',...headers}}))).status,413);
  assert.equal(canceled,true);
 }assert.equal(h.calls,0);
});
test('declared oversize is rejected without pulling the body; length mismatch and invalid declarations fail closed',async()=>{
 const h=harness();for(const header of ['4097','-1','2x','0002']){
  const r=req('{}',{headers:{'Content-Type':'application/json','Content-Length':header}});
  assert.equal((await h.run(r)).status,header==='4097'?413:400);
 }assert.equal((await h.run(req('{}',{headers:{'Content-Type':'application/json','Content-Length':'3'}}))).status,400);
 assert.equal(h.calls,0);
});
test('invalid JSON, UTF8, empty body and batch are rejected after bounded reading',async()=>{
 const h=harness();for(const body of ['','{','[]','null','1',new Uint8Array([0xc3,0x28])]){
  assert.equal((await h.run(req(body))).status,400);
 }assert.equal(h.calls,0);
});
test('bounded body is reconstructed once, headers remain request-local and response becomes no-store',async()=>{
 let lease,received,ctx;const privateHeader='synthetic-not-a-real-token';
 const h=harness(async(r,_env,c,l)=>{lease=l;received=await r.json();ctx=c;assert.equal(r.headers.get('Authorization'),privateHeader);return Response.json({ok:true});});
 const response=await h.run(req(JSON.stringify(input),{headers:{'Content-Type':'application/json','Authorization':privateHeader}}),{}, {tag:'server'});
 assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});assert.equal(response.headers.get('Cache-Control'),'no-store');
 assert.deepEqual(received,input);assert.deepEqual(ctx,{tag:'server'});assert.equal(h.calls,1);assert.equal(Object.isFrozen(lease),true);
 assert.throws(()=>readLease(lease).check());assert.equal(readLease({}),null);
});
test('a body that consumes the original budget never reaches authentication or storage',async()=>{
 const h=harness();let canceled=false;
 const stream=new ReadableStream({pull(c){h.advance(0,5001);c.enqueue(bytes('{}'));},cancel(){canceled=true;}});
 const r=await h.run(req(stream));assert.equal(r.status,408);assert.equal(h.calls,0);assert.equal(canceled,true);
});
test('clock rollback and abort terminate the original request without revival',async()=>{
 const h=harness();const stream=new ReadableStream({pull(c){h.advance(-1,1);c.enqueue(bytes('{}'));}});
 assert.equal((await h.run(req(stream))).status,408);assert.equal(h.calls,0);
 const abort=new AbortController();abort.abort();assert.equal((await h.run(req('{}',{signal:abort.signal}))).status,408);assert.equal(h.calls,0);
});
test('late or failed protected work is invoked once and produces uncertain outcome without error detail',async()=>{
 const h=harness(async()=>{h.advance(5001);throw Error('SECRET owner, token and database details');});
 const r=await h.run(req('{}'));assert.equal(r.status,503);const b=await r.json();
 assert.equal(b.code,'request_outcome_unknown');assert.equal(b.automaticRetry,false);assert.equal(b.automaticReconnect,false);
 assert.equal(h.calls,1);assert.ok(!JSON.stringify(b).includes('SECRET'));
});
test('response bodies are bounded within the same budget and SSE is not accepted by JSON-only boundary',async()=>{
 for(const make of [()=>new Response('x'.repeat(32769),{headers:{'Content-Type':'application/json'}}),()=>new Response('data: secret',{headers:{'Content-Type':'text/event-stream'}})]){
  const h=harness(make),r=await h.run(req('{}'));assert.equal(r.status,503);assert.equal((await r.json()).code,'request_outcome_unknown');assert.equal(h.calls,1);
 }
});
test('original lease preserves elapsed time across awaits and closes permanently',async()=>{
 required();let wall=Date.now(),mono=10;
 const lease=createLease({now:()=>wall,monotonic:()=>mono}),control=readLease(lease);
 mono=4010;assert.equal(control.check().remaining,1000);assert.equal(control.check().notAfter,wall+5000);
 control.close();assert.throws(()=>control.check());wall+=100;mono+=100;assert.throws(()=>control.check());
 assert.equal(readLease(Object.freeze({notAfter:wall+5000})),null);
});
async function use(run){
 const f=capsulePreparationFixture(createAgentCapsulePreparation);
 try{required();const started=Date.now();f.started=started;
  f.current={auth:{userId:authority.subject,clientId:authority.clientId,audience:authority.resource,scope:['afw:capsule:prepare'],expiresAt:Math.floor(started/1000)+120},props:{applicationGrantId:authority.grantId,userId:authority.subject,projectId:authority.projectId}};
  f.env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(started+120000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:authority.projectId,AFW_OAUTH_PILOT_CLIENT_ID:authority.clientId,ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'synthetic-aud',DB:f.db,OAUTH_KV:{},DELEGATED_RATE_LIMITER:{async limit(){await f.afterLimit?.();return {success:true};}}};
  f.lease=createLease({now:()=>started+f.wallOffset,monotonic:()=>f.mono});
  f.host=()=>createDelegatedCapsulePreparationOAuthHost({env:f.env,resource:authority.resource,getVerifiedContext:()=>f.current,requestLease:f.lease,now:()=>started+f.wallOffset,monotonic:()=>f.mono});
  await run(f);
 }finally{f.close();}
}
test('OAuth bridge rejects client-made leases and preserves default-off no-touch behavior',()=>use(async f=>{
 assert.throws(()=>createDelegatedCapsulePreparationOAuthHost({env:f.env,resource:authority.resource,getVerifiedContext:()=>f.current,requestLease:Object.freeze({notAfter:f.started+5000})}),{message:'Preparation host unavailable'});
 assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('body/auth elapsed time cannot grant a new five-second storage lease',()=>use(async f=>{
 f.mono=4000;const host=f.host();f.afterLimit=()=>{f.mono=5100;};
 assert.equal((await host.prepare(input)).code,'unavailable');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('closed original HTTP lease prevents later use of a captured preparation host',()=>use(async f=>{
 const host=f.host();readLease(f.lease).close();assert.equal((await host.prepare(input)).code,'unavailable');assert.equal(f.reads,0);assert.equal(f.writes,0);
}));
test('remaining original budget reaches actual domain cutoff and success still prepares only once',()=>use(async f=>{
 f.mono=4000;const host=f.host(),r=await host.prepare(input);assert.equal(r.code,'prepared');
 const row=f.sql.prepare('SELECT not_after AS cutoff FROM agent_capsule_preparations').get();
 assert.ok(row);assert.ok(Date.parse(row.cutoff)<=f.started+1000,'domain cutoff must retain original monotonic remainder');
 assert.equal((await host.reconcile(input)).code,'prepared');assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
}));
