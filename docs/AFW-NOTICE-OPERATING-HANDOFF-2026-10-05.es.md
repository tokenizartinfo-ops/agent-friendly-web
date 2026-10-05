# AFW: preparación operativa de avisos y siguiente promoción

## Estado comprobado

La recepción programada y la recuperación de respuestas perdidas están aceptadas en QA; consultar sus dos recibos del5deoctubre. El manager permanece cerrado, sin cron/deadline/secretos y con su D1operativa original. No existe una guardia permanente demostrada.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT operaciones aisladas; ORIGIN operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE D1; RESOURCE_ID603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION preparar dos esquemas aditivos existentes con runtime cerrado. ROLLBACK mantener flagsfalse y conservar tablas vacías/historial; no DROP ni rollback de datos.

Wrangler4.128.0 aplicó watchdog-inbox.sql y notice-reservations.sql desde fuente verificada, únicamente en esta D1operativa. Bookmarks: inbox00000028-00000006-000050fb-26effee3e377771cf73d21e5b1c1fcd9; reservas00000028-0000000c-000050fb-3f860d07375eb3592e48f56c0f8ed9e2. Consulta independiente posterior:16events/2incidents/2investigations/2probe_state; watchdog_state/outbox/inbox/reservations todos0. foreign_key_check vacío. Ningún expediente/cliente/recurso Tokenizart modificado. Esquema preparado no significa aviso admitido o entregado.

## Respuesta operativa actual

| Resultado del ciclo | Acción permitida | Lo que todavía no acredita |
| --- | --- | --- |
| idle | No emitir actualización repetida; conservar contexto | Salud completa del sitio |
| received o reconciled/accepted | Correlacionar runId/revisión/fecha con recibo servidor | Diagnóstico, reparación o aviso al cliente |
| review_required/lease_expired | Detener nuevos claims y elevar referencia opaca al operador | Permiso para renovar lease o generar otro requestId |
| review_required/superseded | Revisar versión actual y registrar decisión separada | Que el fallo original siga vigente |
| review_required/multiple_unfinished_receipts | Revisar todas las reservas, sin elegir una arbitrariamente | Autorización para borrar/resolver alguna |
| Operational request unavailable | Detener ese ciclo; comprobar estado y ventana con metadata saneada | Causa específica, por sí solo |

No borrar reservas, cambiar outcomes a accepted ni consumir otra identidad para salir de review_required. La API de resolución trazable todavía NO existe: diseñar registro separado ligado a runId, actor autenticado, motivo/decisión/fecha, correlación/idempotencia y controles de concurrencia. Historial original inmutable; no reutilizar el permiso de recepción como permiso de resolución o reparación. Antes de implementarla, pruebas de aislamiento, decisión duplicada y cambio de revisión entre lectura/decisión.

## Orden de promoción pendiente

1. Conectar admisión de avisos al watchdog real: la fixture QA fue manual. Probar atomicidad entre estado/outbox/inbox y exclusión de pausas/versiones vencidas; conservar publicación cerrada hasta aceptación específica.
2. Implementar resolución trazable de revisión con alcance propio; ningún endpoint público improvisado.
3. Resolver ciclo de vida de identidad: la identidad temporal custodiada vence2026-10-05T17:39:03Z, queda deshabilitada y NO se amplía automáticamente. Identidad nueva o rotación/custodia privada requiere carga del owner en el entorno; nunca valores en chat/correos/Git. Preparar formulario y verificar metadata antes de pedir su intervención.
4. Aceptar ventana acotada de la cadena completa con datos sintéticos y recibos independientes. No repetir PC-off o scheduler ya aceptados.
5. Solo después configurar periodicidad estable: presupuesto común3/24h, una tarea activa, flags/deadline explícitos, revisión pendiente bloquea avance y avisos solo ante cambio/acción necesaria. No asumir puntualidad del scheduler ni vigilancia continua de una ocurrenciaCOUNT1.

Cuando existan reservas en la D1operativa, preservar AFW_OPERATIONS_SHARED_BUDGET_ENABLED=true al cerrar el canal de avisos hasta24h desde la última reserva, o permanentemente con el esquema. Actualmente reservas0 y todos los canales cerrados: no hay presupuesto de avisos que trasladar desde QA.

## Instrucciones para el próximo modelo

Leer este documento y los recibos recientes, verificar origen/HEAD/runtime actuales. Cada bloque termina con resultado comprobable y clausura; no volver a pedir login ni hacer pruebas PC-off aceptadas. No confundir un impedimento de credenciales para cadencia permanente con los bloques de código que pueden avanzar cerrados. La revisión de seguridad y el ciclo de admisión siguen pendientes aunque la recepción programada haya pasado.
