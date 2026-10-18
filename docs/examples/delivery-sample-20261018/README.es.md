# Una entrega AFW, paso a paso

Muestra sintética preparada el 18 de octubre de 2026. «Taller Ejemplo» y `servicios.example` son ficticios. No es el expediente de Max, no acredita un dominio verificado ni fue instalada o enviada a un cliente.

## Qué queremos resolver

Supongamos que una empresa quiere explicar mejor sus servicios a quienes consultan su sitio. Empezamos por entender a quién ayuda y qué información puede declarar. En un caso real pediríamos ejemplos de preguntas y fuentes públicas; aquí no tenemos respuestas reales ni evidencia de mejora.

> Podemos empezar por una pregunta. Yo te ayudo a ordenar la información; si algo falta, lo dejamos pendiente y lo revisamos juntos.

## Qué recibe

El [paquete de ejemplo](capsule.example.json) contiene una propuesta versionada y sus hashes. Los datos declarados son ficticios y aún no están aprobados. Los archivos no publican nada por sí solos.

| Archivo propuesto | Para qué sirve | Siguiente decisión |
| --- | --- | --- |
| `llms.txt` | Resumen de datos declarados y límites | Revisar contenido antes de publicar en la raíz |
| `llms-full.txt` | Contexto ampliado y recursos realmente preparados | Revisar declaraciones y capacidades pendientes |
| Fragmento `robots.txt` | Propuesta de reglas de rastreo | Integrar con las reglas actuales; no reemplazarlas a ciegas |
| Entradas `sitemap.xml` | Propuesta de referencias a los documentos incluidos | Revisar la estructura y el sitemap vigente |
| `organization.jsonld` | Propuesta estructurada de nombre y sitio | Validar contra contenido visible e integrar donde corresponda |

OpenAPI, MCP y skills aparecen como recursos solicitados que esta cápsula no implementa. Elegirlos no crea herramientas ni demuestra que estén disponibles. `llms.txt` es una propuesta comunitaria; no es un requisito universal ni garantiza que una IA recomiende el sitio.

## Quién hace cada parte

El propietario revisa qué información quiere declarar y puede corregirla. AFW estructura la propuesta, explica sus límites y mantiene la versión revisable. Quien mantiene el sitio confirma dónde y cómo publicarla, conserva lo anterior y acuerda la reversión. Si es la misma persona, sigue necesitando distinguir esas decisiones.

> Ya tenemos una propuesta para revisar. Primero comprobamos que diga lo que querés comunicar; después acordamos cómo publicarla con quien mantiene tu sitio.

Preparar, aprobar, instalar y comprobar son estados diferentes. En este ejemplo solo se preparó un paquete local: aprobación pendiente, sin instalación y sin comparación del destino. Sus fechas son de demostración y no abren una ventana de acceso.

## Cómo sabremos si ayudó

En el piloto real acordaremos preguntas y fuentes antes de cambiar nada. Registraremos la versión propuesta, el destino, el responsable, el tiempo dedicado y los obstáculos. Después compararemos los archivos incluidos y revisaremos si se resolvió el objetivo. Una coincidencia de archivos no certifica todo el sitio, ni una puntuación mayor prueba más ventas o ahorro de trabajo.

La [ficha de aprendizaje](../../AFW-PILOT-LEARNING-RECORD-2026-10-18.es.md) permite empezar manualmente. No activa seguimiento, analytics ni una guardia cloud. El uso público de un caso real requiere permiso propio.

## Procedencia técnica

`capsule.example.json` se generó localmente con `buildPublicationCapsule` y la entrada ficticia [input.example.json](input.example.json), usando la fuente `314bb4696a8d91d880c17b2837d970577b511a67`. No pasó por la API autenticada ni por una verificación de dominio. Se comprobaron contenido, hashes y manifestación de estados; eso no acredita hosting o publicación.

La muestra se conserva como referencia fechada. No regenerarla para sobrescribir una versión aprobada de un cliente ni usar sus IDs, decisiones o caducidad como permisos reales.
