# Task3 review package — BASE through complete final HEAD

Repository: tokenizartinfo-ops/agent-friendly-web
SOURCE branch: feat/finite-native-cleanup-20261101
BASE: ffe25a1e77a1d93d5c03018ada36355b19c91564 / tree43f53af19e427eade3ab6d4f90ac91ef1380f627
HEAD: df20c0f8b8e2fc1b03cdd7e122302c5dc8a62f4e / treef7229e5c4c323b147120d001baa1183a874728da
Qualified source checkout: d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 / tree4e30df2ae4abe2bf087b123823185fa6ab082fa8
Prepared by Root from connector reads only; no local git/build/test. Full in-memory U10 diff, not HEAD~1; source checked complete recursive trees, no truncated300-file assumption. Commit collection122/122. No source write after implementer final handoff.

This is a TASK3 spec+quality review, not final whole-branch merge review. All seven code/test files match qualified D11 exactly. Remaining changed files are report/progress, and the temporary qualifier is absent. Every other blob in full recursive BASE/final trees is identical. Code artifacts refer to D11, not later documentation commits.

## Concerns and Root rulings carried into review

Implementer status DONE_WITH_CONCERNS. Root has addressed scope/provenance and read primary qualification logs; these rulings and limitations remain visible and challengeable. Do not downgrade any issue because Root or the report supplied a rationale.
- 167 positive tests at D11: A23/B23/C121, exact names/counts/exits independently reconciled. Original run42236775067 remains CANCELLED: C reached15min during first remaining control after all positives. Earlier42232085255 remains FAILED on two observation-boundary cases. Focused corrected observations passed42235796244, without product clock changes.
- Explicit plan-verification exception: scoped completion42240487416/job127969155895 checks out EXACT D11 from triggerf29804ab; before/after HEAD/tree+seven HEAD/working hashes identical. ONLY2 exact expected-failure controls+eslint7; both controls1executed/0PASS/1expectedFAIL/exit1/targettrue/0cancel-skip-todo, lint0. Trigger and checkout distinguished; child GITHUB_SHA set to actual checkout for truthful fixture testRevision. No single-runGREEN or repeated positives. Cost if wrong: any provenance difference invalidates composition.
- Callback retry residual variant: static/compositional proof under native transaction assumptions, NOT injected dynamicPASS. Protected helper entered is outside callback/set synchronously before first await; committed===true and absorbing failure; caller awaits prepare/enroll/recheck/ACK/recheck before upload. Report names exact lines/blobs/assumptions. Verification exception, still reviewable.
- TDD chronology: principal genuinely RED before implementation; most later adversarial negatives follow implementation. Two single-guard in-memory negative-only mutations are supplemental causal controls, never historical TDD. Positive M and source are unmutated. Mutant compiled QA hashes distinctly labelled.
- Access valid shorter on entry narrows original ceilings; negative crosses expiry before TicketUse, zeroTicketUse/SEND. No arbitrary min-JWT-life. After consumed state preserve facts, deny next effect.
- Extra/duplicate-header matrix applies to five x-afw-finite-* protocol fields. Existing M whitelist remains; unrelated HTTP headers are not transport authority. No new reject-all wire contract.
- Miniflare dispatch adapter: official pinned upstream Host normalization applies only after settled adoption, M bytes unchanged. getWorker bypasses that entry normalization, so actual downstream uses dispatchFetch+native upstream. Signed wrongURL-origin check before/after adoption has no upstream; foreign Origin checked with upstream. Report must not claim arbitrary URL host is preserved after normalization.
- Original holder references captured once BEFORE first P10 I/O incl metadata.id primitive; no per-pair recapture laundering. New wait takes thunks so guard precedes operation invocation. Private local continuation; no authority DTO/callback API.
- Live feasibility PROMOTION gate: final synthetic lab received about1.877GB JSON payload/1768response observations; request snapshot1754 includes1736Cloudflare calls with phase/probe differences explained. Root official quota documentation says default1200/5min peruser or account token, cumulative; actual live bucket/rate/latency NOT tested, no actual429. No optimizer/relaxedchecks/clocks/quotaincrease in Task3. Assess code on merits and flag if this undermines Source correctness rather than accepting the promotion label.
- Inherited M1 original SDK two-failure cause unknown/not reproduced; M2 RPC/toolchain/deprecation warnings disclosed, ownership uncertain. Warnings are review findings per template. M3 own retention composition and M4 wrongprofile proof are described; do not silently close ledger.
- Protected P1/P2, SDK/schema/store/journal/authority/profiles/builds/bootstrap/initial artifact immutable. No runtime/OAuth/permissions/tokens/cloud provider operations. Readiness/completePackage/PCoff=false.

## Global constraints copied from plan

## Global Constraints

- operationalReadiness=false; completePackage=false; PCoff=false.
- C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.
- M y QA conservan root original <=30000 ms. Child <=5000 ms, siempre recortada al parent restante.
- No refrescar identidad/Access ni I0/C0/C1. childDeadline sólo narrowing del original; nunca now+fresh.
- El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.
- Sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos.
- Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Ningún provider/custodia/roles/OAuth/permisos operativo nuevo.
- Root, child, native holders y Promises reales se conservan hasta settlement; timeout/abort no son physical drain.
- Ninguna admisión persistida/reanudable, source factory, DTO de autoridad, callback aprobador, raw pair, allowPending, lector público ampliado o HTTP genérico exportado.
- Faltan datos nativos: fail closed. Rutas finite nunca caen al writer ordinary, incluso con QA ausente o phase no soportada.
- Notices no requiere NoticeLink como gate nuevo; finite sí. Link presente se correlaciona; primera connection exige snapshot.noticeLink=null según el contrato aceptado que entregue root.
- Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.
- Esquemas/DDL/store/journals/records, SDK/OAuth ordinary/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler y build scripts quedan protegidos.
- GitHub cloud únicamente para trabajo futuro autorizado: sin clones/deps/builds/tests locales, main/merge, runtime ni acceso a Cloudflare real. Este plan no ejecuta tests, compilaciones, Actions o providers.
- Qualifier SYN futuro: como máximo tres jobs independientes, <=15 minutos por grupo, sin secrets, permisos sólo contents:read. Root fija BASE, alcance y qualifier antes del primer dispatch; ningún workflow nuevo implícito en el filemap.
- No repetir suites aceptadas sin riesgo del delta; no sleeps/retries para ocultar fallos, no ampliar plazos ni quitar rechecks para lograr GREEN.
- Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre.


## Commit list

- b0952eab3442cea9b481e33ad11e71f3363ec90c test: require native first connection from original signed choice
- 1945fdccae8fa4f1a0a27f3d780d8be3c71c7b08 ci: run bounded native first connection causal RED
- e8df40b6a34898034589599d157e4f64970106d7 ci: remove qualifier before connection implementation batch
- a406d07d59cf984aec5237d65a4071c7031ba575 feat: route fixed choice receiver to native connection continuation
- 0b35e614739fe2cfc191275e77bb474d525171eb feat: admit original owner POST through fixed factual choice seam
- f5e66b8fca1b2cf218f5cbb42261087ebb804c75 feat: produce native first connection from original owner approval
- bdd6f9ef66cf30344c04fb01cd923062ad9e1607 test: retain actual SYN uploaded versions and activation pointer for connection
- 12269f51c4ed56a1f6ff0f14fb1afd706a2e3311 ci: measure original native connection continuation
- 0a04af1f0ad3053376d771b741bd7295a6aebb1d ci: remove qualifier for causal connection diagnostics
- 1ebdd8d37bbfcc79185d493234455c9753c94584 test: observe original connection clock failures without replacing native work
- 898d8c4d6ead67a734c11d6452eee281bd8389c7 test: capture passive connection SOURCE frames and complete pair timings
- baf349b8c309e8a423fd2fc1ff7ec2aef864256d ci: diagnose measured original connection failure
- c4db57a1866d1c72fe9d84e4abb75ebb9b3cab65 ci: remove qualifier before downstream test composition
- 172243a58648337fa13755f008c5aac107e8edfe test: expose only factual context and retain real choice cookie for downstream
- 4e15b6e8b60774133689890f93c7baa0fdbc98c3 test: adopt actual connection config only after original POST settles
- 8d349ba0a1c21e2a3e56e5660d4234d9eee822da test: require actual connection predecessor through OAuth MCP D04 and NoticeLink
- 8bfa84f7161ca61da2d99e71fd28aaa8d16d75c9 ci: inspect native POST failure and downstream composition
- 00feb6cd482a347e1f08359a995babf57314481c ci: remove qualifier before receipt codec fix
- 46bd8c345d93d7e8ce692dbb7d97b778f2cdc255 fix: seal native receipt with existing installed record purpose
- b1fc844a6e23b8bb8dfe8ce645447c6f2695b170 ci: verify installed receipt codec and actual downstream
- e347e49b5ffd703f955171739d8817fe4780054a ci: remove qualifier before native mount assertion fix
- aee9715716f77dbb7ed5eaefcd7066758e7d5424 test: verify native M script input before Miniflare module conversion
- 055e205d4fbb33cdab5a01258a86d86406ef2918 ci: follow actual native connection into downstream
- d0542a904d58b378cd0c75195dd4275631a9341f ci: remove qualifier before causal negative test batch
- 7f8a984534a2f6ebb63241764966072a55456288 test: control actual retained native uncertainty without approval probes
- d5d484d1959420a1ac78c3e1299c0e8feccc22c7 test: cover native own continuity unknown results and retained settlement
- 866bf199531e4691f0e5311d4a6913eecb7ad6b9 ci: verify exact M native service-binding downstream
- c8a78a1f9527e4472e197fc6f7d56f542471f5da ci: remove qualifier before bounded negative and regression batch
- 11569fcdeeb9bb24a5d763887a9f92e140dc1ba4 test: release retained work only through original invocation DATA controls
- df2aade5481f140205486e67f4a0c17ace671f93 test: measure exact connection native IO and original effect clocks
- bac53943c11efb3c9517e998afeb3f5af19cd47e ci: qualify native causal negatives and bounded accepted consumers
- a0617b8f6aea6ed347cd0fd208c5775d42c03fa3 ci: remove qualifier before pinned native upstream principal
- 671e907b1cbad4397adfb6978678375da8a19ad3 test: preserve exact signed choice identity for causal origin counterpart
- 8bfdc1c68f818cef2d7e605a1d6f14ccb5901143 test: normalize downstream Host through pinned native instance upstream only
- e866bd5969efc8760f9b3ed2dd8b6ac923b665f9 test: prove signed wrong URL and foreign Origin at native normalization boundary
- fa45d1556fb7914e6f6e73ce718c9c6dbe0632f2 docs: preserve Task3 causal checkpoint and current native harness discrepancy
- ea759c689070d878d357c42a87a9cf5d5dccae7a ci: verify pinned native upstream with exact initial M bytes
- 30276fb216311a0063af521f1a6fe54d1692cde2 ci: remove qualifier before current-history and identity causal batch
- 21ba7bf6a55dc7ba8b07a4a78d50e5911f609fcb fix: preserve unique original OAuth observation marker beside connection handler
- 93fd5cdfb6bf6c9878897201fb4bbed5757ac8d4 test: preserve native Access expiry and actual actor restart boundaries
- 57ec6284fa8ac1c3d390b7c5db5f10c7ada6a1db test: sign exact current Access variants without changing source authority
- 7d7de3b88024598b1b21c42d4b68a2dba1ce1f20 test: cover signed identity choice recoverable source expiry and consumed history
- 4d0282ce991f11b1512cfed47ca01861aa4d0827 test: keep both current snapshots and historical deadlines factual
- 8b3f0faf63793a84614f4e28d1b648a94af7784c ci: qualify current-history identity and repaired focal observation groups
- 8fc4f889faddf73edf7070731eadeeead4915471 ci: remove qualifier before exact entry dispatch and native proxy refresh
- afbf18ddf8a3209a2d5ecf9080364f81a2b33342 test: retain native instance entry and refresh same D1 proxy after config adoption
- 4fc92a228eb2d401cdb23f1fa427b8763f1be3a9 test: send exact MCP request through configured native upstream entry
- c49e4effe9ad4376736b7c1b9ecf22a7697ab0aa ci: verify native entry correction and recovered current source handles
- 668be1a84759f1e9cb033fe75dfe77e4eb99aa1d ci: remove qualifier before causal correlation and single-guard controls
- 208934ac3821f4819588d7c484d67c5610dba30f test: reseal actual completed data and isolate negative-only guard controls
- da3325126f8911b3ef7061611eaba8e9a873ddfa test: label negative QA mutations separately from exact positive M lineage
- 7e4e850b4be363f0a60e6484020a8b98dd41a05f test: prove completed fact correlation recorded ownership and preserved telemetry
- 48c4efa6a4d4ea6b24c9550374f3692828b4bac1 ci: qualify precise correlations and isolated negative mutation evidence
- db90dae7bc5b168d9326f5df229135039359eb1c ci: remove qualifier before remaining original lifetime boundaries
- 35d592c9c8df36f72d3904d33b760e8e6defe334 test: retain original body SQL ACK receipt and holder lifetimes with actual IO metrics
- d4997c6adce593f6f8c926ccb4819b7369cc6069 test: observe native body cancellation and separate fixed provider phases
- 476f946d2fc8bb97de3b53ef8577605bbdf6ff3e test: fence original body parent ACK receipt SQL and holder boundaries
- 935d202fe5f5d2dba9b351abdae7d8d025ac5c6d ci: qualify remaining native lifetimes and exact positive telemetry
- 7fb2e7d31c8a47b38ac22db37ea4f3d6d4517fdf ci: remove qualifier while preserving active lifetime checkpoint
- 8a818524591acc2bb12b8a8ac9fbe3158b6bca8c docs: preserve actual native causal checkpoint and conditional API feasibility
- 32668d5359a53166b60efce037b21b842281baae docs: checkpoint native Task3 progress without claiming final acceptance
- 918f54c1b4baca3eba6e0ab98c4255ce0a5589bc test: isolate in-request holder drift and genuine compiled profile mismatch
- c9edd694487eba988b8bb55b5af5a1c1495f2725 test: measure fixed provider response bytes and optional negative profile code
- ec596cff874ef9b3c41748ca1f64e971f7485dda test: qualify signed protocol metadata config secrecy and receipt lineage
- f267ee6e7044883a0d1bdf873010a180f5951202 ci: verify remaining protocol profile source and original-clock correlations
- 3469139f5da474722f5d0f53ff5648142f87e67f ci: remove qualifier before original-holder causal RED
- 9794b4cca244e4d9613625ceb482eea238de1d55 test: change only original native method holders after actual upload result
- 5511c073b588dee542fdb9c424f11cc1c70d20c7 test: require original DB node self and KV holders across source pairs
- e08a45d1741cc475099c1b72c5afa11ccd93c4a3 ci: demonstrate original-holder drift before connection guard fix
- 7be8f9e2f3b520148f650d178f1cb0a8dce2e297 ci: remove qualifier before final version-holder RED and native proxy check
- 774968aae56ef2ea557fbc2041a7b14e3a6536a3 test: fence original metadata identity before any native acknowledgement
- 9856eab4aaa0c877c28965102674a44899eec4db test: refresh optional negative profile proxy at every native mount boundary
- d22789dcbc2ca878bb71267ebd336d3019ec65a5 test: require zero next SEND and ACK under original holder drift
- ef3fa9b614f74b37ff67f6a7d424a8227607c0fb ci: demonstrate original version ACK fence and genuine profile protocol boundary
- 7446aff272e5eef215d6b020ee8177ea1e3ab30b ci: remove qualifier before original native-holder fix
- e05089a0549415f2ff3ecb6ca82e2906223b1da2 test: keep malformed protocol observation passive before product validation
- 0526f12d94325676d53031f45b9c20c0aaa4a61b fix: retain original native holders throughout connection publication
- cd4d6c1da749d635607e6d57959eefaf89091e18 ci: qualify original native-holder fix and unchanged positive clock budgets
- 3882a7cc900433d17e81a99eb8cec4a5c54d392c ci: remove bounded qualifier before original-holder guard batch
- 024a08ae6274eeb2a1ced141380f177aa33e0b41 fix: guard original holders before invoking continuation work
- 753ff0907eab15db33fc7f834b2a0ee6f29bc723 test: count every post-drift native read invocation
- 277e64d5a739463ab9ab1c25da31eb5c60606c9a test: forbid factual reads after original holder drift
- 1cf62cdd5265e7ab2f313ffc13aa8321281af3c9 ci: verify deferred original-holder guards and exact native principal
- 0c8c8f9cd3edae9c28a4195b09be41cfac680610 ci: remove qualifier before completing causal readback variants
- d02ad5dfd05611e5beefed0399bfd980e343f147 test: corrupt actual publication reads without altering registry artifacts
- a4ae40124907ce1f03792ed6f0808cb0e2c69363 test: assert each upload and activation readback denial causally
- f7f73a187e49465f4ec89ef8562a96f3aefcfdd6 docs: preserve native holder causal proof and remaining matrix checkpoint
- b7794153b7673c598933820440f2bdbe42d4cd27 docs: checkpoint Task3 holder proof without completion claim
- 010c92e998d5774656513d0f9a874a94b8c3eaeb ci: qualify eight causal native publication readback variants
- fd757be15c119c531953f9da92ae8cb9fd48fd4c ci: remove qualifier before final ticket correlation matrix batch
- c9ec67266c12844318b53acb716aa52e0ad0cbbd test: mutate actual choice ticket facts with valid codecs only
- e5fa95364648a2ab3afe6fd344b22d4b53205f07 test: preserve ticket lineage across six causal correlation negatives
- 41f33e44386713b9b4310a4f6f595d88a46fd73c test: snapshot causal counters before explicit failure diagnostic read
- 88090aa24697a28d1e9e338925617d628a396863 test: separate request-native reads from later explicit diagnostic probes
- f9e166bd0809cd4164d06a6f0ef2a2cb4ab4001e ci: qualify actual ticket correlations and source-holder counter scope
- 36ba881471a1a6cca6db57862b831706100c425a ci: remove qualifier before precise codec-valid ticket control fix
- 3697c5392f86d68a894b2be6af8624cf06c3d97a test: reach exact ticket correlators with valid action connection reference
- b67453120328c9a7a6c07e1306de8c67a261de3a test: assert targeted ticket and snapshot predicate reached after codecs
- bf9268f135a3b988e1d6c458ea3088e9d83a54b8 ci: verify codec-valid ticket predicates and unchanged source-holder refusal
- 31ede7d2d0a7ee90828042c8cad17a30a6eaf60d ci: freeze final code before exact bounded qualification manifest
- 6a5a9e5f272619e96160cd0e3e8a5e686fb01b1f docs: freeze exact sixty-case native matrix and bounded qualification evidence
- db9effbfc0acea4ef287113df15e25f68ae4f439 docs: preserve Task3 exact final matrix before qualification
- bbb09fca038c3ca09e8f02f07df558378b3fd843 ci: run frozen sixty-native-case three-job qualification and scoped regressions
- 09813e0ced14be940398e5aae3c6964377e00b72 ci: preserve incomplete qualification before causal observation-scope correction
- 18463127ae3efd772ed03a163c35590865dd3e2f test: timestamp actual connection POST observation without changing native clocks
- 0092edfd2cdeb02398f467fda187a891129e54d5 test: align late native-boundary observation with its actual POST root
- f7949f035caa729478eb9694195c22229af47a2d ci: diagnose actual late held boundaries within original POST observation
- 534c4054e0bf350ba5f944097e53e6d0f04a65bd ci: correct literal regex quoting for two-boundary observation diagnostic
- d8d3276cf4122ec900e60dd3b2ef651b6f0b469e ci: remove focused qualifier before explicit live-boundary observation proof
- bfcedc516a54da3674da983eff84581787e0655a test: preserve actual live native held-boundary entry facts
- e5913781a81d4e3ec0fac01c018c18058091636a test: require each held target to enter within its actual live request
- 4ddc7db7bc68a124f77ad2a7d19218f21280b769 ci: prove late held entries reached inside actual live POST boundary
- ed051204d16a3930c7d798f4ddba0975d1eec5d4 ci: remove qualifier before separating late cleanup observation facts
- 3238165e15e52cac886ddb150fb517939538f3e3 test: distinguish live business IO admission from later retained cleanup
- b6a81590276503926e7fe10564add26150fc1f5f test: allow actual late cancellation while preserving live admission proof
- 9a7502f94b23e777ab5b195278c75e1207132555 docs: preserve incomplete gate and freeze corrected live-observation qualification
- a61142aea40cb4e7880a34e5ffa39ab14ee4fdf5 docs: checkpoint corrected Task3 observation and revised exact three-job gate
- d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 ci: qualify revised exact native matrix under independent original request observations
- f29804abe54f1d618c859c2642b48f90b5677fb7 ci: complete only remaining controls and lint at exact qualified source checkout
- 5e28e70b7833fcd4a17fecebe320b0365b6c4d2f ci: remove completed scoped qualifier and freeze Task3 source handoff
- 02c71f353d3e59025f6e89e70b8d8860a6a647ab docs: complete Task3 source qualification report with explicit composite evidence and limits
- df20c0f8b8e2fc1b03cdd7e122302c5dc8a62f4e docs: close Task3 implementer ledger with qualified source and explicit review concerns

## Stat and complete blob manifest

- lib/mcp-qa-finite-owner-native-receiver.mjs: +4/-11; e5c345bc01a930d129b20d3b9dd7358e682cb84e -> e760b3579a38f1dbb73b177bb73b06d814eb881f; lines 37->30
- lib/mcp-qa-finite-owner-preparation.mjs: +1/-1; 01ec291de2631a7cd7e527e2a567f44ac6067522 -> 152e730f83af7ef063b6b1db89f8b0a779c2b60e; lines 477->477
- lib/mcp-qa-finite-owner-phase-context.mjs: +200/-11; 64039ec709053e2e82faf67ed013399244faee05 -> e482ad1617adc001c3a32c94e71eeb41d27f3d1d; lines 896->1085
- test/mcp-qa-finite-first-connection-publication-native.test.mjs: +244/-4; 282b5376bb18caed7e8890e4d47fcbc8e3db4ddd -> bc9f717d79e6e1ad60a40f358351093371331bee; lines 51->291
- test/fixtures/finite-first-connection-publication.mjs: +248/-15; 15d720bf41bd3ecd5f0ef71a70aed936aa5064bf -> 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48; lines 169->402
- test/fixtures/finite-initial-entry-world.mjs: +52/-18; f2eb3bd77b11c4d525ff7b1d93cb158109079bf1 -> 297b57846bbbe13bfc80ac52c5b033a382aef4b6; lines 290->324
- test/mcp-qa-finite-owner-phase-context-native.test.mjs: +11/-0; 5f9e4b6e05d5febb695e698d1ef4d8bd9e351bad -> be1ff27807934797f371ea703cd9a2c6f7f3675a; lines 106->117
- docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md: d630c815ef02c225436045b4c51e01f78b75d69a -> a1ae93956e0757a5dc9999ab2b738354dcc540ae
- docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md: absent -> 99e3a4c1251bf3c88694afd71c61859b9dcf7f42
- Temporary qualifier: absent at BASE and finalHEAD.
- Exact final delta count9; protected complete-tree comparison passed.

## Full diff — product and tests

