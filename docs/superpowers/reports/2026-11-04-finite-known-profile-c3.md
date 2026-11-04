# Checkpoint 3 — explicit finite roles and source qualification

2026-11-04 UTC. SOURCE ONLY; implementation handoff pending root's independent task review and parent opt-in acceptance. PROJECT AFW; REPOSITORY `tokenizartinfo-ops/agent-friendly-web` (1347578006); ENVIRONMENT sole feature branch and credential-free GitHub Actions; ORIGIN GitHub source API (no product origin contacted); RESOURCE_TYPE source/tests/scoped qualifier; RESOURCE_ID `feat/finite-native-cleanup-20261101`; ALLOWED_ACTION Checkpoint3 implementation and bounded source qualification; ROLLBACK revert this unit against a verified branch head before promotion. All writes used expected-head CAS. No PR/main/merge/deploy action.

## Revision boundary

- BASE `e280a297f4c2ea3f38ea3fc4ac157439415708be`, tree `0fb1d342bb8b210738765d6a4bcc14454b1714f8`.
- Initial regression commit `0221c1b846dd258aa345e6705702ef162f79aff6`; strengthened runtime-causal RED `53256405e5525372efda40673b42282fe0da0935`.
- Product integration and five-group qualification `2b2af6989a243d7a99beb882e24bd62d5a50a965`, tree `83a0434da82c685e5f2930af3433ef162c6cfef8`.
- Exact final code/compiler HEAD `6d17d438becca708da5baae70129c73fc118bf98`, tree `b67e2d939637b07695b9cabe645aa879d96962ef`.
- The delta from five-group HEAD to compiler HEAD is two test-only edits (rename a lint-reserved identifier; retain historical private-digest assertions in a separate legacy case) and the temporary qualifier. Product implementation is byte-identical across those heads.
- Report/cleanup HEAD is this document's containing commit; its exact SHA is recorded in the root delivery handoff after CAS. It removes `.github/workflows/finite-known-c3-qualification.yml` and `.github/workflows/finite-request-signal-opt-in-qualification.yml` and adds only this report. It does **not** inherit compiler module hashes.
- Neither removed qualifier is a compiler-bound input. The established `afw-finite-native-package.yml`, `afw-finite-qa-bootstrap.yml`, bootstrap CLI, compiler and finite Wrangler files are unchanged. The compiler's source revision/tree remain exactly the code/compiler HEAD above; no equivalence to a later source revision is claimed.
- Parent `2026-11-04-finite-request-signal-opt-in-checkpoint.md` is preserved separately and unchanged.

## Consumer map and preserved invariants

The pinned brief and root clarifications select fixed finite APIs only for candidate consumers, with no probing, fallback, compatibility normalization or strategy callback.

| Product file under lib/ | Final change |
| --- | --- |
| mcp-qa-finite-initial-owner-source.mjs | Hash initial current baseline with finiteActivationConfigurationHash. |
| mcp-qa-finite-preparation-cleanup.mjs | Correlate current capsule/initial-baseline configuration with the finite hash. |
| mcp-qa-finite-policy-setup.mjs | Use finite hash for baseline receipt and expectedFull.activationHash; keep legacy validateReleaseOperatorBundle for configuration-free publish validation. |
| mcp-qa-finite-policy-transport.mjs | Candidate-only configuration()/wire and finite phase/Plan correlations; separate private historicalConfiguration(). Existing internal readVersion closed=false/true selects candidate/historical validation and comparison for BOTH returned metadata and expected pin. Existing qualifyFiniteWorkerVersion and restoration digest checks remain. Installation uses fixed finite named resolver/history. |
| mcp-qa-finite-preparation-records.mjs | Baseline and rollback activation checks explicitly use their property names: finite baseline, legacy rollback. Common structural/restoration checks, record schema, hash domains and sealed records remain unchanged. |
| mcp-qa-finite-profile.mjs | canaryLive privateFull.activationAlgorithm is exactly finiteActivationConfigurationHash; qaLive remains null. |
| mcp-qa-finite-confirmation.mjs | Fixed finite bundle validator and runFiniteKnownCancellationReleaseWorkflow with exactly bundle/env/event/step; original objects, clocks, reread, result and provenance checks unchanged. |

