/** Manual/private maintenance only; no scheduler or remote deletion is activated.
 * Keep keys/hashes as tombstones, and preserve unresolved attempts for reconciliation.
 */
export async function purgeFinalizedMailContent(db,now=Date.now()) {
  if (!Number.isSafeInteger(now) || now<0) throw new Error('invalid clock');
  const result=await db.prepare(`UPDATE mail_content SET content_json=''
    WHERE content_json<>'' AND EXISTS(SELECT 1 FROM mail_outbox o
      WHERE o.reply_key=mail_content.reply_key AND o.content_hash=mail_content.content_hash
      AND o.state IN ('accepted','cancelled') AND o.updated_at<=?)`)
    .bind(now-30*86400000).run();
  return result.meta.changes;
}
