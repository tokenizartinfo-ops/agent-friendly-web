# AFW Task2 — cierre owner nativo y restauración con la alarma original

Estado: DONE_WITH_CONCERNS. Calificación final SUCCESS: 51/51 casos, 12/12 jobs y readbacks completos; revisión independiente pendiente. SOURCE/SYN exclusivamente. operationalReadiness=false; completePackage=false; PCoff=false. Task1 permanece aceptada; Task2 no completa el plan total ni autoriza runtime, publicación o prueba humana.

## Alcance y revisiones

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=SOURCE/SYN GitHub Actions; ORIGIN=GitHub connector; RESOURCE_ID=feat/finite-native-cleanup-20261101. Un escritor Source; Root conserva el ledger separado. Rollback: commits propios nuevos con CAS, sin reescribir historia.

Brief vinculante: [c478cc7e](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c478cc7e85c093614c7ae705ce2ec76615ed8207/docs/superpowers/briefs/2026-11-06-finite-owner-restoration-task2.md), blob31504d60cea7e9312c5b0dc014336a77ba6d653c, rulings del 7 nov, incluida la alternativa de oracle puro ante la dependencia QA, más autorizaciones acotadas de Root para el probe del launcher y los readbacks históricos sin reproducir efectos. BASE Task2: 2c6b5a0eb503b8d877158f85832c510b9a45f7ca, tree57ac1355a85560dee14b2f933b4b68f877911ae2. No confundir con BASE combinado histórico7aab233.

Checkout congelado de calificación: d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce, treea672e4e931e613ff8ec850b644bdc4f4d78da985. Main protegido0c9c475b3ebaa970fc11d628b40e50a90cceb727. Revisiones finales de retiro del qualifier/reporte se consignan al cierre y no se presentan como checkout ejecutado.

## Implementación y límites de autoridad

El mismo alarm original detecta obligaciones de conexión/issuer/SDK/notice y las califica con almacenamiento nativo, Source/cápsula/backup, owner/revisión, puntero/módulo/configuración y reloj original. El consumidor separado no relaja el lector empresarial pre-C0 de Task1.

El orden es freeze issuer, fence terminal SQL y primaria, revocación del grant y retiro append-only del consentimiento, restore por el escritor original, reducción SDK exacta y receipt. El scope cleanup observa el ciclo original; no amplía la admisión empresarial ni activa capacidades nuevas. Send sin ACK/Observed queda incierto y bloquea complete; las lecturas posteriores son hechos, no ACK inventados. El selector SDK original viene de la Reference nativamente calificada; D1 UUID no sustituye SDK ID y una lista vacía no acredita revoke.

El scope cleanup es no autorizante. Registra la promesa real antes de competir con el timeout; un aborto lógico no elimina trabajo pendiente ni permite un Root nuevo en la misma ctx. Objetos de reducción/receipt usan identidad WeakMap de la invocación vigente, no capacidades serializadas.

Se mantienen I0, C0=I0+900000, C1=C0+180000; deadlines originales Root=30000ms y child=5000ms; tres slots originales C0/C0+60000/C0+120000. Los tiempos físicos observados se consignan sin redondear un overshoot del timer. Ni fuentes ni clocks se renuevan. El receipt final acredita CURRENT_CYCLE_BUSINESS_CLOSED, siempre globalNativeDrainVerified=false y sdkNamespaceEmptyVerified=false.

### Blobs productivos (idénticos a d46 en la corrección7nov)

- lib/mcp-qa-finite-stage-work.mjs: 068d35c2555c7dc711c487f6021ec572bd3af067
- lib/mcp-qa-finite-owner-cleanup.mjs: 7cb54895677ee67852f7c42013238bfc1e366d93
- lib/mcp-qa-finite-owner-cleanup-records.mjs: 6c751081e22ba6446664014090f8015a65e22407
- lib/mcp-qa-finite-owner-cleanup-journal.mjs: 127e5906891b20d2f08c74a412383b8b7e3ff1e2
- lib/mcp-qa-finite-preparation-issuer-store.mjs: b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb
- lib/mcp-qa-finite-initial-cleanup.mjs: 0a04ae3a4d74c2c7939b1654683054b1d5d751d4

## Persistencia y modelo SYN

El productor usa el modo first-connection-publication real existente y conserva scripts/opciones actualmente montados, worker names, namespaces, D1/DO/KV nativos, Plan/State/Reference/contadores/alarm y registry SYN después de dispose/flush. El consumidor restaura archivos exactos desde artefacto; no ejecuta bootstrap/seed/productor ni reconstruye marcas WeakMap.

El manifiesto verifica paths/bytes/SHA256, sqlite D1/DO/KV, M/QA scripts y metafiles. OAUTH_KV de canary-first-connection y AFW_FINITE_OWNER_OAUTH_KV de qa-first-connection comparten first-connection-oauth. client:<id> no expirable se lee semánticamente antes y por ambos aliases después del cold-load; se guardan hashes saneados, no se exige igualdad de datos TTL ya vencidos.

El registry solo atiende las rutas SYN fijadas. El inventario terminal de bootstrap es MODELED PROVIDER INPUT, no conclusión de que un Workflow Cloudflare real terminó por retornar una llamada local. El restore solo cambia la versión baseline y anotación del Plan original con ACK nativo de la operación SYN; su pérdida queda modelada por separado.

Las copias cold-load de casos pareados son réplicas SYN aisladas del checkpoint; cada una conserva el alarm/counter/Plan original de su linaje. No representan dos consumidores productivos ni acreditan drenaje global.

Siete linajes genuinos en seis grupos: g0=1, g1=2, g2=1, g3=1, g4=1, g5=1. Grafos M/QA: 14 TOTAL; g5 agrega1 grafo/script SDK-only, TOTAL 15. No son 14 por linaje. Máximo 2 instancias nativas simultáneas por consumidor; g0 sin competidor. Doce jobs≤15min, tres lanes pair-local y export originalC0−120s.

## Corrección de premisas7nov

Reference pre302.expiresAt=null es la observación histórica correcta de SDK1.2.1. El SDK guarda el grant del código con KV TTL600 y asigna expiresAt después del canje real con refresh0; M configura accessTTL=min(300,remainingD1). Se conserva Reference byte a byte y se observa inmediatamente el mismo SDKid/correlation/metadata, expiry y token nativos después del canje. g0 exige expiry finita≤C0 original y reusa la misma reducción normal; no emite una segunda revocación.

g5 es un adversario SDK-only declarado: callback AFW omitido SOLO en ese worker, misma identidad/client/audience/scopes y subjectToken genuinos; accessTTL300/refresh0. M rechaza token-exchange y no emite refresh. La variante no es admisión M ni cambia sus flags. Solo g5 demora authorize/primer canje hastaC0−300 sin Root vivo, prepara el JWT SYN antes de esperar y no extiende cookie/ticket/preconnection/consentimiento/C0. Conserva expiraciones observadas del código KV, D1, grant y token.

Antes de emitir, token con≥65s de vida real y child5s disponible; objetivoC0−75. Control positivo por mf.dispatchFetch con MF-Route-Override fijo canary-first-connection y Host/upstream original contra /mcp obtiene datos con el mismo token; después del cierre el mismo wrapper y M deben denegar acceso/datos por la operación real y su protocolo. El oracle registra la respuesta antes de assertions. No se usa QAdefault ni se atribuye D1 únicamente por HTTP.

La promesa SDK real se retiene antes de la carrera. A5s se emiten headers403 y cuerpo fijo sin token, el Root termina; el transporte permanece abierto hasta settlement físico. Release cambia una señal escalar; timer250ms corre en el contexto original con límiteC1. No resolver promesas desde otro request, no compatflags ni Root renovado. Se conserva reached, denegación, retención, rechazo/retorno nativo y settlement; no se exige una escritura exitosa ficticia ni se afirma drenaje global.

## Historia de pruebas y fallas preservadas

