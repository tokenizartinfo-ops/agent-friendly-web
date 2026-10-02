# Revisión privada de correo

Bloque acotado: completar los controles existentes con `/message/<key>`, bajo el mismo operador autenticado. Un solo mensaje en pantalla, destinatario, asunto y texto; acciones aprobar, retirar permiso y consultar estado. No editor, listado de clientes, envío directo ni ingesta pública.

La página es un shell sin contenido de correo embebido. Consulta la custodia autenticada y coloca el resultado con textContent; CSP nonce, conexiones same-origin, no-store y sin referrer. La autorización sigue en servidor, ligada al hash y a la identidad firmada. Aprobar no prueba envío, y aceptación de proveedor no prueba recepción.

Ante lectura fallida o conflicto, deshabilita decisiones y propone consultar de nuevo; no repite mutaciones automáticamente. La lectura refrescada determina los controles visibles. La revocación no recupera mensajes enviados. La pantalla no asegura revocación inmediata de Access ni vigencia del permiso a partir del estado aprobado; el consumidor vuelve a comprobar vencimiento y revocación.

Pruebas: rechazo de clave inyectada, protección de página sin identidad, carga de texto hostil inerte y fallo de aprobación sin reintento automático. La simulación DOM no sustituye aceptación visual en navegador autenticado. Canary permanece cerrado con deny everyone y flags false; no se pide sesión real hasta preparar el caso sintético. Rollback: retirar ruta/página conservando decisiones y custodia.
