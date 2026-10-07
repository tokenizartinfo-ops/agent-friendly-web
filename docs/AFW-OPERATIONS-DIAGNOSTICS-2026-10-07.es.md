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

Comprobar adopción del cliente integrado en la fuente cloud sin reemplazar credenciales por inferencia. Primero baseline de autenticación contra servicio cerrado; luego comprobar cron propagado con resultado observable y ACK. Solo después revisar el pedido vigente y devolverlo a la interfaz. La invitación de Max y la prueba integrada con ordenador apagado siguen pendientes.

## Contraste y validación final

Un único GET de curl, con los mismos bindings del entorno y sin shell ni redirecciones, devolvió401JSON a las20:09:25.291Z. No se imprimieron argumentos, valores, headers ni cuerpo. Dos clientes HTTP distintos rechazados no sostienen la hipótesis de un fallo exclusivo de Node; tampoco prueban una clave incorrecta.

Cierre revalidado a las20:10:15.399Z: token deshabilitado/versión2, selector anterior restaurado, gerente cerrado/plazo vacío/D1 original verificada en ambos campos y cron vacío. Sin nueva lectura privada ni rotación.

PR322, fuente `86b91c2a73b4957d55cef4b778595b2d3450c936`, CI `37679652042` success: **1101 pruebas, 1101 aprobadas, cero fallos**. Revisión independiente sin hallazgos accionables. Esta validación acredita el cambio del cliente, no resuelve el rechazo remoto ni adopta automáticamente la fuente en Codex Cloud.

PR322 integrada a las20:11:19Z, merge `4d424cf2c1b117bf42069532f9ce19747e649078`. No requiere despliegue de la web pública para acreditar el CLI. La tarea cloud existente conserva su fuente08f47d9 hasta una adopción explícitamente verificada; no se hizo fetch/checkout para simularla.

## Relectura de configuración y suministro, 23:05–23:09Z

El editor existente no encontró duplicados, diferencias de nombre/destino ni asignaciones que sobrescriban las dos variables operativas en los campos y scripts del draft expuestos. `environment_variables`, `env` y `environment.env` no están expuestos; tampoco los scripts de la publicación. El resultado negativo tiene esa cobertura limitada y no descarta un conflicto oculto.

La tarea ordinaria reconsultó el estado soportado: observaciones actuales, red aplicada y ambos bindings operativos ready. La estructura no secreta de `/etc/codex/network-policy.json` tampoco expone los headers de suministro ni el modo de entrega. No puede certificar su coincidencia con los dos headers Access desde esta API. No encontró sobrescrituras en las definiciones locales examinadas; no acredita cobertura completa de setup/start.

No hubo nuevos HTTP, cambios de permisos, publicaciones, lecturas de valores o rotación. Las comprobaciones descartan algunas hipótesis visibles; no resuelven401 ni convierten readiness en autorización efectiva. Se solicitó preparar la adopción del merge4d424cf únicamente si el draft de este mismo editor admite edición soportada, preservando custodia y red; publicación y adopción siguen pendientes de respuesta y evidencia.

Preparación posterior en el editor: origin y árbol limpio verificados, avance fast-forward real a4d424cf y revisión anterior conservada en `afw-preparation-before-pr322-08f47d9`. Cinco pruebas de diagnóstico aprobadas allí. Esto acredita preparación de fuente; no adopción de la tarea ordinaria. El intento de guardar únicamente el selector fue rechazado con `CONFLICT / draft_not_editable`; relectura confirma draft revisión2/fuente08f47d9 intactos. La UI existente muestra «Entorno publicado». Requiere un nuevo borrador editable mediante Configuración → Codex Cloud → AFW Operations → Editar. No se creó ese borrador ni otra tarea, ni se publicó. Propuesta saneada preparada en el editor: cambiar exclusivamente `repositories[0].ref` de08f47d9 a4d424cf, conservar todos los otros campos.
