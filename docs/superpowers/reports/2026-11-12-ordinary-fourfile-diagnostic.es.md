# ORD-1 — preparación inactiva del diagnóstico acotado

Estado: PREPARADO PARA REVISIÓN, NO EJECUTADO. `operationalReadiness=false; completePackage=false; PCoff=false`. ORD-1 sigue abierto.

## Alcance y autorización

PROJECT AFW; repositorio público tokenizartinfo-ops/agent-friendly-web (1347578006); ORIGIN GitHub connector. Único destino de escritura: `diag/afw-ordinary-fourfile-20261112`, verificado inicialmente en `f5f52660d19ec9fc634bbc49558db75582fdaf88`. Base real: árbol `7bc8b997a968dca32fc567b627de70b774d6489c`, 3188 blobs, todos modo 100644. Tres altas permitidas: este informe, `scripts/diagnostics/ordinary-fourfile.mjs` y `.github/workflows/afw-ordinary-fourfile-diagnostic.yml`. No Source/Rootdocs/main, mutación de producto, jobs, builds, tests, instalación, checkout local ni acceso a credenciales/proveedor.

Requisitos leídos en Rootdocs `d84c035223926dfd44bb6f5cce7d18c943739867`: brief `2ac83df3cb4d4c3ac3fb2afe28f5b12fc32212d0`, spec `9e2c7e426f4ce3caa62565193c40cf733d04e8ac`, plan `961453320d9c33a53830901d4f8a2319d9179570`; preflight preservado `5b2610ea434580e7cde8f283b4443fb5ffa08c9b`. A/B histórico: 109 tests, 73 pass, 36 fail y 40 eventos de fallo, incluidos cuatro wrappers. No prueba main/producción.

Ruling de ejecución: el brief prohíbe ejecutar pruebas y crear otros archivos o reviewers durante esta preparación. Por ello las instrucciones genéricas de TDD/worktree/ledger se subordinan a ese límite; este archivo es el registro durable permitido. Root encarga la revisión fresca separada. No se interpreta la preparación como aprobación para activar.

## Harness y diferencia causal

Dos checkouts futuros separados: código del diagnóstico en el SHA real del workflow; subject limpio en f5 con historia completa. El helper verifica HEAD, 3188 blobs, contenido/modos antes y después, paquete `f4fd38ac380c46a149d8cf0f3bd828a28406f761` y lock `36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b`. Copia los blobs a overlay privado del runner y enlaza solamente node_modules del subject. Ningún archivo fuente original se modifica. Cinco overlays de test/fixture, y marcadores del entry exclusivamente en la carga de esbuild. Normalización inversa exacta, conteos de ocurrencia y hashes registrados.

A conserva el comportamiento existente; los observadores devuelven la misma Promise/valor, receiver, argumentos y objeto de error, mediante ramas de observación, sin reemplazar relojes. Las lecturas de performance de negocio no se compensan. La instrumentación tiene un costo temporal inevitable que debe considerarse al interpretar el baseline.

B es idéntico salvo el retorno del onLoad de `mcp-qa-native-wrapper-pin.mjs` en el build YA existente del VM sintético de `mcp-qa-cloud-native-cli.test.mjs:77`. A entrega el texto original del pin; B entrega los bytes/hash del artefacto construido por el helper real. El validator real no cambia. El pin en disco, su blob `075a52bf0fb8fa649520f17fa15eacc9b4738222` y su autoridad productiva permanecen intactos. B es una entrada MODELED dentro del VM, nunca una autorización de producción. No se copió un algoritmo de negocio.

Seams:
- own entrypoints :7/:8: build e importación, una ocurrencia cada uno.
- native CLI :11: builder real; :28: bytes/hash; :77: build/plugin; :88: callback de marcadores del VM; :63: invocación efectiva del controller; :89: conteos numéricos de salida. Ocho ediciones, una ocurrencia cada una.
- adoption :13: fixture, una ocurrencia; finite-command :37 y :58: fixture, dos ocurrencias.
- finite-http-module :7/:37 y :8/:38: build/import, dos ocurrencias por seam.
- entry real qa-cloud-native-observation :15/:21/:22/:29: artifact_load/controller/settlement y catch externo, una ocurrencia cada uno. Sólo agrega marcadores al texto que esbuild carga; el archivo no se sobreescribe.

El helper usa `NODE_TEST_CONTEXT=child-v8` de los procesos aislados de Node 22 para instalar observadores; no emite marcadores de preload en el coordinador o reporter. Si ese contexto o los contadores del reporter no están disponibles, falla la completitud y el resultado queda inconcluso. Esto aún requiere ejecución cloud.

## Comandos previstos y resultados falsables

NO EJECUTADOS:
```text
npm ci --ignore-scripts --no-audit --no-fund
timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-fourfile.mjs A
timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-fourfile.mjs B
```

Cada brazo invoca una sola vez `node --import <helper> --test --test-reporter=<helper>` para los cuatro archivos fijados en el código. Node 22.23.4, Ubuntu 24.04, grupo UNSET. El proceso de pruebas recibe un entorno estéril y explícito; el SHA hijo f5 se etiqueta MODELED_STERILE_SYNTHETIC. SHA/ref/trigger reales del workflow se registran por separado. No se heredan tokens ni se presentan variables modeladas como admisión real. Diferencias de entorno con el A/B anterior no se ocultan ni se ajustan para forzar el baseline.

