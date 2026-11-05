# Finite owner I/O fanout — diseño acotado

5 de noviembre de 2026. **DESIGN ONLY / INACTIVE.** Root seleccionó preparar esta opción conservadora; no se atribuye al usuario una aprobación de diseño ni se activa implementación. Root debe revisar este documento, el plan y el preflight antes de cualquier despacho SOURCE. Un solo escritor de producto; no intervenir en D0.3.

## Base, alcance y resultado

Fuente inspeccionada: **d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72**, D0.2 aceptado independientemente según root. Archivos principales: [phase-context](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-owner-phase-context.mjs), [initial-lease](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-initial-lease.mjs), [stage-work](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-stage-work.mjs). La base de ejecución futura debe fijarse de nuevo después de D0.3; este pin de diseño no autoriza sobrescribirlo.

Una sola unidad rechazable: reducir la profundidad serial de lecturas Cloudflare dentro de cada primary(), manteniendo exactamente sus llamadas y validaciones. No D1 batching, caché, reutilización de descriptores/módulos, renovación de relojes, dependencias, endpoints, opciones públicas, cambios de bindings ni modificación del store Unit2a.

Resultado observable esperado: bajo un workload SYN de respuestas provider demoradas50ms, probar causalmente si la misma cadena original de consumo/grant termina dentro del hijo5s mediante concurrencia fija2. No prometer el positivo antes de medirlo. El ensayo no acredita latencia real.

## Contrato y restricciones exactas

- observeOwnerPhasePair({ctx, env, parent, preconnectionId?}) sigue privado, con idéntica firma, frame de datos y validación.
- readPrivateQaFiniteOwnerContext(options) y handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) conservan sus firmas/resultados y fronteras estrictas.
- Máximo **2 actual provider fetch/body/cancel lifecycles** simultáneos. Constante estructural; no pool configurable, parámetro del caller, semaphore público ni capacidad exportada.
- Hijo original **≤5000ms**; raíz original **≤30000ms**. Mismo clock absoluto/monotónico, expiraciones, activeChild, source/owner/lease/store/consumption witness y holders nativos.
- Techo fuente **2026-11-03T02:59:00Z** sigue expirado. Sustitución de ceiling exclusivamente en el fixture SYN existente, nunca en producto o como permiso live.
- Mantener ambos snapshots completos, frescos y cronológicos; original orden facts A→primary A→qualify A→primary B→facts B→qualify B→comparación completa.
- No solapar snapshots, SDK calls, journals, SQL mutations ni rechecks diferentes. El SELECT ownedProject puede coincidir con una lectura provider QA dentro del mismo primary.
- Cada SELECT factual actual sigue siendo primero en una sesión nueva first-primary; D1/preflight/SQL y todas las claves/proyecciones quedan sin cambio.
- Provider requests mantienen GET, origen fijo, tokens originales, no-store/no-cache, HTTP/status/header/Date/body/length/JSON/cancel checks y caps **8192/65536/4500000B**.
- No cambiar gramáticas, recuentos, bytes de módulo, backup≤2097152B, inventory16/read17, effects32/read33, enrollment2/read3, issuer14/read16, SDK8/read9/16384B por record.
- operationalReadiness=false; completePackage=false; PCoff=false. Sin grant real, instalación, credenciales, permisos, Entry o acceso real.

## Schedule fijo y joins cerrados

Cada primary() tiene dos fases. La segunda empieza sólo si las dos credenciales se verificaron completamente y el clock/holders siguen vigentes.

1. Iniciar juntos verify reader y verify publisher. Cada función espera su request completo, decodifica el mismo envelope/fields, y comprueba id, active, expires_on y not_before exactos. Un join espera ambos resultados; cualquier rechazo niega el primary. La expiración original se vuelve a comprobar por current(clock.lease) después del join. No basta con que HTTP200 haya llegado.
2. Iniciar juntos dos ramas fijas:
   - **QA:** deployment pointer→comparación esperada→versión QA exacta include=modules→validación íntegra del único módulo, configuración y campos.
   - **M:** deployment pointer→versión inicial activada M include=modules→validación íntegra→ownedProject SELECT original→versión M actual include=modules si el pointer difiere→validación íntegra.
3. Esperar ambas ramas completas y comprobar current(clock.lease). Sólo entonces componer qaMetadata, comprobar aliases/bindings QA/M actuales e iniciales mediante las dos llamadas originales a qualifyFiniteOwnerSdkBindingFacts y producir PhysicalObservation. Si una rama falla, no devolver datos de la ganadora ni ejecutar qualify del snapshot.

Se conserva el orden interno M y el lugar del SELECT ownership. La versión inicial M usa capsule.activatedVersionId, no el backup histórico plan.baselineVersionId. Mc/Mo coinciden con resident.bytes sólo porque los qualifiers lo comprueban; ambos cuerpos se descargan y comprueban otra vez.

**Interfaces privadas propuestas dentro del mismo observeOwnerPhasePair/run:**

