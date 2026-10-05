import { INVESTIGATION_LEASE_MS, MAX_INVESTIGATIONS } from './operations-ledger.mjs';

export const INVESTIGATIONS_PER_DAY = 3;
const DAY = 86400000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const FINGERPRINT = /^[0-9a-f]{64}$/;
const TARGET = `(resource='afw_public_web' AND check_id IN ('public_home','public_discovery','private_boundary')) OR
  (resource IN ('afw_delegated_canary','afw_delegated_real_pilot') AND check_id='delegated_edge')`;
function clock(now) {
  if (!Number.isSafeInteger(now) || now < 0 || !Number.isFinite(new Date(now + INVESTIGATION_LEASE_MS).getTime())) throw new Error('Invalid investigation input');
}
function summary(row) {
  if (!FINGERPRINT.test(row.fingerprint) || !UUID.test(row.version) || !Number.isSafeInteger(row.observed_at) || row.observed_at < 0 || !Number.isFinite(new Date(row.observed_at).getTime())) throw new Error('Invalid incident metadata');
  return { fingerprint: row.fingerprint, resource: row.resource, check: row.check_id, version: row.version, observedAt: new Date(row.observed_at).toISOString() };
}

/** This is a diagnostic reservation, never permission to mutate external resources. */
export async function listPendingIncidents(db, now = Date.now()) {
  clock(now);
  const { results } = await db.prepare(`SELECT fingerprint,resource,check_id,version,observed_at FROM operations_incidents
    WHERE (${TARGET}) AND state='failed' AND attempts<? AND observed_at<=?
    AND (phase='pending' OR (phase='investigating' AND lease_until<=?))
    ORDER BY observed_at,fingerprint LIMIT 10`).bind(MAX_INVESTIGATIONS, now, now).all();
  return results.map(summary);
}

export async function reserveInvestigation(db, fingerprint, now = Date.now(), requestId = crypto.randomUUID(), {sharedNoticeBudget=false}={}) {
  clock(now);
  if (!FINGERPRINT.test(fingerprint) || !UUID.test(requestId)) throw new Error('Invalid investigation input');
  const runId = crypto.randomUUID(), lease = crypto.randomUUID(), expires = now + INVESTIGATION_LEASE_MS;
  const claim = db.prepare(`UPDATE operations_incidents SET phase='investigating',lease_token=?,lease_until=?,
    lease_observed_at=observed_at,attempts=attempts+1,updated_at=?
    WHERE fingerprint=? AND (${TARGET}) AND state='failed' AND attempts<? AND observed_at<=?
    AND (phase='pending' OR (phase='investigating' AND lease_until<=?))
    AND NOT EXISTS(SELECT 1 FROM operations_investigations WHERE request_id=?)
    AND ((SELECT COUNT(*) FROM operations_investigations WHERE reserved_at>?)${sharedNoticeBudget?' + (SELECT COUNT(*) FROM operations_notice_reservations WHERE reserved_at>?)':''})<?
    ${sharedNoticeBudget?'AND NOT EXISTS(SELECT 1 FROM operations_notice_reservations WHERE outcome IS NULL AND expires_at>?)':''}
    AND NOT EXISTS(SELECT 1 FROM operations_investigations WHERE finished_at IS NULL AND expires_at>?)
    AND NOT EXISTS(SELECT 1 FROM operations_incidents WHERE phase='investigating' AND lease_until>?)`)
    .bind(lease, expires, now, fingerprint, MAX_INVESTIGATIONS, now, now, requestId, now - DAY,...(sharedNoticeBudget?[now-DAY]:[]), INVESTIGATIONS_PER_DAY,...(sharedNoticeBudget?[now]:[]), now, now);
  const receipt = db.prepare(`INSERT INTO operations_investigations
    (run_id,request_id,fingerprint,consumer_ref,lease_token,observed_at,reserved_at,expires_at)
    SELECT ?,?,fingerprint,'afw-cloud-manager',lease_token,lease_observed_at,?,lease_until
    FROM operations_incidents WHERE fingerprint=? AND lease_token=?`)
    .bind(runId, requestId, now, fingerprint, lease);
  // D1 batch is transactional: no reservation without its budget/correlation receipt.
  await db.batch([claim, receipt]);
  const row = await db.prepare(`SELECT r.run_id,i.fingerprint,i.resource,i.check_id,i.version,r.observed_at,r.expires_at
    FROM operations_investigations r JOIN operations_incidents i ON i.fingerprint=r.fingerprint
    WHERE r.request_id=? AND r.fingerprint=? AND r.finished_at IS NULL AND r.reserved_at<=? AND r.expires_at>?
    AND i.state='failed' AND i.phase='investigating' AND i.lease_token=r.lease_token`)
    .bind(requestId, fingerprint, now, now).first();
  return row ? { ...summary(row), runId: row.run_id, expiresAt: new Date(row.expires_at).toISOString() } : null;
}

export async function completeInvestigation(db, runId, outcome, now = Date.now()) {
  clock(now);
  if (!UUID.test(runId) || !['diagnosed', 'blocked'].includes(outcome)) throw new Error('Invalid investigation input');
  const receipt = db.prepare(`UPDATE operations_investigations SET finished_at=?,requested_outcome=?,outcome=
    CASE WHEN EXISTS(SELECT 1 FROM operations_incidents i WHERE i.fingerprint=operations_investigations.fingerprint
      AND i.state='failed' AND i.phase='investigating' AND i.lease_token=operations_investigations.lease_token
      AND i.observed_at=operations_investigations.observed_at) THEN ? ELSE 'superseded' END
    WHERE run_id=? AND consumer_ref='afw-cloud-manager' AND finished_at IS NULL AND reserved_at<=? AND expires_at>?`)
    .bind(now, outcome, outcome, runId, now, now);
  const finish = db.prepare(`UPDATE operations_incidents SET
    phase=CASE WHEN observed_at=lease_observed_at THEN 'review' ELSE 'pending' END,
    lease_token=NULL,lease_until=NULL,lease_observed_at=NULL,updated_at=?
    WHERE state='failed' AND phase='investigating' AND EXISTS(SELECT 1 FROM operations_investigations r
      WHERE r.run_id=? AND r.fingerprint=operations_incidents.fingerprint AND r.lease_token=operations_incidents.lease_token
      AND r.finished_at=? AND r.requested_outcome=?)`).bind(now, runId, now, outcome);
  await db.batch([receipt, finish]);
  const row = await db.prepare(`SELECT outcome,requested_outcome FROM operations_investigations
    WHERE run_id=? AND consumer_ref='afw-cloud-manager' AND finished_at IS NOT NULL`).bind(runId).first();
  return row?.requested_outcome === outcome ? row.outcome : null;
}
