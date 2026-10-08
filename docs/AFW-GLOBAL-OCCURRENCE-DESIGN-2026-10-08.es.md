# AFW — registro exclusivo global de ocurrencias, propuesta local

Fecha: 2026-10-08. Estado: diseño para revisión, sin implementación ni recursos verificados en vivo. Adopción previa aceptada; no se repitió ni se eliminó el checkpoint sintético. Alcance autorizado: inspección local, diseño y pruebas propuestas. Sin HTTP, SQL remoto, cambios de permisos, secretos, nuevas tareas, activación o código producto.

## Resultado y frontera

Una sola ocurrencia propia puede ejecutar list→claim→finish. Cada uno de esos tres intentos queda registrado durablemente antes de enviar su solicitud operacional; una respuesta perdida consume el intento y bloquea reentrada. Otra instancia no puede crear/adoptar la ocurrencia ni obtener permiso para reenviar la fase. Cierre independiente invalida permisos pendientes sin borrar historia. El resultado sin contexto privado sigue siendo intervention_required o superseded; completed describe el protocolo, no resolución personalizada.

/workspace/work conserva evidencia dentro de esta instancia, pero no demuestra persistencia entre instancias. No será autoridad ni fallback del registro global. Esta propuesta tampoco acredita PC-off.

## Fuentes locales inspeccionadas

- lib/assistance-occurrence.mjs: create/advance CAS inyectados; máximo tres llamadas; intento persistido antes del envío; preflight actual de hasta 30s antes y después de persistir; timeout de 10s debe caber estrictamente en ventana/token/plazo servidor/lease; no reentrada ni retry.
- lib/operations-occurrence-checkpoint.mjs: fsync y exclusión POSIX append-only; no prueba vida del filesystem. Sus recibos NO contienen señal completa, configuración, publicación, origen o identidad: un adaptador D1 debe recibir además contexto inmutable confiable.
- worker/operations/assistance-supervision.sql: señal operacional opaca, eventId/projectRef/revision/kind/topic/observedAt/receivedAt.
- worker/operations/assistance-supervision-runs.sql y lib/assistance-supervision-review.mjs: requestId UNIQUE, lease <=5min, reservas y outcomes. Claim explícito idempotente existente no equivale a permiso de replay de una ocurrencia.
- lib/assistance-shared-budget.mjs: una reserva activa y tres reservas compartidas por 24h entre assistance/dossier/incidents/notices. Es un presupuesto distinto de los tres intentos list/claim/finish de una ocurrencia. No sumarlos ni debilitar ninguno.
- lib/operations-service-controls.mjs: origin fijo, navegador rechazado, JWT RS256 de servicio/audience/clientId pin, limiter, cuerpos <=1024 bytes, gates/ventana y sesión first-primary.
- lib/operations-client.mjs: origin fijo, correlación estricta, sin redirect/retry, abort y límite de respuesta. Conservación obligatoria.
- worker/operations/notice-reviews.sql: precedente de journal append-only, UNIQUE(sequence) y triggers contra UPDATE/DELETE.
- docs/AFW-CURRENT-REVIEW-ACCEPTANCE-2026-10-08.es.md: evidencia HISTÓRICA de QA operacional 3a61aeee-a25c-4d85-bc12-f34ad7945bba y QA fuente separada; manager restaurado después a D1 operacional original. wrangler.operations-manager.jsonc apunta a la original, no QA. No desplegar esa configuración para seleccionar QA ni asumir binding actual.

## Opciones

| Opción | Ventaja | Coste/límite |
| --- | --- | --- |
| D1 QA operacional existente, journal adicional | Misma autoridad que señales/runs; batch transaccional y CAS; menor integración | Requiere adaptar controles/cliente y verificar binding QA en una etapa futura; persistencia antes del envío agrega tráfico de control |
| Durable Object por ocurrencia | Serialización por objeto y almacenamiento persistente del objeto | Namespace/binding/clase nuevos; coordinación con presupuesto global y D1 no es transacción distribuida; no hay recurso desplegado acreditado |
| Coordinador completo dentro del manager con D1 | Tres fases internas y menos viajes cloud | Cambia ubicación de ejecución; no conserva literalmente tres envíos del cliente ni demuestra persistencia previa al envío inicial |

