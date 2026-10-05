# AFW: journal operacional instalado con servicios cerrados

5octubre2026. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT operaciones cerradas; RESOURCE_TYPE D1; RESOURCE_ID603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION instalar exclusivamente worker/operations/notice-reviews.sql aditivo, ya integrado y aceptado en workerd. ROLLBACK conservar esquema/historia y controles cerrados; nunca DROP/DELETE.

Inventario previo API: receptor, manager, productor y watchdog propios con todos los flagsfalse/deadline ausente. D1 ya tenía inbox/reservas pero no reviews. SQL íntegro ejecutado mediante Wrangler --file, sin separar triggers por punto y coma. Creó una tabla y dos triggers; las escrituras reportadas por D1 son de esquema, no decisiones ni datos copiados de QA.

Conteos antes/después: eventos16, incidencias2, investigaciones2, checkpoints2; watchdog/outbox/inbox/reservas0. Reviews0 tras instalación. Ambos triggers operations_notice_reviews_no_update/no_delete presentes, PRAGMA foreign_key_check vacío. No se ensayaron UPDATE/DELETE sobre datos operacionales: su comportamiento está aceptado en D1/workerd sintético. Ningún Worker/config/policy/secret fue habilitado para instalar el journal.

Antes de abrir consumo preservar AFW_OPERATIONS_REVIEWS_ENABLED=true mientras haya historia, separado del cierre de escritura humana. La instalación no acredita avisos reales, reservas, aprobación humana, reparación o guardia permanente. Sigue identidad estable/custodia y cadencia acotada correlacionada; no extender el piloto actual ni repetir aceptaciones previas.

## Preparación de custodia estable (disabled)

Creada mediante API en cuenta85d0d5dadac3341a564f22ce885e9eec la identidad exclusiva AFW Operations Managed20261005, ID1bf43326-9ad1-491a-8f04-ba92d777d724, enabledfalse, vigencia720h hasta2026-11-04T22:09:32Z. No se asoció a ninguna política ni se cambió binding servidor/cloud. Respuesta inicial saneada; secreto descartado, no almacenado ni mostrado. El owner deberá rotar y cargar valores directamente en los campos privados existentes cuando se prepare el handoff. Esto no renueva el piloto ni habilita capacidad alguna. Baja/rollback: mantener disabled y selector ausente; historial intacto.
