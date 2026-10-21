# AFW — qué aprovechar de Cloudflare Pro

21oct2026. Evaluación y orden de adopción solicitado por Gabriel; no activación de productos, contratación o presupuesto nuevo. Separa disponibilidad del plan, configuración observada y propuestas. Proyecto AFW, zona agentfriendlyweb.dev; los recursos Tokenizart/Atelier no son destinos.

## Decisión recomendada

Aprovechar Pro para seguridad compatible con agentes y, después de medir, rendimiento público. La preferencia cloud del owner se cumple con los builds/pruebas ya ejecutados en GitHub; no hace falta comprar otra infraestructura para ese trabajo. El valor debe medirse como acceso legítimo, reducción de abuso o menor transferencia/latencia sin pérdida de certeza, nunca como cantidad de funciones activadas.

## Evidencia de cuenta y configuración

API21oct21:06:24.835UTC confirmó Pro Website/legacy_id pro/is_subscribed true en la zona canónica. Esto no demuestra un plan Workers Paid, Zero Trust, Images o Bot Management Enterprise. La consulta account/subscriptions anterior devolvió403 por alcance del conector; no se amplían permisos ni se deduce fallo de claves desde esa lectura.

Lectura22:07:21.221UTC: JavaScript detections false; definitely_automated allow; verified_bots allow; ai_bots_protection disabled. Las fases de zona http_request_firewall_managed, http_request_firewall_custom y http_request_cache_settings devolvieron404 de entrypoint: no se observó una configuración explícita en esas tres fases de esa zona. No significa ausencia de toda protección Cloudflare, DDoS, configuración de cuenta o Access.

Lectura22:07:54.679UTC: Polish off, WebP off, Early Hints off, HTTP3 off, Rocket Loader off; browser_cache_ttl14400 y cache_level aggressive son valores de zona, no evidencia de caché efectiva de una respuesta privada o permiso para cachearla. No se modificaron estos valores.

## Prioridades por utilidad

| Orden | Herramienta / relación con Pro | Uso concreto para AFW | Siguiente resultado revisable y criterio |
| --- | --- | --- | --- |
| 1 | Super Bot Fight Mode, incluido en Pro | Controlar abuso con acciones y excepciones, conservando descubrimiento y clientes MCP/A2A legítimos | Matriz por hostname/ruta/método y componente, antes de enforcement. GET públicos, JSONRPC/MCP y Access conservan sus contratos; un agente legítimo no debe recibir HTML de challenge donde espera JSON. |
| 2 | Cloudflare Managed Ruleset y OWASP Core Ruleset, disponibles desde Pro | Proteger la web y APIs de patrones de ataque con ajustes concretos | Inventario de reglas, candidata acotada y recuperación de configuración. Probar tráfico válido y rechazo de entradas inválidas; afinar falsos positivos por regla concreta, sin excepciones amplias. |
| 3 | Security Analytics / Security Events, también disponibles en otros planes | Diagnosticar desafíos, bloqueos y errores por superficie con datos fechados | Consultas mínimas de AFW, ventana/dataset/filtrado y muestreo explícitos. No copiar respuestas privadas, tokens, cookies, correos o logs completos a métricas de producto. |
| 4 | Polish, incluido en Pro | Evaluar menor peso de ilustraciones públicas manteniendo la identidad comic | Muestra propia y comparación bytes/visual/negociación. Confirmar aplicabilidad al camino real Worker/ASSETS antes de activar. Si cambia bytes, preservar originales y separar derivados de cápsulas/archivos con hash; no aplicar a evidencias privadas ni asumir mejora de correos CID. |
| 5 | Cache Rules, también disponibles en otros planes | Reglas explícitas para recursos públicos versionados, si la medición muestra necesidad | Comprobar Cache-Control/Vary/Accept y respuestas reales. Conservar no-store y separación de identidad de rutas privadas/OAuth; no usar Cache Everything como regla general. |
| 6 | Rate limiting de zona, con capacidades según plan | Complementar los límites del Worker donde exista abuso medido | Regla por endpoint y comportamiento JSON; no challenge genérico a APIs. Sus contadores son eventualmente consistentes por ubicación: no sustituyen cuota, presupuesto o idempotencia del producto. |
| 7 | Snippets / Custom Errors, con oferta Pro | Considerar solo un caso que el Worker actual no resuelva bien | Evitar una segunda capa de lógica sin necesidad. No convertir errores API en HTML o éxitos200, ni confundir páginas de error de la zona con pantallas de Access de otro hostname. |

La disponibilidad de Cloudflare Managed Ruleset/OWASP y Polish sí amplía la oferta frente a Free; Security Analytics y las reglas de caché no deben venderse internamente como capacidades nacidas con Pro. No inferir acceso a campos de bot score Enterprise o al modo Log de cualquier producto desde la tabla.

## Seguridad y descubribilidad se diseñan juntas

