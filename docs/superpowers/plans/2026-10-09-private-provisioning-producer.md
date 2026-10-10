# Reserva primaria del ensayo propio: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** habilitar una reserva exclusiva de los recursos propios del ensayo apoyada en lecturas administrativas reales y recepción autenticada, antes de instalar una ocurrencia acotada.

**Architecture:** un único Durable Object administrativo conserva expedientes de evidencia y propietarios CAS por recurso. La lectura del desafío procede del preregistro primario; la correlación de ejecución procede de constatación administrativa independiente sobre originales de plataforma. La instalación requiere un fence persistente coordinado: DO y D1 no forman una transacción distribuida.

**Tech Stack:** JavaScript ESM, Cloudflare Workers/Workflow/SQLite Durable Objects/D1, Node test y Miniflare.

**Spec:** `docs/superpowers/specs/2026-10-09-qa-provisioning-authority.md`; ver también `docs/AFW-PRIVATE-QA-OBSERVATION-2026-10-09.es.md`.

## Global Constraints

- Solo QA propia AFW; sin datos de Max, correo a clientes, otras aplicaciones ni permisos inferidos.
- `afw-qa-provisioning/v2` acredita `own-resource-reservation`, nunca exclusividad global de claves ni atestación VM.
- Un hash identifica evidencia; no acredita creación, inventario, custodia o ejecución.
- No nonce, JWT ni valor de credencial en expedientes, parámetros Workflow, Git, logs o resultados.
- Ventana, identidad, presupuesto y rollback explícitos antes de cualquier mutación remota.
- Incertidumbre de ACK, retiro, fuente o estado conserva reserva y evidencia; no repetir, borrar o reasignar automáticamente.
- Primero recepción e instalación propias con PC encendida; luego una sola ocurrencia previamente instalada y un intervalo PC-off acordado.

## Review Focus

- Dos expedientes intentan reservar el mismo token/app/policy/Worker: gana un propietario, sin sobrescribir el perdedor.
- Recepción y ejecución pertenecen a publicaciones o ventanas distintas: no reserva.
- Retiro entre lectura y commit de instalación: fence bloquea nueva autorización; historial persiste.
- ACK perdido de D1: queda instalación pendiente y recursos retenidos; lectura no fuerza nuevo INSERT.
- Proveedor devuelve inventario parcial o selector diferente: no disponible, sin asumir ausencia de conflictos.

## Task 1: expediente primario y reserva CAS

**Avance parcial 9 octubre:** `assistance-private-resource-holds.mjs` conserva propietarios de recursos y `assistance-private-evidence-journal.mjs` conserva referencias append-only, ambos internos y sin montaje. Son primitivas separadas: todavía no producen el contrato de autoridad ni validan fuentes reales. El journal admite observaciones históricas después del vencimiento, sin renovar autoridad, y cierra nuevos registros al retirarse. Task1 completo depende del productor y la correlación de Task2; no marcar sus checks por pruebas de estos helpers.

**Files:** crear `lib/assistance-private-qa-provisioning.mjs`, `test/assistance-private-qa-provisioning.test.mjs` y prueba nativa SQLite. Mantener `lib/assistance-qa-closure-catalog.mjs` como consumidor del contrato existente.

**Interfaces:** `createPrivateQaProvisioning({storage,readAdministrativeEvidence,readChallengeObservation,now})`; métodos administrativos `reserve(creationRef)`, `read(creationRef)` y `withdraw(creationRef,expectedSequence)`. Sin HTTP ni métodos accesibles al consumidor. `read` devuelve el contrato de cuatro campos existente solo si evidencia y propietario vigente coinciden; historial usa un método separado y nunca cumple autoridad de instalación.

- [ ] RED: referencias equivocadas, inventario incompleto, recepción sin ejecución, ejecución sin recepción, conflictos paralelos y retiro durante awaits no producen reserva.
- [ ] Implementar expediente append-only con secuencia y tombstone; índice de propietarios por cada recurso exacto en un único namespace autoritativo. Validar inscripción/aprobación completas V2 y referencia baseline.
- [ ] Fijar `custodyRef` antes del nonce como identificador del expediente administrativo; añadir evidencia posterior sin mutar los pins ni sustituirlo por receiptRef.
- [ ] GREEN: carreras con SQLite real y pérdida de respuesta conservan un solo propietario, referencias y fechas exactas. Registrar que esta prueba es local, no evidencia de proveedor.
- [ ] Revisión independiente, suite proporcional y commit de bloque sin montaje.

