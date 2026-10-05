-- Additive journal. No runtime write route or remote installation implied.
CREATE TABLE IF NOT EXISTS operations_notice_reviews (
 run_id TEXT NOT NULL REFERENCES operations_notice_reservations(run_id),
 review_request_id TEXT PRIMARY KEY,
 sequence INTEGER NOT NULL CHECK(sequence>=1),
 expected_sequence INTEGER NOT NULL CHECK(expected_sequence=sequence-1),
 operator_id TEXT NOT NULL CHECK(length(operator_id) BETWEEN 1 AND 128),
 reviewed_at INTEGER NOT NULL CHECK(reviewed_at>=0),
 decision TEXT NOT NULL,reason TEXT NOT NULL,
 observed_revision INTEGER NOT NULL CHECK(observed_revision>=1),
 observed_condition TEXT NOT NULL,
 UNIQUE(run_id,sequence),
 CHECK((decision='retain_block' AND reason='investigation_required') OR
 (decision='close_obsolete' AND reason IN ('obsolete_revision','producer_paused')) OR
 (decision='close_expired_unconfirmed' AND reason='expired_unconfirmed'))
);
CREATE TRIGGER IF NOT EXISTS operations_notice_reviews_no_update
 BEFORE UPDATE ON operations_notice_reviews BEGIN SELECT RAISE(ABORT,'Immutable notice review'); END;
CREATE TRIGGER IF NOT EXISTS operations_notice_reviews_no_delete
 BEFORE DELETE ON operations_notice_reviews BEGIN SELECT RAISE(ABORT,'Immutable notice review'); END;
