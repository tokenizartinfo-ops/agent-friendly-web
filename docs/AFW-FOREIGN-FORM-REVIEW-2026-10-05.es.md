# AFW: formulario extranjero y presentación del rechazo — 5 de octubre de 2026

Ensayo QA acotado: Worker propio agent-friendly-web-review-csrf-qa, origen review-csrf-qa.agentfriendlyweb.dev, formulario POST nativo hacia operations-review.agentfriendlyweb.dev/notices/review. Sin JavaScript, cookies/JWT copiados, headers alterados ni valores de custodia. Base sintética d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46, ventana máxima hasta22:04:49.472UTC, solo operador existente. El primer formato de fecha fue rechazado fail-closed; se corrigió su representación sin extender la ventana.

Chrome aceptó primero GET humano200. El único envío del formulario produjo ERR_BLOCKED_BY_CLIENT; no hubo respuesta HTTP de documento observable. No se acredita403 remoto ni recepción del POST por el Worker. D1 antes/después: dos revisiones, una reserva, FK sin violaciones, ninguna escritura SQL de prueba.

Cierre explícito: review497eb658-c1d6-4758-bc70-5f6c83a974a8, tres flagsfalse/deadline ausente; Accessdeny/everyone sin exclusiones restaurado. Fixture57c9e46f-d47e-45ea-ac33-edb8a37d9f2e con deadline pasado, responde cerrado, sin cron/workers.dev/previews/datos. Configuración efectiva verificada independientemente. No se tocaron la identidad ni el manager de recepción.

Cambio de presentación preparado: navegaciones POST de documento que ya fueron rechazadas con403/same_origin_required reciben HTML mínimo conservando403. POST API, otros errores POST, controles de origen, identidad y persistencia no cambian. La prueba nueva falló primero por application/json y pasó después; workerd real confirmó rechazo de origen sin escritura. El bloqueo del navegador es una observación, no una causa interna demostrada; la aceptación remota requiere repetir una sola vez tras integrar/publicar QA.

## Reensayo remoto después de PR274 — aceptado

PR274 integrada en main455bb21c,903 pruebas/lint sin errores/build y CI37379826715 correcto. Versión QA327892ea-d3e0-45f1-bcc7-595a74605d24, deadline22:13:51.210UTC. La misma sesión real volvió a mostrar la revisión; formulario desde review-csrf-qa mostró «Abramos la revisión desde AFW». La observación Network desde el origen extranjero no capturó status. Una recarga controlada de la navegación POST rechazada, con Network activado en el destino, observó documentoHTTP403 y conservó esa presentación. No se copiaron JWT/cookies/headers ni se introdujo un POST autorizado. Tres envíos de formulario en total: intento inicial bloqueado, reensayo HTML y recarga de corroboración.

D1 posterior: reviews2/reservations1/FK vacío, sin nuevas decisiones. Cierre finalreviewd4440a3d-d12b-4cea-aaf4-2bb600262e28: tres controlesfalse/sin deadline; Accessdeny/everyone sin excepciones. Fixturea06bd6e5-938e-4a87-be68-5cca217bc27b expired, cerrada. API efectiva confirmó todos esos controles. Se cierra la aceptación remota de rechazo por origen; no inferir una prueba adicional de replay o autorización de escritura a partir de este403.

Siguen pendientes promoción del journal operacional y custodia/ciclo de vida estable antes de guardia. No repetir CSRF/PC-off/snapshot ya aceptados. Véase AFW-OPERATIONS-IDENTITY-LIFECYCLE.es.md; no activa un servicio permanente.
