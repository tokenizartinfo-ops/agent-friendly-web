import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {mkdtempSync, rmSync, readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {URL, fileURLToPath} from 'node:url';
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
 ['expired',r=>{r.status='expired';r.expires_on='2026-10-31T16:00:00Z';r.not_before='2026-10-30T16:00:00Z';},{tokenStatus:'expired'}],
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
for (const where of ['fetch', 'body']) test('abort releases held ' + where, async () => {
 const f = fixture(), controller = new AbortController();
 f.args.signal = controller.signal;
 let observedSignal;
 f.args.fetchImpl = async (_url, init) => {
  observedSignal = init.signal;
  if (where === 'fetch') return new Promise(() => {});
  return {
   status: 200, headers: new Headers({date: new Date(START).toUTCString()}),
   body: {getReader: () => ({read: () => new Promise(() => {}), cancel: async () => {}, releaseLock() {}})},
  };
 };
 const pending = runQaBootstrapCustodyInspection(f.args);
 setTimeout(() => controller.abort(), 5);
 const dto = await pending;
 assert.equal(dto.status, 'blocked'); assert.equal(observedSignal.aborted, true); safe(dto);
});
test('request watchdog settles ignored abort transport within five seconds',async()=>{const f=fixture();f.args.fetchImpl=()=>new Promise(()=>{});const began=performance.now();const dto=await runQaBootstrapCustodyInspection(f.args);assert.equal(dto.status,'blocked');assert.ok(performance.now()-began<6500);safe(dto);});
test('provider exception and credential rejection are sanitized',async()=>{for(const where of ['readCredential','fetchImpl']){const f=fixture();f.args[where]=async()=>{throw Error('CREDENTIAL_SENTINEL');};safe(await runQaBootstrapCustodyInspection(f.args));}});
test('source workflow and CLI remain fixed and credential lazy',async()=>{const workflow=await readFile(new URL('../.github/workflows/afw-qa-bootstrap-custody-inspection.yml',import.meta.url),'utf8');assert.match(workflow,/issue_comment:/);assert.match(workflow,/types: \[created\]/);assert.match(workflow,/timeout-minutes: 5/);assert.match(workflow,/environment: afw-qa-cloud-closed-rollback/);assert.match(workflow,/contents: read/);assert.doesNotMatch(workflow,/contents: write|workflow_dispatch:|schedule:|npm ci|wrangler|GITHUB_TOKEN:/);assert.match(workflow,/retention-days: 7/);assert.match(workflow,/path: afw-qa-bootstrap-custody-inspection\/result.json/);assert.match(workflow,/persist-credentials: false/);const cli=await readFile(new URL('../scripts/qa-bootstrap-custody-inspection.mjs',import.meta.url),'utf8');assert.match(cli,/readCredential: \(\) => process.env.AFW_QA_CLOSED_TOKEN/);assert.doesNotMatch(cli,/console\.|process.stdout|process.stderr/);});
test('CLI rejects arguments with only a fixed sanitized artifact', () => {
 const directory = mkdtempSync(join(tmpdir(), 'afw-custody-entry-test-'));
 try {
  const cli = fileURLToPath(new URL('../scripts/qa-bootstrap-custody-inspection.mjs', import.meta.url));
  const p = spawnSync(process.execPath, [cli, 'bad'], {cwd:directory,env:{PATH:process.env.PATH},encoding:'utf8'});
  assert.equal(p.status,1); assert.equal(p.stdout,''); assert.equal(p.stderr,'');
  const dto = JSON.parse(readFileSync(join(directory,'afw-qa-bootstrap-custody-inspection/result.json'),'utf8'));
  assert.equal(dto.status,'blocked'); safe(dto);
 } finally { rmSync(directory,{recursive:true,force:true}); }
});
test('successful informational message code 10000 is not an error', async () => {
 const f = fixture();
 f.args.fetchImpl = async () => new Response(JSON.stringify({success:true,errors:[],messages:[{code:10000,message:'This API Token is valid and active. CREDENTIAL_SENTINEL'}],result:f.result}),{headers:{date:new Date(START).toUTCString()}});
 const dto = await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'verified'); assert.deepEqual(dto.errorCodes,[]); assert.equal(dto.expectedTokenMatch,true); safe(dto);
});
test('clock reversal during transport cannot retain metadata', async () => {
 const f=fixture();
 f.args.fetchImpl=async()=>{f.clock.wall--;return f.response();};
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked'); assert.equal(dto.tokenId,null); safe(dto);
});
test('monotonic request end cannot be extended by a stationary wall clock', async () => {
 const f=fixture();
 f.args.fetchImpl=async()=>{f.clock.mono+=5000;return f.response();};
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked'); assert.equal(dto.tokenId,null); safe(dto);
});
test('malformed informational messages remain secret-free failures', async () => {
 const f=fixture();
 f.args.fetchImpl=async()=>new Response(JSON.stringify({success:true,errors:[],messages:[{code:'10000',message:'CREDENTIAL_SENTINEL'}],result:f.result}),{headers:{date:new Date(START).toUTCString()}});
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked'); safe(dto);
});

