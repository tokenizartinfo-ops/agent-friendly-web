# Private QA installation

Goal: install the existing V2 catalog and primary approval through an internal operator boundary, with no consumer-provided authority.

Scope: source preparation only. The administrative `readInstallation()` source and `readProvisioning()` verifier must independently attest real provider creation, managed cloud custody and inventory. Tests use synthetic administrative fixtures and do not prove those attestations or a hosted installation.

Interface: `createPrivateQaInstaller({storage,db,readInstallation,readProvisioning,now})` returns only `install()`. Arguments to install are ignored. `readInstallation()` returns exactly `{registration,approval}`. Current V2 registration and full D1 approval must match. Primary D1 uses first-primary. No HTTP/RPC export, binding, namespace, credential or remote activation in this task.

Order: validate private input/proof/window; reserve one immutable installation marker in a DO transaction; create primary approval; recheck proof; atomically write QA registration, exclusive token reservation and reader pointer, marking installation complete. Failed partial install retains history and revokes only its own newly created primary approval. A pending marker after interruption requires operator recovery, never automatic resumption. Existing/conflicting pointer, token owner, QA record or approval is never overwritten. Duplicate completed installation validates current reader and returns installed without writes.

Task 1:
- [x] Write installer tests on real SQLite D1: missing private authority, full digest mismatch, successful reader reconstruction, completed replay, proof withdrawal after D1 approval, deadline during final write, conflicting existing approval/pointer/token, interrupted reservation. Expected RED: missing module.
- [x] Implement installer and run `node --test test/assistance-private-qa-installer.test.mjs test/assistance-private-qa-catalog-host.test.mjs`. Expected all pass.
- [x] Review full change independently; repair important findings with RED/GREEN.
- [x] Run proportional tests, lint and build before integration; document actual remaining emitter/custody/mount/hosted/cloud adoption gates.

Review focus: cross-store failure and lost acknowledgement; never revoke another approval or modify an existing reader pointer; pending cannot authorize; transaction rollback preserves token ownership; caller payload/metadata never becomes provenance; no public installer export.
