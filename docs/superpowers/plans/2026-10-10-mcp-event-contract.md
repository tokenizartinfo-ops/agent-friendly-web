# MCP event contract implementation plan

> For agentic workers: use superpowers:executing-plans inline; one fresh whole-branch reviewer at end, no implementer agents.

Goal: one strict local event contract for future authenticated MCP Events, not a mounted dispatcher.
Architecture: pure projection of existing opaque operational signal; no HTTP, keys, permissions or runtime capabilities.
Tech Stack: Node built-in test runner and JavaScript.
Spec: docs/superpowers/specs/2026-10-10-mcp-event-contract.md

Global constraints: preserve all existing runtimes and primary/scheduler acceptances; do not assert subscription/adoption/PCoff. Same fixed signal kinds project_created/project_updated, hashes64, integerrevision>=1, originalcanonicalUTCdate. Reject symbols/accessors/nonplaininput/extra keys without invoking accessors. Return fresh immutable-by-isolation definition copies.

Task1: lib/dossier-mcp-event.mjs and test/dossier-mcp-event.test.mjs. Write adversarial tests first, actual RED from missing implementation, then minimal contract. Focusedtests plus allfile exactheadCI/lint/build gate. Run proportionate focused test locally, CI provides fullsuite before acceptance.
Task2: docs/AFW-MCP-EVENTS-CONTRACT-2026-10-10.es.md and AGENTS checkpoint; dated supersession of arbitrarywebhook unknown in historical6oct evidence, without rewriting history. Freshreview of wholebranch, one fixpass, no rereview. Commit/PR/CI/merge/readback.

Review Focus: reject rawclientdata/crossproject/accessors/prototypecoercion; event is metadata only and cannot confer owner/source/permission truth; no declared protocol capabilities before actual endpoint implementation. No receipt2xx interpreted as taskcompleted. No changes to other projects or custody.
