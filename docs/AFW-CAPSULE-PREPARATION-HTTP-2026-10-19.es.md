# AFW: frontera HTTP de preparación y plazo original
19oct2026. Proyecto AFW / tokenizartinfo-ops/agent-friendly-web.

## Alcance
Este incremento añade una frontera HTTP desacoplada y propaga su lease original al host505/puenteOAuth506. No la monta en ningún Worker, servidor MCP o ruta pública. El registrador MCP507 permanece separado; nombres y schemas no son consentimiento.
createCapsulePreparationHttpBoundary({enabled,issuer,handle,now,monotonic}) está ausente salvo enabled===true. handle debe ser una función protegida aportada por servidor. La frontera no autentica, no lee/decodifica bearer tokens ni amplía scopes. El futuro montaje deberá componerla con el SDK OAuth y MCP reales; un handler de prueba no demuestra esa integración.

## Entrada acotada
Origen HTTPS canónico, ruta fija POST /mcp sin query; Origin, si existe, debe ser exactamente el issuer. Solo JSON UTF8 sin compresión. Antes de parsear se comprueba la declaración de longitud y se leen chunks reales hasta un máximo de4096bytes; una longitud mentirosa no evita el límite. Rechazar UTF8/JSON inválido, raíz no objeto y batches. Los schemas MCP posteriores conservan su validación de argumentos.
Los headers de la petición quedan en memoria de esa petición para el servidor protegido; no se registran ni copian a DTO, Git o evidencia. El cuerpo se reconstruye con los bytes ya acotados, sin un segundo stream de entrada no limitado. No hay fetch saliente, URL aportada por tool ni nueva sesión.

## Un solo plazo
Lease opaco de5s creado al entrar en la frontera, antes de leer el cuerpo. Registra hora absoluta y reloj monotónico; usa el menor restante. Vencimiento, retroceso, señal abortada y cierre invalidan permanentemente esa ocurrencia.
El lease se reconoce por WeakMap de módulo, no por campos JSON ni headers. Su control es interno de servidor y no representa identidad, consentimiento o permiso. La frontera lo entrega solo al cierre handle(request,env,ctx,requestLease).
El handler futuro debe pasarlo a createDelegatedCapsulePreparationOAuthHost. El puente lo transmite al host, cuyo clock, espera y notAfter del dominio se reducen al restante original. Leer/autenticar durante4s deja como máximo1s para el trabajo posterior; construir otro host no concede5s nuevos. Sin requestLease, los callers anteriores conservan su presupuesto propio.
Cerrar la respuesta invalida ese lease y cualquier host que lo conserve. Cancelar la espera no cancela una consulta/commit ya enviado al proveedor; se conservan las cercas de admisión/commit, el historial y la conciliación del dominio. No afirmar que un timeout deshace una escritura.

## Salida y fallos
Antes de invocar handle: rechazo400/403/404/405/408/413/415 según formato/ruta/método/tiempo/tamaño. No se llega a autenticación o persistencia.
Solo una invocación del servidor protegido. Su respuesta JSON debe terminar dentro del mismo plazo y hasta32768bytes; no se ofrece SSE ni reanudación/sesión desde esta frontera. Se preservan status/headers de protocolo válidos y se aplica Cache-Control:no-store.
Si falla/vence después de invocar handle, no se puede inferir que no hubo escritura:503/request_outcome_unknown, recuperación por solicitud original, automaticRetry=false/automaticReconnect=false y tres flagsfalse. Nada de errores arbitrarios, referencias privadas o nueva clave. Este error de transporte no es el DTO de éxito de una herramienta ni una confirmación de borrador.
Lectores se cancelan sin esperar indefinidamente el Promise de cancel. El lease detiene la espera aunque la fuente o la cancelación estén bloqueadas; una operación ya iniciada requiere su cierre/conciliación propios.

## Aceptación y límites
Pruebas Request/ReadableStream reales de Node y servicio SQLite real con contexto OAuth sintético; prueban la frontera y propagación, no un token verificado por proveedor ni tráfico MCP remoto. Tests y revisiones exactos se registran en PR portadora/issue497. No hay dependencia o workflow nuevo, build/clone local o cambio de DDL.
El siguiente gate es componer el transporte MCP/SDK OAuth real en ensayo nativo cerrado con cuerpo/plazo originales y respuestas de protocolo. Después siguen consentimiento/scope específico, instalación/reversión del esquema y rollout propio autorizado. No saltar esos gates por tener esta biblioteca.
Rollback: revertir solo commits de fuente mediante revisión, preservando historial y cambios posteriores. G2 aceptado/cerrado no se repite. Container02382110, avisos/turno útil/baja nativa, PC-off y Max permanecen separados. operationalReadiness=false.

## Referencias
[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) y [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream): body stream y consumo/cancelación. Los límites4096/32768bytes y5s son política de este bloque AFW, no un requisito del estándar.
Plan/ledger: docs/superpowers/plans/2026-10-19-afw-capsule-preparation-http.md; recibo final portador sustituye sus estados pendientes con evidencia exacta.
