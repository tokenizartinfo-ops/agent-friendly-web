# Constancia de revisión en el expediente

## Intención y alcance
Gabriel autoriza avanzar autónomamente los bloques AFW, sin pausas entre ellos. El usuario debe sentirse acompañado, con una acción principal y evidencia real. Este bloque devuelve exclusivamente metadata de una revisión operacional ya terminada. No lee respuestas privadas, no genera una respuesta personalizada, no resuelve ni publica cambios y no abre clientes/guardia.

## Canal
El productor privado consulta al receptor mediante service binding con firma de propósito separado y ventana finita. POST /assistance-reviews recibe solo eventId/projectRef exactos, inscritos. Devuelve una constancia exacta de run terminal o null; nunca contenido/identidad. Flag AFW_ASSISTANCE_FEEDBACK_ENABLED y secreto AFW_ASSISTANCE_FEEDBACK_SIGNING_SECRET independientes, cerrados por defecto. No consulta navegador ni credenciales del usuario.

El productor selecciona hasta tres delivery acknowledgements propios sin feedback. Recomprueba propiedad, tipo y payload del evento antes de insertar una constancia privada ligada a source_event_id. El INSERT condicional y la recuperación exacta evitan duplicados y colisiones. Un cambio de propietario impide escritura. Los recibos históricos no se borran ni significan permisos actuales.

## Contrato y pantalla
Constancia: version afw-assistance-review-v1, eventId, projectRef, revision, topic, runId, outcome reviewed/intervention_required/superseded, reviewedAt en milisegundos enteros. Fechas futuras/anteriores al pedido y campos extra se rechazan. API owner-scoped mantiene recibo received; opcional review solo con feature habilitada y fila correlacionada. Interfaz separa recibo de revisión y muestra fecha. No utiliza «respondido» ni «resuelto». Consulta manual disponible para recibos existentes; no polling permanente. Guidance enumerada de un paso y enlace a la sección ya existente, nunca texto privado inferido. Una constancia antigua no se presenta como revisión del expediente vigente.

## Cierre y reversión
TDD contrato, firma/correlación, aislamiento owner, pérdida de respuesta y retirada; prueba native workerd/D1 del circuito. Lint/build y suite completa. Despliegue cerrado primero, migración solo propia canary después de verificar identidad/rollback. Sin SQL producción ni nuevos permisos de clientes. Retirada: flags/deadline/cron/identidad cerrados; conservar journal/QA/custodia.
