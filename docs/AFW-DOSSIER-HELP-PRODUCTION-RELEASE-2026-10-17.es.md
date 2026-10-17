# Ayuda del expediente: corrección publicada

El 17 de octubre de 2026, a las 12:57 de Argentina (15:57 UTC), se publicó la corrección de «Necesito ayuda» en https://agentfriendlyweb.dev. Cuando el expediente muestra la guía breve y no dispone del copilot inteligente, el botón vuelve a abrir la guía local. El enlace y su acción utilizan ahora el mismo destino; se conserva la prioridad de la asistencia disponible y del copilot inteligente.

## Alcance y procedencia

Proyecto AFW; repositorio `tokenizartinfo-ops/agent-friendly-web`; entorno producción pública; recurso Worker `agent-friendly-web-web-production`, cuenta `85d0d5dadac3341a564f22ce885e9eec`. Acción autorizada: publicar una corrección reversible de interfaz, conservando datos, configuración efectiva y permisos.

| Referencia | Resultado |
| --- | --- |
| [PR460](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/460) | Corrección aceptada en main `2b464edb845822f917fe94e7f9067ee3f2ae6ac2` |
| [PR461](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/461) | Backport de las mismas tres líneas sobre la fuente pública `571ddcea11f17c5c4832a35fa36a666933ae015b` |
| Fuente del artefacto desplegado | `f28c06d2dfbe8ba5f9b79572cc8a4a0843d64cde` |
| Merge en la rama de publicación | `e5a581da31ecd03d78ac3b84956ab868d2e75d1d`, rama `release/web-production-20261017` |
| Versión pública al 100% | `2a577654-6607-4c0f-9d37-3d6762cb59e8` |
| Deployment publicado | `ff3b1ca1-6b5b-47ff-a5e3-bed2e3ce4456`, 15:57:29 UTC |
| Lectura primaria final | 2026-10-17T15:58:36.108Z |

El artefacto contiene el backport mínimo, no todo main. El blob del componente `intake-workspace.tsx`, `0524b7a7beceb5eb8bec58ef78c398fe0f89396f`, coincide con el revisado en PR460.

## Comprobaciones

La reproducción con el componente React real mostró primero el fallo: después de cerrar la guía, el botón no la reabría. Con la corrección, el mismo clic vuelve a abrirla. Captura local: `output/afw-help-dock-guided-green-20261017.jpg`. La revisión independiente no encontró problemas P1/P2.

CI de PR460, ejecución `39045476069`, fuente candidata `7ad9135b38645ee22498b3a8547a6dd650b9ed9c`: 1974 pruebas aprobadas, cero fallos y una omitida; lint y build aprobados. El run general de Windows tuvo 1967 aprobadas, seis fallos y dos omitidas; los mismos cinco archivos que contenían los seis fallos, ejecutados después de forma aislada y sin modificar sus fuentes, dieron 72 aprobadas, cero fallos y una omitida. Estos resultados son compatibles con sensibilidad a la carga, sin demostrar la causa de todos los fallos. No se relajaron límites ni controles para obtener el resultado.

CI del backport exacto, ejecución `39046606858`, job `117436478423`: 1096 pruebas aprobadas, cero fallos y cero omitidas; lint sin errores y con dos avisos previos, build aprobado. Nueve pruebas dirigidas y build local también aprobados sobre la candidata. Las cifras del main privado y las del backport público corresponden a fuentes distintas.

Se congelaron 310 archivos y se verificaron sus hashes antes de una única subida de versión. La candidata se incorporó primero al deployment con 0% y la anterior con 100%. Los [overrides documentados por Cloudflare](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/) permitieron comprobar la candidata incluida en ese deployment antes de promoverla.

| Etapa | Resultado observado |
| --- | --- |
| Candidata 0%, 15:56:48 UTC | 16 páginas HTML con HTTP200, asset exacto y smoke público/Access aprobado |
| Tráfico normal, 15:57:33 UTC | Las mismas 16 páginas con HTTP200, asset exacto y smoke aprobado |
| API independiente, 15:58:36 UTC | Nueva versión al 100%; bindings, runtime, observabilidad, tails y logpush conservados |

Asset publicado: `/_next/static/chunks/intake-workspace-DGyLTzR4.js`. SHA256 observado y esperado: `aa02235edf57813ac33ed5ecf11cae2febf1b092c86a0fb31226b27d5201fde0`. El smoke comprobó ocho superficies públicas con HTTP200 y tres rutas privadas con redirección a Access.

## Configuración y recuperación

Se preservaron los diez bindings efectivos, D1 `d26fc9d2-df5a-4957-8e58-cc4c945faad8`, AI, ASSETS y el rate limiter existente de cinco llamadas por minuto. El copilot conserva exclusivamente su pin propio anterior; la publicación no incorpora clientes. Remote deploy y diagnósticos siguen deshabilitados. Se conservaron fecha de compatibilidad, flags, modelo de uso standard y observabilidad. No hubo SQL, migraciones, cambios de Access, permisos, rutas, cron ni credenciales nuevas.

La configuración efectiva de producción difería de `wrangler.jsonc`. Se construyó una configuración de publicación específica a partir de la versión activa; no se sustituyó por los valores por defecto del repositorio. Esa captura permanece local e ignorada por Git, sin copiar el pin a este recibo.

Rollback conservado: versión `db7b2de1-5daf-4d07-8f90-6fc949761ce8`, fuente `571ddcea11f17c5c4832a35fa36a666933ae015b`. Antes de la subida se comprobó la versión disponible y el asset anterior con HTTP200 y hash exacto. La reversión no se ejecutó: la candidata superó las comprobaciones. Una reversión futura exige verificar de nuevo versiones, configuración y datos actuales, restaurar tráfico a la versión preservada y comprobar su recuperación.

El canary web permaneció en `50dd9d30-7b10-45c0-a666-6f3e746b6eba`, deployment `89bc660a-4969-405d-839e-9968d1e86fd3`, ambos sin cambios. El canary delegado de eventos y el operador privado no se tocaron.

## Límites y siguiente cierre

La comprobación de interacción fue local; producción se comprobó mediante versión, bytes del asset y fronteras públicas/Access. Chrome respondió al control, pero la apertura privada posterior pidió un ingreso normal: no se solicitó código ni se completó un nuevo clic autenticado en producción.

Esta publicación no acredita un puntaje externo nuevo, incorporación de Max, suscripción de eventos, revisión útil cloud, retirada nativa ni ejecución con el ordenador apagado. El bloqueo `native_container_absent`, observado el 16 de octubre, continúa pendiente de diagnóstico específico en el caso Cloudflare 02382110. El caso Cron 02375364 conserva su alcance independiente.

Evidencia local: `output/afw-help-web-final-readback-20261017.json`, `output/afw-help-web-{override,normal}-20261017.json`, `output/afw-help-web-release-20261017/manifest.json`, `output/afw-help-web-release-20261017/rollback-proof.json` y logs de build, dry-run y subida. No repetir la subida o la promoción ya aceptadas. La ruta restante del piloto está en [AFW-FIRST-CLIENT-READINESS-2026-10-05.es.md](AFW-FIRST-CLIENT-READINESS-2026-10-05.es.md).
