# Progress: docs/superpowers/plans/2026-10-26-delegated-pilot-permission-expiry.md

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated GitHub branch; ORIGIN github.com; RESOURCE_TYPE source tree/PR/Actions; ALLOWED_ACTION source tests, scoped code/docs and hosted CI; ROLLBACK unmerged branch or additive revert, no runtime mutation.

BASE 3ff29aa48a4c59dcd80f4e5fa28ec3922a7b1f60, tree 6c091c9dfe1b241bebc3a02796bff7b0a04964e4. Branch fix/delegated-pilot-permission-expiry-20261026.

Task 1: started. Diagnosis from real trial: createGrant uses now()+600000 without host deadline; the early request gate already blocks reads after host expiry. New tests are about issuance metadata and async completion, not a claim of an observed unauthorized post-window read.

Ruling: use an isolated remote GitHub branch and this versioned ledger in place of a local worktree/.superpowers workspace — owner cloud-first preference; costs inability to run local skill helper scripts, offset by pinned branch/commit and hosted CI evidence. No local build, clone or dependency.
Ruling: execute the known narrow fix inline without waking the owner for design/plan approval — explicit opt-out and overnight authorization; source remains reviewable and requires CI/fresh review before integration. No new runtime trial or permissions.

Expected RED: new consent/grant deadline, async-expiry and short-window assertions fail against unchanged worker. Stable behavior should already pass. Actual evidence pending; no completion claim.
