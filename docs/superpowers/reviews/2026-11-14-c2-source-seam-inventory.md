# AFW C2 launch-source integration inventory — 14 November 2026

## Scope and conclusion

Read-only public GitHub Source DATA, held in RAM. Repository: tokenizartinfo-ops/agent-friendly-web. Source examined: 327e9b7ec2182588dfb02e58b238787abb37a017. Rootdocs brief: f17dbb72d090c3f6e87423a97829abb5f91f4aeb, docs/superpowers/briefs/2026-11-14-c2-launch-source-inventory.md, blob 04995462a385440c4be0ae92d36c0fad2caba5ec. Prior exact trace: Rootdocs 0edbf37215ae6bd146c8092dcd7abb10f2eba955, review blob 77db71bf4a328df95ccb35bcf17dc4350c2d19af. Core/main were outside this inventory and unchanged by it.

The smallest coherent missing boundary is ONE source-owned finite material/capability projection: qualify the completed private setup and original owner/seed provenance once, derive the same strict finite plan and identities for observer/adoption/READY and launch, then supply the fixed primary readers and cleanup capabilities under each original native invocation. It is not three independent export jobs, a replacement launcher, or a new orchestration architecture. Positive launch material cannot honestly be delivered by completing its three throwers in isolation while observer/setup/primary custody remains unqualified.

The definitive reachable failure is lib/mcp-qa-finite-launch-source.mjs:5–13: all three exports are constant unavailable. The mounted launcher already exists. Earlier gates can reject first; no actual request was made. This is our Source integration gate, not evidence of provider failure, expired credentials, current permissions, or deployed provenance.

## Actual mounted path

- worker/independent-closure/finite.mjs:15–21 mounts finite initial preparation, private policy setup, launcher and confirmation, and inherits nominal actor methods.
- worker/independent-closure/index.mjs:188–195 creates the original five-second parent and routes prepare/create/read through runPrivateQaFiniteLaunchOperation.
- lib/mcp-qa-finite-launch.mjs:41–59 calls the exact context, material and operations exports.
- lib/mcp-qa-finite-launcher.mjs:12–47 already implements native prepare/readback, a wait to fixed launchAt, and one child-create step, with five-second steps and zero retries. Its lines 42–43 explicitly delegate actual successful provider prepare-step completion by armAckBy to C2.
- lib/mcp-qa-finite-launch.mjs:85–103 already arms control and guard, claims nominal once, and durably appends/readbacks prepared; its later SEND/ACK path is already protected by one actor coordinator and storage-snapshot commitments. Do not replace it.

## Producer → consumer contract

