# AFW: preparación inactiva de dos fronteras de fallo — 12 noviembre 2026

Estado: PREPARADO INACTIVO; cero ejecuciones de Actions en esta rama antes de preparar. No se ejecutó helper, proyecto, build, test, instalación ni sonda. operationalReadiness=false; completePackage=false; PCoff=false. STOP_WRITES al entregar el contrato externo con las comprobaciones remotas finales. La revisión fresca y cualquier ejecución corresponden a Root mediante una liberación separada.

## Alcance y procedencia

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (público, id 1347578006); ENVIRONMENT=diagnóstico sintético inactivo en GitHub; ORIGIN=GitHub connector; RESOURCE_TYPE=git branch/tree/blob; RESOURCE_ID=diag/afw-failure-boundaries-20261112; ALLOWED_ACTION=añadir exactamente los tres archivos indicados en esta rama. El owner mantiene autorización autónoma cloud para esta preparación; la decisión técnica de Root no se presenta como nueva aprobación humana.

Base inmutable: f5f52660d19ec9fc634bbc49558db75582fdaf88, árbol 7bc8b997a968dca32fc567b627de70b774d6489c; lectura recursiva completa no truncada: 3188 blobs. Root creó esta rama tras búsqueda vacía y readback; el implementador verificó nuevamente que apuntaba exactamente a f5 antes de trabajar. package.json=f4fd38ac380c46a149d8cf0f3bd828a28406f761; package-lock.json=36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b. SourceNative, main, Rootdocs y la rama ORD previa permanecen fuera del alcance.

Requisitos leídos por orden en ea9268a3ff3c21735deab86037a7e6dab0ae6c92:

- Brief docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-preparation.md; blob fa1fb47e7f96f07d85da02fc03dc9ae54ca899df.
- Spec docs/superpowers/specs/2026-11-12-ordinary-failure-boundaries-design.md; blob acd53f8bf5cd4a572ef2906ce9b20dd96dc72059.
- Plan docs/superpowers/plans/2026-11-12-ordinary-failure-boundaries.md; blob 6cc77354b75186f3217fc9354bb0e8b4165df7e1.
- AGENTS.md de f5, blob b67942223e5633011573f2a2165489afd9ff3f67; lectura para esta tarea AFW, sin operaciones Hermes.
- Referencia de patrones de custodia/observación únicamente: scripts/diagnostics/ordinary-fourfile.mjs @174eb0dc0dca90f3b274c8ccd191c3a2b36f6ccc, blob ee4bbaa44edf02c10224e4e6085baa6a8e40a0bd. No se copiaron pin B ni los casos CLI.

Tres únicos archivos nuevos, todos modo Git 100644:

| Ruta | Bytes UTF-8 | Git blob | SHA-256 |
| --- | ---: | --- | --- |
| scripts/diagnostics/ordinary-failure-boundaries.mjs | 25584 | 67ac2f192c767b56b356a41ee6e9db6e1601fe53 | 7687d91c990fbd438c963367b5afb6375d49dbb28f22a16f437c575f6114635b |
| .github/workflows/afw-ordinary-failure-boundaries.yml | 4732 | c082ab9bacc8b3cf975fa611aebd95edcf144fd0 | 5eafd022655c8122de813ed3b3ffe57ce6566f0bc23050ccc5a1c28045ac7e5a |
| docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md | contrato externo | contrato externo | contrato externo |

El propio blob/commit/árbol final de este informe se entrega en el contrato externo: incluir sus hashes finales en su propio contenido produciría una referencia circular. No se crearán commits adicionales para intentar cerrar esa circularidad.

## Pregunta y selección fija

La observación histórica 43159614775/f5 tuvo A109/73/36 y B109/85/24. Doce casos CLI se recuperaron sólo bajo pin sintético B; eso no autoriza cambiar el pin productivo. Las dos familias restantes no tienen causa proximal exacta establecida: own falla al importar después de build y adoption falla antes del build HTTP. Los campos antiguos name/code NULL no descartan un Error con nombre heredado.

El futuro helper admite cero argumentos y selecciona sólo estos dos archivos/nombres:

1. test/mcp-own-finite-entrypoints.test.mjs — compiled finite receiver denies legacy delivery before every host capability.
2. test/mcp-qa-finite-adoption-wait.test.mjs — actual CLI waits for attended observer until 50s after successful primary seed; GET only.

Node recibe una alternancia escapada y anclada ^(?:...|...)$ mediante --test-name-pattern. La expectativa pendiente de comprobar es 22 tests registrados, 2 seleccionados fallidos y 20 filtrados; wrappers y fallos seleccionados se cuentan por separado. El resultado conserva los conteos observados aunque difieran y marca incomplete. No equivale a la suite de 109 ni prueba los 24 fallos restantes.

Hashes de mensaje de referencia a reproducir: own=9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff; adoption=a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e. Sin coincidencia no se admite conclusión comparativa.

## Observación pasiva y privacidad

Se prepara util.types.isNativeError para la marca nativa booleana. Referencia oficial Node 22: https://nodejs.org/download/release/v22.17.0/docs/api/util.html#utiltypesisnativeerrorvalue . Esta referencia no acredita ejecución en Node 22.23.4.

Sólo con marca positiva se observa identidad del prototipo inmediato frente a los ocho prototipos actuales Error/TypeError/SyntaxError/ReferenceError/RangeError/EvalError/URIError/AggregateError. Un Error de otro realm puede mantener currentRealmPrototype=null y observedDataPrototypeName=TypeError a profundidad 1..4; la observación declara prototypeObservationIsExactIntrinsicClass=false. Marca negativa no recorre prototipos. Los getters nunca se llaman: se leen descriptores propios de datos; proxies se rechazan para esa observación. No se usa Error.prototype.toString, Object.prototype.toString, constructor ni stack.

name/code mantienen enums cerrados; mensajes propios de datos sólo dan SHA-256 si longitud y bytes son <=1 MiB, en caso contrario NULL+messageTooLarge. Sólo se sigue cause propia de datos, máximo tres enlaces, cortando ciclos; causeDepth=0..3. La salida no incluye mensajes/stack/dataURL/actual/expected/cuerpos de bundles. Observación y serialización atrapadas no reemplazan la excepción original.

Las envolturas sin await devuelven el mismo valor/Promise; Reflect.apply conserva this y argumentos. Métodos ctl/store usan un wrapper que captura el receptor y obtiene el método antes de evaluar argumentos, conservando el orden original. Una rama de Promise observa retorno/rechazo sin envolver el valor devuelto. No se sustituyen algoritmos, relojes, fixture clocks, plan, pin ni producto. La instrumentación sólo existe en una copia temporal cloud; el checkout sujeto f5 conserva bytes/modos.

Controles preparados, NO EJECUTADOS: TypeError ordinario y cross-realm; objeto que falsifica TypeError.prototype; getters arrojadores de stack/code/name/tag/cause (touches esperado cero); mensaje sobredimensionado; causa cíclica; canary privado ausente de la salida. Controles en padre y dos procesos de test. También se comprueban identidad del receptor, Promise y excepción con una llamada sintética; los controles no emiten ninguna de las 16 etapas de fixtures; sólo su recibo identity_control, separado del contador de tests. Todos deberán pasar en el futuro; la sintaxis no los acredita.

Hay exactamente 16 etapas cerradas: own_build, own_import, cf_fixture, cf_finalizer, final_restore, final_project, rest_init, rest_control, rest_prepare, rest_proof, rest_capture, rest_read, rest_claim, trial_generation, http_build, http_import. No se añadió instrumentación a qa-generation-ledger ni finite-cleanup-proof. finite-http-module sólo emitirá marcas si las llamadas originales se alcanzan.

