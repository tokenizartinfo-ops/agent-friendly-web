# Preparación del cierre por alarma

Proyecto AFW. Base eb65e0517c8c1685ad6ead022ef78a4a28037a95, PR334 integrada. Preparación local; no despliegue ni credencial administrativa.

El ciclo conserva un único plan y hasta tres pases de cierre. Guarda una alarma de recuperación antes de ejecutar capacidades externas. Una acción con respuesta incierta conserva su reserva; el pase siguiente consulta el estado primario y solo continúa cuando esa lectura confirma el resultado. La configuración repetida no cambia el plan ni renueva el presupuesto.

El último pase deja persistido `intervention_required` antes de actuar: si el objeto se reinicia o falla la escritura final, no queda mostrando progreso indefinido ni anuncia restauración. La revisión independiente detectó este caso P2; la regresión falló antes de la corrección y luego pasó. Otra prueba comprueba directamente estado y rearmado tras perder la escritura final, sin depender de una cuarta alarma.

El adaptador del Durable Object serializa los eventos con `blockConcurrencyWhile`. El entrypoint real está cerrado: devuelve 404 por HTTP y unavailable al armar/consultar, sin importar argumentos o valores del entorno. No contiene una restauración administrativa ficticia. Las capacidades completas solo existen en el ensayo propio sintético.

Pruebas focales: siete del ciclo más el coordinador y dos ensayos nativos workerd/SQLite. El ensayo nuevo observa dos alarmas reales, respuesta perdida, lectura confirmatoria y una sola ejecución por cada una de las tres acciones. No se ha comprobado reinicio remoto, apagado del ordenador o capacidad administrativa real. El resultado de CI del commit final debe registrarse antes de integrar.

Siguiente resultado operativo: componer la custodia administrativa independiente con recursos fijados y readback verificable, preparar rollback recuperable y alojar un único ensayo privado en Cloudflare. Solo después se puede probar el recorrido completo sin ordenador y preparar el correo de Max para aprobación. La adopción cloud actualmente aceptada sigue siendo c6b4f59/cecfgver_6ac7d4f7; una integración de código no cambia esa publicación.
