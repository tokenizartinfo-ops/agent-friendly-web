# Comprobación de bytes de una versión publicada

`createPublicationArtifactReader` implementa el contrato `readVersion(input, signal)` del diario privado. Consulta GET `/workers/workers/{worker}/versions/{uuid}?include=modules`, exige un único módulo con nombre y tipo esperados, valida base64 canónico y compara SHA-256 de los bytes. Luego obtiene el etag desde GET `/workers/scripts/{worker}/versions/{uuid}`. Devuelve solamente ID y etag; no devuelve código ni credenciales.

El límite total es cinco segundos, con cancelación, respuesta JSON máxima de 4 MiB para módulos y 256 KiB para metadatos, sin redirecciones ni caché. El límite corresponde al bundle actual de 1,8 MB; un crecimiento que lo exceda debe revisarse expresamente. No hay POST, deploy, fallback a latest ni reconstrucción de recibos.

## Evidencia primaria de disponibilidad

El 2026-10-14T20:47:27.254Z la API nueva respondió para el Worker AFW delegated-canary y la versión existente `3a9d7a81-de23-4e8b-bf9d-843b02e47514`: un módulo `index.js`, 1.835.499 bytes, SHA-256 `2e81017ed5066e87fb274904893058f028e024e19b7b4a9e3ea56fe6fd088614`. La salida conservada contiene solo resumen/hash. Esto prueba lectura de esa versión histórica, no adopción del código nuevo ni ejecución del supervisor.

La documentación OpenAPI de GET declara `include=modules`; sin el parámetro, la respuesta omite los bytes. La ruta legacy `content/v2` no debe usarse inventando un selector de versión.

## Siguiente publicación

El descubrimiento corrige la estrategia pendiente de transporte: POST `/workers/workers/{worker}/versions?deploy=false` usa JSON y admite bindings `inherit` con `version_id` explícito. En cambio, POST `/workers/scripts/{worker}/versions` solo admite `latest`. Por ello se prefiere la API nueva para preservar secretos desde una versión fija sin extraerlos, después de completar pruebas del transporte y comprobar recursos/namespace/reversión. No se ha realizado POST ni se ha implementado aún ese transporte.

El adapter puede sustituir al readVersion sintético al componer el diario. Su prueba automatizada usa fetch simulado; el GET real anterior es evidencia separada y no demuestra que se haya montado la composición en el runtime.

Referencia: [API de versiones de Workers](https://developers.cloudflare.com/api/resources/workers/subresources/workers/subresources/versions/). Contrato de parámetros contrastado contra OpenAPI oficial en esta fecha.
