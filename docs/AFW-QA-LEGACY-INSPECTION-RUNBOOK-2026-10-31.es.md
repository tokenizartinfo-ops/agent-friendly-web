# Ensayo cerrado de inspección del historial QA
Fecha: 31 de octubre de 2026. Preparación; NO ejecutado.

## Identidad y resultado
PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA privada; ORIGIN api.cloudflare.com/client/v4; recurso permitido agent-friendly-web-independent-closure-qa. ALLOWED_ACTION: conservar la base c570, cargar una candidata cerrada e inactiva, activarla una vez, crear una única instancia de afw-own-qa-private-bootstrap para inspect_legacy y restaurar c570 una vez. Sin OAuth, permisos, secretos, DDL, suscripciones, cron, Container, ARM nominal o datos de Max.

BASE c570b60b-95dc-48e1-89f3-9c4651691dbc: closed-rollback.mjs, 395915 bytes, SHA256 4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f. Antes de cada efecto comprobar origen, revisión, versión y deployment actuales. La última lectura de versión no sustituye inventarios frescos.

## Gates previos
1. CI y revisión de la fuente exacta. El RED debe fallar por el comportamiento esperado, no por maquinaria RPC.
2. Ejecutar afw-qa-legacy-baseline-qualification.yml UNA vez en main. Su único GET autenticado obtiene BASE exacta; valida tamaño/hash y ejecuta la misma matriz nativa contra esos bytes. El artefacto contiene sólo recibo saneado; el código privado queda en el runner efímero.
3. Verificar BASE recuperable, 31 bindings de esa VERSION (no los 32 settings globales), catorce flags false, siete políticas vacías, configuración/runtime y exports originales. Sin cambios de namespace, migraciones, bindings, rutas o exposición.
4. Lectura fresca completa: canary y operador cerrados en los pins comprobados, cron/tails vacíos de los tres, QA no expuesta, aplicación propia sin instancias activas, inventario íntegro de namespaces y Workflows propios terminales, sin nuevas definiciones QA ajenas. Consultar una vez el estado público del proveedor. La resolución pública no acredita AFW.
5. Guardar intención durable en issue497: revisión y hashes exactos de wrapper/context/BASE, ID opaco, ventana absoluta de hasta cinco minutos y cierre separado finito de hasta tres minutos, pins/deployments iniciales y contadores máximos. Ventanas anteriores nunca se reutilizan.

## Candidata y efecto único
- API MODERNA POST /accounts/{account}/workers/workers/{QA}/versions, query deploy=false explícita. Los tres módulos exactos son index.mjs (wrapper revisado), closed-rollback.mjs (BASE sin alterar) e inspection-context.mjs (JSON serializado con el ID/revisión/BASE y fechas originales). Sin reemplazos secuenciales de placeholders.
- Para cada binding BASE31: {name, type: inherit, version_id: c570...}. Conservar runtime/exports y demás campos de configuración presentes permitidos; no copiar campos readOnly. No migrations. Toda reconciliación de namespaces debe estar vacía.
- Carga máxima UNA. Readback independiente de la versión creada: tres nombres/tipos/tamaños/hashes exactos, main index.mjs, 31 bindings expandidos iguales a BASE y runtime/exports conservados. Verificar BASE de nuevo recuperable. La candidata sigue al 0%.
- Activación máxima UNA mediante deployment al 100%. Confirmar ACK e independiente versión/deployment propios. ACK incierto sólo admite reconciliación/retirada; no crea Workflow.
- Instancia máxima UNA: afw-qa-legacy-inspect-{ID}, params exactos {operation:inspect_legacy,inspectionId:ID}. La envoltura exige timestamp nativo, captura única no cacheada, plazo padre original de cinco segundos y salida tipada de como máximo 4096 bytes.
- Consulta finita del ID conocido; nunca repetir create, reanudar, ampliar plazo ni abrir otra ocurrencia. Un fallo por propagación de DO no justifica otra instancia.

## Restauración y aceptación
Antes del único POST de restauración, releer puntero/configuración/hashes. Si aparece un deployment/version ajeno, no sobrescribirlo. Si ya está BASE, comprobar cierre sin atribuirse una escritura. Si sigue la candidata propia exacta, restaurar únicamente BASE conocida. ACK incierto permanece incierto: sólo lecturas de reconciliación, nunca repetir POST.
Después comprobar de forma independiente BASE al100%, módulo/hash/runtime/bindings originales, canary/operador sin cambios, cron/tails/exposición/Container/Workflows y namespaces. No borrar historial ni versiones por este plan. Si un Workflow no resulta terminal o un resultado sigue incierto, documentarlo y no afirmar cierre íntegro.
El adaptador GHA anterior de restauración de un solo módulo NO valida esta candidata de tres módulos; no reutilizar su claim consumido. Este runbook exige verificación específica de los tres hashes antes de cualquier efecto.
La lectura sólo clasifica presencia, forma, fechas, fases e inventarios técnicos. Todos los journals presentes conservan incertidumbre hasta su parser completo; un marcador complete no es recibo de éxito. El DTO no es un predecesor ARM ni prueba suscripción, revisión útil, baja nativa, guardia o PC-off. operationalReadiness=false.
