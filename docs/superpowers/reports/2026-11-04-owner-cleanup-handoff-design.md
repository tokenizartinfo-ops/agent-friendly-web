# Owner cleanup handoff: bounded source design

Date: 2026-11-04. Architecture recommendation, not implementation or qualification. The owner delegated ordinary source-roadmap choices and opted out of repeated design questions. Root must turn the selected unit into a binding spec/plan and obtain a fresh builder/reviewer check.

## Resource and evidence boundary

- PROJECT: AFW.
- REPOSITORY: tokenizartinfo-ops/agent-friendly-web, GitHub repository ID 1347578006, verified through the connected GitHub tool.
- ENVIRONMENT: GitHub source/docs only.
- ORIGIN: https://delegated-canary.agentfriendlyweb.dev, referenced, not contacted.
- RESOURCE_TYPE / RESOURCE_ID: Git branch docs/finite-owner-cleanup-design-20261104 and this report.
- ALLOWED_ACTION: create the separate docs branch from c12d109395f9c1d386cf665d7eea5e49c12e311a and add this report. Product source is read-only.
- ROLLBACK: revert this docs commit or discard the unmerged docs branch. No runtime rollback is required because no runtime operation occurs.

Read source is pinned to c47d241476e642aeb6873a9f6f5f33dc10e7ff9e, the then-current request-retention candidate. Its tests/review were in progress and are not certified here. Factual reader e38b1ef4c20a1672a2e9fe49130ae25d256e4a98 / 169PASS is supplied root evidence, not a newly run verification. Relevant AGENTS.md instructions and the 2Nov initial-cleanup and 4Nov request-retention specs were read. Only GitHub connector reads/docs writes were used; no local clone, files, dependencies or builds.

## Recommendation

Keep ONE preparatory cleanup owner on the existing fixed actor/native alarm. Extend its durable, fixed-scope responsibility before any connection publication can enable OAuth/read or notices. Later transfer the SAME native alarm to the already-existing nominal guard through an explicit durable handoff. Do not create a parallel alarm owner, Workflow, namespace, new permission system or generic provider engine.

The smallest next reviewable source unit is **preparatory cleanup enrollment and forward fencing**, with an exact consumer in createFinitePolicyTransport.run. It must leave the actual owner HTTP pending and the source/forward seams unavailable. Enrollment alone is deliberately insufficient to permit provider effects. The remaining two bounded dependency units are specified below so this does not become an open-ended infrastructure series.

## Actual integration gaps

1. lib/mcp-qa-finite-initial-cleanup.mjs restores only the immutable initial closed_ui deployment after exact initial SEND/ACK/completion and current pointer/configuration checks. It rejects nominal HEAD, changed profile, foreign deployment and unresolved activation. Its fixed operator/workflow/container/backup/deployable-version gates remain required.
2. lib/mcp-qa-finite-policy-transport.mjs creates separate connection upload/activation journals for connection, notices and finite. The initial alarm neither recognizes their exact successor chain nor owns reduction of permissions created after those publications. Replacing the candidate UUID check with “current stage” would silently widen authority.
3. lib/mcp-qa-finite-trial-control.mjs prepare writes nominal HEAD and setAlarm(nominal C0). lib/mcp-qa-finite-trial-guard.mjs arm also owns that alarm. worker/independent-closure/finite.mjs first invokes initial cleanup and only delegates on null; initial rows plus nominal HEAD currently produce admin_pending. Calling nominal arm after initial arm therefore is not a qualified handoff.
4. The nominal guard requires a fully derived plan, original consent/grant, actual native constructor and cleanup proof. Those do not exist before the first owner connection publication. Its existing source installer is not proof that a native factory is installed or usable.
5. Request retention solves a separate lifetime problem. The actual one-use WeakMap admission in owner-preparation is consumed by policy transport, then adoptFiniteOwnerRequestStageWork changes the same ambient entry in place. Neither the retained set nor enrollment authenticates a business admission. Durable history cannot reconstruct that consumed admission.
6. The factual initial reader returns the capsule's preconnectionId beside source; the generic prepareFiniteOwnerChoice first GET currently generates a fresh opaque preconnectionId. Actual source integration must bind the capsule/M identity through a private native continuation, rather than silently treating that new random ID or a caller parameter as the original M selector. This is an explicit later source-composition requirement; do not mount the stub to conceal the mismatch.

## Clocks: use current code, preserve original limits

The 2Nov spec's five-minute wire description is historical. At the inspected revision, buildFiniteInitialUpload in lib/mcp-qa-finite-initial-upload-wire.mjs writes AFW_OAUTH_PILOT_EXPIRES_AT = I0 + 900000; the factual reader requires exactly capsule.C0. This report proposes no expiry change.