- RED causal42289097871, checkout 474e58189802bd62aa2ddb2febee196b67c435e0, prepare128137518701/consume128144105898. Producción todavía BASE2c6. Recuperación80.033s antesC0; native alarm original entró enC0=1793998029000; fallo por cleanup posterior no disponible, State pending/restore0. Root aceptó la causa; no se repitió. Límite entonces: wiring/archivos KV no eran aún lectura semántica client; GREEN la fortalece.
- Preflight42293207205/128151676487, ea3faec53406a5ae5a43f3d621cd67c389891731: SyntaxError Unexpected identifier 'fail'. Sin I0 ni artefacto. Corrección sintáctica en fixture.
- Preflight42293728842/128153465656,1415d980d88cf2b257eaa69b25a07ba1b666d539:19 PASS, lint exit0 con1warning SLOT sin uso; eliminado después. No registrar cero warnings para ese run.
- Preflight42295005231/128157841267,798353d7a02f7abdb9257e0a756f9f0a85cb62bc:40 PASS y M real1988061B/c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/340inputs. Sin I0; previo separado.
- Primer GREEN inválido42295503038,84abb279530cb40d45a80f936d95f1cd518d1af6: loader de instrumentación releyó producción y perdió CEILING SYN. Falló createFiniteInitialLease/narrow antes del estado/efectos. El pase foreign-pointer fue vacuo, no cobertura válida. Nueve artefactos preservados. Arreglo compone sobre sources transformados;6producción intactos.
- Segundo GREEN42298166866,d46daf51f8a54a8a969cb078808d3084c026e730: FAILURE6nov22:06:34UTC. Principal restauró/cerró realmente; g0expiry falló por exigir Reference histórica no-null. g1 dos casos PASS, jobFAIL por descarga inmediata por nombre; g2 dos PASS con límites de cobertura descritos abajo. g3/g4 no ejecutados. g5 falló antesC0 al exigir refresh_token inexistente: no petición tardía, hold ni commit. No mezclar esos pases con otro run.
- Root recuperó ex-post el MISMO artefacto g1 13543636518 por ID:16939B/archiveSHAec67636715547d0e8fdaaba050d9995e2ba6107bfc722049271952ed9b0cc8a2; manifiesto d46/g1 y3ficheros exactos. El job original sigueFAIL. La visibilidad transitoria fue hipótesis, no causa probada.
- Preflight dirigido42370972780/128398833363,0437b745c9915d009249ac88bcf35299132ecc18: syntax/lintPASS; workerd canceló el contexto por espera sin resolución local y posterior cross-request promise resolution (io-context.c++:1624). Assertsettledfalse, sin I0 ni artefacto. Corrección causal timer/señal escalar, no flags.
- Preflight dirigido42371140511/128399337083,22e9cfd13e41ecede2acfbe7e8d89593796d0148/tree64904b864bb7a3bd343b184b9ff4159147200b35: SUCCESS; SDK nativo completó/canjeó con TTL300/refreshausente, preexpiry null→postexpiryreal; hold a5ms, denegación EXACT5s, Rootdeadline30s, retención80.140s, bloqueo409 a sustitución y KV/SDK retorno real tras release. Artefacto 13573537287/537833B/SHAed8891f991f20843c2e8674b7aa7e59704a026fd78a817db7d8123fe17d3bf70; siete archivos+manifest readback porID primer intento. Componente sin I0 ni admisión AFW; no suma a GREEN51.

- Tercer GREEN42371498327/818bc4d4e6fb1935e594951ba09d3f9536ba49d6: FAILURE7nov12:46:46UTC; 50 PASS / 1 FAIL a nivel tests, sin GREEN51. g0..g4 diez casos nativos y40componentes PASS. g5 job 128406714718 falló ANTES de petición SDK-only/C0 en control positivo: Invalid Host:127.0.0.1; getWorker().fetch usa proxy Miniflare que conserva Host loopback al restaurar URL. Preflight previo verificó SDK-only pero no ese wrapperM: limitación reconocida. g5 outcome13575030294/1474B/b7f6ce42989e96861a263be0bce1f032ff352bfdd57f197c0f505e6d034d86a6 contiene solo TAP, por lo que readback estricto falla correctamente. g4 job 128406835418 dos PASS, retención y restart nativos; FAIL solo por readback que omitió el directorio g4-partial explícitamente subido. Outcome13575185515/10872023B/90edd8e83d2789fce9cca75b53d02102080e6ba0d60c891eac81fc90aff777e8 preserva checkpoint parcial; no borrado para ocultar la discrepancia. g3 job 128406758796 dos PASS/readbackPASS. Dieciocho artefactos preservados; algunas líneas JSON R2 de g3/g4 se cortaron a65536 caracteres en logs, JSON completos preservados en artefactos. Fuente congelada hasta terminal y rulingRoot; no rerun ciego.
- Preflight42375072153/128410871300, Source 4072983777e0a7a68ee3425b8171f6fb6870fb25/tree75fbd393e75f4e7e62c22e42dec3543bbc28ad67: CANCELLED por límite15min13:17:08UTC. Sintaxis/lint y auditg4 existente PASS; último marcador13:02:21 provisional-bindings-start, antes de M-compile/producir/canje/wrapper. No se acredita I0 abierto ni dispose temprano. Lanzador introducido node --input-type=module heredoc difiere del CLI de archivo aceptado; Miniflare Worker eval CommonJS hereda execArgv y Node22.23.4 lo interpretaESM, mientras main bloqueaAtomics.wait. Probeconfirmatorio posterior requerido; noatribuirM/Host/Cloudflare desde timeout. Always preservó artifact 13575578639/83989B/SHA21f779fd12609d3c369d4988fc7c3eebafa322e1c9e8a63635f90243748efc8d (expira14nov13:17:08); descarga digestPASS, readbackcompletoFAIL por outcomeM/graphs ausentes, no hashbad. Audit histórico:43files parcial, manifestSHAa9ff31854de268d6a3096255f85686c5d1b110459e96cbd6208fc3dad562c80d; sourceArtefacto818bc distinto de verifier 4072983, envelopehistóriconoteníadescriptor. No MF/I0/efectos durante audit.
- Preflight42376693686/128415622363, Sourcef591b7e8590b694cd3b7693f6537c6a92e5ee8e5/tree1056104aa9748599b67259d62419aeb2b735028b: controlPASS, jobFAIL por inventario de graphs4≠3; cuartoarchivo legítimo native-syn.json fue omitido del conteo esperado, no del upload. Probe previo confirmó ReferenceError(require no definido) con execArgv--input-type=module frente éxito requireAvailable conCLIarchivo/execArgv vacío; sin reproducirAtomicswait/I0. Launcher archivo desbloqueó getBindings y productor en38s; mismoM/c493 read_project_summary correcto(POST200/POST202/GET405/POST200), negativo401sin datos. I0=1794057804000,C0=1794058704000,C1=1794058884000,disposedAt=1794057871245 (<C0), closureProvedfalse. SDK-only92f655... compiladoigual320211B/187inputs, hold80s NOrepetido. Artifact13575584835/1322925B/SHA3477ad8f889a9c9229c10d62bb30a21bccd0d1cf6f1e23b3cb9aa31f54d675f6.
- Recuperación histórica42377045988/128416680190, verifierccfa81d2b1bbe91ac937b548dd669d42d5a81384/treebed7cf0b4769f8e9f10394fa11455fb12d326088: SUCCESS. DescargaMISMOartifact13575584835/sourcef591;12files y4archivosdelgrafo exactos/bytes/hashes/Source, native-syn.testRevision, M1988061B/c493/340inputs,QA2493518B/d6aad0878301acc9db74e6c4a1bf4063b6b9bca62dee877d71f688b800b52630/331inputs, SDK320211B/92f/187inputs; ningún MF/I0/SDK nuevo. Receipt13574979585/3809B/SHA c182d5fdbdf3c08f1dde11b7eb7231a98da9cdfe90ac05bc3badfcbdae1f6c1f verificado desde descarga. Original42376693686 sigueFAIL, no GREENretroactivo. Permisoactions:read SOLOjob histórico acotado ID/run/repo; tokenGitHubefímero sin valores/custodia nueva. Full51contents:read.

- Cuarto GREEN42377143830/e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb/tree39c134c134e2afd15da6abc6e7e95cdffa300c86: FAILURE7nov14:02:56UTC; 50 PASS / 1 FAIL, doce jobs/onceSUCCESS. G0..g4 diez nativas y40componentes PASS, incluyendo todos sus readbacks. G5 job 128423475086 llegó al hold SDK real,403 lógico, exclusión409, alarm original C0=1794059990000 y cierre complete/restore1/receipt5ba3d182510af275362b9662142bd308fd6e10489bf0998cacac7fb500f4627c. Después del release pasaron los asserts reached/released/settled/nativeReturned-or-Rejected/nativeAttempt>=C0; fallo posterior en línea124, assert HTTP401/403 de initialize. No se ejecutó read_project_summary después del cierre; status/body exactos y métricas before/after no se emitieron antes de fallar. No afirmar ni acceso indebido ni denegación empresarial comprobada. Artifact13577365572/9770B/SHA5ac83677c6b20808f3887a37a25c4556b30454c9ddb22c3377a08dd26fd07b60 tiene TAP+closure, falta late-kv-actual-outcome.json y readback falla correctamente. Dieciocho artefactos preservados. Diagnóstico: initialize no es lectura empresarial; M aplica grantD1 al callTool y puede retornar errorMCP dentro deHTTP200. Guarda outer service-window además retorna404 al vencer. Ninguno de esos status específicos se observó en esta petición, por falta de evidencia; no se adjudica causa por inferencia. Root recibió NEEDS_CONTEXT; no rerun ni ampliación ciega de statuses.

