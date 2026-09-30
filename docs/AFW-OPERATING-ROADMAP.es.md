# Roadmap operativo y continuidad de AFW

Actualizado: 2026-09-30. Fuente: [microauditoría](AFW-MICROAUDIT-2026-09-30.es.md), base `9f3d869822080a2f30a242c3fdd29b5ad4bbc392`. Es un plan de ejecución; los bloques futuros todavía no están implementados. Revisar este documento al cerrar un bloque o una nueva microauditoría, sin reescribir la historia de entregas.

## Resultado que dirige el trabajo

Una persona debe poder expresar un objetivo sin conocer protocolos, recibir una interpretación revisable, continuar con una pregunta útil, pausar y volver, y comprobar una mejora concreta. El copilot mantiene el hilo y explica el motivo de cada paso. El nivel objetivo depende del negocio, el momento y el sitio; puede terminar en descubrimiento o contenido suficiente y cambiar después.

No usar «expediente completo», cantidad de archivos o puntaje propio como sustitutos de ese resultado. Separar datos aportados, hipótesis, observaciones, objetivo acordado, permisos y cambio verificado.

## Punto de partida comprobable

- Repo canónico: `tokenizartinfo-ops/agent-friendly-web`; web: `https://agentfriendlyweb.dev`.
- Entrega de referencia: [procedencia y prueba privada](AFW-COPILOT-SOURCE-HINTS-RELEASE-2026-09-30.es.md). Fuente funcional integrada en `cff6ae06e23f1b7a4a5793c8493158b2209730dd`; recibos posteriores están en `main`.
- Última versión documentada del Worker: `8b327ba8-5ef9-424e-a335-464ad50a8c01`; verificar de nuevo el deployment antes de una publicación. No se consultó Cloudflare durante esta microauditoría.
- Piloto exacto: `6e972c18-cae1-402b-b959-646abd8499d7`; el copilot y la vista breve no están abiertos para todos los expedientes.
- Texto de trabajo, permisos durables y campos revisados existen. Las decisiones conversacionales y la cola de propuestas aún no se recuperan entre sesiones.
- La cuenta documentada para el piloto privado es `tokenizart.info@gmail.com`. El correo de administración compartido no autoriza recursos de otro proyecto.

## Orden de bloques

| ID | Prioridad y dependencia | Resultado entregable | Criterio de cierre |
| --- | --- | --- | --- |
| MA-01 | Primero; M01 | Contrato coherente de objetivos | Una intención explícita de consultar una API puede confirmarse como `tools`; genera horizonte correcto. Texto libre no se guarda como categoría nueva. Negaciones y ambigüedades no activan categorías. |
| MA-02 | Después de MA-01; M02 | Planificador de etapa con una intervención principal | No dice `done` por seis casillas; objetivo precede a detalles técnicos innecesarios. El mismo contexto produce una sola pregunta o revisión, con razón visible. |
| MA-03 | Después de MA-02; M03 | Memoria mínima de decisiones | «No lo sé», aceptar, descartar y pregunta activa sobreviven a recarga. Conflicto entre dos pestañas no pierde decisiones. Hay límites, retención y revisión del esquema. |
| MA-04 | Después de MA-03 | Vista breve que conduce el hilo | Una tarea y una acción principal; texto/audio como alternativas. Resumen de guardado siempre visible. Vista completa optativa; errores y sesión caducada conservan el modo breve. |
| MA-05 | Después de MA-03, integrando MA-04; M04 | Contexto acotado y evaluación del copilot | El servidor prepara contexto del expediente propio; no envía todo el historial. Corpus reproducible detecta nombre genérico, negación, corrección y contradicción. La IA propone; el servidor decide acciones permitidas. |
| MA-06 | Después de MA-04/05; M06 | Una entrega verificada de punta a punta | Objetivo → alcance → propuesta de archivos → entrega → implementación declarada → nueva observación comparable. No presentar archivo preparado como desplegado. |
| MA-07 | Después de MA-06; M05 | Piloto de dos clientes/identidades | Dos sujetos Access y dos expedientes aislados; invitar, pausar, volver y retirar acceso funcionan. Revisar política/operación antes de datos reales. Nunca abrir por comodín. |
| MA-08 | Después de MA-06; puede preceder apertura amplia | Seguimiento y novedades dentro de AFW | Bandeja del expediente con cambios relevantes y una acción por novedad; distingue observado/declarado y fecha. Preferencia de seguimiento no se presenta como tarea activa sin scheduler probado. |
| MA-09 | Después de MA-05/06 | Enriquecimiento público con fuentes | Reutiliza scanner; Firecrawl solo para una pregunta faltante, dominio permitido, límites y costo. Propuesta con URL/fecha/cita, contradicción explícita y revisión antes de guardar. |
| MA-10 | Tras probar utilidad con clientes | Escala comercial y transformación progresiva | Paquete repetible con alcance/entregables verificables, soporte y mantenimiento. Mapa de procesos y corpus preceden skills/MCPs internos. Subdominio agéntico y cerebro empresarial se evalúan como capas opcionales. |

