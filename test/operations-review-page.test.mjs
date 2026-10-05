import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {renderReviewPage,REVIEW_SCRIPT} from '../lib/operations-review-page.mjs';
const target={runId:crypto.randomUUID(),resource:'afw_delegated_canary',originalRevision:1,reservedAt:Date.now()-10000,expiresAt:Date.now()-1000,outcome:'superseded',observedAt:Date.now(),snapshot:{revision:2,condition:'paused',sequence:0},lastReview:null,choices:[{decision:'retain_block',reason:'investigation_required'},{decision:'close_obsolete',reason:'producer_paused'}]};
test('guided review is one question, semantic controls, comic body and escaped server state',()=>{
 const page=renderReviewPage(target,'synthetic_nonce_123456');
 assert.match(page,/¿Cómo seguimos con este aviso\?/);assert.match(page,/Comic Sans MS/);assert.match(page,/aria-live="polite"/);assert.match(page,/type="button"/);assert.match(page,/nonce="synthetic_nonce_123456"/);
 assert.match(page,/no certifica/i);assert.match(page,/Comprobar esta decisión/);assert.equal((page.match(/data-choice=/g)||[]).length,2);
 const escaped=renderReviewPage({...target,snapshot:{...target.snapshot,condition:'</script><script>alert(1)</script>'}},'synthetic_nonce_123456');
 assert.doesNotMatch(escaped,/<script>alert/);assert.match(escaped,/\\u003c/);
 const empty=renderReviewPage(null,'synthetic_nonce_123456');assert.match(empty,/No hay una decisión disponible/);assert.doesNotMatch(empty,/data-choice=/);
});
function browser(fetchImpl){
 const controls=target.choices.map((_,i)=>({dataset:{choice:String(i)},disabled:false,textContent:'Guardar',addEventListener(_,fn){this.click=fn;}}));
 const elements={choices:{hidden:false},status:{textContent:'',focus(){},setAttribute(){}},receipt:{textContent:''},previous:{hidden:false}};
 const context={document:{querySelectorAll:()=>controls,getElementById:id=>elements[id]},reviewState:{target},fetch:fetchImpl,crypto,AbortController,setTimeout,clearTimeout,Date,Number,JSON,Array,Object};
 vm.runInNewContext(REVIEW_SCRIPT,context);return {controls,elements};
}
test('lost response keeps the identical review request for explicit retry and confirms only a matching receipt',async()=>{
 const bodies=[];const b=browser(async(_url,options)=>{bodies.push(JSON.parse(options.body));if(bodies.length===1)throw Error('response lost');return Response.json({review:{sequence:1,decision:bodies[0].decision,reason:bodies[0].reason,reviewedAt:Date.now()}});});
 await b.controls[0].click();assert.match(b.elements.status.textContent,/no pude confirmar/i);assert.equal(b.controls[1].disabled,true);
 await b.controls[0].click();assert.deepEqual(bodies[0],bodies[1]);assert.match(b.elements.status.textContent,/quedó guardada/i);assert.equal(b.elements.choices.hidden,true);assert.equal(b.elements.previous.hidden,true);
});
test('historical receipt uses unambiguous UTC time and shows a receipt heading rather than another decision',()=>{
 const stamp=Date.parse('2026-10-05T16:00:00.000Z');
 const page=renderReviewPage({...target,observedAt:stamp,choices:[],lastReview:{sequence:1,decision:'close_obsolete',reason:'producer_paused',reviewedAt:stamp}},'synthetic_nonce_123456');
 assert.match(page,/16:00:00 UTC/);assert.match(page,/<h1 id="question">La decisión quedó registrada/);assert.doesNotMatch(page,/data-choice=/);
});
test('conflict or malformed success never claims saved and never automatically sends a new decision',async()=>{
 for(const response of [Response.json({code:'not_reviewed'},{status:409}),Response.json({review:{sequence:99,decision:'close_obsolete',reason:'producer_paused',reviewedAt:Date.now()}})]){
  let calls=0;const b=browser(async()=>{calls++;return response;});await b.controls[0].click();assert.equal(calls,1);assert.doesNotMatch(b.elements.status.textContent,/quedó guardada/i);assert.equal(b.elements.choices.hidden,false);
 }
});
