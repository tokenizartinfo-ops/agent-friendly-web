import assert from 'node:assert/strict';
import test from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { registerHooks } from 'node:module';
import { Client,StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { localOAuthFixture,authorize,approve,exchange,handle,cookies } from './fixtures/delegated-oauth-runtime.mjs';

// Only the provider's WorkerEntrypoint base is shimmed. Real protocol,
// cryptography and SQL run in process; this is not a workerd/remote receipt.
const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');
hook.deregister();

async function fixture(t) {
  const f=await localOAuthFixture(createDelegatedOAuthWorker),clients=[],replicas=[];
  t.after(async()=>{for(const c of clients)await c.close();for(const db of replicas)db.close();f.close();});
  const a=await authorize(f,{scope:'afw:project:read'});
  assert.equal(a.response.status,200);
  const approval=await approve(f,a,{scope:['afw:project:read']});
  assert.equal(approval.status,302);
  const response=await exchange(f,approval.headers.get('Location'),a.verifier);
  assert.equal(response.status,200);
  f.token=(await response.json()).access_token;
  f.start=Date.now();f.deadline=f.start+120000;f.setTime(new Date(f.start).toISOString());
  Object.assign(f.env,{AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(f.deadline).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:'p-a',AFW_DELEGATED_CONTINUITY_ENABLED:'true'});
  f.clientFor=async(token=f.token)=>{
    const c=new Client({name:'afw-continuity-http-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
    clients.push(c);
    await c.connect(new StreamableHTTPClientTransport(new URL(f.resource),{
      requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(f.issuer).host}},
      fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx),
    }));
    return c;
  };
  f.rpc=()=>f.worker.fetch(new Request(f.resource,{method:'POST',headers:{Authorization:'Bearer '+f.token,Host:new URL(f.issuer).host,'Content-Type':'application/json',Accept:'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'afw-test',version:'1'}}})}),f.env,f.ctx);
  // Native SQLite replicas model D1's documented first-query constraint.
  // A reused session deliberately serves its second query from an old copy.
  // The admission's result, rather than a factory call count, proves freshness.
  f.routing=({beforeAdmission,afterAdmission,afterProject}={})=>{
    const initial=f.env.DB,admissions=[],sessions=[];
    function snapshot() {
      const db=new DatabaseSync(':memory:');replicas.push(db);
      for(const table of ['site_projects','copilot_working_drafts','delegated_access_grants']){
        db.exec(f.sqlite.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name=?").get(table).sql);
        for(const row of f.sqlite.prepare('SELECT * FROM '+table).all()){
          const keys=Object.keys(row);
          db.prepare('INSERT INTO '+table+' ('+keys.join(',')+') VALUES ('+keys.map(()=>'?').join(',')+')').run(...Object.values(row));
        }
      }
      return db;
    }
    const raw={prepare:sql=>initial.prepare(sql),withSession(mode){
      const replica=snapshot();let queries=0;sessions.push(mode);
      return {prepare(sql){return {bind(...args){return {async first(){
        const primary=mode==='first-primary'&&queries++===0,db=primary?f.sqlite:replica;
        const admission=/JOIN delegated_access_grants g/.test(sql);
        if(admission){admissions.push(primary);await beforeAdmission?.();}
        const row=db.prepare(sql).get(...args)??null;
        if(admission)await afterAdmission?.();
        else if(/FROM site_projects p LEFT JOIN/.test(sql))await afterProject?.();
        return row;
      }};}};}};
    }};
    f.env.DB=raw;return {raw,admissions,sessions};
  };
  return f;
}
async function requireTool(c){
  const list=await c.listTools();
  assert.ok(list.tools.some(x=>x.name==='read_project_next_step'),'authorized finite host exposes continuity');
}
const read=c=>c.callTool({name:'read_project_next_step',arguments:{expectedRevision:1}});

test('OAuth HTTP returns closed continuity with summary-only consent and a fresh primary admission',async t=>{
  const f=await fixture(t),routing=f.routing(),c=await f.clientFor();
  await requireTool(c);
  const grant=f.sqlite.prepare('SELECT * FROM delegated_access_grants').get();
  const changes=f.sqlite.prepare('SELECT total_changes() AS n').get().n;
  const r=await read(c);assert.equal(r.structuredContent.status,200);
  const d=r.structuredContent.data;assert.equal(d.projectRef,'p-a');assert.equal(d.revision,1);
  assert.equal(d.nextStep.kind,'provide_information');assert.deepEqual(d.evidenceRefs,[]);assert.equal(d.capsuleRef,null);
  assert.ok(routing.admissions.length>0);assert.ok(routing.admissions.every(Boolean));
  assert.equal(f.sqlite.prepare('SELECT total_changes() AS n').get().n,changes);
  assert.deepEqual(f.sqlite.prepare('SELECT * FROM delegated_access_grants').get(),grant);
  const wire=JSON.stringify(r);assert.ok(!wire.includes('owner-a'));assert.ok(!wire.includes(f.token));
  assert.ok(!wire.includes('afw:evidence:read'));
});
for(const value of [undefined,'false',true,'TRUE','1']){
  test('OAuth HTTP keeps its existing two tools without exact continuity opt-in: '+String(value),async t=>{
    const f=await fixture(t);f.env.AFW_DELEGATED_CONTINUITY_ENABLED=value;
    const c=await f.clientFor();
    assert.deepEqual((await c.listTools()).tools.map(x=>x.name).sort(),['read_project_summary','read_saved_evidence']);
  });
}
for(const scenario of ['missing-project','wrong-client','stable','long-window','noncanonical-time','no-primary']){
  test('OAuth HTTP rejects an opted-in host with '+scenario,async t=>{
    const f=await fixture(t);f.routing();
    if(scenario==='missing-project')delete f.env.AFW_OAUTH_PILOT_PROJECT_ID;
    if(scenario==='wrong-client')f.env.AFW_OAUTH_PILOT_CLIENT_ID='other-client';
    if(scenario==='stable'){f.env.AFW_OAUTH_SERVICE_MODE='stable';delete f.env.AFW_OAUTH_PILOT_EXPIRES_AT;}
    if(scenario==='long-window')f.env.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(f.start+600001).toISOString();
    if(scenario==='noncanonical-time')f.env.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(f.deadline).toISOString().replace('.000Z','Z')+' ';
    if(scenario==='no-primary')delete f.env.DB.withSession;
    assert.equal((await f.rpc()).status,503);
  });
}
for(const scenario of ['revoked','owner','revision']){
  test('OAuth HTTP admission rejects concurrent primary '+scenario,async t=>{
    const f=await fixture(t);
    const route=f.routing({beforeAdmission(){
      if(scenario==='revoked')f.sqlite.prepare('UPDATE delegated_access_grants SET revoked_at=?').run(new Date(f.start).toISOString());
      if(scenario==='owner')f.sqlite.prepare("UPDATE site_projects SET user_id='owner-b' WHERE id='p-a'").run();
      if(scenario==='revision')f.sqlite.prepare("UPDATE site_projects SET revision=2 WHERE id='p-a'").run();
    }});
    const c=await f.clientFor();await requireTool(c);const r=await read(c);
    assert.equal(r.structuredContent.status,scenario==='revision'?409:403);
    assert.equal(r.structuredContent.data,undefined);assert.ok(route.admissions.every(Boolean));
    assert.equal(r.structuredContent.recovery.automaticReconnect,false);
  });
}
for(const scenario of ['flag','deadline','project','client','db','kv','limiter','mode','time']){
  test('OAuth HTTP discards continuity after host '+scenario+' drifts during SQL',async t=>{
    const f=await fixture(t);
    f.routing({afterAdmission(){
      if(scenario==='flag')f.env.AFW_DELEGATED_CONTINUITY_ENABLED='false';
      if(scenario==='deadline')f.env.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(f.deadline+1).toISOString();
      if(scenario==='project')f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-b';
      if(scenario==='client')f.env.AFW_OAUTH_PILOT_CLIENT_ID='other-client';
      if(scenario==='db')f.env.DB={...f.env.DB};
      if(scenario==='kv')f.env.OAUTH_KV={...f.env.OAUTH_KV};
      if(scenario==='limiter')f.env.DELEGATED_RATE_LIMITER.limit=async()=>({success:true});
      if(scenario==='mode')f.env.AFW_OAUTH_SERVICE_MODE='stable';
      if(scenario==='time')f.setTime(new Date(f.deadline).toISOString());
    }});
    const c=await f.clientFor();await requireTool(c);const r=await read(c);
    assert.equal(r.structuredContent.status,503);assert.equal(r.structuredContent.data,undefined);
    assert.equal(r.structuredContent.recovery.action,'retry_read');assert.equal(r.structuredContent.recovery.automaticReconnect,false);
  });
}
test('OAuth HTTP caps continuity at the original host deadline and rejects caller deadline injection',async t=>{
  const f=await fixture(t);f.routing();const c=await f.clientFor();await requireTool(c);
  f.setTime(new Date(f.deadline-1000).toISOString());
  const r=await read(c);assert.equal(r.structuredContent.status,200);assert.equal(r.structuredContent.data.expiresAt,new Date(f.deadline).toISOString());
  const injected=await c.callTool({name:'read_project_next_step',arguments:{readUntil:f.deadline+600000}});
  assert.equal(injected.isError,true);
  f.setTime(new Date(f.deadline).toISOString());assert.equal((await f.rpc()).status,404);
});
test('OAuth HTTP retries only a read after primary failure using the same unmodified grant',async t=>{
  const f=await fixture(t);const {raw}=f.routing();const c=await f.clientFor();await requireTool(c);
  const grant=f.sqlite.prepare('SELECT * FROM delegated_access_grants').get(),original=raw.withSession;
  let queries=0,fail=true;raw.withSession=mode=>{if(fail&&++queries===2)throw Error('private storage diagnostic');return original(mode);};
  const unavailable=await read(c);assert.equal(unavailable.structuredContent.status,503);
  assert.equal(unavailable.structuredContent.recovery.action,'retry_read');assert.equal(unavailable.structuredContent.recovery.automaticReconnect,false);
  assert.ok(!JSON.stringify(unavailable).includes('private storage diagnostic'));
  fail=false;const recovered=await read(c);assert.equal(recovered.structuredContent.status,200);
  assert.deepEqual(f.sqlite.prepare('SELECT * FROM delegated_access_grants').get(),grant);
  assert.equal(f.sqlite.prepare('SELECT COUNT(*) AS n FROM delegated_access_grants').get().n,1);
});
test('OAuth HTTP rejects continuity after the actual human disconnect route with the original live token',async t=>{
  const f=await fixture(t);f.routing();const c=await f.clientFor();await requireTool(c);
  assert.equal((await read(c)).structuredContent.status,200);
  const grant=f.sqlite.prepare('SELECT id FROM delegated_access_grants').get().id;
  const raw=f.env.DB,session=raw.withSession;delete raw.withSession;
  const page=await f.request('/connections'),html=await page.text();
  const response=await f.request('/connections/revoke',{method:'POST',headers:{Origin:f.issuer,Cookie:cookies(page),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:handle(html),grant})});
  raw.withSession=session;
  assert.equal(response.status,303);assert.ok(f.sqlite.prepare('SELECT revoked_at FROM delegated_access_grants').get().revoked_at);
  const denied=await read(c);assert.equal(denied.structuredContent.status,403);assert.equal(denied.structuredContent.data,undefined);
});

for(const advanced of [3000,6000]){
  test('OAuth HTTP rejects backward clock movement after observing an intermediate advance of '+advanced+'ms',async t=>{
    const f=await fixture(t);
    f.routing({afterProject(){f.setTime(new Date(f.start+advanced).toISOString());},
      afterAdmission(){f.setTime(new Date(f.start+1000).toISOString());}});
    const c=await f.clientFor();await requireTool(c);
    const result=await read(c);
    assert.equal(result.structuredContent.status,503);
    assert.equal(result.structuredContent.data,undefined);
    assert.equal(result.structuredContent.recovery.action,'retry_read');
    assert.equal(result.structuredContent.recovery.automaticReconnect,false);
  });
}
