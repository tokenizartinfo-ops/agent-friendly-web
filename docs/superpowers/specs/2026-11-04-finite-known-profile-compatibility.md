# Fixed finite candidate compatibility through Known cancellation

4 November 2026. SOURCE DESIGN ONLY; root review/activation required before the held implementer resumes. No product edit, test, build, workflow dispatch or runtime operation occurred in this design task.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT isolated GitHub documentation branch; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE source compatibility design; RESOURCE_ID qaLive/canaryLive and fixed release pipeline; ALLOWED_ACTION documentation only. Source baseline bd923bab7225212e35e054b14c132de78195ec5e, tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Rollback this documentation ref to that parent; prospective implementation rollback is reverting the source unit before any separately authorized promotion.

Amends the original finite-request-signal-opt-in spec/plan at aed54dab23b644481aed01cf6b5b94249ecf9f23 and implements the [root hash compatibility ruling at 5560af6f](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/5560af6f44ec7fe7a81c52b6fa7a608b41f5bbf1/docs/superpowers/specs/2026-11-04-finite-signal-hash-compatibility-ruling.md). The [technical checkpoint at 3fb1751c](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/3fb1751c901059c9acdb2a9f1de2f6470b9f3c41/docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in-checkpoint.md) is subsequent documentation, not inspected product source.

## Decision and smallest next task

Implement one bounded compatibility unit with three separately reviewable source checkpoints: strict fixed candidate primitives; shared Known lifecycle adapters; finite consumer/role integration and final qualification. The smallest useful next source task is checkpoint 1. A hash-only change is an independently testable prerequisite, not a completed opt-in fix. Checkpoints 2 and 3 are necessary before candidate lifecycle qualification. No generic configuration framework or new business stage is introduced.

Keep all existing legacy exports and old-pair positive lifecycle coverage. Add fixed finite exports only where modules need a distinct callable boundary. Internally share existing algorithms and structural checks; select an immutable module-owned legacy or finite strategy only inside private implementations. No exported core/factory accepts a strategy, profile, hash, validator, operation override or callback for choosing compatibility. No environment variable, DTO, successful-validation probe or flag-array inspection chooses a role.

QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Array order remains exact. M candidate activation hashing uses all actual flags. Historical M remains exactly ["nodejs_compat","global_fetch_strictly_public"], with identical canonicalization and digest. Neither hash accepts the other profile; no normalization. QA configuration continues its existing QA/static fingerprint rules; the new activation hash is specifically M, not a QA hasher.

## Fixed interfaces

Existing input/result shapes below mean the exact shapes and error/outcome behavior at the pinned source, not newly extensible DTOs.

| Module | Added fixed export | Contract |
| --- | --- | --- |
| lib/mcp-activation-observer.mjs | finiteActivationConfigurationHash(value) -> string | Same seven configuration fields, structural/plain-data/execution/binding/size checks and SHA-256 canonical algorithm as activationConfigurationHash; exact new M triple only. |
| same | createFiniteActivationObserver({versionId,deploymentId,namespaceId,applicationId,configuration,readCredential,fetchImpl=globalThis.fetch}={}) -> async (input,signal) -> observation | Same observer interface/result as createActivationObserver. Candidate validation applies both before any request and to observed metadata. Existing fixed readers, target validation, bytes, bracketed deployment, 5s clock and cancellation stay unchanged. |
| lib/mcp-release-operator-policy.mjs | validateFiniteReleaseOperatorBundle(bundle) -> true | Fixed confirm_named only; all existing artifact, target, hash, plan, manifest, identity and window checks using finiteActivationConfigurationHash. Reject publish and confirm. Throws same sanitized policy error. |
| same | resolveFiniteNamedActivationPlan(bundle,namespace) -> frozen {plan,current} | Same pure identity resolution and drift checks as legacy; calls finite validation, never namespace.get or a business effect. |
| same | validateFiniteNamedCancellationHistory(bundle,raw) -> true | Same complete history/grant correlation, using finite bundle validation. No authorization created. |
| lib/mcp-release-successor-reservation.mjs | reserveFiniteReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl=globalThis.fetch,now=Date.now,signal,observation,authorize,cancellationHistory}={}) -> Promise<existing reservation result> | Shared existing reservation body, with fixed finite bundle/resolver/history functions. Preserves retirement provider/custody checks, atomic INSERT, exact-own-row logic and finite gate. No new options or authority. |
| lib/mcp-release-runtime.mjs | runFiniteKnownCancellationReleaseWorkflow(options) -> Promise<existing Known outcome> | options remains exact own-data {bundle,env,event,step}; fixed confirm_named candidate path; no fifth argument. Same original event, private request lease, primary snapshots, eligibility closure, hooks, clocks and terminal outcomes. |

Keep activationConfigurationHash, createActivationObserver, validateReleaseOperatorBundle, resolveNamedActivationPlan, validateNamedCancellationHistory, reserveReleaseSuccessor, runKnownCancellationReleaseWorkflow, runReleaseWorkflow and runReleaseOperator unchanged in callable contract and strict legacy behavior. In particular, generic legacy publish/confirm semantics remain.

