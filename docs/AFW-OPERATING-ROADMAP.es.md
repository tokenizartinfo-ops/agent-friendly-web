# Roadmap operativo y continuidad de AFW

## Auditoria externa: bloque del 30 de septiembre

Propuesta de servicios reales para los pendientes OAuth/A2A: [diseno funcional](AFW-OAUTH-A2A-PROPOSAL-2026-09-30.es.md). Orden recomendado: acceso delegado de solo lectura al expediente, luego tareas A2A con evidencias y propuestas; escritura/publicacion permanecen etapas separadas. Propuesta no implementada ni piloto ampliado.

Consulta nueva de Cloudflare: perfil completo Level 4 (11 aprobadas, 5 pendientes); contenido Level 5 (6 aprobadas, 1 pendiente). No devuelve puntaje numerico. DNSSEC sigue `pending`, sin DS en el padre; no deshabilitarlo ni fabricar descriptores OAuth/A2A. Evidencia y orden de remediacion: [recibo externo](AFW-EXTERNAL-AUDIT-2026-09-30.es.md). La evidencia publica actualizada conserva el baseline; verificar su despliegue antes de afirmar que ya esta publicada. Siguiente incremento comprobable: validar DS y DNS-AID tras la publicacion automatica del Registrar, luego evaluar autenticacion para una API agéntica real.

Actualizado: 2026-09-30. Fuente inicial: [microauditoría](AFW-MICROAUDIT-2026-09-30.es.md), base `9f3d869822080a2f30a242c3fdd29b5ad4bbc392`. MA-01..05 ya están implementados y desplegados: [recibo actual](AFW-GUIDED-RELEASE-2026-09-30.es.md). Los cierres privados y bloques posteriores se distinguen abajo. Conservar la historia de entregas.

## Resultado que dirige el trabajo

Una persona debe poder expresar un objetivo sin conocer protocolos, recibir una interpretación revisable, continuar con una pregunta útil, pausar y volver, y comprobar una mejora concreta. El copilot mantiene el hilo y explica el motivo de cada paso. El nivel objetivo depende del negocio, el momento y el sitio; puede terminar en descubrimiento o contenido suficiente y cambiar después.

No usar «expediente completo», cantidad de archivos o puntaje propio como sustitutos de ese resultado. Separar datos aportados, hipótesis, observaciones, objetivo acordado, permisos y cambio verificado.

## Punto de partida de la microauditoría inicial

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

MA-01 a MA-05 forman el segmento desplegado. Cerrar primero su aceptación privada y la evidencia vertical de MA-06. MA-07 tiene identidades de prueba preparadas; MA-09/10 siguen como horizontes, sin implementación masiva ni fechas inventadas. La prueba vertical local de contenido/servicios se distingue de una instalación en cliente.

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
3. Continuar aceptación privada del caso API después de PR #119 y MA-06 desde el recibo actual; no rehacer MA-01..05. Contenido/guardado/pausa/recarga/acceso a entrega ya se probaron en Chrome. Luego MA-07 con los expedientes sintéticos de las dos identidades del owner, sin ampliar por inferencia el piloto del copilot. Los apartados de punto de partida anteriores describen la microauditoría inicial; el recibo actual y la tabla de estado prevalecen para continuidad.
4. Tomar un bloque con resultado y cierre, implementar y probar el comportamiento. Al aprobarlo, continuar el siguiente dentro del alcance autorizado; informar solo hitos, riesgos reales o una acción humana estrictamente necesaria.
5. No remendar cada síntoma con un mensaje adicional. Si el problema es de estado, contrato u orden de preguntas, corregir esa capa y usarla desde la UI.
6. Mantener identidad, consentimiento, compuerta del piloto, confirmación de propuestas y distinción entre datos e implementación. No ampliar permisos por haber alcanzado una etapa o puntaje.
7. Navegador: usar el autorizado en la sesión vigente. Gabriel autorizó el navegador integrado el 2026-09-30; la sesión privada A funciona allí. No abrir otra instancia de Chrome ni cerrar o reclamar pestañas de Atelier/Tokenizart de otro chat.
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
| MA-01/02 | Implementados/desplegados | Objetivos canónicos y un turno con razón/revisión; PR #118. |
| MA-03 | Implementado/desplegado | Sesión atómica y migración 0009; pruebas de conflicto/recuperación y restore SQLite local. |
| MA-04/05 | Implementados/desplegados; aceptación privada parcial | Contenido, guardado, pausa/recarga y entrega probados. Con A autenticada se recuperó la interpretación API, se revisó/guardó y persistió tras recarga sin pagos. No acredita nueva inferencia en esa continuación. Ver recibo privado. |
| MA-06 | Recorrido integral sintético cerrado; cliente externo pendiente | [Aceptación integral](AFW-INTEGRAL-ACCEPTANCE-2026-09-30.es.md): misma cápsula revisada/aprobada/descargada → archivo exacto instalado → auditoría 9→17 AF0 → comparación coincidente recuperada tras recarga. Historial conservado y destino temporal retirado. No acredita entrega externa ni instalación de v2 sobre el apex. |
| MA-07 | Escritura cruzada comprobada; política QA retirada | [Recibo vigente](AFW-CROSS-WRITE-ACCEPTANCE-2026-09-30.es.md): escritura rechazada y D1 intacta; owner conserva acceso. Solicitud B sin correo compatible con bloqueo OTP documentado. No exigir código a un usuario retirado; revocación de un token B activo no probada. |
| MA-08 | Feed acotado implementado/desplegado | Observaciones compatibles/fechadas; sin scheduler ni bandeja persistida acreditados. |
| MA-09/10 | Horizonte posterior | Requieren entrega útil acreditada y límites de fuentes/costes. |

