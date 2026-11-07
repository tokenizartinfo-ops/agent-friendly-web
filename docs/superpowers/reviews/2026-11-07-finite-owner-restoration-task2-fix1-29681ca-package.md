# AFW Task2 — fix round1 scoped review package

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT SOURCE/SYN GitHub Actions; Source feat/finite-native-cleanup-20261101. Read-only review; no tests, build, provider/runtime, permissions, credentials, OAuth, main or client data. This is AA..fixFINAL, not Task2 BASE2c6 nor whole-planBASE7aab.

## Exact range and preserved gates

FIX_BASE aa1e9dc0161ffa0b56777a96aa274cff272484cd /tree258ecbd8428daa9ffecd6e463afc7971628c7e33. FINAL 29681cae2bf1094ec5c66d5b2784254f77bec697/tree0200cf32ac4e020bd35c56c307fbc8060cf8bd64. Source writer STOP. Final report blob2d36b667a1065f64630bfd84ecec84c25da0fe80; old report61867chars is an exact prefix, only30580chars appended. Brief blob37a995f2793ca9fdeb09f56a4ca3c3de945c3d40 (Rootdocs5507eb69); specblobee521ffef3af18936a5f4591ff649433f1405369. Prior findings docs/superpowers/reviews/2026-11-07-finite-owner-restoration-task2-review.es.md/blobc23b82413554e003d76e0d7d82ee1dfa15abe25f. Scope I1/I2 and new breakage in this fix; old MinorM1/M2/M3 + Task1RM1–RM4 remain for combined gate. No acceptance implied by implementer report.

Root directly verified recursive trees not truncated: FIX_BASE and FINAL each3179leaves;3174 unchanged SHA/mode/type, only five net paths below changed. Tested full tree3180leaves; FINAL differs only qualifier removal and report append;3178 others identical, all code/test blobs match qualification. Qualifier70d566b9... retired in5e2e93090c80bf30c4220f08194c7dda173467fc (parent92d, sole path removed); report commit29681cae parent5e2e9309 sole report path. Main remains0c9c475b3ebaa970fc11d628b40e50a90cceb727. Every range commit is single-parent and contiguous; no local git/deps/test or diff reconstruction by reviewer required.

## Commit list (all11)

- e543cb7bc7b6e67243bd7f692744f8922c832b09 — test(afw): observe current grant reads and bounded final-inventory drift
- f9803af84ea4ae8e9d4f862e8b967ca80d70e9db — test(afw): preserve genuine unexchanged grants at original cleanup clock
- 8462f4ec67c6bb2d8e89c7359602091b7802fb22 — test(afw): cover current grant conflict and post-SDK inventory drift
- 94e00923a25833cd134669e03fb646f3b1255c0b — test(afw): freeze causal RED for current grant and final inventory
- 3ff3c45c860b427bbfe16ab97561e0ae3cdf0622 — fix(afw): qualify current SDK grant and fresh final inventory
- a78fbec7cb86306b0e3c159a5c209b2fe01eb778 — test(afw): observe actual final inventory commitment
- 9d03ff957ccf7541547a6607bcfce650d4db1102 — test(afw): assert post-SDK inventory facts and timestamps
- c06d6661f6e8f31011d4b0c74592d17e0c622dd8 — test(afw): freeze focused GREEN for review fixes I1 and I2
- 92d0255a2d5c2ac2249941e8348a0d5701742604 — test(afw): freeze coherent 56-case review-fix qualification
- 5e2e93090c80bf30c4220f08194c7dda173467fc — test(afw): retire verified review-fix covering qualifier
- 29681cae2bf1094ec5c66d5b2784254f77bec697 — docs(afw): append verified I1 I2 review-fix evidence and STOP

## Stat / blob inventory (GitHub comparison, full range)

|Path|Final blob|Status|Add|Delete|Untruncated U10 chars|
|---|---|---|---:|---:|---:|
|docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md|2d36b667a1065f64630bfd84ecec84c25da0fe80|modified|185|0|32453|
|lib/mcp-qa-finite-owner-cleanup.mjs|1a5a2583d266179cdd89f799c64199f29044fec5|modified|78|3|20413|
|test/fixtures/finite-owner-cleanup-persistence.mjs|72db124ac86c14537cfa711434393b4561904c30|modified|28|10|16509|
|test/fixtures/finite-owner-cleanup.mjs|4e88d73a818497a5a64dcc34ee15737e93521d96|modified|23|5|16670|
|test/mcp-qa-finite-owner-cleanup-native.test.mjs|378c09842bef0840883c481bd6cd4bad4b66413b|modified|69|1|17007|

## Covering evidence checked independently by Root

CausalRED42387214095/94e00923:4cases, matching controlPASS and3causalFAIL, no setup/premise failure. FocusedGREEN42388746349/C06:4PASS. Final covering42390108314/attempt1 SUCCESS17:01:58UTC, immutable Source92d0255a2d5c2ac2249941e8348a0d5701742604/tree7c06844f33aeb6d0ce0d75381847b8f40d5a28a9. Final code matches C06; only qualifier changed. Do not add focal/red successes to final totals.

Root primary log counts: prepare_g0 job128455701913:14+10+9+2+5=40 components; consumers g0 job128459192501=3, g1 128459130424=2, g2 128459093629=2, g3 128463071778=2, g4 128463188045=2, g5 128462941231=1, g6 128467399046=3, g7 128467605065=1. Totals56PASS/0fail/cancel/skip/todo,16jobsSUCCESS,24same-Source artifacts with valid digests/expiry. All8checkpoint and8outcome strict readbacks passed,9genuine lineages/19graphs/max2native pergroup. g0 fourfiles;g6 five;g7 three;g4 declared43partialfiles preserved with parent. Artifact tables and exact tests/outcomes in appended report diff below match Root's independent metadata. g3 truncated JSON recovered once under named Root exception from artifact13581839130, not reexecuted; writer bounded in-memory evidence read, Root independently verified artifactmetadata. M3 remains debt.

Exact component commands from immutable qualifier70d566b9, with no selection omitted:

~~~~~sh
          { for file in test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-cleanup.mjs test/fixtures/finite-owner-cleanup-persistence.mjs test/mcp-qa-finite-owner-cleanup-native.test.mjs test/mcp-qa-finite-owner-cleanup.test.mjs lib/mcp-qa-finite-owner-cleanup-records.mjs lib/mcp-qa-finite-owner-cleanup-journal.mjs lib/mcp-qa-finite-stage-work.mjs lib/mcp-qa-finite-preparation-issuer-store.mjs lib/mcp-qa-finite-owner-cleanup.mjs lib/mcp-qa-finite-initial-cleanup.mjs test/fixtures/finite-first-connection-publication.mjs; do node --check "$file"; done; } 2>&1 | tee output/owner-cleanup/syntax.log
          npx eslint test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-cleanup.mjs test/fixtures/finite-owner-cleanup-persistence.mjs test/mcp-qa-finite-owner-cleanup-native.test.mjs test/mcp-qa-finite-owner-cleanup.test.mjs lib/mcp-qa-finite-owner-cleanup-records.mjs lib/mcp-qa-finite-owner-cleanup-journal.mjs lib/mcp-qa-finite-stage-work.mjs lib/mcp-qa-finite-preparation-issuer-store.mjs lib/mcp-qa-finite-owner-cleanup.mjs lib/mcp-qa-finite-initial-cleanup.mjs test/fixtures/finite-first-connection-publication.mjs | tee output/owner-cleanup/lint.log
          node --test --test-reporter=tap test/mcp-qa-finite-owner-cleanup.test.mjs | tee output/owner-cleanup/contracts14.tap
          node --test --test-reporter=tap test/mcp-qa-finite-owner-sdk-reference.test.mjs | tee output/owner-cleanup/inherited10.tap
          node --test --test-concurrency=1 --test-reporter=tap --test-name-pattern='^(REAL closed-first monotonic tombstone permits early reduction and blocks delayed OPEN|REAL OPEN then terminal close prevents late authorization|REAL serialized barrier orders future grant to zero and makes exact absence meaningful|REAL unknown fence ACK reconciles same original ID on fresh primary before absence|REAL original UUID grant-only cleanup normal preserves unrelated rows/history|REAL original UUID grant-only cleanup held_grant_ack preserves unrelated rows/history|REAL original UUID grant-only cleanup history preserves unrelated rows/history|REAL foreign project revision fails closed after barrier|REAL expired original grant and consent are reduced after C0 within original cleanup C1)$' test/mcp-qa-finite-preparation-issuer-native.test.mjs | tee output/owner-cleanup/issuer9.tap
          node --test --test-concurrency=1 --test-reporter=tap --test-name-pattern='^(B2b only actual finite alarm with no initial records delegates nominal unchanged|B2b foreign primary pointer stops without blind overwrite)$' test/mcp-qa-finite-initial-cleanup-native.test.mjs | tee output/owner-cleanup/initial2.tap
          AFW_R2_GROUP=components node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-owner-cleanup-native.test.mjs | tee output/owner-cleanup/sql5.tap
~~~~~

Each consumer uses AFW_R2_GROUP=gN with node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-owner-cleanup-native.test.mjs; exact group env/layout/dependency/readback assertions remain at the immutable qualifier https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/92d0255a2d5c2ac2249941e8348a0d5701742604/.github/workflows/afw-owner-restoration-qualification.yml . Report includes full names, primary results, timestamps, pins and metrics limitations. Group counts3/2/2/2/2/1/3/1; 3 lanes/15min perjob. Code state is Source/SYN; readiness/package/PCoff and globaldrain remainfalse.

## Complete unified diffs (U10, validated against before and after contents)

### docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md

~~~~~diff
diff --git a/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md b/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md
--- a/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md
+++ b/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md
@@ -339,10 +339,195 @@
 | 42377143830 | 13575868870 | r2-green-g0-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10851330 | sha256:e2d246948675004d659223db57a5e6bb265a44df58bbf4b9712d89b0f947c6f2 | 2026-11-14T13:42:37Z |
 
 | 42380606239 | 13577666814 | r2-g5-original-audit-9a189cff22d6f24627d21b631338ef0dc4b5afff | 5371 | sha256:cbc4b8f1d2cc84fb5277bff0d4130bc30a883de66eb3d79a42c643b345650110 | 2026-11-14T14:13:47Z |
 
 | 42381392620 | 13577593532 | r2-g5-denial-oracle-53b4ead2966d4366b6417a9a54f46577ddc0fcfc | 8684 | sha256:a20f951a867573347d8a6380c5b6ea3c6e030fdfb16f4a95f2c83ac03447cb4c | 2026-11-14T14:24:13Z |
 
 
 La retención de la promesa protege la misma ctx, pero no acredita que un trabajo de un isolate distinto haya sido drenado globalmente. El caso SDK-only conserva explícitamente MAdmission=false. Los artefactos y checkpoints son SYN y caducan a los siete días indicados; conservar sus identificadores no extiende su retención. La revisión independiente de Root sigue pendiente tras este reporte.
 
 Los cuatro hallazgos Minor heredados de Task1 siguen en su [revisión aceptada](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c478cc7e85c093614c7ae705ce2ec76615ed8207/docs/superpowers/reviews/2026-11-06-finite-owner-restoration-task1-review.es.md). Task2 no los elimina por inferencia; el límite RM2 se conserva explícitamente arriba.
