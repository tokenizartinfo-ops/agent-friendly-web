# Task 2 — despacho finite en el initial CLOSED

## Resultado y límites

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=GitHub SOURCE/Actions SYN; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=únicamente Task2 y sus pruebas/documentos enumerados. Root entregará por dispatch el BASE exacto: descendiente docs-only de Task1 aceptada97ee8675e614032af2f3caa9fe3eaa24d991c7d1. Verificar ref/tree/parents antes de editar. No hash autorreferente aquí.

El artefacto initial CLOSED debe contener los cuatro conduits M→QA desde su construcción. Choice mantiene negocio pending; ninguna primera ConnectionReceipt ni permiso de publicación nuevo en esta tarea. Task3 reutilizará la construcción sobre sus bytes finales y creará NUEVA lineage; jamás continuará una cápsula antigua después de cambiar código.

READ FIRST: esta brief; plan 2026-11-05-finite-native-first-connection-publication (globals, Task2, interfaces, regresiones); spec del mismo nombre-design (secciones3/4/9/10); preflight Root vigente; aceptación Task1 en reviews/2026-11-05-finite-native-first-connection-publication-task1.es.md. Task1 está completa y no se reabre. No repetir preguntas rutinarias: owner autorizó encadenar; dudas concretas de alcance/arquitectura a Root, no al owner.

## Filemap cerrado y writer único

Exactamente11code/testpaths:
1. worker/mcp-own/finite.mjs
2. worker/independent-closure/finite.mjs
3. lib/mcp-qa-finite-owner-native-wire.mjs
4. lib/mcp-qa-finite-owner-native-bridge.mjs
5. lib/mcp-qa-finite-owner-native-receiver.mjs
6. test/mcp-qa-finite-first-connection-publication.test.mjs
7. NEW test/mcp-qa-finite-first-connection-publication-native.test.mjs
8. test/fixtures/finite-first-connection-publication.mjs
9. test/fixtures/finite-initial-entry-world.mjs
10. test/mcp-qa-finite-owner-native-wire.test.mjs (sólo normalización DATA SYN indicada abajo)
11. test/mcp-qa-finite-owner-native-conduit-native.test.mjs (mismo límite).

Extras explícitos: TEMP .github/workflows/afw-first-connection-qualification.yml, reporte reports/2026-11-05-finite-native-first-connection-publication-task2.md y progress/2026-11-05-finite-native-first-connection-publication.es.md. No otro fixture/framework/API ni archivo producto; no phase-context, preparation, SDK, ordinary index, scripts, configuración, SQL/schema/DDL, journals/store/records, perfiles o P1/P2/P3. Si falta un path, parar y pedir ruling Root antes de tocarlo. No helpers/reviewer propios ni iniciar Task3.

## Preflight de interfaces

| Par | Entrada concreta | Salida y cierre |
|---|---|---|
| M finite default→forwards | Request exacta + env/ctx/raíz registrada antes del primer I/O | Sólo forward fijo existente; no fallback ordinary en rutas finite. finish en finally, trabajo real retenido. |
| QA finite DO fetch→receivers | POST interno de uno de cuatro targets literales, metadata DATA y boundary M original | Receiver existente correspondiente; raíz QA local recortada, nunca aprobación derivada de DTO. |
| Choice wire→bridge→pending receiver | GET vacío o POST form<=1024bytes/UTF8/escapes/cookies válidos | HTML QA<=16384 con headers permitidos; error/pending no se convierte en publicación. |
| Compiler+F2→F1 SYN | Initial real construido con dispatcher desde origen, bytes/hashes/cápsula fijados | Requests/provider registry factuales; no phaseCurrent positivo prefilled ni seedPhaseFacts de connection. |
| T5/T6 legacy→validación estricta | Inputs SYN válidos para alcanzar drift/hold que ya verifican | Mismas assertions, cancel/abort reales y cero efectos; no parser relajado ni fixtures legacy cambiados. |
| Task2→Task3 posterior | Construcción cerrada y contratos revisados en código final | Task3 creará nueva lineage sobre su HEAD; Task2 no entrega receipt inventado ni cápsula reanudable. |

### M y QA

