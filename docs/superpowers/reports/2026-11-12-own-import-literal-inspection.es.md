# AFW O4 — inspección literal de own-import: preparación inactiva

Estado PREPARED_INACTIVE. No se autoriza ni ejecuta sonda. operationalReadiness=false; completePackage=false; PCoff=false. STOP_WRITES tras el contrato externo de lectura completa/ref/árbol/diff; revisión independiente Spec/Quality pendiente.

## Alcance, permisos y fuentes

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web, público/id1347578006; ENVIRONMENT=diagnóstico SYN en GitHub/Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=git branch/tree/blob; RESOURCE_ID=diag/afw-own-literal-20261112; ALLOWED_ACTION=crear exactamente tres nuevas rutas inactivas. No se modifican Source, main, otros diagnósticos, Rootdocs, runtime, CF, permisos, credenciales, mail o Max. Sin helpers/subagentes; Native Task2 sigue separado y esta entrega no abre su reloj.

Requisitos leídos en 3723be0b0cf3ebb5f1bbf4281e80b1c7065cea85:

- Brief docs/superpowers/briefs/2026-11-12-own-import-literal-preparation.md: 5d773b76efe2c941386ab8a0fb6b003c7b7d4545.
- Spec docs/superpowers/specs/2026-11-12-own-import-literal-inspection.md: d4f1812bc39d92eb11a7cf37946eeb4a9b250718.
- Plan docs/superpowers/plans/2026-11-12-own-import-literal-inspection.md: c735be45b54b85ee38b77f2590a23c5f99a2bafc.

Fuente f5f52660d19ec9fc634bbc49558db75582fdaf88; árbol 7bc8b997a968dca32fc567b627de70b774d6489c; lectura completa no truncada: 3188 blobs/modos. AGENTS.md leído con alcance inicial, blob b67942223e5633011573f2a2165489afd9ff3f67. Matching-ref exacto devolvió vacío; se creó esta rama desde f5 y se leyó de vuelta en f5. Las tres rutas nuevas no existen en el árbol base; runs de esta rama=0 antes de escribir.

Pins completos verificados directamente:

- test/mcp-own-finite-entrypoints.test.mjs = 674419ca51328b128bba483f44001e12f1e4b9f5.
- package.json = f4fd38ac380c46a149d8cf0f3bd828a28406f761.
- package-lock.json = 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b.
- Lock raíz: esbuild0.28.2 y Acorn8.18.0, con version/integrity completas embebidas en helper y comprobadas antes del futuro build.
- Referencia O2 sólo para privacidad/inventario/captura: helper4db3321be9cffe7f948446e27aae43209f6d1d4f @7b200bdf61eda65234e12cef008de8cae483aa6f. No se ejecutó ni se reutilizó su ruta de tests/import.

Tres altas únicamente, modo Git100644:

| Ruta | Bytes UTF-8 | Blob Git | SHA-256 |
| --- | ---: | --- | --- |
| scripts/diagnostics/own-import-literal-inspection.mjs | 29944 | f47651bc41648cafd805553cde183bf66bebf392 | 1b19768d05fb20e2a823384688a78cf07e006d5cf30eb9d38e2d59dde2a3a3ac |
| .github/workflows/afw-own-import-literal-inspection.yml | 5653 | af862de67987090a3b0e4debc528a0f9abff0020 | b395270caea28b525b75354f4f63fa34d505898ce52c178762208fbb04c9847a |
| docs/superpowers/reports/2026-11-12-own-import-literal-inspection.es.md | contrato externo | contrato externo | contrato externo |

El informe no incorpora sus propios hashes finales para evitar autorreferencia. Head/tree/blob de informe finales y diff/readbacks efectivos van en el contrato externo; no se añadirán commits sólo para autorreferenciar esos hashes.

## Build original y exclusión de ejecución

Pregunta fija: el Error de own import observado por O2 tiene SHA-256 9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff; las lecturas previas de dependencias directas y 42 hipótesis de payload no lo localizaron. El futuro build cubriría la clausura emitida, pero no determina qué throw se ejecutó.

El helper contiene VERBATIM la línea7 de build del test original, no una reconstrucción de sus opciones. SHA-256 del literal completo con espacio inicial=79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b. Una única línea de código del helper es idéntica a esa línea fuente; el pin runtime vuelve a verificar test completo y literal. Profile fijo finite_trial_event; entry worker/mcp-own/index.mjs; bundle/write:false/ESM/platform node; mismo define y mismo plugin synthetic-platform-base con sus onResolve/onLoad y constructores sintéticos originales. No se añaden banner, metafile, sourcemap, define, target, SDK o plugins.

El futuro hijo trabaja en cwd del checkout sujeto. createRequire se ancla al archivo de test exacto; se resuelve raíz esbuild/lib/main.js y se importa ese entry como namespace ESM para obtener el mismo named build. Fuente primaria oficial esbuild v0.28.2/npm/esbuild/package.json, blob7e54c6fc979b490baba9937b3893d1390473dde2, declara main=lib/main.js y sin exports/module/type alternativos. El paquete instalado futuro debe conservar versión/main y carecer de exports/type module; de lo contrario incomplete, nunca se sustituye otro compilador. Se comprueba además el binario linux-x64 presente para evitar fallback de instalación. La equivalencia efectiva de módulos instalados queda pendiente de la ejecución futura; no se importó el paquete durante preparación.

No se importa el test ni su línea8. No hay node --test, tests registrados, import data-URL, eval, vm de emisión, instancias SDK, auth factories, métodos de producto o Miniflare. La única cadena emitida leída es result.outputFiles[0].text; sólo se conserva en RAM. Se exige exactamente un outputFile. Se guardan bytes/SHA-256 de esa cadena, no la cadena, ni AST, snippets o source map. Esto no es el build nativo completo, Source expirado sigue intacto y ninguna fecha SYN pasa por autorización real.

## Diccionario conservador y semántica exacta

Objetivo único fijo9b4dd8...; cero argumentos CLI/target/env selector. El modo de hijo es interno/fijo, con fuente f5 y env estéril; no puede elegir otro archivo ni hash.

El parser futuro es el Acorn raíz8.18.0 del sujeto, require entry exacto acorn/dist/acorn.js, sourceType=module/ecmaVersion=latest/error recovery deshabilitado. Antes de creación de nodos se cuenta startNode/startNodeAt/copyNode mediante una subclase local acotada; primaria Acorn8.18.0/acorn/src/node.js blobcdc5714f22e73220d7832275d9c87d5467af013a confirma esas construcciones. También se cuentan nodos alcanzables durante la visita. Esta subclase no es plugin del compilador y no ejecuta código de aplicación. Su funcionamiento con la emisión real NO se verificó aún.

Candidatos sintácticos: primer argumento de CallExpression/NewExpression con callee Identifier exactamente Error/TypeError/SyntaxError/ReferenceError/RangeError/EvalError/URIError/AggregateError; y argumentos de ThrowStatement, salvo el mismo Error constructor/call ya contado. Otros nombres, alias y accesos de propiedad no se resuelven. AggregateError también sigue la regla puramente sintáctica del primer argumento: no se afirma que sea su argumento de mensaje. Shadowing no prueba constructor intrínseco. El ordinal se ordena por start generado; no hay atribución a módulo.

