# Final whole-branch fix wave — acquired response body retention

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=SOURCE/SYN GitHub+Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=one bounded final-review fix wave and scoped native qualification. ROLLBACK=only own Source commits with exact ref/blob checks; never remove journals, user data, backups or prior evidence.

## Frozen starting point and authority

BASE=8b2380c9bcc9c383ec46590df1403eed19fd2659, tree07079c8cc3670a6a1db51ca1daadbf3172c2d445. Source reference and main0c9c475b3ebaa970fc11d628b40e50a90cceb727 rechecked at resumption. User's new instruction to continue all blocks resumes the prior shutdown pause. No renewed remote operational permission is inferred.

The complete final review is docs/superpowers/reviews/2026-11-06-finite-native-whole-branch.es.md at Rootdocs b5fca44808c5c9c345ea5693527280fda1bc9ddd/blob5b7628e7effe5efbd440a9196d5f00a1167e67cf. Verdict WITH FIXES,0Critical/1Important/3Minor,954commits/579paths screened risk-based; not every historical statement/test line rederived. All current plan Tasks1/2/3 accepted; do not redispatch them. Existing167positive qualification remains D11, later chronology principal at7ebe; no relabelling as all-tested-atnewHEAD.

## Complete actionable Important finding, verbatim substance

### Important I1 — Retain acquired response bodies when validation fails before getReader()

Locations at reviewed HEAD:
- lib/mcp-qa-finite-bootstrap-native.mjs:37, cleanup44.
- lib/mcp-qa-finite-historical-source.mjs:210, cleanup219.
- lib/mcp-qa-finite-initial-material.mjs:45, cleanup52.

Problem: Each function awaits a response, checks the original lease and validates status/headers before assigning reader. Its finally cancels only when reader exists. An invalid response—or a response arriving after the original lease expires—therefore exits without retaining cancellation of its acquired body.

These are connected initial-lifecycle producers: initial-material.mjs:59–64 invokes the command, bootstrap and historical readers inside stage-work ownership. Once their retained promises settle and the original lease aborts, stage-work.mjs:8–22 can remove the outstanding entry while the abandoned body has no tracked settlement.

Impact: This breaks the explicit body/cancellation ownership guarantee and can allow a later observation scope after apparent drainage while earlier transport work remains unaccounted for. Durable one-shot fences still deny replayed publication. This is NOT an asserted authorization bypass. Aborting the fetch signal does not establish physical settlement.

Fix: Keep the acquired response in an enclosing variable. In every exit path, retain actual reader.cancel() or, when no reader was acquired, unlocked response.body.cancel(). Preserve prompt logical denial while retaining physical cleanup, following the established fixed-engine pattern.

Focused verification recommended: One parameterized native regression covering the three adapters with an invalid-header/status response and a late response, whose actual body cancellation remains held. Assert logical denial, cancellation entry, continued exclusion of another root until cancellation settles, and no subsequent IO/publication. Existing inspected tests cover malformed DATA, held fetches and storage continuations, not this pre-reader cancellation boundary. No test was run during review.

The remaining three Minor findings (D03 denial precision; SDK test-finally disposal; second same-engine call during cancel) and M1/M2 unknowns remain ledgered, NOT this fix wave. M4 closed by current inspection. No opportunistic upgrades, refactors or extra fix agents.

## Root verification and ruling

Root re-read all3native readers: each keeps response inside try, performs original lease/status/header checks before getReader, and finally tracks only reader.cancel. Confirmed originalblobs:
- lib/mcp-qa-finite-bootstrap-native.mjs ac0d14ebb5a986e2611e9ddbd72592541c9a4c28.
- lib/mcp-qa-finite-historical-source.mjs 3f0bf487efd72aa2356fd9982f98a938d328e72d.
- lib/mcp-qa-finite-initial-material.mjs c0ee5315563764979ed2c681c71b2dbc5515203d.
- Stage-work a89baeb2578856dadedf700f9d66e180eb09120e already retains actual promises in AsyncLocalStorage; its entry releases only after original signal abort and pendingSet empty. Keep module/interface unchanged.
- Existing fixed-engine e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb provides qualified pre-reader cancellation pattern; inspect, do not alter it.

Ruling: prior Task3 protection of bootstrap/material was task isolation. This final review found an earlier bug violating the binding retention contract. Authorize the smallest correction in the3readers plus coveringnative tests/fixtures, preserving success/authority/interfaces/clocks. Cost if wrong: broad cleanup/refactor could move authority or create fresh clocks. Complete-tree protected comparison, causal RED/GREEN and a scoped re-review must expose that. No real API/runtime effect permitted.

## Required result

