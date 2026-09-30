# Entrega integral controlada y publicación de la corrección

Evidencia observada el 2026-09-30. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, origen productivo `https://agentfriendlyweb.dev`. Ensayo sintético del owner; no acredita entrega a un cliente externo ni publicación en el apex de AFW.

## Recorrido comprobado

Se creó un expediente separado desde la sesión autenticada. Objetivo confirmado: explicar productos o servicios; recurso revisado: `llms.txt`. Se verificó el dominio temporal mediante archivo HTTP, se preparó y revisó el contenido, se descargó el paquete exacto y se aprobó desde la interfaz. No se completaron datos desconocidos por inferencia.

Cápsula `ca9bca3a-dc55-43df-be1b-988ac9b6ab97`, v1; manifiesto `4acca65760b66a136b82b0fde466d3db64b819db4e9f533901b6e2ab847afc20`. Archivo `/llms.txt`, 685 bytes, SHA-256 `56018463c521f19b47e46613c43470b488dbdcaadb35e45233af61c568d61b1d`.

La misma cápsula descargada se instaló en `delivery-qa.agentfriendlyweb.dev`, Worker temporal AFW sin datos de clientes. La auditoría guardada pasó de 9/100 a 17/100 (+8), ambas AF0: la mejora puntual no acredita otros niveles. La comparación previa de las 20:28:56 UTC mostraba ausencia. La comparación posterior de las 21:03:18 UTC mostró «Sin cambios» y el hash coincidente. Se recuperó esa lectura después de recargar la interfaz. D1 conserva ambas comparaciones con el mismo manifiesto y dos IDs diferentes.

El dominio temporal y el Worker `agent-friendly-web-delivery-qa` fueron retirados después del ensayo; consulta de dominios confirmó cero coincidencias. El expediente y las evidencias fechadas permanecen. Una lectura futura del dominio retirado no debe interpretarse como el estado de este ensayo.

## Fallos corregidos y procedencia

PR [#126](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/126), source revision `d4039084abee1eb06a19cff6504a72d4986e5225`. Antes, una consulta nueva devolvía siempre la primera comparación de la cápsula. Ahora crea una lectura fechada; repetir la misma clave mantiene idempotencia. Los planes técnicos solo se muestran para la comparación exacta que los sustenta, sin borrar planes anteriores.

Migración remota `0010_origin_comparison_history.sql`: retira el índice único cápsula/manifiesto y agrega índice de historial. Conserva filas, columnas y la unicidad de claves de idempotencia. Bookmark D1 previo `000000db-00000000-000050f6-af2301194adc4dde5a33631d2b818b58`; no autoriza restaurar toda la base y perder escrituras posteriores.

Build CI [36776414214](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/36776414214), artefacto de esa revisión. Worker version `6fa4148c-8d5f-4f6b-93e9-23f79c256726`, deployment `03b744e6-046d-4200-a101-eb5bd02f4677`, 100%. Rollback de código: `a80261b2-29ba-4165-af54-3ceb3fe41df5`; conservar la migración y el historial, no reconstruir el índice único después de nuevas lecturas.

Validación: 605/605 pruebas; lint sin errores y una advertencia previa de imagen; build y TypeScript correctos; CI de PR y main correctas; 11 comprobaciones públicas antes de promoción y 11 después. Aceptación privada descrita arriba. La captura posterior falló en el navegador; la evidencia de cierre es la interfaz leída y los registros D1, no una captura inexistente.

La configuración conserva el copilot únicamente en el expediente piloto, límite compartido 5 consultas/60 s por usuario y ejecución remota deshabilitada. La lista acotada de hasta diez proyectos queda preparada, sin ampliación productiva. Procedimiento: [operación de beta](AFW-BETA-OPERATIONS-2026-09-30.es.md).

## Continuidad

MA-06 cerrado para recorrido integral sintético con la misma cápsula. MA-07 continúa pendiente de escritura cruzada remota y retirada verificadas con la segunda identidad. Se pidió autenticación al owner; no solicitar credenciales ni reutilizar cookies fuera del navegador. Mantener la pestaña anterior cargada para intentar guardar desde la nueva identidad y comprobar que D1 no cambia. No afirmar esta prueba realizada por una simulación local.

Tras MA-07: retirar política QA preservando owner/datos, preparar habilitación explícita de beta acompañada y primer cliente. No confundir procedimiento preparado con invitación, scheduler, notificación externa o presupuesto monetario ya activos.
