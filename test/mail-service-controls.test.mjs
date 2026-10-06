import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateKeyPair,SignJWT } from 'jose';
import { operationsDb } from './fixtures/operations-db.mjs';
import { storeMailContent,storeMailDecision } from '../lib/mail-custody.mjs';
import { prepareMail,approveMail } from '../lib/mail-outbox.mjs';
import { createMailServiceControls } from '../lib/mail-service-controls.mjs';
import { brandedMessage } from './fixtures/branded-mail.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const config={enabled:true,origin:'https://mail-consumer.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'consumer-only',operatorAudience:'operator-only',clientId:'synthetic-client.access'};
async function token(claims={common_name:config.clientId},audience=config.audience,subject=''){
  return new SignJWT({type:'app',...claims}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(audience).setSubject(subject).setExpirationTime('5m').sign(privateKey);
}
async function setup(message={to:'owner@example.com',subject:'Synthetic',text:'Approved'}) {
  const {db,sqlite}=operationsDb();sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql',import.meta.url),'utf8'));
  const hash=await storeMailContent(db,'reply-1',message);
  await prepareMail(db,{key:'reply-1',sourceRef:'source-1',contentHash:hash},100);
  await storeMailDecision(db,{key:'reply-1',contentHash:hash,decisionRef:'decision-1',actorRef:'actor-1',expiresAt:200},100);
  await approveMail(db,'reply-1',hash,'decision-1',100);
  return db;
}

test('service brand promotion is server-only and preserves the exact approved payload',async()=>{
  const content=await brandedMessage(),db=await setup(content),sent=[];
  const options={db,config,keySet:publicKey,now:()=>101,limiter:{limit:async()=>({success:true})},email:{send:async value=>{sent.push(value);return {messageId:'<brand@example.com>'};}}};
  const jwt=await token(),request=()=>new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt}});
  assert.equal((await (await createMailServiceControls(options)(request())).json()).state,'blocked');
  assert.equal(sent.length,0);
  const handle=createMailServiceControls({...options,config:{...config,brandEnabled:true,brandStartsAt:'1970-01-01T00:00:00.100Z',brandExpiresAt:'1970-01-01T00:00:00.200Z'}});
  assert.equal((await (await handle(request())).json()).state,'accepted');
  assert.deepEqual(sent[0],content.brand.message);
  assert.equal((await (await handle(request())).json()).state,'not_claimed');
  assert.equal(sent.length,1);
});

test('brand trial rejects missing, malformed, future, overlong and expired windows with a still-valid service token',async()=>{
  const db=await setup(await brandedMessage()),jwt=await token();let sends=0;
  const options={db,keySet:publicKey,now:()=>101,limiter:{limit:async()=>({success:true})},email:{send:async()=>{sends++;return {messageId:'<unexpected@example.com>'};}}};
  for(const window of [
    {},{brandStartsAt:'bad',brandExpiresAt:'bad'},
    {brandStartsAt:'1970-01-01T00:00:00.102Z',brandExpiresAt:'1970-01-01T00:00:00.200Z'},
    {brandStartsAt:'1970-01-01T00:00:00.000Z',brandExpiresAt:'1970-01-01T00:10:00.001Z'},
    {brandStartsAt:'1970-01-01T00:00:00.000Z',brandExpiresAt:'1970-01-01T00:00:00.101Z'},
  ]){
    const handle=createMailServiceControls({...options,config:{...config,brandEnabled:true,...window}});
    const response=await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt}}));
    assert.equal(response.status,404);
  }
  assert.equal(sends,0);
  assert.equal((await db.prepare('SELECT state FROM mail_outbox').first()).state,'approved');
});

test('expiry while the limiter awaits prevents claiming an approved branded message',async()=>{
  const db=await setup(await brandedMessage());let clock=101,sends=0;
  const handle=createMailServiceControls({db,keySet:publicKey,now:()=>clock,config:{...config,brandEnabled:true,brandStartsAt:'1970-01-01T00:00:00.100Z',brandExpiresAt:'1970-01-01T00:00:00.150Z'},limiter:{limit:async()=>{clock=150;return {success:true};}},email:{send:async()=>{sends++;return {messageId:'<unexpected@example.com>'};}}});
  const response=await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':await token()}}));
  assert.equal((await response.json()).state,'blocked');assert.equal(sends,0);
  assert.equal((await db.prepare('SELECT state FROM mail_outbox').first()).state,'approved');
});

