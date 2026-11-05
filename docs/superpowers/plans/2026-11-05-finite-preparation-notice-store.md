# Finite Preparation Notice Store Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir exclusivamente las tres operaciones de ticket/primer consentimiento finite al issuer store original, con cercado SQL y testigo nativo de una sola utilización.

**Architecture:** La misma instancia existente conserva holders, grant UUID y testigos originales y añade un WeakMap privado para el ticket observado. Dos INSERT SELECT y un SELECT primario condicional comparten la cerca/owner/expiry actuales; ninguna fuente, ruta, journal o receptor se activa.

**Tech Stack:** JavaScript ESM, helpers DATA/issuer actuales, D1 SQLite nativo, esbuild/Miniflare/Node test runner ya instalados en el runner cloud autorizado. Sin dependencias nuevas.

**Spec:** [2026-11-05-finite-preparation-notice-store.md](../specs/2026-11-05-finite-preparation-notice-store.md)

## Global Constraints

- DESIGN ONLY; implementación INACTIVE hasta revisión de root y despacho con HEAD aceptado futuro. No usar automáticamente el pin documental como producto.
- PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006). Producto inspeccionado51c5db8e987755ccf2819ba861461916e0396943/árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630. Rama docs/finite-native-notices-design-20261105; no seguir al writer activo de fanout.
- Preservar todos los métodos, SQL, esquemas, testigos, journals y blobs actuales del issuer.
- C0=I0+900000 y C1=C0+180000; padre original<=30000ms, operación hija<=5000ms; reloj nativo sin compensación.
- El techo fuente2026-11-03T02:59Z está vencido. operationalReadiness=false; completePackage=false; PCoff=false. Ninguna prueba de componente renueva ventanas reales.
- Sólo primer grant de avisos; no revoke ordinario, nuevo UUID, callbacks de autoridad, source factories, allowPending, idempotencia durable inventada ni fallback.
- Sólo tres archivos producto/test del mapa siguiente. No nueva tabla SQL, migración, schema helper separado, codec ni notice journal.
- No host ordinario, phase-context, SDK/alias, source stub, mount, transporte, cleanup, config, permiso, provider/AFW call o runtime nuevo.
- No clones, dependencias, tests/build locales. Después de activación usar el runner cloud existente autorizado y revisión exacta; no crear workflow, permisos o servicio por inferencia.
- No handle bruto, JWT, secreto o SQL con binds privados en reportes/logs.

## Review Focus

- Validación JS correcta pero sentencia retenida hasta después del plazo: la fila debe permanecer ausente por condición SQL real; Step1/4 cubren ambas escrituras y5100ms.
- Techos anidados: registrar límite elegido y mínimo derivado, sin afirmar aislamiento de predicates temporalmente indistinguibles; Step1/4 cubren cada techo.
- Testigo observado válido cuya fila/owner cambia antes del INSERT: consumir la referencia no evita una carrera; Step1/4 requieren nueva comprobación SQL completa.
- Commit conocido por la fixture pero respuesta perdida/retenida: el caller no recibe éxito ni segundo write; Step1/4 comprueban fila persistida y Promise real, no retorno temprano.
- Nueva tabla de avisos requerida accidentalmente por métodos issuer antiguos, o exchanged_at confundido con ACK inmutable: Step4 conserva regresiones originales sin esquema de avisos y Step3 no toca phase-context.

---

## File structure

