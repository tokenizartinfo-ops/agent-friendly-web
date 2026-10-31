# ARM V2 con quiescencia — Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.
**Goal:** montar ARM metadata privado con paquete tardío y comprobaciones primarias de quiescencia.
**Architecture:** reutilizar adaptadores/validadores HTTP cerrados y ledger. Ruta nativa nueva estrictamente de metadata, con presupuesto/lease compartido y cero efectos nominales.
**Tech Stack:** Node22, workerd/Miniflare, D1, Durable Objects, Workflows, esbuild; GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-31-qa-arm-native-quiescence-design.md

## Global Constraints
- Actor/source/UUID fijos; nada de facades que oculten V2 al legacy.
- Solo código/CI remoto; no credenciales nuevas ni reensayo remoto.
- La excepción self usa identidad del wrapper, jamás workflow.version_id como Worker UUID.
- Completar registro/paginación e inventarios; presupuesto agotado bloquea.
- Conservar issued/ACK inciertos, fuente315 y límites legacy2MiB.

## Review Focus
- Bootstrap vigente junto a una cuarta definición QA: bloquear por registry completo.
- Cambio de source/metadata nativa mientras el API dice un version_id coincidente: bloquear por pin real.
- Timeout/clock después de pendingCAS: conservar registros y uncertain, sin devolución de presupuesto.
- Proceso/consentimiento reservado entre observaciones: elegibilidad primaria falla y no arma.
- Código/config externos cambiados con API o inventarios parciales: bloquear.

### Task1: quiescencia HTTP readonly
Files: lib/mcp-qa-cloud-closed-http.mjs, lib/mcp-fixed-terminal-workflows.mjs, test/fixtures/qa-closed-http.mjs, test/mcp-qa-arm-http.test.mjs.
Consumes fixed closed pins + source/nativeUUID y parent lease; produces createPrivateQaArmHttpAdapters(options).readSnapshot(parentSignal), sin claim/deploy/GH.
- [x] RED: self exacto+otras terminales, readonly; ataques de inventario, selfID/estado, false version_id, plazos.
- [x] GREEN: compartir core con modo legacy intacto, mantener budgets y módulos2MiB.
- [x] EnfocadoHTTP + compatibilidad antigua: CI41243253502,14sealed/680focused/4195fullPASS,0FAIL,1skip previo. Dos imports de prueba sin uso retirados; validar el head final.

Task1 complete: implementación789f3f56; legacy rollback/HTTP conserva su contrato y la ruta nativa solo observa.

### Task2: ARM del paquete en actor nativo
Files: lib/mcp-qa-generation-arm.mjs, lib/mcp-qa-named-preflight.mjs, worker/independent-closure/index.mjs, wrangler.independent-closure-qa*.jsonc; tests unit/native.
Consumes Task1 + packet/assembler/pins681/eligibility/ledger; produces RPC armOwnQaGeneration(H,absoluteEnd) y bootstrap arm_generation exacto.
- [ ] RED: paquete→pins→eligibilidad→pending/armed en verdadero actor/D1/Workflow; sin contextoprevio bloquea.
- [ ] GREEN: lease padre y snapshots/journals inmutables; source bindings explícitos y rollback.
- [ ] Negativos de permisos/history/reserva, nativopin, cross-H, cachedstep, expiry y ACKperdido; receipts sin datos privados.

### Task3: aceptación de rama
- [ ] Full CI/lint/build y paquete frozen315.
- [ ] Revisión independiente de todo el head, corregir findings con RED/GREEN.
- [ ] Merge por head exacto/árbol idéntico y checkpoint issue497; nada de publish ni afirmar PCoff.

## Ledger
Ruling: owner delegó decisiones/ejecución encadenada; se preserva autorización sin pedir revisión intermedia de este plan. Fuente aislada remota en lugar de worktree/build local.
Pre-flight: Task2 necesita pin real de wrapper para la excepción Task1; no puede inferirlo de la API. Task1 no verifica el módulo propio QA: root debe correlacionarlo antes del ARM real.

Ruling: Task2 requiere leer primero el control legacy REAL. Su presencia y armedAt no están acreditados por los fixtures; no asumir migración ni fabricar un control para ajustarlo al ledger. Cerrar Task1 como PR acotada y realizar una inspección nativa temporal read-only, con QA cerrado y rollback verificado, antes de escoger el predecesor de ARM. Task2/3 de integración completa siguen pendientes; este corte no monta ARM.


31oct22:24:57UTC — Prerrequisito real cerrado: ver docs/AFW-QA-LEGACY-NATIVE-INSPECTION-2026-10-31.es.md. PR684/main834fc5c4, BASE exacta18/18 en41247253336 y una inspección nativa de KV aceptada sin escrituras; restaurado c570/DEP2e1a, readback25GET,19WFterminales. Legacy presente/armado/retirado/vencido, V2ausente; prepared_dispatchissued y reduction_dispatchcomplete conservados inciertos, sin reset. Ya no asumir ausencia o armedAtnull. Task2 debe resolver el canal privado de preparación/control literal y la separación de journals sin exponerlos en RPC ni ocultar V2 al legacy; ARM y Task3 de integración siguen pendientes. operationalReadiness=false.