Verified bot no incluye necesariamente a todo agente de un cliente. Un User-Agent o la ausencia de challenge no autentican. Las excepciones futuras deben ser específicas para el componente necesario y superficies admitidas; nunca omitir Access, autorización de aplicación o límites del scanner para hacer pasar un cliente.

Respetar la política de búsqueda/entrada dirigida permitidas y entrenamiento reservado. Bloquear indiscriminadamente todos los bots de IA puede contradecir ese propósito. No activar modos globales de challenge por inercia. Conservar una observación anterior y una ruta de recuperación antes de cada cambio.

No asumir modo de observación o acciones disponibles sin verificar su plan/schema concreto. Las pruebas de configuración no son prueba de entrega OTP, revisión útil, recomendación de LLM o mejora de score externo.

## Funciones cloud útiles que no vienen automáticamente con Pro

- Workers, Durable Objects, Containers, Workflows, Queues y registros tienen planes/uso de desarrollo propios. Workers Paid está separado de Pro Website. No declarar reparada la incidencia Container02382110 ni obtener cuota de IA/guardia por el upgrade.
- Browser Run puede servir en el futuro para QA pública/sintética desde la nube. Es una herramienta de la plataforma de desarrollo con disponibilidad y cobro propios: verificar plan/límites antes de un ensayo. No hereda tu perfil Chrome, identidad Access o acceso al ordenador. Actions ya permite ejecutar nuestra QA actual sin instalar browsers en tu PC.
- Cloudflare Images Transformations es distinto de Polish y puede facturar transformaciones. No sustituir imágenes o activar variantes dinámicas sin revisar costos, caché y procedencia.
- Workers AI/AI Gateway y servicios de búsqueda/IA no equivalen a tokens incluidos en tu suscripción Codex. No cambiar el modelo o proveedor del copilot ni contratar un servicio por esta evaluación.
- Email y Zero Trust conservan configuración y soporte propios. El upgrade de la zona no prueba que se haya despachado o recibido un código de Access.

## Bloques de implementación

A. Corregir primero incoherencias ya observadas del descubrimiento público: PR556 alinea A2A con la tarjeta y el servicio público existentes. Revisión de fuente no equivale a publicación; la PR y su recibo conservan aceptación y rollout por separado.

B. Preparar seguridad de Pro desde la matriz de superficies actual: configuración de origen exacta, propuesta mínima, pruebas de contratos públicos/privados y rollback recuperable. Inventario de esta evaluación ya realizado; propuesta/QA/enforcement aún separados. No instalar una política de bloqueo sin esa comprobación.

C. Evaluar imágenes/caché con una muestra pública consentida y medición reproducible, después de la corrección. Ahorro actual desconocido; no inventar porcentajes. Preservar identidad visual, originales e integridad.

D. Observar resultados y revertir o ajustar si se perjudica tráfico legítimo. Elegir otras herramientas solo ante una necesidad y un presupuesto concretos; ninguna alta, secreto, monitor o guardia se activa con este documento.

Los gates privados siguen siendo evidencia técnica de Access02389649 y Container02382110, luego sus aceptaciones propias. operationalReadiness=false y PCoff=false. No pedir apagar, repetir OTP, renovar accesos ni contactar a Max desde este plan.

## Fuentes primarias consultadas21oct2026

- [Super Bot Fight Mode y excepciones](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/).
- [Disponibilidad de Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).
- [Security Analytics y muestreo](https://developers.cloudflare.com/waf/analytics/security-analytics/) y [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/).
- [Polish y disponibilidad](https://developers.cloudflare.com/images/polish/); [transformaciones de Images](https://developers.cloudflare.com/images/optimization/transformations/overview/).
- [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/).
- [Rate limiting y límites eventualmente aplicados](https://developers.cloudflare.com/waf/rate-limiting-rules/).
- [Límites de reglas, snippets y custom errors](https://developers.cloudflare.com/changelog/post/2025-02-12-rules-upgraded-limits/).
- [Planes y uso Workers separados de Pro](https://developers.cloudflare.com/workers/platform/pricing/).

Las fuentes describen productos disponibles, no habilitación observada en esta cuenta. Documentación y planes pueden cambiar; verificar otra vez al preparar cada implementación. Este archivo es evaluación interna, no oferta de precios AFW ni garantía de prestaciones contratadas.

## Propuesta técnica posterior del21oct

La [candidata de seguridad compatible con agentes](AFW-PRO-AGENT-SAFE-SECURITY-CANDIDATE-2026-10-21.es.md) concreta el bloqueB con matriz de superficies, JSON desactivado y vencido, evidencia primaria de zona/rulesets, criterios de QA y recuperación por regla. No está instalada ni acredita protección nueva. Conserva defaults del proveedor y registra que Super Bot Fight Mode ya no admite modificación mediante Rulesets API. El siguiente gate es verificar la candidata por el proveedor y preparar copia recuperable/ventana de ensayo, sin ampliar automáticamente a APIs, otros hosts u OWASP.
