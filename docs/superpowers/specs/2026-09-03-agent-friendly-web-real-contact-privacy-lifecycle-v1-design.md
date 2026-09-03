# Agent Friendly Web Real Contact Privacy Lifecycle v1

**Fecha:** 2026-09-03

**Gate:** 6D.4

**Estado:** diseno aprobado; implementacion no iniciada; captura real deshabilitada

## Decision

Antes de aceptar el primer contacto real, Agent Friendly Web implementara una frontera ejecutable de privacidad, consentimiento y ciclo de vida de datos. No bastara una politica narrativa: las finalidades, retenciones, derechos y efectos sobre CRM se expresaran como contratos de codigo, migraciones aditivas y pruebas automatizadas.

Este diseno no activa formularios reales, newsletter, automatizaciones comerciales ni decisiones sobre personas. Tampoco declara cumplimiento juridico universal. Define una base tecnica prudente que debe ser revisada contra la jurisdiccion, identidad juridica, proveedores y textos vigentes antes de abrir el gate humano.

## Alcance

Gate 6D.4 cubre exclusivamente datos de personas que decidan continuar despues de una auditoria publica de Agent Friendly Web.

Incluye:

- separacion de finalidades y consentimientos;
- minimizacion y clasificacion de datos;
- retencion y vencimiento por finalidad;
- acceso, exportacion, rectificacion, retiro y supresion;
- repercusion del borrado en el CRM referencial;
- evidencia de consentimiento y auditoria sin contenido personal;
- pruebas sinteticas y rollout con kill switches.

Quedan fuera:

- pagos, facturacion y datos bancarios;
- archivos, contrasenas, claves, tokens o accesos a sitios;
- perfiles de comportamiento, scoring personal y decisiones automaticas;
- importacion de agendas, listas compradas o enriquecimiento de terceros;
- publicacion de casos, testimonios o logos sin consentimiento independiente;
- datos de Tokenizart, que continua siendo un caso documentado separado.

## Principios obligatorios

1. **Auditoria sin registro.** Escanear un sitio no exige email ni crea un lead.
2. **Finalidad explicita.** Cada uso tiene un identificador y texto versionado.
3. **Consentimiento no heredable.** Aceptar una finalidad no habilita otra.
4. **Minimizacion.** Se conserva solo lo necesario para responder o continuar la relacion solicitada.
5. **Vencimiento real.** Todo dato identificable tiene fecha de revision o eliminacion.
6. **Derechos operables.** Acceso, correccion, retiro y supresion deben producir efectos comprobables.
7. **Separacion por frontera.** El CRM recibe referencias opacas; no duplica email, nombre ni texto.
8. **Auditoria metadata-only.** Logs y metricas no contienen datos personales, tokens ni cuerpos.
9. **Fallo cerrado.** Si identidad, finalidad, version de politica o transaccion son ambiguas, no se procesa.
10. **Reversibilidad antes de datos.** Codigo y flags admiten rollback; un borrado consumado no restaura PII desde backups operativos.

## Finalidades v1

| Codigo | Uso permitido | Requisito | Estado inicial |
| --- | --- | --- | --- |
| `requested_plan` | Preparar y responder el plan expresamente solicitado | Aceptacion explicita de ese envio | Disenado; captura real OFF |
| `commercial_contact` | Continuar una conversacion comercial sobre el proyecto indicado | Opt-in independiente, desmarcado por defecto | Disenado; OFF |
| `product_updates` | Recibir novedades editoriales o de producto | Opt-in independiente, desmarcado por defecto y baja disponible | Disenado; OFF |
| `case_publication` | Publicar nombre, logo, testimonio o resultados atribuibles | Consentimiento posterior, granular y revocable | Fuera de intake; no disponible |

Reglas:

- `requested_plan` no suscribe a `commercial_contact` ni a `product_updates`;
- pagar, controlar un dominio o aprobar una capsula no autoriza marketing;
- retirar `product_updates` no cancela una respuesta transaccional ya solicitada;
- ninguna finalidad admite campos desconocidos o texto libre ilimitado;
- una nueva finalidad requiere contrato, copy, retencion y pruebas propios.

## Clasificacion y ubicacion de datos

### Frontera de contacto

Puede conservar:

- email normalizado;
- nombre, organizacion y rol opcionales;
- dominio auditado;
- idioma `es`, `en` o `pt`;
- objetivo allowlisted;
- estado y timestamps;
- referencias internas, version de copy e idempotencia.

No puede conservar:

- contrasenas, API keys, cookies, sesiones o tokens;
- numeros de tarjeta, cuentas bancarias o wallets;
- documentos personales, biometria o categorias sensibles;
- cuerpo completo de correos o conversaciones;
- capturas privadas, archivos o credenciales de hosting;
- IP completa como identificador de negocio cuando un control agregado o hash rotativo sea suficiente.

### Frontera CRM

`crm_opportunities` recibe solo `contactRef` opaco y datos comerciales no personales allowlisted. No recibe email, nombre, telefono, mensaje, consentimiento ni evidencia.

### Frontera de auditoria

Registra solo:

- tipo de evento;
- version de politica;
- finalidad;
- estado anterior y posterior;
- clase de actor;
- codigo de resultado;
- timestamps;
- identificador tecnico no reversible cuando sea necesario.

Nunca registra email, nombre, contenido, token de verificacion, JWT, cookie, Turnstile token ni secreto.

## Ciclo de vida y retencion inicial

Los plazos siguientes son defaults tecnicos conservadores para el piloto. Deben confirmarse mediante revision juridica antes de captura publica y permanecer configurables por version de politica.

| Situacion | Plazo inicial | Accion al vencer |
| --- | --- | --- |
| Solicitud `requested_plan` sin progreso comercial | 180 dias desde la ultima interaccion | Borrar identificadores directos y anonimizar la referencia |
| Contacto comercial activo | Revision cada 180 dias; maximo 12 meses sin interaccion | Cerrar y borrar identificadores salvo obligacion documentada |
| `product_updates` | Hasta retiro o 24 meses de inactividad | Suspender; solicitar reconfirmacion o borrar |
| Evidencia pseudonimizada de consentimiento | 24 meses despues del borrado del lead | Eliminar al vencer, salvo retencion legal documentada |
| Supresion de marketing | Hasta nuevo opt-in verificable o 24 meses | Eliminar el hash si ya no es necesario |
| Fixtures y pruebas | Inmediato al cerrar la prueba o maximo 7 dias | Purga automatica; solo dominios `.invalid` |

Reglas adicionales:

- `last_interaction_at` solo cambia por una interaccion verificable, no por jobs internos;
- marcar un lead como `active` no evita indefinidamente su vencimiento;
- una obligacion de conservacion excepcional exige codigo allowlisted, responsable humano y fecha de expiracion;
- los backups no se usan para rehidratar PII borrada; su ciclo de expiracion debe estar documentado antes del gate real;
- analitica agregada no identificable puede conservarse sin reconstruir personas o contactos.

## Derechos y verificacion

La v1 preparara estos tipos de solicitud:

- `access_export`: conocer y recibir los datos asociados;
- `rectification`: corregir campos allowlisted;
- `withdraw_consent`: retirar una finalidad concreta;
- `deletion`: borrar identificadores y romper la resolucion desde CRM;
- `restriction`: suspender procesamiento mientras una controversia se revisa;
- `consent_status`: conocer finalidades activas y versiones aceptadas.

La identidad se verificara mediante un enlace de email de un solo uso, corta duracion y finalidad exclusiva. El token se almacenara solo como hash, tendra expiracion, no sera reutilizable y no aparecera en logs. No se pedira documento de identidad si el control del mismo email resulta suficiente y proporcional para el riesgo de la solicitud.

Antes del piloto humano deben existir y verificarse:

- un canal dedicado de derechos, inicialmente previsto como `bajas@agentfriendlyweb.dev`;
- `hello@agentfriendlyweb.dev` como fallback operativo;
- responsable humano y plazo interno de respuesta;
- copy publico que identifique correctamente al responsable de datos y no infiera una entidad juridica inexistente.

Los aliases previstos no se consideran operativos hasta verificar recepcion, custodia y respuesta. Este documento no crea ni configura correo.

## Efectos deterministas

### Retiro de consentimiento

- genera un evento inmutable `withdrawn` para una sola finalidad;
- bloquea nuevos usos de esa finalidad;
- no modifica consentimientos distintos;
- invalida jobs pendientes incompatibles;
- genera o actualiza una supresion HMAC sin conservar el email en esa tabla.

### Rectificacion

- solo admite campos definidos en el contrato;
- conserva un evento metadata-only con los nombres de campos, no sus valores;
- no modifica evidencia historica; crea una nueva version vigente.

### Exportacion

- contiene solo datos del sujeto verificado;
- separa datos declarados, eventos de consentimiento y estados derivados;
- no expone secretos, reglas internas, datos de terceros ni referencias resolubles ajenas;
- usa enlace efimero o respuesta autenticada y expira despues de una descarga o del plazo definido.

