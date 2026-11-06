# First Native Connection Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development para implementar este plan por tareas, sólo después del preflight y BASE de root. SDD ya fue elegido; no pedir otra elección rutinaria. Las casillas describen trabajo futuro, no autorización de ejecución.

**Goal:** Producir el primer ConnectionReceipt desde aprobación humana real y la misma admisión/lease, con upload y activation nativos contra provider SYN, y consumir ese predecessor sin seedPhaseFacts.

**Architecture:** El candidato initial CLOSED contiene desde origen el despacho finite; connection cambia sólo configuración, manteniendo bytes y residencia. QA conserva la fuente, los pares, la admisión y los resultados nativos en su continuación privada; reutiliza dos helpers compartidos sin introducir QA en M. Tres tareas revisables culminan en un único resultado funcional: receipt durable y continuidad downstream, no una UI o aprobación aislada.

**Tech Stack:** Node >=22.18.0, ESM, node:test, esbuild/compilador finite existente, Miniflare/workerd, D1/DO/SDK existentes, JWT SYN firmado y provider SYN fijo; sin dependencias nuevas.

**Spec:** docs/superpowers/specs/2026-11-05-finite-native-first-connection-publication-design.md @ b9cf44617938dac66e7261b740340eea94509a9b, blob 0ac493fbc1f665cf3001e80f226c4c6e76aaf6c1. Leer spec y plan.

**Estado:** INACTIVE. BASE DE EJECUCIÓN PENDING, entregado exclusivamente por root después de aceptar Link y reconciliar su delta. Fuente de inspección 953e7af1fc20b59c59d8e4a03dcf398d98165cf5; no seguir WIP, elegir otro HEAD, ejecutar Task 1 ni activar qualifier desde este documento. Diseño leído/aprobado para planificar por root, con builder-check fresco “nothing important left”; esto no es aceptación de implementación.

## Global Constraints

- operationalReadiness=false; completePackage=false; PCoff=false.
- C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.
- M y QA conservan root original <=30000 ms. Child <=5000 ms, siempre recortada al parent restante.
- No refrescar identidad/Access ni I0/C0/C1. childDeadline sólo narrowing del original; nunca now+fresh.
- El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.
- Sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos.
- Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Ningún provider/custodia/roles/OAuth/permisos operativo nuevo.
- Root, child, native holders y Promises reales se conservan hasta settlement; timeout/abort no son physical drain.
- Ninguna admisión persistida/reanudable, source factory, DTO de autoridad, callback aprobador, raw pair, allowPending, lector público ampliado o HTTP genérico exportado.
- Faltan datos nativos: fail closed. Rutas finite nunca caen al writer ordinary, incluso con QA ausente o phase no soportada.
- Notices no requiere NoticeLink como gate nuevo; finite sí. Link presente se correlaciona; primera connection exige snapshot.noticeLink=null según el contrato aceptado que entregue root.
- Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.
- Esquemas/DDL/store/journals/records, SDK/OAuth ordinary/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler y build scripts quedan protegidos.
- GitHub cloud únicamente para trabajo futuro autorizado: sin clones/deps/builds/tests locales, main/merge, runtime ni acceso a Cloudflare real. Este plan no ejecuta tests, compilaciones, Actions o providers.
- Qualifier SYN futuro: como máximo tres jobs independientes, <=15 minutos por grupo, sin secrets, permisos sólo contents:read. Root fija BASE, alcance y qualifier antes del primer dispatch; ningún workflow nuevo implícito en el filemap.
- No repetir suites aceptadas sin riesgo del delta; no sleeps/retries para ocultar fallos, no ampliar plazos ni quitar rechecks para lograr GREEN.
- Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre.

## Review Focus

1. Un request finite malformado o QA inaccesible podría caer al SQL ordinary: Task 2 posee “T2 finite dispatch never falls through ordinary”, con espía antes de SQL y cero efectos.
2. Una respuesta fallida puede bloquearse en cancel mientras otro request entra: Task 1 posee “T1 known failure retains real cancellation”; Task 3 posee “T3 retained work blocks a different live root”, con settlement observado y lease nueva vigente.
3. Un ACK ajeno con hashes válidos podría lavar un efecto parcial propio: Task 3 posee “T3 resealed foreign publication is not own completion”; codecs válidos y rechazo del correlador antes del siguiente SEND.
4. La extracción puede alterar tiempos, claves o volver a consumir enrollment: Task 1 posee “T1 enrollment preserves literal chronology and one shot”, con secuencia exacta, Ack preparado en el punto original y consumo antes de await.
5. El positivo puede compilar M ordinary o cambiar bytes después de fijar cápsula: Task 2 posee “T2 initial artifact already contains fixed finite dispatch”; Task 3 posee “T3 same initial bytes produce connection and downstream”, con hashes/metafile y ningún predecessor seeded.

