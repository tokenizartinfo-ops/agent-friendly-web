# Recibo privado de la primera suscripción del ensayo

## Resultado esperado y alcance

El consumidor nativo de Chavo ya identifica la fuente AFW y el evento afw.dossier.changed con su projectRef propio. Su creación devuelve un CallToolResult genérico, sin garantizar que incluya el id del protocolo MCP. El jawbone_id de la automatización no sustituye ese id. El productor finito existente requiere el identificador original, por lo que AFW conserva una observación privada de su propia suscripción después de verificarla.

No se añaden herramientas MCP, rutas HTTP/RPC, identidad, permisos ni claves. La constancia contiene el id devuelto por el controlador existente, ámbito original, generación del proceso, programa/fuente y vencimiento. No contiene URL de callback, secreto, hash del secreto, cifrado ni respuestas del expediente.

## Primera finalización y seguridad

La primaria D1 debe tener el esquema exacto antes de cualquier admisión de Node. Se comprueban columnas, unicidad e inmutabilidad mediante lecturas sin filas. La ausencia o alteración de esquema impide el arranque y el callback.

Después del callback de verificación y del ACK durable original, el host observa el recibo del controlador. La inserción en D1 está ligada al mismo grant, owner, proyecto, cliente, recurso, proceso, imagen, programa/fuente, consentimiento actual, ausencia de retirada/cierre y reloj SQL dentro del plazo original. Se comprueba de nuevo la autorización después del await y antes de devolver el recibo original.

El journal y el almacenamiento durable son confirmaciones separadas: NO son una creación atómica. Un error, falta de ACK o carrera posterior al arranque solicita el cierre de la custodia original, conserva los registros y devuelve unavailable. Una fila que persistió con ACK perdido no permite recuperar la operación ni reconstruir su presupuesto; verificar el paro físico sigue siendo obligatorio.

En este host privado del ensayo, después de una primera finalización registrada, repetir subscribe se rechaza antes de custody.start y de la rama de renovación del controlador. No actualiza la constancia ni amplía el plazo. El controlador genérico conserva su comportamiento; esta restricción pertenece al ensayo propio. Las primeras llamadas concurrentes pueden provocar un cierre conservador de la única custodia: nunca deben producir más de una constancia ni repetir callbacks/presupuesto.

## Lectura para preparar el disparador

ownSubscriptionReceiptEligibilitySql es una consulta privada de primaria, ligada a los ocho pins originales del operador. Une el recibo con grant, proyecto, admisión y consentimiento actuales y rechaza retirada, cierre, cambio de identidad/recurso/fuente o vencimiento. Una fila histórica por sí sola NO autoriza el disparador. La consulta tampoco acredita Node activo ni el ACK del consumidor nativo; ante ACK desconocido no se arma usando una búsqueda de recuperación. El productor sigue exigiendo el estado durable, Node original y origen guardado al ejecutar.

Antes de armar: respuesta positiva observable de la creación nativa, recibo original con ámbito actual, proceso original comprobado y evento realmente guardado tras la suscripción. Se conserva el cierre original antes de admitir Node. No gastar el presupuesto ONE en una creación preliminar para aprender su respuesta.

## Validación y despliegue

Las fixtures locales verifican ausencia de esquema antes del boot; constancia exacta sin secretos; rechazo de renovación; historia inmutable; ACK de inserción perdido con cierre; cambio de autoridad/reloj al commit; concurrencia; y rechazo de historial cerrado/retirado. El bucle OAuth/RPC/Node firmado local sigue siendo sintético en plataforma/callback; no acredita un consumidor cloud ni PC-off.

Aplicar db/dossier-subscription-receipt.sql únicamente a la D1 privada del canary propio, mientras todo está cerrado y sin procesos. Es aditivo: el rollback conserva la tabla y sus registros y usa la versión compatible cerrada anterior, sin DROP ni borrado de historia. No aplicar al expediente de producción ni al de Max. La aceptación de fuente/CI, migración, despliegue cerrado y comparación de recursos son gates previos a cualquier nueva ventana. Una constancia no equivale a la respuesta útil posterior del asistente.
