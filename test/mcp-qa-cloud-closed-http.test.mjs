import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivateQaCloudClosedRollback} from '../lib/mcp-qa-cloud-closed-rollback.mjs';
import {createQaCloudClosedHttpAdapters} from '../lib/mcp-qa-cloud-closed-http.mjs';
import {AFW_FIXED_WORKFLOWS} from '../lib/mcp-fixed-terminal-workflows.mjs';
import {qaClosedHttpFixture as fixture,hash,canonical,names,ids,deployments} from './fixtures/qa-closed-http.mjs';
const posts=f=>f.requests.filter(r=>r.init.method==='POST');
const safe=r=>{assert.equal(r.operationalReadiness,false);assert.equal(r.mayRetry,false);assert.equal(JSON.stringify(r).includes('synthetic-'),false);};
test('fixed real HTTP adapter verifies source/config/native inventories, claims before one fixed restore and reads independently',async()=>{
 const f=fixture(),r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'restored_observed');assert.equal(posts(f).length,2);assert.equal(posts(f)[0].url.origin,'https://api.github.com');assert.equal(posts(f)[1].url.origin,'https://api.cloudflare.com');assert.ok(f.requests.filter(x=>x.init.method==='GET').length<=128);safe(r);
});
test('inspect does not write durable refs or deploy',async()=>{
 const f=fixture(),r=await f.run('inspect');assert.equal(r.status,'closed_candidate_observed');assert.equal(posts(f).length,0);safe(r);
});
for(const status of [409,422])test('existing claim '+status+' stays consumed even for the same source SHA',async()=>{
 const f=fixture();f.mutate=({url,response})=>{if(url.origin==='https://api.github.com'){response.status=status;response.body={message:'already exists'};}};const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'consumed');assert.equal(posts(f).length,1);safe(r);
});
test('a renamed session cannot refund the durable candidate deployment claim',async()=>{
 const f=fixture();f.cfAckLost=true;await f.run('restore_known_closed_candidate');f.version=ids[0];f.deployment=deployments[0];f.plan={...f.plan,sessionId:'c'.repeat(64)};const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'consumed');assert.equal(posts(f).filter(x=>x.url.origin==='https://api.cloudflare.com').length,1);safe(r);
});
for(const what of ['claim','provider'])test('unknown '+what+' ACK cannot issue the same effect twice',async()=>{
 const f=fixture();f.claimAckLost=what==='claim';f.cfAckLost=what==='provider';const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,what==='provider'?'closed_observed_uncertain':'uncertain');assert.equal(posts(f).filter(x=>x.url.origin==='https://api.cloudflare.com').length,what==='provider'?1:0);safe(r);
});
const attacks={
 'code fingerprint':({url,response})=>{if(url.pathname.endsWith('/versions/'+ids[0]))response.body.result.modules[0].content_base64=Buffer.from('changed').toString('base64');},
 'configuration':({url,response})=>{if(url.pathname.endsWith('/versions/'+ids[0]))response.body.result.bindings[0].text='true';},
 'secret value leakage':({url,response})=>{if(url.pathname.endsWith('/versions/'+ids[0]))response.body.result.bindings[1].text='never-log-this';},
 'foreign peer deployment':({url,response})=>{if(url.pathname.includes(names[1])&&url.pathname.endsWith('/deployments'))response.body.result.deployments[0].id=deployments[3];},
 'nonterminal bootstrap':({url,response})=>{if(url.pathname.includes('private-bootstrap/instances'))response.body.result[0].status='running';},
 'foreign workflow instance':({url,response})=>{if(url.pathname.endsWith('/instances')&&url.pathname.includes('/workflows/'))response.body.result[0].workflow_id=deployments[3];},
 'unregistered QA workflow':({url,response})=>{if(url.pathname.endsWith('/workflows')){response.body.result.push({name:'unknown',id:deployments[3],script_name:names[0],class_name:'Other'});response.body.result_info.count++;response.body.result_info.total_count++;}},
 'workflow instance undercount':({url,response})=>{if(url.pathname.endsWith('/instances')&&url.pathname.includes('/workflows/'))response.body.result_info.total_count=0;},
 'workflow changing total':({url,response})=>{if(url.pathname.includes('private-bootstrap/instances')){response.body.result=[{id:url.searchParams.has('cursor')?'second':'first',status:'complete',workflow_id:AFW_FIXED_WORKFLOWS[2].id}];response.body.result_info={per_page:100,count:1,total_count:url.searchParams.has('cursor')?0:2,...url.searchParams.has('cursor')?{}:{cursor:'next'}};}},
 'workflow changing total pages':({url,response})=>{if(url.pathname.includes('private-bootstrap/instances')){const next=url.searchParams.has('cursor');response.body.result=[{id:next?'second':'first',status:'complete',workflow_id:AFW_FIXED_WORKFLOWS[2].id}];response.body.result_info={per_page:100,count:1,total_count:2,page:next?2:1,total_pages:next?2:3,...next?{}:{cursor:'next'}};}},
 'registry alternate remainder':({url,response})=>{if(url.pathname.endsWith('/workflows'))response.body.result_info.next_page_token='more';},
 'registry unknown pagination':({url,response})=>{if(url.pathname.endsWith('/workflows'))response.body.result_info.unknown_paging=true;},
 'namespace alternate remainder':({url,response})=>{if(url.pathname.endsWith('/namespaces'))response.body.result_info.next_cursor='more';},
 'namespace unknown pagination':({url,response})=>{if(url.pathname.endsWith('/namespaces'))response.body.result_info.unknown_paging=true;},
 'incomplete workflow registry':({url,response})=>{if(url.pathname.endsWith('/workflows'))response.body.result_info.total_count=999;},
 'active container':({url,response})=>{if(url.pathname.endsWith('/instances-v2'))response.body.result.push({id:'f'.repeat(64)});},
 'container remainder':({url,response})=>{if(url.pathname.endsWith('/instances-v2'))response.body.result_info.next_page_token='more';},
 'foreign namespace':({url,response})=>{if(url.pathname.endsWith('/namespaces'))response.body.result[0].id='f'.repeat(32);},
 'cron':({url,response})=>{if(url.pathname.endsWith('/schedules'))response.body.result.schedules.push({cron:'* * * * *'});},
 'tail':({url,response})=>{if(url.pathname.endsWith('/tails'))response.body.result.push({id:'x'});},
 'QA public preview':({url,response})=>{if(url.pathname.endsWith('/subdomain'))response.body.result.previews_enabled=true;},
 'stale response':({response})=>{response.headers.date='Thu, 01 Jan 1970 00:00:00 GMT';},
 'redirect':({response})=>{response.status=302;response.headers.location='https://invalid.example/';},
 'failed provider envelope':({response})=>{response.body.success=false;},
 'stale CDN cache':({response})=>{response.headers.age='99';}
};
for(const [label,attack]of Object.entries(attacks))test(label+' blocks before any durable intent or provider effect',async()=>{
 const f=fixture();f.mutate=attack;const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);safe(r);
});
test('oversized response is bounded and never echoed',async()=>{const f=fixture();f.bodyMode='huge';const r=await f.run('inspect');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);safe(r);});
test('HTTP child deadline and parent abort stop a fetch that ignores its signal',async()=>{
 const f=fixture(),options=f.options();options.fetchImpl=async()=>new Promise(()=>{});const a=createQaCloudClosedHttpAdapters(options),parent=new AbortController();const result=a.readSnapshot(parent.signal);setTimeout(()=>parent.abort(),5);await assert.rejects(result,/unavailable/i);
});
test('direct deployment cannot bypass an acknowledged claim and fresh second snapshot',async()=>{
 const f=fixture(),a=createQaCloudClosedHttpAdapters(f.options());await assert.rejects(a.deploy({sessionId:f.plan.sessionId,closedVersionId:ids[1]},f.parent.signal),/unavailable/i);assert.equal(posts(f).length,0);
});
test('untrusted caller cannot add a target or arbitrary request option',()=>{
 const f=fixture();assert.throws(()=>createQaCloudClosedHttpAdapters({...f.options(),target:'foreign'}));assert.throws(()=>createQaCloudClosedHttpAdapters({...f.options(),pins:{...f.pins,qaCandidate:{...f.pins.qaCandidate,name:'other'}}}));
});
export {fixture};

