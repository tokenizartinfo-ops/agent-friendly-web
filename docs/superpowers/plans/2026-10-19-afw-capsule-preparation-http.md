# AFW: límite HTTP y plazo original de preparación
19oct2026. Base a709b3cce530163dd335355c60bd469965151716, PR507 aceptada/main CI39336277660.

## Diseño acotado
Extender el flujo cerrado de PR504–507 con una frontera HTTP desacoplada; NO montarla en Worker/ruta/OAuth ni registrar scope.
createCapsulePreparationHttpBoundary({enabled,issuer,handle,now,monotonic}) devuelve null salvo enabled===true exacto. handle es función protegida de servidor; la frontera no verifica tokens ni crea identidad. Ruta fija POST issuer/mcp sin query, issuer HTTPS canónico, Origin opcional exacto. JSON UTF8 sin compresión, longitud declarada válida y lectura real por chunks <=4096 bytes antes de parsear; raíz objeto, no batches. Rechazo sin ejecutar handle.
Lease opaco request-local de5s se inicia antes de leer cuerpo, reloj wall y monotónico originales, abort/deadline/rollback/cierre terminales. Cancelar lectores sin esperar un cancel indefinido. Solo un handle; request reconstruida con bytes acotados/headers privados en memoria, sin logs. Respuesta JSON <=32768 bytes consumida en mismo plazo, no SSE; preservar status/headers de autenticación y forzar no-store. Antes de handle, errores400/403/404/405/408/413/415; después de invocarlo, fallo/timeout/salida inválida produce503/request_outcome_unknown, sin retry/reconnect ni causa interna. No afirmar cancelación de IO ya enviado.
Pasar lease solo por cierre de servidor, nunca JSON/header. WeakMap de módulo reconoce lease propio; funciones de control son privadas de servidor. Extender host505 y puente506 con requestLease opcional: no cambia callers existentes; clock reduce ventana con restante del lease, espera/dominio notAfter conservan ese restante. Cierre del boundary impide usar host capturado después. No es permiso ni sustituye guard/live owner/revision/token checks. Sin límite externo, host previo conserva5s propios.

## Alternativas y selección
Elegida frontera pequeña reutilizable + propagación al host, sin duplicar servidor OAuth. Meterla ya en Worker requeriría consentimiento/scope/schema/rollout que no existen; solo envolver un Promise.race permitiría persistencia con plazo reiniciado. No crear nuevo protocolo, callback o transporte MCP alternativo.

## Plan/ledger
Task1 pendiente: tests RED Request/ReadableStream reales y puente/SQLite con tiempo controlado, comportamiento sin montar runtime.
Task2 pendiente: frontera/lease y propagación mínima host/OAuth; GREEN npm test/lint/build en Actions.
Task3 pendiente: una revisión fresca completa, una pasada RED→GREEN para Important/Critical, CI exacta/merge/main y recibo issue497.

Pre-flight interfaces: frontera produce lease opaco consumido por puente/host; host debe limitar también notAfter, no solo await. La frontera llama a un protected handler futuro, NO aporta autoridad ni sustituye OAuth; composición HTTP/MCP real sigue gate.
Ruling: autorización vigente del owner para decidir/encadenar desarrollo de fuente sin preguntas rutinarias; continúa contrato aprobado de consumo y criterio pendiente PR507. Costo si mal delimitado: revisar interfaz antes de cualquier montaje.
Ruling: API GitHub/Actions y ledger de fuente sustituyen scripts/workspace locales por preferencia cloud-first; no clon/build/dependencias locales. Costo: latencia CI.
Rollback solo fuente por PR revisada, nunca datos/DDL/DROP.
G2 cerrado; no OTP/grants/scopes reales/Container/eventos/PCoff/Max/modelos/cargos/despliegues. operationalReadiness=false.

## Ejecución
Task1 complete: REDd9bda3a9e868564a7b24360d637e88337e3a7168 / CI39337581983/job118350823313:2240PASS/18FAIL esperados/1SKIP existente, solo funcionalidades ausentes. El primer RED7265d9b4 se refinó antes de implementación: columna expires_at real y cancelación bloqueada añadida.
Task2 in_progress: frontera/lease desacoplados, requestLease opcional en host y puente; ningún caller montado o DDL nuevo. GREEN pendiente.
