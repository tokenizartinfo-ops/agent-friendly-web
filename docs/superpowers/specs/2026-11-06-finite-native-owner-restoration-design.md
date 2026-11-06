# Retiro y restauración nativos del ciclo de conexión actual — diseño Unit2b

2026-11-06 UTC. Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web (público1347578006). SOURCE de referencia7aab233741b09f8873bf04831ca2fa9a9c2b1c4d/tree6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3; rama de trabajo fuente feat/finite-native-cleanup-20261101. Este documento vive en docs/finite-pcoff-continuation-20261103. Origen GitHub connector; sólo diseño SOURCE/SYN. No contacto al runtime, schema remoto, publicación, permiso, credencial, OAuth, cron, Container, Max o correo. Rollback del futuro trabajo: commits propios comprobados, sin borrar journals, grants, versiones ni actividad ajena.

## 1. Resultado y elección de arquitectura

Unidad funcional: desde el POST real de conexión, OAuth/lectura y decisión temporal de avisos ya implementados, el MISMO alarm inicial podrá cerrar el permiso de datos, retirar los avisos de esa identidad, reducir el grant SDK exacto y restaurar el baseline cerrado recuperable. Sólo emitirá resultado completo cuando las operaciones y lecturas que exige este diseño estén comprobadas. No implementar otra colección de componentes sin consumidor y llamar completo al primer componente.

El owner delegó las decisiones técnicas y pidió encadenar trabajo sin preguntas rutinarias. Root elige continuar Node22/workerd/D1/DO/KV existentes, GitHub/Actions para toda ejecución pesada. No cambiar producto, plataforma ni planes de pago. La decisión es de Root, no una afirmación de que Gabriel haya elegido detalles de implementación.

Alternativas consideradas:
- Restaurar el pointer cerrado y dar por retirados todos los permisos. Es menos código, pero no acredita la revocación D1, la decisión de avisos ni la reducción del grant SDK. Se rechaza como criterio de cierre completo; puede haber contención comprobada con pendientes explícitos.
- Añadir otro scheduler/servicio de limpieza. Duplica ownership y ventanas, y contradice el mismo alarm/handoff de los contratos vigentes. Se rechaza.
- Componer el fence/SQL/journals existentes y una reducción SDK de identidad exacta dentro del alarm original. Elegida: preserva el linaje y permite distinguir resultado efectivo de incertidumbre. No obliga a reconstruir los helpers ya aceptados.

Esta unidad termina ANTES del tercer CLOSED/notices, finite_prearm y full setup nominal. Esos futuros estados siguen denegados y necesitarán su propia composición y traspaso atómico al guard nominal bajo el mismo alarm. Se completa el retiro de todos los estados que el productor actual puede crear, sin abrir aún nuevas fases de producto.

## 2. Contratos vinculantes y evidencias

Reutilizar specs/2026-11-04-preparation-cleanup-enrollment.md y preparatory-issuer-fence.md. Primero leer reviews/2026-11-06-finite-native-retirement-composition-preflight.es.md y finite-pcoff-critical-path.es.md en Rootdocs21ab5662a5a5b9aca5873cc38348d4031f06f0ba. La corrección de cuerpos está aceptada; no reabrir su fixwave.

- Fuente3Nov02:59UTC sigue vencida. No renovarla en producto para calificar este diseño.
- I0/C0=I0+900000/C1=C0+180000, Root≤30000ms y child≤5000ms, siempre recortadas. No tomar los T0/clocks nominales del setup anterior como sustitutos.
- Mismo actor afw-own-successor-closure-v1, mismo alarm, mismos3slots C0/C0+60000/C0+120000 y contador/plan iniciales. No añadir entrega, reiniciar contador ni crear30s desde un helper.
- DB ejecución usa su reloj nativo y sesiones first-primary; un readback primario independiente empieza una NUEVA sesión y SELECT es su primera sentencia. No relojJS para autorizar SQL tardío.
- Promesas reales de fetch/read/body/cancel/KV/SQL/transaction/sync se retienen aun después del aborto lógico; timeout no demuestra drenaje. Scope local no es mutex distribuido.
- Journals append-only; nuevas fases, unknown ACK y actividad ajena no se borran para simplificar el inventario. Sin store OAuth ordinario ni callbacks/URLs/SQL proporcionados por el caller como fallback.
- Sólo una futura ocurrencia consumidora real coordinada PC-off. Aquí pruebas SOURCE/SYN y preflight autorizado, no ensayo real completo PC-on adicional.

