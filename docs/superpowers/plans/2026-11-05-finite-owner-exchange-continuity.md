# Finite Owner Exchange Continuity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development under the standing root method to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restaurar la lectura factual read_consent después de D0.3 preservando el ACK original y el exchanged_at nativo actual en los frames.

**Architecture:** issuerPrimary valida por separado la columna mutable y reconstruye exchanged_at:'' únicamente para comparar el ACK histórico del grant. El mismo lector/DTO, snapshots completos y recheck owned siguen estrictos; una prueba D0.3 existente proporciona el camino causal real.

**Tech Stack:** JavaScript ESM, Node test runner, SDK OAuth/MCP y esbuild/Miniflare del harness nativo ya existente. Sin dependencia nueva ni runtime remoto.

**Spec:** [2026-11-05-finite-owner-exchange-continuity.md](../specs/2026-11-05-finite-owner-exchange-continuity.md)

## Global Constraints

- DESIGN ONLY; INACTIVE hasta aceptación/revisión de root y despacho con BASE de producto futuro después de fanout. No es aprobación del owner.
- Producto inspeccionado51c5db8e987755ccf2819ba861461916e0396943/árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630; padre documental44d0490a3c7a33ad483499a70696689597ebf2c6, rama docs/finite-native-notices-design-20261105. No seguir al writer activo.
- No cambiar ACK bytes/rowHash/recordHash/domain, el grant actual retornado, frames, DTO de tres claves o recheck owned.
- exchanged_at es '' o ISO canónico finito, <=ahora, >=created_at, <expires_at; ningún timestamp acredita token/consentimiento o permiso nuevo.
- Mantener C0/C1, padre<=30000ms e hija<=5000ms y el techo vencido2026-11-03T02:59Z. operationalReadiness=false; completePackage=false; PCoff=false.
- No ordinary M/store/SDK/schema/permiso/clock/source stub/notice/mount/transport change, nuevo export/factory, allowPending o refactor/split.
- Notice-store diseño permanece INACTIVE e intacto. Este plan no activa unidad posterior.
- GitHub/runner cloud existente autorizado solamente; sin clon/dependencias/tests/build locales, nuevo workflow, live probe, proveedor/AFW, credenciales o nuevo servicio.
- No imprimir token/código/JWT/KV ni filas privadas; evidencia saneada de assertions/counts/flags.

## Review Focus

- La copia del ACK termina en issuerRows/frame/expected y oculta drift válido: caso D04 de segunda observación con dos valores válidos distintos.
- Antes del fix RED ocurre por seed/SDK y no por el ACK: positivo D04 exige fase pre-token correcta, token/MCP positivos, ACK original intacto y única diferencia de columna antes del assert final.
- Copia construida para grant ausente o proyección de otros campos: afectados de issuer sin grant, unknown ACK y casos immutable tamper deben seguir negando.
- Nuevos bounds aceptan canonical timestamp anterior a created o no canónico parseable: matriz D04 y boundary inclusivo created_at; sin Date patch.
- Cambiar validación factual vuelve permisivo el owned/pending SDK: lector real debe negar complete retenido antes de reducción y conserva los casos approve/unknown existentes.

---

## File structure

Modificar lib/mcp-qa-finite-owner-phase-context.mjs sólo en issuerPrimary, validación exchanged_at y argumento rowAck grant (pin212-241).
Modificar test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs para casos D04, usando world/issued/exchange/readSummary/plain originales y sdkReadCurrent/snapshot existentes.
Modificar test/fixtures/finite-initial-entry-world.mjs sólo con un branch SYN 'exchange' en el seam phaseDrift de observación2 (pin154). No nueva API QA ni otro archivo fixture.

El recibo futuro de implementación será docs/superpowers/reports/2026-11-05-finite-owner-exchange-continuity.md; el recibo -design actual permanece como diseño.

## Task 1: Post-token native factual continuity

**Files:** los tres indicados arriba; sin otro archivo producto/test.

