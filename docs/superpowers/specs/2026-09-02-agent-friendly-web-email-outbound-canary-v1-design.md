# Agent Friendly Web Email Outbound Canary v1

**Estado:** diseno aprobado para preparacion local; dominio emisor, DNS, billing, binding y envio remoto deshabilitados

## Objetivo

Preparar una capacidad minima de correo transaccional saliente para Agent Friendly Web sin habilitar newsletters, respuestas automaticas ni acceso del modelo a credenciales o contenido de casillas. El primer envio futuro sera un canary humano, dirigido a un unico destino previamente verificado y con recibo metadata-only.

## Decision de proveedor

Se selecciona Cloudflare Email Service como proveedor previsto porque:

- opera en la misma cuenta e infraestructura que `agentfriendlyweb.dev`;
- el Worker puede usar un binding `send_email` sin recibir una API key en el payload;
- permite restringir remitentes y destinatarios desde configuracion;
- los envios a destinos verificados pueden probarse sin habilitar destinatarios arbitrarios;
- evita incorporar una segunda cuenta, un segundo proveedor y otro secreto operativo.

La seleccion no equivale a configuracion. El baseline remoto del 2026-09-02 confirma que no hay subdominio emisor incorporado. El preview oficial informa seis registros DNS faltantes y cero conflictos; ningun registro fue aplicado.

## Frontera canonica

- `PROJECT`: `agent-friendly-web`.
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`.
- `ENVIRONMENT`: `afw_email_outbound_canary`.
- `ORIGIN`: `agentfriendlyweb.dev`.
- proveedor previsto: `cloudflare_email_service`.
- remitente y `Reply-To`: `hello@agentfriendlyweb.dev`.
- destino inicial: identificador opaco `verified_destination_1`; nunca se publica ni persiste su direccion.
- plantilla inicial: `transactional_canary_v1`.

No se reutilizan Workers, D1, dominios, correo ni secretos de Tokenizart. No se usa ninguna superficie `*.chatgpt.site`.

## Estados

1. `provider_selected_remote_unconfigured`: proveedor elegido, dominio emisor ausente y DNS sin aplicar.
2. `sending_domain_ready_canary_blocked`: dominio y autenticacion verificados, pero binding o aprobacion humana ausentes.
3. `human_canary_ready`: binding restringido a un remitente y un destino verificado; ningun envio ejecutado.
4. `human_canary_verified`: exactamente un mensaje transaccional recibido, sin automatizacion ni persistencia de contenido.

El contrato publico queda en el primer estado durante este gate. Ningun estado habilita newsletter, marketing, destinatarios arbitrarios o respuestas automaticas.

## Preflight local

El preflight recibe un inventario remoto saneado y produce un plan determinista. Solo acepta:

- identidad exacta del proyecto, repositorio, entorno y origen;
- estado del plan Workers conocido o desconocido;
- cuota y uso cuando Cloudflare los informa;
- lista saneada de subdominios emisores;
- resumen del preview DNS mediante nombre, tipo, estado y clase de contenido;
- cantidad de conflictos y registros faltantes.

Rechaza direcciones privadas, cuerpos, HTML, headers, adjuntos, secretos, contenido DNS crudo y campos desconocidos. No realiza red, no muta Cloudflare y no envia correo.

## Canary futuro

La activacion remota se separa en dos decisiones:

1. incorporar `agentfriendlyweb.dev` a Email Service y aplicar los registros DNS propuestos por Cloudflare;
2. crear un Worker/binding restringido y autorizar un unico envio humano.

El canary debe cumplir simultaneamente:

- `humanApproved: true`;
- `automaticSend: false`;
- un solo remitente canonico;
- un solo destino identificado como `verified_destination_1`;
- plantilla `transactional_canary_v1`;
- finalidad `transactional_test`;
- exactamente un identificador de entrega;
- cero cuerpo, HTML, headers, adjuntos o direccion privada en el recibo;
- cero newsletter, marketing, secuencias o reintentos automaticos.

El verificador de recibos es local y metadata-only. La recepcion real se confirma fuera del contrato, mediante observacion humana del destino verificado.

## Costos y limites observados

Segun la documentacion oficial consultada el 2026-09-02:

- enviar solo a destinos verificados esta disponible sin cargo adicional para el canary inicial;
- enviar a destinatarios arbitrarios requiere Workers Paid;
- Workers Paid tiene un minimo publicado de USD 5 mensuales por cuenta;
- incluye 3.000 correos salientes mensuales;
- el excedente publicado es USD 0,35 por cada 1.000 correos.

Estos valores son evidencia fechada, no una promesa comercial. Deben verificarse nuevamente antes de habilitar billing o destinatarios arbitrarios.

## Seguridad, privacidad y retencion

- El modelo no recibe credenciales, API keys, cuerpos completos ni adjuntos.
- El binding futuro debe restringir `allowed_sender_addresses` y `allowed_destination_addresses`.
- El recibo conserva solo contrato, test ID, identificador opaco de destino, template ID, aprobacion humana, resultado y conteos booleanos.
- No se crea D1, KV, R2 ni almacenamiento de mensajes en este gate.
- No se reutiliza la direccion privada de Email Routing como dato publico.
- Todo fallo de frontera o inventario produce `ok: false` con codigo estable y sin efecto lateral.

## Rollback futuro

Si el canary remoto falla, el orden de rollback sera:

1. retirar o deshabilitar el binding de envio;
2. retirar la ruta del Worker dedicado, si existiera;
3. eliminar solo los registros DNS creados por Email Service;
4. retirar el dominio emisor de Email Service;
5. conservar un recibo saneado del incidente y mantener Email Routing entrante sin cambios.

## Fuera de alcance

- newsletter, marketing y listas;
- respuestas automaticas;
- lectura de inbox, cuerpos o adjuntos;
- CRM y secuencias comerciales;
- destinatarios arbitrarios;
- pagos, suscripciones o cambios de plan;
- uso de `no-reply@` como remitente;
- cualquier recurso de Tokenizart.

## Criterios de aceptacion de Gate 6C.2A

1. Existe un contrato publico que declara `provider_selected_remote_unconfigured`.
2. El preflight local reproduce el baseline remoto saneado y concluye que falta incorporar el dominio emisor.
3. El verificador acepta solo un recibo de canary humano, unico y metadata-only.
4. Las pruebas rechazan destinatarios privados, contenido de mensaje, marketing, automatizacion y limites ambiguos.
5. No existen scripts `apply`, `deploy` o `send` para este gate.
6. Documentacion y roadmaps distinguen seleccion de proveedor de configuracion remota.
7. Tests, lint, build y escaneo de secretos quedan verdes antes de actualizar el Draft PR.
