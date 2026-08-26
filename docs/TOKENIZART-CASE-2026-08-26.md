# Caso Tokenizart: auditoria y transformacion agent-friendly

**Fecha de corte:** 2026-08-26

**Responsable:** Gabriel Mucchiut

**Metodo:** Gabriel Mucchiut Agent Friendly Web Method v1

**Estado:** implementacion progresiva; no constituye certificacion

## 1. Objetivo

Tokenizart es el primer caso integral del metodo Agent Friendly Web. La meta no es sumar archivos aislados ni obtener una puntuacion cosmetica: es hacer que humanos, buscadores y agentes puedan descubrir, comprender, citar y, cuando corresponda, usar herramientas reales con limites claros.

La arquitectura debe comunicar una diferencia esencial:

- `tokenizart.com` presenta la identidad, filosofia, servicios, conocimiento y acceso al ecosistema;
- **Atelier es la plataforma operativa de Tokenizart**, donde un usuario autenticado prepara obras u objetos unicos, revisa sus datos y realiza las acciones habilitadas para su cuenta;
- `tokenizart-agentic` versiona CLI, contratos MCP, skills y exportaciones OKF;
- Owner Live es una frontera privada, read-only, con identidad, consentimiento, scopes y auditoria, separada del descubrimiento publico.

## 2. Resultado inicial reproducible

### Auditor Agent Friendly Web

| Superficie | Puntaje AF v1 | Nivel | Evidencia principal |
| --- | ---: | --- | --- |
| `https://tokenizart.com/` | 23/100 | AF-1 descubrible | `robots.txt` y sitemap presentes; sin `llms`, JSON-LD, Markdown negociado ni herramientas publicadas en el origen |
| `https://atelier.tokenizart.com/` | 14/100 | AF-0 invisible | `robots.txt` presente; sin sitemap, `llms`, JSON-LD ni catalogos publicos |
| Agent Friendly Web | 63/100 | AF-3 herramientas | auditor, sitemap, `llms`, OpenAPI y skill publicos; faltaban catalogos y politica Content Signals |

Estos puntajes son una fotografia. El metodo mantiene la puntuacion original para poder demostrar el progreso con la misma regla.

### Auditor externo de Cloudflare

El 2026-08-26, `isitagentready.com` clasifico:

- Tokenizart como **Level 1 - Basic Web Presence**;
- Atelier como **Level 0 - Not Ready**;
- Agent Friendly Web como **Level 1 - Basic Web Presence**.

El resultado externo confirma la direccion general del auditor propio, aunque utiliza otra escala y otros checks. No debe mezclarse un puntaje con el otro.

### Resultado post despliegue de Agent Friendly Web v2

Despues de publicar Content Signals, Link headers, Agent Skills index, catalogo de recursos y API Catalog:

- el auditor AF v1 paso de 63/100 a **65/100**, manteniendo AF-3 herramientas;
- el auditor externo paso de Level 1 a **Level 2 - Bot-Aware**;
- el siguiente requisito externo identificado es negociacion `Accept: text/markdown`.

La mejora es evidencia de que el proceso funciona. Markdown for Agents permanece pendiente porque debe implementarse realmente; no se agrega una respuesta falsa para alcanzar otro nivel.

### Crawlers observados

Pruebas publicas con user agents de OpenAI, Anthropic, Perplexity, Google, Apple, Amazon, Meta, Cohere y Common Crawl devolvieron HTTP 200 para el inicio y `robots.txt` de Tokenizart y Atelier. Esto demuestra accesibilidad HTTP en la prueba, no indexacion, recomendacion ni uso garantizado por esos proveedores.

## 3. Hallazgos del sitio Tokenizart

### Lo que funciona

- `robots.txt` esta disponible y conserva restricciones de WordPress/WooCommerce.
- El sitemap de WordPress esta disponible en `https://tokenizart.com/wp-sitemap.xml`.
- El dominio usa nameservers de Cloudflare y el trafico web observado pasa por Cloudflare.
- Existen paginas y productos publicos que pueden transformarse en respuestas citables.

### Lo que falta o debe corregirse

- No se observaron `llms.txt` ni `llms-full.txt`.
- No se observaron JSON-LD ni meta description en la portada.
- El documento declara `lang="en-US"` aunque la experiencia mezcla idiomas.
- Hay varios H1 y contenido duplicado o historico en el sitemap de WordPress.
- No se observaron Content Signals ni grupos explicitos para crawlers de IA.
- No se observaron Markdown negociado, Link headers utiles, API Catalog, Agent Skills, MCP card ni OpenAPI en el origen.
- El estado de AI Crawl Control en el panel Cloudflare no pudo verificarse desde una sesion autenticada; sigue siendo una tarea de revision, no una capacidad confirmada.

## 4. Hallazgos de Atelier

### Lo que funciona

- `robots.txt` permite el contenido publico y bloquea `/api/*`.
- El sitio se presenta como una aplicacion Next.js y sus rutas publicas responden.

### Lo que falta o debe corregirse