Recomendación: D1 QA, preservando el ejecutor cloud y diferenciando control del checkpoint de las tres solicitudes operacionales. Durable Objects queda como alternativa si luego se necesita coordinación prolongada; no agregarlo para esta ocurrencia finita.

## Contrato de intentos y tráfico

Los tres intentos son exclusivamente listAssistance, claimAssistance y finishAssistance, como en el ejecutor actual. create/advance y consultas de auditoría son operaciones de control, no intentos operacionales, pero deben tener presupuesto separado finito. Sin esta distinción, un checkpoint D1 remoto no puede persistir antes de cada envío cloud dentro de un límite de tres solicitudes HTTP totales. Si el límite se interpreta como todo HTTP, esta opción falla cerrado y debe sustituirse por coordinador servidor; no ocultar viajes adicionales.

Propuesta normal sin retry: create una vez, hasta siete advances (tres attempted, dos received, un completed y como máximo un stopped ante fallo), y tres solicitudes operacionales. Límite total del runner: once solicitudes; no se suma una lectura de recuperación automática. Un failed advance consume su cupo local; si perdió respuesta no se intenta otra fase. Recibos de auditoría/cierre pertenecen a flujo independiente acotado. Reservas compartidas 3/24h siguen contando solo claims admitidos según contrato existente, no todos los mensajes de control.

## Modelo lógico aditivo (no SQL ejecutable)

1. assistance_occurrences: occurrenceId PK; eventId UNIQUE y requestId UNIQUE para impedir cambiar UUID y repetir la misma señal; copia exacta de señal operacional; sourceRevision, configId, publicationId y origen canónico; configurationRevision/observationRevision; identityRef opaca derivada en servidor del principal verificado, no credencial ni hash de secreto; executionRef opaca para correlación; startAt/deadline/tokenExpiresAt/serverDeadline; scope QA/purpose versionados; active state, sequence, attempts y closure generation; runId y leaseExpiresAt solo después de claim validado. Manifest inmutable. Cambiar deadline o identidad exige una nueva autorización, nunca update de esta fila.
2. assistance_occurrence_journal: PK(occurrenceId,sequence), expectedSequence, operationId único, fase/estado/attempts, serverRecordedAt, observedAt del runner, categoría fija, correlaciones exactas y eventual runId/lease/outcome. Inmutable con triggers contra UPDATE/DELETE.
3. assistance_occurrence_admissions: PK(occurrenceId,phase), unique attempt ordinal 1..3; estado preparado/consumido; operationId y manifest digest, actor y closure generation. Inserción attempted consume presupuesto aunque no llegue la solicitud operacional. Consumo CAS antes de list/claim/finish evita reenvío de un permiso después de pérdida de respuesta. No guardar token bearer, JWT, clientId secreto, placeholders ni cuerpos.
4. assistance_occurrence_closures: cierre append-only, identificador idempotente, motivo enumerado, actor opaco, fecha servidor, target occurrence y generación. Puede cerrar antes de deadline sin cambiar histórico ni outcome del run.

Las columnas exactas/longitudes se definen en la futura migración local. CHECKs: timestamps enteros válidos, UUID/hash/SHA/formato de IDs, attempts 0..3, sequence monotónica acotada, fases enumeradas, runId correlacionado, outcome limitado. Nada de JSON arbitrario, textos privados o identificadores coercibles. Canonicalización/digest es de metadatos públicos operacionales, no de credenciales. UNIQUE(eventId) implica que incluso una ocurrencia fallida no reintenta automáticamente esa señal; cualquier recuperación futura es otro flujo humano explícito, sin borrar ni relajar esta fila.

## Create y CAS

Create valida señal exacta existente/enrolled/current, preflight confiable, manifest y actor; usa primary y un batch transaccional que inserta cabecera+journal0. El único creador recibe created; conflicto, incluido mismo actor/UUID/manifest, no concede ejecución. No implementar SELECT-existe seguido de INSERT como exclusión. Un create con respuesta perdida deja una fila exclusiva y el runner se detiene.

