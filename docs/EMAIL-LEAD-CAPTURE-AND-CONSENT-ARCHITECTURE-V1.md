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

## Actualizacion Gate 6C.2B - 2026-09-02

`agentfriendlyweb.dev` fue incorporado a Cloudflare Email Service. Los seis registros de retorno y autenticacion quedaron publicados sin conflictos, y un canary humano unico llego al destino verificado con SPF, DKIM y DMARC en `pass`. El estado contractual es `human_canary_verified_binding_blocked`.

La prueba uso Cloudflare REST API como operacion puntual. No se creo binding, Worker, ruta, cron ni reintento; por eso `outbound_sending` sigue `false` como capacidad recurrente. Un envio futuro requiere primero un caso transaccional definido y Gate 6C.3. La evidencia saneada vive en `docs/BLOCK-6C2B-EMAIL-OUTBOUND-REMOTE-CANARY-2026-09-02.md`.

## Actualizacion Gate 6C.3A - 2026-09-02

El primer caso transaccional quedo seleccionado e implementado localmente: `internal_review_ready` avisa al destino interno ya verificado que una solicitud esta lista para revision humana. El estado es `transactional_case_selected_local_ready_remote_disabled`.

La ruta cerrada solo admite identificadores opacos, template y proposito fijos, idioma, idempotencia y aprobacion humana. El destinatario futuro queda fijado por el binding Cloudflare; no se acepta ni publica en el request. La entrega es `at-most-once`, reserva primero en D1 y conserva auditoria `metadata-only`. No hay reintentos automaticos.

El kill switch sigue en `false` y no existe migracion D1 remota, binding de email, binding de rate limit ni despliegue de esta ruta. Gate 6C.3B debe verificar Access, aislar D1, aplicar la migracion, crear bindings y superar pruebas negativas antes de solicitar un unico canary controlado. El detalle vive en `docs/BLOCK-6C3A-EMAIL-REVIEW-READY-LOCAL-GATE-2026-09-02.md`.

## Actualizacion Gate 6C.3B fase 1 - 2026-09-02

La frontera cerrada quedo desplegada en `afw_email_review_ready_canary` con estado `remote_database_and_closed_route_ready_binding_pending`. La D1 aislada recibio solamente la migracion aditiva `0006`, conserva cero filas de entregas y cuenta con backup saneado y rollback documentado. La ruta permanece detras de Cloudflare Access y el rate limiter nativo esta configurado.

El kill switch continua en `false` y no existe binding `send_email`, destino privado, envio automatico ni segundo correo. Esta fase prepara una infraestructura comprobable, no una capacidad operativa. La fase 2 debe incorporar el destino fijo y la allowlist hash fuera de Git, volver a probar el cierre y mantener el flag OFF antes de considerar un unico canary humano. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-REMOTE-CLOSED-2026-09-02.md`.

## Actualizacion Gate 6C.3B fase 2 - 2026-09-02

El destino fijo y la allowlist de identidad opaca quedaron configurados exclusivamente en Cloudflare, fuera de Git, bajo estado `private_bindings_ready_kill_switch_off`. El destino no se acepta por request ni se publica, el secreto no es recuperable por API y el kill switch continua en `false`.

## Actualizacion Gate 6C.3B fase 3 - 2026-09-02

La identidad humana Access y la validacion JWT de aplicacion quedaron comprobadas. Una superficie privada sin campos libres ejecuto el contrato fijo con el kill switch apagado y obtuvo `404 email_review_ready_unavailable`, `sent=false`; la consulta agregada posterior confirmo cero entregas y cero escrituras en D1. El estado avanza a `authenticated_negative_probe_verified_kill_switch_off`. Un unico canary real requiere confirmacion humana en el momento de la accion y deshabilitacion inmediata posterior.

Access rechazo solicitudes sin identidad, produccion mantuvo la ruta ausente y D1 conservo cero filas. No se envio correo en esta fase. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-PRIVATE-BINDINGS-2026-09-02.md` y `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-AUTHENTICATED-NEGATIVE-PROBE-2026-09-02.md`.

## Actualizacion Gate 6C.3B fase 4 - 2026-09-03

Luego de una confirmacion humana exacta se habilito temporalmente el canary y se ejecuto un solo intento `internal_review_ready`. Hubo una invocacion al proveedor, el evento quedo `failed`, no se recibio comprobante ni correo, no hubo reintento y se restauro inmediatamente la version con flag OFF. El estado vigente es `single_canary_attempt_failed_no_retry_kill_switch_off`.

