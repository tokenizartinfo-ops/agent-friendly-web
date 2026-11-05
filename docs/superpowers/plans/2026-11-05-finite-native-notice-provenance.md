# Finite Native Notice Provenance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Un único futuro implementer recibe el brief completo de root; no helpers. Root conserva revisión de spec/quality y coordinación de revisión independiente exigida por el workflow vigente. No se despacha implementación ni reviewer desde este plan.

**Status:** INACTIVE. Root debe leer spec/plan, completar preflight y fijar HEAD posterior a aceptación del notice store. La rama docs y el pin7a2 no son ese HEAD.

**Goal:** Registrar seis filas append-once de procedencia de ticket/consentimiento, sin API de autoridad ni integración de receiver.

**Architecture:** Nuevo codec estricto y journal DO separado, usando el patrón issuer de transacción final+sync+readback y retención real. Una fixture nativa SYN compone el store aceptado para demostrar replay/unknownACK/hold; ningún producto existente importa los nuevos módulos.

**Tech Stack:** ESM Node, node:test, Miniflare/workerd SQLite DO + D1, esbuild existentes del repositorio. Ejecución cloud autorizada por root; no deps/build/tests locales.

**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md
**Context:** docs/superpowers/reports/2026-11-05-finite-native-notice-receiver-design.es.md

## Global Constraints

- SOURCE ONLY/SYN; C0=I0+900000, C1=C0+180000; padre<=30000ms/hija<=5000ms; techo2026-11-03T02:59Z vencido. Sin renewal/rearm/clock injection.
- Exactamente cinco archivos nuevos de Task1. No modificar store, phase, M, SDK, authority, schemas, cleanup, entrypoints, permisos ni CI permanente.
- Journal máximo6/list7; no ampliar issuer/SDK. SEND durable no-ACK bloquea siguiente SEND; existing no autoriza SQL. appendAck es DATA interno: procedencia real requiere el futuro handler fijo, no la valida este componente.
- WeakMap acredita referencia/instancia/lease, nunca identidad o consentimiento humano. Ningún DTO de autoridad, callback aprobador, allowPending, fallback o constructor de witness.
- Ni seis filas ni ACK prueban source notices, third CLOSED, revocación, drain, subscription, guard, mount, ARM, hosted o PC-off.
- Sin proveedor, secretos, HTTP runtime, browser, DDL remoto, main, merge ni publicación. operationalReadiness=false; completePackage=false; PCoff=false.
- Rollback sólo de commit propio con expected-head CAS/readback. Sin borrar journals/D1 ni actividad ajena.

## Review Focus

1. Dos callbacks de transacción que compiten por el mismo SEND: un solo recorded puede continuar, incluso después de recrear journal.
2. Pérdida tras commit/sync/readback: filas pueden existir sin autorización de continuar; restart no “recupera” ACK desde SQL.
3. Access POST más corto y permiso absoluto: rechazar ticket incompatible; no recortar retroactivamente ticket ni ampliar expiry.
4. Congelación y Promise retenida: freeze es histórico; retención real no termina al abort y no prueba drain entre isolates.
5. DATA con getter/prototipo/hash inconsistente u operación huérfana: error genérico antes de efectos; lectura exhaustiva no ignora séptima clave.

## Task1 — Codec y journal append-once con composición nativa

**Create:**
- lib/mcp-qa-finite-preparation-notice-records.mjs
- lib/mcp-qa-finite-preparation-notice-journal.mjs
- test/mcp-qa-finite-preparation-notice-provenance.test.mjs
- test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
- test/fixtures/finite-preparation-notice-provenance-worker.mjs

**Consumes:** initialOwn/initialFields/initialCanonical/initialHash; validateFinitePreparationIssuerIdentity y validadores issuer; captureFinitePreparationIssuerContext({ctx,env}); retainFiniteOwnerStagePromise. Fixture importa store aceptado/constantes schema, no cambia sus firmas. El positivo crea grant con openFence→insertAuthorization→consumeAuthorization→insertReadGrant; monitoring usa las tres firmas propuestas exactas.

**Produces:** seal/encode/decodeFinitePreparationNoticeRecord(kind,input/raw), FINITE_PREPARATION_NOTICE_PREFIX/OPERATIONS; createFinitePreparationNoticeJournal({ctx,env}) con appendReservation(record,lease), appendSend({preconnectionId,record},lease), appendAck({preconnectionId,operation,record},lease), freeze({preconnectionId,record},lease), read({preconnectionId},lease). Resultados/status y campos exactos están en spec; no producir flag ready/authority/drain.

- [ ] **1. Fijar baseline y condiciones de trabajo.** Root entrega HEAD/tree/branch futura y evidencia de aceptación del store; writer comprueba los cinco paths ausentes y snapshots de módulos inmutables. Identificar Actions autorizado y rollback propio. Si el store aceptado difiere en firmas, volver a root antes de ampliar scope. No usar rama activa ajena ni instalar nada.

- [ ] **2. Escribir tests causales antes de implementación.** Codec: reservation válida original, ticket SEND/ACK, consent SEND/ACK(sequence=17 con expectedSequence=0), freeze; exact round-trip. Mutaciones: extra/symbol/getter (contador0), proto/sparse/oversize, hash falso, ventana5001ms, C0/C1 incoherente, Access menor que ticket, consent sin ACK ticket, null/sequence incorrecta. Cada aserción expresa contrato, no copia el body del codec.

