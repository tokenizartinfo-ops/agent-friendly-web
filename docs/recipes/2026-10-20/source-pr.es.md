# Sitio construido desde Git: PR y despliegue trazable
20oct2026 · método source_pr; sin PR de cliente o deploy creado.

**Siguiente pregunta humana:** «¿Qué repositorio y despliegue sirven este dominio? Si lo lleva otra persona, puedo preparar una propuesta para que la revise».

## Identificar antes de preparar
Proyecto/repo/origen/entorno/revisión desplegada y responsable, verificados por su mecanismo actual. Un repositorio similar o una imagen sin source_revision no prueban procedencia. No reconstruir a ciegas ni asumir que una cuenta compartida sirve todos los sitios.

Conservar fuente/configuración efectiva y respaldo recuperable de los recursos afectados; separar secretos en custodia. Confirmar build/proveedor/rutas y qué cambios pueden volver atrás sin perder datos. Priorizar branch/CI en la nube autorizada y evitar clones/builds locales innecesarios.

## Preparar la propuesta
PR mínimo desde la revisión acordada, archivos allowlisted y hashes; diferenciar datos declarados de capacidades realmente implementadas. No incluir registros privados, credenciales o configuraciones de otro cliente. robots/sitemap deben integrarse con su generación real; JSON-LD con contenido visible; no inventar MCP/API/acciones desde documentos.

El propietario aprueba contenido y versión; quien controla el despliegue aprueba su implementación. La aprobación del PR no concede un token ni confirma que el despliegue esté autorizado. Mantener presupuesto, ventana, actor nominal y alcance explícitos.

## Construir y publicar cuando esté autorizado
Pruebas proporcionales, revisión y build reproducible con commit/árbol/artefacto/hash. Leer la revisión efectivamente publicada; CI verde, merge, etiqueta o descarga de artefacto no son publicación. Si el proveedor devuelve resultado incierto, consultar deployment/revisión originales antes de reintentar.

No ejecutar toda la rama principal, migraciones, cambios de base de datos u otros servicios por entregar documentos. Una fuente anterior con clases/esquema incompatible no se presume una reversión válida.

## Comprobar y cerrar
Verificación anónima de cada ruta aprobada: estado/finalURL, MIME/UTF8, bytes/hash, enlaces e idiomas, homepage y recursos ajenos. Registrar versión/despliegue/fecha, lo que falta y el siguiente responsable. Reauditoría externa y eficacia comercial siguen siendo observaciones separadas.

Reversión por el mecanismo conservado y compatible, sobre el cambio propio; verificar la recuperación sin borrar actividad legítima posterior. Mantener datos/historia y conciliar conflictos. Retirar acceso nominal temporal y comprobarlo. La tarjeta no autoriza crear repositorios, servicios, claves o contratos nuevos.
