# Task1 — preparar full9 con custodia, todavía INACTIVO
11Nov2026. Lee primero este brief; requisitos de cableado y staging, NO permiso de ejecutar I0.
PROJECT AFW;REPOSITORY tokenizartinfo-ops/agent-friendly-web;ENVIRONMENT Source/SYN GitHub Actions;RESOURCE Sourcebranch feat/finite-native-cleanup-20261101;ORIGIN connector;ALLOWED_ACTION sólo TEMP inactivo+appendreport porCAS, sin launch.

## BASE / alcance
BASEae688f979dc35fa2c2274703c2b6e89cc9272cdd/treee12ecc7f366ad04df8baf83ad3e2af1d0a4aafed,3188hojas,TEMPausente. Helper9a486b839874ed8e9a950f6a823b18e7585de52e ytestc913c94be080597704fbf7d370475443e1f1b96d ya pasaron9TAP(contenedor+8casos) en20726e9/run43117597048/1. Root contrastó código completo, lint/sintaxis/cierreNode-only/jobs/artefactos/readback. Eso NO es el8Q+P1 original.

Sólo .github/workflows/afw-finite-budget-qualification.yml y append docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md. Comparar cada hoja excepto los2paths conBASE. Ningún nuevohelper, shim, import, alteración de aserciones, testcount, clock, sensor, descriptor,SDK,package/lock/config/lib/worker. Mismoescritor, sinhelpers/reviewer.

Speccustodia docs/superpowers/specs/2026-11-11-finite-syn-checkpoint-custody-design.md @b40281b449cfe0ba1adf0dba5fabe0745553060e/bloba1ccbd48064afe83b3930ce6885bf05330c61028. PlanmismoTask1. Brief full-lifecycle-task1 histórico conserva sus relaciones/casos/relojes, pero esta custodia reemplaza su upload público en claro, su base8452 y su antigua autorización de lanzar.

## Staging seguro obligatorio
Workflow sólo on:workflow_dispatch y exactamente3jobs con if: ${{ false }} en CADA job. Nada de on.push/schedule/workflow_run/PR ni job activo. Revisar0runs nuevos/despacho al crear; nadie debe usar Runworkflow. Root verificará el archivo completo y liberará después una modificación consciente delTEMP a push-selfpath/exactbranch+guards, si la clave está comprobada. No generar I0, no llamar fixture nativo, no ejecutar seal sobre archivo existente ni abrir environment/valor. No declarar éxito del full9.

No repetir RED/faseA/custodiaGREEN/old56 por el staging. Comprobación de sintaxis estática/autoinspección de YAML+scripts sin ejecutar casos es suficiente; si necesitas Node local oCIadicional, STOPy pregunta. Todo trabajo porconnector, sin checkout/build/npmlocal.

## Orquestación que debe quedar preparada
Al activarse más adelante: misma revisión/run/attempt1,exactamente3jobs Ubuntu24.04/Node22. contents:read/actions:read solamente, checkoutgithub.sha/persistcredentialsfalse/fetchdepth1, cancel-in-progressfalse. Sin secrets en argumentos/GITHUB_OUTPUT/logs; environment afw-finite-syn-checkpoint sólo en productor/consumidor, clave AFW_SYN_CHECKPOINT_KEY sólo en pasos seal/open/key-preflight. Nada de PATs/scopesnuevos. La presencia UI de clave sigue sin verificar; falla preI0 si no es válida.

1. pure≤3min: comprobar sintaxis/lint7MJS(los5observador más2custodia), original8Q de test/finite-budget-diagnostics.test.mjs (8pass,0fail/cancel/skip/todo), strictpreflight130paths635groups54readerSites mediante preflight-budget. No repetir unitcustodia9. Artefacto seguro puro con manifiesto original, mismoIDreadback estricto. No clave/env/I0.
2. positive_prepare≤15min needs pure: iniciojob inmutable AFW_JOB_STARTED_MS, clavepreflight efímero antes I0; herramientaslockednpmci --ignore-scripts --no-audit --no-fund; descargar/verificar mismo pureartifact/source/run/attempt antes de preparar. AFW_BUDGET_GROUP=positive,AFW_BUDGET_PREFLIGHT al preflight descargado. Invocar prepare-positive original, no probe/deferWaittrue. UN linaje real principal y2grafos; dispone y espera ORIGINALC0−120000. No refresh/rearm/change900s ni margen885000 existente.
3. positive_consume≤5min needs producer exitoso: clavepreflight; mismoIDdelcheckpointenviado porneeds.output, verificación exterior/open/inventariointerior; verifyBudgetCheckpoint original antes de recuperación fría. AFW_BUDGET_CHECKPOINT al checkpoint reconstruido, grupo positive, Node --test test/mcp-qa-finite-budget-native.test.mjs. P1=1pass/0fail/cancel/skip/todo; ready≤C0−30000, espera alarma original, conservaTODASaserciones de nativo/SDK/finalinventory/retirada/diagnósticos. Coherente8Q+P1=9, sin sumar otrosruns.

