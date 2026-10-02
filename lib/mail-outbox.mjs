/** Storage only: callers must authenticate and authorize approval on the server.
 * No HTTP endpoint, provider invocation, message content or automatic retry here.
 */
const reference = /^[A-Za-z0-9_-]{1,128}$/;
const digest = /^[a-f0-9]{64}$/;
function checkClock(now) {
  if (!Number.isSafeInteger(now) || now < 0) throw new Error('invalid clock');
}
function checkRef(value) {
  if (typeof value !== 'string' || !reference.test(value)) throw new Error('invalid reference');
}
function checkHash(value) {
  if (typeof value !== 'string' || !digest.test(value)) throw new Error('invalid content hash');
}

export async function prepareMail(db, input, now = Date.now()) {
  checkClock(now);
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length !== 3 || Object.keys(input).some(key => !['key', 'sourceRef', 'contentHash'].includes(key))) throw new Error('invalid mail metadata');
  checkRef(input.key); checkRef(input.sourceRef); checkHash(input.contentHash);
  await db.prepare(`INSERT INTO mail_outbox(reply_key,source_ref,content_hash,state,created_at,updated_at)
    VALUES(?,?,?,'draft',?,?) ON CONFLICT(reply_key) DO NOTHING`)
    .bind(input.key, input.sourceRef, input.contentHash, now, now).run();
  const row = await db.prepare('SELECT * FROM mail_outbox WHERE reply_key=?').bind(input.key).first();
  if (!row || row.source_ref !== input.sourceRef || row.content_hash !== input.contentHash) throw new Error('mail key collision');
  return row;
}

export async function approveMail(db, key, hash, decisionRef, now = Date.now()) {
  checkClock(now); checkRef(key); checkHash(hash); checkRef(decisionRef);
  const row = await db.prepare(`UPDATE mail_outbox SET state='approved',decision_ref=?,updated_at=?
    WHERE reply_key=? AND content_hash=? AND state='draft' AND updated_at<=? RETURNING reply_key`)
    .bind(decisionRef, now, key, hash, now).first();
  return Boolean(row);
}

/** No lease expiry: a crashed sender must be reconciled, never claimed again. */
export async function claimMail(db, key, now = Date.now()) {
  checkClock(now); checkRef(key);
  return db.prepare(`UPDATE mail_outbox SET state='sending',attempt_id=?,updated_at=?
    WHERE reply_key=? AND state='approved' AND decision_ref IS NOT NULL AND updated_at<=?
    RETURNING reply_key,content_hash,decision_ref,attempt_id`)
    .bind(crypto.randomUUID(), now, key, now).first();
}

export async function finishMail(db, key, attempt, outcome, providerRef = null, now = Date.now()) {
  checkClock(now); checkRef(key); checkRef(attempt);
  if (!['accepted', 'uncertain'].includes(outcome) || (outcome === 'accepted' && providerRef === null)) throw new Error('invalid outcome');
  if (providerRef !== null) checkRef(providerRef);
  const row = await db.prepare(`UPDATE mail_outbox SET state=?,provider_ref=?,updated_at=?
    WHERE reply_key=? AND attempt_id=? AND state='sending' AND updated_at<=? RETURNING reply_key`)
    .bind(outcome, providerRef, now, key, attempt, now).first();
  return Boolean(row);
}

export async function cancelMail(db, key, now = Date.now()) {
  checkClock(now); checkRef(key);
  const row = await db.prepare(`UPDATE mail_outbox SET state='cancelled',updated_at=?
    WHERE reply_key=? AND state IN ('draft','approved') AND updated_at<=? RETURNING reply_key`)
    .bind(now, key, now).first();
  return Boolean(row);
}