| Función | Entrada | Resultado local |
| --- | --- | --- |
| verifyCredential(token, id, expiresAt) | valores originales capturados; string,string,number | Promise<void>; mismas comprobaciones de credentials |
| credentials() | ninguna | Promise<void>; join fijo de exactamente dos verifyCredential |
| readQaPrimary() | ninguna; cierre lexical original | Promise<QaPrimaryData> |
| readMPrimary() | ninguna; cierre lexical original | Promise<MPrimaryData> |
| primary() | ninguna | Promise<PhysicalObservation> idéntico al actual |

QaPrimaryData={qaMetadata}; qaMetadata es la misma proyección por configKeys obtenida sólo después de validar q completo.
MPrimaryData={project,pointer,currentConfiguration,configuration,initialBaseline}; configuration es M inicial plenamente cualificado; ningún campo añade authority flags, witness, Promise o capacidad. PhysicalObservation conserva exactamente {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline}. Estas estructuras intermedias nunca salen del módulo, no se almacenan, no se aceptan como entrada ni pueden rehidratar la invocación.

Usar joins de dos promesas retenidas con Promise.allSettled, comprobar dos fulfilled y descartar ambos datos si cualquiera rechazó. No generic parallel runner con callbacks arbitrarios. Crear ambas promesas a partir de closures fijas bajo el scope vigente antes de esperar, capturando también fallos síncronos como rechazo; retener la promesa de cada rama y la del join. No añadir retry. allSettled no acredita drenaje físico cuando un child.wait rechazó antes de que su operación subyacente terminase.

La rama ganadora puede completar lecturas mientras la otra falla; eso no autoriza efectos. No se empieza otra fase/snapshot tras un rechazo. El cierre final de la observación sigue abortando su clock; no se afirma que ese abort cancele físicamente el proveedor.

## Prueba de compatibilidad de leases y retención

