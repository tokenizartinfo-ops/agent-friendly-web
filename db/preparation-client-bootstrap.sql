-- Optional isolated preparation maintenance journal. Never auto-applied.
-- A pending slot is spent even if no SDK ACK was received; never reset it.
CREATE TABLE preparation_client_bootstrap (
 slot_id TEXT PRIMARY KEY NOT NULL CHECK(slot_id = 'preparation-client'),
 operation_id TEXT NOT NULL,
 manifest_hash TEXT NOT NULL CHECK(length(manifest_hash) = 64),
 claimed_at TEXT NOT NULL,
 client_id TEXT,
 observed_at TEXT,
 CHECK ((client_id IS NULL AND observed_at IS NULL) OR
        (client_id IS NOT NULL AND observed_at IS NOT NULL))
);
