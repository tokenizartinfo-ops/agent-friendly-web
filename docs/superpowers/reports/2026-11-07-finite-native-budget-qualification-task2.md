# Task 2. Entrega parcial de custodia SYN

Fecha 2026-11-12 UTC. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, rama `feat/finite-native-cleanup-20261101`. Root autorizó la entrega parcial de custodia y la retirada del workflow temporal después del readback. El único cambio de comportamiento consiste en admitir cuatro valores fijos del contexto autenticado. Se conservaron las comprobaciones de repositorio, ref, revisión, run y primer intento del formato v1.

## Alcance y evidencia

- BASE2 `7852f3a71de7cfcb98fedbd7b51c6a9886bf17da`, árbol `b4246c3128e77a0b1276ea3da9e4dede17f1f8a3`, 3188 hojas. El workflow temporal estaba ausente.
- Referencia global `29681cae2bf1094ec5c66d5b2784254f77bec697`, árbol `0200cf32ac4e020bd35c56c307fbc8060cf8bd64`. La comparación recursiva completa global→BASE2 encontró 14 diferencias, todas bajo test y docs. Los árboles del código productivo, incluidos `lib/`, `worker/`, las configuraciones, el SDK fijado y los archivos de dependencias, coinciden.
- [Brief de implementación](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b12746e73d2b3212ad11bd4ee8d6ce1222228654/docs/superpowers/briefs/2026-11-12-finite-budget-task2-implementation-stageA.md). La calificación abierta en este bloque abarcó exclusivamente custodia, ocho contratos puros y preflight de compilación. Todas las operaciones de fuente usaron GitHub. Las ejecuciones usaron Actions en Ubuntu 24.04, Node 22.23.4 y el lock del mismo SHA. El test genera una clave efímera en el runner. Los jobs comprobaron que no recibían `AFW_SYN_CHECKPOINT_KEY` de un environment.
- El adaptador conserva AES-256-GCM/gzip, inventario en dos pasadas y límites de 4096 archivos, 512 MiB de entrada, 768 MiB de JSONL y 128 MiB de envoltura. La extensión modifica solamente el enum de `expectedContext`. Los nuevos tipos son `readonly-result`, `reduction-checkpoint`, `reduction-result-a` y `reduction-result-b`.
- Cada prueba C9 sella y vuelve a abrir un conjunto de bytes con el mismo contexto. Rechaza contextos de los demás tipos sin producir directorio de salida y rechaza un cambio de un byte en la envoltura. C10 comprueba que un tipo desconocido también se rechaza antes de sellar. C3 conserva la prueba independiente de alteración de IV, etiqueta y texto cifrado. Estos tests usan únicamente datos sintéticos desechables.

## Historial de revisiones

| Paso | Revisión | Padre | Árbol | Blob temporal | Hojas |
| --- | --- | --- | --- | --- | ---: |
| RED, enum original | `8a571e01ecade0fa02b9eada316e1053afa682a4` | `7852f3a71de7cfcb98fedbd7b51c6a9886bf17da` | `dfd17f7f93b6d4f1cc32307c5ef2aabef3d398a5` | `55e07deacc6990a78f14f5b43e95cd45a275c5ca` | 3189 |
| Primer workflow GREEN, YAML inválido | `5e02883523d7b9b9ee46eda1400dec78328325de` | `8a571e01ecade0fa02b9eada316e1053afa682a4` | `c6c251ff403ffa1f1dec5c99e7283b8049a06ea2` | `07be885b6d8fc595659b7deb358f60a60bd878df` | 3189 |
| GREEN con workflow corregido | `c2214807f003219e42970e168cac463047b0eb80` | `5e02883523d7b9b9ee46eda1400dec78328325de` | `9d02ec23a66aca918eb4ce61d61caf6ea107cfb8` | `9cdc2e67c83c95924d2d3cc38ee2cb3dbcfaf882` | 3189 |

En RED el helper era el original `9a486b839874ed8e9a950f6a823b18e7585de52e`. En ambas revisiones GREEN era `4d05b5ec0f7b074be88ef9733a47c984b0212351`. El test pasó de `c913c94be080597704fbf7d370475443e1f1b96d` a `a8840f791fcf06c8a77c9e245eef2cc31e6256c2` antes de cambiar el helper. Cada actualización verificó el padre inmediato, el árbol recursivo, los modos y los bytes leídos por blob. Cada ref se actualizó con SHA esperado y sin forzar.

