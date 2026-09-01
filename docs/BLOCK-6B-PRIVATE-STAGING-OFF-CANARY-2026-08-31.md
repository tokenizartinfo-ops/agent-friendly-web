# Gate 6B - Canary privado con escrituras deshabilitadas

**Fecha local:** 2026-08-31

**Estado:** desplegado, privado, owner-only, sin escrituras

## Objetivo

Validar en remoto la frontera de infraestructura de Gate 6B sin captar contactos, enviar correo ni abrir el formulario a usuarios reales. La instancia es independiente de la web publica y utiliza su propia base D1.

## Entorno

- origen privado: `https://agent-friendly-web-contact-staging.tokenizart.chatgpt.site`;
- acceso: `custom`, un unico owner, sin grupos ni visitantes externos;
- version de fuente: `a395736213cbc02be9cd41217ea29a1c3f101e66`;
- configuracion: modo `staging_allowlist`, host exacto y allowlist minima;
- kill switch: `CONTACT_STAGING_WRITES_ENABLED=false`;
- datos permitidos en este hito: ninguno.

No se publican valores de tokens, bypass, claves, credenciales o secrets.

## D1 aislada

El despliegue aplico las migraciones aditivas del repositorio. La inspeccion read-only encontro trece tablas, incluidas:

- `contact_leads`;
- `consent_receipts`;
- `registry_sites`;
- `site_projects`;
- `publication_capsules`;
- `capsule_approvals`.

Las lecturas posteriores confirmaron cero filas en `contact_leads` y cero filas en `consent_receipts`.

## Pruebas negativas remotas

| Prueba | Resultado |
| --- | --- |
| origen sin autenticacion | `401` en la capa Sites |
| raiz con bypass tecnico sin identidad | `200` |
| `/contact-staging` con kill switch cerrado | `404` |
| API staging sin identidad confiable | `401 contact_staging_identity_required` |
| API publica de contacto | `503 contact_capture_disabled` |

El orden observado confirma que la identidad y el kill switch impiden leer el cuerpo o llegar a persistencia. No se ejecuto una escritura sintetica.

## Controles todavia ausentes

- Turnstile limitado al hostname privado;
- secret y Site Key provisionados por un canal seguro;
- binding remoto de rate limiting compatible con Sites;
- prueba positiva sintetica e idempotente;
- cierre y verificacion posterior del kill switch.

Sites ofrece D1 y variables de entorno para esta aplicacion, pero no expone actualmente el binding `CONTACT_STAGING_RATE_LIMITER` utilizado por el codigo. No se reemplaza silenciosamente ese control por una variable ni se abre el formulario sin limiter.

## Siguiente subgate recomendado

Evaluar un adaptador Cloudflare remoto que conserve:

1. identidad confiable y allowlist;
2. rate limiting antes de leer el cuerpo;
3. Turnstile ligado al hostname;
4. D1 aislada;
5. kill switch cerrado por defecto;
6. una unica escritura sintetica idempotente;
7. cierre inmediato y comprobacion de tablas.

La alternativa preferida es conservar un rate limiter nativo de Cloudflare en una frontera Worker privada. Si se propone un limiter sobre D1, requiere pruebas de concurrencia y una decision tecnica separada antes de modificar el contrato actual.

## Rollback

El estado actual ya es fail-closed. El rollback operacional consiste en conservar `CONTACT_STAGING_WRITES_ENABLED=false`, retirar las variables no secretas o suspender el despliegue privado. No hay contactos que borrar ni correo que revocar.
