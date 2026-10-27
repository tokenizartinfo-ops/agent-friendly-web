# Catalog Discovery Diagnostic Budget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax.

**Goal:** Hacer el siguiente diagnóstico observable y evitar adjuntar catálogo cuando ya no queda el presupuesto conservador para iniciar su consulta.
**Architecture:** Extender el preparador puro y su controlador fijo, sin cambiar Worker/Node publicados. GitHub rama aislada y CI hospedado; cierre exacto existente.
**Tech Stack:** Node22, node:test, GitHub Actions, API Cloudflare solo en futuras operaciones autorizadas.
**Spec:** docs/superpowers/specs/2026-10-27-catalog-diagnostic-budget-design.md

## Global Constraints
- Plazo original<=600000ms; catalogDispatchBefore=min(originalExpiry,exchangedAt+240000), no vencimiento real SDK.
-33bindings temporales/29cerrados; artefacto0b074569 sin cambios; OAuth300s/refreshfalse/sin otros permisos.
-64APIreads/10SELECT/110000ms,8rechecks de lectura compartidos; sin retry de writes/ACK desconocido.
- Sin activación remota, tail, OAuth, reserva, suscripción o datos de Max por este plan.

## Review Focus
- Demora entre prueba de grant y payload, o durante awaits/admisiones, debe impedir el efecto tardío.
- Presupuesto con exchanged_at malformado/futuro o permiso que vence antes del margen.
- Los tres campos de diagnóstico solo pueden derivar de la ventana original y no admitir valores del caller.
- Restaurar29bindings sin diagnóstico incluso tras vencimiento; secreto heredado nunca expuesto.
- Recibo de despacho es coordinación conservadora, no garantía de validez/entrega ni scheduler.

### Task1: Preparación temporal y límite de despacho
**Files:** scripts/catalog-discovery-trial-contract.mjs; scripts/catalog-discovery-native-control.mjs; test/catalog-discovery-trial-contract.test.mjs; test/catalog-discovery-native-control.test.mjs.
**Interfaces:** inspectCatalogDiscoveryGrant devuelve exchangedAt/catalogDispatchBefore; createCatalogDiscoveryVersion usa ese proof inmutable; runCatalogDiscoveryControl mantiene entrada exacta y expone catalogDispatchBefore solo si catalog_attached.
- [ ] Añadir regresiones: diagnóstico original en ambas fases; límite exacto/temprano; proof retenido más allá del límite; API demorada antes de versión/promoción; cierre sin diagnóstico y recibo válido.
- [ ] Commit solo pruebas+diseño/plan y observar fallos esperados en Actions contra fuente sin cambio.
- [ ] Implementar mínimo: tres bindings, comprobaciones de plazo, conteo33 y recibo de despacho.
- [ ] CI completo npm test/lint/build y paquete congelado en GitHub; leer fallos/conteos/skip/advertencias.
- [ ] UNA revisión fresca de toda la rama; una pasada de correcciones importantes RED→GREEN si corresponde, sin rereview.
- [ ] Integrar con leases, comprobar CI main y guardar continuidad saneada. No invocar ventanas consumidas ni declarar runtime actualizado.