## Filemap cerrado y ownership

Los IDs siguientes identifican rutas exactas; cada tarea enumera todos sus archivos, incluidos compartidos. No hay un archivo de soporte tácito. Infraestructura qualifier/report de ejecución sólo si root la autoriza separadamente.

| ID | Ruta | Tareas / responsabilidad |
| --- | --- | --- |
| P1 | lib/mcp-qa-finite-fixed-policy-engine.mjs | Crear T1: operaciones provider fijas compartidas |
| P2 | lib/mcp-qa-finite-preparation-enrollment-writer.mjs | Crear T1: writer factual one-shot literal |
| P3 | lib/mcp-qa-finite-policy-transport.mjs | T1: consumidores antiguos de helpers, semántica conservada |
| P4 | worker/mcp-own/finite.mjs | T2: default dispatch finite; preservar clases cleanup |
| P5 | worker/independent-closure/finite.mjs | T2: fetch DO para cuatro targets privados |
| P6 | lib/mcp-qa-finite-owner-native-wire.mjs | T2: gramática choice y límites de respuesta |
| P7 | lib/mcp-qa-finite-owner-native-bridge.mjs | T2: conduit y respuesta QA validada |
| P8 | lib/mcp-qa-finite-owner-native-receiver.mjs | T2: pending seguro; T3: invocar handler connection |
| P9 | lib/mcp-qa-finite-owner-preparation.mjs | T3: seam choice admite POST interno |
| P10 | lib/mcp-qa-finite-owner-phase-context.mjs | T3: productor, fuente/expected privados y observer parcial |
| P11 | lib/mcp-qa-finite-initial-material.mjs | T2 prerequisite Root: identidad de script local inmutable, bytes mutables siguen hash-current |
| T1 | test/mcp-qa-finite-policy-transport.test.mjs | T1: extracción, gramática y regresión consumidores |
| T2 | test/mcp-qa-finite-first-connection-publication.test.mjs | Crear T1; T2: contratos puros/wire/grafo |
| T3 | test/mcp-qa-finite-first-connection-publication-native.test.mjs | Crear T2; T3: montaje y circuito native |
| F1 | test/fixtures/finite-first-connection-publication.mjs | Crear T1: probe enrollment; T2/T3: provider registry SYN y probes fijos |
| F2 | test/fixtures/finite-initial-entry-world.mjs | T1: modo enrollment aislado; T2/T3: modo publicación; modos anteriores intactos |
| T4 | test/mcp-qa-finite-owner-phase-context-native.test.mjs | T3: cierre público de parciales y compatibilidad |
| T5 | test/mcp-qa-finite-owner-native-wire.test.mjs | T2 Root preflight: normalizar sólo cookie SYN válida, preservar asserts de drift/retención |
| T6 | test/mcp-qa-finite-owner-native-conduit-native.test.mjs | T2 Root preflight: POST SYN válido para alcanzar el hold nativo, preservar asserts de abort/settlement/cero efectos |
| T7 | test/mcp-qa-finite-initial-material-native.test.mjs | T2 prerequisite Root: ownership/forgery/bytes mutables y vida original |

T1→T2→T3 son secuenciales. Un writer por tarea y revisión SDD antes de la siguiente; root controla aceptación y cierre. Los tests de tareas anteriores siguen siendo contratos. No refactor ajeno de phase-context ni cambios silenciosos en SDK, esquemas o stubs para acomodar los tests.

## Task 1: Extraer engine y enrollment conservando los callers actuales

**Files:** crear P1/P2/T2/F1; modificar P3/T1/F2. No modificar policy-setup ni stage-work. F1/F2 se declaran aquí porque el helper necesita una prueba nativa aislada antes del productor; T2/T3 los reutilizan, sin un fixture adicional oculto.

**Interfaces producidas:**

