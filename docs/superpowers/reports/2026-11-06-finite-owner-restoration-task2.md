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

## Independent review — fix round 1/5 (7 November 2026)

Scope: Important I1 (current SDK grant qualification) and I2 (fresh operational inventory after SDK). FIX_BASE aa1e9dc0161ffa0b56777a96aa274cff272484cd / tree 258ecbd8428daa9ffecd6e463afc7971628c7e33. Original accepted Task1 and original Task2 causal RED were not rerun. Minor M1/M2/M3 remain deferred. This appendix preserves the original report and all earlier failed diagnostics rather than replacing their conclusions.

### Causal RED

Run 42387214095 / attempt 1, Source 94e00923a25833cd134669e03fb646f3b1255c0b / tree 505d56cbb08a649540d9027832fc1d09d2db4732, terminal FAILURE 2026-11-07T15:52:13Z. Production remained FIX_BASE byte/mode/type identical. Two producers succeeded, both exact checkpoint and outcome readbacks passed. Four cases: matching control PASS; three causal failures. g6 job128450253710: conflicting current object performed one native grant delete instead of zero, then completed; completed reentry with new Workflow waiting returned restored instead of admin_pending. g7 job128450264242: after native restore and native SDK deletion, its ACK was held 127 ms; a modeled own Workflow became waiting during the hold, yet OwnerCleanup receipt and initial complete persisted. There were no missing-import/setup/expired-premise failures. Native alarm entered at original C0 (+1ms in g6, exact in g7); recovery ready86.461s and81.555s beforeC0. No clock/TTL extension, fake admission, authority callback or fabricated receipt was used.

g6 used normal real SDK complete with the original Reference, deliberately no authorization-code exchange. Genuine codeTTL 600 preserved the present current grant through C0 after authorize at C0−300. The conflict replica preserved original absolute native expiration and altered only modeled untrusted correlation content; it was not a new authorized grant. Reentry was an explicit inspection of the same original alarm entry/actor/plan inside C1 after actual settlement; it was not a fourth scheduled delivery or a new business Root.

### Fix composition

Only lib/mcp-qa-finite-owner-cleanup.mjs changed among the six production modules. The original Task1 forward reader body remained byte-identical. No new production API or path was introduced.

I1: the existing one-get bounded native KV facade now reads grant:subject:originalSDKid with type=json before SDK Send or deletion, retaining the actual native promise and original holder/lease guards. A private validator checks pinned SDK 1.2.1 raw layout, original selector, subject, client, resource, scopes, correlation metadata and creation window. The historical Reference expiry is not rewritten; genuine postexchange expiresAt may coexist with its earlier null. True native absence requires the exact original Reference and is committed as absent_under_original_reference, never absence ACK. Only a subsequent actual normal revokeGrant return can yield SDK Observed. Conflicting objects fail before any SDK delete/Send.

I2: a private native reader executes after SDK reduction and before receipt creation/reuse. It reacquires custody, bootstrap Source/pointer evidence, historical source, fixed Workflow definitions/instances with terminal status, own active Container count 0, fixed schedules/tails counts 0, pinned closed operator, restored baseline/pins, recoverable original backup chunks and eligible deployable versions. Every provider read retains fetch/body/cancellation under the original lease with 5s child bounds. Facts include actual body hashes, pins, provider dates and observation timestamps. The subsequent existing owner snapshot reacquires D1, consent, local anchors, M/QA and notice/unknown-operation facts. These facts and the final inventory are committed together into finalFactsHash. Both normal and already-complete callers enter this same finish path; old receipts are never rewritten, and the initial alarm remains the sole restore/state/alarm writer.

The SYN observer only records the actual final digest input and returned hash; it supplies no facts or authority. Covering assertions link inventory timestamps after SDK Observed and before receipt, validate pins/counts, and compare receipt.finalFactsHash with the actual computed digest. Historical reentry checks compare records/alarm/counter and provider effects without replacing history.

### Preserved RED artifacts

