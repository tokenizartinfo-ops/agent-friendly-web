# Whole-branch review packet 14/26 — docs

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 9 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- docs/superpowers/plans/2026-11-05-finite-native-first-connection-publication.md: ABSENT -> 31660bfe0e116b4ad1310e98da7c9b96ca785ba8; full diff chars=35031
- docs/superpowers/plans/2026-11-05-finite-native-notice-consent.md: ABSENT -> ea50a936110a23b017c63bafe541231e20b7320f; full diff chars=18549
- docs/superpowers/plans/2026-11-05-finite-native-notice-link.md: ABSENT -> 89ced48bf88ff240e58e80b4971b73ebf3e0778f; full diff chars=17728
- docs/superpowers/plans/2026-11-05-finite-native-notice-next-slice.md: ABSENT -> b7b08912816274206e16810c115ed79a4f9484af; full diff chars=14690
- docs/superpowers/plans/2026-11-05-finite-native-notice-provenance.md: ABSENT -> d9359b3e48aa8494606d6bb4d2c56322c72f2cdb; full diff chars=11881
- docs/superpowers/plans/2026-11-05-finite-owner-exchange-continuity.md: ABSENT -> ec96ee472b7d3938d14b34385dafda0f810a05cb; full diff chars=13686
- docs/superpowers/plans/2026-11-05-finite-owner-io-fanout.md: ABSENT -> 38bad886a41d5d62f75eea58a57472356938d754; full diff chars=20506
- docs/superpowers/plans/2026-11-05-finite-preparation-notice-store.md: ABSENT -> 179e0101b4fec3142caad11cf30eef10aad21103; full diff chars=15915
- docs/superpowers/progress/2026-11-01-afw-pause.es.md: ABSENT -> 94e5522e041133485300611bea8af1ddbad9bd07; full diff chars=4350

