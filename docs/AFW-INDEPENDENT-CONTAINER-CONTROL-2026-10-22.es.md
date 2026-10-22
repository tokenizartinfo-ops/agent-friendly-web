# Control independiente de Container AFW — 22oct2026

Estado inicial: diagnóstico experimental, no ejecutado ni abierto. [PR566](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/566); especificación y plan en superpowers/{specs,plans}/2026-10-22-afw-independent-container-control.md.

Busca distinguir una asociación nueva creada por Wrangler del fallo histórico native_container_absent. Worker/workflow nuevos afw-container-control-20261022, clase AfwContainerControl, namespace/aplicación propios, sin datos o secretos del runtime original. La primera condición conserva fecha2026-09-07; solo si falta el contexto nativo, después de cierre se permite comparar2026-09-29 en el mismo control y presupuesto original. Un positivo no identifica por sí solo la causa original: también cambian Worker y namespace, además del procedimiento de asociación. No se ejecuta aquí la sugerencia exacta de una clase nueva dentro del Worker original.

Red observado en GitHub run39776162534/job119815531965, head48e26445:0PASS/1FAIL/7SKIP por helper ausente explícito. Green, revisión, publicación y ejecución se registrarán con sus fechas reales, sin anticiparlos.

Prueba técnica: API administrativa Workflow → único caso admitido en SQLite → ctx.container → un start máximo por condición → GET virtual de readiness → POST/ACK fijo → destroy y lectura nativa → comprobación independiente de instancias → configuración cerrada. Sin rutas públicas, Internet saliente, Docker, modelo, clientes, OAuth, correo, cron ni guardia. El cuerpo/identificador del control es sintético, no una credencial o firma. Puerto listo/ACK no equivalen a suscripción ni revisión útil de un asistente.

Por defecto flagfalse/ventana0→1. La ventana futura original se elige después de revisión/publicación cerrada, dura como máximo20min y queda inmutable en el nuevo journal. El segundo caso solo procede si el primero registró ausencia nativa, nunca para forzar un positivo después de otro error. Plazo de observación60s, Node se termina solo15s después de arrancar y cierre nativo independiente. Timeout/cancelación/solicitud de destroy no acreditan por sí solos parada física; verificarla por API.

Excepción local mínima ya explicada al owner: Wrangler4.149 cacheado con OAuth existente para realizar el procedimiento auténtico, sin descargar/instalar/compilar/Docker ni copiar credenciales. Fuente/pruebas en GitHub; ejecución/recibos en Cloudflare. Copias locales propias pequeñas se retirarán solo después de preservar fuente/evidencia y recuperar baseline; no borrar caches o recursos compartidos.

Original verificado22oct12:06–12:10UTC: delegatedcanary79593972/deployment799ff2e0 al100%, ocho flagsfalse y namespace d6fc71552de7494a863aca20365a572d conservado; exports/container/binding y compatibility2026-09-07 comprobados. El control no lo modifica. Antes de cada mutación se verificarán los recursos y la recuperación propios; al final comparar el original nuevamente.

Próximo circuito completo AFW: solo tras evidencia nueva pertinente, con elegibilidad/identidad/consentimiento/ventana/callback/revisión/retirada actuales. El diagnóstico presente no acredita reparación de Container, solución OTP, operación con PC apagado, disponibilidad comercial o incorporación de Max.
