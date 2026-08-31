# Agent Friendly Web Integral I18n and Comic UI v1

**Fecha:** 2026-08-30

**Estado:** aprobado para implementacion

## Objetivo

Convertir toda la experiencia humana de Agent Friendly Web en una interfaz coherente en espanol, ingles y portugues, sin fragmentar la evidencia publica ni traducir identificadores tecnicos. La identidad visual comic aprobada sigue siendo el lenguaje comun de las tres versiones.

## Decisiones canonicas

- Espanol conserva las rutas actuales sin prefijo.
- Ingles usa `/en/*` y portugues `/pt/*`.
- No existe redireccion automatica por idioma del navegador.
- Cada pagina humana declara canonical, `hreflang` y una ruta equivalente cuando existe.
- APIs, schemas, MCP, CLI, OKF, IDs, hashes y codigos de estado conservan contratos estables.
- El contenido declarado por un owner se muestra como fue declarado. Las etiquetas de interfaz si se traducen.
- No se inventan traducciones de hechos, nombres propios, documentos, URLs o evidencia.

## Arquitectura

`lib/site-i18n.mjs` define locales, rutas canonicas y equivalencias. `lib/site-copy.mjs` contiene texto compartido y contenido publico estructurado. Los componentes cliente reciben `locale` o lo resuelven desde una ruta validada; nunca confian en un locale arbitrario.

Las paginas espanolas existentes siguen siendo las rutas canonicas. `app/[locale]/[[...slug]]/page.tsx` acepta exclusivamente `en` y `pt`, resuelve un slug allowlisted y renderiza la misma unidad funcional con el contenido correspondiente. Una ruta desconocida devuelve `notFound()` y nunca actua como proxy abierto.

## Navegacion y lenguaje visual

- El header conserva marca, tinta negra, papel calido y sepia restringido.
- Un selector compacto ES/EN/PT muestra el idioma actual y enlaza la pagina equivalente.
- El menu movil mantiene orden de foco, cierre explicito y texto legible.
- El footer traduce sus columnas y conserva enlaces machine-readable en su forma canonica.
- Los robots F0-F5, el archivo analogico, las pestanas, globos y cuerdas de latas se conservan.
- La tipografia comic se limita a titulos y rotulos; formularios, parrafos y datos usan una fuente estable.
- Toda animacion respeta `prefers-reduced-motion`.

## Cobertura funcional

La paridad ES/EN/PT incluye:

1. inicio, auditoria y mapa F0-F5;
2. metodologia, AEO/crawlers, sectores, evolucion y medicion;
3. asistente, guia, conocimiento abierto, CLI y MCP;
4. Registry, caso Tokenizart, verificacion externa y mapa del sitio;
5. acceso al expediente y revision de capsulas;
6. estados vacios, validaciones, errores, botones, ayudas y fechas visibles.

Los resultados tecnicos de auditoria conservan nombres de checks y valores estables cuando forman parte de un contrato. La explicacion humana que los rodea se localiza.

## SEO y descubrimiento

- El sitemap incluye las tres variantes HTML.
- Cada pagina publica incorpora alternates `es`, `en`, `pt` y `x-default`.
- JSON-LD declara `inLanguage` y URLs localizadas sin duplicar identidades.
- `llms.txt`, `llms-full.txt`, readiness y catalogos explican la disponibilidad multidioma.
- La negociacion Markdown del inicio acepta rutas localizadas sin alterar la variante espanola vigente.

## Seguridad

- El locale no modifica identidad, owner, permisos, consentimiento, scope, idempotencia ni auditoria.
- No se persiste automaticamente la preferencia de idioma.
- El selector no agrega query strings sensibles.
- Las rutas privadas siguen fallando cerradas sin identidad.
- Ningun cambio habilita GitHub, CMS, A2A, pagos o escritura sobre sitios objetivo.

## QA

- Tests unitarios de normalizacion y rutas equivalentes.
- Tests de navegacion, sitemap, metadata y ausencia de links muertos.
- Tests de cada componente interactivo en los tres idiomas.
- Suite completa, lint y build.
- QA Chromium en `1440x900` y `390x844` para ES/EN/PT.
- Cero overflow horizontal, superposicion, texto recortado, imagen vacia o error de consola.
- Verificacion de teclado, nombres accesibles y movimiento reducido.

## Entrega

La entrega se publica solo cuando la matriz de paridad no contiene rutas humanas parcialmente traducidas. Los endpoints tecnicos pueden conservar contenido ingles o codigos canonicos cuando esa estabilidad forma parte del contrato.

