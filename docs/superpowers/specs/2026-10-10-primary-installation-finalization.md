# AFW: finalizacion primaria de instalacion, aditiva y cerrada

Fecha10oct2026. Autorizacion: continuidad delegada del ensayo propio. Depende PR377 D1 provenance. Plan padre Task3. Este bloque prepara fuente interna; no instala ni abre acceso remoto. No altera la identidad cloud aceptada ni cambia credenciales.

## Resultado

Guardar evidencia de finalizacion en la misma autoridad SQLite de reserva/intento, sin sustituir contratos historicos de prepared/write_started/withdrawn. El recibo aditivo retiene propietario, intento, pins completos, procedencia D1 y fecha; no se reescribe ni se entrega como permiso de ejecucion. Las lecturas operativas revalidan la reserva/intento y D1 contra fuentes administrativas actuales. Una lectura historica nunca otorga autorizacion.

## Limites y orden

El host resuelve D1 mediante la primitiva fija, sin parametros del consumidor ni callbacks constantes. La lectura es externa a la transaccion primaria: no existe atomicidad DO-D1. Capturar material acotado por descriptores antes de awaits. Verificar approval/provenance exactas contra aprobacion fijada, intent write_started y ownerRef/reservationSequence/approvalPinsDigest/deadline originales. La ausencia o revocacion devuelve pendiente/no disponible; ninguna ausencia permite repetir el INSERT.

Commit de recibo en UNA transaccion del primary existente que tambien controla reserva, recursos, diario e intento. Validar current pins y tombstones antes del commit; despues del ultimo await externo, validar de nuevo el primary antes de responder. Idempotencia conserva el recibo original y su fecha, nunca crea otro intento ni otro dispatch. ACK perdido se reconcilia por historia y lectura original D1. Concurrencia no crea dos recibos ni sobrescribe historia.

Retirada no borra recibo ni D1. Tombstone de reserva/intento domina cualquier recibo y fila tardia: bloquea nueva finalizacion/consumo incluso si D1 aparece despues. Revocacion D1 condicionada a procedencia propia; fallo o ACK incierto conserva pendiente de compensacion, sin reabrir permisos. Historia tras vencimiento disponible como evidencia, no como autoridad.

## Gate separado: consumo

Finalizacion no habilita automaticamente el catalogo antiguo ni sus callbacks. La admision debera serializar consumo contra retirada en el MISMO primary, fijando el punto de autorizacion; una retirada posterior no retrocancela una operacion ya admitida. Consultas D1 previas no prueban atomicidad distribuida ni estado eterno. Evaluar executor/catalog reales antes de escoger el contrato del consumo y no montar solo un recibo como si fuese permiso.

## Verificacion

RED previo: fila ausente/ajena/revocada; intent no iniciado; cambio de material durante lectura; retirada antes/durante/despues de observacion D1; fila tardia tras tombstone; vencimiento durante espera; ACK perdido con recibo original recuperable; dos callers/reader reiniciado conservan una sola fecha; recibo historico despues de cierre nunca habilita lectura operacional. Pruebas SQLite reales y composicion nativa proporcionadas. Revision final de toda la rama una vez; correccion unica RED-GREEN.

## Cierre operacional futuro

Wiring de originales reales y lector challenge, montaje CLOSED con rollback e inventario actuales, ensayo propio PC-on integrado, ocurrencia alojada acotada con identidad/presupuesto/disparador/chat/publicacion y cierre independiente, despues intervalo PC-off acordado. Ninguna fixture satisface esos gates. Invitation Max: preview, aprobacion y consentimiento, entrada directa expediente y copilot guiado.
