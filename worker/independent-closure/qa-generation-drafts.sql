-- RED-only source stub, never an installed schema.
CREATE TABLE afw_qa_generation_drafts_v1 (named_bundle_hash TEXT,draft_json TEXT);
-- afw-statement --
CREATE TRIGGER afw_qa_generation_drafts_v1_no_duplicate BEFORE INSERT ON afw_qa_generation_drafts_v1 WHEN 0 BEGIN SELECT 1; END;
-- afw-statement --
CREATE TRIGGER afw_qa_generation_drafts_v1_no_update BEFORE UPDATE ON afw_qa_generation_drafts_v1 WHEN 0 BEGIN SELECT 1; END;
-- afw-statement --
CREATE TRIGGER afw_qa_generation_drafts_v1_no_delete BEFORE DELETE ON afw_qa_generation_drafts_v1 WHEN 0 BEGIN SELECT 1; END;