Modificar sólo default wrapper del perfil SOURCE M y preservar AfwNodeControl/AfwOwnEventNode/cleanup/legacy. Origen exacto https://delegated-canary.agentfriendlyweb.dev. Rutas reconocidas se interceptan por pathname antes de ordinary: GET/POST /connections/finite-prepare→forwardFiniteOwnerChoice; GET/POST /authorize→forwardPrivateFiniteOwnerOAuth; GET /monitoring→forwardPrivateFiniteOwnerNoticeGet; POST /monitoring/grant→forwardPrivateFiniteOwnerNoticeConsent. Rechazar /connections, /connections/revoke, /monitoring/revoke y métodos no soportados. URL/origen/query/hash malformados no llegan a SQL ordinary. /oauth/token y /mcp conservan SDK bajo sus gates existentes.

Choice puede consultar QA con bindings/version/actor originales. OAuth y notice requieren AFW_DELEGATED_OAUTH_ENABLED==='true'; los handlers QA ya calificados exigen read_consent/grant/owner/JWT/CSRF/historia/caps. NO depender del flag ordinary monitoring: prepara consentimiento, no instala stage notices. No fallback SQL ni autorización desde ese flag.

QA IndependentClosure.fetch despacha sólo POST a:
- https://afw-private.invalid/_finite-owner/choice
- https://afw-private.invalid/_finite-owner/authorize
- https://afw-private.invalid/_finite-owner/monitoring
- https://afw-private.invalid/_finite-owner/monitoring/grant

Prefijo finite desconocido deniega; fuera conserva super.fetch. No cambiar default QA, workflows, alarm, bootstrap o métodos iniciales. Choice continúa pending hasta Task3. Metadata versión M es hecho de entrada, nunca se normaliza para igualar un pointer nuevo.

Exports/contextos existentes verificados en Task1HEAD:
- oauth-forward.mjs: forwardPrivateFiniteOwnerOAuth; oauth-qa.mjs: createPrivateQaFiniteOwnerOAuthReceiver.
- notice-get-forward.mjs: forwardPrivateFiniteOwnerNoticeGet/Consent; notice-get-qa.mjs: createPrivateQaFiniteOwnerNoticeGetReceiver/ConsentReceiver.
Todos llevan prefijo lib/mcp-qa-finite-owner-. Consumir interfaces existentes; no duplicar sus handlers ni importarlos al revés desde QA hacia M.

### Gramática y respuesta

GET choice sin body/query/hash. POST application/x-www-form-urlencoded, bytes<=1024, UTF8/escapes válidos, exactamente handle/projectRef/decision=approve, únicos; handle y projectRef hex64. Cookie prepare única matching, cookies ajenas válidas no son credenciales; cookie-list vacía/malformada/duplicada se trata según contrato. Reusar readFiniteOwnerNoticeConsentBody bajo alias local, sin cambiar archivo o semántica. GET exige cero bytes del lector real acotado.

Bridge sólo HTML/headers QA permitidos, body<=16384, no-store/CSP/referrer policy. Respuesta no exitosa jamás200; unknown/body/cancel/error permanece cerrado. No echo de headers arbitrarios/IDs/provider/secretos. Capturar y revalidar holders/signal/headers originales donde corresponde; conservar same retained actual Promise hasta settlement.

### Ruling de tests antiguos (única ampliación al plan inicial)

Root leyó T5/T6 y fixtures sender/receiver en Task1HEAD. T5 línea19 hoy envía Cookie 'SYN-cookie' sin '=' para probar drift; reemplazar sólo ese INPUT y su expected literal por una cookie-list válida (por ejemplo synthetic=SYN-cookie), conservando comprobación de preservación/captura/secreto/no QA holders. T6 línea40 hoy usa form 'SYN=bounded' para alcanzar un hold del reader QA; reemplazar por handle=<hex64>&projectRef=<hex64>&decision=approve y cookie __Host-afw-finite-prepare matching. Conservar TODAS las assertions, señal nativa, hold real, contadores/readCancelled/settled/cero businessRows. La gramática elegida debe rechazar los viejos inputs: no debilitarla para mantener esos ejemplos. No cambiar fixtures legacy; Root comprobó que propagan Request real y permiten esta normalización sólo en tests. Los demás malformed/size casos siguen siendo negativos.

## Fixture propio y causalidad

