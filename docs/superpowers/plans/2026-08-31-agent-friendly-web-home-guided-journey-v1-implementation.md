# Agent Friendly Web Home Guided Journey v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reordenar y simplificar la portada para que una persona comprenda el producto antes de entrar en sus expedientes tecnicos.

**Architecture:** Separar el hero y el archivo en componentes independientes, componer el orden canonico desde `app/page.tsx` y reutilizar el mapa y comparador existentes. El archivo usa divulgacion progresiva nativa y el hero aplica composicion responsive sin incrustar texto en la imagen.

**Tech Stack:** Next/Vinext, React, CSS, Node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-home-guided-journey-v1-design.md`

## Global Constraints

- ES, EN y PT deben conservar paridad funcional.
- No agregar claims de capacidades no desplegadas.
- Mantener HTML semantico, rutas reales y texto seleccionable.
- Verificar 1440x900 y 390x844.

---

### Task 1: Contrato de orden y divulgacion

**Files:**
- Modify: `test/home-i18n.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/components/comic-home-intro.tsx`
- Modify: `lib/home-copy.mjs`

**Interfaces:**
- Produces: `ComicCallHero`, `FutureArchive`, orden DOM canonico y copy localizada.

- [ ] **Step 1: Write the failing test** para exigir `ComicCallHero -> MaturityMap -> ScanWorkspace -> HomeMaturityComparison -> FutureArchive -> HomeNextPaths` y divulgacion progresiva.
- [ ] **Step 2: Run test to verify it fails** con `node --test test/home-i18n.test.mjs`.
- [ ] **Step 3: Write minimal implementation** separando componentes y componiendo la secuencia aprobada.
- [ ] **Step 4: Run test to verify it passes** con el mismo comando.
- [ ] **Step 5: Commit** el recorrido semantico.

### Task 2: Hero y responsive

**Files:**
- Modify: `test/home-i18n.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: clases de `ComicCallHero`.
- Produces: capa central legible en escritorio y orden ilustracion/texto en movil.

- [ ] **Step 1: Write the failing test** para exigir media query, capa de contraste y orden movil declarado.
- [ ] **Step 2: Run test to verify it fails** con `node --test test/home-i18n.test.mjs`.
- [ ] **Step 3: Write minimal implementation** en CSS sin blur global ni escalado tipografico por ancho en texto de cuerpo.
- [ ] **Step 4: Run test to verify it passes**.
- [ ] **Step 5: Commit** el tratamiento visual.

### Task 3: QA del recorrido

**Files:**
- Modify: `docs/HOME-GUIDED-JOURNEY-LOCAL-GATE-2026-08-31.md`

**Interfaces:**
- Produces: evidencia de test, build y capturas.

- [ ] **Step 1: Run focused and full verification** con `npm test`, `npm run lint` y `npm run build`.
- [ ] **Step 2: Capture desktop and mobile screenshots** con Playwright.
- [ ] **Step 3: Inspect overflow, overlap, image framing and controls**.
- [ ] **Step 4: Record exact evidence** en el gate local.
- [ ] **Step 5: Commit** la evidencia.

