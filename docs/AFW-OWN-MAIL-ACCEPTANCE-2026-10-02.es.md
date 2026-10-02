# Envío propio desde cloud: aceptación completa

2 de octubre de 2026. Proyecto AFW, repositorio agent-friendly-web, mail-canary. Código de consumidor con fix de transporte vacío: PR171, fuente d99d5878167de9b3abdd5ad7a1c1f62e4a6bbca7, merge 75c7dba57d553441af0cdae91ab9c6edd5db5093. 691 pruebas, lint sin errores (warning img previo), build y CI aprobados. No cambios en producción.

Owner aprobó own-cloud-mail-20261002-02 en la pantalla privada. Primaria confirmó approved, hash d71120b7a94a8c18457881929a2dcfb10a6998e20de39dbf0d7e76f2018b874b, expiración 1790959075368, revocación null y ningún intento/recibo antes del consumo. No se extendió la aprobación vencida del caso anterior: original cancelado sin intento ni recibo.

Se habilitó únicamente identidad de servicio dedicada con audience exclusiva; MAIL_SERVICE_CLIENT_ID exacto custodiado en servidor, limiter 2/60s, EMAIL restringido a destino propio/remitente hello. Sin contenido, destinatario o decisiones suministrados por el cliente consumidor.

Tarea cloud 01a0fd44-ed76-701d-8891-e028a2ce9032, turno 01a0fd73-3734-7691-9cbb-84be8d01b3a5: red enforced y bindings ready. POST sin contenido/Origin, TLS verificado, proxy y aprobación acotada de conexión, sin redirects/retries:

| Consulta | HTTP | Content-Type | curl | Estado |
| --- | --- | --- | --- | --- |
| Consumir aprobación | 200 | application/json | 0 | accepted |
| Segunda consulta, misma clave | 200 | application/json | 0 | not_claimed |

Recibo opaco 10a22688-4bbe-40e0-9ca5-d0fea99798f3. Primaria confirmó accepted, un intento y exactamente un recibo; caso anterior cancelled con cero. Gmail encontró un único mensaje de referencia 20261002-CLOUD01 desde hello, etiqueta INBOX, recibido el 2 de octubre a las 13:30:35 Buenos Aires. Búsqueda acotada, sin cambios en el buzón. Acredita recepción de este mensaje, no entregabilidad futura general.

Cierre verificado: operador y servicio false; ambos Access deny everyone; EMAIL, MAIL_RATE_LIMITER y MAIL_SERVICE_CLIENT_ID ausentes. La API conserva secret_text omitidos, por lo que se retiró explícitamente solo el binding derivado MAIL_SERVICE_CLIENT_ID y se verificó su ausencia. No se borró el token original, custodia Codex, subject humano, tablas ni recibos. Credencial original conserva vencimiento 3 de octubre 10:50 Buenos Aires.

Concluye el piloto propio aprobación → consumidor cloud → recibo → inbox → bloqueo de duplicado. No acredita gerente programado con PC apagada, atención autónoma de correo ni cliente real. Siguiente: disparador/cadencia independiente con evidencia de ejecución sin equipo local y solo señales saneadas; después primer cliente por recorrido normal y piloto ChatGPT de lectura real. No habilitar envíos recurrentes ni renovar permisos por inferencia. Conservar no-retry ante incertidumbre.
