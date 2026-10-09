# Lectura administrativa del recibo privado

9 octubre 2026. Preparación del ensayo propio; no acredita ejecución remota ni PC apagada.

El Workflow administrativo existente acepta `operation: observe` y una referencia exacta del registro. Lee dos veces la inscripción y aprobación históricas del Durable Object primario, comprueba su correlación y obtiene la metadata del desafío firmado. Devuelve únicamente estado del diario, referencia del recibo y fechas; nunca nonce, credenciales ni aprobación completa.

La lectura histórica sigue disponible después del vencimiento o retirada y en la versión de reversión. Un recibo confirmado demuestra aquella recepción, no permiso vigente, instalación, procedencia cloud por sí solo ni supervisión permanente. La correlación con tarea, turno, comando, fuente y salida oficial de plataforma exige constatación administrativa independiente.

No agrega rutas HTTP, bindings, clases, migraciones, programación ni privilegios. `register` conserva su contrato y validación vigente; la reversión continúa rechazándolo. `observe` no escribe pasos de Workflow ni modifica el registro. Parámetros adicionales, referencia incorrecta, deriva de inscripción, metadata sensible, fechas incompatibles, retroceso de reloj, fallo de transporte o timeout devuelven `unavailable`, sin reintentos.

Las pruebas nativas ejercitan un Workflow y SQLite Durable Object reales en Miniflare: recepción autenticada, observación del mismo recibo, referencia ajena, registro ausente, retiro, reinicio y reversión con historia preservada. Se detectó que workerd añade un manejador RPC `Symbol.dispose`: el adaptador copia los datos y libera ese manejador antes de aplicar el esquema estricto. Las pruebas unitarias cubren además lectura posterior al vencimiento, diario ausente/emitido/retirado, campos secretos, cambios históricos, timeout y reloj regresivo.

La publicación remota cerrada y su lectura de configuración deben registrarse por separado. El servicio no se habilita por integrar este código.

## Publicación cerrada comprobada

PR366, fuente `9aca1df98a669e804fb34265e96023382f148d60`, CI37985406300 exitosa y merge `9d1ec2aa9896e0a3059593a8586ee78ce165d9dd`. Suite 1398 aprobadas, cero fallos, dos omisiones de plataforma; siete casos focales/nativos finales aprobados. Lint sin errores y dos avisos previos, build y ambos dry-runs aprobados. Revisión independiente: caso límite de reloj corregido, sin P1/P2 pendientes.

Scope propio 20:15–20:35UTC, cerrado anticipadamente a20:16:26UTC tras dos despliegues y ocho lecturas de aceptación. Recuperación `15d801f8-1857-4d3f-8780-3797cb1fe2e1` observada al100% a20:15:53UTC antes de la candidata `c0efdd9c-97a5-4aa0-8b04-dfd8f319c07e`, deployment `4131b6ca-8a12-4d96-88a3-fcad8230a742`, observada al100% a20:16:26UTC. Las clases, namespaces SQLite, Workflow, D1 con ambos campos y secreto previo por nombre permanecen. Ambos flagsfalse, pins/identidad vacíos y programación vacía.

Se preservaron ambos patrones de ruta y fail_openfalse; Wrangler recreó los IDs: custody `93382b4598a240d384ea1b7745b981e0` y occurrences `cf2b49a7f93448408451c47b352276de`. La app propia del desafío `2f0ccc55-e859-454c-a653-8bb87ddb2d73` conserva policy `da070122-8a2d-4955-b8f0-ac747914b3bc`, deny/everyone. Los dos patrones quedan explícitos en las configuraciones canónicas para evitar perderlos en futuras publicaciones.

Evidencia saneada en `output/afw-observation-{rollback,candidate}-readback-20261009.json`, logs de despliegue y plan fechado de publicación. Esto acredita montaje y configuración cerrados. No hubo instancia Workflow, inscripción, nonce ni recepción real remota; la lectura de un recibo remoto continúa pendiente de aquel ensayo. La tarea cloud anterior conserva fuente083d620: este despliegue no equivale a adoptar una publicación nueva en esa tarea.

Después: implementar la autoridad primaria de reserva por recursos propios, fuentes administrativas de proveedor y expediente de custodia correlacionado. `custodyRef` identifica un expediente previo, no un recibo futuro; la evidencia posterior se añade sin cambiar la inscripción. Primero ensayo PC encendida e instalación recuperable, después una única ocurrencia programada y un intervalo acordado de PC apagada. Max sigue fuera de este ensayo.
