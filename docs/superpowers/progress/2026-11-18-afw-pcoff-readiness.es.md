# AFW · Preparación de la prueba con el ordenador apagado

Estado comprobado el 18 de noviembre de 2026 a las 15:59 UTC.

El controlador quedó conectado a cinco comprobaciones existentes de AFW en una rama de laboratorio. GitHub Actions verificó la suscripción, el recibo de entrega, el reconocimiento de una revisión, la retirada y la evidencia de cierre por separado. Los cinco procesos terminaron en orden y entregaron un resultado válido. La rama quedó cerrada y las dos ejecuciones están terminadas.

La primera ejecución se detuvo antes de validar el primer caso. El controlador usaba un nombre de opción incompatible con la versión fijada de Node. Tras corregirlo, la segunda ejecución verificó los cinco casos. [Ejecución corregida](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44341758747)

El controlador verifica componentes con datos sintéticos. Queda pendiente acreditar que el mismo aviso se recibe, se procesa con un resultado útil y se retira en un solo ensayo en la nube. El último recorrido integrado observado devolvió HTTP 503 en la consulta de preparación. La causa sigue abierta y la comprobación por componentes no modifica ese resultado. El diagnóstico anterior sigue sin habilitarse para ejecución.

Antes de coordinar el ensayo con el equipo apagado, falta validar ese tramo integrado, comprobar la candidata y su reversión, y preparar la única ventana del expediente sintético. La prueba final sigue pendiente y este avance no requiere intervención de Gabriel.
