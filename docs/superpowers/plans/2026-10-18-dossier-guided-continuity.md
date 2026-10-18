# AFW: continuidad y primeros resultados del expediente

> Ejecución autorizada por Gabriel el18oct2026 de los cinco bloques propuestos. Usar superpowers:executing-plans en este worktree; una revisión independiente del conjunto antes de integrar.

**Objetivo:** que una persona retome el expediente con una sola siguiente acción, obtenga una primera lectura útil sin completar todo y comprenda datos, entrega y resultados.

**Diseño aprobado:** mejorar los flujos existentes de guía, observaciones, procedencia y cápsula. Mantener una pregunta por vez, desconocidos pendientes, propuestas revisables, propiedad privada y publicación separada. No crear un nuevo subsistema de agentes ni activar el ensayo cloud pendiente.

**Base:** main495d1969971b70e43b57ed393fff2d2ef66ad711; rama feat/dossier-guided-continuity-20261018. Producción pública sigue en fuente mínima f28c06d; un merge de fuente no equivale a despliegue.

**Límites comunes:** AFW únicamente; sin Max, correo, OAuth, tokens, Containers ni recursos Tokenizart. No copiar respuestas privadas a eventos/historial. Mantener CAS, idempotencia, aislamiento, guardado pendiente y revisión de conflictos. Las nuevas preferencias no conceden acceso ni aparecen en el perfil público. ES/EN/PT, detalles secundarios plegados y navegación por teclado. Sin nuevas dependencias. Toda migración es aditiva, se genera e inspecciona; no aplicarla remotamente sin publicación acotada y recuperación preparada.

## Task 1: recordar preguntas pospuestas

**Archivos:** lib/dossier-guide-continuity.mjs; lib/intake.mjs; db/schema.ts y migración Drizzle generada; app/api/projects/route.ts; app/components/intake-workspace.tsx; app/components/intake-question-coach.tsx; lib/intake-question-copy.mjs; etiquetas privadas y fixtures necesarios.

**Contrato:** deferredQuestions es lista privada de nombres de preguntas conocidas, sin respuestas. Se normaliza a preguntas todavía vacías; guardar, recargar, rebase y salida usan la misma versión del expediente. Omitir el campo en un cliente antiguo conserva la preferencia existente. «Retomar» elimina la preferencia, no rellena datos ni publica. No depender de localStorage o identidad escrita por el usuario.

- [x] Escribir pruebas para posponer, serializar/recuperar, responder después, retomar y entradas inválidas; observar RED.
- [x] Implementar el modelo y conectarlo al formulario/guardado existentes. Generar e inspeccionar migración de columna JSON privada.
- [x] Probar persistencia local real de esquema y compatibilidad anterior; recuperar revisión y conservar cambios concurrentes.
- [x] Ejecutar pruebas dirigidas de continuidad, intake, guardado, rebase e historial; guardar resultado y commit.

**Cierre:** recarga del expediente sintético conserva las preguntas pendientes y el siguiente paso; otro expediente no recibe esa preferencia; no hay columna ni ruta pública nueva.

## Task 2: primera lectura útil sin exigir todos los datos

**Archivos:** nuevo modelo/componente acotado dossier-first-step; app/components/intake-workspace.tsx; lib/observation-next-step.mjs si se necesita distinguir detalles técnicos aplazables.

**Contrato:** con sitio válido y objetivo declarado guardados se ofrece una acción explícita para revisar el sitio mediante el flujo existente. CMS/hosting desconocidos no bloquean esa lectura. No se dispara red por render o recarga. Si hay cambios sin guardar, sesión vencida o conflicto, resolver primero ese estado. La lectura no publica ni permite instalar. Una observación existente se reutiliza antes de sugerir otra auditoría.

- [x] Pruebas RED para sitio+objetivo con CMS/hosting vacíos, cambios pendientes, observación existente y estados de sesión/conflicto.
- [x] Mostrar una tarjeta breve conectada a las acciones existentes, conservando bloqueo/reentrada del escaneo.
- [x] Verificar CTA y transiciones en el componente real; ejecutar pruebas dirigidas y commit.