F2 añade initialEntryHarness('first-connection-publication') sobre lifecycle f existente. F1 helpers Node SYN fijos approveFirstConnection(f), readFirstConnectionProbe(f), setFirstConnectionFault(f,fault), sólo faults negativos literales pertinentes. Sin source/pair/expected/callback, no importar F2 desde F1 ni exponer aprobación. F2 importa F1. Provider registry conserva requests realmente recibidos y bytes/config/pointer exactos; no un positivo sembrado. Siete DDL/filas ajenas y modos anteriores intactos. Un pending en Task2 es cierre seguro, NO conexión funcional.

CLOSED debe compilarse con el dispatcher ANTES de fijar cápsula/residencia/hash. No reemplazar M por wrapper ordinary para el positivo ni parchear bytes/hash/cápsula posterior. QA contiene residencia M exacta; M no contiene decoder/residencia QA ni su bundle. Sin build-script changes ni completePackage claim.

## RED, GREEN y coste proporcionado

RED focal nuevo prefijo '^T2 ' en los2archivos first-connection-publication (pure+native), con fallos concretos dispatch/gramática/artefacto; no imports, fixture incompleto ni baseline falso. Preservar primaria. Mantener casos Task1 como contratos.

Qualifier autorizado <=3jobs, timeout-minutes<=15 por job, Node22, npm ci --ignore-scripts --no-audit --no-fund, contents:read, persist-credentials:false, sin secrets, push sólo SOURCE/paths explícitos. Retirarlo antes de lotes y recrearlo ÚLTIMO; remover final. Sugerencia proporcional a ajustar sólo con datos:
- contratos Task1+Task2 del archivo pure + T5 completo y lint11paths;
- T3 nuevo completo (nombres Task2) + T6 completo;
- compiler staging seleccionado: 'actual compiler staging hashes final bytes and retains source classes without eligible manifest' y 'missing_factory_blocks_package', confirmar nombres exactos BASE.
Nada de full Link31/POST50/GET81/setup3 por rutina. No npm test global, sleeps/retries, fanout nuevo, clocks/deadlines amplificados o assertions suprimidas para GREEN. Cero matches/skips de seleccionado/wrapper sin assertions no cuenta. Si no cabe, Root decide grouping con medida; nunca ampliar timeout.

Capturar hashes/metafiles/bytes/grafo si la ejecución los produce, sin otro build sólo para métricas. Registrar compile y SQL/DO/IO reales si disponibles; no heredar cifras118/98 ni prometer fit. Root acepta trabajo anterior con primarias fechadas, no como prueba runtime.

## Escrituras, entrega y gates

GQL update_ref falló con error interno ya preservado; no volver a probarlo ni tocar credenciales/settings. Ruling REST contents API: branch SOURCE explícita siempre, fileSHA-CAS para existente o create sólo ausente, escrituras SECUENCIALES de writer exclusivo. Antes primer write verificar BASE. Tras CADA write verificar parent previo, único path permitido, ref, blob/contenido exactos. No atomicidad multiarchivo; qualifier último. Unknown/interferencia→preservar y avisar, sin retry ciego/force/defaultbranch. No local clone/deps/build/test: GitHub/Actions.

Informe completo de una vez: BASE→HEAD/diff entero/parents/primarias run-attempt-jobs/casos ejecutados-PASS/lint11/graphs-costes medidos/errores y fixes causales/artifacts-expiry/protegidos y limitaciones. Retirar qualifier y STOPWRITES para reviewer fresco Root antes Task3.

M1 sdkReadCurrent viejo sigue desconocido/no reproducido; M2warnings RPC/toolchain no pristine; M3 segundo intento durante cancel deferido al gate de retención Task3/whole-branch (no arreglarlo aquí). SQLConsentMinor cerrado. No volver a contar/ejecutar gates anteriores por su debt.

C0=I0+900000,C1=C0+180000,parent30s/child5s, ceiling operativo3Nov02:59UTC vencido y no renovable anticipadamente. Sin recursos/runtime/provider real/alias/Entry/DDLreal/OAuth/OTP/tokens/permisos/cron/Containers/Max/main/merge/ARM. operationalReadiness=false; completePackage=false; PCoff=false. Task2 no instala guard/suscripción/entrega ni permite pedir apagar.
