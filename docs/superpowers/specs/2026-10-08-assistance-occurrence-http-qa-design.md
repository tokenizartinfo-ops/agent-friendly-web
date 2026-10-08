# AFW — HTTP QA cerrado: separación de admisión y preflight

Fecha: 2026-10-08. Estado: propuesta para revisión; solo documentación. No rutas implementadas, runtime modificado, recursos creados ni activación. Sustituye la propuesta inicial que exigía un puente de observación cloud hacia Worker. El servidor no observa ni atesta una VM, su red o su checkout.

## Decisiones y alcance

Siete HTTP como máximo por invocación finita del runner: tres controles, tres operaciones y un stop excepcional; sin retries, polling ni recuperación mediante consultas. Exclusión global de efectos en D1 compartida, no límite agregado de tráfico entre contendientes. Dos create pueden llegar; solo uno obtiene la ocurrencia. UUID distinto no permite repetir eventId/requestId.

Reutilizar helpers transaccionales y la extracción canónica lib/operations-http-transport.mjs preparada por el owner en origin/feat/afw-occurrence-service-20261008 (base main4aa4441, revisión/full test todavía en curso al comunicarla). createOperationsHttpTransport({env,fetchImpl,timeoutMs,onDiagnostic}) devuelve request(path,body), conserva origin pinned, allowlists GET/POST fijas, request máximo1024B, reply8192B y timeout/abort/diagnósticos; incluir paths futuros no monta HTTP. createOperationsClient sigue sobre ese transporte; validación de negocio no se desplaza al primitive. No crear otro transporte, ni interpretar los10/10 focales reportados como full/revisión final propios. Pin exacto de la extracción pendiente de su cierre por el owner antes de integrar. Importar posteriormente el contador exacto de 33b617c; no duplicarlo. Este bloque no hace cherry-pick ni implementa adaptador. Mantener rutas legacy, public/runtime, budgets compartidos, schemas/runs e historia hasta la implementación revisada.

Pins source/config/publicación son autorización declarada por plan owner. El runner los corrobora en su entorno mediante herramientas soportadas y Git local. El servidor valida su propia versión efectiva aprobada, identidad, enrollment, plazo, esquema y evento; no presenta los pins como observación independiente de la VM.

## Dos autoridades, dos contratos

### Runner: runnerCloudFreshPreflight v1

Mantener el contrato cloud actual en el runner: consultar environment_status soportado para el actor/instancia seleccionados y comprobar observaciones actuales, revisiones coincidentes, red restricted/enforced, custodias Operations ready y destinos exactos. Corroborar origin canónico, HEAD autorizado y checkout limpio con Git local, sin fetch/checkout/reset para simular adopción. Config y publicación deben coincidir con el plan owner. Ausente, stale, future timestamp, error o discrepancia: no enviar la próxima operación.

Antes de CADA envío normal, obtener preflight real fresco; comprobar nuevamente margen temporal después de awaits y antes de budget.send. Freshness máxima 30s y margen mínimo 10s, acotados por deadline/lease. La consulta soportada no cuenta como HTTP Operations, pero sí se contabiliza como observación de control: máximo seis observaciones previas normales, cero retries. El stop excepcional no requiere readiness cloud como autorización de trabajo; hace un único intento de cierre con autenticación y transporte existentes, solo si el deadline de transporte permite intentarlo. No más observaciones automáticas para reconciliar pérdida. Lecturas Git locales no son envíos HTTP.

El runtime del runner necesita acceso real al mecanismo soportado de observación. No se ha identificado un SDK Node para environment_status: inyectar una dependencia de host/orquestación que llame realmente la herramienta y entregue el resultado fresco al runner. Un fixture, constantes, JSON persistido o afirmación del request no sustituyen ese mecanismo. Sin dependencia real, runner remoto cerrado; no se necesita transferir evidencia al Worker.

Después de la respuesta, dentro del callback contado: validar envelope completo, correlación, reloj/margen y vigencia del snapshot previo. No una séptima consulta oculta ni afirmar observación continua. Una modificación cloud no observada después del snapshot es un límite del muestreo, no atestación ni revocación instantánea del servidor.

### Servidor: serverAdmission v1

