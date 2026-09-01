# Gate 6B.1 - Frontera Worker de contacto verificada localmente

**Fecha local:** 2026-08-31

**Estado:** codigo y configuracion local aprobados; infraestructura Worker remota no creada; escrituras deshabilitadas

## Objetivo

Resolver el limite detectado en el canary privado de Sites: esa superficie no ofrece el binding nativo de rate limiting requerido antes de leer el cuerpo. La nueva frontera es un Cloudflare Worker independiente, preparado para operar detras de Cloudflare Access y separado del sitio publico, del proyecto Sites privado y de sus bases D1.

## Implementacion

- `lib/cloudflare-access-identity.mjs`: valida criptograficamente firma RS256, issuer, audience y expiracion del JWT Access; devuelve solo identificador y email saneados;
- `lib/contact-worker-policy.mjs`: exige ruta, metodo, HTTPS, host API, origen de formulario, hostname Turnstile, modo, allowlist y kill switch exactos;
- `createOpaqueRateLimitKey`: deriva SHA-256 de actor y ruta sin exponer email ni identificador literal;
- `lib/contact-d1-store.mjs`: persiste lead y recibos de consentimiento con batch D1, idempotencia, conflicto y recuperacion ante carrera;
- `worker/contact/index.mjs`: aplica los gates en orden y nunca lee el cuerpo antes de identidad, bindings y rate limiting;
- `wrangler.contact.jsonc`: declara D1 aislada, rate limiter nativo de 10 solicitudes por 60 segundos, hostname candidato y escrituras OFF;
- secretos, allowlist y valores Access no se guardan en Git.

## Orden probado

1. ruta y metodo;
2. HTTPS, host y CORS exactos;
3. modo y kill switch;
4. JWT Access firmado;
5. actor allowlisted;
6. D1, Turnstile y limiter disponibles;
7. rate limit con clave opaca;
8. JSON de hasta 8 KiB;
9. contrato, secretos probables, consentimientos e idempotencia;
10. Turnstile server-side con action y hostname exactos;
11. batch atomico en D1.

Todo error devuelve un codigo estable sin claims, allowlists, audience, cuerpo, email, token, secret ni detalle del proveedor.

## Verificacion

- `npm test`: 357/357 aprobadas;
- nuevas pruebas de frontera: JWT, CORS, preflight, kill switch, allowlist, limiter, orden, saneamiento y D1;
- `npm run lint`: cero errores; una advertencia visual preexistente sobre `<img>`;
- `npm run build`: aprobado;
- `npm run contact:deploy:dry-run`: aprobado, 62.50 KiB sin comprimir y 16.28 KiB gzip;
- bindings detectados: D1, rate limiter nativo y cinco variables no secretas;
- `workers.dev` y previews deshabilitados; el futuro ingreso remoto queda limitado al hostname custom protegido;
- `CONTACT_STAGING_WRITES_ENABLED=false` en la configuracion versionada.

## Estado de datos y red

Este subgate no creo Worker, D1, hostname, Access ni Turnstile remotos. No aplico migraciones remotas, no recibio trafico, no genero contactos y no escribio filas. El endpoint publico conserva `contact_capture_disabled` y el canary Sites owner-only conserva su kill switch cerrado.

## Siguiente subgate

Gate 6B.2 puede crear la infraestructura remota con escrituras OFF, cargar configuracion sensible por canal seguro, aplicar migraciones y ejecutar solo smokes negativos. Gate 6B.3, que permitiria una unica escritura sintetica e idempotente, requiere una nueva aprobacion humana separada.

## Rollback

Mientras no se despliegue, el rollback es eliminar el Worker candidato del plan. Una vez creado Gate 6B.2, el primer control es mantener `CONTACT_STAGING_WRITES_ENABLED=false`; si falla el cierre, se retira la ruta o el Worker sin tocar la web publica ni el canary Sites.
