# Finite Fenced Owner Issuer and Notice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. ROOT REVIEW REQUIRED BEFORE DISPATCH. Root preserves the standing execution method and one product writer; this document starts no implementation.

**Goal:** Produce real original SDK/issuer/grant provenance, then independently add original fenced notice provenance and factual notice context, with public/private product routes still pending.

**Architecture:** M calls the actual pinned SDK and the fixed native QA binding under one original request scope. QA independently verifies original source/owner and writes the existing Unit2a journal/store; a bounded provenance journal records one-use SDK attempts and exact expected grant. The second task adds named notice SQL and phase facts without mounting any host or provider writer.

**Tech Stack:** Existing JavaScript ESM, SDK1.2.1, native workerd/Miniflare DO/D1/KV, Node test runner, credential-free GitHub Actions. No dependency addition.

**Spec:** [2026-11-04-finite-fenced-owner-issuer-notice.md](../specs/2026-11-04-finite-fenced-owner-issuer-notice.md)

## Global constraints

- Pinned architecture source220b5bc323315b7f107967548fb8958c0f8234f2. Root supplies later accepted implementation BASE after the sole phase-context writer closes; do not follow its moving branch.
- Exact original private envelope/selector/root/holders/deadlines and genuine consume/adopt before earlier enrollment. Never reconstruct authority from records.
- Unit2a six operations/store/fence/schema retain semantics. Only task B adds four named notice operations; no redesign or remote schema installation.
- Current observation means fresh first-primary session with SELECT first, exact original grant UUID, no owner/client scans.
- No product route mount, new runtime flag, profile fallback, provider publication, cleanup enablement, Entry, token/OTP, DDL, browser, local clone/build/test, or another project.
- Original I0/C0/C1, technicalI0+300000, parent<=30000ms, child<=5000ms, commandBy-510000, nominal/launch clocks and historical2607/c570/accepted QA flags remain unchanged.
- Source ceiling2026-11-03T02:59:00Z remains expired. Fixture-only existing ceiling substitution must be labelled; no production clock injection or SDK/source replacement.
- Provider own-in-flight SEND continuation, complete cleanup/mount, exact CLOSED third prearm and distinct full T0-derived setup are separate consumers.
- operationalReadiness=false; completePackage=false; PCoff=false.

## Review focus

- SDK KV approve get/delete permits races; only real same-instance one-use D1 consumption may yield one grant.
- General source denies own unresolved SEND; an issuer must progress only at its exact retained lexical operation position, never through allowPending.
- Consent consumed under one child cannot be transferred to another child/store/RPC; held ACK must not create a new grant attempt.
- A late SDK outcome is distinct from grant/link/notice facts and physical deployment settlement; no ordinary fallback reduction.
- Global notice sequence and concurrent withdrawal can invalidate a valid-looking ticket; exact event, primary current tuple and historical rows must be preserved.

Each appears in the tests below. A real boundary failure is reported; never convert it into success-shaped pending data.

---

## Task A — Real SDK/native original fenced issuance

**Files create:**

- lib/mcp-qa-finite-owner-issuer-wire.mjs — strict separate fixed issuer grammar; existing choice wire unchanged.
- lib/mcp-qa-finite-owner-sdk.mjs — M lexical SDK and fixed native sender, one request-local ID/holder closure.
- lib/mcp-qa-finite-owner-issuer-qa.mjs — unmounted fixed receiver, original verifier, issuer ordering and factual authorization/grant linking.
- lib/mcp-qa-finite-owner-issuer-provenance-records.mjs — strict Root/SdkSend/SdkAck/ExpectedGrant/NoticeTicket DATA codecs.
- lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs — original-prefix append/read/sync/readback, bounded immutable operation state.
- lib/mcp-qa-finite-owner-approved-ticket-facts.mjs — pure extracted ticket/preconnection/approval predicates.
- test/mcp-qa-finite-owner-issuer-provenance.test.mjs
- test/mcp-qa-finite-owner-sdk-issuer-native.test.mjs
- test/fixtures/finite-owner-sdk-issuer.mjs — isolated two real Worker/DO ends and real SDK/native KV/D1; explicit SYN external inputs.

**Files modify after accepted phase-context dependency:**

