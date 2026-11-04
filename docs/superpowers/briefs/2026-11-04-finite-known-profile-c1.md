# Checkpoint 1 brief — fixed finite candidate primitives

Read this first: implement ONLY Checkpoint1 below. The parent signal opt-in task remains incomplete, and lifecycle/finite consumer checkpoints2/3 are NOT assigned here. Source baseline is the containing activation commit supplied by root; original inspected code is bd923bab and checkpoint report3fb1751c. No product writer runs concurrently. GitHub source and credential-free Actions only, expected-head CAS on feat/finite-native-cleanup-20261101. No local clone/build/dependencies or remote effects.

## Global Constraints

- Inspected source bd923bab7225212e35e054b14c132de78195ec5e / tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Before source work, verify actual feature head; a later docs-only head may differ. Do not attribute this design's source observations to a moving branch.
- QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Legacy M pair and digests unchanged.
- No exported strategy/hash callback, old-or-new fallback, compatibility normalization, new approval/token/DTO authority, native mount or business producer.
- All18 hooks, exact primary grant/history/identity, original70s parent, existing5s/20s children, actual cancellation/retention and one-use/no-replay semantics remain.
- Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
- No provider/runtime writes, Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max, new budget, generic outbound, other-project work or reserved occurrence consumption.
- Historic2607/c570 modules/configurations and QA_CLOUD_CLOSED_PINS byte-identical. No old sealed record/Plan/capsule rewrite.
- All verification below runs in authorized credential-free cloud source CI; no local clones/builds/dependencies. Reuse the held implementer's qualifier, restore its own scoped source test stages as needed, and remove it before delivery. No dispatch or test was performed while writing this plan.


## Checkpoint1: Strict fixed candidate primitives

**Files**
- Modify lib/mcp-activation-observer.mjs.
- Modify lib/mcp-release-operator-policy.mjs.
- Create test/mcp-finite-activation-compatibility.test.mjs.
- Create test/mcp-finite-named-activation.test.mjs.
- Preserve/run test/mcp-activation-observer.test.mjs and test/mcp-named-activation.test.mjs.

**Interfaces produced**
- finiteActivationConfigurationHash(value) -> string.
- createFiniteActivationObserver(options={}) -> async (input,signal) -> existing observation.
- validateFiniteReleaseOperatorBundle(bundle) -> true, confirm_named only.
- resolveFiniteNamedActivationPlan(bundle,namespace) -> frozen {plan,current}.
- validateFiniteNamedCancellationHistory(bundle,raw) -> true.
- Exact option fields/results and fixed flag arrays are defined in the spec; no optional profile field.

- [ ] Add failing cases named legacy_pair_digest_and_positive_observer_preserved, finite_triple_hashes_actual_flags, profiles_reject_each_other, exact_flags_date_and_plain_data, finite_observer_checks_approved_and_observed_profile, finite_named_plan_and_history_positive, finite_bundle_requires_confirm_named, finite_private_binding_and_current_grant_correlated. Use the existing legacy fixtures as unchanged originals; build a separate candidate copy before hashing. Independently compute the canonical SHA-256 expected value from a fixed literal seven-field fixture with sorted bindings and actual flags. Record the legacy golden from the old implementation before refactoring and require exact equality afterwards. Assert input not mutated; reject old/new cross-use, missing/extra/wrong/reordered flags/date, accessor without invocation and secret content.
- [ ] In cloud run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs; expect missing fixed exports/candidate rejection RED. Preserve that causal result, not a harness timeout.
- [ ] Extract private snapshot/hash/observer bodies with module-owned exact flag selection; keep the canonical function and all existing validation byte-for-byte in meaning. Add the two fixed activation exports. Approved configuration and observed metadata use the same selected hash. No new exported implementation.
- [ ] Extract private policy bundle/resolver/history bodies. Existing exports use old hash and existing operation range. New finite exports use the candidate hash and require confirm_named before nested manifest validation. Keep current target, artifact size/hash, exact fields, named bindings, identity, scope, window and current-grant checks.
- [ ] Run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs test/mcp-activation-observer.test.mjs test/mcp-named-activation.test.mjs. Expect all selected assertions PASS, zero skips/cancellations. Run lint before the checkpoint acceptance; retain existing warnings.
- [ ] Commit the strict primitive unit with exact CI head/run/job/attempt. Stop for its source review checkpoint. This is a prerequisite only; do not report the finite path fixed.


## Binding fixed interfaces (future entries shown for compatibility context only)

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


## Evidence and handoff

Write full task report to docs/superpowers/reports/2026-11-04-finite-known-profile-c1.md. Include exact BASE/code/report HEAD, causal RED and GREEN commands/run/job/attempt/counts/warnings, legacy golden digest and cross-profile rejection, actual-versus-SYN boundaries. Do not re-run the previous native signal opt-in experiment or accepted old units. A scoped temporary push-path qualifier may be created; remove your qualifier before delivery. Leave the parent's existing opt-in qualifier unchanged. No self-acceptance or reviewer dispatch; root sends a fresh task reviewer. Return status, commits, one-line tests, concerns. Stop source writes at this checkpoint's report; root chains later checkpoints after review.
