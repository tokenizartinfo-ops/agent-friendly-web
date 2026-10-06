# Sector de Sistemas: cierre del primer recorrido real

## Decisión operativa

AFW tiene runtime público en producción y pruebas integrales propias. No equivalen a la aceptación del primer cliente. Contamos cuatro bloques de cierre para el piloto gratuito asistido; no estimamos días ni porcentaje porque ingreso, declaración de objetivos y entrega dependen también del cliente y su responsable de hosting.

Cliente previsto: mataniya@sectordesistemas.com.ar; sitio https://sectordesistemas.com.ar/. No atribuirle objetivos, expediente, consentimiento ni permisos desde este documento. El primer alcance se acuerda según necesidad; AF1–AF3 puede ser suficiente. OAuth, A2A, transacciones y 100% en un auditor externo no son requisitos del piloto.

## Inventario comprobado

Lectura API Cloudflare en esta revisión del 5 octubre (hora local): Worker agent-friendly-web-web-production, versión 00861678-d968-41d3-be85-180896a321b7 al 100%, deployment del 1 octubre. Copilot activo únicamente para 6e972c18-cae1-402b-b959-646abd8499d7. No habilita automáticamente nuevos expedientes. Access app b7d7d62e-de25-4b4b-ac52-972b104738a1 conserva regla allow 197c83d9-b87f-497c-9e25-38a880d03cd6 con correo exacto del cliente. Esto acredita configuración, no recepción de OTP ni login del cliente.

| Capacidad | Evidencia y límite |
| --- | --- |
| Expediente, entrega y comparación | AFW-INTEGRAL-ACCEPTANCE-2026-09-30.es.md: recorrido sintético, paquete exacto, instalación y comparación fechada. No instalación en Sector. |
| Aislamiento y retirada | AFW-MULTIOWNER-ACCEPTANCE-2026-10-03.es.md: dos identidades reales, denegación cruzada y revocación. |
| Guardado y entrega planificada | AFW-DELIVERY-PLAN-RELEASE-2026-10-01.es.md: recarga y rechazo de escritura concurrente aceptados en Canary; release público verificado. |
| Operación cloud | AFW-OPERATIONAL-POSITIVE-ACCEPTANCE-2026-10-05.es.md: cron, checkpoints firmados, deduplicación, watchdog sano y dos GET200 cloud. Ensayo cerrado; no guardia permanente. |
| Correo visual desde hello@ | docs/design/afw-mail-20261002/README.es.md: branding cómic recibido por owner; no correo a Sector ni integración automática HTML. |
| Consumidor de correo | lib/mail-consumer.mjs y lib/mail-custody.mjs: contrato actual exclusivamente to/subject/text. No admite HTML ni imágenes por inferencia. |

## Cuatro bloques para el piloto asistido

### 1. Incorporación y acompañamiento real

- [ ] Confirmar una recepción de OTP e ingreso del cliente, sin repetir pedidos indefinidamente. Si no llega, revisar la aplicación y regla exactas y el diagnóstico del proveedor; no limpiar sesiones ajenas ni ampliar a everyone.
- [ ] Crear expediente desde su sesión verificada; registrar su objetivo con una pregunta sencilla, permitir desconocidos y confirmar datos públicos frente a declaraciones.
- [ ] Incorporar exclusivamente ese project ID al rollout del copilot, preservando el piloto actual, con consentimiento y comprobación de límites/revocación. No crear propiedad en D1 a partir del correo.
- [ ] Comprobar respuesta guiada, guardado y reapertura con ese expediente. El cliente debe ver una siguiente acción, no todas las pendientes a la vez.

### 2. Correo de marca en el circuito del producto

- [ ] Integrar la editorial cercana v2 en custodia, hash, revisión y consumidor; preservar compatibilidad de mensajes text-only y no aceptar HTML/adjuntos libres del modelo.
- [ ] Vincular texto equivalente, plantilla, imágenes CID y hashes a la misma decisión; mostrar versión exacta aislada antes de enviar. Cambiar contenido o activo invalida aprobación.
- [ ] Probar manipulación, activo ausente, expiración, retirada, doble consumo e incertidumbre sin retry; ensayo propio con recibo y cierre antes del destinatario externo.
- [ ] Enviar onboarding contextual desde hello@ con una acción útil y acceso comprobado. Aceptación del proveedor no significa bandeja de entrada. No convertir piloto en marketing.

Archivos afectados previstos: lib/mail-consumer.mjs, lib/mail-custody.mjs, lib/mail-review-page.mjs; tests homónimos; plantilla y activos versionados del kit visual. Requiere diseño acotado y pruebas antes de cambios. La identidad expirada del ensayo anterior no se reutiliza ni renueva por accidente.

### 3. Auditoría inicial y entrega proporcional

- [ ] Capturar lectura pública fechada y documentos existentes; separar auditor AFW del externo y capacidades reales de simples archivos presentes.
- [ ] Confirmar objetivo, cambios públicos autorizados, responsable de instalación, tecnología/hosting y alternativa si no tiene acceso. No suponer WordPress ni copiar cápsula de otro cliente.
- [ ] Preparar paquete revisable, plan guardado, permisos mínimos comprobados y rollback por archivo. Copilot explica qué mejora y por qué; el cliente confirma ambigüedades, no rellena todo manualmente.
- [ ] Instalar mediante el recorrido previsto y acceso acotado o guía al responsable. No presentar una propuesta como publicada.

### 4. Aceptación testigo y seguimiento

- [ ] Comparar archivos instalados con la versión aprobada; registrar fechas, hash, diferencias y limitaciones.
- [ ] Reauditar, mostrar antes/después verificable sin prometer puntaje; conservar historial y resolver observaciones.
- [ ] Cliente reabre expediente y comprende resultado y próximo paso; acordar seguimiento y canal de ayuda.
- [ ] Cerrar recibo del caso real con consentimiento de uso como caso de estudio separado. Ninguna publicación de datos privados por defecto.

## Producción general: tramo posterior independiente

El piloto contará con acompañamiento humano/gerente asistido. La operación general requiere promoción explícita de cadencia e identidad gestionada, presupuesto y límites monetarios, supervisión/retirada y recuperación, recepción de correos y revisiones pendientes observables, onboarding repetible y soporte definido. El límite actual de cinco llamadas por minuto no sustituye un presupuesto diario. No anunciar gerente permanente, respuestas autónomas por email ni fixes automáticos desde la aceptación del ensayo cerrado.

## Próximo bloque técnico

Integrar correo de marca con la custodia existente y pruebas locales; paralelamente preparar lectura pública inicial sin alterar el sitio. El ingreso del cliente será el punto de colaboración necesario para cerrar bloque 1; no se necesita otra prueba rutinaria del owner ni repetir el circuito cloud ya aceptado.

Todas las mutaciones remotas futuras identifican proyecto/repositorio/origen/recurso/acción/rollback. No abrir nuevas identidades ni activar guardia mediante este plan. Preservar expedientes y recibos históricos.
