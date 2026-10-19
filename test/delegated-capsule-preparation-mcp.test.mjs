import test from 'node:test';
import assert from 'node:assert/strict';
import {McpServer} from '@modelcontextprotocol/server';
import {Client,InMemoryTransport} from '@modelcontextprotocol/client';
import {createAgentCapsulePreparation} from '../lib/agent-capsule-preparation.mjs';
import {createDelegatedCapsulePreparationOAuthHost} from '../lib/delegated-capsule-preparation-oauth.mjs';
import {capsulePreparationFixture,input,authority} from './fixtures/agent-capsule-preparation.mjs';
let register;
try{({registerDelegatedCapsulePreparation:register}=await import('../lib/delegated-capsule-preparation-mcp.mjs'));}
catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
const names=['prepare_capsule_draft','reconcile_capsule_preparation'];
const result=(code,fields={})=>({contract:input.contract,code,...fields,executionAllowed:false,chargeAllowed:false,publicationAllowed:false});
const prepared=()=>result('prepared',{replayed:false,preparation:{capsuleRef:'11111111-1111-4111-8111-111111111111',version:1,manifestSha256:'a'.repeat(64),sourceRevision:1}});
const fake=(prepare=async()=>prepared(),reconcile=async()=>({...prepared(),replayed:true}))=>Object.freeze({prepare,reconcile});
const call=(client,index=0,args=input)=>client.callTool({name:names[index],arguments:args});
function requireRegistrar(){assert.equal(typeof register,'function','missing closed preparation MCP registrar');}
async function protocol(host,run,options={}){
 requireRegistrar();const server=new McpServer({name:'afw-ci-preparation',version:'1.0.0'});
 const active=register(server,{enabled:true,host,...options});
 const client=new Client({name:'afw-ci-consumer',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
 const [ct,st]=InMemoryTransport.createLinkedPair();
 try{await server.connect(st);await client.connect(ct);await run({server,client,active});}
 finally{await client.close();await server.close();}
}
async function use(run){
 const f=capsulePreparationFixture(createAgentCapsulePreparation);
 try{
  const now=Date.now();f.current={auth:{userId:authority.subject,clientId:authority.clientId,audience:authority.resource,scope:['afw:capsule:prepare'],expiresAt:Math.floor(now/1000)+120},
   props:{applicationGrantId:authority.grantId,userId:authority.subject,projectId:authority.projectId}};
  f.env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(now+120000).toISOString(),
   AFW_OAUTH_PILOT_PROJECT_ID:authority.projectId,AFW_OAUTH_PILOT_CLIENT_ID:authority.clientId,ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'synthetic-aud',
   DB:f.db,OAUTH_KV:{},DELEGATED_RATE_LIMITER:{limit:async()=>({success:true})}};
  f.make=()=>createDelegatedCapsulePreparationOAuthHost({env:f.env,resource:authority.resource,getVerifiedContext:()=>f.current});
  f.host=f.make();await run(f);
 }finally{f.close();}
}
test('MCP preparation registration is absent without exact trusted opt-in and never reads a disabled host',()=>{
 requireRegistrar();let touches=0;const options={get host(){touches++;throw Error('SECRET');}};
 for(const enabled of [undefined,false,'true',1]){options.enabled=enabled;assert.equal(register(null,options),false);}
 assert.equal(touches,0);
});
test('opted-in registrar rejects mutable, missing or accessor host methods without leaking context',()=>{
 requireRegistrar();const server=new McpServer({name:'afw-invalid-host',version:'1'});
 for(const host of [null,{}, {prepare(){},reconcile(){}},Object.freeze({prepare(){}}),Object.freeze({get prepare(){throw Error('SECRET');},reconcile(){}})]){
  assert.throws(()=>register(server,{enabled:true,host}),{message:'Private capsule preparation unavailable'});
 }
});
test('actual MCP client sees strict schemas, correct write/read hints and a separate future scope',async()=>{
 await protocol(fake(),async({client,active})=>{
  assert.equal(active,true);const listed=(await client.listTools()).tools;
  assert.deepEqual(listed.map(x=>x.name).sort(),[...names].sort());
  for(const tool of listed){
   assert.equal(tool.inputSchema.additionalProperties,false);assert.deepEqual([...tool.inputSchema.required].sort(),['contract','expectedRevision','idempotencyKey']);
   assert.equal(tool.outputSchema.type,'object');assert.equal(tool.outputSchema.additionalProperties,false);
   assert.equal(tool.annotations.readOnlyHint,tool.name===names[1]);assert.equal(tool.annotations.destructiveHint,false);assert.equal(tool.annotations.idempotentHint,true);assert.equal(tool.annotations.openWorldHint,false);
   assert.deepEqual(tool._meta.securitySchemes,[{type:'oauth2',scopes:['afw:capsule:prepare']}]);
  }
 });
});
test('strict MCP arguments are rejected before any host call',async()=>{
 let invokes=0;const host=fake(async()=>{invokes++;return prepared();});
 await protocol(host,async({client})=>{
  for(const args of [{...input,projectId:'other'},{...input,expectedRevision:0},{...input,idempotencyKey:'short'},{...input,publicationAllowed:true},{...input,contract:'other'}]){
   assert.equal((await call(client,0,args)).isError,true);
  }assert.equal(invokes,0);
 });
});
test('actual client, OAuth bridge and SQLite domain prepare and reconcile one authorized capsule',()=>use(async f=>{
 await protocol(f.host,async({client})=>{
  const first=await call(client),again=await call(client),found=await call(client,1);
  for(const r of [first,again,found]){
   assert.notEqual(r.isError,true);assert.equal(r.structuredContent.code,'prepared');assert.equal(r.structuredContent.recovery.action,'review_capsule');
   assert.equal(r.structuredContent.publicationAllowed,false);assert.equal(r.structuredContent.executionAllowed,false);assert.equal(r.structuredContent.chargeAllowed,false);
   assert.deepEqual(JSON.parse(r.content[0].text),r.structuredContent);
   assert.ok(!JSON.stringify(r).includes('owner-a'));assert.ok(!JSON.stringify(r).includes(input.idempotencyKey));
  }
  assert.equal(first.structuredContent.replayed,false);assert.equal(again.structuredContent.replayed,true);assert.equal(found.structuredContent.replayed,true);
  assert.deepEqual(found.structuredContent.preparation,first.structuredContent.preparation);
  assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
 });
}));
test('read-only OAuth scope never becomes preparation or a forced reconnect challenge',()=>use(async f=>{
 f.current.auth.scope=['afw:project:read'];f.host=f.make();
 await protocol(f.host,async({client})=>{
  const r=await call(client);assert.equal(r.isError,true);assert.equal(r.structuredContent.code,'insufficient_scope');assert.equal(r.structuredContent.preparation,null);
  assert.equal(r.structuredContent.recovery.action,'review_permission');assert.equal(r.structuredContent.recovery.automaticReconnect,false);assert.equal(r._meta,undefined);
  assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
 });
}));
test('grant withdrawal blocks following MCP reconciliation without exposing a previous reference',()=>use(async f=>{
 await protocol(f.host,async({client})=>{
  assert.equal((await call(client)).structuredContent.code,'prepared');
  f.sql.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='grant-a'").run(new Date().toISOString());
  const r=await call(client,1);assert.equal(r.isError,true);assert.equal(r.structuredContent.code,'delegated_access_denied');assert.equal(r.structuredContent.preparation,null);assert.equal(r._meta,undefined);
  assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
 });
}));
test('lost commit ACK leads to read reconciliation with the same request, never automatic regeneration',()=>use(async f=>{
 f.afterBatch=()=>{throw Error('SECRET lost receipt');};
 await protocol(f.host,async({client})=>{
  const first=await call(client);assert.equal(first.isError,true);assert.equal(first.structuredContent.code,'unknown_ack');assert.equal(first.structuredContent.preparation,null);
  assert.equal(first.structuredContent.recovery.action,'check_preparation');assert.equal(first.structuredContent.recovery.nextTool,names[1]);
  assert.equal(first.structuredContent.recovery.automaticRetry,false);assert.equal(first.structuredContent.recovery.reuseOriginalRequest,true);
  assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});assert.equal(f.batches,1);
  f.afterBatch=null;const found=await call(client,1);assert.equal(found.structuredContent.code,'prepared');assert.equal(found.structuredContent.replayed,true);
  assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});assert.equal(f.batches,1);
 });
}));
test('host exceptions are sanitized, one call only, and preparation uncertainty is preserved',async()=>{
 let invokes=0;const throws=async()=>{invokes++;throw Error('SECRET raw context');};
 await protocol(fake(throws,throws),async({client})=>{
  const r=await call(client);assert.equal(r.structuredContent.code,'unknown_ack');assert.equal(invokes,1);assert.ok(!JSON.stringify(r).includes('SECRET'));
  const read=await call(client,1);assert.equal(read.structuredContent.code,'unavailable');assert.equal(invokes,2);assert.equal(read.structuredContent.recovery.automaticRetry,false);
 });
});
test('malformed or authority-expanding preparation output is discarded without reading getters',async()=>{
 let touched=0;const getter=prepared();Object.defineProperty(getter,'preparation',{get(){touched++;throw Error('SECRET');}});
 const bad=[{...prepared(),privateData:'SECRET'},{...prepared(),executionAllowed:true},{...prepared(),code:'made_up'},{...prepared(),preparation:{...prepared().preparation,sourceRevision:2}},{...prepared(),preparation:{...prepared().preparation,capsuleRef:'cfast_SECRET'}},{...prepared(),preparation:{...prepared().preparation,manifestSha256:'not-a-hash'}},getter];
 for(const value of bad)await protocol(fake(async()=>value),async({client})=>{
  const r=await call(client);assert.equal(r.isError,true);assert.equal(r.structuredContent.code,'unknown_ack');assert.equal(r.structuredContent.preparation,null);
  assert.equal(r.structuredContent.executionAllowed,false);assert.ok(!JSON.stringify(r).includes('SECRET'));
 });
 assert.equal(touched,0);
});
test('reconciliation cannot advertise a new write or an unknown write acknowledgement',async()=>{
 for(const value of [prepared(),result('unknown_ack'),{...result('unavailable'),preparation:prepared().preparation}]){
  await protocol(fake(undefined,async()=>value),async({client})=>{const r=await call(client,1);assert.equal(r.structuredContent.code,'unavailable');assert.equal(r.structuredContent.preparation,null);});
 }
});
test('domain failures keep bounded static recovery and never auto-renew, overwrite or change request keys',async()=>{
 for(const [code,action] of [['revision_conflict','review_request'],['idempotency_conflict','review_request'],['preparation_conflict','review_request'],['preparation_not_found','review_request'],['domain_unverified','review_domain'],['capsule_expired','review_capsule'],['invalid_source','review_request'],['preparation_pending','check_preparation'],['rate_limited','check_preparation']]){
  await protocol(fake(async()=>result(code)),async({client})=>{
   const r=await call(client);assert.equal(r.structuredContent.code,code);assert.equal(r.structuredContent.recovery.action,action);
   assert.equal(r.structuredContent.recovery.automaticRetry,false);assert.equal(r.structuredContent.recovery.automaticReconnect,false);assert.equal(r.structuredContent.preparation,null);
   assert.equal(r._meta,undefined);assert.deepEqual(JSON.parse(r.content[0].text),r.structuredContent);
  });
 }
});
test('partial registration failure removes only its own handles and leaves captured callbacks inactive',async()=>{
 requireRegistrar();let invokes=0,removed=0,callback;
 const host=fake(async()=>{invokes++;return prepared();});
 const server={registerTool(_name,_config,fn){if(callback)throw Error('SECRET duplicate');callback=fn;return {remove(){removed++;}};}};
 assert.throws(()=>register(server,{enabled:true,host}),{message:'Private capsule preparation unavailable'});
 assert.equal(removed,1);const r=await callback(input);assert.equal(r.structuredContent.code,'unavailable');assert.equal(invokes,0);assert.ok(!JSON.stringify(r).includes('SECRET'));
});
test('unknown reconciliation output is not treated as permission to write and performs no prepare call',async()=>{
 let writes=0,reads=0;await protocol(fake(async()=>{writes++;return prepared();},async()=>{reads++;return result('preparation_not_found');}),async({client})=>{
  const r=await call(client,1);assert.equal(r.structuredContent.code,'preparation_not_found');assert.equal(r.structuredContent.recovery.action,'review_request');
  assert.equal(writes,0);assert.equal(reads,1);
 });
});
