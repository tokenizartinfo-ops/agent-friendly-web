# Hosting: raíz pública comprobada
20oct2026 · método verified_docroot; sin subida ejecutada.

**Siguiente paso humano:** «Confirmemos con quien administra el hosting qué carpeta sirve este dominio. Si no lo sabés, preparo una pregunta concreta; no hace falta compartir contraseñas».

## Comprobar la capacidad
Confirmar dominio/subdominio exacto, producto efectivo, docroot y vínculo con el sitio servido. DNS, cuenta de dominio, editor CMS y acceso a otro hostname no prueban acceso a esos archivos. DonWeb, cPanel o Hostinger no determinan por sí solos la ruta, el rol o si hay un proxy. Registrar capacidad declarada/observada y quién la comprobó.

Leer únicamente los destinos autorizados. Conservar bytes anteriores o constancia de ausencia, sus hashes y el mecanismo de recuperación; respaldo fuera del paquete público. Un fichero robots/sitemap generado por otra capa no se trata como un texto suelto reemplazable.

## Preparar / aprobar / entregar
Inventario explícito de archivos y rutas, versión/hashes y fuente de las declaraciones. El propietario revisa contenido y límites; el responsable técnico acuerda el cambio y reversión para ese paquete. Acceso nominal limitado por recurso/acción/fecha, con custodia y retirada verificables.

Escribir únicamente los archivos acordados por el mecanismo autorizado. No cambiar DNS, proxy, aplicación, permisos globales o archivos vecinos para vencer un fallo. Si un archivo está montado por inode o servido por un proxy, verificar su mecanismo efectivo: un rename puede dejar al proceso leyendo el anterior. No convertir este aprendizaje histórico en un comando de modificación.

Tras timeout/ACK desconocido, leer el destino y comparar con estado previo/propuesto antes de repetir. Registrar conflicto o estado parcial; no proclamar publicación desde el panel de archivos.

## Verificar / revertir
GET anónimo por ruta/origen con estado/finalURL, MIME/UTF8 y SHA256 exacto; HEAD cuando corresponda y comprobación de homepage/robots/sitemap/rutas no incluidas. Repetir tras caché/CDN ordinaria si el resultado discrepa, sin desactivar controles ni ampliar límites globales por un archivo. Guardar fecha y evidencia.

Restaurar solo el recurso afectado y comprobar la recuperación. Si antes no existía, retirar solo el archivo introducido cuando su estado actual siga correspondiendo al cambio propio autorizado; no borrar trabajo posterior ni usar comodines. Si hay cambio legítimo posterior, detener esa reversión y conciliar con su responsable. La reversión no modifica el resto del sitio ni implica destruir datos.

Cerrar por archivo: instalado, verificado, bloqueado o revertido, con pendientes y próxima persona responsable. Retirar el acceso temporal y verificar la retirada. Una lectura HTTP correcta no acredita indexación, uso por LLMs o un puntaje externo nuevo.
