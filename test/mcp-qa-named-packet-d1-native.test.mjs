import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const api=await import('../lib/mcp-qa-named-packet-reader.mjs').catch(()=>({}));
test('native isolated packet metadata is create-once including REPLACE and bounded primary reads',async t=>{
 assert.equal(typeof api.createPrivateQaNamedPacketReader,'function','private exact primary reader required before native qualification');
 const schema=await readFile(new URL('../worker/independent-closure/qa-named-packets.sql',import.meta.url),'utf8');
 const entry=`import {createPrivateQaNamedPacketReader} from './lib/mcp-qa-named-packet-reader.mjs';
export default{async fetch(request,env){const input=await request.json();const raw=await createPrivateQaNamedPacketReader({db:env.QA_DB,now:Date.now,timeoutMs:5000}).read(input.generationPlanHash,new AbortController().signal);return Response.json(raw===null?null:{raw});}};`;
 const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-packet-primary-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{QA_DB:'afw-private-packet-isolated-native'},outboundService:()=>{outbound++;throw Error('outbound forbidden');}}));
 try{
 const db=await mf.getD1Database('QA_DB'),parts=schema.split('\n-- afw-statement --\n');assert.equal(parts.length,4);for(let i=0;i<parts.length;i++){try{await db.prepare(parts[i]).run();}catch{throw Error('Native packet schema statement '+i+' was not accepted');}}
 await db.prepare('CREATE TABLE unrelated_history (id TEXT PRIMARY KEY,value TEXT)').run();await db.prepare('INSERT INTO unrelated_history VALUES(?,?)').bind('preserve','history').run();
 const key='a'.repeat(64),raw='{"purpose":"afw.qa-named-data-packet.v1","generationCapsule":"fixture","namedPolicy":"fixture","closurePolicy":"fixture","cancellationHistory":"fixture"}';
 const insert=(k,v)=>db.prepare('INSERT INTO afw_qa_named_packets_v1(generation_plan_hash,packet_json) VALUES(?,?)').bind(k,v).run();
 await insert(key,raw);const before=(await db.prepare('SELECT * FROM afw_qa_named_packets_v1').all()).results;
 await t.test('duplicate identical and divergent INSERT preserve the first row',async()=>{await assert.rejects(insert(key,raw));await assert.rejects(insert(key,'{"changed":true}'));});
 await t.test('REPLACE and UPSERT cannot silently refund the primary key',async()=>{await assert.rejects(db.prepare('INSERT OR REPLACE INTO afw_qa_named_packets_v1 VALUES(?,?)').bind(key,'{"changed":true}').run());await assert.rejects(db.prepare('INSERT INTO afw_qa_named_packets_v1 VALUES(?,?) ON CONFLICT(generation_plan_hash) DO UPDATE SET packet_json=excluded.packet_json').bind(key,'{"changed":true}').run());});
 await t.test('UPDATE and DELETE are blocked even for unchanged content',async()=>{await assert.rejects(db.prepare('UPDATE afw_qa_named_packets_v1 SET packet_json=packet_json WHERE generation_plan_hash=?').bind(key).run());await assert.rejects(db.prepare('DELETE FROM afw_qa_named_packets_v1 WHERE generation_plan_hash=?').bind(key).run());});
 await t.test('SQL rejects malformed hash, non-object JSON and UTF8 oversize',async()=>{await assert.rejects(insert('A'.repeat(64),'{}'));await assert.rejects(insert('b'.repeat(64),'[]'));await assert.rejects(insert('c'.repeat(64),'{'));await assert.rejects(insert('d'.repeat(64),JSON.stringify({value:'é'.repeat(33000)})));});
 await t.test('exact primary read returns only its row and unknown keys are absent',async()=>{const call=async generationPlanHash=>(await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({generationPlanHash})})).json();assert.deepEqual(await call(key),{raw});assert.equal(await call('f'.repeat(64)),null);});
 await t.test('unknown write ACK is reconciled by read without another INSERT',async()=>{const k='e'.repeat(64);let writes=0;try{writes++;await insert(k,raw);throw Error('synthetic lost ACK');}catch{/* Do not retry. */}assert.equal((await db.prepare('SELECT packet_json FROM afw_qa_named_packets_v1 WHERE generation_plan_hash=?').bind(k).first()).packet_json,raw);assert.equal(writes,1);});
 assert.deepEqual((await db.prepare('SELECT * FROM afw_qa_named_packets_v1 WHERE generation_plan_hash=?').bind(key).all()).results,before);assert.deepEqual((await db.prepare('SELECT * FROM unrelated_history').all()).results,[{id:'preserve',value:'history'}]);assert.equal(outbound,0);
 }finally{await mf.dispose();}
});
