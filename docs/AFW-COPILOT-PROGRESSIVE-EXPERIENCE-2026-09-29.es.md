# AFW: expediente progresivo conducido por el copilot

## Decisión de producto

El producto final debe sentirse como una conversación breve y segura, no como un formulario extenso. La persona explica su sitio por texto o por segmentos de audio. El copilot organiza la información en un expediente de trabajo en segundo plano y muestra **una sola pregunta o decisión por vez**. No presenta desde el inicio todas las secciones, porcentajes de completitud, pendientes, archivos ni controles técnicos. La vista completa sigue disponible a pedido y cobra protagonismo cuando ya hay una síntesis para comprobar juntos.

Este documento registra la dirección de producto del owner; no describe la interfaz actualmente desplegada ni autoriza abrir el piloto a otros expedientes. La prioridad inmediata sigue siendo completar y verificar los circuitos funcionales. El rediseño progresivo se implementará después, por bloques verificables.

## Contrato del acompañamiento

1. **Escuchar y estructurar.** Una respuesta puede contener datos de varias secciones. El copilot los separa, cita el fragmento de origen y conserva la diferencia entre declarado, observado, propuesto y verificado. El audio se transcribe primero y la persona puede corregirlo.
2. **Construir un borrador de trabajo.** El copilot puede completar campos provisionales detrás de la conversación sin convertirlos en hechos verificados. No publica, instala archivos, habilita herramientas o pagos, ni modifica el nivel AF observado. Guardar el expediente y cualquier paso externo mantienen sus controles propios.
3. **Elegir la próxima pregunta.** Pregunta solo lo que cambia una decisión útil para ese sitio: una ambigüedad, un dato indispensable, control técnico o autorización aplicable. Permite responder «no lo sé», ampliar, corregir o volver después. Evita repetir lo ya dicho.
4. **Explicar con empatía.** En cada paso dice en lenguaje llano qué entendió y por qué pide ese dato. Si el usuario se detiene o una inferencia falla, conserva el avance y ofrece una salida simple. No promete AF-5, citas ni ventas; recomienda un horizonte proporcional al objetivo del sitio.
5. **Revisar juntos.** Cuando el borrador alcanza un punto útil, ofrece una síntesis pequeña: «Ya organicé lo que me contaste. Si querés, comprobamos juntos cada parte». Solo señala datos ambiguos o pendientes relevantes. La persona puede pedir «releeme esta sección», «explicame por qué» o «mostrame todo el expediente».

## Modelo interno propuesto

Cada dato candidato necesita `field`, `value`, `sourceExcerpt`, `sourceKind` (texto, transcripción corregida, observación pública), `status` (propuesto, confirmado por la persona, ambiguo, pendiente, verificado externamente), fecha y versión del expediente. Una repregunta debe referir a los candidatos que busca resolver; una corrección no debe borrar silenciosamente la fuente anterior. Este libro de procedencia es interno y solo se abre al usuario cuando aporta claridad o durante la revisión.

El planificador selecciona una única intervención visible según utilidad y carga cognitiva, no según orden fijo del formulario. Antes de preguntar, revisa si la respuesta ya está en el relato o en una observación válida. Los campos opcionales que no afectan el objetivo pueden quedar pendientes. La puntuación AF proviene de auditorías fechadas; el progreso del expediente es otro estado y no se usa como presión visual.

## Secuencia de implementación posterior

- **Estado trazable:** persistir propuestas y correcciones por expediente con aislamiento Access, idempotencia y control de concurrencia; separar borrador provisional de guardado confirmado. Diseñar migración y rollback antes de tocar D1.
- **Planificador de preguntas:** derivar la siguiente pregunta de datos faltantes, ambigüedades y objetivo proporcional. Probar que no reitera lo ya contestado y que «no lo sé» no bloquea todo.
- **Vista mínima optativa:** una pregunta, respuesta por texto/audio y una acción principal; acceso permanente a «ver expediente completo». Conservar el flujo actual mientras se valida el nuevo.
- **Revisión final conversacional:** resumen por secciones, correcciones puntuales, procedencia y explicación a pedido; guardar solo tras decisión explícita. Medir abandono y comprensión con pruebas de usuarios antes de sustituir el recorrido actual.

## Criterios de aceptación

La primera pantalla presenta una tarea concreta y no expone la lista completa de secciones. Un relato multitema se distribuye en candidatos con procedencia; el copilot confirma lo incierto y no vuelve a pedir datos ya aportados. El usuario puede avanzar sin conocer AF, MCP, OKF o nombres de archivos. Puede pausar y volver, corregir una sección, solicitar una explicación o abrir la vista completa. Ninguna sugerencia muda el puntaje observado o equivale a permiso de publicación. La interfaz sigue siendo usable sin IA y con permisos revocados.
