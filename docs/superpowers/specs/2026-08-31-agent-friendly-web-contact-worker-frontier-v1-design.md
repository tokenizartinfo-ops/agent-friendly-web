# Agent Friendly Web Contact Worker Frontier v1

> Frontera historica remota OFF. Se conserva como evidencia de Access, Turnstile y D1 vacia, pero no es un staging vigente. El diseño futuro sera same-origin dentro de `afw_canary`.

**Fecha:** 2026-08-31

**Estado:** propuesta tecnica para revision humana; sin despliegue ni escrituras

## Problema

El canary privado de Gate 6B ya prueba aislamiento, migraciones y cierre por defecto en Sites. Sin embargo, Sites no expone el binding `CONTACT_STAGING_RATE_LIMITER` que exige el contrato. Abrir escrituras sin ese control degradaria una frontera que hoy falla cerrada.

La solucion debe agregar rate limiting nativo sin confiar en headers de identidad que un cliente pueda falsificar, sin reutilizar la base publica, sin exponer secretos y sin convertir el formulario publico en un endpoint activo.

## Enfoques evaluados

### A. Worker privado dedicado con Access firmado, rate limiting y D1 aislada

Es la opcion recomendada. Un Worker separado atiende un hostname de staging protegido por Cloudflare Access. Verifica criptograficamente `Cf-Access-Jwt-Assertion`, deriva actor y email del token, consume el binding nativo de rate limiting y solo despues admite un cuerpo acotado. Turnstile y D1 siguen como controles obligatorios posteriores.

Ventajas: identidad verificable, binding nativo, aislamiento, observabilidad y rollback independiente. Costo: una aplicacion Access, un Worker, una D1 y un widget Turnstile de prueba.

### B. Limiter implementado sobre la D1 de Sites

Evita otro origen, pero obliga a construir concurrencia, ventanas y atomicidad sobre una base que tambien persiste contactos. El control seria menos claro que el binding de Cloudflare y requeriria pruebas adicionales de carrera. No se recomienda para el primer canary.

### C. Worker que solo reenvia solicitudes a Sites

Reduce duplicacion de handler, pero crea una frontera de identidad confusa: la sesion Sites no se convierte automaticamente en identidad confiable para un origen Worker. Tambien agrega CORS, cookies y un salto de red sin resolver por si mismo la firma del actor. Se descarta.

## Decision

Implementar el enfoque A como servicio de staging independiente. El canary Sites permanece owner-only y con escrituras deshabilitadas. La produccion publica conserva `POST /api/contact-intake` en `503 contact_capture_disabled`.

## Componentes

### Host y Access

- hostname candidato: `contact-staging.agentfriendlyweb.dev`;
- aplicacion Cloudflare Access separada;
- allowlist inicial de un unico email operativo;
- sin reglas de bypass publicas;
- el Worker valida firma, `iss`, `aud`, expiracion y tipo del JWT de Access;
- el email y el identificador de actor se obtienen de claims verificados, nunca del JSON ni de headers sin firma.

La existencia de un header `Cf-Access-Jwt-Assertion` no acredita identidad por si sola. El Worker debe validar el JWT contra el JWKS de la cuenta y la audiencia exacta de la aplicacion.

### Rate limiting

- binding: `CONTACT_STAGING_RATE_LIMITER`;
- namespace exclusivo para este Worker y ambiente;
- ventana inicial: 10 solicitudes por 60 segundos y actor autenticado;
- clave: hash estable de `actor_id + ruta`, no email literal ni IP;
- el limite se consume antes de leer el cuerpo;
- ausencia, excepcion o respuesta inesperada produce `503` o `429` fail-closed;
- el contador protege abuso, no contabiliza facturacion ni autorizacion.

El rate limiting nativo es local por ubicacion y eventualmente consistente. Se usa como defensa operativa, no como registro exacto.

### Turnstile

- widget separado y limitado al hostname que renderiza el formulario privado;
- Site Key publica en la interfaz y secret solo como Worker secret;
- validacion server-side obligatoria;
- `action=request_plan`, hostname exacto, expiracion y uso unico;
- timeout acotado y errores saneados;
- el token nunca se persiste ni aparece en logs.

El hostname del widget se configura por separado del hostname API. Esto evita reutilizar incorrectamente `CONTACT_STAGING_EXPECTED_HOST` cuando la pagina Sites y el Worker viven en origenes distintos.

