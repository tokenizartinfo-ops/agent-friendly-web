# Productor operativo delegado

PROJECT AFW; REPOSITORY agent-friendly-web; ENVIRONMENT isolated operations producer; RESOURCE_TYPE Worker; RESOURCE_ID agent-friendly-web-operations-producer; ORIGIN sin ruta pública. ALLOWED_ACTION preparar y publicar cerrado, verificar binding exclusivo al receptor AFW y ausencia de cron. ROLLBACK configuración disabled sin triggers, sin borrar registro operativo. No usa datos, D1, permisos o runtime de clientes/Tokenizart.

## Identidad y contrato

Worker independiente, sin workers.dev, previews ni rutas. Binding OPERATIONS_RECEIVER exclusivamente al Worker agent-friendly-web-operations. Firma propia compartida con el receptor cuando se acepte una activación; nunca se obtiene de expedientes ni de Access del owner. La configuración queda disabled, sin secreto ni cron; un evento programado en estado paused no consulta ni envía.

createOperationsProducer valida toda la configuración antes de consultar: ambos recursos fijos, modalidad explícita y versión UUID declarada. Consulta únicamente seis superficies públicas con los límites ya comprobados; entrega cada señal usando firma HMAC al origen fijo del receptor. Las versiones declaradas deben cotejarse con el deployment antes de activar y actualizarse tras una promoción; su formato no acredita versión activa por sí solo. La expectativa debe respetar las ventanas de mantenimiento.

deliverOperationalSignal valida los seis campos, firma bytes exactos/timestamp, usa POST con redirects rechazados y límite total de cinco segundos. Recibo JSON máximo1024bytes; solo202 con acceptedtrue, duplicateboolean y fingerprint válido confirma entrega. Error, timeout, respuesta200,302 o recibo ambiguo quedan sin confirmar. No registra cuerpos, firmas, secretos o errores internos; no reintentos automáticos ni efectos de reparación. Una señal failed entregada correctamente es una entrega aceptada, no un sitio saludable.

## Verificación y activación pendiente

Pruebas locales integradas con ingress real y SQLite: persistencia firmada, duplicado durable, campos privados rechazados antes de enviar, destinos fijos, errores saneados, recibos falsos/oversized denegados y deadline aunque el receiver nunca resuelva. Productor paused/incompleto no realiza consultas; configuración válida realiza seis consultas y persiste dos señales saludables sin abrir incidencia. Receptor no disponible produce entrega no confirmada.

Antes de cron: reducir salud repetida y definir heartbeat separado para detectar silencio del productor; receptor activo con custodia permanente; recepción remota a través del binding, fallo/recuperación, y consumidor cloud con acuse comprobado. No activar una cadencia que solo acumule estados saludables ni prometer avisos Codex a partir de una ejecución programada. La primera publicación cerrada no acredita funcionamiento programado, alerta humana, ordenador apagado o disponibilidad comercial.
