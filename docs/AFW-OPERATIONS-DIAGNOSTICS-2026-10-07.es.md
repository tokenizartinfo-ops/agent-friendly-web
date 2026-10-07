# Diagnóstico operativo sin exponer credenciales

## Problema y comportamiento

El consumidor convertía rechazo HTTP, configuración ausente, transporte fallido y espera agotada en `Operational request unavailable`. El mensaje permanece igual por defecto. El modo opcional agrega exclusivamente categorías fijas y metadatos HTTP en stderr; stdout conserva el contrato normal de resultados. No habilita acceso, reintentos ni otro destino.

```sh
node --use-env-proxy scripts/afw-operations-client.mjs --diagnostics assistance-list
```

Ejemplo saneado de un rechazo:

```json
{"diagnostic":{"stage":"response","status":401,"format":"json"}}
```

La operación conserva exit1 y el mensaje habitual. Las etapas posibles son `configuration`, `transport`, `response`, `body` y `timeout`. El formato es `json`, `html` u `other`. No se leen cuerpos de error para diagnosticar, ni se imprime el content-type completo. Nunca aparecen credenciales, placeholders, headers, cuerpo, destino configurable o excepciones arbitrarias. Un callback defectuoso no modifica el resultado.

Un diagnóstico `response/status200` significa solo recepción de encabezados. No certifica validación del resultado, entrega, revisión ni reparación. Si el cuerpo queda bloqueado, la etapa posterior `timeout` conserva el fallo. El operador debe exigir el resultado canónico y la correlación con la revisión vigente.

## Evidencia de este bloque

- Pruebas nuevas fallaron antes de implementar; luego pasaron. Verifican no lectura de cuerpos de error, no fuga del mensaje de una excepción, callback aislado, ausencia de HTTP con configuración inválida, timeout/cancelación del cuerpo y CLI opt-in separado de stdout.
- Suite general: 1100 aprobadas, cero fallos, antes de agregar el caso final de CLI. Después: 18 pruebas específicas de cliente, asistencia, avisos y diagnóstico aprobadas. Lint: cero errores y dos advertencias existentes. Build terminado correctamente.
- Ensayo de autenticación separado, servicio cerrado: token existente versión2 durante diez minutos, selector exclusivo, sin abrir Worker/D1. GET cloud a las 19:54:03.974Z volvió a dar401JSON; no acredita acceso válido. Token deshabilitado y selector anterior restaurado inmediatamente después; no rotación de claves.
- Analytics GraphQL para el productor QA, ventana19:07–19:19Z: conjunto de invocaciones vacío, consulta sin errores. Esto refuerza la ausencia de ejecución observada; no certifica una causa específica ni sustituye ACK de entrega.
- Aplicación y destino Access coinciden; no existe otra aplicación devuelta para ese hostname. Configuración de organización `strict_service_token_auth=false`, conservada. No se debilitaron controles para intentar superar401.

La [documentación Cloudflare de métricas](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/) permite consultar invocaciones y errores del Worker. La [guía de credenciales de Cloudflare](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) explica los dos encabezados y renovación por duración. La [guía OpenAI de vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults) distingue permiso de red y permiso de suministro del secreto y exige pasar el placeholder sin transformarlo. Es una referencia técnica; no demuestra que la configuración particular de Codex Cloud haya inyectado correctamente sus dos valores.

## Siguiente aceptación

Integrar el cliente probado y comprobar adopción de fuente sin reemplazar credenciales por inferencia. Primero baseline de autenticación contra servicio cerrado; luego comprobar cron propagado con resultado observable y ACK. Solo después revisar el pedido vigente y devolverlo a la interfaz. La invitación de Max y la prueba integrada con ordenador apagado siguen pendientes.
