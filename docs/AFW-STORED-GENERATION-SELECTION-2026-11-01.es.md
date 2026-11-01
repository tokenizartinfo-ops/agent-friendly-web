# Selección privada de generaciones guardadas — fuente
01 noviembre 2026 UTC. Proyecto AFW; repositorio agent-friendly-web.

La nueva biblioteca privada selecciona hechos de una generación anterior, incluso bajo un HEAD y lector nuevos. Reutiliza el recorrido completo del ledger y compara dos compromisos del linaje: INFO, TODOS los CONTROL y control legacy real. Las identidades guardada y lectora permanecen separadas. No modifica read/readRetained/readArmed, no concede autorización y no se monta en Worker/RPC/HTTP.

La revisión corrigió un caso real de borde: un vencimiento de1ms entre la resolución del primer snapshot y la continuación del await podía reclasificar aquella primera observación. Se conservó su última muestra cercada antes de volver a leer el reloj. RED41291895750/job124804670695 226PASS1FAIL; GREEN41291989857/job124804937634 227dirigidas+53relacionadasPASS0FAIL, ESLintlimpio; re-revisión sinP1/P2/P3. Son fixtures de identidad nativa sintética/coherencia local; no prueban procedencia de un módulo publicado.

El diseño y los contratos están en docs/superpowers/specs/2026-11-01-private-stored-generation-reader.md; plan/ledger con igual nombre. El PR y issue497 deben registrar el head, árbol, CI completo y aceptación reales. Esta nota no adelanta ese resultado.

## Continuidad operativa separada
PR704 aceptó la captura numérica de errores nativos en maindff68b84, CI9checks y main41290074689/job124799304651:14/1390/4838PASS0FAIL1skip previo, lint0errors14warnings existentes. El intento084703 quedó CONSUMIDO antes del controlador: command6555713570/Actions41290352374 falló en preparación read-only. GitHub devolvió created_at09:47:49Z mientras Actions corrió08:47–08:48UTC; no compensar relojes, reenviar ni reejecutar cuando llegue esa fecha. No hubo nueva captura effectHttp ni escrituras CF.

Readback independiente08:48:36.567UTC25GET: QA c570/DEP59328f0e, canary2607/7b5a, operador855/9790,14/8/3flagsfalse,23Workflows terminales, Container/cron/tails propios vacíos, namespaces/exposición conservados. Es evidencia fechada, no garantía futura. Recibo issue497#6555736673. El ensayo anteriorfee050 sigue consumido/cerrado con4xx exacto desconocido.

## Próximo camino crítico
La selección de ancestros NO es prerrequisito del primer ARM desde legacy. Priorizar composición ARM concreta, entrada de borrador inmutable/alcance propio fresco, nominal/guard/finalizer, suscripción/revisión útil/retirada, y luego PC-off acordado. No llamar a prepare() después del pendingCAS: su contrato cerrado rechaza V2 y sigue intacto.

El diseño del futuro ingreso ARM mutante necesita distinguir vencimiento del recibo de cancelación física. El wrapper de preparación actual es read-only y pasa solo H/deadline a otro contexto. Su verificación posterior no retracta una escritura remota; una escritura ya enviada con ACK tardío/desconocido debe conservarse incierta, sin replay. Un control metadata armado no es permiso ni liveness. No copiar sin revisión esa frontera al ARM mutante ni prometer reloj monotónico compartido entre aislamientos.

Referencias primarias de la revisión: [tipos RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/#structured-cloneable-types-and-more), [ciclo de vida RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/), [relojes Workers](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#performancetimeorigin-and-performancenow), [transacciones DO](https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/#transaction). No habilitar flags experimentales ni inferir cancelación por el mero Promise.race.

No nueva publicación, perfilprepared_idle, escritorD1, permiso/clave/OTP, consumidor, guardia, Max ni ensayoPCoff por este bloque. Owner no disponible antes12:45UTC; monitorlocalPAUSED; operationalReadiness=false.
