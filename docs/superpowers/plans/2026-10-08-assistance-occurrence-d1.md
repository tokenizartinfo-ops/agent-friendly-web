# Assistance occurrence D1 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline; usuario autorizó implementación local y TDD. No delegación implementadora.

**Goal:** Registro interno exclusivo global de metadata propia, sin rutas ni activación.
**Architecture:** Cabecera inmutable + journal append-only D1. Triggers validan CAS/transiciones; consumo y statements de efecto confiables se ejecutan juntos en db.batch.
**Tech Stack:** Node22+, SQLite real y Miniflare/workerd existentes, sin dependencias nuevas.
**Spec:** docs/superpowers/specs/2026-10-08-assistance-occurrence-d1-design.md (aclaración final prevalece).

## Global Constraints

- Base8eecaac; worktree y rama propios; sin reset/clean ni cambios en checkout original.
- Máximo3 operaciones y4controles/7total futuros; sin rutas/legacy/shared budgets cambiados.
- Metadatos allowlist, señal exacta, identidad opaca, preflight confiable <=30s y margen10s estricto.
- Sin HTTP remoto, SQL remoto, permisos, secretos, configuración o publicación.

## Review Focus

- CAS fallido no ejecuta effects; batch rollback frente a constraint.
- Responses perdidas no permiten replay por conexión nueva.
- Cambiar manifest/UUID no duplica señal.
- Cierre/expiración tras espera de preflight impiden efecto.
- Claim/finish legacy no se declaran integrados; efecto debe ser statement SQL confiable con postcondición.

### Task1: registro y schema internos

**Files:** lib/assistance-occurrence-d1.mjs; worker/operations/assistance-occurrences.sql; test/assistance-occurrence-d1.test.mjs; test/assistance-occurrence-d1-workerd.test.mjs.
**Interfaces:** createOccurrenceD1Store({db,manifest,identityRef,preflight,now}) -> create/admit/consume/close; consume batches transition+trusted statements, not callback performing IO.

- [x] Escribir pruebas SQLite/file dos conexiones, CASrace, UUID nuevo misma señal, consumo una vez, rollback efecto, intento4, cierre, pérdida ambigua, constraints/inmutabilidad/preflight.
- [x] Ejecutar y guardar RED: módulo ausente/contrato faltante, sin fingir defectos de runtime como fallos de producto.
- [x] Implementar schema/triggers y API mínima, sin importar en runtime.
- [ ] Ejecutar GREEN SQLite y Miniflare real; no pedir permisos adicionales. Si loopback bloqueado, reportar ese límite y conservar pruebas pendientes.
- [ ] Focalización con occurrence/client y review/budgets existentes; revisión final; guardar recibos, commit local y patch saneado.

## Estado de ejecución

SQLite16/16 y focalización43pass/1skip; lint0. Miniflare real bloqueado por EPERM sin permisos adicionales, no green acreditado. Hallazgo de revisión constraints SQL corregido con RED→GREEN. Integración/contador HTTP/rutas y aceptación native pendientes. Ver docs/evidence/assistance-occurrence-d1-local-receipt.md.
