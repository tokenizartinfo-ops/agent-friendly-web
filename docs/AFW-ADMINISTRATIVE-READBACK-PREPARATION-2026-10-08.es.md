# Comprobación administrativa por lectura

AFW, 8 de octubre de 2026. Base main3fddbd063b9af54f6f9bc1f08783a73ed182ef4b. Adaptador interno sin rutas, escritura ni credenciales.

`createAdministrativeClosureReadback` construye cuatro rutas GET de recursos fijados por el servidor: token Access, settings del manager, sus schedules y política Access. Hace dos rondas sin reintentos; compara SHA256 del resultado completo con el baseline aprobado. Se exige además token deshabilitado, flags AFW presentes en false, ventana presente vacía, bindings sin nombres duplicados y cron vacío. Un digest aprobado no convierte un estado abierto o ausente en un cierre válido.

Las siete pruebas focales pasaron. Se observó RED con settings ausente o controles abiertos que coincidían con el digest; la corrección agregó condiciones de cierre explícitas y el mismo caso pasó. Las otras pruebas verifican inmutabilidad, paths fijos, clock/input que cambia durante la lectura, drift, errores privados y ausencia de mutaciones. Revisión independiente sobre la primera versión no encontró P1/P2; la ampliación del cierre conserva evidencia de regresión. CI del commit final es gate de integración.

## Lectura primaria real

A las 21:42:22 UTC (18:42:22 de Buenos Aires), el código del adaptador se ejecutó en la herramienta Cloudflare API con la misma fuente local, retirando solo la sintaxis export. Primero se verificaron cuatro recursos contra las referencias históricas autorizadas; después el adaptador efectuó sus ocho GET reales y confirmó la igualdad del estado observado. No se almacenaron respuestas privadas completas ni secretos.

Comprobaciones: token1bf deshabilitado/version2; managerconsumer/assistance/dossierfalse; ventana vacía; D1original603c471d en id y database_id; cron del manager vacío; política73bf del app5b7e con selectororiginald121. Referencia del baseline observado: `21d76080e321625704edebdc881a7b1d4d7d79082a2e87ea24e1a3e80aa58c34`. Recibo local saneado: output/afw-administrative-primary-readback-20261008.json. Se efectuaron doce lecturas y cero mutaciones.

El alcance es manager/token/política. No incluye schedules del productor ni otros Workers del recorrido, ni acredita que se haya restaurado algo mediante escritura. `restored` en el contrato significa que la lectura encuentra el baseline cerrado; no demuestra una acción administrativa previa. Esta ejecución usó el conector de la conversación, no una custodia independiente alojada. No hubo alarmas remotas, PC-off, nueva publicación cloud ni invitación a Max.

Siguiente bloque: incluir en un único baseline completo todos los recursos afectados por el ensayo y componer custodia independiente y mutaciones seguras. Ante diferencias administrativas se requiere un adaptador de restauración real: esta lectura nunca las corrige. No inferir CAS/ETag ni reemplazar bindings legítimos de terceros.

Endpoints contrastados con el esquema oficial de Cloudflare: service token GET, Worker settings GET, Worker schedules GET y Access application policy GET. [API de service tokens](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/get/).
