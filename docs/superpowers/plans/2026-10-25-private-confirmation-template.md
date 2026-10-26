# Private confirmation template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline, task-by-task. Owner delegó decisiones y ejecución continua; no nueva ronda de aprobación de diseño.

**Goal:** separar compilación pública de datos privados del permiso, sin nuevas credenciales/infraestructura.
**Architecture:** plantilla esbuild inerte más materializador WebCrypto sin efectos; reutilizar builder, runtime y workflow existentes.
**Tech Stack:** JavaScript ESM/Node22/esbuild/GitHub Actions/Cloudflare existente.
**Spec:** docs/superpowers/specs/2026-10-25-private-confirmation-template-design.md

## Global Constraints
No política real/identidad/clave en GitHub público; Worker congelado3d4e9d5/26ec0366 intacto; servicios permanecen cerrados; plantilla/script2097152bytes, policy65536bytes, duración<=600000;0nuevospaquetes/servicios/tokens; PC mínimo. Bundle/slot no es autorización. No modificar ventanas ni invocar0→1.

## Review Focus
Literal duplicado o residual y sustitución fuera del slot deben fallar cerrado.
UTF8/Unicode/escape de JSON debe conservar datos sin ejecución.
Manifiesto/hash/bytes/extra campos y procedencia equivocada deben rechazarse.
Workflow nunca debe recibir ni publicar política real, aunque un caller conserve instrucciones antiguas.
La plantilla vacía no es un operador desplegable; pruebas solo materializan ficción vencida y preservan validación runtime.

### Task1: builder y materialización sin efectos
Files: scripts/build-mcp-release-operator.mjs; new lib/mcp-private-confirmation-template.mjs; new test/mcp-private-confirmation-template.test.mjs.
Consumes: bundle validado/inert0→1 y opciones/entrypoint existentes.
Produces: buildMcpPrivateConfirmationTemplate(bundle) -> {template,manifest}; materializeMcpPrivateConfirmation({template,manifest,policyJson,expectedTemplateHash}) -> script/digests/no publicación.
- [ ] Escribir primero tests del contrato nuevo, mutantes de hash/bytes/slot/caps, JSON canónico/inyección/Unicode y errores saneados. RED por export/funcionalidad ausente en CI, no por typo.
- [ ] Implementar helper browser-safe y builder con stdin/resolveDir y sustitución única de su token global; builder actual intacto.
- [ ] GREEN de tests nuevos y suite normal en Actions; sin instalaciones/builds locales. Confirmar no cambios en runtime/frozen pins.

### Task2: paquete público y cualificación nativa
Files: .github/workflows/afw-named-confirmation-package.yml; test/mcp-named-confirmation-package.native.mjs; docs/AFW-NAMED-CONFIRMATION-PACKAGE-2026-10-22.es.md.
Consumes: plantilla/manifiesto/materializador de Task1.
Produces: artefacto público solo ficticio y recibo de contrato nativo.
- [ ] RED del flujo que permite entradas reales y prueba nativa de materialización en paquete con Worker histórico exacto.
- [ ] Retirar input policy_json/lectura del evento; fixture sintético siempre. Agregar generación/verificación template + hashes y materializador al artefacto.
- [ ] Verificar workerd404/bloqueo de fixture materializado,0I/O; suite/lint/cinco builds y paquete real en Actions.
- [ ] Explicar cambio de interfaz pública, diferencia plantilla/ensamblaje privado y no publicación; conservar historia.

### Task3: revisión, integración y continuidad
- [ ] Revisión completa fresca de la rama, SHA/diff y focus de spec; corregir hallazgos importantes con RED→GREEN, sin pulido ajeno.
- [ ] Integrar solo con todos los checks requeridos verdes, releer árbol exacto; PR adjunta si límite permite.
- [ ] Cualificar una ejecución pública sintética del paquete y conservar run/head/artefacto/digests; ningún private grant.
- [ ] Actualizar tracker497; siguiente admisión privada separada solo con material real de la persona y ventanas vigentes. No afirmar PC-off ni enviarMax.

## Decisiones y registro
Ruling: aislamiento en rama GitHub, sin worktree/clone/deps locales: preferencia expresa cloud del owner; riesgo si errado limitado a rama, no main/runtime.
Ruling: owner optó explícitamente por delegar metodología/decisiones y evitar preguntas; aplicar excepción opt-out de brainstorming y ejecución inline sin pedir aprobación de nuevo de una decisión técnica dentro del objetivo.
Ruling: ledger breve en rama/tracker, sin crear .superpowers local; CI conserva evidencia cloud. Registrar cada RED/GREEN y commits aquí o en tracker, no dar por terminada tarea sin pruebas.
