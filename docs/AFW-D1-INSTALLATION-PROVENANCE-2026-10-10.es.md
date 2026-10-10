# Procedencia de instalación D1, componente interno

La aprobación y su procedencia se escriben en un único `db.batch` transaccional. La tabla opt-in conserva ocurrencia, intento único, propietario único, secuencia de reserva y digests de pins/aprobación. Si falla cualquier statement, no queda aprobación huérfana. No se adopta una fila previa, aunque coincida con la aprobación.

Se mantienen schema2/fence1 existentes; el writer requiere también la versión privada y sus cinco triggers de protección. La migración es aditiva y LOCAL, aún no aplicada remotamente. El vencimiento se comprueba tras la última consulta previa y en el reloj de D1 antes de insertar procedencia; un batch fuera de ventana se revierte entero. Las filas y la versión privada no permiten UPDATE/DELETE.

La lectura usa sesión `first-primary` cuando existe y recupera aprobación, procedencia y retirada en una sola consulta. La revocación está condicionada por los campos exactos de propietario/intento/pins; una fila ajena no se toca. El historial persiste después de revocar.

`createPrivateInstallationD1` es una primitiva administrativa interna sin montaje. Material válido, hashes o igualdad de datos no acreditan autoridad. El caller debe resolver inscripción, intento y presupuesto en el primary real; solo el primer envío concedido puede llamar al writer. Ante ACK incierto se consulta y conserva pendiente: una ausencia no permite repetir una escritura posiblemente en vuelo. Esta capa D1 no puede garantizar por sí sola ese presupuesto ni confirmar un tombstone en otro Durable Object.

Pruebas propias SQLite/D1 nativo verifican esquema cerrado/incompleto, rollback batch, ACK perdido, reinicio y revocación propia. Son sintéticas, sin datos de Max ni recursos nuevos. Finalización primaria, proyección del catálogo, admisión serializada y wiring real permanecen pendientes antes de PC-on integrado y una ocurrencia PC-off acordada. No hay transacción distribuida ni instalación real acreditada.

El writer y la revocacion capturan una copia inmutable de descriptores de datos antes de cualquier espera. Se rechazan getters, simbolos, propiedades ocultas, prototipos especiales y material fuera de limites; validacion, INSERT y reconciliacion usan la misma copia. La proteccion por version y nombres de triggers es un guard de migracion operativa, no atestacion criptografica del administrador D1.
