# Scanner self-audit incident receipt

**Project:** Agent Friendly Web

**Canonical origin:** `https://agentfriendlyweb.dev`

**Date:** 2026-09-02

**Status:** corrected in production; stability observation remains open

## Symptom

The public scanner returned `0/100` and `AF-0 invisible` when its target was the
canonical Agent Friendly Web origin. Every probe reported HTTP `522`, although
the same public resources returned HTTP `200` to independent clients. Scans of
external domains continued to work.

This was a false negative caused by the runtime path, not by the scoring model
or by missing discovery resources.

## Root cause

The production scanner runs on a Cloudflare Worker attached to the custom
domain it was trying to inspect. A same-origin `fetch()` from that Worker did
not traverse Cloudflare's public front door with the previous compatibility
configuration and returned `522` for every probe.

## Correction

The Worker compatibility flags now include
`global_fetch_strictly_public`. The change allows the scanner to request its
own public custom domain through the same public edge path observed by other
clients.

The correction does not change:

- methodology, weights or AF-0 to AF-5 thresholds;
- SSRF and public-DNS validation;
- request timeouts or response byte limits;
- manual redirect handling;
- read-only behavior.

## Verification

- Regression test added before the configuration change.
- Local suite: `410/410` tests passed.
- Lint: `0` errors and one pre-existing image optimization warning.
- Production build: completed.
- Production deployment dry-run: completed without mutation.
- Canary Worker version: `5ca4fe04-2156-47b4-ae66-3390510f18af`.
- Canary self-scan: HTTP `200`, `95/100`, `AF-5`, no `522` probes.
- Canary external control (`tokenizart.com`): HTTP `200`, `23/100`, `AF-1`.
- Production Worker version: `33ac170d-6b16-4a48-95c7-bbe31d34792a` at 100%.
- Production public smoke: `11/11` checks passed.
- Production self-scan through the public UI and API: `95/100`, `AF-5`, no
  server-error probes.
- Production D1 read-only control: 6 migrations, 13 functional tables, 0
  functional rows, 0 rows written and `changed_db=false`.

The shell did not contain the separate Cloudflare API token required by the
all-in-one stability auditor, so that command failed closed before its live
custom-domain query. The active Worker version, compatibility flags, public
origin, Access redirects, smoke contract and D1 state were verified through
the narrower authenticated and public controls listed above. No secret was
read or copied to obtain that evidence.

## Release and rollback

- Source PR: `tokenizartinfo-ops/agent-friendly-web#45`.
- Merge commit: `4a13fe0135fcd98499b92920ef77160fe8e660fb`.
- Previous production version reserved for rollback:
  `dc7531c7-5f1e-4e7c-9774-2a6acf131f44`.
- DNS, Access, D1 migrations, MCP, contact, email, payments and Tokenizart
  resources were not changed.

The new production version starts the replacement stability observation on
2026-09-02. The stability and legacy-retirement gate must not close before
2026-09-09 and still requires the full read-only audit with its authorized
Cloudflare control-plane credential.

