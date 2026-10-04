# Productor operativo delegado

## Publicación cerrada comprobada

PR220 integrado, fuente9a546003779b99ecb7cf98d55aed8e8b76585eef; CI37211764014 pasó746pruebas/lint/build. Artefactos del runtime iguales entre revisión probada5e0a168 y main integrado. Worker publicado4deoctubre15:08:42UTC (12:08Argentina), versión30090b7c-db4b-4fcb-b815-04f15c914d7c100%. API Cloudflare verificó AFW_OPERATIONS_PRODUCER_ENABLEDfalse, modosclosed, versiones declaradas originales y servicebinding exclusivo a agent-friendly-web-operations/environmentproduction. Cero secretos y schedules[]; no targets públicos desplegados. Esto acredita provisión/configuración cerrada, no ejecución scheduled remota ni entrega por binding. Receptor permanece cerrado; no se generaron señales remotas en este bloque.

Rollback de código: esta versión cerrada, conservando registro y receptor. Antes de activación verificar nuevamente versiones declaradas, custodia, mantenimiento, recepción y límites. No inferir notificación cloud ni puntaje externo desde este despliegue.

PROJECT AFW; REPOSITORY agent-friendly-web; ENVIRONMENT isolated operations producer; RESOURCE_TYPE Worker; RESOURCE_ID agent-friendly-web-operations-producer; ORIGIN sin ruta pública. ALLOWED_ACTION preparar y publicar cerrado, verificar binding exclusivo al receptor AFW y ausencia de cron. ROLLBACK configuración disabled sin triggers, sin borrar registro operativo. No usa datos, D1, permisos o runtime de clientes/Tokenizart.

## Identidad y contrato

Worker independiente, sin workers.dev, previews ni rutas. Binding OPERATIONS_RECEIVER exclusivamente al Worker agent-friendly-web-operations. Firma propia compartida con el receptor cuando se acepte una activación; nunca se obtiene de expedientes ni de Access del owner. La configuración queda disabled, sin secreto ni cron; un evento programado en estado paused no consulta ni envía.

createOperationsProducer valida toda la configuración antes de consultar: ambos recursos fijos, modalidad explícita y versión UUID declarada. Consulta únicamente seis superficies públicas con los límites ya comprobados; entrega cada señal usando firma HMAC al origen fijo del receptor. Las versiones declaradas deben cotejarse con el deployment antes de activar y actualizarse tras una promoción; su formato no acredita versión activa por sí solo. La expectativa debe respetar las ventanas de mantenimiento.

deliverOperationalSignal valida los seis campos, firma bytes exactos/timestamp, usa POST con redirects rechazados y límite total de cinco segundos. Recibo JSON máximo1024bytes; solo202 con acceptedtrue, duplicateboolean y fingerprint válido confirma entrega. Error, timeout, respuesta200,302 o recibo ambiguo quedan sin confirmar. No registra cuerpos, firmas, secretos o errores internos; no reintentos automáticos ni efectos de reparación. Una señal failed entregada correctamente es una entrega aceptada, no un sitio saludable.

## Verificación y activación pendiente

Pruebas locales integradas con ingress real y SQLite: persistencia firmada, duplicado durable, campos privados rechazados antes de enviar, destinos fijos, errores saneados, recibos falsos/oversized denegados y deadline aunque el receiver nunca resuelva. Productor paused/incompleto no realiza consultas; configuración válida realiza seis consultas y persiste dos señales saludables sin abrir incidencia. Receptor no disponible produce entrega no confirmada.

Antes de cron: reducir salud repetida y definir heartbeat separado para detectar silencio del productor; receptor activo con custodia permanente; recepción remota a través del binding, fallo/recuperación, y consumidor cloud con acuse comprobado. No activar una cadencia que solo acumule estados saludables ni prometer avisos Codex a partir de una ejecución programada. La primera publicación cerrada no acredita funcionamiento programado, alerta humana, ordenador apagado o disponibilidad comercial.
