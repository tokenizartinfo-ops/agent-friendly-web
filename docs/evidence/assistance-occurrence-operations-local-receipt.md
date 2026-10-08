# Segundo bloque LOCAL — funciones internas assistance y reloj SQL

Base46ac9b8; rama afw/local-occurrence-d1. Ninguna ruta/Worker/public runtime montada o modificada. Sin Cloudflare/SQL remoto/config/keys/gates/cliente; solo pruebas locales y push de rama autorizado. No listo para piloto.

## TDD y resultados

- RED inicial7/7 por contrato interno faltante antes de helpers.
- Hallazgo clock queued batch: prueba real SQLite observó consumo+efecto indebido después de margen por usar tiempo pre-batch. RED guardado; reloj SQL efectivo sin override corrige y da GREEN.
- Revisión independiente encontró intervalo ENTRE statements. Pruebas reales de delayed transaction en store genérico y claim real fallaron antes de corrección, luego GREEN con cero efectos/transiciones confirmadas. La prueba usa BEGIN IMMEDIATE local y timer dentro de misma transacción; no simula commit dividido ni sustituye reloj SQL.
- Nuevo superseded antes de admit finish: RED observado, luego guard permite finish únicamente para cerrar reservation como superseded. Claim/list stale siguen rechazados.
- SQLite store18/18; operaciones12/12; logs RED/GREEN versionados. Dos conexiones reales comparten archivo D1-compatible SQLite.
- Native Miniflare/workerd3/3: store base, real helpers/runs/shared budget/rollback/outcome, delayed claim SQLclock. Permiso por comando previamente autorizado network.enabled=true conserva sidecar/proxy/TLS; después use_default.
- Focalización heredada: executor14pass/1WindowsSkip, client3pass, review/sharedbudget5pass, controls5pass. Total61tests/60pass/1skip/0fail, archivos en procesos separados. Lint focalizado exit0.

## Composición y límites

consumePrepared recibe factory SINCRÓNICO de statements internos confiables, sin SQL/request callbacks de IO. Consume, efectos, postcondiciones, lectura de resultado y clock check final comparten UN db.batch. cambios()=1 + correlación exacta obliga rollback si mutación real afecta0 filas. No se usa un segundo request/commit JS para decidir resultado.

list devuelve solo señal exacta manifiesto en snapshot del batch. claim aplica mismo fence de cuatro canales1active/3rolling24h de helper compartido, export nuevo fijo a reloj SQL; se refactorizó constructor de fence sin cambiar presupuesto ni rutas legacy. claim limita lease a todos los plazos. finish calcula outcome en SQL snapshot y copia exactamente al run: intervention_required o superseded. Rechaza reviewed/resolved y SQL en input. Close preserva completed y puede persistir expired.

No se llamó a helpers legacy secuenciales desde batch ni se cambió su protocolo/rutas; la composición usa sus mismos statements/fence/correlaciones dentro de store. Assertions y clocks son schema aditivo interno inmutable. Falta migración revisada si existe occurrencev1: CREATE IF NOT EXISTS por sí mismo NO reemplaza un trigger previo. No hay instalación remota occurrencev1 acreditada.

Pruebas cubren pérdida/replay por otra conexión, carreras reales, budget/finish0rows rollback, terminal exacto, revision nueva antes y después de claim, margen temporal, cierre durante preflight, list terminal, inputs arbitrarios rechazados e inmutabilidad.

## Revisión y continuidad

Hallazgo importante de revisión independiente (reloj por statement) corregido RED→GREEN en efecto/postcondición + final clock fence genérico. Sin revisión que acredite piloto o cierre remoto.

Contador33b617c en rama distinta se conserva como pendiente de siguiente integración, no se duplicó/fetch/cherry-pick ahora. HTTP/runner esperan revisión de helpers. max4control/3ops/7total transporte aún no montado.

Inventario Cloudflare: ningún MCP/connector Cloudflare API de lectura/mutación entre herramientas disponibles. CLI Wrangler local presente; autenticación/capacidad remota no comprobadas, sin inspeccionar claves o llamar API. Gate PC-off independiente permanece pendiente de mecanismo de restauración real y verificación token disabled/policy restored/flagsfalse; expiración servidor no sustituye esas comprobaciones. Sin scheduler/cleanup inventado.