P1: createFiniteFixedPolicyEngine({ctx,env},guard) devuelve frozen:
- describeUpload({configuration,baselineVersionId,bytes}) → {method:'POST',path,body}.
- upload({configuration,baselineVersionId,bytes},lease) → Promise<resultado provider validado>.
- describeActivation({versionId}) → {method:'POST',path,body}.
- activate({versionId},lease) → Promise<resultado provider validado>.
- readPointer({versionId,deploymentId},lease) → Promise<void>.
- readVersion({versionId,module,configuration},lease,closed=false) → Promise<metadata verificada>.

ROOT/account/worker/métodos/path literales dentro de P1; describe.path es la URL absoluta fija ROOT+suffix y describe y operación forman el mismo request. requestHash usa esa URL una sola vez, idéntica al antiguo ROOT+path relativo. No export http, wire configurable, token, target ni transporte. guard es el current-check léxico de los dos producers internos; no crea fuente o aprobación. Cada caller conserva admisión y source checks antes/después de sus fases.

P2: prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId,stageApprovalHash,ownerSource,baseline,baselineBytes},childLease,childDeadline) → Promise<{recordEnrollment(),recordAck()}>. recordEnrollment() → Promise<{enrollment,ack:null}> y recordAck() → Promise<{enrollment,ack}>, donde enrollment y ack son los records Enrollment/Ack del codec preparation-cleanup existente. Devuelven sólo esos records originales verificados; recordAck usa el Ack privado preparado por recordEnrollment, no argumentos de caller. Native holders/anchors/ownerRows y bytes defensivos pertenecen al helper; el caller conserva fuente/admisión. Cada método se consume antes del primer await. Sin setters, nuevo reloj, callback source ni recuperación después de unknown.

**Fixture factual aislado:** F2 añade initialEntryHarness('first-connection-enrollment-component'); F1 añade exerciseEnrollmentWriter(f,scenario) → Promise<{trace,enrollment,ack,failure,settled}> como helper Node SYN fijo, sin exports producto ni callback de aprobación. Reutiliza material initial real del harness y puede preparar DATA SYN de approval para probar P2, que no consume ni concede admisión. Escenarios literales normal/double-enrollment/ack-first/double-ack/unknown-enrollment/unknown-ack/holder-drift/deadline. Cero provider POST y ningún ConnectionReceipt en todos ellos; esta prueba no acredita permiso humano ni es predecessor positivo de T3. No copiar el setup del world.

**Interfaces consumidas:** contratos actuales de journal/store/cleanup/stage-work y de lease, sin cambios. P3 continúa consumiendo admisión exactamente una vez; old owner termina pending como antes. Su setup conserva PolicySend/PolicyAck/PolicyReceipt y payloads originales.

- [ ] **1. RED de contratos:** añadir en T2 “T1 fixed engine exposes only finite operations” y “T1 enrollment preserves literal chronology and one shot”; en T1 adaptar la exposición test-only del engine a P1 sin añadir exports públicos al producto. Assert nombres exactos, ausencia de http/wire/ctx/setters, method/path/body iguales al motor previo, secret inherit del baseline exacto. Antes del refactor el contrato nuevo falta; el fallo debe señalar esa ausencia, no un import typo.
- [ ] **2. RED de retención:** añadir en T1 “T1 known failure retains real cancellation”. Respuesta inválida con cancel retenido: fallo lógico observado, cero siguiente efecto y Promise real todavía pendiente; liberar, exigir settlement observado. Incluir holder/role drift y respuesta malformada sin interpretar boolean de test como autorización.
- [ ] **3. Verificar RED en cloud autorizado:** ejecutar sólo T1/T2 con los nombres T1 y conservar fallo causal. Para extracción enrollment, capturar traza y datos del writer previo como referencia literal antes de sustituirlo; no sintetizar approval positiva ni fixture externo nuevo.
- [ ] **4. Implementar P1 y adaptar P3:** mover validadores/límites (respuesta 4718592) y capturas; operaciones fijas, retención fetch→read→cancel y fallo absorbente. Los caller setup/owner conservan sus propios source/admission checks. Ninguna residencia/phase-context se importa.
- [ ] **5. Implementar P2 y adaptar P3:** mantener orden original transport:65–123: captura/validación; caller qualified; Enrollment transaction→sync→readback→cleanup; construir Ack/acknowledgedAt en el punto original; caller qualified; Ack transaction→sync→readback→cleanup. Comparar claves, timestamps relativos, contenido, alarm, exclusiones y bytes; segundo uso o Ack sin Enrollment rechaza antes de IO. Deadline proviene de la child original, no de now+fresh. Retener el trabajo real aunque timeout gane.
- [ ] **6. GREEN:** node --test --test-reporter=spec --test-concurrency=1 test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-first-connection-publication.test.mjs. Exigir todos los nuevos T1 ejecutados/PASS y cero fallos; ejecutar además la selección setup de “Regresiones”, porque P3 comparte engine con ese consumidor. Trace equality y owner pending son obligatorios.
- [ ] **7. Commit y revisión:** commit “refactor: share fixed finite policy operations and enrollment writer”. Revisar interfaces, graph sin QA en M y exactitud old behavior; no publicar ni afirmar first connection terminada.