### Supresion

- borra email, nombre y otros identificadores directos de `contact_leads`;
- convierte `contactRef` en tombstone no resoluble;
- conserva solo evidencia pseudonimizada estrictamente necesaria y su vencimiento;
- impide que CRM, email o automatizaciones reconstruyan el contacto;
- no restaura PII desde backups, logs, exports ni eventos.

Si una solicitud no puede completarse, el sistema falla cerrado y registra un codigo de decision. Una excepcion requiere revision humana, fundamento allowlisted y expiracion; nunca una nota libre que termine en logs.

## Modelo de datos futuro

La implementacion sera aditiva y no cambiara los registros sinteticos existentes hasta tener migracion y pruebas.

### Cambios en `contact_leads`

- `last_interaction_at`;
- `retention_expires_at`;
- `erased_at`;
- `policy_version`;
- `restriction_state`.

### Evolucion de `consent_receipts`

El recibo pasa a ser un evento inmutable con acciones `granted`, `withdrawn` o `superseded`. La vigencia se calcula por finalidad y secuencia; nunca se sobreescribe la evidencia historica.

### `privacy_requests`

- `id` aleatorio;
- `request_type` allowlisted;
- `contact_ref_hash` no reversible;
- `status` allowlisted;
- `verification_hash` y `verification_expires_at`;
- `policy_version`;
- `decision_code` allowlisted;
- `created_at`, `verified_at`, `resolved_at` y `expires_at`.

No contiene email, nombre, texto libre ni token en claro.

### `contact_suppressions`

- HMAC de email normalizado con clave fuera de D1;
- finalidad bloqueada;
- motivo allowlisted;
- version de politica;
- fechas de creacion y expiracion.

### `data_lifecycle_events`

- evento `due`, `deleted`, `anonymized`, `suppressed`, `exported` o `held`;
- referencia tecnica no reversible;
- resultado y timestamps;
- cero valores personales.

## Componentes

1. **Pure policy module.** Calcula finalidades activas, vencimientos y efectos sin I/O.
2. **D1 repository.** Ejecuta cambios en transacciones e impide estados parciales.
3. **Rights service.** Valida solicitudes, prueba control del email y orquesta efectos.
4. **Lifecycle worker.** Primero `dry_run`; despues aplica lotes limitados e idempotentes.
5. **CRM resolver.** Resuelve `contactRef` solo si el contacto sigue vigente y permitido.
6. **Machine-readable contract.** Publica capacidades reales, flags y limites sin datos internos.
7. **Human copy.** Explica finalidades, plazos y canales en ESP, ENG y POR con equivalencia semantica.

No se creara un microservicio nuevo en v1. Los componentes viviran como modulos aislados del Worker canonico y compartiran la D1 de contacto dentro del mismo entorno. Una separacion fisica posterior solo se justificara por escala, equipo o requisitos regulatorios.

## Kill switches

Todas las variables faltantes equivalen a `false`:

```text
AFW_REAL_CONTACT_ENABLED=false
AFW_PRIVACY_REQUESTS_ENABLED=false
AFW_RETENTION_JOBS_ENABLED=false
AFW_PRODUCT_UPDATES_ENABLED=false
```

El contrato debe impedir que una sola variable active todas las capacidades. La captura real, los derechos, los jobs y las novedades se habilitan por separado, con evidencia y rollback propios.

## Seguridad y manejo de errores

- Turnstile, rate limit, hostname exacto e idempotencia siguen siendo obligatorios para captura real.
- Tokens de derechos: un uso, corta duracion, hash en reposo y comparacion constante.
- Repetir una solicitud con la misma idempotencia devuelve el resultado previo sin duplicar eventos.
- Finalidad desconocida, copy obsoleto o token vencido devuelven codigo estable sin filtrar existencia de un email.
- Eliminacion, supresion y actualizacion de referencias ocurren en una transaccion D1.
- Los jobs comienzan en `dry_run`, exponen conteos y no muestran filas ni emails.
- Cada lote tiene limite, cursor y reanudacion idempotente.
- Un hold sin motivo allowlisted o expiracion se rechaza.
- Ningun endpoint devuelve trazas, SQL, variables, bindings o secretos.

## Backup y rollback

Antes de una migracion remota se registraran bookmark/backup, schema, version, entorno y plan de rollback. Las migraciones seran aditivas antes de empezar a escribir nuevos campos.

El rollback puede:

- volver flags a `false`;
- restaurar una version anterior del Worker;
- dejar de aceptar solicitudes;
- detener jobs antes de su aplicacion.

