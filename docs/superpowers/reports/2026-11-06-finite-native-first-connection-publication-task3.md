# Task3 native first connection — qualification report

DONE_WITH_CONCERNS — SOURCE/SYN implementation and declared composite qualification complete at2026-11-06 15:18UTC; fresh independent Root review/acceptance pending. Explicit verification exceptions and live-feasibility limits are below. PROJECT=AFW; repository tokenizartinfo-ops/agent-friendly-web; SOURCE branch feat/finite-native-cleanup-20261101. Cloud connector/Actions only, no local clone/build/tests/dependencies. BASE ffe25a1e77a1d93d5c03018ada36355b19c91564 / tree43f53af19e427eade3ab6d4f90ac91ef1380f627. Qualified source checkout d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 / tree4e30df2ae4abe2bf087b123823185fa6ab082fa8. Qualifier-free code checkpoint 5e28e70b7833fcd4a17fecebe320b0365b6c4d2f / tree6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; qualifier absent at this checkpoint. Seven code blobs below are the frozen lineage inputs. Documentation and temporary qualifier commits do not change them.

## Completed declared gates — explicit composite verification exception

**167/167 positive tests PASS at exact SOURCE checkout d11dff63b0d693b89ac6ef8d6ec6c60ca01af751/tree4e30df2ae4abe2bf087b123823185fa6ab082fa8**:137top-level tests+30actual nested subtests. Native union60 exact/disjoint; all positive FAIL/CANCEL/SKIP/TODO0 and individual command exit0. Principal67,583.677ms aggregate across distinct original requests: actual signed GET/cookie/form→POST→new upload/activation→native ConnectionReceipt hash99bf64e38bf7f6230b585c6e6c72f7fb2ccc7643be3ffcb12e7da8f3bdcb9a33→real QA authorize/code/Mtoken/MCP-D04/native grant timestamp→native notice GET/POST/NoticeLink. No seeded connection, exact initial M bytes/config-only OAuth, ordinary SQL0.

This is NOT a successful single full qualifier run. [Run42236775067](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42236775067) remains **CANCELLED**: A23PASS, B23PASS, C121positive PASS, then jobC reached15min during first remaining mutant. Positive command sum inC883225ms (14m43s); no completed control/lint credit from that cancelled job. Job wall timestamps include setup/cancellation/artifact overhead: A14:45:34–14:58:43(789s), B14:45:34–14:57:56(742s), C14:45:34–15:00:54(920s,cancelled). The C665s forecast missed actual allocation; never called a bounded fit.

Root explicitly approved minimal **composite acceptance**: retain all167already-passed positives at D11; run ONLY the two controls+lint against that SAME pinned checkout, without changing any source/test file or rerunning positives. [Scoped run42240487416](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42240487416)/job127969155895 SUCCESS15:10:04–15:11:17UTC(73s), exactly1job, configured15min/read-only/no secrets. Trigger commitf29804abe54f1d618c859c2642b48f90b5677fb7 is distinct from actual checkoutD11/tree4e30. Existing fixture child-only GITHUB_SHA was explicitly set to verified checkoutD11 so testRevision names actual compiled source, not later workflow trigger. Before/after seven HEAD+working-file hashes and tracked cleanliness are exact. Initial actual HEAD/tree are pinned and verified. No claim tests later qualifier/report commits. Cost if wrong: any hidden code/provenance difference invalidates composition; do not accept. This is an explicit verification-plan exception to the former single3job gate, not a hidden fourth job.

| Command | Job | Expected/executed | Top/sub | PASS/FAIL/CANCEL/SKIP | Exit | Elapsed ms |
| --- | --- | --- | --- | --- | --- | --- |
| native-A | A | 23/23 | 23/0 | 23/0/0/0 | 0 | 759036 |
| native-B | B | 23/23 | 23/0 | 23/0/0/0 | 0 | 714696 |
| native-C | C | 14/14 | 14/0 | 14/0/0/0 | 0 | 440549 |
| context | C | 34/34 | 34/0 | 34/0/0/0 | 0 | 151231 |
| get | C | 4/4 | 4/0 | 4/0/0/0 | 0 | 57730 |
| post | C | 10/10 | 10/0 | 10/0/0/0 | 0 | 145934 |
| sdk | C | 2/2 | 2/0 | 2/0/0/0 | 0 | 27224 |
| link | C | 1/1 | 1/0 | 1/0/0/0 | 0 | 19883 |
| pure | C | 46/46 | 16/30 | 46/0/0/0 | 0 | 29135 |
| transport | C | 5/5 | 5/0 | 5/0/0/0 | 0 | 1914 |
| setup | C | 3/3 | 3/0 | 3/0/0/0 | 0 | 8488 |
| compiler | C | 2/2 | 2/0 | 2/0/0/0 | 0 | 1137 |

| Negative control | Expected/executed | PASS/expectedFAIL/CANCEL/SKIP | Exit | Exact target | Elapsed ms |
| --- | --- | --- | --- | --- | --- |
| public-partial | 1/1 | 0/1/0/0 | 1 | true | 22085 |
| existing-ack | 1/1 | 0/1/0/0 | 1 | true | 28004 |

Both controls have TODO0, exact one matching name, actual exit1, targetMessage=true and accepted=true; unrelated guards remain. lint exactly7paths --max-warnings=0 exit0,2086ms. Positive matched-ACK denial at D11 and mutation counterexample are separately recorded. Matched foreign ACK fixture freezes SYN wall time only to make bytes/timestamp identical; original monotonic root/child limits still run, and the positive principal has no such mutation. These controls are supplementary causal regression evidence, not historical TDD RED.

Remaining concerns are disclosed: static/compositional callback-retry proof exception, post-implementation chronology for most negatives, inherited M1/M2 warnings and live-provider feasibility. Fresh independent Root review/acceptance remains pending. All operationalReadiness/completePackage/PCoff=false.

## Final artifacts, hashes and provenance

Artifact SHA256 values below are GitHub metadata/primary upload digests; no local ZIP download/extraction or rehash was performed. ZIPs retain exact spec+TAP, counts/name manifests, Source provenance, M/QA files/metafiles and content-addressed native-syn descriptors,7day retention.

| Run/job | Artifact ID / name | ZIP bytes | SHA256 | Expiry UTC |
| --- | --- | --- | --- | --- |
| 42236775067/127956321656 | 13514930019 / task3-A-d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 | 27779625 | 91fd1b47cf3eb55593f3d20482ce26e4279f500c4f187cafe3ef44243051e59d | 2026-11-13T14:58:36Z |
| 42236775067/127956322164 | 13513670609 / task3-C-d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 | 18162476 | 62261874fd5dfc92155fb6ea75e295704dba6c351a2c5cf06cd33e0753d9d2b6 | 2026-11-13T15:00:48Z |
| 42236775067/127956322176 | 13511838508 / task3-B-d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 | 27779351 | 03f46d3e978c50da7b0a02dcfbb25b34f4eb49bc1101266cdabe277980bb007b | 2026-11-13T14:57:50Z |
| 42240487416/127969155895 | 13515241913 / task3-completion-source-d11dff63-trigger-f29804abe54f1d618c859c2642b48f90b5677fb7 | 2425465 | 4af8719690f283e0c78b46cc0c44a56a341cca62a4128162aa5a7442c03e45dd | 2026-11-13T15:11:14Z |

SYN positive M1988061bytes/340inputs, SHA256c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32; resident gzip389502bytes/SHA2566fc1a66575d3e906707a03782ea40b6c9b8011d95ebc99974fbd04d15214ad12; programHashf6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6. Unmutated SYN initial-closed QA example from A/T2:2365243bytes/328inputs, SHA256a3787f276184f199166c754bc9fe629ed084a58b17674a51defe306797671c47; principal's actual compiled QA/metadata are retained in C's content-addressed artifact and its runtime checks, not attributed to this other fixture's bootstrap hash. Positive M remains exact in all labels.

| Separate negative QA label | QA bytes | QA SHA256 | M SHA256 |
| --- | --- | --- | --- |
| public-partial | 2365191 | 028d66e39df56d557cb2f96b5122b36eb1dc4c1624dfbc6cc2dd47b9b1141ca8 | c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32 |
| existing-ack | 2365307 | 05db012360e6c7a28d64f8188542d2ba62103ca2c5c596ebe1eb5fda376e7c72 | c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32 |

These exact negative-build literals were printed in the scoped completion primary log with testRevisionD11 and stored under output/t2-native-graphs/<QAsha>/native-syn.json; both carry completePackage=false/operationalReadiness=false. Negative ordinary-profile/spy artifacts remain separately labelled from unwrapped positive M.

Actual production staging compiler evidence at D11/tree4e30 (C positive pure/compiler tests, not SYN metadata literals): canaryLive1988061bytes/340inputs SHA256bbb4355253ecde12b2700815f596e2df974907b2d2160fa7d617951d15e0753f; qaLive2524211bytes/324inputs SHA256d91dae532d45f60b245f381cd686653a73b0a7634629f1da80b4f6be4fe5241a. Eligibility/completePackage remain false. SYN M/QA and actual Git-provenance staging bundles are distinct artefacts; do not transfer their hashes to later documentation HEAD or publication.


## Outcome and exact implementation

P8 delegates only fixed choice to P10. P9 permits GET/POST at its existing private seam; ordinary forms, private WeakMaps and consumption remain unchanged. P10 derives closed initial source lexically, runs real signed choice, consumes/adopts the SAME original request admission, writes factual enrollment with accepted P2, then fixed upload and activation with accepted P1, durable issue/ACK/sync/readback and final ConnectionReceipt. Actual native Promise/results stay distinct from journal facts; only recorded outcomes accepted. Partial facts are privately observed under exact whitelist/context/head; public effects without complete receipt deny. Enrollment-only remains factual closed_ui; fresh choice cannot resume it. Errors preserve history and remain pending without retry/compensation.

P10 captures original storage/actor/self/node/DB/KV objects and native method refs once before first IO, QA metadata object AND primitive id, reader/publisher/fetch/request headers/signal. Its guarded wait invokes a private thunk only after check(), then retains/awaits the real work and checks again. No new external API/callback/authority/source factory. New sessions/statements remain per-operation captured. Every full pair compares complete snapshots; expected changes are only own recorded enrollment/effects/receipt/physical results. Three native phases remain original <=5s children inside same <=30s request roots; receipt stays inside activation child. No sleep/retry/clock relaxation.

## Provenance, no seeds and transport normalization

SYN metadata revision is cccccccccccccccccccccccccccccccccccccccc, tree dddddddddddddddddddddddddddddddddddddddd; these are explicitly synthetic literals, NOT Git provenance. Actual checkout/test HEAD, source tree, exact7path blobs, compiler graphs and M/QA bytes/hashes are captured in Actions artifacts. Every native fixture builds from that checkout, produces NEW initial material/capsule via accepted upstream SOURCE actual work under fixed provider registry. Earlier history, provider metadata/control-plane/JWKS inputs, Access identities and private schema setup remain SYN. No seedPhaseFacts, seedFutureActivation, prefabricated connection ACK/receipt/phaseCurrent substitutes in principal. Positive M output bytes are unwrapped/exact; QA passive instrumentation and separately hashed negative spy/profile/mutants are labelled.

