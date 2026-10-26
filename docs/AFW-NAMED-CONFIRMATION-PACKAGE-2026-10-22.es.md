# Paquete cloud de confirmación con artefacto congelado

22 de octubre de2026. AFW, repositorio tokenizartinfo-ops/agent-friendly-web. Ampliación acotada del builder y Workflow administrativos existentes; sin nueva plataforma ni credenciales GitHub.

PR568 integró la confirmación por el Workflow privado: merge439958b182a4e7f450d8bb7ebe381047d3d7a388, árbol9878dab90c539d6b23ace3b68c150bfe6d6b79ab, CI39813036686 aceptada con2805PASS/0FAIL/1omitida existente. Eso acepta la fuente, no una ejecución alojada.

## Interfaz pública vigente —25 de octubre de2026

El Workflow público ya no admite policy_json ni otra entrada para permisos reales. Tanto el disparo manual como una PR usan siempre el fixture ficticio vencido0→1. Las instrucciones históricas inferiores sobre ese input quedan retiradas; la CLI privada existente conserva su contrato y límites.

La compilación común produce template.mjs y template.json sin sujeto, grant ni consentimiento. materializer.mjs es un módulo de datos sin dependencias de Node, archivos, red, ejecución de código ni publicación. frozen-artifact.json conserva los bytes históricos exactos y su orden JSON para reconstruir la identidad del bundle. private-template-build.json registra revisión/árbol del productor, hashes y bytes independientes de plantilla, helper y artefacto congelado. También se conserva el paquete antiguo index.mjs/build.json/policy.json, siempre ficticio e inerte. Retención: siete días en Actions.

En el entorno privado autorizado, el controlador debe cotejar todos los campos de procedencia/artifactKey/workerHash/programHash del manifiesto contra el recibo cualificado y el artefacto congelado, además de verificar run/head y hashes; no son autoridad adicional acreditada por el helper. Debe hacerlo antes de materializar; no basta un manifiesto que declare su propio hash. La política canónica real se incorpora únicamente al literal reservado de la plantilla y permanece en memoria/custodia privada. El helper exige expectedTemplateHash independiente, literal único, metadatos exactos, caps UTF8 de2MiB/65536bytes, operación confirm_named y duración máxima600000ms; conserva errores genéricos y captura entradas antes del primer await. policyHash es SHA de la política: NO sustituye planHash, SHA de JSON.stringify({artifact,policy}), que exige el runtime.

Materializar no comprueba identidad, consentimiento vigente, reloj actual, permisos ni autoridad. El controlador debe validar los datos reales y la ventana original antes/después de su propia operación; el runtime mantiene su validación completa y cierre por vencimiento. Nunca ampliar ventanas, reutilizar admisiones inciertas ni ejecutar el plan0→1. Una plantilla sin materializar no es un operador desplegable.

La cualificación usa el módulo histórico completo: HTTP404, Workflow bloqueado sin red para el fixture vencido, confirmación sintética con siete GET y un recibo/aceptación, y resultado incierto sin aceptación ante un segundo deployment activo. Son pruebas en el runner cloud con proveedor e identidades ficticios; no invocan AFW alojado ni prueban suscripción, aviso útil, retirada o PC-off. No hay nuevos paquetes, secretos, servicios ni cambios del Worker congelado. La aceptación de PR/CI y del paquete exacto se conserva en PR594/tracker497; no anticiparla desde este diseño.

## Resultado y límites (registro histórico del22 de octubre)
El paquete combina el operador de la revisión actual con los bytes históricos del Worker fuente3d4e9d5d20b6185a5d3dcfceae191046e921e1cb, árboleaf5cfd62ba63e693dc944b7134981581cfc8ed8. Los pins en scripts/mcp-confirmation-frozen-artifact.json corresponden al recibo primario de código observado22oct15:44UTC: artifactKeyc8343319…, Worker26ec0366…/1792585bytes y programa f6f517c3…. Los artefactos GitHub de esa fuente permanecían disponibles al consultar22oct; sus ZIP tienen otro digest, que no es el SHA del Worker.

El Workflow reconstruye el Worker en un checkout separado de SU revisión y lockfile, verifica Git antes/después y exige los hashes registrados. Compila el operador desde SU revisión actual verificada. El manifiesto separa operatorSourceRevision/Tree de artifactSourceRevision/Tree: nunca atribuye el Worker antiguo al código nuevo del operador.

Por defecto y en PR produce un plan sintético vencido start0/expires1. Las pruebas nativas cargan el paquete real, comprueban HTTP404 y una instancia de Workflow bloqueada incluso con los tres flags, sin red, D1 ni Container. Nunca invocar ese paquete en remoto.

