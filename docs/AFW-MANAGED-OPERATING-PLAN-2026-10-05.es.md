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

## Vigencia y responsabilidad

Owner responsable: Gabriel. Identidad gestionada vigente hasta4noviembre2026 22:09:32UTC (19:09BuenosAires), sin autorrenovación. Avisar antes de caducar con metadata, sin secretos. Si no se renueva mediante custodia autorizada, cerrar; no elegir otra identidad ni usar el piloto vencido.

La guardia continua necesita una ventana/cadencia verificadas y el circuito operacional completo. Hasta entonces la operación permanece cerrada tras cada ensayo. No repetir PCapagada, CSRF o carga de claves que ya tienen aceptación vigente; volver a probar solo cuando cambien las condiciones pertinentes.