Checkpoint1 primitives and Checkpoint2 shared lifecycle implementations are unchanged, as are the unavailable current confirmation source, native mounts, bridge/receiver/retention engines, historical pins, policies and source ceiling. No public role/hash parameter, authority DTO, producer or mount was added. Existing primary grant/history/identity checks, all18 hooks, original70s parent,5s/20s children, actual pending retention and one-use/no-replay remain owned by the accepted unchanged lifecycle.

QA date2026-09-07/flags [nodejs_compat,enable_request_signal] and M date2026-09-07/flags [nodejs_compat,global_fetch_strictly_public,enable_request_signal] remain exact. Legacy M compatibility pair is unchanged.

Tests changed: `mcp-qa-finite-profile.test.mjs`, `mcp-qa-finite-preparation-records.test.mjs`, `mcp-qa-finite-policy-transport.test.mjs`, `mcp-qa-finite-policy-setup-native.test.mjs`, `mcp-qa-finite-confirmation-native.test.mjs` and the affected `mcp-qa-finite-initial-owner-source-native.test.mjs` assertion. Two synthetic fixtures changed: `finite-connection-source.mjs` hashes new candidates with the finite function; `finite-policy-setup-worker.mjs` separates candidate baseline from legacy rollback and hashes candidate receipts correctly.

The new private-engine transport harness exposes its private function only through test esbuild instrumentation; the production factory/API is unchanged. Cases independently swap actual metadata, expected pin and both sides for each trusted role; wrong roles and historical wire are denied with zero HTTP writes. Mixed SetupContext roundtrip accepts candidate+historical and rejects either swapped role. Candidate private projection equality does not conceal full-hash changes, invalid private policy still fails finite bundle validation, and separate legacy hash/bundle positives remain strict. Confirmation's spy verifies only fixed-entry selection, exact four keys, object identity and preserved result; it does not stand in for the unchanged actual lifecycle tests.

## Causal evidence and qualification

All runs below are attempt1 on Ubuntu24.04, Node22, contents:read, checkout persist-credentials:false and `npm ci --ignore-scripts --no-audit --no-fund`. Qualifier push triggers were restricted to its own path and the sole feature branch. Initial/final jobs were bounded10minutes; five independent affected groups were bounded15minutes each. No local clone/build/dependencies or persistent local process was created.

| Run / job | Exact head | Outcome |
| --- | --- | --- |
| [41932606891](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41932606891) /126933021507 | 0221c1b846dd258aa345e6705702ef162f79aff6 | Initial tests-first RED: consumer29tests25PASS4FAIL; native50tests24PASS26FAIL; zero skip/cancel.18 native failures were an old-export spy mismatch, preserved as harness evidence rather than presented as18 behavioral regressions. |
| [41932827397](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41932827397) /126933773532 | 53256405e5525372efda40673b42282fe0da0935 | Strengthened runtime-causal RED: consumer30tests25PASS5FAIL; native50tests39PASS11FAIL; zero skip/cancel. Legacy spy export remains a trap, so candidate rejection occurs at actual consumer validation. Separate last-upload diagnostic2PASS/0FAIL/0skip/0cancel in3458.271ms. |
| [41933043117](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41933043117) /126934495685 | 2b2af6989a243d7a99beb882e24bd62d5a50a965 | Consumers30/30PASS,18554.540ms. Lint then caught test-only reserved identifier module:1error/16existing warnings. Overall run remains failure in history; final correction below supersedes only that lint issue. |
| Same run /126934496106 | same | Owner setup/connection/source/cleanup/confirmation93/93PASS,158085.908ms. |
| Same run /126934495924 | same | Isolated full initial-upload48/48PASS,116693.025ms. |
| Same run /126934496011 | same | Profile/phase/bootstrap/historical68/68PASS,21573.217ms. |
| Same run /126934496033 | same | Original native conduit/cancellation/retention14/14PASS,32551.884ms. |
| [41933565130](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41933565130) /126936252164 | 6d17d438becca708da5baae70129c73fc118bf98 | SUCCESS: consumers30/30PASS,15874.422ms,0fail/skip/cancel; npm run lint0errors/16existing warnings; one actual compilerPASS. |

