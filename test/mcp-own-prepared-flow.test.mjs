import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';
import {createOwnSyntheticSaveHost} from '../lib/mcp-own-synthetic-save-host.mjs';
import {runOwnEventSchedule} from '../lib/mcp-own-event-schedule.mjs';

test('prepared HTTP save and scheduled delivery share immutable configuration through unsubscribe and close',async()=>{
 const issuer='https://delegated-canary.agentfriendlyweb.dev',projectId='oauth-canary-owner',f=fixture({projectId,resource:issuer+'/mcp'});
 try{
  f.grant();const minute=Math.floor(Date.now()/60000)*60000;
  f.config.window={startAt:minute,expiresAt:minute+180000};
  f.db.exec("ALTER TABLE site_projects ADD COLUMN goals_json TEXT DEFAULT '[]'; ALTER TABLE site_projects ADD COLUMN updated_at TEXT DEFAULT ''; CREATE TABLE project_events(id TEXT NOT NULL PRIMARY KEY,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);");
  f.config.db.batch=async statements=>{f.db.exec('BEGIN');try{const r=[];for(const s of statements)r.push(await s.run());f.db.exec('COMMIT');return r;}catch(e){f.db.exec('ROLLBACK');throw e;}};
  const host=createOwnDurableEventHost(f.config);f.setHost(host);
  const key='11111111-1111-4111-8111-111111111111',eventId=createHash('sha256').update(JSON.stringify(['afw.own-synthetic-save.v1','owner',projectId,key])).digest('hex');
  const policy={...f.config.context,projectId,containerId:'a'.repeat(64),...f.config.window};delete policy.scopes;
  const env=Object.freeze({AFW_DOSSIER_OWN_SAVE_ENABLED:'true',AFW_DOSSIER_OWN_SAVE_KEY:key,AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DOSSIER_MONITORING_OWNER_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(f.config.window.expiresAt).toISOString(),AFW_OAUTH_ISSUER:issuer,AFW_OAUTH_RESOURCE:issuer+'/mcp',AFW_OAUTH_PILOT_PROJECT_ID:projectId,AFW_OAUTH_PILOT_CLIENT_ID:'client',ACCESS_TEAM_DOMAIN:'own.cloudflareaccess.com',ACCESS_AUD:'own',DB:f.config.db,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy),AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'true',AFW_DOSSIER_EVENTS_SCHEDULE_MODE:'stable-minute',AFW_DOSSIER_EVENTS_SCHEDULE:JSON.stringify({receipt:'original',eventId,dispatchAt:minute,closeAt:f.config.window.expiresAt}),AFW_DOSSIER_EVENTS_NODE:{idFromString:id=>({toString:()=>id}),get:()=>host}});
  // All scheduled references are fixed before subscription; no fabricated SID.
  const projectRef=await host.list(),delivery={mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook'};
  await host.subscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{...delivery,secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}});
  const handler=createOwnSyntheticSaveHost({env,program:f.config.program,sourceRevision:f.config.sourceRevision,accessVerifier:async()=>({ok:true,identity:{userId:'owner'}})});
  const token='e30.'+Buffer.from(JSON.stringify({sub:'owner',exp:Math.floor(f.config.window.expiresAt/1000)})).toString('base64url')+'.synthetic';
  const headers={'Cf-Access-Jwt-Assertion':token},r=await handler(new Request(issuer+'/qa/expediente',{headers}));assert.equal(r.status,200);
  const html=await r.text(),ticket=html.match(/name="ticket" value="([^"]+)"/)[1];
  const saved=await handler(new Request(issuer+'/qa/expediente',{method:'POST',headers:{...headers,Origin:issuer,Cookie:r.headers.get('Set-Cookie').split(';')[0],'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({ticket,goal:'content'})}));
  assert.equal(saved.status,200);assert.equal(f.db.prepare('SELECT id FROM project_events').get().id,eventId);
  const tick={scheduledTime:minute,cron:'* * * * *'};
  assert.equal((await runOwnEventSchedule(tick,env)).phase,'dispatch');assert.equal(f.sends(),2);
  await assert.rejects(runOwnEventSchedule(tick,env));assert.equal(f.sends(),2);
  await host.unsubscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery});
  await assert.rejects(runOwnEventSchedule(tick,env));assert.equal(f.sends(),2);
  assert.equal((await runOwnEventSchedule({scheduledTime:f.config.window.expiresAt,cron:'* * * * *'},env,{now:()=>f.config.window.expiresAt+1})).phase,'close');
  assert.equal(f.config.ctx.container.running,false);assert.equal(f.boots(),1);
 }finally{f.close();}
});
