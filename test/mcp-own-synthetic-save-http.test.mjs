import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {syntheticSaveFixture} from './fixtures/mcp-own-synthetic-save.mjs';
const api=await import('../lib/mcp-own-synthetic-save-http.mjs').catch(()=>({}));
const issuer='https://private.invalid';
async function setup(extraOptions={}){
 const f=await syntheticSaveFixture();let subject='owner',clock=Date.now();
 const handler=api.createOwnSyntheticSaveHandler({enabled:true,issuer,writerOptions:{...f.options,now:()=>clock},signingKey:'z'.repeat(32),teamDomain:'own.cloudflareaccess.com',audience:'own',accessVerifier:async()=>({ok:true,identity:{userId:subject}}),...extraOptions});
 const assertion=()=>'e30.'+Buffer.from(JSON.stringify({sub:subject,exp:Math.floor((f.options.window.expiresAt+10000)/1000)})).toString('base64url')+'.synthetic';
 const get=()=>handler(new Request(issuer+'/qa/expediente',{headers:{'Cf-Access-Jwt-Assertion':assertion()}}));
 const page=async()=>{const r=await get(),html=await r.text();assert.equal(r.status,200);return{html,ticket:html.match(/name="ticket" value="([^"]+)"/)?.[1],cookie:r.headers.get('Set-Cookie')?.split(';')[0]};};
 const post=(p,extra={})=>{const headers=new Headers({Origin:issuer,'Content-Type':'application/x-www-form-urlencoded',Cookie:p.cookie,'Cf-Access-Jwt-Assertion':assertion(),...(extra.headers??{})});if(extra.omitOrigin)headers.delete('Origin');return handler(new Request(issuer+'/qa/expediente',{method:'POST',headers,body:new URLSearchParams({ticket:p.ticket,goal:'content',...(extra.fields??{})})}));};
 return{...f,get,page,post,setSubject:x=>subject=x,setClock:x=>clock=x};
}
test('closed synthetic UI does not read identity, DB or signing material',async()=>{
 assert.equal(typeof api.createOwnSyntheticSaveHandler,'function');const handler=api.createOwnSyntheticSaveHandler({enabled:false});assert.equal((await handler(new Request(issuer+'/qa/expediente'))).status,404);
});

test('prepared server key binds the signed form to the planned event without accepting browser selectors',async()=>{
 const key='11111111-1111-4111-8111-111111111111',f=await setup({preparedSaveKey:key});
 try{
  const p=await f.page(),payload=JSON.parse(Buffer.from(p.ticket.split('.')[0],'base64url'));
  assert.equal(payload.idempotencyKey,key);
  assert.notEqual((await f.post(p,{fields:{idempotencyKey:'22222222-2222-4222-8222-222222222222'}})).status,200);
  assert.equal((await f.post(p)).status,200);
  const expected=createHash('sha256').update(JSON.stringify(['afw.own-synthetic-save.v1','owner','p',key])).digest('hex');
  assert.equal(f.db.prepare('SELECT id FROM project_events').get().id,expected);
  assert.equal((await f.post(p)).status,200);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,1);
 }finally{f.close();}
});

test('malformed prepared keys fail closed rather than falling back to random form keys',async()=>{
 for(const preparedSaveKey of ['',null,'arbitrary', '11111111-1111-1111-8111-111111111111']){
  const f=await setup({preparedSaveKey});try{assert.equal((await f.get()).status,503);}finally{f.close();}
 }
});
test('one-question native form saves one revision and truthfully distinguishes cloud review',async()=>{
 const f=await setup();try{const p=await f.page();assert.match(p.html,/Ensayo sintético/);assert.match(p.html,/Comic/);assert.doesNotMatch(p.html,/grantId|whsec_|callback.agentfriendlyweb/);const r=await f.post(p);assert.equal(r.status,200);assert.match(await r.text(),/Esto todavía no confirma/);assert.equal(f.db.prepare('SELECT revision FROM site_projects').get().revision,2);assert.equal((await f.post(p)).status,200);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,1);}finally{f.close();}
});
test('wrong origin, cookie, signed scope, identity and expiry cannot save',async()=>{
 for(const mode of ['origin','external','missingOrigin','cookie','duplicateCookie','tamper','oversize','identity','expiry','extra']){const f=await setup();try{const p=await f.page();let extra={};if(mode==='origin')extra={headers:{Origin:'null'}};if(mode==='external')extra={headers:{Origin:'https://foreign.invalid'}};if(mode==='missingOrigin')extra={omitOrigin:true};if(mode==='cookie')extra={headers:{Cookie:''}};if(mode==='duplicateCookie')extra={headers:{Cookie:p.cookie+'; '+p.cookie}};if(mode==='tamper')p.ticket+='x';if(mode==='oversize')p.ticket='x'.repeat(3000);if(mode==='identity')f.setSubject('foreign');if(mode==='expiry')f.setClock(f.options.window.expiresAt);if(mode==='extra')extra={fields:{project:'foreign'}};assert.notEqual((await f.post(p,extra)).status,200);assert.equal(f.db.prepare('SELECT revision FROM site_projects').get().revision,1);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,0);}finally{f.close();}}
});
test('own UI readiness probe observes original signed process without starting or restarting it',async()=>{
 const f=await syntheticSaveFixture();try{assert.equal(typeof f.host.readReadiness,'function');const ready=await f.host.readReadiness();assert.equal(ready.ready,true);assert.equal(ready.processGeneration,f.db.prepare('SELECT process_generation FROM dossier_node_process_admissions').get().process_generation);assert.equal(f.boots(),1);assert.equal(f.sends(),1);await f.host.close();await assert.rejects(f.host.readReadiness());assert.equal(f.boots(),1);assert.equal(f.sends(),1);}finally{f.close();}
});
