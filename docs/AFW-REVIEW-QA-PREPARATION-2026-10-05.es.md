# Preparación de QA privada de revisión — 5 de octubre de 2026

## Alcance autorizado y recursos

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=QA sintética de revisión. Cuenta85d0d5dadac3341a564f22ce885e9eec, zona agentfriendlyweb.dev4b1a3fe4b6dcb81e9d6a633174c5939f, comprobadas antes de preparar recursos. Fuente base mainbc5892601d0a4ee9d95d16cb8a5253d1c3d61848; PR262/CI37343186122/890pruebas.

Recursos previstos: D1 nueva agent-friendly-web-review-qa-20261005, Worker nuevo agent-friendly-web-operations-review y aplicación Access nueva para operations-review.agentfriendlyweb.dev. Inventario previo confirma ninguno existente. La D1 operativa603c471d queda excluida de esta preparación; no copiar sus registros ni expedientes.

ALLOWED_ACTION: crear almacenamiento QA vacío, instalar únicamente esquema operacional completo aditivo y fixture sintética; publicar Worker cerrado y sin ruta pública; preparar Access propio inicialmente deny-everyone. No crear permiso de servicio, ampliar apps existentes, modificar producción web/operativa, abrir revisión ni asignar subject inferido de un correo.

ROLLBACK: Worker con REVIEW_ENABLED=false/REVIEWS_ENABLED=false, sin deadline, cron, workers.dev o previews; conservar D1/historia y Access deny-everyone. No DROP/DELETE ni retirada de registros históricos. Si alguna preparación queda incompleta, mantener el cierre y registrar exactamente los recursos creados. La apertura humana tiene su matriz separada en AFW-REVIEW-ACCESS-ACCEPTANCE-PLAN-2026-10-05.es.md.

## Criterios de preparación

Verificar ID/nombre de la D1 antes de SQL remoto, instalación íntegra de triggers y foreign_key_check; solo datos sintéticos. Config QA debe ligar exactamente esa D1 y mantener todos los controles cerrados. Verificar versión/bindings/desactivación de workers.dev y ausencia de cron/rutas. App Access propia cerrada, sin token receptor ni policy de bypass. Identidad privada y permiso mínimo se preparan antes de solicitar login real; no anunciar aceptación humana desde este bloque.

## Evidencia

D1 creada y verificada: d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46, nombre agent-friendly-web-review-qa-20261005. Antes de instalar: cero tablas operations. Esquema completo instalado por archivo, sin dividir triggers; foreign_key_check vacío. Fixture: una reserva superseded, cero reviews y ambos triggers no_update/no_delete presentes. Solo referencias y datos sintéticos.

Access creada: f3db3135-0f6f-4910-9b72-e592f0fd6389, origen operations-review.agentfriendlyweb.dev, duración10m, launcherfalse/WARPfalse. Policy8635dbc5-503f-4232-ad2e-ee00e97e6e72: deny/everyone. No permiso humano concedido.

Config `wrangler.operations-review-qa.jsonc` liga únicamente la D1 sintética y namespace propuesto2026100503, flagsfalse y sin rutas/deadline/cron. Prueba específica verifica aislamiento frente a la config operativa; cuatro pruebas Worker pasan. Dry-run Wrangler4.128 acepta bundle74.20KiB y bindings cerrados. Namespace distinto en repo no acredita todavía unicidad en toda la cuenta.

Config integrada PR263/source8bcbd2ae/main47946f45; CI37350314160 correcto. Deploy cerrado observado: Worker agent-friendly-web-operations-review, versión7f155576-199c-4eb2-b764-0f1cb7fd39d5,100%, deployment07f66aa3-42b2-4ad5-9def-e403ce98d53c. API verifica flagsfalse, únicamente D1QA d43b321d, binding10/60 namespace2026100503, workers.dev/previewsfalse, schedules[] y cero rutas vinculadas. Access conserva deny/everyone. Sin deadline ni identidad/pin privada. Este runtime no permite todavía un ingreso humano ni acredita limitador remoto ejercitado; su configuración cerrada es el rollback de partida.