Nueva dependencia interna propuesta: readServerAdmission({plan, principal, phase}), sin body ni SQL del consumidor. Resultado exacto con contractVersion='afw-server-admission-v1', serverConfigVersion, planRevision, admissionRevision, observedAt y referencia opaca de principal/enrollment/schema aprobados. El resultado describe únicamente estado del servidor. No incluye networkMode/networkEnforced, sourceRevision observado ni cloud observationsCurrent.

Proveedor confiable obtiene estado del Worker de bindings/config efectivos de ese request, versión de configuración propia fijada por aprobación, JWT verificado y enrollment resuelto en servidor, QA DB primaria exacta, esquema compatible y evento correlacionado. observedAt se genera en servidor tras lecturas, no viene del consumidor. Una etiqueta serverConfigVersion sola es una declaración: exigir que la configuración efectiva pertinente coincida con los campos allowlisted aprobados. No afirmar versión de despliegue administrativamente verificada si solo existe un marcador interno.

Admisión require modo QA exclusivo habilitado, aprobación exacta vigente/no revocada, principal/enrollment/evento iguales y límites temporales con SQL clock efectivo. Releer después de awaits. Pérdida de estado, mismatch o provider ausente: fail closed. Config in-memory se comprueba antes del batch; cambios administrativos concurrentes no son observables atómicamente por SQLite. Revocación de plan y revision D1 sí deben guardarse en el mismo batch que consume admisión y ejecuta efecto, con postcondición y rollback total.

## Adaptación mínima del store actual

Sí: adaptar el store para admitir un contrato explícito versionado serverAdmission y conservar runnerCloudFreshPreflight en el runner. No fabricar preflight cloud con networkEnforced=true para satisfacer ready().

El ready() actual de assistance-occurrence-d1 mezcla source/config/publicación/red cloud con tiempo y revisión de admisión. Plan de separación:

1. Extraer chequeos temporales y correlación inmutable comunes, conservando SQL clock y fences finales.
2. Añadir opción interna discriminada admissionContract. Contrato cloud existente conserva sus validaciones y permanece utilizable solo por callers locales/históricos explícitos. Nuevo server-v1 valida exclusivamente su DTO y proveedor server-owned. Contrato desconocido, mezcla de campos o provider faltante rechaza construcción/admisión. Ningún auto-detect/fallback.
3. HTTP QA exige server-v1 y usa helpers del mismo store; runner utiliza cloud-v1 antes del transporte. No cambio silencioso del significado del constructor existente ni relajación de checks legacy.
4. Persistir tipo/versión/procedencia de admisión por extensión aditiva correlacionada al journal: occurrence_id, sequence, contract_version, server_config_version, plan_revision, admission_revision. Sin JSON arbitrario. Cada transición server-v1 exige esta evidencia y aprobación exacta dentro de la misma transacción. Mantener observation_at/revision como tiempo/revisión del proveedor de admisión, documentando su procedencia por contrato; no etiquetarlos cloud cuando son servidor.
5. Insertar transición, guard de aprobación/revocation/revisión, efecto real, postcondición y clock-check final en UN db.batch. Guard que cambia/cero filas debe abortar toda transacción; no dos commits ni autorización JS seguida de efecto sin fence. Extensión/migración explícita revisada; IF NOT EXISTS no migra instalaciones previas.

No definir serverConfigVersion como cecfg/publicación cloud. Son dominios diferentes. Manifest conserva pins del owner como correlación/autorización; serverConfigVersion y planRevision son campos separados. Digest versionado incluye ambos dominios; no alterar digest de historia ya creada.

## Catálogo server-only y aprobación confiable

Primera implementación local: provider interno inyectado por caller confiable; fixture identificado como synthetic, nunca prueba readiness remota. Fuente futura: tabla aditiva en D1 operational QA existente, sin nueva DB asumida ni acceso SQL remoto en este bloque.

Propuesta de tablas tipadas: assistance_occurrence_approved_plans (occurrenceId/requestId/eventId únicos, signalVersion, principalRef, enrollmentRef, planRevision, serverConfigVersion, schemaVersion, source/config/publication pins, start/deadline/tokenExpiresAt/serverDeadline, planDigest); assistance_occurrence_plan_revocations append-only con revisión monotónica y motivo enum. Plan inmutable; nueva revisión no resucita occurrence/event ya consumido. No campos secretos/personales, JSON libre ni selección de DB por request.

