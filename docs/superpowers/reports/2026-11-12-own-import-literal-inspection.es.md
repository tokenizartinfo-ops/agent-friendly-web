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
