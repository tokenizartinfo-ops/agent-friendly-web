# Task3 siguiente entrega — procedencia D1

Depende de la intención primaria aceptada; no afirmar finalización, montaje o admisión por este componente. Mantener la unicidad de intent y presupuesto de envío en el primary: un método D1 no puede saber por sí solo si un INSERT anterior aún está en vuelo. Leer ausencia nunca permite repetir.

Fuente existente: assistance-occurrence-approvals approve usa INSERT normal sin propietario; read first-primary al envolver db; revoke solo occurrenceId/reason. approvalValues incluye19 campos; approved_plans y revocations son inmutables y tienen triggers de correlación con supervision event. Mantener esos campos y sus restricciones; no adoptar fila existente por mera igualdad.

Diseño mínimo a completar: tabla OPT-IN assistance_private_installation_provenance, occurrence_id FK/PRIMARY KEY y intent_id UNIQUE; owner_ref/baseline, reservation_sequence, approval_pins_digest, approval_digest, deadline. Singleton de versión independiente y triggers noUPDATE/noDELETE. Batch transaccional aprobación+provenance: si falla cualquier statement no debe quedar aprobación huérfana ni provenance tardía. No anotar propietario después de INSERT.

Factory administrativa interna sin HTTP toma db y fuentes propias actuales (pins/intento), entradas no originan autoridad. Writes solo al primer envío concedido por primary y nunca reintentan; ACK incierto queda pendiente afuera. read first-primary devuelve aprobación+provenance exactas para comparación primaria. Revocación INSERT SELECT condicionada por todos los pins de propietario/intento/provenance y approval, no solo occurrenceId. Read históricamente revocada queda separada de admisión.

RED antes de implementar: esquema viejo/opt-in ausente, intent ajeno/coherente wrong occurrence, batch falla tras primer statement, duplicados, ACK perdido luego commit conservando una fila y reconciliación sin segundo write, fila ajena no revocada, UPDATE/DELETE prohibidos y historia recuperable con D1 nativo. No nueva migración REMOTA; nueva SQL local aislada y rollback material se evalúan recién para montaje cerrado.

Una igualdad de digest no es firma ni prueba de dueño; la procedencia la origina el writer administrativo fijado y sus permisos. No claim de atomicidad DO-D1. Finalización/catalog projection y consume admission siguen entrega siguiente, con tombstone primaria dominante sobre fila tardía.
