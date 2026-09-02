# Email, Lead Capture and Consent Architecture v1

**Estado:** arquitectura y codigo local de staging preparados; captura remota y correo no desplegados

**Fecha:** 2026-08-31

**Dominio propuesto:** `agentfriendlyweb.dev`

## Objetivo

Crear un canal de contacto util para humanos y operable por agentes sin convertir una auditoria publica en una trampa de captura de datos.

## Principio de producto

El visitante primero recibe valor. La auditoria completa permanece disponible sin registro. Despues puede pedir que Agent Friendly Web le envie un plan, lo contacte o lo incorpore voluntariamente a novedades.

## Consentimientos separados

| Finalidad | Control | Estado inicial | Prueba conservada |
| --- | --- | --- | --- |
| Enviar resultado o plan solicitado | accion expresa | requerido para esa solicitud | texto/version, fecha, dominio y canal |
| Contacto comercial sobre el proyecto | accion expresa | desmarcado | finalidad y version |
| Newsletter y actualizaciones | checkbox separado | desmarcado | idioma, fuente y version |
| Publicar caso o testimonio | aprobacion posterior | no disponible en intake | alcance exacto y version aprobada |

Aceptar un plan no suscribe a marketing. Dar un email no acredita control del sitio. Pagar no autoriza publicar.

## Direcciones propuestas

- `hello@agentfriendlyweb.dev`: identidad canonica y entrada humana universal;
- `hola@agentfriendlyweb.dev`: alias de entrada para espanol;
- `ola@agentfriendlyweb.dev`: alias de entrada para portugues;
- `auditoria@agentfriendlyweb.dev`: resultados y planes solicitados;
- `seguridad@agentfriendlyweb.dev`: vulnerabilidades o abuso;
- `bajas@agentfriendlyweb.dev`: baja y preferencias;
- `no-reply@agentfriendlyweb.dev`: solo mensajes transaccionales cuando exista proveedor de salida.

Todos los aliases se normalizan hacia una unica operacion y una unica historia de consentimiento. La primera implementacion puede usar Cloudflare Email Routing para reenviar entradas a una bandeja operativa. Email Routing no se trata como una bandeja completa ni como autorizacion para enviar. El proveedor de salida, SPF, DKIM, DMARC y reputacion se verifican en un gate separado.

## Flujo humano

```mermaid
sequenceDiagram
  participant U as Usuario
  participant W as Sitio AFW
  participant T as Turnstile
  participant D as D1
  participant E as Correo
  U->>W: Ejecuta auditoria
  W-->>U: Muestra resultado completo
  U->>W: Solicita plan y acepta finalidad
  W->>T: Valida token server-side
  T-->>W: Resultado
  W->>D: Guarda lead minimo y consent receipt
  W->>E: Encola mensaje transaccional
  E-->>U: Envia confirmacion o plan
```

## Datos minimos

### Lead

- `lead_id` aleatorio;
- email normalizado;
- nombre opcional;
- dominio auditado;
- rol y organizacion opcionales;
- idioma;
- objetivo seleccionado;
- estado del pipeline;
- origen y campaign metadata allowlisted;
- timestamps.

### Consent receipt

- `consent_id`;
- `lead_id`;
- finalidad canonica;
- version del texto;
- accion `granted`, `withdrawn` o `superseded`;
- timestamp;
- hash de evidencia tecnica minima.

No se guardan contrasenas, tokens, cookies, cuerpos completos de email ni capturas privadas en la tabla de leads.

## Retencion propuesta

- consulta transaccional sin avance: revisar y eliminar a los 180 dias;
- lead comercial activo: conservar mientras exista una relacion y revision periodica;
- newsletter: conservar hasta baja o inactividad definida;
- recibos de consentimiento: periodo separado segun politica legal y contable aprobada;
- bajas: conservar solo la supresion minima necesaria para no reinscribir.

Estos periodos son una politica de producto propuesta, no una declaracion de cumplimiento universal. Deben revisarse para las jurisdicciones y proveedores usados antes de desplegar.

## Proteccion contra abuso

- Turnstile con validacion obligatoria mediante Siteverify en servidor;
- rate limiting por señal tecnica saneada;
- normalizacion y validacion de dominio/email;
- links de baja con tokens de un solo uso y expiracion;
- CSP y escapes de salida;
- rechazo de secretos probables en texto libre;
- limites de longitud;
- colas y reintentos acotados;
- alertas por rebotes y quejas.

## Rol de Codex

### Puede preparar

- clasificacion por tema e idioma;
- resumen de la consulta;
- busqueda de evidencia publica;
- borrador de respuesta;
- proxima pregunta;
- propuesta basada en catalogo y campos aprobados;
- seguimiento de SLA y recordatorio.

### Puede enviar solo con politica aprobada

- confirmacion de recepcion;
- instrucciones publicas ya verificadas;
- resultado solicitado;
- seguimiento reversible y no contractual.

### Requiere revision humana

