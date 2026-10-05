-- Additive, isolated operations D1 only. Never apply to customer databases.
CREATE TABLE IF NOT EXISTS operations_watchdog_state (
 resource TEXT PRIMARY KEY CHECK(resource IN ('afw_delegated_canary','afw_delegated_real_pilot')),
 checked_at INTEGER NOT NULL,
 changed_at INTEGER NOT NULL,
 condition TEXT NOT NULL,
 previous_condition TEXT NOT NULL,
 revision INTEGER NOT NULL CHECK(revision >= 1)
);
CREATE TABLE IF NOT EXISTS operations_watchdog_outbox (
 resource TEXT NOT NULL,
 revision INTEGER NOT NULL,
 kind TEXT NOT NULL CHECK(kind IN ('attention','recovered')),
 condition TEXT NOT NULL,
 observed_at INTEGER NOT NULL,
 PRIMARY KEY(resource,revision),
 FOREIGN KEY(resource) REFERENCES operations_watchdog_state(resource)
);