- Auditoría byte-only42380606239/128427219967, verifier 9a189cff22d6f24627d21b631338ef0dc4b5afff/tree4f75c30ece486d2eb0ca061286c793d47f571e11: SUCCESS14:13:52UTC. MISMO checkpoint13576692464/run 42377143830/sourcee5,11008780B/SHA93b3942f8aabbc44491bae7a68e69fedf6c0f7e903c3e2ccd4a983e6339b20f0;47archivos/manifest5e81a7aa27d82aacc0bcac5b1392c14a36d3bdef6fbcea0bf78e5c2836e9299b verificados sin montar worker ni ejecutar SDK/QA/alarm/I0. M original window/expiry2026-11-07T13:59:50.000Z EXACTC0, OAuthtrue/restoflagsfalse, origen/namespace original; optionsHashbd1608ef915f46e9125301d7ff4b329ee608db777ea7ae3e9a819e61890cc93e,bindingsHashb3fb9ed039924267081ed78b2597208816b50a0491edc612a314650a03ab45dc. Binding AFW_FINITE_TRIAL_CONTROL→qa-first-connection/classInitial confirmó dependencia; no se eliminó/simuló ni montó QA para un control pequeño. Recibo13577666814/5371B/SHAcbc4b8f1d2cc84fb5277bff0d4130bc30a883de66eb3d79a42c643b345650110 y readback3archivosPASS.
- Foco PURO del oracle42381392620/128429563078, verifier 53b4ead2966d4366b6417a9a54f46577ddc0fcfc/tree38efb63ef2ed3ce19c2958d1f7b17d9cfc2c6f84: SUCCESS14:24:17UTC; syntax/lintPASS,24escenarios/48asserts, readback5archivos. No son casos del51 ni observación nueva de M. Anclado a perfil original/manifest y blobs d979f395(delegated-oauth-worker),39b91fe6(delegated-project-mcp),e059e54c(delegated-project-read). SDK1.2.1 fuente1fafae23/src/oauth-resource-server.ts blob05b3db1afc456b3af51831f2492e1d06fd03eaf2 respalda los challenges401/403; no SDK ejecutado. Acepta404 sólo por ventana original vencida+perfil/script/route/método/cuerpo cerrado; rechaza200 posterior que contradiga esa rama. Modela por separado denegación semánticaMCP403 y challengeSDK dentro de ventana aún abierta. Rechaza éxito con datos,500/503,timeout,protocolo,initialize200 solo,perfil/script/origen/ruta/método/flags desconocidos o drift. No reconstruye HTTP anterior: UNKNOWN. Recibo13577593532/8684B/SHAa20f951a867573347d8a6380c5b6ea3c6e030fdfb16f4a95f2c83ac03447cb4c. Permisoactions:read sólo para fixedcheckpoint original y jobefímero; Full51 vuelvecontents:read.

Dependencias fijadas no se actualizaron. Se conservaron warnings heredados de paquetes/actions Node/CIMD; ningún warning prueba efecto live. No hubo tests/build/deps/clon local: solo lectura de instrucciones y orquestación de GitHub; builds/tests en runners efímeros autorizados.

## Calificación final congelada

[Run 42381567231](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231) attempt1, checkoutd6e9ffa81088ce92b6e071cc6f99d77e4738e7ce. SUCCESS; terminal 2026-11-07T15:00:02Z; 51 PASS, 0 FAIL/cancel/skip/todo. Los doce jobs sumaron 98.22 minutos observados de runner (no estimación de facturación); máximo 13.95 minutos por job.

Componentes 14 + contratos heredados 10 + issuer 9 + initial 2 + nativeSQL 5 = 40 antesI0 en prepare_g0. Son regresiones dirigidas requeridas por el brief, no reinicio de Task1. Nativos: g0..g4 dos cada uno y g5 uno = 11. Total 51, sin nested; fail/cancel/skip/todo=0 en TODOS los grupos de esta revisión.

Comandos exactos y nombres congelados constan en [qualifier ejecutado](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce/.github/workflows/afw-owner-restoration-qualification.yml). node --check y ESLint sobre paths afectados; node --test --test-reporter=tap con filtros exactos de issuer9/initial2; AFW_R2_GROUP=components para SQL5; prepare-group/verify-group y consumidores nativos con --test-concurrency=1. No fullsuite incidental ni Task1/RED repetidos.

Uploads7d: checkpoint y resultado se descargan por el ID exacto del mismo run, merge-multiple:true, hasta3intentos2s/5s. Readback valida bytes/hashes y paths/counts/Source/group desde la descarga, nunca desde el original local. Fallos intermedios permanecen visibles; un artefacto recuperado no repara automáticamente un test fallido.

## Límites y revisión

- g2 modela páginas y nombres de token SYN sobre el facet KV; no acredita un inventario de200tokens reales. Ejecuta100deletes,2listas límite100 y rechazo de prefix ajeno antes de I/O adicional. Inspección del algoritmo muestra cap200/peak2 y máximo2páginas; esta frontera ejecutada NO acredita por separado delete200/tercera página ni peak2 medido. Carryover Task1RM2 sigue explícito.
- Las métricas de HTTP/SQL/DO/KV/Root/child son las del fixture nativo en runner con proveedor/custodia SYN. No se extrapolan a cuota/latencia real, a D11, operación comercial o PCoff. El overshoot histórico de un child se conserva como tiempo observado, sin redondearlo para afirmar un límite físico estricto.
- g4 retiene la cadena de ACK del SDK DESPUÉS del settlement del delete KV nativo. Prueba retención de esa promesa y exclusión/reinicio, no latencia física del backend KV. El timeout observado5001ms del intento818bc se conserva sin redondearlo a≤5000.
- SDK-only es un modelo negativo explícito, no ruta de intercambio admitida por M. El control de acceso posterior no localiza automáticamente la capa causal. Namespace vacío/drain remoto siguenfalse.
- CurrentCustody/APIbucket, backups remotos y ensayo owner/live son pendientes separados. Sin runtime, grants reales, OAuth/OTP/credenciales, main, cron, Max, mail, publicación o nueva automatización.
- Selfreview de BASE..checkout: comprobó observer nuevo, orden fence→reducción→restore→SDK→receipt, retención antes de races, unknown sin replay, exact selector, límites y guardas existentes. La revisión independiente pertenece a Root después de STOP; no se creó helper/revisor.
- Protected tree: BASE→checkout d6e9 modificó 13 paths autorizados y preservó 3166 hojas restantes byte/mode/type; 60 commits lineales. La corrección e5→d6e9 preservó 3175 hojas fuera de sus cuatro paths autorizados y los seis blobs productivos. El retiro final cambió únicamente el qualifier; el reporte agrega sólo su path autorizado. Main sigue 0c9c475b3ebaa970fc11d628b40e50a90cceb727. Cada Contents commit propio tiene un parent y un path verificado; contenido/blob/ref releídos independientemente. Retirar qualifier solo después de terminal y preservar su permalink ejecutado.

Código final tras retiro del qualifier: aef3aca90444f92aad1a7f85d26355ba353ca69b, tree ff34ca30b7df271eee51926d7d74ae37d2345625; los 12 paths de código/fixtures/test conservan exactamente los blobs del checkout calificado. Este reporte se agrega en el commit siguiente, con readback independiente de contenido/blob/ref/parent/path/tree. STOP SOURCE WRITES tras ese readback; Root recibe HEAD/tree/blob del reporte por separado. Revisión fresca pendiente, sin promoción ni cambio de los flags false.

## Paths y blobs del checkout calificado

| Path | Blob Git |
|---|---|
| .github/workflows/afw-owner-restoration-qualification.yml | 549a6d1b7cc25877f49e4cffadd0c76359b6a6c6 |
| lib/mcp-qa-finite-initial-cleanup.mjs | 0a04ae3a4d74c2c7939b1654683054b1d5d751d4 |
| lib/mcp-qa-finite-owner-cleanup-journal.mjs | 127e5906891b20d2f08c74a412383b8b7e3ff1e2 |
| lib/mcp-qa-finite-owner-cleanup-records.mjs | 6c751081e22ba6446664014090f8015a65e22407 |
| lib/mcp-qa-finite-owner-cleanup.mjs | 7cb54895677ee67852f7c42013238bfc1e366d93 |
| lib/mcp-qa-finite-preparation-issuer-store.mjs | b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb |
| lib/mcp-qa-finite-stage-work.mjs | 068d35c2555c7dc711c487f6021ec572bd3af067 |
| test/fixtures/finite-first-connection-publication.mjs | 047bd6afc34858fe5ce972120101a8d91c092c1e |
| test/fixtures/finite-initial-entry-world.mjs | 8477a05e955d854e001d2315a8b2c4c6c6dbbbe2 |
| test/fixtures/finite-owner-cleanup-persistence.mjs | 8ef9d30b04f766354b05893f49e6e93961f4e4d1 |
| test/fixtures/finite-owner-cleanup.mjs | bcfbecea377e953bfe6545ce1e1fa5be7f1c0129 |
| test/mcp-qa-finite-owner-cleanup-native.test.mjs | c3f06092ff35438b9a7d9872bd1a913c6cc6b1a1 |
| test/mcp-qa-finite-owner-cleanup.test.mjs | 78fea3dfb07425c3000f336d842accf39e052cba |

