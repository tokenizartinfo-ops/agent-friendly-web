-- Additive operational reservations; metadata review is not issue resolution.
CREATE TABLE IF NOT EXISTS assistance_supervision_runs (
 run_id TEXT PRIMARY KEY, request_id TEXT NOT NULL UNIQUE, event_id TEXT NOT NULL,
 started_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 outcome TEXT CHECK(outcome IN ('reviewed','intervention_required','superseded')), completed_at INTEGER,
 CHECK(expires_at>started_at AND expires_at<=started_at+300000),
 CHECK((outcome IS NULL AND completed_at IS NULL) OR (outcome IS NOT NULL AND completed_at IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS assistance_supervision_run_budget ON assistance_supervision_runs(started_at);