- precios fuera del catalogo;
- compromisos de plazo;
- contratos, reembolsos, impuestos o datos de pago;
- incidentes de seguridad;
- datos personales sensibles;
- disputas;
- publicacion de casos;
- cualquier accion sobre el sitio del cliente.

Codex no necesita ver contrasenas para operar el correo. Las capacidades se entregan por tool allowlisted y la auditoria registra metadata, no secretos ni cuerpos completos.

## Eventos de analitica

- `audit_completed`;
- `plan_cta_viewed`;
- `plan_requested`;
- `marketing_consent_granted`;
- `marketing_consent_withdrawn`;
- `lead_qualified`;
- `proposal_sent`;
- `proposal_accepted`;
- `delivery_verified`.

Cloudflare Web Analytics puede medir trafico agregado sin reemplazar los consent receipts ni el CRM. Los eventos de negocio deben conservar solo identificadores internos y campos necesarios.

## Gates

1. Contrato y copy ESP/ENG/POR.
2. Tests de normalizacion, consentimientos separados, Turnstile y rate limits.
3. Migracion D1 aditiva con backup/rollback.
4. UI en staging y pruebas de accesibilidad.
5. Politica de privacidad, retencion y baja revisada.
6. DNS y Email Routing con aprobacion separada.
7. Remitente de salida verificado y canary a una allowlist.
8. Codex en modo borrador; envio automatico solo para plantillas allowlisted.

## Estado tecnico al 2026-08-31

- el endpoint publico permanece fisicamente cerrado y no lee cuerpos;
- existe una ruta candidata separada para un futuro staging privado;
- el gate externo exige hostname exacto, identidad Sites, allowlist y kill switch antes de leer el cuerpo;
- rate limiting, Turnstile y D1 son bindings obligatorios y la ausencia de cualquiera falla cerrada;
- el cuerpo JSON se limita a 8 KiB mediante lectura incremental;
- la pagina candidata utiliza solamente `example.com` y queda fuera de sitemap, navegacion e indexacion;
- no se crearon recursos remotos, no se aplicaron migraciones y no se habilitaron datos reales.
- Gate 6C incorpora una politica local `planned_draft_only` que clasifica solo metadata minima y no acepta cuerpos completos ni adjuntos;
- la politica separa solicitudes transaccionales de consentimiento para novedades, exige revision humana en asuntos sensibles y no puede enviar;
- DNS, casillas, routing y proveedor siguen sujetos a aprobacion separada.

## Actualizacion Gate 6C.1 - 2026-09-02

La recepcion entrante quedo verificada: Cloudflare Email Routing, MX/SPF/DKIM y los aliases `hello@`, `hola@` y `ola@` estan configurados y recibieron exactamente un mensaje de prueba cada uno desde una identidad externa allowlisted; `no-reply@` no entrego y el catch-all permanece deshabilitado. El estado es `inbound_canary_verified`. No se habilitaron proveedor de salida, envio, respuestas automaticas, newsletter, lectura agentica, D1 ni CRM. Esas capacidades requieren gates y aprobacion separada.

El detalle de implementacion y rollback vive en `docs/BLOCK-6B-CONTACT-STAGING-ALLOWLIST-V1.md` y `docs/BLOCK-6C-EMAIL-ROUTING-DRAFT-LOCAL-GATE-2026-08-31.md`.

## Actualizacion Gate 6C.2A - 2026-09-02

Cloudflare Email Service fue seleccionado como proveedor previsto de salida, pero permanece sin configurar. El inventario read-only confirma cero dominios emisores incorporados; el preview oficial de `agentfriendlyweb.dev` identifica seis registros DNS faltantes y cero conflictos. El estado contractual es `provider_selected_remote_unconfigured`.

El preflight local y su contrato publico no realizan red ni envios. `hello@agentfriendlyweb.dev` sera remitente y `Reply-To`; el primer destino se identifica solo como `verified_destination_1`. Cloudflare Email Service, DNS, Workers Paid, binding `send_email`, destinatarios arbitrarios, respuestas automaticas, marketing y persistencia permanecen OFF. La incorporacion del dominio y el unico canary humano son dos decisiones remotas separadas.

El detalle vive en `docs/BLOCK-6C2-EMAIL-OUTBOUND-CANARY-LOCAL-GATE-2026-09-02.md`.

## Pruebas negativas obligatorias

- auditoria accesible sin email;
- checkbox marketing no premarcado;
- un consentimiento no habilita otro;
- token Turnstile ausente, invalido o reutilizado;
- email invalido o disposable segun politica;
- texto con secreto probable;
- repeticion idempotente;
- baja invalida, vencida o repetida;
- intento de leer lead de otro actor;
- reintento de correo que no duplica el mensaje.

## Fuentes primarias

- Cloudflare Email Service: `https://developers.cloudflare.com/email-service/`
- Cloudflare Email Routing: `https://developers.cloudflare.com/email-service/get-started/route-emails/`
- Cloudflare Turnstile: `https://developers.cloudflare.com/turnstile/get-started/`
- Cloudflare D1: `https://developers.cloudflare.com/d1/`
- Cloudflare Web Analytics: `https://developers.cloudflare.com/web-analytics/about/`
