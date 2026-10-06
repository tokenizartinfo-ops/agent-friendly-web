# Correo cómic: paquete, custodia y revisión privada

## Resultado preparado

Se amplía el circuito existente con un paquete `afw-comic-panels-v1`: cinco paneles raster (header, robots, body, action, footer), alternativa textual, HTML derivado sin contenido HTML libre y remitente fijo AFW / hello@agentfriendlyweb.dev. No se añaden adjuntos PDF, headers del modelo, destinos múltiples ni enlaces privados en este bloque. El único CTA apunta a la portada pública; la invitación contextual al expediente requiere un contrato posterior con el proyecto real comprobado.

La tipografía Bangers permanece en los paneles generados por el renderer ya aprobado. No se depende de que Gmail acepte fuentes externas. El módulo no acredita la fuente ni compara semánticamente el texto con una imagen: la revisión humana debe comprobar esa equivalencia. Los correos text-only históricos mantienen exactamente el algoritmo de hash anterior.

## Composición y límites

- `lib/mail-brand-package.mjs`: construye una plantilla fija, escapa alt, limita a PNG/JPEG con firma MIME y base64 canónico; máximo agregado 800000 bytes. Guarda bytes una sola vez y genera SHA-256 por activo y paquete completo. La firma MIME no certifica decodificación de una imagen; el ensayo de navegador debe comprobarla.
- `lib/mail-consumer.mjs`: contenido canónico separado del payload de proveedor. El hash aprobado abarca destinatario, texto, versión, remitente, replyTo, HTML y todos los activos; cambios o campos extra bloquean. Preserva revisión de consentimiento antes y después del claim, un único intento y estado uncertain sin retry.
- `lib/mail-custody.mjs`: snapshot separado y validado antes de persistir; guarda el paquete completo en el journal existente, sin migraciones ni sobrescrituras. Una alternativa textual diferente de la del paquete falla cerrada.
- `lib/mail-private-controls.mjs`: GET `/preview/:key` exige la misma identidad privada y vuelve a comprobar el hash. Renderiza exclusivamente el snapshot guardado, sin enlaces navegables; no-store/CSP sandbox, imágenes data internas y sin scripts/red.
- `lib/mail-review-page.mjs`: diseño en iframe sandbox vacío, texto seleccionable y explicación breve. Un GET de preview fallido deja la aprobación deshabilitada. Nunca incorpora contenido del mensaje mediante innerHTML.
- `lib/mail-service-controls.mjs` y `worker/mail/index.mjs`: promoción explícita del servidor `MAIL_BRAND_ENABLED=true`; por defecto false. No puede activarla un payload del agente. Config canary conserva operador/servicio/marca cerrados.

Los nombres de campos nativos del binding son `from.email`, `replyTo` y `attachments[].contentId`, conforme a [Workers API de Cloudflare Email Service](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/). No se reutilizan los nombres históricos del payload REST de la prueba visual. El envío real todavía debe comprobar la implementación desplegada del binding.

## Evidencia local

Pruebas funcionales: cambios de HTML/texto/destinatario/bytes/alt/hash rechazados, campos arbitrarios y contenido no canónico denegados, custodia exacta, previsualización autenticada, bloqueo al no cargar el diseño, retirada, servicio de marca cerrado por defecto y consumo único explícitamente habilitado. SQLite real local, identidades JWT sintéticas firmadas; callback de proveedor simulado, no acredita recepción.

Preparación local del modelo editorial cómic ya enviado al owner: cinco imágenes, 459334 bytes, cero llamadas al proveedor. Paquete SHA-256 `87fae276558ce4d354fce4750ce00849171d129a7770a2e7859f6f0c4c07ed25`. Artefactos ignorados `output/afw-brand-package-local-20261005.json` y `output/afw-brand-preview-local-20261005.html`. Mantienen el rótulo de prueba propia; no son una invitación a Sector.

Navegador integrado local en 127.0.0.1:8917: los cinco raster cargaron (naturalWidth positivo), composición cómic inspeccionada. Con handler privado real y SQLite en memoria, identidad JWT sintética inyectada únicamente por el fixture local, revisión pasó borrador → permiso registrado → recarga conservando permiso → retirada/cancelado. El iframe sandbox cargó el diseño; no hubo provider binding ni envío. Capturas visibles en la conversación. Tab y servidor local retirados al terminar. Esto comprueba UI local y persistencia dentro del ensayo; no acredita Cloudflare Access ni persistencia tras apagar la instancia local.

Verificación final: npm test 916/916, cero fallos; lint cero errores y dos warnings preexistentes (img en comic-home-intro y export default en operations); npm run build completado con exit 0. No inferir disponibilidad remota desde estos resultados.

## Siguiente aceptación

1. Base de navegador local aceptada arriba; completar QA remota y fallos de raster/expiración manteniendo la revisión de texto e identidad real.
2. Desplegar exclusivamente mail-canary cerrado con identidad/Access/limiter/destinatario propio exactos y rollback fechado; no reusar ni renovar por inferencia la identidad expirada del ensayo anterior.
3. Abrir una ventana acotada de marca, preparar y aprobar el paquete exacto; consumir una vez desde cloud, guardar recibo e intentar segundo consumo sin segundo envío. Confirmar recepción propia por separado.
4. Retirar flags, binding/identidad temporal y autorización, preservando journal. Solo ese recibo habilita plantear el onboarding real.

Sin mutaciones remotas ni correos en este bloque. Rollback de código deja snapshots/journal preservados; versiones antiguas no leen paquetes de marca y fallan cerradas. La guardia permanente conserva su plan de promoción independiente; no activar cron por la existencia de este consumidor.
