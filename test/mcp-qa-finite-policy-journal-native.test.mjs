import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
async function native(t){
 const built=await build({entryPoints:['test/fixtures/finite-preparation-store-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{FIXTURE:{className:'FinitePreparationFixture',useSQLite:true,uniqueKey:'finite-private-task1'}}}));
 t.after(()=>mf.dispose());let path='/'+t.name.replace(/[^a-z0-9_]/gi,'');
 const call=async(op,arg,extra={})=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,{method:'POST',body:JSON.stringify({op,arg,...extra})});assert.equal(r.status,200);return r.json();};
 return {call,f:await call('fixtures')};
}

test('lost_issue_ack_retains_issued',async t=>{
 const {call,f}=await native(t),extra={target:'journal'};
 const lost=await call('issue',f.send,{...extra,loseCommitAck:true});
 assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
 const read=await call('read',null,extra);
 assert.equal(read.result.state,'issued');assert.deepEqual(read.result.send,f.send);
 assert.equal((await call('issue',f.send,extra)).result.status,'existing');
 assert.equal((await call('read',null,extra)).result.state,'issued');
});
test('activation_requires_actual_upload_ack',async t=>{
 const {call,f}=await native(t),extra={target:'journal'};
 const activation={...f.send,effect:'activation',issuedAt:40},identity={...f.identity,effect:'activation'};
 assert.equal((await call('issue',activation,{...extra,identity})).rejected,true);
 assert.equal((await call('issue',f.send,extra)).result.status,'recorded');
 for(const bad of [{...f.ack,acknowledgedAt:101},{...f.ack,acknowledgedAt:29},{...f.ack,sendHash:'e'.repeat(64)}])assert.equal((await call('acknowledge',bad,extra)).rejected,true);
 assert.equal((await call('acknowledge',f.ack,{...extra,now:5001})).rejected,true);
 assert.equal((await call('acknowledge',f.ack,extra)).result.status,'recorded');
 assert.equal((await call('issue',activation,{...extra,identity})).result.status,'recorded');
});
test('admin_pending_keeps_outstanding_send',async t=>{
 const {call,f}=await native(t),extra={target:'journal'};
 await call('issue',f.send,extra);
 assert.equal((await call('markAdminPending',{reasonCode:'provider_uncertain',observedAt:100},extra)).result.status,'recorded');
 const before=await call('rows'),read=(await call('read',null,extra)).result;
 assert.equal(read.state,'admin_pending');assert.deepEqual(read.send,f.send);assert.equal(read.ack,null);assert.equal(read.receipt,null);
 assert.equal((await call('issue',f.send,extra)).result.status,'existing');
 assert.equal((await call('acknowledge',f.ack,extra)).rejected,true);
 assert.deepEqual(await call('rows'),before);
});

test('receipt_requires_both_actual_acks_and_exact_resource_ids',async t=>{
 const {call,f}=await native(t),extra={target:'journal'},activation={...f.send,effect:'activation',issuedAt:40},act={...extra,identity:{...f.identity,effect:'activation'}};
 assert.equal((await call('finish',f.receipt,act)).rejected,true);
 await call('issue',f.send,extra);await call('acknowledge',f.ack,extra);
 await call('issue',activation,act);
 assert.equal((await call('finish',f.receipt,act)).rejected,true);
 const activationHash=await call('recordHash',{kind:'PolicySend',record:activation});
 const ack={...f.ack,sendHash:activationHash.result,acknowledgedAt:50};
 assert.equal((await call('acknowledge',ack,act)).result.status,'recorded');
 const wrong=await call('recordHash',{kind:'PolicyReceipt',record:{...f.receipt,versionId:'22222222-2222-4222-8222-222222222222'}});
 assert.equal((await call('finish',{...f.receipt,versionId:'22222222-2222-4222-8222-222222222222',receiptHash:wrong.result},act)).rejected,true);
 assert.equal((await call('finish',f.receipt,act)).result.status,'recorded');
 assert.equal((await call('read',null,act)).result.state,'installed');
 assert.equal((await call('finish',f.receipt,act)).result.status,'existing');
});
test('connection_stage_and_effect_identity_isolation',async t=>{
 const {call,f}=await native(t),identity={kind:'connection',preconnectionId:f.preparation.prepId,sourceRevision:f.preparation.sourceRevision,stage:'connection',effect:'upload'};
 const send={purpose:'afw.finite-connection-send.v1',preconnectionId:identity.preconnectionId,sourceRevision:identity.sourceRevision,stage:'connection',contextHash:'a'.repeat(64),effect:'upload',baselineVersionId:f.ack.resourceId,baselineDeploymentId:f.ack.resourceId,requestHash:'a'.repeat(64),issuedAt:30,deadline:5000};
 const extra={target:'journal',identity};
 assert.equal((await call('issue',send,extra)).result.status,'recorded');
 assert.equal((await call('read',null,{...extra,identity:{...identity,stage:'notices'}})).result.state,'absent');
 assert.equal((await call('issue',{...send,stage:'notices'},extra)).rejected,true);
 assert.equal((await call('read',null,{target:'journal'})).result.state,'absent');
});
