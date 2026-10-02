# Kit visual de correo y presentación AFW — v1

2 de octubre de 2026. Propuestas para revisar, no plantilla automática desplegada. [Comparar modelos](index.html).

## Dirección recomendada

1. [Editorial cercana](01-editorial.html): primer correo para Sector de Sistemas. Encabezado AFW, robots, saludo contextual, beneficio comprensible, una pregunta y un botón. Primer recorrido gratuito; publicación se revisa con el cliente. El enlace al expediente se sustituirá solo después de comprobar su acceso real.
2. [Cómic conversacional](02-comic.html): presentación de marca y difusión. Más expresivo, con tres pasos. Usar cuando el destinatario necesita entender qué hace AFW.
3. [Acompañamiento simple](03-acompanamiento.html): seguimiento operativo. Una pregunta pendiente, una acción y contexto suficiente. Nunca mostrar «revisado», «guardado» o un avance sin evidencia del expediente.
4. [Brochure](04-brochure.html): presentación genérica. Una empresa informativa no necesita el mismo alcance que una plataforma transaccional. PDF reproducible con `build-brochure.py`, salida `output/pdf/AFW-presentacion-general-v1.pdf` desde raíz del repositorio; una página inspeccionada visualmente.

## Identidad completa

| Uso | Regla |
| --- | --- |
| Fondo | Papel cálido #f3eadb; cuerpo #fffaf1 |
| Texto | Tinta #181512; secundario #665d53 |
| Acción | Verde #3c514b, texto blanco |
| Acento | Terracota #ad4f35; no colorear cada párrafo |
| Tipografía | Impact/Arial Narrow para títulos cortos; Arial/Helvetica para lectura. Sin fuentes externas en correo |
| Ilustración | Robots originales conectados por latas; motivo de comunicación y acompañamiento |
| Composición | Ancho máximo 600 px, cuerpo 16 px, interlineado 1.65, una acción principal |
| Remitente | AFW · Agent Friendly Web, hello@agentfriendlyweb.dev |
| Respuesta | hello@agentfriendlyweb.dev; su recepción/atención no implica gerente autónomo |
| Asunto | Breve y concreto; prueba propia identificada; no prometer aumentos de ranking |
| Preheader | Resumir beneficio o siguiente paso; diferente del asunto |
| Firma | «Un paso claro. Una decisión a la vez.» y dominio público |

Texto humano seleccionable fuera de la ilustración; alt significativo; datos esenciales disponibles con imágenes bloqueadas. Sin scripts, formularios, fuentes remotas ni píxeles de seguimiento. Alternativa text/plain equivalente. No usar enlaces a expedientes privados como destinos genéricos, ni incluir OTP/secretos en correo.

## Ilustración y reproducción

Nueva ilustración generada con herramienta integrada image_gen, referencia `public/images/agent-friendly-call-robots.webp`. Prompt: mismos dos robots originales, comunicación con latas unidas por un hilo, tinta oscura/papel cálido, acentos verde y terracota, composición 3:1 y sin texto. Fuente PNG conservada localmente en `output/mail-visual-20261002/robots-header-source.png`; el original también permanece en la carpeta generated_images de Codex. Exportación JPEG 264.047 bytes; no modificación de personajes. Activo final versionado `robots-header.jpg`.

`node docs/design/afw-mail-20261002/build-preview.mjs` reproduce maquetas autocontenidas; sus imágenes data URI son para comparación local. El correo real reemplazó ese URI por una imagen MIME inline cid:afw-robots-header. No usar data URI como solución de producción para correo.

## Prueba real propia aceptada

Autorización: owner pidió explícitamente enviar una prueba visual desde hello a tokenizart.info@gmail.com en esta conversación. Un único POST al API oficial Cloudflare Email Sending; canary cerrado y producción sin cambios. Dos intentos previos de cargar el archivo público remoto fallaron **antes** del POST de envío; no fueron envíos ni reintentos del proveedor.

Asunto: `AFW | Prueba visual de correo · 20261002-DESIGN01`. HTML exacto [05-prueba-editorial.html](05-prueba-editorial.html), SHA-256 `d93ae4d0fb138199c2a0dc1f1ba0bd450c2c992a90659cc534d12611b3b346be`. JPEG SHA-256 `3368cf7f11457d42a68193103a6e42d0fbc55afdce01a3dc3acffd5b6619b977`.

Cloudflare success true, sin errores/bounces/supresión, inicialmente queued. Gmail encontró un único mensaje INBOX/CATEGORY_PROMOTIONS, fechado 2026-10-02 17:10:38 UTC (14:10:38 Buenos Aires) y entregado 13 segundos después según Gmail, imagen JPEG inline 264.047 bytes. Chrome mostró encabezado, ilustración, texto, botón y firma. Evidencia local ignorada: `output/mail-visual-20261002/{attempt.json,request.json,receipt.json,gmail-render.png,gmail-hero.png,gmail-body.png}`. No se envió a Mataniya ni a Sector de Sistemas. El resumen «Original Message» de Gmail confirmó SPF PASS, DKIM PASS con dominio agentfriendlyweb.dev y DMARC PASS para este mensaje. No acredita Outlook, móvil ni futura entregabilidad.

## Integración necesaria antes del primer cliente

El consumidor actual admite exclusivamente to/subject/text. Esta prueba propia administrativa no modifica ese contrato ni demuestra el flujo automático HTML. Siguiente bloque:

- Versionar plantilla aprobada y activo, separar contenido del expediente de estilos fijos y escapar datos interpolados.
- Extender custodia/hash para HTML, texto equivalente, nombre del remitente, reply-to y cada imagen autorizada (tipo, nombre, cid, bytes/hash), sin adjuntos arbitrarios ni headers suministrados por el agente.
- La vista privada debe mostrar destinatario, asunto, texto y diseño exactos antes de aprobar; render HTML en aislamiento sin scripts/forms/red. Cambiar HTML o imagen invalida la aprobación.
- Conservar identidad, consentimiento, plazo, idempotencia, recibo, retirada y no-retry ante incertidumbre. No añadir un envío alternativo automático por Gmail/Resend.
- Probar modificación de HTML/imagen, enlaces no admitidos, texto personal inyectado, activo ausente, expiración y doble consumo; después prueba propia del circuito completo con recibo y cierre.
- Solo entonces activar el primer correo real con acceso comprobado de Sector de Sistemas y destinatario exacto. No convertir consentimiento del piloto gratuito en suscripción a marketing.

Fuente: [Cloudflare Email Sending](https://developers.cloudflare.com/api/resources/email_sending/methods/send/).
