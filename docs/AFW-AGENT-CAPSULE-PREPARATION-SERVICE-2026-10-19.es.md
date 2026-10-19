# AFW: preparación de cápsulas mediante agentes — servicio interno
19 de octubre de 2026. Proyecto y repositorio: AFW / tokenizartinfo-ops/agent-friendly-web.

Este incremento implementa en fuente el servicio de dominio descrito en el [diseño](AFW-AGENT-CAPSULE-PREPARATION-DESIGN-2026-10-19.es.md). No abre una API, herramienta MCP, permiso OAuth ni servicio comercial.

## Funcionamiento
El host futuro debe resolver y validar el token, cliente, recurso, proyecto y vida útil de la sesión. La biblioteca recibe ese resolver de servidor, nunca identidad en la carga del agente. D1 primaria comprueba además el dueño actual, grant intercambiado y no retirado, scope específico futuro afw:capsule:prepare y plazo vigente. Ese scope NO se registra ni se admite en el OAuth actual.

createAgentCapsulePreparation está cerrado por defecto. Con habilitación exacta true, prepare recibe únicamente contract=agentfriendly.capsule-prepare.v1, expectedRevision y una clave idempotente acotada. reconcile recibe la misma entrada y SOLO lee. No se debe utilizar la autorización de lectura G2 para preparar.

La reserva durable liga identidad, clave, revisión, hash de fuentes, generador, sitio, versión y deadline original de hasta cinco segundos. Se confirma su ACK antes de generar con buildPublicationCapsule. Una reserva incierta no se reanuda ni se renueva automáticamente. La misma clave recupera su estado; otra revisión/contrato/generador produce conflicto. Un hash o una clave no son permisos.

Un batch transaccional guarda cápsula, resultado y evento, condicionado al estado original y a owner/revisión/fuentes/dominio/claim/grant actuales. Se comprueban tiempo SQL y presupuesto original a través de awaits. Tras guardar, otra lectura primaria une autoridad actual, fuentes e intento/resultado en una sola consulta. Grant y dominio se comprueban también con el reloj actual después de esperar la consulta; no se reutiliza una autorización obtenida en una lectura anterior. La validez se acredita en el punto de lectura, no para siempre. Retirar un permiso impide la siguiente lectura, sin borrar un trabajo ya aceptado.

La respuesta incluye solo referencia de cápsula, versión, hash y revisión de origen. El contenido queda pendiente de aprobación humana. No devuelve archivos, respuestas del expediente, correos, claves o tokens; no permite instalar, publicar ni gastar.

## Límites deliberados
- DDL en db/agent-capsule-preparations.sql fuera de drizzle: NO es una migración instalada o un cambio del esquema remoto. Nueva tabla conserva historia y rechaza borrado/cambio de identidad.
- La ruta humana permanece intacta. Una carrera con su versión se rechaza sin sobrescribir ni renumerar; puede dejar reserva pendiente. Resolver/abandonar esas reservas y compartir el servicio con la web requieren un bloque propio, no borrado o reset.
- Ante ACK perdido, reconcile consulta el estado persistido. Una reserva pendiente no significa éxito ni autoriza repetir trabajo. No se factura aquí.
- El host futuro debe imponer tamaño antes de parsing, rate limit, presupuesto de cuenta, consentimiento y scopes reales, custodia y migración/rollback comprobados. La biblioteca trabaja con JSON ordinario ya parseado; no es un sandbox para objetos Proxy.
- No hay transporte HTTP/MCP, consentimiento de preparación, nuevo scope operativo, modelo, precio, pago, instalación ni acceso de hosting en este incremento.
- Actions y D1 nativo de Miniflare son QA sintética en runners; no acreditan D1 remoto, servicio público, Container, avisos, revisión útil cloud o PC-off. operationalReadiness=false.

## Verificación y continuidad
El [plan y ledger](superpowers/plans/2026-10-19-afw-agent-capsule-preparation.md), la PR portadora y el tracker operativo issue497 guardan commits/RED/GREEN/revisión e integración. No deducir aceptación de una casilla histórica ni repetir OAuth G2/OTP.
El siguiente gate para una API de preparación es el host con consentimiento específico y esquema migrado bajo plan de recuperación. La recepción nativa de eventos y el ensayo con PC apagada conservan sus gates independientes.

## Fuentes técnicas
[Cloudflare D1: batch y Sessions](https://developers.cloudflare.com/d1/worker-api/d1-database/) define la transacción de batch y que first-primary solo fija la primera consulta de cada sesión; por eso se crean sesiones nuevas para las comprobaciones. [SQLite: fechas](https://www.sqlite.org/lang_datefunc.html) documenta el reloj SQL empleado. Consultados el 19 de octubre de 2026.
