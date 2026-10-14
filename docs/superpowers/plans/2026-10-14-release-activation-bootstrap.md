# Release activation bootstrap implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Do not deploy from this plan.

**Goal:** Make the approved release-to-activation sequence executable without embedding provider-generated future IDs in immutable Worker configuration.

**Architecture:** Preserve the closed code publication journal. Add a separate operator-owned activation receipt, keyed before publication and filled only after verified provider observations. Runtime resolves that receipt from primary D1 and verifies the exact active version/deployment; it cannot write receipts or publish.

**Tech Stack:** Existing ESM, Workers, D1, Node test runner and Miniflare; no new dependencies.

**Spec:** docs/AFW-RELEASE-ACTIVATION-2026-10-14.es.md.

## Global constraints

- AFW delegated-canary only. No remote operations, consent, cron, customer data or new credentials in this implementation phase.
- Preserve closed publication attempts/receipts and consumed original process history.
- Never accept caller-supplied deployment evidence or infer source equivalence from a Worker name.
- Fail closed if receipts, primary acknowledgements, configuration or provider observations are unavailable.
- Existing withdrawal and historical close must remain independent of activation receipt availability.

## Review focus

- Configuration changes create new versions; test real sequencing, not predetermined matching IDs.
- Same bytes with different configuration must require distinct approved activation evidence.
- A lost publication response cannot be retried simply by changing the activation key.
- Drift between provider reads must prevent runtime launch.
- Configuration digests must not contain their own digest or provider-generated IDs, and must never log secrets.

### Task 1: Reproduce full sequence and finalize receipt contract

- [ ] Extend test/mcp-publication-journal.test.mjs and test/mcp-successor-host.test.mjs with a provider fixture assigning version IDs only after upload and deployment IDs only after deployment; config modifications create another version.
- [ ] Make expected complete bounded sequence fail against current source; preserve negative tests for changed deployment/version.
- [ ] Specify activation key, approved non-secret configuration digest, trial/scope binding, original artifact reference and immutable provider receipt fields. Define secret inheritance provenance separately; do not hash exposed secret values.
- [ ] Verify no remaining self-reference in version, artifact, policy, digest or deployment identity.

### Task 2: Operator activation evidence and primary persistence

- [ ] Add db/dossier-activation-receipt.sql with immutable attempt/receipt records, bounded uniqueness per approved trial/configuration and foreign reference to original publication. Do not change historical table semantics.
- [ ] Add lib/mcp-activation-journal.mjs: fixed operator plan, first primary ACK, bounded operation, no retry on unknown result, authoritative config and bytes readback before receipt.
- [ ] Add test/mcp-activation-journal.test.mjs: unknown ACK, changed config, wrong code, wrong account/namespace, expired plan, concurrency, no duplicate side effects.
- [ ] Reuse mcp-publication-artifact-reader for exact bytes; implement actual bounded provider adapter alongside journal, not only an unmounted trusted callback. Never give write credentials to runtime.

### Task 3: Runtime reads activation outside versioned config

- [ ] Change lib/mcp-own-successor-host.mjs publication policy to a preassigned activation reference instead of future deploymentId.
- [ ] Change lib/mcp-publication-deployment-reader.mjs to join original code provenance and approved activation receipt, then call the existing exact deployment reader with receipt-derived version/etag/deployment IDs.
- [ ] Keep lib/mcp-successor-deployment-reader.mjs exact version/deployment and two-read drift checks. Do not select arbitrary latest version to bypass the mismatch.
- [ ] Extend concrete Worker tests: valid end-to-end sequence, no receipt/no launch, mismatched code/config/actor, withdrawal during await and historical close with missing candidate evidence.

### Task 4: Installation rehearsal and acceptance

- [ ] Extend test/mcp-own-schema-rehearsal-native.test.mjs for actual new schema, repeat install, preserved history and immutable rows.
- [ ] Update docs/AFW-OWN-SCHEMA-PREPARATION-2026-10-14.es.md and docs/AFW-SUCCESSOR-WORKER-MOUNT-2026-10-14.es.md with corrected order and recovery.
- [ ] Targeted tests, lint, independent review, full CI; merge exact reviewed head. No remote readiness from CI.
- [ ] Only after source acceptance and refreshed provider/recovery/permission checks prepare remote installation. No OTP window until all preparatory gates are satisfied.

## Execution rulings

Ruling: activation publication remains an explicit scoped operator action; this branch verifies and records it with concrete GET adapters instead of implementing another provider writer. This avoids coupling runtime privileges to deployment. Unknown upload ACK still requires reconciliation, never automatic replay. Tests simulate generated IDs and real local persistence; remote publication remains pending.

## Progress

Source sequence, journal, concrete GET observer, runtime join, local schema rehearsal and docs implemented. 25 targeted tests pass; independent review finding (late receipt persistence) reproduced and fixed with SQL time fence and separate acceptance after receipt ACK. Full CI and merge pending. Remote steps remain unchecked. Operator-controlled config publication is deliberately not automated here, per ruling above.
