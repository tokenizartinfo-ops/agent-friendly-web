-- Additive operational inbox, never customer D1. Admission is not delivery.
CREATE TABLE IF NOT EXISTS operations_watchdog_inbox (
 resource TEXT NOT NULL,
 revision INTEGER NOT NULL CHECK(revision>=1),
 kind TEXT NOT NULL CHECK(kind IN ('attention','recovered')),
 condition TEXT NOT NULL,
 observed_at INTEGER NOT NULL,
 admitted_at INTEGER NOT NULL,
 PRIMARY KEY(resource,revision),
 FOREIGN KEY(resource,revision) REFERENCES operations_watchdog_outbox(resource,revision)
);
