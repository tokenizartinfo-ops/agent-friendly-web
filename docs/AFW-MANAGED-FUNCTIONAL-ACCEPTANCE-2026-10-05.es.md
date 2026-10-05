# AFW: ciclo funcional con identidad gestionada

## Resultado comprobado

Tarea cloud normal `01a10e3b-05fe-72b1-aa51-24163557a012`, turno `01a10e48-deea-72d3-97c5-76ed099acd1a`. Fuente publicada `a4d90d438cb5ebca855e46637aff91ec45610b9f`, checkout limpio, observaciones actuales, red enforced y bindings ready. Se usó el permiso de ejecución de red aceptado en el recibo AFW-CLOUD-NETWORK-ACCEPTANCE-2026-10-05.es.md.

Los módulos reales `createOperationsClient` y `runNoticeCycle` realizaron GET `/notices/receipts` a las22:57:37.458UTC y GET `/notices` a las22:57:37.578UTC del5octubre2026: ambos HTTP200. Un wrapper rechazaba cualquier POST u otra ruta antes de la red.

Resultado: `reviewed`, decisión `close_obsolete`, motivo `producer_paused`, outcome `superseded`, reserva sintética `da244660-5e84-4616-ae03-057cd8314b65`. Una revisión terminal no se presenta como reparación, entrega ni nueva reserva.

## Alcance y cierre

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA sintética; ORIGIN operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Worker/Access/D1; RESOURCE_ID manager y D1QA `d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46`; ALLOWED_ACTION dos GET a evidencia sintética; ROLLBACK deshabilitar identidad, restaurar selector anterior y desplegar explícitamente manager cerrado con D1operacional original.

La identidad gestionada `1bf43326-9ad1-491a-8f04-ba92d777d724` se trasladó a la custodia secreta del binding servidor sin leer/imprimir valores. Ventana QA hasta23:08:04.140UTC. Antes y después: dos revisiones, una reserva, foreign_key_check vacío, sin escrituras. Ningún dato cliente, POST, claim, ACK ni correo.

Cierre final verificado independientemente: manager versión `cad834d6-1e90-4a90-8fa3-d1d028c876d1`, seis flagsfalse, deadline ausente, D1operacional original `603c471d-19bb-4530-9773-c02e18b29840`, token disabled y selector Access previo restaurado.

Se detectó que deploy con `--keep-vars` conservó el deadline de QA aunque los flags estaban cerrados. Un segundo deploy sin esa opción lo retiró; lectura API confirmó ausencia. Restaurar siempre settings efectivos y versión: ni el éxito del comando ni un cambio de versión acreditan por sí solos el rollback de bindings.

## Estado del tramo operativo

Aceptados: custodia gestionada, restauración de fuente en tarea normal, red de ejecución, handshake/withdrawal, lectura funcional de revisión terminal, esquema operacional aditivo, CSRF remoto y pruebas anteriores de scheduler/PCapagada. No repetirlos por rutina.

Pendiente: configurar y aceptar la cadencia operacional completa con esta identidad antes de habilitar guardia. La vigencia actual termina4noviembre2026 a22:09:32UTC (19:09Argentina), sin renovación automática. Cualquier ciclo programado necesita ventana, presupuesto, deduplicación, evidencia y retirada; un ACK no demuestra reparación. El cierre actual no es operación continua.