**Cierre:** un expediente mínimo llega por decisión humana a su primera lectura sin completar el formulario entero ni repetir la auditoría al volver.

## Task 3: procedencia y certeza comprensibles

**Archivos:** modelo/componente dossier-trust-summary; app/components/intake-workspace.tsx; lib/dossier-field-history.mjs y endpoint existente solo si requieren ajuste.

**Contrato:** distinguir declaración del propietario, propuesta IA revisada y observación pública fechada. El historial no prueba veracidad del valor. Datos del borrador no se presentan como guardados y un historial de otra revisión/origen no certifica la actual. No mostrar valores o payloads del evento ni inferir contradicciones desde ausencia de señales.

- [x] Pruebas RED de fuentes, fechas inválidas, revisión, origen y cambios pendientes.
- [x] Usar el endpoint privado actual, cancelación al cambiar expediente y resumen plegado con una explicación corta.
- [x] Probar fallos de lectura sin afirmar pérdida de datos; dirigidas y commit.

**Cierre:** el usuario puede reconocer qué declaró y qué se observó, con fecha y límites, sin una falsa etiqueta de «verificado» para sus respuestas.

## Task 4: instrucciones de entrega adaptadas

**Archivos:** lib/delivery-instructions.mjs; app/components/delivery-advisor.tsx y consumidor de cápsula; pruebas de asesor/plan.

**Contrato:** pasos breves según capacidad y CMS/hosting declarados, sin inferir accesos. WordPress no equivale a poder escribir archivos de raíz; repositorio exige confirmar despliegue; desconocidos llevan a identificar responsable. Conservar copia previa, aprobación del paquete exacto, comparación y reversión. No crear plugin ni automatizar instalaciones.

- [x] Pruebas RED para WordPress, hosting declarado, repositorio, mantenedor y desconocidos, incluidos textos no confiables.
- [x] Mostrar pasos contextualizados dentro del asesor existente, con detalles secundarios plegados.
- [x] Verificar compatibilidad de plan guardado y ausencia de permisos/publicación implícitos; dirigidas y commit.

**Cierre:** existe un siguiente paso útil según lo que la persona realmente puede hacer y una guía entregable a mantenimiento.

## Task 5: resultado legible y exportable

**Archivos:** modelo de recibo legible y presentación dentro de cápsula/observaciones existentes. Reutilizar versión, manifiesto, decisiones y comparación auténticos.

**Contrato:** explicar propuesta, aprobación, lectura de archivos y lo que falta comprobar. Exportar texto local con referencias/fechas y límites, sin llamadas, correo o cambios remotos. Comparar puntajes solo con origen y metodología iguales; coincidencia de archivos no certifica el sitio ni equivale a publicación por AFW. No incluir contactos o respuestas privadas innecesarias.

- [x] Pruebas RED para propuesta sin aprobación, aprobación sin instalación, comparación coincidente/diferente, evidencia ausente/caducada y metodologías distintas.
- [x] Añadir vista breve y descarga de resumen legible utilizando datos ya leídos.
- [x] Verificar navegación/descarga en el componente real; dirigidas y commit.

**Cierre:** un recibo distingue lo propuesto y observado del trabajo aún pendiente, sin prometer puntaje ni funcionamiento cloud.

## Cierre del conjunto

- [x] Ejecutar pruebas pertinentes de todo el recorrido, lint y build; suite completa de CI sobre la candidata exacta.
- [x] Revisión independiente del diff con las cinco clases de entrada: expediente vacío, datos aplazados, sesión/conflicto, fuentes incompletas y permisos/resultado no acreditados.
- [x] Integrar solo con verificaciones aprobadas; registrar fuente y pendientes de publicación. Preparar canary/publicación de producto por separado preservando configuración efectiva y datos.
- [x] Guardar continuidad y evidencia. No acreditar PC-off ni avanzar el ensayo de Containers por estos cambios.

Cierre18oct2026: PR463/main0bd0f9d, exact public backportPR464/source3700ce9, versiond82fefec100%. Recibo: docs/AFW-GUIDED-DOSSIER-RELEASE-2026-10-18.es.md. Interacción local y publicación comprobadas; nuevo clic privado remoto y cadena PC-off conservan límites separados.
