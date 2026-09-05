# Gate 6D.4D2 - candidato publico de privacidad operativa

Fecha: 2026-09-05  
Proyecto: Agent Friendly Web  
Entorno de preparacion: rama y Draft PR, sin despliegue remoto en este gate  
Estado: `candidate_for_legal_review`

## Objetivo

Preparar una explicacion humana y machine-readable que distinga el tratamiento tecnico que existe hoy de las capacidades futuras de contacto, CRM, retencion y novedades. El objetivo no es certificar cumplimiento legal ni abrir la captacion web de datos. El correo que una persona envia voluntariamente permanece como un canal manual separado.

## Identidad operativa candidata

- producto: Agent Friendly Web;
- creador e impulsor: Gabriel Mucchiut;
- contexto de incubacion: Tokenizart;
- prestador comercial inicial previsto: Tokenizart Group LLC;
- designacion juridica del responsable de tratamiento: pendiente de verificacion;
- domicilio del responsable: pendiente de verificacion;
- aplicabilidad por jurisdiccion: pendiente de determinacion caso por caso.

Esta formulacion sigue la decision operativa aprobada para la etapa inicial. No modifica titularidad, contratos, estructura societaria ni obligaciones fiscales.

## Tratamiento verificable actual

| Flujo | Dato o evidencia | Persistencia AFW | Estado |
| --- | --- | --- | --- |
| Navegacion publica | IP y metadatos tecnicos procesados por Cloudflare | no se copian a la base de contactos | activo por infraestructura |
| Auditoria publica | URL y respuestas publicas del dominio consultado | no se guardan en D1; respuesta `no-store` | activo, read-only |
| Vista previa de contacto | datos escritos por la persona | memoria React del navegador | prototipo local |
| Correo voluntario | remitente y contenido decidido por la persona | bandeja privada por Email Routing; sin copia automatica a D1, CRM o RAG | entrada manual verificada |

No deben enviarse contrasenas, tokens, credenciales ni datos de pago por correo o formularios.

## Retencion

Los periodos de 180, 365 y 730 dias son objetivos de diseno para una etapa posterior. No representan jobs activos ni promesas de borrado automatico. Antes de activarlos deben definirse base juridica, inventario de procesadores, backups, supresiones, responsable, soporte y evidencia de ejecucion.

Cloudflare documenta que Workers Logs puede conservar registros hasta siete dias. Esa politica del proveedor no convierte dichos logs en una base comercial de Agent Friendly Web.

## Derechos y contacto

El aviso explica acceso, exportacion, rectificacion, retiro, restriccion, eliminacion y reclamo cuando correspondan. El canal humano candidato es `hello@agentfriendlyweb.dev`, con atencion manual y verificacion proporcional de identidad. No existe todavia un portal automatizado de derechos.

## Superficies preparadas

- `/privacidad`;
- `/en/privacy`;
- `/pt/privacidade`;
- `/.well-known/contact-privacy-lifecycle-contract.json`;
- footer, sitemap, mapa del sitio, AI Catalog, readiness manifest, `llms.txt` y `llms-full.txt`.

La politica no se agrega a la navegacion primaria para mantener la portada enfocada. El formulario de contacto en modo preview enlaza el aviso.

## Frontera cerrada

Los siguientes interruptores permanecen en string `false` en base, canary y produccion:

- `AFW_REAL_CONTACT_ENABLED`;
- `AFW_PRIVACY_REQUESTS_ENABLED`;
- `AFW_RETENTION_JOBS_ENABLED`;
- `AFW_PRODUCT_UPDATES_ENABLED`.

Este gate no despliega, no migra D1, no procesa datos de terceros, no envia correo, no crea oportunidades CRM, no cobra y no usa recursos de Tokenizart.

## Fuentes oficiales revisadas

- AAIP, derechos: <https://www.argentina.gob.ar/aaip/datospersonales/derechos>
- AAIP, obligaciones: <https://www.argentina.gob.ar/aaip/datospersonales/responsables/obligaciones>
- Reglamento General de Proteccion de Datos: <https://eur-lex.europa.eu/eli/reg/2016/679/oj>
- ANPD Brasil, derechos de titulares: <https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares>
- California Privacy Protection Agency, FAQ: <https://cppa.ca.gov/faq>
- Cloudflare Workers Logs: <https://developers.cloudflare.com/workers/observability/logs/workers-logs/>
- Cloudflare Data Processing Addendum: <https://www.cloudflare.com/en-gb/cloudflare-customer-dpa/>

Estas fuentes permiten preparar preguntas y limites. No prueban que todas las jurisdicciones sean aplicables ni reemplazan revision juridica profesional.

## Pruebas requeridas

- rutas ES/EN/PT estables;
- contenido y fuentes localizados;
- contrato JSON parseable y fail-closed;
- descubrimiento humano y machine-readable;
- contacto preview enlazado a privacidad;
- navegacion primaria sin sobrecarga;
- layout de escritorio y movil sin solapamientos;
- suite completa, lint, build y dry-run de despliegue.

## Verificacion local

- pruebas focalizadas de privacidad y contratos: `10/10`;
- suite completa: `670/670`;
- lint: sin errores; conserva una advertencia preexistente de `next/image` en la ilustracion de la home;
- build Vinext: correcto, con rutas `/privacidad` y localizadas incluidas;
- dry-run Cloudflare canary: correcto, sin build remoto ni despliegue;
- escritorio `1440x900`: jerarquia y contenido visibles sin solapamientos;
- movil `390x844`: `scrollWidth=390`, ancho de body `390`, hero `390` y tabla `354`, sin overflow horizontal; header compacto, selector ES/EN/PT y menu accesibles.

El comando de captura movil de Playwright agoto su timeout al esperar estabilidad de fuentes, pero el snapshot accesible completo y las mediciones geometricas terminaron correctamente. La captura de escritorio se reviso visualmente.

## Siguiente gate

`policy_legal_identity_and_public_copy_review_required`.

Antes de publicar o abrir datos reales se debe confirmar responsable de tratamiento, domicilio, jurisdicciones objetivo, texto juridico final, periodos ejecutables, proceso humano de derechos, procesadores y soporte. Publicar el candidato y activar contacto real son decisiones separadas.
