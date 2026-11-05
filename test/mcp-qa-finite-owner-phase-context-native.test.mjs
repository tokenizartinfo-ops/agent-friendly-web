import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {validateFiniteOwnerSource} from '../lib/mcp-qa-finite-preparation-records.mjs';
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
async function world(fn){const f=await initialEntryHarness('phase-context');try{await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
async function read(f,mode='normal'){const rows=await plain(f.stub.snapshot()),c=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);f.nowOffset=c.I0+420000-Date.now();try{const start=f.requestMethods.length;const result=await plain(f.stub.phaseContextRead(420000,mode));assert(f.requestMethods.slice(start).every(m=>m==='GET'));assert.equal(await f.stub.ownerEffectCount(),0);return result;}finally{f.nowOffset=0;}}
test('closed source keeps original A and stable original context',()=>world(async f=>{
 const before=await plain(f.stub.snapshot()),original=await plain(f.ownerRead()),writes=f.uploads.length+f.activations.length;
 const result=await read(f);assert.equal(result.fixtureError,undefined,JSON.stringify(result));assert.deepEqual(Object.keys(result).sort(),['capsuleHash','preconnectionId','source']);assert.deepEqual(validateFiniteOwnerSource(result.source),original.source);assert.equal(result.preconnectionId,original.preconnectionId);assert.equal(result.capsuleHash,original.capsuleHash);
 assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);assert.equal(f.uploads.length+f.activations.length,writes);
 const sessions=await plain(f.stub.phasePrimaryReads());assert(sessions.length>=2);for(const queries of sessions)assert.match(queries[0],/^SELECT/i);
}));

async function seed(f,kind='settled',delta=410000){const rows=await plain(f.stub.snapshot()),c=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);f.nowOffset=delta===null?0:c.I0+delta-Date.now();try{const result=await plain(f.stub.seedPhaseFacts(kind,delta));assert.equal(result.fixtureError,undefined,JSON.stringify(result));return result;}finally{f.nowOffset=0;}}
test('original approval and enrollment stay closed without publication',()=>world(async f=>{
 await seed(f,'enrollment');const before=await plain(f.stub.snapshot()),r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');
 assert.equal((await plain(f.ownerRead(420000))).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
 const mutations=await plain(f.stub.phaseEnrollmentMutations());for(const [key,value]of Object.entries(mutations))assert.equal(value,true,key);
}));
for(const kind of ['approval','enrollment-no-ack'])test('closed source preserves factual '+kind,()=>world(async f=>{await seed(f,kind);const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');}));
test('settled first connection derives read_consent from exact primary state',()=>world(async f=>{
 const original=await plain(f.ownerRead());f.phaseCurrent=await seed(f);const before=await plain(f.stub.snapshot()),writes=f.uploads.length+f.activations.length;
 const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'read_consent');assert.equal(r.source.currentPublication.receiptHash,f.phaseCurrent.receipt.receiptHash);assert.deepEqual(r.source.initialBaseline,original.source.initialBaseline);assert.deepEqual(r.source.programContext,original.source.programContext);assert.deepEqual(r.source.window,original.source.window);
 const plan=JSON.parse(before.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]),expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(f.phaseCurrent.configuration,expected);
 assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);assert.equal(f.uploads.length+f.activations.length,writes);assert.equal((await plain(f.ownerRead(420000))).status,'unavailable');
}));
for(const kind of ['upload-send','upload-ack','activation-send'])test('unknown SEND denies even while provider pointer equals original M: '+kind,()=>world(async f=>{
 await seed(f,kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
}));
for(const kind of ['writer-head','orphan-receipt','orphan-ack','contextHash','foreign-A','extra','later-approval','orphan-grant'])test('foreign extra and later stages never become matching phase state: '+kind,()=>world(async f=>{
 f.phaseCurrent=await seed(f);await f.stub.phaseCorrupt(kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);
}));
for(const kind of ['missing-backup','missing-receipt','missing-chunk','tamper-backup','tamper-receipt','tamper-chunk','mismatch-receipt-material','mismatch-receipt-manifest','mismatch-receipt-baseline','mismatch-chunk-manifest'])test('retained original backup denies '+kind,()=>world(async f=>{
 await f.stub.phaseCorrupt(kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);
}));
for(const fault of ['module','configuration','later','empty-private','placeholder-private'])test('actual current module and profile independently deny '+fault,()=>world(async f=>{
 f.phaseCurrent=await seed(f);f.phaseFault=fault;assert.equal((await read(f)).status,'unavailable');
}));
for(const mode of ['untrusted-parent','holder-drift','parent-deadline','request-abort','wrong-version','transition','head'])test('original retained request cannot be renewed or borrowed: '+mode,()=>world(async f=>{assert.equal((await read(f,mode)).status,'unavailable');assert.equal(await f.stub.ownerEffectCount(),0);}));

for(const prefix of ['reservation','open','authorization','consumed','grant','linked'])test('primary issuer prefixes remain facts not next-stage permission: '+prefix,()=>world(async f=>{
 f.phaseCurrent=await seed(f,'settled',null);const issuer=await plain(f.stub.seedPhaseIssuer(prefix));assert.equal(issuer.fixtureError,undefined,JSON.stringify(issuer));
 const before=await plain(f.stub.snapshot()),grants=(await f.db.prepare('SELECT * FROM delegated_access_grants').all()).results,fences=(await f.db.prepare('SELECT * FROM finite_preparation_issuer_fences').all()).results;
 const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'read_consent');assert.deepEqual(Object.keys(r).sort(),['capsuleHash','preconnectionId','source']);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.deepEqual((await f.db.prepare('SELECT * FROM delegated_access_grants').all()).results,grants);assert.deepEqual((await f.db.prepare('SELECT * FROM finite_preparation_issuer_fences').all()).results,fences);assert.equal(await f.stub.ownerEffectCount(),0);
}));
for(const prefix of ['open_fence','authorization','consume','grant'])test('unknown issuer SEND denies '+prefix,()=>world(async f=>{
 f.phaseCurrent=await seed(f,'settled',null);const issuer=await plain(f.stub.seedPhaseIssuer('unknown-'+prefix));assert.equal(issuer.fixtureError,undefined,JSON.stringify(issuer));assert.equal((await read(f)).status,'unavailable');
}));
test('absent original issuer never triggers a global grant lookup',()=>world(async f=>{
 f.phaseCurrent=await seed(f);const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));const queries=(await plain(f.stub.phasePrimaryReads())).flat();assert(queries.every(q=>!q.includes('delegated_access_grants')));
}));

