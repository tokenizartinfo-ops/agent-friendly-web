# Confirmacion primaria de instalacion: recibo historico interno

La reserva y el intento conservan su autoridad y sus estados. Este componente agrega un recibo inmutable en su misma SQLite primaria: registra intento, propietario, aprobacion, digest de procedencia D1 y fecha de confirmacion. No crea otra autoridad ni cambia el presupuesto de un solo envio.

El host consulta D1 por un lector administrativo fijo, captura datos acotados sin getters ni propiedades ocultas y los compara con aprobacion/intento/reserva actuales. La observacion D1 precede la transaccion primaria: el recibo acredita esa correlacion historica y la reserva vigente al commit, no atomicidad DO-D1 ni estado eterno de D1. Una lectura ausente, ajena o revocada no confirma nada ni permite repetir el INSERT.

La idempotencia mantiene el recibo original y su fecha. Respuesta perdida: recuperar historia y contrastar otra vez D1; nunca reconstruir dispatch. Finalizacion y lectura operacional terminan con una comprobacion primaria despues del ultimo await externo. Una retirada durante esas esperas bloquea la respuesta aunque se haya guardado el recibo. Historia tras vencimiento o retirada se conserva para recuperacion, sin autorizar nuevas operaciones.

Las pruebas propias verifican identidad, concurrencia, perdida de respuesta, retirada durante observacion y despues del commit, historia tras vencimiento y reinicio de SQLite Durable Object nativo. El reader D1 de ese ensayo nativo es una fixture declarada; las pruebas D1 nativas independientes prueban su almacenamiento, no una instalacion remota integrada.

Fuente interna SIN MONTAJE: el recibo no habilita el catalogo anterior. Consumo serializado contra retirada, compensacion D1 propia, orquestacion y host real siguen pendientes. Despues: montaje cerrado con rollback actual, circuito propio PC-on, una ocurrencia alojada y el intervalo PC-off acordado. No cambia claves, correo a Max, permisos, cron ni datos de clientes.

La historia rechaza contradicciones aunque se recompute el checksum: una confirmacion no puede ser posterior a la retirada del intento ni de su reserva primaria. Recibos legitimos anteriores a la retirada se conservan. Revision independiente: reproduccion RED y correccion GREEN; formato compacto de algunas validaciones queda como mejora menor documentada.
