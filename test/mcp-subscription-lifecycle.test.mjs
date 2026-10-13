import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {createDecipheriv,hkdfSync,createHash} from 'node:crypto';
const load=()=>import('../lib/mcp-subscription-lifecycle.mjs');
const secret='whsec_'+Buffer.alloc(32,3).toString('base64');
const params=()=>({name:'afw.dossier.changed',arguments:{projectRef:'c'.repeat(64)},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret},ttlMs:600000,cursor:null});
function fixture(){
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT NOT NULL)');let queue=Promise.resolve(),time=1000,sends=0,lost=false,mode='echo',hook;
 let auth={principalRef:'a'.repeat(64),resourceRef:'b'.repeat(64),projectRef:'c'.repeat(64),permissionRef:'d'.repeat(64),enabled:true,expiresAt:601000};
 const storage={transaction(fn){const p=queue.then(async()=>{db.exec('BEGIN');let open=true;try{const value=await fn({get:async k=>{const r=db.prepare('SELECT v FROM records WHERE k=?').get(k);return r?JSON.parse(r.v):undefined;},put:async(k,v)=>db.prepare('INSERT INTO records VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k,JSON.stringify(v))});db.exec('COMMIT');open=false;if(lost){lost=false;throw Error('lost ack');}return value;}catch(e){if(open)db.exec('ROLLBACK');throw e;}});queue=p.catch(()=>{});return p;}};
 const config={storage,custodyKey:Buffer.alloc(32,4),readAuthorization:async()=>structuredClone(auth),now:()=>time,send:async(url,envelope)=>{sends++;if(hook)await hook();if(mode==='throw')throw Error('private details');const body=JSON.parse(envelope.body);return {status:200,body:JSON.stringify({challenge:body.challenge})};}};
 const rows=()=>db.prepare('SELECT k,v FROM records').all().map(r=>({key:r.k,value:JSON.parse(r.v)}));
 return {config,rows,setAuth(v){auth={...auth,...v};},setTime(v){time=v;},setMode(v){mode=v;},setHook(v){hook=v;},loseAck(){lost=true;},tamper(){const row=db.prepare('SELECT k,v FROM records LIMIT 1').get();const v=JSON.parse(row.v);v.state='active';v.expiresAt++;db.prepare('UPDATE records SET v=? WHERE k=?').run(JSON.stringify(v),row.k);},sends:()=>sends,dump:()=>db.prepare('SELECT v FROM records').all().map(r=>r.v).join('\n'),close:()=>db.close()};
}
test('subscription native SQLite stores encrypted custody and duplicate/restart never reverify',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());assert.match(r.id,/^sub_[0-9a-f]{64}$/);assert.equal(r.refreshBefore,new Date(601000).toISOString());assert.equal(f.sends(),1);const b=createMcpSubscriptionController(f.config);assert.deepEqual(await b.subscribe(params()),r);assert.equal(f.sends(),1);assert.ok(!f.dump().includes(secret));assert.ok(!f.dump().includes('callback.agentfriendlyweb.dev'));}finally{f.close();}
});
test('concurrent creation and lost transaction ACK cannot reconstruct verification permit',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),b=createMcpSubscriptionController(f.config);const r=await Promise.allSettled([a.subscribe(params()),b.subscribe(params())]);assert.equal(f.sends(),1);assert.ok(r.some(v=>v.status==='fulfilled'));}finally{f.close();}
 const g=fixture();try{const a=createMcpSubscriptionController(g.config);g.loseAck();await assert.rejects(a.subscribe(params()),/MCP subscription unavailable/);await assert.rejects(createMcpSubscriptionController(g.config).subscribe(params()),/MCP subscription unavailable/);assert.equal(g.sends(),0);}finally{g.close();}
});
test('late verification cannot activate after cross-instance unsubscribe; tombstone stays terminal',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),b=createMcpSubscriptionController(f.config);f.setHook(async()=>{await b.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});});await assert.rejects(a.subscribe(params()),/MCP subscription unavailable/);f.setHook(null);await assert.rejects(a.subscribe(params()),/MCP subscription unavailable/);assert.equal(f.sends(),1);}finally{f.close();}
});
test('finite TTL, foreign project, revoked consent, secret replacement and expiry fail closed',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config);const p=params();p.arguments.projectRef='e'.repeat(64);await assert.rejects(a.subscribe(p));assert.equal(f.sends(),0);const r=await a.subscribe({...params(),ttlMs:200});assert.equal(r.refreshBefore,new Date(1200).toISOString());const other=params();other.delivery.secret='whsec_'+Buffer.alloc(32,9).toString('base64');await assert.rejects(a.subscribe(other));f.setTime(1200);await assert.rejects(a.subscribe(params()));f.setAuth({enabled:false});await assert.rejects(a.subscribe(params()));await a.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});}finally{f.close();}
});
test('permission withdrawal while callback waits prevents activation and exposes only a static error',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config);f.setHook(async()=>f.setAuth({enabled:false}));await assert.rejects(a.subscribe(params()),/^Error: MCP subscription unavailable$/);}finally{f.close();}
});
test('custody wrong key, changed ciphertext and accessors never disclose or deliver',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config);await a.subscribe(params());const b=createMcpSubscriptionController({...f.config,custodyKey:Buffer.alloc(32,8)});await assert.rejects(b.subscribe(params()),/MCP subscription unavailable/);assert.equal(f.sends(),1);let got=0;const p=params();Object.defineProperty(p,'ttlMs',{get(){got++;throw Error('sensitive');},enumerable:true});await assert.rejects(a.subscribe(p));assert.equal(got,0);}finally{f.close();}
});