Advance solo permite aristas started→list attempted→list received→claim attempted→claim received→finish attempted→completed, o stopped desde no terminal. attempts aumenta exactamente uno en attempted, nunca en received/terminal; máximo3. Dentro del mismo batch, UPDATE cabecera WHERE sequence=expected AND nonterminal AND matching actor/manifest/generation/window; INSERT journal y admission condicionados al cambio exacto; verificar exactamente una transición. Triggers/constraints o una asociación de operación única deben impedir journal huérfano. No inferir éxito solo por una lectura posterior: debe coincidir operationId de ESTA mutación. Conflicto false; error/lost response unavailable; ambos detienen.

Un prepared admission se consume con CAS solo una vez, por fase y misma correlación, antes de efectos operacionales. El resultado de autorización se comprueba en servidor nuevamente tras awaits. Claim debe consumir admission y crear run/reserva compartida en la misma transacción, refactor mínimo del helper actual para aceptar ese fence confiable. Finish debe consumir admission y actualizar resultado correlacionado en una transacción. Si cierre gana la carrera, cero efecto; si efecto gana antes del cierre, se conserva su recibo. List consume admisión antes de leer, revalida cierre antes de responder.

## Identidad, fuente y límite de instancia

Access actual verifica un principal de servicio común; no identifica una instancia cloud. executionRef/requestId/UUID enviados por el caller NO son prueba de identidad. El diseño garantiza exclusión global de create y no reentrada de runners que cumplen el contrato, pero no puede atribuir criptográficamente una llamada a una instancia frente a otro actor con idéntica identidad y todo el manifiesto.

Para garantía estricta de propietario de instancia hace falta una identidad de ejecución atestada por una fuente confiable ya disponible y pin en servidor. No se encontró tal contrato en estos archivos. No proponer un nuevo secreto o un token bearer persistido como sustituto. La aceptación de aislamiento hostil entre instancias queda bloqueada hasta resolver esa dependencia por separado. Aunque se resuelva, no habrá transferencia de propiedad ni takeover por vencimiento: filas existentes rechazan create siempre.

Igualmente el servidor no puede observar HEAD del cloud ni readiness de network/secrets por confiar en campos HTTP. El preflight actual permanece responsabilidad de un proveedor confiable del caller, con pin de manifiesto servidor y frescura antes/después de cada escritura. Para acreditar preflight remotamente se necesitaría evidencia atestada existente; no se encontró. Una declaración de source/config/publication en el payload demuestra correlación, no atestación. Fallar cerrado si el caller o su fuente no son confiables.

## Integración mínima propuesta

1. Especificar identidad/preflight confiables y semántica de los presupuestos antes de implementar transporte. Resolver los dos límites anteriores sin crear recursos en este bloque.
2. Preparar en futuro cambio local un esquema adicional bajo worker/operations/ y helper lib/assistance-occurrence-d1.mjs; mantener tablas/runs originales y el checkpoint POSIX histórico. No usar DB de dossiers como registro.
3. Adaptador create/advance con contexto completo cerrado en constructor; no modificar payload libremente. Mantener interface mínima que espera runAssistanceOccurrence; añadir correlación occurrence/phase/operationId al cliente en modo QA explícito. Paths de control bajo /assistance/occurrences, enumerados, sin SQL genérico ni arbitrary URL. Request cap local explícito no superior a 2048 bytes para create si señal+manifest no caben en 1024; conservar 1024 en rutas actuales. Medir serialization en pruebas antes de fijarlo.
4. Extender operations-service-controls solo para modo QA pin y ventana actual, misma identidad/origin/browser denial, primary session y limiter. Verificar disponibilidad de todos los schemas antes de admitir; sin fallback legacy para una ocurrencia registrada. Un modo opcional no debe permitir saltar el registro en rutas legacy mientras QA occurrence está activo. El limiter actual10/min y once solicitudes máximas exige pacing o detener al primer429; no incrementar límite ni retry automático.
5. Reusar helpers list/claim/finish y fence compartido; refactor puntual para transacción con admission. No doble contar presupuesto ni abrir dossier/notices/incidents paralelos.
6. Pruebas locales reales SQLite/workerd antes de cualquier QA remota. Esquema solo en DB efímera local de prueba; no ejecutar en este bloque. Una futura instalación requiere verificar owner/scope/binding QA y aplicar únicamente migración aditiva exacta, no config canónica ni cadena SQL completa.
7. Futura aceptación remota separada: señal propia nueva por UI, recepción/ACK auténticos, manifiesto finito, cierre externo preparado, evidencia independiente de D1 y retorno. Ni esta propuesta ni pruebas locales autorizan esa ejecución.