## Task 2: Incluir despacho finite cerrado en initial CLOSED

**Files:** modificar P4/P5/P6/P7/P8/P11/T2/F1/F2/T5/T6/T7; crear T3. T5/T6 son el ajuste acotado de preflight Root descrito abajo; no fixtures legacy ni producto extra. P8 conserva negocio pending hasta T3; los otros handlers ya existentes no se reimplementan.

**Ruling Root de preflight Task2, posterior a aceptación Task1:** T5 hoy usa Cookie 'SYN-cookie' sin '=' y T6 usa POST 'SYN=bounded'. La gramática estricta ya elegida los rechaza antes del punto cuyo drift/hold pretenden medir. Autorizar únicamente reemplazar esos INPUTS SYN por cookie-list válida y form exacto handle/projectRef/decision=approve con cookie prepare matching. Preservar cada assert, señal/hold nativo, contadores y settlement; no debilitar el parser ni cambiar fixtures para conservar el viejo input inválido. Añadir T5 y T6 completos al gate proporcional porque ejercitan directamente wire/bridge/receiver modificados. Sus pruebas de malformados siguen negativas. Esta normalización no concede aprobación ni crea precedente Task3. No se modifica contrato producto ni se amplían endpoints. Scope Task2 reconciliado:13code/testpaths más qualifier/informe/ledger explícitos. La precisión Root posterior exige413 EXACTO en las4assertions SIZE sender/receiverT5/T6 que llegan al reader1024; primero400 pasa a primero413, manteniendo cancelación/retención/zeroeffects. No se acepta [400,413] ni un fallo temprano deContentType.

**Prerequisite Root de coste/integridad (P11/T7):** el cuerpo histórico real SYN2445218B/599reads consumía4714ms en rechecks y80ms leyendo; child rechazó5004>=5000, sin autorización/holder/parentclock fallidos. Root autoriza sustituir SÓLOsha repetido del script LOCAL ya validado/inmutable por referencias exactas originalContext/artifact+valor script en WeakMap privado. No cachéDTO. Mantener sha(candidateBytesMUTABLE),length/type/materialHash+recordHash/r.check/holders/source/lease ytodosawaitrechecks; initial-entry/initial-lease protegidos. Cobertura material5pertinente y mismo cuerpo/fragmentación/30s/5s. La primera conexión sigue Task3; esto sólo permite initialCLOSED factual bajo límites originales. Véase Root preflight6Nov y reporteTask2 para primarias y scope.

**Interfaces consumidas/producidas:** reutilizar forwardFiniteOwnerChoice({request,env,ctx},originalLease) y los forwards/receivers OAuth/notice existentes. Ningún endpoint nuevo. P5.fetch(request) selecciona sólo targets privados literales de la spec. P7 sólo devuelve HTML y headers QA permitidos, body <=16384; errores nunca se convierten en éxito. P8 conserva native holders/boundary/retención; su reemplazo de pending por handler ocurre únicamente en T3.

F2 añade initialEntryHarness('first-connection-publication'), con la forma de lifecycle f existente (mf, stub, cleanup y datos/probes SYN). F1 amplía los helpers Node SYN fijos sobre f ya creado: approveFirstConnection(f) → Promise<Response> realiza GET y POST reales con JWT SYN firmado y cookie/form; readFirstConnectionProbe(f) → Promise<DATA> observa requests/counts/rows/settlement; setFirstConnectionFault(f,fault) configura sólo los casos negativos nombrados en este plan. No acepta source/pair/expected/callback, no importa F2, no devuelve permiso. F2 importa F1, nunca al revés. approveFirstConnection puede retornar pending en T2; ese resultado no cuenta como GREEN funcional.