| Artifact ID | Name | ZIP bytes | SHA-256 |
|---|---|---:|---|
| 13580690939 | r2-fix1-red-g6-prepare-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 1240804 | 0c4dc7dcdbe1485f6cc6555bd4afd19d1ce9196d41743d204df76f71f271444c |
| 13580651329 | r2-fix1-red-g6-consume-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 20965 | e36cff3f9a8d5f7cf1cfdada6319a2a90c193827ff74a5bb19d5bfa1aa13c853 |
| 13580621256 | r2-fix1-red-g6-checkpoint-94e00923a25833cd134669e03fb646f3b1255c0b | 10834115 | e548a5e3f52aa84391aa64da121731ae7df206e2fe1f7590055f6963abfdfc7c |
| 13579993272 | r2-fix1-red-g7-checkpoint-94e00923a25833cd134669e03fb646f3b1255c0b | 10852386 | a587559235197682b344b42d6a24ca115aa23964161c2073d904c1d387eafd0c |
| 13579968338 | r2-fix1-red-g7-prepare-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 1240938 | 27ca74a64a9b81e9f5740d7fd76f044bf20d10a9e58e4175e039aa70f86753f7 |
| 13579484360 | r2-fix1-red-g7-consume-evidence-94e00923a25833cd134669e03fb646f3b1255c0b | 11813 | 793aff849944409bb0b1b7300c6eb6980335a398808ad27de174c07432bb8a30 |

The two checkpoint archives remained cloud-only. Primary consumer logs were parsed in memory; no DB/script/archive extraction was needed for this round's causal RED. Exact outcome readbacks required all 5 g6 and 3 g7 payloads plus their manifest, with no unknown root entries and byte/hash/source equality.

### Qualification layout and commands

Focused RED/GREEN: prepare-group g6 and g7 through the file CLI, followed by AFW_R2_GROUP=g6/g7 node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-owner-cleanup-native.test.mjs. Each same-revision qualification has 4 jobs, 2 genuine lineages, 4 compiled M/QA graphs, max 2 Miniflare replicas per job and 15 min job bounds. g6 runs matching/conflicting/reentry; g7 runs drift after restore during retained SDK. Syntax/node --check and scoped ESLint run before I0. Real alarm clocks are never replaced by synthetic test time.

Final covering target 56: unchanged 14 cleanup contracts + 10 inherited SDK-reference components + 9 selected issuer-native cases + 2 selected initial-cleanup guards + 5 SQL-native components = 40; original 11 native + 5 new = 16. Group counts g0=3,g1=2,g2=2,g3=2,g4=2,g5=1,g6=3,g7=1. Three lanes g0→g3→g6, g1→g4→g7, g2→g5; 16 jobs, 9 genuine lineages, 19 compiled graphs. g0 absence shares its original principal occurrence and performs no extra revoke. g6 reentry shares its matching actor. The 40-component gate is preserved from the accepted 51, not a package-wide suite or new Task1 native qualification. Final readback inventory adds only fix1-absent-current-grant.json to g0 and the bounded g6/g7 evidence files.

### Focused GREEN result

Run 42388746349 / attempt 1, Source c06d6661f6e8f31011d4b0c74592d17e0c622dd8 / tree 06aa87593a19d2cf2257c8267a5cb85ca606e765, terminal SUCCESS 2026-11-07T16:11:33Z. Four jobs succeeded. g6 job128454971543: tests 3 / pass 3 / fail 0 / cancelled 0 / skipped 0 / todo 0; g7 job128454982390: tests 1 / pass 1 / fail 0 / cancelled 0 / skipped 0 / todo 0. Scoped syntax/ESLint exited 0 before I0 with no ESLint diagnostics; inherited Actions/Node deprecation warnings remained visible.

