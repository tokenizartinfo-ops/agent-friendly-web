import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
test('one primary SQLite namespace retains competing-resource ownership through response loss, restart and withdrawal',async()=>{
 const start=Date.now()-1000,m={...manifest(),startAt:start,deadline:start+90000},approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration}=await qaAdministrationFixture({createdAt:start,closeAt:m.deadline,expiresAt:m.deadline+10000});registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=m.occurrenceId;registration.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 const a={registration,approval},b=structuredClone(a);b.registration.provisioning.creationRef='b'.repeat(64);b.registration.plan.baselineRef=await computeQaClosureBaselineRef(b.registration);
 const built=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {DurableObject} from 'cloudflare:workers';import{createPrivateResourceHolds}from './lib/assistance-private-resource-holds.mjs';
 // Test-only control host, not the deployed QA Worker.
 export class GlobalHold extends DurableObject{async fetch(request){const body=await request.json(),p=JSON.parse(this.env.PINS)[body.label],actor=createPrivateResourceHolds({storage:this.ctx.storage,readPins:async()=>p});let result;if(body.operation==='withdraw')result=await actor.withdraw(p.registration.plan.baselineRef,body.sequence);else result=await actor[body.operation](p.registration.plan.baselineRef);if(body.loseAck)return Response.json({fixture:'lost-ack'},{status:503});return Response.json(result);}}
 export default{fetch(request,env){return env.GLOBAL.get(env.GLOBAL.idFromName('one-authority')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser',external:['cloudflare:workers']});
 const options={modules:true,compatibilityDate:'2026-09-07',script:built.outputFiles[0].text,bindings:{PINS:JSON.stringify({a,b})},durableObjects:{GLOBAL:{className:'GlobalHold',useSQLite:true}}};const runtime=new Miniflare(convertV4MiniflareOptions(options));
 try{const call=async(body)=>{const response=await runtime.dispatchFetch('https://synthetic.invalid/',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});assert.equal(response.status,body.loseAck?503:200,await response.clone().text());return response;};await Promise.all(['a','b'].map(label=>call({label,operation:'reserve',loseAck:true})));const results=await Promise.all(['a','b'].map(label=>call({label,operation:'history'}).then(r=>r.json())));assert.equal(results.filter(Boolean).length,1);const label=results[0]?'a':'b',other=label==='a'?'b':'a',held=results.find(Boolean);
  await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...options.bindings,RESTART:'true'}}));assert.deepEqual(await(await call({label,operation:'history'})).json(),held);
  assert.equal(await(await call({label,operation:'withdraw',sequence:1})).json(),true);assert.equal(await(await call({label,operation:'read'})).json(),null);assert.equal(await(await call({label:other,operation:'reserve'})).json(),null);assert.equal((await(await call({label,operation:'history'})).json()).state,'withdrawn');
 }finally{await runtime.dispose();}
});