const signal=()=>({version:'afw-dossier-event-v1',eventId:'e'.repeat(64),projectRef:'c'.repeat(64),revision:1,kind:'project_updated',observedAt:'1970-01-01T00:00:01.000Z'});
test('private observation distinguishes expiry from actual unsubscribe without sending or changing history',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe({...params(),ttlMs:200});f.setTime(1200);const before=f.dump(),observed=await a.observe(r.id);assert.deepEqual(observed,{purpose:'afw.mcp-subscription-observation.v1',state:'active',expired:true,verifiedAt:1000,expiresAt:1200,observedAt:1200,callbackHostname:'callback.agentfriendlyweb.dev',httpReceipt:null,cloudReviewConfirmed:false});assert.equal(f.dump(),before);assert.equal(f.sends(),1);await a.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});const withdrawn=await createMcpSubscriptionController(f.config).observe(r.id);assert.equal(withdrawn.state,'withdrawn');assert.equal(withdrawn.expired,true);assert.doesNotMatch(JSON.stringify(withdrawn),/whsec_|\/hook|cipher|selectorRef|principalRef/);assert.equal(f.sends(),1);}finally{f.close();}
});
test('private observation fails closed for foreign authority, tampering, expiry and lost read ACK',async()=>{
 const {createMcpSubscriptionController}=await load();for(const fault of ['foreign','permission','expired','tamper','ack']){const f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());if(fault==='foreign')f.setAuth({principalRef:'f'.repeat(64)});if(fault==='permission')f.setAuth({permissionRef:'f'.repeat(64)});if(fault==='expired')f.setTime(601000);if(fault==='tamper')f.tamper();if(fault==='ack')f.loseAck();await assert.rejects(a.observe(r.id),/^Error: MCP subscription unavailable$/);assert.equal(f.sends(),1);}finally{f.close();}}
});
test('private observation rejects authority drift during read and cannot return an absent record as withdrawal',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());assert.equal(await a.observe('sub_'+'e'.repeat(64)),null);const original=f.config.readAuthorization;let calls=0;const b=createMcpSubscriptionController({...f.config,readAuthorization:async()=>{calls++;if(calls===2)f.setAuth({resourceRef:'f'.repeat(64)});return original();}});await assert.rejects(b.observe(r.id));assert.equal(f.sends(),1);}finally{f.close();}
});
test('private observation cannot disclose a result after authority changes during durable read acknowledgment',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());const transaction=f.config.storage.transaction.bind(f.config.storage);f.config.storage.transaction=async fn=>{const value=await transaction(fn);f.setAuth({resourceRef:'f'.repeat(64)});return value;};await assert.rejects(a.observe(r.id),/^Error: MCP subscription unavailable$/);assert.equal(f.sends(),1);}finally{f.close();}
});
test('one durable delivery records HTTP receipt separately from cloud review and never repeats',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());const receipt=await a.deliver(r.id,signal());assert.equal(receipt.cloudReviewConfirmed,false);assert.equal(receipt.status,200);assert.equal(f.sends(),2);await assert.rejects(createMcpSubscriptionController(f.config).deliver(r.id,signal()));assert.equal(f.sends(),2);}finally{f.close();}
});
test('lost delivery reservation ACK and lost network response spend the durable budget',async()=>{
 const {createMcpSubscriptionController}=await load();for(const mode of ['commit','network']){const f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());if(mode==='commit')f.loseAck();else f.setMode('throw');await assert.rejects(a.deliver(r.id,signal()),/^Error: MCP subscription unavailable$/);const before=f.sends();await assert.rejects(createMcpSubscriptionController(f.config).deliver(r.id,signal()));assert.equal(f.sends(),before);}finally{f.close();}}
});
test('event metadata is snapshotted before authorization awaits and signed bytes keep the claimed identity',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params()),s=signal();const original=f.config.readAuthorization;let sent;const b=createMcpSubscriptionController({...f.config,readAuthorization:async()=>{s.eventId='f'.repeat(64);return original();},send:async(_,message)=>{sent=JSON.parse(message.body);return {status:200,body:''};}});const receipt=await b.deliver(r.id,s);assert.equal(receipt.eventId,'e'.repeat(64));assert.equal(sent.eventId,'e'.repeat(64));}finally{f.close();}
});
test('storage tampering and foreign owner cannot activate or deliver a subscription',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());f.setAuth({principalRef:'f'.repeat(64)});await assert.rejects(a.deliver(r.id,signal()));assert.equal(f.sends(),1);f.setAuth({principalRef:'a'.repeat(64)});f.tamper();await assert.rejects(a.deliver(r.id,signal()));assert.equal(f.sends(),1);}finally{f.close();}
});

