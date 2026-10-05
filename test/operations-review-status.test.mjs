import test from 'node:test';
import assert from 'node:assert/strict';
import {reviewNavigationStatus} from '../lib/operations-review-status.mjs';
import worker from '../worker/operations-review/handler.mjs';
const url='https://operations-review.agentfriendlyweb.dev/';
const navigation=()=>new Request(url,{headers:{Accept:'text/html','Sec-Fetch-Mode':'navigate','Sec-Fetch-Dest':'document'}});
test('closed human navigation explains closure without suggesting an identity diagnosis',async()=>{
 const response=await worker.fetch(navigation(),{});
 assert.equal(response.status,404);assert.match(response.headers.get('content-type'),/text\/html/);
 const html=await response.text();assert.match(html,/ensayo está cerrado/);assert.match(html,/Comic Sans MS/);assert.doesNotMatch(html,/cookie|cuenta equivocada|<script|<form/i);
 assert.equal(response.headers.get('cache-control'),'no-store');assert.match(response.headers.get('content-security-policy'),/frame-ancestors 'none'/);
});
test('all known failures retain their status and human wording without external assets',async()=>{
 for(const [code,status] of [['unavailable',404],['try_later',429],['same_origin_required',403],['operator_identity_required',401],['temporarily_unavailable',503],['invalid_request',400]]){
  const response=await reviewNavigationStatus(navigation(),Response.json({code},{status}));
  assert.equal(response.status,status);assert.match(response.headers.get('content-type'),/text\/html/);
  assert.doesNotMatch(await response.text(),/https?:\/\/|<script|<form/);
 }
});
test('API fetch, POST, successful and unknown responses remain untouched',async()=>{
 for(const request of [new Request(url),new Request(url,{method:'POST',headers:navigation().headers})]){
  const original=Response.json({code:'unavailable'},{status:404});assert.equal(await reviewNavigationStatus(request,original),original);
 }
 for(const original of [new Response('ok'),Response.json({code:'unknown'},{status:503})])assert.equal(await reviewNavigationStatus(navigation(),original),original);
 const api=await worker.fetch(new Request(url),{});assert.deepEqual(await api.json(),{code:'unavailable'});
});


test('foreign form navigation presents the origin rejection without weakening POST API errors',async()=>{
 const form=new Request(url+'notices/review',{method:'POST',headers:{Accept:'text/html','Sec-Fetch-Mode':'navigate','Sec-Fetch-Dest':'document',Origin:'https://review-csrf-qa.agentfriendlyweb.dev','Sec-Fetch-Site':'same-site'}});
 const response=await reviewNavigationStatus(form,Response.json({code:'same_origin_required'},{status:403}));
 assert.equal(response.status,403);assert.match(response.headers.get('content-type'),/text\/html/);
 assert.match(await response.text(),/Abramos la revisión desde AFW/);
 assert.match(response.headers.get('content-security-policy'),/form-action 'none'/);
 const api=new Request(url+'notices/review',{method:'POST',headers:{Accept:'application/json'}});
 const denied=Response.json({code:'same_origin_required'},{status:403});assert.equal(await reviewNavigationStatus(api,denied),denied);
 for(const [code,status] of [['operator_identity_required',401],['temporarily_unavailable',503],['unavailable',404]]){
  const original=Response.json({code},{status});assert.equal(await reviewNavigationStatus(form,original),original);
 }
});
