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

test('selection_cas_one_winner',async t=>{
 const {call,f}=await native(t);
 const r=await call('concurrent',null,{args:[{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{preparation:{...f.preparation,prepId:'c'.repeat(64)},selection:{...f.selection,prepId:'c'.repeat(64)},expectedHeadHash:null}]});
 assert.equal(r.filter(x=>x.status==='recorded').length,1);
 const selected=(await call('readSelected',{sourceRevision:f.preparation.sourceRevision})).result;
 assert.equal(selected.selection.selectionHash,r.find(x=>x.status==='recorded').recordHash);
 assert.ok((await call('rows')).length>=3);
});
test('preparation_cannot_bind_second_intent',async t=>{
 const {call,f}=await native(t);
 assert.equal((await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null})).result.status,'recorded');
 assert.equal((await call('bindSelection',f.binding)).result.status,'recorded');
 const before=await call('rows');
 assert.equal((await call('bindSelection',{...f.binding,intentId:'intent-2'})).rejected,true);
 assert.deepEqual(await call('rows'),before);
 assert.equal((await call('bindSelection',f.binding)).result.status,'existing');
});
test('selection_changed_after_T0_no_fallback',async t=>{
 const {call,f}=await native(t);
 await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null});
 // Fixture can supply correctly hashed subsequent selections using actual codecs.
 const prepAway={...f.preparation,prepId:'c'.repeat(64)};
 const second={...f.selection,prepId:prepAway.prepId,selectedAt:25,sequence:2,previousSelectionHash:f.selection.selectionHash};
 const away=await call('publishSelection',{preparation:prepAway,selection:second,expectedHeadHash:f.selection.selectionHash},{reseal:true});
 assert.equal(away.result.status,'recorded');
 const back=await call('publishSelection',{preparation:f.preparation,selection:{...f.selection,selectedAt:30,sequence:3,previousSelectionHash:away.result.recordHash},expectedHeadHash:away.result.recordHash},{reseal:true});
 assert.equal(back.result.status,'recorded');
 const selected=(await call('readSelected',{sourceRevision:f.preparation.sourceRevision})).result;
 assert.equal(selected.preparation.prepId,f.preparation.prepId);
 assert.equal((await call('bindSelection',f.binding)).rejected,true);
});
test('consumed_ticket_is_not_refunded',async t=>{
 const {call,f}=await native(t);
 assert.equal((await call('putTicket',f.ticket)).result.status,'recorded');
 const use={ticketHash:f.ticket.ticketHash,recordHash:'d'.repeat(64)};
 const lost=await call('consumeTicket',use,{loseCommitAck:true});
 assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
 const rows=await call('rows');
 assert.equal((await call('consumeTicket',use)).result.status,'existing');
 assert.equal((await call('consumeTicket',{...use,recordHash:'e'.repeat(64)})).rejected,true);
 assert.deepEqual(await call('rows'),rows);
});
test('lease_expiry_rolls_back_native_transaction',async t=>{
 const {call,f}=await native(t);
 const before=await call('rows');
 const r=await call('putTicket',f.ticket,{expireAtAssertion:4});
 assert.equal(r.rejected===true||r.result?.status==='uncertain',true);
 assert.deepEqual(await call('rows'),before);
});

test('preconnection_links_are_immutable_and_notice_requires_exact_grant',async t=>{
 const {call,f}=await native(t);
 assert.equal((await call('putPreconnection',f.preconnection)).result.status,'recorded');
 const grant={preconnectionId:f.preconnection.preconnectionId,authorizationHash:'c'.repeat(64),grantId:'grant',grantHash:'d'.repeat(64),acceptedAt:20};
 const notice={preconnectionId:grant.preconnectionId,grantHash:grant.grantHash,eventHash:'e'.repeat(64),sequence:1,acceptedAt:30};
 assert.equal((await call('putLink',{kind:'notice',record:notice})).rejected,true);
 assert.equal((await call('putLink',{kind:'grant',record:grant})).result.status,'recorded');
 assert.equal((await call('putLink',{kind:'notice',record:{...notice,grantHash:'f'.repeat(64)}})).rejected,true);
 assert.equal((await call('putLink',{kind:'notice',record:notice})).result.status,'recorded');
 const before=await call('rows');
 assert.equal((await call('putLink',{kind:'grant',record:grant})).result.status,'existing');
 assert.equal((await call('putLink',{kind:'grant',record:{...grant,grantId:'replacement'}})).rejected,true);
 assert.deepEqual(await call('rows'),before);
});
test('context_is_bound_to_original_selection_and_read_by_exact_refs',async t=>{
 const {call,f}=await native(t),c=f.context,now=c.T0+10;
 assert.equal((await call('putContext',c,{now})).rejected,true);
 assert.equal((await call('publishSelection',{preparation:c.ownerPreparation,selection:f.contextSelection,expectedHeadHash:null},{now})).result.status,'recorded');
 assert.equal((await call('bindSelection',f.contextBinding,{now})).result.status,'recorded');
 assert.equal((await call('putContext',c,{now})).result.status,'recorded');
 assert.deepEqual((await call('readContext',{intentId:c.intentId,sourceRevision:c.sourceRevision},{now})).result,c);
 const before=await call('rows');
 assert.equal((await call('putContext',{...c,seedHash:'f'.repeat(64)},{now})).rejected,true);
 assert.equal((await call('readContext',{intentId:c.intentId,sourceRevision:'c'.repeat(40)},{now})).rejected,true);
 assert.deepEqual(await call('rows'),before);
});
