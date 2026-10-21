# AFW Preparation Maintenance Caller Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Native execution by the current implementer, then one fresh whole-branch reviewer.
**Goal:** Añadir un llamador Workflow administrativo para la RPC privada PB7 sin superficie HTTP.
**Architecture:** Workflow separado con política server-only y servicio fijo; módulo interno valida contexto/tiempo/recibo. PB6 mantiene idempotencia durable.
**Tech Stack:** Node22, ESmodules, Cloudflare WorkflowEntrypoint, Miniflare/workerd, GitHub Actions; dependencias existentes.
**Spec:** docs/superpowers/specs/2026-10-21-afw-preparation-maintenance-caller.md

## Global Constraints
Solo AFW. SOURCE ONLY; nada de publicar/registrar/grants/Max/eventos. Siete policykeys,2048UTF8bytes,600000ms máximo; RPCsinargs,5000ms total y originalwindow; retry0; HTTP404; snapshots y clocks nativos; cerrado siempre.
Aislamiento en rama remota desde mainbc34ea0cac064e854e0a4612581895b3a0a33f4a y Actions; no nuevo clone/worktree/install/build en PC.
Ruling: autorización owner para decidir/encadenar y cloudfirst prevalece sobre menús de diseño y sdd local; conservar spec/plan/ledger en GitHub. Coste si mal interpretado: revisión de diseño tardía antes de hosting; ninguna autoridad runtime deriva de la rama.

## Review Focus
1. Replay/cached Workflowstep tras vencimiento falla cerrado.
2. UnknownACK no crea segundo cliente ni reintenta RPC.
3. Binding o método cambia duranteawait: no resultado confirmado.
4. Metadata incluye campos adicionales/scope/secret: no se devuelve.
5. Workflow administrativo distinto o scheduled event: cero llamadas.

## Task 1: caller, entrada, pruebas y artefacto
**Files:** Create lib/preparation-maintenance-caller.mjs; worker/preparation-maintenance-caller/index.mjs; scripts/build-preparation-maintenance-caller.mjs; test/preparation-maintenance-caller.test.mjs; test/preparation-maintenance-caller-native.test.mjs; .github/workflows/afw-preparation-maintenance-caller.yml.
**Interfaces:** runPreparationMaintenanceCaller(env,event,step,clocks?) -> closed receipt; buildPreparationMaintenanceCaller({sourceRevision}) -> frozen script/hash. Workflowrun(env=this.env) no identidad/clock desde payload. PREPARATION_MAINTENANCE.register/reconcile() producen PB6receipt.
- [x] Tests unit/nativos primero: required-source assertion RED y pruebas detalladas del contrato. Nuevo workflowCI instala solo lockfile existente sin secrets.
- [x] Run CI en rama; verificar RED por fuente/build ausentes.
- [x] Implementar parser/pins/context/hash/lease/step/recibo y wrapper404. Compilar fuente exacta.
- [x] Run tests unit + native Workflow/servicebinding/D1/KV; verificar únicos slot/cliente y ceroqueries con disabled.
- [x] GitHub fullCI npm test,lint,build existente; commit y registrar SHA/tree/jobs/artifact.
- [x] Una revisión fresca wholebranch máscapaz; Critical/Important una pasadaRED/GREEN y suite; Minors diferidos. No rereview.
- [ ] Merge expectedHEAD y verificar CI main; ledger final y checkpoint. Hosting/cliente/consentimiento separados.

Author review pass: Important outer-step wait bounded by original lease; regression RED39598573962 (5250ms pending) precedes fix. Three Minor findings recorded in PR537 and deferred; no re-review. Hosted custody/client/consent and PC-off remain separate gates.