MA-01 a MA-06 forman el próximo segmento operativo. MA-07 a MA-10 son horizontes; no convertirlos ahora en una implementación masiva ni inventar fechas. Al cerrar MA-02, elegir un único caso vertical de contenido/servicios para MA-03 a MA-06.

## Especificación breve de los próximos bloques

### MA-01 — Objetivo interpretado y confirmado

Usar `goalGuidance` con cita validada como entrada de una propuesta de interpretación, no como categoría ya aceptada. Correspondencia declarada: `discover → discovery`, `explain → content`, `query → tools`, `act → actions`, `transact → payments`. La persona confirma la interpretación; no equivale a autorización de acciones o pagos.

Eliminar la extracción de `goals` en texto libre del proveedor y rechazar ese campo en la salida revisada de este contrato. Mantener `goals` en el expediente y la guía normal: se modifica con opciones canónicas tras revisión. Conservar cualquier valor histórico desconocido, pero no usarlo para decidir que ya se conoce el horizonte. No migrar datos antiguos por heurística.

Entrada de ejecución exacta: [plan MA-01](superpowers/plans/2026-09-30-afw-goal-contract.md).

### MA-02 — Una decisión siguiente, vinculada a la etapa

Crear un contrato de turno con `kind`, `stage`, `field` o `actionId`, `reasonKey` y `basedOnRevision`. Prioridad: recuperar guardado/sesión/conflicto → resolver una contradicción pertinente → confirmar objetivo → revisar una propuesta pertinente → pedir un dato necesario para ese objetivo → ofrecer síntesis/preparación. Una pregunta puede quedar pendiente sin bloquear todos los demás pasos.

Etapas iniciales: `orientation`, `intake`, `scope_review`, `delivery_review`, `verification`. Son etapas de trabajo, no niveles AF. «Datos suficientes» no significa que la publicación esté lista. Mantener el orden del modelo determinista y comprobable; la IA aporta candidatos o redacción, no permisos.

Archivos principales: `lib/copilot-next-turn.mjs`, `lib/intake-question-coach.mjs`, `lib/scope-question-guide.mjs`, `lib/proportional-target.mjs`, `app/components/intake-intelligent-copilot.tsx`. Evitar que dos guías hagan preguntas distintas al mismo tiempo. Prueba clave: sitio informativo sin necesidad de herramientas no recibe una exigencia de MCP ni un bloqueo por hosting durante orientación.

### MA-03 — Conservar el hilo con el menor estado necesario

Diseñar primero un estado privado por expediente: objetivo confirmado, campos pospuestos, decisiones de candidatos y siguiente turno, con revisión propia y revisión base del expediente. Persistir IDs y metadatos mínimos; definir cuándo se necesita conservar el valor/cita y durante cuánto tiempo. No convertir `project_events` en copia del relato.

D1 + control optimista es la opción inicial; no agregar Durable Objects salvo requisito concreto de coordinación persistente demostrado. GET/PUT propietario, origen exacto, cuerpo acotado, idempotencia y recuperación de conflicto. Migración aditiva, rollback de código conservando datos y prueba de restauración. No persistir archivos de audio por conveniencia.

### MA-04 a MA-06 — Un corte vertical usable

La interfaz consume el turno y el estado anterior. Muestra una propuesta o pregunta; las demás quedan en segundo plano y recuperables. «Guardar» refleja confirmación del servidor. Un fallo recuperable muestra una salida simple sin abrir todas las secciones. Una síntesis pequeña permite revisar organización, objetivo, fuente y siguiente acción.

Después, contexto mínimo del copilot preparado por servidor y evaluaciones. El caso final debe pasar por una entrega real controlada o una simulación claramente rotulada; solo una comprobación externa convierte implementación declarada en observada. El informe muestra antes/después, fecha, límites y cambios, sin prometer ranking, clientes o puntuaciones universales.

## Instrucciones de continuidad para GPT-6 Sol

