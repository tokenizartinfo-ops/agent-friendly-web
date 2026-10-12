-- PRIVATE own-QA first producer-completion observation. Additive only;
-- rollback retains receipts. No callback secrets or native-cloud ACK claim.
CREATE TABLE IF NOT EXISTS dossier_event_subscription_receipts (
 grant_id TEXT PRIMARY KEY REFERENCES delegated_access_grants(id),
 subscription_id TEXT NOT NULL UNIQUE,
 project_id TEXT NOT NULL, user_id TEXT NOT NULL, client_id TEXT NOT NULL, resource TEXT NOT NULL,
 container_id TEXT NOT NULL, process_generation TEXT NOT NULL, program_hash TEXT NOT NULL, source_revision TEXT NOT NULL, image TEXT NOT NULL,
 observed_at INTEGER NOT NULL, recorded_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 CHECK(observed_at>=0 AND recorded_at>=0 AND expires_at>observed_at AND expires_at>recorded_at)
);
CREATE TRIGGER IF NOT EXISTS dossier_subscription_receipt_no_update BEFORE UPDATE ON dossier_event_subscription_receipts BEGIN SELECT RAISE(ABORT,'immutable_subscription_receipt'); END;
CREATE TRIGGER IF NOT EXISTS dossier_subscription_receipt_no_delete BEFORE DELETE ON dossier_event_subscription_receipts BEGIN SELECT RAISE(ABORT,'immutable_subscription_receipt'); END;
