# Immutable initial activation capsule — source-only unit

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT own finite synthetic QA branch; ORIGIN delegated-canary.agentfriendlyweb.dev. RESOURCE_TYPE fixed IndependentClosure actor and initial journals; RESOURCE_ID afw-own-successor-closure-v1; ALLOWED_ACTION source edits and credential-free cloud CI only; ROLLBACK revert this source unit before promotion. No remote effects, token/permission change, trial command or OAuth from this unit.

## Required result and binding boundary

Continue the reviewed actual activation coordinator. Persist one immutable factual capsule only after actual ActivationCompletion passed append/sync/readback, inside the SAME surviving B1/A parent/stage. No replay, exported capability or caller DTO may recreate this continuation. Capsule is data; it never grants effect authority. Existing original trusted administrative callgraph/binding model applies; concrete contradictory historical facts block.

Add strict bounded canonical codecs in lib/mcp-qa-finite-initial-capsule-records.mjs using initial canonical/hash conventions, with exact fields:
purpose afw.finite-initial-capsule.v1; entryHash, materialHash, selectorHash, materialAckHash, cleanupPlanHash, cleanupArmAckHash, activationCompletionHash, sourceRevision, sourceTree, qaVersionId, qaDeploymentId, initialInstanceId, preconnectionId, I0, initialDeadline, C0, C1, activatedVersionId, activatedDeploymentId, moduleHash, configurationHash, bindingsHash, recordedAt, capsuleHash.
Validate identifiers, all links, original ordering/timing, purpose, exact field set and canonical hash. materialAckHash derives from the existing InitialAck; do not add fields or rewrite historical records.

Store ONLY fixed new key afw.finite-initial-preparation.v1:capsule. This is outside the cleanup prefix, whose strict enumeration must remain compatible. Do not write a finite HEAD.

Private initial-entry writer verifies actual Entry/selector/material ACK/material/cleanup Plan+Arm/activation SEND+ACK+Completion against actual private continuation result and captured holders. Append within one storage transaction only if capsule absent and finite HEAD absent; preserve async checks; await captured sync and exact primary readback. Preexisting/conflicting capsule is not overwrite/retry authority. Original lease and all actual async work remain retained through settlement, including late sync/read/cancel. Missing or uncertain capsule after interruption stays admin_pending; no provider resend/activation replay.

activatedVersionId/deploymentId and module/config/bindings hashes describe M actually activated and verified, NEVER historical2607 rollback. QA version/deployment come from verified original bootstrap pointer. Preserve A preconnectionId end-to-end; it already appears in selector/material/backup. Owner's new ticket handles/projectRefs are separate future concerns.

Keep current factual safe RPC shape/incomplete status. No owner source seam/mount/GET/POST/consent or lifecycle handoff in this unit; these follow after capsule acceptance. readPrivateQaFiniteOwnerSource remains unavailable. Original technical<=I0+300s, owner I0..C0<=900s/custody, C0=I0+900s,C1=C0+180s remain unchanged; expired ceiling unchanged.

## Acceptance

Native actor successful actual completed activation produces exactly one synced/read-back capsule with actual M UUID/deployment and retained A identity. Missing/uncertain Completion, mismatched Entry/selector/ACK/material/cleanup/hash/QA pointer and conflicting capsule deny. Lost capsule write/sync/readback ACK, restart, timeout, cancellation, holder drift or finite HEAD do not repeat upload/POST or invent authority. Existing material/cleanup codecs and strict cleanup inventory unchanged. At technical expiry no late capsule continuation starts. Capsule creation must not mutate cleanup ARM/timing or produce finite HEAD.

Use TDD regression and meaningful native cases; do not mirror codec implementation with vacuous tests. Run focused affected native/record groups and compiler/residency if imported bundle changes. Report exact base/head, RED/GREEN Actions, source artifact size/hash, zero actual provider calls, remaining factual reader/owner mount/cleanup/live gates. Report docs/superpowers/reports/2026-11-03-finite-initial-capsule.md. Temporary qualifier excluded before integration. No local clone/build/dependencies; no subagents. operationalReadiness=false; completePackage=false; PC-off pending.

## Ruling recorded 4 November 2026

bindingsHash binds the complete activated M configuration bindings, sorted ascending by binding.name and recursively key-canonicalized JSON, plain SHA-256 of that JSON. It matches expectedFull.bindingsHash in mcp-qa-finite-policy-setup.mjs:91; the public projection's afw.finite-public-bindings.v1 domain is a different commitment and must not be substituted. Use the actual already-qualified activation configuration, preserving its correspondence to Plan/Completion. Test ordering invariance and a full-binding field mutation. Do not change other historical hashing conventions.

The pending causal RED is now confirmed: Actions41694127911/focused126120046559,107PASS1FAIL exactly completed activation must persist immutable capsule. Compiler/forward consumers passed. No rerun of unchanged RED is needed. The newly touched RPC result in the success test must dispose in finally, including on failed assertions; preexisting fixture warnings are separately documented, not all attributed to this test.
