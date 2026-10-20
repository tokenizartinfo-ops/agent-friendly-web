-- Source candidate only: NOT an installed migration. No remote schema operation authorized.
CREATE TABLE IF NOT EXISTS delegated_preparation_consents (
 handle_hash TEXT PRIMARY KEY NOT NULL CHECK(length(handle_hash)=64),
 request_hash TEXT NOT NULL CHECK(length(request_hash)=64),
 profile_id TEXT NOT NULL CHECK(profile_id='afw.preparation-consent.v1'),
 user_id TEXT NOT NULL,
 client_id TEXT NOT NULL,
 project_id TEXT NOT NULL,
 resource TEXT NOT NULL,
 grant_id TEXT NOT NULL UNIQUE,
 requested_scopes_json TEXT NOT NULL CHECK(requested_scopes_json IN ('["afw:project:read"]','["afw:project:read","afw:capsule:prepare"]')),
 transaction_started_at INTEGER NOT NULL CHECK(transaction_started_at>=0),
 transaction_expires_at INTEGER NOT NULL CHECK(transaction_expires_at>transaction_started_at AND transaction_expires_at-transaction_started_at<=600000),
 trial_started_at INTEGER NOT NULL CHECK(trial_started_at>=0),
 trial_expires_at INTEGER NOT NULL CHECK(trial_expires_at>trial_started_at AND trial_expires_at-trial_started_at<=600000),
 source_revision INTEGER NOT NULL CHECK(source_revision>0),
 site_id TEXT NOT NULL,
 website TEXT NOT NULL,
 hostname TEXT NOT NULL,
 canonical_origin TEXT NOT NULL,
 claim_id TEXT NOT NULL,
 claim_verified_at TEXT NOT NULL,
 state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','reserved','admitted','cancelled')),
 decision TEXT NOT NULL DEFAULT '' CHECK(decision IN ('','read','drafts','cancel')),
 choice_nonce TEXT NOT NULL DEFAULT '',
 choice_at INTEGER NOT NULL DEFAULT 0,
 expires_at INTEGER NOT NULL DEFAULT 0,
 grant_created_iso TEXT NOT NULL DEFAULT '',
 grant_expires_iso TEXT NOT NULL DEFAULT '',
 CHECK(transaction_started_at>=trial_started_at AND transaction_started_at<trial_expires_at),
 CHECK(decision<>'drafts' OR requested_scopes_json='["afw:project:read","afw:capsule:prepare"]'),
 CHECK(
  (state='pending' AND decision='' AND choice_nonce='' AND choice_at=0 AND expires_at=0 AND grant_created_iso='' AND grant_expires_iso='') OR
  (state IN ('reserved','admitted') AND decision IN ('read','drafts') AND length(choice_nonce)=36
   AND choice_at>=transaction_started_at AND choice_at<transaction_expires_at AND choice_at<trial_expires_at
   AND expires_at>choice_at AND expires_at<=transaction_expires_at AND expires_at<=trial_expires_at AND expires_at-choice_at<=600000
   AND length(grant_created_iso)=24 AND length(grant_expires_iso)=24) OR
  (state='cancelled' AND decision IN ('read','drafts','cancel') AND length(choice_nonce)=36 AND choice_at>=transaction_started_at)
 )
);
--> statement-breakpoint
CREATE TRIGGER IF NOT EXISTS delegated_preparation_consents_immutable
BEFORE UPDATE ON delegated_preparation_consents
WHEN NEW.handle_hash IS NOT OLD.handle_hash
 OR NEW.request_hash IS NOT OLD.request_hash
 OR NEW.profile_id IS NOT OLD.profile_id
 OR NEW.user_id IS NOT OLD.user_id
 OR NEW.client_id IS NOT OLD.client_id
 OR NEW.project_id IS NOT OLD.project_id
 OR NEW.resource IS NOT OLD.resource
 OR NEW.grant_id IS NOT OLD.grant_id
 OR NEW.requested_scopes_json IS NOT OLD.requested_scopes_json
 OR NEW.transaction_started_at IS NOT OLD.transaction_started_at
 OR NEW.transaction_expires_at IS NOT OLD.transaction_expires_at
 OR NEW.trial_started_at IS NOT OLD.trial_started_at
 OR NEW.trial_expires_at IS NOT OLD.trial_expires_at
 OR NEW.source_revision IS NOT OLD.source_revision
 OR NEW.site_id IS NOT OLD.site_id
 OR NEW.website IS NOT OLD.website
 OR NEW.hostname IS NOT OLD.hostname
 OR NEW.canonical_origin IS NOT OLD.canonical_origin
 OR NEW.claim_id IS NOT OLD.claim_id
 OR NEW.claim_verified_at IS NOT OLD.claim_verified_at
 OR NOT ((OLD.state='pending' AND NEW.state='reserved') OR
  (OLD.state='pending' AND NEW.state='cancelled' AND NEW.decision='cancel') OR
  (OLD.state='reserved' AND NEW.state IN ('admitted','cancelled')))
 OR (OLD.state='reserved' AND (NEW.decision IS NOT OLD.decision OR NEW.choice_nonce IS NOT OLD.choice_nonce OR NEW.choice_at IS NOT OLD.choice_at OR NEW.expires_at IS NOT OLD.expires_at OR NEW.grant_created_iso IS NOT OLD.grant_created_iso OR NEW.grant_expires_iso IS NOT OLD.grant_expires_iso))
BEGIN SELECT RAISE(ABORT,'Preparation consent identity/decision is immutable'); END;
--> statement-breakpoint
CREATE TRIGGER IF NOT EXISTS delegated_preparation_consents_grant
AFTER UPDATE OF state ON delegated_preparation_consents
WHEN OLD.state='reserved' AND NEW.state='admitted'
BEGIN
 INSERT INTO delegated_access_grants
 (id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at)
 VALUES(NEW.grant_id,NEW.user_id,NEW.client_id,NEW.project_id,NEW.resource,
  CASE NEW.decision WHEN 'read' THEN '["afw:project:read"]' ELSE '["afw:project:read","afw:capsule:prepare"]' END,
  NEW.grant_created_iso,NEW.grant_expires_iso,'','');
END;
--> statement-breakpoint
CREATE TRIGGER IF NOT EXISTS delegated_preparation_consents_no_delete
BEFORE DELETE ON delegated_preparation_consents
BEGIN SELECT RAISE(ABORT,'Preparation consent history is retained'); END;
