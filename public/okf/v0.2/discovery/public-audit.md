---
type: Service
title: Auditoria publica read-only
description: Recorrido, controles y limites del scanner publico.
resource: https://agentfriendlyweb.dev/
tags:
  - agent-friendly-web
  - audit
  - read-only
status: stable
stale_after: 2026-11-25T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-08-27T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-08-27T00:00:00Z
sources:
  - id: source-1
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/SPECIFICATION.es.md
    title: Especificacion funcional y tecnica v1
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
  - id: source-2
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/SECURITY.md
    title: Seguridad y fronteras publicas
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
---
# Auditoria publica read-only

## 1. Proposito

Agent Friendly Web ayuda a una persona no tecnica a responder tres preguntas:

1. Que pueden descubrir hoy los agentes sobre mi sitio.
2. Que informacion o control falta para mejorarlo.
3. Cual es la proxima accion verificable y proporcionada.

No reemplaza una auditoria de seguridad, no certifica posicionamiento en respuestas de IA y no promete que un proveedor de modelos vaya a indexar o recomendar un sitio.

### 3.1 Auditoria publica

1. El visitante ingresa un dominio.
2. El servidor normaliza la URL y rechaza esquemas, credenciales, puertos y hosts no publicos.
3. Se verifica la resolucion DNS mediante Cloudflare DNS over HTTPS.
4. Se consultan recursos publicos con timeout, limite de tamaño y sin seguir redirecciones.
5. Cada señal se valida por contenido y no solo por codigo HTTP.
6. El resultado muestra puntuacion, nivel, evidencia, limites y fecha.

## 8. Criterios de aceptacion v1

- La auditoria nunca modifica el sitio analizado.
- Un 200 HTML de fallback no se presenta como `llms.txt`, MCP u OpenAPI valido.
- Los niveles AF muestran metodologia y evidencia.
- El expediente requiere identidad y se aisla por usuario.
- Ningun formulario solicita secretos.
- Tokenizart se presenta como caso real con fecha y limites, no como sitio 100% agentico antes de serlo.
- La verificacion no publica ni concede acceso de escritura.
- La publicacion requiere consentimiento explicito y una verificacion vigente.
- El perfil publico no contiene emails operativos, notas internas, secretos ni cuerpos de auditoria.
- JSON y Markdown expresan la misma version y procedencia que la vista humana.

## Modelo v1

El auditor realiza consultas GET a recursos publicos. No inicia sesion en el sitio objetivo, no ejecuta JavaScript remoto, no sigue redirecciones y no modifica datos.

Controles implementados:

- solo HTTP/HTTPS;
- sin credenciales en URL;
- sin puertos alternativos;
- rechazo de localhost y rangos privados conocidos;
- verificacion DNS A/AAAA mediante Cloudflare DoH;
- rechazo si alguna respuesta resuelve a una direccion privada;
- timeout por consulta;
- limite de lectura por respuesta;
- redirecciones deshabilitadas;
- validacion por contenido para evitar falsos positivos de paginas 200/404;
- expedientes protegidos mediante Sign in with ChatGPT;
- campos allowlisted y eventos metadata-only.
