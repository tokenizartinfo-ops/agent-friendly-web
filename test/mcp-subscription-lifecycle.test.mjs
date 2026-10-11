import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
const load=()=>import('../lib/mcp-subscription-lifecycle.mjs');
const secret='whsec_'+Buffer.alloc(32,3).toString('base64');
const params=()=>({name:'afw.dossier.changed',arguments:{projectRef:'c'.repeat(64)},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret},ttlMs:600000,cursor:null});
function fixture(){
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT NOT NULL)');let queue=Promise.resolve(),time=1000,sends=0,lost=false,mode='echo',hook;
 let auth={principalRef:'a'.repeat(64),resourceRef:'b'.repeat(64),projectRef:'c'.repeat(64),permissionRef:'d'.repeat(64),enabled:true,expiresAt:601000};
 const storage={transaction(fn){const p=queue.then(async()=>{db.exec('BEGIN');let open=true;try{const value=await fn({get:async k=>{const r=db.prepare('SELECT v FROM records WHERE k=?').get(k);return r?JSON.parse(r.v):undefined;},put:async(k,v)=>db.prepare('INSERT INTO records VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k,JSON.stringify(v))});db.exec('COMMIT');open=false;if(lost){lost=false;throw Error('lost ack');}return value;}catch(e){if(open)db.exec('ROLLBACK');throw e;}});queue=p.catch(()=>{});return p;}};
 const config={storage,custodyKey:Buffer.alloc(32,4),readAuthorization:async()=>structuredClone(auth),now:()=>time,send:async(url,envelope)=>{sends++;if(hook)await hook();if(mode==='throw')throw Error('private details');const body=JSON.parse(envelope.body);return {status:200,body:JSON.stringify({challenge:body.challenge})};}};
 return {config,setAuth(v){auth={...auth,...v};},setTime(v){time=v;},setMode(v){mode=v;},setHook(v){hook=v;},loseAck(){lost=true;},tamper(){const row=db.prepare('SELECT k,v FROM records LIMIT 1').get();const v=JSON.parse(row.v);v.state='active';v.expiresAt++;db.prepare('UPDATE records SET v=? WHERE k=?').run(JSON.stringify(v),row.k);},sends:()=>sends,dump:()=>db.prepare('SELECT v FROM records').all().map(r=>r.v).join('\n'),close:()=>db.close()};
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