## Literales y normalización comprobados en RAM

Se compararon conteos exactos de cada literal sobre los blobs f5 y se revirtieron todas las sustituciones en orden inverso; los siete contenidos normalizados fueron idénticos al original. Los siete overlays se analizaron como gramática ECMAScript sin evaluación, importación o ejecución. Los hashes y conteos siguientes son de esa preparación estática, no de un build ni de una prueba:

### test/mcp-own-finite-entrypoints.test.mjs

Git blob original: 674419ca51328b128bba483f44001e12f1e4b9f5. SHA-256 original=fc7de7a7e5c5c641800e67d812f426a67d2e6d947df342eb5d06c26d772b36b5; overlay=ff61d611d2341532f3e9de50c19e9e963116a3510a3c02faf3acea08bb76d879; normalización exacta=true.

```json
[
  {
    "from": "await build(",
    "to": "await globalThis.__afbWrap('own_build',build)(",
    "count": 1,
    "fromHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
    "toHash": "0720f56b5c5cd0f7d78853bd4e94e33dfb59dea110cd865895e4d619c4bfbd63"
  },
  {
    "from": "return import(",
    "to": "return globalThis.__afbWrap('own_import',specifier=>import(specifier))(",
    "count": 1,
    "fromHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
    "toHash": "46d799063b1badc4b6ad4166183908dfa3938d69be3423825c0a92cc8c5db438"
  }
]
```

### test/mcp-qa-finite-adoption-wait.test.mjs

Git blob original: e8e1e18b3cdf8908fe976823f9a15e1f5f0cdd55. SHA-256 original=d2ca0aa07bb989985d5262aeaf3c5964f20167da4b9c39a0b21975c9f1178226; overlay=770d986196a64bcf009c4420eaafb73143f45d529c446f56747b60e436fdfeaa; normalización exacta=true.

```json
[
  {
    "from": "await cfFiniteFixture(",
    "to": "await globalThis.__afbWrap('cf_fixture',cfFiniteFixture)(",
    "count": 1,
    "fromHash": "afee59eab4a21b0a272448eb4c9252dfda5ff713998094e1477c96ddeb0767ec",
    "toHash": "bb695cac8e8625a9d0642f805450b0ec4a67b3d80475ab8267a0da8b94890792"
  }
]
```

### test/fixtures/finite-cf-http.mjs

Git blob original: b0897d389ef3c1a0f057422ffc332e3e024d3a93. SHA-256 original=d98bf19e307d9a1cc137f3e36ee3869426cb56be0e623fe916cbc88ab253d02a; overlay=af1fb0dc7e44fd0bd142e501f23ffdc89d39c77b5eb366307155c916cda50650; normalización exacta=true.

```json
[
  {
    "from": "await finiteFinalizerFixture(",
    "to": "await globalThis.__afbWrap('cf_finalizer',finiteFinalizerFixture)(",
    "count": 1,
    "fromHash": "0f5844a6a2bdad04e57281c66bff40f4e9a1808948428365113dec0b408e1c22",
    "toHash": "aa29a11e9ff09401459a31995814e509440aa5b705a57f335e90ce28fa5d7a21"
  }
]
```

### test/fixtures/finite-finalizer.mjs

Git blob original: d3b254e9a21fc816ef6520bdff0f4abafe34f6ea. SHA-256 original=f8a4121aea13399f9187330ed7d8545797f2e4cb3f50370c14e990ea495da4ac; overlay=ca7a009b39a325cbcc77c350a9ab35fb8f195bce0d8bb6850be1591d6202f28d; normalización exacta=true.

```json
[
  {
    "from": "await finiteRestorationFixture(",
    "to": "await globalThis.__afbWrap('final_restore',finiteRestorationFixture)(",
    "count": 1,
    "fromHash": "01c99e748cd51dc60091e77660395792a6fbb56c635a89ac8f5f1660c31698d8",
    "toHash": "f53046c288825c43f871a39975ae8f1b87512605e1dafc3bef51a0a0596e7bca"
  },
  {
    "from": "v=projectPrivateQaFiniteReferences(identity)",
    "to": "v=globalThis.__afbWrap('final_project',projectPrivateQaFiniteReferences)(identity)",
    "count": 1,
    "fromHash": "515c51cbdc1a6e88210e0cb4a4c08eab7de396174a15ba4e400a2fb9fb49901e",
    "toHash": "5004796835e0522f241a330919e6ea905662f4e3bb130646263261acbc831945"
  }
]
```

### test/fixtures/finite-restoration.mjs

Git blob original: ad53cfeca0b6c94b3e062bcb50e0a4644a667b31. SHA-256 original=9343d3065c094a5a265bd30b3eaeb84e96dbc77ea1be62e227e94ada4f6e555d; overlay=a6d612d3d340c293304badf4219b59716eb19a3ef3223efa175dc16ec4803c4f; normalización exacta=true.

```json
[
  {
    "from": "f=finiteFixture({at})",
    "to": "f=globalThis.__afbWrap('rest_init',finiteFixture)({at})",
    "count": 1,
    "fromHash": "dcef066779a19fae94d596e716e611ef4cb29e8af455a9baeb35d4e6238bb54d",
    "toHash": "5c1a4777a4ac9a788a33eb1e6edb9f9427529ab40ca52c1548e80cb9d825d64e"
  },
  {
    "from": "ctl=controls.createPrivateQaFiniteTrialControl(f.options(controls))",
    "to": "ctl=globalThis.__afbMethod('rest_control',controls,'createPrivateQaFiniteTrialControl')(f.options(controls))",
    "count": 1,
    "fromHash": "bbcc9c212ca65be988fb4e7b451bf90018b2e471f81c99bb285a4f090ec468c1",
    "toHash": "8b2146b4b101b25cc92847fef08760d635ba0a3be56dd7aa2802b7b63852f18f"
  },
  {
    "from": "ctl.prepare()",
    "to": "globalThis.__afbMethod('rest_prepare',ctl,'prepare')()",
    "count": 1,
    "fromHash": "24b7485a8b50ba5d29ce2d34af58c10a166910061c460cd3907faa14b4f53a42",
    "toHash": "ac805c3f74f59a18f1b38377e4307314f3b05e46aa259166e7732c1ab576b2b6"
  },
  {
    "from": "proof=finiteProofFixture(",
    "to": "proof=globalThis.__afbWrap('rest_proof',finiteProofFixture)(",
    "count": 1,
    "fromHash": "7de15b9b29e407fed5f4d4e69ef3bbd4fe04127aafbe32a258d2598fc3248163",
    "toHash": "7cf7cffc2e9adb3a9a796223e0e9853d302b0f0c0fa253baee206443c270da41"
  },
  {
    "from": "await store.capture(",
    "to": "await globalThis.__afbMethod('rest_capture',store,'capture')(",
    "count": 1,
    "fromHash": "3d5600443aa99e6356e109ccdd5538e6911247c418b05fa4769f7adaa3b15f26",
    "toHash": "e859515656a0b75e2d36a29f41adae0a3ba089d0b2cca6a4706f177182207460"
  },
  {
    "from": "await store.read()",
    "to": "await globalThis.__afbMethod('rest_read',store,'read')()",
    "count": 2,
    "fromHash": "1ebf1311d2054edbc2cb7055f15281e66703371e4111dd7a6ea2aa177fdc347f",
    "toHash": "57444be5bb7788b9e74824528289889172969f0eb559c8d9a62fffa8808f6600"
  },
  {
    "from": "await ctl.claimEffect(",
    "to": "await globalThis.__afbMethod('rest_claim',ctl,'claimEffect')(",
    "count": 1,
    "fromHash": "e61ad1a9913415edf8f94607ad1d6f330b0c41e34ea7d4a834357039940db020",
    "toHash": "e7944b75fe97f1cd11f5efa29792c8c779761f5aba7622d338add004c8f5f4e5"
  }
]
```