A debe reproducir 109/73/36 para sustentar una conclusión causal; de lo contrario, Root debe clasificar inconcluso y explicar la diferencia. Si los bytes/hash actuales difieren del pin y B recupera únicamente los 12 casos nativos previstos, con controller counts restaurados y persistencia intacta, apoyaría la hipótesis: 36→24 fallos, manteniendo los 24 de own/adoption/command sin reparación. Si el pin ya coincide, se registra igualdad y no se fabrica una discrepancia. Sin recuperación específica, la hipótesis se rechaza o queda inconclusa. Ningún resultado autoriza un patch automático.

Las familias own (2) y adoption/command (22) siguen sin causa establecida. Los marcadores build/import/fixture y hashes de mensajes deben localizar la frontera, sin atribuir de antemano el defecto a producción o a tests.

## Privacidad, plazos y preservación

El reporter sólo exporta enums fijos, posiciones de los cuatro archivos, contadores, bytes/hash públicos del artefacto y hashes de mensajes de hasta 1 MiB. Mensajes mayores: null + tooLarge. No lee stack, actual/expected, títulos, cuerpos, env, cabeceras, bundles ni URLs data. No hay regex sobre data URLs. Causas se recorren a profundidad cuatro mediante descriptores de datos; los nombres/códigos se cierran por allowlist. Errores agrupados se limitan a 64, privacidad a 16 controles, JSON seguro a 64 KiB. No se publican objetos arbitrarios de stdout.

Control futuro dentro del harness: canary fijo que sólo se hashea; getter de stack/code que contabiliza cualquier lectura; mensaje de más de 1 MiB que debe suprimirse. Todavía NO ejecutado. Fence explícito de fetch/socket/TLS/HTTP impide llamadas de negocio; cualquier intento vuelve incompleto el diagnóstico y se cuenta, sin registrar destino. El compilador sigue siendo esbuild del lock.

Cada child tiene plazo interno conservador de 110 s, SIGTERM al grupo propio y SIGKILL +5 s; el comando completo tiene timeout 120 s/+5 s y cada job máximo siete minutos. Sin retry. El SIGTERM del padre también termina su grupo hijo. Logs privados del runner: máximo 8 MiB por stream, modo 0600; hashes corresponden sólo a bytes capturados si se alcanza el cap. Nunca se suben. Antes de arrancar las pruebas se conserva un recibo running_or_interrupted; al terminar se sustituye por evidencia segura. El workflow conserva un recibo fijo si setup/deadline impidieron generar resultado.

Sólo result.json y manifest.json se suben, siete días, un artefacto por brazo. La salida del action expone ID exacto y digest SHA256 para inventario independiente. Root debe verificar después el run/attempt/head, exactamente dos IDs/nombres, hash/bytes y manifiesto por esos IDs (no latest ni búsqueda por nombre ambiguo), con GET de metadatos acotado a 2 s y recuperación acotada a 5 s; si no llega, preservar incompleto y parar, sin retry automático. El helper no adquiere credenciales para recuperarlos. Aún no hay IDs, run ni artefactos de esta rama.

## Workflow inactivo y delta de activación propuesto

Sólo workflow_dispatch, sin inputs, push ni schedule. Ambos jobs tienen literal false y guards exactos de repositorio/rama/evento/attempt 1; permissions contents:read y actions:read; cancel-in-progress:false. Checkouts con persist-credentials:false; no environment ni secret env. Los tokens internos del checkout de GitHub no se pasan al proceso de pruebas.

No activar durante la cualificación nativa de Source. Root debe revisar esta candidata y emitir release separado antes de cualquier ejecución. Si el workflow nuevo no es despachable por no estar en default, eso no requiere tocar main/UI: propuesta posterior (NO aplicada) es añadir push exclusivamente de esta rama y este único path de workflow; en los dos guards quitar false y exigir event_name == 'push'. El helper admite ese trigger futuro en la rama fijada, pero este YAML sólo admite manual y los dos false siguen cerrados. Delta de activación: un bloque de trigger fijo + dos guards. No entradas arbitrarias ni cambio del subject. Después de UN experimento, desactivar los dos guards de nuevo; no repetir, renovar ni reparar a partir del resultado.

Rollback de preparación: dejar los false intactos y no activar. No reset, force, delete, merge, deploy ni mutación de datos. Evidencia y commits se conservan.

## Verificación efectuada y límites

- Conteos y normalización inversa de seis textos comprobados en RAM como metadatos contra fuentes inmutables.
- Sintaxis del cuerpo del helper y de seis overlays: compilación de gramática por node:vm sin evaluación; imports se retiraron únicamente para ese chequeo y se inspeccionaron aparte. No es un test de carga ESM, build, reporter ni runtime.
- YAML parseado con PyYAML existente (BaseLoader): único trigger workflow_dispatch, exactamente arm_a/arm_b y dos if:false. Sin instalar herramientas, sin archivos locales del proyecto.
- Acorn/YAML Node no estaban disponibles; no se instalaron. Un intento de enviar metadatos juntos superó el límite de entrada de 64 KB del tool; se sustituyó por chequeos pequeños. No se ejecutó el proyecto en ninguno.
- Hash helper SHA256 `8faf6d896ca1b935ebbd6f443349bd088a27b068884d8e61330e87898dd09cc1`, 23215 bytes; workflow SHA256 `9a39e865c6af0065c04769b7692c7f97cf39752375a50a887b18cceebe555c12`.
- Actions API de esta rama devolvió total_count:0 antes de publicar. Se repetirá readback tras publicación. No se ha despachado ningún job.

