# Agent Friendly Web Home Knowledge and Guidance v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the approved human home journey into a clear, multilingual and verifiable experience with a fully visible comic hero, navigable AF-0 to AF-5 stages, an accurate dated readiness reference, a reusable public FAQ and deterministic guide answers, plus refreshed OKF and NotebookLM public knowledge outputs.

**Architecture:** Keep the scanner, Registry, MCP and protected boundaries unchanged. Add small shared data modules for the dated public readiness reference and multilingual FAQ catalog, render them through focused React components, and reuse the same catalog in the public guide, JSON-LD, OKF and NotebookLM source manifest so one reviewed source drives all public surfaces. Build every behavior test-first in an isolated worktree and finish with desktop/mobile visual QA before opening a pull request.

**Tech Stack:** TypeScript, React 19, Next.js/Vinext, Node.js test runner, CSS, JSON-LD, OKF v0.2 generator, Playwright/Chromium for visual QA.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-home-knowledge-and-guidance-v2-design.md`

## Global Constraints

- Preserve the current scanner algorithm, `/api/scan` contract, Registry identity model, D1 schema, MCP server, Block 5D and the synthetic-origin Draft PR.
- Do not change DNS, billing, payments, credentials, production traffic or deployment state in this implementation branch.
- The hero must use `public/images/agent-friendly-call-robots.webp` as a real responsive image with localized alternative text and no overlay that hides the robots, cans or string.
- AF-0 through AF-5 links must use stable fragments `#af-0` through `#af-5`; no stage may appear pre-approved or automatically completed.
- The public reference is a dated snapshot for `agentfriendlyweb.dev`: score `95`, measured `2026-08-31`, with commerce/payments explicitly absent; a user-triggered scan replaces it with observed results.
- The comparison opens on the `restaurant` scenario and AF-2, while remaining fully interactive.
- FAQ content is public Level 5, reviewed, multilingual in Spanish, English and Portuguese, and reused by the home, full FAQ route, guide, JSON-LD, OKF and NotebookLM source pack.
- The public guide remains deterministic, read-only, ephemeral and fail-closed for likely credentials; it may provide no more than one primary next step per FAQ answer.
- NotebookLM remains an auxiliary derivation surface, never a canonical source; generated derivatives require human QA before publication or ingestion.
- Preserve the black-and-white comic visual system, existing responsive conventions and current localized routing model.

---

### Task 1: Dated readiness reference and navigable maturity path

**Files:**
- Create: `lib/public-readiness-reference.mjs`
- Modify: `app/components/scan-workspace.tsx`
- Modify: `app/components/maturity-map.tsx`
- Modify: `app/components/maturity-demonstrator.tsx`
- Modify: `app/evolucion-agentica/page.tsx`
- Modify: `lib/home-copy.mjs`
- Modify: `app/globals.css`
- Test: `test/home-knowledge-guidance-v2.test.mjs`
- Test: `test/home-i18n.test.mjs`

**Interfaces:**
- Produces: `PUBLIC_READINESS_REFERENCE` with `{ target, score, measuredAt, level, boundary }`, where localized fields are records keyed by `es | en | pt`.
- Consumes: `localizedPath('evolution', locale, { hash: 'af-N' })` for each maturity card.
- Preserves: `fetch('/api/scan', ...)` and the existing `ScanResult` response contract.

- [ ] **Step 1: Write failing tests for the dated snapshot, restaurant default and maturity links**

```js
test('home reference is dated, accurate and bounded', async () => {
  assert.equal(PUBLIC_READINESS_REFERENCE.score, 95);
  assert.equal(PUBLIC_READINESS_REFERENCE.measuredAt, '2026-08-31');
  assert.match(PUBLIC_READINESS_REFERENCE.boundary.es, /pagos|commerce/i);
  assert.match(scanSource, /PUBLIC_READINESS_REFERENCE\.score/);
  assert.doesNotMatch(scanSource, /:\s*'70'/);
});

test('maturity cards link to real AF anchors without preselection', () => {
  for (let stage = 0; stage <= 5; stage += 1) assert.match(mapSource, new RegExp(`af-\\$\\{index\\}`));
  assert.doesNotMatch(styles, /maturity-track li\[data-stage=['"]3['"]\]/);
  for (let stage = 0; stage <= 5; stage += 1) assert.match(evolutionSource, new RegExp(`id=\\{?['"]af-${stage}`));
});

