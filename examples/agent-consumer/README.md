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
