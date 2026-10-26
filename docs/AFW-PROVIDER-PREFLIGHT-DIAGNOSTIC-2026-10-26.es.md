# Diagnóstico del control previo del publicador · 26 octubre 2026

## Problema y evidencia
El ensayo nativo 15:15UTC terminó blocked/mayRetry=false antes del journal: cero intentos/cero recibos. No identifica fallo de clave ni Containers. Se cerró a15:18UTC, operador2033948b/Workflow8acb/canary002aa960. Plan a5ea5b8d consumido: no reiniciar. La API oficial todavía incluye cbvocc87nsne resuelto; la hipótesis de historial ausente NO quedó confirmada. Consulta Node local única agotó5s, y el ejecutor cloud no permite el host; no confundir estas observaciones con la petición del Workflow.

## Alcance autorizado y diseño
Conservar destinos oficiales, un GET, límite262144bytes,5s total, cero redirecciones/reintentos y decisión fail-closed. Añadir únicamente razones enumeradas, HTTP numérico y bytes efectivamente recibidos al resultado saneado; nunca cabeceras, URL de respuesta, cuerpo, errores o mensajes arbitrarios. El Workflow proyecta ese diagnóstico SOLO cuando el proveedor bloquea la admisión. Reloj/admisión anterior no se reinterpretan como fallo de proveedor.
Añadir ejecución manual en GitHub para este GET público, sin secretos/dependencias/npm/recursosAFW. Su recibo saneado no acredita el entorno Cloudflare, publicación, consentimiento ni PC-off.

## Plan y cierre
1. Pruebas de regresión y CI RED: HTTP302, MIME, exceso bytes, timeout, snapshot inválido y salida nativa sin journal.
2. Implementación mínima y CI GREEN; verificar credenciales/textos maliciosos no aparecen y presupuestos originales no se amplían.
3. Una revisión independiente del diff, reparar hallazgos importantes y CI de main antes de usar artefacto.
4. Ejecutar diagnóstico público una vez. Si se necesita ensayo nativo posterior, nueva ventana/plan explícitos y cierre independiente; no reusar el consumido ni fabricar recibos.
Rollback fuente: revertir esta PR; runtime anterior se conserva cerrado. No modifica flags, permisos, datos, precio, clientes, cron, suscripciones ni despliegues. operationalReadiness=false.