Both alarms entered exactly at their original native C0. Matching current grant: one exact native get(present), one grant delete, one restore and complete. Its actual final inventory entered 1794067885550 and finished 1794067885683, before receipt 1794067885936; finalFactsHash 5b85e8af3d2dfc5815534d74504d7d9bd98a6452b9e780d0a935e7de955baf24 equaled the observed actual digest. Three fixed workflows / one terminal instance, own active Container count 0, four schedule/tail counts 0, closed operator and recoverable original baseline were included, with Source pins, request-body hashes and timestamps. These are explicit SYN provider facts (including the fixture operator module), not live operational inventory.

Conflicting current grant: one exact native get(present), zero SDKdeletes, no SDK Observed/no OwnerReceipt; primary stack failed in qualifyCleanupCurrentGrant. Completed reentry: unchanged-inventory control succeeded, Workflow waiting reentry returned admin_pending and all historical rows/alarm/counter/provider effects remained unchanged. g7: one get(absent under original Reference), native SDK ACK held 127 ms, actual SDK returned / Observed, then Workflow waiting failed readCleanupFinalInventory; no OwnerReceipt/no initialReceipt, state processing, one restore. No rerun or clock move was necessary.

| Artifact ID | Name | ZIP bytes | SHA-256 |
|---|---|---:|---|
| 13581066384 | r2-fix1-green-g6-checkpoint-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 10845168 | 0639db7b2c6a80e7a9a77efc301fa073cef9d196fbfe0ad1130fc7df95efa78a |
| 13581057488 | r2-fix1-green-g7-prepare-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 1243777 | 76c731707bd2d076b2607ded17090fff4eede5df930ea9d4cff87191fec2ed31 |
| 13580728893 | r2-fix1-green-g6-consume-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 19630 | e028fe0204434676c0034f42207eda5a073f3db947e617a2a7872fa19203119d |
| 13580673985 | r2-fix1-green-g7-consume-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 8859 | 73f5be1b20f63db6e0244cd47ca7f1f679fd694d8469f1f918e38d8ea24c144a |
| 13580648856 | r2-fix1-green-g7-checkpoint-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 10863380 | 0f3d20d31cdd2fe4559ef7d9527e7b35c61a8af31b617597b61025840336dd32 |
| 13580294123 | r2-fix1-green-g6-prepare-evidence-c06d6661f6e8f31011d4b0c74592d17e0c622dd8 | 1243988 | 56ca17b2a8b17939048949d506b84493200ccc66caef6b081f375f564fe58261 |

All checkpoint/outcome readbacks passed strict source/path/bytes/hash checks. Focal evidence is separate from the coherent final 56; its passes are not added to that total.

### Added covering cases (five; existing names preserved)

| Group | Exact case name | Protection |
|---|---|---|
| g0 | R2 fix1 absent current SDK grant uses original reference without absence ACK | Same principal occurrence; one exact native get returns null; actual SDK return still required. |
| g6 | R2 fix1 matching current native SDK grant is qualified before reduction | Genuine unexchanged grant, exact read, successful reduction, final inventory digest and timestamps. |
| g6 | R2 fix1 foreign current SDK object is preserved with zero deletes | Untrusted correlation drift with original absolute expiration; zero SDK deletes, no successful SDK observation or owner receipt. |
| g6 | R2 fix1 completed reentry rejects fresh inventory drift without rewriting history | Same completed actor/plan; control then active Workflow rejection, historical bytes/alarm/counter/effects unchanged. |
| g7 | R2 fix1 post-restore inventory drift during retained SDK blocks both completions | Real retained SDK ACK, original child budget, Workflow drift after restore; no owner or initial receipt/completion. |

The final native test blob is 378c09842bef0840883c481bd6cd4bad4b66413b. Focal and final qualifiers execute identical production and test blobs. The final Source differs from focal Source only by the temporary qualifier (9th single-parent/one-path commit of this fix round); all 3179 other leaves were independently compared byte/mode/type exact. Against FIX_BASE, 3175 protected leaves remained exact while the qualifier existed. Root's separate documentation branch is outside this Source delta.

