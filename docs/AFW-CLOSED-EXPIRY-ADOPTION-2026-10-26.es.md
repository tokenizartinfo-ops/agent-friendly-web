# AFW · closed expiry-source adoption and confirmation pin · 26 October 2026

## Scope and execution plan

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated GitHub branch `release/closed-expiry-confirmation-pin-20261026`; ORIGIN github.com; RESOURCE_TYPE source pin, release evidence and Actions; ALLOWED_ACTION update the public frozen-artifact pin to an already accepted closed runtime and qualify existing packaging. Source rollback: revert this two-file change. Runtime rollback remains the preserved original closed versions; this PR itself does not deploy, invoke, grant or modify resources.

This is the next existing release-preparation step after PR595. No new feature, workflow or API is introduced. Execute inline and use the remote branch instead of a local worktree per the owner's cloud-first instruction. No local clone, dependency installation or build.

1. Record primary CLOSED adoption and public artifact provenance (complete below).
2. Update only `scripts/mcp-confirmation-frozen-artifact.json` (implemented).
3. Run existing full source CI and exact frozen-artifact/native package qualification in GitHub (pending for the final head).
4. One fresh whole-branch review before integration; resolve Critical/Important and record any Minor decision.
5. Integrate only after those results, then qualify a new main package. Never invoke the start0/expires1 fixture or relabel the old package.

## New accepted runtime — primary evidence

[Accepted receipt6417173178](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6417173178) and [reviewed operation6417128326](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6417128326) supersede the older dated runtime-pending paragraph in `AFW-DELEGATED-PILOT-EXPIRY-2026-10-26.es.md`. Its source correction and historical evidence remain intact.

At **13:26:17.896 UTC**, operator `agent-friendly-web-release-operator` accepted closed version `c0edfc10-4120-4206-ba01-a0473f3fdef0` / deployment `5fb41bba-f19a-40ea-8c5e-9403d5ba55f3` at100%. Its module is unchanged: 1922394 bytes, SHA256 `4522e6177eed263839b9426a8a7b53153a0b3c0ef588fee08f2c72335d6a5693`; configuration hash `96892b2e43db8393fcc803cacdfdd41d1d4dce164ecbebe104ff4ca34eec0890`;7 bindings,3 flags false.

At **13:27:11.279 UTC**, canary `agent-friendly-web-delegated-canary` accepted closed version `002aa960-3729-4eed-a403-a3c437f1b48c` / deployment `93eea12a-670b-460a-8a91-fcfac1da6ba4` at100%. It has the exact new PR595 module,29 bindings,8 flags false; configuration hash `bf1d2527f6ddc9b4d8f613c1b62b6474f82acb8f0fcefc81d500831e2509aa12`.

Each resource used exactly one inactive-version POST and one promotion POST, with matching ACK ID and primary deployment readback; no force, replay or automatic rollback. Schedules/tails empty and workers.dev/previews false for both; the original fixed Containers application's active instances were empty during the guarded preparation. These are dated observations, not future liveness guarantees.

Only the respective owner-approved reader secret inherited its exact owner-saved version; all other bindings/settings inherited the original closed baseline. The saved canary version with OAuth true was **never promoted**. The two readers expire **2 November23:59:59 Argentina /3 November02:59:59 UTC**; no automatic renewal. Stored secret-value functionality has not yet been demonstrated by this deployment metadata.

Original closed rollback material remains canary `80b93af7-bb7d-488e-aed5-4b0d23a3217d` and operator `45fded93-99e0-4365-bb11-81c79c07d61e`. No rollback may blindly overwrite legitimate later activity or be inferred from an uncertain ACK.

The operation's single review found0Critical/2Important/0Minor. Six pure cases first reproduced unsafe acceptance (RED13:18:46.985UTC;0writes); fixes reject malformed/contradictory present ACK IDs and require valid complete catalog UUIDs including both original and saved version pins. Eighteen cases then passed for each target in GET-only preflight (13:24:14.542/13:24:46.290UTC). No second review seat. This operational review is distinct from this PR's pending source review.

## Qualified public artifact and new pin

Public build [40325153160](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/40325153160), attempt1, job121579830414, succeeded on source `d0866e0191378edda873dcf7322db9ac30350dba` / tree `994ebe0848bf73640f49a21807b6399d234f7a98`.

Artifact12649784136: ZIP347279bytes, SHA256 `1314ccfefd44fdaa2c0a5239f27f0aa2f1984cc22bd3465f5e474e670c5b018d`, expires2Nov12:47:22UTC. It was verified in bounded RAM transfer, with exactly two entries, decompression/size caps and exact manifest/hash comparison; no local files, dependencies or build.

The new frozen pin records:

- Actual accepted closed baseVersionId: `002aa960-3729-4eed-a403-a3c437f1b48c`.
- Module1794163bytes, SHA256 `36cf318bc97ff4eda7b5956e705fbebd644cce818c06bf197401732c2a7babd6`.
- Source revision/tree above and `sourceCheck=git-inputs-before-after-v1`.
- Unchanged finite Node program SHA256 `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6`.
- artifactKey `4b1259d4ffbe9f6a277c1886faf0d1be40c7aba7dae5917eeed41678df116cd5`, SHA256 of JSON([fixed AFW account ID, fixed canary name, exact new workerHash]).

The old package12621119852 contains historical3d4e9d5/module26ec0366. It cannot be treated as this corrected source. The existing named-package workflow must rebuild the new pinned revision using its own lockfile and run its actual native tests; success/receipts are still required for the carrying PR/head.

## Remaining real-trial gates

No OAuth window, delegated grant, monitoring consent, cron, subscription, event consumer, Container start, private dossier read, mail or Max action was admitted by this block. Both runtimes are closed. `operationalReadiness=false`; no permanent guard or PC-off acceptance.

Before the next synthetic trial: qualify the new main public package, verify stored readers through the bounded private path, prewarm the human Access session and existing native/Work receivers, obtain the specific new delegated permission, then dispatch the cloud check immediately. Leave time for native withdrawal and primary physical closure inside the original window. Summary-read success alone is not events/subscribe, useful review, native unsubscribe or physical stop. Gabriel's PC remains on; do not request shutdown until the full prerequisite chain is accepted.
