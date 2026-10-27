# Publicación nativa cerrada de AFW · 27 de octubre de 2026

## Alcance y estado aceptado

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, cuenta Cloudflare `85d0d5dadac3341a564f22ce885e9eec`, Worker `agent-friendly-web-delegated-canary`. Se publicó código propio cerrado mediante una instancia administrativa real de Cloudflare. Este bloque no utilizó datos de clientes, OAuth, avisos, cron, consumidores ni arranque de Containers. La portada pública `73a52556` no fue modificada.

## Procedencia y presupuesto

Fuente del Worker: `cf38b370ff8de887c5385095385d70aaeac4780e`; árbol: `90fd0bf9db385acafacb1b7b39a10eb45a948d7a`; programa: `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6`. Módulo: `b2c7af9daff05745d27659624a09b9271eb33d3c318ef409dd2560e829bc64a1`, 1.795.806 bytes. Clave del artefacto: `30b0b3dc1e355715fba4b398baa954ac83fe78e38d043c7991be1e3486852587`.

Builds de GitHub: run `40532022210`, artefacto Worker `12747137047` (ZIP de 347.562 bytes, SHA256 `52381bafb564a3ad8ecaf0f0606ca2ee603bfe2f657dabc8506bfbb1164ae832`); run `40532021749`, artefacto del operador `12746447625` (ZIP de 369.934 bytes, SHA256 `94477d8bd72e508efa7e442f984bd6e6a11390af0700b877419ac9b956f88471`). Se cotejaron bytes, fuente, árbol y planHash mediante un puente Node/GitHub en RAM, sin nuevos archivos, builds o dependencias locales.

Módulo del operador: `2e65db48e5da3235e05f533438c6baf7c147d026a46036304de1e196e5a324c5`, 1.951.432 bytes. Plan: `2b395516928e1aba716af5301f43385230399bb9280644cea168aa9549f4de33`. Ventana original: 27 de octubre, 15:37–15:47 UTC (12:37–12:47 Argentina), consumida, sin extensión, reinicio ni reintento. Instancia: `afw-release-2b395516928e1aba716af5301f43385230399bb9280644cea168aa9549f4de33`; Workflow `a989efd5-5204-496b-ae69-dd1439d08f47`, un paso.

## Ejecución y constancia primaria

El preflight comprobó rollback del operador `2033948b/DEPa216`, canary `FFD/DEP921`, namespace, DB, KV, configuración, módulos, ausencia del tag nuevo y presupuesto de cero intentos y cero recibos para la clave nueva. Se instaló temporalmente `13f9665a-fee8-4d22-a654-47eb5dc14bb4` / deployment `d7f3daa3-8d2d-4650-b62b-56d3b448f0c8`, con dos flags del publicador habilitados y sin HTTP público nuevo.

Se inició una sola instancia a las 15:38:02 UTC. La ejecución real de 15:38:04.207–15:38:07.286 UTC devolvió `confirmed`, `mayRetry=false` y la versión `a75a6e3e-8945-42cf-977e-8a0d7ef0843b`. Un SELECT independiente a las 15:38:49 confirmó un intento y un recibo. No se fabricó la constancia ni se reutilizaron los planes 107560aa, C01 o 133d.

## Cierre y promoción de la misma versión

El publicador se restauró a `2033948b-087c-4cb0-bb73-554e2966e7a6` / deployment `f5353ed6-66b7-4554-bfcf-700a8abbc8a7`. El Workflow quedó cerrado en `ccfbf023-f0a8-4153-823a-d5672c9c7d1b` a las 15:39:34.573 UTC, sin instancia administrativa activa. Se verificaron módulo y configuración de la versión ya publicada, y el JOIN de un intento y un recibo con procedencia exacta; pasaron 21 fixtures del helper de promoción.

Una promoción de esa misma versión, sin volver a cargarla, se aceptó a las 15:42:40.871 UTC: deployment `8c88a975-87fa-4c2f-b79d-4de457acad2a` al 100 %. Configuración `bf1d2527f6ddc9b4d8f613c1b62b6474f82acb8f0fcefc81d500831e2509aa12`: 29 bindings, ocho flags false, cero cron, tails, instancias activas del Workflow y Containers propios en esa lectura.

El rollback `ffd91801-f7f2-468f-9cad-2f3fb448f783` era recuperable y fue comprobado por bytes antes de promover. Se preservaron namespace, almacenamiento, secretos e historial. El helper no ofrece CAS ni cancelación física: la aceptación es una observación fechada, no vigencia futura ni prueba de cancelación de operaciones en vuelo.

## Pin y siguiente comprobación

`scripts/mcp-confirmation-frozen-artifact.json` pasa a la versión `a75a6e3e-8945-42cf-977e-8a0d7ef0843b` y fuente `cf38b370ff8de887c5385095385d70aaeac4780e` realmente publicadas. El futuro operador del paquete tendrá su propia revisión. El merge de este pin no es la fuente del artefacto congelado. El workflow existente debe reconstruir CF38 con su lockfile, cotejar hash, bytes y árbol, y pasar la cualificación nativa. El fixture `start=0/expires=1` sigue inerte: nunca invocarlo.

El publicador utilizó su custodia existente con resultado confirmado. Esto no prueba todavía la custodia de los lectores ni una reserva o suscripción reales. Sigue: cualificar el paquete nominal exacto; preparar los nuevos permisos propios cuando corresponda; comprobar confirmación nombrada, reserva única, avisos, suscripción, entrega, revisión útil, retirada y parada física. Luego corresponde implementar una ocurrencia PC-off independiente (PR571 sigue draft), realizar la prueba coordinada con PC apagada y revisar el preview y consentimiento para Max. No repetir lectura y retirada ya aceptadas como hitos nuevos.

## Proveedor y soporte

Run `40531216369`, 15:27:58.787 UTC: el observador manual público devolvió `resolved` para el perfil `prebuilt-closed-publication`, dos GET con HTTP 200 y `nonBlockingIncidents=[]`. Permitió preparar esta verificación cerrada; no acredita reparación universal de Containers ni determina impacto o causa en AFW. No se creó automatización ni guardia; el monitor local permanece PAUSED.

Correo de 27 de octubre, 12:50 UTC, referencia `1a17d691e8b19705`: cierre administrativo de Access 02389649, no éxito de OTP de principio a fin ni resolución de Container. Los seguimientos del 26 de octubre `1a17883aebb55f0c` y `1a17841d59867b11` ya recibieron la aclaración propia `1a1794af45db8107`, 17:38 UTC; no se duplicó. La búsqueda acotada no mostró respuesta técnica nueva de Container 02382110 ni OpenAI 18196140. Este bloque no pidió OTP, rotó claves ni envió correo.

`operationalReadiness=false`; PC-off no acreditado; Max no enviado. [Admisión y evidencia del bloque](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6446294024).
