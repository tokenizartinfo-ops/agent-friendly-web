# Recuperación de un guardado sin confirmación

## Publicación aceptada del 18 de octubre

La corrección está publicada en https://agentfriendlyweb.dev. La API primaria confirmó el 18 de octubre a las 22:27:24 UTC la versión `d94a1a33-4823-4ff6-bfde-fcf5b3f2eed5` al 100%, deployment `8b5168d4-6f29-4884-8cc2-d7b5e5946675`. Fuente pública exacta: `ae18a7823de868459af3fe9f7b81bb45cf1c093e`; no todo el main integral.

| Comprobación | Resultado |
| --- | --- |
| Fuente revisada | `98e93301c8596220816f3c6ad69a68350842ca7c`, [PR 483](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/483), merge main `068e18b6fe01d17f89cdc9b9071de42e37b17afc` |
| CI integral | 39171729532 / job 117806023840: 2.026 PASS, cero fallos, una omitida; lint y build aprobados |
| Backport mínimo | [PR 484](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/484), merge público `a0d6214ca0edf07f6bb59daae564e688b955f1c7`; cuatro blobs iguales a la fuente revisada |
| CI público | 39171834808 / job 117806338796: 1.148 PASS, cero fallos y cero omitidas; lint y build aprobados |
| Comprobación posterior de main | 39172088152 / job 117807101313: 2.026 PASS, cero fallos, una omitida; lint y build aprobados |
| Revisión independiente | Cero hallazgos; nueve pruebas dirigidas verificadas por el revisor |
| Versión previa | `eaf0c739-0114-4b18-bb5d-b77dde928e35`: 16 páginas y tres assets exactos aprobados antes del upload, 22:25:28 UTC |
| Candidata sin tráfico normal | Deployment `a8304501-84cf-4c4d-85e5-3aeb688c60f4`; 16 páginas, tres assets y smoke de Access aprobados con override, 22:26:29 UTC |
| Tráfico normal | 16 páginas, tres assets y smoke de Access aprobados, 22:26:59 UTC |

Se verificaron los 298 hashes del artefacto congelado y se preservaron los bindings, D1, AI, ASSETS, rate limiter 5/60, Access, runtime y observabilidad efectivos. El copilot conserva únicamente su pin propio anterior; publicación remota y diagnósticos siguen deshabilitados. No hubo migración, nuevas credenciales, activación cloud ni escritura en un expediente real.

El asset publicado es `/_next/static/chunks/intake-workspace-DVeBZcho.js`, SHA-256 `6bacd01720f702c7fc27be08b86f70662fc471fb4170c331664abd2bfd83d9ee`. La comparación de configuración antes, en la candidata y después dio el mismo fingerprint saneado; sus valores privados no se copian al recibo. La versión previa permanece disponible para reversión; no se ejecutó un rollback.

Las comprobaciones de páginas/assets acreditan la entrega de la versión pública. El caso de bloqueo, el ACK tardío y la recuperación se verificaron con el callback real del componente en pruebas locales; no se declara un nuevo recorrido autenticado remoto ni una aceptación visual a partir de esos smokes. El intento de QA visual local no se aceptó por un fallo del navegador de herramientas, y no se interpreta como un fallo del runtime AFW.

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