El qualifier es temporal y se retira después de la verificación terminal; el permalink del checkout ejecutado conserva su contenido.

### Jobs del run final (attempt1)

| Job | ID | Inicio UTC | Fin UTC | Resultado | Casos |
|---|---|---|---|---|---:|
| prepare_g0 | [128430089997](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997) | 2026-11-07T14:25:59Z | 2026-11-07T14:39:56Z | success | 40 |
| prepare_g2 | [128430090209](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430090209) | 2026-11-07T14:26:00Z | 2026-11-07T14:39:31Z | success | 0 |
| prepare_g1 | [128430090327](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430090327) | 2026-11-07T14:25:59Z | 2026-11-07T14:39:33Z | success | 0 |
| consume_g2 | [128433264005](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433264005) | 2026-11-07T14:39:33Z | 2026-11-07T14:41:29Z | success | 2 |
| consume_g1 | [128433273551](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433273551) | 2026-11-07T14:39:35Z | 2026-11-07T14:42:25Z | success | 2 |
| consume_g0 | [128433360355](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433360355) | 2026-11-07T14:39:58Z | 2026-11-07T14:41:52Z | success | 2 |
| prepare_g5 | [128433725018](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433725018) | 2026-11-07T14:41:32Z | 2026-11-07T14:55:08Z | success | 0 |
| prepare_g3 | [128433810087](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433810087) | 2026-11-07T14:41:53Z | 2026-11-07T14:55:24Z | success | 0 |
| prepare_g4 | [128433937316](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433937316) | 2026-11-07T14:42:27Z | 2026-11-07T14:55:57Z | success | 0 |
| consume_g5 | [128436904101](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128436904101) | 2026-11-07T14:55:10Z | 2026-11-07T14:57:06Z | success | 1 |
| consume_g3 | [128436965563](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128436965563) | 2026-11-07T14:55:26Z | 2026-11-07T14:59:23Z | success | 2 |
| consume_g4 | [128437091878](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128437091878) | 2026-11-07T14:56:00Z | 2026-11-07T15:00:01Z | success | 2 |

Cada job cabe en 15 minutos. Todos los casos terminan con fail/cancel/skip/todo=0; los pasos condicionales de reintento se omiten cuando la primera descarga pasa. Los prepare posteriores no duplican los40componentes. El conteo de casos pertenece exclusivamente a este checkout/run.

### Alarmas y resultados nativos del mismo run

Todos los tiempos son milisegundos Unix del reloj nativo observado. Cada replica conserva el C0/C1 de su linaje; la recuperación no renueva fechas.

| Caso | I0 / C0 / C1 | Recuperado antes C0 (ms) | Alarm entrada / fin | State / deliveries | Restore / receipt | Children / máx ms | SQL llamadas / ms | KV list / delete | Provider SYN requests |
|---|---|---:|---|---|---|---|---|---|---:|
| principal | 1794061605000 / 1794062505000 / 1794062685000 | 80132 | 1794062505001 / 1794062507762 | complete / 1 | 1 / d787e5b79eb637e90677ff8150e9a631260cb85265a137064227da58a0beae55 | 793 / 108 | 55 / 73 | 1 / 1 | 132 |
| grant-before-link | 1794061583000 / 1794062483000 / 1794062663000 | 76738 | 1794062483000 / 1794062485765 | complete / 1 | 1 / 700f9d018a5cc82828f1f58c4b10671cd5ef66163f44c0aec04f3d6a2e8a6bd4 | 784 / 103 | 50 / 62 | 0 / 0 | 132 |
| notice-without-link | 1794061639000 / 1794062539000 / 1794062719000 | 132737 | 1794062539000 / 1794062541748 | complete / 1 | 1 / 19c785ae07116558065e58541f99a945eb9e082448cb85f596afb33d049135f3 | 793 / 103 | 55 / 72 | 1 / 1 | 132 |
| foreign-pointer | 1794061581000 / 1794062481000 / 1794062661000 | 80182 | 1794062481000 / 1794062481536 | processing / 1 | 0 / ninguno | 86 / 83 | 1 / 2 | 0 / 0 | 43 |
| sdk-paging-scope | 1794061581000 / 1794062481000 / 1794062661000 | 80182 | 1794062481001 / 1794062483045 | processing / 1 | 1 / ninguno | 593 / 209 | 45 / 55 | 2 / 100 | 118 |
| late-isolate-business-closure | 1794062517000 / 1794063417000 / 1794063597000 | 76077 | 1794063417000 / 1794063419695 | complete / 1 | 1 / 9268f79860d9da79450a0a855467ca3b2294ab7e73327ffc8b8f3d9a4fb40e29 | 793 / 100 | 55 / 63 | 1 / 1 | 132 |
| unknown-restore-ack | 1794062537000 / 1794063437000 / 1794063617000 | 88331 | 1794063557000 / 1794063557387 | admin_pending / 3 | 1 / ninguno | 546 / 87 | 37 / 46 | 0 / 0 | 154 |
| same-fence-identity | 1794062537000 / 1794063437000 / 1794063617000 | 88332 | 1794063557000 / 1794063558204 | admin_pending / 3 | 0 / ninguno | 1180 / 209 | 66 / 86 | 0 / 0 | 192 |
| held-sdk-delete | 1794062569000 / 1794063469000 / 1794063649000 | 73834 | 1794063469001 / 1794063476258 | processing / 1 | 1 / ninguno | 593 / 5000 | 45 / 56 | 1 / 1 | 118 |
| restart-own-uncertainty | 1794062569000 / 1794063469000 / 1794063649000 | restart después de C0 | 1794063589000 / 1794063590732 | admin_pending / 3 | 1 / ninguno | 1190 / 99 | 72 / 88 | 0 / 0 | no separado |

### Puntos de recuperación y KV semántico

| Caso | Manifest SHA256 | DB nativa al recuperar | Ready | Client key hash / value hash | Ambos aliases |
|---|---|---:|---:|---|---|
| principal | d1c17daaa0e603c0c26d7f0c5bd52f07e9951f43a94a1777b225d8c3bb40b28a | 1794062424708 | 1794062424868 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / ceb0b9fc32a6ff815afe6886e48ee4606c784ad1b7d9faaff24fc8fffe5270e0 | true |
| grant-before-link | 17322390388c7b6351ba9b7eae97b623aa86df162bba9a1727e66a411d35030e | 1794062405966 | 1794062406262 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / fedef6ef5a02b8d386bf390eac8babf258ebecff1238bafe3bd3066aecc927db | true |
| notice-without-link | d07afc06d2fda4689947be95b00589ff68daea5c5c6070fa4deebda998b5dfcd | 1794062405967 | 1794062406263 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 0b8f044efbc0ba5d13ef9e52e9514ac52abb2c7a1a0fe2d63b7fc43fbe4ef8b7 | true |
| foreign-pointer | 0f6c383ea66a998083222bfb095e1a8db74b6fb54d64c27ea2b48ce4c3937dfe | 1794062400563 | 1794062400818 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 578875e83b7e1ad08bc4884983ffeaecd480453dc65ae1f7ff39b512398eedcb | true |
| sdk-paging-scope | 0f6c383ea66a998083222bfb095e1a8db74b6fb54d64c27ea2b48ce4c3937dfe | 1794062400563 | 1794062400818 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 578875e83b7e1ad08bc4884983ffeaecd480453dc65ae1f7ff39b512398eedcb | true |
| late-isolate-business-closure | e35b0c7a3ddb5ff0242201a6e310676a88b93c90c8e6b7ac5a5927ebb7df01ef | 1794063340752 | 1794063340923 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / eb34304c70741f4634664fe78bb1bd02996ba72fd7ab33c5660557881b3a9fe1 | true |
| unknown-restore-ack | 2d4eb7ac06a3003df09ecbe14616a2fcaf39fb06743032d29ab433822f11aafa | 1794063348421 | 1794063348669 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 96a072a98f50ab5b375d6e5c0f7d78ad650476af50dc08fd608a936f16e0bef5 | true |
| same-fence-identity | 2d4eb7ac06a3003df09ecbe14616a2fcaf39fb06743032d29ab433822f11aafa | 1794063348422 | 1794063348668 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 96a072a98f50ab5b375d6e5c0f7d78ad650476af50dc08fd608a936f16e0bef5 | true |
| held-sdk-delete | 7267f7a0558d8a86742a682aeab4f3486331067405abdaf46f1ee86dd6e29840 | 1794063395007 | 1794063395166 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 0ad64541b1c3e1697821c61fb1580b95f75044ed567b5591514da1d70b829abe | true |

### g0: Reference histórica y expiry real

