-- Private source D1 only. Immutable claim and prepared-result history.
-- One generation attempt per read receipt; expiry never silently starts another.
CREATE TABLE IF NOT EXISTS assistance_goal_proposal_claims (
 receipt_id TEXT PRIMARY KEY,
 claim_id TEXT NOT NULL UNIQUE,
 context_hash TEXT NOT NULL,
 consent_sequence INTEGER NOT NULL,
 started_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL CHECK(expires_at>started_at AND expires_at-started_at<=30000)
);
CREATE TABLE IF NOT EXISTS assistance_goal_proposal_results (
 claim_id TEXT PRIMARY KEY,
 receipt_id TEXT NOT NULL UNIQUE,
 proposal_id TEXT NOT NULL UNIQUE,
 payload_json TEXT NOT NULL CHECK(length(payload_json)<=2048),
 prepared_at INTEGER NOT NULL
);