- [ ] **1. RED de artefacto/dispatch:** añadir T2 “T2 initial artifact already contains fixed finite dispatch” y T3 “T2 finite dispatch never falls through ordinary”. Compilar usando compiler finite actual; assert M incluye forwards fijos y no decoder/residencia QA, QA incluye residencia M exacta; M positive no puede ser wrapper ordinary de test. Requests por rutas reconocidas con método/origen/query inválidos y QA ausente deben dar cero SQL ordinary y cero approval/SEND.
- [ ] **2. RED de gramática y pending:** añadir T2 “T2 choice grammar bounds actual body and cookies”, T3 “T2 closed mounted conduits cannot authorize business”. Casos POST >1024, UTF-8/escape inválidos, extra/duplicado/decision diferente, cookie vacía/separador/nombre inválidos y duplicada; valores browser válidos y cookie ausente se tratan conforme choice, no como permiso. GET exige body vacío. Pending QA y contenido/headers inesperados jamás producen 200 de publicación. Mantener los tests T1 verdes.
- [ ] **3. Ejecutar RED focal:** node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^T2 ' test/mcp-qa-finite-first-connection-publication.test.mjs test/mcp-qa-finite-first-connection-publication-native.test.mjs. Exigir fallos por dispatch ausente/gramática concreta; no por baseline falso o fixture que omitió primarias.
- [ ] **4. Implementar mounts y wire:** P4 intercepta /connections/finite-prepare, /authorize, /monitoring y /monitoring/grant antes de ordinary. Rechaza /connections, /connections/revoke, /monitoring/revoke y métodos no soportados. Origen exacto delegated-canary.agentfriendlyweb.dev, perfil SOURCE finite y holders/actor/binding/version calificados. Choice puede consultar QA; OAuth y notice requieren OAuth true. QA decidirá read_consent, grant/identity/CSRF/historia; monitoring flag ordinary nunca habilita preparación. /oauth/token y /mcp conservan SDK actual. P5 implementa sólo los cuatro targets privados de la spec; prefijo desconocido deniega. Raíz original antes del IO, finish en finally, sin abandono nativo.
- [ ] **5. Completar fixture propietario y GREEN:** F2 construye el initial CLOSED con este dispatcher desde origen y productor upstream aceptado, nunca modifica cápsula/hash posterior. F1 provider SYN guarda requests reales y sirve bytes/config/pointer exactos; no positive f.phaseCurrent prefilled. Preservar modos existentes, siete DDL y filas ajenas. Ejecutar T2 completo y compiler/graph seleccionado; exigir hashes/metafiles, cero ordinary SQL y pending seguro. Todavía no hay receipt nuevo; ese límite se declara.
- [ ] **6. Commit y revisión:** commit “feat: mount closed finite source conduits in initial candidate”. Revisión de artefactos/graph y scopes nativos, con T1 intacto. No cambiar build scripts ni declarar completePackage.

## Task 3: Producir connection en la continuación humana y consumir su receipt

**Files:** modificar P8/P9/P10/T3/F1/F2/T4. No nuevos paths. P1/P2 se consumen tal como Task 1; si su contrato necesita modificación, detener y devolver la discrepancia a root.

**Interface producida:** P10 exporta handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease) → Promise<Response>; sólo P8 lo llama. P9 amplía continuePrivateQaFiniteOwnerChoice para POST usando el reader factual léxico de P10; no se transporta ese callback por request/RPC. Reader conserva forma pública {source,preconnectionId,capsuleHash}. Sin pair/expected/admission/baseline aportados por caller.

**Fuente y estados:** P10 obtiene bootstrap/resident bytes/primarias/backup desde recursos existentes, verifica actual QA/M, owner, Access, sourceRevision/tree, initial plan/capsule/alarm y roles originales. Candidate copia baseline exacto salvo OAuth false→true; rollback inmediato e histórico recuperables/hash verificados. Consumo de admission y adopt stage-work en la misma root. Reusar helpers de T1 y journals existentes.