for(const field of ['githubToken','credential'])test('bounded opaque '+field+' supports current long dotted credentials without parsing or truncation',async()=>{
 const f=fixture(),base=f.options,opaque='ghs_12345_'+'x'.repeat(310)+'.'+'y'.repeat(190)+'.z';f.options=()=>({...base(),[field]:opaque});
 const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'restored_observed');assert.equal(posts(f).length,2);
 const origin=field==='githubToken'?'https://api.github.com':'https://api.cloudflare.com';
 assert.ok(f.requests.filter(x=>x.url.origin===origin).every(x=>x.init.headers.Authorization==='Bearer '+opaque));safe(r);
});
for(const field of ['githubToken','credential'])for(const value of ['', 'space inside', 'newline\ninside', 'carriage\rreturn', 'nul\0inside', 'tab\tinside', 'nonascii-é', 'x'.repeat(8193)])test('opaque '+field+' still rejects empty, unsafe or over-budget header input '+JSON.stringify(value.slice(0,24)),()=>{
 const f=fixture();assert.throws(()=>createQaCloudClosedHttpAdapters({...f.options(),[field]:value}),/unavailable/i);assert.equal(f.requests.length,0);
});

test('HTTP diagnostic is frozen non-authorizing metadata, excluded from effect callback spread',async()=>{
 const f=fixture(),a=createQaCloudClosedHttpAdapters(f.options());assert.equal(typeof a.readDiagnostic,'function');assert.deepEqual(Object.keys(a).sort(),['claim','deploy','readSnapshot']);
 const core=createPrivateQaCloudClosedRollback({plan:f.plan,pins:{candidateVersionId:ids[0],closedVersionId:ids[1]},...a,now:()=>f.wall,timeoutMs:30000,signal:f.parent.signal});
 assert.equal((await core.run('inspect')).status,'closed_candidate_observed');const d=a.readDiagnostic();assert.equal(d.purpose,'afw.qa-cloud-closed-http-diagnostic.v1');assert.equal(d.stage,'complete');assert.equal(d.reason,'none');assert.equal(d.httpStatus,null);assert.ok(d.reads>0&&d.reads<=128);assert.equal(d.authorizesEffects,false);assert.equal(d.operationalReadiness,false);assert.equal(Object.isFrozen(d),true);
});
for(const status of [401,403,404,429,500])test('HTTP diagnostic records only the first fixed resource group and status '+status,async()=>{
 const f=fixture();f.mutate=({response})=>{response.status=status;response.body={success:false,errors:[{message:'never-log-provider-body synthetic-cf-token synthetic-gh-token'}]};};
 const a=createQaCloudClosedHttpAdapters(f.options());await assert.rejects(a.readSnapshot(f.parent.signal));const d=a.readDiagnostic();assert.equal(d.stage,'active_deployments');assert.equal(d.reason,'http_status');assert.equal(d.httpStatus,status);assert.ok(d.reads<=2);assert.equal(d.authorizesEffects,false);assert.equal(d.operationalReadiness,false);assert.doesNotMatch(JSON.stringify(d),/synthetic|never-log|Authorization|85d0d5|https:/);
});
test('proof rejection and transport rejection remain distinct safe diagnostic outcomes',async()=>{
 const f=fixture();f.mutate=attacks['code fingerprint'];const a=createQaCloudClosedHttpAdapters(f.options());await assert.rejects(a.readSnapshot(f.parent.signal));assert.equal(a.readDiagnostic().stage,'version_profiles');assert.equal(a.readDiagnostic().reason,'proof_rejected');assert.equal(a.readDiagnostic().httpStatus,null);
 const g=fixture(),o=g.options();o.fetchImpl=async()=>{throw Error('never-log-private-token-header');};const b=createQaCloudClosedHttpAdapters(o);await assert.rejects(b.readSnapshot(g.parent.signal));assert.equal(b.readDiagnostic().stage,'active_deployments');assert.equal(b.readDiagnostic().reason,'request_failed');assert.equal(b.readDiagnostic().httpStatus,null);assert.doesNotMatch(JSON.stringify(b.readDiagnostic()),/never-log/);
});
test('response freshness rejection is observable without returning a header or body',async()=>{
 const f=fixture();f.mutate=attacks['stale response'];const a=createQaCloudClosedHttpAdapters(f.options());await assert.rejects(a.readSnapshot(f.parent.signal));const d=a.readDiagnostic();assert.equal(d.stage,'active_deployments');assert.equal(d.reason,'response_date');assert.equal(d.httpStatus,200);assert.doesNotMatch(JSON.stringify(d),/1970|headers/i);
});
test('CLI retains only the fixed diagnostic object alongside a blocked result',async()=>{
 const cli=await (await import('node:fs/promises')).readFile(new URL('../scripts/run-qa-cloud-closed-rollback.mjs',import.meta.url),'utf8');assert.match(cli,/httpDiagnostic:adapters\.readDiagnostic\(\)/);assert.doesNotMatch(cli,/catch\s*\(\s*(?:error|err)\s*\)[\s\S]*console\./);
});

