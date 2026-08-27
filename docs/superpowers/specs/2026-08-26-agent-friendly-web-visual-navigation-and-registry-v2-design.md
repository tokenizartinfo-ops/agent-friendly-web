# Agent Friendly Web Visual, Navigation and Registry v2

Estado: diseno aprobado para especificacion tecnica

Fecha: 2026-08-26

Responsable: Gabriel Mucchiut

Origen canonico: `https://agentfriendlyweb.dev`

## 1. Objetivo

Agent Friendly Web debe demostrar en su propia experiencia lo que recomienda a terceros: una superficie clara para humanos, una estructura semantica para buscadores y agentes, y capacidades tecnicas publicadas solo cuando sean reales.

Este bloque mejora cuatro fronteras sin confundirlas:

1. experiencia visual y navegacion publica;
2. mapa del sitio humano y sitemap tecnico;
3. integridad de enlaces y controles;
4. persistencia privada del Registry mediante D1.

La entrega se divide en dos despliegues. El primero contiene solo cambios publicos, visuales y de navegacion. El segundo incorpora la migracion D1 y el formulario privado ampliado. Una falla o rollback del segundo no debe afectar el sitio publico ni el auditor read-only.

## 2. Direccion de diseno

### 2.1 Modelo elegido: observatorio operativo

La portada seguira abriendo con la herramienta de auditoria. No se convertira en una landing de marketing ni en un portal exclusivamente tecnico.

La composicion combinara:

- un area de diagnostico inmediata;
- evidencia y progreso visibles;
- una visualizacion de las capas agenticas;
- accesos claros al expediente, metodologia, casos y recursos;
- informacion tecnica secundaria que no abrume al propietario no tecnico.

La estetica conservara la identidad existente: verde profundo, blanco, lima y coral. Se agregara un azul funcional de baja presencia para distinguir infraestructura y recursos tecnicos. La tipografia seguira siendo Geist, con Geist Mono solo para URLs, codigos y estados tecnicos.

### 2.2 Principios visuales

- El auditor es la accion primaria de la primera pantalla.
- Los controles interactivos deben parecer interactivos; estados y etiquetas no deben parecer botones.
- Cada llamada a la accion debe tener un destino verificable.
- No se usaran paneles anidados ni decoracion sin funcion.
- Los bloques repetidos conservaran dimensiones estables para evitar saltos.
- El contenido tecnico se mostrara mediante divulgacion progresiva.
- El sitio debe funcionar en escritorio, tablet y movil sin texto cortado ni superposiciones.
- El contenido principal conservara ancho legible, mientras fondos, separadores y bandas ocuparan todo el viewport.

## 3. Arquitectura de informacion

### 3.1 Navegacion principal

El encabezado publico tendra seis destinos:

- `Auditar` -> `/#auditar`;
- `Evolucion` -> `/evolucion-agentica`;
- `Metodo` -> `/metodologia`;
- `Casos` -> `/casos/tokenizart` mientras exista un unico caso;
- `Mapa` -> `/mapa-del-sitio`;
- `Mi expediente` -> `/expediente`, tratado como accion primaria protegida.

El repositorio permanecera como enlace externo secundario. En movil, el menu identificara visualmente el acceso privado y cerrara al seleccionar una ruta.

### 3.2 Mapa del sitio humano

La nueva ruta `/mapa-del-sitio` sera una pagina publica y citable. Organizara los recursos en cuatro grupos:

1. **Para propietarios y equipos**: auditor, evolucion, metodologia, caso Tokenizart y expediente.
2. **Para agentes y buscadores**: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, OpenAPI, API Catalog, AI Catalog, skill index, readiness y `security.txt`.
3. **Capacidades activas**: scanner publico, expediente autenticado, demostrador y paquetes descargables.
4. **Roadmap**: Markdown negociado, Registry publico, verificacion de dominio, MCP, A2A, CLI y x402, cada uno con estado visible.

No se publicara como activa una capacidad futura. Los recursos tecnicos abriran el archivo real correspondiente.

### 3.3 Sitemap tecnico

`app/sitemap.ts` incluira solo URLs HTML publicas, canonicas e indexables:

- `/`;
- `/metodologia`;
- `/evolucion-agentica`;
- `/casos/tokenizart`;
- `/mapa-del-sitio`.

`/expediente`, rutas de autenticacion, APIs y archivos `/.well-known` no se agregaran al sitemap HTML. Los recursos agenticos se descubriran por `robots.txt`, Link headers, `llms.txt`, catalogos y el mapa humano.

## 4. Portada y componentes

### 4.1 Encabezado

El encabezado se simplificara para mejorar lectura y espacio. La marca seguira siendo una senal de primer viewport. La accion `Mi expediente` tendra estilo de boton; los demas destinos seran enlaces de navegacion.

### 4.2 Auditor

El formulario conservara una sola entrada URL y un boton `Auditar`. Al iniciar desde `/?site=<hostname>#auditar`, el campo tomara el dominio de la URL de forma saneada y sin ejecutar automaticamente la auditoria.

El resultado mostrara:

- puntaje y nivel;
- siete categorias con estado y valor;
- evidencia tecnica en una vista expandible;
- siguiente accion recomendada;
- enlace a la metodologia del puntaje.

Mientras no exista resultado, el panel mostrara el caso verificado de Agent Friendly Web como referencia real y no un guion vacio.

### 4.3 Visualizacion de madurez

La portada incorporara un mapa compacto de AF-0 a AF-5. No sera un conjunto de botones sin destino: cada etapa enlazara al demostrador en `/evolucion-agentica` con parametros allowlisted de escenario y etapa, o se presentara como una escala no interactiva con un unico CTA inequivoco.

### 4.4 Pie de pagina

El pie se convertira en un indice compacto con:

- producto;
- metodologia y casos;
- recursos agenticos;
- seguridad, autoria y repositorio;
- acceso al mapa completo.

No duplicara el encabezado y conservara texto de atribucion a Gabriel Mucchiut y Tokenizart.

## 5. Integridad de acciones y enlaces

Se implementara un inventario automatico de rutas publicas y destinos. Las reglas son:

- todo `<a>` o `Link` debe tener `href` valido;
- todo `<button>` debe ejecutar una accion local observable, enviar un formulario o controlar un estado con etiqueta accesible;
- chips, estados y badges no pueden usar apariencia primaria de boton;
- descargas deben responder HTTP 200 y mantener nombre/extension coherentes;
- `/expediente` debe redirigir a autenticacion y se considera saludable;
- enlaces externos deben usar `rel="noreferrer"` y, cuando abran otra pestana, indicarlo visualmente;
- ningun CTA puede apuntar a una capacidad futura inexistente.

La auditoria automatica verificara las rutas internas publicas, archivos descargables y anchors principales. Los enlaces externos se comprobaran sin convertir su disponibilidad en requisito de build.

## 6. Formatos agenticos

### 6.1 Activos en produccion

La pagina y el mapa deben hacer descubribles los activos ya desplegados:

- HTML semantico y JSON-LD;
- `robots.txt` con Content Signals y politicas por crawler;
- `sitemap.xml`;
- `llms.txt` y `llms-full.txt`;
- OpenAPI y API Catalog;
- AI Catalog;
- skill publica;
- manifiesto de readiness;
- `security.txt`;
- Link headers.

### 6.2 Siguiente capacidad de lectura

Markdown for Agents seguira marcado como pendiente hasta que `Accept: text/markdown` devuelva realmente `Content-Type: text/markdown`. La activacion Cloudflare sera un gate separado porque depende del plan, configuracion de zona y politica `Content-Signal` del origen.

### 6.3 Herramientas futuras

MCP, A2A, WebMCP, CLI y x402 se mostraran en el roadmap con uno de estos estados:

- `research`;
- `planned`;
- `release_candidate`;
- `deployed`;
- `verified`.

Solo `deployed` y `verified` pueden enlazar una herramienta ejecutable. Los demas estados enlazaran documentacion o no tendran CTA de ejecucion.

## 7. Registry privado y D1

### 7.1 Frontera de autenticacion

La persistencia privada queda bajo `/expediente` y `/api/projects`. La identidad tecnica es `oai-authenticated-user-id`; el email es un dato de presentacion y no un limite de autorizacion.

