# Agent Friendly Registry y Owner-Authorized Publishing Bridge v1

Estado: propuesta aprobada para especificacion tecnica

Fecha: 2026-08-26

Autor del proyecto: Gabriel Mucchiut

Primer caso integral: Tokenizart y Atelier

Sensibilidad: Nivel 5 publico

## 1. Resumen ejecutivo

Agent Friendly Web evolucionara de un auditor de sitios a una infraestructura de descubrimiento, preparacion y publicacion controlada.

La nueva arquitectura combina dos productos:

1. **Agent Friendly Registry**: registro publico y buscador de organizaciones, sitios, contenidos y herramientas expuestas para humanos y agentes.
2. **Owner-Authorized Publishing Bridge**: puente que transforma la voluntad del propietario de un sitio en una autorizacion tecnica precisa, limitada, verificable, revocable y auditable.

El puente no evade controles de hosting, no extrae credenciales y no reemplaza al mantenedor por la fuerza. Reduce la friccion mediante un paquete firmado, una lista exacta de cambios y conectores que solo pueden operar sobre rutas autorizadas.

Tokenizart sera el primer caso completo: `tokenizart.com` presenta el ecosistema y Atelier es la plataforma operativa donde los usuarios preparan y gestionan obras u objetos unicos. Owner Live permanece en otra frontera y no forma parte del registro publico ni de este puente.

## 2. Problema que resuelve

Muchos propietarios juridicos o comerciales de sitios no controlan el codigo, el hosting, el DNS o las credenciales. El proveedor que construyo o mantiene el sitio concentra el acceso tecnico, incluso cuando el propietario solo quiere publicar archivos publicos y acotados como:

- `llms.txt`;
- `llms-full.txt`;
- `robots.txt`;
- `sitemap.xml`;
- JSON-LD;
- catalogos de recursos;
- indices de skills;
- documentacion OpenAPI o MCP realmente desplegada;
- cabeceras `Link`;
- negociacion de contenido Markdown cuando exista soporte real.

La consecuencia es una dependencia desproporcionada para cambios simples, verificables y reversibles. Agent Friendly Web debe convertir una peticion ambigua en una orden tecnica que el propietario comprende y el mantenedor puede aprobar sin entregar control general.

## 3. Principios de diseno

### 3.1 Propiedad no equivale a acceso tecnico

La declaracion del propietario no habilita a saltar autenticacion, contratos, controles del hosting ni derechos de terceros. La plataforma debe obtener consentimiento del propietario y una via tecnica legitima del mantenedor o proveedor.

### 3.2 Menor privilegio

Cada autorizacion enumera rutas, hashes, operacion, entorno, vencimiento y rollback. Una capacidad para publicar `llms.txt` no puede modificar temas, usuarios, plugins, bases de datos, DNS, billing ni codigo no autorizado.

### 3.3 Declarado, observado y verificado son estados diferentes

El Registry mostrara por separado:

- lo declarado por el propietario;
- lo observado por el scanner;
- lo verificado mediante control de dominio;
- lo publicado en el origen;
- lo alojado externamente como propuesta o espejo;
- lo que sigue en roadmap.

### 3.4 No simular capacidades

No se publicara un MCP, OpenAPI, skill, endpoint, sistema de pagos o herramienta como disponible hasta que exista una URL estable y una prueba verificable.

### 3.5 Actualizacion continua

El sistema debe detectar deriva, volver a generar diferencias y pedir aprobacion solo sobre cambios nuevos. Una aprobacion previa no se extiende automaticamente a archivos, rutas o capacidades adicionales.

### 3.6 Interoperabilidad abierta, ejecucion controlada

Los manifiestos, perfiles publicos, esquemas y paquetes de lectura pueden ser abiertos. Las mutaciones, conectores, credenciales, billing y automatizaciones conservan autorizacion, marca, seguridad y monetizacion propias.

## 4. Arquitectura de producto