### test/fixtures/qa-finite-trial.mjs

Git blob original: 8297a9ae39fd4bdd228a2b1f64105683cb768203. SHA-256 original=e0dfebbad066f848997200a719de4958d91edc6c906a0523a75f63221149175f; overlay=9eaf5bd589408a9dde6ecd0263e2e0a763443b13a36c603b35c83ad5ad111d7a; normalización exacta=true.

```json
[
  {
    "from": "old=generationFixture()",
    "to": "old=globalThis.__afbWrap('trial_generation',generationFixture)()",
    "count": 1,
    "fromHash": "ee377a72913e4dc9c886ce1c1c0f8f0adc7f4a1cf05a0c132e3562dfee96fd68",
    "toHash": "6d7db2c9d4d52fff00b185a09d726dcea93af386b26f7f7c779a4414c5d3a258"
  }
]
```

### test/fixtures/finite-http-module.mjs

Git blob original: cfbc564074d298cc333ddbb922ba7c19a96065fb. SHA-256 original=1de81a4238c5868590918b021ddd8071c1c90237982c8ea8cfdb83f01dbc7233; overlay=26e74ffb21986e628093fae1e8efbf276514c7344becacfafb0496e41a643538; normalización exacta=true.

```json
[
  {
    "from": "await build(",
    "to": "await globalThis.__afbWrap('http_build',build)(",
    "count": 2,
    "fromHash": "31c46533267e41af5b11002ecb21092a2ef545820f9eb344e71b2e5df30dfd82",
    "toHash": "d86f32c987c1bb2ef33a0e8fbdf0174ba60d5ff35e32a7851680b23a95917c80"
  },
  {
    "from": "return import(",
    "to": "return globalThis.__afbWrap('http_import',specifier=>import(specifier))(",
    "count": 2,
    "fromHash": "3e2b23e761707ac8785e5eb2c7492e98949f5b624aac6b2e9579288889dd0c4a",
    "toHash": "9db87377950d90b7c6b9dd05214d7ed6fe84dd5a57b30ce691852eda0d80a8b8"
  }
]
```

## Workflow y custodia futura

workflow_dispatch sin inputs, un job con literal false más gates de repositorio/rama/evento/attempt 1; Ubuntu 24.04, Node 22.23.4, permisos contents:read/actions:read, sin environment/secrets, concurrency cancel-in-progress=false. Checkout workflow=github.workflow_sha separado del sujeto f5 con historia completa; credenciales persistentes false. Sin matriz, schedule, push, dispatch propio ni retry.

Sólo después de nueva liberación Root: npm ci --ignore-scripts --no-audit --no-fund sobre lock f5; timeout --signal=TERM --kill-after=5s 120s node diagnostic-code/scripts/diagnostics/ordinary-failure-boundaries.mjs. El hijo tiene 110s+SIGKILL a 5s y grupo de procesos; el job limita siete minutos. Son límites codificados todavía sin prueba temporal. El helper verifica plataforma/version, fuente/rama/evento/attempt, árbol, los 3188 blobs/modos antes y después; las copias temporales cloud no alteran el sujeto.

El hijo recibe PATH, HOME/TMPDIR privados, LANG y los valores sintéticos AFB_CHILD/AFB_SUBJECT/GITHUB_SHA=f5; no hereda tokens, proveedor ni contexto real de GitHub. MODELED_STERILE_SYNTHETIC nunca concede autoridad. Fetch/sockets/http/https/tls están cerrados como en ORD-1; las peticiones de fixtures se resuelven por mocks fijos. No se prueba ninguna API real, Miniflare 900s, clave, permiso, runtime o Max.

Captura por streams, archivos nuevos 0600 en directorio privado 0700, límite TOTAL stdout+stderr de 8 MiB. Sólo salida del reporter cerrado se admite como evidencia y se reconstruye con esquema/enums fijos; stdout seguro limitado a 64 KiB. Nunca se imprimen errores privados ni se suben logs, bundle o directorio temporal. El resultado se conserva inicialmente y antes del hijo; error/setup/deadline deja incomplete o running_or_interrupted, sin ocultar el fallo. Si ocurre un SIGKILL fuera del manejador sólo se garantiza el recibo cerrado previamente escrito; no se afirma captura final de un proceso matado.

El workflow tiene fallback always(), limita result.json a 65536 bytes, vuelve a calcular manifest.json y sólo sube esos dos nombres durante siete días. Artefacto previsto afw-failure-boundaries-RUN-1; publica ID exacto+digest, sin URL firmada. Aún no existe run/artifact/ID/digest. Lectura independiente futura: metadata por ID dentro de presupuesto medido 2s y ZIP seguro <=256 KiB en RAM dentro de 5s si la herramienta lo permite; no descomprimir/ejecutar/instalar. La herramienta puede no imponer esos plazos: Root debe registrar enforced frente a measured y declarar incompleto ante falta de lectura. No es una cualificación de custodia ya realizada.

## Verificación de preparación y cierre remoto

Realizado: SourceTextModule analizó helper y siete overlays y el inline de fallback, sin evaluate/link/import del proyecto. PyYAML 6.0.3 ya disponible analizó el workflow y comprobó un job/literal false/manual sin inputs/read-only/attempt 1/siete minutos/sin environment o secrets/un upload. No se instalaron herramientas ni dependencias; no se creó proyecto, clon, proceso persistente o test local. Un payload RAM mayor de 64000 bytes fue rechazado automáticamente antes de ejecutar; se dividió en siete análisis pequeños, todos aceptados. Un fetch inicial de un nombre de workflow incorrecto devolvió 404; se consultó el directorio fijado y se leyó la referencia correcta; ninguna mutación afectada.

La comprobación Actions por rama exacta devolvió total_count=0 antes de escribir. CI existente sólo hace push a main o pull_request; no se abre PR, y el commit de preparación incluye [skip ci]. El nuevo workflow es sólo manual/inactivo. No se despacha workflow ni se habilita ninguna ejecución durante preparación.

Publicación preparada en Git Data: crear árbol con base exacta 7bc8b997a968dca32fc567b627de70b774d6489c y sólo las tres nuevas rutas; crear un commit con único padre f5; mover sólo diag/afw-failure-boundaries-20261112 mediante expected_sha=f5 y force=false. Ante rechazo CAS, no reintentar sin inspeccionar el ref. Corrección acotada posterior al primer commit preparado 421febef4da38ffefeab00cd6ec9a838ce3c7f00: los controles de identidad usaban inicialmente la etapa rest_control y podían aparentar una frontera de fixture no alcanzada. Se reemplazaron por etapa nula descartada antes de emitir; sólo queda el recibo identity_control. Se repitió la gramática estática y el commit corrector es fast-forward con padre 421febef, expected_sha exacto y force=false; todas las comprobaciones finales se repiten. No se ejecutaron controles o tests. El material de reversión son los 3188 blobs inmutables/base f5; esta entrega no autoriza reset/force/delete ni activar el job.

Criterio externo de entrega: readback independiente de ref, commit/padre, árbol completo no truncado (3191 blobs), los 3188 tuples path/mode/sha originales intactos y exactamente tres altas; lectura completa de los tres blobs y comparación byte por byte+hashes; nueva consulta de runs exacta cero. Los SHA reales del commit/árbol/informe y los resultados de estas comprobaciones quedan en el contrato externo posterior a este contenido. STOP_WRITES al concluir ese contrato, sin commits autorreferenciales.

