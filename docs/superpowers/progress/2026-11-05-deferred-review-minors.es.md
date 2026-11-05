# Deferred task-review minors — AFW finite preparation

## Required final whole-branch review input

This list is read by the final whole-branch review before merge. Minor findings are deferred under standing SDD, never silently discarded or treated as completed fixes.

- Task D0.3; review_sdk_token_d03_sol; reviewedHEADc35716e68245bd7f7747a6d6020ebd4953df8270. test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs:110–134:12negative matrix helper accepts any400/401/503 ratherthan exactreported status/OAutherror. Add expected tuple percase, preserving missing-app503. Current primary evidence confirms intendeddenialstages; nonblockingtestprecision. Finalreview must triage beforemerge; no fixclaimed. Rootreadfix-loop Minor-defer rule and didnotenterafixloop.

No Critical/Important parked issues in D0.2/D0.3 acceptance. Operational gates remain outside source acceptance.

- Task finite-owner-io-fanout; reviewer review_owner_io_fanout(Astrahigh), reviewedHEADae39d1b220614498856160a3b2de994c58544110. test/mcp-qa-finite-owner-qa-sdk-native.test.mjs:86: worldfinally awaits ioRelease/ioWait before dispose/cleanup without nestedfinally; failedrelease/settlementassert skipsisolatedruntime/tempcleanup. Nestcleanupfinally; keepdrainassertionanddon'tcallforceddisposalphysicaldrain. Nonblockingtestfailurepathquality; DEFERRED underSDD, finalwholebranchreviewmusttriage. Notpartoffix1Importantandnotclaimedfixed.


- Task native notice store; review_native_notice_store; reviewedHEAD78c3bdc6fec287494ec1e2d37223c8d006ea6487. Mantenimiento no bloqueante: warnings npm/NodeAPI/ActionsNode20→24 en informe2026-11-05-finite-preparation-notice-store.md. No evidencia de defecto del componente; triage de herramientas al finalwholebranch, no ocultar ni repetir runs para suprimir ruido. Important de absorción concurrente se trata aparte en fixround1 y NO está diferido.
