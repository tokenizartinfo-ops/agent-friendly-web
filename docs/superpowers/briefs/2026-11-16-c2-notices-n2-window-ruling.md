# N2 normative Node-arrival window mapping

Fecha UTC: 2026-11-16 12:06:14 UTC

Applies to Source/OWN N2 DATA under brief07a10773 and OWN brief69328545. This rules on the existing enum without widening instrumentation, guards, requests, deadlines or authority.

1. Initial collector window is prerequisite. Recognized guard tags arriving before the baseline following PHASE are excluded from public guard records; they may contribute only to bounded excludedTags. prerequisite is therefore an internal pre-baseline window, not a valid new published guard after baseline in this four-case graph.
2. At the actual baseline (before notices probe/HTTP), window becomes unscoped. It remains unscoped through the before probe and the gap until GETenter.
3. GETenter sets notices-get. GETresponse does not end it: headers received and body read/cancel still pending retain notices-get. GETreturn or GETthrow sets unscoped, including the gap before POST or a failed GET with no POST.
4. POSTenter sets notices-post. POSTresponse retains notices-post until actual body return/throw. POSTreturn or POSTthrow sets after-post. It remains after-post through notices action/count and after-probe until AFTERenter.
5. AFTERenter resets unscoped, even if no POST occurred. During cleanup and after AFTERreturn/throw it remains unscoped. The final hook-state is emitted after that original settlement and stops the collector. No guard record or mutation is admitted after final state; late delivery afterward is ignored, not evidence of drain.

These are Node callback ARRIVAL windows only. A delayed phase/cascade log arriving after baseline may belong to older work; do not use its original structured timestamp or claim authenticated request correlation/first cause. correlated:null and interpretation/guardOriginunknown remain fixed.

Host/hook prefix ruling: a complete valid capture may omit baseline when NOTICES is explicitly blocked (no work/count/HTTP/guards). Final hook can still honestly carry callbackObserved true|null and excludedTags from earlier source-emitted observations. Honest timeout prefixes may stop before baseline or final, including an entered NOTICES action interrupted before its baseline. Do not require a final state for such incomplete prefixes. A completed entered NOTICES action must have baseline and required before/after probes; diagnostic faults are not a new valid work path. No-baseline complete witness cannot manufacture guards or HTTP. If actual emitted code requires another original exception path, report it before treating it as admissible.

For existing baseline/final states callbackObserved cannot regress true→null. Excluded tags count only recognized pre-baseline arrivals; absent further pre-baseline period, its baseline and final totals agree. New guard count equals actual safe guard records. Unknown/malformed/overflow/fault stays explicit and cannot fabricate a positive callback/proof. All SourceQualified/Task1Pass/seven nonclaims remain false.