Self-review: A/B tienen la misma instrumentación y fence; única sustitución causal es el pin MODELADO del VM. Origen del subject y del workflow separados, errores/logs filtrados, preservación y timeout cerrados, ninguna rama compartida mutada. Riesgos pendientes: compatibilidad real del reporter/preload Node 22, reproducción del baseline con entorno estéril/fence, disponibilidad del compilador tras ignore-scripts, plazos observados y revisión independiente. No hay afirmación de pase/readiness ni de PC apagada.

## Hashes exactos de overlays y literales (metadatos, no ejecución)

```json
[
  {
    "path": "test/mcp-own-finite-entrypoints.test.mjs",
    "originalHash": "fc7de7a7e5c5c641800e67d812f426a67d2e6d947df342eb5d06c26d772b36b5",
    "newHash": "36154f10f85f191731f787a85fe28562f71da146289c79396353b7f50e0ca069",
    "seams": [
      {
        "line": 7,
        "count": 1,
        "originalLiteralHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
        "newLiteralHash": "b28198970bb9112a0bc3752414bec1260b0176403ee8c369cb475b490eb02038"
      },
      {
        "line": 8,
        "count": 1,
        "originalLiteralHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
        "newLiteralHash": "f85b08e509970f6f9ea8ec191a28ece847f2038f648935221c76d030a5ff4e30"
      }
    ]
  },
  {
    "path": "test/mcp-qa-cloud-native-cli.test.mjs",
    "originalHash": "76f5dd7f288709ba9e1b373663e89846eba6def0d1569a94020224e5a10b31d9",
    "newHash": "8e0a50c998ce3c49e48c5a500857c69aaf895fbaf999ae193b69839b33eab567",
    "seams": [
      {
        "line": 1,
        "count": 1,
        "originalLiteralHash": "839cf2655267094fdbf41ad83d7b89fa202606d6b1235454745934a1c6f2529f",
        "newLiteralHash": "db8ccb35df4b12f1f4d8589edb981f0facc763103be66d9208c7cbc23db1ed2d"
      },
      {
        "line": 11,
        "count": 1,
        "originalLiteralHash": "733ebbc0353601d5201830595b1609f1a3db8583d581a6ecfc222a6d9ac7ce52",
        "newLiteralHash": "6ff80ef7b3cb76ae8f52c45a0d778770a1f6fc85f297d998ab0f7cfa3b97ff42"
      },
      {
        "line": 28,
        "count": 1,
        "originalLiteralHash": "55a3b72a9a40cdc342a1e1fb89d40666a91b32a16b27f3533224102218980378",
        "newLiteralHash": "6c3096db96f41b258eced84a4283fbf8df2a51396a4ef1223d584b5b0ceca28d"
      },
      {
        "line": 77,
        "count": 1,
        "originalLiteralHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
        "newLiteralHash": "754cb10500e4f34d9515b7b6181ef3bf12ab45b2aeea653c3440f95dfea8db93"
      },
      {
        "line": 77,
        "count": 1,
        "originalLiteralHash": "af3ad73431537603595f401052d2d64c015d604d921f650a7da8a26280654cb4",
        "newLiteralHash": "0aefd662a64fb6440c96be7e0fbbe902a986852d62abb96b1e053404405a3e63"
      },
      {
        "line": 88,
        "count": 1,
        "originalLiteralHash": "6733bf223273e19e8bdcbaa28888e6c4032cf4591253d32bd9244f8a0778ff4b",
        "newLiteralHash": "3ffd6dea638c17291aa8fa09e3b53313abd95e5b88c52540f3f676d8a144e589"
      },
      {
        "line": 63,
        "count": 1,
        "originalLiteralHash": "1b06471f94631f564cf775fde5e251a39a07ba1100134ce105d403c081f7c54c",
        "newLiteralHash": "e2740e86446f2ad536149e160ecdd49be5820a7084e31577c54c0f938e6fce47"
      },
      {
        "line": 89,
        "count": 1,
        "originalLiteralHash": "d81af3321d3c0c5e187dc7177137f46f469eeb2cf86fa04136fa3cfb8b732133",
        "newLiteralHash": "21f0f3b3bb6446eb5bf72e55b6ebed609bc514546646201b661e3728d07f525c"
      }
    ]
  },
  {
    "path": "test/mcp-qa-finite-adoption-wait.test.mjs",
    "originalHash": "d2ca0aa07bb989985d5262aeaf3c5964f20167da4b9c39a0b21975c9f1178226",
    "newHash": "efdb7ed8ce672f1275cebe126182f186b6bb2e13a55ff2bc04fd91df349ba633",
    "seams": [
      {
        "line": 13,
        "count": 1,
        "originalLiteralHash": "afee59eab4a21b0a272448eb4c9252dfda5ff713998094e1477c96ddeb0767ec",
        "newLiteralHash": "23c705200cf9c957f02d1e905a805c2b3df878b0b460cd3d660e16166ff89e21"
      }
    ]
  },
  {
    "path": "test/mcp-qa-finite-command.test.mjs",
    "originalHash": "b1c27fc22776e54df805548f125ef9833abb50c68feb5a3cb83f90043f37fb22",
    "newHash": "13f1cf867b5ba0dbc8043f6ae919a00e29c8df7d7697c2485eb9fcb4fb8ad2f9",
    "seams": [
      {
        "line": 37,
        "count": 2,
        "originalLiteralHash": "afee59eab4a21b0a272448eb4c9252dfda5ff713998094e1477c96ddeb0767ec",
        "newLiteralHash": "bcfc3b1c75aa8c6ec4d9a6eba22f83a5e92a3e4db10884e12932ff2e246e3831"
      }
    ]
  },
  {
    "path": "test/fixtures/finite-http-module.mjs",
    "originalHash": "1de81a4238c5868590918b021ddd8071c1c90237982c8ea8cfdb83f01dbc7233",
    "newHash": "c30bcd081be8e7e2a1f5a55649b28e01caf2da38b4c59ea59817671e40565e36",
    "seams": [
      {
        "line": 7,
        "count": 2,
        "originalLiteralHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
        "newLiteralHash": "23cd09bb64518ca0fe87b1e02b3d52994993db6d7f1562943cc75ac05c4a631b"
      },
      {
        "line": 8,
        "count": 2,
        "originalLiteralHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
        "newLiteralHash": "d75190f4470655dfd6159b4a92db556f2c8d702ace933d89743858d3d51b14cb"
      }
    ]
  },
  {
    "path": "scripts/qa-cloud-native-observation.mjs",
    "originalHash": "011391848605867b437270e6c940b238c2b20df3907cda217276cfecd0f64d5f",
    "newHash": "a9892370102f6047fa458eb9ba12a18dbbc2f52fa116123929442d94a0720fb3",
    "seams": [
      {
        "line": 15,
        "count": 1,
        "originalLiteralHash": "ec4ee91fc30ccb30a4532352b4f9b58823e15fc8dcc262f69e92e043163daf58",
        "newLiteralHash": "93f757051715e9a8e90674c18f8fd9f95b78efe5d1b7f669235329005806f7fa"
      },
      {
        "line": 21,
        "count": 1,
        "originalLiteralHash": "87ae41da12f4b16487174e827b78eea7dd48d3debfb3f8b7e75994c6107bd62a",
        "newLiteralHash": "a9831fa797f78bd5297d5fc13e6d7c45c3e96f99872962874c76d289997242ad"
      },
      {
        "line": 22,
        "count": 1,
        "originalLiteralHash": "c1a95f26152451215c8bf41bee36e8cfd676614645d6f7fc733ec125090a375f",
        "newLiteralHash": "19687d55f38ed4c09ea473548132504d48e9af9862a247c5c5865b2f440f2696"
      },
      {
        "line": 29,
        "count": 1,
        "originalLiteralHash": "4c96069a903e2d72abec7016a686e46ac801e52a20b18be7b2739b25aeb34ee0",
        "newLiteralHash": "e000561266ed504963c0cb5a47dbba143442c2cc08217cfa8493544e541dfefe"
      }
    ]
  }
]
```

