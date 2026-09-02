# Gate 6C.2A - Email outbound canary local

**Fecha:** 2026-09-02  
**Estado:** `provider_selected_remote_unconfigured`  
**Resultado:** proveedor seleccionado, baseline remoto saneado y preflight local verificado; salida remota OFF

## Frontera declarada

- `PROJECT`: `agent-friendly-web`
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`
- `ENVIRONMENT`: `afw_email_outbound_canary`
- `ORIGIN`: `agentfriendlyweb.dev`
- `RESOURCE_TYPE`: Cloudflare Email Service, dominio emisor y futuro binding `send_email`
- `RESOURCE_ID`: cuenta `85d0d5dadac3341a564f22ce885e9eec`, zona `4b1a3fe4b6dcb81e9d6a633174c5939f`, dominio `agentfriendlyweb.dev`
- `ALLOWED_ACTION`: inventario read-only, preview DNS oficial y preflight local sin red
- `ROLLBACK`: no hay recursos remotos nuevos; conservar correo entrante y retirar en orden binding, ruta, DNS de salida y dominio emisor si un gate posterior los crea

Esta frontera excluye Tokenizart, Companion, Copilot, Owner Live, Atelier y cualquier superficie `*.chatgpt.site`.

## Decision

El proveedor previsto de salida es **Cloudflare Email Service**. Se eligio porque mantiene dominio y ejecucion en la infraestructura existente, permite usar un binding sin exponer una API key al payload del Worker y puede restringir remitente y destinatario. Resend y SMTP externo siguen siendo alternativas de contingencia, no dependencias activas.

La identidad futura queda acotada a:

- remitente: `hello@agentfriendlyweb.dev`;
- `Reply-To`: `hello@agentfriendlyweb.dev`;
- destino inicial: `verified_destination_1`, identificador opaco;
- plantilla: `transactional_canary_v1`;
- finalidad: `transactional_test`.

`no-reply@agentfriendlyweb.dev` conserva su condicion de entrada bloqueada y no se usa como remitente en este gate.

## Evidencia remota saneada

Las lecturas oficiales de Cloudflare del 2026-09-02 mostraron:

- limites de Email Sending con `quota: null` y `usage: null`;
- cero subdominios emisores incorporados;
- preview read-only para `agentfriendlyweb.dev` con seis registros faltantes;
- tres registros MX para `cf-bounce`, SPF, DKIM y DMARC;
- cero conflictos detectados.

El contenido de la clave publica DKIM no se conserva en Git. La cuenta no permitio confirmar read-only el plan de Workers con el acceso disponible, por lo que `workersPaidStatus` permanece `unknown`; no se infiere que Workers Paid este activo.

La evidencia reproducible vive en `docs/evidence/email-outbound-canary-baseline-2026-09-02.json` y contiene solo IDs de infraestructura, nombres/tipos/clases DNS y conteos. No contiene destinatarios privados, cuerpos, headers, adjuntos ni secretos.

## Costos observados

La [documentacion oficial de precios](https://developers.cloudflare.com/email-service/platform/pricing/) consultada el 2026-09-02 indica:

- canary hacia un destino verificado: USD 0 adicionales;
- destinatarios arbitrarios: requieren Workers Paid;
- minimo publicado de Workers Paid: USD 5 por mes y por cuenta;
- franquicia: 3.000 correos salientes por mes;
- excedente: USD 0,35 por cada 1.000 correos.

Estos valores son una observacion fechada. Deben volver a comprobarse antes de habilitar billing o destinatarios arbitrarios. Email Service se limita a correo transaccional; newsletter y marketing permanecen fuera del producto actual.

## Implementacion local

Se agregaron:

- politica pura y verificador: `lib/email-outbound-canary.mjs`;
- CLI local: `scripts/preflight-email-outbound-canary.mjs`;
- contrato publico: `public/.well-known/email-outbound-canary-contract.json`;
- evidencia saneada: `docs/evidence/email-outbound-canary-baseline-2026-09-02.json`;
- pruebas negativas y de contrato.

Ejecucion reproducible:

```powershell
npm run email:outbound:preflight -- docs/evidence/email-outbound-canary-baseline-2026-09-02.json
```

El resultado actual es `provider_selected_remote_unconfigured`. Todos los pasos remotos se informan con `networkMutation: false`; no existe script `send`, `apply` o `deploy` para esta capacidad.

## Capacidades bloqueadas

- enviar correo;
- cambiar billing o plan Workers;
- incorporar el dominio emisor;
- aplicar DNS;
- crear bindings o rutas;
- aceptar destinatarios arbitrarios;
- respuestas automaticas;
- newsletter, marketing o secuencias;
- persistir cuerpos, headers o adjuntos;
- entregar una direccion privada al modelo.

En este gate no se aplico ni modifico ningun registro DNS y no se envio ningun correo.

## Gates remotos siguientes

### Primera decision remota: dominio y autenticacion

Requiere revisar el precio vigente, confirmar si Workers Paid es necesario para el alcance elegido, incorporar `agentfriendlyweb.dev` a Email Service, aplicar solo los seis registros propuestos y comprobar SPF/DKIM/DMARC. No crea todavia un Worker de envio ni manda mensajes.

### Segunda decision remota: un canary humano

Requiere un Worker/binding dedicado con `allowed_sender_addresses` y `allowed_destination_addresses`, template fijo, kill switch, una aprobacion humana puntual y un unico envio a `verified_destination_1`. Su recibo solo puede conservar test ID, delivery ID, conteos y booleanos saneados.

Superar la primera decision no autoriza la segunda. Superar ambas no autoriza destinatarios arbitrarios, respuestas automaticas, CRM, newsletter ni marketing.

## Rollback futuro

1. Deshabilitar el binding de envio.
2. Retirar la ruta del Worker dedicado.
3. Eliminar unicamente los registros DNS creados para Email Service.
4. Retirar el dominio emisor del servicio.
5. Conservar evidencia metadata-only y mantener Email Routing entrante sin cambios.

## Verificacion

```text
node --test test/email-outbound-canary*.test.mjs test/email-operations-contract.test.mjs
npm test
npm run lint
npm run build
git diff --check
```

El gate no se considera activo hasta que esas verificaciones esten verdes y el Draft PR conserve explicitamente las mutaciones remotas fuera de alcance.
