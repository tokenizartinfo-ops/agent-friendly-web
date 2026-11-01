# Bounded native effect HTTP diagnostics
2026-11-01 · AFW source-only diagnostic addition

## Observed problem
IntentAFW-CLOSED-NATIVE-CLOUD-20261101T074443000Z/Hfee050 is CONSUMED/CLOSED. Cloud→comment6555113096→Actions41286044763 sourced17dd5952 qualified BASE41PASS and wrapper48388B, activated candidate7ebbbe07 and restored BASEc570/DEP59328f0e. Native Workflow create was denied4xx, but current bounded DTO omits the HTTP number. Independent07:50:29UTC25GET proved closed23terminal; auditv2 query for this own token/time/POST returned only3successful200 events, not the failed request. Neither evidence proves403, expired credentials, billing or a provider incident.
A new SOURCE diagnostic is justified before any new finite trial. Do not replay the old intent, widen privileges or probe with invalid POSTs.

## Fixed additive native result
Keep old clone result shape and behavior UNCHANGED. Native result adds exactly one frozen field:
effectHttp={
 purpose:'afw.qa-native-effect-http.v1',
 upload:{httpStatus:null,errorCodes:[]},
 activate:{httpStatus:null,errorCodes:[]},
 createWorkflow:{httpStatus:null,errorCodes:[]},
 restore:{httpStatus:null,errorCodes:[]},
 terminateWorkflow:{httpStatus:null,errorCodes:[]}
}
Each httpStatus is null or an actually observed safe integer100..599 from a genuine Response. Never infer status from thrown message text. Capture before later media/date/body/ACK validation, so a malformed or late reply still has honest observed diagnostic metadata. Null means unavailable within the active request, including ignored late completions; it is not proof that no response ever existed.
Each errorCodes is a frozen array of up to8 unique safe integer codes0..2147483647 from a bounded valid JSON Cloudflare error envelope only. No strings/coercion, raw errors/messages, HTTP headers, URI, auth, body, fragments or timing-based guesses. Unknown shape, too many errors, nonnumeric codes or unavailable body yields empty codes. Absence does NOT mean no provider error.

## Transport and privacy
Only native effect requests may read a non-success response body for diagnostics; old clone denial behavior is unchanged. Use the SAME original per-request/phase wall+monotonic deadline/abort and max5s, no new lease/timer/request/retry. Denial body cap8192B including Content-Length checks and bounded stream decode. Require existing fresh Date/cache/media guards before consuming error codes; retain observed status even if those fail. Body/media/timeout failure must not suppress status or change existing classification.
For normal native effect JSON responses, capture numeric errors before strict success envelope validation when success:false, preserving original unknown-ACK semantics. No invalid response is promoted to ACK or action authority. GET and public provider paths are unchanged.
Do not reflect any provider message or exception. No JSON.stringify of raw provider envelope into result/log. The total CLI artifact cap16384B and native output2048B limits remain unchanged; these diagnostics concern the outer controller result, not inner v2 output.
Mutation counters, one-use H, known deniedcreate cleanup prohibition, original N1/R1/subbudgets, fixed targets/credentials, roles, at-most-once upload/activation/create/restore/terminate, old budgets and allauthorityfalse are UNCHANGED.

## Acceptance
TDD through actual controller synthetic transport:403/409/400 numeric denial;500 unknown; no response null; HTML/malformed/oversize/uncooperative body bounded; private string messages never appear; code string/float/oversize arrays rejected; soft200 error remains unknown; success values honest. Successful native lifecycle and all existing clock/cleanup/ownership/late-result tests still pass; old clone DTO has no effectHttp.
Independent exact-head review + full CI before source merge. No runtime, permission/token, auth/grant/OTP, scheduler, customer or Max change. New trial, if later justified, needs its own fresh finite intent and primary preflight; this source does not authorize it or prove readiness.

## Classification and settlement precision (preflight P2 resolved in design)
The existing classification latch httpStatus is assigned only AFTER current() succeeds. Preserve that exact point and classifier. Diagnostic observed status is a SEPARATE value and must never feed denied/unknown, ACK, ownership, cleanup eligibility or retry decisions. A late4xx may be diagnostically visible while outcome remains unknown. If request is already aborted/finished, ignore its late completion.
Promise.race does not cancel losing work: fence diagnostic writes with active request and controller settlement, then return detached deeply frozen copies. A deferred fetch/body completion after return cannot mutate any returned field or outcome.
Cancellation is best-effort and non-awaited for the new native diagnostic-body path; contain synchronous throw, async rejection and indefinitely pending cancel. It must not replace original failure or postpone cleanup. Do not broaden this into unrelated legacy transport refactoring.
HTTP200 success:false keeps the existing normal response cap; extract codes only if that complete envelope also fits8192B, otherwise suppress codes without changing classification.
Tests must distinguish late4xx from timely4xx+hanging body, deferred completion after finalreturn, invalidDate/cache/media, exactcodebounds/duplicates/allfiveeffectsskippednull, and cancel throwing/rejecting/hanging. Actual CLI serialization limits remain tested; no raw diagnostics escape.
