# AFW registry admissions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** manejar lecturas KV oscilantes en todas las admisiones sin ampliar autoridad.
**Architecture:** observador existente con límite compartido, antes de validar autoridad primaria; gates de presupuesto por efecto.
**Tech Stack:** ESM, Node test/mock timers, GitHub/Actions, Cloudflare API.
**Spec:** docs/superpowers/specs/2026-10-27-catalog-registry-admissions-design.md

## Global Constraints
Recursos exactos de617/618; máximo8rechecks compartidos,7500ms,64reads/110000ms, original<=600000ms/guard90s. Ningún replay, permiso o cambio Worker/actor/reserva.

## Review Focus
- Null→own no garantiza monotonicidad; todas las admisiones observan con el mismo contador.
- Punteros/grant se revalidan después de cualquier espera.
- Cola24antesdeversión y12antesdepromoción evita agotamiento tras efectos.
- Valorajeno/transporte/ACK inválido no se resuelve por esperar o sobreescribir.
- Catálogo no pierde la primera observación nula ni consulta un grant supuesto.

## Task 1: observación y autoridad en cada admisión
**Files:** scripts/catalog-discovery-native-control.mjs; test/catalog-discovery-native-control.test.mjs.
**Interfaces:** sin nuevos argumentos públicos; recibo agrega registryRechecks.
- [x] Añadir cinco positivos y tres negativos con timers virtuales; expectativas de efectos y presupuesto.
- [x] Reproducir RED sobre618 aceptado: cinco estadosblocked/uncertain en lugar deopened/catalog_attached,0APIreales.
- [x] Implementar observación en catálogo y antes de versión/promoción; contador compartido8; revalidar autoridad después de esperar; reservar colas24/12.
- [x] HarnessCF puro GREEN de cinco positivos y tres límites,0APIreales.
- [ ] Suite completa/lint/5builds+paquete en GitHub, una revisión fresca, una pasada de fixes si necesaria, sin rereview.
- [ ] Integrar y verificar primariamente cierre; después nueva ventana real propia.

## Execution ledger
# SDD ledger — plan: docs/superpowers/plans/2026-10-27-catalog-registry-admissions.md
Pre-flight: single task, no shared interfaces.
Ruling: GitHub branch/Actions replace localworktree/workspace per owner cloud-first preference; no local clone/build/temp, cost is cloud CI latency.
RED/zero-real-API: accepted618 fails five flapping-admission cases. GREEN/zero-real-API: source handles all5; shared8limit stops beforeversion/read36; P4/K8late stops beforepromotion/read53 with inactiveversion1,traffic0; drift afterwait stops beforeversion. Inactiveversion is evidence, not activation.
All real resources remain closed60d/519; prior two windows consumed, no grant or unique reservation used. Exact first stale value in ed21 unknown;0a392 provides realnull→own→null trace. Full CI/review pending.