Estados privados exhaustivos: approved → enrollment-recorded → enrollment-ack-recorded → upload-send-recorded → upload-native-pending → upload-ack-recorded → upload-observed → activation-send-recorded → activation-native-pending → activation-ack-recorded → activation-observed → receipt-recorded → complete. Otro estado deniega. Own Send/Promise/result/settled/Ack/readback son referencias distintas; no se reemplazan por journal DATA.

- [ ] **1. RED principal nativo:** añadir “T3 same initial bytes produce connection and downstream”. Desde initial CLOSED producido en T2: GET firmado real, cookie y tres campos, POST real; esperar 200 únicamente tras ConnectionReceipt native durable. Assert upload nuevo y activation nueva, orden Send→sync/readback→native result→Ack→sync/readback, config sólo OAuth, bytes iguales y snapshots completos. Luego QA code→M token→MCP/D0.4→notice GET/POST/Link nativo aceptado, sin seedPhaseFacts/seedFutureActivation ni ACK/provider pointer prefilled. Antes de P10 debe fallar por pending sin receipt, no por una aprobación simulada.
- [ ] **2. RED adversarial causal:** implementar los grupos de la tabla siguiente como tests nombrados T3 (history/current snapshots en T4; restantes en T3), con baseline positivo válido y reseal cuando el objetivo sea correlación. La prueba demuestra cuál primer efecto prohibido no ocurrió; un rechazo anterior de checksum no cubre un predicado posterior.
- [ ] **3. Ejecutar RED focal:** mismo comando de Task 2, patrón '^T3 ', sobre T3/T4. Separar principal de grupos negativos que ya estaban cerrados; conservar al menos un fallo causal por cada comportamiento nuevo (receipt, propia continuidad, reader parcial seguro).
- [ ] **4. Implementar entrada humana/fuente:** P8 invoca P10. P9 conserva gramática/action/StageApproval/TicketUse existentes. P10 verifica Access JWT firmado con realm/audience fuente y owner actual, prepara form con cookie original sin renovar, consume admission una vez después de choice status202/stage connection, captura holders y entra en adoptFiniteOwnerRequestStageWork. Sin historial approval como resume.
- [ ] **5. Implementar enrollment/upload:** aplicar P2 bajo misma child, rechecks del caller entre fases. Upload: full pair→describe fijo→journal.issue recorded→sync/readback→own recheck→actual native Promise/result→Ack recorded→sync/readback→readVersion actual y pointer baseline→full pair. requestHash usa method/describe.path absoluto/body y baseline IDs reales, preservando exactamente la antigua representación ROOT+path. ACK/result desconocido nunca se reconstruye.
- [ ] **6. Implementar activation/receipt:** nueva child dentro del parent original: full pair/baseline→SEND/sync/readback→recheck→actual activation→ACK/sync/readback→pointer/version/config→ConnectionReceipt finish/sync/readback→full pair final. Receipt y completedAt permanecen dentro de la ventana de activation SEND. Enrollment, upload y activation no reciben plazo fresco para terminar su ACK/receipt.
- [ ] **7. Implementar expected/observer:** ambos snapshots completos siempre; permitir sólo delta propio explícito de enrollment, effects/writer-head, pointer/config observado y receipt. snapshot.noticeLink null en first connection; mantener la correlación vigente posterior. Public reader, OAuth y notice niegan effects parciales sin receipt; nueva choice niega history consumida, sin backfill. Historial válido conserva deadline en acceptedAt/ACK; lectura posterior exige techos actuales originales, no now<ventana histórica terminada. No genérico else permisivo.
- [ ] **8. GREEN principal y negativos:** node --test --test-reporter=spec --test-concurrency=1 test/mcp-qa-finite-first-connection-publication-native.test.mjs. Exigir todos los T2/T3 ejecutados, principal completo, cero fail y assertions de settlement observadas. T4 focal y regresiones de abajo también deben pasar. Medir IO/fanout, snapshots, bodies, graph/hashes y tiempos originales; no reclamar fit si excede 5 s/30 s.
- [ ] **9. Commit y revisión:** commit “feat: produce native first connection from original owner approval”. Revisar spec/resultados/causalidad/protected blobs y deuda SDK antes de cierre. Receipt/UI sola no cierra la tarea: predecessor real debe alimentar continuidad downstream aceptada. Sin siguiente unidad, mount operativo, main ni deploy.

### Casos T3 obligatorios y asserts propietarios

