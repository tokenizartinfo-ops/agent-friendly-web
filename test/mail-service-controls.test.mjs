import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateKeyPair,SignJWT } from 'jose';
import { operationsDb } from './fixtures/operations-db.mjs';
import { storeMailContent,storeMailDecision } from '../lib/mail-custody.mjs';
import { prepareMail,approveMail } from '../lib/mail-outbox.mjs';
import { createMailServiceControls } from '../lib/mail-service-controls.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const config={enabled:true,origin:'https://mail-consumer.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'consumer-only',operatorAudience:'operator-only',clientId:'synthetic-client.access'};
async function token(claims={common_name:config.clientId},audience=config.audience,subject=''){
  return new SignJWT({type:'app',...claims}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(audience).setSubject(subject).setExpirationTime('5m').sign(privateKey);
}
async function setup() {
  const {db,sqlite}=operationsDb();sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql',import.meta.url),'utf8'));
  const hash=await storeMailContent(db,'reply-1',{to:'owner@example.com',subject:'Synthetic',text:'Approved'});
  await prepareMail(db,{key:'reply-1',sourceRef:'source-1',contentHash:hash},100);
  await storeMailDecision(db,{key:'reply-1',contentHash:hash,decisionRef:'decision-1',actorRef:'actor-1',expiresAt:200},100);
  await approveMail(db,'reply-1',hash,'decision-1',100);
  return db;
}
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