const infoMessage = () => ({code:10000,message:'This API Token is valid and active',documentation_url:'https://example.invalid/CREDENTIAL_SENTINEL',source:{pointer:'/CREDENTIAL_SENTINEL'}});
function infoResponse(f, message, status=200) {
 return new Response(JSON.stringify({success:status===200,errors:status===200?[]:[message],messages:status===200?[message]:[],result:status===200?f.result:null}),{status,headers:{date:new Date(START).toUTCString()}});
}
for (const [name, change] of [
 ['documented extras',()=>{}],
 ['documentation only',message=>delete message.source],
 ['source only',message=>delete message.documentation_url],
 ['empty source',message=>message.source={}],
 ['bounded strings',message=>{message.documentation_url='x'.repeat(2048);message.source.pointer='y'.repeat(2048);}],
]) test('accepts informational message '+name+' without following or echoing fields', async()=>{
 const f=fixture(), message=infoMessage(); change(message);
 let requests=0;
 f.args.fetchImpl=async()=>{requests++;return infoResponse(f,message);};
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'verified');assert.equal(dto.tokenId,ID);assert.deepEqual(dto.errorCodes,[]);assert.equal(requests,1);safe(dto);
 assert.doesNotMatch(JSON.stringify(dto),/example.invalid|documentation_url|pointer/);
});
for (const [name, change] of [
 ['unknown key',message=>message.extra=true],
 ['documentation null',message=>message.documentation_url=null],
 ['documentation object',message=>message.documentation_url={}],
 ['documentation oversized',message=>message.documentation_url='x'.repeat(2049)],
 ['source null',message=>message.source=null],
 ['source array',message=>message.source=[]],
 ['source string',message=>message.source='CREDENTIAL_SENTINEL'],
 ['source unknown key',message=>message.source={path:'CREDENTIAL_SENTINEL'}],
 ['pointer null',message=>message.source.pointer=null],
 ['pointer number',message=>message.source.pointer=1],
 ['pointer oversized',message=>message.source.pointer='x'.repeat(2049)],
 ['missing code',message=>delete message.code],
 ['missing message',message=>delete message.message],
]) test('rejects malformed informational optional field '+name, async()=>{
 const f=fixture(),message=infoMessage();change(message);
 f.args.fetchImpl=async()=>infoResponse(f,message);
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked');assert.equal(dto.tokenId,null);assert.deepEqual(dto.errorCodes,[]);safe(dto);
});
test('rejected response with documented error extras keeps numeric code only', async()=>{
 const f=fixture();
 f.args.fetchImpl=async()=>infoResponse(f,infoMessage(),401);
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked');assert.equal(dto.httpStatus,401);assert.deepEqual(dto.errorCodes,[10000]);safe(dto);
 assert.doesNotMatch(JSON.stringify(dto),/example.invalid|documentation_url|pointer/);
});

