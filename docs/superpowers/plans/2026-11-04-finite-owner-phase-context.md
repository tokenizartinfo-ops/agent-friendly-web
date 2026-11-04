# Finite Owner First-Phase Context Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce private original-capsule factual contexts for closed_ui and the exact settled first connection publication, keeping all later phases and effect paths closed.

**Architecture:** A QA-only reader qualifies original capsule/A, exact current provider/primary facts and bounded stage records. Pure stage/enrollment predicates are shared beneath existing consumers, without resolver recursion or importing QA bootstrap/residency into common/M. The existing lexical QA adapter consumes the exact envelope; its private continuation remains GET only.

**Tech Stack:** Existing JavaScript ESM, Node test runner, workerd/Miniflare native DO + D1 fixtures, existing canonical record codecs and GitHub Actions. No added dependencies.

**Spec:** [2026-11-04-finite-owner-phase-context.md](../specs/2026-11-04-finite-owner-phase-context.md)

## Global Constraints

- The exact private envelope is {source,preconnectionId,capsuleHash}; validateFiniteOwnerSource keeps its strict inner grammar.
- Common/M must never import QA bootstrap or candidate-residency decoding modules.
- Strict standalone readPrivateQaFiniteInitialOwnerSource and its absence checks remain unchanged.
- Pending-only conduit, GET-only private continuation and private POST rejection remain unchanged.
- No SDK issuance, native mount, provider mutation, permission boolean, callback/DTO authority or new admission.
- Original I0/C0/C1, technical I0+300000, parent <=30000ms, child <=5000ms, commandBy-510000, nominal and launch clocks/counters remain unchanged.
- Historical2607/c570 and QA_CLOUD_CLOSED_PINS remain immutable; source ceiling2026-11-03T02:59:00Z is expired; single consuming Entry remains reserved.
- Exact candidate profile follows the eventually root-accepted incoming Request.signal qualification revision; no hardcoded old flag set or duplicate opt-in experiment.
- No activation before that source qualification and root review; no remote schema, permissions, tokens, OAuth, OTP, cron, Max or other-project action.

## Review Focus

- Original pointer appears again after an unresolved SEND: context must still deny; matching pointer is not settled publication.
- Storage prefixes look valid individually but belong to another original A/owner/enrollment: no phase source may be returned.
- Receipt is valid but actual module/configuration or first-primary owner changes between snapshots: deny, without retry or repair.
- Held read/body/cancel outlives logical timeout or abort: retain actual work and deny later work borrowing another root.
- Later stage or private-policy text passes a loose projection: deny notice_consent/finite_prearm; placeholders and empty fields do not prove semantic prearm.

All five are assigned explicit tests below. No execution occurs merely because this plan exists.

---

## Activation gate and baseline

Source inspected: aed54dab23b644481aed01cf6b5b94249ecf9f23, feat/finite-native-cleanup-20261101. This docs branch is not a product candidate. Root must first record the exact accepted source/profile revision from the independent incoming Request.signal work and review this scoped plan. An intermediate positive native marker is insufficient. The implementer reads the accepted diff and updates the implementation base; no old flags are copied from this document. If the qualifier remains unaccepted, retain this plan without activating an implementer.

Execution uses the existing authorized GitHub/Actions workflow and expected-head source commits. No local clone/dependencies/build, new cloud runner service, remote credentials or runtime invocation. Root supplies the established source checkpoint and review process; no new user choice of execution method is needed.

## File map

Create:

- lib/mcp-qa-finite-owner-phase-context.mjs — fixed QA-only context producer; lexical bounded provider/D1 observations and two supported phase decisions.
- lib/mcp-qa-finite-owner-stage-facts.mjs — pure exact installed-stage DATA qualifier, below resolve.
- lib/mcp-qa-finite-preparation-enrollment-facts.mjs — pure original enrollment binding qualifier, with no phase/relax switch.
- test/mcp-qa-finite-owner-phase-context.test.mjs — pure qualifier/strict data and graph boundary tests.
- test/mcp-qa-finite-owner-phase-context-native.test.mjs — actual QA DO/D1 reader against explicit synthetic external evidence.
- test/fixtures/finite-owner-phase-context.mjs — native test extension to the existing initial-entry world; no product source replacement.

Modify:

- lib/mcp-qa-finite-owner-preparation-qa.mjs — lexical reader import/call only.
- lib/mcp-qa-finite-owner-preparation.mjs — stageHistory fact gathering delegates pure installed-stage predicates; preserve final currentPublication check, resolve/envelope, GET rejection, setup semantics and result shapes.
- lib/mcp-qa-finite-preparation-cleanup.mjs — extract only enrollment linkage predicates into shared helper; preserve all standalone inventory/absence/reread gates.
- test/fixtures/finite-initial-entry-world.mjs — minimal test-only original-lease entry to the real context module and fixture extension; existing fixture modes unchanged.

