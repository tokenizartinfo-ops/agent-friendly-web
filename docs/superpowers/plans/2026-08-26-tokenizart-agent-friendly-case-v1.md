# Tokenizart Agent-Friendly Case v1 - Implementation Plan

## 1. Preserve the baseline

- Record Agent Friendly Web and external `isitagentready.com` results.
- Record crawler HTTP probes and Cloudflare/origin topology.
- Keep the AF v1 score unchanged while adding auxiliary diagnostics.

## 2. Improve the auditor

- Test and detect Content Signals and explicit AI crawler groups.
- Probe current MCP server cards, Agent Skills, AI catalog and API Catalog routes.
- Reject HTML fallback pages and malformed manifests.

## 3. Prepare the Tokenizart installation package

- Create concise and extended `llms` files for Tokenizart and Atelier.
- Preserve WordPress and Atelier restrictions in proposed `robots.txt` files.
- Add proposed JSON-LD and an Atelier sitemap.
- Add preview-only tool catalogs with explicit maturity labels.

## 4. Publish a progressive case page

- Compare Tokenizart, Atelier and Agent Friendly Web.
- Show phases, owners, gates and package downloads.
- Explain that Atelier is the operating platform.

## 5. Improve Agent Friendly Web's own public baseline

- Publish Content Signals for the public site.
- Publish a real Agent Skill index, AI catalog and API Catalog.
- Add useful HTTP Link headers where supported.

## 6. Verify and release

- Run tests, lint and production build.
- Run local browser QA on desktop and mobile.
- Commit and push the public repository.
- Deploy a new Sites version and repeat both audits.

## 7. Handoff

- Leonardo: WordPress editorial and root-file implementation.
- Leandro: Cloudflare review, headers and controlled Atelier source implementation.
- Gabriel: approve public wording, crawler training policy and production windows.
- Codex: generate files, verify implementation, rerun audits and maintain the case history.