## 3. Integración y propiedad del alarm

La entrada seguirá siendo runPrivateQaFiniteInitialCleanupAlarm({ctx,env}) en lib/mcp-qa-finite-initial-cleanup.mjs, llamada desde el alarm ya existente. No se agrega RPC/HTTP/worker/cron nuevo. Conservar íntegra la vía sin obligaciones posteriores y sus pruebas.

El owner del alarm conserva la validación de actor/holders, Plan/State/ArmAck/initialActivation, Source/bootstrap/historical/custodia/inventario/Container0/schedules0/tails0, material de rollback completo, reserva del slot y restauración HTTP. Eliminar la negativa temprana issuerRows.size sólo cuando se haya integrado la calificación y reducción de esta unidad: no una flag allowIssuer ni simple omisión del check.

Agregar lib/mcp-qa-finite-owner-cleanup.mjs con API interna fija:
- readPrivateQaFiniteOwnerCleanup({ctx,env}, originalLease): lee y califica los anchors/plan/cápsula/enrollment y obligaciones ACTUALES desde storage/D1/KV/proveedor fijos. Retorna null únicamente cuando no existen obligaciones posteriores y corresponde el helper Unit1; de lo contrario retorna hechos propios opacos del ciclo actual. No recibe plan, estado, URL, callback, reloj, permiso, listas o resultado exitoso del caller.
- reducePrivateQaFiniteOwnerCleanup({ctx,env}, originalLease): reobtiene/califica hechos actuales y realiza exclusivamente las reducciones de esta unidad. Su resultado normal es factual; la identidad del resultado y los holders/lease/planHash se guardan privadamente para que el alarm pueda consumirlos una sola vez. No registro externo ni constructor público de autoridad. Llamarlo sin contexto/linaje/ventana ORIGINAL calificados deniega antes de efectos.
- consumePrivateQaFiniteOwnerCleanup(result,{ctx,env}, originalLease): consume sólo la referencia realmente devuelta por la reducción anterior en esta invocación. Devuelve hechos necesarios para las comparaciones del alarm, nunca un executor/callback/permiso genérico. Clones/serialized/replay/lease/holder drift deniegan.

Estas APIs internas no crean admisión empresarial. La autoridad reductora sigue siendo el alarm original con su plan/ventana, custody actual y target fijo; los resultados opacos evitan que datos reconstruidos sustituyan las Promesas que vio esta continuación. Si al planificar se logra mantener estas operaciones lexicales dentro del módulo del alarm sin nuevos exports, preferir esa reducción de superficie; registrar la decisión y el filemap antes de escribir producto.

Separar lib/mcp-qa-finite-owner-cleanup-records.mjs y -journal.mjs para los registros propios: codecs own-data/canonical/SHA256 y append-once transaction→sync→readback exacto. Prefijo afw.finite-owner-cleanup.v1: ligado a planHash, capsuleHash, enrollmentHash y preconnectionId. Ninguna cadena/recordHash otorga autoridad. Máximo16filas por linaje, unknown/extra/orphan deniega. No montar estas APIs fuera de la composición del alarm.

## 4. Inventario exhaustivo y fronteras

El observador de limpieza es distinto de readPrivateQaFiniteOwnerContext, porque se ejecuta a partir de C0 y admite estados de cierre, no nuevas operaciones hacia delante. Reutilizar los qualifiers puros y codecs actuales; no hacer que el reader empresarial acepte estados de cleanup.

Correlacionar por A/M/plan/cápsula originales: sourceRevision/tree, QA actual y actor, preconnectionId, owner realm/subject/project/revision/client/resource, enrollment, mismos I0/C0/C1, bytes del candidato y baseline recuperable. Cada read mantendrá holders/lease y los límites de tamaño/filas actuales.

