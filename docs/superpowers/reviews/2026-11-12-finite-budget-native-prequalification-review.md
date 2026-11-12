# Task2 native preparation — architecture prequalification

2026-11-12 06:56:10 UTC. Reviewer /root/budget_native_prequalification_review (gpt-6-astra/high), readonly; reviewed full BASE7852..3590/all7paths/package07fd7b29 and four binding briefs. No tests, nativeI0, Sourcewrites or activation. Spec NOTAPPROVED; Quality NEEDSFIXES. Native16HELD/all7false.

## Critical

F1. Observers detach on reduction setup. recoverCheckpoint installs ownerCleanupFault(normal); new finiteBudgetReduction invokes old restore, installs adapter then ownerCleanupFault(normal) invokes same stillassigned old restore again and replaces get/list/delete with rawmethods. Counters D1/D2 disconnect, D3 may acceptemptycounterfacts, D4 cannot see heldACKs. Compilepreflight/disposercontrol do not exercise this ordering. Source cleanupfixture301, existing19–22; persistence171. Rootprimary causalread independentlyconfirms oldclosure remainsassigned. Required preservefixednewcounter/hold through actualnormalwrapper setup, withactualorderregression/noI0 first.

## Important

F2. R3 reads actualElapsedMs from snapshot captured BEFORE releasing heldACKs; it is written in actual lookup work finally aftersettlement, so correctpendingpath mayreturnNULL. D4 maxelapsed over allchildrenafterC0 can attribute anotherchild. Originaldeadlineexpiration and lateractualsettlement must be separate evidence of SAMEchild. world949–968/1015–1018, cleanupfixture103.

F3. Populatedqueue verdict accepts stale sample. queue.length recorded afterpush/beforepump notdequeue; queuedAtHold caninherit1 fromalreadyenteredoperation. Haveactive/family/time butassertonly>0. R3/D4 needcausalactualqueuedwhilecapacity2occupied/evidencecurrentwhenholdsestablish, withoutbusinessbehaviorchange. world648–664, adaptercleanup301.

F4. R2/D3 canpassfrompriorunrelatedfailure. R2 acceptsnon302/zeroReference/uppertops evenzeroIO. D3 acceptsSDKfailurebeforesecondpage, grantpresent andanythingnotcomplete. uncertainSendRetried derivedalarmdeliverycountdoesnotcountSEND/SDKattemptswithinthatdelivery. Needcausalevidenceoriginalbudgetboundaryreached, durablepending andactualSEND/attempts. nativetest105–116/133–142, world1011–1018.

F5. Readonly canlosefixtureandevidence. ownerReferenceFixture canreject AFTERregisteringcleanup butfassignmentnevercompletes; if(f)finallyskipscallback =>liveMFduringsubsequentcase. Successclones/persistsepochsBEFOREcallbackterminalcapture;nativeDBtemporaryremovedbycleanupandcustodycopiesonlyoutput. Producerfailurebeforeexportalsooutsideoutputcustody. Needownsafefailure/terminalnativeevidencepreservationBEFOREdispose/deleteandcleanupregisteredcallbacksregardlessfassignment. cleanupfixture114–122/world939–972/initialentryworld196/workflow1056–1065. Actualcrypto doesnotrecovermissingdata. Source/testseam scopeextension ifneededmustbeproposed/readbackbeforemutation; no productionexpansion.

F6. Authenticatedinneridentitypartial. Producerbindingbeforemountomitsjob/lane/commandSucceeded/repository/ref/sourceTreevscheckout; peeraggregatealsoomitsjob/lane. Needallfixedidentityfieldsbeforemountandaggregate, includingmappedproducerlaneandactualtree. workflow849–857/1307–1310.

F7. Bpeerwaitonly15*2s mayrejectvalidnativequalificationwithindependentP1/producerclocks; DAGpermits>30sgap. Pollcount/waittimefactsnotpersisted. Postnative/disposalhasownfinitejobbudget; chooseboundedpostnativebudgetconsistentactual15minjob, preservetimes/countswithoutclockrefresh. workflow1277–1284.

## Minor deferred for finalreview

M1. Paired disposer discardsallbutfirstfailure; disposalerrorcanmaskoriginalmountfailure. Controlcovers3individualfirstfixturefaults, notexplicitnormal/multiplefailures. world1026–1052/1074–1076. Allphaseattemptsdooccur. DeferunlessdirectlyaffectedbyF5, thenpreserveallprivatefailureswhilekeepingfirstactualidentity.
M2. Aggregaterequires5distinctRootshashes,butrequirement5genuineoccurrences/10rolegraphmountrecords requiresprovenance, notuniquehash. workflow1326–1330. Carrytofinalreview; do not silentlytreatfivehashesasindependence.

## Strengths and pending runtime verification