- Initial technical eligibility: I0 + 300000; original initial forward parent and its children remain unchanged.
- Preparatory owner window: starts at original I0, expires no later than initial C0 = I0 + 900000.
- Initial cleanup: original C0, C1 = C0 + 180000; deliveries at C0, C0 + 60000, C0 + 120000, each at most 30000 and children at most 5000, clipped to original C1/custody/source ceiling.
- Each owner HTTP request has its own actual original 30000ms request parent, shortened by identity/window; child/proof ancestry cannot start another parent. An alarm invocation is independent cleanup execution, not a renewed owner permission.
- OwnerPreparation.commandBy = min(permission, Access, approval, source window, preconnection expiries) - 510000. Keep this floor.
- Name nominal times distinctly: nominal cleanup C0n = T0 + 240000, C1n = T0 + 420000; nominal final observation R1 = T0 + 480000. They are not the initial C0/C1.
- With source expiry capped at I0 + 900000, commandBy is at most I0 + 390000. T0 must be strictly earlier; consequently C1n < I0 + 810000 and R1 < I0 + 870000, before the initial alarm. Shorter actual identity/grant expiries tighten these limits further. A viable nominal plan must move the one alarm earlier through qualified ownership transfer, not wait for the initial C0.
- launchT0 + 150000 and all existing launch boundaries remain unchanged.
- Source ceiling 2026-11-03T02:59:00Z is expired and remains expired. No current live operation is eligible. Synthetic clocks prove source contracts only.

## Unit 1: preparatory enrollment and forward fencing

Purpose: establish one durable obligation for the original capsule and exact first owner stage before any publication SEND; expose every incomplete enrollment to the existing alarm without losing the initial restoration obligation. This is the next builder-sized unit, not permission to open the UI.

Suggested files and signatures:

- New lib/mcp-qa-finite-preparation-cleanup-records.mjs: strict bounded own-data canonical records, separate prefix afw.finite-preparation-cleanup.v1:. Export sealFinitePreparationCleanupRecord(kind,input), encodeFinitePreparationCleanupRecord(kind,input), decodeFinitePreparationCleanupRecord(kind,raw). These are codecs only.
- lib/mcp-qa-finite-policy-transport.mjs: add PRIVATE nested async enrollPreparationCleanup(childLease), using the already consumed admission, source and originalLease captured by run; no exported mint, supplied success object or configurable callback. Invoke only inside the existing in-place owner scope after exact source/preconnection/approval/journal qualification and before upload.issue or activation.issue.
- New lib/mcp-qa-finite-preparation-cleanup.mjs: fixed factual readPrivateQaFinitePreparationCleanup({ctx,env},originalLease) and fixed runPrivateQaFinitePreparationCleanupAlarm({ctx,env}) integration. No URL/token/pins/clock/capability/approved flag arguments. The eventual alarm implementation is Unit 2; Unit 1 only classifies its records and preserves closed_ui recovery.
- lib/mcp-qa-finite-initial-cleanup.mjs and worker/independent-closure/finite.mjs: recognize the distinct preparatory obligation through a fixed source callgraph. No generic routing callback and no ordinary index.mjs behavior change.
- Native tests: test/mcp-qa-finite-preparation-cleanup-native.test.mjs plus existing initial-cleanup, owner-request-retention and policy-transport tests.

The immutable enrollment binds the original capsule hash, initial plan/arm/activation-completion hashes, entry/material/source/tree/current QA identity, actor/physical existing resources, original I0/C0/C1, captured token IDs/expiries, exact fixed rollback manifest, original M preconnection selector and actual owner preconnection/stage-approval identity. If the currently generic owner ID differs from the original M selector, there must be an explicit immutable source-derived mapping, not an inferred equality or new occurrence. Prefer binding the actual owner composition to the existing M ID when that composition is implemented.

At most one enrollment for the capsule. Do not modify the initial Plan, capsule, activation journals or backup. Reuse the initial delivery state/counter and existing C0 alarm for the preparatory period; do not start another three-delivery budget. Persist enrollment through one native transaction that rereads original plan/state/capsule, excludes nominal HEAD and cleanup already begun, and confirms the original alarm. Preserve any preexisting unrelated key/alarm instead of replacing it. Require the actual final transaction return, sync, exact readback and getAlarm before writing an immutable enrollment ACK. A failed/unknown ACK blocks the forward continuation permanently for that consumed admission; a surviving obligation still protects cleanup.

Unit 1 must NOT allow publication merely because enrollment ACK exists. Its exact transport consumer remains pending before any provider SEND until Unit 2's fixed cleanup implementation and its gates are integrated. This is a code boundary, not a caller/env readiness boolean. Actual host GET/POST remain pending before prepareFiniteOwnerChoice and consumeTicket.