```diff
diff --git a/lib/mcp-qa-finite-owner-native-receiver.mjs b/lib/mcp-qa-finite-owner-native-receiver.mjs
--- a/lib/mcp-qa-finite-owner-native-receiver.mjs
+++ b/lib/mcp-qa-finite-owner-native-receiver.mjs
@@ -1,36 +1,29 @@
+import {handlePrivateQaFiniteOwnerConnection} from './mcp-qa-finite-owner-phase-context.mjs';
 import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
-import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
-import {finiteNativeTarget,finiteNativeActor,finiteNativeMetadata,finiteNativeUuid,finiteNativeFailure as fail,finiteNativePending as pending,finiteNativeOperation,finiteNativeBytes,finiteNativeOriginalUrl,qualifyFiniteOwnerChoiceRequest} from './mcp-qa-finite-owner-native-wire.mjs';
-import {readFiniteOwnerNoticeConsentBody as readChoicePostBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
-/** SOURCE mounted, pending only. Metadata is DATA, never current M/JWT approval.
- * The later business verifier/producer is deliberately absent. */
+import {finiteNativeTarget,finiteNativeActor,finiteNativeMetadata,finiteNativeUuid,finiteNativeFailure as fail,finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
+/** Fixed SOURCE receiver. Transport metadata never substitutes for owner proof. */
 export function createFiniteOwnerNativeReceiver({ctx,env}){
  const storage=ctx?.storage,get=storage?.get,transaction=storage?.transaction,actor=ctx?.id,toString=actor?.toString;
  const self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get;
  const db=env?.RELEASE_DB,prepare=db?.prepare,withSession=db?.withSession,metadata=env?.AFW_QA_VERSION,version=metadata?.id;
  return Object.freeze({async fetch(request){
   let parent;
   try{
    if(!(request instanceof Request)||request.url!==finiteNativeTarget)fail(404);
    if(request.method!=='POST')fail(405);
    const originalHeaders=request.headers,headerBytes=JSON.stringify([...originalHeaders]),originalSignal=request.signal;
    const envelope=finiteNativeMetadata(originalHeaders);
    // Establish the receiving LOCAL root before all body/storage/source I/O.
    parent=createFiniteOwnerForwardedRequestLease(request,envelope.boundary);
    let failed=false;const check=()=>{
     if(failed)fail();parent.lease.assertCurrent();
     if(request.url!==finiteNativeTarget||request.method!=='POST'||request.headers!==originalHeaders||JSON.stringify([...originalHeaders])!==headerBytes||request.signal!==originalSignal||[get,transaction,toString,idFromName,namespaceGet,prepare,withSession].some(value=>typeof value!=='function')||!finiteNativeUuid(version)||db===env.DB||
      ctx.storage!==storage||storage.get!==get||storage.transaction!==transaction||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||
      Reflect.apply(toString,actor,[])!==Reflect.apply(idFromName,self,[finiteNativeActor]).toString()||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||env.AFW_QA_VERSION!==metadata||metadata.id!==version)fail();
    };
    check();
-   return await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},()=>finiteNativeOperation(parent.lease,ctx,async signalFailure=>{
-    const first=error=>{failed=true;signalFailure(error);};
-    const bytes=await (envelope.method==='POST'?readChoicePostBody:finiteNativeBytes)(request,check,first);check();
-    qualifyFiniteOwnerChoiceRequest(new Request(finiteNativeOriginalUrl,{method:envelope.method,headers:originalHeaders}),bytes);
-    return pending();
-   }));
+   return await handlePrivateQaFiniteOwnerConnection({request,env,ctx},parent.lease);
   }catch(error){return pending([400,401,403,404,405,413,429].includes(error?.status)?error.status:503);}
   finally{parent?.finish();}
  }});
 }

diff --git a/lib/mcp-qa-finite-owner-preparation.mjs b/lib/mcp-qa-finite-owner-preparation.mjs
--- a/lib/mcp-qa-finite-owner-preparation.mjs
+++ b/lib/mcp-qa-finite-owner-preparation.mjs
@@ -192,21 +192,21 @@
  if(map.preconnectionId!==ticket.preconnectionId||map.subjectHash!==subjectHash||map.sourceRevision!==ticket.sourceRevision||map.projectId!==c.source.project.projectId||map.revision!==c.source.project.revision||map.expiresAt<ticket.expiresAt||snapshot.preconnectionId!==ticket.preconnectionId)fail(403);
  const stable=Object.fromEntries(Object.entries(c.source).filter(([k])=>!['phase','currentPublication'].includes(k)));
  const initialStable=Object.fromEntries(Object.entries(snapshot.source).filter(([k])=>!['phase','currentPublication'].includes(k)));
  if(canonical(stable)!==canonical(initialStable))fail(403);
  return {...c,handle,ticket,map,snapshot,realm,subjectHash};
 }
 /** Native owner forms derive the next action from qualified source and stored tickets. */
 export async function prepareFiniteOwnerChoice({ctx,env,request},lease){return choice({ctx,env,request},lease);}
  // Internal fixed QA callgraph seam, never accepted as HTTP/RPC arguments.
 export async function continuePrivateQaFiniteOwnerChoice({ctx,env,request},lease,readOwnedContext){
- if(typeof readOwnedContext!=='function'||request.method!=='GET')fail(405);
+ if(typeof readOwnedContext!=='function'||!['GET','POST'].includes(request.method))fail(405);
  return choice({ctx,env,request},lease,readOwnedContext);
 }
 async function choice({ctx,env,request},lease,ownedContext=null){
  const options={ctx,env,request},url=new URL(request.url);
  if(url.pathname!=='/connections/finite-prepare'||url.search||url.hash)fail(404);
  if(!['GET','POST'].includes(request.method))fail(405);
  if(request.method==='GET'){
   let c,stage='connection',connectionRef=null,preconnectionId,projectRef,snapshot;
   if((request.headers.get('Cookie')??'').includes(cookieName+'=')){
    const previous=await ticketContext(options,lease,ownedContext);

diff --git a/lib/mcp-qa-finite-owner-phase-context.mjs b/lib/mcp-qa-finite-owner-phase-context.mjs
--- a/lib/mcp-qa-finite-owner-phase-context.mjs
+++ b/lib/mcp-qa-finite-owner-phase-context.mjs
@@ -1,10 +1,16 @@
+import {continuePrivateQaFiniteOwnerChoice,consumeFiniteOwnerStageAdmission} from './mcp-qa-finite-owner-preparation.mjs';
+import {adoptFiniteOwnerRequestStageWork} from './mcp-qa-finite-stage-work.mjs';
+import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
+import {prepareFinitePreparationEnrollmentWrite} from './mcp-qa-finite-preparation-enrollment-writer.mjs';
+import {encodeFinitePreparationCleanupRecord as enrollmentEncode} from './mcp-qa-finite-preparation-cleanup-records.mjs';
+import {finiteNativeMetadata as connectionMetadata,qualifyFiniteOwnerChoiceRequest,finiteNativeOriginalUrl as connectionUrl,finiteNativeBytes as connectionBytes} from './mcp-qa-finite-owner-native-wire.mjs';
 import {readFiniteOwnerNoticeConsentBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
 import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeConsentMetadata,qualifyFiniteOwnerNoticeConsentRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
 import {sealFinitePreparationNoticeRecord as noticeSeal} from './mcp-qa-finite-preparation-notice-records.mjs';
 
 import {createFinitePreparationNoticeJournal as noticeJournal} from './mcp-qa-finite-preparation-notice-journal.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
 import {randomBytes} from 'node:crypto';
 import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
 import {createFinitePreparationIssuerStore} from './mcp-qa-finite-preparation-issuer-store.mjs';
 import {sealFinitePreparationIssuerRecord as issuerSeal,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
@@ -322,52 +328,69 @@
      if(data.sourceSnapshot.preconnectionId!==id||canonical(data.sourceSnapshot.source)!==canonical(source))fail();
      data.ticket=await getRecord('readTicket',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
      if(!data.ticket){
       data.ticketUse=await getRecord('readTicketUse',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
       data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
       if(data.ticketUse||data.preconnection||f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
      }else{
      data.projectRef=await getRecord('readProjectRef',{projectRef:data.ticket.projectRef});
      const t=data.ticket,map=data.projectRef,realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:p.subject});
      if(t.ticketHash!==data.sourceSnapshot.initialTicketHash||t.preconnectionId!==id||t.sourceRevision!==source.sourceRevision||t.action!=='connection'||t.connectionRef!==null||t.subjectHash!==subject||map.preconnectionId!==id||map.projectRef!==t.projectRef||map.sourceRevision!==source.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||t.expiresAt>map.expiresAt||t.createdAt<source.window.startedAt||t.createdAt>Date.now()||map.issuedAt<source.window.startedAt||map.issuedAt>t.createdAt||map.expiresAt>capsule.C0||t.expiresAt>capsule.C0||Date.now()>=Math.min(t.expiresAt,map.expiresAt))fail();
+     data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash},false);
      data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
      if(data.preconnection){
-      data.stageApproval=await getRecord('readStageApproval',{preconnectionId:id,stage:'connection'});
-      data.approval=await getRecord('readConfigurationApproval',{approvalHash:data.stageApproval.approvalHash});
+      data.stageApproval=await getRecord('readStageApproval',{preconnectionId:id,stage:'connection'},false);
+      data.approval=await getRecord('readConfigurationApproval',{approvalHash:data.preconnection.approvalHash});
       data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash});
       const pre=data.preconnection,sa=data.stageApproval,a=data.approval,use=data.ticketUse;
+      if(!use)fail();
       const decision=evidence('decision',{ticket:t,decision:'approve',projectHash:a.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:a.approvedAt,expiresAt:a.expiresAt});
-      if(pre.preconnectionId!==id||pre.sourceRevision!==source.sourceRevision||pre.actorId!==actorId||pre.owner.subject!==p.subject||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||canonical(pre.project)!==canonical(source.project)||pre.baselineHash!==evidence('baseline',source.initialBaseline)||pre.startedAt<capsule.I0||pre.expiresAt>capsule.C0||sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!=='connection'||sa.ticketHash!==t.ticketHash||sa.approvalHash!==pre.approvalHash||sa.approvalHash!==prepHash('ConfigurationApproval',a)||a.subjectHash!==subject||a.sourceRevision!==source.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(source.project)||a.csrfReceiptHash!==decision||use.ticketHash!==t.ticketHash||use.recordHash!==decision||use.consumedAt<a.approvedAt||use.consumedAt>Date.now()||a.approvedAt<pre.startedAt||a.approvedAt<t.createdAt||a.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,t.expiresAt,capsule.C0))fail();
+      if(pre.preconnectionId!==id||pre.sourceRevision!==source.sourceRevision||pre.actorId!==actorId||pre.owner.subject!==p.subject||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||canonical(pre.project)!==canonical(source.project)||pre.baselineHash!==evidence('baseline',source.initialBaseline)||pre.startedAt<capsule.I0||pre.expiresAt>capsule.C0||(sa&&(sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!=='connection'||sa.ticketHash!==t.ticketHash||sa.approvalHash!==pre.approvalHash))||pre.approvalHash!==prepHash('ConfigurationApproval',a)||a.subjectHash!==subject||a.sourceRevision!==source.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(source.project)||a.csrfReceiptHash!==decision||use.ticketHash!==t.ticketHash||use.recordHash!==decision||use.consumedAt<a.approvedAt||use.consumedAt>Date.now()||a.approvedAt<pre.startedAt||a.approvedAt<t.createdAt||a.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,t.expiresAt,capsule.C0))fail();
       clock.narrow(Math.min(pre.expiresAt,pre.owner.accessExpiresAt,a.expiresAt));
      }else if(f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
      }
     }else if(f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
     let enrollment=null,ack=null;
     if(f.enrollment.size){
      enrollment=enrollmentRecord('Enrollment',f.enrollment.get('afw.finite-preparation-cleanup.v1:enrollment'));
      ack=f.enrollment.has('afw.finite-preparation-cleanup.v1:ack')?enrollmentRecord('Ack',f.enrollment.get('afw.finite-preparation-cleanup.v1:ack')):null;
      qualifyFinitePreparationEnrollmentFacts({anchors:f.a,enrollment,ack,...data});
     }
     let receipt=null;
     if(f.effects.size){
-     if(!enrollment||!ack||!data.preconnection)fail();
+     if(!enrollment||!ack||!data.preconnection||!data.stageApproval)fail();
      const identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'},up=effectIdentity({...identity,effect:'upload'}),activationId=effectIdentity({...identity,effect:'activation'});
      const allowed=['writer-head',...['send','ack'].map(s=>up+':'+s),...['send','ack','receipt'].map(s=>activationId+':'+s)].map(s=>'afw.finite-policy-effect.v1:'+s);
-     if(f.effects.size!==allowed.length||[...f.effects.keys()].some(k=>!allowed.includes(k)))fail();
+
+     if([...f.effects.keys()].some(k=>!allowed.includes(k)))fail();
      const upload=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'upload'},now:Date.now}).read(l)),activation=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'activation'},now:Date.now}).read(l));
-     receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:Date.now()});
+     const contextHash=digest('afw.finite-connection-context.v1',{preconnection:data.preconnection,stageApproval:data.stageApproval,predecessors:[],grant:null,notice:null});
+     const historical=(journal,effect)=>{
+      if(!['absent','issued','acknowledged','installed'].includes(journal.state)||journal.receipt&&effect!=='activation')fail();
+      if(!journal.send){if(journal.state!=='absent'||journal.ack||journal.receipt)fail();return;}
+      const s=journal.send,a=journal.ack,pre=data.preconnection,approval=data.approval;
+      if(s.preconnectionId!==id||s.sourceRevision!==source.sourceRevision||s.stage!=='connection'||s.effect!==effect||s.contextHash!==contextHash||s.baselineVersionId!==capsule.activatedVersionId||s.baselineDeploymentId!==capsule.activatedDeploymentId||s.issuedAt<Math.max(ack.acknowledgedAt,approval.approvedAt,data.ticketUse.consumedAt)||s.issuedAt>Date.now()||s.deadline>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt,capsule.C0)||s.deadline-s.issuedAt>5000||a&&(a.sendHash!==prepHash('ConnectionSend',s)||a.acknowledgedAt<s.issuedAt||a.acknowledgedAt>=s.deadline||a.acknowledgedAt>Date.now()))fail();
+     };
+     historical(upload,'upload');historical(activation,'activation');
+     if(!upload.send||upload.receipt||activation.send&&(!upload.ack||activation.send.issuedAt<upload.ack.acknowledgedAt)||activation.ack&&!activation.send)fail();
+     const last=activation.send??upload.send,lastId=activation.send?activationId:up,expectedRows=1+(upload.send?1:0)+(upload.ack?1:0)+(activation.send?1:0)+(activation.ack?1:0)+(activation.receipt?1:0);
+     if(f.effects.size!==expectedRows||f.effects.get('afw.finite-policy-effect.v1:writer-head')!==JSON.stringify({identityHash:lastId,sendHash:prepHash('ConnectionSend',last)}))fail();
      const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
-     if(canonical(actual.currentConfiguration)!==canonical(expected))fail();
-     qualifyFiniteConnectionProfile({phase:'read_consent',metadata:actual.currentConfiguration});
-     if(f.effects.get('afw.finite-policy-effect.v1:writer-head')!==JSON.stringify({identityHash:activationId,sendHash:prepHash('ConnectionSend',activation.send)})||receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(actual.currentConfiguration))fail();
-    }
-    if(receipt?(actual.pointer.versionId!==receipt.versionId||actual.pointer.deploymentId!==receipt.deploymentId):(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId))fail();
+     if(activation.ack){
+      if(upload.ack.resourceId===capsule.activatedVersionId||activation.ack.resourceId===capsule.activatedDeploymentId||actual.pointer.versionId!==upload.ack.resourceId||actual.pointer.deploymentId!==activation.ack.resourceId||canonical(actual.currentConfiguration)!==canonical(expected))fail();
+      qualifyFiniteConnectionProfile({phase:'read_consent',metadata:actual.currentConfiguration});
+     }else if(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration))fail();
+     if(activation.receipt){
+      receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:Date.now()});
+      if(receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(actual.currentConfiguration))fail();
+     }
+    }else if(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration))fail();
     if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
     data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:id},false);
     if(data.noticeLink?(f.inventory.get(prefix+'notice')!==prepEncode('NoticeLink',data.noticeLink)):f.inventory.has(prefix+'notice'))fail();
     const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
     if(f.sdk.root){
      const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
      if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
      if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
      if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.now()>=Date.parse(g.expiresAt)||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
      if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
@@ -430,32 +453,198 @@
 function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
 function requireEmptyNotice(s){
  const n=s.records.notice;
  if(s.preparation.noticeLink||n.reservation||n.freeze||Object.values(n.operations).some(v=>v.send||v.ack)||s.noticeRows.tickets.length||s.noticeRows.events.length)fail();
 }
 function freezeOwnerPhaseData(value){
  if(value&&typeof value==='object'){for(const v of Object.values(value))freezeOwnerPhaseData(v);Object.freeze(value);}return value;
 }
 function qualifySettledOwnerPair(pair){
  for(const s of [pair.first,pair.second]){
+  if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();
   requireEmptyNotice(s);
   for(const v of Object.values(s.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
   const names=new Set(s.records.sdk.map(([key])=>key));
   for(const [key]of s.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
  }
  const {sourceBase,installed,preconnectionId,capsuleHash}=pair.second,r=installed.receipt;
  const source=r?validateFiniteOwnerSource({...sourceBase,phase:'read_consent',currentPublication:{stage:'connection',versionId:r.versionId,deploymentId:r.deploymentId,receiptHash:r.receiptHash}}):sourceBase;
  return Object.freeze({source,preconnectionId,capsuleHash});
 }
 export async function readPrivateQaFiniteOwnerContext(options){
  if(arguments.length!==1)fail();
  return qualifySettledOwnerPair(await observeOwnerPhasePair(options));
+}
+
+
+/** Fixed native connection producer. One original human continuation owns every
+ * native result; journal DATA is observed but never resumes this stack. */
+export async function handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease){
+ let clock,onAbort,failed=false,position='entry';
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
+   const received=connectionMetadata(request.headers),storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch;
+   const metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
+   const native={get:storage.get,list:storage.list,transaction:storage.transaction,sync:storage.sync,getAlarm:storage.getAlarm},headers=request.headers,signal=request.signal,url=request.url,headerBytes=canonical([...headers]);
+   // Capture native objects/methods ONCE for the whole original continuation.
+   // New first-primary sessions/statements are still captured per operation.
+   const actor=ctx.id,toString=actor?.toString,self=env.AFW_INDEPENDENT_CLOSURE,node=env.AFW_RELEASE_EVENTS_NODE,alias=env.AFW_FINITE_OWNER_OAUTH_KV,qaVersionId=metadata?.id;
+   const dbMethods={prepare:db?.prepare,withSession:db?.withSession},selfMethods={idFromName:self?.idFromName,get:self?.get},nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get},aliasMethods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   if([toString,...Object.values(native),...Object.values(dbMethods),...Object.values(selfMethods),...Object.values(nodeMethods),...Object.values(aliasMethods)].some(value=>typeof value!=='function'))fail();
+   const actorId=Reflect.apply(toString,actor,[]);if(!hex(actorId))fail();
+   let activeChild=null,admission=null;
+   const holders=()=>{
+    current(originalLease);
+    if(failed||ctx.storage!==storage||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||env.RELEASE_DB!==db||Object.keys(dbMethods).some(key=>db[key]!==dbMethods[key])||env.AFW_INDEPENDENT_CLOSURE!==self||Object.keys(selfMethods).some(key=>self[key]!==selfMethods[key])||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(key=>node[key]!==nodeMethods[key])||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(aliasMethods).some(key=>alias[key]!==aliasMethods[key])||globalThis.fetch!==fetcher||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||Object.keys(native).some(k=>storage[k]!==native[k])||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!=='POST'||canonical([...headers])!==headerBytes)fail();
+    if(admission)current(admission.lease);
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>{clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
+   const wait=async work=>{check();const promise=work();const value=await clock.wait(retain(promise),activeChild??clock.lease);check();return value;};
+   const first=error=>{failed=true;firstFailure(error);};
+   const bytes=await wait(()=>received.method==='POST'?readFiniteOwnerNoticeConsentBody(request,check,first):connectionBytes(request,check,first));
+   const original=new Request(connectionUrl,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   const grammar=qualifyFiniteOwnerChoiceRequest(original,bytes),initial=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease})),initialState=initial.second;
+   const clean=s=>{
+    requireEmptyNotice(s);
+    if(s.installed.receipt||s.installed.enrollment||s.installed.ack||s.records.effects.length||s.records.sdk.length||s.records.issuer.reservation||s.records.issuer.freeze||Object.values(s.records.issuer.operations).some(v=>v.send||v.ack)||s.preparation.preconnection||s.preparation.stageApproval||s.preparation.ticketUse)fail();
+   };
+   clean(initial.first);clean(initialState);
+   if(headers.get('x-afw-finite-version')!==initialState.sourceBase.initialBaseline.versionId)fail();
+   const id=initialState.preconnectionId;
+   // This lexical reader returns exactly the three factual public keys. During
+   // choice's own sequential writes it describes closed prefixes without granting
+   // publication permission. Admission is minted only by choice's actual finish.
+   const readChoice=async(parent,requested)=>{
+    check();const pair=await wait(()=>observeOwnerPhasePair({ctx,env,parent,...requested?{preconnectionId:requested}:{}}));
+    for(const s of [pair.first,pair.second]){
+     requireEmptyNotice(s);
+     if(s.preconnectionId!==id||s.capsuleHash!==initialState.capsuleHash||canonical(s.sourceBase)!==canonical(initialState.sourceBase)||s.records.effects.length||s.installed.enrollment||s.installed.receipt||s.records.sdk.length||s.records.issuer.reservation)fail();
+    }
+    return Object.freeze({source:pair.second.sourceBase,preconnectionId:id,capsuleHash:pair.second.capsuleHash});
+   };
+   const choice=await wait(()=>continuePrivateQaFiniteOwnerChoice({ctx,env,request:original},originalLease,readChoice));
+   if(grammar.method==='GET'){
+    if(choice.status!==200||choice.stage!=='connection'||!hex(choice.handle)||!hex(choice.projectRef)||choice.goal!==initialState.sourceBase.goal||!Number.isSafeInteger(choice.expiresAt)||choice.expiresAt<=Date.now())fail();
+    const html='<h1>Preparar configuración de lectura</h1><p>La lectura y los avisos requieren decisiones separadas.</p><form method="post" action="/connections/finite-prepare"><input type="hidden" name="handle" value="'+choice.handle+'"><input type="hidden" name="projectRef" value="'+choice.projectRef+'"><button name="decision" value="approve">Preparar lectura</button></form>';
+    check();return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Set-Cookie':'__Host-afw-finite-prepare='+choice.handle+'; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age='+Math.max(0,Math.floor((choice.expiresAt-Date.now())/1000))}});
+   }
+   if(choice.status!==202||choice.stage!=='connection'||choice.preconnectionId!==id)fail();
+   admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:id,stage:'connection'},originalLease);
+   position='approved';
+   return adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},async()=>{
+    const approved=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id})),expected=structuredClone(approved.second),prep=expected.preparation,capsule=expected.anchor.anchors.capsule,plan=expected.anchor.anchors.plan,resident=readPrivateQaFiniteCandidate();
+    if(!prep.preconnection||!prep.stageApproval||!prep.ticketUse||prep.noticeLink||expected.records.effects.length||expected.installed.enrollment||expected.installed.receipt||prep.ticket.ticketHash!==sha(grammar.handle)||prep.ticket.projectRef!==grammar.projectRef||prepHash('StageApproval',prep.stageApproval)!==admission.stageApprovalHash||canonical(admission.ownerSource)!==canonical(expected.sourceBase))fail();
+    clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt,plan.readerExpiresAt,plan.publisherExpiresAt));
+    const baseline={versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,module:resident.module,configuration:plan.configuration};
+    const configuration=structuredClone(plan.configuration);configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+    qualifyFiniteConnectionProfile({phase:'read_consent',metadata:configuration});
+    const candidate={module:resident.module,configuration},candidateBytes=Uint8Array.from(resident.bytes);
+    if(sha(candidateBytes)!==capsule.moduleHash||candidateBytes.length!==plan.moduleBytes||resident.sourceRevision!==capsule.sourceRevision||resident.sourceTree!==capsule.sourceTree)fail();
+    const backupEntry=expected.anchor.backupRaw.find(([key])=>key.endsWith(':backup'));if(!backupEntry)fail();
+    const backup=uploadRecord('Backup',backupEntry[1]),rollbackBytes=Buffer.concat(expected.anchor.backupRaw.filter(([key])=>key.includes(':chunk:')).map(([,raw])=>Buffer.from(uploadRecord('Chunk',raw).content,'base64')));
+    if(rollbackBytes.length!==backup.moduleBytes||sha(rollbackBytes)!==backup.moduleHash||restorationConfigurationHash(backup.rawConfiguration)!==backup.configurationHash)fail();
+    const rollback={versionId:backup.baselineVersionId,module:{name:'index.mjs',bytes:backup.moduleBytes,sha256:backup.moduleHash},configuration:backup.rawConfiguration};
+    let ownEnrollment=null,ownEnrollmentAck=null,writer=null,enrollmentResult=null,enrollmentAckResult=null;
+    let ownUploadSend=null,actualUploadPromise=null,actualUploadResult=null,uploadSettled=false,ownUploadAck=null;
+    let ownActivationSend=null,actualActivationPromise=null,actualActivationResult=null,activationSettled=false,ownActivationAck=null;
+    let ownReceipt=null,receiptWrite=null,receiptReadback=null;
+    const states=['approved','enrollment-recorded','enrollment-ack-recorded','upload-send-recorded','upload-native-pending','upload-ack-recorded','upload-observed','activation-send-recorded','activation-native-pending','activation-ack-recorded','activation-observed','receipt-recorded','complete'];
+    const engine=createFiniteFixedPolicyEngine({ctx,env},check);
+    const identity=effect=>({kind:'connection',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',effect});
+    const journal=effect=>createFinitePolicyEffectJournal({storage,identity:identity(effect),now:Date.now}),upload=journal('upload'),activation=journal('activation');
+    const contextHash=digest('afw.finite-connection-context.v1',{preconnection:prep.preconnection,stageApproval:prep.stageApproval,predecessors:[],grant:null,notice:null});
+    const updateAnchor=()=>{expected.anchor.enrollment=structuredClone(expected.records.enrollment);expected.anchor.effects=structuredClone(expected.records.effects);};
+    const ordered=rows=>rows.sort(([a],[b])=>a<b?-1:a>b?1:0);
+    async function recheckOwned(){
+     check();if(!states.includes(position)||['upload-native-pending','activation-native-pending'].includes(position))fail();
+     if(actualUploadPromise&&!uploadSettled||actualActivationPromise&&!activationSettled)fail();
+     if(states.indexOf(position)>=states.indexOf('enrollment-recorded')&&(!writer||!enrollmentResult||enrollmentResult.enrollment!==ownEnrollment))fail();
+     if(states.indexOf(position)>=states.indexOf('enrollment-ack-recorded')&&(!enrollmentAckResult||enrollmentAckResult.ack!==ownEnrollmentAck))fail();
+     if(states.indexOf(position)>=states.indexOf('upload-send-recorded')&&!ownUploadSend)fail();
+     if(states.indexOf(position)>=states.indexOf('upload-ack-recorded')&&(!actualUploadPromise||!uploadSettled||!actualUploadResult||ownUploadAck?.resourceId!==actualUploadResult.id))fail();
+     if(states.indexOf(position)>=states.indexOf('activation-send-recorded')&&!ownActivationSend)fail();
+     if(states.indexOf(position)>=states.indexOf('activation-ack-recorded')&&(!actualActivationPromise||!activationSettled||!actualActivationResult||ownActivationAck?.resourceId!==actualActivationResult.id))fail();
+     if(states.indexOf(position)>=states.indexOf('receipt-recorded')&&(!ownReceipt||!receiptWrite||!receiptReadback))fail();
+     const pair=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+     if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();check();
+    }
+    const withChild=action=>clock.child(async(l,end)=>{activeChild=l;try{check();return await action(l,end);}finally{activeChild=null;}});
+    const sync=()=>wait(()=>Reflect.apply(native.sync,storage,[]));
+    const setEnrollment=(kind,record)=>{
+     expected.records.enrollment.push(['afw.finite-preparation-cleanup.v1:'+(kind==='Enrollment'?'enrollment':'ack'),enrollmentEncode(kind,record)]);ordered(expected.records.enrollment);
+     expected.installed[kind==='Enrollment'?'enrollment':'ack']=structuredClone(record);updateAnchor();
+    };
+    const setEffect=(kind,record,effect)=>{
+     const prefix='afw.finite-policy-effect.v1:',key=prefix+effectIdentity(identity(effect))+':'+({ConnectionSend:'send',ConnectionAck:'ack',ConnectionReceipt:'receipt'})[kind];
+     if(expected.records.effects.some(([k])=>k===key))fail();
+     expected.records.effects.push([key,prepEncode(kind,record)]);
+     if(kind==='ConnectionSend'){
+      const head=prefix+'writer-head',raw=JSON.stringify({identityHash:effectIdentity(identity(effect)),sendHash:prepHash(kind,record)}),prior=expected.records.effects.find(row=>row[0]===head);
+      if(prior)prior[1]=raw;else expected.records.effects.push([head,raw]);
+     }
+     ordered(expected.records.effects);updateAnchor();
+    };
+    const record=async(j,kind,value,method,l,state)=>{
+     check();const result=await wait(()=>j[method](value,l));if(result.status!=='recorded'||result.recordHash!==prepHash(kind,value))fail();
+     await sync();const read=await wait(()=>j.read(l));if(read.state!==state||prepEncode(kind,read[method==='issue'?'send':method==='acknowledge'?'ack':'receipt'])!==prepEncode(kind,value))fail();
+     return {result,read};
+    };
+    await recheckOwned();
+    await withChild(async l=>{await engine.readPointer(baseline,l);await engine.readVersion(baseline,l);await engine.readVersion(rollback,l,true);await recheckOwned();});
+    await withChild(async(l,end)=>{
+     await recheckOwned();
+     writer=await wait(()=>prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId:id,stageApprovalHash:admission.stageApprovalHash,ownerSource:admission.ownerSource,baseline,baselineBytes:Uint8Array.from(resident.bytes)},l,end));
+     await recheckOwned();enrollmentResult=await wait(()=>writer.recordEnrollment());ownEnrollment=enrollmentResult.enrollment;
+     setEnrollment('Enrollment',ownEnrollment);position='enrollment-recorded';await recheckOwned();
+     enrollmentAckResult=await wait(()=>writer.recordAck());ownEnrollmentAck=enrollmentAckResult.ack;
+     setEnrollment('Ack',ownEnrollmentAck);position='enrollment-ack-recorded';await recheckOwned();
+    });
+    const uploadInput={configuration,baselineVersionId:baseline.versionId,bytes:candidateBytes};
+    const sendFor=(effect,description,end)=>({purpose:'afw.finite-connection-send.v1',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',effect,contextHash,requestHash:digest('afw.finite-policy-request.v1',{method:description.method,path:description.path,body:description.body,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId}),baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,issuedAt:Date.now(),deadline:end});
+    await withChild(async(l,end)=>{
+     await recheckOwned();await engine.readPointer(baseline,l);
+     ownUploadSend=sendFor('upload',engine.describeUpload(uploadInput),end);
+     await record(upload,'ConnectionSend',ownUploadSend,'issue',l,'issued');setEffect('ConnectionSend',ownUploadSend,'upload');position='upload-send-recorded';await recheckOwned();check();
+     position='upload-native-pending';actualUploadPromise=retain(Promise.resolve().then(()=>{check();return engine.upload(uploadInput,l);}));
+     actualUploadResult=await wait(()=>actualUploadPromise);uploadSettled=true;
+     if(actualUploadResult.id===baseline.versionId||actualUploadResult.id===rollback.versionId||actualUploadResult.id===capsule.qaVersionId)fail();
+     ownUploadAck={purpose:'afw.finite-connection-ack.v1',sendHash:prepHash('ConnectionSend',ownUploadSend),resourceId:actualUploadResult.id,acknowledgedAt:Date.now()};
+     await record(upload,'ConnectionAck',ownUploadAck,'acknowledge',l,'acknowledged');setEffect('ConnectionAck',ownUploadAck,'upload');position='upload-ack-recorded';await recheckOwned();
+     await engine.readVersion({versionId:actualUploadResult.id,...candidate},l);await engine.readPointer(baseline,l);position='upload-observed';await recheckOwned();
+    });
+    await withChild(async(l,end)=>{
+     await recheckOwned();await engine.readPointer(baseline,l);
+     const input={versionId:actualUploadResult.id},description=engine.describeActivation(input);
+     ownActivationSend=sendFor('activation',description,end);
+     await record(activation,'ConnectionSend',ownActivationSend,'issue',l,'issued');setEffect('ConnectionSend',ownActivationSend,'activation');position='activation-send-recorded';await recheckOwned();check();
+     position='activation-native-pending';actualActivationPromise=retain(Promise.resolve().then(()=>{check();return engine.activate(input,l);}));
+     actualActivationResult=await wait(()=>actualActivationPromise);activationSettled=true;
+     if(actualActivationResult.id===baseline.deploymentId||actualActivationResult.strategy!=='percentage'||canonical(actualActivationResult.versions)!==canonical(description.body.versions))fail();
+     ownActivationAck={purpose:'afw.finite-connection-ack.v1',sendHash:prepHash('ConnectionSend',ownActivationSend),resourceId:actualActivationResult.id,acknowledgedAt:Date.now()};
+     await record(activation,'ConnectionAck',ownActivationAck,'acknowledge',l,'acknowledged');setEffect('ConnectionAck',ownActivationAck,'activation');
+     expected.physical.pointer={versionId:actualUploadResult.id,deploymentId:actualActivationResult.id};expected.physical.currentConfiguration=structuredClone(configuration);
+     expected.physical.qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata:finitePublicProfileTemplate('qaLive'),mMetadata:configuration});
+     position='activation-ack-recorded';await recheckOwned();
+     await engine.readPointer({versionId:actualUploadResult.id,deploymentId:actualActivationResult.id},l);await engine.readVersion({versionId:actualUploadResult.id,...candidate},l);position='activation-observed';await recheckOwned();
+     const raw={purpose:'afw.finite-connection-installed.v1',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,versionId:actualUploadResult.id,deploymentId:actualActivationResult.id,moduleHash:candidate.module.sha256,configurationHash:finiteActivationConfigurationHash(configuration),completedAt:Date.now()};
+     ownReceipt={...raw,receiptHash:prepHash('ConnectionReceipt',raw)};
+     receiptWrite=await record(activation,'ConnectionReceipt',ownReceipt,'finish',l,'installed');receiptReadback=receiptWrite.read;
+     setEffect('ConnectionReceipt',ownReceipt,'activation');expected.installed.receipt=structuredClone(ownReceipt);position='receipt-recorded';await recheckOwned();position='complete';await recheckOwned();
+    });
+    check();return new Response('<h1>Configuración de lectura preparada</h1><p>La lectura y los avisos requieren decisiones separadas.</p>',{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
+   });
+  }));
+ }catch(error){failed=true;position='failed';return pending([400,401,403,404,405,413,429].includes(error?.status)?error.status:503);}
+ finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
 }
 
 /** Fixed unmounted QA implementation. All continuations and witnesses live only
  * in this invocation's stack; persisted DATA never recreates them. */
 export async function handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease){
  let clock,onAbort;
  try{
   if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
   return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
    const received=readFiniteOwnerOAuthMetadata(request.headers);

diff --git a/test/mcp-qa-finite-first-connection-publication-native.test.mjs b/test/mcp-qa-finite-first-connection-publication-native.test.mjs
--- a/test/mcp-qa-finite-first-connection-publication-native.test.mjs
+++ b/test/mcp-qa-finite-first-connection-publication-native.test.mjs
@@ -1,19 +1,21 @@
+import {createHash} from 'node:crypto';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {gunzipSync} from 'node:zlib';
 import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
 import {plain,approveFirstConnection,readFirstConnectionProbe,setFirstConnectionFault} from './fixtures/finite-first-connection-publication.mjs';
 const O='https://delegated-canary.agentfriendlyweb.dev';
-async function fixture(t){
- const f=await initialEntryHarness('first-connection-publication');
- t.after(async()=>{console.info('T2 native stage','teardown-start');try{if(!f.mountFailed)await f.stub.restoreMethods();console.info('T2 native stage','teardown-restored');}finally{await f.mf.dispose();console.info('T2 native stage','teardown-disposed');await f.cleanup();console.info('T2 native stage','teardown-done');}});
+async function fixture(t,options){
+ const f=await initialEntryHarness('first-connection-publication',options);
+ t.after(async()=>{console.info('T2 native stage','teardown-start');try{if(!f.mountFailed){await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}console.info('T2 native stage','teardown-restored');}finally{await f.mf.dispose();console.info('T2 native stage','teardown-disposed');await f.cleanup();console.info('T2 native stage','teardown-done');}});
  await f.stub.configure('normal');
  console.info('T2 native stage','upstream-start');const initial=await plain(f.stub.invoke(f.refs));console.info('T2 native stage','upstream-done:'+initial.status);if(initial.status!=='material_recorded'){const seen=await plain(f.stub.snapshot());console.info('T2 upstream DATA inspection',JSON.stringify({requests:f.providerRegistry.requests.map(({url,method})=>({method,path:new URL(url).pathname})),responses:f.providerRegistry.responses,rows:seen.map(([key])=>key),stats:await plain(f.stub.stats()),M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes}}));}assert.equal(initial.status,'material_recorded',JSON.stringify(initial));await f.stub.restoreMethods();await f.mountFirstConnection();
  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([key])=>key.endsWith(':capsule'))[1]);
  assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.phaseCurrent,undefined);
  assert.equal(capsule.moduleHash,f.firstConnectionBuild.residency.module.sha256);
  assert.equal(f.uploaded.modules[0].content_base64,gunzipSync(Buffer.from(f.resident.content,'base64')).toString('base64'));
  return f;
 }
 test('T2 finite dispatch never falls through ordinary',{timeout:120000},async t=>{
  const f=await fixture(t),spy=f.negative;
@@ -30,21 +32,259 @@
  await setFirstConnectionFault(f,'oauth-open');
  for(const path of ['/authorize?bad=1','/monitoring','/monitoring/grant']){const r=await spy.fetch(O+path,path.endsWith('grant')?{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:'handle='+'a'.repeat(43)}:{});assert.notEqual(r.status,200,path);await r.body?.cancel();}
  const probe=await readFirstConnectionProbe(f);assert.equal(probe.negative.ordinary,0,'finite paths never enter ordinary handler before SQL');assert.equal(probe.negative.sql,0,'zero ordinary SQL');assert.equal(probe.effects,0);assert.equal(probe.uploads,1);assert.equal(probe.activations,1);
  assert(probe.native.calls.some(c=>c.url==='https://afw-private.invalid/_finite-owner/monitoring'),'OAuth=true reaches QA without ordinary monitoring flag');
  const target='https://afw-private.invalid/_finite-owner/';
  for(const url of [target+'unknown',target+'choice?x=1',target+'monitoring/revoke']){const r=await f.stub.fetch(url,{method:'POST'});assert.notEqual(r.status,200);await r.body?.cancel();}
  console.info('T2 negative bundle',JSON.stringify({spyHash:f.firstConnectionBuild.spyHash,probe:{...probe,rows:undefined,providerRequests:undefined,native:{...probe.native,business:undefined}}}));
 });
 test('T2 closed mounted conduits cannot authorize business',{timeout:120000},async t=>{
  const f=await fixture(t);
- const response=await approveFirstConnection(f);assert.equal(response.status,503,'choice reaches pending QA, never a connection success');await response.body.cancel();
+ const response=await f.call('/connections/finite-prepare');assert.notEqual(response.status,200,'unsigned choice cannot approve');await response.body?.cancel();
  const before=await readFirstConnectionProbe(f);assert.equal(before.native.calls.filter(c=>c.url.endsWith('/choice')).length,1,'actual closed M dispatches to actual QA receiver');
  for(const path of ['/authorize','/monitoring','/monitoring/grant']){const r=await f.call(path,path.endsWith('/grant')?{method:'POST'}:{});assert.notEqual(r.status,200);await r.body?.cancel();}
  const p=await readFirstConnectionProbe(f);assert.equal(p.native.calls.length,before.native.calls.length,'closed OAuth/notice denied before QA');assert.equal(p.effects,0);assert.deepEqual(p.native.business,[]);assert.equal(p.uploads,1);assert.equal(p.activations,1);
  const rows=p.rows,capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);assert.equal(p.native.alarm,capsule.C0);assert.equal(capsule.C0,capsule.I0+900000);assert.equal(capsule.C1,capsule.C0+180000);
  const plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);assert.equal(plan.configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'false');
  assert.equal(f.phaseCurrent,undefined);assert.equal(f.firstConnectionBuild.M.sha256,f.resident.module.sha256);
  assert(f.firstConnectionBuild.M.inputs.includes('worker/mcp-own/finite.mjs'));assert(!f.firstConnectionBuild.M.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
  assert(f.firstConnectionBuild.QA.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
  console.info('T2 initial native build',JSON.stringify({...f.firstConnectionBuild,residency:{...f.resident,content:undefined},M:{...f.firstConnectionBuild.M,inputs:f.firstConnectionBuild.M.inputs.length},QA:{...f.firstConnectionBuild.QA,inputs:f.firstConnectionBuild.QA.inputs.length},requests:p.providerRequests.length}));
+});
+
+test('T3 same initial bytes produce connection and downstream',{timeout:120000},async t=>{
+ const f=await fixture(t),before=await readFirstConnectionProbe(f);assert.equal(f.firstConnectionBuild.negativeMutation,null,'positive principal is unmutated');await f.stub.firstConnectionConfigure('normal');
+ const owner=(await plain(f.stub.capsuleFacts())).material.ownerSelection,originalToken=await f.firstConnectionToken(owner,{expiresAt:Math.floor((Date.now()+120000)/1000)}),choiceHeaders={'Cf-Access-Jwt-Assertion':originalToken};
+ const foreignUrl='https://foreign.invalid/connections/finite-prepare',foreign=await f.mf.dispatchFetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(foreign.status,200);await foreign.body?.cancel();
+ const foreignSpy=await f.negative.fetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(foreignSpy.status,200);await foreignSpy.body?.cancel();
+ const originProbe=await readFirstConnectionProbe(f);assert.equal(originProbe.native.calls.length,0,'valid signed foreign URL never reaches QA');assert.equal(originProbe.negative.forwarded,0);assert.equal(originProbe.negative.ordinary,0);assert.equal(originProbe.negative.sql,0);assert.equal(effectRows(originProbe).length,0);
+ const response=await approveFirstConnection(f,{token:originalToken});
+ if(response.status!==200)console.info('T3 failed continuation observation',JSON.stringify(await plain(f.stub.firstConnectionProbe())));
+ assert.equal(response.status,200,'original signed choice must complete native ConnectionReceipt before success');
+ await response.body?.cancel();
+ const p=await readFirstConnectionProbe(f);
+ assert.equal(p.uploads,before.uploads+1,'new native upload');
+ assert.equal(p.activations,before.activations+1,'new native activation');
+ const receiptRows=p.rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'));
+ assert.equal(receiptRows.length,1,'durable own connection receipt');
+ assert.equal(JSON.parse(receiptRows[0][1]).moduleHash,f.firstConnectionBuild.M.sha256);
+ assert.equal(f.phaseCurrent,undefined,'no seeded publication authority');
+ const connectionTelemetry=await plain(f.stub.firstConnectionState());assert(connectionTelemetry.counts?.get>0);assert(connectionTelemetry.http.length>0);assert(connectionTelemetry.http.every(io=>io.settled&&io.cancelCalls===io.cancelSettled),'success retains every actual native body/cancel settlement');const receipt=JSON.parse(receiptRows[0][1]),originalRows=before.rows.filter(([k])=>!k.startsWith('owner-ticket:')&&!k.startsWith('owner-project-ref:')&&!k.startsWith('connection-preparation:'));
+ for(const row of originalRows)assert.deepEqual(p.rows.find(([k])=>k===row[0]),row);
+ const closedVersion=f.providerRegistry.versions[receipt.baselineVersionId],connectionVersion=f.providerRegistry.versions[receipt.versionId];
+ assert.equal(connectionVersion.modules[0].content_base64,closedVersion.modules[0].content_base64);
+ const configOnly=structuredClone(closedVersion);configOnly.id=receipt.versionId;configOnly.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(connectionVersion,configOnly);
+ // Adoption follows actual POST completion/body settlement and uses only the
+ // provider registry's real upload/pointer. QA script and physical references stay.
+ await f.adoptConnectionConfiguration();assert.equal(f.transportNormalized,false);
+ const postAdoptionBefore=await readFirstConnectionProbe(f),postAdoptionForeign=await f.mf.dispatchFetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(postAdoptionForeign.status,200);await postAdoptionForeign.body?.cancel();assert.equal((await readFirstConnectionProbe(f)).native.calls.length,postAdoptionBefore.native.calls.length);
+ await f.adoptConnectionConfiguration({upstream:true});assert.equal(f.transportNormalized,true);
+ const normalBefore=await readFirstConnectionProbe(f),foreignOrigin=await f.negative.fetch(O+'/connections/finite-prepare',{headers:{...choiceHeaders,Origin:'https://foreign.invalid'}});assert.notEqual(foreignOrigin.status,200);await foreignOrigin.body?.cancel();const normalAfter=await readFirstConnectionProbe(f);assert.equal(normalAfter.native.calls.length,normalBefore.native.calls.length,'foreign Origin remains denied before QA under native upstream');assert.equal(normalAfter.negative.forwarded,normalBefore.negative.forwarded);assert.equal(normalAfter.negative.ordinary,0);assert.equal(normalAfter.negative.sql,0);
+ const actualPrep=p.rows.find(([key])=>key==='connection-preparation:'+receipt.preconnectionId+':record');assert(actualPrep);const narrowed=JSON.parse(actualPrep[1]);assert(narrowed.owner.accessExpiresAt<narrowed.expiresAt+1);assert(narrowed.expiresAt<JSON.parse(before.rows.find(([key])=>key.endsWith(':capsule'))[1]).C0,'valid shorter signed identity narrows original approval');
+ f.providerPhase='verification context after connection';const current=await plain(f.stub.firstConnectionContext());assert.equal(current.source?.phase,'read_consent',JSON.stringify(current));f.source=current.source;
+ const kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');
+ await kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
+ const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
+ const authorization=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
+ assert.equal(authorization.status,200);const authHtml=await authorization.text(),handle=/name="handle" value="([^"]+)"/.exec(authHtml)?.[1],sdkCookie=authorization.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&sdkCookie);
+ const issued=await f.call('/authorize',{method:'POST',redirect:'manual',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+sdkCookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
+ assert.equal(issued.status,302);const code=new URL(issued.headers.get('Location')).searchParams.get('code');assert(code);await issued.body?.cancel();
+ const beforeExchange=await plain(f.stub.snapshot()),grantAck=beforeExchange.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':grant:ack'));
+ assert(grantAck);
+ const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:verifier})});
+ assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');
+ const client=new Client({name:'SYN-native-T3',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(O).host}},fetch:(url,options)=>{f.providerPhase='MCP';return f.mf.dispatchFetch(String(url),options);}}));const tools=await client.listTools();assert.deepEqual(tools.tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence']);const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.source.project.projectId);}finally{await client.close();}
+ const originalActivation=effectRows(p).filter(([key])=>key.endsWith(':send')).map(([,raw])=>JSON.parse(raw)).find(send=>send.effect==='activation');assert(Date.now()>=originalActivation.deadline,'completed history is observed beyond its original effect window');
+ f.providerPhase='verification context after exchange';const actualCurrent=await plain(f.stub.firstConnectionContext());assert.equal(actualCurrent.source?.phase,'read_consent');const afterExchange=await plain(f.stub.snapshot());assert.deepEqual(afterExchange.find(([k])=>k===grantAck[0]),grantAck,'immutable original grant ACK');
+ const grant=(await f.db.prepare("SELECT exchanged_at FROM delegated_access_grants WHERE id=?").bind(JSON.parse(beforeExchange.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]).identity.grantId).first());assert.notEqual(grant.exchanged_at,'','real native exchange timestamp');
+ const noticeGet=await f.call('/monitoring',{headers});assert.equal(noticeGet.status,200);const noticeHtml=await noticeGet.text(),noticeHandle=/name="handle" value="([^"]+)"/.exec(noticeHtml)?.[1],noticeCookie=noticeGet.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(noticeHandle&&noticeCookie);
+ const noticePost=await f.call('/monitoring/grant',{method:'POST',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+noticeCookie},body:new URLSearchParams({handle:noticeHandle})});assert.equal(noticePost.status,200);await noticePost.body?.cancel();
+ const final=await readFirstConnectionProbe(f),link=final.rows.find(([k])=>k==='connection-preparation:'+current.preconnectionId+':notice');assert(link,'actual native NoticeLink follows actual GET/POST');
+ const unsupported=await f.call('/connections/finite-prepare',{headers});assert.notEqual(unsupported.status,200);await unsupported.body?.cancel();assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);
+ assert.equal(final.negative.ordinary,0);assert.equal(final.negative.sql,0);
+ const telemetry=connectionTelemetry,sends=effectRows(final).filter(([k])=>k.endsWith(':send')).map(([,v])=>JSON.parse(v));console.info('T3 original clock and IO',JSON.stringify({counts:telemetry.counts,http:telemetry.http.reduce((out,io)=>{const key=io.kind+' '+io.method,row=out[key]??={requests:0,bytes:0,reads:0,cancelCalls:0,cancelSettled:0};row.requests++;for(const field of ['bytes','reads','cancelCalls','cancelSettled'])row[field]+=io[field];return out;},{}),originalRoots:p.native.calls.map(c=>({method:c.method,windowMs:c.boundary.deadline-c.boundary.startedAt})),pairs:p.native.observation.filter(v=>v.kind==='pair').map(v=>v.elapsedMs),providerRequests:final.providerRequests.length,providerByPhase:final.providerRequests.reduce((out,r)=>{const key=r.phase+' '+new URL(r.url).host;out[key]=(out[key]??0)+1;return out;},{}),providerResponseBytes:f.providerRegistry.responses.reduce((out,r)=>{const path=r.path.includes('/versions/')?r.path.replace(/\/versions\/[^/]+$/,'/versions/:id'):r.path,key=r.phase+' '+r.host+' '+r.method+' '+path,row=out[key]??={responses:0,bytes:0};row.responses++;row.bytes+=r.bytes;return out;},{}),providerByHost:final.providerRequests.reduce((out,r)=>{const host=new URL(r.url).host;out[host]=(out[host]??0)+1;return out;},{}),providerByEndpoint:final.providerRequests.reduce((out,r)=>{const u=new URL(r.url),path=u.pathname.includes('/versions/')?u.pathname.replace(/\/versions\/[^/]+$/,'/versions/:id'):u.pathname,key=u.host+' '+r.method+' '+path;out[key]=(out[key]??0)+1;return out;},{}),sends:sends.map(s=>({effect:s.effect,windowMs:s.deadline-s.issuedAt})),receiptInsideActivation:receipt.completedAt<sends.find(s=>s.effect==='activation').deadline}));
+ console.info('T3 native closure SYN',JSON.stringify({sourceRevision:f.source.sourceRevision,testRevision:process.env.GITHUB_SHA,receiptHash:receipt.receiptHash,grantTimestampNative:true,noticeLink:true,seededConnection:false,completePackage:false,operationalReadiness:false}));
+
+});
+
+const effectRows=p=>p.rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:'));
+const ticketUses=p=>p.rows.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use'));
+const receipts=p=>effectRows(p).filter(([k])=>k.endsWith(':receipt'));
+async function waitFirstState(f,predicate,label,observePost=false){
+ let end=performance.now()+30000,waitingPost=observePost,last;
+ for(;;){
+  // GET and POST have separate actual incoming roots. Observe the root whose
+  // native boundary is requested; this DATA timestamp never reaches the product.
+  if(waitingPost&&Number.isFinite(f.choicePostStarted)){end=f.choicePostStarted+30000;waitingPost=false;}
+  if(performance.now()>=end)break;
+  last=await plain(f.stub.firstConnectionState());if(predicate(last))return last;
+  if(waitingPost&&f.failedChoiceState)break;
+  await new Promise(r=>setTimeout(r,10));
+ }
+ const probe=await plain(f.stub.firstConnectionProbe());console.info('T3 missing boundary SYN',JSON.stringify({label,observePost,postObserved:observePost&&!waitingPost,choicePostStarted:f.choicePostStarted,state:{...last,http:undefined,trace:last?.trace?.slice(-12)},failures:probe.observation.filter(v=>['failure','connection-failure'].includes(v.kind)).slice(-8)}));
+ assert.fail('actual native boundary absent: '+label);
+}
+async function firstSettled(f){
+ const end=performance.now()+5000;
+ while(performance.now()<end){const probe=await plain(f.stub.firstConnectionAvailability());if(probe.available){assert.equal(probe.live,true);return;}await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual retained work did not settle');
+}
+async function failureCase(t,mode){
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);
+ const response=await approveFirstConnection(f);assert.notEqual(response.status,200,mode);await response.body?.cancel();
+ const state=f.failedChoiceState??await plain(f.stub.firstConnectionState()),probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0,mode);return {f,probe,state};
+}
+for(const mode of ['enrollment-transaction-lost','enrollment-sync-lost'])test('T3 enrollment unknown cannot upload: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key==='afw.finite-preparation-cleanup.v1:enrollment'&&v.kind==='put-settled'));assert(probe.rows.some(([k])=>k==='afw.finite-preparation-cleanup.v1:enrollment'));assert.equal(effectRows(probe).length,0);const factual=await plain(f.stub.firstConnectionContext());assert.equal(factual.source?.phase,'closed_ui');assert.equal(factual.source.currentPublication.stage,null);const source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,fresh=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':await f.enrollmentToken(source)}});assert.notEqual(fresh.status,200,'genuinely fresh signed choice cannot resume enrollment');await fresh.body?.cancel();assert.equal(f.uploads.length,1);assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);
+});
+for(const mode of ['upload-send-transaction-lost','upload-lost','upload-malformed','upload-cached','upload-oversize'])test('T3 upload uncertainty cannot activate: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key?.endsWith(':send')&&v.kind==='put-settled'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect==='activation'));const context=await plain(f.stub.firstConnectionContext()),publicProbe=await plain(f.stub.firstConnectionProbe());assert(publicProbe.observation.some(v=>v.kind==='public-partial-target'),'valid private partial pair reaches public denial predicate');assert.equal(context.status,'unavailable','public partial connection cannot appear closed_ui');assert.equal(f.uploads.length,mode==='upload-send-transaction-lost'?1:2);
+});
+for(const mode of ['activation-lost','activation-malformed','activation-cached'])test('T3 activation uncertainty cannot finish: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert(state.trace.some(v=>v.effect==='activation'&&v.kind==='native-result-enter'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':ack')&&JSON.parse(v).resourceId==='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'));assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
+});
+for(const mode of ['receipt-transaction-lost','receipt-sync-lost','receipt-readback-lost','final-pair-owner-drift'])test('T3 final readback cannot turn uncertainty into success: '+mode,{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const response=await approveFirstConnection(f);assert.notEqual(response.status,200);await response.body?.cancel();const probe=await readFirstConnectionProbe(f);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert.equal(receipts(probe).length,1,'durable own receipt preserved despite failed response');const state=await plain(f.stub.firstConnectionState());assert(state.trace.some(v=>v.key?.endsWith(':receipt')&&v.kind==='put-settled'));
+});
+for(const mode of ['upload-held','activation-held','upload-read-held','upload-cancel-held','source-sql-held','enrollment-transaction-held','enrollment-sync-held','upload-ack-held','receipt-transaction-held'])test('T3 retained work blocks a different live root: '+mode,{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const pending=approveFirstConnection(f);
+ const which=['upload-held','activation-held'].includes(mode)?'fetch':mode==='upload-read-held'?'read':mode==='upload-cancel-held'?'cancel':'work';
+ const heldState=await waitFirstState(f,s=>s[which+'Held'],'held '+which,true),boundary=which==='cancel'?heldState.uploadAdmission:heldState[which+'Boundary'];assert.equal(boundary.originalMethod,mode==='source-sql-held'?'GET':'POST');assert(boundary.enteredAt>=boundary.startedAt&&boundary.enteredAt<boundary.deadline,'original business IO entered while its original request lease was live');console.info('T3 actual held entry',JSON.stringify({mode,originalIo:boundary,heldBoundary:heldState[which+'Boundary'],cleanupMayOutliveOriginal:which==='cancel'}));
+ const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();
+ const other=await plain(f.stub.firstConnectionAvailability());assert.equal(other.live,true,'different root is genuinely still live');assert.equal(other.available,false,'actual retained native work owns scope');
+ assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
+ await f.stub.firstConnectionRelease(which);
+ if(which==='read'){await waitFirstState(f,s=>s.cancelHeld,'late read reached real cancel');assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);await f.stub.firstConnectionRelease('cancel');}
+ await firstSettled(f);const state=await plain(f.stub.firstConnectionState());assert.equal(state[which+'Settled'],true,'actual native settlement observed');if(which==='read')assert.equal(state.cancelSettled,true);if(['read','cancel'].includes(which))console.info('T3 retained cleanup settled',JSON.stringify({mode,originalIo:boundary,cancelBoundary:state.cancelBoundary,cancelSettled:state.cancelSettled,logicalResponse:response.status}));
+ const probe=await readFirstConnectionProbe(f);assert.equal(f.activations.length,['activation-held','receipt-transaction-held'].includes(mode)?2:1);assert.equal(receipts(probe).length,mode==='receipt-transaction-held'?1:0);assert.equal(effectRows(probe).filter(([k])=>k.endsWith(':ack')).length,mode==='receipt-transaction-held'?2:['activation-held','upload-ack-held'].includes(mode)?1:0);
+});
+for(const effect of ['upload','activation'])for(const variant of ['ack','context'])test('T3 resealed foreign publication is not own completion: '+effect+' '+variant,{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(effect+'-held');const pending=approveFirstConnection(f);await waitFirstState(f,s=>s.fetchHeld,'actual '+effect+' result held',true);
+ assert.deepEqual(await plain(f.stub.firstConnectionReseal(effect,variant)),{codecRoundtrip:true,journalValid:true});
+ await f.stub.firstConnectionRelease('fetch');const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();await firstSettled(f);
+ const probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0);assert.equal(f.activations.length,effect==='upload'?1:2);assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
+});
+
+async function actualChoice(f,token){
+ const response=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.equal(response.status,200);
+ const html=await response.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(html)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(html)?.[1],cookie=response.headers.get('set-cookie')?.split(';')[0];assert(handle&&projectRef&&cookie);return {handle,projectRef,cookie};
+}
+const choicePost=(f,form,token,{body=new URLSearchParams({handle:form.handle,projectRef:form.projectRef,decision:'approve'}).toString(),headers={},url='/connections/finite-prepare'}={})=>f.call(url,{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':token,Cookie:form.cookie,...headers},body});
+test('T3 identity and choice cannot mint admission',{timeout:120000},async t=>{
+ const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,valid=await f.firstConnectionToken(source),parts=valid.split('.'),signature=parts[2],badSignature=parts[0]+'.'+parts[1]+'.'+(signature[0]==='A'?'B':'A')+signature.slice(1);
+ const invalid=[['signature',badSignature],['issuer',await f.firstConnectionToken(source,{issuer:'https://foreign.invalid'})],['audience',await f.firstConnectionToken(source,{audience:'SYN-foreign-audience'})],['subject',await f.firstConnectionToken(source,{subject:'SYN-foreign-owner'})],['expiry',await f.firstConnectionToken(source,{expiresAt:Math.floor(Date.now()/1000)-1})]];
+ for(const [label,token]of invalid){const r=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.notEqual(r.status,200,label);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,label);assert.equal(effectRows(p).length,0,label);}
+ const form=await actualChoice(f,valid),normal=new URLSearchParams({handle:form.handle,projectRef:form.projectRef,decision:'approve'}).toString();
+ const cases=[['Origin',{headers:{Origin:'https://foreign.invalid'}}],['cookie repeat',{headers:{Cookie:form.cookie+'; '+form.cookie}}],['cookie list',{headers:{Cookie:form.cookie+'; bad name=x'}}],['handle',{body:normal.replace(form.handle,'f'.repeat(64))}],['projectRef',{body:normal.replace(form.projectRef,'e'.repeat(64))}],['decision',{body:normal.replace('approve','deny')}],['extra',{body:normal+'&extra=x'}],['duplicate',{body:normal+'&decision=approve'}],['escape',{body:normal+'&x=%ZZ'}],['oversize',{body:normal+'x'.repeat(1025)}],['UTF8',{body:new Uint8Array([0xff])}]];
+ for(const [label,patch]of cases){const r=await choicePost(f,form,valid,patch);assert.notEqual(r.status,200,label);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,label);assert.equal(effectRows(p).length,0,label);}
+ const ticketBaseline=(await readFirstConnectionProbe(f)).rows;
+ for(const variant of ['action','preconnection','source','subject-realm','project-map','snapshot']){
+  const altered=await plain(f.stub.firstConnectionTicketFault(variant));assert.equal(altered.codecRoundtrip,true,variant+' passes actual record codec');
+  const observedBefore=(await plain(f.stub.firstConnectionProbe())).observation.length;const r=await choicePost(f,form,valid);assert.notEqual(r.status,200,'persisted ticket correlation '+variant);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,variant);assert.equal(effectRows(p).length,0,variant);assert(!p.rows.some(([key])=>key.startsWith('connection-approval:')),variant+' cannot approve');assert(p.native.observation.slice(observedBefore).some(v=>v.kind==='correlator'&&v.name===(variant==='snapshot'?'source-snapshot':'ticket-map')),variant+' reaches actual complete-snapshot correlator');
+  await f.stub.firstConnectionTicketFault('restore');assert.deepEqual((await readFirstConnectionProbe(f)).rows,ticketBaseline,'original history restored after negative '+variant);
+  console.info('T3 actual ticket correlation',JSON.stringify({variant,codecRoundtrip:true,ticketUse:0,approval:0,effects:0}));
+ }
+ const accepted=await choicePost(f,form,valid);assert.equal(accepted.status,200,'same actual ticket and current owner remain usable after invalid inputs');await accepted.body?.cancel();assert.equal(receipts(await readFirstConnectionProbe(f)).length,1);
+});
+test('T3 source and rollback must be recoverable',{timeout:120000},async t=>{
+ const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source),headers={'Cf-Access-Jwt-Assertion':token};
+ for(const fault of ['module','configuration','qa-module','qa-namespace','sdk-alias','sdk-extra']){f.ownerFault=fault;const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,fault);await r.body?.cancel();f.ownerFault=null;assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);}
+ for(const fault of ['missing-backup','missing-receipt','missing-chunk','tamper-chunk']){await f.stub.firstConnectionBackupFault(fault);const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,fault);await r.body?.cancel();assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);await f.stub.firstConnectionBackupFault('restore');}
+
+ const originalProviderVersion=structuredClone(f.uploaded);
+ const configFaults=[
+  ['extra binding',v=>v.bindings.push({name:'SYN_UNAPPROVED_BINDING',type:'plain_text',text:'false'})],
+  ['ordinary monitoring flag',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED').text='true';}],
+  ['events flag',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';}],
+  ['nonempty policy',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text='{"SYN":"not empty"}';}],
+  ['physical namespace',v=>{v.bindings.find(b=>b.name==='AFW_FINITE_TRIAL_CONTROL').namespace_id='f'.repeat(32);}],
+  ['limiter',v=>{v.bindings.find(b=>b.name==='DELEGATED_RATE_LIMITER').namespace_id='99199';}],
+  ['secret value',v=>{v.bindings.find(b=>b.type==='secret_text').text='SYN NEGATIVE NEVER AUTHORITY';}]
+ ];
+ for(const [label,mutate]of configFaults){mutate(f.uploaded);const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,label);await r.body?.cancel();assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0,label);assert.equal(ticketUses(await readFirstConnectionProbe(f)).length,0,label);f.uploaded=structuredClone(originalProviderVersion);}
+ const original=(await f.db.prepare('SELECT id,user_id,revision FROM site_projects WHERE id=?').bind(source.project.projectId).first());
+ for(const field of ['user_id','revision']){if(field==='user_id')await f.db.prepare("UPDATE site_projects SET user_id='SYN-owner-drift' WHERE id=?").bind(original.id).run();else await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(original.id).run();const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,field);await r.body?.cancel();await f.db.prepare('UPDATE site_projects SET user_id=?,revision=? WHERE id=?').bind(original.user_id,original.revision,original.id).run();}
+ const form=await actualChoice(f,token);assert(form.handle);const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+});
+test('T3 original deadline fences each native boundary: shorter signed Access before TicketUse',{timeout:120000},async t=>{
+ const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,expiresAt=Math.floor((Date.now()+5000)/1000),token=await f.firstConnectionToken(source,{expiresAt});assert(Date.now()<expiresAt*1000);
+ await f.stub.firstConnectionConfigure('access-expiry-held');const pending=f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});const state=await waitFirstState(f,s=>s.jwkFetched&&s.workHeld,'actual signed verification followed by retained factual read');assert.equal(state.workSettled,undefined);
+ await new Promise(resolve=>setTimeout(resolve,Math.max(1,expiresAt*1000-Date.now()+1)));await f.stub.firstConnectionRelease('work');const response=await pending;assert.equal(response.status,401,'current signed expiry crosses before ticket/admission');await response.body?.cancel();await firstSettled(f);const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);assert.equal(f.uploads.length,1);
+});
+test('T3 admission cannot cross lineage or resume',{timeout:120000},async t=>{
+ const {f,probe}=await failureCase(t,'upload-lost');await firstSettled(f);const before=probe.rows,source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source);await f.stub.firstConnectionRestore();
+ const replay=()=>choicePost(f,f.choice,token);
+ for(const step of ['new root','actual actor restart']){
+  if(step==='actual actor restart'){const instance=await f.stub.firstConnectionInstance();await assert.rejects(async()=>{await f.stub.firstConnectionRestart();});const bindings=await f.mf.getBindings('qa-first-connection');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));assert.notEqual(await f.stub.firstConnectionInstance(),instance);}
+  const r=await replay();assert.notEqual(r.status,200,step);await r.body?.cancel();assert.equal(f.uploads.length,2);assert.equal(f.activations.length,1);assert.deepEqual((await readFirstConnectionProbe(f)).rows,before,'consumed history and unrelated rows preserved');
+ }
+});
+
+test('T3 resealed completed owner baseline physical and receipt facts remain correlated',{timeout:120000},async t=>{
+ const f=await fixture(t),response=await approveFirstConnection(f);assert.equal(response.status,200);await response.body?.cancel();
+ const baseline=await readFirstConnectionProbe(f),posts=baseline.providerRequests.filter(r=>r.method==='POST').length;
+ const variants=['owner','source','context','baseline','preconnection','module','configuration','version','deployment','writer-head','receipt-links','receipt-time'];
+ for(const variant of variants){
+  assert.equal((await plain(f.stub.firstConnectionContext())).source?.phase,'read_consent','valid produced baseline before '+variant);
+  assert.deepEqual(await plain(f.stub.firstConnectionCorruptCompleted(variant)),{codecRoundtrip:true,journalValid:true},variant);
+
+  const observedBefore=(await plain(f.stub.firstConnectionProbe())).observation.length;
+  const r=await plain(f.stub.firstConnectionContext());assert.equal(r.status,'unavailable',variant+' must fail current correlation after valid codecs/journals');
+  const newObservations=(await plain(f.stub.firstConnectionProbe())).observation.slice(observedBefore),target={owner:'preparation',source:'preparation',context:'connection-history',baseline:'connection-history',module:'receipt-physical-hash',configuration:'receipt-physical-hash',version:'publication-pointer',deployment:'publication-pointer','writer-head':'writer-head'}[variant];
+  if(target)assert(newObservations.some(v=>v.kind==='correlator'&&v.name===target),variant+' reaches intended '+target+' correlator');
+  else assert(newObservations.some(v=>v.frames?.some(frame=>frame.includes('qualifyFiniteOwnerInstalledStage'))),variant+' reaches installed-stage receipt link/time correlator');
+
+  const probe=await readFirstConnectionProbe(f),observations=probe.native.observation.filter(v=>v.kind==='public-reader-rejected');assert(observations.length,variant);console.info('T3 completed correlator',JSON.stringify({variant,codecRoundtrip:true,journalValid:true,frames:observations.at(-1).frames}));
+  assert.equal(probe.providerRequests.filter(r=>r.method==='POST').length,posts,'no next provider effect for '+variant);
+  await f.stub.firstConnectionCorruptCompleted('restore');assert.deepEqual((await readFirstConnectionProbe(f)).rows,baseline.rows,'foreign/original rows preserved for '+variant);
+ }
+});
+test('T3 own completion requires genuinely recorded original ACK even when foreign bytes match',{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure('upload-held');const pending=approveFirstConnection(f);await waitFirstState(f,s=>s.fetchHeld,'actual upload result held',true);
+ assert.deepEqual(await plain(f.stub.firstConnectionReseal('upload','ack-matched')),{codecRoundtrip:true,journalValid:true});
+ await f.stub.firstConnectionRelease('fetch');const response=await pending,status=response.status;await response.body?.cancel();await firstSettled(f);const before=await readFirstConnectionProbe(f);assert(before.native.observation.some(v=>v.kind==='journal-mutation'&&v.recordKind==='ConnectionAck'&&v.status==='existing'),'exact valid foreign bytes reach the own-recorded guard');console.info('T3 recorded ACK target',JSON.stringify({status,activations:before.activations,mutant:f.firstConnectionBuild.negativeMutation??null}));assert.notEqual(status,200,'existing foreign ACK cannot be accepted by own continuation');assert.equal(f.activations.length,1);assert.equal(receipts(before).length,0);
+});
+
+for(const mode of ['clock-backward','source-holder-drift','upload-holder-drift','activation-holder-drift','upload-metadata-id-drift','upload-db-method-drift','upload-db-prepare-drift','upload-node-method-drift','upload-self-method-drift','upload-kv-method-drift','upload-fetch-drift','upload-credential-drift'])test('T3 original deadline and holder references remain original: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(mode==='clock-backward'?state.backward:state.holderChanged,true,'actual native guard boundary reached');if(mode!=='clock-backward')assert.deepEqual(state.afterDriftIo,{get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0},'changed original holder cannot invoke the next native factual read');
+ assert.equal(f.uploads.length,['clock-backward','source-holder-drift'].includes(mode)?1:2);assert.equal(f.activations.length,mode==='activation-holder-drift'?2:1);
+ assert.equal(effectRows(probe).filter(([key])=>key.endsWith(':ack')).length,mode==='activation-holder-drift'?1:0,'changed original holder cannot produce ACK');if(mode!=='activation-holder-drift')assert(!effectRows(probe).some(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect==='activation'),'changed original holder denies activation SEND');if(['clock-backward','source-holder-drift'].includes(mode))assert.equal(ticketUses(probe).length,0);
+});
+test('T3 original parent expires before first native IO',{timeout:120000},async t=>{
+ const f=await fixture(t),before=await readFirstConnectionProbe(f);const result=await plain(f.stub.firstConnectionExpiredEntry());assert.notEqual(result.status,200);const after=await readFirstConnectionProbe(f);assert.equal(after.providerRequests.length,before.providerRequests.length,'expired original boundary admits no provider IO');assert.deepEqual(after.rows,before.rows);assert.equal(ticketUses(after).length,0);assert.equal(effectRows(after).length,0);
+});
+for(const kind of ['overflow','read'])test('T3 original body retains real read and cancellation: '+kind,{timeout:120000},async t=>{
+ const f=await fixture(t),before=await readFirstConnectionProbe(f),pending=plain(f.stub.firstConnectionBodyStart(kind));
+ const until=async predicate=>{const end=performance.now()+10000;while(performance.now()<end){const state=await plain(f.stub.firstConnectionBodyState());if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}assert.fail('actual body boundary absent '+kind);};
+ await until(s=>kind==='read'?s.readHeld:s.cancelHeld);
+ if(kind==='read')await f.stub.firstConnectionBodyControl('abort');
+ const response=await pending;assert.notEqual(response.status,200);const competing=await plain(f.stub.firstConnectionAvailability());assert.equal(competing.live,true);assert.equal(competing.available,false);
+ if(kind==='read'){await f.stub.firstConnectionBodyControl('read');await until(s=>s.cancelHeld);assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);}
+ await f.stub.firstConnectionBodyControl('cancel');await until(s=>s.cancelSettled);await firstSettled(f);
+ const state=await plain(f.stub.firstConnectionBodyState());assert.equal(state.logicalFinished,true);assert.equal(state.cancelSettled,true);if(kind==='read')assert.equal(state.readSettled,true);
+ const after=await readFirstConnectionProbe(f);assert.equal(after.providerRequests.length,before.providerRequests.length);assert.deepEqual(after.rows,before.rows);assert.equal(ticketUses(after).length,0);assert.equal(effectRows(after).length,0);
+});
+
+test('T3 fixed protocol and genuinely compiled foreign profile cannot mint choice',{timeout:120000},async t=>{
+ const f=await fixture(t,{negativeProfile:true}),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source),initial=await readFirstConnectionProbe(f);
+ assert.equal(typeof f.firstConnectionBuild.wrongProfileHash,'string');assert.notEqual(f.firstConnectionBuild.wrongProfileHash,f.firstConnectionBuild.M.sha256);
+ const wrong=await f.wrongProfile.fetch(O+'/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.notEqual(wrong.status,200);await wrong.body?.cancel();
+ const wrongProbe=await (await f.wrongProfile.fetch(O+'/_fixture/probe')).json();assert.equal(wrongProbe.ordinary,0);assert.equal(wrongProbe.sql,0);assert.equal(wrongProbe.forwarded,0);assert.equal((await readFirstConnectionProbe(f)).native.calls.length,0);
+ const transport=()=>{const at=Date.now();return new Headers({'x-afw-finite-boundary':JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}),'x-afw-finite-original-method':'GET','x-afw-finite-original-url':O+'/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID(),'Cf-Access-Jwt-Assertion':token});};
+ const cases=[['extra protocol',h=>h.set('x-afw-finite-extra','SYN unknown')],['duplicate version',h=>h.append('x-afw-finite-version',h.get('x-afw-finite-version'))],['duplicate request ID',h=>h.append('x-afw-finite-request-id',h.get('x-afw-finite-request-id'))],['duplicate original method',h=>h.append('x-afw-finite-original-method','GET')],['duplicate boundary',h=>h.append('x-afw-finite-boundary',h.get('x-afw-finite-boundary'))]];
+ for(const [label,change]of cases){const headers=transport();change(headers);const response=await f.stub.fetch('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers});assert.notEqual(response.status,200,label);await response.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(p.providerRequests.length,initial.providerRequests.length,label+' denies before factual IO');assert.equal(ticketUses(p).length,0);assert.equal(p.native.business.length,0);assert.equal(effectRows(p).length,0);}
+ const headers=transport();headers.set('X-SYN-Unrelated-Trace','ignored input, never permission');const counterpart=await f.stub.fetch('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers});assert.equal(counterpart.status,200,'same signed fixed protocol otherwise reaches real choice');await counterpart.body?.cancel();const p=await readFirstConnectionProbe(f);assert(p.native.business.some(key=>key.startsWith('owner-ticket:')));assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);
+ console.info('T3 compiled profile negative',JSON.stringify({positiveM:f.firstConnectionBuild.M.sha256,negativeProfileM:f.firstConnectionBuild.wrongProfileHash,protocolVariants:cases.length,ignoredUnrelatedHeader:true}));
+});
+
+for(const fault of ['upload-module','upload-config','upload-pointer','activation-pointer','activation-percentage','activation-version','activation-config','activation-secret'])test('T3 actual publication readback denies next effect: '+fault,{timeout:120000},async t=>{
+ const f=await fixture(t);f.connectionReadbackFault=fault;
+ const response=await approveFirstConnection(f);assert.notEqual(response.status,200,fault);await response.body?.cancel();
+ assert(f.connectionReadbackHits>0,'actual fixed provider readback reached '+fault);
+ const probe=await readFirstConnectionProbe(f);assert.equal(f.uploads.length,2,'actual original upload was applied');
+ assert.equal(f.activations.length,fault.startsWith('upload-')?1:2,'invalid upload readback cannot activate');
+ assert.equal(receipts(probe).length,0,'invalid activation readback cannot issue receipt');
+ assert(!effectRows(probe).some(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect==='activation')||fault.startsWith('activation-'),'invalid upload readback denies activation SEND');
+ assert.equal(effectRows(probe).filter(([key])=>key.endsWith(':ack')).length,fault.startsWith('upload-')?1:2,'original native ACKs preserved without compensation');
+ console.info('T3 actual readback target',JSON.stringify({fault,hits:f.connectionReadbackHits,uploads:f.uploads.length,activations:f.activations.length,receipt:0}));
 });

diff --git a/test/fixtures/finite-first-connection-publication.mjs b/test/fixtures/finite-first-connection-publication.mjs
--- a/test/fixtures/finite-first-connection-publication.mjs
+++ b/test/fixtures/finite-first-connection-publication.mjs
@@ -92,77 +92,310 @@
 
 // First-connection SOURCE lab: no seeded connection facts or source alias.
 import {build} from 'esbuild';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
 import {readFile} from 'node:fs/promises';
 import {buildMcpNodeProgram} from '../../scripts/build-mcp-node-program.mjs';
 import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const digest=x=>createHash('sha256').update(x).digest('hex');
 const origin='https://delegated-canary.agentfriendlyweb.dev';
-export async function compileFirstConnectionCandidate(revision,tree){
+export async function compileFirstConnectionCandidate(revision,tree,{negativeProfile=false}={}){
  const node=await buildMcpNodeProgram(),define={'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('finite_trial_event')};
  const options={bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define};
  const m=await build({...options,entryPoints:['worker/mcp-own/finite.mjs']});
  const bytes=m.outputFiles[0].contents,compressed=gzipSync(bytes,{level:9,mtime:0});
  const resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:revision,sourceTree:tree,sourceCheck:'git-inputs-before-after-v1',programHash:node.programHash,module:{name:'index.mjs',sha256:digest(bytes),bytes:bytes.length},compressedSha256:digest(compressed),compressedBytes:compressed.length,content:Buffer.from(compressed).toString('base64')};
  // Negative-only, separately hashed ordinary-entry/SQL spy. The positive M
  // uses m.outputFiles unchanged, not this instrumented wrapper.
  const source=String.raw`
  import finite from './worker/mcp-own/finite.mjs';
  export {AfwOwnEventNode,AfwNodeControl} from './worker/mcp-own/finite.mjs';
  import {finiteNativeActor} from './lib/mcp-qa-finite-owner-native-wire.mjs';
  let fault='none';globalThis.__firstConnectionOrdinary=0;let sql=0,forwarded=0;
  export default{async fetch(request,env,ctx){
   const path=new URL(request.url).pathname;
   if(path==='/_fixture/fault'){fault=await request.text();return new Response(null,{status:204});}
   if(path==='/_fixture/probe')return Response.json({ordinary:globalThis.__firstConnectionOrdinary,sql,forwarded});
   const ns=env.AFW_FINITE_TRIAL_CONTROL,db=env.DB;
   const prepared={...env,DB:{prepare(...a){sql++;return db.prepare(...a);},withSession(...a){sql++;return db.withSession(...a);}}};
   if(fault==='qa-absent')prepared.AFW_FINITE_TRIAL_CONTROL=undefined;
   if(fault==='version')prepared.AFW_FINITE_TRIAL_VERSION={id:'invalid'};
-  if(fault==='profile')prepared.AFW_DELEGATED_OAUTH_ENABLED='false';
   if(fault==='actor')prepared.AFW_FINITE_TRIAL_CONTROL={idFromName(){return {toString:()=> 'bad'};},get(){throw Error('SYN wrong actor');}};
   if(!['qa-absent','actor'].includes(fault))prepared.AFW_FINITE_TRIAL_CONTROL={idFromName:ns.idFromName.bind(ns),get(id){
    const stub=ns.get(id);return {fetch(req){forwarded++;if(fault==='version-drift'){prepared.AFW_FINITE_TRIAL_VERSION={id:env.AFW_FINITE_TRIAL_VERSION.id};}return stub.fetch(req);}};
   }};
   if(fault==='oauth-open')prepared.AFW_DELEGATED_OAUTH_ENABLED='true';
-  if(fault==='wrong-profile')return finite.fetch(request,{...prepared},ctx);
   // Literal actor is asserted in the product forwards, never selected by input.
   if(!finiteNativeActor)throw Error('SYN missing actor');
   return finite.fetch(request,prepared,ctx);
  }};
  `;
- const spy=await build({...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]});
- return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents)};
+ const spyOptions={...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]};
+ const spy=await build(spyOptions),wrong=negativeProfile?await build({...spyOptions,define:{...define,'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('ordinary')}}):null;
+ return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents),wrongProfileScript:wrong?.outputFiles[0].text??null,wrongProfileHash:wrong?digest(wrong.outputFiles[0].contents):null};
 }
 export function extendFirstConnectionPublication(entry){
- return entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
+ return "import {createFinitePolicyEffectJournal as firstJournal} from './lib/mcp-qa-finite-policy-journal.mjs';\nimport {hashFinitePreparationRecord as firstPrepHash,encodeFinitePreparationRecord as firstPrepEncode,decodeFinitePreparationRecord as firstPrepDecode,hashFinitePolicyEffectIdentity as firstIdentityHash} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {readPrivateQaFiniteOwnerContext as firstConnectionContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
  async fetch(request){
-  this.firstConnectionCalls??=[];this.firstConnectionCalls.push({url:request.url,method:request.method,version:request.headers.get('x-afw-finite-version')});
+  try{this.firstBoundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));}catch{this.firstBoundary=null;}this.firstOriginalMethod=request.headers.get('x-afw-finite-original-method');this.firstConnectionCalls??=[];this.firstConnectionCalls.push({boundary:this.firstBoundary,url:request.url,method:request.method,version:request.headers.get('x-afw-finite-version')});
   return super.fetch(request);
  }
- async firstConnectionProbe(){const rows=[...await this.ctx.storage.list()];return {calls:this.firstConnectionCalls??[],business:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')||k.startsWith('connection-preparation:')||k.startsWith('afw.finite-preparation-cleanup.v1:')||k.startsWith('owner-ticket:')).map(([key])=>key),alarm:await this.ctx.storage.getAlarm()};}
+
+
+
+
+ async firstConnectionTicketFault(variant){
+  const s=this.ctx.storage;
+  if(variant==='restore'){for(const [key,raw]of this.firstTicketOriginal??[])await s.put(key,raw);this.firstTicketOriginal=null;await s.sync();return {restored:true};}
+  if(this.firstTicketOriginal)throw Error('SYN ticket corruption not restored');
+  const rows=[...await s.list()],ticketRow=rows.find(([key])=>key.startsWith('owner-ticket:')&&!key.endsWith(':use'));if(!ticketRow)throw Error('SYN actual choice ticket absent');
+  let key=ticketRow[0],kind='Ticket',record=JSON.parse(ticketRow[1]);
+  if(variant==='action'){record.action='notices';record.connectionRef='c'.repeat(64);}
+  if(variant==='preconnection')record.preconnectionId='f'.repeat(64);
+  if(variant==='source')record.sourceRevision='e'.repeat(40);
+  if(variant==='subject-realm')record.subjectHash='d'.repeat(64);
+  if(variant==='project-map'){kind='ProjectRef';key='owner-project-ref:'+record.projectRef;record=JSON.parse(await s.get(key));record.projectId='SYN-foreign-project';}
+  if(variant==='snapshot'){kind='OwnerSourceSnapshot';key='connection-preparation:'+record.preconnectionId+':source';record=JSON.parse(await s.get(key));record.source.project.revision++;record.sourceHash=firstPrepHash(kind,record);}
+  const original=await s.get(key),raw=firstPrepEncode(kind,record);if(firstPrepEncode(kind,firstPrepDecode(kind,raw))!==raw)throw Error('SYN negative ticket codec');
+  this.firstTicketOriginal=[[key,original]];await s.put(key,raw);await s.sync();return {codecRoundtrip:true,kind};
+ }
+ async firstConnectionCorruptCompleted(variant){
+  const s=this.ctx.storage;
+  if(variant==='restore'){for(const [key,raw]of this.firstCorruptedOriginal??[])await s.put(key,raw);this.firstCorruptedOriginal=null;await s.sync();return;}
+  if(this.firstCorruptedOriginal)throw Error('SYN corruption not restored');
+  const rows=[...await s.list()],effect=rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')),send=kind=>effect.find(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect===kind),u=send('upload'),a=send('activation'),r=effect.find(([key])=>key.endsWith(':receipt'));
+  if(!u||!a||!r)throw Error('SYN actual completed publication absent');
+  const up=JSON.parse(u[1]),act=JSON.parse(a[1]),uploadAck=JSON.parse(await s.get(u[0].slice(0,-4)+'ack')),activationAck=JSON.parse(await s.get(a[0].slice(0,-4)+'ack')),receipt=JSON.parse(r[1]),modified=[];
+  const change=async(key,kind,value)=>{const original=await s.get(key);modified.push([key,original]);if(kind==='Preconnection')value.recordHash=firstPrepHash(kind,value);if(kind==='ConnectionReceipt')value.receiptHash=firstPrepHash(kind,value);const raw=firstPrepEncode(kind,value);if(firstPrepEncode(kind,firstPrepDecode(kind,raw))!==raw)throw Error('SYN codec did not roundtrip');await s.put(key,raw);};
+  const foreign='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
+  if(variant==='owner'||variant==='source'){
+   const key='connection-preparation:'+receipt.preconnectionId+':record',pre=JSON.parse(await s.get(key));if(variant==='owner')pre.owner.subject='SYN-foreign-owner';else pre.sourceRevision='e'.repeat(40);await change(key,'Preconnection',pre);
+  }else{
+   if(variant==='context')up.contextHash=act.contextHash='f'.repeat(64);
+   if(variant==='baseline'){up.baselineVersionId=act.baselineVersionId=receipt.baselineVersionId=foreign;up.baselineDeploymentId=act.baselineDeploymentId=receipt.baselineDeploymentId=foreign;}
+   if(variant==='preconnection')receipt.preconnectionId='f'.repeat(64);
+   if(variant==='module')receipt.moduleHash='f'.repeat(64);
+   if(variant==='configuration')receipt.configurationHash='f'.repeat(64);
+   if(variant==='version')uploadAck.resourceId=receipt.versionId=foreign;
+   if(variant==='deployment')activationAck.resourceId=receipt.deploymentId=foreign;
+   if(variant==='receipt-links')receipt.baselineDeploymentId=foreign;
+   if(variant==='receipt-time')receipt.completedAt=act.deadline;
+   if(!['context','baseline','preconnection','module','configuration','version','deployment','receipt-links','receipt-time','writer-head'].includes(variant))throw Error('SYN unknown completed variant');
+   uploadAck.sendHash=firstPrepHash('ConnectionSend',up);activationAck.sendHash=firstPrepHash('ConnectionSend',act);
+   for(const [key,kind,value]of [[u[0],'ConnectionSend',up],[a[0],'ConnectionSend',act],[u[0].slice(0,-4)+'ack','ConnectionAck',uploadAck],[a[0].slice(0,-4)+'ack','ConnectionAck',activationAck],[r[0],'ConnectionReceipt',receipt]])await change(key,kind,value);
+   const key='afw.finite-policy-effect.v1:writer-head';modified.push([key,await s.get(key)]);const h=variant==='writer-head'?up:act,identity={kind:'connection',preconnectionId:h.preconnectionId,sourceRevision:h.sourceRevision,stage:h.stage,effect:h.effect};await s.put(key,JSON.stringify({identityHash:firstIdentityHash(identity),sendHash:firstPrepHash('ConnectionSend',h)}));
+  }
+  this.firstCorruptedOriginal=modified;await s.sync();
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/journal-codec'));
+  try{const identity=kind=>({kind:'connection',preconnectionId:up.preconnectionId,sourceRevision:up.sourceRevision,stage:'connection',effect:kind}),upload=await firstJournal({storage:s,identity:identity('upload'),now:Date.now}).read(root.lease),activation=await firstJournal({storage:s,identity:identity('activation'),now:Date.now}).read(root.lease);return {codecRoundtrip:true,journalValid:upload.state==='acknowledged'&&activation.state==='installed'};}finally{root.finish();}
+ }
+
+
+ async firstConnectionExpiredEntry(){
+  const now=Date.now(),headers={'x-afw-finite-boundary':JSON.stringify({startedAt:now-30000,deadline:now-1,remainingMs:0}),'x-afw-finite-original-method':'GET','x-afw-finite-original-url':'https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID()};
+  const response=await this.fetch(new Request('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers})),status=response.status;await response.body?.cancel();return {status};
+ }
+ async firstConnectionBodyControl(key){if(this.firstBodyControl)this.firstBodyControl[key]=true;}
+ async firstConnectionBodyState(){return this.firstBodyState??{};}
+ async firstConnectionBodyStart(kind='read'){
+  const began=Date.now(),deadline=began+30000,owner=this,controller=new AbortController(),state=this.firstBodyState={readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false,kind},control=this.firstBodyControl={abort:false,read:false,cancel:false};
+  const held=key=>{state[key+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(remaining<=0){state[key+'Settled']=true;reject(Error('SYN original body deadline'));return;}if(control[key]){state[key+'Settled']=true;resolve();return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
+  let pulled=false;
+  const body=new ReadableStream({start(c){if(kind==='overflow')c.enqueue(new Uint8Array(1025));},pull(c){if(kind!=='read'||pulled)return;pulled=true;return held('read').then(()=>{c.enqueue(new TextEncoder().encode('handle='+'a'.repeat(64)));});},cancel(){return held('cancel');}},{highWaterMark:0});
+  const headers={'x-afw-finite-boundary':JSON.stringify({startedAt:began,deadline,remainingMs:30000}),'x-afw-finite-original-method':'POST','x-afw-finite-original-url':'https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID(),Origin:'https://delegated-canary.agentfriendlyweb.dev','Content-Type':'application/x-www-form-urlencoded'};
+  let timer,logicalFinished=false;
+  const tick=()=>{if(logicalFinished)return;if(control.abort||Date.now()>=deadline){controller.abort();return;}timer=setTimeout(tick,Math.min(10,Math.max(1,deadline-Date.now())));};tick();
+  try{const response=await owner.fetch(new Request('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers,body,signal:controller.signal}));state.status=response.status;await response.body?.cancel();return state;}
+  finally{logicalFinished=true;clearTimeout(timer);state.logicalFinished=true;}
+ }
+
+ async firstConnectionRestart(){this.ctx.abort('SYN original actor restart');}
+ async firstConnectionInstance(){return this.firstInstance??=crypto.randomUUID();}
+ async firstConnectionBackupFault(mode){
+  const s=this.ctx.storage;
+  if(mode==='restore'){for(const [key,raw]of this.firstBackupOriginal??[])await s.put(key,raw);await s.sync();return;}
+  const rows=[...await s.list()],entries=rows.filter(([key])=>key.startsWith('afw.finite-initial-upload.v1:'));this.firstBackupOriginal??=entries;
+  const backup=entries.find(([key])=>key.endsWith(':backup')),chunk=entries.find(([key])=>key.includes(':chunk:')),receipt=entries.find(([key])=>key.endsWith(':receipt'));
+  const target=mode==='missing-backup'?backup:mode==='missing-receipt'?receipt:chunk;if(!target)throw Error('SYN retained original target absent');
+  if(mode.startsWith('missing-'))await s.delete(target[0]);else await s.put(target[0],target[1]+' ');
+  await s.sync();
+ }
+ async firstConnectionAvailability(){
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/live-root')),entered=Date.now();
+  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({available:true,live:true,entered}));}
+  catch{return {available:false,live:!root.lease.signal.aborted,entered};}finally{root.finish();}
+ }
+ async firstConnectionRestore(){this.firstRestore?.();this.firstRestore=null;}
+ async firstConnectionState(){return {...(this.firstState??{trace:[]}),http:globalThis.__t3Http??[]};}
+ async firstConnectionRelease(which='work'){if(this.firstRelease)this.firstRelease[which]=true;}
+ async firstConnectionConfigure(mode='normal'){
+  this.firstRestore?.();this.firstState={mode,trace:[],fetchHeld:false,fetchSettled:false,readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false};this.firstRelease={};
+  const owner=this,state=this.firstState,s=this.ctx.storage,env=this.env,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},fetcher=globalThis.fetch,wall=Date.now;
+  let writes=[],receiptRead=false,shift=0;const originalMetadata=env.AFW_QA_VERSION,originalQaId=originalMetadata.id,originalPrepare=env.RELEASE_DB.prepare,originalNode=env.AFW_RELEASE_EVENTS_NODE,nodeName=originalNode.idFromName,originalSelf=env.AFW_INDEPENDENT_CLOSURE,selfGet=originalSelf.get,originalKv=env.AFW_FINITE_OWNER_OAUTH_KV,kvGet=originalKv.get,originalReader=env.AFW_MCP_CLOSURE_READ_TOKEN;state.afterDriftIo={get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0};const afterDrift=kind=>{if(state.holderChanged)state.afterDriftIo[kind]++;};state.counts={get:0,list:0,transaction:0,sync:0,firstPrimary:0,sql:0};const db=env.RELEASE_DB,withSession=db.withSession;
+  db.withSession=(...args)=>{afterDrift('db');if(args[0]==='first-primary')state.counts.firstPrimary++;const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=(...a)=>{state.counts.sql++;const statement=Reflect.apply(prepare,session,a);if(mode==='source-sql-held'&&String(a[0]).includes('site_projects')){const bind=statement.bind;statement.bind=(...values)=>{const bound=Reflect.apply(bind,statement,values),first=bound.first;bound.first=async(...params)=>{const actual=Reflect.apply(first,bound,params),value=await actual;if(state.sqlHeld)return value;state.sqlHeld=true;return held('work',value);};return bound;};}return statement;};return session;};
+  s.list=(...args)=>{afterDrift('list');state.counts.list++;return Reflect.apply(native.list,s,args);};
+  const target=key=>typeof key==='string'&&(key.startsWith('afw.finite-preparation-cleanup.v1:')||key.startsWith('afw.finite-policy-effect.v1:'));
+  const note=(kind,key)=>{if(target(key))state.trace.push({kind,key,at:Date.now()});};
+  const held=(name,value)=>{const deadline=owner.firstBoundary.deadline;state[name+'Boundary']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};state[name+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(!Number.isSafeInteger(remaining)||remaining<=0){state[name+'Settled']=true;reject(Error('SYN original request deadline'));return;}if(owner.firstRelease[name]===true){state[name+'Settled']=true;resolve(value);return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
+  const get=async(method,holder,args)=>{
+   afterDrift('get');state.counts.get++;const value=await Reflect.apply(method,holder,args),key=args[0];note('get-settled',key);
+   if(mode==='clock-backward'&&owner.firstBoundary&&!state.backward){shift-=100;state.backward=true;}
+   if(mode==='source-holder-drift'&&owner.firstBoundary&&!state.holderChanged){env.AFW_QA_VERSION={id:originalMetadata.id};state.holderChanged=true;}
+   if(mode==='access-expiry-held'&&state.jwkFetched&&!state.workHeld)return held('work',value);
+   if(mode==='receipt-readback-lost'&&key.endsWith(':receipt')&&key.startsWith('afw.finite-policy-effect.v1:')&&value!==undefined)throw Error('SYN receipt readback unknown');
+   if(mode==='final-pair-owner-drift'&&receiptRead&&key.endsWith(':capsule'))await env.RELEASE_DB.prepare("UPDATE site_projects SET user_id='SYN-negative-owner'").run();
+   if(target(key)&&key.endsWith(':receipt')&&value!==undefined)receiptRead=true;
+   return value;
+  };
+  s.get=(...a)=>get(native.get,s,a);
+  s.transaction=fn=>{
+   state.counts.transaction++;const currentWrites=[];
+   const actual=Reflect.apply(native.transaction,s,[async tx=>{
+    const result=await fn({get:(...a)=>get(tx.get,tx,a),list:tx.list.bind(tx),put:async(k,v)=>{note('put-enter',k);const out=await tx.put(k,v);note('put-settled',k);currentWrites.push(k);return out;}});
+    return result;
+   }]).then(value=>{writes=currentWrites;for(const key of writes)note('transaction-settled',key);return value;});
+   return actual.then(async value=>{
+    if(mode==='enrollment-transaction-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-send-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'))||mode==='receipt-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native transaction result lost');
+    if(mode==='enrollment-transaction-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-ack-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':ack'))||mode==='receipt-transaction-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':receipt')))return held('work',value);
+    return value;
+   });
+  };
+  s.sync=async(...args)=>{
+   state.counts.sync++;const value=await Reflect.apply(native.sync,s,args);for(const key of writes)note('sync-settled',key);
+   if(mode==='enrollment-sync-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='receipt-sync-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native sync result lost');
+   if(mode==='enrollment-sync-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment'))return held('work',value);
+   return value;
+  };
+  globalThis.fetch=async(...args)=>{
+   const url=String(args[0]),method=args[1]?.method??'GET',effect=method==='POST'?(url.endsWith('/versions?deploy=false')?'upload':url.endsWith('/deployments')?'activation':null):null;
+   afterDrift('fetch');if(effect)state[effect+'Admission']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};const response=await Reflect.apply(fetcher,globalThis,args);if(url.endsWith('/cdn-cgi/access/certs'))state.jwkFetched=true;if(!effect)return response;
+   state.trace.push({kind:'native-result-enter',effect,at:Date.now()});
+   if(effect==='upload'){
+    if(mode==='upload-metadata-id-drift'){originalMetadata.id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';state.holderChanged=true;}
+    if(mode==='upload-db-method-drift'){db.withSession=(...args)=>{afterDrift('db');return Reflect.apply(withSession,db,args);};state.holderChanged=true;}
+    if(mode==='upload-db-prepare-drift'){db.prepare=(...args)=>{afterDrift('db');return Reflect.apply(originalPrepare,db,args);};state.holderChanged=true;}
+    if(mode==='upload-node-method-drift'){originalNode.idFromName=(...args)=>{afterDrift('node');return Reflect.apply(nodeName,originalNode,args);};state.holderChanged=true;}
+    if(mode==='upload-self-method-drift'){originalSelf.get=(...args)=>{afterDrift('self');return Reflect.apply(selfGet,originalSelf,args);};state.holderChanged=true;}
+    if(mode==='upload-kv-method-drift'){originalKv.get=(...args)=>{afterDrift('kv');return Reflect.apply(kvGet,originalKv,args);};state.holderChanged=true;}
+    if(mode==='upload-fetch-drift'){globalThis.fetch=(...args)=>{afterDrift('fetch');return Reflect.apply(fetcher,globalThis,args);};state.holderChanged=true;}
+    if(mode==='upload-credential-drift'){env.AFW_MCP_CLOSURE_READ_TOKEN='SYN-negative-changed-reader';state.holderChanged=true;}
+   }
+   if(mode===effect+'-holder-drift'){env.AFW_QA_VERSION={id:originalMetadata.id};state.holderChanged=true;}
+   if(mode===effect+'-lost')throw Error('SYN applied provider result lost');
+   if(mode===effect+'-held')return held('fetch',response);
+   if(mode===effect+'-malformed'){await response.body.cancel();return Response.json({success:true,errors:[],messages:[],result:{id:'invalid'}},{headers:response.headers});}
+   if(mode===effect+'-cached'){await response.body.cancel();return new Response('SYN rejected cache',{status:200,headers:{...Object.fromEntries(response.headers),Age:'1'}});}
+   if(mode==='upload-oversize'){await response.body.cancel();return new Response('SYN header only',{status:200,headers:{...Object.fromEntries(response.headers),'Content-Length':'4718593'}});}
+   if(mode==='upload-cancel-held'){await response.body.cancel();return new Response(new ReadableStream({cancel(){return held('cancel');}}),{status:401,headers:response.headers});}
+   if(mode==='upload-read-held'){
+    await response.body.cancel();let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return held('read').then(()=>{controller.enqueue(new Uint8Array([123]));});},cancel(){return held('cancel');}}),{headers:response.headers});
+   }
+   return response;
+  };
+  Date.now=()=>wall()+shift;
+  this.firstRestore=()=>{for(const [key,value]of Object.entries(native))s[key]=value;globalThis.fetch=fetcher;Date.now=wall;db.withSession=withSession;originalMetadata.id=originalQaId;env.AFW_QA_VERSION=originalMetadata;db.prepare=originalPrepare;originalNode.idFromName=nodeName;originalSelf.get=selfGet;originalKv.get=kvGet;env.AFW_MCP_CLOSURE_READ_TOKEN=originalReader;};
+ }
+ async firstConnectionReseal(effect='upload',variant='ack'){
+  const s=this.ctx.storage,rows=[...await s.list({prefix:'afw.finite-policy-effect.v1:'})],pair=rows.find(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect===effect);if(!pair)throw Error('SYN actual SEND absent');
+  const send=JSON.parse(pair[1]),resourceId=effect==='upload'?'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa':'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
+  if(variant==='ack-matched'){const frozen=Date.now();Date.now=()=>frozen;}
+  if(variant==='context'){send.contextHash='f'.repeat(64);await s.put(pair[0],firstPrepEncode('ConnectionSend',send));}
+  const ack={purpose:'afw.finite-connection-ack.v1',sendHash:firstPrepHash('ConnectionSend',send),resourceId,acknowledgedAt:Date.now()},raw=firstPrepEncode('ConnectionAck',ack);
+  await s.put(pair[0].slice(0,-4)+'ack',raw);await s.sync();
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/foreign-journal'));
+  try{const read=await firstJournal({storage:s,identity:{kind:'connection',preconnectionId:send.preconnectionId,sourceRevision:send.sourceRevision,stage:send.stage,effect},now:Date.now}).read(root.lease);return {codecRoundtrip:firstPrepEncode('ConnectionAck',firstPrepDecode('ConnectionAck',raw))===raw,journalValid:read.state==='acknowledged'};}finally{root.finish();}
+ }
+
+ async firstConnectionContext(){const request=new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/current'),root=createFiniteOwnerRequestLease(request);try{return await firstConnectionContext({ctx:this.ctx,env:this.env,parent:root.lease});}catch(error){(globalThis.__t3Observation??=[]).push({kind:'public-reader-rejected',frames:String(error.stack).split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,8)});return {status:'unavailable'};}finally{root.finish();}}
+ async firstConnectionProbe(){const rows=[...await this.ctx.storage.list()];return {observation:globalThis.__t3Observation??[],calls:this.firstConnectionCalls??[],business:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')||k.startsWith('connection-preparation:')||k.startsWith('afw.finite-preparation-cleanup.v1:')||k.startsWith('owner-ticket:')).map(([key])=>key),alarm:await this.ctx.storage.getAlarm()};}
  `);
 }
 export function firstConnectionWorkers(qa,candidate){
  const p=finiteWranglerProfileTemplate('canaryLive'),bindingValues={...p.vars};
  const options={modules:true,outboundService:async()=>new Response(null,{status:503}),compatibilityDate:p.compatibility_date,compatibilityFlags:p.compatibility_flags,durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-first-connection',useSQLite:true,uniqueKey:'initial-c2a'},AFW_DOSSIER_EVENTS_NODE:{className:'AfwOwnEventNode',useSQLite:true,uniqueKey:'first-connection-node'}},d1Databases:{DB:'initial-db'},kvNamespaces:{OAUTH_KV:'first-connection-oauth'},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99126',simple:{limit:1000,period:60}}},bindings:{...bindingValues,AFW_FINITE_TRIAL_VERSION:{id:'55555555-5555-4555-8555-555555555555'}}};