Do not edit worker entrypoints, profile/flag files, initial standalone source reader, common owner-source/connection-source stubs, issuer mutation/schema files, cleanup alarm, transport pending return, historical pins or existing setup-facts pending expectations.

## Task 1: QA factual context for closed_ui and first settled connection

This is one independently testable deliverable. Pure extraction, native fixture and QA adapter change belong to the same task; neither scaffolding nor a nominal new export is a completed unit.

**Interfaces consumed:**

- readPrivateQaFiniteInitialAnchors({ctx,env},originalLease), returning the exact DATA shape stated in the spec.
- Existing request root/deadline and observeFiniteFactualReadWork, with accepted same-ambient genuine-owner borrowing.
- createFiniteOwnerPreparationStore({storage,now}) read methods, preparation codecs, policy identity hashes and journal records.
- createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease), read-only.
- qualifyFiniteConnectionProfile({phase,metadata}), used only with supported preparation phases.
- Existing primary repository/grant readers and new fixed SELECTs for exact original issuer/fence/consent/link observations.

**Interfaces produced:**

- readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId = null}) -> Promise<Readonly<{source,preconnectionId,capsuleHash}>>, otherwise unavailable.
- qualifyFiniteOwnerInstalledStage({source,preconnection,sourceSnapshot,initialTicket,connection,stage,stageApproval,approval,ticket,ticketUse,upload,activation,predecessors,grantLink,noticeLink,observedAt}) -> Readonly<ConnectionReceipt>, otherwise throw.
- qualifyFinitePreparationEnrollmentFacts({anchors,enrollment,ack,preconnection,sourceSnapshot,stageApproval,approval,ticket,ticketUse,projectRef}) -> Readonly<{enrollment,ack}>, otherwise throw.
- preparePrivateQaFiniteOwnerChoice signature and common continuation are unchanged; only its lexical producer changes.

- [ ] **Step 1: Bind the accepted source inputs.** Read the actual accepted opt-in commit/profile and repository instructions. Record head/tree, exact profile files and previous accepted run in the task receipt. Confirm no source conflict with this file map. Do not write a compatibility flag or dispatch the independent signal experiment.

- [ ] **Step 2: Write focused failing DATA tests.** In test/mcp-qa-finite-owner-phase-context.test.mjs, import the two missing pure qualifiers and assert exact original-chain success plus one-field mutations: wrong original A, changed subject/source/project, wrong predecessor, ticket-use decision hash, ACK sendHash, receipt version/deployment, completedAt before either ACK, extra data/accessor/symbol and unknown journal state. For enrollment, exact original tuple/ACK succeeds, null ACK is factual only, wrong capsule/plan/zero-state/decision/hash denies. Native backup cases must deny missing/tampered Receipt/Backup/chunk, mismatched manifest/material/baseline and assembled length/hash without changing historical pins. Assert neither helper accepts a function/env or returns a callback/permission key. Do not test an invented all-four phase source.

- [ ] **Step 3: Run focused RED in authorized cloud CI.** Run `node --test test/mcp-qa-finite-owner-phase-context.test.mjs`. Expected FAIL specifically because planned modules/exports are absent, not missing runner dependencies. Preserve the sanitized failure and exact head.

- [ ] **Step 4: Extract the two pure qualifiers.** Implement signatures exactly as the spec. Move original predicates without weakening expiry or strict standalone reader behavior. stageHistory gathers the same exact records, passes one stage at a time with actual predecessors, and keeps its existing source.currentPublication comparison. The strict cleanup reader retains all prefix absence/zero-state/reread gates; the shared helper only checks factual linkage. No helper calls resolve, stageHistory, a reader or a store.

- [ ] **Step 5: Add native failing two-phase tests through the actual reader.** Extend initialEntryHarness with a test-only direct native invocation under createFiniteOwnerRequestLease, and implement fixture composition in test/fixtures/finite-owner-phase-context.mjs. Use real initial anchors and native preparation/journal APIs; test setup may supply labelled synthetic provider/custody metadata, but may not substitute owner source, context producer, strict qualifiers, resident decoder or create a source-shaped success DTO. During the tested read, prohibit storage put/delete/sync, SQL mutations and provider non-GETs; retain read-only transactions where existing journal reads require them.

  Required named cases/assertions:

  - `closed source keeps original A and stable original context`: exact envelope keys; source matches strict grammar; original baseline/program/window match capsule/material; actual retained backup manifest/chunk hashes are checked; snapshots unchanged.
  - `original approval and enrollment stay closed without publication`: use actual record/store APIs; resulting phase closed_ui; strict standalone reader still rejects same approvals.
  - `settled first connection derives read_consent from exact primary state`: exact upload/activation journal and receipt, real read-only source code, actual synthetic provider metadata for the derived configuration. Assert phase/read receipt; original baseline does not move; all unchanged binding/module bytes exact.
  - `unknown SEND denies even while provider pointer equals original M`: upload-only, activation-only, orphan ACK/receipt, wrong contextHash and writer-head cases all unavailable.
  - `foreign extra and later stages never become matching phase state`: foreign A, unknown keys, notices/finite approval or receipts, empty/private-placeholder canaryLive fields all unavailable. Do not invent a positive notices/prearm candidate.
  - `primary issuer prefixes remain facts not next-stage permission`: no issuer prefix accepted; exact reservation/OPEN/authorization/consumed-without-grant prefixes checked; grant/link/relation checked when present. Unknown ACK, orphan row/link, reservation/fence tuple mismatch, terminal fence, revocation or expiry denies. Missing grant is never repaired and no notice eligibility returned.
  - `fresh current owner and current publication are independently rechecked`: owner/revision/grant/configuration/QA-pointer drift after first snapshot denies; every independent observation starts with SELECT in a fresh first-primary session.
  - `original retained request cannot be renewed or borrowed`: genuine root with 29s elapsed leaves <=1s; abort/holder drift/held fetch/body/cancel retain work until settlement; clone/foreign-root denial. Reuse accepted retention controls, not a new permission mechanism.

