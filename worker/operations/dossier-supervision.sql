-- Operational metadata only. Never copy client answers or identity into this ledger.
CREATE TABLE IF NOT EXISTS dossier_supervision_events (
 event_id TEXT PRIMARY KEY, project_ref TEXT NOT NULL, revision INTEGER NOT NULL CHECK(revision>0),
 kind TEXT NOT NULL CHECK(kind IN ('project_created','project_updated')), observed_at TEXT NOT NULL,
 received_at INTEGER NOT NULL, UNIQUE(project_ref,revision)
);
CREATE INDEX IF NOT EXISTS dossier_supervision_project_revision ON dossier_supervision_events(project_ref,revision);
CREATE TABLE IF NOT EXISTS dossier_supervision_runs (
 run_id TEXT PRIMARY KEY, request_id TEXT NOT NULL UNIQUE, event_id TEXT NOT NULL,
 started_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 outcome TEXT CHECK(outcome IN ('reviewed','intervention_required','superseded')), completed_at INTEGER
);
CREATE INDEX IF NOT EXISTS dossier_supervision_run_time ON dossier_supervision_runs(started_at);
