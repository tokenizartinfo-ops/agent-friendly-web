import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
const load=()=>import('../lib/mcp-node-process-custody.mjs');
const ctx={grantId:'g',subject:'owner',clientId:'client',resource:'https://private.invalid/mcp',scopes:['afw:project:read']};
function withdrawOriginal(f){
 const t=f.config.now();
 f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date(t).toISOString(),'g');
 f.db.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").run('g','p','owner','client',ctx.resource,1,'revoke','afw.dossier-monitoring.v1','22222222-2222-4222-8222-222222222222',t,t);
}

test('retirement observation reads original closed custody after expiry without runtime calls or writes',async()=>{
 const m=await load(),f=fixture();try{
  f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config);await a.start();await a.close();withdrawOriginal(f);f.expire();
  const before=JSON.stringify(f.rows()),base=f.config.db;
  const reader=m.createNodeProcessCustody({...f.config,db:{prepare(sql){assert.match(sql,/^SELECT/);return base.prepare(sql);}},runtime:{launch:()=>assert.fail('launch'),observe:()=>assert.fail('probe'),close:()=>assert.fail('close')}});
  const result=await reader.observeRetired();
  assert.equal(result.purpose,'afw.node-retirement-observation.v1');assert.equal(result.physicalStopVerified,false);assert.equal(result.mayStartSuccessor,false);
  assert.equal(result.processGeneration,f.boot().processGeneration);assert.equal(result.observedAt,f.config.now());
  assert.equal(JSON.stringify(f.rows()),before);assert.equal(f.launches(),1);
  assert.equal(JSON.stringify(result).includes(f.boot().key.toString('base64')),false);
 }finally{f.close();}
});

test('retirement observation rejects live permissions, missing custody and foreign source',async()=>{
 const m=await load();for(const mode of ['ready','permissions','oauth-only','monitor-only','missing','source','key','window']){const f=fixture();try{
  f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config);await a.start();
  if(mode!=='ready')await a.close();
  if(!['permissions','oauth-only'].includes(mode))withdrawOriginal(f);
  if(mode==='oauth-only')f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date(f.config.now()).toISOString(),'g');
  if(mode==='monitor-only')f.db.prepare("UPDATE delegated_access_grants SET revoked_at='' WHERE id=?").run('g');
  if(mode==='missing')f.eraseDurable();f.expire();
  const reader=m.createNodeProcessCustody({...f.config,...(mode==='source'?{sourceRevision:'d'.repeat(40)}:{}),...(mode==='key'?{custodyKey:Buffer.alloc(32,8)}:{}),...(mode==='window'?{window:{...f.config.window,startAt:f.config.window.startAt+1}}:{})});
  await assert.rejects(reader.observeRetired());assert.equal(f.launches(),1);
 }finally{f.close();}}
});

