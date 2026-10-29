# Native event identity preflight implementation plan

> For agentic workers: execute inline with superpowers:executing-plans and test-driven-development. Owner delegated implementation choices and requested uninterrupted cloud work; no new design questionnaire.

**Goal:** Resolve the two fixed AFW event actor identities before the human permission window, without acquiring actors, reserving a successor, reading credentials, or opening events.

**Architecture:** A private administrative Workflow mode in the existing release operator performs only native namespace idFromName/idFromString calls. Other operator mutation modes must be off. It compares the known original identity and returns the successor identity as preparation evidence, never authorization. Host binding-to-namespace provenance remains a separate primary control-plane check.

**Tech stack:** Existing Node modules, Cloudflare Workflow, Miniflare, GitHub Actions; no new dependency or public endpoint.

**Spec:** This document's scope and interface are the small design. Chosen approach: private read-only Workflow in the existing operator. Rejected: guessing IDs from old notes; reserving a successor to discover its identity; public diagnostic endpoint. Those would respectively weaken provenance, consume the sole trial budget, or expose an unnecessary surface.

## Constraints
- Namespace fixed by RELEASE_TARGET; original and successor names fixed in code.
- Policy exactly startAt, expiresAt, namespaceId, originalContainerId; duration at most ten minutes.
- Payload exactly identityHash; instance afw-release-identity-<hash>; reject schedules.
- Native creation timestamp bounds the entire invocation/replay to five seconds. No retries.
- Explicit identity opt-in. Publication, confirmation, reservation, retirement-observation modes remain false/absent.
- Never call namespace.get/getByName, DB, network, or credential getters.
- Return mayBoot:false, mayReserve:false, operationalReadiness:false even on success.
- No runtime rollout, permission, OAuth or owner-session change from this source commit.

## Review focus
1. An unrelated namespace must fail the known-original round trip.
2. Expired, future, or replayed inputs must not obtain a fresh lease.
3. Another enabled operator mode must prevent this read-only branch.
4. Native step methods and cached step results must preserve identity and time checks.
5. Public HTTP and existing named-confirmation behavior must remain unchanged.

## Task 1 — private identity observation
Files: lib/mcp-release-identity-observation.mjs; worker/mcp-release/index.mjs; test/mcp-release-identity-observation-native.test.mjs; test/mcp-release-identity-observation.test.mjs; .github/workflows/ci.yml.
Interface: runReleaseIdentityObservation({env,event,step,now,monotonicNow}) returns blocked/uncertain or observed with identityHash, namespaceId, originalContainerId, successorContainerId, observedAt and three false capability flags.
- [ ] Add a native test against the real current operator; expect observed, currently blocked. Assert zero actor starts and network calls.
- [ ] Run the new early CI step and inspect the expected RED.
- [ ] Add the isolated handler and opt-in dispatch, plus boundary tests before final implementation.
- [ ] Run native and directed tests, full npm test/lint/build, and named-confirmation package CI.
- [ ] Independent whole-branch review; address actionable findings and preserve the evidence.
- [ ] Merge only with accepted checks. Remote execution remains a separately bounded read-only preparation step.

## Execution ledger
Base09b854f7db6552bead0b7634784a894f415b6662. Ruling: use an isolated remote branch and Actions instead of a new local worktree/build, per owner's cloud-first instruction. No shared interface changes beyond the private dispatcher.
Diagnosis: failed Access return is separate from this preparation gap. Login was allowed19:33:16UTC; no grant created. Trial closed66c68da4 at19:36:31UTC. This change does not claim to repair Access.
