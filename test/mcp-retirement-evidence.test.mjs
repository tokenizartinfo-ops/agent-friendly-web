import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/mcp-retirement-evidence.mjs');
function fixture(){
 let now=Date.UTC(2026,9,14,16),reads=0;
 const original={containerId:'a'.repeat(64),applicationId:'app-own',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
 const custody={purpose:'afw.node-retirement-observation.v1',containerId:original.containerId,programHash:original.programHash,sourceRevision:original.sourceRevision,processGeneration:'d'.repeat(64),image:'cloudflare/debian-trixie',createdAt:now-60000,expiresAt:now-10000,closedAt:now-20000,observedAt:now,physicalStopVerified:false,mayStartSuccessor:false};
 const instance={id:original.containerId,application_id:original.applicationId,image:'cloudflare/debian-trixie',started_at:new Date(now-50000).toISOString(),status:{state:'stopped',updated_at:new Date(now-21000).toISOString(),exit_code:0}};
 return{original,custody,instance,options:{original,now:()=>now,readCustody:async()=>structuredClone(custody),readInstance:async()=>{reads++;return structuredClone(instance);}},reads:()=>reads,advance:ms=>{now+=ms;}};
}
test('same original retired custody and stopped instance are observed twice without successor permission',async()=>{
 const {createRetirementEvidenceReader}=await load(),f=fixture();const r=await createRetirementEvidenceReader(f.options).observe();
 assert.equal(r.purpose,'afw.retirement-evidence.v1');assert.equal(r.physicalStopVerified,true);assert.equal(r.mayStartSuccessor,false);assert.equal(r.containerId,f.original.containerId);assert.equal(f.reads(),2);
 assert.equal(Object.hasOwn(r,'instance'),false);
});
test('foreign, live, unknown, stale and changed original observations fail closed',async()=>{
 const {createRetirementEvidenceReader}=await load();
 for(const change of [f=>f.instance.id='f'.repeat(64),f=>f.instance.application_id='other',f=>f.instance.image='foreign',f=>f.instance.status.state='running',f=>f.instance.status.exit_code=1,f=>f.instance.started_at=new Date(f.custody.createdAt-1).toISOString(),f=>f.custody.sourceRevision='f'.repeat(40),f=>f.custody.observedAt-=30001,f=>f.custody.observedAt++,f=>f.custody.mayStartSuccessor=true,f=>f.options.readInstance=async()=>null]){
  const f=fixture();change(f);await assert.rejects(createRetirementEvidenceReader(f.options).observe());
 }
 const f=fixture();let calls=0;f.options.readInstance=async()=>{const r=structuredClone(f.instance);if(++calls===2)r.status.updated_at=new Date(f.custody.closedAt).toISOString();return r;};await assert.rejects(createRetirementEvidenceReader(f.options).observe());
});
test('expiry during platform read and source drift between custody reads are rejected',async()=>{
 const {createRetirementEvidenceReader}=await load();
 const f=fixture();f.options.readInstance=async()=>{f.advance(30001);return structuredClone(f.instance);};await assert.rejects(createRetirementEvidenceReader(f.options).observe());
 const g=fixture();let calls=0;g.options.readCustody=async()=>({...g.custody,processGeneration:++calls===1?g.custody.processGeneration:'e'.repeat(64)});await assert.rejects(createRetirementEvidenceReader(g.options).observe());
});
test('unresponsive reader is bounded and receives cancellation',async()=>{
 const {createRetirementEvidenceReader}=await load(),f=fixture();let signal;
 f.options.readInstance=async request=>{signal=request.signal;return new Promise(()=>{});};
 await assert.rejects(createRetirementEvidenceReader({...f.options,timeoutMs:30}).observe());assert.equal(signal.aborted,true);
});

test('resolved readers cannot overrun the monotonic deadline before timer dispatch',async t=>{
 const {createRetirementEvidenceReader}=await load(),f=fixture();let tick=100;
 t.mock.method(performance,'now',()=>tick);
 f.options.readInstance=async()=>{tick+=31;return structuredClone(f.instance);};
 await assert.rejects(createRetirementEvidenceReader({...f.options,timeoutMs:30}).observe());
});
