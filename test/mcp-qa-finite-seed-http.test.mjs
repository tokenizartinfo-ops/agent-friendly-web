import test from 'node:test';
import assert from 'node:assert/strict';
import {readFiniteMaterialSeed} from '../lib/mcp-qa-finite-seed-http.mjs';
import {seedPrimaryFixture,SEED_GH} from './fixtures/finite-seed-primary.mjs';
test('real anonymous native primary path authenticates immutable seed, finished step and package lineage',async()=>{
 const f=await seedPrimaryFixture(),r=await readFiniteMaterialSeed(f.options);
 assert.equal(r.seed.intentId,f.seed.intentId);assert.equal(r.primaryEvidence.seedStepCompletedAt,f.T0+2000);assert(Object.isFrozen(r.seed.qaPublication.qaLive.module));
 assert.equal(f.calls.length,11);for(const x of f.calls){assert.equal(x.init.method,'GET');assert.equal(x.init.headers.Authorization,undefined);assert(x.url.startsWith(SEED_GH));}
});
const attacks={
 'bare ref':f=>f.map.get('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId).object.type='commit',
 'tag target':f=>f.map.get('/git/tags/'+f.tagSha).object.sha='0'.repeat(40),
 'tag name':f=>f.map.get('/git/tags/'+f.tagSha).tag='other',
 'comment body':f=>f.map.get('/issues/comments/123').body+=' ',
 'comment owner':f=>f.map.get('/issues/comments/123').user.type='Bot',
 'main':f=>f.map.get('/git/ref/heads/main').object.sha='0'.repeat(40),
 'run title':f=>f.map.get('/actions/runs/11').display_title='other',
 'run attempt':f=>f.map.get('/actions/runs/11').run_attempt=2,
 'run owner':f=>f.map.get('/actions/runs/11').triggering_actor={},
 'job id':f=>f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').jobs[0].id++,
 'jobs overflow':f=>f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').total_count=101,
 'in progress seed':f=>{f.seedStep.status='in_progress';f.seedStep.conclusion=null;f.seedStep.completed_at=null;},
 'observation before start':f=>f.seedStep.started_at=new Date(f.T0+1500).toISOString(),
 'observation after completion':f=>f.seedStep.completed_at=new Date(f.T0+500).toISOString(),
 'source tree':f=>f.map.get('/git/commits/'+f.seed.sourceRevision).tree.sha='0'.repeat(40),
 'build lineage':f=>f.map.get('/actions/runs/101').event='pull_request',
 'artifact digest':f=>f.map.get('/actions/artifacts/202').digest='sha256:'+'0'.repeat(64),
 'artifact expired':f=>f.map.get('/actions/artifacts/202').expired=true,
 'source file tampered':f=>f.map.get('/contents/'+f.buildPath+'?ref='+f.seed.sourceRevision).content='eA=='
};
for(const [name,mutate]of Object.entries(attacks))test('public primary rejects '+name,async()=>{const f=await seedPrimaryFixture();mutate(f);await assert.rejects(readFiniteMaterialSeed(f.options));assert(f.calls.length<=11);});
for(const mode of ['rate','overflow','truncated','stale','abort','late','redirect'])test('public read bounds '+mode,async()=>{
 const f=await seedPrimaryFixture(),controller=new AbortController();
 const fetchImpl=async(...args)=>{const r=await f.fetchImpl(...args);if(mode==='rate')r.headers.set('x-ratelimit-remaining','0');if(mode==='overflow')r.headers.set('content-length','262145');if(mode==='truncated')r.headers.set('content-length','262144');if(mode==='stale')r.headers.set('date',new Date(f.T0-10000).toUTCString());if(mode==='abort')controller.abort();if(mode==='late')f.setNow(f.now()+5000);return mode==='redirect'?new Response(null,{status:302,headers:{location:'https://private.invalid'}}):r;};
 await assert.rejects(readFiniteMaterialSeed({...f.options,fetchImpl,signal:controller.signal}));assert.equal(f.calls.length,1);
});
test('caller URL/credential/seed cannot replace fixed read authority',async()=>{const f=await seedPrimaryFixture();for(const key of ['url','credential','seed'])await assert.rejects(readFiniteMaterialSeed({...f.options,[key]:'caller'}));assert.equal(f.calls.length,0);});
