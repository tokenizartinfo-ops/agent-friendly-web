# Detección de respuestas en encabezados

El auditor interno omitía encabezados como «¿Qué ofrece AFW?» y «¿Cómo funciona AFW?» por sus tildes, y encabezados o párrafos con formato HTML interno. También confundía fragmentos de palabras, como `showcase`, con una pregunta.

Se normalizan las tildes del texto extraído y se buscan palabras completas en encabezados h1–h3. El párrafo requiere al menos 24 caracteres de texto, sin contar etiquetas. Comentarios, scripts, estilos y templates no aportan esta señal. Se preservan los pesos y umbrales de la metodología.

Esta es una heurística textual: no certifica la calidad de la respuesta, su asociación con la pregunta ni su visibilidad renderizada. No interpreta CSS ni todas las entidades HTML. No equivale a una auditoría externa ni acredita un aumento del puntaje de Cloudflare.

Las dos regresiones fallaron antes de la corrección y las once pruebas del scanner pasaron después. No se modificó ningún sitio de Tokenizart, Atelier o Sector de Sistemas. La publicación del código y el despliegue del runtime son evidencias separadas.

Verificación final: 923/923 pruebas, lint sin errores (dos advertencias preexistentes), build exit 0 y diff-check sin errores.
