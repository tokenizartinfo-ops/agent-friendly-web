-- Isolated AFW QA_DB676 only. NEW source schema, UNINSTALLED; never an automatic migration.
-- Root must inspect the target and preserve a recoverable baseline before
-- one separately authorized installation. No grant/reservation table access.
CREATE TABLE afw_qa_generation_drafts_v1 (
 named_bundle_hash TEXT PRIMARY KEY NOT NULL
  CHECK(typeof(named_bundle_hash)='text' AND length(named_bundle_hash)=64 AND named_bundle_hash NOT GLOB '*[^0-9a-f]*'),
 draft_json TEXT NOT NULL
  CHECK(typeof(draft_json)='text' AND length(CAST(draft_json AS BLOB))<=65536 AND json_valid(draft_json) AND json_type(draft_json)='object')
);
-- afw-statement --
-- BEFORE INSERT also prevents INSERT OR REPLACE from silently refunding a key.
CREATE TRIGGER afw_qa_generation_drafts_v1_no_duplicate BEFORE INSERT ON afw_qa_generation_drafts_v1
WHEN EXISTS(SELECT 1 FROM afw_qa_generation_drafts_v1 WHERE named_bundle_hash=NEW.named_bundle_hash)
BEGIN SELECT RAISE(ABORT,'AFW draft already recorded'); END;
-- afw-statement --
CREATE TRIGGER afw_qa_generation_drafts_v1_no_update BEFORE UPDATE ON afw_qa_generation_drafts_v1
BEGIN SELECT RAISE(ABORT,'AFW draft immutable'); END;
-- afw-statement --
CREATE TRIGGER afw_qa_generation_drafts_v1_no_delete BEFORE DELETE ON afw_qa_generation_drafts_v1
BEGIN SELECT RAISE(ABORT,'AFW draft immutable'); END;