## Cierre independiente

Antes de actividad futura, un controlador separado debe poder revocar la ocurrencia y cerrar gates/ventana/identidad/cron y restaurar binding original mediante el procedimiento existente. No compartir el bucle del runner para garantizar cierre. El registro de cierre no es prueba de que esos recursos se cerraron: verificar cada estado por separado en esa etapa. Servidor niega create/advance/consumo al vencer plazo aunque el cloud desaparezca. No borrar admissions, filas incompletas o reservas para obtener verde. Mantener ledger QA e históricos originales. Expired/stopped y outcome de business son estados distintos; cerrar ocurrencia no inventa superseded o intervention_required. Solo finish válido puede fijar el outcome existente. Cierre no cancela retroactivamente efectos ya confirmados ni garantiza interrupción instantánea de operaciones en vuelo.

## Pruebas significativas propuestas

| Caso | Evidencia exigida |
| --- | --- |
| Dos clientes/procesos y misma D1 | Un create exitoso; perdedor cero envíos operacionales; nueva conexión rechaza replay incluso después de terminal |
| Cambiar occurrenceId/requestId para mismo eventId | UNIQUE event bloquea segunda ejecución, sin borrar primera |
| Race de CAS por misma sequence | Un journal/admission; ningún hueco; ganador exacto por operationId |
| Fallo dentro de batch | Rollback cabecera+journal+admission íntegro, sin presupuesto parcial ni permiso |
| Caída tras attempted antes de enviar | Intento consume cupo; nueva instancia no envía; terminal independiente preserva evidencia |
| Pérdida de respuesta create/advance/claim/finish | Sin retry/reentrada; permiso consumido no produce doble reserva ni segundo finish |
| Replay de admission o ruta legacy durante modo QA | Segundo uso y bypass rechazados; cero efecto adicional |
| Señal más nueva/diferente/same revision distinto event | Coincidencia completa; old event no claim; evento ajeno no accede; distintas señales no se confunden |
| Source/config/publication/origin/actor/ventana alterados | Cero admisión; manifest histórico intacto; payload no aceptado como atestación |
| Intento4 o fase omitida/reordenada | Denegado por CAS y constraints, no solo por JS |
| Deadline/lease exacto y 10s de margen | Rechazo al límite, tras persistencia lenta y tras await; reloj atrás/futuro rechazado |
| Cierre race con claim/finish | Solo orden transaccional permitido; cero efectos después de cierre ganador; evidencia previa preservada |
| Presupuesto4 canales | Activo único y3/24h intactos; attempts de transporte no alteran contadores de reservas |
| Correlación reserva/lease/outcome | Wrong run/request/event rechazo; sin contexto solo intervention_required/superseded |
| Lectura nueva conexión primary | Estado durable visible y admission consumido; no uso de replica stale para conceder permiso |
| UPDATE/DELETE journal/closure o campos privados | Rechazo real SQLite/workerd; no coerción ni secretos en respuesta/log/recibo |
| JWT/Origin/limiter/esquema ausente | Denegación antes de SQL operacional;429 detiene sin retries; límites de cuerpo y cancelación mantenidos |
| Misma identidad desde otro host | Prueba muestra límite de atestación; no declarar aislamiento criptográfico hasta disponer de evidencia confiable |

Estas pruebas se planifican; no se ejecutaron ni se contaron como resultados nuevos. No crear tests que solo reproduzcan el texto SQL; comprobar efectos reales, conteos, restricciones, carreras y ausencia de envíos.

## Criterio de salida

Diseño listo para revisión local. Antes de implementar: fijar clasificación de mensajes de control y proveedor confiable de identidad/preflight; elegir solo D1 QA verificada en una etapa posterior. Sin esas condiciones, la aceptación estricta entre instancias falla cerrado. Consentimiento, lectura privada, orientación, PC-off integrado, clientes/Max y guardia siguen fuera del diseño.

## Aclaración vigente que sustituye el requisito de atestación de VM

