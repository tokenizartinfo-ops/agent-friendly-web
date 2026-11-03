# Closed pre-Entry custody host — partial source checkpoint

Status: **incomplete; not suitable for integration or promotion**. This checkpoint does not implement the requested host, Workflow path or controlled controller. It creates no Entry, admission or effects authority. `operationalReadiness=false`, `completePackage=false`.

Base: `68ae439241a2e9cfe5b7df3a841467a80820adb1`. A focused comparator and test were added at `5206bd861ac47a0c75adf313cc4d9d315910f037`. The comparator is not wired to a controller and does not validate completeness, resource identity, immutability of snapshots, or provider recovery. It must not be used alone as a live gate.

The owner ruling permits distinct active-version and script-settings baselines: compare each captured profile against its own expected profile. Identical profiles are not required. The dated canary difference is not permission to normalize either surface. An unexplained change, unsafe settings mutation or inability to preserve/recover both blocks a future operation.

RED: Actions run `41690688037`, job `126108145073`, on `2b9ce0609f57c7f91dc18580d125e5caa1d7b02c`: the focused test failed on the absent function. GREEN for that focused step: run `41690774958`, job `126108447283`, on `5206bd861ac47a0c75adf313cc4d9d315910f037`; the wider job was still running when this checkpoint was written. The temporary qualifier is excluded from integration.

The actual baseline module is `closed-rollback.mjs`, 395915 bytes, SHA-256 `4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f`, version `c570b60b-95dc-48e1-89f3-9c4651691dbc`. Historical qualification obtained it with provider credentials and retained a receipt, not the module, in the artifacts inspected. Per ruling, exact inherited-method qualification may remain an explicit pre-promotion gate when no credential-free copy is available; a future qualification must reject missing or mismatched bytes. No assertion is made that a source fixture equals those bytes.

Outstanding: implement and exercise the fixed actor wrapper and Workflow, holder and promise retention checks, exact-module verification hook, independent configuration capture and complete drift/restore enforcement, fixed controller/command/claim, lifecycle and uncertainty tests, artifact/source hashes, native inherited RPC inventory and review. No provider calls, live deployment, dispatch or credential use was performed in this checkpoint.
