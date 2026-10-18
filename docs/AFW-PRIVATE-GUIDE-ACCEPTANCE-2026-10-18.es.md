# Guía privada: aceptación real y correcciones del 18 de octubre de 2026

## Resultado

La sesión real del owner en producción confirmó guardado y reapertura de la guía básica. El objetivo «Explicar mejor productos o servicios» fue elegido expresamente por el owner y guardado desde la propuesta revisable. Después delegó las decisiones rutinarias de su ensayo: se completaron audiencia, idiomas mantenidos por AFW, tipo de servicio, editor basado en repositorio y alojamiento Cloudflare, usando el contexto acordado y la arquitectura comprobada. Cada dato pasó por propuesta y guardado; la recarga final mostró la guía básica terminada. Esto no declara completo todo el expediente ni concede permisos de publicación.

La guía publicada recomienda una prioridad inicial revisable, explica las cinco opciones en lenguaje sencillo y, para el objetivo de explicar mejor la oferta, pregunta por audiencia antes de los detalles técnicos. Las explicaciones quedan plegadas. No selecciona respuestas ni guarda recomendaciones automáticamente. La delegación del owner para sus pruebas no sustituye decisiones o consentimientos de clientes.

## Aceptación privada con límites

- En un expediente sintético preexistente se pospuso una pregunta, se confirmó el guardado y se recargó. La pendiente persistió. Retomar las pendientes y recargar restauró la preferencia vacía. D1 antes/después confirmó respuestas y demás campos iguales; revisiones 2→4 por las dos escrituras legítimas. No se borró historia ni se restauraron timestamps.
- El botón para revisar lo observado abrió la lectura existente, con su fecha y diferencia histórica de la misma metodología. No se ejecutó una nueva auditoría en ese expediente.
- La cápsula histórica ya vencida se presentó como vencida. La comparación antigua no se convirtió en una certificación actual. Se descargó y leyó el TXT de 858 bytes, con ISO originales y límites. El observador de descargas agotó su espera, pero el archivo real llegó; no se repitió la descarga.
- La primera lectura del expediente principal se rechazó porque el dominio ya estaba asociado a otro expediente. No se cambió la asociación ni se forzó el acceso. El rechazo se confirmó también con el feedback nuevo; no se guardó una observación. Esta limitación propia queda pendiente de revisar por la vía de expedientes/titularidad, sin inferir el propietario de otro expediente.
- La entrega contextual de una cápsula vigente no se repitió: la cápsula histórica estaba vencida y correctamente no ofrecía un nuevo plan. Su aceptación local anterior conserva su alcance.

La navegación sin selector abre el último expediente actualizado por diseño; después de las dos preferencias abrió el sintético. Se investigó y descartó como contaminación entre proyectos. Para la prueba principal se usó su enlace explícito. No se alteró el orden ni la fecha de actividad para ocultar ese comportamiento.

## Dos fallos de presentación corregidos

Una evidencia con ISO `2026-09-30T20:31:41.302Z` se mostraba como «05:31:41» sin AM/PM. Se sustituyó el formato implícito por un reloj explícito de 24 horas y zona en los paneles de procedencia y resultado. Los timestamps originales y los ISO del reporte permanecen intactos. En Chrome real, los metadatos nuevos se vieron, por ejemplo, como «18 de oct de 2026, 11:26:32 ART» para `14:26:32.102Z`.

El rechazo de la primera lectura estaba en un panel plegado y el CTA principal volvía a ofrecer leer sin mostrar el motivo. El estado de fallo ahora muestra el mensaje junto al primer paso y ofrece revisar el motivo, sin repetir la solicitud. El feedback se liga al mismo proyecto y sitio; no modifica la asociación del dominio ni la idempotencia de observaciones. La comprobación real abrió el detalle correcto.

## Fuente y validación

| Referencia | Evidencia |
| --- | --- |
| PR466 / candidata integral | https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/466; fuente95130303426f96df8bb654a7f94c64dff238b5b3; mergeb86fa8f0b21589e149dab3a7a904ddd79eda49d5 |
| CI integral | 39136465400/job117701860066:2003PASS,0FAIL,1SKIP; lint/build aprobados |
| PR467 / pública | https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/467; fuente exactac92e7979ed9a66e0f2f53f469d0f6a8c22b23d9d; merge42a40413b88cfdbad660d0311405d6c3709d63de |
| CI pública | 39136574842/job117702181628:1125PASS,0FAIL,0SKIP; lint/build aprobados |

