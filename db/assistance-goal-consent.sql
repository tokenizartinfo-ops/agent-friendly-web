-- Private source D1 only. Preparation: no remote migration is implied.
CREATE TABLE IF NOT EXISTS assistance_goal_consent_events (
 sequence INTEGER PRIMARY KEY AUTOINCREMENT,
 project_id TEXT NOT NULL,
 user_id TEXT NOT NULL,
 source_event_id TEXT NOT NULL,
 revision INTEGER NOT NULL,
 action TEXT NOT NULL CHECK(action IN ('grant','revoke')),
 consent_version TEXT NOT NULL,
 request_id TEXT NOT NULL,
 issued_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL,
 UNIQUE(project_id,request_id)
);
CREATE INDEX IF NOT EXISTS assistance_goal_consent_source_sequence
 ON assistance_goal_consent_events(project_id,user_id,source_event_id,sequence);