### 4.1 Agent Friendly Registry

El Registry sera un indice publico y consultable por personas y agentes. Cada sitio tendra un perfil con:

- organizacion y dominio;
- descripcion humana;
- sectores y audiencias;
- idiomas;
- fuentes publicas;
- estado de verificacion del dominio;
- resultado de auditorias fechadas;
- recursos descubiertos;
- herramientas realmente disponibles;
- declaraciones del propietario;
- historial de cambios publicos;
- enlace canonico al origen;
- estado de la propuesta de mejora;
- fecha de ultima verificacion.

Cada perfil se expondra en HTML accesible, JSON estructurado y Markdown real. El contenido generado por el propietario conservara procedencia y fecha.

El buscador podra filtrar por sector, idioma, nivel AF, estado de verificacion, capacidades y tipo de recurso. La relevancia organica no se comprara. Los espacios promocionados se identificaran como tales y no alteraran la condicion de verificado.

### 4.2 Expediente privado

El formulario existente se ampliara progresivamente para reunir:

- identidad y relacion con el sitio;
- control tecnico disponible;
- mantenedor o proveedor actual;
- CMS, hosting y DNS;
- objetivos de descubrimiento;
- contenido disponible;
- capacidades que se desean exponer;
- archivos que se autorizan;
- preferencia de publicacion;
- politica de crawlers y entrenamiento;
- responsable de aprobacion;
- necesidad de monitoreo posterior.

No se solicitaran contrasenas, cookies, claves privadas ni secretos en formularios o chats.

### 4.3 Verificacion de dominio

La verificacion fuerte se realizara con uno de estos metodos:

1. DNS TXT en `_agentfriendly-challenge.<dominio>`.
2. Archivo temporal `/.well-known/agent-friendly-owner.json`.
3. Instalacion confirmada de GitHub App o conector del CMS sobre el proyecto correcto.
4. Integracion de proveedor que acredite control equivalente.

La verificacion por email puede ayudar a contactar, pero por si sola no acredita control del dominio.

Los desafios seran aleatorios, con expiracion, un solo uso y vinculados al expediente.

### 4.4 Publicacion externa cuando no existe acceso

Si el origen permanece bloqueado, el Registry puede alojar un perfil externo y los archivos propuestos. Deben etiquetarse como `external_mirror` o `owner_declaration`, no como contenido canonico del sitio.

El propietario tambien puede delegar un subdominio como `agent.<dominio>` mediante CNAME. Esto mejora descubrimiento y control, pero no equivale a publicar archivos en la raiz del dominio principal.

## 5. Capsula de publicacion

### 5.1 Definicion

Una capsula es un paquete inmutable que contiene:

- identificador unico;
- dominio y entorno;
- identidad verificada del propietario;
- mantenedor esperado;
- rutas autorizadas;
- contenido o parches;
- SHA-256 de cada archivo;
- version previa conocida;
- operacion por ruta: crear, reemplazar o eliminar;
- modo: paquete, pull request o conector;
- fecha de creacion y expiracion;
- condiciones de aprobacion;
- pruebas posteriores;
- instrucciones de rollback;
- firma del servicio;
- estado del consentimiento del propietario;
- estado del consentimiento del mantenedor.

### 5.2 Estados

Los estados canonicos seran:

- `draft`;
- `domain_verification_pending`;
- `owner_verified`;
- `owner_approved`;
- `maintainer_pending`;
- `maintainer_approved`;
- `applying`;
- `applied`;
- `verification_failed`;
- `verified`;
- `rolled_back`;
- `revoked`;
- `expired`.

No se permite saltar de `draft` a `applying`.

### 5.3 Doble consentimiento

El propietario aprueba la finalidad y el contenido. El mantenedor aprueba la operacion tecnica o instala una capacidad previamente delimitada.

En un repositorio controlado directamente por el propietario, la instalacion de una GitHub App puede satisfacer el consentimiento tecnico para crear un Draft PR. El merge sigue separado salvo autorizacion expresa.