[createFiniteInitialLease L3–19](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-initial-lease.mjs#L3) no tiene mutex ni slot child único. Cada llamada child crea sus propios began/m0/until/controller/alive/timer; until=min(end,began+5000). Las ramas sólo comparten end/holders y el conjunto pendingWork. Sus comprobaciones síncronas leen Date.now/performance.now sin backdating. Cerrar un hijo no cierra su hermano. Un padre abortado o vencido invalida ambos por check/propagación. **No hace falta modificar este archivo.**

[phase L88–107](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-owner-phase-context.mjs#L88) ya retiene el trabajo real de cada read child, fetch, stream.read y cancel. Una rama no pasa al siguiente request hasta terminar el anterior, incluido finally/cancel; si child.wait gana por timeout, la rama rechaza y nunca abre un request siguiente. Por ello dos ramas fijan el máximo2 incluso si una operación real permanece pendiente tras timeout. No reemplazar estas retenciones con la promesa raced del join.

[stage-work L16–23, L67–89](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-stage-work.mjs#L16) usa un Set de promesas por scope AsyncLocalStorage. observeFiniteFactualReadWork toma prestado una vez el contexto ambient del mismo root, env, storage y db; las cadenas Promise creadas allí heredan ese scope. No se invoca de nuevo por rama, no se usa su fallback para emitir SDK y no se crean entradas paralelas de request. released sólo libera tras originalLease abortado y promises.size===0. **No hace falta modificar stage-work ni añadir admisión/scope selector.**

El wait del handler sigue comprobando su activeChild original antes/después y compitiendo con ese mismo deadline; los read children no renuevan el hijo consume/grant. Cualquier resultado tardío sólo puede descargar retención. No ACK tardío, código, nueva mutación, reconstrucción de witness, reapertura ni drenaje global SDK/KV inferido.

La prueba fuente hace plausible la concurrencia; las pruebas nativas exigidas abajo deben corroborarla. Si el runtime no conserva ese scope, se informa como bloqueo: no adaptar genéricamente leases ni inventar un nuevo linaje.

## Profundidad temporal y volumen intacto

Para read_consent instalado: serial=2 verify+2 QA+3 M=**7 slots provider por primary**. Fanout=1 slot verify+max(2 QA,3 M)=**4 slots provider**, con ownedProject en la rama M entre sus dos versiones. El modelo4 supone tiempos homogéneos; payloads y D1 pueden dominar. En closed_ui sin versión M adicional:6→3 slots, manteniendo6 llamadas.

El mismo hijo consume/grant lleva16 primary (8 rechecks×2 snapshots): **112 GET invariables**, desglosados32 verify+32 deployments+48 versions, y profundidad nominal112→64. En [consumeSend.issuedAt,grantAck.observedAt]:84 GET; profundidad nominal84→48. La fecha grant ACK precede al append durable y último recheck: instrumentar todo el hijo, no sólo ese intervalo.

No se reducen bytes, parse/hash/canonical work, observaciones DO ni consultas D1:80 SELECT factuales+16 preflight+2 mutaciones por hijo; total98 invocaciones D1. No reducir controles para mejorar el resultado.

Workload50ms por GET simulado, después de preparación genuina: serial112×50=5600ms sólo de espera añadida, incompatible con5s; fanout64×50=3200ms más base/DO/D1/CPU/tail. Que este último quepa es **hipótesis**, no conclusión. Si no cabe, root decide la siguiente acción con tiempos reales SYN; no ajustar clocks ni buscar arbitrariamente un umbral verde.

[Cloudflare limita seis conexiones esperando headers](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections), con [semántica actualizada en abril2026](https://developers.cloudflare.com/changelog/post/2026-04-09-relaxed-connection-limiting/). Aquí el límite2 es más estricto y abarca el ciclo de cuerpo/cancel completo. Es independiente del límite del proveedor, compartido con la invocación; no implica capacidad reservada ni SLA.

## Cualificación requerida

Separar dos modos de evidencia:
1. Positivo SDK real del fixture existente, sin wrappers de KV/SDK ni sustitución de resultados o frames. Conserva GET200, POST302, un grant/code, denegación de replay y uso original store/child.
2. Diagnósticos I/O nativos con observadores sólo test y demora provider; no ejecutar los probes estrictos extra del modo sdk-observed dentro del ensayo112 porque añaden lecturas. El observador no puede llamar source/SDK/store para producir su evidencia.

Delay mínimo50ms medido con reloj monotónico nativo, sin busy-spin ni fake timers, sólo para mocked GET del origen api.cloudflare.com, activado después de initial invoke material_recorded, restoreMethods, seedPhaseFacts, sdkReadCurrent y seed de cliente genuinos; para aislar consume/grant se activa después del GET/form válido y antes del POST. JWKS, ledger/GitHub, SQL/DO y SDK no reciben esa demora. Date se genera con reloj real al emitir headers; no monkeypatch Date.now/performance.now, no nowOffset durante el recorrido timed, no fake timers.

Registrar sólo categorías de endpoint, método, índices ordinales/snapshot/branch, tiempos, bytes contados y estados, nunca token/headers/body/module/code/cookie ni datos owner. El conjunto permitido es verify-reader, verify-publisher, QA-deployment, QA-version, M-deployment, M-initial-version, M-current-version. Identidad de role se determina dentro del fixture con literales sintéticos ya conocidos, no imprimiendo Authorization. Contar ciclos reales desde fetch iniciado hasta consumo/cancelación realmente asentados; no cerrar el contador cuando termina el outboundService ni cuando headers llegan.

Pruebas conductuales: concurrencia real2 y nunca>2; credentials terminadas antes de descriptor branches; QA/M se solapan pero las dependencias internas no; snapshots ordenados; multiset112 exacto en hijo exitoso y84 en intervalo; D1 y Unit2a intactos; rama retenida+hermana fallida, deriva de owner/pointer/module/config antes/después del join y entre snapshots; parent/native abort, late body/cancel y retención hasta asentamiento; no efectos/ACK por ganador parcial; queued SQL5100ms deniega bajo el mismo hijo. Antes/después de join significa ubicaciones causales observadas, no sleeps adivinados. Una deriva después del join del primer primary de la pareja debe ser observada por el siguiente checkpoint existente; no se promete detectar cambios posteriores al último punto observado ni atomicidad distribuida.

Mantener pruebas de strict-reader y own-SEND, source variants closed/installed/no-schema/malformed/lone-source y modo/perfil SDK anterior sin modificaciones semánticas. Revisar observers existentes que asumían orden global serial; corregir su clasificación sólo con evidencia, sin rebajar assertions de producto.

## Gate de ejecución futuro

Plan asociado: [2026-11-05-finite-owner-io-fanout.md](../plans/2026-11-05-finite-owner-io-fanout.md). Preflight: [informe de diseño](../reports/2026-11-05-finite-owner-io-fanout-design.md). **INACTIVE** hasta decisión root y activación SOURCE concreta después de aceptar D0.3; no lanzar CI por este documento. La posterior medición live cerrada/no consumidora descrita en la auditoría de E/S sigue pendiente y requiere alcance autorizado separado. Nada aquí instala acceso ni acredita operación con PC apagado.


## Root SOURCE activation — 5 November2026

ContainingcommitacceptsD0.3c35716e6afterfreshSpecPass/QualityApproved; actualexecutionBASEisthiscontainingcommitprovidedindispatch. ActivatesONLYfanoutTask1withbriefdocs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md. OriginalINACTIVEdesignheadersaredatedhistory. Rootpreflightboundariesprevail: own temporaryscopedcloudqualifierallowed/removalfinal; no wholebranchtest/build/lint/newstandardcompilerifgraphstillunmountedunchanged. Noalias/runtime/Entry/credentials/sourceceilingrenewal. Oneproductwriter, fixed2lifecycles/allreads/original5s30s; operationalReadiness=false;completePackage=false;PCoff=false.
