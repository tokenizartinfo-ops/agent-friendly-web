# AFW: contexto OAuth para preparación de cápsulas
19oct2026. Proyecto AFW / tokenizartinfo-ops/agent-friendly-web.
## Resultado y frontera de confianza
lib/delegated-capsule-preparation-oauth.mjs adapta el contexto del handler protegido de @cloudflare/workers-oauth-provider1.2.1 al host interno de PR505. Sigue desacoplado: ningún entrypoint lo importa, no hay montaje HTTP/MCP ni cambio en scopes, consentimiento, schema o runtime.

El integrador futuro debe construirlo por petición, únicamente dentro del handler que ya validó el token, con getVerifiedContext:()=>({auth:ctx.auth,props:ctx.props}). Esta función es una dependencia de servidor. Un objeto con esos campos no acredita identidad: el módulo NO verifica firmas, valida bearer ni autentica una petición. No debe exponerse un argumento de herramienta, cabecera arbitraria o JWT decodificado como sustituto.

Del proveedor usa userId/clientId/audience/scope/expiresAt; de las props privadas, applicationGrantId/userId/projectId. Exige igualdad del sujeto y valida las referencias. Solo lee propiedades propias de datos: no invoca getters de autoridad ni acepta campos heredados. El campo token no se lee, copia, persiste, registra ni devuelve. Se retienen referencias auth/props para detectar sustituciones, sin congelar ni modificar objetos del proveedor.

## Tiempo y continuidad
Los [tipos versionados del proveedor](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-resource-server.ts) declaran expiresAt opcional en segundos Unix. Para este puente es obligatorio: entero positivo y representable al convertir a milisegundos. No tomar un vencimiento de props, del cliente o del grant para suplir su ausencia; no redondear al alza ni refrescar permisos.

El host original verifica vigencia actual, ventana/proyecto/cliente/recurso, scope específico y grant/owner/dominio actuales en primaria. Mantiene su plazo original<=5s y el mínimo de tiempo restante de host/token/operación. La traducción no concede afw:capsule:prepare a una lectura.

Una proyección inicial y las referencias del proveedor se comparan antes/después de cada lectura de reloj y del resolver usado por el host. Si la autoridad cambia durante un await, la instancia queda cerrada por el latch del host; restaurarla no la revive. Se requiere otra petición verificada para crear un host nuevo, conservando las reglas de conciliación del historial. Una copia congelada por sí sola no ocultará cambios de la fuente del proveedor.

Después de una reserva incierta se conserva unknown_ack sin regenerar. reconcile sigue sin escribir. No hay ejecución en hosting, aprobación, publicación ni gasto por preparar un borrador.

## Comprobación de fuente
Pruebas de datos/tiempo/credencial y de composición con el servicio SQLite; SDK OAuthResourceServer real más D1 nativo en Miniflare sobre Actions. El validador de este último ensayo es SINTÉTICO: demuestra forma de contexto e integración del SDK, no criptografía de un token real, ingreso humano, consentimiento o hosting remoto. Las denegaciones de audience/expiry del SDK y la ausencia de expiración/sujeto discordante del puente se prueban antes de guardar; retirada del grant bloquea conciliación posterior.

Ledger: docs/superpowers/plans/2026-10-19-afw-capsule-preparation-oauth.md, PR portadora e issue497 guardan commits, RED/GREEN, revisión y CI/main efectivas. Solo GitHub/Actions; no procesos o dependencias locales.

## Gates separados
Aún faltan registro de transporte y límite de cuerpo antes de parsing, consentimiento específico con scope registrado, schema/migración/recuperación y rollout propio cerrado. Este módulo no modifica OAuth Worker, ruta humana, configuración, permisos/tokens o DDL remoto. Revertir fuente basta para retirar este bloque; nunca borrar historial.
G2 permanece aceptado y cerrado, sin repetir OTP/grants. Container02382110 y suscripción/aviso/turno útil/baja nativa/PC-off/Max siguen independientes. operationalReadiness=false.
