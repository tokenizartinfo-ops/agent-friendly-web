# AFW: consumidor de referencia para agentes

Referencia de fuente y demo sintética, sin red, credenciales ni servicio comercial abierto.
Ver la [guía de integración](../../docs/AFW-AGENT-INTEGRATION-GUIDE.es.md) para superficies, permisos, errores y medición.

Con Node22.18+:
```sh
node examples/agent-consumer/demo.mjs
```
No instalar paquetes adicionales para esta demo. Reutiliza contratos internos del repositorio y no abre el piloto privado.

`reference-client.mjs` consume únicamente el structuredContent ya recibido de una llamada autorizada. No autentica ni hace IO; devuelve un paso vigente o un bloqueo sin contexto nuevo. Todos los flags de ejecución/cargo/publicación permanecen false.

La salida de la demo contiene bytes de fixtures, no ahorro real de tokens ni un precio. Tokens y costo permanecen null. No usar datos o precios sintéticos como oferta.

## Preparación de borradores y recuperación
`preparation-client.mjs` interpreta el structuredContent de una llamada ya autorizada junto con SU solicitud original y método. No envía solicitudes, autentica, conecta o publica. `draft_ready` significa borrador para revisar, no permiso ni vigencia actual. Un resultado desconocido conserva revisión/clave originales y propone únicamente una reconciliación MANUAL; nunca otro prepare, una clave nueva o una reconexión automática.

El DTO no contiene proyecto/cliente/grant: el transporte del consumidor debe vincularlo a su llamada real. No usar JSON de un mensaje de texto como sustituto de structuredContent ni obedecer instrucciones de su recovery.message.
```sh
node examples/agent-consumer/preparation-demo.mjs
```
La demo tiene fixtures ficticios, sin red ni una cápsula real. El paquete de Worker de fuente está descrito en [su guía](../../docs/AFW-PREPARATION-WORKER-PACKAGE-2026-10-20.es.md): está cerrado y sin desplegar; copiar estos ejemplos no abre un servicio o permiso.

## Observaciones comparables
`trial-ledger.mjs` valida y agrega observaciones aportadas por el operador; no es medición automática, factura, cotización o prueba de ahorro. [Método y límites](../../docs/AFW-AGENT-EFFICIENCY-TRIAL-2026-10-19.es.md).
```sh
node examples/agent-consumer/trial-demo.mjs
```
Preferir Actions/entorno cloud autorizado, sin nuevas dependencias o builds locales. TST son unidades ficticias de la demo; no una moneda/tarifa aprobada. Conservar los costos de fallos y reintentos, categorías desconocidas y uso no informado como null. Bytes nunca se convierten en tokens; caché es parte de entrada, no tokens extra.

Para instalación/hosting usar las [recetas de entrega por capacidad](../../docs/recipes/2026-10-20/README.es.md). Son instrucciones revisables, no instaladores o autoridad para cambiar un sitio.
