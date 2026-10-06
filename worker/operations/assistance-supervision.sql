-- Operational metadata only; independent of the save revision ledger.
CREATE TABLE IF NOT EXISTS assistance_supervision_events (
 event_id TEXT PRIMARY KEY, project_ref TEXT NOT NULL, revision INTEGER NOT NULL CHECK(revision>0),
 kind TEXT NOT NULL CHECK(kind='assistance_requested'),
 topic TEXT NOT NULL CHECK(topic IN ('orientation','save','comparison','delivery')),
 observed_at TEXT NOT NULL, received_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS assistance_supervision_received ON assistance_supervision_events(received_at,event_id);
