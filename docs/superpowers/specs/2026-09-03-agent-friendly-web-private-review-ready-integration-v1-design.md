# Agent Friendly Web Private Review Ready Integration v1

**Estado:** diseno aprobado para implementacion local; despliegue y envios deshabilitados

## Objetivo

Conectar de forma comprobable una solicitud privada ya persistida con el aviso interno `internal_review_ready`, sin permitir que la interfaz o el caller definan destinatario, asunto, cuerpo, idioma arbitrario o identificadores de entrega.

## Frontera

- `PROJECT`: `agent-friendly-web`.
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`.
- `ENVIRONMENT`: preparacion local para `afw_email_review_ready_canary`.
- `ORIGIN`: futuro canary privado `https://canary.agentfriendlyweb.dev`.
- `RESOURCE_TYPE`: adaptador metadata-only entre D1 y el contrato de correo ya verificado.
- `RESOURCE_ID`: `contact_leads` y `agent-friendly-web.email-review-ready.v1`.
- `ALLOWED_ACTION`: preparar un request interno desde una solicitud persistida que espera revision.
- `ROLLBACK`: retirar el adaptador; no hay migracion, envio ni dato remoto que revertir.

Tokenizart, clientes, marketing, destinatarios arbitrarios, cuerpos de correo, adjuntos y produccion publica quedan fuera de alcance.

## Contrato de entrada

La entrada privada admite solo:

- `contract`: `agent-friendly-web.internal-review-ready-trigger.v1`;
- `requestId`: UUID opaco de una fila ya existente;
- `action`: `notify_internal_operator`;
- `humanApproved`: `true`.

Se rechazan campos desconocidos y, de forma explicita, email, nombre, dominio, telefono, destinatario, asunto, cuerpo, HTML, adjuntos, credenciales y texto libre.

## Verificacion de fuente

El adaptador consulta D1 mediante una sentencia preparada y selecciona exclusivamente `id`, `locale` y `state`. No lee email, nombre, organizacion ni contenido del contacto.

Una fuente es apta cuando:

- existe en `contact_leads`;
- su `id` coincide exactamente con `requestId`;
- su estado es `new`, que en Gate 6B representa una solicitud aceptada y pendiente de revision inicial;
- su idioma es `es`, `en` o `pt`.

El adaptador traduce `new` a la condicion derivada `review_ready`; no modifica la fila ni crea un nuevo estado persistido.

## Salida

La salida valida contra `agent-friendly-web.email-review-ready.v1` y deriva internamente:

- `eventId`: `afw-review-ready-<requestId>`;
- `idempotencyKey`: el mismo UUID de la solicitud;
- `templateId`: `internal-review-ready-v1`;
- `locale`: obtenido de D1;
- `purpose`: `internal_review_ready`;
- `humanApproved`: `true`.

El resultado declara `prepared_not_sent`. Preparar no reserva una entrega, no llama al proveedor y no implica que el correo este habilitado.

## Fallos cerrados

- contrato o forma invalida: `invalid_internal_review_ready_trigger`;
- D1 ausente o incompatible: `private_review_ready_store_unavailable`;
- solicitud inexistente: `private_review_ready_request_not_found`;
- estado distinto de `new`: `private_review_ready_request_not_eligible`;
- metadata inesperada: `private_review_ready_source_invalid`.

Los errores de D1 no se devuelven en crudo.

## Integracion posterior

Gate 6C.3C solo prepara y prueba el adaptador. Una fase remota posterior debera:

1. reintroducir Gate 6B en el mismo canary canonico, sin usar Workers o Sites legacy;
2. crear una unica solicitud sintetica mediante la frontera privada;
3. comprobar que el adaptador solo lee sus tres campos permitidos;
4. mantener `AFW_EMAIL_REVIEW_READY_ENABLED=false` durante el preflight;
5. requerir confirmacion humana en el momento de cualquier nuevo envio;
6. restaurar el interruptor a `false` inmediatamente despues.

No se habilita envio automatico al crear una solicitud. El operador debe revisar y aprobar cada aviso.

## Pruebas

- entrada exacta y rechazo de PII, contenido y campos desconocidos;
- lectura D1 con columnas minimas y parametro enlazado;
- solicitud ausente, estado no elegible y locale invalido;
- derivacion determinista e idempotente del contrato de correo;
- cero funciones de envio, red, persistencia o reintento en el adaptador;
- suite integral, lint y build.
