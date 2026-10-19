# Consumidor de referencia para agentes — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Ejecución inline autorizada por Gabriel, sin pausas rutinarias; una revisión de rama al final.

**Goal:** Entregar un ejemplo ejecutable que consuma de forma segura la proyección existente del siguiente paso y documente cómo integrar AFW sin confundir lectura, permisos o precio.
**Architecture:** Consumidor puro sin IO sobre structuredContent del SDK existente; demo sintética reutiliza catálogo/cotización/proyección internos. No servidor, endpoint, credencial, tarifa ni runtime nuevos.
**Tech Stack:** ESM, Node22.18+, node:test, GitHub API/Actions existentes; cero dependencias nuevas.
**Spec:** docs/superpowers/specs/2026-10-19-afw-agent-consumption-design.md, etapa2 y aceptación real G2 en issue497#issuecomment-6275545264; alcance acotado aprobado por Gabriel al pedir continuar el roadmap.

## Global Constraints
- Proyecto AFW / tokenizartinfo-ops/agent-friendly-web; base3d4e9d5d20b6185a5d3dcfceae191046e921e1cb.
- Solo fuente/ejemplos/guía. Runtime79593972/799ff2e0 y operador6509ca8e siguen cerrados; no OAuth, eventos, modelo, correo o Max.
- No cobrar, ejecutar o publicar desde una proyección; los tres flags deben ser false.
- Catalogo de demo explícitamente sintético, source_only y unpriced. Sin ahorro/tokens/precio real inferidos de bytes.
- Trabajo en rama remota aislada y CI; no clone/install/build local. GitHub no contiene secretos.

## Diseño acotado y contratos
examples/agent-consumer/reference-client.mjs exporta consumeAgentNextStep(structuredContent,{projectRef,expectedRevision,now}). now entero enms, projectRef conocido por el consumidor y expectedRevision>=1 obligatorios; NO acreditan identidad al servidor.
Acepta únicamente data contratoafw.agent-consumption.next-step.v1/statusok con proyecto/revisión coincidentes, observado no futuro, now<expires y0<expires-observed<=5000ms. Valida claves/tamaños/refs/pasos y flagsfalse usando validadores de datos existentes; copia únicamente campos del contrato. No ejecuta texto, URLs, llamadas o nuevas autorizaciones. Datos JSON ordinarios, no sandbox de Proxy hostil.
200válido→statusready/actioncontinue_guided_step/contextacotado. Conflicto de revisión→blocked/revision_conflict/actionretry_read;503→read_unavailable/retry_read;401/403→access_denied/review_connection; inválido/futuro/vencido→blocked sincontexto. Ninguna recuperación hace IO o reintento.
examples/agent-consumer/demo.mjs exporta buildAgentConsumerDemo() y CLI sin red: reutiliza librerías internas reales con fixtures propios, imprime catálogo/unpriced, cotización bloqueada sinimporte, ready/conflict/expired/withdrawn y contadores de bytesUTF8. Tokens, uso proveedor y costo permanecennull; networkCalls0/isEfficiencyEvidencefalse.
Guía ES distingue MCPpúblico, pilotos privados cerrados, contratos internos y A2A asíncrono futuro; muestra un callTool y separación de permisos. No instrucciones de tokens antiguos ni URLsauthorize reutilizables.

## Review Focus
- Respuesta de otro proyecto o revisión no debe producir contexto.
- Respuesta vencida, futura, malformada o de autoridadtrue nunca debe producir una instrucción utilizable.
- Errores/recovery del servidor no deben convertirse en URLs/instrucciones/llamadas automáticas.
- Datos desconocidos/getters/arrays enormes deben rechazarse sin ejecutarlos ni reflejarlos.
- Bytes de demo no deben convertirse en ahorro de tokens, tarifa, runtime o permiso.

## Task1 — paquete de referencia y guía (un entregable)
- [x] Escribir test/agent-consumer-reference.test.mjs antes de implementación; carga opcional como patrón existente para fallar en comportamiento, no imports.
- [x] Commit RED y PR; observar fallos esperados y ninguna regresión fuera de este paquete en CI.
- [ ] Implementar consumidor puro y demo. Probar bytesUTF8, salida del CLI, fuente interna real y ausencia de IO mediante ejecución con globals.fetch que falla si se llama.
- [ ] Guía docs/AFW-AGENT-INTEGRATION-GUIDE.es.md y README del ejemplo; enlazar recibo G2, límites, públicos objetivo y datos pendientes de medir.
- [ ] CI completo npmtest/lint/build GREEN, una revisión fresca de rama; hallazgos importantes con regresión RED→GREEN, sin segunda revisión.
- [ ] Integrar con head exacto, CI main y checkpoint fechado; no deploy.

## Ledger y decisiones
- Ruling: rama GitHub+Actions sustituye worktree/workspace local de las skills por preferencia cloud explícita. Costo: no ejecutar test antes del push; RED/GREEN deben constar en CI.
- Ruling: roadmap y autonomía aprobados por Gabriel permiten este paquete acotado del contrato existente sin otra ronda de confirmación. No permite las etapas económicas/de escritura/hosting futuras ni abrir servicio privado.
- Baseline: main3d4e9d5d, CI39303697277 aceptado2144PASS/0FAIL/1SKIP; no repetir baseline. G2 real200/409/403 aceptado y cerrado19oct19:30UTC.
- Task1 RED: 8e76c1c0 / CI39313143201 / job118267670494:15fallos nuevos esperados,2144PASS/15FAIL/1SKIP; todos en este paquete, por ausencia de comportamiento y sin import/setup failures. Implementación pendiente de GREEN.
- Registro administrativo: update_ref no crea ramas pese al alias de su descripción; devolvió422sinmutación y el primer createPR rechazó head inexistente. Se usó create_branch explícito sobre el mismo commit, luego PR502 creada. No fuerza, duplicados o cambios en main.
- Revisión del brief: consumidor produce decision/context copiadas para la demo; coincidencia de nombres y claves comprobada. La demo consume las tres bibliotecas existentes sin declarar runtime. Ruling: CLI y guía forman el mismo entregable, no un SDK de red ni un nuevo API. Costo: el integrador conserva autenticación/transporte/límites.
