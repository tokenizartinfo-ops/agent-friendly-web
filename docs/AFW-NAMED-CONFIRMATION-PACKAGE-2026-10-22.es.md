# Paquete cloud de confirmación con artefacto congelado

22 de octubre de2026. AFW, repositorio tokenizartinfo-ops/agent-friendly-web. Ampliación acotada del builder y Workflow administrativos existentes; sin nueva plataforma ni credenciales GitHub.

PR568 integró la confirmación por el Workflow privado: merge439958b182a4e7f450d8bb7ebe381047d3d7a388, árbol9878dab90c539d6b23ace3b68c150bfe6d6b79ab, CI39813036686 aceptada con2805PASS/0FAIL/1omitida existente. Eso acepta la fuente, no una ejecución alojada.

## Resultado y límites
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
