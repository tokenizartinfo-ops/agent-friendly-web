# Devolución de revisión al expediente

Continúa la aceptación cloud real del pedido propio y el cliente canónico. Esta capa devuelve una constancia operacional; no una respuesta personalizada ni una resolución. Diseño y plan en docs/superpowers/specs/2026-10-06-assistance-feedback-design.md y docs/superpowers/plans/2026-10-06-assistance-feedback.md.

## Cambios

POST service-only /assistance-reviews, con firma HMAC separada por secreto/version/path y ventana finita. Permite solo referencias inscritas, lee una revisión terminal exacta y no expone owner/respuestas. Productor privado consulta hasta tres confirmaciones pendientes priorizando los pedidos recientes y vuelve a comprobar propiedad/tipo/payload/ack dentro del INSERT. Recupera respuesta perdida sin duplicar ni modificar expediente. Flags cerrados por defecto; sin polling de navegador ni nuevo cron.

SQL assistance-feedback-receipts.sql solo en origen privado: source_event_id, constancia exacta y confirmed_at. No copiar identificadores privados al ledger operacional. API GET ya autenticada conserva state received y añade review opcional solo con flag habilitado; valida la correlación con ack/pedido y revalida propiedad antes de entregar. Navegador recibe únicamente outcome/reviewedAt; rechaza fechas, resolución o contenido extra inventados.

Pantalla: fecha de revisión, un siguiente paso enumerado según el tema y consulta manual del último pedido. Una revisión de otra versión/superseded no orienta como actual. Reviewed/intervention_required no se presentan como respuesta/resolución ni actividad en curso. No afirmar que el gerente leyó datos privados.

## Evidencia local

986 pruebas globales pasaron; ensayo nativo workerd/D1 confirma recuperación de respuesta perdida, una constancia, aislamiento de otro owner, versión obsoleta y retirada sin borrar historial. Prueba adicional de retirada durante await pasó y bloqueó persistencia. Lint sin errores (dos advertencias previas), build y dos empaquetados Workers dry-run pasaron. El controlador Chrome detecta pestañas AFW pero la pestaña autenticada no respondió al control; no inventar aceptación visual.

## Despliegue cerrado y reversión

Recursos identificados por API en cuenta 85d0d5dadac3341a564f22ce885e9eec: productor agent-friendly-web-assistance-supervision-producer sin DB/cron, receptor agent-friendly-web-operations con D1 operacional original 603c471d-19bb-4530-9773-c02e18b29840, web canary con D1 propia 2b518988-eacb-4c31-b760-4e58c3c0285b. Todos los flags operacionales false/sin deadline.

Rollback productor 2d239047-dfca-44c1-b2c8-4b03de449dbe; receptor 2f46476f-d96b-44f6-9472-712c1c10c28e; web canary 805e0bbc-4512-4d33-9349-ee5ab6b85c82. Conservar custodia por inherit/keep-vars, D1 y recibos; cerrar flags/ventana/cron antes de seleccionar rollback y comprobar bindings efectivos. No DROP ni borrado.

Pendiente: integración CI y despliegue cerrado, luego SQL additive solo propia canary y aceptación real de feedback. Publicación/adopción cloud del cliente nuevo todavía separada. Contexto privado consentido y respuesta personalizada requieren servicio distinto; identidad operacional no adquiere permisos por este bloque. No cliente Max ni guardia permanente.