## Task 2: fuentes administrativas y correlación de ejecución

**Avance parcial 9oct:** lector `assistance-private-provider-observation.mjs` y transporte `assistance-private-provider-get-transport.mjs`, internos sin montaje, realizan lecturas/paginación/doble snapshot acotados. Envelopes reales comprobados read-only: tokens11/11 y políticas app propia1/1. GET puntual omitió name y aportó versión2 de identidad histórica retirada; listado aporta nombre. El lector cruza metadata exacta, sin inventarla. No cierra correlación cloud/diario ni productor. Antes de instalar, corregir también compatibilidad del cierre existente con GET sin name, mediante fuente independiente del nombre actual: no relajar validación ni restaurar nombre declarado por inferencia.

**Files:** crear `lib/assistance-private-qa-provisioning-evidence.mjs` y pruebas; adaptar el lector administrativo existente solo si su contrato coincide. Ninguna afirmación de capacidades de Codex no disponibles.

**Interfaces:** `readAdministrativeEvidence(creationRef)` resuelve un expediente propio fijado por el operador, no parámetros del consumidor. Debe aportar procedencia/fecha del original, recursos efectivos y constatación independiente de tarea/turno/comando/HEAD/config/publicación; la recepción se contrasta mediante el lector privado del diario primario.

- [ ] Especificar y probar el esquema exacto antes de implementar; campos adicionales/sensibles y fechas incompatibles fallan cerrados.
- [ ] Lecturas reales de proveedor: token creado/versión/vencimiento, políticas/selectores, Worker/bindings/programación y listado paginado del inventario pertinente. Guardar referencias y resultados saneados, no credenciales.
- [ ] Correlacionar original oficial de plataforma y operación cloud observada con recordRef/receiptRef/issuedAt/consumedAt/deadline primarios. stdout identifica el recibo, nunca autentica la publicación.
- [ ] Pruebas negativas de fuentes ausentes, parciales, cambiantes y ejecución ajena; no callbacks constantes para cerrar gates.
- [ ] Si no existe lector oficial de un dato, conservar constatación administrativa identificada con su límite; no inventar vaultRef/keyVersion/VM attestation.

## Task 3: instalación y retirada coordinadas

**Files:** adaptar `lib/assistance-private-qa-installer.mjs`, `worker/independent-closure/index.mjs` y sus pruebas nativas, después de Tasks1/2.

- [ ] Definir fence de instalación persistente ligado al propietario/secuencia primaria. Una comprobación RPC dentro de otra transacción no asegura atomicidad DO–D1.
- [ ] RED: retiro antes/durante cada espera y ACK perdido no autorizan segunda instalación ni eliminan filas ajenas.
- [ ] Conservar `pending` y reconciliación explícita; solo compensar filas cuja creación y propietario estén acreditados. Tombstones y reserva sobreviven vencimiento y rollback.
- [ ] Montar nuevos bindings únicamente cerrados, con namespaces/versiones preservados y material de reversión recuperable; lectura remota de configuración y cierres antes del siguiente bloque.

## Task 4: ensayo propio y PC apagada

- [ ] Scope fechado, identidad/custodia nuevas finitas solo cuando todos los canales estén listos; ningún token histórico revivido.
- [ ] PC-on: preregistro real, dos POST acotados sin retry, constatación independiente de ejecución cloud y diario; reserva/instalación/cierre/readback efectivo.
- [ ] Instalar una nueva ocurrencia acotada y comprobar el disparador alojado, su chat/publicación y cierre independiente antes de pedir apagar.
- [ ] Acordar y registrar intervalo PC-off; comprobar ejecución/resultado primarios dentro del intervalo y retirada efectiva. Computadora encendida no demuestra PC-off.
- [ ] Informe de evidencia, gates pendientes y readiness del piloto; preview y aprobación del primer correo a Max siguen separados.

## Evidencia que motivó este plan

Revisión técnica readonly del chat cloud `01a1221d-f257-7434-9bbf-30e8b39a2016`, turno `01a1223e-a76e-749b-a3fe-902f695ec6a1`, completada con archivo `/tmp/afw-verification/provisioning-design-review.md`. Es análisis sobre fuente, no consulta de proveedor ni ejecución remota del ensayo.
