import { claimMail, finishMail } from './mail-outbox.mjs';

const FROM = 'hello@agentfriendlyweb.dev';
function canonicalMessage(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length !== 3 || Object.keys(value).some(k => !['to', 'subject', 'text'].includes(k))) throw new Error('invalid message');
  const { to, subject, text } = value;
  if (typeof to !== 'string' || to.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) || typeof subject !== 'string' || !subject.trim() || subject.length > 200 || /[\r\n\u0000]/.test(subject) || typeof text !== 'string' || !text.trim() || text.length > 20000 || text.includes('\u0000')) throw new Error('invalid message');
  return { from: FROM, to, subject, text };
}
export async function mailContentHash(value) {
  const canonical = JSON.stringify(canonicalMessage(value));
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
}

/** Internal consumer. Authorization callback is trusted server code, never model input.
 * No HTTP surface, credential, retry, or claim of inbox delivery.
 */
export async function consumeApprovedMail({ db, key, loadMessage, authorize, email, saveReceipt, now = Date.now, timeoutMs = 15000 }) {
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 10 || timeoutMs > 30000) return { state: 'blocked' };
  if (typeof loadMessage !== 'function' || typeof authorize !== 'function' || typeof saveReceipt !== 'function' || typeof email?.send !== 'function') return { state: 'blocked' };
  const row = await db.prepare('SELECT * FROM mail_outbox WHERE reply_key=?').bind(key).first();
  if (!row || row.state !== 'approved') return { state: 'not_claimed' };
  let message;
  try {
    // Copy to prevent later mutation of an object returned by the content store.
    const loaded = await loadMessage(key);
    message = canonicalMessage(loaded);
    if (await mailContentHash({ to: message.to, subject: message.subject, text: message.text }) !== row.content_hash) return { state: 'blocked' };
    if (await authorize({ key, decisionRef: row.decision_ref, contentHash: row.content_hash, recipient: message.to }) !== true) return { state: 'blocked' };
  } catch { return { state: 'blocked' }; }
  const claim = await claimMail(db, key, now());
  if (!claim) return { state: 'not_claimed' };
  let deadline;
  try {
    // Reserving an attempt may await storage; consent can change during that wait.
    if (await authorize({ key, decisionRef: claim.decision_ref, contentHash: claim.content_hash, recipient: message.to }) !== true) {
      const cancelled = await db.prepare(`UPDATE mail_outbox SET state='cancelled',updated_at=?
        WHERE reply_key=? AND attempt_id=? AND state='sending' AND updated_at<=? RETURNING reply_key`)
        .bind(now(), key, claim.attempt_id, now()).first();
      return { state: cancelled ? 'blocked' : 'uncertain' };
    }
    // A timeout cannot cancel a provider acceptance: never recycle this attempt.
    const response = await Promise.race([
      Promise.resolve().then(() => email.send(message)),
      new Promise((_, reject) => { deadline = setTimeout(() => reject(new Error('provider deadline')), timeoutMs); }),
    ]);
    if (typeof response?.messageId !== 'string' || !response.messageId || response.messageId.length > 1024) throw new Error('invalid provider receipt');
    const ref = await saveReceipt({ key, attemptId: claim.attempt_id, messageId: response.messageId });
    if (!await finishMail(db, key, claim.attempt_id, 'accepted', ref, now())) return { state: 'uncertain' };
    return { state: 'accepted', receiptRef: ref };
  } catch {
    // Any exception after claim can be a successful send with a lost response.
    // A DB outage leaves 'sending', which is also never reclaimed automatically.
    try { await finishMail(db, key, claim.attempt_id, 'uncertain', null, now()); } catch { /* preserve sending */ }
    return { state: 'uncertain' };
  } finally { clearTimeout(deadline); }
}