1. Keep acquired Response available to cleanup even when post-fetch current/status/header checks throw before getReader.
2. Retain ACTUAL reader.cancel Promise when reader exists, or actual unlocked acquired response.body.cancel when reader was never acquired. Do not substitute resolved promises, call abort physical drainage, or release original stage-work while cancellation is pending.
3. Preserve prompt logical denial, original failure/rejection semantics and actual native holders/Promise ownership. Cancellation cleanup may enter/settle after logical failure/abort/deadline; no new business IO or renewed Root/child/window is granted. Do not let an expired business guard prevent required cleanup.
4. Keep original Root<=30000ms,child<=5000 clipped, original source/Access/I0/C0/C1; source3Nov02:59UTC remains operationally expired, C0=I0+900000,C1=C0+180000. SYN clocks may model qualified boundaries, no operational source refresh.
5. No exported HTTP utility, callback approver, authority DTO/factory/rawpair, public-pending widening or ordinary fallback. No stage-work API expansion unless a concrete impossibility is reported before changing scope.
6. Preserve initial-material's immutable script-SHA cache/byte equality and all current success semantics. Keep fixed-engine, enrollment, P8/P9/P10, SDK, schemas/stores/journals/records/profiles/builds/entrypoints/migrations unchanged. If legitimate changed M graph makes old fixture's literal M hash invalid, report it before modifying that unrelated assertion; never mask fixed code using old bundle.
7. Preserve all prior failed/cancelled primary records; this fix requires genuine causal RED at original3reader code, not a harness failure.

## Files and verification

Product allowed exactly the3readers above. Covering tests:
- test/mcp-qa-finite-bootstrap-native.test.mjs
- test/mcp-qa-finite-historical-source-native.test.mjs
- test/mcp-qa-finite-initial-material-native.test.mjs
Reuse native workerd/DO fixtures already present; a narrowly parameterized new test file/fixture is allowed only when it avoids duplicated harness and stays test-only. Name every additional test/fixture path and reason in frozen preflight/report. No production exports/test authority seams.

Native matrix: three adapters × pre-reader bad status/header and acquired-late response = six meaningful variants. Use actual native Response/ReadableStream cancellation whose returned Promise is held. Assert valid entry/acquisition, logical denial, no getReader business progression, cancellation entry, still-pending real cancellation, exclusion of a different LIVE root in the SAME retained native ctx until actual settlement, and zero subsequent IO/publication. Release cancellation in guaranteed test cleanup and observe settlement. A different root rejected earlier by bad signature/expired authority or a reader never actually acquired is not the target boundary. Fresh valid baseline/ctx per variant; no reusing a consumed positive lineage to manufacture denial. Controlled SYN acquisition timing is labelled, not a live-network claim.

Exercise success of the three changed readers with the smallest existing relevant positives (or valid baselines in this native matrix), not package-wide suites. Freeze exact names/top/subtest counts, commands, duration budget, code hashes BEFORE each dispatch. No zero-match/file-pseudoPASS, no counting sixcases+parent as seven distinct behaviors. RED may fail because required cancellation never enters; positive setup itself must pass first. GREEN samecases+affected positives+changed-file lint. Additional tests only for a named new risk or a changed/failing dependency, not blind reruns.

Qualification authorized: temporary .github/workflows/afw-native-body-retention-qualification.yml on this Source branch, push-path scoped, Node22, npm ci --ignore-scripts --no-audit --no-fund, contents:read, persist-credentials:false, no secrets, <=15min per job. One bounded RED execution then one bounded GREEN execution (prefer1job each; request evidence-based redistribution before multiplying jobs). No local clone/deps/build/test/containers/download. Existing GitHub connector supports sequential Contents API writes. Any generated String.replace replacements must be FUNCTIONS (literal dollar-apostrophe broke earlier qualifier). Remove qualifier after terminal success, no code changes while qualification running.

Before Source writes read this repository's AGENTS.md (stable instructions at283–364; dated preamble is historical). For each write set exact repository+existing branch, rawUTF8 content, current blob SHA; after EVERY write independently verify sole parent=previousHEAD, one-path delta, branchref=newHEAD and exactfileblob/content. Unknown write/interference => stop/preserve, no retry/force/main/default ref. Existing GQL blob/ref route repeatedly failed; do not revisit credentials or retry GQL. Use verified REST file-CAS fallback. Docs only append/report; do not rewrite historical test results.

## Deliverable and gate

Report path docs/superpowers/reports/2026-11-06-finite-native-response-body-retention-fix.md. Record: BASE/finalHEAD/tree, exact changed/protected paths+beforeafterblobs, actual command/output/exits/top/sub/counts/names, causal RED and GREEN, held-cancel/root-exclusion evidence, success baselines, timestamps/actualRoot-child limits, M/QA graph/hash impact, workflow/run/job/artifactdigest/7d retention and warnings. Distinguish source build/SYN proof from live operation. No artifact download/localextract.

Final contract DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED, exactHEAD/reportblob and openfindings. STOP Source writes after handoff. Root owns complete FIX_BASE→HEAD U10 package and ONE scoped re-review. You do not spawn helpers/reviewers. Final-review workflow permits ONE fixwave+ONE re-review, not five ad hoc waves; resolve questions before scope change.

operationalReadiness=false;completePackage=false;PCoff=false. No main/merge, deployment, realCloudflare resource/API calls, OAuth/OTP/token/permissions, cron/Containers/consumers, Max or supportmail. Metadata/primary docs are evidence, never authority. Continue Source-only until this bounded fix is concrete and reviewable.
