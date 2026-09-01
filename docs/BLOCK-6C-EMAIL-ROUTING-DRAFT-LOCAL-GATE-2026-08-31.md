# Gate 6C - Email Routing and Draft Control v1

**Estado:** `planned_draft_only`, implementado localmente sin DNS, casillas, proveedor ni envio

**Fecha:** 2026-08-31

## Resultado

Agent Friendly Web ya puede probar de forma determinista como clasificaria metadata minima de un futuro correo y que borrador deberia preparar. No recibe mensajes reales, no lee cuerpos ni adjuntos, no persiste datos y no puede enviar.

La identidad canonica candidata es `hello@agentfriendlyweb.dev`. Los aliases de idioma y funcion convergen en una misma operacion para evitar bandejas aisladas y respuestas inconsistentes.

## Protecciones verificadas

- `no-reply@agentfriendlyweb.dev` rechaza entrada;
- cuerpos, HTML, adjuntos, headers y mensajes crudos se rechazan;
- campos desconocidos fallan cerrados;
- asuntos con secretos probables se rechazan;
- novedades requieren consentimiento `product_updates` separado;
- seguridad, privacidad, contratos, pagos, precios, reembolsos y disputas exigen revision humana;
- el `messageId` genera un plan idempotente estable;
- todos los planes declaran `draft_only`, `automaticSendAllowed=false`, proveedor ausente y DNS ausente.

## Evidencia TDD

El ciclo rojo verifico la ausencia inicial del modulo y del contrato. Los comandos focalizados son:

```text
node --test test/email-operations.test.mjs
node --test test/email-operations-contract.test.mjs
```

La verificacion integral se registra al cerrar el PR con `npm test`, `npm run lint` y `npm run build`.

## Superficies

- politica pura: `lib/email-operations.mjs`;
- contrato legible por maquinas: `public/.well-known/email-operations-contract.json`;
- especificacion: `docs/superpowers/specs/2026-08-31-agent-friendly-web-email-routing-draft-control-v1-design.md`;
- plan: `docs/superpowers/plans/2026-08-31-agent-friendly-web-email-routing-draft-control-v1.md`.

## No autorizado

Este gate no autoriza Cloudflare Email Routing, DNS, MX, SPF, DKIM, DMARC, una casilla, un proveedor de salida, reenvios, listas, datos reales ni mensajes. Cada recurso remoto y todo canary de envio requieren aprobacion separada, allowlist, kill switch, rollback y verificacion de reputacion.

## Siguiente gate remoto

1. Confirmar responsable humano y bandeja operativa de destino.
2. Elegir proveedor de salida y estimar costo real.
3. Preparar DNS como plan no aplicado.
4. Crear routing de entrada y remitente con aprobacion separada.
5. Probar solo con identidades allowlisted y mensajes sinteticos.
6. Mantener Codex en modo borrador hasta aprobar plantillas transaccionales concretas.
