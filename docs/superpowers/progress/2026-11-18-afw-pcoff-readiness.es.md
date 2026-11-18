# AFW · Preparación de la prueba con el ordenador apagado

El 18 de noviembre de 2026 comprobamos en GitHub Actions un solo aviso sintético desde su registro en el expediente hasta la entrega al receptor de prueba, la consulta firmada del recibo y la retirada de la misma suscripción. La comprobación vinculó el aviso con la fila original mediante la proyección del identificador de AFW. Después de retirar la suscripción, el recibo seguía disponible y el proceso del laboratorio estaba cerrado. [Ejecución verificada](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44344076711)

La primera ejecución del recorrido se detuvo porque el test comparaba el ID interno con el ID del webhook. Se corrigió para comparar la proyección que AFW calcula de esa fila. La preparación inicial también pasó en ambas ejecuciones con respuesta 200 y aprobación 202 en workerd.

El HTTP 503 del recorrido integrado sigue abierto. La preparación que pasó usa la etapa inicial. La consulta que falló ocurrió en otra etapa del recorrido, después de preparar avisos, y el registro conservado solo muestra el vencimiento o la cancelación tras 30 segundos. La comprobación actual no ubica qué operación quedó pendiente.

La entrega y la revisión demostradas usaron una simulación del receptor y el lector firmado del propietario. Queda pendiente que el asistente en la nube procese ese mismo aviso en el entorno real y que se concilie la retirada y la restauración en esa misma prueba. La rama de laboratorio y sus dos ejecuciones están cerradas. Todavía no hay nada que Gabriel deba hacer.
