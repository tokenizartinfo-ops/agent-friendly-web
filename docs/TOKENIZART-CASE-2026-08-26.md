# Caso Tokenizart: auditoria y transformacion agent-friendly

**Fecha de corte inicial:** 2026-08-26

**Ultima reauditoria externa:** 2026-08-30

**Responsable:** Gabriel Mucchiut

**Metodo:** Gabriel Mucchiut Agent Friendly Web Method v1

**Estado:** implementacion progresiva; no constituye certificacion

## 1. Objetivo

Tokenizart es el primer caso integral del metodo Agent Friendly Web. La meta no es sumar archivos aislados ni obtener una puntuacion cosmetica: es hacer que humanos, buscadores y agentes puedan descubrir, comprender, citar y, cuando corresponda, usar herramientas reales con limites claros.

El caso se publica y sigue en `https://agentfriendlyweb.dev/casos/tokenizart`. Esta atribucion permite verificar que plataforma, metodologia y responsables acompañan la transformacion. No constituye certificacion oficial, garantia de indexacion ni permiso para consultar informacion privada.

El Registry agrega una segunda representacion verificable en `https://agentfriendlyweb.dev/registry/tokenizart`, con formatos JSON y Markdown para agentes. El perfil inicial es un caso curado y aprobado por el fundador: no sustituye una futura verificacion DNS de `tokenizart.com`, no publica datos owner y conserva sus fuentes y limites.

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

### Reauditoria externa de Tokenizart del 2026-08-30

Una nueva consulta directa a `https://isitagentready.com/api/scan` clasifico `https://tokenizart.com` como **Level 1 - Basic Web Presence**. La respuesta del proveedor no incluyo un puntaje numerico, por lo que no se inventa ni deriva uno.

Pasaron `robotsTxt`, `sitemap` y `robotsTxtAiRules`. Fallaron `linkHeaders`, `dnsAid`, `markdownNegotiation`, `contentSignals`, `apiCatalog`, `oauthDiscovery`, `oauthProtectedResource`, `authMd`, `mcpServerCard`, `a2aAgentCard`, `agentSkills`, `webMcp` y `ard`. Los checks comerciales fueron informativos o neutrales.

Esto fija la prelacion del caso Tokenizart:

1. publicar verdad y descubrimiento basico en `tokenizart.com`: Content Signals, archivos `llms`, cabeceras y catalogos;
2. publicar solo las skills, OpenAPI y tarjetas que correspondan a recursos reales y mantenibles;
3. tratar Markdown, ARD y WebMCP read-only como mejoras verificables;
4. conservar DNS, OAuth, A2A y pagos detras de gates propios, sin simular capacidades para aumentar el nivel externo.

### Resultado post despliegue de Agent Friendly Web v2

Despues de publicar Content Signals, Link headers, Agent Skills index, catalogo de recursos y API Catalog:

- el primer corte post despliegue llevo el auditor AF v1 de 63/100 a 65/100;
- el auditor externo paso de Level 1 a **Level 2 - Bot-Aware**;
- el siguiente requisito externo identificado es negociacion `Accept: text/markdown`.

### Resultado Agent Friendly Web v3

El 2026-08-26, luego de publicar la primera capa agent-native completa y repetir la auditoria sobre el dominio canonico:

- el auditor AF v1 alcanzo **70/100, AF-3 herramientas**;
- respondieron HTTP 200 la portada, demostrador de evolucion, `robots.txt`, sitemap, `llms.txt`, `llms-full.txt`, OpenAPI, API Catalog, AI Catalog, indice de skills, manifiesto de readiness y `security.txt`;
- `/expediente` permanecio cerrado y redirigio a autenticacion;
- `Accept: text/markdown` continuo devolviendo HTML, por lo que Markdown for Agents sigue pendiente;
- MCP, A2A, CLI y x402 se conservan como capacidades futuras o experimentales y no se presentan como servicios activos.

La mejora es evidencia de que el proceso funciona. No se agrega una respuesta falsa para alcanzar otro nivel, y el puntaje no implica indexacion, recomendacion ni certificacion de terceros.

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
- Publicar un manifiesto ARD compatible y su enlace de descubrimiento solo despues de validar el paquete en preview.
- Repetir la auditoria externa y registrar cada fotografia en el perfil AF-EV del caso.

### Fase P2 - Herramientas reales

- Publicar el indice de skills solo con artefactos descargables, versionados y verificables.
- Publicar OpenAPI y MCP card cuando los endpoints read-only tengan URL estable, seguridad, rate limits y soporte.
- Marcar CLI, MCP, OKF y skills como `release_candidate` hasta completar esos gates.
- Incorporar WebMCP exclusivamente para tools publicas read-only que existan en la pagina y fallen cerradas.

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

Agent Friendly Web aplica la misma regla sobre si misma. Su manifiesto publico distingue recursos desplegados, candidatos, capacidades planificadas y lineas de investigacion. El MCP remoto read-only ya desplegado se diferencia del candidato WebMCP de navegador; A2A y x402 siguen sin anunciarse como operativos. Ninguna capacidad se considera desplegada hasta que exista endpoint o integracion, contrato, seguridad y prueba reproducible.

## 11. Perfil Registry v1

La version 1 registra:

- `tokenizart.com` como presencia publica principal;
- `atelier.tokenizart.com` como plataforma operativa declarada por el owner;
- Mint ERC-721, Certify, NFC y Gallery como capacidades declaradas;
- `robots.txt` y sitemap observados con fecha;
- CLI, MCP, skills y OKF como release candidates, no como servicios productivos;
- Owner Live, acciones mutantes y datos owner fuera del Registry publico.

Las futuras mejoras deben crear una nueva version. No se reescribe silenciosamente la fotografia historica de 2026-08-26.

## 10. Fuentes primarias

- Cloudflare AI Crawl Control: https://developers.cloudflare.com/ai-crawl-control/
- Cloudflare crawler policy: https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/
- Cloudflare AI bot reference: https://developers.cloudflare.com/ai-crawl-control/reference/bots/
- Cloudflare Markdown for Agents: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- Google crawling and indexing: https://developers.google.com/search/docs/crawling-indexing
- Google robots guidance: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- MCP TypeScript SDK 2026-07-28 support: https://ts.sdk.modelcontextprotocol.io/v2/migration/support-2026-07-28

## 11. Dominio operativo de Agent Friendly Web

El 2026-08-26 se registro `agentfriendlyweb.dev` en la misma cuenta organizacional de Cloudflare utilizada por Tokenizart.

- Titular del registro: Gabriel Mucchiut.
- Proveedor de registro y DNS: Cloudflare.
- Periodo inicial: un ano.
- Fecha de expiracion verificada: 2027-08-26.
- Renovacion automatica: desactivada.
- Origen canonico: `https://agentfriendlyweb.dev/`.
- Estado de publicacion: activo. El dominio quedo vinculado al proyecto Sites con DNS y certificado TLS validados.
- Pruebas de publicacion: respuestas HTTP 200 verificadas para portada, `robots.txt`, `llms.txt`, `llms-full.txt`, `sitemap.xml`, OpenAPI, catalogo publico, indice de skills, manifiesto Tokenizart y pagina del caso.
- Acceso privado: `/expediente` redirige al login autenticado y conserva `https://agentfriendlyweb.dev/callback` como retorno.
- Limite conocido: la negociacion `Accept: text/markdown` de la portada continua entregando HTML y permanece como mejora verificable; no se declara implementada.

No se versionan datos personales de contacto, domicilio, telefono, tarjeta ni identificadores de pago. La decision de renovar requiere revision anticipada del uso, precio vigente y aprobacion humana expresa.
