# Private administrative preregistration channel

Execute inline with executing-plans/TDD and one final fresh reviewer. Own QA only, standing authorization.

Implement a Cloudflare Workflow invoked through authenticated control-plane instance creation, with exact {operation:"register",recordRef} params. Fixed server configuration supplies pins and an explicit enabled flag. Consumer HTTP remains404. Workflow does not issue challenges, approve/install or reserve resources. One fixed step, retries.limit0, finite timeout, pre/post checks; missing/changed/expired control or uncertain RPC returns unavailable and never repeats. Durable Object preregistration remains immutable and permanently withdrawable; closure history survives.

Add actual exported PrivateQaPreregistration DO and PrivateQaBootstrap Workflow to the existing independent-closure Worker, initially closed. Private register RPC accepts only expected baselineRef; source and approval come exclusively from configured administrator pins. No HTTP register path, no params-supplied pins, no catalog or credentials required. Mount separately from challenge until operator preregistration is observed. Existing IndependentClosure and routes remain unchanged.

RED/GREEN core gates, native workflow/SQLite DO (registration, duplicate/withdrawal and disabled state), proportional full tests/lint/build/review. Then verify Wrangler auth, preserve current deployment/settings/routes and rollback material, deploy closed configuration with added namespace/workflow only, no instances initially. Read authoritative bindings/version/no cron and run one disabled negative Workflow instance, preserve history and read original result. No identity/API keys renewed, Max, active service, scheduler or PCoff. Stop on failed closed rollback/readback.

Ruling: a control-plane Workflow provides an invocable administrative channel without another public admin endpoint/credential. Workflow API authorization does not widen the service consumer's scope. This is a one-off administrative bootstrap, not a cloud manager or guard.

Rollback ruling: a new DO migration may prevent rolling back to an older version without that class. Prepare and deploy a separate closed rollback version first, exporting the same new DO/Workflow classes and preserving namespaces/history. Its Workflow returns unavailable unconditionally and HTTP404. Verify it before deploying the closed candidate; never assume old24932e39 supports the new namespace. Source adapters remain unbound to consumer routes.
