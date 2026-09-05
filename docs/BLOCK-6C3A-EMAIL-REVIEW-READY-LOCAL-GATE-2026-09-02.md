# Gate 6C.3A - Aviso interno listo para revision

Fecha: 2026-09-02

Proyecto: `agent-friendly-web`

Repositorio: `tokenizartinfo-ops/agent-friendly-web`

Entorno previsto: `afw_email_review_ready_canary`

Origen previsto: `https://canary.agentfriendlyweb.dev`

Estado: `transactional_case_selected_local_ready_remote_disabled`

## Decision

El primer caso transaccional seleccionado es un aviso interno que informa que una solicitud ya esta lista para revision humana. No responde a un cliente, no incorpora contactos, no envia marketing y no acepta destinatarios ni contenido libre.

La implementacion local esta cerrada por defecto. Gate 6C.3A termina con codigo, migracion local, contrato publico y pruebas, pero **sin despliegue, migracion remota, binding ni envio**.

## Por que este caso

El aviso resuelve una necesidad operativa concreta sin abrir todavia una superficie de comunicacion externa. Permite validar autenticacion, autorizacion, idempotencia, persistencia minima y entrega antes de habilitar flujos que involucren datos de clientes o consentimientos comerciales.

## Contrato de entrada

La ruta prevista es `POST /api/canary/email/review-ready`. Solo admite:

- identificador opaco del evento;
- clave UUID de idempotencia;
- template fijo `internal-review-ready-v1`;
- idioma `es`, `en` o `pt`;
- proposito fijo del aviso interno;
- aprobacion humana afirmativa.

Se rechazan campos desconocidos, email, nombre, dominio, destinatario, asunto, texto, HTML, encabezados, adjuntos, credenciales y datos de pago.

## Fronteras tecnicas

1. El kill switch `AFW_EMAIL_REVIEW_READY_ENABLED` permanece en `false`.
2. Cloudflare Access debe verificar identidad antes de revelar dependencias internas.
3. Solo un hash allowlisted del sujeto Access puede continuar.
4. Host, ruta y origen son exactos para `canary.agentfriendlyweb.dev`.
5. El rate limit se aplica por hash del actor y no se usa como contador financiero.
6. D1 reserva el evento antes del envio.
7. El destinatario es fijo en un binding Cloudflare y nunca llega en el request.
8. La plantilla es versionada, fija y localizada; el caller no redacta el mensaje.

## Semantica de entrega

El flujo es **at-most-once**. Una reserva se realiza antes de llamar al proveedor. Si una entrega ya consta como enviada, una repeticion valida responde sin reenviar. Si queda reservada o falla, no existe reintento automatico: la reconciliacion es humana para evitar duplicados cuando el resultado del proveedor sea incierto.

## Auditoria metadata-only

La tabla `email_transactional_deliveries` conserva identificadores opacos, hashes, template, idioma, estado, codigo estable y timestamps. No guarda destinatario, cuerpo, sujeto Access crudo, ID de proveedor crudo ni error crudo del proveedor.

## Pruebas realizadas

Pruebas enfocadas:

```text
node --test test/email-review-ready*.test.mjs test/cloudflare-web-config.test.mjs
```

La cobertura incluye contrato exacto, campos prohibidos, kill switch, Access, allowlist, origen, rate limit, bindings faltantes, reserva D1, carreras de unicidad, duplicados, conflicto de payload, fallo del proveedor, cero reintentos y ausencia de binding activo en configuracion.

## Gate 6C.3B futuro

Gate 6C.3B es una operacion remota separada. Antes de un unico canary controlado debe:

1. verificar nuevamente la aplicacion Access y su audience exacta;
2. crear o seleccionar D1 aislada del canary;
3. aplicar y comprobar exclusivamente la migracion `0006`;
4. crear el binding de email con destino fijo;
5. crear el binding nativo de rate limit;
6. configurar fuera de Git la allowlist de hashes Access;
7. desplegar con el kill switch todavia en `false`;
8. ejecutar pruebas negativas remotas;
9. habilitar y autorizar exactamente un envio controlado;
10. volver a `false` y auditar D1 inmediatamente despues.

## Rollback

Antes de habilitar un canary, el rollback consiste en mantener o restaurar `AFW_EMAIL_REVIEW_READY_ENABLED=false`. Si el Worker no puede demostrar el cierre, se retiran la ruta y los bindings del canary. La tabla metadata-only se conserva para auditoria hasta una decision expresa de retencion; no se reintentan entregas fallidas.

## No habilitado

- envios a clientes;
- destinatarios arbitrarios;
- respuestas automaticas;
- newsletter o marketing;
- lectura de mensajes entrantes;
- adjuntos;
- CRM con datos reales;
- cobros o facturacion;
- acciones sobre sitios de clientes.
