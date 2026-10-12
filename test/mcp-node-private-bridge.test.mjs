import test from 'node:test';
import assert from 'node:assert/strict';

const load=()=>import('../lib/mcp-node-private-bridge.mjs');
const ref=()=>Object.freeze({id:'sub_'+'a'.repeat(64),generation:'b'.repeat(64),phase:'verification',digest:'c'.repeat(64),processGeneration:'d'.repeat(64),expiresAt:6000});
const options=()=>({key:Buffer.alloc(32,8),containerId:'e'.repeat(64),processGeneration:'d'.repeat(64),expiresAt:10000,now:()=>1000});

test('private Node bridge binds signature to original purpose, process, container and reference',async()=>{
 const {createPrivateNodeBridge}=await load(),b=createPrivateNodeBridge(options()),p=b.sign('dispatch',ref());
 assert.deepEqual(b.verify('dispatch',p).reference,ref());
 assert.throws(()=>b.verify('consume',p));
 assert.throws(()=>createPrivateNodeBridge({...options(),containerId:'f'.repeat(64)}).verify('dispatch',p));
 const modified={...p,body:p.body.replace('verification','delivery')};assert.throws(()=>b.verify('dispatch',modified));
 assert.throws(()=>b.sign('dispatch',{...ref(),url:'https://other.example'}));
});

test('private Node bridge snapshots key, rejects getters and retains original finite lease',async()=>{
 const {createPrivateNodeBridge}=await load(),o=options(),b=createPrivateNodeBridge(o),p=b.sign('dispatch',ref());o.key.fill(0);assert.deepEqual(b.verify('dispatch',p).reference,ref());
 let reads=0;assert.throws(()=>createPrivateNodeBridge({...options(),get expiresAt(){reads++;return 10000;}}));assert.equal(reads,0);
 let time=1000;const f=createPrivateNodeBridge({...options(),now:()=>time}),a=f.sign('dispatch',ref());time=6000;assert.throws(()=>f.verify('dispatch',a));time=500;assert.throws(()=>f.verify('dispatch',a));
 assert.throws(()=>b.sign('dispatch',{...ref(),expiresAt:11000}));
});

import {DatabaseSync} from 'node:sqlite';
import {createServer} from 'node:http';
import {fork} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createMcpSubscriptionController} from '../lib/mcp-subscription-lifecycle.mjs';

