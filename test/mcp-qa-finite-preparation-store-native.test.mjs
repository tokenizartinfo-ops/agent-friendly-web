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
 assert.equal((await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:15})).result.status,'recorded');
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
 assert.equal((await call('publishSelection',{preparation:c.ownerPreparation,selection:f.contextSelection,expectedHeadHash:null},{now:c.T0-5})).result.status,'recorded');
 assert.equal((await call('bindSelection',f.contextBinding,{now})).result.status,'recorded');
 assert.equal((await call('putContext',c,{now})).result.status,'recorded');
 assert.deepEqual((await call('readContext',{intentId:c.intentId,sourceRevision:c.sourceRevision},{now})).result,c);
 const before=await call('rows');
 assert.equal((await call('putContext',{...c,seedHash:'f'.repeat(64)},{now})).rejected,true);
 assert.equal((await call('readContext',{intentId:c.intentId,sourceRevision:'c'.repeat(40)},{now})).rejected,true);
 assert.deepEqual(await call('rows'),before);
});

test('backdated_selection_published_after_T0_cannot_bind',async t=>{
 const {call,f}=await native(t);
 assert.equal((await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:25})).result.status,'recorded');
 assert.equal((await call('bindSelection',f.binding,{now:30})).rejected,true);
 const before=await call('rows');
 assert.equal((await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:31})).result.status,'existing');
 assert.deepEqual(await call('rows'),before);
});
test('head_transaction_held_across_T0_cannot_backdate_publication',async t=>{
 const {call,f}=await native(t);
 const r=await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:15,holdFirstCommitUntil:25});
 assert.equal(r.result.status,'recorded');assert.equal(r.committed,true);
 assert.equal((await call('bindSelection',f.binding,{now:30})).rejected,true);
});
test('lost_head_ack_never_manufactures_publication_witness',async t=>{
 const {call,f}=await native(t),value={preparation:f.preparation,selection:f.selection,expectedHeadHash:null};
 const lost=await call('publishSelection',value,{now:15,loseCommitAck:true});
 assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
 const before=await call('rows');assert.ok(before.length>=3);
 assert.equal((await call('publishSelection',value,{now:16})).result.status,'uncertain');
 assert.deepEqual(await call('rows'),before);
 assert.equal((await call('bindSelection',f.binding,{now:30})).rejected,true);
});
test('lost_witness_ack_keeps_actual_witness_and_history',async t=>{
 const {call,f}=await native(t),value={preparation:f.preparation,selection:f.selection,expectedHeadHash:null};
 const lost=await call('publishSelection',value,{now:15,loseCommitNumber:2});
 assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
 const before=await call('rows');assert.ok(before.length>=4);
 // Exact durable readback can recover facts, never send authorization or a new witness.
 assert.equal((await call('publishSelection',value,{now:16})).result.status,'existing');
 assert.deepEqual(await call('rows'),before);
 assert.equal((await call('bindSelection',f.binding,{now:30})).result.status,'recorded');
});

test('consume_ticket_snapshots_argument_across_actual_native_get',async t=>{
 const {call,f}=await native(t),A=f.ticket.ticketHash,B='b'.repeat(64),R='c'.repeat(64);
 assert.equal((await call('putTicket',f.ticket)).result.status,'recorded');
 assert.equal((await call('putTicket',{...f.ticket,ticketHash:B})).result.status,'recorded');
 const first=await call('consumeTicket',{ticketHash:A,recordHash:R},{mutateArgumentAfterGet:{key:'owner-ticket:'+A+':use',changes:{ticketHash:B}}});
 assert.equal(first.argumentMutations,1);assert.equal(first.result.status,'recorded');
 assert.equal((await call('consumeTicket',{ticketHash:B,recordHash:R})).result.status,'recorded');
 const rows=new Map(await call('rows')),aUse=JSON.parse(rows.get('owner-ticket:'+A+':use')),bUse=JSON.parse(rows.get('owner-ticket:'+B+':use'));
 assert.equal(aUse.ticketHash,A);assert.equal(bUse.ticketHash,B);
 assert.equal([aUse,bUse].filter(use=>use.ticketHash===B).length,1);
 const before=await call('rows');
 assert.equal((await call('consumeTicket',{ticketHash:A,recordHash:R})).result.status,'existing');
 assert.equal((await call('consumeTicket',{ticketHash:B,recordHash:'d'.repeat(64)})).rejected,true);
 assert.deepEqual(await call('rows'),before);
});
test('notice_kind_mutation_cannot_skip_actual_grant_predecessor',async t=>{
 const {call,f}=await native(t);
 await call('putPreconnection',f.preconnection);
 const notice={preconnectionId:f.preconnection.preconnectionId,grantHash:'d'.repeat(64),eventHash:'e'.repeat(64),sequence:1,acceptedAt:30};
 const before=await call('rows');
 const r=await call('putLink',{kind:'notice',record:notice},{mutateArgumentAfterGet:{key:'connection-preparation:'+notice.preconnectionId+':record',changes:{kind:'grant'}}});
 assert.equal(r.argumentMutations,1);assert.equal(r.rejected,true);
 assert.deepEqual(await call('rows'),before);
});
test('notice_kind_mutation_cannot_change_native_append_key',async t=>{
 const {call,f}=await native(t);
 await call('putPreconnection',f.preconnection);
 const grant={preconnectionId:f.preconnection.preconnectionId,authorizationHash:'c'.repeat(64),grantId:'grant',grantHash:'d'.repeat(64),acceptedAt:20};
 const notice={preconnectionId:grant.preconnectionId,grantHash:grant.grantHash,eventHash:'e'.repeat(64),sequence:1,acceptedAt:30};
 await call('putLink',{kind:'grant',record:grant});
 const r=await call('putLink',{kind:'notice',record:notice},{mutateArgumentAfterGet:{key:'connection-preparation:'+notice.preconnectionId+':record',changes:{kind:'grant'}}});
 assert.equal(r.argumentMutations,1);assert.equal(r.result?.status,'recorded');
 const rows=new Map(await call('rows'));
 assert.deepEqual(JSON.parse(rows.get('connection-preparation:'+notice.preconnectionId+':grant')),grant);
 assert.deepEqual(JSON.parse(rows.get('connection-preparation:'+notice.preconnectionId+':notice')),notice);
});