test('comparison begins with the restaurant at AF-2', () => {
  assert.match(demonstratorSource, /useState<ScenarioId>\(['"]restaurant['"]\)/);
  assert.match(demonstratorSource, /useState\(2\)/);
});
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --test test/home-knowledge-guidance-v2.test.mjs test/home-i18n.test.mjs`

Expected: FAIL because the shared reference module, AF anchors and restaurant default do not exist and CSS still highlights stage 3.

- [ ] **Step 3: Implement the minimal shared reference and maturity navigation**

```js
export const PUBLIC_READINESS_REFERENCE = Object.freeze({
  target: 'agentfriendlyweb.dev',
  score: 95,
  measuredAt: '2026-08-31',
  level: Object.freeze({ es: 'AF-5 · Nativo con límites', en: 'AF-5 · Native with limits', pt: 'AF-5 · Nativo com limites' }),
  boundary: Object.freeze({
    es: 'Referencia propia fechada. Comercio y pagos no fueron detectados.',
    en: 'Dated first-party reference. Commerce and payments were not detected.',
    pt: 'Referência própria datada. Comércio e pagamentos não foram detectados.',
  }),
});
```

Use this object only for the idle reference panel. Wrap every maturity item in a localized anchor to `#af-${index}`, replace completion icons with neutral navigation affordances, add six explanation articles with matching IDs to the evolution page, and add copy explaining that progression requires evidence, implementation, validation, limits, human approval and re-measurement.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test test/home-knowledge-guidance-v2.test.mjs test/home-i18n.test.mjs`

Expected: PASS with no warnings.

- [ ] **Step 5: Commit Task 1**

```bash
git add lib/public-readiness-reference.mjs app/components/scan-workspace.tsx app/components/maturity-map.tsx app/components/maturity-demonstrator.tsx app/evolucion-agentica/page.tsx lib/home-copy.mjs app/globals.css test/home-knowledge-guidance-v2.test.mjs test/home-i18n.test.mjs
git commit -m "feat: make readiness and maturity journey verifiable"
```

### Task 2: Stacked comic hero with complete illustration

**Files:**
- Modify: `app/components/comic-home-intro.tsx`
- Modify: `lib/home-copy.mjs`
- Modify: `app/globals.css`
- Test: `test/home-knowledge-guidance-v2.test.mjs`
- Test: `test/home-i18n.test.mjs`

**Interfaces:**
- Consumes: `COMIC_HOME_COPY[locale].heroAlt`.
- Produces: one semantic `<img className="comic-call-art" ...>` with intrinsic `width={1680}` and `height={941}`.

- [ ] **Step 1: Add failing tests for the semantic full illustration**

```js
test('hero renders the complete call illustration as content', () => {
  assert.match(comicIntro, /<img[\s\S]*className="comic-call-art"/);
  assert.match(comicIntro, /src="\/images\/agent-friendly-call-robots\.webp"/);
  assert.match(comicIntro, /alt=\{copy\.heroAlt\}/);
  assert.doesNotMatch(styles, /\.comic-call-hero::before\s*\{/);
  assert.match(styles, /\.comic-call-art\s*\{[^}]*object-fit:\s*contain/s);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test test/home-knowledge-guidance-v2.test.mjs test/home-i18n.test.mjs`

Expected: FAIL because the hero still uses an aria-hidden background layer and an overlay.

- [ ] **Step 3: Implement the stacked hero and responsive CSS**

Render label and title, then the real image, then intro and actions. Give the hero stable vertical spacing, keep the complete image visible with `width: 100%`, `height: auto`, `aspect-ratio: 1680 / 941`, `object-fit: contain`, and remove the desktop overlay/background positioning rules. On mobile, image remains before explanatory copy and actions become a stable grid without cropping.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test test/home-knowledge-guidance-v2.test.mjs test/home-i18n.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit Task 2**

```bash
git add app/components/comic-home-intro.tsx lib/home-copy.mjs app/globals.css test/home-knowledge-guidance-v2.test.mjs test/home-i18n.test.mjs
git commit -m "feat: present complete comic call hero"
```

### Task 3: Multilingual FAQ catalog, page and discovery

**Files:**
- Create: `lib/public-faq.mjs`
- Create: `app/components/public-faq.tsx`
- Create: `app/preguntas-frecuentes/page.tsx`
- Modify: `app/page.tsx`
- Modify: `lib/site-i18n.mjs`
- Modify: `lib/localized-route-metadata.mjs`
- Modify: `lib/site-copy.mjs`
- Modify: `app/[locale]/[[...slug]]/page.tsx`
- Modify: `app/components/site-header.tsx`
- Modify: `app/components/site-footer.tsx`
- Modify: `app/mapa-del-sitio/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/globals.css`
- Test: `test/public-faq.test.mjs`
- Test: `test/localized-routing-and-discovery.test.mjs`

**Interfaces:**
- Produces: `PUBLIC_FAQ_ITEMS`, immutable entries with `{ id, intents, sources, es, en, pt }`.
- Produces: `faqEntries(locale): Array<{ id, question, shortAnswer, detailedAnswer, intents, sources }>`.
- Produces: `matchPublicFaq(message, locale)` returning the best FAQ entry or `null` using deterministic normalized token matching.
- Produces: `PublicFaq({ locale, limit?, headingLevel? })` for the home subset and full FAQ route.

- [ ] **Step 1: Write failing catalog and route tests**

```js
test('FAQ catalog provides reviewed public answers in every locale', () => {
  assert.ok(PUBLIC_FAQ_ITEMS.length >= 12);
  for (const item of PUBLIC_FAQ_ITEMS) {
    assert.match(item.id, /^[a-z0-9-]+$/);
    assert.ok(item.sources.length > 0);
    for (const locale of ['es', 'en', 'pt']) {
      assert.ok(item[locale].question.length > 10);
      assert.ok(item[locale].shortAnswer.length > 20);
      assert.ok(item[locale].detailedAnswer.length >= item[locale].shortAnswer.length);
    }
  }
});

test('FAQ is reachable in every locale and included in public discovery', () => {
  assert.equal(localizedPath('faq', 'es'), '/preguntas-frecuentes');
  assert.equal(localizedPath('faq', 'en'), '/en/frequently-asked-questions');
  assert.equal(localizedPath('faq', 'pt'), '/pt/perguntas-frequentes');
  assert.match(sitemapSource, /'faq'/);
  assert.match(dispatcherSource, /PublicFaqExperience/);
});
```

- [ ] **Step 2: Run FAQ and routing tests and verify RED**

Run: `node --test test/public-faq.test.mjs test/localized-routing-and-discovery.test.mjs`

Expected: FAIL because the catalog, component and routes do not exist.

- [ ] **Step 3: Implement the catalog and reusable FAQ component**

Create at least twelve reviewed questions covering: what agent-friendly means, AF-0 to AF-5, non-automatic progress, public audit limits, files such as robots/sitemap/llms, AEO, crawler-specific policy, Registry, security/access boundaries, CLI/MCP status, prices and custom quotes without inventing fixed offers, external verification, and Tokenizart as the first integral case. Render accessible `<details>` rows and link only allowlisted public sources.

- [ ] **Step 4: Implement localized routes, navigation, home subset and FAQPage JSON-LD**

Add route key `faq`, localized metadata, dispatcher support, header/footer/site-map/sitemap links, a home subset after the comparison, and a full route. Generate JSON-LD from the same `faqEntries(locale)` values so visible answers and structured data cannot diverge.

- [ ] **Step 5: Run FAQ, routing and home tests and verify GREEN**

Run: `node --test test/public-faq.test.mjs test/localized-routing-and-discovery.test.mjs test/home-i18n.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit Task 3**

```bash
git add lib/public-faq.mjs app/components/public-faq.tsx app/preguntas-frecuentes/page.tsx app/page.tsx lib/site-i18n.mjs lib/localized-route-metadata.mjs lib/site-copy.mjs app/[locale]/[[...slug]]/page.tsx app/components/site-header.tsx app/components/site-footer.tsx app/mapa-del-sitio/page.tsx app/sitemap.ts app/globals.css test/public-faq.test.mjs test/localized-routing-and-discovery.test.mjs test/home-i18n.test.mjs
git commit -m "feat: publish multilingual public FAQ"
```

### Task 4: Deterministic guide answers backed by the FAQ catalog

**Files:**
- Modify: `lib/public-guide.mjs`
- Modify: `app/components/public-guide-chat.tsx`
- Modify: `public/.well-known/public-guide-contract.json`
- Test: `test/public-guide.test.mjs`
- Test: `test/public-guide-contract.test.mjs`

**Interfaces:**
- Consumes: `matchPublicFaq(message, locale)` and `localizedPath('faq', locale)`.
- Preserves: `respondToPublicGuide({ locale, message, context })` and `agent-friendly-web.public-guide-turn.v1`.
- Produces: FAQ turns using topic `faq:<faq-id>`, one primary quick reply at most, localized FAQ source plus the entry allowlist.

- [ ] **Step 1: Write failing guide tests for FAQ routing and continuity**

```js
test('guide answers FAQ intent from the canonical catalog', () => {
  const turn = respondToPublicGuide({ message: 'El cambio de AF-0 a AF-5 es automatico?', context: PUBLIC_GUIDE_INITIAL_CONTEXT });
  assert.equal(turn.topic, 'faq:automatic-progression');
  assert.match(turn.answer, /no es automatico/i);
  assert.ok(turn.sources.some((source) => source.url === '/preguntas-frecuentes'));
  assert.ok(turn.quick_replies.length <= 1);
});

test('guide preserves a FAQ topic when detail is requested', () => {
  const first = respondToPublicGuide({ message: 'Que es llms.txt?', context: PUBLIC_GUIDE_INITIAL_CONTEXT });
  const detailed = respondToPublicGuide({ message: 'Explicalo con mas detalle', context: first.next_context });
  assert.equal(detailed.topic, first.topic);
  assert.equal(detailed.mode, 'detailed');
});
```

- [ ] **Step 2: Run public guide tests and verify RED**

Run: `node --test test/public-guide.test.mjs test/public-guide-contract.test.mjs`

Expected: FAIL because FAQ topics are not yet resolved from the shared catalog.

- [ ] **Step 3: Integrate FAQ matching before the legacy topic classifier**

Resolve a canonical FAQ match before broad regular-expression topics, map simple/standard to the short answer and detailed to the detailed answer, retain credential blocking as the first guard, preserve acknowledgement continuity, and expose only one focused next-step reply. Update the machine-readable contract to name the public FAQ catalog as a deterministic knowledge source without claiming memory, model inference or actions.

- [ ] **Step 4: Run guide tests and verify GREEN**

Run: `node --test test/public-guide.test.mjs test/public-guide-contract.test.mjs test/public-guide-discovery.test.mjs`

Expected: PASS, including existing safety and context tests.

- [ ] **Step 5: Commit Task 4**

```bash
git add lib/public-guide.mjs app/components/public-guide-chat.tsx public/.well-known/public-guide-contract.json test/public-guide.test.mjs test/public-guide-contract.test.mjs
git commit -m "feat: ground public guide in FAQ catalog"
```

### Task 5: OKF v0.2 refresh and NotebookLM public source pack

**Files:**
- Create: `docs/PUBLIC-FAQ-AND-GUIDE.es.md`
- Create: `docs/HOME-AND-MATURITY-PATH.es.md`
- Create: `docs/PUBLIC-READINESS-REFERENCE-2026-08-31.md`
- Create: `docs/notebooklm/agent-friendly-web-public-level5-2026-08-31/README.md`
- Create: `docs/notebooklm/agent-friendly-web-public-level5-2026-08-31/source-manifest.json`
- Modify: `config/okf-public-sources.v1.json`
- Regenerate: `public/okf/v0.2/**`
- Regenerate: `app/okf/v0.2/CHECKSUMS.sha256/checksums.generated.ts`
- Test: `test/okf-public-distribution.test.mjs`
- Test: `test/notebooklm-source-pack.test.mjs`

**Interfaces:**
- Produces OKF concepts: `assistance/public-faq-and-guide.md`, `method/home-and-maturity-path.md`, `discovery/current-public-readiness.md`.
- Updates release metadata to `2026-08-31-public-v2`, verified by `human:gabriel-mucchiut`, with `stale_after` set to `2026-11-29T00:00:00Z`.
- Produces NotebookLM manifest schema `agent-friendly-web.notebooklm-public-source-pack.v1`, sensitivity `Nivel 5`, canonical source `repository`, and derivative policy `requires_human_qa`.

- [ ] **Step 1: Write failing tests for the expanded OKF and NotebookLM manifest**

```js
test('OKF v0.2 includes home, readiness and FAQ knowledge', async () => {
  const manifest = await loadSourceManifest();
  assert.equal(manifest.release.id, '2026-08-31-public-v2');
  for (const output of ['assistance/public-faq-and-guide.md', 'method/home-and-maturity-path.md', 'discovery/current-public-readiness.md']) {
    assert.ok(manifest.concepts.some((concept) => concept.output === output));
  }
});

test('NotebookLM pack is public, traceable and non-canonical', async () => {
  const manifest = JSON.parse(await readFile(PACK_MANIFEST, 'utf8'));
  assert.equal(manifest.schema, 'agent-friendly-web.notebooklm-public-source-pack.v1');
  assert.equal(manifest.sensitivity, 'Nivel 5');
  assert.equal(manifest.canonical_source, 'repository');
  assert.equal(manifest.derivative_policy, 'requires_human_qa');
  assert.ok(manifest.sources.some((source) => source.path.includes('public/okf/v0.2/index.md')));
});
```

- [ ] **Step 2: Run OKF and source-pack tests and verify RED**

Run: `node --test test/okf-public-distribution.test.mjs test/notebooklm-source-pack.test.mjs`

Expected: FAIL because the new concepts and manifest do not exist.

- [ ] **Step 3: Author reviewed source documents and expand the OKF manifest**

Document the actual home order, maturity boundaries, score snapshot and limitations, FAQ catalog reuse, guide behavior, active CLI/MCP/Registry states, Tokenizart links and review dates. Add the three concepts and public sources to `config/okf-public-sources.v1.json` without changing OKF format version `0.2`.

- [ ] **Step 4: Generate and validate OKF deterministically**

Run: `npm run generate:okf && npm run validate:okf`

Expected: the generator succeeds, validation reports the expanded concept count, generated manifest/checksums are internally consistent, and a second generation produces no diff.

- [ ] **Step 5: Create the NotebookLM source pack manifest**

List exact repository sources, canonical public URLs, locale, review date, sensitivity, checksum/provenance pointers and excluded material. State that NotebookLM is auxiliary, output remains `needs_review`, and no credentials, private dossiers, Registry private data, payments or protected Tokenizart data are included.

- [ ] **Step 6: Run OKF and source-pack tests and verify GREEN**

Run: `node --test test/okf-public-distribution.test.mjs test/notebooklm-source-pack.test.mjs && npm run validate:okf`

Expected: PASS.

- [ ] **Step 7: Commit Task 5**

```bash
git add docs/PUBLIC-FAQ-AND-GUIDE.es.md docs/HOME-AND-MATURITY-PATH.es.md docs/PUBLIC-READINESS-REFERENCE-2026-08-31.md docs/notebooklm/agent-friendly-web-public-level5-2026-08-31 config/okf-public-sources.v1.json public/okf/v0.2 app/okf/v0.2/CHECKSUMS.sha256/checksums.generated.ts test/okf-public-distribution.test.mjs test/notebooklm-source-pack.test.mjs
git commit -m "docs: refresh public OKF and NotebookLM pack"
```

### Task 6: Integrated regression, visual QA and pull request

**Files:**
- Create: `docs/qa/HOME-KNOWLEDGE-GUIDANCE-V2-QA-2026-08-31.md`
- Modify only if a failing regression requires a test-first fix: files already listed in Tasks 1-5.

**Interfaces:**
- Verifies: home, FAQ, guide, localized routes, OKF, scanner, CLI and MCP contracts without deployment.
- Produces: one reviewable feature branch and pull request; production remains unchanged.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm test`

Expected: all tests pass, zero failures.

- [ ] **Step 2: Run lint, OKF validation and production build**

Run: `npm run lint && npm run validate:okf && npm run build`

Expected: all commands exit `0` without build or type errors.

- [ ] **Step 3: Start a local server and perform HTTP checks**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`

Verify HTTP `200` for `/`, `/preguntas-frecuentes`, `/en/frequently-asked-questions`, `/pt/perguntas-frequentes`, `/evolucion-agentica#af-0`, `/okf/v0.2/index.md`, `/.well-known/public-guide-contract.json`, `/sitemap.xml` and `/llms.txt`.

- [ ] **Step 4: Perform Playwright visual QA at desktop and mobile sizes**

Inspect `1440x900` and `390x844` in Spanish, English and Portuguese. Confirm the complete two-robot/can/string illustration is visible without crop; title, image and copy never overlap; maturity cards link and focus visibly; Restaurant is selected; 95/100 with date/boundary is readable; FAQ expands; guide answers an FAQ; navigation fits; and no text or image overlaps.

- [ ] **Step 5: Record evidence and remaining limits**

Write `docs/qa/HOME-KNOWLEDGE-GUIDANCE-V2-QA-2026-08-31.md` with commit SHA, commands, result counts, tested URLs/viewports, screenshots, unchanged boundaries, and explicit note that no production deployment, DNS, payment, Registry mutation, MCP change or NotebookLM derivative promotion occurred.

- [ ] **Step 6: Request code review and open the pull request**

Run: `git status --short`, `git log --oneline origin/main..HEAD`, and `git diff --check origin/main...HEAD`; then push the branch and open a pull request titled `feat: improve home knowledge and public guidance` with the spec, plan, TDD evidence, screenshots and rollback boundary.

- [ ] **Step 7: Stop at the deployment gate**

Do not merge or deploy from this task. Present the pull request, test results and visual evidence for a separate production decision.