Artefacto 13577919516 del mismo run 42381567231, ZIP 10734 bytes/SHA256 cde09f840ddccfe7c11b91f9c16d341adc69a7a3657df06964084a843fae2ba9; lectura acotada en memoria de directorio central, manifest y sdk-expiry-same-occurrence.json (1529 bytes/SHA256 601e09d1b12e8909dd488397a7f45606bde73bf8b4bef2edba9e9156aec2c36e). Manifest Source/group g0 y hash verificados; expansión declarada 138494 bytes, sin abrir DB/scripts ni emitir tokens; buffers liberados.

Reference.expiresAt sigue null. Reference hash ffed7a14146ff4faae03eb88a90e66649c26384aa75ce8f4a31fadfc3b48c3fa; selector hash a46eec8fc84ec8a431bff3adbfe77f4ed099cceb084194f9aad7aa2f305df97c. Hecho nativo posterior al canje: observado 1794061665910ms, expiresAt/tokenExpiresAt 1794061965s, advertisedExpiresIn 300s, D1ExpiresAt/C0=1794062505000ms. Expiry SDK real 540s antes de C0, sin mutar Reference ni configurar otro TTL. La misma ocurrencia terminó complete/restore1 mediante el alarm original, entrada 1794062505001 (C0+1ms), receipt d787e5b79eb637e90677ff8150e9a631260cb85265a137064227da58a0beae55.

### g3/g4: incertidumbre conservada y restart original

g3 recuperó sus réplicas 88331/88332ms antes de C0. Unknown restore ACK: tres deliveries, restore una vez y puntero baseline real, pero sin ACK/receipt; termina admin_pending y alarm=null. Same-fence: SQLwrite1 y reconciles2 con requestId original, sin replay ni ACK inventado; grant queda sin revocar, restore0, receipt ausente, admin_pending/alarm=null tras tres deliveries. La contención y el agotamiento de slots no se declaran cierre completo.

El log del segundo caso g3 se cortó a65536 caracteres. Se recuperó el MISMO artifact13578947400 del run42381567231/Source d6e9: ZIP16202B/SHA256a705c9c2731eca7b07652fb7e4b28dfcc44161408ce13ebab6c9074790908676, expansión declarada293943B. Lectura acotada en memoria de directorio central, manifest y sólo los dos JSON: unknown-restore-ack.json60657B/SHA256d2013f5d57e99cacb5540269403efc3fbacd1b651fd9d80ff52fb1bd86e3bf23; same-fence-identity.json123846B/SHA2569b81d8b8ddbb3882e57ae3208bb197f8d2aa363891f388dea01aece4c8df76dc. Source/group/bytes/hashes exactos; sin DB/scripts/tokens/disco/deps. Buffers liberados. La tabla usa estos hechos completos.

g4: recuperación inicial73834ms antesC0; alarm C0+1ms. Borrado KV nativo retornó y se retuvo el ACK SDK; child observado5000ms, same-ctx scope probe rechazó sustitución mientras la promesa seguía retenida. Release y settlement real permitieron el checkpoint parcial tras dispose; restart conservó I0/C0/C1 y delivery1, consumió sólo los slots originales siguientes. Resultado final delivery3, admin_pending/alarm=null, restore1, KVdeletes0 en isolate reiniciado, Send existente sin Observed/receipt: no replay ni ACK fabricado.

El JSON restart también supera el log; sus métricas de tabla proceden del verificador cloud después de descargar el outcome, no de inferencias ni de abrir el checkpoint aquí. Readback estricto de outcome3archivos + g4-partial43files; manifest parcial b8a07490c4e57af67dcc524e76c54021a52e838bec6a61d73b89423209191874, parent 7267f7a0558d8a86742a682aeab4f3486331067405abdaf46f1ee86dd6e29840; fuenteArtefacto=fuenteVerificador=d6e9. Artifact13578359220/10871924B/SHA256f8dfb2631b0c8600d086e25d248fc32c9ab714b51f10dcf356ff1ac2eb64bb9c. Envelope liga manifest parcial y verifyCheckpoint comprueba recursivamente scripts/DB/metafiles; no extras. No descarga local de este archivo grande. El readback no abrió I0 ni reprodujo efectos.

En la tabla, alarm entrada/fin corresponde a la última entrega observada; para g3 y el restart g4 es C0+120000, no un C0 nuevo. La fila restart usa métricas verificadas en cloud; recoveryReady/aliases no se inventan donde ese resumen no los expone. Los JSON/checkpoints completos permanecen en los artefactos. Los tiempos históricos5001ms se preservan arriba; este g4 observó5000ms y no prueba un límite físico universal.

### g5: trabajo real tardío y denegación observada en M

Job 128436904101, mismo run/Source. El SDK-only negativo alcanzó el hold a 1794063342014; Root 1794063342007→1794063372007 (30000ms), child deadline 1794063347007, denegación lógica 1794063347007 (5000ms), headers recibidos 1794063347009 (5002ms físicos). Retained=true/settled=false antes del release; sustitución recibió409. Release 1794063420152; nativeAttempt 1794063420271 (C0+3271ms), nativeSettled 1794063420274, SDK y KV devolvieron realmente; settled=true/retained=false. Hold observado 78260ms. El cuerpo de denegación no entregó token; hash 970034315e2f7cae2b20fa6dd5d6ae5617542a9505f3af516c8db54b242b2aa2. No se afirma drenaje global.

Token/grant genuinos vencían 1794063416s, 1s antes de C0=1794063417000; expiry observada 1794063140340, advertisedExpiresIn=276, D1ExpiresAt=1794063417000. Al emitir había 74000ms de vida real, superior a65s. La escritura retenida había capturado expirationTtl=74 y expiresAt=1794063416; se intentó y retornó después de ese vencimiento, sin convertir ese TTL capturado en una renovación de Source, D1 o admisión M. Selector hash 52376cdfce353dee771c13c69c6239376403a518363833a94cd14f6fc2bdf051; Reference hash 4879d5b90511f7d5bb46430c0fa8122ae6beb96e2a5d98cc5855a18e4025368f; key/value hash de la escritura 1cec65808957d5fc2f7d18a4096fe4cebbfa5d56c29fa795a8df12c2b56ae505 / 5925676e64d9a2968a0c8c58aa21809a1d8714f420f21c633a939d59bac7550b. Callback AFW omitido sólo en esta variante, MAdmission=false y refresh0.

Control positivo: canary-first-connection /mcp, namespace first-connection-oauth, script c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32; at=1794063341173<C0. Protocolo POST200/POST202/GET405/POST200 y read_project_summary con datos correctos; projectHash=660752609f7270159b02ef1d4079c2af65d50b027d78851e69ce73091339bd28. Mismo wrapper fijo y mismo token. Options hash 79b795ba8384e1319d13ff996530b7cc9ff93b808d2a5f78ebc0a65dd0a2b378, bindings hash a2c1f4e297ebc379063021cb286c0ccf06249a34dbab70a889ee2c839a1200b1; ambos perfiles iguales antes/después, profileCurrent=true. Window original 2026-11-07T14:56:57.000Z=C0; OAuth=true, refresh=false y otros siete flags=false.

Diagnóstico posterior guardado ANTES de assertions: operación deseada read_project_summary, petición real POST JSON-RPC **initialize** a 1794063420301 (C0+3301ms), respuesta 1794063420328, HTTP404, text/html, 1971bytes/hasha10a42fad2fd9ad2fc22579108fa36453158227aeaa8953efe5adc50403e5552, closedWindowBody=true, sin datos/credenciales. **toolCallAttempted=false**: el M rechazó el protocolo antes de poder llamar la herramienta. No se afirma ejecución posterior de read_project_summary. Clasificación service_window_closed, rama delegated-oauth-worker.mjs:143-158 -> connectionWindowNotice:29-30, sustentada por perfil/window/script/origen/método/cuerpo exactos; **D1DenialProved=false**. No es un HTTP404 aceptado a ciegas ni una reconstrucción del status UNKNOWN del run e5 anterior.

El alarm nativo del mismo linaje entró C0 exacto, completó/restore1 y receipt9268f79860d9da79450a0a855467ca3b2294ab7e73327ffc8b8f3d9a4fb40e29. El resultado completo está en late-kv-actual-outcome.json y su log primario sin truncamiento; readback cloud valida el JSON junto con el resto del outcome. globalNativeDrainVerified=false, sdkNamespaceEmptyVerified=false, operationalReadiness=false.

Outcome artifact13578532171: 18130bytes ZIP, SHA2568f391441de5967fb172dfb9da13d1536376f61f6e0eee410d70e83fa560594a6. Diagnóstico leído del log completo; verificación de paths/bytes/hashes desde la descarga en el job, sin descarga local adicional.

### Scripts y grafos congelados

M ordinario en los siete linajes: 1988061 bytes / SHA256 c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32, 340 inputs. QA: 2493518 bytes; el preflight del mismo helper registró 331 inputs. Cada hash QA incorpora su manifiesto SYN de linaje, por eso se preserva individualmente. Los metafiles completos y scripts forman parte de los checkpoints verificados, no se reemplazan con una lista de hashes. SDK-only g5: 320211 bytes / SHA256 92f6554db082c30e83c6f7ae4700544ee7438f0da349b0dc2d70594d97efe66f, 187 inputs, variante negativa declarada.