1. Leer `AGENTS.md`, este documento y el plan del primer bloque pendiente. Consultar la microauditoría solo para el hallazgo que se va a resolver. No cargar todos los recibos o el vault de Tokenizart.
2. Verificar árbol limpio, rama, `origin` y revisión de `main`; preservar cambios ajenos. El checkout de trabajo conocido es `C:/Users/gabri/OneDrive/Documentos/Agent Friendly Web Worktrees/afw-release-reconciliation`, pero verificarlo antes de usarlo.
3. Continuar MA-01. En esta entrega de planificación **no se implementó** MA-01 ni se cambió runtime. No contabilizar el plan como funcionalidad.
4. Tomar un bloque con resultado y cierre, implementar y probar el comportamiento. Al aprobarlo, continuar el siguiente dentro del alcance autorizado; informar solo hitos, riesgos reales o una acción humana estrictamente necesaria.
5. No remendar cada síntoma con un mensaje adicional. Si el problema es de estado, contrato u orden de preguntas, corregir esa capa y usarla desde la UI.
6. Mantener identidad, consentimiento, compuerta del piloto, confirmación de propuestas y distinción entre datos e implementación. No ampliar permisos por haber alcanzado una etapa o puntaje.
7. Navegador: Chrome existente elegido por Gabriel. Buscar exclusivamente la pestaña de AFW. No usar `chrome_devtools.new_page` para recuperar acceso: puede abrir otra instancia. Si el control no está disponible, pedir al usuario el enlace/pestaña y avanzar con tareas independientes. No cerrar ni reclamar pestañas de Atelier/Tokenizart de otro chat.
8. Para cada publicación remota declarar `PROJECT`, `REPOSITORY`, `ENVIRONMENT`, `ORIGIN`, `RESOURCE_TYPE`, `RESOURCE_ID`, `ALLOWED_ACTION`, `ROLLBACK`. Compartir cuenta no comparte recursos.
9. Pruebas proporcionales: lógica de contrato, identidad y concurrencia; un recorrido UI relevante y casos de error. Antes de publicar: `npm test`, `npm run lint`, `npm run build`, CI y fuente del artefacto. La cuenta de tests no demuestra usabilidad.
10. Una respuesta perdida exige comprobar el resultado antes de reintentar. Prueba privada y smoke anónimo acreditan cosas distintas. La presencia de un archivo o PR no acredita despliegue.
11. Cerrar cada bloque actualizando su estado, evidencia, pendientes, versión/rollback si aplica y el siguiente bloque. Dejar una sola entrada de continuidad; conservar recibos históricos sin reescribirlos.
12. Si aparece una decisión de privacidad, nueva audiencia, envío externo, gasto o acceso que excede el alcance vigente, preparar el resultado revisable y pedir solo esa decisión. El owner ya autorizó avanzar entre bloques ordinarios.

## Prueba de producto que debe dirigir el segmento

Caso A: una pyme informativa desea explicar servicios. Caso B: una organización desea consultas de catálogo mediante API. Caso C: una empresa contempla reservas más adelante. Cada caso aporta un relato multitema; AFW confirma objetivo, conserva datos, admite desconocidos, pausa y retorno, y explica un siguiente paso diferente. No exige llegar a AF-5. Caso B verifica que un objetivo de herramientas no se degrada a contenido por un contrato roto; Caso C verifica que un deseo futuro no activa transacciones.

Errores mínimos: sesión caducada, envío duplicado, respuesta tardía, cambio del expediente durante inferencia, dos pestañas con revisiones diferentes, permiso revocado y fallo de guardado. Preservar palabras y decisiones confirmadas sin afirmar un guardado no comprobado.

## Medición mínima y carriles separados

Medir en pruebas de producto: tiempo hasta primer objetivo confirmado, repreguntas de datos ya dados, recuperaciones después de pausa, proporción de candidatos corregidos y entregas comprobadas. No fijar metas numéricas hasta tener una línea base. Eventos mínimos sin relatos/PII; no introducir analytics de terceros para este segmento.

La revisión de Cloudflare del jueves 2026-10-01 compara mismo origen/perfil y fechas; no bloquea MA-01 a MA-06. Mantener puntaje AFW, objetivo proporcional y resultado externo separados. Una calificación alta solo vale si se sustenta en capacidades relevantes realmente disponibles.

## Estado de ejecución

| Bloque | Estado al 2026-09-30 | Evidencia |
| --- | --- | --- |
| Microauditoría y traspaso | Documentado | Hallazgos reproducidos localmente; código y límites registrados. |
| MA-01 | Pendiente; plan exacto preparado | No hay implementación ni nueva migración. |
| MA-02 a MA-06 | Pendientes; especificación operativa | Deben ejecutarse en el orden anterior. |
| MA-07 a MA-10 | Horizonte posterior | Requieren cierres previos y decisiones propias donde corresponda. |
