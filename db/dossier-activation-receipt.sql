-- Operator evidence only; no launch authority and no modification of code receipts.
CREATE TABLE IF NOT EXISTS dossier_activation_attempts (
 activation_key TEXT PRIMARY KEY, artifact_key TEXT NOT NULL REFERENCES dossier_publication_receipts(artifact_key),
 trial_id TEXT NOT NULL UNIQUE, scope_hash TEXT NOT NULL, configuration_hash TEXT NOT NULL,
 start_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, started_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS dossier_activation_receipts (
 activation_key TEXT PRIMARY KEY REFERENCES dossier_activation_attempts(activation_key),
 version_id TEXT NOT NULL, deployment_id TEXT NOT NULL UNIQUE, etag TEXT NOT NULL, confirmed_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS dossier_activation_acceptances (
 activation_key TEXT PRIMARY KEY REFERENCES dossier_activation_receipts(activation_key), acknowledged_at INTEGER NOT NULL
);
CREATE TRIGGER IF NOT EXISTS activation_attempt_no_update BEFORE UPDATE ON dossier_activation_attempts BEGIN SELECT RAISE(ABORT,'immutable_activation_attempt'); END;
CREATE TRIGGER IF NOT EXISTS activation_attempt_no_delete BEFORE DELETE ON dossier_activation_attempts BEGIN SELECT RAISE(ABORT,'immutable_activation_attempt'); END;
CREATE TRIGGER IF NOT EXISTS activation_receipt_no_update BEFORE UPDATE ON dossier_activation_receipts BEGIN SELECT RAISE(ABORT,'immutable_activation_receipt'); END;
CREATE TRIGGER IF NOT EXISTS activation_receipt_no_delete BEFORE DELETE ON dossier_activation_receipts BEGIN SELECT RAISE(ABORT,'immutable_activation_receipt'); END;
CREATE TRIGGER IF NOT EXISTS activation_acceptance_no_update BEFORE UPDATE ON dossier_activation_acceptances BEGIN SELECT RAISE(ABORT,'immutable_activation_acceptance'); END;
CREATE TRIGGER IF NOT EXISTS activation_acceptance_no_delete BEFORE DELETE ON dossier_activation_acceptances BEGIN SELECT RAISE(ABORT,'immutable_activation_acceptance'); END;