| Grupo / linaje | QA SHA256 | M + QA grafos |
|---|---|---:|
| g0 / r2-produced-principal | 90370896af59cce1b8f125d7e4a62afebecedb3fc25259a4c3e7ec1ac814c072 | 2 |
| g1 / r2-produced-grant-before-link | 89da45b8f497094a6c73593e37b5687629718fe40a472d81fc9f976fe5b102f3 | 2 |
| g1 / r2-produced-notice-before-link | 69f497fbb4904a54c0d2bbe1b5a330182a3b916bcdcef1bbdb12f63d905ee5b1 | 2 |
| g2 / r2-produced-principal | c094b0b3867d44edf1591a815c167279d8fdd982071fe594e7a60094e3eb597f | 2 |
| g5 / r2-produced-principal | 0a7ca3cc2fc68811896f3dee0a9227372185d433fb9b80d97aa6d18ebe1bf66a | 2 |
| g3 / r2-produced-principal | 384c0c8f089831fc826e1f788d551e0925260f8c7bd73f34ecebe61d386b96bc | 2 |
| g4 / r2-produced-principal | df5a264483230a137eba216455420253e32e048011a9fcb409a09e407cde616d | 2 |

Total 14 grafos M/QA más un grafo SDK-only = 15.

### Métricas del productor SYN

Son contadores del fixture y sus cuerpos locales SYN, no tráfico a Cloudflare productivo ni una estimación de facturación. Root registra ventanas de30000ms; child se contrasta con deadline original, sin renovar.

| Grupo / linaje | HTTP requests / bytes | Máx child elapsed ms | Lookup ms | Complete normal / Reference | Root ventanas / máx request ms / aborts |
|---|---|---:|---:|---|---|
| g0 / r2-produced-principal | 854 / 1053812698 | 3765 | 917 | 1 / 1 | 30000 / 12602 / 0 |
| g1 / r2-produced-grant-before-link | 476 / 587371012 | 2716 | n/a | 0 / 0 | 30000 / 10021 / 0 |
| g1 / r2-produced-notice-before-link | 812 / 1001985844 | 3645 | 884 | 1 / 1 | 30000 / 12279 / 0 |
| g2 / r2-produced-principal | 854 / 1053812698 | 4252 | 1094 | 1 / 1 | 30000 / 12787 / 0 |
| g5 / r2-produced-principal | 840 / 1036537080 | 3940 | 937 | 1 / 1 | 30000 / 13078 / 0 |
| g3 / r2-produced-principal | 854 / 1053812698 | 3726 | 925 | 1 / 1 | 30000 / 12430 / 0 |
| g4 / r2-produced-principal | 854 / 1053812698 | 3383 | 844 | 1 / 1 | 30000 / 11336 / 0 |


Las filas nativas anteriores contabilizan child/SQL/KV y el número de requests al registry SYN: se conservan los arrays completos en cada JSON. Los logs de productor registran HTTP agregado, cuerpos, Root y child. No se inventa una desagregación CF/GitHub/DO en bytes o cuotas donde el fixture solo registró el agregado, ni un pico KV de concurrencia a partir de un hash. Estas métricas no prueban límites de un proveedor productivo.


La corrección de g4 mantiene el directorio g4-partial intencional: el envelope nuevo liga su manifest por SHA256 y verifyCheckpoint verifica recursivamente scripts, metafiles y archivos persistentes, sin extras. La recuperación del artefacto histórico818bc se validó con expectedEvidenceSource explícito y nunca sustituyó GITHUB_SHA.

El diagnóstico del launcher se fundamentó en Miniflare5.20260831.0-alpha src/plugins/core/proxy/fetch-sync.ts (blobca4c161fd5a58d92cc75e60f7c6736cd1391aa39), Node22.23.4 worker_threads.md (blob4347585cb6ec054fb20d4e953d6f823436138510) y lib/internal/main/worker_thread.js (blobf159022ee5bddd619389d22f5f19bfe7bfdb04cd). El probe ejecutó el mismo Worker eval CommonJS con execArgv heredado frente CLI.mjs normal; no reprodujo Atomics.wait ni atribuyó un error Worker observado al run originalmente bloqueado. Semántica del helper M y los seis blobs productivos permanecieron iguales.

### Artefactos del run final

Solicitados siete días. Checkpoints y outcomes descargados por ID y verificados desde el readback; los diagnósticos prepare se preservaron con digest de upload, sin afirmar descarga independiente de esos diagnósticos. Scripts/metafiles y archivos persistentes se validaron dentro de cada checkpoint descargado.

| Artifact ID | Nombre | Bytes ZIP | SHA256 | Expira UTC |
|---|---|---:|---|---|
| 13578947400 | r2-green-g3-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 16202 | sha256:a705c9c2731eca7b07652fb7e4b28dfcc44161408ce13ebab6c9074790908676 | 2026-11-14T14:59:18Z |
| 13578852207 | r2-green-g3-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1240276 | sha256:2b0ae92643bcb4b387187d73212b1afb422b4944c9d9c2d520ad59f3ca2e5f25 | 2026-11-14T14:55:21Z |
| 13578577884 | r2-green-g3-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10851210 | sha256:46a8e6122375de5e7489f38170e76f0582c45178d02b3e42b7056b460fde8a32 | 2026-11-14T14:55:17Z |
| 13578550692 | r2-green-g2-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10851175 | sha256:d08b0a2d91abe40f4459c4287f487163fe6af830e3b915c7c6c5161b84a85bcf | 2026-11-14T14:39:21Z |
| 13578532171 | r2-green-g5-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 18130 | sha256:8f391441de5967fb172dfb9da13d1536376f61f6e0eee410d70e83fa560594a6 | 2026-11-14T14:57:00Z |
| 13578526063 | r2-green-g2-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10448 | sha256:72fcf6e0786cb34d8e6aa273270586fd1b622081222857a9a1f565376e5dfb57 | 2026-11-14T14:41:23Z |
| 13578475924 | r2-green-g2-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1240378 | sha256:21724fcbef34ecc7d4671373a2b61d4abc83ca387cbbed129f8637ec818c2d48 | 2026-11-14T14:39:26Z |
| 13578368708 | r2-green-g4-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10851333 | sha256:588433172f3601c49dfc9b710312584a50897c3655239557ea31d1364d9854f1 | 2026-11-14T14:55:49Z |
| 13578359220 | r2-green-g4-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10871924 | sha256:f8dfb2631b0c8600d086e25d248fc32c9ab714b51f10dcf356ff1ac2eb64bb9c | 2026-11-14T14:59:52Z |
| 13578304042 | r2-green-g4-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1240384 | sha256:7379f81193aa15d74c8a51c501ec367314fbf41bdfd5e803778c8263153b097f | 2026-11-14T14:55:54Z |
| 13578257785 | r2-green-g5-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1322441 | sha256:4a828d39a5808259fd9af900152c041447146214746305a876b8b062fc9cb1b2 | 2026-11-14T14:55:03Z |
| 13578236238 | r2-green-g1-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 2478320 | sha256:cbad4844a5220c6235ffee1063bbc78742c73d1bc347ec653e6f2a8f23e5c6a2 | 2026-11-14T14:39:29Z |
| 13578113303 | r2-green-g5-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 11007749 | sha256:f9607b4c262a98a9711298de6897ea17408baaebecf56482c051e96420d7edcd | 2026-11-14T14:54:57Z |
| 13578076858 | r2-green-g1-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 21679293 | sha256:f4240a981213a010c8b83777d0d2899dba2cae44b61daebd3a9e5cc364ebd0d1 | 2026-11-14T14:39:23Z |
| 13578063351 | r2-green-g1-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 17958 | sha256:88b5cab5c6a368521bd58eaeaa1064c7d8bc7afb762b8a12464bcb1efb6215c6 | 2026-11-14T14:42:22Z |
| 13577919516 | r2-green-g0-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10734 | sha256:cde09f840ddccfe7c11b91f9c16d341adc69a7a3657df06964084a843fae2ba9 | 2026-11-14T14:41:48Z |
| 13577658656 | r2-green-g0-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1244188 | sha256:f8b98029a3c68aa2d5a405807da3f8a2a5c396ec2ea57ba7628aeedf551ae9b8 | 2026-11-14T14:39:51Z |
| 13577144902 | r2-green-g0-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10852120 | sha256:2be57ce4aedc03565a6bd47239bfbe372a1a363e5beb3e431f4a09a086f66a69 | 2026-11-14T14:39:45Z |


## Inventario histórico de artefactos

Retención solicitada: siete días. Metadatos consultados el7nov2026; estos archivos preservan resultados y fallos, no recalifican un run fallido. Logs primarios: jobs enlazados en la historia anterior.

