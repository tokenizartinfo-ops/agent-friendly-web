import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,unlinkSync,rmdirSync,realpathSync} from 'node:fs';
import {join,resolve,sep,basename} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const load=()=>import('../scripts/prepare-own-monitor-original.mjs');
const start=Date.UTC(2026,9,12,16,5,3,932),now=start+60000;
function fixture(){return{query:[{success:true,meta:{served_by_primary:true},results:[{id:'g',user_id:'owner',project_id:'oauth-canary-owner',client_id:'afw-chatgpt-pilot-20261003',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',scopes_json:'["afw:project:read"]',created_at:new Date(start).toISOString(),expires_at:new Date(start+600000).toISOString(),revoked_at:''}]}],config:{name:'agent-friendly-web-delegated-canary',account_id:'85d0d5dadac3341a564f22ce885e9eec',main:'output/accepted-original/index.mjs',workers_dev:false,preview_urls:false,routes:[{pattern:'delegated-canary.agentfriendlyweb.dev',custom_domain:true}],d1_databases:[{binding:'DB',database_id:'6a728254-1494-4039-802e-b39288a55fcc'}],kv_namespaces:[{binding:'OAUTH_KV',id:'6b94ff702e504e14a7730cee73a0f6ff'}],durable_objects:{bindings:[{name:'AFW_DOSSIER_EVENTS_NODE',class_name:'AfwOwnEventNode'}]},vars:{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_MONITORING_OWNER_ENABLED:'false',AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED:'false',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-one-occurrence-v1',AFW_OAUTH_REFRESH_ENABLED:'false',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(start+1800000).toISOString(),AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_OAUTH_RESOURCE:'https://delegated-canary.agentfriendlyweb.dev/mcp',AFW_OAUTH_PILOT_PROJECT_ID:'oauth-canary-owner',AFW_OAUTH_PILOT_CLIENT_ID:'afw-chatgpt-pilot-20261003'}}};}
const prepare=(fn,f,t=now)=>fn({grantResultJson:JSON.stringify(f.query),configJson:JSON.stringify(f.config),now:t});
test('raw UTC strings keep original day/month/timezone/milliseconds and clone only the own draft',async()=>{
 const {prepareOwnMonitorConfig}=await load(),f=fixture(),before=JSON.stringify(f),r=prepare(prepareOwnMonitorConfig,f),p=JSON.parse(r.config.vars.AFW_DOSSIER_EVENTS_POLICY);
 assert.equal(p.startAt,start);assert.equal(p.expiresAt,start+600000);assert.equal(new Date(p.startAt).toISOString(),'2026-10-12T16:05:03.932Z');assert.equal(r.config.vars.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED,'false');assert.equal(JSON.stringify(f),before);assert.deepEqual(Object.keys(r.summary),['startAt','expiresAt','scope','noConsentCreated']);assert.equal(JSON.stringify(r.summary).includes('owner'),false);
});
test('ambiguous/cultural dates, revoked/expired/foreign/extra-scope and nonprimary records fail closed',async()=>{
 const {prepareOwnMonitorConfig}=await load();for(const change of [f=>f.query[0].results[0].created_at='12/10/2026 16:05:03',f=>f.query[0].results[0].created_at='2026-12-10T19:05:03.000Z',f=>f.query[0].results[0].revoked_at='revoked',f=>f.query[0].results[0].project_id='customer',f=>f.query[0].results[0].scopes_json='["afw:project:read","afw:evidence:read"]',f=>f.query[0].meta.served_by_primary=false,f=>f.query[0].results.push({...f.query[0].results[0]})]){const f=fixture();change(f);assert.throws(()=>prepare(prepareOwnMonitorConfig,f));}assert.throws(()=>prepare(prepareOwnMonitorConfig,fixture(),start+600000));
});
test('service deadline can shorten original expiry but cannot renew it',async()=>{
 const {prepareOwnMonitorConfig}=await load(),f=fixture();f.config.vars.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(start+300000).toISOString();const r=prepare(prepareOwnMonitorConfig,f);assert.equal(JSON.parse(r.config.vars.AFW_DOSSIER_EVENTS_POLICY).expiresAt,start+300000);assert.equal(r.summary.expiresAt,new Date(start+300000).toISOString());
});
test('another resource, live schedule, existing policy, plain secret or cron never yields a new draft',async()=>{
 const {prepareOwnMonitorConfig}=await load();for(const change of [f=>f.config.name='tokenizart-companion-agent',f=>f.config.d1_databases[0].database_id='other',f=>f.config.durable_objects.bindings[0].script_name='other-worker',f=>f.config.vars.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED='true',f=>f.config.vars.AFW_DOSSIER_EVENTS_POLICY='{}',f=>f.config.vars.AFW_DOSSIER_EVENTS_CUSTODY_KEY='secret',f=>f.config.triggers={crons:['* * * * *']}]){const f=fixture();change(f);assert.throws(()=>prepare(prepareOwnMonitorConfig,f));}
});
test('explicit prewarmed minute mode preserves only its one original cron without renewing consent',async()=>{
 const {prepareOwnMonitorConfig}=await load(),f=fixture();f.config.vars.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='stable-minute';f.config.triggers={crons:['* * * * *']};
 const r=prepare(prepareOwnMonitorConfig,f);assert.deepEqual(r.config.triggers,f.config.triggers);assert.equal(JSON.parse(r.config.vars.AFW_DOSSIER_EVENTS_POLICY).expiresAt,start+600000);assert.equal(r.summary.noConsentCreated,true);
 for(const change of [f=>f.config.triggers.crons=[],f=>f.config.triggers.crons.push('* * * * *'),f=>f.config.triggers.crons=['1 * * * *'],f=>f.config.vars.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='other']){const bad=fixture();bad.config.vars.AFW_DOSSIER_EVENTS_SCHEDULE_MODE='stable-minute';bad.config.triggers={crons:['* * * * *']};change(bad);assert.throws(()=>prepare(prepareOwnMonitorConfig,bad));}
});

test('CLI preserves existing draft, rejects path escape and prints no original owner/grant references',()=>{
 const dir=mkdtempSync(join(tmpdir(),'afw-own-monitor-cli-')),f=fixture(),t=Date.now()-1000;
 f.query[0].results[0].created_at=new Date(t).toISOString();f.query[0].results[0].expires_at=new Date(t+600000).toISOString();f.config.vars.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(t+1800000).toISOString();
 const script=fileURLToPath(new URL('../scripts/prepare-own-monitor-original.mjs',import.meta.url)),output=join(dir,'output'),escape=`afw-escape-${basename(dir)}.json`;
 try{
  mkdirSync(output);writeFileSync(join(dir,'package.json'),JSON.stringify({name:'agent-friendly-web'}));writeFileSync(join(output,'template.json'),JSON.stringify(f.config));
  const run=target=>execFileSync(process.execPath,[script,'output/template.json',target],{cwd:dir,input:JSON.stringify(f.query),encoding:'utf8',stdio:['pipe','pipe','pipe']});
  const report=run('output/draft.json');assert.equal(JSON.parse(report).noConsentCreated,true);assert.equal(report.includes('owner'),false);const before=readFileSync(join(output,'draft.json'),'utf8');
  assert.throws(()=>run('output/draft.json'));assert.equal(readFileSync(join(output,'draft.json'),'utf8'),before);assert.throws(()=>run('../'+escape));assert.equal(existsSync(join(dir,'..',escape)),false);
 }finally{
  assert.equal(realpathSync(dir).startsWith(resolve(tmpdir())+sep),true);assert.match(basename(dir),/^afw-own-monitor-cli-/);
  for(const path of [join(output,'draft.json'),join(output,'template.json'),join(dir,'package.json')])if(existsSync(path))unlinkSync(path);
  rmdirSync(output);rmdirSync(dir);
 }
});
