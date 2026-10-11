-- Source-only purpose-bound CSRF forms; not remotely migrated or mounted.
CREATE TABLE IF NOT EXISTS dossier_monitoring_owner_tickets (
 handle_hash TEXT PRIMARY KEY,
 request_id TEXT NOT NULL UNIQUE,
 user_id TEXT NOT NULL,
 grant_id TEXT NOT NULL,
 project_id TEXT NOT NULL,
 client_id TEXT NOT NULL,
 resource TEXT NOT NULL,
 purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring-owner.v1'),
 action TEXT NOT NULL CHECK(action IN ('grant','revoke')),
 revision INTEGER NOT NULL CHECK(revision>0),
 expected_sequence INTEGER NOT NULL CHECK(expected_sequence>=0),
 issued_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL CHECK(expires_at>issued_at AND expires_at-issued_at<=600000),
 permission_expires_at INTEGER NOT NULL
);
CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_update BEFORE UPDATE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END;
CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_delete BEFORE DELETE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END;
