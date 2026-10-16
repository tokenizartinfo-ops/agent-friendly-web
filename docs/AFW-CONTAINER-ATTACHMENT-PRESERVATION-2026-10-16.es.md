# Conservación del enlace entre Worker y Container

## Problema y evidencia

El 16 de octubre, la actualización real del complemento llegó a `events/list`, pasó la autorización primaria y alcanzó el actor nativo. La captura saneada mostró `native_runtime_check` seguido de `native_failed`, sin `native_runtime_ready`. HTTP 200 era el envoltorio RPC; no demostraba un catálogo válido.

La aplicación de Containers existía y apuntaba al namespace correcto. Sin embargo, la versión nueva del Worker no incluía `containers`. La versión histórica `bc733176` sí declaraba la clase `AfwOwnEventNode` y su aplicación `agent-friendly-web-delegated-canary-afwowneventnode`. La existencia de una aplicación en la cuenta no acredita su enlace con una versión publicada.

El publicador cerrado solo admitía la ausencia de Containers y no copiaba esa declaración. El observador de activación también exigía una lista vacía. El fallo era una incompatibilidad de nuestro contrato de publicación con la configuración que el runtime necesita. Esto no demuestra que todos los fallos anteriores tuvieran esta causa ni que falte un método concreto en la plataforma.

## Corrección acotada

- `snapshotOwnWorkerExecution` admite únicamente la clase y el nombre propios comprobados; también conserva los exports `default` y `AfwNodeControl` cuando ambos están declarados. Rechaza clases ajenas, duplicados, cambios de storage, tombstones y opciones no contempladas.
- La publicación conserva un attachment existente. Envía `containers: [{class_name: 'AfwOwnEventNode'}]`: el nombre de la aplicación devuelto por la API es de lectura. Comprueba la declaración completa en el readback; su pérdida impide confirmar la versión.
- El hash de configuración incluye exports y attachment. El observador compara esta configuración con la versión y el despliegue realmente leídos.
- Una base cerrada sin attachment sigue sin attachment. Esta corrección no crea una aplicación ni la conecta por inferencia: reparar una base incompleta exige una operación separada y explícita sobre el canary cerrado.

No cambia autorización, permisos, TTL, custodia, presupuesto global, comprobaciones del runtime ni política de arranque. No migra o recrea namespaces ni borra datos. No inicia Node, suscripciones o cron.

## Validación y siguiente paso

Seis regresiones fallaron antes de implementar la corrección; las doce pruebas dirigidas pasaron después. Una revisión independiente reprodujo las doce y no encontró P1/P2. La suite completa, lint, build y CI se registran en la continuidad de la entrega; no extrapolar su resultado desde las pruebas dirigidas.

La reparación remota debe partir de la versión cerrada comprobada, conservar módulos/bindings/secretos por referencia, adjuntar exclusivamente la clase existente y comprobar el mismo namespace/aplicación, ocho flags desactivados, cron vacío y ausencia de procesos activos. Su rollback es la versión cerrada previa, sin borrar historia.

La aceptación de metadata no demuestra que el catálogo funcione. Después hace falta una ventana nueva y coordinada de lectura/avisos, un catálogo real y su resultado cloud. Alta, entrega útil, retirada y ensayo con el ordenador apagado siguen siendo aceptaciones distintas. No se envía correo al primer cliente desde este bloque.

Fuentes primarias: [API de Containers en Durable Objects](https://developers.cloudflare.com/containers/api/durable-object-container/) y esquema oficial Cloudflare `POST /accounts/{account_id}/workers/workers/{worker_id}/versions`, campos `containers` y `exports`, consultado el 16 de octubre de 2026.