### 7.2 Datos

La migracion D1 agregara:

- campos ampliados del intake a `site_projects`;
- `registry_sites`;
- `domain_claims`;
- `owner_attestations`;
- `public_profiles`;
- `scan_observations`.

Las listas se conservaran como JSON saneado. No se almacenaran contrasenas, cookies, API keys, tokens, secretos, datos de pago ni credenciales de hosting.

### 7.3 Comportamiento del formulario

El formulario mostrara doce decisiones progresivas en lenguaje simple. El guardado sera automatico e idempotente. La barra lateral indicara progreso, proxima pregunta y estado de guardado.

El proyecto no llegara a 100% mientras falten las cuatro decisiones de publicacion. La proyeccion publica excluira emails operativos, mantenedores, aprobadores y notas libres.

### 7.4 Migracion y rollback

- generar migracion con Drizzle;
- inspeccionar SQL antes de aplicarlo;
- probar contra D1 local;
- desplegar codigo compatible con columnas nuevas;
- aplicar migracion remota en una ventana separada;
- verificar lectura y escritura owner-scoped;
- conservar rollback de codigo y backup/export previo de datos.

La migracion remota y el despliegue del formulario persistente requieren una aprobacion especifica posterior. El despliegue visual no los autoriza.

## 8. Seguridad y privacidad

- El scanner publico sigue siendo read-only y no persiste por defecto.
- El mapa no lista usuarios, expedientes ni dominios privados.
- Los endpoints privados fallan cerrados sin identidad.
- Toda consulta D1 se filtra por usuario autenticado.
- No se incluyen datos privados en logs, analitica, HTML publico, manifests o RAG.
- La verificacion futura de dominio sera observacional; este bloque no escribe DNS ni archivos de terceros.
- El Registry publico futuro exigira dominio verificado y confirmacion separada de publicacion.

## 9. Accesibilidad y responsive

- contraste suficiente para texto y estados;
- foco visible en enlaces, botones, inputs y selectores;
- orden de tabulacion coherente;
- controles con nombre accesible y `aria-pressed` cuando corresponda;
- targets tactiles de al menos 42 px;
- reduccion de movimiento mediante `prefers-reduced-motion`;
- headings jerarquicos y landmarks semanticos;
- 360 px, 768 px, 1280 px y 1440 px como viewports de QA;
- sin scroll horizontal ni texto superpuesto.

## 10. Pruebas y aceptacion

### 10.1 Publico y visual

- tests de origen canonico y activos agenticos;
- test de inventario de navegacion y sitemap;
- smoke HTTP de cada ruta publica y descarga;
- verificacion de redireccion protegida de `/expediente`;
- screenshot QA de portada, mapa, evolucion y caso Tokenizart en escritorio y movil;
- consola sin errores;
- auditor de `agentfriendlyweb.dev` manteniendo al menos 70/100 AF-3.

### 10.2 Registry D1

- prueba roja antes de cada cambio de esquema o comportamiento;
- migracion generada e inspeccionada;
- aislamiento entre dos usuarios sinteticos;
- rechazo de campos sensibles;
- persistencia de las doce decisiones;
- proyeccion publica sin contactos ni notas privadas;
- `npm test`, `npm run lint` y `npm run build` verdes.

## 11. Secuencia de entrega

1. Implementar navegacion, portada, mapa humano, sitemap tecnico e integridad de enlaces.
2. Validar visualmente y publicar la version publica.
3. Implementar y probar localmente el modelo D1.
4. Presentar migracion, backup y rollback para aprobacion.
5. Aplicar la migracion autorizada y publicar el formulario privado ampliado.
6. Medir nuevamente Agent Friendly Web y registrar la evidencia.

## 12. Fuera de alcance

- MCP productivo;
- A2A productivo;
- WebMCP productivo;
- CLI mutante;
- x402 o cobros;
- publicacion automatica sobre sitios de terceros;
- cambios DNS;
- owner data de Tokenizart/Atelier;
- certificacion oficial o promesa de indexacion/recomendacion.

Estos componentes permanecen en el roadmap y tendran especificaciones y gates propios.
