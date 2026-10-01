-- Dedicated operational storage, never the customer application's D1.
CREATE TABLE operations_events (
  event_id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  observed_at INTEGER NOT NULL,
  result TEXT NOT NULL CHECK(result IN ('failed','recovered')),
  received_at INTEGER NOT NULL,
  processed INTEGER NOT NULL DEFAULT 0 CHECK(processed IN (0,1))
);
CREATE INDEX operations_events_fingerprint ON operations_events(fingerprint, observed_at);
CREATE TABLE operations_incidents (
  fingerprint TEXT PRIMARY KEY,
  resource TEXT NOT NULL,
  check_id TEXT NOT NULL,
  version TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('failed','recovered')),
  phase TEXT NOT NULL CHECK(phase IN ('pending','investigating','review','closed')),
  observed_at INTEGER NOT NULL,
  failures INTEGER NOT NULL DEFAULT 1,
  attempts INTEGER NOT NULL DEFAULT 0,
  lease_token TEXT,
  lease_until INTEGER,
  lease_observed_at INTEGER,
  updated_at INTEGER NOT NULL
);
