# Finite Native Notice GET + Private Facts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Un futuro writer único trabaja desde brief/BASE de root; sin helpers. Root conserva preflight/revisión de spec+quality y revisión independiente que exija el workflow. Este documento NO despacha agentes ni implementación.

**Status:** INACTIVE / SOURCE ONLY / SYN / UNMOUNTED. Root debe fijar futuro BASE con store y journal aceptados. Journal aceptación comunicada2969a840860d47997132eb081d1e65376f3953e0; no se sigue rama activa.

**Goal:** Un GET autenticado prepara un ticket nativo y su journal, con comparación privada de ambos snapshots antes de responder; no concede permiso.

**Architecture:** Observer privado incluye notice journal/schema/filas del UUID original; reader público sigue3keys y niega contenido notice. Handler GET en el mismo módulo conserva expected-frame y resultado SQL léxicos; forward/receiver fijos transportan Request original. Ningún callback de autoridad o par crudo exportado.

**Tech Stack:** ESM, Node test, esbuild/Miniflare/workerd y D1/DO reales en fixtures SYN cloud existentes.

**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-next-slice.md
**Report:** docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice-design.es.md

## Global Constraints

- C0=I0+900000; C1=C0+180000; padre<=30000ms/hija<=5000ms; source ceiling2026-11-03T02:59Z vencido. Sin renewal/offset/rearm.
- Sólo diez paths de spec; cuatro producto y seis tests/fixtures. Store/journal/SDK/authority/SQL/schemas/config/entrypoints ordinarios no se modifican.
- Prefijo propio y UUID grant original; sin globalCOUNT/latestgrant/list de otros proyectos. Historia ajena intacta.
- Completar todos los hechos/snapshots y preservar fanout original; current grant.exchanged_at permanece real en snapshots. ACK histórico únicamente proyecta ''.
- GET exige siete schema objetos exactos antes de reservation/SEND. Carrera posterior sigue posible; no retry/repair/atomicidad global.
- POSTmonitoring cerrado; sin NoticeLink/source notices/third CLOSED/mount/ARM/hosting/guard/PC-off.
- expected-frame y actualPromise/actualResult SQL sólo léxicos; existing/uncertain/no_mutation no producen200 ni formulario.
- No nuevas credenciales, provider requests, permisos CI, DDL remoto, publicación, merge/main ni ejecución local. operationalReadiness=false; completePackage=false; PCoff=false.

## Review Focus

1. Journal/ticket propio aparece después de SEND y antes de ACK: sólo stack dueño con Promise SQL realmente resuelta puede aceptarlo; lector público/otroGET niegan.
2. Inventario desconocido o schema parcial no desaparece mediante límites, normalización o claves omitidas; grant ajeno nunca entra en lookup.
3. Access GET actual más largo no renueva original; expiry/owner/pointer/SDK pending o drift entre snapshots niega incluso con ticket persistido.
4. Unknown append/SQL ACK o Promise/body/cancel retenidos: no ACK reconstruido/replay; pending del journal no se confunde con exclusión física.
5. Lecturas/graph nuevos alteran costo de rechecks originales; medir sesiones/list/HTTP reales y mantener30s/5s, sin repetir50ms/allSDK por obtener cifras.

## Task1 — Recorrido GET y hechos privados, una unidad de revisión

**Files:** los diez paths exactos de spec. Crear producto wire/forward/QA y modificar phase-context; crear test native+fixture notice; modificar world, sdk fixture, io fixture y assertions métricas sdk native. No otro path sin root.

**Consumes:**
- createFinitePreparationNoticeJournal({ctx,env}).appendReservation/appendSend/appendAck/read, codec/seal6filas aceptados; DATA no autentica SQL.
- createFinitePreparationIssuerStore({ctx,env}).insertMonitoringTicket({...Common,ticket},lease) y FINITE_PREPARATION_MONITORING_SCHEMA; no nueva factory preflight.
- observeOwnerPhasePair PRIVATE, qualifySettledOwnerPair PRIVATE, source/Access/approved-ticket/ConnectionRef actuales; request lease, narrowing, retain y native wire existentes.
**Produces:**
- three wire APIs y forwardPrivateFiniteOwnerNoticeGet, createPrivateQaFiniteOwnerNoticeGetReceiver según spec;
- handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease) fixed Request completo;
- snapshot PRIVADO records.notice/anchor.notice/noticeRows, sin cambios a3keys públicas.

- [ ] **1. Preflight y preservación.** Root entrega BASE/tree exactos, rama aislada writer, accepted store/journal refs y alcance cloud. Verificar bytes/interfaces sin seguir ramas ajenas. Guardar diff base, hashes de store/journal/source stubs/Mordinario/SDK y fixtures afectados. Root fija autorización del qualifier temporal (si lo hubiera), contents:read/sin secretos, rollback por CAS y compilador estándar adicional según graph. No inferir permisos de este plan.

