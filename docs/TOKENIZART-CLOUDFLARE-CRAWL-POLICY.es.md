# Politica propuesta Cloudflare y crawlers de IA

**Estado:** propuesta pendiente de verificacion en dashboard y aprobacion de produccion

**Fecha:** 2026-08-26

## Objetivo

Facilitar que el conocimiento publico de Tokenizart sea encontrable y utilizable para responder preguntas, sin conceder por omision un permiso general de entrenamiento ni exponer superficies privadas.

## Politica de contenido publico Nivel 5

| Uso | Politica inicial | Motivo |
| --- | --- | --- |
| Busqueda | `search=yes` | Tokenizart quiere ser encontrado y citado |
| Respuesta a solicitud del usuario | `ai-input=yes` | Permite que una LLM use el contenido publico para responder una pregunta |
| Entrenamiento | `ai-train=no` | Reserva conservadora hasta definir una politica de licencia/atribucion |

## Familias de agentes a revisar

- OpenAI: GPTBot, OAI-SearchBot y ChatGPT-User.
- Anthropic: ClaudeBot, Claude-SearchBot y Claude-User.
- Perplexity: PerplexityBot y Perplexity-User.
- Google: Googlebot y Google-Extended, que cumplen funciones diferentes.
- Apple, Amazon, Meta, Cohere y Common Crawl: revisar por uso y politica vigente.

Los nombres cambian. La lista operativa debe contrastarse con la referencia actual de Cloudflare antes de cada revision.

## Cloudflare

Tokenizart usa nameservers y proxy Cloudflare en el dominio principal. Se debe:

1. abrir AI Crawl Control y registrar el estado actual antes de modificar;
2. distinguir bots de busqueda, recuperacion solicitada por el usuario y entrenamiento;
3. conservar WAF, rate limits y Bot protections sin bloquear contenido publico por accidente;
4. revisar analytics 24 a 72 horas despues de un cambio;
5. documentar fecha, actor y rollback.

Atelier no presento cabeceras Cloudflare en la auditoria. No se debe asumir que esta politica se aplica alli ni cambiar su DNS/proxy sin un plan separado.

## Limites

- `robots.txt` y Content Signals expresan preferencias; no son controles de acceso.
- La no indexacion no es instantanea ni garantizada.
- Datos Nivel 1 a 4, sesiones, owner data y APIs privadas deben permanecer autenticados y fuera de archivos publicos.
- La politica no habilita MCP, Owner Live, compras ni acciones Atelier.
