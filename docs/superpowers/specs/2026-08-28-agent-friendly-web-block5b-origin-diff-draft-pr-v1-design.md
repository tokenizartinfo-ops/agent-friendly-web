# Agent Friendly Web Block 5B: Origin Diff and Draft PR Plan v1

**Fecha:** 2026-08-28

**Estado:** especificacion para revision humana

**Dependencia:** Block 5A desplegado y verificado

## 1. Objetivo

Block 5B convierte una capsula manual en una propuesta tecnica verificable. Lee unicamente archivos publicos del dominio ya verificado, compara esos bytes con la version generada y prepara un plan de Draft PR revisable. No modifica el sitio, no usa credenciales, no crea un pull request remoto y no hace merge en su primer release.

El bloque responde tres preguntas humanas:

1. Que existe hoy en el sitio?
2. Que cambiaria exactamente?
3. Que archivos y controles tendria un futuro Draft PR?

## 2. Clasificacion y alternativas

Este trabajo es arquitectonico porque agrega una frontera de red, persistencia privada, contratos de comparacion y un futuro adaptador GitHub.

### Alternativa A: diff solo en el navegador

El navegador descargaria el origen y calcularia diferencias localmente. Es simple, pero debilita SSRF, auditoria, reproducibilidad y vinculacion con el hash de la capsula.

### Alternativa B: lectura server-side acotada y plan de PR determinista

Es la opcion recomendada. El servidor reutiliza la proteccion de red publica existente, liga la comparacion al manifiesto, conserva evidencia metadata-only y prepara un plan de PR sin ejecutar escrituras remotas.

### Alternativa C: GitHub App y Draft PR real inmediatamente

Reduce pasos manuales, pero introduce instalacion, permisos de repositorio, tokens temporales, webhooks y una mutacion externa antes de validar el diff con usuarios. Queda diferida.

## 3. Decision

Implementar la alternativa B en dos gates:

- **5B.1:** comparacion read-only contra el origen y plan descargable de Draft PR;
- **5B.2:** interfaz de adaptador GitHub probada con proveedor simulado y flag remoto deshabilitado.

Crear un Draft PR real requerira una aprobacion posterior, una GitHub App instalada en un repositorio seleccionado y un token corto obtenido fuera del modelo. No forma parte del release inicial de 5B.

## 4. Alcance 5B.1

### 4.1 Lectura permitida

Solo se consultan rutas ya incluidas en una capsula vigente y ligadas al hostname verificado:

- `/llms.txt`;
- `/llms-full.txt`;
- `/robots.txt`;
- `/sitemap.xml`;
- `/` para observar JSON-LD existente.

La lectura exige HTTPS, DNS publico, ausencia de credenciales en URL, puerto estandar, redirects manuales, timeout de ocho segundos y limite de 250.000 bytes. Se reutiliza `fetchLimitedPublicUrl`; no se agrega un fetch alternativo.

### 4.2 Resultados por archivo

Cada recurso queda en uno de estos estados:

- `missing`: el origen responde 404 o 410 y la propuesta crearia un archivo;
- `unchanged`: los bytes normalizados coinciden;
- `changed`: existe contenido comparable y hay diferencias;
- `manual_review_required`: la operacion es `manual_merge` o `manual_embed`;
- `unavailable`: timeout, error de red, media type incompatible o respuesta truncada;
- `blocked`: hostname, ruta, tamano o contenido fallan una regla de seguridad.

Un error parcial no invalida los demas recursos, pero impide declarar la comparacion completa.

### 4.3 Diff

El diff sera lineal, determinista y orientado a texto:

- normaliza CRLF a LF solo para comparar;
- conserva hashes de los bytes originales y propuestos;
- limita lineas, longitud por linea y tamano total del diff;
- escapa contenido al renderizarlo;
- distingue contexto, agregado y eliminado;
- nunca interpreta HTML ni ejecuta scripts;
- falla cerrado si detecta un secreto probable en el contenido recuperado o propuesto.

