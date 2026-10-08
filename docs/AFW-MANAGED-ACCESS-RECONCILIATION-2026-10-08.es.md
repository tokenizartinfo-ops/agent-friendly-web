# AFW: identidad operativa reconciliada

Evidencia 2026-10-08 01:39–01:41 UTC (7octubre Argentina). Supera el pendiente de autenticación del ensayo cerrado en AFW-CLOUD-DIAGNOSTICS-PUBLICATION-2026-10-07.es.md; no acredita revisión de expedientes ni guardia permanente.

## Causa y alcance

Los ensayos recientes habilitaron el token anterior8ecc45fc-8a8e-4017-bca4-a85c020b9592. La carga posterior y aceptación histórica documentadas en AFW-MANAGED-CUSTODY-READINESS-2026-10-05.es.md y AFW-CLOUD-NETWORK-ACCEPTANCE-2026-10-05.es.md corresponden a identidad gestionada1bf43326-9ad1-491a-8f04-ba92d777d724/version2. El contraste con los mismos bindings actuales distingue ambas identidades, sin inspeccionar valores ni recargar claves.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT AFW Operations, servicio cerrado; ORIGIN https://operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Access token/policy; RESOURCE_ID identidad1bf, app5b7e6f71-6c9b-4804-ae2f-552bb5565ac0, policy73bf6a0f-25b8-4c9c-805f-67f01788cf11. ALLOWED_ACTION contraste finito propio y retirada, bajo autorización vigente del owner. ROLLBACK identidaddisabled/selectororiginald12150c5-ba69-412e-bed0-6415103fc2ec. Sin datos de Max.

## Descartes y preparación

UI de Bóveda personal cargada, workspace/cuenta actuales y buscador vacío: «Aún no hay entradas». API no expone duplicidad de bindings ni colisión con runtime_variables. El catálogo no ofrece diagnóstico de suministro por solicitud ni snapshot estructurado histórico. No confundir estos límites con valores incorrectos.

Regla de precedencia contrastada con documentación oficial: https://learn.chatgpt.com/docs/environments/cloud-environments . Hipótesis de superposición descartada en la superficie observada, sin leer valores.

Tarea01a118b0-ff72-70d4-937f-b87bc251c03b/hostdurable; fuente4d424cf2c1b117bf42069532f9ce19747e649078; publicacióncecfgver_6ac6d4019d8c81a3a2bc32cf5d3b1343. Preparación fresca27/27/currenttrue, restricted/enforced, ambos bindings Operations ready, destino exclusivo correcto, checkout limpio.

## Contraste real y retirada

API01:39:23.348Z confirmó identidad1bf habilitada10min/version2 y selector exclusivo1bf. Sin cambio de custodia, Worker, D1 o datos. Una orden por fase: `node --use-env-proxy scripts/afw-operations-client.mjs --diagnostics assistance-list`, modalidad soportada `with_additional_permissions.network.enabled=true`, proxy/CA/TLS/allowlist conservados.

| UTC | Estado | Resultado |
| --- | --- | --- |
| 01:39:42 | Identidad gestionada habilitada, servicio cerrado | response/404/json; exit1 |
| 01:40:13.114 | Cierre por API | disabled/version2/selectororiginalrestaurado |
| 01:40:34 | Mismos bindings tras retirada | response/401/json; exit1 |

Ambos stdout contrastados mediante read_thread, no solo resumen. Exit1 es esperado: cliente exige200JSON;404 esperado acredita paso Access con servicio cerrado,401 posterior acredita retirada. Sin errorbody, headers, secretos, hashes, cookies ni excepciones arbitrarias. Sin retries, claims, ACK, SQL o correo.

last_seen_at no avanzó en lectura inmediata aunque el contraste funcionó. Ese campo y ausencia de logs no prueban falta de suministro del proxy.

API01:41:27.408Z: managerconsumer/assistance/dossierfalse, ventana vacía, D1original603c471d-19bb-4530-9773-c02e18b29840 enid/database_id; cronproductorQA[]. Token y política cerrados verificados previamente. No modificación de Workers.

## Instrucción y siguientes pasos

Próximos ensayos: usar identidad gestionada1bf reconciliada con carga y aceptación vigentes.8ecc es histórico y no corresponde a los bindings actuales. No inferir clientId desde placeholder ni imprimirlo. Identidad servidor de Worker abierto requiere comprobación separada.

Pendientes: productor/ACK revisión10 propia, retorno vigenteUI, cierre completo del ciclo, PC-off integrado y preview editorial antes de Max. El ensayo cerrado no habilita esos bloques ni cadencia permanente.