+
+## Independent review — fix round 1/5 (7 November 2026)
+
+Scope: Important I1 (current SDK grant qualification) and I2 (fresh operational inventory after SDK). FIX_BASE aa1e9dc0161ffa0b56777a96aa274cff272484cd / tree 258ecbd8428daa9ffecd6e463afc7971628c7e33. Original accepted Task1 and original Task2 causal RED were not rerun. Minor M1/M2/M3 remain deferred. This appendix preserves the original report and all earlier failed diagnostics rather than replacing their conclusions.
+
+### Causal RED
+
+Run 42387214095 / attempt 1, Source 94e00923a25833cd134669e03fb646f3b1255c0b / tree 505d56cbb08a649540d9027832fc1d09d2db4732, terminal FAILURE 2026-11-07T15:52:13Z. Production remained FIX_BASE byte/mode/type identical. Two producers succeeded, both exact checkpoint and outcome readbacks passed. Four cases: matching control PASS; three causal failures. g6 job128450253710: conflicting current object performed one native grant delete instead of zero, then completed; completed reentry with new Workflow waiting returned restored instead of admin_pending. g7 job128450264242: after native restore and native SDK deletion, its ACK was held 127 ms; a modeled own Workflow became waiting during the hold, yet OwnerCleanup receipt and initial complete persisted. There were no missing-import/setup/expired-premise failures. Native alarm entered at original C0 (+1ms in g6, exact in g7); recovery ready86.461s and81.555s beforeC0. No clock/TTL extension, fake admission, authority callback or fabricated receipt was used.
+
+g6 used normal real SDK complete with the original Reference, deliberately no authorization-code exchange. Genuine codeTTL 600 preserved the present current grant through C0 after authorize at C0−300. The conflict replica preserved original absolute native expiration and altered only modeled untrusted correlation content; it was not a new authorized grant. Reentry was an explicit inspection of the same original alarm entry/actor/plan inside C1 after actual settlement; it was not a fourth scheduled delivery or a new business Root.
+
+### Fix composition
+
+Only lib/mcp-qa-finite-owner-cleanup.mjs changed among the six production modules. The original Task1 forward reader body remained byte-identical. No new production API or path was introduced.
+
+I1: the existing one-get bounded native KV facade now reads grant:subject:originalSDKid with type=json before SDK Send or deletion, retaining the actual native promise and original holder/lease guards. A private validator checks pinned SDK 1.2.1 raw layout, original selector, subject, client, resource, scopes, correlation metadata and creation window. The historical Reference expiry is not rewritten; genuine postexchange expiresAt may coexist with its earlier null. True native absence requires the exact original Reference and is committed as absent_under_original_reference, never absence ACK. Only a subsequent actual normal revokeGrant return can yield SDK Observed. Conflicting objects fail before any SDK delete/Send.
+
+I2: a private native reader executes after SDK reduction and before receipt creation/reuse. It reacquires custody, bootstrap Source/pointer evidence, historical source, fixed Workflow definitions/instances with terminal status, own active Container count 0, fixed schedules/tails counts 0, pinned closed operator, restored baseline/pins, recoverable original backup chunks and eligible deployable versions. Every provider read retains fetch/body/cancellation under the original lease with 5s child bounds. Facts include actual body hashes, pins, provider dates and observation timestamps. The subsequent existing owner snapshot reacquires D1, consent, local anchors, M/QA and notice/unknown-operation facts. These facts and the final inventory are committed together into finalFactsHash. Both normal and already-complete callers enter this same finish path; old receipts are never rewritten, and the initial alarm remains the sole restore/state/alarm writer.
+
+The SYN observer only records the actual final digest input and returned hash; it supplies no facts or authority. Covering assertions link inventory timestamps after SDK Observed and before receipt, validate pins/counts, and compare receipt.finalFactsHash with the actual computed digest. Historical reentry checks compare records/alarm/counter and provider effects without replacing history.
+
+### Preserved RED artifacts
+
+| Artifact ID | Name | ZIP bytes | SHA-256 |
+|---|---|---:|---|
+| 13580690939 | r2-fix1-red-g6-prepare-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 1240804 | 0c4dc7dcdbe1485f6cc6555bd4afd19d1ce9196d41743d204df76f71f271444c |
+| 13580651329 | r2-fix1-red-g6-consume-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 20965 | e36cff3f9a8d5f7cf1cfdada6319a2a90c193827ff74a5bb19d5bfa1aa13c853 |
+| 13580621256 | r2-fix1-red-g6-checkpoint-94e00923a25833cd134669e03fb646f3b1255c0b | 10834115 | e548a5e3f52aa84391aa64da121731ae7df206e2fe1f7590055f6963abfdfc7c |
+| 13579993272 | r2-fix1-red-g7-checkpoint-94e00923a25833cd134669e03fb646f3b1255c0b | 10852386 | a587559235197682b344b42d6a24ca115aa23964161c2073d904c1d387eafd0c |
+| 13579968338 | r2-fix1-red-g7-prepare-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 1240938 | 27ca74a64a9b81e9f5740d7fd76f044bf20d10a9e58e4175e039aa70f86753f7 |
+| 13579484360 | r2-fix1-red-g7-consume-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 11813 | 793aff849944409bb0b1b7300c6eb6980335a398808ad27de174c07432bb8a30 |
+
+The two checkpoint archives remained cloud-only. Primary consumer logs were parsed in memory; no DB/script/archive extraction was needed for this round's causal RED. Exact outcome readbacks required all 5 g6 and 3 g7 payloads plus their manifest, with no unknown root entries and byte/hash/source equality.
+
+### Qualification layout and commands
+
+Focused RED/GREEN: prepare-group g6 and g7 through the file CLI, followed by AFW_R2_GROUP=g6/g7 node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-owner-cleanup-native.test.mjs. Each same-revision qualification has 4 jobs, 2 genuine lineages, 4 compiled M/QA graphs, max 2 Miniflare replicas per job and 15 min job bounds. g6 runs matching/conflicting/reentry; g7 runs drift after restore during retained SDK. Syntax/node --check and scoped ESLint run before I0. Real alarm clocks are never replaced by synthetic test time.
+
+Final covering target 56: unchanged 14 cleanup contracts + 10 inherited SDK-reference components + 9 selected issuer-native cases + 2 selected initial-cleanup guards + 5 SQL-native components = 40; original 11 native + 5 new = 16. Group counts g0=3,g1=2,g2=2,g3=2,g4=2,g5=1,g6=3,g7=1. Three lanes g0→g3→g6, g1→g4→g7, g2→g5; 16 jobs, 9 genuine lineages, 19 compiled graphs. g0 absence shares its original principal occurrence and performs no extra revoke. g6 reentry shares its matching actor. The 40-component gate is preserved from the accepted 51, not a package-wide suite or new Task1 native qualification. Final readback inventory adds only fix1-absent-current-grant.json to g0 and the bounded g6/g7 evidence files.
+
+### Focused GREEN result
+
+Run 42388746349 / attempt 1, Source c06d6661f6e8f31011d4b0c74592d17e0c622dd8 / tree 06aa87593a19d2cf2257c8267a5cb85ca606e765, terminal SUCCESS 2026-11-07T16:11:33Z. Four jobs succeeded. g6 job128454971543: tests 3 / pass 3 / fail 0 / cancelled 0 / skipped 0 / todo 0; g7 job128454982390: tests 1 / pass 1 / fail 0 / cancelled 0 / skipped 0 / todo 0. Scoped syntax/ESLint exited 0 before I0 with no ESLint diagnostics; inherited Actions/Node deprecation warnings remained visible.
+
+Both alarms entered exactly at their original native C0. Matching current grant: one exact native get(present), one grant delete, one restore and complete. Its actual final inventory entered 1794067885550 and finished 1794067885683, before receipt 1794067885936; finalFactsHash 5b85e8af3d2dfc5815534d74504d7d9bd98a6452b9e780d0a935e7de955baf24 equaled the observed actual digest. Three fixed workflows / one terminal instance, own active Container count 0, four schedule/tail counts 0, closed operator and recoverable original baseline were included, with Source pins, request-body hashes and timestamps. These are explicit SYN provider facts (including the fixture operator module), not live operational inventory.
+
+Conflicting current grant: one exact native get(present), zero SDKdeletes, no SDK Observed/no OwnerReceipt; primary stack failed in qualifyCleanupCurrentGrant. Completed reentry: unchanged-inventory control succeeded, Workflow waiting reentry returned admin_pending and all historical rows/alarm/counter/provider effects remained unchanged. g7: one get(absent under original Reference), native SDK ACK held 127 ms, actual SDK returned / Observed, then Workflow waiting failed readCleanupFinalInventory; no OwnerReceipt/no initialReceipt, state processing, one restore. No rerun or clock move was necessary.
+
+| Artifact ID | Name | ZIP bytes | SHA-256 |
+|---|---|---:|---|
+| 13581066384 | r2-fix1-green-g6-checkpoint-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 10845168 | 0639db7b2c6a80e7a9a77efc301fa073cef9d196fbfe0ad1130fc7df95efa78a |
+| 13581057488 | r2-fix1-green-g7-prepare-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 1243777 | 76c731707bd2d076b2607ded17090fff4eede5df930ea9d4cff87191fec2ed31 |
+| 13580728893 | r2-fix1-green-g6-consume-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 19630 | e028fe0204434676c0034f42207eda5a073f3db947e617a2a7872fa19203119d |
+| 13580673985 | r2-fix1-green-g7-consume-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 8859 | 73f5be1b20f63db6e0244cd47ca7f1f679fd694d8469f1f918e38d8ea24c144a |
+| 13580648856 | r2-fix1-green-g7-checkpoint-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 10863380 | 0f3d20d31cdd2fe4559ef7d9527e7b35c61a8af31b617597b61025840336dd32 |
+| 13580294123 | r2-fix1-green-g6-prepare-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 1243988 | 56ca17b2a8b17939048949d506b84493200ccc66caef6b081f375f564fe58261 |
+
+All checkpoint/outcome readbacks passed strict source/path/bytes/hash checks. Focal evidence is separate from the coherent final 56; its passes are not added to that total.
+
+### Added covering cases (five; existing names preserved)
+
+| Group | Exact case name | Protection |
+|---|---|---|
+| g0 | R2 fix1 absent current SDK grant uses original reference without absence ACK | Same principal occurrence; one exact native get returns null; actual SDK return still required. |
+| g6 | R2 fix1 matching current native SDK grant is qualified before reduction | Genuine unexchanged grant, exact read, successful reduction, final inventory digest and timestamps. |
+| g6 | R2 fix1 foreign current SDK object is preserved with zero deletes | Untrusted correlation drift with original absolute expiration; zero SDK deletes, no successful SDK observation or owner receipt. |
+| g6 | R2 fix1 completed reentry rejects fresh inventory drift without rewriting history | Same completed actor/plan; control then active Workflow rejection, historical bytes/alarm/counter/effects unchanged. |
+| g7 | R2 fix1 post-restore inventory drift during retained SDK blocks both completions | Real retained SDK ACK, original child budget, Workflow drift after restore; no owner or initial receipt/completion. |
+
+The final native test blob is 378c09842bef0840883c481bd6cd4bad4b66413b. Focal and final qualifiers execute identical production and test blobs. The final Source differs from focal Source only by the temporary qualifier (9th single-parent/one-path commit of this fix round); all 3179 other leaves were independently compared byte/mode/type exact. Against FIX_BASE, 3175 protected leaves remained exact while the qualifier existed. Root's separate documentation branch is outside this Source delta.
+
+The 19 compiled graph outputs are 18 M/QA outputs across 9 lineages plus the single declared SDK-only graph in g5. They are SYN compilation/qualification evidence, not provider deployment or operational readiness. The existing g5 distinction remains: SDK-only adversarial operation omits the AFW callback by explicit ruling and does not prove ordinary M token-exchange admission; actual M data denial is classified only from captured protocol/body/configuration evidence. M1 per-phase metrics, M2 paging/peak boundaries and M3 diagnostics truncation remain deferred. g2's 100 deletes / two lists are not upgraded to an unexecuted 200-delete / third-page / peak-2 claim.
+
+### Limited evidence recovery during final qualification
+
+No new execution was opened to recover diagnostic output. The second g3 and g4 native-result console lines were truncated; their tests and strict cloud readbacks remained intact. g4's normal recursive readback supplied complete sanitized outcomes and verified its 43 partial checkpoint files against manifest 39dd75e51c28833328f3ec04c0fb4ceb575ffacc123e2945fa29348bf1c7ecd3, with parent manifest f369a281fe8dc7de013ab12221bdc481f782d5c20feee410a25f7bb0cd7e08b6 and the same Source. No new g4 extraction or replay was needed.
+
+Root authorized a bounded in-memory read of existing g3 artifact 13581839130 only: run 42390108314 / attempt 1, Source 92d0255a2d5c2ac2249941e8348a0d5701742604, ZIP 16487 B / SHA-256 69b6733b03ede840d998ab82c97df7830f5db079680d6dae9bdf82309b59ca78. Central directory: 4 entries, 294017 B declared expansion; only evidence-manifest.json(641B) and same-fence-identity.json(123860B) were inflated, 124501 B total, below 2 MiB ZIP / 4 MiB expansion limits. Manifest SHA-256 80225740b5b55ed1210e7d7898ac75f9f000c8dd1c8c7ba1bf1a3c1f92e71006; selected payload SHA-256 b757a01239159e6555d6cfc47a57d8dae79eba4b6a429a63757141d80493f1b2. ID/run/Source/group/path/bytes/hashes matched. No disk, dependencies, DB/scripts or OAuth values were read/emitted; buffers were zeroed and released.
+
+Recovered facts: original three deliveries, admin_pending, alarm null, restore 0, receipt null, one SQL write, two reconciliations under the same original fence identity, no KV lists/deletes, and no successful receipt. Existing suffixes were identity,reconciled:2,reconciled:3. This records the M3 limitation and recovers already-produced evidence; it does not fix diagnostic volume or count an additional test.
+
+### Final g5 protocol/retention facts
+
+The captured M was canary-first-connection at /mcp, SHA256 c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32, namespace first-connection-oauth, unchanged window ending at original C0=1794069790000. The positive read_project_summary control passed at 1794069700488, with actual POST 200 / POST 202 / GET 405 / POST 200 protocol responses and the expected SYN summary. The post-C0 request at 1794069792622 was POST initialize 404; toolCallAttempted=false. The oracle identified service_window_closed from the exact unchanged flags/window/origin/script and closed response body. D1DenialProved=false; the protocol stopped before a business tool call.
+
+The declared SDK-only script remained 92f6554db082c30e83c6f7ae4700544ee7438f0da349b0dc2d70594d97efe66f, 320211 B. Child logical deadline was 5000 ms; actual retained SDK write lasted 77589 ms from reached to native settlement, with nativeAttempt=C0+2600ms and actual SDK return. Original token/grant expiresAt was C0−1000ms; positive and SDK entry occurred while valid, and its expiry fields and configured TTL were not modified. The late native write retained its originally captured options; physical KV expiration equality was not asserted. MAdmission=false and callbackOmitted=true remain explicit for this adversarial variant. Neither SDK return nor the final HTTP denial is generalized into a global native-drain or production admission claim.
+
+### Full graph and persistence evidence locations
+
+Each lineage's immutable checkpoint contains graphs/metafiles.json, graphs/canary-index.mjs and graphs/qa-index.mjs, plus checkpoint.json and every declared native persistence file. g5 also contains graphs/sdk-only-index.mjs and graphs/sdk-only-metafile.json. The producer prepare-evidence artifact additionally preserves output/t2-native-graphs/<actual-QA-SHA256>/ source graphs/metafiles and the producer logs. verifyCheckpoint compares the complete recursive inventory (paths, lengths and SHA256), requires the exact scripts/metafiles, validates the compiled M/QA against mounted worker options, and does not open native state. Separately, recoverCheckpoint mounts the preserved state and reads the nonexpiring client record through both actual OAUTH_KV aliases as semantic namespace proof. Per-group uploaded readbacks and their lineage manifest hashes are retained below. No graph from a prior revision was substituted.
+
+Native DO/KV/D1, SDK promises and the DB clock are real Miniflare/SQLite executions of this Source; provider inventory/pointers, Source pins, owner/protocol fixtures and terminal Workflow input are explicitly SYN. A local Workflow return does not prove a real provider Workflow terminated. The same original I0/C0/C1, plan, storage paths, namespace identities, scripts/options, native alarm and counter records survive the cold load.
+
+### Coherent final qualification — verified terminal result
+
+[Run 42390108314, attempt 1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42390108314) completed SUCCESS at 2026-11-07T17:01:58Z. Tested Source 92d0255a2d5c2ac2249941e8348a0d5701742604, tree 7c06844f33aeb6d0ce0d75381847b8f40d5a28a9. The [immutable qualifier](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/92d0255a2d5c2ac2249941e8348a0d5701742604/.github/workflows/afw-owner-restoration-qualification.yml) preserves every exact command, selection pattern, expected TAP count, dependency, artifact path and readback assertion. Node 22/current lock used npm ci --ignore-scripts --no-audit --no-fund; contents:read only, no runtime secrets/permissions.
+
+Result: 56 tests / 56 pass / 0 fail / 0 cancelled / 0 skipped / 0 todo, in 16 successful jobs. Eight groups, nine genuine lineages, 19 graphs and 24 artifacts, all from the same Source. No successes from a prior failed or focal run were added. Wall span was 2977 s (49m37s); aggregate job elapsed time 7731 s (128.85 job-minutes), not a billing estimate. Every job stayed below 15 min; maximum observed elapsed time was 829s. This is the only coherent final covering run in this fix round.
+
+| Job | ID | Result / TAP pass | Elapsed seconds |
+|---|---:|---|---:|
+| prepare_g1 | 128455701590 | SUCCESS / 0 | 815 |
+| prepare_g2 | 128455701781 | SUCCESS / 0 | 806 |
+| prepare_g0 | 128455701913 | SUCCESS / 40 | 829 |
+| consume_g2 | 128459093629 | SUCCESS / 2 | 119 |
+| consume_g1 | 128459130424 | SUCCESS / 2 | 168 |
+| consume_g0 | 128459192501 | SUCCESS / 3 | 117 |
+| prepare_g5 | 128459590128 | SUCCESS / 0 | 803 |
+| prepare_g3 | 128459677088 | SUCCESS / 0 | 813 |
+| prepare_g4 | 128459825300 | SUCCESS / 0 | 804 |
+| consume_g5 | 128462941231 | SUCCESS / 1 | 118 |
+| consume_g3 | 128463071778 | SUCCESS / 2 | 235 |
+| consume_g4 | 128463188045 | SUCCESS / 2 | 242 |
+| prepare_g6 | 128464055364 | SUCCESS / 0 | 804 |
+| prepare_g7 | 128464207483 | SUCCESS / 0 | 820 |
+| consume_g6 | 128467399046 | SUCCESS / 3 | 125 |
+| consume_g7 | 128467605065 | SUCCESS / 1 | 113 |
+
+Final g6 repeated all three covering assertions successfully. Matching current exact native read preceded reduction and the receipt's finalFactsHash c1c34f72b4bff6fb68c9130310116ca79f819f430f3286924ade8458f64aeb4c matched the actual observed digest. Inventory entered 1794070867177, completed 1794070867370, receipt observed 1794070867788; all pins/counts and post-SDK ordering assertions passed. The conflicting object remained intact with zero SDK deletes/no successful SDK observation/receipt. Same-actor reentry control and Workflow drift rejection preserved historical bytes, counter, alarm and provider effects. Final g7 held the real SDK ACK for 126 ms, recorded actual normal SDK return, then rejected the active Workflow inventory with no owner/initial receipt or new completion. Original alarm entered at C0=1794070911000; the pending invocation finished 1794070913115. These are native SYN observations, not planted success records.
+
+All producer checkpoint readbacks and consumer evidence readbacks succeeded. g0 additionally preserved fix1-absent-current-grant.json from the SAME principal occurrence; g6 required five payloads; g7 required three. g4 required its declared partial checkpoint directory and recursive manifest. The 24 artifact envelopes below retain detailed logs, scripts, metafiles, native state manifests and sanitized outcomes for 7 days from creation; the durable report records hashes/IDs but does not extend artifact retention.
+
+| Artifact ID | Name | ZIP bytes | SHA-256 |
+|---|---|---:|---|
+| 13583065899 | r2-fix1-final-g7-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10864320 | 4baec2c2750e49656bc8d7e4a64725637a10d2d91582beb4fd6fa4dccdd37c21 |
+| 13582946396 | r2-fix1-final-g6-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 20592 | 89e6e0e6e9a9e82071dd5f93c7de4c8c05b15f20fa1b9ffd74e9ada41155923c |
+| 13582911309 | r2-fix1-final-g7-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243854 | 5fbb52aa7508e01805060fbb27523408adba164adf0bfcb3c6094dd21ca45ef6 |
+| 13582841821 | r2-fix1-final-g7-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 8430 | c855e22fd2f219c31c8260c8a52dd31a672f3f616a76bb82ce861ed076ea6c6d |
+| 13582225238 | r2-green-g2-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10863428 | b1baca0b44a9c7212ee2986ac4585666e6195a87d3209ad21dade38673dc33f4 |
+| 13582220733 | r2-green-g1-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 23888 | e1a236fc82d8f69553292dd55762ca4ad49362b306b4c1bc8e8d2ad84bf73e9b |
+| 13582127956 | r2-green-g3-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243694 | a252b2aad2674ab3d2a114a9a1464bfa93eb26b4c2f00c045437386969642ca1 |
+| 13582127944 | r2-green-g3-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10864509 | cfb357eb56b6ded5432d4137a8d028ed27efd141c805b18bc6ae289d3050023c |
+| 13582106877 | r2-green-g5-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1325652 | 4885f9d3e6618357ff9682a228d63bc4f5df18b908206a21c198f53f6f02df35 |
+| 13581991995 | r2-green-g5-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 11018737 | 319e2d1f3ef89607cd209c21024fd79d1dd77c9c485b089a9b90ffab746899e7 |
+| 13581984073 | r2-green-g4-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10882444 | 8fa4bf7a7991f2ac14b9a6336306a00d337d695d2b45449045e32dc387b9a941 |
+| 13581888542 | r2-green-g4-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243569 | 7a3c5b8adbcdf0ff35cee528ad697127b846875dc779849e4f3fd4e1d2f947e4 |
+| 13581888527 | r2-green-g4-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10864401 | 7326665adf5c453cdece36df94ded3f46965b6167ed4685867e2069477ba2da2 |
+| 13581881074 | r2-green-g1-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 21703221 | f348da2b0aa3ce49a254669f3c851fda54fae96fc7bdc2cd378a4effa9338f8c |
+| 13581839130 | r2-green-g3-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 16487 | 69b6733b03ede840d998ab82c97df7830f5db079680d6dae9bdf82309b59ca78 |
+| 13581816152 | r2-green-g1-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 2484746 | 05fda0616dacf497a888cc7b339e9129e50bd86b7794cb0700db1f5803be3c51 |
+| 13581776471 | r2-green-g2-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10553 | 1dae82bb00b3fa9734552b39a7554a4886b90d044f36aaef73f14bc5aabbdc4a |
+| 13581768742 | r2-green-g5-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 20716 | 85ac3a4413b35d74ea830a56d6888337ea3c610017b9f799f708bc3623477cc1 |
+| 13581614690 | r2-fix1-final-g6-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10844277 | 33c14043b07285bdfa62262df1a0980b8d325c89ed2c5d449e1dbcd7189bc940 |
+| 13581559578 | r2-fix1-final-g6-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243557 | ad95ad41b031726280eeb3c92f15898c7240d2fc1df88753490900208785cdb6 |
+| 13581517110 | r2-green-g2-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243529 | 97a25dc29c18ad398f37777b2ed30b9d11e7657a7b90f6f004fcc5d59d4712d4 |
+| 13581352326 | r2-green-g0-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1247133 | cebd30728287b3a5eca770600a03aeb6847d5a7caec9f21594cd8230c567e0e0 |
+| 13581327491 | r2-green-g0-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10863483 | b06bc1a074869cf2951466f706a85014cc8d478e4104f4fe5cc87882effe89e1 |
+| 13581249389 | r2-green-g0-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 14427 | 55c6f9ecda7a9df3c032dd2a410788f5da047cb7acb3eeb2e8439527252a2c41 |
+
+### Original clocks and same-state lineage manifests
+
+| Group / lineage | I0 ms | C0 ms | C1 ms | Native checkpoint files | Manifest SHA-256 |
+|---|---:|---:|---:|---:|---|
+| g1 / grant-before-link | 1794067967000 | 1794068867000 | 1794069047000 | 40 | 6cfb3705bb375f8b5cc06b9b7cce52e356d315fa26f4b626cdd7ec5e9fcb97a0 |
+| g1 / notice-before-link | 1794068021000 | 1794068921000 | 1794069101000 | 45 | a45040c502ad164aa608bff8e8b191b5c485185778fc43e46808bb7d2c25744c |
+| g2 / principal | 1794067963000 | 1794068863000 | 1794069043000 | 45 | ff72c7dd2493d9a272578d8b4cee8f5f6ccc2126e34ee06b3655c4a3acec33b4 |
+| g0 / principal | 1794067986000 | 1794068886000 | 1794069066000 | 45 | e3c1f619f1d38e92644680854365fc2de9df2e45a6dcdce598c2336526e2a63f |
+| g5 / principal | 1794068890000 | 1794069790000 | 1794069970000 | 47 | ce3753396628840d8ea4798219cb13d78124c421511076779a1711d42e64b464 |
+| g3 / principal | 1794068917000 | 1794069817000 | 1794069997000 | 45 | c9dc9646bf8bb93b73c977d5453fdc675e318616e90937e31dd148d19f750be9 |
+| g4 / principal | 1794068948000 | 1794069848000 | 1794070028000 | 45 | f369a281fe8dc7de013ab12221bdc481f782d5c20feee410a25f7bb0cd7e08b6 |
+| g6 / principal | 1794069965000 | 1794070865000 | 1794071045000 | 41 | 08b327a75522ef7913187c2f89a21a42eaaa603d4a3801d5649bde693272788e |
+| g7 / principal | 1794070011000 | 1794070911000 | 1794071091000 | 45 | 78f3ce3015ddebd37953e37c7d95478211284749bbdb418e199af9f5a904d2ba |
+
+All consumers recovered before their own original C0. Native DB clock and actual alarm signal times are present in each result payload and the primary logs. Unknown restore/fence outcomes retained their original three slots and remained pending; g4's recovered State reached delivery 3 without replaying the already-issued SDK operation. Reentry in g6 was explicitly labeled inspection of the same entry and did not add a scheduled slot. No clocks, production ceilings or grant expiry fields were moved to obtain a pass.
+
+### Warnings, self-review and protected Source closure
+
+Scoped syntax checks and ESLint passed with no ESLint diagnostics. Inherited warnings remain in the primary logs: Node 20-targeted Actions forced to Node 24, npm @esbuild-kit and eslint@9.39.4 deprecations, and Node punycode/url.parse/Buffer deprecations. No dependency upgrade or warning-suppression change was made. No new failed diagnostic occurred after the accepted three-causal-failure RED in this fix round. The complete prior Task2 failure history remains above unchanged.
+
+| Production path | FIX_BASE blob | Tested/final code blob |
+|---|---|---|
+| lib/mcp-qa-finite-owner-cleanup.mjs | 7cb54895677ee67852f7c42013238bfc1e366d93 | 1a5a2583d266179cdd89f799c64199f29044fec5 |
+| lib/mcp-qa-finite-initial-cleanup.mjs | 0a04ae3a4d74c2c7939b1654683054b1d5d751d4 | 0a04ae3a4d74c2c7939b1654683054b1d5d751d4 |
+| lib/mcp-qa-finite-owner-cleanup-records.mjs | 6c751081e22ba6446664014090f8015a65e22407 | 6c751081e22ba6446664014090f8015a65e22407 |
+| lib/mcp-qa-finite-owner-cleanup-journal.mjs | 127e5906891b20d2f08c74a412383b8b7e3ff1e2 | 127e5906891b20d2f08c74a412383b8b7e3ff1e2 |
+| lib/mcp-qa-finite-stage-work.mjs | 068d35c2555c7dc711c487f6021ec572bd3af067 | 068d35c2555c7dc711c487f6021ec572bd3af067 |
+| lib/mcp-qa-finite-preparation-issuer-store.mjs | b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb | b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb |
+
+Only the owner-cleanup production blob changed. The Task1 forward reader body was compared byte-for-byte, and the other five core blobs/modes/types remained exact. Full trees were checked against FIX_BASE, including every outside-scope leaf. Each of the nine implementation/qualification writes had one parent and one permitted path, with independent blob/content/ref readback; no force, CLI/GraphQL/auth workaround, main mutation or local build/test/dependency installation occurred. Main remained 0c9c475b3ebaa970fc11d628b40e50a90cceb727. Local tool use in this round was limited to reading the applicable skills and the separately approved bounded in-memory artifact inspection; no local project files were created.
+
+After terminal evidence verification, qualifier retirement commit 5e2e93090c80bf30c4220f08194c7dda173467fc removed only .github/workflows/afw-owner-restoration-qualification.yml (retired blob 70d566b9d7fbf4c4b0aac9af05f1b29f776a2e86), with parent 92d0255a2d5c2ac2249941e8348a0d5701742604. Independent recursive readback confirmed absence and all 3179 remaining leaves unchanged from the tested tree. Final code HEAD before this report append: 5e2e93090c80bf30c4220f08194c7dda173467fc, tree 099108dfbd8f3b73e3c48175b6c96e3d177da005. Against FIX_BASE, 3175 non-code-change leaves were exact at that point; the following report-only append is the sole additional allowed path. Its full content/blob/ref/tree readback and final HEAD are returned separately to Root, avoiding a self-referential commit hash inside this file.
+
+Self-review covered I1 exact-key qualification before deletion, genuine absence/reference semantics, I2 fixed native inventory after SDK in both caller paths, final-facts commitment, real promise retention/original budgets, original sole restore writer, historical reentry preservation, all original 51 scenarios plus 5 (independent name comparison retained all 15 prior literal names plus principalName and found exactly 5 additions), and complete protected-tree/CAS evidence. Root will perform a fresh scoped review of I1/I2/new breakage against FIX_BASE; this report is not that independent verdict. Minor M1/M2/M3 remain deferred as explicitly authorized. Whole-plan Source remains incomplete; operationalReadiness=false,completePackage=false,PCoff=false,globalNativeDrainVerified=false,sdkNamespaceEmptyVerified=false.
+
+Fix-round implementation status: DONE_WITH_CONCERNS. STOP Source writes after the report's independent readback. No runtime/provider/owner/OAuth-credential operation, promotion, main change, Unit3 or PC-off trial was performed.