### 5.4 Idempotencia

Cada operacion tendra una clave de idempotencia derivada de capsula, dominio y conjunto de hashes. Repetir una capsula aplicada no generara cambios adicionales.

### 5.5 Rollback

Antes de aplicar se capturara el hash o contenido anterior de cada ruta. El rollback solo puede restaurar las rutas de la capsula y quedara registrado como un nuevo evento.

## 6. Conectores

### 6.1 Paquete firmado y CLI

Es el primer conector universal. La CLI:

- descarga o abre la capsula;
- verifica firma, expiracion y dominio;
- muestra un diff legible;
- rechaza rutas no allowlisted;
- exige confirmacion del mantenedor;
- aplica en modo dry-run por defecto;
- ejecuta pruebas HTTP;
- produce un comprobante saneado;
- ofrece rollback.

No ejecutara shell arbitrario definido por el paquete.

### 6.2 GitHub App

La GitHub App se instalara solo en repositorios seleccionados y solicitara los permisos minimos para contenido y pull requests.

Modo v1:

- crear rama administrada;
- escribir solo rutas allowlisted;
- abrir Draft PR;
- adjuntar auditoria y plan de rollback;
- nunca hacer merge automatico;
- revocar el token de instalacion al finalizar.

### 6.3 WordPress

Se construira un plugin pequeno con capacidades explicitas:

- consultar estado Agent Friendly;
- previsualizar un paquete;
- escribir solo activos allowlisted;
- registrar backup;
- aplicar o revertir con permisos administrativos;
- exponer una Ability o endpoint REST con `permission_callback`.

La autenticacion externa usara un mecanismo revocable. Application Passwords podran ser fallback, pero no se guardaran en D1, logs, GitHub, prompts o analitica.

### 6.4 Cloudflare Bridge

El conector Cloudflare sera una segunda etapa. Podra usar un Worker instalado una vez por el responsable de la zona para servir rutas publicas concretas.

La politica interna permitira exclusivamente rutas aprobadas. El token Cloudflare se limitara por cuenta, zona, TTL e IP cuando el proveedor lo permita. Cambios de DNS, billing, Access, reglas generales o rutas fuera del conjunto requieren una aprobacion separada.

### 6.5 Extension de navegador

No sera conector primario. Una extension futura podra:

- mostrar la capsula dentro del panel del proveedor;
- guiar el upload manual;
- comprobar que la ruta final responde;
- generar evidencia local.

No extraera cookies, contrasenas, tokens ni contenido privado de otras pestanas.

### 6.6 SFTP, cPanel y otros proveedores

Se incorporaran solo con una capacidad tecnicamente restringible. El modo preferido sera un usuario chroot, directorio limitado o comando forzado. Si el proveedor solo ofrece acceso general, se usara paquete manual o un procedimiento supervisado.

## 7. Identidad, autorizacion y secretos

### 7.1 Identidad

La identidad de usuarios usara el sistema autenticado de la plataforma. Para conectores OAuth se aplicaran Authorization Code, PKCE S256, state, redirect URIs exactas, expiracion y revocacion.

### 7.2 Autorizacion

La decision se evalua sobre:

- actor;
- rol;
- dominio;
- entorno;
- conector;
- rutas;
- operacion;
- expiracion;
- consentimiento;
- riesgo;
- aprobaciones requeridas.

### 7.3 Secretless por defecto

El sistema no promete criptografia zero-knowledge cuando no es necesaria. El objetivo es que el modelo y la aplicacion principal no conozcan secretos.

Los conectores usaran tokens breves o un Secret Broker. D1 conservara aliases y metadata, nunca valores. Los logs excluiran Authorization, cookies, claves y cuerpos sensibles.

### 7.4 Auditoria

Cada evento guardara metadata:

- actor pseudonimizado;
- capsula;
- conector;
- rutas;
- hashes antes y despues;
- resultado;
- tiempo;
- aprobaciones;
- rollback;
- identificador de comprobante.