- [ ] **2. RED factual sobre comportamiento existente.** En nuevo native test, reutilizar initialEntryHarness modo nuevo opt-in para emitir grant por OAuth GET/POST reales. Instalar siete DDL sólo en fixture explícita. Confirmar reader original3keys/read_consent y SQL/grant actual. Añadir por fixture un registro unknown al prefijo notice PROPIO o ticket SQL ordinario etiquetado NEGATIVE para UUID original, sin alterar grant/owner. Exigir que readPrivateQaFiniteOwnerContext devuelva unavailable. BASE lo ignora y devuelve contexto: RED causal. Caso distinto de proyecto/grant queda sin cambios y reader continúa. No presentar semilla negativa como productor finite ni saltar prerequisitos.

- [ ] **3. Implementar inventario privado y cierre de lectores.** En phase-context añadir journal.read por snapshot, selectAll privado fresh-primary, schema/tickets/events queries exactas y noticePrimary/correlaciones. Mantener facts/primary/qualify/igualdad completa y fanout; schema ausente total compatible con notice vacío, parcial/tamper niega. qualifySettledOwnerPair y OAuthrecheck niegan cualquier notice/ticket/evento original. Ejecutar los nuevos casos de inventario y positivos vacíos; no cambiar sourceBase/phase. No insertar tolerancia parametrizable.

- [ ] **4. RED del GET con prerequisitos reales.** Fixture routing opt-in M/QA a nuevas interfaces fuente; si los módulos aún no existen, usar stubs exportados unavailable exclusivamente para que bundle cargue, identificados como scaffolding. Grant real original, Access SYN firmado verificable, prepare cookie y source/pins correctos deben estar listos ANTES del GET. Requerir200, un ticket nativo y reservation/ticket:send/ticket:ack; la ausencia de GET falla con503/404 y0ticket. Error de import/bundle/schema/fixture o expiración antes del gate no es RED. Guardar una sola evidencia causal válida, no iterar fallos artificiales.

- [ ] **5. Implementar wire/forward/QA.** Signatures/URLs/grammar exactos de spec; sólo GET humano/body0, metadata sobrescrita, mismo actor/binding/version, request lease original, retención fetch/body/cancel. M no ejecuta SQL ni forward post-ACK ordinario. Receptor crea lease del Request reenviado y llama handler; no opción pública de bypass. Fixture añade route sólo en modo noticeGet=true; producción permanece sin mount.

- [ ] **6. Implementar handler y máquina léxica.** Baseline completo vacío; schema READY antes de cualquier escritura; Access firma/issuer/audience/expiry real, preparecookie/approved-ticket/owner/GrantLink/ConnectionRef. Generar único handle/UUID y tiempos min originales. Guardar expected privado; appendReservation recorded→actualizar sólo notice/anchor→recheck. Child única de ticket: SEND recorded→recheck0fila→SQL Promise REAL→applied exacto→recheck1fila→ACK real recorded→recheck íntegro. actualPromise/actualResult SQL no se sobrescriben con resultados journal. No_mutation/error/uncertain/existing termina503 sin nuevos efectos; no reintentar ni reconstruir desde SELECT. Sólo200 final con formulario disabled/cookie/restricciones exactos; no POSTconsent.