test('retirement observation rejects grant resurrection between primary reads',async()=>{
 const m=await load(),f=fixture();try{
  f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config);await a.start();await a.close();withdrawOriginal(f);f.expire();
  const base=f.config.db;let changed=false;
  const reader=m.createNodeProcessCustody({...f.config,db:{prepare(sql){const p=base.prepare(sql);return{bind(...args){const q=p.bind(...args);return{async first(){const row=await q.first();if(!changed&&sql.includes('AS monitoring_revoked_at')){changed=true;f.db.prepare("UPDATE delegated_access_grants SET revoked_at='' WHERE id=?").run('g');}return row;},run:q.run};}};}}});
  await assert.rejects(reader.observeRetired());assert.equal(changed,true);assert.equal(f.launches(),1);
 }finally{f.close();}
});
function fixture(){
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
 db.exec(readFileSync('db/dossier-monitoring-consent.sql','utf8'));let now=Date.now()-1000,launches=0,running=false,observed,boot,lostPrimary=false,lostDurable=false;
 db.prepare('INSERT INTO site_projects VALUES(?,?,?)').run('p','owner',1);db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').run('g','owner','client','p',ctx.resource,JSON.stringify(ctx.scopes),new Date(now+600000).toISOString(),'');
 const primary={prepare(sql){return{bind(...args){return{async first(){return db.prepare(sql).get(...args)??null;},async run(){const result=db.prepare(sql).run(...args);if(lostPrimary&&sql.includes('INSERT INTO dossier_node_process_admissions')){lostPrimary=false;throw Error('lost primary ACK');}return{meta:{changes:Number(result.changes)}};}};}};}};
 const durable=new DatabaseSync(':memory:');durable.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT NOT NULL)');let queue=Promise.resolve();const storage={transaction(fn){const p=queue.then(async()=>{durable.exec('BEGIN');let open=true;try{const result=await fn({get:async k=>{const r=durable.prepare('SELECT v FROM records WHERE k=?').get(k);return r?JSON.parse(r.v):undefined;},put:async(k,v)=>durable.prepare('INSERT INTO records VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k,JSON.stringify(v))});durable.exec('COMMIT');open=false;if(lostDurable){lostDurable=false;throw Error('lost durable ACK');}return result;}catch(e){if(open)durable.exec('ROLLBACK');throw e;}});queue=p.catch(()=>{});return p;}};
 const runtime={async launch(value){launches++;boot={...value,key:Buffer.from(value.key)};running=true;},async observe(manifest){return {...manifest,running,...observed};},async close(){running=false;}};
 const config={enabled:true,db:primary,context:ctx,projectId:'p',projectionSecret:'z'.repeat(32),storage,custodyKey:Buffer.alloc(32,7),containerId:'a'.repeat(64),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),image:'cloudflare/debian-trixie',window:{startAt:now,expiresAt:now+60000},runtime,now:()=>now};
 return{db,config,grant(){db.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run('g','p','owner','client',ctx.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',now,now+60000);},launches:()=>launches,boot:()=>boot,expire(){now+=60000;},retire(){running=false;},drift(v){observed=v;},losePrimary(){lostPrimary=true;},loseDurable(){lostDurable=true;},eraseDurable(){durable.exec('DELETE FROM records');},rows:()=>durable.prepare('SELECT v FROM records').all().map(r=>JSON.parse(r.v)),close:()=>{durable.close();db.close();}};
}

test('closed Node custody and read-only grant cannot consume primary boot budget',async()=>{
 const m=await load(),f=fixture();try{assert.throws(()=>m.createNodeProcessCustody({...f.config,enabled:false}));f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));const a=m.createNodeProcessCustody(f.config);await assert.rejects(a.start());assert.equal(f.launches(),0);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_admissions').get().n,0);}finally{f.close();}
});

test('original Node custody launches once, stores encrypted capability and reuses only ready process',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config),first=await a.start();assert.equal(first.ready,true);assert.equal(f.launches(),1);const b=m.createNodeProcessCustody(f.config);assert.deepEqual(await b.start(),first);assert.equal(f.launches(),1);assert.ok(!JSON.stringify(f.rows()).includes(f.boot().key.toString('base64')));assert.equal((await a.createBridge()).verify instanceof Function,true);f.retire();await assert.rejects(b.start());assert.equal(f.launches(),1);}finally{f.close();}
});

test('custody reconstructs original signed readiness capability without exposing its key or launching again',async()=>{const m=await load(),{createNodeReadiness}=await import('../lib/mcp-node-readiness.mjs'),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();let probes=0,staleFactory;f.config.runtime.observe=async(manifest,_signal,makeProbe)=>{staleFactory=makeProbe;assert.equal(typeof makeProbe,'function');const probe=await makeProbe();assert.deepEqual(Object.keys(probe),['request','accept']);assert.equal(JSON.stringify(probe).includes(f.boot().key.toString('base64')),false);const server=createNodeReadiness({key:f.boot().key,manifest,now:f.config.now});probes++;return probe.accept(server.respond(probe.request));};const first=m.createNodeProcessCustody(f.config);assert.equal((await first.start()).ready,true);const rebuilt=m.createNodeProcessCustody(f.config);assert.equal((await rebuilt.readReadiness()).ready,true);assert.equal(f.launches(),1);assert.ok(probes>=3);await assert.rejects(staleFactory());}finally{f.close();}});



for(const store of ['primary','durable'])test(store+' lost first ACK never reconstructs original start',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();if(store==='primary')f.losePrimary();else f.loseDurable();await assert.rejects(m.createNodeProcessCustody(f.config).start());assert.equal(f.launches(),0);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_admissions').get().n,1);await assert.rejects(m.createNodeProcessCustody(f.config).start());assert.equal(f.launches(),0);}finally{f.close();}
});

test('missing original durable state cannot reset D1 start budget',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();await m.createNodeProcessCustody(f.config).start();f.eraseDurable();await assert.rejects(m.createNodeProcessCustody(f.config).start());assert.equal(f.launches(),1);}finally{f.close();}
});

test('source/program/platform/lease drift, expiry and terminal close never relaunch',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config);await a.start();for(const drift of [{programHash:'0'.repeat(64)},{processGeneration:'1'.repeat(64)},{expiresAt:f.config.window.expiresAt+1}]){f.drift(drift);await assert.rejects(a.readReadiness());await assert.rejects(a.createBridge());}f.drift({});await a.close();await assert.rejects(m.createNodeProcessCustody(f.config).start());assert.equal(f.launches(),1);}finally{f.close();}
 const g=fixture();try{g.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));g.grant();const a=m.createNodeProcessCustody(g.config);await a.start();g.expire();await assert.rejects(a.readReadiness());await assert.rejects(a.start());assert.equal(g.launches(),1);}finally{g.close();}
});

