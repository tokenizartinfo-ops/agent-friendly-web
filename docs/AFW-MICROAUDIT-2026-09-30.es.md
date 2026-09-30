# Microauditoría AFW: recorrido, copilot y operación

Fecha: 2026-09-30. Alcance: diagnóstico → expediente → acompañamiento → entrega verificable. Base de código: `9f3d869822080a2f30a242c3fdd29b5ad4bbc392` de `tokenizartinfo-ops/agent-friendly-web`. Esta revisión propone trabajo; no acredita una nueva activación de producción.

## Dictamen

AFW tiene una base funcional y controles de escritura considerablemente más maduros que su experiencia de acompañamiento. El mayor rendimiento del próximo segmento viene de unir capacidades existentes en un recorrido corto que conserve decisiones. Continuar agregando pequeños avisos, archivos y endpoints sin cerrar ese recorrido aumenta complejidad más rápido que utilidad.

La siguiente entrega debe demostrar esto: una persona expresa un objetivo, AFW lo confirma, organiza lo dicho, pregunta solo lo que cambia el siguiente paso, conserva lo pendiente y ofrece una entrega concreta que pueda verificarse. AF-5 es una posibilidad proporcional al negocio; completar casillas o generar archivos no lo demuestra.

## Evidencia y límites

- Código leído en esta revisión: proveedor y validación del copilot, planificador, guía sin IA, guardado, historial, progreso, orientación proporcional, esquema D1 y CI.
- Reproducciones locales nuevas y deterministas: un objetivo `exponer una API` se acepta como texto pero produce `content_horizon`, mientras `tools` produce `tool_exploration`; seis datos básicos completos producen `kind: done` con `goals: []` y `control: unknown`.
- Comprobaciones de esta entrega documental: 575/575 pruebas existentes, lint sin errores (advertencia previa de imagen), build y enlaces internos. Estas pruebas no corrigen los dos hallazgos; el contrato vigente puede pasar CI y seguir teniendo esa brecha de producto.
- Chrome existente: se recuperó el expediente piloto con sesión privada; se leyó el árbol accesible y se observó una captura de la vista completa. La conexión perdió el control antes de conservar capturas y revisar la guía breve. Esto es una revisión técnica del producto con observación visual exploratoria, **no una auditoría visual o de accesibilidad completa**. No se abrió otra instancia ni se modificó el expediente en esta revisión.
- Evidencia histórica, distinta de pruebas nuevas: [entrega y prueba privada de procedencia](AFW-COPILOT-SOURCE-HINTS-RELEASE-2026-09-30.es.md), [guardado del relato](AFW-COPILOT-WORKING-DRAFT-2026-09-29.es.md), [auditor externo](AFW-EXTERNAL-AGENT-READINESS-INVENTORY-2026-09-29.es.md). No se repitieron inferencias, smokes, despliegues ni la medición externa.
- No se revisaron en profundidad scanner/SSRF, seguridad integral, facturación, accesibilidad móvil, proveedores, costos reales ni todos los endpoints. Ausencia de hallazgos aquí no acredita esas áreas.

## Qué está bien encaminado

| Área | Evaluación | Evidencia y valor |
| --- | --- | --- |
| Límites de proyecto | Correctos en código y reglas | Origen AFW y recursos propios; Tokenizart es un caso. La disciplina del navegador debe respetarlos también. |
| Guardado y concurrencia | Base sólida | Revisión optimista, idempotencia y eventos; no depende de prometer que `beforeunload` terminará una escritura. |
| Consentimiento y aislamiento | Bien enfocados | Access, propietario, permiso por expediente, permiso por envío, límite de consultas y piloto exacto en la ruta del copilot. |
| Extracción y revisión | Buena base defensiva | Citas exactas, campos acotados, validación de salida y propuestas existentes sin seleccionar por defecto. |
| Audio | Capacidad útil del piloto | Segmentos, transcripción editable y manejo del micrófono. El recorrido de voz es por segmentos, no conversación continua. |
| Evidencia frente a declaración | Diferenciación valiosa | Observaciones fechadas, control de dominio y cápsulas no equivalen entre sí ni a publicación autorizada. |
| Ruta proporcional | Dirección de producto correcta | `proportionalTargetGuide` evita imponer herramientas, acciones o pagos a sitios de contenido. |
| Entrega reproducible | Buen fundamento | CI prueba, lint y build; conserva artefactos de `main`. Recibos de versión, rollback y pruebas privadas puntuales. |

