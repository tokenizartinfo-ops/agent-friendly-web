# Una autorización de ejecución, persistente y ligada al propietario

La admisión para una nueva ocurrencia usa la misma SQLite primaria que reserva, intento, confirmación y retirada. Requiere una confirmación ya existente y una nueva observación administrativa de D1 con aprobación/procedencia exactas y sin revocar. No confirma ni instala implícitamente durante el consumo.

Solo el primer commit reconocido devuelve un localizador interno de dispatch. La fila de consumo conserva ID de admisión, fecha, propietario e identificación de la confirmación. Historial, repetición y respuesta perdida nunca reconstruyen ese localizador. Si se pierde el ACK, el presupuesto queda consumido y pendiente de recuperación; no se repite la ejecución ni se borra el presupuesto para intentarlo otra vez.

Retirar antes del checkpoint primario bloquea la admisión. Retirar durante la comprobación posterior al commit bloquea su respuesta y conserva el presupuesto gastado. Una retirada posterior al checkpoint no demuestra cancelación retrospectiva de un trabajo ya admitido; impide futuras admisiones. El runtime y cierre deben atender esa distinción.

La observación D1 precede la transacción primaria; no hay atomicidad DO-D1 ni garantía de que D1 nunca cambie después. Este localizador interno no es un bearer token ni una autorización HTTP. La orquestación debe utilizarlo únicamente como resultado del primer consumo reconocido y respetar la ventana y el cierre independiente.

La historia sobrevive vencimiento, retirada y reinicio. Se rechazan fechas incoherentes aun con checksum recalculado: consumo anterior a confirmación, fuera de ventana o posterior a retirada de reserva/intento. La historia nunca concede tareas nuevas.

Pruebas propias cubren tres consumidores concurrentes, ACK perdido, retirada durante D1 y después del commit, procedencia ajena/revocada, historia alterada y reinicio SQLite de Durable Object nativo. En esa composición, el lector D1 es una fixture explícita: no certifica instalación, procedencia cloud o ensayo remoto.

Fuente interna SIN MONTAJE. Recuperación y cierre propio tras vencimiento tienen contrato separado; no conectar el lector vivo al catálogo de cierre antiguo sin resolver esa integración. Sin cambios remotos, claves, cron, correo a Max ni datos de clientes.