Pendiente: revisión fresca Spec+Quality por Root; controles reales Node/selección/conteos/hashes/preservación/deadlines/artefacto; liberación explícita separada para un único job attempt 1, fuera de toda ventana nativa sensible. Si la frontera no resuelve causa, queda desconocida. No se arregló producto, cambió pin ni cualificó disponibilidad/paquete/PC apagado.


## Formal fix round 1/5 — observador detenido ante prototipos Proxy

Brief Root: docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-fix-round1.md @4df97da1cc2a7aa063c07e9d2aea6a633f227c72, blob 34eae6f12a17e3379c4e24dd718a02ee1211ce57. Un único Important, cero Critical/Minor. FIX_BASE=dee60034f5caf5087a4e2972d8dcaabee7c3fba1; árbol f71302b9498a82c6f1571d78b5b9df04c4a7aa1b; helper base 67ac2f192c767b56b356a41ee6e9db6e1601fe53; informe base c9fb23886a147a20e29773ac35808c059d8633b1. Esta sección se añade conservando exactamente todos los bytes del prefijo anterior.

Finding recibido, literal:

> **scripts/diagnostics/ordinary-failure-boundaries.mjs:140–143 — prototype traversal can execute Proxy traps.** A genuine native Error can have a Proxy anywhere in its prototype chain. own(p,'name') rejects the Proxy, but the following Object.getPrototypeOf(p) invokes its getPrototypeOf trap. That trap can mutate fixture state, perform other observation-visible work or throw; catching the exception does not reverse those effects. This violates the required passive observer and Proxy safety. Stop traversal when types.isProxy(p) is true, preserving unknown classification. Add a prepared control with a native Error whose prototype chain contains a Proxy, requiring zero trap touches.

Cambio mínimo: antes de own(p,'name') o de avanzar con Object.getPrototypeOf(p), el bucle ahora ejecuta if(types.isProxy(p))break;. La marca nativa se conserva; prototipo observado y clase permanecen desconocidos al llegar al Proxy. Se prepararon tres controles con Error nativo y Proxy directo, anidado y revocado, con contador de traps igual a cero. Se incorporan únicamente los campos cerrados proxyPrototypesSafe y proxyTrapTouches al recibo privacy_control existente y a su proyección cerrada. No hay nueva etapa ni llamada a __afbWrap/__afbMethod dentro de controls(), por lo que no se contaminan las 16 fronteras de fixtures.

No se cambian safeError(), los algoritmos de fixtures, clocks, invocaciones/receptores/Promises/excepciones originales, hashes de mensajes, reglas de datos propios, redacción o caps. Helper corregido: 26524 bytes UTF-8, Git blob f3a5a76407723657833255d697053c9ff2bfd0bc, SHA-256 4d94b9b469ed621f62c5eed2e65e63c5970216f336662ea7eefc852ee33a62f5. La tabla anterior conserva deliberadamente los hashes históricos de la preparación inicial; este es el pin nuevo de la corrección.

### Evidencia local acotada autorizada: RED → GREEN de metadata

Excepción del brief: sólo se evaluaron las funciones profile()/own(), constantes cerradas y la primitiva de hash en VM aislada con errores sintéticos inertes. Builtins disponibles node:vm, node:util y node:crypto; Buffer.byteLength se pasa como una única primitiva de longitud, sin acceso a archivos/proyecto/red/child_process/dependencias. No se importó ni evaluó el helper completo: new vm.SourceTextModule(fixedHelper) sólo comprobó su gramática.

hostNodeVersion=unavailable_from_node_repl. El sandbox node_repl oculta process y no expone node:process. Root aceptó expresamente esta limitación de procedencia y decidió no usar otro ejecutable ni shell para suplirla. No se atribuye la prueba a Node 22.23.4 ni a Ubuntu/Actions.

Cada contexto usó timeout:100 ms, impuesto por node:vm; los contextos completados retornaron sin timeout. No se midió duración fina de VM y no se presenta el tiempo del puente de herramientas como tiempo de clasificación. Hubo tres intentos de contexto: el primero hizo una sola invocación pero quedó incompleto por faltar Buffer en la VM y no emitió evidencia del contador; se repitió con la primitiva byteLength explícita. Conteo TOTAL, incluido ese intento incompleto: 9 invocaciones inertes (<10), distribuidas 1 incompleta +1 RED +7 GREEN. No se repitieron después las clasificaciones.

Comandos exactos de la herramienta node_repl, con los snippets literales preservados debajo:

```js
var vm = await import('node:vm');
var types = (await import('node:util')).types;
var crypto = await import('node:crypto');

// Intento inicial incompleto: faltó Buffer, sin resultado RED terminado.
var red = vm.runInNewContext(oldMetadataSnippet,{
 types,
 hash:value=>crypto.createHash('sha256').update(value).digest('hex')
},{timeout:100});

// RED observado, corrigiendo únicamente el sandbox.
var red = vm.runInNewContext(oldMetadataSnippet,{
 types,
 hash:value=>crypto.createHash('sha256').update(value).digest('hex'),
 Buffer:{byteLength:value=>Buffer.byteLength(value)}
},{timeout:100});

// GREEN, helper analizado pero no evaluado.
new vm.SourceTextModule(fixedHelper);
var green = vm.runInNewContext(greenMetadataSnippet,{
 types,
 hash:value=>crypto.createHash('sha256').update(value).digest('hex'),
 Buffer:{byteLength:value=>Buffer.byteLength(value)}
},{timeout:100});
```

oldMetadataSnippet exacto (los literales canary son entrada fija del código de prueba, nunca salida de error observada):

```js
const MAX_MESSAGE=1048576;
const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
const PROTOS=INTRINSICS.map(x=>x.prototype);
const CLASS_NAMES=NAMES.slice(0,8);
const own=(v,k)=>{try{if(types.isProxy(v))return undefined;const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};

function profile(error,depth){
 let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
 try{
  nativeError=types.isNativeError(error);
  if(nativeError){
   let p=Object.getPrototypeOf(error);
   const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
   for(let i=1;i<=4&&p;i++){
    const name=own(p,'name');
    if(CLASS_NAMES.includes(name)){observedDataPrototypeName=name;prototypeDepth=i;break;}
    p=Object.getPrototypeOf(p);
   }
  }
 }catch{}
 const m=own(error,'message'),c=own(error,'code'),n=own(error,'name');
 let messageHash=null,messageTooLarge=false;
 if(typeof m==='string'){messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;if(!messageTooLarge)messageHash=hash(m);}
 return {nativeError,currentRealmPrototype,observedDataPrototypeName,prototypeDepth,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge,depth};
}

let trapTouches=0;
const proxy=new Proxy({},{
 getPrototypeOf(){trapTouches++;return Error.prototype;},
 getOwnPropertyDescriptor(){trapTouches++;throw new Error('private trap');},
 get(){trapTouches++;throw new Error('private trap');}
});
const error=new Error('AFB_PRIVATE_VM_CANARY');
Object.setPrototypeOf(error,proxy);
const row=profile(error,0);
({case:'native_error_direct_proxy_old',nativeError:row.nativeError,proxyTrapTouches:trapTouches,observedUnknown:row.currentRealmPrototype===null&&row.observedDataPrototypeName===null,redObserved:row.nativeError===true&&trapTouches>0});

```

greenMetadataSnippet exacto:

```js
const MAX_MESSAGE=1048576;
const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
const PROTOS=INTRINSICS.map(x=>x.prototype);
const CLASS_NAMES=NAMES.slice(0,8);
const own=(v,k)=>{try{if(types.isProxy(v))return undefined;const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};

function profile(error,depth){
 let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
 try{
  nativeError=types.isNativeError(error);
  if(nativeError){
   let p=Object.getPrototypeOf(error);
   const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
   for(let i=1;i<=4&&p;i++){
    if(types.isProxy(p))break;
    const name=own(p,'name');
    if(CLASS_NAMES.includes(name)){observedDataPrototypeName=name;prototypeDepth=i;break;}
    p=Object.getPrototypeOf(p);
   }
  }
 }catch{}
 const m=own(error,'message'),c=own(error,'code'),n=own(error,'name');
 let messageHash=null,messageTooLarge=false;
 if(typeof m==='string'){messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;if(!messageTooLarge)messageHash=hash(m);}
 return {nativeError,currentRealmPrototype,observedDataPrototypeName,prototypeDepth,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge,depth};
}

const results=[];
for(const kind of ['direct','nested','revoked']){
 let trapTouches=0;
 const handler={getPrototypeOf(){trapTouches++;throw new Error('private trap');},getOwnPropertyDescriptor(){trapTouches++;throw new Error('private trap');},get(){trapTouches++;throw new Error('private trap');}};
 const r=Proxy.revocable({},handler),error=new Error('AFB_PRIVATE_VM_CANARY');
 Object.setPrototypeOf(error,kind==='nested'?Object.create(r.proxy):r.proxy);
 if(kind==='revoked')r.revoke();
 const row=profile(error,0),unknown=row.currentRealmPrototype===null&&row.observedDataPrototypeName===null&&row.prototypeDepth===null;
 results.push({case:'native_error_'+kind+'_proxy_new',pass:row.nativeError===true&&trapTouches===0&&unknown,nativeError:row.nativeError,proxyTrapTouches:trapTouches,unknown});
}
for(const [name,error,expected]of [['ordinary_error',new Error('AFB_PRIVATE_VM_CANARY'),'Error'],['ordinary_type_error',new TypeError('AFB_PRIVATE_VM_CANARY'),'TypeError']]){
 const row=profile(error,0);
 results.push({case:name,pass:row.nativeError===true&&row.currentRealmPrototype===expected&&row.observedDataPrototypeName===expected,nativeError:row.nativeError,knownPrototypePreserved:row.currentRealmPrototype===expected});
}
let getterTouches=0;const guarded=new Error('AFB_PRIVATE_VM_CANARY');
for(const key of ['stack','code','name','cause',Symbol.toStringTag])Object.defineProperty(guarded,key,{get(){getterTouches++;throw new Error('private getter');}});
const guardedRow=profile(guarded,0),canaryAbsent=!JSON.stringify(guardedRow).includes('AFB_PRIVATE_VM_CANARY');
results.push({case:'throwing_getters_untouched',pass:getterTouches===0&&canaryAbsent&&guardedRow.name===null&&guardedRow.code===null,getterTouches,rawCanaryAbsent:canaryAbsent});
const spoof=profile(Object.create(TypeError.prototype),0);
results.push({case:'spoof_prototype_rejected',pass:spoof.nativeError===false&&spoof.currentRealmPrototype===null&&spoof.observedDataPrototypeName===null,nativeError:spoof.nativeError,unknown:spoof.currentRealmPrototype===null&&spoof.observedDataPrototypeName===null});
({greenPassed:results.filter(r=>r.pass).length,greenTotal:results.length,results});

```

Resultados reales saneados:

```json
{
  "hostNodeVersion": "unavailable_from_node_repl",
  "contextTimeoutMs": 100,
  "totalInertAttempts": 9,
  "red": {
    "case": "native_error_direct_proxy_old",
    "nativeError": true,
    "proxyTrapTouches": 1,
    "observedUnknown": false,
    "redObserved": true
  },
  "green": {
    "greenPassed": 7,
    "greenTotal": 7,
    "results": [
      {
        "case": "native_error_direct_proxy_new",
        "pass": true,
        "nativeError": true,
        "proxyTrapTouches": 0,
        "unknown": true
      },
      {
        "case": "native_error_nested_proxy_new",
        "pass": true,
        "nativeError": true,
        "proxyTrapTouches": 0,
        "unknown": true
      },
      {
        "case": "native_error_revoked_proxy_new",
        "pass": true,
        "nativeError": true,
        "proxyTrapTouches": 0,
        "unknown": true
      },
      {
        "case": "ordinary_error",
        "pass": true,
        "nativeError": true,
        "knownPrototypePreserved": true
      },
      {
        "case": "ordinary_type_error",
        "pass": true,
        "nativeError": true,
        "knownPrototypePreserved": true
      },
      {
        "case": "throwing_getters_untouched",
        "pass": true,
        "getterTouches": 0,
        "rawCanaryAbsent": true
      },
      {
        "case": "spoof_prototype_rejected",
        "pass": true,
        "nativeError": false,
        "unknown": true
      }
    ]
  }
}
```

RED: nativeError=true, getPrototypeOf trap counter=1, clasificación observada no desconocida. GREEN: 7/7. Proxy directo/anidado/revocado conservaron marca nativa con contador cero y observación desconocida; Error y TypeError ordinarios conservaron identidad conocida; getters stack/code/name/tag/cause no fueron tocados, sin canary crudo; spoof de prototipo siguió rechazado. No se imprimieron mensajes/stack ni valores de prototipo. Los controles preparados de padre/hijos y la sonda completa siguen SIN EJECUTAR. Estos resultados sólo prueban el defecto de metadata y su corrección acotada, no cualificación cloud del harness.

### Integridad y cierre de esta corrección

Prewrite verificado: rama exacta todavía dee60034; workflow íntegro c082ab9bacc8b3cf975fa611aebd95edcf144fd0, manual/inactivo; Actions total_count=0. Sólo se modifican helper y este APPEND del informe. Los otros 3189 blobs/modos de FIX_BASE, incluido workflow, quedan protegidos; no hay nuevas rutas ni eliminación.

Commit corrector con único padre FIX_BASE; CAS expected_sha=dee60034f5caf5087a4e2972d8dcaabee7c3fba1, force=false, sólo esta rama, mensaje [skip ci]. Readbacks externos exigidos antes de entregar: ref/commit/padre/árbol completo no truncado de 3191 blobs; exactamente dos modificaciones, 3189 tuples protegidos intactos; helper y reporte completos, prefijo del informe exacto, workflow exacto; cero runs. Los hashes propios finales informe/head/tree y el resultado efectivo de CAS/readback se entregan en el contrato externo, sin commits autorreferenciales.

STOP_WRITES tras cierre externo. No hay activación/jobs/helpers/reviewers/subagentes ni cambios fuera de esas dos rutas. operationalReadiness=false; completePackage=false; PCoff=false. La misma revisión fresca de Root debe valorar FIX_BASE..FIX_HEAD; no se concede permiso de ejecución con este fix.


## Preparación de compatibilidad de liberación — evento real validado

BASE=7993018a0b823cbff61012061f70de093af32eb3; árbol 7f093e7910fba9bae62252e3a053c9df62c130ae. Helper previo f3a5a76407723657833255d697053c9ff2bfd0bc; informe previo 2de47efbb49e7785ad0a5c33fdfb5036211dc470. Esta sección es un APPEND: el prefijo íntegro anterior no cambia.

Brief de la enmienda leído antes de mutar: docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-trigger-amendment.md @e1312de0c5b1e7da9433105c199b6515ee2b3ced, blob 498e7ee02c2a1f9b5d2f504502086f213dd27020.

La liberación b1aa2d7ea749c1bd725f4791140ee16ecdb597e4 / brief docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-single-probe.md (blob ab147d1b7ce8c08a0741a781c55b8e402b20e4eb) exigía activar un push sin cambiar el helper fijado, mientras ese helper admitía sólo workflow_dispatch y registraba ese literal. El implementador detectó la incompatibilidad en lectura y se detuvo ANTES de escribir o ejecutar. El run único no se consumió. No se falseó GITHUB_EVENT_NAME ni se cambió main.

