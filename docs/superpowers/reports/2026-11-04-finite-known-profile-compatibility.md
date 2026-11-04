# Finite Known profile compatibility — design decision

4 November 2026. Documentation only. No product edits, tests, builds, workflow dispatch, provider calls or native mounts.

## Decision

A fixed finite hash alone cannot qualify the candidate. The native Known path revalidates bundle/history at multiple layers and ultimately constructs a legacy activation observer and legacy successor reservation. Add fixed finite counterparts through that complete path, sharing private implementations while preserving strict legacy exports and their positive lifecycle tests.

The smallest next reviewable source task is strict hash/observer/bundle/resolver/history primitives. Then shared private lifecycle adapters, then finite consumer/rollback-role integration. The proposed runtime adds only runFiniteKnownCancellationReleaseWorkflow; finite Workflow and Operator variants stay private. A fixed createFiniteActivationObserver and reserveFiniteReleaseSuccessor are necessary. New finite bundle validation is confirm_named-only; finite setup's existing configuration-free publish validation remains legacy.

- [Spec](../specs/2026-11-04-finite-known-profile-compatibility.md)
- [Implementation plan](../plans/2026-11-04-finite-known-profile-compatibility.md)

## Evidence and branch

Repository tokenizartinfo-ops/agent-friendly-web, ID1347578006. Feature head read before inspection: bd923bab7225212e35e054b14c132de78195ec5e; tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Documentation branch docs/finite-known-profile-design-20261104 starts from exactly that commit; expected-head CAS is required for its commit. No feature/main write or PR.

Read original spec/plan at aed54dab23b644481aed01cf6b5b94249ecf9f23, root amendment at5560af6f44ec7fe7a81c52b6fa7a608b41f5bbf1, exact shared observer/policy/runtime/reservation and all identified finite consumers, and relevant existing native/legacy test helpers. Scoped inventory41925030772/job126907057963 and41925236121/job126907778764 was provided and corroborated against those modules. Subsequent writer checkpoint3fb1751c901059c9acdb2a9f1de2f6470b9f3c41 records unchanged codeHEADbd923bab.

Native signal milestone41922611657/job126898694059 and strengthened native retention41923415932/job126901464107 remain evidence for those exact sources only. This design does not rerun or supersede them.

## Review conclusions

- Shared private fixed selection avoids duplicating the18-hook lifecycle and avoids a public compatibility callback.
- Mixed roles are explicit: candidate initial/current/setup baseline uses the new triple; historical rollback uses old exact pair on both metadata and expected pin. Extraction cannot invoke candidate validation before choosing a historical role.
- New finite native positive uses actual Known->Workflow->Operator->Observer->Reservation product code in an isolated test-only Workflow. The existing production legacy builder positive stays intact.
- C2 material source remains uninstalled; a synthetic source handoff test plus actual Known lifecycle is not a complete mounted finite workflow or package.
- Original event70s and existing child clocks, current primary grant/history/identity, one-use/no-replay, fixed targets, native admission/cancellation/physical-retention behavior and historical pins remain.
- No new approval/token/DTO authority, generic outbound, producer, native mount, budget, permission or credential.

## Next action and unknowns

Root reviews/activates the existing held implementer for Checkpoint1; no human design choice is needed. Carry both linked documents and the root amendment. No source implementation was performed here.

Still factual/unqualified: final compatibility tests and artifact byte budget; the checkpoint initial-upload timeout after52 subtests; full C2 material/producer integration. Preserve the timeout as unresolved until isolated terminal evidence, not as passing or a proven product defect. Independent source review and one exact final compiler remain required after implementation.

Source ceiling2026-11-03T02:59:00Z remains expired. operationalReadiness=false; completePackage=false; PCoff=false. No provider/runtime/Entry/DDL/credentials/permission/OAuth/OTP/cron/Max or other-project effect. Rollback is restoring this docs branch to its pinned source parent; no historical resource/data was changed.
