# AFW: compilación cloud del Worker privado, sin publicación

Fecha19oct2026. Proyecto AFW, repo tokenizartinfo-ops/agent-friendly-web, origen https://github.com/tokenizartinfo-ops/agent-friendly-web.
Rama ci/afw-own-worker-cloud-build-20261019; base a717fb610196f449950a064527fe08af412498d2/tree4a0fb444429f67b6adabeb44a0cfbb2557cb51ca. La PR portadora registra revisión, ejecuciones, artefacto y fusión exactos; no inferir aceptación desde este documento.

## Objetivo y decisión acotada

Compilar el entrypoint real worker/mcp-own/index.mjs mediante el script existente scripts/build-mcp-own-worker.mjs exclusivamente en GitHub Actions. Conservar bytes y manifest con procedencia durante7d. No publicar ni activar Cloudflare. Gabriel mantiene autorización para encadenar bloques ordinarios y priorizar cloud; ejecución nativa del responsable con una revisión de rama al final.

El workflow afw-canary-cloud-upload.yml es para A2A, con credencial/recurso/branch distintos: no reutilizarlo para OAuth ni cambiar su target por inferencia. El build nuevo no usa wrangler.delegated-canary.jsonc ni el ejemplo local de own-events, que no representan la configuración efectiva actual.

Ruling: una ampliación acotada del build ya existente, sin nuevo subsistema. Se toma la decisión rutinaria delegada por Gabriel y se conserva diseño/verificación aquí; no abrir otra aprobación de diseño que contradiga su instrucción de continuar autónomamente. El criterio es una compilación remota real y verificable, sin tests de texto YAML que reflejen la implementación.

## Flujo y límites

Workflow .github/workflows/afw-own-worker-build.yml, Ubuntu24.04/Node22, contents:read, timeout15min, checkout del SHA exacto sin credenciales persistidas. Usa package-lock existente; no nuevas dependencias o servicios.
Dos entradas: manual únicamente desde main, y PR del MISMO repositorio que cambie este workflow o los tres scripts de procedencia/build. Un fork no produce un artefacto con esta ruta. Sin schedule, push universal, secretos, modelos, contenedores, cron, D1, KV, tokens de proveedor ni red Cloudflare.

El builder comprueba entradas Git antes/después y devuelve sourceRevision/sourceTree/sourceCheck/programHash/workerHash. Una verificación independiente de bytes compara SHA256 del archivo con workerHash y el sourceRevision con el SHA elegido por GitHub; verifica forma de sourceTree/programHash. Se conserva el artefacto con nombre afw-own-worker-<40hex>, solo index.mjs y build.json; faltar archivos falla. El digest del ZIP informado por GitHub es distinto del hash del Worker y no deben confundirse.

Una PR compila su head candidato; eso no lo convierte en fuente aceptada de main. Tras fusión, ejecutar UNA vez desde main y exigir sourceRevision del commit aceptado, comprobar sourceTree y hashes en log/manifest más metadata del artefacto. No descargar el ZIP al PC de Gabriel para esta preparación: validar por los resultados y metadata remotos. Si hace falta una inspección adicional de bytes, realizarla dentro de un entorno cloud autorizado.

El bundle es código sin una configuración de publicación, no un Worker desplegado cerrado. No incrusta permisos temporales de owner o claves; la configuración real se suministra en una operación de publicación distinta. Un build exitoso no demuestra routing D1 real, ChatGPT, recepción nativa, Container, guardia cloud, despliegue o PC-off.

## Plan, verificación y reversión

1. Crear rama remota desde base verificada; añadir workflow/este recibo y referencias de continuidad.
2. Verificar la ejecución automática de compilación sobre el head de la PR y el CI completo existente. Revisión independiente del alcance, inputs, procedencia, fork/branch gate, permisos y artefactos; resolver hallazgos importantes proporcionalmente.
3. Fusionar solo fuente revisada y check verify exitoso; árbol de main igual al probado si base no cambió. Disparar una única compilación manual en main por GitHub; capturar run/job/commit/tree/hashes/tamaño/digest y resultado, sin ZIP local.
4. Cerrar constancia en la PR y coordinar una sola actualización significativa. Actualizar estado fuente no equivale a activar runtime.

Reversión: antes del merge cerrar PR; después revertir mediante PR. Job solo compila/publica artefacto de Actions con expiración7d, no modifica recursos Cloudflare. No cancelar otras ejecuciones ni borrar evidencia ajena. No nuevo costo/contrato o credencial por inferencia.

## Ledger

- Contexto: PR495 integrada a717fb61, mismo árbol que dca1e405 probado; su check verify aceptado, el agregado de CI tenía retraso separado. Ocho flags del canary real f8feb421 continúan false según lectura primaria19oct, sin flag continuity.
- Preparación cloud de este bloque: pendiente ejecución/revisión; la PR es fuente del cierre exacto.
