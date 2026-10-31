# Closed Workflow REST JSON boundary · 31 October 2026

Own AFW source/Actions increment. No new remote window, owner login, permission or key.

## Evidence
PR665 sourcece47f03a was accepted and deployed closed. One real diagnostic instance in plan8d4d4b99 reached complete at12:30:11UTC with outputblocked and step_count0. Its primary params field was a JSON string, matching the native REST schema. The current runner passes event.payload directly to a strict object-only validator. This identifies a concrete unsupported representation to reproduce; it does not prove every subsequent native identity check will pass.

The plan is consumed, never restart/replay it. Compatible closed QA c570b60b@100%/DEP862d91c3 restored only after confirmed terminality. At12:31:19UTC all14QA/8canary/3operatorflagsfalse, cron/tails empty, own Workflows terminal and Containersactive[]. Canary2607abae/operator855dc5c1 unchanged. Namespace/history/custody preserved; no SQL/grant/client/first-successor action.

## Minimal correction
Accept exactly one JSON text layer ONLY at the Workflow boundary, max256 actual UTF8bytes, then reuse the same strict three-field diagnostic validator. Keep direct object input for native binding callers. Reject invalid/nested JSON, nonobject, unknown fields, foreign pins and oversize before step/RPC. Actor RPC remains object-only. No nominal input, window, retry, timer, storage, provider or authority change.

## Validation
RED reproduces recorded API shape through the actual exported Workflow and fixed DO in workerd, plus unit boundary cases. Both sealed candidate and rollback must execute from JSON text, not only synthetic object input. Retain original tests, original5sdeadline, cold history sentinel, noDB/secret/outbound and closedflags/pin/cache checks. Full CI/build/review before a NEW bounded closed diagnostic with a new accepted source and version; no retry of the consumed plan.
