# Intento de instalación primario, preparación interna

La reserva propia puede crear un único intento persistente mediante `beginInstallation`. Se conserva el identificador generado administrativamente, propietario, secuencia de reserva, referencia de aprobación y ventana. Repetir o perder la respuesta reconcilia ese mismo registro; no crea otro intento.

`startInstallationWrite` requiere el identificador y CAS de la secuencia preparada. La transición guarda `write_started` antes de entregar un locator efímero de primer envío. Ese locator solo se devuelve con la primera transición confirmada; lectura histórica, repetición o ACK incierto nunca reconstruyen un permiso para repetir el INSERT D1. No constituye por sí mismo autorización de instalación ni garantiza que D1 haya recibido nada.

Intento, reserva, recursos y referencias comparten la autoridad SQLite primaria. Retirar la reserva escribe también el tombstone del intento en esa misma transacción. El vencimiento y cambios de pins durante confirmación no devuelven locator, pero un commit ya realizado conserva el historial. No se borran o liberan recursos.

Los helpers son internos sobre el `tx` del productor, sin otro Durable Object ni transacción independiente. El productor valida su reserva y pins antes y después de operar. No hay nuevos handlers, rutas, bindings, recursos, migraciones remotas o credenciales por esta entrega.

Pruebas sintéticas propias verifican competencia, pérdida de respuesta preparada/iniciada, retiro, expiración, cambio de pins al commit y reinicio SQLite. No acreditan una recepción cloud real. La procedencia de aprobación D1 escrita atómicamente, reconciliación first-primary, finalización del catálogo y admisión serializada siguen como entregas siguientes de Task3; no afirmar transacción distribuida o instalación desde estos estados.
Tras la última lectura externa de pins, una nueva comprobación transaccional primaria contrasta reserva e intento, incluyendo la ocurrencia exacta. Ese es el checkpoint de admisión de la respuesta: una retirada previa impide devolverla; una posterior no cancela retroactivamente una admisión previa. D1 y su consumo aún necesitan los controles adicionales de las próximas entregas.
