-- Explicit LOCAL additive migration from occurrence schema1 to2; apply exactly once.
CREATE TABLE assistance_occurrence_approved_plans (
 occurrence_id TEXT PRIMARY KEY CHECK(length(occurrence_id)=36 AND substr(occurrence_id,9,1)='-' AND substr(occurrence_id,14,1)='-' AND substr(occurrence_id,19,1)='-' AND substr(occurrence_id,24,1)='-' AND length(replace(occurrence_id,'-',''))=32 AND replace(occurrence_id,'-','') NOT GLOB '*[^0-9a-f]*'),
 request_id TEXT NOT NULL UNIQUE CHECK(length(request_id)=36 AND substr(request_id,9,1)='-' AND substr(request_id,14,1)='-' AND substr(request_id,19,1)='-' AND substr(request_id,24,1)='-' AND length(replace(request_id,'-',''))=32 AND replace(request_id,'-','') NOT GLOB '*[^0-9a-f]*'),
 event_id TEXT NOT NULL UNIQUE REFERENCES assistance_supervision_events(event_id) CHECK(length(event_id)=64 AND event_id NOT GLOB '*[^0-9a-f]*'),
 project_ref TEXT NOT NULL CHECK(length(project_ref)=64 AND project_ref NOT GLOB '*[^0-9a-f]*'),
 revision INTEGER NOT NULL CHECK(typeof(revision)='integer' AND revision BETWEEN 1 AND 9007199254740991),
 kind TEXT NOT NULL CHECK(kind='assistance_requested'),
 topic TEXT NOT NULL CHECK(topic IN ('orientation','save','comparison','delivery')),
 observed_at TEXT NOT NULL,
 source_revision TEXT NOT NULL CHECK(length(source_revision)=40 AND source_revision NOT GLOB '*[^0-9a-f]*'),
 config_id TEXT NOT NULL CHECK(length(config_id) BETWEEN 7 AND 134 AND substr(config_id,1,6)='cecfg_' AND substr(config_id,7) NOT GLOB '*[^a-zA-Z0-9]*'),
 publication_id TEXT NOT NULL CHECK(length(publication_id) BETWEEN 10 AND 137 AND substr(publication_id,1,9)='cecfgver_' AND substr(publication_id,10) NOT GLOB '*[^a-zA-Z0-9]*'),
 identity_ref TEXT NOT NULL CHECK(length(identity_ref)=64 AND identity_ref NOT GLOB '*[^0-9a-f]*'),
 start_at INTEGER NOT NULL CHECK(typeof(start_at)='integer' AND start_at BETWEEN 0 AND 8640000000000000),
 deadline INTEGER NOT NULL CHECK(typeof(deadline)='integer' AND deadline>start_at AND deadline<=8640000000000000),
 token_expires_at INTEGER NOT NULL CHECK(typeof(token_expires_at)='integer' AND token_expires_at>start_at AND token_expires_at<=8640000000000000),
 server_deadline INTEGER NOT NULL CHECK(typeof(server_deadline)='integer' AND server_deadline>start_at AND server_deadline<=8640000000000000 AND deadline<=8640000000000000),
 enrollment_ref TEXT NOT NULL CHECK(length(enrollment_ref)=64 AND enrollment_ref NOT GLOB '*[^0-9a-f]*'),
 server_config_version TEXT NOT NULL CHECK(length(server_config_version)=64 AND server_config_version NOT GLOB '*[^0-9a-f]*'),
 plan_revision INTEGER NOT NULL CHECK(typeof(plan_revision)='integer' AND plan_revision BETWEEN 1 AND 9007199254740991)
);
CREATE TRIGGER assistance_occurrence_approval_signal BEFORE INSERT ON assistance_occurrence_approved_plans BEGIN
 SELECT CASE WHEN EXISTS(SELECT 1 FROM assistance_occurrences WHERE occurrence_id=NEW.occurrence_id OR request_id=NEW.request_id OR event_id=NEW.event_id) THEN RAISE(ABORT,'Occurrence denied') END;
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM assistance_supervision_events e WHERE e.event_id=NEW.event_id AND e.project_ref=NEW.project_ref AND e.revision=NEW.revision AND e.kind=NEW.kind AND e.topic=NEW.topic AND e.observed_at=NEW.observed_at) THEN RAISE(ABORT,'Occurrence denied') END;
END;
CREATE TABLE assistance_occurrence_plan_revocations (
 occurrence_id TEXT PRIMARY KEY REFERENCES assistance_occurrence_approved_plans(occurrence_id),
 reason TEXT NOT NULL CHECK(reason IN ('operator_closed','window_expired','security_denied')),
 recorded_at INTEGER NOT NULL CHECK(typeof(recorded_at)='integer' AND recorded_at BETWEEN 0 AND 8640000000000000)
);
CREATE TABLE assistance_occurrence_contracts (
 occurrence_id TEXT PRIMARY KEY REFERENCES assistance_occurrences(occurrence_id),
 contract_version TEXT NOT NULL CHECK(contract_version='afw-server-admission-v1'),
 enrollment_ref TEXT NOT NULL CHECK(length(enrollment_ref)=64 AND enrollment_ref NOT GLOB '*[^0-9a-f]*'),
 server_config_version TEXT NOT NULL CHECK(length(server_config_version)=64 AND server_config_version NOT GLOB '*[^0-9a-f]*'),
 plan_revision INTEGER NOT NULL CHECK(typeof(plan_revision)='integer' AND plan_revision BETWEEN 1 AND 9007199254740991)
);
CREATE TABLE assistance_occurrence_admission_checks (
 operation_id TEXT PRIMARY KEY REFERENCES assistance_occurrence_journal(operation_id),
 verified INTEGER NOT NULL CHECK(typeof(verified)='integer' AND verified=1)
);
CREATE TRIGGER assistance_occurrence_server_transition BEFORE INSERT ON assistance_occurrence_journal BEGIN
 SELECT CASE WHEN (EXISTS(SELECT 1 FROM assistance_occurrence_contracts WHERE occurrence_id=NEW.occurrence_id)
 OR EXISTS(SELECT 1 FROM assistance_occurrence_approved_plans WHERE occurrence_id=NEW.occurrence_id)) AND NOT (EXISTS(SELECT 1 FROM assistance_occurrences o JOIN assistance_occurrence_approved_plans a ON a.occurrence_id=o.occurrence_id JOIN assistance_occurrence_contracts c ON c.occurrence_id=o.occurrence_id WHERE o.occurrence_id=NEW.occurrence_id AND a.request_id=o.request_id AND a.event_id=o.event_id AND a.project_ref=o.project_ref AND a.revision=o.revision AND a.kind=o.kind AND a.topic=o.topic AND a.observed_at=o.observed_at AND a.source_revision=o.source_revision AND a.config_id=o.config_id AND a.publication_id=o.publication_id AND a.identity_ref=o.identity_ref AND a.start_at=o.start_at AND a.deadline=o.deadline AND a.token_expires_at=o.token_expires_at AND a.server_deadline=o.server_deadline AND a.enrollment_ref=c.enrollment_ref AND a.server_config_version=c.server_config_version AND a.plan_revision=c.plan_revision) AND (NEW.state='stopped' OR NOT EXISTS(SELECT 1 FROM assistance_occurrence_plan_revocations WHERE occurrence_id=NEW.occurrence_id))) THEN RAISE(ABORT,'Occurrence denied') END;