## Resultados en Actions

1. [RED, run 43159635890, job 130987499622](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43159635890/job/130987499622), primer intento, 05:10:54–05:11:23 UTC. El TAP original contó 14 tests, nueve PASS y cinco FAIL. Los cuatro C9 fallaron con `custody_context` al intentar sellar el tipo válido aún desconocido. El quinto FAIL fue el agregado de la suite. C10 y los ocho subtests previos pasaron. Cancelled/skipped/todo 0. El job conservó el código de salida real del test después de verificar el mismo artefacto. ID `13917561964`, 2152 bytes de ZIP, SHA-256 `ad34f13f8a81555f3e712bb9a3b9fb85b5671e9b9c8c8dbd98137e4f4a95b442`, expiración declarada 2026-11-19 05:11:17 UTC. Primera recuperación correcta, reintentos omitidos.
2. [Workflow rechazado antes de crear jobs, run 43159842658](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43159842658), 05:12:41 UTC. Una sustitución de texto del generador de YAML interpretó la secuencia dólar-apóstrofo de dos expresiones regulares como sufijo de sustitución y duplicó pasos. GitHub registró 0 jobs y 0 pruebas. El arreglo reconstruyó el bloque por concatenación literal en TEMP. Los IDs de pasos resultaron únicos y el cuerpo incluyó un único job y un único preflight. Los blobs de helper y test conservaron sus hashes.
3. [GREEN, run 43159967950, job 130988602267](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43159967950/job/130988602267), primer intento, 05:13:47–05:14:32 UTC. Ejecución en `c2214807f003219e42970e168cac463047b0eb80`. Los ocho contratos Q1–Q8 pasaron, con 0 fallos, cancelaciones, omitidos y TODO. El proceso de custodia contó por separado 14 PASS (13 subtests y su suite), también con 0 fallos, cancelaciones, omitidos y TODO. Pasaron syntax, lint enfocado y preflight de los grafos M/QA con I0 cerrado. Artefacto `13917287954`, 28774 bytes de ZIP, SHA-256 `e4fe94ad9ad4891b192ca249a02c6eedb8b6a3ca8ae0a9054764f5c7b621a9ba`, expiración declarada 2026-11-19 05:14:28 UTC. Primera recuperación correcta, reintentos omitidos. La verificación comparó el manifiesto local y el descargado por ese ID y volvió a calcular las entradas de inventario.

Comandos ejecutados por los jobs:

```sh
npm ci --ignore-scripts --no-audit --no-fund
# RED y GREEN, dentro de procesos separados
node --test --test-reporter=tap test/finite-checkpoint-custody.test.mjs
# Sólo GREEN
node --check test/fixtures/finite-checkpoint-custody.mjs
node --check test/finite-checkpoint-custody.test.mjs
npx --no-install eslint test/fixtures/finite-checkpoint-custody.mjs test/finite-checkpoint-custody.test.mjs
node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs
AFW_BUDGET_GROUP=positive node test/fixtures/finite-budget-world.mjs preflight-budget
```

Los TAP puros y el inventario quedaron en los artefactos indicados durante la retención de siete días. El stdout del job imprimió los resultados reducidos. C9 prueba rechazo de una alteración con el manifiesto original. La comprobación independiente que recalcula los bytes externos pertenece al C3 preexistente. Las pruebas no abrieron una instancia de negocio ni leyeron estado nativo OAuth. No se generó un checkpoint o un resultado nativo en esta entrega.

## Cierre parcial y pendientes

La confirmación terminal retira `.github/workflows/afw-finite-budget-qualification.yml` y añade este reporte sobre el padre GREEN `c2214807f003219e42970e168cac463047b0eb80`. Su delta neto frente a BASE2 incluye exclusivamente este reporte, el test de custodia y el enum del helper. El readback independiente del commit de cierre se entrega a Root una vez que GitHub asigne el identificador.

