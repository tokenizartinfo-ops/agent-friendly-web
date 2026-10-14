-- INTERNAL first-successor reservation only; never migration of production.
-- Same own-QA D1 as original immutable admission and closure. No boot authority.
CREATE TABLE IF NOT EXISTS dossier_successor_reservations (
 slot TEXT PRIMARY KEY CHECK(slot='afw.own-successor.v1'),
 trial_id TEXT NOT NULL UNIQUE,
 predecessor_container_id TEXT NOT NULL UNIQUE,
 predecessor_generation TEXT NOT NULL,
 predecessor_program_hash TEXT NOT NULL,
 predecessor_source_revision TEXT NOT NULL,
 application_id TEXT NOT NULL,
 container_id TEXT NOT NULL UNIQUE,
 program_hash TEXT NOT NULL,
 source_revision TEXT NOT NULL,
 scope_hash TEXT NOT NULL,
 start_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL,
 budget INTEGER NOT NULL CHECK(budget=1),
 closed_at INTEGER NOT NULL,
 stopped_at INTEGER NOT NULL,
 observed_at INTEGER NOT NULL,
 reserved_at INTEGER NOT NULL,
 state TEXT NOT NULL CHECK(state='prepared'),
 CHECK(container_id<>predecessor_container_id),
 CHECK(expires_at>start_at AND expires_at-start_at<=600000),
 CHECK(reserved_at<expires_at),
 CHECK(reserved_at>=observed_at AND reserved_at-observed_at<=30000),
 CHECK(closed_at<=observed_at AND stopped_at<=observed_at)
);
CREATE TRIGGER IF NOT EXISTS dossier_successor_no_update BEFORE UPDATE ON dossier_successor_reservations BEGIN SELECT RAISE(ABORT,'immutable_successor_reservation'); END;
CREATE TRIGGER IF NOT EXISTS dossier_successor_no_delete BEFORE DELETE ON dossier_successor_reservations BEGIN SELECT RAISE(ABORT,'immutable_successor_reservation'); END;