After connection POST actual work AND response settle, harness adopts actual registry upload/pointer and asserts same M bytes/config-only OAuth. Only THEN native instance-wide Miniflare upstream=exact AFW origin is enabled for downstream Host normalization. MCP callback uses native dispatchFetch preserving URL/options/body/signal; getWorker bypassed getUserRequest and was corrected. Pinned Miniflare5.20260831.0-alpha official source commit b7b4ff84477982e7c770bb93928287893fcf2e03: schema InstanceOptions upstream, root converter preservation, core upstream binding, entry.worker getUserRequest changes Host/path/query; proxy getWorker calls service binding directly. [Pinned native entry](https://github.com/cloudflare/workers-sdk/blob/b7b4ff84477982e7c770bb93928287893fcf2e03/packages/miniflare/src/workers/core/entry.worker.ts), [pinned converter](https://github.com/cloudflare/workers-sdk/blob/b7b4ff84477982e7c770bb93928287893fcf2e03/packages/miniflare/src/config/v4-convert.ts). Valid signed foreign URL-origin denies before QA on unnormalized entry, correct counterpart reaches QA, and again before upstream after config adoption. Genuine foreign Origin after upstream denies. This is transport normalization, NOT proof of arbitrary foreign URL-host preservation under upstream. No real AFW/Cloudflare traffic.

## Causal RED and chronology

- Genuine pre-producer RED: head1945fdccae8fa4f1a0a27f3d780d8be3c71c7b08, run42212217715/job127873373491; actual upstream/material and mounted M/QA, real signed choice503 expected200. Zero-match T4 file pseudo-pass excluded.
- Genuine pre-fix holder RED: heade08a45d1741cc475099c1b72c5afa11ccd93c4a3, run42224042528/job127912892925;5executed/5FAIL for post-upload DBwithSession/prepare/node/self/KV methods incorrectly completing200. Metadata.id RED headef3fa9b614f74b37ff67f6a7d424a8227607c0fb, run42225098696/job127916470844: HTTP503 already, but FIRST forbidden upload ACK actual1 expected0. No erasure to manufacture RED.
- Capture fix0526f12d94325676d53031f45b9c20c0aaa4a61b: run42225666752/headcd4d6c1/job12791839368214/14PASS; principal and12holder/time cases plus protocol. Deferred invocation at024a08ae6274eeb2a1ced141380f177aa33e0b41: run42229397747/head1cf62cdd/job12793107897013/14PASS; all post-upload next-native-read0. Source count list1 diagnosed as explicit later diagnostic RPC, not product continuation. Counter snapshots moved before diagnostic; run42231129828/headbf9268f/job1279369863252/2PASS for exact source-holder0 and six codec-valid targeted ticket negatives + valid same-ticket success. No zero guard weakened.
- Direct native readback8: run42229788438/head010c92e9/job1279324332498/8PASS, each32–34s; genuine native ACKs retained, next activation SEND/POST or receipt absent.
- Functional/correlator checkpoint run42218799447/head48c4efa6a4d4ea6b24c9550374f3692828b4bac1: unmutated job1278953814186/6PASS; negative-only job127895381000 has two expected1FAIL controls with exact target messages,0cancel/skip,commandExit1. Public-partial removes only its guard; own-ACK permits existing only, produces200/activation2 and fails exact refusal assertion. These are supplementary mutation controls, NOT historical TDD RED; positive exact unmutated. Mutant QA labels/hashes separated.

Process deviation: most adverse cases were added after initial implementation; do not describe that chronology as historical TDD. Genuine principal/holder REDs above and final same-code adverse results are the evidence. Earlier protocol logger duplicate-boundary JSONparse and ticket action-with-null-connectionRef were fixture defects, repaired to reach real validators with valid inputs, not product acceptance.

## Qualification revision — observation scope, not product clock

First complete gate run42232085255/headbbb09fca038c3ca09e8f02f07df558378b3fd843 FAILED globally: Ajob12794023733124/24PASS in840s; Cjob127940236986118/118PASS plus both expected-fail controls/lint in507s; Bjob12794023753125executed/23PASS/2FAIL,0cancel/skip in866s. All under15min, but NOT global acceptance. Bactivation-held/receipt-transaction-held failed because Node waitFirstState's30s observation started BEFORE signed GET, then incorrectly covered the distinct POST too. Example GET14:18:33.54→14:18:44.48(10.94s), observation teardown14:19:03.53 only19.05s into POST whose own original root still ran until~14:19:14.48. No child-clock rejection logged. The held target had not yet been observed; those failures did not test retention.

Only Node/test observations changed: timestamp actual POST dispatch as DATA, retain independent bounded GET/no-POST/failed-GET observation, then observe actual POST within its own existing30s window. No product grace/root/child/clock/check/retention change. Added sanitized state/position/frames on absent target. Raw replacement string accidentally interpreted dollar-apostrophe in qualifier: run42235027798/headf7949f035caa729478eb9694195c22229af47a2d had0jobs/0tests; no RED/GREEN credit. Corrected with replacement FUNCTION at534c4054e0bf350ba5f944097e53e6d0f04a65bd.

Focused actual observation fix: run42235354353/head534c4054/job1279513952072/2PASS. Explicit native live-entry facts then run42235796244/head4ddc7db7/job1279529300612/2PASS: activation-held POST entered19672ms after original start, before30000ms deadline; receipt-held20436ms before30000ms deadline. Both genuinely reached actual late target and passed distinct LIVE competing-root refusal + actual retained settlement,46.78/46.27s total fixture durations across separate original requests.

Cancellation is separate: original upload fetch admission is recorded before actual native invocation; held cancel start/settlement may occur after logical failure/abort/deadline and is never clipped. upload-read-held records original live read and later real read→cancel→settled; no later cleanup timestamp is required to be before an expired deadline. Physical drain is not inferred. Passive facts do not become product permission.

Root approved measured repartition: move principal64.16s A→C and both late-held cases B→C. Revised A23/B23/C14 native60; C retains scoped107 positive,2controls,lint. Measured first jobs A840/B866/C507 plus latest focused boundary costs yields conservative new estimates776/783/665s including setup, margins124/117/235s; no fit claim until terminal primary logs. Existing product blobsP8/P9/P10 unchanged; only F1/T3 observation fixtures changed. New final principal must start its own lineage under revised exact code. No writes during revised qualification gate.

First FAILED gate artifact metadata retained, not promoted:
- task3-C-bbb09fca038c3ca09e8f02f07df558378b3fd843: ID13510917143, ZIP15749703B, sha256:3afcf15ea83b6bfec65754bb9c8344dfcfac2ea9cb751ce1a18c921021095940, expires2026-11-13T14:22:27Z
- task3-B-bbb09fca038c3ca09e8f02f07df558378b3fd843: ID13510413505, ZIP30193009B, sha256:0f44d91c4a7d068bad810f6aa356b88a340caf0d2ec2bfaa0f6d8f636f263c78, expires2026-11-13T14:28:24Z
- task3-A-bbb09fca038c3ca09e8f02f07df558378b3fd843: ID13509388893, ZIP28989241B, sha256:3f1f77d549da6b8b2324bfe0b938781df66b2fb168a7e214db56e801fe4b32f9, expires2026-11-13T14:27:58Z

## Exact frozen qualification and expected costs

Max EXACTLY3 independent jobs, timeout15min each, Node22, npmci --ignore-scripts --no-audit --no-fund, contents:read, checkout persist-credentials:false, no secrets. Each Node test invocation emits spec AND TAP in one execution. Runner checks expected/executed/PASS/FAIL/CANCEL/SKIP/TODO, top-level names/subtest counts, actual process exit/signal; no tee masking. Native exact disjoint union60, no selected0/file pseudo-PASS. Full positive count167 =60native +34context +4GET +10POST +2SDK +1Link +46pure +5transport +3setup +2compiler. Two isolated mutants each1expectedFAIL; lint seven paths max-warnings0. Fine-grained t.test assertions are separately counted by TAP; variant loops are logged as variants, not falsely counted as Node subtests.


### Job A: 23 native cases, estimated 776s including setup, margin124s

- T2 closed mounted conduits cannot authorize business
- T3 enrollment unknown cannot upload: enrollment-transaction-lost
- T3 upload uncertainty cannot activate: upload-lost
- T3 upload uncertainty cannot activate: upload-oversize
- T3 activation uncertainty cannot finish: activation-lost
- T3 activation uncertainty cannot finish: activation-cached
- T3 final readback cannot turn uncertainty into success: receipt-transaction-lost
- T3 final readback cannot turn uncertainty into success: receipt-readback-lost
- T3 retained work blocks a different live root: upload-read-held
- T3 retained work blocks a different live root: upload-cancel-held
- T3 retained work blocks a different live root: source-sql-held
- T3 retained work blocks a different live root: enrollment-transaction-held
- T3 retained work blocks a different live root: upload-ack-held
- T3 resealed foreign publication is not own completion: upload context
- T3 resealed foreign publication is not own completion: activation context
- T3 resealed completed owner baseline physical and receipt facts remain correlated
- T3 original deadline and holder references remain original: upload-db-prepare-drift
- T3 original deadline and holder references remain original: upload-self-method-drift
- T3 original deadline and holder references remain original: upload-fetch-drift
- T3 original parent expires before first native IO
- T3 actual publication readback denies next effect: upload-pointer
- T3 actual publication readback denies next effect: activation-pointer
- T3 actual publication readback denies next effect: activation-config

### Job B: 23 native cases, estimated 783s including setup, margin117s

- T2 finite dispatch never falls through ordinary
- T3 upload uncertainty cannot activate: upload-send-transaction-lost
- T3 upload uncertainty cannot activate: upload-cached
- T3 activation uncertainty cannot finish: activation-malformed
- T3 final readback cannot turn uncertainty into success: receipt-sync-lost
- T3 final readback cannot turn uncertainty into success: final-pair-owner-drift
- T3 retained work blocks a different live root: upload-held
- T3 retained work blocks a different live root: enrollment-sync-held
- T3 resealed foreign publication is not own completion: upload ack
- T3 resealed foreign publication is not own completion: activation ack
- T3 identity and choice cannot mint admission
- T3 admission cannot cross lineage or resume
- T3 own completion requires genuinely recorded original ACK even when foreign bytes match
- T3 original deadline and holder references remain original: clock-backward
- T3 original deadline and holder references remain original: upload-metadata-id-drift
- T3 original deadline and holder references remain original: upload-db-method-drift
- T3 original deadline and holder references remain original: upload-kv-method-drift
- T3 original body retains real read and cancellation: overflow
- T3 fixed protocol and genuinely compiled foreign profile cannot mint choice
- T3 actual publication readback denies next effect: upload-config
- T3 actual publication readback denies next effect: activation-percentage
- T3 actual publication readback denies next effect: activation-version
- T3 actual publication readback denies next effect: activation-secret

### Job C: 14 native cases, estimated 665s including setup, margin235s

- T3 same initial bytes produce connection and downstream
- T3 enrollment unknown cannot upload: enrollment-sync-lost
- T3 upload uncertainty cannot activate: upload-malformed
- T3 retained work blocks a different live root: activation-held
- T3 retained work blocks a different live root: receipt-transaction-held
- T3 source and rollback must be recoverable
- T3 original deadline fences each native boundary: shorter signed Access before TicketUse
- T3 original deadline and holder references remain original: source-holder-drift
- T3 original deadline and holder references remain original: upload-holder-drift
- T3 original deadline and holder references remain original: activation-holder-drift
- T3 original deadline and holder references remain original: upload-node-method-drift
- T3 original deadline and holder references remain original: upload-credential-drift
- T3 original body retains real read and cancellation: read
- T3 actual publication readback denies next effect: upload-module

JobC additionally executes exact scoped manifests context34/GET4/POST10/SDK2/Link1/pure46/transport5/setup3/compiler2, two negative controls and lint7. Exact actual first-gate per-command counts/durations are retained in its artifacts; actual declared composite results are in the completed-gates table above; the full3job run remains cancelled. Node runner also prints only archived native-syn build metadata (purpose/mutation/testRevision/M/QA/compressed hashes/bytes) from content-addressed artifact directories inside these SAME3jobs, no extra job or body/token output.

## Per-variant evidence map

“Native” means fresh current Task3 producer lineage; “current unit/helper/T4” means final selected same-code composition with own SYN fixture (may seed historical facts); “reused” means immutable accepted protected evidence, not a new Task3 execution. Exact native names/assignments above; final runner artifact manifest holds all regression names. Seven blobs below fix tests/call sites. All declared result fields were read from primary terminal command logs; dynamic, reused and semantic-only evidence levels remain distinct.

### Dispatch M

Native T2 finite-dispatch test: wrong URL origin, method/query/hash, unsupported/revoke paths, absent QA binding, wrong actor/version/version-holder; genuine compiled ordinary profile in fixed-protocol test. Original flags deny OAuth/notice before QA. Principal valid signed wrong-URL counterfactual before normalization and again after config adoption. Assert ordinary SQL0/forwarding0/effects0; valid signed counterpart reaches QA.

### Dispatch QA

Native T2 fixed internal unknown targets plus fixed-protocol test: x-afw-finite-extra, duplicate version/request-id/original-method/boundary (five actual signed variants). All before factual IO/business rows/TicketUse/effects. Correct signed exact-five-protocol counterpart succeeds. Unrelated harmless header is ignored input, not protocol permission; no total HTTP whitelist.

### Identity and choice

Native identity case: bad signature, signed wrong issuer/audience/subject/expired-on-entry; POST foreign Origin, repeated/malformed cookie list, handle/projectRef mismatch, deny decision, extra/duplicate keys, bad escape, >1024 and invalid UTF8. No TicketUse/effects; valid same ticket then completes. Native source case changes actual DBowner/revision; shorter-current signed Access crosses retained factual boundary before TicketUse and denies401. Principal valid shorter JWT succeeds with narrowed pre/approval times.

### Ticket and snapshot

Native identity case uses actual GET ticket; action (with codec-required foreign connectionRef), preconnection, sourceRevision, subject/realm hash, ProjectRef.projectId, snapshot.source.project.revision. All roundtrip real codecs; exact ticket-map/source-snapshot correlator labels observed; TicketUse0/approval0/effects0 before restoring only SYN negative row. Consumed replay/new root/actual actor restart preserves rows and has no next POST. Completed correlation case separately covers owner/source/preconnection.

### Source and configuration

Native source case: actual Mmodule/Accessconfig and QAmodule/namespace/SDKalias/extra binding; extra candidate binding, monitoring/events flags, nonempty policy, physical namespace, limiter, secret metadata value; actual owner/revision. No TicketUse/SEND. Principal same compiled module and all configuration fields identical except OAuthfalse→true. Source/helper fact checks always precede engine creation and SEND.

### Backup

Native source case removes original backup/receipt/chunk and tampers chunk: zero SEND, then restores SYN rows. Current T4 exact ten retained-backup tests: missing-backup/receipt/chunk; tamper-backup/receipt/chunk; mismatch-receipt-material/manifest/baseline; mismatch-chunk-manifest. Observer facts() reconstructs bytes/hash/chunks, exact retainedIds, manifest, receipt, baseline metadata on every full pair, before new handler clean()/recheckOwned()/engine upload. No latest fallback. Finer unchanged helper evidence is compositional, not a separate new publication.

### Enrollment

Native lost enrollment transaction/sync preserve committed enrollment and no upload; factual public closed_ui but genuinely fresh signed choice denies. Native retained transaction/sync cases preserve scope. Current pure exact T1 chronology/native legacy pending, double-enrollment/ack-first/double-ack/unknown-enrollment/unknown-ack/holder-drift/deadline. New P10 unconditionally awaits fixed prepare helper in ONE child with exact ctx/env/id/admissionHash/ownerSource/baseline/defensive resident bytes; rechecks before/after prepare, recordEnrollment, recordAck; updates only own observed records. Protected helper transaction/anchor/alarm/foreign-effect details are reused via exact accepted evidence in the callback verification exception below; callback retry itself is semantic/compositional, not dynamically injected.

### Admission

Native lost-upload replay/new live root and actual actor restart keep consumed rows and cannot duplicate effects; principal actual POST only. Structural composition: P9 unmodified private WeakMaps and consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:id,stage:'connection'}, SAME originalLease) precedes adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease}) and every enrollment/SEND. No DTO/imported admission/second context is accepted by receiver or lexical readChoice. Exact unchanged admission tests original/wrong/finished request lease identified at BASE test blob2dc6d61f2ff35ddb4d075b573e492cd8b740d579; not separately rerun in final gate.

