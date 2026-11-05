# Deferred task-review minors — AFW finite preparation

## Required final whole-branch review input

This list is read by the final whole-branch review before merge. Minor findings are deferred under standing SDD, never silently discarded or treated as completed fixes.

- Task D0.3; review_sdk_token_d03_sol; reviewedHEADc35716e68245bd7f7747a6d6020ebd4953df8270. test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs:110–134:12negative matrix helper accepts any400/401/503 ratherthan exactreported status/OAutherror. Add expected tuple percase, preserving missing-app503. Current primary evidence confirms intendeddenialstages; nonblockingtestprecision. Finalreview must triage beforemerge; no fixclaimed. Rootreadfix-loop Minor-defer rule and didnotenterafixloop.

No Critical/Important parked issues in D0.2/D0.3 acceptance. Operational gates remain outside source acceptance.

- Task finite-owner-io-fanout; reviewer review_owner_io_fanout(Astrahigh), reviewedHEADae39d1b220614498856160a3b2de994c58544110. test/mcp-qa-finite-owner-qa-sdk-native.test.mjs:86: worldfinally awaits ioRelease/ioWait before dispose/cleanup without nestedfinally; failedrelease/settlementassert skipsisolatedruntime/tempcleanup. Nestcleanupfinally; keepdrainassertionanddon'tcallforceddisposalphysicaldrain. Nonblockingtestfailurepathquality; DEFERRED underSDD, finalwholebranchreviewmusttriage. Notpartoffix1Importantandnotclaimedfixed.


- Task native notice store; review_native_notice_store; reviewedHEAD78c3bdc6fec287494ec1e2d37223c8d006ea6487. Mantenimiento no bloqueante: warnings npm/NodeAPI/ActionsNode20→24 en informe2026-11-05-finite-preparation-notice-store.md. No evidencia de defecto del componente; triage de herramientas al finalwholebranch, no ocultar ni repetir runs para suprimir ruido. Important de absorción concurrente se trata aparte en fixround1 y NO está diferido.


- Task finite-native-notice-GET; reviewer review_notice_get(Astrahigh), reviewedHEADcfe8f0ddde1d782757dd7e0d3160967f325df553. MinorP3 lib/mcp-qa-finite-owner-notice-get-wire.mjs:11: cookie names allow separators and empty segments discarded; literal grammar deviation without identified authority bypass. Deferred by SDD (no fixloop), explicitly carried into next POST task touching samewire with mandatory pure/nativevalidprepare+malformedpair denial before notice/SQL and POSTbeforeconsentSEND/SQL. ApprovedwithMinor clarification,0C/I; no full SpecPass/fixclaim. Finalwholebranchreview MUST verify disposition/closure beforemount/merge. Seereviews/2026-11-05-finite-native-notice-get.es.md. Current corruption tests are rejectioncoverage, not independent proof of each cross-source correlator; futurePOSTbaseline requires resealedvalid-DATA negativevariants beforeSQL.


## Disposición POST — 5 de noviembre de 2026

- **CLOSED — P3 GET cookie-list:** corregido y aceptado en Task POST sobre `5205d80216d9767c44762df4a181e1015e093a8e` (código e153). Revisor fresco review_notice_consent: Spec✅/QualityApproved, sin Critical/Important. Evidencia pura/nativa causal de parser compartido y cookies propias sin normalización. Ver `docs/superpowers/reviews/2026-11-05-finite-native-notice-consent.es.md`. La entrada histórica de deferral anterior queda como trazabilidad; ya no es deuda abierta.
- **OPEN — POST test settlement, Minor:** `test/mcp-qa-finite-owner-notice-consent-native.test.mjs:244` puede agotar polling sin exigir probe.allowed antes de assertions finales; línea161 inspecciona inmediatamente tras liberar SQL. No defecto de producto identificado. Reforzar settlement observado en esos dos casos, con validación focal, en la siguiente unidad Link que ya toca ese archivo. Ruling root: no fix loop Minor; obligatorio resolver/triage antes de mount/whole-branch final. Hasta entonces no atribuir prueba completa de settlement tardío a esos dos casos.
- **OPEN — toolchain/harness warnings, Minor:** misma revisión sobre informe línea336: npm/ESLint unsupported/Node/Actions/CIMD/RPC stub warnings declarados; unir a deuda existente de herramientas. Lint limpio no significa salida sin warnings. No upgrades/flags ni reruns en esta unidad para ocultarlos.


## NoticeLink — revisión fresca 5nov2026

TaskLink: minor (deferred) M1 — fiabilidad de sdkReadCurrent baselineSYN: dos FAIL iniciales de fullPOST50 y fullLink31 antes de acciones; focales posteriores pasan sin causa/reparación probada. Primarias42115921441/job127555403763 y42121776005/job127575702935; focales42120340776/job127570739345 y42123491595/job127581599230. Revisión fresca lo clasifica no-bloqueante funcionalLink. Conservar diagnóstico pasivo; si reaparece investigar stackoriginal sinretry/sleep/fullrunbuscandoverde. Ownerpreparationreal y wholebranchreview deben revisar esta deuda, no descartarla.
TaskLink: minor (deferred) M2 — warnings npm/Actions/CIMD/RPC del harness preexistentes. Nuevo ESLint131 corregido/calificado0/0; agregado no pristine. Se mantiene el grupo toolchain para wholebranchreview antesmerge, no upgrade incidental.
CarryConsentMinor161/244: reviewerLink confirmó visiblemente assertions settlementobservado; cierreformal aún pendiente de aceptación deLink (ImportantI1DRY en fixround1/5). Minor no entra alfixloop.