test('withdrawal during post-refresh authorization is observed before returning an active receipt',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const b=createMcpSubscriptionController(f.config);await b.subscribe(params());let calls=0;const original=f.config.readAuthorization;const a=createMcpSubscriptionController({...f.config,readAuthorization:async()=>{if(++calls===7)await b.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});return original();}});await assert.rejects(a.subscribe(params()),/^Error: MCP subscription unavailable$/);assert.equal(f.sends(),1);}finally{f.close();}
});

test('cross-instance withdrawal completed during post-claim authorization prevents network delivery',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const b=createMcpSubscriptionController(f.config),r=await b.subscribe(params());let calls=0;const original=f.config.readAuthorization;const a=createMcpSubscriptionController({...f.config,readAuthorization:async()=>{if(++calls===4){await b.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});assert.equal(f.sends(),1);}return original();}});await assert.rejects(a.deliver(r.id,signal()));assert.equal(f.sends(),1);await assert.rejects(b.deliver(r.id,signal()));assert.equal(f.sends(),1);}finally{f.close();}
});

const otherDestination=()=>{const p=params();p.delivery.url='https://callback.agentfriendlyweb.dev/another-hook';return p;};
test('own QA namespace permits one global subscription even with another destination or principal',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());await assert.rejects(createMcpSubscriptionController(f.config).subscribe(otherDestination()));f.setAuth({principalRef:'f'.repeat(64)});await assert.rejects(createMcpSubscriptionController(f.config).subscribe(params()));f.setAuth({principalRef:'a'.repeat(64)});await a.deliver(r.id,signal());assert.equal(f.sends(),2);}finally{f.close();}
});
test('global attempt cannot be replaced after withdrawal, expiry or lost creation ACK',async()=>{
 const {createMcpSubscriptionController}=await load();for(const state of ['withdrawn','expired','lost']){const f=fixture();try{const a=createMcpSubscriptionController(f.config);if(state==='lost'){f.loseAck();await assert.rejects(a.subscribe(params()));}else{await a.subscribe(params());if(state==='withdrawn')await a.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});else{f.setTime(601000);f.setAuth({expiresAt:1201000});}}const before=f.sends();await assert.rejects(createMcpSubscriptionController(f.config).subscribe(otherDestination()));assert.equal(f.sends(),before);}finally{f.close();}}
});
test('concurrent different callbacks share one global challenge and one delivery',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{const a=createMcpSubscriptionController(f.config),b=createMcpSubscriptionController(f.config);const results=await Promise.allSettled([a.subscribe(params()),b.subscribe(otherDestination())]);assert.equal(results.filter(x=>x.status==='fulfilled').length,1);assert.equal(f.sends(),1);const r=results.find(x=>x.status==='fulfilled').value;await a.deliver(r.id,signal());await assert.rejects(b.deliver(r.id,signal()));assert.equal(f.sends(),2);}finally{f.close();}
});