- lib/mcp-qa-finite-owner-preparation.mjs — use pure shared ticket predicates; preserve common unavailable linkers/GET-only continuation.
- lib/mcp-qa-finite-owner-phase-context.mjs — exact new provenance inventory, immutable lower-level fact sharing and unknown-SEND denial; no new phase.
- test/fixtures/finite-initial-entry-world.mjs — minimal test-only real-source/native entry reuse; no source-shaped aliases.
- The implementation report at this plan's report path, replacing DESIGN ONLY with exact source evidence only after review.

Do not edit ordinary delegated-oauth-worker/store, monitoring APIs, worker entrypoints, profile flags, Unit2a SQL/schema, initial/complete cleanup or current pending-only native bridge/receiver. Common/M imports no QA bootstrap/residency.

**Consumes:** accepted readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId=null}); existing canonical preparation stores/codecs; actual verifyCloudflareAccessJwtWithExpiry; accepted request boundary/retention; Unit2a createFinitePreparationIssuerJournal({ctx,env}) and createFinitePreparationIssuerStore({ctx,env}); real SDK1.2.1 OAuthAuthorizationServer.getOAuthApi(env).

**Produces:** exact high-level and codec/journal signatures in the spec; real authorization/grant/link/connection-pair facts and separate SDK outcome. No generic function takes sdkApproved, permission, source DTO, callback or target from a caller.

**Private operation seams:** in the QA module use lexical assertIssuerPosition(position,childLease) where position is a module-private object created only after this invocation actually appends its own SEND; it returns void. It stores root/request/holder/operation-position and exact expected journal delta, never a public option, serialization or exported callback. Missing/foreign position fails before I/O. Factor shared lower-level factual predicates, never source→resolve→source recursion.

- [ ] **Step 1 — Reconcile the dispatch BASE.** Read accepted first-phase implementation/report and exact accepted signal/profile/C1/C2/C3 evidence. Verify current task-owned branch and CAS lease. Confirm SDK lock1.2.1 and pin cloud test environment. No new signal experiment or product writer.
- [ ] **Step 2 — Write codec/journal RED.** Assert exact schema/hash/max length/extra-key rejection; no send without original root; begin once; approve before begin ACK denied; complete before ExpectedGrant/actual grant path denied; cross-A/request/root/source/enrollment denied; unknown/overflow/orphan ACK denied; ACK at deadline denied. Native transaction callback throw, lost sync and postcommit readback loss must yield uncertainty and zero next operation.
- [ ] **Step 3 — Run focused RED in authorized cloud CI.** `node --test test/mcp-qa-finite-owner-issuer-provenance.test.mjs`. Capture causal missing component/predicate failure at exact head; missing runner dependencies are not valid RED.
- [ ] **Step 4 — Implement exact provenance codecs/journal and pure ticket extraction.** Implement spec signatures/schema and immutable bounded inventory. Existing six Unit2a hashes/store/schema unchanged. Pure helper never reads storage, invokes functions or returns authority. New factual reader inventories SDK prefix and remains unavailable for unresolved sends.
- [ ] **Step 5 — Write native integration RED against actual new module path.** Fixture imports real SDK, reader, journals and Unit2a store; mounts only test Worker/DO entries over native binding. Its positive assertion initially fails because real issuance/links are absent, not because fixture returns a prefilled source. Seed external initial/connection evidence through actual record APIs and disclose SYN provider/Access/custody/ceiling divergence. M SDK result must never be mocked.
- [ ] **Step 6 — Implement fixed M sender and QA issuer.** Use exact path set/order in spec; retain one originalRequestId across calls and encode accepted decreasing deadline each time. QA derives selector/identity/approval and app UUID. Keep consume→grant on SAME actual child/store/witness. Persist ExpectedGrant before consumption. Link only actual ACK/readbacks; preserve new-GrantLink ACK rule for first connection pair. Real completeAuthorization only after actual grant ACK and complete SEND, revokeExistingGrants:false; no ordinary catch fallback.
- [ ] **Step 7 — Run native RED/GREEN causally.** `node --test test/mcp-qa-finite-owner-sdk-issuer-native.test.mjs`. Required named assertions:
  - `actual SDK begin to fenced original authorization`: native KV transaction exists, stored hash matches actual handle, exactly original reserved UUID/fence/consent/AuthorizationLink, no code/grant before approval.
  - `actual SDK approval to same-child original grant then completion`: real SDK cookie/CSRF processing, actual consume RETURNING witness, one app grant, actual SDK completion after app ACK, exact props and no SDK grant list/sweep.
  - `parallel SDK approvals do not duplicate D1 permission`: hold native KV delete/approve and race valid same transaction; one consume/grant/complete at most; loser cannot revoke winner.
  - `missing cookie hook holder version or original request denies before ordinary writes`: external spoofed private headers, copied SDK-looking data, altered original bytes, forged root/envelope, other owner/project/revision all deny.
  - `own issuer send progresses only inside surviving position`: actual own SEND may progress through lexical checker; a general context read, another root/request and reconstructed journal continuation stay unavailable.
  - `consume witness never crosses lease store or RPC`: cloned row, fresh store, replacement child, used witness, 5s consume→grant deadline deny; successful same child remains valid.
  - `lost ACK does not replay`: each SDK/native/journal/SQL ACK position lost/held; second request creates zero new SDK/SQL effects and no new UUID. Late real result cannot append expired ACK or issue later operation.
  - `request budget and actual work retention`: 29s elapsed leaves<=1s; native abort, holder drift and held fetch/body/cancel/SDK KV operation retain occupancy until actual settlement; later child cannot revive.
  - `exact original current grant`: fresh SELECT-first after ACK and each current observation; SQL-time expiry/revocation/revision drift denies; unrelated historical grants untouched.
  - `SDK uncertainty remains uncertainty`: hold real completeAuthorization KV put beyond cutoff; exact existing Unit2a terminal barrier/revocation denies a later actual exchange/read; eventual opaque completion creates no new app grant. This task proves component denial only, NOT restoration/cleanup gate.
  - `public defaults remain pending`: real existing defaults/conduit/private POST show zero new issuer/SDK effects; current four setup-facts pending expectations unchanged.