- return {workers:[{...options,name:'canary-first-connection',script:candidate.script},qa,{...options,name:'negative-first-connection',script:candidate.spyScript}]};
+ return {workers:[{...options,name:'canary-first-connection',script:candidate.script},qa,{...options,name:'negative-first-connection',script:candidate.spyScript},...(candidate.wrongProfileScript?[{...options,name:'wrong-profile-first-connection',script:candidate.wrongProfileScript}]:[])]};
 }
-export async function approveFirstConnection(f){
- assert.equal(f.mode,'first-connection-publication');
+export async function approveFirstConnection(f,{token=null}={}){
+ assert.equal(f.mode,'first-connection-publication');f.choicePostStarted=null;f.failedChoiceState=null;
  const facts=await plain(f.stub.capsuleFacts()),source=facts.material.ownerSelection;
- const screen=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':await f.enrollmentToken(source)}});
- if(screen.status!==200)return screen;
+ const screenStart=performance.now(),screen=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token??await f.enrollmentToken(source)}});
+ console.info('T3 actual choice GET',JSON.stringify({status:screen.status,elapsedMs:performance.now()-screenStart}));if(screen.status!==200){f.failedChoiceState=await plain(f.stub.firstConnectionState());console.info('T3 actual choice failure',JSON.stringify(await plain(f.stub.firstConnectionProbe())));return screen;}
  const text=await screen.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(text)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(text)?.[1],cookie=screen.headers.get('set-cookie')?.split(';')[0];
  assert(handle&&projectRef&&cookie,'actual choice must supply bounded form/cookie');