- No se observo sitemap, `llms`, canonical, meta description, JSON-LD ni H1 en la portada.
- La negociacion `Accept: text/markdown` devuelve HTML.
- Atelier resuelve directamente al origen observado y no presenta cabeceras Cloudflare. Por ello no debe suponerse que AI Crawl Control o Markdown for Agents de Cloudflare protegen o transforman esta superficie.
- El repositorio `tokenizart-atelier-web` todavia no contiene el baseline completo desplegable. Los cambios deben implementarse en el source real y mediante un release controlado.

## 5. Activos agenticos existentes

El repositorio publico `tokenizart-agentic` contiene CLI read-only, contratos MCP, skills y exportaciones OKF en estado **release candidate**. Es evidencia del trabajo tecnico, pero no equivale a endpoints productivos en `tokenizart.com`.

La politica de publicacion es:

1. publicar documentos y manifests que describan con exactitud el estado;
2. versionar contratos y artefactos;
3. verificar endpoint, ownership, seguridad, limites, privacidad y soporte;
4. solicitar aprobacion de produccion;
5. recien entonces anunciar una herramienta como disponible.

Owner Live read-only permanece fuera de este caso publico. No debe aparecer en `llms.txt` como herramienta abierta ni exponer datos owner.

## 6. Politica de crawlers propuesta

Para conocimiento publico Nivel 5:

- `search=yes`: permitir indexacion para busqueda;
- `ai-input=yes`: permitir que el contenido publico responda solicitudes de usuarios;
- `ai-train=no`: reserva conservadora de entrenamiento hasta una decision estrategica expresa.

Esta declaracion no sustituye las condiciones de cada crawler ni obliga a terceros. La privacidad se resuelve con autenticacion y controles de acceso, no con `robots.txt`.

## 7. Roadmap de ejecucion

### Fase P0 - Contenido y verdad publica

- Definir una portada con idioma, titulo, descripcion y un unico H1 coherentes.
- Consolidar paginas duplicadas y retirar del sitemap contenido obsoleto.
- Publicar explicaciones citables de Tokenizart, Atelier, Mint, Certify, NFC, privacidad, Gallery, vouchers, ERC-721 y ERC-4337.
- Incorporar JSON-LD que coincida con el contenido visible.

### Fase P1 - Descubrimiento por maquinas

- Instalar `llms.txt` y `llms-full.txt` en ambos origenes.
- Actualizar `robots.txt` sin perder restricciones existentes.
- Incorporar sitemap en Atelier y Link headers utiles.
- Revisar AI Crawl Control en Cloudflare y registrar la configuracion observada.
- Evaluar Markdown for Agents en Tokenizart, primero con prueba y rollback.

### Fase P2 - Herramientas reales

- Publicar el indice de skills solo con artefactos descargables, versionados y verificables.
- Publicar OpenAPI y MCP card cuando los endpoints read-only tengan URL estable, seguridad, rate limits y soporte.
- Marcar CLI, MCP, OKF y skills como `release_candidate` hasta completar esos gates.

### Fase P3 - Owner Live read-only

- Mantener identidad Atelier, consentimiento, scope, expiracion, revocacion y auditoria.
- Habilitar primero un unico usuario allowlisted mediante una aprobacion separada.
- No mezclar esta frontera con el auditor publico ni con los crawlers.

### Fase P4 - Acciones y pagos

- Evaluar x402/MPP solo para servicios transaccionales definidos.
- No usar pagos como sustituto de autorizacion.
- Mint, Certify, NFC, transfer, vouchers, privacidad, uploads y firma wallet requieren contratos, confirmacion humana, idempotencia y auditoria propios.

## 8. Responsabilidades

| Responsable | Trabajo propuesto | Gate |
| --- | --- | --- |
| Gabriel | aprobar textos, politica `ai-train`, ventana de produccion y prioridades | aprobacion humana |
| Leonardo | WordPress: contenido, idioma, metadata, JSON-LD y archivos publicos | backup + preview + rollback |
| Leandro | verificar Cloudflare, cabeceras y source real de Atelier; preparar PR/release | sin proxy ni deploy directo sin aprobacion |
| Codex | mantener paquete, pruebas, auditorias comparativas y documentacion | evidencia reproducible |

## 9. Criterio de exito

El caso alcanza su primer objetivo cuando:

- Tokenizart y Atelier explican correctamente su relacion;
- los archivos publicos son accesibles con HTTP 200 y contenido correcto;
- el sitemap y JSON-LD coinciden con las paginas humanas;
- los crawlers permitidos no reciben bloqueos accidentales;
- ninguna capacidad privada o candidata se presenta como produccion;
- una segunda auditoria demuestra la mejora y registra los checks aun pendientes.

Llegar a "100% agent-friendly" no significa activar todos los protocolos. Significa que cada capacidad necesaria esta publicada, verificable, segura y correctamente limitada; y que lo que no existe se declara como roadmap, no como servicio.

## 10. Fuentes primarias

- Cloudflare AI Crawl Control: https://developers.cloudflare.com/ai-crawl-control/
- Cloudflare crawler policy: https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/
- Cloudflare AI bot reference: https://developers.cloudflare.com/ai-crawl-control/reference/bots/
- Cloudflare Markdown for Agents: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- Google crawling and indexing: https://developers.google.com/search/docs/crawling-indexing
- Google robots guidance: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- MCP TypeScript SDK 2026-07-28 support: https://ts.sdk.modelcontextprotocol.io/v2/migration/support-2026-07-28