for(const drift of ['revision','owner','configuration','pointer','grant','schema'])test('fresh current owner and current publication are independently rechecked: '+drift,()=>world(async f=>{
 f.phaseCurrent=await seed(f,'settled',null);if(drift==='grant'){const r=await plain(f.stub.seedPhaseIssuer('linked'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));}
 f.phaseObservation=0;f.phaseDrift=drift;assert.equal((await read(f)).status,'unavailable');assert.equal(f.phaseObservation,2);
}));
for(const fault of ['terminal-fence','revoked-grant','expired-grant','unknown-ack'])test('original primary issuer denies '+fault,()=>world(async f=>{
 f.phaseCurrent=await seed(f,'settled',null);const r=await plain(f.stub.seedPhaseIssuer('linked'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));
 if(fault==='terminal-fence')await f.db.prepare("UPDATE finite_preparation_issuer_fences SET fence_request_id='11111111-1111-4111-8111-111111111111',fenced_at=?").bind(Date.now()).run();
 if(fault==='revoked-grant')await f.db.prepare('UPDATE delegated_access_grants SET revoked_at=?').bind(new Date().toISOString()).run();
 if(fault==='expired-grant')await f.db.prepare('UPDATE delegated_access_grants SET expires_at=?').bind(new Date().toISOString()).run();
 if(fault==='unknown-ack')await f.stub.phaseCorrupt('issuer-ack');
 assert.equal((await read(f)).status,'unavailable');
}));
async function waitStat(f,key){for(let i=0;i<200;i++){if((await plain(f.stub.stats()))[key])return;await new Promise(r=>setTimeout(r,20));}assert.fail('actual '+key+' not entered');}
async function settled(f){for(let i=0;i<200;i++){if((await plain(f.stub.probeStageAvailability())).available)return;await new Promise(r=>setTimeout(r,20));}assert.fail('actual work did not settle');}
for(const mode of ['held-read','held-fetch','held-body','held-cancel','nested-request-held-read'])test('original retained read blocks foreign root until actual settlement: '+mode,()=>world(async f=>{
 const before=await plain(f.stub.snapshot()),work=read(f,mode);await waitStat(f,mode==='held-body'?'readHeld':mode==='held-cancel'?'cancelHeld':'held');
 assert.equal((await work).status,'unavailable');assert.equal((await plain(f.stub.probeStageAvailability())).available,false);assert.equal((await read(f)).status,'unavailable');
 if(mode==='held-body'){await f.stub.releaseBodyRead();await waitStat(f,'cancelHeld');assert.equal((await plain(f.stub.probeStageAvailability())).available,false);await f.stub.releaseBodyCancel();}
 else if(mode==='held-cancel')await f.stub.releaseBodyCancel();else await f.stub.release();
 await settled(f);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.ok((await read(f)).source);
}));
test('original retained request with 29 seconds elapsed keeps at most its remaining second',()=>world(async f=>{
 const started=performance.now();assert.equal((await read(f,'request-budget')).status,'unavailable');assert(performance.now()-started<1500);assert.equal((await plain(f.stub.stats())).held,true);assert.equal((await plain(f.stub.probeStageAvailability())).available,false);await f.stub.release();await settled(f);
}));
test('same ambient original request borrows factual scope without a new root',()=>world(async f=>{assert.deepEqual(await read(f,'nested-request'),await read(f));}));

