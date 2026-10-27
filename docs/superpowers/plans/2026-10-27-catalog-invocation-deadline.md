# Catalog Invocation Deadline Reporting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Conservar la evidencia de presupuesto agotado independientemente del orden timer/await.
**Architecture:** Estado booleano privado en el mismo controlador; proyectar el campo existente, sin cambiar admisiones o transporte.
**Tech Stack:** Node22/node:test y GitHub Actions, rama cloud aislada.
**Spec:** docs/superpowers/specs/2026-10-27-catalog-invocation-deadline-design.md

## Global Constraints
-64API/10SELECT/110000ms/8rechecks intactos.
- Solo observación monotónica válida de límite alcanzado o el timer existente marca deadlineExceeded.
- No errores crudos, causa exclusiva, cancelación/retry, nuevas autoridades o mutaciones remotas.

## Review Focus
- Diferencia entre plazo original/cutoff y presupuesto de invocación.
- Relojes no finitos, regresivos o cuyo límite no se representa.
- ACK tardío con efecto ya aplicado no se transforma en cancelación o retry.
- Flag consistente en todo recibo después de observar el límite.
- El caso remoto histórico sigue inconcluso; el test no lo diagnostica retrospectivamente.

### Task1: Recibo monotónico
**Files:** scripts/catalog-discovery-native-control.mjs; test/catalog-discovery-native-control.test.mjs.
**Interface:** Misma runCatalogDiscoveryControl(input,context), mismo deadlineExceeded:true opcional existente.
- [ ] Añadir cinco regresiones del controlador sin modificar código productivo.
- [ ] Commit pruebas/spec/plan; observar3fallos esperados y2casos ya correctos en Actions.
- [ ] Conservar el booleano en check/result/timer, sin cambiar condiciones de denegación.
- [ ] Verificar npm test/lint/build completos y paquete congelado, en Actions.
- [ ] Una revisión fresca de toda la rama; una pasada de corrección importante RED→GREEN si corresponde, sin rereview.
- [ ] Integración con head esperado y comprobación de main; continuidad en PR/issue497. Sin activación remota.
