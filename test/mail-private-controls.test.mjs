import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateKeyPair, SignJWT } from 'jose';
import { operationsDb } from './fixtures/operations-db.mjs';
import { storeMailContent } from '../lib/mail-custody.mjs';
import { prepareMail } from '../lib/mail-outbox.mjs';
import { createMailPrivateControls } from '../lib/mail-private-controls.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const config={enabled:true,origin:'https://mail-ops.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'mail-only',subject:'operator-1'};
async function setup() {
  const store=operationsDb(); store.sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql',import.meta.url),'utf8'));
  const hash=await storeMailContent(store.db,'reply-1',{to:'owner@example.com',subject:'Synthetic',text:'Reviewable'});
  await prepareMail(store.db,{key:'reply-1',sourceRef:'source-1',contentHash:hash},100);
  const jwt=await new SignJWT({email:'owner@example.com'}).setProtectedHeader({alg:'RS256'}).setIssuer('https://test.cloudflareaccess.com').setAudience('mail-only').setSubject('operator-1').setExpirationTime('5m').sign(privateKey);
  const handle=createMailPrivateControls({db:store.db,config,keySet:publicKey,now:()=>101});
  function request(path,body,headers={}) {
    return new Request(config.origin+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':jwt,'Content-Type':'application/json',Origin:config.origin,...headers},body:body?JSON.stringify(body):undefined});
  }
  return {...store,hash,handle,request};
}
test('signed operator reviews exact content, approves atomically and revokes without a sending route',async()=>{
  const {db,hash,handle,request}=await setup();
  const page=await handle(request('/message/reply-1'));
  assert.equal(page.status,200);
  assert.match(page.headers.get('Content-Type'),/text\/html/);
  assert.equal((await handle(new Request(config.origin+'/message/reply-1'))).status,401);
  const review=await handle(request('/review/reply-1'));
  assert.equal(review.status,200); assert.equal(review.headers.get('Cache-Control'),'no-store');
  assert.equal((await review.json()).contentHash,hash);
  assert.equal((await handle(request('/approve',{key:'reply-1',contentHash:hash}))).status,201);
  assert.equal((await db.prepare('SELECT state FROM mail_outbox').first()).state,'approved');
  assert.equal((await handle(request('/send',{key:'reply-1'}))).status,404);
  assert.equal((await handle(request('/revoke',{key:'reply-1'}))).status,200);
  assert.equal((await db.prepare('SELECT state FROM mail_outbox').first()).state,'cancelled');
  assert.equal((await db.prepare('SELECT revoked_at FROM mail_decisions').first()).revoked_at,101);
});
test('cross-origin, missing identity, wrong hash and extra authorization fields cannot approve',async()=>{
  const {db,hash,handle,request}=await setup();
  for(const req of [request('/approve',{key:'reply-1',contentHash:hash},{Origin:'https://other.example'}),request('/approve',{key:'reply-1',contentHash:hash},{'Cf-Access-Jwt-Assertion':''}),request('/approve',{key:'reply-1',contentHash:'b'.repeat(64)}),request('/approve',{key:'reply-1',contentHash:hash,actorRef:'spoof'})]) {
    assert.ok((await handle(req)).status>=400);
  }
  assert.equal((await db.prepare('SELECT state FROM mail_outbox').first()).state,'draft');
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM mail_decisions').first()).n,0);
});
test('storage fault rolls back decision and approval together; simultaneous approvals have one winner',async()=>{
  const {db,hash,handle,request,failBatchAt}=await setup();
  failBatchAt(1);
  assert.equal((await handle(request('/approve',{key:'reply-1',contentHash:hash}))).status,503);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM mail_decisions').first()).n,0);
  failBatchAt(-1);
  const replies=await Promise.all([handle(request('/approve',{key:'reply-1',contentHash:hash})),handle(request('/approve',{key:'reply-1',contentHash:hash}))]);
  assert.deepEqual(replies.map(r=>r.status).sort(),[201,409]);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM mail_decisions').first()).n,1);
});
test('review distinguishes missing and retired content without exposing stored hashes alone',async()=>{
  const {db,handle,request}=await setup();
  assert.equal((await handle(request('/review/missing'))).status,404);
  await db.prepare("UPDATE mail_content SET content_json='' WHERE reply_key='reply-1'").run();
  assert.equal((await handle(request('/review/reply-1'))).status,410);
});
