-- SOURCE ONLY. No runtime installation or remote DDL authorization.
CREATE TABLE finite_preparation_issuer_fences (
 preconnection_id TEXT PRIMARY KEY NOT NULL CHECK (length(preconnection_id)=64 AND preconnection_id NOT GLOB '*[^a-f0-9]*'),
 authorization_hash TEXT UNIQUE NOT NULL CHECK (length(authorization_hash)=64 AND authorization_hash NOT GLOB '*[^a-f0-9]*'),
 grant_id TEXT UNIQUE NOT NULL CHECK (length(grant_id)=36 AND substr(grant_id,9,1)='-' AND substr(grant_id,14,1)='-' AND substr(grant_id,19,1)='-' AND substr(grant_id,24,1)='-' AND length(replace(grant_id,'-',''))=32 AND replace(grant_id,'-','') NOT GLOB '*[^a-f0-9]*'),
 enrollment_hash TEXT NOT NULL CHECK (length(enrollment_hash)=64 AND enrollment_hash NOT GLOB '*[^a-f0-9]*'),
 identity_hash TEXT NOT NULL CHECK (length(identity_hash)=64 AND identity_hash NOT GLOB '*[^a-f0-9]*'),
 reserved_at INTEGER NOT NULL CHECK (typeof(reserved_at)='integer' AND reserved_at>=0),
 forward_until INTEGER NOT NULL CHECK (typeof(forward_until)='integer'),
 cleanup_until INTEGER NOT NULL CHECK (typeof(cleanup_until)='integer' AND cleanup_until<=8640000000000000),
 fence_request_id TEXT NULL CHECK (fence_request_id IS NULL OR (length(fence_request_id)=36 AND substr(fence_request_id,9,1)='-' AND substr(fence_request_id,14,1)='-' AND substr(fence_request_id,19,1)='-' AND substr(fence_request_id,24,1)='-' AND length(replace(fence_request_id,'-',''))=32 AND replace(fence_request_id,'-','') NOT GLOB '*[^a-f0-9]*')),
 fenced_at INTEGER NULL CHECK (fenced_at IS NULL OR (typeof(fenced_at)='integer' AND reserved_at<=fenced_at AND fenced_at<cleanup_until)),
 CHECK (reserved_at<forward_until AND forward_until<cleanup_until),
 CHECK ((fence_request_id IS NULL)=(fenced_at IS NULL))
);

CREATE TRIGGER finite_preparation_issuer_fences_no_delete BEFORE DELETE ON finite_preparation_issuer_fences BEGIN SELECT RAISE(ABORT,'issuer fence retained'); END;

CREATE TRIGGER finite_preparation_issuer_fences_immutable_identity BEFORE UPDATE ON finite_preparation_issuer_fences WHEN NEW.preconnection_id IS NOT OLD.preconnection_id OR NEW.authorization_hash IS NOT OLD.authorization_hash OR NEW.grant_id IS NOT OLD.grant_id OR NEW.enrollment_hash IS NOT OLD.enrollment_hash OR NEW.identity_hash IS NOT OLD.identity_hash OR NEW.reserved_at IS NOT OLD.reserved_at OR NEW.forward_until IS NOT OLD.forward_until OR NEW.cleanup_until IS NOT OLD.cleanup_until BEGIN SELECT RAISE(ABORT,'issuer identity immutable'); END;

CREATE TRIGGER finite_preparation_issuer_fences_terminal_fence BEFORE UPDATE ON finite_preparation_issuer_fences WHEN OLD.fenced_at IS NOT NULL AND (NEW.fenced_at IS NOT OLD.fenced_at OR NEW.fence_request_id IS NOT OLD.fence_request_id) BEGIN SELECT RAISE(ABORT,'issuer fence terminal'); END;
