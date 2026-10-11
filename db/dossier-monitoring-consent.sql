-- Private source D1 preparation only; no remote migration or consent UI mounted.
CREATE TABLE IF NOT EXISTS dossier_monitoring_consent_events (
 sequence INTEGER PRIMARY KEY AUTOINCREMENT,
 grant_id TEXT NOT NULL,
 project_id TEXT NOT NULL,
 user_id TEXT NOT NULL,
 client_id TEXT NOT NULL,
 resource TEXT NOT NULL,
 revision INTEGER NOT NULL CHECK(revision>0),
 action TEXT NOT NULL CHECK(action IN ('grant','revoke')),
 purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring.v1'),
 request_id TEXT NOT NULL,
 issued_at INTEGER NOT NULL CHECK(issued_at>=0),
 expires_at INTEGER NOT NULL,
 CHECK((action='grant' AND expires_at>issued_at AND expires_at-issued_at<=600000) OR (action='revoke' AND expires_at=issued_at)),
 UNIQUE(grant_id,request_id)
);
CREATE INDEX IF NOT EXISTS dossier_monitoring_consent_grant_sequence ON dossier_monitoring_consent_events(grant_id,sequence);
CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_update BEFORE UPDATE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END;
CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_delete BEFORE DELETE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END;