Unit 1 closure criterion: an actual consumed stage admission under the original retained request can durably enroll once; clones/replay/foreign roots cannot; every enrollment uncertainty produces zero provider POSTs; reconstruction still owns the exact initial closed_ui cleanup with unchanged counters/deadlines. The source-only transport tests may exercise the real private admission via genuine synthetic owner/ticket fixtures. They do not expose fixture approval as production capability.

## Unit 2: complete preparatory cleanup and qualify its consumers

Implement cleanup for the three preparatory profiles and partial owner permission states, using the enrolled original selector and the existing primary stores/native bindings. Keep source and HTTP mounts unavailable until this unit, its native source composition and the required remaining gates are actually qualified.

Do not invent a second publication journal. Read exact existing ConnectionSend/ConnectionAck/ConnectionReceipt chains and bind them to the enrollment/stage approvals, original module/configuration, baseline predecessor and actual provider primary. Preserve separate initial and policy journals. Add actual settled completion evidence at the fixed connection writer if its present ACK/receipt does not establish physical settlement of the whole issued operation. An HTTP ACK alone is insufficient.

Cleanup categories must cover:
- Initial candidate still selected, no connection SEND: existing exact initial restoration remains available.
- Upload SEND/ACK but no activation SEND: reconcile only the uploaded material; never activate it; restore only the exact still-owned initial pointer.
- Activation SEND without exact settled completion: no blind baseline restore or resend; admin_pending with factual reconciliation. A later baseline snapshot cannot disprove a late activation.
- Exact installed read_consent / notice_consent / finite_prearm chain: after all its issued forwards are fenced/settled, revoke only the same enrolled permission identities and restore only its exact current owned deployment to the original fixed historical closed baseline.
- Foreign pointer/configuration/owner/project revision, orphan grant or missing linkage: preserve evidence, stop forward progress and do not adopt the foreign resource.

The existing createOwnPermissionsOnlyReduction and createOwnPermissionsOnlyObservation in lib/mcp-own-permission-withdrawal.mjs can be reused only after the actual original monitoring-consent tuple exists and matches. They require that row even for grant reduction. They cannot cover the earlier **read grant exists but no notice consent exists** state. Do not fabricate a sequence/revision, manufacture a monitoring consent, or invoke the historical Container close host merely to reuse this helper.

Add a narrow preparatory reduction path for exact authorization/read-grant-only states using the same existing primary DB and original authorization/grant linkage; SQL must enforce the original cleanup deadline and exact owner/project/client/resource/authorization identity. It must be able to reconcile a grant commit whose follow-up DO GrantLink ACK was lost through the actual issuer's durable intent/result correlation. A scan by owner/client alone is not enough. If such correlation is unavailable, that forward issuer must remain unavailable until added. This is a concrete consumer obligation, not an arbitrary-admin drain proof.

Consent, authorization and grant forward seams must be fenced BEFORE their actual D1 writes, not only by the current recordFinitePreparationGrant post-write recorder. The same applies to notice consent. Retain actual work/body/cancellation through timeout and settlement, use SQL commit deadlines where applicable, and record terminal issuance/settlement facts that survive isolate reconstruction. In-memory outstanding sets alone do not establish cross-isolate absence. Use the existing fixed native binding/callgraph; no new approval token framework.

At original C0, freeze further preparatory issuance durably. Reduce exact monitoring consent if present, revoke the exact read grant if present, and invalidate/fence the exact pending authorization path so it cannot mint a late grant. Observe primary results separately from execution. Issued unknown reductions are reconcile-only; preserve their journals. A definite absence is valid only with the original issuer fenced and its actual issued work settled, not from “no GrantLink”.

Only after same-scope forwards are settled and permissions are reduced/absent may the fixed baseline restoration POST be issued once. Preserve the initial baseline chunks/configuration/resource identities, last-100 deployability check, actual primary pointer, inventory and credential gates. Cleanup receipts must state exact outcomes and remain operationalReadiness=false. No Container/process absence may be inferred from permission reduction; unexpected nominal/process activity blocks this preparatory path.

The pre-approval host check must establish the fixed cleanup implementation, original plan/alarm/custody and all relevant source gates before showing an actionable form or consuming a ticket. After genuine stage admission, its same-request continuation performs enrollment/fresh checks before publication. These are two placements of the same cleanup contract, not two authorities. Enrollment ACK cannot bypass actual identity/consent; genuine admission cannot bypass cleanup. Source/forward qualification and the original-M selector wiring remain explicit requirements before removing the host's pending boundary.

Unit 2 closure criterion: every reachable preparatory prefix, including cancellation and lost post-write linkage, has exact bounded reduction/restoration or explicit preserved admin_pending, with no unsafe resend or false completion. Provider, Access/custody and external delivery remain synthetic in source tests.

## Unit 3: atomic handoff to the existing nominal guard