| Nombre test o familia | Variantes y asserts |
| --- | --- |
| T3 identity and choice cannot mint admission | firma/issuer/audience/subj/expiry/owner/revisión/Access menor; cookie/Origin/handle/projectRef/decision; assert TicketUse=0 y SEND=0 para entrada inválida |
| T3 admission cannot cross lineage or resume | otra ctx/env/root/lease, doble consumo, finish/restart, approval DATA histórica; assert provider POST=0 en nueva petición |
| T3 source and rollback must be recoverable | QA/M pointer/module/config, bytes/tree/hash, placeholder metadata, secret inherit/value/physical IDs, Backup/chunks/manifest/retainedIds; assert upload SEND=0 |
| T3 enrollment unknown cannot upload | held/lost transaction/sync/readback, doble método, alarm/ownerRows drift; assert upload POST=0, conservar filas |
| T3 upload uncertainty cannot activate | existing/unknown/held SEND, lost/late/malformed result/reconciliation/body/cache, version/config incorrectos, pointer cambiado; assert activation SEND/POST=0 |
| T3 activation uncertainty cannot finish | existing/unknown SEND, lost/late result, foreign deployment, pointer/percentage/config/version divergentes; assert receipt=0, sin segundo POST |
| T3 final readback cannot turn uncertainty into success | finish/sync/readback/final pair desconocidos o drift; assert status!=200 y evidencia durable preservada |
| T3 resealed foreign publication is not own completion | source/owner/preconnection/context/baseline/module/config/writer-head/version/deployment/receipt links alterados con hashes válidos; comprobar validación codec previa y cero siguiente SEND |
| T3 original deadline fences each native boundary | body/source/transaction/provider/ACK/receipt con deadline original agotado, reloj hacia atrás, lease holder drift; sin nueva ventana ni retry |
| T3 retained work blocks a different live root | held fetch/read/cancel/SQL/DO/sync, known failure/abort; segunda root SYN vigente rechazada por scope, no por su propio abort; liberar y assert settlement observado antes de assert final |
| T3 history is factual not replay authority | replay éxito/respuesta perdida, public reader ante cada prefijo parcial, history válida después de 5 s, foreign UUID/prefix; sin nuevo SEND y rows ajenas intactas |
| T3 current snapshots remain complete | drift owner/revision/source/SDK/issuer/notice/Link entre snapshots; sin normalizar grant.exchanged_at; detectar antes del siguiente commit |
| T3 same initial bytes produce connection and downstream | principal arriba; post-consent phase no soportada sigue cerrada; native POST jamás alcanza SQL ordinary; no nuevo permiso por Link |

Grupos de dispatch/gramática/cancel de T2/T1 siguen activos. Campos, counts y trace se observan pasivamente; ninguna prueba positiva autoriza mediante probe ni depende de setFirstConnectionFault.

## Regresiones concretas y qualifier futuro

Estos nombres existen en pin 953 y son puntos de selección, no pruebas que ya se ejecutaron aquí. Al reconciliar BASE, verificar nombres/expansiones y conteos reales; cero matches, skip de un seleccionado o salida sin assertions no es GREEN. No sustituir silenciosamente un caso eliminado. Fixtures SYN históricas de las regresiones no cuentan como predecessor del nuevo principal.

| Propietario | Archivo / nombres literales o prefijo anclado | Motivo |
| --- | --- | --- |
| T1 | T1 archivo completo; “read_version_current_candidate_and_historical_rollback”; “wrong_role_denied_before_mutation”; “actual consumed owner approval without original native cleanup capsule remains pending and has no SEND/POST” | engine/old admission y rollback |
| T1 | test/mcp-qa-finite-policy-setup-native.test.mjs: “Task4 actual native wrapper DO store and two-effect engine installs only actual ACK versions”; “Task4 lost activation ACK cannot produce installed receipt or repeat effects”; “Task4 held nested hydration retains original lineage after response until actual settlement” | segundo consumidor engine |
| T2 | test/build-finite-native-package.test.mjs: “actual compiler staging hashes final bytes and retains source classes without eligible manifest”; “missing_factory_blocks_package” | mounts/residencia y completePackage cerrado |
| T3 | T4: “closed source keeps original A and stable original context”; “original approval and enrollment stay closed without publication”; “settled first connection derives read_consent from exact primary state”; prefijos “unknown SEND denies”, “retained original backup denies”, “actual current module and profile independently deny”, “original retained read blocks foreign root until actual settlement”; “fresh QA pointer drift after the first snapshot denies” | observer compartido y partial state |
| T3 | test/mcp-qa-finite-owner-notice-get-native.test.mjs: “GET acknowledged original after actual QA code M token MCP and D04 reader”; “full empty and totally absent schema preserve reader; GET partial schema fails before journal”; “foreign preconnection and UUID history is neither enumerated nor changed”; “owned native hold-before denies bearer continuation and only own stack ACKs” | frames/schema/lifetime shared |
| T3 | test/mcp-qa-finite-owner-notice-consent-native.test.mjs: “native consent POST records original decision after actual ticket GET”; “native consent own SQL continuation alone accepts pending SEND”; “native consent captured failure cannot resume commit”; “native consent correlated DATA denies connection” | private continuity/source correlator |
| T3 | test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs: “D04 actual exchange retains factual read_consent and immutable grant ACK”; “D04 actual exchange then SYN valid native timestamp drift at observation two denies” | actual timestamp y reader común |

