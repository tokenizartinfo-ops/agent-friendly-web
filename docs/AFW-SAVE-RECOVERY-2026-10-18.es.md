# Recuperación de un guardado sin confirmación

## Problema y alcance

El formulario privado esperaba la respuesta de su PUT a `/api/projects` y después su JSON sin un límite propio. Si la conexión o el cuerpo de respuesta quedaban pendientes, también seguían pendientes el lock del formulario y la opción de guardar antes de salir. Una regresión sobre el callback real de `IntakeWorkspace` reprodujo esa espera; no fue necesario usar una cuenta o un expediente real.

Este bloque corresponde al guardado de los campos del expediente, tanto automático como manual y desde «Guardar y salir». No modifica el guardado separado del relato inteligente, OAuth, permisos, bases de datos, auditorías, publicación, suscripciones ni Containers. No atribuye este fallo de cliente al incidente del proveedor.

## Comportamiento

`saveProjectDraft` programa un límite de espera de 15 segundos que incluye obtener las cabeceras y leer el cuerpo JSON. Al vencer, solicita cancelar la lectura y devuelve un resultado sin confirmación. El formulario libera el lock, conserva el borrador, pausa el guardado automático y muestra el aviso de confirmación pendiente. No marca el cambio como guardado, no navega ni reintenta automáticamente.

Un vencimiento no significa que el servidor haya deshecho o rechazado el cambio. Al pulsar guardar otra vez, si el contenido no cambió, se conservan el cuerpo exacto y la clave de idempotencia del intento anterior. El protocolo existente permite recuperar su recibo sin crear otra revisión. Si cambió el contenido o existe una revisión posterior, siguen vigentes la reconciliación y los conflictos originales.

Una respuesta tardía del intento vencido no cambia el estado actual de la interfaz. Un error de transporte se presenta como confirmación no recibida; una sesión vencida sigue requiriendo ingreso, y HTML, JSON inválido y errores de permisos mantienen sus comprobaciones. No se siguen redirecciones de autenticación del PUT.

El presupuesto es del cliente: depende de que el navegador pueda ejecutar sus tareas. No garantiza una notificación exacta a los 15 segundos si el proceso está suspendido, ni permite guardar tras apagar o cerrar por la fuerza. No se añaden copias de respuestas en localStorage, logs o telemetría.

## Verificación y límites

- Regresión RED del callback real antes del arreglo: una respuesta perdida mantenía pendiente el guardado y su lock.
- Callback real después del arreglo: libera estado ocupado y lock, mantiene borrador y aviso, y rechaza la actualización por un ACK tardío.
- Escritura aplicada con ACK perdido y reintento manual: mismo cuerpo y clave, una sola revisión y recibo recuperado.
- Cabeceras disponibles pero JSON bloqueado: el mismo presupuesto cubre el cuerpo, sin un segundo plazo.
- Sesión, HTML, permisos, errores de transporte, limpieza del temporizador y presupuestos inválidos comprobados por separado.

Las pruebas locales usan datos ficticios y un presupuesto corto para medir los casos de fallo sin esperar 15 segundos cada vez. Los controles de rutas, CAS e idempotencia existentes siguen formando parte de CI; una prueba de cliente no demuestra un nuevo ensayo autenticado remoto.

El recibo de integración y, si corresponde, de publicación se conserva en el checkpoint de este bloque dentro de `output`. La existencia de esta documentación no acredita un despliegue: verificar las referencias y el estado fechado antes de operar.

## Reversión

El cambio no introduce esquema, datos persistidos o permisos nuevos. La reversión de fuente consiste en restituir la llamada y lectura anteriores del formulario. Una reversión del Worker, si esta fuente se publica, requiere identificar su versión previa, conservar la configuración efectiva y comprobar la recuperación; no deshacer datos legítimos posteriores ni repetir solicitudes de escritura por rutina.