The 19 compiled graph outputs are 18 M/QA outputs across 9 lineages plus the single declared SDK-only graph in g5. They are SYN compilation/qualification evidence, not provider deployment or operational readiness. The existing g5 distinction remains: SDK-only adversarial operation omits the AFW callback by explicit ruling and does not prove ordinary M token-exchange admission; actual M data denial is classified only from captured protocol/body/configuration evidence. M1 per-phase metrics, M2 paging/peak boundaries and M3 diagnostics truncation remain deferred. g2's 100 deletes / two lists are not upgraded to an unexecuted 200-delete / third-page / peak-2 claim.

### Limited evidence recovery during final qualification

No new execution was opened to recover diagnostic output. The second g3 and g4 native-result console lines were truncated; their tests and strict cloud readbacks remained intact. g4's normal recursive readback supplied complete sanitized outcomes and verified its 43 partial checkpoint files against manifest 39dd75e51c28833328f3ec04c0fb4ceb575ffacc123e2945fa29348bf1c7ecd3, with parent manifest f369a281fe8dc7de013ab12221bdc481f782d5c20feee410a25f7bb0cd7e08b6 and the same Source. No new g4 extraction or replay was needed.

Root authorized a bounded in-memory read of existing g3 artifact 13581839130 only: run 42390108314 / attempt 1, Source 92d0255a2d5c2ac2249941e8348a0d5701742604, ZIP 16487 B / SHA-256 69b6733b03ede840d998ab82c97df7830f5db079680d6dae9bdf82309b59ca78. Central directory: 4 entries, 294017 B declared expansion; only evidence-manifest.json(641B) and same-fence-identity.json(123860B) were inflated, 124501 B total, below 2 MiB ZIP / 4 MiB expansion limits. Manifest SHA-256 80225740b5b55ed1210e7d7898ac75f9f000c8dd1c8c7ba1bf1a3c1f92e71006; selected payload SHA-256 b757a01239159e6555d6cfc47a57d8dae79eba4b6a429a63757141d80493f1b2. ID/run/Source/group/path/bytes/hashes matched. No disk, dependencies, DB/scripts or OAuth values were read/emitted; buffers were zeroed and released.

Recovered facts: original three deliveries, admin_pending, alarm null, restore 0, receipt null, one SQL write, two reconciliations under the same original fence identity, no KV lists/deletes, and no successful receipt. Existing suffixes were identity,reconciled:2,reconciled:3. This records the M3 limitation and recovers already-produced evidence; it does not fix diagnostic volume or count an additional test.

### Final g5 protocol/retention facts

The captured M was canary-first-connection at /mcp, SHA256 c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32, namespace first-connection-oauth, unchanged window ending at original C0=1794069790000. The positive read_project_summary control passed at 1794069700488, with actual POST 200 / POST 202 / GET 405 / POST 200 protocol responses and the expected SYN summary. The post-C0 request at 1794069792622 was POST initialize 404; toolCallAttempted=false. The oracle identified service_window_closed from the exact unchanged flags/window/origin/script and closed response body. D1DenialProved=false; the protocol stopped before a business tool call.

The declared SDK-only script remained 92f6554db082c30e83c6f7ae4700544ee7438f0da349b0dc2d70594d97efe66f, 320211 B. Child logical deadline was 5000 ms; actual retained SDK write lasted 77589 ms from reached to native settlement, with nativeAttempt=C0+2600ms and actual SDK return. Original token/grant expiresAt was C0−1000ms; positive and SDK entry occurred while valid, and its expiry fields and configured TTL were not modified. The late native write retained its originally captured options; physical KV expiration equality was not asserted. MAdmission=false and callbackOmitted=true remain explicit for this adversarial variant. Neither SDK return nor the final HTTP denial is generalized into a global native-drain or production admission claim.

### Full graph and persistence evidence locations

