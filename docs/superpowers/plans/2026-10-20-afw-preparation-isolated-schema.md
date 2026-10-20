# AFW Isolated Preparation Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Owner chose autonomous inline work; no implementer agents.

**Goal:** Qualify the smallest existing D1 schema closure for the own preparation service.
**Architecture:** Read11fixed source files and select whole reviewed DDL by an11table allowlist. Compare actual native D1 metadata with the full source chain and run the existing production-Worker native journey on the reduced schema. No schema redesign, remote installer or data migration.
**Tech Stack:** Node22, crypto/fs, SQLite in Miniflare/workerd, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-20-afw-preparation-isolated-schema.md

## Global Constraints
- DDL sources pinned to Git blobs at d863055afb04ef8fb83606d974e094f0f6044154; preserve original statements/triggers/order.
- Package has11tables, no records or credentials; provisioningAllowed/activationReady/operationalReadiness=false.
- Cloud-only build/test; no local clone, dependencies, build, model, browser or container. Public/G2/events/FCO untouched.

## Review Focus
1. A required joined table omitted from an apparently minimal schema must fail the actual Worker/native tests; compare full metadata on11tables.
2. Source alteration or extra/missing input must fail before emitting SQL; pin exact blob bytes, not filenames alone.
3. Triggers containing multiple semicolons must remain whole; revision/immutability/grant/no-delete fences must survive.
4. Selection must exclude unrelated tables and destructive/data statements; package cannot be mistaken for permission or a migration against an existing DB.
5. Object naming/order and implicit indexes must preserve native metadata; caller mutation cannot poison a later package.

## Task1: qualify schema closure
Files: add scripts/preparation-schema-package.mjs; test/preparation-schema-package.test.mjs; test/preparation-schema-package-native.test.mjs; .github/workflows/afw-preparation-schema.yml. Modify only DDL setup in test/preparation-worker-native.test.mjs.
Interfaces: readPreparationSchemaPackage():Promise<Package>; buildPreparationSchemaPackage(sources:Record<path,string>):Package; PREPARATION_SCHEMA_INPUTS immutable path/blobSha records.
- [ ] Write5Node tests and native equality test; observe missing-packager RED in Actions.
- [ ] Implement fixed source reader/pure selector and change existing Worker native DDL setup, leaving its behavior tests intact.
- [ ] Run5Node, native metadata equivalence and actual Worker journey in Actions; all PASS, no remote change. Emit package+receipt artifact; no CF credentials.
- [ ] Full suite/lint/build and ONE fresh whole-branch review. Author one RED→GREEN fix pass for Important; defer Minor in ledger/final, no re-review.
- [ ] Integrate exact tested tree and keep source/package/native acceptance separate from any remote DDL receipt.

## Ledger / rulings
Source inputs are historical public DDL; their source-only comments are not remote authorization. Separate operator evidence is required for fresh own stores. No native fixture data is transferable to a real account. Defaults and closure remain as recorded in PB1.