After actual owner preparation/selection and policy setup exist, derive the exact existing nominal plan and cleanup contract from the original source/admissions. Verify its guard/native factory can cover all inherited preparatory permission identities, same physical resources and original rollback, plus its nominal process/subscription effects. Do not substitute a prepared DTO for that factory or guard readback.

Use one native transaction to install the exact nominal control/guard ownership records, append an immutable handoff record referencing enrollment + complete predecessor journal hashes + nominal plan/control hashes, and set the ONE alarm to the original C0n. Refactor the existing fixed control.prepare/guard.arm integration as needed so they cannot separately overwrite the initial alarm before this transaction. Do not recreate HEAD/guard from a report or widen their native pin checks.

After actual commit, sync and exact state/alarm readback, persist the handoff ACK. Only that same surviving private setup continuation can proceed to nominal admission/launch; history cannot recover its forward authority. If commit/ACK is unknown, no nominal launch. The alarm can still inspect the committed ownership record after reconstruction and run the exact successor cleanup. If the transaction did not commit, the original preparatory alarm remains the owner. Never delete initial/enrollment journals or run both handlers.

Update only finite.mjs dispatch to recognize the exact qualified handoff before the initial handler's current HEAD-conflict path. No handoff plus nominal HEAD remains a conflict, not fallback. Ordinary index.mjs behavior is preserved. Do not reset the initial or nominal delivery history. Each retained plan keeps its own original clock; the handoff proves the inherited obligation is covered by the earlier nominal cleanup and final observation. QA restoration remains the separately qualified external finalizer's responsibility, not publisher057.

Unit 3 closure criterion: reconstruction at every transaction/sync/readback boundary selects at most one exact cleanup owner, never strands the original obligation, and cannot launch nominal work after an uncertain handoff. The nominal guard retains its actual permission reduction, physical-close/seal/proof and canary-restoration requirements.

## Acceptance matrix for the selected design

1. Actual native storage transaction retry/final throw, commit-unknown, held/rejected sync, lost getAlarm ACK, holder/token/source drift; never positive forward readiness or a second enroll after uncertainty.
2. Original root/registered child/proof lineage, retained late body cancellation and pending D1/provider work; same entry/promise set survives admission adoption. Cloned/foreign/read-only admissions cannot enroll or publish.
3. Immutable capsule/M/A/originalQ facts, expiry equality and original selector; no caller-authored source/capability DTO. No timestamp reconstruction, new30s parent or altered 510000 floor.
4. Restart before/after enrollment; zero/one/three original alarm deliveries; delayed alarm consumes only original remaining slots. No initial record deletion or fallback through conflict.
5. Every partial publication and permission prefix listed in Unit 2, including read grant without notice, authorization pending, notice ACK lost, late grant commit, provider activation still pending, known unchanged pointer and foreign pointer. Exact deadline SQL fences and physical settlement failures are tested independently.
6. Nominal handoff rollback/commit/ACK ambiguity, earlier C0n, original C1n/R1, strict HEAD conflict and one-alarm dispatch. No double restoration, reset or arbitrary delegation.
7. Existing initial restoration, historical writer uncertainty, owner retention, profile, nominal guard and finalizer tests remain intact. Actual host stays pending in Unit 1 and any unqualified composition; stubs/routes remain unavailable.
8. Cloud Node22 native fixtures, existing lock, scoped RED/GREEN and fresh review; one exact final compiler/residency build only when changed runtime graph warrants it, keeping existing size limits and no compiler/fs in runtime graph. Clearly label manual fixture alarm invocation and synthetic provider/custody versus real native storage reconstruction.

## Alternatives and limits

Immediate nominal guard reuse is smaller in lines but invalid before the grant/notice/full plan exist and conflicts with initial alarm ownership. A new Workflow/resource adds create/ACK/unknown machinery and another owner without solving partial grants. Broadening the initial candidate check alone restores bytes while potentially leaving live permissions or a late activation. A single all-stages implementation is hard to review and hides crash boundaries.

The selected three-unit sequence retains the existing owner/alarm and makes the only new persistent records explain original responsibility and handoff. Unit 1 is source infrastructure with an exact transport consumer; Units 2 and 3 are finite, explicit completion gates. Do not label Unit 1 cleanup-ready or repeatedly add capability/proof registries.

Concrete unresolved source blocker: exact recoverable issuance correlation for pre-notice read grants/authorization and its fixed native forwarding path is not established by the inspected post-write recorder or unavailable stubs. Unit 2 must establish that correlation or continue denying those forwards; no additional user decision or credential is required to specify/test it. Nominal source constructor and ownership handoff also remain implementation work. Runtime source ceiling is independently expired.

No actual Entry, provider requests, keys/OTP, deployment, cron, monitor, other project or Max action is authorized by this report. One consuming occurrence remains reserved for the coordinated PC-off trial, with no separate full PC-on rehearsal. operationalReadiness=false; completePackage=false; PCoff=false.
