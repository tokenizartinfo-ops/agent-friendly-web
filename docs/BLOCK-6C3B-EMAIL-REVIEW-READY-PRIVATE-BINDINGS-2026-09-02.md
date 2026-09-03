# Gate 6C.3B: Review Ready Private Bindings

**Fecha:** 2026-09-02

**Estado inicial:** `private_bindings_ready_kill_switch_off`

**Estado posterior verificado:** `authenticated_negative_probe_verified_kill_switch_off`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, Access, Email Service binding, D1 y Rate Limiting aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; codigo `d2ba9701-0c61-4d96-84e1-f5659a9426be`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| `ALLOWED_ACTION` | configurar destino fijo y huella de actor fuera de Git, con flag OFF y verificacion fail-closed |
| `ROLLBACK` | quitar ambos bindings privados y redesplegar el commit `14e61da`; D1 queda con su tabla aditiva vacia |

Esta declaracion aplica exclusivamente a Agent Friendly Web. No usa runtimes, datos, repositorios ni recursos de Tokenizart.

## Resultado

El Worker canary conserva `AFW_EMAIL_REVIEW_READY_ENABLED=false`. Cloudflare contiene ahora un binding `send_email` con exactamente un destino fijo ya verificado y un secret binding con la huella SHA-256 del unico usuario admitido por la politica Access. Ni el destino, ni el identificador del usuario, ni su huella se guardaron en Git o se publicaron en evidencia.

La identidad se derivo dentro de Cloudflare a partir de una unica aplicacion, una unica regla `allow` por email y un unico usuario coincidente. El secreto no fue devuelto por la API despues de configurarlo. El request de negocio sigue sin aceptar destinatario, asunto ni cuerpo libre.

## Pruebas negativas

- `GET /api/canary/access-diagnostic` sin identidad recibio `302` de Cloudflare Access;
- `POST /api/canary/email/review-ready` sin identidad recibio `302` antes de alcanzar la aplicacion;
- la misma ruta en `https://agentfriendlyweb.dev` recibio `404`;
- la configuracion remota confirmo Access, D1, rate limit, destino fijo y allowlist secreta con el kill switch en `false`;
- D1 mantuvo cero filas de entregas, cero lecturas de fila y cero escrituras;
- ningun correo fue preparado, enviado ni reintentado.

La comprobacion autenticada se completo posteriormente con una sesion humana Access valida. El diagnostico de aplicacion confirmo `verification_status=verified`; la prueba negativa devolvio `404`, `sent=false` y `email_review_ready_unavailable`; D1 conservo cero entregas. La evidencia posterior vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-AUTHENTICATED-NEGATIVE-PROBE-2026-09-02.md`.

## Limite del gate

Este estado instala capacidad privada pero no la habilita. La prueba negativa autenticada ya fue superada. El proximo paso requiere confirmacion humana en el momento de la accion para evaluar un unico correo controlado; la capacidad debe volver a `false` inmediatamente despues de esa prueba.

No habilita correo a clientes, destinatarios arbitrarios, marketing, autorespuestas, reintentos automaticos, lectura entrante, adjuntos, CRM, billing ni automatizacion.

## Rollback

El rollback normal elimina `EMAIL_REVIEW_READY` y `AFW_EMAIL_REVIEW_READY_ALLOWED_SUBJECT_HASHES` de la configuracion remota, conserva `AFW_EMAIL_REVIEW_READY_ENABLED=false` y redespliega el codigo previo. La migracion `0006` es aditiva y la tabla sigue vacia, por lo que no requiere borrar schema.
