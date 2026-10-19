# Invitación del primer piloto: borrador exacto preparado

Documento del 18 de octubre de 2026, Argentina. Resultado autónomo de preparación, sin envío ni aprobación editorial. El destinatario previsto es el del caso Max/ Sector de Sistemas en [readiness](AFW-FIRST-CLIENT-READINESS-2026-10-05.es.md); prepararlo no acredita su sesión ni crea su expediente.

| Campo | Valor preparado |
| --- | --- |
| From / Reply-To | `hello@agentfriendlyweb.dev`, AFW · Agent Friendly Web |
| Asunto | AFW \| Empecemos por tu sitio, Max |
| Acción principal | Empezar mi expediente → `https://agentfriendlyweb.dev/expediente` |
| Hash exacto | `99c739cc2c31dc4c50a2f5e35ab6500bb28951739ac7b0217b2400bfef9973ab` |
| Paneles | Cinco imágenes inline, 556.824 bytes; encabezado, robots, cuerpo, acción y pie |
| Estado | Preparado; no aprobado, no enviado y no listo para consumir en un servicio de envío |

## Contenido de la invitación

**Tu sitio, un paso más cerca de los agentes.**

Hola Max, de Sector de Sistemas:

Te invitamos a empezar con tu sitio y con lo que te gustaría mejorar: mostrar con claridad qué ofrecés, facilitar el contacto o ayudar a los asistentes de IA a encontrar información confiable.

Al abrir tu expediente, la guía te lleva paso a paso. No necesitás preparar todos los datos: podés comenzar con lo que sabés, dejar dudas pendientes y revisar cada propuesta antes de guardarla.

Primero definimos tu objetivo. Después ordenamos la información y acordamos las mejoras que necesita tu sitio. Antes de publicar, revisás qué cambia y por qué.

Buscamos mejoras reales y comprobables. Avanzamos hasta donde tu negocio lo necesite.

**Empezá por una sola cosa: ¿qué te gustaría mejorar de tu sitio?**

**Empezar mi expediente**

Si necesitás ayuda para entrar, escribinos a hello@agentfriendlyweb.dev.

Equipo AFW · Agent Friendly Web

## Identidad visual y comprobaciones

El paquete anterior era una vista previa para Gabriel, con hash `37b1db65a66db3bc2189d722420f423aca6ca1640d73871cf5532f833de55f4f`. No se modifica ni se le atribuye una aprobación. El nuevo borrador cambia destinatario, asunto y pie, por lo que tiene hash propio. Sus cuatro primeros paneles son idénticos al anterior; se conserva la ilustración original de robots comunicándose con latas.

El nuevo pie se compuso con la fuente local Bangers-Regular.ttf, sin editar la ilustración. Todo el corpus visual conserva tipografía cómic según la instrucción del owner. El texto alternativo completo acompaña las imágenes; no se depende de una fuente remota que el cliente de correo pueda ignorar.

`verifyBrandPackage` validó el paquete, remitente, Reply-To, CTA, cinco imágenes y cambio de hash. El texto no dice «gratis», no solicita completar el expediente por correo ni promete vigilancia continua o IA habilitada para cualquier expediente. La guía del producto no se presenta como una guardia cloud.

Preview local inerte comprobado en navegador a600 y390px: cinco imágenes decodificadas, alternativas presentes, cero enlaces activos/scripts y sin desborde. Capturas inspeccionadas; el mensaje real del paquete conserva su CTA, retirado solo de la vista previa. No hubo llamada al proveedor y no se acredita renderizado de este paquete en una bandeja de entrada.

Los artefactos locales se conservan en `output/afw-max-invitation-20261018/`: paquete/input, preview inerte, equivalente de texto, paneles y verificación/QA. No copiarlos completos a logs o RAG ni reenviar el antiguo paquete del owner al cliente.

## Gates antes del primer envío

Completar los [gates técnicos vigentes](AFW-FIRST-CLIENT-READINESS-2026-10-05.es.md), presentar a Gabriel esta versión exacta y obtener su aprobación editorial del primer envío. La decisión debe ligarse al hash y destinatario; cualquier cambio de texto, activo, CTA, asunto o destinatario exige revisar otra versión. Preparación, aprobación, aceptación del proveedor y recepción son estados separados.

El ingreso real, consentimiento, creación de expediente y alcance del copilot corresponden después a la sesión del cliente. El catálogo, aviso útil, revisión cloud, retirada y PC-off del ensayo propio siguen pendientes; este correo no los activa ni los sustituye. No hay una acción que solicitar al owner ahora para este borrador.
