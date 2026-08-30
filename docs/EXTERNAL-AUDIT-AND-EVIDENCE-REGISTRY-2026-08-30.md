# External Audit and Evidence Registry

**Fecha:** 2026-08-30  
**Estado:** roadmap operativo, sujeto a revision trimestral  
**Alcance:** evidencia externa y reproducible para comparar mejoras AF-0 a AF-5

## Principio

Ningun auditor aislado demuestra que una marca sera citada, recomendada o posicionada por un modelo. Agent Friendly Web debe combinar pruebas HTTP reproducibles, telemetria del owner y observaciones fechadas de motores de respuesta. La mejora se informa por capa y no como una promesa causal.

## Capas de evidencia

| Capa | Evidencia | Fuerza | Limite |
| --- | --- | --- | --- |
| A. Protocolo publico | requests HTTP, headers, DNS, contratos, hashes y validadores independientes | alta y reproducible | prueba disponibilidad tecnica, no uso real |
| B. Telemetria del owner | Search Console, Bing Webmaster Tools, Cloudflare AI Crawl Control y logs saneados | alta para acceso/indexacion | requiere dominio verificado y depende del proveedor |
| C. Visibilidad en respuestas | panel fijo de preguntas en GPT, Gemini, Claude, Perplexity y Copilot, con fecha, modelo, modo web y citas | direccional | resultados variables; no es prueba de causalidad |
| D. Graders comerciales | HubSpot y herramientas GEO/AEO de terceros | exploratoria | metodologia parcial, caja negra o incentivo comercial |

## Registro de verificadores

| Verificador | Que mide | Uso recomendado | Clasificacion |
| --- | --- | --- | --- |
| Cloudflare Agent Readiness / URL Scanner | discovery, Markdown, bot control, catalogs, OAuth, MCP, WebMCP y otras senales agenticas | evidencia externa principal de protocolo, conservando respuesta cruda, fecha y version | A |
| Vercel Agent Readability Spec | rubric reproducible para discovery, estructura, contexto, Markdown y contenido por pagina | segunda metodologia tecnica; ejecutar con un runner propio versionado hasta que exista un scanner oficial verificable | A, no auditor independiente por si sola |
| Schema.org Markup Validator | sintaxis y grafo de JSON-LD, RDFa y Microdata | validar structured data antes y despues | A |
| Google Rich Results Test / Search Console | elegibilidad de rich results, indexacion, crawl y render segun Google | evidencia de buscador para owners verificados | A/B |
| Bing URL Inspection / Site Scan | indexacion, live fetch, SEO y markup; Bing declara relacion con grounding y Copilot | evidencia de buscador y grounding para owners verificados | B |
| Cloudflare AI Crawl Control | requests reales por crawler, operador, path, estado y cumplimiento robots | probar acceso real, no solo configuracion | B |
| HubSpot AI Search Grader | reconocimiento, presencia, sentimiento, share of voice y posicion competitiva | baseline comercial secundario, nunca como prueba tecnica unica | C/D |
| Panel AFW de respuestas | consultas controladas y repetibles con capturas, texto, citas y metadata | comparar visibilidad antes/despues sin prometer ranking | C |

## Paquete de evidencia para clientes

Cada entrega AFW debe poder generar un `External Evidence Pack` con:

1. URL canonica, timestamp UTC, hash del expediente y version de metodologia.
2. Snapshot previo y posterior de archivos, headers, DNS y contratos.
3. Resultado de AF-0 a AF-5 separado de cada auditor externo.
4. Cloudflare Agent Readiness y, cuando aplique, Vercel Agent Readability.
5. Validacion Schema.org y pruebas de Google/Bing accesibles al owner.
6. Telemetria de crawlers por periodo, sin IPs ni datos personales innecesarios.
7. Panel AEO con prompts estables, idioma, region, modelo, modo web y citas.
8. Cambios, limites, checks no aplicables y cualquier cambio metodologico del proveedor.

El informe compara evidencia. No afirma que una subida de puntuacion cause mas ventas, trafico, indexacion o recomendaciones.

## Politica de actualizacion

- revisar trimestralmente fuentes, checks y versiones;
- marcar una observacion `stale` cuando cambie la metodologia externa;
- conservar el resultado historico en vez de sobreescribirlo;
- agregar nuevos verificadores primero como `experimental`;
- retirar un verificador si no publica suficiente metodologia o produce resultados irreproducibles;
- ejecutar auditorias externas despues del despliegue, nunca como sustituto de tests locales;
- mantener las capsulas de publicacion y Block 5B capaces de declarar pruebas posteriores por proveedor.

## Fuentes oficiales iniciales

- Cloudflare Agent Readiness: `https://blog.cloudflare.com/agent-readiness/`
- Cloudflare AI Crawl Control: `https://developers.cloudflare.com/ai-crawl-control/`
- Vercel Agent Readability: `https://vercel.com/kb/guide/agent-readability-spec`
- Google structured data testing: `https://developers.google.com/search/docs/appearance/structured-data`
- Google Search debugging: `https://developers.google.com/search/help/debug`
- Schema.org validator: `https://validator.schema.org/docs/validator.html`
- Bing URL Inspection: `https://www.bing.com/webmasters/help/URL-Inspection-55a30305`
- Bing Webmaster Guidelines: `https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a`
- HubSpot AI Search Grader: `https://www.hubspot.com/ai-search-grader`

## Roadmap

1. Incorporar este registro al roadmap y al plan de pruebas de Block 5B.
2. Construir runner versionado para la rubrica Vercel y guardar resultados JSON.
3. Disenar el `External Evidence Pack` descargable y su schema.
4. Integrar telemetria solo con consentimiento y acceso owner-scoped.
5. Crear panel AEO repetible con prompts y modelos declarados.
6. Automatizar vigilancia trimestral de cambios en estandares y auditores.