| Producer/reused part | Concrete consumer and contract | Remaining source qualification/custody |
| --- | --- | --- |
| Initial entry/material/residency/capsule and anchor reader | initial-entry:102–115 retains only newly inserted durable Entry; initial-material:60–87 produces InitialMaterial, ownerSelection and originalContext; initial-anchors:22–44 rebuilds capsule from original entry/claim/selector/ACK/material/cleanup records and returns current state separately | Reuse records and hashed actual bytes; no new claim, clone of owner identity, or reuse after expiry. Anchor descriptor comparison explicitly does not qualify byte custody/current primary state. Historical reader and actual deployment/owner observations remain separate. |
| Current owner phase/native receiver | finite.mjs:23–30 and owner-native-receiver:1–30 route fixed private native paths; owner-phase-context:140–159, 405–417 correlate two matching anchors/backup/journal/primary snapshots; :428–440 validates NoticeLink against original consent SQL row | Existing owner provenance is reusable. It is not already finite_prearm setup authority. owner-phase-context:464–478 projects settled closed_ui/read_consent; initial choice handler :511–536 demands clean initial state and stage=connection. Later notice handlers exist, but those facts must be connected to the actual finite-prearm selection/approval/setup path. Do not count generic owner-source stubs as the cause of this current initial-owner route. |
| Existing private setup producer/store/transport | policy-setup:106–120 reads actual setup facts, binds selection, persists/readbacks SetupContext and hands fixed admission to transport. policy-transport:109–129 uploads/activates, requalifies pointers/version, derives the real confirm_named bundle, records/readbacks PolicyReceipt | Reachable setup-native entry remains unavailable at policy-setup:133 → policy-setup-source:5–7; setup facts at owner-preparation:458 → policy-setup-source:9–12 are unavailable. Required source record is exactly {native,ownerSource,originalContext,baseline,rollback,bytes,assertCurrent}, with original native timing and actual baseline/rollback/candidate bytes. No caller T0 or setup-success flag. |
| Immutable installed receipt + actual native terminal setup | adoption-source:4–6 is consumed by http:111–112. adoption:10–17 validates {receipt,instance,observedAt}; complete exact setup instance; outputHash of {status:'installed',receipt}; source/version/seed/context/module/configuration hashes; installed/completed by T0+50s; fresh observation | Read actual installed journal/output AND provider completion/provenance. A saved receipt alone or successful POST is insufficient. This is the same material boundary as setup/observer, not a separate roadmap feature. |
| Source-owned finite context | launch:41–42; inventory:43–51 retains material by opaque context and exact ctx/env/parent identity | Must be an in-process source-issued opaque object, bound to fixed actor/storage/env/source/strict material and the unchanged original parent. No runtime registration, DTO, env-selected callback or caller-created token can supply qualification. |
| Source-owned finite material | launch:43–50 and inventory:45–51 require exact {ctx,env,plan,request,execution}. plan is a stable strict serialized finite plan decoded by trial-control:68–96. execution is exactly {intentId,controlHash,sourceRevision,moduleHash,confirmationId,observerId,admissionHash,launcherId}. request is a fixed GET capability returning qualified response envelopes | Derive plan from real setup, seed, publication, custody, resources and legacy facts. Include exact live/closed deployments, containment, selectors, launch policy, observer/launcher/confirmation IDs and finalizer run/job identity. execution.admissionHash currently receives only hex/correlation checks in launch; source must bind its derivation to actual qualified admission, consistently with existing hash(externalPlan) usage in http:292, not arbitrary hex. The inventory's actual fixed enumeration remains mandatory. |
| Source-owned controlPrimary | launch:55–68 requires exactly seven functions: admission, finalizer, subscription, process, savedEvent, effect, nominal. trial-control:104–140 validates actual identities/freshness/containment/quiescence/consent/READY/fact receipts; :296–306 uses nominal writer matching | Fixed native first-primary D1/journal and bounded provider/GitHub readers must produce these facts. Admission needs complete writer inventory, legacy containment and current consent. nominal must correlate every writer to exact native journal claims (child-primary:8–28), not exclude them using a caller list. Source must own each operation and await underlying work. |
| Source-owned guardActions and later observer capabilities | launch:59 supplies {readPrimary,withdraw,close,seal,proof,canary_restore}. trial-guard:35–39 requires readPrimary(), proof.read(), and {execute,reconcile} for each effect. observer-native:9–15 requires native material factory {controlOptions,readFinalPrimary,custody}; guard:11 has compiled native factory hook | Reuse guard/control/cleanup-store/collector. Supply actual fixed binding-qualified operations, original-parent lifetime and settled writer coverage. Hooks are source-composition seams, not instructions to accept runtime callbacks. Factory grammar exists; this inventory does not establish an installed authoritative C2 producer. Final primary must include held remote writers, per observer-native:47–73. |
| Existing observer/adoption/READY consumers | observer:29–60 first reads preview, later claims QA restore only after settled cleanup, then returns final primary. http:90–130 validates real observer instance/version/preview plus setup completion; finalizer CLI:43–49 adopts then persists admission. http:216–244 validates READY tag and successful admit-and-ready job step | Reuse these consumers. Source currently only resolves external phase seed-material (source:5–7); CLI:30–31 explicitly fails other phases before reading CF custody. A coherent source projection must therefore also provide the external plan needed by admit/poll/restore. The actual READY primary is a later GitHub fact, not a source boolean or fixture. |
| Existing launch inventory/coordinator | inventory:84–117 performs fixed full Workflow enumeration between equal control/journal snapshots, consumes a private token synchronously and serializes all SEND writers; fixed-terminal-workflows:151–165 derives never_issued/issued from native snapshot plus inventory | Keep this fixed consumer. Source supplies only qualified plan/execution/GET custody. Before creation it must show exact nominal absence, owned observer and permitted launcher state; request/DTO assertions cannot replace enumeration. No coordinator release before underlying work actually settles (:53–78). |
| Confirmation material hydration | finite.mjs:18–19 mounts existing confirmation wrapper; confirmation:41–70 reads confirmation-source twice under original parent. confirmation-source:4–6 remains unavailable | The same source material must retain immutable first HEAD/control/SEND and private confirm_named bundle, current consent and source/binding/provider provenance. Completing launch without this coupled downstream consumer would create a child unable to qualify nominal work. No extra live occurrence is justified to discover that. |