Fold permitido:

- Literal: string, boolean, número finito o null. RegExp/BigInt/otros valores omitidos.
- BinaryExpression sólo operador +: si algún operando completamente conocido es string, concatena las conversiones primitivas; si ninguno es string, suma números primitivos (null→0, false→0, true→1, number→él mismo). Resultado no finito se cuenta desconocido.
- TemplateLiteral: cooked literal string con cada expresión recursivamente conocida; null→null textual, boolean→true/false textual, number finito→String(number), string sin cambio. cooked inválido se omite.
- No UnaryExpression, Identifier propagation, llamadas, propiedades, spread, coerción de objetos, lógica/condicionales ni evaluación de fuente. Un payload final no string se cuenta desconocido; no se presupone la conversión de un constructor posiblemente sombreado.
- Todo acceso AST pertinente usa descriptores propios de datos; Proxy no se inspecciona. La visita rechaza getters en la estructura AST y nunca los llama.

Límites cerrados: emisión4MiB; creación/visitaAST200000; candidatos4096; profundidad fold32; payload1MiB; bytes acumulados fold8MiB (incluye intermedios, conservador); matches públicos128; result64KiB. Sobrepasar cualquiera o fallar build/parser => incomplete. Expresiones fuera del lenguaje de fold se omiten con conteos de unknown; esto no invalida haber recorrido el diccionario definido, pero no constituye no-error/clean.

Sólo salen conteos, hashes y, para matches, ordinal generado+enum named_error_new/named_error_call/throw_payload con payloadHash fijo. Los no-matches no imprimen sus payloads ni una lista arbitraria de textos. STATIC_CANDIDATE_MATCH_NOT_EXECUTION_PROOF significa existencia estática; NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY sólo descarta ese diccionario limitado. Ninguno prueba origen ejecutado, primer throw, reparación o aceptación de la suite.

## Privacidad, proceso y preservación futura

Se reutilizan selectivamente de O2: propios descriptores/proxy-stop; marca nativa/prototipo observado y causa acotada; hash de mensaje propio<=1MiB; enums cerrados; canary/getters/proxy/oversize/ciclo; hashes/tuples; captura por streams; recibos/inventario. La privacidad fija se comprueba en padre/hijo futuros. Se omiten deliberadamente: reporter Node tests, filtros/skips, overlays de source/tests/libs, import de emisión, A/B/pinB, native CLI, controladores/SDK, marcadores de métodos/promesas y su control de identidad. Aquí no se observan/reemplazan métodos de aplicación: sólo build+parse; por eso no se trasladan esos counters de O2.

Hijo con PATH/HOME/TMPDIR/LANG y constantes O4/GITHUB_SHA=f5, sin heredar credenciales/eventos/contexto real. Contexto padre distingue workflowSHA/run/evento reales de child MODELED_STERILE_SYNTHETIC. Helper admite sólo los tipos de evento cerrados workflow_dispatch/push y registra el real validado, evitando repetir el conflicto de release O2; esto no activa push: el único job del workflow sigue manual y literal false. El helper verifica argv vacío, repo/ref/attempt1/run-id/sourceSHA/Linux/Node22.23.4.

Red del hijo cerrada mediante fetch/socket/http/https/tls como O2; cualquier intento incrementa contador e impide complete. No se afirma contención universal de procesos arbitrarios: el único subprocess permitido es el compilador original instalado, sin nuevo downloader o credenciales. El inventario f5 de3188 hojas/modos es comprobado antes/después de forma independiente.

Logs del hijo nuevos0600/directorio0700, por streams, total8MiB, no upload. Sólo JSON cerrado del hijo<=64KiB se reconstruye en padre con enums/cotas; no se reenvía un objeto arbitrario. Errors sólo metadata saneada; nunca mensaje/stack/bundle/AST.

Workflow futuro: Ubuntu24.04/Node22.23.4; checkout diagnóstico por github.workflow_sha y sujeto f5/historia completa separados, credenciales persistentes false. npm ci --ignore-scripts --no-audit --no-fund con timeout25s+3; comando del helper timeout60s+3; hijo45s+3; job máximo2min. Estos límites suman91s de comandos con ventana remanente29s para setup/preservación, sin timeout externo120+5 que exceda el job. Son límites codificados no ejercitados, no SLA de Actions: checkout/setup pueden agotar la ventana externa.

Recibo inicial antes del setup; preservación de recibo running/interrupted como incomplete conservando campos disponibles; final manifest y upload always(); fallo de incomplete sólo después de preservar. Un kill/cancelación dura del job puede impedir upload; se reportará si sucede, sin prometer artefacto ante un runner destruido. El estado parcial previamente escrito no se presenta como terminal exitoso.

Artefacto previsto exacto result.json+manifest.json, siete días. ID/digest en formato cerrado; lectura futura especializada por run/ID exacto y una descarga, ZIP pequeño sóloRAM/CRC/SHA/manifiesto, sin logs ni URLs firmadas impresas. Todavía no existe run/artefacto/ID que acreditar.

## Comprobaciones de preparación realmente realizadas

- Full test/lock/pins y literal original leídos; branch matching-ref vacío y ref f5 leído de vuelta.
- SourceTextModule analizó helper final sin evaluate/link/import del proyecto; dos scripts inline también sólo gramática.
- PyYAML6.0.3 ya instalado analizó YAML final: un job manual sin inputs/literal false/repo/ref/attempt1/permisos contents:read/actions:read/concurrency sin cancelación/job2min; un upload de dos rutas.
- Únicamente se evaluaron siete controles de metadata sobre AST escritos a mano en VM de builtins, timeout100ms. No Acorn ni parser de proyecto/emisión. HostNodeVersion=unavailable_from_node_repl, expresamente no Node22 cloud qualification.

Resultado real de los controles inertes:

```json
{
  "hostNodeVersion": "unavailable_from_node_repl",
  "vmTimeoutMs": 100,
  "projectOrEmissionParsed": false,
  "controls": {
    "pass": true,
    "cases": 7,
    "touches": 0,
    "literal": true,
    "addition": true,
    "template": true,
    "primitiveAddition": true,
    "gettersUntouched": true,
    "proxyUntouched": true,
    "callNotEvaluated": true
  }
}
```

Estos controles usan literal, adición string/números, template/null, bool+null, getter arrojador no leído, Proxy sin traps y CallExpression desconocido sin ejecutar. No se imprimió el canary. No se ejercitaron compiler lookup/build/parse/AST caps reales/captura/deadlines/artefacto. Esos siguen condiciones futuras de aceptación.

Los errores de ensamblado JS de la herramienta se corrigieron en RAM antes de publicar; ninguno ejecutó proyecto ni creó archivos locales. No se clonó/instaló/compiló/testeó nada local ni cloud. Sólo lecturas remotas, gramática/YAML y esos controles pequeños autorizados.

## Commit y contrato de cierre

Crear árbol sobre7bc8b997 con exactamente las tres altas100644; commit con único padre f5 y [skip ci]; CAS sólo esta rama expected_sha=f5/force=false. Rollback material f5 y3188blobs preservados; no se autoriza reset/force/delete/merge/deploy.

