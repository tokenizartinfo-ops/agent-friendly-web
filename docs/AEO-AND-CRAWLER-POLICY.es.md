# AEO y politica de crawlers

**Fecha:** 2026-08-27  
**Estado:** primera capa publica implementada  
**Alcance:** educacion, catalogo y decisiones; no modifica sitios de clientes ni garantiza resultados

## Objetivo

Agent Friendly Web utiliza AEO para hacer mas comprensible y citable el conocimiento real de una organizacion. No reemplaza SEO: lo complementa con respuestas claras, entidades consistentes, fuentes, fechas, limites y formatos legibles por maquinas.

El responsable humano sigue siendo quien decide que contenido publicar, que crawlers permitir y que usos reservar. La plataforma registra esa intencion, la contrasta con evidencia observable y evita presentar una recomendacion como un hecho ya desplegado.

## Tres decisiones separadas

1. **Busqueda y descubrimiento:** crawlers que localizan paginas para indices o respuestas con enlaces.
2. **Recuperacion solicitada:** fetchers que consultan una pagina porque una persona se lo pidio a un asistente.
3. **Entrenamiento y otros usos generativos:** controles que cada proveedor define para mejorar modelos o productos.

Permitir una finalidad no obliga a permitir las restantes. `robots.txt` comunica preferencias voluntarias; no protege informacion privada. Autenticacion, autorizacion y controles de acceso siguen siendo necesarios.

## Implementacion actual

- `/aeo-y-crawlers`: explicacion humana, comparacion SEO/AEO/agent-ready, matriz y limites.
- `/.well-known/crawler-policy-catalog.json`: contrato `crawler-policy-catalog.v1` para agentes.
- `/llms.txt`, `/llms-full.txt`, AI Catalog, sitemap y mapa del sitio enlazan los recursos.
- El catalogo diferencia user agents, fetchers y tokens de control como `Google-Extended`.

## Medicion prevista

Cada intervencion futura conservara una linea de base, cambios aplicados, fecha, fuentes, respuestas observadas y limitaciones. El reporte puede mostrar mejora de claridad o descubrimiento, pero no atribuye automaticamente ranking, trafico, conversion o recomendacion a un cambio aislado.

## Fuentes primarias

- OpenAI: https://developers.openai.com/api/docs/bots
- Anthropic: https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Google: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended
- Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Microsoft Bing: https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a
- Apple: https://support.apple.com/en-us/119829
- Amazon: https://developer.amazon.com/amazonbot
- Common Crawl: https://commoncrawl.org/ccbot
- Cloudflare Bot Reference: https://developers.cloudflare.com/ai-crawl-control/reference/bots/