These are coupled contracts around ONE source-owned projection; table rows are dependencies and reuse boundaries, not an implementation task list.

## What can be qualified without consuming the occurrence

This inventory performed only static reads and text/line parsing in RAM. No Source eval/import, syntax check, test, build, npm, local Source file, runtime call or private artifact was used.

The next candidate can be specified and source-qualified without Entry: exact record field provenance; canonical plan/control/admission hash derivation; matching context/material identities on repeated reads; denial for holder drift, changed parent/deadline, stale/ambiguous setup output, wrong source/version/module/binding, wrong owner phase, incomplete inventories, uncertain SEND/ACK or conflicting pointers; fixed GET allowlist and envelope/freshness handling; no fresh timeout, retry or resumed authority after expiry; and full shared observer/guard/confirmation contract coverage. Any future executable qualification belongs in the authorized cloud source workflow, not a local or live consuming rehearsal. Fixtures can establish consumer rejection and deterministic composition; they cannot establish current provider state, custody or owner consent.

## Real facts that cannot be manufactured by Source

The later primary-dependent part requires the actual same occurrence: original owner decisions and Access identity; exact owned project/grant/monitoring SQL rows and immutable preparation/approval chain; one authorized seed and installed setup receipt; actual provider setup/observer/launcher instance/version/step output; actual READY run/job/step and admission; current fixed service custody; complete current pointer/module/binding and writer inventories. No current value or permission was read here. A static custody receipt is dated Source commitment, not fresh policy equivalence (custody:6–25), and token verification alone does not prove scope.

Literal Source CEILING is separately and demonstrably expired: initial-material:12,29 and historical-source:14,182–223 narrow to 2026-11-03T02:59:00Z. That makes current eligibility unavailable by code regardless of provider condition. Do not extend the date blindly, renew credentials by inference, or consume Entry merely to confirm this literal. Reconciliation must identify the factual historical/custody/timing basis before any approved code adjustment.

## Minimal next candidate boundary and preservation

Prepare a narrow contract/design candidate for the source-owned projection shared by setup completion, observer/adoption, READY-backed launch and confirmation, reusing the existing initial capsule/anchors/native owner-phase facts. It must name authoritative producers for every plan field, exact custody/transport holders for every primary/action, original parent propagation, phase-specific requalification and rollback compatibility. Keep positive source output closed until the coherent consumer chain qualifies. This is a candidate boundary, not authorization to implement/deploy or a full architecture/implementation plan.

Existing completed pieces should remain: initial material/capsule/backup, native initial-owner receiver and owner-stage provenance, setup derive/store/transport, observer and external READY consumers, finite launcher, launch journal/coordinator, control/guard/cleanup proof machinery. Old comments in build-finite-native-package:96–99 still name missing launcher/receiver; actual mounted code supersedes those generic labels. The complete package export itself nevertheless deliberately fails. Existing compiler staging/residency is not complete-package evidence.

Preserve initial Entry/once/selector/ACK/capsule and upload backup chunks; setup selection/context, own SEND/ACK and installed receipts; all cleanup/control and writer history. Exact baseline/rollback bytes, configurations, version pointers and recoverability must remain available. Unknown or issued state must reconcile its own history and cannot be deleted, reset, refunded, rearmed or converted into a second trial.

Sequence ruling is unchanged: specs/2026-11-04-single-live-pcoff-sequence.md (blob 3d7dc69c4ccc4ec8c7e3268318a1a10fc79bb238), lines 5–11. First non-consuming qualification; then ONE owned live occurrence whose attended bootstrap/owner/seed/setup → observer/adoption/readiness → launcher/timely ARM → shutdown/PC-off are phases of that same occurrence. Fixed launchAt is T0+150000; no late-handoff clock slide. No separate consuming PC-on rehearsal followed by reset/rearm. Root must actually observe timely ARM before shutdown. This inventory grants none of that authority and proves no PC-off availability.

## Exact Source pins

All paths below are at Source 327e9b7ec2182588dfb02e58b238787abb37a017; line references above are from these contents.