Contrato externo posterior: ref exacto, padre/tree/árbol completo no truncado3191 blobs,3188tuples originales idénticos, exactamente tres altas, tres lecturas completas de blobs comparadas por bytes/pins y cero runs. Los hashes finales del propio informe/head/tree/diff y el resultado efectivo de CAS/readbacks se entregan externamente. STOP_WRITES después, para revisión independiente. No ejecutar, importar emisión, rearmar o asumir guardia/PCoff con esta preparación.


## Única inspección O4 consumida — resultado incomplete y restauración

Liberación leída antes de actuar: docs/superpowers/briefs/2026-11-12-own-import-literal-single-inspection.md @e4eb197cdae98dabb28a5f6abcb5f3560469fb9e, blob c806691a78e1420e29b1236beb3024f0dbb8e04b. Revisión independiente Spec/Quality aprobada sin findings, paquete2fd96f56. BASE53176240de1fcac9d9a423a62ec44cea1e88b3e8/árbol dfebda4f66fe727610e2f77d02511449c8b6c6b8; helper f47651bc41648cafd805553cde183bf66bebf392 intacto. Esta sección es APPEND del informe3e82adb35e5974846a70bf82c0e977565bb31256.

Se consumió exactamente una activación y un run. No hubo ensayo manual de catálogo, rerun, retry, segundo build diagnóstico, import de emisión, test, Miniflare, I0, instancias SDK, OAuth/CF/keys/runtime/main/Source/otros diagnósticos. Native16 quedó HELD por Root durante esta unidad.

### Fuente y ejecución congeladas

Activación única: sólo header de workflow a push/rama exacta/selfpath exacto, nombre SOLE INSPECTION, evento push y eliminación única de false&&. Normalización inversa recuperó exactamente el workflow preparado af862de67987090a3b0e4debc528a0f9abff0020; no cambió el cuerpo. Blob activado77c26547c0db8661aad75ce1c3626a20c4bb9e0d; SHA-25616b4749d14b5c7227700e35907cb2cda854495c9d0c751262bcb7eb0de68450d.

Commit real bc17654a1b6d87b4018e81db9fe668dfeb3f774e, árbol e495c9798370ab4aa4363132d859ba95c3c14861, padre53176240; CAS exacto force=false. Fulltree no truncado3191blobs y3190tuples fuera del workflow intactos. Ref congelado en bc176 durante run/terminal/metadata y aceptación de auditoría primaria.

Run [43189735097](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43189735097), evento push, attempt1, único job inspect131085705528: TERMINAL FAILURE. run_started_at2026-11-12T09:14:39Z / updated_at2026-11-12T09:15:10Z, intervalo metadata31s (no duración fina de build/parser). Inicial/setup/checkout/Node/install y preservación/upload/validación de artifact metadata con conclusión success. El paso compile contiene continue-on-error: su conclusión success no se usó para afirmar éxito de inspección; el último gate falló correctamente por el recibo incomplete.

Comandos exactos del cuerpo revisado, sin cambios:

```text
timeout --signal=TERM --kill-after=3s 25s npm ci --ignore-scripts --no-audit --no-fund
timeout --signal=TERM --kill-after=3s 60s node diagnostic-code/scripts/diagnostics/own-import-literal-inspection.mjs
```

Job2min/hijo45s+3. No se ejercitó deadline: termination=null, exit.code1, signal=null, spawnFailed=false. Contexto real Nodev22.23.4/Ubuntu24.04/workflowSHA/run/push separado del testSourcef5 y del hijo MODELED_STERILE_SYNTHETIC; no es autoridad o frescura de servicio.

### Resultado observado: cap de creación AST antes del diccionario

Fuente original3188 hojas/modos preservada: before=after=c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7. HelperHash1b19768d05fb20e2a823384688a78cf07e006d5cf30eb9d38e2d59dde2a3a3ac igual al preparado. Privacidad y siete controles de metadata pass en padre/hijo, getter/Proxy touches0, networkDenied0.

El build original retornó un outputFile de 2111553 bytes, SHA-2562b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2, warnings0, compiler0.28.2/profilefinite_trial_event, literalHash79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b. imported=false/evaluated=false. Ningún bundle o AST se subió o ejecutó.

La fase parse quedó incomplete/reason ast_nodes al alcanzar el presupuesto fijo de200000 construcciones de nodos. Este contador se incrementa en startNode/startNodeAt/copyNode antes de crear el siguiente nodo; no equivale a los nodos únicos alcanzables de un AST terminado. No se produjo parser result completo ni se entró al diccionario. Conteos de candidatos/folds/matches y nodos únicos finales son DESCONOCIDOS, nunca cero por defecto.

No existe conclusión match/no-match, ni prueba del origen own9b4, reparación, credenciales o CF. La única evidencia nueva es el tamaño/hash real de emisión y que el presupuesto de construcción AST actual fue insuficiente para completar parse. No se elevó el cap, cambió helper ni reintentó.

DTO cerrado relevante de la auditoría primaria:

```json
{
  "status": "incomplete",
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "workflowRef": "refs/heads/diag/afw-own-literal-20261112",
    "trigger": "push",
    "workflowSource": "bc17654a1b6d87b4018e81db9fe668dfeb3f774e",
    "testSource": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
    "runId": "43189735097",
    "attempt": 1,
    "node": "v22.23.4",
    "os": "Ubuntu24.04",
    "mode": "SYN_COMPILE_ONLY_NO_IMPORT",
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
  "metadata": {
    "pass": true,
    "cases": 7,
    "touches": 0,
    "literal": true,
    "addition": true,
    "template": true,
    "primitiveAddition": true,
    "gettersUntouched": true,
    "proxyUntouched": true,
    "callNotEvaluated": true
  },
  "execution": {
    "exit": {
      "code": 1,
      "signal": null,
      "spawnFailed": false
    },
    "termination": null,
    "evidence": {
      "purpose": "afw.own-literal.child.v1",
      "status": "incomplete",
      "networkDenied": 0,
      "phase": "parse",
      "reason": "ast_nodes",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "privacy": {
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
      "metadata": {
        "pass": true,
        "literal": true,
        "addition": true,
        "template": true,
        "primitiveAddition": true,
        "gettersUntouched": true,
        "proxyUntouched": true,
        "callNotEvaluated": true,
        "cases": 7,
        "touches": 0
      },
      "error": [
        {
          "nativeError": true,
          "currentRealmPrototype": "Error",
          "observedDataPrototypeName": "Error",
          "prototypeDepth": 1,
          "prototypeObservationIsExactIntrinsicClass": false,
          "name": null,
          "code": null,
          "messageHash": "22008a736efabd5ba4602a4dca0dcfb3a34dbab8a9990917b51ab797f6cec2f1",
          "messageTooLarge": false,
          "depth": 0,
          "causeDepth": 0
        }
      ],
      "emission": {
        "bytes": 2111553,
        "sha256": "2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2",
        "imported": false,
        "evaluated": false
      },
      "build": {
        "profile": "finite_trial_event",
        "literalHash": "79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b",
        "compiler": "0.28.2",
        "warnings": 0,
        "outputFiles": 1
      }
    },
    "rawFiles": [
      {
        "name": "raw.stdout",
        "bytes": 1261,
        "sha256": "7d78abfc6455285eb85e3731f22fbb8d7563ef49eec43e66d4554e522d97fd3a",
        "uploaded": false
      },
      {
        "name": "raw.stderr",
        "bytes": 0,
        "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "uploaded": false
      }
    ],
    "rawLogsUploaded": false
  }
}
```