## docs/superpowers/plans/2026-11-05-finite-native-first-connection-publication.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-native-first-connection-publication.md b/docs/superpowers/plans/2026-11-05-finite-native-first-connection-publication.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-native-first-connection-publication.md
@@ -0,0 +1,194 @@
+# First Native Connection Publication Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development para implementar este plan por tareas, sólo después del preflight y BASE de root. SDD ya fue elegido; no pedir otra elección rutinaria. Las casillas describen trabajo futuro, no autorización de ejecución.
+
+**Goal:** Producir el primer ConnectionReceipt desde aprobación humana real y la misma admisión/lease, con upload y activation nativos contra provider SYN, y consumir ese predecessor sin seedPhaseFacts.
+
+**Architecture:** El candidato initial CLOSED contiene desde origen el despacho finite; connection cambia sólo configuración, manteniendo bytes y residencia. QA conserva la fuente, los pares, la admisión y los resultados nativos en su continuación privada; reutiliza dos helpers compartidos sin introducir QA en M. Tres tareas revisables culminan en un único resultado funcional: receipt durable y continuidad downstream, no una UI o aprobación aislada.
+
+**Tech Stack:** Node >=22.18.0, ESM, node:test, esbuild/compilador finite existente, Miniflare/workerd, D1/DO/SDK existentes, JWT SYN firmado y provider SYN fijo; sin dependencias nuevas.
+
+**Spec:** docs/superpowers/specs/2026-11-05-finite-native-first-connection-publication-design.md @ b9cf44617938dac66e7261b740340eea94509a9b, blob 0ac493fbc1f665cf3001e80f226c4c6e76aaf6c1. Leer spec y plan.
+
+**Estado:** INACTIVE. BASE DE EJECUCIÓN PENDING, entregado exclusivamente por root después de aceptar Link y reconciliar su delta. Fuente de inspección 953e7af1fc20b59c59d8e4a03dcf398d98165cf5; no seguir WIP, elegir otro HEAD, ejecutar Task 1 ni activar qualifier desde este documento. Diseño leído/aprobado para planificar por root, con builder-check fresco “nothing important left”; esto no es aceptación de implementación.
+
+## Global Constraints
+
+- operationalReadiness=false; completePackage=false; PCoff=false.
+- C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.
+- M y QA conservan root original <=30000 ms. Child <=5000 ms, siempre recortada al parent restante.
+- No refrescar identidad/Access ni I0/C0/C1. childDeadline sólo narrowing del original; nunca now+fresh.
+- El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.
+- Sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos.
+- Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Ningún provider/custodia/roles/OAuth/permisos operativo nuevo.
+- Root, child, native holders y Promises reales se conservan hasta settlement; timeout/abort no son physical drain.
+- Ninguna admisión persistida/reanudable, source factory, DTO de autoridad, callback aprobador, raw pair, allowPending, lector público ampliado o HTTP genérico exportado.
+- Faltan datos nativos: fail closed. Rutas finite nunca caen al writer ordinary, incluso con QA ausente o phase no soportada.
+- Notices no requiere NoticeLink como gate nuevo; finite sí. Link presente se correlaciona; primera connection exige snapshot.noticeLink=null según el contrato aceptado que entregue root.
+- Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.
+- Esquemas/DDL/store/journals/records, SDK/OAuth ordinary/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler y build scripts quedan protegidos.
+- GitHub cloud únicamente para trabajo futuro autorizado: sin clones/deps/builds/tests locales, main/merge, runtime ni acceso a Cloudflare real. Este plan no ejecuta tests, compilaciones, Actions o providers.
+- Qualifier SYN futuro: como máximo tres jobs independientes, <=15 minutos por grupo, sin secrets, permisos sólo contents:read. Root fija BASE, alcance y qualifier antes del primer dispatch; ningún workflow nuevo implícito en el filemap.
+- No repetir suites aceptadas sin riesgo del delta; no sleeps/retries para ocultar fallos, no ampliar plazos ni quitar rechecks para lograr GREEN.
+- Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre.
+
+## Review Focus
+
+1. Un request finite malformado o QA inaccesible podría caer al SQL ordinary: Task 2 posee “T2 finite dispatch never falls through ordinary”, con espía antes de SQL y cero efectos.
+2. Una respuesta fallida puede bloquearse en cancel mientras otro request entra: Task 1 posee “T1 known failure retains real cancellation”; Task 3 posee “T3 retained work blocks a different live root”, con settlement observado y lease nueva vigente.
+3. Un ACK ajeno con hashes válidos podría lavar un efecto parcial propio: Task 3 posee “T3 resealed foreign publication is not own completion”; codecs válidos y rechazo del correlador antes del siguiente SEND.
+4. La extracción puede alterar tiempos, claves o volver a consumir enrollment: Task 1 posee “T1 enrollment preserves literal chronology and one shot”, con secuencia exacta, Ack preparado en el punto original y consumo antes de await.
+5. El positivo puede compilar M ordinary o cambiar bytes después de fijar cápsula: Task 2 posee “T2 initial artifact already contains fixed finite dispatch”; Task 3 posee “T3 same initial bytes produce connection and downstream”, con hashes/metafile y ningún predecessor seeded.
+
+## Filemap cerrado y ownership
+
+Los IDs siguientes identifican rutas exactas; cada tarea enumera todos sus archivos, incluidos compartidos. No hay un archivo de soporte tácito. Infraestructura qualifier/report de ejecución sólo si root la autoriza separadamente.
+
+| ID | Ruta | Tareas / responsabilidad |
+| --- | --- | --- |
+| P1 | lib/mcp-qa-finite-fixed-policy-engine.mjs | Crear T1: operaciones provider fijas compartidas |
+| P2 | lib/mcp-qa-finite-preparation-enrollment-writer.mjs | Crear T1: writer factual one-shot literal |
+| P3 | lib/mcp-qa-finite-policy-transport.mjs | T1: consumidores antiguos de helpers, semántica conservada |
+| P4 | worker/mcp-own/finite.mjs | T2: default dispatch finite; preservar clases cleanup |
+| P5 | worker/independent-closure/finite.mjs | T2: fetch DO para cuatro targets privados |
+| P6 | lib/mcp-qa-finite-owner-native-wire.mjs | T2: gramática choice y límites de respuesta |
+| P7 | lib/mcp-qa-finite-owner-native-bridge.mjs | T2: conduit y respuesta QA validada |
+| P8 | lib/mcp-qa-finite-owner-native-receiver.mjs | T2: pending seguro; T3: invocar handler connection |
+| P9 | lib/mcp-qa-finite-owner-preparation.mjs | T3: seam choice admite POST interno |
+| P10 | lib/mcp-qa-finite-owner-phase-context.mjs | T3: productor, fuente/expected privados y observer parcial |
+| P11 | lib/mcp-qa-finite-initial-material.mjs | T2 prerequisite Root: identidad de script local inmutable, bytes mutables siguen hash-current |
+| T1 | test/mcp-qa-finite-policy-transport.test.mjs | T1: extracción, gramática y regresión consumidores |
+| T2 | test/mcp-qa-finite-first-connection-publication.test.mjs | Crear T1; T2: contratos puros/wire/grafo |
+| T3 | test/mcp-qa-finite-first-connection-publication-native.test.mjs | Crear T2; T3: montaje y circuito native |
+| F1 | test/fixtures/finite-first-connection-publication.mjs | Crear T1: probe enrollment; T2/T3: provider registry SYN y probes fijos |
+| F2 | test/fixtures/finite-initial-entry-world.mjs | T1: modo enrollment aislado; T2/T3: modo publicación; modos anteriores intactos |
+| T4 | test/mcp-qa-finite-owner-phase-context-native.test.mjs | T3: cierre público de parciales y compatibilidad |
+| T5 | test/mcp-qa-finite-owner-native-wire.test.mjs | T2 Root preflight: normalizar sólo cookie SYN válida, preservar asserts de drift/retención |
+| T6 | test/mcp-qa-finite-owner-native-conduit-native.test.mjs | T2 Root preflight: POST SYN válido para alcanzar el hold nativo, preservar asserts de abort/settlement/cero efectos |
+| T7 | test/mcp-qa-finite-initial-material-native.test.mjs | T2 prerequisite Root: ownership/forgery/bytes mutables y vida original |
+
+T1→T2→T3 son secuenciales. Un writer por tarea y revisión SDD antes de la siguiente; root controla aceptación y cierre. Los tests de tareas anteriores siguen siendo contratos. No refactor ajeno de phase-context ni cambios silenciosos en SDK, esquemas o stubs para acomodar los tests.
+
+## Task 1: Extraer engine y enrollment conservando los callers actuales
+
+**Files:** crear P1/P2/T2/F1; modificar P3/T1/F2. No modificar policy-setup ni stage-work. F1/F2 se declaran aquí porque el helper necesita una prueba nativa aislada antes del productor; T2/T3 los reutilizan, sin un fixture adicional oculto.
+
+**Interfaces producidas:**
+
+P1: createFiniteFixedPolicyEngine({ctx,env},guard) devuelve frozen:
+- describeUpload({configuration,baselineVersionId,bytes}) → {method:'POST',path,body}.
+- upload({configuration,baselineVersionId,bytes},lease) → Promise<resultado provider validado>.
+- describeActivation({versionId}) → {method:'POST',path,body}.
+- activate({versionId},lease) → Promise<resultado provider validado>.
+- readPointer({versionId,deploymentId},lease) → Promise<void>.
+- readVersion({versionId,module,configuration},lease,closed=false) → Promise<metadata verificada>.
+
+ROOT/account/worker/métodos/path literales dentro de P1; describe.path es la URL absoluta fija ROOT+suffix y describe y operación forman el mismo request. requestHash usa esa URL una sola vez, idéntica al antiguo ROOT+path relativo. No export http, wire configurable, token, target ni transporte. guard es el current-check léxico de los dos producers internos; no crea fuente o aprobación. Cada caller conserva admisión y source checks antes/después de sus fases.
+
+P2: prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId,stageApprovalHash,ownerSource,baseline,baselineBytes},childLease,childDeadline) → Promise<{recordEnrollment(),recordAck()}>. recordEnrollment() → Promise<{enrollment,ack:null}> y recordAck() → Promise<{enrollment,ack}>, donde enrollment y ack son los records Enrollment/Ack del codec preparation-cleanup existente. Devuelven sólo esos records originales verificados; recordAck usa el Ack privado preparado por recordEnrollment, no argumentos de caller. Native holders/anchors/ownerRows y bytes defensivos pertenecen al helper; el caller conserva fuente/admisión. Cada método se consume antes del primer await. Sin setters, nuevo reloj, callback source ni recuperación después de unknown.
+
+**Fixture factual aislado:** F2 añade initialEntryHarness('first-connection-enrollment-component'); F1 añade exerciseEnrollmentWriter(f,scenario) → Promise<{trace,enrollment,ack,failure,settled}> como helper Node SYN fijo, sin exports producto ni callback de aprobación. Reutiliza material initial real del harness y puede preparar DATA SYN de approval para probar P2, que no consume ni concede admisión. Escenarios literales normal/double-enrollment/ack-first/double-ack/unknown-enrollment/unknown-ack/holder-drift/deadline. Cero provider POST y ningún ConnectionReceipt en todos ellos; esta prueba no acredita permiso humano ni es predecessor positivo de T3. No copiar el setup del world.
+
+**Interfaces consumidas:** contratos actuales de journal/store/cleanup/stage-work y de lease, sin cambios. P3 continúa consumiendo admisión exactamente una vez; old owner termina pending como antes. Su setup conserva PolicySend/PolicyAck/PolicyReceipt y payloads originales.
+
+- [ ] **1. RED de contratos:** añadir en T2 “T1 fixed engine exposes only finite operations” y “T1 enrollment preserves literal chronology and one shot”; en T1 adaptar la exposición test-only del engine a P1 sin añadir exports públicos al producto. Assert nombres exactos, ausencia de http/wire/ctx/setters, method/path/body iguales al motor previo, secret inherit del baseline exacto. Antes del refactor el contrato nuevo falta; el fallo debe señalar esa ausencia, no un import typo.
+- [ ] **2. RED de retención:** añadir en T1 “T1 known failure retains real cancellation”. Respuesta inválida con cancel retenido: fallo lógico observado, cero siguiente efecto y Promise real todavía pendiente; liberar, exigir settlement observado. Incluir holder/role drift y respuesta malformada sin interpretar boolean de test como autorización.
+- [ ] **3. Verificar RED en cloud autorizado:** ejecutar sólo T1/T2 con los nombres T1 y conservar fallo causal. Para extracción enrollment, capturar traza y datos del writer previo como referencia literal antes de sustituirlo; no sintetizar approval positiva ni fixture externo nuevo.
+- [ ] **4. Implementar P1 y adaptar P3:** mover validadores/límites (respuesta 4718592) y capturas; operaciones fijas, retención fetch→read→cancel y fallo absorbente. Los caller setup/owner conservan sus propios source/admission checks. Ninguna residencia/phase-context se importa.
+- [ ] **5. Implementar P2 y adaptar P3:** mantener orden original transport:65–123: captura/validación; caller qualified; Enrollment transaction→sync→readback→cleanup; construir Ack/acknowledgedAt en el punto original; caller qualified; Ack transaction→sync→readback→cleanup. Comparar claves, timestamps relativos, contenido, alarm, exclusiones y bytes; segundo uso o Ack sin Enrollment rechaza antes de IO. Deadline proviene de la child original, no de now+fresh. Retener el trabajo real aunque timeout gane.
+- [ ] **6. GREEN:** node --test --test-reporter=spec --test-concurrency=1 test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-first-connection-publication.test.mjs. Exigir todos los nuevos T1 ejecutados/PASS y cero fallos; ejecutar además la selección setup de “Regresiones”, porque P3 comparte engine con ese consumidor. Trace equality y owner pending son obligatorios.
+- [ ] **7. Commit y revisión:** commit “refactor: share fixed finite policy operations and enrollment writer”. Revisar interfaces, graph sin QA en M y exactitud old behavior; no publicar ni afirmar first connection terminada.
+
+## Task 2: Incluir despacho finite cerrado en initial CLOSED
+
+**Files:** modificar P4/P5/P6/P7/P8/P11/T2/F1/F2/T5/T6/T7; crear T3. T5/T6 son el ajuste acotado de preflight Root descrito abajo; no fixtures legacy ni producto extra. P8 conserva negocio pending hasta T3; los otros handlers ya existentes no se reimplementan.
+
+**Ruling Root de preflight Task2, posterior a aceptación Task1:** T5 hoy usa Cookie 'SYN-cookie' sin '=' y T6 usa POST 'SYN=bounded'. La gramática estricta ya elegida los rechaza antes del punto cuyo drift/hold pretenden medir. Autorizar únicamente reemplazar esos INPUTS SYN por cookie-list válida y form exacto handle/projectRef/decision=approve con cookie prepare matching. Preservar cada assert, señal/hold nativo, contadores y settlement; no debilitar el parser ni cambiar fixtures para conservar el viejo input inválido. Añadir T5 y T6 completos al gate proporcional porque ejercitan directamente wire/bridge/receiver modificados. Sus pruebas de malformados siguen negativas. Esta normalización no concede aprobación ni crea precedente Task3. No se modifica contrato producto ni se amplían endpoints. Scope Task2 reconciliado:13code/testpaths más qualifier/informe/ledger explícitos. La precisión Root posterior exige413 EXACTO en las4assertions SIZE sender/receiverT5/T6 que llegan al reader1024; primero400 pasa a primero413, manteniendo cancelación/retención/zeroeffects. No se acepta [400,413] ni un fallo temprano deContentType.
+
+**Prerequisite Root de coste/integridad (P11/T7):** el cuerpo histórico real SYN2445218B/599reads consumía4714ms en rechecks y80ms leyendo; child rechazó5004>=5000, sin autorización/holder/parentclock fallidos. Root autoriza sustituir SÓLOsha repetido del script LOCAL ya validado/inmutable por referencias exactas originalContext/artifact+valor script en WeakMap privado. No cachéDTO. Mantener sha(candidateBytesMUTABLE),length/type/materialHash+recordHash/r.check/holders/source/lease ytodosawaitrechecks; initial-entry/initial-lease protegidos. Cobertura material5pertinente y mismo cuerpo/fragmentación/30s/5s. La primera conexión sigue Task3; esto sólo permite initialCLOSED factual bajo límites originales. Véase Root preflight6Nov y reporteTask2 para primarias y scope.
+
+**Interfaces consumidas/producidas:** reutilizar forwardFiniteOwnerChoice({request,env,ctx},originalLease) y los forwards/receivers OAuth/notice existentes. Ningún endpoint nuevo. P5.fetch(request) selecciona sólo targets privados literales de la spec. P7 sólo devuelve HTML y headers QA permitidos, body <=16384; errores nunca se convierten en éxito. P8 conserva native holders/boundary/retención; su reemplazo de pending por handler ocurre únicamente en T3.
+
+F2 añade initialEntryHarness('first-connection-publication'), con la forma de lifecycle f existente (mf, stub, cleanup y datos/probes SYN). F1 amplía los helpers Node SYN fijos sobre f ya creado: approveFirstConnection(f) → Promise<Response> realiza GET y POST reales con JWT SYN firmado y cookie/form; readFirstConnectionProbe(f) → Promise<DATA> observa requests/counts/rows/settlement; setFirstConnectionFault(f,fault) configura sólo los casos negativos nombrados en este plan. No acepta source/pair/expected/callback, no importa F2, no devuelve permiso. F2 importa F1, nunca al revés. approveFirstConnection puede retornar pending en T2; ese resultado no cuenta como GREEN funcional.
+
+- [ ] **1. RED de artefacto/dispatch:** añadir T2 “T2 initial artifact already contains fixed finite dispatch” y T3 “T2 finite dispatch never falls through ordinary”. Compilar usando compiler finite actual; assert M incluye forwards fijos y no decoder/residencia QA, QA incluye residencia M exacta; M positive no puede ser wrapper ordinary de test. Requests por rutas reconocidas con método/origen/query inválidos y QA ausente deben dar cero SQL ordinary y cero approval/SEND.
+- [ ] **2. RED de gramática y pending:** añadir T2 “T2 choice grammar bounds actual body and cookies”, T3 “T2 closed mounted conduits cannot authorize business”. Casos POST >1024, UTF-8/escape inválidos, extra/duplicado/decision diferente, cookie vacía/separador/nombre inválidos y duplicada; valores browser válidos y cookie ausente se tratan conforme choice, no como permiso. GET exige body vacío. Pending QA y contenido/headers inesperados jamás producen 200 de publicación. Mantener los tests T1 verdes.
+- [ ] **3. Ejecutar RED focal:** node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^T2 ' test/mcp-qa-finite-first-connection-publication.test.mjs test/mcp-qa-finite-first-connection-publication-native.test.mjs. Exigir fallos por dispatch ausente/gramática concreta; no por baseline falso o fixture que omitió primarias.
+- [ ] **4. Implementar mounts y wire:** P4 intercepta /connections/finite-prepare, /authorize, /monitoring y /monitoring/grant antes de ordinary. Rechaza /connections, /connections/revoke, /monitoring/revoke y métodos no soportados. Origen exacto delegated-canary.agentfriendlyweb.dev, perfil SOURCE finite y holders/actor/binding/version calificados. Choice puede consultar QA; OAuth y notice requieren OAuth true. QA decidirá read_consent, grant/identity/CSRF/historia; monitoring flag ordinary nunca habilita preparación. /oauth/token y /mcp conservan SDK actual. P5 implementa sólo los cuatro targets privados de la spec; prefijo desconocido deniega. Raíz original antes del IO, finish en finally, sin abandono nativo.
+- [ ] **5. Completar fixture propietario y GREEN:** F2 construye el initial CLOSED con este dispatcher desde origen y productor upstream aceptado, nunca modifica cápsula/hash posterior. F1 provider SYN guarda requests reales y sirve bytes/config/pointer exactos; no positive f.phaseCurrent prefilled. Preservar modos existentes, siete DDL y filas ajenas. Ejecutar T2 completo y compiler/graph seleccionado; exigir hashes/metafiles, cero ordinary SQL y pending seguro. Todavía no hay receipt nuevo; ese límite se declara.
+- [ ] **6. Commit y revisión:** commit “feat: mount closed finite source conduits in initial candidate”. Revisión de artefactos/graph y scopes nativos, con T1 intacto. No cambiar build scripts ni declarar completePackage.
+
+## Task 3: Producir connection en la continuación humana y consumir su receipt
+
+**Files:** modificar P8/P9/P10/T3/F1/F2/T4. No nuevos paths. P1/P2 se consumen tal como Task 1; si su contrato necesita modificación, detener y devolver la discrepancia a root.
+
+**Interface producida:** P10 exporta handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease) → Promise<Response>; sólo P8 lo llama. P9 amplía continuePrivateQaFiniteOwnerChoice para POST usando el reader factual léxico de P10; no se transporta ese callback por request/RPC. Reader conserva forma pública {source,preconnectionId,capsuleHash}. Sin pair/expected/admission/baseline aportados por caller.
+
+**Fuente y estados:** P10 obtiene bootstrap/resident bytes/primarias/backup desde recursos existentes, verifica actual QA/M, owner, Access, sourceRevision/tree, initial plan/capsule/alarm y roles originales. Candidate copia baseline exacto salvo OAuth false→true; rollback inmediato e histórico recuperables/hash verificados. Consumo de admission y adopt stage-work en la misma root. Reusar helpers de T1 y journals existentes.
+
+Estados privados exhaustivos: approved → enrollment-recorded → enrollment-ack-recorded → upload-send-recorded → upload-native-pending → upload-ack-recorded → upload-observed → activation-send-recorded → activation-native-pending → activation-ack-recorded → activation-observed → receipt-recorded → complete. Otro estado deniega. Own Send/Promise/result/settled/Ack/readback son referencias distintas; no se reemplazan por journal DATA.
+
+- [ ] **1. RED principal nativo:** añadir “T3 same initial bytes produce connection and downstream”. Desde initial CLOSED producido en T2: GET firmado real, cookie y tres campos, POST real; esperar 200 únicamente tras ConnectionReceipt native durable. Assert upload nuevo y activation nueva, orden Send→sync/readback→native result→Ack→sync/readback, config sólo OAuth, bytes iguales y snapshots completos. Luego QA code→M token→MCP/D0.4→notice GET/POST/Link nativo aceptado, sin seedPhaseFacts/seedFutureActivation ni ACK/provider pointer prefilled. Antes de P10 debe fallar por pending sin receipt, no por una aprobación simulada.
+- [ ] **2. RED adversarial causal:** implementar los grupos de la tabla siguiente como tests nombrados T3 (history/current snapshots en T4; restantes en T3), con baseline positivo válido y reseal cuando el objetivo sea correlación. La prueba demuestra cuál primer efecto prohibido no ocurrió; un rechazo anterior de checksum no cubre un predicado posterior.
+- [ ] **3. Ejecutar RED focal:** mismo comando de Task 2, patrón '^T3 ', sobre T3/T4. Separar principal de grupos negativos que ya estaban cerrados; conservar al menos un fallo causal por cada comportamiento nuevo (receipt, propia continuidad, reader parcial seguro).
+- [ ] **4. Implementar entrada humana/fuente:** P8 invoca P10. P9 conserva gramática/action/StageApproval/TicketUse existentes. P10 verifica Access JWT firmado con realm/audience fuente y owner actual, prepara form con cookie original sin renovar, consume admission una vez después de choice status202/stage connection, captura holders y entra en adoptFiniteOwnerRequestStageWork. Sin historial approval como resume.
+- [ ] **5. Implementar enrollment/upload:** aplicar P2 bajo misma child, rechecks del caller entre fases. Upload: full pair→describe fijo→journal.issue recorded→sync/readback→own recheck→actual native Promise/result→Ack recorded→sync/readback→readVersion actual y pointer baseline→full pair. requestHash usa method/describe.path absoluto/body y baseline IDs reales, preservando exactamente la antigua representación ROOT+path. ACK/result desconocido nunca se reconstruye.
+- [ ] **6. Implementar activation/receipt:** nueva child dentro del parent original: full pair/baseline→SEND/sync/readback→recheck→actual activation→ACK/sync/readback→pointer/version/config→ConnectionReceipt finish/sync/readback→full pair final. Receipt y completedAt permanecen dentro de la ventana de activation SEND. Enrollment, upload y activation no reciben plazo fresco para terminar su ACK/receipt.
+- [ ] **7. Implementar expected/observer:** ambos snapshots completos siempre; permitir sólo delta propio explícito de enrollment, effects/writer-head, pointer/config observado y receipt. snapshot.noticeLink null en first connection; mantener la correlación vigente posterior. Public reader, OAuth y notice niegan effects parciales sin receipt; nueva choice niega history consumida, sin backfill. Historial válido conserva deadline en acceptedAt/ACK; lectura posterior exige techos actuales originales, no now<ventana histórica terminada. No genérico else permisivo.
+- [ ] **8. GREEN principal y negativos:** node --test --test-reporter=spec --test-concurrency=1 test/mcp-qa-finite-first-connection-publication-native.test.mjs. Exigir todos los T2/T3 ejecutados, principal completo, cero fail y assertions de settlement observadas. T4 focal y regresiones de abajo también deben pasar. Medir IO/fanout, snapshots, bodies, graph/hashes y tiempos originales; no reclamar fit si excede 5 s/30 s.
+- [ ] **9. Commit y revisión:** commit “feat: produce native first connection from original owner approval”. Revisar spec/resultados/causalidad/protected blobs y deuda SDK antes de cierre. Receipt/UI sola no cierra la tarea: predecessor real debe alimentar continuidad downstream aceptada. Sin siguiente unidad, mount operativo, main ni deploy.
+
+### Casos T3 obligatorios y asserts propietarios
+
+| Nombre test o familia | Variantes y asserts |
+| --- | --- |
+| T3 identity and choice cannot mint admission | firma/issuer/audience/subj/expiry/owner/revisión/Access menor; cookie/Origin/handle/projectRef/decision; assert TicketUse=0 y SEND=0 para entrada inválida |
+| T3 admission cannot cross lineage or resume | otra ctx/env/root/lease, doble consumo, finish/restart, approval DATA histórica; assert provider POST=0 en nueva petición |
+| T3 source and rollback must be recoverable | QA/M pointer/module/config, bytes/tree/hash, placeholder metadata, secret inherit/value/physical IDs, Backup/chunks/manifest/retainedIds; assert upload SEND=0 |
+| T3 enrollment unknown cannot upload | held/lost transaction/sync/readback, doble método, alarm/ownerRows drift; assert upload POST=0, conservar filas |
+| T3 upload uncertainty cannot activate | existing/unknown/held SEND, lost/late/malformed result/reconciliation/body/cache, version/config incorrectos, pointer cambiado; assert activation SEND/POST=0 |
+| T3 activation uncertainty cannot finish | existing/unknown SEND, lost/late result, foreign deployment, pointer/percentage/config/version divergentes; assert receipt=0, sin segundo POST |
+| T3 final readback cannot turn uncertainty into success | finish/sync/readback/final pair desconocidos o drift; assert status!=200 y evidencia durable preservada |
+| T3 resealed foreign publication is not own completion | source/owner/preconnection/context/baseline/module/config/writer-head/version/deployment/receipt links alterados con hashes válidos; comprobar validación codec previa y cero siguiente SEND |
+| T3 original deadline fences each native boundary | body/source/transaction/provider/ACK/receipt con deadline original agotado, reloj hacia atrás, lease holder drift; sin nueva ventana ni retry |
+| T3 retained work blocks a different live root | held fetch/read/cancel/SQL/DO/sync, known failure/abort; segunda root SYN vigente rechazada por scope, no por su propio abort; liberar y assert settlement observado antes de assert final |
+| T3 history is factual not replay authority | replay éxito/respuesta perdida, public reader ante cada prefijo parcial, history válida después de 5 s, foreign UUID/prefix; sin nuevo SEND y rows ajenas intactas |
+| T3 current snapshots remain complete | drift owner/revision/source/SDK/issuer/notice/Link entre snapshots; sin normalizar grant.exchanged_at; detectar antes del siguiente commit |
+| T3 same initial bytes produce connection and downstream | principal arriba; post-consent phase no soportada sigue cerrada; native POST jamás alcanza SQL ordinary; no nuevo permiso por Link |
+
+Grupos de dispatch/gramática/cancel de T2/T1 siguen activos. Campos, counts y trace se observan pasivamente; ninguna prueba positiva autoriza mediante probe ni depende de setFirstConnectionFault.
+
+## Regresiones concretas y qualifier futuro
+
+Estos nombres existen en pin 953 y son puntos de selección, no pruebas que ya se ejecutaron aquí. Al reconciliar BASE, verificar nombres/expansiones y conteos reales; cero matches, skip de un seleccionado o salida sin assertions no es GREEN. No sustituir silenciosamente un caso eliminado. Fixtures SYN históricas de las regresiones no cuentan como predecessor del nuevo principal.
+
+| Propietario | Archivo / nombres literales o prefijo anclado | Motivo |
+| --- | --- | --- |
+| T1 | T1 archivo completo; “read_version_current_candidate_and_historical_rollback”; “wrong_role_denied_before_mutation”; “actual consumed owner approval without original native cleanup capsule remains pending and has no SEND/POST” | engine/old admission y rollback |
+| T1 | test/mcp-qa-finite-policy-setup-native.test.mjs: “Task4 actual native wrapper DO store and two-effect engine installs only actual ACK versions”; “Task4 lost activation ACK cannot produce installed receipt or repeat effects”; “Task4 held nested hydration retains original lineage after response until actual settlement” | segundo consumidor engine |
+| T2 | test/build-finite-native-package.test.mjs: “actual compiler staging hashes final bytes and retains source classes without eligible manifest”; “missing_factory_blocks_package” | mounts/residencia y completePackage cerrado |
+| T3 | T4: “closed source keeps original A and stable original context”; “original approval and enrollment stay closed without publication”; “settled first connection derives read_consent from exact primary state”; prefijos “unknown SEND denies”, “retained original backup denies”, “actual current module and profile independently deny”, “original retained read blocks foreign root until actual settlement”; “fresh QA pointer drift after the first snapshot denies” | observer compartido y partial state |
+| T3 | test/mcp-qa-finite-owner-notice-get-native.test.mjs: “GET acknowledged original after actual QA code M token MCP and D04 reader”; “full empty and totally absent schema preserve reader; GET partial schema fails before journal”; “foreign preconnection and UUID history is neither enumerated nor changed”; “owned native hold-before denies bearer continuation and only own stack ACKs” | frames/schema/lifetime shared |
+| T3 | test/mcp-qa-finite-owner-notice-consent-native.test.mjs: “native consent POST records original decision after actual ticket GET”; “native consent own SQL continuation alone accepts pending SEND”; “native consent captured failure cannot resume commit”; “native consent correlated DATA denies connection” | private continuity/source correlator |
+| T3 | test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs: “D04 actual exchange retains factual read_consent and immutable grant ACK”; “D04 actual exchange then SYN valid native timestamp drift at observation two denies” | actual timestamp y reader común |
+
+Ejemplo de ejecución focal: node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^(read_version_current_candidate_and_historical_rollback|wrong_role_denied_before_mutation)$' test/mcp-qa-finite-policy-transport.test.mjs. Usar la misma forma con los nombres de la tabla; registrar expected/executed/PASS. No ejecutar npm test global ni 50 ms fanout/all SDK por obtener métricas.
+
+Qualifier final propuesto, root lo fija tras aceptación Link/BASE:
+1. Job A: T3 nuevo completo (incluye principal y montaje nativo), máximo 15 min.
+2. Job B: T4 y selecciones GET/POST/SDK/Link por delta de frames, máximo 15 min.
+3. Job C: T1/T2, setup seleccionado, compiler/graph seleccionado y lint de paths modificados, máximo 15 min.
+
+No un cuarto job oculto ni repetición de todo el corpus aceptado. Reutilizar compilaciones por hash inmutable dentro de un grupo cuando el harness ya lo permita; no cambiar scheduler/validadores para mejorar tiempos. Si no cabe, root decide con medición qué agrupación proporcional es válida; no extender timeout, suprimir cobertura causal o rebajar los clocks producto. El compiler actual se invoca por sus tests API en checkout cloud verificado; no build estándar indiscriminado, deploy ni completePackage claim.
+
+Root mantiene deuda explícita baselineSdkReadCurrent: dos fallos iniciales no reproducidos en focales. No se atribuye causa aquí. Reconciliar los casos concretos y evidencia que root entregue junto al BASE; no sleeps, retries ni marcar resuelto por un nuevo GREEN ajeno. Link nativo se verifica en el principal y mediante su caso seleccionado confirmado en BASE, sin inventar hoy un nombre WIP o ampliar gate notices.
+
+## Self-review y handoff
+
+- Cobertura: spec 1–3 → T2/T3; 4–5 → T3; 6 → T1; 7–8 → T3; 9 coincide con el filemap original de16paths más T5/T6 y P11/T7 de preflight Root; 10 → matriz T1/T2/T3/regresiones; 11 → qualifier y límites.
+- Consistencia: T3 consume exactamente firmas de T1; choice sólo añade POST al seam interno; P8 cambia de pending a handler en T3. Mount existe antes de fijar bytes/cápsula positiva; no tests verdes sobre M ordinary.
+- Grafo: P1/P2 no importan phase-context/residencia; P3 no los recibe indirectamente. QA puede importar P10 y M residente; M no contiene decoder QA. F1 no importa F2.
+- Review Focus: cinco riesgos tienen tests propietarios nombrados; negativos resealed no confunden checksum con correlación, y settlement se afirma explícitamente.
+- Proporción: tres gates útiles; setup/config/fixture dentro de su deliverable, sin tarea administrativa ni cuerpos repetidos. Plan menor que spec.
+- Gaps arquitectónicos abiertos: ninguno identificado. Pendientes de ejecución: aceptación Link/BASE y reconciliación exacta snapshot.noticeLink/downstream, evidencia/deuda SDK entregada por root, coste real bajo límites y actualCloudSourceProof operativo separado. No son permiso para inventar interfaces ni runtime.
+- Handoff: root revisa este plan, fija preflight/BASE y despacho SDD futuro. No empezar Task 1 desde esta entrega. Sólo este archivo documental se añade en la rama propia con CAS/readback.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-05-finite-native-notice-consent.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-native-notice-consent.md b/docs/superpowers/plans/2026-11-05-finite-native-notice-consent.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-native-notice-consent.md
@@ -0,0 +1,87 @@
+# POST nativo de consentimiento — Implementation Plan
+
+> **For agentic workers:** Workflow futuro superpowers:subagent-driven-development, un único writer y revisión root de spec/quality. **INACTIVE**: no ejecutar, implementar, crear agentes o lanzar tests desde este documento. GET aceptado y reconciliado a f68797ca0ad083aa4e90be87c83b5f60f2aa691b (código cfe8f0dd idéntico). Activación sólo tras preflight root con BASE futuro. El writer no crea helpers/reviewers; root coordina la revisión.
+
+**Goal:** Registrar un consentimiento humano POST real, con ticket original nativo y correlación factual privada completa antes de responder.
+**Architecture:** Ampliar los módulos GET aceptados con entradas Consent fijas y transporte privado compartido; misma instancia store/lease/Common/window desde observe hasta INSERT. El resultado SQL real permanece léxico hasta ACK/rechecks.
+**Tech Stack:** ESM, Node y harness existente Miniflare/workerd/D1/DO/JWT RS256 SYN, sólo entorno cloud específicamente autorizado.
+**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md
+
+## Restricciones globales
+
+- Pin histórico dc4edafc0b5e4ba440cd32a21dd3dd58024e811a; reconciliación GET f68797ca0ad083aa4e90be87c83b5f60f2aa691b/tree8f07c7e2bc98ab08f8a943f3c98bb9045b0af2b1. Root SOURCE Approved with Minor/P3,0C/I; P3 cookies sigue pendiente y pertenece a esta unidad, no fix-loop GET.
+- C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; source ceiling2026-11-03T02:59Z vencido. Sin nuevos relojes/rearm/renew.
+- Scope original preconnection/prefijo y grant UUID; historia ajena intacta. Schema cap8/DO list7/ticket2/event3, todas columnas y ambos snapshots.
+- Protected store/journal/records/DDL/authority/ordinary writer/SDK/source stubs/flags/mounts; filemap10 cerrado en spec.
+- No authority DTO, allowPending, callback aprobador, raw pair, source factory, retry/reconstrucción ACK/physical drain.
+- Todo SOURCE/SYN/unmounted; operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Review focus
+
+1. Body malformado/overflow y cancel retenido no deben seguir a baseline/store aunque falle pronto HTTP.
+2. Menor AccessPOST no puede renovar ni retrorecortar ticket, Common o ventana.
+3. Witness copiado o de otra instancia nunca sirve; witness válido no sustituye firma/CSRF.
+4. Own SEND sólo se tolera en continuación léxica con actual SQL Promise/result; ACK DATA o replay no la recrean.
+5. Corrupción del segundo snapshot, retiro real o fallo absorbente conserva historia y evita ACK/éxito.
+
+Cada punto se cubre con pruebas concretas en pasos4–5. Riesgos no cubiertos no se resuelven por tests globales arbitrarios.
+
+## Task 1: unidad coherente POST + correlación + formulario SOURCE
+
+Única unidad de aceptación: no publicar formulario activo ni aceptar endpoint por separado. Se permiten checkpoints propios no activados; no siguiente producto.
+
+**Files:** los diez de spec, sin archivos adicionales. Nuevos: lib/mcp-qa-finite-owner-notice-consent-body.mjs y test/mcp-qa-finite-owner-notice-consent-native.test.mjs. Modificar los cuatro módulos GET/phase, dos fixtures GET/SDK, fixture IO sólo si necesita labels y test GET existente. No nuevos frameworks ni mode de initial-entry. World aceptado ya completa7DDL en todos phase-context preservando4DDL consent/3eventos ajenos/2grants; no tocarlo ni repetir DDL por opt-in.
+
+**Interfaces consumidas:** observeOwnerPhasePair PRIVATE, createFinitePreparationIssuerStore({ctx,env}).observeMonitoringTicket({...Common,ticket},lease), .insertMonitoringConsent({...Common,ticketWitness},MISMA lease), createFinitePreparationNoticeJournal({ctx,env}).appendSend/appendAck/read, verifyCloudflareAccessJwtWithExpiry, qualifyFiniteOwnerApprovedTicket, original stage-work/lease/retention.
+**Interfaces producidas:** los siete exports exactos de spec; ningún par ni capacidad. Receiver/forward/handler reciben sólo Request/env/ctx/originalLease. Private qualifyNoticeConsentBaseline(pair) y recheckConsentOwned() no exportados.
+
+- [ ] **1. Reconciliar prerrequisito y congelar ejecución.** GET aceptado ya fijado en f68797ca, producto leído cfe8f0dd; confirmar que futuro BASE conserva estos blobs y diez paths/APIs/shared fixture. Evidencia reconciliada en informe. Root fija BASE antes de ejecución. No copiar rama docs encima de producto. Root define cloud qualifier temporal, comandos permitidos y rollback CAS de propios commits; puede separar dos jobs credential-free paralelos (POST nativo y GET/regresiones), timeout<=15min cada uno, sólo al activar; autorización GET anterior no se hereda para POST. Conservar expired SOURCE y restauración del qualifier SYN. Si falta método o fixture, volver con diferencia concreta antes de ampliar mapa.
+
+- [ ] **2. Escribir RED causal del recorrido principal.** Reusar OAuth QA GET/POST real que genera grant; en principal hacer además code→M token→MCP real para conservar exchanged_at actual; GET de monitoring nativo real genera formulario/ticket ACK. Construir POST de handle obtenido de HTML y cookies reales, Origin correcto y JWT SYN firmado con JWKS real de fixture, nunca token decodificado/verifier fake. Baseline GET aún niega POST: el RED esperado es respuesta404/405/503 frente200 y events0 frente1; demostrar endpoint alcanzado, no import missing ni fixtureError. En baseline puede construirse POST desde hidden handle del formulario disabled sin simular decisión persistida. Añadir assertion de literal exports después de causalRED; no anunciar missing export como prueba de seguridad.
+
+- [ ] **2b. RED puro y nativo de P3 cookies.** En test GET existente y test POST nuevo, invocar qualifiers públicos fijos, nunca exportar parser. Casos puros 'notice cookie-list accepts token names and legitimate values': Cookie ausente GET grammar permitido, nombres tchar con puntuación válida, valor vacío, base64 con '=' repetidos, quoted válido/quoted vacío y varias cookies con '; '. Casos 'notice cookie-list rejects malformed list': header presente vacío/OWS-only, leading/trailing/double semicolon, nombre con colon/slash/@/paréntesis/corchetes/coma/espacio/control/noASCII, repetido exacto, valor con coma/backslash/espacio/control/noASCII o comillas interiores/solitarias, separador fuera de '; ', límite8193/CRLF. Mantener fuente hard-coded y quoted propios no convertidos a token por normalizar.
+  Native 'notice GET malformed unrelated cookie denies before reservation': grant y prepare cookie reales válidos + pareja ajena 'bad:name=x' o segmento vacío -> no nueva notice Reservation/Send/Ack, ticket SQL0; no confundir journal issuer previo con0notice. Native 'native consent malformed unrelated cookie denies before SEND': ticketGET válido + cookies prepare/monitoring válidas + misma anomalía -> consent SEND delta0/event SQL delta0, ticket/journalGET byteexact. Probar además pareja ajena quoted válida en flujo nativo exitoso para evitar rechazar todo cookie no propio. RED en GET actual: validator11 acepta nombre inválido/filtra segmentos; no atribuir fallo posterior de identidad a corrección grammar.
+
+- [ ] **3. Implementar mínimo íntegro de fuente.** Compartir transporte dentro de módulos GET conservando signatures antiguas. Añadir validator cookie-list privado compartido GET+POST exacto de spec (resuelve P3 sin tocar OAuth), y body1024 real retenido con failure latch, grammar/metadata fixed POST y guards de actor/versions. Handler: baseline privado ticketACK3rows/event0, Access/prepare/approval/CSRF actuales, mismo Common/window/store/witness. Secuencia exacta observe→recheck→verify→Send recorded→recheck→SQL Promise/result real→recheck→Ack recorded→recheck. Ampliar correlación factual sólo eventos exactos ya leídos; público3keys/OAuth/GET no admiten history. Actualizar sólo celdas notice/event esperadas; grant.exchanged_at y todas las demás quedan reales. HTML activo sólo cuando toda unidad pasa. No tocar store/journal para facilitar tiempo/resultados.
+
+- [ ] **4. GREEN nativo principal y corpus de entrada.** Crear los siguientes tests en archivo nuevo; nombres literales forman contrato de revisión (parámetros producen sufijos claros):
+  - 'native consent POST records original decision after actual ticket GET': one original UUID, ticket14 exacto, ConsentRow12 completa, journal5filas sin freeze, SEND antes SQL, ACK rowHash/sequence nativos, issuer historical ACK intacto, exchanged_at actual conservado; source reader3keys/OAuth/GET niegan history; HTML/cookie/header/source flags correctos; historial ajeno byteexact.
+  - 'native consent preserves global sequence across another grant history': insertar historia AJENA SYN identificada antes del recorrido original; native original sequence>1, no max global ni expectedSequence+1.
+  - 'native consent grammar denies ': method GET/path revoke/query, wrong Origin, missing Origin, extra/duplicate handle, malformed percent/UTF8, MIME parameter, 1025bytes, duplicate cookie, bad cookie hash, missing prepare, prepare mismatch. Assert no consent SEND/SQL; repetir solicitudes sin decisión no consume intento.
+  - 'native consent verified identity denies ': invalid signature, wrong realm/audience, other subject, expired Access, AccessPOST shorter than original ticket. JWT malos firmados SYN cuando corresponda; ningún verifier replacement. Assert no consent SEND/SQL, ticket original íntegro.
+  Negativos ordinarios usan grant realmente emitido por SDK y ticket GET real, sin repetir token/MCP completo en cada caso. No prefill positivo de notice/consent.
+
+- [ ] **5. GREEN causal de concurrencia, fallos y factual.** Gates SYN sobre operaciones nativas reales, no Promises inventadas como éxito:
+  - 'native consent own SQL continuation alone accepts pending SEND': hold INSERT antes resolución; comprobar SEND presente/events0/ACK0, lector público y otro POST niegan; liberar operación real, sólo propia continuación puede completar; no pasar expected/allowPending al handler.
+  - 'native consent lost native result never reconstructs ACK': ejecutar INSERT real y perder/rechazar respuesta; evento queda, SEND sinACK,503; restart/replay no escribe ni completa ACK.
+  - 'native consent journal uncertainty never authorizes next effect': perder retorno de appendSend tras commit/sync/readback -> INSERT0; perder ACK tras commit -> sin200 ni replay, eventos/filas conservados.
+  - 'native consent original window fences queued SQL': hold antes ejecución hasta pasar deadline real5s; liberar, native no mutation/ACK0; gate alcanzado antes de expirar. No clock patch ni nueva child.
+  - 'native consent source current drift denies ': before-SEND y after-SEND/before-SQL cambiar owner/revision, current QA pointer/M version o holder; comprobar consumo correcto (noSEND antes; SEND conservado después) y SQL0 cuando se detecta antes llamada.
+  - 'native consent second snapshot drift denies ': alterar exchanged_at válido o aviso/evento original entre snapshots; conservar snapshots completos; no enmascarar drift. Si se altera fila inmutable, fixture lo rotula SYN corrupción destructiva, nunca operación legítima.
+  - 'native consent history closes replay ': actual successful POST, own unmatched SEND, foreign request ticket same UUID, event without SEND, mismatched rowHash/sequence, unknown journal key, overflow, missing schema, partial schema, success:false schema, malformed results. Positivos proceden de producer; manipulaciones posteriores negativas SYN. Esquema ausente/no listo niega antes SEND; prueba read-only vacío sigue válida en regresión.
+  - 'native consent withdrawal preserves history ': CLOSE real antes release no revoca por sí solo; revokeGrant real sí impide SQL. Tras evento grant real, retirada real append-only por mecanismo ordinario permitido exclusivamente en fixture deja grant/revoke históricos y bloquea toda continuación. No nuevo endpoint revoke producto. Resolver ordinario tras revokeGrant rechaza generic Monitoring authorization unavailable; no assertion enabled:false.
+  - 'native consent failed body retains actual cancellation': body reader/overflow/cancel held en M y QA; failure latch responde sin éxito y mantiene scope real retenido. Otro ingreso del mismo ctx usando lease SYN válida dentro deadlineoriginal deniega mientras pendiente; tras settle+root abort disponibilidad vuelve según stage-work. Lease yaabortada no prueba exclusión.
+  - 'native consent abort retains SQL and forbids late ACK': abort request/root mientras SQL pendiente, late real resolution no ACK/200; historial conserva efecto que haya ganado. Medir pending real, no declarar drain.
+  - 'native consent captured failure cannot resume commit': primer error capturado/holder mutation durante await luego resolución buena no permite SEND/INSERT/ACK siguiente.
+  Para fallos store concurrentes no modificar sus métodos: conservar protección aceptada y probar handler sin bypass. No test imposible de autenticar humano/SQL sólo validando ACK DATA.
+
+- [ ] **5b. Negativas de correlación aisladas, no sólo hash inválido.** Nombre 'native consent correlated DATA denies ' con sufijos source-revision, issuer-reservation, original-grant-ack, grant-link, connection, ticket-request y event-sequence. Seguir receta exacta spec: partir de producer nativo real, reseal Identity cuando corresponda, Reservation/Send.requestHash/reservationHash/identityHash/ACK.sendHash coherentes. Preservar tiempo/actor/QA/preconnection; no renovar. Fuente/issuer/GrantLink/ConnectionRef/ticket/event reales quedan intactos. Para event-sequence primero POST real exitoso, después ACK.sequence resealed distinto del event.sequence.
+  Exigir accepted codec roundtrip Y journal.read REAL exitoso en lease vigente antes de invocar POST negativo; devolver únicamente booleanos saneados de fixture, no pair/aprobación. Trace pasivo demuestra entrada al bloque correlador exacto (noticePrimary296 o301 y nuevo bloque event) y rechazo allí antes de salida normal; verificar ausencia de fallo previo. Deltas nuevo consentSEND/SQL0, originales preservados. Si test falla por hashlinkage anterior, no cuenta como aislamiento y se corrige fixture. Old noticeCorrupt91–98 sólo reseal Reservation o deja identity inválida: sus resultados previos no prueban cada correlación. No reemplazar outputs ni añadir puerta debug en producto; markers en instrumentFiniteNoticeGet deben ser únicos y no alterar control.
+
+- [ ] **6. Medir el mismo GREEN y comprobar resultado.** Trace saneado por fase baseline/observe/SEND/SQL/ACK: body/fetch/read/cancel real y settlement, journal ops/list7, D1 sesiones fresh-primary/select/all/preflight/INSERT; ambos snapshots completos por cada recheck, request lifetimes/peak<=2 original, elapsed child<=5000/parent<=30000. Contar seis pares previstos si implementación coincide; documentar toda diferencia necesaria antes de aceptar. Consent añade validación sobre consulta event GET ya existente, no otra consulta por declaración. Dos Access verifications reales; JWKS caching no es permiso nuevo. Sin repetir50ms/allSDK para contar. Si deadline falla, investigar causa causal manteniendo plazos y lectura completa; no ampliar clock ni borrar checks.
+
+- [ ] **7. Regresiones proporcionales cloud.** Root puede lanzar en paralelo POST nativo y GET/regresiones en dos jobs credential-free<=15min, con el mismo HEAD/qualifier y artefactos separados; no competir por un fixture compartido ni ampliar trabajo por paralelismo. No es autorización de ejecución en este diseño.
+  1. node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+  2. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+  3. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+  4. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+  5. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+  6. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+  Estos prefijos se leyeron literalmente en dc4: phase16 seleccionados (1+1+4+1+1+6+1+1), SDK6 (1+1+2+1+1), D04 cuatro. Verificar nombres y no0match en GET aceptado antes de correr; registrar seleccionados/passed/failed/skipped reales y no atribuir skip0 a toda suite filtrada. Source vacío/three-keys, unknown issuer, snapshot2, shared fixture y exchanged_at justifican selección. No repetir todas SDK/50ms ni suites store/journal intactas por reflejo; extender sólo ante cambios reales/fallo o ruling root.
+  ESLint sólo archivos cambiados y tooling existente. QA/M se compilan en harness; guardar metafile/inputs/hash/bytes reales y diff con GET aceptado. Standard build sólo si root confirma nuevo reachability a entrypoint estándar; no usar build para métricas.
+
+- [ ] **8. Checkpoint y revisión root.** Reportar BASE/codeHEAD/reportHEAD/tree, diff10paths/blobs y protected blobs exactos; RED/GREEN run/job/attempt/comandos/counts y estados terminales sin recomputar para hashes. Costo real/graph/5s30s/fanout, weak witness/nohuman, native vs SYN, rowhash/sequence/expiry, public closures y ausencia mount. Retirar qualifier temporal según permiso root y readback CAS. Root revisión completa spec+quality SDD antes de aceptar; no agentes del writer ni siguiente unidad.
+
+## Entrega y rollback
+
+Status DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED; root recibe SHAs y pendientes concretos. No aceptación parcial de formulario activo ni exposición real. Rollback producto limitado a propios commits con expected HEAD, sin borrar notice/ticket/consent/eventos/grants ajenos; nunca “compensar” permiso eliminando historia. Runtime sigue cerrado incluso si todas pruebas pasan. Next gaps: retirada humana completa, NoticeLink/etapas restantes, tercer CLOSED, own setup/cleanup/guard/hosting/PCoff requieren unidades/autoridad separadas.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-05-finite-native-notice-link.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-native-notice-link.md b/docs/superpowers/plans/2026-11-05-finite-native-notice-link.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-native-notice-link.md
@@ -0,0 +1,90 @@
+# NoticeLink desde POST nativo — Implementation Plan
+
+> **For agentic workers:** Futuro workflow superpowers:subagent-driven-development, un único writer y revisión root spec/quality. **INACTIVE**: no implementación, tests, agentes ni ejecución por este plan. Root reconcilia POST aceptado y fija preflight/BASE/permiso cloud antes de activar; writer no crea helpers/reviewers.
+
+**Goal:** Persistir y correlacionar el NoticeLink existente desde la continuación privada del POST de consentimiento real, antes de responder200.
+**Architecture:** Extensión léxica del handler Consent, misma child/lease/SQL result y ACK originales; preparationStore.putLink→sync→readback→dos snapshots completos. Ninguna nueva phase/API/ruta.
+**Tech Stack:** ESM, harness Miniflare/workerd/D1/DO existente, JWT RS256 SYN real; cloud sólo cuando root lo active.
+**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-link.md
+**Contratos protegidos:** 2f96acb45ec5477d559f85070aa438d2e2e00822.
+**POST reconciliado:** candidato 5205d80216d9767c44762df4a181e1015e093a8e / tree 23309d147f8818e0232be215f42a77cf7ffe0e6a; POST aceptado SOURCE por root en f62b6c8b17412b812ae411bbc9cedad43b9ce501 (tree 50fec019ac7a341fd9dacf004f7dd7f95581cd71): Spec ✅ / Quality Approved, 0 Critical y 0 Important. Producto idéntico a 5205/e153. Link INACTIVE hasta preflight y futuro BASE. No seguir WIP. GET form SOURCE activo y cookie P3 aceptados SOURCE por root; sin mount.
+
+## Restricciones
+
+- Filemap de cuatro archivos exacto de spec; sólo producto phase-context y tres archivos de pruebas/fixture. Store/records/journal/profile/source stubs/forward/OAuth/SDK/world/DDL/config/workflow protegidos.
+- Link DATA cinco campos SIN purpose/selfhash; eventHash=evidence('event',camelCase12) NO rowHash SQL del ACK. No nuevos enums.
+- Misma child POST<=5000ms desde observeTicket a Link/recheck; parent original<=30000ms; C0=I0+900000/C1=C0+180000; source ceiling 3 nov02:59Z vencido. Sin nuevo presupuesto/rearm/renew.
+- Público3keys/OAuth/GET y baseline POST nuevo cierran ante historia propia; ACK histórico nunca crea continuación; sin backfill/retry/physical drain.
+- Segunda publicación notices y tercer CLOSED/finite_prearm posteriores; aquí flags/operationalReadiness/completePackage/PCoff siguenfalse.
+
+## Review focus
+
+1. Confundir snake_case rowHash con eventHash camelCase produciría un Link incompatible con consumidores existentes.
+2. putLink transaction ACK sin sync/readback no cumple el boundary propuesto; unknown commit no admite recuperación permisiva.
+3. Nueva lectura debe entrar en AMBOS snapshots y anchor.inventory, sin esconder drift de issuer/exchanged_at/current source.
+4. Contextos nuevos/actor restart/historia previa no pueden enlazar consentimiento cuyo resultado SQL ya no está vivo.
+5. Costo adicional no puede iniciar otra child ni renovar window, aunque el evento/ACK ya sean durables.
+
+Cada punto tiene casos nativos concretos en pasos2–5; no sustituirlos con codec-only.
+
+## Task 1: Link propio durable con continuidad factual privada
+
+**Files:**
+- Modify lib/mcp-qa-finite-owner-phase-context.mjs.
+- Modify test/fixtures/finite-owner-notice-get.mjs.
+- Create test/mcp-qa-finite-owner-notice-link-native.test.mjs.
+- Modify test/mcp-qa-finite-owner-notice-consent-native.test.mjs expectativas de finalización propia y dos assertions de settlement diferidas por root.
+Ningún nuevo archivo por inferencia. Brief/reporte/qualifier root fuera de producto se acuerdan en preflight, no se ejecutan desde diseño.
+
+**Consume:** handler handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease) real (748+); actualSqlPromise, actualSqlResult, sqlSettled, ownSend, const ack y appendAckPromise/appendAckResult privados; observeOwnerPhasePair/getRecord/recheckConsentOwned PRIVADOS; createFiniteOwnerPreparationStore({storage,now:Date.now}).putLink/readLink; captured storage.sync; codecs/hash/evidence existentes.
+**Produce:** NoticeLink en key connection-preparation:<id>:notice y snapshot.preparation.noticeLink privado; NO exports nuevos. POST 200 sólo después del Link/readback/full recheck; misma respuesta humana sin datos internos.
+
+- [ ] **1. Preflight obligatorio y baseline.** Root entrega POST aceptado code HEAD/tree/blobs y futuro BASE. Comparar contra candidato reconciliado: APIs/variables reales, seis filas journal y resolución final de P3 cookies, shared fixture y gates. Ubicación fijada en 849: después de await recheckConsentOwned() y antes de activeChild=null, dentro de l/window/common originales (826–829). Confirmar cuatro paths y permiso cloud. El candidato conserva SQL y ack hasta ese punto; requiere ownAck en scope 801, asignado del const ack sólo tras appendAckResult recorded/hash (848), no del snapshot. Si revisión cambia esto, root reconcilia antes de ejecutar; no helper público. Preservar evidence actual; no copiar docsbranch sobre fuente ni ejecutar usando2f96 sin POST.
+
+- [ ] **2. Escribir RED causal sobre POST aceptado.** Test 'native notice link follows actual consent ACK in the same POST child': grant por OAuth real, GET monitoring real, POST firmado/CSRF real y D1/DO reales, event native + consent ACK ya éxito. Primero assert POST 200 + real event/ACK y ausencia de fixtureError; después exigir NoticeLink exacto. RED esperado Link ausente en producer POST aceptado, NO endpoint404/importmissing/journal inválido. Principal usa token/MCP real al menos una vez y verifica exchanged_at actual; negativos posteriores usan grant SDK real sin repetir token/MCP innecesariamente.
+  Capturar hashes/rows originales y trace de actual SQL resolution→ACK→Link; Link no se prellena. Datos ajenostres eventos/dos grants ycuatro DDL históricos del world aceptado permanecen byte-exact; sequence global puede>1.
+
+- [ ] **3. Implementar mínimo íntegro.** Añadir suffix notice y lectura readLink real por snapshot; comparar inventario raw/decoded. Correlación precisa con EventRow/ticket/issuer/SDK/current fuente. Añadir preparation.noticeLink=null/record, sin salida pública ni source phase nueva. Extender requireEmptyNotice.
+  Extender recheckConsentOwned (803–824) con lista exhaustiva de estados: rechazar pending/desconocidos; mantener SQL real en consent-sql-resolved, consent-ack-recorded y notice-link-recorded, y ownAck en los dos últimos. El else actual no basta para nuevos estados. En la MISMA child después de recheck ACK: exigir actualSqlPromise/result reales, ownSend/ownAck recorded, failed false, link ausente; acceptedAt real una vez, eventHash camelCase existente. Añadir preparationStore junto a journal/store, usando issuerCapture.storage. Retener linkPromise=preparationStore.putLink(...,l), recorded+hash exacto, Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]) real y readLink byte-exact; no sobrescribir actualSqlPromise/result/settled. Usar wait/check existentes y el mismo l. Sólo entonces update expected.preparation.noticeLink, records.inventory y anchor.inventory; recheck completo final sin sobrescribir SQL Promise. No reutilizar viejo recorder ni su ramo existing. Conservar failure latch/holders/Access/plazos.
+  Fixture real blob f2ede8ac193b24dfc9e548fb4175f6e8eb6947a0, líneas 190–213: preservar postReplace de match único, lost-ack, before-send/before-insert, trazas y noticeConsentEventAck. Extender marcadores propios para Link sin romper los actuales. Holds nativos se ejecutan en la invocación ORIGINAL; controles externos sólo DATA, nunca resolver una Promise nativa desde otro request ni inventar otro timer budget. APIs store/records sin cambios. No journalSEND adicional ni nueva phase. Si un test exige modificar otro archivo producto, parar con diferencia concreta.
+
+- [ ] **4. GREEN principal y contratos nativos.** Casos nuevos:
+  - 'native notice link follows actual consent ACK in the same POST child': exact5 fields/codec/canonical bytes, key propia, eventHash diferente del rowHash journal y exactamente evidence('event',mapping12), sequence real, acceptedAt correlacionado; put recorded→sync→readback→snapshotpair antes200; source/SDK/issuer original intactos.
+  - 'native notice link retains global event sequence and foreign history': caso en historia ajena existente, no sequence1supuesto ni lookup global.
+  - 'native notice link never advances source or public readers': público3keys/OAuth/GET/POST replay niegan history/link; cambios none en profile/flags/policy stage receipts; record no abre NoticeLink endpoint ni old forward.
+  - 'native notice link requires live originating SQL continuation': replay después consentimiento completo y restart real no llama putLink; consentimiento previo sinlink (producido por POST base real o corte justo después ACK) tampoco se backfillea. No fabricar actualResult DTO ni exportar pair para simular éxito.
+  - 'native notice link event hash uses existing consumer projection': mismo EventRow devuelto por INSERT se proyecta campo por campo; hashFiniteOwnerEvidence valida gramática existente, no custom domain/nuevo schema. Esta comprobación de compatibilidad no declara notices stage activo.
+
+- [ ] **5. GREEN fallos/retención/correlación.** Gates sobre Promises nativas reales, fixture sólo observa/corrompe negativamente:
+  - 'native notice link unknown transaction never recovers from readback': putLink realmente commit pero respuesta perdida;503, Link puede existir, event/ACK retenidos, cero retry/link segunda escritura/200. No seguir a sync/readback para convertir uncertain en recorded.
+  - 'native notice link lost sync or readback remains closed': put recorded y sync/readback fallo; conserva Link/consent, sin response200; otroPOST no repara. Variante readback bytes incorrectos (DATA shape válida) no se acepta.
+  - 'native notice link existing or conflicting record cannot win': entre recheck y put insertar SYNnegative link exacto/diferente usando contrato codec; storeexisting/conflict no200. No meter positivo en baseline.
+  - 'native notice link held write and cancellation retain actual work': hold actual transaction/sync/readback; abort original; respuesta denegada no ACK final/HTML; scope real outstanding hasta settle. Otro ingreso del mismo ctx con lease SYN vigente deniega antes de settle; no probar exclusión sólo con lease abortada ni atribuirla al journal pending Set.
+  - 'native notice link original child expires without renewal': gate after ACK/before put cruzando deadline 5 s REAL del consentSend; assert gate alcanzado con tiempo, cero nuevo put si expiró antes llamada. Variante commit gana luego expires->Link preservado/503. No otra clock.child ni Date patch. Contabilizar desde observeTicket original.
+  - 'native notice link current facts drift at final recheck': owner/revision/QA/Mpublication/holder o exchanged_at válido entre snapshots; denegar y preservar historia. Usar marcador de source current antesput y despuésput, no opción expected.
+  - 'native notice link factual mismatch denies ': eventHash, grantHash, sequence, preconnectionId, acceptedAt futuro/antes del ACK/después del deadline. Link shape/codec válidos cuando se prueba correlador; trace prueba que pasa decode y llega al predicado objetivo, no afirmar aislamiento por un rechazo anterior. Columnas SQL/issuer originales intactas; no reseal ni reautorizar SQL. Mutaciones negativas de transacción/current deben identificarse como SYN.
+  - 'native notice link missing source evidence never becomes authority': link sin consent ACK, no_mutation, ticket diferente/unknown SEND, freeze o event withdrawal; baselines públicos/POST deniegan antes NUEVOconsent SEND/SQL/putLink. Positivo siempre nace del producer real; negativos sólo después.
+  - 'native notice link real reduction preserves event and link': real revokeGrant/CLOSE según APIs existentes del fixture, sin endpoint nuevo. CLOSE no se confunde con revocación; real revokedgrant hace resolver ordinario rechazar generic Monitoring authorization unavailable. Todas filas append-only permanecen, no enabled:falseinventado.
+  Carry obligatorio de precisión de tests, informado por root tras revisión POST (sin fix-loop ni cambio de producto): en 'native consent original window fences queued SQL' (158–162), después de noticeReleaseHeld exigir settlement observado antes de noticeInspect/asserts finales; en 'native consent abort retains SQL and forbids late ACK' (240–245), polling acotado debe terminar con assert explícito de noticeProbe().allowed===true, no agotarse silenciosamente. En ambos casos falla si no se observa settlement dentro del límite SYN existente; no ampliar ventana productiva, retención o timeout para conseguirlo. La admisión del probe acredita sólo ese scope local, no physical drain. Warnings de toolchain/harness quedan para review final, sin upgrades.
+  Preservar también corpus POST P3 cookies/resealed correlaciones al ejecutar su suite; no recrear las mismas familias en Link por rutina.
+
+- [ ] **6. Medición proporcional sin nuevo presupuesto.** Capturar en GREEN real: +2 DO readLink/par, mismo D1 SELECT y HTTPfanout por snapshot, +1 par completo final más puttransaction/sync/readback. Referencia del reporte candidato: 6 pares/12 snapshots, child 775 ms de 4999, parent 1275 ms, 2 Access verificaciones. Link proyecta 7 pares/14 snapshots; medirlo, no asumirlo ni reutilizar 98/112. El tiempo sobrante observado no garantiza capacidad. Reportar conteos físicos/first-primary/list caps/bytes/hashmetafiles QA/M, elapsed child total<=5s y parent<=30 s, peak fanout 2 original. Verificar que null y raw inventory aparezcan en ambos snapshots sin omitir otrocampo.
+  Si no cabe, registrar fallo causal y durable prefix conservado; no ampliar plazo/clock/ventana, omitir lectura ni declarar fit por CODEC. No repetir50 ms/all SDK/build estándar para obtener cifras.
+
+- [ ] **7. Regresiones escogidas y verificables.**
+  1. node --test test/mcp-qa-finite-owner-notice-link-native.test.mjs
+  2. node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+  3. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+  4. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+  5. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+  6. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+  7. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+  Prefixes existentes ya leídos en cadena: phase16, SDK6, D04cuatro; verificar literal names/conteos/no 0 match contra futuro BASE, candidato aporta POST50/GET37 por cobertura escalonada, no full único ni aceptación. Conservar literales POST 'native consent POST records original decision after actual ticket GET', 'native consent own SQL continuation alone accepts pending SEND' y 'native consent lost native result never reconstructs ACK'; GET 'GET acknowledged original after actual QA code M token MCP and D04 reader'. El principal POST cambia expectativa final de Link; los dos casos de settlement descritos en paso 5 refuerzan sus asserts; el resto mantiene sus predicados. Justificación: observer común añade DO read y field privado en todas fases, snapshot drift/SDKpending/exchanged_at; cuerpos/grammarGET+POST y fixture compartidos. Suites store/journal/records intactas conservan evidencia aceptada; tests Link ejercen put/read reales, sin rerun amplio por reflejo.
+  ESLint sólo cuatro archivos cambiados; QA/M compilados por harness y graphdiff vs POST aceptado. Standard build sólo si nuevo alcance llega realmente a entrypoint estándar y root lo exige. Propuesta root de futuro qualifier: tres jobs independientes sin credenciales, cada uno ≤15 min: (A) Link full; (B) POST full; (C) GET full + regresiones seleccionadas + lint. Referencia anterior POST37 full ~340 s + GET36 full ~326 s + seleccionadas ~100 s; POST ahora tiene 50 casos. No agrupar todo bajo 15 min ni omitir checks para cumplirlo. Root fija cap/partición tras aceptación y preflight; no crear ni despachar qualifier aquí.
+
+- [ ] **8. Guardar y revisión root.** BASE/code HEAD/report HEAD/tree/cuatro paths/blobs, protected blobs, RED/GREEN exact heads/runs/jobs/attempts/counts seleccionados/fail/skip/lint, costos/retención/plazos, native vs SYN y no autoridad. Root lee diff completo y hace spec+qualitySDD; writer no helpers. No siguiente unidad, main/merge/mount ni nueva autorización por pasar checks.
+
+## Rollback y pendientes posteriores
+
+Rollback sólo commits propios CAS contra HEAD esperado; no borrar Link/eventos/tickets/journal/grants para revertir una respuesta incierta. Conservar estado durable parcial y receipt de fallos. No cleanup/freeze automático ni backfill.
+Siguiente dependencia real: segunda publicación notices con StageApproval/decision/receipts/profile/current factual y continuación propia; luego tercer CLOSED/finite_prearm y full setup separado. Link DATA no las completa. Todo continúa INACTIVE hasta root preflight/POST reconciliado/BASE futuro.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-05-finite-native-notice-next-slice.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-native-notice-next-slice.md b/docs/superpowers/plans/2026-11-05-finite-native-notice-next-slice.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-native-notice-next-slice.md
@@ -0,0 +1,87 @@
+# Finite Native Notice GET + Private Facts Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Un futuro writer único trabaja desde brief/BASE de root; sin helpers. Root conserva preflight/revisión de spec+quality y revisión independiente que exija el workflow. Este documento NO despacha agentes ni implementación.
+
+**Status:** INACTIVE / SOURCE ONLY / SYN / UNMOUNTED. Root debe fijar futuro BASE con store y journal aceptados. Journal aceptación comunicada2969a840860d47997132eb081d1e65376f3953e0; no se sigue rama activa.
+
+**Goal:** Un GET autenticado prepara un ticket nativo y su journal, con comparación privada de ambos snapshots antes de responder; no concede permiso.
+
+**Architecture:** Observer privado incluye notice journal/schema/filas del UUID original; reader público sigue3keys y niega contenido notice. Handler GET en el mismo módulo conserva expected-frame y resultado SQL léxicos; forward/receiver fijos transportan Request original. Ningún callback de autoridad o par crudo exportado.
+
+**Tech Stack:** ESM, Node test, esbuild/Miniflare/workerd y D1/DO reales en fixtures SYN cloud existentes.
+
+**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-next-slice.md
+**Report:** docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice-design.es.md
+
+## Global Constraints
+
+- C0=I0+900000; C1=C0+180000; padre<=30000ms/hija<=5000ms; source ceiling2026-11-03T02:59Z vencido. Sin renewal/offset/rearm.
+- Sólo diez paths de spec; cuatro producto y seis tests/fixtures. Store/journal/SDK/authority/SQL/schemas/config/entrypoints ordinarios no se modifican.
+- Prefijo propio y UUID grant original; sin globalCOUNT/latestgrant/list de otros proyectos. Historia ajena intacta.
+- Completar todos los hechos/snapshots y preservar fanout original; current grant.exchanged_at permanece real en snapshots. ACK histórico únicamente proyecta ''.
+- GET exige siete schema objetos exactos antes de reservation/SEND. Carrera posterior sigue posible; no retry/repair/atomicidad global.
+- POSTmonitoring cerrado; sin NoticeLink/source notices/third CLOSED/mount/ARM/hosting/guard/PC-off.
+- expected-frame y actualPromise/actualResult SQL sólo léxicos; existing/uncertain/no_mutation no producen200 ni formulario.
+- No nuevas credenciales, provider requests, permisos CI, DDL remoto, publicación, merge/main ni ejecución local. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Review Focus
+
+1. Journal/ticket propio aparece después de SEND y antes de ACK: sólo stack dueño con Promise SQL realmente resuelta puede aceptarlo; lector público/otroGET niegan.
+2. Inventario desconocido o schema parcial no desaparece mediante límites, normalización o claves omitidas; grant ajeno nunca entra en lookup.
+3. Access GET actual más largo no renueva original; expiry/owner/pointer/SDK pending o drift entre snapshots niega incluso con ticket persistido.
+4. Unknown append/SQL ACK o Promise/body/cancel retenidos: no ACK reconstruido/replay; pending del journal no se confunde con exclusión física.
+5. Lecturas/graph nuevos alteran costo de rechecks originales; medir sesiones/list/HTTP reales y mantener30s/5s, sin repetir50ms/allSDK por obtener cifras.
+
+## Task1 — Recorrido GET y hechos privados, una unidad de revisión
+
+**Files:** los diez paths exactos de spec. Crear producto wire/forward/QA y modificar phase-context; crear test native+fixture notice; modificar world, sdk fixture, io fixture y assertions métricas sdk native. No otro path sin root.
+
+**Consumes:**
+- createFinitePreparationNoticeJournal({ctx,env}).appendReservation/appendSend/appendAck/read, codec/seal6filas aceptados; DATA no autentica SQL.
+- createFinitePreparationIssuerStore({ctx,env}).insertMonitoringTicket({...Common,ticket},lease) y FINITE_PREPARATION_MONITORING_SCHEMA; no nueva factory preflight.
+- observeOwnerPhasePair PRIVATE, qualifySettledOwnerPair PRIVATE, source/Access/approved-ticket/ConnectionRef actuales; request lease, narrowing, retain y native wire existentes.
+**Produces:**
+- three wire APIs y forwardPrivateFiniteOwnerNoticeGet, createPrivateQaFiniteOwnerNoticeGetReceiver según spec;
+- handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease) fixed Request completo;
+- snapshot PRIVADO records.notice/anchor.notice/noticeRows, sin cambios a3keys públicas.
+
+- [ ] **1. Preflight y preservación.** Root entrega BASE/tree exactos, rama aislada writer, accepted store/journal refs y alcance cloud. Verificar bytes/interfaces sin seguir ramas ajenas. Guardar diff base, hashes de store/journal/source stubs/Mordinario/SDK y fixtures afectados. Root fija autorización del qualifier temporal (si lo hubiera), contents:read/sin secretos, rollback por CAS y compilador estándar adicional según graph. No inferir permisos de este plan.
+
+- [ ] **2. RED factual sobre comportamiento existente.** En nuevo native test, reutilizar initialEntryHarness modo nuevo opt-in para emitir grant por OAuth GET/POST reales. Instalar siete DDL sólo en fixture explícita. Confirmar reader original3keys/read_consent y SQL/grant actual. Añadir por fixture un registro unknown al prefijo notice PROPIO o ticket SQL ordinario etiquetado NEGATIVE para UUID original, sin alterar grant/owner. Exigir que readPrivateQaFiniteOwnerContext devuelva unavailable. BASE lo ignora y devuelve contexto: RED causal. Caso distinto de proyecto/grant queda sin cambios y reader continúa. No presentar semilla negativa como productor finite ni saltar prerequisitos.
+
+- [ ] **3. Implementar inventario privado y cierre de lectores.** En phase-context añadir journal.read por snapshot, selectAll privado fresh-primary, schema/tickets/events queries exactas y noticePrimary/correlaciones. Mantener facts/primary/qualify/igualdad completa y fanout; schema ausente total compatible con notice vacío, parcial/tamper niega. qualifySettledOwnerPair y OAuthrecheck niegan cualquier notice/ticket/evento original. Ejecutar los nuevos casos de inventario y positivos vacíos; no cambiar sourceBase/phase. No insertar tolerancia parametrizable.
+
+- [ ] **4. RED del GET con prerequisitos reales.** Fixture routing opt-in M/QA a nuevas interfaces fuente; si los módulos aún no existen, usar stubs exportados unavailable exclusivamente para que bundle cargue, identificados como scaffolding. Grant real original, Access SYN firmado verificable, prepare cookie y source/pins correctos deben estar listos ANTES del GET. Requerir200, un ticket nativo y reservation/ticket:send/ticket:ack; la ausencia de GET falla con503/404 y0ticket. Error de import/bundle/schema/fixture o expiración antes del gate no es RED. Guardar una sola evidencia causal válida, no iterar fallos artificiales.
+
+- [ ] **5. Implementar wire/forward/QA.** Signatures/URLs/grammar exactos de spec; sólo GET humano/body0, metadata sobrescrita, mismo actor/binding/version, request lease original, retención fetch/body/cancel. M no ejecuta SQL ni forward post-ACK ordinario. Receptor crea lease del Request reenviado y llama handler; no opción pública de bypass. Fixture añade route sólo en modo noticeGet=true; producción permanece sin mount.
+
+- [ ] **6. Implementar handler y máquina léxica.** Baseline completo vacío; schema READY antes de cualquier escritura; Access firma/issuer/audience/expiry real, preparecookie/approved-ticket/owner/GrantLink/ConnectionRef. Generar único handle/UUID y tiempos min originales. Guardar expected privado; appendReservation recorded→actualizar sólo notice/anchor→recheck. Child única de ticket: SEND recorded→recheck0fila→SQL Promise REAL→applied exacto→recheck1fila→ACK real recorded→recheck íntegro. actualPromise/actualResult SQL no se sobrescriben con resultados journal. No_mutation/error/uncertain/existing termina503 sin nuevos efectos; no reintentar ni reconstruir desde SELECT. Sólo200 final con formulario disabled/cookie/restricciones exactos; no POSTconsent.
+
+- [ ] **7. GREEN integrado y adversariales mínimos.** Nuevos casos nativos, sin snapshot/identity verifier/product API mock:
+  - **GET acknowledged original:** actual QAcode→Mtoken→MCP original→D0.4 reader3keys antes de GET; JWT SYN firmado. GET nuevo real devuelve200; ticket14campos exactos, tres rows journal con hashes/ACK correctos, eventos0, grant y exchanged_at/issuerACK originales intactos; HTMLdisabled/noJS/CSPform-action none/cookieStrict. Reader público después unavailable, no new phase.
+  - **Empty compatibility:** schema ausente y completo-vacío, ambosreader3keys; GETausente/schema parcial niega ANTES reservation/SEND, contadores0. Índice/trigger/objeto extra SQL niega. Otro UUID/preconnection con historia no afecta y permanece byte/fila idéntica.
+  - **Grammar and person:** methodPOST, foreignURL/query/body/metadata/cookie duplicada, invalidsignature/wrongsubject/wrongaudience, missingpreparecookie y Access que vence durante GET antes de reservation: ninguna mutación. CurrentAccess longer no cambia expiry original; expiry más corta aún válida produce ticket clampado, porque GET no acepta ticket propuesto por caller.
+  - **Own transition / no bearer:** gate real tras SEND antes de INSERT y después de INSERT committed antes de liberar resultado. Reader público y segundoGET niegan; después de liberar original dentro de plazo, sólo continuación dueña puede ACK. Test no llama handler con expected/allowPending ni exporta pair.
+  - **Inventory/correlation:** unknownkey/overflow, ACK sinSEND, rowhashincorrecto, identidad/GrantLink/ConnectionRef incoherentes; fila real sinjournal, SEND ajeno, ticket diferente mismoUUID, cualquier consent evento: denegar. Manipulaciones negativas rotuladasSYN.
+  - **Drift two snapshots:** gates antes de segunda observación; cambiar owner/revision, pointer/version o exchanged_at canónico distinto y un journal/ticket propio. Snapshot conserva fila actual; no resolver por normalizar exchanged_at. Si ticket UPDATE requiere retirar trigger, sólo SYNdestructivo después de primer snapshot y se reporta como corrupción, nunca operación legítima.
+  - **UnknownACK:** retorno journal perdido tras commit/sync/readback→no siguienteSQL; retorno SQL perdido después de commit→ticket presente, SEND sinACK,503; repeatGET no amplía rows/fecha ni devuelve handle. Freeze intercalado bloquea ACK; conservar evidencia, sin rollbackdeD1.
+  - **Queue/expiry/CLOSE:** gate antes de ejecutar INSERT; atravesar ventana real5s o CLOSE original previo a liberar→cero ticket/ACK. Ticketgana→CLOSE no borra ticket ni revoca grant; usar reducción original sólo en fixture y conservar historia. Sin nuevo presupuesto ni Date patch; assert gate alcanzado antes de expiry.
+  - **Retention:** retener SQL/body/cancel reales tras abort; scope externo stage-work bloquea otro ingreso del mismo ctx con leaseSYN vigente dentro del deadlineoriginal hasta settle; nunca atribuirlo al pendingSet de journal ni declarar drain entre RPCs.
+  Registrar schema7/DOlimit7/ticketlimit2/eventlimit3 y consultas exactas, sin imprimir valores privados/handle/JWT.
+
+- [ ] **8. Medir y comprobar presupuestos sin investigación redundante.** En el mismo GREEN capturar fases baseline/reservation/SEND/SQL/ACK, snapshots, sesiones first-primary y consultas first/all, DOops, HTTPcantidad/peak/tiempos, SQLgate y realresolution. Cada consulta factual primera de una sesión nueva; ningún eventlookupglobal. Distinguir queries preflight versus noticeSchema. Medir GETQA completion antes del deadlinechild en positivo y padre<=30s; no renovar para obtenerGREEN. El fanout original conserva scheduler/peak2 y orden. Nuevo IOobserver no altera guards/returns/resultados; markers originales únicos o restringidos lexicalmente al bloque correspondiente. No ejecutar50ms/allSDK sólo para nuevos números.
+
+- [ ] **9. Checks proporcionales en cloud autorizado.**
+  1. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+  2. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+  3. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+  4. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+  5. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+  6. ESLint dirigido a los diez archivos con herramienta existente; QA/M compilan realmente dentro del harness, conservar metafiles/hash/bytes/perfiles y comparar graph. Compilador estándar adicional sólo conforme preflightroot de paso1.
+  Reusar GREEN aceptados store/journal si sus blobs siguen exactos; el nuevo test ejerce APIs reales. Contar casos seleccionados/no seleccionados, no anunciar0SKIP de toda la suite usando filtros. Una vez pasan, ampliar sólo por defecto, graph/fixture adicional o gate requerido por root. Preservar50ms accepted como evidencia anterior separada, no como resultado de esteHEAD.
+
+- [ ] **10. Checkpoint y revisión.** Commit único de unidad o checkpoints propios permitidos, diff exactoBASE..HEAD y rollbackCAS. Informe con RED/GREENruns/head, conteos reales, schema/queries/source3keys/GETclosedPOST y costo de graph; qualifier temporal retirado si root lo autorizó. Root spec+quality y workflowSDD; writer no crea helpers/reviewers. No cambios de source/public flags por pasar tests. Pendientes restantes quedan expresos, no nuevos PR/merge/main.
+
+## Salida y siguiente unidad
+
+Entregar HEAD/tree/paths, tests seleccionados/costos/bundles y riesgos. El resultado SOURCE prepara formulario deshabilitado y ticket; no representa capacidad pública completa. La siguiente unidad POST debe planificar identidad actual, Origin/CSRF/acción explícita, testigo nativo real en store/child exactos y consentimiento antes de ACK. Después NoticeLink/stages/Selection/third CLOSED, cleanup/drain/mount/hosting siguen revisiones separadas. Rollback código jamás borra tickets/eventos de otro grant ni de este intento.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-05-finite-native-notice-provenance.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-native-notice-provenance.md b/docs/superpowers/plans/2026-11-05-finite-native-notice-provenance.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-native-notice-provenance.md
@@ -0,0 +1,81 @@
+# Finite Native Notice Provenance Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Un único futuro implementer recibe el brief completo de root; no helpers. Root conserva revisión de spec/quality y coordinación de revisión independiente exigida por el workflow vigente. No se despacha implementación ni reviewer desde este plan.
+
+**Status:** INACTIVE. Root debe leer spec/plan, completar preflight y fijar HEAD posterior a aceptación del notice store. La rama docs y el pin7a2 no son ese HEAD.
+
+**Goal:** Registrar seis filas append-once de procedencia de ticket/consentimiento, sin API de autoridad ni integración de receiver.
+
+**Architecture:** Nuevo codec estricto y journal DO separado, usando el patrón issuer de transacción final+sync+readback y retención real. Una fixture nativa SYN compone el store aceptado para demostrar replay/unknownACK/hold; ningún producto existente importa los nuevos módulos.
+
+**Tech Stack:** ESM Node, node:test, Miniflare/workerd SQLite DO + D1, esbuild existentes del repositorio. Ejecución cloud autorizada por root; no deps/build/tests locales.
+
+**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md
+**Context:** docs/superpowers/reports/2026-11-05-finite-native-notice-receiver-design.es.md
+
+## Global Constraints
+
+- SOURCE ONLY/SYN; C0=I0+900000, C1=C0+180000; padre<=30000ms/hija<=5000ms; techo2026-11-03T02:59Z vencido. Sin renewal/rearm/clock injection.
+- Exactamente cinco archivos nuevos de Task1. No modificar store, phase, M, SDK, authority, schemas, cleanup, entrypoints, permisos ni CI permanente.
+- Journal máximo6/list7; no ampliar issuer/SDK. SEND durable no-ACK bloquea siguiente SEND; existing no autoriza SQL. appendAck es DATA interno: procedencia real requiere el futuro handler fijo, no la valida este componente.
+- WeakMap acredita referencia/instancia/lease, nunca identidad o consentimiento humano. Ningún DTO de autoridad, callback aprobador, allowPending, fallback o constructor de witness.
+- Ni seis filas ni ACK prueban source notices, third CLOSED, revocación, drain, subscription, guard, mount, ARM, hosted o PC-off.
+- Sin proveedor, secretos, HTTP runtime, browser, DDL remoto, main, merge ni publicación. operationalReadiness=false; completePackage=false; PCoff=false.
+- Rollback sólo de commit propio con expected-head CAS/readback. Sin borrar journals/D1 ni actividad ajena.
+
+## Review Focus
+
+1. Dos callbacks de transacción que compiten por el mismo SEND: un solo recorded puede continuar, incluso después de recrear journal.
+2. Pérdida tras commit/sync/readback: filas pueden existir sin autorización de continuar; restart no “recupera” ACK desde SQL.
+3. Access POST más corto y permiso absoluto: rechazar ticket incompatible; no recortar retroactivamente ticket ni ampliar expiry.
+4. Congelación y Promise retenida: freeze es histórico; retención real no termina al abort y no prueba drain entre isolates.
+5. DATA con getter/prototipo/hash inconsistente u operación huérfana: error genérico antes de efectos; lectura exhaustiva no ignora séptima clave.
+
+## Task1 — Codec y journal append-once con composición nativa
+
+**Create:**
+- lib/mcp-qa-finite-preparation-notice-records.mjs
+- lib/mcp-qa-finite-preparation-notice-journal.mjs
+- test/mcp-qa-finite-preparation-notice-provenance.test.mjs
+- test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
+- test/fixtures/finite-preparation-notice-provenance-worker.mjs
+
+**Consumes:** initialOwn/initialFields/initialCanonical/initialHash; validateFinitePreparationIssuerIdentity y validadores issuer; captureFinitePreparationIssuerContext({ctx,env}); retainFiniteOwnerStagePromise. Fixture importa store aceptado/constantes schema, no cambia sus firmas. El positivo crea grant con openFence→insertAuthorization→consumeAuthorization→insertReadGrant; monitoring usa las tres firmas propuestas exactas.
+
+**Produces:** seal/encode/decodeFinitePreparationNoticeRecord(kind,input/raw), FINITE_PREPARATION_NOTICE_PREFIX/OPERATIONS; createFinitePreparationNoticeJournal({ctx,env}) con appendReservation(record,lease), appendSend({preconnectionId,record},lease), appendAck({preconnectionId,operation,record},lease), freeze({preconnectionId,record},lease), read({preconnectionId},lease). Resultados/status y campos exactos están en spec; no producir flag ready/authority/drain.
+
+- [ ] **1. Fijar baseline y condiciones de trabajo.** Root entrega HEAD/tree/branch futura y evidencia de aceptación del store; writer comprueba los cinco paths ausentes y snapshots de módulos inmutables. Identificar Actions autorizado y rollback propio. Si el store aceptado difiere en firmas, volver a root antes de ampliar scope. No usar rama activa ajena ni instalar nada.
+
+- [ ] **2. Escribir tests causales antes de implementación.** Codec: reservation válida original, ticket SEND/ACK, consent SEND/ACK(sequence=17 con expectedSequence=0), freeze; exact round-trip. Mutaciones: extra/symbol/getter (contador0), proto/sparse/oversize, hash falso, ventana5001ms, C0/C1 incoherente, Access menor que ticket, consent sin ACK ticket, null/sequence incorrecta. Cada aserción expresa contrato, no copia el body del codec.
+
+- [ ] **3. Crear fixture nativa y RED primaria.** Reusar configuración Miniflare/workerd y patrón issuer fixture; setup SQL/grant nativo finaliza primero y se comprueba grant UUID original. Añadir sólo un stub exportado de la nueva factory que lance el error genérico para que el bundle cargue; no es implementación ni capacidad. Invocarlo sólo tras comprobar grant real: resultado saneado incluye reachedNativeGrant=true y el error de journal. La aserción principal exige journal reservation recorded y falla en esa conducta ausente; no aceptar fallo de bundle/import global, schema setup o timeout como RED. Registrar run/head, gate alcanzado y error concreto. La fixture todavía no implementa lógica de journal ni efectos simulados.
+
+- [ ] **4. Implementar codec según campos exactos.** Snapshot antes de await, estricto own/fields, hashes/domains y16384bytes; deep-freeze detached. Validate context-sensitive Send/Ack al leer journal, porque el codec aislado no tiene reservation. No “validar” autoridad humana a partir de hashes.
+
+- [ ] **5. Implementar journal.** Usar contexto issuer capturado y su retención sin modificaciones; transacción real con inventario limit7. Validar estructura/enlaces de todo inventario; si clave ya existe, comparar bytes y devolver existing antes de reglas de progresión que impedirían nueva escritura tras freeze. Para clave nueva aplicar transiciones de spec. Esperar retorno final, sync y readback exacto. Forma inválida lanza; fallo append después de preparar devuelve uncertain. No timer/retry/recovery/delete.
+
+- [ ] **6. Completar GREEN nativo significativo.** Casos y assertions obligatorios:
+  - grant/ticket/observación/consent reales y rowhash exactos; leer desde journal nuevo entre GET y POST; misma witness/store/child en observe+consent, MAX por grant0, sequence global17 o >1 realmente asignada (filas ajenas SYN preservadas).
+  - dos appendSend concurrentes iguales→statuses recorded/existing exactos; fixture emite SQL sólo para recorded; contador SQL de mutación1. Otro ticket/reservation conflictivo nunca reemplaza.
+  - freeze con o sin SEND/ACK preserva registros, niega todo nuevo SEND/ACK; replay byte-idéntico existing sin SQL.
+  - native transaction callback throw→0fila; final-return throw/sync loss/readback loss después de commit→fila real posible y uncertain, contador SQL no aumenta.
+  - actual SQL result throw después de commit→evento/ticket existe, SEND sin ACK; journal nuevo conserva SEND pendiente y niega consent SEND sin ticket ACK; fixture no reconstruye ACK desde SQL. No afirmar que appendAck autentica arbitrarios callers internos.
+  - Retención SYN externa: iniciar observeFiniteReadOnlyWork con ctx original y retener la Promise REAL de transaction/SQL; alcanzar el gate antes de abortar esa lease. Con el mismo ctx, intentar únicamente otro scope observer sin efectos usando una lease SYN distinta, comprobada vigente/no abortada y dentro del MISMO deadline original: debe rechazar por outstanding.has(ctx), no por reutilizar la lease abortada. Tras settle real de todas las Promises del scope original, el mismo observer sin efectos puede entrar si esa lease SYN aún sigue vigente. La exclusión pertenece a stage-work (lib/mcp-qa-finite-stage-work.mjs:8–23,54–62 @7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be, bloba89baeb2578856dadedf700f9d66e180eb09120e), NO al journal: captureFinitePreparationIssuerContext.wait sólo conserva pending privado y leaseGuard no lo consulta (lib/mcp-qa-finite-preparation-issuer-journal.mjs:14–23, blob414450aa08f797bed5a41cf5cc697342785ce16b). No usar esto como prueba de exclusión entre métodos journal, autorización de nueva lease o drain entre RPCs; no añadir guards/interfaces.
+  - clave extra/séptima fila/huérfano/metadata actor/version cambiada niegan. Capturar sin filtrar inventario desconocido.
+  - Access menor que ticket, ventanas/reloj fuera de límite y getter count0 no generan mutaciones.
+  Para pérdida SQL, fixture conserva pending y no llama appendAck desde lectura; la prueba demuestra que el protocolo fuente no hace replay, no que journal autentica al fixture.
+
+- [ ] **7. Ejecutar checks proporcionales en cloud autorizado.**
+  - node --test test/mcp-qa-finite-preparation-notice-provenance.test.mjs
+  - node --test test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
+  - node --test test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs
+  - Lint dirigido a los cinco archivos con ESLint ya instalado del repo.
+  Exigir0FAIL/0SKIP en nuevos casos; reportar cantidad/builds/run/head. Regresión store no debe afirmar enabled:false tras revokeGrant: autoridad real rechaza Monitoring authorization unavailable y conserva evento. No ejecutar esa prueba para modificar authority ni rehacer D0.4. Diff debe demostrar fase/M/SDK intactos, incluido exchanged_at actual y ACK histórico. Cualquier graph nuevo en producto requiere volver a root.
+
+- [ ] **8. Guardar checkpoint y revisión root.** Un commit propio de cinco archivos, informe breve con RED causal/GREEN nativo, diff BASE..HEAD y pendientes. Si root autoriza qualifier temporal contents:read sin secretos, retirarlo del diff final y registrar run/head; este plan no lo autoriza por sí mismo. Root revisa spec/quality y aplica workflow SDD vigente; writer no crea helpers/reviewer. No segundo writer simultáneo.
+
+- [ ] **9. Cerrar sólo esta unidad.** Entregar HEAD/tree/cinco paths/tests/limitaciones; no importar journal en runtime ni extender fase. Root puede aceptar SOURCE y seleccionar una siguiente unidad distinta. La aceptación no activa el receiver ni habilita API/humano/PC-off.
+
+## Handoff posterior explícito, fuera del plan
+
+El receiver fijo requiere diseño/plan propios de lib/mcp-qa-finite-owner-notice-{qa,wire,forward}.mjs y extensión léxica de phase-context. Debe derivar actor/source/preconnection/original grant del par factual, verificar Access firmado y approved-ticket original, Origin/CSRF/form reales antes de SEND, y llamar store nativo antes del ACK/UI. No puede usar host ordinario ni convertir su consentimiento post-ACK en uno cercado. POST estrecha techo actual, no reemplaza original. notices/third CLOSED, tres receipts/Selection, own-SEND/full setup, retirada/cleanup/drain y hosting permanecen cerrados hasta sus productores y pruebas reales.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-05-finite-owner-exchange-continuity.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-owner-exchange-continuity.md b/docs/superpowers/plans/2026-11-05-finite-owner-exchange-continuity.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-owner-exchange-continuity.md
@@ -0,0 +1,115 @@
+# Finite Owner Exchange Continuity Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development under the standing root method to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
+
+**Goal:** Restaurar la lectura factual read_consent después de D0.3 preservando el ACK original y el exchanged_at nativo actual en los frames.
+
+**Architecture:** issuerPrimary valida por separado la columna mutable y reconstruye exchanged_at:'' únicamente para comparar el ACK histórico del grant. El mismo lector/DTO, snapshots completos y recheck owned siguen estrictos; una prueba D0.3 existente proporciona el camino causal real.
+
+**Tech Stack:** JavaScript ESM, Node test runner, SDK OAuth/MCP y esbuild/Miniflare del harness nativo ya existente. Sin dependencia nueva ni runtime remoto.
+
+**Spec:** [2026-11-05-finite-owner-exchange-continuity.md](../specs/2026-11-05-finite-owner-exchange-continuity.md)
+
+## Global Constraints
+
+- DESIGN ONLY; INACTIVE hasta aceptación/revisión de root y despacho con BASE de producto futuro después de fanout. No es aprobación del owner.
+- Producto inspeccionado51c5db8e987755ccf2819ba861461916e0396943/árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630; padre documental44d0490a3c7a33ad483499a70696689597ebf2c6, rama docs/finite-native-notices-design-20261105. No seguir al writer activo.
+- No cambiar ACK bytes/rowHash/recordHash/domain, el grant actual retornado, frames, DTO de tres claves o recheck owned.
+- exchanged_at es '' o ISO canónico finito, <=ahora, >=created_at, <expires_at; ningún timestamp acredita token/consentimiento o permiso nuevo.
+- Mantener C0/C1, padre<=30000ms e hija<=5000ms y el techo vencido2026-11-03T02:59Z. operationalReadiness=false; completePackage=false; PCoff=false.
+- No ordinary M/store/SDK/schema/permiso/clock/source stub/notice/mount/transport change, nuevo export/factory, allowPending o refactor/split.
+- Notice-store diseño permanece INACTIVE e intacto. Este plan no activa unidad posterior.
+- GitHub/runner cloud existente autorizado solamente; sin clon/dependencias/tests/build locales, nuevo workflow, live probe, proveedor/AFW, credenciales o nuevo servicio.
+- No imprimir token/código/JWT/KV ni filas privadas; evidencia saneada de assertions/counts/flags.
+
+## Review Focus
+
+- La copia del ACK termina en issuerRows/frame/expected y oculta drift válido: caso D04 de segunda observación con dos valores válidos distintos.
+- Antes del fix RED ocurre por seed/SDK y no por el ACK: positivo D04 exige fase pre-token correcta, token/MCP positivos, ACK original intacto y única diferencia de columna antes del assert final.
+- Copia construida para grant ausente o proyección de otros campos: afectados de issuer sin grant, unknown ACK y casos immutable tamper deben seguir negando.
+- Nuevos bounds aceptan canonical timestamp anterior a created o no canónico parseable: matriz D04 y boundary inclusivo created_at; sin Date patch.
+- Cambiar validación factual vuelve permisivo el owned/pending SDK: lector real debe negar complete retenido antes de reducción y conserva los casos approve/unknown existentes.
+
+---
+
+## File structure
+
+Modificar lib/mcp-qa-finite-owner-phase-context.mjs sólo en issuerPrimary, validación exchanged_at y argumento rowAck grant (pin212-241).
+Modificar test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs para casos D04, usando world/issued/exchange/readSummary/plain originales y sdkReadCurrent/snapshot existentes.
+Modificar test/fixtures/finite-initial-entry-world.mjs sólo con un branch SYN 'exchange' en el seam phaseDrift de observación2 (pin154). No nueva API QA ni otro archivo fixture.
+
+El recibo futuro de implementación será docs/superpowers/reports/2026-11-05-finite-owner-exchange-continuity.md; el recibo -design actual permanece como diseño.
+
+## Task 1: Post-token native factual continuity
+
+**Files:** los tres indicados arriba; sin otro archivo producto/test.
+
+**Interfaces consumed:** readPrivateQaFiniteOwnerContext({ctx,env,parent[,preconnectionId]}) y sdkReadCurrent() reales; snapshot(), sdkGrant(id), sdkGrants() y native f.db; issued(f), exchange(f,x), readSummary(f,token); codec Ack y initialHash existentes para **assertions**, no para sustituir fuente.
+
+**Interfaces produced:** ninguna nueva pública. El mismo DTO {source,preconnectionId,capsuleHash}, read_consent después de intercambio genuino bajo el mismo original. Único seam SYN adicional: f.phaseDrift='exchange', f.exchangeDrift={grantId,exchangedAt}, con phaseObservation reiniciado antes del lector; branch fijo UPDATE exchanged_at WHERE id original en observación2.
+
+- [ ] **Step 1: Añadir el positivo causal D04 y hostiles en el archivo D0.3 existente.**
+
+  Test principal `D04 actual exchange retains factual read_consent and immutable grant ACK`:
+  1. Usar world normal/issued reales; sdkReadCurrent pre-token debe dar read_consent, identidad/source esperadas y Object.keys ordenadas exactamente ['capsuleHash','preconnectionId','source'].
+  2. Leer snapshot y el grant:ack por prefix/preconnection original; decodificar Ack y conservar raw bytes, recordHash y rowHash; comparar rowHash con initialHash('afw.finite-preparation-issuer-row.v1',grant nativo pre-token).
+  3. exchange real200 y readSummary real original positivo; grant nativo con mismo UUID y sólo exchanged_at cambiado.
+  4. Assert hash fila actual!==ACK.rowHash y hash copia de esa fila con exchanged_at:''===ACK.rowHash; ningún ACK fue reescrito.
+  5. Llamar sdkReadCurrent real y exigir read_consent, DTO original de tres claves y source/owner original. Releer ACK/snapshot y exigir bytes y hashes idénticos, histórico igual y sólo el grant original nuevo. Fuente no puede ser un helper positivo ni un resultado construido.
+
+  Añadir tests D04 por mundo aislado, siempre después de token/MCP genuinos:
+  - `D04 actual reader rejects native exchanged_at <fault>`: not-a-time; ISO equivalente sin canonical milliseconds/UTC; future=Date.now()+60000 con assert <expiry; created_at-1ms; expires_at; expires_at+1ms. Sólo UPDATE nativo de exchanged_at, sin cambiar ACK ni reloj. assert unavailable y ninguna nueva mutación productiva.
+  - `D04 actual reader permits native inclusive created boundary without granting authority`: exchanged_at=created_at, ambos snapshots estables, fase correcta; rotular el UPDATE como SYN y no como emisión SDK.
+  - `D04 actual reader retains immutable native checks <field>`: id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at y site_projects owner/revisión. Cambiar sólo el dato señalado; para fechas delta1ms que no invalide unrelated timing y assert precondición. Todos unavailable con ACK/journal idénticos; históricos sin tocar y ningún fallback a otra fila.
+  - `D04 actual reader sees valid exchanged_at drift between native snapshots`: elegir alternativa válida diferente como en spec; set phaseObservation=0, phaseDrift='exchange', exchangeDrift original; sdkReadCurrent unavailable, phaseObservation===2, fila realmente modificada al valor esperado, ACK idéntico. No entregar frames falsos ni cambiar SELECT retornado.
+  - En test existente `held actual SDK completion settles late after original terminal fence and real grant reduction`, añadir sdkReadCurrent unavailable cuando sdk_complete:send existe sin observed, **antes** de reducir grant/release. Conservar todos sus asserts posteriores y no mover el punto de retención.
+
+  Única adición de fixture: branch de drift 'exchange' al segundo pointer read existente. Usa sentencia fija UPDATE nativa con UUID original y timestamp SYN; todos los otros phaseDrift intactos. No modificar sdkReadCurrent, source, stores ni algoritmos para fabricar positivos. No registrar datos secretos; hashes/filas se comparan sólo dentro del test.
+
+- [ ] **Step 2: Ejecutar el RED real del positivo en el cloud task autorizado.**
+
+  Después de activación de root con BASE futuro:
+  `node --test --test-name-pattern="D04 actual exchange retains factual read_consent and immutable grant ACK" test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`
+
+  Esperado: antes de cambiar producción, fase pre-token correcta, token/MCP positivos, fila actual cuyo hash difiere sólo por exchanged_at y ACK original válido; fallo en assert de la fase post-token, resultado unavailable. Fallo por fixture/instalación/SDK/seed no califica. Conservar assertion/head/tree/run/job/attempt y flags saneados de los prerequisitos; no nuevo reason code o instrumentación de fallo en producto.
+
+- [ ] **Step 3: Corregir únicamente la comparación histórica y los bounds actuales.**
+
+  En issuerPrimary conservar iso actual y todos los guards. Para exchanged_at no vacío exigir ISO safe/finite, <=Date.now(), >=grant.created_at y <grant.expires_at. Sólo rowAck('grant',...) recibe copia con exchanged_at:''; fila ausente conserva su ausencia. No mutar grant, ACK ni expected y no tocar rowAck general/otros tipos. issuerPrimary retorna el grant actual; snapshot y recheckOwned completos permanecen exactamente como están.
+
+  No extraer helper/export nuevo ni alterar estructura/orden de snapshots o la programación fanout aceptada. No agregar caller DTO, report/source factory o allowPending para superar tests.
+
+- [ ] **Step 4: Ejecutar GREEN seleccionado y afectados, una vez.**
+
+  Nuevos casos y camino D0.3 afectado:
+  `node --test --test-name-pattern="D04|valid actual QA code exchanges through actual M bounded response and actual MCP original permission|held actual SDK completion settles late after original terminal fence and real grant reduction" test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`
+
+  Regresiones SDK seleccionadas:
+  `node --test --test-name-pattern="held actual approve denies fabricated results|owned approve recheck rejects original issuer" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`
+
+  Regresiones phase seleccionadas:
+  `node --test --test-name-pattern="primary issuer prefixes remain facts not next-stage permission: (reservation|linked)|unknown issuer SEND denies grant|original primary issuer denies (revoked-grant|unknown-ack)|fresh current owner and current publication are independently rechecked: grant|absent original issuer never triggers a global grant lookup" test/mcp-qa-finite-owner-phase-context-native.test.mjs`
+
+  Esperado: todos los casos seleccionados pasan, sin fallo o skip inesperado. Informar por separado los tests excluidos intencionalmente por patrón; no llamar suite completa a estos runs ni repetir57/80 por defecto.
+
+  Lint existente:
+  `node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs test/fixtures/finite-initial-entry-world.mjs`
+
+  Sin npm full CI ni compiler estándar si el diff permanece unmounted, sin imports/graph nuevos. El harness ya compila los módulos reales; no descargar herramientas. Ante falla nueva relevante, corregir dentro del alcance y repetir sólo checks afectados; no encubrir una fase unavailable ampliando permisos/tiempos.
+
+- [ ] **Step 5: Revisar diff, registrar evidencia y commit por lease.**
+
+  Verificar con BASE futuro aceptado que sólo cambian las tres superficies cerradas. ACK/rowHash/domain/SDK/M/store/schema y programación fuente originales permanecen; copia histórica sólo en rowAck. Inspeccionar que issuerRows.grant/frames y owned expected no la reciben.
+
+  Escribir recibo de implementación con source BASE/head/tree, RED/GREEN reales y counts/warnings/selecciones, ACK bytes/hash invariantes como assertions, bounds y drift observación2 alcanzado. Separar native calls de mutación SYN y condiciones temporalmente redundantes. Mantener sourceceiling vencido y flags false.
+
+  Commit candidato `fix(afw): preserve factual owner continuity after code exchange` en rama aislada autorizada, expected-head CAS. Root revisa y decide aceptación antes de cualquier otro bloque. No merge/main/runtime/probe/notice store activado.
+
+## Self-review
+
+Una tarea y un RED/GREEN causal real. Firma/DTO exactos; ninguna nueva autoridad. Test principal usa la API existente y demuestra la única diferencia antes del assert RED. Timestamp inválido y mutaciones inmutables no arreglan su propio ACK. Drift con dos valores válidos comprueba preservación del frame; no promete detectar cambios posteriores a observación. Los cinco Review Focus tienen casos explícitos y regresiones seleccionadas. El hook fixture mínimo sólo es necesario para ubicar el cambio nativo entre snapshots, no para el positivo. Diseño revisable; steps sin ejecutar y activación reservada a root.
+
+
+## Root D0.4 SOURCE activation — 5 November2026
+
+Containingcommitacceptsfanout90bb28b5afterindependentreview+fix1ADDRESSEDandactivatesONLYD0.4exchangecontinuity. EarlierDESIGNONLY/INACTIVEheadersareinspectionhistory. ActualexecutionBASEisthiscontainingcommitprovidedindispatch. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-exchange-continuity.mdandrootpreflightgovern. StandingSDDsinglewriter/freshreview;own temporarycloudqualifierallowedremovedfinal,no productionworkflow. Preserveacceptedfanoutandfixturecorrections. NoticeSTORE/journal/receiver/fullsetup/cleanup/mount/Entry remainINACTIVE. No realalias/runtime/permissions/clockrenewal. operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-05-finite-owner-io-fanout.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-owner-io-fanout.md b/docs/superpowers/plans/2026-11-05-finite-owner-io-fanout.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-owner-io-fanout.md
@@ -0,0 +1,145 @@
+# Finite Owner I/O Fanout Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
+
+**Goal:** Qualify fixed two-branch provider read concurrency within each existing owner phase snapshot, preserving every read and guard.
+
+**Architecture:** Keep the private observation engine and its original native scopes. Join two full credential verifications, then join fixed QA/M read branches; only the complete joined DATA can reach common binding validation and the existing two-snapshot comparison. Do not change leases, stage-work, Unit2a, SDK or clocks.
+
+**Tech Stack:** Existing JavaScript ES modules, native Promise/AsyncLocalStorage, Node node:test, repository-pinned Miniflare/workerd/esbuild and actual workers-oauth-provider; no new dependency.
+
+**Spec:** [../specs/2026-11-05-finite-owner-io-fanout.md](../specs/2026-11-05-finite-owner-io-fanout.md). Read it alongside this plan.
+
+**State:** **INACTIVE / DESIGN ONLY.** Root selected preparation, not execution. Root reviews/rejects and later supplies an activation BASE after D0.3 acceptance; there is one product writer. This plan's inspected source is d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72; do not implement on this docs branch or overwrite later source. No task/CI/runtime is dispatched by saving these files.
+
+## Global Constraints
+
+- Maximum **2 actual provider fetch/body/cancel lifecycles**; fixed structural bound, no caller option.
+- Original child **≤5000ms**; original root **≤30000ms**; original Date.now/performance.now predicates and all earlier expirations unchanged.
+- Static source ceiling **2026-11-03T02:59:00Z** unchanged/expired; test fixture substitution remains SYN.
+- Original two complete snapshots and facts A→primary A→qualify A→primary B→facts B→qualify B order.
+- Two fully verified credentials before QA/M branches; preserve QA pointer→QA version and M pointer→initial M version→ownedProject SELECT→current M version.
+- Every endpoint, response/body/module validation, native holder, source/owner/fence/current config check remains; caps8192/65536/4500000B; no cache/reuse/clock widening/D1 aggregation.
+- Same native SDK, lexical result/pending semantics, Unit2a store and genuine same-child consumption witness; no public interfaces/options/callbacks/authority DTOs.
+- 112 provider GET in successful full consume/grant child;84 in SEND→grant ACK timestamp interval;80 factual D1 SELECT+16 preflight+2 writes in full child unchanged.
+- All actual started promises retained through settlement; race/abort/timeout is not physical drain. No effect from partial winner or late settlement.
+- SOURCE work only after root activation, in authorized cloud; no local installs/builds/containers. No runtime/provider/credentials/permissions/Entry/real grant.
+- operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Review Focus
+
+- Credential one-side rejection while sibling headers/body remain held: no descriptor request or partial source; retain the actual sibling.
+- Primary branch failure while the other progresses through further read-only requests: never exceed2 live cycles or begin the next snapshot/effect.
+- Authenticated owner/config/pointer drift around a join: preserve existing next-checkpoint denial without claiming atomic provider state.
+- Slow native body cancellation after a raced child/root: keep the scope unavailable until every real promise settles; no release from wrapper settlement.
+- Test instrumentation changing counts or SDK behavior: retain uninstrumented positive; I/O mode adds no strict-reader probes, source calls or fake successful results.
+
+Each focus has named tests below. This is one unit; calibration is an internal gate, not a second product task.
+
+---
+
+### Task 1: Fixed within-snapshot provider fanout with native causal qualification
+
+**Files:**
+
+- Modify product: `lib/mcp-qa-finite-owner-phase-context.mjs`, credentials()/primary() around inspectedL145–189 only; keep request helperL92–107, factual engine and handler unchanged except lexical movement of these existing read/validation blocks.
+- Modify test: `test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`; reuse its world()/consent()/issued() setup and add named fanout cases.
+- Modify test fixture: `test/fixtures/finite-initial-entry-world.mjs`; explicitly gated mocked-provider delay and I/O-only mode selection, normal mode defaults unchanged.
+- Modify test fixture: `test/fixtures/finite-owner-qa-sdk.mjs`; expose test-only I/O trace/holds from instrumented native context; preserve existing D0.2 observed/unobserved branches.
+- Create test fixture: `test/fixtures/finite-owner-io-fanout.mjs`; read-only source instrumentation for timings/lifecycle/hold boundaries, exact-match fail-closed replacements and sanitized trace decoding.
+- Read-only regressions: `test/mcp-qa-finite-owner-phase-context-native.test.mjs`, `test/mcp-qa-finite-owner-request-retention-native.test.mjs`, `test/mcp-qa-finite-owner-request-retention.test.mjs`, `test/mcp-qa-finite-preparation-issuer-native.test.mjs`, `test/mcp-qa-finite-profile-native.test.mjs`, `test/mcp-qa-finite-profile.test.mjs`, `test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs`.
+- **No edits:** `lib/mcp-qa-finite-initial-lease.mjs`, `lib/mcp-qa-finite-stage-work.mjs`, issuer-store/journals/SQL, forwarder/receiver/token host, SDK version/profiles/config, workflows or dependencies. If a fixture requires an additional file, stop and submit the exact need to root instead of broadening silently.
+
+**Interfaces:**
+
+- Consume existing observeOwnerPhasePair({ctx,env,parent,preconnectionId?}), request(path,cap=65536,token=reader), child(work), owned(), retain(promise), current(clock.lease); no signature changes.
+- Private product functions exactly as spec: verifyCredential(token:string,id:string,expiresAt:number):Promise<void>; credentials():Promise<void>; readQaPrimary():Promise<{qaMetadata}>; readMPrimary():Promise<{project,pointer,currentConfiguration,configuration,initialBaseline}>; primary():Promise<{project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline}>. All nested in the same run closure, not exported.
+- Test-only new mode: `phase-context-sdk-io-observed`. Keep current `phase-context-sdk`, `phase-context-sdk-observed` and restart behavior intact. Extend world(fn,{observed=true,restart=false,ioObserved=false}={}); ioObserved requires observed=false and restart=false for the timing trial, otherwise test setup throws.
+- Test-fixture signature extension only: extendFiniteOwnerQaSdk(entry:string,{observed=false,ioObserved=false}={}):string; initialEntryHarness passes ioObserved=true only for the new exact mode. finiteOwnerSdkWorkers(qa,{observed=false}={}) remains unchanged and receives observed=false for that mode.
+- Fixture helper exports: instrumentFiniteOwnerIoFanout(source:string):string; decodeFiniteOwnerIoTrace(value:unknown):ReadonlyArray<IoEvent>. Neither is imported by product.
+- IoEvent exact DATA fields: {kind,ordinal,primaryOrdinal,branch,endpoint,phase,at,bytes,outcome}; nullable fields permitted only when inapplicable. kind∈{child,primary,provider,join}; branch∈{credential,qa,m,null}; endpoint∈{verify-reader,verify-publisher,qa-deployment,qa-version,m-deployment,m-initial-version,m-current-version,null}; phase∈{start,headers,body-settled,cancel-start,cancel-settled,settled}; outcome∈{fulfilled,rejected,null}; at finite native milliseconds, counters nonnegative integers. No headers/tokens/URLs/resource IDs/content.
+- Test-only DO methods: ioObservation():Promise<ReadonlyArray<IoEvent>>, ioHold(point), ioRelease(point). Fixed points=credential-reader-body,credential-publisher-body,qa-body,m-body,qa-cancel,m-cancel,after-primary-join; arguments are fixed test enum only. They pause an actual operation and never forge its return or frame.
+- Host fixture property `f.ownerIoDelayMs` defaults0; allowed0/50 for this task. `f.ownerIoReady` defaultsfalse and becomes true only in the test after original setup plus valid GET consent. Provider GET delay is applied only when ready and mode matches. No injected delay to fixture setup/JWKS/ledger/D1/SDK. Error/hold configuration remains test-only.
+
+- [ ] **Step 1: Record activated source and prepare causal tests before product edits.**
+
+  Root activation must identify BASE and sole writer after D0.3. Compare its phase/fixture changes with d630 and preserve all accepted changes; report conflicts, never rewind. In cloud, add the isolated I/O mode and named tests below while product is still serial. Native clocks remain real. Source instrumentation observes entry/settlement and may hold operations; it must not replace read return values, common validation, SDK outcomes, app grant or real calls.
+
+  I/O-only instrumentation uses exact-one marker checks, not permissive replaceAll that silently matches nothing/many. Existing sdk-observed injects strict-reader source calls at SEND; **do not combine it with I/O timing**. New I/O mode leaves actual SDK/KV methods unwrapped. Instrument the **whole** original child around its consume/grant block, including initial recheck and final durable ACK/recheck; the observer may record original l/w identity equality as booleans in existing probes, never return a lease or witness.
+
+  Lifecycle starts before actual fetch and settles only after actual stream read/cancel finally has settled, including rejection. If an outbound response wrapper is used, its headers return is not cycle completion. Fixture traces must verify all expected marker matches and startup cleanup on failure.
+
+- [ ] **Step 2: Establish the unmodified serial control and the50ms RED cause.**
+
+  Add these tests in the existing SDK native test file:
+
+  | Exact test name | Causal assertions |
+  | --- | --- |
+  | fanout causal control keeps full native child volume | delay0; successful actual POST; full child112 with per-endpoint counts{verify-reader:16,verify-publisher:16,qa-deployment:16,qa-version:16,m-deployment:16,m-initial-version:16,m-current-version:16}; SEND→ACK84; no unexplained category; before change peak1 recorded, candidate peak≤2 |
+  | fanout 50ms provider delay fits the original same child | after valid GET set ready=true/delay50; POST must302, same genuine store/child, child elapsed<5000 and original ACK deadline; code/grant remains actual, not trace authority |
+  | fanout fixed two branches preserve credential and snapshot barriers | cause overlapping provider cycles, assert peak===2 and never>2; no descriptor start before both verify fully settled+validated; QA/M dependencies and primary ordering; every full child count unchanged |
+
+  Run future cloud commands from repository root:
+  `node --test --test-concurrency=1 --test-name-pattern="fanout causal control|fanout 50ms|fanout fixed two" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`
+
+  Expected before product edit: delay0 passes;50ms expected-success test fails because the original child expires, not because setup, observer or fixture construction failed; fixed-two test shows peak1. Record statuses, native elapsed/margin, provider prefix counts and expiry cause without data. Serial full112 delay50 requires≥5600ms of added waiting, so it cannot fit5s; a failed run may stop before112 and must not fabricate a full multiset. No baseline reconstruction/mock source success.
+
+  **Calibration gate:** if delay0 fails, fix the observer/setup independently before using its timings. If50ms RED occurs outside the intended child or no causal expiry is established, stop and report actual timing/depth to root. Do not move delay into preparation, backdate Date, alter clocks, relax assertions or silently choose another delay. No implementation acceptance based solely on RED.
+
+- [ ] **Step 3: Implement only the fixed private schedule.**
+
+  In phase-context extract the unchanged per-credential block into verifyCredential and QA/M blocks into the named private functions. credentials creates exactly two retained promises from fixed lexical calls and retains a Promise.allSettled join; require both fulfilled then current(clock.lease). primary awaits credentials, creates exactly two retained fixed branch promises, joins them the same way, checks current again, then performs the original two qualifyFiniteOwnerSdkBindingFacts calls and builds the original PhysicalObservation.
+
+  Neither branch begins another request until its prior request/finally completes; if a child wait rejects, that branch ends. Preserve request lifecycle retention verbatim. A join with a rejected branch throws the original fail-closed phase error, does not return its sibling DATA and does not start a snapshot/effect. No fallback, cache, dynamic pool, branch-selector option or authority object. No changes to initial-lease or stage-work are required by inspected source.
+
+- [ ] **Step 4: Verify GREEN for the same causal workload and honest Date.**
+
+  Run the exact Step2 command at the candidate head. Required: delay0 and delay50 actual result assertions pass, two cycles demonstrably overlap, peak≤2 across headers/body/cancel, all112 successful-child GET unchanged, original child/root deadlines intact. The test delay waits at least50ms on native performance.now, using bounded timer awaits rather than spin or fake clocks; report actual elapsed if scheduling adds more. The provider response Date is produced from real Date.now at headers emission after the test delay; nowOffset stays0 in the timed flow.
+
+  Report observed full-child elapsed, durable ACK/final recheck completion and remaining margin, not just grantAck.observedAt. Nominal fanout depth64×50=3200ms plus native/DO/D1/payload/tail may still exceed5s. If it does, report FAILED viability under50ms with actual timing and stop for root's ruling; do not mark Task1 complete or tune a passing threshold. Keep the source change reviewable, not operationally enabled.
+
+- [ ] **Step 5: Add and run hostile native join/lifecycle cases.**
+
+  Add parameterized cases with these exact name prefixes; each assertion is observable outcome/state/trace, not function text:
+
+  | Name prefix and variants | Assertions |
+  | --- | --- |
+  | fanout credential failure retains held sibling [reader,publisher] | actual other credential body held; first rejects; no descriptor starts, no form/SDK/grant; foreign root denied until held body and cancel settle |
+  | fanout branch failure cannot release held sibling [qa,m] | one real body held, other rejects HTTP/envelope; no partial success, no next primary/effect, peak≤2 even after timeout; release is settlement only |
+  | fanout current facts drift denies at join [owner,pointer,module,configuration]×[before-join,after-join,between-snapshots] | mutate actual fixture data at a causal barrier; before-join data must be read by the affected branch; after-join mutation is placed after the first primary of the pair and must be read at its second existing primary; original validation denies before its following effect/ACK; no claim to detect unobserved post-checkpoint change |
+  | fanout native abort retains body and cancel [parent,request-signal]×[body,cancel] | use actual propagated native abort boundary, hold real pending work; no late ACK/code/grant, original scope stays occupied until all settle; aborting a dispatch wrapper alone is not assumed propagated |
+  | fanout sibling lease expiry never renews outer child | late headers/body beyond original child denies even if other branch already finished; no replacement child or new SDK continuation |
+  | fanout completed sibling never masks holder replacement | replace native holder while other branch held; after release fail closed, no frame/result-authority fallback |
+
+  Use real denied/occupied observations already exposed by the native fixture, not swallowed exception text. For after-join hooks, pause at the join AFTER actual original validations and mutate ahead of the next existing primary; never insert an extra successful check to make the test pass. Restore/release held mocks in finally; await actual settlement then dispose. Unknown/late success remains in its original journal state.
+
+  Run:
+  `node --test --test-concurrency=1 --test-name-pattern="fanout" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`
+  Required all named cases PASS with no skipped hostile variant, all lifecycle counters settled at cleanup, no unhandled rejection. Do not interpret a denied HTTP response as physical drainage.
+
+- [ ] **Step 6: Run affected existing qualification, including the independent SDK positive.**
+
+  In authorized cloud run:
+  `node --test --test-concurrency=1 test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/mcp-qa-finite-owner-phase-context-native.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs`
+
+  Preserve the existing exact test **uninstrumented actual native source/SDK/Unit2a GET POST returns one original grant and code** with unwrapped KV/SDK and no I/O source transforms. Preserve actual handler SQL queued5100ms open/grant denial, same-store/same-child probes, strict reader denial at own unresolved SEND, no new authority from journal DTOs, no-schema/lone-source/malformed variants, stable prior profiles and original pair503 result. Existing observer failures are not permission to weaken those checks.
+
+  Verify controlled-file lint:
+  `npx eslint lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs`
+
+  No broad npm/build invocation until this affected gate passes or a concrete new concern justifies it. For root's integration gate, preserve the repository full Node command `npm test` once on the final candidate; accepted equivalent CI may satisfy it. Required repository lint/build remain integration checks through established cloud CI, not a new deploy or duplicated all-scope benchmark. Keep exact run/head/results and distinguish affected gate from full-node qualification.
+
+- [ ] **Step 7: Review the single unit and commit its exact scope.**
+
+  Check source diff contains only scheduling/extraction; all request/header/body/caps, fields, comparisons, module downloads, D1/store/SDK paths and leases unchanged. Compare source variants and successful count/byte expectations with unmodified control. Ask root/fresh authorized review to reject or accept this whole unit; report calibration failure honestly.
+
+  Future cloud commit commands (not run by this design task):
+  `git add lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs`
+  `git commit -m "perf(afw): bound owner primary provider reads to two concurrent lifecycles"`
+
+  Deliver commit/ref, exact test heads and counts, child112/interval84 trace, RED/GREEN or failed50ms record, unresolved risks and false operational flags. No merge, deployment, access installation, CI dispatch outside activation, real probe, or second product writer follows automatically.
+
+
+## Root SOURCE activation — 5 November2026
+
+ContainingcommitacceptsD0.3c35716e6afterfreshSpecPass/QualityApproved; actualexecutionBASEisthiscontainingcommitprovidedindispatch. ActivatesONLYfanoutTask1withbriefdocs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md. OriginalINACTIVEdesignheadersaredatedhistory. Rootpreflightboundariesprevail: own temporaryscopedcloudqualifierallowed/removalfinal; no wholebranchtest/build/lint/newstandardcompilerifgraphstillunmountedunchanged. Noalias/runtime/Entry/credentials/sourceceilingrenewal. Oneproductwriter, fixed2lifecycles/allreads/original5s30s; operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-05-finite-preparation-notice-store.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-05-finite-preparation-notice-store.md b/docs/superpowers/plans/2026-11-05-finite-preparation-notice-store.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-05-finite-preparation-notice-store.md
@@ -0,0 +1,114 @@
+# Finite Preparation Notice Store Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. One fresh implementer for this task; root provides the complete task brief and performs independent task review. Steps use checkbox (`- [ ]`) syntax for tracking.
+
+**Goal:** Añadir exclusivamente las tres operaciones de ticket/primer consentimiento finite al issuer store original, con cercado SQL y testigo nativo de una sola utilización.
+
+**Architecture:** La misma instancia existente conserva holders, grant UUID y testigos originales y añade un WeakMap privado para el ticket observado. Dos INSERT SELECT y un SELECT primario condicional comparten la cerca/owner/expiry actuales; ninguna fuente, ruta, journal o receptor se activa.
+
+**Tech Stack:** JavaScript ESM, helpers DATA/issuer actuales, D1 SQLite nativo, esbuild/Miniflare/Node test runner ya instalados en el runner cloud autorizado. Sin dependencias nuevas.
+
+**Spec:** [2026-11-05-finite-preparation-notice-store.md](../specs/2026-11-05-finite-preparation-notice-store.md)
+
+## Global Constraints
+
+- DESIGN ONLY; implementación INACTIVE hasta revisión de root y despacho con HEAD aceptado futuro. No usar automáticamente el pin documental como producto.
+- PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006). Producto inspeccionado51c5db8e987755ccf2819ba861461916e0396943/árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630. Rama docs/finite-native-notices-design-20261105; no seguir al writer activo de fanout.
+- Preservar todos los métodos, SQL, esquemas, testigos, journals y blobs actuales del issuer.
+- C0=I0+900000 y C1=C0+180000; padre original<=30000ms, operación hija<=5000ms; reloj nativo sin compensación.
+- El techo fuente2026-11-03T02:59Z está vencido. operationalReadiness=false; completePackage=false; PCoff=false. Ninguna prueba de componente renueva ventanas reales.
+- Sólo primer grant de avisos; no revoke ordinario, nuevo UUID, callbacks de autoridad, source factories, allowPending, idempotencia durable inventada ni fallback.
+- Sólo tres archivos producto/test del mapa siguiente. No nueva tabla SQL, migración, schema helper separado, codec ni notice journal.
+- No host ordinario, phase-context, SDK/alias, source stub, mount, transporte, cleanup, config, permiso, provider/AFW call o runtime nuevo.
+- No clones, dependencias, tests/build locales. Después de activación usar el runner cloud existente autorizado y revisión exacta; no crear workflow, permisos o servicio por inferencia.
+- No handle bruto, JWT, secreto o SQL con binds privados en reportes/logs.
+
+## Review Focus
+
+- Validación JS correcta pero sentencia retenida hasta después del plazo: la fila debe permanecer ausente por condición SQL real; Step1/4 cubren ambas escrituras y5100ms.
+- Techos anidados: registrar límite elegido y mínimo derivado, sin afirmar aislamiento de predicates temporalmente indistinguibles; Step1/4 cubren cada techo.
+- Testigo observado válido cuya fila/owner cambia antes del INSERT: consumir la referencia no evita una carrera; Step1/4 requieren nueva comprobación SQL completa.
+- Commit conocido por la fixture pero respuesta perdida/retenida: el caller no recibe éxito ni segundo write; Step1/4 comprueban fila persistida y Promise real, no retorno temprano.
+- Nueva tabla de avisos requerida accidentalmente por métodos issuer antiguos, o exchanged_at confundido con ACK inmutable: Step4 conserva regresiones originales sin esquema de avisos y Step3 no toca phase-context.
+
+---
+
+## File structure
+
+Modificar lib/mcp-qa-finite-preparation-issuer-store.mjs: incorporar tres métodos y una constante schema original, sin modificar métodos/SQL antiguos.
+Modificar test/fixtures/finite-preparation-issuer-worker.mjs: escenarios notice-* aislados, reutilizando wrapper/query/session, lease SYN, issuer positivo y gates nativos.
+Crear test/mcp-qa-finite-preparation-notice-native.test.mjs: pruebas funcionales/causales y comparación del schema exportado contra los dos db/*.sql originales.
+
+El informe de implementación se añade **después**, fuera del mapa de producto y sólo al cerrar el trabajo, en docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md. El informe de diseño actual tiene sufijo -design y se conserva. No modificar documentos históricos para aparentar ejecución.
+
+## Task 1: Native fenced notice store component
+
+**Files:**
+- Modify: lib/mcp-qa-finite-preparation-issuer-store.mjs:29-156 (métodos nuevos/helpers locales; métodos antiguos intactos).
+- Modify: test/fixtures/finite-preparation-issuer-worker.mjs:10-153 (ramas notice-*; preservar escenarios existentes).
+- Create: test/mcp-qa-finite-preparation-notice-native.test.mjs.
+
+**Interfaces consumed:** createFinitePreparationIssuerStore({ctx,env}), validateFinitePreparationIssuerIdentity, issuerTime/issuerIso/issuerUuid/issuerScopes, initialFields/initialOwn; métodos openFence/insertAuthorization/consumeAuthorization/insertReadGrant/closeFence/reconcileFence/observeGrant/revokeGrant actuales; createDossierMonitoringAuthorization sólo en test de reducción.
+
+**Interfaces produced:** exactamente insertMonitoringTicket({...Common,ticket},originalLease), observeMonitoringTicket({...Common,ticket},originalLease), insertMonitoringConsent({...Common,ticketWitness},originalLease), como miembros de la **misma instancia**. Common={identity,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window}; ticket={handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}. Tipos,14/12 columnas, exactitud del witness y resultados son los de la spec. Único export adicional: FINITE_PREPARATION_MONITORING_SCHEMA frozen de siete DDL originales; sin factory/export de witness o nuevo codec.
+
+- [ ] **Step 1: Escribir el positivo causal y los hostiles en el harness real.**
+
+  En el nuevo test usar el mismo entrypoint de fixture, compatibilityDate2026-09-07, flags['nodejs_compat'], D1 RELEASE_DB y DO SQLite, con uniqueKey SYN aislada por escenario. Compilar una vez el entrypoint para este archivo de tests, sin modificar el runner issuer existente. El test lee db/dossier-monitoring-consent.sql y db/dossier-monitoring-owner-tickets.sql y entrega sus siete DDL al campo fixture-only monitoringSchema; la fixture ejecuta ese DATA sólo en notice-* y en el mundo explícitamente SYN. Esto permite RED por método ausente sin un import nominal de constante inexistente. Nunca montar esa entrada.
+
+  El positivo debe llamar efectivamente openFence→insertAuthorization→consumeAuthorization→insertReadGrant, con resultados nativos, y luego:
+  - test `REAL first notice uses native original issuer grant and observed ticket`: assert grant.id===identity.grantId; ticket.status==='applied'; witness.status==='observed'; consent.status==='applied'; row.expires_at===ticket.row.permission_expires_at y row.expires_at-row.issued_at>5000; sólo una fila original por tabla; UUID sin cambio; SELECT del ticket es primera sentencia de nueva first-primary después de preflight en otra sesión.
+  - test `REAL first notice keeps absolute permission beyond child window`: permiso válido con expiry absoluto al menos10000ms después del issuedAt original y operación<=5000; assert expires_at no fue reemplazado por deadline ni Date.now()+5000.
+  - test `REAL global sequence is not per-grant plus one`: insertar previamente un evento explícitamente ajeno SYN; expectedSequence=0 para el original; assert nuevo sequence>1, MAX original previo0 y ambas historias preservadas.
+  - test `REAL schema metadata equals unchanged original seven statements`: importar módulo como namespace; assert constante frozen, longitud7 y igualdad normalizada con archivos originales, sin filesystem import de producción.
+
+  Añadir tablas parametrizadas con nombres estables:
+  - `REAL native notice rejects hostile DATA and foreign ticket witness`: clone/JSON/raw row/otro store/otra lease, getter(count0), symbol, prototype, sparse/oversize, keys extra; cada cambio de Common/ventana/ticket y argumentos omitidos/extra; no SQL mutante emitido.
+  - `REAL native notice current tuple races deny at commit`: gate tras observe antes del INSERT; cambiar por caso owner,revision,grant immutable tuple/scopes/revoked_at,consumed auth,issuer fence o evento competidor. Ticket DATA alterado se prueba antes de observe; un UPDATE ordinario debe abortar por trigger. Un caso SYN explícito, después del preflight, elimina sólo el trigger necesario y altera el ticket en la fixture antes de liberar INSERT, que debe negar por comparación completa de fila. Es tamper negativo aislado, no schema de producción ni mutación legítima. Assert nuevas filas0 y estado ajeno intacto.
+  - `REAL monitoring preflight denies missing or changed original schema`: cada tabla/unique/constraint/índice/trigger/objeto extra/tipo/clock/ISO; assert cero mutaciones de avisos. No normalización que elimine constraints.
+  - `REAL queued monitoring INSERT denies after native deadline`: operar ticket y consent por separado, gate antes del bound.first nativo, await5100ms y liberar; assert gate alcanzado antes del plazo y nueva fila0.
+  - `REAL queued monitoring INSERT denies earliest <ceiling>`: por ambas escrituras, C0,consent,grant,Access,preconnection,ticket,permission como menor techo válido; cruzar el reloj real hasta mínimo+50ms y liberar; assert gate previo al mínimo, cero filas nuevas, reportar empates derivados.
+  - `REAL original issuer barrier beats queued monitoring INSERT`: ambas escrituras detenidas; CLOSE y lectura primera de nueva primaria completadas; liberar y assert sin nueva fila.
+  - `REAL issued notice remains historical after original grant reduction`: evento concedido primero; CLOSE→observeGrant→revokeGrant nativos; autoridad real enabled=true después de sólo CLOSE con grant aún activo y enabled=false después de revokeGrant; evento conservado y cero grant nuevo. No llamarlo retirada humana.
+  - `REAL post-commit notice ACK loss blocks another write in this store`: perder resultado tras commit tanto de ticket como consentimiento, filas reales conocidas por fixture; assert rechazo, ningún witness otorgado por fallo de ticket, y nuevo intento de ambas escrituras en esa instancia denegado sin otro INSERT.
+  - `REAL held native SQL settlement cannot become successful cancellation`: retener resultado después del commit, abortar el lease SYN, observar Promise todavía pendiente, liberar y assert rechazo/estado absorbente; la fila persistida no desaparece.
+
+  Gates deben interceptar únicamente el INSERT/SELECT real correspondiente; ningún SQL predicado se reemplaza. El error de fixture se sanea y se devuelve metadata/counts/booleanos, nunca valores de handles/JWT/secretos. Inputs/colas/lease son SYN; resultado de SQL/autoridad es nativo. No source/SDK/qualifier alias.
+
+- [ ] **Step 2: Ejecutar RED causal en cloud autorizado y conservar evidencia.**
+
+  Root debe haber activado este HEAD futuro. Ejecutar:
+  `node --test --test-name-pattern="REAL first notice uses native original issuer grant" test/mcp-qa-finite-preparation-notice-native.test.mjs`
+
+  Esperado: el issuer original crea realmente su grant y el test falla en la invocación ausente insertMonitoringTicket (captura saneada de método no existente), con cero ticket/evento. Error de instalación/bundle/fixture/DDL no cuenta como RED. No implementar un fallback ni sustituir la llamada para lograr el fallo previsto. Registrar revision/tree/run/job/attempt y assertion, sin secretos.
+
+- [ ] **Step 3: Implementar exclusivamente el contrato de la spec en el mismo store.**
+
+  Añadir FINITE_PREPARATION_MONITORING_SCHEMA como siete strings originales congelados, checks de schema de avisos en preflight separado y helpers nuevos de DATA/testigo. No cambiar input/preflight/SQL/métodos antiguos ni volver obligatorias las tablas de avisos para ellos.
+
+  Añadir WeakMap privado para el testigo y estado de attempts/fallo por identityHash. Observe captura todas las14 columnas después de un SELECT condicional como primera sentencia de nueva first-primary. Método3 compara Common exacto, consume esa referencia antes del await y toma su ticket del WeakMap. Los dos INSERT SELECT y el SELECT comparten condiciones SQL de la spec, incluidas n.ms real, cerca original, owner/revisión, grant/auth actuales, scopes exactos y todos los techos. Evento issued_at es n.ms y expiry es el permiso absoluto del ticket.
+
+  Errores/ACK desconocido de mutación se sanea/rechaza y bloquea futuros writes de avisos en esa instancia/identidad. RETURNING vacío es no_mutation; nunca recuperar éxito tras excepción. Conservar la Promise real con c.wait/query existentes y no afirmar cancelación física. No añadir journal, callback, schema repair o sender.
+
+- [ ] **Step 4: Ejecutar GREEN y regresiones afectadas una vez, en cloud.**
+
+  `node --test test/mcp-qa-finite-preparation-notice-native.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs`
+
+  Esperado: cero fallos y cero skips en esos archivos. Las ramas originales de fixture siguen sin instalar esquemas de avisos y todos sus métodos/regresiones conservan comportamiento. Inspeccionar especialmente close/reconcile fresh-first-primary, testigos originales, expiración nativa y unknown/held ACK. Una prueba hostil que pasa porque el método falta o no se alcanzó su gate es inválida.
+
+  Ejecutar lint con instalación existente:
+  `node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-preparation-issuer-store.mjs test/fixtures/finite-preparation-issuer-worker.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs`
+
+  No full npm CI, descarga de herramientas ni compiler estándar adicional si diff/import graph sigue unmounted y sin nuevas dependencias de producción. El bundle nativo de la fixture se compila en los tests. Si aparece una dependencia/graph change inesperada, registrar el bloqueo de alcance para root; no arreglarla ampliando esta tarea silenciosamente.
+
+- [ ] **Step 5: Verificar el diff y escribir el recibo acotado.**
+
+  Comparar con HEAD exacto activado por root. Sólo store/fixture/nuevo test pueden cambiar en producto; cuerpos SQL/métodos/esquemas/exports antiguos y db/*.sql permanecen intactos. Añadir el informe de implementación indicado con BASE/head/tree, RED/GREEN reales, comandos/counts/skips/warnings, límites/gates alcanzados y empates de ceilings. Separar caller DATA de identidad real y componente de fuente operativa. Fuente ceiling vencido, post-token ACK gap y demás dependencias siguen pendientes.
+
+- [ ] **Step 6: Commit por expected-head y revisión independiente de root.**
+
+  Commit candidato `feat(afw): fence native preparation notice store`, exclusivamente en rama aislada autorizada y expected-head CAS. Root revisa diff/casos/evidencia antes de aceptar. No merge/main/publish/mount ni acción de proveedor. Si root rechaza una condición de SQL/testigo, devolver el componente a corrección; no ejecutar unidades downstream.
+
+## Self-review del plan
+
+Una sola unidad y un ciclo RED/GREEN; métodos/nombres/fields coinciden con spec. Positivos usan grant nativo real, no un grant precargado. Los cinco Review Focus tienen casos de Step1 y comprobación Step4. Los fixtures entregan DDL sólo a su mundo SYN; producción sólo califica schema. El test de reducción usa autoridad real y deja historia intacta, sin confundirla con unsubscribe/cleanup. Falta intencionalmente journal/receptor/fuente/identidad humana y proyección histórica del grant ACK: ninguno se reclama aquí. Plan revisable; no se ejecutó ningún step ni se solicita activación al usuario.

~~~~~~~~~~

## docs/superpowers/progress/2026-11-01-afw-pause.es.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/progress/2026-11-01-afw-pause.es.md b/docs/superpowers/progress/2026-11-01-afw-pause.es.md
--- /dev/null
+++ b/docs/superpowers/progress/2026-11-01-afw-pause.es.md
@@ -0,0 +1,29 @@
+# AFW — pausa solicitada por Gabriel
+2026-11-01 21:00 UTC / 18:00 Argentina. Trabajo detenido por apagado del ordenador.
+
+## Estado preservado
+- Repositorio: tokenizartinfo-ops/agent-friendly-web. Rama de código: feat/finite-native-cleanup-20261101.
+- Código Native5 Task1: b425c77ff551fb54c70e24f69b2f57862ed22b63; documentación/reporte: 087f6427004ecabd89e9989dd87d0d4fde449424. Este checkpoint añade solo documentación.
+- Task4C1 aceptada tras revisión y arreglo de procedencia del compilador: código b2481cdb, documento7815c834. Evidencia anterior343PASS y corrección18coveringPASS; no suite completa repetida.
+- Native5 Task1 implementada: registros estrictos de arranque; lector compartido de estado real; inventario completo; token privado de una invocación y coordinador por DO. Run41349308125/job124975828609:39focused+125affected=164PASS, lint, cero artefactos. Reporte: ../reports/2026-11-01-finite-native-launch-task1.md.
+- REVISIÓN Native5 Task1 PENDIENTE. Revisor /root/review_native_launch_task1 recibió orden de detenerse. Rango c989ff4473117cea7e31ff026306dac90237bb98...087f6427004ecabd89e9989dd87d0d4fde449424. No marcar aceptada desde una revisión parcial.
+- Revisor confirmó pausa: no P1/P2 confirmado; resta analizar timeout/trabajo tardío del coordinador y verificar procedencia final CI antes de emitir ambos veredictos. Conserva compare en memoria (compare/c), no depender de esa caché si se pierde.
+- El implementador /root/finite_native_launch_task1 terminó y dejó de escribir. Ningún Task2 nuevo fue despachado.
+
+## Diseño privado preservado por separado
+Rama design/finite-private-policy-setup-20261101, HEAD c95118cac9eccba1f64606ae3d3aa24166f16f2e. Diseño ec08eda2f986fad608f7b1c113aa0dd877d378d8 pasó builder check: nothing important left. Plan/primer brief guardados; NO implementación ni integración.
+- specs/2026-11-01-finite-private-policy-setup.md
+- plans/2026-11-01-finite-private-policy-setup.md
+- briefs/2026-11-01-finite-private-policy-setup-task1.md
+Dirección aprobada: preparación protegida Access antes de T0 en tres etapas; consentimiento real separado; herencia de cada secreto desde baselineVersionId exacto; luego instalación privada de dos efectos después de T0. Sin datos privados en GitHub. Ventana15min no renueva permisos10min; commandBy=min(vigencias reales)-480s-30s. Adopt36slots absolutos2s hasta70s/ARM90s, sin nuevos relojes.
+C3 deberá resolver explícitamente el acceso HTTP finito para el grant existente: OAuth=false hoy bloquea /mcp antes de validarlo. No resolver clonando env o activando flags por inferencia.
+
+## Próximo paso al regresar
+1. Retomar la revisión Native5 Task1 contra su brief/reporte/diff; si hay P1/P2, fix-loop con implementador original y re-revisión.
+2. Solo tras revisión limpia registrar aceptación y preparar Native5 Task2 con los interfaces exactos del reporte; después Task3.
+3. Integrar/ejecutar por bloques revisados el plan privado C2; C3, insumos históricos/procedencia/privacidad, compatibilidad de reversión, CI/revisión conjunta y aceptación real siguen pendientes.
+
+## Evidencia y límites
+Checkpoints públicos: issue497#6563562357 y #6563630680. Tres GET de versiones históricas20:39:33.726UTC confirmaron solo forma de bindings/exports; NO deployment actual ni Container utilizable. Metadata del publicador nativo20:45:01.750UTC identificó el candidato05718105dcdfc92e55cc3624172c2740, vencimiento3nov02:59UTC; NO comprobó que corresponda al secreto guardado ni que pueda subir versiones. No repetir lectura/rotación/pegados por inercia.
+Última comprobación global completa del runtime sigue siendo la fechada1nov14:30:52UTC del runbook, no garantía actual. Este trabajo no cambió runtime, OAuth, permisos, tokens, DDL, cron, Containers, suscripciones ni main; no consumió otra ocurrencia ni usó Max. No se abrió una ventana de ensayo ni se pidió OTP.
+operationalReadiness=false; PC-off y piloto Max pendientes. La pausa no instala guardia cloud ni permite prometer continuación automática con el ordenador apagado. No reabrir la ocurrencia cerrada/consumida14:26UTC, no restablecer HEAD ni inventar terminales.

~~~~~~~~~~