Production/SDK/dependencies/configpreserved. Actualapi.revokeGrantstructuralcall/awaitpreserved; closedcustodykindsenum/crosskind/tampertests. PairedallSettledcatchlatesibling;Bstartsreadonly+reductionproducer; ownterminalfutureacknowledged; preflightsnotcalled16green. Manualworkflow404onmainwasreported; Rootalreadyusesonefixedselfpathpushactivationonsourceafterrelease, no maincatalogchange.

Afterfixandre-review, actualonecoherent16/7terminaljobs/firstattempt/samefrozenSHAstillrequired:5genuinefixtures10M-QAmountprovenance,originalRoot30s/child5s/I0/C0/C1/SDK/Reference;causalR/Dinputs/pages/hold/queue/deadlines/SEND/observed/receipt/pending;4Dsamecheckpoint/exactID/digest/bothaliases/4readytimes<=sameC0-30s/A-Boverlap;producerstart/export/realjobintervals/disposition;all7dprivateartifacts/authinnerinventorysameIDandclosedsummaryhash;RootfinalBterminalreadback. FinalTask2review/global296reviewremain. Allreadinessflagsfalse.

## Original reviewer findings — verbatim body

1. **Los observadores de reducción se desconectan antes de que el SDK los use.** La recuperación instala `ownerCleanupFault('normal')`. El adaptador D ejecuta su restaurador, instala los sensores y vuelve a llamar a `ownerCleanupFault('normal')`. Al entrar, ese método ejecuta otra vez el restaurador anterior, que aún está asignado y repone los `get/list/delete` originales. Los contadores D1/D2 quedan desconectados, D3 puede aceptar contadores vacíos y D4 espera dos ACK que este adaptador ya no intercepta. El preflight de compilación y el control del disposer no recorren esa secuencia.

2. **R3 toma el tiempo de la operación antes de que exista el dato.** `observed` es una instantánea obtenida mientras los ACK siguen retenidos. `lookupChild.actualElapsedMs` se escribe en el `finally` del trabajo que espera el lookup real. Después de liberar los ACK ya hay otra lectura, pero el resultado sigue consultando la instantánea anterior. El camino que conserva correctamente el trabajo pendiente puede entregar `null` y fallar el test de 5 segundos. D4 tiene otro problema de atribución: usa el máximo de todos los hijos posteriores a C0, de modo que el tiempo de otro hijo satisface la aserción. El vencimiento original y la terminación posterior de la operación necesitan evidencias separadas del mismo hijo.

3. **El test de cola ocupada acepta una muestra obsoleta.** Se observa `queue.length` después del `push` y antes del `pump`. La longitud almacenada no se actualiza al extraer elementos. Al asentarse las dos operaciones, `queuedAtHold` puede heredar el `1` de una operación que ya entró, incluso si entonces no quedaba ninguna esperando. Los eventos ya contienen `active`, familia y hora, pero el veredicto solo exige `queuedAtHold>0`. Afecta a R3 y D4.

4. **R2 y D3 pueden pasar por un fallo anterior al límite que deben calificar.** R2 acepta cualquier respuesta distinta de 302, cero referencias y cotas superiores satisfechas incluso con cero listas/gets. D3 acepta un rechazo SDK anterior a la segunda página, grant presente y cualquier estado distinto de `complete`. Además, `uncertainSendRetried` se deriva del número de entradas al alarm, que no revela cuántos SEND o intentos SDK hubo dentro de esa entrega. Hacen falta evidencias causales de la frontera alcanzada y del estado durable pendiente antes de contar esos PASS.

5. **Readonly puede perder tanto el fixture como su evidencia.** Si `ownerReferenceFixture` rechaza después de registrar su callback de limpieza, la asignación a `f` nunca termina. El `finally` condicionado a `if(f)` omite ese callback y puede dejar una instancia viva durante el caso siguiente. En el camino exitoso se clonan y escriben los epochs antes de la captura terminal que hace el callback. El almacenamiento nativo temporal se elimina durante esa limpieza, y el paso de custodia solo copia `output`. El cifrado posterior no puede recuperar esa base ni la instantánea final del caso. El mismo límite de alcance afecta a la evidencia de un productor que falla antes de exportar su estado a `output`.

6. **La autenticación comprueba solo parte de la identidad interior exigida.** Antes del mount se verifican el ID asignado, digest de metadatos, AAD, rol, grupo y casos. La comprobación del manifiesto interior omite `job`, `lane`, `commandSucceeded`, `repository`, `ref` y la correspondencia de `sourceTree` con el checkout. La agregación posterior comprueba algunos de esos campos, pero tampoco compara `job` y `lane`. Por eso el informe afirma más de lo que verifica el código respecto al carril.

7. **La agregación puede descartar un ensayo nativo válido por diferencias normales entre jobs.** B concede 15 pausas de dos segundos para que todos sus pares terminen, incluido P1, que tiene productor y reloj independientes. El DAG y los márgenes originales permiten una separación mayor. Tampoco se persisten el número de consultas ni el tiempo de espera solicitado por el brief. La recolección sucede después de la disposición y tiene un presupuesto de job propio.