### Artefacto y aceptación independiente: un solo auditor de bytes

Listing especializado del actor por run/nombre exactos: ID13929264129, nombreafw-own-literal-43189735097-1, 2083bytes, digestsha256:96bd98c73807d72658cae65bff8fabf744060925952d34441e03133c83c933cc, expired=false, creación2026-11-12T09:15:06Z, expiración2026-11-19T09:15:05Z, branch/run/head/repositoryId coincidentes. Listing medido593ms, no timeout impuesto por esa herramienta.

Root hizo la ÚNICA descarga/auditoría de contenido autorizada; el actor NO repitió download/fetch del artefacto ni leyó logs. Se adoptó la aceptación primaria de Root, no se presenta como lectura ZIP independiente del actor.

Auditoría inmutable leída: docs/superpowers/reviews/2026-11-12-own-import-literal-primary-audit.md @b577693ec19a9d43084a438ba45f69b3a6a84f21, blob cf6f1fef139286da1563d59f036627629ea3948e. Root registró lectura2026-11-12 09:18:38UTC, fetch193.67850000038743ms, Abort5s/sin redirects/cap128KiB; RAM sin filesystem ni URLs impresas. ZIP2083B/SHA96bd98c73807d72658cae65bff8fabf744060925952d34441e03133c83c933cc igual al digest primario. CRC vector conocido correcto; local/central/nombres/métodos/tamaños/descriptores/CRC/sin symlinks/exactamente dos archivos/sin extras; manifiesto y flags verificados:

- result.json4399bytes/SHAf0a2cf72302e094e00d8e5bb3860ff83e6a0a05963d6f70522ca96c59cb77d56/CRC6da616e8.
- manifest.json259bytes/SHA548b18e809a6c2ab9d03cfd6b308633d198de5e188140923d4cacb0e1164d111/CRCe742a43b.
- Total expandido4658bytes; inventario manifiesto exacto result size/hash y flagsfalse, retención7d hasta2026-11-19T09:15:05Z.
- Logs privados: stdout1261bytes, stderr0; ambos uploaded=false; no se leyó contenido ni se expuso errorbody/stack/code/bundle/AST/payload.

El valor de cualquier referencia/URL temporal de descarga no se copió, imprimió ni persistió en este informe o por el actor en esta unidad.

### Cierre inactivo y separación de la propuesta siguiente

Tras terminal/metadata/ref congelado y aceptación Root se restaura EXACTAMENTE workflowaf862de67987090a3b0e4debc528a0f9abff0020, manual/literal false/sin inputs. Sólo workflow+este APPEND cambian respecto a bc176; helper y3189tuples fuera de ambos intactos. Respecto a BASE53176240, sólo cambia el informe.

Commit de cierre separado del run: padrebc176, expected_sha exacto, force=false, [skip ci]. Contrato externo posterior verifica ref/commit/árbol completo3191/no truncado, tres archivos completos, helperf476, workflowaf862, prefijo de informe intacto, sólo delta permitido, exactamente un run/attempt1 terminal y0jobs activos. Los hashes propios finales de informe/head/tree/CAS efectivo van fuera del cuerpo, sin autorreferencia.

STOP_WRITES. Sola inspección consumida e incomplete; ninguna autorización para otro job o aumento de cap. Sólo una evaluación READONLY posterior podrá proponer un presupuesto de parse medido y distinguir construcciones de nodos/nodos únicos/heap/tiempo bajo nueva decisión Root. operationalReadiness=false; completePackage=false; PCoff=false.


## Checkpoint de apagado — enmienda de cap PARCIAL, inactiva y sin revisión

El owner debe apagar el equipo durante una hora. Se detuvo inmediatamente la implementación nueva y toda prueba/job. Se conserva sólo el borrador ya escrito en RAM y esta nota de estado, dentro de las rutas diagnósticas aprobadas. No es una enmienda terminada ni permiso de ejecución.

BASEbc0d7382b1a3c233a77aa2ae0baa7b87a50e9e7e/treefa01aec5255327569afb8e819c20413d21271d75; workflow se mantiene EXACTOaf862de67987090a3b0e4debc528a0f9abff0020/manual/literal false/sin inputs. Único run previo43189735097/1 consumido y terminal; ninguna ejecución adicional autorizada.

Requisitos de la preparación leídos en Rootdocs279b33f83bedd251c096b538d9ee404665abdcef: brief51be52b18f8d2b24ad7ba84416e687f10c2066a0, spec5b4f14d962d043f2924d1247f4f0143ff606e068, plan9cd4dc8dc643cfb26b08e60ea3becb26ef82a4f3. Auditoría original cf6f1fef139286da1563d59f036627629ea3948e leída.

Borrador de helper guardado: 33529bytes, blobe038585284fdf266be0d885dc15357cfddfd6830, SHA-256ca187bcddcaf408c305331d306b03d82fa56337a524cd72abd2be16f414a29c1. Contiene límites separados600000allocationAttempts/600000uniqueVisitAttempts con completions separadas, progreso fuera del try del hijo y UNKNOWN explícito si no hay evidencia terminal; flag fijo --max-heap-size=256 y gate futuro heap_size_limit<=268435456 (sólo V8, nunca RSS/buffers/esbuild); pin exacto emisión2111553/SHA2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2 antes de parse. Captura/preservación de progreso incluye fallos manejados, sin canales nuevos.

Antes de la orden SAVE/CLOSE se verificó sólo gramática del borrador en SourceTextModule sin evaluate/import y comparación textual: build literal/call, privacidad, fold y los siete controles existentes permanecen exactos. No se ejecutaron nuevos controles numéricos de frontera, heap flags, Acorn, proyecto, npm, build, tests ni jobs. No se afirma que600k o256MiB basten.

PENDIENTE al retomar: completar/verificar metadata de contadores/límites/progreso fatal y cerramiento DTO; preparar paquete BASE..checkpoint para SAME-reviewer; sólo después de revisión y nueva liberación Root podría existir otra inspección. No repetir el run anterior, aumentar caps por inferencia ni activar al retomar. Este checkpoint es PARTIAL_DRAFT_UNREVIEWED; las lecturas finales de head/tree/blobs/ref/cero activos se entregan externamente, no por autorreferencia.

El prefijo completo del informe37f0195d se conserva. Sólo helper+este APPEND cambian; workflow y los otros3189blobs/modos permanecen intactos. Commit [skip ci], CAS exacto sin force. STOP_WRITES después de checkpoint/readbacks; operationalReadiness=false; completePackage=false; PCoff=false.


## Reanudación y cierre de preparación INACTIVA de la enmienda

El owner volvió y revocó SAVE/CLOSE. Se retomó desde6ecd57629a588e6ac46eabb9fe65bffce6bca4f5/treeb5b963aaa7e6403a810960c8c7ac7276567e4be6, helpere038585284fdf266be0d885dc15357cfddfd6830, informe38e22eb881e387f017d6a8f4c67a8a843de0d184 y workflowaf862de67987090a3b0e4debc528a0f9abff0020 exacto. La nota PARTIAL anterior queda como checkpoint histórico; la preparación descrita aquí queda terminada para SAME-reviewer, todavía sin autorización de ejecución.