### CORS y navegador

- `Access-Control-Allow-Origin` exacto para el origen privado Sites;
- nunca `*` cuando existen credenciales;
- metodos permitidos: `POST` y `OPTIONS`;
- headers permitidos allowlisted;
- `Vary: Origin` y `Cache-Control: no-store`;
- ningun redirect automatico para solicitudes API;
- la interfaz no conserva secretos ni tokens Access en JavaScript.

### D1

- base de staging creada exclusivamente para el Worker;
- migraciones aditivas y verificadas antes de cualquier escritura;
- tablas de contacto vacias antes del canary;
- ningun binding a la D1 publica o a la del proyecto Sites;
- una futura escritura sintetica usa email reservado `example.com`, idempotencia y consentimiento de prueba;
- correo, CRM, newsletter, pagos y webhooks permanecen ausentes.

## Orden de evaluacion

1. Metodo y ruta exactos.
2. Host exacto y politica CORS.
3. Modo `staging_allowlist` y kill switch.
4. Presencia y validacion criptografica del JWT Access.
5. Actor allowlisted.
6. Bindings obligatorios disponibles.
7. Rate limit por actor y ruta.
8. Tipo y cuerpo JSON de hasta 8 KiB.
9. Contrato, rechazo de secretos, consentimiento e idempotencia.
10. Turnstile server-side.
11. Persistencia transaccional en D1 staging.

Ningun rechazo anterior al paso 8 consume el cuerpo. Ninguna respuesta devuelve allowlists, audience tags, tokens, secrets, claims completos ni detalles internos.

## Despliegue por subgates

### Subgate 6B.1 - Codigo y pruebas locales

- tests en rojo y verde para JWT, CORS, limiter, orden y sanitizacion;
- Worker y config de staging sin secretos;
- `wrangler deploy --dry-run`;
- sin recursos remotos.

### Subgate 6B.2 - Infraestructura remota OFF

- crear Worker, hostname, Access, rate limiter y D1 aislada;
- cargar variables no secretas y secrets por canal seguro;
- `CONTACT_STAGING_WRITES_ENABLED=false`;
- ejecutar solo pruebas negativas;
- comprobar cero filas.

### Subgate 6B.3 - Una escritura sintetica

- aprobacion humana separada;
- abrir kill switch para un actor y una ventana breve;
- enviar un unico caso sintetico idempotente;
- verificar lead, recibo, ausencia de email y redaccion de logs;
- cerrar kill switch y volver a comprobar el bloqueo.

### Subgate 6B.4 - Piloto humano limitado

Requiere otra aprobacion. Define retencion, derechos del contacto, operacion de correo, responsable, respuesta humana, exportacion y supresion antes de aceptar datos reales.

## Pruebas

- JWT ausente, mal firmado, vencido, issuer incorrecto y audience incorrecta;
- email no permitido y claim sin identificador;
- host, origen CORS, metodo y preflight incorrectos;
- kill switch cerrado antes de limiter y cuerpo;
- limiter ausente, excepcion, permiso y agotamiento;
- cuerpo ausente, tipo incorrecto, streaming sobredimensionado y JSON invalido;
- Turnstile ausente, replay, action y hostname incorrectos;
- D1 ausente, conflicto idempotente y transaccion fallida;
- ninguna respuesta o log refleja secretos ni identidad completa;
- endpoint publico y canary Sites siguen cerrados.

## Observabilidad

Registrar solo metadata: timestamp, codigo de resultado, ruta, duracion, estado de cada gate y hash no reversible del actor. No registrar cuerpo, email, JWT, cookie, token Turnstile, secret, audience, idempotency key completa ni datos del formulario.

## Rollback

1. fijar `CONTACT_STAGING_WRITES_ENABLED=false`;
2. deshabilitar la ruta o el Worker si el bloqueo no se observa;
3. revocar la aplicacion Access o retirar su politica;
4. conservar D1 para diagnostico sin borrar evidencia durante un incidente;
5. no tocar el sitio publico ni la D1 Sites;
6. restaurar solo despues de pruebas negativas y una aprobacion posterior.

## Criterio de exito

El subgate se considera preparado cuando el Worker puede desplegarse con el kill switch cerrado, rechaza toda identidad no firmada, dispone de rate limiting nativo y conserva Turnstile y D1 como requisitos obligatorios. No se considera activo hasta completar una escritura sintetica autorizada y volver a cerrar el sistema.

