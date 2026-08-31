# Agent Friendly Web Consented Contact Gate v1

**Fecha:** 2026-08-31

**Estado:** aprobado para implementacion local, pruebas y publicacion en modo preview

## Decision

Gate 6B incorpora una continuacion voluntaria despues de la auditoria publica. La auditoria conserva su resultado completo sin email. Quien quiera avanzar puede preparar una solicitud de plan, revisar exactamente que datos y consentimientos entregaria y, cuando exista una habilitacion remota separada, enviarla.

La primera version publica opera en `preview_only`: no persiste contactos, no envia correo y no afirma que haya recibido una solicitud. El endpoint publico esta fisicamente cerrado y devuelve `503` sin leer el cuerpo. No existe un flag capaz de activarlo en este gate. Las piezas de D1, Turnstile e idempotencia son preparacion local para una ruta de staging posterior con rate limiting y aprobacion separada.

## Experiencia humana

1. La persona audita un dominio sin registrarse.
2. Ve el resultado y puede continuar al expediente o abrir `Recibir mi plan`.
3. Completa email, nombre y contexto minimo.
4. Acepta expresamente el envio del plan solicitado.
5. Decide por separado si acepta contacto comercial y novedades.
6. En preview, revisa un resumen local y recibe un aviso inequívoco de que todavia no se envio nada.
7. En el gate remoto futuro, Turnstile valida en servidor y D1 conserva el lead minimo y los recibos de consentimiento.

## Modelo de datos

### `contact_leads`

- identificador aleatorio;
- email normalizado;
- nombre, organizacion y rol opcionales;
- dominio auditado;
- idioma `es`, `en` o `pt`;
- objetivo allowlisted;
- estado inicial `new`;
- origen allowlisted;
- clave de idempotencia unica;
- fechas de creacion y actualizacion.

### `consent_receipts`

- identificador aleatorio;
- lead relacionado;
- finalidad `requested_plan`, `commercial_contact` o `product_updates`;
- version exacta del texto;
- accion `granted`;
- hash de evidencia minima;
- fecha.

No se guardan contrasenas, tokens de Turnstile, cuerpos de correo, capturas privadas ni texto libre ilimitado.

## Frontera de seguridad

- ruta publica sin camino de activacion en Gate 6B;
- ausencia de la variable equivale a deshabilitado;
- Turnstile se valida siempre en servidor cuando la captura esta activa;
- se verifica `action=request_plan` y hostname allowlisted;
- el token es efimero y nunca se almacena;
- cada reintento usa idempotencia;
- los secretos permanecen en bindings y nunca llegan al navegador ni a D1;
- el formulario rechaza patrones probables de credenciales en campos de contexto;
- ninguna direccion de email acredita propiedad o control del dominio auditado.

## Idioma y correo

El contenido raiz continua en espanol por ahora. Ingles vive en `/en` y portugues en `/pt`, sin redireccion automatico. La prioridad canonica se revisara luego de 90 dias de evidencia comercial.

`hello@agentfriendlyweb.dev` sera la identidad operativa universal. `hola@` y `ola@` funcionaran como aliases hacia la misma cola. No se crean tres operaciones, historiales o CRMs separados.

## Estados del gate

- `preview_only`: interfaz local, cero persistencia y cero correo;
- `staging_allowlist`: D1 aislada, Turnstile de prueba y destinatarios autorizados;
- `production_canary`: trafico minimo y monitoreado;
- `active`: captura general despues de politica, baja, routing y soporte verificados.

Pasar de un estado a otro requiere aprobacion humana separada cuando implique datos reales, DNS, secretos, correo o produccion.

## Criterios de aceptacion

- la auditoria no exige email;
- los consentimientos opcionales estan desmarcados;
- solicitar un plan no suscribe a marketing;
- la vista previa no realiza una solicitud de red;
- el endpoint deshabilitado falla cerrado;
- entradas invalidas, secretos probables y consentimientos incompletos se rechazan;
- el contrato publico describe estado y limites reales;
- la migracion es aditiva, reproducible y deja tablas vacias;
- ESP, ENG y POR tienen copy equivalente;
- build, lint, tests y QA visual pasan antes de publicar.

## Fuentes primarias

- Cloudflare Turnstile server-side validation: `https://developers.cloudflare.com/turnstile/get-started/server-side-validation/`
- Cloudflare D1: `https://developers.cloudflare.com/d1/`
- Cloudflare Workers best practices: `https://developers.cloudflare.com/workers/best-practices/workers-best-practices/`
