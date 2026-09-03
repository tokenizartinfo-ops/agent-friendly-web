---
type: Service
title: FAQ y guia publica determinista
description: Catalogo multilingue compartido, continuidad local y limites de seguridad.
resource: https://agentfriendlyweb.dev/preguntas-frecuentes
tags:
  - agent-friendly-web
  - faq
  - guide
  - multilingual
  - read-only
status: stable
stale_after: 2026-12-01T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-09-02T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-09-02T00:00:00Z
sources:
  - id: source-1
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/0ce175906ab21763cc6c1a11d9adc65c30dcc527/docs/PUBLIC-FAQ-AND-GUIDE.es.md
    title: Preguntas frecuentes y guia publica determinista
    author: person:gabriel-mucchiut
    last_modified: 2026-08-31T00:00:00Z
---
# FAQ y guia publica determinista

## Catalogo compartido

Agent Friendly Web mantiene un unico catalogo revisado para las preguntas frecuentes visibles en la portada, la pagina completa, los datos estructurados y la guia conversacional. La misma respuesta no se copia manualmente entre superficies: se deriva de una entrada canonica con identificador, intenciones, fuentes y versiones en espanol, ingles y portugues.

El catalogo cubre como minimo:

- significado de agent friendly y agent first;
- progreso no automatico entre AF-0 y AF-5;
- limites de la auditoria publica;
- funciones de `robots.txt`, sitemap, `llms.txt` y `llms-full.txt`;
- AEO y politicas diferenciadas para crawlers;
- Registry y verificacion limitada del dominio;
- inicio sin contrasenas ni credenciales;
- estado read-only de CLI y MCP;
- alcance y cotizacion sin precios inventados;
- verificacion externa;
- Tokenizart como primer caso integral.

La pagina publica usa elementos expandibles accesibles y genera `FAQPage` JSON-LD desde el mismo catalogo. Esto reduce contradicciones entre lo que una persona lee y lo que una maquina interpreta.

## Guia determinista

La guia publica es una ayuda de orientacion, no un agente autonomo. Se ejecuta del lado del cliente con reglas deterministas, conserva el tema solo durante la pagina abierta y no consulta un modelo externo.

Cuando una pregunta coincide de forma explicita con una FAQ, la guia usa su respuesta breve o detallada y enlaza la pagina publica correspondiente. Las solicitudes como "mas simple" o "mas detalle" conservan el tema anterior. Las preguntas generales siguen usando el catalogo tematico historico para evitar que una palabra comun cambie toda la conversacion.

Cada turno mantiene un contrato estable con tema, modo, respuesta, fuentes, siguiente contexto y estado de bloqueo. El contrato legible por maquinas esta publicado en `/.well-known/public-guide-contract.json`.

## Seguridad y limites

El filtro de posibles credenciales se ejecuta antes de clasificar la intencion. La guia bloquea mensajes que parecen contener passwords, API keys, bearer tokens, private keys o datos de pago y no repite el valor detectado.

La guia:

- no usa `localStorage`, `sessionStorage`, cookies ni una base remota;
- no accede a expedientes privados, Registry privado ni datos de clientes;
- no publica, despliega, paga, envia email ni modifica sitios;
- no garantiza ranking, indexacion, cita o recomendacion;
- no reemplaza aprobacion humana, permisos minimos, auditoria ni rollback.

Una FAQ puede orientar el siguiente paso, pero nunca convierte una frase del visitante en autorizacion operativa.

## Rutas publicas

- Espanol: `https://agentfriendlyweb.dev/preguntas-frecuentes`
- Ingles: `https://agentfriendlyweb.dev/en/frequently-asked-questions`
- Portugues: `https://agentfriendlyweb.dev/pt/perguntas-frequentes`
- Guia publica: `https://agentfriendlyweb.dev/guia`
- Contrato de la guia: `https://agentfriendlyweb.dev/.well-known/public-guide-contract.json`
- Conocimiento abierto: `https://agentfriendlyweb.dev/conocimiento-abierto`

Las rutas forman parte del sitemap y del mapa humano del sitio. La distribucion OKF reutiliza esta fuente con fecha, procedencia, licencia y checksum para que otras herramientas puedan verificarla sin tratarla como una API o permiso de accion.