| Path | Blob |
| --- | --- |
| worker/independent-closure/finite.mjs | 1f1e5b95776b189fc8d952930467e6ff99c233c3 |
| worker/independent-closure/index.mjs | 2847bf94f2aeca072f66866ed1bce07e9fcd4613 |
| worker/mcp-own/finite.mjs | 15441b6c0c779f733db65a3b59a3a9e1738d19dc |
| lib/mcp-qa-finite-launch-source.mjs | 420ce9d719836df5c16e82ec67f8c0b63d03e623 |
| lib/mcp-qa-finite-launch.mjs | 3c5716076be75b28388579ce81c2773e2dec6027 |
| lib/mcp-qa-finite-launcher.mjs | 6c9e59f8d75bcb56a692bf70e50a678cfca0308f |
| lib/mcp-qa-finite-launch-inventory.mjs | 0ba74abeb7bfe992eb29ebbaa1d27991afeee475 |
| lib/mcp-fixed-terminal-workflows.mjs | 248fba0801852d803b40c3e112c6f51321744525 |
| lib/mcp-qa-finite-initial-entry.mjs | c5ae0f53bee077c693d7f0a0599bbb6347648fee |
| lib/mcp-qa-finite-initial-material.mjs | 8e2d3e4a75baabf1be5d12b6e2868ffc16599f78 |
| lib/mcp-qa-finite-initial-capsule-records.mjs | fe588c8765c06edc64cdf79ac37066dfaaf42d0b |
| lib/mcp-qa-finite-initial-anchors.mjs | 00f743593d7670e9cb358c8512a25367d29cd6ed |
| lib/mcp-qa-finite-candidate-residency.mjs | 29373312a0e60ed6ca87ca3952dba751186662a8 |
| lib/mcp-qa-finite-owner-native-receiver.mjs | e760b3579a38f1dbb73b177bb73b06d814eb881f |
| lib/mcp-qa-finite-owner-phase-context.mjs | 7eb8f28760de60f143e487eeb6988705059a0a44 |
| lib/mcp-qa-finite-owner-preparation.mjs | 152e730f83af7ef063b6b1db89f8b0a779c2b60e |
| lib/mcp-qa-finite-policy-setup.mjs | 34285e7c8ee3d9838763344edba2dcf6ce33da9b |
| lib/mcp-qa-finite-policy-setup-source.mjs | a2fcb074e71ca5f6d983c8cb8e9e7db993ef27fb |
| lib/mcp-qa-finite-policy-transport.mjs | fa1cb012d65acc0457f7263d01bb5fd88a0cb8a6 |
| lib/mcp-qa-finite-adoption.mjs | dc3d87446e0d693c24eb1f83e557bcb36ecb7666 |
| lib/mcp-qa-finite-adoption-source.mjs | ceda920e47f2709fc3200264322a0ce18c7b1158 |
| lib/mcp-qa-finite-observer.mjs | b5a5245712a08684c40c28ceac70508516950a44 |
| lib/mcp-qa-finite-observer-native.mjs | 68dcfcdbccb9060fb24a7b076618c58fe3ef02e3 |
| lib/mcp-qa-finite-trial-control.mjs | 18996dc32972e3e33726b242e508d9635147a7e5 |
| lib/mcp-qa-finite-trial-guard.mjs | 0e4a6f059c5e094409473f99fead676fcf92cd6d |
| lib/mcp-finite-child-primary.mjs | 8b44125a9421fcb538038f923ecdf986033f59ba |
| lib/mcp-qa-finite-http.mjs | 5c9977438e13ac5f1df0839c70cb9c2d8d22a03e |
| lib/mcp-qa-finite-source.mjs | 4df75093247f243828229a84654f49733cf54217 |
| lib/mcp-qa-finite-custody.mjs | efcd89509c93dd4648117ffa16693a0e0423c5e6 |
| lib/mcp-qa-finite-confirmation.mjs | 530cbc2e1051431f07764ae7718c293982a66af2 |
| lib/mcp-qa-finite-confirmation-source.mjs | 0957b05ed49b79e6d2ef5c283f23daaedfcf10ea |
| lib/mcp-qa-finite-historical-source.mjs | 855af60b2880d566f665a405cb3ab4fe8b9d369e |
| scripts/run-qa-finite-trial-finalizer.mjs | 511dfbe56634b07f9fee5a37e226822d683420f7 |
| scripts/build-finite-native-package.mjs | e8a73ce9f541993657bf8bf4c9bd8d3b02b8598d |
| .github/workflows/afw-finite-finalizer.yml | 566d597223497c5cf3c0435dd0f4e8b3ab7557ea |

No Source/ref/Rootdocs mutation, dispatch, build, provider call, credential read or local Source was performed. One unattached report blob is the only permitted persistence. All standing nonclaims remain false.