Implement shared PRIVATE bodies in those same existing files. The activation snapshot/hash/observer body receives only module-owned fixed flag selection; policy bodies receive a module-owned fixed hash selection and fixed operation restriction; reservation body receives only its local fixed validator/resolver/history selection. Runtime defines its own frozen LEGACY_RELEASE and FINITE_RELEASE selections referencing the appropriate fixed exports. Private runKnownCancellationReleaseWorkflowImpl(profile,options), runReleaseWorkflowImpl(profile,options) and runReleaseOperatorImpl(profile,bundle,env,args,lease,observation,authorize,cancellationHistory) contain the current bodies. Existing public functions pass LEGACY_RELEASE; the one new public Known function passes FINITE_RELEASE. Pass the same private selection through every nested call. Do not export runFiniteReleaseWorkflow, runFiniteReleaseOperator, a strategy object, lease mint, registry or configurable helper.

The current knownRequestLeases WeakSet, creation before first await and removal on settlement remain private and shared with the existing mechanism. Do not replace the lease by a serializable profile/approval token. Fixed finite reservation is necessary because its module independently revalidates bundle, history and named identity. Fixed finite observer is necessary because it independently validates both approved and actual provider configuration. A wrapper around legacy validation alone cannot work.

## Exact consumer map at pinned source

| Source and line anchor | Required selection |
| --- | --- |
| mcp-qa-finite-initial-owner-source:138 | New candidate hash for initialBaseline.configurationHash. |
| mcp-qa-finite-preparation-cleanup:39 | New candidate hash for capsule/initial baseline correlation. |
| mcp-qa-finite-policy-setup:74,91 | New candidate hash for baseline receipt and expectedFull.activationHash. |
| mcp-qa-finite-policy-setup:75 | KEEP legacy validateReleaseOperatorBundle for configuration-free publish artifact validation; do not alias the entire import. |
| mcp-qa-finite-policy-transport:31,69,109,166 | Candidate configuration validation/hash for phase baseline, Plan correlation and wire. |
| mcp-qa-finite-policy-transport:160-164 | Existing private closed=false role is candidate/current; closed=true is historical rollback. Validate BOTH returned metadata and expected pin under that exact role. |
| mcp-qa-finite-policy-transport:222 | Fixed finite resolver and history validation after installation. |
| mcp-qa-finite-preparation-records:120 | Replace undifferentiated [baseline,rollback] activation validation: baseline uses finite; rollback uses legacy. Keep restoration hash and record schema/digests. |
| mcp-qa-finite-profile:56 | canaryLive privateFull.activationAlgorithm becomes exact string "finiteActivationConfigurationHash"; qaLive remains null. |
| mcp-qa-finite-confirmation:55,73 | Fixed finite bundle validator, then runFiniteKnownCancellationReleaseWorkflow with the same env/event/step identities and exactly four keys. |
| mcp-release-runtime:174,181,243,262 | Selected Known bundle/resolver/history and private Workflow body. |
| mcp-release-runtime:95,101,132 | Selected Workflow bundle/history and private Operator body. |
| mcp-release-runtime:48,50,57,74,81 | Selected Operator bundle/history/resolver/observer/reservation. |
| mcp-release-successor-reservation:14,16,20 | Selected bundle/history/resolver in shared reservation body. |

All module paths in the table are under lib/ with .mjs suffix. Line numbers are source anchors, not future diff line numbers. Scoped inventory41925030772/job126907057963 plus41925236121/job126907778764 and inspected imports establish this map. Recheck only these symbols and direct changed consumers before source edits; do not rescan the entire vault.

For transport, keep configuration(value) candidate-only. Add private historicalConfiguration(value) using the legacy hash after the same seven-field projection; share a private projection helper if useful. readVersion(pin,lease,closed=false) chooses those fixed functions from its pre-existing internal role, then compares both same-role activation hashes. The historical branch must never call candidate configuration() first. Wire is always candidate. Do not infer closed from flags; existing readVersion(rollback,c,true) is the historical caller. Keep qualifyFiniteWorkerVersion's exact restoration pin/module comparison and basiccompatibility check unchanged.

For SetupContext, explicitly validate baseline and rollback by property name rather than order/probing. The stored schema and hash domains do not change; old sealed records are not migrated or rewritten. Historical pins and their module/configuration checks remain independent. Structural activation validation is not a substitute for exact historical source/pin qualification.

## Preserved invariants

