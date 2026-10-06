# AFW: entrega durable de pedidos de ayuda

Proyecto AFW; implementación y publicación cerrada del 6 de octubre. No activación, migración remota, inscripción de clientes ni guardia por esta implementación.

## Resultado

El recibo privado `assistance_requested` comprometido es la fuente. Un productor independiente selecciona exclusivamente filas de la inscripción y propietario vigentes, con fecha mínima. No usa el cursor de revisión del guardado. Cada señal `afw-assistance-event-v1` conserva una identidad independiente y no transporta respuestas, correo, dominio ni transcripción.

Se añadió `lib/assistance-supervision-delivery.mjs`: POST firmado a `/assistance-events`, entrada exclusivamente de servicio, origen/ruta exactos, cuerpo acotado, timestamp y firma HMAC, inscripción de referencia opaca y ventana UTC. Flag independiente `AFW_ASSISTANCE_SUPERVISION_ENABLED`; ausente o inválido permanece cerrado. El receptor exige el secreto propio `AFW_ASSISTANCE_SIGNING_SECRET`; no reutilizar por inferencia la firma de guardados.

El receptor conserva un evento por identidad y devuelve únicamente versión del recibo, eventId y duplicate. Una colisión con contenido diferente se rechaza. Dos pedidos de la misma revisión se conservan separadamente. Recibir la señal no significa revisarla o resolverla.

La confirmación de entrega permanece en la base **privada de origen**, tabla `assistance_delivery_receipts`, junto al ID privado del evento. La base operacional solo recibe `assistance_supervision_events` y referencias opacas. El selector excluye confirmaciones por evento; no existe un watermark que descarte otros pedidos de la misma revisión. No modificar ni borrar el journal de respuestas.

El productor envía como máximo tres intentos por ejecución, fuera del camino de guardado UI. Comprueba propietario y payload después de la selección y otra vez al confirmar la entrega; ventana comprobada alrededor de awaits. Un recibo perdido no confirma origen: el siguiente envío recupera el mismo evento en destino y recién entonces registra su entrega. Respuesta inesperada, retirada o expiración no generan confirmación. Una fila corrupta falla cerrada y necesita diagnóstico saneado; no se descarta silenciosamente ni se considera atendida.

## Configuración y pruebas

`wrangler.assistance-supervision-producer.jsonc` prepara Worker separado, sin rutas, workers.dev, preview, crons, D1 o inscripción por defecto. Secreto y enrollment quedan en custodia de servidor; `AFW_ASSISTANCE_ENROLLMENTS` no figura en vars. Nuevo handler del receptor operacional solo acepta la ruta al habilitar el control específico. Todos los recursos remotos siguen con el estado previo cerrado.

Trece pruebas específicas pasaron: firma, cuerpo/origen/ruta, propietario inicial y cambiado durante selección/envío, cierre, confirmación inesperada, colisión, lote acotado, contenido privado inválido y recuperación nativa workerd/D1 con dos pedidos en una revisión. Las regresiones de cambio de propietario y alteración de tipo/fecha fallaron antes de corregir las comprobaciones. PR301 merged `140e9204c65fecff4122e0919dd9f5d625644064`; CI37508398477 pasó966/966 pruebas, lint y build.

## Publicación cerrada verificada

A las18:07 UTC: receptor `agent-friendly-web-operations`, versión `33ce77f8-8652-487c-999c-78159ce95a15` al100%; original D1 `603c471d-19bb-4530-9773-c02e18b29840`, flagfalse, sin ventana ni cron. Conservados los nombres de los dos secretos del circuito previo; sin leer sus valores ni preparar nuevos para ayuda. POST anónimo de ensayo a `/assistance-events` devolvió503 `{error:paused}` y no-store.

Productor nuevo `agent-friendly-web-assistance-supervision-producer`, versión `6c628bcd-34bd-4748-b5c2-3d998cd8c58b` al100%; flagfalse, service binding al receptor AFW, sin DB, secretos, ventana, rutas, workers.dev, preview o cron. Ambos empaquetados dry-run pasaron antes de publicar desde la fuente merged limpia. No se aplicaron los SQL a bases remotas.

Rollback receptor: `3c7dc696-0afc-44b6-a3e7-778cd4fb9467`, preservando D1/custodia y flags cerrados. Productor nuevo: conservarlo deshabilitado y sin rutas/calendario; no borrar datos o recibos como parte de una reversión.

## Próximos bloques y reversión

Antes de desplegar: comprobar fuente y versiones/bindings; conservar rollback de receptor; desplegar código cerrado y productor sin cron/DB/secretos. Los dos SQL son aditivos y tienen destinos distintos: `assistance-delivery-receipts.sql` solo en origen privado, `assistance-supervision.sql` solo en ledger operacional. Aplicación remota requiere revisión del destino y prueba aislada, sin borrar historial.

Sigue servicio de revisión: identidad de servicio con audiencia/cliente exactos, inscripción propia, claim/finish y presupuesto **compartido y simétrico** con los modos anteriores, lease finito, cierre durante awaits, recibo real correlacionado. No activar el consumidor actual por inferencia: aún no reconoce ayuda. Primero probar su contrato local y D1 nativa, luego ensayo propio separado y fuente cloud publicada vigente.

Más adelante, devolver la revisión real a la aplicación. Cualquier lectura privada o repregunta con respuestas requiere otro consentimiento revocable; esta entrega solo proporciona categoría y metadata. Reversión: cerrar flags/deadline, retirar trigger y custodia de activación; conservar recibos y D1. Volver a versiones previas no sustituye la comprobación de bindings efectivos.