| Run | Artifact ID | Nombre | Bytes ZIP | Digest SHA256 | Expira UTC |
|---|---|---|---:|---|---|
| 42289097871 | 13540021372 | r2-red-g0-prepare-evidence-474e58189802bd62aa2ddb2febee196b67c435e0 | 1220081 | sha256:1531c04b7d75eea8ae8f731f8518c6ffc3a8da82627a279fe1d8b4d25cbec2e5 | 2026-11-13T20:45:14Z |
| 42289097871 | 13539906971 | r2-red-g0-checkpoint-474e58189802bd62aa2ddb2febee196b67c435e0 | 10789692 | sha256:1d98cb0c159e9a1fa09e3db9ee64a7f22130a2ed024b67034145a5e734062f32 | 2026-11-13T20:45:09Z |
| 42289097871 | 13539872218 | r2-red-g0-consume-evidence-474e58189802bd62aa2ddb2febee196b67c435e0 | 2691 | sha256:7df2926edd9ce80063b6ced082ae39473be5f51488f58a4ee94404c2609d28da | 2026-11-13T20:47:09Z |
| 42293728842 | 13540463088 | r2-component-preflight-1415d980d88cf2b257eaa69b25a07ba1b666d539 | 1643 | sha256:1a4d063b62968e441581b88c77bfcfaba6f4679b5cf9311cff712237b8e1446b | 2026-11-13T21:05:26Z |
| 42295005231 | 13540624361 | r2-component-preflight-798353d7a02f7abdb9257e0a756f9f0a85cb62bc | 3716 | sha256:ccfb44d797344c2d1d1afbabb34dcaff4895939e28d91971c99064db6a27e7f3 | 2026-11-13T21:14:36Z |
| 42295503038 | 13543225137 | r2-green-g1-consume-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 6194 | sha256:c7c94848c3dc60607c6f8a0dfe0afd06367a9e98a12d09150c14826ad1c21afc | 2026-11-13T21:33:34Z |
| 42295503038 | 13542781809 | r2-green-g2-consume-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 5900 | sha256:e569f95e3fb49a2ea6be5afe4b2d0f62486e83509555a482368a17cc87e3e7dd | 2026-11-13T21:32:59Z |
| 42295503038 | 13542486949 | r2-green-g2-prepare-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 1240345 | sha256:6d434e91f4686f096f20ce4540f8bb91a3a79ab3cff5c06f5ce994f8866296a4 | 2026-11-13T21:31:00Z |
| 42295503038 | 13542432437 | r2-green-g0-consume-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 4473 | sha256:c8eada3917967cbce7f8049993a84d57f9887354fe9e2a595ef857f46e90c964 | 2026-11-13T21:33:23Z |
| 42295503038 | 13542357703 | r2-green-g1-checkpoint-84abb279530cb40d45a80f936d95f1cd518d1af6 | 21678627 | sha256:33cb3466f7bf861982d29cb9b153c0583c97bad07accf3ba5a9047eecd1de681 | 2026-11-13T21:30:57Z |
| 42295503038 | 13542223270 | r2-green-g1-prepare-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 2478054 | sha256:e8aee7fc2228a25994b35223ddc1b5617c4c5c663bf5c066224ea992270bac31 | 2026-11-13T21:31:02Z |
| 42295503038 | 13541848890 | r2-green-g0-prepare-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 1243952 | sha256:9d0cb71c0a6dfce65f00e43f1d1c393727499f24146dc29cf54edf2e3f9e52ab | 2026-11-13T21:31:24Z |
| 42295503038 | 13541838819 | r2-green-g0-checkpoint-84abb279530cb40d45a80f936d95f1cd518d1af6 | 10851508 | sha256:94807ecde2d60e7d3fd371327865676799f89e369a65a4e40aa47e82edf6a9d3 | 2026-11-13T21:31:20Z |
| 42295503038 | 13541478558 | r2-green-g2-checkpoint-84abb279530cb40d45a80f936d95f1cd518d1af6 | 10850499 | sha256:6a14c723941c517a28cac6a876d9e919748eec945a232dffa6995799d816895b | 2026-11-13T21:30:56Z |
| 42298166866 | 13544566993 | r2-green-g5-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 10850547 | sha256:74cd23a22f2b0337e39b875285a554d7554070f2e2a904e0e6d0b15de78ee709 | 2026-11-13T22:05:53Z |
| 42298166866 | 13544542187 | r2-green-g5-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1343 | sha256:dc4b3946a01d585e6d6aec3e7a04cd3afddf02f40b25e02aaf45c4774dfff1e5 | 2026-11-13T22:06:29Z |
| 42298166866 | 13544165976 | r2-green-g0-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 9225 | sha256:ced0cf753a940781d47e3b45ec1b86bab5059e0e56f157d26067a30135817b20 | 2026-11-13T21:52:43Z |
| 42298166866 | 13543987891 | r2-green-g5-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1240486 | sha256:bbbc363bf117510247988554374410d4ae29e36b1fb72231c9689b0978708ae5 | 2026-11-13T22:05:59Z |
| 42298166866 | 13543751443 | r2-green-g1-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 21678210 | sha256:a9c418f47258e1e9a28fba24252ae7342743b7029b8aa249790e4b9bf3a964e7 | 2026-11-13T21:50:15Z |
| 42298166866 | 13543721100 | r2-green-g2-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1240327 | sha256:6268f39d64425a53aed1ec83dede2971d8ef5ca1294e115a6ac26665c2ba1623 | 2026-11-13T21:50:25Z |
| 42298166866 | 13543636518 | r2-green-g1-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 16939 | sha256:ec67636715547d0e8fdaaba050d9995e2ba6107bfc722049271952ed9b0cc8a2 | 2026-11-13T21:53:11Z |
| 42298166866 | 13542994278 | r2-green-g0-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 10851358 | sha256:5f159c9086f8880ab6a8a8b41a0c95f291ccda3367b40dcbeac3b045fa57b7e0 | 2026-11-13T21:50:41Z |
| 42298166866 | 13542944653 | r2-green-g2-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 10670 | sha256:c40cb8975053ac2105c0c9746cb5757faa019ad8067b6fdc1e53d8724d2db31c | 2026-11-13T21:52:21Z |
| 42298166866 | 13542799729 | r2-green-g0-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1244107 | sha256:f61c9ef54643e218e789f3b005e26e9697321918687bbb983dbeaef7387d883a | 2026-11-13T21:50:47Z |
| 42298166866 | 13542754673 | r2-green-g1-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 2478147 | sha256:718a5b2a13308843be50993606a7168369119fab66da77fa6899b0437d4a293c | 2026-11-13T21:50:21Z |
| 42298166866 | 13542574680 | r2-green-g2-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 10850964 | sha256:77e48f217b353ba585fb97592f7edd957b9ced29cfe5e59bf3e5dbf19765093f | 2026-11-13T21:50:19Z |
| 42371498327 | 13575185515 | r2-green-g4-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10872023 | sha256:90edd8e83d2789fce9cca75b53d02102080e6ba0d60c891eac81fc90aff777e8 | 2026-11-14T12:46:41Z |
| 42371498327 | 13575030294 | r2-green-g5-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1474 | sha256:b7f6ce42989e96861a263be0bce1f032ff352bfdd57f197c0f505e6d034d86a6 | 2026-11-14T12:42:37Z |
| 42371498327 | 13575010374 | r2-green-g3-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1240237 | sha256:2a4a8e370f537dd9486a0c1e0117e7cf0d89f3dd149e4de7ce27d51fbfddd823 | 2026-11-14T12:42:20Z |
| 42371498327 | 13574820235 | r2-green-g2-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10852217 | sha256:6996cc1c1bb74dda95c3647658434eafd052d4e50b1a840d7ad43ead7045cb1e | 2026-11-14T12:26:30Z |
| 42371498327 | 13574800323 | r2-green-g2-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1240302 | sha256:cf6fe59cddcc33b8799eaa4dd414d9c582bf48561d19e2df3fcbf1f9575d2771 | 2026-11-14T12:26:33Z |
| 42371498327 | 13574705880 | r2-green-g2-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10581 | sha256:aaa8f067f8d5e9587f7833fadc68a8aacc928554900a6001bcc4233c073de7d5 | 2026-11-14T12:28:32Z |
| 42371498327 | 13574603818 | r2-green-g3-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10852167 | sha256:75433e4f3ac3e860488e9e1db736e4cc9318c437beae66dc1ab542a01075846d | 2026-11-14T12:42:17Z |
| 42371498327 | 13574556857 | r2-green-g0-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1244027 | sha256:a06b03cc07352980fa8dc222abbb3b69e33726fa5ad29f12fb5749231e2b0583 | 2026-11-14T12:26:57Z |
| 42371498327 | 13574542017 | r2-green-g0-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10851265 | sha256:ad4170e09e74a1a5f89f0e192e880cce57d8a34c2c53a6557fe58f65eef2137f | 2026-11-14T12:26:53Z |
| 42371498327 | 13574516220 | r2-green-g1-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 2478093 | sha256:7593c918fe47a519ec2780caaa2e2b89d206fc814491aef1f4207ac57b812a09 | 2026-11-14T12:26:34Z |
| 42371498327 | 13574509078 | r2-green-g4-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10851302 | sha256:0d60e367e7cb894aa2056cf3023dfa758a981c7bf213682905d9f4daf8f89ba4 | 2026-11-14T12:42:39Z |
| 42371498327 | 13574346689 | r2-green-g1-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 17910 | sha256:a9effec8441179bce9e2597c555100e9869ed23920855863c2c3a40080232a3c | 2026-11-14T12:29:05Z |
| 42371498327 | 13574279316 | r2-green-g5-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1322412 | sha256:de2e670fe5d906e4655293636c975db5cbfe8292e813c44f4a966030da6c36cc | 2026-11-14T12:42:07Z |
| 42371498327 | 13574214610 | r2-green-g4-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1240455 | sha256:aafd72de57fbf0479547d9d48b2c9f7cd36721550611e8511fb93db6fe935a30 | 2026-11-14T12:42:43Z |
| 42371498327 | 13574212809 | r2-green-g0-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 9747 | sha256:1b09ecc0ac658007bc6bd2c9bcd662a0954b27b59d28ac464d05e159efa6dc57 | 2026-11-14T12:28:54Z |
| 42371498327 | 13574204528 | r2-green-g5-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 11007786 | sha256:832f4e6946bd2361229a4507a72dec367e7ea97c73bed2e52888965187faee1d | 2026-11-14T12:42:02Z |
| 42371498327 | 13574188466 | r2-green-g3-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 17877 | sha256:d5a5fc74ff05ce9eca3a474c1d282ae211f85cc2e8074044f05e76227492f0c5 | 2026-11-14T12:46:19Z |
| 42371498327 | 13573897698 | r2-green-g1-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 21679063 | sha256:28d748911117571583efaf9a2faf2c24debd9ccc88548fd6896f5542306200dc | 2026-11-14T12:26:29Z |
| 42375072153 | 13575578639 | r2-routing-preservation-preflight-4072983777e0a7a68ee3425b8171f6fb6870fb25 | 83989 | sha256:21f779fd12609d3c369d4988fc7c3eebafa322e1c9e8a63635f90243748efc8d | 2026-11-14T13:17:08Z |
| 42376693686 | 13575584835 | r2-routing-preservation-preflight-f591b7e8590b694cd3b7693f6537c6a92e5ee8e5 | 1322925 | sha256:3477ad8f889a9c9229c10d62bb30a21bccd0d1cf6f1e23b3cb9aa31f54d675f6 | 2026-11-14T13:24:31Z |
| 42377045988 | 13574979585 | r2-historical-preflight-audit-ccfa81d2b1bbe91ac937b548dd669d42d5a81384 | 3809 | sha256:c182d5fdbdf3c08f1dde11b7eb7231a98da9cdfe90ac05bc3badfcbdae1f6c1f | 2026-11-14T13:27:38Z |

