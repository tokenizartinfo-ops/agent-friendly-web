# Build AFW fuera del portátil — 2026-09-29

GitHub Actions ya ejecuta `npm ci`, pruebas, lint y build de AFW. En los pushes a `main`, el mismo job conserva `dist/` como artefacto privado `afw-build-<commit>` durante siete días. Las PR siguen validándose sin acumular artefactos. Esto permite descargar solo el bundle pequeño y evita instalar dependencias o compilar de nuevo en C: antes de un release.

El artefacto es **candidato**, no una promoción automática. Antes de cargarlo en Cloudflare se debe verificar el commit exacto, las pruebas del job, la integridad del ZIP y la configuración de producción; el `wrangler.json` generado contiene placeholders locales y nunca debe usarse sin reemplazar y revisar nombre del Worker, Access, D1, cuota y banderas. El despliegue mantiene upload, asociación al 0%, revisión de bindings, promoción y rollback explícitos. No se añaden secretos de Cloudflare a GitHub ni se cambian recursos productivos con esta PR.