Root declaró obsoleta esa liberación y autorizó expresamente esta preparación mínima: permitir exactamente workflow_dispatch/push con todos los gates existentes, registrar el evento real validado, conservar workflow inactivo exacto, añadir este informe y exigir revisión del mismo reviewer antes de una liberación sustituta fijada al nuevo head/helper. Es una enmienda de compatibilidad del plan de liberación; no se presenta como defecto del requisito manual original ni como autorización para ejecutar. El mensaje explícito de Root autoriza esta preparación; no se requiere paso humano ni se infiere una ventana nativa nueva.

Sólo dos sustituciones únicas en helper:

```json
[
  {
    "from": "process.env.GITHUB_EVENT_NAME!=='workflow_dispatch'",
    "to": "!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)",
    "occurrences": 1
  },
  {
    "from": "trigger:'workflow_dispatch'",
    "to": "trigger:process.env.GITHUB_EVENT_NAME",
    "occurrences": 1
  }
]
```

Al revertir esas dos sustituciones en RAM se recuperó byte por byte el helper f3a5 anterior. No se alteran clasificador cualificado, stop Proxy, controles/observadores, algoritmos/callers/receiver/Promise/error/clocks, cuerpo de ejecución, caps, Node/Linux, fuente f5, repo/ref/attempt/run-id/SHA ni reglas de redacción. No hay selector de evento ni nuevo input: la lista permitida queda cerrada en código. El contexto toma process.env.GITHUB_EVENT_NAME después de validar esa lista.

Helper preparado: 26552 bytes UTF-8; Git blob 4db3321be9cffe7f948446e27aae43209f6d1d4f; SHA-256 f4f71ad31c2f2e68432d92b9cb2a02447148cf5e2176f1ac0d07ac3033f67ef6.

### Verificación de metadata de la enmienda

Gramática del helper completo: new vm.SourceTextModule(compatHelper), sin evaluate/link/import. Sólo la línea exacta del gate existente y el campo trigger corregido se evaluaron en cinco contextos VM de metadata con process.env inerte. Cada contexto tiene timeout:100 ms impuesto por node:vm; todos retornaron sin timeout. Duración fina no medida. Host Node: unavailable_from_node_repl, limitación ya aceptada por Root. No se ejecutaron módulos/proyecto/helper completo, filesystem, red, child_process, instalación, build, tests ni jobs.

Snippet exacto:

```js
const REPO='tokenizartinfo-ops/agent-friendly-web';
const BRANCH='refs/heads/diag/afw-failure-boundaries-20261112';
function admit(){
 const reject=()=>{throw 0;};
 if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();
 return {accepted:true,trigger:process.env.GITHUB_EVENT_NAME};
}
try{admit();}catch{({accepted:false,trigger:null});}

```

Comando exacto node_repl (los valores run-id/SHA son fixtures inertes; no acreditan identidad real):

```js
var compatMetadataSnippet = "const REPO='tokenizartinfo-ops/agent-friendly-web';\nconst BRANCH='refs/heads/diag/afw-failure-boundaries-20261112';\nfunction admit(){\n const reject=()=>{throw 0;};\n if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();\n return {accepted:true,trigger:process.env.GITHUB_EVENT_NAME};\n}\ntry{admit();}catch{({accepted:false,trigger:null});}\n"; var compatCases = [["manual","workflow_dispatch",true],["push","push",true],["schedule","schedule",false],["pull_request","pull_request",false],["absent",null,false]]; var compatEnv = {"GITHUB_REPOSITORY":"tokenizartinfo-ops/agent-friendly-web","GITHUB_REF":"refs/heads/diag/afw-failure-boundaries-20261112","GITHUB_RUN_ATTEMPT":"1","GITHUB_RUN_ID":"1","AFB_WORKFLOW_SHA":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}; var compatibilityResults=compatCases.map(([name,event,expected])=>{var env={...compatEnv};if(event!==null)env.GITHUB_EVENT_NAME=event;var observed=vm.runInNewContext(compatMetadataSnippet,{process:{env}},{timeout:100});return {case:name,expectedAccepted:expected,accepted:observed.accepted,trigger:observed.trigger,pass:observed.accepted===expected&&observed.trigger===(expected?event:null)};}); nodeRepl.write(JSON.stringify({hostNodeVersion:'unavailable_from_node_repl',inertCases:5,timeoutPerContextMs:100,results:compatibilityResults,passed:compatibilityResults.filter(x=>x.pass).length}));
```

Resultados saneados reales:

```json
{
  "hostNodeVersion": "unavailable_from_node_repl",
  "inertCases": 5,
  "timeoutPerContextMs": 100,
  "results": [
    {
      "case": "manual",
      "expectedAccepted": true,
      "accepted": true,
      "trigger": "workflow_dispatch",
      "pass": true
    },
    {
      "case": "push",
      "expectedAccepted": true,
      "accepted": true,
      "trigger": "push",
      "pass": true
    },
    {
      "case": "schedule",
      "expectedAccepted": false,
      "accepted": false,
      "trigger": null,
      "pass": true
    },
    {
      "case": "pull_request",
      "expectedAccepted": false,
      "accepted": false,
      "trigger": null,
      "pass": true
    },
    {
      "case": "absent",
      "expectedAccepted": false,
      "accepted": false,
      "trigger": null,
      "pass": true
    }
  ],
  "passed": 5
}
```

5/5: manual y push aceptados y reportados literalmente con su evento real; schedule, pull_request y evento ausente rechazados. Estos son controles acotados del predicado/contexto, no cualificación Node 22.23.4/Ubuntu ni ejecución del diagnóstico de dos casos. La prueba cloud queda pendiente.

### Publicación y cierre inactivos

Sólo helper+APPEND de este informe; workflow protegido EXACTO c082ab9bacc8b3cf975fa611aebd95edcf144fd0, manual/literal false/no inputs, sin activación. Los otros 3189 blobs/modos de BASE permanecen exactos. Se prepara commit con único padre 7993018a; CAS expected_sha=7993018a0b823cbff61012061f70de093af32eb3 y force=false sobre esta rama, mensaje [skip ci].

Cierre externo requerido: readback independiente ref/commit/padre/árbol completo no truncado, 3191 blobs, exactamente dos modificaciones, 3189 protegidos intactos, helper/reporte completos y prefijo exacto, workflow idéntico y cero runs. Los hashes finales propios informe/head/tree y resultados efectivos se entregan fuera del cuerpo para evitar autorreferencia. No hay liberación ni activación con esta enmienda. STOP_WRITES tras readbacks; operationalReadiness=false; completePackage=false; PCoff=false.


## O2: única sonda cloud consumida y cierre inactivo

Autoridad sustituta leída antes de actuar: docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-single-probe-trigger-corrected.md @1ff2b87d52c0b03c189a2fcc74638529162cc36b, blob c2705540cf975a6d8955511512d0366903794742. Revisión scoped del bridge declarada Spec/Quality aprobada sin findings; BASE cualificada 7b200bdf61eda65234e12cef008de8cae483aa6f / árbol a838ef8a295f30e811b578180b462cba8abfab74. La liberación b1aa anterior quedó obsoleta y sin consumir; esta sustituta autorizó exactamente una ejecución. Intención O2 ahora CONSUMIDA, sin retry/rerun/replacement/autorrearme.

### Fuente, job y límites observados

Se activó sólo .github/workflows/afw-ordinary-failure-boundaries.yml: push de rama exacta/selfpath exacto, eliminación única de false&&, evento push y nombre ONE PROBE. Reversión estática recupera exactamente workflow c082ab9bacc8b3cf975fa611aebd95edcf144fd0; cuerpo/Node/lock/checkouts/permisos/attempt 1 intactos. Activación workflow blob=66a4fea8729ece09057d3b2068f70dce36431ca0, SHA-256=82186e961221c67c2722c13a7b62ff3588c84563331e510339ca85d9206b2ca9.