Sí: **registro global CAS más admisión de un solo uso, consumida atómicamente por el servidor, cumple el objetivo de impedir duplicados/replay entre instancias**. No necesita identificar criptográficamente una VM.

La garantía depende de que todas las rutas operacionales del modo QA pasen por ese registro, sin bypass legacy, y de estas condiciones:

- `occurrenceId`, `requestId` y `eventId` tienen exclusión global. Cambiar el UUID no permite ejecutar nuevamente la misma señal.
- Cada fase admite exactamente un intento y una única transición CAS.
- La admisión queda persistida antes del envío operacional y se consume antes de ejecutar su efecto.
- Para claim y finish, consumo y efecto se confirman en la misma transacción D1. List consume primero su admisión y no vuelve a ejecutarse ante replay.
- Una respuesta perdida consume presupuesto y detiene el runner; otra instancia no recupera permiso para reenviar.
- Una ocurrencia existente nunca permite takeover, reapertura ni reinicio por vencimiento.

`executionRef` queda como correlación diagnóstica, sin afirmación de atestación. Dos instancias pueden competir: solo una transición gana; ninguna fase produce dos efectos admitidos.

El contraejemplo si la atomicidad falta es concreto: A consume la admisión, realiza claim y pierde la respuesta; B consigue reutilizar la admisión o entra por la ruta legacy y ejecuta otro claim. También falla un diseño que permita registrar la misma señal con otro `occurrenceId`. Ambos caminos deben rechazarse en servidor.

### Presupuesto QA mínimo propuesto

**Tres solicitudes de control**, una antes de cada solicitud operacional:

| Control | Escritura durable |
| --- | --- |
| C1: create + admitir list | Manifiesto exclusivo, journal inicial e intento 1 |
| C2: CAS + admitir claim | Resultado validado de list e intento 2 |
| C3: CAS + admitir finish | Reserva correlacionada, runId/lease e intento 3 |

Después de cada control confirmado, el runner revalida preflight y margen temporal antes de enviar la operación correspondiente. El servidor comprueba nuevamente ventana, correlación, cierre y admisión.

Finish consume su admisión, fija el outcome y registra el terminal de la ocurrencia **en la misma transacción**. Así se evita una cuarta llamada de control para guardar completed. Esto requiere adaptar el contrato del checkpoint actual: no puede mantenerse una escritura remota final adicional y seguir anunciando tres controles.

| Presupuesto del runner | Máximo |
| --- | ---: |
| Control normal | 3 |
| Control de stop, opcional y una sola vez | 1 |
| Solicitudes operacionales | 3 |
| Total absoluto | **7** |

El recorrido exitoso utiliza **6 solicitudes**. Cada solicitud de control cuenta desde antes de su envío, incluso si falla o pierde respuesta. No hay reintentos automáticos, consultas de recuperación ni devolución de cupos. Un stop fallido no habilita continuar: el registro y el vencimiento conservan el cierre seguro. Stop tampoco sobrescribe un completed confirmado.

El cierre independiente tiene **su propio presupuesto contabilizado**; no se oculta dentro de estas siete solicitudes ni se presenta como gratuito. Su procedimiento y verificaciones se mantienen separados del runner.

### Pruebas propuestas que fijan esta aclaración

- Dos instancias compiten por create y por cada CAS: una sola admisión por fase y un solo efecto.
- Replay del mismo mensaje operacional, incluso concurrente: segundo consumo rechazado.
- Otro UUID para la misma señal: segunda ocurrencia rechazada.
- Fallo transaccional entre consumo y claim/finish: rollback íntegro.
- Respuesta perdida: ningún reenvío ni recuperación desde otra instancia.
- Ruta legacy durante modo QA: bypass rechazado.
- Finish confirmado con respuesta perdida: terminal durable conservado; stop no lo modifica.
- Conteo instrumentado: éxito ≤6 solicitudes; fallo con stop ≤7; ninguna operación cuarta ni control quinto.
- Cierre concurrente: si cierre gana, no se consume admisión ni se ejecuta efecto posterior.

Esta aclaración sustituye el requisito de atestación de VM del diseño anterior. La confianza en el preflight y la correlación de fuente/configuración permanece como requisito separado. Solo diseño y pruebas propuestas; ninguna activación ni cambio de permisos.