test('expiry after claim cancels the attempt before any provider call',async()=>{
  const db=await setup(await brandedMessage());let clock=101,sends=0;
  const delayedDb={prepare(sql){let statement=db.prepare(sql);return {bind(...args){statement=statement.bind(...args);return this;},async first(){const row=await statement.first();if(sql.includes("SET state='sending'"))clock=150;return row;},run(){return statement.run();}};}};
  const handle=createMailServiceControls({db:delayedDb,keySet:publicKey,now:()=>clock,config:{...config,brandEnabled:true,brandStartsAt:'1970-01-01T00:00:00.100Z',brandExpiresAt:'1970-01-01T00:00:00.150Z'},limiter:{limit:async()=>({success:true})},email:{send:async()=>{sends++;return {messageId:'<unexpected@example.com>'};}}});
  const response=await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':await token()}}));
  assert.equal((await response.json()).state,'blocked');assert.equal(sends,0);
  assert.equal((await db.prepare('SELECT state FROM mail_outbox').first()).state,'cancelled');
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM mail_receipts').first()).n,0);
});
test('service can consume an approved key once using bound custody and provider',async()=>{
  const db=await setup();let sends=0;
  const handle=createMailServiceControls({db,config,keySet:publicKey,now:()=>101,limiter:{limit:async()=>({success:true})},email:{send:async()=>{sends++;return {messageId:'<synthetic@example.com>'};}}});
  const jwt=await token();const request=()=>new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt}});
  assert.equal((await (await handle(request())).json()).state,'accepted');
  await handle(request());assert.equal(sends,1);
});
test('an empty transport body is allowed but any actual payload is rejected before send',async()=>{
  const db=await setup();let sends=0;
  const handle=createMailServiceControls({db,config,keySet:publicKey,now:()=>101,limiter:{limit:async()=>({success:true})},email:{send:async()=>{sends++;return {messageId:'<empty-transport@example.com>'};}}});
  const jwt=await token();
  for(const body of [' ', '{}', 'x']) {
    const result=await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,'Content-Length':'0'},body}));
    assert.equal(result.status,403);assert.equal(sends,0);
  }
  const result=await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,'Content-Length':'0'},body:''}));
  assert.equal((await result.json()).state,'accepted');assert.equal(sends,1);
  const again=await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt},body:''}));
  assert.equal((await again.json()).state,'not_claimed');assert.equal(sends,1);
});
test('an unfinished transport body fails closed within a bounded read',async()=>{
  const db=await setup();let sends=0,cancelled=false;
  const handle=createMailServiceControls({db,config,keySet:publicKey,now:()=>101,limiter:{limit:async()=>({success:true})},email:{send:async()=>{sends++;}}});
  const body=new ReadableStream({cancel(){cancelled=true;}});
  const request=new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':await token()},body,duplex:'half'});
  const result=await handle(request);
  assert.equal(result.status,403);assert.equal((await result.json()).code,'service_request_required');
  assert.equal(sends,0);assert.equal(cancelled,true);
});
test('human token, wrong service, shared audience, browser origin and arbitrary payload fail closed',async()=>{
  const db=await setup();let sends=0;
  const options={db,config,keySet:publicKey,email:{send:async()=>{sends++;}},limiter:{limit:async()=>({success:true})}};
  const handle=createMailServiceControls(options);
  for(const jwt of [await token({email:'owner@example.com'},'operator-only','operator-1'),await token({common_name:'other.access'}),await token({common_name:config.clientId},config.audience,'operator-1'),await token({common_name:config.clientId},[config.audience,config.operatorAudience])]) {
    assert.equal((await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt}}))).status,401);
  }
  const jwt=await token();
  for(const extra of [{headers:{Origin:config.origin}},{body:'{"to":"other@example.com"}'}]){
    assert.ok((await handle(new Request(config.origin+'/consume/reply-1',{method:'POST',...extra,headers:{'Cf-Access-Jwt-Assertion':jwt,...extra.headers}}))).status>=400);
  }
  const sameAudience=createMailServiceControls({...options,config:{...config,operatorAudience:config.audience}});
  assert.equal((await sameAudience(new Request(config.origin+'/consume/reply-1',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt}}))).status,401);
  assert.equal(sends,0);
});
