# Private permission reduction and closed restoration — 29 October 2026

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT source/CI only; ORIGIN GitHub; RESOURCE_TYPE branch/PR/Actions; RESOURCE_ID feat/private-reduce-restore-workflow-20261029; ALLOWED_ACTION tests, source, review and merge; ROLLBACK revert source. No live flags, credentials, policy, deployment or trial changes.

Connect the accepted private withdrawal to the existing independent restoration actor through a distinct operation, mcp_canary_reduce_restore. Preserve the old restore-only operation. Default-deny the new path unless AFW_MCP_CLOSURE_REDUCTION_ENABLED is exactly true and AFW_MCP_CLOSURE_REDUCTION_POLICY_HASH matches the expected original withdrawal policy.

Before reduction, qualify primary provider observations of the exact live canary deployment, module/configuration and original withdrawal flag/policy hash, plus the closed operator version/deployment. Recheck deployment pointers immediately before the private RPC. The original Worker receives only a policy hash and shortened absolute deadline, never a grant, target or new permission. It compares its current server policy before constructing authority and propagates the caller deadline through the accepted bounded host/custody path.

Persist an issued-before-effect reduction journal keyed to the restoration and withdrawal hashes. A lost/unknown RPC or journal ACK never causes another reduction RPC. A confirmed reduction can be reused only as historical reduction acknowledgment; restoration still requires its own original custody and physical-stop observations. This does not claim native unsubscribe, provider cancellation, useful delivery or readiness.

The Workflow arms the original absolute plan, waits only to its existing start, performs reduction with zero automatic retries, and attempts restoration only after a confirmed reduction. It returns unavailable/uncertain on partial evidence. Its permission reduction may still be used as containment if native unsubscribe is unknown; it never substitutes for the native-withdrawal acceptance gate.

Validate source through RED/GREEN unit races, native private RPC rejection, the existing actual D1/DO reduction fixture and native Workflow orchestration. One independent review; full CI plus private builds before merge. Remote qualification/publication and an actual one-occurrence trial are subsequent work, not inferred from CI.