El manual de main acepta solo un JSON no secreto confirm_named, con su ventana original todavía vigente antes/después de compilar. No la amplía ni crea permisos. Rechaza otros artefactos, publicación, identidad manual, valores de secretos y planes reales retirados. Los inputs de Actions y artefactos no deben recibir OTP, tokens, datos de clientes ni un consentimiento supuesto.

El output index.mjs/build.json/policy.json se conserva siete días en Actions. No hay credenciales Cloudflare, upload, despliegue, configuración, invocación ni suscripción desde este Workflow. Los archivos temporales/builds existen únicamente en el runner cloud. La PR portadora y tracker497 conservan RED/GREEN, revisión, integración y ejecución manual exactas; no anticiparlas desde este documento.

## Archivos y verificación
- Builder CLI: scripts/build-mcp-named-confirmation.mjs, revisión del operador + artifact.json + policy.json. Conserva errores saneados y verifica Git de entradas actuales antes/después.
- Pins: scripts/mcp-confirmation-frozen-artifact.json.
- Workflow: .github/workflows/afw-named-confirmation-package.yml.
- Fixture sintético vencido: test/fixtures/inert-named-confirmation-policy.mjs.
- Cualificación con reconstrucción real: node --test test/mcp-named-confirmation-package.native.mjs desde el Workflow, con AFW_FROZEN_ARTIFACT_PATH establecido. Ese archivo native.mjs no pretende ejecutarse sin el artefacto en npm test común.
- Cierre: artefacto histórico exacto + operador actual, paquete inerte bloqueado, rechazos de procedencia/credenciales/plazo y manifiesto de bytes/procedencias comprobado, CI y revisión aceptadas.

## Continuidad alojada separada
El guardado humano22oct produjo donor56689a0f, pero el Dashboard también añadió containers:[{class_name:AfwOwnEventNode}] a ese donante del operador y mantuvo flags históricos true. No se promovió. El cierre de custodia creó ba403723-4128-4ab9-b131-7860c860fa96 desde bytes/config exactos6509, heredando SOLO el secreto de lectura del donor explícito. Verificado16:26:30UTC: flagsfalse, Containers[], cron[], tails[], instancias originales0; canary1b751b11 intacto. Recuperación6509 conservada; no copiar Containers del operador al canary ni a la inversa.

Después de aceptar este paquete faltan su preparación alojada cerrada y un nuevo ensayo propio coordinado con autorización, catálogo y suscripción nativa, entrega firmada, revisión cloud útil y retirada física verificadas. Solo después se acuerda PC-off y, por separado, preview/aprobación de Max. operationalReadiness=false; monitor local PAUSED.

## Aceptación posterior — 22 de octubre, comprobación 19:58 UTC

La preparación alojada cerrada indicada como pendiente en el registro anterior quedó completada. [PR569](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/569) aceptó el paquete con procedencias separadas; [PR570](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/570) cualificó también la ruta de confirmación con el módulo histórico completo y conservó sus límites. Package 39824482256: 14/14; main CI39825015520: 2805 aprobadas, 0 fallos y 1 skip existente, lint sin errores y cinco builds aprobados. Esa cualificación usó fixtures nativas y proveedor sintético; no confirma una invocación alojada de confirm_named.

Operador cerrado `bb9a7c0d-5a89-4d3f-b704-43995e7f0f44`, deployment `0515800d-62f8-4973-8db1-05bcda8ffb2e` al 100%; módulo compilado `4cbdebbe03992e54c7bc464996133c253b862d4f99094275e456e60093e84172`, 1918891 bytes. Lectura primaria de las 19:58:49 UTC: tres flags false, siete bindings y nombres de secretos preservados, cron []; canary `1b751b11` con ocho flags false y cron [], aplicación original sin instancias activas. Rollback cerrado `ba403723` conservado. El bundle alojado start0/expires1 sigue inerte: NUNCA invocarlo.

Faltan la confirmación nombrada real y la cadena propia completa de catálogo, suscripción, aviso firmado, revisión útil y retirada nativa. El gate público de las 19:58:15 UTC permaneció unknown/active_related_incident por `v967mz6rrcxw` en monitoring, sin atribución demostrada a AFW; no habilita nueva verificación. Después del primer recorrido aceptado se cerrará el contrato durable de la ocurrencia posterior de [PR571, DRAFT](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/571), antes de implementarla o acordar PC-off. [Recibo de continuidad](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6350064135). La ejecución del seguimiento cloud de correo es una capacidad separada. operationalReadiness=false; sin nuevo permiso, ensayo, guardia o envío a Max.