The five affected groups total253PASS,0FAIL,0cancel,0skip at product-integration HEAD. Final consumer assertions are rerun after the two test-only changes. No positive expectation was weakened to pending/blocked. Existing uninstalled-source negative cases remain.

Exact five-group commands:

- consumer: `node --test test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-policy-transport.test.mjs`
- owner-integration: `node --test --test-concurrency=1 test/mcp-qa-finite-policy-setup-native.test.mjs test/mcp-qa-finite-connection-preparation-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs test/mcp-qa-finite-confirmation-native.test.mjs`
- initial-upload: `node --test --test-timeout=180000 test/mcp-qa-finite-initial-upload-native.test.mjs`
- profiles-history: `node --test --test-concurrency=1 test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs`
- cancellation-retention: `node --test --test-concurrency=1 test/mcp-qa-finite-owner-native-conduit-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs`

Causal RED boundaries are mixed SetupContext/current candidate acceptance, wrong-role historical acceptance, descriptor naming, native setup before its expected two effects and finite confirmation before Known. Candidate private-hash primitives already pass at BASE because Checkpoint1 was accepted; they are retained regression coverage, not falsely labeled newly failing primitives.

The existing actual finite Known native/unit lifecycle positives and legacy positives were accepted in [Checkpoint2](2026-11-04-finite-known-profile-c2.md) at1bc37f26df3837780c295dafc366f1ad7694370f/run41930295369/job126925170305 (90unit+90nativePASS). Their implementation/tests were not stubbed or changed in this checkpoint. This checkpoint adds actual native setup installation through candidate+historical reads and fixed finite resolver/history, and verifies the actual finite confirmation wrapper with its limited identity spy. It does not claim the unavailable material producer is installed.

## Initial-upload timeout disposition

The preserved earlier run41924366907/job126904758765 atab85ac8f9e0e1383d573d49fee6742c04976e5b1 executed historical and initial-upload files together with `timeout 180s node --test --test-timeout=120000 ...`. It ended82PASS/0assertionFAIL/1fileCANCEL at120000ms. That is not a completed acceptance.

Correction to the dated checkpoint's wording: `ok52 baseline-module` is the combined TAP ordinal after six historical top-level cases. The log contains46 successful B2a initial-upload cases, not52. The next uncompleted case is `publisher-revoked-before-send`, followed by `upload-config-tamper`; no initial-upload test was removed. Both were isolated with `node --test --test-timeout=30000 --test-name-pattern='publisher-revoked-before-send|upload-config-tamper' test/mcp-qa-finite-initial-upload-native.test.mjs` and passed2/2 in3.458s,0skip/cancel.

The complete unchanged48-case file then passed alone in116.693s with an explicit180000ms file bound. The prior measured held-send/sync/http/body cases each legitimately took roughly6.9–7.7s, and final cases settled normally. Evidence supports cumulative fixture/real native work exhausting the old file bound, not a hung last case. Only the CI/test file bound changed; no product clock, budget, HTTP engine or expected outcome changed. The removed qualifier leaves no persistent test-timeout change in product/tests. The historical82PASS/1cancel result remains recorded, not erased.

## Historical byte equality and self-review

Exact Git blob equality was checked against both `aed54dab23b644481aed01cf6b5b94249ecf9f23` and this checkpoint BASE, then against delivered source:

| Protected path | Identical blob SHA |
| --- | --- |
| `lib/mcp-qa-finite-historical-source.mjs` | `3f0bf487efd72aa2356fd9982f98a938d328e72d` |
| `lib/mcp-qa-cloud-closed-pins.mjs` | `26213123304eea25e652a52d808d25b7e0e3475e` |
| `worker/independent-closure/closed-rollback.mjs` | `74b87e3a0e8a499f3d5b359886ef428125ee391b` |
| `worker/mcp-own/closed-rollback.mjs` | `5a57af44ad742207d648738482f873ca77bd9197` |
| `wrangler.independent-closure-qa.rollback.jsonc` | `cabb0a1d7e9b8938abe2065d72ef42577ca3f09d` |
| `scripts/mcp-confirmation-frozen-artifact.json` | `44dfba0436a7711c7ddb94e848cd8cf79f480abc` |
| `scripts/mcp-qa-legacy-historical-context.json` | `00f2f95361a107746323a7cd0138f55abf1270a2` |

No historical2607/c570 source, configuration, module, QA_CLOUD_CLOSED_PINS, sealed Plan/capsule/record or historical digest was rewritten. The full BASE diff was self-reviewed: seven mapped product consumers, scoped fixture/tests, qualifier administration and this report only. The final compiler-bound files and11 protected C1/C2/source/compiler inputs were also compared byte-for-byte. Fresh independent root review remains a separate gate; this report is not self-acceptance.

## Exact final compiler

Run41933565130/job126936252164/attempt1, sourceRevision `6d17d438becca708da5baae70129c73fc118bf98`, sourceTree `b67e2d939637b07695b9cabe645aa879d96962ef`. One invocation only after final source/test edits. Exact metadata follows (residency content omitted by construction):

```json
{
  "sourceRevision": "6d17d438becca708da5baae70129c73fc118bf98",
  "sourceTree": "b67e2d939637b07695b9cabe645aa879d96962ef",
  "sourceCheck": "git-inputs-and-configuration-before-after-v1",
  "buildWorkflowHash": "ad4909bfc16a9bb8d7a43455487beb4be914ef0744dbd530efad1061bc90958c",
  "bootstrapSource": {
    "sourceRevision": "6d17d438becca708da5baae70129c73fc118bf98",
    "sourceTree": "b67e2d939637b07695b9cabe645aa879d96962ef",
    "workflowHash": "ff64a890db1b55f8ed922e036673ebaf0a494c4833023bbc3317f28c6ededd14",
    "cliHash": "b9f94bc12537c58f4716db37754ae106ae6d1ed420ca2ecb1c4f30be0f9d2752"
  },
  "modules": {
    "canaryLive": {
      "provenance": {
        "kind": "compiled-source.v1",
        "sourceRevision": "6d17d438becca708da5baae70129c73fc118bf98",
        "sourceTree": "b67e2d939637b07695b9cabe645aa879d96962ef"
      },
      "module": {
        "name": "index.mjs",
        "sha256": "f0074ae1b16134c9a7622270ef14275bfd4efd9687d88952336e348e47bae7cf",
        "bytes": 1951515,
        "exports": [
          "AfwNodeControl",
          "AfwOwnEventNode",
          "default"
        ]
      },
      "publicStatic": {
        "purpose": "afw.finite-public-static-profile.v1",
        "configurationHash": "443c0eb833ba7b70419419533c72023b9e4c27f76f7f2faf33217b4591ad1b36",
        "profileHash": "6203717476c095a0035bcfac8d38cf8f6f20bc105e23fac859eef1704525dccb",
        "bindingsHash": "9ac9576919b2a68da89c02cd6819f1246f27929e61754a46d804ec7dd9c2a169"
      }
    },
    "qaLive": {
      "provenance": {
        "kind": "compiled-source.v1",
        "sourceRevision": "6d17d438becca708da5baae70129c73fc118bf98",
        "sourceTree": "b67e2d939637b07695b9cabe645aa879d96962ef"
      },
      "module": {
        "name": "index.mjs",
        "sha256": "066ac5238b48eb6f1e2abe1754de106ab04f079e23c2800588cb806c6e6e9bd2",
        "bytes": 2011367,
        "exports": [
          "IndependentClosure",
          "PrivateQaBootstrap",
          "PrivateQaCatalog",
          "PrivateQaNamedConfirmation",
          "PrivateQaPreregistration",
          "default",
          "observePrivateQa"
        ]
      },
      "publicStatic": {
        "purpose": "afw.finite-public-static-profile.v1",
        "configurationHash": "10310c65ec4755832fb952c316b915a311d194c87c3d4a368408041eca335e4e",
        "profileHash": "ab0933e0db27a5343b8e6605c99828b135e54c98655f9934dd0ef34a7f1ec0fc",
        "bindingsHash": "787e1c9a54bae96d68f55f5ba98acc322f7dc310e495c2c17092c4b4e324cbfd"
      }
    }
  },
  "residency": {
    "purpose": "afw.finite-candidate-residency.v1",
    "encoding": "gzip-base64.v1",
    "sourceRevision": "6d17d438becca708da5baae70129c73fc118bf98",
    "sourceTree": "b67e2d939637b07695b9cabe645aa879d96962ef",
    "sourceCheck": "git-inputs-before-after-v1",
    "programHash": "f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6",
    "module": {
      "name": "index.mjs",
      "sha256": "f0074ae1b16134c9a7622270ef14275bfd4efd9687d88952336e348e47bae7cf",
      "bytes": 1951515
    },
    "compressedSha256": "d1b0df540bf28eab08644d31b7785689943deb80d777ce40a4b962b1c2522ba7",
    "compressedBytes": 383635
  },
  "completePackage": false,
  "operationalReadiness": false,
  "PCoff": false
}
```