`robots.txt`, `sitemap.xml` y JSON-LD no se presentan como reemplazos automaticos. Su diff se etiqueta como propuesta de integracion manual.

## 5. Plan de Draft PR

El owner podra indicar metadata privada, nunca credenciales:

- proveedor `github`;
- repositorio `owner/name`;
- rama base declarada;
- mapeo de cada recurso directo a una ruta POSIX relativa;
- responsable humano de revision.

Reglas de rutas:

- no se admiten rutas absolutas, `..`, barras invertidas ni bytes de control;
- `llms.txt` y `llms-full.txt` pueden mapearse a rutas directas;
- propuestas `manual_merge` y `manual_embed` se guardan bajo `.agentfriendly/proposals/`;
- no se modifica workflow, configuracion de CI, dependencias, secretos, DNS ni archivos fuera de la allowlist;
- el plan nunca contiene token, cookie, password, private key o valor de Secret Broker.

El plan genera:

- nombre de rama `agentfriendly/capsule-<ref>-v<version>`;
- titulo y cuerpo del Draft PR;
- archivos propuestos con hashes;
- pruebas HTTP posteriores;
- instrucciones de rollback;
- estado `prepared_not_submitted`;
- motivo explicito de que merge y publicacion siguen bloqueados.

## 6. Contratos

### 6.1 Origin comparison

`agentfriendly.origin-comparison.v1` incluye:

- referencia opaca de proyecto y capsula;
- hash del manifiesto;
- origen y fecha de observacion;
- resultado por recurso;
- hashes anterior/propuesto;
- diff acotado;
- estado agregado;
- limites y errores saneados.

### 6.2 Draft PR plan

`agentfriendly.draft-pr-plan.v1` incluye:

- referencia a capsula y comparacion;
- repositorio y rama base declarados;
- rama propuesta;
- lista allowlisted de operaciones;
- cuerpo del Draft PR;
- pruebas y rollback;
- `remote_submission: false`;
- `merge_allowed: false`.

Ambos schemas se publican para descubrimiento, pero la informacion de proyectos reales permanece privada.

## 7. Persistencia D1

Se agregan tablas aditivas:

### `capsule_origin_comparisons`

- IDs de comparacion, capsula, proyecto y actor;
- hash del manifiesto;
- origen observado;
- contrato y estado;
- JSON privado acotado;
- idempotency key;
- fechas de creacion y expiracion.

### `draft_pr_plans`

- IDs de plan, capsula, comparacion y proyecto;
- proveedor y repositorio declarado;
- rama base y rama propuesta;
- contrato, estado y JSON privado;
- idempotency key;
- fechas de creacion y actualizacion.

No se guardan tokens, credenciales, bodies HTTP crudos fuera del diff aprobado, emails en auditoria ni respuestas completas de proveedor.

## 8. API privada

- `GET /api/projects/:projectId/deployment-capsules/:capsuleId/comparison`
- `POST /api/projects/:projectId/deployment-capsules/:capsuleId/comparison`
- `GET /api/projects/:projectId/deployment-capsules/:capsuleId/draft-pr-plan`
- `POST /api/projects/:projectId/deployment-capsules/:capsuleId/draft-pr-plan`

Todas las rutas:

- exigen identidad;
- derivan rol en servidor;
- ocultan proyectos ajenos con 404;
- ligan operaciones al hash del manifiesto;
- exigen idempotencia;
- usan `cache-control: no-store`;
- registran eventos metadata-only.

La comparacion puede ejecutarse antes de aprobar para que owner y mantenedor vean el cambio. El plan se prepara solo con comparacion completa. La futura llamada remota exigira ademas todas las aprobaciones requeridas y un gate separado.

## 9. Interfaz humana

La pagina de capsula incorpora tres secciones progresivas:

1. **Comparar con el sitio actual:** explica que la lectura es publica y no modifica nada.
2. **Revisar diferencias:** muestra un archivo por vez, estado, hashes y diff con colores accesibles.
3. **Preparar borrador tecnico:** solicita repositorio, rama y rutas; genera un plan descargable marcado `No enviado`.

Los botones no diran `Publicar` ni `Crear PR` en 5B.1. El CTA sera `Preparar borrador tecnico` para no prometer una accion remota inexistente.

## 10. Adaptador 5B.2

Se define una interfaz interna `DraftPrProvider` con dos implementaciones:

- `DryRunDraftPrProvider`: devuelve la solicitud saneada y no hace red;
- `GitHubDraftPrProvider`: contrato y tests con cliente simulado, deshabilitado por flag.

El proveedor futuro solo podra:

- crear una rama administrada;
- escribir las rutas exactas del plan;
- abrir un PR en estado draft;
- devolver IDs, URL y estado saneados.

No podra hacer merge, cambiar settings, administrar colaboradores, leer secretos, modificar workflows ni escribir fuera de la allowlist. El token de instalacion sera corto, repo-scoped y nunca llegara al modelo, D1, logs o browser.

## 11. Auditoria y estados

Eventos permitidos:

- `capsule_origin_comparison_created`;
- `capsule_origin_comparison_failed`;
- `draft_pr_plan_created`;
- `draft_pr_plan_downloaded`.

Payloads: IDs, hashes, conteos, estados y timestamps. Sin contenido, emails, tokens ni errores crudos.

Estados del plan:

- `prepared_not_submitted`;
- `stale` si cambia o vence la capsula;
- `blocked` ante comparacion incompleta o aprobacion incompatible;
- `submitted_as_draft` reservado para un gate futuro;
- `cancelled`.

## 12. Pruebas y criterios de aceptacion

1. SSRF: bloquea IPs privadas, redirects, puertos, credenciales y DNS no publico.
2. Aislamiento: otro usuario no descubre proyecto, comparacion o plan.
3. Integridad: hashes y diff se ligan al manifiesto correcto.
4. Limites: timeout, truncado, media type y tamano fallan cerrados.
5. Idempotencia: repetir la misma solicitud no crea filas ni planes duplicados.
6. Operaciones manuales: robots, sitemap y JSON-LD nunca se clasifican como reemplazo directo.
7. Secret scanning: contenido sospechoso no se persiste ni se refleja.
8. UI: estados, diff y CTA son legibles en desktop y movil.
9. Provider: el mock prueba rama, archivos y Draft PR; merge y rutas no allowlisted son imposibles.
10. Regresion: suite completa, lint, build, migracion D1 local y pruebas negativas.

## 13. Gates de release

### Gate A: local

Tests, D1 aislada, origen sintetico publico, fallos parciales, diff visual y provider simulado.

### Gate B: Sites

Aprobacion separada para migracion D1 remota y release de 5B con `remote_submission=false`.

### Gate C: GitHub real

Aprobacion separada, GitHub App instalada, repositorio seleccionado, permisos minimos, Secret Broker, PR draft y rollback documentado. No merge.

### Gate D: Block 5C

Primera escritura sobre un sitio o CMS de prueba. Requiere otra aprobacion y no se deriva del Gate C.

## 14. Fuera de alcance

- CMS, WordPress, SFTP, cPanel o Cloudflare Bridge;
- escribir en sitios o DNS;
- merge automatico;
- GitHub PAT pegado por el usuario;
- repositorios privados sin instalacion autorizada;
- A2A publico;
- CLI mutante;
- pagos;
- acciones Tokenizart o Atelier.

## 15. Resultado esperado

Al cerrar 5B, una persona no tecnica podra ver que cambia y descargar un borrador tecnico reproducible para su mantenedor. Agent Friendly Web habra validado el contrato y el adaptador sin adquirir control general del sitio ni convertir una autorizacion de revision en una autorizacion de publicacion.