Matriz de estados actuales:
- Sin enrollment/obligaciones: vía inicial existente.
- Enrollment con ACK normal o incierto, sin connection effects: frontera Unit1 existente, sin inventar issuer/grant/notice.
- Upload SEND sin ACK y pointer inicial exacto: posible versión inactiva desconocida se conserva; no retry upload. Se puede restaurar baseline inicial conocido si los restantes gates permiten; no ACK de upload por inspección.
- Activation SEND/ACK/receipt presentes o parciales: sólo pointer inicial o versión target de un SEND propio exactamente calificado. Un pointer ajeno, porcentaje dividido, módulo/config/annotation discordantes o actividad legítima posterior deniega mutación. No reconstruir ConnectionReceipt ni emitir otra activation.
- Reservation issuer/consent consumido/grant/link/SDK operación/ticket/evento/NoticeLink en cualquier prefijo coherente propio: calificar cada fila original y su relación; no exigir notice para poder retirar el grant.
- Unknown ACK: conservar el SEND y su incertidumbre. Las observaciones de recuperación son registros de reconciliación factual distintos, no ACK de una invocación que no se vio terminar. Un SEND pendiente de resolución no autoriza volver a emitir.
- Grants/conexiones/proyectos/SDK de otro linaje o revisiones posteriores: no enumerar indiscriminadamente ni modificar.
- notices:approval/finite:approval, nuevo trial head, setup/nominal/Containeractivo/Workflow no terminal o estado no soportado: admin_pending, sin declarar restauración completa ni traspasar ownership por inferencia.

El inventario debe incluir estado nativo realmente adquirido y pendientes locales retenidos. No utilizar ausencia de una fila/resultado de list eventualmente consistente como prueba de inexistencia de un efecto con SEND incierto.

## 5. Correlación SDK exacta antes del efecto

SDK lock1.2.1 permanece. Fuente oficial fijada1fafae23a0328f49ec3a30c433dfbe502ab3d1a6, src/oauth-provider.ts/blob10274b62aad09ea0e9d058cc1e3d41a9f8cb7d97. completeAuthorization genera IDSDK distinto del UUIDD1 y retorna redirect; GrantSummary incluye metadata pero no props descifrados. No parsear códigos/secretos para depender de su formato interno ni pasar UUIDD1 a revokeGrant.

Elegir metadato factual antes de completeAuthorization: metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}}. correlationHash es SHA256 domain separado sobre los hashes ya calificados de Root SDK, ExpectedGrant, sdk_complete SEND y la identidad original (plan/cápsula/preconnection/source/QA/owner/project/client/resource). Se calcula en el mismo stack ANTES del efecto y queda determinísticamente anclado por los registros ya durables; no nonce guardado después del efecto, secreto, instrucción ni permiso. props y scopes actuales no cambian. Otra metadata o marca en una vía ordinaria nunca concede equivalencia.

El productor actual de owner-phase-context modifica solamente esa metadata finita; journal actual conserva SEND/observed. Una Reference posterior, si se añade, sólo puede nacer del resultado nativo y su enumeración calificada; no es requisito para recuperar el metadato que ya se envió antes de un ACK perdido.

El cleanup usa API SDK del mismo issuer/resources/scopes/alias privado actual, con holders fijados. Enumera sólo el subject original, con páginas acotadas y matching COMPLETO de metadata/correlation, userId/clientId/resource/scopes/times; cero o más de una coincidencia ante efecto sdk_complete incierto significa desconocido, no “no existe”. No elegir por nombre/último/client solo. Todo resultado público se sanea a referencias/hash/estatus; IDsSDK internos no salen al humano ni a un agente externo.

Una coincidencia exacta permite la reducción de ESE IDSDK, nunca un barrido. Si no hubo sdk_complete SEND, no crear un SDKgrant ni requerir revocación ficticia. Si SDK expiró y no está listado, el cierre de negocio puede comprobarse por D1/metadata restaurada, pero no se etiqueta como revocación SDK observada. Definir resultado de contención distinto del receipt completo; no inventar ACK/physicalpurge de la ausencia.

Los SDK tokens/props originales y la metadata no se publican en artefactos fuera de fixtures SYN. No se invoca purgeExpiredData/deleteClient/revokeExistingGrants ni se cambia TTL/cuenta/alcance para simplificar esta unidad.

## 6. Orden nativo de reducción y restauración