Aprobaciones solo las escribe el owner mediante mecanismo de administración existente posteriormente identificado y revisado; no endpoint consumer create-plan. D1 no prueba por sí sola quién aprobó: la confianza está en la frontera de escritura administrativa y su recibo. Caller servidor conserva binding QA exacto y primaria; consumidor solo aporta occurrenceId/sequence. Missing plan/revoked/mismatch: deny sin crear historia operacional ni efectos.

Revocación permite cierre ledger del plan original, bloquea trabajo; closure no reactiva ni borra aprobación/historia. Stop autentica principal original pero puede usar un lookup mínimo de plan revocado/expirado.

## Rutas y contratos propuestos

Origen fijo operations-manager.agentfriendlyweb.dev, HTTPS canónico, solo POST, sin query/redirect/cookies browser. QA_OFF: rutas nuevas 404 sin SQL. QA_OCCURRENCE_EXCLUSIVE: bloquear TODAS las rutas legacy assistance/incidents/dossiers/notices antes de dispatch/SQL, sin body/header opt-in ni fallback. Identidad servicio verificada y enrollment exacto servidor; browser deny. Limiter actual 10/min conservado, 429 terminal.

| Ruta /assistance/occurrences/ | Body exacto | Transición | Contador |
| --- | --- | --- | --- |
| create | {occurrenceId} | started0 + list attempted1 | control/create |
| list | {occurrenceId,expectedSequence:1} | consumed2 + señal exacta | operational/list |
| admit-claim | {occurrenceId,expectedSequence:2} | claim attempted3 | control/admitClaim |
| claim | {occurrenceId,expectedSequence:3} | consumed4 + run/lease reales | operational/claim |
| admit-finish | {occurrenceId,expectedSequence:4} | finish attempted5 | control/admitFinish |
| finish | {occurrenceId,expectedSequence:5} | completed6 + outcome exacto | operational/finish |
| stop | {occurrenceId,reason} | cierre monotónico independiente | control/stop |

Bodies <=1024bytes, lectura <=1s, reply <=8192bytes y timeout abortable <=10s. UUID literal y sequence exacta. Rechazar campos adicionales: manifest/preflight/identity/enrollment/pins/fechas/lease/outcome/SQL/URL. reason enum operator_closed/window_expired/ambiguous_response: diagnóstico operacional, no instrucción admin. Provider servidor valida señal/evento exactos, señales nuevas y presupuestos existentes sin cambiar lógica de superseded.

Reply allowlisted: version='afw-occurrence-http-v1', occurrenceId, phase, sequence, planDigest, result tipado. create/admit accepted; list señal exacta; claim reservation correlacionada event/request/run/expiresAt; finish intervention_required|superseded; stop stopped. Un 200 no acredita correlación ni autorización. Conflicto/replay 409; provider/schema ausentes closed con categoría fija. No errores privados, secrets ni respuesta personalizada.

## Runner, pérdida y razones

Runner nuevo separado del checkpoint POSIX histórico; no emular saves remotos para ocultar controles. Secuencia exacta Ccreate,Olist,CadmitClaim,Oclaim,CadmitFinish,Ofinish: seis HTTP successful. Solo stop excepcional agrega hasta siete; máximo cuatro controles y tres operaciones. Contador local por invocación, journal global por efecto; no promesa de siete aggregate entre contendientes ni identidad criptográfica de VM.

Cada callback canónico incluye timeout/abort real, lectura/parse allowlist, validación correlación y tiempos antes de devolver. Finish inválido o perdido lanza DENTRO callback, deja contador failed y admite stop. Validación después de send podría marcar completed erróneamente: prohibida. No Promise.race que abandona envío activo, retries ni consulta de recuperación.

Razones locales allowlisted: cloud_preflight_unavailable/mismatch/stale, local_source_mismatch, server_admission_denied, plan_revoked, response_invalid, transport_ambiguous, deadline_expired. Mapear a reason stop enum; evidencia detallada saneada local, no body arbitrario. Si callback falla, el intento ya cuenta. Si control de admisión fue consumido/commit pero reply perdido, no repetirlo ni pasar a operación; un stop como máximo. Stop perdido/401/409: último intento consumido y cierre no confirmado. Completed no envía stop extra. Auditoría posterior requiere presupuesto separado explícito, no runner recovery.

## Ventana QA y cierre sin cambios Access por ensayo

