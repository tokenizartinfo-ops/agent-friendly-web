-- Scoped AFW receipt from the authenticated finite reviewer. Hashes and dates only.
CREATE TABLE IF NOT EXISTS dossier_supervision_finite_reviews (
 event_id TEXT PRIMARY KEY NOT NULL,
 control_hash TEXT NOT NULL,
 run_id TEXT NOT NULL UNIQUE,
 actor_hash TEXT NOT NULL,
 execution_hash TEXT NOT NULL,
 result_hash TEXT NOT NULL,
 revision INTEGER NOT NULL CHECK(revision>0),
 received_at INTEGER NOT NULL CHECK(received_at>=0),
 reviewed_at INTEGER NOT NULL CHECK(reviewed_at>=received_at)
);
CREATE TRIGGER IF NOT EXISTS dossier_supervision_finite_review_no_update
 BEFORE UPDATE ON dossier_supervision_finite_reviews
 BEGIN SELECT RAISE(ABORT,'immutable_finite_review'); END;
CREATE TRIGGER IF NOT EXISTS dossier_supervision_finite_review_no_delete
 BEFORE DELETE ON dossier_supervision_finite_reviews
 BEGIN SELECT RAISE(ABORT,'immutable_finite_review'); END;
