# AFW: operación cloud con identidad gestionada

Plan operativo; no acredita activación permanente. Custodia, HTTP y lectura funcional aceptados en AFW-CLOUD-NETWORK-ACCEPTANCE-2026-10-05.es.md y AFW-MANAGED-FUNCTIONAL-ACCEPTANCE-2026-10-05.es.md.

## Límites del gerente

La identidad gestionada accede únicamente al manager operacional AFW. No da acceso a expedientes, revisión humana, correo, repositorios ni deploys. Una investigación o un ACK no es una reparación. Las correcciones necesitan diff, validación, promoción y rollback propios.

Gateway y executor son controles distintos: exigir current/enforced/ready y solicitar red de ejecución mediante el schema actual. Conservar proxy/CA/TLS y destino exclusivo. No trasladar parámetros cloud a herramientas locales incompatibles.

## Promoción por capas

1. Confirmar disparo programado en el chat cloud AFW con fuente publicada, HEAD limpio, ventana vigente y resultado correlacionado. Una marca last_run no basta. Observar externamente: mensajes al chat en el arranque pueden desviar el turno.
2. Inventariar controles del productor, watchdog y receptor antes de abrirlos. Conservar el journal operacional separado de QA; no copiar fixtures a producción. Usar sus aceptaciones previas de firmas, deduplicación, transiciones y presupuesto.
3. Empezar la operación con ventana explícita y una sola programación. Presupuesto compartido: tres reservas/24horas y una tarea activa; no ampliar por error o retraso. Recuperar desde el journal, no desde archivos scratch.
4. Escalar únicamente señales que cambian o requieren acción. `reviewed` terminal permanece silencioso; `review_required` bloquea. Conservar UTC, source, revisión y resultado saneado. Nunca copiar datos de cliente a incidentes de arquitectura.
5. Retirar programación, cerrar flags/deadline, deshabilitar token y restaurar selector. Verificar versión y settings efectivos, D1 original, cron y preservación del historial. `--keep-vars` puede conservar un deadline ausente en el archivo de rollback: comprobarlo.

## Preparación del cron y arranque sin falsas alertas

Preparar el cron con el watchdog cerrado. Esperar confirmación reciente de los dos checkpoints del productor antes de habilitar las clasificaciones y los avisos: datos antiguos no acreditan un fallo actual. Una ejecución saludable inicial no debe crear una alerta de recuperación sin una condición problemática previa.

Aceptación operacional positiva: AFW-OPERATIONAL-POSITIVE-ACCEPTANCE-2026-10-05.es.md. Preparar **ambos** cron con gates cerrados y comprobar un disparo real antes de iniciar la ventana de firma/entrega. Activar código y vars con versions upload/deploy, verificar modified_on intacto y habilitar el watchdog solo después de checkpoints frescos. El historial GraphQL específico workersInvocationsScheduled puede llegar después del tail/D1; una lista vacía no demuestra por sí sola ausencia de ejecución. Preservar el ensayo anterior como evidencia, sin atribuir una causa interna del proveedor no demostrada.

Cloudflare documenta hasta15minutos de propagación de cambios de cron. En el ensayo del6octubreUTC, un segundo `wrangler deploy` con la misma expresión actualizó `modified_on`: no repetir ese comando para ajustar únicamente una ventana ya preparada. Usar `wrangler versions upload` y después `wrangler versions deploy` para código/configuración versionados, comprobar settings efectivos y verificar que el cron no cambió. Los triggers se administran por separado. Fuente: https://developers.cloudflare.com/workers/configuration/cron-triggers/.

Al cerrar, retirar explícitamente el cron, flags y deadline; eliminar la firma temporal del productor y receptor después del cierre. No confiar en seleccionar una versión histórica ni en que el deadline por sí solo retire la programación. Una operación admitida antes del vencimiento puede terminar después: preservar el journal y no prometer cancelación retroactiva.

## Vigencia y responsabilidad

Owner responsable: Gabriel. Identidad gestionada vigente hasta4noviembre2026 22:09:32UTC (19:09BuenosAires), sin autorrenovación. Avisar antes de caducar con metadata, sin secretos. Si no se renueva mediante custodia autorizada, cerrar; no elegir otra identidad ni usar el piloto vencido.

La guardia continua necesita una ventana/cadencia verificadas y el circuito operacional completo. Hasta entonces la operación permanece cerrada tras cada ensayo. No repetir PCapagada, CSRF o carga de claves que ya tienen aceptación vigente; volver a probar solo cuando cambien las condiciones pertinentes.
