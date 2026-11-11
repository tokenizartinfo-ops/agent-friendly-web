# Task1 — liberar UNA calificación original con custodia
11Nov2026. Requisitos vinculantes de esta fase; reemplaza la prohibición de ejecutar del staging, sólo en los términos siguientes.

PROJECT AFW;REPOSITORY tokenizartinfo-ops/agent-friendly-web/public1347578006;ENVIRONMENT isolatedSource/SYN GitHubActions;ORIGINconnector;RESOURCE_TYPE Sourcebranch;RESOURCE_ID feat/finite-native-cleanup-20261101;ALLOWED_ACTION UNAactivación8Q+P1original/3jobsconworkflowpreparado;ROLLBACK retirarTEMP/appendreportCAS, noresetforce/main/runtime.

## BASE y evidencia
SourceBASE5a3ea2a41504dad4cac66215272bac7608d6a25d/tree1ceef99250f521cb1104099a84988ce50e9d625a/3189leaves. TEMPblob8982fffc2c8c4ec35b84c194a4f84521694a03ca/48601chars/910lines, informe42a17ba5a12812180807ab6c0664f1f884f2a40e. Root leyó COMPLETOS los910renglones, contrastó diff2pathsdesdeae688, árbol íntegro,0runs de5a y0activos en12recientes. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 verificado23:36:54UTC; no lo mutarás.

Todos losblobs fueraTEMP/reportexactos5a; helper9a486b839874ed8e9a950f6a823b18e7585de52e/testc913c94be080597704fbf7d370475443e1f1b96d/5MJSobservador ydescriptorprotegidos. CustodiaGREEN43117597048/1 está cerrada; no repetir9TAPcustodia ni faseA/RED/old56/Task2.

Root verificó GitHubenvironment27007821967/afw-finite-syn-checkpoint con AFW_SYN_CHECKPOINT_KEY guardado11Nov20:25Argentina, formcerrado, única ramaSource/0tags. No valor leído. La clave sólosevalida efectivamente por key-preflight deljob antesI0. No volvera crear/rotar/copiar credenciales ni pedirOTP. EstadoSYNesfixturelocalaislado conforme aclaración delbriefstaging; nunca cuenta/navegador/APIreal.

## Único diff activador permitido
SóloTEMP+appendreport. Elcuerpo de48601chars preparado queda EXACTO salvo:
- on.workflow_dispatch se sustituye por on.push.branches:[feat/finite-native-cleanup-20261101] ypaths:[.github/workflows/afw-finite-budget-qualification.yml], sin disparadores adicionales;
- run-name pasa a AFW finite SYN original lifecycle ${{ github.sha }};
- pure if pasa a ${{ github.run_attempt == 1 }};
- positive_prepare if pasa a ${{ github.run_attempt == 1 && needs.pure.result == 'success' }};
- positive_consume if pasa a ${{ github.run_attempt == 1 && needs.positive_prepare.result == 'success' }}.
Ningún otro cambio a script, deps, paths, contexto, límites,timeout, condiciones de evidencia o negocio. Si encuentras defecto importante antesde activar, STOPyNEEDS_CONTEXT en vez de arreglarlo a escondidas.

Verificar otra vezBASE/0runsstaging/noactivefuente antes deCAS. CongelarSource desde activación hasta terminal. Una sola ejecución/attempt1/SHAactual; no rerun ni commitdelTEMPduranteejecución.

## Lo que se debe probar realmente
3jobs exactamente: pure≤3min, productor≤15min, consumidor≤5min. Node22/Ubuntu24.04, locks/npiignore-scripts, contents:read/actions:read,checkoutshaexacto/persistcredentialsfalse, cancel-in-progressfalse. Elpure8Q original+lint7MJS+preflight130paths635groups54sites, sinI0/envclave. Productor comprueba clave ypureartifact previoantesI0; invoca prepare-positive genuino/defaultdeferWaitfalse. Dispone elproductor yespera originalC0−120000; consumidor reconstruyenuevoestadooriginal yrequiere ready≤C0−30000, esperaalarmaoriginalC0=I0+900000,C1=C0+180000. Nada defrescar/adelantar/alargar/rearmar reloj o sustituir fixture.

Resultado coherente9PASS=8Q+1P1/0fail/cancel/skip/todo enmismaSource/run/attempt. Las9TAP de custodia NO forman partedeesteconteo. TODASlasasercionesnativas/SDK/Reference/Notice/retiro/restore/finalinventory/diagnósticos del P1 original permanecen. observed_metrics no se llama complete_trace sihayomisiones; unknown/invalid/unattributed/numeric/scope loss falla.

Checkpoint yresultados/logs delprincipalSYN sólo se publican en sobresGCM-gzip concontextorepo/ref/Source/run/attempt/kind; stagingexterior3filesclosed. Manifestnativooriginalintacto dentrodesuhijo, sinbudgetmanifest/logscontaminándolo. Autenticarantesinflar,validarantesrestaurar,verificarbytes/inventarioslocalesytrasupload, siempreMISMOartifact-ID. Lasretry1/2/3sólocon2s/5sdespuésdefallo yguardfinalmandatory. No latest/namefallback/ignoredcustodyfailure. Clave sólo pasoshelper,sinenvdump/argv/archivo/chat/log.

## Resultado y entrega
Seguir hasta terminal. Fallo: conservarcifradoloqueelworkflowsabeconservar yestado/exit honesto; si infraestructurao límite impidepreservar, registrar evidence_not_preserved, no subirraw ni prometerconservación. Noreintentar/elevar128MiB/réplicas/C0 por inercia. La compresión nativa yel margen original aúnno estánacreditados; este ensayo loscomprueba, no eludeelriesgo. Un fallo deencoladooGitHubtransporte no significa fallodeCloudflare/clave.

Recibospúblicos sólo camposcerrados autorizados; no rawTAP/DB/KV/bearer/cuerpos/scripts/errores. Reporteappend conSource/tree/run/attempt/jobID/I0/C0/C1/ready/epochproofs/omisiones/tamaño&hashsobres/cifradoverificado/artifactIDs ysameIDreadbacks/attemptsrealmenteusados. No afirmarprobadonadaantesdesuobservaciónterminal.

Alterminal(retornoexitosoo no): retirarTEMP, appendreport,preservarSourceprovenance yworkflow ejecutado enGithistoria, árbolcompleto/fueraallowlist/main/ref/CAS/readbacks. DevolverDONE_WITH_CONCERNS si9PASS,NEEDS_CONTEXT sifallo;STOPenambos. No Task1selfaccept/reviewerpropio/Task2/16/56. Root preparará revisiónfrescaSpec+Quality GLOBALBASE29681cae2bf1094ec5c66d5b2784254f77bec697..finalHEAD después delPASS; mientrasno,noaceptarTask1.
Sin OAuthreal/OTP/tokensCF/runtime/cron/Container/consumidorreal/cliente/Max/email/main/PR/publish/newchat. operationalReadiness=false;completePackage=false;PCoff=false.
