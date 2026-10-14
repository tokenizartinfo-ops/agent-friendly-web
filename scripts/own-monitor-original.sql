-- Read-only operator input for prepare-own-monitor-original.mjs.
-- Bind the original grant ID privately; use only the verified own canary D1.
-- Whole-database totals are intentional: a different grant cannot reset this
-- single-attempt namespace. This snapshot is not runtime authorization.
SELECT g.id, g.user_id, g.project_id, g.client_id, g.resource,
       g.scopes_json, g.created_at, g.expires_at, g.revoked_at,
       (SELECT COUNT(*) FROM dossier_node_process_admissions) AS original_admissions,
       (SELECT COUNT(*) FROM dossier_node_process_closures) AS original_closures,
       (SELECT COUNT(*) FROM dossier_event_subscription_receipts) AS original_receipts
FROM delegated_access_grants g
WHERE g.id = ?;
