-- INTERNAL consumption of a reserved first successor, same own-QA primary D1.
CREATE TABLE IF NOT EXISTS dossier_successor_launch_claims (
 trial_id TEXT PRIMARY KEY REFERENCES dossier_successor_reservations(trial_id),
 scope_hash TEXT NOT NULL,
 container_id TEXT NOT NULL UNIQUE,
 process_generation TEXT NOT NULL UNIQUE,
 grant_id TEXT NOT NULL UNIQUE REFERENCES delegated_access_grants(id),
 claimed_at INTEGER NOT NULL
);
CREATE TRIGGER IF NOT EXISTS dossier_successor_launch_no_update BEFORE UPDATE ON dossier_successor_launch_claims BEGIN SELECT RAISE(ABORT,'immutable_successor_launch'); END;
CREATE TRIGGER IF NOT EXISTS dossier_successor_launch_no_delete BEFORE DELETE ON dossier_successor_launch_claims BEGIN SELECT RAISE(ABORT,'immutable_successor_launch'); END;
