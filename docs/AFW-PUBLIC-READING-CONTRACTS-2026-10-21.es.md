# Lectura pública de portada y guía — 21 octubre 2026

## Resultado buscado

Comprobar desde GitHub Actions que las dos rutas del futuro ensayo Pro siguen legibles para personas y clientes programáticos. Es QA de lectura pública; no modifica reglas WAF, bots, caché, permisos ni tráfico.

Proyecto AFW; repositorio `tokenizartinfo-ops/agent-friendly-web`; entorno `public_web`; origen fijo `https://agentfriendlyweb.dev`. La configuración pública activa y la propuesta Pro siguen separadas de esta prueba.

## Contrato existente y alcance

`proxy.ts`, `lib/markdown-negotiation.mjs` y `lib/home-markdown.mjs` describen negociación únicamente para la portada. `/guia` es una página HTML; no se declara una versión Markdown propia.

| Ruta | Accept | Resultado esperado |
| --- | --- | --- |
| / | text/html | HTML de AFW |
| / | text/markdown | Markdown canónico de AFW, no una página HTML |
| / | text/html, text/markdown;q=0 | HTML; Markdown está excluido |
| /guia | text/html | HTML con la sección de guía |
| /guia | text/markdown, text/html;q=0.9 | HTML, alternativa aceptable |

Cada fila se consulta una vez con GET y una con HEAD: diez solicitudes secuenciales como máximo. HEAD debe devolver 200 y el tipo esperado sin cuerpo. Las representaciones de la portada deben incluir `Vary: Accept`. Esta prueba acepta el contrato ya existente; no cambia su algoritmo de negociación.

El runner mantiene las once comprobaciones anteriores de documentos públicos y límites privados en un recibo separado. No se modifica su lista ni se reutiliza una sesión del navegador.

## Límites y evidencia

`scripts/check-public-reading-contracts.mjs` fija origen, rutas, métodos y encabezados. No acepta argumentos CLI, URLs, cookies, claves, cuerpos, POST ni destinos de red elegidos por el invocante. Usa una identificación QA explícita; no simula ser un bot verificado.

Límite de 10 segundos por solicitud, incluyendo lectura del cuerpo; 60 segundos para el conjunto; 512 KiB de cuerpo por respuesta. Las opciones de prueba solo pueden reducir esos límites. El vencimiento cancela sin esperar una confirmación de cancelación y detiene nuevas solicitudes al agotar el presupuesto total.

No sigue redirecciones. Rechaza challenges, respuestas no 200, tipos inesperados, documentos ajenos y cuerpos de HEAD. Guarda fecha, contrato, ruta, método, Accept, estado, tipo permitido, bytes y SHA-256 de cuerpos GET aceptados; no guarda cuerpos, cookies, Location, valores de encabezados ajenos ni mensajes de excepciones.

Ejecución manual finita en `afw-public-edge-check.yml`, sin secretos, despliegue, programación o procesos locales persistentes. Artefacto de siete días con dos recibos separados. Las PR ejecutan fixtures sin hacer consultas remotas.

## Validación y siguiente gate

Pruebas de comportamiento: negociación, guía sustituida por portada, MIME, Vary, redirect/challenge, HEAD con cuerpo, exceso de bytes, cuerpo detenido, cancelación sin ACK, agotamiento de ventana y saneamiento de errores.

El ciclo test-first se conserva en la PR: el chequeo vacío falla las diez pruebas nuevas, mientras las trece comprobaciones anteriores pasan (Actions 39697584479, 22oct00:05:59UTC /21oct21:05:59Argentina). La implementación y aceptación remota se registran en la misma PR y el checkpoint cloud de issue497.

Un resultado verde es evidencia fechada del recorrido HTTP observado. No demuestra navegación interactiva, modelo/copilot, eficacia de reglas WAF aún no instaladas, puntuación externa, corrección de Container/OTP, suscripción, recepción útil, baja nativa ni operación PC-off. `wafEnforcementAccepted`, `operationalReadiness` y `pcOffAccepted` permanecen false.

Para ensayar WAF: primero lectura vigente de configuración, ventana nueva máxima de 900 segundos, validación del proveedor y rollback recuperable del único cambio propio conforme a [la propuesta Pro](AFW-PRO-AGENT-SAFE-SECURITY-CANDIDATE-2026-10-21.es.md). Esta comprobación no habilita ese cambio.