Registro de publicación y árbol: se añadirá después del primer commit/readback, antes de STOP_WRITES. El hash de este mismo informe y el tip final se entregan externamente para evitar una autorreferencia imposible.


## Recibo de preparación publicado / ledger final

Primer commit: `1935584b2e7b188b29151d8a4d2903aa147c85d9`, padre exacto f5, árbol `dbe6d58d79146643110a48ff54c19b01b3ff278b`. Publicado por CAS expected=f5, force=false, y ref leído de nuevo en ese mismo SHA.

Blobs C1 leídos por commit inmutable y contenido comparado:
- workflow `0f004c70976f5e4e64c1e554c0ebfad8039b9921`;
- helper `ffb470aff1e2f3d79a745e470e82a2384b88f295`;
- informe inicial `6ca7120b056ec5dbf14019c4362d9fed1b55c7ae`.

Árbol recursivo C1 no truncado: 3191 blobs = 3188 base protegidos + tres altas exactas; cero blob/modo base cambiados y ninguna eliminación. Tras publicar C1, Actions API de la rama volvió a devolver `total_count:0, workflow_runs:[]`.

Este apéndice constituye un segundo commit documental sólo dentro del tercer path permitido. Workflow/helper quedan con los mismos blobs C1. Se comprobarán nuevamente ref, árbol completo, tres contenidos y cero runs; el tip/árbol/hash de este informe se entregan en el contrato externo a Root para evitar autorreferencia. No nuevas pruebas ni ejecuciones para redactarlo.

Self-review final del autor: ninguna reparación de producto; A/B comparten seams y cambios de seguridad; los dos false permanecen; Source/test f5 y workflow real se distinguen; no hubo helpers/reviewer/subagentes ni contactos con el writer de Source. Root conserva la revisión independiente y decisión de ejecución. No se declara que el harness esté cualificado por esta inspección estática.

**STOP_WRITES al cerrar el readback de este apéndice. Cero jobs despachados. Preparación terminada; ejecución y cualificación pendientes.**


