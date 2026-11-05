# Finite owner exchange continuity · D0.4

2026-11-05 · DESIGN ONLY · INACTIVE. Root seleccionó este candidato antes del notice store; no es aprobación del owner ni activación de implementación.

## Alcance

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=GitHub source/docs; ORIGIN=https://delegated-canary.agentfriendlyweb.dev (no contactado); RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notices-design-20261105; ALLOWED_ACTION=lecturas fijadas y estos tres documentos por expected-head CAS; ROLLBACK=revertir sólo el commit documental.

Producto inspeccionado51c5db8e987755ccf2819ba861461916e0396943/árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630. Padre documental44d0490a3c7a33ad483499a70696689597ebf2c6. Root suministrará el BASE de producto futuro después de revisar/aceptar fanout. No seguir su rama durante este diseño. El notice-store diseño se conserva INACTIVE.

Objetivo único: permitir que la lectura factual real continúe después del consumo de código D0.3 sin alterar el ACK histórico del grant ni ocultar el estado mutable actual a las dos observaciones.

## Causa confirmada y API disponible

insertReadGrant devuelve las diez columnas de grant, incluida exchanged_at, inicialmente ''; issuerCall calcula sobre esa fila el ACK original completo ([lib/mcp-qa-finite-preparation-issuer-store.mjs:26–27](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L26-L27), [lib/mcp-qa-finite-preparation-issuer-store.mjs:116–121](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L116-L121), [lib/mcp-qa-finite-owner-phase-context.mjs:434–447](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L434-L447)). El callback M real llama consumeExchange y cambia sólo exchanged_at en el UUID original ([lib/delegated-oauth-worker.mjs:73–94](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/delegated-oauth-worker.mjs#L73-L94), [lib/delegated-oauth-store.mjs:34–36](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/delegated-oauth-store.mjs#L34-L36)).

issuerPrimary vuelve a seleccionar la fila actual, valida formato/no futuro y luego rowAck('grant',grant) compara toda la fila con el hash original. El cambio genuino de columna causa rechazo aunque el permiso original siga válido ([lib/mcp-qa-finite-owner-phase-context.mjs:212–231](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L212-L231)). Ya hay un test D0.3 que prueba código QA→token M→MCP original y la columna no vacía, pero no una lectura factual después ([test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs:53–62](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs#L53-L62)).

No hace falta API nueva: sdkReadCurrent() en la fixture crea el root real y llama readPrivateQaFiniteOwnerContext; captura error como {status:'unavailable'} ([test/fixtures/finite-owner-qa-sdk.mjs:68–71](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/test/fixtures/finite-owner-qa-sdk.mjs#L68-L71)). El lector de producción sigue exactamente readPrivateQaFiniteOwnerContext({ctx,env,parent[,preconnectionId]}) y devuelve únicamente {source,preconnectionId,capsuleHash}. No agregar argumentos, flags, factories ni exports.

## Cambio de producción exacto

Sólo dentro de issuerPrimary, antes de rowAck del grant:

1. Conservar la fila SQL actual sin mutarla. Para exchanged_at permitir literal '' o un ISO UTC canónico que satisfaga existing iso (Date.parse entero seguro, por ello finito), parsed<=Date.now(), parsed>=Date.parse(grant.created_at) y parsed<Date.parse(grant.expires_at).
2. Conservar todos los demás guards actuales de grant/auth/owner/revisión/UUID/scopes/created/expiry/fence/journals/tiempo. Usar el iso existente; no nueva función pública/clock ni nueva tolerancia.
3. Sólo en el argumento de rowAck('grant',...), pasar una copia con exchanged_at:'' si hay grant, preservando su ausencia si no hay fila. Todos los otros campos quedan idénticos. No cambiar rowAck, el dominio hash, el ACK almacenado ni su rowHash/recordHash.
4. issuerPrimary retorna el **grant actual original**, con exchanged_at real. Los frames issuerRows, canonical(pair.first)===canonical(pair.second) y recheckOwned contra expected mantienen la columna. No propagar la copia histórica a snapshot/return/expected ni normalizar otros campos.

La proyección reconstruye únicamente la fila histórica que este issuer emitió; no es un permiso nuevo. Es coherente con la proyección histórica de consumed_at ya existente en rowAck('authorization',...). No altera el tratamiento de no SEND/no ACK/no_mutation o grant ausente: no construir un objeto con exchanged_at para una fila inexistente.

Las dos observaciones y el recheck owned deben seguir comparando filas actuales completas ([lib/mcp-qa-finite-owner-phase-context.mjs:241](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L241), [lib/mcp-qa-finite-owner-phase-context.mjs:302–335](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L302-L335), [lib/mcp-qa-finite-owner-phase-context.mjs:388–399](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L388-L399)). Un cambio temporal válido entre ellas debe negar. Ninguna columna acredita éxito final de token, SDK completo, consentimiento, entrega o consistencia global. El callback puede consumir antes de un fallo posterior.

## Mapa cerrado

| Archivo futuro | Cambio |
| --- | --- |
| lib/mcp-qa-finite-owner-phase-context.mjs | Sólo validación independiente exchanged_at y copia histórica local para rowAck grant; sin refactor/split |
| test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs | Casos D04 usando issued/exchange/readSummary/sdkReadCurrent/snapshot existentes; extensión pequeña de la prueba de complete pendiente |
| test/fixtures/finite-initial-entry-world.mjs | Único hook SYN imprescindible de drift, en el seam existente f.phaseDrift/segunda observación del pointer; no método nuevo QA |

El hook usa mode interno fijo 'exchange', f.exchangeDrift={grantId,exchangedAt} y el contador existente phaseObservation. Sólo en la segunda observación hace UPDATE nativo del UUID original con sentencia fija y bind; el test aporta DATA SYN de fallo. No reemplaza SELECT/row/hash/reader ni retorna frames inventados. La API productiva y sdkReadCurrent() permanecen intactas. Se usa el seam real ya situado entre las dos lecturas ([test/fixtures/finite-initial-entry-world.mjs:154](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/test/fixtures/finite-initial-entry-world.mjs#L154)). No modificar ordinary M, store, SDK, schema, permiso, reloj, source stub, notice, mount o transporte.

## Aceptación causal y límites

**Positivo D04 principal:** usar el mismo world/issued/exchange/readSummary D0.3, sin source alias. Después de issued, antes de token, sdkReadCurrent debe leer read_consent y exactamente las tres claves originales. Capturar bytes del grant:ack del preconnection original desde snapshot; decodificar el ACK con el codec original y conservar rowHash/recordHash. El hash de la fila grant pre-token debe igualar el rowHash.

Ejecutar token M200 y MCP original positivo. Volver a leer grant nativo: exchanged_at no vacío, resto exacto, mismo UUID. Probar internamente que el hash de la fila actual difiere del ACK y el de {...filaActual,exchanged_at:''} coincide. Luego sdkReadCurrent debe seguir devolviendo read_consent con fuente/identity original y tres claves. ACK bytes/rowHash/recordHash y todos los journals permanecen idénticos antes/después; históricos intactos y sólo un grant añadido por issuer original. Guardar sólo assertions/flags saneados, no token/código/JWT/KV/filas completas.

**RED antes del fix:** lo anterior llega a token/MCP positivos y al ACK histórico intacto; el último assert de fase falla porque sdkReadCurrent devuelve unavailable. La comparación de hashes/única diferencia y el source path fijado atribuyen la causa; no exponer un reason nuevo en producción ni inyectar un fallo. Un fallo de seed/SDK/fixture/build no cuenta como RED.

**Negativos posteriores a intercambio válido:** en mundo aislado por caso, modificar sólo la fila nativa original de manera explícitamente SYN, después de token/MCP positivos. Exchanged inválido: texto no fecha, ISO equivalente no canónico, futuro canónico con margen60000ms y menor que expiry (assert precondición), created_at-1ms, exactamente expiry, expiry+1ms. Debe devolver unavailable, sin nuevo grant/ACK/journal. No tocar el reloj ni grant expiry para fabricar el caso. Límite inferior inclusivo: exchanged_at===created_at canónico estable puede pasar; dejarlo rotulado como mutación SYN válida, no prueba de exchange.

Immutable tamper posterior a token: id/user_id/client_id/project_id/resource/scopes_json/created_at/expires_at y revoked_at; además owner/revisión actuales de site_projects. Cada caso debe seguir negando; no ajustar ACK, GrantLink ni SDK grant para coincidir. Para created/expiry elegir delta1ms que mantenga el resto de límites válidos, y afirmar la precondición; para id cambiado negar el lookup original sin fallback. Son corrupciones SYN, no grants nuevos emitidos. Históricos nunca se alteran.

**Drift entre observaciones:** ambas versiones de exchanged_at deben ser individualmente válidas y diferentes. Elegir created_at si difiere del exchange real; si empatan, elegir exchange+1ms y esperar sólo al tick real necesario, con assert <=ahora y <expiry. Configurar phaseObservation=0/phaseDrift='exchange'/exchangeDrift y llamar sdkReadCurrent real. El hook debe ejecutarse exactamente en observación2; la lectura debe negar con ACK idéntico y fila actual realmente cambiada. Esto prueba que la copia histórica no borró exchanged_at de los frames. No afirmar detección de cambios posteriores a la última observación o de dos snapshots que coinciden en el mismo valor válido.

**Strict pending:** extender en el archivo D0.3 el test de complete real retenido: cuando ya hay grant nativo activo y sdk_complete:send sin observed, antes de reducción y release, sdkReadCurrent debe seguir unavailable. Tras late completion/cierre permanece cerrado. Conservar los casos existentes de approve pendiente/unknown y strict owned recheck; ninguna opción allowPending. Los fixtures de mundo externo, Access y proveedor continúan SYN; QA/SDK/token/MCP/reader/store/journals usados en los casos positivos son los módulos reales.

## Preflight/conflictos

| Cuestión | Resolución |
| --- | --- |
| ISO existente frente a finitud | iso exige Date.parse safe integer y formato UTC exacto. Añadir sólo lower/upper bounds; no parser exportado |
| ACK histórico frente a fila mutable | Copia de un campo sólo en rowAck; retorno/frame conservan fila actual |
| expiry del exchange frente a no futuro | Si grant está vivo y exchange<=ahora, exchange<expiry se deduce; casos at/after prueban rechazo combinado, no aislamiento de predicates |
| Mutation válida estable | Puede pasar; no es prueba de token ni permiso nuevo. Garantía limitada a estas observaciones |
| DTO sin grant/frame | No ampliarlo. snapshot y seam SYN existente bastan para ACK/drift |
| Drift sin seam nuevo productivo | Un branch fixture 'exchange' con UPDATE original bajo observación2; no factory/alias/callback productivo |
| Ventanas reales vencidas | Tests SYN usan clocks nativos de su harness existente; no se compensa Date ni renueva fuente real |

No se detectó conflicto de interfaz con este enfoque estrecho. Mantener C0/C1, padre<=30000ms e hija<=5000ms y el techo vencido2026-11-03T02:59Z. operationalReadiness=false; completePackage=false; PCoff=false. Store de avisos y todo downstream continúan INACTIVE. Root debe revisar/activar con BASE futuro aceptado; este diseño no ejecuta ningún paso.
