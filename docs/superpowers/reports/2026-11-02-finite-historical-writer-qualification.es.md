# AFW: alcance de los escritores históricos del 30 de octubre

Revisión Root del 2 de noviembre de 2026. Solo lectura; no se repitió el ensayo ni se cambiaron recursos. Esta nota corrige dos incertidumbres concretas del preflight anterior, sin declarar drenaje universal ni estado operativo actual.

## Procedencia del código realmente conservado

Dos GET acotados al Worker QA agent-friendly-web-independent-closure-qa, cuenta85d0d5dadac3341a564f22ce885e9eec, identificaron la versión histórica01ac6aa0-3ec8-43a7-bf19-31e46cad82d9, creada30oct16:38:54.653139UTC. El segundo calculó dentro del ejecutor Cloudflare, sin devolver código ni bindings, index.js462861bytes/SHA256a7d40b811f8817ffeb895f0b95ff7c83f8bea987b17987f8d4640f7b7e5916f7. La metadata antigua exports[] no describe necesariamente los exports del código.

Root consultó el run41083490837 y el log primario del job124158457457: main/push/attempt1/SUCCESS30oct15:44:32–15:45:04UTC. El log imprime build.json con purpose afw.independent-closure-build.v1, sourceRevision2a4773737764c5038aaa0b3528b43df2a0572441, sourceTree637af253296ac1c771cb73ea353cb960a2e59204, configurationHash99717696167662708e236bd3896368d5489620bfc930c62b98b03e97505b0d52 y el MISMO módulo index.js462861bytes/hasha7d40b81 completo anterior. remotePublished=false y operationalReadiness=false son campos del manifiesto de compilación.

La receta .github/workflows/afw-independent-closure-build.yml@2a477 L48–89 usa Node22/npmci/Wranglerdryrun, verifica revisión e inputs y escribe/imprime el mismo manifiesto. El recibo docs/AFW-RETIREMENT-RECEIPT-CLOSED-RELEASE-2026-10-30.es.md L17 vincula esos bytes y build a QA78af posterior. El módulo01ac coincide por hash/bytes primarios, no por el nombre de una revisión. No se extrajo ZIP ni se reconstruyó localmente. El digest ZIP00c0fdaa… es distinto del digest de módulo y no se sustituyó.

Esto permite inspeccionar el código exacto2a477 del módulo correlacionado. No es una atestación criptográfica de ejecución por cada fila histórica, ni convierte al lectorM actual en productor de esa historia.

## Reducción COMPLETE y destroy concreto

En source2a477:
- worker/mcp-own/index.mjs L56–60 lleva withdrawPermissionsForPlan al cierre protegido del host.
- lib/mcp-own-permission-withdrawal-host.mjs L39–76 verifica programa/fuente, grant/container/policy originales y recorta el plazo absoluto recibido.
- lib/mcp-own-durable-host.mjs L43–46,109 entrega el runtime original real.
- lib/mcp-original-container-runtime.mjs L64 contiene await container.destroy(). No existe en esta fuente una rama de éxito por simplemente no encontrar instancia.
- lib/mcp-node-process-custody.mjs L119–141 espera ese cierre antes de devolver closed:true/runtimeStopRequested:true.
- lib/mcp-own-permission-withdrawal.mjs L117–128,163–169 solo conserva runtimeStopRequested:true tras el cierre exitoso; error o timeout deja false.
- lib/mcp-hosted-canary-restoration.mjs L191–201 exige ese true antes de escribir reduction COMPLETE.

Conclusión acotada: en ESA invocación que escribió un nuevo COMPLETE, el Promise nativo concreto de destroy ya había cumplido. El campo genérico physicalStopVerified:false no anula ese await concreto; tampoco permite extrapolar cierre de todos los procesos o solicitudes.

## Primaria del guard y ausencia de SEND de restauración en ESA invocación

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA histórico cerrado; ORIGIN api.cloudflare.com/client/v4; RESOURCE_TYPE Workflow instance status; RESOURCE_ID afw-own-qa-private-bootstrap/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04; ALLOWED_ACTION un GET, salida saneada por lista blanca; ROLLBACK no aplica, sin mutación.

GET primario del2nov2026 a23:51:33.482UTC:
- status complete; start30oct16:39:05.020UTC; end16:41:01.728UTC; step_count6.
- output: status blocked, dispatchStatus uncertain, nativeWithdrawalVerified false, operationalReadiness false, mayRetry false.
- reduce-own-original-permissions-1: un intento success,16:41:00.050–16:41:01.541UTC.
- restore-own-closed-canary-1: un intento success,16:41:01.564–16:41:01.675UTC.

El comentario primario497#6528223100,30oct16:46:36UTC, correlaciona QA01ac/guardd56, reducción, restoreblocked, retiro del control16:42:07.958 y restauración administrativa canary2607/deployment7b5a posterior. Su physicalStopfalse y dispatchuncertain se preservan; no se reescribe el recibo histórico.

Root y una revisión independiente comprobaron la implicación en source2a477:
- hosted Workflow L300–305 añade dispatchStatus al devolver el resultado del restorer; su outercatch después de touched devolvería uncertain, no este blocked con dispatchStatus.
- El host puede bloquear antes de construir transporte, por ejemplo al fallar la captura de handoff L218–224.
- mcp-successor-canary-restorer.mjs L154–175 fija issued=true ANTES del put del journal y antes del único POST /workers/scripts/agent-friendly-web-delegated-canary/deployments. Nunca vuelve a false. Un fallo posterior devuelve uncertain, no blocked.
- Si vence antes de issuance, finally fija finished=true/abort; checks de continuación/call L104–119,174–176 impiden enviar después.

Conclusión: bajo la correlación fuente/ejecución establecida, el resultado primario blocked de ese único intento cierra la incertidumbre de restore-SEND de ESA invocación. No se justifica seguir tratándola como un POST de restauración pendiente. No es necesario otro ensayo para repetir esta conclusión.

## Lo que permanece separado

El prepared dispatch anterior sigue uncertain; la reducción exitosa no drena una solicitud anterior deliverOwnSaved. Ese código escribe el evento/grant/historia antiguos; no publica la versión nueva ni se transforma en nueva autoridad. Deben seguir verificándose el aislamiento de escrituras antiguas, sus selectores y la reutilización del Container compartido al integrar el nuevo flujo. Otros guards, solicitudes administrativas o escritores no quedan descartados por este único resultado.

Para una futura activación hacen falta inventarios actuales, exacta procedencia y SEND relevantes, control de puntero propio y rollback, y capacidad de los endpoints realmente usada por la clave nativa custodiada. La consulta fue por la sesión MCP Cloudflare del owner: no acredita esa capacidad del lector9aa. El reader-probe existente consulta siete recursos con la clave cargada, pero no verifica id del token ni GET individual de Workflow; no se ejecutó.

B2a inactive deploy=false no requiere el drenaje de activación: un restorer antiguo selecciona una versión vieja y no activa/elimina el UUID nuevo. Su version-catalog/latest/last100 sí puede variar; cada consumidor debe fijar UUID explícito. La composición completa, la activación, la entrega útil, la baja y PC-off siguen pendientes.

operationalReadiness=false; completePackage=false; PCoff=false.