## ORD-1 — formal fix round 1/5 (preparación, sin ejecución cloud)

FIX_BASE `f143b866840a6d862ad63c4691c0700fa03b14e5`, árbol `74dd2255bbe224c199b7ed23fce26fe915177cf0`. Nuevo brief Rootdocs `ef331c59a7ace7bbac9514b5b51461ca2f4ab027`, blob `1459c7e459472d6bb15bf6ace9e163d637a2a9f7`. Reapertura autorizada exclusivamente para este finding Important; sin Critical/Minor, cleanup o refactor.

Finding confirmado: el regex de tuples captura modo m[1], SHA m[2] y ruta m[3], pero tres referencias usaban m[4], causando TypeError en todo registro válido. Se sustituyen exactamente esas tres referencias por m[3]. Regex, validaciones, default y todas las demás líneas del helper permanecen idénticos. Base helper `ffb470aff1e2f3d79a745e470e82a2384b88f295`; base informe `21d6d7ef66c43ac3e260f36ef2469e342ee8852d`. Este apartado se añade al final sin modificar ningún byte del informe anterior.

Prueba cubriente permitida: herramienta existente `mcp__node_repl__js`, builtin `node:vm`. Se extrajo solamente la línea `function tuples(...)` del helper fijado; no se importó ni ejecutó el helper. Cada llamada fue exactamente:
```js
vm.runInNewContext(rejectSource + extractedTuples + ';tuples(raw)', {raw}, {timeout:100})
```
`rejectSource` define únicamente reject() que lanza un Error de mensaje fijo sintético. Los inputs fueron strings inertes NUL-delimited de git ls-tree; SHA sintético: cuarenta letras a. RED utilizó la función vieja con `100644 blob <sha>\\ttest/example.mjs\\0`: TypeError observado. GREEN utilizó la corregida y comparó modo/SHA/ruta exactos para rutas normal y con espacios; los otros cinco casos conservaron el rechazo sintético Error: registro malformado, ruta absoluta, segmento .., registro tree/no blob y registro sin campos de ruta. No se registraron stacks, objetos de error, mensajes privados ni datos del proyecto.

Resultado observado:
```json
{
  "causalRED": {
    "case": "normal",
    "errorName": "TypeError",
    "observed": true
  },
  "GREEN": {
    "passed": 7,
    "total": 7,
    "cases": [
      {
        "case": "normal",
        "pass": true,
        "errorName": null
      },
      {
        "case": "space",
        "pass": true,
        "errorName": null
      },
      {
        "case": "malformed",
        "pass": true,
        "errorName": "Error"
      },
      {
        "case": "leading_slash",
        "pass": true,
        "errorName": "Error"
      },
      {
        "case": "parent_traversal",
        "pass": true,
        "errorName": "Error"
      },
      {
        "case": "nonblob",
        "pass": true,
        "errorName": "Error"
      },
      {
        "case": "missing_record_fields",
        "pass": true,
        "errorName": "Error"
      }
    ]
  },
  "maximumVMTimeoutMs": 100,
  "inertRecordInvocations": 8,
  "fullHelperExecuted": false,
  "projectImports": false
}
```

Excepción local mínima expresa del brief: ocho invocaciones de registros inertes (RED 1 + GREEN 7), menos de diez; máximo 100 ms por VM y timeout del tool 1000 ms. Trabajo sólo en RAM, sin filesystem, red, child_process, instalación, dependencias ni imports del proyecto. Es evidencia causal del parser de metadatos, NO cualificación cloud/Node22 del harness. Ningún A/B, build, suite o test de proyecto ejecutado.

Comprobación independiente del texto: exactamente tres cambios m[4]→m[3] dentro de tuples; al invertir esa única línea se recupera byte a byte el helper base. El informe conserva íntegro el prefijo base. El commit sólo puede cambiar helper e informe; se comprobarán los otros 3189 blobs/modos íntegros y árbol total 3191, ref/CAS y cero runs. Workflow debe conservar blob exacto `0f004c70976f5e4e64c1e554c0ebfad8039b9921`, manual-only, dos false. Hashes/tip finales se entregan externamente, sin autorreferencia.

No otra conclusión nueva sobre las 36 fallas. El mismo reviewer de Root debe hacer re-review scoped FIX_BASE..FIX_HEAD del finding y cualquier regresión nueva antes de un probe. Cero jobs autorizados/despachados por este fix. Tras los readbacks finales: **STOP_WRITES**. `operationalReadiness=false; completePackage=false; PCoff=false`.


## ORD-1 — único probe cloud consumido y cierre inactivo (2026-11-12)

Release de Root leído en `64265ea857d2394c35ec8b8652c6c6c4d5e26734`, brief `c4b781226f99b36173277a2182dc987ae8fceb04`, después de re-review limpio del mismo reviewer (Root preservó `25869c66`). No se interpreta como autorización para reparar producto o repetir el ensayo.

### Fuentes y ejecución primaria

BASE `174eb0dc0dca90f3b274c8ccd191c3a2b36f6ccc` / árbol `a7ef8bd03ebb1095af56f4716293493622917177`, 3191 blobs. Activación única mediante CAS expected=BASE, force=false:
- head `a0c9cbe079a30924b0715ac45582c7d3469d1d05`;
- árbol `84162e5313d02e931adcae6ec384ab4222d12e62`;
- workflow activo `9637cae1b478a723d171bb19e34bfa84b95b5654`.