### Upload SEND/result

Native upload-send-transaction-lost: no HTTP upload; upload-lost/malformed/cached/oversize deny ACK/activation. Matched foreign ACK reaches real journal existing result and own coordinator requires recorded; foreign ACK/context cases roundtrip codec and journal before original held response released. No persisted fact replaces actualUploadPromise/result. Fixed engine current guards + exact descriptions/secret baseline inheritance in pure suite; retained read/cancel and original deadlines below.

### Upload readback

DIRECT native upload-module/upload-config/upload-pointer inject valid-envelope READ corruption only AFTER actual connection upload. Actual response hit required; native ACK preserved1, activation SEND/POST0, receipt0. P10 awaits engine.readVersion(candidate), readPointer(baseline), then full recheck inside SAME upload child before later activation child. New producer-order proof, not helper inference.

### Activation SEND/result

Native resealed foreign upload/activation ACK/context and matched existing ACK plus unknown upload prevent next activation. Activation-lost/malformed/cached/held preserve native facts without fabricated receipt; real activation result strategy/versions/new UUID required before its ACK. Native holder and full snapshot comparisons preserve context/baseline. P10 issue→sync→readback→recheck precedes actual Promise; all must be recorded, no recovery.

### Activation readback

DIRECT native activation-pointer/percentage/version/config/secret valid-envelope READ corruption only after actual activation. Actual response hit required, upload+activation native ACKs preserved2, receipt0, no compensation. P10 awaits exact pointer+candidate version/config then constructs/records receipt in SAME activation child.

### Receipt/correlations

Native receipt transaction/sync/readback lost and final owner drift deny200 while durable facts remain; no compensation. Completed native valid-codec/both-journal series: owner/source/context/baseline/preconnection/module/configuration/version/deployment/writer-head/receipt-links/receipt-time (12), exact relevant correlator or installed-stage frame, no next POST, restore only negative rows and preserve baseline history. Current T4 six actual current observation-two drifts owner/revision/config/pointer/grant/schema preserve durable history.

### Time/holders/body

Native clock-backward; original source metadata-holder, post-upload QAobject/primitiveid, DBwithSession/prepare,node,self,KV,fetch,readercredential,activation metadata-holder. All actual original boundary reached; first forbidden ACK absent, next activation SEND/POST0, next native factual reads0. Counter snapshot BEFORE explicit diagnostic RPC; diagnostic storage.list not counted as business IO. Original expired request no provider IO; real body overflow/read cancellation held until actual settlement. Current T4 historical-deadline factual success avoids treating completed history as new permission.

### Pending/retention

Nine native actual-held variants upload/activation fetch, upload read/cancel, source SQL, enrollment transaction/sync, upload ACK, receipt transaction. Second root is independently created and LIVE; scope refuses while actual work retained; original source reader unavailable; DATA release controls original captured invocation under its original deadline; read→real cancel→settlement demonstrated. Durable unknown rows remain. Neither HTTP completion nor abort is physical drain.

### History/downstream

Principal no seeds: actual upstream initial→signed GET/form/cookie→POST→native receipt→QA authorize/code→Mtoken→MCP/D04 actual grant timestamp→native notice GET/POST/NoticeLink. Initial CLOSED rejects OAuth/notice; new config retains monitoringfalse/policyempty but fixed QA notice works. Foreign/preexisting grants/monitoring rows + I0/C0/C1/alarm retained. Focal GET4/POST10/SDK2/Link1 are selected exact names, existing semantics unchanged.

### Graph/extraction

Current full pure46 includes exact compiler graph assertions initial M contains fixed dispatch, M excludes QA candidate decoder/bootstrap, QAdescriptor residency; fixed engine wire and one-shot helper chronology. Transport5 +setup3 preserve old pending and actual two-effect ACK behavior; compiler2 source class/hash/missing factory; lint7paths with max-warnings0. No standard/full SDK corpus, no fourth hidden job.

### Explicit callback-retry verification exception (Root ruling)