- All18 Known hooks: workflow_admission; operator_credential; operator_primary_read; operator_primary_result; activation_before_read; activation_after_read; activation_before_attempt; activation_after_attempt; activation_before_receipt; activation_after_receipt; activation_before_acceptance; activation_complete; successor_rpc; successor_rpc_complete; successor_before_retirement; successor_after_retirement; successor_before_write; successor_after_write.
- Original event.timestamp+70000 parent ceiling, source window, monotonic narrowing, hydration/primary/provider/retirement5s children and activation20s child. No fresh parent, Date.now offset, replacement budget, retry, cancellation RPC or deadline-only substitute.
- Two matching first-primary snapshots, current exact grant and monitoring consent, complete unfiltered cancellation history, original identity and namespace drift checks, non-reentrant authorization, original one-use/no-replay semantics.
- Actual native admission/cancellation/retention remain: sender503 is not physical completion; retained read/fetch/body/cancellation stays occupied through actual settlement. No production bridge/receiver/retention algorithm edit.
- Existing RELEASE_TARGET, fixed URLs/resource scope and guarded effect order remain. No general outbound, new approval/token/DTO authority, provider write, Entry/DDL/permission/credential/OAuth/OTP/cron/Max, new native mount, producer or other-project changes.
- Three mutable phase settings and all physical/secret bindings unchanged. Full prearm and closed_ui/read_consent/notice_consent keep exact candidate flags.
- lib/mcp-qa-finite-historical-source.mjs, lib/mcp-qa-cloud-closed-pins.mjs, worker/independent-closure/closed-rollback.mjs, worker/mcp-own/closed-rollback.mjs and original2607/c570 configuration artifacts/pins remain byte-identical to aed54dab and the inspected baseline.
- Source ceiling2026-11-03T02:59:00Z remains expired. operationalReadiness=false; completePackage=false; PCoff=false. No reset or use of the reserved occurrence.

## Qualification without removing legacy coverage

Keep existing positive native legacy builder/Known/Workflow/Operator/observer/reservation tests under original profiles and hashes. Update source-anchor-only instrumentation and exact exported-name assertions only for the fixed addition; keep their semantic assertions. Never turn legacy success cases into blocked/pending tests, replace all legacy fixtures with the new triple, or claim rejection-only tests preserve behavior.

Add a parallel fixed finite native test fixture using a test-only WorkflowEntrypoint that directly forwards {bundle,env:this.env,event,step} to the actual runFiniteKnownCancellationReleaseWorkflow. Reuse the existing isolated D1/native Workflow/retirement rehearsal privately, with a separately named finite fixture entry that fixes candidate flags/hash and QA/M runtime flags; no production builder or mount changes. It may reuse the existing test build callback seam; no production hash/validator/authorizer substitution. The finite test-only wrapper is explicit synthetic qualification, not a new runtime mount. The existing legacy buildMcpReleaseOperator continues to produce and positively qualify the historical path.

The finite fixture must reach confirmed, one attempt/receipt/acceptance and one prepared reservation with mayBoot=false, unchanged immutable history, exact grant and all18 hook witness. Its event is an actual native Date with original ID/payload; primary reads use actual isolated D1. Provider/custody replies remain SYN. Also test missing/expired current grant, foreign identity, extra cancellation, queue/projection expiry before credentials/provider/journals; revocation pre/post INSERT; foreign reservation race; lost acknowledgement; late outer settlement and restart without a second effect. Reuse shared test scenario definitions where practical, retaining distinct legacy/finite case names.

The finite confirmation wrapper's existing source-spy test qualifies exact four-key/identity handoff to the new fixed function and candidate bundle validation. The real readPrivateQaFiniteConfirmationMaterial still intentionally returns unavailable. Its negative test must remain. A positive isolated Known lifecycle plus synthetic source handoff does not claim a mounted, complete finite lifecycle or package. No source provider replacement is allowed in product.

The existing actual sender-FIRST native opt-in evidence41922611657/job126898694059 and strengthened retention41923415932/job126901464107 are preserved; no duplicate flag experiment. Rerun affected boundary cases at final source as regression only. Positive native evidence is not final compatibility acceptance until the new consumers pass.

Relevant hash/observer/policy/role tests must cover old/new cross-rejection, missing/extra/wrong/reordered flags, exact date, legacy golden digest, candidate digest independently computed from actual flags, non-mutation, secret/accessor rejection, valid private binding changes changing the full digest while public projection stays stable, and mixed rollback role swaps rejecting before mutation. Historical files/pins are compared by blob identity.

One final actual compileFiniteNativeStaging at the implementation codeHEAD must preserve file/template equality, original2MiB M/3MiB QA limits, exact finite entry exports, source-before/after, bootstrap source and candidate residency guards. Existing closed package failure is expected; legacy index build cannot substitute. Report exact HEAD/tree/modulebytes/hashes and distinguish codeHEAD from later reportHEAD.

## Open factual checks, not design choices

Runtime behavior and final byte budget are not established by this document. The checkpoint initial-upload native group had a timeout after52 subtests; it is unresolved, not a passing assertion suite or proof of a product defect. Isolate the affected file and record terminal results; diagnose it before claiming that acceptance, without increasing product clocks or converting success to pending. The C2 producer/material source remains unavailable and is outside this unit. No human design choice is needed for the fixed compatibility path; root must review and activate the held source work.
