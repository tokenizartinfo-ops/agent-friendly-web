# Agent Friendly Web - paquete publico Nivel 5 para NotebookLM

## Proposito

Este directorio prepara fuentes publicas revisadas para un cuaderno auxiliar de Agent Friendly Web. La fuente canonica sigue siendo el repositorio versionado y su distribucion OKF; NotebookLM es una superficie auxiliar de consulta y derivacion, no una fuente de verdad ni un canal de publicacion automatica.

## Flujo de uso

1. Verificar que cada ruta y URL del `source-manifest.json` coincide con la version aprobada.
2. Confirmar sensibilidad `Nivel 5` y ausencia de material excluido.
3. Incorporar las fuentes al cuaderno declarado para este paquete.
4. Registrar la procedencia del cuaderno y de cada derivado.
5. Marcar todo resumen, audio, presentacion, video, mapa o respuesta generada como `needs_review`.
6. Ejecutar QA humana antes de reutilizar, publicar o ingerir cualquier derivado.

## Material excluido

El paquete no contiene credenciales, valores de secretos, expedientes privados, datos privados del Registry, informacion de pago ni datos protegidos de Tokenizart. Tampoco concede permisos sobre dominios, hosting, D1, Workers, MCP, CLI u otras herramientas.

## Criterio editorial

Las fuentes describen el orden humano de la portada, la ruta AF-0 a AF-5, la referencia publica fechada, el catalogo FAQ, la guia determinista y el conocimiento OKF. Las afirmaciones deben conservar fechas, limites y estado de despliegue. Una salida de NotebookLM no puede transformar un roadmap en capacidad activa ni una medicion propia en certificacion externa.

## QA humana minima

- contrastar cada claim con la ruta canonica;
- conservar idioma, fecha y version;
- revisar que no aparezcan secretos o datos personales;
- diferenciar evidencia observada, declaracion del owner y trabajo planificado;
- verificar legibilidad y calidad visual del derivado;
- aprobar expresamente antes de promocion a sitio, OKF, RAG, Companion, Copilot o Investor Room.
