# Custodia cloud y prueba de conexión AFW

## Evidencia del 2 de octubre de 2026

El owner ingresó personalmente los dos valores en la custodia privada de AFW Operations. Guardar el modal no bastaba: después de Guardar borrador, ambos bindings informaron `has_saved_binding:true`. El entorno se publicó. No se copiaron valores a documentos, Git o logs.

Bindings `AFW_MAIL_ACCESS_CLIENT_ID` y `AFW_MAIL_ACCESS_CLIENT_SECRET`, limitados al host `mail-consumer-canary.agentfriendlyweb.dev`. La identidad dedicada tiene duración de 24 horas y vence el 3 de octubre a las 10:50 de Buenos Aires. No acredita una conexión permanente.

La nueva tarea cloud `01a0fcfb-b9b3-72ac-81fd-355f84b15016` verificó raíz y origin correctos y metadatos `ready`. Una aprobación acotada por comando permitió la conexión al proxy, preservando TLS y permisos globales.

| Prueba GET, sin redirects | HTTP | Content-Type |
| --- | --- | --- |
| Con bindings por proxy | 401 | text/html |
| Sin headers | 401 | text/html |

No se obtuvo la respuesta cerrada `404` con código `unavailable`: Access/proxy no quedó aceptado. No se determina aún si la causa reside en el valor guardado, la sustitución del proxy o la configuración de Access; no atribuir culpa ni pedir copiar secretos al chat.

La reproducción posterior, exclusivamente offline con dos valores ficticios y un receptor localhost, comprobó headers separados, valores exactos, LF reales y escape correcto de comillas/barras. Rechazó caracteres de control y detuvo el servidor. No usó bindings reales ni peticiones externas. Esto descarta concatenación/escape en esa reproducción, pero no acredita que el proxy haya sustituido los valores reales.

La identidad Cloudflare sigue habilitada y con vencimiento de 24 horas confirmado por API. La consulta acotada de logs Access no devolvió eventos para esta aplicación; ausencia de logs no prueba ausencia de petición. La tarea confirma bindings `ready` y destino exacto, aunque sus metadatos no exponen un campo explícito `network_secret`.

Fuentes oficiales: [custodia y sustitución por proxy](https://learn.chatgpt.com/docs/environments/cloud-environments), [credenciales de servicio y rotación](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/). No convertir credenciales a variables directas para resolver el fallo. Un valor listo no demuestra validez ante el proveedor.

## Cierre seguro y siguiente bloque

Se restauró y verificó la política del consumidor a `deny` para `everyone`. Cloudflare exigió previamente desactivar `service_auth_401_redirect` para admitir esa transición. El operador sigue cerrado, las funciones del Worker deshabilitadas y no hay EMAIL ni envío.

Siguiente: diagnosticar la sustitución/forma de headers sin revelar valores; preparar una nueva prueba acotada antes de reabrir exclusivamente la identidad dedicada. Conservar datos D1 y el runtime de producción. No repetir aprobación humana del mensaje sintético cancelado. Envío propio idempotente y disparador con PC apagada siguen pendientes.

Si hay que corregir la custodia, el owner completa el formulario privado; no pedir valores por chat ni leerlos. Mantener host, identidad y vencimiento originales. Rotar secreto no equivale a renovar duración; no usar Refresh, que extiende la vigencia. Para nueva prueba, verificar política exacta y flag cerrado antes de dos GET sin redirects, y restaurar deny ante fallo. Cerrar solo con autenticado 404 JSON unavailable y control rechazado; todavía no certifica envío ni verificador JWT del consumidor.