Sólo cambió ese workflow: nombre, trigger push limitado a esta rama y su único path, y dos guards. Normalización inversa recuperó exactamente el body inactivo `0f004c70976f5e4e64c1e554c0ebfad8039b9921`; 3190 otros blobs/modos intactos. La rama quedó congelada hasta terminar ambos jobs y los readbacks de artefactos. No se escribieron informes durante el run.

[Run único 43159614775/attempt 1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43159614775): push, head real exacto de activación, creado 05:10:43Z, completado 05:11:24Z, conclusión success. A job `130987429700`: 05:10:45–05:11:07Z; step del brazo 05:11:01–05:11:03Z. B job `130987429449`: 05:10:45–05:11:23Z; step del brazo 05:11:13–05:11:17Z. Ambos jobs terminales success.

Helper INMUTABLE `ee4bbaa44edf02c10224e4e6085baa6a8e40a0bd`, SHA256 de contenido `9ad32cf208595677cf84cbd045a6d0206777068ce2960d91d3e3e14c35603df8`, comprobado independientemente y coincidente en ambos artefactos. Workflow source/checkout reales a0c9; testSource f5f52660d19ec9fc634bbc49558db75582fdaf88; Node real reportado `v22.23.4`; runner configurado Ubuntu24.04; grupo UNSET. Child MODELED_STERILE_SYNTHETIC conserva esa etiqueta y no representa admisión real. Los cinco overlays y sus hashes/ocurrencias son exactamente iguales A/B; entry instrumentado también idéntico y normalizable. Subject: 3188 blobs, inventario before=after en ambos brazos `c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7`.

### Resultado observado y alcance causal

| Archivo | A fallos | B fallos |
|---|---:|---:|
| mcp-own-finite-entrypoints | 2 | 2 |
| mcp-qa-cloud-native-cli | 12 | 0 |
| mcp-qa-finite-adoption-wait | 20 | 20 |
| mcp-qa-finite-command | 2 | 2 |
| Total | 36 | 24 |

A: **109 tests / 73 pass / 36 fail**; reprodujo el baseline exigido. B: **109 / 85 / 24**; recuperó exactamente las 12 fallas nativas previstas, sin recuperar ni introducir otras. Sin cancelados, skips o todo. Ambos hijos finalizaron exit 1 porque quedan tests rojos; el job verde acredita la completitud diagnóstica, no una suite verde.

Artefacto wrapper real construido en A y B: **63840 bytes**, SHA256 `198d1675b8b680bb759336ef37a73bae248192597a425a299a199dd3cb692e4b`. Pin productivo fijado: 48388 bytes / `5b06e2012d906269b6ad829f666d3d01fd197f6b4ea90f04bb6591dad4d18953`. Ambos booleans de igualdad false. A: controllerInvoked=0, 32 entradas artifact_load y 32 rechazos. B: controllerInvoked=12, 12 entradas controller y 11 settlement; permanecen los rechazos esperados por tests negativos. Los 12 tests antes fallidos pasan al sustituir exclusivamente valores esperados del pin dentro del VM sintético.

**Veredicto acotado:** evidencia causal a favor del desajuste entre el artefacto actual y la expectativa del pin como causa próxima de esas 12 fallas del CLI sintético bajo f5/Node22/este setup. No prueba que deba repinearse producción, que el artefacto actual esté cualificado para publicarse, ni que haya un defecto productivo. No se modificó pin/validator de producción, helper o Source. Elegir una reparación futura requiere decisión separada de Root.

Own: build completó dos veces y la importación falló dos veces, hash `9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff` idéntico al previo; ahora la frontera import está observada, pero no la causa exacta ni un defecto en guards. Adoption20/command2: fallo dentro de fixture, hash `a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e`; no aparece marker site4/build del HTTP helper. La investigación no llega a esa frontera y no demuestra un defecto del algoritmo de adopción.

El reporter actual cuenta 36/24 eventos de tests fallidos y wrapperFailed=0. La matriz anterior contenía 40 eventos incluyendo cuatro wrappers de archivo: no se presenta este reporter como reproducción de esos cuatro wrappers. Los conteos de tests y hashes de las 36 fallas de A sí coinciden. Las posiciones nativas del overlay llevan +4 líneas frente al original por las inserciones; el texto es normalizable y no se confunden esas posiciones con líneas originales.

### Privacidad, plazos y artefactos independientes

En cada brazo: control del padre pass=true; cuatro controles hijos pass=true, stackReads=0, oversizeSuppressed=true; networkDenied=0, errorOverflow=0, termination=null. Esto acredita controles observados y ausencia de intentos registrados en esta ejecución, no cobertura universal del fence. Los límites de timeout/kill no se activaron; no se declara probado un timeout real. Los steps de 2/4 s quedaron dentro de child110s/+5, comando120s/+5 y job7min.

