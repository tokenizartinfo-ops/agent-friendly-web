import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
test('native Workflow registers configured pins only and native DO preserves withdrawal history',async()=>{
 const start=Date.now()-1000,m={...manifest(),startAt:start,deadline:start+90000};
 const approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const{registration}=await qaAdministrationFixture({createdAt:start,closeAt:m.deadline,expiresAt:m.deadline+10000});registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=m.occurrenceId;registration.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import original,{PrivateQaPreregistration,PrivateQaBootstrap} from './worker/independent-closure/index.mjs';export{PrivateQaPreregistration,PrivateQaBootstrap};
 // Test-only control interface, never included in actual Worker.
 export default{async fetch(request,env){const path=new URL(request.url).pathname;if(path==='/fixture/create'){const body=await request.json();const i=await env.BOOTSTRAP.create(body);return Response.json({id:i.id});}if(path==='/fixture/restart'){await(await env.BOOTSTRAP.get(new URL(request.url).searchParams.get('id'))).restart();return Response.json(true);}if(path==='/fixture/status'){return Response.json(await(await env.BOOTSTRAP.get(new URL(request.url).searchParams.get('id'))).status());}const actor=env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa'));if(path==='/fixture/read')return Response.json(await actor.read());if(path==='/fixture/withdraw')return Response.json(await actor.withdraw());if(path==='/fixture/history')return Response.json(await actor.readForClosure());return original.fetch(request,env);}};
 `},bundle:true,write:false,format:'esm',platform:'browser',external:['cloudflare:workers']});
 for(const enabled of ['false','true']){const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,bindings:{AFW_QA_BOOTSTRAP_ENABLED:enabled,AFW_QA_PREREGISTRATION:JSON.stringify({registration,approval})},durableObjects:{AFW_QA_PREREGISTRY:{className:'PrivateQaPreregistration',useSQLite:true}},workflows:{BOOTSTRAP:{name:'own-bootstrap',className:'PrivateQaBootstrap'}}}));
 try{const call=async(path,body)=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+path,body?{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}:{});assert.equal(response.status,200);return response.json();};
 assert.equal((await runtime.dispatchFetch('https://synthetic.invalid/assistance/custody/register')).status,404);
 const execute=async id=>{await call('/fixture/create',{id,params:JSON.stringify({operation:'register',recordRef:registration.plan.baselineRef})});let state;const deadline=Date.now()+10000;do{state=await call('/fixture/status?id='+id);if(state.status==='complete'||state.status==='errored')break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<deadline);assert.equal(state.status,'complete',JSON.stringify(state));return state.output;};
 assert.equal((await execute('first')).state,enabled==='true'?'registered':'unavailable');
 if(enabled==='true'){assert.ok(await call('/fixture/read'));assert.equal((await execute('duplicate')).state,'unavailable');assert.equal(await call('/fixture/withdraw'),true);assert.equal(await call('/fixture/read'),null);assert.ok(await call('/fixture/history'));assert.equal(await call('/fixture/restart?id=first'),true);let restarted;const deadline=Date.now()+10000;do{restarted=await call('/fixture/status?id=first');if(restarted.status==='complete'&&restarted.output?.state==='unavailable')break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<deadline);assert.equal(restarted.status,'complete');assert.equal(restarted.output.state,'unavailable');assert.ok(await call('/fixture/history'));assert.equal((await execute('after-withdrawal')).state,'unavailable');}else assert.equal(await call('/fixture/history'),null);
 }finally{await runtime.dispose();}}
});
