import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { operationsDb } from './fixtures/operations-db.mjs';
import { storeMailContent } from '../lib/mail-custody.mjs';
import { purgeFinalizedMailContent } from '../lib/mail-retention.mjs';
test('retention purges only old finalized content and preserves audit hashes and uncertain attempts',async()=>{
  const {db,sqlite}=operationsDb(); sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql',import.meta.url),'utf8'));
  const now=4000000000,old=now-31*86400000;
  for(const [key,state,time] of [['old','accepted',old],['cancelled','cancelled',old],['uncertain','uncertain',old],['sending','sending',old],['recent','accepted',now]]) {
    const hash=await storeMailContent(db,key,{to:'owner@example.com',subject:'Synthetic',text:'Private synthetic'});
    await db.prepare('INSERT INTO mail_outbox(reply_key,source_ref,content_hash,state,created_at,updated_at) VALUES(?,?,?,?,?,?)').bind(key,'source',hash,state,time,time).run();
  }
  assert.equal(await purgeFinalizedMailContent(db,now),2);
  const oldRow=await db.prepare("SELECT * FROM mail_content WHERE reply_key='old'").first();
  assert.equal(oldRow.content_json,''); assert.match(oldRow.content_hash,/^[a-f0-9]{64}$/);
  assert.notEqual((await db.prepare("SELECT content_json FROM mail_content WHERE reply_key='uncertain'").first()).content_json,'');
  assert.notEqual((await db.prepare("SELECT content_json FROM mail_content WHERE reply_key='sending'").first()).content_json,'');
  assert.notEqual((await db.prepare("SELECT content_json FROM mail_content WHERE reply_key='recent'").first()).content_json,'');
  assert.equal(await purgeFinalizedMailContent(db,now),0);
});
