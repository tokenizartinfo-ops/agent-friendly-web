# Finite preparation notice store: recibo de diseño

2026-11-05 · DESIGN ONLY · No implementación activada.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=GitHub source/docs; ORIGIN=https://delegated-canary.agentfriendlyweb.dev (no contactado); RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notices-design-20261105; ALLOWED_ACTION=lectura de fuente51c5db8e987755ccf2819ba861461916e0396943 y tres documentos nuevos mediante CAS sobre673813d5f7da9467fe3a527ab810fec7d6f8cc63; ROLLBACK=revertir sólo este commit documental. El informe de diagnóstico existente se conserva sin modificación.

## Decisión acotada

Root seleccionó como primer candidato **store nativo solo**, más pequeño que la recomendación inicial store/journal. No se interpreta como aprobación del owner ni activación de implementación. Se entregan [spec](../specs/2026-11-05-finite-preparation-notice-store.md) y [plan](../plans/2026-11-05-finite-preparation-notice-store.md) con una tarea y un ciclo RED/GREEN; el HEAD futuro aceptado y el despacho de root siguen siendo prerrequisitos.

Tres métodos nuevos en la misma instancia actual: insertMonitoringTicket, observeMonitoringTicket, insertMonitoringConsent. Common DATA={identity,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window}. ticket DATA={handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}, expectedSequence=0. El tercer método recibe ticketWitness en lugar de ticket DATA; su referencia debe haber sido observada por SELECT nativo en la misma instancia/lease. El objeto no se serializa como autoridad.

Se reutilizan tablas y cerca originales, sin nueva tabla/migración. La única metadata adicional es FINITE_PREPARATION_MONITORING_SCHEMA frozen con los siete DDL ordinarios en el mismo módulo store. Preflight separado conserva antiguos métodos sin depender de tablas de avisos. El mapa de producto queda en store actual, fixture issuer nativa actual y un test nativo nuevo.

## Fundamento y tradeoffs

El SQL original issuer ya impone owner/revisión/cerca/reloj y mantiene testigos privados. El host ordinario de avisos persiste antes de forward finite; su callback posterior no puede cubrir esa causalidad. Por ello las dos escrituras nuevas son INSERT SELECT nativos y la observación SELECT primario condicional; vuelven a exigir original grant/auth/cerca y todos los límites al ejecutar. Los paths/lines están en la spec y el [diagnóstico fijado](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/673813d5f7da9467fe3a527ab810fec7d6f8cc63/docs/superpowers/reports/2026-11-05-finite-native-notice-source-diagnosis.es.md).

| Conflicto concreto | Decisión y costo |
| --- | --- |
| Options útiles frente a autoridad inventada | DATA estricta y techos no prueban Access/humano; el caller fijo seguirá pendiente. Componente acepta sólo el grant UUID original, no una nueva capacidad |
| Cinco segundos frente a permiso útil | Window limita la operación SQL; permission expiry es absoluto del ticket, hasta los techos originales y600000ms. Positivo exige permiso>5000ms sin renovar relojes |
| Expiry individual frente a techos anidados | Elegir cada techo como mínimo en un caso válido; declarar empates de ticket/permiso derivados. No afirmar aislamiento de un predicate que el dominio hace redundante temporalmente |
| Ticket “cambiado” frente a triggers inmutables | DATA alterado/UPDATE ordinario se niegan; carrera de comparación de fila se prueba con tamper SYN post-preflight explícito, nunca como schema relajado de producción |
| Una referencia local frente a replay durable | WeakMap/attempts bloquean clon/reutilización/ACK desconocido en esa instancia. No hay garantía de ticket único entre RPCs/instancias; la procedencia durable queda para receptor/journal |
| ACK perdido frente a fila ya persistida | Rechazar y bloquear otro write, conservar Promise/fila real; nunca sintetizar no_mutation ni afirmar cancelación física |
| CLOSE frente a permiso ya activo | El test debe observar autoridad aún enabled tras CLOSE solo, y disabled después de revocación original. Evento histórico intacto; no equivale a retirada humana |
| exchanged_at mutable frente al ACK original | No tocar phase-context/ACK. Su conflicto confirmado permanece prerrequisito factual del receptor; el store sólo valida la columna nativa actual, no emisión de token |
| Schema exacto frente a helper nuevo | Siete strings originales en módulo existente; comparar con db/*.sql y sqlite_schema, sin instalar/reparar schema. No archivo/helper de producción adicional |

## Cobertura y límites de evidencia

El plan exige positivo SYN con grant construido por openFence→insertAuthorization→consumeAuthorization→insertReadGrant reales, ticket observado en nueva first-primary y evento devuelto por SQL; no grant positivo precargado. Los negativos cubren DATA/testigos, tuple/owner/revisión/scopes/auth/cerca actuales, schema, colas5100ms y techos cortos, ambas órdenes de barrera, reducción por autoridad real y pérdidas/retención del resultado **después** del commit. Se conservan las regresiones issuer nativas.

No se ejecutó ningún test, lint, build, CI o workflow. El recibo de implementación futuro tendrá otro path y evidencia real; este diseño no inventa RED/GREEN ni counts. Se inspeccionó el harness existente (test/fixtures/finite-preparation-issuer-worker.mjs) y el store vigente mediante GitHub App; no hubo clon/dependencias/local runtime, provider/AFW calls, credenciales o cambios de permisos.

La propia spec separa testigos locales de source ownership. Un journal sin writer fijo sería scaffolding; el receptor QA futuro se encargará de su journal acotado de seis filas, identidad y decisión humanas, procedencia de tickets entre GET/POST y reconciliación/retención durable entre RPCs. Esos trabajos están INACTIVE y no se importan aquí.

También siguen separados: proyección del ACK histórico tras D0.3; lector notices/tercer CLOSED; tres receipts/Selection antes del T0 primario original; productor connection/setup y own-SEND; full setup Task2; retirada/cleanup completo; mount/ARM/hosted y PC-off. No hay NoticeLink, suscripción, entrega, trabajo útil ni disponibilidad pública por el éxito de un componente.

## Self-review

Firmas/fields/resultados coinciden en spec y plan; archivos y límites cerrados; Review Focus mapea a casos causales; error/unknown es fallo y no una fila fabricada; source ceiling vencido intacto. El reporte de diagnóstico anterior sigue histórico y la selección menor se documenta sólo aquí. Root revisa los tres documentos y decide activación futura, sin pregunta o solicitud al usuario en este bloque.

operationalReadiness=false; completePackage=false; PCoff=false.
