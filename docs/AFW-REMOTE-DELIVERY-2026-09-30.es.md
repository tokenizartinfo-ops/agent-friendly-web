# Entrega remota controlada de AFW

Fecha: 2026-09-30. Entorno: fixture remoto sintético temporal; no es un cliente ni un canary de la aplicación privada. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, origen temporal `https://delivery-qa.agentfriendlyweb.dev`, Worker `agent-friendly-web-delivery-qa`, cuenta `85d0d5dadac3341a564f22ce885e9eec`, zona `4b1a3fe4b6dcb81e9d6a633174c5939f`.

Se verificó que el hostname y el Worker no existían antes de crearlos. El Worker no tuvo D1, secretos, IA, sesiones ni APIs mutantes. Solo GET/HEAD, contenido sintético, `no-store`, `noindex, nofollow`, robots disallow y vencimiento de 24 h como defensa secundaria. No recibió tráfico del apex ni se modificó el Worker productivo.

## Evidencia observada

El constructor real generó una cápsula con objetivo de contenido y llms.txt, origen específico y manifiesto. El comparador real usó `fetchLimitedPublicUrl` productivo, sin transporte inyectado, sin cookies ni excepciones SSRF.

| Fase | Resultado externo | Versión Worker |
| --- | --- | --- |
| Antes de instalar | HTTP 404, recurso missing | `5a95683d-1e7a-4543-b564-5e37dfd8c92b` |
| Instalación | HTTP 200, unchanged y SHA-256 exacto | `6c407815-b3c8-4951-b5ca-87a8fe563252` |
| Cambio posterior | HTTP 200, changed y hash distinto | `c93384f0-58c8-44ad-b98b-78d5315726b8` |
| Restauración | HTTP 200, unchanged y hash exacto recuperado | rollback a `6c407815-b3c8-4951-b5ca-87a8fe563252` |

Rollback verificado: deployment `c9deac0e-94f7-4662-bcf7-08c6cabe10f3`. [Recibo saneado con fechas, hashes y manifiesto](evidence/afw-remote-delivery-2026-09-30.json). Los fuentes y paquetes sintéticos están localmente en `output/remote-delivery-qa/`, ignorados por Git; su hash figura en el recibo.

Se retiró primero el dominio Worker `beaab7bb4c86e41f58596c367d183404f3133e7f` y luego el Worker; ambas API confirmaron éxito. Se verificó que no quedan dominios Worker para ese hostname. El runtime productivo continúa en `a80261b2-29ba-4165-af54-3ceb3fe41df5`.

## Alcance del cierre

MA-06 tiene instalación remota controlada, comparación, detección de cambio y rollback acreditados. La sesión privada verificó por separado preparación/comparación de su cápsula v2; **no es la misma cápsula** que la fixture remota y no se aprobó ni publicó ese contenido QA sobre AFW. No afirmar recorrido integral de cliente: falta conectar un objetivo real y aprobación de la misma versión con una implementación y nueva observación dentro de su expediente.

Próximo: cierre de aislamiento/escritura/retirada de MA-07 y piloto por invitación con entrega asistida. No ampliar la bandera del copilot ni el acceso por estos resultados.