Releídos en Rootdocs149dd4e63485e778baa4fcf50f82a5146fee600a: brief51be52b18f8d2b24ad7ba84416e687f10c2066a0; spec5b4f14d962d043f2924d1247f4f0143ff606e068; plan9cd4dc8dc643cfb26b08e60ea3becb26ef82a4f3. Conservan autoridad de PREPARACIÓN, no siguiente job. Única ejecución previa43189735097/1 consumida y terminal; cero adicionales.

### Estado preparado y límites

Helper final propuesto: 34252bytes, Git blobfd03d1e611a607b2011c2c519158e468f5e9d976, SHA-256de88e032aa15542eeaf7adf01a0e820a2904e63397032176843450a5948e0fd2. Workflow sigue byte por byteaf862, manual/literal false/sin inputs/job2min. No cambios a Native, Source, otras ramas, Rootdocs, permisos, runtime, claves, mail o Max.

La enmienda completa respecto al helper revisadof476 mantiene separados:

- allocationAttempts: cada llamada a startNode/startNodeAt/copyNode incrementa antes de permitir construcción; límite600000. Intento600001 se conserva como rechazado.
- allocationCompletions: sólo tras retornar la construcción/copia. Copias o construcciones luego descartadas no se confunden con objetos únicos del árbol final.
- uniqueVisitAttempts: sólo nodos AST tipados y todavía no vistos, después de deduplicar referencias. Límite600000; intento rechazado600001 también se conserva.
- uniqueVisitCompletions: sólo tras procesar ese nodo y encolar hijos; no se deriva de allocations.
- Progreso fuera del try del hijo, serializado también en fallos manejados con reasons allocation_cap/visit_cap distintos. Estado observed puede contener cero si ese contador efectivamente no empezó. Sin evidencia terminal válida, el padre preserva state UNKNOWN y los cuatro números null; no inventa ceros, no crea IPC/checkpoints/canales nuevos y no diagnostica OOM por inferencia.
- Flag fijo del hijo --max-heap-size=256, sin otros flags de heap; gate de argv del hijo y lectura futura node:v8 heap_size_limit positiva/entera<=268435456. Sólo V8_HEAP_ONLY: RSS, buffers externos y subprocess esbuild NO acotados por esa afirmación.
- Antes de parser/diccionario se exigen EXACTOS2111553bytes/SHA2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2. Un mismatch preserva metadata y termina incomplete; no se repinea ni reintenta.
- Los demás caps permanecen: emisión4MiB/candidatos4096/depth32/payload1MiB/fold8MiB/matches128/result64KiB/raw8MiB; hijo45s+3/comando60s+3/job2min; dos JSON/7d. No se afirma que600k o256MiB basten.

La comprobación de progreso/heap real sigue FUTURA. No hubo proceso con ese flag ni lectura real de heap, npm, Acorn, build, parser de proyecto/emisión, tests o job en esta reanudación.

### Tres ajustes necesarios al DTO del borrador

Los controles inertes RED reprodujeron tres aceptaciones indebidas del borrador: status complete con intento sin completion; metadata de heap con flag contradictorio; y control pass con cantidad/touches inconsistentes. Se ajustó sólo closedChild en tres seams:

1. La evidencia de heap requiere además sus campos cerrados kind/flag/requestedBytes/verified y las tres negativas de RSS/buffers/subprocess coherentes.
2. Para complete, ambos pares attempts/completions deben coincidir, además de concordar con parser/visitas; los fallos manejados conservan deliberadamente diferencias.
3. Para complete, casos de metadata=7/touches=0, flags de esos controles verdaderos y getter/Proxy touches0. No basta un pass aislado contradictorio.

No se cambiaron funciones de privacidad, folding, controles runtime existentes, build literal/call, plugin, opciones, package/lock/target/source pins o timeout. Comparaciones textuales contra53176240/f476 verificaron esas regiones exactas; contra6ecd verificaron que las funciones de counters/heap del borrador permanecen iguales y sólo se endureció su DTO. El report de ejecución cerrado se conserva antes del inventario posterior para no perder progreso al fallar ese readback.

### Controles realmente ejecutados: sólo metadata pequeña

Se analizó gramática con SourceTextModule sin evaluate/link/import del helper. Se ejecutaron dos VM de builtins, cada una con timeout100ms: RED sobre tres paquetes JSON fabricados y GREEN sobre diez grupos de metadata, incluyendo un AST manual de dos nodos con una referencia compartida. No se generó ni parseó fuente con Acorn, no se iteró600000veces, no se consumió un heap de256MiB, no se evaluó bundle/proyecto y no se ejecutó el helper completo. HostNodeVersion=unavailable_from_node_repl; no es cualificación cloud Node22.

Comandos exactos de evaluación usados por node_repl, tras preparar las cadenas reproducibles descritas debajo:

```js
var vm=await import('node:vm');
var crypto=await import('node:crypto');
var types=(await import('node:util')).types;
var capMetaRed=vm.runInNewContext(capMetaRedProgram,
 {types,createHash:crypto.createHash},{timeout:100});
var capMetaGreen=vm.runInNewContext(capMetaGreenProgram,
 {types,createHash:crypto.createHash},{timeout:100});
new vm.SourceTextModule(capResumeHelper); // sólo gramática
```

Para reproducir únicamente esta metadata, oldHelper es el texto del blobe038585284fdf266be0d885dc15357cfddfd6830 y newHelper es el texto del blobfd03d1e611a607b2011c2c519158e468f5e9d976; se tratan como strings, nunca como módulos. Construcción exacta de programas:

```js
const prefixes=["const HEAP_BYTES=","const EXPECTED_EMISSION=","const LIMITS=","const REASONS=","const PHASES=","const STATES=","const UNKNOWN=","const TARGET=","const flags=","const CODES=","const NAMES=","const INTRINSICS=","const PROTOS=","const CLASS_NAMES=","const ORIGINAL_BUILD=","const hash=","const own=","const hex=","const number=","const stop="];
function region(s,a,b){return s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)));}
const common=prefixes.map(p=>oldHelper.split('\n').find(x=>x.startsWith(p))).join('\n')+'\n'
 +region(oldHelper,'function closedError(','function controls(')
 +region(oldHelper,'function closedControl(','function newProgress(')
 +region(oldHelper,'function newProgress(','function fold(');
const capMetaRedProgram=common
 +region(oldHelper,'function closedChild(','function git(')
 +packetSource+redCases;
const capMetaGreenProgram=common
 +region(newHelper,'function fold(','function metadataControls(')
 +region(newHelper,'function closedChild(','function git(')
 +packetSource+greenCases;
```

packetSource exacto:

