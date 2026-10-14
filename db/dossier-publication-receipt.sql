-- Private release journal. Not a deployment or execution permission.
CREATE TABLE IF NOT EXISTS dossier_publication_attempts (
 artifact_key TEXT PRIMARY KEY, account_id TEXT NOT NULL, worker_name TEXT NOT NULL,
 source_revision TEXT NOT NULL, source_tree TEXT NOT NULL, program_hash TEXT NOT NULL,
 worker_hash TEXT NOT NULL, started_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS dossier_publication_receipts (
 artifact_key TEXT PRIMARY KEY REFERENCES dossier_publication_attempts(artifact_key),
 version_id TEXT NOT NULL UNIQUE, etag TEXT NOT NULL, confirmed_at INTEGER NOT NULL
);
CREATE TRIGGER IF NOT EXISTS publication_attempt_no_update BEFORE UPDATE ON dossier_publication_attempts BEGIN SELECT RAISE(ABORT,'immutable_publication_attempt'); END;
CREATE TRIGGER IF NOT EXISTS publication_attempt_no_delete BEFORE DELETE ON dossier_publication_attempts BEGIN SELECT RAISE(ABORT,'immutable_publication_attempt'); END;
CREATE TRIGGER IF NOT EXISTS publication_receipt_no_update BEFORE UPDATE ON dossier_publication_receipts BEGIN SELECT RAISE(ABORT,'immutable_publication_receipt'); END;
CREATE TRIGGER IF NOT EXISTS publication_receipt_no_delete BEFORE DELETE ON dossier_publication_receipts BEGIN SELECT RAISE(ABORT,'immutable_publication_receipt'); END;
