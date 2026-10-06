# Canary de correo: ventana publicada y servicio cerrado

Fuente `3f1130440240710d17846a7524f31bc527ed3bfd`, PR285 y PR286 integrados, controles de GitHub aprobados. La ventana del correo está descrita en AFW-COMIC-MAIL-WINDOW-2026-10-06.es.md. La corrección del scanner está integrada en el repositorio, pero este despliegue del entrypoint de correo no publica el scanner web.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT mail-canary; ORIGIN mail-ops-canary.agentfriendlyweb.dev / mail-consumer-canary.agentfriendlyweb.dev; RESOURCE_TYPE Worker; RESOURCE_ID agent-friendly-web-mail-canary; ALLOWED_ACTION publicar código y configuración cerrados, verificar metadatos y entrada anónima. Cuenta comprobada con wrangler whoami: 85d0d5dadac3341a564f22ce885e9eec. ROLLBACK f78b48ba-447d-4b0f-81e7-e20ff99cb86d, preservando D1, secretos y políticas.

## Comprobación posterior

Wrangler dry-run correcto y despliegue completado. API independiente confirma versión `19968bd3-f9d2-4163-8a9f-88dca2ef7933` al 100%.

- Operador, consumidor y marca: false. Fechas del ensayo: vacías.
- D1 original e1d480e2-e369-4f0b-ae7d-5cab3b7eee16. Sin migraciones ni escrituras de filas.
- EMAIL, MAIL_RATE_LIMITER y MAIL_SERVICE_CLIENT_ID ausentes; MAIL_OPERATOR_SUBJECT existente preservado sin leer su valor.
- Cron vacío; mismos dos orígenes protegidos. Dos GET anónimos sin seguir redirects devolvieron 302 a tokenizart.cloudflareaccess.com.
- Sin correos, nueva identidad ni cambios Access. La protección de entrada no demuestra aceptación autenticada del handler.

## Próximo tramo

La consulta del chat cloud de correo informó red y bindings desconocidos. Chrome inventaría la pestaña de AFW, pero el control termina en timeout. Esto no prueba un error de credenciales. No reutilizar la identidad de correo vencida ni ampliar la identidad del gerente de lectura.

Antes del ensayo: custodia específica disponible en un entorno publicado, identidad de propósito único vigente, acceso exacto y limitador. Después: destinatario propio, snapshot visual revisable, ventana <=10 minutos, aprobación ligada al hash, consumo único y recibo, comprobación de duplicado y cierre. La recepción en la casilla se verifica separadamente. Primer cliente y guardia permanente siguen como promociones independientes.
