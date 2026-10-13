import test from 'node:test';
import assert from 'node:assert/strict';
const load=async()=> (await import('../lib/mcp-own-event-schedule.mjs')).readClosedOwnScheduleWitness;
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const at=Date.UTC(2026,9,13,15,0),sourceRevision='a'.repeat(40),controller={scheduledTime:at,cron:'* * * * *'},now=()=>at+15;
const env=()=>({...Object.fromEntries(flags.map(k=>[k,'false'])),AFW_DOSSIER_EVENTS_SCHEDULE_MODE:'stable-minute'});
test('closed minute witness has only public source and dated provider metadata',async()=>{
 const read=await load(),c=env();c.PRIVATE_OWNER_DATA='never';c.AFW_DOSSIER_EVENTS_CUSTODY_KEY='never';const r=read(controller,c,{sourceRevision,now});
 assert.deepEqual(r,{type:'afw.closed.scheduled',sourceRevision,cron:'* * * * *',scheduledAt:new Date(at).toISOString(),observedAt:new Date(at+15).toISOString()});assert.equal(Object.isFrozen(r),true);assert.equal(JSON.stringify(r).includes('never'),false);
});
test('default mode performs no closed flag, policy or secret reads',async()=>{
 const read=await load();let forbidden=0;const c=new Proxy({},{get(o,k){if(k==='AFW_DOSSIER_EVENTS_SCHEDULE_MODE')return undefined;forbidden++;throw Error('private read');}});assert.equal(read(controller,c,{sourceRevision,now}),null);assert.equal(forbidden,0);
});
test('any active or unresolved capability and any installed policy suppresses witness',async()=>{
 const read=await load();for(const flag of flags)for(const value of ['true',undefined]){const c=env();c[flag]=value;assert.equal(read(controller,c,{sourceRevision,now}),null);}
 for(const key of ['AFW_DOSSIER_EVENTS_SCHEDULE','AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_MONITORING_OWNER_POLICY']){const c=env();c[key]='{}';assert.equal(read(controller,c,{sourceRevision,now}),null);}
});
test('malformed clock, source or nonminute trigger never produces metadata',async()=>{
 const read=await load();for(const c of [{scheduledTime:at,cron:'other'},{scheduledTime:at+1,cron:'* * * * *'},{scheduledTime:NaN,cron:'* * * * *'}])assert.equal(read(c,env(),{sourceRevision,now}),null);
 assert.equal(read(controller,env(),{sourceRevision:'private',now}),null);assert.equal(read(controller,env(),{sourceRevision,now:()=>at-1}),null);assert.equal(read(controller,env(),{sourceRevision,now:()=>NaN}),null);
});
