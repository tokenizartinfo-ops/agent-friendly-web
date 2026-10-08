-- LOCAL preparation only. Install separately in verified own QA, never source/dossier D1.
CREATE TABLE IF NOT EXISTS assistance_occurrences (
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
 origin TEXT NOT NULL CHECK(origin='https://github.com/tokenizartinfo-ops/agent-friendly-web.git'),
 identity_ref TEXT NOT NULL CHECK(length(identity_ref)=64 AND identity_ref NOT GLOB '*[^0-9a-f]*'),
 manifest_digest TEXT NOT NULL CHECK(length(manifest_digest)=64 AND manifest_digest NOT GLOB '*[^0-9a-f]*'),
 configuration_revision INTEGER NOT NULL CHECK(typeof(configuration_revision)='integer' AND configuration_revision BETWEEN 1 AND 9007199254740991),
 start_at INTEGER NOT NULL CHECK(typeof(start_at)='integer' AND start_at BETWEEN 0 AND 8640000000000000),
 deadline INTEGER NOT NULL CHECK(typeof(deadline)='integer' AND deadline>start_at AND deadline<=8640000000000000),
 token_expires_at INTEGER NOT NULL CHECK(typeof(token_expires_at)='integer' AND token_expires_at>start_at AND token_expires_at<=8640000000000000),
 server_deadline INTEGER NOT NULL CHECK(typeof(server_deadline)='integer' AND server_deadline>start_at AND server_deadline<=8640000000000000 AND deadline<=8640000000000000)
);
CREATE TABLE IF NOT EXISTS assistance_occurrence_journal (
 occurrence_id TEXT NOT NULL REFERENCES assistance_occurrences(occurrence_id),
 sequence INTEGER NOT NULL CHECK(typeof(sequence)='integer' AND sequence BETWEEN 0 AND 7),
 operation_id TEXT NOT NULL UNIQUE CHECK(length(operation_id)=36 AND substr(operation_id,9,1)='-' AND substr(operation_id,14,1)='-' AND substr(operation_id,19,1)='-' AND substr(operation_id,24,1)='-' AND length(replace(operation_id,'-',''))=32 AND replace(operation_id,'-','') NOT GLOB '*[^0-9a-f]*'),
 identity_ref TEXT NOT NULL, manifest_digest TEXT NOT NULL,
 phase TEXT NOT NULL CHECK(phase IN ('preflight','list','claim','finish')),
 state TEXT NOT NULL CHECK(state IN ('started','attempted','consumed','completed','stopped')),
 attempts INTEGER NOT NULL CHECK(typeof(attempts)='integer' AND attempts BETWEEN 0 AND 3),
 controls INTEGER NOT NULL CHECK(typeof(controls)='integer' AND controls BETWEEN 1 AND 4),
 recorded_at INTEGER NOT NULL CHECK(typeof(recorded_at)='integer' AND recorded_at BETWEEN 0 AND 8640000000000000),
 observation_at INTEGER NOT NULL CHECK(typeof(observation_at)='integer' AND observation_at BETWEEN 0 AND 8640000000000000),
 observation_revision INTEGER NOT NULL CHECK(typeof(observation_revision)='integer' AND observation_revision BETWEEN 1 AND 9007199254740991),
 run_id TEXT CHECK(run_id IS NULL OR (length(run_id)=36 AND substr(run_id,9,1)='-' AND substr(run_id,14,1)='-' AND substr(run_id,19,1)='-' AND substr(run_id,24,1)='-' AND length(replace(run_id,'-',''))=32 AND replace(run_id,'-','') NOT GLOB '*[^0-9a-f]*')),
 lease_expires_at INTEGER CHECK(lease_expires_at IS NULL OR (typeof(lease_expires_at)='integer' AND lease_expires_at BETWEEN 0 AND 8640000000000000)),
 outcome TEXT CHECK(outcome IS NULL OR outcome IN ('intervention_required','superseded')),
 reason TEXT CHECK(reason IS NULL OR reason IN ('operator_closed','window_expired','ambiguous_response')),
 PRIMARY KEY(occurrence_id,sequence),
 CHECK((run_id IS NULL)=(lease_expires_at IS NULL)),
 CHECK((state='completed')=(outcome IS NOT NULL)),
 CHECK((state='stopped')=(reason IS NOT NULL))
);
CREATE UNIQUE INDEX IF NOT EXISTS assistance_occurrence_admission_once
 ON assistance_occurrence_journal(occurrence_id,phase) WHERE state='attempted';
CREATE UNIQUE INDEX IF NOT EXISTS assistance_occurrence_consumption_once
 ON assistance_occurrence_journal(occurrence_id,phase) WHERE state IN ('consumed','completed');