test('primary journal rejects UPDATE/DELETE and OAuth withdrawal closes capability recovery',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config);await a.start();assert.throws(()=>f.db.exec('UPDATE dossier_node_process_admissions SET expires_at=expires_at+1'));assert.throws(()=>f.db.exec('DELETE FROM dossier_node_process_admissions'));f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date().toISOString(),'g');await assert.rejects(a.createBridge());await assert.rejects(a.start());assert.equal(f.launches(),1);await a.close();}finally{f.close();}
});

test('process closure during starting ACK cannot launch while OAuth remains valid',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const closer=m.createNodeProcessCustody(f.config),base=f.config.storage;let once=false;
 const custody=m.createNodeProcessCustody({...f.config,storage:{transaction(fn){return base.transaction(fn).then(async value=>{if(!once&&f.rows().some(r=>r.state==='starting')){once=true;await closer.close();}return value;});}}});
 await assert.rejects(custody.start());assert.equal(f.launches(),0);
 }finally{f.close();}
});

test('stalled launch is bounded by original process lease and never grants readiness',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const source={...f.config,now:Date.now,window:{startAt:f.config.window.startAt,expiresAt:Date.now()+250},runtime:{...f.config.runtime,launch:()=>new Promise(()=>{})}};
 const result=await Promise.race([m.createNodeProcessCustody(source).start().then(()=>false,()=>true),new Promise(resolve=>setTimeout(()=>resolve(false),1200))]);assert.equal(result,true,'launch remained pending past original lease');assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_admissions').get().n,1);
 }finally{f.close();}
});

test('lost primary close ACK still stops the original runtime and never restores authority',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config);await a.start();const base=f.config.db,closer=m.createNodeProcessCustody({...f.config,db:{prepare(sql){const p=base.prepare(sql);return{bind(...args){const q=p.bind(...args);return{first:q.first,async run(){const v=await q.run();if(sql.includes('INSERT OR IGNORE INTO dossier_node_process_closures'))throw Error('lost close ACK');return v;}};}};}}});await assert.rejects(closer.close());assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);assert.equal(await f.config.runtime.observe(f.boot()).then(v=>v.running),false);await assert.rejects(a.createBridge());}finally{f.close();}
});

test('close before first admission creates a terminal primary fence and never allows start',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const a=m.createNodeProcessCustody(f.config);assert.equal((await a.close()).closed,true);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);await assert.rejects(a.start());assert.equal(f.launches(),0);assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_admissions').get().n,0);}finally{f.close();}
});

test('stalled closure persistence cannot prevent original runtime stop request',async()=>{
 const m=await load(),f=fixture();try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();await m.createNodeProcessCustody(f.config).start();const base=f.config.db;let stops=0;
 const a=m.createNodeProcessCustody({...f.config,db:{prepare(sql){if(sql.includes('INSERT OR IGNORE INTO dossier_node_process_closures'))return{bind(){return{run:()=>new Promise(()=>{})};}};return base.prepare(sql);}},runtime:{...f.config.runtime,async close(){stops++;await f.config.runtime.close();}}});
 const result=await Promise.race([a.close().then(()=>false,()=>true),new Promise(resolve=>setTimeout(()=>resolve(false),6500))]);assert.equal(result,true,'close persistence remained pending');assert.equal(stops,1);assert.equal((await f.config.runtime.observe(f.boot())).running,false);
 }finally{f.close();}
});

test('retired-only facade exposes no execution methods and preserves original records',async()=>{
 const {createRetiredCustodyReader}=await import('../lib/mcp-retired-custody-reader.mjs'),m=await load(),f=fixture();try{
 f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const active=m.createNodeProcessCustody(f.config);await active.start();await active.close();withdrawOriginal(f);f.expire();
 const {runtime,enabled,...options}=f.config;void runtime;void enabled;
 const before=JSON.stringify(f.rows()),reader=createRetiredCustodyReader(options);assert.deepEqual(Object.keys(reader),['observeRetired']);
 const result=await reader.observeRetired();assert.equal(result.processGeneration,f.boot().processGeneration);assert.equal(result.mayStartSuccessor,false);assert.equal(JSON.stringify(f.rows()),before);assert.equal(f.launches(),1);
 assert.throws(()=>createRetiredCustodyReader({...options,runtime:f.config.runtime}));
 }finally{f.close();}
});
