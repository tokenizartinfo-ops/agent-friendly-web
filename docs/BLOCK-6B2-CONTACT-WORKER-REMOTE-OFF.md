# Gate 6B.2 - Worker remoto OFF

**Fecha:** 2026-09-01

**Estado:** gate remoto OFF cerrado; escrituras deshabilitadas y cero datos

**Entorno:** `contact-staging.agentfriendlyweb.dev`

## Objetivo

Preparar una frontera remota aislada para el futuro contacto consentido sin aceptar formularios, almacenar contactos, enviar correo ni alterar la web publica.

## Infraestructura creada

- Worker dedicado `agent-friendly-web-contact-staging-frontier`;
- version de codigo inicial `5887de03-7b8e-48d1-992a-3e46c62447ec`;
- version activa con bindings sensibles `c2928e2d-75ae-4e86-880e-5461b2a4a48d`, sin cambios de codigo;
- hostname candidato separado de `agentfriendlyweb.dev`;
- D1 dedicada `agent-friendly-web-contact-staging-frontier` en region WEUR;
- rate limiter nativo de 10 solicitudes por 60 segundos;
- `workers.dev` y preview URLs deshabilitados;
- `CONTACT_STAGING_WRITES_ENABLED=false` fijado en configuracion versionada;
- aplicacion Access `self_hosted` con una unica politica `allow`, un unico selector de identidad y denegacion por defecto;
- launcher, iframe y preflight bypass deshabilitados; cookie Access marcada HTTP-only y sesion de una hora;
- widget Turnstile administrado y restringido al hostname privado del formulario;
- cuatro aliases sensibles vinculados al Worker: allowlist, team domain, audience y secreto Turnstile;
- Site Key publica vinculada a la interfaz Sites privada, aplicada sin cambiar su version de codigo y con captura deshabilitada;
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
| `GET /health` anonimo | `302`, interceptado por Access antes del Worker |
| `POST` anonimo al candidato | `302`, interceptado por Access antes del Worker |
| `OPTIONS` anonimo al candidato | `403`, sin bypass de preflight |
| `POST /api/contact-intake` publico | `503 contact_capture_disabled` |
| filas despues de las pruebas | 0 leads, 0 consentimientos |

Una lectura posterior de la configuracion Access confirmo una sola aplicacion coincidente y una sola politica, sin reglas `bypass` ni `service_auth`. Las pruebas remotas cubrieron la frontera anonima; las pruebas locales cubren origen incorrecto y orden OFF antes del cuerpo. Ninguna prueba envio un formulario valido, abrio el kill switch, genero una sesion de usuario, consulto valores de secretos ni alcanzo persistencia.

## Frontera cerrada

Gate 6B.2 queda cerrado porque:

1. Access protege el hostname antes del Worker;
2. la politica admite un unico operador y el resto queda denegado;
3. Turnstile esta restringido al hostname privado;
4. los bindings sensibles existen fuera de Git y sus valores no se documentan;
5. los smokes negativos demuestran que el trafico anonimo no alcanza el handler;
6. D1 conserva cero filas y cero escrituras en la verificacion final;
7. el endpoint publico y el sitio principal no cambiaron.

La autorizacion humana cubrio exclusivamente Access, Turnstile y sus bindings en estado OFF. No cubre la primera escritura sintetica.

## Rollback

El primer control de rollback es conservar `CONTACT_STAGING_WRITES_ENABLED=false`. Si la frontera falla, se retira el custom hostname o el Worker sin tocar la web publica. La D1 se conserva para trazabilidad y no se elimina durante el incidente.

## Limite del siguiente gate

Gate 6B.3 no forma parte de esta entrega. Abrir temporalmente el kill switch y ejecutar una unica escritura sintetica e idempotente requiere otra aprobacion expresa y separada. Contactos reales, correo, CRM, pagos, webhooks y marketing permanecen prohibidos.