## Brechas prioritarias

### M01 — El objetivo conversado no llega correctamente al roadmap · alta

`lib/intake-copilot-provider.mjs` permite propuestas `goals` en texto libre. `reviewCopilotOutput` exige que ese texto aparezca en la cita. Sin embargo, `proportionalTargetGuide`, `buildRoadmap` y las opciones del formulario usan `discovery`, `content`, `tools`, `actions`, `payments`. `goalChoices` conserva valores desconocidos, pero no los interpreta. La intención queda guardada sin conducir correctamente el alcance.

Reproducción: «Quiero exponer una API para consultar mi catálogo» → propuesta aceptada `['exponer una API']` → horizonte de contenido; con `['tools']` → exploración de herramientas. No es una predicción sobre el LLM: es una incompatibilidad verificable de contratos.

Decisión: separar frase original, interpretación de objetivo y categoría operativa. La categoría se presenta para confirmación explícita; una propuesta no activa capacidades. Conservar los valores antiguos sin migrarlos por inferencia.

### M02 — La próxima pregunta y el cierre cubren solo una parte del producto · alta

`QUESTION_FIELDS` contiene seis campos; `planCopilotNextTurn` devuelve `done` cuando están completos. No conduce objetivo, fuentes disponibles, control, responsables, implementación o comprobación. Además, solo se renderiza un próximo turno cuando hay `result`, y se muestran todas las sugerencias a la vez. `goalGuidance` puede preguntar una cosa y el planificador otra en la misma respuesta.

Decisión: un único planificador de etapa y una única intervención principal visible. Diferenciar «datos básicos suficientes», «listo para preparar», «listo para publicar» y «cambio comprobado». CMS y hosting no deben ser requisitos universales para conversar sobre el objetivo.

### M03 — Se conserva el relato, pero no la decisión conversacional · alta

`result`, selección, revisión y `goalGuidance` están en estado React. `deferred` de la guía sin IA también es local; el copilot no lo recibe. D1 conserva texto y metadatos de campos aceptados, no candidatos, rechazos, ambigüedades ni motivo de posponer. Volver a abrir puede conservar palabras y perder el hilo.

Decisión: estado mínimo versionado por expediente para decisiones y pregunta activa. Propuestas efímeras no deben presentarse como recuperables. Diseñar retención antes de persistir citas completas; no duplicar indiscriminadamente relatos en eventos.

### M04 — El copiloto carece de contexto suficiente y evaluación semántica · alta

La ruta selecciona solo `project.id`; `requestIntakeSuggestions` recibe texto e idioma, sin objetivos confirmados, decisiones ni evidencia. La interfaz compara resultados con el borrador después. Una cita auténtica prueba origen, pero no que «empresa de servicios profesionales» sea el nombre de una organización. La prueba histórica del piloto mostró esa propuesta genérica, protegida por la selección desmarcada del valor existente.

Decisión: primero establecer contratos y decisiones; después enviar un contexto mínimo preparado por servidor, con clase de evidencia y revisión. Evaluar extracción con casos multitema, negaciones, frases descriptivas, correcciones, idiomas y respuestas ambiguas. Temperatura cero y JSON estructurado no sustituyen esa evaluación.

### M05 — El producto privado sigue siendo un piloto; falta una prueba vertical de cliente · alta antes de apertura