**Interfaces consumed:** readPrivateQaFiniteOwnerContext({ctx,env,parent[,preconnectionId]}) y sdkReadCurrent() reales; snapshot(), sdkGrant(id), sdkGrants() y native f.db; issued(f), exchange(f,x), readSummary(f,token); codec Ack y initialHash existentes para **assertions**, no para sustituir fuente.

**Interfaces produced:** ninguna nueva pública. El mismo DTO {source,preconnectionId,capsuleHash}, read_consent después de intercambio genuino bajo el mismo original. Único seam SYN adicional: f.phaseDrift='exchange', f.exchangeDrift={grantId,exchangedAt}, con phaseObservation reiniciado antes del lector; branch fijo UPDATE exchanged_at WHERE id original en observación2.

- [ ] **Step 1: Añadir el positivo causal D04 y hostiles en el archivo D0.3 existente.**

  Test principal `D04 actual exchange retains factual read_consent and immutable grant ACK`:
  1. Usar world normal/issued reales; sdkReadCurrent pre-token debe dar read_consent, identidad/source esperadas y Object.keys ordenadas exactamente ['capsuleHash','preconnectionId','source'].
  2. Leer snapshot y el grant:ack por prefix/preconnection original; decodificar Ack y conservar raw bytes, recordHash y rowHash; comparar rowHash con initialHash('afw.finite-preparation-issuer-row.v1',grant nativo pre-token).
  3. exchange real200 y readSummary real original positivo; grant nativo con mismo UUID y sólo exchanged_at cambiado.
  4. Assert hash fila actual!==ACK.rowHash y hash copia de esa fila con exchanged_at:''===ACK.rowHash; ningún ACK fue reescrito.
  5. Llamar sdkReadCurrent real y exigir read_consent, DTO original de tres claves y source/owner original. Releer ACK/snapshot y exigir bytes y hashes idénticos, histórico igual y sólo el grant original nuevo. Fuente no puede ser un helper positivo ni un resultado construido.

  Añadir tests D04 por mundo aislado, siempre después de token/MCP genuinos:
  - `D04 actual reader rejects native exchanged_at <fault>`: not-a-time; ISO equivalente sin canonical milliseconds/UTC; future=Date.now()+60000 con assert <expiry; created_at-1ms; expires_at; expires_at+1ms. Sólo UPDATE nativo de exchanged_at, sin cambiar ACK ni reloj. assert unavailable y ninguna nueva mutación productiva.
  - `D04 actual reader permits native inclusive created boundary without granting authority`: exchanged_at=created_at, ambos snapshots estables, fase correcta; rotular el UPDATE como SYN y no como emisión SDK.
  - `D04 actual reader retains immutable native checks <field>`: id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at y site_projects owner/revisión. Cambiar sólo el dato señalado; para fechas delta1ms que no invalide unrelated timing y assert precondición. Todos unavailable con ACK/journal idénticos; históricos sin tocar y ningún fallback a otra fila.
  - `D04 actual reader sees valid exchanged_at drift between native snapshots`: elegir alternativa válida diferente como en spec; set phaseObservation=0, phaseDrift='exchange', exchangeDrift original; sdkReadCurrent unavailable, phaseObservation===2, fila realmente modificada al valor esperado, ACK idéntico. No entregar frames falsos ni cambiar SELECT retornado.
  - En test existente `held actual SDK completion settles late after original terminal fence and real grant reduction`, añadir sdkReadCurrent unavailable cuando sdk_complete:send existe sin observed, **antes** de reducir grant/release. Conservar todos sus asserts posteriores y no mover el punto de retención.

  Única adición de fixture: branch de drift 'exchange' al segundo pointer read existente. Usa sentencia fija UPDATE nativa con UUID original y timestamp SYN; todos los otros phaseDrift intactos. No modificar sdkReadCurrent, source, stores ni algoritmos para fabricar positivos. No registrar datos secretos; hashes/filas se comparan sólo dentro del test.

- [ ] **Step 2: Ejecutar el RED real del positivo en el cloud task autorizado.**

  Después de activación de root con BASE futuro:
  `node --test --test-name-pattern="D04 actual exchange retains factual read_consent and immutable grant ACK" test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`

  Esperado: antes de cambiar producción, fase pre-token correcta, token/MCP positivos, fila actual cuyo hash difiere sólo por exchanged_at y ACK original válido; fallo en assert de la fase post-token, resultado unavailable. Fallo por fixture/instalación/SDK/seed no califica. Conservar assertion/head/tree/run/job/attempt y flags saneados de los prerequisitos; no nuevo reason code o instrumentación de fallo en producto.

