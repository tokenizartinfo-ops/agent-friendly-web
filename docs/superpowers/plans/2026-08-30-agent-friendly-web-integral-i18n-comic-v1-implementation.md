# Agent Friendly Web Integral I18n and Comic UI v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar toda la interfaz humana de Agent Friendly Web con paridad funcional en espanol, ingles y portugues, preservando la identidad comic y los limites de seguridad.

**Architecture:** Un catalogo allowlisted relaciona locales y rutas; diccionarios estructurados alimentan componentes compartidos y una ruta localizada cerrada renderiza solo paginas conocidas. Los contratos machine-readable mantienen identificadores estables y las superficies privadas conservan identidad y permisos independientes del idioma.

**Tech Stack:** Next 16 App Router, React 19, Vinext, TypeScript, Node test runner, Lucide, CSS existente y Sites/Cloudflare.

**Spec:** `docs/superpowers/specs/2026-08-30-agent-friendly-web-integral-i18n-comic-v1-design.md`

## Global Constraints

- Espanol conserva rutas sin prefijo; ingles usa `/en/*`; portugues usa `/pt/*`.
- No redirigir automaticamente por `Accept-Language`.
- No traducir IDs, hashes, schemas, nombres de tools, estados contractuales ni texto declarado por owners.
- El locale nunca modifica identidad, permisos, consentimiento, scopes ni auditoria.
- Mantener la estetica comic aprobada y `prefers-reduced-motion`.
- No habilitar GitHub, CMS, A2A, pagos ni escritura externa.

---

### Task 1: Catalogo de locales y rutas

**Files:**
- Create: `lib/site-i18n.mjs`
- Create: `test/site-i18n.test.mjs`

**Interfaces:**
- Produces: `LOCALES`, `DEFAULT_LOCALE`, `normalizeLocale(value)`, `localizedPath(routeKey, locale)`, `resolveLocalizedRoute(locale, segments)` y `languageAlternates(routeKey)`.

- [ ] Escribir tests que exijan locales `es|en|pt`, rutas equivalentes, `x-default`, rechazo de locale/slug desconocido y conservacion de fragmentos seguros.
- [ ] Ejecutar `node --test test/site-i18n.test.mjs` y observar fallo por modulo ausente.
- [ ] Implementar catalogo cerrado para todas las rutas humanas y funciones puras de resolucion.
- [ ] Repetir el test y comprobar PASS.
- [ ] Commit: `feat:i18n-add-route-catalog`.

### Task 2: Diccionarios compartidos y shell comic

**Files:**
- Create: `lib/site-copy.mjs`
- Modify: `app/components/site-header.tsx`
- Modify: `app/components/site-footer.tsx`
- Modify: `app/globals.css`
- Test: `test/site-shell-i18n.test.mjs`

**Interfaces:**
- Consumes: `localizedPath` y `normalizeLocale`.
- Produces: `SHARED_COPY`, `SiteHeader({ locale, routeKey })` y `SiteFooter({ locale })`.

- [ ] Escribir tests para labels ES/EN/PT, selector con tres links reales, `aria-current`, menu accesible y recursos agenticos canonicos.
- [ ] Ejecutar el test y observar que los componentes actuales no aceptan locale.
- [ ] Implementar diccionarios, selector, enlaces localizados y estilos estables desktop/mobile.
- [ ] Repetir tests y comprobar PASS.
- [ ] Commit: `feat:i18n-localize-comic-shell`.