~~~~~

### lib/mcp-qa-finite-owner-cleanup.mjs

~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-cleanup.mjs b/lib/mcp-qa-finite-owner-cleanup.mjs
--- a/lib/mcp-qa-finite-owner-cleanup.mjs
+++ b/lib/mcp-qa-finite-owner-cleanup.mjs
@@ -11,21 +11,25 @@
 import {hashFinitePreparationRecord as prepHash,encodeFinitePreparationRecord as prepEncode,hashFinitePolicyEffectIdentity as effectIdentity,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
 import {qualifyFinitePreparationEnrollmentFacts} from './mcp-qa-finite-preparation-enrollment-facts.mjs';
 import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
 import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
 import {qualifyFiniteOwnerSdkBindingFacts} from './mcp-qa-finite-owner-sdk-binding-facts.mjs';
 import {finiteInitialCapsuleBindingsHash} from './mcp-qa-finite-initial-capsule-records.mjs';
 import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
 import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
 import {decodeFiniteInitialUploadRecord as uploadRecord} from './mcp-qa-finite-initial-upload-records.mjs';
 import {qualifyFiniteInitialUploadedVersion} from './mcp-qa-finite-initial-upload-wire.mjs';
-import {qualifyFiniteInitialHistoricalBaseline} from './mcp-qa-finite-historical-source.mjs';
+import {qualifyFiniteInitialHistoricalBaseline,readPrivateQaFiniteHistoricalSource} from './mcp-qa-finite-historical-source.mjs';
+import {readPrivateQaFiniteBootstrap} from './mcp-qa-finite-bootstrap-native.mjs';
+import {readFiniteAfwWorkflowInventory} from './mcp-fixed-terminal-workflows.mjs';
+import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
+import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
 import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
 import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
 import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
 import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
 import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
 import {initialHash as digest} from './mcp-qa-finite-initial-material-records.mjs';
 import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
 import {captureFinitePreparationIssuerContext,createFinitePreparationIssuerJournal} from './mcp-qa-finite-preparation-issuer-journal.mjs';
 import {createFiniteOwnerIssuerProvenanceJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
 import {finiteOwnerSdkCleanupCorrelation} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
@@ -628,20 +632,88 @@
    }else if(method==='delete'){
     if(typeof args[0]!=='string'||!(args[0]===grant||args[0].startsWith(prefix))||deletes>=200)fail();deletes++;
    }else{
     if(args[0]!==grant||canonical(own(args[1]))!==canonical({type:'json'})||gets>=1)fail();gets++;
    }
    return retain(new Promise((resolve,reject)=>{queue.push({method,args,resolve,reject});pump();}));
   }catch(error){stop(error);return Promise.reject(error);}
  };
  return {facet:Object.freeze({list:v=>enqueue('list',[v]),get:(k,v)=>enqueue('get',[k,v]),delete:k=>enqueue('delete',[k])}),facts:()=>({lists,deletes,gets,peak,active,queued:queue.length,failed:failed!==null})};
 }
