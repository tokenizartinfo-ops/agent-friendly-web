# Task2 scoped fix round1 — SAME-reviewer verdict
Reviewer /root/budget_native_prequalification_review (gpt-6-astra/high), readonly. FIX_BASE3590f42f3c58d2c14f176230081c402c6b97bf93 → HEADd9b7ea752466ee6c5865b1529aeed28072a085ff/treef5f5a676415a5b92894e966d8876c9c8367beee2. Complete13commit/6path package3edade05 @821d7b76. No reviewer tests/jobs/writes. Five addressed, F2/F5 stillopen, newF8 Important. PREPARED_INACTIVE; native16/I0 HELD.

## Finding verdicts
F1 ADDRESSED: Dpreviousrestore reference cleared before newadapter+normalwrapper. cleanupfixture301/controlworld1495.
F2 NOT ADDRESSED Important — verbatim current finding:
**F2 — NOT ADDRESSED, Important.** R3 y D4 ya seleccionan el hijo correcto y registran por separado su trabajo y su espera. El veredicto acepta, sin embargo, cualquier rechazo de `wait` y aborto del hijo en la ventana posterior al deadline con el padre vivo. El lease original también aborta en `finally` cuando termina por un error ordinario. El observador dispone de `workSettledAt`, `workPendingAtAbort` y `sameWorkWaitError`, pero el veredicto no los consulta. Por tanto, una lectura que muestre el mismo error de trabajo propagado por `wait` y un aborto de cierre puede contabilizarse como `denialAfterDeadline:true`. El control puro solo ejercita el caso en que el temporizador coincide con el rechazo y el trabajo sigue pendiente. La discriminación debe admitir los órdenes reales del SDK y conservar como indeterminada una causa que los datos no distinguen.
Primary finalworld1089–1095; protected lib/mcp-qa-finite-initial-lease.mjs11–17; controlworld1252–1258.

F3 ADDRESSED: sample atactualnativeentry afteroriginalcheck, ties2held/samechild/family/currentqueue/nooutwardsettlement; actualtwo_onlyfalse/queuedtrue bothfamilies. world709–714/1081–1088.
F4 ADDRESSED: actualfinalcapdisjunct+precedingcalls, actualSEND/SDKcalls anddurablehash, earlyfailurecannotpass. world1097–1108/1195–1203.

F5 NOT ADDRESSED Important — verbatim current finding:
**F5 — NOT ADDRESSED, Important.** Se resolvieron la pérdida del callback antes de asignar `f`, la captura terminal en readonly y el orden del archivo en el camino exitoso. Queda un fallo reproducible por inspección del *caller*: el wrapper de `mf.dispose()` captura el rechazo del disposer original, marca `disposalUncertain` y **resuelve** la promesa. El productor protegido interpreta esa resolución como éxito, marca `disposedForCheckpoint=true`, copia `input.persist` a `checkpoint/state` y puede verificar un manifiesto sobre esa copia. El cierre exterior terminará clasificando el job como fallo e impedirá que un consumidor monte el artefacto, pero ya se habrá copiado una base cuya disposición era incierta. El control verde comprobó `beforeDelete()===false` y el bloqueo de una nueva asignación. Quedó sin cubrir la continuación del productor inmediatamente posterior a su `await`.
Primary world827–839; protected test/fixtures/finite-owner-cleanup-persistence.mjs130–139; uncertaincontrolworld1464. Root separatelyread protectedblob e317f582 lines130–141 and confirms awaitdispose→flag→copy.

F6 ADDRESSED: fullinneridentity/AAD/ID/digest beforemount andaggregate. world1563–1570/workflow879/1345.
F7 ADDRESSED: postnativebudget fromjobstart/reserve120s, attempted/completedqueries/actualrequests inclfailure/timefacts. world1572–1585/workflow1298–1319.

## New breakage in fixdiff
F8 (Root identifier) Important — verbatim reviewer finding:
**Nuevo hallazgo — Important.** El sellado público del job puro copia `syntax.log`, `lint.log`, `tests.tap` e `inactive.tap` directamente desde el área privada, también cuando falla la comprobación. Un error de `node --check` puede incluir la línea fuente entera, y un TAP fallido puede incluir stack y valores de aserción. El filtro de 1 MiB solo limita el tamaño. Además, la primera de las dos copias de TAP ocurre antes de aplicar ese límite. Así, un error futuro puede publicar texto fuente o diagnóstico bruto en el artefacto público. El covering exitoso no recorrió esta rama.
Primary .github/workflows/afw-finite-budget-qualification.yml137–140. This describes unsafe futurefailure publication, not evidence of an actual secret disclosure.

## Verdict
PREPARED_INACTIVE. Task2 fixround1/5:5addressed,3open(F2,F5,F8), commits3590..d9b7. Covering43189940398/1 Q8/allF/all3profiles genuinelyPASS on same4fixture/testblobs; puretests do not cover these remaining causal/failure branches. All7finaljobsmanualfalse. Actualcoherent16/taskfinalreview/GLOBAL296review remainpending.
Round2 NOT dispatched: ownerrequested save/stop forPCshutdown. Onresume readfix-loopfresh, send3openfinding bodiesverbatim toSAMEimplementer, no controllercodefix; newSAMEreviewer scopedbase d9b7..round2final aftercoveringreport.
