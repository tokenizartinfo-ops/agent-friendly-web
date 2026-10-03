# Preflight de esquema antes del consentimiento delegado

El piloto ChatGPT falló al autorizar porque listar proyectos no compilaba el JOIN usado por la lectura real. `scripts/delegated-schema-preflight-sql.mjs` genera comprobaciones a partir de las mismas consultas del repositorio: resumen con borradores y observaciones guardadas. Cada consulta está envuelta en LIMIT 0, con parámetros vacíos constantes. No recibe propietarios, proyectos, tokens ni destinos; no conecta ni migra por sí mismo.

Pruebas SQLite: fixture antiguo rechazado aunque el listado funcionaba; fixture actual aceptado sin cambios ni datos devueltos; ausencia de la tabla de observaciones rechazada. Comprobación remota del 3 de octubre sobre D1 delegated-canary cerrado: dos consultas procesadas, cero filas leídas y cero escritas. Wrangler --file utilizó su mecanismo de importación y marcó changed_db true aunque las consultas no escribieron filas; para próximas lecturas preferir --command, evitando ese mecanismo y su ventana de indisponibilidad.

## Procedimiento acotado

Identificar proyecto AFW, repo, origen y D1 canary; verificar configuración y autenticación. Generar el SQL desde el repo:

```powershell
$afwSchemaSql = node scripts/delegated-schema-preflight-sql.mjs
if ($LASTEXITCODE -ne 0) { throw 'Preflight SQL generation failed' }
```

Enviar el SQL generado como campo `sql` de un cuerpo JSON estructurado a POST `/accounts/{cuenta-verificada}/d1/database/{d1-canary-verificado}/query`, usando el conector/API con identidad comprobada. No interpolarlo en texto de shell. En esta sesión de Windows, el procedimiento anterior con `--command` devolvió incomplete input, aunque SELECT 1 funcionó y ambas consultas completas pasaron por API estructurada. Un 7403 transitorio anterior tampoco permite diagnosticar un esquema incompatible. Recibo vigente: dos consultas, cero filas leídas/escritas, changed_db false. No reutilizar el comando de shell retirado ni recurrir a --file/import para una lectura.

No ejecutar migraciones globales para resolver un fallo. Comparar las dependencias concretas y preparar solo una corrección aditiva en el entorno verificado; conservar datos en rollback. Esta comprobación es un paso de operación, no un bloqueo integrado en Wrangler deploy ni una prueba de autenticación/propiedad.

## Siguiente aceptación: evidencia guardada

Preparar una observación sintética fechada y ligada al origen del proyecto sintético, con datos rotulados como prueba. Antes de escribir, revisar el contrato read_saved_evidence y su normalización; no reutilizar hechos de clientes reales ni presentar la prueba como auditoría nueva. Verificar aislamiento de otro owner y otro origen. ChatGPT necesitará un permiso que incluya evidence read; no inferirlo del permiso project read ya revocado. La ventana sigue cerrada hasta consentimiento propio, con callback redetectado, deadline y rollback explícitos. Solo después de evidencia/retirada aceptadas preparar un expediente real.
