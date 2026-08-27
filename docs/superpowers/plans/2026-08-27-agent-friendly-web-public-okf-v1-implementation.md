# Agent Friendly Web Public OKF v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar un bundle OKF v0.2 determinista, verificable y read-only sobre la metodologia y las capacidades publicas de Agent Friendly Web, junto con una pagina humana y enlaces de descubrimiento.

**Architecture:** Un manifiesto JSON allowlisted define release, fuentes, secciones y metadata de once conceptos. Un modulo ESM puro extrae secciones Markdown, renderiza frontmatter OKF, genera inventario y SHA-256, y valida estructura, privacidad, links e integridad. Dos scripts CLI usan ese modulo; Next.js solo sirve los artefactos estaticos y una pagina explicativa. No intervienen D1, autenticacion, modelos, MCP, A2A, WebMCP, pagos ni escritura remota.

**Tech Stack:** Node.js 22 ESM, `node:test`, `yaml`, Next.js/vinext, TypeScript, React 19, lucide-react, Cloudflare Sites.

**Spec:** `docs/superpowers/specs/2026-08-27-agent-friendly-web-okf-public-v1-design.md`

## Global Constraints

- Solo leer las fuentes publicas incluidas en `config/okf-public-sources.v1.json`.
- Generar `public/okf/v0.2/` de forma reproducible desde fechas versionadas; no usar la hora del sistema.
- No leer ni escribir D1, expedientes, observaciones privadas, autenticacion o datos owner.
- No afirmar que OKF es un mecanismo universal de descubrimiento ni que MCP, A2A, CLI o pagos estan desplegados.
- Documentacion bajo CC BY 4.0; marcas y nombres reservados.
- Todo cambio de comportamiento empieza con una prueba que falla por la ausencia de ese comportamiento.

---

### Task 1: Contract test and allowlisted source manifest

**Files:**
- Create: `test/okf-public-distribution.test.mjs`
- Create: `config/okf-public-sources.v1.json`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] Add `yaml` as an exact dev dependency and add `generate:okf` and `validate:okf` package scripts pointing to the future CLI files.
- [ ] Write a failing test that loads the manifest and requires release `0.2`, canonical origin, CC BY 4.0, `human:gabriel-mucchiut`, an absolute `stale_after`, and exactly the eleven output paths approved by the spec.
- [ ] Run `node --test test/okf-public-distribution.test.mjs` and confirm RED because the manifest is absent.
- [ ] Create the minimal manifest with release metadata, explicit source paths, exact section selectors, concept metadata and public canonical resources.
- [ ] Re-run the focused test and confirm GREEN.
- [ ] Commit: `test(okf): define public source contract`

### Task 2: Deterministic generator and validator

**Files:**
- Create: `lib/okf-public.mjs`
- Create: `scripts/generate-okf-public.mjs`
- Create: `scripts/validate-okf-public.mjs`
- Modify: `test/okf-public-distribution.test.mjs`

- [ ] Add failing unit tests for exact heading extraction, missing selector failure, deterministic YAML rendering, HTTPS-only canonical resources, private path and probable-secret rejection, bundle-relative link containment, checksum verification and reserved `index.md`/`log.md` metadata.
- [ ] Run the focused test and confirm RED because the module does not exist.
- [ ] Implement pure helpers to load and validate the manifest, parse Markdown heading boundaries, render OKF documents with `yaml`, scan public output, calculate sorted SHA-256 entries and validate a generated directory.
- [ ] Implement thin generator and validator CLI wrappers with non-zero exit status on any violation.
- [ ] Re-run the focused test and confirm GREEN, then refactor without changing behavior.
- [ ] Commit: `feat(okf): add deterministic generator and validator`

### Task 3: Generate and lock the public OKF bundle

**Files:**
- Create: `public/okf/v0.2/index.md`
- Create: `public/okf/v0.2/log.md`
- Create: `public/okf/v0.2/manifest.json`
- Create: `public/okf/v0.2/CHECKSUMS.sha256`
- Create: `public/okf/v0.2/method/*.md`
- Create: `public/okf/v0.2/discovery/*.md`
- Create: `public/okf/v0.2/registry/*.md`
- Create: `public/okf/v0.2/assistance/*.md`
- Create: `public/okf/v0.2/cases/*.md`
- Modify: `test/okf-public-distribution.test.mjs`

