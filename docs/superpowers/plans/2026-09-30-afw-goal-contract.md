# MA-01: contrato de objetivos del copilot

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Ejecutar en este chat; no crear chats ni agentes adicionales por defecto.

**Goal:** conectar una intención explícita y revisada con las categorías que realmente usa el roadmap, conservando la frase de origen y la decisión humana.

**Architecture:** el proveedor extrae datos y evidencia de objetivo; no escribe objetivos en texto libre. Un adaptador puro transforma el modo validado en una propuesta de categoría. La UI la presenta como interpretación y usa el circuito de revisión/guardado existente; el horizonte solo considera categorías reconocidas.

**Tech Stack:** React, TypeScript, módulos ESM Node, Workers AI, D1 existente. Sin dependencias ni migración nuevas.

**Spec:** [roadmap, MA-01](../../AFW-OPERATING-ROADMAP.es.md) y [hallazgo M01](../../AFW-MICROAUDIT-2026-09-30.es.md).

## Global Constraints

- Origen: `https://agentfriendlyweb.dev`; repositorio: `tokenizartinfo-ops/agent-friendly-web`.
- Piloto exacto: `6e972c18-cae1-402b-b959-646abd8499d7`; conservar Access, propiedad, cuotas y consentimiento.
- Correspondencia: `discover → discovery`, `explain → content`, `query → tools`, `act → actions`, `transact → payments`.
- La categoría se presenta para confirmación explícita; una propuesta no activa capacidades.
- Conservar cualquier valor histórico desconocido, pero no usarlo para decidir que ya se conoce el horizonte.
- No migrar datos antiguos por heurística.
- Solo propuestas con cita validada; guardar mediante `onApply` y el circuito idempotente existente.

## Review Focus

- Frase negativa sobre pagos: no proponer `payments`.
- Categoría que ya existe: no duplicarla ni pedir confirmación de nuevo.
- Solo objetivos históricos desconocidos: no afirmar que se conoce el horizonte.
- Mezcla de categoría reconocida y texto histórico: preservar el texto y orientar con la categoría.
- Borrador modificado tras preparar la revisión: rechazar preview obsoleto, conservar cambios locales.

## Task 1: contrato puro y validación de salida

**Files:** crear `lib/copilot-goal-contract.mjs` y `test/copilot-goal-contract.test.mjs`; modificar `lib/intake-copilot-provider.mjs`, `lib/intake-copilot.mjs`, `lib/proportional-target.mjs`, `test/intake-copilot.test.mjs` y `test/copilot-goal-guidance.test.mjs`.

**Interfaces:**

- `knownGoalCodes(values: unknown): string[]`: devuelve únicos reconocidos de `discovery`, `content`, `tools`, `actions`, `payments`, en el orden recibido; no transforma texto libre.
- `reviewedGoalProposal({ goalGuidance, currentGoals }): null | { field: 'goals', value: string[], sourceExcerpt: string, interpretation: 'goal_mode_mapping' }`. Consume `goalGuidance` validado por `reviewCopilotOutput`. Modo/cita faltantes o categoría ya presente devuelven `null`; conserva los objetivos existentes y agrega solo la categoría de la tabla.
- `reviewCopilotOutput` conserva `goalGuidance` validado, pero descarta cualquier propuesta de extracción con `field: goals`. Esto no elimina `goals` del formulario ni de `previewIntakeDraft`.
- `proportionalTargetGuide` calcula intención con `knownGoalCodes(intake.goals)` y capacidades conocidas (`discovery`, `answerability`, `structured_data`, `public_registry`, `read_only_tools`, `delegated_actions`). Con solo texto desconocido y sin capacidades reconocidas retorna `stage: undecided`. El filtrado es para orientar; no modifica el expediente.

