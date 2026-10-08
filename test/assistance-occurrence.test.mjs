import test from 'node:test';
import assert from 'node:assert/strict';
import {runAssistanceOccurrence as run} from '../lib/assistance-occurrence.mjs';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createOccurrenceFileCheckpoint} from '../lib/operations-occurrence-checkpoint.mjs';
const id='12345678-1234-4234-8234-123456789abc';
const signal={version:'afw-assistance-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:11,kind:'assistance_requested',topic:'orientation',observedAt:'2026-10-08T12:00:00.000Z'};
function fixture(){
 let time=Date.parse(signal.observedAt),created=false,sequence=0;
 const writes=[],calls=[];
 const manifest={occurrenceId:id,requestId:id,signal,sourceRevision:'c'.repeat(40),configId:'cecfg_test',publicationId:'cecfgver_test',startAt:time,deadline:time+60000,tokenExpiresAt:time+60000,serverDeadline:time+60000};
 const observation={sourceRevision:manifest.sourceRevision,configId:manifest.configId,publicationId:manifest.publicationId,origin:'https://github.com/tokenizartinfo-ops/agent-friendly-web.git',observedAt:time,observationRevision:1,configurationRevision:1,observationsCurrent:true,networkMode:'restricted',networkEnforced:true,operationsBindingsReady:true};
 const checkpoint={async create(receipt){if(created)return false;created=true;writes.push(receipt);return true;},async advance(expected,receipt){if(expected!==sequence)return false;sequence++;writes.push(receipt);return true;}};
 const client={async listAssistance(){calls.push('list');return [signal];},async claimAssistance(){calls.push('claim');return {eventId:signal.eventId,requestId:id,runId:id,expiresAt:time+30000};},async finishAssistance(runId,outcome){calls.push('finish');assert.equal(outcome,'intervention_required');return outcome;}};
 return {manifest,observation,checkpoint,client,writes,calls,now:()=>time,preflight:async()=>observation,move:ms=>{time+=ms;}};
}
test('one occurrence persists each attempt before its three calls and closes without private context',async()=>{
 const f=fixture();
 for(const [method,stage] of [['listAssistance','list'],['claimAssistance','claim'],['finishAssistance','finish']]){
  const original=f.client[method]; f.client[method]=async(...args)=>{assert.equal(f.writes.at(-1).phase,stage);assert.equal(f.writes.at(-1).state,'attempted');return original(...args);};
 }
 const result=await run(f);assert.deepEqual(f.calls,['list','claim','finish']);assert.equal(result.status,'completed');assert.equal(result.outcome,'intervention_required');assert.equal(f.writes.at(-1).state,'completed');
 assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,3);
});
test('two concurrent starters share one exclusive occurrence',async()=>{
 const f=fixture(),results=await Promise.all([run(f),run(f)]);assert.equal(results.filter(x=>x.status==='completed').length,1);assert.equal(f.calls.length,3);
});
test('lost claim response stops with attempted intent preserved and never resends',async()=>{
 const f=fixture();f.client.claimAssistance=async()=>{f.calls.push('claim');throw Error('private response forbidden');};
 const result=await run(f);assert.equal(result.status,'stopped');assert.deepEqual(f.calls,['list','claim']);assert.equal(JSON.stringify(result).includes('private'),false);await run(f);assert.equal(f.calls.length,2);
});
test('changed or stale cloud preflight makes zero operational calls',async()=>{
 for(const patch of [{sourceRevision:'d'.repeat(40)},{configId:'other'},{publicationId:'other'},{observationsCurrent:false},{networkEnforced:false},{networkMode:'unrestricted'},{operationsBindingsReady:false},{observationRevision:2},{observedAt:Date.parse(signal.observedAt)-31000}]){
  const f=fixture();Object.assign(f.observation,patch);assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,0);
 }
});
test('expiry after checkpoint persistence prevents sending even a budgeted intent',async()=>{
 const f=fixture(),advance=f.checkpoint.advance;f.checkpoint.advance=async(...args)=>{const ok=await advance(...args);f.move(60000);return ok;};
 assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,0);
});
test('preflight that becomes stale while persisting prevents the first send',async()=>{
 const f=fixture(),advance=f.checkpoint.advance;
 for(const key of ['deadline','tokenExpiresAt','serverDeadline'])f.manifest[key]=f.now()+120000;
 f.checkpoint.advance=async(...args)=>{const result=await advance(...args);f.move(31000);return result;};
 assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,0);
});
test('the entire request timeout must fit all deadlines including the lease',async()=>{
 for(const field of ['deadline','tokenExpiresAt','serverDeadline']){const f=fixture();f.manifest[field]=f.now()+10000;assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,0);}
 const f=fixture();f.client.claimAssistance=async()=>{f.calls.push('claim');return {eventId:signal.eventId,requestId:id,runId:id,expiresAt:f.now()+10000};};assert.equal((await run(f)).status,'stopped');assert.deepEqual(f.calls,['list','claim']);
});
test('exact current event is required; missing, duplicate and changed revisions do not claim',async()=>{
 for(const signals of [[],[signal,signal],[{...signal,revision:10}],[{...signal,privateText:'forbidden'}]]){const f=fixture();f.client.listAssistance=async()=>{f.calls.push('list');return signals;};assert.equal((await run(f)).status,'stopped');assert.deepEqual(f.calls,['list']);}
});
test('bad or uncorrelated reservations never finish',async()=>{
 for(const patch of [{eventId:'d'.repeat(64)},{requestId:'87654321-1234-4234-8234-123456789abc'},{runId:'invalid'},{expiresAt:0},{privateText:'forbidden'}]){const f=fixture();f.client.claimAssistance=async()=>{f.calls.push('claim');return {eventId:signal.eventId,requestId:id,runId:id,expiresAt:f.now()+30000,...patch};};assert.equal((await run(f)).status,'stopped');assert.deepEqual(f.calls,['list','claim']);}
});
test('failed checkpoint or backwards clock stops before the next call',async()=>{
 const f=fixture();f.checkpoint.advance=async()=>false;assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,0);
 const g=fixture(),list=g.client.listAssistance;g.client.listAssistance=async()=>{const result=await list();g.move(-1);return result;};assert.equal((await run(g)).status,'stopped');assert.deepEqual(g.calls,['list']);
});
test('no future occurrence, extra manifest fields or claimed resolution is accepted',async()=>{
 for(const patch of [{startAt:Date.parse(signal.observedAt)+1000},{privateText:'forbidden'}]){const f=fixture();Object.assign(f.manifest,patch);assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,0);}
 const f=fixture();f.client.finishAssistance=async()=>{f.calls.push('finish');return 'resolved';};assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,3);
});
test('manifest mutation during a checkpoint wait cannot extend the permitted window',async()=>{
 const f=fixture(),create=f.checkpoint.create;
 f.checkpoint.create=async receipt=>{const ok=await create(receipt);f.move(60000);f.observation.observedAt=f.now();f.manifest.deadline+=120000;f.manifest.serverDeadline+=120000;f.manifest.tokenExpiresAt+=120000;return ok;};
 assert.equal((await run(f)).status,'stopped');assert.equal(f.calls.length,0);
});
test('coercible identifiers cannot persist nested private data',async()=>{
 const f=fixture();f.manifest.requestId={toString:()=>id,privateText:'forbidden'};
 assert.equal((await run(f)).status,'stopped');assert.equal(f.writes.length,0);assert.equal(f.calls.length,0);
 const g=fixture();g.manifest.signal={...signal,eventId:{toString:()=>signal.eventId,privateText:'forbidden'}};
 assert.equal((await run(g)).status,'stopped');assert.equal(g.writes.length,0);
});
test('file checkpoints preserve exclusive ownership across newly constructed runners',{skip:process.platform==='win32'},async()=>{
 const make=createOccurrenceFileCheckpoint;
 const root=await mkdtemp(join(tmpdir(),'afw-occurrence-'));
 try{
  const f=fixture();f.checkpoint=make(root,id);assert.equal((await run(f)).status,'completed');
  const g=fixture();g.checkpoint=make(root,id);assert.equal((await run(g)).status,'stopped');assert.equal(g.calls.length,0);
  const first=JSON.parse(await readFile(join(root,id,'0.json'),'utf8'));assert.equal(first.state,'started');
  assert.equal(await g.checkpoint.advance(0,{...first,sequence:1,state:'attempted',phase:'list',attempts:1}),false);
  await assert.rejects(()=>g.checkpoint.advance(0,{...first,privateText:'forbidden'}));
 }finally{await rm(root,{recursive:true,force:true});}
});
test('Windows refuses the durable file adapter before creating an occurrence',{skip:process.platform!=='win32'},()=>{
 assert.throws(()=>createOccurrenceFileCheckpoint(tmpdir(),id),/Checkpoint unavailable/);
});