test('transport encrypts exact signed bytes and consumes phase admission before calling sender',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{
 const original=f.config.send;let phases=0;
 f.config.send=async(url,envelope,signal)=>{
  const phase=envelope.headers['webhook-id'].startsWith('verify_')?'verification':'delivery';
  const rows=f.rows().filter(r=>r.value.phase===phase);assert.equal(rows.length,1);
  const r=rows[0].value;assert.equal(r.version,1);assert.equal(r.consumedAt,1000);assert.equal(r.preparedAt,1000);assert.equal(r.expiresAt,6000);
  const key=Buffer.from(hkdfSync('sha256',Buffer.alloc(32,4),'afw-mcp-subscription/v1:','transport-encryption',32));
  const decipher=createDecipheriv('aes-256-gcm',key,Buffer.from(r.cipher.iv,'base64'));decipher.setAAD(Buffer.from('afw-mcp-subscription/v1:transport:'+r.id+':'+r.generation+':'+phase));decipher.setAuthTag(Buffer.from(r.cipher.tag,'base64'));
  const stored=Buffer.concat([decipher.update(Buffer.from(r.cipher.data,'base64')),decipher.final()]).toString('utf8');
  assert.deepEqual(JSON.parse(stored),{url,envelope});assert.equal(r.digest,createHash('sha256').update(stored).digest('hex'));assert.ok(!f.dump().includes(envelope.headers['webhook-signature']));phases++;
  return original(url,envelope,signal);
 };
 const a=createMcpSubscriptionController(f.config),r=await a.subscribe(params());await a.deliver(r.id,signal());assert.equal(phases,2);
 }finally{f.close();}
});

