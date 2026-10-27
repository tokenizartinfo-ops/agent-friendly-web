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
