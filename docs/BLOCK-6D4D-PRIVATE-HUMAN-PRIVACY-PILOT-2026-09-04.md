# Gate 6D.4D - piloto humano privado de privacidad

**Estado:** `private_human_privacy_pilot_completed_erased_kill_switch_off`

## Alcance

El gate ejecuto una unica prueba privada con datos propios de una identidad expresamente autorizada y verificada por Cloudflare Access. La API derivo el email desde el JWT firmado de Access; el navegador no lo solicito ni lo envio como campo editable. La ventana existio solo en `afw_canary` y no habilito captura publica, newsletter, contacto comercial, pagos ni operaciones sobre sitios.

Esta prueba fue una decision operativa acotada. No constituye aprobacion juridica, certificacion de cumplimiento ni autorizacion para procesar datos de terceros.

## Recorrido verificado

La persona autorizada completo, en orden:

1. alta privada del registro de prueba;
2. inspeccion de su propia exportacion;
3. rectificacion del idioma;
4. retiro del consentimiento `requested_plan`;
5. borrado de los identificadores directos.

La interfaz mostro el cierre humano previsto y deshabilito nuevas acciones. Durante la prueba se detecto que una recarga de pagina perdia el progreso local aunque el servidor conservaba correctamente la etapa. La correccion `dbacb9b` incorporo recuperacion mediante `resumeStage`, con pruebas de servidor y UI, sin duplicar escrituras.

## Evidencia agregada

El baseline contenia un fixture sintetico ya borrado. La prueba humana agrego un unico lead y termino con estos deltas:

| Metrica | Delta del piloto |
| --- | ---: |
| Leads | 1 |
| Leads borrados y saneados | 1 |
| Eventos de consentimiento | 1 |
| Solicitudes de privacidad | 4 |
| Supresiones | 1 |
| Eventos de ciclo de vida | 1 |
| Oportunidades CRM | 0 |
| Entregas de email | 0 |

La D1 canary quedo con dos leads totales, ambos `erased` y ambos saneados. La consulta de cierre encontro cero filas borradas con email, nombre, dominio, rol, organizacion, objetivo, fuente o hash de request poblados, y cero uniones directas entre CRM y contactos. Tambien confirmo exactamente un evento `requested_plan/withdrawn` y dos solicitudes resueltas de cada tipo: exportacion, rectificacion, retiro y borrado, una por cada ciclo sintetico/humano. La oportunidad CRM y las cuatro filas historicas de entrega de email no cambiaron.

La evidencia no contiene exportaciones, emails, nombres, subjects de Access, hashes de identidad, JWT, cookies, secretos, valores de supresion, identificadores de contacto ni filas crudas.

## Cierre remoto

El Worker `agent-friendly-web-web-canary` quedo en la version `fb72bfc4-90c9-46ea-a9ff-3239d5baf955`, deployment `6f77d833-33d7-4d3d-9f73-18dd3ca3a678`, con 100% del trafico del subdominio canary y estos interruptores en `false`:

- `AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED`;
- `AFW_REAL_CONTACT_ENABLED`;
- `AFW_PRIVACY_REQUESTS_ENABLED`;
- `AFW_RETENTION_JOBS_ENABLED`;
- `AFW_PRODUCT_UPDATES_ENABLED`;
- todos los flags sinteticos de escritura.

Las solicitudes anonimas a UI y API reciben `302` hacia Cloudflare Access. Un probe directo de la aplicacion Worker devolvio `404` y la version desplegada muestra el switch en `false`. Con sesion Access vigente, una nueva apertura despues del despliegue OFF produjo `ERR_HTTP_RESPONSE_CODE_FAILURE`; la automatizacion del navegador no expuso el numero dentro de ese error. Por eso la prueba negativa queda acreditada por descomposicion: Access bloquea anonimos, el Worker cerrado responde `404` y el binding remoto esta OFF. Produccion continuo respondiendo `200` y su D1 conserva cero contactos.

La migracion `0008_contact_privacy_lifecycle.sql` esta aplicada en canary y Wrangler informa cero migraciones pendientes.

La suite posterior al cierre paso 21 pruebas especificas y 664 pruebas completas, con cero fallos. El lint termino con cero errores y una advertencia historica sobre la imagen del hero; build y dry-run Cloudflare terminaron correctamente, sin despliegue adicional.

## Backups y rollback

D1 Time Travel puede conservar temporalmente una version anterior con datos identificables. Por eso no se afirma borrado absoluto de backups. El marcador de restauracion se conserva fuera de la evidencia publica y cualquier restore debe reaplicar inmediatamente el tombstone de borrado antes de reabrir una superficie.

No fue necesario restaurar Worker ni D1. Tampoco se reabrio el switch para repetir `erase` despues del borrado: generar una nueva ventana solo para un replay contradecia la minimizacion de datos. La ruta idempotente y la ausencia de escrituras duplicadas estan cubiertas por las pruebas locales y por los conteos remotos finales sin eventos extra.

## Limites y siguiente gate

El gate no envio correos, no creo propuestas, no cobro, no modifico sitios de clientes, no uso recursos de Tokenizart y no escribio en produccion. Tampoco habilita Gate 6D.4E ni un canal publico de derechos.

Antes de aceptar datos de terceros se requiere un gate separado para revisar responsable de tratamiento, identidad juridica, jurisdicciones, copy publico, politica de privacidad, retencion, canal de derechos, soporte y respuesta a incidentes. `AFW_PRODUCT_UPDATES_ENABLED=false` permanece como limite explicito.

Evidencia machine-readable: `docs/evidence/private-human-privacy-pilot-canary-2026-09-04.json`.