test('lost prepared or consumed transport ACK stops challenge and delivery permanently across restart',async()=>{
 const {createMcpSubscriptionController}=await load();
 for(const phase of ['verification','delivery'])for(const checkpoint of ['prepared','consumed']){
  const f=fixture();try{
   const a=createMcpSubscriptionController(f.config);let receipt;if(phase==='delivery')receipt=await a.subscribe(params());
   const original=f.config.storage.transaction;let hit=false;
   f.config.storage.transaction=fn=>original(async tx=>fn({...tx,put:async(k,v)=>{await tx.put(k,v);if(v.phase===phase&&(checkpoint==='prepared'?v.consumedAt===null:v.consumedAt!==null)){hit=true;f.loseAck();}}}));
   const before=f.sends();await assert.rejects(phase==='verification'?a.subscribe(params()):a.deliver(receipt.id,signal()));assert.equal(hit,true);assert.equal(f.sends(),before);
   const restarted=createMcpSubscriptionController(f.config);await assert.rejects(phase==='verification'?restarted.subscribe(params()):restarted.deliver(receipt.id,signal()));assert.equal(f.sends(),before);
  }finally{f.close();}
 }
});
test('withdrawal or fixed transport deadline crossing during durable preparation prevents sender invocation',async()=>{
 const {createMcpSubscriptionController}=await load();for(const change of ['withdraw','deadline']){
  const f=fixture();try{
   const original=f.config.storage.transaction;let changed=false;
   f.config.storage.transaction=fn=>original(async tx=>fn({...tx,put:async(k,v)=>{await tx.put(k,v);if(v.phase==='verification'&&v.consumedAt===null&&!changed){changed=true;if(change==='withdraw')f.setAuth({enabled:false});else f.setTime(6001);}}}));
   const a=createMcpSubscriptionController(f.config);await assert.rejects(a.subscribe(params()));assert.equal(changed,true);assert.equal(f.sends(),0);await assert.rejects(createMcpSubscriptionController(f.config).subscribe(params()));assert.equal(f.sends(),0);
  }finally{f.close();}
 }
});
test('withdrawal during the final transport read ACK blocks both sender phases',async()=>{
 const {createMcpSubscriptionController}=await load();for(const phase of ['verification','delivery'])for(const withdrawal of ['permission','subscription']){
  const f=fixture();try{
   const a=createMcpSubscriptionController(f.config);let r;if(phase==='delivery')r=await a.subscribe(params());const before=f.sends(),other=createMcpSubscriptionController(f.config);
   const original=f.config.storage.transaction;let changed=false;
   f.config.storage.transaction=fn=>original(fn).then(async value=>{if(value?.payload?.envelope&&!changed){changed=true;if(withdrawal==='permission')f.setAuth({enabled:false});else await other.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});}return value;});
   await assert.rejects(phase==='verification'?a.subscribe(params()):a.deliver(r.id,signal()));assert.equal(changed,true);assert.equal(f.sends(),before);
  }finally{f.close();}
 }
});
function nodeFixture(){
 const f=fixture();let ready=true,verified=true,calls=0,controller;
 const nodeHost={processGeneration:'f'.repeat(64),readReadiness:async()=>({purpose:'afw.mcp-node-readiness.v1',processGeneration:'f'.repeat(64),ready,expiresAt:601000}),readIdentity:async()=>({purpose:'afw.mcp-native-dispatch.v1',processGeneration:'f'.repeat(64),verified,expiresAt:601000}),send:async reference=>{
  const handoff=await controller.consumeNodeDispatch(reference);assert.deepEqual(handoff.reference,reference);assert.ok(handoff.dispatchExpiresAt<=reference.expiresAt);assert.equal(f.rows().find(r=>r.value.phase===reference.phase).value.nodeStartedAt,1000);
  calls++;return {status:200,body:JSON.stringify({challenge:JSON.parse(handoff.envelope.body).challenge})};
 }};
 return {...f,nodeHost,setController:c=>{controller=c;},setReady:v=>{ready=v;},setVerified:v=>{verified=v;},nativeCalls:()=>calls};
}
test('Node readiness is required before any durable challenge is spent',async()=>{
 const {createMcpSubscriptionController}=await load(),f=nodeFixture();try{
 f.setReady(false);const a=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(a);await assert.rejects(a.subscribe(params()));assert.equal(f.rows().length,0);assert.equal(f.sends(),0);assert.equal(f.nativeCalls(),0);
 }finally{f.close();}
});
test('same phase journal consumes Node dispatch once for the fixed process; no downgrade or process replacement',async()=>{
 const {createMcpSubscriptionController}=await load(),f=nodeFixture();try{
 const a=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(a);const r=await a.subscribe(params());await a.deliver(r.id,signal());assert.equal(f.nativeCalls(),2);assert.equal(f.sends(),0);
 const entries=f.rows().filter(r=>r.value.phase);assert.equal(entries.length,2);assert.ok(entries.every(r=>r.value.version===2&&r.value.nodeProcessGeneration==='f'.repeat(64)&&r.value.nodeStartedAt===1000&&r.value.nodeDeadline===6000));
 for(const row of entries){const t=row.value,ref={id:t.id,generation:t.generation,phase:t.phase,digest:t.digest,processGeneration:t.nodeProcessGeneration,expiresAt:t.expiresAt};await assert.rejects(createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost}).consumeNodeDispatch(ref));}
 await assert.rejects(createMcpSubscriptionController(f.config).subscribe(params()));await assert.rejects(createMcpSubscriptionController({...f.config,nodeHost:{...f.nodeHost,processGeneration:'e'.repeat(64)}}).subscribe(params()));assert.equal(f.nativeCalls(),2);
 }finally{f.close();}
});
test('unverified Node and unknown first consume ACK cannot obtain or reconstruct the envelope',async()=>{
 const {createMcpSubscriptionController}=await load();for(const mode of ['identity','ack']){
  const f=nodeFixture();try{
   const a=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(a);let ref;
   f.nodeHost.send=async r=>{ref=r;if(mode==='identity')f.setVerified(false);else f.loseAck();return a.consumeNodeDispatch(r);};
   // Host callbacks are snapshotted: construct after installing the test sender.
   const b=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(b);await assert.rejects(b.subscribe(params()));assert.ok(ref);assert.equal(f.nativeCalls(),0);assert.equal(f.sends(),0);
   f.setVerified(true);const restarted=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});
   if(mode==='ack')await assert.rejects(restarted.consumeNodeDispatch(ref));
   else await assert.rejects(restarted.consumeNodeDispatch({...ref,processGeneration:'e'.repeat(64)}));
  }finally{f.close();}
 }
});
test('a Node sender receipt without consuming the original native stage cannot confirm delivery',async()=>{
 const {createMcpSubscriptionController}=await load(),f=nodeFixture();try{
 const a=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(a);const r=await a.subscribe(params());
 const fake=createMcpSubscriptionController({...f.config,nodeHost:{...f.nodeHost,send:async()=>({status:200,body:''})}});
 await assert.rejects(fake.deliver(r.id,signal()));assert.equal(f.nativeCalls(),1);assert.equal(f.rows().find(r=>r.value.phase==='delivery').value.nodeStartedAt,null);
 }finally{f.close();}
});
test('withdrawal, Node identity retirement and original expiry during native consume ACK disclose no envelope',async()=>{
 const {createMcpSubscriptionController}=await load();for(const phase of ['verification','delivery'])for(const event of ['permission','identity','expiry']){
  const f=nodeFixture();try{
   const a=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(a);let r;if(phase==='delivery')r=await a.subscribe(params());const before=f.nativeCalls();
   const original=f.config.storage.transaction;let changed=false;
   f.config.storage.transaction=fn=>original(fn).then(value=>{if(value?.phase===phase&&value.nodeStartedAt!==null&&!changed){changed=true;if(event==='permission')f.setAuth({enabled:false});else if(event==='identity')f.setVerified(false);else f.setTime(6001);}return value;});
   await assert.rejects(phase==='verification'?a.subscribe(params()):a.deliver(r.id,signal()));assert.equal(changed,true);assert.equal(f.nativeCalls(),before);
  }finally{f.close();}
 }
});
test('initial Node process and identity leases never extend when later observations report more time',async()=>{
 const {createMcpSubscriptionController}=await load();for(const lease of ['process','identity']){
  const f=nodeFixture();try{
   let calls=0;const field=lease==='process'?'readReadiness':'readIdentity';const original=f.nodeHost[field];f.nodeHost[field]=async(...args)=>({...await original(...args),expiresAt:++calls===1?1002:601000});
   const a=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(a);const r=await a.subscribe(params());
   if(lease==='process')assert.equal(r.refreshBefore,new Date(1002).toISOString());
   assert.equal(f.rows().find(r=>r.value.phase==='verification').value.nodeDeadline,1002);
  }finally{f.close();}
 }
});
test('Node stage is closed without a host and refuses caller destinations or accessor configuration',async()=>{
 const {createMcpSubscriptionController}=await load(),f=fixture();try{
 let calls=0;const original=f.config.storage.transaction;f.config.storage.transaction=fn=>{calls++;return original(fn);};
 await assert.rejects(createMcpSubscriptionController(f.config).consumeNodeDispatch({}));assert.equal(calls,0);
 const host={processGeneration:'f'.repeat(64),readReadiness:async()=>{},send:async()=>{}};Object.defineProperty(host,'readIdentity',{get(){calls++;throw Error('getter');},enumerable:true});assert.throws(()=>createMcpSubscriptionController({...f.config,nodeHost:host}));assert.equal(calls,0);
 }finally{f.close();}
 const n=nodeFixture();try{const a=createMcpSubscriptionController({...n.config,nodeHost:n.nodeHost});await assert.rejects(a.consumeNodeDispatch({id:'sub_'+'a'.repeat(64),generation:'b'.repeat(64),phase:'verification',digest:'c'.repeat(64),processGeneration:'f'.repeat(64),expiresAt:6000,url:'https://foreign.example'}));assert.equal(n.rows().length,0);}finally{n.close();}
});
test('cross-instance unsubscribe during final Node read ACK never discloses a handoff',async()=>{
 const {createMcpSubscriptionController}=await load();for(const phase of ['verification','delivery']){
  const f=nodeFixture();try{
   const a=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});f.setController(a);let r;if(phase==='delivery')r=await a.subscribe(params());const before=f.nativeCalls(),other=createMcpSubscriptionController({...f.config,nodeHost:f.nodeHost});
   const original=f.config.storage.transaction;let changed=false;
   f.config.storage.transaction=fn=>original(fn).then(async value=>{if(value?.s&&value?.t&&!changed){changed=true;await other.unsubscribe({name:params().name,arguments:params().arguments,delivery:{mode:'webhook',url:params().delivery.url}});}return value;});
   await assert.rejects(phase==='verification'?a.subscribe(params()):a.deliver(r.id,signal()));assert.equal(changed,true);assert.equal(f.nativeCalls(),before);assert.equal(f.rows().find(r=>r.value.state).value.state,'withdrawn');
  }finally{f.close();}
 }
});
