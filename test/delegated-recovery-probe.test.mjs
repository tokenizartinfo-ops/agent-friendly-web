import assert from 'node:assert/strict';
import test from 'node:test';
import { createRecoveryProbe } from './fixtures/delegated-recovery-probe.mjs';

test('QA read outage leaves auth, consent, unrelated origins and writes untouched',async()=>{
  const now=Date.parse('2026-10-04T10:00:00Z');
  const env={AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_OAUTH_RESOURCE:'https://delegated-canary.agentfriendlyweb.dev/mcp',AFW_OAUTH_PILOT_CLIENT_ID:'afw-chatgpt-pilot-20261003',AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_PILOT_EXPIRES_AT:'2026-10-04T10:10:00Z',DB:{prepare:sql=>sql}};
  const base={fetch:async(request,current)=>current};
  const probe=createRecoveryProbe(base,{now:()=>now});
  const request=(path='/mcp',method='tools/call',origin=env.AFW_OAUTH_ISSUER)=>new Request(origin+path,{method:'POST',body:JSON.stringify({jsonrpc:'2.0',id:1,method,params:{name:'read_project_summary',arguments:{}}})});
  const fault=await probe.fetch(request(),env,{});
  assert.throws(()=>fault.DB.prepare('SELECT * FROM site_projects WHERE id=?'),/synthetic read outage/);
  assert.equal(fault.DB.prepare('SELECT * FROM delegated_access_grants'),'SELECT * FROM delegated_access_grants');
  assert.equal(fault.DB.prepare('UPDATE site_projects SET revision=2'),'UPDATE site_projects SET revision=2');
  for(const req of [request('/authorize'),request('/mcp','tools/list'),request('/mcp','tools/call','https://delegated-pilot.agentfriendlyweb.dev')])
    assert.equal(await probe.fetch(req,env,{}),env);
  for(const delta of [{AFW_DELEGATED_OAUTH_ENABLED:'false'},{AFW_OAUTH_ISSUER:'https://delegated-pilot.agentfriendlyweb.dev'},{AFW_OAUTH_PILOT_EXPIRES_AT:'2026-10-04T11:00:00Z'},{AFW_OAUTH_PILOT_EXPIRES_AT:'2026-10-04T09:59:00Z'},{AFW_OAUTH_PILOT_CLIENT_ID:'other'}]){
    const altered={...env,...delta};assert.equal(await probe.fetch(request(),altered,{}),altered);
  }
  assert.equal(env.DB.prepare('SELECT * FROM site_projects'),'SELECT * FROM site_projects');
});