for(const mode of ['provider-shaped','errors-null','messages-null','pages-omitted'])test('fixed namespace GET accepts the complete observed legacy shape '+mode,async()=>{
 const f=fixture();f.mutate=({url,response})=>{if(!url.pathname.endsWith('/workers/durable_objects/namespaces'))return;if(['provider-shaped','errors-null'].includes(mode))response.body.errors=null;if(['provider-shaped','messages-null'].includes(mode))response.body.messages=null;if(['provider-shaped','pages-omitted'].includes(mode))delete response.body.result_info.total_pages;};
 const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'restored_observed');assert.equal(posts(f).length,2);safe(r);
});
test('a nonempty namespace page cannot claim zero total pages',async()=>{
 const f=fixture();f.mutate=({url,response})=>{if(url.pathname.endsWith('/namespaces'))response.body.result_info.total_pages=0;};const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);
});
for(const mode of ['false-success','error-entry','missing-errors','wrong-errors','missing-messages','wrong-messages','missing-total-count','incomplete-total','unknown-remainder'])test('namespace compatibility does not accept '+mode,async()=>{
 const f=fixture();f.mutate=({url,response})=>{
  if(!url.pathname.endsWith('/workers/durable_objects/namespaces'))return;response.body.errors=null;response.body.messages=null;delete response.body.result_info.total_pages;
  if(mode==='false-success')response.body.success=false;
  if(mode==='error-entry')response.body.errors=[{code:10000,message:'never-log-private-message'}];
  if(mode==='missing-errors')delete response.body.errors;if(mode==='wrong-errors')response.body.errors={code:0};
  if(mode==='missing-messages')delete response.body.messages;if(mode==='wrong-messages')response.body.messages='invalid';
  if(mode==='missing-total-count')delete response.body.result_info.total_count;
  if(mode==='incomplete-total')response.body.result_info.total_count++;
  if(mode==='unknown-remainder')response.body.result_info.next_page_token='more';
 };
 const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);safe(r);
});
for(const target of ['deployments','versions','schedules','tails','subdomain','instances-v2','workflows'])test('legacy null envelope metadata is not accepted on other fixed GETs '+target,async()=>{
 const f=fixture();f.mutate=({url,response})=>{if(url.pathname.endsWith('/'+target)||target==='versions'&&url.pathname.includes('/versions/')){response.body.errors=null;response.body.messages=null;}};
 const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);
});

for(const mode of ['missing-class','foreign-class'])test('missing namespace ID cannot match an unknown expected class '+mode,async()=>{
 const f=fixture();f.mutate=({url,response})=>{if(!url.pathname.endsWith('/workers/durable_objects/namespaces'))return;delete response.body.result[0].id;if(mode==='missing-class')delete response.body.result[0].class;else response.body.result[0].class='OtherClass';};
 const r=await f.run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(posts(f).length,0);
});
