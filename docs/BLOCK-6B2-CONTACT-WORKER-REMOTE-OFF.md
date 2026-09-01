# Gate 6B.2 - Worker remoto OFF

**Fecha:** 2026-08-31

**Estado:** infraestructura remota creada; gate incompleto y escrituras deshabilitadas

**Entorno:** `contact-staging.agentfriendlyweb.dev`

## Objetivo

Preparar una frontera remota aislada para el futuro contacto consentido sin aceptar formularios, almacenar contactos, enviar correo ni alterar la web publica.

## Infraestructura creada

- Worker dedicado `agent-friendly-web-contact-staging-frontier`;
- version remota `5887de03-7b8e-48d1-992a-3e46c62447ec`;
- hostname candidato separado de `agentfriendlyweb.dev`;
- D1 dedicada `agent-friendly-web-contact-staging-frontier` en region WEUR;
- rate limiter nativo de 10 solicitudes por 60 segundos;
- `workers.dev` y preview URLs deshabilitados;
- `CONTACT_STAGING_WRITES_ENABLED=false` fijado en configuracion versionada;
- hash SHA-256 de la configuracion desplegada: `34c1b0617606e0bc2cb2660ca3163cf7c8603b12297627389ae02565c1de739a`.

No se registran en este documento emails allowlisted, audiencia Access, tokens, claves ni valores de secretos.

## Migraciones y estado D1

Se aplicaron las migraciones aditivas `0000` a `0005`. La consulta remota posterior informo que no existen migraciones pendientes.

| Tabla | Filas |
| --- | ---: |
| `contact_leads` | 0 |
| `consent_receipts` | 0 |

La verificacion fue read-only: leyo dos contadores y escribio cero filas.

## Pruebas remotas

| Prueba | Resultado |
| --- | --- |
| `GET /health` | `200`, `writes:false` |
| `POST` al candidato con origen previsto | `503 contact_staging_misconfigured` |
| `POST` al candidato con origen ajeno | `503 contact_staging_misconfigured` |
| `POST /api/contact-intake` publico | `503 contact_capture_disabled` |
| filas despues de las pruebas | 0 leads, 0 consentimientos |

El `503` del candidato es el cierre por defecto esperado mientras falten configuraciones sensibles. El handler no alcanza validacion de origen ni lee el cuerpo porque la politica obligatoria esta incompleta.

## Frontera pendiente

Gate 6B.2 todavia no esta cerrado. Faltan:

1. crear una aplicacion Cloudflare Access para el hostname candidato;
2. permitir una sola identidad operativa y negar el resto;
3. crear un widget Turnstile restringido al hostname privado del formulario;
4. cargar allowlist, issuer, audience y secreto Turnstile mediante controles de Cloudflare;
5. repetir los smokes negativos y comprobar que una solicitud anonima no llega al Worker;
6. verificar nuevamente que D1 conserve cero filas.

Crear Access modifica permisos persistentes y crear Turnstile genera una credencial persistente. Ambos pasos requieren confirmacion humana en el momento de la accion.

## Rollback

El primer control de rollback es conservar `CONTACT_STAGING_WRITES_ENABLED=false`. Si la frontera falla, se retira el custom hostname o el Worker sin tocar la web publica. La D1 se conserva para trazabilidad y no se elimina durante el incidente.

## Limite del siguiente gate

Gate 6B.3 no forma parte de esta entrega. Abrir temporalmente el kill switch y ejecutar una unica escritura sintetica e idempotente requiere otra aprobacion expresa y separada. Contactos reales, correo, CRM, pagos, webhooks y marketing permanecen prohibidos.