test('absent exact issuer table and empty original prefix remain factual context only',()=>world(async f=>{
 await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();const closed=await read(f);assert.equal(closed.fixtureError,undefined,JSON.stringify(closed));assert.equal(closed.source.phase,'closed_ui');f.phaseCurrent=await seed(f);const installed=await read(f);assert.equal(installed.fixtureError,undefined,JSON.stringify(installed));assert.equal(installed.source.phase,'read_consent');const queries=(await plain(f.stub.phasePrimaryReads())).flat();assert(queries.some(q=>q.includes('FROM sqlite_schema')));assert(queries.every(q=>!q.includes('delegated_access_grants')&&!q.includes('FROM finite_preparation_issuer_fences')));
}));
test('original issuer reservation requires actual exact table',()=>world(async f=>{
 f.phaseCurrent=await seed(f,'settled',null);const r=await plain(f.stub.seedPhaseIssuer('reservation'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();assert.equal((await read(f)).status,'unavailable');
}));
test('existing orphan original fence denies without global grant lookup',()=>world(async f=>{
 f.phaseCurrent=await seed(f,'settled',null);const r=await plain(f.stub.seedPhaseIssuer('open'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));const rows=await plain(f.stub.snapshot()),original=rows.filter(([k])=>!k.startsWith('afw.finite-preparation-issuer.v1:'));await f.stub.removePhaseIssuerFixture();assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),original);
}));
test('failed schema SELECT denies and malformed existing table never falls back',()=>world(async f=>{
 assert.equal((await read(f,'schema-failure')).status,'unavailable');await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();await f.db.prepare('CREATE TABLE finite_preparation_issuer_fences (preconnection_id TEXT PRIMARY KEY)').run();assert.equal((await read(f)).status,'unavailable');
}));

for(const prefix of ['snapshot-only','snapshot-map'])test('exact original metadata prefix remains closed without ticket: '+prefix,()=>world(async f=>{await seed(f,prefix);const before=await plain(f.stub.snapshot()),r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');assert.deepEqual(await plain(f.stub.snapshot()),before);}));
for(const fault of ['orphan-ticket-use','foreign-snapshot','stale-snapshot','later-approval','extra'])test('missing original ticket never relaxes '+fault,()=>world(async f=>{await seed(f,'snapshot-only');await f.stub.phaseCorrupt(fault);assert.equal((await read(f)).status,'unavailable');}));

test('fresh QA pointer drift after the first snapshot denies',()=>world(async f=>{f.phaseCurrent=await seed(f);f.phaseQaObservation=0;f.phaseDrift='qa-pointer';assert.equal((await read(f)).status,'unavailable');assert.equal(f.phaseQaObservation,2);}));
test('actual allocated phase fixture disposes after initialization failure',async()=>{await assert.rejects(initialEntryHarness('phase-context-init-failure'),e=>e.message==='SYN phase fixture initialization failed'&&e.fixtureDisposed===true);});
