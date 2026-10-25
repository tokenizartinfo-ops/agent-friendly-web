# Provisional deployment ACK, authoritative traffic acceptance — 25 Oct 2026

Scope: PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web; GitHub main admission; account 85d0d5dadac3341a564f22ce885e9eec; Worker agent-friendly-web-web-production; origin https://agentfriendlyweb.dev. Existing finite authorization, token and immutable candidate only.

Actual run40203181801/attempt1/maincc5dd968 passed baseline, candidate assets, seven MCP checks and version-override acceptance. POST promotion returned HTTP200, explicit envelope success and a UUID. Its versions/strategy did not match the strict full-ACK requirement. The old diagnostic did NOT record field presence: absence versus conflicting values remains unknown. The promotion was observed applied, then one own rollback was verified at deployment2359e295-0e30-4ede-a1d8-cfa5a87a05ac, owner `AFW public-json r40203181801 a1 rollback`, old29927b77@100/candidate1772ceae@0. No normal acceptance; never replay this run.

Design:
- Accept a UUID-only response provisionally in direct or explicitly successful envelope form; ambiguous mixed forms and false success remain rejected.
- Validate versions and strategy EXACTLY whenever present, including null/wrong values. Missing fields never imply matching traffic or supply invented fields.
- Record only shape, safe booleans for presence/match/UUID and complete/provisional ACK classification; no raw response, authors, credentials or headers.
- A valid POST ACK is not authoritative traffic truth. trafficPromotion remains unknown until the existing strict final provider GET verifies ACK id, exact run owner, exact old/candidate percentages and frozen configuration. That positive acceptance alone records trafficReadbackVerified=true.
- The existing normal observer's 30-second propagation bound starts at the valid POST ACK, not at final readback or a restarted clock.
- Same one-POST-per-phase, foreign-activity refusal, unknown-ACK reconciliation, original600-second authority and360-second pre-promotion recovery reserve. No added provider I/O or renewed budget.
- Continue from the new literal rollback deployment and owner ONLY, via a new admitted attempt1/main run; no stage0 POST, no re-upload/rebuild, no replay of older runs.

RED/GREEN regression: identifier/partial/full ACK; conflicting present fields; sanitized absence diagnostics; deferred truth; wrong final id; foreign owner/traffic. Existing expiry/ownership/drift/recovery/IO/deadline suites retained. Independent review, complete PR/main CI and a fresh primary baseline required before another finite dispatch.

Application source/artifact, observer, workflow, smoke, secret scope/expiry, bindings/settings/runtime pins are preserved. This is public release acceptance only, never native AFW Operations, private subscription/useful delivery/withdrawal, PC-off, permanent supervision or Max acceptance.
