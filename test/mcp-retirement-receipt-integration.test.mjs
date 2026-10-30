import test from 'node:test';
import assert from 'node:assert/strict';
import {createRetirementEvidenceReader} from '../lib/mcp-retirement-evidence.mjs';
import {createRetiredRpcReceipt,readRetiredRpcReceipt} from '../lib/mcp-retired-rpc-receipt.mjs';
const pins={containerId:'a'.repeat(64),applicationId:'fixed-own-application',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
const raw=(at=10021)=>({purpose:'afw.node-retirement-observation.v1',containerId:pins.containerId,processGeneration:'d'.repeat(64),programHash:pins.programHash,sourceRevision:pins.sourceRevision,image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2500,observedAt:at,physicalStopVerified:false,mayStartSuccessor:false});
const instance=()=>({id:pins.containerId,application_id:pins.applicationId,image:'cloudflare/debian-trixie',started_at:new Date(1500).toISOString(),status:{state:'stopped',exit_code:0,updated_at:new Date(2600).toISOString()}});
function fixture(){
 let custody=0,providers=0;
 const config={original:pins,now:()=>10000,readCustodyReceipt:async({signal},assertReader)=>readRetiredRpcReceipt({signal,now:()=>10000,assertCurrent:assertReader,invoke:async challenge=>({value:await createRetiredRpcReceipt({challenge,now:()=>10021,observe:async()=>{custody++;return {value:raw()};}})})}),readInstance:async()=>{providers++;return instance();}};
 return{config,counts:()=>({custody,providers})};
}
test('actual challenged helper chain accepts +21ms and yields caller-local physical evidence',async()=>{
 const f=fixture(),e=await createRetirementEvidenceReader(f.config).observe();
 assert.deepEqual(e,{purpose:'afw.retirement-evidence.v1',...pins,processGeneration:'d'.repeat(64),closedAt:2500,stoppedAt:2600,observedAt:10000,physicalStopVerified:true,mayStartSuccessor:false});
 assert.deepEqual(f.counts(),{custody:2,providers:2});
});
test('raw future observation remains rejected by the legacy reader',async()=>{
 let calls=0;await assert.rejects(createRetirementEvidenceReader({original:pins,now:()=>10000,readCustody:async()=>raw(),readInstance:async()=>{calls++;return instance();}}).observe());assert.equal(calls,0);
});
test('reader rejects ambiguous raw plus receipt callbacks',()=>{
 const f=fixture();assert.throws(()=>createRetirementEvidenceReader({...f.config,readCustody:async()=>raw()}));
});
test('caller-local receipt interval cannot be future, stale, reversed or from before this operation',async()=>{
 for(const local of [{sentAt:10001,receivedAt:10001},{sentAt:9999,receivedAt:10000},{sentAt:10000,receivedAt:9999}]){
  const f=fixture();f.config.readCustodyReceipt=async()=>({observation:raw(),local});
  await assert.rejects(createRetirementEvidenceReader(f.config).observe());
 }
});
test('matching challenge never substitutes for identity, closed time or stopped provider',async()=>{
 for(const kind of ['identity','future-close','running']){
  const f=fixture();
  if(kind==='running')f.config.readInstance=async()=>({...instance(),status:{state:'running'}});
  else f.config.readCustodyReceipt=async()=>({observation:{...raw(),...kind==='identity'?{containerId:'e'.repeat(64)}:{closedAt:10001}},local:{sentAt:10000,receivedAt:10000}});
  await assert.rejects(createRetirementEvidenceReader(f.config).observe(),undefined,kind);
 }
});
test('pre-aborted parent performs no read in either reader mode',async()=>{
 const c=new AbortController();c.abort();
 for(const mode of ['challenged','raw']){
  const f=fixture();let rawCalls=0;if(mode==='raw'){delete f.config.readCustodyReceipt;f.config.readCustody=async()=>{rawCalls++;return raw(10000);};}
  await assert.rejects(createRetirementEvidenceReader(f.config).observe({signal:c.signal}));
  assert.deepEqual(f.counts(),{custody:0,providers:0});assert.equal(rawCalls,0);
 }
});
test('parent abort during provider read prevents another custody read and acceptance',async()=>{
 const f=fixture(),c=new AbortController();let reads=0;
 f.config.readInstance=async()=>{reads++;c.abort();return instance();};
 await assert.rejects(createRetirementEvidenceReader(f.config).observe({signal:c.signal}));
 assert.equal(reads,1);assert.equal(f.counts().custody,1);
});
test('late challenged native value is disposed after the original reader timeout without acceptance',async()=>{
 const f=fixture();let release,disposed=0,calls=0;
 f.config.readCustodyReceipt=async({signal},assertReader)=>readRetiredRpcReceipt({signal,now:()=>10000,timeoutMs:1000,assertCurrent:assertReader,invoke:async challenge=>{calls++;return new Promise(resolve=>{release=()=>resolve({value:Object.defineProperty({purpose:'afw.retired-rpc-receipt.v1',challenge,observation:raw()},Symbol.dispose,{value(){disposed++;}})});});}});
 const pending=createRetirementEvidenceReader({...f.config,timeoutMs:25}).observe();
 await assert.rejects(pending);assert.equal(calls,1);release();await new Promise(r=>setTimeout(r,10));assert.equal(disposed,1);assert.equal(f.counts().providers,0);
});

test('expired original parent assertion blocks custody before a child lease can start',async()=>{
 const f=fixture();let checks=0;
 await assert.rejects(createRetirementEvidenceReader(f.config).observe({assertCurrent(){checks++;throw Error('original deadline expired');}}));
 assert.ok(checks>0);assert.deepEqual(f.counts(),{custody:0,providers:0});
});
