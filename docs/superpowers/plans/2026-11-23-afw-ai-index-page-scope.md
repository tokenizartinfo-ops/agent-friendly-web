# Borrador por páginas para AI Index

**Objetivo:** dejar una lista que el titular pueda revisar con su mantenedor para el dominio guardado en su expediente.

- Formular dos listas opcionales. Una propone páginas públicas para revisar y otra deja páginas fuera. Cada línea admite una ruta exacta o una URL del mismo origen.
- Exportar un JSON fechado con ambas listas y estado de borrador. No incluir observaciones, credenciales, identificadores del expediente ni notas privadas. No realizar lecturas HTTP ni activar acceso, indexación o solicitudes a Cloudflare.
- Mantener el borrador en esta vista hasta descargarlo. Cambiar el expediente o el origen guardado descarta los campos de la vista.
- Comprobar límites, rutas externas o con parámetros, líneas duplicadas y decisiones incompatibles. Mantener el contenido escrito cuando falle la validación.

[Preparación de AI Index](../../AFW-CLOUDFLARE-AI-INDEX-2026-11-03.es.md).