Ejemplo de ejecución focal: node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^(read_version_current_candidate_and_historical_rollback|wrong_role_denied_before_mutation)$' test/mcp-qa-finite-policy-transport.test.mjs. Usar la misma forma con los nombres de la tabla; registrar expected/executed/PASS. No ejecutar npm test global ni 50 ms fanout/all SDK por obtener métricas.

Qualifier final propuesto, root lo fija tras aceptación Link/BASE:
1. Job A: T3 nuevo completo (incluye principal y montaje nativo), máximo 15 min.
2. Job B: T4 y selecciones GET/POST/SDK/Link por delta de frames, máximo 15 min.
3. Job C: T1/T2, setup seleccionado, compiler/graph seleccionado y lint de paths modificados, máximo 15 min.

No un cuarto job oculto ni repetición de todo el corpus aceptado. Reutilizar compilaciones por hash inmutable dentro de un grupo cuando el harness ya lo permita; no cambiar scheduler/validadores para mejorar tiempos. Si no cabe, root decide con medición qué agrupación proporcional es válida; no extender timeout, suprimir cobertura causal o rebajar los clocks producto. El compiler actual se invoca por sus tests API en checkout cloud verificado; no build estándar indiscriminado, deploy ni completePackage claim.

Root mantiene deuda explícita baselineSdkReadCurrent: dos fallos iniciales no reproducidos en focales. No se atribuye causa aquí. Reconciliar los casos concretos y evidencia que root entregue junto al BASE; no sleeps, retries ni marcar resuelto por un nuevo GREEN ajeno. Link nativo se verifica en el principal y mediante su caso seleccionado confirmado en BASE, sin inventar hoy un nombre WIP o ampliar gate notices.

## Self-review y handoff

- Cobertura: spec 1–3 → T2/T3; 4–5 → T3; 6 → T1; 7–8 → T3; 9 coincide con el filemap original de16paths más T5/T6 y P11/T7 de preflight Root; 10 → matriz T1/T2/T3/regresiones; 11 → qualifier y límites.
- Consistencia: T3 consume exactamente firmas de T1; choice sólo añade POST al seam interno; P8 cambia de pending a handler en T3. Mount existe antes de fijar bytes/cápsula positiva; no tests verdes sobre M ordinary.
- Grafo: P1/P2 no importan phase-context/residencia; P3 no los recibe indirectamente. QA puede importar P10 y M residente; M no contiene decoder QA. F1 no importa F2.
- Review Focus: cinco riesgos tienen tests propietarios nombrados; negativos resealed no confunden checksum con correlación, y settlement se afirma explícitamente.
- Proporción: tres gates útiles; setup/config/fixture dentro de su deliverable, sin tarea administrativa ni cuerpos repetidos. Plan menor que spec.
- Gaps arquitectónicos abiertos: ninguno identificado. Pendientes de ejecución: aceptación Link/BASE y reconciliación exacta snapshot.noticeLink/downstream, evidencia/deuda SDK entregada por root, coste real bajo límites y actualCloudSourceProof operativo separado. No son permiso para inventar interfaces ni runtime.
- Handoff: root revisa este plan, fija preflight/BASE y despacho SDD futuro. No empezar Task 1 desde esta entrega. Sólo este archivo documental se añade en la rama propia con CAS/readback.
