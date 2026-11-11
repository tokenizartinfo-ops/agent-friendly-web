# AFW — diseño de calificación de diagnóstico y límites nativos

7nov2026. PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT SOURCE/SYN GitHub/Actions, sin runtime. BASE29681cae2bf1094ec5c66d5b2784254f77bec697/tree0200cf32ac4e020bd35c56c307fbc8060cf8bd64, Source feat/finite-native-cleanup-20261101; Rootdocs docs/finite-pcoff-continuation-20261103. Estado: diseño aprobado para planificación por Root bajo delegación expresa del owner (opt-out de preguntas rutinarias); buildercheck cerrado. NO implementación iniciada. Se preserva el plan anterior aceptado, sus siete Minor y todas sus excepciones.

## Intención y decisión bajo delegación

El owner busca AFW íntegro en cloud, mínimo uso local y avanzar sin decisiones técnicas rutinarias. Delegó expresamente elegir por él y encadenar bloques; está ausente hasta19:30UTC/16:30Argentina. Root usa la excepción de brainstorming para ese opt-out: no abrir preguntas, permisos, OTP o pruebas reales mientras se diseña. La elección técnica siguiente es de Root, no una aprobación específica atribuida a Gabriel.

La revisión conjunta del plan anterior pasó sin Critical/Important. Antes de promoción quedan RM2/RM3/RM4 yM1/M2/M3: máximos de dos facetas distintas, presupuesto no atribuible y consola truncada. Esta unidad califica diagnóstico y límites; NO optimiza ni modifica código productivo. Queremos saber qué llamadas/bytes/esperas/cancelaciones pertenecen a cada fase y demostrar los topes reales del SDK fijado, con evidencia corta en consola y completa en artefactos.

### Alternativas consideradas

1. Medición atribuible y calificación dirigida sobre los flujos aceptados: conserva toda la lógica y permite decidir una optimización posterior con datos. Root elige esta opción; cuesta una unidad de pruebas/instrumentación y deja la viabilidad real como gate distinto.
2. Reutilizar ahora bytes inmutables dentro del mismo Root: puede reducir payload, pero requiere un diseño de prueba privada y distinguir las proyecciones mutables. Sin atribución y presupuesto sería una hipótesis no medida; queda fuera de esta unidad.
3. Ampliar planes/cuotas o probar APIs reales para compensar volumen: no resuelve por sí solo el fanout, requiere evidencia efectiva/custodia y no corresponde durante SOURCE/SYN. No se contratan ni amplían servicios.

No son tres productos ni un cambio de rumbo. Se reutilizan helpers/SDK/D1/DO/KV/alarm/persistencia actuales.

## Alcance y límites que no cambian