+// Native SDK1.2.1 storage is qualified before the first destructive operation.
+// Reference expiry is historical: a real exchange may add expiresAt later.
+function qualifyCleanupCurrentGrant(value,s,selector){
+ const sdk=s.records.sdk,i=s.records.issuer.reservation.identity,reference=sdk.reference,send=sdk.operations.sdk_complete.send;
+ if(value===null){if(!reference||reference.sdkGrantId!==selector)fail();return {status:'absent_under_original_reference',referenceHash:reference.recordHash,observedAt:Date.now()};}
+ const v=own(value),required=['id','clientId','userId','scope','metadata','encryptedProps','createdAt'],optional=['expiresAt','refreshTokenId','refreshTokenWrappedKey','previousRefreshTokenId','previousRefreshTokenWrappedKey','authCodeId','authCodeWrappedKey','codeChallenge','codeChallengeMethod','resource','redirectUri'];
+ fields(v,[...required,...optional.filter(k=>Object.hasOwn(v,k))]);
+ const correlationHash=finiteOwnerSdkCleanupCorrelation({root:sdk.root,expectedGrant:sdk.grant,completeSend:send,identity:i});
+ if(v.id!==selector||!/^[A-Za-z0-9_-]{16}$/.test(v.id)||v.userId!==i.subject||v.clientId!==i.clientId||v.resource!==i.resource||canonical(v.scope)!==canonical(sdk.grant.scopes)||canonical(v.metadata)!==canonical({afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}})||!Number.isSafeInteger(v.createdAt)||v.createdAt<Math.floor(send.issuedAt/1000)||v.createdAt*1000>=send.deadline||v.createdAt*1000>Date.now()||reference&&(reference.sdkGrantId!==selector||reference.createdAt!==v.createdAt||reference.correlationHash!==correlationHash))fail();
+ for(const k of ['encryptedProps','redirectUri',...optional.filter(k=>!['expiresAt','resource','redirectUri','codeChallengeMethod'].includes(k)&&Object.hasOwn(v,k))])if(typeof v[k]!=='string'||!v[k].length||v[k].length>16384)fail();
+ if(v.redirectUri.length>4096||Object.hasOwn(v,'codeChallengeMethod')&&!['plain','S256'].includes(v.codeChallengeMethod)||Object.hasOwn(v,'expiresAt')&&(!Number.isSafeInteger(v.expiresAt)||v.expiresAt<=v.createdAt)||reference?.expiresAt!=null&&v.expiresAt!==reference.expiresAt)fail();
+ return {status:'matching_current_native_grant',valueHash:digest('afw.finite-owner-cleanup-current-sdk-grant.v1',v),referenceHash:reference?.recordHash??null,createdAt:v.createdAt,expiresAt:v.expiresAt??null,observedAt:Date.now()};
+}
+// Fixed, private observation after SDK settlement. No caller-supplied inventory,
+// success callback or receipt can replace these native reads.
+async function readCleanupFinalInventory(options,originalLease,s){
+ const life=cleanupLifetime(options,originalLease),{ctx,env,storage,get,reader,publisher,fetcher,child}=life,enteredAt=Date.now(),requests=[];
+ const check=()=>{life.guard();current(originalLease);},p=s.anchors.plan,up='afw.finite-initial-upload.v1:'+p.entryHash+':';
+ const read=key=>child(async l=>{const v=await retain(Reflect.apply(get,storage,[key]));current(l);return v;});
+ const request=(path,cap=4500000,token=reader)=>child(async l=>{
+  let response,stream;
+  try{
+   response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:l.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache, no-store'}}));current(l);
+   const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
+   if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
+   stream=response.body.getReader();const chunks=[];let size=0;
+   for(;;){const v=await retain(stream.read());current(l);if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>cap)fail();chunks.push(v.value);}
+   if(length!==null&&Number(length)!==size)fail();const bytes=Buffer.concat(chunks,size),envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes)),value=finiteCfEnvelope(envelope);
+   requests.push({path,bodyHash:sha(bytes),bytes:size,providerDate:date,observedAt:Date.now()});return {value,info:envelope.result_info};
+  }finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
+ });
+ const getCf=(path,query)=>request(path+(query?'?'+new URLSearchParams(query):''));
+ const custody=[];
+ for(const [token,id,expiry]of [[reader,p.readerId,p.readerExpiresAt],[publisher,p.publisherId,p.publisherExpiresAt]]){
+  const v=(await request('/tokens/verify',8192,token)).value;fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
+  if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiry||expiry<p.C1||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();custody.push({id,expiresAt:expiry,observedAt:Date.now()});
+ }
+ const bootstrap=await retain(readPrivateQaFiniteBootstrap({ctx,env},originalLease));check();
+ const historical=await retain(readPrivateQaFiniteHistoricalSource({ctx,env},originalLease));check();
+ const backup=uploadRecord('Backup',await read(up+'backup'));
+ if(backup.recordHash!==p.manifestHash||historical.artifact.workerHash!==backup.moduleHash||restorationConfigurationHash(historical.configuration)!==backup.configurationHash)fail();
+ const workflow=await retain(readFiniteAfwWorkflowInventory({read:getCf,assertCurrent:check}));check();
+ if(workflow.instances.some(x=>!['complete','errored','terminated'].includes(x.status)))fail();
+ const namespaceId='d6fc71552de7494a863aca20365a572d',active=await getCf('/containers/applications/'+namespaceId+'/instances-v2',{state:'active',per_page:100});
+ if(!Array.isArray(active.value)||active.value.length||!active.info||active.info.per_page!==100||active.info.next_page_token||active.info.page_token)fail();
+ const schedulesAndTails=[],operatorName='agent-friendly-web-release-operator';
+ for(const name of [CANARY,operatorName])for(const part of ['schedules','tails']){
+  const r=await getCf('/workers/scripts/'+name+'/'+part),a=Array.isArray(r.value)?r.value:r.value?.schedules;
+  if(!Array.isArray(a)||a.length||r.info&&(r.info.count!==0||r.info.total_count!==0||r.info.cursor))fail();schedulesAndTails.push({name,part,count:0,observedAt:Date.now()});
+ }
+ const pointer=v=>{const ds=Array.isArray(v)?v:v?.deployments,d=ds?.[0];if(!Array.isArray(ds)||ds.length!==1||!d||!(/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/).test(d.id)||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].percentage!==100)fail();return d;};
+ const op=QA_CLOUD_CLOSED_PINS.operator,opDeployment=pointer((await getCf('/workers/scripts/'+operatorName+'/deployments?per_page=1')).value);
+ if(opDeployment.id!==op.deploymentId||opDeployment.versions[0].version_id!==op.id)fail();
+ const operator=qualifyFiniteWorkerVersion({metadata:(await getCf('/workers/workers/'+operatorName+'/versions/'+op.id+'?include=modules')).value,pin:{versionId:op.id,module:op.module,configurationHash:op.configurationHash},role:'operator',closed:true});
+ const baseline=qualifyFiniteInitialHistoricalBaseline((await getCf('/workers/workers/'+CANARY+'/versions/'+p.baselineVersionId+'?include=modules')).value);
+ if(restorationConfigurationHash(baseline.rawConfiguration)!==backup.rawConfigurationHash||sha(baseline.bytes)!==backup.moduleHash)fail();
+ const parts=[];for(const c of backup.chunks){const chunk=uploadRecord('Chunk',await read(up+'chunk:'+String(c.index).padStart(3,'0')));if(chunk.manifestHash!==backup.recordHash||chunk.index!==c.index||chunk.bytes!==c.bytes||chunk.sha256!==c.sha256)fail();parts.push(Buffer.from(chunk.content,'base64'));}
+ const recovered=Buffer.concat(parts);if(sha(recovered)!==backup.moduleHash||recovered.length!==backup.moduleBytes)fail();
+ const eligible=await getCf('/workers/scripts/'+CANARY+'/versions',{deployable:true,per_page:100,page:1}),items=fields(eligible.value,['items']).items;
+ if(!Array.isArray(items)||items.length>100||!eligible.info||eligible.info.page!==0||eligible.info.per_page!==100||eligible.info.count!==items.length||eligible.info.total_count!==items.length||eligible.info.total_pages!==undefined||eligible.info.cursor)fail();
+ const ids=new Set();let previous=Infinity;
+ for(const row of items){if(typeof row.id!=='string'||ids.has(row.id)||!Number.isSafeInteger(row.number)||row.number<1||row.number>=previous)fail();ids.add(row.id);previous=row.number;}
+ if(!ids.has(p.baselineVersionId)||await read('afw.qa-finite-trial.v1:head')!==undefined)fail();
+ const restored=pointer((await getCf('/workers/scripts/'+CANARY+'/deployments?per_page=1')).value);
+ if(restored.id!==s.anchors.records['restore-ack'].deploymentId||restored.versions[0].version_id!==p.baselineVersionId||restored.annotations?.['workers/message']!=='afw-finite-initial-restore-'+p.recordHash)fail();check();
+ const {script,...artifact}=historical.artifact;void script;
+ return frozen({purpose:'afw.finite-owner-cleanup-final-inventory.v1',enteredAt,observedAt:Date.now(),custody,bootstrap:{recordHash:bootstrap.recordHash,tagSha:bootstrap.tagSha,sourceRevision:bootstrap.record.sourceRevision,sourceTree:bootstrap.record.sourceTree,primaryEvidence:bootstrap.primaryEvidence,currentPointer:bootstrap.currentPointer,observedAt:bootstrap.observedAt},historical:{artifact,factsHash:sha(canonical(historical)),observedAt:historical.observedAt},workflow,container:{namespaceId,activeCount:0},schedulesAndTails,operator:{...operator,deploymentId:opDeployment.id},baseline:{versionId:p.baselineVersionId,deploymentId:restored.id,moduleHash:backup.moduleHash,moduleBytes:backup.moduleBytes,configurationHash:backup.configurationHash,rawConfigurationHash:backup.rawConfigurationHash,backupHash:backup.recordHash,eligibleVersionIds:[...ids],recoverable:true},requests});
+}
 function closedFacts(s){
  const i=s.records.issuer.reservation?.identity;
  if(i){
   const row=s.issuerRows.fence;
   if(!row?.fenced_at||!row.fence_request_id||s.issuerRows.grant&&!s.issuerRows.grant.revoked_at)fail();
   for(const op of ['close_fence','revoke_grant']){const v=s.records.issuer.operations[op];if(v.send&&!v.ack)fail();}
   if(s.noticeRows.events.length&&s.noticeRows.withdrawals?.length!==1)fail();
  }
  if(!s.physical.isRestored||!s.anchors.records['restore-send']||!s.anchors.records['restore-ack'])fail();
 }