- [ ] **3. Crear fixture nativa y RED primaria.** Reusar configuración Miniflare/workerd y patrón issuer fixture; setup SQL/grant nativo finaliza primero y se comprueba grant UUID original. Añadir sólo un stub exportado de la nueva factory que lance el error genérico para que el bundle cargue; no es implementación ni capacidad. Invocarlo sólo tras comprobar grant real: resultado saneado incluye reachedNativeGrant=true y el error de journal. La aserción principal exige journal reservation recorded y falla en esa conducta ausente; no aceptar fallo de bundle/import global, schema setup o timeout como RED. Registrar run/head, gate alcanzado y error concreto. La fixture todavía no implementa lógica de journal ni efectos simulados.

- [ ] **4. Implementar codec según campos exactos.** Snapshot antes de await, estricto own/fields, hashes/domains y16384bytes; deep-freeze detached. Validate context-sensitive Send/Ack al leer journal, porque el codec aislado no tiene reservation. No “validar” autoridad humana a partir de hashes.

- [ ] **5. Implementar journal.** Usar contexto issuer capturado y su retención sin modificaciones; transacción real con inventario limit7. Validar estructura/enlaces de todo inventario; si clave ya existe, comparar bytes y devolver existing antes de reglas de progresión que impedirían nueva escritura tras freeze. Para clave nueva aplicar transiciones de spec. Esperar retorno final, sync y readback exacto. Forma inválida lanza; fallo append después de preparar devuelve uncertain. No timer/retry/recovery/delete.

- [ ] **6. Completar GREEN nativo significativo.** Casos y assertions obligatorios:
  - grant/ticket/observación/consent reales y rowhash exactos; leer desde journal nuevo entre GET y POST; misma witness/store/child en observe+consent, MAX por grant0, sequence global17 o >1 realmente asignada (filas ajenas SYN preservadas).
  - dos appendSend concurrentes iguales→statuses recorded/existing exactos; fixture emite SQL sólo para recorded; contador SQL de mutación1. Otro ticket/reservation conflictivo nunca reemplaza.
  - freeze con o sin SEND/ACK preserva registros, niega todo nuevo SEND/ACK; replay byte-idéntico existing sin SQL.
  - native transaction callback throw→0fila; final-return throw/sync loss/readback loss después de commit→fila real posible y uncertain, contador SQL no aumenta.
  - actual SQL result throw después de commit→evento/ticket existe, SEND sin ACK; journal nuevo conserva SEND pendiente y niega consent SEND sin ticket ACK; fixture no reconstruye ACK desde SQL. No afirmar que appendAck autentica arbitrarios callers internos.
  - Promise REAL de transaction/SQL retenida tras abort: nueva entrada del mismo contexto rechaza mientras pendiente, luego settle observado. Usar observeFiniteReadOnlyWork sólo como scope SYN de retención, no identidad humana; cero claim de drain entre RPCs.
  - clave extra/séptima fila/huérfano/metadata actor/version cambiada niegan. Capturar sin filtrar inventario desconocido.
  - Access menor que ticket, ventanas/reloj fuera de límite y getter count0 no generan mutaciones.
  Para pérdida SQL, fixture conserva pending y no llama appendAck desde lectura; la prueba demuestra que el protocolo fuente no hace replay, no que journal autentica al fixture.

- [ ] **7. Ejecutar checks proporcionales en cloud autorizado.**
  - node --test test/mcp-qa-finite-preparation-notice-provenance.test.mjs
  - node --test test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
  - node --test test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs
  - Lint dirigido a los cinco archivos con ESLint ya instalado del repo.
  Exigir0FAIL/0SKIP en nuevos casos; reportar cantidad/builds/run/head. Regresión store no debe afirmar enabled:false tras revokeGrant: autoridad real rechaza Monitoring authorization unavailable y conserva evento. No ejecutar esa prueba para modificar authority ni rehacer D0.4. Diff debe demostrar fase/M/SDK intactos, incluido exchanged_at actual y ACK histórico. Cualquier graph nuevo en producto requiere volver a root.

- [ ] **8. Guardar checkpoint y revisión root.** Un commit propio de cinco archivos, informe breve con RED causal/GREEN nativo, diff BASE..HEAD y pendientes. Si root autoriza qualifier temporal contents:read sin secretos, retirarlo del diff final y registrar run/head; este plan no lo autoriza por sí mismo. Root revisa spec/quality y aplica workflow SDD vigente; writer no crea helpers/reviewer. No segundo writer simultáneo.

- [ ] **9. Cerrar sólo esta unidad.** Entregar HEAD/tree/cinco paths/tests/limitaciones; no importar journal en runtime ni extender fase. Root puede aceptar SOURCE y seleccionar una siguiente unidad distinta. La aceptación no activa el receiver ni habilita API/humano/PC-off.

## Handoff posterior explícito, fuera del plan

El receiver fijo requiere diseño/plan propios de lib/mcp-qa-finite-owner-notice-{qa,wire,forward}.mjs y extensión léxica de phase-context. Debe derivar actor/source/preconnection/original grant del par factual, verificar Access firmado y approved-ticket original, Origin/CSRF/form reales antes de SEND, y llamar store nativo antes del ACK/UI. No puede usar host ordinario ni convertir su consentimiento post-ACK en uno cercado. POST estrecha techo actual, no reemplaza original. notices/third CLOSED, tres receipts/Selection, own-SEND/full setup, retirada/cleanup/drain y hosting permanecen cerrados hasta sus productores y pruebas reales.
