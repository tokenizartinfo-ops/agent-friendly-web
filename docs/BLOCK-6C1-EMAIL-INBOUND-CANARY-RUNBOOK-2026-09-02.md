# Gate 6C.1 - Email Inbound Canary Runbook

**Fecha:** 2026-09-02

**Estado:** preflight local listo; routing remoto sin configurar

## Proposito

Activar una recepcion minima y reversible para Agent Friendly Web. Este runbook no habilita envio, respuesta automatica, newsletter, lectura por agentes, D1, CRM ni RAG.

## Frontera obligatoria

Antes de cada lectura o mutacion remota se registra:

```text
PROJECT=Agent Friendly Web
REPOSITORY=tokenizartinfo-ops/agent-friendly-web
ENVIRONMENT=afw_email_inbound_canary
ORIGIN=agentfriendlyweb.dev
RESOURCE_TYPE=Cloudflare Email Routing + DNS
RESOURCE_ID=zone 4b1a3fe4b6dcb81e9d6a633174c5939f
ALLOWED_ACTION=read snapshot; verify one destination; enable inbound DNS; create three forward rules and one drop rule; run synthetic test
ROLLBACK=delete only created rules; disable routing DNS only if this gate created it; preserve metadata-only evidence
```

Si cambia cualquier campo, la operacion falla cerrada.

## Baseline verificado

La lectura saneada del 2026-09-02 observo:

- zona `agentfriendlyweb.dev` activa;
- Email Routing `unconfigured` y `enabled=false`;
- cero destinos registrados en la cuenta;
- cero reglas activas y un catch-all `drop` historico deshabilitado;
- cero registros MX aplicados al dominio;
- cinco registros de Email Routing propuestos por Cloudflare, aun no aplicados;
- sitio publico, canary web y recursos Tokenizart fuera de esta frontera.

La evidencia machine-readable vive en `docs/evidence/email-inbound-canary-baseline-2026-09-02.json` y no contiene la direccion privada de destino.

## Direcciones

### Activas en 6C.1

- `hello@agentfriendlyweb.dev`;
- `hola@agentfriendlyweb.dev`;
- `ola@agentfriendlyweb.dev`.

Cada una usa una regla literal `to` y una accion `forward` hacia el mismo destino privado verificado.

### Reservadas

- `auditoria@agentfriendlyweb.dev`;
- `seguridad@agentfriendlyweb.dev`;
- `bajas@agentfriendlyweb.dev`.

No se crean reglas para estas direcciones en 6C.1.

### Bloqueada

`no-reply@agentfriendlyweb.dev` usa una regla literal `to` y una accion `drop`. No se habilita catch-all.

## Orden de aplicacion

1. Releer settings, DNS, reglas y destinos.
2. Comparar la lectura con el baseline; detenerse ante MX ajenos, reglas activas desconocidas o cambio de zona.
3. Crear una unica direccion privada de destino si no existe.
4. Verificar el destino mediante el correo enviado por Cloudflare.
5. Confirmar por API que el destino contiene un timestamp `verified`.
6. Actualizar el baseline solo con `destinationPresent`, `destinationVerified` y `destinationId`.
7. Ejecutar `npm run email:inbound:preflight -- docs/evidence/email-inbound-canary-baseline-2026-09-02.json`.
8. Continuar solo con `ok=true` y `state=ready_to_apply`.
9. Aplicar los registros DNS propuestos por Cloudflare Email Routing.
10. Confirmar `enabled=true`, `status=ready` y ausencia de MX ajenos.
11. Crear tres reglas `forward`, una por alias activo.
12. Crear una regla `drop` para `no-reply@`.
13. Confirmar que catch-all continua deshabilitado y no existe accion `worker`.
14. Ejecutar la prueba sintetica.
15. Verificar el recibo metadata-only.
16. Actualizar los contratos publicos solo si todas las pruebas pasan.

## Dependencia humana

Cloudflare exige verificar el destino antes de utilizarlo en una regla `forward`. La verificacion se realiza desde la bandeja privada y no entrega su direccion, sesion ni credenciales al repositorio o al modelo.

## Prueba sintetica

Desde un remitente allowlisted diferente de la bandeja de destino:

1. enviar un mensaje sin PII, adjuntos ni secretos a cada alias activo;
2. usar un identificador opaco distinto por ejecucion;
3. comprobar una unica entrega por alias;
4. enviar un mensaje equivalente a `no-reply@` y comprobar cero entregas;
5. comprobar que no se envio respuesta;
6. comprobar que AFW no persistio cuerpo, headers completos ni adjuntos;
7. ejecutar `verifyEmailInboundCanaryReceipt` sobre un recibo local con conteos y booleanos.

Un remitente no allowlisted puede llegar a la bandeja por el mecanismo normal de correo, pero queda fuera del flujo asistido. Gate 6C.1 no introduce un Email Worker que lea, clasifique o descarte por remitente.

## Kill switch

El kill switch consiste en deshabilitar o eliminar las cuatro reglas creadas por este gate. Si el problema afecta al dominio completo y los MX fueron creados exclusivamente por 6C.1, se deshabilita Email Routing DNS despues de retirar las reglas.

## Orden de rollback

1. detener la prueba y no actualizar el contrato publico;
2. deshabilitar las reglas cuyos IDs figuran en el recibo de aplicacion;
3. eliminar solo esas reglas;
4. restaurar el catch-all historico deshabilitado sin cambiar su estado;
5. deshabilitar Email Routing DNS solo si el snapshot confirma que 6C.1 lo creo;
6. comprobar que los registros MX agregados por el gate fueron retirados;
7. conservar identificadores, timestamps, conteos y causa, sin cuerpos ni adjuntos;
8. devolver el contrato a `local_preflight_ready_remote_unconfigured`.

La direccion de destino no se elimina automaticamente: es account-scoped y podria utilizarse en otro dominio. Solo se elimina si fue creada por este gate, no tiene reglas dependientes y una decision especifica lo autoriza.

## Criterio de cierre

- destino verificado;
- tres aliases `forward` con una entrega cada uno;
- `no-reply@` descartado;
- catch-all deshabilitado;
- cero salida configurada;
- cero mensajes o adjuntos persistidos por AFW;
- rollback reproducible;
- evidencia y contrato publico alineados.