- [ ] **Step 8 — Run scoped GREEN/lint and exact graph check.** New tests plus existing `test/mcp-qa-finite-preparation-issuer-records.test.mjs`, `test/mcp-qa-finite-preparation-issuer-native.test.mjs`, `test/mcp-qa-finite-owner-phase-context-native.test.mjs`, `test/mcp-qa-finite-owner-native-conduit.test.mjs`, `test/mcp-qa-finite-owner-native-conduit-native.test.mjs`, `test/mcp-qa-finite-owner-request-retention-native.test.mjs`, `test/mcp-qa-finite-policy-setup-facts-native.test.mjs`. One established changed-graph compiler/residency check at exact head; original2MiB M/3MiB QA limits and no common/M→QA decoder edge. Report unmounted test graph separately from product graph.
- [ ] **Step 9 — Commit with CAS, root review.** Exact task diff, tests, run/job/attempt/commands/counts/warnings, source-vs-SYN limits, unchanged product pending routes. Root may reject A independently of B. Do not begin B just because A has a green run.

## Task B — Original fenced notice operations and factual notice context

**Files create:** lib/mcp-qa-finite-preparation-notice-store.mjs; lib/mcp-qa-finite-owner-notice-qa.mjs; test/mcp-qa-finite-preparation-notice-native.test.mjs; test/mcp-qa-finite-owner-notice-context-native.test.mjs; test/fixtures/finite-owner-notice.mjs.

**Files modify:** issuer-records/journal only for four enumerated notice operations and bounded count22/23; task A provenance journal to allow the two strict NoticeTicket records through `putNoticeTicket(record,lease)`; task A receiver for three fixed notice paths; task A M sender adds handlePrivateFiniteOwnerMonitoring({request,env,ctx},originalLease) for original notice requests; accepted owner-phase-context for exact notice phase/prefix validation; original provenance/issuer tests for additive schema. No ordinary monitoring SQL/API changes or new schema.

**Consumes:** task A actual original application grant and observed SDK-completion provenance; original second-stage approval/publication DATA through accepted stage qualifier; actual current first-primary grant; existing ticket/event schemas and canonical preparation link store.