Modificar lib/mcp-qa-finite-preparation-issuer-store.mjs: incorporar tres métodos y una constante schema original, sin modificar métodos/SQL antiguos.
Modificar test/fixtures/finite-preparation-issuer-worker.mjs: escenarios notice-* aislados, reutilizando wrapper/query/session, lease SYN, issuer positivo y gates nativos.
Crear test/mcp-qa-finite-preparation-notice-native.test.mjs: pruebas funcionales/causales y comparación del schema exportado contra los dos db/*.sql originales.

El informe de implementación se añade **después**, fuera del mapa de producto y sólo al cerrar el trabajo, en docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md. El informe de diseño actual tiene sufijo -design y se conserva. No modificar documentos históricos para aparentar ejecución.

## Task 1: Native fenced notice store component

**Files:**
- Modify: lib/mcp-qa-finite-preparation-issuer-store.mjs:29-156 (métodos nuevos/helpers locales; métodos antiguos intactos).
- Modify: test/fixtures/finite-preparation-issuer-worker.mjs:10-153 (ramas notice-*; preservar escenarios existentes).
- Create: test/mcp-qa-finite-preparation-notice-native.test.mjs.

**Interfaces consumed:** createFinitePreparationIssuerStore({ctx,env}), validateFinitePreparationIssuerIdentity, issuerTime/issuerIso/issuerUuid/issuerScopes, initialFields/initialOwn; métodos openFence/insertAuthorization/consumeAuthorization/insertReadGrant/closeFence/reconcileFence/observeGrant/revokeGrant actuales; createDossierMonitoringAuthorization sólo en test de reducción.

**Interfaces produced:** exactamente insertMonitoringTicket({...Common,ticket},originalLease), observeMonitoringTicket({...Common,ticket},originalLease), insertMonitoringConsent({...Common,ticketWitness},originalLease), como miembros de la **misma instancia**. Common={identity,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window}; ticket={handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}. Tipos,14/12 columnas, exactitud del witness y resultados son los de la spec. Único export adicional: FINITE_PREPARATION_MONITORING_SCHEMA frozen de siete DDL originales; sin factory/export de witness o nuevo codec.

- [ ] **Step 1: Escribir el positivo causal y los hostiles en el harness real.**

  En el nuevo test usar el mismo entrypoint de fixture, compatibilityDate2026-09-07, flags['nodejs_compat'], D1 RELEASE_DB y DO SQLite, con uniqueKey SYN aislada por escenario. Compilar una vez el entrypoint para este archivo de tests, sin modificar el runner issuer existente. El test lee db/dossier-monitoring-consent.sql y db/dossier-monitoring-owner-tickets.sql y entrega sus siete DDL al campo fixture-only monitoringSchema; la fixture ejecuta ese DATA sólo en notice-* y en el mundo explícitamente SYN. Esto permite RED por método ausente sin un import nominal de constante inexistente. Nunca montar esa entrada.

  El positivo debe llamar efectivamente openFence→insertAuthorization→consumeAuthorization→insertReadGrant, con resultados nativos, y luego:
  - test `REAL first notice uses native original issuer grant and observed ticket`: assert grant.id===identity.grantId; ticket.status==='applied'; witness.status==='observed'; consent.status==='applied'; row.expires_at===ticket.row.permission_expires_at y row.expires_at-row.issued_at>5000; sólo una fila original por tabla; UUID sin cambio; SELECT del ticket es primera sentencia de nueva first-primary después de preflight en otra sesión.
  - test `REAL first notice keeps absolute permission beyond child window`: permiso válido con expiry absoluto al menos10000ms después del issuedAt original y operación<=5000; assert expires_at no fue reemplazado por deadline ni Date.now()+5000.
  - test `REAL global sequence is not per-grant plus one`: insertar previamente un evento explícitamente ajeno SYN; expectedSequence=0 para el original; assert nuevo sequence>1, MAX original previo0 y ambas historias preservadas.
  - test `REAL schema metadata equals unchanged original seven statements`: importar módulo como namespace; assert constante frozen, longitud7 y igualdad normalizada con archivos originales, sin filesystem import de producción.

  Añadir tablas parametrizadas con nombres estables:
  - `REAL native notice rejects hostile DATA and foreign ticket witness`: clone/JSON/raw row/otro store/otra lease, getter(count0), symbol, prototype, sparse/oversize, keys extra; cada cambio de Common/ventana/ticket y argumentos omitidos/extra; no SQL mutante emitido.
  - `REAL native notice current tuple races deny at commit`: gate tras observe antes del INSERT; cambiar por caso owner,revision,grant immutable tuple/scopes/revoked_at,consumed auth,issuer fence o evento competidor. Ticket DATA alterado se prueba antes de observe; un UPDATE ordinario debe abortar por trigger. Un caso SYN explícito, después del preflight, elimina sólo el trigger necesario y altera el ticket en la fixture antes de liberar INSERT, que debe negar por comparación completa de fila. Es tamper negativo aislado, no schema de producción ni mutación legítima. Assert nuevas filas0 y estado ajeno intacto.
  - `REAL monitoring preflight denies missing or changed original schema`: cada tabla/unique/constraint/índice/trigger/objeto extra/tipo/clock/ISO; assert cero mutaciones de avisos. No normalización que elimine constraints.
  - `REAL queued monitoring INSERT denies after native deadline`: operar ticket y consent por separado, gate antes del bound.first nativo, await5100ms y liberar; assert gate alcanzado antes del plazo y nueva fila0.
  - `REAL queued monitoring INSERT denies earliest <ceiling>`: por ambas escrituras, C0,consent,grant,Access,preconnection,ticket,permission como menor techo válido; cruzar el reloj real hasta mínimo+50ms y liberar; assert gate previo al mínimo, cero filas nuevas, reportar empates derivados.
  - `REAL original issuer barrier beats queued monitoring INSERT`: ambas escrituras detenidas; CLOSE y lectura primera de nueva primaria completadas; liberar y assert sin nueva fila.
  - `REAL issued notice remains historical after original grant reduction`: evento concedido primero; CLOSE→observeGrant→revokeGrant nativos; autoridad real enabled=true después de sólo CLOSE con grant aún activo y enabled=false después de revokeGrant; evento conservado y cero grant nuevo. No llamarlo retirada humana.
  - `REAL post-commit notice ACK loss blocks another write in this store`: perder resultado tras commit tanto de ticket como consentimiento, filas reales conocidas por fixture; assert rechazo, ningún witness otorgado por fallo de ticket, y nuevo intento de ambas escrituras en esa instancia denegado sin otro INSERT.
  - `REAL held native SQL settlement cannot become successful cancellation`: retener resultado después del commit, abortar el lease SYN, observar Promise todavía pendiente, liberar y assert rechazo/estado absorbente; la fila persistida no desaparece.

  Gates deben interceptar únicamente el INSERT/SELECT real correspondiente; ningún SQL predicado se reemplaza. El error de fixture se sanea y se devuelve metadata/counts/booleanos, nunca valores de handles/JWT/secretos. Inputs/colas/lease son SYN; resultado de SQL/autoridad es nativo. No source/SDK/qualifier alias.

- [ ] **Step 2: Ejecutar RED causal en cloud autorizado y conservar evidencia.**

  Root debe haber activado este HEAD futuro. Ejecutar:
  `node --test --test-name-pattern="REAL first notice uses native original issuer grant" test/mcp-qa-finite-preparation-notice-native.test.mjs`

  Esperado: el issuer original crea realmente su grant y el test falla en la invocación ausente insertMonitoringTicket (captura saneada de método no existente), con cero ticket/evento. Error de instalación/bundle/fixture/DDL no cuenta como RED. No implementar un fallback ni sustituir la llamada para lograr el fallo previsto. Registrar revision/tree/run/job/attempt y assertion, sin secretos.

- [ ] **Step 3: Implementar exclusivamente el contrato de la spec en el mismo store.**

  Añadir FINITE_PREPARATION_MONITORING_SCHEMA como siete strings originales congelados, checks de schema de avisos en preflight separado y helpers nuevos de DATA/testigo. No cambiar input/preflight/SQL/métodos antiguos ni volver obligatorias las tablas de avisos para ellos.

  Añadir WeakMap privado para el testigo y estado de attempts/fallo por identityHash. Observe captura todas las14 columnas después de un SELECT condicional como primera sentencia de nueva first-primary. Método3 compara Common exacto, consume esa referencia antes del await y toma su ticket del WeakMap. Los dos INSERT SELECT y el SELECT comparten condiciones SQL de la spec, incluidas n.ms real, cerca original, owner/revisión, grant/auth actuales, scopes exactos y todos los techos. Evento issued_at es n.ms y expiry es el permiso absoluto del ticket.

  Errores/ACK desconocido de mutación se sanea/rechaza y bloquea futuros writes de avisos en esa instancia/identidad. RETURNING vacío es no_mutation; nunca recuperar éxito tras excepción. Conservar la Promise real con c.wait/query existentes y no afirmar cancelación física. No añadir journal, callback, schema repair o sender.

- [ ] **Step 4: Ejecutar GREEN y regresiones afectadas una vez, en cloud.**

  `node --test test/mcp-qa-finite-preparation-notice-native.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs`

  Esperado: cero fallos y cero skips en esos archivos. Las ramas originales de fixture siguen sin instalar esquemas de avisos y todos sus métodos/regresiones conservan comportamiento. Inspeccionar especialmente close/reconcile fresh-first-primary, testigos originales, expiración nativa y unknown/held ACK. Una prueba hostil que pasa porque el método falta o no se alcanzó su gate es inválida.

  Ejecutar lint con instalación existente:
  `node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-preparation-issuer-store.mjs test/fixtures/finite-preparation-issuer-worker.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs`

  No full npm CI, descarga de herramientas ni compiler estándar adicional si diff/import graph sigue unmounted y sin nuevas dependencias de producción. El bundle nativo de la fixture se compila en los tests. Si aparece una dependencia/graph change inesperada, registrar el bloqueo de alcance para root; no arreglarla ampliando esta tarea silenciosamente.

- [ ] **Step 5: Verificar el diff y escribir el recibo acotado.**

  Comparar con HEAD exacto activado por root. Sólo store/fixture/nuevo test pueden cambiar en producto; cuerpos SQL/métodos/esquemas/exports antiguos y db/*.sql permanecen intactos. Añadir el informe de implementación indicado con BASE/head/tree, RED/GREEN reales, comandos/counts/skips/warnings, límites/gates alcanzados y empates de ceilings. Separar caller DATA de identidad real y componente de fuente operativa. Fuente ceiling vencido, post-token ACK gap y demás dependencias siguen pendientes.

- [ ] **Step 6: Commit por expected-head y revisión independiente de root.**

  Commit candidato `feat(afw): fence native preparation notice store`, exclusivamente en rama aislada autorizada y expected-head CAS. Root revisa diff/casos/evidencia antes de aceptar. No merge/main/publish/mount ni acción de proveedor. Si root rechaza una condición de SQL/testigo, devolver el componente a corrección; no ejecutar unidades downstream.

## Self-review del plan

Una sola unidad y un ciclo RED/GREEN; métodos/nombres/fields coinciden con spec. Positivos usan grant nativo real, no un grant precargado. Los cinco Review Focus tienen casos de Step1 y comprobación Step4. Los fixtures entregan DDL sólo a su mundo SYN; producción sólo califica schema. El test de reducción usa autoridad real y deja historia intacta, sin confundirla con unsubscribe/cleanup. Falta intencionalmente journal/receptor/fuente/identidad humana y proyección histórica del grant ACK: ninguno se reclama aquí. Plan revisable; no se ejecutó ningún step ni se solicita activación al usuario.