Each lineage's immutable checkpoint contains graphs/metafiles.json, graphs/canary-index.mjs and graphs/qa-index.mjs, plus checkpoint.json and every declared native persistence file. g5 also contains graphs/sdk-only-index.mjs and graphs/sdk-only-metafile.json. The producer prepare-evidence artifact additionally preserves output/t2-native-graphs/<actual-QA-SHA256>/ source graphs/metafiles and the producer logs. verifyCheckpoint compares the complete recursive inventory (paths, lengths and SHA256), requires the exact scripts/metafiles, validates the compiled M/QA against mounted worker options, and does not open native state. Separately, recoverCheckpoint mounts the preserved state and reads the nonexpiring client record through both actual OAUTH_KV aliases as semantic namespace proof. Per-group uploaded readbacks and their lineage manifest hashes are retained below. No graph from a prior revision was substituted.

Native DO/KV/D1, SDK promises and the DB clock are real Miniflare/SQLite executions of this Source; provider inventory/pointers, Source pins, owner/protocol fixtures and terminal Workflow input are explicitly SYN. A local Workflow return does not prove a real provider Workflow terminated. The same original I0/C0/C1, plan, storage paths, namespace identities, scripts/options, native alarm and counter records survive the cold load.

### Coherent final qualification — verified terminal result

[Run 42390108314, attempt 1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42390108314) completed SUCCESS at 2026-11-07T17:01:58Z. Tested Source 92d0255a2d5c2ac2249941e8348a0d5701742604, tree 7c06844f33aeb6d0ce0d75381847b8f40d5a28a9. The [immutable qualifier](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/92d0255a2d5c2ac2249941e8348a0d5701742604/.github/workflows/afw-owner-restoration-qualification.yml) preserves every exact command, selection pattern, expected TAP count, dependency, artifact path and readback assertion. Node 22/current lock used npm ci --ignore-scripts --no-audit --no-fund; contents:read only, no runtime secrets/permissions.

Result: 56 tests / 56 pass / 0 fail / 0 cancelled / 0 skipped / 0 todo, in 16 successful jobs. Eight groups, nine genuine lineages, 19 graphs and 24 artifacts, all from the same Source. No successes from a prior failed or focal run were added. Wall span was 2977 s (49m37s); aggregate job elapsed time 7731 s (128.85 job-minutes), not a billing estimate. Every job stayed below 15 min; maximum observed elapsed time was 829s. This is the only coherent final covering run in this fix round.

| Job | ID | Result / TAP pass | Elapsed seconds |
|---|---:|---|---:|
| prepare_g1 | 128455701590 | SUCCESS / 0 | 815 |
| prepare_g2 | 128455701781 | SUCCESS / 0 | 806 |
| prepare_g0 | 128455701913 | SUCCESS / 40 | 829 |
| consume_g2 | 128459093629 | SUCCESS / 2 | 119 |
| consume_g1 | 128459130424 | SUCCESS / 2 | 168 |
| consume_g0 | 128459192501 | SUCCESS / 3 | 117 |
| prepare_g5 | 128459590128 | SUCCESS / 0 | 803 |
| prepare_g3 | 128459677088 | SUCCESS / 0 | 813 |
| prepare_g4 | 128459825300 | SUCCESS / 0 | 804 |
| consume_g5 | 128462941231 | SUCCESS / 1 | 118 |
| consume_g3 | 128463071778 | SUCCESS / 2 | 235 |
| consume_g4 | 128463188045 | SUCCESS / 2 | 242 |
| prepare_g6 | 128464055364 | SUCCESS / 0 | 804 |
| prepare_g7 | 128464207483 | SUCCESS / 0 | 820 |
| consume_g6 | 128467399046 | SUCCESS / 3 | 125 |
| consume_g7 | 128467605065 | SUCCESS / 1 | 113 |

