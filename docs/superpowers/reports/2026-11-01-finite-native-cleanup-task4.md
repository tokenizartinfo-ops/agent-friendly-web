# Task4 — finite native composition checkpoint

Status: NEEDS_CONTEXT; Task4 is NOT complete. Source-only. operationalReadiness=false.

Repository: tokenizartinfo-ops/agent-friendly-web.
Branch: feat/finite-native-cleanup-20261101.
BASE: 8e3b6b2d1ba508b758ddacc2741149fb9b47dd91.
Qualified partial code/test HEAD: 9fe8664d57958d8ec5a9dfbe9a9ffa98bb7d92e5.
This report and the progress append are documentation children of that checkpoint.

## Completed independent containment slice

The actual canary AfwOwnEventNode now has an explicit compiled entrypoint-family discriminator. The finite_trial_event build rejects legacy deliverOwnSaved and deliverSaved before inspecting environment, constructing the host, or reaching authorization/readiness/storage/budget/transport. Its scheduled legacy-event entrypoint returns null before policy reads. The default build retains existing routes. The compiler discriminator alone is NOT source/profile/binding provenance or authority.

Production change: worker/mcp-own/index.mjs.
Tests: test/mcp-own-finite-entrypoints.test.mjs and test/mcp-own-finite-entrypoints-native.test.mjs.
The first executes the actual bundled class with synthetic platform base classes and capability traps. The second executes the actual class under workerd/DO with fixture-only traps. No real credentials, grant, provider or Container authority was installed.

RED: test fb0264cd705727084ccc517bf7eef068d7d4ad20; qualifier 044b1718cb8369e1b1b8f2bbdd4abb9516ecd207.
[Run41334724548](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41334724548), job124932010328: 2 tests, 0PASS, 2 expected failures. Legacy delivery touched AFW_DOSSIER_EVENTS_ENABLED; legacy scheduler entered policy handling.
Initial GREEN source9b59ef1510e97f19762fa58c7e63c040b8e62b8d, run41334855215.
Expanded GREEN [run41334946894](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41334946894), job124932675671 at9fe8664d: 7PASS/0FAIL, scoped lint clean. It includes actual native finite receiver, preserved closed native surface, historical close and retirement tests.

Exact hosted commands:
```sh
npm ci --ignore-scripts --no-audit --no-fund
node --test --test-reporter=spec test/mcp-own-finite-entrypoints.test.mjs test/mcp-own-finite-entrypoints-native.test.mjs test/mcp-own-worker-native.test.mjs test/mcp-own-worker-historical-close.test.mjs
npx eslint worker/mcp-own/index.mjs test/mcp-own-finite-entrypoints.test.mjs test/mcp-own-finite-entrypoints-native.test.mjs
```

## Concrete material-selection question sent to root

Actual native preview receives only {intentId,sourceRevision}, before GHA persists admission/readiness. The Task1 immutable plan requires the original command ID/T0, exact finalizer run/job, five deployment/module pins and the QA live module hash. Compiling that complete plan into the QA artifact would self-reference its own module hash and require deployment/job IDs that do not yet exist.

Existing private draft/artifact/history helpers provide named bundle and raw predecessor material, but no reviewed immutable finite intent-to-original-command/finalizer-run seed channel was identified. Existing GHA persistAdmission occurs AFTER preview and itself commits planHash; it cannot bootstrap the preview without a cycle. The default external source constructor has no concrete qualified candidate artifact locator. Native env currently has no identified qualified GitHub read-custody alias for these new reads.

Root must select the exact source-qualified seed/reference acquisition protocol or point to the existing intended immutable artifact/record and its authenticated binding before implementation of those dependent factories. No latest-run/comment fallback, caller JSON plan, guessed job, new raw schema, fabricated metadata or new custody has been introduced. Task5 launcher/adoption design remains separate.

## Required Task4 work still absent

Actual source/native factories, full first-primary raw producer, external technical artifact constructor, finite QA/canary packaging and closed-compatible artifact checks; real fixed QA readFiniteOwnEventControl and concrete resolver/deliverFiniteOwnSaved; original-event Known wrapper mount and same-instance prepare/guard/claim integration; full subscription/custody/launch/save/capture/delivery/native-withdraw/close route; entered legacy awaits, signed packets, held cross-generation transactions and complete scoped writer exclusion. Existing accepted Task1–3 behavior was not altered to impersonate these capabilities.

The 7-test checkpoint does not qualify the whole profile, alternate consume/HTTP paths, full source pipeline, cleanup installation, deployment provenance or rollback artifacts. The finite profile has NOT been built, deployed or activated. No real finite occurrence was spent.

Temporary .github/workflows/finite-task1-temporary-qualifier.yml is branch-only, read-only permissions/no secrets and EXCLUDED from final integration. No local code, dependency, temporary file or build was created. No runtime/CF/private probe, credential/role/token/OAuth/schema/DDL/provider/Max action, live command, full suite, merge or subagent was used. Full Task4 completion/review/whole-source CI and separately authorized promotion remain pending.
