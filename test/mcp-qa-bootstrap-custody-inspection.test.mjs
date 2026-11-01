import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {runQaBootstrapCustodyInspection} from '../lib/mcp-qa-bootstrap-custody-inspection.mjs';
const SHA='a'.repeat(40), ID='9db7901af95faf07e6f7ef378045328e';
const START=Date.parse('2026-11-01T16:00:00Z');
const user=()=>({id:290715446,login:'tokenizartinfo-ops',type:'User'});
function fixture(){
 const clock={wall:START,mono:10};
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web',default_branch:'main',owner:user()},sender:user(),issue:{number:497},comment:{id:123,user:user(),author_association:'OWNER',created_at:new Date(START-1000).toISOString(),body:'/afw-qa-bootstrap-custody-inspect v1 '+SHA}};
 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',repositoryOwner:'tokenizartinfo-ops',repositoryOwnerId:'290715446',actor:'tokenizartinfo-ops',actorId:'290715446',ref:'refs/heads/main',eventName:'issue_comment',runId:'456',runAttempt:'1',sourceRevision:SHA};
 const calls=[],counts={reads:0};
 const result={id:ID,status:'active',expires_on:'2026-11-08T16:00:00Z',not_before:'2026-11-01T15:00:00Z'};
 const response=(value=result,status=200,headers={})=>new Response(JSON.stringify({success:status===200,errors:status===200?[]:[{code:10000,message:'CREDENTIAL_SENTINEL'}],messages:[],result:value}),{status,headers:{date:new Date(clock.wall).toUTCString(),...headers}});
 const args={event,context,now:{wall:()=>clock.wall,monotonic:()=>clock.mono},readCredential:()=>{counts.reads++;return 'opaque-CREDENTIAL_SENTINEL';},fetchImpl:async(url,init)=>{calls.push({url,init});return response();}};
 return {args,clock,event,context,calls,counts,result,response};
}
function safe(dto){const text=JSON.stringify(dto);assert.ok(text.length<4096);assert.doesNotMatch(text,/CREDENTIAL_SENTINEL|Authorization|cloudflare|\/accounts\//);for(const k of ['scopeVerified','workflowCreateVerified','operationalReadiness','mayRetry'])assert.equal(dto[k],false);assert.equal(dto.readOnly,true);}
const denied=[
 ['owner',f=>f.event.repository.owner.id++],['repo id',f=>f.event.repository.id++],['repo name',f=>f.event.repository.full_name+='x'],
 ['sender',f=>f.event.sender.id++],['comment user',f=>f.event.comment.user.type='Bot'],['association',f=>f.event.comment.author_association='MEMBER'],
 ['issue',f=>f.event.issue.number++],['PR',f=>f.event.issue.pull_request={}],['action',f=>f.event.action='edited'],['event',f=>f.context.eventName='push'],
 ['attempt',f=>f.context.runAttempt='2'],['branch',f=>f.context.ref='refs/heads/other'],['source',f=>f.event.comment.body+='x'],
 ['actor',f=>f.context.actorId='1'],['owner context',f=>f.context.repositoryOwnerId='1'],['future',f=>f.event.comment.created_at=new Date(START+1).toISOString()],
 ['stale',f=>f.event.comment.created_at=new Date(START-300000).toISOString()],['aborted',f=>f.args.signal=AbortSignal.abort()],
 ['getter',f=>Object.defineProperty(f.event.comment,'body',{get(){throw Error('CREDENTIAL_SENTINEL');}})],
 ['clock reversal',f=>{let n=0;f.args.now.wall=()=>START-(n++>0?1:0);}],
 ['monotonic reversal',f=>{let n=0;f.args.now.monotonic=()=>10-(n++>0?1:0);}],
];
for(const [name,mutate] of denied)test('denies before credential: '+name,async()=>{const f=fixture();mutate(f);const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');assert.equal(f.counts.reads,0);assert.equal(f.calls.length,0);safe(dto);});
test('one fixed GET observes actual identity and limits authority',async()=>{const f=fixture();const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'verified');assert.equal(dto.tokenId,ID);assert.equal(dto.expectedTokenMatch,true);assert.equal(dto.expiresAt,f.result.expires_on);assert.equal(dto.sourceRevision,SHA);assert.equal(dto.commentId,'123');assert.equal(dto.runId,'456');assert.equal(f.counts.reads,1);assert.equal(f.calls.length,1);const {url,init}=f.calls[0];assert.equal(url,'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/tokens/verify');assert.equal(init.method,'GET');assert.equal(init.redirect,'error');assert.equal(init.body,undefined);assert.equal(init.headers.Authorization,'Bearer opaque-CREDENTIAL_SENTINEL');safe(dto);});
for(const [name,change,expected] of [
 ['mismatch',r=>r.id='b'.repeat(32),{expectedTokenMatch:false}],
 ['expired',r=>{r.status='expired';r.expires_on='2026-10-31T16:00:00Z';},{tokenStatus:'expired'}],
 ['disabled',r=>r.status='disabled',{tokenStatus:'disabled'}],
 ['missing expiry',r=>{delete r.expires_on;delete r.not_before;},{expiresAt:null,notBefore:null}],
])test('truthful '+name,async()=>{const f=fixture();change(f.result);f.args.fetchImpl=async()=>f.response();const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'verified');for(const [k,v]of Object.entries(expected))assert.equal(dto[k],v);safe(dto);});
for(const [name,value] of [['empty',''],['newline','abc\ndef'],['spaces',' abc'],['unicode','α'],['huge','x'.repeat(4097)]])test('invalid opaque credential '+name,async()=>{const f=fixture();f.args.readCredential=()=>value;const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');assert.equal(f.calls.length,0);safe(dto);});
test('401 numeric code only without provider text',async()=>{const f=fixture();f.args.fetchImpl=async()=>f.response(null,401);const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');assert.equal(dto.httpStatus,401);assert.deepEqual(dto.errorCodes,[10000]);assert.equal(dto.tokenId,null);safe(dto);});
for(const [name,make]of [
 ['malformed',f=>new Response('{',{headers:{date:new Date(f.clock.wall).toUTCString()}})],
 ['oversized',f=>new Response('x'.repeat(8193),{headers:{date:new Date(f.clock.wall).toUTCString()}})],
 ['unknown result',f=>f.response({...f.result,permissions:['x']})],
 ['unknown envelope',f=>new Response(JSON.stringify({success:true,errors:[],messages:[],result:f.result,unexpected:true}),{headers:{date:new Date(f.clock.wall).toUTCString()}})],
 ['unknown status',f=>f.response({...f.result,status:'enabled'})],
 ['bad date',f=>f.response({...f.result,expires_on:'nonsense'})],
 ['stale date',f=>f.response(f.result,200,{date:new Date(f.clock.wall-60000).toUTCString()})],
 ['future date',f=>f.response(f.result,200,{date:new Date(f.clock.wall+60000).toUTCString()})],
 ['cache',f=>f.response(f.result,200,{age:'1'})],
 ['no date',()=>new Response('{}')],
 ['throwing response',()=>Object.defineProperty({},'status',{get(){throw Error('CREDENTIAL_SENTINEL');}})],
])test('reject response '+name,async()=>{const f=fixture();f.args.fetchImpl=async()=>make(f);const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');assert.equal(dto.tokenId,null);safe(dto);});
for(const where of ['credential','fetch','body'])test('late '+where+' cannot settle verified',async()=>{const f=fixture();const late=()=>{f.clock.wall+=5000;f.clock.mono+=5000;};if(where==='credential')f.args.readCredential=async()=>{late();return 'opaque-CREDENTIAL_SENTINEL';};if(where==='fetch')f.args.fetchImpl=async()=>{late();return f.response();};if(where==='body')f.args.fetchImpl=async()=>({status:200,headers:new Headers({date:new Date(START).toUTCString()}),body:{getReader:()=>({read:async()=>{late();return {done:true};},cancel:async()=>{},releaseLock(){}})}});const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');assert.equal(dto.tokenId,null);safe(dto);});
test('original queued command deadline limits request',async()=>{const f=fixture();f.event.comment.created_at=new Date(START-299999).toISOString();f.args.fetchImpl=async()=>{f.clock.wall++;f.clock.mono++;return f.response();};const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');safe(dto);});
for(const where of ['fetch','body'])test('abort releases held '+where,async()=>{const f=fixture();const controller=new AbortController();f.args.signal=controller.signal;let observedSignal;if(where==='fetch')f.args.fetchImpl=async(_u,init)=>{observedSignal=init.signal;return new Promise(()=>{});};else f.args.fetchImpl=async(_u,init)=>{observedSignal=init.signal;return {status:200,headers:new Headers({date:new Date(START).toUTCString()}),body:{getReader:()=>({read:()=>new Promise(()=>{}),cancel:async()=>{},releaseLock(){}})}};const pending=runQaBootstrapCustodyInspection(f.args);setTimeout(()=>controller.abort(),5);const dto=await pending;assert.equal(dto.status,'blocked');assert.equal(observedSignal.aborted,true);safe(dto);});
test('request watchdog settles ignored abort transport within five seconds',async()=>{const f=fixture();f.args.fetchImpl=()=>new Promise(()=>{});const began=performance.now();const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');assert.ok(performance.now()-began<6500);safe(dto);});
test('provider exception and credential rejection are sanitized',async()=>{for(const where of ['readCredential','fetchImpl']){const f=fixture();f.args[where]=async()=>{throw Error('CREDENTIAL_SENTINEL');};safe(await runQaBootstrapCustodyInspection(f.args));}});
test('source workflow and CLI remain fixed and credential lazy',async()=>{const workflow=await readFile(new URL('../.github/workflows/afw-qa-bootstrap-custody-inspection.yml',import.meta.url),'utf8');assert.match(workflow,/issue_comment:/);assert.match(workflow,/types: \[created\]/);assert.match(workflow,/timeout-minutes: 5/);assert.match(workflow,/environment: afw-qa-cloud-closed-rollback/);assert.match(workflow,/contents: read/);assert.doesNotMatch(workflow,/contents: write|workflow_dispatch:|schedule:|npm ci|wrangler|GITHUB_TOKEN:/);assert.match(workflow,/retention-days: 7/);assert.match(workflow,/path: afw-qa-bootstrap-custody-inspection\/result.json/);assert.match(workflow,/persist-credentials: false/);const cli=await readFile(new URL('../scripts/qa-bootstrap-custody-inspection.mjs',import.meta.url),'utf8');assert.match(cli,/readCredential: \(\) => process.env.AFW_QA_CLOSED_TOKEN/);assert.doesNotMatch(cli,/console\.|process.stdout|process.stderr/);});
test('CLI rejects arguments without exposing data',()=>{const p=spawnSync(process.execPath,['scripts/qa-bootstrap-custody-inspection.mjs','bad'],{env:{PATH:process.env.PATH},encoding:'utf8'});assert.equal(p.status,1);assert.equal(p.stdout,'');assert.equal(p.stderr,'');});
