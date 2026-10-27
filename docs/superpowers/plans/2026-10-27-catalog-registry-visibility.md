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
- [x] Añadir cinco pruebas de comportamiento con timers virtuales: aparición tardía, ausencia persistente, conflicto, tombstone tardío, vencimiento.
- [x] Ejecutar CI RED en GitHub con implementación617 sin cambios y confirmar fallos de estado/presupuesto esperados.
- [x] Implementar observación acotada del registro después de ACK exitoso; cualquier forma inválida/error/conflicto falla cerrado. Separar stage de ACK/readback/timeout.
- [ ] Ejecutar suite completa/lint/build y paquete existente en GitHub. Pedir una revisión fresca del PR, aplicar una sola pasada de correcciones y no rereview.
- [ ] Integrar con head/árbol revisados; nueva comprobación primaria de cierre. Guardar recibos y preparar ensayo NUEVO solo cuando todo esté listo.

## Execution ledger
# SDD ledger — plan: docs/superpowers/plans/2026-10-27-catalog-registry-visibility.md
Pre-flight: one task, no shared interfaces.
Ruling: remote GitHub branch and Actions replace local worktree/workspace — owner cloud-first preference; no local clone/build/temp. Cost if wrong: cloud feedback latency, no wider runtime authority.
RED ff202759/CI40568608313/job122416445651:2986PASS/4expectednewFAIL/1existingSkip.
Focused real-code CFharness: first delayed-read behavior RED actualuncertain → GREENopened;0realAPI. Initial fullGREEN7e8 CI40569199954:2989PASS/1FAIL/1skip; the foreign-record test exposed fixture metadata aliasing to the transport's input object. Real API serializes across a boundary; fixture now clones stored metadata. Corrected pure harness confirms real ownership rejection after a null read. No production ownership check was loosened.
One fresh review of7e8 found Important: missing reserve for final27APIreads after record visibility. No Critical/Minor, declinedtojudge[]. One fix pass adds admission before version creation. Regression CF harness P4/K8: RED promoted thenuncertain atread65 → GREEN uncertain atversion_budget_admission/read38 with0version/0promotion; P4/K7 remains opened at exactly64reads. All API simulated,0real calls. Added two behavioral tests with virtual timers and complete4page301version responses; first erroneous temporary harness matched Workflowversions too, corrected test route before results; never mutated real resources.
Task1 fullfinalCI/package pending; same Worker pin0b/60d and closed resources unchanged. Trialed21 is consumed/closed and never replayed.