- [ ] Add failing integration assertions that all expected files exist, every OKF Markdown document parses, `index.md` declares `okf_version: "0.2"`, the manifest inventory matches disk and all checksums validate.
- [ ] Run the focused test and confirm RED because the bundle is absent.
- [ ] Run `npm run generate:okf` to create only the approved bundle paths.
- [ ] Run `npm run validate:okf` and the focused test; confirm GREEN.
- [ ] Run the generator a second time and assert `git diff --exit-code -- public/okf/v0.2` to prove reproducibility.
- [ ] Commit: `feat(okf): publish versioned public bundle`

### Task 4: Human open-knowledge experience

**Files:**
- Create: `app/conocimiento-abierto/page.tsx`
- Modify: `app/globals.css`
- Modify: `test/site-navigation.test.mjs`
- Modify: `test/okf-public-distribution.test.mjs`

- [ ] Add failing tests requiring the human route, visible version/status/license/limits, links to index, manifest and checksums, and no claim of certification, API or MCP.
- [ ] Run focused tests and confirm RED because the page and links do not exist.
- [ ] Build a responsive unframed page consistent with the current Agent Friendly Web design: release summary, knowledge domains, verification sequence, download links, license/mark boundary and Tokenizart reference.
- [ ] Add scoped responsive CSS with stable grids, restrained cards and no decorative nesting.
- [ ] Re-run focused tests and confirm GREEN.
- [ ] Commit: `feat(okf): add open knowledge experience`

### Task 5: Public discovery surfaces

**Files:**
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Modify: `public/.well-known/ai-catalog.json`
- Modify: `public/.well-known/agent-readiness.json`
- Modify: `app/components/site-footer.tsx`
- Modify: `app/mapa-del-sitio/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `test/agent-discovery.test.mjs`
- Modify: `test/site-navigation.test.mjs`
- Modify: `test/okf-public-distribution.test.mjs`

- [ ] Add failing tests requiring discovery from all approved human and machine surfaces, correct `deployed` readiness status, and explicit wording that AI Catalog discovery is a project convention rather than an OKF standard.
- [ ] Run focused tests and confirm RED against the current discovery files.
- [ ] Add the human page and bundle entry points to all approved surfaces without adding `/.well-known/okf.json`.
- [ ] Re-run focused tests and confirm GREEN.
- [ ] Commit: `feat(discovery): expose public OKF bundle`

### Task 6: Release gate, browser QA and publication

**Files:**
- Create: `docs/BLOCK-4A-OKF-RELEASE-2026-08-27.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

- [ ] Run `npm run generate:okf`, `npm run validate:okf`, `npm test`, `npm run lint` and `npm run build`.
- [ ] Start the local server on a free port and verify desktop and mobile in Playwright: page renders, no overlap, all primary links return 200, Markdown/JSON/checksum content types are usable and no console errors appear.
- [ ] Record commit, artifact inventory, checksums, test results, limitations and post-release rollback in the release gate document; mark 4A complete and preserve 4B/4C as unauthorized.
- [ ] Commit: `docs(okf): record block 4a release gate`
- [ ] Push the branch, publish the exact commit as a new Cloudflare Sites version, verify the custom domain and run the public Agent Friendly Web audit again.
- [ ] Confirm the origin reports OKF as a public knowledge resource only; do not score it as MCP, tool execution or certification.

## Self-Review

- The plan keeps generated and editorial sources separate and makes the generated directory disposable.
- The manifest is the sole authority for release dates and allowlisted sections, so repeated builds do not drift.
- The validator parses YAML structurally and checks privacy/integrity independently of the generator.
- The release can be rolled back by deploying the previous Sites version; no database or secret rollback is needed.
- The work does not authorize Block 4B, Block 4C or any private Tokenizart capability.