END;
CREATE TRIGGER assistance_occurrence_server_final BEFORE INSERT ON assistance_occurrence_admission_checks BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM assistance_occurrence_journal j JOIN assistance_occurrence_contracts c ON c.occurrence_id=j.occurrence_id JOIN assistance_occurrences o ON o.occurrence_id=j.occurrence_id WHERE j.operation_id=NEW.operation_id AND j.state!='stopped' AND CAST(unixepoch('subsec')*1000 AS INTEGER)>=o.start_at AND CAST(unixepoch('subsec')*1000 AS INTEGER)+10000<min(o.deadline,o.token_expires_at,o.server_deadline,coalesce(j.lease_expires_at,8640000000000000)) AND j.observation_at<=CAST(unixepoch('subsec')*1000 AS INTEGER) AND CAST(unixepoch('subsec')*1000 AS INTEGER)-j.observation_at<=30000 AND NOT EXISTS(SELECT 1 FROM assistance_occurrence_plan_revocations r WHERE r.occurrence_id=j.occurrence_id)) THEN RAISE(ABORT,'Occurrence denied') END;
END;
CREATE TRIGGER assistance_occurrence_approved_plans_no_update BEFORE UPDATE ON assistance_occurrence_approved_plans BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_approved_plans_no_delete BEFORE DELETE ON assistance_occurrence_approved_plans BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_plan_revocations_no_update BEFORE UPDATE ON assistance_occurrence_plan_revocations BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_plan_revocations_no_delete BEFORE DELETE ON assistance_occurrence_plan_revocations BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_contracts_no_update BEFORE UPDATE ON assistance_occurrence_contracts BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_contracts_no_delete BEFORE DELETE ON assistance_occurrence_contracts BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_admission_checks_no_update BEFORE UPDATE ON assistance_occurrence_admission_checks BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_admission_checks_no_delete BEFORE DELETE ON assistance_occurrence_admission_checks BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TABLE assistance_occurrence_schema (
 singleton INTEGER PRIMARY KEY CHECK(singleton=1),version INTEGER NOT NULL CHECK(version=2)
);
INSERT INTO assistance_occurrence_schema(singleton,version) SELECT 1,CASE WHEN (SELECT count(*) FROM sqlite_master WHERE type='trigger' AND name IN ('assistance_occurrence_transition','assistance_occurrence_create_signal','assistance_occurrence_clock_checks_no_update','assistance_occurrence_effect_check_correlation'))=4 THEN 2 ELSE 0 END;
CREATE TRIGGER assistance_occurrence_schema_no_update BEFORE UPDATE ON assistance_occurrence_schema BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER assistance_occurrence_schema_no_delete BEFORE DELETE ON assistance_occurrence_schema BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