```js
function packet(){
 const progress=newProgress();progress.allocationAttempts=12;progress.allocationCompletions=12;progress.uniqueVisitAttempts=10;progress.uniqueVisitCompletions=10;
 const privacy=Object.fromEntries(['pass','proxyPrototypesSafe','ordinaryNative','crossRealmNative','crossRealmExactUnknown','spoofRejected','oversizeSuppressed','cycleBounded','rawCanaryAbsent'].map(key=>[key,true]));privacy.getterTouches=0;privacy.proxyTrapTouches=0;
 const metadata=Object.fromEntries(['pass','literal','addition','template','primitiveAddition','gettersUntouched','proxyUntouched','callNotEvaluated'].map(key=>[key,true]));metadata.cases=7;metadata.touches=0;
 return {purpose:'afw.own-literal.child.v1',status:'inspection_complete',phase:'complete',networkDenied:0,progress,heap:heapRecord(HEAP_BYTES),privacy,metadata,emission:{bytes:EXPECTED_EMISSION.bytes,sha256:EXPECTED_EMISSION.sha256,imported:false,evaluated:false},build:{literalHash:hash(ORIGINAL_BUILD),warnings:0,outputFiles:1},parser:{allocationAttempts:12,allocationCompletions:12},inspection:{nodes:10,candidates:1,folded:0,foldedBytes:0,unknown:{unsupported_ast:1},matches:[]}};
}

```

redCases exactos:

```js
const a=packet();a.progress.allocationAttempts=600001;a.progress.allocationCompletions=600000;a.parser.allocationAttempts=600001;a.parser.allocationCompletions=600000;
const b=packet();b.heap.flag='WRONG_FIXED_FLAG';
const c=packet();c.metadata.cases=6;c.metadata.touches=1;
({counterFalseCompleteAccepted:closedChild(a)!==null,wrongHeapMetadataAccepted:closedChild(b)!==null,wrongControlMetadataAccepted:closedChild(c)!==null});

```

greenCases exactos:

```js
const cases=[];
const check=(name,pass,facts={})=>cases.push({case:name,pass,...facts});
const allocation=newProgress();allocation.allocationAttempts=599999;allocation.allocationCompletions=599999;
beginProgress(allocation,'allocation');completeProgress(allocation,'allocation');
check('allocation_limit_inclusive',allocation.allocationAttempts===600000&&allocation.allocationCompletions===600000,closedProgress(allocation));
let allocationReason=null;try{beginProgress(allocation,'allocation');}catch(error){allocationReason=own(error,'o4Reason');}
check('allocation_rejected_attempt_preserved',allocationReason==='allocation_cap'&&allocation.allocationAttempts===600001&&allocation.allocationCompletions===600000,{reason:allocationReason,...closedProgress(allocation)});
const visit=newProgress();visit.uniqueVisitAttempts=600000;visit.uniqueVisitCompletions=600000;
let visitReason=null;try{inspect({type:'Program',start:0,end:0,body:[]},visit);}catch(error){visitReason=own(error,'o4Reason');}
check('unique_visit_rejected_attempt_preserved',visitReason==='visit_cap'&&visit.uniqueVisitAttempts===600001&&visit.uniqueVisitCompletions===600000,{reason:visitReason,...closedProgress(visit)});
const independent=newProgress();independent.allocationAttempts=8;independent.allocationCompletions=8;
const shared={type:'Literal',start:0,end:1,value:1};const scanned=inspect({type:'Program',start:0,end:1,body:[shared,shared]},independent);
check('unique_visit_deduplicates_not_allocations',scanned.nodes===2&&independent.uniqueVisitAttempts===2&&independent.uniqueVisitCompletions===2&&independent.allocationCompletions===8,closedProgress(independent));
const handled=packet();handled.status='incomplete';handled.phase='parse';handled.reason='allocation_cap';handled.progress=allocation;handled.parser.allocationAttempts=600001;handled.parser.allocationCompletions=600000;
const handledOut=closedChild(handled);
check('handled_failure_keeps_partial_facts',handledOut?.progress.allocationAttempts===600001&&handledOut?.progress.allocationCompletions===600000&&handledOut?.reason==='allocation_cap');
const fatal=closedProgress(own(null,'progress'));
check('missing_terminal_evidence_is_UNKNOWN',fatal.state==='UNKNOWN'&&Object.values(fatal).filter(v=>v===null).length===4,fatal);
const heapGood=heapRecord(268435456),heapBad=heapRecord(268435457),heapZero=heapRecord(0);
check('heap_numeric_metadata_only',heapGood.verified&&!heapBad.verified&&!heapZero.verified&&!heapGood.rssBounded&&!heapGood.externalBuffersBounded&&!heapGood.compilerSubprocessBounded,{limit:heapGood.heapSizeLimitBytes,overLimitVerified:heapBad.verified,actualHeapTest:false});
const good=closedChild(packet());
check('consistent_complete_metadata_accepted',good?.status==='inspection_complete'&&good.progress.allocationAttempts===good.progress.allocationCompletions&&good.progress.uniqueVisitAttempts===good.progress.uniqueVisitCompletions);
const badCounter=packet();badCounter.progress.allocationAttempts=600001;badCounter.progress.allocationCompletions=600000;badCounter.parser.allocationAttempts=600001;badCounter.parser.allocationCompletions=600000;
const badHeap=packet();badHeap.heap.flag='WRONG_FIXED_FLAG';
const badControls=packet();badControls.metadata.cases=6;badControls.metadata.touches=1;
check('inconsistent_complete_metadata_rejected',closedChild(badCounter)===null&&closedChild(badHeap)===null&&closedChild(badControls)===null,{counterRejected:closedChild(badCounter)===null,heapRejected:closedChild(badHeap)===null,controlsRejected:closedChild(badControls)===null});
let touches=0;const guarded={};Object.defineProperty(guarded,'state',{get(){touches++;throw 0;}});
const proxy=new Proxy({},{get(){touches++;throw 0;},getOwnPropertyDescriptor(){touches++;throw 0;}});
check('progress_getters_and_proxy_untouched',closedProgress(guarded).state==='UNKNOWN'&&closedProgress(proxy).state==='UNKNOWN'&&touches===0,{touches});
({passed:cases.filter(x=>x.pass).length,total:cases.length,cases});

```

Resultados saneados reales, sin source/payload de aplicación:

```json
{
  "kind": "handcrafted_metadata_RED",
  "vmTimeoutMs": 100,
  "hostNodeVersion": "unavailable_from_node_repl",
  "cases": 3,
  "result": {
    "counterFalseCompleteAccepted": true,
    "wrongHeapMetadataAccepted": true,
    "wrongControlMetadataAccepted": true
  },
  "projectOrParserOrHeapRun": false
}
```