Final g6 repeated all three covering assertions successfully. Matching current exact native read preceded reduction and the receipt's finalFactsHash c1c34f72b4bff6fb68c9130310116ca79f819f430f3286924ade8458f64aeb4c matched the actual observed digest. Inventory entered 1794070867177, completed 1794070867370, receipt observed 1794070867788; all pins/counts and post-SDK ordering assertions passed. The conflicting object remained intact with zero SDK deletes/no successful SDK observation/receipt. Same-actor reentry control and Workflow drift rejection preserved historical bytes, counter, alarm and provider effects. Final g7 held the real SDK ACK for 126 ms, recorded actual normal SDK return, then rejected the active Workflow inventory with no owner/initial receipt or new completion. Original alarm entered at C0=1794070911000; the pending invocation finished 1794070913115. These are native SYN observations, not planted success records.

All producer checkpoint readbacks and consumer evidence readbacks succeeded. g0 additionally preserved fix1-absent-current-grant.json from the SAME principal occurrence; g6 required five payloads; g7 required three. g4 required its declared partial checkpoint directory and recursive manifest. The 24 artifact envelopes below retain detailed logs, scripts, metafiles, native state manifests and sanitized outcomes for 7 days from creation; the durable report records hashes/IDs but does not extend artifact retention.

| Artifact ID | Name | ZIP bytes | SHA-256 |
|---|---|---:|---|
| 13583065899 | r2-fix1-final-g7-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10864320 | 4baec2c2750e49656bc8d7e4a64725637a10d2d91582beb4fd6fa4dccdd37c21 |
| 13582946396 | r2-fix1-final-g6-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 20592 | 89e6e0e6e9a9e82071dd5f93c7de4c8c05b15f20fa1b9ffd74e9ada41155923c |
| 13582911309 | r2-fix1-final-g7-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243854 | 5fbb52aa7508e01805060fbb27523408adba164adf0bfcb3c6094dd21ca45ef6 |
| 13582841821 | r2-fix1-final-g7-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 8430 | c855e22fd2f219c31c8260c8a52dd31a672f3f616a76bb82ce861ed076ea6c6d |
| 13582225238 | r2-green-g2-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10863428 | b1baca0b44a9c7212ee2986ac4585666e6195a87d3209ad21dade38673dc33f4 |
| 13582220733 | r2-green-g1-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 23888 | e1a236fc82d8f69553292dd55762ca4ad49362b306b4c1bc8e8d2ad84bf73e9b |
| 13582127956 | r2-green-g3-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243694 | a252b2aad2674ab3d2a114a9a1464bfa93eb26b4c2f00c045437386969642ca1 |
| 13582127944 | r2-green-g3-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10864509 | cfb357eb56b6ded5432d4137a8d028ed27efd141c805b18bc6ae289d3050023c |
| 13582106877 | r2-green-g5-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1325652 | 4885f9d3e6618357ff9682a228d63bc4f5df18b908206a21c198f53f6f02df35 |
| 13581991995 | r2-green-g5-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 11018737 | 319e2d1f3ef89607cd209c21024fd79d1dd77c9c485b089a9b90ffab746899e7 |
| 13581984073 | r2-green-g4-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10882444 | 8fa4bf7a7991f2ac14b9a6336306a00d337d695d2b45449045e32dc387b9a941 |
| 13581888542 | r2-green-g4-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243569 | 7a3c5b8adbcdf0ff35cee528ad697127b846875dc779849e4f3fd4e1d2f947e4 |
| 13581888527 | r2-green-g4-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10864401 | 7326665adf5c453cdece36df94ded3f46965b6167ed4685867e2069477ba2da2 |
| 13581881074 | r2-green-g1-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 21703221 | f348da2b0aa3ce49a254669f3c851fda54fae96fc7bdc2cd378a4effa9338f8c |
| 13581839130 | r2-green-g3-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 16487 | 69b6733b03ede840d998ab82c97df7830f5db079680d6dae9bdf82309b59ca78 |
| 13581816152 | r2-green-g1-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 2484746 | 05fda0616dacf497a888cc7b339e9129e50bd86b7794cb0700db1f5803be3c51 |
| 13581776471 | r2-green-g2-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10553 | 1dae82bb00b3fa9734552b39a7554a4886b90d044f36aaef73f14bc5aabbdc4a |
| 13581768742 | r2-green-g5-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 20716 | 85ac3a4413b35d74ea830a56d6888337ea3c610017b9f799f708bc3623477cc1 |
| 13581614690 | r2-fix1-final-g6-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10844277 | 33c14043b07285bdfa62262df1a0980b8d325c89ed2c5d449e1dbcd7189bc940 |
| 13581559578 | r2-fix1-final-g6-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243557 | ad95ad41b031726280eeb3c92f15898c7240d2fc1df88753490900208785cdb6 |
| 13581517110 | r2-green-g2-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1243529 | 97a25dc29c18ad398f37777b2ed30b9d11e7657a7b90f6f004fcc5d59d4712d4 |
| 13581352326 | r2-green-g0-prepare-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 1247133 | cebd30728287b3a5eca770600a03aeb6847d5a7caec9f21594cd8230c567e0e0 |
| 13581327491 | r2-green-g0-checkpoint-92d0255a2d5c2ac2249941e8348a0d5701742604 | 10863483 | b06bc1a074869cf2951466f706a85014cc8d478e4104f4fe5cc87882effe89e1 |
| 13581249389 | r2-green-g0-consume-evidence-92d0255a2d5c2ac2249941e8348a0d5701742604 | 14427 | 55c6f9ecda7a9df3c032dd2a410788f5da047cb7acb3eeb2e8439527252a2c41 |

