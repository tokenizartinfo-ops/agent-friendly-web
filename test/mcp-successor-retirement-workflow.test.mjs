import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const mod=await import('../lib/mcp-successor-retirement-observation.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const opt={skip:typeof mod.runSuccessorRetirementObservation!=='function'};
const hash=x=>createHash('sha256').update(x).digest('hex');
const account='85d0d5dadac3341a564f22ce885e9eec',app='d6fc71552de7494a863aca20365a572d',id='a'.repeat(64);
function fixture(){
 let wall=Date.now(),mono=0;const original=wall;
 const calls={steps:0,rpc:0,gets:0,dispose:0},candidate={containerId:id,applicationId:app,programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
 const policy={startAt:wall-1000,expiresAt:wall+60000,candidate},text=JSON.stringify(policy),observationHash=hash(text);
 const proof=()=>({purpose:'afw.node-retirement-observation.v1',containerId:id,processGeneration:'d'.repeat(64),programHash:candidate.programHash,sourceRevision:candidate.sourceRevision,image:'cloudflare/debian-trixie',createdAt:original-20000,expiresAt:original-10000,closedAt:original-9000,observedAt:wall,physicalStopVerified:false,mayStartSuccessor:false});
 const native={async observeSuccessorRetired(){calls.rpc++;const r=proof();Object.defineProperty(r,Symbol.dispose,{value(){calls.dispose++;},enumerable:false});return r;}};
 const namespace={idFromName(name){assert.equal(name,'afw-own-event-first-successor-v1');return {toString:()=>id};},idFromString(value){assert.equal(value,id);return {toString:()=>id};},get(value){assert.equal(value.toString(),id);return native;}};
 const env={AFW_RELEASE_OPERATOR_ENABLED:'false',AFW_RELEASE_WORKFLOW_ENABLED:'false',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'false',AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED:'true',AFW_RELEASE_RETIREMENT_OBSERVATION_POLICY:text,AFW_RELEASE_EVENTS_NODE:namespace,AFW_RELEASE_READ_TOKEN:'synthetic_read_credential'};
 const event={instanceId:'afw-successor-retired-'+observationHash,payload:{observationHash}};
 const step={async do(name,options,fn){calls.steps++;assert.equal(name,'observe-retired-successor');assert.equal(options.retries.limit,0);return fn();}};
 const fetchImpl=async(url,init)=>{
 calls.gets++;assert.equal(url,'https://api.cloudflare.com/client/v4/accounts/'+account+'/containers/applications/'+app+'/instances/'+id);assert.equal(init.method,'GET');assert.equal(init.redirect,'manual');assert.equal(init.headers.Authorization,'Bearer synthetic_read_credential');
 return Response.json({success:true,errors:[],result:{id,application_id:app,image:'cloudflare/debian-trixie',started_at:new Date(original-19000).toISOString(),status:{state:'stopped',exit_code:0,updated_at:new Date(original-8000).toISOString()}}});};
 const options={env,event,step,fetchImpl,now:()=>wall,monotonicNow:()=>mono};
 return {options,env,event,step,calls,namespace,native,policy,proof,move(w,m){wall+=w;mono+=m;},rehash(){env.AFW_RELEASE_RETIREMENT_OBSERVATION_POLICY=JSON.stringify(policy);event.payload={observationHash:hash(env.AFW_RELEASE_RETIREMENT_OBSERVATION_POLICY)};event.instanceId='afw-successor-retired-'+event.payload.observationHash;},wall:()=>wall};
}
const run=x=>mod.runSuccessorRetirementObservation(x.options);
const noEffects=f=>assert.deepEqual(f.calls,{steps:0,rpc:0,gets:0,dispose:0});
test('native successor retirement observation handler is available',()=>assert.equal(typeof mod.runSuccessorRetirementObservation,'function'));
test('fixed no-argument native custody and two stopped-provider reads produce only scoped retirement evidence',opt,async()=>{
 const f=fixture(),r=await run(f);assert.equal(r.status,'retired_verified');assert.equal(r.mayRetry,false);assert.equal(r.mayRestoreAdministration,false);assert.equal(r.operationalReadiness,false);
 assert.equal(r.evidence.purpose,'afw.retirement-evidence.v1');assert.equal(r.evidence.containerId,id);assert.equal(r.evidence.physicalStopVerified,true);assert.equal(r.evidence.mayStartSuccessor,false);
 assert.deepEqual(f.calls,{steps:1,rpc:2,gets:2,dispose:2});assert.equal(JSON.stringify(r).includes('synthetic_read_credential'),false);assert.equal(JSON.stringify(r).includes('AFW_RELEASE'),false);
});
test('closed opt-in and conflicting release capabilities fail before step or credential access',opt,async()=>{
 for(const change of [f=>delete f.env.AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED,f=>f.env.AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED='false',
 ...['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'].map(k=>f=>f.env[k]='true')]){
 const f=fixture();change(f);let secretReads=0;Object.defineProperty(f.env,'AFW_RELEASE_READ_TOKEN',{get(){secretReads++;throw Error('PRIVATE_SENTINEL');}});
 const r=await run(f);assert.equal(r.status,'blocked');noEffects(f);assert.equal(secretReads,0);}
});
test('policy window shape instance schedule and namespace mismatches cannot select another target',opt,async()=>{
 for(const change of [f=>f.event.payload.extra='PRIVATE_SENTINEL',f=>f.event.payload={observationHash:'e'.repeat(64)},f=>f.event.schedule='cron',
 f=>f.event.instanceId+='-different',f=>f.policy.candidate.containerId='e'.repeat(64),f=>f.policy.candidate.applicationId='e'.repeat(32),
 f=>f.policy.candidate.sourceRevision='invalid',f=>f.policy.expiresAt=f.policy.startAt+600001,
 f=>f.policy.expiresAt=f.wall(),f=>f.policy.startAt=f.wall()+1,f=>f.env.AFW_RELEASE_EVENTS_NODE={...f.namespace,idFromName(){return {toString:()=>'e'.repeat(64)};}}]){
 const f=fixture();change(f);if(!f.event.payload.extra&&!f.event.schedule&&!f.event.instanceId.endsWith('different')&&f.event.payload.observationHash!=='e'.repeat(64))f.rehash();
 const r=await run(f);assert.equal(r.status,'blocked');noEffects(f);}
 const f=fixture();f.env.AFW_RELEASE_RETIREMENT_OBSERVATION_POLICY+=' ';assert.equal((await run(f)).status,'blocked');noEffects(f);
});
test('one ORIGINAL five-second budget includes queued step and rejects wall or monotonic rewind',opt,async()=>{
 for(const drift of ['mono-expiry','wall-expiry','mono-rewind','wall-rewind']){
 const f=fixture(),doStep=f.step.do;f.step.do=async(...a)=>{if(drift==='mono-expiry')f.move(0,5000);if(drift==='wall-expiry')f.move(60000,0);if(drift==='mono-rewind')f.move(0,-1);if(drift==='wall-rewind')f.move(-1,0);return doStep(...a);};
 const r=await run(f);assert.equal(r.status,'uncertain');assert.equal(f.calls.rpc,0);assert.equal(f.calls.gets,0);}
});
test('raw policy namespace methods flags and credentials remain fenced across awaits',opt,async()=>{
 for(const change of [f=>f.env.AFW_RELEASE_RETIREMENT_OBSERVATION_POLICY+=' ',f=>f.env.AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED='false',
 f=>f.env.AFW_RELEASE_READ_TOKEN='replacement_read_credential',f=>f.namespace.idFromName=()=>({toString:()=>id}),f=>f.env.AFW_RELEASE_EVENTS_NODE={...f.namespace}]){
 const f=fixture(),original=f.native.observeSuccessorRetired;f.native.observeSuccessorRetired=async()=>{const r=await original();change(f);return r;};
 const r=await run(f);assert.equal(r.status,'uncertain');assert.equal(f.calls.gets,0);assert.equal(f.calls.rpc,1);}
});
test('wrong or running provider result and malformed custody never authorize restoration or retry',opt,async()=>{
 for(const mode of ['running','foreign-id','wrong-source','missing-custody','rpc-unknown']){
 const f=fixture();
 if(mode==='wrong-source'||mode==='missing-custody'||mode==='rpc-unknown')f.native.observeSuccessorRetired=async()=>{f.calls.rpc++;if(mode==='rpc-unknown')throw Error('PRIVATE_SENTINEL');const p=f.proof();if(mode==='wrong-source')p.sourceRevision='e'.repeat(40);else delete p.closedAt;return p;};
 else{const original=f.options.fetchImpl;f.options.fetchImpl=async(...a)=>{const body=await (await original(...a)).json();if(mode==='running')body.result.status.state='running';else body.result.id='e'.repeat(64);return Response.json(body);};}
 const r=await run(f);assert.equal(r.status,'uncertain');assert.equal(r.evidence,undefined);assert.equal(f.calls.steps,1);assert.ok(f.calls.rpc<=1);assert.ok(f.calls.gets<=1);assert.equal(JSON.stringify(r).includes('PRIVATE_SENTINEL'),false);}
});
test('a held RPC expires at the original deadline without later provider dispatch',opt,async()=>{
 const f=fixture();f.policy.expiresAt=f.wall()+80;f.rehash();let release,entered;
 const started=new Promise(resolve=>{entered=resolve;});f.native.observeSuccessorRetired=()=>{f.calls.rpc++;entered();return new Promise(resolve=>{release=()=>resolve(f.proof());});};
 const pending=run(f);await started;const r=await pending;assert.equal(r.status,'uncertain');release();await new Promise(r=>setTimeout(r,15));assert.equal(f.calls.rpc,1);assert.equal(f.calls.gets,0);
});
test('stalled provider body is bounded and never becomes late successful evidence',opt,async()=>{
 const f=fixture();f.policy.expiresAt=f.wall()+80;f.rehash();f.options.fetchImpl=async()=>{f.calls.gets++;return new Response(new ReadableStream({start(){}}),{headers:{'Content-Type':'application/json'}});};
 const r=await run(f);assert.equal(r.status,'uncertain');assert.equal(r.evidence,undefined);assert.equal(f.calls.gets,1);
});

test('native-style fresh bound step method is captured once instead of compared by property identity',opt,async()=>{
 const f=fixture(),original=f.step.do;let reads=0;
 Object.defineProperty(f.step,'do',{get(){reads++;return function(...args){return original.apply(f.step,args);};}});
 const r=await run(f);assert.equal(r.status,'retired_verified');assert.equal(f.calls.steps,1);assert.equal(f.calls.gets,2);assert.equal(reads,2);
});
