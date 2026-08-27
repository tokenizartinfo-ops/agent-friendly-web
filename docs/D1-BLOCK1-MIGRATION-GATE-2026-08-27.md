# D1 Block 1 Migration Gate

## Estado

La migracion `drizzle/0001_registry_block1.sql` esta preparada y validada solo en D1 local. No fue aplicada a la base remota de Agent Friendly Web y no habilita por si sola formularios nuevos, verificacion de dominio, publicacion en el Registry ni herramientas mutantes.

## Alcance de la migracion

La migracion es aditiva:

- agrega doce columnas saneadas a `site_projects`;
- crea `registry_sites`, `domain_claims`, `owner_attestations`, `public_profiles` y `scan_observations`;
- crea indices para pertenencia, dominios, versiones y consultas cronologicas;
- no elimina, renombra ni reescribe tablas o datos existentes.

Los campos privados siguen aislados por `oai-authenticated-user-id`. Los eventos conservan solo porcentaje de completitud y nombres de campos, nunca sus valores.

## Evidencia local

El 2026-08-27 se realizaron dos pruebas independientes:

1. Aplicacion secuencial de `0000_tearful_ego.sql` y `0001_registry_block1.sql` sobre una D1 local vacia mediante Wrangler.
2. Aplicacion de `0001_registry_block1.sql` sobre una D1 local con un expediente legado precargado.

Resultados:

- las dos migraciones finalizaron correctamente;
- el expediente legado con ID `legacy-project` conservo usuario, organizacion y URL;
- las nuevas columnas tomaron sus valores por defecto sin alterar el registro previo;
- las cinco tablas y los indices unicos esperados quedaron disponibles;
- una segunda generacion Drizzle indico que no habia cambios adicionales;
- inspeccion estatica: cero instrucciones `DROP`, `DELETE`, `UPDATE`, `RENAME` o tablas temporales de reescritura.

El emulador rechazo `PRAGMA integrity_check` con `SQLITE_AUTH`; por eso la comprobacion se realizo mediante lectura del registro legado, catalogo `sqlite_schema`, pruebas automatizadas y aplicacion completa de las migraciones.

## Preflight remoto obligatorio

Antes de solicitar una aprobacion para aplicar la migracion remota:

1. Resolver desde Sites el nombre e identificador exactos de la D1 vinculada a `DB`; no inferirlos desde el binding.
2. Ejecutar una inspeccion read-only de la base y confirmar que usa el backend D1 de produccion.
3. Registrar el bookmark actual de Time Travel.
4. Exportar esquema y datos a un archivo controlado fuera de Git y registrar su hash SHA-256.
5. Registrar conteos de `site_projects` y `project_events`, version Sites activa y commit desplegado.
6. Ejecutar `migrations list` y confirmar que solamente `0001_registry_block1.sql` esta pendiente.
7. Solicitar aprobacion humana separada para la ventana de migracion remota.

Cloudflare documenta que D1 Time Travel esta siempre activo para bases sobre el backend de produccion y permite recuperar un punto anterior. Tambien documenta que `wrangler d1 migrations apply` registra las migraciones, captura un backup y revierte la migracion que falle, manteniendo las anteriores. Fuentes: [Time Travel and backups](https://developers.cloudflare.com/d1/reference/time-travel/), [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/) e [importacion y exportacion](https://developers.cloudflare.com/d1/best-practices/import-export-data/).

## Aplicacion remota futura

La ejecucion remota debe usar el nombre inmutable de la base, el archivo de configuracion temporal controlado y una credencial de alcance minimo. La secuencia sera:

1. obtener bookmark y export;
2. comprobar migraciones pendientes;
3. aplicar la migracion una sola vez;
4. verificar tablas, columnas, indices y conteos;
5. ejecutar pruebas negativas de aislamiento;
6. guardar evidencia sin incluir credenciales ni datos de expedientes.

La base remota no se modifica desde este documento ni mediante comandos copiados sin revisar.

## Rollback

El rollback normal es de codigo: volver a la version Sites anterior. Como las columnas y tablas nuevas son aditivas y la version anterior no las consulta, no se intenta borrar el esquema nuevo.

Si existiera corrupcion o perdida de datos, la recuperacion mediante Time Travel al bookmark previo es destructiva y requiere una aprobacion humana especifica. Para errores de modelado sin perdida de datos se prepara una migracion hacia adelante; no se edita una migracion ya aplicada y no se ejecutan `DROP TABLE` o `DROP COLUMN` como reaccion inmediata.

## Gate pendiente

Todavia faltan la interfaz ampliada, desafios de dominio read-only, perfiles publicos versionados, observaciones explicitas y pruebas de seguridad integrales. La migracion remota permanece bloqueada hasta que esas piezas sean compatibles, el build exacto este validado y Gabriel apruebe separadamente la ventana.