```json
{
  "kind": "handcrafted_metadata_GREEN",
  "vmTimeoutMs": 100,
  "hostNodeVersion": "unavailable_from_node_repl",
  "projectParserImported": false,
  "actualHeapTest": false,
  "result": {
    "passed": 10,
    "total": 10,
    "cases": [
      {
        "case": "allocation_limit_inclusive",
        "pass": true,
        "state": "observed",
        "allocationAttempts": 600000,
        "allocationCompletions": 600000,
        "uniqueVisitAttempts": 0,
        "uniqueVisitCompletions": 0
      },
      {
        "case": "allocation_rejected_attempt_preserved",
        "pass": true,
        "reason": "allocation_cap",
        "state": "observed",
        "allocationAttempts": 600001,
        "allocationCompletions": 600000,
        "uniqueVisitAttempts": 0,
        "uniqueVisitCompletions": 0
      },
      {
        "case": "unique_visit_rejected_attempt_preserved",
        "pass": true,
        "reason": "visit_cap",
        "state": "observed",
        "allocationAttempts": 0,
        "allocationCompletions": 0,
        "uniqueVisitAttempts": 600001,
        "uniqueVisitCompletions": 600000
      },
      {
        "case": "unique_visit_deduplicates_not_allocations",
        "pass": true,
        "state": "observed",
        "allocationAttempts": 8,
        "allocationCompletions": 8,
        "uniqueVisitAttempts": 2,
        "uniqueVisitCompletions": 2
      },
      {
        "case": "handled_failure_keeps_partial_facts",
        "pass": true
      },
      {
        "case": "missing_terminal_evidence_is_UNKNOWN",
        "pass": true,
        "state": "UNKNOWN",
        "allocationAttempts": null,
        "allocationCompletions": null,
        "uniqueVisitAttempts": null,
        "uniqueVisitCompletions": null
      },
      {
        "case": "heap_numeric_metadata_only",
        "pass": true,
        "limit": 268435456,
        "overLimitVerified": false,
        "actualHeapTest": false
      },
      {
        "case": "consistent_complete_metadata_accepted",
        "pass": true
      },
      {
        "case": "inconsistent_complete_metadata_rejected",
        "pass": true,
        "counterRejected": true,
        "heapRejected": true,
        "controlsRejected": true
      },
      {
        "case": "progress_getters_and_proxy_untouched",
        "pass": true,
        "touches": 0
      }
    ]
  }
}
```

Los valores600000/600001 se establecieron en registros manuales para comprobar el borde; no son mediciones reales de Acorn. La prueba de heap usa sólo números literales268435456/268435457/0 en heapRecord; no prueba soporte de flags ni consumo de memoria. El control de deduplicación conserva8completions de allocation modeladas y observa2visitas únicas reales sobre ese AST manual, sin equiparar ambos dominios.

### Paquete de revisión, preservación y cierre

Rango completo de SAME-reviewer:53176240de1fcac9d9a423a62ec44cea1e88b3e8..HEAD externo, incluyendo todo el historial de informes. Rango de esta reanudación:6ecd57629a588e6ac46eabb9fe65bffce6bca4f5..HEAD. Ambos sólo afectan helper+informe respecto a sus bases; workflowaf862 exacto. Se conserva íntegro el prefijo38e22eb... y con él la evidencia del primer run y del apagado. No se sobrescribe historia.

Commit con padre6ecd, [skip ci], expected_sha6ecd/force=false. Criterio externo de cierre: ref/commit/árbol completo no truncado3191blobs,3189tuples fuera de helper+informe intactos,3188originales f5 preservados, tres archivos completos leídos, workflow manualfalse, prefijo de informe exacto, un solo run histórico terminal/attempt1 y cero adicionales/activos. Head/tree/blob final del informe y CAS/readbacks efectivos van en contrato externo, sin autorreferencia.

Preparación terminada INACTIVA; SAME-reviewer y nueva decisión Root pendientes. No autoactivación, nuevo job, rerun o cambio de cap por inferencia. STOP_WRITES al cerrar. operationalReadiness=false; completePackage=false; PCoff=false.


## Nueva medición acotada O4 consumida — inspección completa e inactiva al cierre

Liberación nueva leída: docs/superpowers/briefs/2026-11-12-own-import-literal-cap-single-inspection.md @3a94af508f4b017741adf0b1f4916b2fb8e6c713, blob c00392d0ff7ff543c8d0f2dbe1e3f451f8967769. SAME-reviewer Spec/Quality aprobado sin findings, revisión561388bde50f303d771091432202dd7b308db53f y paquete04acf771. Esta autorización consumió una medición NUEVA con parámetros revisados a partir del agotamiento medido previo, no un rerun del job antiguo. La inspección43189735097 conserva su resultado incomplete y su entitlement consumido.

BASEd0cfcac70811cd6eb23edd416e579d402955626c/árbolcb2716898870dc835f73ce2349e82b5b6c2b87a5; helperfd03d1e611a607b2011c2c519158e468f5e9d976; informe previo c5800106d8b8c1810a5e5a8657d2fdf7e10a01b8; workflow inactivoaf862de67987090a3b0e4debc528a0f9abff0020. Se verificaron antes de activar head/tres archivos/tree completo/un único run viejo terminal/sin activos. Este APPEND conserva el prefijo íntegro.

### Activación, fuente y comandos exactos

Sólo header del workflow a push/rama exacta/selfpath exacto, nombre ONE INSPECTION, evento push y eliminación única de false&&; normalización inversa igual al workflowaf862 preparado. Cuerpo/pins/permisos/Node/heap/caps/budgets no cambiaron. Activación blob2f379f49ad4f8aa27ab5f862f5f0e342a700cc37/SHAfbc1a784900dfdf91942ba4cc22f389832ff5b7b58177a2ee11e9f0b72673698.

Commit real86d5aca565bb460b19191880547440248929b6b8/árbol1393aa704b4e0a64683716452a3420a7f7590bc8, padre d0cfcac7; CAS exacto force=false. Tree3191/no truncado y3190tuples fuera de workflow idénticos. Ref permaneció congelado en86d5 hasta terminal/metadata y aceptación del ZIP primario. No hubo otra activación, cambio de helper o elevación automática de cap.

Run [43209668123](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43209668123), push/attempt1/job único131153755154: TERMINAL SUCCESS. run_started_at2026-11-12T11:30:03Z/updated_at2026-11-12T11:30:43Z; intervalo metadata40s, no duración fina de parser ni medición de memoria pico. Setup/checkout/Node/install/inspección/preservación/upload/metadata/gate final con conclusión success. El gate final y el DTO primario confirman inspection_complete, no sólo continue-on-error de un paso.

Comandos del cuerpo revisado:

```text
timeout --signal=TERM --kill-after=3s 25s npm ci --ignore-scripts --no-audit --no-fund
timeout --signal=TERM --kill-after=3s 60s node diagnostic-code/scripts/diagnostics/own-import-literal-inspection.mjs
```

El hijo usó el flag fijo --max-heap-size=256; startup leyó límiteV8heap268435456bytes y verificó argv/ausencia de flags en conflicto. No es RSS, heap usado/pico, memoria de buffers externos ni límite del subprocess esbuild. Hijo45s+3/comando60s+3/job2min no ejercitados como deadline: exit0/signalnull/spawnFailedfalse/terminationnull.

### Hechos de la medición

Misma emisión exacta2111553bytes/SHA2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2, identityMatches=true, warnings0, outputFiles1, build literal79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b, compiler0.28.2/profilefinite_trial_event. imported=false/evaluated=false. No test fue importado o ejecutado; no Miniflare, SDK/auth factory o I0 de aplicación.

Acorn8.18.0 completó parse y diccionario con:

- allocationAttempts/completions289982/289982.
- uniqueVisitAttempts/completions289702/289702.
- Ambos debajo de600000, conservados por separado; no se atribuye la diferencia280 a una clase específica de nodos.
- candidates793; folded363 ocurrencias de payload estático, no necesariamente363mensajes únicos; foldedBytes20379 es el contador de presupuesto de fold que incluye intermedios.
- unknown426unsupported_ast+4missing_payload=430; los desconocidos no se convierten en no-error.
- matches0 para hash9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff; conclusión exacta NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY, sin atribución a módulo.