No literal native transaction callback-retry injection was found in this Task3 gate or the historical accepted suites. This row has SEMANTIC/COMPOSITIONAL proof, not dynamic PASS. At tested HEAD d11dff63b0d693b89ac6ef8d6ec6c60ca01af751, unchanged helper blob6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9 [append lines53–56](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d11dff63b0d693b89ac6ef8d6ec6c60ca01af751/lib/mcp-qa-finite-preparation-enrollment-writer.mjs#L53) initializes private entered once OUTSIDE the native transaction callback; checks and sets it synchronously before its first await. A second callback calls fail(), setting failed before throwing (lines22–23), and every subsequent check is absorbing (line32). Transaction result must be exactly true, then original sync/readback/alarm (lines70–72); recordEnrollment/recordAck catch set failed (90/99). Native APIs are assumed to settle the transaction Promise only after their callbacks and to propagate/represent rollback/failure according to their documented native contract; this proof does not independently inject native retry/rollback behavior.

P10 blob e482ad1617adc001c3a32c94e71eeb41d27f3d1d [598–602](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d11dff63b0d693b89ac6ef8d6ec6c60ca01af751/lib/mcp-qa-finite-owner-phase-context.mjs#L598) unconditionally awaits exact helper preparation→own enrollment→full recheck→own ACK→full recheck in one original child; only afterwards may upload SEND issue/sync/readback/recheck607–609 and actual native Promise610 begin. No caught helper failure can reach those effects. This is the producer-side composition.

Reused dynamic integration evidence: [accepted enrollment receipt](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ffe25a1e77a1d93d5c03018ada36355b19c91564/docs/superpowers/reports/2026-11-04-preparation-cleanup-enrollment.md), reportblob04a7c661f8fd91263e52060020cd0deab97b3c24/review8143c410374e51dc55f321a4714f7674cfd838ec. Behavior45c0b08f530fdad73e5f8973b3878f279add9a96/run41903117759/job12683052049436PASS;98c02877f7f6f9df956f03a6d3f017e9d60ec4a0/run41900952944/job12682289781032new+99affectedPASS. Unchanged testblobd7dc91d1cf899e51d8f6e83ddd1bce23587d23d7 names: native [throw-enrollment,throw-ack,sync-reject,readback-lost,alarm-lost,ack-readback-lost,ack-sync-reject,ack-alarm-lost] is pending,immutable and never an owner forward; actual [hold-enrollment,hold-ack,sync-hold,readback-hold] after native commit stays in original scope until external release; factual [orphan,hash,unknown,head,policy,permission,foreign] obligation refuses restoration and all forwards; genuine original owner decision refuses [source-drift,holder-drift,qa-drift,clock-backward,clock-forward,clone-admission,wrong-stage] without any cleanup DATA or forward. These test the preserved native-failure/exclusion integration, not callback retry itself.

[Task1 extraction acceptance](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ffe25a1e77a1d93d5c03018ada36355b19c91564/docs/superpowers/reviews/2026-11-05-finite-native-first-connection-publication-task1.es.md) reviewblob5f1f77b24c1a8ac828f2345fe24a4a5d099f0dd5/report9f71c6acd260a36774fee7b7f05902a3cdc524dd: unchanged P2 exact; run42131020681/head22ce84052756936d612b046a84b6500f5773937d/job12760734651527PASS. Exact T1 native old/component append→transaction settled→sync→get→alarm→cleanup→Ack chronology and one-shot method tests run again in final current pure suite. Current native enrollment lost transaction/sync + held work independently cover new producer no-upload order.

Cost if this exception is wrong: automatic native callback/rollback behavior has not been directly injected; fresh reviewer must see and may challenge this verification exception. It is NOT silently counted as a61st native case or dynamic coverage. Root explicitly accepted this level while keeping frozen60 and3jobs; no Source edit/job/check/clock change was made to manufacture a PASS.


## Clarifications, metrics and operational limits

Finite extra/duplicate protocol headers preserve accepted P6 exact x-afw-finite-* five and P7 forwarding whitelist; no reject-every-HTTP-header policy. Cost if this interpretation were wrong: stronger transport policy requires explicit native automatic-header design, not a silent new P8 wire contract. Access menor uses valid-on-entry signed identity crossing expiry before TicketUse; valid shorter JWT is allowed and narrows ceilings. Expired-on-entry alone is separate. If expiry occurs after TicketUse preserve durable facts and deny next effect; no minimum lifetime denial or reused consumed history as causal Access test. Cost of opposite interpretation would be denying valid shorter identities/refreshing permission, contrary to original min-ceiling contract.

### Final D11 synthetic native-lab measurements

Principal67,583.677ms aggregate across separate incoming requests; two receiving QA root boundary windows30000/30000ms; upload/activation SEND remaining windows4644/4642ms; receiptInsideActivation=true.69complete pairs292–1242ms. Pre-reload first-connection instrumentation (including explicit fixture factual/probe reads, not whole-flow SQL/DO totals):10327get(including transaction reads),1255list,55transaction,7sync,558first-primary,555SQL. No resource/check/clock optimizer was introduced.

| Captured actual HTTP | Requests | Received bytes | Reads | Cancel calls/settled |
| --- | --- | --- | --- | --- |
| observer GET | 836 | 823,391,326 | 202586 | 836/836 |
| engine GET | 9 | 10,409,327 | 2559 | 9/9 |
| engine POST | 2 | 302 | 4 | 2/2 |

Actual reads/cancellations on success settled before reload; logical failure/abort is never physical drain. Held original business admission timestamps are separate from late retained cancellation. Late POST activation/receipt targets are admitted within their own live original30s request; observation timer does not merge GET+POST roots. No clipping of cleanup to expired clocks.

Request snapshot BEFORE the final signed unsupported fresh-choice negative:1754 =16GitHub+1736Cloudflare+2AccessJWKS. Business CF phases initial63;choiceGET288/POST559(847connection-form/publication);authorizeGET280/POST336;noticeGET84/POST98; explicit factual verification probes14+14. Actual MCP library path itself adds no CF provider reads in this measured flow; the explicit post-exchange verification14 is labelled separately.

Response aggregation is taken AFTER that late denied signed choice, so1768response observations include its additional14CF factual reads (no next effect). It is a DIFFERENT measurement scope, not duplicated responses. Full response JSON payload total1,877,366,582bytes; headers/compression/network charges/peakCPU/RAM are not measured. These are synthetic native-lab received bytes, not real Cloudflare transfer cost, quota or latency proof.

| Host | Response observations | JSON payload bytes |
| --- | --- | --- |
| api.github.com | 16 | 10,028 |
| api.cloudflare.com | 1750 | 1,877,355,712 |
| synthetic-team.cloudflareaccess.com | 2 | 842 |

| Phase · host | Response observations | JSON payload bytes |
| --- | --- | --- |
| initial-upstream · api.github.com | 16 | 10,028 |
| initial-upstream · api.cloudflare.com | 63 | 27,541,517 |
| GET /connections/finite-prepare · api.cloudflare.com | 302 | 295,945,410 |
| GET /connections/finite-prepare · synthetic-team.cloudflareaccess.com | 1 | 421 |
| POST /connections/finite-prepare · api.cloudflare.com | 559 | 554,789,099 |
| verification context after connection · api.cloudflare.com | 14 | 16,933,554 |
| GET /authorize · api.cloudflare.com | 280 | 338,671,080 |
| GET /authorize · synthetic-team.cloudflareaccess.com | 1 | 421 |
| POST /authorize · api.cloudflare.com | 336 | 406,405,296 |
| verification context after exchange · api.cloudflare.com | 14 | 16,933,554 |
| GET /monitoring · api.cloudflare.com | 84 | 101,601,324 |
| POST /monitoring/grant · api.cloudflare.com | 98 | 118,534,878 |

| Fixed host/method/path bucket (version IDs grouped) | Responses | JSON payload bytes |
| --- | --- | --- |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions/:id | 401 | 1,062,437,552 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-independent-closure-qa/versions/:id | 258 | 814,679,892 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/tokens/verify | 532 | 89,908 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments | 269 | 77,402 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-independent-closure-qa/deployments | 263 | 58,649 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/versions | 1 | 6,005 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/contents/.github/workflows/afw-finite-qa-bootstrap.yml | 1 | 2,624 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/contents/scripts/run-qa-finite-bootstrap.mjs | 1 | 1,894 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/tags/ffffffffffffffffffffffffffffffffffffffff | 1 | 1,874 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/issues/comments/9001 | 4 | 1,536 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows | 2 | 1,332 |
| synthetic-team.cloudflareaccess.com GET /cdn-cgi/access/certs | 2 | 842 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-release-operator/versions/:id | 1 | 760 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/actions/runs/456 | 1 | 644 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap/instances | 2 | 600 |
| api.cloudflare.com POST /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments | 2 | 539 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-confirmation | 2 | 476 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap | 2 | 454 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04 | 1 | 443 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-release-administrative | 2 | 438 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/actions/runs/456/attempts/1/jobs | 1 | 429 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/issues/comments/123 | 1 | 316 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/ref/heads/main | 3 | 303 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/ref/tags/afw-finite-bootstrap/11111111-1111-4111-8111-111111111111 | 2 | 300 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-release-administrative/instances | 2 | 272 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-confirmation/instances | 2 | 272 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-release-operator/deployments | 1 | 223 |
| api.cloudflare.com POST /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions | 2 | 194 |
| api.github.com GET /repos/tokenizartinfo-ops/agent-friendly-web/git/commits/cccccccccccccccccccccccccccccccccccccccc | 1 | 108 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/containers/applications/d6fc71552de7494a863aca20365a572d/instances-v2 | 1 | 85 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/schedules | 1 | 54 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/tails | 1 | 54 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-release-operator/schedules | 1 | 54 |
| api.cloudflare.com GET /client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-release-operator/tails | 1 | 54 |

Two immutable-version/module response buckets (M401responses/1,062,437,552bytes and QA258/814,679,892) account for1,877,117,444bytes; mutable pointer/token/workflow facts remain distinct. Full exact endpoint×phase map is in the principal primary JSON and artifacts. This quantifies repeated large reads for later design; it does not authorize changing the accepted checks or clocks.

[Root conditional live-feasibility review](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/6fc3bac5e79ccb399935836370e3cb60edb2e0f2/docs/superpowers/reviews/2026-11-06-native-provider-feasibility.es.md) and [Cloudflare default API limits](https://developers.cloudflare.com/fundamentals/api/reference/limits/): default1200requests/5min per user/account token,cumulative user quota; actual Ratelimit/Ratelimit-Policy headers matter. Request snapshot1736CF/full response observations1750CF within~67.6s SYN COULD exceed default IF same quota bucket; conditional inference, not observed429/account quota or actual rate-limit fit. Live feasibility gate before operational promotion. No quota/plan/credential/check/clock change, retry/sleep or subscription authorized.

All operationalReadiness=false,completePackage=false,PCoff=false. C0=I0+900000,C1=C0+180000; original Nov3 ceiling remains EXPIRED. No main/merge/deploy/provider/auth/OTP/Max/browser/real account/owner data. No actualCloudSourceProof, rollback operational compatibility, hosting/delivery/subscription/guard or PC-off claim. M1 sdkReadCurrent old fixture cause remains UNKNOWN; M2 RPC/toolchain/disposal warnings unowned and not incidentally upgraded. FirstConnectionTicketFault's initial invalid action/nullref hit existing Miniflare RPC error handling; repaired valid codec, no general M2 fix claimed.

## Scope, blobs and rollback

BASE→final-code compare exactly7allowed code/test paths plus report/progress, no qualifier at checkpoint, no protected changes. Accepted fixed-engine P1e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb and enrollment P26eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9, schemas/store/journals/SDK/ordinary/source/bootstrap/initial material optimization remain unchanged by complete diff. Seven frozen blobs:

| Path | Blob |
| --- | --- |
| lib/mcp-qa-finite-owner-native-receiver.mjs | e760b3579a38f1dbb73b177bb73b06d814eb881f |
| lib/mcp-qa-finite-owner-preparation.mjs | 152e730f83af7ef063b6b1db89f8b0a779c2b60e |
| lib/mcp-qa-finite-owner-phase-context.mjs | e482ad1617adc001c3a32c94e71eeb41d27f3d1d |
| test/mcp-qa-finite-first-connection-publication-native.test.mjs | bc9f717d79e6e1ad60a40f358351093371331bee |
| test/fixtures/finite-first-connection-publication.mjs | 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48 |
| test/fixtures/finite-initial-entry-world.mjs | 297b57846bbbe13bfc80ac52c5b033a382aef4b6 |
| test/mcp-qa-finite-owner-phase-context-native.test.mjs | be1ff27807934797f371ea703cd9a2c6f7f3675a |

Rollback only own Source commits via explicit branch/fileSHA CAS; accepted BASE preserved. No runtime rollback/compensation or historical-row deletion. Every write verified commit single parent, exactly intended path, ref and blob readback. Sequential parent log below includes the completed scoped qualifier removal. The final two report/progress commits are documentation-only and verified/read back separately; final HEAD is delivered in handoff rather than made self-referential in this file.

## Final scope/readback and verification exceptions

Complete BASE and D11/qualifier-free trees were read without truncation. BASE→qualifier-free code checkpoint has exactly7allowed product/test paths plus this report and existing progress; temporary qualifier absent. All7blobs match D11 exactly; every other source/test/helper/schema/store/journal/SDK/profile/build/bootstrap/initial-material path remains BASE-identical. Final report/progress may change Git tree/provenance but not those source bytes; do not reuse D11 compiled hashes as a later checkout's publication bundle.

Protected exact pairs include P1e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb,P26eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9, anchors00f743593d7670e9cb358c8512a25367d29cd6ed, stage-worka89baeb2578856dadedf700f9d66e180eb09120e, cleanup e9999c6ea5d086599844f86120cb0e3449f5d636, transportfa1cb012d65acc0457f7263d01bb5fd88a0cb8a6, journal6e3de33d04075740fb57e5f9afcf87dd9f68ee79, store122bc0e52870c71da7ae98ef73cd7762171d89ca, recordse9b66f68b6dbabbfecc46072949a0d5d9f059141, compilere8a73ce9f541993657bf8bf4c9bd8d3b02b8598d, Mentry15441b6c0c779f733db65a3b59a3a9e1738d19dc, QAentry1f1e5b95776b189fc8d952930467e6ff99c233c3. The global complete-tree diff covers all other protected files too.

Verification exceptions are explicit: (1) callback retry is semantic/compositional proof with stated native transaction assumptions, not a dynamically injected PASS; (2) most negatives followed initial implementation; (3) full run42232085255 FAILED and full run42236775067 CANCELLED remain so, with scoped completion42240487416 at exact D11 closing only remaining controls/lint under Root's approved composite plan; (4) inherited RPC/toolchain warnings and M1unknown remain; (5) synthetic response/fanout measurements expose a live-feasibility/promotion gate. No requested Source implementation/matrix item is silently omitted or counted as selected0/pseudoPASS.

Process note: an initial qualifier-removal call omitted the deletion selector and was rejected by connector schema for null content. Explicit ref readback remainedf29804ab; the correct explicit delete then produced5e28e70b and qualifier absence. No unknown mutation, retry of an uncertain write or content overwrite occurred. Generated replacements use functions after the separately logged0job quoting mistake.

No further source validation is needed absent a new change or review finding. No local clone/dependency/build/test/artifact download or persistent process was used. Final report/progress readback and handoff conclude implementer Source ownership; no Source writes after that handoff.

## Sequential verified writes

ffe25a1e77a1d93d5c03018ada36355b19c91564 → b0952eab3442cea9b481e33ad11e71f3363ec90c; tree c86e9cc914455381c43d3635da7b5297d514ebc6; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 1b4c1ec4a534842d153473e9c0541963ab2beab0; test: require native first connection from original signed choice

b0952eab3442cea9b481e33ad11e71f3363ec90c → 1945fdccae8fa4f1a0a27f3d780d8be3c71c7b08; tree 94451d3181eee99ffeda1762448a578f31dc99ba; .github/workflows/afw-first-connection-qualification.yml; blob 33cace686f82c8b28eb9c8a085e999954d48e33b; ci: run bounded native first connection causal RED

1945fdccae8fa4f1a0a27f3d780d8be3c71c7b08 → e8df40b6a34898034589599d157e4f64970106d7; tree c86e9cc914455381c43d3635da7b5297d514ebc6; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before connection implementation batch

e8df40b6a34898034589599d157e4f64970106d7 → a406d07d59cf984aec5237d65a4071c7031ba575; tree cca0826e69d5635551a114651d573285adfc5c3d; lib/mcp-qa-finite-owner-native-receiver.mjs; blob e760b3579a38f1dbb73b177bb73b06d814eb881f; feat: route fixed choice receiver to native connection continuation

a406d07d59cf984aec5237d65a4071c7031ba575 → 0b35e614739fe2cfc191275e77bb474d525171eb; tree fcf1c6079e5ca3ff83fedb5d8f13993e4269afd8; lib/mcp-qa-finite-owner-preparation.mjs; blob 152e730f83af7ef063b6b1db89f8b0a779c2b60e; feat: admit original owner POST through fixed factual choice seam

0b35e614739fe2cfc191275e77bb474d525171eb → f5e66b8fca1b2cf218f5cbb42261087ebb804c75; tree 9e383b042e2621f7a3ec0b05d90341d0e14ab60f; lib/mcp-qa-finite-owner-phase-context.mjs; blob dfbc9b89cffcaa0eccd461277dbbef91d4a3646b; feat: produce native first connection from original owner approval

f5e66b8fca1b2cf218f5cbb42261087ebb804c75 → bdd6f9ef66cf30344c04fb01cd923062ad9e1607; tree 9f3d9e9d3e234395c494df18cd9a91cdeb91fbd4; test/fixtures/finite-initial-entry-world.mjs; blob a0e437efcc10b677ee40ebe65ae0b62a640f9ea9; test: retain actual SYN uploaded versions and activation pointer for connection

bdd6f9ef66cf30344c04fb01cd923062ad9e1607 → 12269f51c4ed56a1f6ff0f14fb1afd706a2e3311; tree d837aee331c5b4cd6738f61f7daceae394cd339c; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: measure original native connection continuation

12269f51c4ed56a1f6ff0f14fb1afd706a2e3311 → 0a04af1f0ad3053376d771b741bd7295a6aebb1d; tree 9f3d9e9d3e234395c494df18cd9a91cdeb91fbd4; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier for causal connection diagnostics

0a04af1f0ad3053376d771b741bd7295a6aebb1d → 1ebdd8d37bbfcc79185d493234455c9753c94584; tree 460ca83d41c799abed99e00146af190ac9b67355; test/fixtures/finite-first-connection-publication.mjs; blob b77fd427e647d69e40a0a033266a51b502503d2d; test: observe original connection clock failures without replacing native work

1ebdd8d37bbfcc79185d493234455c9753c94584 → 898d8c4d6ead67a734c11d6452eee281bd8389c7; tree e436a039b2fd9a9cd29b59ae1163745bb6a5d6b8; test/fixtures/finite-initial-entry-world.mjs; blob 2d2c08cf0a0aa1b5a6bfcae59004d7f5ff492b3e; test: capture passive connection SOURCE frames and complete pair timings

898d8c4d6ead67a734c11d6452eee281bd8389c7 → baf349b8c309e8a423fd2fc1ff7ec2aef864256d; tree 5487e2aae88822f40b43d95fea6cc85797be93b5; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: diagnose measured original connection failure

baf349b8c309e8a423fd2fc1ff7ec2aef864256d → c4db57a1866d1c72fe9d84e4abb75ebb9b3cab65; tree e436a039b2fd9a9cd29b59ae1163745bb6a5d6b8; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before downstream test composition

c4db57a1866d1c72fe9d84e4abb75ebb9b3cab65 → 172243a58648337fa13755f008c5aac107e8edfe; tree 5b8f28d675749016e063245e71a0711a0916f335; test/fixtures/finite-first-connection-publication.mjs; blob 163e228e4ae2888903bcf51daa07eb6b63df62ba; test: expose only factual context and retain real choice cookie for downstream

172243a58648337fa13755f008c5aac107e8edfe → 4e15b6e8b60774133689890f93c7baa0fdbc98c3; tree 020c088a03ab625e4d773c5889297937ba0a2006; test/fixtures/finite-initial-entry-world.mjs; blob bfa2464e5558301787846ca521c8e944faa2db34; test: adopt actual connection config only after original POST settles

4e15b6e8b60774133689890f93c7baa0fdbc98c3 → 8d349ba0a1c21e2a3e56e5660d4234d9eee822da; tree 9e42140d1f17c9915c18432d87fc047b14ff0856; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 7f1d284625f687dc5b8fa45980e3e2ee52156ce3; test: require actual connection predecessor through OAuth MCP D04 and NoticeLink

8d349ba0a1c21e2a3e56e5660d4234d9eee822da → 8bfa84f7161ca61da2d99e71fd28aaa8d16d75c9; tree 402ece9bcadb8a5758ae5a5e7f78a3c1f037e18c; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: inspect native POST failure and downstream composition

8bfa84f7161ca61da2d99e71fd28aaa8d16d75c9 → 00feb6cd482a347e1f08359a995babf57314481c; tree 9e42140d1f17c9915c18432d87fc047b14ff0856; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before receipt codec fix

00feb6cd482a347e1f08359a995babf57314481c → 46bd8c345d93d7e8ce692dbb7d97b778f2cdc255; tree 0ef88442edd17ac752919c1796bbd4205e96e99f; lib/mcp-qa-finite-owner-phase-context.mjs; blob c2439157e6ce57dd750ab71a226152462aac34d8; fix: seal native receipt with existing installed record purpose

46bd8c345d93d7e8ce692dbb7d97b778f2cdc255 → b1fc844a6e23b8bb8dfe8ce645447c6f2695b170; tree c0d5d1f70ae328719b12457b710e9bcd3901cedb; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: verify installed receipt codec and actual downstream

b1fc844a6e23b8bb8dfe8ce645447c6f2695b170 → e347e49b5ffd703f955171739d8817fe4780054a; tree 0ef88442edd17ac752919c1796bbd4205e96e99f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before native mount assertion fix

e347e49b5ffd703f955171739d8817fe4780054a → aee9715716f77dbb7ed5eaefcd7066758e7d5424; tree 17194df3ffbaf75c44b6a857dddcc87e8affbe2f; test/fixtures/finite-initial-entry-world.mjs; blob 91256921823dd9783a6c6c22e44699e7c9c1ebeb; test: verify native M script input before Miniflare module conversion

aee9715716f77dbb7ed5eaefcd7066758e7d5424 → 055e205d4fbb33cdab5a01258a86d86406ef2918; tree 98b13b76bd30277f436e0200a5a572c34d1597ae; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: follow actual native connection into downstream

055e205d4fbb33cdab5a01258a86d86406ef2918 → d0542a904d58b378cd0c75195dd4275631a9341f; tree 17194df3ffbaf75c44b6a857dddcc87e8affbe2f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before causal negative test batch

d0542a904d58b378cd0c75195dd4275631a9341f → 7f8a984534a2f6ebb63241764966072a55456288; tree 7f747df11d0b1f2cb84363bca198aa286325f1f2; test/fixtures/finite-first-connection-publication.mjs; blob 585beec42d6cb1fadb41b2f1a247eebe6ac80461; test: control actual retained native uncertainty without approval probes

7f8a984534a2f6ebb63241764966072a55456288 → d5d484d1959420a1ac78c3e1299c0e8feccc22c7; tree 6401408c18aecc2a0ad5ec48117fb935b0e9cf9f; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob ce25ee42c6a29ec28bbcc9f834be1d8dc60c45ce; test: cover native own continuity unknown results and retained settlement

d5d484d1959420a1ac78c3e1299c0e8feccc22c7 → 866bf199531e4691f0e5311d4a6913eecb7ad6b9; tree a9a82d832dd148c76f03fe7109bdda36ff73aca0; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: verify exact M native service-binding downstream

866bf199531e4691f0e5311d4a6913eecb7ad6b9 → c8a78a1f9527e4472e197fc6f7d56f542471f5da; tree 6401408c18aecc2a0ad5ec48117fb935b0e9cf9f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before bounded negative and regression batch

c8a78a1f9527e4472e197fc6f7d56f542471f5da → 11569fcdeeb9bb24a5d763887a9f92e140dc1ba4; tree 6f2815f5d6aeec65653c8f3dba0d2649d16e8058; test/fixtures/finite-first-connection-publication.mjs; blob 02865f4aa1042ed220ed4ef213d1f86e3252760d; test: release retained work only through original invocation DATA controls

11569fcdeeb9bb24a5d763887a9f92e140dc1ba4 → df2aade5481f140205486e67f4a0c17ace671f93; tree 052e291702a635ad0f92df570dac60a47ebdd2bb; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob dfff674a5d3403192a2e6302394f6fc0eb9537f3; test: measure exact connection native IO and original effect clocks

df2aade5481f140205486e67f4a0c17ace671f93 → bac53943c11efb3c9517e998afeb3f5af19cd47e; tree aa5d2004f45e1751fb730197e8b000abf40642b9; .github/workflows/afw-first-connection-qualification.yml; blob ae354ff4b709c7b5f2f99126e28d8e17c9af3017; ci: qualify native causal negatives and bounded accepted consumers

bac53943c11efb3c9517e998afeb3f5af19cd47e → a0617b8f6aea6ed347cd0fd208c5775d42c03fa3; tree 052e291702a635ad0f92df570dac60a47ebdd2bb; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before pinned native upstream principal

a0617b8f6aea6ed347cd0fd208c5775d42c03fa3 → 671e907b1cbad4397adfb6978678375da8a19ad3; tree 9c6cd82c2e4d0c47ac0f4edc7672d7b56422208a; test/fixtures/finite-first-connection-publication.mjs; blob 4469d6e3f2ebc5c09dff71f722a163e30d7abe67; test: preserve exact signed choice identity for causal origin counterpart

671e907b1cbad4397adfb6978678375da8a19ad3 → 8bfdc1c68f818cef2d7e605a1d6f14ccb5901143; tree 0b0be131dcc714dcaa83d1063c486a51c2d81447; test/fixtures/finite-initial-entry-world.mjs; blob 95ea1ca26a9f4516205198c05fd6c41aec839960; test: normalize downstream Host through pinned native instance upstream only

8bfdc1c68f818cef2d7e605a1d6f14ccb5901143 → e866bd5969efc8760f9b3ed2dd8b6ac923b665f9; tree 0fd850832693613d120f89142a29ead9a00dea71; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob bb0e2908662c3d1de715092db9b22cb2d3e50818; test: prove signed wrong URL and foreign Origin at native normalization boundary

e866bd5969efc8760f9b3ed2dd8b6ac923b665f9 → fa45d1556fb7914e6f6e73ce718c9c6dbe0632f2; tree 443fe18de3d14c3edc6d209390e8009eaeb27f6e; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob f470c94231827f244e34a5abec61d0fc126d953c; docs: preserve Task3 causal checkpoint and current native harness discrepancy

fa45d1556fb7914e6f6e73ce718c9c6dbe0632f2 → ea759c689070d878d357c42a87a9cf5d5dccae7a; tree d2f7c636c71a9df729b1110bcbc33323e015ec02; .github/workflows/afw-first-connection-qualification.yml; blob d865688f7ccb0ca2abae3c632c23d42b2d55a18f; ci: verify pinned native upstream with exact initial M bytes

ea759c689070d878d357c42a87a9cf5d5dccae7a → 30276fb216311a0063af521f1a6fe54d1692cde2; tree 443fe18de3d14c3edc6d209390e8009eaeb27f6e; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before current-history and identity causal batch

30276fb216311a0063af521f1a6fe54d1692cde2 → 21ba7bf6a55dc7ba8b07a4a78d50e5911f609fcb; tree 7143b85cd51b1d48b27f767b8cd483851d5405e6; lib/mcp-qa-finite-owner-phase-context.mjs; blob 382c6a36e9d17b7eb3952b97f9f277be063e44b4; fix: preserve unique original OAuth observation marker beside connection handler

21ba7bf6a55dc7ba8b07a4a78d50e5911f609fcb → 93fd5cdfb6bf6c9878897201fb4bbed5757ac8d4; tree 0f2f1bce4b63bc5f2dbcf90bd25d12be81f7b06c; test/fixtures/finite-first-connection-publication.mjs; blob b763d192c557b6812e4e6fc1166ede2d6044bca5; test: preserve native Access expiry and actual actor restart boundaries

93fd5cdfb6bf6c9878897201fb4bbed5757ac8d4 → 57ec6284fa8ac1c3d390b7c5db5f10c7ada6a1db; tree c7c1125fd322dd22fd29d967dbf26097caacbaf3; test/fixtures/finite-initial-entry-world.mjs; blob 1247386b3f81af33e2ca1e3a410d3f7b79ce4ce1; test: sign exact current Access variants without changing source authority

57ec6284fa8ac1c3d390b7c5db5f10c7ada6a1db → 7d7de3b88024598b1b21c42d4b68a2dba1ce1f20; tree 799a9e49a6cb46156630d9e150597f69a4bb150c; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob fb728a6af54e96dfd69c28743964e57596007bd7; test: cover signed identity choice recoverable source expiry and consumed history

7d7de3b88024598b1b21c42d4b68a2dba1ce1f20 → 4d0282ce991f11b1512cfed47ca01861aa4d0827; tree 62cc9f73c7ba5d90f911a1ac9e8fc886e56431f3; test/mcp-qa-finite-owner-phase-context-native.test.mjs; blob be1ff27807934797f371ea703cd9a2c6f7f3675a; test: keep both current snapshots and historical deadlines factual

4d0282ce991f11b1512cfed47ca01861aa4d0827 → 8b3f0faf63793a84614f4e28d1b648a94af7784c; tree 3b300dc8c070c34422d8c1a3cf1218c0c00e271d; .github/workflows/afw-first-connection-qualification.yml; blob 98b628004fb8f7ca7689f767ed59899d3be2e489; ci: qualify current-history identity and repaired focal observation groups

8b3f0faf63793a84614f4e28d1b648a94af7784c → 8fc4f889faddf73edf7070731eadeeead4915471; tree 62cc9f73c7ba5d90f911a1ac9e8fc886e56431f3; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before exact entry dispatch and native proxy refresh

8fc4f889faddf73edf7070731eadeeead4915471 → afbf18ddf8a3209a2d5ecf9080364f81a2b33342; tree 04b7ef2bff8695e0f688e364a30a1e3fd914874e; test/fixtures/finite-initial-entry-world.mjs; blob 394264ea67eee56460289ef4070d158f6663c8f8; test: retain native instance entry and refresh same D1 proxy after config adoption

afbf18ddf8a3209a2d5ecf9080364f81a2b33342 → 4fc92a228eb2d401cdb23f1fa427b8763f1be3a9; tree e229ecad4f676adf1e7c97103706e08499785431; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 2d33d891afee341f670630b897e1869b4b6d981c; test: send exact MCP request through configured native upstream entry

4fc92a228eb2d401cdb23f1fa427b8763f1be3a9 → c49e4effe9ad4376736b7c1b9ecf22a7697ab0aa; tree c69fb09e0b6aebae0c34b1b2b042d9f9beb3ca8b; .github/workflows/afw-first-connection-qualification.yml; blob e36e43f50f9164e8a217a3f9270ba4b949182456; ci: verify native entry correction and recovered current source handles

c49e4effe9ad4376736b7c1b9ecf22a7697ab0aa → 668be1a84759f1e9cb033fe75dfe77e4eb99aa1d; tree e229ecad4f676adf1e7c97103706e08499785431; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before causal correlation and single-guard controls

668be1a84759f1e9cb033fe75dfe77e4eb99aa1d → 208934ac3821f4819588d7c484d67c5610dba30f; tree 5af3e0861db873841d29c3b150fb3bd1dd095a9c; test/fixtures/finite-first-connection-publication.mjs; blob fbe580863da6f01bd4ad7167d80e0a236f64a88f; test: reseal actual completed data and isolate negative-only guard controls

208934ac3821f4819588d7c484d67c5610dba30f → da3325126f8911b3ef7061611eaba8e9a873ddfa; tree ce2341810191b0f83a12e4a66eb944e702d35da2; test/fixtures/finite-initial-entry-world.mjs; blob 641ecb423ac4c35395cdd315c86a503a659642e2; test: label negative QA mutations separately from exact positive M lineage

da3325126f8911b3ef7061611eaba8e9a873ddfa → 7e4e850b4be363f0a60e6484020a8b98dd41a05f; tree 9fb1f7d8ead2069cecceed8eb59f9cb3091a0a8f; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob f3789ef53e287de4494a1761d5e5d9c85574d003; test: prove completed fact correlation recorded ownership and preserved telemetry

7e4e850b4be363f0a60e6484020a8b98dd41a05f → 48c4efa6a4d4ea6b24c9550374f3692828b4bac1; tree 91c3dce8fd537e826580811d2e4018682dc28341; .github/workflows/afw-first-connection-qualification.yml; blob f4b4389e66f82691d753bcd2d36c38eacb02a10a; ci: qualify precise correlations and isolated negative mutation evidence

48c4efa6a4d4ea6b24c9550374f3692828b4bac1 → db90dae7bc5b168d9326f5df229135039359eb1c; tree 9fb1f7d8ead2069cecceed8eb59f9cb3091a0a8f; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before remaining original lifetime boundaries

db90dae7bc5b168d9326f5df229135039359eb1c → 35d592c9c8df36f72d3904d33b760e8e6defe334; tree 5c1ff010e6e9de6f56900e9b839006c112265fec; test/fixtures/finite-first-connection-publication.mjs; blob 0ccdab4076b6791932d89c27978f064020cee5a1; test: retain original body SQL ACK receipt and holder lifetimes with actual IO metrics

35d592c9c8df36f72d3904d33b760e8e6defe334 → d4997c6adce593f6f8c926ccb4819b7369cc6069; tree ad32b2e9e7b92f99ad1673f7153d51fec6867bcd; test/fixtures/finite-initial-entry-world.mjs; blob 2b25b89ed1cdd4f8ac7c84d7cdecf3da1b4c803e; test: observe native body cancellation and separate fixed provider phases

d4997c6adce593f6f8c926ccb4819b7369cc6069 → 476f946d2fc8bb97de3b53ef8577605bbdf6ff3e; tree 7a05a63ed66dbc248a2d4a92d0fc0f5baf846cdb; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob bce97a5f68efad57ac8f338587b9f5570720ee61; test: fence original body parent ACK receipt SQL and holder boundaries

476f946d2fc8bb97de3b53ef8577605bbdf6ff3e → 935d202fe5f5d2dba9b351abdae7d8d025ac5c6d; tree 7ae967a766da86659d16d73e52bebcccda4963cf; .github/workflows/afw-first-connection-qualification.yml; blob a45e59b2f7facfae78e8a008756093a370a6a5f3; ci: qualify remaining native lifetimes and exact positive telemetry

935d202fe5f5d2dba9b351abdae7d8d025ac5c6d → 7fb2e7d31c8a47b38ac22db37ea4f3d6d4517fdf; tree 7a05a63ed66dbc248a2d4a92d0fc0f5baf846cdb; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier while preserving active lifetime checkpoint

7fb2e7d31c8a47b38ac22db37ea4f3d6d4517fdf → 8a818524591acc2bb12b8a8ac9fbe3158b6bca8c; tree 0b577320536deafff75d4c98dd836d362d9d5351; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob 10ed40286c222b701d5ae43900cce84a79bdbbc4; docs: preserve actual native causal checkpoint and conditional API feasibility

8a818524591acc2bb12b8a8ac9fbe3158b6bca8c → 32668d5359a53166b60efce037b21b842281baae; tree 6b374e5f6bb757b8ba18c07cf33b0f31ffa4dfeb; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob 5b198e9098f207226b07d8a6acba9924e1085862; docs: checkpoint native Task3 progress without claiming final acceptance

32668d5359a53166b60efce037b21b842281baae → 918f54c1b4baca3eba6e0ab98c4255ce0a5589bc; tree ad19c9ba27449eb657e847f4bb165592688f455c; test/fixtures/finite-first-connection-publication.mjs; blob ffb1986ef5648efd62c935cd1ecccc6b57755698; test: isolate in-request holder drift and genuine compiled profile mismatch

918f54c1b4baca3eba6e0ab98c4255ce0a5589bc → c9edd694487eba988b8bb55b5af5a1c1495f2725; tree 1ff7c8565910ae0894f0ce5111d9ae12b9cdd2d8; test/fixtures/finite-initial-entry-world.mjs; blob 9363679a536fa01a6179548de0f43a13bafaa75e; test: measure fixed provider response bytes and optional negative profile code

c9edd694487eba988b8bb55b5af5a1c1495f2725 → ec596cff874ef9b3c41748ca1f64e971f7485dda; tree b1b3364f1d78a2acd65e07ed0936bf786e90ca59; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 44ca1ccc95b787772dd972a674ef77da8331f6b4; test: qualify signed protocol metadata config secrecy and receipt lineage

ec596cff874ef9b3c41748ca1f64e971f7485dda → f267ee6e7044883a0d1bdf873010a180f5951202; tree fbba914785cfea7cda05320524c81cd83cf7565a; .github/workflows/afw-first-connection-qualification.yml; blob b3507f857006d982e95d0897824561743e58dde4; ci: verify remaining protocol profile source and original-clock correlations

f267ee6e7044883a0d1bdf873010a180f5951202 → 3469139f5da474722f5d0f53ff5648142f87e67f; tree b1b3364f1d78a2acd65e07ed0936bf786e90ca59; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before original-holder causal RED

3469139f5da474722f5d0f53ff5648142f87e67f → 9794b4cca244e4d9613625ceb482eea238de1d55; tree 3cd037465173661a4df3ea083214d3ca4d156bdb; test/fixtures/finite-first-connection-publication.mjs; blob 2cd77e2759ccdded6c408925958d8cd062e9451a; test: change only original native method holders after actual upload result

9794b4cca244e4d9613625ceb482eea238de1d55 → 5511c073b588dee542fdb9c424f11cc1c70d20c7; tree 0100dd4a1cd2014c39cbac9b99fb19feec4b991c; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob c2389cc813267714632113fff100d6725029785f; test: require original DB node self and KV holders across source pairs

5511c073b588dee542fdb9c424f11cc1c70d20c7 → e08a45d1741cc475099c1b72c5afa11ccd93c4a3; tree 355be0dfa44b7904d5d98cd101808f084405b794; .github/workflows/afw-first-connection-qualification.yml; blob cf39191f036a514cb66c7ebc9109d2f901206701; ci: demonstrate original-holder drift before connection guard fix

e08a45d1741cc475099c1b72c5afa11ccd93c4a3 → 7be8f9e2f3b520148f650d178f1cb0a8dce2e297; tree 0100dd4a1cd2014c39cbac9b99fb19feec4b991c; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before final version-holder RED and native proxy check

7be8f9e2f3b520148f650d178f1cb0a8dce2e297 → 774968aae56ef2ea557fbc2041a7b14e3a6536a3; tree 7e80697af82f9081ce42eb4531d35a2532206773; test/fixtures/finite-first-connection-publication.mjs; blob dce93b2dc07eca88343b5b73ffc54d0d800f0094; test: fence original metadata identity before any native acknowledgement

774968aae56ef2ea557fbc2041a7b14e3a6536a3 → 9856eab4aaa0c877c28965102674a44899eec4db; tree bb47440f404cedbde7f67d1f8f34d4643bd2afef; test/fixtures/finite-initial-entry-world.mjs; blob 6ee0c3c5f837955efc73f5e031525de7eb57880c; test: refresh optional negative profile proxy at every native mount boundary

9856eab4aaa0c877c28965102674a44899eec4db → d22789dcbc2ca878bb71267ebd336d3019ec65a5; tree 1c5e6b34e3b0db1c2e794476e6e3348447ab96a8; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 20f86309462b2f345e9be211aad258e0ae00c98a; test: require zero next SEND and ACK under original holder drift

d22789dcbc2ca878bb71267ebd336d3019ec65a5 → ef3fa9b614f74b37ff67f6a7d424a8227607c0fb; tree 09523fe4f23c72a6b9accea3c2717175867e7560; .github/workflows/afw-first-connection-qualification.yml; blob 5926c5ea0a642a63a93a72288410edeae30d5224; ci: demonstrate original version ACK fence and genuine profile protocol boundary

ef3fa9b614f74b37ff67f6a7d424a8227607c0fb → 7446aff272e5eef215d6b020ee8177ea1e3ab30b; tree 1c5e6b34e3b0db1c2e794476e6e3348447ab96a8; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before original native-holder fix

7446aff272e5eef215d6b020ee8177ea1e3ab30b → e05089a0549415f2ff3ecb6ca82e2906223b1da2; tree 93c009604bef593a200cfc988429770e15d76ad5; test/fixtures/finite-first-connection-publication.mjs; blob d96c31f5704054a0b9884c1536ad7f7167b4389c; test: keep malformed protocol observation passive before product validation

e05089a0549415f2ff3ecb6ca82e2906223b1da2 → 0526f12d94325676d53031f45b9c20c0aaa4a61b; tree 8da8831d3cf706c3117f0e85b0cdfa25558fff77; lib/mcp-qa-finite-owner-phase-context.mjs; blob 5dd213a2a771423f31b98a184bcb541c6f88000f; fix: retain original native holders throughout connection publication

0526f12d94325676d53031f45b9c20c0aaa4a61b → cd4d6c1da749d635607e6d57959eefaf89091e18; tree 00ca1db6c791efa0cccdb9c7b74916a019eedda4; .github/workflows/afw-first-connection-qualification.yml; blob 72556db6043ada16db8a02d9fac930433966603c; ci: qualify original native-holder fix and unchanged positive clock budgets

cd4d6c1da749d635607e6d57959eefaf89091e18 → 3882a7cc900433d17e81a99eb8cec4a5c54d392c; tree 8da8831d3cf706c3117f0e85b0cdfa25558fff77; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove bounded qualifier before original-holder guard batch

3882a7cc900433d17e81a99eb8cec4a5c54d392c → 024a08ae6274eeb2a1ced141380f177aa33e0b41; tree 4312f9e1a3d4d595a54ef470be3530b51ac70630; lib/mcp-qa-finite-owner-phase-context.mjs; blob e482ad1617adc001c3a32c94e71eeb41d27f3d1d; fix: guard original holders before invoking continuation work

024a08ae6274eeb2a1ced141380f177aa33e0b41 → 753ff0907eab15db33fc7f834b2a0ee6f29bc723; tree 2b7f5b1ddbfe3a75065ca9edc67e87ca697f9196; test/fixtures/finite-first-connection-publication.mjs; blob 41d403e0bea47ca0c90393f59245271ca9274d76; test: count every post-drift native read invocation

753ff0907eab15db33fc7f834b2a0ee6f29bc723 → 277e64d5a739463ab9ab1c25da31eb5c60606c9a; tree 1e2674b930037fac40e443d04a402d920eec13db; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 3511e81c57b573451b451d155265966d6f63d9a8; test: forbid factual reads after original holder drift

277e64d5a739463ab9ab1c25da31eb5c60606c9a → 1cf62cdd5265e7ab2f313ffc13aa8321281af3c9; tree 93d592520eaa2457b57f7f0a3815391ecfb50176; .github/workflows/afw-first-connection-qualification.yml; blob 72556db6043ada16db8a02d9fac930433966603c; ci: verify deferred original-holder guards and exact native principal

1cf62cdd5265e7ab2f313ffc13aa8321281af3c9 → 0c8c8f9cd3edae9c28a4195b09be41cfac680610; tree 1e2674b930037fac40e443d04a402d920eec13db; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before completing causal readback variants

0c8c8f9cd3edae9c28a4195b09be41cfac680610 → d02ad5dfd05611e5beefed0399bfd980e343f147; tree b3db3f48317aecb4f7f44f582b07939de10a7d0c; test/fixtures/finite-initial-entry-world.mjs; blob 297b57846bbbe13bfc80ac52c5b033a382aef4b6; test: corrupt actual publication reads without altering registry artifacts

d02ad5dfd05611e5beefed0399bfd980e343f147 → a4ae40124907ce1f03792ed6f0808cb0e2c69363; tree add09cf1534de51038720c3d77979ebff4c7d81a; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob effd8b9c4ae8f4dd32be7577804a2baae4d5ead2; test: assert each upload and activation readback denial causally

a4ae40124907ce1f03792ed6f0808cb0e2c69363 → f7f73a187e49465f4ec89ef8562a96f3aefcfdd6; tree 644ca2b2911cc9cc5fc809cc59026022af81b95b; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob da57209cf1348abaa4ca3db61a82f34f5deb4573; docs: preserve native holder causal proof and remaining matrix checkpoint

f7f73a187e49465f4ec89ef8562a96f3aefcfdd6 → b7794153b7673c598933820440f2bdbe42d4cd27; tree 1b74cbb734ccc0210f475798fcf1f590775df64e; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob 3e81911866d8a24f734ee3d77d0dc3fdeaf7a4ae; docs: checkpoint Task3 holder proof without completion claim

b7794153b7673c598933820440f2bdbe42d4cd27 → 010c92e998d5774656513d0f9a874a94b8c3eaeb; tree 1536218a75a5cf2fe9b7ed199fbce297b700b67c; .github/workflows/afw-first-connection-qualification.yml; blob 2e1898d24df595114455c774f14dc077e2125f9c; ci: qualify eight causal native publication readback variants

010c92e998d5774656513d0f9a874a94b8c3eaeb → fd757be15c119c531953f9da92ae8cb9fd48fd4c; tree 1b74cbb734ccc0210f475798fcf1f590775df64e; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before final ticket correlation matrix batch

fd757be15c119c531953f9da92ae8cb9fd48fd4c → c9ec67266c12844318b53acb716aa52e0ad0cbbd; tree 770b78794ea7b67765c29cc4a75d5efc62ce1a91; test/fixtures/finite-first-connection-publication.mjs; blob 0f807f5f72276668793fd02dd1b1c2a2c08f4ce8; test: mutate actual choice ticket facts with valid codecs only

c9ec67266c12844318b53acb716aa52e0ad0cbbd → e5fa95364648a2ab3afe6fd344b22d4b53205f07; tree b6428f1a82a8207bcb9390f75a7344f0a424ebc4; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 2e81281c70afd528fb685c747532bc1dd26df465; test: preserve ticket lineage across six causal correlation negatives

e5fa95364648a2ab3afe6fd344b22d4b53205f07 → 41f33e44386713b9b4310a4f6f595d88a46fd73c; tree 1ca8d6a732bd4c0a4548655ef9c91657b5626052; test/fixtures/finite-first-connection-publication.mjs; blob c5a8876eb089e82d2a7a20b9525a593e29c3e848; test: snapshot causal counters before explicit failure diagnostic read

41f33e44386713b9b4310a4f6f595d88a46fd73c → 88090aa24697a28d1e9e338925617d628a396863; tree ed1ad7b388c1f23a4c67f6bb4185da266cf801cc; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 0e2e1673533a7c60cdb1958a74c4d8ae7ba2328d; test: separate request-native reads from later explicit diagnostic probes

88090aa24697a28d1e9e338925617d628a396863 → f9e166bd0809cd4164d06a6f0ef2a2cb4ab4001e; tree 5eead19db3306ef1d87ca9462a5f902340bd2329; .github/workflows/afw-first-connection-qualification.yml; blob 525378b2a53fb92211d8930efa52ef98d1eea3d6; ci: qualify actual ticket correlations and source-holder counter scope

f9e166bd0809cd4164d06a6f0ef2a2cb4ab4001e → 36ba881471a1a6cca6db57862b831706100c425a; tree ed1ad7b388c1f23a4c67f6bb4185da266cf801cc; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before precise codec-valid ticket control fix

36ba881471a1a6cca6db57862b831706100c425a → 3697c5392f86d68a894b2be6af8624cf06c3d97a; tree 4df7635b46719b1fb50360bccb8d9fbc37b23dcd; test/fixtures/finite-first-connection-publication.mjs; blob 4160151fa7c426f4b9fd7d83f38deb7d7e1a4b9f; test: reach exact ticket correlators with valid action connection reference

3697c5392f86d68a894b2be6af8624cf06c3d97a → b67453120328c9a7a6c07e1306de8c67a261de3a; tree 49ef7824b8586000f16db0360c8a8adaadd186ae; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 925cec402b15e7fceef2331210020a114d29388d; test: assert targeted ticket and snapshot predicate reached after codecs

b67453120328c9a7a6c07e1306de8c67a261de3a → bf9268f135a3b988e1d6c458ea3088e9d83a54b8; tree 19035a2dbc0926b5f668d0ce385fe0e27937d117; .github/workflows/afw-first-connection-qualification.yml; blob 525378b2a53fb92211d8930efa52ef98d1eea3d6; ci: verify codec-valid ticket predicates and unchanged source-holder refusal

bf9268f135a3b988e1d6c458ea3088e9d83a54b8 → 31ede7d2d0a7ee90828042c8cad17a30a6eaf60d; tree 49ef7824b8586000f16db0360c8a8adaadd186ae; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: freeze final code before exact bounded qualification manifest

31ede7d2d0a7ee90828042c8cad17a30a6eaf60d → 6a5a9e5f272619e96160cd0e3e8a5e686fb01b1f; tree e5eea4ef7f0bf4e4353ad4175c6a0c262331d331; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob 3123a98230018cfb85f2ba54297aa8ee6200388b; docs: freeze exact sixty-case native matrix and bounded qualification evidence

6a5a9e5f272619e96160cd0e3e8a5e686fb01b1f → db9effbfc0acea4ef287113df15e25f68ae4f439; tree 1348b19395830000a5112ff658f654a3d6c090fd; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob 80448d490bf23a11dbb4ff5925221e8632232160; docs: preserve Task3 exact final matrix before qualification

db9effbfc0acea4ef287113df15e25f68ae4f439 → bbb09fca038c3ca09e8f02f07df558378b3fd843; tree df6af49fb23e4291540b312ea57ac6c96e23679f; .github/workflows/afw-first-connection-qualification.yml; blob aaec94c6f7b9e932e840d3bf662e2e105553eff4; ci: run frozen sixty-native-case three-job qualification and scoped regressions

bbb09fca038c3ca09e8f02f07df558378b3fd843 → 09813e0ced14be940398e5aae3c6964377e00b72; tree 1348b19395830000a5112ff658f654a3d6c090fd; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: preserve incomplete qualification before causal observation-scope correction

09813e0ced14be940398e5aae3c6964377e00b72 → 18463127ae3efd772ed03a163c35590865dd3e2f; tree b610f6b80a19ff543a11dbab6f9ad8692108c273; test/fixtures/finite-first-connection-publication.mjs; blob 369d164b38ee658002726a1155929a2ac18b5cd2; test: timestamp actual connection POST observation without changing native clocks

18463127ae3efd772ed03a163c35590865dd3e2f → 0092edfd2cdeb02398f467fda187a891129e54d5; tree ba43b2143bf8543961074237412724d4a8067ff0; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob 27334256258176816345265e26cd735099be9df7; test: align late native-boundary observation with its actual POST root

0092edfd2cdeb02398f467fda187a891129e54d5 → f7949f035caa729478eb9694195c22229af47a2d; tree ffd876ed7656678e143c58614044472d9d450fd1; .github/workflows/afw-first-connection-qualification.yml; blob e0d70f2afc0056360d14f2fb916f2dce1dd09c3e; ci: diagnose actual late held boundaries within original POST observation

f7949f035caa729478eb9694195c22229af47a2d → 534c4054e0bf350ba5f944097e53e6d0f04a65bd; tree 184792f2a92b83c0a32dd356a4c5fbb69f7d5567; .github/workflows/afw-first-connection-qualification.yml; blob 5ae4f604eeb637a587079a1c6fb0492f5acf256d; ci: correct literal regex quoting for two-boundary observation diagnostic

534c4054e0bf350ba5f944097e53e6d0f04a65bd → d8d3276cf4122ec900e60dd3b2ef651b6f0b469e; tree ba43b2143bf8543961074237412724d4a8067ff0; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove focused qualifier before explicit live-boundary observation proof

d8d3276cf4122ec900e60dd3b2ef651b6f0b469e → bfcedc516a54da3674da983eff84581787e0655a; tree ec33d785810c368a5bda529332dc3dc3e1a66aaa; test/fixtures/finite-first-connection-publication.mjs; blob b3325a419b15fd92f99471d91702674c5f85de0b; test: preserve actual live native held-boundary entry facts

bfcedc516a54da3674da983eff84581787e0655a → e5913781a81d4e3ec0fac01c018c18058091636a; tree d83ba47df207e8f57dff75fce5a8fec4ee9a167c; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob f86fa330d2eb9848804bec900191e60cf71b2956; test: require each held target to enter within its actual live request

e5913781a81d4e3ec0fac01c018c18058091636a → 4ddc7db7bc68a124f77ad2a7d19218f21280b769; tree 0a3a9d26e74fd1182917e1e459611c1878401314; .github/workflows/afw-first-connection-qualification.yml; blob 5ae4f604eeb637a587079a1c6fb0492f5acf256d; ci: prove late held entries reached inside actual live POST boundary

4ddc7db7bc68a124f77ad2a7d19218f21280b769 → ed051204d16a3930c7d798f4ddba0975d1eec5d4; tree d83ba47df207e8f57dff75fce5a8fec4ee9a167c; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove qualifier before separating late cleanup observation facts

ed051204d16a3930c7d798f4ddba0975d1eec5d4 → 3238165e15e52cac886ddb150fb517939538f3e3; tree 4b30daa0c22cf7ae6114b927cb676c4ec9826284; test/fixtures/finite-first-connection-publication.mjs; blob 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48; test: distinguish live business IO admission from later retained cleanup

3238165e15e52cac886ddb150fb517939538f3e3 → b6a81590276503926e7fe10564add26150fc1f5f; tree c81007b46849a3a9d2a5673a7912b32d62493f4d; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob bc9f717d79e6e1ad60a40f358351093371331bee; test: allow actual late cancellation while preserving live admission proof

b6a81590276503926e7fe10564add26150fc1f5f → 9a7502f94b23e777ab5b195278c75e1207132555; tree 764110b8beb6f35c4901a6f4ff462b0b73e0931d; docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md; blob c41b55139cb8695b1a9169b5e368d78fdec4c377; docs: preserve incomplete gate and freeze corrected live-observation qualification

9a7502f94b23e777ab5b195278c75e1207132555 → a61142aea40cb4e7880a34e5ffa39ab14ee4fdf5; tree 6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md; blob b6a5810d8e70b7b737b6588f59ea7bdd82835a15; docs: checkpoint corrected Task3 observation and revised exact three-job gate

a61142aea40cb4e7880a34e5ffa39ab14ee4fdf5 → d11dff63b0d693b89ac6ef8d6ec6c60ca01af751; tree 4e30df2ae4abe2bf087b123823185fa6ab082fa8; .github/workflows/afw-first-connection-qualification.yml; blob c3bf62cd04769c1d43abe3ff13784f59e3b351c7; ci: qualify revised exact native matrix under independent original request observations

d11dff63b0d693b89ac6ef8d6ec6c60ca01af751 → f29804abe54f1d618c859c2642b48f90b5677fb7; tree 4f7b1b5ff6296fa6220d09d8d8636f28b26a907a; .github/workflows/afw-first-connection-qualification.yml; blob b9fe3400416e990bb451a17ff21f6999bebe65e4; ci: complete only remaining controls and lint at exact qualified source checkout

f29804abe54f1d618c859c2642b48f90b5677fb7 → 5e28e70b7833fcd4a17fecebe320b0365b6c4d2f; tree 6f3b7308bf8d73418baa8ab1f91ee5900d89b89a; .github/workflows/afw-first-connection-qualification.yml; blob ABSENT; ci: remove completed scoped qualifier and freeze Task3 source handoff

## FIX ROUND1/5 — I1 native chronology assertion, 2026-11-06 16:09 UTC

**IMPLEMENTED AND FOCALLY QUALIFIED; scoped Root re-review pending.** Fresh reviewer returned Spec❌/QualityNeedsfixes,0Critical/1Important. I1 identified a real test-contract gap: the implementation already orders native publication correctly, but T3 only asserted final state/counters/HTTP settlement and did not prove its coordinator's SEND/ACK/receipt durability sequence. The existing T1 enrollment chronology was not evidence for this new coordinator. This appendix supersedes any implication that the earlier D11 test dynamically asserted that order. No product-order defect was observed; no product change was made.

FIX_BASE df20c0f8b8e2fc1b03cdd7e122302c5dc8a62f4e/treef7229e5c4c323b147120d001baa1183a874728da. Tested code7ebe843a69a6434d11670de4cab5482a1c931799/treeafc2a93653f91ee262f9df9f9e32aef07e044dcb; qualifier triggerfc0c3b04110fb01adfae887eaf53b84dbeb1d069. Qualifier-free checkpointab96b2a1d22731eef3fb02f1615c2f276058dd0f/treeafc2a93653f91ee262f9df9f9e32aef07e044dcb. Only T3 and passive F1 instrumentation changed; F2 was unnecessary. P8/P9/P10/P1/P2, schemas/store/journals, SDK, build/profile/bootstrap/source and every other product path remain FIX_BASE-identical.

### What now proves actual native order

F1 captures original request ID, exact keyed raw-value SHA256 from existing native put/get results, native transaction commit/settled sync events, actual captured-fetch invocation+wire-body hash, header response, fixed engine operation's normal fulfillment after body/cancel, and actual QA fetch response return. Audit hashing is synchronous on captured immutable DATA, not asynchronous work that could reorder observations. There are no additional backend reads/calls, authority predicates, grants, callback approvals, seeded rows or new clocks. Engine/response side observers attach to original operation Promises and return those original Promises/values; rejection semantics stay with originals, not the observation branch. Synchronous QA responses also preserve their original return path.

The principal correlates actual own journal keys to effect identities, raw values and ACK→SEND codec hashes; SEND requestHash binds the actual provider method/URL/JSON body plus original baselines. Actual normal result IDs bind the ACKs and receipt. It requires native put→commit→sync→completed exact readback before invocation, header response→body/cancel/result settlement before ACK put, ACK commit→sync→completed exact readback before next effect, and receipt durability before the actual QA200 return. It additionally checks upload ACK durability before activation SEND and activation ACK durability before receipt. The trace never supplies product authority.

Protected journal blob6e3de33d04075740fb57e5f9afcf87dd9f68ee79 read() uses transact(...,false), state() performs tx.get inside a read-only native storage.transaction. Therefore a completed readback is not assumed to be direct storage.get. Passive RO transaction events carry transactionID and hashes of the exact values actually read and are emitted ONLY after that original native transaction Promise fulfills normally. Predicate pairs those fulfilled events with the same transaction's actual get values after sync/before the next boundary; an incomplete tx.get does not qualify. Genuine direct storage.get is still supported. No pending readback was relabelled settled.

Actual primary event indices (strict trace sequence, not coarse wall-clock sorting), requestc6f64333-d308-4427-82c7-fc24909741a4:

| Effect | put / commit | sync settled | completed exact readback | native invocation | headers / normal result | ACK put / commit | ACK sync | ACK completed readback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| upload | 22 / 25 | 27 | 33 (RO tx11) | 69 | 70 / 71 | 78 / 79 | 80 | 86 (RO tx17) |
| activation | 199 / 202 | 204 | 210 (RO tx31) | 246 | 247 / 248 | 255 / 256 | 257 | 263 (RO tx37) |

Receipt put340→commit341→sync342→completed RO readback349(tx47)→actual successful QA response415,status200. All events correlate exact own keys/hashes and the original POST. Full sanitized hashed passive trace and selected proof are preserved in output/task3/native-publication-order.json. Trace is captured BEFORE order assertions for failure diagnosis, then augmented with the passing proof.

### Covering qualification and assertion discrimination

Exact command:
```text
node --test --test-concurrency=1 --test-reporter=spec --test-reporter=tap --test-reporter-destination=stdout --test-reporter-destination=output/task3/fix1-principal.tap --test-name-pattern=^(?:T3 same initial bytes produce connection and downstream)$ test/mcp-qa-finite-first-connection-publication-native.test.mjs
npx eslint --max-warnings=0 test/mcp-qa-finite-first-connection-publication-native.test.mjs test/fixtures/finite-first-connection-publication.mjs
```
The runner passes arguments as a structured argv array; the displayed regex above is not a shell-quoting recipe.

[Run42248678046](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42248678046)/job127997568910 SUCCESS16:02:52–16:04:26UTC(94s), exactly1job timeout15min,Node22,contents:read,persist-credentials:false,no secrets,npmci --ignore-scripts --no-audit --no-fund. Actual checkout7ebe/treeafc2 is distinct from triggerfc0c3b04; child fixture testRevision explicitly names actual verified checkout. Before/after actual HEAD/tree, tracked cleanliness and all7HEAD+working-file hashes match. Expected/executed1/1,top1/sub0,PASS1,FAIL0,CANCEL0,SKIP0,TODO0,commandExit0,signalnull; runner64546ms/native test63789.314432ms. lint2exit0/2637ms. Exact name equality prevents zero-match/file pseudo-PASS. No other native case/suite was rerun.

Five copied-DATA checks rejected missing/reordered/incomplete observations while leaving the actual native flow untouched: missing upload SEND sync; activation invocation before SEND readback; missing activation ACK sync; incomplete upload SEND transaction get; receipt readback only after success. They are assertion-discrimination checks over copies, nativeFailureInjected=false, not dynamic product/native mutation evidence or historical TDD RED. No product mutation was needed for this reviewer finding.

Positive initial M remains EXACT D11: SHA256c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061bytes, explicitly asserted before approval. Principal negativeMutation=null. QA-only passive instrumentation SHA256e4861bf5d2af5248b651f440514a0ca3b5d131d892f0a0e40918ae4e7efb7d7b/2368172bytes; it does not replace/wrap the positive M or change product files. Root/child deadlines, body/cancel retention, source C0/C1 and native positive lineage/downstream remain unchanged. Audit additions have measured native flow63789ms aggregate across separate requests, not an asserted speed improvement; CI hardware/timing differ. Existing167positive product evidence remains at D11, NOT all167tested at this new fixture checkout.

Artifact ID13519737504,task3-fix1-source-7ebe843a-trigger-fc0c3b04110fb01adfae887eaf53b84dbeb1d069; ZIP1225837bytes; sha256:f40e631bdeae57bf9cce4479cb74360d716c4a5b3dda2b2ac3a107b04f7de05e; expiry2026-11-13T16:04:21Z. Source/metafiles, M/QA scripts, spec+TAP/counts/manifests/provenance and sanitized native-order trace are retained7days. Digest is verified GitHub metadata/primary upload value, not a local ZIP rehash/download.

### Failed first qualification and correction

Run42247056350/job127991910162 at actualefb92819/tree8dd17328 (trigger274a14f4) remains FAILED:1executed/0PASS/1FAIL/0CANCEL/0SKIP/0TODO/exit1 at “upload SEND exact storage readback after sync before next boundary”; actual connection response had already returned200, exact M unchanged, lint2exit0. This was a passive-observer/predicate API classification defect, not a pre-fix product RED or observed product chronology violation. The predicate had incorrectly accepted only direct storage.get while the protected journal uses actual read-only native transaction/tx.get. Root independently verified the native API and explicitly approved the corrected completed-transaction observation before redispatch. First failed qualification did NOT save native-publication-order.json because its write was after the failed assertion; no captured trace is claimed for that run.

Failed artifact13518022372/sha256:3e3a9f24adc96fc4e7c5af35c353594a6718381a45cd1fbd7c5494896de4034e/expiry2026-11-13T15:53:25Z is preserved. The correction records actual RO transaction normal fulfillment, not mere get invocation/result, and saves trace before assertions. No readback requirement, guard or clock was weakened. No blind rerun, backend replacement, extra read, product edit or new fix round occurred.

### Before/after blobs, scope and handoff

| Path | FIX_BASE blob | Qualified blob |
| --- | --- | --- |
| test/mcp-qa-finite-first-connection-publication-native.test.mjs | bc9f717d79e6e1ad60a40f358351093371331bee | 1298bb5b67749df0d7ee20c863b691562e6a81b9 |
| test/fixtures/finite-first-connection-publication.mjs | 2cda37157bc0d1c9622784c33aa3b0fd94dc0e48 | 6a6950bbe7e956d3b7f19e1a04c5aa6f6ca7b379 |

All other five Task3 paths match FIX_BASE/D11 exactly; all product paths including protected P1/P2 match FIX_BASE. Final scope will contain only these2test files plus appended report/progress; temporary qualifier removed before this appendix. Artifact provenance binds tested code7ebe, not later documentation commits. Source ownership ends after final readback/handoff; Root will create the FIX_BASEdf20→HEAD review package. I1 implementation is ready for scoped re-review; it is not self-accepted as closed. M2/toolchain/RPC warnings, semantic callback-retry exception, post-implementation negative chronology and live-provider/~1.877GB SYN feasibility limits remain as disclosed, outside this fix. No Minor fix wave or runtime/auth/token/provider/deploy action occurred. All operationalReadiness/completePackage/PCoff remain false; Nov3 source ceiling stays expired.

Verified sequential FIX ROUND1 writes through qualifier removal (each single-parent/path/file-CAS/ref/blob read back):

- df20c0f8b8e2fc1b03cdd7e122302c5dc8a62f4e → f3fca20cb71b839735611bb25663cf257ecbd648; tree5f3f3878130d1e06de32356e930c213ba2f09b79; test/fixtures/finite-first-connection-publication.mjs; blob86dffd281c04d4404c9c257c588e7be1afa24a2c; test: passively observe keyed native publication invocation and durability

- f3fca20cb71b839735611bb25663cf257ecbd648 → f3bf10200339e30865baa5199ad347a75c4ca6ae; tree6a12bc22fbccfccbb13ac29697bce44a660bd24f; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob379b1b64686d6882f04269b146c5a294d5bd7734; test: assert actual publication durability order before successful response

- f3bf10200339e30865baa5199ad347a75c4ca6ae → efb92819f3cb7d977ac06c440bca27f1d927d920; tree8dd17328e892f34528c7bb5c4ea10715df78dbda; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob0f6c87ddce517098bf4a16191e64cc381157802e; test: retain native order proof and passive trace as scoped CI evidence

- efb92819f3cb7d977ac06c440bca27f1d927d920 → 274a14f4b6026ffcd6da92c88b6922d5e2adf362; treed23aa0cbb8769502431dc9c022ecca0679dea121; .github/workflows/afw-first-connection-qualification.yml; blobae4a2cffc12a79ac268ffb62fe8d0e47117ef013; ci: qualify only Task3 fix1 native chronology principal and two-file lint

- 274a14f4b6026ffcd6da92c88b6922d5e2adf362 → d56f9fb9ce27bcd36229645bf3adc24b52acc429; tree8dd17328e892f34528c7bb5c4ea10715df78dbda; .github/workflows/afw-first-connection-qualification.yml; blobABSENT; ci: preserve failed chronology qualification before correcting native readback observation

- d56f9fb9ce27bcd36229645bf3adc24b52acc429 → 1821d3a21f584d3f56a152e0ec5bb92a54c629da; tree73d733f122177a132b8fe96e1ee148bab41fa1ac; test/fixtures/finite-first-connection-publication.mjs; blob2fd1f95a917f4987dbc8b6425a2847e40a8f8878; test: observe exact readback only after actual read-only native transaction fulfillment

- 1821d3a21f584d3f56a152e0ec5bb92a54c629da → eb43d27ff8ec5ccbe160a8420080c11f68e9fd39; treea2696d58eb0118b7214601985f8c0cf6436cf201; test/mcp-qa-finite-first-connection-publication-native.test.mjs; blob1298bb5b67749df0d7ee20c863b691562e6a81b9; test: require completed keyed readback transaction and retain failure trace before assertions

- eb43d27ff8ec5ccbe160a8420080c11f68e9fd39 → 7ebe843a69a6434d11670de4cab5482a1c931799; treeafc2a93653f91ee262f9df9f9e32aef07e044dcb; test/fixtures/finite-first-connection-publication.mjs; blob6a6950bbe7e956d3b7f19e1a04c5aa6f6ca7b379; test: keep original observed get promise while capturing readback values

- 7ebe843a69a6434d11670de4cab5482a1c931799 → fc0c3b04110fb01adfae887eaf53b84dbeb1d069; tree48b3fcf8b99373888a1871f4ba608fa005ded211; .github/workflows/afw-first-connection-qualification.yml; blob7f1baea5578278b317d8264be9da6b597e0a93d5; ci: qualify corrected completed native readback chronology and two-file lint

- fc0c3b04110fb01adfae887eaf53b84dbeb1d069 → ab96b2a1d22731eef3fb02f1615c2f276058dd0f; treeafc2a93653f91ee262f9df9f9e32aef07e044dcb; .github/workflows/afw-first-connection-qualification.yml; blobABSENT; ci: remove Task3 fix1 qualifier after focused native order verification

The next report/progress commits only append this fix receipt and are delivered by their final handoff SHA rather than a self-referential content hash.
