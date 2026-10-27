# AFW public registry visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** verificar propagación del único registro público sin repetir sus escrituras.
**Architecture:** observación finita dentro del adaptador nativo existente; fuente Worker congelada intacta.
**Tech Stack:** JavaScript ESM, Node test/mock timers, GitHub Actions, Cloudflare API.
**Spec:** docs/superpowers/specs/2026-10-27-catalog-registry-visibility-design.md

## Global Constraints
- Solo AFW y registro/recursos fijos del adaptador617.
- Nueve observaciones máximo; intervalos7500ms; límites64lecturas/110000ms; original<=600000ms y guard90s sin ampliación.
- Un PUT/DELETE por fase; ACK desconocido nunca se repite; conflicto se preserva.
- Ninguna publicación Worker, suscripción, reserva, permiso u OTP en esta modificación.

## Review Focus
- Ausencia transitoria posterior a ACK válido no habilita tráfico antes de coincidencia exacta.
- Ausencia persistente consume presupuesto finito sin repetir PUT.
- Valor ajeno no se acepta ni borra.
- Tombstone tardío no repite DELETE; host cerrado primero.
- Vencimiento original o reloj regresivo impiden continuación tardía.

## Task 1: observación acotada y etapas saneadas
**Files:** scripts/catalog-discovery-native-control.mjs; test/catalog-discovery-native-control.test.mjs.
**Interfaces:** runCatalogDiscoveryControl(input,context), sin cambios de argumentos, recibo stage más preciso.
- [ ] Añadir cinco pruebas de comportamiento con timers virtuales: aparición tardía, ausencia persistente, conflicto, tombstone tardío, vencimiento.
- [ ] Ejecutar CI RED en GitHub con implementación617 sin cambios y confirmar fallos de estado/presupuesto esperados.
- [ ] Implementar observación acotada del registro después de ACK exitoso; cualquier forma inválida/error/conflicto falla cerrado. Separar stage de ACK/readback/timeout.
- [ ] Ejecutar suite completa/lint/build y paquete existente en GitHub. Pedir una revisión fresca del PR, aplicar una sola pasada de correcciones y no rereview.
- [ ] Integrar con head/árbol revisados; nueva comprobación primaria de cierre. Guardar recibos y preparar ensayo NUEVO solo cuando todo esté listo.


## Execution ledger
# SDD ledger — plan: docs/superpowers/plans/2026-10-27-catalog-registry-visibility.md
Pre-flight: one task, no shared interfaces.
Ruling: remote GitHub branch and Actions replace a local worktree/workspace — owner requires cloud-first/minimal local use; no local clone/build/temp. Cost if wrong: cloud CI feedback latency, not wider runtime authority.
RED: ff202759 / CI40568608313 / job122416445651 reproduces expected regression failures. CF synthetic real-code harness also passfalse/expectedopened/actualuncertain,0realAPI; ACKfailure vs readback failure differ by one read, consistent with observed real receipt after accounting for actual version pages. First GET content was not logged, exact transport/cache cause remains unknown.
GREEN focused CF synthetic harness after minimal change: opened,1PUT/1version/1promotion entirely simulated,0realAPI; read budget55, same deadline. Full CI/review pending. Trialed21 closed and never replayed.
