# Agent Friendly Web Email Routing and Draft Control v1

**Estado:** especificacion local aprobada para implementacion; correo, DNS y envio remoto deshabilitados

## Objetivo

Definir una frontera determinista para clasificar correo futuro de Agent Friendly Web y preparar borradores sin entregar al modelo credenciales, cuerpos completos, adjuntos ni capacidad de envio.

## Identidad propuesta

- `hello@agentfriendlyweb.dev`: direccion canonica universal.
- `hola@agentfriendlyweb.dev` y `ola@agentfriendlyweb.dev`: aliases por idioma.
- `auditoria@agentfriendlyweb.dev`: solicitudes de auditoria y planes.
- `seguridad@agentfriendlyweb.dev`: incidentes y abuso.
- `bajas@agentfriendlyweb.dev`: retiro de consentimiento y preferencias.
- `no-reply@agentfriendlyweb.dev`: candidato exclusivo de salida; rechaza entrada.

Estas direcciones son candidatas hasta que un gate remoto separado verifique DNS, routing, proveedor, SPF, DKIM, DMARC y reputacion.

## Frontera de datos

La funcion de planeamiento recibe solo metadata minima: identificador del mensaje, remitente, destinatario, asunto acotado, idioma, finalidad y consentimientos canonicos. Rechaza cuerpos, HTML, adjuntos, mensajes crudos, cookies, tokens y secretos probables.

No persiste ni envia. El `messageId` normalizado actua como clave idempotente para producir el mismo plan ante el mismo evento.

## Clasificacion

Los aliases convergen en una operacion con colas logicas `general`, `audit`, `support`, `security` y `privacy`. La finalidad y el asunto pueden elevar el caso a revision humana, pero no reducir las protecciones de un alias sensible.

Requieren revision humana obligatoria: seguridad, pagos, precios no catalogados, contratos, plazos comprometidos, reembolsos, impuestos, disputas, datos sensibles, publicacion de casos y acciones sobre sitios de clientes.

## Consentimiento

- Una respuesta transaccional a una solicitud expresa puede generar borrador sin consentimiento de marketing.
- Newsletter y novedades requieren consentimiento `product_updates` separado.
- Solicitar un plan no suscribe a marketing.
- Retirar consentimiento se enruta a privacidad y siempre requiere control humano hasta que exista un flujo de baja probado.

## Salida segura

Todo plan declara:

- `sendMode: draft_only`;
- `automaticSendAllowed: false`;
- `emailProviderConfigured: false`;
- `dnsConfigured: false`;
- estado de consentimiento y revision;
- cola y plantilla sugeridas;
- limites y acciones bloqueadas.

No existe ruta HTTP publica ni integracion de proveedor en este gate.

## Criterios de aceptacion

1. Todos los aliases validos normalizan hacia una identidad operativa unica.
2. `no-reply` rechaza correo entrante.
3. Cuerpos, adjuntos y secretos probables fallan cerrados.
4. Marketing sin consentimiento queda bloqueado.
5. Asuntos sensibles requieren revision humana.
6. El mismo `messageId` produce el mismo identificador de plan.
7. El contrato publico describe la capacidad como `planned_draft_only`, nunca como correo desplegado.
8. Ninguna prueba realiza red, DNS, persistencia ni envio.

## Gate remoto posterior

Crear routing de entrada, remitente, proveedor y canary de salida exige una aprobacion separada. Debe comenzar con allowlist, mensajes sinteticos, kill switch, recibos metadata-only y rollback probado.