@@ -673,35 +745,38 @@
      for(const v of result.items)if(canonical(v.metadata)===canonical({afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}})){
       if(found||typeof v.id!=='string'||!/^[A-Za-z0-9_-]{16}$/.test(v.id)||v.userId!==i.subject||v.clientId!==i.clientId||v.resource!==i.resource||canonical(v.scope)!==canonical(sdk.grant.scopes)||!Number.isSafeInteger(v.createdAt)||v.createdAt<Math.floor(sdk.operations.sdk_complete.send.issuedAt/1000)||v.createdAt*1000>=sdk.operations.sdk_complete.send.deadline)fail();found=v.id;
      }cursor=result.cursor;
     }while(cursor!==undefined);
     if(!found)fail();return found;
    });
   }
   if(op.observed){if(op.observed.outcome!=='returned')fail();sdkFact={status:'historical_normal',sendHash:op.send.recordHash,observedHash:op.observed.recordHash};}
   else await child(async(l,end)=>{
    const check=()=>{life.guard();current(l);},bounded=reductionKv(life.alias,life.methods,i.subject,selector,check);
+   const value=await retain(bounded.facet.get('grant:'+i.subject+':'+selector,{type:'json'}));check();
+   const currentGrant=qualifyCleanupCurrentGrant(value,s,selector);check();
    const send=purpose('Send',{identityHash:r.id.recordHash,operation:'sdk_revoke',requestId:randomUUID(),requestHash:digest('afw.finite-owner-cleanup-sdk-request.v1',{identityHash:i.identityHash,selector,subject:i.subject,correlationHash:finiteOwnerSdkCleanupCorrelation({root:sdk.root,expectedGrant:sdk.grant,completeSend:sdk.operations.sdk_complete.send,identity:i})}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
    recorded(await journal.appendSend({...key,record:send},l));check();
    const api=new OAuthAuthorizationServer({issuer:s.sourceBase.origin,resources:[i.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:bounded.facet}));
    const actual=retain(api.revokeGrant(selector,i.subject));await actual;check();
    const metrics=bounded.facts();if(metrics.active||metrics.queued||metrics.failed)fail();
-   sdkFact={status:'returned',selectorHash:sha(selector),metrics};
+   sdkFact={status:'returned',selectorHash:sha(selector),currentGrant,metrics};
    const observed=purpose('Observed',{sendHash:send.recordHash,resultHash:digest('afw.finite-owner-cleanup-sdk-result.v1',sdkFact),outcome:'returned',observedAt:Date.now()});
    recorded(await journal.appendObserved({...key,operation:'sdk_revoke',record:observed},l));
   });
  }else if(op.send)fail();
+ const inventory=await readCleanupFinalInventory(options,originalLease,s);
  const final=await readPrivateQaFiniteOwnerCleanup(options,originalLease);sameCycle(s,final);closedFacts(final);
  const finalJournal=await child(l=>journal.read(key,l));
  for(const op of Object.values(finalJournal.operations))if(op.send&&!op.observed)fail();
  const rs=final.anchors.records['restore-send'],ra=final.anchors.records['restore-ack'];
- const record=finalJournal.receipt??purpose('Receipt',{identityHash:r.id.recordHash,planHash:r.id.planHash,fenceHash:digest('afw.finite-owner-cleanup-fence-facts.v1',r.fenceFact),grantFactHash:digest('afw.finite-owner-cleanup-grant-facts.v1',r.grantFact),noticeFactHash:digest('afw.finite-owner-cleanup-notice-facts.v1',r.noticeFact),sdkSendHash:finalJournal.operations.sdk_revoke.send?.recordHash??null,sdkObservedHash:finalJournal.operations.sdk_revoke.observed?.recordHash??null,restoreSendHash:rs.recordHash,restoreAckHash:ra.recordHash,baselineVersionId:final.anchors.plan.baselineVersionId,baselineDeploymentId:ra.deploymentId,finalFactsHash:digest('afw.finite-owner-cleanup-final-facts.v1',{final,sdkFact,observedAt:Date.now()}),observedAt:Date.now(),businessAccessClosed:true,sdkReductionReturned:!!sdk.operations.sdk_complete.send,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
+ const record=finalJournal.receipt??purpose('Receipt',{identityHash:r.id.recordHash,planHash:r.id.planHash,fenceHash:digest('afw.finite-owner-cleanup-fence-facts.v1',r.fenceFact),grantFactHash:digest('afw.finite-owner-cleanup-grant-facts.v1',r.grantFact),noticeFactHash:digest('afw.finite-owner-cleanup-notice-facts.v1',r.noticeFact),sdkSendHash:finalJournal.operations.sdk_revoke.send?.recordHash??null,sdkObservedHash:finalJournal.operations.sdk_revoke.observed?.recordHash??null,restoreSendHash:rs.recordHash,restoreAckHash:ra.recordHash,baselineVersionId:final.anchors.plan.baselineVersionId,baselineDeploymentId:ra.deploymentId,finalFactsHash:digest('afw.finite-owner-cleanup-final-facts.v1',{final,sdkFact,inventory,observedAt:Date.now()}),observedAt:Date.now(),businessAccessClosed:true,sdkReductionReturned:!!sdk.operations.sdk_complete.send,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
  if(record.identityHash!==r.id.recordHash||record.planHash!==r.id.planHash||record.restoreSendHash!==rs.recordHash||record.restoreAckHash!==ra.recordHash||record.baselineVersionId!==final.anchors.plan.baselineVersionId||record.baselineDeploymentId!==ra.deploymentId||record.sdkSendHash!==(finalJournal.operations.sdk_revoke.send?.recordHash??null)||record.sdkObservedHash!==(finalJournal.operations.sdk_revoke.observed?.recordHash??null)||record.sdkReductionReturned!==!!sdk.operations.sdk_complete.send)fail();
  if(!finalJournal.receipt)recorded(await child(l=>journal.finish({...key,record},l)));
  const readback=await child(l=>journal.read(key,l));if(canonical(readback.receipt)!==canonical(record))fail();
  life.guard();r.state='finished';const opaque=Object.freeze({});
  receipts.set(opaque,{ctx,env,originalLease,guard:r.guard,record,consumed:false});return opaque;
 }
 export function consumePrivateQaFiniteOwnerCleanup(receipt,{ctx,env},originalLease){
  const r=receipts.get(receipt);if(!r||r.consumed||r.ctx!==ctx||r.env!==env||r.originalLease!==originalLease)fail();r.guard();r.consumed=true;
  return frozen({status:'CURRENT_CYCLE_BUSINESS_CLOSED',record:r.record,operationalReadiness:false});
 }

~~~~~

### test/fixtures/finite-owner-cleanup-persistence.mjs

~~~~~diff
diff --git a/test/fixtures/finite-owner-cleanup-persistence.mjs b/test/fixtures/finite-owner-cleanup-persistence.mjs
--- a/test/fixtures/finite-owner-cleanup-persistence.mjs
+++ b/test/fixtures/finite-owner-cleanup-persistence.mjs
@@ -23,21 +23,25 @@
  const manifest=JSON.parse(await readFile(join(root,'manifest.json'),'utf8'));
  assert.equal(manifest.purpose,'afw.owner-cleanup-checkpoint.syn.v1');assert.equal(manifest.source,source);
  assert.equal(manifest.operationalReadiness,false);assert.equal(manifest.completePackage,false);assert.equal(manifest.PCoff,false);
  const actual=(await inventory(root)).filter(f=>f.path!=='manifest.json');assert.deepEqual(actual,manifest.files);
  for(const [kind,pattern]of [['D1',/state\/.*d1\/.*\.sqlite$/],['DO',/state\/.*do\/.*qa-first-connection.*\.sqlite$/],['KV',/state\/.*kv\/.*\.sqlite$/]])assert(actual.some(f=>pattern.test(f.path)),'native persisted '+kind+' sqlite required');
  for(const name of ['graphs/metafiles.json','graphs/canary-index.mjs','graphs/qa-index.mjs','checkpoint.json'])assert(actual.some(f=>f.path===name),'required evidence '+name);
  const data=JSON.parse(await readFile(join(root,'checkpoint.json'),'utf8'));
  assert.equal(data.plan.C0,data.plan.I0+900000);assert.equal(data.plan.C1,data.plan.C0+180000);if(data.checkpointKind==='partial-cleanup'){assert.equal(data.facts.alarm,data.plan.C0+60000);assert.equal(JSON.parse(data.facts.rows.find(([k])=>k===P+'state')[1]).deliveries,1);}else assert.equal(data.facts.alarm,data.plan.C0);
  if(data.checkpointKind!=='partial-cleanup')assert.equal(data.facts.signal.entered,0);assert.equal(data.state.nowOffset,0);assert.equal(data.modeledProviderInput.label,'MODELED PROVIDER INPUT');
  const qa=data.options.workers.find(w=>w.name==='qa-first-connection'),m=data.options.workers.find(w=>w.name==='canary-first-connection');
- if(data.variant!=='grant-before-link'){
+ if(data.unexchanged){
+  const ref=JSON.parse(data.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),actual=data.sdkUnexchanged;assert(actual);
+  assert.equal(actual.referenceHash,ref.recordHash);assert.equal(actual.selectorHash,sha(ref.sdkGrantId));assert.equal(actual.referenceExpiresAt,null);assert.equal(ref.expiresAt,null);
+  assert.equal(data.sdkAfterExchange,null);assert.equal(data.lateToken,null);assert.equal(actual.codeExchanged,false);assert(actual.nativeKVExpiration*1000>data.plan.C0+120000);assert(actual.observedAt<data.plan.C0);
+ }else if(data.variant!=='grant-before-link'){
   const ref=JSON.parse(data.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),actual=data.sdkAfterExchange;assert(actual);
   assert.equal(actual.referenceHash,ref.recordHash);assert.equal(actual.selectorHash,sha(ref.sdkGrantId));assert.equal(actual.correlationHash,ref.correlationHash);
   assert.equal(actual.referenceExpiresAt,null);assert.equal(ref.expiresAt,null);assert(Number.isSafeInteger(actual.expiresAt));assert(Number.isSafeInteger(actual.tokenExpiresAt));
   assert.equal(data.sdkBeforeExchange.referenceHash,ref.recordHash);assert(Number.isSafeInteger(data.sdkBeforeExchange.nativeKVExpiration));
   if(!data.sdkOnlyBuild)assert(actual.expiresAt*1000<=data.plan.C0);
  }
  assert.equal(data.options.resourcePersistencePath,'$NATIVE_STATE');
  assert.equal(qa.kvNamespaces.AFW_FINITE_OWNER_OAUTH_KV,'first-connection-oauth');assert.equal(m.kvNamespaces.OAUTH_KV,'first-connection-oauth');
  assert.equal(data.kvProof.namespaceId,'first-connection-oauth');assert.equal(data.kvProof.expires,false);assert.equal(sha(data.kvProof.key),data.kvProof.keyHash);
  assert.equal(sha(qa.script),data.build.QA.sha256);assert.equal(sha(m.script),data.build.M.sha256);
@@ -55,61 +59,75 @@
  return {manifest,data};
 }
 function portableOptions(options,persist){
  return JSON.parse(JSON.stringify(options,(key,value)=>{
   if(key==='outboundService'){assert.equal(typeof value,'function');return undefined;}
   if(key==='resourcePersistencePath'){assert.equal(value,persist);return '$NATIVE_STATE';}
   assert.notEqual(typeof value,'function','unrecognized executable checkpoint field '+key);
   return value;
  }));
 }
-export async function produceCheckpoint(root,{variant='principal',deferWait=false,sdkOnly=false}={}){
+export async function produceCheckpoint(root,{variant='principal',deferWait=false,sdkOnly=false,unexchanged=false}={}){
  assert(['principal','grant-before-link','notice-before-link'].includes(variant));
  const started=Number(process.env.AFW_JOB_STARTED_MS);assert(Number.isSafeInteger(started));
  assert(Date.now()-started<=90000,'do not open I0 without original 13min plus export margin');
  let f;
  try{
   f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true});
   if(sdkOnly){
    assert.equal(variant,'principal');const extra=await compileCleanupSdkOnlyWorker();await f.mountCleanupSdkOnly(extra);f.cleanupSdkOnly=true;
    const initial=await plain(f.stub.ownerCleanupFacts()),original=JSON.parse(initial.rows.find(([k])=>k===P+'plan')[1]);
    assert(Date.now()<original.C0-300000,'late producer must wait without a live Root');
    f.cleanupOriginalIdentityToken=await f.enrollmentToken(f.source);
    await waitUntil(original.C0-300000);
    f.sdkOnlyBuild={worker:'sdk-only-first-connection',sha256:extra.sha256,bytes:extra.bytes,inputs:Object.keys(extra.metafile.inputs),callbackOmitted:true,MAdmission:false,accessTokenTTL:300,refreshTokenTTL:0,namespaceId:'first-connection-oauth'};
    const graphRoot='output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256;
    await writeFile(graphRoot+'/sdk-only-index.mjs',extra.script);await writeFile(graphRoot+'/sdk-only-metafile.json',json(extra.metafile));
   }
+  if(unexchanged){
+   assert.equal(sdkOnly,false);assert.equal(variant,'principal');
+   const initial=await plain(f.stub.ownerCleanupFacts()),original=JSON.parse(initial.rows.find(([k])=>k===P+'plan')[1]);
+   assert(Date.now()<original.C0-300000,'unexchanged producer waits outside a live Root');f.cleanupOriginalIdentityToken=await f.enrollmentToken(f.source);
+   await waitUntil(original.C0-300000);
+  }
   const prepared=await prepareOwnerReference(f);
   if(variant==='grant-before-link')await f.stub.ownerCleanupFault(variant);
   const response=await prepared.issue();
   if(variant==='grant-before-link'){
    assert.notEqual(response.status,302);await response.body?.cancel();
    const rows=await plain(f.stub.snapshot()),native=await plain(f.stub.ownerCleanupNativeRows());assert(native.grant);assert(!rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':grant')));
-  }else{assert.equal(response.status,302);await assertActualComplete(f,{reference:true});await downstreamOwnerReference(f,response,prepared,{cleanupPartial:variant==='notice-before-link'});}
+  }else{
+   assert.equal(response.status,302);const completed=await assertActualComplete(f,{reference:true});
+   if(unexchanged){
+    await response.body?.cancel();const ref=completed.reference,native=await plain(f.stub.ownerCleanupNativeRows()),key='grant:'+native.grant.user_id+':'+ref.sdkGrantId;
+    const raw=await f.kv.get(key),value=JSON.parse(raw),listed=await f.kv.list({prefix:key,limit:1});
+    assert.equal(value.id,ref.sdkGrantId);assert.equal(value.expiresAt,undefined);assert.equal(listed.keys.length,1);assert.equal(listed.keys[0].name,key);assert(Number.isSafeInteger(listed.keys[0].expiration));
+    f.sdkUnexchanged={label:'genuine original SDK authorization code, never exchanged; unchanged native TTL600',codeExchanged:false,referenceHash:ref.recordHash,selectorHash:sha(ref.sdkGrantId),referenceExpiresAt:ref.expiresAt,createdAt:value.createdAt,nativeKVExpiration:listed.keys[0].expiration,grantObjectHash:sha(raw),observedAt:Date.now()};
+   }else await downstreamOwnerReference(f,response,prepared,{cleanupPartial:variant==='notice-before-link'});
+  }
   const partialBoundary=variant==='principal'?null:await plain(f.stub.ownerCleanupFaultFacts());if(partialBoundary)assert.equal(partialBoundary.sqlWrites,1);
   await f.stub.ownerCleanupReset();
   await recordOwnerReference(f,'r2-produced-'+variant);
   await f.stub.ownerReferenceControl('released');await f.stub.firstConnectionRestore();await f.stub.restoreMethods();
   const facts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(facts.rows.find(([k])=>k===P+'plan')[1]);
   assert.equal(facts.signal.entered,0);assert.equal(facts.alarm,plan.C0);assert(facts.dbNow<plan.C0);assert(Math.abs(facts.dbNow-facts.wall)<=1000);
   assert(plan.C0-120000<started+870000,'original checkpoint wait must fit job budget');
-  if(variant!=='grant-before-link')assert(facts.rows.some(([k])=>k.endsWith(':reference')));assert.equal(facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')),variant==='principal');
+  if(variant!=='grant-before-link')assert(facts.rows.some(([k])=>k.endsWith(':reference')));assert.equal(facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')),variant==='principal'&&!unexchanged);
   // MODELED PROVIDER INPUT, not evidence of actual Cloudflare Workflow termination.
   f.inventoryMode='terminal';
   const input=f.cleanupCheckpointInputs();input.state.inventoryMode='terminal';
   input.state.providerRegistry.versions[plan.baselineVersionId]=structuredClone(input.factory.x.metadata);
   input.state.cleanupRestorePlan=plan;
   const clientKey='client:'+f.source.clientId,client=await f.kv.get(clientKey);assert.equal(typeof client,'string');assert.equal(JSON.parse(client).clientId,f.source.clientId);
   const kvProof={purpose:'afw.same-oauth-kv-client.syn.v1',key:clientKey,keyHash:sha(clientKey),valueHash:sha(client),expires:false,namespaceId:'first-connection-oauth'};
-  const data={purpose:'afw.owner-cleanup-persisted-facts.syn.v1',plan,facts,kvProof,variant,partialBoundary,lateToken:f.cleanupToken??null,sdkBeforeExchange:f.sdkBeforeExchange??null,sdkAfterExchange:f.sdkAfterExchange??null,sdkOnlyBuild:f.sdkOnlyBuild??null,options:portableOptions(input.currentMountedOptions,input.persist),factory:input.factory,state:input.state,build:f.firstConnectionBuild,modeledProviderInput:{label:'MODELED PROVIDER INPUT',bootstrapStatus:'complete',recordedAt:Date.now(),realWorkflowTerminationProved:false}};
-  if(sdkOnly)assert(Date.now()<plan.C0-120000,'g5 genuine notice/link must finish before original export');
+  const data={purpose:'afw.owner-cleanup-persisted-facts.syn.v1',plan,facts,kvProof,variant,unexchanged,sdkUnexchanged:f.sdkUnexchanged??null,partialBoundary,lateToken:f.cleanupToken??null,sdkBeforeExchange:f.sdkBeforeExchange??null,sdkAfterExchange:f.sdkAfterExchange??null,sdkOnlyBuild:f.sdkOnlyBuild??null,options:portableOptions(input.currentMountedOptions,input.persist),factory:input.factory,state:input.state,build:f.firstConnectionBuild,modeledProviderInput:{label:'MODELED PROVIDER INPUT',bootstrapStatus:'complete',recordedAt:Date.now(),realWorkflowTerminationProved:false}};
+  if(sdkOnly||unexchanged)assert(Date.now()<plan.C0-120000,'late genuine producer must finish before original export');
   await f.mf.dispose();f.disposedForCheckpoint=true;
   await mkdir(root,{recursive:true});await cp(input.persist,join(root,'state'),{recursive:true,errorOnExist:true,force:false});
   await cp('output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256,join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
   await writeFile(join(root,'checkpoint.json'),json(data));
   const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:plan.I0,C0:plan.C0,C1:plan.C1,files,nativeClock: facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false};
   await writeFile(join(root,'manifest.json'),json(manifest));await verifyCheckpoint(root);
   console.info('R2 checkpoint produced',json({source:manifest.source,I0:plan.I0,C0:plan.C0,C1:plan.C1,nativeDbNow:facts.dbNow,files:files.length,manifestSha256:sha(await readFile(join(root,'manifest.json'))),modeledProviderInput:data.modeledProviderInput}));
   await f.cleanup();if(!deferWait)await waitUntil(plan.C0-120000);
   assert(Date.now()<started+885000,'export/upload margin exhausted');
   return manifest;
@@ -146,33 +164,33 @@
   return f;
  }catch(error){await mf.dispose();throw error;}
 }
 export async function observeOriginalAlarm(f,{settled=1}={}){
  const until=f.plan.C1;
  for(;;){const signal=await plain(f.stub.ownerCleanupSignal());if(signal.settled>=settled){assert(signal.at>=f.plan.C0);return await plain(f.stub.ownerCleanupFacts());}assert(Date.now()<until,'original native alarm observation deadline');await pause(250);}
 }
 export async function writeCleanupEvidence(name,value){await mkdir('output/owner-cleanup',{recursive:true});await writeFile('output/owner-cleanup/'+name+'.json',json(value));}
 
 export async function produceGroup(group,root){
- assert(['g0','g1','g2','g3','g4','g5'].includes(group));await mkdir(root,{recursive:true});
+ assert(['g0','g1','g2','g3','g4','g5','g6','g7'].includes(group));await mkdir(root,{recursive:true});
  const variants=group==='g1'?['grant-before-link','notice-before-link']:['principal'],lineages=[];
- for(const variant of variants){const manifest=await produceCheckpoint(join(root,variant),{variant,deferWait:true,sdkOnly:group==='g5'});lineages.push({variant,path:variant,I0:manifest.I0,C0:manifest.C0,C1:manifest.C1,files:manifest.files.length});}
+ for(const variant of variants){const manifest=await produceCheckpoint(join(root,variant),{variant,deferWait:true,sdkOnly:group==='g5',unexchanged:group==='g6'});lineages.push({variant,path:variant,I0:manifest.I0,C0:manifest.C0,C1:manifest.C1,files:manifest.files.length});}
  const data={purpose:'afw.owner-cleanup-group.syn.v1',group,source:process.env.GITHUB_SHA,lineages,graphs:lineages.length*2+(group==='g5'?1:0),maxConcurrentNative:group==='g0'?1:2,operationalReadiness:false,PCoff:false};
  await writeFile(join(root,'group.json'),json(data));await waitUntil(Math.min(...lineages.map(l=>l.C0))-120000);
  assert(Date.now()<Number(process.env.AFW_JOB_STARTED_MS)+885000,'group export margin exhausted');console.info('R2 group checkpoint',json(data));
 }
 export async function verifyGroup(root){
  const data=JSON.parse(await readFile(join(root,'group.json'),'utf8'));assert.equal(data.source,process.env.GITHUB_SHA);
- assert(['g0','g1','g2','g3','g4','g5'].includes(data.group));
+ assert(['g0','g1','g2','g3','g4','g5','g6','g7'].includes(data.group));
  assert.deepEqual(data.lineages.map(l=>l.path),data.group==='g1'?['grant-before-link','notice-before-link']:['principal']);
  assert.equal(data.graphs,data.lineages.length*2+(data.group==='g5'?1:0));
- for(const l of data.lineages){const {manifest,data:checkpoint}=await verifyCheckpoint(join(root,l.path));assert.equal(!!checkpoint.sdkOnlyBuild,data.group==='g5');assert.equal(manifest.I0,l.I0);assert.equal(manifest.C0,l.C0);assert.equal(manifest.C1,l.C1);}
+ for(const l of data.lineages){const {manifest,data:checkpoint}=await verifyCheckpoint(join(root,l.path));assert.equal(!!checkpoint.sdkOnlyBuild,data.group==='g5');assert.equal(!!checkpoint.unexchanged,data.group==='g6');assert.equal(manifest.I0,l.I0);assert.equal(manifest.C0,l.C0);assert.equal(manifest.C1,l.C1);}
  return data;
 }
 export async function persistPartialCleanup(f,root){
  const facts=await plain(f.stub.ownerCleanupFacts()),state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]);assert.equal(state.deliveries,1);assert.notEqual(state.status,'complete');assert.equal(facts.alarm,f.plan.C0+60000);
  const data={...f.checkpoint,facts,checkpointKind:'partial-cleanup',state:Object.fromEntries(Object.keys(f.checkpoint.state).map(k=>[k,structuredClone(f[k])]))};
  assert(data.state.nowOffset===0);await f.mf.dispose();f.disposed=true;
  await mkdir(root,{recursive:true});await cp(join(f.directory,'state'),join(root,'state'),{recursive:true,errorOnExist:true,force:false});
  await cp(join(process.env.AFW_R2_CHECKPOINT??'output/owner-cleanup/checkpoint-g4','principal','graphs'),join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
  await writeFile(join(root,'checkpoint.json'),json(data));
  const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,files,nativeClock:facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false,parentManifestSha256:f.recovery.manifestSha256};

~~~~~

### test/fixtures/finite-owner-cleanup.mjs

~~~~~diff
diff --git a/test/fixtures/finite-owner-cleanup.mjs b/test/fixtures/finite-owner-cleanup.mjs
--- a/test/fixtures/finite-owner-cleanup.mjs
+++ b/test/fixtures/finite-owner-cleanup.mjs
@@ -7,57 +7,69 @@
 import {initialEntryHarness} from './finite-initial-entry-world.mjs';
 import {plain,approveFirstConnection,readFirstConnectionProbe} from './finite-first-connection-publication.mjs';
 import {sealFiniteOwnerIssuerProvenanceRecord as seal} from '../../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';
 import {sealFinitePreparationIssuerRecord as issuerSeal} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
 export const O='https://delegated-canary.agentfriendlyweb.dev';
 export function extendFiniteOwnerCleanup(entry){
  const methods="\n async ownerReferenceConfigure(mode='normal'){\n  this.ownerReferenceRestore?.();const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,s=this.ctx.storage,native={get:kv.get,list:kv.list,put:kv.put,storageGet:s.get,sync:s.sync,transaction:s.transaction};\n  const state=this.ownerReferenceState={mode,completeWrites:0,completeNormal:0,lists:0,gets:0,active:0,peak:0,held:false,released:false,actualSettled:false,abort:false,referenceCommits:0,referenceSyncs:0,referenceReadbacks:0,requests:[],children:[],trace:[]};globalThis.__r1ReferenceState=state;let referencePending=false;\n  const held=value=>{state.held=true;return new Promise(resolve=>{const tick=()=>{if(state.released){state.actualSettled=true;resolve(value);return;}setTimeout(tick,10);};tick();});};\n  this.ownerReferenceRestore=()=>{kv.get=native.get;kv.list=native.list;kv.put=native.put;s.get=native.storageGet;s.sync=native.sync;s.transaction=native.transaction;globalThis.__r1ReferenceState=null;};\n  kv.put=async(key,raw,...more)=>{\n   if(!key.startsWith('grant:'))return Reflect.apply(native.put,kv,[key,raw,...more]);\n   state.completeWrites++;state.trace.push('actual-grant-put');\n   if(mode==='foreign-metadata'){const value=JSON.parse(raw);value.metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'f'.repeat(64)}};raw=JSON.stringify(value);}\n   const actual=Reflect.apply(native.put,kv,[key,raw,...more]),result=await actual;\n   if(mode==='duplicate'){const value=JSON.parse(raw),id=value.id==='AAAAAAAAAAAAAAAA'?'BBBBBBBBBBBBBBBB':'AAAAAAAAAAAAAAAA';value.id=id;await Reflect.apply(native.put,kv,[key.slice(0,key.lastIndexOf(':')+1)+id,JSON.stringify(value),...more]);}\n   return result;\n  };\n  for(const method of ['get','list'])kv[method]=async(...args)=>{\n   const grant=method==='get'?String(args[0]).startsWith('grant:'):String(args[0]?.prefix).startsWith('grant:');\n   if(!grant)return Reflect.apply(native[method],kv,args);\n   state[method==='get'?'gets':'lists']++;if(method==='list'){if(args[0].limit!==100)throw Error('SYN native list limit');state.nativeListLimit=args[0].limit;}state.active++;state.peak=Math.max(state.peak,state.active);\n   const actual=Reflect.apply(native[method],kv,args);let value;try{value=await actual;state.trace.push('actual-'+method+'-settled');}finally{state.active--;}\n   // Held outward ACK chain AFTER native settlement; not physical KV latency.\n   if(method==='list'&&mode==='hold-lookup-ack'&&!state.held)return held(value);\n   return value;\n  };\n  s.transaction=(callback,...args)=>{\n   let wrote=false;const actual=Reflect.apply(native.transaction,s,[async tx=>{\n    const put=tx.put;tx.put=async(key,raw,...rest)=>{const value=await Reflect.apply(put,tx,[key,raw,...rest]);if(String(key).endsWith(':reference')){referencePending=true;wrote=true;state.trace.push('reference-put-native-settled');}return value;};return callback(tx);\n   },...args]);\n   return actual.then(value=>{if(wrote){state.referenceCommits++;state.trace.push('reference-transaction-native-settled');}return value;});\n  };\n  s.get=async(...args)=>{const value=await Reflect.apply(native.storageGet,s,args);if(String(args[0]).endsWith(':reference')&&value!==undefined&&state.referenceSyncs){state.referenceReadbacks++;state.trace.push('reference-readback-native-settled');}return value;};\n  s.sync=async(...args)=>{const actual=Reflect.apply(native.sync,s,args),value=await actual;if(referencePending){referencePending=false;state.referenceSyncs++;state.trace.push('reference-sync-native-settled');if(mode==='unknown-reference')throw Error('SYN reference sync ACK unknown');if(mode==='abort-reference-sync-ack')return held(value);}return value;};\n }\n async ownerReferenceObserve(signalsOnly=false){if(typeof signalsOnly!=='boolean')throw Error('SYN fixed signal projection');const state=this.ownerReferenceState??{};if(signalsOnly)return {held:state.held===true,actualSettled:state.actualSettled===true};return {...state,rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})]};}\n async ownerReferenceControl(key){if(!['released','abort'].includes(key))throw Error('SYN control');this.ownerReferenceState[key]=true;}\n async ownerReferenceFetch(request,forward){\n  const state=this.ownerReferenceState;if(!state||request.url!=='https://afw-private.invalid/_finite-owner/authorize')return forward(request);\n  const began=performance.now(),startedAt=Date.now(),method=request.headers.get('x-afw-finite-original-method'),boundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));const controller=new AbortController(),abort=()=>controller.abort();request.signal.addEventListener('abort',abort,{once:true});let done=false,timer;\n  const tick=()=>{if(done)return;if(state.abort){controller.abort();return;}timer=setTimeout(tick,10);};tick();\n  try{const response=await forward(new Request(request,{signal:controller.signal}));state.trace.push('native-authorize-response:'+response.status);return response;}finally{state.requests.push({method,startedAt,elapsedMs:performance.now()-began,wallElapsedMs:Date.now()-startedAt,budgetMs:boundary.deadline-boundary.startedAt,aborted:controller.signal.aborted});done=true;clearTimeout(timer);request.signal.removeEventListener('abort',abort);}\n }\n";
 
  const cleanupMethods=String.raw`
  async ownerCleanupFault(mode){
-  if(!['normal','grant-before-link','notice-before-link','fence-ack-lost','held-sdk-delete','paging-scope'].includes(mode))throw Error('SYN fixed cleanup fault');
+  if(!['normal','grant-before-link','notice-before-link','fence-ack-lost','held-sdk-delete','paging-scope','inventory-drift'].includes(mode))throw Error('SYN fixed cleanup fault');
   this.ownerCleanupFaultRestore?.();
-  const db=this.env.RELEASE_DB,session=db.withSession,kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,del=kv.delete,list=kv.list;
-  const state=this.cleanupFaultState={mode,sqlWrites:0,sqlCalls:0,sqlElapsedMs:0,reconciles:0,lists:0,deletes:0,held:false,released:false,settled:false,scopeProbe:null,trace:[]};
-  this.ownerCleanupFaultRestore=()=>{db.withSession=session;kv.delete=del;kv.list=list;};
+  const db=this.env.RELEASE_DB,session=db.withSession,kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,del=kv.delete,list=kv.list,get=kv.get;
+  const state=this.cleanupFaultState={mode,sqlWrites:0,sqlCalls:0,sqlElapsedMs:0,reconciles:0,lists:0,deletes:0,grantReads:[],held:false,released:false,settled:false,scopeProbe:null,trace:[]};
+  this.ownerCleanupFaultRestore=()=>{db.withSession=session;kv.delete=del;kv.list=list;kv.get=get;};
   db.withSession=(...a)=>{
    const s=Reflect.apply(session,db,a),prepare=s.prepare;
    s.prepare=(sql,...rest)=>{
     if(sql.includes('SELECT f.*'))state.reconciles++;
     const stmt=Reflect.apply(prepare,s,[sql,...rest]),bind=stmt.bind;
     stmt.bind=(...values)=>{
      const bound=Reflect.apply(bind,stmt,values),first=bound.first;
      bound.first=async(...args)=>{
       const target=mode==='grant-before-link'&&sql.includes('INSERT INTO delegated_access_grants')||mode==='notice-before-link'&&sql.includes('INSERT INTO dossier_monitoring_consent_events')||mode==='fence-ack-lost'&&sql.includes('INSERT INTO finite_preparation_issuer_fences');
       state.sqlCalls++;const started=performance.now(),actual=Reflect.apply(first,bound,args),value=await actual;state.sqlElapsedMs+=performance.now()-started;
       if(target){state.sqlWrites++;state.trace.push({kind:mode,at:Date.now(),actualRow:!!value});if(value)throw Error('SYN actual SQL result lost before link');}
       return value;
      };return bound;
     };return stmt;
    };return s;
   };
+  kv.get=async(...args)=>{
+   const actual=Reflect.apply(get,kv,args),value=await actual;
+   if(String(args[0]).startsWith('grant:'))state.grantReads.push({at:Date.now(),present:value!==null,keyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(args[0])).then(b=>Buffer.from(b).toString('hex')),valueHash:value===null?null:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(typeof value==='string'?value:JSON.stringify(value))).then(b=>Buffer.from(b).toString('hex'))});
+   return value;
+  };
   kv.list=async options=>{
    state.lists++;state.trace.push({kind:'list',at:Date.now(),limit:options.limit,prefixHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(options.prefix)).then(b=>Buffer.from(b).toString('hex'))});
    const value=await Reflect.apply(list,kv,[options]);
    if(mode!=='paging-scope')return value;
    if(state.lists===1)return {keys:Array.from({length:100},(_,n)=>({name:options.prefix+'SYN-token-'+n})),list_complete:false,cursor:'SYN-second-page'};
    return {keys:[{name:'client:SYN-forbidden-extra-IO'}],list_complete:true};
   };
   kv.delete=async key=>{
    state.deletes++;state.trace.push({kind:'delete',at:Date.now(),scope:key.startsWith('token:')?'token':key.startsWith('grant:')?'grant':'foreign'});
    const actual=Reflect.apply(del,kv,[key]),value=await actual;
+   if(mode==='inventory-drift'&&!state.held){
+    state.held=true;state.heldAt=Date.now();state.trace.push({kind:'actual-native-delete-settled-brief-ACK-held',at:state.heldAt});
+    await new Promise((resolve,reject)=>{const tick=()=>{if(state.released)return resolve();if(Date.now()-state.heldAt>=3500)return reject(Error('SYN brief hold release premise missed'));setTimeout(tick,25);};tick();});
+    state.settled=true;state.settledAt=Date.now();state.trace.push({kind:'brief-ACK-released',at:state.settledAt});
+   }
    if(mode==='held-sdk-delete'&&!state.held){
     state.held=true;state.trace.push({kind:'actual-native-delete-settled-ACK-held',at:Date.now()});
     await new Promise(resolve=>{this.releaseCleanupHeld=resolve;});state.settled=true;state.trace.push({kind:'held-ACK-released',at:Date.now()});
    }return value;
   };
  }
+ // Explicit fixture entry reentry; not an additional scheduler delivery or authority.
+ async ownerCleanupReenter(){return super.alarm();}
  async ownerCleanupReset(){this.ownerCleanupFaultRestore?.();}
  async ownerCleanupControl(){this.cleanupFaultState.released=true;this.releaseCleanupHeld?.();this.releaseCleanupHeld=null;}
  async ownerCleanupFaultSignal(){const s=this.cleanupFaultState;return s?{mode:s.mode,held:s.held,settled:s.settled,deletes:s.deletes,lists:s.lists,sqlWrites:s.sqlWrites,reconciles:s.reconciles}:null;}
  async ownerCleanupFaultFacts(){return this.cleanupFaultState??null;}
  async ownerCleanupScopeProbe(){
   const controller=new AbortController(),at=Date.now(),lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()-at>=5000)throw Error('SYN probe lifetime');}});
   try{await observeFiniteReadOnlyWork({ctx:this.ctx,env:this.env,originalLease:lease},async()=>true);return {available:true,at};}
   catch{return {available:false,at};}finally{controller.abort();}
  }
  async ownerCleanupNativeRows(){
@@ -69,21 +81,21 @@
 
  async alarm(){
   const signal=this.cleanupAlarmSignal??={entered:0,settled:0,status:null,at:null,finishedAt:null};
   signal.entered++;signal.at=Date.now();
   try{const result=await super.alarm();signal.status=result?.status??null;return result;}
   finally{signal.settled++;signal.finishedAt=Date.now();}
  }
  async ownerCleanupSignal(){return this.cleanupAlarmSignal??{entered:0,settled:0,status:null,at:null,finishedAt:null};}
  async ownerCleanupFacts(){
   const dbNow=await this.env.RELEASE_DB.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS now").first();
-  return {dbNow:dbNow.now,wall:Date.now(),alarm:await this.ctx.storage.getAlarm(),rows:[...await this.ctx.storage.list()],signal:await this.ownerCleanupSignal(),failures:globalThis.__r2CleanupFailures??[],children:globalThis.__r2CleanupChildren??[]};
+  return {dbNow:dbNow.now,wall:Date.now(),alarm:await this.ctx.storage.getAlarm(),rows:[...await this.ctx.storage.list()],signal:await this.ownerCleanupSignal(),failures:globalThis.__r2CleanupFailures??[],children:globalThis.__r2CleanupChildren??[],finalInventoryProof:globalThis.__r2FinalInventoryProof??null};
  }
  `;
  const marker=' export class Initial extends FiniteClosure{';assert.equal(entry.split(marker).length,2);
  const original='actual=super.fetch(request);';assert.equal(entry.split(original).length,2);
  return ("import {observeFiniteReadOnlyWork} from './lib/mcp-qa-finite-stage-work.mjs';\n"+entry).replace(marker,()=>marker+methods+cleanupMethods).replace(original,()=>'actual=this.ownerReferenceFetch(request,r=>super.fetch(r));');
 }
 export function instrumentFiniteOwnerCleanup(source){
  const marker="actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();";assert.equal(source.split(marker).length,2);
  source=source.replace(marker,()=>marker+"if(op==='sdk_complete'&&globalThis.__r1ReferenceState){globalThis.__r1ReferenceState.completeNormal++;globalThis.__r1ReferenceState.trace.push('actual-sdk-complete-normal');}");
  const lookup="const summary=await withChild(l=>readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l));";
@@ -166,20 +178,26 @@
 export function instrumentCleanupConsumer(source){
  const fail=/const fail=\(\)=>\{throw Error\('([^']+)'\);\};/;
  assert(fail.test(source),'fixed cleanup fail marker');
  source=source.replace(fail,(_,message)=>"const fail=()=>{const error=Error("+JSON.stringify(message)+");(globalThis.__r2CleanupFailures??=[]).push({at:Date.now(),frames:String(error.stack).split('\\n').slice(0,7)});throw error;};");
  const child="async function child(work){";
  if(source.includes(child)){
   assert.equal(source.split(child).length,2);source=source.replace(child,child+"const childAt=Date.now(),childMono=performance.now();");
   const end="try{return await clock.wait(actual);}finally{originalLease.signal.removeEventListener('abort',stop);clock.close();}";
   assert.equal(source.split(end).length,2);source=source.replace(end,"try{return await clock.wait(actual);}finally{(globalThis.__r2CleanupChildren??=[]).push({startedAt:childAt,elapsedMs:performance.now()-childMono,aborted:clock.lease.signal.aborted});originalLease.signal.removeEventListener('abort',stop);clock.close();}");
  }
+ const finalDigest="digest('afw.finite-owner-cleanup-final-facts.v1',";
+ if(source.includes(finalDigest)){
+  assert.equal(source.split(finalDigest).length,2);
+  source=source.replace(finalDigest,"observeFinalInventoryDigest('afw.finite-owner-cleanup-final-facts.v1',");
+  source+="\nfunction observeFinalInventoryDigest(domain,value){const committedHash=digest(domain,value),i=value.inventory;globalThis.__r2FinalInventoryProof={committedHash,inventoryHash:digest('SYN.final-inventory-proof.v1',i),enteredAt:i.enteredAt,observedAt:i.observedAt,workflow:i.workflow,container:i.container,schedulesAndTails:i.schedulesAndTails,operator:i.operator,baseline:i.baseline,sourceRevision:i.bootstrap.sourceRevision,sourceTree:i.bootstrap.sourceTree,requestTimes:i.requests.map(r=>({providerDate:r.providerDate,observedAt:r.observedAt}))};return committedHash;}\n";
+ }
  return source;
 }
 
 /** Dated native facts after the real code exchange; never replaces the pre-302 Reference. */
 export async function observeCleanupSdkExchange(f,token){
  const o=await plain(f.stub.ownerReferenceObserve()),referenceRaw=o.rows.find(([k])=>k.endsWith(':reference'))?.[1];assert(referenceRaw);
  const ref=JSON.parse(referenceRaw),native=await plain(f.stub.ownerCleanupNativeRows());assert(native.grant);
  const key='grant:'+native.grant.user_id+':'+ref.sdkGrantId,raw=await f.kv.get(key);assert.equal(typeof raw,'string');const grant=JSON.parse(raw);
  assert.equal(grant.id,ref.sdkGrantId);assert.equal(grant.userId,native.grant.user_id);assert.equal(grant.clientId,f.source.clientId);
  assert.equal(grant.metadata.afwFiniteCleanup.correlationHash,ref.correlationHash);assert(Number.isSafeInteger(grant.expiresAt));

~~~~~

### test/mcp-qa-finite-owner-cleanup-native.test.mjs

~~~~~diff
diff --git a/test/mcp-qa-finite-owner-cleanup-native.test.mjs b/test/mcp-qa-finite-owner-cleanup-native.test.mjs
--- a/test/mcp-qa-finite-owner-cleanup-native.test.mjs
+++ b/test/mcp-qa-finite-owner-cleanup-native.test.mjs
@@ -11,21 +11,21 @@
 const pause=ms=>new Promise(r=>setTimeout(r,ms)),hash=v=>createHash('sha256').update(v).digest('hex');
 const row=(facts,key)=>{const v=facts.rows.find(([k])=>k===P+key);return v?JSON.parse(v[1]):null;};
 const cleanupRows=facts=>facts.rows.filter(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:'));
 const cleanupReceipt=facts=>{const r=cleanupRows(facts).find(([k])=>k.endsWith(':receipt'));return r?JSON.parse(r[1]):null;};
 async function recover(label,variant='principal',options={}){
  const f=await recoverCheckpoint(join(root,variant),{label,...options});fixtures.push(f);return f;
 }
 async function capture(f,label,facts){
  const native=await plain(f.stub.ownerCleanupNativeRows()),fault=await plain(f.stub.ownerCleanupFaultFacts());
  const receipt=cleanupReceipt(facts),state=row(facts,'state'),metrics={children:facts.children,sqlCalls:fault?.sqlCalls??0,sqlElapsedMs:fault?.sqlElapsedMs??0,kvLists:fault?.lists??0,kvDeletes:fault?.deletes??0,providerRequests:f.providerRegistry.requests.length-f.checkpoint.state.providerRegistry.requests.length};
- const result={purpose:'afw.owner-cleanup-native-result.syn.v1',label,source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,signal:facts.signal,nativeDbNow:facts.dbNow,wall:facts.wall,state,alarm:facts.alarm,originalPlanHash:f.plan.recordHash,restores:f.restores.length,pointer:f.providerRegistry.pointer,ownerCleanupSuffixes:cleanupRows(facts).map(([k])=>k.split(':').slice(2).join(':')),receipt,metrics,failures:facts.failures,fault,native:{fenced:!!native.fence?.fenced_at,grantPresent:!!native.grant,grantRevoked:!!native.grant?.revoked_at,noticeActions:native.notices.map(x=>x.action)},operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,modeledProviderInput:f.checkpoint.modeledProviderInput};
+ const result={purpose:'afw.owner-cleanup-native-result.syn.v1',label,source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,signal:facts.signal,nativeDbNow:facts.dbNow,wall:facts.wall,state,alarm:facts.alarm,originalPlanHash:f.plan.recordHash,restores:f.restores.length,pointer:f.providerRegistry.pointer,ownerCleanupSuffixes:cleanupRows(facts).map(([k])=>k.split(':').slice(2).join(':')),receipt,metrics,...facts.finalInventoryProof?{finalInventoryProof:facts.finalInventoryProof}:{},failures:facts.failures,fault,native:{fenced:!!native.fence?.fenced_at,grantPresent:!!native.grant,grantRevoked:!!native.grant?.revoked_at,noticeActions:native.notices.map(x=>x.action)},operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,modeledProviderInput:f.checkpoint.modeledProviderInput};
  await writeCleanupEvidence(label,result);console.info('R2 native result',JSON.stringify(result));return {result,native,receipt,state};
 }
 function assertClosed(f,facts,capture){
  assert(facts.dbNow>=f.plan.C0);assert.equal(capture.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(f.restores.length,1);
  assert.equal(f.providerRegistry.pointer.versions[0].version_id,f.plan.baselineVersionId);assert(capture.receipt);assert.equal(capture.receipt.businessAccessClosed,true);assert.equal(capture.receipt.globalNativeDrainVerified,false);assert.equal(capture.receipt.sdkNamespaceEmptyVerified,false);
  assert(capture.native.fence?.fenced_at);assert(!capture.native.grant||capture.native.grant.revoked_at);if(capture.native.notices.some(e=>e.action==='grant'))assert.equal(capture.native.notices.at(-1).action,'revoke');
  assert.equal(f.kvSemanticProof.bothAliases,true);
 }
 let principal;
 if(group==='g0'){
@@ -35,20 +35,26 @@
   const facts=await observeOriginalAlarm(f),observed=await capture(f,'principal',facts);principal={f,facts,observed};
   assertClosed(f,facts,observed);assert.equal(observed.receipt.sdkReductionReturned,true);
  });
  test('R2 originalSDKexpiry still permits exact historical reduction',async()=>{
   assert(principal,'shares the single untouched original occurrence');
   const {f,observed}=principal,ref=JSON.parse(f.checkpoint.facts.rows.find(([k])=>k.endsWith(':reference'))[1]);
   const actual=f.checkpoint.sdkAfterExchange;assert(actual);assert.equal(ref.expiresAt,null,'historical pre-302 field remains absent');assert.equal(actual.referenceHash,ref.recordHash);assert.equal(actual.selectorHash,hash(ref.sdkGrantId));assert.equal(actual.correlationHash,ref.correlationHash);assert(Number.isSafeInteger(actual.expiresAt)&&actual.expiresAt*1000<=f.plan.C0);assert(actual.observedAt<f.plan.C0);
   assert.equal(observed.receipt.sdkReductionReturned,true);assert(observed.receipt.sdkSendHash);assert(observed.receipt.sdkObservedHash);
   await writeCleanupEvidence('sdk-expiry-same-occurrence',{label:'same principal occurrence; no second revoke',referenceHash:ref.recordHash,selectorHash:hash(ref.sdkGrantId),referenceExpiresAt:ref.expiresAt,actualPostExchange:actual,C0:f.plan.C0,sdkObservedHash:observed.receipt.sdkObservedHash,operationalReadiness:false});
  });
+ test('R2 fix1 absent current SDK grant uses original reference without absence ACK',async()=>{
+  assert(principal);const {f,observed}=principal,reads=observed.result.fault.grantReads;
+  assert.equal(reads.length,1,'bounded native current exact-key read required');assert.equal(reads[0].present,false);
+  assert.equal(observed.receipt.sdkReductionReturned,true);assert(observed.receipt.sdkSendHash&&observed.receipt.sdkObservedHash);
+  await writeCleanupEvidence('fix1-absent-current-grant',{label:'same principal occurrence; native absence is not an ACK',source:process.env.GITHUB_SHA,C0:f.plan.C0,read:reads[0],receiptHash:observed.receipt.recordHash,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
+ });
 }
 let pair;
 async function paired(g,configure){
  if(!pair){pair=await Promise.all([recover(g+'-a',g==='g1'?'grant-before-link':'principal'),recover(g+'-b',g==='g1'?'notice-before-link':'principal')]);await configure?.(...pair);}
  return pair;
 }
 if(group==='g1'){
  test('R2 fence covers grant before link',async()=>{
   const [f]=await paired('g1');assert.equal(f.checkpoint.partialBoundary.sqlWrites,1);assert(!f.checkpoint.facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':grant')));
   const facts=await observeOriginalAlarm(f),r=await capture(f,'grant-before-link',facts);assertClosed(f,facts,r);assert(r.native.grant.revoked_at);assert.equal(r.receipt.sdkReductionReturned,false);assert.equal(r.receipt.sdkSendHash,null);
@@ -123,20 +129,82 @@
   const negative=await observeCleanupMDenial(f.m,token.access_token,f.checkpoint.state.source.project.projectId,{C0:f.plan.C0});
   const outcome={label:'SYN adversarial SDK-only; not an M token-exchange admission',startedAt,deniedHeadersAt,C0:f.plan.C0,positive,negative,build:f.checkpoint.sdkOnlyBuild,before,after,denialBodyHash:hash(deniedBody),mcpWorker:'canary-first-connection',denialLayer:negative.classification.layer,expiry,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,operationalReadiness:false};
   await writeCleanupEvidence('late-kv-actual-outcome',outcome);console.info('R2 late M denial diagnostic',JSON.stringify(outcome));
   assert.deepEqual(negative.profile,positive.profile,'same original M script/config/namespace and wrapper');
   assert(negative.responses.some(r=>r.method==='POST'&&r.startedAt>=f.plan.C0),'real post-C0 M request recorded');
   assert.equal(negative.classification.dataDenied,true,'actual M data-denial contract, not initialize HTTP alone');
   assert.equal(hash(m.script),f.checkpoint.build.M.sha256);
  });
 }
 
+let fixPair,fixMatched;
+async function fixCurrentPair(){
+ if(!fixPair){
+  fixPair=await Promise.all([recover('g6-matching'),recover('g6-conflicting')]);
+  for(const f of fixPair){
+   assert.equal(f.checkpoint.unexchanged,true);const ref=JSON.parse(f.checkpoint.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),native=await plain(f.stub.ownerCleanupNativeRows()),key='grant:'+native.grant.user_id+':'+ref.sdkGrantId;
+   const raw=await f.kv.get(key),value=JSON.parse(raw),listed=await f.kv.list({prefix:key,limit:1});
+   assert.equal(hash(raw),f.checkpoint.sdkUnexchanged.grantObjectHash);assert.equal(value.id,ref.sdkGrantId);assert.equal(value.expiresAt,undefined);
+   assert.equal(listed.keys[0]?.name,key);assert.equal(listed.keys[0].expiration,f.checkpoint.sdkUnexchanged.nativeKVExpiration);assert(listed.keys[0].expiration*1000>f.plan.C0+120000);
+   f.fixCurrent={key,keyHash:hash(key),originalHash:hash(raw),expiration:listed.keys[0].expiration};
+  }
+  const f=fixPair[1],value=JSON.parse(await f.kv.get(f.fixCurrent.key));
+  value.metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'f'.repeat(64)}};
+  const untrusted=JSON.stringify(value);await f.kv.put(f.fixCurrent.key,untrusted,{expiration:f.fixCurrent.expiration});
+  const listed=await f.kv.list({prefix:f.fixCurrent.key,limit:1});assert.equal(listed.keys[0].expiration,f.fixCurrent.expiration);assert.equal(await f.kv.get(f.fixCurrent.key),untrusted);
+  f.fixCurrent={...f.fixCurrent,untrustedHash:hash(untrusted),modeledUntrustedState:true,admission:false};
+ }
+ return fixPair;
+}
+if(group==='g6'){
+ test('R2 fix1 matching current native SDK grant is qualified before reduction',async()=>{
+  const [f]=await fixCurrentPair(),facts=await observeOriginalAlarm(f),r=await capture(f,'fix1-matching-current-grant',facts);fixMatched={f,facts,r};
+  assertClosed(f,facts,r);assert.equal(r.receipt.sdkReductionReturned,true);assert.equal(await f.kv.get(f.fixCurrent.key),null);
+  assert.equal(f.checkpoint.sdkUnexchanged.codeExchanged,false);assert.equal(f.checkpoint.sdkUnexchanged.referenceExpiresAt,null);
+  const proof=facts.finalInventoryProof,observed=JSON.parse(cleanupRows(facts).find(([k])=>k.endsWith(':sdk_revoke:observed'))[1]);
+  assert(proof,'actual finalFactsHash input must include newly read inventory');assert.equal(proof.committedHash,r.receipt.finalFactsHash);
+  assert(proof.enteredAt>=observed.observedAt&&proof.observedAt>=proof.enteredAt&&r.receipt.observedAt>=proof.observedAt);
+  assert.equal(proof.workflow.workflowCount,3);assert(proof.workflow.instances.every(x=>['complete','errored','terminated'].includes(x.status)));assert.equal(proof.container.activeCount,0);
+  assert.equal(proof.schedulesAndTails.length,4);assert(proof.schedulesAndTails.every(x=>x.count===0));assert.equal(proof.operator.closed,true);assert.equal(proof.baseline.recoverable,true);
+  assert.equal(proof.baseline.versionId,r.receipt.baselineVersionId);assert.equal(proof.baseline.deploymentId,r.receipt.baselineDeploymentId);assert(proof.requestTimes.every(x=>x.observedAt>=proof.enteredAt&&x.observedAt<=proof.observedAt));
+  assert.equal(r.result.fault.grantReads.length,1);assert.equal(r.result.fault.grantReads[0].present,true);
+
+ });
+ test('R2 fix1 foreign current SDK object is preserved with zero deletes',async()=>{
+  const [,f]=await fixCurrentPair(),facts=await observeOriginalAlarm(f),r=await capture(f,'fix1-foreign-current-grant',facts),remaining=await f.kv.get(f.fixCurrent.key);
+  await writeCleanupEvidence('fix1-foreign-current-preservation',{label:'untrusted modeled current KV content; no new grant authority',source:process.env.GITHUB_SHA,...f.fixCurrent,key:undefined,currentHash:remaining===null?null:hash(remaining),deletes:r.result.fault.deletes,receiptHash:r.receipt?.recordHash??null});
+  assert.equal(r.result.fault.deletes,0,'conflicting current native object must cause zero SDK deletes');
+  assert.equal(hash(remaining),f.fixCurrent.untrustedHash);assert.notEqual(r.state.status,'complete');assert.equal(r.receipt,null);
+  assert(!cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')));
+ });
+ test('R2 fix1 completed reentry rejects fresh inventory drift without rewriting history',async()=>{
+  assert(fixMatched);const {f}=fixMatched;assert(Date.now()<f.plan.C1);const before=await plain(f.stub.ownerCleanupFacts()),effects=f.restores.length,requests=f.providerRegistry.requests.length;
+  const control=await plain(f.stub.ownerCleanupReenter());assert.equal(control.status,'restored');const stable=await plain(f.stub.ownerCleanupFacts());assert.deepEqual(stable.rows,before.rows);assert.equal(stable.alarm,before.alarm);
+  f.inventoryMode='waiting';const changedAt=Date.now(),denied=await plain(f.stub.ownerCleanupReenter()),after=await plain(f.stub.ownerCleanupFacts());
+  await writeCleanupEvidence('fix1-completed-reentry',{label:'explicit same alarm entry inspection; not another scheduled delivery or admission',source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,changedAt,control:control.status,result:denied.status,rowsUnchanged:JSON.stringify(after.rows)===JSON.stringify(before.rows),state:row(after,'state'),alarm:after.alarm,historicalReceiptHash:cleanupReceipt(after)?.recordHash,restoresBefore:effects,restoresAfter:f.restores.length,providerWrites:f.providerRegistry.requests.slice(requests).filter(x=>x.method!=='GET').length,inventoryMode:f.inventoryMode});
+  assert.equal(denied.status,'admin_pending','already-complete entry must reject new active Workflow inventory');
+  assert.deepEqual(after.rows,before.rows);assert.equal(after.alarm,before.alarm);assert.equal(f.restores.length,effects);assert.equal(f.providerRegistry.requests.slice(requests).filter(x=>x.method!=='GET').length,0);assert.equal(f.inventoryMode,'waiting');
+ });
+}
+if(group==='g7'){
+ test('R2 fix1 post-restore inventory drift during retained SDK blocks both completions',async()=>{
+  const f=await recover('g7-inventory-drift');await f.stub.ownerCleanupFault('inventory-drift');
+  for(;;){const signal=await plain(f.stub.ownerCleanupFaultSignal());if(signal.held)break;assert(Date.now()<f.plan.C0+30000,'real native SDK hold must be reached');await pause(50);}
+  assert.equal(f.restores.length,1,'drift occurs after real restore');const changedAt=Date.now();f.inventoryMode='waiting';await f.stub.ownerCleanupControl();
+  const facts=await observeOriginalAlarm(f),r=await capture(f,'fix1-post-sdk-inventory-drift',facts),fault=r.result.fault;
+  await writeCleanupEvidence('fix1-post-sdk-inventory-premise',{label:'modeled Workflow becomes active after restore while real SDK ACK pending',source:process.env.GITHUB_SHA,C0:f.plan.C0,changedAt,heldAt:fault.heldAt,settledAt:fault.settledAt,settled:fault.settled,holdMs:fault.settledAt-fault.heldAt,inventoryMode:f.inventoryMode,sdkObserved:cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')),state:r.state.status,ownerReceiptHash:r.receipt?.recordHash??null,initialReceiptHash:row(facts,'receipt')?.recordHash??null});
+  assert(fault.settled&&fault.heldAt<=changedAt&&changedAt<=fault.settledAt&&fault.settledAt-fault.heldAt<3500,'bounded actual hold/release premise');
+  assert(cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')),'real SDK returned before final inventory');
+  assert.equal(r.receipt,null,'fresh post-SDK inventory must prevent owner receipt');assert.equal(row(facts,'receipt'),null);assert.notEqual(r.state.status,'complete');assert.equal(f.inventoryMode,'waiting');assert.equal(f.restores.length,1);
+ });
+}
+
 if(group==='components'){
 test('R2 native monitoring revoke binds original consent and preserves unrelated rows',async t=>{
  const r=await monitoringCleanupScenario(t,'normal');assert.equal(r.rejected,false);assert.equal(r.result.status,'applied');assert.equal(r.after.length,3);assert.deepEqual(r.after.slice(0,2),r.before);assert.equal(r.result.row.grant_id,r.before[1].grant_id);assert.equal(r.result.row.action,'revoke');assert.equal(r.result.row.issued_at,r.result.row.expires_at);assert(r.result.row.issued_at>=r.at);assert.equal(r.noUpdate,true);assert.equal(r.noDelete,true);
  const reads=r.events.filter(e=>e.sql?.includes('SELECT v.*'));assert(reads.length>=2);for(const e of reads)assert.equal(r.events.find(x=>x.sid===e.sid),e,'fresh first-primary SELECT');
 });
 test('R2 native monitoring revoke preserves prior withdrawal',async t=>{
  const r=await monitoringCleanupScenario(t,'prior');assert.equal(r.rejected,false);assert.equal(r.result.status,'already_withdrawn');assert.deepEqual(r.after,r.before);assert.deepEqual(r.result.row,r.before.at(-1));assert.equal(r.writes,0);
 });
 test('R2 native monitoring revoke rejects foreign revision and sequence',async t=>{
  for(const mode of ['revision','sequence']){const r=await monitoringCleanupScenario(t,mode);assert(r.rejected||r.result?.status==='no_mutation');assert.deepEqual(r.after,r.before);assert.equal(r.observed,null);}

~~~~~