## Bundle privado y exactitud
APIshelper: sealDirectory({sourceDir,stagingDir,context}),openDirectory({stagingDir,destinationDir,context}); CLI key-preflight <kind>,seal <kind> <privateSource> <newPublicStage>,open <kind> <publicStage> <newPrivateDestination>. Header/context desde metadataGitHub. Publicstage EXACT envelope.bin/manifest.json/receipt.json. kind checkpoint /positive-result /producer-failure /consumer-failure segúnresultado.

Usar un bundle privado PADRE con subcarpeta checkpoint y logs privados separados: NO añadir budget-artifact.json, logs ni archivos auxiliares dentro del checkpoint original porque verifyCheckpoint exige inventario exacto. Si se usa sealBudgetArtifact(root,kind), va en el PADRE, y luego se verifica allí; verifyBudgetCheckpoint apunta exclusivamente a su hijo checkpoint. Custodia preserva TODOarchivo delbundle.

Los helpers existentes escriben algunos outputs fijos en workspace/output. Siguen privados en el runner autorizado; no requieren cambio de Source ni symlinks. Al cerrar el proceso, copiar sólo salidas propias al bundleprivado runner.temp (incluidos failure-epochs.json/epochs.json), sin tocar el checkpoint. Publicar ÚNICAMENTE stagecifrado allowlisted, jamás globoutput/workspace/runner.temp padre ni dumps/TAP bruto. El productor puede crear directamente checkpoint bajo elbundleprivado usando rootparam existente; verificar compatibilidadestática, no cambiarhelpers.

Tras seal: open delstage a destinonuevo, comprobarinventario yverifyCheckpoint original antes deupload. Tras upload: descargarMISMO artifact-id/run/attempt, verificar tresnombres/bytes/SHA/manifestcontraoriginal, open adestinonuevo yvolveraverificarcheckpoint. Consumer repitecopiadesdeIDoriginal comoúnicaautoridaddebytes/reloj. ResultadoP1completo+epochs+stdout/stderr se cifra conpositive-result; incluso si aserciones fallan se conserva falloencriptado conconsumer-failure.

## Resultados públicos cerrados
Capturar stdout/stderr/TAP nativo en privado, NO cat ni Node console.error(objeto). Recibo de custodia sólo sus camposcerrados. Resumen de negocio adicional a partir de fullresult original: source/run/attempt, I0/C0/C1/recovery.ready/dbNow numéricos; booleans alarmNull/stateComplete/baselineRestored/kvAliases/receiptClosed/sdkReductionReturned/fence/grantRevoked/finalInventory; conteos productor ynoticeactions validadas grant/revoke; hashes64hex permitidos. Ninguna fila/state/client/grant/token/binding/POST/metadata/script/capability/URL/stack.
Paraepoch: validar usando originales verifyObservedBudgetMetrics y verifyCompleteBudgetTrace cuando traceComplete; luego proyectar SÓLO segment/roleenums,epochinteger y contadores cerrados invalid/unattributed/numericOverflow/scopesOmitted/retained/omitted/traceComplete/proofLevel. No copiar objetos arbitrarios o snapshotscompletos alrecibo. Fuente de verdad sigueasercionesP1completas yrawcifrado; no usar elrecibo para saltarlas. No convertir traceincompleta encomplete_trace.

## Fallos / conservación / transporte
Keypreflight incorrecto: noI0 ni fixture, código fijo yjobrojo. Fallo fixture: capturar exitoriginal, cifrar salidasparciales/logs conkindfallo, preservar/readback ydespués fallarjob; consumer noarrancatrasproductorrojo. Si sellado/auth/allowlist/readbackfalla, NOuploadplaintext/NOconsumer; recibofijo evidence_not_preserved sincontrolesignorados. Nada de continue-on-error que permita negocio tras custodiafallida.
Cada uploadcomprobación exactID/inventario/digest; máximo3downloads con2s/5s sólo trasfallos previos, ningún latest/name fallback. Flagfinalmandatorysuccess. Custodiamax128MiB eslimite real: ratioaúnnoconocido, no elevarcap ni reintentarSource automáticamente. Conservar evidencia7d y originalreloj; si cola/margen falla, informar,no cambiarC0.

## Entrega de staging
Devolver NEEDS_CONTEXT/STOP o DONE_WITH_CONCERNS/STOP con Source/tree/TEMPblob/reportblob/0runs ycaracteres,privacidad de cada ruta/outputs y resumen de autoinspección de scripts. Dejarworkflow inactivo para Root; no retirarlo siharíaperderstagingrevisable. No es Task1 completo: faltaejecuciónoriginal+revisiónfrescaSpec+Quality.
No runtime Cloudflare/OAuth/OTP/permisos/credenciales/Containers/cron/clientes/Max/correo/main/PR/publish/newchat. operationalReadiness=false;completePackage=false;PCoff=false.
