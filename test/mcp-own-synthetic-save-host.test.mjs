import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {syntheticSaveFixture} from './fixtures/mcp-own-synthetic-save.mjs';
import {createOwnSyntheticSaveHost} from '../lib/mcp-own-synthetic-save-host.mjs';
const issuer='https://delegated-canary.agentfriendlyweb.dev';
async function setup(prepared=false){
 const f=await syntheticSaveFixture({projectId:'oauth-canary-owner',resource:issuer+'/mcp',windowMs:prepared?180000:60000});let probes=0,hook=()=>{};
 const env={AFW_DOSSIER_OWN_SAVE_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DOSSIER_MONITORING_OWNER_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(f.config.window.expiresAt+10000).toISOString(),AFW_OAUTH_ISSUER:issuer,AFW_OAUTH_RESOURCE:issuer+'/mcp',AFW_OAUTH_PILOT_PROJECT_ID:'oauth-canary-owner',AFW_OAUTH_PILOT_CLIENT_ID:'client',ACCESS_TEAM_DOMAIN:'own.cloudflareaccess.com',ACCESS_AUD:'own',DB:f.options.db,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,
 AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:'g',subject:'owner',projectId:'oauth-canary-owner',clientId:'client',resource:issuer+'/mcp',containerId:'a'.repeat(64),...f.config.window}),
 AFW_DOSSIER_EVENTS_NODE:{idFromString:id=>({toString:()=>id}),get:()=>({async readReadiness(){const r=await f.host.readReadiness();hook(++probes);return r;},async observeSubscription(){const r=await f.host.observeSubscription();hook(++probes);return r;}})}};
 if(prepared){env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='true';env.AFW_DOSSIER_OWN_SAVE_KEY='11111111-1111-4111-8111-111111111111';env.AFW_DOSSIER_EVENTS_SCHEDULE=JSON.stringify({receipt:'original',eventId:createHash('sha256').update(JSON.stringify(['afw.own-synthetic-save.v1','owner','oauth-canary-owner',env.AFW_DOSSIER_OWN_SAVE_KEY])).digest('hex'),dispatchAt:Math.ceil(Date.now()/60000)*60000,closeAt:Math.ceil(f.config.window.expiresAt/60000)*60000});}
 const handler=createOwnSyntheticSaveHost({env,program:f.config.program,sourceRevision:f.config.sourceRevision,accessVerifier:async()=>({ok:true,identity:{userId:'owner'}})});
 const token='e30.'+Buffer.from(JSON.stringify({sub:'owner',exp:Math.floor((Date.now()+180000)/1000)})).toString('base64url')+'.synthetic',headers={'Cf-Access-Jwt-Assertion':token};
 const r=await handler(new Request(issuer+'/qa/expediente',{headers}));assert.equal(r.status,200);const html=await r.text(),ticket=html.match(/name="ticket" value="([^"]+)"/)[1],cookie=r.headers.get('Set-Cookie').split(';')[0];probes=0;
 return{...f,env,review:()=>handler(new Request(issuer+'/qa/expediente?view=avisos',{headers})),setHook:fn=>hook=fn,post:()=>handler(new Request(issuer+'/qa/expediente',{method:'POST',headers:{...headers,Origin:issuer,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie},body:new URLSearchParams({ticket,goal:'content'})}))};
}

test('prepared host saves the planned event and refuses key or schedule drift',async()=>{
 const f=await setup(true);try{assert.equal((await f.post()).status,200);assert.equal(f.db.prepare('SELECT id FROM project_events').get().id,JSON.parse(f.env.AFW_DOSSIER_EVENTS_SCHEDULE).eventId);}finally{f.close();}
 for(const field of ['AFW_DOSSIER_OWN_SAVE_KEY','AFW_DOSSIER_EVENTS_SCHEDULE','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_MODE']){const g=await setup(true);try{g.setHook(()=>{g.env[field]='changed';});assert.notEqual((await g.post()).status,200);assert.equal(g.db.prepare('SELECT count(*) n FROM project_events').get().n,0);}finally{g.close();}}
});

test('prepared host rejects an initially incomplete, disabled or out-of-window schedule',async()=>{
 for(const mode of ['missingTimes','early','late','badClose','mixed','disabled','invalidMode']){
  const f=await setup(true);try{
   const plan=JSON.parse(f.env.AFW_DOSSIER_EVENTS_SCHEDULE);
   if(mode==='missingTimes'){delete plan.dispatchAt;delete plan.closeAt;}
   if(mode==='early')plan.dispatchAt=Math.floor(f.config.window.startAt/60000)*60000-60000;
   if(mode==='late')plan.dispatchAt=Math.ceil(f.config.window.expiresAt/60000)*60000;
   if(mode==='badClose')plan.closeAt+=60000;
   if(mode==='mixed')plan.subscriptionId='sub_'+'b'.repeat(64);
   if(mode==='disabled')f.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';
   if(mode==='invalidMode')f.env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='unknown';
   f.env.AFW_DOSSIER_EVENTS_SCHEDULE=JSON.stringify(plan);
   const handler=createOwnSyntheticSaveHost({env:f.env,program:f.config.program,sourceRevision:f.config.sourceRevision,accessVerifier:async()=>{throw Error('must not reach identity');}});
   for(const method of ['GET','POST'])assert.equal((await handler(new Request(issuer+'/qa/expediente',{method}))).status,404);
   assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,0);
  }finally{f.close();}
 }
});
test('private review reads the original subscription after custody stops and cannot write the goal',async()=>{
 const f=await setup();try{await f.host.close();const r=await f.review();assert.equal(r.status,200);assert.match(await r.text(),/El aviso sigue registrado/);assert.equal(f.db.prepare('SELECT revision FROM site_projects').get().revision,1);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,0);assert.equal(f.boots(),1);assert.equal(f.sends(),1);}finally{f.close();}
});
test('private review rechecks captured service pins after the observation RPC',async()=>{
 for(const field of ['ACCESS_TEAM_DOMAIN','ACCESS_AUD','AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_OAUTH_SERVICE_MODE','AFW_OAUTH_PILOT_EXPIRES_AT']){const f=await setup();try{f.setHook(()=>{f.env[field]='false';});assert.notEqual((await f.review()).status,200);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,0);assert.equal(f.boots(),1);assert.equal(f.sends(),1);}finally{f.close();}}
});
test('server pins own canary and probes original process before actual goal save',async()=>{
 const f=await setup();try{assert.equal((await f.post()).status,200);assert.equal(f.db.prepare('SELECT revision FROM site_projects').get().revision,2);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,1);assert.equal(f.boots(),1);assert.equal(f.sends(),1);}finally{f.close();}
});
test('Access pins, gates and key drift during final pre-batch probe prevent all writes',async()=>{
 for(const field of ['ACCESS_TEAM_DOMAIN','ACCESS_AUD','AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_OAUTH_SERVICE_MODE','AFW_OAUTH_PILOT_EXPIRES_AT']){const f=await setup();try{const prior=f.env[field];f.setHook(n=>{if(n===5)f.env[field]=field.startsWith('ACCESS_')?'other':field.endsWith('SECRET')?'x'.repeat(32):'false';});assert.notEqual((await f.post()).status,200);assert.notEqual(f.env[field],prior);assert.equal(f.db.prepare('SELECT revision FROM site_projects').get().revision,1);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,0);assert.equal(f.boots(),1);assert.equal(f.sends(),1);}finally{f.close();}}
});