### Original clocks and same-state lineage manifests

| Group / lineage | I0 ms | C0 ms | C1 ms | Native checkpoint files | Manifest SHA-256 |
|---|---:|---:|---:|---:|---|
| g1 / grant-before-link | 1794067967000 | 1794068867000 | 1794069047000 | 40 | 6cfb3705bb375f8b5cc06b9b7cce52e356d315fa26f4b626cdd7ec5e9fcb97a0 |
| g1 / notice-before-link | 1794068021000 | 1794068921000 | 1794069101000 | 45 | a45040c502ad164aa608bff8e8b191b5c485185778fc43e46808bb7d2c25744c |
| g2 / principal | 1794067963000 | 1794068863000 | 1794069043000 | 45 | ff72c7dd2493d9a272578d8b4cee8f5f6ccc2126e34ee06b3655c4a3acec33b4 |
| g0 / principal | 1794067986000 | 1794068886000 | 1794069066000 | 45 | e3c1f619f1d38e92644680854365fc2de9df2e45a6dcdce598c2336526e2a63f |
| g5 / principal | 1794068890000 | 1794069790000 | 1794069970000 | 47 | ce3753396628840d8ea4798219cb13d78124c421511076779a1711d42e64b464 |
| g3 / principal | 1794068917000 | 1794069817000 | 1794069997000 | 45 | c9dc9646bf8bb93b73c977d5453fdc675e318616e90937e31dd148d19f750be9 |
| g4 / principal | 1794068948000 | 1794069848000 | 1794070028000 | 45 | f369a281fe8dc7de013ab12221bdc481f782d5c20feee410a25f7bb0cd7e08b6 |
| g6 / principal | 1794069965000 | 1794070865000 | 1794071045000 | 41 | 08b327a75522ef7913187c2f89a21a42eaaa603d4a3801d5649bde693272788e |
| g7 / principal | 1794070011000 | 1794070911000 | 1794071091000 | 45 | 78f3ce3015ddebd37953e37c7d95478211284749bbdb418e199af9f5a904d2ba |

All consumers recovered before their own original C0. Native DB clock and actual alarm signal times are present in each result payload and the primary logs. Unknown restore/fence outcomes retained their original three slots and remained pending; g4's recovered State reached delivery 3 without replaying the already-issued SDK operation. Reentry in g6 was explicitly labeled inspection of the same entry and did not add a scheduled slot. No clocks, production ceilings or grant expiry fields were moved to obtain a pass.

### Warnings, self-review and protected Source closure