Todo dentro de la invocación original del alarm y sus children. Orden fijo:
1. Validar plan/custodia/anchors/inventario/current pointer/backup y reservar el slot original con readback durable; absorber primer fallo, sin renovar reloj.
2. Congelar issuer por journal propio. Crear/confirmar terminal closeFence con identidad reservada original usando el componente Unit2a. Persistir SEND antes de SQL; retener resultado real; sólo ACK normal después de transaction/SQL normal y readback. ACK incierto se conserva y sólo reconcileFence del MISMO requestId puede producir hecho separado. Nunca otro fenceRequestId para salir de incertidumbre.
3. Con barrera primaria confirmada, observeGrant y revokeGrant del componente fijo, mismo store/lease/testigos. Sin grant propio observado tras barrera, registrar absent como hecho sólo si la identidad/SQL establecen que no pudo aparecer posteriormente. Revocación preexistente legítima conserva timestamp/exchanged_at; no sobrescribirla. Rechazo owner/revision/datos ajenos termina sin escritura ajena.
4. Retirar permiso de avisos si hubo evento grant original. Agregar operación fija de cleanup al issuer store: insertMonitoringRevocation({identity,barrier,expectedGrant,expectedConsent,requestId,window},lease). INSERT append-only action='revoke', SQLnow, sólo grant/project/subject/client/resource/revision originales y expected sequence; requiere barrera confirmada y no revocación previa. No createConsent grant, no ticket inventado. No grant de avisos→ninguna revocación ficticia; revocación ajena/legítima anterior se observa y conserva. Readback primario independiente exacto; ausencia de NoticeLink no oculta un evento SQL emitido cuyo ACK se perdió.
5. Restablecer baseline cerrado por el engine HTTP original después de volver a comprobar pointer propio, custody y recuperabilidad. Preservar RestoreSend/RestoreAck y annotation existentes. Para un pointer posterior propio, calificar su versión/metadata/config/module contra target del SEND/ACK original y no contra un recibo sembrado. No resolver ACK perdido de restore desde pointer: resultado desconocido permanece así, aun si la contención cerrada se observa.
6. Con el frontend cerrado y D1 cercado, reducir sólo el grant SDK correlacionado. Persistir SEND antes de api.revokeGrant(IDSDK,subject), conservar su Promise REAL. Esperar retorno normal bajo guard y registrar su resultado observado; lectura SDK posterior es hecho independiente, no sustituye ese retorno. Describir especialmente una operación de token/refresh iniciada antes del fence: los checks de D1 en token callback, boundedTokenResponse y cada MCP read siguen siendo obligatorios. No prometer que list/delete locales demuestran drenaje de otro isolate.
7. Nuevo inventario y primaria finales: D1 grant revocado/no-grant comprobado, consentimiento temporal retirado/no-grant comprobado, baseline cerrado recuperable activo, operador cerrado, cron/tails vacíos, Container propio sin instancias, Workflows terminales y ninguna obligación propia desconocida contada como éxito. Readback durable del receipt OwnerCleanup; después el initial Receipt/State.complete y deleteAlarm EN LA MISMA propiedad original. Sin OwnerCleanup completo, no marcar initial receipt completo para este linaje.

Los pasos5/6 distinguen contención de finalización. Si SDK/SQL/restore queda desconocido, se puede conservar la contención que ya ocurrió pero se devuelve admin_pending y no se libera el caso para otro ensayo. Los reintentos de slot observan/reconcilian registros originales; no reemiten un efecto cuyo SEND existe sin resultado normal. Máximo3slots y C1 originales, sin polling permanente.

## 7. Presupuesto y guard del SDK

El SDK tiene paginación y Promise.all internos; Promise.race alrededor de api.revokeGrant no controla por sí sola nuevos I/O. Crear un facet KV PRIVADO de este cleanup que delega únicamente al alias nativo capturado, con guard/contador/retención para cada get/list/delete, sin put durante la revocación. No permite key/prefix arbitrarios: sólo grant del subject/IDSDK calificado y token prefix correspondiente; no clientes/otros usuarios/requests. El API SDK normal se construye sobre ese facet sólo dentro de esta reducción; no cambiar el alias env ni afectar los holders actuales.

