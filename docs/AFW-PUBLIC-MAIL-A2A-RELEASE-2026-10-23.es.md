# Publicación pública de correo y A2A — 23 de octubre de 2026

## Alcance y procedencias

Recibo documental de las evidencias de root comunicadas en este chat, junto con las dos comprobaciones cloud conservadas. Este bloque no volvió a consultar runtime ni ejecutó sondas, builds, uploads o promoción. Todas las horas de la secuencia son UTC del 23 de octubre; ART = UTC−3.

- Fuente pública: [PR580](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/580), head `61909a5805549abb9534679d1735c3be8745071f`, merge **solo en release/web-production-20261017** `11305a9c30a43b6a94e98e183100c58b8725bfef`, árbol `94a86945319d05db1b0c28872355dd0aef91b86b` idéntico al head cualificado.
- Contrato de entrega: [PR581](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/581), main `70d75a9b2bd71004c678909a77e47416f3487ddc`, árbol `ab89216f6cfac74a5b19e0a2f7a925c785a51816`. Main no es fuente para reconstruir la web pública ni el bundle privado.
- [Recibo primario saneado de promoción, observador original y corrección](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/581#issuecomment-6375146127).
- [Plan original](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/581#issuecomment-6374901544), [admisión](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/581#issuecomment-6374923472), [fallback acotado](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/581#issuecomment-6375056259) y [checkpoint](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6366597286).
- Carga inactiva por [Actions40024016560](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/40024016560): versión `29927b77-1e41-47df-9854-ab9830f84755`. No se seleccionó el artefacto push12528658552.

## Paquete cualificado, sin reconstrucción

Artefacto **12528328727**, nombre `afw-guide-qualified-dist-61909a5805549abb9534679d1735c3be8745071f`, [run40017194631](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/40017194631), attempt1, job120632191637, checkout literal61909. ZIP2761288bytes, SHA256 `569f20739d15ee14d5b8ee0da74be2bce9b9cf252422b2ff7005c1e2bf4d6a7c`; 337 archivos / 5476922bytes. Expira **30 oct 20:12:06 UTC /17:12:06 ART**. Browser6casos/18estados, artifactUnchanged=true; no aceptación de autenticación o producción por ese browser aislado.

[Inventario preservado](evidence/2026-10-23-public-mail-a2a/qualified-inventory.json). Recibos root **12532021778 /12531023874** conservados por root; [metadata12532021778](https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/12532021778) y [metadata12531023874](https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/12531023874). Esta nota no sustituye ni modifica sus originales.

## Secuencia y aceptación

Intervalo administrativo original **21:17:12–21:27:12 UTC**, sin renovación.

| Momento UTC | Evidencia y límite |
|---|---|
| 21:19:29.302 | Stage0 cloud GET con override29927: smoke existente11/11, cuatro assets exactos4/4 y mapa200 con A2A/AgentCard. No acredita adopción ordinaria. |
| 21:23:00.025–21:23:12.030 | Probe cloud normal: seis pasadas, manifests404 y dos JSON de8057; smoke genérico11/11, mapa anterior. `ok=false` se conserva. **Root todavía NO había promovido**, pues no recibió ARMED por la interfaz a tiempo; no fue incidencia ni evidencia de propagación AFW. |
| 21:26:15.720423 /ACK21:26:16.806 | Root emitió UN POST de promoción: deployment `3cec273c-50ef-4010-b813-f917c3b1169d`, candidata29927@100%, versión anterior8fc686dd@0%. |
| 21:26:19.144 | Observador normal de root: cuatro assets exactos, smoke11/11, mapa200/124055bytes/A2Atrue. Regex de enlace doblemente escapada dio cardfalse/exit1; el primer resultado **no fue ok=true**. |
| 21:26:44.182 | Corrección SOLO del observador a `includes`, GET independiente: cardtrue y enlace literal `/.well-known/agent-card.json`, dentro del deadline original de observación **21:26:46.806** (30s desde ACK). Sin código app, nueva promoción, purga o rebuild entre lecturas. |
| 21:27:12.748 | GET primario posterior de root confirma deployment3cec, candidata100%/rollback0%; diez bindings y settings iguales al rollback, runtime idéntico, workersdev=false/previews=false/tails0. Es readback posterior al plan, no renovación de autoridad ni mutación. |

**Aceptación compuesta**, no reescritura del primer JSON: cuatro hashes + smoke11/11 + mapa dentro de los30s originales. Root utilizó como excepción mínima Node22.23.2 ya existente para GET≤30s, sin archivos/dependencias, al fallar la sincronización de ARMED. No se repitió promoción; no fue necesario rollback.

Smoke literal de main70d75: `scripts/smoke-cloudflare-native-local.mjs`, SHA256 `907bd74247f0b1a69bae7259101b311fa7357b8d94c27e3a14d491bb048f741e`; asserts, rutas y fronteras Access preservados. No se siguió login ni se aportaron cookies/credenciales.

| Asset | Bytes | SHA256 normal aceptado |
|---|---:|---|
| `_buildManifest.js` bajo `/_next/static/3e7bf3c4-8706-4900-8dcc-94097b2778a8/` |159|`47f02b34be6dc481257b6efce4c19e19111f37ef5c437f8ffed44f0da97fa9bb`|
| `_ssgManifest.js` bajo el mismo directorio |76|`653f3e53e89b4f8548ff86c19e92bb3c6b84b6be7485a320b1e00893ed877479`|
| `/.well-known/agent-readiness.json` |9055|`9eeac1d632dea81c23174e50faca9fbc576f20a3d7f4997f1b3c056e9e02286a`|
| `/.well-known/email-operations-contract.json` |3508|`d44ef2f90243adf82fe84fb7c4ef7a524fc1eb5d3d01c4b602b8056fddaf1bfc`|

Dos recibos cloud originales preservados fuera de Git, sin alteración:

- `public-stage0-smoke-20261023/receipt.json`:4943bytes, SHA256 `c317ba20d9cefe263bb747b4ab9b4692111a38bc36cb225e3478eefc5493d82b`.
- `public-normal-probe-2123-20261023/receipt.json`:11277bytes, SHA256 `d085b383e48d8493fb67a004c9ee0dc2ee2e3e586117e37ca5a92ee05b74bd57`.

## Estado público y separación de privados

Configuración/schema/pins privados intactos. Rollback preservado: `8fc686dd-bcf4-4445-a8d9-fdb8fc3224ff`; nueva pública `29927b77-1e41-47df-9854-ab9830f84755`. El token público fue creado, guardado y rotado por el owner; vigencia comunicada hasta **30 oct23:59:59 ART /31 oct02:59:59 UTC**, sin autorrenovación ni valores en este recibo. Lectores privados23oct separados, sin renovación implícita.

El contrato `read_validate_and_prepare_only` no acredita guardia. Monitor LOCAL PAUSED; source privadoe3/frozen3d4/V4 sin cambio; **operationalReadiness=false /PC-off=false /Max no enviado**. No se acredita consumidor cloud, revisión útil de eventos, baja nativa, incremento de puntaje ni soporte resuelto. Publicación pública y custodia no sustituyen esos gates.

Consulta pública independiente de root a las **21:35:45.781 UTC**: HTTP200, cabecera Date23oct21:35:45GMT e `incidents: []` en el feed oficial `unresolved`; `page.updated_at` conservaba27ago. Ese campo antiguo por sí solo no demuestra obsolescencia, y el feed vacío no confirma reparación del caso AFW ni aceptación de runtime. La consulta del incidente específico a21:36:51 no aportó campos de estado utilizables: resultado desconocido, sin reintentos. Soporte del caso02382110 (mensaje23oct10:25:48UTC, referencia opaca `1a1684ba0a0bbd10`) confirmó que sigue en ingeniería, sin hallazgo ni ETA y sin confirmar reconciliación de la asociación original. Esta publicación no autoriza nuevo upload, credenciales, permisos, OAuth, cron, Container ni ensayo privado.
