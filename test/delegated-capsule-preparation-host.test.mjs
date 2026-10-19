import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createAgentCapsulePreparation} from '../lib/agent-capsule-preparation.mjs';
import {capsulePreparationFixture,input,authority} from './fixtures/agent-capsule-preparation.mjs';
let createHost,checkSchema,sourceSql;
try{({createDelegatedCapsulePreparationHost:createHost}=await import('../lib/delegated-capsule-preparation-host.mjs'));}
catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
try{({checkAgentCapsulePreparationSchema:checkSchema,agentCapsulePreparationSchemaSql:sourceSql}=await import('../lib/agent-capsule-preparation-schema.mjs'));}
catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
function schema(f){assert.equal(typeof checkSchema,'function','missing closed preparation schema gate');return checkSchema({createPrimarySession:()=>f.db.withSession('first-primary')});}
async function use(run){const f=capsulePreparationFixture(createAgentCapsulePreparation);try{await run(f);}finally{f.close();}}
function hostFixture(f){
 assert.equal(typeof createHost,'function','missing closed preparation host');
 const started=Date.now();f.limitCalls=[];f.authCalls=0;
 f.auth={context:{grantId:authority.grantId,subject:authority.subject,clientId:authority.clientId,resource:authority.resource,scopes:['afw:capsule:prepare']},projectId:authority.projectId,tokenExpiresAt:started+120000};
 f.env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(started+120000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:authority.projectId,AFW_OAUTH_PILOT_CLIENT_ID:authority.clientId,
  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'synthetic-audience',DB:f.db,OAUTH_KV:{},
  DELEGATED_RATE_LIMITER:{async limit(value){f.limitCalls.push(value);await f.afterLimit?.();return f.limitResult??{success:true};}}};
 f.makeHost=()=>createHost({env:f.env,resource:authority.resource,resolveAuthorization:async()=>{f.authCalls++;await f.beforeAuth?.();return f.auth;},now:()=>Date.now()+f.wallOffset,monotonic:()=>f.mono});
 f.host=f.makeHost();return f;
}
test('schema gate validates actual constraints without reading owner data or writing',()=>use(async f=>{
 const before=f.counts(),ready=await schema(f);assert.equal(ready.ready,true);assert.deepEqual(f.counts(),before);assert.equal(f.writes,0);assert.equal(f.batches,0);assert.ok(f.sessionModes.every(x=>x==='first-primary'));
 assert.equal(typeof sourceSql,'function');assert.equal(sourceSql(),readFileSync('db/agent-capsule-preparations.sql','utf8'));
}));
test('schema gate rejects absent, weakened or additional history triggers',async()=>{
 for(const mutation of [
 "DROP TRIGGER agent_capsule_preparations_no_delete",
 "DROP TRIGGER agent_capsule_preparations_immutable;CREATE TRIGGER agent_capsule_preparations_immutable BEFORE UPDATE ON agent_capsule_preparations BEGIN SELECT 1;END;",
 "CREATE TRIGGER unexpected_history_trigger AFTER INSERT ON agent_capsule_preparations BEGIN SELECT 1;END;"
 ])await use(async f=>{f.sql.exec(mutation);assert.equal((await schema(f)).ready,false);assert.equal(f.writes,0);});
});
test('schema gate compiles actual existing writer columns and fails closed if one is missing',()=>use(async f=>{
 f.sql.exec('ALTER TABLE publication_capsules RENAME COLUMN mode TO unexpected_mode');
 assert.equal((await schema(f)).ready,false);assert.equal(f.writes,0);assert.equal(f.batches,0);
}));
test('schema gate sanitizes storage failures and checks its guard across each await',()=>use(async f=>{
 assert.equal(typeof checkSchema,'function');let checks=0;
 const r=await checkSchema({createPrimarySession:()=>f.db.withSession('first-primary'),assertCurrent:()=>{if(++checks===2)throw Error('SECRET context');}});
 assert.equal(r.ready,false);assert.ok(!JSON.stringify(r).includes('SECRET'));assert.equal(f.writes,0);
}));
test('preparation host is absent by default without accessing clocks, authorization or bindings',()=>{
 assert.equal(typeof createHost,'function','missing closed preparation host');let touched=0;const boom=()=>{touched++;throw Error('unexpected');};
 for(const value of [undefined,false,true,'false',1])assert.equal(createHost({env:{AFW_DELEGATED_PREPARATION_ENABLED:value},now:boom,resolveAuthorization:boom}),null);
 assert.equal(touched,0);
});
test('finite host rejects malformed, expired and overlong server windows',()=>use(async f=>{
 hostFixture(f);
 for(const value of ['bad','2000-01-01T00:00:00.000Z',new Date(Date.now()+700000).toISOString()]){
  f.env.AFW_OAUTH_PILOT_EXPIRES_AT=value;assert.throws(()=>f.makeHost());}
 assert.equal(f.authCalls,0);assert.equal(f.reads,0);
}));
test('host validates strict arguments before authorization, limiter or DB',()=>use(async f=>{
 hostFixture(f);const r=await f.host.prepare({...input,subject:'other'});assert.equal(r.code,'invalid_request');assert.equal(f.authCalls,0);assert.equal(f.limitCalls.length,0);assert.equal(f.reads,0);
}));
test('token scope, explicit verified expiry and server project/client/resource pins are mandatory',async()=>{
 const changes=[
  f=>{f.auth.context.scopes=['afw:project:read'];},
  f=>{delete f.auth.tokenExpiresAt;},f=>{f.auth.tokenExpiresAt=Date.now()-1;},
  f=>{f.auth.projectId='other';},f=>{f.auth.context.clientId='other';},f=>{f.auth.context.resource='https://other.invalid/mcp';}
 ];
 for(const change of changes)await use(async f=>{hostFixture(f);change(f);assert.notEqual((await f.host.prepare(input)).code,'prepared');assert.equal(f.limitCalls.length,0);assert.equal(f.reads,0);assert.equal(f.writes,0);});
});
test('rate limiter denial happens before schema or dossier reads and does not echo a key',()=>use(async f=>{
 hostFixture(f);f.limitResult={success:false};const r=await f.host.prepare(input);assert.equal(r.code,'rate_limited');assert.equal(f.reads,0);assert.equal(f.writes,0);assert.ok(!JSON.stringify(r).includes('owner-a'));
}));
test('host refuses preparation when history constraints are not ready',()=>use(async f=>{
 hostFixture(f);f.sql.exec('DROP TRIGGER agent_capsule_preparations_no_delete');assert.equal((await f.host.prepare(input)).code,'unavailable');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('valid finite host uses the actual domain service; replay and reconcile never duplicate work',()=>use(async f=>{
 hostFixture(f);const r=await f.host.prepare(input);assert.equal(r.code,'prepared');assert.equal(r.replayed,false);
 const found=await f.host.reconcile(input);assert.equal(found.code,'prepared');assert.deepEqual(found.preparation,r.preparation);
 assert.equal((await f.host.prepare(input)).replayed,true);assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
 assert.equal(f.limitCalls.length,3);assert.equal(new Set(f.limitCalls.map(x=>x.key)).size,1);assert.ok(f.limitCalls.every(x=>!x.key.includes('owner-a')&&/^afw-capsule:[a-f0-9]{64}$/.test(x.key)));
}));
test('configuration and binding-method drift across limiter/schema awaits prevents reservation',async()=>{
 for(const change of [f=>{f.env.AFW_DELEGATED_PREPARATION_ENABLED='false';},f=>{f.db.withSession=()=>{throw Error('changed');};},f=>{f.env.DELEGATED_RATE_LIMITER.limit=async()=>({success:true});}]){
  await use(async f=>{hostFixture(f);f.afterLimit=()=>change(f);assert.equal((await f.host.prepare(input)).code,'unavailable');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});});}
});
test('mutation of the request-owned authorization snapshot across awaits is rejected',()=>use(async f=>{
 hostFixture(f);f.afterLimit=()=>{f.auth.context.scopes.length=0;};const r=await f.host.prepare(input);assert.notEqual(r.code,'prepared');assert.equal(f.writes,0);
}));
test('verified token expiry during schema awaits prevents the first write',()=>use(async f=>{
 hostFixture(f);f.auth.tokenExpiresAt=Date.now()+1000;let changed=false;
 f.after=async(q,op)=>{if(!changed&&op==='all'){changed=true;f.wallOffset=1500;}};
 assert.notEqual((await f.host.prepare(input)).code,'prepared');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('preflight time cannot renew the SQL reservation lease beyond the original request budget',()=>use(async f=>{
 hostFixture(f);let changed=false;f.after=async(q,op)=>{if(!changed&&op==='all'){changed=true;f.mono=4000;}};
 const r=await f.host.prepare(input);assert.equal(r.code,'prepared');const row=f.sql.prepare('SELECT reserved_at,expires_at FROM agent_capsule_preparations').get();assert.ok(row.expires_at-row.reserved_at<=1100,'SQL lease must receive only the original remaining budget');
}));
test('timed-out preflight is unavailable without invoking the writing service',()=>use(async f=>{
 hostFixture(f);f.afterLimit=()=>{f.mono=5001;};assert.equal((await f.host.prepare(input)).code,'unavailable');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('closing the host after an acknowledged reservation yields unknown ACK and no regeneration',()=>use(async f=>{
 hostFixture(f);f.after=async(q,op)=>{if(op==='run'&&q.includes('INSERT INTO agent_capsule_preparations'))f.env.AFW_DELEGATED_PREPARATION_ENABLED='false';};
 const r=await f.host.prepare(input);assert.equal(r.code,'unknown_ack');assert.deepEqual(f.counts(),{intents:1,capsules:0,events:0});
 const expires=f.sql.prepare('SELECT expires_at FROM agent_capsule_preparations').get().expires_at;
 f.after=null;f.env.AFW_DELEGATED_PREPARATION_ENABLED='true';const next=f.makeHost();assert.equal((await next.reconcile(input)).code,'preparation_pending');assert.equal(f.sql.prepare('SELECT expires_at FROM agent_capsule_preparations').get().expires_at,expires);assert.equal(f.batches,0);
}));
test('schema readiness is rechecked per call, never cached as permanent authorization',()=>use(async f=>{
 hostFixture(f);assert.equal((await f.host.prepare(input)).code,'prepared');f.sql.exec('DROP TRIGGER agent_capsule_preparations_no_delete');
 assert.equal((await f.host.reconcile(input)).code,'unavailable');assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
}));
test('domain receives a trusted absolute notAfter and cannot extend it to a new five-second lease',()=>use(async f=>{
 const until=Date.now()+1500;
 const service=createAgentCapsulePreparation({enabled:true,notAfter:until,createPrimarySession:()=>f.db.withSession('first-primary'),resolveAuthority:async()=>authority});
 const r=await service.prepare(input);assert.equal(r.code,'prepared');assert.equal(f.sql.prepare('SELECT expires_at FROM agent_capsule_preparations').get().expires_at,until);
}));
