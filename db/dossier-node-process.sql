-- INTERNAL own-QA process admission. Apply only to original delegated OAuth D1
-- after scoped rollout, never run a whole migration chain or infer consent.
CREATE TABLE IF NOT EXISTS dossier_node_process_admissions (
 grant_id TEXT PRIMARY KEY REFERENCES delegated_access_grants(id),
 project_id TEXT NOT NULL REFERENCES site_projects(id),
 user_id TEXT NOT NULL, client_id TEXT NOT NULL, resource TEXT NOT NULL,
 consent_sequence INTEGER NOT NULL, consent_issued_at INTEGER NOT NULL,
 consent_expires_at INTEGER NOT NULL,
 container_id TEXT NOT NULL, process_generation TEXT NOT NULL,
 program_hash TEXT NOT NULL, source_revision TEXT NOT NULL, image TEXT NOT NULL,
 created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 CHECK(expires_at>created_at AND expires_at-created_at<=600000)
);
CREATE UNIQUE INDEX IF NOT EXISTS dossier_node_process_generation ON dossier_node_process_admissions(process_generation);
CREATE TRIGGER IF NOT EXISTS dossier_node_process_no_update BEFORE UPDATE ON dossier_node_process_admissions BEGIN SELECT RAISE(ABORT,'immutable_node_process_admission'); END;
CREATE TRIGGER IF NOT EXISTS dossier_node_process_no_delete BEFORE DELETE ON dossier_node_process_admissions BEGIN SELECT RAISE(ABORT,'immutable_node_process_admission'); END;
CREATE TABLE IF NOT EXISTS dossier_node_process_closures (
 grant_id TEXT PRIMARY KEY REFERENCES delegated_access_grants(id),
 process_generation TEXT, container_id TEXT NOT NULL, program_hash TEXT NOT NULL, source_revision TEXT NOT NULL, image TEXT NOT NULL, closed_at INTEGER NOT NULL
);
CREATE TRIGGER IF NOT EXISTS dossier_node_process_close_no_update BEFORE UPDATE ON dossier_node_process_closures BEGIN SELECT RAISE(ABORT,'immutable_node_process_closure'); END;
CREATE TRIGGER IF NOT EXISTS dossier_node_process_close_no_delete BEFORE DELETE ON dossier_node_process_closures BEGIN SELECT RAISE(ABORT,'immutable_node_process_closure'); END;