### Task 3: Inicio, auditoria y madurez F0-F5

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/components/scan-workspace.tsx`
- Modify: `app/components/maturity-map.tsx`
- Modify: `app/components/maturity-demonstrator.tsx`
- Test: `test/home-i18n.test.mjs`

**Interfaces:**
- Produces: `HomeExperience({ locale, initialSite })` con la misma auditoria read-only para tres idiomas.

- [ ] Escribir tests de portada, formulario, errores, robots F0-F5 y CTA en los tres idiomas.
- [ ] Ejecutar el test y observar fallo por props/diccionarios ausentes.
- [ ] Extraer `HomeExperience`, localizar textos y conservar el registro WebMCP sin variacion funcional.
- [ ] Repetir tests y comprobar PASS.
- [ ] Commit: `feat:i18n-localize-home-and-maturity`.

### Task 4: Paginas publicas informativas

**Files:**
- Create: `app/components/localized-public-page.tsx`
- Create: `lib/public-page-copy.mjs`
- Modify: paginas de metodologia, AEO, evolucion, conocimiento, CLI, MCP, verificacion externa, Tokenizart y mapa.
- Test: `test/public-pages-i18n.test.mjs`

**Interfaces:**
- Produces: `PUBLIC_PAGE_COPY` y componentes con `locale` para cada pagina informativa.

- [ ] Escribir matriz de tests que exija contenido no vacio, CTA real, limites y fuentes en 27 combinaciones pagina/idioma.
- [ ] Ejecutar tests y observar ausencia de variantes EN/PT.
- [ ] Estructurar y traducir todo el contenido visible, preservando links y claims.
- [ ] Repetir tests y comprobar PASS.
- [ ] Commit: `feat:i18n-localize-public-knowledge-pages`.

### Task 5: Herramientas interactivas publicas

**Files:**
- Modify: `app/components/readiness-comparison.tsx`
- Modify: `app/components/intake-assistant-prototype.tsx`
- Modify: `app/components/public-guide-chat.tsx`
- Modify: `lib/public-guide.mjs`
- Modify: paginas de medicion, asistente y guia.
- Test: `test/public-tools-i18n.test.mjs`

**Interfaces:**
- Produces: herramientas con UI localizada y contratos/acciones sin cambios.

- [ ] Escribir tests de labels, errores, continuaciones y limites ES/EN/PT.
- [ ] Ejecutar y observar fallo por ausencia de locale.
- [ ] Localizar UI y respuestas deterministas sin agregar persistencia ni llamadas externas.
- [ ] Repetir tests y comprobar PASS.
- [ ] Commit: `feat:i18n-localize-public-tools`.

### Task 6: Registry y superficies privadas

**Files:**
- Modify: `app/registry/page.tsx`
- Modify: `app/registry/[slug]/page.tsx`
- Modify: `app/components/intake-workspace.tsx`
- Modify: `app/components/capsule-review.tsx`
- Modify: `app/expediente/page.tsx`
- Modify: `app/capsula/[projectId]/page.tsx`
- Test: `test/private-and-registry-i18n.test.mjs`

**Interfaces:**
- Produces: labels localizados; payloads, roles, estados y eventos D1 sin alteracion.

- [ ] Escribir tests de busqueda, formularios, fechas, estados y negativas de identidad en tres idiomas.
- [ ] Ejecutar y observar fallo por textos espanoles fijos.
- [ ] Inyectar diccionarios y formateadores por locale sin cambiar schemas ni handlers API.
- [ ] Repetir tests y comprobar PASS.
- [ ] Commit: `feat:i18n-localize-registry-and-private-ui`.

### Task 7: Router localizado, metadata y sitemap

**Files:**
- Create: `app/[locale]/[[...slug]]/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/index.md/route.ts`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Modify: `public/.well-known/agent-readiness.json`
- Test: `test/localized-routing-and-discovery.test.mjs`

**Interfaces:**
- Consumes: catalogo y experiencias localizadas.
- Produces: rutas EN/PT allowlisted, alternates y descubrimiento sincronizado.

- [ ] Escribir tests de cada URL, `notFound`, canonical, hreflang, sitemap y JSON-LD.
- [ ] Ejecutar y observar fallo por ruta localizada ausente.
- [ ] Implementar router cerrado, metadata localizada y catalogos actualizados.
- [ ] Repetir tests y comprobar PASS.
- [ ] Commit: `feat:i18n-publish-localized-routing`.

### Task 8: Verificacion integral y release candidate

**Files:**
- Create: `docs/INTEGRAL-I18N-COMIC-LOCAL-GATE-2026-08-30.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

**Interfaces:**
- Produces: recibo de QA y gate remoto separado.

- [ ] Ejecutar `npm test`, `npm run lint` y `npm run build`.
- [ ] Recorrer ES/EN/PT en Chromium a `1440x900` y `390x844`.
- [ ] Verificar teclado, reduced motion, consola, overflow, links y rutas privadas fail-closed.
- [ ] Registrar resultados, limitaciones y rollback sin declarar deployment.
- [ ] Commit: `docs:i18n-close-local-comic-gate`.
