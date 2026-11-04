# Fenced owner issuer/notice — trust-review correction

4 November 2026. DESIGN ONLY. **Task A INACTIVE; Task B INACTIVE.** This revision corrects an unsupported cross-fetch provenance claim in docs commit2b57be023ab0ae5602dd9f7b962a33401a05d4d7. No product edits, tests/builds, provider/browser/runtime actions or new permission.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE docs branch/file; RESOURCE_ID docs/finite-fenced-owner-issuer-notice-20261104; ALLOWED_ACTION pinned reads and docs-only CAS; ROLLBACK revert this docs revision. Product inspection remains220b5bc323315b7f107967548fb8958c0f8234f2; advancing product branch not followed.

## Concrete finding

The earlier assertion that a later call could be matched ONLY to a surviving M closure by requestId/hash/version/current publication was unsupported. These values are serializable DATA; a deployed reviewed M pointer is not incoming-caller authentication.

Pinned source establishes:

- [Bridge lines11–33](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/mcp-qa-finite-owner-native-bridge.mjs#L11): M captures its local namespace/stub/holder functions and writes five metadata headers. This does not transport that local closure or an authenticated caller identity to QA.
- [Wire lines13–22](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/mcp-qa-finite-owner-native-wire.mjs#L13): checks grammar, UUID shape, original URL and Origin. No caller attestation or SDK-result verification.
- [Receiver lines4–30](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/mcp-qa-finite-owner-native-receiver.mjs#L4): explicitly pending-only; checks its own QA actor/env/DB holders and creates a local lease, then returns pending. No effectful verifier exists.
- [Unit2a store](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/220b5bc323315b7f107967548fb8958c0f8234f2/lib/mcp-qa-finite-preparation-issuer-store.mjs#L109): genuine consume RETURNING and same-instance/same-lease one-use witness protect the original grant SQL. They do not authenticate a new HTTP ingress or prove prior SDK approveConsent.

No exact already-existing native enforcement was identified. Namespace possession is routing capability on its holder; this inspected receiver receives no demonstrated runtime-authenticated M Worker/version/entrypoint/invocation identity. Exclusive binding possession is not established by the current provider pointer. Access verifies the presented owner; ticket/CSRF/source/current fence validate other original facts. They do not prove actual SDK approval or settlement, and this revision does not silently redefine configuration/preparation approval as an independently sufficient replacement owner-consent contract.

## Resolution and inactive dependency

The spec now names **D0: concrete QA-verifiable authentication of the fixed M issuer entry and actual live SDK continuation** as a separate unresolved design dependency. A future design must name an exact native primitive/already-authorized capability, creation/holder/verifier and hostile-call enforcement. No generic callback, new secret/IAM grant, row-derived witness, replacement admission, timer or Entry is proposed or authorized. The alternative of independent QA authorization for every application effect would require its own exact reviewed consent contract; it is not selected.

Task A remains inactive even after first-phase factual context acceptance. Its proposed wire/schema/call sequence is an explicitly conditional sketch. SdkAck outcome is reported: durable ACK/readback proves persistence of submitted data only, never invocation, owner SDK approval, physical settlement, permission, phase eligibility or cleanup. Cross-fetch continuation cannot be recovered from operation rows. Task B inherits the same block.

The original Unit2a fence and genuine consume/barrier identities are reused unchanged. Every actual granting SQL remains behind that fence. Separate permission reduction, Worker restoration and SDK physical settlement remain governed by the [adopted uncertainty ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/bd99808f064fc4d02d0e41cccfb3494a59b55666/docs/superpowers/specs/2026-11-04-sdk-opaque-uncertainty-ruling.md); deployment-writer unknown still forbids restore.

## Required proof, not executed

The spec/plan require real prospective receiver tests: forged read-grant with identical valid owner/form/requestId/mVersionId while actual SDK approval is held; sdk-approve without an SDK closure; forged sdk-completed while real KV settlement is held; cross-entry/restart replay including forgery arriving before first success; and positive control through the actual accepted enforcement primitive. Forged calls must produce no authoritative SDK ACK/ExpectedGrant/consume/grant/phase advancement, and cannot settle the held real promise. A fake verifier or duplicate suppression alone does not pass.

A two-end fixture that trusts its caller supplies a SYN trust assumption even when it uses actual SDK/native KV/D1 code. Existing pending-only denial is a zero-effect baseline, not future authentication proof. Existing isolated fixture CEILING substitution remains explicitly SYN, not actual source eligibility or remote pin adoption. No new test/build was run.

Documents: [spec](../specs/2026-11-04-finite-fenced-owner-issuer-notice.md), [plan](../plans/2026-11-04-finite-fenced-owner-issuer-notice.md). Main missing dependency is now D0 in addition to first-phase factual context. Root must review a concrete resolution before either task is activated. No provider own-SEND continuation, full cleanup/mount, third CLOSED prearm/full T0 setup or PC-off gate is closed. Original clocks/pins unchanged; source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
