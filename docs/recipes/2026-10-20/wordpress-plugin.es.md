# WordPress: revisar un publicador acotado
20oct2026 · método scoped_plugin_review; orientación, sin plugin instalado por esta receta.

**Siguiente pregunta humana:** «¿Podés instalar plugins en este sitio o preferís que lo coordine con quien lo mantiene? Con eso puedo preparar el camino más sencillo; no necesito tu contraseña».

## Antes de elegir el paquete
Confirmar origen exacto, CMS/producto/versión, rol efectivo y quién puede instalar/reemplazar un plugin. Poder editar páginas o medios no prueba esa capacidad. Registrar la declaración por separado de una comprobación nominal. Si no hay permiso de plugins, usar [la entrega al mantenedor](maintainer-handoff.es.md); no usar el editor de temas o un administrador general de archivos para sortear la falta de acceso.

Consultar anónimamente las rutas propuestas y el sitemap declarado en robots. Distinguir archivo estático del hosting, respuesta de WordPress, redirección de login y HTML de fallback. Un plugin de rutas puede no controlar un archivo estático preexistente.

## Preparar y acordar
El publicador compatible debe ser una propuesta específica revisable: rutas permitidas, métodos, contenido versionado/hashes, dependencias, prueba de sintaxis/comportamiento y reversión. Una cápsula de textos no es un plugin instalable. Conservar el paquete anterior/configuración afectada en custodia recuperable y acordar una prueba compatible antes de instalar.

Separar la declaración del propietario de la autorización técnica sobre esa versión exacta. No reemplazar robots/sitemap enteros: integrar con lo vigente y el sistema que los genera. JSON-LD debe coincidir con lo visible; declarar una herramienta/documento futuro no la implementa.

## Instalación autorizada
Solo la persona/servicio nominal, sobre ese sitio y paquete, mediante el mecanismo permitido por su rol y ventana. No tocar usuarios, pagos, datos de clientes, otros plugins o temas por esta guía. Si una activación/reemplazo queda sin ACK, comprobar plugin/versión/rutas efectivos antes de repetir.

## Comprobación
Ver cada origen/ruta sin sesión: estado/finalURL, MIME/UTF8, cuerpo y SHA256 aprobados, GET y HEAD. Distinguir adjunto Media Library de ruta raíz. Comprobar métodos rechazados y rutas ajenas; homepage, robots y sitemap deben conservar su comportamiento acordado. No desactivar protección para lograr un resultado externo favorable.

Cuando haya negociación HTML/Markdown, probar solo el alcance previsto y que Cookie/Authorization no expongan contenido privado ni cambien las rutas autenticadas. Idioma del contenido, asignación del CMS y html lang son comprobaciones distintas. Una purga de caché debe ser ordinaria y acotada; comprobar de nuevo cada idioma/origen.

## Reversión y aprendizaje
Si falla, recuperar solo el paquete/configuración afectados con el respaldo comprobado y preservar actividad legítima posterior. Verificar recuperación y rutas ajenas; no afirmar rollback por haber pulsado desactivar. Retirar el permiso nominal temporal y conservar constancia.

Ante un archivo estático que el plugin no controla, no forzar el plugin: pedir capacidad concreta de hosting por la [receta de raíz comprobada](verified-docroot.es.md). El caso histórico WordPress de [experiencia de entrega](../../AFW-DELIVERY-EXPERIENCE.es.md) justifica esa pregunta; no demuestra acceso actual ni compatibilidad universal. Registrar el obstáculo y siguiente responsable sin copiar datos del cliente.