El backport contiene solo doce archivos sobre la rama pública efectiva; todos sus blobs cambiados coinciden con la candidata integral. No incluye los cambios privados de eventos que separan main del runtime público.

RED: dos tests del formatter fallaron antes de fuente; el feedback y la recomendación produjeron otros tres fallos esperados. GREEN: diez pruebas de fechas/procedencia/resultado y veintiuna de fechas/primer paso/consejo/guía/alcance, sin fallos. No se suman suites solapadas como si fueran casos distintos.

El ensayo local usó los componentes reales y API/Drizzle/D1 locales; identidad y respuesta409 fueron fixtures. Verificó que revisar una recomendación no marca casillas ni guarda; incorporar sí guarda y sobrevive a recarga; cinco opciones explicadas; contexto de audiencia; fallo visible y revisión sin segundo POST; ES/EN/PT y 390px sin desbordamiento. El primer observador esperaba el texto de producción en modo rehearsal; se corrigió la expectativa al texto simulado existente y se continuó en la misma sesión, sin cambiar el producto para satisfacer la prueba.

## Publicación y recuperación

Destino exclusivo: proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web, producción pública https://agentfriendlyweb.dev, Worker `agent-friendly-web-web-production`. Cuenta y D1 existentes, sin operaciones de esquema ni cambios de Access. El artefacto congelado contiene 298 archivos verificados por hash y configuración derivada de producción efectiva; no se usó la configuración genérica del repositorio.

| Etapa | Resultado fechado UTC |
| --- | --- |
| Rollback previo14:36:59 | Versiónd82fefec,16 páginas, asset exacto y smoke público/Access aprobados |
| Upload | Una versión nuevaf6ccabdb-86a4-429f-ae10-1af6ccb6a33b, fuente públicac92e797 |
| Override14:38:31 | Candidata al0% en deployment6df96e7b;16 páginas200, asset exacto y smoke aprobados |
| Promoción14:38:40 | Deploymentf75f45fc-22fb-4a94-89cb-75cde0bf30cf; candidata al100% |
| Normal14:38:45 |16 páginas200, asset exacto y smoke aprobados |
| API primaria14:39:51 | Versión100%, bindings efectivos y de versión, runtime, placement, observabilidad, tails y logpush preservados |

Asset `/_next/static/chunks/intake-workspace-DazZdjYt.js`, SHA256 `32a9926126454bc9c22012c7b48edbd8f491f676cf39bc8f6a9a578241b7b395`. Rollback inmediato disponible: `d82fefec-3a6b-4c0f-aedd-b464ec634b78`, fuente3700ce9. No se ejecutó reversión porque la candidata pasó; una futura reversión requiere comprobar estado y recuperación sin rebobinar datos o actividad legítima.

D1, AI, ASSETS, rate limiter5/60, pin propio del copilot y configuración Access se conservaron. El copilot inteligente no se habilitó para otro expediente. No se repitió migración0015 ni se tocaron canary delegado, operador privado, OAuth, permisos o Containers.

## Continuidad

Evidencia local ignorada: `output/afw-private-session-acceptance-20261018.es.md`, `afw-private-date-red-20261018.jpg`, `afw-private-guidance-production-green-20261018.jpg`, `afw-private-guide-complete-20261018.jpg`, `afw-guidance-web-final-readback-20261018.json`, `afw-guidance-web-{rollback,override,normal}-20261018.json` y `afw-guidance-web-release-20261018/manifest.json`. Los archivos privados de configuración no deben incorporarse al repositorio público.

Esta aceptación no acredita un puntaje externo nuevo, suscripción nativa, entrega útil cloud, retirada nativa, guardia permanente ni operación integrada con PC apagada. Esos cierres siguen en el roadmap del primer cliente y los casos Cloudflare02375364/02382110. No enviar a Max ni reutilizar consentimientos antiguos. No repetir los ensayos aceptados solo por actualizar documentación.
