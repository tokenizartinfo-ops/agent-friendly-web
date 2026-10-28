# Plan de observación del sucesor retirado

> REQUIRED SUB-SKILL: superpowers:executing-plans; root implementa en línea, un único revisor final de rama completa.

**Goal:** Obtener evidencia nativa de custodia retirada del sucesor sin reemplazar la política original ni arrancar un proceso.
**Architecture:** Host privado read-only + RPC sin parámetros, reutilizando el lector de custodia existente y dos snapshots primarios de reserva.
**Tech Stack:** JavaScript, SQLite/workerd/Miniflare en GitHub Actions; sin dependencias nuevas.
**Spec:** docs/superpowers/specs/2026-10-28-successor-retirement-readback.md

## Límites y revisión
- Fuente aislada en branch GitHub; no código, clones o builds locales.
- Opt-in ausente deniega antes de SQL/DO; original observeRetired y reglas de reserva/lanzamiento intactos.
- No Container/fetch/token/capacidad de escritura en el host.
- Dos retiradas reales, sello original y reserva inmutable; no inferir desde expiry, metadata o mocks.
- Preservar política original; lectura después de expiry no renueva permisos.
- Presupuesto original5s, deriva y resultado tardío denegados.
- Un único revisor final, corregir hallazgos materiales y verificar; sin ronda repetida por rutina.

### Task1 — contrato y RED
- [x] Registrar diseño/plan y fixtures de observación/casos negativos.
- [ ] Inspeccionar fallo RED en Actions antes de implementar.

### Task2 — host y RPC
- [ ] Implementar lib/mcp-own-successor-retirement-host.mjs y el método privado del actor.
- [ ] Pasar pruebas unitarias y composición nativa con D1/almacenamiento/RPC reales y autoridad sintética de CI.

### Task3 — aceptación de fuente
- [ ] CI completa/lint/cinco builds y revisión final de rama.
- [ ] Integrar y verificar CI en main; registrar cierre y gates pendientes en issue497.
- [ ] Mantener runtime/artefactos congelados y reserva sin activar. No afirmar readiness/PC-off.

## Ledger
Base00a942219aeb35fab57411d9e26452d3951b5ba8. Ensayo e417 cerrado; estado remoto fechado01:09:35UTC conserva60d/DEP59866a8a y reserva0. La preparación no presume ese estado para una mutación futura. Gabriel descansa hasta al menos28oct08:30ART; no abrir OTP/consentimientos ni solicitar intervención.