No se almacenaran secretos ni contenido privado no requerido.

## 8. Seguridad y abuso

La plataforma debe fallar cerrada ante:

- dominio no verificado;
- firma invalida;
- capsula expirada;
- path traversal;
- enlaces simbolicos fuera de raiz;
- rutas no autorizadas;
- hash inesperado;
- redireccion a host no allowlisted;
- cambio concurrente;
- respuesta de origen ambigua;
- falta de consentimiento;
- repeticion no idempotente;
- intento de incluir secretos;
- contenido ilegal o que suplante a terceros.

El Registry tendra controles de spam, rate limits, reportes de abuso y revision para perfiles sensibles. Las declaraciones del propietario no se promocionan automaticamente a hechos verificados.

## 9. Arquitectura Cloudflare

### 9.1 Componentes

- Workers: API, SSR, orquestacion y conectores.
- D1: expedientes, perfiles, estados, grants y auditoria metadata-only.
- R2: capsulas, archivos generados y comprobantes saneados.
- Queues o Workflows: auditorias y verificaciones asincronas.
- Cloudflare Access: superficies internas y administrativas.
- WAF y rate limiting: proteccion publica.
- AI Gateway: solo si se incorporan modelos con telemetria controlada.
- Secrets Store o Secret Broker: credenciales de conectores fuera del modelo.

### 9.2 Separacion de entornos

Se mantendran `development`, `staging` y `production` con bindings, bases y secretos diferentes. Los conectores mutantes no se habilitan en produccion por existir en staging.

## 10. Dominio y publicacion

### 10.1 Decision recomendada

El dominio principal recomendado es `agentfriendlyweb.ai`.

Motivos:

- coincide exactamente con la marca sin guiones;
- comunica la categoria del producto;
- es independiente de Tokenizart;
- permite construir reputacion y URLs canonicas propias;
- admite una oferta comercial global.

Se recomienda reservar tambien `agent-friendly-web.com` como dominio defensivo y redireccionarlo al principal.

La consulta RDAP del 2026-08-26 mostro:

- `agentfriendlyweb.com`: registrado;
- `agentfriendly.dev`: registrado;
- `agentfriendlyweb.ai`: sin registro observado;
- `agent-friendly-web.com`: sin registro observado;
- `agentfriendlyweb.org`: sin registro observado.

El estado RDAP no garantiza disponibilidad comercial hasta finalizar la compra.

### 10.2 Hosting

La produccion se alojara en Cloudflare. La URL actual `agent-friendly-web.tokenizart.chatgpt.site` se conservara temporalmente como preview y despues redireccionara al dominio canonico cuando el proveedor lo permita.

Estructura inicial:

- `https://agentfriendlyweb.ai/`: sitio publico, auditor y Registry;
- `https://agentfriendlyweb.ai/expediente`: expediente autenticado;
- `https://agentfriendlyweb.ai/api/`: API publica y privada separada por contratos;
- `https://agentfriendlyweb.ai/.well-known/`: descubrimiento real;
- `https://agentfriendlyweb.ai/docs/`: documentacion humana y agentica.

Un subdominio MCP se agregara solo cuando el servidor exista y haya superado sus gates.

### 10.3 Momento de compra

Conviene adquirir los dominios antes de publicar el Registry y los conectores. El registro y cualquier gasto requieren aprobacion de billing separada; esta especificacion no autoriza compras automaticamente.

## 11. Monetizacion

### 11.1 Oferta basica

- auditoria publica inicial;
- perfil publico declarativo;
- explicacion del nivel y siguientes pasos.

### 11.2 Servicios de pago unico

- curacion de contenido;
- generacion del paquete;
- schema y llms customizados;
- coordinacion con el mantenedor;
- publicacion asistida;
- migracion o recuperacion de control;
- configuracion inicial de conectores.

### 11.3 Servicios recurrentes opcionales

