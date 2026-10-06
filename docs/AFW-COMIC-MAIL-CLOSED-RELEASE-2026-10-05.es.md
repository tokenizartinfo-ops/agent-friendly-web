# Correo cómic: canary preparado y cerrado

## Procedencia y alcance

PR283 integrado; fuente desplegada `454237277555c29797547c545c70e3755eff537e`, CI37399537937 aprobado (verify50s). Código y aceptación local en AFW-COMIC-MAIL-CUSTODY-2026-10-05.es.md: 916 tests, lint sin errores/dos warnings previos, build y dry-run aprobados.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT mail-canary; ORIGIN mail-ops-canary.agentfriendlyweb.dev / mail-consumer-canary.agentfriendlyweb.dev; RESOURCE_TYPE Worker; RESOURCE_ID agent-friendly-web-mail-canary; ALLOWED_ACTION desplegar código/config cerrados y leer verificación. Cuenta 85d0d5dadac3341a564f22ce885e9eec comprobada por whoami antes del deploy. No autorización/identidad nueva, envío, migración ni cambios de políticas.

## Estado observado después del despliegue

Worker versión `f78b48ba-447d-4b0f-81e7-e20ff99cb86d` al 100%, comprobado por API independientemente de la salida CLI.

- MAIL_OPERATOR_ENABLED=false, MAIL_SERVICE_ENABLED=false, MAIL_BRAND_ENABLED=false.
- MAIL_DB continúa e1d480e2-e369-4f0b-ae7d-5cab3b7eee16; no migraciones, escrituras ni borrados de filas en este bloque.
- EMAIL, MAIL_RATE_LIMITER y MAIL_SERVICE_CLIENT_ID ausentes; ninguna capacidad de envío provisionada.
- Cron vacío. Orígenes canary existentes conservados; no rutas de clientes/apex ni guardia permanente.
- Dos GET anónimos acotados, sin seguir redirects, devolvieron302 a tokenizart.cloudflareaccess.com. Confirman protección de entrada; no acreditan respuesta del handler con sesión real ni error de identidad.

El paquete visual no se cargó a D1 remoto: la revisión sintética anterior fue en memoria local. No se envió correo propio ni externo desde este despliegue.

## Rollback

Versión anterior `2f25aeec-2def-43fd-a8dd-17b1fe0e09b0`, operador/servicio cerrados y misma D1. Revertir solamente código/config del Worker con wrangler rollback y config wrangler.mail-canary.jsonc; comprobar flags y bindings independientemente tras revertir. Preservar journal y políticas; nunca borrar snapshots para permitir ejecutar una versión antigua. Un snapshot de marca no soportado por código antiguo falla cerrado.

## Próximo bloque

Ensayo propio de recepción por el circuito privado completo, con credencial de propósito específico vigente bajo custodia cloud, Access exacto, límite, destinatario propio, ventana acotada, aprobación/hash, un intento, recibo, retirada y cierre. La credencial expirada del recibo anterior no se reutiliza. La guardia permanente y el primer cliente permanecen etapas independientes; no incrementar permisos del gerente de lectura para enviar correos por inferencia.