Commit real de ejecución dc1750630a10aa3d48d2d3db621d22a005e8eaef / árbol cebe77d69ddcc6b734cc100052d44e41f69912b7, padre 7b200bdf. CAS exacto sin force. Readback completo: 3191 blobs, 3190 blobs/modos fuera del workflow intactos. Helper inmutable 4db3321be9cffe7f948446e27aae43209f6d1d4f / SHA-256 f4f71ad31c2f2e68432d92b9cb2a02447148cf5e2176f1ac0d07ac3033f67ef6. La rama permaneció congelada en dc175 hasta terminal y lecturas requeridas.

Run [43170408910](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43170408910), evento push, attempt 1, único job boundaries 131022048553: TERMINAL failure. GitHub run_started_at=2026-11-12T06:45:44Z; updated_at=2026-11-12T06:46:10Z (intervalo de metadata 26s, no duración fina del hijo). Checkout, Node e instalación del lock finalizaron success; sólo la sonda falló; fallback, manifiesto, upload y validación del formato de metadata finalizaron success. Cero jobs activos en lectura terminal.

Artefacto declara Node v22.23.4/Ubuntu24.04, contexto real push/run/head separado del testSource f5f52660d19ec9fc634bbc49558db75582fdaf88 y del hijo MODELED_STERILE_SYNTHETIC, group UNSET; no es identidad ni permiso operativo. Guard de argv/repo/ref/attempt/SHA/versión se conservó. Las 3188 hojas/modos del sujeto f5 coinciden antes/después con hash c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7. Los siete overlays normalizados, hashes y conteos de literales coinciden exactamente con el inventario estático anterior.

Límites codificados hijo110s+5 / comando120s+5 / job7m; no se ejercitaron como timeout: termination=null, signal=null, spawnFailed=false, exit.code=1. No se actualizó/reinició un reloj ni se abrió ventana nativa Task2; Root mantuvo Native16 HELD. No hay APIs reales, CF/runtime/secretos/Max/mail/productpin/Source/main/oldORD cambiados.

### Resultado acotado: incomplete por convención de conteos

La expectativa 22 registrados/2 fallos/20 filtrados NO coincide con los eventos reales de este Node: registered=2, selectedFailed=2, selectedPassed=0, filteredSkipped=0, wrapperFailed=0, unexpected=0; summary tests2/pass0/fail2/cancelled0/skipped0/todo0. El patrón anclado fijo seleccionó ambos nombres, y el reporter no recibió eventos de los otros veinte registros bajo este filtro. No se inventan skips ni se reescribe el resultado: selectionCountsMatch=false, status=incomplete y job failure quedan preservados. El fallo del conteo estricto no se confunde con un fallo de producto adicional o con credenciales.

Ambos hashes de referencia se reprodujeron: own 9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff; adoption a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e. En los observadores dentro del hijo, ambas excepciones son nativeError=true y currentRealmPrototype/observedDataPrototypeName=Error, profundidad de prototipo 1, causeDepth0, own name/code NULL. Esto aclara los anteriores NULL sin identificar mensaje o causa exacta. El reporter recibe wrappers/cause con marca nativa false y causeDepth1; ambas observaciones se conservan separadas.

Own: own_build enter+return y own_import enter+throw. Adoption: trial_generation, rest_init/control/prepare/proof/capture/read/claim y final_restore/final_project retornan; cf_finalizer y cf_fixture rechazan después. No hay marcas http_build/http_import. Sólo se delimita un intervalo de rechazo posterior a la proyección y anterior al retorno de finiteFinalizerFixture; no se atribuye un punto interno exacto ni se declara arreglado alguno de los 24 fallos restantes.

Controles reales: privacidad de padre y dos hijos pass; native brand/cross-realm/spoof/oversize/cycle/canary pasan; getterTouches=0 y proxyTrapTouches=0, proxyPrototypesSafe=true en todos. Dos recibos identity_control pass con Promise/error/receiver identity=true, sin etapas de fixture contaminadas. networkDenied=0, errorOverflow=0. Estos controles acotados pasan en este run; el diagnóstico global sigue incomplete por conteos y no cualifica una suite amplia o runtime operativo.

DTO cerrado observado (sin mensajes/stack/bundles/datos privados):

