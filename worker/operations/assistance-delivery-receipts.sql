-- PRIVATE SOURCE database only. Never copy source_event_id to operations/cloud.
-- Acknowledgements are purpose-scoped and advance only after an exact receiver receipt.
CREATE TABLE IF NOT EXISTS assistance_delivery_receipts (
 project_ref TEXT NOT NULL, source_event_id TEXT NOT NULL, event_id TEXT NOT NULL UNIQUE,
 confirmed_at INTEGER NOT NULL, PRIMARY KEY(project_ref,source_event_id)
);