Búsqueda correlación: máximo2páginas de100resúmenes, primero confirmar que los límites también acotan las operaciones internas efectivas del SDK. Si el SDK busca páginas legacy adicionales o devuelve cursor fuera del límite, el facet deniega antes de nuevo I/O y el resultado queda desconocido. Revocación: máximo2páginas de100tokens y200deletes, concurrencia máxima2 mediante cola privada con guard ANTES de entrar en cada llamada nativa; también se retienen y observan resultados ya iniciados. No serializar un permiso para otro stack. Scope cuenta todos esos I/O y métricas; al agotarse presupuesto/lease se corta nueva emisión, no se declara drenado por aborto. Ni tests ni resultado de producción prometen que 2páginas bastan para cualquier usuario; el perfil propio que exceda límites bloquea promoción hasta otra decisión de arquitectura.

Los RPC/SQL/provider budgets actuales se registran con esos nuevos I/O. No añadir incondicionalmente el snapshot completo de fase decenas de veces; cada punto de consistencia necesario se define en el plan. No suprimir checks para entrar en30s; si el resultado no cabe, reportar coste y volver al diseño. No renovar Source, credenciales ni clock. La cuota actual y el proxy Codex Cloud se califican después con evidencia propia; este diseño no asume que Pro los resuelva.

## 8. Registros propios y estados de resultado

Nuevo journal OwnerCleanup guarda identidad y Send/Observed/Receipt para reducciones que no cubra el journal issuer actual (SDK,revocación monitoring y resumen final). Reusar close_fence/revoke_grant del journal issuer, no duplicar sus ACK. Cada Send liga los hashes originales, operación fija, requestId original, issuedAt/deadline del child y requestHash; sólo Recorded→I/O. Cada Observed liga SEND y HASH del resultado realmente visto, observedAt dentro de deadline; no usar fila leída después como resultado original.

Receipt exacto liga plan/cápsula/enrollment/preconnection, barrera, resultado D1, consentimiento, restauración y resultado SDK, tiempos/C0/C1 y observado de comprobaciones finales. Sin secretos/scripts/token bytes/usuario en resultado externo. Tipos de retorno externos siguen admin_pending o el status factual cerrado existente con operationalReadiness:false; no exponer objetos de autoridad ni nueva API readiness=true.

No añadir un “pending permitido” al reader público. Si se guarda una observación de contención, no tiene status complete ni permite reutilizar lineage. Toda Promise pendiente permanece retenida en el scope correspondiente y se dispone de la fixture en finally aun si una assertion falla.

## 9. Filemap y cierre de implementación

Modificar:
- lib/mcp-qa-finite-owner-phase-context.mjs: sólo metadata de correlación SDK y registro necesario; no reescribir handlers ni las garantías ya aceptadas.
- lib/mcp-qa-finite-initial-cleanup.mjs: integrar calificación/reducción y soporte de pointer posterior propio, MISMO alarm/contador/restore/finalización; vía sin issuer intacta.
- lib/mcp-qa-finite-preparation-issuer-store.mjs: revocación de monitoring de cleanup, sin tocar la semántica forward/grant existente; schema readonly preflight existente.
Crear los módulos owner-cleanup/records/journal y SDK KV facet privado separado si mantiene una responsabilidad clara. La forma exacta final de firmas ycampos se cierra en el plan antes de Task1, no durante implementación por inferencia.
Pruebas: nuevo test/mcp-qa-finite-owner-cleanup-native.test.mjs y pure/records si aportan validación; fixture específica que reutiliza finite-first-connection-publication/finite-initial-entry-world sin seedPhaseFacts. Adaptar los harnesses existentes sólo donde se necesiten metadata y persistencia de la misma native lineage. Preservar pruebas Unit1/Unit2a/primera conexión/GET-POST/SDK y qualifiers protegidos. Sin refactor incidental de125k de phase-context ni upgrade SDK.

La unidad se puede dividir en tareas revisables (correlación/facet/store; consumidor+alarm), pero NO cerrarla operativamente tras la primera. Revisión final completa de este delta y sus límites antes de cualquier promoción. Reconstruir M/QA y grafos desde la fuente vigente para la calificación necesaria; no reutilizar el hash c493 como “actual” ni sustituir con bundle viejo.

## 10. Calificación nativa y tiempo real de SQL