JSON result A 25641B / B 21531B, ambos menores de 64KiB. Los logs privados NO se recuperaron ni subieron. Sólo sus metadatos: stdout A11591B/hash `4d81e148f3654e1ccf49bf6717ea12422f68aaf40227e451b425f98af743e7ba`, B8961B/hash `fe55e9edf7b91e60d4da2d95ab796c0224532b3867d37b3ebf9d1e9c412ebb1e`; stderr cero bytes en ambos. No se imprimieron stacks, raw stdout/stderr, bundles o URLs firmadas. No hubo llamadas de negocio, credenciales, CF, instalaciones/builds/proyecto locales o recursos ajenos.

Inventario primario de artefactos del run: exactamente dos, no expirados, ambos con source/head/run/branch exactos y retención siete días:
- A `13916689128`, nombre `afw-ord1-A-43159614775-1`, ZIP4831B, digest `0c846dfe8ec966fb7480cc2fc5ab4938c12a7f85345877652bf677d6e235a563`; creado05:11:04Z, expira2026-11-19T05:11:04Z.
- B `13916993516`, nombre `afw-ord1-B-43159614775-1`, ZIP4638B, digest `95ac3ec875a29c3c295b0839f187a18111574192da19f0066e7eecda0ed3747d`; creado05:11:18Z, expira2026-11-19T05:11:17Z.

Primera lectura del listado:434ms. GET individual de metadata por github_fetch NO soportado por la allowlist del connector: A282ms/B172ms; sin repetir esas llamadas. Se conserva esa limitación: la metadata exacta procede del listado primario. La herramienta dedicada de descarga recibió cada ID fijo UNA sola vez: A1557ms/B1571ms, exitosas; no expone opción de timeout, por lo que son tiempos medidos, no deadline garantizado de 5s.

Excepción RAM pública y acotada autorizada: se leyó UNA vez cada file reference devuelta por esa descarga, nunca otra descarga GitHub. fetch con AbortSignal.timeout(5000), redirect:error: A257ms/B168ms. ZIP y expansión se limitaron a 256KiB sin escribir/extractar a disco, instalar o ejecutar. ZIPs comprimidos4831/4638B y expansión26526/22416B. Exactamente result.json + manifest.json, directorio/local headers, CRC32, digest ZIP contra metadata primaria y bytes/SHA256 del result contra manifiesto verificados. Ninguna URL temporal se incluyó en chat/informe/Git. Wall-clock inicial de esas llamadas no se conservó por separado; las latencias son medidas, no tiempos inferidos.

A result SHA256 `9aa92e6ed99582b2a3dfbcc913c45c989cd0f463c535a6548c5c563d198e3bde`; manifest885B / SHA256 `a86e25111a4fcca90d04095d7c23d8e3e6e6a8c11be113da0520e044ecba036e`.
B result SHA256 `e8f7e7a8f9ca488f5c9a0bc05279938a4a68cd6b67cfcb6cfc43e17fc3216060`; manifest885B / SHA256 `88e3d24da56ccf29dd7e860611dde34ce590f2ac3c4e39c99a2e7f5f3667bf23`.

### Evidencia segura condensada

