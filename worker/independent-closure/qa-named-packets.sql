-- Isolated AFW QA_DB676 only. Source schema, never an automatic migration.
-- Root must inspect the target and preserve a recoverable baseline before
-- one separately authorized installation. No grant/reservation table access.
CREATE TABLE afw_qa_named_packets_v1 (
 generation_plan_hash TEXT PRIMARY KEY NOT NULL
  CHECK(typeof(generation_plan_hash)='text' AND length(generation_plan_hash)=64 AND generation_plan_hash NOT GLOB '*[^0-9a-f]*'),
 packet_json TEXT NOT NULL
  CHECK(typeof(packet_json)='text' AND length(CAST(packet_json AS BLOB))<=65536 AND json_valid(packet_json) AND json_type(packet_json)='object')
);
-- afw-statement --
-- BEFORE INSERT also prevents INSERT OR REPLACE from silently refunding a key.
CREATE TRIGGER afw_qa_named_packets_v1_no_duplicate BEFORE INSERT ON afw_qa_named_packets_v1
WHEN EXISTS(SELECT 1 FROM afw_qa_named_packets_v1 WHERE generation_plan_hash=NEW.generation_plan_hash)
BEGIN SELECT RAISE(ABORT,'AFW packet already recorded'); END;
-- afw-statement --
CREATE TRIGGER afw_qa_named_packets_v1_no_update BEFORE UPDATE ON afw_qa_named_packets_v1
BEGIN SELECT RAISE(ABORT,'AFW packet immutable'); END;
-- afw-statement --
CREATE TRIGGER afw_qa_named_packets_v1_no_delete BEFORE DELETE ON afw_qa_named_packets_v1
BEGIN SELECT RAISE(ABORT,'AFW packet immutable'); END;