**Produces:** createFinitePreparationNoticeStore / handlePrivateFiniteOwnerNotice signatures in spec; original NoticeTicket/send/ACK/event/NoticeLink and separate withdrawal facts; readPrivateQaFiniteOwnerContext unchanged signature now includes qualified notice_consent. No third phase, provider action or subscription.

- [ ] **Step 1 — Write additive record/SQL RED.** Exact request UUID/new enum guards, max22 overflow, unknown old/new op keys, frozen owner notice sends denied. Native store should fail missing fixed implementation; no schema migration is run remotely.
- [ ] **Step 2 — Implement four fixed SQL operations.** Fixed original fence/owner/consent/grant/time joins, ticket reservation before INSERT, exact request recovery and grant-scoped sequence CAS; SQL issued time and canonical ISO conversion. Owner withdrawal follows separate reduction predicate in spec and cannot resurrect permission. No generic beforeCommit/SQL injector.
- [ ] **Step 3 — Run native store RED/GREEN.** `node --test test/mcp-qa-finite-preparation-notice-native.test.mjs`. Assert:
  - fence-first denies queued ticket and grant; grant-first committed row is visible behind the same terminal barrier;
  - actual SQL-time ticket/grant/consent/C0/child expiry beats earlier JS validation;
  - exact event/request recovery never resends; unknown ACK and consumed original ticket cannot mint another event;
  - sequence CAS conflict, concurrent withdraw, global intervening foreign-grant sequence and already withdrawn reject regrant;
  - owner withdrawal can reduce after app-grant revoke/expiry within unchanged authorized window; it preserves historical grant event and revoked_at/exchanged_at;
  - same original request/window/identity only; every current read SELECT first/new session; no owner/client scan;
  - held INSERT/readback is retained; late ACK cannot grant/link or renew clocks.
- [ ] **Step 4 — Write source/native integrated RED.** Real task A SDK→grant output feeds native notice handler. Stage2 installed evidence is constructed through actual journal APIs with explicit SYN provider pointer/metadata; no fake grant/link/source. The actual reader must currently reject notice_consent. Test phase exists before notice event, so no circular requirement.
- [ ] **Step 5 — Implement exact notice context/handler.** Derive policy from original grant and notices StageApproval with fixed start/expiry; compare actual metadata and allowed binding deltas. Verify original ticket/Origin/Access/cookie; reserve and execute fixed notice SQL; record actual NoticeLink only after ACK and fresh exact event. Private lexical own-operation recheck does not widen general reader. All finite_prearm inputs still deny.
- [ ] **Step 6 — Run integrated GREEN.** `node --test test/mcp-qa-finite-owner-notice-context-native.test.mjs`. Exact installed second stage with no notice event yields notice_consent DATA only. After actual ticket/grant/link, factual event agrees with original grant/consent and enables only later evidence checks. Wrong policy grant/start/expiry, mismatched second predecessor/context/hash, wrong SDK-completion prefix, orphan/unknown notice rows, withdrawn event, changed QA/currentM/owner/revision or third-stage input deny. All source reads cause zero mutations/provider non-GETs; real notice handler causes only enumerated D1/journal operations. Original baseline/program/window unchanged.
- [ ] **Step 7 — Focused regression/graph and root review.** A suite plus task B tests and existing `test/dossier-monitoring-authority.test.mjs`, `test/dossier-monitoring-native.test.mjs`, `test/dossier-monitoring-owner-native.test.mjs`; scoped lint and one final changed-graph gate when imports changed. CAS source/report commit, exact head/run evidence. UI/default mounts, cleanup, provider publication, closed prearm/full setup and PC-off remain pending.

## Evidence and stop conditions

A positive native component result is not actual owner consent, mounted candidate eligibility or delivery. Preserve actual vs SYN boundaries per test, including existing isolated source-ceiling substitution. SQL clock tests must run actual native statements with live original test windows; pre-expiry source-clock cases are separate. If the fixed full source/SDK/native path cannot be entered without replacing its reader/validator/authority, report that missing dependency and leave the task unaccepted; do not lower the proof to a success DTO.

Keep one same-window fixed attempt across fault cases. Do not run broad unrelated suites/requalify accepted signal/fence designs. No claim that late opaque SDK work settled, deployment writer unknown became safe, or full cleanup completed. Root independently reviews each source task before next dispatch and adapts the execution header to the existing standing SDD policy.
