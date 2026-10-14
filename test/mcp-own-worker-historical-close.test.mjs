import test from 'node:test';
import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
globalThis.__AFW_NODE_PROGRAM__='synthetic API fixture, not executed';globalThis.__AFW_NODE_SOURCE_REVISION__='c'.repeat(40);
const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class DurableObject {constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint {constructor(ctx,env){this.ctx=ctx;this.env=env;}}',shortCircuit:true}:next(s,c);}});
const {AfwOwnEventNode}=await import('../worker/mcp-own/index.mjs');hook.deregister();delete globalThis.__AFW_NODE_PROGRAM__;delete globalThis.__AFW_NODE_SOURCE_REVISION__;
for(const mode of ['expired','disabled'])test('private historical close still stops original process when '+mode,async()=>{
 const f=fixture(),originalNow=Date.now;try{f.grant();const policy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:f.config.context.resource,containerId:f.config.ctx.id.toString(),...f.config.window},env={AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy),AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:policy.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,AFW_DOSSIER_EVENTS_CUSTODY_KEY:f.config.custodyKey.toString('base64'),DB:f.config.db,AFW_DOSSIER_EVENTS_NODE:{idFromName:()=>({toString:()=> 'b'.repeat(64)}),idFromString:id=>({toString:()=>id}),get(){throw Error('not used');}}};let actor;f.config.ctx.exports={AfwNodeControl:({props})=>({fetch:request=>actor.consume(request,props)})};actor=new AfwOwnEventNode(f.config.ctx,env);const projectRef=await actor.list();await actor.subscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}});assert.equal(f.boots(),1);if(mode==='expired')Date.now=()=>policy.expiresAt+1;else env.AFW_DOSSIER_EVENTS_ENABLED='false';await assert.rejects(actor.list());const result=await actor.close();assert.equal(result.closed,true);assert.equal(result.runtimeStopRequested,true);assert.equal(f.config.ctx.container.running,false);assert.equal(f.boots(),1);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);}finally{Date.now=originalNow;f.close();}
});

// The retired reader must survive removal of the live event policy, and must
// read the ORIGINAL source rather than the newer Worker bundle's revision.
test('private original retirement RPC remains read-only after live policy removal',async()=>{
 const f=fixture();try{
  f.grant();const policy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:f.config.context.resource,containerId:f.config.ctx.id.toString(),...f.config.window};
  const env={AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy),AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:policy.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,AFW_DOSSIER_EVENTS_CUSTODY_KEY:f.config.custodyKey.toString('base64'),DB:f.config.db,AFW_DOSSIER_EVENTS_NODE:{idFromName:()=>({toString:()=> 'b'.repeat(64)}),idFromString:id=>({toString:()=>id}),get(){throw Error('not used');}}};
  let actor;f.config.ctx.exports={AfwNodeControl:({props})=>({fetch:request=>actor.consume(request,props)})};actor=new AfwOwnEventNode(f.config.ctx,env);
  const projectRef=await actor.list();await actor.subscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}});await actor.close();
  const t=Date.now();f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date(t).toISOString(),'g');
  f.db.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run('g','p','owner','client',policy.resource,1,'revoke','afw.dossier-monitoring.v1','22222222-2222-4222-8222-222222222222',t,t);
  env.AFW_DOSSIER_EVENTS_ENABLED='false';delete env.AFW_DOSSIER_EVENTS_POLICY;
  assert.equal(typeof actor.observeRetired,'function');await assert.rejects(actor.observeRetired());
  const {createHash}=await import('node:crypto');env.AFW_DOSSIER_RETIREMENT_READ_ENABLED='true';env.AFW_DOSSIER_RETIREMENT_POLICY=JSON.stringify({...policy,programHash:createHash('sha256').update(f.config.program).digest('hex'),sourceRevision:f.config.sourceRevision});
  const before=JSON.stringify(f.rows());const result=await actor.observeRetired();assert.equal(result.purpose,'afw.node-retirement-observation.v1');assert.equal(result.mayStartSuccessor,false);assert.equal(result.physicalStopVerified,false);assert.equal(JSON.stringify(f.rows()),before);assert.equal(f.boots(),1);
  await assert.rejects(actor.observeRetired({containerId:'b'.repeat(64)}));
  const primary=env.DB;let drifted=false;env.DB={prepare(sql){const statement=primary.prepare(sql);return{bind(...args){const bound=statement.bind(...args);return{...bound,async first(){const value=await bound.first();if(!drifted){drifted=true;env.AFW_DOSSIER_RETIREMENT_READ_ENABLED='false';}return value;}};}};}};
  await assert.rejects(actor.observeRetired());assert.equal(drifted,true);env.DB=primary;env.AFW_DOSSIER_RETIREMENT_READ_ENABLED='true';assert.equal(JSON.stringify(f.rows()),before);
  env.AFW_DOSSIER_RETIREMENT_POLICY=env.AFW_DOSSIER_RETIREMENT_POLICY.replace(f.config.sourceRevision,'d'.repeat(40));await assert.rejects(actor.observeRetired());assert.equal(f.boots(),1);
 }finally{f.close();}
});