- monitoreo de disponibilidad;
- deteccion de deriva;
- auditorias programadas;
- actualizacion por cambios de standards o productos;
- alertas de crawlers y politicas;
- mantenimiento de perfiles y catalogos;
- soporte de conectores.

La recurrencia se cobra cuando existe trabajo, consumo o responsabilidad continua demostrable. No se cobra por conservar o consultar documentos ya entregados cuando no existe costo operativo.

### 11.4 Empresa y marca blanca

- multiples dominios;
- conectores privados;
- dashboards de cartera;
- SLA;
- exportaciones y API;
- marca blanca;
- integracion con agencias, estudios y proveedores de hosting.

### 11.5 Integridad comercial

La publicidad o posicion destacada no compra verificacion, puntaje ni recomendacion tecnica. Los conflictos de interes se identifican.

## 12. Skill de descubrimiento seguro

Se creara `agent-friendly-skill-discovery` como skill propia.

Funciones:

- buscar en `skills.sh` y repositorios declarados;
- usar `npx skills find` cuando corresponda;
- registrar URL, propietario, licencia, version, fecha e instalaciones;
- leer `SKILL.md` antes de instalar;
- buscar shell arbitrario, extraccion de secretos, instrucciones destructivas y dependencias opacas;
- clasificar confianza y aplicabilidad;
- presentar comando de instalacion;
- exigir aprobacion antes de instalar;
- mantener inventario y procedencia.

La popularidad no equivale a seguridad. Las skills comunitarias no se ejecutan en infraestructura productiva sin revision.

## 13. Modelo de datos inicial

Entidades:

- `organizations`;
- `sites`;
- `domain_claims`;
- `owner_attestations`;
- `maintainer_contacts`;
- `public_profiles`;
- `scan_observations`;
- `resource_declarations`;
- `publication_capsules`;
- `capsule_files`;
- `approvals`;
- `connector_installations`;
- `publication_jobs`;
- `verification_runs`;
- `rollback_events`;
- `audit_events`;
- `service_plans`.

Los perfiles publicos y expedientes privados no compartirán respuestas sin una proyeccion saneada.

## 14. API y contratos

Contratos previstos:

- `agentfriendly.public-profile.v1`;
- `agentfriendly.domain-claim.v1`;
- `agentfriendly.owner-attestation.v1`;
- `agentfriendly.publication-capsule.v1`;
- `agentfriendly.maintainer-approval.v1`;
- `agentfriendly.publication-result.v1`;
- `agentfriendly.verification-report.v1`;
- `agentfriendly.connector-capability.v1`.

Toda mutacion exige idempotencia, actor, consentimiento, scopes, auditoria y respuesta saneada.

## 15. Manejo de errores

Errores publicos seran comprensibles y no expondran infraestructura interna. El sistema distinguira:

- validacion de dominio pendiente;
- mantenedor pendiente;
- acceso insuficiente;
- conflicto de version;
- cambio fuera de alcance;
- proveedor no soportado;
- verificacion posterior fallida;
- rollback requerido;
- incidente de seguridad.

Ningun fallo convierte automaticamente una publicacion parcial en verificada.

## 16. Pruebas

### 16.1 Unitarias

- normalizacion de dominio;
- allowlist de rutas;
- hashes y firmas;
- expiracion y revocacion;
- transiciones de estado;
- idempotencia;
- proyeccion publica;
- sanitizacion de logs;
- clasificacion de skills.

### 16.2 Integracion

- DNS y HTTP challenge sinteticos;
- paquete CLI en sandbox;
- repositorio GitHub de prueba;
- WordPress de prueba;
- Worker de prueba;
- rollback por conector;
- reauditoria posterior.

### 16.3 Negativas

- propietario no verificado;
- mantenedor no aprobado;
- ruta adicional;
- firma alterada;
- hash inesperado;
- capsula vencida;
- repeticion;
- intento de secreto;
- SSRF y redirects;
- dominio homografo;
- contenido que suplanta a tercero.