El rollback no puede restaurar datos personales eliminados. Una vez confirmado un borrado, los backups siguen su expiracion y no se usan para reconstruir el contacto. Esta asimetria debe verificarse antes de habilitar `deletion`.

## Pruebas obligatorias

### Contrato y politica

- consentimientos opcionales desmarcados;
- una finalidad no habilita otra;
- copy versionado y finalidad desconocida rechazados;
- vencimientos calculados desde la ultima interaccion valida;
- ningun estado `active` evita indefinidamente la retencion.

### Derechos

- token expirado, alterado o reutilizado falla cerrado;
- exportacion incluye solo el sujeto verificado;
- rectificacion cambia solo campos allowlisted;
- retiro es granular e invalida jobs incompatibles;
- supresion borra identificadores, rompe CRM y crea solo HMAC;
- una excepcion sin motivo y expiracion se rechaza.

### Ciclo de vida

- `dry_run` y `apply` producen el mismo conjunto objetivo;
- reejecutar un lote no duplica eventos ni cambia filas ya resueltas;
- una falla parcial revierte la transaccion;
- fixtures `.invalid` se purgan dentro del plazo;
- ninguna salida, log o metrica contiene PII o tokens.

### Entornos

- produccion y canary conservan todos los flags en `false` al cerrar cada prueba;
- identidad no allowlisted recibe Cloudflare Access o rechazo equivalente;
- D1 canary permanece aislada de produccion;
- scanner publico y resultado de auditoria funcionan sin email;
- Tokenizart y recursos `tokenizart-*` no aparecen como bindings ni destinos.

## Rollout por subgates

### Gate 6D.4A - Contrato y plan local

- diseno escrito y revisado;
- contrato machine-readable consistente;
- implementacion planificada con TDD;
- cero cambios remotos.

### Gate 6D.4B - Politica ejecutable local

- modulo puro, repositorio y migracion aditiva;
- pruebas de finalidades, derechos y retencion;
- todos los flags OFF.

### Gate 6D.4C - Ciclo sintetico privado

- una identidad Cloudflare Access allowlisted;
- un contacto reservado `.invalid`;
- grant, rectificacion, export, retiro y supresion sinteticos;
- D1 canary aislada;
- cierre con conteo esperado y flags OFF.

### Gate 6D.4D - Piloto humano privado

Requiere revisar identidad juridica, copy, canal de derechos, proveedor transaccional, backups y jurisdicciones. Solo una identidad expresamente autorizada puede probar datos propios; newsletter y captura publica siguen OFF.

### Gate 6D.4E - Canary de contacto real

Requiere aprobacion separada despues de QA juridico, tecnico y humano. Empieza con trafico minimo, alertas, soporte y rollback. No habilita automaticamente marketing, pagos, CRM automation ni A2A.

## Criterios de aceptacion del diseno

- ninguna prueba o documento exige datos reales;
- finalidades, retenciones y efectos son deterministas;
- CRM no duplica PII y respeta tombstones;
- cada capacidad tiene kill switch independiente;
- derechos y verificacion estan definidos sin recopilar datos excesivos;
- auditoria y contratos no filtran PII;
- rollback y limitacion de backups reconocen que la supresion es irreversible;
- ESP, ENG y POR pueden derivarse del mismo contrato semantico;
- el siguiente plan puede descomponerse en cambios pequenos y verificables;
- la activacion publica permanece fuera del alcance.

## Referencias oficiales

Estas fuentes orientan el diseno; no constituyen por si solas una certificacion ni reemplazan asesoramiento juridico aplicable:

- Argentina, AAIP, derechos de acceso, rectificacion, actualizacion y supresion: `https://www.argentina.gob.ar/aaip/datospersonales/derechos`
- Argentina, Ley 25.326 actualizada: `https://www.argentina.gob.ar/normativa/nacional/64790/actualizacion`
- Union Europea, GDPR, principios de finalidad, minimizacion y limitacion de conservacion: `https://eur-lex.europa.eu/eli/reg/2016/679/2016-05-04`
- Brasil, ANPD, derechos de las personas titulares: `https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares`
- California, CPPA, derechos de conocer, corregir y eliminar: `https://cppa.ca.gov/faq`

## Siguiente decision

Despues de revisar y aprobar esta especificacion escrita, el siguiente paso es producir el plan tecnico ejecutable de Gate 6D.4B. Ese plan debe comenzar con tests, mantener todos los flags OFF y prohibir cualquier migracion remota o contacto real hasta los subgates correspondientes.