- Ningún archivo lib/**,worker/**,package/lock,configuración productiva,SDK1.2.1,compatflag o API pública cambia. No se exporta la faceta privada, se crea una fábrica de autoridad o se sustituye por una copia del algoritmo.
- Cualquier instrumentación de fuente ocurre sólo en el compilador SYN de fixtures, con marcadores exactos y conteo de ocurrencias antes de I0. Mantiene cuerpo/orden/guardas/promesas/retención nativa y bytes originales en disco; grafos y script transformado se archivan como SYN explícito, no deploy.
- Fuente real3nov02:59UTC sigue vencida. OriginalI0/C0=I0+900000/C1=C0+180000, Root30s/child5s y tres slots originales se conservan. Nada de fake clock, refresco de Access/Source/identidad, cambio de TTL o segundo alarm.
- No repetir los RED/16/51/56 anteriores por rutina; su evidencia queda aceptada y fechada. No broad suite por inercia. Nuevas pruebas sólo cubren los defectos de observabilidad y límites enumerados aquí.
- No Cloudflare API real, runtime, DDL remoto, OAuth/OTP/tokens/permisos, cron/Container/consumidor/avisos reales, nuevo chat, main/PR/publish, Max ni correo.
- Los diagnósticos son datos, nunca autoridad: no habilitan acciones, no son un ACK, no se leen para permitir business/cleanup ni permiten construir Root/lease/SDKselector.
- operationalReadiness=false;completePackage=false;PCoff=false; globalNativeDrainVerified=false/sdkNamespaceEmptyVerified=false.

## Reutilización e interfaces existentes

BASE posee readonlyGrantKv privado en lib/mcp-qa-finite-owner-cleanup.mjs:46–81 (2listas limit100/200gets/concurrencia2), reducción privada:605–640 (1getexacto/2listas/200deletes TOTALES/concurrencia2). Los dos usan SDKreal1.2.1 y retain/guard; su código permanece exacto.

test/fixtures/finite-owner-cleanup.mjs exporta ownerReferenceFixture,prepareOwnerReference,recordOwnerReference,downstreamOwnerReference, instrumentFiniteOwnerCleanup/instrumentCleanupConsumer y modos SYN fijos. test/fixtures/finite-owner-cleanup-persistence.mjs exporta produceCheckpoint,recoverCheckpoint,verifyCheckpoint,observeOriginalAlarm,writeCleanupEvidence. produceCheckpoint soporta unexchanged:true (genuino authorize tardíoC0−300, SDKcodeTTL600 sin exchange) ydeferWait. No hay que rehacer engine/persistencia ni alterar el grupo histórico g0..g7.

La instrumentación test/fixtures/finite-owner-io-fanout.mjs ya observa categorías, bytes/settlement/cancel en un modo anterior, pero su implementación no se reutiliza a ciegas: tiene cap1024 que arroja y categorías limitadas a ese flujo. Sirve de referencia para ganchos y separación de fases; no debe introducir ese comportamiento en el recorrido normal. initial-entry-world registra composiciones esbuild y posee un único sitio de montaje de las extensiones SYN.

Antes de editar, el implementer fija el mapa exacto de hooks/archivos y consumidores de logging, compara BASE/protectedtree y pide ruling a Root si falta un seam. No edita producción ni añade un camino de negocio para hacer medible una faceta.

## Contrato del diagnóstico

Colección sólo SYN, con procedencia por invocación real: identificadores ordinales privados de Root/child/operación, workerRole y fase fijos del callsite observado. Usar identidades locales de leases/contextos/capturas reales; no confiar en un phase/URL/rootId del caller ni en un global mutable compartido entre requests para atribuir settlement tardío. Capturar la fase al entrar, conservarla al terminar. Un transporte M sin Root de control se registra como transporte separado, nunca se le inventa un Root30s.

Fases esperadas del recorrido: setup,authorize_get,authorize_post,sdk_lookup,token_exchange,mcp_read,monitoring_get,monitoring_post,cleanup_before_restore,restore,sdk_reduction,final_inventory. Las operaciones de control dentro de esas fases deben atribuirse o declarar unknown explícito; el pase diagnóstico exige cero unknown para el alcance fijo. No añadir supuestos de deadline a fases cuyo contrato actual no los tiene.

Registro seguro: SourceSHA/role/phase/rootOrdinal/childOrdinal/opOrdinal, clase de recurso fija (CFcredential,CFdeployment,CFversion,CFworkflow,CFcontainer,CFschedule,CFtail,GHsource,JWKS,DO,SQL,KV,transport,rateLimiter), método/operación fija, tiempos de entrada/salida, deadline observado si existe, bytes LEÍDOS/chunks, conteos native-start/native-settle/reject, logical-denial, cancel-start/cancel-settle y estado. No URL/query/headers/cuerpo/cookies/códigos/token/props/identidad raw. Versiones/selector se representan sólo como hash si son necesarios. Parsear encabezados de cuota únicamente a campos numéricos saneados; una ausencia es null, no margen infinito.

No duplicar contadores por cada wrapper: opOrdinal corresponde a una entrada nativa concreta, body-read/cancel son facetas de ESA operación. Agregar por fase/recurso y también conservar Root/child. Distinguir requests de fixture, operaciones DO/SQL/KV, bytes de cuerpo, tiempo de headers/lectura/parse/validación cuando observado, lógica de timeout y settlement real. No sumar duraciones solapadas como wall-time ni comparar denominadores diferentes. Peak se mide desde entrada/settlement del scope nombrado; separar native-call de hold outward-ACK.

Colección sin alterar el resultado: no throws, sleeps, aborts o awaits adicionales de negocio por observar; no guardar Response/Buffer/capabilities en resultados. Cap16384eventos por collector, strings sólo enums/hex/ordinales, contadores seguros; al saturar dejar de retener filas, marcar overflow y seguir counters sin cambiar el resultado original. La calificación NO puede declarar diagnóstico completo con overflow/unknown/actual-promise sin resolver. No se usa la saturación como autorización ni se oculta.

### Consola y artefactos

Conservar el resultado completo saneado en JSON a través de los helpers existentes, junto a fuente/grafo/native manifests. Cambiar los puntos de consola de recordOwnerReference y resultadoR2 para imprimir únicamente resumen≤2048bytes UTF8 por línea con propósito/version, Source, nombre de caso, estado/counts, ruta de artefacto, bytes ySHA256 de los bytes realmente escritos. Escribir primero el JSON, calcular hash sobre ese mismo buffer y emitir resumen después. No truncar un JSON arbitrario ni perder datos fuera de pantalla. Mantener retornos completos para tests/consumidores, no cambiar sus decisiones; actualizar sólo consumidores de logging que el preflight identifique. Los logs históricos no se reescriben.

Full JSON y eventos son SYN saneados; no importar credenciales reales a la fixture. Readbacks del upload descargado exigen source, rutas exactas, bytes/hash, formato/contador/denominadores y ausencia de archivos desconocidos. Consola corta no reemplaza artefacto completo.

## Casos y premisas nativas

Exactamente16casos de la calificación final propuesta:8 contratos puros +3readonly nativos +4reduction nativos +1ciclo positivo instrumentado. No añadir los éxitos de RED/intermedios a ese total. Cada familia demuestra un contrato distinto; no llamar cobertura readonly a la reducción.

### Ocho contratos del colector/proyección

Q1 campos allowlist/redacción sin valores sensibles; Q2 identidad ordinal y denominadores sin doble conteo; Q3 fase capturada sobrevive settlement tardío y request concurrente; Q4 native vs logical vs cancel se conservan distintos; Q5 métricas/DTO no conceden autoridad ni alteran resultado/promesa; Q6 overflow marca incompleto sin cambiar efecto; Q7 resumen≤2048B con hash/ruta de JSON completo; Q8 lifecycle de bytes/lecturas/cancel y peak por scope no se infieren de promedios. Estos son componentes puros SYN, no simulaciones de un ACK real.

### Tres casos readonly (genuino SDKcomplete en cada linaje)

R1: inventario nativo de200grants/2páginas de100, exactamente uno con la correlación original; API SDKreal realiza200gets y el redirect exige Reference genuina durable. Extra199filas son entradas nativas modeladas SYN con formato SDK fijado y metadata extranjera, nunca200autorizaciones emitidas ni recibos sembrados. Medir limit100/cursor real/peak2/scope y preservar sentinel ajeno.

R2:201entradas hacen necesaria tercera lista; rechazar antes de la tercera entrada nativa y antes de redirect/Reference exitosa, aunque el candidato propio esté entre los primeros200. No ampliar listas/get budget, no repetir SDKcomplete.

R3: después de una página poblada, retener los ACKs outward de los primeros DOS gets ya invocados y dejar cola poblada; vence child original5s. Otro Root LIVE mismoctx sigue excluido hasta settlement; al liberar no entra ningún get de la cola ni vuelve302/Reference/SDKcomplete. Rotular holdpostnativeACK si el KV ya se resolvió; no llamarlo latencia física. Mostrar pico2 del scope correcto y eventos/cancel reales.

Todas las filas adicionales y controles son inputs nativos SYN no confiables, derivados del subject/prefix original sólo dentro de fixture. No caller-selector/metadata como permiso productivo. Los clocks/expiraciones del grant original permanecen.

### Cuatro casos reducción (mismo linaje original por réplicas explícitas)

Producir una sola ocurrencia genuina unexchanged:true como el control aceptado g6: Reference previa302, grant todavía presente naturalmente alC0 (codeTTL600) sin modificar expiresAt/reference. Recuperar los mismos archivos/IDs/scripts antesC0. Cada caso usa réplica SYN aislada del checkpoint, con a lo sumo dos Miniflare vivos; no reconstruye receipt/alarm/Source/I0.

D1:199claves token propias +grant final=200deletes TOTALES; SDKnormalreturn y cierre correcto con inventario fresco. D2:200tokens consumen200deletes; el intento grant201 se deniega antes de KV I/O, originalgrant conservado, sin SDKObserved/OwnerReceipt/completion exitosa. D3:201tokens requieren tercera lista; negar tercera lista antes de I/O, conservar incertidumbre/sin replay/ACKfabricado. D4: cola de deletes poblada con primeros dos ACKs outward retenidos, vence el child original, no nueva emisión tras fallo y otro Root excluido hasta settlement real del scope. Al liberar no inventar retorno SDK exitoso ni repetirlo.

Los token rows adicionales son marcadores inertes SYN, no access tokens ni nuevos grants de datos. Medir el número total realmente existente antes de empezar y usar el prefix original; no asumir que el exchange dejó cero/uno. Mantener expiración absoluta del grant genuino al modelar filas: no extender TTL/C1 ni refrescar un recurso para que quede presente. Sentinels fuera del prefix/subject intactos. Los resultados pendientes son pases de protección, no retiros completados. Para D4 no hace falta repetir los tres slots/restart ya calificados: comprobar primera invocación, exclusión y no nueva emisión hasta settlement; reporte limita su alcance.

### Un positivo completo para diagnóstico atribuible

Productor actual hasta SDKReference/token/MCP/NoticeLink genuinos, con métricas por fase sin respuestas exitosas sembradas. Cold checkpoint de la misma ocurrencia, consumidor antesC0, mismo alarm aC0, una restauración y reducción nativa/inventario/receipt. Afirmar que las sumas porfase/recurso concuerdan con sus contadores nativos nombrados; preservar separados los agregados de fixture y las operaciones dentro de scopes. Todos los child/Root existentes dentro de sus techos, sin ampliar un milisegundo. Este positivo sólo valida medición y regresión del flujo usado, no reejecuta la matriz completa previa ni prueba proveedor real.

## RED y ejecución cloud

Un RED focal diagnóstico antes de implementación: usar los helpers BASE existentes para producir SDKcomplete real/Reference y salida actual; preservar hechos/resultado y afirmar atribución completa/resumen acotado. Debe fallar por el déficit real de diagnóstico/longitud tras el efecto observado, NO por importar un archivo/helper nuevo, premisa inválida o clock/hash viejo. No hay que esperarC0 en ese RED ni reabrir RED históricos. Cualquier límite ya implementado que pase en BASE sigue siendo control, no se presenta falsamente como una nueva reproducción de bug.

FinalGREEN seleccionado en la misma revisión, después de implementación/instrumentación:7jobs (contratos,readonly,positivo_prepare→positivo_consume,reduction_prepare→reduction_consume_a yreduction_consume_b);3lanes,native≤2Miniflare/job, jobs≤15min (readonly≤7,contratos≤2). Lane1positivo_prepare→positivo_consume;lane2reduction_prepare→reduction_consume_a(D1,D2);lane3readonly→reduction_consume_b(D3,D4), dondeconsume_b también depende dereduction_prepare. Contratos precede las treslanes. Tres linajes readonly separados terminan antes de sus C0; positivo yreducción son dos linajes pareados900s: cinco linajes/10grafosM-QA, sin nuevo SDK-only graph. Los cuatro D son réplicas expresas del MISMO checkpoint, no cuatro nuevos I0. Cada consumidor de reducción monta sus DOS réplicas antes del MISMO C0 y configura sus tokens modelados/hold fijo antes delalarm, sin restart:true ni carga conalarmvencido. Las dosparejas corren en jobs distintos yconcurrentes (máx3jobsnativos/6Miniflareglobal;máx2porjob); cadajob recupere ambasréplicas almenos30s antesC0 oaborte antesdeefectos. No hay segundapareja montada despuésC0 ni seam de overduealarm. LasmutacionesSYNdeinputKV despuésdecoldreadback son declaradas ycomparadas aparte, nunca sustituyen records/receipts/identidad/scripts originales. Productores respetan apertura antes90s/C0−120000 y recuperación30s antesC0; no abrir I0 si no cabe el job. Capturar volumen/tiempos de la instrumentación, sin declararlos RTT real.

contents:read only, sinsecrets; checkouts SHA; node22/currentlock/npmci ignorescripts/audit/fund como antes; sintaxis+lint de changedfiles y comandos exactos en reporte. Sourcefrozen durante cada run. Por cada upload7d, descargar MISMO artifactid/run y verificar inventario exacto/scripts/metafiles/native-state/bytes/SHA. No extraer DB/scripts en el ordenador. Artefactos completosSYN y resumenfechado durable; no prometer retención indefinida del binario.

## Mapa y revisión

Whitelisted inicial propuesto: nuevos test/fixtures/finite-budget-diagnostics.mjs (colector puro), finite-budget-evidence.mjs (escritura Node) y finite-budget-world.mjs (instrumentación/CLI), nuevos test/finite-budget-diagnostics.test.mjs y test/mcp-qa-finite-budget-native.test.mjs; modificar sólo los seams necesarios en finite-owner-cleanup.mjs,finite-owner-cleanup-persistence.mjs,finite-initial-entry-world.mjs, finite-first-connection-publication.mjs (plugin M opt-in) y test/mcp-qa-finite-owner-cleanup-native.test.mjs (dos logs, no decisiones). No se modifica finite-owner-io-fanout.mjs. Todos bajo test/fixtures; Root debe fijar la lista definitiva tras preflight, antes de escribir. Qualifier temporal nuevo .github/workflows/afw-finite-budget-qualification.yml, retirado terminal. Reportes/briefs/ledger de ESTA unidad separados del plan anterior. No usar un facadetest exportado en lib/ para evitar el flujo genuino.

Buildercheck fresco antes del plan: preguntas importantes sobre medición/premisas/agrupación; Root responde las ya resueltas y decisiones técnicas delegadas, no consulta al owner ausente por rutina. Luego writing-plans y SDD secuencial con un escritor Source y gates de tarea +revisión conjunta. Preservar BASE y cadaCAS/readback; rollback sólo cambios propios, sin reset/force/eliminar historia. RamaSource existente está aislada de main y se preserva cloud; no clone local.

Cierre de unidad: diagnóstico atribuible con límites/casos/readback reales y consola segura, ambas facetas calificadas por separado, código productivo exactoBASE, reporte honesto de lo que no midió. Puede cerrar M3 y parte de M1/RM2/M2 según evidencia; NO cerrar RM3 de viabilidad operacional ni RM4 de warnings por un verdeSYN. RM1 histórico permanece excepción. No reclamar ahorro, cuota disponible, reparación de5065ms, ejecución CodexCloud/PCoff o las fases futuras no implementadas.


## Buildercheck y resolución Root — 7nov17:47UTC

El builder fresco finite_budget_builder_check leyó diseño/hechos yfacetas/helpersBASE. Única pregunta importante: D3/D4 no pueden montarse después de D1/D2 yconservar recuperación preC0 usando sólo dosMiniflare; restart:true permitiría carrera conalarmvencido yconfiguración tardía. Root acepta elhallazgo de diseño ydescarta inventar una recuperación overdue comoatajo.

Ruling Root: siete jobs, dos consumidores de reducción que comparten el MISMO productor/checkpoint yrecuperan sus dosréplicas cadauno antesC0; consume_b reutiliza la lane readonly ya terminada ydepende deambos trabajos, manteniendo treslanes/seisMiniflareglobales comomáximo. Los16casos/cincolinajes/diezgrafos ySource/Root/child/C0/C1 no cambian. Motivo: resolver lacomposición conprimitivasaceptadas, sin nuevo seam/clock ni lógica productiva. Costo si es incorrecto: más overhead de un job y posible fallo de margen de descarga/montaje; debe abortar yregistrarse, nunca ampliar el reloj ni afirmar verde desde un setupinválido. No añadir otro intento automáticamente sinrazón nueva.


## Aprobación de diseño para planificación — 7nov17:49UTC

El mismo builder revisó únicamente la corrección de su pregunta y respondió literalmente «nothing important left». No se abrió otro reviewer ni un test. Root aprueba este diseño bajo la delegación vigente y la excepción de brainstorming del owner que pidió decidir/encadenar sin preguntas; no se atribuye una revisión humana deeste documento ni permiso operacional nuevo. Los16casos/7jobs y restricciones anteriores son el contrato actual. Próximo paso: writing-plans; ningún cambio Source hasta plan/preflight/brief fijados y un escritor designado. La aprobación es para SOURCE/SYN, nunca runtime/credenciales/promoción/ensayoPCoff.


### Decisión menor al planificar

Root separa el colector puro (importable en worker SYN) del escritor de evidencia Node-only finite-budget-evidence.mjs. No se permite arrastrar fs al grafo del worker ni introducir almacenamiento productivo por un helper de pruebas. Es separación de responsabilidades dentro del mapa propuesto, no otro subsistema ni cambio de contrato. Costo: un archivo test adicional; protegido por graph/readback.


## Preflight Task1 — ruling Root7nov18:09UTC

El implementer finite_budget_diagnostics_impl (Solhigh) verificó BASE/tree3179leaves/main/AGENTS/refs y devolvió NEEDS_CONTEXT antes de escribir. Root leyó handling-reports fresco y resuelve sobre hooks concretos, sin forzar un reintento idéntico.

1. Whitelist añade test/fixtures/finite-first-connection-publication.mjs:102–146 para plugin de compilación M opt-in budgetQualification con default/negativeProfile exactos; initialEntryHarness42 delega allí el M. Añade test/mcp-qa-finite-owner-cleanup-native.test.mjs:22/131 sólo para adaptar llamadas directas de console después de writeCleanupEvidence. Conservar tests, registro, assertions, retornos y rutas JSON; sin monkeypatch global console. finite-owner-io-fanout no se edita. Los demás cinco nuevos+tres fixtures+TEMP+reporte dan12paths Source permitidos.
2. Se acepta carrier SYN AsyncLocalStorage con store INMUTABLE {collector,rootRef,childRef,phase}, separado de colector puro/fs, dentro de archivos permitidos o inline en script transformado; otro archivo requiere ruling. Instancia ALS puede compartirse por worker, nunca currentPhase global. run devuelve exactamente el retorno del callback; capturar fase/refs al entrar y conservarlas al settle. Verificar compatibilidades existentes de CADA grafo; no flags/fechas/deps nuevos. No enterWith/disable. Thenables no-Promise requieren observación capturada/snapshot pasivo, nunca conversión que sustituya la promesa nativa. Contexto ausente significa diagnóstico incompleto, no Root/phase inventado. [API oficial ALS](https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/), consultada7nov, respalda run/getStore y sus limitaciones; no prueba configuración efectiva ni resultado.
3. Atribución fija aceptada: leases request/child desde owner-preparation67–98 e initial-lease8–17; entrada OAuth648/Notice851/962 y lookup838; lookup native55/reduction native614; lifetime cleanup151–155 y parent alarm actual36; final inventory657; fetch/body/cancel/SQL/DO de phase-context70–135/fixed-policy-engine33–53 y M finite.fetch17–22. Componer sobre fuente YA preparada por el builder, sin raw-read que sustituya CEILING/firstConnection instrumentation. Marker allowlist contada completa+grafos antes I0; leaf/capture ausente detiene/reporta, no zeroUnknown ficticio.
4. Escritor Node admite TRES prefijos fijos: output/finite-budget/, output/owner-reference/, output/owner-cleanup/. Conservar rutas/retornos de helpers previos; no arbitrary-path ni mover resultados para acortar logs. Hash de mismos bytes escritos antes del resumen; bytes de artefacto Node distintos de wirebytes nativos.
5. R0 autorizado sólo como etapa inicial: nuevo native.test y TEMP, imports sólo BASE. Preservar SDKcomplete1+Referencehash+302+grafos/metafiles/nativefacts/outcome/manifest ANTES del assert missingdiagnostics. No DBcheckpoint completo necesario en RED forward; GREEN cold checkpoint sí preserva archivos nativos. Sin imports nuevos ni M plugin change todavía. Root valida causalRED antes de implementar el colector; Source freeze/contentsread/no human window.

Ruling: aceptar los dos seams observacionales y carrier SYN sin producción — permiten medir M real y salidas R2 sin clone/engine alternativo y con resultados idénticos — costo si es incorrecto: instrumentación podría alterar timing/contexto; Q3/Q5, graphcoverage/promiseidentity/P1/protectedCore deben rechazarlo, no cambiar compat/clocks para pasar.

## Enmienda técnica Root — 2026-11-07 19:23:57 UTC: límites de uso y RPC

Se añade al enum fijo resourceClass la clase rateLimiter para invocaciones observadas del binding nativo existente, y las operaciones fijas limit y rpc al vocabulario del diagnóstico. rpc corresponde a método efectivo de DOstub/resourceClassDO identificado porprocedencia; limit a bindingRateLimiter/resourceClassrateLimiter. No se crean recursos, límites, binding, permisos, reintentos o capacidades nuevas. Se corrige un vacío de observación del recorrido ya existente, dentro deTask1/12paths.

Métricas de llamada nativa completada/rechazada y denegación lógica delSource siguen separadas. No persistir claves/argumentos del limitador ni convertir resultado deautorización en autoridaddiagnóstica. Bytes opacos siguen null/not_exposed_by_native_api. Valor/promesa/error/guards/retención/Sourceclocks intactos. Cubrir clases/operaciones dentro de los8Q originales; no9ºQ ni calificaciónextra. Fuente real preservada; pipeline sóloSYN.

El mapa porrol debe distinguir edges síncronos deidentidad (namespace.get, D1session/prepare/bind) de operaciones observadas de ejecución; esa clasificación de métrica no afirma tráfico interno cero. La documentación primaria describe [stubs deDurableObjects](https://developers.cloudflare.com/durable-objects/api/namespace/), [sesiones y statementsD1](https://developers.cloudflare.com/d1/worker-api/d1-database/) y [bind/ejecución](https://developers.cloudflare.com/d1/worker-api/prepared-statements/). El [limitador nativo](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) devuelve decisión mediantePromise y mantiene contadores aproximados/locales; esa doc no acredita configuración, cuota o resultadoAFW.

La documentación de [reintentos internosDO](https://developers.cloudflare.com/durable-objects/best-practices/automatic-retries/) actualizada5Nov2026 impide equiparar invocaciones de API con intentos físicos o red. Es una limitación delclaim y futurodato de runtime, no motivo para cambiar retrylimits/markretryable/compat enestaunidad; no inferir aplicación de defaults reales al workerd instalado. native-start/settlement ylatenciassonobservacionesSYNsegúnalcance, nunca físicoDrainenative/quota niPCoff.

## Enmienda de medición de cuerpos — 2026-11-07 19:36:06 UTC

Cada invocación real a reader.read, reader.cancel o consumidor nativo de cuerpo tiene su propia fila read/cancel y settlement de su valor/Promise original. Fetch termina al recibir cabeceras; su nativeActive no se prolonga artificialmente durante lecturas/cancelación. Total de invocaciones nativas, cantidad de fetch/HTTP y cantidad de lecturas son denominadores diferentes. Settlement de cancelación no demuestra drenaje físico.

Se permite metaopcional fetchOpRef en begin para read/cancel. Se valida referencia opaca de este colector a operación fetch con los mismos Root/child/fase/resource capturados; se proyecta únicamente fetchOpOrdinal numérico o null. Operaciones restantes llevan linknull. Response/reader de fetchconocido conserva su vínculo esperado: falta/refajena/mismatch esincomplete. Lectura de Request entrante genuina puede tener null y su propio contexto request/transport real; no inventar un fetch padre. No reatribuir un resultado tardío a fase/Root corrientes.

Bytes/chunks expuestos por una lectura se registran SÓLO en su fila read; los agregados de cuerpo por fetch se derivan de filas vinculadas y no vuelven a sumar esos bytes en la fila fetch o los totales. Resultado opaco json/text conserva bytesnull/not_exposed_by_native_api: no clones, lecturas extra ni estimación por serialización/string. EOF permite cero bytes observados cuando realmente no hay chunk, sin convertir opacidad en0.

El fetch padre puede conservar facets de cancelación iniciada/terminada mientras la fila cancel conserva la invocación/settlement nativos. No duplicar esos facets enambasfilas para inflar counters. El pico incluye Promises nativas realmente pendientes, no sólo el estado del fetch de cabeceras o un ACK exterior. Mantener cap16384/overflowexplícito que invalida calificación, sin éxito con descartes silenciosos. Cubrir asociación, scopes, bytes, counters y exactas promesas/errores dentro Q2/Q5/Q8 existentes, sin aumentar8Q/9total ni cambiar conductaSource.

## Gate de mapa aceptado por Root — 2026-11-07 20:27:02 UTC

Se acepta la estrategia fija P1 del checkpoint Source dc404e2e2abe47a7cdd62b1a3a1e48e6fd5c5ef6, reporte1c432f561663c15355ada9cc66742da85efbc57a/helperb5d6e22fc0f930a7e38e132a1d0fbad065d6a263. Root leyó la propuesta/datos:130paths fijados,635grupos selectores,12familias,4paquetes y61Reflectsites delentry; todoslosrawpins presentes yrolescoinciden. HayexclusionesdepathsWorkflow/legacy/fixture,sinclaimuniversal.No es una prueba ni aceptaciónTask1: hooks/countsASTpreparados/identidad enejecución y9GREEN siguen sinverificar.

Condiciones de implementación:
- Descriptores son datos de compilación Node, NO parte del grafo Worker. Se autoriza un13ºpath: test/fixtures/finite-budget-descriptors.json, exclusivamente para separar el literalde datos de272KB/11343líneas delcompiler/helper. Preservar semántica/procedencia de los datos, carga determinista ypurepreflight; no usarlo como autoridadde negocio. Runtimeemitido usa sólo metadata compacta/enum/IDs necesaria, no losrawsource/descriptorescompletos.
- Preservar forma de llamada, receptor/método/args, cada evaluación/getter y thrown/value/Promise originales. ALS.run debe ejecutar la INVOCACIÓNoriginal ydevolver su resultado, sin cambiar this ni sustituir callback/argumentos nativos; no asumir que pasar callbackdirectoaALS.run preserva elreceptor. Nada de envproxies/reemplazosdemethodnuevos/eagerbody/extraReadClone.
- AntesI0, elpurepreflight yla compilación nativa deben validar pins, roles, composiciónprevia ycuentasAST exactas; rechazar matches solapados, inputs/métodos sinresolver odiscrepancias. No ampliarselectores/dropUnknown para pasar. HashesQA e8sonprovenancia de inputs antiguos dinámicos,no golden futuros; capturarscript/metafiles/hash realesdelrun. Default/negative/nooptincomposición preservada.
- Capturar snapshots de CADA época deM/QA antes de remount/setOptions/cold/disposal y despuésde su trabajo; no sólo alfinal productor/consumidor que perdería scopes anteriores. Ordinals/peaks locales porepoch/role, nada de sumadepeakscomo concurrenciaglobal. Distinguir nativebottom/promesa yACKexterior; physicaldrain/NetworkAttempts siguennoacreditados.
- Nativebodyread/cancel ybytes/asociaciones según lasenmiendas anteriores. Todas lasrowdata son diagnóstico,nopermisos/RootSource. Schema fijo, sin payload/keys/URL/headers/rawidentidades. Overflow/incompleteness causa fallo deltestdiagnóstico, no altera llamadaSource.

Se libera la congelación de Source dc404 para implementar Task1 dentro de13paths yejecutar UNA calificación finalcoherente8Q+P1=9 según elplan:3jobs,unlinaje900s/2grafos nativos,Sourcefrozen mientrasCIactiva,exactsameIDartifactreadback7d,retirarTEMPterminal/reporteappend/CAS/STOP. No más standaloneinventarios/R0/suitesantiguas niotroscasos. Si preflightfalla noI0, conservarfallo yreportar antesdeautorreintentos. Si aparecebugCore, no salirdewhitelist silenciosamente. No necesitaotropermiso humano paraCIcredential-free; síreshacerScope ante seguridad/externalacciónnueva.

Después código+9evidenciaverificada, Root despacha revisión frescaSpec+Quality; Task2noarrancaantesdeaceptarla. operationalReadiness=false;completePackage=false;PCoff=false. Nada de providerAPI/runtime/token/OAuth/cron/consumidores/main/publicación.

## Denominadores de denegación lógica — 2026-11-07 21:20:32 UTC

Una excepción de guard Source es un evento de scope. No se proyecta por defecto sobre todas las invocaciones nativas anteriores de ese Root/child/fase: algunas ya terminaron correctamente y pueden ser ajenas al ACK exterior que sigue pendiente. logical(opRef) conserva su significado de denegación asociada explícitamente a una operación mediante una referencia estable; logicalDenied cuenta esas filas nativas, no eventos de guard. Nunca inferir últimaoperación ni faseglobal.

Añadir observación sólo de datos scopeLogical(rootRef,childRef|null,{phase,at,reason}) (nombre privado equivalente permitido), arrayDTO logicalScopeEvents acotado y totales separados para cantidad real de eventos de guard y cantidad de scopes Root/child/fase distintos denegados. Registrar el throw real una vez en el seam fijo de guard, preservando la misma llamada/error; no sondear/reinvocar guard, registrar mensaje/Error crudos ni duplicar por catchs superiores. Usar reason guard si el branch delSource no demuestra timeout/aborted.

Sin asociación individual inequívoca, la fila nativa queda sin logical y el evento queda atribuido al scope real: eso conserva la observación honesta, no inventa un fallo nativo. Scope ausente/ajeno esincomplete. Una operación quefulfilló conservaeseestado aun con guard posterior. No hay autoridad de permiso ni cambios Source. Retención total acotada alcap16384 existente yoverflowexplícito; ningúncontador dedatosexime de guard.

Extender Q4 existente con nativefulfilledsinmarcaindividual+scopeevent, guard countvsdistinctscope ylogical(opRef) separados; mantener exactamente8Q/9total, sinotroCI/caso. Root yChild reales,inmutables/segmentedbyepoch comoantes. Documentar los nombres finales reales enreporte. Esta definición aclara el contrato; no permite declararcoberturaSourceuniversal.


## Addendum Root — 11 November 2026: additive chronology experiment

User resumed the saved work. Source remains1455ba78e021f41b82700035a3819898b6a255d7; main and Rootdocs refs verified unchanged. Existing G5 summaries cannot identify when invalid/unattributed begins, because the sensor does not export its event counter. Root authorizes additive fixed-key chronology and reason counters, preserving the original cap16384, event ordering, retention, return values, guards and all business behavior.

The snapshot may additionally expose afw.finite-budget-chronology.syn.v1: actual eventCalls/byEvent, firstOverflow/firstInvalid ordinals+fixed method/reason enums, invalid/unattributed before/after counts and fixed reason histogram. The transition event is after-overflow for classification. No raw data/capabilities, arbitrary caller strings, wall-clock authority or replacement phase globals. Snapshot reads are observational and do not consume events.

One new pure-contract RED precedes implementation. Then one fresh8Q+prepared preflight and producer-only diagnostic via the existing deferWait:true API; the original genuine setup/SDK/Reference/Notice and original900s C0/C1 are preserved, the fixture disposes BEFORE C0. This is not a full lifecycle, nine-check acceptance or replacement for P1. No new real/provider operation. Full causal ruling remains pending the observed chronology. Exact narrow scope and constraints are in briefs/2026-11-07-finite-native-budget-qualification-chronology-resume-20261111.md.
