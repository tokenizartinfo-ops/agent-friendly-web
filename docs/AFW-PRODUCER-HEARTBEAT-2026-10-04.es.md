# Constancias del productor y salud repetida

## Publicación cerrada — 4 de octubre

PR222 integrado, fuente9fb935a71444ebcbe66861316601b8f0d1d07726; CI37212527060 pasó747pruebas/lint/build. Migración aditiva aplicada solo a D1 operaciones603c471d; eventos2/incidencias1 preservados, checkpoints0. No se ejecutó el productor ni se modificaron expedientes.

Worker productor7ebc8570-8ea2-4fe2-bb7f-630c0c05cc27 desplegado100% a15:21:23UTC (12:21Argentina). API verificó disabled, schedules[], cero secretos, binding al receptor AFW y OPERATIONS_STATE_DB al D1 operativo exclusivo. Versiones/modos delegados conservados. Artefactos e91175e probados e integrados equivalentes al main9fb935a. Rollback anterior30090b7c conservando tabla/historial; tampoco activa cadencia.

Esta publicación no acredita ejecución remota por binding ni alerta de silencio. Esos resultados siguen pendientes: ensayo remoto de productor con recepción firmada y constancias, cierre acotado, y watchdog/consumidor independiente comprobado antes de periodicidad. No repetir ingreso de propietarios ni usar sus sesiones para el ensayo operacional.

Proyecto AFW, repositorio agent-friendly-web. Estado operativo aislado, sin expedientes o credenciales. Migración aditiva worker/operations/producer-state.sql destinada únicamente a D1 operaciones603c471d-19bb-4530-9773-c02e18b29840. Worker productor permanece disabled/sin cron. Rollback de código conservando tabla y eventos, nunca DROP ni reactivación por inferencia.

Dos filas durables, una por recurso delegado, registran observación y confirmación por separado, versión/modo confirmado, resultado, entrega pendiente y lease. Revisión saludable reciente confirmada se omite hasta quince minutos; fallo, transición, cambio de versión/modo, acuse pendiente o confirmación vencida se envían. La omisión actualiza observación pero no inventa nuevo acuse. Una respuesta perdida puede ocultar una persistencia efectiva: pending obliga a enviar la recuperación siguiente. El lease de cinco minutos serializa el recurso y bloquea un finish antiguo; no autoriza reparación.

producerFreshness clasifica silencio o entrega vencida después de quince minutos, ausencia o reloj anterior a la constancia. Es un cálculo local sobre datos durables; todavía no existe un watchdog cloud independiente ni alerta entregada. No confundir observar salud con confirmar recepción. Con cadencia futura, el acuse saludable se renueva cada quince minutos en lugar de crecer el historial en cada revisión. No habilitar cron sin recepción por binding y consumidor/alerta comprobados.

Pruebas con SQLite: exclusión concurrente, lease viejo denegado, omisión de salud reciente, entrega pendiente, transición/modo, vencimiento y silencio. Integración productor/ingress: segundo ciclo saludable conserva dos eventos, estado inválido falla antes de consultar, receptor no disponible queda sin confirmar. Tabla ausente o D1 no disponible deben interrumpir antes de declarar éxito; configuración canónica requiere OPERATIONS_STATE_DB aislada.

Siguiente aceptación remota: aplicar solo esta tabla aditiva a operaciones, publicar productor cerrado, verificar DB/binding/flags/schedules; luego ensayo acotado de programación y entrega real por binding con custodia temporal y restauración en finally. Señales públicas/sintéticas solamente; conservar historia y retirar firma/cadencia al concluir. No acredita apagado del PC ni notificación Codex.
