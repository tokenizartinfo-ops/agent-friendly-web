import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const api=await import('../lib/mcp-qa-generation-draft-reader.mjs').catch(()=>({}));
test('native isolated draft metadata is create-once including REPLACE and bounded primary reads',async t=>{
 assert.equal(typeof api.createPrivateQaGenerationDraftReader,'function','private exact primary reader required before native qualification');
 const schema=await readFile(new URL('../worker/independent-closure/qa-generation-drafts.sql',import.meta.url),'utf8');
 const entry=`import {createPrivateQaGenerationDraftReader} from './lib/mcp-qa-generation-draft-reader.mjs';
const worker={async fetch(request,env){const input=await request.json();const raw=await createPrivateQaGenerationDraftReader({db:env.QA_DB,now:Date.now,timeoutMs:5000}).read(input.namedBundleHash,new AbortController().signal);return Response.json(raw===null?null:{raw});}};export default worker;`;
 const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-draft-primary-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{QA_DB:'afw-private-draft-isolated-native'},outboundService:()=>{outbound++;throw Error('outbound forbidden');}}));
 try{
 const db=await mf.getD1Database('QA_DB'),parts=schema.split('\n-- afw-statement --\n');assert.equal(parts.length,4);assert.ok(parts.every(sql=>sql.trim().endsWith(';')),'Each fixed API section must end in SQL, not a trailing comment');await db.batch(parts.map(sql=>db.prepare(sql)));
 await db.prepare('CREATE TABLE unrelated_history (id TEXT PRIMARY KEY,value TEXT)').run();await db.prepare('INSERT INTO unrelated_history VALUES(?,?)').bind('preserve','history').run();
 const key='a'.repeat(64),raw=JSON.stringify({purpose:'afw.qa-generation-draft.v1',eventId:'b'.repeat(64),namedPolicy:'fixture',closurePolicy:'fixture',cancellationHistory:'fixture',historicalNamedPolicy:'fixture',historicalDispatchPolicy:'fixture'});
 const insert=(k,v)=>db.prepare('INSERT INTO afw_qa_generation_drafts_v1(named_bundle_hash,draft_json) VALUES(?,?)').bind(k,v).run();
 await insert(key,raw);const before=(await db.prepare('SELECT * FROM afw_qa_generation_drafts_v1').all()).results;
 await t.test('duplicate identical and divergent INSERT preserve the first row',async()=>{await assert.rejects(insert(key,raw));await assert.rejects(insert(key,'{"changed":true}'));});
 await t.test('REPLACE and UPSERT cannot silently refund the primary key',async()=>{await assert.rejects(db.prepare('INSERT OR REPLACE INTO afw_qa_generation_drafts_v1 VALUES(?,?)').bind(key,'{"changed":true}').run());await assert.rejects(db.prepare('INSERT INTO afw_qa_generation_drafts_v1 VALUES(?,?) ON CONFLICT(named_bundle_hash) DO UPDATE SET draft_json=excluded.draft_json').bind(key,'{"changed":true}').run());});
 await t.test('UPDATE and DELETE are blocked even for unchanged content',async()=>{await assert.rejects(db.prepare('UPDATE afw_qa_generation_drafts_v1 SET draft_json=draft_json WHERE named_bundle_hash=?').bind(key).run());await assert.rejects(db.prepare('DELETE FROM afw_qa_generation_drafts_v1 WHERE named_bundle_hash=?').bind(key).run());});
 await t.test('SQL rejects malformed hash, non-object JSON and UTF8 oversize',async()=>{await assert.rejects(insert('A'.repeat(64),'{}'));await assert.rejects(insert('b'.repeat(64),'[]'));await assert.rejects(insert('c'.repeat(64),'{'));await assert.rejects(insert('d'.repeat(64),JSON.stringify({value:'é'.repeat(33000)})));});
 await t.test('exact primary read returns only its row and unknown keys are absent',async()=>{const call=async namedBundleHash=>(await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({namedBundleHash})})).json();assert.deepEqual(await call(key),{raw});assert.equal(await call('f'.repeat(64)),null);});
 await t.test('unknown write ACK is reconciled by read without another INSERT',async()=>{const k='e'.repeat(64);let writes=0;try{writes++;await insert(k,raw);throw Error('synthetic lost ACK');}catch{/* Do not retry. */}assert.equal((await db.prepare('SELECT draft_json FROM afw_qa_generation_drafts_v1 WHERE named_bundle_hash=?').bind(k).first()).draft_json,raw);assert.equal(writes,1);});
 await t.test('old generation-keyed packet data is never a draft fallback',async()=>{await db.prepare('CREATE TABLE afw_qa_named_packets_v1(generation_plan_hash TEXT PRIMARY KEY,packet_json TEXT)').run();const k='4'.repeat(64);await db.prepare('INSERT INTO afw_qa_named_packets_v1 VALUES(?,?)').bind(k,'{"purpose":"afw.qa-named-data-packet.v1"}').run();const result=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({namedBundleHash:k})});assert.equal(await result.json(),null);});
 assert.deepEqual((await db.prepare('SELECT * FROM afw_qa_generation_drafts_v1 WHERE named_bundle_hash=?').bind(key).all()).results,before);assert.deepEqual((await db.prepare('SELECT * FROM unrelated_history').all()).results,[{id:'preserve',value:'history'}]);assert.equal(outbound,0);
 }finally{await mf.dispose();}
});