- [ ] Escribir tests que fallen: la frase del hallazgo M01 ya no produce `suggestions.goals`; `goalGuidance.mode = query` sí produce una propuesta `tools`; la frase/cita se conserva y no se aplica sola.
- [ ] Probar los cinco modos; `currentGoals = ['texto histórico']` conserva ese elemento al proponer `tools`; `currentGoals = ['tools']` no crea otra propuesta.
- [ ] Probar modo desconocido, cita vacía y `goalGuidance: null` → `null`; conservar tests de negación/cita inventada de `reviewCopilotOutput`.
- [ ] Probar `goals = ['exponer una API']` sin capacidades → `undecided`; `['exponer una API', 'tools']` → `tool_exploration`; `['content']` → `content_horizon`.
- [ ] Escribir el caso de regresión `unknown historical goals do not silently select content`: `assert.equal(proportionalTargetGuide({ goals: ['exponer una API'] }).stage, 'undecided')`. Para `desiredCapabilities: ['texto desconocido']`, el mismo resultado; para `['read_only_tools']`, `tool_exploration`.
- [ ] Ejecutar `node --test test/copilot-goal-contract.test.mjs test/copilot-goal-guidance.test.mjs test/intake-copilot.test.mjs` y comprobar fallo nuevo antes de implementar.
- [ ] Implementar el adaptador; quitar `goals` de los campos solicitados al proveedor, permitir `goalEvidence` como interpretación y descartar extracciones libres de objetivos.
- [ ] Actualizar solo expectations de tests que describían el contrato viejo, preservando las barreras de seguridad y las pruebas de datos no relacionados.
- [ ] Ejecutar tests dirigidos y revisar que ningún cambio transforme o borre objetivos almacenados.
- [ ] Commit del contrato y tests.

## Task 2: revisión visible del objetivo y guardado existente

**Files:** modificar `app/components/intake-intelligent-copilot.tsx`; crear `test/copilot-goal-review.test.mjs` siguiendo los tests existentes de revisión; actualizar `test/intake-copilot-route.test.mjs` si cambia el payload del proveedor. No modificar esquema D1 ni ampliar el piloto.

**Interfaces:** consume `reviewedGoalProposal`; la confirmación genera preview con `previewIntakeDraft`, y la aplicación usa `applyIntakeDraft` + `onApply(nextDraft, { goals: afterGoals })`. El mismo historial privado registra `copilot_reviewed` solo al coincidir lo guardado.

- [ ] Probar que la categoría propuesta no entra en el draft al recibir la respuesta; tampoco por renderizar o preparar la revisión.
- [ ] Probar que confirmar una revisión vigente agrega `tools` conservando los valores previos; una revisión obsoleta falla sin reemplazo silencioso.
- [ ] Implementar una tarjeta de objetivo con cita y etiqueta traducida en ES/EN/PT: «Entendí que querés permitir consultas. ¿Es ese el objetivo?». Reutilizar opciones de `privateUiCopy`, sin mostrar códigos técnicos.
- [ ] Presentar la correspondencia como interpretación revisable. Para acciones/pagos, explicar que se está preparando un alcance, no habilitando la operación.
- [ ] Reutilizar preview y aplicar al borrador; no crear otro endpoint, mecanismo de save o evento con una copia del relato.
- [ ] Mostrar confirmación de borrador y estado del guardado existente. Evitar duplicar el mismo objetivo como campo de extracción y orientación. MA-02 resolverá la prioridad global de preguntas.
- [ ] Ejecutar pruebas dirigidas, `npm test`, `npm run lint`, `npm run build`; correr TypeScript si afecta firmas. No usar conteo de pruebas como criterio de producto.
- [ ] Commit de UI y tests; PR con problema, resultado y validación.

## Cierre y publicación

- [ ] CI aprobado y revisión del diff: solo MA-01, ningún recurso Tokenizart/Atelier, sin migración.
- [ ] Comprobar una entrega privada acotada: frase explícita de API → revisión de objetivo → guardado → horizonte de herramientas. Rechazar/omitir deja el objetivo anterior. Datos sintéticos y limpieza al final.
- [ ] Antes de publicar, verificar versión activa, procedencia del build, configuración exacta y rollback. Conservar el ID del piloto, no abrir acceso de clientes por este bloque.
- [ ] Registrar evidencia y límites; actualizar MA-01 en el roadmap solo cuando el comportamiento esté demostrado. Seguir MA-02 con el alcance autorizado; no detenerse a pedir permiso entre cambios ordinarios.

Si Chrome no está conectado, terminar código/CI y dejar pendiente la prueba privada; usar exclusivamente la pestaña AFW del Chrome existente. No crear otra instancia para intentar resolverlo. Una prueba local no se rotula como prueba de producción.