async function integration(separateProcess=false){
 const m=await load(),started=Date.now(),processGeneration='d'.repeat(64),containerId='e'.repeat(64),expiresAt=started+60000;
 const bridge=m.createPrivateNodeBridge({key:Buffer.alloc(32,8),containerId,processGeneration,expiresAt,now:Date.now});
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT NOT NULL)');let queue=Promise.resolve(),lost=false,platform=true,enabled=true,received=0,referenceSeen,ports=[];
 const storage={transaction(fn){const p=queue.then(async()=>{db.exec('BEGIN');let open=true;try{const result=await fn({get:async k=>{const v=db.prepare('SELECT v FROM records WHERE k=?').get(k);return v?JSON.parse(v.v):undefined;},put:async(k,v)=>db.prepare('INSERT INTO records VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k,JSON.stringify(v))});db.exec('COMMIT');open=false;if(lost&&db.prepare('SELECT v FROM records').all().some(r=>JSON.parse(r.v).nodeStartedAt!=null)){lost=false;throw Error('lost native ACK');}return result;}catch(e){if(open)db.exec('ROLLBACK');throw e;}});queue=p.catch(()=>{});return p;}};
 const readAuthorization=async()=>({principalRef:'a'.repeat(64),resourceRef:'b'.repeat(64),projectRef:'c'.repeat(64),permissionRef:'f'.repeat(64),enabled,expiresAt});
 const readiness=async()=>({purpose:'afw.mcp-node-readiness.v1',processGeneration,ready:platform,expiresAt});
 let dispatch,child,childAlive=true;
 const sender=m.createPrivateNodeSender({bridge,dispatch:request=>dispatch(request),now:Date.now});
 const controller=identity=>createMcpSubscriptionController({storage,custodyKey:Buffer.alloc(32,4),readAuthorization,now:Date.now,nodeHost:{processGeneration,readReadiness:readiness,readIdentity:identity,send:sender}});
 const consume=m.createPrivateNodeConsumeHandler({enabled:true,bridge,readPlatformContext:async()=>({containerId:platform&&childAlive?containerId:'0'.repeat(64),processGeneration,expiresAt}),createController:async binding=>controller(binding.readIdentity),now:Date.now});
 async function serve(handler){
  const server=createServer(async(req,res)=>{try{let body='';for await(const chunk of req)body+=chunk;const reply=await handler(new Request('http://afw-node.internal'+req.url,{method:req.method,headers:req.headers,body}));res.writeHead(reply.status,Object.fromEntries(reply.headers));res.end(await reply.text());}catch{res.writeHead(500);res.end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));ports.push(server);const port=server.address().port;
  const fetcher=async request=>{const body=await request.text();referenceSeen=JSON.parse(body).reference;return fetch('http://127.0.0.1:'+port+new URL(request.url).pathname,{method:request.method,headers:request.headers,body,redirect:'error',signal:request.signal});};fetcher.origin='http://127.0.0.1:'+port;return fetcher;
 }
 const controlFetch=await serve(consume),node=m.createPrivateNodeDispatchHandler({enabled:true,bridge,consume:controlFetch,send:async(_url,envelope,signal)=>{assert.ok(!signal.aborted);received++;const b=JSON.parse(envelope.body);return{status:200,body:JSON.stringify({challenge:b.challenge})};},now:Date.now});
 if(separateProcess){
  child=fork(fileURLToPath(new URL('./fixtures/mcp-node-process-bridge.mjs',import.meta.url)),[],{stdio:['ignore','pipe','pipe','ipc']});child.on('exit',()=>{childAlive=false;});
  child.on('message',m=>{if(m.type==='synthetic_callback')received++;});
  const port=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{child.kill();reject(Error('child readiness timeout'));},5000);child.once('error',reject);child.once('exit',()=>{clearTimeout(timer);reject(Error('child early exit'));});child.on('message',m=>{if(m.type==='ready'){clearTimeout(timer);resolve(m.port);}else if(m.type==='unavailable'){clearTimeout(timer);reject(Error('child unavailable'));}});child.send({bridge:{key:Buffer.alloc(32,8).toString('base64'),containerId,processGeneration,expiresAt},controlUrl:controlFetch.origin});});
  dispatch=async request=>{const body=await request.text();referenceSeen=JSON.parse(body).reference;return fetch('http://127.0.0.1:'+port+new URL(request.url).pathname,{method:request.method,headers:request.headers,body,redirect:'error',signal:request.signal});};
 }else dispatch=await serve(node);
 const a=controller(async()=>{throw Error('sender cannot consume locally');});
 const params={name:'afw.dossier.changed',arguments:{projectRef:'c'.repeat(64)},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')},ttlMs:60000};
 return{bridge,a,params,storage,processGeneration,expiresAt,consume,node,sender,received:()=>received,reference:()=>referenceSeen,loseAck(){lost=true;},retirePlatform(){platform=false;},withdrawPermission(){enabled=false;},rows:()=>db.prepare('SELECT v FROM records').all().map(r=>JSON.parse(r.v)),async close(){if(child&&childAlive)await new Promise(resolve=>{child.once('exit',resolve);child.kill();});for(const s of ports){s.closeAllConnections();await new Promise(resolve=>s.close(resolve));}db.close();}};
}

test('native private HTTP roundtrip consumes SAME SQLite authority before callback and cannot replay',async()=>{
 const f=await integration();try{
  const r=await f.a.subscribe(f.params);assert.equal(f.received(),1);assert.ok(f.rows().some(r=>r.version===2&&r.nodeStartedAt!==null));
  const ref=f.reference();assert.deepEqual(Object.keys(ref),Object.keys(referenceShape(ref)));assert.ok(!JSON.stringify(ref).includes('callback.agentfriendlyweb.dev'));
  await assert.rejects(f.sender(ref));assert.equal(f.received(),1);
  const event={version:'afw-dossier-event-v1',eventId:'1'.repeat(64),projectRef:'c'.repeat(64),revision:1,kind:'project_updated',observedAt:new Date().toISOString()};
  const receipt=await f.a.deliver(r.id,event);assert.equal(receipt.cloudReviewConfirmed,false);assert.equal(f.received(),2);
  await assert.rejects(f.a.deliver(r.id,event));assert.equal(f.received(),2);
 }finally{await f.close();}
});
function referenceShape(r){return{id:r.id,generation:r.generation,phase:r.phase,digest:r.digest,processGeneration:r.processGeneration,expiresAt:r.expiresAt};}

test('native consume ACK loss spends SAME stage without returning bytes or retrying callback',async()=>{
 const f=await integration();try{f.loseAck();await assert.rejects(f.a.subscribe(f.params));assert.equal(f.received(),0);assert.ok(f.rows().some(r=>r.version===2&&r.nodeStartedAt!==null));await assert.rejects(f.sender(f.reference()));assert.equal(f.received(),0);}finally{await f.close();}
});

test('private control default closed and forged signature cannot consult platform or authority',async()=>{
 const m=await load();let reads=0;const closed=m.createPrivateNodeConsumeHandler({bridge:null,readPlatformContext:()=>{reads++;}});assert.equal((await closed(new Request('http://test/consume'))).status,404);assert.equal(reads,0);
 const f=await integration();try{const bad=new Request('http://afw-node.internal/consume',{method:'POST',headers:{'Content-Type':'application/json','X-AFW-Node-Signature':'0'.repeat(64)},body:'{}'});assert.equal((await f.consume(bad)).status,404);assert.equal(f.rows().length,0);assert.equal(f.received(),0);}finally{await f.close();}
});

test('cryptographic receipt and handoff are required; bare HTTP200 cannot complete native sender',async()=>{
 const m=await load(),b=m.createPrivateNodeBridge(options()),s=m.createPrivateNodeSender({bridge:b,now:()=>1000,dispatch:async()=>new Response('{"status":200,"body":"ok"}',{headers:{'Content-Type':'application/json'}})});await assert.rejects(s(ref()),/Private Node bridge unavailable/);
 const f=await integration();try{f.retirePlatform();await assert.rejects(f.a.subscribe(f.params));assert.equal(f.rows().length,0);assert.equal(f.received(),0);}finally{await f.close();}
});


test('bridge refuses unbounded process lease before signing any request',async()=>{
 const m=await load();assert.throws(()=>m.createPrivateNodeBridge({...options(),expiresAt:601001}),/Private Node bridge unavailable/);
});

test('consumer abort during platform lookup cannot consult durable controller',async()=>{
 const m=await load(),bridge=m.createPrivateNodeBridge(options()),p=bridge.sign('consume',ref()),a=new AbortController();let controllers=0;
 const handler=m.createPrivateNodeConsumeHandler({enabled:true,bridge,now:()=>1000,readPlatformContext:async()=>{a.abort();return{containerId:'e'.repeat(64),processGeneration:'d'.repeat(64),expiresAt:10000};},createController:async()=>{controllers++;return{consumeNodeDispatch:async()=>{throw Error('should not reach durable stage');}};}});
 const result=await handler(new Request('http://afw-node.internal/consume',{method:'POST',headers:{'Content-Type':'application/json','X-AFW-Node-Signature':p.signature},body:p.body,signal:a.signal}));assert.equal(result.status,404);assert.equal(controllers,0);
});


test('standalone native Node child receives opaque reference and consumes same original SQLite stage',async()=>{
 const f=await integration(true);try{const r=await f.a.subscribe(f.params);assert.equal(f.received(),1);await assert.rejects(f.sender(f.reference()));assert.equal(f.received(),1);const receipt=await f.a.deliver(r.id,{version:'afw-dossier-event-v1',eventId:'2'.repeat(64),projectRef:'c'.repeat(64),revision:2,kind:'project_updated',observedAt:new Date().toISOString()});assert.equal(receipt.cloudReviewConfirmed,false);assert.equal(f.received(),2);assert.equal(f.rows().filter(r=>r.version===2&&r.nodeStartedAt!==null).length,2);}finally{await f.close();}
});

test('standalone native Node child cannot receive a handoff after original consume ACK is lost',async()=>{
 const f=await integration(true);try{f.loseAck();await assert.rejects(f.a.subscribe(f.params));assert.equal(f.received(),0);await assert.rejects(f.sender(f.reference()));assert.equal(f.received(),0);}finally{await f.close();}
});

test('one millisecond cross-process clock difference does not extend original transport expiry',async()=>{
 const m=await load(),sender=m.createPrivateNodeBridge({...options(),now:()=>1001});let local=1000;const receiver=m.createPrivateNodeBridge({...options(),now:()=>local});const p=sender.sign('consume',ref());assert.deepEqual(receiver.verify('consume',p).reference,ref());local=6000;assert.throws(()=>receiver.verify('consume',p));
 const far=m.createPrivateNodeBridge({...options(),now:()=>2001});assert.throws(()=>m.createPrivateNodeBridge(options()).verify('consume',far.sign('consume',ref())));
});

test('hung platform lookup settles by original deadline without creating durable controller',async()=>{
 const m=await load(),begin=Date.now(),o={...options(),expiresAt:begin+10000,now:Date.now},b=m.createPrivateNodeBridge(o),r={...ref(),expiresAt:begin+150},p=b.sign('consume',r);let controllers=0;
 const handler=m.createPrivateNodeConsumeHandler({enabled:true,bridge:b,now:Date.now,readPlatformContext:()=>new Promise(()=>{}),createController:()=>{controllers++;throw Error('must not reach controller');}});
 const result=await Promise.race([handler(new Request('http://afw-node.internal/consume',{method:'POST',headers:{'Content-Type':'application/json','X-AFW-Node-Signature':p.signature},body:p.body})),new Promise(resolve=>setTimeout(()=>resolve(null),1000))]);assert.ok(result,'private handler stayed pending beyond deadline');assert.equal(result.status,404);assert.equal(controllers,0);
});

test('caller cancellation settles hung identity immediately and late lookup cannot construct authority',async()=>{
 const m=await load(),begin=Date.now(),b=m.createPrivateNodeBridge({...options(),expiresAt:begin+10000,now:Date.now}),p=b.sign('consume',{...ref(),expiresAt:begin+5000}),a=new AbortController();let finish,controllers=0;
 const handler=m.createPrivateNodeConsumeHandler({enabled:true,bridge:b,now:Date.now,readPlatformContext:()=>new Promise(resolve=>{finish=resolve;a.abort();}),createController:()=>{controllers++;throw Error('must not reach controller');}});
 const result=await Promise.race([handler(new Request('http://afw-node.internal/consume',{method:'POST',headers:{'Content-Type':'application/json','X-AFW-Node-Signature':p.signature},body:p.body,signal:a.signal})),new Promise(resolve=>setTimeout(()=>resolve(null),1000))]);assert.ok(result,'caller abort left handler pending');assert.equal(result.status,404);finish({containerId:'e'.repeat(64),processGeneration:'d'.repeat(64),expiresAt:begin+10000});await new Promise(resolve=>setImmediate(resolve));assert.equal(controllers,0);
});

test('private sender settles hung fixed transport at original deadline even if transport ignores signal',async()=>{
 const m=await load(),begin=Date.now(),b=m.createPrivateNodeBridge({...options(),expiresAt:begin+10000,now:Date.now}),sender=m.createPrivateNodeSender({bridge:b,now:Date.now,dispatch:()=>new Promise(()=>{})});
 const result=await Promise.race([sender({...ref(),expiresAt:begin+150}).then(()=>false,()=>true),new Promise(resolve=>setTimeout(()=>resolve(false),1000))]);assert.equal(result,true,'sender remained pending past original deadline');
});
