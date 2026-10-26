# AFW manual public provider check in GitHub Actions

2026-10-26. Execution preference: cloud, minimal owner-PC resources. Existing Codex AFW environment confirmed running/connected/restricted/enforced at22:56UTC but exact www.cloudflarestatus.com was absent: no Node or HTTP executed and no permission changed. A manual read-only Actions job can use the reviewed source without asking for a wider Codex network policy or a new private credential.

Outcome: one manual workflow_dispatch on main of the exact AFW repository checks only the two fixed official public sources through checkOwnCronProvider, prebuilt-closed-publication profile. No inputs, schedule, deployment, environment secret, OAuth, Container, Workflow instance, mail, Max or event consumer. Permissions contents:read; checkout exact run SHA with credentials not persisted; Node built-ins only, no npm install/build/cache. Job bounded two minutes, inner check original5s/262144bytes/at most2requests. Fixed concurrency queues, never cancels an in-flight diagnostic.

Store only sanitized result.json with exact source revision/tree/run ID and public provider receipt, seven-day retention. A green job means the read-only check completed, including blocked or unknown; operationalReadiness must remain false. Resolution permits only preparing a future closed verification, never opening resources. This is GitHub Actions execution, not Codex cloud guard, event subscription or PC-off acceptance. No recurring monitor.

Validation: inspect exact workflow source/repo/ref/permissions/provenance/output, required CI, one branch review/fix pass, merge, then ONE manual run and qualify result artifact against run/head/hash. Do not create another run merely because gate is blocked. No new runtime mutation.
