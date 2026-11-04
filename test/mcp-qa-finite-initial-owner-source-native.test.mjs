import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {initialCanonical as canonical,initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {validateFiniteOwnerSource} from '../lib/mcp-qa-finite-preparation-records.mjs';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const P='afw.finite-initial-preparation.v1:',C='afw.finite-initial-cleanup.v1:',get=(rows,k)=>rows.find(([key])=>key===k)?.[1];
async function result(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
async function using(fn){const f=await initialEntryHarness();try{await f.stub.configure('normal');assert.equal((await result(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
test('fixed factual envelope after technical expiry preserves original A, actual M and original Q with stable unchanged source grammar',()=>using(async f=>{
 const before=await f.stub.snapshot(),capsule=JSON.parse(get(before,P+'capsule')),m=JSON.parse(get(before,P+'material:'+capsule.materialHash)),plan=JSON.parse(get(before,C+'plan')),start=f.requests.length;
 const a=await result(f.stub.ownerSourceRead()),b=await result(f.stub.ownerSourceRead());
 assert.deepEqual(a,b);assert.deepEqual(Object.keys(a).sort(),['capsuleHash','preconnectionId','source']);assert.equal(a.preconnectionId,m.preconnectionId);assert.equal(a.capsuleHash,capsule.capsuleHash);
 assert.deepEqual(validateFiniteOwnerSource(a.source),a.source);
 assert.deepEqual(a.source.window,{startedAt:capsule.I0,expiresAt:capsule.C0});assert.equal(a.source.phase,'closed_ui');
 assert.deepEqual(a.source.currentPublication,{stage:null,versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,receiptHash:null});
 assert.notEqual(a.source.initialBaseline.versionId,f.x.pin.id);assert.equal(a.source.initialBaseline.moduleHash,capsule.moduleHash);
 assert.equal(a.source.initialBaseline.configurationHash,activationConfigurationHash(plan.configuration));assert.notEqual(a.source.initialBaseline.configurationHash,capsule.configurationHash);
 assert.equal(a.source.initialBaseline.bindingsHash,createHash('sha256').update(canonical([...plan.configuration.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex'));
 assert.notEqual(m.originalContext.original.programHash,m.originalContext.artifact.programHash);assert.notEqual(m.originalContext.original.sourceRevision,m.originalContext.artifact.sourceRevision);
 assert.deepEqual(a.source.programContext,{programHash:m.originalContext.original.programHash,sourceRevision:m.originalContext.original.sourceRevision,originalContextHash:initialHash('afw.finite-original-context.v1',m.originalContext)});
 assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.restores.length,0);
 assert.ok(f.requests.slice(start).length>0);assert.ok(f.requestMethods.slice(start).every(method=>method==='GET'));
 assert.deepEqual(await result(f.stub.ownerSourceRead(899000,'normal',a.preconnectionId)),a);
 assert.equal((await result(f.stub.ownerSourceRead(900000))).status,'unavailable');
}));
test('strict same-lineage and holders deny without writes',()=>using(async f=>{
 const before=await f.stub.snapshot();
 for(const mode of ['missing','material','malformed','hash','anchor-entry','anchor-once','anchor-selector','anchor-ack','anchor-plan','anchor-state','anchor-arm-ack','anchor-activation-send','anchor-activation-ack','anchor-activation-completion','changed-anchor','alarm','transition','head','publication','wrong-version','wrong-actor','holder-drift','backward','parent-deadline','aborted','untrusted-parent']){
  assert.equal((await result(f.stub.ownerSourceRead(400000,mode))).status,'unavailable',mode);
 }
 assert.equal((await result(f.stub.ownerSourceRead(400000,'normal','f'.repeat(64)))).status,'unavailable');
 assert.deepEqual(await f.stub.snapshot(),before);
}));
test('fresh primary owner and metadata mismatches deny',()=>using(async f=>{
 for(const fault of ['qa-module','qa-namespace','module','configuration']){f.ownerFault=fault;assert.equal((await result(f.stub.ownerSourceRead())).status,'unavailable',fault);}f.ownerFault=null;
 await f.db.prepare('UPDATE site_projects SET revision=revision+1').run();assert.equal((await result(f.stub.ownerSourceRead())).status,'unavailable');
 await f.db.prepare("UPDATE site_projects SET user_id='SYN another-owner'").run();assert.equal((await result(f.stub.ownerSourceRead())).status,'unavailable');
}));
test('actual deferred read stays retained after child timeout and blocks owner and readonly until settlement',()=>using(async f=>{
 const rows=await f.stub.snapshot(),p=result(f.stub.ownerSourceRead(400000,'held-read'));
 for(let i=0;i<150;i++){if((await result(f.stub.stats())).held)break;await new Promise(r=>setTimeout(r,20));}
 assert.equal((await result(f.stub.stats())).held,true);
 assert.equal((await p).status,'unavailable');
 assert.equal((await result(f.stub.probeStageAvailability())).available,false);
 assert.equal((await result(f.stub.ownerSourceRead())).status,'unavailable');
 assert.equal((await result(f.stub.preEntryCustody())).status,'unavailable');
 await f.stub.release();
 for(let i=0;i<150;i++){if((await result(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
 assert.equal((await result(f.stub.probeStageAvailability())).available,true);
 assert.deepEqual(await f.stub.snapshot(),rows);
 assert.ok((await result(f.stub.ownerSourceRead())).source);
}));

for(const mode of ['held-fetch','held-cancel','held-body'])test('whole '+mode+' and cancellation remain retained after timeout',()=>using(async f=>{
 const before=await f.stub.snapshot(),p=result(f.stub.ownerSourceRead(400000,mode));
 const wait=async key=>{for(let i=0;i<200;i++){if((await result(f.stub.stats()))[key])return;await new Promise(r=>setTimeout(r,20));}assert.fail('actual '+key+' not reached');};
 await wait(mode==='held-fetch'?'held':mode==='held-cancel'?'cancelHeld':'readHeld');
 assert.equal((await p).status,'unavailable');assert.equal((await result(f.stub.probeStageAvailability())).available,false);
 if(mode==='held-fetch')await f.stub.release();
 else if(mode==='held-body'){await f.stub.releaseBodyRead();await wait('cancelHeld');assert.equal((await result(f.stub.probeStageAvailability())).available,false);await f.stub.releaseBodyCancel();}
 else await f.stub.releaseBodyCancel();
 for(let i=0;i<200;i++){if((await result(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
 assert.equal((await result(f.stub.probeStageAvailability())).available,true);assert.deepEqual(await f.stub.snapshot(),before);
}));