## Apertura de producción

La web está desplegada; el recorrido privado todavía no está abierto a clientes generales. Seguir [la puerta de salida para beta acompañada](AFW-PRODUCTION-OPENING-2026-09-30.es.md): corrección de mensajes → entrega real controlada → aislamiento/retirada → habilitación acotada → primer cliente. No ampliar el piloto por inferencia.

Continuidad vigente tras PR #126: comenzar por MA-07, no repetir la entrega sintética. La sesión del owner confirmó aprobación y lectura coincidente. Se solicitó la segunda identidad para escritura cruzada; si el navegador no controla la pestaña anterior, recuperar control antes de afirmar una petición remota. Procedimiento de beta preparado en [operaciones](AFW-BETA-OPERATIONS-2026-09-30.es.md); rollout productivo aún de un solo expediente.

Continuidad posterior a PR #128: la escritura cruzada ya fue comprobada y QA retirada. No repetir login B esperando OTP: la falta de correo es compatible con el bloqueo y Cloudflare no envía códigos a usuarios no permitidos. Chrome del owner está autenticado. MA-08 pasó pruebas de origen/metodología/historial; aceptación del desplegable y su acción sigue pendiente porque el control de Chrome no ejecutó el clic. Próximo trabajo operativo: aceptación de seguimiento y recorrido del piloto, preparar paquete de primer cliente sin habilitar identidades externas por inferencia. Revocación de token activo, scheduler y presupuesto diario no acreditados.

Continuidad de guía tras comparación: corregir la indicación de entrega cuando todos los archivos de la cápsula aprobada coinciden en la última lectura. El mensaje debe referirse a esa lectura fechada, permitir repetirla y no implicar certificación del sitio, despliegue por aprobación ni vigencia permanente. La comprobación exige cápsula/manifiesto, conjunto completo de rutas y hashes propuestos compatibles; comparaciones incompletas o antiguas de otra versión no sirven. Validación privada del mensaje pendiente hasta recuperar control de Chrome; el sitio sintético del ensayo MA-06 fue retirado y su lectura guardada sigue siendo histórica.

PR #130 desplegada: fuente `6c822c5`, versión `8c36db0d-4bba-4af3-bdb1-1bf14c582a83`, 100 %, 11 comprobaciones previas y posteriores aprobadas. [Recibo vigente de guía](AFW-OBSERVED-GUIDANCE-RELEASE-2026-09-30.es.md). Próximo bloque MA-08: evitar confundir falta de consulta con ausencia de observaciones. Chrome no disponible para control; aceptación visual pendiente, sin repetir login.

Corrección MA-08 preparada: las novedades distinguen consulta pendiente/fallida de historial vacío confirmado. La confirmación se liga a expediente y sitio guardado; reintentar solo recupera las observaciones, no crea una auditoría. Aceptación visual pendiente; consultar el próximo recibo de despliegue antes de atribuirlo a producción. [Paquete de primer cliente](AFW-FIRST-CLIENT-PACKAGE.es.md) preparado para una beta acompañada; sin identidad externa ni rollout ampliado.

PR #132 desplegada: fuente `644e605`, versión `0f3eb3e6-38dd-46b7-9a1d-a31f92e47001`, 100 %, 11 comprobaciones previas/posteriores aprobadas. [Recibo vigente de novedades](AFW-UPDATES-READ-RELEASE-2026-09-30.es.md). Incluye la guía de PR #130 y el paquete preparado del primer cliente. Sigue pendiente aceptación visual privada, caso API del piloto y concreción de cliente externo; no abrir otra identidad ni repetir MA-06/07 por defecto.

MA-08 aceptación manual parcial: el owner confirmó que Novedades abre Entrega y muestra la fecha de observación en su Chrome. [Recibo manual](AFW-UPDATES-MANUAL-ACCEPTANCE-2026-09-30.es.md): declaración del owner, sin captura ni control del agente; mensaje de guía y fallos de lectura privados siguen separados. Ajuste preparado para reabrir entrega después de cerrarla manualmente y llevar el foco al resumen, sin ampliar el formulario.

PR #134 desplegada: fuente `7c049da`, versión `c6175cff-42ca-490d-8507-96c5fce23126`, 100 %, 11 comprobaciones previas/posteriores aprobadas. [Recibo vigente de navegación](AFW-DELIVERY-NAVIGATION-RELEASE-2026-09-30.es.md). Reapertura repetida probada localmente; aceptación de navegador no acreditada. Conservar la confirmación manual de MA-08 sin exigir otro login ni repetir el camino normal por defecto.

Confirmación posterior del owner: mensaje de coincidencia histórica de PR #130 visible y transcrito, con cápsula v1/manifiesto compatible con MA-06. Cierra la aceptación manual de esa guía; no acredita nueva lectura ni disponibilidad actual del destino retirado. [Recibo manual actualizado](AFW-UPDATES-MANUAL-ACCEPTANCE-2026-09-30.es.md). No repetir la pregunta de mensaje. Continuar inferencia/revisión/guardado del piloto; reapertura repetida y fallos de consulta siguen probados localmente, sin aceptación privada adicional.
