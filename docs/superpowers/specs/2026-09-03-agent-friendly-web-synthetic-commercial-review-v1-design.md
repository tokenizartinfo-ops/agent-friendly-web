# Agent Friendly Web Synthetic Commercial Review v1

**Estado:** diseno aprobado para implementacion local y prueba canary read-only

## Objetivo

Transformar la unica solicitud sintetica ya creada en canary en un plan comercial legible sin copiar datos personales, persistir CRM ni ejecutar acciones.

## Diseno

Un adaptador read-only consulta por constantes sinteticas del servidor y consentimiento `requested_plan`. El navegador no puede elegir contacto, dominio ni identificador. El adaptador deriva referencias opacas y entrega la metadata al planificador `agent-friendly-web.crm-lite.v1`.

La salida propone `new -> qualified`, pero conserva `persistenceEnabled=false` y `automaticActionsAllowed=false`.

## Seguridad y privacidad

- host, protocolo, metodo y ruta exactos;
- Cloudflare Access con audiencia esperada;
- hash de subject en allowlist;
- kill switch independiente apagado por defecto;
- D1 mediante prepared statement y solo lectura;
- sin email, nombre, texto libre, UUID fuente, secretos o credenciales en la respuesta;
- `Cache-Control: no-store, private` y `X-Robots-Tag: noindex, nofollow`;
- sin migraciones, correo, propuestas, pagos o cambios de sitios.

## Criterios de aceptacion

1. La bandera apagada responde `404` antes de identidad y D1.
2. Cualquier frontera distinta responde de forma saneada.
3. Solo el subject allowlisted puede leer la vista.
4. La fuente debe ser sintetica, `new` y tener consentimiento `requested_plan`.
5. La respuesta usa referencias opacas y no contiene PII ni UUID fuente.
6. La transicion es determinista y no persistente.
7. No cambia ningun conteo de D1.
8. Produccion y Tokenizart permanecen intactos.
