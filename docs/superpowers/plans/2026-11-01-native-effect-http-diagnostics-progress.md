# SDD ledger — plan: docs/superpowers/plans/2026-11-01-native-effect-http-diagnostics.md
AFW repo tokenizartinfo-ops/agent-friendly-web; isolated cloud design56088f33 based acceptedmain17dd5952. No localclone/build, no runtime/newtrial.

## Preflight/interface scan
| Pair/task | Producer / consumer | Ruling |
|---|---|---|
| Diagnostic response / classifier | independent observedStatus / old httpStatus aftercurrent | NEVER move classification latch or use diagnostic status for ACK, denied/unknown, cleanup or retries. |
| Bounded native body / request clock | <=8192errorbytes / original<=5s phase wall+mono+abort | Same child end, no extra request, reset or awaitcancel; oldclone errorpath remains unchanged. |
| Async losing work / final DTO | private accumulator / detached frozen map+arrays | Fence afterrequest abort/finish and global finalization; no deferred mutations afterreturn. |
| Error numeric fields / public log | <=8uniqueintcodes / fixed5effectrecords | No strings, errors/messages/body/header/URI/env/providerexceptionreflection. |
| HTTP200softfailure / unknownACK | normalbodycap unchanged / codesifwholeenvelope<=8192 | No ACK promotion or uncertainty loss. |
| Source composition / parallel material block | core+nativefixture+CLItests / newacceptedmain | Compose owned blobs only after material source base accepted; no replayfee050. |
Task1 testmatrix: late4xx vs timely4xx+hungbody, allfive/skipped-null, native/clone compatibility, Date/cache/media, exactnumericbounds/duplicates/oversize/chunkedmalformed, cancelthrow/reject/hang, lateafterreturn, actualCLIcaps.
Design preflight583ebeb0P1/1P2; corrected56088f33 P2ADDR/0remaining. Userdelegatedtechnicaldecisions/nointermediatequestions; ownerunavailablebefore12:45UTC.
## Status
- Task1 source TDD: pending.
- Task2 fullsourcecomposition/review/CI: pending.
- Oldfee050trial consumed/closed/rootprimary25GET07:50:29UTC; causeHTTP4xxexactstatusunknown. No permission mutation.
