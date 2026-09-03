# Gate 6C.3D - Synthetic Contact Canary Remote

**Estado:** `synthetic_contact_canary_verified_kill_switch_off`

## Frontera declarada

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Worker web canary, D1 canary, Cloudflare Access, Turnstile de prueba y rate limiter dedicado |
| `RESOURCE_ID` | `agent-friendly-web-web-canary`, `/canary/contact-intake`, `/api/canary/contact-intake` |
| `ALLOWED_ACTION` | crear una unica solicitud sintetica fija y preparar su revision sin enviar correo |
| `ROLLBACK` | restaurar la version `66a4248a-4c89-4b4c-a18b-c5bf1acafb28` con ambos interruptores OFF |

## Resultado

El 2026-09-03 se completo una prueba remota privada de la cadena tecnica que precede a una futura solicitud real. Cloudflare Access verifico al operador allowlisted, la UI obtuvo un token Turnstile y el servidor genero el fixture fijo bajo `.invalid`. La ruta creo exactamente una fila sintetica y un consentimiento `requested_plan` en la D1 exclusiva del canary.

El adaptador de Gate 6C.3C recupero solo `id`, `locale` y `state`, derivo el aviso interno idempotente y devolvio `prepared_not_sent`. El handler no invoco la ruta de entrega. No se envio correo y no se modifico produccion.

## Secuencia fail-closed

1. Se desplego y probo primero la version OFF. La API devolvio `synthetic_contact_unavailable` y D1 permanecio en cero filas de contacto y consentimiento.
2. El primer intento ON fue rechazado como `turnstile_failed` antes de persistir. El canary volvio inmediatamente a OFF y las tablas continuaron sin cambios.
3. La causa fue la semantica documentada de las credenciales oficiales de prueba: Siteverify devuelve accion `test` y hostname `localhost`. El codigo se corrigio para aceptar esos valores solo cuando coincide exactamente el secreto oficial de prueba.
4. Las credenciales reales conservan validacion estricta de `afw_synthetic_contact` y `canary.agentfriendlyweb.dev`.
5. La version corregida produjo una unica solicitud sintetica y se restauro OFF inmediatamente.

## Evidencia de datos

| Registro | Antes | Despues | Cambio del gate |
| --- | ---: | ---: | ---: |
| solicitudes sinteticas | 0 | 1 | +1 |
| consentimientos `requested_plan` | 0 | 1 | +1 |
| entregas de email totales | 4 | 4 | 0 |
| emails historicos `sent` | 1 | 1 | 0 |
| emails historicos `failed` | 3 | 3 | 0 |
| reservas pendientes | 0 | 0 | 0 |

La fila usa `synthetic-canary@example.invalid` y `example.invalid`; no representa a una persona, organizacion o sitio real. No se creo consentimiento de marketing ni de novedades.

## Estado final

- `AFW_SYNTHETIC_CONTACT_ENABLED=false`;
- `AFW_EMAIL_REVIEW_READY_ENABLED=false`;
- canary protegido por Cloudflare Access;
- UI privada sin boton de captura disponible;
- captura publica deshabilitada;
- cero correos enviados por Gate 6C.3D;
- cero recursos de Tokenizart utilizados.

La evidencia saneada vive en `docs/evidence/synthetic-contact-canary-remote-2026-09-03.json`. No contiene JWT, sujeto Access, secretos, destinatarios privados ni valores de credenciales.

## Alcance validado y siguiente gate

Quedo validada la union tecnica `captura privada sintetica -> D1 -> consentimiento -> preparacion metadata-only`. Esto no habilita datos reales, CRM remoto, listas, newsletter, correo automatico ni pagos.

El siguiente paso razonable es preparar una vista interna read-only que lea la solicitud sintetica y produzca un plan comercial saneado, manteniendo cualquier captura real y toda entrega de correo en OFF. La futura apertura a una persona real debe tener politica de privacidad y retencion aprobadas, consentimiento visible, Turnstile real y una decision independiente.

## Fuentes tecnicas

- Cloudflare Turnstile testing: `https://developers.cloudflare.com/turnstile/troubleshooting/testing/`;
- Cloudflare Siteverify: `https://developers.cloudflare.com/turnstile/get-started/server-side-validation/`;
- Cloudflare Worker version inheritance: `https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions/methods/create/`.
