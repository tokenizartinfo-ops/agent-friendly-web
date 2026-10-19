# Invocación administrativa cloud de AFW — diseño19oct2026

## Propósito y decisión
Permitir invocar una publicación cerrada desde la API administrativa de Cloudflare sin depender del proxy/autenticación del chat Codex antiguo ni mover el secreto del operador. Ampliación acotada del Worker existente, no guardia, scheduler, consumidor de expediente o sistema de agentes nuevo.

Alternativas: recuperar el ejecutor Wrangler existente (hoy fuente antigua, proxy sin conexión y sin autenticar); poner una credencial en Actions (otra custodia); o añadir un Workflow en el MISMO operador. Se elige el tercer camino: reutiliza journal, D1, límites, artefacto y secreto existentes. Preparación de fuente autorizada por Gabriel; implementación inline con una revisión final de rama. No se pide nuevamente aprobar decisiones técnicas rutinarias.

## Contrato
Clase AfwReleaseWorkflow en worker/mcp-release/index.mjs; HTTP permanece404. AfwReleaseOperator.run conserva su contrato y comparte su implementación con el Workflow, sin ampliar operaciones RPC.
Workflow SOLO publish y dos opt-ins exactos true: AFW_RELEASE_OPERATOR_ENABLED y AFW_RELEASE_WORKFLOW_ENABLED. Ausencia/false/otra cadena deniegan antes de consultar proveedor o D1. No cambiar defaults/configuración remota desde esta preparación.
Payload exacto {planHash}, hash SHA256 del bundle compilado, id de instancia afw-release-HASH. No destinos, credenciales, ventanas, instrucciones o datos de expedientes en el payload.
Validar bundle original y startAt<=ahora<expiresAt, intervalo original<=600000ms, antes y después de esperas/resultado. Nunca renovar ventana. Reusar checkOwnCronProvider con fetch manual sin seguir redirects (workerd no soporta redirect:error); gate resolved y mayRunClosedVerificationtrue indispensables antes del journal.
Un paso publish-closed-release, retries.limit0 y timeout numérico no mayor de70000ms ni del tiempo original restante. El callback convierte fallos/ACK incierto a salida saneada no reintentable. No reiniciar/reintentar automáticamente.
La publicación real sigue en createClosedPublication y su presupuesto D1 original. Restart/replay de Workflow no reinician ese presupuesto. No prometer exactly-once de la plataforma: comprobar un solo POST y presupuesto consumido incluso ante ACK perdido.
Salida {status:blocked|uncertain|confirmed,mayRetry:false,operationalReadiness:false,receipt?}. Solo confirmed con mayDeployfalse del publicador y referencias artifactKey/versionId permitidas; nunca texto bruto, claves o módulo. Workflow complete por sí solo no acredita publicación aceptada.
Cierre afecta nuevas admisiones; no atribuir cancelación física de una llamada en curso solo al cambio de flag o estado del Workflow. La ventana/journal siguen vigentes y se requiere readback del proveedor.

## Pruebas y aceptación
Native Miniflare/workerd Workflow real + D1 real con esquemas existentes; proveedor HTTP simulado sin claves reales. Validar: cierre/default; expiración; payload/id/operación ajenos; proveedor bloqueado o redirect; publicación única y recibo primario; restart/replay sin otro POST; ACK perdido sin reenvío; vencimiento durante comprobación del proveedor. Mantener tests RPC anteriores. No asserts de texto del fuente ni tablas nuevas.
CI completa/lint/build y empaquetado cloud del operador, revisión independiente única y merge fijado. Tests sintéticos no prueban hosting, credencial real, Container, suscripción oPC-off.
Workflow resource futuro afw-release-administrative, mismo Worker/clase, sin cron, HTTP público o nuevo secreto. Creación, montaje cerrado, presupuesto/costo, recuperación y una instancia real son un bloque posterior con preflight vigente; esta preparación no los activa.
operationalReadiness=false.

Fuentes primarias19oct: https://developers.cloudflare.com/workflows/build/trigger-workflows/ ; https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/ ; https://github.com/cloudflare/workers-sdk/blob/main/packages/miniflare/src/config/v4-schema.ts .

## Recuperación compatible y reloj del ensayo
Una vez registrado el Workflow, no restaurar una versión sin AfwReleaseWorkflow por inferencia. Antes de abrir una ventana real conservar y verificar una versión de esta fuente con ambas clases, dos flagsfalse y bundle inerte original; ella será la recuperación compatible, sin borrar Workflow/historia. La versión actualbcf9afc4 es recuperación solo ANTES de crear esa asociación.
La prueba de vencimiento nativa controla Date.now del Worker al volver la lectura HTTP del proveedor: no depende de un sleep ni pretende demostrar reloj/latencia del hosting real. Cambia únicamente la frontera del reloj de la fixture, sin hooks en producción.
