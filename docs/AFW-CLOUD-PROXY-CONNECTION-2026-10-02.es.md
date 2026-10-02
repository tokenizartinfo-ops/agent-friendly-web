# Custodia cloud y prueba de conexión AFW

## Aceptación de Access/proxy tras corrección humana

El owner volvió a rotar el secreto del mismo token y pegó únicamente su valor completo en el formulario privado. ID previamente corregido conservado. Borrador `01a0fd37-257d-71f3-98ab-1f40c5a05000` guardado y publicado. Expiración confirmada por API: 2026-10-03T13:50:43Z (10:50 Buenos Aires), duración 24h, sin renovación.

Nueva tarea cloud `01a0fd44-ed76-701d-8891-e028a2ce9032`: primera lectura unknown detuvo peticiones. Segunda lectura explícita ready/enforced; turno `01a0fd46-1ace-7471-b956-eff01f1d8d26` ejecutó exactamente dos GET con aprobación acotada, TLS verificado, sin redirects ni retries. Autenticado: 404 application/json, code unavailable, curl returncode 0. Control sin credenciales: 403 text/html, returncode 0. Access/proxy aceptado. Valores no leídos ni registrados.

Consumidor restaurado y verificado deny everyone tras la prueba. Worker MAIL_SERVICE_ENABLED y MAIL_OPERATOR_ENABLED false; EMAIL ausente. Producción y datos intactos. Esto acredita credenciales y proxy; no acredita verificador JWT activo del Worker, envío, cliente real ni gerente autónomo con PC apagada.

Siguiente bloque: preparar un mensaje propio revisable y el consumidor idempotente bajo identidad exacta, con rate limiter y aprobación trazable antes de habilitar envío. Conservar cierre del canary y no repetir el caso cancelado.
## Seguimiento histórico: secreto actualizado, aceptación pendiente

El owner rotó e ingresó el secreto en el formulario privado. Borrador guardado y publicado; vigencia original conservada. Nueva tarea `01a0fd1c-048e-735c-82ff-bfd8db53e038`: readiness inicialmente unknown, luego red enforced y ambos bindings ready explícitos, revisión 4, versión `cecfgver_6abfc54010f481a3a00a4525529cdb2e`. La primera lectura transitoria no autorizó peticiones.

Con readiness actual, GET autenticado y control devolvieron 403 text/html. Un único GET posterior sin credenciales reconoció Cloudflare Access y presencia de cf-ray, sin indicadores de denegación del proxy; no se conservaron HTML, headers ni valores. Consumidor restaurado y verificado deny everyone. Worker flags false, sin EMAIL; no envío.

El owner confirmó que había incluido el nombre del encabezado antes de los dos puntos en el ID original; declaró posible el mismo error en el secreto. Corrigió el ID en el formulario privado; borrador `01a0fd23-5f41-7095-93bc-dac304f64029` guardado y publicado. Nueva tarea `01a0fd30-ded7-7736-9519-9f592718e032`: metadatos transitorios unknown, luego ready/enforced. Primera prueba 000 no conservó diagnóstico individual y no acredita rechazo del proveedor. Prueba posterior con aprobación acotada require_escalated, revisión 5/5, obtuvo autenticado 403 text/html y control 403 text/html, ambos curl returncode 0. No identifica cuál valor falla. Consumidor restaurado y verificado deny. Siguiente: corregir únicamente el secreto mediante handoff humano, sin leer valores ni rotar por inferencia. No envío ni cambios en producción.

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
