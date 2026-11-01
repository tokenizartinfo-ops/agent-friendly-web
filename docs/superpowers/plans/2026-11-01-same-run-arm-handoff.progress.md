# Same-run ARM handoff progress

2026-11-01 UTC. Scope: design-only checkpoint on isolated remote branch `design/same-run-arm-handoff-20261101`.

- Baseline independently read: main `abdb91763ca8eab5254022680ca54cf992afcddc`, tree `c9ae460156962bd0ee1b21137f1971eb1d55d5c0`; CI41294654155 completed/success.
- Read AGENTS current prefix + relevant stable project/security/engineering sections and issue497 comment6556415794. Earlier pause is superseded by owner's resumption relayed by root; consumed intents remain consumed.
- Read actual ARM, current-generation resolver, named packet reader/preflight, stored-generation reader, private contexts, fixed HTTP pins, production actor/Workflow index and existing native ARM/preflight fixtures, package/CI.
- Applied brainstorming and writing-plans instructions supplied by root after its skill read. Owner delegated technical choices; no additional question is necessary for this reversible design.
- Design fixes the concrete current gap: same native run, original event lease, callback/exact receipt/outer-settlement fence, one private consumed capability and existing full read-only preflight. Separate draft/packet hydration explicitly required.
- Native actor call provenance remains a TCB assumption; armDecisionAt is a decision, never commit/checkpoint time. Late issued mutations remain uncertain.
- Spec: `docs/superpowers/specs/2026-11-01-same-run-arm-handoff.md`.
- Plan: `docs/superpowers/plans/2026-11-01-same-run-arm-handoff.md`.
- Root critical-path review identified the already-existing AfwReleaseWorkflow confirm_named -> AfwOwnEventNode subscribe/saved producer/deliverOwnSaved/unsubscribe/close/withdraw path. This design is OPTIONAL, NOT established critical path. IMPLEMENTATION HOLD until root reconciles actual consumer/protocol blocker and compares smallest existing-path integration.
- Task1-4 source/tests NOT STARTED. Fresh root design review and route selection pending. No tests claimed for this docs-only commit; baseline CI is not new implementation validation.
- Only remote docs/branch writes. No local files/clone/dependencies/build; no runtime/D1/permission/credential/OAuth/cron/Workflow/consumer/Max action; no replay.
- Source rollback: leave this isolated branch unmerged or additive docs revert. No shared baseline modified.
- Remaining for this generation-controlled alternative, IF selected (not newly imposed on existing lifecycle): immutable real producer/hydration, reviewed native mounting/candidate/dossier/rollback, server once-claim and physical finite guard/finalizer, real consented client delivery/useful review/withdrawal, integrated PC-ON, separately agreed PC-off.
- operationalReadiness=false. Overall AFW objective not complete.
