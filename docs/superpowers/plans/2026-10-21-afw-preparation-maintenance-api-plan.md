# AFW maintenance API request planning — 21 October 2026
Goal: encode the live-proven REST transport and original-instance reconciliation for the existing private administrative Workflow. SOURCE ONLY: no network driver, credentials, deployment, registration or owner authority.

Evidence: PB14 in issue497. A JSON STRING params was accepted by REST but rejected before the caller step; an OBJECT params reached the single register RPC. Official installed Wrangler4.128 cli.js350766/350795 sends parsed params as an object. Current REST OpenAPI/docs describe a string. Preserve this discrepancy instead of weakening the caller's record/hash checks. The corrected RPC ended unconfirmed; one SDK client exists, its singleton journal is spent/unobserved. This source must never recreate it.

Design: a pure buildPreparationMaintenanceApiPlan({policy,state,now?}) returns frozen POST/GET descriptors for the exact AFW account/Workflow. Validate the same seven server policy fields and fixed callback/resource syntax; derive the existing exact planHash/instanceId. POST body.params is an object containing only planHash. Unknown ACK or any already-started observation yields GET of the ORIGINAL ID only. Expiry/regressed trusted wall clock removes POST, preserving GET; never replace dates, operation or ID. Syntax/descriptors confer no identity or action authorization. All readiness/execution/payment/publication flags stay false. No runtime imports or public interface.

Files: lib/preparation-maintenance-api-plan.mjs; test/preparation-maintenance-api-plan.test.mjs; .github/workflows/afw-preparation-maintenance-api-plan.yml. No dependencies; Node22 CI without npm install for focal tests, then existing full CI. Isolated remote branch from main171fc039; no local clone/build/install.
Standing owner authorization to decide/advance in cloud overrides routine design approval/local-plan menus. Existing private registration and spent journal remain unchanged. No new live trial without a separate evidence-based plan.

- [ ] Commit tests/workflow/plan first and observe missing-module RED in GitHub.
- [ ] Implement pure builder and run focal + full CI.
- [ ] One fresh whole-branch review; one author pass for Critical/Important, Minor ledgered; no re-review.
- [ ] Merge expected head after checks; verify main CI and preserve checkpoint.
