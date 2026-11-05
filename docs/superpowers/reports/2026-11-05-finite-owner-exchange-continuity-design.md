# D0.4 · Finite owner exchange continuity · recibo de diseño

2026-11-05 · DESIGN ONLY · Implementación INACTIVE.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=GitHub source/docs; ORIGIN=https://delegated-canary.agentfriendlyweb.dev (no contactado); RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notices-design-20261105; ALLOWED_ACTION=lecturas source51c5db8e987755ccf2819ba861461916e0396943 y tres documentos nuevos con CAS sobre44d0490a3c7a33ad483499a70696689597ebf2c6; ROLLBACK=revertir sólo este commit documental.

Root prioriza D0.4 después de aceptar fanout y antes de activar el notice store. Es selección técnica de root, no aprobación atribuida al owner. El diagnóstico y los tres documentos del store quedan preservados e INACTIVE. Root suministrará un BASE de producto futuro; este diseño no lo presume.

## Resultado y fuente

Entregados [spec](../specs/2026-11-05-finite-owner-exchange-continuity.md) y [plan](../plans/2026-11-05-finite-owner-exchange-continuity.md): una tarea de cambio mínimo en phase-context y test D0.3 real, más un branch SYN pequeño en el seam de drift ya existente.

La causa está confirmada por source: grant ACK fue calculado con la fila original exchanged_at=''; el consumeExchange de M cambia la columna del mismo UUID; el lector compara luego la fila actual completa contra ese hash histórico. El diagnóstico2.1 documentó el conflicto sin cambiar producto. Se conserva el ACK inmutable y sólo se proyecta exchanged_at:'' en el argumento de rowAck('grant',...). El grant actual permanece intacto en issuerRows/frame, snapshots y owned recheck.

El estado mutable se valida independientemente: vacío o ISO UTC canónico safe/finito, no futuro, >=created_at y <expires_at. El iso existente ya garantiza finitud. Todas las identidades, scopes, owner/revisión, grant original, estado actual, ACK/SDK journals y límites originales siguen decisivos. Ningún timestamp concede permiso ni acredita emisión final de token.

## Interfaces y prueba causal

sdkReadCurrent() existe en test/fixtures/finite-owner-qa-sdk.mjs:68-71 y llama la factory real con root real. No se añade argumento/export/API ni cambia el DTO {source,preconnectionId,capsuleHash}.

El RED exige código QA real→token M real→MCP original positivo, lectura factual válida antes del token y ACK original intacto. Se compara internamente el hash de la fila actual y de su proyección histórica; sólo después falla el assert de read_consent post-token. No cuenta un fallo de seed/fixture/SDK ni un reader alias. El GREEN debe mantener bytes/rowHash/recordHash del ACK y todo el journal sin cambios.

La única observación fixture nueva es el branch 'exchange' en f.phaseDrift, en observación2 del pointer, actual seam test/fixtures/finite-initial-entry-world.mjs:154. Ejecuta UPDATE nativo del UUID original con DATA SYN; no sustituye filas retornadas ni compone un reader. Dos timestamps individualmente válidos y distintos deben producir unavailable por diferencia de frames. El positivo no depende de ese hook.

## Conflictos y límites revisados

| Conflicto | Decisión |
| --- | --- |
| ACK inmutable frente a columna mutable | Proyección de un campo sólo en comparación histórica; no reescribir ACK ni mutar fila/frame |
| DTO pequeño frente a diagnóstico de causa | Usar snapshots existentes y hashes sólo en assertions; no nuevo reason/DTO de producción |
| Detectar drift frente a consistencia global | Denegar dos observaciones distintas; no afirmar detección después de última observación ni de valores válidos estables |
| expiry versus no futuro | At/after expiry prueba rechazo combinado bajo grant vivo; no prometer aislamiento matemáticamente imposible |
| SDK complete pendiente frente a post-token positivo | sdkReadCurrent sigue negando con send sin observed y grant activo, antes de reducción/release |
| Campos inmutables frente a proyección | Matrix de cambios nativos después de exchange, sin editar ACK/SDK/grant links para hacerlos coincidir |
| Fixture mínima frente a source ownership | Hook SYN fixed-field/UUID en seam existente; ninguna capacidad caller-selectable en producto |

No se encontró conflicto de interfaz con el enfoque elegido. El plan incluye bounds/hostiles después de exchange real, límite inferior inclusivo, drift causal, selected SDK/phase regressions y scoped lint. Evita repetir suites57/80 o compiler estándar por defecto si el graph permanece unmounted/sin nuevos imports. Las selecciones excluidas se reportarán separadamente de los casos ejecutados.

## Evidencia de este bloque

Inspección por GitHub App de source fijado, callback/store, phase-context, fixture sdkReadCurrent, seam de drift y test D0.3 existentes. No implementación, test, lint, build, CI, clone/dependencias/local runtime, provider/AFW/live probe ni mutación de permisos/credenciales. Los receipts de ejecución futuros deben aportar RED/GREEN reales; aquí no se inventan counts.

Alcance futuro cerrado: phase-context, actual test D0.3 y el branch mínimo en fixture. No notice store/journal/receiver, schema, source stub, permiso, reloj, ordinary M/SDK/store o mount. Sourceceiling2026-11-03T02:59Z vencido; clocks y presupuestos originales intactos. Toda continuación operativa requiere su evidencia y alcance separado.

operationalReadiness=false; completePackage=false; PCoff=false.