La revision encontro `missing_explicit_to_field_for_fixed_destination_binding`: el mensaje omitia la propiedad que Cloudflare usa para sustituir el destino privado fijo. La correccion `to: undefined` paso de dos fallos esperados a `13/13` pruebas especificas, pero continua solo local y sin verificacion remota. Otro intento requiere suite completa, despliegue con flag OFF, prueba negativa autenticada y nueva confirmacion humana en el momento de la accion. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-SINGLE-CANARY-ATTEMPT-2026-09-03.md`.

## Actualizacion Gate 6C.3B fase 5 - 2026-09-03

La correccion fue desplegada finalmente en la version canary `7b25f69e-d30e-4ee4-be0e-c2deafed0f3d`, deployment `7f81a402-38c0-4a72-b883-1088dfd734a6`, preservando el binding privado sin revelar su destino y con `AFW_EMAIL_REVIEW_READY_ENABLED=false`. La prueba negativa autenticada mostro envio bloqueado y devolvio `HTTP 404`, `sent=false`, `email_review_ready_unavailable`.

D1 permanecio en una fila historica (`failed=1`, `sent=0`, `reserved=0`) y no hubo invocaciones nuevas al proveedor ni correos. El estado avanza a `corrected_off_version_verified_negative_probe_passed`. Esto verifica el despliegue cerrado, no la entrega corregida: `remotely_verified_fix` continua en `false` hasta un eventual canary exitoso. Antes de otro intento resta una nueva confirmacion humana exacta en el momento de la accion. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-CORRECTED-OFF-NEGATIVE-PROBE-2026-09-03.md`.

## Actualizacion Gate 6C.3B fase 6 - 2026-09-03

La version corregida se habilito temporalmente para un unico intento humano aprobado. El proveedor fue invocado una vez y rechazo nuevamente el mensaje; no hubo entrega, recibo ni reintento. El rollback `ce8635ee-03d5-4f21-96c4-46efb886aaf5` restauro inmediatamente la version OFF `7b25f69e-d30e-4ee4-be0e-c2deafed0f3d`. D1 conserva dos filas historicas `failed`, cero `sent` y cero `reserved`; el uso diario del proveedor y Gmail confirman cero correos. El estado vigente es `corrected_single_canary_attempt_failed_no_retry_kill_switch_off`.

La hipotesis `to: undefined` queda descartada como solucion remota suficiente. La siguiente candidata local es `explicit_to_null_with_sanitized_provider_failure_codes`: conserva el destino exclusivamente en el binding y clasifica solo codigos tecnicos permitidos, sin persistir errores crudos. Permanece sin desplegar y sin otro envio. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-SECOND-CANARY-ATTEMPT-2026-09-03.md`.

## Actualizacion Gate 6C.3B fase 7 - 2026-09-03

La candidata `explicit_to_null_with_sanitized_provider_failure_codes` quedo desplegada solo en `afw_email_review_ready_canary`, version `8d759339-5caf-4492-bf6a-ff6a2b3f9801`, deployment `fec166ba-ca50-4134-9ddb-5f1e4976f125`, con `AFW_EMAIL_REVIEW_READY_ENABLED=false`. El binding privado de destino fijo, la allowlist hash, D1, rate limiter y Assets se conservaron sin publicar valores privados.

La prueba negativa autenticada devolvio `HTTP 404`, `sent=false` y `email_review_ready_unavailable`. D1 permanecio en dos filas historicas `failed`, cero `sent` y cero `reserved`; no hubo invocacion al proveedor, reintento ni ningun correo. El estado vigente es `null_candidate_off_version_verified_negative_probe_passed`: verifica aislamiento, cierre y despliegue de la candidata, pero `delivery_fix_remotely_verified` continua en `false`. Cualquier nuevo intento real exige una nueva aprobacion humana exacta en el momento de la accion. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-NULL-CANDIDATE-OFF-NEGATIVE-PROBE-2026-09-03.md`.

La trazabilidad conserva como antecedentes `single_canary_attempt_failed_no_retry_kill_switch_off`, `missing_explicit_to_field_for_fixed_destination_binding`, `corrected_off_version_verified_negative_probe_passed` y `corrected_single_canary_attempt_failed_no_retry_kill_switch_off`. Ninguno de esos hitos reemplaza el estado vigente.

## Actualizacion Gate 6C.3B fase 8 - 2026-09-03

La candidata `to: null` se habilito una sola vez tras confirmacion humana puntual. La version ON `b9949bbc-685b-406d-abe5-905ae9a9e394`, deployment `ca3d0d7c-2d27-4099-9e28-f69070274519`, devolvio `HTTP 502`, `sent=false` y `email_review_ready_delivery_failed`. No hubo entrega ni reintento. El rollback `b96030cd-0e9b-4ec8-bd17-8c2807b829b0` restauro de inmediato la version OFF `8d759339-5caf-4492-bf6a-ff6a2b3f9801`; D1 quedo en tres `failed`, cero `sent` y cero `reserved`.

