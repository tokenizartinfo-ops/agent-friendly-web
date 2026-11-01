import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {armObservationFixture} from './fixtures/qa-arm-observation.mjs';
import {qaClosedHttpFixture} from './fixtures/qa-closed-http.mjs';
import {createPrivateQaArmHttpAdapters,createQaCloudClosedHttpAdapters} from '../lib/mcp-qa-cloud-closed-http.mjs';
function native(){
 const f=armObservationFixture(),o=f.options();f.nativeOptions={plan:{purpose:'afw.qa-arm-quiescence.v1',sessionId:f.context.id,startAt:f.wall-1,expiresAt:f.wall+4000},pins:o.pins,credential:o.env.AFW_MCP_CLOSURE_READ_TOKEN,sourceRevision:o.context.sourceRevision,qaVersionId:f.version,currentBootstrapId:f.event.instanceId,fetchImpl:f.fetch,now:()=>f.wall};return f;
}
function measured(f){
 const original=f.fetch;let active=0,peak=0,large=0,largePeak=0;
 f.fetch=async(url,init)=>{const bulk=new URL(url).pathname.includes('/versions/');active++;peak=Math.max(peak,active);if(bulk){large++;largePeak=Math.max(largePeak,large);}try{await new Promise(r=>setTimeout(r,5));return await original(url,init);}finally{active--;if(bulk)large--;}};
 return{get peak(){return peak;},get largePeak(){return largePeak;}};
}
test('native fixed inventories use bounded parallel reads, immutable bodies stay at2 and all46 proofs remain',async()=>{
 const f=native(),m=measured(f);f.nativeOptions.fetchImpl=f.fetch;const a=createPrivateQaArmHttpAdapters(f.nativeOptions);
 try{await a.readSnapshot(f.parent.signal);await a.readSnapshot(f.parent.signal);assert.equal(f.requests.length,46);assert.ok(m.peak>2&&m.peak<=13);assert.ok(m.largePeak<=2);assert.ok(f.requests.every(x=>x.init.method==='GET'));}finally{f.parent.abort();}
});
test('Node/GHA closed reader keeps its original peak2, redirects and full profiles',async()=>{
 const f=qaClosedHttpFixture(),m=measured(f),a=createQaCloudClosedHttpAdapters(f.options());try{const r=await a.readSnapshot(f.parent.signal);assert.equal(r.expectedProfilesVerified,true);assert.ok(m.peak<=2);assert.ok(f.requests.every(x=>x.init.redirect==='error'));}finally{f.parent.abort();}
});
test('native mutable response budget rejects >1MiB before parsing otherwise valid envelope',async()=>{
 const f=native();f.mutate=({url,response})=>{if(url.pathname.endsWith('/namespaces'))response.body.extraPadding='x'.repeat(1048576);};const a=createPrivateQaArmHttpAdapters(f.nativeOptions);
 try{await assert.rejects(a.readSnapshot(f.parent.signal));assert.equal(a.readDiagnostic().stage,'namespaces');assert.equal(a.readDiagnostic().reason,'response_budget');}finally{f.parent.abort();}
});
test('native immutable profile still admits a module body above1MiB under the unchanged4MiB transport cap',async()=>{
 const f=native(),p=f.pins.canary,v=f.versions[p.id],bytes=Buffer.from('/*'+'x'.repeat(1048576)+'*/');v.modules[0].content_base64=bytes.toString('base64');p.module.bytes=bytes.length;p.module.sha256=createHash('sha256').update(bytes).digest('hex');const a=createPrivateQaArmHttpAdapters(f.nativeOptions);
 try{assert.equal((await a.readSnapshot(f.parent.signal)).externalClosedProfilesVerified,true);}finally{f.parent.abort();}
});
test('parallel HTTP failure retains its own fixed diagnostic stage',async()=>{
 const f=native();f.mutate=({url,response})=>{if(url.pathname.endsWith('/namespaces'))response.status=503;};const a=createPrivateQaArmHttpAdapters(f.nativeOptions);
 try{await assert.rejects(a.readSnapshot(f.parent.signal));assert.equal(a.readDiagnostic().stage,'namespaces');assert.equal(a.readDiagnostic().httpStatus,503);}finally{f.parent.abort();}
});
