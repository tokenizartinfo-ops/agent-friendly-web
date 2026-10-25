# Plan: public JSON cloud activation
Spec: docs/superpowers/specs/2026-10-25-public-json-cloud-activation.md
Base cba56e322d9ce5cd8fa2c437fa4c51e3a6660db2/treee67b644847d5844e0aa1241866800c72ff1a510f. GitHub branch only; no local clone/dependencies/build.

1. Add controller behavioral tests and PR-only test harness; observe missing-controller RED.
2. Add fixed controller, bounded public observer and their behavioral tests. Reuse prior uploader fingerprints/child/qualifier; do not modify old entrypoints or qualified app bytes.
3. GitHub tests, lint/build and independent whole-branch review. Check base/head/tree and source-only merge/main CI.
4. ONE manual main/attempt1 activate dispatch, existing public custody. Baseline public smoke and primary metadata before any POST; scope/original600s fences. Stage0 acceptance, fresh check, promotion, normal acceptance or owned rollback all within one job.
5. Read sanitized receipt and independent primary GET; document actual result and separate native proxy/provider/PC-off gates. No implicit rerun, new credential, broad permission or schedule.