El estado vigente es `third_canary_failed_private_destination_candidate_local_off`. Como el runtime no confirmo la sustitucion documentada de `null` y no devolvio un codigo especifico, se preparo por TDD `explicit_to_private_runtime_destination`: la direccion procede de una variable privada del Worker, nunca del request, y el binding mantiene la restriccion al mismo destino. La candidata paso `16/16` pruebas especificas, permanece local y no genero un cuarto intento. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-THIRD-CANARY-ATTEMPT-2026-09-03.md`.

## Actualizacion Gate 6C.3B fase 9 - 2026-09-03

La candidata `explicit_to_private_runtime_destination` se cargo con dos controles coincidentes: el destino proviene de un secreto privado del Worker y el binding de Cloudflare permite exclusivamente ese mismo destino. Primero se desplego y probo con el kill switch OFF. Luego de una confirmacion humana puntual, la version ON `1e8b7bcc-9af1-463d-a68d-2942c1fb8a97` recibio un unico clic y produjo exactamente una entrega `sent`.

D1 conserva un hash de recibo del proveedor sin guardar destinatario ni contenido. Gmail confirmo la recepcion de la plantilla fija y la referencia esperada, sin adjuntos. No hubo reintentos. El rollback `2e1b0e3f-1648-437f-9c4c-ebf3ea4bb2bb` restauro inmediatamente la version OFF `5f6d149e-8611-4d53-9229-37c779a87ab4` al 100% del canary. El estado vigente es `fixed_destination_canary_verified_kill_switch_off` y `delivery_fix_remotely_verified=true`.

El resultado valida solamente el aviso interno cerrado `internal_review_ready`. El envio general, destinatarios arbitrarios, marketing, autorespuestas, adjuntos y automatizacion recurrente siguen deshabilitados. La evidencia vive en `docs/BLOCK-6C3B-EMAIL-REVIEW-READY-VERIFIED-CANARY-2026-09-03.md`.

## Actualizacion Gate 6C.3C - 2026-09-03

La integracion con una solicitud privada quedo preparada localmente bajo estado `private_flow_adapter_local_ready_remote_disabled`. El adaptador recibe un UUID opaco, exige aprobacion humana y consulta en D1 solamente `id`, `locale` y `state`; no lee email, nombre, dominio, organizacion ni contenido. Desde esa fuente deriva internamente el contrato idempotente `internal_review_ready` y devuelve `prepared_not_sent`.

No hubo despliegue, migracion, escritura, correo ni cambio de produccion. La integracion remota queda bloqueada hasta reconstruir Gate 6B en el mismo `afw_canary`, crear una solicitud sintetica y superar primero la prueba con el kill switch OFF. El detalle vive en `docs/BLOCK-6C3C-PRIVATE-REVIEW-READY-INTEGRATION-LOCAL-2026-09-03.md`.

Este es un estado historico de preflight y fue superado por la verificacion remota de Gate 6C.3D descrita mas abajo.

## Actualizacion Gate 6C.3D local - 2026-09-03

La reconstruccion same-origin de Gate 6B quedo preparada localmente dentro del canary canonico, con estado `synthetic_contact_canary_local_ready_remote_disabled`. La UI privada no pide ni acepta datos reales; el servidor deriva un fixture `.invalid`, valida Turnstile, guarda solo una solicitud sintetica y su consentimiento `requested_plan`, y prepara `internal_review_ready` como `prepared_not_sent`.

El flujo exige Access, allowlist hash, limite propio, contrato cerrado e idempotencia. `AFW_SYNTHETIC_CONTACT_ENABLED=false` y `AFW_EMAIL_REVIEW_READY_ENABLED=false` permanecen como estado inicial. Esta fase fue sin despliegue, sin escritura remota y sin correo. El detalle vive en `docs/BLOCK-6C3D-SYNTHETIC-CONTACT-CANARY-LOCAL-2026-09-03.md`.

Este es un estado historico de preflight y fue superado por `synthetic_contact_canary_verified_kill_switch_off`.

## Actualizacion Gate 6C.3D remoto - 2026-09-03

La cadena same-origin se verifico bajo estado `synthetic_contact_canary_verified_kill_switch_off`. La prueba privada creo una sola solicitud `example.invalid`, registro exclusivamente el consentimiento `requested_plan` y preparo `internal_review_ready` como `prepared_not_sent`. Las filas de entrega de email permanecieron en cuatro antes y despues; no hubo invocacion del proveedor ni correo nuevo.

El primer token de prueba fue rechazado antes de escribir porque las credenciales oficiales Turnstile devuelven accion `test` y hostname `localhost`. La correccion acepta esa semantica solo con el secreto oficial de prueba; cualquier credencial real sigue exigiendo accion `afw_synthetic_contact` y host `canary.agentfriendlyweb.dev`. El rollback dejo `AFW_SYNTHETIC_CONTACT_ENABLED=false` y `AFW_EMAIL_REVIEW_READY_ENABLED=false`. Captura publica, datos personales y marketing permanecen bloqueados. Evidencia: `docs/BLOCK-6C3D-SYNTHETIC-CONTACT-CANARY-REMOTE-2026-09-03.md`.

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