| 42371140511 | 13573537287 | r2-directed-sdk-preflight-22e9cfd13e41ecede2acfbe7e8d89593796d0148 | 537833 | sha256:ed8891f991f20843c2e8674b7aa7e59704a026fd78a817db7d8123fe17d3bf70 | 2026-11-14T12:10:07Z |

| 42377143830 | 13577365572 | r2-green-g5-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 9770 | sha256:5ac83677c6b20808f3887a37a25c4556b30454c9ddb22c3377a08dd26fd07b60 | 2026-11-14T13:59:52Z |
| 42377143830 | 13577320509 | r2-green-g4-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10868993 | sha256:89848da669483e9183ea188f6d42f114de3a47897197a9f06e3795e96ec2303c | 2026-11-14T14:02:47Z |
| 42377143830 | 13577250037 | r2-green-g3-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1240317 | sha256:32e28b51f24b09952d7da42a43ad2105b052ecb2fc3a76e1b32e53d2c4b347db | 2026-11-14T13:58:11Z |
| 42377143830 | 13577250008 | r2-green-g5-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1322312 | sha256:cccb46e54820151457d753dd908b2fa30510933195003cf65b1a66e734f7e362 | 2026-11-14T13:57:55Z |
| 42377143830 | 13577195377 | r2-green-g3-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10851077 | sha256:0d243460d2cf609cddedbd519cb59d08d8e5179daca9754e9af180e823319c8c | 2026-11-14T13:58:07Z |
| 42377143830 | 13577035486 | r2-green-g0-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10673 | sha256:047c2c6d8a263cf78a98ec25076f03df2a1a788e30fee8bf6934ab9b2428e1bd | 2026-11-14T13:44:40Z |
| 42377143830 | 13577030545 | r2-green-g1-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 17063 | sha256:5b2ccde8460f57b0c2a5a2298beb9a35977a5aa3a3edb4c1835ffee127414061 | 2026-11-14T13:45:11Z |
| 42377143830 | 13576848958 | r2-green-g3-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 17525 | sha256:7e17c8382f7502cefa0bbd4429f0abf47ca2922534c0e1b93989c3806ee63d63 | 2026-11-14T14:02:09Z |
| 42377143830 | 13576795778 | r2-green-g0-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1244007 | sha256:7d2247733910e2c4da52eed54c810d442fa65d69a40016bc3a943ebef6e4fc91 | 2026-11-14T13:42:42Z |
| 42377143830 | 13576780707 | r2-green-g1-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 21679966 | sha256:95311f062a6cadaa64c514d05fdf14dcd7bb01c98fa3056a9b4c574b36d597c4 | 2026-11-14T13:42:20Z |
| 42377143830 | 13576756390 | r2-green-g2-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10852110 | sha256:f9351cbf8d7e9c858b74ee8eede7380409ca479f32c6b298c6b855e0cd185429 | 2026-11-14T13:42:18Z |
| 42377143830 | 13576692464 | r2-green-g5-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 11008780 | sha256:93b3942f8aabbc44491bae7a68e69fedf6c0f7e903c3e2ccd4a983e6339b20f0 | 2026-11-14T13:57:50Z |
| 42377143830 | 13576679069 | r2-green-g4-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1240469 | sha256:1b118f653231775c2d74358fa857f193ad027f08e8293c6bf3f0e3d579c89a8e | 2026-11-14T13:58:50Z |
| 42377143830 | 13576667125 | r2-green-g2-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 9928 | sha256:195029209e07f0d344dad9d122e842e127b5f6e9fca87efdea49e610121c0ee6 | 2026-11-14T13:44:19Z |
| 42377143830 | 13576494625 | r2-green-g4-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10852020 | sha256:ec75cb7d090c8588ea6a7b5fa37868816a55e30c873681e0ca60fc291e173f55 | 2026-11-14T13:58:45Z |
| 42377143830 | 13576282936 | r2-green-g1-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 2478165 | sha256:abbc69e5e36fd7080bca015b7c7101ce8426780204570c34d212e3cc246f935c | 2026-11-14T13:42:27Z |
| 42377143830 | 13576258009 | r2-green-g2-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1240314 | sha256:1e0f1497250e90af097c662c5636f3019dce38a20576214a11c7ad12c7585b06 | 2026-11-14T13:42:23Z |
| 42377143830 | 13575868870 | r2-green-g0-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10851330 | sha256:e2d246948675004d659223db57a5e6bb265a44df58bbf4b9712d89b0f947c6f2 | 2026-11-14T13:42:37Z |

| 42380606239 | 13577666814 | r2-g5-original-audit-9a189cff22d6f24627d21b631338ef0dc4b5afff | 5371 | sha256:cbc4b8f1d2cc84fb5277bff0d4130bc30a883de66eb3d79a42c643b345650110 | 2026-11-14T14:13:47Z |

| 42381392620 | 13577593532 | r2-g5-denial-oracle-53b4ead2966d4366b6417a9a54f46577ddc0fcfc | 8684 | sha256:a20f951a867573347d8a6380c5b6ea3c6e030fdfb16f4a95f2c83ac03447cb4c | 2026-11-14T14:24:13Z |


La retención de la promesa protege la misma ctx, pero no acredita que un trabajo de un isolate distinto haya sido drenado globalmente. El caso SDK-only conserva explícitamente MAdmission=false. Los artefactos y checkpoints son SYN y caducan a los siete días indicados; conservar sus identificadores no extiende su retención. La revisión independiente de Root sigue pendiente tras este reporte.

Los cuatro hallazgos Minor heredados de Task1 siguen en su [revisión aceptada](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c478cc7e85c093614c7ae705ce2ec76615ed8207/docs/superpowers/reviews/2026-11-06-finite-owner-restoration-task1-review.es.md). Task2 no los elimina por inferencia; el límite RM2 se conserva explícitamente arriba.
