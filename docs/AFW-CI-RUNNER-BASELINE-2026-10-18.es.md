# Entorno conocido para las pruebas de AFW

Decisión de mantenimiento del18 de octubre de2026: el job de verificación usa `ubuntu-24.04` en lugar de `ubuntu-latest`. Conserva Node22, `npm ci`, pruebas, lint, build, triggers, permisos de lectura y conservación de artefactos. No despliega ni activa servicios.

## Motivo y alcance

Los logs de CI39167402053 muestran Ubuntu24.04.5, imagen `ubuntu-24.04` versión20261012.334.1. Esa ejecución aprobó2.021 pruebas, una omitida y lint/build; la variante pública aprobó1.143 pruebas. Incluyen pruebas nativas con workerd y SQLite. Es una base observada, no una garantía de futuras ejecuciones.

[GitHub anuncia](https://github.com/actions/runner-images/issues/14748) el traslado gradual de `ubuntu-latest` a Ubuntu26.04 desde el19 de octubre hasta el19 de noviembre de2026, y ofrece etiquetas explícitas para elegir sistema. Se conserva la familia que acabamos de comprobar para evaluar una actualización de sistema como cambio propio. La [referencia de runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners) documenta las etiquetas disponibles.

La etiqueta fija la familia del sistema, no congela una imagen exacta ni todos sus paquetes. GitHub puede actualizar esa imagen. Node22 sigue como familia de versión y las dependencias conservan su lockfile. No se afirma reproducibilidad absoluta ni incompatibilidad de AFW con Ubuntu26.04: esa versión no se evaluó en este bloque.

## Comprobación y reversión

Se valida sintaxis YAML y que el único cambio funcional del workflow sea `runs-on`; la aceptación exige que el job real informe Ubuntu24.04 y complete pruebas, lint y build. Main integral y rama pública conservan sus verificaciones separadas. No se cambia el Worker publicado por actualizar CI.

Antes de migrar a otra familia: probarla en una rama de mantenimiento, comparar resultados nativos, versiones de herramientas y artefactos, resolver diferencias y registrar la decisión. No cambiar a `latest` para silenciar un error sin diagnóstico. Para revertir esta selección basta restaurar `runs-on: ubuntu-latest` mediante revisión; no hay datos o recursos cloud que deshacer.

Los avisos existentes sobre el runtime de actions/checkout@v4 y actions/setup-node@v4 quedan fuera de este cambio. No se actualizaron acciones, dependencias ni permisos por inferencia. Tampoco se acredita una guardia, un scheduler de Codex o el ensayo integrado con ordenador apagado.
