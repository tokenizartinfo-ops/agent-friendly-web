import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/mcp-own-event-schedule.mjs');
const start=Date.UTC(2026,9,12,15,0),end=start+240000;
function setup(){
 let time=start+60010,hook;const calls=[];
 const nodeId='a'.repeat(64),policy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:'https://private.invalid/mcp',containerId:nodeId,startAt:start,expiresAt:end};
 const schedule={subscriptionId:'sub_'+'b'.repeat(64),eventId:'saved-own-1',dispatchAt:start+60000,closeAt:end};
 const env={AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'true',AFW_DOSSIER_EVENTS_SCHEDULE:JSON.stringify(schedule),AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy),AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:policy.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',DB:{prepare(){}},AFW_DOSSIER_EVENTS_PROJECTION_SECRET:'z'.repeat(32),AFW_DOSSIER_EVENTS_NODE:{idFromString(id){assert.equal(id,nodeId);return{toString:()=>id};},get(id){assert.equal(id.toString(),nodeId);return{async deliverSaved(...args){calls.push(['deliver',...args]);if(hook)await hook();},async close(){calls.push(['close']);if(hook)await hook();}};}}};
 return{env,policy,schedule,calls,now:()=>time,setTime(t){time=t;},setHook(h){hook=h;},control(at=schedule.dispatchAt){const d=new Date(at);return{scheduledTime:at,cron:`${d.getUTCMinutes()} ${d.getUTCHours()} ${d.getUTCDate()} ${d.getUTCMonth()+1} *`};}};
}
test('unconfigured or disabled schedule reads no Node, policy, storage or secrets',async()=>{
 const {runOwnEventSchedule}=await load();for(const enabled of [undefined,'false']){let forbidden=0;const env=new Proxy({AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:enabled},{get(o,k){if(k==='AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED'||k==='AFW_DOSSIER_EVENTS_SCHEDULE')return o[k];forbidden++;throw Error('dependency');}});assert.equal(await runOwnEventSchedule({},env),null);assert.equal(forbidden,0);}
});
test('dispatch selects only original node and references at the exact scheduled minute',async()=>{
 const {runOwnEventSchedule}=await load(),f=setup();assert.deepEqual(await runOwnEventSchedule(f.control(),f.env,{now:f.now}),{phase:'dispatch',status:'requested'});assert.deepEqual(f.calls,[['deliver',f.schedule.subscriptionId,f.schedule.eventId]]);
});
test('prewarmed minute schedule is idle except original dispatch and catches up only original closure',async()=>{
 const {runOwnEventSchedule}=await load(),f=setup();f.env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='stable-minute';const tick=at=>({scheduledTime:at,cron:'* * * * *'});
 assert.equal(await runOwnEventSchedule(tick(start),f.env,{now:f.now}),null);assert.equal(f.calls.length,0);assert.equal((await runOwnEventSchedule(tick(f.schedule.dispatchAt),f.env,{now:f.now})).phase,'dispatch');assert.equal(f.calls.length,1);
 f.setTime(start+120010);assert.equal(await runOwnEventSchedule(tick(start+120000),f.env,{now:f.now}),null);assert.equal(f.calls.length,1);
 f.setTime(end+120010);f.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';f.env.AFW_DOSSIER_EVENTS_ENABLED='false';assert.equal((await runOwnEventSchedule(tick(end+120000),f.env,{now:f.now})).phase,'close');assert.deepEqual(f.calls,[['deliver',f.schedule.subscriptionId,f.schedule.eventId],['close']]);
});
test('prewarmed close-only schedule never dispatches and rejects mode or cron drift',async()=>{
 const {runOwnEventSchedule}=await load(),f=setup();f.env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='stable-minute';f.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';f.env.AFW_DOSSIER_EVENTS_SCHEDULE=JSON.stringify({closeAt:end});const tick=at=>({scheduledTime:at,cron:'* * * * *'});
 assert.equal(await runOwnEventSchedule(tick(start+60000),f.env,{now:f.now}),null);assert.equal(f.calls.length,0);f.setTime(end+10);assert.equal((await runOwnEventSchedule(tick(end),f.env,{now:f.now})).phase,'close');assert.equal(f.calls.length,1);
 const g=setup();g.env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='stable-minute';g.setHook(()=>{g.env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='exact';});await assert.rejects(runOwnEventSchedule(tick(g.schedule.dispatchAt),g.env,{now:g.now}));assert.equal(g.calls.length,1);
 const h=setup();h.env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='unknown';await assert.rejects(runOwnEventSchedule(h.control(),h.env,{now:h.now}));assert.equal(h.calls.length,0);
});
test('wrong minute/cron, expired delivery, malformed scope and flag-off cannot dispatch',async()=>{
 const {runOwnEventSchedule}=await load();for(const change of [f=>f.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false',f=>f.env.AFW_DOSSIER_EVENTS_ENABLED='false',f=>f.setTime(end),f=>f.schedule.dispatchAt++,f=>f.schedule.closeAt=end+120000,f=>f.schedule.subscriptionId='caller',f=>f.schedule.extra='callback']){const f=setup();change(f);f.env.AFW_DOSSIER_EVENTS_SCHEDULE=JSON.stringify(f.schedule);await assert.rejects(runOwnEventSchedule(f.control(),f.env,{now:f.now}));assert.equal(f.calls.length,0);}
 const f=setup();await assert.rejects(runOwnEventSchedule({...f.control(),cron:'* * * * *'},f.env,{now:f.now}));await assert.rejects(runOwnEventSchedule(f.control(start+120000),f.env,{now:f.now}));assert.equal(f.calls.length,0);
});
test('close remains historical after live flags and window end, without delivery',async()=>{
 const {runOwnEventSchedule}=await load(),f=setup();f.setTime(end+10);f.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';f.env.AFW_DOSSIER_EVENTS_ENABLED='false';assert.deepEqual(await runOwnEventSchedule(f.control(end),f.env,{now:f.now}),{phase:'close',status:'requested'});assert.deepEqual(f.calls,[['close']]);
});
test('close-only original schedule can be armed before any subscription or saved-event receipt exists',async()=>{
 const {runOwnEventSchedule}=await load(),f=setup();f.setTime(end+10);f.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';f.env.AFW_DOSSIER_EVENTS_ENABLED='false';f.env.AFW_DOSSIER_EVENTS_SCHEDULE=JSON.stringify({closeAt:end});assert.equal((await runOwnEventSchedule(f.control(end),f.env,{now:f.now})).phase,'close');assert.deepEqual(f.calls,[['close']]);
 await assert.rejects(runOwnEventSchedule(f.control(start+60000),f.env,{now:f.now}));assert.equal(f.calls.length,1);
});
test('a delayed original close still retires the same process; delay never permits delivery',async()=>{
 const {runOwnEventSchedule}=await load(),f=setup();f.setTime(end+720000);f.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';f.env.AFW_DOSSIER_EVENTS_ENABLED='false';assert.equal((await runOwnEventSchedule(f.control(end),f.env,{now:f.now})).phase,'close');assert.deepEqual(f.calls,[['close']]);await assert.rejects(runOwnEventSchedule(f.control(),f.env,{now:f.now}));assert.equal(f.calls.length,1);
});
test('configuration drift at binding resolution and after RPC fails closed; no retry',async()=>{
 const {runOwnEventSchedule}=await load(),a=setup(),get=a.env.AFW_DOSSIER_EVENTS_NODE.get;a.env.AFW_DOSSIER_EVENTS_NODE.get=function(id){const result=get(id);a.env.AFW_DOSSIER_EVENTS_SCHEDULE='{}';return result;};await assert.rejects(runOwnEventSchedule(a.control(),a.env,{now:a.now}));assert.equal(a.calls.length,0);
 const b=setup();b.setHook(()=>{b.env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';});await assert.rejects(runOwnEventSchedule(b.control(),b.env,{now:b.now}));assert.equal(b.calls.length,1);
 const c=setup();c.setHook(()=>{throw Error('unknown ACK');});await assert.rejects(runOwnEventSchedule(c.control(),c.env,{now:c.now}));assert.equal(c.calls.length,1);
});
for(const mode of ['exact','stable-minute'])test(`scheduled ${mode} source uses original SQL and durable budget: one delivery, no restart, historical stop`,async()=>{
 const {runOwnEventSchedule}=await load(),{fixture}=await import('./fixtures/mcp-own-durable-host.mjs'),{createOwnDurableEventHost}=await import('../lib/mcp-own-durable-host.mjs');
 const f=fixture();let offset=0;const now=()=>Date.now()+offset,minute=Math.floor(Date.now()/60000)*60000;
 try{
  f.grant();f.config.now=now;f.config.window={startAt:minute,expiresAt:minute+180000};
  f.db.exec('CREATE TABLE project_events(id TEXT PRIMARY KEY,project_id TEXT,user_id TEXT,type TEXT,created_at TEXT,payload_json TEXT);');
  const host=createOwnDurableEventHost(f.config);f.setHost(host);const projectRef=await host.list(),r=await host.subscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}});
  f.db.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run('event-scheduled','p','owner','project_updated',new Date().toISOString(),JSON.stringify({revision:1,privateText:'never forwarded'}));
  const schedule={subscriptionId:r.id,eventId:'event-scheduled',dispatchAt:minute,closeAt:minute+180000},policy={...f.config.context,projectId:'p',containerId:'a'.repeat(64),...f.config.window};delete policy.scopes;
  const env={AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'true',AFW_DOSSIER_EVENTS_SCHEDULE:JSON.stringify(schedule),AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy),AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:policy.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',DB:f.config.db,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,AFW_DOSSIER_EVENTS_NODE:{idFromString:id=>({toString:()=>id}),get:()=>host}};
  env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE=mode;
  const controller=t=>{const d=new Date(t);return{scheduledTime:t,cron:mode==='stable-minute'?'* * * * *':`${d.getUTCMinutes()} ${d.getUTCHours()} ${d.getUTCDate()} ${d.getUTCMonth()+1} *`};};
  assert.equal((await runOwnEventSchedule(controller(minute),env,{now})).phase,'dispatch');assert.equal(f.boots(),1);assert.equal(f.sends(),2);
  await assert.rejects(runOwnEventSchedule(controller(minute),env,{now}));assert.equal(f.boots(),1);assert.equal(f.sends(),2);
  env.AFW_DOSSIER_EVENTS_ENABLED='false';env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='false';offset=schedule.closeAt-Date.now()+10;
  assert.equal((await runOwnEventSchedule(controller(schedule.closeAt),env,{now})).phase,'close');assert.equal(f.config.ctx.container.running,false);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);assert.equal(f.boots(),1);
 }finally{f.close();}
});
test('close-only original retires a partially started process even without a subscription receipt',async()=>{
 const {runOwnEventSchedule}=await load(),{fixture}=await import('./fixtures/mcp-own-durable-host.mjs'),{createOwnDurableEventHost}=await import('../lib/mcp-own-durable-host.mjs'),f=fixture();let offset=0,stops=0;const now=()=>Date.now()+offset;
 try{
  f.grant();f.config.now=now;const container=f.config.ctx.container,start=container.start,destroy=container.destroy;
  container.start=async options=>{await start(options);throw Error('unknown start ACK');};container.destroy=async()=>{if(++stops<=2)throw Error('stop temporarily unavailable');return destroy();};
  const host=createOwnDurableEventHost(f.config);f.setHost(host);const projectRef=await host.list();await assert.rejects(host.subscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}}));assert.equal(f.boots(),1);assert.equal(f.sends(),0);assert.equal(stops,2);assert.equal(container.running,true);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);
  const closeAt=Math.ceil(f.config.window.expiresAt/60000)*60000,p={...f.config.context,projectId:'p',containerId:'a'.repeat(64),...f.config.window};delete p.scopes;
  const env={AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'false',AFW_DOSSIER_EVENTS_SCHEDULE:JSON.stringify({closeAt}),AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(p),AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:p.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',DB:f.config.db,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,AFW_DOSSIER_EVENTS_NODE:{idFromString:id=>({toString:()=>id}),get:()=>host}},d=new Date(closeAt);offset=closeAt-Date.now()+10;
  assert.equal((await runOwnEventSchedule({scheduledTime:closeAt,cron:`${d.getUTCMinutes()} ${d.getUTCHours()} ${d.getUTCDate()} ${d.getUTCMonth()+1} *`},env,{now})).phase,'close');assert.equal(container.running,false);assert.equal(f.boots(),1);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);
 }finally{f.close();}
});
