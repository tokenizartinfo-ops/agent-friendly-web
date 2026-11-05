# Task review package — fixed notice GET + private inventory

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC); ENVIRONMENT=GitHub SOURCE/SYN; ORIGIN=GitHub API; ALLOWED_ACTION=read-only independent task review; no execution/publication/runtime. Root-generated immutable full BASE package; report claims remain unverified until review.

BASE: dc4edafc0b5e4ba440cd32a21dd3dd58024e811a/tree91d023ce48bb2f5105140c788d3646c64c20bd4e.
HEAD: cfe8f0ddde1d782757dd7e0d3160967f325df553/tree22dfd786d34a284fb2e7fff4bc0c4836f2167286.
Qualified codeHEAD: e71eb58f040d8de531206172c2cd0d2df897771a/tree055d0226b5b433742e74d21a1288a4c4ae87425f. Root verified all ten source/test blobs in final compare match e71 cached exact files; only report and qualifier removal followed. Final BASE diff exactly ten source/test paths plus added report, no workflow remaining. Whole-branch review remains later.

Brief: docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md at rootdocs c5d211e671c79d5ed99330eb7c5950e36f3f5da8 (blobc64f9c9f9c97f2a8832e3dcb090aa17d9b57579c), includes the explicitly amended legacy schema fixture ruling. Original spec/plan copied into BASE; all requirements apply with that one ruling and fixed nosniff ruling. Report: docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice.md at HEAD, bloba7dbd31cfa0fdf9f05a4a488afb38982815ca0f0. Its entire added text is included in the diff below, not a truncated preview.

Root read every primary job named in report, including failures and final focused GREEN. Actual coverage spans immutable heads; no full-suite-at-finalhead claim. Protected store/journal/SDK/ordinaryM/source-stub/standardentry files are not changed per complete11-file compare. SOURCE/SYN evidence does not establish hosted runtime or PC-off.

## Exact global constraints copied from brief

## Unidad y límites

GET /monitoring real→forward M fijo→QA fijo→Access/preconnection/grant originales→journal tres filas y ticket D1 original; antes de respuesta positiva, dos snapshots completos deben igualar el frame léxico de la propia operación. GET prepara ticket, nunca consentimiento. POST /monitoring/grant y /monitoring/revoke, NoticeLink, source notices/finite, third CLOSED, flags, mounts y rollout permanecen fuera.

C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. No rearm, renew, reloj inyectado, budgets nuevos, callbacks aprobadores, DTO de autoridad ni allowPending. D0.4 conserva exchanged_at actual y proyección sólo para ACK histórico. Sin cambios de store/journal/SDK/autoridad/DDL. operationalReadiness=false; completePackage=false; PCoff=false.


## Máquina léxica propia y rechecks

Variables privadas: position, operation, actualPromise, actualResult, settled, activeChild; actualPromise/actualResult/settled pertenecen exclusivamente al INSERT SQL, no se sobrescriben al esperar el journal. Cada append usa su propia Promise retenida local y su resultado; se conservan referencias locales ownedReservation/ownedSend a los records creados por este handler; no globals/WeakMap de autoridad ni objeto de opción. recheckNoticeGetOwned() cierre sin argumentos:
1. check holders/lease/identity expiry.
2. Si hay actualPromise pendiente (!settled), negar; nunca lanzar lectura para inferir su resultado.
3. Issuer/SDK deben seguir completos/sin pending original. Notice consent/freeze ausentes.
4. position determina la única excepción propia; comprobar que el SEND es el mismo objeto/recordHash producido en esta invocación y recién reconocido, no leído de journal ajeno. Si position exige resultado, exigir actualPromise real, settled y actualResult.
5. await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id})); wait usa clock.wait con activeChild cuando existe y guards antes/después, como OAuth. Ambos snapshots deben ser canónicamente iguales a expected ENTERO. No comparar sólo partes/omitir timestamps/masking. No llamar qualifySettledOwnerPair después de la primera escritura propia: su cierre público sigue deliberado.

Secuencia exacta:
- baseline y recheckNoticeGetOwned con expected vacío.
- En child propia: retener appendReservation real; exigir status recorded y hash exacto; después de settle actualizar únicamente expected.records.notice.reservation y expected.anchor.notice; position='reservation-recorded'; recheck completo. existing/uncertain/fallo termina503 sin SQL.
- Child ticket única: window.startedAt=Date.now al entrar; deadline=min(child original, todos los techos), duración<=5000. SEND exacto con Common/window de esta child, decisionHash=null. Retener appendSend; sólo recorded del journal→actualizar expected notice.send/anchor; position='ticket-send-recorded'; recheck completo con expected.tickets=[].
- Tras check emitir UNA insertMonitoringTicket({...Common,ticket},activeChild) en la MISMA instancia store, guardar su Promise REAL antes de cualquier race; position='ticket-sql-pending', settled=false. No hay recheck durante pendiente.
- Al resolver: actualResult es ese resultado nativo; settled=true; exigir status applied y14 columnas exactas; cualquier no_mutation/error termina503 sin ACK ni formulario. Actualizar expected.noticeRows.tickets=[structuredClone(actualResult.row)]; position='ticket-sql-resolved'; recheck completo acepta exclusivamente este SEND propio con el resultado real en stack. El status no_mutation del store no se convierte en éxito del flujo.
- Dentro de misma child: construir ACK applied exclusivamente desde actualResult.row real, sequence=null y rowHash exacto; observedAt real<Send.deadline. Retener appendAck con variable distinta sin reemplazar la referencia SQL; require recorded; actualizar únicamente expected notice.ack/anchor; position='ticket-ack-recorded'; recheck completo. Después cerrar child, comprobar lease/identity original inmediatamente antes de construir/retornar pagina200.
No llamada del journal ni del store recibe expected/position/result como autoridad. La referencia a SEND propio no viaja por HTTP. Persistir ACK no permite limpiar actualPromise antes del recheck final. Ante excepción no reconstruir ACK, reintentar INSERT, freeze automático ni cleanup; historial puede quedar parcial.

Reservation y ticket SEND sin ACK causados por pérdida entre pasos cierran futuras solicitudes. Un GET ajeno no puede “continuar” la reserva. Dos GET concurrentes: scope original/exclusión de instancia más journal append-once; sólo uno recorded puede emitir SQL. No inferir exclusión global del pending privado del journal; statement SQL/cerca original decide carrera nativa.


## Commits

- bab878c611006abf7a00a9b223bc478e203b7a38 test(afw): causal native notice inventory RED with actual SDK grant
- b2069aba00535c60715b0f1fab4f4a4ca6520035 feat(afw): private factual notice inventory and causal absent GET RED
- 2f2cbe4d2f9852d6717fcda59e23a5fc51fb9330 fix(afw): compare native inventory schema with correct lexical grammar
- a0bd9d68653cc18313490c842d7d884c6184fa18 docs(afw): preserve partial notice GET checkpoint and unverified draft; remove qualifier
- 35ad25a479eb7bc5a4dad040be047e4f4d349e8b feat(afw): fixed unmounted notice GET with lexical native ticket continuation
- 808a9bab84193557970a804ca5fbf619f39dff15 test(afw): measure actual GET graph and retained native I/O without virtual file reads
- 0db9f2d1c7018dc6f572f7fe930d8dfe5acd30e7 test(afw): native notice GET adversaries and full retained cost evidence
- be044d4894e84497fb490720875195f5c8b15167 test(afw): verify native fenced CLOSE retention and scoped regression counts
- d87158c4847604446051ab27e3ef9d844b3d2f8d test(afw): diagnose one real legacy phase inventory without altering guards
- c0e1db92432651391d3dfc10e18c409e1b4aa4ec test(afw): preserve native consent history and grants in complete phase SYN schema
- 1c2a4a5bae85a8ed0789057c5691fd7bd9fe3cdc test(afw): assert measured 128 factual reads without changing original fanout gates
- e71eb58f040d8de531206172c2cd0d2df897771a test(afw): verify all native ticket fields and consent exclusion after real ticket
- cfe8f0ddde1d782757dd7e0d3160967f325df553 docs(afw): record native GET source qualification and remove temporary qualifier

## Stat

- docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice.md: +203 -0; blob a7dbd31cfa0fdf9f05a4a488afb38982815ca0f0
- lib/mcp-qa-finite-owner-notice-get-forward.mjs: +36 -0; blob b131cdef0fccf7ccdd4b810d99ea4be4252b2650
- lib/mcp-qa-finite-owner-notice-get-qa.mjs: +16 -0; blob 6f7b6cb02e9551caab16afdc1b1cd650336837f4
- lib/mcp-qa-finite-owner-notice-get-wire.mjs: +22 -0; blob 74da03e38a5ff7561f23ddbab5dfc3397cb31896
- lib/mcp-qa-finite-owner-phase-context.mjs: +175 -4; blob 4fc7a7005330e6fbf76ae7ab0ea4767dcfd2facf
- test/fixtures/finite-initial-entry-world.mjs: +20 -4; blob bfb918ebe15edc654de0e57d5aecf83757129b07
- test/fixtures/finite-owner-io-fanout.mjs: +6 -2; blob e181bfd7634b6f71e4129b03fbb529a2f1b04f10
- test/fixtures/finite-owner-notice-get.mjs: +129 -0; blob f83a1db865ea85668d7261f728a1ec12541409cc
- test/fixtures/finite-owner-qa-sdk.mjs: +14 -4; blob 6ac23eb8251ee89ee73a40b822c8856ebeca578a
- test/mcp-qa-finite-owner-notice-get-native.test.mjs: +237 -0; blob 50f082434f339094718a681456dcb2e13912811c
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs: +1 -1; blob 35c3d9a3bd7be8ea09e3963ac6e56cd3ee40a1f8

## Full unified diff (U10, every changed file)

````diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice.md b/docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice.md
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice.md
@@ -0,0 +1,203 @@
+# Fixed notice GET and private factual inventory — implementation report
+
+5 November 2026, SOURCE ONLY / UNMOUNTED. **Writer status: DONE_WITH_CONCERNS, ready for root's independent spec/quality review.** The required source checks are covered by the primaries below; this does not accept a deployment, notice consent, hosting or operational package.
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source/credential-free Actions SYN; ORIGIN=GitHub App API; RESOURCE_TYPE=isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=exact ten source/test paths, this report and temporary qualifier; ROLLBACK=own commits only with expected-head CAS, preserving foreign changes and every historical row. No local clone/dependencies/build/test or persistent process was used. No Cloudflare runtime was read or mutated.
+
+## Immutable revisions, scope and rulings
+
+- Review BASE remains `dc4edafc0b5e4ba440cd32a21dd3dd58024e811a`, tree `91d023ce48bb2f5105140c788d3646c64c20bd4e`; never reset to a later checkpoint.
+- Final codeHEAD `e71eb58f040d8de531206172c2cd0d2df897771a`, code tree `055d0226b5b433742e74d21a1288a4c4ae87425f`.
+- Product blobs have been identical since `be044d4894e84497fb490720875195f5c8b15167`. Later changes were fixture schema preservation, the measured SDK assertion, test reinforcement and temporary workflow selection. Source proof is the four product blobs below and the immutable comparison [be044..final code](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/be044d4894e84497fb490720875195f5c8b15167...e71eb58f040d8de531206172c2cd0d2df897771a).
+- reportHEAD/tree are the commit/tree containing this report plus qualifier deletion, returned and independently read back in root's closing receipt. A report cannot embed its own containing commit hash.
+- The temporary `.github/workflows/afw-notice-get-qualification.yml` is removed with this report after every own run reached terminal status. It remains recoverable at the recorded run heads. No permanent CI/service/permission was added.
+- Original brief/preflight at BASE bind the unit. Root's narrow schema-fixture ruling is formalized at [root docs c5d211e6 brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c5d211e671c79d5ed99330eb7c5950e36f3f5da8/docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md), blob `c64f9c9f9c97f2a8832e3dcb090aa17d9b57579c`. It supersedes only “seven DDL exclusively in noticeGet”: all phase-context SYN fixtures may add the missing three objects while retaining their four original consent objects, three foreign events and two grants. Product schema guards remain unchanged.
+- Root resolved the header conflict: keep OAuth's header-copy allowlist intact; QA generates fixed nosniff, M validates/does not copy that special header and independently sets fixed `X-Content-Type-Options: nosniff` only on accepted HTML200. The ordinary OAuth modules are untouched.
+- The shutdown report/draft is preserved at [a0bd9d6](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/a0bd9d68653cc18313490c842d7d884c6184fa18/docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice.md). Its draft was explicitly unverified then; current source was implemented and qualified separately, without repeating valid RED1/RED2.
+
+## Resulting source behavior
+
+The private observer reads the accepted six-row notice journal, validates all seven exact SQL definitions and reads the original UUID's exact ticket/event columns from fresh first-primary sessions. Each ALL must actually return success===true, an array and the fixed cap. An error, malformed metadata or partial schema is never interpreted as absence. Both whole snapshots include actual schema SQL, notice records, ticket rows and event rows; current grant.exchanged_at remains actual. Foreign prefixes/UUID history are neither used for admission nor rewritten.
+
+The public three-key reader and existing OAuth continuation reject any own notice content. Complete empty schema and totally absent schema remain compatible with the old reader; GET additionally requires complete seven-object schema before reservation/SEND.
+
+The fixed M bridge and QA receiver accept only the bounded original GET. Metadata is overwritten at M; caller options never create source/identity/permission. The handler verifies actual Access crypto, preparation cookie, preconnection, approval, original issuer/grant/SDK chain and current publication. A lexical expected whole frame tracks only this invocation's actual recorded reservation, its own SEND, its real retained INSERT Promise/result, and recorded ACK. Separate append Promises never overwrite SQL references. Every own transition checks two complete snapshots. Pending, existing, no_mutation, unknown or contradictory state returns503 without reconstructing an ACK or retrying SQL.
+
+Success inserts exactly one original fourteen-column ticket and three journal rows, with no consent event. HTML has the fixed preparation message, hidden escaped handle, disabled button, no action/JS, CSP form-action none, no-store and Strict/HttpOnly/Secure cookie. All three human POST paths remain closed before any journal/SQL. No route/mount, phase, NoticeLink or source-notice permission was added.
+
+| Final path | Blob |
+| --- | --- |
+| `lib/mcp-qa-finite-owner-notice-get-forward.mjs` | `b131cdef0fccf7ccdd4b810d99ea4be4252b2650` |
+| `lib/mcp-qa-finite-owner-notice-get-qa.mjs` | `6f7b6cb02e9551caab16afdc1b1cd650336837f4` |
+| `lib/mcp-qa-finite-owner-notice-get-wire.mjs` | `74da03e38a5ff7561f23ddbab5dfc3397cb31896` |
+| `lib/mcp-qa-finite-owner-phase-context.mjs` | `4fc7a7005330e6fbf76ae7ab0ea4767dcfd2facf` |
+| `test/fixtures/finite-initial-entry-world.mjs` | `bfb918ebe15edc654de0e57d5aecf83757129b07` |
+| `test/fixtures/finite-owner-io-fanout.mjs` | `e181bfd7634b6f71e4129b03fbb529a2f1b04f10` |
+| `test/fixtures/finite-owner-notice-get.mjs` | `f83a1db865ea85668d7261f728a1ec12541409cc` |
+| `test/fixtures/finite-owner-qa-sdk.mjs` | `6ac23eb8251ee89ee73a40b822c8856ebeca578a` |
+| `test/mcp-qa-finite-owner-notice-get-native.test.mjs` | `50f082434f339094718a681456dcb2e13912811c` |
+| `test/mcp-qa-finite-owner-qa-sdk-native.test.mjs` | `35c3d9a3bd7be8ea09e3963ac6e56cd3ee40a1f8` |
+
+Protected blobs, unchanged from BASE:
+
+- `lib/mcp-qa-finite-owner-oauth-forward.mjs`: `f7979579fcb6d00b3d5d68c7790089c803f4170f`.
+- `lib/mcp-qa-finite-owner-oauth-qa.mjs`: `ec5c16161bffc6e6d19de153b4465bf6ae748493`.
+- `lib/mcp-qa-finite-owner-oauth-wire.mjs`: `fc113a05e7f6d1ef72cd045a55c5934b357aa724`.
+- `lib/mcp-qa-finite-preparation-issuer-store.mjs`: `efc25b2af9c80b8eb27cffe219544e974002293e`.
+- `lib/mcp-qa-finite-preparation-notice-journal.mjs`: `b9c15aba18e2442a0ed864b8afd5e86313c5e470`.
+- `lib/mcp-qa-finite-preparation-notice-records.mjs`: `8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9`.
+
+SDK source, ordinary M entry/hosts, schema/config, source stubs and all other product files were not modified. Accepted store4016c13d and journal2969a840 were reused; no repeated147-store/33-issuer/journal or50ms/allSDK suite was run.
+
+## Required acceptance coverage, with exact selected counts
+
+All runs below are attempt1. TAP skip counts describe only emitted TAP; Node22 filters exclude unselected declarations rather than reporting them as skips.
+
+| Required group | Qualified primary | Result |
+| --- | --- | --- |
+| New native file, full33 cases | be044 / run42095343936 / job127483768304 | 33PASS/0FAIL/0skip,458761.807882ms |
+| Final changed principal and consent cases | e71eb58f / run42098853181 / job127496007748 | 2PASS/0FAIL/0skip,32356.0771ms; replaces the two changed assertions/cases,31 other cases preserved |
+| Pure phase file, entire18 | be044 / run42095343936 / job127483768304 | 18PASS/0FAIL/0skip,132.301603ms |
+| Selected phase-native16 | c0e1db92 / run42097918038 / job127492728047 | 16PASS/0FAIL/0skip,59418.956819ms |
+| Selected SDK-native6 | c0e1db92 / job127492728047 plus1c2a4a5b / job127494691138 | Five unchanged cases PASS in the first; affected fanout case PASS in the second. Do not misreport this as one six-pass TAP run |
+| Selected D04 token-native4 | 1c2a4a5b / run42098481702 / job127494691138 | 4PASS/0FAIL/0skip,54236.087611ms |
+| Targeted ten-file ESLint | 1c2a4a5b and final e71eb58f jobs | Both success, no lint diagnostic |
+
+Static declaration inventories supplied by root at BASE and unchanged by this unit: phase-native80=16selected+64not selected; SDK-native61=6+55; D04token-native46=4+42. These are **static inventories, not TAP skips**. Final reinforcement filters select2 of current33 declarations, leaving31 not selected in that run. The fanout-only correction selects1 of61, leaving60 not selected; it preserves the other five earlier selected passes.
+
+Exact required commands (shell runs also checked actual TAP counts/nonzero):
+
+```text
+node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+node --test --test-name-pattern='^fanout causal control delay0' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+node --test --test-name-pattern='^(GET acknowledged original|SYN negative consent event with real)' test/mcp-qa-finite-owner-notice-get-native.test.mjs
+./node_modules/.bin/eslint lib/mcp-qa-finite-owner-phase-context.mjs lib/mcp-qa-finite-owner-notice-get-wire.mjs lib/mcp-qa-finite-owner-notice-get-forward.mjs lib/mcp-qa-finite-owner-notice-get-qa.mjs test/mcp-qa-finite-owner-notice-get-native.test.mjs test/fixtures/finite-owner-notice-get.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+```
+
+The principal actually issues QA code, exchanges it through actual M, reads actual MCP and the D0.4 three-key reader before GET. It verifies all fourteen actual columns, an independent full-row ACK hash, original identity/grant and verbatim original preparation/issuer/SDK rows; actual exchanged_at and original issuer ACK are retained. A valid own ticket followed by a SYN negative consent event denies subsequent access without changing that ticket/journal.
+
+Other native cases cover schema0/7/partial/extra/changed SQL and failed actual ALL metadata; foreign history; grammar, cookies, crypto signature/subject/audience/issuer; longer original versus shorter current Access and actual expiry during GET; unknown/overflow/orphan/SEND/correlation/row-hash states; own pending and committed-before-return gates with a foreign reader/GET denied; lost reservation/SEND/SQL observation without retry; interleaved freeze; original5s SQL queue; CLOSE-before-ticket and ticket-before-CLOSE with history retained; two-snapshot owner/revision/pointer/exchanged_at/journal/ticket drift; and actual HTTP body/cancel retention after child expiry. Ticket mutation was explicitly destructive SYN corruption after first snapshot with trigger reinstated, not a legitimate transition. Positive grants were always actually issued by SDK/native paths; no positive SQL prefills/verifier/source/snapshot mocks were used.
+
+## All primary runs, failures and their disposition
+
+### Preserved causal REDs before shutdown
+
+All attempts are attempt 1; checkout persisted credentials=false, contents permission=read, Ubuntu24.04, Node22.23.4, npm10.9.9. Each job used `npm ci --ignore-scripts --no-audit --no-fund`, max job15min. No product30s/5s clock was extended.
+
+1. **Valid causal RED1.** HEAD `bab878c611006abf7a00a9b223bc478e203b7a38`; [run42078935862](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42078935862), [job127426529616](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42078935862/job/127426529616). Exact command:
+   `node --test --test-name-pattern='^inventory own negative' test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
+   TAP tests1/pass0/fail1/cancel0/skip0, duration14124.220083ms. The file at that HEAD contained one case. Actual QA GET/POST emitted the original native grant; schema7/notice0/tickets0/events0 and original read_consent reader passed before adding a SYN negative unknown key under the own preconnection notice prefix. BASE reader ignored it: status undefined versus expected unavailable at line30. No bundle/fixture/deadline failure was called RED.
+
+2. **Implementation/escaping defect, NOT valid RED2.** HEAD `b2069aba00535c60715b0f1fab4f4a4ca6520035`; [run42079302582](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079302582), [job127427807189](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079302582/job/127427807189). Exact command:
+   `node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
+   TAP tests2/pass0/fail2/cancel0/skip0, duration9543.875255ms. Both stopped at initial reader3keys prerequisite (actual status unavailable); no absent-GET causal claim. Inspection found literal double-escaped whitespace/name regexes in the schema comparison. Corrected those lexical regexes in the next own commit; no clock, validator bypass or positive fake was added.
+
+3. **Small corrected checkpoint: inventory GREEN + valid causal RED2.** HEAD `2f2cbe4d2f9852d6717fcda59e23a5fc51fb9330`; [run42079702545](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079702545), [job127429219590](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079702545/job/127429219590). Exact command:
+   `node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
+   TAP tests2/pass1/fail1/cancel0/skip0, duration19553.299179ms. Inventory own negative test PASS. Principal case reached actual QA code→actual M token exchange→actual MCP read_project_summary→actual D0.4 three-key/read_consent reader; preserved actual exchanged_at. Complete schema7 and empty own notice/ticket/event prerequisites passed. Missing GET scaffold then returned503 versus200, exact assertion: `fixed GET missing after actual prerequisites; tickets=0 journal=0`. This is the valid causal RED2. No GREEN GET exists.
+
+
+
+Resumed runs (each head is immutable; no automatic rerun/attempt2):
+
+| Head | Run / job | Observed result and disposition |
+| --- | --- | --- |
+|35ad25a479eb7bc5a4dad040be047e4f4d349e8b|42093279704 /127476629576|1T0P1F0skip. Fixture graph helper treated esbuild virtual define as a file, ENOENT before prerequisites. One actual QA compile. Not a product RED. Fixed capture distinguishes actual file bytes from actual virtual compile-option text; no extra build just for hashes. Upload warned no files.|
+|808a9bab84193557970a804ca5fbf619f39dff15|42093762800 /127478302248|1T0P1F0skip. GET200/ticket/ACK/HTML/nosniff assertions passed, then exact Cache-Control assertion found duplicated no-store. Fixed only new GET forward to set once. Two compiles. Full metrics JSON was split at64KiB in logs; root reconstructed it, not lost.|
+|0db9f2d1c7018dc6f572f7fe930d8dfe5acd30e7|42094285083 /127480153262|32T30P2F0skip,268249.906914ms. Two fixture expectations incorrectly wanted applied from original closeFence, whose accepted status is fenced. Corrected assertions only. Principal and all other native cases passed.62compiles.|
+|be044d4894e84497fb490720875195f5c8b15167|42095343936 /127483768304|33nativePASS plus18purePASS. Phase16 emitted6P10F because legacy fixture contained partial four-object monitoring schema. SDK/token/lint were skipped in this job.64QA/M compiles plus16phase QA invocations. No budget/hang failure.|
+|d87158c4847604446051ab27e3ef9d844b3d2f8d|42097405566 /127490953992|One authorized diagnostic case,1T0P1F0skip. Actual LIST Maptrue,size0; actual ALL success:true/array:true,size4; source fail-site phase:276. Diagnostic QA1469048B/322inputs/hash e486e62e3d00a75fa6f18d90353483f86add066f3f8f75e25134f49b0687d65e. This instrumented diagnostic bundle is not a GREEN product bundle.|
+|c0e1db92432651391d3dfc10e18c409e1b4aa4ec|42097918038 /127492728047|Phase16PASS. SDK6 emitted5P1F because old metric expected80 versus measured128 factual reads. Control returned302 with original child1532ms, HTTP112/84, peak2/active0, preflight16/writes2 intact. Token/lint skipped.12QA/M compiles plus16phase QA invocations.|
+|1c2a4a5bae85a8ed0789057c5691fd7bd9fe3cdc|42098481702 /127494691138|Only affected fanout1PASS,15030.431257ms; D04token4PASS; lint10clean. Only factual expectation changed80→128.10QA/M compiles.|
+|e71eb58f040d8de531206172c2cd0d2df897771a|42098853181 /127496007748|Only reinforced principal+consent2PASS,32356.0771ms, lint10clean.4QA/M compiles. Last test source and all product blobs qualified as above.|
+
+Canonical run links use [Actions runs](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions); each exact run/job ID above is independently retrievable. No run was canceled, replayed or extended to fit. Diagnostic onLoad code was removed before c0e1. No timeout or credential incident was inferred from temporary404 BlobNotFound while a job was still running.
+
+## Legacy SYN schema adapter: preservation and isolation
+
+The phase failures were correct product denials, not grounds to weaken success/Map/schema predicates. Native history fixture installed four consent objects and three events for foreign original/cancelled-old grants. Root authorized the already-scoped world adapter to apply the original seven IF NOT EXISTS definitions after native history seeding. It adds only owner-tickets table and its two triggers.
+
+Assertions on each affected harness verify exact SQL of four consent objects, all three existing consent rows and both existing grant rows before/after, then verify seven objects. There is no DROP/DELETE/UPDATE or new positive seed in this adapter. Other non-phase modes remain unchanged. Native stdout records consentObjectsPreserved4/consentRowsPreserved3/grantsPreserved2/objectsAfter7/addedObjects3.
+
+Comparison be044..c0e1 changed only world initialization, removal of diagnostic fixture text, and the temporary qualifier; all four product blobs were identical. Comparison c0e1..1c2a changed only the measured SDK test assertion and qualifier. Final e71 changes only two test assertions/cases and qualifier. The root documents containing the narrow ruling are referenced above and were not copied over this source branch by the writer.
+
+## Actual GET I/O, timing and budgets
+
+Final reinforced principal elapsed **1328ms** including transport and subsequent factual inspection. It observed12complete source snapshots,84actual provider HTTP GET lifecycles, peak2, active0 and84settled body/cancel lifecycles. The ticket SEND-recorded→complete interval in trace is604ms; actual SEND window<=5000ms and completion before that exact deadline are asserted. Parent remains original<=30000ms; queued negative crosses real5s without clock patch or extension.
+
+| Whole expected-frame recheck | Trace stage | Actual Date.now ms |
+| --- | --- | --- |
+| baseline | before | 1793908708614 |
+| baseline | after | 1793908708828 |
+| reservation-recorded | before | 1793908708833 |
+| reservation-recorded | after | 1793908709017 |
+| ticket-send-recorded | before | 1793908709020 |
+| ticket-send-recorded | after | 1793908709204 |
+| ticket-sql-resolved | before | 1793908709230 |
+| ticket-sql-resolved | after | 1793908709440 |
+| ticket-ack-recorded | before | 1793908709443 |
+| ticket-ack-recorded | after | 1793908709623 |
+
+Baseline observed at1793908708611; final complete1793908709624. These are real runner/workerd fixture timestamps, not live-provider latency or wall-clock evidence of deployment.
+
+- Actual captured SQL:102first-primary sessions,111statements; first62/all49. The following noticeInspect diagnostic contributes3sessions/3ALLs after complete. The source GET itself is99sessions/108statements:96factual reads across12snapshots plus original store preflight11reads and one INSERT. Original issuer preflight is8statements; monitoring preflight adds schema+two PRAGMA reads. No factual ALL borrows a preflight session.
+- Of the factual reads,36 are the new three-per-snapshot ALLs:12schema,12ticket and12event queries. Each is first on a newly created first-primary session; bound grant UUID is always the original issuer UUID. Schema cap8 accepts only0 or7; tickets cap2 rejects>=2; events cap3 rejects any row. Actual journal lists use limit7; twelve extra factual journal lists are recorded separately from three append transaction lists.
+- Observed native API invocation counters, including the final diagnostic inspection: storage.get903, storage.list109, sync3, transactions27; transaction.get99/list3/put3. The inspection adds one outer list and the three ALLs identified above. These are instrumentation categories, not a sum of billable network RPCs; do not infer cross-RPC physical drain.
+- Each own recheck preserves the full pair, original fanout scheduler/credential join, peak2 and serial snapshots. Principal source GET factual accounting is6pairs×16D1factual statements plus its12store statements, and6pairs×14HTTP GETs; timestamps/query sessions in artifact permit checking per-phase costs.
+- The separate original OAuth fanout control0 has112HTTP/84narrow observations and sixteen primary snapshots. Its actual factual SQL changed80→128 (+48=16×3), while preflight16/writes2 remain unchanged. Corrected control child1577ms, peak2/active0; no50ms repeat or scheduler change. These112/128 values are **not** GET totals.
+
+Exact new factual SQL, without values:
+
+```sql
+SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8;
+SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2;
+SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3
+```
+
+SQL/header/body/cancel failures remain retained. Native tests prove a fresh SYN lease in the same ctx is blocked while actual queued SQL or HTTP body/cancellation remains unresolved, then releases after actual settlement. This is request-scope bookkeeping, not a durable all-path writer inventory or proof of global drain. No unknown ACK was reconstructed from SELECT; no row/history was deleted to recover an outcome.
+
+## Actual compilers, graph and retained artifacts
+
+No standard compiler/build was added; standard entrypoints/configs are unchanged, and phase/new receiver remain unmounted. Actual QA/M harness builds were measured during tests, never a separate build for hashes. Current real fixture profile remains QA2026-09-07/nodejs_compat/enable_request_signal and M adds global_fetch_strictly_public.
+
+Final focused native compiler outputs:
+
+| Invocation | Bytes | Metafile inputs | Bundle SHA256 |
+| --- | ---: | ---: | --- |
+| principal QA | 1759194 | 324 | `f4232ea48bf810e47bbeecacdc16b1a6c8a1f697cee65575be33772eee024823` |
+| principal M | 1678423 | 302 | `d68eef4a16568b6bb53c4921f0d0cc111113e674ebab3127d2430d7ed1f9f032` |
+| consent negative QA | 1759194 | 324 | `d0bf2b020b6498e299b34e9484ed1dff5915b1cebde837706e12810d22e080e8` |
+| consent negative M | 1678423 | 302 | `d68eef4a16568b6bb53c4921f0d0cc111113e674ebab3127d2430d7ed1f9f032` |
+
+Compare to RED1 actual QA1706500B/320inputs and token M1671443B/300inputs: current QA adds notice wire/journal/records/receiver reachability; current M fixture adds only notice wire/forward (302inputs). M's ordinary source/token SDK graph remains separate; no unexpected standard edge was discovered. QA source phase already existed in the private harness and now imports the notice journal. No graph/byte count is a remote fit/hosting claim.
+
+Metafiles are from the actual build results and include imports/output reachability. Captured bundle SHA/bytes are actual output bytes. Input file hashes explicitly refer to repository file bytes before SYN onLoad transformations; virtual hashes refer to the exact supplied compile-option text (stdin/defines), rather than pretending virtual inputs are files. Actual transformed graph byte/import information is in the metafile. Provider/history and source-ceiling adjustments remain the existing explicit SYN harness boundary.
+
+Artifacts, each retained seven days as authorized:
+
+| Run | Artifact ID / ZIP SHA256 | Contents |
+| --- | --- | --- |
+|42093762800|13446176700 / c9c6f71fc85d85ce556474eb2d3998309acbe38f1f49f734bb3370222d9f2003|2actual QA/M graph manifests; early header-failure primary|
+|42094285083|13447421598 /59e725ce41390467f3a3aac421f34947379d1d6265f2104ef803bf5254e0df96|62actual graph manifests and principal I/O detail; CLOSE assertion-failure job|
+|42095343936|13446718826 /74a2572333a5a76ee91598b419535aaafd42b2211fca114aec5d1187caec9f19|64actual graph manifests and full principal query/session/HTTP detail;33nativeGREEN|
+|42098853181|13447389411 /5ac2ab6cf5aa1fc4ed44051e1abe6e1be3417a0eccc8bca11687b12aac8d01e9|4final actual graph manifests and final principal I/O detail;153292Bcompressed|
+
+Count ledger:10pre-shutdown fixture compiler invocations already preserved; resumed jobs1+2+62+80+1diagnostic+28+10+4=188, total198fixture invocations and0standard. Of the80/28 groups, each includes16phase-only QA builds (one per actually run harness, unlike the explicit two-worker SDK logs). All other QA/M counts are explicit compiler log lines; c0e1 additionally recorded22native schema-adapter completions (16phase+6SDK). The numerous SYN compiles are reported as cost, not hidden or presented as production builds.
+
+Artifacts expire under the authorized seven-day retention. Permanent source/report and run/hash pointers remain; no new publication/storage service or unapproved evidence destination was created.
+
+## Warnings, self-review and remaining authority limits
+
+Warnings preserved: RPC stub disposal; CIMD/profile message in SYN QA; npm deprecated esbuild-kit esm-loader/core-utils and eslint9.39.4; setup punycode DEP0040; Actions checkout/setup-node Node20-to24 warning; git default-branch hint. First graph-helper failure also emitted “no files” upload warning. Root located the same RPC warning in existing D04GREEN run42059641718/job127357402313 (762ab84265b2fb75256f1c7e17f2618e6893123a,24+3+7PASS), before this GET unit. That is dated prior evidence, not proof of identical cause or absence of current risk. No warning, MinorD03 OAuth-error precision or old fanout cleanup was fixed by scope drift.
+
+Self-review: public export set is old three-key reader/OAuth handler plus the fixed GET handler; observer/pairs and expected frames stay private. Original select helper is unchanged. No allowPending or caller identity/time/keySet/source options exist. Full expected snapshots retain actual current rows and raw SQL. SQL Promise/result/settled remain lexical until final ACK recheck, while append references are separate. Product store/journal/SDK/ordinary-M/source-stub/config/schema blobs are preserved. Final BASE diff is exactly ten approved source/test files plus this report after qualifier deletion. Root still must inspect that full diff and obtain a fresh independent spec/quality review; writer did not create a helper/reviewer.
+
+This unit produces preparation only. POST/CSRF consent, NoticeLink/stages/third CLOSED/ownSEND/full setup/cleanup/guard/ARM/mount/hosting and the complete operational package remain downstream, separately scoped. The POST design on another branch is INACTIVE and was not incorporated here.
+
+Source ceiling2026-11-03T02:59Z remains expired; no early renewal/rearm. C0=I0+900000, C1=C0+180000, parent30s/child5s unchanged. Native crypto/D1/DO/SDK/token/MCP in an explicitly SYN provider/history harness do not establish live customer Access, current runtime state or fit with a PC off. Unknown outcomes remain no-retry; code rollback never authorizes deleting historical D1/DO data or claiming global physical drain.
+
+**operationalReadiness=false; completePackage=false; PCoff=false.**

diff --git a/lib/mcp-qa-finite-owner-notice-get-forward.mjs b/lib/mcp-qa-finite-owner-notice-get-forward.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-notice-get-forward.mjs
@@ -0,0 +1,36 @@
+import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
+import {finiteNativeFailure as fail,finiteNativeUuid} from './mcp-qa-finite-owner-native-wire.mjs';
+import {finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
+import {finiteOwnerNoticeGetTarget,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeGetMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+/** Unmounted forwarding only. Transport metadata never asserts SDK results. */
+export async function forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},originalLease){
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  const originalHeaders=request.headers,headerBytes=JSON.stringify([...originalHeaders]),originalSignal=request.signal,originalUrl=request.url,originalMethod=request.method;
+  const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
+  if([idFromName,get].some(v=>typeof v!=='function')||!finiteNativeUuid(version))fail();
+  const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
+  if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
+  const check=()=>{originalLease.assertCurrent();if(request.headers!==originalHeaders||JSON.stringify([...originalHeaders])!==headerBytes||request.signal!==originalSignal||request.url!==originalUrl||request.method!==originalMethod||env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
+  check();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async first=>{
+   const bytes=await finiteNativeBytes(request,check,first);check();qualifyFiniteOwnerNoticeGetRequest(request,bytes);
+   const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
+   headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
+   headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',request.url);
+   headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
+   readFiniteOwnerNoticeGetMetadata(headers);check();
+   let response;try{
+   response=await retain(Reflect.apply(fetcher,stub,[new Request(finiteOwnerNoticeGetTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]));check();
+   const body=await finiteNativeBytes(response,check,first,503);check();
+   if(response.status!==200)return pending([400,401,403,404,405,413,429].includes(response.status)?response.status:503);
+   if(!/^text\/html(?:;|$)/i.test(response.headers.get('content-type')??''))fail();
+   const output=new Headers();
+   for(const [key,value]of response.headers){if(key==='x-content-type-options'){if(value!=='nosniff')fail();continue;}if(!['content-type','content-security-policy','referrer-policy','location','set-cookie','cache-control','x-frame-options'].includes(key)||value.length>8192)fail();output.append(key,value);}
+   output.set('Cache-Control','no-store');output.set('X-Content-Type-Options','nosniff');check();return new Response(body,{status:response.status,headers:output});
+   }finally{if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
+  }));
+ }catch{return pending();}
+}

diff --git a/lib/mcp-qa-finite-owner-notice-get-qa.mjs b/lib/mcp-qa-finite-owner-notice-get-qa.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-notice-get-qa.mjs
@@ -0,0 +1,16 @@
+import {finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
+import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
+import {finiteOwnerNoticeGetTarget,readFiniteOwnerNoticeGetMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+import {handlePrivateQaFiniteOwnerNoticeGet} from './mcp-qa-finite-owner-phase-context.mjs';
+export function createPrivateQaFiniteOwnerNoticeGetReceiver({ctx,env}){
+ return Object.freeze({async fetch(request){
+  let parent;
+  try{
+   if(!(request instanceof Request)||request.url!==finiteOwnerNoticeGetTarget)return pending(404);
+   if(request.method!=='POST')return pending(405);
+   const metadata=readFiniteOwnerNoticeGetMetadata(request.headers);
+   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
+   return await handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},parent.lease);
+  }catch{return pending();}finally{parent?.finish();}
+ }});
+}

diff --git a/lib/mcp-qa-finite-owner-notice-get-wire.mjs b/lib/mcp-qa-finite-owner-notice-get-wire.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-notice-get-wire.mjs
@@ -0,0 +1,22 @@
+import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
+export const finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
+const max=16384;
+export function qualifyFiniteOwnerNoticeGetRequest(request,bytes){
+ if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length||request.url.length>max)fail(400);
+ if(request.url!==origin+'/monitoring')fail(404);
+ if(request.method!=='GET')fail(405);
+ const from=request.headers.get('Origin');if(from!==null&&from!==origin)fail(403);
+ const cookie=request.headers.get('Cookie')??'',assertion=request.headers.get('Cf-Access-Jwt-Assertion')??'';
+ if(cookie.length>8192||assertion.length>8192||/[\r\n]/.test(cookie+assertion))fail(400);
+ const names=new Set();for(const part of cookie.split(';').filter(x=>x.trim())){const match=/^\s*([^=\s]+)=([^;\s]*)\s*$/.exec(part);if(!match||names.has(match[1]))fail(400);names.add(match[1]);}
+ return Object.freeze({method:'GET',url:request.url});
+}
+export function readFiniteOwnerNoticeGetMetadata(headers){
+ const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
+ if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
+ const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
+ if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
+ const method=headers.get('x-afw-finite-original-method'),url=headers.get('x-afw-finite-original-url'),mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
+ if(method!=='GET'||url!==origin+'/monitoring'||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
+ return Object.freeze({boundary,method:'GET',url,mVersionId,requestId});
+}

diff --git a/lib/mcp-qa-finite-owner-phase-context.mjs b/lib/mcp-qa-finite-owner-phase-context.mjs
--- a/lib/mcp-qa-finite-owner-phase-context.mjs
+++ b/lib/mcp-qa-finite-owner-phase-context.mjs
@@ -1,10 +1,15 @@
+import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+import {sealFinitePreparationNoticeRecord as noticeSeal} from './mcp-qa-finite-preparation-notice-records.mjs';
+
+import {createFinitePreparationNoticeJournal as noticeJournal} from './mcp-qa-finite-preparation-notice-journal.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
 import {randomBytes} from 'node:crypto';
 import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
 import {createFinitePreparationIssuerStore} from './mcp-qa-finite-preparation-issuer-store.mjs';
 import {sealFinitePreparationIssuerRecord as issuerSeal,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
 import {encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode,FINITE_OWNER_SDK_OPERATIONS as sdkOperations} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
 import {encodeFinitePreparationRecord as prepEncode} from './mcp-qa-finite-preparation-records.mjs';
 import {qualifyFiniteOwnerApprovedTicket,finiteOwnerAuthorizationLink,finiteOwnerGrantLink,finiteOwnerPreconnectionConnection,finiteOwnerConnectionRef,qualifyFiniteOwnerConnectionPair} from './mcp-qa-finite-owner-approved-ticket-facts.mjs';
 import {qualifyFiniteOwnerSdkBindingFacts} from './mcp-qa-finite-owner-sdk-binding-facts.mjs';
 import {createFiniteOwnerIssuerProvenanceJournal as sdkJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
 import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
@@ -105,40 +110,51 @@
      return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};
     }finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
    });
    const select=(sql,args=[])=>child(async l=>{
     const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
     if(typeof method!=='function'||!sql.startsWith('SELECT '))fail();
     const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
     const bound=Reflect.apply(bind,statement,args),first=bound?.first;if(typeof first!=='function')fail();
     const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;
    });
+   // Each factual ALL is the first statement of its own primary session.
+   const selectAll=(sql,args,cap)=>child(async l=>{
+    const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
+    if(typeof method!=='function')fail();
+    const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
+    const bound=Reflect.apply(bind,statement,args),all=bound?.all;if(typeof all!=='function')fail();
+    const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);
+    if(session.prepare!==method||statement.bind!==bind||bound.all!==all||result?.success!==true||!Array.isArray(result.results)||result.results.length>cap)fail();
+    return result.results.map(row=>own(row));
+   });
    const facts=async()=>{
     const a=await child(l=>readPrivateQaFiniteInitialAnchors({ctx,env},l)),{capsule,material,plan}=a;
     if(capsule.sourceRevision!==expected.sourceRevision||capsule.sourceTree!==expected.sourceTree||capsule.qaVersionId!==qaVersionId||capsule.moduleHash!==resident.module.sha256||requested!==null&&requested!==capsule.preconnectionId)fail();
     clock.narrow(Math.min(capsule.C0,plan.readerExpiresAt,plan.publisherExpiresAt));
     if(Date.now()<capsule.I0||Date.now()>=capsule.C0||capsule.recordedAt>Date.now()||a.alarm!==capsule.C0||canonical(a.state)!==canonical(a.zero)||Object.keys(a.records).length!==6)fail();
     for(const prefix of ['afw.qa-finite-trial.v1:','source-selection:'+capsule.sourceRevision+':'])if((await rows(prefix,1)).size)fail();
     const backupRaw=[],backupRead=async(key,kind)=>{const raw=await read(key);backupRaw.push([key,raw]);return uploadRecord(kind,raw);};
     const up='afw.finite-initial-upload.v1:'+plan.entryHash+':',backup=await backupRead(up+'backup','Backup'),receipt=await backupRead(up+'receipt','Receipt');
     for(const k of ['entryHash','materialHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId','baselineVersionId','baselineDeploymentId'])if(receipt[k]!==plan[k]||backup[k]!==plan[k])fail();
     if(backup.recordHash!==plan.manifestHash||receipt.manifestHash!==plan.manifestHash||receipt.uploadedVersionId!==capsule.activatedVersionId||receipt.moduleHash!==plan.moduleHash||receipt.configurationHash!==plan.configurationHash||backup.retainedIds.preconnectionId!==capsule.preconnectionId||canonical(backup.retainedIds)!==canonical({preconnectionId:capsule.preconnectionId,trialId:material.originalContext.trialId,activationKey:material.originalContext.publication.activationKey,withdrawalRequestId:material.originalContext.withdrawalRequestId,saveIdempotencyKey:material.originalContext.saveIdempotencyKey})||receipt.recordedAt>capsule.recordedAt)fail();
     const chunks=[];let bytes=0;
     for(const c of backup.chunks){const chunk=await backupRead(up+'chunk:'+String(c.index).padStart(3,'0'),'Chunk');if(chunk.manifestHash!==backup.recordHash||chunk.index!==c.index||chunk.bytes!==c.bytes||chunk.sha256!==c.sha256)fail();const part=Buffer.from(chunk.content,'base64');bytes+=part.length;if(bytes>2097152)fail();chunks.push(part);}
     if(bytes!==backup.moduleBytes||sha(Buffer.concat(chunks,bytes))!==backup.moduleHash)fail();
     const prefix='connection-preparation:'+capsule.preconnectionId+':',inventory=await rows(prefix,17),effects=await rows('afw.finite-policy-effect.v1:',33),enrollment=await rows('afw.finite-preparation-cleanup.v1:',3);
     if(inventory.size>16||effects.size>32||enrollment.size>2)fail();
     for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection'].some(s=>k===prefix+s))fail();
     for(const k of enrollment.keys())if(!['enrollment','ack'].some(s=>k==='afw.finite-preparation-cleanup.v1:'+s))fail();
     const issuer=await child(l=>createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
     const sdk=await child(l=>sdkJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
-    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,sdk,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer,sdk:sdk.entries})};
+    const notice=await child(l=>noticeJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,sdk,notice,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer,sdk:sdk.entries,notice})};
    };
    const first=await facts(),{capsule,material,plan}=first,p=material.ownerSelection;
    if(plan.moduleBytes!==resident.bytes.length||sha(resident.bytes)!==capsule.moduleHash||material.originalContext.original.containerId!==Reflect.apply(nodeName,node,['afw-own-event-one-occurrence-v1']).toString())fail();
    const owned=()=>child(async l=>{
     const session=Reflect.apply(withSession,db,['first-primary']),sessionPrepare=session?.prepare;
     if(typeof sessionPrepare!=='function')fail();
     const value=await retain(createDelegatedProjectRepository({db:session,grantStore:createDelegatedOAuthStore(session)}).getOwnedProject(p.project.projectId,p.subject));current(l);
     if(session.prepare!==sessionPrepare||!value||value.id!==p.project.projectId||value.userId!==p.subject||value.revision!==p.project.revision)fail();
     return {projectId:value.id,revision:value.revision,synthetic:true};
    });
@@ -246,20 +262,55 @@
      if(!grant||!authorization||grantLink.preconnectionId!==id||grantLink.authorizationHash!==i.authorizationHash||grantLink.grantId!==i.grantId||grantLink.grantHash!==sha(i.grantId)||grantLink.acceptedAt<Date.parse(grant.created_at)||grantLink.acceptedAt>Date.now())fail();
     }
     let connection=null;
     if(relation){
      if(!grantLink||relation.preconnectionId!==id||relation.grantHash!==grantLink.grantHash||relation.linkedAt<grantLink.acceptedAt||relation.linkedAt>Date.now())fail();
      connection=await getRecord('readConnectionRef',{connectionRef:relation.connectionRef});
      if(connection.connectionRef!==relation.connectionRef||connection.subject!==i.subject||connection.grantId!==i.grantId||connection.clientId!==i.clientId||connection.projectId!==i.projectId||connection.resource!==i.resource||connection.issuedAt!==relation.linkedAt||connection.expiresAt>Math.min(data.preconnection.expiresAt,data.preconnection.owner.accessExpiresAt,Date.parse(grant.expires_at))||Date.now()>=connection.expiresAt)fail();
     }
     return {schema,fence,consent,grant,authorization,grantLink,relation,connection};
    };
+   const noticePrimary=async(f,data,issuerFacts)=>{
+    const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity;
+    if(n.freeze||n.operations.consent.send||n.operations.consent.ack)fail();
+    const objects=await selectAll("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8",[],8);
+    if(objects.length!==0&&objects.length!==7)fail();
+    const empty={schema:null,tickets:[],events:[]};
+    if(!objects.length){if(r)fail();return empty;}
+    const normalize=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
+    for(const row of objects)fields(row,['type','name','tbl_name','sql']);
+    for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
+     const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/),table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
+     if(!objects.some(row=>row.type===kind.toLowerCase()&&row.name===name&&row.tbl_name===table&&typeof row.sql==='string'&&normalize(row.sql)===normalize(def)))fail();
+    }
+    const schema={objects};
+    if(!i){if(r)fail();return {...empty,schema};}
+    const tickets=await selectAll('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2',[i.grantId],2);
+    const events=await selectAll('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3',[i.grantId],3);
+    if(tickets.length>=2||events.length)fail();
+    if(!r){if(tickets.length)fail();return {schema,tickets,events};}
+    const grant=issuerFacts.grant,ops=f.issuer.operations,sdk=f.sdk;
+    if(!grant||!issuerFacts.authorization||!issuerFacts.grantLink||!issuerFacts.relation||!issuerFacts.connection||!data.preconnection||!data.approval||!sdk.root||!sdk.grant||!['sdk_begin','sdk_approve','sdk_complete'].every(op=>sdk.operations[op].send&&sdk.operations[op].observed)||!ops.grant.ack||ops.grant.ack.outcome!=='applied')fail();
+    for(const op of Object.values(ops))if(op.send&&!op.ack||op.ack&&!op.send)fail();
+    const expectedGrant={scopes:JSON.parse(grant.scopes_json),createdAt:grant.created_at,expiresAt:grant.expires_at};
+    const t=r.ticket,ceil=Math.min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,issuerFacts.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(grant.expires_at));
+    if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil||Date.now()>=t.permissionExpiresAt)fail();
+    clock.narrow(ceil);
+    const {send,ack}=n.operations.ticket;
+    if(send?.issuedAt>Date.now()||ack?.observedAt>Date.now())fail();
+    const row=expectedNoticeTicket(i,t);
+    if(tickets.some(v=>canonical(v)!==canonical(row)))fail();
+    if(!send&&tickets.length)fail();
+    if(ack?.outcome==='applied'&&(tickets.length!==1||ack.sequence!==null||ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',tickets[0])))fail();
+    if(ack?.outcome==='no_mutation'&&(tickets.length||ack.rowHash!==null||ack.sequence!==null))fail();
+    return {schema,tickets,events};
+   };
    const qualify=async(f,actual)=>{
     const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),id=capsule.preconnectionId,prefix='connection-preparation:'+id+':';
     const getRecord=async(method,arg,required=true)=>{const v=await child(l=>store[method](arg,l));if(v.status==='absent'&&!required)return null;if(v.status!=='observed')fail();return v.record;};
     const data={};
     if(f.inventory.size){
      data.sourceSnapshot=await getRecord('readOwnerSourceSnapshot',{preconnectionId:id});
      if(data.sourceSnapshot.preconnectionId!==id||canonical(data.sourceSnapshot.source)!==canonical(source))fail();
      data.ticket=await getRecord('readTicket',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
      if(!data.ticket){
       data.ticketUse=await getRecord('readTicketUse',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
@@ -303,45 +354,53 @@
     if(receipt?(actual.pointer.versionId!==receipt.versionId||actual.pointer.deploymentId!==receipt.deploymentId):(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId))fail();
     if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
     const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
     if(f.sdk.root){
      const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
      if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
      if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
      if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.now()>=Date.parse(g.expiresAt)||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
      if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
     }
-    return {receipt,data,enrollment,ack,issuerFacts};
+    const noticeFacts=await noticePrimary(f,data,issuerFacts);
+    return {receipt,data,enrollment,ack,issuerFacts,noticeFacts};
    };
    const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
    const snapshot=(f,physical,q)=>({
     sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
     anchor:JSON.parse(f.anchor),physical,
     preparation:Object.fromEntries(['sourceSnapshot','ticket','ticketUse','projectRef','preconnection','stageApproval','approval'].map(k=>[k,q.data[k]??null])),
-    records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk.entries},
+    records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk.entries,notice:f.notice},
     installed:{receipt:q.receipt,enrollment:q.enrollment,ack:q.ack},
+    noticeRows:q.noticeFacts,
     issuerRows:{schema:null,fence:null,consent:null,grant:null,authorization:null,grantLink:null,relation:null,connection:null,...q.issuerFacts}
    });
    const pair={first:snapshot(first,observed,qualified),second:snapshot(second,again,secondQualified)};
    if(canonical(pair.first)!==canonical(pair.second))fail();
    current(clock.lease);return freezeOwnerPhaseData(pair);
   });
   return await run();
  }finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}
 }
 
 
+function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
+function requireEmptyNotice(s){
+ const n=s.records.notice;
+ if(n.reservation||n.freeze||Object.values(n.operations).some(v=>v.send||v.ack)||s.noticeRows.tickets.length||s.noticeRows.events.length)fail();
+}
 function freezeOwnerPhaseData(value){
  if(value&&typeof value==='object'){for(const v of Object.values(value))freezeOwnerPhaseData(v);Object.freeze(value);}return value;
 }
 function qualifySettledOwnerPair(pair){
  for(const s of [pair.first,pair.second]){
+  requireEmptyNotice(s);
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
@@ -392,21 +451,21 @@
    let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false;
    // These are lexical objects, never fields in a frame/journal/response.
    let consumption=null,consumptionChild=null,consumptionStore=null;
    const readSdk=(suffix)=>{const row=expected.records.sdk.find(([key])=>key===sdkPrefix+suffix);return row?JSON.parse(row[1]):null;};
    function updateAnchor(){
     expected.anchor.inventory=structuredClone(expected.records.inventory);
     expected.anchor.issuer=structuredClone(expected.records.issuer);
     expected.anchor.sdk=structuredClone(expected.records.sdk);
    }
    async function recheckOwned(){
-    check();
+    check();requireEmptyNotice(expected);
     if(actualPromise&&!settled)fail();
     const pendingIssuer=Object.entries(expected.records.issuer.operations).filter(([,v])=>v.send&&!v.ack).map(([k])=>k);
     const pendingSdk=sdkOperations.filter(op=>readSdk(op+':send')&&!readSdk(op+':observed'));
     if(pendingIssuer.length+pendingSdk.length>1)fail();
     if(pendingIssuer.length&&(pendingIssuer[0]!==operation||!['issuer-send','issuer-resolved'].includes(position)))fail();
     if(pendingSdk.length&&(pendingSdk[0]!==operation||!['sdk-send','sdk-resolved'].includes(position)))fail();
     if(position.endsWith('-resolved')&&(!actualPromise||!settled||!actualResult))fail();
     const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
     if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
     check();
@@ -537,10 +596,122 @@
     if(typeof result?.redirectTo!=='string'||result.redirectTo.length>8192)fail();
     const target=new URL(result.redirectTo),registered=new URL(approved.request.redirectUri);
     if(target.origin!==registered.origin||target.pathname!==registered.pathname||!target.searchParams.get('code'))fail();
     return digest('afw.finite-owner-sdk-complete-result.v1',{redirectHash:sha(result.redirectTo)});
    });
    await recheckOwned();const out=new Headers(approved.headers);out.set('Location',completed.redirectTo);out.set('Cache-Control','no-store');
    if([...out].some(([,v])=>v.length>8192))fail();check();return new Response(null,{status:302,headers:out});
   }));
  }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
 }
+
+/** UNMOUNTED fixed GET. Only this invocation can retain its own SQL result. */
+export async function handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease){
+ let clock,onAbort;
+ try{
+  if(arguments.length!==2)fail();fields(arguments[0],['request','env','ctx']);if(!(request instanceof Request))fail();
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
+   const received=readFiniteOwnerNoticeGetMetadata(request.headers);
+   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
+   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
+   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
+   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
+   let identity=null,activeChild=null;
+   const holders=()=>{
+    current(originalLease);issuerCapture.holders();
+    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
+    if(identity&&Date.now()>=identity.expiresAt)fail();
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
+   const wait=async promise=>{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;};
+   const bytes=await wait(finiteNativeBytes(request,check,firstFailure));check();
+   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   qualifyFiniteOwnerNoticeGetRequest(original,bytes);
+   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);
+   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.noticeRows.schema)fail();
+   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
+   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
+   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
+   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
+   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
+   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
+   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
+   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
+   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject||identity.subject!==expected.records.issuer.reservation?.identity.subject)fail();
+   const issuer=expected.records.issuer,rows=expected.issuerRows,i=issuer.reservation?.identity;
+   if(!i||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||issuer.operations.grant.ack?.outcome!=='applied')fail();
+   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':';
+   const sdkNames=new Set(expected.records.sdk.map(([key])=>key));
+   if(!['root','grant','sdk_begin:observed','sdk_approve:observed','sdk_complete:observed'].every(k=>sdkNames.has(sdkPrefix+k)))fail();
+   if(rawCookies.some(v=>v.startsWith('__Host-afw-monitoring-owner=')))fail();
+   const accessExpiresAt=Math.min(identity.expiresAt,prep.preconnection.owner.accessExpiresAt,i.C0),preconnectionExpiresAt=prep.preconnection.expiresAt;
+   const permissionCeiling=Math.min(accessExpiresAt,preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at));
+   clock.narrow(permissionCeiling);
+   const at=Date.now(),handle=randomBytes(32).toString('base64url'),expiresAt=Math.min(at+600000,permissionCeiling);
+   if(expiresAt<=at)fail();
+   const ticket={handleHash:sha(handle),requestId:crypto.randomUUID(),expectedSequence:0,issuedAt:at,expiresAt,permissionExpiresAt:expiresAt};
+   const expectedGrant={scopes:JSON.parse(rows.grant.scopes_json),createdAt:rows.grant.created_at,expiresAt:rows.grant.expires_at},consumedAt=rows.consent.consumed_at;
+   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
+   let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,ownedReservation=null,ownedSend=null;
+   const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
+   async function recheckNoticeGetOwned(){
+    check();
+    if(actualPromise&&!settled)fail();
+    for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+    const names=new Set(expected.records.sdk.map(([key])=>key));
+    for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+    const n=expected.records.notice;
+    if(n.freeze||n.operations.consent.send||n.operations.consent.ack)fail();
+    if(position==='baseline'){requireEmptyNotice(expected);if(ownedReservation||ownedSend||operation)fail();}
+    else{
+     if(!ownedReservation||canonical(n.reservation)!==canonical(ownedReservation))fail();
+     if(position!=='reservation-recorded'){
+      if(operation!=='ticket'||!ownedSend||canonical(n.operations.ticket.send)!==canonical(ownedSend)||ownedSend.reservationHash!==ownedReservation.recordHash)fail();
+      if(['ticket-sql-resolved','ticket-ack-recorded'].includes(position)&&(!actualPromise||!settled||actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket))))fail();
+     }
+    }
+    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
+    check();
+   }
+   await recheckNoticeGetOwned();
+   await clock.child((l)=>retain((async()=>{
+    activeChild=l;check();
+    const record=noticeSeal('Reservation',{purpose:'afw.finite-preparation-notice-reservation.v1',identity:i,issuerReservationHash:issuer.reservation.recordHash,originalGrantAckHash:issuer.operations.grant.ack.recordHash,grantLinkHash:prepHash('GrantLink',rows.grantLink),connectionHash:prepHash('ConnectionRef',rows.connection),expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,ticket,issuedAt:Date.now()});
+    const appendPromise=retain(journal.appendReservation(record,l)),appendResult=await wait(appendPromise);
+    if(appendResult?.status!=='recorded'||appendResult.recordHash!==record.recordHash)fail();
+    ownedReservation=record;expected.records.notice.reservation=structuredClone(record);anchor();position='reservation-recorded';
+    await recheckNoticeGetOwned();activeChild=null;
+   })()));
+   await clock.child((l,deadline)=>retain((async()=>{
+    activeChild=l;check();
+    const window={startedAt:Date.now(),deadline:Math.min(deadline,permissionCeiling)};
+    const common={identity:i,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window};
+    const send=noticeSeal('Send',{purpose:'afw.finite-preparation-notice-send.v1',identityHash:i.identityHash,reservationHash:ownedReservation.recordHash,operation:'ticket',requestHash:digest('afw.finite-preparation-notice-request.v1',{operation:'ticket',common,ticket,decisionHash:null}),accessExpiresAt,window,issuedAt:Date.now(),decisionHash:null});
+    const appendSendPromise=retain(journal.appendSend({preconnectionId:id,record:send},l)),appendSendResult=await wait(appendSendPromise);
+    if(appendSendResult?.status!=='recorded'||appendSendResult.recordHash!==send.recordHash)fail();
+    ownedSend=send;operation='ticket';expected.records.notice.operations.ticket.send=structuredClone(send);anchor();position='ticket-send-recorded';await recheckNoticeGetOwned();check();
+    position='ticket-sql-pending';settled=false;
+    actualPromise=retain(store.insertMonitoringTicket({...common,ticket},l));
+    actualResult=await wait(actualPromise);settled=true;
+    if(actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket)))fail();
+    expected.noticeRows.tickets=[structuredClone(actualResult.row)];position='ticket-sql-resolved';await recheckNoticeGetOwned();check();
+    const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownedSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualResult.row),sequence:null,observedAt:Date.now()});
+    const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'ticket',record:ack},l)),appendAckResult=await wait(appendAckPromise);
+    if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
+    expected.records.notice.operations.ticket.ack=structuredClone(ack);anchor();position='ticket-ack-recorded';await recheckNoticeGetOwned();activeChild=null;
+   })()));
+   check();
+   const maxAge=Math.floor((ticket.expiresAt-Date.now())/1000);if(maxAge<1)fail();
+   const escaped=handle.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),nonce=randomBytes(18).toString('base64url');
+   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Preparación de avisos</title><body><h1>Preparación de avisos</h1><p>Preparé un formulario temporal. Todavía no diste permiso para avisos. El envío de este formulario aún no está habilitado.</p><form><input type="hidden" name="handle" value="'+escaped+'"><button type="button" disabled>Permitir avisos temporales</button></form><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
+   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'nonce-"+nonce+"'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'Set-Cookie':'__Host-afw-monitoring-owner='+handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+maxAge}});
+  }));
+ }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
+}
+

diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,10 +1,12 @@
+import {extendFiniteOwnerNoticeGet,captureNoticeBundle,instrumentFiniteNoticeGet} from './finite-owner-notice-get.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
 import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
 import {readFile,mkdtemp,rm} from 'node:fs/promises';
 import {tmpdir} from 'node:os';
@@ -33,57 +35,60 @@
  const b=await mf.getBindings(),ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
  const program='SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
  const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
  const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
  let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
  if(mode.startsWith('enrollment'))entry=extendPreparationCleanupFixture(entry);
  if(mode.startsWith('phase-context'))entry=extendFiniteOwnerPhaseContext(entry);
- if(mode.startsWith('phase-context-sdk'))entry=extendFiniteOwnerQaSdk(entry,{observed:mode.startsWith('phase-context-sdk-observed')});
- if(mode==='phase-context-sdk-io')entry=extendFiniteOwnerIo(entry);
+ if(mode.startsWith('phase-context-sdk'))entry=extendFiniteOwnerQaSdk(entry,{observed:mode.startsWith('phase-context-sdk-observed'),noticeGet:mode==='phase-context-sdk-token-notice-get'});
+ if(mode==='phase-context-sdk-io'||mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerIo(entry);
+ if(mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerNoticeGet(entry);
  let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
  const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
  if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
  const sources=new Map();
  for(const p of ['mcp-qa-finite-initial-entry.mjs','mcp-qa-finite-initial-entry-records.mjs','mcp-qa-finite-initial-capsule-records.mjs','mcp-qa-finite-initial-cleanup.mjs']){try{const s=await readFile('lib/'+p,'utf8');sources.set(p,s.replaceAll("Date.parse('2026-11-03T02:59:00Z')",String(approval)));}catch{/* RED: finite class has no entry yet. */}}
  for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
   const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
  }
  if(mode.startsWith('phase-context-sdk-observed')){
   // Test-only error-location observation; no return/guard/authority replacement.
   const instrument=source=>source.replaceAll('catch{return pending();}',"catch(error){console.info('D02 initial failure frames',String(error?.stack??'').split('\\n').slice(1,5).join(' | '));if(/^Finite historical source unavailable:(input|custody|http|metadata|historical_slots|legacy|history|coherence|deadline)$/.test(error?.message??''))console.info('D02 historical gate',error.message);return pending();}");
   product=instrument(product);
   sources.set('mcp-qa-finite-initial-entry.mjs',instrument(sources.get('mcp-qa-finite-initial-entry.mjs')));
  }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  if(mode==='phase-context-sdk-token-notice-get')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteNoticeGet(instrumentFiniteOwnerIo(await readFile(args.path,'utf8'))),loader:'js'}));
   if(mode==='phase-context-sdk-io')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerIo(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
    let contents=await readFile(args.path,'utf8');
    const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
    assert.equal(contents.split(needle).length,2);
    const values={'enrollment-pin-absent':'null','enrollment-pin-foreign':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,sourceRevision:'f'.repeat(40)})",'enrollment-pin-malformed':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,module:{name:'index.mjs',sha256:'f',bytes:1}})",'enrollment-pin-accessor':"Object.defineProperty({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__},'module',{enumerable:true,get(){throw Error('SYN accessor executed');}})"};
    contents=contents.replace(needle,'const compiledResidency='+values[mode]+';');return {contents,loader:'js'};
   });
   if(mode.startsWith('enrollment'))b.onResolve({filter:/mcp-qa-finite-(owner-source|connection-source)\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-preparation-cleanup-source.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
   b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-(initial-entry|initial-entry-records|initial-capsule-records|initial-cleanup|historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
   b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
   b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
   b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin,operator:opPin})+';',loader:'js'}));
  }};
  const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
  if(mode.startsWith('phase-context-sdk'))console.info('D02 fixture QA compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:sha(built.outputFiles[0].contents),inputs:Object.keys(built.metafile.inputs).length}));
+ if(mode==='phase-context-sdk-token-notice-get')await captureNoticeBundle(built,'QA',{'<stdin>':entry,'<define:globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__>':J(resident),'<define:globalThis.__AFW_QA_SOURCE_REVISION__>':J(M),'<define:globalThis.__AFW_FINITE_SOURCE_TREE__>':J(TREE),'<define:globalThis.__AFW_NODE_PROGRAM__>':J(program),'<define:globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__>':J(w.expected)});
  let finalOptions={...base,script:built.outputFiles[0].text,outboundService:async req=>{
   await delayFiniteOwnerIo(f,req);
   if(req.url.endsWith('/cdn-cgi/access/certs'))return Response.json({keys:[jwk]});
   f.requests.push(req.url);(f.observationTimes??=[]).push({at:Date.now(),method:req.method,kind:new URL(req.url).origin==='https://api.cloudflare.com'?'provider':'ledger'});(f.requestMethods??=[]).push(req.method);
   let value;
   if(req.url.startsWith(GH)){
    assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
    if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
   }else{
    assert.ok(['Bearer synthetic-native-reader','Bearer synthetic-native-publisher'].includes(req.headers.get('authorization')));
@@ -195,30 +200,41 @@
     if(mode==='publisher-revoked-before-send'&&role==='publisher'&&f.publisherReads>=3)result.status='disabled';
     if(mode===role+'-wrong-id')result.id='0'.repeat(32);
     if(mode===role+'-inactive')result.status='disabled';
     if(mode===role+'-expired')result.expires_on=new Date(Date.now()-1).toISOString();
     if(mode===role+'-not-before')result.not_before=new Date(Date.now()+60000).toISOString();
    }
    value={success:true,errors:[],messages:[],result};
   }
   return Response.json(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
  }};
- if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
+ if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io',noticeGet:mode==='phase-context-sdk-token-notice-get'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
  finalOptions=convertV4MiniflareOptions(finalOptions);
  await mf.setOptions(finalOptions);
  const bindings=await mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
  if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
- if(mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
+ if(mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();
+ const oldMonitoringSql=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results;
+ const oldMonitoringEvents=(await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results;
+ const originalGrants=(await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results;
+ assert.equal(originalGrants.length,2);assert.equal(oldMonitoringSql.length,4);assert.equal(oldMonitoringEvents.length,3);
+ for(const sql of FINITE_PREPARATION_MONITORING_SCHEMA)await f.db.prepare(sql).run();
+ assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results,oldMonitoringSql);
+ assert.deepEqual((await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results,oldMonitoringEvents);
+ assert.equal((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").all()).results.length,7);
+ assert.deepEqual((await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results,originalGrants);
+ console.info('NOTICE SYN schema adapter',JSON.stringify({consentObjectsPreserved:4,consentRowsPreserved:3,grantsPreserved:2,objectsAfter:7,addedObjects:3}));}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
  if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
  if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
  f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
  f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
  f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
  f.alarmAt=async at=>{f.nowOffset=at-Date.now();try{return await f.stub.initialAlarmAt(at);}finally{f.nowOffset=0;}};
  f.ownerRead=async(delta=400000,...args)=>{const rows=await f.stub.snapshot();let raw;try{raw=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule')[1]);}finally{rows[Symbol.dispose]?.();}f.nowOffset=raw.I0+delta-Date.now();try{return await f.stub.ownerSourceRead(delta,...args);}finally{f.nowOffset=0;}};
  f.future=async(kind='complete')=>{await f.stub.seedFutureActivation(kind);const rows=await f.stub.snapshot(),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);f.activationAnnotation='afw-finite-initial-activate-'+plan.recordHash;f.pointerMode='candidate';return plan;};
  f.cleanup=async()=>{if(persist){assert.ok(resolve(persist).startsWith(resolve(tmpdir())+'/afw-entry-restart-'));await rm(persist,{recursive:true,force:true});}};
  f.enrollmentToken=async (source,expiresAt=Math.floor((Date.now()+3600000)/1000))=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ if(mode==='phase-context-sdk-token-notice-get')f.noticeToken=async({subject='owner',audience=f.source.access.audience,issuer='https://'+f.source.access.teamDomain,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
  f.refs={commandId:COMMAND,sourceRevision:M,qaVersionId:UUID,initialInstanceId:'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId:COMMAND,sourceRevision:M,qaVersionId:UUID}),workflowName:'afw-own-qa-private-bootstrap',createdAt:mode==='partial'?Date.now()-29700:mode==='upload-partial'?Date.now()-27000:Date.now()};
  return f;
  }catch(error){await disposeFailedInitialization();throw error;}
 }

diff --git a/test/fixtures/finite-owner-io-fanout.mjs b/test/fixtures/finite-owner-io-fanout.mjs
--- a/test/fixtures/finite-owner-io-fanout.mjs
+++ b/test/fixtures/finite-owner-io-fanout.mjs
@@ -1,12 +1,13 @@
 // Fixed test-only I/O observation. No SDK/KV wrapper or strict-source probe.
 export function instrumentFiniteOwnerIo(source){
+ const noticeStart=source.indexOf('/** UNMOUNTED fixed GET.'),noticeSuffix=noticeStart<0?'':source.slice(noticeStart);if(noticeStart>=0)source=source.slice(0,noticeStart);
  const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN I/O marker changed: '+needle);source=source.replace(needle,replacement);};
  const runtime=String.raw`
 const ioState=()=>globalThis.__finiteIo;
 const ioBranch=(name,value)=>{const s=ioState();if(s)s.branches[name]=value;};
 const ioBegin=(path,token,reader,snapshot)=>{
  const s=ioState();if(!s)return null;
  if(s.rows.length>=1024)throw Error('SYN bounded I/O trace');
  const category=path==='/tokens/verify'?(token===reader?'verify-reader':'verify-publisher'):path.includes('independent-closure-qa/deployments')?'qa-deployment':path.includes('independent-closure-qa/versions')?'qa-version':path.includes('/deployments')?'m-deployment':path.includes('/55555555-5555-4555-8555-555555555555?')?'m-initial-version':'m-current-version';
  const row={category,method:'GET',ordinal:s.rows.length+1,snapshot,branch:category.startsWith('verify-')?'credentials':category.startsWith('qa-')?'qa':'m',startedAt:Date.now(),startMono:performance.now(),bytes:0,outcome:'pending',fetchStarted:false};
  s.rows.push(row);s.active++;s.peak=Math.max(s.peak,s.active);return row;
@@ -41,21 +42,24 @@
  once("}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}","}finally{try{if(io){io.cancelStartedAt=performance.now();if(io.outcome==='pending')io.outcome='rejected';}if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}finally{if(io)io.cancelSettledAt=performance.now();ioEnd(io);}}");
  once("const primary=async()=>{\n    await credentials();","const primary=async()=>{\n    ioSnapshot=ioState()?++ioState().snapshots:0;if(ioState())ioState().branches={qa:'not-started',m:'not-started'};await credentials();");
  once("const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});","const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const io=ioState(),startedAt=Date.now(),startMono=performance.now(),first=io?.rows.length,sqlFirst=globalThis.__finiteIoOwner?.sdkPrimary?.length??0;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{if(io?.consuming){io.child={startedAt,startMono,deadline:until,endedAt:Date.now(),endMono:performance.now(),first,last:io.rows.length,sqlFirst,sqlLast:globalThis.__finiteIoOwner?.sdkPrimary?.length??0};io.consuming=false;}activeChild=null;}});");
  once("consumptionChild=l;consumptionStore=store;","consumptionChild=l;consumptionStore=store;if(ioState())ioState().consuming=true;");
  once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();if(ioState())ioState().same={child:consumptionChild===l,store:consumptionStore===store};");
  once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","onAbort=()=>{if(ioState())ioState().parentAborted=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
  once("const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));","const qaWork=retain(Promise.resolve().then(()=>{ioBranch('qa','pending');return readQaPrimary();}).finally(()=>ioBranch('qa','settled'))),mWork=retain(Promise.resolve().then(()=>{ioBranch('m','pending');return readMPrimary();}).finally(()=>ioBranch('m','settled')));");
  once("const joined=await retain(Promise.allSettled([qaWork,mWork]));","const joined=await retain(Promise.allSettled([qaWork,mWork]));await ioCheckpoint('joined-before-consumption');");
  once("const observed=await primary();","const observed=await primary();await ioCheckpoint('after-first');");
  once("const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);","const qualified=await qualify(first,observed);await ioCheckpoint('between');const again=await primary(),second=await facts(),secondQualified=await qualify(second,again);");
- return source;
+
+ once("const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;","if(ioState())ioState().factualFirst=(ioState().factualFirst??0)+1;const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;");
+ once("const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);","if(ioState())ioState().factualAll=(ioState().factualAll??0)+1;const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);");
+ return source+noticeSuffix;
 }
 export function extendFiniteOwnerIo(entry){
  const needle=' export class Initial extends FiniteClosure{';if(entry.split(needle).length!==2)throw Error('SYN I/O class marker');
  return entry.replace(needle,needle+String.raw`
  async ioConfigure(options={}){
   await this.sdkPrimaryObserve();globalThis.__finiteIoOwner=this;
   globalThis.__finiteIo={rows:[],active:0,peak:0,snapshots:0,child:null,fail:options.fail??null,hold:options.hold??null,checkpoint:options.checkpoint??null,pendingCategory:options.pendingCategory??null,branches:{}};
  }
 
  async ioRelease(kind='all'){
@@ -68,19 +72,19 @@
  async ioProbe(){
   const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/retention'));
   try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}
   catch{return {allowed:false};}finally{root.finish();}
  }
  async ioObservation(){
   const s=globalThis.__finiteIo;if(!s)return null;
   const c=s.child,sessions=c?(this.sdkPrimary??[]).slice(c.sqlFirst,c.sqlLast):[];
   let factual=0,preflight=0,writes=0;
   for(const session of sessions){if(session.queries.length===8)preflight+=8;else for(const sql of session.queries){if(sql.startsWith('SELECT '))factual++;else writes++;}}
-  return {rows:s.rows,branches:s.branches,active:s.active,peak:s.peak,snapshots:s.snapshots,child:s.child,same:s.same??null,held:s.held??null,checkpointHeld:s.checkpointHeld??null,parentAborted:s.parentAborted??false,sql:{factual,preflight,writes}};
+  return {factualFirst:s.factualFirst??0,factualAll:s.factualAll??0,rows:s.rows,branches:s.branches,active:s.active,peak:s.peak,snapshots:s.snapshots,child:s.child,same:s.same??null,held:s.held??null,checkpointHeld:s.checkpointHeld??null,parentAborted:s.parentAborted??false,sql:{factual,preflight,writes}};
  }
 `);
 }
 export async function delayFiniteOwnerIo(f,req){
  if(!f.ioDelay||req.method!=='GET'||new URL(req.url).origin!=='https://api.cloudflare.com')return;
  const start=performance.now();while(performance.now()-start<f.ioDelay)await new Promise(resolve=>setTimeout(resolve,f.ioDelay-(performance.now()-start)));
  (f.ioWaits??=[]).push(performance.now()-start);
 }

diff --git a/test/fixtures/finite-owner-notice-get.mjs b/test/fixtures/finite-owner-notice-get.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-notice-get.mjs
@@ -0,0 +1,129 @@
+import {createHash} from 'node:crypto';
+import {mkdir,writeFile,readFile} from 'node:fs/promises';
+import {join} from 'node:path';
+// Actual harness compiler evidence, never a separate compiler or source authority.
+let bundleIndex=0;
+export async function saveNoticeObservation(data){
+ if(!process.env.AFW_NOTICE_BUNDLE_CAPTURE)return;
+ const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
+ await writeFile(join(directory,'principal-io-'+process.pid+'.json'),JSON.stringify(data));
+}
+export async function captureNoticeBundle(built,role,virtualSources={}){
+ if(!process.env.AFW_NOTICE_BUNDLE_CAPTURE)return;
+ const bytes=built.outputFiles[0].contents,sha256=createHash('sha256').update(bytes).digest('hex'),metafile=built.metafile;
+ const inputs=await Promise.all(Object.entries(metafile.inputs).map(async([path,data])=>({path,bytes:data.bytes,imports:data.imports,virtual:path.startsWith('<'),sha256:path.startsWith('<')?(Object.hasOwn(virtualSources,path)?createHash('sha256').update(virtualSources[path]).digest('hex'):null):createHash('sha256').update(await readFile(path)).digest('hex'),hashKind:path.startsWith('<')?'actual-compile-option-text':'file-bytes'})));
+ const data={role,bytes:bytes.length,sha256,inputs,metafile,graphSha256:createHash('sha256').update(JSON.stringify(metafile)).digest('hex')};
+ const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
+ await writeFile(join(directory,role+'-'+process.pid+'-'+(++bundleIndex)+'.json'),JSON.stringify(data));
+ console.info('NOTICE actual compiler graph',JSON.stringify({role,bytes:bytes.length,sha256,inputs:inputs.length,noticeInputs:inputs.filter(x=>x.path.includes('notice-get')||x.path.includes('notice-journal')).map(x=>x.path)}));
+}
+// SYN negative corruption and factual observation only. No positive SQL producer.
+export function extendFiniteOwnerNoticeGet(entry){
+ const methods=String.raw`
+
+ async noticeConfigure(mode='normal'){
+  this.noticeRestore?.();globalThis.__noticeOwner=this;this.noticeMode=mode;this.noticeHeld=null;this.noticeRelease=null;
+  const state=globalThis.__noticeState={trace:[],sql:[],ops:{get:0,list:0,sync:0,transaction:0,txGet:0,txList:0,txPut:0},lists:[],resolution:null};this.noticeState=state;
+  const db=this.env.RELEASE_DB,sessionMethod=db.withSession,storage=this.ctx.storage,originals={get:storage.get,list:storage.list,sync:storage.sync,transaction:storage.transaction};
+  for(const kind of ['get','list','sync'])storage[kind]=(...args)=>{state.ops[kind]++;if(kind==='list')state.lists.push({prefix:String(args[0]?.prefix??''),limit:args[0]?.limit??null});return Reflect.apply(originals[kind],storage,args);};
+  storage.transaction=callback=>{state.ops.transaction++;return Reflect.apply(originals.transaction,storage,[async tx=>{
+   const actual={get:tx.get,list:tx.list,put:tx.put};
+   const wrapped={};for(const [name,method]of Object.entries(actual))wrapped[name]=(...args)=>{state.ops[{get:'txGet',list:'txList',put:'txPut'}[name]]++;return Reflect.apply(method,tx,args);};
+   return callback(wrapped);
+  }]);};
+  db.withSession=constraint=>{
+   const session=Reflect.apply(sessionMethod,db,[constraint]),prepare=session.prepare,record={constraint,queries:[]};state.sql.push(record);
+   session.prepare=sql=>{
+    const statement=Reflect.apply(prepare,session,[sql]),entry={sql,method:null};record.queries.push(entry);
+    return {bind:(...args)=>{
+     const bound=statement.bind(...args),run=async kind=>{
+      entry.method=kind;entry.at=Date.now();
+      const ticketInsert=sql.includes('INSERT INTO dossier_monitoring_owner_tickets');
+      if(ticketInsert){state.sqlEnteredAt=Date.now();if(this.noticeMode==='queue'||this.noticeMode==='hold-before')await this.noticeGate('before-sql');}
+      const actual=Reflect.apply(bound[kind],bound,[]),result=await actual;entry.doneAt=Date.now();
+      if(ticketInsert){state.resolution={at:Date.now(),row:result!==null};if(this.noticeMode==='hold-after')await this.noticeGate('after-sql');if(this.noticeMode==='lost-sql')throw Error('SYN NEGATIVE actual SQL committed, result lost');}
+      if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='failed-schema-metadata')return {...result,success:false};
+      return result;
+     };
+     return {first:()=>run('first'),all:()=>run('all')};
+    }};
+   };return session;
+  };
+  this.noticeRestore=()=>{for(const [k,v]of Object.entries(originals))storage[k]=v;db.withSession=sessionMethod;};
+ }
+ async noticeGate(name){
+  const state=this.noticeState;state.trace.push({gate:name,at:Date.now()});this.noticeHeld=name;
+  await new Promise(resolve=>{this.noticeRelease=()=>{this.noticeRelease=null;this.noticeHeld=null;resolve();};});
+ }
+ async noticeReleaseHeld(){this.noticeRelease?.();}
+ async noticeStateRead(){return {held:this.noticeHeld??null,mode:this.noticeMode,state:this.noticeState??null};}
+ async noticeProbe(){
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-probe'));
+  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}catch{return {allowed:false};}finally{root.finish();}
+ }
+ async noticeFence(){
+  const rows=[...await this.ctx.storage.list()],reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]),parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-close'));
+  try{return await phaseIssuerStore({ctx:this.ctx,env:this.env}).closeFence({identity:reservation.identity,window:{startedAt:Date.now(),deadline:Date.now()+4500},fenceRequestId:'22222222-2222-4222-8222-222222222222'},parent.lease);}finally{parent.finish();}
+ }
+ async noticeInspect(){
+  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
+  const issuer=all.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:'+capsule.preconnectionId+':')&&k.endsWith(':reservation')),identity=issuer?JSON.parse(issuer[1]).identity:null;
+  const schema=(await this.env.RELEASE_DB.withSession('first-primary').prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").bind().all()).results;
+  const tickets=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2').bind(identity.grantId).all()).results:[];
+  const events=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3').bind(identity.grantId).all()).results:[];
+  return {notice:all.filter(([k])=>k.startsWith(prefix)),schema,tickets,events};
+ }
+ async noticeCorrupt(kind){
+  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
+  if(kind==='own-unknown')await this.ctx.storage.put(prefix+'unknown','SYN NEGATIVE unknown key');
+  else if(kind==='foreign-unknown')await this.ctx.storage.put('afw.finite-preparation-notice.v1:'+'f'.repeat(64)+':unknown','SYN NEGATIVE foreign history');
+ 
+  else if(kind==='overflow')for(let n=0;n<7;n++)await this.ctx.storage.put(prefix+'unknown'+n,'SYN NEGATIVE overflow');
+  else if(kind==='ack-without-send')await this.ctx.storage.put(prefix+'ticket:ack','SYN NEGATIVE malformed ACK');
+  else if(kind==='foreign-send')await this.ctx.storage.put(prefix+'ticket:send','SYN NEGATIVE malformed foreign SEND');
+  else{
+   const row=all.find(([k])=>k===prefix+'reservation'),reservation=row?JSON.parse(row[1]):null;
+   if(!reservation)throw Error('SYN own reservation required');
+   if(kind==='freeze')await this.ctx.storage.put(prefix+'freeze',noticeEncode('Freeze',noticeSeal('Freeze',{purpose:'afw.finite-preparation-notice-freeze.v1',identityHash:reservation.identity.identityHash,reservationHash:reservation.recordHash,frozenAt:Date.now()})));
+   else if(kind==='row-hash'){
+    const ack=JSON.parse(await this.ctx.storage.get(prefix+'ticket:ack'));delete ack.recordHash;
+    await this.ctx.storage.put(prefix+'ticket:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,rowHash:'f'.repeat(64)})));
+   }else if(['identity','grant-link','connection'].includes(kind)){
+    delete reservation.recordHash;
+    if(kind==='identity')reservation.identity={...reservation.identity,subject:'SYN NEGATIVE wrong subject'};
+    if(kind==='grant-link')reservation.grantLinkHash='f'.repeat(64);
+    if(kind==='connection')reservation.connectionHash='f'.repeat(64);
+    // Identity corruption intentionally fails the accepted codec; never a positive producer.
+    if(kind==='identity')await this.ctx.storage.put(prefix+'reservation',JSON.stringify(reservation));
+    else await this.ctx.storage.put(prefix+'reservation',noticeEncode('Reservation',noticeSeal('Reservation',reservation)));
+   }else throw Error('SYN unknown notice fault');
+  }
+  await this.ctx.storage.sync();
+ }
+ `;
+ if(entry.split(' export class Initial extends FiniteClosure{').length!==2)throw Error('SYN notice class marker');
+ return "import {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+}
+
+// Read-only instrumentation of exact lexical source sites. SYN gates never supply authority.
+export function instrumentFiniteNoticeGet(source){
+ const marker='/** UNMOUNTED fixed GET.',at=source.indexOf(marker);
+ if(at<0)throw Error('SYN notice handler marker');
+ let head=source.slice(0,at),body=source.slice(at);
+ const between="await ioCheckpoint('between');";
+ if(head.split(between).length!==2)throw Error('SYN notice second snapshot marker');
+ head=head.replace(between,between+"if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');");
+
+ const replace=(needle,next)=>{if(body.split(needle).length!==2)throw Error('SYN notice marker changed: '+needle);body=body.replace(needle,next);};
+ replace("async function recheckNoticeGetOwned(){\n    check();","async function recheckNoticeGetOwned(){\n    globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'before'});check();");
+ replace("if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();","if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'after'});");
+ replace("await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';","await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';");
+ replace("const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);","const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);globalThis.__noticeState?.trace.push({position:'baseline-observed',at:Date.now()});");
+ replace("ownedReservation=record;expected.records.notice.reservation=","if(globalThis.__noticeOwner?.noticeMode==='lost-reservation')throw Error('SYN NEGATIVE reservation recorded, return lost');ownedReservation=record;expected.records.notice.reservation=");
+ replace("ownedSend=send;operation='ticket';","if(globalThis.__noticeOwner?.noticeMode==='lost-send')throw Error('SYN NEGATIVE SEND recorded, return lost');ownedSend=send;operation='ticket';");
+ replace("   check();\n   const maxAge=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});check();\n   const maxAge=");
+
+ replace("if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);","if(!verified.ok)fail();identity=verified.identity;if(globalThis.__noticeOwner?.noticeMode==='expire-access')await wait(globalThis.__noticeOwner.noticeGate('access'));clock.narrow(identity.expiresAt);");
+ return head+body;
+}
+

diff --git a/test/fixtures/finite-owner-qa-sdk.mjs b/test/fixtures/finite-owner-qa-sdk.mjs
--- a/test/fixtures/finite-owner-qa-sdk.mjs
+++ b/test/fixtures/finite-owner-qa-sdk.mjs
@@ -1,16 +1,17 @@
+import {captureNoticeBundle} from './finite-owner-notice-get.mjs';
 import {build} from 'esbuild';
 import {createHash} from 'node:crypto';
 import {readFile} from 'node:fs/promises';
 import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 // SYN fixture composition only. Actual source/SDK/journals/Unit2a modules remain.
-export function extendFiniteOwnerQaSdk(entry,{observed=false}={}){
+export function extendFiniteOwnerQaSdk(entry,{observed=false,noticeGet=false}={}){
  const imports=`import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal,encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode} from './lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';\nimport {createPrivateQaFiniteOwnerOAuthReceiver} from './lib/mcp-qa-finite-owner-oauth-qa.mjs';\n`;
  let methods=`
  async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
  async sdkObservation(){return {queue:this.sdkQueue??null,signals:this.sdkSignals??null,leaseSignals:globalThis.__d02QaSignals??null,held:!!this.sdkRelease,probes:globalThis.__d02Probes??[],primary:this.sdkPrimary??[],rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})],calls:this.sdkCalls??[]};}
 
  async sdkReduceOriginal(){
   const rows=[...await this.ctx.storage.list()],reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]),expected=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-owner-issuer-provenance.v1:')&&k.endsWith(':grant'))[1]);
   const identity=reservation.identity,parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/reduction'));
   try{
    const store=phaseIssuerStore({ctx:this.ctx,env:this.env}),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,identity.C1)});
@@ -68,75 +69,84 @@
  async sdkReadCurrent(){
   const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/authorize'));
   try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}
  }
 `;
  if(observed)methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){this.sdkSignals={entryAborted:request.signal.aborted,abortObserved:false,settled:false,settledAborted:null};const seen=this.sdkSignals;request.signal.addEventListener('abort',()=>{seen.abortObserved=true;},{once:true});try{return await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}finally{seen.settled=true;seen.settledAborted=request.signal.aborted;}}");
  // Ticket fixture is external SYN approval DATA, generated through genuine store.
  // It must match a real bounded preparation cookie, never a positive source alias.
  const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
  if(!entry.includes(old))throw Error('SYN exact phase seed changed');
- return imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+ if(noticeGet){
+  methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){if(request.url==='https://afw-private.invalid/_finite-owner/monitoring')return createPrivateQaFiniteOwnerNoticeGetReceiver({ctx:this.ctx,env:this.env}).fetch(request);return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}");
+ }
+ return (noticeGet?"import {createPrivateQaFiniteOwnerNoticeGetReceiver} from './lib/mcp-qa-finite-owner-notice-get-qa.mjs';\n":"")+imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
 }
-export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false,io=false}={}){
+export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false,io=false,noticeGet=false}={}){
  const mProfile=finiteWranglerProfileTemplate('canaryLive');let outgoingInstrumentations=0;
  let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
  import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
  export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
  if(token)source=`import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
  import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
  import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
  const issuer='https://delegated-canary.agentfriendlyweb.dev',worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp'});let tokenPins=null,wrongNamespace=false;
  export default{async fetch(request,env,ctx){
   const path=new URL(request.url).pathname;
   if(path==='/fixture/token-config'&&request.method==='POST'){
    const pins=await request.json();tokenPins={AFW_OAUTH_PILOT_CLIENT_ID:pins.clientId,AFW_OAUTH_PILOT_PROJECT_ID:pins.projectId,AFW_OAUTH_PILOT_EXPIRES_AT:pins.expiresAt,ACCESS_AUD:pins.audience,ACCESS_TEAM_DOMAIN:pins.teamDomain};return new Response(null,{status:204});
   }
   if(path==='/fixture/token-namespace'&&request.method==='POST'){wrongNamespace=true;return new Response(null,{status:204});}
   if(path==='/oauth/token'||path==='/mcp'){const headers=new Headers(request.headers);headers.set('Host',new URL(issuer).host);return worker.fetch(new Request(request,{headers}),{...env,...tokenPins,...(wrongNamespace?{OAUTH_KV:env.SYN_WRONG_KV}:{})},ctx);}
   if(path!=='/authorize')return new Response(null,{status:404});
   const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}
  }};`;
+ if(noticeGet){
+  source="import {forwardPrivateFiniteOwnerNoticeGet} from './lib/mcp-qa-finite-owner-notice-get-forward.mjs';\n"+source;
+  source=source.replace("if(path!=='/authorize')return new Response(null,{status:404});", "if(['/monitoring','/monitoring/grant','/monitoring/revoke'].includes(path)){if(request.method!=='GET'||path!=='/monitoring')return new Response(null,{status:405});const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},root.lease);}finally{root.finish();}}if(path!=='/authorize')return new Response(null,{status:404});");
+ }
  if(observed||io)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
  const plugins=observed||io?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
   outgoingInstrumentations++;let contents=await readFile(args.path,'utf8');const needle="const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();";
   if(contents.split(needle).length!==2)throw Error('SYN outgoing observation changed');
   contents=contents.replace(needle,"const outgoing=new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});globalThis.__d02M.outgoingEntryAborted=outgoing.signal.aborted;globalThis.__d02M.outgoingAbortObserved=false;outgoing.signal.addEventListener('abort',()=>{globalThis.__d02M.outgoingAbortObserved=true;},{once:true});const response=await Reflect.apply(fetcher,stub,[outgoing]);check();");
   return {contents,loader:'js'};
  });}}]:[];
  const built=await build({plugins,stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
  if((observed||io)&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
+ if(noticeGet)await captureNoticeBundle(built,'M',{'<stdin>':source});
  console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
  return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
   name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:mProfile.compatibility_date,compatibilityFlags:mProfile.compatibility_flags,
   kvNamespaces:{OAUTH_KV:'finite-sdk-shared',...(token?{SYN_WRONG_KV:'finite-sdk-wrong'}:{})},
   ...(token?{d1Databases:{DB:qa.d1Databases.RELEASE_DB},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99123',simple:{limit:1000,period:60}}}}:{}),
   bindings:{...(token?{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_REFRESH_ENABLED:'false',AFW_OAUTH_SERVICE_MODE:'window',AFW_DOSSIER_EVENTS_ENABLED:'false'}:{}),AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
   durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}
  }].reverse()};
 }
 export async function seedFiniteOwnerSdkClient(mf,source){
  const kv=await mf.getKVNamespace('OAUTH_KV','m-sdk');
  await kv.put('client:'+source.clientId,JSON.stringify({clientId:source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
 }
 
 /** Fixed read-only observation in the same genuine request scope, used only in
  * hostile fixtures. No witness/root/source result leaves the lexical stack. */
 export function instrumentFiniteOwnerQaSdk(source){
+ const noticeStart=source.indexOf('/** UNMOUNTED fixed GET.'),noticeSuffix=noticeStart<0?'':source.slice(noticeStart);if(noticeStart>=0)source=source.slice(0,noticeStart);
  const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN observation point changed');source=source.replace(needle,replacement);};
  once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","globalThis.__d02QaSignals={entryAborted:originalLease.signal.aborted,abortObserved:false,sdkSettledAborted:null};const signalSeen=globalThis.__d02QaSignals;onAbort=()=>{signalSeen.abortObserved=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
  once("actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';","actualPromise=retain(Promise.resolve().then(()=>{check();return call();}).then(value=>{signalSeen.sdkSettledAborted=originalLease.signal.aborted;return value;}));position='sdk-pending';");
  const probe=kind=>`let strictUnavailable=false;try{await readPrivateQaFiniteOwnerContext({ctx,env,parent:originalLease});}catch{strictUnavailable=true;}(globalThis.__d02Probes??=[]).push({kind:'${kind}',op,strictUnavailable});`;
  once("await sdkAppend('SdkSend',send,op);await recheckOwned();check();","await sdkAppend('SdkSend',send,op);"+probe('sdk')+"await recheckOwned();check();");
  once("await issuerAppend('Send',send,op);await recheckOwned();check();","await issuerAppend('Send',send,op);"+probe('issuer')+"await recheckOwned();check();");
  once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();(globalThis.__d02Probes??=[]).push({kind:'consumption',sameChild:consumptionChild===l,sameStore:consumptionStore===store,remainingMs:w.deadline-Date.now(),windowMs:w.deadline-w.startedAt});");
- return source;
+ return source+noticeSuffix;
 }
 
 /** Read-only audit of this test's actual SDK1.2.1 encrypted grant. This public
  * wrapping constant and HMAC/AES-KW/AES-GCM format are from pinned
  * cloudflare/workers-oauth-provider v1.2.1 src/oauth-provider.ts:6334-6408.
  * No token exchange, SDK substitute, code logging or production key access. */
 export async function readSyntheticIssuedGrantProps(code,grant){
  const publicWrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
  const hmac=await crypto.subtle.importKey('raw',publicWrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code));

diff --git a/test/mcp-qa-finite-owner-notice-get-native.test.mjs b/test/mcp-qa-finite-owner-notice-get-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-notice-get-native.test.mjs
@@ -0,0 +1,237 @@
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA as SCHEMA} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {createHash} from 'node:crypto';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+async function withIssued(fn){
+ const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
+  const before=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(before).sort(),['capsuleHash','preconnectionId','source']);assert.equal(before.source.phase,'read_consent');
+  f.source=before.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
+  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
+  const query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'});
+  const get=await f.mf.dispatchFetch(f.source.origin+'/authorize?'+query,{redirect:'manual',headers:f.headers});assert.equal(get.status,200);
+  const html=await get.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+  const cookie=get.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+  const post=await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
+  assert.equal(post.status,302);f.code=new URL(post.headers.get('Location')).searchParams.get('code');assert(f.code);await post.body?.cancel();
+  const rows=await plain(f.stub.snapshot()),r=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);f.identity=r.identity;
+  f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.equal(f.grant.revoked_at,'');assert.equal(f.grant.exchanged_at,'');
+  assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
+  await fn(f);
+ }finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+test('inventory own negative key after actual SDK grant closes legacy reader',()=>withIssued(async f=>{
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.schema.length,7);assert.deepEqual(before.notice,[]);assert.deepEqual(before.tickets,[]);assert.deepEqual(before.events,[]);
+ await f.stub.noticeCorrupt('own-unknown');
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+
+async function actualExchangeMcp(f){
+ const config=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(config.status,204);
+ const exchange=await f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:f.code,code_verifier:f.verifier})});assert.equal(exchange.status,200);
+ const payload=await exchange.json();assert.equal(typeof payload.access_token,'string');
+ const client=new Client({name:'SYN-notice-native',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+payload.access_token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
+  const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.identity.projectId);
+ }finally{await client.close();}
+ f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.notEqual(f.grant.exchanged_at,'');
+ const context=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(context).sort(),['capsuleHash','preconnectionId','source']);assert.equal(context.source.phase,'read_consent');
+}
+test('GET acknowledged original after actual QA code M token MCP and D04 reader',()=>withIssued(async f=>{
+ await actualExchangeMcp(f);
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.schema.length,7);assert.deepEqual(before.notice,[]);assert.deepEqual(before.tickets,[]);assert.deepEqual(before.events,[]);
+ const originalRows=await plain(f.stub.snapshot());await f.stub.ioConfigure();await f.stub.noticeConfigure();const began=Date.now();
+ const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers,redirect:'manual'});
+ const status=response.status,html=await response.text();
+ const after=await plain(f.stub.noticeInspect());
+ assert.equal(status,200,'fixed GET missing after actual prerequisites; tickets='+after.tickets.length+' journal='+after.notice.length);
+ const state=(await plain(f.stub.noticeStateRead())).state,io=await plain(f.stub.ioObservation());await saveNoticeObservation({elapsed:Date.now()-began,trace:state.trace,sql:state.sql,ops:state.ops,lists:state.lists,io});console.info('NOTICE actual principal costs',JSON.stringify({elapsed:Date.now()-began,trace:state.trace,sessions:state.sql.length,first:state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,queries:[...new Set(state.sql.flatMap(s=>s.queries).map(q=>q.sql))],ops:state.ops,noticeLists:state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).map(v=>v.limit),http:{snapshots:io.snapshots,rows:io.rows.length,peak:io.peak,active:io.active,bodyCancels:io.rows.filter(v=>v.cancelSettledAt>=v.cancelStartedAt).length}}));
+ assert(Date.now()-began<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
+ assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 8'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1&&s.queries[0].method==='all'));assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 2')||q.sql.endsWith('LIMIT 3'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1));
+ assert.equal(after.tickets.length,1);assert.equal(after.notice.length,3);assert.deepEqual(after.events,[]);
+ const records=Object.fromEntries(after.notice.map(([key,value])=>[key.split(':').slice(-2).join(':'),JSON.parse(value)])),ticket=after.tickets[0],handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+ assert.equal(createHash('sha256').update(handle).digest('hex'),ticket.handle_hash);assert.equal(Object.keys(ticket).length,14);assert.equal(ticket.grant_id,f.identity.grantId);assert.equal(ticket.user_id,f.identity.subject);assert.equal(ticket.expected_sequence,0);assert.equal(ticket.action,'grant');assert.equal(ticket.purpose,'afw.dossier-monitoring-owner.v1');
+ const reservation=JSON.parse(after.notice.find(([key])=>key.endsWith(':reservation'))[1]),rt=reservation.ticket,i=f.identity;
+ assert.deepEqual(reservation.identity,i);assert.deepEqual(reservation.expectedGrant,{scopes:JSON.parse(f.grant.scopes_json),createdAt:f.grant.created_at,expiresAt:f.grant.expires_at});
+ assert.deepEqual(ticket,{handle_hash:createHash('sha256').update(handle).digest('hex'),request_id:rt.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:0,issued_at:rt.issuedAt,expires_at:rt.expiresAt,permission_expires_at:rt.permissionExpiresAt});
+ assert.equal(records['ticket:ack'].rowHash,initialHash('afw.finite-preparation-notice-row.v1',ticket));
+ assert.equal(ticket.expires_at,Math.min(ticket.issued_at+600000,reservation.accessExpiresAt,reservation.preconnectionExpiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(f.grant.expires_at)));
+ const sourceRowsAfter=await plain(f.stub.snapshot());for(const row of originalRows)assert.deepEqual(sourceRowsAfter.find(([key])=>key===row[0]),row,'original preparation/issuer/SDK history retained');
+ assert.equal(records['ticket:ack'].outcome,'applied');assert.equal(records['ticket:ack'].sequence,null);assert(records['ticket:ack'].observedAt<records['ticket:send'].window.deadline);assert(state.trace.find(v=>v.position==='complete').at<records['ticket:send'].window.deadline);assert(records['ticket:send'].window.deadline-records['ticket:send'].window.startedAt<=5000);
+ assert.match(html,/<button type="button" disabled>/);assert.doesNotMatch(html,/<script|<form[^>]+action=/);assert.match(html,/Todavía no diste permiso para avisos/);
+ assert.match(response.headers.get('Content-Security-Policy'),/form-action 'none'/);assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Set-Cookie'),/; Path=\/; Secure; HttpOnly; SameSite=Strict; Max-Age=\d+/);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+ const repeat=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers});assert.equal(repeat.status,503);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
+}));
+
+async function notice(f,headers=f.headers,options={}){
+ return f.mf.dispatchFetch(f.source.origin+'/monitoring',{redirect:'manual',headers,...options});
+}
+async function deny(response){assert.notEqual(response.status,200);assert.doesNotMatch(await response.text(),/<form|name="handle"/);assert.equal(response.headers.get('Set-Cookie'),null);}
+async function ownRows(f){return (await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-notice.v1:'+f.identity.preconnectionId+':'));}
+async function gate(f,name){
+ for(let n=0;n<150;n++){const state=await plain(f.stub.noticeStateRead());if(state.held===name)return state;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('SYN actual native gate not reached: '+name);
+}
+test('fixed grammar and Access negatives never write notice or SQL',()=>withIssued(async f=>{
+ const before=await plain(f.stub.noticeInspect());
+ for(const path of ['/monitoring','/monitoring/grant','/monitoring/revoke']){
+  await deny(await f.mf.dispatchFetch(f.source.origin+path,{method:'POST',headers:f.headers,body:'grant=true'}));
+  assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ }
+ for(const path of ['/monitoring?grant=caller','/monitoring#caller','/monitoring/grant']){
+  // Hashes never travel over HTTP; the pure wire test covers the original URL.
+  if(path.includes('#'))continue;
+  await deny(await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers}));
+ }
+ const signature=f.token.split('.');signature[2]=(signature[2][0]==='a'?'b':'a')+signature[2].slice(1);
+ const negatives=[
+  {...f.headers,Origin:'https://foreign.invalid'},
+  {...f.headers,Cookie:PREP+'; '+PREP},
+  {...f.headers,Cookie:''},
+  {...f.headers,Cookie:PREP+'; __Host-afw-monitoring-owner=previous'},
+  {...f.headers,'Cf-Access-Jwt-Assertion':signature.join('.')},
+  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({subject:'SYN-other'})},
+  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({audience:'SYN-other'})},
+  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({issuer:'https://wrong.invalid'})}
+ ];
+ for(const headers of negatives){await deny(await notice(f,headers));assert.deepEqual(await plain(f.stub.noticeInspect()),before);}
+ assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('pure fixed GET wire rejects caller authority and noncanonical metadata',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q,readFiniteOwnerNoticeGetMetadata:metadata}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs');
+ const origin='https://delegated-canary.agentfriendlyweb.dev',empty=new Uint8Array();
+ assert.deepEqual(q(new Request(origin+'/monitoring'),empty),{method:'GET',url:origin+'/monitoring'});
+ for(const url of [origin+'/monitoring?grant=x',origin+'/monitoring#x','https://foreign.invalid/monitoring','https://u:p@delegated-canary.agentfriendlyweb.dev/monitoring'])assert.throws(()=>q(new Request(url),empty));
+ assert.throws(()=>q(new Request(origin+'/monitoring',{method:'POST'}),empty));assert.throws(()=>q(new Request(origin+'/monitoring'),new Uint8Array([1])));
+ for(const cookie of ['a=1; a=2','malformed','a=has space'])assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{Cookie:cookie}}),empty));
+ const h=new Headers({'x-afw-finite-boundary':'{"startedAt":1,"deadline":30001,"remainingMs":30000}','x-afw-finite-original-method':'GET','x-afw-finite-original-url':origin+'/monitoring','x-afw-finite-version':'77777777-7777-4777-8777-777777777777','x-afw-finite-request-id':'77777777-7777-4777-8777-777777777777'});
+ assert.equal(metadata(h).method,'GET');h.set('x-afw-finite-allowPending','true');assert.throws(()=>metadata(h));
+});
+test('full empty and totally absent schema preserve reader; GET partial schema fails before journal',()=>withIssued(async f=>{
+ const before=await plain(f.stub.sdkReadCurrent());assert.equal(Object.keys(before).length,3);
+ await f.db.prepare('DROP TABLE dossier_monitoring_owner_tickets').run();await f.db.prepare('DROP TABLE dossier_monitoring_consent_events').run();
+ assert.deepEqual(await plain(f.stub.sdkReadCurrent()),before);await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
+ for(const sql of SCHEMA)await f.db.prepare(sql).run();
+ assert.deepEqual(await plain(f.stub.sdkReadCurrent()),before);
+ for(const fault of ['index','trigger','extra','sql']){
+  if(fault==='index'||fault==='sql')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
+  if(fault==='trigger')await f.db.prepare('DROP TRIGGER dossier_monitoring_tickets_no_delete').run();
+  if(fault==='extra')await f.db.prepare('CREATE INDEX SYN_negative_extra_index ON dossier_monitoring_owner_tickets(grant_id)').run();
+  if(fault==='sql')await f.db.prepare('CREATE INDEX dossier_monitoring_consent_grant_sequence ON dossier_monitoring_consent_events(sequence,grant_id)').run();
+  assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
+  if(fault==='extra')await f.db.prepare('DROP INDEX SYN_negative_extra_index').run();
+  if(fault==='sql')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
+  for(const sql of SCHEMA)await f.db.prepare(sql).run();
+ }
+ await f.stub.noticeConfigure('failed-schema-metadata');await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
+}));
+test('foreign preconnection and UUID history is neither enumerated nor changed',()=>withIssued(async f=>{
+ await f.stub.noticeCorrupt('foreign-unknown');
+ const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
+ await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('f'.repeat(64),foreign,'SYN-other',foreign,'SYN-other','SYN-other','https://foreign.invalid/mcp','afw.dossier-monitoring-owner.v1','grant',1,0,at,at+60000,at+60000).run();
+ const history=await plain(f.stub.snapshot()),foreignRow=await f.db.prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE grant_id=?').bind(foreign).first();
+ assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
+ const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();
+ assert.deepEqual(await f.db.prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE grant_id=?').bind(foreign).first(),foreignRow);
+ const after=await plain(f.stub.snapshot());for(const row of history)assert.deepEqual(after.find(([key])=>key===row[0]),row);
+}));
+for(const fault of ['overflow','ack-without-send','foreign-send'])test('SYN negative journal '+fault+' fails closed',()=>withIssued(async f=>{
+ await f.stub.noticeCorrupt(fault);await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.equal((await plain(f.stub.noticeInspect())).tickets.length,0);
+}));
+for(const fault of ['identity','grant-link','connection','row-hash'])test('SYN negative settled notice '+fault+' fails closed',()=>withIssued(async f=>{
+ const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();
+ const before=await plain(f.stub.noticeInspect());await f.stub.noticeCorrupt(fault);await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual((await plain(f.stub.noticeInspect())).tickets,before.tickets);
+}));
+for(const mode of ['hold-before','hold-after'])test('owned native '+mode+' denies bearer continuation and only own stack ACKs',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure(mode);const pending=notice(f);const seen=await gate(f,mode==='hold-before'?'before-sql':'after-sql');assert.equal(seen.state.resolution?.row??false,mode==='hold-after');
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.notice.length,2);assert.equal(before.tickets.length,mode==='hold-after'?1:0);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await deny(await notice(f));await f.stub.noticeReleaseHeld();
+ const result=await pending;assert.equal(result.status,200);await result.body?.cancel();
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.notice.length,3);assert.equal(after.tickets.length,1);
+}));
+for(const mode of ['lost-reservation','lost-send','lost-sql'])test('unknown acknowledgement '+mode+' retains facts and never retries',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure(mode);await deny(await notice(f));const before=await plain(f.stub.noticeInspect());
+ assert.equal(before.notice.length,mode==='lost-reservation'?1:2);assert.equal(before.tickets.length,mode==='lost-sql'?1:0);
+ assert.equal(before.notice.some(([key])=>key.endsWith('ticket:ack')),false);await deny(await notice(f));assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+}));
+test('freeze after actual SQL commit blocks own ACK without deleting ticket',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('hold-after');const pending=notice(f);await gate(f,'after-sql');await f.stub.noticeCorrupt('freeze');await f.stub.noticeReleaseHeld();await deny(await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,1);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('queue past original five-second SQL window cannot mutate or ACK',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('queue');const pending=notice(f),seen=await gate(f,'before-sql');assert(seen.state.sqlEnteredAt);
+ await new Promise(resolve=>setTimeout(resolve,5100));await deny(await pending);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false},'actual queued SQL retains scope after child abort');await f.stub.noticeReleaseHeld();
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,0);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);
+}));
+test('original CLOSE wins queued INSERT without deleting history or revoking grant',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('hold-before');const pending=notice(f);await gate(f,'before-sql');assert.equal((await plain(f.stub.noticeFence())).status,'fenced');await f.stub.noticeReleaseHeld();await deny(await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,0);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('ticket wins before original CLOSE; retained ticket and grant survive',()=>withIssued(async f=>{
+ const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();const before=await plain(f.stub.noticeInspect());assert.equal((await plain(f.stub.noticeFence())).status,'fenced');
+ assert.deepEqual(await plain(f.stub.noticeInspect()),before);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('actual Access expires inside GET before any reservation',()=>withIssued(async f=>{
+ const expires=Math.floor(Date.now()/1000)+4,token=await f.noticeToken({expiresAt:expires});await f.stub.noticeConfigure('expire-access');
+ const pending=notice(f,{...f.headers,'Cf-Access-Jwt-Assertion':token});await gate(f,'access');await new Promise(resolve=>setTimeout(resolve,Math.max(1,expires*1000-Date.now()+20)));await f.stub.noticeReleaseHeld();await deny(await pending);assert.deepEqual(await ownRows(f),[]);
+}));
+test('shorter signed current Access clamps ticket to original minimum',()=>withIssued(async f=>{
+ const expires=Math.floor(Date.now()/1000)+60,token=await f.noticeToken({expiresAt:expires});const response=await notice(f,{...f.headers,'Cf-Access-Jwt-Assertion':token});assert.equal(response.status,200);await response.body?.cancel();
+ const after=await plain(f.stub.noticeInspect()),ticket=after.tickets[0];assert.equal(ticket.expires_at,Math.min(expires*1000,Date.parse(f.grant.expires_at)));assert(ticket.expires_at-ticket.issued_at>5000);
+}));
+
+test('SYN negative original UUID ticket without journal and consent history fail closed',()=>withIssued(async f=>{
+ const at=Date.now(),request='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
+ await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('e'.repeat(64),request,f.identity.subject,f.identity.grantId,f.identity.projectId,f.identity.clientId,f.identity.resource,'afw.dossier-monitoring-owner.v1','grant',f.identity.projectRevision,0,at,at+60000,at+60000).run();
+ await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await ownRows(f),[]);
+}));
+test('SYN negative consent event with real correct ticket never authorizes GET',()=>withIssued(async f=>{
+ const prepared=await notice(f);assert.equal(prepared.status,200);await prepared.body?.cancel();const ticketBefore=(await plain(f.stub.noticeInspect())).tickets;assert.equal(ticketBefore.length,1);
+ const at=Date.now();await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(f.identity.grantId,f.identity.projectId,f.identity.subject,f.identity.clientId,f.identity.resource,f.identity.projectRevision,'grant','afw.dossier-monitoring.v1','eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',at,at+60000).run();
+ await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual((await plain(f.stub.noticeInspect())).tickets,ticketBefore);assert.equal((await ownRows(f)).length,3);
+}));
+for(const drift of ['owner','revision','pointer','exchange','journal','ticket'])test('two complete snapshots reject SYN own-state drift '+drift,()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('drift');const pending=notice(f);await gate(f,'between-own');
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE drift' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ if(drift==='exchange'){
+  const created=Date.parse(f.grant.created_at),value=new Date(Math.max(created,Date.now()-1)).toISOString();
+  assert.notEqual(value,f.grant.exchanged_at);await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();
+ }
+ if(drift==='journal')await f.stub.noticeCorrupt('connection');
+ if(drift==='ticket'){
+  // Explicit destructive SYN corruption, after first snapshot; not a legitimate transition.
+  await f.db.prepare('DROP TRIGGER dossier_monitoring_tickets_no_update').run();
+  await f.db.prepare('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE grant_id=?').bind('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',f.identity.grantId).run();
+  await f.db.prepare(SCHEMA.find(sql=>sql.includes('dossier_monitoring_tickets_no_update'))).run();
+ }
+ await f.stub.noticeReleaseHeld();await deny(await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,1);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);
+}));
+
+async function ioGate(f,phase){
+ for(let n=0;n<200;n++){const state=await plain(f.stub.ioObservation());if(state.held?.phase===phase)return state;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual provider body/cancel gate not reached: '+phase);
+}
+test('GET child expiry retains actual HTTP body and cancel until physical settlement',()=>withIssued(async f=>{
+ await f.stub.ioConfigure({hold:'qa-version'});const began=Date.now(),pending=notice(f);await ioGate(f,'body');
+ await deny(await pending);assert(Date.now()-began>=4900);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
+ assert.deepEqual(await ownRows(f),[]);await f.stub.ioRelease('body');const cancelling=await ioGate(f,'cancel');assert.equal(cancelling.active,1);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
+ await f.stub.ioRelease('cancel');
+ for(let n=0;n<100;n++){const state=await plain(f.stub.ioObservation());if(state.active===0&&(await plain(f.stub.noticeProbe())).allowed)return;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual HTTP body/cancel did not settle in original parent window');
+}));

diff --git a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
--- a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+++ b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
@@ -247,21 +247,21 @@
  const read=suffix=>{const raw=rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(suffix))?.[1];return raw?JSON.parse(raw):null;};
  const send=read(':consume:send'),ack=read(':grant:ack'),child=state.child;
  const full=child?state.rows.slice(child.first,child.last):[];
  const narrow=send&&ack?full.filter(r=>r.startedAt>=send.issuedAt&&r.startedAt<=ack.observedAt):[];
  const counts={};for(const row of full)counts[row.category]=(counts[row.category]??0)+1;
  console.info('fanout actual lifecycle',JSON.stringify({status:response.status,peak:state.peak,active:state.active,child,elapsed:child?child.endMono-child.startMono:null,tail:child&&ack?child.endedAt-ack.observedAt:null,full:full.length,narrow:narrow.length,counts,sql:state.sql,delayMinimum:f.ioWaits?.length?Math.min(...f.ioWaits):0,sendPresent:!!send,ackPresent:!!ack}));
  assert.equal(response.status,302,'genuine original POST must issue code before original child expiry');
  assert(child);assert(child.endMono-child.startMono<5000);assert(child.endedAt<child.deadline);
  assert.equal(full.length,112);assert.equal(narrow.length,84);
  assert.deepEqual(counts,Object.fromEntries(['verify-reader','verify-publisher','qa-deployment','qa-version','m-deployment','m-initial-version','m-current-version'].map(k=>[k,16])));
- assert.deepEqual(state.sql,{factual:80,preflight:16,writes:2});
+ assert.deepEqual(state.sql,{factual:128,preflight:16,writes:2});
  assert.equal(state.peak,peak);assert.equal(state.active,0);assert.deepEqual(state.same,{child:true,store:true});assertIoOrder(state.rows);
  assert(full.every(r=>r.outcome==='fulfilled'&&r.endMono>=r.cancelSettledAt&&r.cancelSettledAt>=r.cancelStartedAt&&r.bytes>0));
  if(f.ioDelay)assert(f.ioWaits.every(ms=>ms>=50));
  await issued(f,form,response);
  assert.equal((await observe(f)).calls.length,0,'I/O-only mode leaves actual SDK KV unwrapped');
  assert.equal((await observe(f)).probes.length,0,'I/O-only mode never probes source');
  return state;
 }
 test('fanout causal control delay0 preserves complete native child and original reads',{timeout:120000},()=>world(async f=>{
  const form=await consent(f);await f.stub.ioConfigure();

````