### 16.4 Humanas

Se verificara que un propietario no tecnico comprenda:

- que se publicara;
- quien lo aprobo;
- que partes del sitio y de la infraestructura quedan fuera del alcance del puente;
- cuanto cuesta;
- como se revoca;
- como se vuelve atras;
- que significa declarado, observado y verificado.

## 17. Metricas de exito

- porcentaje de propietarios que completan el expediente;
- porcentaje que verifica dominio;
- tiempo hasta obtener respuesta del mantenedor;
- tiempo de generacion y publicacion;
- porcentaje de capsulas aplicadas sin intervencion adicional;
- cambios fuera de alcance: objetivo cero;
- rollbacks exitosos;
- mejora de puntuacion antes/despues;
- disponibilidad de archivos;
- recurrencia justificada por monitoreo;
- perfiles encontrados por personas y agentes;
- conversion de auditoria a servicio pago.

No se prometera una llegada automatica a 100% ni recomendacion por LLMs.

## 18. Roadmap de implementacion

### Bloque 1: Registry declarativo y dominio

- dominio propio;
- perfil publico versionado;
- formulario ampliado;
- verificacion de dominio sintetica;
- estados declarado/observado/verificado;
- caso Tokenizart.

### Bloque 2: Capsula y handoff manual

- contratos JSON;
- generador de capsula;
- diff y hashes;
- aprobacion owner/mantenedor;
- ZIP firmado;
- comprobacion y rollback manual.

### Bloque 3: CLI

- dry-run;
- verificacion de firma;
- adaptador filesystem seguro;
- comprobantes;
- rollback;
- distribucion publica.

### Bloque 4: GitHub App

- instalacion por repositorio;
- Draft PR;
- scopes minimos;
- webhook de estado;
- auditoria.

### Bloque 5: WordPress

- plugin;
- abilities;
- backups;
- publicacion y rollback;
- pruebas con proveedores reales.

### Bloque 6: Cloudflare Bridge

- Worker allowlisted;
- R2/D1/Queues;
- Secret Broker;
- subdominios delegados;
- monitoreo.

### Bloque 7: Monetizacion y escala

- checkout y planes;
- contratos de servicio;
- dashboards de cartera;
- marca blanca;
- API y MCP read-only del Registry;
- x402/MPP solo ante un servicio transaccional definido.

## 19. Fuera de alcance v1

- bypass de proveedor;
- apropiacion o migracion forzada de dominios;
- captura de cookies;
- almacenamiento de contrasenas;
- merge automatico;
- cambios arbitrarios en sitios;
- escritura de DNS o billing sin aprobacion separada;
- claims de certificacion oficial;
- acciones owner-scoped de Atelier;
- pagos entre agentes sin contrato especifico;
- publicar MCPs ficticios.

## 20. Fuentes tecnicas principales

- Cloudflare API token permissions: https://developers.cloudflare.com/fundamentals/api/reference/permissions/
- Cloudflare for SaaS: https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/
- Cloudflare delegated DCV: https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/
- GitHub App permissions: https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app
- WordPress REST authentication: https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/
- WordPress Abilities REST API: https://developer.wordpress.org/apis/abilities-api/rest-api-endpoints/
- OAuth 2.0 Security BCP: https://datatracker.ietf.org/doc/html/rfc9700
- Vercel Labs Skills CLI: https://github.com/vercel-labs/skills

## 21. Decision final de diseno

La primera version implementara Registry, expediente ampliado, verificacion de dominio, capsula de publicacion y handoff firmado. La publicacion automatica empezara por Draft PR y WordPress. Cloudflare Bridge quedara como segunda etapa mutante.

La plataforma empodera al propietario reduciendo dependencia, pero conserva doble consentimiento, menor privilegio, prueba posterior y rollback. Esa combinacion es el diferencial juridico, tecnico y comercial del producto.