Scoped syntax checks and ESLint passed with no ESLint diagnostics. Inherited warnings remain in the primary logs: Node 20-targeted Actions forced to Node 24, npm @esbuild-kit and eslint@9.39.4 deprecations, and Node punycode/url.parse/Buffer deprecations. No dependency upgrade or warning-suppression change was made. No new failed diagnostic occurred after the accepted three-causal-failure RED in this fix round. The complete prior Task2 failure history remains above unchanged.

| Production path | FIX_BASE blob | Tested/final code blob |
|---|---|---|
| lib/mcp-qa-finite-owner-cleanup.mjs | 7cb54895677ee67852f7c42013238bfc1e366d93 | 1a5a2583d266179cdd89f799c64199f29044fec5 |
| lib/mcp-qa-finite-initial-cleanup.mjs | 0a04ae3a4d74c2c7939b1654683054b1d5d751d4 | 0a04ae3a4d74c2c7939b1654683054b1d5d751d4 |
| lib/mcp-qa-finite-owner-cleanup-records.mjs | 6c751081e22ba6446664014090f8015a65e22407 | 6c751081e22ba6446664014090f8015a65e22407 |
| lib/mcp-qa-finite-owner-cleanup-journal.mjs | 127e5906891b20d2f08c74a412383b8b7e3ff1e2 | 127e5906891b20d2f08c74a412383b8b7e3ff1e2 |
| lib/mcp-qa-finite-stage-work.mjs | 068d35c2555c7dc711c487f6021ec572bd3af067 | 068d35c2555c7dc711c487f6021ec572bd3af067 |
| lib/mcp-qa-finite-preparation-issuer-store.mjs | b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb | b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb |

Only the owner-cleanup production blob changed. The Task1 forward reader body was compared byte-for-byte, and the other five core blobs/modes/types remained exact. Full trees were checked against FIX_BASE, including every outside-scope leaf. Each of the nine implementation/qualification writes had one parent and one permitted path, with independent blob/content/ref readback; no force, CLI/GraphQL/auth workaround, main mutation or local build/test/dependency installation occurred. Main remained 0c9c475b3ebaa970fc11d628b40e50a90cceb727. Local tool use in this round was limited to reading the applicable skills and the separately approved bounded in-memory artifact inspection; no local project files were created.

After terminal evidence verification, qualifier retirement commit 5e2e93090c80bf30c4220f08194c7dda173467fc removed only .github/workflows/afw-owner-restoration-qualification.yml (retired blob 70d566b9d7fbf4c4b0aac9af05f1b29f776a2e86), with parent 92d0255a2d5c2ac2249941e8348a0d5701742604. Independent recursive readback confirmed absence and all 3179 remaining leaves unchanged from the tested tree. Final code HEAD before this report append: 5e2e93090c80bf30c4220f08194c7dda173467fc, tree 099108dfbd8f3b73e3c48175b6c96e3d177da005. Against FIX_BASE, 3175 non-code-change leaves were exact at that point; the following report-only append is the sole additional allowed path. Its full content/blob/ref/tree readback and final HEAD are returned separately to Root, avoiding a self-referential commit hash inside this file.

Self-review covered I1 exact-key qualification before deletion, genuine absence/reference semantics, I2 fixed native inventory after SDK in both caller paths, final-facts commitment, real promise retention/original budgets, original sole restore writer, historical reentry preservation, all original 51 scenarios plus 5 (independent name comparison retained all 15 prior literal names plus principalName and found exactly 5 additions), and complete protected-tree/CAS evidence. Root will perform a fresh scoped review of I1/I2/new breakage against FIX_BASE; this report is not that independent verdict. Minor M1/M2/M3 remain deferred as explicitly authorized. Whole-plan Source remains incomplete; operationalReadiness=false,completePackage=false,PCoff=false,globalNativeDrainVerified=false,sdkNamespaceEmptyVerified=false.

Fix-round implementation status: DONE_WITH_CONCERNS. STOP Source writes after the report's independent readback. No runtime/provider/owner/OAuth-credential operation, promotion, main change, Unit3 or PC-off trial was performed.
