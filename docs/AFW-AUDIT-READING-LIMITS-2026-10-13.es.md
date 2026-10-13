# Límites de lectura del diagnóstico público

La respuesta de `runPublicAudit` explica ahora que la lectura de portada no ejecuta JavaScript ni consulta el contenido de iframes, y que la señal de datos estructurados busca JSON-LD, sin comprobar microdatos/RDFa ni la exactitud de las declaraciones.

Motivo: una portada puede incrustar una presentación comercial disponible en otra URL o tener microdatos del tema sin JSON-LD. No detectar una señal con estas heurísticas no acredita que falte en todo el sitio. El texto acompaña al resultado actual, al alcance propuesto y a la observación saneada mediante el campo `limits` ya existente. No reescribe auditorías históricas.

Es una corrección de explicación: no cambia señales, pesos, nivel AF, solicitudes de red, acceso a otros orígenes ni tratamiento de URLs. Tampoco acredita detección de iframes o soporte de microdatos. Una ampliación futura del extractor requiere su propio diseño, controles de red y pruebas.

No se modifica ningún sitio de cliente ni se publican sus datos en este documento. El caso público revisado se conserva por separado como preparación local. La aceptación de esta fuente no implica despliegue de la web ni mejora de puntaje externo.
