# AFW: publicación cloud y checkout reconciliados

## Alcance y resultado

Proyecto AFW; repositorio `tokenizartinfo-ops/agent-friendly-web`; entorno publicado AFW Operations. No se modificaron Workers, Access, secretos, datos de clientes ni programaciones en este bloque.

La interfaz confirmó «Entorno publicado» para la referencia `dec8a60179321bf77d028fc30db3adfd8d59742c` (PR #231). La metadata observada identificó la versión `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgver_6ac2c8a0b3bc81a3a46a96f7bf01b914`, fases running/running y conectividad connected. El borrador revision 2 conservaba su base anterior; esto no autoriza republicarlo ni demuestra un error del runtime.

## Evidencia directa y recuperación

Chat de configuración `01a108ba-535e-707a-af37-744a10b0a00c`, host durable. El turno `01a108e1-420c-72e0-ba83-e5f178f56f3c` quedó atascado redactando y fue interrumpido mediante «Detener». El siguiente turno `01a108e9-d46c-77e2-a699-1db09af1ce19` concluyó, pero su respuesta final contenía un SHA malformado. No se usa esa respuesta como evidencia: stdout de Git confirmó HEAD `491118a29249982b97765f1401a2db5673c7d115` y ausencia del recibo de aceptación más reciente.

En el turno `01a108eb-0adf-779f-9f9f-603163de083c`, finalizado el 2026-10-04 a las 21:57 UTC, se verificaron origin canónico y working tree limpio antes de realizar fetch y switch --detach no destructivo. La salida directa confirmó:

- origin/main y HEAD: `dec8a60179321bf77d028fc30db3adfd8d59742c`.
- Working tree limpio después de actualizar.
- `docs/AFW-AUTHENTICATED-EXPIRY-ACCEPTANCE-2026-10-04.es.md` presente.

Rollback del checkout: solo con working tree limpio, `git switch --detach 491118a29249982b97765f1401a2db5673c7d115`. No reset/clean. El cambio de checkout no modifica la referencia del entorno publicado ni promueve código a producción.

## Próximo cierre operativo

Este chat sigue siendo un chat de configuración, no una tarea operativa programada. Las herramientas de setup no exponen creación de tareas ni schedules; la interfaz observada del programador no expone selección del entorno AFW Operations. No repetir un dispatch genérico sin ese vínculo ni usar temporizadores locales o API de pago como sustituto.

Antes de abrir una nueva ventana de servicio o pedir apagar el PC se requiere:

1. Crear una tarea desde el entorno publicado y comprobar su identidad, origin, revisión y disponibilidad del recibo.
2. Vincular un disparador alojado en la nube, registrar ID, cadencia, zona horaria y vínculo al entorno; demostrar una ejecución con requestId/runId correlacionados e independiente de procesos locales.
3. Solo entonces organizar la prueba con PC apagado y correlacionar evidencia del disparador, tarea y ledger. Un aviso móvil o una ejecución manual no sustituye esas tres evidencias.

Los ensayos de transporte y vencimiento ya aceptados no deben repetirse. Consultar el recibo de PR #231 para los cierres remotos y las limitaciones. El gerente autónomo y la prueba sin PC permanecen pendientes.