The call is exactly `compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:process.env.GITHUB_SHA})`. Its unchanged source/template/entry/bootstrap/residency guards pass against a clean exact checkout. Original M<=2097152 and QA<=3145728 byte ceilings are unchanged. Logs contain only source/tree/module metadata and public hashes; no private bundle/material/candidate bytes or secret was logged or uploaded. This is source compiler staging, not a complete package or deployment attestation.

## Warnings and remaining boundary

Final lint:0errors/16existing repository warnings (image optimization, anonymous exports, unused fixture variables). npm emitted existing deprecations for @esbuild-kit/esm-loader, @esbuild-kit/core-utils and eslint9.39.4; Node punycode and Actions checkout@v4/setup-node@v4 Node20-to24 warnings remain. Initial-upload emitted34 existing RPC-stub disposal warnings and nevertheless reached terminal48/48PASS; these were not suppressed or mistaken for physical completion. The four matrix jobs outside consumers intentionally skip their conditional lint step; no test skip/cancellation occurred. No dependency upgrades or unrelated cleanup were introduced.

All native tests use synthetic provider/custody/owner/grant/source inputs around actual isolated workerd/DO/D1 mechanics. Actual receiver aborted-while-held/before-guard observations and pending work retained through physical settlement passed unchanged in the affected-source group; this was a regression run after integration, not a new flag experiment.

No provider/runtime write, Entry/DDL, permission/grant, credentials/OAuth/OTP, schedule/cron/Max, generic outbound, reserved occurrence consumption, new budget or other-project operation occurred. Current source C2/material producer, user consent/notice/finite prearm, cleanup handoff and remote rollout remain incomplete/unmounted. Full broad repository CI and parent opt-in acceptance remain root-owned later gates, not claimed by these scoped runs.

Source ceiling `2026-11-03T02:59:00Z` remains expired. **operationalReadiness=false; completePackage=false; PCoff=false.**