Proponer ventana por aprobación y server admission efectiva, con revocación de plan append-only y deadlines SQL. Reutilizar identidad/enrollment servicio existentes SOLO si ya autorizados y habilitados mediante mecanismo real; no cambiar Access/policy/token por cada ensayo. Si token existente está disabled, habilitarlo sigue siendo acción control-plane pendiente; diseño no lo elude ni declara listo.

Usar finite credential expiry únicamente si el proveedor/identidad existente realmente la aplica y se corrobora. Fecha del manifest limita admisión SQL pero NO hace expirar credencial del proveedor. Token/JWT expiry tampoco equivale a token disabled o policy restored. No credencial administrativa amplia en runner, scheduler ni cleanup inventado.

Tres evidencias separadas: (a) expiry/revocación deniega trabajo por SQL y estado servidor; (b) ledger stopped conserva historia, permitido tras plazo/revocación con autenticación mínima; (c) restauración administrativa token disabled/policy restored/flagsfalse/bindings/cron verificados mediante mecanismo externo real. (a)/(b) no acreditan (c) ni PC-off. Sin modificación Access por ensayo puede no haber política temporal que restaurar: comparar baseline real; nunca anunciar restauración de recursos no leídos.

No connector Cloudflare restaurador acreditado; Wrangler presente sin auth/capacidad verificada. Gate administrativo permanece si habilitación o restauración son necesarias. Revocación manual owner es diseño de denegación, no proceso autónomo acreditado. Stop requiere identidad válida; si token expira o está disabled puede no llegar. Ledger closure independiente exige actor existente autorizado verificado, aún pendiente; expiry protege efectos aunque cierre no confirmado.

## Pruebas significativas propuestas

- Contratos cloud-v1/server-v1 discriminados: campos mezclados, flags network hardcoded, provider ausente o versión desconocida rechazan; server no exige ni anuncia VM observation.
- Runner observa herramienta real antes de cada paso; stale/future/error/pin/HEAD/origin/dirty mismatch: cero próximo HTTP, único stop permitido, seis observaciones máximas sin retries. Fixtures no habilitan remoto.
- Server usa estado efectivo/config versión/enrollment/JWT/schema/evento; body/headers no sustituyen provider ni publican planes; cada legacy route queda vetada en QA exclusivo.
- D1 dos conexiones: unique event con UUID distinto, CAS race, replay, cuarto intento, cero efectos => rollback total, terminal exacto y señales nuevas conservados.
- Revocación/revisión después de lookup y antes de batch, o concurrente entre declaraciones: guard SQL revierte admisión+efecto. Delays antes/entre statements hasta margen/expiry: cero efecto/rollback. Stop expired/revoked no crea negocio.
- Inmutabilidad/aprobación/event correlation, migration explícita y digest history: no regrant resurrection ni schemaJSON arbitrario.
- Cada pérdida control/operación/finish, reply200malformed y timeout: intento contado y único stop; invalid finish no completed. Seis success/siete máximo por runner; contenders pueden superar tráfico agregado pero nunca duplicar efectos.
- Plan expiry con tokenenabled/policy baseline intacta y cierre perdido: denegación probada, restauración/PC-off NO acreditados. Credential expiry ficticia en manifest no acredita provider expiry.
- Presupuestos compartidos cuatro canales/1active/3rolling24h y paths legacy/runtime fuera del modo QA preservados; consent/contexto privado separados.

## Plan mínimo tras revisión y límites abiertos

1. TDD separación versionada de store y evidencia aditiva de admisión; mantener callers históricos y helpers/SQL clock. Solo local Miniflare/SQLite.
2. TDD provider server interno, aprobaciones/revocación exactas y guards en batch. Escribir migración aditiva local, no SQL remoto.
3. Importar contador33b617c exacto y reutilizar operations-http-transport.mjs de la fuente revisada/pin exacto del owner; TDD runner con observador host real inyectado. Validación de negocio y correlación permanece dentro del callback contado, fuera del primitive HTTP. No rutas montadas ni activación implícita.
4. Adaptador cerrado QA_OFF con allowlists y veto legacy, solo tras revisión del contrato. Activación y control-plane siguen otro bloque autorizado.

Pendientes concretos: dependencia host soportada para preflight del runner; frontera real de escritura de aprobaciones; identificación de versión/config efectiva Worker y binding QA; disponibilidad/expiry real de identidad servicio; actor independiente de cierre ledger y cualquier habilitación/restauración admin requerida. Ninguno exige atestación VM ni puente de observación cloud al Worker. No programa, activa ni reclama piloto listo.
