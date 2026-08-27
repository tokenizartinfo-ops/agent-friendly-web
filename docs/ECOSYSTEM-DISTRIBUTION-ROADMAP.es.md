# Roadmap de plugins, skills y distribucion

**Estado:** planificado por adaptador  
**Fecha:** 2026-08-27

## Principio

Tokenizart, Atelier y Agent Friendly Web necesitan distribuir conocimiento y herramientas sin afirmar una compatibilidad universal inexistente. Cada cliente, tienda o protocolo conserva su propio contrato, revision y ciclo de release.

## Orden

1. inventariar skills internas y separar contenido publico de operacion Nivel 1-4;
2. publicar skills read-only con fuentes, limites y version;
3. estabilizar CLI y MCP read-only;
4. crear el primer paquete Tokenizart/Atelier para Codex y ChatGPT;
5. validar adaptadores oficiales para Claude y Gemini;
6. investigar una superficie oficial adecuada de xAI/Grok;
7. evaluar WebMCP con threat model y compatibilidad real;
8. publicar plugins solo despues de pruebas de instalacion y politica de distribucion.

## Skills existentes como insumo

- `tokenizart-agentic-protocols`;
- `tokenizart-atelier-agent-integration`;
- `tokenizart-brain-curator`;
- `tokenizart-conversation-and-visual-copilot`;
- `Visualize`, disponible internamente para prototipos y explicaciones visuales.

Su existencia local no prueba que terceros puedan instalarlas. Cada version publica debe tener licencia, alcance, actor, nivel, fuentes, tools permitidas y acciones bloqueadas.

## WebMCP

Se mantiene como linea experimental. Antes de anunciar soporte se exige especificacion vigente, compatibilidad de cliente, control de permisos, aislamiento de datos, auditoria y prueba contra prompt injection. ChatGPT o Codex no deben describirse como compatibles por inferencia: se documentara cada integracion observada.
