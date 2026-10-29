# Original custody clock observation
Status: source preparation; normal activation/retirement admission remains unchanged.

Observed29Oct21:36UTC: the single named confirmation left1attempt/1receipt/1acceptance, then failed at successor_custody_future. The source compares original native observeRetired.observedAt with the operator's receivedAt. Delta and clock-domain cause are unknown. The consumed plan must not run again.

Add a separate private native Workflow diagnostic that samples exactly TWO original observeRetired RPC responses, records caller before/after and remote observedAt, and reports their signed difference. No credential, provider fetch, direct DB, Container control, reservation, subscription, grant, public HTTP or normal confirmation is available to this diagnostic. It never establishes retirement or readiness. The original actor internally reads its own historical custody; its existing read-only flag and rollback must be handled separately before any real probe.

Policy exact: {startAt,expiresAt,namespaceId,original:{containerId,programHash,sourceRevision}}; original window at most120000ms, actual Workflow creation timestamp bounds the whole attempt to5000ms. Bind payload hash, instance identity, policy, namespace methods, closed competing modes and monotonic clock on every await. Native identity must derive from afw-own-event-one-occurrence-v1; no caller target. Never renew a queued/replayed invocation.

Return only bounded clock samples, policy hash and explicit mayBoot:false/mayReserve:false/mayWrite:false/operationalReadiness:false. Treat a future remote observation as diagnostic data ONLY, not acceptable retirement evidence. Preserve strict future/staleness checks in mcp-retirement-evidence and successor reservation. Dispose every RPC result even on later rejection. Unknown ACK, timeout, changed binding or invalid snapshot is terminal; no retry.

Validate frozen caller time with remote ahead/behind, malformed lifecycle/pins, two reads only, competing modes, expiry/rollback, held native RPC and late disposal, cached result rejection and native Workflow/RPC routing with synthetic data. No live AFW operations in CI.

Ruling: isolated GitHub branch and cloud Actions are the plan workspace/ledger; owner's cloud-first instruction supersedes creating a local checkout or SDD scratch directory. Owner explicitly opted for autonomous inline decisions; no additional design-approval round. One fresh whole-branch review after green verification.
