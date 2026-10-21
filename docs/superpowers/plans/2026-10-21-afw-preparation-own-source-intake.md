# Preparation own-source intake Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline. Un revisor final fresco; no implementadores paralelos. La delegación expresa del owner sustituye menús rutinarios de diseño/plan, no permisos remotos.

**Goal:** Crear un registro propio de ensayo y recibo idempotente sin inventar verificación o autorización.
**Architecture:** Núcleo cerrado sobre el mismo D1 aislado. Identidad desde adaptador servidor, perfil/ventana originales y lease existente; batch evento+project y lectura primaria coherente, sin HTTP ni DNS.
**Tech Stack:** ESM Node22, node:crypto, D1/SQLite, validadores/normalización existentes, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-21-afw-preparation-own-source-intake.md

## Global Constraints
AFW solamente; origen https://agentfriendlyweb.dev;10minmáximo; lease WeakMap5s ORIGINAL. No claims/permisos/cápsulas/copias; producción no se conecta. Código/CI en GitHub, no clone/install/build local. Reversión de fuente sin borrar datos legítimos. Sin importador runtime.

## Review Focus
Identidad que caduca durante espera: denegar y no entregar recibo como vigente.
Project preexistente sin recibo propio: no apropiarse ni crear recibo.
ACK perdido después de commit: conservar y conciliar original sin otro batch.
Clock gap antes de dispatch: SQL usa restante, no presupuesto nuevo.
Concurrencia/deriva/replay con otro payload: máximo un registro, sin sobrescritura ni renovación.

### Task1: núcleo de alta propia con recibo nativo
Files: crear lib/preparation-source-intake-store.mjs, test/preparation-source-intake-store.test.mjs y .github/workflows/afw-preparation-source-intake.yml; spec/plan en esta rama.
Consumes: identidad servidor {subject,email,expiresAt}, createPrimarySession, lease y perfil originales. Produces: create(input)→recibo congelado sin verificación/autoridad.
- [ ] Test RED de módulo ausente explícito antes del import; luego casos SQLite propios vacíos.
- [ ] Capturar RED en Actions Node22 sin install.
- [ ] Implementar validación exacta, clocks/lease/perfil/identidad y transacción; replays leen el original, ACK incierto no reintenta.
- [ ] GREEN focal y full CI; revisar logs finales, no inferir PASS desde run arrancado.
- [ ] Revisión final completa, ledger y repair único si Critical/Important. Merge exactHEAD y main verificada.
- [ ] Guardar continuidad/gates. Montaje HTTP con sesión/CSRF/purpose y dominio real permanecen trabajo posterior separado; no ejecutar como subpaso invisible.
