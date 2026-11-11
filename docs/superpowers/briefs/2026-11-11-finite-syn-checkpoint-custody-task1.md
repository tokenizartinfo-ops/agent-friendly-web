# Task1 — custodia SYN antes de full9
11Nov2026. Lee este brief primero: autoridad única de esta ampliación. Implementador existente budget_chronology_impl; no helpers/reviewer. GLOBALBASE29681cae2bf1094ec5c66d5b2784254f77bec697; SourceBASEoriginal8452b974606171af39ee02fb41ddb124e7701ac1/tree50b818a164460052fd77344bf3bb0ddb4d6f2886; REDfeature preservado0de4016401893ee2478815bfb80dd54b92fcc5d3/treead321f3b9b5aca42d478bccafefb88a114a77e4e. Éste es BASE actual antes de GREEN. Rootdocs almacena requisitos; Source es único destino de código.

## Requisitos vinculantes
Spec docs/superpowers/specs/2026-11-11-finite-syn-checkpoint-custody-design.md en este mismo commit Rootdocs: leer completa. Conserva todos sus valores y las tres resoluciones finales. La autorización full9 del brief full-lifecycle-task1 queda suspendida: NO generar I0 ni lanzar producer/consumer hasta nueva liberación nominativa Root. No repetir observador faseA/old56/diagnósticos previos ni Task2.

Sólo4paths Source:
- crear test/fixtures/finite-checkpoint-custody.mjs;
- crear test/finite-checkpoint-custody.test.mjs;
- recrear/retirar .github/workflows/afw-finite-budget-qualification.yml;
- append docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md.
Todos los demás blobs/modes/types exactos8452, incluidos los5MJS de observador, native.test, helpers nativos, SDK/locks/config/descriptor. No editarRootdocs. No creación de environment/secret/credenciales por el implementador. Environment concreto preparado por Root afw-finite-syn-checkpoint/27007821967, única ramaSource y0tags, AÚN SIN CLAVE. No inspeccionar valores.

## Entregable y APIs
Un helper Node-only de sellado/apertura de directorios regulares byte-exact con límites/patología/errores y recibo descritos en spec. API pública export sealDirectory/openDirectory; define parámetros nominales legibles y CLI seal/open/key-preflight si la integración lo necesita. Clave por env, nunca argumentos. Cipher y contexto exactamente según spec, sin dependencias nuevas. Kind separa checkpoint/positive-result/producer-failure/consumer-failure. Ninguna importación en bundles Worker/M/QA.

La prueba Node debe ejercitar roundtripbinario, autenticidad/tag/key/context, esquema/rutas/colisiones/links/especiales/límites, no-overwrite/no-output-on-fail, staging allowlisted/no marcaSYN en outputs públicos, y una ida/vuelta en procesos diferentes sin clave en args/logs. No necesitar credencial real ni actual checkpoint. Pruebas criptográficas con claves CSPRNG efímeras de Node; no mocks del cipher.

## Pasos ejecutables de esta fase
1. Verificar ref/tree/AGENTS y los blobs protegidos;0runs de TEMP actual. Detener si Source cambió o hay trabajo activo.
2. Escribir nuevas pruebas primero. Un RED de API ausente es una prueba de feature faltante, no reproducción de fuga. No introducir implementación insegura para fabricar RED. Ejecutar un TEMP PURE-ONLY, sin environment/secret/native/deps si sólo usa Nodebuiltins; mismo pushbranch+selfpath/CAS/readback/attempt1 y Node22. Conserva log y manifiesto seguro del RED, no un dump de datos.
3. Implementar helper; probar GREEN con otro commit TEMP PURE-ONLY consciente, sin repetir RED. Si importa otros módulos no permitidos, STOP. No instalar paquetes nuevos; syntax+eslint conforme configuración del repo (npmci del lock sólo si necesario para lint).
4. Verificar propias pruebas, Node-onlyclosure y comparación recursiva de todos los blobs fuera de4paths. El informe distingue conteos custodia de8Q+P1; no atribuir9 a esta fase.
5. Retirar TEMP y append informe con Source/run/attempt/jobs/artefactos/inventarios/readbacks/limitaciones. Retornar DONE_WITH_CONCERNS, HEAD/tree/blobs/cuenta exacta de tests/refs. STOP sin full9.

Root integrará después la orquestación3jobs en una segunda liberación acotada del mismoTask1: prepare seal/open antes y después deuploadexactID, coldrecovery original, resultado cifrado y logs privados. Puedes describir el cableado pendiente en tu informe, pero NO dejar un trigger full9 armado ni hacer mutaciones remotas de configuración.

## Verificación y transporte
TEMP se filtra exclusivamente a propia ruta y ramaSource; checkoutgithub.sha/persistcredentialsfalse/fetchdepth1; read-onlyephemeral GITHUB_TOKEN contents:read/actions:read, cancel-in-progressfalse, run_attempt1. Artifacts seguros sólo de pruebas sintéticas públicas; no state/ ni checkpoints existentes. Cada upload exige mismoID/download+inventario/bytes/SHA/source/run/attempt; conservar máximo3intentos2s/5s sólo ante fallo, nunca latest/name fallback. CongelarSource activación→terminal, retirarTEMP antes dehandoff. Falla inesperada: preservar/retirar/NEEDS_CONTEXT ySTOP sinretry.

No lib/worker/config/package/lock/SDK/descriptor/main/PR/publish/OAuth/OTP/Cloudflare/Container/cron/client/Max/mail/newchat. operationalReadiness=false;completePackage=false;PCoff=false. MismoTask1, no segundaimplementaciónparalela, revisión fresca de Spec+Quality al final delfull9.

## Enmienda ejecutable — tamaño/streaming
Root verificó el RED43115730088/1 (job130843094053):1test/0pass/1falloesperadoAPIausente; gateSUCCESS y exactsameIDartifact13899040691/1091bytes/SHA7cfe6a92c6be54c34834fa0a5319962cabdece86aefd269293be4808ddae8376; manifiesto377B/SHA5727cf25df2dc5a8bec656adfdf06460880abc370cc700356a146353a1ca4c80. No reproducir elRED.

Spec de ESTE commit sustituye el formato y los límites anteriores: JSONL por chunks≤65536B, gzip antesGCM;512MiB bytes nativos/768MiB JSONL expandido/128MiB sobre/128KiB registro/4096files. Autenticar GCM antes de gunzip; primera pasada valida TODO sin destino, segunda restaura los mismos bytes autenticados. No string/buffer monolítico de512/768MiB ni base64 del fichero entero. Rechazar compresión/path/inventario/ratio fuera de límites, con errores saneados. Mantener APIs nominales y4paths.
Se autoriza retirarTEMP delRED y actualizar las pruebas al nuevo formato, implementar helper y UN GREEN pure-only conforme pasos3–5. No tocarSourcesduranteunrun. El inventario real230MB comunicado sólo fundamenta el límite; no lo leerás ni usarás en pruebas. Datos unitarios sonSYN propios/pequeños y límites negativos por registros/contadores cerrados, no512MBde RAM artificial para cada caso. Si un punto de formato no se deduce, pregunta antes de mutar. full9/I0/clave real siguen prohibidos hastaRoot.
