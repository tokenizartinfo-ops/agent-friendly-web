# AFW: constancias vigentes para el gerente cloud

## Propósito y límites

El gerente debe distinguir un fallo observado del sitio de un problema de seguimiento: entrega pendiente, observación vencida o acuse vencido. El contrato actual de operations-ledger.mjs solo permite delegated_edge/failed/recovered; convertir estos avisos a ese contrato produciría diagnósticos falsos y mezclaría incidencias. La outbox del watchdog conserva hechos históricos y no acredita un envío.

Este bloque prepara una inbox operativa distinta y cerrada por defecto. No modifica expedientes, permisos, el consumidor remoto, schedules ni el runtime. No aplica esquema remoto ni envía correo o mensajes. Una investigación de lectura no concede reparación, publicación ni permisos de cliente.

## Admisión implementada localmente

worker/operations/watchdog-inbox.sql es aditiva y solo para D1 operacional/QA explícita. Clave única resource+revision y referencia a la outbox; conserva kind, condición, fecha observada y fecha admitida. No payload libre o datos privados.

lib/operations-watchdog-inbox.mjs exige AFW_OPERATIONS_NOTICES_ENABLED=true, watchdog y productor intencionalmente activos y deadline servidor canónico vigente. Falla cerrada sin IO si falta una condición. Usa sesión primaria cuando está disponible. Un INSERT SELECT dentro de batch une la constancia a la revisión, condición y changed_at actuales. Excluye pausas, checked_at futuro o con más de15min, causas desconocidas, JSON inválido, duplicados y orden no canónico. Solo admite attention con causas reconocidas o recovered/healthy. Clave única hace idempotentes reintentos concurrentes sin borrar outbox.

La admisión se determina al ejecutar la sentencia, no con una lectura anterior. El deadline verifica la admisión de la llamada; no cancela una transacción ya iniciada. El envío futuro debe volver a verificar ventana e intención; una fila admitida puede volverse obsoleta inmediatamente después.

## Reserva, lectura y acuse pendientes

1. Listar únicamente inbox unida a estado vigente, con metadatos saneados y presupuesto acotado; inbox histórica no es cola ciega.
2. Reservar atómicamente por resource/revision y requestId estable: una lease vigente, plazo y presupuesto compartido. Guardar correlación durable antes de entregar trabajo. No reutilizar la tabla de investigaciones de delegated_edge por inferencia.
3. Revalidar revisión, condición, intención y ventana al claim y antes del despacho. Cambio o pausa convierte la reserva en superseded; conservar historia y no contarla como aviso entregado.
4. El destinatario devuelve recibo ligado a noticeId/resource/revision/requestId. Repetir ACK con igual contenido devuelve el mismo resultado; contenido distinto colisiona. Caducidad de lease o cambio de revisión impide aplicar diagnóstico viejo al estado actual.
5. Respuesta perdida: reintentar con la misma identidad de entrega solo si el transporte deduplica; de lo contrario reconciliar recepción antes de reenviar. ACK idempotente no garantiza una sola entrega. Persiste una carrera entre última revalidación y efecto externo; el destino también debe deduplicar y poder rechazar una revisión obsoleta.
6. Atención del gerente: revisar checkpoints/control-plane verificables, describir causa y siguiente paso; no concluir caída a partir del silencio. Recuperación sintética de QA no acredita reparación. Mensajes al cliente solo con canal/alcance definidos y evidencia vigente.

## Orden de implementación y aceptación

Admisión local → reserva/acuse locales con pruebas de carreras → adaptador autenticado independiente cerrado → aplicar solo esquema de QA → un ciclo cloud correlacionado que reserve/acuse y rechazo de revisión vieja → prueba de respuesta perdida/reintento → cierre independiente. Solo luego promover al almacenamiento operativo y establecer cadencia, identidad revocable y reconciliación explícita de la intención del productor.

Pruebas de este bloque: RED observado antes de implementación;7pruebas SQLite/D1 local de dedupe, historia, pausa, recuperación, antigüedad, datos inválidos, errores saneados y pausa entre preparación/ejecución. Suite previa a dos pruebas adicionales791/791; las7pruebas focalizadas pasan. Publicación requiere también lint/build/CI. Ni esquema remoto ni entrega real se acreditan por estas pruebas.