- [ ] **Step 6: Run native RED in authorized cloud CI.** Run `node --test test/mcp-qa-finite-owner-phase-context-native.test.mjs`. Expected FAIL for missing/new reader behavior with native fixture actually entered; no success assertion from source substitution. SQL mutation fixtures use their real supported SQL clock; capsule pre-expiry test clocks remain explicit synthetic evidence and never alter production Date/clock policy.

- [ ] **Step 7: Implement the QA reader and lexical adapter.** Implement exactly the spec's two snapshots, bounded inventories with overflow, actual QA/resident/original M and retained-backup qualification, shared enrollment/first-stage predicates and current primary owner/issuer/link checks. Original baseline uses activationConfigurationHash(plan.configuration), not latest receipt or restoration hash. First connection configuration differs from original only by AFW_DELEGATED_OAUTH_ENABLED=true. Unknown SEND, later stages, cleanup progress and profile/provenance mismatch throw unavailable. Close every actual lifetime through retained existing scope; no writes, repair, retries, new lease or source factory. Switch the QA adapter import to the new reader; leave private POST rejection untouched.

- [ ] **Step 8: Run the focused GREEN and unchanged-boundary suite in authorized cloud CI.**

```sh
node --test test/mcp-qa-finite-owner-phase-context.test.mjs test/mcp-qa-finite-owner-phase-context-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-initial-owner-source-records.test.mjs test/mcp-qa-finite-owner-context.test.mjs test/mcp-qa-finite-owner-original-context-native.test.mjs test/mcp-qa-finite-owner-native-conduit.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-policy-setup-facts-native.test.mjs
```

Expected zero failures/skips in this focused set; tests assert private POST calls reader zero times, pending host effects zero, strict initial denials intact, and existing setup-facts pending remains correct. Reuse recorded accepted incoming-signal evidence; do not duplicate its opt-in experiment. If a new regression is exposed, fix the relevant task and rerun only affected checks.

- [ ] **Step 9: Verify the changed import graph once.** Run existing candidate residency check `node --test test/mcp-qa-finite-candidate-residency.test.mjs` and the repository's established credential-free changed-graph compiler gate at the accepted head. Capture actual M and QA graphs. Assert no new M/common edge to bootstrap/residency, no worker mount/profile edit, historical pins unchanged. A direct native reader fixture is not proof of a compiled product mount.

- [ ] **Step 10: Commit and obtain the root source review.** Commit only this task's explicit file map plus its concise evidence note with expected-head CAS, preserving concurrent changes. Suggested message: `feat(afw): qualify original first-phase owner context`. Record exact source/tree/run, synthetic input boundaries, supported phases, preserved denials and remaining gates. A commit alone is not acceptance; root reviews before any next implementation slice or activation.

## Finish condition and next extension

This task is done only when closed_ui/read_consent factual qualification and meaningful native failures/retention tests pass at the accepted candidate profile, changed-graph check passes, and root accepts the source diff. Notice_consent and finite_prearm deliberately remain unavailable. Do not report four-phase coverage, SDK/native producer completion, operationalReadiness, restoration or PC-off.

The next separately planned extension must compose exact fenced issuer/notice provenance and a source-qualified notices configuration, then settle the third-stage full canaryLive/private-full/prearm mismatch with actual compiled nominal denial. Later publication needs its private own-in-flight SEND continuation; complete cleanup is still required before forms or effects can open. Existing four setup-facts positives return only with that genuine flow, never through fixture success DTOs.

## Self-review receipt

Checked against the spec: both supported phases, all negative phases, original context invariants, enrollment extraction, fresh primary reads, source-only gates, preserved POST/pending boundaries and later interfaces are assigned above. Type/signature names match the spec; no callback/permission output is introduced. Each Review Focus item has a named native case. No implementation, tests/builds, runtime qualification or execution-method choice is claimed by this document.