El copilot está deliberadamente limitado a un proyecto. La cuenta operativa y el dominio de Access compartido pueden confundir durante el ingreso. La prueba reciente demuestra un campo aceptado y limpiado, no el recorrido completo de un cliente distinto: entrada, objetivo, pausa, retorno, alcance, entrega y comprobación.

Decisión: conservar el piloto cerrado hasta demostrar dos identidades aisladas y un caso completo. Crear una ruta de invitación y pertenencia explícita antes de ampliar la compuerta; nunca sustituir el ID por `*`.

### M06 — Falta cerrar el ciclo de valor después de preparar archivos · media/alta

Existen observaciones, historial y cápsulas, pero no se ha acreditado en esta revisión un único flujo que conecte recomendación aceptada, entrega exacta, implementación confirmada y mejora observada. `monitoringPreference` es un dato, no evidencia de un servicio de seguimiento. No se identificó aquí una bandeja de cambios o notificaciones operativa.

Decisión: primero seguimiento dentro del expediente: «preparado», «entregado», «implementación declarada», «comprobado» o «requiere revisión». Cada avance debe enlazar evidencia y ofrecer una acción. Correo, cron y webhooks se incorporan después con consentimiento y operación definida.

### M07 — La documentación operativa y las señales de calidad necesitan consolidación · media

`AGENTS.md` apuntaba como entrega actual a un recibo anterior; el roadmap comercial conserva estados de infraestructura anteriores al corte. `lib/public-guide.mjs` usa afirmaciones generales de voz/memoria no activas que requieren distinguir disponibilidad pública y piloto privado. La cantidad de tests es positiva, pero incluye contratos de texto fuente; no mide comprensión, continuidad, recuperación ante red perdida ni calidad de extracción.

Decisión: una entrada de continuidad y una matriz breve de disponibilidad. Conservar recibos históricos. Evaluar por resultados de usuario y evidencia, sin otra capa documental extensa por cada pequeño cambio.

## Recorrido revisado

1. **Entrar y elegir expediente — parcial:** aislamiento y recuperación existen; onboarding de clientes y branding del acceso siguen pendientes de validar.
2. **Contar y organizar — funcional en piloto:** relato, voz y propuestas existen; falta interpretación fiable del objetivo y contexto del expediente.
3. **Revisar y guardar — bien encaminado:** selección explícita, conflictos y procedencia; falta persistir qué se descartó o dejó pendiente.
4. **Elegir alcance y siguiente paso — incompleto:** orientación proporcional existe; contratos de objetivos y planificador fragmentado rompen la continuidad.
5. **Preparar, implementar y comprobar — capacidad parcial:** hay cápsulas y observaciones; falta demostrar el ciclo completo y su seguimiento.

## Enfoque recomendado

Cerrar M01 y M02, agregar memoria mínima de decisiones (M03), unificar la vista breve, y validar un caso completo antes de abrir otros clientes. La investigación web debe complementar lo que el cliente ya declaró y lo que el scanner observó, con fuente, fecha y confirmación. Firecrawl puede aportar extracción; el modelo no puede convertir un crawl en autorización ni titularidad.

Durable Objects es una opción cuando exista coordinación real de conexiones o edición simultánea; D1 con revisiones sirve al recorrido actual. Alexandria, un subdominio agéntico por cliente y el cerebro de la empresa quedan como capas posteriores. La expansión agent-first interna requiere procesos y corpus declarados antes de automatizarlos.

La revisión externa de Cloudflare se mantiene como carril separado para el jueves 2026-10-01, según la instrucción del owner. No volver a medir ni fabricar protocolos durante estos bloques para perseguir un porcentaje universal.

Roadmap y continuidad: [AFW-OPERATING-ROADMAP.es.md](AFW-OPERATING-ROADMAP.es.md). Plan del primer bloque: [contrato de objetivos](superpowers/plans/2026-09-30-afw-goal-contract.md).
