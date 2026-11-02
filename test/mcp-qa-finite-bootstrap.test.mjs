import test from 'node:test';
import assert from 'node:assert/strict';
import {finitePublicStaticExpectation,finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
let recordApi,admissionApi;
try{recordApi=await import('../lib/mcp-qa-finite-bootstrap-record.mjs');}catch{/* behavioral RED: product absent */}
try{admissionApi=await import('../lib/mcp-qa-finite-bootstrap-admission.mjs');}catch{/* behavioral RED: product absent */}
const M='a'.repeat(40),UUID='11111111-1111-4111-8111-111111111111';
function record(){
 const P0=Date.now()-1000;
 return {purpose:'afw.finite-qa-bootstrap.v1',repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,sourceRevision:M,sourceTree:'b'.repeat(40),sourceCheck:'git-inputs-and-configuration-before-after-v1',workflowHash:'c'.repeat(64),cliHash:'d'.repeat(64),commandId:123,runId:456,jobId:789,attempt:1,workflowPath:'.github/workflows/afw-finite-qa-bootstrap.yml',job:'publish',step:'qa-bootstrap-provenance',P0,Pend:P0+300000,jobStartedAt:P0+100,stepStartedAt:P0+200,observedAt:P0+500,qaLive:{versionId:UUID,deploymentId:'22222222-2222-4222-8222-222222222222',module:{name:'index.mjs',sha256:'e'.repeat(64),bytes:123,exports:[...finitePublicProfileTemplate('qaLive').exports]},publicStatic:finitePublicStaticExpectation('qaLive')}};
}
function command(){
 const actor={id:290715446,login:'tokenizartinfo-ops',type:'User'},P0=Date.now()-1000;
 return {event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},comment:{id:123,user:actor,author_association:'OWNER',body:'/afw-qa-finite-bootstrap v1 '+M,created_at:new Date(P0).toISOString()},sender:actor},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'456',runAttempt:'1',sourceRevision:M},now:Date.now};
}
test('canonical record roundtrip commits only exact QA-live public technical facts',()=>{
 assert.equal(typeof recordApi?.encodeFiniteQaBootstrap,'function');
 const r=record(),encoded=recordApi.encodeFiniteQaBootstrap(r),decoded=recordApi.decodeFiniteQaBootstrap(encoded);
 assert.deepEqual(decoded.record,r);assert.match(decoded.recordHash,/^[a-f0-9]{64}$/);
 assert.equal(recordApi.encodeFiniteQaBootstrap({...r,qaLive:{...r.qaLive}}),encoded);
 assert(Object.isFrozen(decoded.record.qaLive.module));
 assert(Buffer.byteLength(encoded)<=16384);
});
for(const mutation of ['private','accessor','symbol','prototype','wrong-role','wrong-export','wrong-static','clock','uuid-prefix','oversize','source-check'])test('exact bootstrap record denies '+mutation,()=>{
 assert.equal(typeof recordApi?.validateFiniteQaBootstrap,'function');const r=record();
 if(mutation==='private')r.controlHash='f'.repeat(64);
 if(mutation==='accessor')Object.defineProperty(r,'workflowHash',{enumerable:true,get(){throw Error('must not execute');}});
 if(mutation==='symbol')r[Symbol('private')]=1;
 if(mutation==='prototype')Object.setPrototypeOf(r,{});
 if(mutation==='wrong-role')r.qaClosed=r.qaLive;
 if(mutation==='wrong-export')r.qaLive.module.exports=['default'];
 if(mutation==='wrong-static')r.qaLive.publicStatic={...r.qaLive.publicStatic,profileHash:'0'.repeat(64)};
 if(mutation==='clock')r.observedAt=r.Pend;
 if(mutation==='uuid-prefix')r.qaLive.versionId=r.qaLive.versionId.slice(0,8);
 if(mutation==='oversize')r.qaLive.module.bytes=3145729;
 if(mutation==='source-check')r.sourceCheck='git-inputs-before-after-v1';
 assert.throws(()=>recordApi.validateFiniteQaBootstrap(r));
});
test('record decoder denies changed body, noncanonical wire, hash mismatch and extras',()=>{
 assert.equal(typeof recordApi?.encodeFiniteQaBootstrap,'function');
 const encoded=recordApi.encodeFiniteQaBootstrap(record()),v=JSON.parse(encoded);
 for(const bad of [encoded+' ',JSON.stringify({...v,private:'no'}),encoded.replace('"index.mjs"','"other.mjs"')])assert.throws(()=>recordApi.decodeFiniteQaBootstrap(bad));
});
test('dedicated admission preserves P0 and excludes finite confirmation and caller DTO authority',()=>{
 assert.equal(typeof admissionApi?.validateQaBootstrapCommand,'function');
 const input=command(),a=admissionApi.validateQaBootstrapCommand(input);
 assert.equal(a.P0,Date.parse(input.event.comment.created_at));assert.equal(a.Pend,a.P0+300000);
 assert.equal(a.T0,undefined);assert.equal(a.expiresAt,undefined);assert.equal(a.authorizesEffects,false);
 assert.equal(admissionApi.assertQaBootstrapAdmission(a),a);
 assert.throws(()=>admissionApi.assertQaBootstrapAdmission({...a}));
 input.event.comment.body='/afw-qa-finite-confirmation v1 '+M;
 assert.throws(()=>admissionApi.validateQaBootstrapCommand(input));
});
for(const mutation of ['owner','repo','branch','attempt','event','issue','pull-request','future','expired'])test('bootstrap admission rejects '+mutation,()=>{
 assert.equal(typeof admissionApi?.validateQaBootstrapCommand,'function');const c=command();
 if(mutation==='owner')c.event.sender={...c.event.sender,id:1};
 if(mutation==='repo')c.context.repositoryId='1';
 if(mutation==='branch')c.context.ref='refs/heads/other';
 if(mutation==='attempt')c.context.runAttempt='2';
 if(mutation==='event')c.event.action='edited';
 if(mutation==='issue')c.event.issue.number=1;
 if(mutation==='pull-request')c.event.issue.pull_request={};
 if(mutation==='future')c.event.comment.created_at=new Date(Date.now()+60000).toISOString();
 if(mutation==='expired')c.event.comment.created_at=new Date(Date.now()-300000).toISOString();
 assert.throws(()=>admissionApi.validateQaBootstrapCommand(c));
});
