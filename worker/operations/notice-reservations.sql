CREATE TABLE IF NOT EXISTS operations_notice_reservations (
 run_id TEXT PRIMARY KEY,request_id TEXT NOT NULL UNIQUE,
 resource TEXT NOT NULL,revision INTEGER NOT NULL,
 reserved_at INTEGER NOT NULL,expires_at INTEGER NOT NULL,
 acknowledged_at INTEGER,outcome TEXT CHECK(outcome IN ('accepted','superseded')),
 FOREIGN KEY(resource,revision) REFERENCES operations_watchdog_inbox(resource,revision),
 CHECK(expires_at>reserved_at),
 CHECK((acknowledged_at IS NULL AND outcome IS NULL) OR (acknowledged_at IS NOT NULL AND outcome IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS operations_notice_reservations_budget ON operations_notice_reservations(reserved_at);
CREATE INDEX IF NOT EXISTS operations_notice_reservations_active ON operations_notice_reservations(expires_at) WHERE outcome IS NULL;
