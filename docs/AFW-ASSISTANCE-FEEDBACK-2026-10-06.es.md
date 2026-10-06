# Devolución de revisión al expediente

Estado vigente: PR305 integrado en c524ae83be26eef39a7749c9101b42f6f44532b8; CI37531123611 y main37531332561 pasaron986 pruebas/lint/build. Ensayo remoto propio y pantalla aceptados; cerrado y preservado. Los pendientes de preparación al final describen el estado anterior, no anulan esta aceptación.

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

Revisión del diff: se reprodujo una confirmación reasignada a otro evento (la prueba falló 1 frente a 0). Corregida rederivando eventId/projectRef con la firma original del evento antes de consultar/persistir; prueba corregida y workerd/D1 pasaron. La firma de feedback sigue separada. Las tres versiones de rollback anteriores son recuperables por API. PR305 y CI37530860992 en seguimiento; no afirmar integración mientras esté pendiente.

## Aceptación real propia y cierre

Cron preparado cerrado 21:09:38.522 UTC y ventana de feedback solo hasta21:29:38.625. Ayuda/dossier/gerente permanecieron false; no nuevas reservas ni token gestionado abierto. Firma independiente creada en custodia API, sin exportar valores, sobre fuente c524ae8 y versiones cerradas. SQL aplicado exclusivamente en origen privado canary; fuente confirmó revision3/1pedido/1ack y QA1run reviewed antes del ensayo.

Tail real scheduled21:10:12, eventTimestamp1791321029838, versión bd9a3c0f-e07d-4024-bf0f-2b016a3d22cb, outcomeok,0excepciones/logs. Constancia privada confirmed_at1791321030668, reviewedAt1791318312931, revision3/topicorientation/outcomereviewed, correlación ack1. Segunda invocación scheduled21:11:12 outcomeok; solo1fila, sin duplicados. Productor/receptor cerrados21:11:59, sin deadline/cron/sourceDB y D1 operacional original restaurada.

La primera comprobación de selector UI rechazó por diferencia respecto del expediente propio, sin mutación. Se verificó sesión tokenizart.info y recuperación del proyecto sintético, luego se seleccionó solo ese proyecto con ambos flags previamente cerrados y rollback al selector preservado en versión0f3a488b. No se habilitó ningún cliente. Interfaz real mostró pedido guardado, revisión fechada y «Seguir con una pregunta»; el enlace abrió la pregunta de idiomas. Consulta manual repitió el mismo recibo sin escribir. Captura local ignorada output/afw-feedback-own-accepted-20261006.jpg.

Web canary cerrado21:15:22, selector anterior restaurado, assets/custodia/DB conservados. Navegación directa a API fue bloqueada por el cliente de navegador: no interpretarla como status del servidor ni usar otro canal/cookies para sortearlo. La aplicación normal cerrada muestra de nuevo href dossier-assistant; no módulo de ensayo. Retirada service-read y exposición API cerrada fueron probadas nativamente; bindings remotos independientes comprobaron el cierre.

Postcheck21:17:40: productor b1ca47ec-2894-4186-a7be-c34ef6c8f6fc sin DB/ventana/cron; receptor bdd24209-bb94-48b5-a01c-c86e3fac01c6 con D1 original/flagsfalse; web canary c6aca9a8-bad4-4283-abb3-ac2a40d78fb6 con D1 canary/ambosflagsfalse, copilotfalse y selector restaurado. Al100%. No modificar estas constancias ni repetir el ensayo por los pendientes históricos.

Siguiente bloque separado: fuente cloud actual del cliente canónico; controles de revocación durante awaits del copilot existente y, más adelante, contexto privado consentido del gerente con identidad/purpose distintos. Metadata reviewed no equivale a respuesta personalizada o resolución; no guardia permanente ni invitación de Max.
