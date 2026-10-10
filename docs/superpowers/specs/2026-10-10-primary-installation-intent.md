# Diseño Task3 — intento de instalación bajo autoridad primaria

Objetivo delegado: preparar un único ensayo propio recuperable, sin cliente/secretos nuevos/guardia, hasta permitir comprobar una ocurrencia alojada con PC apagada. Este documento desarrolla Task3 ya autorizado; no instala ni acredita operación remota.

Alternativas consideradas: mantener readProvisioning RPC dentro del catálogo (rechazada: no serializa retirada); introducir una supuesta transacción DO–D1 (rechazada: no existe); intento primario persistente y procedencia D1 con reconciliación (seleccionada). Coste: estados pendientes explícitos y lectura adicional en admisión; beneficio: incertidumbre no repite INSERT ni revoca propiedad ajena.

Primera entrega de fuente acotada: intento y transición primaria dentro de la misma autoridad/transacción que la reserva. No crear un segundo namespace/autoridad. Ligaduras: creationRef/baselineRef/ownerRef, reservationSequence, intentId generado internamente, approvalDigest, occurrenceId y deadline. Read-only histórico no es permiso. Un intento preparado nunca se sustituye por otro por vencer o perder ACK.

Begin valida la reserva primaria completa y vigente más pins actuales dentro de la misma transacción; genera identificador propio y guarda prepared. Repetición exacta devuelve el mismo intento; una reserva retirada o ajena no obtiene otro. markWriteStarted hace CAS de la secuencia prepared y guarda write_started antes de cualquier INSERT D1. Perdida ACK del cambio primario también requiere lectura original, no una segunda escritura D1. Un crash antes de enviar D1 conserva write_started: no se puede inferir ausencia de escritura posterior.

Retirada guarda tombstone del intento en la misma transacción que reserva/holds/journal y conserva identificador/propietario. Read vigente comprueba dueño/estado/ventana/pins tras awaits y commit; history conserva estado tras cierre. Aún no existe permiso de consumo desde prepared/write_started.

Segunda entrega: procedencia D1 propia con unicidad por occurrence/intento, escrita en batch transaccional con aprobación; lectura first-primary. Reconciliar compara aprobación exacta y procedencia, solo fila propia permite d1_observed. Ausencia/fila ajena tras envío incierto no permite repetir INSERT. Revocación condicional por propietario/intento conserva historia. No migrar D1 remota en esta preparación.

Tercera entrega: finalize primario por CAS con observación D1 independiente, vigente y ligada a intent/pins; no tener tombstone; publicación de catálogo como proyección. Admission primaria serializada respecto retirada para nuevas operaciones, manteniendo lectura histórica/cierre separada. No prometer que retirada deshace un efecto externo ya emitido.

Cierre exigido primera entrega: RED→GREEN idempotencia/competencia, retiro durante awaits/commit, reloj/vencimiento, pérdida ACK prepared/write_started, reinicio SQLite y tombstone compartido. Review independiente antes de integrar; suite completa tras cambios. Límite: estos estados no acreditan INSERT D1/instalación/consumo ni PC-off. Wiring real y fuentes actuales siguen gates separados. Sin intervención humana necesaria para fuente; ventana/PC-off se acuerdan únicamente al estar listo.

Procedencia: análisis cloud01a1221d/turn01a1270c-a9a1-73a5-832d-8c21a42b3666, original saneado en afw-installation-fence-cloud-review-original-20261010.json, contrastado con installer/catalog actuales del checkout local.