Esto descarta el hash sólo entre esas363ocurrencias que el lenguaje de fold pudo determinar en esta emisión. No descarta mensajes dinámicos, alias, formas fuera del diccionario, throws implícitos/nativos ni identifica el origen ejecutado. El Error own9b4 sigue SIN RESOLVER. No es reparación, ordinary-suite green, guardia ni PCoff. Sólo este run/emisión completó bajo los límites configurados; no se generaliza suficiencia de600k/256MiB a otros inputs.

Fuente3188hojas/modos antes/después c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7 igual; helperHashde88e032aa15542eeaf7adf01a0e820a2904e63397032176843450a5948e0fd2 igual a fd03. Privacidad y siete metadata controles padre/hijo pass/getter0/Proxy0; networkDenied0; no raw logs subidos.

DTO cerrado relevante, conservado desde auditoría primaria independiente:

```json
{
  "status": "inspection_complete",
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "workflowRef": "refs/heads/diag/afw-own-literal-20261112",
    "trigger": "push",
    "workflowSource": "86d5aca565bb460b19191880547440248929b6b8",
    "testSource": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
    "runId": "43209668123",
    "attempt": 1,
    "node": "v22.23.4",
    "os": "Ubuntu24.04",
    "mode": "SYN_COMPILE_ONLY_NO_IMPORT",
    "childContext": "MODELED_STERILE_SYNTHETIC",
    "workflowContextIsAdmissionAuthority": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false
  },
  "helperHash": "de88e032aa15542eeaf7adf01a0e820a2904e63397032176843450a5948e0fd2",
  "expectedEmission": {
    "bytes": 2111553,
    "sha256": "2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2"
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
  "metadata": {
    "pass": true,
    "cases": 7,
    "touches": 0,
    "literal": true,
    "addition": true,
    "template": true,
    "primitiveAddition": true,
    "gettersUntouched": true,
    "proxyUntouched": true,
    "callNotEvaluated": true
  },
  "progress": {
    "state": "observed",
    "allocationAttempts": 289982,
    "allocationCompletions": 289982,
    "uniqueVisitAttempts": 289702,
    "uniqueVisitCompletions": 289702
  },
  "execution": {
    "exit": {
      "code": 0,
      "signal": null,
      "spawnFailed": false
    },
    "termination": null,
    "heap": {
      "kind": "V8_HEAP_ONLY",
      "flag": "--max-heap-size=256",
      "requestedBytes": 268435456,
      "heapSizeLimitBytes": 268435456,
      "verified": true,
      "rssBounded": false,
      "externalBuffersBounded": false,
      "compilerSubprocessBounded": false
    },
    "emission": {
      "bytes": 2111553,
      "sha256": "2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2",
      "identityMatches": true,
      "imported": false,
      "evaluated": false
    },
    "build": {
      "profile": "finite_trial_event",
      "literalHash": "79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b",
      "compiler": "0.28.2",
      "warnings": 0,
      "outputFiles": 1
    },
    "parser": {
      "name": "acorn",
      "version": "8.18.0",
      "sourceType": "module",
      "errorRecovery": false,
      "allocationAttempts": 289982,
      "allocationCompletions": 289982
    },
    "inspection": {
      "nodes": 289702,
      "candidates": 793,
      "folded": 363,
      "foldedBytes": 20379,
      "unknown": {
        "unsupported_ast": 426,
        "missing_payload": 4
      },
      "matches": [],
      "conclusion": "NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY",
      "moduleAttribution": false
    },
    "networkDenied": 0,
    "rawFiles": [
      {
        "name": "raw.stdout",
        "bytes": 1678,
        "sha256": "b1501398f90d56d2417341c58af1acec6810068a414d95367364dac2b1d15959",
        "uploaded": false
      },
      {
        "name": "raw.stderr",
        "bytes": 0,
        "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "uploaded": false
      }
    ],
    "rawLogsUploaded": false
  }
}
```

### Custodia primaria y auditoría única Root

Listing especializado del actor por run/nombre exactos: ID13940628317, afw-own-literal-43209668123-1, 2381bytes, digestsha256:08d675baf81b89f4027c0c355894ed9096c19b9c010c27d7a87f38d3132406db, expired=false, created_at2026-11-12T11:30:37Z, expires_at2026-11-19T11:30:36Z; run/head/branch/repositoryId corresponden a43209668123/86d5. Tiempo medido810ms, sin timeout impuesto por la herramienta. No se leyó el endpoint genérico de artefacto ni logs.

Root realizó la ÚNICA descarga/auditoría de bytes; actor0downloads. Fuente inmutable de la aceptación: docs/superpowers/reviews/2026-11-12-own-import-literal-cap-primary-audit.md @9adea2bc2ccc50105aa8deb9f9db81e39310f3e4, blob559cdede226e3a76f0c942f8a1bafebd1b223d88. No se presenta como auditoría ZIP propia del actor.

Root registró lectura2026-11-12 11:33:31UTC, fetch579.6124ms, Abort5s/no redirects/cap128KiB, RAM sin filesystem ni URLs impresas. ZIP2381bytes/SHA08d675baf81b89f4027c0c355894ed9096c19b9c010c27d7a87f38d3132406db coincide con digest primario. CRC vector conocido correcto/local-central/exact2paths/sin extras/sin symlinks/manifiesto/inventario/schema/contexto/flags verificados:

- result.json5842B/SHA5b3d3af2a87448be297d513b416f5fb0e3f92820f683633eb9dcd17b258ae3e2/CRC9dfd63bb.
- manifest.json259B/SHAe93c869fe2d7bcb694e5a015da11a7a261e5b3909b6c671387a1a92ab7361cf3/CRC9ffdd816.
- Total expandido6101bytes; retención7d hasta2026-11-19T11:30:36Z.
- Logs privados sólometadata: stdout1678bytes/hashb1501398f90d56d2417341c58af1acec6810068a414d95367364dac2b1d15959; stderr0/emptyhash. uploaded=false; no se leyó su contenido.

Ningún download_url/file_uri/URL firmada, header, payload, stack, bundle o AST se imprimió o persistió por el actor en esta unidad. El artefacto contiene exclusivamente los dos JSON cerrados.

### Cierre y alcance final

Tras terminal/ref congelado/metadata/auditoría Root, restauración EXACTA del workflowaf862/manualfalse/sin inputs y sólo este APPEND del informe. Helperfd03 y los3189tuples fuera de workflow+informe intactos respecto al run86d5. Respecto a BASEd0cfcac7 sólo cambia el informe.

Commit de cierre separado de fuente de ejecución, padre86d5, expected_sha exacto, force=false, [skip ci]. Contrato externo prueba ref/commit/árbol completo3191/no truncado,3188originales f5 protegidos, tres archivos leídos completos, helperfd03/workflowaf862/prefijo de informec580 intactos. Totalruns=2, ambosattempt1/terminales, ningún adicional/activo. Los hashes propios finales del informe/head/tree y resultados efectivos van externamente, no por autorreferencia.

NativeSource sólo ejecutó/preparó unidades PURE separadas, según Root; no se tomó eso como prueba de actual I0. ActualNative16 continúa HELD hasta sus propias condiciones. Esta unidad no autoriza otra inspección, mayor cap ni cambio de implementación. STOP_WRITES al cerrar; operationalReadiness=false; completePackage=false; PCoff=false.