- return f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':await f.enrollmentToken(source),Cookie:cookie},body:new URLSearchParams({handle,projectRef,decision:'approve'}).toString()});
+ f.choice={handle,projectRef,cookie};const postToken=token??await f.enrollmentToken(source);f.choicePostStarted=performance.now();
+ return f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':postToken,Cookie:cookie},body:new URLSearchParams({handle,projectRef,decision:'approve'}).toString()});
 }
 export async function setFirstConnectionFault(f,fault){
- assert.equal(f.mode,'first-connection-publication');assert(['none','qa-absent','version','profile','actor','version-drift','oauth-open'].includes(fault));
+ assert.equal(f.mode,'first-connection-publication');assert(['none','qa-absent','version','actor','version-drift','oauth-open'].includes(fault));
  const response=await f.negative.fetch(origin+'/_fixture/fault',{method:'POST',body:fault});assert.equal(response.status,204);
 }
 export async function readFirstConnectionProbe(f){
  const rows=await plain(f.stub.snapshot()),native=await plain(f.stub.firstConnectionProbe()),negative=await (await f.negative.fetch(origin+'/_fixture/probe')).json();
  return {native,negative,providerRequests:f.providerRegistry.requests.slice(),uploads:f.uploads.length,activations:f.activations.length,effects:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,rows};
+}
+
+/** Passive SYN scalar/frame observation; no guard, return, body or source changed. */
+export function instrumentFirstConnection(source,{mutation=null}={}){
+ const fail="const fail=()=>{throw Error('Finite owner phase context unavailable');};";
+ assert.equal(source.split(fail).length,2);
+ source=source.replace(fail,()=> "const fail=()=>{const error=Error('Finite owner phase context unavailable');(globalThis.__t3Observation??=[]).push({kind:'failure',frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});throw error;};");
+ const start=source.indexOf('export async function handlePrivateQaFiniteOwnerConnection('),end=source.indexOf('/** Fixed unmounted QA implementation.',start);
+ assert(start>=0&&end>start);let handler=source.slice(start,end);
+ handler=handler.replace("}catch(error){failed=true;position='failed';",()=>"}catch(error){(globalThis.__t3Observation??=[]).push({kind:'connection-failure',position,frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});failed=true;position='failed';");
+
+
+ const resultTarget="const result=await wait(()=>j[method](value,l));";
+ assert.equal(handler.split(resultTarget).length,2,'passive original journal result target exactly once');
+ handler=handler.replace(resultTarget,()=>resultTarget+"(globalThis.__t3Observation??=[]).push({kind:'journal-mutation',recordKind:kind,method,status:result.status});");
+ if(mutation==='existing-ack'){
+  const target="if(result.status!=='recorded'||result.recordHash!==prepHash(kind,value))fail();";
+  assert.equal(handler.split(target).length,2,'negative-only own recorded ACK target exactly once');
+  handler=handler.replace(target,()=>"if(result.status!=='recorded'&&!(kind==='ConnectionAck'&&result.status==='existing')||result.recordHash!==prepHash(kind,value))fail();");
+ }
+ source=source.slice(0,start)+handler+source.slice(end);
+ const publicTarget="if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();";
+ assert.equal(source.split(publicTarget).length,2,'passive public partial boundary exactly once');
+ source=source.replace(publicTarget,()=>"if(s.records.effects.length&&!s.installed.receipt)(globalThis.__t3Observation??=[]).push({kind:'public-partial-target'});"+publicTarget);
+ if(mutation==='public-partial'){
+  const target="if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();";
+  assert.equal(source.split(target).length,2,'negative-only public partial target exactly once');
+  source=source.replace(target,()=>"if(s.preparation.ticketUse&&!s.preparation.stageApproval)fail();");
+ }
+ const correlators=[
+  ["pre.owner.subject!==p.subject","sa.ticketHash!==t.ticketHash",'preparation'],
+  ["t.ticketHash!==data.sourceSnapshot.initialTicketHash","t.action!=='connection'",'ticket-map'],
+  ["data.sourceSnapshot.preconnectionId!==id","canonical(data.sourceSnapshot.source)!==canonical(source)",'source-snapshot'],
+  ["s.preconnectionId!==id","s.contextHash!==contextHash",'connection-history'],
+  ["upload.ack.resourceId===capsule.activatedVersionId","actual.pointer.versionId!==upload.ack.resourceId",'publication-pointer'],
+  ["receipt.moduleHash!==capsule.moduleHash","receipt.configurationHash!==finiteActivationConfigurationHash",'receipt-physical-hash'],
+  ["f.effects.size!==expectedRows","writer-head",'writer-head']
+ ];
+ for(const [first,second,name]of correlators){
+  const lines=source.split('\n'),matches=lines.map((line,i)=>line.includes(first)&&line.includes(second)?i:-1).filter(i=>i>=0);assert.equal(matches.length,1,'passive correlator label '+name);
+  const i=matches[0];assert(lines[i].endsWith('fail();'));lines[i]=lines[i].slice(0,-7)+"{(globalThis.__t3Observation??=[]).push({kind:'correlator',name:'"+name+"'});fail();}";source=lines.join('\n');
+ }
+
+ source=source.replace("async function observeOwnerPhasePair(options){\n let clock,onAbort,parentSignal;",()=>"async function observeOwnerPhasePair(options){\ const observedAt=performance.now();\n let clock,onAbort,parentSignal;");
+ source=source.replace("}finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}",()=>"}finally{(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}");
+ return instrumentFirstConnectionObserverIo(source);
+}
+
+
+function instrumentFirstConnectionObserverIo(source){
+ const once=(needle,next)=>{assert.equal(source.split(needle).length,2,'passive native HTTP source marker');source=source.replace(needle,()=>next);};
+ const declaration="const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;";
+ once(declaration,"const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};(globalThis.__t3Http??=[]).push(io);let response,stream;");
+ const loop="for(;;){const part=await retain(stream.read());current(l);";
+ once(loop,"for(;;){const part=await retain(stream.read());io.reads++;io.bytes+=part.value?.byteLength??0;current(l);");
+ const ending="}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
+ once(ending,"}finally{if(stream){io.cancelCalls++;await retain(stream.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
+ return source;
+}
+export function instrumentFirstConnectionEngine(source){
+ const once=(needle,next)=>{assert.equal(source.split(needle).length,2,'passive fixed engine HTTP marker');source=source.replace(needle,()=>next);};
+ once("async function http(method,path,body,c){\n  check(c);","async function http(method,path,body,c){\n  const io={kind:'engine',method,bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};(globalThis.__t3Http??=[]).push(io);check(c);");
+ once("for(;;){const part=await retain(reader.read());check(c);","for(;;){const part=await retain(reader.read());io.reads++;io.bytes+=part.value?.byteLength??0;check(c);");
+ const ending="finally{if(reader)await retain(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
+ once(ending,"finally{if(reader){io.cancelCalls++;await retain(reader.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
+ return source;
 }

diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,11 +1,11 @@
-import {compileFirstConnectionCandidate,extendFirstConnectionPublication,firstConnectionWorkers,extendEnrollmentComponent} from './finite-first-connection-publication.mjs';
+import {compileFirstConnectionCandidate,extendFirstConnectionPublication,firstConnectionWorkers,extendEnrollmentComponent,instrumentFirstConnection,instrumentFirstConnectionEngine} from './finite-first-connection-publication.mjs';
 import {extendFiniteOwnerNoticeGet,captureNoticeBundle,instrumentFiniteNoticeGet} from './finite-owner-notice-get.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
 import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
@@ -17,34 +17,34 @@
 import {bootstrapWorld,UUID,GH,CF} from './finite-bootstrap-world.mjs';
 import {initialHistoryFixture,seedInitialHistory} from './finite-initial-history-world.mjs';
 import {QA_CLOUD_CLOSED_PINS as realPins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
 import {initialHash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
 import {generateKeyPair,exportJWK,SignJWT} from 'jose';
 import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
 import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
 import {finitePublicProfileTemplate,finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
 const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001;
-export async function initialEntryHarness(mode='normal'){
- const firstConnection=mode==='first-connection-publication';
+export async function initialEntryHarness(mode='normal',{negativeProfile=false}={}){
+ const firstConnection=mode==='first-connection-publication',firstConnectionMutation=firstConnection?(process.env.AFW_T3_MUTANT??null):null;if(![null,'public-partial','existing-ack'].includes(firstConnectionMutation))throw Error('SYN unknown negative mutation');
  const mark=stage=>{if(firstConnection)console.info('T2 native stage',stage);};mark('harness-start');
  const enrollmentComponent=mode==='first-connection-enrollment-component';
  const pair=(firstConnection||enrollmentComponent||mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
  const persist=mode.endsWith('restart')?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
  const sdkProfile=mode.startsWith('phase-context-sdk')?finiteWranglerProfileTemplate('qaLive'):null;
  const base={...(firstConnection?{name:'qa-first-connection'}:{}),...(sdkProfile?{name:'qa-sdk'}:{}),...(persist?{resourcePersistencePath:persist}:{}),...(firstConnection?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'first-connection-oauth'}}:mode.startsWith('phase-context')?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'finite-sdk-shared'}}:{}),modules:true,compatibilityDate:sdkProfile?.compatibility_date??'2026-09-07',compatibilityFlags:sdkProfile?.compatibility_flags??['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
  const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
  let failedInitializationDisposal;
  const disposeFailedInitialization=()=>failedInitializationDisposal??=mf.dispose();
  try{
  mark('provisional-bindings-start');const b=await mf.getBindings();mark('provisional-bindings-ready');const ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
- mark('M-compile-start');const firstCandidate=firstConnection?await compileFirstConnectionCandidate(M,TREE):null;mark('M-compile-done');
+ mark('M-compile-start');const firstCandidate=firstConnection?await compileFirstConnectionCandidate(M,TREE,{negativeProfile}):null;mark('M-compile-done');
  const program=firstCandidate?.program??'SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=firstCandidate?.bytes??Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
  const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
  const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
  let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
  if(mode.startsWith('enrollment')||enrollmentComponent)entry=extendPreparationCleanupFixture(entry);
  if(firstConnection)entry=extendFirstConnectionPublication(entry);
  if(enrollmentComponent)entry=extendEnrollmentComponent(entry,await readFile('lib/mcp-qa-finite-preparation-enrollment-writer.mjs','utf8').then(()=>true,()=>false));
@@ -78,20 +78,22 @@
    let initial=sources.get('mcp-qa-finite-initial-entry.mjs');
    const declaration='async function http(method,suffix,token,body,l,cap=3145728){',readLoop='for(;;){const read=await track(stream.read());guard(l);if(read.done)break;',ending='}finally{if(stream)track(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)track(response.body.cancel()).catch(()=>{});}';
    for(const needle of [declaration,readLoop,ending])assert.equal(initial.split(needle).length,2,'SYN original upload HTTP seam');
    initial=initial.replace(declaration,()=>declaration+"const observed={reads:0,bytes:0,readMs:0,postReadGuardMs:0};");
    initial=initial.replace(readLoop,()=>"for(;;){const readAt=performance.now(),read=await track(stream.read());observed.readMs+=performance.now()-readAt;observed.reads++;observed.bytes+=read.value?.byteLength??0;const guardAt=performance.now();try{guard(l);}finally{observed.postReadGuardMs+=performance.now()-guardAt;}if(read.done)break;");
    initial=initial.replace(ending,()=>"}finally{console.info('T2 original upload HTTP scalars',JSON.stringify({method,path:suffix.split('?')[0],...observed}));"+ending.slice('}finally{'.length));
    sources.set('mcp-qa-finite-initial-entry.mjs',initial);
   }
  }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  if(firstConnection)b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFirstConnection(await readFile(args.path,'utf8'),{mutation:firstConnectionMutation}),loader:'js'}));
+  if(firstConnection)b.onLoad({filter:/mcp-qa-finite-fixed-policy-engine\.mjs$/},async args=>({contents:instrumentFirstConnectionEngine(await readFile(args.path,'utf8')),loader:'js'}));
   if(firstConnection)b.onLoad({filter:/mcp-qa-finite-initial-lease\.mjs$/},()=>({contents:sources.get('mcp-qa-finite-initial-lease.mjs'),loader:'js'}));
   if(mode==='phase-context-sdk-token-notice-get')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteNoticeGet(instrumentFiniteOwnerIo(await readFile(args.path,'utf8'))),loader:'js'}));
   if(mode==='phase-context-sdk-io')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerIo(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
    let contents=await readFile(args.path,'utf8');
    const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
    assert.equal(contents.split(needle).length,2);
    const values={'enrollment-pin-absent':'null','enrollment-pin-foreign':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,sourceRevision:'f'.repeat(40)})",'enrollment-pin-malformed':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,module:{name:'index.mjs',sha256:'f',bytes:1}})",'enrollment-pin-accessor':"Object.defineProperty({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__},'module',{enumerable:true,get(){throw Error('SYN accessor executed');}})"};