- [ ] **Step 3: Corregir únicamente la comparación histórica y los bounds actuales.**

  En issuerPrimary conservar iso actual y todos los guards. Para exchanged_at no vacío exigir ISO safe/finite, <=Date.now(), >=grant.created_at y <grant.expires_at. Sólo rowAck('grant',...) recibe copia con exchanged_at:''; fila ausente conserva su ausencia. No mutar grant, ACK ni expected y no tocar rowAck general/otros tipos. issuerPrimary retorna el grant actual; snapshot y recheckOwned completos permanecen exactamente como están.

  No extraer helper/export nuevo ni alterar estructura/orden de snapshots o la programación fanout aceptada. No agregar caller DTO, report/source factory o allowPending para superar tests.

- [ ] **Step 4: Ejecutar GREEN seleccionado y afectados, una vez.**

  Nuevos casos y camino D0.3 afectado:
  `node --test --test-name-pattern="D04|valid actual QA code exchanges through actual M bounded response and actual MCP original permission|held actual SDK completion settles late after original terminal fence and real grant reduction" test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`

  Regresiones SDK seleccionadas:
  `node --test --test-name-pattern="held actual approve denies fabricated results|owned approve recheck rejects original issuer" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`

  Regresiones phase seleccionadas:
  `node --test --test-name-pattern="primary issuer prefixes remain facts not next-stage permission: (reservation|linked)|unknown issuer SEND denies grant|original primary issuer denies (revoked-grant|unknown-ack)|fresh current owner and current publication are independently rechecked: grant|absent original issuer never triggers a global grant lookup" test/mcp-qa-finite-owner-phase-context-native.test.mjs`

  Esperado: todos los casos seleccionados pasan, sin fallo o skip inesperado. Informar por separado los tests excluidos intencionalmente por patrón; no llamar suite completa a estos runs ni repetir57/80 por defecto.

  Lint existente:
  `node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs test/fixtures/finite-initial-entry-world.mjs`

  Sin npm full CI ni compiler estándar si el diff permanece unmounted, sin imports/graph nuevos. El harness ya compila los módulos reales; no descargar herramientas. Ante falla nueva relevante, corregir dentro del alcance y repetir sólo checks afectados; no encubrir una fase unavailable ampliando permisos/tiempos.

- [ ] **Step 5: Revisar diff, registrar evidencia y commit por lease.**

  Verificar con BASE futuro aceptado que sólo cambian las tres superficies cerradas. ACK/rowHash/domain/SDK/M/store/schema y programación fuente originales permanecen; copia histórica sólo en rowAck. Inspeccionar que issuerRows.grant/frames y owned expected no la reciben.

  Escribir recibo de implementación con source BASE/head/tree, RED/GREEN reales y counts/warnings/selecciones, ACK bytes/hash invariantes como assertions, bounds y drift observación2 alcanzado. Separar native calls de mutación SYN y condiciones temporalmente redundantes. Mantener sourceceiling vencido y flags false.

  Commit candidato `fix(afw): preserve factual owner continuity after code exchange` en rama aislada autorizada, expected-head CAS. Root revisa y decide aceptación antes de cualquier otro bloque. No merge/main/runtime/probe/notice store activado.

## Self-review

Una tarea y un RED/GREEN causal real. Firma/DTO exactos; ninguna nueva autoridad. Test principal usa la API existente y demuestra la única diferencia antes del assert RED. Timestamp inválido y mutaciones inmutables no arreglan su propio ACK. Drift con dos valores válidos comprueba preservación del frame; no promete detectar cambios posteriores a observación. Los cinco Review Focus tienen casos explícitos y regresiones seleccionadas. El hook fixture mínimo sólo es necesario para ubicar el cambio nativo entre snapshots, no para el positivo. Diseño revisable; steps sin ejecutar y activación reservada a root.
