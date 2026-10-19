# AFW: aceptación nativa de preparación sobre HTTP
19oct2026. Base6e770f8cfecdf6b04f2a1d4eb19144400ee0fe1a/PR508/CI39338937524 aceptados en fuente.

## Objetivo acotado
Componer los componentes existentes PR504–508 en un Worker efímero Miniflare/workerd con D1 real del runner. OAuthResourceServer1.2.1 crea ctx.auth desde validador SINTÉTICO, el cierre de servidor pasa requestLease al puente/host; agents0.22/createMcpHandler y MCP2.0 registran las2tools; clientes StreamableHTTP reales negocian legacy y pin2026-07-28. Fetch del cliente se dirige solo a dispatchFetch example.invalid, sin socket externo.
No nuevo módulo/caller de producción ni entrypoint, scope/consentimiento, configuración, DDL/migración remota, credencial o API/modelo real. Activar flags solo dentro de fixture no es aceptación de autorización/despliegue.

## Casos y evidencia
Cuerpo excesivo/malformado/origen/método antes de autenticación; token sintético vencido/audience ajeno/no válido; schemas/revisión; read-only no escribe; autenticación consume plazo original; una preparación; conciliación legacy↔modern; ACK de HTTP perdido después del commit sin retry, lectura manual recupera;4s simulados reducen expires_at-reserved_at<=1000ms; retirada D1 deniega siguientelectura sin borrar historia.
Tiempos inyectados son offsets monotónicos request-local SOLO fixture. No acreditan latencia ni un vencimiento de consentimiento humano real. Contadores/headers x-ci son instrumentación de prueba, jamás API del producto.

## Ledger
Task1 in_progress: agregar ensayo de integración existente con SDK/Request/D1 reales en Actions y observar resultado. No nueva funcionalidad de producto; puede pasar inicialmente. Si revela bug, fijar reproducción RED antes de cambio de producto.
Task2 pendiente: diagnosticar/reparar únicamente incompatibilidades demostradas, documentar límites y verificar npm test/lint/build exactos.
Task3 pendiente: una revisión fresca de rama completa; Important/Critical una pasada RED→GREEN, sin re-review; merge/CI main y recibo issue497.

Ruling: prueba de composición del bloque ya implementado, sin nueva ruta/scope. Autoridad sigue sintética, no se sustituye por metadatos ni un HTTP200. Costo: ensayo real de consentimiento/montaje sigue pendiente.
Ruling: owner autoriza encadenar fuente y decidir pasos acotados; ejecución GitHub/Actions en lugar de workspace/script local. Costo: latencia de CI; no clon/build/descarga local.
Rollback solo fuente por PR, sin DROP/historia ni acciones remotas.
G2 aceptado/cerrado no repetir OTP/cliente/grants. Container02382110, avisos/revisiónútil/bajanativa/PCoff/Max separados. operationalReadiness=false.

## Diagnóstico primario
Task1 first run779030fb CI39340606251/job118360901005:2264PASS/11FAIL/1SKIP; candidata10a687c4/CI39340791006/job118361537041 reprodujo mismo estado. Dos primeras entradas rechazadas correctamente, sin DB/auth; fallos posteriores mayormente cascada al no conectar.
Causa1 fixture: dispatchFetch expone Host127.0.0.1 de proxy local; agents rechaza403 InvalidHost. Normalizar SOLO fixture Host desde URL efectiva; no añadirloopback al allowlist ni cambiar validación del producto.
Causa2 producto: el SDK OAuth1.2.1 crea challenge401 con body null; frontera exige JSON/cuerpo en401 y lo convierte503. Fuente primaria exacta src/oauth-resource-server.ts v1.2.1/createBearerChallenge, más fallo nativo503vs401. Añadir unitRED:401vacío con Bearer challenge debe conservarse; vacío200/401sinchallenge/Basic no se aceptan. No cambiar5000ms/caps/permisos.
Task2 in_progress: fijarRED acotado y ejecutar diagnóstico nativo con Host de fixture correcto antes de modificar producto.