```json
[
  {
    "id": 13916689128,
    "arm": "A",
    "status": "diagnostic_complete",
    "summary": {
      "tests": 109,
      "pass": 73,
      "fail": 36,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    },
    "testEvents": {
      "passed": 73,
      "failed": 36,
      "wrapperFailed": 0
    },
    "baselineMatches": true,
    "controllerInvoked": 0,
    "boundaries": {
      "0:build:enter": 2,
      "0:build:return": 2,
      "0:import:enter": 2,
      "0:import:throw": 2,
      "1:build:enter": 71,
      "1:build:return": 71,
      "1:artifact_load:enter": 32,
      "1:artifact_load:throw": 32,
      "2:fixture:enter": 20,
      "2:fixture:throw": 20,
      "3:fixture:enter": 2,
      "3:fixture:throw": 2
    },
    "nativeResults": {
      "0:1:1": 40,
      "0:1:0": 29,
      "0:0:1": 1
    },
    "currentWrapper": [
      {
        "bytes": 63840,
        "sha256": "198d1675b8b680bb759336ef37a73bae248192597a425a299a199dd3cb692e4b",
        "bytesEqual": false,
        "hashEqual": false
      }
    ],
    "pinModels": [
      {
        "arm": "A",
        "sourceHash": "98e41e137f400867e7c9b175f8ad4f069c8bb406c55bfe520070daa1a55fc03d",
        "productionPinUnchanged": true,
        "modeled": false
      }
    ],
    "loadedEntry": {
      "originalHash": "011391848605867b437270e6c940b238c2b20df3907cda217276cfecd0f64d5f",
      "newHash": "a9892370102f6047fa458eb9ba12a18dbbc2f52fa116123929442d94a0720fb3",
      "normalized": true,
      "occurrences": [
        1,
        1,
        1,
        1
      ]
    },
    "privacy": {
      "pass": true,
      "stackReads": 0,
      "oversizeSuppressed": true
    },
    "privacyControls": [
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      },
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      },
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      },
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      }
    ],
    "networkDenied": 0,
    "errorOverflow": 0,
    "termination": null,
    "exit": {
      "code": 1,
      "signal": null,
      "spawnFailed": false
    },
    "protectedBase": {
      "leaves": 3188,
      "before": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
      "after": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
      "equal": true
    },
    "zipBytes": 4831,
    "zipSHA256": "0c846dfe8ec966fb7480cc2fc5ab4938c12a7f85345877652bf677d6e235a563",
    "expandedBytes": 26526,
    "files": {
      "result.json": {
        "bytes": 25641,
        "sha256": "9aa92e6ed99582b2a3dfbcc913c45c989cd0f463c535a6548c5c563d198e3bde"
      },
      "manifest.json": {
        "bytes": 885,
        "sha256": "a86e25111a4fcca90d04095d7c23d8e3e6e6a8c11be113da0520e044ecba036e"
      }
    },
    "manifestMatches": true,
    "firstFetchMs": 257,
    "enforcedFetchDeadlineMs": 5000
  },
  {
    "id": 13916993516,
    "arm": "B",
    "status": "diagnostic_complete",
    "summary": {
      "tests": 109,
      "pass": 85,
      "fail": 24,
      "cancelled": 0,
      "skipped": 0,
      "todo": 0
    },
    "testEvents": {
      "passed": 85,
      "failed": 24,
      "wrapperFailed": 0
    },
    "baselineMatches": false,
    "controllerInvoked": 12,
    "boundaries": {
      "0:build:enter": 2,
      "0:build:return": 2,
      "0:import:enter": 2,
      "0:import:throw": 2,
      "1:build:enter": 71,
      "1:build:return": 71,
      "1:artifact_load:enter": 32,
      "1:controller:enter": 12,
      "1:settlement:enter": 11,
      "1:artifact_load:throw": 20,
      "1:controller:throw": 1,
      "1:settlement:throw": 5,
      "2:fixture:enter": 20,
      "2:fixture:throw": 20,
      "3:fixture:enter": 2,
      "3:fixture:throw": 2
    },
    "nativeResults": {
      "1:0:1": 3,
      "1:1:1": 8,
      "0:1:1": 29,
      "1:1:0": 1,
      "0:0:1": 1,
      "0:1:0": 28
    },
    "currentWrapper": [
      {
        "bytes": 63840,
        "sha256": "198d1675b8b680bb759336ef37a73bae248192597a425a299a199dd3cb692e4b",
        "bytesEqual": false,
        "hashEqual": false
      }
    ],
    "pinModels": [
      {
        "arm": "B",
        "sourceHash": "80479852412fcfd8a02e20152c2ad15768467ab5ef7cf1d3a7446bfc92ab777e",
        "productionPinUnchanged": true,
        "modeled": true
      }
    ],
    "loadedEntry": {
      "originalHash": "011391848605867b437270e6c940b238c2b20df3907cda217276cfecd0f64d5f",
      "newHash": "a9892370102f6047fa458eb9ba12a18dbbc2f52fa116123929442d94a0720fb3",
      "normalized": true,
      "occurrences": [
        1,
        1,
        1,
        1
      ]
    },
    "privacy": {
      "pass": true,
      "stackReads": 0,
      "oversizeSuppressed": true
    },
    "privacyControls": [
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      },
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      },
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      },
      {
        "pass": true,
        "stackReads": 0,
        "oversizeSuppressed": true
      }
    ],
    "networkDenied": 0,
    "errorOverflow": 0,
    "termination": null,
    "exit": {
      "code": 1,
      "signal": null,
      "spawnFailed": false
    },
    "protectedBase": {
      "leaves": 3188,
      "before": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
      "after": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
      "equal": true
    },
    "zipBytes": 4638,
    "zipSHA256": "95ac3ec875a29c3c295b0839f187a18111574192da19f0066e7eecda0ed3747d",
    "expandedBytes": 22416,
    "files": {
      "result.json": {
        "bytes": 21531,
        "sha256": "e8f7e7a8f9ca488f5c9a0bc05279938a4a68cd6b67cfcb6cfc43e17fc3216060"
      },
      "manifest.json": {
        "bytes": 885,
        "sha256": "88e3d24da56ccf29dd7e860611dde34ce590f2ac3c4e39c99a2e7f5f3667bf23"
      }
    },
    "manifestMatches": true,
    "firstFetchMs": 168,
    "enforcedFetchDeadlineMs": 5000
  }
]
```

### Cierre y límites

Antes de cleanup: head seguía a0c9, un único run en esta rama, ambos jobs terminales, dos artefactos y sus readbacks realizados; el head del diagnóstico siguió congelado durante toda la ventana. Se restaura el workflow por referencia al blob EXACTO inactivo `0f004c70976f5e4e64c1e554c0ebfad8039b9921` y se añade únicamente este apartado al informe base `bdd56d50a21f82a572184f90ef963769481798da`. El helper ee4b permanece protegido. Se verificará árbol completo/CAS/ref/prefijo del informe y cero jobs activos; tip/árbol/blob de este cierre se entregan externamente sin autorreferencia.

Ensayo CONSUMIDO, sin redispatch/rerun/retry/replacement. Ningún producto reparado. Quedan 24 fallas y su causa exacta pendiente; los tres casos nativos pendientes del antiguo comando725 y la integración ORD-1 no se cualifican aquí. No se afirma PC apagada, disponibilidad operativa ni paquete completo. Root debe reconciliar evidencia primaria y decidir el siguiente bloque.

**STOP_WRITES tras readback del cierre.** `operationalReadiness=false; completePackage=false; PCoff=false`.
