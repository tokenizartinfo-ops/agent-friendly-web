# Gate 6C.2B - Email outbound remote canary

**Fecha:** 2026-09-02
**Estado:** `human_canary_verified_binding_blocked`
**Resultado:** dominio remitente y autenticacion verificados; un unico canary humano recibido; envio recurrente OFF

## Frontera ejecutada

- `PROJECT`: `agent-friendly-web`
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`
- `ENVIRONMENT`: `afw_email_outbound_canary`
- `ORIGIN`: `agentfriendlyweb.dev`
- `RESOURCE_TYPE`: Cloudflare Email Service, dominio remitente y DNS de autenticacion
- `RESOURCE_ID`: cuenta `85d0d5dadac3341a564f22ce885e9eec`, zona `4b1a3fe4b6dcb81e9d6a633174c5939f`, dominio `agentfriendlyweb.dev`
- `ALLOWED_ACTION`: incorporar un dominio, aplicar solo los DNS generados por Cloudflare y enviar una prueba transaccional unica al destino verificado
- `ROLLBACK`: retirar cualquier futura capacidad de envio, eliminar solo los seis DNS salientes y retirar el dominio de Email Service, preservando Email Routing entrante

La frontera excluye Tokenizart, Companion, Copilot, Owner Live, Atelier y cualquier superficie `*.chatgpt.site`.

## Aplicacion del dominio

El preflight inmediatamente anterior confirmo cero dominios remitentes, seis registros faltantes y cero conflictos. La operacion de alta incorporo exactamente `agentfriendlyweb.dev`; Cloudflare creo automaticamente:

- tres MX de retorno en `cf-bounce.agentfriendlyweb.dev`;
- un TXT SPF en `cf-bounce.agentfriendlyweb.dev`;
- un TXT DKIM en `cf-bounce._domainkey.agentfriendlyweb.dev`;
- un TXT DMARC en `_dmarc.agentfriendlyweb.dev`.

Una consulta publica mediante el resolvedor `1.1.1.1` encontro los seis registros. El contenido DKIM no se guardo. Email Routing entrante continuo habilitado con cinco reglas, cuatro activas, tres forwards, un drop activo y catch-all deshabilitado.

## Canary humano

La autorizacion humana cubrio una sola prueba. Cloudflare REST API envio `transactional_canary_v1` desde `hello@agentfriendlyweb.dev` hacia el unico destino verificado, representado fuera de los sistemas publicos como `verified_destination_1`.

La busqueda metadata-only en Gmail encontro exactamente un mensaje. Sus cabeceras verificaron:

- SPF: `pass`;
- DKIM de `agentfriendlyweb.dev`: `pass`;
- DMARC: `pass`.

No se leyo ni conservo el cuerpo desde Gmail. El recibo saneado mantiene un identificador derivado, conteos y booleanos, sin direccion receptora, cabeceras crudas, Message-ID, contenido ni adjuntos.

## Decision de runtime

El binding `send_email` no fue configurado. El canary uso Cloudflare REST API como accion manual de una sola vez para probar el transporte sin dejar un Worker, una ruta publica, un cron o una automatizacion capaces de repetirlo.

Por lo tanto:

- la entrega saliente esta empiricamente verificada;
- `outbound_sending` permanece `false` como capacidad operativa continua;
- no existe ningun segundo envio programado o autorizado;
- destinatarios arbitrarios, respuestas automaticas, newsletters y marketing siguen bloqueados;
- no se cambio Workers Paid ni otra configuracion de billing.

## Evidencia

- alta y DNS saneados: `docs/evidence/email-outbound-domain-application-2026-09-02.json`;
- recibo metadata-only: `docs/evidence/email-outbound-human-canary-2026-09-02.json`;
- baseline anterior: `docs/evidence/email-outbound-canary-baseline-2026-09-02.json`.

## Siguiente gate

Gate 6C.3 debe definir primero un caso transaccional real. Recién entonces puede crear un Worker/binding dedicado, con un remitente fijo, un unico destino o allowlist acotada, template versionado, idempotencia, rate limit, kill switch y auditoria metadata-only. El canary superado no habilita por si mismo esa capacidad.

## Rollback

Si se decide retirar Email Service:

1. comprobar que no exista ningun binding o runtime de envio;
2. eliminar solo los tres MX, SPF, DKIM y DMARC creados para salida;
3. retirar `agentfriendlyweb.dev` de Email Service;
4. verificar que las reglas entrantes sigan habilitadas;
5. conservar estos recibos saneados como evidencia historica.