```json
{
  "status": "incomplete",
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "workflowRef": "refs/heads/diag/afw-failure-boundaries-20261112",
    "trigger": "push",
    "workflowSource": "dc1750630a10aa3d48d2d3db621d22a005e8eaef",
    "testSource": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
    "runId": "43170408910",
    "attempt": 1,
    "node": "v22.23.4",
    "os": "Ubuntu24.04",
    "group": "UNSET",
    "childContext": "MODELED_STERILE_SYNTHETIC",
    "workflowContextIsAdmissionAuthority": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false
  },
  "protectedBase": {
    "leaves": 3188,
    "before": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
    "after": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
    "equal": true
  },
  "privacy": {
    "pass": true,
    "getterTouches": 0,
    "proxyTrapTouches": 0,
    "proxyPrototypesSafe": true,
    "ordinaryNative": true,
    "crossRealmNative": true,
    "crossRealmExactUnknown": true,
    "spoofRejected": true,
    "oversizeSuppressed": true,
    "cycleBounded": true,
    "rawCanaryAbsent": true
  },
  "helperHash": "f4f71ad31c2f2e68432d92b9cb2a02447148cf5e2176f1ac0d07ac3033f67ef6",
  "selectionCountsMatch": false,
  "representativeHashesMatch": [
    true,
    true
  ],
  "execution": {
    "exit": {
      "code": 1,
      "signal": null,
      "spawnFailed": false
    },
    "termination": null,
    "rawFiles": [
      {
        "name": "raw.stdout",
        "bytes": 4178,
        "sha256": "4025b16d6c7aa6d14935ac6bd62885c6cd4ed340243185425527bed17c1f2872",
        "uploaded": false
      },
      {
        "name": "raw.stderr",
        "bytes": 0,
        "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "uploaded": false
      }
    ],
    "privateLogsUploaded": false,
    "evidence": {
      "purpose": "afw.failure-boundaries.reporter.v1",
      "testEvents": {
        "selectedPassed": 0,
        "selectedFailed": 2,
        "filteredSkipped": 0,
        "wrapperFailed": 0,
        "unexpected": 0,
        "registered": 2
      },
      "summary": {
        "tests": 2,
        "pass": 0,
        "fail": 2,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "boundaries": {
        "own_build:enter": 1,
        "own_build:return": 1,
        "own_import:enter": 1,
        "own_import:throw": 1,
        "cf_fixture:enter": 1,
        "cf_fixture:throw": 1,
        "cf_finalizer:enter": 1,
        "cf_finalizer:throw": 1,
        "final_restore:enter": 1,
        "final_restore:return": 1,
        "final_project:enter": 1,
        "final_project:return": 1,
        "rest_init:enter": 1,
        "rest_init:return": 1,
        "rest_control:enter": 1,
        "rest_control:return": 1,
        "rest_prepare:enter": 1,
        "rest_prepare:return": 1,
        "rest_proof:enter": 1,
        "rest_proof:return": 1,
        "rest_capture:enter": 1,
        "rest_capture:return": 1,
        "rest_read:enter": 3,
        "rest_read:return": 3,
        "rest_claim:enter": 1,
        "rest_claim:return": 1,
        "trial_generation:enter": 1,
        "trial_generation:return": 1
      },
      "errors": [
        {
          "stage": "own_import",
          "nativeError": true,
          "currentRealmPrototype": "Error",
          "observedDataPrototypeName": "Error",
          "prototypeDepth": 1,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": null,
          "code": null,
          "messageHash": "9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff",
          "messageTooLarge": false,
          "depth": 0,
          "causeDepth": 0,
          "count": 1
        },
        {
          "case": "own",
          "failureType": "testCodeFailure",
          "nativeError": false,
          "currentRealmPrototype": null,
          "observedDataPrototypeName": null,
          "prototypeDepth": null,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": "Error",
          "code": "ERR_TEST_FAILURE",
          "messageHash": "9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff",
          "messageTooLarge": false,
          "depth": 0,
          "causeDepth": 1,
          "count": 1
        },
        {
          "case": "own",
          "failureType": "testCodeFailure",
          "nativeError": false,
          "currentRealmPrototype": null,
          "observedDataPrototypeName": null,
          "prototypeDepth": null,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": "Error",
          "code": null,
          "messageHash": "9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff",
          "messageTooLarge": false,
          "depth": 1,
          "causeDepth": 1,
          "count": 1
        },
        {
          "stage": "cf_finalizer",
          "nativeError": true,
          "currentRealmPrototype": "Error",
          "observedDataPrototypeName": "Error",
          "prototypeDepth": 1,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": null,
          "code": null,
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e",
          "messageTooLarge": false,
          "depth": 0,
          "causeDepth": 0,
          "count": 1
        },
        {
          "stage": "cf_fixture",
          "nativeError": true,
          "currentRealmPrototype": "Error",
          "observedDataPrototypeName": "Error",
          "prototypeDepth": 1,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": null,
          "code": null,
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e",
          "messageTooLarge": false,
          "depth": 0,
          "causeDepth": 0,
          "count": 1
        },
        {
          "case": "adoption",
          "failureType": "testCodeFailure",
          "nativeError": false,
          "currentRealmPrototype": null,
          "observedDataPrototypeName": null,
          "prototypeDepth": null,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": "Error",
          "code": "ERR_TEST_FAILURE",
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e",
          "messageTooLarge": false,
          "depth": 0,
          "causeDepth": 1,
          "count": 1
        },
        {
          "case": "adoption",
          "failureType": "testCodeFailure",
          "nativeError": false,
          "currentRealmPrototype": null,
          "observedDataPrototypeName": null,
          "prototypeDepth": null,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": "Error",
          "code": null,
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e",
          "messageTooLarge": false,
          "depth": 1,
          "causeDepth": 1,
          "count": 1
        }
      ],
      "errorOverflow": 0,
      "privacyControls": [
        {
          "pass": true,
          "proxyPrototypesSafe": true,
          "ordinaryNative": true,
          "crossRealmNative": true,
          "crossRealmExactUnknown": true,
          "spoofRejected": true,
          "oversizeSuppressed": true,
          "cycleBounded": true,
          "rawCanaryAbsent": true,
          "getterTouches": 0,
          "proxyTrapTouches": 0
        },
        {
          "pass": true,
          "proxyPrototypesSafe": true,
          "ordinaryNative": true,
          "crossRealmNative": true,
          "crossRealmExactUnknown": true,
          "spoofRejected": true,
          "oversizeSuppressed": true,
          "cycleBounded": true,
          "rawCanaryAbsent": true,
          "getterTouches": 0,
          "proxyTrapTouches": 0
        }
      ],
      "identityControls": [
        {
          "pass": true,
          "promiseIdentity": true,
          "errorIdentity": true,
          "receiverIdentity": true
        },
        {
          "pass": true,
          "promiseIdentity": true,
          "errorIdentity": true,
          "receiverIdentity": true
        }
      ],
      "networkDenied": 0
    }
  }
}
```

### Preservación verificada del único artefacto seguro

Primary purpose-built listing del run devolvió exactamente 13922465417, nombre afw-failure-boundaries-43170408910-1, 4662 bytes, digest sha256:4526d902cd2b41a098c65a23dd21132679a1e572cff7a3b93e1ee04f6302c5a4, expired=false, creación 2026-11-12T06:46:06Z, expiración 2026-11-19T06:46:05Z; workflow_run.id/source/branch/repositoryId coinciden. Listing medido 564 ms frente a presupuesto2s; la herramienta no ofrece timeout impuesto.

Una sola llamada exact-ID al downloader, medida 1518 ms, sin timeout impuesto ni reintentos; devolvió referencia al archivo. Una sola lectura HTTP y validación del ZIP seguro en RAM, medida 242 ms con AbortSignal.timeout(5000) impuesto a la lectura y límite256KiB. No se descargaron logs privados ni se extrajo/ejecutó/instaló nada en disco. Hubo un error local de orquestación por URL no definido antes de iniciar ese fetch; no produjo solicitud y se corrigió sin duplicar el download o la lectura.

ZIP real=4662 bytes comprimidos / 15622 expandidos; SHA-256 coincide con primary digest. Exactamente result.json (15355 bytes, SHA-256 8acfb4f4ccc5f8427510dd9dbbb499abcf07b289d885580f8bc0ae7b18416f80) y manifest.json (267 bytes, SHA-256 a057e87df17624c86c52924d7daba5e78e1a959f57241ecfcbbb459b45cd9772); ambos CRC32 verificados. manifest.inventory declara exactamente el tamaño/hash del resultado y coincide. Sin otros archivos; rawLogsUploaded=false; result<=64KiB; compressed+expanded cada uno<=256KiB.

La metadata por ID procede del listing primario y del digest real del ZIP. Los valores del stdout del upload no se releen independientemente: el paso de validación de formato fue success, pero las herramientas seguras disponibles no exponen sus líneas aisladas. No se recuperaron logs completos para suplir esa limitación. Un GET genérico de metadata de job tampoco estuvo disponible; se usó el listado especializado de jobs, sin insistir en ese endpoint.

Incidente de herramienta: durante inspección de forma se imprimió accidentalmente un objeto anidado que contenía la URL temporal firmada del artefacto público seguro. No contenía secretos ni payload privado. No se repite ni se persiste aquí su valor; se continuó sólo con validación RAM del ZIP autorizado. Root fue informado.

Logs de prueba permanecieron privados/no subidos: stdout4178 bytes/hash4025b16d6c7aa6d14935ac6bd62885c6cd4ed340243185425527bed17c1f2872; stderr0/hash e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855. No se leyó su contenido.

### Restauración terminal y cierre

Tras el terminal, ZIP/readbacks y ref congelado dc175 se restaura EXACTAMENTE workflow inactivo c082ab9bacc8b3cf975fa611aebd95edcf144fd0 y sólo se añade esta sección al informe ec0a4e1adaf6d7cb3f20ffde035916f38293a69f. Los 3189 blobs fuera de workflow/informe, incluido el helper, permanecen intactos. Commit de limpieza separado del run, padre dc175, CAS expected_sha exacto/force=false/[skip ci]. No se habilita otro job ni se cambia el helper por el mismatch.

Criterios de contrato externo: ref/commit/árbol completo no truncado de 3191 blobs; workflow c082 exacto; helper4db exacto; prefijo previo de informe íntegro; sólo workflow+informe modificados respecto a dc175 y sólo informe respecto a BASE7b; exactamente un run terminal/attempt1/0 jobs activos; no retry. Los hashes propios finales de informe/head/tree y CAS/readback efectivo se entregan externamente, sin autorreferencia. STOP_WRITES al cerrar.

operationalReadiness=false; completePackage=false; PCoff=false; ORD integration OPEN. Sonda única consumida, diagnóstico incomplete, ambos fallos reproducidos y frontera más estrecha; causa exacta y reparación siguen pendientes de decisión Root.
