# Fixed private withdrawal host — 29 October 2026

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT source/CI only; ORIGIN GitHub; RESOURCE_TYPE branch/PR/Actions; RESOURCE_ID feat/private-withdrawal-host-20261029; ALLOWED_ACTION tests, source, review and merge; ROLLBACK revert source. No remote deployment, flag, permission or Container changes.

Expose the PR636 reduction factory through a no-argument private AfwOwnEventNode RPC. No public fetch or MCP operation is added. AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED must be exactly true; its separate JSON policy is absent/default-closed in existing environments.

The host resolves the existing historical event policy and exact named DO itself. Its policy pins purpose, request UUID, original monitoring consent, actual source revision/program hash/container and an administrative window of at most ten minutes. Consent must belong inside the original event window. The administrative window cannot precede the original event or finish more than ten minutes after it. This is explicit limited reduction authority, not a new or extended read grant.

The source, namespace/methods, DB/methods, ctx/id/storage, original policy and new flag/policy are snapshotted and rechecked before and after awaits through the core clock. The close callback is built only by the Worker from #host(true), never from RPC arguments. Signal and policy are checked around that historical close. No launch operation is available through this path.

The overall host invocation is bounded to 30 seconds and the configured expiry. The reduction factory receives that shortened deadline so SQL writes also respect it. Disabling/changing the server policy during a call denies continuation and cannot become a success receipt. No claim of provider cancellation.

Tests: RED fixed-host and native private-RPC checks; GREEN strict identity/source/config drift/expiry tests plus a positive workerd D1/DO host composition and restart; full CI and one independent review. Remote publication and a separate Workflow reduce-and-restore adapter are subsequent blocks. Native unsubscribe, physical stop, useful delivery, PC-off and pilot readiness remain unverified.
