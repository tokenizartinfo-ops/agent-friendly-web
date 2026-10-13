# Guardado del objetivo en el ensayo propio

## Resultado y límite

El ensayo delegado tiene una D1 privada distinta de la web. Sus lecturas y permisos ya se probaron, pero no había un recorrido de guardado que produjera allí un evento de aplicación. `saveOwnSyntheticGoal` prepara esa operación interna para una futura pantalla propia: cambia únicamente goals, revision y updated_at, y guarda el evento project_updated en la misma transacción.

Este módulo NO está montado en HTTP, no agrega herramientas OAuth de escritura, no tiene pantalla publicada y no instala esquemas ni siembra eventos. No altera producción, otros expedientes o Max. Su futura interfaz debe identificarse claramente como ensayo sintético y pedir una sola respuesta; no sustituye la interfaz de clientes.

## Contrato

El host suministra DB, contexto original, proyecto, contenedor, programa/fuente, ventana original de hasta diez minutos, reloj y beforeCommit trusted. La entrada contiene expectedRevision, UUID v4 de intento y un objetivo discovery o content. Ningún pin de propietario, grant, recurso o fuente proviene de la entrada.

Se requiere el recibo original de suscripción elegible en la misma primaria: propietario/proyecto/cliente/recurso y proceso/programa/fuente originales, autorización y consentimiento actuales, ausencia de retirada o cierre y plazo vigente. Esa lectura no acredita proceso activo ni ACK del consumidor cloud. El host HTTP pendiente debe comprobar identidad Access y CSRF, vigencia/configuración original y readiness según corresponda; el módulo no crea esa capacidad a partir de un callback verdadero.

Se comprueba beforeCommit de nuevo después de la última lectura y directamente antes del batch. Una identidad externa no se vuelve atómica con D1 por ese callback; el SQL sigue comprobando su propia autorización y reloj al ejecutar cada sentencia.

UPDATE usa CAS de revisión. INSERT condiciona el evento a changes()>0. Si la elegibilidad desaparece entre ambas sentencias, el caso negativo evalúa json('!'), produciendo un error SQL que revierte la transacción. El fallo no depende del comportamiento de un id NULL o de una política ON CONFLICT. El esquema de evento debe tener id TEXT NOT NULL PRIMARY KEY sin default. Ante ACK perdido no se reenvía automáticamente: se conserva el mismo intento; una consulta posterior puede reconocer exactamente su fingerprint/revisión, sin otro cambio ni evento. Un intento distinto o una revisión posterior produce conflicto, nunca sobrescritura.

La consulta revisada de elegibilidad usa cláusulas AND delimitadas por líneas. Al anidarla en las escrituras se balancea el árbol de conjunciones: conserva cada predicado y los ocho parámetros, y evita superar el límite de profundidad 100 observado en D1 nativo. La lectura de elegibilidad original no cambia. Un cambio futuro en ese formato debe revisar esta composición y repetir las pruebas nativas.

## Evidencia local y pendientes

Ocho pruebas SQLite y una nativa workerd/D1 pasan: default cerrado, guardado/evento, replay y conflicto, propietario/fuente/retirada/cierre/revisión, ACK perdido, error de inserción y rollback, expiración SQL entre sentencias, concurrencia, identidad perdida durante el último await y esquema INTEGER incompatible. El lector real de eventos consume el resultado guardado. La fixture nativa confirma también que el cambio de expiración causado por un trigger se revierte con el guardado fallido. Todo eso es local y sintético; no demuestra interfaz remota, evento recibido, revisión cloud o PC-off.

Siguiente bloque: pantalla HTTP propia cerrada por defecto, Access independiente, CSRF/formulario original y expiración, identificada como ensayo, ligada al contexto servidor y al mismo writer. Luego revisión/CI, entrega cerrada con rollback y visual QA, antes de una nueva ventana humana. Native consumer, callback y retiro requieren observaciones separadas; pause no acredita unsubscribe. No gastar ONE en un envío preliminar ni pedir apagar el ordenador antes de completar esa preparación.

Referencia de integración: [MCP Events oficial](https://developers.openai.com/plugins/build/mcp-events), consultado el 13/10/2026. La recepción 2xx es asíncrona; la respuesta útil del chat y el retiro original deben comprobarse aparte.