- [ ] **7. GREEN integrado y adversariales mínimos.** Nuevos casos nativos, sin snapshot/identity verifier/product API mock:
  - **GET acknowledged original:** actual QAcode→Mtoken→MCP original→D0.4 reader3keys antes de GET; JWT SYN firmado. GET nuevo real devuelve200; ticket14campos exactos, tres rows journal con hashes/ACK correctos, eventos0, grant y exchanged_at/issuerACK originales intactos; HTMLdisabled/noJS/CSPform-action none/cookieStrict. Reader público después unavailable, no new phase.
  - **Empty compatibility:** schema ausente y completo-vacío, ambosreader3keys; GETausente/schema parcial niega ANTES reservation/SEND, contadores0. Índice/trigger/objeto extra SQL niega. Otro UUID/preconnection con historia no afecta y permanece byte/fila idéntica.
  - **Grammar and person:** methodPOST, foreignURL/query/body/metadata/cookie duplicada, invalidsignature/wrongsubject/wrongaudience, missingpreparecookie y Access que vence durante GET antes de reservation: ninguna mutación. CurrentAccess longer no cambia expiry original; expiry más corta aún válida produce ticket clampado, porque GET no acepta ticket propuesto por caller.
  - **Own transition / no bearer:** gate real tras SEND antes de INSERT y después de INSERT committed antes de liberar resultado. Reader público y segundoGET niegan; después de liberar original dentro de plazo, sólo continuación dueña puede ACK. Test no llama handler con expected/allowPending ni exporta pair.
  - **Inventory/correlation:** unknownkey/overflow, ACK sinSEND, rowhashincorrecto, identidad/GrantLink/ConnectionRef incoherentes; fila real sinjournal, SEND ajeno, ticket diferente mismoUUID, cualquier consent evento: denegar. Manipulaciones negativas rotuladasSYN.
  - **Drift two snapshots:** gates antes de segunda observación; cambiar owner/revision, pointer/version o exchanged_at canónico distinto y un journal/ticket propio. Snapshot conserva fila actual; no resolver por normalizar exchanged_at. Si ticket UPDATE requiere retirar trigger, sólo SYNdestructivo después de primer snapshot y se reporta como corrupción, nunca operación legítima.
  - **UnknownACK:** retorno journal perdido tras commit/sync/readback→no siguienteSQL; retorno SQL perdido después de commit→ticket presente, SEND sinACK,503; repeatGET no amplía rows/fecha ni devuelve handle. Freeze intercalado bloquea ACK; conservar evidencia, sin rollbackdeD1.
  - **Queue/expiry/CLOSE:** gate antes de ejecutar INSERT; atravesar ventana real5s o CLOSE original previo a liberar→cero ticket/ACK. Ticketgana→CLOSE no borra ticket ni revoca grant; usar reducción original sólo en fixture y conservar historia. Sin nuevo presupuesto ni Date patch; assert gate alcanzado antes de expiry.
  - **Retention:** retener SQL/body/cancel reales tras abort; scope externo stage-work bloquea otro ingreso del mismo ctx con leaseSYN vigente dentro del deadlineoriginal hasta settle; nunca atribuirlo al pendingSet de journal ni declarar drain entre RPCs.
  Registrar schema7/DOlimit7/ticketlimit2/eventlimit3 y consultas exactas, sin imprimir valores privados/handle/JWT.

- [ ] **8. Medir y comprobar presupuestos sin investigación redundante.** En el mismo GREEN capturar fases baseline/reservation/SEND/SQL/ACK, snapshots, sesiones first-primary y consultas first/all, DOops, HTTPcantidad/peak/tiempos, SQLgate y realresolution. Cada consulta factual primera de una sesión nueva; ningún eventlookupglobal. Distinguir queries preflight versus noticeSchema. Medir GETQA completion antes del deadlinechild en positivo y padre<=30s; no renovar para obtenerGREEN. El fanout original conserva scheduler/peak2 y orden. Nuevo IOobserver no altera guards/returns/resultados; markers originales únicos o restringidos lexicalmente al bloque correspondiente. No ejecutar50ms/allSDK sólo para nuevos números.

- [ ] **9. Checks proporcionales en cloud autorizado.**
  1. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
  2. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
  3. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
  4. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
  5. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
  6. ESLint dirigido a los diez archivos con herramienta existente; QA/M compilan realmente dentro del harness, conservar metafiles/hash/bytes/perfiles y comparar graph. Compilador estándar adicional sólo conforme preflightroot de paso1.
  Reusar GREEN aceptados store/journal si sus blobs siguen exactos; el nuevo test ejerce APIs reales. Contar casos seleccionados/no seleccionados, no anunciar0SKIP de toda la suite usando filtros. Una vez pasan, ampliar sólo por defecto, graph/fixture adicional o gate requerido por root. Preservar50ms accepted como evidencia anterior separada, no como resultado de esteHEAD.

- [ ] **10. Checkpoint y revisión.** Commit único de unidad o checkpoints propios permitidos, diff exactoBASE..HEAD y rollbackCAS. Informe con RED/GREENruns/head, conteos reales, schema/queries/source3keys/GETclosedPOST y costo de graph; qualifier temporal retirado si root lo autorizó. Root spec+quality y workflowSDD; writer no crea helpers/reviewers. No cambios de source/public flags por pasar tests. Pendientes restantes quedan expresos, no nuevos PR/merge/main.

## Salida y siguiente unidad

Entregar HEAD/tree/paths, tests seleccionados/costos/bundles y riesgos. El resultado SOURCE prepara formulario deshabilitado y ticket; no representa capacidad pública completa. La siguiente unidad POST debe planificar identidad actual, Origin/CSRF/acción explícita, testigo nativo real en store/child exactos y consentimiento antes de ACK. Después NoticeLink/stages/Selection/third CLOSED, cleanup/drain/mount/hosting siguen revisiones separadas. Rollback código jamás borra tickets/eventos de otro grant ni de este intento.
