# Matriz de crawlers Tokenizart

**Prueba:** solicitudes HTTP publicas con user agents declarados

**Fecha:** 2026-08-26

| Familia | User agent probado | Tokenizart inicio/robots | Atelier inicio/robots | Interpretacion |
| --- | --- | --- | --- | --- |
| OpenAI | GPTBot | 200/200 | 200/200 | accesible en esta prueba; no garantiza entrenamiento |
| OpenAI | OAI-SearchBot | 200/200 | 200/200 | accesible en esta prueba; no garantiza indexacion |
| OpenAI | ChatGPT-User | 200/200 | 200/200 | accesible para solicitud; no garantiza uso |
| Anthropic | ClaudeBot | 200/200 | 200/200 | accesible en esta prueba |
| Anthropic | Claude-SearchBot | 200/200 | 200/200 | accesible en esta prueba |
| Anthropic | Claude-User | 200/200 | 200/200 | accesible en esta prueba |
| Perplexity | PerplexityBot | 200/200 | 200/200 | accesible en esta prueba |
| Perplexity | Perplexity-User | 200/200 | 200/200 | accesible en esta prueba |
| Google | Googlebot | 200/200 | 200/200 | accesible en esta prueba |
| Google | Google-Extended | 200/200 | 200/200 | accesible en esta prueba; tratamiento separado |
| Apple | Applebot-Extended | 200/200 | 200/200 | accesible en esta prueba |
| Amazon | Amazonbot | 200/200 | 200/200 | accesible en esta prueba |
| Meta | Meta-ExternalAgent | 200/200 | 200/200 | accesible en esta prueba |
| Cohere | cohere-ai | 200/200 | 200/200 | accesible en esta prueba |
| Common Crawl | CCBot | 200/200 | 200/200 | accesible en esta prueba |

## Como leer la matriz

HTTP 200 solo confirma que el servidor entrego una respuesta durante la prueba. No demuestra que el crawler haya visitado el sitio espontaneamente, que lo haya indexado, que lo recomiende ni que respete una preferencia no vinculante. La evidencia real se completa con logs/analytics, politicas publicadas y pruebas de recuperacion desde cada producto.