Positivo principal: producir conexión desde initial upstream/choicePOST real, SDKauthorize→tokenM→MCP/D0.4 y notice GET/POST/NoticeLink, con provider/custodia/Access anteriores explícitamente SYN. Desde ese estado producido, alcanzar C0 y ejecutar el alarm original para demostrar cierre D1/avisos/SDK/restauración, registros durables y otras filas preservadas. Sin resealar un receipt como autorización ni sembrar estados posteriores positivos.

No comprimir900000ms de producción ni fingir que Date.now sustituye el reloj nativo D1. Diseñar una calificación cloud dividida en preparación y recuperación sobre EL MISMO estado persistido de Miniflare: jobA produce y dispone/flush el estado/artefactos SYN exactos; jobB recupera esos mismos scripts, namespaces, persisted D1/DO/KV y registry SYN antes de C0 y observa el alarm nativo original al llegar C0. Perder los WeakMaps de la invocación anterior es intencional: la limpieza no reanuda el stack forward. El resultado de A sólo transporta almacenamiento factual SYN, no una admisión.

Cada job≤15min, total acotado por el workflow y2jobs, Node22/lock actual/sincredenciales. El jobB puede esperar en la nube hasta el C0 ya fijado, nunca fabricarlo al empezar; validar margen de B yC1 ANTES de producir el ciclo. Si no se puede preservar estado nativo exactamente o no cabe ese presupuesto, reportar y ajustar la agrupación del laboratorio, no saltar a clockfake ni claim de ciclo completo. No archivos pesados locales. Persistencia contiene sólo fixtures SYN sin credenciales reales y no se imprimen tokens/headers completos; artefactos privados de Actions limitados7d y saneados para todo reporte público.

Casos causales mínimos:
- SDK correlation exacta vs same user/client pero marca/subject/resource/preconnection ajenos; clone y doble match deniegan, otras concesiones preservadas.
- Delayed consent/grant/openFence antes y después de la barrera nativa: no nueva concesión tras el fence; no notice ficticio.
- Grant antes de link/ACK perdido: UUID reservado exacto se reduce; grants ajenos y exchanged_at legítimo intactos.
- Ticket sin consent, SQL consent sin ACK/NoticeLink, y consent/link completos: distinción correcta sin inventar evento grant.
- Propios upload/activation incompletos, pointer ajeno/config drift, restore ACK perdido: no ACK reconstruido ni overwrite ajeno; contención separada de completo.
- SDK held get/list/delete y rechazo, token/refresh competidor anterior al fence, late result después del aborto, segunda scope LIVE misma ctx: nueva emisión bloqueada y settlement real retenido; no dictamen global de físico por sólo contador local.
- Paginas/límites/concurrencia/scope y clock original: excederlos corta antes de I/O, no retry o timeout extendido.
- Cada límite de C0/C1/slot/QA/Source/actor/owner/project/schema/custodia/backup/head/Workflow/Container; early-clock y expiración deniegan antes de efectos.
- Cold restart/segunda entrega: mismos records/counters/alarm y no replay de SEND incierto.
- Vía Unit1 sin issuer y ordinary APIs siguen iguales; fuentes fullsetup y nuevos stages siguen cerrados.

No repetir el corpus entero para obtener verde. El plan congelará nombres/números/grupos, causal RED antes de producción, GREEN proporcionado, lint/graph y excepciones explícitas. Una calificación con2jobs no equivale a2ocurrencias ni prueba CF real. La experiencia Miniflare en un runner cloud no acredita Codex Cloud ni PC-off real.

## 11. Anti-goals y estado

No grant nuevo, OAuth ordinario, reconsentimiento, callback arbitrario, concesión por metadata, nuevo owner/alarm, remoteSchema, permiso infinito, retry de unknown, borrar historia/SDKcliente completo o ampliar clocks para pasar. No prometer ausencia global por KV eventual o physicaldrain entreisolate desde stage-work local. Sin rollout/mainmerge por este documento.

operationalReadiness=false;completePackage=false;PCoff=false. El diseño debe recibir buildercheck y reconciliación de preguntas por Root antes del plan. La delegación del owner permite decidir detalles técnicos, no presentar gaps no resueltos como producto construido.
