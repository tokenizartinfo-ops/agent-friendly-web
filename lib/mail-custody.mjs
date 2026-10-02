import { mailContentHash } from './mail-consumer.mjs';

function ref(value) { if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new Error('invalid reference'); }
function clock(value) { if (!Number.isSafeInteger(value) || value < 0) throw new Error('invalid clock'); }

/** Private store only. Callers must authenticate actor and purpose before writing. */
export async function storeMailContent(db,key,message) {
  ref(key);
  const snapshot = { ...message };
  const hash = await mailContentHash(snapshot);
  const content = JSON.stringify({to:snapshot.to,subject:snapshot.subject,text:snapshot.text});
  await db.prepare('INSERT INTO mail_content(reply_key,content_hash,content_json) VALUES(?,?,?) ON CONFLICT(reply_key) DO NOTHING').bind(key,hash,content).run();
  const row = await db.prepare('SELECT * FROM mail_content WHERE reply_key=?').bind(key).first();
  if (!row || row.content_hash !== hash || row.content_json !== content) throw new Error('content collision');
  return hash;
}
export async function loadMailContent(db,key) {
  ref(key);
  const row = await db.prepare('SELECT * FROM mail_content WHERE reply_key=?').bind(key).first();
  if (!row) throw new Error('missing content');
  const message = JSON.parse(row.content_json);
  if (await mailContentHash(message) !== row.content_hash) throw new Error('content integrity failure');
  return message;
}
export async function storeMailDecision(db,input,now=Date.now()) {
  clock(now);
  if (!input || Object.keys(input).length !== 5 || Object.keys(input).some(k=>!['decisionRef','key','contentHash','actorRef','expiresAt'].includes(k))) throw new Error('invalid decision');
  const {decisionRef,key,contentHash,actorRef,expiresAt}=input;
  ref(decisionRef); ref(key); ref(actorRef); clock(expiresAt);
  if (expiresAt<=now || expiresAt>now+86400000 || !/^[a-f0-9]{64}$/.test(contentHash)) throw new Error('invalid decision');
  const content=await loadMailContent(db,key);
  if (await mailContentHash(content)!==contentHash) throw new Error('invalid decision hash');
  await db.prepare('INSERT INTO mail_decisions(decision_ref,reply_key,content_hash,actor_ref,created_at,expires_at) VALUES(?,?,?,?,?,?) ON CONFLICT(decision_ref) DO NOTHING').bind(decisionRef,key,contentHash,actorRef,now,expiresAt).run();
  const row=await db.prepare('SELECT * FROM mail_decisions WHERE decision_ref=?').bind(decisionRef).first();
  if (!row || row.reply_key!==key || row.content_hash!==contentHash || row.actor_ref!==actorRef || row.expires_at!==expiresAt || row.revoked_at!==null) throw new Error('decision collision');
}
export async function authorizeMailDecision(db,{key,decisionRef,contentHash,recipient},now=Date.now()) {
  clock(now); ref(key); ref(decisionRef);
  const row=await db.prepare('SELECT * FROM mail_decisions WHERE decision_ref=?').bind(decisionRef).first();
  if (!row || row.reply_key!==key || row.content_hash!==contentHash || row.revoked_at!==null || row.created_at>now || row.expires_at<=now) return false;
  const content=await loadMailContent(db,key);
  return content.to===recipient && await mailContentHash(content)===contentHash;
}
export async function revokeMailDecision(db,decisionRef,now=Date.now()) {
  ref(decisionRef); clock(now);
  return Boolean(await db.prepare('UPDATE mail_decisions SET revoked_at=? WHERE decision_ref=? AND revoked_at IS NULL AND created_at<=? RETURNING decision_ref').bind(now,decisionRef,now).first());
}
export async function storeMailReceipt(db,{key,attemptId,messageId}) {
  ref(key); ref(attemptId);
  if (typeof messageId!=='string' || !messageId || messageId.length>1024 || /[\r\n\u0000]/.test(messageId)) throw new Error('invalid receipt');
  await db.prepare('INSERT INTO mail_receipts(attempt_id,receipt_ref,reply_key,provider_message_id) VALUES(?,?,?,?) ON CONFLICT(attempt_id) DO NOTHING').bind(attemptId,crypto.randomUUID(),key,messageId).run();
  const row=await db.prepare('SELECT * FROM mail_receipts WHERE attempt_id=?').bind(attemptId).first();
  if (!row || row.reply_key!==key || row.provider_message_id!==messageId) throw new Error('receipt collision');
  return row.receipt_ref;
}