| Caso pendiente | Implementación y calificación en esta entrega |
| --- | --- |
| R1, R2 y R3 | Pendientes; las tres comprobaciones readonly se especificaron y no se implementaron ni ejecutaron. |
| D1, D2, D3 y D4 | Pendientes; los cuatro casos de reducción y la recuperación de pares antes del mismo C0 no se implementaron ni ejecutaron. |
| Siete jobs y calificación de 16 casos | Pendientes; no se construyó ni habilitó el workflow conjunto. La custodia y Q1–Q8 no acreditan ese resultado. |
| Recepción cifrada nativa y enlaces de procedencia entre jobs | Pendientes; el tipo autenticado está cubierto por pruebas puras. Queda verificar manifest interior, artifact ID, consumidor y margen en un flujo integrado. |

La sonda existente `firstConnectionAvailability()` utiliza un Root de request registrado y la puerta de exclusión del mismo actor. Quedó identificada mediante lectura estática. Esta entrega no aporta una observación de exclusión durante R3 o D4. Task1 conserva su resultado previo, P1 no se reejecutó, ORD-1 sigue abierto y las revisiones de conjunto quedan pendientes.

`operationalReadiness=false` · `completePackage=false` · `PCoff=false` · `globalNativeDrainVerified=false` · `sdkNamespaceEmptyVerified=false`.

## Preparación de casos fijos y primer control puro — 2026-11-12

La ampliación se inició con tests, sin ejecutar casos nativos: commit `5c294fd08ae608f80127e593c57cee8b4703debc`, árbol `8249be8241d8d80fb61c1529960d699391d58723`, test `8339c7550c05e996ad44263fafd6a2a7ac564c0e`. Después se prepararon los fixtures en `b5caa68ec74cc9848a86a29f36da207658a3b4de`, árbol `fa0f8214a3b687c88d27f47ac3f5e49084340bc9`: world `e5c92742ddddab156446ee1c7a0e3429be8798cd`, cleanup fixture `3448f503dcad52d4efa08725e3146d7058ca7451`, TEMP puro `9fa482c6cadb26de756027ea5fca2d9b81055eb3`. Se verificó el árbol recursivo completo: 3190 hojas, 3185 blobs/modos protegidos exactos frente a BASE-N `92e1f71d9bf87b04ce2a82dbc6f6f43039ed944b`, y CAS/readback de la rama. El prefijo previo de este reporte se conserva.

El diseño añade exclusivamente emisión SYN después del transform original: mismos `Initial.prototype`/ctx/env, cinco métodos fijos y estado WeakMap privado. El entry original sigue sujeto a 64800 bytes/SHA256 `89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257` y a sus selectores. Dos notificaciones numéricas observan los enqueue de readonlyGrantKv/reductionKv después del push original y antes del pump; una notificación pasiva observa el Promise real de revokeGrant con el then intrínseco. Se registran separados del baseline, sin nueva autorización ni cambios de algoritmo. Estas propiedades aún requieren un preflight conjunto satisfactorio; el diseño no acredita su ejecución nativa.

[Run puro 43163999087/1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43163999087), job `131001483736`, 05:50:10–05:50:54 UTC, terminó FAILURE. Pasaron syntax de los tres JS, lint enfocado, carga con grupo ausente (un wrapper de archivo PASS, cero casos de negocio, sin directorios nativos), rechazo del grupo inválido y Q1–Q8: 8 PASS/0 FAIL/cancelled/skipped/todo. No se reejecutó custodia14 ni P1. Falló el paso de los tres preflights de compilación; el log público conserva sólo `preflight_failed`, sin identificar perfil o assertion.

El artefacto de fallo `13919585469` conserva únicamente status y manifiesto, 633 bytes ZIP, SHA256 `6937c2f148ba3ab84a38b1d852b5f1a1d4805e9969dedf8b36c971e2eb3c80e0`, caducidad declarada 2026-11-19T05:50:51Z. Upload, descarga por el mismo ID y readback de inventario pasaron. Los TAP y el preflight privado no se copiaron en esa rama de fallo: es una brecha de evidencia, no una causa inferida. La primaria del job registra explícitamente los recuentos anteriores.

Root autorizó un único diagnóstico puro adicional, limitado a los perfiles positive/readonly/reduction_a del mismo código y sin Q/custodia/I0. Capturará DTO cerrado con perfil/etapa/enums, actual/expected numéricos o hashes y mensaje resumido por longitud/SHA, sin mensaje/stack/Worker/secretos. Se conservará ese JSON seguro también cuando un perfil falle, con siete días y readback por ID. No se refrescan pins ni se repite automáticamente el ensayo. El workflow de siete jobs nativos sigue sin publicación o ejecución; la calificación16 está HELD.