const neutralShape = () => ({
 envelopeExtraFields:0, messageExtraFields:0, messagesWithNullType:0, resultExtraFields:0,
 notBeforeIsNull:false, expiryIsNull:false, errorsNonempty:false,
});
function diagnosticResponse(f, envelope) {
 return new Response(JSON.stringify(envelope), {headers:{date:new Date(f.clock.wall).toUTCString()}});
}
for (const [name, mutate, group, shape] of [
 ['own null type',e=>e.messages=[{code:10000,message:'CREDENTIAL_SENTINEL',type:null}],'messages',{messageExtraFields:1,messagesWithNullType:1}],
 ['string type',e=>e.messages=[{code:10000,message:'CREDENTIAL_SENTINEL',type:'CREDENTIAL_SENTINEL'}],'messages',{messageExtraFields:1}],
 ['null timestamps',e=>{e.result.not_before=null;e.result.expires_on=null;},'timestamps',{notBeforeIsNull:true,expiryIsNull:true}],
 ['unknown envelope and result',e=>{e.CREDENTIAL_SENTINEL='CREDENTIAL_SENTINEL';e.result.CREDENTIAL_SENTINEL='CREDENTIAL_SENTINEL';},'envelope',{envelopeExtraFields:1,resultExtraFields:1}],
 ['malformed message slots',e=>e.messages=[null,[],1],'messages',{}],
 ['nonempty errors',e=>e.errors=[{code:10000,message:'CREDENTIAL_SENTINEL'}],'envelope',{errorsNonempty:true}],
 ['bad result status',e=>e.result.status='CREDENTIAL_SENTINEL','result',{}],
 ['bad timestamp',e=>e.result.expires_on='CREDENTIAL_SENTINEL','timestamps',{}],
 ['nonobject envelope',()=>{},'envelope',{}],
]) test('diagnoses fixed structural group: '+name, async()=>{
 const f=fixture(), e={success:true,errors:[],messages:[],result:{...f.result}}; mutate(e);
 f.args.fetchImpl=async()=>diagnosticResponse(f,name==='nonobject envelope'?[]:e);
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked'); assert.equal(dto.failure,'invalid_response');assert.equal(dto.httpStatus,200);
 assert.equal(dto.responseSchema,group);assert.deepEqual(dto.responseShape,{...neutralShape(),...shape});
 assert.equal(dto.tokenId,null);safe(dto);
});
for(const [name, make, group] of [
 ['headers',f=>f.response(f.result,200,{age:'1'}),'headers'],
 ['stream',()=>({status:200,headers:new Headers({date:new Date(START).toUTCString()}),body:{getReader:()=>({read:async()=>({done:false,value:'CREDENTIAL_SENTINEL'}),cancel:async()=>{},releaseLock(){}})}}),'stream'],
 ['json',()=>new Response('{CREDENTIAL_SENTINEL',{headers:{date:new Date(START).toUTCString()}}),'json'],
])test('diagnosis before parsed JSON: '+name,async()=>{
 const f=fixture(); f.args.fetchImpl=async()=>make(f);
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked');assert.equal(dto.responseSchema,group);assert.equal(dto.responseShape,null);safe(dto);
});
test('diagnosis counts saturate without exposing unknown names or values',async()=>{
 const f=fixture(),e={success:true,errors:[],messages:[],result:{...f.result}};
 for(let i=0;i<20;i++){e['CREDENTIAL_SENTINEL'+i]=i;e.result['CREDENTIAL_SENTINEL'+i]=i;e.messages.push({code:1,message:'CREDENTIAL_SENTINEL',type:null,['CREDENTIAL_SENTINEL'+i]:i});}
 f.args.fetchImpl=async()=>diagnosticResponse(f,e);
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked');assert.equal(dto.responseSchema,'envelope');
 assert.deepEqual(dto.responseShape,{...neutralShape(),envelopeExtraFields:16,messageExtraFields:16,messagesWithNullType:16,resultExtraFields:16});safe(dto);
});
test('diagnosis helper ignores accessors and inherited nulls without evaluating them',async()=>{
 const source=await readFile(new URL('../lib/mcp-qa-bootstrap-custody-inspection.mjs',import.meta.url),'utf8');
 const {diagnoseResponseShape}=await import('data:text/javascript,'+encodeURIComponent(source+'\nexport {diagnoseResponseShape};'));
 let invoked=0; const getter={get(){invoked++;throw Error('CREDENTIAL_SENTINEL');},enumerable:true};
 const result={id:ID,status:'active'};Object.defineProperty(result,'not_before',getter);Object.defineProperty(result,'expires_on',getter);
 const message={code:1,message:'CREDENTIAL_SENTINEL'};Object.defineProperty(message,'type',getter);
 const e={success:true,errors:[],messages:[message],result};Object.defineProperty(e,'CREDENTIAL_SENTINEL',getter);
 assert.deepEqual(diagnoseResponseShape(e),{...neutralShape(),envelopeExtraFields:1,messageExtraFields:1});
 for(const key of ['messages','errors','result'])Object.defineProperty(e,key,getter);
 assert.deepEqual(diagnoseResponseShape(e),{...neutralShape(),envelopeExtraFields:1});
 assert.deepEqual(diagnoseResponseShape(Object.create({result:{not_before:null,expires_on:null},errors:[1]})),neutralShape());
 assert.equal(invoked,0);
});
test('successful and pre-response outcomes expose no documentary response evidence',async()=>{
 for(const where of ['success','admission','credential','fetch']){
  const f=fixture();if(where==='admission')f.context.actorId='1';if(where==='credential')f.args.readCredential=()=>'';if(where==='fetch')f.args.fetchImpl=async()=>{throw Error('CREDENTIAL_SENTINEL');};
  const dto=await runQaBootstrapCustodyInspection(f.args);
  assert.equal(dto.status,where==='success'?'verified':'blocked');assert.equal(dto.responseSchema,null);assert.equal(dto.responseShape,null);safe(dto);
 }
});
for(const kind of ['expiry','abort'])test('settlement diagnosis cannot retain verified metadata after '+kind,async()=>{
 const f=fixture(),controller=new AbortController();f.args.signal=controller.signal;
 f.args.fetchImpl=async()=>{const response=f.response(),reader=response.body.getReader();return {status:response.status,headers:response.headers,body:{getReader:()=>({read:()=>reader.read(),cancel:()=>reader.cancel(),releaseLock(){reader.releaseLock();if(kind==='expiry'){f.clock.wall+=5000;f.clock.mono+=5000;}else controller.abort();}})}};};
 const dto=await runQaBootstrapCustodyInspection(f.args);
 assert.equal(dto.status,'blocked');assert.equal(dto.responseSchema,'settlement');assert.deepEqual(dto.responseShape,neutralShape());
 for(const key of ['observedAt','tokenId','tokenStatus','expiresAt','notBefore','expectedTokenMatch'])assert.equal(dto[key],null);safe(dto);
});
test('CLI entry denial includes only the complete fixed DTO field contract',()=>{
 const directory=mkdtempSync(join(tmpdir(),'afw-custody-diagnostic-test-'));
 try{
  const cli=fileURLToPath(new URL('../scripts/qa-bootstrap-custody-inspection.mjs',import.meta.url));
  const p=spawnSync(process.execPath,[cli,'bad'],{cwd:directory,env:{PATH:process.env.PATH},encoding:'utf8'});
  assert.equal(p.status,1);assert.equal(p.stdout,'');assert.equal(p.stderr,'');
  const bytes=readFileSync(join(directory,'afw-qa-bootstrap-custody-inspection/result.json'));
  assert.ok(bytes.byteLength<=4096);const dto=JSON.parse(bytes);
  assert.deepEqual(Object.keys(dto).sort(),['purpose','status','failure','observedAt','sourceRevision','commentId','runId','tokenId','tokenStatus','notBefore','expiresAt','expectedTokenMatch','readOnly','scopeVerified','workflowCreateVerified','operationalReadiness','mayRetry','httpStatus','errorCodes','responseSchema','responseShape'].sort());
  assert.equal(dto.responseSchema,null);assert.equal(dto.responseShape,null);safe(dto);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
