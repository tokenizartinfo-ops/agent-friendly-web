-- LOCAL opt-in additive migration only. Does not change schema2/fence1.
CREATE TABLE assistance_private_installation_provenance (
 occurrence_id TEXT PRIMARY KEY REFERENCES assistance_occurrence_approved_plans(occurrence_id),
 intent_id TEXT NOT NULL UNIQUE CHECK(length(intent_id)=36 AND length(replace(intent_id,'-',''))=32 AND replace(intent_id,'-','') NOT GLOB '*[^0-9a-f]*' AND substr(intent_id,9,1)='-' AND substr(intent_id,14,1)='-' AND substr(intent_id,19,1)='-' AND substr(intent_id,24,1)='-'),
 owner_ref TEXT NOT NULL UNIQUE CHECK(length(owner_ref)=64 AND owner_ref NOT GLOB '*[^0-9a-f]*'),
 reservation_sequence INTEGER NOT NULL CHECK(typeof(reservation_sequence)='integer' AND reservation_sequence=1),
 approval_pins_digest TEXT NOT NULL CHECK(length(approval_pins_digest)=64 AND approval_pins_digest NOT GLOB '*[^0-9a-f]*'),
 approval_digest TEXT NOT NULL CHECK(length(approval_digest)=64 AND approval_digest NOT GLOB '*[^0-9a-f]*'),
 deadline INTEGER NOT NULL CHECK(typeof(deadline)='integer' AND deadline BETWEEN 1 AND 8640000000000000)
);
CREATE TABLE assistance_private_installation_schema (
 singleton INTEGER PRIMARY KEY CHECK(singleton=1),version INTEGER NOT NULL CHECK(version=1)
);
CREATE TRIGGER assistance_private_installation_window BEFORE INSERT ON assistance_private_installation_provenance BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM assistance_occurrence_approved_plans a WHERE a.occurrence_id=NEW.occurrence_id AND a.deadline=NEW.deadline AND CAST(unixepoch('subsec')*1000 AS INTEGER)<min(a.deadline,a.token_expires_at,a.server_deadline)) THEN RAISE(ABORT,'Installation window closed') END;
END;
INSERT INTO assistance_private_installation_schema(singleton,version) SELECT 1,CASE WHEN (SELECT version FROM assistance_occurrence_schema WHERE singleton=1)=2 AND (SELECT generation FROM assistance_occurrence_reservation_fence WHERE singleton=1)=1 THEN 1 ELSE 0 END;
CREATE TRIGGER assistance_private_installation_provenance_no_update BEFORE UPDATE ON assistance_private_installation_provenance BEGIN
 SELECT RAISE(ABORT,'Immutable installation provenance');
END;
CREATE TRIGGER assistance_private_installation_provenance_no_delete BEFORE DELETE ON assistance_private_installation_provenance BEGIN
 SELECT RAISE(ABORT,'Immutable installation provenance');
END;
CREATE TRIGGER assistance_private_installation_schema_no_update BEFORE UPDATE ON assistance_private_installation_schema BEGIN
 SELECT RAISE(ABORT,'Immutable installation schema');
END;
CREATE TRIGGER assistance_private_installation_schema_no_delete BEFORE DELETE ON assistance_private_installation_schema BEGIN
 SELECT RAISE(ABORT,'Immutable installation schema');
END;
