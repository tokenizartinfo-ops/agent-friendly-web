-- LOCAL explicit follow-up migration to schema2; apply transactionally exactly once.
-- Preserve schema2 contract; reservation fence generation1 is separately required.
CREATE TABLE assistance_occurrence_reservation_fence (
 singleton INTEGER PRIMARY KEY CHECK(singleton=1),generation INTEGER NOT NULL CHECK(generation=1)
);
CREATE TRIGGER assistance_occurrence_reserved_header BEFORE INSERT ON assistance_occurrences BEGIN
 SELECT CASE WHEN EXISTS(SELECT 1 FROM assistance_occurrence_approved_plans a WHERE a.occurrence_id=NEW.occurrence_id OR a.request_id=NEW.request_id OR a.event_id=NEW.event_id)
 AND NOT EXISTS(SELECT 1 FROM assistance_occurrence_approved_plans a WHERE a.occurrence_id=NEW.occurrence_id AND a.request_id=NEW.request_id AND a.event_id=NEW.event_id AND a.project_ref=NEW.project_ref AND a.revision=NEW.revision AND a.kind=NEW.kind AND a.topic=NEW.topic AND a.observed_at=NEW.observed_at AND a.source_revision=NEW.source_revision AND a.config_id=NEW.config_id AND a.publication_id=NEW.publication_id AND a.identity_ref=NEW.identity_ref AND a.start_at=NEW.start_at AND a.deadline=NEW.deadline AND a.token_expires_at=NEW.token_expires_at AND a.server_deadline=NEW.server_deadline AND NOT EXISTS(SELECT 1 FROM assistance_occurrence_plan_revocations r WHERE r.occurrence_id=a.occurrence_id)) THEN RAISE(ABORT,'Occurrence denied') END;
END;
DROP TRIGGER assistance_occurrence_server_transition;
CREATE TRIGGER assistance_occurrence_server_transition BEFORE INSERT ON assistance_occurrence_journal BEGIN
 SELECT CASE WHEN (EXISTS(SELECT 1 FROM assistance_occurrence_contracts WHERE occurrence_id=NEW.occurrence_id)
 OR EXISTS(SELECT 1 FROM assistance_occurrence_approved_plans a JOIN assistance_occurrences o ON o.occurrence_id=NEW.occurrence_id WHERE a.occurrence_id=o.occurrence_id OR a.request_id=o.request_id OR a.event_id=o.event_id)) AND NOT (NEW.state='stopped' AND NOT EXISTS(SELECT 1 FROM assistance_occurrence_contracts WHERE occurrence_id=NEW.occurrence_id)) AND NOT (EXISTS(SELECT 1 FROM assistance_occurrences o JOIN assistance_occurrence_approved_plans a ON a.occurrence_id=o.occurrence_id JOIN assistance_occurrence_contracts c ON c.occurrence_id=o.occurrence_id WHERE o.occurrence_id=NEW.occurrence_id AND a.request_id=o.request_id AND a.event_id=o.event_id AND a.project_ref=o.project_ref AND a.revision=o.revision AND a.kind=o.kind AND a.topic=o.topic AND a.observed_at=o.observed_at AND a.source_revision=o.source_revision AND a.config_id=o.config_id AND a.publication_id=o.publication_id AND a.identity_ref=o.identity_ref AND a.start_at=o.start_at AND a.deadline=o.deadline AND a.token_expires_at=o.token_expires_at AND a.server_deadline=o.server_deadline AND a.enrollment_ref=c.enrollment_ref AND a.server_config_version=c.server_config_version AND a.plan_revision=c.plan_revision) AND (NEW.state='stopped' OR NOT EXISTS(SELECT 1 FROM assistance_occurrence_plan_revocations WHERE occurrence_id=NEW.occurrence_id))) THEN RAISE(ABORT,'Occurrence denied') END;
END;
INSERT INTO assistance_occurrence_reservation_fence(singleton,generation) SELECT 1,CASE WHEN (SELECT version FROM assistance_occurrence_schema WHERE singleton=1)=2 THEN 1 ELSE 0 END;
CREATE TRIGGER assistance_occurrence_reservation_fence_no_update BEFORE UPDATE ON assistance_occurrence_reservation_fence BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_reservation_fence_no_delete BEFORE DELETE ON assistance_occurrence_reservation_fence BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
