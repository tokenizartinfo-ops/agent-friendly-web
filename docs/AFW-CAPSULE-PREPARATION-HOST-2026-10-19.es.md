# AFW: host cerrado de preparación y comprobación del esquema
19 de octubre de 2026. AFW / tokenizartinfo-ops/agent-friendly-web.

Este incremento prepara el host interno para el [servicio de cápsulas](AFW-AGENT-CAPSULE-PREPARATION-SERVICE-2026-10-19.es.md). Sigue SIN montaje HTTP/MCP, registro de scope, consentimiento operativo, migración remota o activación.

## Host y autoridad
createDelegatedCapsulePreparationHost devuelve null por defecto. Requiere AFW_DELEGATED_PREPARATION_ENABLED exactamente 'true', OAuth habilitado, modo window, proyecto/cliente fijos, ventana futura canónica de hasta diez minutos, recurso HTTPS fijo y bindings del host. Los pines de configuración, métodos de DB/limitador y relojes se comprueban durante awaits. Una invalidación observada de esos pines, un retroceso de reloj o el vencimiento del host cierran permanentemente esa instancia: restaurar valores no la revive. Una factory nueva valida de nuevo el estado y no renueva historia pendiente.

El resolver pertenece al servidor y debe entregar contexto ya verificado y tokenExpiresAt numérico procedente de validación REAL del token. No se infiere del grant ni se supone un campo del SDK; el futuro montaje tendrá que extraerlo por la API verificada del proveedor. La biblioteca no verifica firmas, bearer, cookies o consentimiento por sí sola. Inputs del agente no pueden seleccionar sujeto, recurso, dominio, presupuesto o vencimiento.

Se exige el scope específico futuro afw:capsule:prepare en el token además del grant y dueño actuales comprobados por el dominio en primaria. La lectura existente no habilita preparación. El OAuth Worker y sus scopes/consentimientos siguen sin importar este host; una factory en fuente no constituye permiso.

## Un solo presupuesto
Cada llamada conserva un plazo original de hasta cinco segundos: resolver, limitador, comprobación de esquema y dominio. Se acota también por token y ventana del host. Sus vencimientos absolutos se ligan al par de relojes capturado al construir el host; llamadas posteriores no reinician esas duraciones si el reloj de pared se estanca. Se propaga el mínimo restante de llamada, token y host a la reserva SQL, conservando timestamps de pared reales. Un token vencido deniega esa llamada, sin invalidar un host que todavía es válido. El dominio recibe un notAfter absoluto de confianza reducido por el tiempo monotónico restante; ese campo NO es argumento de herramienta y no inicia cinco segundos nuevos después del preflight.

El limitador utiliza una clave opaca estable por identidad/cliente/proyecto/recurso para ambos métodos. Solo success===true permite continuar. Datos de identidad, tokens, errores internos o esquema SQL no se copian a la respuesta.

Ante cierre/timeout/drift después de invocar prepare se devuelve unknown_ack, sin referencia ni reintento automático. El intento puede haber quedado aceptado y debe conciliarse por lectura con permiso vigente. reconcile no escribe ni renueva la reserva.

El futuro transporte debe construir el host dentro del contexto de una petición válida, nunca usar una lectura de tiempo del arranque del módulo para generar permisos. En Workers los temporizadores avanzan con I/O: estas comprobaciones y Promise.race no son una garantía independiente de tiempo de CPU o de entrega. El timeout no cancela SQL ya enviado; por eso un resultado incierto requiere conciliación.

## Comprobación de esquema
agent-capsule-preparation-schema.mjs contiene el DDL canónico de fuente y una proyección que debe coincidir con db/agent-capsule-preparations.sql. No ejecuta ese DDL ni lo añade a drizzle.

La comprobación lee únicamente metadatos de sqlite_master del historial propio y compila SELECT LIMIT0 sobre columnas/join reales del dominio. Exige tabla y restricciones exactas, triggers de inmutabilidad/no borrado íntegros, y rechaza triggers adicionales o campos ausentes. Solo normaliza el prefijo CREATE IF NOT EXISTS y el delimitador final; no borra condiciones o cuerpos arbitrarios. Cada consulta usa una sesión first-primary nueva.

El resultado se comprueba por llamada, no se cachea como certificado permanente. Es evidencia puntual de estructura bajo DB confiable, no una defensa frente al administrador de la base ni prueba de identidad, contenido correcto o servicio operativo. Cambios posteriores requieren otra comprobación y la futura migración tendrá aislamiento/recuperación propios. Errores se convierten en no listo sin exponer SQL o datos.

## Estado y siguiente gate
La factory reutiliza prepare/reconcile del servicio existente; no modifica la ruta humana. Historia pendiente, carrera de versiones y revisión/retirada siguen sus reglas anteriores. No se instalan tablas, renuevan permisos o tokens, ejecutan modelos, cobran trabajos, publican archivos o acceden al hosting.

Queda diseñar y aceptar el montaje de transporte y consentimiento real: validación del token por proveedor, tamaño antes de parsing, registro de scope/herramienta, schema/migración/rollback verificados y rollout cerrado propio. El incidente de Containers y la cadena nativa de avisos/revisión/baja/PC-off mantienen gates independientes. operationalReadiness=false.

Pruebas/commits/revisión/CI: [plan y ledger](superpowers/plans/2026-10-19-afw-capsule-preparation-host.md), PR portadora e issue497. D1 nativo en Miniflare y contexto/limitador sintéticos en Actions no equivalen a D1 remoto, permiso real, scheduler o guardia.


## Entrada verificada prevista para el transporte
La dependencia fijada en package.json es @cloudflare/workers-oauth-provider 1.2.1. Sus [tipos y handler de recurso versionados](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-resource-server.ts) sí exponen ctx.auth.expiresAt opcional en segundos Unix, después de validateToken. No se usa ni convierte aquí: el host exige tokenExpiresAt en milisegundos desde su resolver de servidor.

El siguiente adaptador deberá aceptar solamente ese contexto del handler verificado, comprobar campos obligatorios, convertir unidades sin overflow ni redondear al alza, y denegar si falta vencimiento. Nunca copiar ctx.auth.token, decodificar un JWT sin verificar o permitir que el argumento de herramienta sustituya el contexto. Pruebas pendientes: expiración ausente/malformada, límite de unidades, identidad/cliente/audiencia discordantes y cambios a través de awaits. Esta constatación documental elimina una duda de integración; no registra scope, consentimiento o transporte.

## Referencias
[Cloudflare D1: batch y Sessions](https://developers.cloudflare.com/d1/worker-api/d1-database/) y [SQLite: tabla de esquema](https://www.sqlite.org/schematab.html) y [Workers: relojes y temporizadores](https://developers.cloudflare.com/workers/runtime-apis/performance/), consultados el 19 de octubre de 2026. La política de normalización se verifica además contra SQLite y D1 nativo del runner.