CREATE TRIGGER IF NOT EXISTS assistance_occurrence_create_signal
 BEFORE INSERT ON assistance_occurrences BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM assistance_supervision_events e
 WHERE e.event_id=NEW.event_id AND e.project_ref=NEW.project_ref AND e.revision=NEW.revision
 AND e.kind=NEW.kind AND e.topic=NEW.topic AND e.observed_at=NEW.observed_at
 AND NOT EXISTS(SELECT 1 FROM assistance_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision))
 THEN RAISE(ABORT,'Occurrence denied') END;
END;
CREATE TRIGGER IF NOT EXISTS assistance_occurrence_transition
 BEFORE INSERT ON assistance_occurrence_journal BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM assistance_occurrences o WHERE o.occurrence_id=NEW.occurrence_id
 AND o.identity_ref=NEW.identity_ref AND o.manifest_digest=NEW.manifest_digest)
 THEN RAISE(ABORT,'Occurrence denied') END;
 SELECT CASE WHEN NEW.state!='stopped' AND NOT EXISTS(SELECT 1 FROM assistance_occurrences o
 JOIN assistance_supervision_events e ON e.event_id=o.event_id WHERE o.occurrence_id=NEW.occurrence_id
 AND e.project_ref=o.project_ref AND e.revision=o.revision AND e.kind=o.kind AND e.topic=o.topic AND e.observed_at=o.observed_at
 AND NOT EXISTS(SELECT 1 FROM assistance_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision)
 AND NEW.recorded_at>=o.start_at AND NEW.recorded_at+10000<min(o.deadline,o.token_expires_at,o.server_deadline,coalesce(NEW.lease_expires_at,9007199254740991))
 AND NEW.observation_revision=o.configuration_revision AND NEW.observation_at<=NEW.recorded_at AND NEW.recorded_at-NEW.observation_at<=30000)
 THEN RAISE(ABORT,'Occurrence denied') END;
 SELECT CASE WHEN NOT (
 (NEW.sequence=0 AND NEW.phase='preflight' AND NEW.state='started' AND NEW.attempts=0 AND NEW.controls=1 AND NEW.run_id IS NULL
 AND NOT EXISTS(SELECT 1 FROM assistance_occurrence_journal WHERE occurrence_id=NEW.occurrence_id))
 OR EXISTS(SELECT 1 FROM assistance_occurrence_journal p WHERE p.occurrence_id=NEW.occurrence_id
 AND p.sequence=NEW.sequence-1 AND p.sequence=(SELECT max(sequence) FROM assistance_occurrence_journal WHERE occurrence_id=NEW.occurrence_id)
 AND p.state NOT IN ('completed','stopped') AND NEW.recorded_at>=p.recorded_at
 AND (
 (NEW.state='stopped' AND NEW.phase=p.phase AND NEW.attempts=p.attempts AND NEW.controls=p.controls+1 AND NEW.run_id IS p.run_id AND NEW.lease_expires_at IS p.lease_expires_at)
 OR (NEW.state='attempted' AND NEW.attempts=p.attempts+1 AND NEW.run_id IS p.run_id AND NEW.lease_expires_at IS p.lease_expires_at AND (
 (p.state='started' AND NEW.phase='list' AND NEW.controls=p.controls)
 OR (p.state='consumed' AND p.phase='list' AND NEW.phase='claim' AND NEW.controls=p.controls+1)
 OR (p.state='consumed' AND p.phase='claim' AND NEW.phase='finish' AND NEW.controls=p.controls+1)))
 OR (p.state='attempted' AND NEW.phase=p.phase AND NEW.attempts=p.attempts AND NEW.controls=p.controls AND (
 (NEW.state='consumed' AND NEW.phase='list' AND NEW.run_id IS NULL)
 OR (NEW.state='consumed' AND NEW.phase='claim' AND NEW.run_id IS NOT NULL AND NEW.lease_expires_at<=NEW.recorded_at+300000)
 OR (NEW.state='completed' AND NEW.phase='finish' AND NEW.run_id=p.run_id AND NEW.lease_expires_at=p.lease_expires_at)))
 ))) THEN RAISE(ABORT,'Occurrence denied') END;
END;
CREATE TRIGGER IF NOT EXISTS assistance_occurrences_no_update BEFORE UPDATE ON assistance_occurrences BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER IF NOT EXISTS assistance_occurrences_no_delete BEFORE DELETE ON assistance_occurrences BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER IF NOT EXISTS assistance_occurrence_journal_no_update BEFORE UPDATE ON assistance_occurrence_journal BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
CREATE TRIGGER IF NOT EXISTS assistance_occurrence_journal_no_delete BEFORE DELETE ON assistance_occurrence_journal BEGIN
 SELECT RAISE(ABORT,'Immutable occurrence');
END;