@@ -103,113 +105,124 @@
   b.onLoad({filter:/mcp-qa-finite-(initial-entry|initial-entry-records|initial-capsule-records|initial-cleanup|historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
   b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
   b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
   b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin,operator:opPin})+';',loader:'js'}));
  }};
  const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
  if(mode.startsWith('phase-context-sdk'))console.info('D02 fixture QA compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:sha(built.outputFiles[0].contents),inputs:Object.keys(built.metafile.inputs).length}));
  if(mode==='phase-context-sdk-token-notice-get')await captureNoticeBundle(built,'QA',{'<stdin>':entry,'<define:globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__>':J(resident),'<define:globalThis.__AFW_QA_SOURCE_REVISION__>':J(M),'<define:globalThis.__AFW_FINITE_SOURCE_TREE__>':J(TREE),'<define:globalThis.__AFW_NODE_PROGRAM__>':J(program),'<define:globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__>':J(w.expected)});
  mark('QA-compile-done');if(firstConnection){
   w.record.qaLive.module={name:'index.mjs',sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,exports:[...finitePublicProfileTemplate('qaLive').exports]};w.refresh();
-  f.firstConnectionBuild={M:{sha256:sha(bytes),bytes:bytes.length,inputs:Object.keys(firstCandidate.metafile.inputs)},QA:{sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,inputs:Object.keys(built.metafile.inputs)},spyHash:firstCandidate.spyHash,residency:resident};
+  f.firstConnectionBuild={negativeMutation:firstConnectionMutation,wrongProfileHash:firstCandidate.wrongProfileHash,M:{sha256:sha(bytes),bytes:bytes.length,inputs:Object.keys(firstCandidate.metafile.inputs)},QA:{sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,inputs:Object.keys(built.metafile.inputs)},spyHash:firstCandidate.spyHash,residency:resident};
   f.providerRegistry={requests:[],versions:{},pointer:null};
   const artifacts='output/t2-native-graphs/'+sha(built.outputFiles[0].contents);await mkdir(artifacts,{recursive:true});
   await Promise.all([
-   writeFile(artifacts+'/native-syn.json',J({purpose:'afw.first-connection-native-syn-build.v1',testRevision:process.env.GITHUB_SHA??null,M:{...f.firstConnectionBuild.M,inputs:undefined},QA:{...f.firstConnectionBuild.QA,inputs:undefined},resident:{...resident,content:undefined},negativeSpyHash:firstCandidate.spyHash,completePackage:false,operationalReadiness:false})),
+   writeFile(artifacts+'/native-syn.json',J({purpose:firstConnectionMutation?'afw.first-connection-negative-mutant-syn-build.v1':'afw.first-connection-native-syn-build.v1',negativeMutation:firstConnectionMutation,testRevision:process.env.GITHUB_SHA??null,M:{...f.firstConnectionBuild.M,inputs:undefined},QA:{...f.firstConnectionBuild.QA,inputs:undefined},resident:{...resident,content:undefined},negativeSpyHash:firstCandidate.spyHash,negativeCompiledProfileHash:firstCandidate.wrongProfileHash,completePackage:false,operationalReadiness:false})),
    writeFile(artifacts+'/metafiles.json',J({M:firstCandidate.metafile,QA:built.metafile})),
    writeFile(artifacts+'/canary-index.mjs',firstCandidate.bytes),
    writeFile(artifacts+'/qa-index.mjs',built.outputFiles[0].contents)
   ]);
  }
  let finalOptions={...base,script:built.outputFiles[0].text,outboundService:async req=>{
+  const providerPhase=f.providerPhase??'initial-upstream',providerUrl=new URL(req.url);
+  const respond=(payload,options)=>{
+   if(firstConnection){const encoded=J(payload);f.providerRegistry.responses??=[];f.providerRegistry.responses.push({phase:providerPhase,host:providerUrl.host,method:req.method,path:providerUrl.pathname,status:options?.status??200,bytes:Buffer.byteLength(encoded),sha256:sha(encoded)});}
+   return Response.json(payload,options);
+  };
+  if(firstConnection)f.providerRegistry.requests.push({phase:providerPhase,url:req.url,method:req.method,...(req.method==='POST'?{body:await req.clone().text()}:{})});
   await delayFiniteOwnerIo(f,req);
-  if(req.url.endsWith('/cdn-cgi/access/certs'))return Response.json({keys:[jwk]});
-  if(firstConnection)f.providerRegistry.requests.push({url:req.url,method:req.method,...(req.method==='POST'?{body:await req.clone().text()}:{})});
+  if(req.url.endsWith('/cdn-cgi/access/certs'))return respond({keys:[jwk]});
   f.requests.push(req.url);(f.observationTimes??=[]).push({at:Date.now(),method:req.method,kind:new URL(req.url).origin==='https://api.cloudflare.com'?'provider':'ledger'});(f.requestMethods??=[]).push(req.method);
   let value;
   if(req.url.startsWith(GH)){
    assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
    if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
   }else{
    assert.ok(['Bearer synthetic-native-reader','Bearer synthetic-native-publisher'].includes(req.headers.get('authorization')));
    let result;
    if(req.url===CF+'/tokens/verify'){if(mode==='custody-hold'){f.held='custody-read';await new Promise(resolve=>{f.release=resolve;});}result={id:req.headers.get('authorization')==='Bearer synthetic-native-reader'?'9aa97ad1fc9afe3021cf69ea497d5190':'05718105dcdfc92e55cc3624172c2740',status:'active',expires_on:new Date(approval+60000).toISOString(),not_before:null};}
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1'){
     result=structuredClone(w.pointer);
     if(f.phaseDrift==='qa-pointer'&&++f.phaseQaObservation===2)result.deployments[0].id='99999999-9999-4999-8999-999999999999';
     if(f.uploads.length>0){f.gateReached=true;if(f.gateMode==='qa')result.deployments[0].id='99999999-9999-4999-8999-999999999999';}
    }
    else if(req.url===CF+'/workers/workers/agent-friendly-web-independent-closure-qa/versions/'+UUID+'?include=modules'){result={...structuredClone(finitePublicProfileTemplate('qaLive')),id:UUID,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(firstConnection?built.outputFiles[0].contents:'export default{};').toString('base64')}]};if(f.ownerFault==='qa-module')result.modules[0].content_base64='AAAA';if(f.ownerFault==='qa-namespace')result.bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id='f'.repeat(32);if(f.ownerFault==='sdk-alias')result.bindings.find(b=>b.name==='AFW_FINITE_OWNER_OAUTH_KV').namespace_id='f'.repeat(32);if(f.ownerFault==='sdk-extra')result.bindings.push({name:'EXTRA_SAME_ACCOUNT',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'});}
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-release-operator/deployments?per_page=1'){if(['primary-retention','primary-late-headers'].includes(f.gateMode))await new Promise(resolve=>setTimeout(resolve,500));result={deployments:[{id:['primary-retention','primary-late-headers','operator-pointer'].includes(f.gateMode)?'99999999-9999-4999-8999-999999999999':opPin.deploymentId,strategy:'percentage',versions:[{version_id:opPin.id,percentage:100}]}]};}
    else if(req.url===CF+'/workers/workers/agent-friendly-web-release-operator/versions/'+opPin.id+'?include=modules'){result=structuredClone(opMetadata);if(f.gateMode==='operator-version')result.modules[0].content_base64=Buffer.from('SYN operator drift').toString('base64');}
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/versions?deployable=true&per_page=100&page=1'){
     const items=Array.from({length:100},(_,i)=>({id:i===5&&f.alarmMode!=='ineligible'?x.pin.id:'00000000-0000-4000-8000-'+String(i+1).padStart(12,'0'),number:171-i}));
     result={items};
-    return Response.json({success:true,errors:[],messages:[],result,result_info:{page:0,per_page:100,count:100,total_count:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+    return respond({success:true,errors:[],messages:[],result,result_info:{page:0,per_page:100,count:100,total_count:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
    }
    else if(req.url===CF+'/workflows/afw-own-qa-private-bootstrap/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04'){
     assert.equal(req.method,'GET');assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-reader');
     if(f.oldGuardMode==='retention-401')await new Promise(resolve=>setTimeout(resolve,500));
-    if(['http-401','retention-401'].includes(f.oldGuardMode))return Response.json({success:false,errors:[],messages:[],result:null},{status:401,headers:{date:new Date().toUTCString()}});
+    if(['http-401','retention-401'].includes(f.oldGuardMode))return respond({success:false,errors:[],messages:[],result:null},{status:401,headers:{date:new Date().toUTCString()}});
     const step={name:'restore-own-closed-canary-1',start:'2026-10-30T16:41:01.564Z',end:'2026-10-30T16:41:01.675Z',success:true};
     const output={status:'blocked',dispatchStatus:'uncertain',nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
     result={status:'complete',step_count:6,output,steps:[{name:'SYN-1'},step,{name:'SYN-2'},{name:'SYN-3'},{name:'SYN-4'},{name:'SYN-5'}]};
     if(f.oldGuardMode==='active')result.status='running';
     if(f.oldGuardMode==='changed-output')output.status='complete';
     if(f.oldGuardMode==='changed-dispatch')output.dispatchStatus='complete';
     if(f.oldGuardMode==='changed-withdrawal')output.nativeWithdrawalVerified=true;
     if(f.oldGuardMode==='changed-readiness')output.operationalReadiness=true;
     if(f.oldGuardMode==='retry')output.mayRetry=true;
     if(f.oldGuardMode==='bad-step')step.success=false;
     if(f.oldGuardMode==='bad-time')step.end='2026-10-30T16:41:01.676Z';
     if(f.oldGuardMode==='duplicate')result.steps[0]={...step};
     if(f.oldGuardMode==='short')result.steps.pop();
    }
    else if(req.url===CF+'/workflows?per_page=100&page=1'){
-    return Response.json({success:true,errors:[],messages:[],result:AFW_FIXED_WORKFLOWS.map(s=>({name:s.name,id:s.id,script_name:s.script,class_name:s.className})),result_info:{per_page:100,count:3,total_count:3,page:1,total_pages:1}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+    return respond({success:true,errors:[],messages:[],result:AFW_FIXED_WORKFLOWS.map(s=>({name:s.name,id:s.id,script_name:s.script,class_name:s.className})),result_info:{per_page:100,count:3,total_count:3,page:1,total_pages:1}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
    }
    else if(req.url.startsWith(CF+'/workflows/')){
     const name=new URL(req.url).pathname.split('/').at(req.url.includes('/instances?')?-2:-1),s=AFW_FIXED_WORKFLOWS.find(x=>x.name===name);assert.ok(s,req.url);
     if(req.url.includes('/instances?')&&(f.inventoryProbe||f.uploads.length>0&&f.nowOffset===0)){
      const own=s.name==='afw-own-qa-private-bootstrap',self={id:f.refs.initialInstanceId,status:'running',workflow_id:s.id};
      result=own&&f.inventoryMode!=='missing'?[self]:[];
      if(own&&f.inventoryMode==='terminal')result=[{...self,status:'complete'}];
      if(own&&f.inventoryMode==='waiting')result=[{...self,status:'waiting'}];
      if(own&&f.inventoryMode==='duplicate')result=[self,self];
      if(own&&f.inventoryMode==='wrong-id')result=[{...self,id:'afw-finite-initial-'+'b'.repeat(64)}];
      if(own&&f.inventoryMode==='foreign')result.push({id:'SYN-foreign',status:'running',workflow_id:s.id});
      if(!own&&f.inventoryMode==='other-active')result=[{id:'SYN-other',status:'waiting',workflow_id:s.id}];
     }else result=req.url.includes('/instances?')?(f.alarmMode==='active-workflow'?[{id:'SYN-active',status:'running',workflow_id:s.id}]:[]):{name:s.name,id:s.id,script_name:s.script,class_name:s.className};
-    return Response.json({success:true,errors:[],messages:[],result,...Array.isArray(result)?{result_info:{per_page:100,count:result.length,total_count:result.length,page:1,total_pages:1}}:{}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+    return respond({success:true,errors:[],messages:[],result,...Array.isArray(result)?{result_info:{per_page:100,count:result.length,total_count:result.length,page:1,total_pages:1}}:{}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
    }
    else if(req.url.includes('/instances-v2?state=active&per_page=100')){
     if(['primary-retention','primary-late-headers'].includes(f.gateMode)){f.held='provider-read';await new Promise(resolve=>{f.release=resolve;});}
-    return Response.json({success:true,errors:[],messages:[],result:f.alarmMode==='active-container'?[{id:'SYN'}]:[],result_info:{per_page:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+    return respond({success:true,errors:[],messages:[],result:f.alarmMode==='active-container'?[{id:'SYN'}]:[],result_info:{per_page:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
    }
    else if(['/schedules','/tails'].some(p=>req.url.endsWith(p)))result=f.alarmMode==='schedule'||f.gateMode==='tails'&&req.url.endsWith('/tails')?[{id:'SYN'}]:[];
+   else if(firstConnection&&f.uploads.length>1&&req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments'){
+    assert.equal(req.method,'POST');const body=await req.text(),data=JSON.parse(body);assert.equal(data.versions[0].percentage,100);assert.ok(f.providerRegistry.versions[data.versions[0].version_id]);
+    f.activations.push({body,data});result={id:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',...data};f.providerRegistry.pointer=structuredClone(result);
+   }
+   else if(firstConnection&&f.uploads.length>1&&req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1')result={deployments:[structuredClone(f.providerRegistry.pointer)]};
+   else if(firstConnection&&f.uploads.length>1&&req.url.includes('/workers/workers/agent-friendly-web-delegated-canary/versions/')&&f.providerRegistry.versions[new URL(req.url).pathname.split('/').at(-1)])result=structuredClone(f.providerRegistry.versions[new URL(req.url).pathname.split('/').at(-1)]);
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments'){
     assert.equal(req.method,'POST');const body=await req.text(),data=JSON.parse(body);
     if(data.annotations?.['workers/message']?.startsWith('afw-finite-initial-activate-')){
      f.activations.push({body,data});f.activationAnnotation=data.annotations['workers/message'];
      result={id:'66666666-6666-4666-8666-666666666666',...data};if(firstConnection)f.providerRegistry.pointer=structuredClone(result);f.pointerMode=f.alarmMode==='activation-pointer-drift'?'foreign':'candidate';
      if(f.alarmMode==='activation-ack-bad')result.versions[0].percentage=99;
      if(f.alarmMode==='activation-held'){f.held='activation';await new Promise(resolve=>{f.release=resolve;});}
      if(f.alarmMode==='activation-ack-lost')throw Error('SYN activation applied ACK lost');
     }else{
      f.restores.push({body,data});result={id:'77777777-7777-4777-8777-777777777777',...data};f.restored=result;f.pointerMode='restored';
      if(f.alarmMode==='restore-ack-lost')throw Error('SYN restore applied ACK lost');
     }
    }
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1'){f.pointerReads++;if(f.phaseDrift&&++f.phaseObservation===2){if(f.phaseDrift==='schema')await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();if(f.phaseDrift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1').run();if(f.phaseDrift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();if(f.phaseDrift==='configuration')f.phaseFault='configuration';if(f.phaseDrift==='original-open')f.ownerFault='original-open';if(f.phaseDrift==='pointer')f.phaseCurrent.receipt.deploymentId='11111111-1111-4111-8111-111111111111';if(f.phaseDrift==='grant')await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=?").bind(new Date().toISOString()).run();if(f.phaseDrift==='exchange')await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(f.exchangeDrift.exchangedAt,f.exchangeDrift.grantId).run();}if(f.phaseCurrent)result={deployments:[{id:f.phaseCurrent.receipt.deploymentId,strategy:'percentage',versions:[{version_id:f.phaseCurrent.receipt.versionId,percentage:100}]}]};else if(f.pointerMode==='restored')result={deployments:[f.restored]};else if(f.pointerMode==='candidate'||f.pointerMode==='foreign')result={deployments:[{id:f.pointerMode==='foreign'?'99999999-9999-4999-8999-999999999999':'66666666-6666-4666-8666-666666666666',strategy:'percentage',versions:[{version_id:f.uploaded.id,percentage:100}],annotations:{'workers/message':f.activationAnnotation}}]};else result={deployments:[{id:mode==='baseline-drift'||mode==='pointer-drift'&&f.uploads.length||(f.gateMode==='canary-pointer'&&f.gateReached||f.gateMode==='final-pointer'&&f.pointerReads>=5)?'99999999-9999-4999-8999-999999999999':x.pin.deploymentId,strategy:'percentage',versions:[{version_id:x.pin.id,percentage:100}]}]};}
    else if(req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false'){
     assert.equal(req.method,'POST');assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-publisher');assert.match(req.headers.get('content-type'),/^application\/json/);
-    const body=await req.text(),data=JSON.parse(body);f.uploads.push({body,data});f.uploaded={...data,id:'55555555-5555-4555-8555-555555555555',urls:[],containers:data.containers.map(c=>({...c,name:'agent-friendly-web-delegated-canary-afwowneventnode'})),bindings:data.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b)};
+    const body=await req.text(),data=JSON.parse(body);f.uploads.push({body,data});f.uploaded={...data,id:firstConnection&&f.uploads.length>1?'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa':'55555555-5555-4555-8555-555555555555',urls:[],containers:data.containers.map(c=>({...c,name:'agent-friendly-web-delegated-canary-afwowneventnode'})),bindings:data.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b)};
     if(firstConnection)f.providerRegistry.versions[f.uploaded.id]=structuredClone(f.uploaded);
     result={id:mode==='ack-baseline'?x.pin.id:mode==='ack-qa'?UUID:mode==='ack-latest'?'latest':mode==='ack-invalid'?'not-a-uuid':f.uploaded.id};
     if(mode==='lost-http-ack')throw Error('SYN provider ACK lost after version creation');
     if(mode==='held-http'){f.held='fetch';await new Promise(resolve=>{f.release=resolve;});}
     if(mode==='held-body'){
      f.held='body';return new Response(new ReadableStream({start(controller){f.release=()=>{controller.enqueue(new TextEncoder().encode(JSON.stringify({success:true,errors:[],messages:[],result})));controller.close();};}}),{headers:{date:new Date().toUTCString(),'content-type':'application/json'}});
     }
    }else if(req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/55555555-5555-4555-8555-555555555555?include=modules'){assert.ok(f.uploaded);result=structuredClone(f.uploaded);
     if(f.ownerFault==='module')result.modules[0].content_base64='AAAA';
     if(f.ownerFault==='configuration')result.bindings.find(b=>b.name==='ACCESS_AUD').text='SYN drift';if(f.ownerFault==='original-open')result.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
@@ -236,24 +249,37 @@
     if(mode==='short-cleanup-custody')result.expires_on=new Date(Date.parse(created)+1000000).toISOString();
     if(f.alarmMode==='custody-drift')result.expires_on=new Date(approval+60001).toISOString();
     f.tokenReads++;const role=req.headers.get('authorization')==='Bearer synthetic-native-reader'?'reader':'publisher';
     if(role==='publisher')f.publisherReads++;
     if(mode==='publisher-revoked-before-send'&&role==='publisher'&&f.publisherReads>=3)result.status='disabled';
     if(mode===role+'-wrong-id')result.id='0'.repeat(32);
     if(mode===role+'-inactive')result.status='disabled';
     if(mode===role+'-expired')result.expires_on=new Date(Date.now()-1).toISOString();
     if(mode===role+'-not-before')result.not_before=new Date(Date.now()+60000).toISOString();
    }
+   // Negative-only corruption of the actual fixed provider READ response.
+   // Registry artifacts and native POST results remain their genuine originals.
+   if(firstConnection&&f.connectionReadbackFault&&f.uploads.length>1){
+    const fault=f.connectionReadbackFault,stage=f.activations.length===1?'upload':'activation',pointer=req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1',candidate=req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa?include=modules';
+    if(fault.startsWith(stage+'-')&&(pointer&&['upload-pointer','activation-pointer','activation-percentage','activation-version'].includes(fault)||candidate&&['upload-module','upload-config','activation-config','activation-secret'].includes(fault))){
+     f.connectionReadbackHits=(f.connectionReadbackHits??0)+1;
+     if(fault.endsWith('-module'))result.modules[0].content_base64='AAAA';
+     if(fault.endsWith('-config'))result.bindings.find(binding=>binding.name==='ACCESS_AUD').text='SYN readback mismatch';
+     if(fault==='activation-secret')result.bindings.find(binding=>binding.type==='secret_text').text='SYN negative secret metadata';
+     if(fault.endsWith('-pointer'))result.deployments[0].id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
+     if(fault==='activation-percentage')result.deployments[0].versions[0].percentage=99;
+     if(fault==='activation-version')result.deployments[0].versions[0].version_id='55555555-5555-4555-8555-555555555555';
+    }
+   }
    value={success:true,errors:[],messages:[],result};
   }
-  if(firstConnection){const encoded=J(value);f.providerRegistry.responses??=[];f.providerRegistry.responses.push({method:req.method,path:new URL(req.url).pathname,status:200,bytes:Buffer.byteLength(encoded),sha256:sha(encoded)});}
-  return Response.json(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
+  return respond(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
  }};
  if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io',noticeGet:mode==='phase-context-sdk-token-notice-get'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
  if(firstConnection)finalOptions=firstConnectionWorkers(finalOptions,firstCandidate);
  const rawFinalOptions=finalOptions;
  finalOptions=convertV4MiniflareOptions(finalOptions);
  mark('harness-setOptions-start');await mf.setOptions(finalOptions);mark('harness-setOptions-ready');
  mark('QA-bindings-start');const bindings=await mf.getBindings(firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
  if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
  mark('QA-bindings-ready');if(firstConnection||mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();
  const oldMonitoringSql=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results;
@@ -265,26 +291,34 @@
  assert.deepEqual((await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results,oldMonitoringEvents);
  assert.equal((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").all()).results.length,7);
  assert.deepEqual((await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results,originalGrants);
  console.info('NOTICE SYN schema adapter',JSON.stringify({consentObjectsPreserved:4,consentRowsPreserved:3,grantsPreserved:2,objectsAfter:7,addedObjects:3}));}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
  if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
  if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
  if(firstConnection){
   f.mountFirstConnection=async()=>{mark('mount-start');assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.pointerMode,'candidate');
    const vars=Object.fromEntries(f.uploaded.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));
    const mounted=convertV4MiniflareOptions({...rawFinalOptions,workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:f.uploaded.id}}})});
-   mark('mount-updateOptions-start');try{await mf.setOptions(mounted);}catch(error){f.mountFailed=true;console.info('T2 original mount error',JSON.stringify({name:error?.name,code:error?.code??null,issues:(error?.issues??[]).map(({path,code,expected})=>({path,code,expected})),frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5),workers:mounted.workers.map(worker=>({name:worker.name,keys:Object.keys(worker),bindings:Object.entries(worker.bindings??{}).map(([key,value])=>({key,type:typeof value,defined:value!==undefined}))}))}));throw error;}mark('mount-updateOptions-ready');const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.negative=await mf.getWorker('negative-first-connection');mark('mount-ready');
+   mark('mount-updateOptions-start');try{await mf.setOptions(mounted);}catch(error){f.mountFailed=true;console.info('T2 original mount error',JSON.stringify({name:error?.name,code:error?.code??null,issues:(error?.issues??[]).map(({path,code,expected})=>({path,code,expected})),frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5),workers:mounted.workers.map(worker=>({name:worker.name,keys:Object.keys(worker),bindings:Object.entries(worker.bindings??{}).map(([key,value])=>({key,type:typeof value,defined:value!==undefined}))}))}));throw error;}mark('mount-updateOptions-ready');const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');mark('mount-ready');
   };
-  f.negative=await mf.getWorker('negative-first-connection');f.call=(path,options)=>mf.dispatchFetch('https://delegated-canary.agentfriendlyweb.dev'+path,options);}
+  f.adoptConnectionConfiguration=async({upstream=false}={})=>{
+   assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);const pointer=f.providerRegistry.pointer,version=f.providerRegistry.versions[pointer.versions[0].version_id],closed=f.providerRegistry.versions['55555555-5555-4555-8555-555555555555'];
+   assert.equal(version.id,pointer.versions[0].version_id);assert.equal(version.modules[0].content_base64,closed.modules[0].content_base64);const candidate=structuredClone(closed);candidate.id=version.id;candidate.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(version,candidate);
+   const vars=Object.fromEntries(version.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));const mounted=convertV4MiniflareOptions({...rawFinalOptions,...upstream?{upstream:'https://delegated-canary.agentfriendlyweb.dev'}:{},workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:version.id}}})});f.transportNormalized=upstream;if(upstream)assert.equal(mounted.upstream,'https://delegated-canary.agentfriendlyweb.dev');
+   const originalWorker=rawFinalOptions.workers.find(worker=>worker.name==='canary-first-connection');assert.equal(sha(originalWorker.script),f.firstConnectionBuild.M.sha256,'actual script input remains initial M');await mf.setOptions(mounted);const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
+  };
+  f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');f.call=(path,options)=>{f.providerPhase=(options?.method??'GET')+' '+new URL('https://delegated-canary.agentfriendlyweb.dev'+path).pathname;return mf.dispatchFetch('https://delegated-canary.agentfriendlyweb.dev'+path,options);};}
+ if(firstConnection&&negativeProfile)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
  f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
  f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
  f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
  f.alarmAt=async at=>{f.nowOffset=at-Date.now();try{return await f.stub.initialAlarmAt(at);}finally{f.nowOffset=0;}};
  f.ownerRead=async(delta=400000,...args)=>{const rows=await f.stub.snapshot();let raw;try{raw=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule')[1]);}finally{rows[Symbol.dispose]?.();}f.nowOffset=raw.I0+delta-Date.now();try{return await f.stub.ownerSourceRead(delta,...args);}finally{f.nowOffset=0;}};
  f.future=async(kind='complete')=>{await f.stub.seedFutureActivation(kind);const rows=await f.stub.snapshot(),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);f.activationAnnotation='afw-finite-initial-activate-'+plan.recordHash;f.pointerMode='candidate';return plan;};
  f.cleanup=async()=>{if(persist){assert.ok(resolve(persist).startsWith(resolve(tmpdir())+'/afw-entry-restart-'));await rm(persist,{recursive:true,force:true});}};
  f.enrollmentToken=async (source,expiresAt=Math.floor((Date.now()+3600000)/1000))=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
  if(mode==='phase-context-sdk-token-notice-get')f.noticeToken=async({subject='owner',audience=f.source.access.audience,issuer='https://'+f.source.access.teamDomain,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ if(firstConnection)f.firstConnectionToken=async(source,{subject='owner',issuer='https://'+source.access.teamDomain,audience=source.access.audience,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
  f.refs={commandId:COMMAND,sourceRevision:M,qaVersionId:UUID,initialInstanceId:'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId:COMMAND,sourceRevision:M,qaVersionId:UUID}),workflowName:'afw-own-qa-private-bootstrap',createdAt:mode==='partial'?Date.now()-29700:mode==='upload-partial'?Date.now()-27000:Date.now()};
  mark('harness-ready');return f;
  }catch(error){mark('harness-error:'+String(error));await disposeFailedInitialization();mark('harness-error-disposed');throw error;}
 }
[Source lacks final newline: before=true, after=true; exact blob references control.]

diff --git a/test/mcp-qa-finite-owner-phase-context-native.test.mjs b/test/mcp-qa-finite-owner-phase-context-native.test.mjs
--- a/test/mcp-qa-finite-owner-phase-context-native.test.mjs
+++ b/test/mcp-qa-finite-owner-phase-context-native.test.mjs
@@ -96,10 +96,21 @@
 test('fresh QA pointer drift after the first snapshot denies',()=>world(async f=>{f.phaseCurrent=await seed(f);f.phaseQaObservation=0;f.phaseDrift='qa-pointer';assert.equal((await read(f)).status,'unavailable');assert.equal(f.phaseQaObservation,2);}));
 test('actual allocated phase fixture disposes after initialization failure',async()=>{await assert.rejects(initialEntryHarness('phase-context-init-failure'),e=>e.message==='SYN phase fixture initialization failed'&&e.fixtureDisposed===true);});
 
 test('settled original M journals never imply read_consent',()=>world(async f=>{
  const original=await plain(f.ownerRead());f.phaseCurrent=await seed(f,'settled-original');
  assert.equal(f.phaseCurrent.receipt.versionId,original.source.initialBaseline.versionId);assert.equal(f.phaseCurrent.receipt.deploymentId,original.source.initialBaseline.deploymentId);
  assert.equal(f.phaseCurrent.configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'false');
  const before=await plain(f.stub.snapshot()),writes=f.uploads.length+f.activations.length,r=await read(f);
  assert.equal(r.status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(f.uploads.length+f.activations.length,writes);assert.equal(await f.stub.ownerEffectCount(),0);
 }));
+
+for(const drift of ['revision','owner','configuration','pointer','grant','schema'])test('T3 current snapshots remain complete: '+drift,()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);
+ if(drift==='grant'){const r=await plain(f.stub.seedPhaseIssuer('linked'));assert.equal(r.fixtureError,undefined);}
+ f.phaseObservation=0;f.phaseDrift=drift;const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.equal(f.phaseObservation,2,'both real current observations were reached');assert.deepEqual(await plain(f.stub.snapshot()),before,'source observer preserves durable history');
+}));
+test('T3 history is factual not replay authority: historical deadline',{timeout:120000},()=>world(async f=>{
+ f.phaseCurrent=await seed(f);const before=await plain(f.stub.snapshot()),send=before.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':send')).map(([,raw])=>JSON.parse(raw)).find(v=>v.effect==='activation');
+ const c=JSON.parse(before.find(([key])=>key.endsWith(':capsule'))[1]);assert(c.I0+420000>send.deadline,'actual source observation is beyond historical effect deadline');
+ const r=await read(f);assert.equal(r.source?.phase,'read_consent');assert.equal(r.source.currentPublication.receiptHash,f.phaseCurrent.receipt.receiptHash);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
+}));


```

## Full diff — report and progress

```diff
diff --git a/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md b/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md
--- a/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md
+++ b/docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md
@@ -68,10 +68,27 @@
 OWNER STOP: terminar bloqueactual,guardar ydetenerhasta mañana; no iniciarTask3 niotrotrabajo. Próximo alretomar: leeraceptación/preflight/planTask3, verificarSourceHEADactual, fijarBASE y writerfresco para primera publicaciónconnection+downstream sinseeds. Nuevalineage sobrecódigofinal, nunca reusarcapTask2. Mantener codeapproval separado de permisos/runtime. Seguimiento actualLOCAL dependePC/app; este cierre no instala guardiacloud ni autorizaensayoPCoff. Ninguna intervenciónpendiente hoy.
 
 
 ## Reanudación Root y activación Task3 — 6nov2026
 
 Gabriel pidió “continua”; queda superado OWNER STOP del cierre anterior para esta unidad SOURCE. Refs reconciliadas sin drift: Source4f5f5f124b55c8b90c424753f00b9e9cf4634c05 y Rootdocsdc3a92e5495a160f5489c40510344b2f9a410589. Task1/Task2/Link aceptados, sin repetirlos. Cuatro Actions recientes terminales; último GREEN42138702058 sobree6518da5. No lectura/runtime remoto nuevo.
 
 Brief Task3 completo: docs/superpowers/briefs/2026-11-06-finite-native-first-connection-publication-task3.md, commit09f0ba4a4454a05f0926bbb94e01f3ea945ff5e8, blob847824af6cf748cbebfc2db7ba3bd0a841725385. Root autoriza SOLO siete paths P8/P9/P10/T3/F1/F2/T4, qualifier temporal máximo3jobs15min sin secrets, reporteTask3 y este ledger. BASE exacto posterior a esta documentación se entrega en dispatch al writer fresco. Secuencia SDD nueva: RED causal→implementación→GREEN proporcional→reporte completo→reviewer fresco; no ejecutar unidades posteriores por inferencia.
 
 Preflight: opción Miniflare sólo adopta configuración M desde registry real después de finalizar el POST; no remount QA dentro de callback provider, no phaseCurrent/ACK/receipt sembrados. T2 pendiente signed-success queda reemplazado por principalTask3 y controles closed/invalid; legacy setup siguepending. Nombres de regresiones y expansiones reconciliados, Link focal exacto elegido en brief. Fuente3Nov sigue vencida; operationalReadiness/completePackage/PCoff=false. Sin tokens/OTP/roles/permisos/runtime/main/merge/Max. No intervención humana requerida para este bloque cloud SYN.
+
+
+## Task3 checkpoint SOURCE/SYN — 2026-11-06 12:53 UTC
+
+Implementación sigue IN PROGRESS, writer exclusivo. Principal sin seed y composición nativa completa PASS en42216919108/c49e4eff; correlaciones y controles causales adicionales PASS en42218799447/48c4efa. No aceptación completa todavía: matriz fina, última verificación con el mismo head, artefactos, contraste protected y revisión fresca pendientes. Qualifier retirado durante checkpoint; corrida de lifetime42220276392 sigue fijada en935d202f, sin autorizar otra operación. Detalle recuperable en el reporteTask3, con cronología TDD explícita (negativos posteriores a skeleton), hashes/expiración, clocks originales y límite condicional de API. Root documenta factibilidad aparte en6fc3bac5e79ccb399935836370e3cb60edb2e0f2;1736CF/flujo SYN no acredita cuota/429/latencia real. No ampliar clocks, bajar checks ni optimizar producto aquí. operationalReadiness=false; completePackage=false; PCoff=false. Sin runtime/main/merge/Cloudflare real/Max.
+
+
+Task3 checkpoint2026-11-06 13:57UTC: IN PROGRESS, codea4ae401; holder causal RED5+metadataACK1→fix→14GREEN atcd4d6c1; deferred invocation/zero-next-read guard run42229397747 active. Native matrix now60 with8actual upload/activation readback variants pending. Final exact3jobs≤15min, full mapping/report/protected readback/qualifier removal remain. See Task3 report; all readiness/completePackage/PCoff=false.
+
+
+Task3 freeze2026-11-06 14:09UTC: code31ede7d2/tree49ef7824, qualifier absent; direct native readback8PASS(run42229788438); source-holder0+six ticket codec/correlator negatives2PASS(run42231129828/job127936986325). Exact final native60=A24+B25+C11, scoped positive107,total167,2expected-fail mutants,lint7. Bounded3jobs15min estimated847/850/852s; no fit/completion claim until terminal primary logs. Full frozen per-variant/native-vs-compositional mapping and parent/blob log in Task3 report. All readiness/completePackage/PCoff=false.
+
+
+Task3 2026-11-06 14:44UTC: primer gate42232085255 NO aceptado global: A24PASS/C118PASS+controles+lint,B23/25fallan observacion de dos boundaries tardios. Causa probada: reloj de observacionNode30s abarcaba GET+POST separados; producto no se relaja. Focal42235796244/job1279529300612PASS, entradasPOST19.67/20.44s<30s reales; cancelacion tardia separada de admision I/O viva. Codigo sourceb6a81590 sinqualifier; P8/P9/P10 intactos, F1/T3 medicion corregida. Final60=A23+B23+C14;167positive+2controles,3jobs15min,est776/783/665s; falta primaria terminal. Excepcioncallbackretry semantica explicita aprobadaRoot, noPASSdinamico inventado. Todos readiness=false.
+
+
+Task3 cierre implementer2026-11-06 15:18UTC — DONE_WITH_CONCERNS/SOURCE-SYN, pendiente revision frescaRoot. Checkout calificadoD11dff63/tree4e30,7blobs congelados; primera ConnectionReceipt nativa real+downstream QAauthorize/Mtoken/MCP-D04/timestamp/noticeGETPOST/Link sinseed.167/167positivos(60native,137top+30subtests) en42236775067: A23/B23/C121, todos comandos exit0; run permaneceCANCELLED por15min durante control restante. Excepcioncompositiva aprobadaRoot:42240487416/job127969155895SUCCESS,checkoutEXACTOD11 desde triggerf29804ab,2controles1expectedFAILcada uno/targettrue/exit1 +lint7exit0,7hashesHEAD/workingbeforeafter exactos. Full42232085255 sigueFAILED, no single-rungreen inventado. Qualifier retirado5e28e70b/tree6f3b7308; reporte final completo incluye REDcausal, matrizporvariante/nivelesdeprueba, excepcioncallbackestatica, padres/blobs/artefactos7d,~1.877GB JSONSYN yfeasibilidadlivecondicional; M1/M2deferred,ningunoptimizador/runtimemutation. AlloperationalReadiness=false/completePackage=false/PCoff=false; techo3Novvencido. Codigo7paths identicoD11; commitsreporte/progreso solo docs, artefactos no se atribuyen a HEAD posterior. Implementer entregaSHAfinal separado trasreadback y cesaSourcewrites.

diff --git a/docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md b/docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md
@@ -0,0 +1,612 @@
+# Task3 native first connection — qualification report
+
+DONE_WITH_CONCERNS — SOURCE/SYN implementation and declared composite qualification complete at2026-11-06 15:18UTC; fresh independent Root review/acceptance pending. Explicit verification exceptions and live-feasibility limits are below. PROJECT=AFW; repository tokenizartinfo-ops/agent-friendly-web; SOURCE branch feat/finite-native-cleanup-20261101. Cloud connector/Actions only, no local clone/build/tests/dependencies. BASE ffe25a1e77a1d93d5c03018ada36355b19c91564 / tree43f53af19e427eade3ab6d4f90ac91ef1380f627. Qualified source checkout d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 / tree4e30df2ae4abe2bf087b123823185fa6ab082fa8. Qualifier-free code checkpoint 5e28e70b7833fcd4a17fecebe320b0365b6c4d2f / tree6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; qualifier absent at this checkpoint. Seven code blobs below are the frozen lineage inputs. Documentation and temporary qualifier commits do not change them.
+
+## Completed declared gates — explicit composite verification exception
+
+**167/167 positive tests PASS at exact SOURCE checkout d11dff63b0d693b89ac6ef8d6ec6c60ca01af751/tree4e30df2ae4abe2bf087b123823185fa6ab082fa8**:137top-level tests+30actual nested subtests. Native union60 exact/disjoint; all positive FAIL/CANCEL/SKIP/TODO0 and individual command exit0. Principal67,583.677ms aggregate across distinct original requests: actual signed GET/cookie/form→POST→new upload/activation→native ConnectionReceipt hash99bf64e38bf7f6230b585c6e6c72f7fb2ccc7643be3ffcb12e7da8f3bdcb9a33→real QA authorize/code/Mtoken/MCP-D04/native grant timestamp→native notice GET/POST/NoticeLink. No seeded connection, exact initial M bytes/config-only OAuth, ordinary SQL0.
+
+This is NOT a successful single full qualifier run. [Run42236775067](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42236775067) remains **CANCELLED**: A23PASS, B23PASS, C121positive PASS, then jobC reached15min during first remaining mutant. Positive command sum inC883225ms (14m43s); no completed control/lint credit from that cancelled job. Job wall timestamps include setup/cancellation/artifact overhead: A14:45:34–14:58:43(789s), B14:45:34–14:57:56(742s), C14:45:34–15:00:54(920s,cancelled). The C665s forecast missed actual allocation; never called a bounded fit.
+
+Root explicitly approved minimal **composite acceptance**: retain all167already-passed positives at D11; run ONLY the two controls+lint against that SAME pinned checkout, without changing any source/test file or rerunning positives. [Scoped run42240487416](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42240487416)/job127969155895 SUCCESS15:10:04–15:11:17UTC(73s), exactly1job, configured15min/read-only/no secrets. Trigger commitf29804abe54f1d618c859c2642b48f90b5677fb7 is distinct from actual checkoutD11/tree4e30. Existing fixture child-only GITHUB_SHA was explicitly set to verified checkoutD11 so testRevision names actual compiled source, not later workflow trigger. Before/after seven HEAD+working-file hashes and tracked cleanliness are exact. Initial actual HEAD/tree are pinned and verified. No claim tests later qualifier/report commits. Cost if wrong: any hidden code/provenance difference invalidates composition; do not accept. This is an explicit verification-plan exception to the former single3job gate, not a hidden fourth job.
+
+| Command | Job | Expected/executed | Top/sub | PASS/FAIL/CANCEL/SKIP | Exit | Elapsed ms |
+| --- | --- | --- | --- | --- | --- | --- |
+| native-A | A | 23/23 | 23/0 | 23/0/0/0 | 0 | 759036 |
+| native-B | B | 23/23 | 23/0 | 23/0/0/0 | 0 | 714696 |
+| native-C | C | 14/14 | 14/0 | 14/0/0/0 | 0 | 440549 |
+| context | C | 34/34 | 34/0 | 34/0/0/0 | 0 | 151231 |
+| get | C | 4/4 | 4/0 | 4/0/0/0 | 0 | 57730 |
+| post | C | 10/10 | 10/0 | 10/0/0/0 | 0 | 145934 |
+| sdk | C | 2/2 | 2/0 | 2/0/0/0 | 0 | 27224 |
+| link | C | 1/1 | 1/0 | 1/0/0/0 | 0 | 19883 |
+| pure | C | 46/46 | 16/30 | 46/0/0/0 | 0 | 29135 |
+| transport | C | 5/5 | 5/0 | 5/0/0/0 | 0 | 1914 |
+| setup | C | 3/3 | 3/0 | 3/0/0/0 | 0 | 8488 |
+| compiler | C | 2/2 | 2/0 | 2/0/0/0 | 0 | 1137 |
+
+| Negative control | Expected/executed | PASS/expectedFAIL/CANCEL/SKIP | Exit | Exact target | Elapsed ms |
+| --- | --- | --- | --- | --- | --- |
+| public-partial | 1/1 | 0/1/0/0 | 1 | true | 22085 |
+| existing-ack | 1/1 | 0/1/0/0 | 1 | true | 28004 |
+
+Both controls have TODO0, exact one matching name, actual exit1, targetMessage=true and accepted=true; unrelated guards remain. lint exactly7paths --max-warnings=0 exit0,2086ms. Positive matched-ACK denial at D11 and mutation counterexample are separately recorded. Matched foreign ACK fixture freezes SYN wall time only to make bytes/timestamp identical; original monotonic root/child limits still run, and the positive principal has no such mutation. These controls are supplementary causal regression evidence, not historical TDD RED.
+
+Remaining concerns are disclosed: static/compositional callback-retry proof exception, post-implementation chronology for most negatives, inherited M1/M2 warnings and live-provider feasibility. Fresh independent Root review/acceptance remains pending. All operationalReadiness/completePackage/PCoff=false.
+
+## Final artifacts, hashes and provenance
+
+Artifact SHA256 values below are GitHub metadata/primary upload digests; no local ZIP download/extraction or rehash was performed. ZIPs retain exact spec+TAP, counts/name manifests, Source provenance, M/QA files/metafiles and content-addressed native-syn descriptors,7day retention.
+
+| Run/job | Artifact ID / name | ZIP bytes | SHA256 | Expiry UTC |
+| --- | --- | --- | --- | --- |
+| 42236775067/127956321656 | 13514930019 / task3-A-d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 | 27779625 | 91fd1b47cf3eb55593f3d20482ce26e4279f500c4f187cafe3ef44243051e59d | 2026-11-13T14:58:36Z |
+| 42236775067/127956322164 | 13513670609 / task3-C-d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 | 18162476 | 62261874fd5dfc92155fb6ea75e295704dba6c351a2c5cf06cd33e0753d9d2b6 | 2026-11-13T15:00:48Z |
+| 42236775067/127956322176 | 13511838508 / task3-B-d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 | 27779351 | 03f46d3e978c50da7b0a02dcfbb25b34f4eb49bc1101266cdabe277980bb007b | 2026-11-13T14:57:50Z |
+| 42240487416/127969155895 | 13515241913 / task3-completion-source-d11dff63-trigger-f29804abe54f1d618c859c2642b48f90b5677fb7 | 2425465 | 4af8719690f283e0c78b46cc0c44a56a341cca62a4128162aa5a7442c03e45dd | 2026-11-13T15:11:14Z |
+
+SYN positive M1988061bytes/340inputs, SHA256c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32; resident gzip389502bytes/SHA2566fc1a66575d3e906707a03782ea40b6c9b8011d95ebc99974fbd04d15214ad12; programHashf6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6. Unmutated SYN initial-closed QA example from A/T2:2365243bytes/328inputs, SHA256a3787f276184f199166c754bc9fe629ed084a58b17674a51defe306797671c47; principal's actual compiled QA/metadata are retained in C's content-addressed artifact and its runtime checks, not attributed to this other fixture's bootstrap hash. Positive M remains exact in all labels.
+
+| Separate negative QA label | QA bytes | QA SHA256 | M SHA256 |
+| --- | --- | --- | --- |
+| public-partial | 2365191 | 028d66e39df56d557cb2f96b5122b36eb1dc4c1624dfbc6cc2dd47b9b1141ca8 | c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32 |
+| existing-ack | 2365307 | 05db012360e6c7a28d64f8188542d2ba62103ca2c5c596ebe1eb5fda376e7c72 | c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32 |
+
+These exact negative-build literals were printed in the scoped completion primary log with testRevisionD11 and stored under output/t2-native-graphs/<QAsha>/native-syn.json; both carry completePackage=false/operationalReadiness=false. Negative ordinary-profile/spy artifacts remain separately labelled from unwrapped positive M.
+
+Actual production staging compiler evidence at D11/tree4e30 (C positive pure/compiler tests, not SYN metadata literals): canaryLive1988061bytes/340inputs SHA256bbb4355253ecde12b2700815f596e2df974907b2d2160fa7d617951d15e0753f; qaLive2524211bytes/324inputs SHA256d91dae532d45f60b245f381cd686653a73b0a7634629f1da80b4f6be4fe5241a. Eligibility/completePackage remain false. SYN M/QA and actual Git-provenance staging bundles are distinct artefacts; do not transfer their hashes to later documentation HEAD or publication.
+
+
+## Outcome and exact implementation
+
+P8 delegates only fixed choice to P10. P9 permits GET/POST at its existing private seam; ordinary forms, private WeakMaps and consumption remain unchanged. P10 derives closed initial source lexically, runs real signed choice, consumes/adopts the SAME original request admission, writes factual enrollment with accepted P2, then fixed upload and activation with accepted P1, durable issue/ACK/sync/readback and final ConnectionReceipt. Actual native Promise/results stay distinct from journal facts; only recorded outcomes accepted. Partial facts are privately observed under exact whitelist/context/head; public effects without complete receipt deny. Enrollment-only remains factual closed_ui; fresh choice cannot resume it. Errors preserve history and remain pending without retry/compensation.
+
+P10 captures original storage/actor/self/node/DB/KV objects and native method refs once before first IO, QA metadata object AND primitive id, reader/publisher/fetch/request headers/signal. Its guarded wait invokes a private thunk only after check(), then retains/awaits the real work and checks again. No new external API/callback/authority/source factory. New sessions/statements remain per-operation captured. Every full pair compares complete snapshots; expected changes are only own recorded enrollment/effects/receipt/physical results. Three native phases remain original <=5s children inside same <=30s request roots; receipt stays inside activation child. No sleep/retry/clock relaxation.
+
+## Provenance, no seeds and transport normalization
+
+SYN metadata revision is cccccccccccccccccccccccccccccccccccccccc, tree dddddddddddddddddddddddddddddddddddddddd; these are explicitly synthetic literals, NOT Git provenance. Actual checkout/test HEAD, source tree, exact7path blobs, compiler graphs and M/QA bytes/hashes are captured in Actions artifacts. Every native fixture builds from that checkout, produces NEW initial material/capsule via accepted upstream SOURCE actual work under fixed provider registry. Earlier history, provider metadata/control-plane/JWKS inputs, Access identities and private schema setup remain SYN. No seedPhaseFacts, seedFutureActivation, prefabricated connection ACK/receipt/phaseCurrent substitutes in principal. Positive M output bytes are unwrapped/exact; QA passive instrumentation and separately hashed negative spy/profile/mutants are labelled.
+
+After connection POST actual work AND response settle, harness adopts actual registry upload/pointer and asserts same M bytes/config-only OAuth. Only THEN native instance-wide Miniflare upstream=exact AFW origin is enabled for downstream Host normalization. MCP callback uses native dispatchFetch preserving URL/options/body/signal; getWorker bypassed getUserRequest and was corrected. Pinned Miniflare5.20260831.0-alpha official source commit b7b4ff84477982e7c770bb93928287893fcf2e03: schema InstanceOptions upstream, root converter preservation, core upstream binding, entry.worker getUserRequest changes Host/path/query; proxy getWorker calls service binding directly. [Pinned native entry](https://github.com/cloudflare/workers-sdk/blob/b7b4ff84477982e7c770bb93928287893fcf2e03/packages/miniflare/src/workers/core/entry.worker.ts), [pinned converter](https://github.com/cloudflare/workers-sdk/blob/b7b4ff84477982e7c770bb93928287893fcf2e03/packages/miniflare/src/config/v4-convert.ts). Valid signed foreign URL-origin denies before QA on unnormalized entry, correct counterpart reaches QA, and again before upstream after config adoption. Genuine foreign Origin after upstream denies. This is transport normalization, NOT proof of arbitrary foreign URL-host preservation under upstream. No real AFW/Cloudflare traffic.
+
+## Causal RED and chronology
+
+- Genuine pre-producer RED: head1945fdccae8fa4f1a0a27f3d780d8be3c71c7b08, run42212217715/job127873373491; actual upstream/material and mounted M/QA, real signed choice503 expected200. Zero-match T4 file pseudo-pass excluded.
+- Genuine pre-fix holder RED: heade08a45d1741cc475099c1b72c5afa11ccd93c4a3, run42224042528/job127912892925;5executed/5FAIL for post-upload DBwithSession/prepare/node/self/KV methods incorrectly completing200. Metadata.id RED headef3fa9b614f74b37ff67f6a7d424a8227607c0fb, run42225098696/job127916470844: HTTP503 already, but FIRST forbidden upload ACK actual1 expected0. No erasure to manufacture RED.
+- Capture fix0526f12d94325676d53031f45b9c20c0aaa4a61b: run42225666752/headcd4d6c1/job12791839368214/14PASS; principal and12holder/time cases plus protocol. Deferred invocation at024a08ae6274eeb2a1ced141380f177aa33e0b41: run42229397747/head1cf62cdd/job12793107897013/14PASS; all post-upload next-native-read0. Source count list1 diagnosed as explicit later diagnostic RPC, not product continuation. Counter snapshots moved before diagnostic; run42231129828/headbf9268f/job1279369863252/2PASS for exact source-holder0 and six codec-valid targeted ticket negatives + valid same-ticket success. No zero guard weakened.
+- Direct native readback8: run42229788438/head010c92e9/job1279324332498/8PASS, each32–34s; genuine native ACKs retained, next activation SEND/POST or receipt absent.
+- Functional/correlator checkpoint run42218799447/head48c4efa6a4d4ea6b24c9550374f3692828b4bac1: unmutated job1278953814186/6PASS; negative-only job127895381000 has two expected1FAIL controls with exact target messages,0cancel/skip,commandExit1. Public-partial removes only its guard; own-ACK permits existing only, produces200/activation2 and fails exact refusal assertion. These are supplementary mutation controls, NOT historical TDD RED; positive exact unmutated. Mutant QA labels/hashes separated.
+
+Process deviation: most adverse cases were added after initial implementation; do not describe that chronology as historical TDD. Genuine principal/holder REDs above and final same-code adverse results are the evidence. Earlier protocol logger duplicate-boundary JSONparse and ticket action-with-null-connectionRef were fixture defects, repaired to reach real validators with valid inputs, not product acceptance.
+
+## Qualification revision — observation scope, not product clock
+
+First complete gate run42232085255/headbbb09fca038c3ca09e8f02f07df558378b3fd843 FAILED globally: Ajob12794023733124/24PASS in840s; Cjob127940236986118/118PASS plus both expected-fail controls/lint in507s; Bjob12794023753125executed/23PASS/2FAIL,0cancel/skip in866s. All under15min, but NOT global acceptance. Bactivation-held/receipt-transaction-held failed because Node waitFirstState's30s observation started BEFORE signed GET, then incorrectly covered the distinct POST too. Example GET14:18:33.54→14:18:44.48(10.94s), observation teardown14:19:03.53 only19.05s into POST whose own original root still ran until~14:19:14.48. No child-clock rejection logged. The held target had not yet been observed; those failures did not test retention.
+
+Only Node/test observations changed: timestamp actual POST dispatch as DATA, retain independent bounded GET/no-POST/failed-GET observation, then observe actual POST within its own existing30s window. No product grace/root/child/clock/check/retention change. Added sanitized state/position/frames on absent target. Raw replacement string accidentally interpreted dollar-apostrophe in qualifier: run42235027798/headf7949f035caa729478eb9694195c22229af47a2d had0jobs/0tests; no RED/GREEN credit. Corrected with replacement FUNCTION at534c4054e0bf350ba5f944097e53e6d0f04a65bd.
+
+Focused actual observation fix: run42235354353/head534c4054/job1279513952072/2PASS. Explicit native live-entry facts then run42235796244/head4ddc7db7/job1279529300612/2PASS: activation-held POST entered19672ms after original start, before30000ms deadline; receipt-held20436ms before30000ms deadline. Both genuinely reached actual late target and passed distinct LIVE competing-root refusal + actual retained settlement,46.78/46.27s total fixture durations across separate original requests.
+
+Cancellation is separate: original upload fetch admission is recorded before actual native invocation; held cancel start/settlement may occur after logical failure/abort/deadline and is never clipped. upload-read-held records original live read and later real read→cancel→settled; no later cleanup timestamp is required to be before an expired deadline. Physical drain is not inferred. Passive facts do not become product permission.
+
+Root approved measured repartition: move principal64.16s A→C and both late-held cases B→C. Revised A23/B23/C14 native60; C retains scoped107 positive,2controls,lint. Measured first jobs A840/B866/C507 plus latest focused boundary costs yields conservative new estimates776/783/665s including setup, margins124/117/235s; no fit claim until terminal primary logs. Existing product blobsP8/P9/P10 unchanged; only F1/T3 observation fixtures changed. New final principal must start its own lineage under revised exact code. No writes during revised qualification gate.
+
+First FAILED gate artifact metadata retained, not promoted:
+- task3-C-bbb09fca038c3ca09e8f02f07df558378b3fd843: ID13510917143, ZIP15749703B, sha256:3afcf15ea83b6bfec65754bb9c8344dfcfac2ea9cb751ce1a18c921021095940, expires2026-11-13T14:22:27Z
+- task3-B-bbb09fca038c3ca09e8f02f07df558378b3fd843: ID13510413505, ZIP30193009B, sha256:0f44d91c4a7d068bad810f6aa356b88a340caf0d2ec2bfaa0f6d8f636f263c78, expires2026-11-13T14:28:24Z
+- task3-A-bbb09fca038c3ca09e8f02f07df558378b3fd843: ID13509388893, ZIP28989241B, sha256:3f1f77d549da6b8b2324bfe0b938781df66b2fb168a7e214db56e801fe4b32f9, expires2026-11-13T14:27:58Z
+
+## Exact frozen qualification and expected costs
+
+Max EXACTLY3 independent jobs, timeout15min each, Node22, npmci --ignore-scripts --no-audit --no-fund, contents:read, checkout persist-credentials:false, no secrets. Each Node test invocation emits spec AND TAP in one execution. Runner checks expected/executed/PASS/FAIL/CANCEL/SKIP/TODO, top-level names/subtest counts, actual process exit/signal; no tee masking. Native exact disjoint union60, no selected0/file pseudo-PASS. Full positive count167 =60native +34context +4GET +10POST +2SDK +1Link +46pure +5transport +3setup +2compiler. Two isolated mutants each1expectedFAIL; lint seven paths max-warnings0. Fine-grained t.test assertions are separately counted by TAP; variant loops are logged as variants, not falsely counted as Node subtests.
+
+
+### Job A: 23 native cases, estimated 776s including setup, margin124s
+
+- T2 closed mounted conduits cannot authorize business
+- T3 enrollment unknown cannot upload: enrollment-transaction-lost
+- T3 upload uncertainty cannot activate: upload-lost
+- T3 upload uncertainty cannot activate: upload-oversize
+- T3 activation uncertainty cannot finish: activation-lost
+- T3 activation uncertainty cannot finish: activation-cached
+- T3 final readback cannot turn uncertainty into success: receipt-transaction-lost
+- T3 final readback cannot turn uncertainty into success: receipt-readback-lost
+- T3 retained work blocks a different live root: upload-read-held
+- T3 retained work blocks a different live root: upload-cancel-held
+- T3 retained work blocks a different live root: source-sql-held
+- T3 retained work blocks a different live root: enrollment-transaction-held
+- T3 retained work blocks a different live root: upload-ack-held
+- T3 resealed foreign publication is not own completion: upload context
+- T3 resealed foreign publication is not own completion: activation context
+- T3 resealed completed owner baseline physical and receipt facts remain correlated
+- T3 original deadline and holder references remain original: upload-db-prepare-drift
+- T3 original deadline and holder references remain original: upload-self-method-drift
+- T3 original deadline and holder references remain original: upload-fetch-drift
+- T3 original parent expires before first native IO
+- T3 actual publication readback denies next effect: upload-pointer
+- T3 actual publication readback denies next effect: activation-pointer
+- T3 actual publication readback denies next effect: activation-config
+
+### Job B: 23 native cases, estimated 783s including setup, margin117s
+
+- T2 finite dispatch never falls through ordinary
+- T3 upload uncertainty cannot activate: upload-send-transaction-lost
+- T3 upload uncertainty cannot activate: upload-cached
+- T3 activation uncertainty cannot finish: activation-malformed
+- T3 final readback cannot turn uncertainty into success: receipt-sync-lost
+- T3 final readback cannot turn uncertainty into success: final-pair-owner-drift
+- T3 retained work blocks a different live root: upload-held
+- T3 retained work blocks a different live root: enrollment-sync-held
+- T3 resealed foreign publication is not own completion: upload ack
+- T3 resealed foreign publication is not own completion: activation ack
+- T3 identity and choice cannot mint admission
+- T3 admission cannot cross lineage or resume
+- T3 own completion requires genuinely recorded original ACK even when foreign bytes match
+- T3 original deadline and holder references remain original: clock-backward
+- T3 original deadline and holder references remain original: upload-metadata-id-drift
+- T3 original deadline and holder references remain original: upload-db-method-drift
+- T3 original deadline and holder references remain original: upload-kv-method-drift
+- T3 original body retains real read and cancellation: overflow
+- T3 fixed protocol and genuinely compiled foreign profile cannot mint choice
+- T3 actual publication readback denies next effect: upload-config
+- T3 actual publication readback denies next effect: activation-percentage
+- T3 actual publication readback denies next effect: activation-version
+- T3 actual publication readback denies next effect: activation-secret
+
+### Job C: 14 native cases, estimated 665s including setup, margin235s
+
+- T3 same initial bytes produce connection and downstream
+- T3 enrollment unknown cannot upload: enrollment-sync-lost
+- T3 upload uncertainty cannot activate: upload-malformed
+- T3 retained work blocks a different live root: activation-held
+- T3 retained work blocks a different live root: receipt-transaction-held
+- T3 source and rollback must be recoverable
+- T3 original deadline fences each native boundary: shorter signed Access before TicketUse
+- T3 original deadline and holder references remain original: source-holder-drift
+- T3 original deadline and holder references remain original: upload-holder-drift
+- T3 original deadline and holder references remain original: activation-holder-drift
+- T3 original deadline and holder references remain original: upload-node-method-drift
+- T3 original deadline and holder references remain original: upload-credential-drift
+- T3 original body retains real read and cancellation: read
+- T3 actual publication readback denies next effect: upload-module
+
+JobC additionally executes exact scoped manifests context34/GET4/POST10/SDK2/Link1/pure46/transport5/setup3/compiler2, two negative controls and lint7. Exact actual first-gate per-command counts/durations are retained in its artifacts; actual declared composite results are in the completed-gates table above; the full3job run remains cancelled. Node runner also prints only archived native-syn build metadata (purpose/mutation/testRevision/M/QA/compressed hashes/bytes) from content-addressed artifact directories inside these SAME3jobs, no extra job or body/token output.
+
+## Per-variant evidence map
+
+“Native” means fresh current Task3 producer lineage; “current unit/helper/T4” means final selected same-code composition with own SYN fixture (may seed historical facts); “reused” means immutable accepted protected evidence, not a new Task3 execution. Exact native names/assignments above; final runner artifact manifest holds all regression names. Seven blobs below fix tests/call sites. All declared result fields were read from primary terminal command logs; dynamic, reused and semantic-only evidence levels remain distinct.
+
+### Dispatch M
+
+Native T2 finite-dispatch test: wrong URL origin, method/query/hash, unsupported/revoke paths, absent QA binding, wrong actor/version/version-holder; genuine compiled ordinary profile in fixed-protocol test. Original flags deny OAuth/notice before QA. Principal valid signed wrong-URL counterfactual before normalization and again after config adoption. Assert ordinary SQL0/forwarding0/effects0; valid signed counterpart reaches QA.
+
+### Dispatch QA
+
+Native T2 fixed internal unknown targets plus fixed-protocol test: x-afw-finite-extra, duplicate version/request-id/original-method/boundary (five actual signed variants). All before factual IO/business rows/TicketUse/effects. Correct signed exact-five-protocol counterpart succeeds. Unrelated harmless header is ignored input, not protocol permission; no total HTTP whitelist.
+
+### Identity and choice
+
+Native identity case: bad signature, signed wrong issuer/audience/subject/expired-on-entry; POST foreign Origin, repeated/malformed cookie list, handle/projectRef mismatch, deny decision, extra/duplicate keys, bad escape, >1024 and invalid UTF8. No TicketUse/effects; valid same ticket then completes. Native source case changes actual DBowner/revision; shorter-current signed Access crosses retained factual boundary before TicketUse and denies401. Principal valid shorter JWT succeeds with narrowed pre/approval times.
+
+### Ticket and snapshot
+
+Native identity case uses actual GET ticket; action (with codec-required foreign connectionRef), preconnection, sourceRevision, subject/realm hash, ProjectRef.projectId, snapshot.source.project.revision. All roundtrip real codecs; exact ticket-map/source-snapshot correlator labels observed; TicketUse0/approval0/effects0 before restoring only SYN negative row. Consumed replay/new root/actual actor restart preserves rows and has no next POST. Completed correlation case separately covers owner/source/preconnection.
+
+### Source and configuration
+
+Native source case: actual Mmodule/Accessconfig and QAmodule/namespace/SDKalias/extra binding; extra candidate binding, monitoring/events flags, nonempty policy, physical namespace, limiter, secret metadata value; actual owner/revision. No TicketUse/SEND. Principal same compiled module and all configuration fields identical except OAuthfalse→true. Source/helper fact checks always precede engine creation and SEND.
+
+### Backup
+
+Native source case removes original backup/receipt/chunk and tampers chunk: zero SEND, then restores SYN rows. Current T4 exact ten retained-backup tests: missing-backup/receipt/chunk; tamper-backup/receipt/chunk; mismatch-receipt-material/manifest/baseline; mismatch-chunk-manifest. Observer facts() reconstructs bytes/hash/chunks, exact retainedIds, manifest, receipt, baseline metadata on every full pair, before new handler clean()/recheckOwned()/engine upload. No latest fallback. Finer unchanged helper evidence is compositional, not a separate new publication.
+
+### Enrollment
+
+Native lost enrollment transaction/sync preserve committed enrollment and no upload; factual public closed_ui but genuinely fresh signed choice denies. Native retained transaction/sync cases preserve scope. Current pure exact T1 chronology/native legacy pending, double-enrollment/ack-first/double-ack/unknown-enrollment/unknown-ack/holder-drift/deadline. New P10 unconditionally awaits fixed prepare helper in ONE child with exact ctx/env/id/admissionHash/ownerSource/baseline/defensive resident bytes; rechecks before/after prepare, recordEnrollment, recordAck; updates only own observed records. Protected helper transaction/anchor/alarm/foreign-effect details are reused via exact accepted evidence in the callback verification exception below; callback retry itself is semantic/compositional, not dynamically injected.
+
+### Admission
+
+Native lost-upload replay/new live root and actual actor restart keep consumed rows and cannot duplicate effects; principal actual POST only. Structural composition: P9 unmodified private WeakMaps and consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:id,stage:'connection'}, SAME originalLease) precedes adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease}) and every enrollment/SEND. No DTO/imported admission/second context is accepted by receiver or lexical readChoice. Exact unchanged admission tests original/wrong/finished request lease identified at BASE test blob2dc6d61f2ff35ddb4d075b573e492cd8b740d579; not separately rerun in final gate.
+
+### Upload SEND/result
+
+Native upload-send-transaction-lost: no HTTP upload; upload-lost/malformed/cached/oversize deny ACK/activation. Matched foreign ACK reaches real journal existing result and own coordinator requires recorded; foreign ACK/context cases roundtrip codec and journal before original held response released. No persisted fact replaces actualUploadPromise/result. Fixed engine current guards + exact descriptions/secret baseline inheritance in pure suite; retained read/cancel and original deadlines below.
+
+### Upload readback
+
+DIRECT native upload-module/upload-config/upload-pointer inject valid-envelope READ corruption only AFTER actual connection upload. Actual response hit required; native ACK preserved1, activation SEND/POST0, receipt0. P10 awaits engine.readVersion(candidate), readPointer(baseline), then full recheck inside SAME upload child before later activation child. New producer-order proof, not helper inference.
+
+### Activation SEND/result
+
+Native resealed foreign upload/activation ACK/context and matched existing ACK plus unknown upload prevent next activation. Activation-lost/malformed/cached/held preserve native facts without fabricated receipt; real activation result strategy/versions/new UUID required before its ACK. Native holder and full snapshot comparisons preserve context/baseline. P10 issue→sync→readback→recheck precedes actual Promise; all must be recorded, no recovery.
+
+### Activation readback
+
+DIRECT native activation-pointer/percentage/version/config/secret valid-envelope READ corruption only after actual activation. Actual response hit required, upload+activation native ACKs preserved2, receipt0, no compensation. P10 awaits exact pointer+candidate version/config then constructs/records receipt in SAME activation child.
+
+### Receipt/correlations
+
+Native receipt transaction/sync/readback lost and final owner drift deny200 while durable facts remain; no compensation. Completed native valid-codec/both-journal series: owner/source/context/baseline/preconnection/module/configuration/version/deployment/writer-head/receipt-links/receipt-time (12), exact relevant correlator or installed-stage frame, no next POST, restore only negative rows and preserve baseline history. Current T4 six actual current observation-two drifts owner/revision/config/pointer/grant/schema preserve durable history.
+
+### Time/holders/body
+
+Native clock-backward; original source metadata-holder, post-upload QAobject/primitiveid, DBwithSession/prepare,node,self,KV,fetch,readercredential,activation metadata-holder. All actual original boundary reached; first forbidden ACK absent, next activation SEND/POST0, next native factual reads0. Counter snapshot BEFORE explicit diagnostic RPC; diagnostic storage.list not counted as business IO. Original expired request no provider IO; real body overflow/read cancellation held until actual settlement. Current T4 historical-deadline factual success avoids treating completed history as new permission.
+
+### Pending/retention
+
+Nine native actual-held variants upload/activation fetch, upload read/cancel, source SQL, enrollment transaction/sync, upload ACK, receipt transaction. Second root is independently created and LIVE; scope refuses while actual work retained; original source reader unavailable; DATA release controls original captured invocation under its original deadline; read→real cancel→settlement demonstrated. Durable unknown rows remain. Neither HTTP completion nor abort is physical drain.
+
+### History/downstream
+
+Principal no seeds: actual upstream initial→signed GET/form/cookie→POST→native receipt→QA authorize/code→Mtoken→MCP/D04 actual grant timestamp→native notice GET/POST/NoticeLink. Initial CLOSED rejects OAuth/notice; new config retains monitoringfalse/policyempty but fixed QA notice works. Foreign/preexisting grants/monitoring rows + I0/C0/C1/alarm retained. Focal GET4/POST10/SDK2/Link1 are selected exact names, existing semantics unchanged.
+
+### Graph/extraction
+
+Current full pure46 includes exact compiler graph assertions initial M contains fixed dispatch, M excludes QA candidate decoder/bootstrap, QAdescriptor residency; fixed engine wire and one-shot helper chronology. Transport5 +setup3 preserve old pending and actual two-effect ACK behavior; compiler2 source class/hash/missing factory; lint7paths with max-warnings0. No standard/full SDK corpus, no fourth hidden job.
+
+### Explicit callback-retry verification exception (Root ruling)
+
+No literal native transaction callback-retry injection was found in this Task3 gate or the historical accepted suites. This row has SEMANTIC/COMPOSITIONAL proof, not dynamic PASS. At tested HEAD d11dff63b0d693b89ac6ef8d6ec6c60ca01af751, unchanged helper blob6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9 [append lines53–56](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d11dff63b0d693b89ac6ef8d6ec6c60ca01af751/lib/mcp-qa-finite-preparation-enrollment-writer.mjs#L53) initializes private entered once OUTSIDE the native transaction callback; checks and sets it synchronously before its first await. A second callback calls fail(), setting failed before throwing (lines22–23), and every subsequent check is absorbing (line32). Transaction result must be exactly true, then original sync/readback/alarm (lines70–72); recordEnrollment/recordAck catch set failed (90/99). Native APIs are assumed to settle the transaction Promise only after their callbacks and to propagate/represent rollback/failure according to their documented native contract; this proof does not independently inject native retry/rollback behavior.
+
+P10 blob e482ad1617adc001c3a32c94e71eeb41d27f3d1d [598–602](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d11dff63b0d693b89ac6ef8d6ec6c60ca01af751/lib/mcp-qa-finite-owner-phase-context.mjs#L598) unconditionally awaits exact helper preparation→own enrollment→full recheck→own ACK→full recheck in one original child; only afterwards may upload SEND issue/sync/readback/recheck607–609 and actual native Promise610 begin. No caught helper failure can reach those effects. This is the producer-side composition.
+
+Reused dynamic integration evidence: [accepted enrollment receipt](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ffe25a1e77a1d93d5c03018ada36355b19c91564/docs/superpowers/reports/2026-11-04-preparation-cleanup-enrollment.md), reportblob04a7c661f8fd91263e52060020cd0deab97b3c24/review8143c410374e51dc55f321a4714f7674cfd838ec. Behavior45c0b08f530fdad73e5f8973b3878f279add9a96/run41903117759/job12683052049436PASS;98c02877f7f6f9df956f03a6d3f017e9d60ec4a0/run41900952944/job12682289781032new+99affectedPASS. Unchanged testblobd7dc91d1cf899e51d8f6e83ddd1bce23587d23d7 names: native [throw-enrollment,throw-ack,sync-reject,readback-lost,alarm-lost,ack-readback-lost,ack-sync-reject,ack-alarm-lost] is pending,immutable and never an owner forward; actual [hold-enrollment,hold-ack,sync-hold,readback-hold] after native commit stays in original scope until external release; factual [orphan,hash,unknown,head,policy,permission,foreign] obligation refuses restoration and all forwards; genuine original owner decision refuses [source-drift,holder-drift,qa-drift,clock-backward,clock-forward,clone-admission,wrong-stage] without any cleanup DATA or forward. These test the preserved native-failure/exclusion integration, not callback retry itself.
+
+[Task1 extraction acceptance](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ffe25a1e77a1d93d5c03018ada36355b19c91564/docs/superpowers/reviews/2026-11-05-finite-native-first-connection-publication-task1.es.md) reviewblob5f1f77b24c1a8ac828f2345fe24a4a5d099f0dd5/report9f71c6acd260a36774fee7b7f05902a3cdc524dd: unchanged P2 exact; run42131020681/head22ce84052756936d612b046a84b6500f5773937d/job12760734651527PASS. Exact T1 native old/component append→transaction settled→sync→get→alarm→cleanup→Ack chronology and one-shot method tests run again in final current pure suite. Current native enrollment lost transaction/sync + held work independently cover new producer no-upload order.
+
+Cost if this exception is wrong: automatic native callback/rollback behavior has not been directly injected; fresh reviewer must see and may challenge this verification exception. It is NOT silently counted as a61st native case or dynamic coverage. Root explicitly accepted this level while keeping frozen60 and3jobs; no Source edit/job/check/clock change was made to manufacture a PASS.
+
+
+## Clarifications, metrics and operational limits
+
+Finite extra/duplicate protocol headers preserve accepted P6 exact x-afw-finite-* five and P7 forwarding whitelist; no reject-every-HTTP-header policy. Cost if this interpretation were wrong: stronger transport policy requires explicit native automatic-header design, not a silent new P8 wire contract. Access menor uses valid-on-entry signed identity crossing expiry before TicketUse; valid shorter JWT is allowed and narrows ceilings. Expired-on-entry alone is separate. If expiry occurs after TicketUse preserve durable facts and deny next effect; no minimum lifetime denial or reused consumed history as causal Access test. Cost of opposite interpretation would be denying valid shorter identities/refreshing permission, contrary to original min-ceiling contract.
+
+### Final D11 synthetic native-lab measurements
+
+Principal67,583.677ms aggregate across separate incoming requests; two receiving QA root boundary windows30000/30000ms; upload/activation SEND remaining windows4644/4642ms; receiptInsideActivation=true.69complete pairs292–1242ms. Pre-reload first-connection instrumentation (including explicit fixture factual/probe reads, not whole-flow SQL/DO totals):10327get(including transaction reads),1255list,55transaction,7sync,558first-primary,555SQL. No resource/check/clock optimizer was introduced.
+
+| Captured actual HTTP | Requests | Received bytes | Reads | Cancel calls/settled |
+| --- | --- | --- | --- | --- |
+| observer GET | 836 | 823,391,326 | 202586 | 836/836 |
+| engine GET | 9 | 10,409,327 | 2559 | 9/9 |
+| engine POST | 2 | 302 | 4 | 2/2 |
+
+Actual reads/cancellations on success settled before reload; logical failure/abort is never physical drain. Held original business admission timestamps are separate from late retained cancellation. Late POST activation/receipt targets are admitted within their own live original30s request; observation timer does not merge GET+POST roots. No clipping of cleanup to expired clocks.
+
+Request snapshot BEFORE the final signed unsupported fresh-choice negative:1754 =16GitHub+1736Cloudflare+2AccessJWKS. Business CF phases initial63;choiceGET288/POST559(847connection-form/publication);authorizeGET280/POST336;noticeGET84/POST98; explicit factual verification probes14+14. Actual MCP library path itself adds no CF provider reads in this measured flow; the explicit post-exchange verification14 is labelled separately.
+
+Response aggregation is taken AFTER that late denied signed choice, so1768response observations include its additional14CF factual reads (no next effect). It is a DIFFERENT measurement scope, not duplicated responses. Full response JSON payload total1,877,366,582bytes; headers/compression/network charges/peakCPU/RAM are not measured. These are synthetic native-lab received bytes, not real Cloudflare transfer cost, quota or latency proof.
+
+| Host | Response observations | JSON payload bytes |
+| --- | --- | --- |
+| api.github.com | 16 | 10,028 |
+| api.cloudflare.com | 1750 | 1,877,355,712 |
+| synthetic-team.cloudflareaccess.com | 2 | 842 |
+
+| Phase · host | Response observations | JSON payload bytes |
+| --- | --- | --- |
+| initial-upstream · api.github.com | 16 | 10,028 |
+| initial-upstream · api.cloudflare.com | 63 | 27,541,517 |
+| GET /connections/finite-prepare · api.cloudflare.com | 302 | 295,945,410 |
+| GET /connections/finite-prepare · synthetic-team.cloudflareaccess.com | 1 | 421 |
+| POST /connections/finite-prepare · api.cloudflare.com | 559 | 554,789,099 |
+| verification context after connection · api.cloudflare.com | 14 | 16,933,554 |
+| GET /authorize · api.cloudflare.com | 280 | 338,671,080 |
+| GET /authorize · synthetic-team.cloudflareaccess.com | 1 | 421 |
+| POST /authorize · api.cloudflare.com | 336 | 406,405,296 |
+| verification context after exchange · api.cloudflare.com | 14 | 16,933,554 |
+| GET /monitoring · api.cloudflare.com | 84 | 101,601,324 |
+| POST /monitoring/grant · api.cloudflare.com | 98 | 118,534,878 |
+
+| Fixed host/method/path bucket (version IDs grouped) | Responses | JSON payload bytes |
+| --- | --- | --- |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions/:id | 401 | 1,062,437,552 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-independent-closure-qa/versions/:id | 258 | 814,679,892 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/tokens/verify | 532 | 89,908 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments | 269 | 77,402 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-independent-closure-qa/deployments | 263 | 58,649 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/versions | 1 | 6,005 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/contents/.github/workflows/afw-finite-qa-bootstrap.yml | 1 | 2,624 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/contents/scripts/run-qa-finite-bootstrap.mjs | 1 | 1,894 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/tags/ffffffffffffffffffffffffffffffffffffffff | 1 | 1,874 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/issues/comments/9001 | 4 | 1,536 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows | 2 | 1,332 |
+| synthetic-team.cloudflareaccess.com GET /cdn-cgi/access/certs | 2 | 842 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-release-operator/versions/:id | 1 | 760 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/actions/runs/456 | 1 | 644 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap/instances | 2 | 600 |
+| api.cloudflare.com POST /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments | 2 | 539 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-confirmation | 2 | 476 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap | 2 | 454 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04 | 1 | 443 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-release-administrative | 2 | 438 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/actions/runs/456/attempts/1/jobs | 1 | 429 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/issues/comments/123 | 1 | 316 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/ref/heads/main | 3 | 303 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/ref/tags/afw-finite-bootstrap/11111111-1111-4111-8111-111111111111 | 2 | 300 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-release-administrative/instances | 2 | 272 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-confirmation/instances | 2 | 272 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-release-operator/deployments | 1 | 223 |
+| api.cloudflare.com POST /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions | 2 | 194 |
+| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/commits/cccccccccccccccccccccccccccccccccccccccc | 1 | 108 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/containers/applications/d6fc71552de7494a863aca20365a572d/instances-v2 | 1 | 85 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/schedules | 1 | 54 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/tails | 1 | 54 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-release-operator/schedules | 1 | 54 |
+| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-release-operator/tails | 1 | 54 |
+
+Two immutable-version/module response buckets (M401responses/1,062,437,552bytes and QA258/814,679,892) account for1,877,117,444bytes; mutable pointer/token/workflow facts remain distinct. Full exact endpoint×phase map is in the principal primary JSON and artifacts. This quantifies repeated large reads for later design; it does not authorize changing the accepted checks or clocks.
+
+[Root conditional live-feasibility review](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/6fc3bac5e79ccb399935836370e3cb60edb2e0f2/docs/superpowers/reviews/2026-11-06-native-provider-feasibility.es.md) and [Cloudflare default API limits](https://developers.cloudflare.com/fundamentals/api/reference/limits/): default1200requests/5min per user/account token,cumulative user quota; actual Ratelimit/Ratelimit-Policy headers matter. Request snapshot1736CF/full response observations1750CF within~67.6s SYN COULD exceed default IF same quota bucket; conditional inference, not observed429/account quota or actual rate-limit fit. Live feasibility gate before operational promotion. No quota/plan/credential/check/clock change, retry/sleep or subscription authorized.
+
+All operationalReadiness=false,completePackage=false,PCoff=false. C0=I0+900000,C1=C0+180000; original Nov3 ceiling remains EXPIRED. No main/merge/deploy/provider/auth/OTP/Max/browser/real account/owner data. No actualCloudSourceProof, rollback operational compatibility, hosting/delivery/subscription/guard or PC-off claim. M1 sdkReadCurrent old fixture cause remains UNKNOWN; M2 RPC/toolchain/disposal warnings unowned and not incidentally upgraded. FirstConnectionTicketFault's initial invalid action/nullref hit existing Miniflare RPC error handling; repaired valid codec, no general M2 fix claimed.
+
+## Scope, blobs and rollback
+
+BASE→final-code compare exactly7allowed code/test paths plus report/progress, no qualifier at checkpoint, no protected changes. Accepted fixed-engine P1e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb and enrollment P26eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9, schemas/store/journals/SDK/ordinary/source/bootstrap/initial material optimization remain unchanged by complete diff. Seven frozen blobs:
+
+| Path | Blob |
+| --- | --- |
+| lib/mcp-qa-finite-owner-native-receiver.mjs | e760b3579a38f1dbb73b177bb73b06d814eb881f |
+| lib/mcp-qa-finite-owner-preparation.mjs | 152e730f83af7ef063b6b1db89f8b0a779c2b60e |
+| lib/mcp-qa-finite-owner-phase-context.mjs | e482ad1617adc001c3a32c94e71eeb41d27f3d1d |
+| test/mcp-qa-finite-first-connection-publication-native.test.mjs | bc9f717d79e6e1ad60a40f358351093371331bee |
+| test/fixtures/finite-first-connection-publication.mjs | 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48 |
+| test/fixtures/finite-initial-entry-world.mjs | 297b57846bbbe13bfc80ac52c5b033a382aef4b6 |
+| test/mcp-qa-finite-owner-phase-context-native.test.mjs | be1ff27807934797f371ea703cd9a2c6f7f3675a |
+
+Rollback only own Source commits via explicit branch/fileSHA CAS; accepted BASE preserved. No runtime rollback/compensation or historical-row deletion. Every write verified commit single parent, exactly intended path, ref and blob readback. Sequential parent log below includes the completed scoped qualifier removal. The final two report/progress commits are documentation-only and verified/read back separately; final HEAD is delivered in handoff rather than made self-referential in this file.
+
+## Final scope/readback and verification exceptions
+
+Complete BASE and D11/qualifier-free trees were read without truncation. BASE→qualifier-free code checkpoint has exactly7allowed product/test paths plus this report and existing progress; temporary qualifier absent. All7blobs match D11 exactly; every other source/test/helper/schema/store/journal/SDK/profile/build/bootstrap/initial-material path remains BASE-identical. Final report/progress may change Git tree/provenance but not those source bytes; do not reuse D11 compiled hashes as a later checkout's publication bundle.
+
+Protected exact pairs include P1e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb,P26eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9, anchors00f743593d7670e9cb358c8512a25367d29cd6ed, stage-worka89baeb2578856dadedf700f9d66e180eb09120e, cleanup e9999c6ea5d086599844f86120cb0e3449f5d636, transportfa1cb012d65acc0457f7263d01bb5fd88a0cb8a6, journal6e3de33d04075740fb57e5f9afcf87dd9f68ee79, store122bc0e52870c71da7ae98ef73cd7762171d89ca, recordse9b66f68b6dbabbfecc46072949a0d5d9f059141, compilere8a73ce9f541993657bf8bf4c9bd8d3b02b8598d, Mentry15441b6c0c779f733db65a3b59a3a9e1738d19dc, QAentry1f1e5b95776b189fc8d952930467e6ff99c233c3. The global complete-tree diff covers all other protected files too.
+
+Verification exceptions are explicit: (1) callback retry is semantic/compositional proof with stated native transaction assumptions, not a dynamically injected PASS; (2) most negatives followed initial implementation; (3) full run42232085255 FAILED and full run42236775067 CANCELLED remain so, with scoped completion42240487416 at exact D11 closing only remaining controls/lint under Root's approved composite plan; (4) inherited RPC/toolchain warnings and M1unknown remain; (5) synthetic response/fanout measurements expose a live-feasibility/promotion gate. No requested Source implementation/matrix item is silently omitted or counted as selected0/pseudoPASS.
+
+Process note: an initial qualifier-removal call omitted the deletion selector and was rejected by connector schema for null content. Explicit ref readback remainedf29804ab; the correct explicit delete then produced5e28e70b and qualifier absence. No unknown mutation, retry of an uncertain write or content overwrite occurred. Generated replacements use functions after the separately logged0job quoting mistake.
+
+No further source validation is needed absent a new change or review finding. No local clone/dependency/build/test/artifact download or persistent process was used. Final report/progress readback and handoff conclude implementer Source ownership; no Source writes after that handoff.
+
+## Sequential verified writes
+
+ffe25a1e77a1d93d5c03018ada36355b19c91564 → b0952eab3442cea9b481e33ad11e71f3363ec90c; tree c86e9cc914455381c43d3635da7b5297d514ebc6; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 1b4c1ec4a534842d153473e9c0541963ab2beab0; test: require native first connection from original signed choice
+
+b0952eab3442cea9b481e33ad11e71f3363ec90c → 1945fdccae8fa4f1a0a27f3d780d8be3c71c7b08; tree 94451d3181eee99ffeda1762448a578f31dc99ba; .github/workflows/afw-first-connection-qualification.yml; blob 33cace686f82c8b28eb9c8a085e999954d48e33b; ci: run bounded native first connection causal RED
+
+1945fdccae8fa4f1a0a27f3d780d8be3c71c7b08 → e8df40b6a34898034589599d157e4f64970106d7; tree c86e9cc914455381c43d3635da7b5297d514ebc6; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before connection implementation batch
+
+e8df40b6a34898034589599d157e4f64970106d7 → a406d07d59cf984aec5237d65a4071c7031ba575; tree cca0826e69d5635551a114651d573285adfc5c3d; lib/mcp-qa-finite-owner-native-receiver.mjs; blob e760b3579a38f1dbb73b177bb73b06d814eb881f; feat: route fixed choice receiver to native connection continuation
+
+a406d07d59cf984aec5237d65a4071c7031ba575 → 0b35e614739fe2cfc191275e77bb474d525171eb; tree fcf1c6079e5ca3ff83fedb5d8f13993e4269afd8; lib/mcp-qa-finite-owner-preparation.mjs; blob 152e730f83af7ef063b6b1db89f8b0a779c2b60e; feat: admit original owner POST through fixed factual choice seam
+
+0b35e614739fe2cfc191275e77bb474d525171eb → f5e66b8fca1b2cf218f5cbb42261087ebb804c75; tree 9e383b042e2621f7a3ec0b05d90341d0e14ab60f; lib/mcp-qa-finite-owner-phase-context.mjs; blob dfbc9b89cffcaa0eccd461277dbbef91d4a3646b; feat: produce native first connection from original owner approval
+
+f5e66b8fca1b2cf218f5cbb42261087ebb804c75 → bdd6f9ef66cf30344c04fb01cd923062ad9e1607; tree 9f3d9e9d3e234395c494df18cd9a91cdeb91fbd4; test/fixtures/finite-initial-entry-world.mjs; blob a0e437efcc10b677ee40ebe65ae0b62a640f9ea9; test: retain actual SYN uploaded versions and activation pointer for connection
+
+bdd6f9ef66cf30344c04fb01cd923062ad9e1607 → 12269f51c4ed56a1f6ff0f14fb1afd706a2e3311; tree d837aee331c5b4cd6738f61f7daceae394cd339c; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: measure original native connection continuation
+
+12269f51c4ed56a1f6ff0f14fb1afd706a2e3311 → 0a04af1f0ad3053376d771b741bd7295a6aebb1d; tree 9f3d9e9d3e234395c494df18cd9a91cdeb91fbd4; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier for causal connection diagnostics
+
+0a04af1f0ad3053376d771b741bd7295a6aebb1d → 1ebdd8d37bbfcc79185d493234455c9753c94584; tree 460ca83d41c799abed99e00146af190ac9b67355; test/fixtures/finite-first-connection-publication.mjs; blob b77fd427e647d69e40a0a033266a51b502503d2d; test: observe original connection clock failures without replacing native work
+
+1ebdd8d37bbfcc79185d493234455c9753c94584 → 898d8c4d6ead67a734c11d6452eee281bd8389c7; tree e436a039b2fd9a9cd29b59ae1163745bb6a5d6b8; test/fixtures/finite-initial-entry-world.mjs; blob 2d2c08cf0a0aa1b5a6bfcae59004d7f5ff492b3e; test: capture passive connection SOURCE frames and complete pair timings
+
+898d8c4d6ead67a734c11d6452eee281bd8389c7 → baf349b8c309e8a423fd2fc1ff7ec2aef864256d; tree 5487e2aae88822f40b43d95fea6cc85797be93b5; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: diagnose measured original connection failure
+
+baf349b8c309e8a423fd2fc1ff7ec2aef864256d → c4db57a1866d1c72fe9d84e4abb75ebb9b3cab65; tree e436a039b2fd9a9cd29b59ae1163745bb6a5d6b8; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before downstream test composition
+
+c4db57a1866d1c72fe9d84e4abb75ebb9b3cab65 → 172243a58648337fa13755f008c5aac107e8edfe; tree 5b8f28d675749016e063245e71a0711a0916f335; test/fixtures/finite-first-connection-publication.mjs; blob 163e228e4ae2888903bcf51daa07eb6b63df62ba; test: expose only factual context and retain real choice cookie for downstream
+
+172243a58648337fa13755f008c5aac107e8edfe → 4e15b6e8b60774133689890f93c7baa0fdbc98c3; tree 020c088a03ab625e4d773c5889297937ba0a2006; test/fixtures/finite-initial-entry-world.mjs; blob bfa2464e5558301787846ca521c8e944faa2db34; test: adopt actual connection config only after original POST settles
+
+4e15b6e8b60774133689890f93c7baa0fdbc98c3 → 8d349ba0a1c21e2a3e56e5660d4234d9eee822da; tree 9e42140d1f17c9915c18432d87fc047b14ff0856; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 7f1d284625f687dc5b8fa45980e3e2ee52156ce3; test: require actual connection predecessor through OAuth MCP D04 and NoticeLink
+
+8d349ba0a1c21e2a3e56e5660d4234d9eee822da → 8bfa84f7161ca61da2d99e71fd28aaa8d16d75c9; tree 402ece9bcadb8a5758ae5a5e7f78a3c1f037e18c; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: inspect native POST failure and downstream composition
+
+8bfa84f7161ca61da2d99e71fd28aaa8d16d75c9 → 00feb6cd482a347e1f08359a995babf57314481c; tree 9e42140d1f17c9915c18432d87fc047b14ff0856; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before receipt codec fix
+
+00feb6cd482a347e1f08359a995babf57314481c → 46bd8c345d93d7e8ce692dbb7d97b778f2cdc255; tree 0ef88442edd17ac752919c1796bbd4205e96e99f; lib/mcp-qa-finite-owner-phase-context.mjs; blob c2439157e6ce57dd750ab71a226152462aac34d8; fix: seal native receipt with existing installed record purpose
+
+46bd8c345d93d7e8ce692dbb7d97b778f2cdc255 → b1fc844a6e23b8bb8dfe8ce645447c6f2695b170; tree c0d5d1f70ae328719b12457b710e9bcd3901cedb; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: verify installed receipt codec and actual downstream
+
+b1fc844a6e23b8bb8dfe8ce645447c6f2695b170 → e347e49b5ffd703f955171739d8817fe4780054a; tree 0ef88442edd17ac752919c1796bbd4205e96e99f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before native mount assertion fix
+
+e347e49b5ffd703f955171739d8817fe4780054a → aee9715716f77dbb7ed5eaefcd7066758e7d5424; tree 17194df3ffbaf75c44b6a857dddcc87e8affbe2f; test/fixtures/finite-initial-entry-world.mjs; blob 91256921823dd9783a6c6c22e44699e7c9c1ebeb; test: verify native M script input before Miniflare module conversion
+
+aee9715716f77dbb7ed5eaefcd7066758e7d5424 → 055e205d4fbb33cdab5a01258a86d86406ef2918; tree 98b13b76bd30277f436e0200a5a572c34d1597ae; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: follow actual native connection into downstream
+
+055e205d4fbb33cdab5a01258a86d86406ef2918 → d0542a904d58b378cd0c75195dd4275631a9341f; tree 17194df3ffbaf75c44b6a857dddcc87e8affbe2f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before causal negative test batch
+
+d0542a904d58b378cd0c75195dd4275631a9341f → 7f8a984534a2f6ebb63241764966072a55456288; tree 7f747df11d0b1f2cb84363bca198aa286325f1f2; test/fixtures/finite-first-connection-publication.mjs; blob 585beec42d6cb1fadb41b2f1a247eebe6ac80461; test: control actual retained native uncertainty without approval probes
+
+7f8a984534a2f6ebb63241764966072a55456288 → d5d484d1959420a1ac78c3e1299c0e8feccc22c7; tree 6401408c18aecc2a0ad5ec48117fb935b0e9cf9f; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob ce25ee42c6a29ec28bbcc9f834be1d8dc60c45ce; test: cover native own continuity unknown results and retained settlement
+
+d5d484d1959420a1ac78c3e1299c0e8feccc22c7 → 866bf199531e4691f0e5311d4a6913eecb7ad6b9; tree a9a82d832dd148c76f03fe7109bdda36ff73aca0; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: verify exact M native service-binding downstream
+
+866bf199531e4691f0e5311d4a6913eecb7ad6b9 → c8a78a1f9527e4472e197fc6f7d56f542471f5da; tree 6401408c18aecc2a0ad5ec48117fb935b0e9cf9f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before bounded negative and regression batch
+
+c8a78a1f9527e4472e197fc6f7d56f542471f5da → 11569fcdeeb9bb24a5d763887a9f92e140dc1ba4; tree 6f2815f5d6aeec65653c8f3dba0d2649d16e8058; test/fixtures/finite-first-connection-publication.mjs; blob 02865f4aa1042ed220ed4ef213d1f86e3252760d; test: release retained work only through original invocation DATA controls
+
+11569fcdeeb9bb24a5d763887a9f92e140dc1ba4 → df2aade5481f140205486e67f4a0c17ace671f93; tree 052e291702a635ad0f92df570dac60a47ebdd2bb; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob dfff674a5d3403192a2e6302394f6fc0eb9537f3; test: measure exact connection native IO and original effect clocks
+
+df2aade5481f140205486e67f4a0c17ace671f93 → bac53943c11efb3c9517e998afeb3f5af19cd47e; tree aa5d2004f45e1751fb730197e8b000abf40642b9; .github/workflows/afw-first-connection-qualification.yml; blob ae354ff4b709c7b5f2f99126e28d8e17c9af3017; ci: qualify native causal negatives and bounded accepted consumers
+
+bac53943c11efb3c9517e998afeb3f5af19cd47e → a0617b8f6aea6ed347cd0fd208c5775d42c03fa3; tree 052e291702a635ad0f92df570dac60a47ebdd2bb; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before pinned native upstream principal
+
+a0617b8f6aea6ed347cd0fd208c5775d42c03fa3 → 671e907b1cbad4397adfb6978678375da8a19ad3; tree 9c6cd82c2e4d0c47ac0f4edc7672d7b56422208a; test/fixtures/finite-first-connection-publication.mjs; blob 4469d6e3f2ebc5c09dff71f722a163e30d7abe67; test: preserve exact signed choice identity for causal origin counterpart
+
+671e907b1cbad4397adfb6978678375da8a19ad3 → 8bfdc1c68f818cef2d7e605a1d6f14ccb5901143; tree 0b0be131dcc714dcaa83d1063c486a51c2d81447; test/fixtures/finite-initial-entry-world.mjs; blob 95ea1ca26a9f4516205198c05fd6c41aec839960; test: normalize downstream Host through pinned native instance upstream only
+
+8bfdc1c68f818cef2d7e605a1d6f14ccb5901143 → e866bd5969efc8760f9b3ed2dd8b6ac923b665f9; tree 0fd850832693613d120f89142a29ead9a00dea71; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob bb0e2908662c3d1de715092db9b22cb2d3e50818; test: prove signed wrong URL and foreign Origin at native normalization boundary
+
+e866bd5969efc8760f9b3ed2dd8b6ac923b665f9 → fa45d1556fb7914e6f6e73ce718c9c6dbe0632f2; tree 443fe18de3d14c3edc6d209390e8009eaeb27f6e; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob f470c94231827f244e34a5abec61d0fc126d953c; docs: preserve Task3 causal checkpoint and current native harness discrepancy
+
+fa45d1556fb7914e6f6e73ce718c9c6dbe0632f2 → ea759c689070d878d357c42a87a9cf5d5dccae7a; tree d2f7c636c71a9df729b1110bcbc33323e015ec02; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: verify pinned native upstream with exact initial M bytes
+
+ea759c689070d878d357c42a87a9cf5d5dccae7a → 30276fb216311a0063af521f1a6fe54d1692cde2; tree 443fe18de3d14c3edc6d209390e8009eaeb27f6e; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before current-history and identity causal batch
+
+30276fb216311a0063af521f1a6fe54d1692cde2 → 21ba7bf6a55dc7ba8b07a4a78d50e5911f609fcb; tree 7143b85cd51b1d48b27f767b8cd483851d5405e6; lib/mcp-qa-finite-owner-phase-context.mjs; blob 382c6a36e9d17b7eb3952b97f9f277be063e44b4; fix: preserve unique original OAuth observation marker beside connection handler
+
+21ba7bf6a55dc7ba8b07a4a78d50e5911f609fcb → 93fd5cdfb6bf6c9878897201fb4bbed5757ac8d4; tree 0f2f1bce4b63bc5f2dbcf90bd25d12be81f7b06c; test/fixtures/finite-first-connection-publication.mjs; blob b763d192c557b6812e4e6fc1166ede2d6044bca5; test: preserve native Access expiry and actual actor restart boundaries
+
+93fd5cdfb6bf6c9878897201fb4bbed5757ac8d4 → 57ec6284fa8ac1c3d390b7c5db5f10c7ada6a1db; tree c7c1125fd322dd22fd29d967dbf26097caacbaf3; test/fixtures/finite-initial-entry-world.mjs; blob 1247386b3f81af33e2ca1e3a410d3f7b79ce4ce1; test: sign exact current Access variants without changing source authority
+
+57ec6284fa8ac1c3d390b7c5db5f10c7ada6a1db → 7d7de3b88024598b1b21c42d4b68a2dba1ce1f20; tree 799a9e49a6cb46156630d9e150597f69a4bb150c; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob fb728a6af54e96dfd69c28743964e57596007bd7; test: cover signed identity choice recoverable source expiry and consumed history
+
+7d7de3b88024598b1b21c42d4b68a2dba1ce1f20 → 4d0282ce991f11b1512cfed47ca01861aa4d0827; tree 62cc9f73c7ba5d90f911a1ac9e8fc886e56431f3; test/mcp-qa-finite-owner-phase-context-native.test.mjs; blob be1ff27807934797f371ea703cd9a2c6f7f3675a; test: keep both current snapshots and historical deadlines factual
+
+4d0282ce991f11b1512cfed47ca01861aa4d0827 → 8b3f0faf63793a84614f4e28d1b648a94af7784c; tree 3b300dc8c070c34422d8c1a3cf1218c0c00e271d; .github/workflows/afw-first-connection-qualification.yml; blob 98b628004fb8f7ca7689f767ed59899d3be2e489; ci: qualify current-history identity and repaired focal observation groups
+
+8b3f0faf63793a84614f4e28d1b648a94af7784c → 8fc4f889faddf73edf7070731eadeeead4915471; tree 62cc9f73c7ba5d90f911a1ac9e8fc886e56431f3; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before exact entry dispatch and native proxy refresh
+
+8fc4f889faddf73edf7070731eadeeead4915471 → afbf18ddf8a3209a2d5ecf9080364f81a2b33342; tree 04b7ef2bff8695e0f688e364a30a1e3fd914874e; test/fixtures/finite-initial-entry-world.mjs; blob 394264ea67eee56460289ef4070d158f6663c8f8; test: retain native instance entry and refresh same D1 proxy after config adoption
+
+afbf18ddf8a3209a2d5ecf9080364f81a2b33342 → 4fc92a228eb2d401cdb23f1fa427b8763f1be3a9; tree e229ecad4f676adf1e7c97103706e08499785431; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 2d33d891afee341f670630b897e1869b4b6d981c; test: send exact MCP request through configured native upstream entry
+
+4fc92a228eb2d401cdb23f1fa427b8763f1be3a9 → c49e4effe9ad4376736b7c1b9ecf22a7697ab0aa; tree c69fb09e0b6aebae0c34b1b2b042d9f9beb3ca8b; .github/workflows/afw-first-connection-qualification.yml; blob e36e43f50f9164e8a217a3f9270ba4b949182456; ci: verify native entry correction and recovered current source handles
+
+c49e4effe9ad4376736b7c1b9ecf22a7697ab0aa → 668be1a84759f1e9cb033fe75dfe77e4eb99aa1d; tree e229ecad4f676adf1e7c97103706e08499785431; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before causal correlation and single-guard controls
+
+668be1a84759f1e9cb033fe75dfe77e4eb99aa1d → 208934ac3821f4819588d7c484d67c5610dba30f; tree 5af3e0861db873841d29c3b150fb3bd1dd095a9c; test/fixtures/finite-first-connection-publication.mjs; blob fbe580863da6f01bd4ad7167d80e0a236f64a88f; test: reseal actual completed data and isolate negative-only guard controls
+
+208934ac3821f4819588d7c484d67c5610dba30f → da3325126f8911b3ef7061611eaba8e9a873ddfa; tree ce2341810191b0f83a12e4a66eb944e702d35da2; test/fixtures/finite-initial-entry-world.mjs; blob 641ecb423ac4c35395cdd315c86a503a659642e2; test: label negative QA mutations separately from exact positive M lineage
+
+da3325126f8911b3ef7061611eaba8e9a873ddfa → 7e4e850b4be363f0a60e6484020a8b98dd41a05f; tree 9fb1f7d8ead2069cecceed8eb59f9cb3091a0a8f; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob f3789ef53e287de4494a1761d5e5d9c85574d003; test: prove completed fact correlation recorded ownership and preserved telemetry
+
+7e4e850b4be363f0a60e6484020a8b98dd41a05f → 48c4efa6a4d4ea6b24c9550374f3692828b4bac1; tree 91c3dce8fd537e826580811d2e4018682dc28341; .github/workflows/afw-first-connection-qualification.yml; blob f4b4389e66f82691d753bcd2d36c38eacb02a10a; ci: qualify precise correlations and isolated negative mutation evidence
+
+48c4efa6a4d4ea6b24c9550374f3692828b4bac1 → db90dae7bc5b168d9326f5df229135039359eb1c; tree 9fb1f7d8ead2069cecceed8eb59f9cb3091a0a8f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before remaining original lifetime boundaries
+
+db90dae7bc5b168d9326f5df229135039359eb1c → 35d592c9c8df36f72d3904d33b760e8e6defe334; tree 5c1ff010e6e9de6f56900e9b839006c112265fec; test/fixtures/finite-first-connection-publication.mjs; blob 0ccdab4076b6791932d89c27978f064020cee5a1; test: retain original body SQL ACK receipt and holder lifetimes with actual IO metrics
+
+35d592c9c8df36f72d3904d33b760e8e6defe334 → d4997c6adce593f6f8c926ccb4819b7369cc6069; tree ad32b2e9e7b92f99ad1673f7153d51fec6867bcd; test/fixtures/finite-initial-entry-world.mjs; blob 2b25b89ed1cdd4f8ac7c84d7cdecf3da1b4c803e; test: observe native body cancellation and separate fixed provider phases
+
+d4997c6adce593f6f8c926ccb4819b7369cc6069 → 476f946d2fc8bb97de3b53ef8577605bbdf6ff3e; tree 7a05a63ed66dbc248a2d4a92d0fc0f5baf846cdb; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob bce97a5f68efad57ac8f338587b9f5570720ee61; test: fence original body parent ACK receipt SQL and holder boundaries
+
+476f946d2fc8bb97de3b53ef8577605bbdf6ff3e → 935d202fe5f5d2dba9b351abdae7d8d025ac5c6d; tree 7ae967a766da86659d16d73e52bebcccda4963cf; .github/workflows/afw-first-connection-qualification.yml; blob a45e59b2f7facfae78e8a008756093a370a6a5f3; ci: qualify remaining native lifetimes and exact positive telemetry
+
+935d202fe5f5d2dba9b351abdae7d8d025ac5c6d → 7fb2e7d31c8a47b38ac22db37ea4f3d6d4517fdf; tree 7a05a63ed66dbc248a2d4a92d0fc0f5baf846cdb; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier while preserving active lifetime checkpoint
+
+7fb2e7d31c8a47b38ac22db37ea4f3d6d4517fdf → 8a818524591acc2bb12b8a8ac9fbe3158b6bca8c; tree 0b577320536deafff75d4c98dd836d362d9d5351; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob 10ed40286c222b701d5ae43900cce84a79bdbbc4; docs: preserve actual native causal checkpoint and conditional API feasibility
+
+8a818524591acc2bb12b8a8ac9fbe3158b6bca8c → 32668d5359a53166b60efce037b21b842281baae; tree 6b374e5f6bb757b8ba18c07cf33b0f31ffa4dfeb; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob 5b198e9098f207226b07d8a6acba9924e1085862; docs: checkpoint native Task3 progress without claiming final acceptance
+
+32668d5359a53166b60efce037b21b842281baae → 918f54c1b4baca3eba6e0ab98c4255ce0a5589bc; tree ad19c9ba27449eb657e847f4bb165592688f455c; test/fixtures/finite-first-connection-publication.mjs; blob ffb1986ef5648efd62c935cd1ecccc6b57755698; test: isolate in-request holder drift and genuine compiled profile mismatch
+
+918f54c1b4baca3eba6e0ab98c4255ce0a5589bc → c9edd694487eba988b8bb55b5af5a1c1495f2725; tree 1ff7c8565910ae0894f0ce5111d9ae12b9cdd2d8; test/fixtures/finite-initial-entry-world.mjs; blob 9363679a536fa01a6179548de0f43a13bafaa75e; test: measure fixed provider response bytes and optional negative profile code
+
+c9edd694487eba988b8bb55b5af5a1c1495f2725 → ec596cff874ef9b3c41748ca1f64e971f7485dda; tree b1b3364f1d78a2acd65e07ed0936bf786e90ca59; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 44ca1ccc95b787772dd972a674ef77da8331f6b4; test: qualify signed protocol metadata config secrecy and receipt lineage
+
+ec596cff874ef9b3c41748ca1f64e971f7485dda → f267ee6e7044883a0d1bdf873010a180f5951202; tree fbba914785cfea7cda05320524c81cd83cf7565a; .github/workflows/afw-first-connection-qualification.yml; blob b3507f857006d982e95d0897824561743e58dde4; ci: verify remaining protocol profile source and original-clock correlations
+
+f267ee6e7044883a0d1bdf873010a180f5951202 → 3469139f5da474722f5d0f53ff5648142f87e67f; tree b1b3364f1d78a2acd65e07ed0936bf786e90ca59; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before original-holder causal RED
+
+3469139f5da474722f5d0f53ff5648142f87e67f → 9794b4cca244e4d9613625ceb482eea238de1d55; tree 3cd037465173661a4df3ea083214d3ca4d156bdb; test/fixtures/finite-first-connection-publication.mjs; blob 2cd77e2759ccdded6c408925958d8cd062e9451a; test: change only original native method holders after actual upload result
+
+9794b4cca244e4d9613625ceb482eea238de1d55 → 5511c073b588dee542fdb9c424f11cc1c70d20c7; tree 0100dd4a1cd2014c39cbac9b99fb19feec4b991c; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob c2389cc813267714632113fff100d6725029785f; test: require original DB node self and KV holders across source pairs
+
+5511c073b588dee542fdb9c424f11cc1c70d20c7 → e08a45d1741cc475099c1b72c5afa11ccd93c4a3; tree 355be0dfa44b7904d5d98cd101808f084405b794; .github/workflows/afw-first-connection-qualification.yml; blob cf39191f036a514cb66c7ebc9109d2f901206701; ci: demonstrate original-holder drift before connection guard fix
+
+e08a45d1741cc475099c1b72c5afa11ccd93c4a3 → 7be8f9e2f3b520148f650d178f1cb0a8dce2e297; tree 0100dd4a1cd2014c39cbac9b99fb19feec4b991c; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before final version-holder RED and native proxy check
+
+7be8f9e2f3b520148f650d178f1cb0a8dce2e297 → 774968aae56ef2ea557fbc2041a7b14e3a6536a3; tree 7e80697af82f9081ce42eb4531d35a2532206773; test/fixtures/finite-first-connection-publication.mjs; blob dce93b2dc07eca88343b5b73ffc54d0d800f0094; test: fence original metadata identity before any native acknowledgement
+
+774968aae56ef2ea557fbc2041a7b14e3a6536a3 → 9856eab4aaa0c877c28965102674a44899eec4db; tree bb47440f404cedbde7f67d1f8f34d4643bd2afef; test/fixtures/finite-initial-entry-world.mjs; blob 6ee0c3c5f837955efc73f5e031525de7eb57880c; test: refresh optional negative profile proxy at every native mount boundary
+
+9856eab4aaa0c877c28965102674a44899eec4db → d22789dcbc2ca878bb71267ebd336d3019ec65a5; tree 1c5e6b34e3b0db1c2e794476e6e3348447ab96a8; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 20f86309462b2f345e9be211aad258e0ae00c98a; test: require zero next SEND and ACK under original holder drift
+
+d22789dcbc2ca878bb71267ebd336d3019ec65a5 → ef3fa9b614f74b37ff67f6a7d424a8227607c0fb; tree 09523fe4f23c72a6b9accea3c2717175867e7560; .github/workflows/afw-first-connection-qualification.yml; blob 5926c5ea0a642a63a93a72288410edeae30d5224; ci: demonstrate original version ACK fence and genuine profile protocol boundary
+
+ef3fa9b614f74b37ff67f6a7d424a8227607c0fb → 7446aff272e5eef215d6b020ee8177ea1e3ab30b; tree 1c5e6b34e3b0db1c2e794476e6e3348447ab96a8; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before original native-holder fix
+
+7446aff272e5eef215d6b020ee8177ea1e3ab30b → e05089a0549415f2ff3ecb6ca82e2906223b1da2; tree 93c009604bef593a200cfc988429770e15d76ad5; test/fixtures/finite-first-connection-publication.mjs; blob d96c31f5704054a0b9884c1536ad7f7167b4389c; test: keep malformed protocol observation passive before product validation
+
+e05089a0549415f2ff3ecb6ca82e2906223b1da2 → 0526f12d94325676d53031f45b9c20c0aaa4a61b; tree 8da8831d3cf706c3117f0e85b0cdfa25558fff77; lib/mcp-qa-finite-owner-phase-context.mjs; blob 5dd213a2a771423f31b98a184bcb541c6f88000f; fix: retain original native holders throughout connection publication
+
+0526f12d94325676d53031f45b9c20c0aaa4a61b → cd4d6c1da749d635607e6d57959eefaf89091e18; tree 00ca1db6c791efa0cccdb9c7b74916a019eedda4; .github/workflows/afw-first-connection-qualification.yml; blob 72556db6043ada16db8a02d9fac930433966603c; ci: qualify original native-holder fix and unchanged positive clock budgets
+
+cd4d6c1da749d635607e6d57959eefaf89091e18 → 3882a7cc900433d17e81a99eb8cec4a5c54d392c; tree 8da8831d3cf706c3117f0e85b0cdfa25558fff77; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove bounded qualifier before original-holder guard batch
+
+3882a7cc900433d17e81a99eb8cec4a5c54d392c → 024a08ae6274eeb2a1ced141380f177aa33e0b41; tree 4312f9e1a3d4d595a54ef470be3530b51ac70630; lib/mcp-qa-finite-owner-phase-context.mjs; blob e482ad1617adc001c3a32c94e71eeb41d27f3d1d; fix: guard original holders before invoking continuation work
+
+024a08ae6274eeb2a1ced141380f177aa33e0b41 → 753ff0907eab15db33fc7f834b2a0ee6f29bc723; tree 2b7f5b1ddbfe3a75065ca9edc67e87ca697f9196; test/fixtures/finite-first-connection-publication.mjs; blob 41d403e0bea47ca0c90393f59245271ca9274d76; test: count every post-drift native read invocation
+
+753ff0907eab15db33fc7f834b2a0ee6f29bc723 → 277e64d5a739463ab9ab1c25da31eb5c60606c9a; tree 1e2674b930037fac40e443d04a402d920eec13db; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 3511e81c57b573451b451d155265966d6f63d9a8; test: forbid factual reads after original holder drift
+
+277e64d5a739463ab9ab1c25da31eb5c60606c9a → 1cf62cdd5265e7ab2f313ffc13aa8321281af3c9; tree 93d592520eaa2457b57f7f0a3815391ecfb50176; .github/workflows/afw-first-connection-qualification.yml; blob 72556db6043ada16db8a02d9fac930433966603c; ci: verify deferred original-holder guards and exact native principal
+
+1cf62cdd5265e7ab2f313ffc13aa8321281af3c9 → 0c8c8f9cd3edae9c28a4195b09be41cfac680610; tree 1e2674b930037fac40e443d04a402d920eec13db; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before completing causal readback variants
+
+0c8c8f9cd3edae9c28a4195b09be41cfac680610 → d02ad5dfd05611e5beefed0399bfd980e343f147; tree b3db3f48317aecb4f7f44f582b07939de10a7d0c; test/fixtures/finite-initial-entry-world.mjs; blob 297b57846bbbe13bfc80ac52c5b033a382aef4b6; test: corrupt actual publication reads without altering registry artifacts
+
+d02ad5dfd05611e5beefed0399bfd980e343f147 → a4ae40124907ce1f03792ed6f0808cb0e2c69363; tree add09cf1534de51038720c3d77979ebff4c7d81a; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob effd8b9c4ae8f4dd32be7577804a2baae4d5ead2; test: assert each upload and activation readback denial causally
+
+a4ae40124907ce1f03792ed6f0808cb0e2c69363 → f7f73a187e49465f4ec89ef8562a96f3aefcfdd6; tree 644ca2b2911cc9cc5fc809cc59026022af81b95b; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob da57209cf1348abaa4ca3db61a82f34f5deb4573; docs: preserve native holder causal proof and remaining matrix checkpoint
+
+f7f73a187e49465f4ec89ef8562a96f3aefcfdd6 → b7794153b7673c598933820440f2bdbe42d4cd27; tree 1b74cbb734ccc0210f475798fcf1f590775df64e; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob 3e81911866d8a24f734ee3d77d0dc3fdeaf7a4ae; docs: checkpoint Task3 holder proof without completion claim
+
+b7794153b7673c598933820440f2bdbe42d4cd27 → 010c92e998d5774656513d0f9a874a94b8c3eaeb; tree 1536218a75a5cf2fe9b7ed199fbce297b700b67c; .github/workflows/afw-first-connection-qualification.yml; blob 2e1898d24df595114455c774f14dc077e2125f9c; ci: qualify eight causal native publication readback variants
+
+010c92e998d5774656513d0f9a874a94b8c3eaeb → fd757be15c119c531953f9da92ae8cb9fd48fd4c; tree 1b74cbb734ccc0210f475798fcf1f590775df64e; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before final ticket correlation matrix batch
+
+fd757be15c119c531953f9da92ae8cb9fd48fd4c → c9ec67266c12844318b53acb716aa52e0ad0cbbd; tree 770b78794ea7b67765c29cc4a75d5efc62ce1a91; test/fixtures/finite-first-connection-publication.mjs; blob 0f807f5f72276668793fd02dd1b1c2a2c08f4ce8; test: mutate actual choice ticket facts with valid codecs only
+
+c9ec67266c12844318b53acb716aa52e0ad0cbbd → e5fa95364648a2ab3afe6fd344b22d4b53205f07; tree b6428f1a82a8207bcb9390f75a7344f0a424ebc4; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 2e81281c70afd528fb685c747532bc1dd26df465; test: preserve ticket lineage across six causal correlation negatives
+
+e5fa95364648a2ab3afe6fd344b22d4b53205f07 → 41f33e44386713b9b4310a4f6f595d88a46fd73c; tree 1ca8d6a732bd4c0a4548655ef9c91657b5626052; test/fixtures/finite-first-connection-publication.mjs; blob c5a8876eb089e82d2a7a20b9525a593e29c3e848; test: snapshot causal counters before explicit failure diagnostic read
+
+41f33e44386713b9b4310a4f6f595d88a46fd73c → 88090aa24697a28d1e9e338925617d628a396863; tree ed1ad7b388c1f23a4c67f6bb4185da266cf801cc; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 0e2e1673533a7c60cdb1958a74c4d8ae7ba2328d; test: separate request-native reads from later explicit diagnostic probes
+
+88090aa24697a28d1e9e338925617d628a396863 → f9e166bd0809cd4164d06a6f0ef2a2cb4ab4001e; tree 5eead19db3306ef1d87ca9462a5f902340bd2329; .github/workflows/afw-first-connection-qualification.yml; blob 525378b2a53fb92211d8930efa52ef98d1eea3d6; ci: qualify actual ticket correlations and source-holder counter scope
+
+f9e166bd0809cd4164d06a6f0ef2a2cb4ab4001e → 36ba881471a1a6cca6db57862b831706100c425a; tree ed1ad7b388c1f23a4c67f6bb4185da266cf801cc; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before precise codec-valid ticket control fix
+
+36ba881471a1a6cca6db57862b831706100c425a → 3697c5392f86d68a894b2be6af8624cf06c3d97a; tree 4df7635b46719b1fb50360bccb8d9fbc37b23dcd; test/fixtures/finite-first-connection-publication.mjs; blob 4160151fa7c426f4b9fd7d83f38deb7d7e1a4b9f; test: reach exact ticket correlators with valid action connection reference
+
+3697c5392f86d68a894b2be6af8624cf06c3d97a → b67453120328c9a7a6c07e1306de8c67a261de3a; tree 49ef7824b8586000f16db0360c8a8adaadd186ae; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 925cec402b15e7fceef2331210020a114d29388d; test: assert targeted ticket and snapshot predicate reached after codecs
+
+b67453120328c9a7a6c07e1306de8c67a261de3a → bf9268f135a3b988e1d6c458ea3088e9d83a54b8; tree 19035a2dbc0926b5f668d0ce385fe0e27937d117; .github/workflows/afw-first-connection-qualification.yml; blob 525378b2a53fb92211d8930efa52ef98d1eea3d6; ci: verify codec-valid ticket predicates and unchanged source-holder refusal
+
+bf9268f135a3b988e1d6c458ea3088e9d83a54b8 → 31ede7d2d0a7ee90828042c8cad17a30a6eaf60d; tree 49ef7824b8586000f16db0360c8a8adaadd186ae; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: freeze final code before exact bounded qualification manifest
+
+31ede7d2d0a7ee90828042c8cad17a30a6eaf60d → 6a5a9e5f272619e96160cd0e3e8a5e686fb01b1f; tree e5eea4ef7f0bf4e4353ad4175c6a0c262331d331; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob 3123a98230018cfb85f2ba54297aa8ee6200388b; docs: freeze exact sixty-case native matrix and bounded qualification evidence
+
+6a5a9e5f272619e96160cd0e3e8a5e686fb01b1f → db9effbfc0acea4ef287113df15e25f68ae4f439; tree 1348b19395830000a5112ff658f654a3d6c090fd; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob 80448d490bf23a11dbb4ff5925221e8632232160; docs: preserve Task3 exact final matrix before qualification
+
+db9effbfc0acea4ef287113df15e25f68ae4f439 → bbb09fca038c3ca09e8f02f07df558378b3fd843; tree df6af49fb23e4291540b312ea57ac6c96e23679f; .github/workflows/afw-first-connection-qualification.yml; blob aaec94c6f7b9e932e840d3bf662e2e105553eff4; ci: run frozen sixty-native-case three-job qualification and scoped regressions
+
+bbb09fca038c3ca09e8f02f07df558378b3fd843 → 09813e0ced14be940398e5aae3c6964377e00b72; tree 1348b19395830000a5112ff658f654a3d6c090fd; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: preserve incomplete qualification before causal observation-scope correction
+
+09813e0ced14be940398e5aae3c6964377e00b72 → 18463127ae3efd772ed03a163c35590865dd3e2f; tree b610f6b80a19ff543a11dbab6f9ad8692108c273; test/fixtures/finite-first-connection-publication.mjs; blob 369d164b38ee658002726a1155929a2ac18b5cd2; test: timestamp actual connection POST observation without changing native clocks
+
+18463127ae3efd772ed03a163c35590865dd3e2f → 0092edfd2cdeb02398f467fda187a891129e54d5; tree ba43b2143bf8543961074237412724d4a8067ff0; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 27334256258176816345265e26cd735099be9df7; test: align late native-boundary observation with its actual POST root
+
+0092edfd2cdeb02398f467fda187a891129e54d5 → f7949f035caa729478eb9694195c22229af47a2d; tree ffd876ed7656678e143c58614044472d9d450fd1; .github/workflows/afw-first-connection-qualification.yml; blob e0d70f2afc0056360d14f2fb916f2dce1dd09c3e; ci: diagnose actual late held boundaries within original POST observation
+
+f7949f035caa729478eb9694195c22229af47a2d → 534c4054e0bf350ba5f944097e53e6d0f04a65bd; tree 184792f2a92b83c0a32dd356a4c5fbb69f7d5567; .github/workflows/afw-first-connection-qualification.yml; blob 5ae4f604eeb637a587079a1c6fb0492f5acf256d; ci: correct literal regex quoting for two-boundary observation diagnostic
+
+534c4054e0bf350ba5f944097e53e6d0f04a65bd → d8d3276cf4122ec900e60dd3b2ef651b6f0b469e; tree ba43b2143bf8543961074237412724d4a8067ff0; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove focused qualifier before explicit live-boundary observation proof
+
+d8d3276cf4122ec900e60dd3b2ef651b6f0b469e → bfcedc516a54da3674da983eff84581787e0655a; tree ec33d785810c368a5bda529332dc3dc3e1a66aaa; test/fixtures/finite-first-connection-publication.mjs; blob b3325a419b15fd92f99471d91702674c5f85de0b; test: preserve actual live native held-boundary entry facts
+
+bfcedc516a54da3674da983eff84581787e0655a → e5913781a81d4e3ec0fac01c018c18058091636a; tree d83ba47df207e8f57dff75fce5a8fec4ee9a167c; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob f86fa330d2eb9848804bec900191e60cf71b2956; test: require each held target to enter within its actual live request
+
+e5913781a81d4e3ec0fac01c018c18058091636a → 4ddc7db7bc68a124f77ad2a7d19218f21280b769; tree 0a3a9d26e74fd1182917e1e459611c1878401314; .github/workflows/afw-first-connection-qualification.yml; blob 5ae4f604eeb637a587079a1c6fb0492f5acf256d; ci: prove late held entries reached inside actual live POST boundary
+
+4ddc7db7bc68a124f77ad2a7d19218f21280b769 → ed051204d16a3930c7d798f4ddba0975d1eec5d4; tree d83ba47df207e8f57dff75fce5a8fec4ee9a167c; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before separating late cleanup observation facts
+
+ed051204d16a3930c7d798f4ddba0975d1eec5d4 → 3238165e15e52cac886ddb150fb517939538f3e3; tree 4b30daa0c22cf7ae6114b927cb676c4ec9826284; test/fixtures/finite-first-connection-publication.mjs; blob 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48; test: distinguish live business IO admission from later retained cleanup
+
+3238165e15e52cac886ddb150fb517939538f3e3 → b6a81590276503926e7fe10564add26150fc1f5f; tree c81007b46849a3a9d2a5673a7912b32d62493f4d; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob bc9f717d79e6e1ad60a40f358351093371331bee; test: allow actual late cancellation while preserving live admission proof
+
+b6a81590276503926e7fe10564add26150fc1f5f → 9a7502f94b23e777ab5b195278c75e1207132555; tree 764110b8beb6f35c4901a6f4ff462b0b73e0931d; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob c41b55139cb8695b1a9169b5e368d78fdec4c377; docs: preserve incomplete gate and freeze corrected live-observation qualification
+
+9a7502f94b23e777ab5b195278c75e1207132555 → a61142aea40cb4e7880a34e5ffa39ab14ee4fdf5; tree 6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob b6a5810d8e70b7b737b6588f59ea7bdd82835a15; docs: checkpoint corrected Task3 observation and revised exact three-job gate
+
+a61142aea40cb4e7880a34e5ffa39ab14ee4fdf5 → d11dff63b0d693b89ac6ef8d6ec6c60ca01af751; tree 4e30df2ae4abe2bf087b123823185fa6ab082fa8; .github/workflows/afw-first-connection-qualification.yml; blob c3bf62cd04769c1d43abe3ff13784f59e3b351c7; ci: qualify revised exact native matrix under independent original request observations
+
+d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 → f29804abe54f1d618c859c2642b48f90b5677fb7; tree 4f7b1b5ff6296fa6220d09d8d8636f28b26a907a; .github/workflows/afw-first-connection-qualification.yml; blob b9fe3400416e990bb451a17ff21f6999bebe65e4; ci: complete only remaining controls and lint at exact qualified source checkout
+
+f29804abe54f1d618c859c2642b48f90b5677fb7 → 5e28e70b7833fcd4a17fecebe320b0365b6c4d2f; tree 6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove completed scoped qualifier and freeze Task3 source handoff
[Source lacks final newline: before=true, after=true; exact blob references control.]

```
