# AFW: red cloud y custodia gestionada comprobadas

## Alcance y procedencia

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, tarea cloud normal `01a10e3b-05fe-72b1-aa51-24163557a012`, entorno publicado AFW Operations. Checkout limpio de la fuente publicada `a4d90d438cb5ebca855e46637aff91ec45610b9f`. Esta aceptación no cambia el runtime público ni acredita guardia permanente.

## Diagnóstico

Tras finalizar setup, `environment_status` confirmó observaciones actuales, política `enforced` y ambos bindings Operations `ready`. Las primeras peticiones con `exec_command` bajo permisos predeterminados fallaron sin respuesta HTTP. Una consulta anónima diagnóstica capturó `TypeError`, causa `EPERM`.

El runtime cloud permite solicitar permiso adicional de red de ejecución mediante `sandbox_permissions: with_additional_permissions` y `additional_permissions.network.enabled: true`, o su mecanismo soportado de permisos. Con ese permiso desapareció `EPERM`. Se mantuvieron la política administrada restringida, proxy heredado, CA y validación TLS. No se amplió la lista de destinos ni se evitó el sidecar.

Esta sintaxis corresponde al executor cloud observado: no trasladarla a herramientas locales cuyo schema o política la prohíba. Consultar siempre el schema e instrucciones del executor actual.

## Evidencia HTTP real

Todas las horas son UTC del 5 de octubre de 2026. Solicitudes GET, redirects manuales y timeout de 10 segundos; resultados saneados, sin valores de credenciales ni cuerpos HTML.

| Hora | Consulta | Resultado |
| --- | --- | --- |
| 22:50:10.444 | Anónima con permiso de ejecución | 401, text/html |
| 22:51:04.974 | Autenticada, identidad gestionada habilitada temporalmente | 404, application/json, `unavailable` |
| 22:51:56.189 | Mismos bindings tras retirar permiso | 401, text/html |

Destino: `https://operations-manager.agentfriendlyweb.dev/api/operations/notices/next`. El 404 JSON acredita paso por Access y cierre administrativo esperado; no acredita un ciclo funcional de revisión o entrega. El 401 posterior acredita retirada efectiva en la siguiente consulta.

## Cierre y siguientes controles

La identidad gestionada `1bf43326-9ad1-491a-8f04-ba92d777d724` quedó deshabilitada. La política dedicada volvió al selector previo `d12150c5-ba69-412e-bed0-6415103fc2ec`. El gerente permaneció cerrado durante todo el ensayo; no hubo POST, claim, ACK, SQL, correo ni datos de clientes.

Para futuras tareas: comprobar observaciones actuales/enforced/ready, solicitar permiso de ejecución de red cuando el schema lo requiera y conservar proxy/TLS. `unknown` no significa claves incorrectas. Capturar códigos de error saneados desde el primer intento; nunca imprimir mensajes/stack/objetos que puedan contener secretos.

Pendiente separado: ciclo funcional sintético con esta identidad gestionada y lifecycle operativo antes de habilitar cualquier cadencia permanente. No repetir la prueba de PC apagada ni la aceptación CSRF ya realizadas.
