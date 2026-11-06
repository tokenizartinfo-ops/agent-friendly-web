# Whole-branch review packet 25/26 — docs

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 16 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- docs/superpowers/reviews/packages/2026-11-04-finite-request-signal-final-slice.diff.json: ABSENT -> 7893e1bbe2a34e4d7d6e4290d9ee41fea74b613e; full diff chars=53592
- docs/superpowers/specs/2026-11-01-finite-material-bootstrap-correction.md: ABSENT -> 34593b6a13f49efc804cc874f94a15ab0b601e88; full diff chars=22736
- docs/superpowers/specs/2026-11-01-finite-native-confirmation-cleanup.md: ABSENT -> 9e66850d045bc150a929f2dc79cb830cebbc514d; full diff chars=51524
- docs/superpowers/specs/2026-11-01-finite-native-launch-adoption-design.md: ABSENT -> 922a650103806498034ede57cf45081afa7ca909; full diff chars=23076
- docs/superpowers/specs/2026-11-01-finite-private-policy-setup.md: ABSENT -> f1b984ef1983d0fa62cfecd67d4119657bf2d6a6; full diff chars=66388
- docs/superpowers/specs/2026-11-01-finite-profile-package-design.md: ABSENT -> e2c484cfb84d625b5d012f3431b38fc91103ae1f; full diff chars=21469
- docs/superpowers/specs/2026-11-01-finite-qa-code-provenance-bridge.md: ABSENT -> 2ea03c55d7fe8a51c07eeac7445286484b4c1f56; full diff chars=13112
- docs/superpowers/specs/2026-11-02-finite-initial-cleanup-owner.md: ABSENT -> 7130bc28cdbc3d5a21eed17e151c7a1fdd27d3d2; full diff chars=11885
- docs/superpowers/specs/2026-11-02-finite-initial-inactive-upload.md: ABSENT -> 8f6d32eda2415c4e45dedfae1736b903b055f8f6; full diff chars=11079
- docs/superpowers/specs/2026-11-02-finite-initial-material.md: ABSENT -> e588ebd2ed0c5cb112778236449eccc8c3a71228; full diff chars=19048
- docs/superpowers/specs/2026-11-02-finite-initial-native-entry.md: ABSENT -> 52360323b92e3918c509a7dbe5394c70d1a1faa3; full diff chars=8166
- docs/superpowers/specs/2026-11-02-finite-pre-t0-qa-provenance.md: ABSENT -> d1b7b05c47f1d9e0562e3aeaa7c04d07f7c9e7f0; full diff chars=8713
- docs/superpowers/specs/2026-11-03-finite-initial-activation-coordinator.md: ABSENT -> 13d52f03879cb7c65f4e44f853b8c149846297ca; full diff chars=4022
- docs/superpowers/specs/2026-11-03-finite-initial-capsule.md: ABSENT -> 723110d91f8af336e07beb004c572fd16ea04907; full diff chars=5826
- docs/superpowers/specs/2026-11-03-finite-readonly-host-mount.md: ABSENT -> 51e64c5d46d765ef4e1c1bcf3ab672a9a755333e; full diff chars=6695
- docs/superpowers/specs/2026-11-03-finite-readonly-host-unit-a.md: ABSENT -> 7d2e5cc433ad8edb21d1045cb7de343e43c415ef; full diff chars=2416

## docs/superpowers/reviews/packages/2026-11-04-finite-request-signal-final-slice.diff.json

~~~~~~~~~~diff
diff --git a/docs/superpowers/reviews/packages/2026-11-04-finite-request-signal-final-slice.diff.json b/docs/superpowers/reviews/packages/2026-11-04-finite-request-signal-final-slice.diff.json
--- /dev/null
+++ b/docs/superpowers/reviews/packages/2026-11-04-finite-request-signal-final-slice.diff.json
@@ -0,0 +1,269 @@
+{
+  "purpose": "Complete final six-patch original signal/profile slice; accepted compatibility checkpoints excluded explicitly",
+  "base": "aed54dab23b644481aed01cf6b5b94249ecf9f23",
+  "head": "949d84784e83f8859421242edeab3f68c5db93a3",
+  "commits": [
+    {
+      "sha": "1d601fcce56f0f98d10a0ad32f4a5737d6b55dc0",
+      "message": "test(afw): require actual finite receiver signal abort"
+    },
+    {
+      "sha": "d2e5d8ce513ada7c9ecb19829a2bff60c5597cd5",
+      "message": "feat(afw): test exact finite incoming signal opt-in"
+    },
+    {
+      "sha": "c338f90c9ce29f6dbbfff70274e1c7f070c6a38c",
+      "message": "test(afw): verify exact finite profiles and receiver guard settlement"
+    },
+    {
+      "sha": "ccc7624e52c54884691343c0495bbe17c06dcd56",
+      "message": "test(afw): distinguish logical receiver return from retained native read"
+    },
+    {
+      "sha": "e29fe8ec607e3ac702a3b09f6795a694c2723195",
+      "message": "test(afw): await physical reader cancellation after release"
+    },
+    {
+      "sha": "e7ed164d08dddd4f2fca0004d54c8ea52a3688d5",
+      "message": "test(afw): keep old activation fixture pinned apart from new candidates"
+    },
+    {
+      "sha": "ab85ac8f9e0e1383d573d49fee6742c04976e5b1",
+      "message": "ci(afw): isolate finite compilation and historical diagnostics"
+    },
+    {
+      "sha": "62307cbad80455689486ff52e2216867bfecddcc",
+      "message": "ci(afw): inventory finite candidate hash call sites"
+    },
+    {
+      "sha": "e6f6aff834fdf0b9af78665e98c6835e90911077",
+      "message": "ci(afw): use available scoped grep for finite hash inventory"
+    },
+    {
+      "sha": "bd923bab7225212e35e054b14c132de78195ec5e",
+      "message": "ci(afw): complete finite bundle hash call site inventory"
+    },
+    {
+      "sha": "3fb1751c901059c9acdb2a9f1de2f6470b9f3c41",
+      "message": "docs(afw): checkpoint signal opt-in evidence and Known path blocker"
+    },
+    {
+      "sha": "48462cdc36315f91b5417df9e8333cd6601f270d",
+      "message": "docs(afw): activate strict finite compatibility primitives dependency"
+    },
+    {
+      "sha": "b6f482b87916018822430dd77aaa4b5e73802f06",
+      "message": "test(afw): RED finite known C1 fixed exports"
+    },
+    {
+      "sha": "06d8f29c574454056b19c2b6b3e867a728605f54",
+      "message": "feat(afw): add strict fixed finite activation primitives"
+    },
+    {
+      "sha": "a81a6db504ced20b5601cdf37f698b8a039fae2f",
+      "message": "test(afw): pin legacy digest and operation boundary"
+    },
+    {
+      "sha": "fb7b89885033749c10264095ccadeb252d0e78c8",
+      "message": "fix(afw): sanitize finite bundle validation errors"
+    },
+    {
+      "sha": "a8dd66018fd731154d3289554c69f3766a147a52",
+      "message": "docs(afw): report finite known C1 and remove scoped qualifier"
+    },
+    {
+      "sha": "c9809d79d7e4e918e595da829a2109fdc71f453a",
+      "message": "docs(afw): accept strict finite primitives and activate shared lifecycle task"
+    },
+    {
+      "sha": "8168e64efa56eef8240b9efded5992caa4f1cb9c",
+      "message": "test: specify fixed finite Known lifecycle and native source qualification"
+    },
+    {
+      "sha": "0df957482755f4ef6e718e759bff2e69b50517ba",
+      "message": "feat: share private release lifecycle behind fixed legacy and finite Known entries"
+    },
+    {
+      "sha": "1bc37f26df3837780c295dafc366f1ad7694370f",
+      "message": "test: observe finite credential reads and untouched native string payload"
+    },
+    {
+      "sha": "a3b4f94758a610495d8ff72d0277c9c197b60da9",
+      "message": "docs: record finite Known C2 qualification and remove own qualifier"
+    },
+    {
+      "sha": "2f3d11f7aa0381fed24265ef4f74129ff96500c4",
+      "message": "docs: correct C2 BASE tree provenance"
+    },
+    {
+      "sha": "e280a297f4c2ea3f38ea3fc4ac157439415708be",
+      "message": "docs(afw): accept finite lifecycle and activate explicit role integration"
+    },
+    {
+      "sha": "0221c1b846dd258aa345e6705702ef162f79aff6",
+      "message": "test: expose finite C3 candidate and historical consumer boundaries"
+    },
+    {
+      "sha": "53256405e5525372efda40673b42282fe0da0935",
+      "message": "test: preserve legacy spy and isolate final upload timeout cases"
+    },
+    {
+      "sha": "2b2af6989a243d7a99beb882e24bd62d5a50a965",
+      "message": "fix: select fixed finite candidate APIs and historical rollback roles"
+    },
+    {
+      "sha": "6d17d438becca708da5baae70129c73fc118bf98",
+      "message": "test: retain legacy digest checks and qualify exact C3 compiler head"
+    },
+    {
+      "sha": "949d84784e83f8859421242edeab3f68c5db93a3",
+      "message": "docs: record finite C3 qualification and remove temporary qualifiers"
+    }
+  ],
+  "allChangedPaths": [
+    "docs/superpowers/briefs/2026-11-04-finite-known-profile-c1.md",
+    "docs/superpowers/briefs/2026-11-04-finite-known-profile-c2.md",
+    "docs/superpowers/briefs/2026-11-04-finite-known-profile-c3.md",
+    "docs/superpowers/plans/2026-11-04-finite-known-profile-compatibility.md",
+    "docs/superpowers/reports/2026-11-04-finite-known-profile-c1.md",
+    "docs/superpowers/reports/2026-11-04-finite-known-profile-c2.md",
+    "docs/superpowers/reports/2026-11-04-finite-known-profile-c3.md",
+    "docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in-checkpoint.md",
+    "docs/superpowers/reviews/2026-11-04-finite-known-profile-c1.es.md",
+    "docs/superpowers/reviews/2026-11-04-finite-known-profile-c2.es.md",
+    "docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md",
+    "lib/mcp-activation-observer.mjs",
+    "lib/mcp-qa-finite-confirmation.mjs",
+    "lib/mcp-qa-finite-initial-owner-source.mjs",
+    "lib/mcp-qa-finite-policy-setup.mjs",
+    "lib/mcp-qa-finite-policy-transport.mjs",
+    "lib/mcp-qa-finite-preparation-cleanup.mjs",
+    "lib/mcp-qa-finite-preparation-records.mjs",
+    "lib/mcp-qa-finite-profile.mjs",
+    "lib/mcp-release-operator-policy.mjs",
+    "lib/mcp-release-runtime.mjs",
+    "lib/mcp-release-successor-reservation.mjs",
+    "test/fixtures/finite-connection-source.mjs",
+    "test/fixtures/finite-native-conduit-receiver.mjs",
+    "test/fixtures/finite-policy-setup-worker.mjs",
+    "test/fixtures/named-confirmation-native-rehearsal.mjs",
+    "test/mcp-finite-activation-compatibility.test.mjs",
+    "test/mcp-finite-named-activation.test.mjs",
+    "test/mcp-qa-finite-confirmation-native.test.mjs",
+    "test/mcp-qa-finite-initial-owner-source-native.test.mjs",
+    "test/mcp-qa-finite-owner-native-conduit-native.test.mjs",
+    "test/mcp-qa-finite-policy-setup-native.test.mjs",
+    "test/mcp-qa-finite-policy-transport.test.mjs",
+    "test/mcp-qa-finite-preparation-records.test.mjs",
+    "test/mcp-qa-finite-profile.test.mjs",
+    "test/mcp-release-finite-known-cancellation-native.test.mjs",
+    "test/mcp-release-finite-known-cancellation.test.mjs",
+    "test/mcp-release-known-cancellation.test.mjs",
+    "wrangler.independent-closure-qa.finite.jsonc",
+    "wrangler.mcp-own.finite.jsonc"
+  ],
+  "scope": [
+    "lib/mcp-qa-finite-profile.mjs",
+    "test/fixtures/finite-native-conduit-receiver.mjs",
+    "test/mcp-qa-finite-owner-native-conduit-native.test.mjs",
+    "test/mcp-qa-finite-profile.test.mjs",
+    "wrangler.independent-closure-qa.finite.jsonc",
+    "wrangler.mcp-own.finite.jsonc"
+  ],
+  "files": [
+    {
+      "path": "lib/mcp-qa-finite-profile.mjs",
+      "status": "modified",
+      "additions": 3,
+      "deletions": 3,
+      "patch": "@@ -18,8 +18,8 @@ function snapshot(v,depth=0,budget={nodes:0,bytes:0}){\n }\n // Reviewed live source templates. Typed markers are NOT provider metadata and\n // must never be passed to activationConfigurationHash/Known or deployed as vars.\n-const templates=freeze({\"qaLive\":{\"compatibility_date\":\"2026-09-07\",\"compatibility_flags\":[\"nodejs_compat\"],\"main_module\":\"index.mjs\",\"usage_model\":\"standard\",\"containers\":[],\"exports\":[\"IndependentClosure\",\"PrivateQaBootstrap\",\"PrivateQaCatalog\",\"PrivateQaNamedConfirmation\",\"PrivateQaPreregistration\",\"default\",\"observePrivateQa\"],\"bindings\":[{\"name\":\"AFW_INDEPENDENT_CLOSURE\",\"class_name\":\"IndependentClosure\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"070c4a7708eb4592a3ded7c117a88225\"},{\"name\":\"AFW_MCP_CLOSURE_DISPATCH_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_CLOSURE_DISPATCH_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_MCP_CLOSURE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_CLOSURE_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"d6fc71552de7494a863aca20365a572d\"},{\"name\":\"AFW_MCP_CLOSURE_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_MCP_CLOSURE_PUBLISH_TOKEN\",\"type\":\"secret_text\"},{\"name\":\"AFW_MCP_CLOSURE_READ_TOKEN\",\"type\":\"secret_text\"},{\"name\":\"AFW_MCP_CLOSURE_REDUCTION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_PUBLISHER_PROBE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_PUBLISHER_PROBE_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_MCP_READER_PROBE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_READER_PROBE_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_BOOTSTRAP\",\"type\":\"workflow\",\"workflow_name\":\"afw-own-qa-private-bootstrap\",\"class_name\":\"PrivateQaBootstrap\"},{\"name\":\"AFW_QA_BOOTSTRAP_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_CHALLENGE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_CHALLENGE_IDENTITY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_DB\",\"type\":\"d1\",\"id\":\"676ca49e-af71-4f2f-a12d-11f13de78a51\"},{\"name\":\"AFW_QA_DOSSIER_DB\",\"type\":\"d1\",\"id\":\"6a728254-1494-4039-802e-b39288a55fcc\"},{\"name\":\"AFW_QA_HTTP_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_HTTP_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_INSTALLATION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_NAMED_CONFIRMATION\",\"type\":\"workflow\",\"workflow_name\":\"afw-own-qa-private-confirmation\",\"class_name\":\"PrivateQaNamedConfirmation\"},{\"name\":\"AFW_QA_OCCURRENCE_RATE_LIMITER\",\"type\":\"ratelimit\",\"namespace_id\":\"2026101003\",\"simple\":{\"limit\":10,\"period\":60}},{\"name\":\"AFW_QA_ORIGINALS_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PREREGISTRATION\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_PREREGISTRY\",\"class_name\":\"PrivateQaPreregistration\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"6f30104244424152b800bc64d5f4cfac\"},{\"name\":\"AFW_QA_PRIMARY_ADMISSION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PRIMARY_CATALOG_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PRIMARY_RESERVATION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PROVIDER_OBSERVATION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_VERSION\",\"type\":\"version_metadata\"},{\"name\":\"AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_RELEASE_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"d6fc71552de7494a863aca20365a572d\"},{\"name\":\"AFW_RELEASE_OPERATOR_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_RELEASE_WORKFLOW_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"RELEASE_DB\",\"type\":\"d1\",\"id\":\"6a728254-1494-4039-802e-b39288a55fcc\"}]},\"canaryLive\":{\"compatibility_date\":\"2026-09-07\",\"compatibility_flags\":[\"nodejs_compat\",\"global_fetch_strictly_public\"],\"main_module\":\"index.mjs\",\"usage_model\":\"standard\",\"containers\":[{\"class_name\":\"AfwOwnEventNode\",\"name\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}],\"exports\":{\"default\":{\"type\":\"worker\"},\"AfwNodeControl\":{\"type\":\"worker\"},\"AfwOwnEventNode\":{\"type\":\"durable-object\",\"storage\":\"sqlite\",\"container\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}},\"bindings\":[{\"name\":\"AFW_DELEGATED_OAUTH_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_EVENTS_CUSTODY_KEY\",\"type\":\"secret_text\"},{\"name\":\"AFW_DOSSIER_EVENTS_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_DOSSIER_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"d6fc71552de7494a863aca20365a572d\"},{\"name\":\"AFW_DOSSIER_EVENTS_NODE_NAME\",\"type\":\"plain_text\",\"text\":\"afw-own-event-first-successor-v1\"},{\"name\":\"AFW_DOSSIER_EVENTS_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"events-policy\"}},{\"name\":\"AFW_DOSSIER_EVENTS_PROJECTION_SECRET\",\"type\":\"secret_text\"},{\"name\":\"AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_MONITORING_OWNER_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_OWN_SAVE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"withdrawal-policy\"}},{\"name\":\"AFW_DOSSIER_RETIREMENT_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"retirement-policy\"}},{\"name\":\"AFW_DOSSIER_RETIREMENT_READ_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_SUCCESSOR_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_DOSSIER_SUCCESSOR_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"successor-policy\"}},{\"name\":\"AFW_FINITE_TRIAL_CONTROL\",\"class_name\":\"IndependentClosure\",\"script_name\":\"agent-friendly-web-independent-closure-qa\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"070c4a7708eb4592a3ded7c117a88225\"},{\"name\":\"AFW_FINITE_TRIAL_VERSION\",\"type\":\"version_metadata\"},{\"name\":\"AFW_OAUTH_ISSUER\",\"type\":\"plain_text\",\"text\":\"https://delegated-canary.agentfriendlyweb.dev\"},{\"name\":\"AFW_OAUTH_PILOT_CLIENT_ID\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"client-id\"}},{\"name\":\"AFW_OAUTH_PILOT_PROJECT_ID\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"project-id\"}},{\"name\":\"AFW_OAUTH_REFRESH_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_OAUTH_RESOURCE\",\"type\":\"plain_text\",\"text\":\"https://delegated-canary.agentfriendlyweb.dev/mcp\"},{\"name\":\"AFW_OAUTH_SERVICE_MODE\",\"type\":\"plain_text\",\"text\":\"window\"},{\"name\":\"DB\",\"type\":\"d1\",\"id\":\"6a728254-1494-4039-802e-b39288a55fcc\"},{\"name\":\"OAUTH_KV\",\"type\":\"kv_namespace\",\"namespace_id\":\"6b94ff702e504e14a7730cee73a0f6ff\"}]}});\n-const configs=freeze({\"qaLive\":{\"name\":\"agent-friendly-web-independent-closure-qa\",\"account_id\":\"85d0d5dadac3341a564f22ce885e9eec\",\"main\":\"worker/independent-closure/finite.mjs\",\"compatibility_date\":\"2026-09-07\",\"workers_dev\":false,\"preview_urls\":false,\"routes\":[],\"triggers\":{\"crons\":[]},\"durable_objects\":{\"bindings\":[{\"name\":\"AFW_INDEPENDENT_CLOSURE\",\"class_name\":\"IndependentClosure\"},{\"name\":\"AFW_QA_PREREGISTRY\",\"class_name\":\"PrivateQaPreregistration\"},{\"name\":\"AFW_MCP_CLOSURE_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\"},{\"name\":\"AFW_RELEASE_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\"}]},\"migrations\":[{\"tag\":\"afw-own-qa-closed-v1\",\"new_sqlite_classes\":[\"IndependentClosure\"]},{\"tag\":\"afw-private-preregistry-v1\",\"new_sqlite_classes\":[\"PrivateQaPreregistration\"]}],\"d1_databases\":[{\"database_id\":\"676ca49e-af71-4f2f-a12d-11f13de78a51\",\"database_name\":\"agent-friendly-web-independent-closure-qa\",\"binding\":\"AFW_QA_DB\"},{\"binding\":\"RELEASE_DB\",\"database_name\":\"agent-friendly-web-delegated-canary\",\"database_id\":\"6a728254-1494-4039-802e-b39288a55fcc\"},{\"binding\":\"AFW_QA_DOSSIER_DB\",\"database_name\":\"agent-friendly-web-delegated-canary\",\"database_id\":\"6a728254-1494-4039-802e-b39288a55fcc\"}],\"workflows\":[{\"name\":\"afw-own-qa-private-bootstrap\",\"binding\":\"AFW_QA_BOOTSTRAP\",\"class_name\":\"PrivateQaBootstrap\"},{\"name\":\"afw-own-qa-private-confirmation\",\"binding\":\"AFW_QA_NAMED_CONFIRMATION\",\"class_name\":\"PrivateQaNamedConfirmation\"}],\"ratelimits\":[{\"name\":\"AFW_QA_OCCURRENCE_RATE_LIMITER\",\"namespace_id\":\"2026101003\",\"simple\":{\"limit\":10,\"period\":60}}],\"vars\":{\"AFW_QA_HTTP_ENABLED\":\"false\",\"AFW_QA_HTTP_POLICY\":\"\",\"AFW_QA_BOOTSTRAP_ENABLED\":\"false\",\"AFW_QA_PREREGISTRATION\":\"\",\"AFW_QA_CHALLENGE_ENABLED\":\"false\",\"AFW_QA_CHALLENGE_IDENTITY\":\"\",\"AFW_MCP_CLOSURE_ENABLED\":\"false\",\"AFW_MCP_CLOSURE_POLICY\":\"\",\"AFW_MCP_READER_PROBE_ENABLED\":\"false\",\"AFW_MCP_READER_PROBE_POLICY\":\"\",\"AFW_MCP_PUBLISHER_PROBE_ENABLED\":\"false\",\"AFW_MCP_PUBLISHER_PROBE_POLICY\":\"\",\"AFW_MCP_CLOSURE_DISPATCH_ENABLED\":\"false\",\"AFW_MCP_CLOSURE_DISPATCH_POLICY\":\"\",\"AFW_QA_ORIGINALS_ENABLED\":\"false\",\"AFW_QA_PROVIDER_OBSERVATION_ENABLED\":\"false\",\"AFW_QA_PRIMARY_RESERVATION_ENABLED\":\"false\",\"AFW_QA_INSTALLATION_ENABLED\":\"false\",\"AFW_QA_PRIMARY_CATALOG_ENABLED\":\"false\",\"AFW_QA_PRIMARY_ADMISSION_ENABLED\":\"false\",\"AFW_MCP_CLOSURE_REDUCTION_ENABLED\":\"false\",\"AFW_RELEASE_OPERATOR_ENABLED\":\"true\",\"AFW_RELEASE_WORKFLOW_ENABLED\":\"true\",\"AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED\":\"true\",\"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED\":\"true\"},\"compatibility_flags\":[\"nodejs_compat\"],\"version_metadata\":{\"binding\":\"AFW_QA_VERSION\"},\"tail_consumers\":[]},\"canaryLive\":{\"name\":\"agent-friendly-web-delegated-canary\",\"account_id\":\"85d0d5dadac3341a564f22ce885e9eec\",\"main\":\"worker/mcp-own/finite.mjs\",\"compatibility_date\":\"2026-09-07\",\"compatibility_flags\":[\"nodejs_compat\",\"global_fetch_strictly_public\"],\"workers_dev\":false,\"preview_urls\":false,\"routes\":[],\"triggers\":{\"crons\":[]},\"tail_consumers\":[],\"observability\":{\"enabled\":false},\"vars\":{\"AFW_DELEGATED_OAUTH_ENABLED\":\"false\",\"AFW_OAUTH_REFRESH_ENABLED\":\"false\",\"AFW_OAUTH_SERVICE_MODE\":\"window\",\"AFW_OAUTH_ISSUER\":\"https://delegated-canary.agentfriendlyweb.dev\",\"AFW_OAUTH_RESOURCE\":\"https://delegated-canary.agentfriendlyweb.dev/mcp\",\"AFW_DOSSIER_EVENTS_ENABLED\":\"true\",\"AFW_DOSSIER_SUCCESSOR_ENABLED\":\"true\",\"AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED\":\"true\",\"AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED\":\"false\",\"AFW_DOSSIER_RETIREMENT_READ_ENABLED\":\"false\",\"AFW_DOSSIER_OWN_SAVE_ENABLED\":\"false\",\"AFW_DOSSIER_MONITORING_OWNER_ENABLED\":\"false\",\"AFW_DOSSIER_EVENTS_NODE_NAME\":\"afw-own-event-first-successor-v1\"},\"d1_databases\":[{\"binding\":\"DB\",\"database_name\":\"agent-friendly-web-delegated-canary\",\"database_id\":\"6a728254-1494-4039-802e-b39288a55fcc\"}],\"kv_namespaces\":[{\"binding\":\"OAUTH_KV\",\"id\":\"6b94ff702e504e14a7730cee73a0f6ff\"}],\"durable_objects\":{\"bindings\":[{\"name\":\"AFW_DOSSIER_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\"},{\"name\":\"AFW_FINITE_TRIAL_CONTROL\",\"class_name\":\"IndependentClosure\",\"script_name\":\"agent-friendly-web-independent-closure-qa\"}]},\"version_metadata\":{\"binding\":\"AFW_FINITE_TRIAL_VERSION\"},\"exports\":{\"default\":{\"type\":\"worker\"},\"AfwNodeControl\":{\"type\":\"worker\"},\"AfwOwnEventNode\":{\"type\":\"durable-object\",\"storage\":\"sqlite\",\"container\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}},\"unsafe\":{\"metadata\":{\"exports\":{\"default\":{\"type\":\"worker\"},\"AfwNodeControl\":{\"type\":\"worker\"},\"AfwOwnEventNode\":{\"type\":\"durable-object\",\"storage\":\"sqlite\",\"container\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}},\"containers\":[{\"class_name\":\"AfwOwnEventNode\"}]}}}});\n+const templates=freeze({\"qaLive\":{\"compatibility_date\":\"2026-09-07\",\"compatibility_flags\":[\"nodejs_compat\",\"enable_request_signal\"],\"main_module\":\"index.mjs\",\"usage_model\":\"standard\",\"containers\":[],\"exports\":[\"IndependentClosure\",\"PrivateQaBootstrap\",\"PrivateQaCatalog\",\"PrivateQaNamedConfirmation\",\"PrivateQaPreregistration\",\"default\",\"observePrivateQa\"],\"bindings\":[{\"name\":\"AFW_INDEPENDENT_CLOSURE\",\"class_name\":\"IndependentClosure\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"070c4a7708eb4592a3ded7c117a88225\"},{\"name\":\"AFW_MCP_CLOSURE_DISPATCH_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_CLOSURE_DISPATCH_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_MCP_CLOSURE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_CLOSURE_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"d6fc71552de7494a863aca20365a572d\"},{\"name\":\"AFW_MCP_CLOSURE_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_MCP_CLOSURE_PUBLISH_TOKEN\",\"type\":\"secret_text\"},{\"name\":\"AFW_MCP_CLOSURE_READ_TOKEN\",\"type\":\"secret_text\"},{\"name\":\"AFW_MCP_CLOSURE_REDUCTION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_PUBLISHER_PROBE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_PUBLISHER_PROBE_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_MCP_READER_PROBE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_MCP_READER_PROBE_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_BOOTSTRAP\",\"type\":\"workflow\",\"workflow_name\":\"afw-own-qa-private-bootstrap\",\"class_name\":\"PrivateQaBootstrap\"},{\"name\":\"AFW_QA_BOOTSTRAP_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_CHALLENGE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_CHALLENGE_IDENTITY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_DB\",\"type\":\"d1\",\"id\":\"676ca49e-af71-4f2f-a12d-11f13de78a51\"},{\"name\":\"AFW_QA_DOSSIER_DB\",\"type\":\"d1\",\"id\":\"6a728254-1494-4039-802e-b39288a55fcc\"},{\"name\":\"AFW_QA_HTTP_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_HTTP_POLICY\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_INSTALLATION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_NAMED_CONFIRMATION\",\"type\":\"workflow\",\"workflow_name\":\"afw-own-qa-private-confirmation\",\"class_name\":\"PrivateQaNamedConfirmation\"},{\"name\":\"AFW_QA_OCCURRENCE_RATE_LIMITER\",\"type\":\"ratelimit\",\"namespace_id\":\"2026101003\",\"simple\":{\"limit\":10,\"period\":60}},{\"name\":\"AFW_QA_ORIGINALS_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PREREGISTRATION\",\"type\":\"plain_text\",\"text\":\"\"},{\"name\":\"AFW_QA_PREREGISTRY\",\"class_name\":\"PrivateQaPreregistration\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"6f30104244424152b800bc64d5f4cfac\"},{\"name\":\"AFW_QA_PRIMARY_ADMISSION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PRIMARY_CATALOG_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PRIMARY_RESERVATION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_PROVIDER_OBSERVATION_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_QA_VERSION\",\"type\":\"version_metadata\"},{\"name\":\"AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_RELEASE_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"d6fc71552de7494a863aca20365a572d\"},{\"name\":\"AFW_RELEASE_OPERATOR_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_RELEASE_WORKFLOW_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"RELEASE_DB\",\"type\":\"d1\",\"id\":\"6a728254-1494-4039-802e-b39288a55fcc\"}]},\"canaryLive\":{\"compatibility_date\":\"2026-09-07\",\"compatibility_flags\":[\"nodejs_compat\",\"global_fetch_strictly_public\",\"enable_request_signal\"],\"main_module\":\"index.mjs\",\"usage_model\":\"standard\",\"containers\":[{\"class_name\":\"AfwOwnEventNode\",\"name\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}],\"exports\":{\"default\":{\"type\":\"worker\"},\"AfwNodeControl\":{\"type\":\"worker\"},\"AfwOwnEventNode\":{\"type\":\"durable-object\",\"storage\":\"sqlite\",\"container\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}},\"bindings\":[{\"name\":\"AFW_DELEGATED_OAUTH_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_EVENTS_CUSTODY_KEY\",\"type\":\"secret_text\"},{\"name\":\"AFW_DOSSIER_EVENTS_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_DOSSIER_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"d6fc71552de7494a863aca20365a572d\"},{\"name\":\"AFW_DOSSIER_EVENTS_NODE_NAME\",\"type\":\"plain_text\",\"text\":\"afw-own-event-first-successor-v1\"},{\"name\":\"AFW_DOSSIER_EVENTS_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"events-policy\"}},{\"name\":\"AFW_DOSSIER_EVENTS_PROJECTION_SECRET\",\"type\":\"secret_text\"},{\"name\":\"AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_MONITORING_OWNER_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_OWN_SAVE_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"withdrawal-policy\"}},{\"name\":\"AFW_DOSSIER_RETIREMENT_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"retirement-policy\"}},{\"name\":\"AFW_DOSSIER_RETIREMENT_READ_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_DOSSIER_SUCCESSOR_ENABLED\",\"type\":\"plain_text\",\"text\":\"true\"},{\"name\":\"AFW_DOSSIER_SUCCESSOR_POLICY\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"successor-policy\"}},{\"name\":\"AFW_FINITE_TRIAL_CONTROL\",\"class_name\":\"IndependentClosure\",\"script_name\":\"agent-friendly-web-independent-closure-qa\",\"type\":\"durable_object_namespace\",\"namespace_id\":\"070c4a7708eb4592a3ded7c117a88225\"},{\"name\":\"AFW_FINITE_TRIAL_VERSION\",\"type\":\"version_metadata\"},{\"name\":\"AFW_OAUTH_ISSUER\",\"type\":\"plain_text\",\"text\":\"https://delegated-canary.agentfriendlyweb.dev\"},{\"name\":\"AFW_OAUTH_PILOT_CLIENT_ID\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"client-id\"}},{\"name\":\"AFW_OAUTH_PILOT_PROJECT_ID\",\"type\":\"plain_text\",\"privateSlot\":{\"purpose\":\"afw.finite-private-slot.v1\",\"kind\":\"project-id\"}},{\"name\":\"AFW_OAUTH_REFRESH_ENABLED\",\"type\":\"plain_text\",\"text\":\"false\"},{\"name\":\"AFW_OAUTH_RESOURCE\",\"type\":\"plain_text\",\"text\":\"https://delegated-canary.agentfriendlyweb.dev/mcp\"},{\"name\":\"AFW_OAUTH_SERVICE_MODE\",\"type\":\"plain_text\",\"text\":\"window\"},{\"name\":\"DB\",\"type\":\"d1\",\"id\":\"6a728254-1494-4039-802e-b39288a55fcc\"},{\"name\":\"OAUTH_KV\",\"type\":\"kv_namespace\",\"namespace_id\":\"6b94ff702e504e14a7730cee73a0f6ff\"}]}});\n+const configs=freeze({\"qaLive\":{\"name\":\"agent-friendly-web-independent-closure-qa\",\"account_id\":\"85d0d5dadac3341a564f22ce885e9eec\",\"main\":\"worker/independent-closure/finite.mjs\",\"compatibility_date\":\"2026-09-07\",\"workers_dev\":false,\"preview_urls\":false,\"routes\":[],\"triggers\":{\"crons\":[]},\"durable_objects\":{\"bindings\":[{\"name\":\"AFW_INDEPENDENT_CLOSURE\",\"class_name\":\"IndependentClosure\"},{\"name\":\"AFW_QA_PREREGISTRY\",\"class_name\":\"PrivateQaPreregistration\"},{\"name\":\"AFW_MCP_CLOSURE_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\"},{\"name\":\"AFW_RELEASE_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\",\"script_name\":\"agent-friendly-web-delegated-canary\"}]},\"migrations\":[{\"tag\":\"afw-own-qa-closed-v1\",\"new_sqlite_classes\":[\"IndependentClosure\"]},{\"tag\":\"afw-private-preregistry-v1\",\"new_sqlite_classes\":[\"PrivateQaPreregistration\"]}],\"d1_databases\":[{\"database_id\":\"676ca49e-af71-4f2f-a12d-11f13de78a51\",\"database_name\":\"agent-friendly-web-independent-closure-qa\",\"binding\":\"AFW_QA_DB\"},{\"binding\":\"RELEASE_DB\",\"database_name\":\"agent-friendly-web-delegated-canary\",\"database_id\":\"6a728254-1494-4039-802e-b39288a55fcc\"},{\"binding\":\"AFW_QA_DOSSIER_DB\",\"database_name\":\"agent-friendly-web-delegated-canary\",\"database_id\":\"6a728254-1494-4039-802e-b39288a55fcc\"}],\"workflows\":[{\"name\":\"afw-own-qa-private-bootstrap\",\"binding\":\"AFW_QA_BOOTSTRAP\",\"class_name\":\"PrivateQaBootstrap\"},{\"name\":\"afw-own-qa-private-confirmation\",\"binding\":\"AFW_QA_NAMED_CONFIRMATION\",\"class_name\":\"PrivateQaNamedConfirmation\"}],\"ratelimits\":[{\"name\":\"AFW_QA_OCCURRENCE_RATE_LIMITER\",\"namespace_id\":\"2026101003\",\"simple\":{\"limit\":10,\"period\":60}}],\"vars\":{\"AFW_QA_HTTP_ENABLED\":\"false\",\"AFW_QA_HTTP_POLICY\":\"\",\"AFW_QA_BOOTSTRAP_ENABLED\":\"false\",\"AFW_QA_PREREGISTRATION\":\"\",\"AFW_QA_CHALLENGE_ENABLED\":\"false\",\"AFW_QA_CHALLENGE_IDENTITY\":\"\",\"AFW_MCP_CLOSURE_ENABLED\":\"false\",\"AFW_MCP_CLOSURE_POLICY\":\"\",\"AFW_MCP_READER_PROBE_ENABLED\":\"false\",\"AFW_MCP_READER_PROBE_POLICY\":\"\",\"AFW_MCP_PUBLISHER_PROBE_ENABLED\":\"false\",\"AFW_MCP_PUBLISHER_PROBE_POLICY\":\"\",\"AFW_MCP_CLOSURE_DISPATCH_ENABLED\":\"false\",\"AFW_MCP_CLOSURE_DISPATCH_POLICY\":\"\",\"AFW_QA_ORIGINALS_ENABLED\":\"false\",\"AFW_QA_PROVIDER_OBSERVATION_ENABLED\":\"false\",\"AFW_QA_PRIMARY_RESERVATION_ENABLED\":\"false\",\"AFW_QA_INSTALLATION_ENABLED\":\"false\",\"AFW_QA_PRIMARY_CATALOG_ENABLED\":\"false\",\"AFW_QA_PRIMARY_ADMISSION_ENABLED\":\"false\",\"AFW_MCP_CLOSURE_REDUCTION_ENABLED\":\"false\",\"AFW_RELEASE_OPERATOR_ENABLED\":\"true\",\"AFW_RELEASE_WORKFLOW_ENABLED\":\"true\",\"AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED\":\"true\",\"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED\":\"true\"},\"compatibility_flags\":[\"nodejs_compat\",\"enable_request_signal\"],\"version_metadata\":{\"binding\":\"AFW_QA_VERSION\"},\"tail_consumers\":[]},\"canaryLive\":{\"name\":\"agent-friendly-web-delegated-canary\",\"account_id\":\"85d0d5dadac3341a564f22ce885e9eec\",\"main\":\"worker/mcp-own/finite.mjs\",\"compatibility_date\":\"2026-09-07\",\"compatibility_flags\":[\"nodejs_compat\",\"global_fetch_strictly_public\",\"enable_request_signal\"],\"workers_dev\":false,\"preview_urls\":false,\"routes\":[],\"triggers\":{\"crons\":[]},\"tail_consumers\":[],\"observability\":{\"enabled\":false},\"vars\":{\"AFW_DELEGATED_OAUTH_ENABLED\":\"false\",\"AFW_OAUTH_REFRESH_ENABLED\":\"false\",\"AFW_OAUTH_SERVICE_MODE\":\"window\",\"AFW_OAUTH_ISSUER\":\"https://delegated-canary.agentfriendlyweb.dev\",\"AFW_OAUTH_RESOURCE\":\"https://delegated-canary.agentfriendlyweb.dev/mcp\",\"AFW_DOSSIER_EVENTS_ENABLED\":\"true\",\"AFW_DOSSIER_SUCCESSOR_ENABLED\":\"true\",\"AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED\":\"true\",\"AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED\":\"false\",\"AFW_DOSSIER_RETIREMENT_READ_ENABLED\":\"false\",\"AFW_DOSSIER_OWN_SAVE_ENABLED\":\"false\",\"AFW_DOSSIER_MONITORING_OWNER_ENABLED\":\"false\",\"AFW_DOSSIER_EVENTS_NODE_NAME\":\"afw-own-event-first-successor-v1\"},\"d1_databases\":[{\"binding\":\"DB\",\"database_name\":\"agent-friendly-web-delegated-canary\",\"database_id\":\"6a728254-1494-4039-802e-b39288a55fcc\"}],\"kv_namespaces\":[{\"binding\":\"OAUTH_KV\",\"id\":\"6b94ff702e504e14a7730cee73a0f6ff\"}],\"durable_objects\":{\"bindings\":[{\"name\":\"AFW_DOSSIER_EVENTS_NODE\",\"class_name\":\"AfwOwnEventNode\"},{\"name\":\"AFW_FINITE_TRIAL_CONTROL\",\"class_name\":\"IndependentClosure\",\"script_name\":\"agent-friendly-web-independent-closure-qa\"}]},\"version_metadata\":{\"binding\":\"AFW_FINITE_TRIAL_VERSION\"},\"exports\":{\"default\":{\"type\":\"worker\"},\"AfwNodeControl\":{\"type\":\"worker\"},\"AfwOwnEventNode\":{\"type\":\"durable-object\",\"storage\":\"sqlite\",\"container\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}},\"unsafe\":{\"metadata\":{\"exports\":{\"default\":{\"type\":\"worker\"},\"AfwNodeControl\":{\"type\":\"worker\"},\"AfwOwnEventNode\":{\"type\":\"durable-object\",\"storage\":\"sqlite\",\"container\":\"agent-friendly-web-delegated-canary-afwowneventnode\"}},\"containers\":[{\"class_name\":\"AfwOwnEventNode\"}]}}}});\n export function finitePublicProfileTemplate(role){if(typeof role!=='string'||!Object.hasOwn(templates,role))fail();return templates[role];}\n export function finiteWranglerProfileTemplate(role){if(typeof role!=='string'||!Object.hasOwn(configs,role))fail();return configs[role];}\n export function projectFinitePublicConfiguration(input){\n@@ -53,7 +53,7 @@ export function qualifyFiniteSourceRoleMetadata({manifest,role,metadata}){\n  const m=validateFinitePackageManifest(manifest),projection=projectFinitePublicConfiguration({role,metadata});\n  const publicStatic=staticCommitment(role,projection);\n  if(canonical(m.modules[role].publicStatic)!==canonical(publicStatic))fail();\n- return freeze({publicStatic,privateFull:{configurationAlgorithm:role==='qaLive'?'qaClosedConfigurationHash':'restorationConfigurationHash',activationAlgorithm:role==='canaryLive'?'activationConfigurationHash':null,privateSlots:projection.bindings.filter(b=>b.privateSlot).map(b=>b.name),nativeValidationRequired:true}});\n+ return freeze({publicStatic,privateFull:{configurationAlgorithm:role==='qaLive'?'qaClosedConfigurationHash':'restorationConfigurationHash',activationAlgorithm:role==='canaryLive'?'finiteActivationConfigurationHash':null,privateSlots:projection.bindings.filter(b=>b.privateSlot).map(b=>b.name),nativeValidationRequired:true}});\n }\n export function qualifyFiniteSourcePackage({manifest}){\n  const m=validateFinitePackageManifest(manifest);"
+    },
+    {
+      "path": "test/fixtures/finite-native-conduit-receiver.mjs",
+      "status": "modified",
+      "additions": 5,
+      "deletions": 4,
+      "patch": "@@ -2,10 +2,10 @@ import {DurableObject} from 'cloudflare:workers';\n import {createFiniteOwnerNativeReceiver} from '../../lib/mcp-qa-finite-owner-native-receiver.mjs';\n // SYN observations are bounded booleans/counts only, never credentials/body.\n export class NativeReceiverFixture extends DurableObject{\n- constructor(ctx,env){super(ctx,env);this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}\n+ constructor(ctx,env){super(ctx,env);this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,readReturned:false,readCancelled:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}\n  async hold(){this.heldMode=true;}\n  async release(){this.releaseRead?.();}\n- async reset(){this.heldMode=false;this.releaseRead?.();this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}\n+ async reset(){this.heldMode=false;this.releaseRead?.();this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,readReturned:false,readCancelled:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}\n  async state(){return {...this.observed,businessRows:(await this.ctx.storage.list()).size};}\n  async fetch(request){\n   const seen=this.observed;seen.receiverEntered++;seen.privateHeaders=[...request.headers.keys()].filter(k=>k.startsWith('x-afw-finite-')).sort();seen.callerHeader=request.headers.has('X-Caller-Arbitrary');\n@@ -16,11 +16,12 @@ export class NativeReceiverFixture extends DurableObject{\n    // Hold the actual native read's settlement, not a replacement signal.\n    const stream=request.body,getReader=stream.getReader;\n    stream.getReader=()=>{\n-    const reader=Reflect.apply(getReader,stream,[]),read=reader.read;let once=false;\n+    const reader=Reflect.apply(getReader,stream,[]),read=reader.read,cancel=reader.cancel;let once=false;\n+    reader.cancel=(...args)=>{seen.readCancelled=true;return Reflect.apply(cancel,reader,args);};\n     reader.read=async()=>{\n      const value=await Reflect.apply(read,reader,[]);\n      if(!once){once=true;seen.held=true;await new Promise(resolve=>{this.releaseRead=resolve;});}\n-     seen.beforeGuardAborted=request.signal.aborted;return value;\n+     seen.readReturned=true;seen.beforeGuardAborted=request.signal.aborted;return value;\n     };return reader;\n    };\n   }"
+    },
+    {
+      "path": "test/mcp-qa-finite-owner-native-conduit-native.test.mjs",
+      "status": "modified",
+      "additions": 10,
+      "deletions": 3,
+      "patch": "@@ -40,9 +40,16 @@ test('actual native signal capability observes receiver separately during held r\n  const pending=f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:'SYN=bounded'}).then(async r=>({status:r.status,body:await r.json()}),()=>({senderRejected:true}));\n  await f.wait('held');await f.call('/fixture/abort');\n  const sender=await pending,held=await f.state();\n- await f.call('/fixture/release');const settled=await f.wait('settled');\n- assert.equal(held.receiverEntered,1);assert.equal(settled.businessRows,0);\n- assert.equal(typeof held.receiverAborted,'boolean');assert.equal(typeof settled.beforeGuardAborted,'boolean');\n+ await f.call('/fixture/release');const settled=await f.wait('readCancelled');\n+ assert.equal(held.receiverEntered,1);\n+ assert.equal(held.readReturned,false,'held native read has not physically returned after sender settles');\n+ assert.equal(held.readCancelled,false,'held read cancellation awaits physical release');\n+ assert.equal(settled.readReturned,true,'actual native read eventually returned');\n+ assert.equal(settled.readCancelled,true,'product finiteNativeBytes caught the denied post-read lease guard and canceled the real reader');\n+ assert.equal(settled.settled,true,'receiver handler has returned after cancellation');\n+ assert.equal(settled.businessRows,0,'no storage mutation follows denied guard');\n+ assert.equal(held.receiverAborted,true,'actual receiver Request.signal must abort while read remains held');\n+ assert.equal(settled.beforeGuardAborted,true,'actual receiver signal must still be aborted immediately before product guard');\n  const qualification=held.receiverAborted&&settled.beforeGuardAborted?'receiver_abort_observed':'receiver_abort_NOT_qualified';\n  console.log('native_signal_capability',JSON.stringify({qualification,sender,receiverDuringHeldRead:held.receiverAborted,receiverBeforeGuard:settled.beforeGuardAborted,profiles:f.profiles,businessProducer:false}));\n });"
+    },
+    {
+      "path": "test/mcp-qa-finite-profile.test.mjs",
+      "status": "modified",
+      "additions": 54,
+      "deletions": 9,
+      "patch": "@@ -1,9 +1,9 @@\n import {createHash} from 'node:crypto';\n import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';\n-import {validateReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';\n+import {validateReleaseOperatorBundle,validateFiniteReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';\n import test from 'node:test';\n import assert from 'node:assert/strict';\n-import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';\n+import {activationConfigurationHash,finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';\n import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';\n let api;\n try{api=await import('../lib/mcp-qa-finite-profile.mjs');}catch{/* Missing implementation is an explicit RED assertion. */}\n@@ -13,22 +13,23 @@ function fixture(){\n  for(const b of v.bindings)if(b.privateSlot){delete b.privateSlot;b.text='SYNTHETIC-PRIVATE-'+b.name;}\n  return v;\n }\n-test('private_projection_preserves_full_fingerprint',()=>{\n+test('candidate_private_projection_full_hash',()=>{\n  const script='export default {fetch(){return new Response(null,{status:404})}}';\n  const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};\n  const policy=inertNamedConfirmationPolicy(artifact),a=fixture();\n  for(const binding of a.bindings){const original=policy.observation.configuration.bindings.find(x=>x.name===binding.name);if(original&&binding.type==='plain_text'&&original.type==='plain_text')binding.text=original.text;}\n  const b=structuredClone(a),event=b.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY');\n  const changed=JSON.parse(event.text);changed.grantId='ci-only-second-inert';event.text=JSON.stringify(changed);\n- for(const configuration of [a,b]){const p=structuredClone(policy);p.observation.configuration=configuration;p.plan.configurationHash=activationConfigurationHash(configuration);assert.equal(validateReleaseOperatorBundle({artifact,policy:p}),true);}\n+ for(const configuration of [a,b]){const p=structuredClone(policy);p.observation.configuration=configuration;p.plan.configurationHash=finiteActivationConfigurationHash(configuration);assert.equal(validateFiniteReleaseOperatorBundle({artifact,policy:p}),true);}\n  const bad=structuredClone(b),raw=bad.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY'),invalid=JSON.parse(raw.text);invalid.clientId='wrong-private-client';raw.text=JSON.stringify(invalid);\n- const invalidPolicy=structuredClone(policy);invalidPolicy.observation.configuration=bad;invalidPolicy.plan.configurationHash=activationConfigurationHash(bad);\n+ const invalidPolicy=structuredClone(policy);invalidPolicy.observation.configuration=bad;invalidPolicy.plan.configurationHash=finiteActivationConfigurationHash(invalidPolicy.observation.configuration);\n  assert.deepEqual(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}),api.projectFinitePublicConfiguration({role:'canaryLive',metadata:bad}));\n- assert.throws(()=>validateReleaseOperatorBundle({artifact,policy:invalidPolicy}),/Release operator plan unavailable/);\n+ assert.throws(()=>validateFiniteReleaseOperatorBundle({artifact,policy:invalidPolicy}),/Release operator plan unavailable/);\n  assert.deepEqual(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}),api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}));\n- assert.notEqual(activationConfigurationHash(a),activationConfigurationHash(b));\n+ assert.throws(()=>activationConfigurationHash(a),'old activation reader must reject new candidate flags');\n+ assert.notEqual(finiteActivationConfigurationHash(a),finiteActivationConfigurationHash(b));\n  assert.notEqual(restorationConfigurationHash(a),restorationConfigurationHash(b));\n- assert.notEqual(activationConfigurationHash(a),restorationConfigurationHash(a));\n+ assert.notEqual(finiteActivationConfigurationHash(a),restorationConfigurationHash(a));\n  const projected=JSON.stringify(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}));\n  assert(!projected.includes('SYNTHETIC-PRIVATE'));\n });\n@@ -82,7 +83,51 @@ test('finite canary source preserves existing SQLite Container relationship and\n  const actual=fixture(),detached=structuredClone(actual);\n  delete detached.exports.AfwOwnEventNode.container;detached.containers=[];\n  assert.throws(()=>api.projectFinitePublicConfiguration({role:'canaryLive',metadata:detached}));\n- assert.notEqual(activationConfigurationHash(actual),activationConfigurationHash(detached));\n+ assert.throws(()=>activationConfigurationHash(actual),'old activation reader must not reinterpret new candidate');\n+ assert.notEqual(finiteActivationConfigurationHash(actual),finiteActivationConfigurationHash(detached));\n  assert.notEqual(restorationConfigurationHash(actual),restorationConfigurationHash(detached));\n  assert.equal(p.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE').namespace_id,'d6fc71552de7494a863aca20365a572d');\n });\n+\n+test('new finite candidate flags are exact before every phase and reject old or expanded profiles',()=>{\n+ const expected={qaLive:['nodejs_compat','enable_request_signal'],canaryLive:['nodejs_compat','global_fetch_strictly_public','enable_request_signal']};\n+ for(const role of Object.keys(expected)){\n+  const profile=role==='canaryLive'?fixture():structuredClone(api.finitePublicProfileTemplate(role));\n+  const template=api.finitePublicProfileTemplate(role),config=api.finiteWranglerProfileTemplate(role);\n+  assert.equal(template.compatibility_date,'2026-09-07');\n+  assert.equal(config.compatibility_date,'2026-09-07');\n+  assert.deepEqual(template.compatibility_flags,expected[role]);\n+  assert.deepEqual(config.compatibility_flags,expected[role]);\n+  assert.deepEqual(api.projectFinitePublicConfiguration({role,metadata:profile}).compatibility_flags,expected[role]);\n+  for(const flags of [expected[role].slice(0,-1),[...expected[role].slice(0,-1),'request_signal_passthrough'],[...expected[role],'request_signal_passthrough'],[...expected[role]].reverse()]){\n+   const changed=structuredClone(profile);changed.compatibility_flags=flags;\n+   assert.throws(()=>api.projectFinitePublicConfiguration({role,metadata:changed}),role+' must reject nonexact candidate flags');\n+  }\n+ }\n+});\n+\n+test('legacy bundle remains independently strict for the historical compatibility pair',()=>{\n+ const script='export default {fetch(){return new Response(null,{status:404})}}',artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};\n+ const policy=inertNamedConfirmationPolicy(artifact);\n+ assert.deepEqual(policy.observation.configuration.compatibility_flags,['nodejs_compat','global_fetch_strictly_public']);\n+ assert.equal(validateReleaseOperatorBundle({artifact,policy}),true);\n+ const historical=policy.observation.configuration,changed=structuredClone(historical),binding=changed.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');\n+ binding.text=JSON.stringify({...JSON.parse(binding.text),grantId:'ci-only-second-inert'});\n+ assert.notEqual(activationConfigurationHash(historical),activationConfigurationHash(changed));\n+ assert.notEqual(restorationConfigurationHash(historical),restorationConfigurationHash(changed));\n+ assert.notEqual(activationConfigurationHash(historical),restorationConfigurationHash(historical));\n+ assert.throws(()=>validateFiniteReleaseOperatorBundle({artifact,policy}));\n+});\n+\n+test('candidate descriptor declares fixed finite activation while QA remains null',()=>{\n+ const M='a'.repeat(40),tree='b'.repeat(40),roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];\n+ const versions={qaClosed:'c570b60b-95dc-48e1-89f3-9c4651691dbc',canaryClosed:'2607abae-cec3-4e35-89eb-8b8572262b54',operatorClosed:'855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'},keys={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'};\n+ const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:M,sourceTree:tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'c'.repeat(64),modules:Object.fromEntries(roles.map(role=>[role,{provenance:versions[role]?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:keys[role],versionId:versions[role]}:{kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',bytes:1,sha256:'d'.repeat(64),exports:[]},publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)}}])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};\n+\n+ for(const role of ['qaLive','canaryLive']){\n+  manifest.modules[role].publicStatic=api.finitePublicStaticExpectation(role);\n+  const metadata=role==='canaryLive'?fixture():structuredClone(api.finitePublicProfileTemplate(role));\n+  const descriptor=api.qualifyFiniteSourceRoleMetadata({manifest,role,metadata});\n+  assert.equal(descriptor.privateFull.activationAlgorithm,role==='canaryLive'?'finiteActivationConfigurationHash':null);\n+ }\n+});"
+    },
+    {
+      "path": "wrangler.independent-closure-qa.finite.jsonc",
+      "status": "modified",
+      "additions": 2,
+      "deletions": 1,
+      "patch": "@@ -112,7 +112,8 @@\n     \"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED\": \"true\"\n   },\n   \"compatibility_flags\": [\n-    \"nodejs_compat\"\n+    \"nodejs_compat\",\n+    \"enable_request_signal\"\n   ],\n   \"version_metadata\": {\n     \"binding\": \"AFW_QA_VERSION\""
+    },
+    {
+      "path": "wrangler.mcp-own.finite.jsonc",
+      "status": "modified",
+      "additions": 2,
+      "deletions": 1,
+      "patch": "@@ -5,7 +5,8 @@\n   \"compatibility_date\": \"2026-09-07\",\n   \"compatibility_flags\": [\n     \"nodejs_compat\",\n-    \"global_fetch_strictly_public\"\n+    \"global_fetch_strictly_public\",\n+    \"enable_request_signal\"\n   ],\n   \"workers_dev\": false,\n   \"preview_urls\": false,"
+    }
+  ],
+  "originalCheckpointCommits": [
+    {
+      "sha": "1d601fcce56f0f98d10a0ad32f4a5737d6b55dc0",
+      "message": "test(afw): require actual finite receiver signal abort"
+    },
+    {
+      "sha": "d2e5d8ce513ada7c9ecb19829a2bff60c5597cd5",
+      "message": "feat(afw): test exact finite incoming signal opt-in"
+    },
+    {
+      "sha": "c338f90c9ce29f6dbbfff70274e1c7f070c6a38c",
+      "message": "test(afw): verify exact finite profiles and receiver guard settlement"
+    },
+    {
+      "sha": "ccc7624e52c54884691343c0495bbe17c06dcd56",
+      "message": "test(afw): distinguish logical receiver return from retained native read"
+    },
+    {
+      "sha": "e29fe8ec607e3ac702a3b09f6795a694c2723195",
+      "message": "test(afw): await physical reader cancellation after release"
+    },
+    {
+      "sha": "e7ed164d08dddd4f2fca0004d54c8ea52a3688d5",
+      "message": "test(afw): keep old activation fixture pinned apart from new candidates"
+    },
+    {
+      "sha": "ab85ac8f9e0e1383d573d49fee6742c04976e5b1",
+      "message": "ci(afw): isolate finite compilation and historical diagnostics"
+    },
+    {
+      "sha": "62307cbad80455689486ff52e2216867bfecddcc",
+      "message": "ci(afw): inventory finite candidate hash call sites"
+    },
+    {
+      "sha": "e6f6aff834fdf0b9af78665e98c6835e90911077",
+      "message": "ci(afw): use available scoped grep for finite hash inventory"
+    },
+    {
+      "sha": "bd923bab7225212e35e054b14c132de78195ec5e",
+      "message": "ci(afw): complete finite bundle hash call site inventory"
+    },
+    {
+      "sha": "3fb1751c901059c9acdb2a9f1de2f6470b9f3c41",
+      "message": "docs(afw): checkpoint signal opt-in evidence and Known path blocker"
+    }
+  ],
+  "acceptedDependencies": [
+    "C1 SpecPass/QualityApproved",
+    "C2 SpecPass/QualityApproved",
+    "C3 SpecPass/QualityApproved"
+  ],
+  "note": "Not a purported full parent-branch diff. This is the explicitly separated original source unit; fresh task reviews cover the excluded compatibility checkpoint patches. Later full branch review remains required."
+}
[Source lacks final newline: before=true, after=true; exact blob references control.]

~~~~~~~~~~

## docs/superpowers/specs/2026-11-01-finite-material-bootstrap-correction.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-01-finite-material-bootstrap-correction.md b/docs/superpowers/specs/2026-11-01-finite-material-bootstrap-correction.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-01-finite-material-bootstrap-correction.md
@@ -0,0 +1,96 @@
+# Finite material bootstrap correction
+2026-11-01 · AFW · ROOT SOURCE RULING · operationalReadiness=false
+
+Baseline: feat/finite-native-cleanup-20261101 at 7d9214d82ca0b129bd318a60fcf01466f21166ea. Task4 partial code is 9fe8664d; its report remains incomplete. This document corrects the source protocol, not runtime state. No build, publication, credential/policy change, live command, finite occurrence, new namespace, public route, subscription or PC-off acceptance is authorized here. Task5 launcher/timing remains separate.
+
+## Selected bootstrap and invariants
+
+Use one immutable bounded TECHNICAL SEED in the existing GitHub observer-creation ref domain. Do not discover recent/latest comments or runs, compile a full plan, accept caller plan JSON, or introduce a nominal placeholder GHA workflow.
+
+Full private material is assembled at runtime from the seed's qualified public technical facts, approved compiled templates, actual native metadata and first-primary data. Compile only source identity/templates/factories, not their own output hash or future deployment/job IDs. Build hashes live in an EXTERNAL manifest. Public seed data carries no planHash/controlHash, grant/consent/subject/project selectors, owner data, callbacks, credentials, raw private policy, or executable payload. Seed existence grants no runtime authority.
+
+Original T0 is the exact authenticated issue497 comment.created_at. N1=T0+300000; C0=N1-60000; C1=N1+120000; R1=N1+180000. Existing 180000ms minimum remaining at preparation, nested leases, deadline checks and unknown-ACK rules remain unchanged. Every queue, build lookup, seed operation and readback consumes those original ends; no compensation/repost/renewal. Build and artifact availability are preflighted BEFORE a future live comment.
+
+## Exact seed record and canonical bytes
+
+Fixed repository: tokenizartinfo-ops/agent-friendly-web, repository ID1347578006; owner ID290715446/login tokenizartinfo-ops/type User. Existing ref: refs/tags/afw-finite-observer-create/<intentId>. It now points to an annotated tag, not directly to a commit. Existing refs of any shape are consumed/conflicting history; never upgrade, delete, force or replace them.
+
+Annotated tag: tag=afw-finite-observer-seed-<intentId>, object=<sourceRevision>, type=commit. Its message is canonical JSON of an envelope with EXACT keys purpose,seed,seedHash:
+- purpose = afw.finite-material-seed-envelope.v1.
+- seed EXACT keys purpose,repository,repositoryId,intentId,sourceRevision,commandId,finalizer,build,manifest,qaPublication.
+- seed.purpose = afw.finite-material-seed.v1; repository/repositoryId are the fixed values above. commandId is a positive decimal string; intentId is 64 lowercase hex; sourceRevision is 40 lowercase hex.
+- finalizer EXACT keys runId,attempt,jobId,workflowPath,seedStep. Positive safe-integer run/job IDs, attempt=1, workflowPath=.github/workflows/afw-finite-finalizer.yml, seedStep=seed-material.
+- build EXACT keys workflowPath,runId,attempt,artifactId,artifactName,artifactDigest,manifestHash. workflowPath=.github/workflows/afw-finite-native-package.yml; positive IDs; attempt=1; artifactName=afw-finite-native-package-<sourceRevision>; artifactDigest=sha256:<64 lowercase hex>; manifestHash=64 lowercase hex.
+- manifest is the fixed technical package projection below. No URLs or arbitrary path/resource selectors.
+
+Canonicalization recursively sorts plain-object keys by ASCII order, preserves array order, accepts only null/booleans/bounded strings/safe integers/arrays/plain data objects; rejects duplicate JSON keys, unknown fields, accessors, nonfinite numbers and prototype keys. No normalization of strings or dates. UTF-8 compact JSON without trailing newline. seedHash=SHA256(UTF8('afw.finite-material-seed.v1\n') || canonical(seed)); manifestHash uses domain afw.finite-native-manifest.v1 plus newline and canonical(manifest). These new domains do NOT change existing intentHash/planHash/controlHash algorithms. Recompute intent with the existing exact command-purpose/repository-ID/comment-ID/source/createdAt formula.
+
+Envelope maximum32768 UTF-8 bytes, depth12, 2048 nodes; manifest maximum24576 bytes. Decode canonical bytes strictly; recomputation must match. Artifact SHA256 remains over archive bytes, distinct from manifestHash and module hashes.
+
+## Package and exact locator
+
+NEW source-only packaging is required; no finite artifact currently exists by this checkpoint. Fixed proposed workflow .github/workflows/afw-finite-native-package.yml builds at accepted main source M and exports afw-finite-native-package-M. It must not materialize live private policy, deploy, invoke or embed future IDs.
+
+External manifest EXACT keys purpose,sourceRevision,sourceTree,sourceCheck,buildWorkflowHash,modules,compatibility:
+- purpose=afw.finite-native-package.v1; sourceRevision=M; sourceTree is the actual40hex tree; sourceCheck=git-inputs-and-configuration-before-after-v1; buildWorkflowHash is64hex.
+- modules EXACT role keys qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed. Each descriptor has EXACT keys sourceRevision,sourceTree,module,configurationHash,profileHash,bindingsHash. module has name,sha256,bytes,exports; exports is bounded sorted unique strings. Pure structural grammar fixes module.name=closed-rollback.mjs for qaClosed and index.mjs for the other four roles, bytes as a positive safe integer <=3145728 for EACH role, sha256 as64 lowercase hex, and exports as at most128 sorted unique ASCII JavaScript identifiers matching ^[A-Za-z_$][A-Za-z0-9_$]{0,127}$. Fixed archive contents are exactly SIX files: manifest.json and qaLive/index.mjs, qaClosed/closed-rollback.mjs, canaryLive/index.mjs, canaryClosed/index.mjs, operatorClosed/index.mjs. Structural acceptance is NOT profile qualification. Actual exports/class compatibility and independently committed configuration/profile/binding hash semantics are qualified by the4C source builder; no codec fixture can establish those semantics.
+- compatibility has EXACT keys qaClassesPreserved,qaNamespacesPreserved,canaryClassesPreserved,canaryNamespacesPreserved,closedEntrypointsDenied,legacyContainmentQualified; all true are source qualification assertions, not remote proof. Actual identities/configuration must independently qualify later.
+
+Candidate/rollback descriptors retain individual provenance. A historical operatorClosed descriptor keeps its historical source/tree and exact qualified bytes; never relabel it M. The builder must prove historical pins and closed compatibility. No runtime version/deployment ID appears in this build manifest. Read those IDs from exact actual provider metadata after publication; compare actual modules/profiles/bindings with this manifest. Build attestations alone are insufficient.
+
+GHA source resolver lists only the fixed package workflow runs with head_sha=M, branch=main, event=push, status=success. Require exact path/repository, completed success, attempt1, actual head M, and fixed workflow source at M. The package workflow must consequently have this fixed push-on-main production artifact event; PR qualification artifacts are not eligible. Bound to two100-item pages; any overflow/incomplete pagination fails. Require EXACTLY ONE eligible run, then EXACTLY ONE unexpired exact-name artifact (at most100 artifacts, complete listing). No latest selection, identical-manifest tie break or automatic rebuild. Fetch exact artifact by ID using existing GHA token; enforce64MiB archive/128MiB expanded/64files, no traversal/symlinks/extraneous files, and tighter builder module ceilings. Verify provider digest, manifest/source/tree/workflow hashes, canonical projection and every declared file hash/size. Ambiguity, expiry or unavailable digest blocks before seed issuance.
+
+Existing afw-independent-closure-M and afw-qa-fixed-context-M are CLOSED packages; named-confirmation output uses an expired synthetic policy. They cannot stand in for this finite package. Existing scripts/build-private-qa-named-context.mjs and scripts/build-private-qa-closed-context.mjs provide provenance/build patterns only. lib/mcp-qa-finite-source.mjs remains unavailable until the concrete resolver and package are qualified.
+
+## Original issuer, write order and primary seed qualification
+
+Add a separately named seed-material step BEFORE admit-and-ready in the actual admit job. Resolve that job ID from primary attempt1 jobs, not environment assertion. Only the once-launched original trusted seed process may create the annotated object/ref. Qualify original invocation with authenticated GitHub event/context, exact owner/sender/body, main/source, run/attempt/job and current original clocks before mutation. Inside the fixed trusted ONCE-launcher boundary, a process-private shared capability is consumed before the first mutation; default/reconstructed clients cannot obtain it. PID checks establish process coherence ONLY, not durable identity. SAME-attempt reexecution of the WHOLE launcher is EXCLUDED by the trusted execution boundary, not claimed to be technically prevented. The workflow machinery must not retry, supervise, or regenerate that launcher/capability. No new persistent process identity is invented. If that boundary is unqualified or the original process is lost, remain admin-pending even when no ref is visible.
+
+Before any POST consume the original process's one shared issuance capability. Create the annotated tag object once; only its newly acknowledged response may lead to the sole atomic ref POST. Tag-object creation alone grants nothing. Only ref201 for the exact new annotated tag, before original admission margin expires, plus independent GET of ref/tag and exact content readback, allows seed-material to succeed. Lost tag/ref ACK, existing ref, timeout, late response or restart permits GET-only reconciliation; never another tag/ref POST, refund or resumed issuance. Existing/uncertain records do not make the step successful. Preserve orphan objects/history.
+
+Strong ordering is seed NEW-ACK + readback + primary seed-material success -> root/operator exact observer creation -> GET-only GHA adoption -> successful FIRST preview -> admit-and-ready success -> native prepare/guard/claim. This requires source changes to split the current CLI phase and remove GHA observer create in adoption mode. No precreated-missing-seed polling capability is implied. Root/operator creation and future publication require their applicable separate authorization.
+
+Native lookup uses only fixed public api.github.com GETs: exact ref, exact returned tag SHA, exact named comment, main ref, exact finalizer run and attempt1 jobs, exact package run/workflow-source metadata as needed. No native GitHub key. Validate origin, numeric/status fields, dates, content type and primary freshness using existing bounded transport principles; no redirects/arbitrary URLs. Maximum12 requests per hydration,100jobs,32768-byte seed,262144 aggregate metadata bytes and the existing original5s operation deadline; no retries or new time window. Rate limits, partial listings, unavailable public metadata or truncation fail closed. Cache immutable canonical seed identity only; never turn cached job/readiness/policy observations into fresh evidence.
+
+Independently require comment ID/body '/afw-qa-finite-confirmation v1 '+M, createdAt and owner; recomputed input intent; main=M; finalizer path/event issue_comment/head M/main/attempt1/owner and exact display_title 'AFW finite finalizer comment-<ID> source-<M>'. Exact admit job must belong to that run/source. seed-material must be completed success with timestamps inside the original window; readiness is a LATER separate step. The pinned workflow implementation must prove that this step can succeed only through NEW issuance/readback. Tagger identity/message alone is insufficient. On recovery retain the same seed/ref/tag/job identities; changed primaries block.
+
+Native never downloads private Actions artifacts. It validates bounded public technical seed provenance against the qualified source workflow and actual Cloudflare metadata/module bytes using existing read custody. The seed-material phase also qualifies its actual GHA custody without exporting secret values or private policy into the seed. Source qualification must demonstrate that the GHA step actually validated the archive; merely copying an arbitrary manifest into a tag is not acceptable.
+
+## Nominal identity and phase inventory correction
+
+Remove workflows.nominalRunId and its inequality with finalizer.runId from Task1 and external-plan validators/projections. The actual nominal is Cloudflare PrivateQaNamedConfirmation, exact definition/script and instance afw-release-<bundleHash>. No second do-nothing GHA workflow. finalizer.runId/attempt/admit job remain independently qualified.
+
+Desired future correction, owned by4C/Task5 alongside the actual child-create SEND journal/source producer (NOT implemented in4B): update lib/mcp-fixed-terminal-workflows.mjs: preview/arm requires full inventory showing exact nominal absence AND fixed SOURCE-producer evidence that the child-create SEND was never issued, correlated to exact native control/intent/source. A caller boolean/string or provider absence alone is insufficient. Task1's nominal permission claim is NOT Task5's child-create SEND journal and may already exist before deferred creation. The inventory type boundary consumes only qualified internal producer evidence; missing Task5 journal producer stays unavailable. This document does not invent future journal values or a public proof-minting API; nominal phase checks exact existing native instance; both restores require nominal terminal and all scoped writers settled. Missing is never silently terminal. Before-create failure remains admin-pending under this contract; any no-creation cleanup exception needs a separate explicit ruling. Observer must be exact/provenance-qualified, may be active at canary restore, must be complete at QA restore. Full definitions/instances remain enumerated.
+
+Task5 will add the separately typed fixed launcher identity, admissible phases and once-send journal; launcher must terminalize before both restores. No launcher/timer is implemented here. Actual QA closed metadata had Bootstrap only; NamedConfirmation binding is not installed despite repository config. Task4/5 must qualify and explicitly mount it. Preserve guard C0 and sole-payload nominal event {planHash}, original provider event/70s lease and nested5s/20s. No wrapper timestamp substitution.
+
+## Actual custody, changes and acceptance
+
+Existing GHA custody is the ACCOUNT-owned token correlated at 17:22UTC, ID9db7901af95faf07e6f7ef378045328e, with dated 17:25UTC policy metadata and expiry2026-11-08T02:59:59Z. Use a SOURCE-APPROVED DATED STATIC policy receipt bound to exact account/token ID/expiry and fixed resource/action scope. Fresh ACCOUNT self-verification checks exact ID, active status and expiry; fixed-resource GETs provide their own current operation evidence. Do not query /user/tokens, demand policy-read/TokenRead scope, require two permission groups or copy a GitHub credential shape rule to Cloudflare.
+
+UNCHANGED POLICY is an explicit trusted-operator assumption for this bounded source protocol. The static receipt is NOT fresh scope equivalence; never emit scopeVerified=true or claim current full policy readback. Cloudflare independently checks actual permission at each fixed mutation. Denial/uncertainty consumes that issued effect and leaves admin-pending/GET-only reconciliation, never replay, scope expansion or credential repair. Missing/mismatched/expired receipt or self-verification blocks before authority; known policy change invalidates the assumption. No new key/scope, broad account write, IndividualAdmin assumption or policy mutation.
+
+The native QA reader may be DISTINCT. It needs its OWN source-approved dated receipt and actual self-verification of its qualified token kind/account/ID/expiry plus fixed GET evidence; it remains unavailable until qualified. Never alias the GHA key or infer its rights/kind from GHA metadata. Keep canary publisher separate. Adoption consumes GETs; QA restoration uses the bounded assumed-unchanged QA-edit policy with provider enforcement, not Workflow REST creation rights.
+
+Implementation is split: Task4B strict seed/manifest structural codec, removal of fictitious nominalRunId/inequality, fixed artifact resolver and seed/adoption protocol; Task4C actual producer/profile/package integration. Actual arm-absence phase-inventory implementation belongs4C/Task5 with its concrete child-create SEND journal and source producer. Existing inventory remains fail-closed for absent nominal throughout4B. Task4B MUST NOT invent evidence brands, proof-minting functions or future-journal fields, or add positive arm-absence fixture authority. A source stub is not completion of either slice.
+
+Affected source: mcp-qa-finite-http/source/observer-native/external-contract/trial-control modules; fixed-terminal inventory; finalizer CLI/workflow; actual factory/profile builder; tests and finite spec/brief contracts. This is a revision of UNMOUNTED finite source; regenerate candidate canonical material, never reinterpret existing bare refs, legacy records, consumed claims or historical hashes. Preserve Task1 same-object acknowledged prepare for a new nominal claim; reconstruction may only use an already issued legitimate child claim.
+
+Required source tests: seed grammar/hash/size, wrongowner/comment/source/job/step, edited/conflicting primary, old bare ref, lost/late tag and ref ACK, restart/no second POST, ready-cycle separation, ambiguous/expired/mismatched package, module self-hash absence, public GET rate/overflow/timeout failures, account-token verify, unavailable/mismatched dated receipts, explicit unchanged-policy assumption and mutation denial without replay, missing nominal at arm versus restore, full inventory and Task5 launcher boundary. Current synthetic fixtures do not prove custody, installed bindings, source package availability, guard liveness or PC-off operation. operationalReadiness=false.
+
+Primary references: [GitHub comments](https://docs.github.com/en/rest/issues/comments), [runs](https://docs.github.com/en/rest/actions/workflow-runs), [jobs](https://docs.github.com/en/rest/actions/workflow-jobs), [Cloudflare Workflow binding API](https://developers.cloudflare.com/workflows/build/workers-api/).
+
+## Accepted builder check (2026-11-01)
+Root reports the fresh builder check returned exactly two blocking rulings, both accepted: dated-static-policy receipt plus explicit unchanged-policy assumption (not fresh scope proof), and process-private consumption only within the trusted ONCE-launcher boundary (same-attempt whole-launcher reexecution excluded, not prevented). Those rulings are incorporated above. No further builder blocking questions were reported on the remaining contract. This is source design evidence, not provider validation. Task4A's prior scoped acceptance remains unchanged; Task4B/4C and Task5 remain distinct pending work.
+
+## Root implementation sequencing ruling (2026-11-01)
+Before code, root moved actual arm-absence inventory implementation from4B Task1 to4C/Task5, where the concrete child-create SEND journal and source producer can be designed together. Desired future behavior above is unchanged. Task4B Task1 tests keep absent nominal blocked; it changes only strict structural codec and fictitious nominal GHA identity removal. Structural manifest fixtures prove syntax/hashes, not exports/configuration/profile semantics. Exact module basename/cap/exports grammar and six-file archive layout are fixed above. Root settled this sequencing; no further builder check is required by this ruling.
+
+## Root correction — preserve QA closed main module basename
+The approved existing source pin QA_CLOUD_CLOSED_PINS.qaClosed in lib/mcp-qa-cloud-closed-pins.mjs names closed-rollback.mjs (395915 bytes, SHA2564b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f; dated versionc570b60b-95dc-48e1-89f3-9c4651691dbc). Therefore qaClosed.module.name is hardfixed to closed-rollback.mjs and its archive path is qaClosed/closed-rollback.mjs; the other four roles keep index.mjs. Exactly six files and all other structural bounds remain. This corrects the ROOT contract after accepted Task1, whose original implementation complied with the earlier all-index grammar; it is not a Task1 implementation bug. No actual Cloudflare module is renamed, no current remote state or semantic profile compatibility follows from the format, and the actual approved frozen source identity/profile qualification remains4C.
+
+
+## Root QA publication bridge amendment — Task4B Task3
+The REQUIRED qaPublication field is exactly specified in 2026-11-01-finite-qa-code-provenance-bridge.md, reviewed with one timestamp-cycle ruling incorporated at8d547123. It binds actual GHA-verified published QA live/closed bytes to immutable version IDs and the actual live deployment. Native direct qaCodeProvenanceVerified remainsfalse; qualified bridge evidence has its distinct name and requires exact source/seed-step lineage plus native version/fresh pointers. The issuer checks only actual primary START/in-progress before issuance; only LATER native qualification checks completed success and started_at<=observedAt<=completed_at. No future completion is fabricated. This changes unmounted seed grammar; no old ref upgrade/history rewrite.
+The QA closed literal pin has no original Git source/tree in its current locator.4C must qualify historical source provenance or explicitly review a content-pin alternative/new compatible artifact before package production; copying bytes atM does not relabel authorship. Filename correction remains qaClosed/closed-rollback.mjs.
+Root-approved sanitized GHA dated receipt is scripts/mcp-qa-finite-custody-receipt.json. It commits actual17:25metadata; no raw policy or key value is published. Its hash uses domain afw.finite-static-policy.v1 newline plus recursively key-sorted normalized metadata (account/token/notbefore/expiry/condition flags; each policy effect,sorted permissionGroupIds,resources). Scope remains assumed unchanged, NOT freshly equivalent; no scopeVerified=true. Native candidate9aa remains DISTINCT/unmatched until its own source-qualified verification.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-01-finite-native-confirmation-cleanup.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-01-finite-native-confirmation-cleanup.md b/docs/superpowers/specs/2026-11-01-finite-native-confirmation-cleanup.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-01-finite-native-confirmation-cleanup.md
@@ -0,0 +1,186 @@
+Implementation baseline cd13d3de95e32adaef0411e94b5665dae3cdbcc2/tree c3faa9d40dd38f5cb0f4ee03972ef07f12e375cb, accepted PR709 (complete known-cancellation adapter + actual wrapper). Fresh design and focused containment reviews accepted with recorded root rulings. Historical design baseline7163 remains below; runtime readiness=false.
+
+# Finite native confirmation and independent cleanup
+2026-11-01 · AFW · DESIGN ONLY · root design review required before implementation
+
+## Decision and scope
+Base main7163bde8a956f82fe1a55bae1116123c3ee72371, tree b54cdf73a8514cbb21a24c679dd93685e4b5c4fe. Follow the 30Oct shared-finite-release-runtime design: host the existing confirm_named runtime in existing QA PrivateQaNamedConfirmation, leaving exact closed operator855 and its deployment unchanged. This is the next source block after the trusted known-cancellation adapter; merge/review that dependency before composing its actual exported contract. No implementation, configuration activation, credential change, remote DDL or trial is authorized by this document.
+
+No existing generation finalizer is hidden in source. Generation ledger/resolver/ARM are metadata only. Full optional V2 lineage/packet producer is not required for this bounded trial. Existing consumed legacy controls/journals remain immutable; no resets, alternative actor, refund or old-intent replay.
+
+## Existing anchors
+- worker/mcp-release/index.mjs and lib/mcp-release-runtime.mjs expose runReleaseWorkflow({bundle,env,event,step,authorize,cancellationHistory}); all four release enable flags must actually be true.
+- worker/independent-closure/index.mjs PrivateQaNamedConfirmation currently observes only; the fixed MCP actor's alarm is unavailable.
+- assistance-closure-alarm-lifecycle.mjs and assistance-independent-closure.mjs supply durable alarm-before-action, three recovery deliveries, issued-before-effect and read-only reconciliation. Their singleton keys and missing absolute expiry make direct reuse unsafe; extend their logic through a fixed versioned adapter, preserving existing APIs/keys.
+- mcp-hosted-canary-restoration.mjs legacy control/journals are consumed. mcp-successor-retirement-handoff.mjs capture()/observe(), mcp-successor-canary-restorer.mjs advance(), and mcp-canary-restoration-transport.mjs contain useful narrowly scoped operations. They do not install this guard.
+- mcp-qa-cloud-closed-rollback.mjs/http.mjs admit only two all-false artifacts and terminal inventories. Keep that route unchanged; it cannot finalize a live trial.
+
+## Real QA runtime profile
+Add a separately validated finite profile, not env normalization. Deployment must actually contain AFW_RELEASE_OPERATOR_ENABLED, AFW_RELEASE_WORKFLOW_ENABLED, AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED and AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED=true; normal checked-in/default closed behavior stays false. Existing QA unrelated flags/policies remain explicitly closed. Add real RELEASE_DB bound to canary D1 6a728254, distinct from AFW_QA_DB676, and AFW_RELEASE_EVENTS_NODE bound to the existing canary AfwOwnEventNode. Credential capability uses the authorized read custody through an explicit checked alias or actual AFW_RELEASE_READ_TOKEN; never silently copy arbitrary env values. Metadata verifies resource identity, not secret bytes.
+
+Use actual AFW_QA_VERSION, compiled source/tree/module hashes and primary version/binding/deployment reads. Workflow.versionId is not executable-code evidence. Pin the exact native artifact/profile in the finite control; no fake native version. A compatible closed rollback must retain classes/namespaces/history and qualified custody without an operative entrypoint.
+
+Proposed private module lib/mcp-qa-finite-confirmation.mjs exports runPrivateQaFiniteConfirmation({env,event,step}). It accepts only one compiled trial identity, authenticates the administrative ingress, obtains the trusted cancellation/current-grant adapter, checks independent cleanup readiness, then calls accepted runKnownCancellationReleaseWorkflow({bundle,env,event,step}) with actual capabilities. Pass the ORIGINAL native event unchanged: instanceId afw-release-<bundleHash>, sole payload {planHash:bundleHash}; no payload.operation selector or synthetic replacement event. Trusted compiled/control state selects the route. Preserve original event70s lease, nested reservation5s/activation20s and cancellation propagation, further bounded by outer N1. Public HTTP remains closed. Reserve means prepared/mayBoot=false; Task4 also qualifies the existing subscribe->custody.start->launch gate->delivery->unsubscribe/close path under current consent without inventing a receiver or executing a trial during source work.
+
+## Original clocks and fixed trial material
+Use a NEW fixed command kind and append-only claim domain; never feed this through existing closed-only commands. Original admission T0=authenticated command.created_at, N1=T0+300000, R1=N1+180000. Queue/build/preflight consume these same ends; reject future timestamps and clock reversal, never compensate clocks. Current nominal consent must cover the requested nominal operation and must not be extended to N1; effective nominal deadline is min(N1, consent/token/candidate deadlines). Require at least180000ms nominal remaining before arming. Set C0=N1-60000, C1=N1+120000; R1 is QA-finalizer deadline. A narrower consent deadline does not move these clocks; eligibility blocks nominal work outside its actual scope.
+
+Immutable trial material contains versioned purpose, intentId, original command/source identity, trial/grant/monitor/event/plan hashes, T0/N1/C0/C1/R1, exact actor/container/application/namespace/D1 identities, source/native deployment/profile bindings, canary live/closed and closed operator pins, QA live/closed pins, scoped withdrawal/close policies, exact expected Workflow instance identities, and finalizer identity. Hash canonical bytes with a dedicated domain. No caller URLs, SQL, method names, arbitrary resource selectors or secrets. Server derives material from approved source-qualified templates and primary observations; event only selects the exact already-fixed intent.
+
+## New root choice — prospective legacy-dispatch containment
+This is a NEW finite-profile requirement, not evidence that the historical callback completed. Preserve actual inherited prepared_dispatch=issued, reduction_dispatch=complete, restoration/retirement absent, their exact hashes and retainedUncertainty=true. Source-qualified old prepared dispatch can perform delivery-budget/transport writes and one callback; it cannot launch, reserve or publish. It only invokes legacy deliverOwnSaved(eventId). Keep separate legacy reduction/restoration controls withdrawn/expired and qualify their original source/capabilities; no global exemption for historical issued effects.
+
+Define distinct entrypoint types: legacy_saved_event and finite_trial_event. In the REAL finite canary module/profile, AfwOwnEventNode.deliverOwnSaved rejects synchronously before #host, auth, readiness, storage, budget or transport access. No wrapper normalizes flags; missing/unknown finite profile fails closed. Closed rollback denies both delivery entrypoints. New deliverFiniteOwnSaved({intentId,controlHash}) accepts ONLY exact intent/control references. No caller OAuth/context, event, grant, subscription, selector, callback or window. No fallback/alias between entrypoint types. Audit deliverSaved, scheduled paths, generic private dispatch, consume bridge and HTTP/MCP mappings; old authority cannot reach a finite delivery through an alternative path. Normal authenticated subscription remains a separately authorized current-consent route.
+
+Implement a concrete createFiniteOwnEventControlResolver({env,ctx,sourceRevision,now}) in lib/mcp-own-finite-control.mjs, not an injected successful mock or fabricated env. Its sole lookup uses an explicit REAL AFW_FINITE_TRIAL_CONTROL binding to existing QA IndependentClosure at the fixed control actor, invoking readFiniteOwnEventControl({intentId,controlHash}). This new private QA method returns a bounded immutable finite_trial_event record with native/source/profile/control hashes, fixed canary actor, original deadlines and PLANNED server-resolved grant/project/subject/client/resource/consent/program/container/source/window selectors plus saveIdempotencyKey and expectedProjectRevision, never credentials or callback. Planned event identity is a selector only. Subscription/process/save facts are captured later through captureObservedFacts(kind); prepare() does not invent future receipts. Private fields remain inside trusted server capability, not public evidence/logs. Producer is the existing proposed finite prepare() path, extended to persist this exact private record from approved source-qualified material and primary current-consent data; it rejects caller-authored scope. Resolver validates actual binding target/native identity and record hash, then first-primary current grant/monitor/subscription correlation under the original parent lease. Native canary class/profile admits the method only for exact active control and grants; an abstract unresolved capability is not qualification.
+
+Before any new nominal authority, qualify actual finite module/bindings/profile and deny-first gate against source; guard prepare() then requires complete fresh primary quiescence, exact inherited history, old grant/monitor revocation/expiry and separate old-writer containment. Historical callback ACK remains unknown, but recovering the old event ID is not required solely to prevent late RPC retargeting. Already-entered old code retains copied grant/window/program/source/subscription/process context; source and native tests must verify that no await refreshes it to a new grant and no delayed write affects a new-generation budget. Old signed dispatch/consume packets must fail generation/expiry checks. Preserve all global budgets/custody keys: containment never refunds an old consumption. Any uncovered cross-generation writer, unqualified module/binding, missing primary evidence or unresolved current/new-scope write blocks arm. Raw old source provenance and separate publication/withdrawal fences are still required.
+
+Native acceptance uses actual inherited issued/complete/absent/absent commitments. Hold an old RPC before receiver entry across finite deployment selection: deny with zero host/auth/readiness/storage/budget/transport access. Hold already-entered continuations at every relevant await, hold transactions/writes across withdrawal/reconstruction, and deliver old signed packets after new generation. Verify denial or preserved old uncertainty without new-scope mutation; do not assert atomic remote cancellation. Fresh focused architecture review of this new choice precedes implementation.
+
+## Root ruling — planned selectors and append-only observed facts
+Prepared INFO contains PLANNED selectors only: exact grant/subject/project/client/resource/consent/program/container/source/windows, saveIdempotencyKey and expectedProjectRevision. A plannedEventId may use the existing mcp-own-synthetic-save.mjs deterministic SHA256(JSON.stringify(['afw.own-synthetic-save.v1',subject,projectId,saveIdempotencyKey])); this is neither a receipt nor save proof. The save goal is fixed by the source-qualified save template, never supplied through capture. The expected saved revision is exactly expectedProjectRevision+1 and fingerprint follows the existing grant/expectedRevision/fixed-goal formula. Keep INFO/controlHash unchanged.
+
+Add captureObservedFacts(kind), with kind a FIXED INTERNAL enum subscription/process/saved_event; no arbitrary facts/selector input or generic RPC. Its qualified producer queries only fixed first-primary selectors, correlating control/native/source identity and original finite lease. Subscription captures exact actual subscription ID/process generation/expiry plus canonical receipt hash; process captures exact admission generation/manifest/receipt hash; saved_event captures exact deterministic event ID, saved revision, canonical fingerprint and receipt hash. Store each once under append-only per-intent fact keys with controlHash/kind/factHash/observedAt. No subscription ID/process generation/event existence is synthesized during prepare. Facts are private, bounded and secret-free: no callback URL/secret, token, answers or customer payload. Store only necessary technical fields and evidence hashes, never rewrite INFO or select the latest subscription/event.
+
+Missing primary facts returns not_yet_observed with read-only behavior; no placeholder or append. Conflict, duplicate candidate rows, wrong revision/fingerprint, replacement receipt, unexpected process generation or contradictory captured fact blocks. After capture, resolver must compare primary facts and EXACT expectedProjectRevision+1/fingerprint against the retained record and planned selectors; a newer/latest revision cannot substitute. A pre-existing identical capture may be read/verified, not appended again. Unknown capture ACK permits only reconciliation of the exact record by intent/control/kind/hash; no overwrite, renewed claim or replay of subscribe/save/delivery effects.
+
+Cleanup can read retained facts under its separate original finite authority without OAuth renewal. Missing/conflicting facts or unavailable qualified transport yields blocked/admin-pending as appropriate, never synthetic receipts. Focused Task1/4 native acceptance prepares BEFORE subscribe/save and proves no future facts; later exact primary facts qualify once; wrong revision, duplicate/replacement receipt, unknown capture ACK and changed generation deny or reconcile read-only. This narrow ruling follows focused containment approval; root requires no additional design review solely for this clarification.
+
+## Durable producer and alarm
+Proposed lib/mcp-qa-finite-trial-control.mjs exports createPrivateQaFiniteTrialControl({storage,nativePin,plan,readPrimary,now}) -> prepare(), read(), captureObservedFacts(kind), withdrawNominal(), claimEffect(kind), reconcileEffect(kind,receipt).
+Fixed methods only; kind is a compile-time internal enum. Keys use afw.qa-finite-trial.v1 plus immutable intentId. A fixed head allows one outstanding trial; append-only intent claims and prior records are never deleted/reused. Require exact withdrawn/expired legacy controls and journal commitments, V2 empty, and no competing finite head. The historical prepared-dispatch issued marker is admissible ONLY under the prospective containment predicate below; every unresolved current/new-scope writer and any uncontained separate legacy writer remains a blocker. New future profiles require explicit compatibility review, not fallback to legacy.
+
+prepare() transaction persists immutable INFO, CONTROL pending and original C0 alarm before nominal admission. Read back exact stored bytes/native pin and storage.getAlarm()==C0 in a separate bounded read; only then CAS pending to armed. Return a source/intent-bound receipt after primary/native readback. Unknown ACK/late commit is uncertain: no retry and no nominal effect. Alarm may safely clean up its own pending control because partial activation is possible; pending is not nominal authority. Persist finalizer-ready evidence before transitioning armed: fresh GitHub primary readback must correlate the exact repository/run/attempt/source/intent, an in-progress finalizer job, and its completed admit-and-ready step after fixed resource/custody/window checks. A queued workflow or caller ready boolean is insufficient; readiness is point-in-time evidence, not guaranteed future execution. Nominal claim requires armed plus current primary consent, unchanged pins and unexpired original lease.
+
+Proposed lib/mcp-qa-finite-trial-guard.mjs exports createPrivateQaFiniteTrialGuard({ctx,env,control,capabilities,now}) -> arm(), status(), alarm(). Mount only for existing fixed MCP actor. Reuse bounded alarm/coordinator logic with versioned per-intent keys and absolute C1/R1 checks. Persist next bounded recovery before effects; at most three deliveries, with recovery of issued operations read-only. Cancellation or loss of nominal Workflow/runner cannot cancel the durable alarm. Arm/status never claim guard liveness solely from metadata: native alarm execution requires separate proof.
+
+## Cleanup order and physical evidence
+At C0, use exact scoped permission withdrawal/close RPC independent of live OAuth eligibility; no generic bypass. Immutable cleanup control remains available after nominal withdrawal/expiry. Preserve pending/issued/complete per-effect state before every mutation. Use mcp-own-permission-withdrawal and existing node close methods with explicit original finite policies; widen no deadline. A receipt requesting stop is not physical stop.
+
+Use the finite discriminated cleanup proof below. Existing retired-custody handoff requires a stopped instance and retired_handoff_observed/physicalStopVerified=true; no-admission is NOT accepted by that legacy consumer. Add a finite-only proof consumer/restorer adapter, retaining legacy grammar/checks unchanged. Journal namespacing alone is insufficient.
+
+Mandatory phase-aware inventory extends mcp-fixed-terminal-workflows with a separate finite-trial entrypoint. During arm/nominal observation it may admit ONLY exact expected confirmation definition+instance+source-bound trial and qualified bootstrap instance; enumerate all other definitions/instances and require terminal. Before canary/QA restore require actual nominal termination and no unresolved nominal writer; if phase cannot be distinguished, wait for terminal instead of skipping a definition. Guard is a DO, not a Workflow required terminal before its own action; external finalizer is a GHA run. Exact operator stays closed. Preserve one-POST unknown-ACK fences and per-intent journals.
+
+## Native no-admission proof and discriminated consumers
+Add lib/mcp-own-finite-cleanup-proof.mjs and private AfwOwnEventNode methods sealFiniteTrialAdmission({intentId,planHash}) and observeFiniteTrialCleanup({intentId,planHash,proofChallenge}). Arguments must equal immutable trusted native configuration; they select no caller authority/resource. Seal is an authorized cleanup mutation with its own consumed-before-send journal, original C1 bound and unknown-ACK fence. Native producer verifies actual source/profile, fixed DO identity, grant/trial/container/program/source and control hashes. The SAME transactional DO gate used by EVERY finite-profile custody admission/launch persists an irreversible per-intent seal and a launchIssued marker BEFORE runtime.launch. After seal, no new admission/launch is permitted; uncovered paths deny profile qualification. Legacy paths remain unchanged.
+
+Exact finite proof union:
+common {purpose:'afw.finite-trial-cleanup-proof.v1',kind,intentId,planHash,controlHash,sourceRevision,runtimeVersionId,containerId,applicationId,grantHash,trialId,sealHash,proofChallenge,observedAt,evidenceHash}.
+kind='retired_process' adds {retirementHandoff}; validate the existing strict stopped-instance/handoff fully. physicalStopVerified=true occurs only inside that genuine handoff.
+kind='sealed_without_admission' adds {sealedAt,admissionClosed:true,launchNeverIssued:true,primaryWriterSetHash,primaryWriterTerminal:true,primarySnapshotHash,providerAbsenceHash}; it has NO physicalStopVerified flag.
+
+The second variant needs acknowledged/readback-correlated native seal; complete fixed writer inventory (confirmation reservation and native process-admission continuations), durable terminal write receipts, no issued/unknown admission/launch, and first-primary snapshot AFTER writer completion showing no exact candidate process admission/launch claim. Terminal Workflow status alone does not prove remote writes settled. Pre-seal admitted/in-flight writers must settle with correlated receipts; ANY delayed D1/API operation that can still commit blocks this variant. Reservation-only rows may exist and are hashed exactly, never deleted. Correlate complete provider inventory absence for this exact application/container before AND after final native seal/writer readback. Zero count/404, NULL-generation closure or bare SQL absence is never sufficient.
+
+Add createPrivateQaFiniteCleanupProofCollector({control,nativeProof,primaryRead,providerRead,now}).read() and validatePrivateQaFiniteCleanupProof({proof,control,expectedChallenge,now}). Canonical evidenceHash cross-binds native seal, writer-set receipts, primary snapshot and provider observations to exact control/intent/plan/source/native identity and fresh one-use challenge. The finite canary restorer AND QA finalizer call this validator and explicitly branch on kind. Their fixed deployment capabilities retain exact target/body/pin/journal restrictions. Never coerce sealed_without_admission into retired_handoff_observed. Any unresolved launch marker/write, seal ACK, source mismatch or missing evidence yields admin-pending. Test held pre-seal admission across cancellation, seal/launch races, late writer ACK and lost seal response, plus reservation-only and genuine launched/stopped success.
+
+## Root ruling — retained proof across canary restoration
+BEFORE any canary restoration POST, persist and independently read back the exact validated discriminated native proof plus its bounded supporting evidence in immutable per-intent QA control; bind canonical bytes/hashes to intent, plan, source/native producer version and original C1/R1. The producer live version is retained provenance, NOT a requirement that it remain current after restoration. Consume the one-use native challenge ONCE at capture; explicitly permit two fact consumers (canary restorer and QA finalizer), without granting two authorities. Maintain separate durable canary-restore and QA-restore effect claims, each bound to the same retained proof hash and each issued before its own single POST. Finalizer validates retained provenance, fresh independent closed-deployment/provider evidence, and the immutable native retained first-primary receipt with qualified exclusion of every remaining scoped writer; it never calls the former live canary proof method, reseals, reopens or fabricates a new challenge to recover evidence. Add readRetainedFiniteCleanupProof({intentId,proofHash}) on the exact QA control, returning only the fixed bounded evidence DTO. Restart recovery uses primary GET of the SAME exact completed observer output, which already carries the native retained proof, settled completion, acknowledged QA claim and immutable final first-primary receipt with exact actor/source/intent binding. There is no external callable DO or administrative D1 query. If existing transport/custody cannot carry it, or retained provenance/supporting evidence is unavailable, leave admin-pending with no restoration effect. Restore QA only after this evidence is recoverable and fresh checks pass, before original R1. Neither previous capture nor a successful canary restoration bypasses the independent QA claim/authority.
+
+## Independent exact QA finalizer
+Proposed scripts/run-qa-finite-trial-finalizer.mjs runs in a separate GHA WORKFLOW AND RUN with its own admitted original R1 and immutable exact trial pins, dispatched once and acknowledged ready BEFORE arm. Fixed dispatch payload contains only validated intent/source reference; reload immutable material/original command from primary sources. It has no needs dependency on nominal jobs, no shared cancel group and cancel-in-progress:false. Nominal cancellation cannot cancel that run; explicit finalizer cancellation invalidates readiness and blocks unissued nominal work. It is not nominal finally. New lib/mcp-qa-finite-trial-finalizer.mjs exposes createPrivateQaFiniteTrialFinalizer({plan,readSnapshot,claim,deployClosed,now,signal}).run(); capability can POST only the one approved QA closed version, once, against its exact known candidate/deployment. Preserve foreign-pointer conflict and unknown-ACK read-only reconciliation; no generic deployment authority, no claim refund.
+
+Concurrency groups are afw-finite-finalizer-<intentId> and afw-finite-nominal-<intentId>, both cancel-in-progress:false. Finalizer readiness/polling never holds the shared QA writer lock. Nominal upload/activation releases that lock before waiting for readiness/arm. Only final restore takes the existing serialized QA writer group; queue time consumes original R1 and requires fresh prewrite checks. No readiness/writer-lock dependency cycle is allowed. Source-bound ready evidence remains point-in-time, never future availability proof.
+
+Finalizer polls within R1 for canary closed, validated discriminated cleanup proof, guard completion and exact nominal Workflow terminal state. It must not require its own GHA job terminal before its POST. It then restores QA, independently reads all closed profiles/namespaces/terminal relevant Workflows and reports exact evidence. R1 expiry gives admin-pending, never extension or blind restore. A source-bound manifest and durable effect claim survive process restart; restart cannot regain nominal authority.
+
+Existing AFW_QA_CLOSED_TOKEN is QA-limited custody: qualify its actual metadata/expiry for this new fixed use, do not infer canary permission. Canary publisher is separately custodied and must be qualified for the exact allowlisted deployment; do not expose it to nominal code or GHA by convenience. Scoped close uses fixed DO binding, not a broad CF token. No new key/role is assumed.
+
+Guard and executor share QA failure domain; guard is independent of canary and nominal runner, not of QA failure. External GHA finalizer has a separate failure domain but availability/scheduling is not guaranteed. Simultaneous host/finalizer failure or missing physical proof leaves uncertainty; no permanent guard or atomic remote-cancel claim.
+
+## Promotion gates
+Root fresh design review, task/source review and exact CI precede any code promotion. Native synthetic tests must prove actual flags/bindings, alarm persistence/reconstruction, pending uncertainty, nominal death, post-N1 cleanup, one-time effects, withheld/late ACK, foreign pointers, original deadlines and physical-stop readback. Preserve real rollback bytes/config before any future mutation. Separately authorize a new exact finite deployment/trial with primary permissions/custody checks, current consent and real receiver lifecycle. No trial until external finalizer and native alarm are qualified, recoverable rollback exists, and canary/operator/QA source profiles are truthfully correlated. Native unsubscribe, useful review and PC-off remain separate observed acceptance, operationalReadiness=false.
+
+## Root execution ruling — concrete bounded retained-proof observer
+Fresh focused review of the following order found no remaining P1/P2; this is source design, not an installed transport or custody qualification.
+
+Use one exact precreated PrivateQaBootstrap observer instance and the fixed IndependentClosure actor, through the existing authorized QA custody only after actual scope/resource/expiry qualification. Its exact fixed payload is `{operation,intentId,sourceRevision}`; the native read-only material-preview first step derives the plan/control references and original clocks, avoiding a future-controlHash payload cycle. Successful first-step output supplies those plan/control references for admit-and-ready before prepare. No public HTTP, generic Durable Object management GET, caller-selected actor/method/URL or new credential is assumed.
+
+A fixed server-owned head lookup for exact intentId/controlHash resolves only that control's once-appended retained proofHash. Then readRetainedFiniteCleanupProof({intentId,proofHash}) reads the exact bounded immutable proof/support. Missing means not_yet_observed; conflict blocks. Never precompute a future proof hash or select a global/latest proof.
+
+A separate fixed readFiniteTrialCleanupCompletion({intentId,controlHash,proofHash}) reads exact control and effect/readback journals and returns a bounded retained completion receipt only after the canary restore readback and cleanup effects are settled. Issued or uncertain restoration cannot become complete without qualifying read-only reconciliation. Guard completion explicitly excludes observer termination, QA restoration and GHA completion.
+
+The cycle-free order is: retain native proof -> restore canary while the exact qualified observer alone is permitted active in that phase -> retain settled guard completion -> same observer obtains one acknowledged native QA claim and final first-primary receipt -> observer returns bounded evidence and reaches provider complete -> independent fresh closed-chain/provider/Workflow checks plus immutable primary-receipt validation -> separate durable GitHub send claim -> restore QA. Actual nominal confirmation must already be terminal before either restoration. Full definition/instance enumeration remains mandatory; never exclude a whole Workflow definition. The exact observer must be terminal complete with valid output before QA restoration.
+
+Use no more than32 distinct read-only observation steps with deterministic original-deadline sleeps; do not cache not_yet_observed forever under one step ID or exhaust observations before the capture window. Original C1 effect and R1 finalization deadlines never move. Return only field/byte/depth-bounded technical proof, completion and source/native/instance provenance; no secrets, callbacks, raw consent/provider bodies or customer data.
+
+The GHA finalizer recovers the SAME exact observer's primary GET output across restart, after correlating creation claim, payload, definition/class/script and qualified artifact/source. Workflow versionId alone is not executable provenance. Lost create ACK allows only exact GET reconciliation, never a replacement instance or second POST. Finalizer admit-and-ready completes after actual resource/custody/observer-admission checks, before nominal arm, without waiting for future proof output or holding the QA writer lock. Queue time consumes original clocks; readiness is point-in-time.
+
+Compatible closed QA preserves classes, namespace/history and qualified bindings/custody, while denying operative finite entrypoints. Already-completed observer output is recovered from the provider, not by reopening the former live canary or creating another observer after rollback. Missing transport, provenance, completion, terminal output or permission leaves admin-pending with no effect.
+
+Primary documentation checked: https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/create/ (Workers Scripts Write); https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/ (primary output/status); https://developers.cloudflare.com/durable-objects/get-started/ (Worker binding RPC). These documents do not establish the existing token's effective scope or explain the earlier4xx.
+
+## Root rulings implemented by Task2 (2026-11-01, source only)
+
+The native seal has exactly `sealFiniteTrialAdmission({intentId,planHash})`. Its irrevocable seal precedes the sole proof challenge. A GET-only readiness probe waits for settled writers and a plausible physical-stop/no-admission observation; it grants no proof or effect authority. Only after readiness, `observeFiniteTrialCleanup({intentId,planHash,proofChallenge})` independently collects fresh native/first-primary/provider evidence. `evidenceHash = SHA256(JSON.stringify({proofChallenge,sealHash,support}))` binds the challenge to the seal. The QA challenge and native capture are each consumed once. Race, lost ACK, missing proof or failed independent retained-record readback stays uncertain/admin-pending, without another challenge or POST.
+
+Every deployment role (`qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed`) adds exact `module:{name,sha256,bytes}`, with bounded canonical own data and actual approved module bytes at packaging. QA-live hash equals source.moduleHash, canary-live hash equals canaryContainment.moduleHash; their source tuples remain distinct. The finite closure policy is canonical `afw.finite-cleanup-policy.v1`: intentId, trialId, grantHash, containerId, applicationId, programHash, programSourceRevision, notBefore=C0, expiresAt=C1, withdrawalPolicyHash, and canaryClosed {versionId,configurationHash,module}. closePolicyHash is SHA256 of its canonical JSON. It is not the consumed legacy restoration policy. Native permission reduction separately requires the actual canonical existing withdrawal-policy JSON hash to equal withdrawalPolicyHash, exact original consent/context/program/actor, and its cleanup window to equal C0/C1; no caller supplies raw policy.
+
+Dependency correction: resources.applicationId is strict 32-hex, matching existing RELEASE_TARGET and the independently observed fixed Containers API application. qaD1Id/releaseD1Id remain UUIDs; namespaceId remains 32-hex. This fixes the earlier impossible UUID fixture/parser assumption, without treating an ID alias as authority for a different resource.
+
+The candidate gate records reservation/admission/launch issued BEFORE each possible business send. Reservation uses two fixed intent/control RPCs; admission and launch share the same candidate DO gate. Cross-DO/D1 cancellation is not atomic. Seal prevents new markers; held/late/unknown markers stay unresolved until exact immutable primary settlement of that operation establishes that no future NEW effect remains possible. A NULL-generation closure, empty provider page or terminal Workflow is insufficient. Actual hooks preserve original request/cleanup deadlines after awaits. An unknown launch is never settled merely because a launch-claim row exists: launch settlement remains internal after the actual runtime ACK.
+
+Every begin also requires the mandatory INTERNAL readNominalControl adapter: fixed exact source/native/control identity, existing durable nominal issued claim and digest, armed/not-withdrawn control, fresh original consent and the minimum original deadline across all reads. nominalEligible=false after claim consumption means no second nominal claim; legitimate children may use that SAME issued claim. Reconstructed code cannot create a replacement claim. Initial prepare/nominal claim still require global zero writers. The child-only primary envelope contains the complete writer inventory and actual candidate journal. Each at-most-three owned writer matches intent/control/actor/kind/claimHash/phase; counter membership reconstructs all three counts, and inventory/journal hashes bind the evidence. Any additional, different or unknown writer denies. Candidate begin independently matches the returned exact owned set to its own durable journal before committing. No whole-actor/definition exclusion or generic nonnegative-counter bypass is permitted.
+
+Task4 installs the actual-binding source constructors. The finite candidate additionally requires a NEW real version_metadata binding AFW_FINITE_TRIAL_VERSION, absent from the inspected closed canary; this is a material future profile/compatibility gate, not an existing alias. Default closed profiles have no factory/binding and stay unavailable. The actual native Worker supplies its historical scoped close callback from the original program; permissions-only reduction and close have separate issued/receipt journals, so they never send full-withdraw-with-close followed by another close. Read-only permission observation shares the existing exact primary predicates. A close ACK is retained only after the bounded actual close result; missing ACK is not invented from provider absence or a closure row.
+
+Fixed candidate methods use only the documented refs: beginFiniteTrialReservation / settleFiniteTrialReservation / readFiniteTrialAdmissionJournal / withdrawFiniteTrialPermissions / closeFiniteTrial / readFiniteTrialReductionReceipts take {intentId,controlHash}; sealFiniteTrialAdmission and readFiniteTrialCleanupReadiness take {intentId,planHash}; observeFiniteTrialCleanup additionally takes proofChallenge. No arbitrary operation/selector/writer facts or caller callbacks cross RPC. QA exposes readFiniteTrialNominalControl({intentId,controlHash}) only through its installed fixed source constructor, plus the previously specified proof-head, retained-proof and completed-cleanup reads. The completion receipt follows exact canary readback and settled withdraw/close/seal/canary_restore journals; it does not mean observer terminal, QA restored or GitHub job done.
+
+Alarm deliveries remain at most three across reconstruction. On-time slots are C0, C0+60s and C0+120s inside original C1=C0+180s; a late recovery uses max(now+1s, its original slot), capped at C1-1ms. The next alarm or exhausted third-delivery state is durable before effects. Each alarm has at most 30s and C1; individual native/gate/transport reads retain their <=5s leases. Parent continuation assertions propagate into child action adapters. All unknown issued actions reconcile read-only. No stop or restore is resent. Normal delayed STOP can be observed at the second/third delivery; remaining time is not an SLA and is never extended.
+
+Pending-first order is binding: validate native/current admission, persist pending INFO/control and C0, independently read back, then fresh primary/finalizer-ready and armed CAS. Missing first ready leaves pending + durable cleanup. Automatic cleanup begins only at durably pending/armed control. Pre-arm deployment/setup remains operator-attended and never PC-off eligible. External finalizer resource/custody pre-admission must precede activation; absent qualified control/proof means admin-pending, no fabricated guard completion/restore. Source setup failure is a promotion gate, not authority for blind recovery.
+
+Task3 ready/hash-cycle ruling is recorded only here, for Task3 implementation: exact bootstrap observer input is {operation,intentId,sourceRevision}, with deterministic instance independent of future controlHash. Its first read-only native material-preview step returns bounded purpose/intent/source/runtimeVersionId/actorId/planHash/controlHash/resourceHash/T0/N1/C0/C1/R1, without scope/state write/alarm/claim. The finalizer validates that first-step output while observer remains active, establishes custody/admit-and-ready, then prepare re-derives the SAME plan/hash once. The observer's later retained-proof + guard-completion terminal output is distinct. The exact observer may remain active during canary restoration; nominal must be terminal and observer must complete before QA restoration.
+
+Known Workflow create authorization failure (root's separate HTTP401/code10000 diagnostic) remains a promotion gate. Neither this source qualifier nor metadata/token activity establishes Workflow POST authorization, independent autonomous initiation/custody, a real finalizer, live trial or operation with the PC off. No runtime/profile/binding, token/grant/custody, schema or credential was changed by Task2. operationalReadiness=false.
+
+Root interim consistency correction: an exact stored nominal claim may have a deadline narrower than the plan because fresh original consent narrowed it. Candidate gate accepts only issuedAt < claim.deadline <= min(original N1, planned consent end), and retains min(claim.deadline, each current consent expiry) after awaits. Equality to the planned maximum is not required; no caller may supply or extend claim bytes.
+
+
+## Root ruling — native QA claim and external send fence (2026-11-01)
+Focused source review at340aca28 identified a missing concrete claim channel: GHA cannot call an arbitrary DO, and the accepted observer is terminal before QA restoration. The same exact precreated observer therefore adds ONE separately named native claim step after settled guard completion and before its terminal output. This is one explicit journal mutation outside its maximum32 read-only observations, not a claim that the whole observer is read-only.
+
+Fixed claimFiniteTrialQaRestore({intentId,controlHash,proofHash}) internally fixes kind=qa_restore. Trusted eligibility requires fresh exact retained proof/completion, actual QA/native pins and the admitted finalizer. It does not require observer terminal, QA restored or GHA complete. The step has retries disabled. Only an acknowledged newly issued immutable native claim and its canonical hash may enter terminal output. An existing/reconcile_only or uncertain issuance is not silently upgraded to an acknowledged handoff. The claim is a journal fact, not a bearer or proof of restoration.
+
+After exact provider observer completion, the exact finalizer acquires the serialized QA writer lock, performs fresh independent checks, then obtains one separate durable append-only GitHub send claim before its sole QA POST. The uniqueness domain is the fixed intent/control/qa_restore effect, never run/job identity. Claim content binds native claim hash, proof, exact run/attempt/job/source and candidate/target. A changed run/job cannot create another eligible send. Only the execution acknowledging a NEW send claim may POST; existing/uncertain claim permits GET-only reconciliation, no retry/refund. Use the already authorized GitHub Actions persistence capability; process flags/concurrency alone are insufficient and no new custody is inferred.
+
+Both native claim and final POST remain before originalR1; queue time counts. Historical claim timestamps establish provenance; fresh prewrite observations establish current eligibility. Clock/custody ends never extend. Order: guard completion -> native QA claim -> observer provider complete -> external lock/fresh checks/send claim -> QA POST/readback.
+
+The GHA finalizer consumes a dedicated bounded technical plan projection, not the full private Task1 plan/raw selectors or consent. Shared native canonical reference computation supplies plan/control hashes; exact primary output/module/resource provenance must qualify that projection. Immutable plan.finalizer.jobId pins the admit/poll job that supplies ready evidence. A later fixed restore job in the SAME finalizer workflow/run/attempt/source may acquire the writer lock only after that job finishes; resolve its actual ID from primary GitHub metadata and bind it in the send claim. It is not a nominal needs dependency. Readiness during arm still requires the exact admit job in progress plus completed admit-and-ready step; restore phase must not demand that completed job remain in progress. Phase-specific checks preserve the original material/hash.
+
+Ruling: this is the smallest fixed transport completion — avoid a new public route/observer/credential and eliminate the terminal-observer claim cycle. Cost if wrong: source rework and possible admin-pending; it never licenses a second effect, new custody or runtime promotion.
+
+## Root ruling — retained first-primary receipt replaces unavailable external D1 query (Task3, 2026-11-01)
+Focused architecture review accepted this explicit replacement. No external bounded administrative D1 endpoint is accredited. The SAME observer, after settled guard completion and acknowledged native qa_restore claim, obtains one fresh first-primary snapshot through the concrete fixed QA producer's ACTUAL bound DB path under its short original lease and R1. It compares exact row hashes/process generation/settled writer journals to the retained proof (only observation timestamps may differ), and correlates control/proof/completion/native claim/seal/source/native identity before and after the read. Its bounded immutable receipt hashes those references and the observation; it never refreshes its timestamp on external replay.
+
+Irreversible seal, settled writers, and qualified closed source must exclude ALL remaining scoped writes, including already-issued remote writes and old continuations. A known active/pending/unresolved administrative or independent writer blocks; broad credential capability alone does not establish an active writer. Empty Workflows and a closed current deployment ALONE are insufficient: an outstanding D1 write could still commit after the receipt.
+
+After observer completion and acquiring the QA writer lock, GHA performs fresh GET-only checks of exact closed chain/modules/configuration/namespaces/exposure/full Workflow and provider inventories, then validates the retained first-primary receipt and its qualified writer-exclusion lineage. Changed pointers/source/lineage or incomplete inventory stays admin-pending. This is NOT a new external D1 query or an unseen-foreign-writer guarantee. Task4 owns actual source/producer qualification; absence remains unavailable. Original R1, native claim and separate durable send fence remain unchanged. Add a negative fixture holding an actual outstanding D1 writer after the observation: no send claim or POST.
+
+The GitHub send fence uses an immutable annotated tag object and atomic unique ref under the fixed intent/control/qa_restore domain, never run/job/source as an additional namespace. Content binds native claim/proof/exact run/attempt/job/source/candidate/target. Only the execution ACKing a NEW ref201 before R1 may POST. Existing/unknown ACK/restart is GET-only; no deletion, force, reassignment, refund or resend. Tag-object creation alone grants nothing.
+
+Cost if exclusion cannot be qualified: admin-pending and source rework, never blind restore, a new transport or credentials. operationalReadiness=false.
+
+## Task3 source contract — actual Workflow provenance and bounded observations
+The first-step output is an outer technical envelope `{purpose,provenance,material}`. `material` retains the exact mandated preview fields unchanged. `provenance` carries purpose, original `event.instanceId`, compiled sourceRevision, and the observer's OWN actual env version_metadata ID. The material producer's current DO pin alone cannot prove the executable version of an older Workflow. Missing compiled source installation or metadata fails closed; Task4 must install the actual compiled revision and bound producer.
+
+The fixed adapter follows the documented [Workflow instance GET schema](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/): `versionId`, `params`, `queued`, `status`, `step_count`, `steps`, and string JSON `output`; step identity uses name/type/start/end/success/attempts/output. It does not fabricate result.id, result.workflow_id, or step.status. The separate [Workflow version GET](https://developers.cloudflare.com/api/resources/workflows/subresources/versions/methods/get/) establishes definition/class/language, not an undocumented Worker-version link. Executable correlation comes from the observer's native envelope plus independently qualified pinned Worker module/configuration source.
+
+Total read-only `step.do` calls are bounded to 32 INCLUDING the first preview: at most 30 distinct cleanup samples spanning original C0 through R1-5000, plus the final first-primary read. The native QA claim is one separate no-retry journal mutation. Native RPC AND Workflow step results may carry disposable transport handles; clone the serializable metadata and release that handle before exact field validation. This is transport normalization, not an unknown-field grammar wildcard.
+
+External readiness persists only while the original authenticated command retains its minimum nominal margin, including every awaited custody/provenance/tag/ref boundary. No later run, job queue, step, or read refreshes T0/R1. All source qualification fixtures are synthetic; default source/material/compiled-observer factories remain unavailable. operationalReadiness=false.
+
+Root confirmed the conservative total of 32 read-only step.do calls on 2026-11-01. Sleeps do not count as provider observations. Cost: slightly coarser sampling and possible admin-pending if evidence is late; no extra authority or clock extension. Clone/release applies only to owned returned RPC/step results, never env or shared bindings.
+
+The external admit/poll job uses 48 deterministic observation slots spanning ORIGINAL T0 through R1-5000, with each await checked against original admission expiry. It does not run only 48x5s from readiness (which could exhaust near C0), and it never grants a new duration after setup/queue/restart.
+
+## Root ruling — original execution and GET-only send-fence recovery (Task3 round1, 2026-11-01)
+Only the fixed trusted GHA restore launcher, invoked ONCE in authenticated attempt1, may initialize one module-private original-execution capability. It binds exact authenticated admission, intent/control/proof/source, primary run/attempt/job/step and the actual original Node process. The launcher sets a task-specific PID marker once and execs Node once; PID equality is coherence ONLY, not durable process identity or source provenance. Qualified checked-out source and exact primary workflow/job are the trust boundary. No retry, supervisor or recovery launcher regenerates the marker in this supported source.
+
+GitHub [run_attempt](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#github-context) increments on a true workflow rerun, which remains denied. Same-attempt reexecution of the WHOLE launcher is explicitly outside this supported scope: neither metadata nor PID can distinguish it. If the host cannot establish the once-launch assumption, no capability is admitted and the result is admin-pending.
+
+One capability is shared across ALL clients in that original process. Consume it privately at FIRST claimSend entry BEFORE ANY send-fence mutation, including annotated-tag POST. An earlier GET failure may conservatively poison it. GET first: an existing fence permits only reconciliation and never refunds the capability. Unknown/lost tag/ref ACK consumes it permanently. Reconstruction with the same capability cannot refund it; default/no-cap/recovery, INCLUDING GET404, performs only GETs and remains admin-pending when the fence is absent. No caller boolean, recovery permission flag, DTO or 404 mints authority. Only the original execution acknowledging NEW ref201, still within its original bounds, may issue the single QA POST.
+
+Revalidate original R1/cancellation/source/identity at awaited boundaries and before mutation. A child/new process inheriting the old PID marker fails coherence. The fixed workflow must actually contain one exec invocation and no wrapper retry. Atomic ref uniqueness remains the final durable send fence; process flags/concurrency are not durable proof.
+
+Availability cost: losing the original process before issuance can leave admin-pending even if no ref exists. Generic mutating process resumption is NOT supported. Retained proof/provider-closed recovery remains GET-only. Durable resumption under a broader launcher model would require a separate protocol, never inferred renewed authority. Source-private fixture authority is explicitly synthetic. No runtime, credential, scope or nominal factory change is authorized by this ruling.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-01-finite-native-launch-adoption-design.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-01-finite-native-launch-adoption-design.md b/docs/superpowers/specs/2026-11-01-finite-native-launch-adoption-design.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-01-finite-native-launch-adoption-design.md
@@ -0,0 +1,129 @@
+# Finite native launch and observer adoption
+2026-11-01 · AFW · DESIGN ONLY · operationalReadiness=false
+
+Isolated design baseline9304b0b066f32340e21be0331fc1f6628029631a; branch design/finite-native-launch-20261101. This is a future4C/Task5 contract, not installed capability or authorization to run it. Active Task4B branch is untouched. Read together with [material bootstrap correction](2026-11-01-finite-material-bootstrap-correction.md). No product code, CI, provider calls, new secret/scope, permanent scheduler or real occurrence is created by this document.
+
+## Decision and fixed clocks
+
+Use ONE additional instance/operation of existing PrivateQaBootstrap, separate from the exact cleanup observer. The launcher calls the fixed IndependentClosure actor, sleeps durably, then asks that actor to create the exact PrivateQaNamedConfirmation through a qualified native Workflow binding. GHA adopts observer/proofs through GET only; it never creates a Workflow by REST. Account-role expansion is not part of this path.
+
+All times derive from authenticated original T0; no caller dates:
+- armAckBy=T0+90000, launchAt=T0+150000, lastCreateAt=T0+160000.
+- N1=T0+300000, C0=T0+240000, C1=T0+420000, R1=T0+480000 unchanged.
+- Successful native prepare response, its durable readback and launcher first-step acknowledgement must be observed by armAckBy. This is stricter than existing180000ms minimum nominal margin.
+- No child-create send before launchAt; the send and its awaited checks must occur before lastCreateAt. Actual nominal event.timestamp must be in [launchAt,lastCreateAt]. No extension after queueing/sleep/reconstruction.
+
+There are at least60seconds between timely ARM acknowledgement and earliest nominal creation. This is cloud-clock arithmetic, not a guarantee of human notification or physical shutdown. Root must also observe the timely receipt before asking the owner to shut down. A late human handoff does not shift launchAt or certify PC-off; existing cleanup remains responsible.
+
+Accepted nominal authority ends no later than lastCreateAt+70000=T0+230000<C0, further narrowed by actual consent/token/candidate/N1. This does NOT guarantee the provider instance or remote writes terminate by230000. A create issued before160000 may be accepted later; a late original event must fail at nominal entry before nominal effects. Pending acceptance and delayed settlements remain outstanding writers, even after a local timeout.
+
+Cloudflare documents native create({id,params}), actual creation time in event.timestamp, and durable sleepUntil. There is no one-shot delayed-start option in the documented creation options. [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/), [durable sleeping](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/).
+
+## Identity, mounting and ordering
+
+Launcher payload EXACT {operation:'finite_nominal_launcher',intentId,sourceRevision}. Instance ID is 'afw-finite-launch-'+SHA256(UTF8('afw.finite-launcher.v1\n') || canonical({intentId,sourceRevision})); distinct from observer and nominal. No caller actor, claim, plan, deadline, binding or resource selector. Existing fixed actor remains afw-own-successor-closure-v1.
+
+Future canonical plan explicitly adds launcher identity and fixed timing to its Workflow/launch policy. Hashes change for the NEW unspent finite intent; no historical record is rewritten. Native nominal ID remains afw-release-<bundleHash>, payload SOLE {planHash:bundleHash}. Finite planHash/controlHash and nominal bundleHash are distinct commitments and must not be conflated.
+
+Actual closed QA currently has only Bootstrap binding and QA_VERSION. Repository NamedConfirmation configuration is not an installed binding.4C/5 must publish/qualify the precise Named binding, definition/class/script, module/profile/exports and closed-compatible rollback while preserving namespace history; no new namespace or public ingress is needed. Source qualification covers ALL binding holders and all create/prepare paths; no generic handler or legacy callback may reach these effects.
+
+Ordering (root post-seed handoff amendment, 2026-11-01):
+1. Source/fullCI/promotion/current custody/consent/receiver and private-setup owner-locator/runbook gates are qualified before a future command; concrete T0-dependent policy values cannot be prepared before T0.
+2. Original GHA seed-material NEW-ACK/readback and primary completed-success step.
+3. Separate attended post-T0 server-private policy setup completes, with qualified immutable installed receipt, exact current canary lineage, settled effects and actual completed-success setup instance.
+4. Root/operator creates the exact observer once, AFTER that setup completion. GHA's automatically following admit step passively GET-adopts it within the original bounded window below.
+5. Successful first preview -> completed admit-and-ready on the exact admit job -> operator creates the one exact launcher -> timely prepare/guard/claim ACK by90s.
+6. Durable sleepUntil150s -> one business nominal child-create -> launcher terminal; original C0 guard and settled terminal proofs -> canary restore -> observer completion -> GHA QA restore.
+
+### Bounded passive GHA adoption after seed success
+The old immediate-admit behavior races the attended operator. ROOT now selects read-only waiting AFTER the actual successful seed step, never waiting for a missing seed. adoptBy=min(T0+70000,N1-180000)=T0+70000. Up to36 deterministic slots T0+2000*k for k=0..35; skip elapsed slots without catch-up bursts. Each GET/preview observation is at most5000ms and clipped to the SAME original adoption parent deadline; admission starting late receives only the remaining original time, never a new70s. At slot70s, no new network operation may start if the remaining budget is zero.
+
+Only exact source-defined not-yet observer404 can be awaited without adoption; after exact instance/provenance qualification, an explicitly parsed genuine pending first-preview result can remain not-yet within the same bound. Missing seed, malformed/schema/identity/source conflict, unknown status, auth failure or transport uncertainty must not be reclassified as that benign404/pending result. No catch-all retry, custody diagnosis/repair or regrant. A successful qualified preview ends polling; actual readiness completion must still be proved before launcher preparation and the unchanged90s ARM ACK limit.
+
+GHA holds no QA writer lock while waiting and sends no CF create/other mutation. No new observer/run/clock/custody; no retries of consumed effects. This application wait is separate from the observer's maximum32 observations and one native QA-restore claim, both unchanged.
+
+### Separate private setup dependency
+Consume the separately reviewed4C2 [private-policy-setup contract](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b23d11c31eb1f405f2f8530a6b3281d08ac39ba2/docs/superpowers/specs/2026-11-01-finite-private-policy-setup.md); its owner-authorization locator amendment/final review is still pending. Current proposed exact operation is finite_private_policy_setup and instance afw-finite-policy- plus the contract's domain-separated intent/source hash. Its bounded installed receipt purpose is afw.finite-policy-installed.v1, correlated to context/source/seed/actual version/deployment/publicStatic/module and original timestamps. Native5 must consume the immutable completion through C2's fixed source reader, not accept a caller boolean, guessed identity, old closed-publisher probe or arbitrary receipt DTO.
+
+This is ONE EXTRA PREARM instance on the existing Bootstrap definition, explicit and separate from observer/launcher. It uses actual T0-derived server-private C0/C1 policy values, the same qualified canary module/publicStatic, and its own bounded upload/activation claims. It does not consume the finite first HEAD. Native5 owns neither publisher implementation nor owner preparation flow.
+
+Proposed C2 setupBy=T0+50000, total original operation budget<=30000ms, children<=5000ms clipped by that SAME parent/setupBy; this leaves20s to the adoption deadline. These are future qualified gates, not installed timing guarantees. Setup instance MUST be terminal completed-success and its receipt/writers/pointer/source independently qualified BEFORE observer first preview and finite prepare; no Bootstrap-wide exception or extra active-instance allowance. Missing/unqualified setup context remains unavailable. Exact operation/ID/receipt grammar follows the final approved setup contract; the earlier draft's14-slot/5s adoption paragraph is superseded by THIS root-selected36-slot/2s ruling. No timer, publisher or owner authorization is implemented here.
+
+Operator creation lostACK is exact GET reconciliation only, no replacement/restart. The launcher may not be a GHA dependency of the independent finalizer. Scheduled cancellation/termination is not inferred from changing deployment.
+
+## Native fixed operations and same-object acknowledgement
+
+Future files: lib/mcp-qa-finite-launch.mjs (source constructor/journal/operations), lib/mcp-qa-finite-launcher.mjs (Workflow orchestration); mounts in worker/independent-closure/index.mjs. These proposed modules do not exist as operational capabilities now.
+
+Fixed private methods:
+- prepareFiniteNominalLaunch({intentId,sourceRevision})
+- createFiniteNominalChild({intentId,controlHash})
+- readFiniteNominalLaunch({intentId,controlHash}) (bounded fact-only reconciliation)
+
+They use actual ctx/env, fixed slot, compiled source, private seed/material factories and existing qualified primary readers. Binding possession/source confinement is the transport boundary; arguments do not authenticate an arbitrary caller. Independently qualify the exact real launcher instance/input/source and phase; an instance ID supplied in a DTO is not provenance.
+
+One prepare invocation constructs ONE Task1 control object. In order: actual source/seed/completed-private-setup/readiness/consent/quiescence checks; control.prepare() acknowledged armed; guard.arm() using that SAME control and actual C0 alarm/state readback; control.claimEffect('nominal') acknowledged NEW issued on the SAME control; persist/readback the launch-prepared receipt. Reject if any await crosses armAckBy or original lease. No nominal claim on reconstructed control. Pending/uncertain/previous records never become a new prepare/claim authority.
+
+The launch-prepared receipt is immutable metadata: purpose, intentId, finitePlanHash,controlHash, sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,guardStateHash,preparedAt,armAckBy,launchAt,lastCreateAt. It records acknowledged claim/guard facts; it cannot renew or recreate them. Store it only after those acknowledgements. Unknown receipt ACK prevents a successful prepare result and launch; exact readback remains factual. Source/controller provenance must prove the original successful prepare step, not merely an existing receipt.
+
+Launcher uses distinct fixed step names: finite-launch-prepare and finite-launch-create, retries.limit=0. Sleep is a separate sleepUntil with absolute launchAt. Only an acknowledged prepare result may reach sleep/create; stage replay of a completed result never repeats prepare. Source-qualified provider step success/native receipt together qualify the handoff. Failure returns sanitized admin_pending and terminalizes the launcher when possible; no loop, resend, new start time or restart.
+
+## Child-create SEND journal and single send
+
+Introduce a distinct append-only journal, not Task1's nominal permission claim. Fixed keys under afw.qa-finite-child-create.v1:<intentId>: send,ack. No deletion/refund/overwrite. No writer identity chosen by caller.
+
+SEND exact fields: purpose='afw.qa-finite-child-create-send.v1',intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,preparedHash,bindingHash,issuedAt,deadline. deadline=lastCreateAt; issuedAt in [launchAt,lastCreateAt). Hash canonical bytes with domain afw.qa-finite-child-create-send.v1 plus newline. bindingHash commits the qualified actual Named binding definition/class/script/profile, not JS object stringification.
+
+createFiniteNominalChild resolves the existing prepared receipt and nominal claim itself. It checks current consent, unchanged source/native binding/pointers, unwithdrawn control, unsealed admission/launch gates, exact launcher prepare-step success, fresh finalizer readiness and time. Checks repeat across EVERY await, including queued actor work. Task1's existing claim authorizes its legitimate child; no new nominal claim is minted.
+
+A transaction atomically verifies the fixed head/control/receipt, no send record, original deadlines and no withdrawal/seal, then writes SEND. Read back exact SEND before effect. Only the execution acknowledging a NEW SEND may invoke the actual bound AFW_QA_NAMED_CONFIRMATION.create({id:nominalId,params:{planHash:bundleHash}}), once. A process-local consumed token enforces one call from that acknowledged transaction; durable SEND prevents reconstructed callers receiving it. No unawaited continuation may bypass the active/expired invocation fence.
+
+Existing/uncertain SEND or late storage ACK grants GET-only reconciliation. Even send-present plus provider404 is NOT permission to retry: provider acceptance may still arrive. Workflow default retries, RPC reconstruction and lost responses never create another instance. A duplicate-ID error is not proof that the existing instance belongs to this source; resolve exact provenance.
+
+Optional append-only ACK exact fields: purpose='afw.qa-finite-child-create-ack.v1',intentId,controlHash,sendHash,nominalId,acknowledgedAt. Record only an actual matching create response before the operation deadline; it proves API acknowledgement, not execution or settlement. Lost/late ACK leaves SEND issued. Read-only primary reconciliation can observe exact provider status/output; it does not rewrite SEND or manufacture acknowledgement. Keep unresolved SEND in the writer inventory until the actual unique instance/source and its terminal/writer outcome are qualified. This is a separate native-create writer lineage, not one of the existing reservation/admission/launch process-writer kinds; the phase producer must carry it explicitly without inventing a settled process receipt or relaxing existing writer-count checks.
+
+The nominal finite entry validates original instanceId/payload/event.timestamp and actual source/control/SEND correlation, then calls runKnownCancellationReleaseWorkflow({bundle,env,event,step}) unchanged. No replacement event, fifth argument or extra stage inside the accepted18 stages; original70s/5s/20s and cancellation propagation remain. Emit bounded original-event provenance in the finite outer technical result using the actual event, alongside unchanged nominal result; failed/absent output is not synthesized. This outer result grammar is an explicit new mount contract. Qualified module provenance plus provider original steps/output supports timestamp evidence; Workflow.versionId alone does not.
+
+## Concrete source-produced never-issued inventory observation
+
+This is the4C/Task5 producer deliberately excluded from4B. Public/raw flags such as neverIssued=true or arbitrary branded DTOs cannot select an absent-nominal exception.
+
+The fixed native constructor first requires C2's qualified immutable private-setup completion/context and terminal source lineage; it owns ctx.storage, actual compiled module/profile/binding pins, exact canonical plan, Task1 state decoder, prepared-receipt/SEND readers, and fixed provider inventory transport. It constructs a private invocation-bound inventory capability only after those actual dependencies qualify. No exported mint function accepts a success DTO; tests exercise this constructor with explicitly synthetic actual storage/provider boundaries, not a production bypass.
+
+All new SEND writes and this observation share one bounded per-actor source coordinator. The outer prepare operation must not hold that coordinator while awaiting its own inventory reader; only the bounded inventory observation and SEND transition acquire it, avoiding a same-actor reentrant lock cycle. A read-only observation holds that coordinator through:
+1. transactional read of exact head/INFO/control/nominal claim/prepared receipt/SEND/ACK and relevant seal state;
+2. complete fixed definition/instance inventory and exact launcher/observer provenance;
+3. second transactional read requiring identical relevant journal/control commitments;
+4. synchronous consumption of the qualified result by the phase-inventory validator before release.
+
+Queue time counts; no send-capable path bypasses this coordinator. Durable transactional SEND still fences reconstruction/old continuations. Failure/timeout releases no authority. Source qualification must prove coordinator coverage and that any already-issued remote create has a durable SEND; if not, absence cannot qualify.
+
+Internal discriminated observation:
+- kind='never_issued': identity {intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId}; phase arm or prelaunch; journalSnapshotHash,controlSnapshotHash,inventoryHash,observedAt. The source reader directly found BOTH send and ack keys absent in both snapshots and no provider nominal. The validator obtains this observation only through the private invocation capability above, never from RPC arguments or caller-selected kind.
+- kind='issued': same identity, exact sendHash, optional ackHash and qualified provider observation/unknown state. It can NEVER qualify absent nominal as never-issued.
+- missing/conflicting/unqualified producer: unavailable, no exception.
+
+At arm, Task1 may be in its same-invocation pending/armed transitions; source decoder correlates exact control and current preparation, with no foreign writer. At prelaunch the acknowledged prepared receipt/nominal claim/guard must match. Their differences do not alter the SEND condition. The nominal permission claim can already be issued while SEND remains absent. This observation is point-in-time admission evidence, not a durable promise that a later permitted send cannot happen, and never restoration authority.
+
+## Phase inventory and cleanup choice
+
+Enumerate all fixed definitions and every bounded instance page, preserving closed operator. No whole Bootstrap/Named definition exclusion.
+- Preview/arm: private-setup completion/receipt is a prerequisite and its exact instance must already be terminal; only exact observer and, when actually created, exact launcher in its qualified preparation phase may be active; nominal absence needs the source-produced never-issued observation.
+- Prelaunch: exact acknowledged launcher may wait; exact observer remains active; nominal absent requires the same protected observation.
+- After SEND: provider queued/running/waiting is an unresolved nominal state, not a new send permission. Unknown or absent instance with SEND remains unresolved.
+- Canary restore: actual nominal terminal, actual launcher terminal and all scoped writers settled; only exact observer may remain active.
+- QA restore: nominal/launcher terminal, observer complete, guard/proof and original GHA send fence unchanged.
+
+Choose CONSERVATIVE ADMIN-PENDING for never-created nominal cleanup. Do not add a sealed-never-created restoration variant in this block. Guard may withdraw/close/seal under existing cleanup authority, but absent nominal cannot satisfy the accepted terminal prerequisite for either restore. Availability cost: an early launcher failure can require later separately scoped operator recovery even with no nominal effects. No ghost terminal receipt, reset, new claim or silent absence exception.
+
+Existing sealed_without_admission concerns PROCESS admission; it is not proof of Workflow noncreation. All held remote D1/Container/create writers must settle. Task2's single DO alarm remains C0; do not replace/multiplex it with a start alarm. No early restore by assuming the70s deadline physically cancelled provider work.
+
+## Evidence, qualification and acceptance boundary
+
+Cloud evidence: original comment/run/seed IDs; published module/binding hashes; actual launcher preparation timestamps; SEND/ACK hashes; original nominal event/steps; actual terminal statuses; independent physical-process/writer/proof/restore receipts. Instance GET has queued/start/end/status/steps/output, but do not relabel queued as a guaranteed substitute for event.timestamp. [Instance GET schema](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/).
+
+PC-off evidence is separate: OWNER declaration of physical shutdown/time correlated with these cloud receipts. No automatic OS-power attestation, new heartbeat or permanent guard is claimed. Provider receipts alone prove cloud activity, not that the PC was off. Root coordinates shutdown only after all source/fullCI/promotion/current custody/consent/receiver gates and timely ARM evidence. Source design consumes no occurrence.
+
+Custody remains the approved dated-static policy receipt plus fresh correct-kind self-verification/fixed GETs and explicit unchanged-policy operator assumption. No fresh scope equivalence or scopeVerified=true. Native reader and GHA/publisher identities remain distinct. Provider denial consumes the issued effect; no permission upgrade or retry.
+
+Required focused handoff tests: seed step success versus missing seed; setup still active/uncertain/old probe; observer absent until50s then valid preview; slots skipping elapsed time; clipped GET near70s; zero-budget terminal slot; malformed/auth/unknown versus exact404; no CF create/QA writer lock; setup terminal in full inventory; observer32-read/claim budget unchanged. Required focused native tests: exact source-bound preparation same-object claim; lost prepare/receipt ACK;90s boundary and delayed readback; sleep replay;149999/150000/160000 send boundaries; create accepted late with original timestamp outside window; original70s lease queued/late effects; reconstruction after SEND with404; blocked source constructor/caller DTO; concurrent SEND versus inventory snapshots; old outstanding create lacking settlement; both restores with active launcher; never-created admin-pending; held canary/D1 writers; unchanged C0 alarm and18-stage wrapper. Native tests are synthetic until separately authorized provider acceptance. Source builder must inspect concrete factories and actor path coverage before this design is implementable, not rubber-stamp booleans.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-01-finite-private-policy-setup.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-01-finite-private-policy-setup.md b/docs/superpowers/specs/2026-11-01-finite-private-policy-setup.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-01-finite-private-policy-setup.md
@@ -0,0 +1,262 @@
+# Finite private policy setup before ARM
+
+DESIGN ONLY; fresh builder review pending. Source baseline 80f53e771e8f265c6ce2a975461298bc4ff06e0b. Read with [finite package design](2026-11-01-finite-profile-package-design.md). Root rulings extend a8fb101255b9b0919f5ab6259d778273555ede37; no code/runtime/private probe, OAuth, custody change or execution approval. operationalReadiness=false.
+
+## Pre-T0 connection preparation: concrete independent entry
+
+The initial canary/QA PREPARATION baseline must first be published and independently source/module/binding/rollback-qualified under a separate attended runbook. It needs NO OAuth grant. Proposed worker/mcp-own/connection-preparation.mjs exposes only existing bounded read-consent/notices surfaces and protected /connections/finite-prepare GET/POST; lib/mcp-qa-finite-owner-preparation.mjs implements the new flow. Existing helpers validate; none already provisions it.
+
+Use the existing canary origin/Access realm. Canary verifies the real Cf-Access-Jwt-Assertion and forwards ONLY the bounded original same-origin request through AFW_FINITE_TRIAL_CONTROL to the existing fixed QA namespace/actor; this source-qualified binding mount is proposed, not a live fact. QA independently verifies signature/fixed audience/expiry with verifyCloudflareAccessJwtWithExpiry, then primary owner/project and original one-use purpose/source-bound cookie ticket. No identity DTO is authority, arbitrary forwarding/URL/public QA ingress/new service credential. Qualify actual code and ALL binding holders. JWT/cookie values remain transient: never storage/log/artifact.
+
+GET lists only actual Access-subject-owned synthetic projects through protected first-primary DB lookup, independent of OAuth. Server-issued opaque projectRef selects EXACT project; reuse the fixed existing client only after actual private identity qualification. POST explicitly approves bounded operator configuration preparation for sourceM/project. Read consent remains READ. UI explains synthetic goal/test, configuration changes, expiry and separate read/notices choices; never hide preparation under “Permitir lectura”.
+
+Private preconnection record EXACT {purpose,preconnectionId,sourceRevision,actorId,owner,project,clientId,resource,startedAt,expiresAt,approvalHash,baselineHash,recordHash}, purpose afw.finite-connection-preparation.v1. Random32-byte opaque ID; original expiry=min(startedAt+900000,authenticatedApprovalExpiry); no renewal. owner/project use the schemas below. Configuration approval EXACT {purpose,subjectHash,sourceRevision,projectHash,clientId,approvedAt,expiresAt,csrfReceiptHash}, purpose afw.finite-connection-approval.v1. Ticket is bound to subject/sourceM/projectRef/purpose, original origin and one use in QA storage. No copied human raw IDs or new grant inferred.
+
+Three source-fixed stages, each explicitly owner initiated:
+1. connection: publish actual project/client/window pins and genuine OAuth read-consent UI; then owner genuinely approves reading. Add a fixed source integration after createDelegatedOAuthWorker's successful createGrant/completeAuthorization: append private grant-link {preconnectionId,authorizationHash,grantId,grantHash,acceptedAt} to QA, correlated to the original ticket and fresh exact primary grant. No client-reported grant or latest lookup; failure before link remains pending.
+2. notices: with that exact grant, publish its fixed monitoring policy/window; owner genuinely approves notices. Add the corresponding fixed integration after recordDossierMonitoringConsent's acknowledged write: append notice-link {preconnectionId,grantHash,eventHash,sequence,acceptedAt}; independently reread exact consent history. Both links require qualified caller source/transport and primary evidence, not identity DTOs or UI success.
+3. finite: after BOTH current consents and explicit private-preparation approval, activate the exact qualified finite pre-arm module/profile; then actual ACK/readback permits immutable owner preparation/sourceM selection. No receipt/selection references future acknowledgement.
+
+PREPARATION profile grammar is source-owned {purpose:'afw.finite-connection-profile.v1',phase,sourceRevision}, phase closed_ui|read_consent|notice_consent. Exact compiled phase templates validate every binding. closed_ui has OAuth/notices false; read_consent enables AFW_DELEGATED_OAUTH_ENABLED only; notice_consent additionally enables AFW_DOSSIER_MONITORING_OWNER_ENABLED with exact grant policy. All event/successor/save/scheduler/refresh business flags remain false. Public paths stay protected, cron/tails/previews/exposure unchanged. These profiles are NEVER eligible finite business profiles. Third transition restores the approved finite profile, including OAuth/monitoring-owner flags closed. Actual finite code denies business/Container effects without armed control. Post-T0 changes only private-slot values, never code/static profile.
+
+Each stage has identity SHA256('afw.finite-connection-stage.v1\n'+canonical({preconnectionId,sourceRevision,stage})), separate upload/activation SEND/ACK records and maximum ONE upload+ONE activation: six effects total, not the post-T0 two. Append-only journal under connection-preparation:<id>:<stage>; predecessors must be acknowledged/qualified. Stage contextHash commits only the immutable preconnection record, already acknowledged predecessor receipts/consent links and that stage's explicit approval; never future ACKs. Each authenticated request's original parent<=30000ms, queue/children included; each child<=5000ms clipped by parent/window. HTTP returns within that bound; expired/unknown stage is admin_pending, only bounded GET reconciliation, no automatic retry/rollback or indefinitely pending request.
+
+Every stage validates actual baseline bytes/resources/exposure, inherited secrets and recoverable closed rollback before mutation. connection/notices preserve the preparation module; finite uses source-approved immutable canaryLive bytes from the qualified M package, held by the private source constructor (never caller code/URL). Its actual build/byte availability must qualify before UI publication. No new package role, credential, namespace or DDL. The staged bytes and all raw bindings remain native, never GHA output.
+
+Read/notices/Access expiries NEVER extend. Define commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Final preparation/selection must complete before commandBy; future original T0 must be <commandBy. This explicit30s handoff reserve guarantees only arithmetic margin through originalR1, not latency. Late means no new command/finite HEAD; another preparation needs explicit owner decision, never automatic renewal.
+
+## Immutable owner selection and authorization
+
+Private owner preparation EXACT {purpose,prepId,sourceRevision,actorId,selectedAt,expiresAt,commandBy,owner,connection,project,goal,programContext,approval,auditHash,preparationHash}; purpose afw.finite-owner-preparation.v1; <=16384bytes.
+owner EXACT {subject,accessRealmHash,accessVerifiedAt,accessExpiresAt}.
+connection EXACT {connectionRef,grantId,clientId,resource,grantHash,consentHash,noticesHash,permissionExpiresAt}.
+project EXACT {projectId,revision,synthetic}; synthetic=true requires actual own-project evidence.
+programContext EXACT {programHash,sourceRevision,originalContextHash}.
+approval EXACT {purpose,decision,sourceRevision,projectHash,goal,approvedAt,expiresAt,csrfReceiptHash}; purpose afw.own-synthetic-policy-preparation.v1, decision approve.
+Handles random32-byte lowercase-hex; hashes64hex/source40hex; other IDs nonempty<=200characters, safe integer times/revision, goal discovery|content. Match source/project/goal and authentic permission expiry. Hash records with purpose/newline/canonical fields excluding their own hash. Audit/raw values stay private; no JWT/cookie/key values or secret-value hashes.
+
+connectionRef map EXACT {connectionRef,subject,grantId,clientId,projectId,resource,issuedAt,expiresAt} is created only after genuine read consent. It differs from preconnection projectRef; neither mints consent.
+
+Immutable selection EXACT {purpose,sourceRevision,prepId,preparationHash,selectedAt,sequence,previousSelectionHash,selectionHash}, purpose afw.finite-owner-selection.v1. Explicit authenticated selection appends history and CAS-updates source-selection:<M>:head; previous hash null only first. Both selectedAt<=T0<commandBy<=expiresAt. Pointer change after T0, including away-and-back, rejects without fallback; no latest scan/automatic advancement.
+
+Before post-T0 CF effects, CAS-create preparation:<prepId>:bound EXACT {purpose,prepId,preparationHash,selectionHash,intentId,sourceRevision,T0,boundAt}, purpose afw.finite-owner-binding.v1. Durable ACK/readback required; different intent blocked, same-intent replay read-only, uncertain ACK admin_pending. No finite HEAD/reset.
+
+nativeOwnerAuthorization requires original owner comment/source/run and completed-success seed-material through readFiniteMaterialSeed; actual native actor/source/bindings/original setup Workflow provenance; exact selected/bound preparation; fresh primary owner/grant/notices/program/scope and baseline revision at setup AND prepare; and operation-specific authenticated synthetic preparation approval. Possession of publisher key/read grant or caller boolean is insufficient. Fixed source command/runbook must separately authorize actual operation.
+
+Reuse lib/delegated-oauth-worker.mjs connectionAllowed/getGrant/getOwnedProject, lib/cloudflare-access-identity.mjs verification, and lib/dossier-monitoring-owner-http.mjs exact grant/project/client/resource join and consent-ticket pattern. They supply validation semantics, not existing provisioning APIs. No new consent-table schema. Existing generation-draft reader by namedBundleHash supplies only independently qualified historical inputs, not selection of this owner context.
+
+## Post-T0 setup and two-effect contract
+
+One existing PrivateQaBootstrap instance: payload EXACT {operation:'finite_private_policy_setup',intentId,sourceRevision}; ID afw-finite-policy- plus SHA256('afw.finite-private-policy-setup.v1\n'+canonical({intentId,sourceRevision})). No caller policy/clock/selector. runFinitePrivatePolicySetup({env,event,step}) calls only fixed IndependentClosure.setupFinitePrivatePolicy(refs); createPrivateQaFinitePolicySetup({ctx,env}).run(refs) owns dependencies privately. Proposed lib/mcp-qa-finite-policy-setup.mjs and policy-transport.mjs, mounted in finite entrypoints. All caller paths/source/native provenance qualify; IDs alone do not authenticate.
+
+After original seed primary success, attended operator creates setup once; lost ACK is exact GET-only. Derive C0=T0+240000/C1=T0+420000 from original GitHub T0. Snapshot private raw context BEFORE upload under afw.qa-finite-policy-setup.v1:<intentId>:context, <=64KiB without modules. Include original revision/goal/save identity, owner/consents/program/legacy evidence, preparation/selection/binding hashes, baseline/rollback pins, exact six private values and intended full fingerprints. Later Save/revoke never substitutes latest rows; fresh authorization can deny effects without rewriting snapshot.
+
+Preserve actual Known/resolveNamedActivationPlan raw gates and original fourargs/18stages/70s/5s/20s. EVENTS/SUCCESSOR/withdrawal derive from original context/T0; withdrawal exactlyC0/C1. Historical retirement meaning stays qualified; project/client stay pre-T0 identities. Replace only approved private slots. Unknown fields fail; no env clone, private GHA/compiled policy or fabricated canary version/ctx.container capability.
+
+Existing canary-only publisher must qualify actual identity/account/expiry/operations independently; Editor/old closed probe proves neither upload capability nor fresh scope equivalence. Fixed account85d0d5dadac3341a564f22ce885e9eec/canary agent-friendly-web-delegated-canary paths: POST /workers/workers/<canary>/versions?deploy=false; POST /workers/scripts/<canary>/deployments. Reads fixed exact baseline/new/rollback versions, pointer, custody and exposure/execution; no general URLs.
+
+For EVERY pre/post-T0 upload, each inherited secret is EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name, omission or latest. Pin the actual qualified stage baseline UUID and complete descriptor vector into requestHash and SEND; recheck baseline pointer before sending. Never read/copy secret values. The [Workers Beta API](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/create/) supports explicit inheritance-version IDs on this route; do not substitute script upload.
+
+Post-T0 keys context/upload-send/upload-ack/activation-send/activation-ack/receipt/failure are append-only. Derived states prepared/upload_issued/uploaded/activation_issued/installed or admin_pending. SEND EXACT {purpose,intentId,sourceRevision,setupInstanceId,contextHash,effect,requestHash,issuedAt,deadline}; purpose afw.finite-policy-send.v1, effect upload|activation. ACK EXACT {purpose,sendHash,resourceId,acknowledgedAt}; purpose afw.finite-policy-ack.v1, actual UUID. Pre-T0 SEND EXACT {purpose,preconnectionId,sourceRevision,stage,contextHash,effect,baselineVersionId,baselineDeploymentId,requestHash,issuedAt,deadline}, purpose afw.finite-connection-send.v1; ACK uses the same ACK fields with purpose afw.finite-connection-ack.v1. Stage receipt EXACT {purpose,preconnectionId,sourceRevision,stage,baselineVersionId,baselineDeploymentId,versionId,deploymentId,moduleHash,configurationHash,completedAt,receiptHash}, purpose afw.finite-connection-installed.v1. Link all three receipts and actual consent links into final auditHash. Receipt timestamps follow actual ACK/readback, never predicted completion.
+
+Only acknowledged/read-back durable NEW SEND grants the same uninterrupted invocation one send. Reconstruct/late/unknown ACK/provider404 never refunds. Only fresh acknowledged new-version actual bytes/publicStatic/full-metadata qualification permits activation. Changed/foreign pointer denies; no atomic provider CAS claimed. Outstanding writes remain in inventory.
+
+Installed receipt EXACT {purpose,intentId,sourceRevision,setupInstanceId,qaVersionId,seedHash,contextHash,baselineVersionId,baselineDeploymentId,versionId,deploymentId,moduleHash,publicStaticHash,activationHash,restorationHash,bindingsHash,installedAt,receiptHash}; purpose afw.finite-policy-installed.v1, <=8192bytes, canonical domain hash. Actual full algorithms stay distinct. Private context/receipt readback precede output. installed cannot attest its own future Workflow terminal: later primary completed-success/output/pointer/writer correlation is mandatory before observer creation/preview or control.prepare.
+
+## Handoff, source gates and review rulings
+
+setupBy=T0+50000 proposal; original operation<=30000ms, children<=5000 clipped by setupBy. Require>=10000ms before upload,>=5000 before activation; late=>admin_pending. Original Native5 ARM deadline90s unchanged.
+
+ROOT3d72984c adoption rule supersedes14x5s: after successful seed, adoptBy=min(T0+70000,N1-180000); max36 absolute slots T0+2000*k,k=0..35. Skip elapsed slots/no bursts; children<=5s clipped to SAME parent; zero budget at70s starts nothing. Await only exact qualified404/not-yet or explicitly validated pending preview. Missing seed/auth/schema/source/unknown/transport uncertainty fails, no regrant. No CF POST/queue writer lock/new lifetime. Setup terminal -> operator observer -> qualified preview/ready -> launcher/prepare/guard/claim by90s; no active Bootstrap exception.
+
+4C2 readPrivateQaFiniteSetupContext({ctx,env,intentId,sourceRevision,signal})->{context,receipt} feeds existing material factory {controlOptions,readFinalPrimary,custody}; original snapshot, actual version/full hashes, no public raw RPC. Every pre/post-T0 writer must settle; no finite HEAD spent by failed preparation.
+
+Review rulings: root accepts the separate preparation mount/three transitions and the grant-independent Access-to-QA boundary. Explicit-version inheritance resolves builder finding2; actual pre-T0 provisioning resolves finding1. The36-slot rule from Native5 commit3d72984c78d8a2c010033c87b309025d7c947feb replaces the old14x5s paragraph. These are SOURCE decisions; C1 code/profiles are untouched. Test wrong owner/source/ticket/pointer/consent chronology, expiry margin, omitted/latest inheritance, lost/late SEND/ACK, reconstruction404, prearm business denial, source/namespace/secret drift, immutable revision after Save, unknown writers and deadlines. Fixtures explicitly synthetic.
+
+All capabilities are new/unimplemented. Initial attended baseline publication, actual private custody/API/source/privacy qualification, consent and future runbook approval remain gates. Closed rollback must be recoverable BEFORE mutation; failure is attended admin_pending recovery after settlement, not automatic third effect or assumed cancellation. No runtime action authorized here.
+
+
+## Root C2 Task1 exact-contract rulings (2026-11-02, before implementation)
+
+Source-only BASE 6c3b0f951d2c7a63cbf9abfd4aea81222bf1cd9a. Root approved narrow read-only validatePrivateQaFiniteLegacy({legacy,T0}) in mcp-qa-finite-trial-control.mjs, factoring the exact existing previous-field/hash/source validator and reusing legacy(plan,T0); exact own-data pair, immutable legacy only. No fabricated full plan/weaker duplicate; old finite-control native command joins GREEN. Baseline/rollback module is actual validateFiniteModule EXACT {name,sha256,bytes}; exports belong to configuration.exports/profile qualification, never a fourth descriptor field. Configuration is checked with actual activationConfigurationHash (seven keys, secret_text name/type only) AND separately fingerprinted with restorationConfigurationHash. Full source/binding correctness remains T3/T5.
+
+GrantLink and NoticeLink keep exact spec field lists WITHOUT purpose/selfhash. Their digest domains are afw.finite-grant-link.v1 and afw.finite-notice-link.v1 plus newline plus ASCII-key-sorted canonical full record. ConnectionRef map likewise has no purpose/selfhash; domain afw.finite-connection-ref.v1. Other record domains use actual purpose and exclude only their named selfdigest. Root accepted explicit fail-closed RED shells with actual SQLite mounts and behavioral assertions; missing dependencies/syntax/mounts are not qualifying RED. No positive authority placeholder.
+
+
+## Root Task2 identity and forwarding ruling (2026-11-02)
+
+Final OwnerPreparation.prepId MUST equal its original preconnectionId: the SAME original server-generated random32-byte ID is reused, never newly allocated or aliased. ONE final preparation per original preconnection; source/owner/window remain unchanged. No T1 schema change/secondary index/latest scan. readFiniteOwnerPreparation resolves exact prepId keys for original OwnerSourceSnapshot, Preconnection, GrantLink and NoticeLink and requalifies current source/primary. ID equality is factual correlation only, never permission. Task3 final producer MUST retain this invariant; immutable selection/binding/history and no renewal remain.
+
+Approved fixed default-unavailable source forwarding exports: forwardPrivateQaFiniteOwnerAuthorization({ctx,env,request,authorizationHash},lease), forwardPrivateQaFiniteOwnerGrant({ctx,env,request,grantId},lease), forwardPrivateQaFiniteOwnerNotice({ctx,env,request,requestId,sequence},lease). Only actual server-success refs and bounded preserved original request; no generic RPC/URL/status/identity DTO or registration. The original lease starts at actual canary request receipt BEFORE first SDK/auth/DB IO; hooks/QA may never restart30s/5s. T5 must qualify native sender/binding/holder and original-deadline/abort forwarding, overwriting any internal transport metadata from trusted source; actual transport remains unavailable here. Canary ExecutionContext is not QA DO ctx/storage. Unrelated ordinary consent is unchanged; a failed prep hook cannot revoke completed authorization or repeat grant creation.
+
+
+## Root SameSite browser-flow correction before source hooks
+
+Keep the preparation cookie SameSite=Strict. A cross-site initial /authorize navigation may omit it; never relax it or infer preparation from subject/time. In addition to genuine beginConsent+consent-row GET mapping when the cookie is actually present, Root approves one exact same-origin POST mapping point: AFTER actual api.approveConsent(request,h) succeeds, BEFORE store.consumeConsent/createGrant/completeAuthorization. The fixed sender passes authorizationHash=existing SHA256(h); QA independently verifies original prep cookie/ticket/current source and exact still-unconsumed original consent row. Existing map is read-only/idempotent; no replacement or refreshed issuedAt. Actual SDK-approved handle plus original configuration decision establishes transaction correlation before any grant. No cookie remains ordinary OAuth without preparation success; wrong handle/source/cookie never creates a link. Mapping after grant by matching rows/time stays forbidden. Missing/failed link cannot repeat or revoke genuine OAuth completion. Real SDK/native tests must cover GET without prep cookie then same-origin POST with it; this is HTTP fixture evidence, not an actual browser session. Actual forwarding qualification remains T5 unavailable.
+
+
+## Root Task2 exact preconnection-to-connection topology (2026-11-02)
+
+APPROVED completion requirement: PreconnectionConnection EXACT `{preconnectionId,connectionRef,grantHash,linkedAt}`, no purpose/selfhash; D(`afw.finite-preconnection-connection.v1`, whole exact record). Key `connection-preparation:<preconnectionId>:connection`. Fixed store `putPreconnectionConnection({relation,connection},lease)` atomically appends BOTH relation and exact existing ConnectionRef; `readPreconnectionConnection({preconnectionId},lease)` returns ReadObservation. Same original lease, strict immutable snapshots, no generic index/scan. Actual stored Preconnection+GrantLink must correlate owner/client/project/resource/grant and original source/window; recompute existing SHA256(grantId) identity. Require relation.linkedAt>=GrantLink.acceptedAt, connection.issuedAt=linkedAt, exact connRef/grantHash, times<=actual clock and expiry within original preconnection. Source additionally clips to fresh actual grant/Access expiration.
+
+Only genuine grant producer after actual GrantLink ACK+readback may allocate the initial random32-byte ConnectionRef. First exact pair wins; competing ref cannot replace it. Unknown/lost ACK, missing one side or conflict stays pending/uncertain, never re-mints/renews from absent read after an unknown attempt. Reconstruction recovers exact paired factual records only. A GrantLink already present with absent relation is NOT a new-allocation opportunity. Reader uses exact preconnection→relation→ConnectionRef. Task3 stages MUST consume this existing immutable pair, never synthesize a newer reference, scan maps or treat the relation as permission. Native atomic-pair/lost-ACK/conflict and actual grant-producer→subsequent-stage/read tests are required; no unexplained test-seeded map stands in for the producer.
+
+
+## Task2 source completion / Root review gate (2026-11-02)
+
+Code HEAD `0bf4dc1247550ab7b71a5242d465c5905a2bc531`, tree `f136b16e5137a2f103b9838e5bcc6aeea6f7e4fc`; hosted run41383552325/job125079335946/attempt1:24native+60affected=84PASS,0FAIL/0SKIP/0CANCELLED; scoped lint0errors/0warnings, artifacts0. Full exact RED/GREEN/commands/limits: [Task2 report](../reports/2026-11-01-finite-private-policy-setup-task2.md).
+
+Actual Access signature/expiry, release-primary owner/revision, exact original transaction links, original decision snapshot and atomic preconnection→ConnectionRef facts are implemented/tested in source. The fixed owner-source and three forwarding adapters intentionally remain UNAVAILABLE until T3/T5 actually qualify source/binding holders/QA_VERSION/RELEASE_DB/module/initial baseline/current stages/program and original cross-worker deadline/abort; no registration, caller authority or runtime readiness claim.
+
+Task3 must retain original prepId=preconnectionId, initial snapshot/window/program/baseline, exact paired ConnectionRef and original grant/notice expiry; no latest lookup, re-mint after uncertain absence, or grant/permission renewal. A read grant never authorizes configuration or publication. T5 cleanup/retirement/final-primary/withdraw/close/seal/proof factories must use retained original context plus actual withdrawal/settlement; do not require the positive ACTIVE eligibility reader after authorized Save/revoke or change Native5/C0/C1/R1 controls.
+
+DONE_WITH_CONCERNS/SOURCE ONLY; fresh Root spec+quality review pending. No provider/private/auth/runtime action. STOP WRITES after final docs CAS/readback; no Task3 implementation. operationalReadiness=false.
+
+## Root C2 Task3 exact contracts (2026-11-02, before affected code)
+
+SOURCE ONLY. Original BASE `2e80783c1d821c3e507f5217ead421237cb87887`. Unique Task3 writer; operationalReadiness=false. These rulings resolve source contracts, not owner/provider authority.
+
+1. StageApproval EXACT {purpose:'afw.finite-connection-stage-approval.v1',preconnectionId,sourceRevision,stage,ticketHash,approvalHash}, no selfdigest; existing D(actual purpose,canonical whole record). Key connection-preparation:<id>:<stage>:approval. putStageApproval(record,lease), readStageApproval({preconnectionId,stage},lease) use factual T1 observations and immutable append-only storage. Verify actual Preconnection/sourceM/owner/project/client/window; original Ticket.action=stage, preconnection/source/projectRef; actual TicketUse.recordHash=ConfigurationApproval.csrfReceiptHash and recomputed original decision digest/current proof limits. connection matches original pre.approvalHash and initialTicketHash; notices/finite match exact original atomic ConnectionRef. No latest scan or consent-to-configuration inference.
+
+2. Final audit EXACT hash-only value {preconnectionId,sourceRevision,sourceHash,preconnectionHash,stageApprovalHashes,stageReceiptHashes,grantLinkHash,noticeLinkHash,connectionRelationHash,connectionRefHash}. Each stage hash map EXACT {connection,notices,finite}. D('afw.finite-owner-preparation-audit.v1',canonical whole exact value); sourceHash=original OwnerSourceSnapshot.sourceHash, preconnectionHash=original recordHash. Other hashes use actual acknowledged/read-back StageApproval/ConnectionReceipt/link/relation/ref records. A narrow factual hashFiniteOwnerPreparationAudit may be shared. No future/self OwnerPreparation/selection hashes or authority.
+
+3. Reader retains original pre.approvalHash/initial-ticket checks independently. OwnerPreparation.approval maps FINAL finite-stage actual ConfigurationApproval into existing own-synthetic-policy-preparation purpose/decision approve/source/project/goal/times/csrf. Qualify all three actual stage approvals/receipts and recompute audit. Preserve original owner/window/baseline/program; prepId=preconnectionId. Final preparation/selection follows finite activation ACK/readback, before commandBy, with actual publication witness.
+
+4. Original-invocation admission: unexported WeakMap in owner-preparation keyed exact ORIGINAL incoming request lease. ONLY actual same-origin POST with verified current Access/source/primary, NEW consumeTicket status recorded, and exact durable decision/approval/StageApproval ACK/readback may set it. Entry captures ctx/env refs, preconnection/stage/stageApprovalHash and SAME already narrowed proof lease, never a settled five-second child/new clock. Export ONLY consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId,stage},originalLease); delete synchronously before validation/await, match exact refs/native source and assert lease, returning frozen private {lease,ownerSource,stageApprovalHash}. No setter/registry/DTO/RPC mint; reconstruction/uncertain/existing facts confer none. Public run consumes once before source IO. owner-http imports owner-preparation and connection-preparation; latter imports consume-only, avoiding cycles. parent.finish invalidates unused admission. Internal result carries refs only to fixed caller; HTML/JSON never projects them. Forms derive stage from server Ticket.action, never a body stage field.
+
+5. Fixed readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) remains default unavailable, with no runtime override. createFinitePolicyTransport({ctx,env}) privately captures actual existing native CF reader/publisher identities, not caller fetch/URL/credential/pins/success DTOs. T5 owns actual source/custody/byte qualification. Exact private material/transport/settlement table remains subject to Root ruling BEFORE transport/producer code; reuse actual baseline/rollback {versionId,deploymentId,module,configuration}, separate private bytes <=3MiB each, M-qualified candidate, existing exposure/execution validators and recoverable closed rollback. No invented GitHub token/public artifact/general module RPC. Actual byte residency remains a T5 gate.
+
+6. Independent Container correction is approved now: preserve dated existing AfwOwnEventNode SQLite/name/namespace in public+Wrangler source templates and wrangler.mcp-own.finite.jsonc, regenerate dynamic hashes/build metadata. Beta wire containers=[{class_name}], normalized helper validates/reintroduces actual name, exports preserves existing container name. No Docker image directive/app/image build/new namespace/migration/transfer/delete; use schema-correct unsafe metadata for source dry-run if needed. Unexpected reconciliation remains administrative pending. No runtime capability inferred from metadata.
+
+Hosted meaningful RED/GREEN plus scoped lint/native compiler/generated-byte dry-run only. No local source/clone/dependencies/build/temp downloads, provider/private probes, credentials, real auth/consent/window, DDL/deploy/cron/Container action, occurrence/main merge/Max or subagents. Stop writes for Root review after Task3 report.
+
+## Root C2 Task3 private material and effect ownership (2026-11-02)
+
+Record before transport/producer implementation. SOURCE ONLY; operationalReadiness=false.
+
+| Private field / boundary | Exact contract and ownership |
+| --- | --- |
+| readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) | Fixed default-unavailable source module; no runtime replacement/registry. Returns EXACT frozen {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}. No owner permission inferred from data. |
+| ownerSource | Existing validateFiniteOwnerSource grammar, original sourceM/QA/owner/project/client/goal/program/window/baseline retained. |
+| baseline / rollback | Existing EXACT {versionId,deploymentId,module,configuration}; validateFiniteModule plus <=3MiB, actual qualifyFiniteWorkerVersion(canary; rollback closed:true), activationConfigurationHash/restorationConfigurationHash, snapshotOwnWorkerExecution. |
+| candidate | EXACT {sourceRevision,role,module,configuration,publicStatic}; role preparation or canaryLive. preparation publicStatic=null and exact qualified phase; first two stages preserve actual baseline bytes. canaryLive uses actual M-qualified package descriptor/role/publicStatic and private bytes. |
+| bytes | EXACT {baseline,rollback,candidate}, defensive native Uint8Array copies matching descriptor/hash, <=3MiB each; never persisted/serialized/logged/artifact/public RPC. Source-private real residency and package privacy remain mandatory T5 gates. |
+| assertCurrent(lease) | Fixed source-owned closure qualifies actual ctx/env/binding holders/credential roles/custody/window/program/closed rollback and current exposure. No caller callback authority. Existing version urls and snapshotOwnWorkerExecution checks remain; routes/workers.dev/previews/crons/tails and ALL old pre/post-T0 writers qualify inside actual T5 closure against approved source, unavailable until implemented. No standalone exposure DTO/validator or invented post-T0 control. |
+| createFinitePolicyTransport({ctx,env}).run({preconnectionId,stage},originalLease) | ONLY exported effect method; synchronously consumes actual original owner admission before async IO, privately loads source/journal, captures actual native reader/publisher/global fetch identities, requires NEW SEND+readback before fixed CF requests. No upload(body), generic request, URL/pins/credential argument or exported mint. |
+| Transport result | PRIVATE EXACT {outcome,admission}; outcome is existing exact StageOutcome, admission is consumed actual {lease,ownerSource,stageApprovalHash}. JS-internal only; never HTTP/RPC/JSON/log. Captured narrowed lease is not a new clock. |
+| createFiniteConnectionPreparation.run | Calls the one transport.run; only installed permits post-stage/final preparation using actual captured admission; returns only StageOutcome. Reconstructed/missing admission fails before effects. |
+| Settlement | Transport per-actual-ctx WeakMap retains underlying CF promises until actual fulfillment/rejection after timeout. Producer similarly retains actual journal/storage operations with captured child guards. Abort/race completion is not settlement; durable unknown SEND stays blocking across reconstruction. ALL old writers must block positive qualification/restoration; T5 inventory mandatory, no actor-local-only claim. Any actor-wide durable index needs separate exact Root ruling before implementation. |
+| Expected own transition | Before effect, immutable source and baseline pointer. After timely activation ACK plus exact primary code/config/pointer readback, permit ONLY this stage's expected phase/currentPublication change; captured immutable core plus actual journal/ACK/raw pointer qualifies pre-receipt state, full new ownerSource only AFTER receipt ACK/readback. No future receipt cycle, unrelated drift, initial snapshot replacement or renewed expiry. |
+
+Beta publication remains full schema-qualified JSON/base64/deploy=false and explicit inherit UUID, preserving actual existing namespace/SQLite/Container. No lifecycle weakening, additional credentials, private/public provider probes, general module upload, Docker/image/app/migrations or automatic recovery.
+
+Root approves a DERIVED DRY-RUN-ONLY hosted config: remove top-level exports only in that transient config, retain exact unsafe.metadata.exports/container class declaration. Wrangler otherwise requires a local containers image configuration for the named export. Never deploy/publish that derived config or equate its warning/success with full runtime/profile acceptance. Full source/Beta export/container metadata remains intact. Validate generated module byte/hash identity before/after no-bundle dry-run; no fake image/Docker build.
+
+## Root C2 Task3 actor-wide factual writer head (2026-11-02)
+
+Before journal mutation: key afw.finite-policy-effect.v1:writer-head holds EXACT {identityHash,sendHash}. NEW SEND and head advance are atomic in the same native journal transaction. Advance only after strict matching predecessor SEND+ACK/readback; no clear/reset/delete. Unknown/lost ACK blocks all later SEND including other preconnections after restart. Existing same-send replay never advances or grants capability. Applies connection and policy factories; unrelated finite-trial HEAD stays untouched.
+
+Journal remains factual {storage,identity,now}: no assertSettled callback, success boolean or native-source claim from stored records. Actual fixed transport/source independently qualifies legacy writer inventory before absent-head first issue and underlying settlement before every advance. Its per-ctx registry retains ENTIRE admitted stage work/queued callbacks and actual CF/storage promises until real settlement, never just Promise.race. Only SAME original admission lineage continues itself; another preconnection cannot use an early ACK to bypass pending stage work. T5 source current/primary/writer inventory owns older cross-path reconciliation and remains unavailable until qualified. Unknown head/data/settlement fails closed. Cover atomic head concurrency, different-preconnection unknown, restart reconstruction denial and held actual promises. No registry/mint or storage-derived authority.
+
+## Root C2 Task3 actual original and effect deadline (2026-11-02)
+
+Before code: readFiniteOwnerRequestDeadline(originalLease) is a read-only getter from an unexported WeakMap populated ONLY by actual createFiniteOwnerRequestLease at request receipt, removed on finish. Assert exact original issued/current lease; clone/unissued/finished reject. Returns original wall receipt+30000; no setter/renewal/new parent or admission schema change.
+
+Each publication effect child begins BEFORE SEND transaction/readback. Its captured wall+monotonic duration is <=5000ms clipped by original deadline, source window, actual Preconnection/approval/Access bounds. ConnectionSend.deadline is min of those actual bounds and this SAME effect child's wall end. Claim/readback/network/ACK share the child's nonrenewable budget; never start another five seconds after claim or before fetch. Native captured guard invalidates on expiry/abort/settlement; timeout is not physical settlement. Test clone/finished getter and delayed actual native SEND ACK consuming the original child's budget. T4 has its own fixed original native clock; this getter never supplies setup authority.
+
+
+## Root C2 Task4 integration preflight (2026-11-02, before source work)
+
+Ruling: preserve strict pre-T0 selection/approval behavior while implementing a fixed native-source-qualified post-T0 factual path. Immutable selection requires selectedAt<=actual original T0<commandBy. A command just before commandBy may validly be processed after it while current permission/R1/setup/original-parent bounds still hold; never use observedNow<commandBy as a substitute for original command chronology. No caller T0/bypass boolean or refreshed parent/consent. T4 must propose the smallest exact actual native-entry/source/admission/material table before affected code; owning T5 source qualifiers may remain unavailable, not fake positive DTOs.
+
+The original native setup clock must include forwarding/queue and clip all child/SEND/ACK work. Official WorkflowEvent timestamp is the native triggered Date; fixed instance GET schema exposes queued/start, not created_on. No equality between those clocks was verified by the documentation lookup. Resolve source-owned provenance/narrowing before code, not a fresh30s in a later DO or a caller deadline argument. Actual four Known args/18stages/70s/5s/20s and setupBy50/ARM90 remain unchanged.
+
+Original pre-T0 ownerSource.currentPublication/ConnectionReceipt sequence is historical preparation provenance after the approved post-T0 policy activation, not permission to report the old prearm pointer as the current provider pointer. Native setup/prepare must separately qualify the actual current pointer/config/code against SetupContext/PolicyReceipt and fresh owned-primary facts, preserving original selection/snapshot/receipts. Use the narrowly expected own transition after actual ACK/readback, no rewritten baseline, new preparation-stage enum or generic pointer bypass. Propose exact contract before code.
+
+Source material-residency gate remains T5: compiler currently has single qaLive/canaryLive outputs; native QA has no GitHub download credential. Root considered a possible canary-first compiler DAG with QA-only compressed M-qualified canary bytes, but this is NOT selected/implemented/authority and requires exact design/size/privacy/hash-cycle qualification. No new key/public artifact/general module RPC by inference.
+
+C3 current-source preflight at423c1bf/bcf54a5c: delegated-oauth-worker143 returns paused on OAuth=false before ordinary owner connections/revoke295–319; monitoring has its own gate144. Separately qualify narrow existing-grant business/early withdrawal before live; C0 cleanup does not establish early owner withdrawal. This is future C3 work, not a reopened Task3 review.
+
+References checked without resource probes: https://developers.cloudflare.com/workflows/build/events-and-parameters/ ; https://developers.cloudflare.com/workflows/build/workers-api/ ; https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/ .
+
+## Root Task4 factual binding correction — 2026-11-02
+
+Execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`. SOURCE ONLY; operationalReadiness=false.
+
+`bindSelection(binding,lease)` is already the intended post-T0 factual API. Preserve strict pre-T0 approval/selection/read APIs. Correct only its observed `at>=commandBy` predicate to require `observedAt<min(preparation.expiresAt,owner.accessExpiresAt,connection.permissionExpiresAt,approval.expiresAt)`. Retain actual-record `selectedAt<=T0<commandBy`, exact current selection/head, durable publication witness `selectedAt<=publishedAt<=T0`, `T0<=boundAt<=observedAt`, immutable once binding and original lease guards. Stored expiries are facts, not current consent or native authority. No new record, hash, key, API or bypass variant. The fixed native setup must independently qualify original primary T0, current owner/consent, R1/setup and original parent before this call.
+
+Required native RED/GREEN: command just before commandBy with binding observed after commandBy and original unexpired bounds; command at/after commandBy, expired stored bounds, late witness and current-head drift denied. Original native source/clock/material table is still under Root ruling; no affected product implementation before that ruling. Known four args/18 stages/70s/5s/20s and Task5/C3 boundaries unchanged.
+
+## Root Task4 native/source/material contract — 2026-11-02
+
+Execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`; factual binding correction code `a75403f7c551ea2c6bd66c683d84a3ddddea1e82`. SOURCE ONLY, operationalReadiness=false. This table records Root's pre-code ruling; default source constructors remain unavailable until Task5 actual qualification.
+
+| Boundary | Exact fixed contract and ownership |
+| --- | --- |
+| Public operation | Payload EXACT {operation:'finite_private_policy_setup',intentId,sourceRevision}; refs EXACT {intentId,sourceRevision}; setupInstanceId='afw-finite-policy-'+SHA256('afw.finite-private-policy-setup.v1\n'+ASCII-canonical refs). Only finite PrivateQaBootstrap dispatch and finite IndependentClosure subclass setupFinitePrivatePolicy(refs). Ordinary index/public ingress, existing namespace/class/backend/exports and all other methods unchanged. This is the narrow Task4 exercise mount, not Task5 completion. |
+| Workflow source entry | readPrivateQaFinitePolicyEntry({env,event,step},originalLease) -> EXACT {setupInstanceId,sourceRevision,qaVersionId,eventTimestamp,queuedAt,startedAt,T0}. Fixed source owns actual native entry, existing binding/primary Workflow identity, M/QA, original command/seed and read-only qualification. Native Date/instanceId mandatory; actual supplied workflowName must match afw-own-qa-private-bootstrap, absent name requires source proof. Matching IDs/status DTO are not authority. Default unavailable; no registry or caller clock. |
+| DO source material | readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease) -> EXACT {native,ownerSource,originalContext,baseline,rollback,bytes,assertCurrent}. native uses the seven fields above. ownerSource uses accepted validateFiniteOwnerSource grammar; finite_prearm/currentPublication remain immutable historical preparation provenance. baseline/rollback EXACT {versionId,deploymentId,module,configuration}, existing module {name,sha256,bytes}; private bytes EXACT {baseline,rollback,candidate}, each Uint8Array <=3MiB. Candidate descriptor comes ONLY from actual seed.manifest.modules.canaryLive.module (name/sha256/bytes, separately actual exports); M/tree/publicStatic checked against source/seed. Fixed assertCurrent(originalLease) independently qualifies actual source/entry, owner/current primary, publisher custody/expiry/operations, current pointer/exposure/bytes and all writer inventory, including only actual own journal ACK transitions. No caller expected-transition DTO or generic send callback. Default unavailable until Task5. |
+| Clock | Workflow wall/monotonic guard starts before IO; eventTimestamp+30000 cap narrows to min(eventTimestamp,queuedAt)+30000 and T0+50000. Require primary queuedAt<=startedAt<=observedNow, eventTimestamp<=observedNow; NO invented equality/order between eventTimestamp/queuedAt. DO source hydration begins under read-only provisional <=5000 guard before IO; no effects until independently source-qualified original deadline, never fresh30 after forwarding. Same parent narrows through original owner/window/permission/R1; each effect child begins before SEND and shares <=5000 across storage/readback/network/ACK. Source clocks/T0 are never public arguments. |
+| Setup factual read | INTERNAL readFiniteOwnerSetupFacts({ctx,env,intentId,sourceRevision},originalLease) itself calls fixed DO source and actual readFiniteMaterialSeed under the same parent, checks primary original T0, selected owner/selection/witness, current D1 owner/grant/notice/revision/program and immutable three-stage history. Pre-T0 reader APIs unchanged. Return private EXACT {value,selected,witness,receipt,ownerSource,source,material,notice}; value is existing pre-selection preparation facts, notice actual current event, source/material remain private and confer no send authority by themselves. No caller seed/T0/bypass. |
+| Original context | EXACT {artifact,scope,original,publication,cancellations,retirementPolicy,withdrawalRequestId,saveIdempotencyKey,legacy,trialId}. artifact actual six fields {script,sourceRevision,sourceTree,programHash,workerHash,sourceCheck}: script is actual candidate Worker bytes, revision/tree are real CODE build M/tree and workerHash actual SHA. Candidate programHash independently proved from embedded candidate program. scope/original/publication existing exact validator grammars. original.programHash/sourceRevision match ownerPreparation.programContext retained ORIGINAL program Q, which may differ from candidate runtime M. cancellations ARRAY preserves existing exact Known historical entry grammar/order/values; no currentGrant in original hash. retirementPolicy raw unchanged qualified historical meaning; withdrawal/save UUIDs and trialId64hex are source-owned preexisting approved identities committed before initial choice, never generated from future T0. publication.workerHash/artifactKey bind candidate bytes, activationKey fixed pre-T0 identity, never provider UUID. legacy existing exact validator. |
+| Original digest | originalContextHash=SHA256 UTF8('afw.finite-original-context.v1\n'+ASCII-canonical exact context projection replacing artifact ONLY with {sourceRevision,sourceTree,programHash,workerHash,sourceCheck}); all other fields unchanged. Bound script bytes/hash separately; no script/current grant/current notice/T0/future ACK in digest projection. Actual original program/context and candidate provenance must reconcile independently; digest alone grants nothing. |
+| Derived policy material | C0=T0+240000,C1=T0+420000,N1=T0+300000. Exact six private slots only. EVENTS actual selected owner/grant/project/client/resource T0..N1; SUCCESSOR retained scope/original/publication and candidate {trialId,programHash,sourceRevision,startAt:T0,expiresAt:N1,budget:1}; withdrawal C0..C1 with actual current D1 notice originalConsent {sequence,revision,issuedAt,expiresAt} and actual resolved candidate identity. Historical cancellations preserved; construct full Known history currentGrant from current D1, never initial hash. Pure resolveSuccessorPreparation/prepareKnownCancellationHistory/withdrawal parser before effects; resolveNamedActivationPlan only after actual new version/deployment/config readback. No env clone, fake flag/Container, predicted UUID or Known execution. |
+| Native effect admission | Only original actual setup producer, after fixed native source + primary seed + factual current checks, can enter private transport under its same original lease. No owner-POST admission reuse, public mint/clear/force/reset or factual-record authority. Same actual ctx/env/storage/db captured and shared stage-work retention across connection/policy identities; track actual nested IO Promise before races. Binding newly recorded plus exact durable readback required; existing/uncertain binding/SEND never grants a new send. |
+| Transport/context/output | Reuse fixed Beta HTTP/projection engine privately; no generic URLs/credentials/caller policies. Snapshot immutable SetupContext <=64KiB before upload. Exact baseline-version secret inheritance vector hashed in request/SEND. One upload then one activation; actual timely upload ACK plus fresh bytes/full metadata needed. Source assertCurrent independently reconciles baseline to its own actual journal ACK/pointer transition. Context and receipt readback precede installed output; output contains no raw policies. Later completed-success Workflow/output/pointer/writer qualification remains mandatory for observer/control.prepare. |
+
+No relabelling M script with original Q revision, weakening Known four args/18 stages/70s/5s/20s, compiler changes, actual provider/private reads, credential/role/OAuth/window action, runtime/DDL/deploy/cron/Container, finite HEAD or Task5/C3 implementation. Compiler source currently does not establish separate retained program mapping; default source remains unavailable until qualified. SYNTHETIC fixtures establish source-contract behavior only, never actual custody/byte residency/platform cross-RPC provenance.
+
+
+Root Task4 final pre-effect checks: actual native eventTimestamp AND queuedAt must be >= actual material.primaryEvidence.seedStepCompletedAt >= original T0; completed-success seed is required BEFORE setup creation. No invented event/queue equality/tolerance. Candidate upload cap3MiB never relaxes Known artifact.script<=2MiB; validate exact artifact bytes/hash/M/tree/sourceCheck/candidate correspondence BEFORE publication, then full resolveNamedActivationPlan only after actual new UUID/config readback. Default actual source remains unavailable until Task5.
+
+
+## Root Task4 whole-operation retention ruling — 2026-11-02
+
+SOURCE ONLY at execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`; preceding implementation `c96a1cee336c0edf7e7fc7ae21ccaabedd667f85`. Before affected code: start the existing denial-only `observeFiniteOwnerStageWork` atomically at original DO run entry after exact refs validation and before first source/facts IO. Its private original-invocation lineage object identifies actual ctx/env/storage/RELEASE_DB plus the SAME original issued parent lease, narrowed only after original source time is known. Retain this lineage through hydration, nested factual reads, binding/context, transport and receipt; retain actual nested native promises before racing. A second lineage is denied before source/effects while outstanding; release only original termination AND actual promises settled. No public lineage constructor/token/mint/clear, helper relaxation or new clock.
+
+Lineage retention grants NO send authority. The distinct private effect admission is minted and consumed only after fixed source/seed/current owner checks and NEW binding/context ACK/readback. Original source constructors receive the actual original parent lease while bounded read-only child races retain their actual operations. Native Workflow RPC returns RpcPromise: retain a fixed source-owned native async continuation awaiting the captured actual binding/method BEFORE racing the original Workflow deadline. This proves client RPC-continuation settlement only, not remote physical settlement, remote DO terminal, or T5 all-path closure. Root approved this narrow correction after native RED `545156864549efa963a30bcab58848dcefd9c2c5` run41475481741/job125379799936 (1 failed), and repair `a8e56e9ed6666b320a1ab026e982e818218d98d9` run41475798053/job125380907183 (1 passed). Add a native held nested hydration case: response/finish does not release held work, second invocation performs no new source read/SEND/CF POST, and late guard cannot write. All source/CF/GitHub/custody fixture qualification remains SYNTHETIC; operationalReadiness=false.
+
+
+## Root Task5 subdivision and T5-B1 ruling — 2026-11-02
+
+Pre-code BASE `1057ce94a77df9edd8119f74c516d5512add3cf0`. The [complete preflight tables](../reports/2026-11-01-finite-private-policy-setup-task5-preflight.md) identify actual signatures, source/program/byte provenance, native versus GHA callers, missing bootstrap, forwarding/abort limitations, original cleanup and ALL writer families. Root rules sequential subdivision because these are missing producers, not one constructor.
+
+Start ONLY B1: actual nodeM→canaryM→bounded deterministic compressed candidate→QA-only embedding and fixed private decoder, candidate<=2MiB, QA<=3MiB measured. Exact module3keys plus compiler-derived programM/sourceRevision/sourceTree/sourceCheck; no selfhash cycle, original-Q relabelling, private/historical bytes, path/URL/callback/boolean initializer. Preserve physical-checkout before/after, exports/profile/Container/backend. Strict canonical decoder and actual byte SHA; private in-process only. Complete package stays false/throw. No other seam/bootstrap/mount/forwarding/C3/settlement implementation. Hosted meaningful RED/GREEN, scoped lint, compiler measurements and separate B1 report; STOP for fresh Root review. All runtime gates remain, operationalReadiness=false.
+
+
+## Root Task5-B2 A+B ruling — 2026-11-02, before product
+
+BASE70408e380551ac7dc70d3e88ec9f5b75172fbe75. Complete exact preflight table1/2, original recommendation, source/API limitations and Root ruling: [B2 preflight](../reports/2026-11-01-finite-private-policy-setup-task5-b2-preflight.md). B1 accepted; Task5/B2 incomplete, completePackage=false, operationalReadiness=false.
+
+Root selects ONE coherent read-only factual producer: fixed fullUUID closed-canary historical bytes/private metadata plus exact native control/four-journal snapshot plus bounded first-primary RELEASE_DB originalQ/cancellation rows derived ONLY from qualified manifest.original/scope. Historical frozen315/source2a477 != originalQ != candidateM. No caller pins/URL/callback/credential, latest, reconstructed oldpolicy, invented history or empty cancellation defaults. Actual fixed1830202byte/SHA/receipt/config validation; missing private strings are sanitized unavailable gate. Existing helper10min contracts unchanged; no15min relabel. <=8 cancellation rows; reject overflow/missing/ambiguity/foreign identities/times. Readonly exact known storage keys, no scans/write/newstore/DDL. Private in-process only, no HTTP/RPC/log/artifact/embedding. No unavailable seam replacement or native code/permission/admission claim.
+
+Fixed env credential privately consumed with approved dated custody descriptor + actual verify, never globalenv/noarg success. All read children<=5s clipped same original30s wall/mono/abort; actual promise retention under existing stage scope, never timeout/dispose=settlement. Explicit writable metadata normalization before code; rejecttransfer/destructive/cache-on/unknownextras, existing fingerprints unchanged. Consolidated exact args/returns/queries/bounds must be validated by Root AFTER this ruling documentation and BEFORE product.
+
+Keep pre-T0 QA bridge/bootstrap-once/capsule/newintents, custody/sourceauthority, forwarding/mounts/publication/C3/all-writer composition separate. No drafttable misuse19fc… or owner question. Hosted Node22 behavioral RED/GREEN, actual workerd/DO/D1/SQLite newlogic with explicitly SYNTHETIC provider/custody boundary; scoped regressions/lint only. Temporary branch contents:read/no-secrets/no-artifacts qualifier EXCLUDED integration; separate B2-AB report with exact CAS/readbacks and STOP for fresh review. No runtime/provider/private reads/main/DDL/keys/window/Max/local work.
+
+
+## Root validated consolidated B2-AB contract — 2026-11-02, before product
+
+After preflight/ruling dd4773a38a54a4f7611b1829b7cd79f7d8b6a0b1 (CAS/ref/all4 exact readbacks), Root validates implementation of this factual unit. This appendix supersedes only the preflight proposal's whole5s, escaped-result cap, env-envelope and rawhash ambiguity.
+
+New private API: readPrivateQaFiniteHistoricalSource({ctx,env},originalLease), exactly2args, exact options and existing {signal,assertCurrent} parent lease. No selector/pin/URL/credential/source/clock/callback input except original parent guard. No mount/old source-seam replacement. Capture actual env AFW_MCP_CLOSURE_READ_TOKEN/RELEASE_DB/AFW_RELEASE_EVENTS_NODE/AFW_INDEPENDENT_CLOSURE/AFW_QA_VERSION and native ctx.id/storage/methods; pin stable same holders after awaits. Local coherence is NOT source identity/permission/admission. Separate owning source wrapper remains unavailable. No global custody change/ALS crossRPC assumption.
+
+Clock: same original parent<=30s wall/mono/abort, logical children<=5s clipped parent, never renewed on forwarding/await. Retain actual native promises/continuations through retainFiniteOwnerStagePromise BEFORE child race; this read-only retention is not remote physical settlement proof. Prefer per-child5s under originalparent; a stricter whole5s, if used, must be reported as futurelatency gate, not usabilitypromise.
+
+Fixed GETs: account85d0d5dadac3341a564f22ce885e9eec/tokens/verify and full closed-canary UUID2607abae-cec3-4e35-89eb-8b8572262b54?include=modules, no latest/prefix. Native9aa97ad1fc9afe3021cf69ea497d5190 active, actual expiry valid. Dated source only states minute02:59: Root authorizes conservative ceiling2026-11-03T02:59:00Z and effectiveExpiry=min(actualVerifiedExpiry,ceiling), never assumes exactseconds/policyequality. Validate actualaccount/tokenID/active/notbefore/freshness; no9db/057alias/newkey. Fixed trust descriptor is dated approval of this operation ONLY; scopeVerified=false. Stream bounds token8KiB/version3MiB, redirectmanual/no-store/HTTP200/freshDate<=5s/no-cache/canonicalbase64/fatalUTF8; sanitized error, no provider/SQL/private text.
+
+Historical artifact EXACT committed receipt8 {baseVersionId,artifactKey,sourceRevision,sourceTree,programHash,workerHash,workerBytes,sourceCheck} from scripts/mcp-confirmation-frozen-artifact.json; actual1830202B/SHA315cc3b310767bafe6c7928822b5acb8ec5ad168e21d94a55e6fea26592e46d3/source2a4773737764c5038aaa0b3528b43df2a0572441/tree637af253296ac1c771cb73ea353cb960a2e59204/programf6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6. Artifact6 {script,sourceRevision,sourceTree,programHash,workerHash,sourceCheck}. Historical artifact != originalQ != B1 candidateM. Exact version metadata/pin29bindings/8false/config4fc9703cc8de929f766aa6aac3429d06c806ba2663ce63ec33a5754a030853c0. Fixed historical version is NOT currentdeployment proof.
+
+Metadata: writable projection compatibility_date,compatibility_flags,main_module,usage_model,containers,exports,bindings; optional limits/placement/cache_options/assets/package_dependencies preserved exactly ONLY if normalized fixedhash admits them. Explicit bounded readonly whitelist id/number/startup_time_ms/annotations/urls/source/created_on/author_id/author_email; no genericextras. env is undocumented in currentBetaGET and MUST REJECT. Exact original exports default/AfwNodeControl workers and AfwOwnEventNode sqlite/container; reject expecting-transfer/transfer_from/delete/destructive/cachetrue/unknown. Narrow normalization allowed ONLY explicit state:'created' on the3exports, worker cache:{enabled:false} on2workers, global cache_options strictly known allfalse shape. Hash normalized fixed-template projection==4fc970…; rawhash may differ solely for documenteddefaults. If rawalready4fc, preserve fields without unnecessary erasure. Capture rawhash independently and compare both snapshots, never label it4fc when different. Private metadataProof EXACT {versionId,rawConfigurationHash,normalizedConfigurationHash,normalizations}; normalizations sortedunique closed path enum exports.default.state, exports.default.cache, exports.AfwNodeControl.state, exports.AfwNodeControl.cache, exports.AfwOwnEventNode.state, cache_options. Existing strict restorationConfigurationHash unchanged. No upload here.
+
+Private required strings successorPolicy<=8192,eventsPolicy<=4096,retirementPolicy<=4096 from exact qualified bindings; crosscheck actual client/project/resource. Parse original/scope/candidate/publication with existing exact grammar; native namespace derives actual original and historical successor actorIDs. Missing strings => sanitized historical_slots gate, no hash inversion/named/dispatch reconstruction. Retirement MUST reuse/factor existing pure grammar; enabled/effectguards unchanged, no envclone or permissive duplicate. Target follows actual existinggrammar, not forcedQ/M. Committed scripts/mcp-qa-legacy-historical-context.json realhash-only source, not compilednullglobals.
+
+Legacy: one native storage transaction reads EXACT5keys afw.canary-restoration-control.v1, afw.private-prepared-dispatch.v1, afw.private-reduction-dispatch.v1, afw.successor-canary-restoration.v1, afw.successor-retirement-handoff.v1. No scans/list/HEAD/write. Own canonical data<=64KiB. Control/closure/preparedissued+nullcompletion/reductioncomplete match committed historical control/closure/journal/withdrawal/dispatch hashes + actual historical manifest/events; absent restoration/retirement required, storednull rejected. Repeat snapshot after D1 and compare. Do not manufacture full finiteLegacy.sourceRevision/sourceHash or old named bundle validation.
+
+D1: fixed bounded single SQL per snapshot, real RELEASE_DB.withSession('first-primary'). Source-bound original container/program/revision plus oldevent subject/project/client/resource; no caller selectors. OriginalCTE exactselection; global admissionCount,closureCount,nonNullClosureCount retain discrepancy. Enumerate ALLclosures LIMIT10, LEFTjoin originaladmission/grants/latestmonitor and one actualearliergrant row (minimumearliergrantsequence), pergrantadmissioncount and projectownership existence; no filtering away foreign/invalid rows. Require totaladmissions1, exactly1nonnull processclosure, totalclosures=1+cancellations.length,1..8cancel and completebounded result. Exact originalprocess row matches Q/admission/grant/scope/image; admission/consent expired, created<=closed<=DBnow/localnow. Cancellation process_generation NULL, noadmission, distinctoriginalgrant, actualowncontainer/program/source/image (may differQ/M), sameowner/project/client/resource, canonicalgrantISOcreated<=exchanged<=revoked<=closed, expired<=DBnow, singletonreadscope. Latestrevoke positive seq/revision/purpose/scope, issued==expires<=closed; actualearliergrant same scope/purpose, lowerseq, validpositive chronology. Preserved oldevents.grantId hash must match committed historicalcontext.grantIdHash and its cancellation container/program/source match historicalcandidate; originalQ remains separate. No currentGrant/active-newgrant/Save/currentprojectrevision requirement; no 10min helper change/15min relabel. Second identical query compares ALLnormalized historicaldata except DBnow; no distributedatomicity/physicalstop claim. Rejectmissing/ambiguity/foreign/overflow/invalidtimes, neverdefault[].
+
+Return EXACT deepowned {purpose:'afw.finite-historical-source.v1',artifact,receipt,configuration,metadataProof,bindings,legacy,history,observedAt,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,operationalReadiness:false}. bindings={successorPolicy,eventsPolicy,retirementPolicy} canonical strings. legacy={control,preparedDispatch,reductionDispatch,restoration:null,retirement:null,controlHash,preparedDispatchHash,reductionDispatchHash}, no fabricated provenance. history={originalAdmission,originalClosure,cancellations}; originalAdmission={grantId,subject,projectId,clientId,resource,containerId,processGeneration,programHash,sourceRevision,image,createdAt,expiresAt,consentExpiresAt}; originalClosure={grantId,containerId,processGeneration,programHash,sourceRevision,image,closedAt}; cancellation existing10keys {grantId,containerId,programHash,sourceRevision,image,closedAt,revokedAt,monitorSequence,monitorRevision,monitorRevokedAt}. No capability/secret/currentgrant/successauthority. Script exactreceiptUTF8byte/SHA; canonicalmetadata EXCLUDINGscript<=131072; rawscriptUTF8+metadata<=2097152. NEVER cap escaped JSON.stringify wholeartifact as wire2MiB. NoHTTP/RPC/log/artifact/embedding.
+
+Fixed sanitized exception gate enum input/custody/http/metadata/historical_slots/legacy/history/coherence/deadline; no private text. Tests actual newreader/query/parser in workerd DO/storage/D1SQLite; explicitly SYNTHETIC CF/custody/test-time fixedreceiptfixture boundary (no productionpinsparameter), no whole-source successDTO. Actual newbehavior RED beforeproduct, GREEN scopednewtests+affectedmetadata/history/retirementregressions+eslint, Node22/existinglockfile/contents:read/no-secrets/no-artifacts/deploy qualifier EXCLUDEDintegration. B1 unchanged, no reflexrerun. Separate task5-b2-ab report exact base/code/docHEAD/run/job/counts/CAS/all-file readbacks and STOP for freshreview. Sourceauthority/bridge/bootstrap-once/newIDs/store/forwarding/mounts/publication/C3 remain SEPARATE; Task5 incomplete, operationalReadiness=false.
+
+Root secret-descriptor clarification: reject any returned secret_text value/text/key/extra content BEFORE raw fingerprint/projection. Only exact {name,type} descriptors; never hash secret values. Plain private policies remain allowed in-process data.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-01-finite-profile-package-design.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-01-finite-profile-package-design.md b/docs/superpowers/specs/2026-11-01-finite-profile-package-design.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-01-finite-profile-package-design.md
@@ -0,0 +1,103 @@
+# Finite profiles, semantic qualification and package — Task4C
+
+DESIGN ONLY; root-selected direction pending fresh builder review. Base `f9c70a3f13540ea693350179e9fdf3d2356cbc1f`. No production package exists. This specifies source work, not authorization to read credentials, preserve remote bytes, publish, mutate schema, run a trial or enable Task5. Original clocks, consumed claims and raw legacy history remain unchanged.
+
+## Actual boundaries and proposed files
+
+Existing anchors: `worker/independent-closure/index.mjs`, `worker/mcp-own/index.mjs`, `worker/independent-closure/closed-rollback.mjs`; builders `scripts/build-private-qa-closed-context.mjs`, `scripts/build-mcp-own-worker.mjs`; fixed historical locator `lib/mcp-qa-cloud-closed-pins.mjs`; canonical fingerprints `lib/mcp-restoration-configuration.mjs`; source/archive resolver `lib/mcp-qa-finite-package.mjs`.
+
+Add:
+- `worker/independent-closure/finite.mjs` and `worker/mcp-own/finite.mjs`: explicit opt-in compositions exporting the actual existing classes, with compiled factory installation before any constructor/alarm use.
+- `lib/mcp-qa-finite-profile.mjs`: source-approved exact role templates, canonical projections and `qualifyFiniteSourcePackage({manifest})`.
+- `scripts/build-finite-native-package.mjs`: actual source/profile/module verification and six-file package.
+- `wrangler.independent-closure-qa.finite.jsonc` and `wrangler.mcp-own.finite.jsonc`: explicit build/deployment proposals, never applied by packaging.
+- `.github/workflows/afw-finite-native-package.yml`: dedicated secret-free main-push artifact producer.
+
+Default entrypoints/configurations remain closed; do not spread env, force flags or use the example canary config as production truth. Its zero IDs/local placeholders and the older delegated Worker entrypoint are not usable finite profiles.
+
+QA composition must install `installPrivateQaFiniteObserverSource`, `installPrivateQaFiniteMaterialFactory` and `installPrivateQaFiniteNativeGuardFactory` from actual source constructors, using real ctx/env/storage and compiled source identity. Canary installs `installFiniteOwnNativeCleanupFactory` plus the concrete fixed event-control resolver. Existing default factories are unavailable, and a callback slot or synthetic producer is not package qualification. Require actual imports/mounts and native construction tests; absent implementations stop the builder. This design does not invent the full business route: its real nominal/receiver/primary/guard composition remains required Task4C work.
+
+## Exact source profiles
+
+Fixed account 85d0d5dadac3341a564f22ce885e9eec; compatibility date 2026-09-07 and explicit approved compatibility flags. New profiles have no routes, workers.dev/previews off, crons/tails empty and no unexpected entrypoint/binding.
+
+QA live:
+- Exact exports: IndependentClosure, PrivateQaBootstrap, PrivateQaCatalog, PrivateQaNamedConfirmation, PrivateQaPreregistration, default, observePrivateQa. Types/classes are qualified independently of export names.
+- All 14 names in `PRIVATE_QA_CLOSED_FLAGS` are literal string `false`, all existing closed policy slots empty. Four release flags OPERATOR/WORKFLOW/CONFIRMATION_WORKFLOW/RESERVATION_WORKFLOW are literal string `true`.
+- AFW_QA_VERSION is actual version_metadata. IndependentClosure retains namespace 070c4a7708eb4592a3ded7c117a88225 and fixed actor afw-own-successor-closure-v1; preregistry retains 6f30104244424152b800bc64d5f4cfac.
+- AFW_QA_DB remains 676ca49e-af71-4f2f-a12d-11f13de78a51. RELEASE_DB explicitly aliases canary 6a728254-1494-4039-802e-b39288a55fcc; AFW_QA_DOSSIER_DB, if consumed by the concrete existing private reader, is an explicitly declared alias of that same canary DB, never QA_DB.
+- AFW_RELEASE_EVENTS_NODE and retained AFW_MCP_CLOSURE_NODE target existing canary AfwOwnEventNode namespace d6fc71552de7494a863aca20365a572d. AFW_QA_BOOTSTRAP and AFW_QA_NAMED_CONFIRMATION target the fixed existing definitions/classes; the latter is a proposed addition, not an installed closed-baseline fact.
+- Read custody remains AFW_MCP_CLOSURE_READ_TOKEN. Implement an explicit source-selected binding-name resolver inside the release runtime: ordinary operator builds select AFW_RELEASE_READ_TOKEN; only compiled finite-QA composition selects the existing closure-reader alias. Read directly from actual env, retain binding/value identity across awaits, preserve the four-argument Known wrapper. No env clone, token-value copy, new secret binding or caller-selectable alias. This narrow runtime adaptation requires its own affected tests/review. Publisher alias AFW_MCP_CLOSURE_PUBLISH_TOKEN stays separate and accessible only to the fixed cleanup authority.
+
+Canary live:
+- Actual Worker default/AfwNodeControl and SQLite AfwOwnEventNode exports; validate full exports/Container grammar with `snapshotOwnWorkerExecution`. Preserve existing application/namespace d6fc71552de7494a863aca20365a572d; no app creation, new namespace, Docker substitution or attachment fabrication.
+- DB binds 6a728254..., OAUTH_KV 6b94ff702e504e14a7730cee73a0f6ff, actual AFW_DOSSIER_EVENTS_NODE and existing resource identities are exact.
+- NEW AFW_FINITE_TRIAL_VERSION version_metadata and AFW_FINITE_TRIAL_CONTROL binding to the fixed QA IndependentClosure namespace/class/script. Compiled entrypoint family is finite_trial_event; deny legacy delivery/schedule before host access and qualify alternate consume/HTTP paths.
+- Compile only templates/factories; private plan/consent must not enter package bytes. Existing Known confirmation requires literal true for AFW_DOSSIER_EVENTS_ENABLED and AFW_DOSSIER_SUCCESSOR_ENABLED. Every other live flag/slot needs explicit source disposition; unspecified capabilities stay closed. The typed projection/private-full boundary below is mandatory before claiming a complete finite profile or production package.
+
+Historical closed roles retain literal bytes, actual main-module names, exact approved metadata and custody. No rebuild/relabeling. QA closure must preserve classes/namespaces/history while denying operative entrypoints. Existing C570 may lack finite factories, but must preserve recoverable journals and not accidentally expose legacy business effects. Operator remains literal 855dc5c1-e757-49aa-a6f5-cb02f8d03ea4; never substitute a current-M operator build.
+
+## Public static projection; private actual configuration
+
+Root selects TWO distinct commitments. The public package describes static role semantics; trusted native AFW retains and validates actual private metadata. Keep all Known/resolveNamedActivationPlan predicates, the original four arguments/18 stages/70s and nested 5s/20s limits. Never substitute a projected configuration for actual CF metadata or clone env to manufacture valid bindings.
+
+Add `projectFinitePublicConfiguration({role,metadata})` internally. It validates the exact source-owned binding set/types/resources/public constants FIRST, then replaces only permitted canaryLive plain_text values with fixed typed objects in a NEW projection. Example binding projection: `{name,type:"plain_text",privateSlot:{purpose:"afw.finite-private-slot.v1",kind:"events-policy"}}`. This is not provider metadata and must never enter activationConfigurationHash or the Known wrapper.
+
+Finite-canary-only admissible kinds map exactly to AFW_DOSSIER_EVENTS_POLICY/events-policy, AFW_DOSSIER_SUCCESSOR_POLICY/successor-policy, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY/withdrawal-policy, AFW_DOSSIER_RETIREMENT_POLICY/retirement-policy, AFW_OAUTH_PILOT_PROJECT_ID/project-id and AFW_OAUTH_PILOT_CLIENT_ID/client-id. Presence is fixed by the reviewed concrete profile, never optional because a caller supplied a field. EVENTS/SUCCESSOR/withdrawal and identity pins are required by current live/reduction code; retained retirement data must match its original approved historical context. Public fixed client constants may remain literal only when explicitly source-pinned. No prefix stripping or blanket policy redaction. Unknown names/types/extra fields/accessors fail until source review admits them.
+
+Legacy save/scheduler/monitoring-owner entrypoints remain closed and their policies/save key absent; source does not use their HTTP writer to obtain synthetic goal-save authority. AFW_OAUTH_PILOT_EXPIRES_AT or another future variable cannot become a new dynamic placeholder by inference: absent/static disposition or an explicit source amendment is mandatory. Secret bindings retain name/type only; no values or secret-value hashes. QA has NO plaintext private-policy/selector slots; its private material comes from actual bound primary reads.
+
+Add `qualifyFiniteSourcePackage({manifest})` in `lib/mcp-qa-finite-profile.mjs`: no caller pins/callbacks/true witnesses. It imports approved templates/receipt mappings and returns a frozen five-role map with publicStatic rule plus privateFull rule (required native validators, exact hash algorithms and permitted private slots). These are source-selected internal rules, never a public policy payload. Builder and GHA independently recompute public projections; native independently validates private policies/current grant/owner/program/window and their equality to actual metadata across awaits.
+
+Descriptor publicStatic is EXACT `{purpose:"afw.finite-public-static-profile.v1",configurationHash,profileHash,bindingsHash}`. Its hashes use dedicated domains `afw.finite-public-configuration.v1`, `afw.finite-profile.v1`, `afw.finite-public-bindings.v1` plus newline and strict sorted canonical projection. The configuration projection retains all supported configuration fields; bindings are name-sorted and contain typed private-slot markers only for the allowlist. Profile adds exact resource/entrypoint/exposure/schedule/tail expectations. Build expectations arise from committed templates, not the returned provider data being accepted.
+
+PRIVATE full fingerprints retain existing semantics: bundle.policy.plan.configurationHash remains actual `activationConfigurationHash(configuration)`; private deployments.canaryLive.configurationHash remains actual `restorationConfigurationHash(metadata)`. They are different algorithms and must never be equated. Store an additional PRIVATE `privateCanaryConfiguration:{purpose:"afw.finite-private-configuration.v1",versionId,activationHash,restorationHash,bindingsHash}` in finite material/control, with exact hashes as lowercase 64-hex and actual version UUID. bindingsHash uses `afw.finite-private-bindings.v1\n` plus canonical complete bindings (secret descriptors only). Cross-check activationHash to the real bundle and restorationHash to the existing private deployment pin. This is an explicit Task1 private-plan/INFO validator amendment, included before prepare/controlHash, never a rewrite of an existing intent. Native full values and raw configuration never cross to GHA; external projection remains an explicit whitelist of bounded opaque hashes/provenance.
+
+Task3 source helper/qaPublication must adopt typed publicStatic, not compare package hashes directly with full metadata hashes. QA publication records retain their existing actual full configurationHash and add the same-role publicStatic descriptor; compare each in its proper domain. Existing private/external deployment configurationHash fields stay FULL and source/canaryContainment bindingsHash fields stay explicitly public-static. Closed full fingerprints remain source-pinned `qaClosedConfigurationHash` or `restorationConfigurationHash`; they do not change domain. A QA projection without private slots may carry identical data but hash equality is never assumed across domains.
+
+Concrete grammar work: `lib/mcp-activation-observer.mjs` snapshot currently rejects version_metadata, required by AFW_FINITE_TRIAL_VERSION. Add a narrow actual-provider binding schema (name/type, plus only primary-documented actual fields if required), exact finite alias and source checks; reject unknown extras/accessors. Do not omit that real binding or forge an alias. All existing raw policy and full-hash gates remain.
+
+Audit: `lib/mcp-qa-finite-http.mjs` observer reads QA live only; restore's version loop selects QA closed, canaryClosed and operatorClosed, not canaryLive. Maintain that separation. Require fresh canaryClosed pointer before GHA reads closed metadata; closed candidates must have private policy slots absent. Actual live canary configuration remains in native Known/activation/cleanup paths. Tests must prove no GHA live-canary metadata request or private raw output; any discovered route that requires one blocks rather than expanding public transport.
+
+Module hashes remain external after actual compilation, never embedded into their own bytes. No full plan, future deployment/job IDs or private policy enters modules. Source/archive lineage, module-byte checks and semantic qualification are independent mandatory gates.
+
+## Explicit manifest provenance amendment
+
+Current per-role mandatory sourceRevision/tree falsely requires an unknown historical tuple. Replace each descriptor with EXACT keys `provenance,module,publicStatic` as defined above. Root manifest retains actual package sourceRevision=M/sourceTree and build lineage.
+
+Provenance is a strict discriminated union:
+1. `{kind:"compiled-source.v1",sourceRevision,sourceTree}`: REQUIRED for qaLive/canaryLive, both equal M/tree.
+2. `{kind:"historical-content-pin.v1",receiptPath,receiptBlobSha,receiptKey,versionId}`: only qaClosed/canaryClosed/operatorClosed. Fixed receiptPath=`lib/mcp-qa-cloud-closed-pins.mjs`, approved blob at this baseline 26213123304eea25e652a52d808d25b7e0e3475e; role maps EXACTLY to qaClosed/canary/operator keys. Version/name/bytes/module hash and actual CLOSED full configuration hash must equal that source-approved entry; publicStatic hashes are independently derived and distinctly typed. No caller-selected receipt or version.
+3. `{kind:"historical-source-pin.v1",receiptPath,receiptBlobSha,receiptKey,versionId,sourceRevision,sourceTree}`: currently eligible only for canaryClosed when the independently qualified frozen receipt `scripts/mcp-confirmation-frozen-artifact.json` and fixed canary pin both match. Source tuple must equal that exact committed receipt and primary Git commit/tree; no arbitrary historical SHA. Other roles cannot claim this variant without a reviewed source receipt.
+
+Historical content pins establish identity/provenance of approved content, NOT original Git build attestation. Root's single CF GET at 19:08:46 UTC rechecked C570 closed-rollback.mjs/395915B/hash4b557...; no embedded sourceRevision candidates or original source/tree were established. Do not assign M to these bytes.
+
+Use manifest purpose `afw.finite-native-package.v2` and hash domain `afw.finite-native-manifest.v2`; seed/envelope purpose and seed-hash domain advance to v2 for the incompatible strict grammar. Explicitly update codec, archive validator, Task2 resolver, source/seed/publication consumers and fixtures together. No production finite artifact/seed exists, so no stored migration or reinterpretation is allowed. Preserve intent/control algorithms and original clocks.
+
+Task2 resolver must still read root M commit/tree. For compiled-source, read/check each actual tuple equals M. For historical-source, independently check its receipt and original commit/tree. For content-pin, verify the exact receipt blob at M and fixed role mapping instead of fabricating a commit query. Replace operator.sourceRevision!=M with the stronger requirement that operator uses the approved literal historical pin. This is a typed replacement, not a blanket bypass.
+
+## Obtaining literal historical inputs safely
+
+No tracked file inspected contains deployed baseline module bytes. `worker/.../closed-rollback.mjs` is source, not C570's compiled 395915-byte object. Existing build workflows upload short-lived closed artifacts but no exact surviving artifact locator for all three historical modules is established here.
+
+First use an existing authorized exact artifact only if run/head/attempt, artifact ID/digest, source receipt and literal bytes are provable. Otherwise a SEPARATELY authorized protected, fixed READ-ONLY preservation operation is required before the package workflow. It uses existing qualified custody and only three source-fixed version GETs with modules for QA C570, canary 2607 and operator 855, plus necessary fixed metadata readback; no arbitrary URL, version or POST. Verify actual bytes/hash/name/config and full metadata. Unknown permissions or identity fails; do not add roles.
+
+Raw modules may embed private data. Identity hash is not privacy approval. Before any upload, inspect for permitted code/technical metadata; reject raw private plans/policies, consent/subject/customer data, callbacks and keys. Never print module bytes. If a literal contains prohibited material, do not sanitize it under the same hash or place it in a public-repository artifact: stop for an approved destination or separately qualified replacement/locator.
+
+Only after privacy/identity qualification may a separately approved manual protected `.github/workflows/afw-finite-historical-inputs.yml` preserve the inputs. It is NOT a push trigger and uses existing qualified custody without new secrets. A proposed source-reviewed `scripts/mcp-finite-historical-inputs.json` has EXACT keys purpose=`afw.finite-historical-inputs.v1`, sourceRevision, workflowPath, runId, attempt=1, artifactId, artifactName=`afw-finite-historical-inputs-<sourceRevision>`, artifactDigest=`sha256:<hex>`, receiptHash. IDs are positive safe integers; no URL. These identify the preservation run, NOT original module compilation. Main builder verifies exact primary workflow/head/attempt/completed-success/artifact relationship/digest and receipt hash, never latest selection. The input archive has EXACT seven members: receipt.json plus each historical role's actual-named module and metadata.json. Receipt fixes the same three roles to approved version/name/module-byte/configuration/metadata hashes and preservedAt; metadata is admitted only after privacy checks and full-pin matching. This preparation/registry is DESIGN ONLY and requires separate scope/approval; no artifact ID or authorized destination is fabricated. Missing/expired custody or input fails closed. No CF secrets enter push/PR builds.
+
+## Secret-free main package workflow and closure
+
+The dedicated workflow uses main push at exact M, contents/actions read only, no environment secrets, no provider calls. Verify git origin/commit/tree and every source input before/after; fetch only the qualified historical-input artifact through existing GitHub access. Missing/expired inputs fail, never auto-preserve/rebuild history.
+
+Compile actual finite QA/canary entrypoints with esbuild/metafiles, source constants and real constructors; preserve literal closed roles. Run affected native composition/profile/containment/rollback tests, scoped lint, and Wrangler no-bundle dry-run over the exact generated files. Assert actual exports, module sizes and byte identity before/after dry-run; no generated artifact invocation or provider mutation.
+
+Output EXACTLY manifest.json, qaLive/index.mjs, qaClosed/closed-rollback.mjs, canaryLive/index.mjs, canaryClosed/index.mjs, operatorClosed/index.mjs. Retain existing 3MiB/module, 24KiB manifest, 32KiB seed, archive 64MiB/expanded 128MiB bounds and exact-file traversal/symlink rejection. Artifact name `afw-finite-native-package-M`; preserve provider archive digest, source-qualified build-workflow hash and per-file SHA256/length. PR checks are qualification only; only one successful eligible main-push run/attempt 1 may serve Task2's existing resolver.
+
+Compatibility true fields are emitted only after actual checks, never treated as authority inputs. Fresh GHA seed qualification independently checks actual QA published versions through the reviewed qaPublication bridge; native canary/operator checks remain direct. Build success is neither publication, custody identity, consent, guard liveness nor readiness.
+
+Concrete remaining gates: implement/qualify the selected typed projections, actual metadata grammar, private control and native mounts; finalize exact profile presence/flag dispositions without admitting unspecified variables; preserve privacy-approved historical inputs through the separately authorized fixed read stage and exact locator; prove literal rollback compatibility. Until these are closed, no production package is claimed. operationalReadiness=false.
+
+## Root refinement and source audit
+
+Root selected the public-static/private-full split and accepted the version_metadata grammar gap and exact private-slot audit. They are explicit Task4C implementation amendments, not existing capabilities or authorization to run preservation/publication. No raw private configuration/plan travels through GHA; no predicates, historical full hash domains or original clocks are relaxed. The fresh builder must review these typed API/validator changes before code. No code, provider call or secret-value handling occurred for this design.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-01-finite-qa-code-provenance-bridge.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-01-finite-qa-code-provenance-bridge.md b/docs/superpowers/specs/2026-11-01-finite-qa-code-provenance-bridge.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-01-finite-qa-code-provenance-bridge.md
@@ -0,0 +1,79 @@
+# Finite QA code-provenance bridge — explicit seed amendment
+
+Status: DESIGN ONLY; root-selected source direction, not implemented or deployed.
+Baseline: `5c5813cd2e17c32024960f923f08b557d062cc5b`.
+This amends Task4B/Task3 seed qualification and Task4C composition in [finite material bootstrap correction](2026-11-01-finite-material-bootstrap-correction.md). No credential change, provider call, publication, trial, role expansion or Task5 launcher change is authorized.
+
+## Problem and trust boundary
+
+Native `createPrivateQaArmHttpAdapters` in `lib/mcp-qa-cloud-closed-http.mjs` selects only canary/operator module pins. It reads QA deployment pointers, namespaces and exposure, but never QA module bytes. Its `qaCodeProvenanceVerified:false` is intentional; `lib/mcp-qa-closed-observation-v2.mjs` preserves that distinction. Historical native success therefore does not qualify direct QA content access.
+
+Use the already source-qualified GHA `seed-material` step to validate actual QA live and selected compatible closed bytes/configuration against the finite package. Retain its bounded technical receipt in the existing immutable seed. Native qualification independently authenticates that step/source/artifact lineage, matches actual native version and fresh deployment pointer, and names the resulting evidence `qaPublicationBridgeVerified`. Keep direct `qaCodeProvenanceVerified:false`; no bare version equality, self-reported boolean or ETag-as-SHA shortcut.
+
+Root's dated administrative observation at 2026-11-01T18:46:23Z found candidate account token `9aa97ad1fc9afe3021cf69ea497d5190`, named “AFW closure reader temporal20261028”, active, not-before 2026-10-28T03:00:00Z, expiring 2026-11-03T02:59:00Z. Observed policy describes canary/operator ContentRead and account MetadataRead/ContainersRead, without QA ContentRead. This is CANDIDATE metadata only: no match to the actual native `AFW_MCP_CLOSURE_READ_TOKEN` secret was established. It proves neither effective endpoint denial nor native identity. GHA account token `9db7901af95faf07e6f7ef378045328e` has separate self-verification evidence and uses `AFW_QA_CLOSED_TOKEN`; it is not a native alias. No key copying or rotation is requested. Dated policy metadata plus fresh correct-kind self-verification and fixed successful operations remain the explicit trust assumption; full fresh policy equivalence is not claimed.
+
+## Fixed closed-target locator
+
+The existing immutable source locator is `QA_CLOUD_CLOSED_PINS.qaClosed` in `lib/mcp-qa-cloud-closed-pins.mjs`:
+
+- Worker `agent-friendly-web-independent-closure-qa`; version `c570b60b-95dc-48e1-89f3-9c4651691dbc`.
+- Actual main module `closed-rollback.mjs`, 395915 bytes, SHA256 `4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f`.
+- Configuration hash `a8c8895f8375f4d09f01960e88bec8c3cac0a89f999e500f74fccf01733f7838`, 31 bindings and 14 closed flags.
+
+This source constant selects the target; never newest/list-first, caller input or a failed-current fallback. It is historical provenance, not an assertion of present finite compatibility.
+
+`buildPrivateQaClosedContext` builds new candidate/rollback bytes but declares `remotePublished:false`; it supplies no deployed rollback-version locator. `compiledQaArtifactContext`, `buildPrivateQaNamedContext` and `scripts/mcp-confirmation-frozen-artifact.json` concern the historical CANARY artifact2607/315cc, not this QA baseline. Do not substitute them.
+
+`QA_CLOUD_CLOSED_PINS.qaClosed` contains NO original compiled sourceRevision/sourceTree. Version/name/bytes/hash/configuration pins do not establish that tuple; copying historical bytes into an archive built at M never relabels their provenance as M. The existing closed builder describes its own new output, and the named/frozen helpers concern the canary: none supplies the missing historical QA tuple. Task4C must recover qualified original provenance OR obtain review of a typed historical-content-pin manifest variant, or produce a newly qualified closed artifact with a separately approved locator, before finite package production. No source SHA/tree or future manifest fields are invented here; this does not block Task4B structural resolver work or amend its active schema beyond the agreed filename.
+
+Task4C must additionally prove that the selected QA target preserves actual classes, namespaces, custody and durable-history compatibility, with operative entrypoints closed. If C570 cannot satisfy that proof, stop before seeding; another target needs its own source-approved locator/publication evidence. No compatible replacement or qualifying archive is asserted here.
+
+**Necessary structural correction:** current `lib/mcp-qa-finite-seed.mjs` requires every module name and archive member to be `index.mjs`. Literal C570 reuse must retain its actual `closed-rollback.mjs` name. Root explicitly selects qaClosed.module.name=`closed-rollback.mjs` and the archive member `qaClosed/closed-rollback.mjs`; the other four roles remain `index.mjs`. Exactly one qaClosed member, six total archive files, no alternatives, aliases or duplicate names. Another target/name requires a separately reviewed source contract. Other roles keep `index.mjs`, existing caps/exports grammar and historical source identities. This explicit codec/archive amendment is not already implemented.
+
+## Exact public seed extension
+
+Add REQUIRED `qaPublication` to the current exact seed keyset. Keep existing purpose/domain/ref, canonicalization, seedHash algorithm and size/depth/node ceilings; seedHash now covers this additional field. The unmounted grammar changes deliberately: old seeds lacking it fail qualification, and existing refs are never rewritten or upgraded.
+
+`qaPublication` has EXACT keys:
+
+```text
+purpose: "afw.finite-qa-publication.v1"
+accountId: "85d0d5dadac3341a564f22ce885e9eec"
+workerName: "agent-friendly-web-independent-closure-qa"
+qaLive: {versionId, deploymentId, module,
+         configurationHash, profileHash, bindingsHash}
+qaClosed: {versionId, module,
+           configurationHash, profileHash, bindingsHash}
+observedAt: integer UTC milliseconds
+```
+
+Version/deployment IDs are canonical lowercase UUIDs; live/closed version IDs differ. Hashes are64 lowercase hex. Each `module` is the EXACT corresponding manifest module descriptor `{name,sha256,bytes,exports}`, including actual main-module basename, bounded byte count and sorted unique exports. The three role hashes must equal their same-role manifest values. Role-specific source/tree provenance remains in the already bound manifest; no duplicate source selector is added. Closed version equals the fixed source-approved locator, not an arbitrary version sharing a hash. No closed deployment ID is invented: it is an immutable target, not necessarily active.
+
+`observedAt` is the parsed Date of the final fresh primary QA live-deployment response. BEFORE issuance, the issuer verifies the actual primary seed step's started_at, requires started_at<=observedAt, checks the unadjusted current clock/CF Date (maximum5000ms skew), original T0<=observedAt<N1 and the unchanged admission margin. completed_at does not yet exist: it is neither required nor estimated at this phase. Only LATER native public-primary qualification requires that exact step completed successfully and started_at<=observedAt<=completed_at. Until those later checks pass, qaPublicationBridgeVerified remains false/unavailable. Failure blocks without compensation or a fabricated final timestamp. The stored observation stays historical and is never refreshed on readback.
+
+The field contains no private plan/control hashes, selectors, grant, consent, callback, credential, raw policy or customer data. It is evidence bound to qualified source execution, not standalone authority.
+
+## Actual issuer and native readback
+
+Within the existing once-launched GHA seed process, after exact finite archive qualification and custody verification:
+
+1. GET the fixed QA deployments endpoint; require exactly one100% active version/deployment. This is only the live candidate selector. Fetch `/accounts/<fixed>/workers/workers/<fixed-QA>/versions/<live>?include=modules` and the same endpoint for the source-fixed closed target.
+2. Decode and hash actual module bytes; compare names, hashes, sizes, exports, exact role configuration/profile/binding semantics and all compatibility evidence with the qualified finite manifest. Secret bindings are names/types only. Never derive expected hashes from the very response being accepted. Neither successful HTTP nor a digest-shaped ETag establishes bytes.
+3. Re-read the fixed live deployment pointer after qualification; require unchanged exact IDs/100%. Bind its primary Date as observedAt. Before mutation, verify the exact currently running seed step's primary started_at, issuer clock/CF Date, original T0/N1 and admission margin as specified above. Do not require or synthesize this still-running step's completed_at.
+4. Consume the existing original-process seed capability before the first POST. Follow the existing one annotated-tag/one atomic-ref sequence. Ref201 ACK plus independent exact ref/tag/content readback is mandatory before seed-material succeeds. Existing/conflicting refs, lost ACK, late work or reconstruction permit GET-only reconciliation; never replace/refund/reissue.
+
+These GETs use existing custody, fixed origins/paths, bounded bodies, no redirects/retries, child5s limits and the original seed admission window including180000ms remaining margin. Queue/qualification/readback consume original T0-derived ends. No new lifetime begins at publication.
+
+Native hydration is the LATER qualification phase: it uses the existing exact seed ref/tag, original comment/main/run/attempt/job/source/build-artifact lineage and the primary completed-success seed-material step, then independently checks started_at<=observedAt<=completed_at. An in-progress step, even with a visible exact seed, leaves qaPublicationBridgeVerified false/unavailable. The reviewed workflow must actually enforce the preceding checks; a tag containing matching hashes is insufficient. Within the existing5s hydration lease, native reads fresh QA deployment metadata and requires seed.qaLive version/deployment100%, actual `AFW_QA_VERSION.id`, fixed actor/binding/profile coherence and source identity to agree before and after awaited primary qualification. Immutable seed identity may be cached; readiness and deployment observations cannot. Any changed pointer/version/source/receipt blocks. Native direct canary/operator byte qualification remains required. After restoration, phase-specific existing checks select qaClosed; this amendment grants no extra deployment effect.
+
+Maintain the existing native request/body budgets; adding the bridge does not authorize expanding them silently. If the concrete hydration cannot complete within them, fail unavailable and return the exact budget conflict for review.
+
+## Acceptance and remaining gate
+
+Required negatives: missing/extra qaPublication fields; foreign account/Worker; wrong live pointer or closed locator; module/profile/bindings mismatch; wrong actual basename; edited/ref-conflicting seed; successful step without qualified source/archive; stale/late timestamps; changed native version or pointer across awaits; lost tag/ref ACK/restart; C570 incompatible classes/history. Positive fixtures must exercise actual GHA-byte verification and native metadata bridge while direct QA-code verification staysfalse. No fixture proves current custody or deployed compatibility.
+
+Concrete remaining gates: C570's original compiled sourceRevision/sourceTree are not established by its immutable locator/hash, and its compatibility with the actual finite candidate's classes/namespaces/history is unproven. Resolve the provenance/package choice described above and independently qualify target compatibility before producing the finite package. All runtime promotion, actual occurrence, guard liveness and PC-off acceptance remain separate. operationalReadiness=false.
+
+## Builder review and root ruling — 2026-11-01
+
+The fresh bridge builder identified one blocking timestamp cycle: the issuer cannot validate completion of its own seed-material step before issuing the seed. Root accepted the two-phase rule above: issuer checks actual primary START and original clocks/margin before POST; later native qualification requires primary completed/success and the inclusive observation interval. No completion estimate or fake final timestamp. The separate historical QA source-tuple and compatibility/package gates are explicit; no historical byte relabeling or active Task4B schema expansion is authorized by this documentation correction. No other builder blocking question was reported in this pass.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-02-finite-initial-cleanup-owner.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-02-finite-initial-cleanup-owner.md b/docs/superpowers/specs/2026-11-02-finite-initial-cleanup-owner.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-02-finite-initial-cleanup-owner.md
@@ -0,0 +1,61 @@
+# B2b: mounted initial closed-UI cleanup ownership
+
+Root design decision, 2November2026. Same AFW source branch and existing resources. User delegated ordinary design/implementation choices and opted out of question cycles. SOURCE ONLY; no live initial command until full composition. This extends actual initial winner ownership, not another unmounted success adapter.
+
+## Goal and approach
+
+After B2a's actual inactive ACK/exact readback, the SAME surviving B1 invocation durably arms a cleanup owner using the existing fixed actor's native DO alarm, before any future activation is permitted. Its independent alarm handles only that exact closed_ui candidate and fixed historical baseline. It does not create a Workflow, service, namespace, credential, grant, Container or new source authority.
+
+Alternatives: a new operation in existing AFW_QA_BOOTSTRAP adds child CREATE SEND/ACK/unknown/inventory machinery without improving this initial-only owner; ownerSource-first remains unavailable without cleanup; activation+allownerstages+cleanup together is too large a fault boundary. Select DO alarm in actual compiled finite subclass, preserve ordinary index.mjs.
+
+## Existing contracts and fixed scope
+
+Actual continuation: lib/mcp-qa-finite-initial-entry.mjs after private publishInitialClosedVersion. Refactor that PRIVATE function to return its own private actual preserved backup/ACK/verified receipt/config data, then call one private armInitialCleanup in the SAME winning invocation. No export/registry/caller-provided success DTO; safe material_recorded RPC remains unchanged and all authority/full/readiness flags false. Existing/unknown Entry/SEND or reconstructed records cannot arm or activate.
+
+Actual mount: worker/independent-closure/finite.mjs IndependentClosure extends ordinary closed class. Override alarm() only here, using a new lib/mcp-qa-finite-initial-cleanup.mjs fixed ctx/env handler. If no initial owner exists, delegate super.alarm(). If an initial owner and nominal HEAD/alarm conflict, fail closed/admin_pending; never silently run both or overwrite/delete the other alarm. Ordinary index.mjs and nominal guard semantics/keys stay unchanged.
+
+Fixed account85d0d5dadac3341a564f22ce885e9eec; actor afw-own-successor-closure-v1; QA namespace070c4a7708eb4592a3ded7c117a88225/current source-selected QA version. Only possible mutation is one canary deployment POST selecting exact baseline2607abae-cec3-4e35-89eb-8b8572262b54 at100%, baseline deployment7b5a3683-eb21-4f6c-95d4-639570595362. Operator855 and physicalD1/Container identities unchanged. Existing reader9aa97ad1fc9afe3021cf69ea497d5190/publisher05718105dcdfc92e55cc3624172c2740 in fixed native QA secrets; never alias GHA9db. No current remote operation by this source task.
+
+## Clock decision
+
+Keep technical setup eligibility I0+300000ms and original B1 base min(nativecreatedAt+30000,source ceiling,custody); children≤5000ms. Arming must finish under that unchanged parent. No stored plan renews setup/activation/owner permission.
+
+Root selects precommitted CLEANUP-ONLY C0=I0+900000ms and C1=C0+180000ms, with at most three recovery deliveries at C0,C0+60000,C0+120000, each≤30000ms and clipped to ORIGINAL C1/custody/source ceiling. This is independent cleanup authority outliving the current closed UI's five-minute expiry; it does not extend that UI or any grant. Captured credential expiry and fixed source ceiling must cover C1 BEFORE arming; otherwise no positive arm. Ceiling remains3Nov2026 02:59UTC, no renewal. A late recovery can run only inside original C1 and its original remaining slots; no new C0/C1 or indefinite alarm.
+
+A future unit must DELIBERATELY reconcile owner window (same original I0, ≤15minutes), current wire OAuth expiry at I0+5minutes, and cleanup handoff before any owner stage enables grants/notices/nominal work. This unit does not change that expiry or mount ownerSource. Existing OwnerPreparation commandBy+510s floor is a real later integration constraint, not satisfied by this unit.
+
+## Actual durable arm
+
+Predictable native prerequisites must fail before Entry: captured storage.getAlarm and required standard methods; do not consume Entry merely because a known missing method is discovered later. tx.setAlarm is checked inside its actual native transaction.
+
+Require exact surviving entry/material/source/QA/candidate, actual producer assertion, private verified upload receipt, preserved baseline manifest/chunks, unchanged actual holders/loaded custody. Require no existing native alarm, no nominal HEAD, no initial owner/claim; do not erase or relabel legacy history. Persist distinct immutable bounded plan and pending state plus setAlarm(C0) inside ONE native transaction. Only its final successful return admits new ownership; no outer inserted flag. Await captured actual storage.sync, exact plan/state readbacks and getAlarm()==C0 before recording/returning a private arm ACK. Recheck no nominal conflict and original parent/source/custody. Unknown commit/sync/alarm ACK remains pending and never permits activation; a partially armed cleanup may still run independently. Never retry arming from saved DATA.
+
+Plan binds entry/material/sourceRevision/tree/QA version/initialinstance/I0, exact uploaded candidate UUID/M bytes+hash/config hash, backup manifest/hash and baseline tuple, token IDs/expiry facts, cleanup-only original C0/C1. No raw script/secret/capability in plan or RPC; use existing bounded private backup chunks to recover exact baseline. New records strict own-data/no accessors/prototypes/unknown fields, ≤64KiB each; distinct keys and domain hashes.
+
+## Native alarm ownership and restoration boundary
+
+Export only the fixed alarm handler needed by finite.mjs, with actual ctx/env, no supplied clock/URL/token/pins/callback facts. It re-derives compiled source/actor/current QA metadata, captures/rechecks actual storage/env/fetch/credential holders, verifies loaded token IDs/status/original expiry through fixed endpoints, checks source ceiling and original plan time. Independent invocation clock is cleanup-only, not a renewed forward lease. Retain actual native/storage/fetch/body promises before racing them; abort/timer/disposal is not settlement.
+
+Persist next bounded delivery/exhausted state BEFORE effects, never reset delivery count after restart. Default no initial plan returns null for delegation. Corrupt/pending/conflicting ownership returns bounded admin_pending; no arbitrary fallback to a different guard. Keep every old unknown outcome.
+
+Use existing fixed all-AFW Workflow inventory helper with exact definitions/complete pagination and zero active instances for this alarm path; no whole-definition self exception. The alarm is not a Workflow. Verify own Container active inventory empty, canary/operator cron/tails empty, operator exact closed baseline, actual native read endpoints. These checks are factual, not universal drain. Preserve historical dispatch uncertainty; dated primary/source analysis in reports/2026-11-02-finite-historical-writer-qualification.es.md rules out the particular30Octguard restorePOST, not all writers. Current relevant writer/activation source checks remain mandatory.
+
+Initial activation journal contract is owned by this initial family, in distinct immutable SEND/ACK/completion keys, NEVER the later connection/policy or nominal journals. This unit DEFINES and validates the recovery inputs but DOES NOT write a forward deployment SEND or implement activation. Future writer must bind the same plan/entry/material/candidate/body/annotation/original deadline and write completion only after its actual single request has settled and exact current readback is acknowledged. No caller success object or synthetic production writer.
+
+- No activation SEND and exact fixed baseline still selected: record dated never_activated/closed observation only after original forward deadline and complete relevant inventory checks. This does not settle an issued unknown action.
+- Existing SEND without definite settled actual ACK/completion, pending underlying forward work, missing or contradictory state: admin_pending/reconcile reads only, never fabricate completion or resend activation/restore. A later baseline snapshot alone cannot settle a possibly late initial activation POST.
+- Exact own activation ACK/completion and primary pointer to THAT candidate UUID/deployment/annotation, with exact closed_ui config/M/allflagsfalse and no grants/notices/nominal handoff: eligible only for the precommitted fixed baseline restore after all gates. Foreign deployment or changed profile stops; no blind override/adoption.
+
+Qualify actual baseline bytes/config against preserved backup, exact immutable pin and current deployable-version eligibility (GET by UUID alone is insufficient for last100 eligibility). No latest/dynamic baseline. Preserve exact secret descriptors/resource identities; no write of secret values or re-upload of baseline required.
+
+Durable restore SEND once → actual sync/readback/current checks → one fixed POST /workers/scripts/agent-friendly-web-delegated-canary/deployments with baseline100% and deterministic annotation. Store actual server ACK UUID, exact primary post-readback, final receipt and sync. Any issued unknown restore is reconcile-only on later deliveries; no second POST, no deletion or overwrite of foreign pointer. Same original C1, parent≤30s/children≤5s. No transport helper may start a fresh45s clock. All outputs bounded/factual, operationalReadiness=false.
+
+No business/grant/Container cleanup is claimed. Future enabling must first establish qualified handoff/extension to a cleanup owner that covers those effects; owner-source and stage writers remain unavailable. QA restoration remains the separately qualified external finalizer's responsibility; publisher057 may not edit QA. Do not claim autonomous total closure from this initial canary owner.
+
+## Source qualification
+
+Actual Worker→DO/native SQLite/D1 entry/A/upload/arm; persisted setAlarm/getAlarm ownership across native reconstruction; actual finite alarm override and nominal delegation/collision; strict records and exact serialized outbound restoration through native fixture. External provider/custody/source approval remain explicit SYN. If platform harness cannot cause genuine native alarm delivery within a bounded test, explicitly name manual fixture invocation/SYN event delivery rather than claiming a live native alarm.
+
+Meaningful RED before implementation for actual missing arm/alarm behavior. Cover final-transaction retry/unknown return, held/rejected sync, lost getAlarm ACK, parent expiry, source/token/holder drift, preexisting alarm/HEAD, restart/deliveries, late pending activation/restore, no SEND versus orphan/foreign pointer, exact candidate/allfalse/backup/last100 mismatch, no literal secret/resource change, and same RPC privacy. Existing B1/B2a/historical/profile/nominal-guard relevant tests preserved. One exact final compiler/residency build for changed graph, canary≤2MiB/QA≤3MiB; no issuer/compiler/fs/esbuild in runtime graphs. HostedNode22/lock only, temporary qualifier no secrets/artifacts/deploy and excluded from integration.
+
+Report exact revisions/tree/run/job/attempt/commands/results/actual-vs-SYN/limits/CAS/ref/all file readbacks, then STOP for fresh spec+quality review. No main/provider/livecommand/WorkflowCREATE/upload/deploy/grant/OAuth/role/token/cron/Max/mail/chat/automation action. No local source/dependencies/builds/temp/processes. operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-02-finite-initial-inactive-upload.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-02-finite-initial-inactive-upload.md b/docs/superpowers/specs/2026-11-02-finite-initial-inactive-upload.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-02-finite-initial-inactive-upload.md
@@ -0,0 +1,66 @@
+# C2-B2a: initial inactive version upload — approved source contract
+
+Approved by Root after read-only supported-source preflight and explicit upload-only narrowing. BASE must be the task's actual dispatch head on feat/finite-native-cleanup-20261101. SOURCE ONLY: no live initial command, Workflow CREATE, upload, activation, owner consent, credentials or remote resource action during implementation.
+
+## Outcome and exact scope
+
+Implement ONE real owning upload path, not another factual reader or unavailable success seam. The only HTTP mutation is creation of one immutable INACTIVE canary version through JSON POST with deploy=false. No activation/deployment, rollback, ownerSource or enabling capsule in this unit. No actual initial intent may run until later full composition is ready: it would consume B1 Entry for a partial result.
+
+Keep B1 constructor and fixed Workflow/actor entry. A private NONEXPORTED function in lib/mcp-qa-finite-initial-entry.mjs, e.g. publishInitialClosedVersion(ctx,env,entry,producer,result,parent), has exactly one production caller AFTER actual A.collect/assertCurrent/post-A sync/assertCurrent (current111–114). producer/result/parent are the actual surviving instances, never RPC/records/cached output. No registration API, arbitrary callback, ready boolean, caller source/credential/clock/target or fact DTO. Stored Entry/A/upload receipt cannot resume permission. Future activation must compose before return inside that same winning invocation.
+
+Safe RPC result remains existing exact material_recorded envelope with false authority/fullpackage/readiness flags. No bytes, raw config, keys, capabilities, upload receipt or new enabling status crosses RPC. Internal receipt is factual only.
+
+## Fixed resources and identities
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web. Fixed Cloudflare account85d0d5dadac3341a564f22ce885e9eec. Only worker agent-friendly-web-delegated-canary (id7d96bc137a854faa875ee0f160119810). Allowed current baseline:
+version2607abae-cec3-4e35-89eb-8b8572262b54; deployment7b5a3683-eb21-4f6c-95d4-639570595362; historical module1830202B/SHA315cc3b310767bafe6c7928822b5acb8ec5ad168e21d94a55e6fea26592e46d3; source2a4773737764c5038aaa0b3528b43df2a0572441/tree637af253296ac1c771cb73ea353cb960a2e59204; normalized config4fc9703cc8de929f766aa6aac3429d06c806ba2663ce63ec33a5754a030853c0.
+
+CurrentBaseline and rollbackHistorical are distinct roles even when the checked immutable UUID is the same. Any current mismatch stops before SEND; never dynamically adopt a foreign pointer. Historical315 is not candidateM. CandidateM bytes ONLY from actual B1/A/residency, verified current by producer and compiled context, copied defensively.
+
+Native reader9aa97ad1fc9afe3021cf69ea497d5190 and publisher05718105dcdfc92e55cc3624172c2740 use the EXISTING fixed QA bindings identified in actual source (closure read/publish tokens), no alias to GHA9db. Verify loaded credentials with actual fixed token verify endpoint/id/status/notbefore/expiry, capture/recheck env and transport holders. No values in RPC/logs/records/artifacts. Ceiling remains3Nov2026 02:59UTC; no automatic renewal or widened scope. Missing/noncallable/static prerequisites detectable before Entry must fail before it, including publisher binding presence; live checks repeat under the original lease.
+
+## Original lifetime and retention
+
+Original native base min(createdAt+30000,fixedceiling); actor narrows I0+300000 and actual custody expiry. Every child≤5000ms clipped to SAME original parent. Reuse actual B1 parent/lease and wall/monotonic/abort checks; do not mount old helper's independent45s clock or credential callback. Timers, aborts and RPC disposal do not prove remote settlement.
+
+Retain each actual underlying transaction/sync/get/fetch/body promise BEFORE a race, with sticky unknown outcome. No late forward effect, new identity or continuation after expiry. Future independent cleanup authority must be fixed before effects; this unit creates none and performs no rollback/delete cleanup.
+
+## Preparation, preservation and wire
+
+Direct fixed readers, no callback-supplied facts. Recheck actual M/QA/source holders and producer result. Read current baseline pointer plus exact baseline module/raw config; verify immutable tuple and recoverability. Raw config preservation is SANITIZED: secret descriptors/names only, never values. Reject unexpected secret values/unknown dangerous fields before persistence. Preserve private baseline bytes in bounded deterministic chunks with hashes/manifest, native transaction/sync/readbacks; codec/manifests≤64KiB each and DO values within native limits. No script/body blobs in A material, RPC, logs or artifacts; do not overwrite A selector/ACK/once or legacy keys. Keep all old uncertainty and firstfiniteHEAD unchanged.
+
+Build exact closed_ui using existing profile grammar and A retained preconnection/trial/activation/withdraw/save IDs, Access/limiter/client/project and original absolute expiry. No fresh IDs/window from Date.now. All enabled flags false and private policies empty. Modules are exact candidateM, not historicalbytes or QA module.
+
+One fixed POST path /accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false. JSON modules.content_base64, no legacy multipart. Secret write descriptors ONLY {name,type:'inherit',version_id:'2607abae-cec3-4e35-89eb-8b8572262b54'}, never latest/literal secrets. Exact request bytes/body fingerprint fixed before SEND and rechecked immediately before dispatch; no redirects/generic outbound proxy. Successful API semantics plus exact requested inherit and returned names/types do NOT reveal/verify secret value equality.
+
+Payload denylist/allowlist is fail-closed: no migrations/tombstones/transfers/renames/new classes/assets/enabled cache/extra declarative fields. Preserve exports default/AfwNodeControl/AfwOwnEventNode; latter sqlite and SAME Container/namespace d6fc71552de7494a863aca20365a572d. Existing wire containers ONLY [{class_name:'AfwOwnEventNode'}], no image/application creation/rollout. Physical binding IDs preserved. Existing profile's new AFW_FINITE_TRIAL_CONTROL may reference ONLY existing QA namespace070c4a7708eb4592a3ded7c117a88225, and AFW_FINITE_TRIAL_VERSION is version metadata; neither creates a namespace. Verify actual names/normalized identity, not just reconciliation label updated. Preserve other resources/projects untouched.
+
+## Durable SEND, ACK and receipt
+
+Use distinct initial upload domains/keys, not fabricated connection/policy admission. Bind entryHash/materialHash/M/tree/QA/initialInstanceId/effect upload and fixed requestHash/account/worker/path/body/baseline. No HTTP in retriable transaction callback. Final successful transaction return alone determines new SEND admission; no outer inserted flag. Existing SEND always reconcile/pending, never another POST.
+
+Persist SEND ONCE, await actual captured storage.sync, exact readback and current producer/holders/deadline BEFORE HTTP. Unknown write/sync/HTTP/ACK remains sticky and cannot resend. B1's pre-effect nevercommitted Entry contender rule does NOT authorize retry of this effect SEND.
+
+Accept uploadedVersionId ONLY from actual successful API ACK, canonical new UUID; never prediction/list-latest/matching annotation equivalence. Persist ACK/sync/readback then GET THAT UUID with modules; exact M bytes/config/profile/resources/inherit semantics and baseline observation verified before factual receipt. Receipt immutable≤64KiB, no script/secret/capability. Any error/late result/mismatch returns existing admin_pending safe envelope; no subsequent effect or activation. Version may remain orphaned/unknown; no improvised deletion.
+
+## Scope of old writers and future activation
+
+Root narrows all-writer requirements to this resource effect. Upload deploy=false creates a fresh version; legacy deployment restore selects an existing old version and cannot activate/delete this new UUID. Do NOT require activation's all-writer-drain/Workflow list/status proof merely to create inactive version. Old SEND uncertainty remains history, never declared settled. Before/after pointer checks are dated observations, not proof no later foreign change. On drift stop receipt/progression; preserve orphan/uncertainty.
+
+Future activation MUST independently qualify SAME-TARGET publication writers/SENDs/custody, global inventory with exact own-instance exception, actual9aa endpoint capability, rollback authority/recoverable deploy eligibility and ownerSource/capsule. Stored upload data cannot grant it. Shared old Container reuse remains a separate gate. No universal physical-drain claim from terminal/snapshot/hash/absence.
+
+Version creation DOES update latest and the last100 deployable-version window. Every consumer here uses explicit UUID; do not promise future baseline eligibility. No pruning or other catalog maintenance.
+
+## Required TDD and validation
+
+Meaningful RED→GREEN using actual finite class/Worker→DO/SQLite+D1/A/residency and actual outgoing request serialization; CF/GH/custody/approval boundaries explicitly SYN. Cover:
+- pre-Entry absent/invalid/static holders; actual winner only; replay/restart/cachedstep zero secondPOST;
+- SEND committed lostACK, uncommitted/held/rejected sync, pending real promises and original parent partial/exhausted; no late effects/reconstructed authority;
+- exact JSON deployfalse/Mbase64/baseline inherit, no historicalbytes/QAbytes/literalsecret/predictedUUID/latest/newresource/cache/migration acceptance;
+- deterministic bounded backup chunks reconstruct exact baseline; changed chunk/config or getter/prototype/unknown record rejected; no leaked bytes;
+- loaded reader/publisher wrongid/status/expiry/holderdrift deny; current baseline mismatch zeroPOST; wrong uploaded readback or pointerdrift no nextstage;
+- late/foreign deployment does not become a universal inactive-upload prerequisite or erase oldunknown, but no activation/rollback/ownerSource anywhere;
+- old B1 native regression behavior preserved after intentional prepare-path integration; codec/privacy/profile/pure wire regressions as relevant.
+One final actual compiler/profile/residency at stable source, canary2MiB/QA3MiB caps, no issuer/compiler/fs/esbuild in runtime graphs. Existing lock/Node22/GitHub-hosted only; temporary path/branch-scoped contents:read qualifier, no secrets/artifacts/deploy/docs-only trigger, excludedintegration. No local clones/deps/builds/temp/processes.
+
+Report exact BASE/code/docHEAD/tree/run/job/attempt/commands/counts/noise/actual-vs-SYN/bytes/CAS/ref/all changedfile readbacks and owning limits. STOP for fresh independent review. operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-02-finite-initial-material.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-02-finite-initial-material.md b/docs/superpowers/specs/2026-11-02-finite-initial-material.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-02-finite-initial-material.md
@@ -0,0 +1,97 @@
+# C2-A initial material — exact contract PROPOSAL
+
+BEFORE PRODUCT. Root selected bounded material A, but has not yet accepted this exact interface/record contract. BASE6038db5ffbdcaa3e3512f31e355e96dd20f52beb. Full preflight/refinements/Root scope: [report](../reports/2026-11-02-finite-initial-preparation-source-preflight.md). No product/test implementation in this documentation commit.
+
+## Boundary and entry
+
+A is an UNMOUNTED private factual constructor, not the initializer/publisher/UI/source-authority. Existing actor storage only. No new Worker/DO/Workflow binding/export/publicRPC/HTTP route/operation. Later B owns actual original native Workflow/issuer/effect admission, initial closed_ui publisher/journals/owner-source/allwriters. General unavailable seams stay unchanged; stored data never recreates authority.
+
+Proposed lib/mcp-qa-finite-initial-material.mjs:
+createPrivateQaFiniteInitialMaterial({ctx,env}) -> frozen {collect(refs,originalLease), assertCurrent(result,originalLease)}.
+Exact constructor2keys; collect exactly2args, refs exactly {commandId} positive safeinteger. No callerM/QA/project/subject/goal/pins/URL/token/clock/provider/fact callback. M/tree from actual B1/C1 independent compiled constants; QAUUID from actual env.AFW_QA_VERSION.id. Constructor captures actual ctx.id/storage and methods, AFW_INDEPENDENT_CLOSURE/idFromName fixedactor afw-own-successor-closure-v1, RELEASE_DB/withSession, AFW_RELEASE_EVENTS_NODE, AFW_QA_VERSION object/id, fixed fetch/readtoken holder. Recheck after awaits. These are local coherence facts, NOT platform source/caller identity.
+
+Result is DATA, brand minted only after this collector's actual ACK/readback and retained in the constructor's private result map tied to exact ctx/env/storage/originalLease. assertCurrent checks original lease, capturedholders, material/hash and exact candidatebytes; neither creates nor approves an effect. JSON/structuredClone/anotherconstructor/anotherlease/afterexpiry cannot recover the brand. No exported registration/setter/globalenv. Brand asserts this invocation's factual composition only, sourceIdentityVerified/scopeVerified/authorizesEffects stayfalse.
+
+Proposed result exact {purpose:"afw.finite-initial-material-result.v1",material,originalContext,candidateBytes,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,completePackage:false,operationalReadiness:false}. material is script-free immutable record; originalContext rehydrates only B1script in-memory, candidateBytes defensive actualB1copy. Neverreturn this overRPC/HTTP/log/artifact. TestDO returns only sanitized resultmetadata.
+
+Failure sanitizes to {status:"admin_pending",mayRetry:false,operationalReadiness:false}, no private error/provider/SQL text. Repeatcollect never rebuilds/replaces existingonce; readonlyreconciliation cannot issue new IDs/ACK or brand. LaterB independently reads/qualifies retainedmaterial asDATA; A does not implement that mounting.
+
+## Original command and clock, no owner window
+
+Fixed proposed future command /afw-qa-finite-prepare v1 <M> <canonicalQAUUID>, actual owner290715446/login tokenizartinfo-ops/typeUser/associationOWNER, repository tokenizartinfo-ops/agent-friendly-web, issue497. GH only exact /issues/comments/<commandId>. Exactbody; actual canonical ISO created_at/updated_at; require updated_at===created_at; issue_url fixed; no event/queuedAt fabrication. Before/after compare exact normalized evidence {commandId,body,createdAt,updatedAt,ownerId,repository,issueNumber}; repositoryId1347578006 remains sourcefixed and C1 checks actual repo. commandHash=H("afw.finite-initial-command.v1",evidence). Do not persist raw HTTPheaders/body beyond this public exactcommand projection. Actual initialcreate/command unauthorized inA sourcework.
+
+I0=actualcommentcreated_at; initialDeadline=I0+300000 includingwholequeue. A receives original {signal,assertCurrent}, owns no renewedparent; total<=30s wall/mono/abort from collectorentry clipped originalparent/initialDeadline/currentcustody. Every child<=5s clippedsameparent; retain actualunderlying promises before races. C1/B2 each receive original narrowedlease, not an outer5s race for their whole multiread collection. NoWorkflow eventtimestamp in A; futureB adds actualeventcorrelation, no inventedqueuedAt. C1P0/Pend separate. Owner15min/read10min/T0 windows NOT created in A; no window field in records. LaterB anchors applicablewindow to actualoriginalcommand, never newstage/reread.
+
+A GH budget exactly C1<=11 plus2originalcommandGET =<=13. CF existingC1 3 plus existingB2 3 =6, no publication/currentcanary claims. Additionalnative2B2legacytx/2B2D1queries plus2freshownedprojectqueries and newstorageclaim/material/ACKreadbacks. GitHub60/IP/hour/sharedquota andlatency remainavailabilitygates; failwithoutretry/key/proxy. C1no-cache unchanged. No10ownersessionbudget orHTTPsession implementation. Hypothetical53fullflow remainsUNQUALIFIED.
+
+## Exact codecs and domains
+
+Proposed lib/mcp-qa-finite-initial-material-records.mjs exports validate/encode/decode/hashFiniteInitialMaterialRecord(kind,value), fixed kinds InitialClaim, InitialMaterial, InitialSelector, InitialAck; no arbitrary domain/key. Own enumerable plain data, recursively sortedkeys, arrayorder preserved; reject getters/prototypes/symbols/extra keys, invalidIDs/times, cycles/depth>24/nodes>16384. Whole encodedrecord<=65536UTF8; InitialClaim<=8192, Selector/Ack<=2048. C(v)=canonicaldataJSON; H(d,v)=SHA256(UTF8(d+"\n"+C(v))). Hash excludes only a kind's selfhash. All dates safe nonnegative integer epochms; M/tree40hex; hashes/preconnection/trial/activation64hex; withdrawal/save canonicalUUID.
+
+Intent exact {purpose:"afw.finite-initial-intent.v1",repository,commandId,sourceRevision,sourceTree,qaVersionId,initialInstanceId,I0,initialDeadline,goal}. fixedrepo, M/tree/C1/B1match, QAUUID actual; goalcontent, initialDeadline I0+300000. FuturefixedinstanceID=afw-finite-initial-+H("afw.finite-initial-instance.v1",{operation:"finite_initial_preparation",commandId,sourceRevision,qaVersionId}). Computation pure, NOmount/invocation. intentHash=H("afw.finite-initial-intent.v1",intent).
+
+IDs exact {preconnectionId,trialId,activationKey,withdrawalRequestId,saveIdempotencyKey}; crypto32bytes first3, randomUUID last2, allocatedoncefororiginalclaim andretainedbeforematerialassembly. Originalactor once global; neverkeybyM/QA.
+
+InitialClaim exact {purpose:"afw.finite-initial-claim.v1",intent,commandHash,ids,claimedAt,deadline,claimHash}; deadline<=min(collectororiginal30send,initialDeadline,custodyceiling), claimedAt>=I0 and<deadline; selfhashdomainpurpose.
+
+InitialMaterial exact {purpose:"afw.finite-initial-material.v1",intent,claimHash,preconnectionId,qaBootstrap,historicalEvidence,ownerSelection,originalContext,observedAt,materialHash}. qaBootstrap exactvalidatedC1result DATA including record,recordHash,tagSha,primaryEvidence,currentPointer,observedAt/trustfalseflags; checkindependentM/tree/QA andC1records. No new cache authority. originalContext script-free projection below. preconnectionId=claimids, allnewintentions matchclaim. materialselfhashdomainpurpose.
+
+InitialSelector exact {purpose:"afw.finite-initial-selector.v1",intentHash,claimHash,materialHash,sourceRevision,qaVersionId,preconnectionId}; allmatchstoredclaim/material.
+InitialAck exact {purpose:"afw.finite-initial-material-ack.v1",intentHash,claimHash,materialHash,selectorHash,acknowledgedAt}; selectorHash=H(selectorpurpose,selector). Actualtimestamp sampled AFTER original material+selector transactionACK, neverreconstructed fromexisting/unknownoutcome; <originaldeadline.
+
+## Storage and once semantics
+
+Proposed lib/mcp-qa-finite-initial-material-store.mjs fixed keys in existingctx.storage only:
+- afw.finite-initial-preparation.v1:once -> InitialClaim
+- afw.finite-initial-preparation.v1:material:<materialHash> -> InitialMaterial
+- afw.finite-initial-preparation.v1:selector -> InitialSelector
+- afw.finite-initial-preparation.v1:ack -> InitialAck
+
+No DDL/newnamespace/resource/list/scan/historyrewrite/deletion. Preserve exact5B2historicalkeys/allD1history and firstfinitehead. Collectorreads exact afw.qa-finite-trial.v1:head and requiresabsent beforeclaim andbeforepublicationofmaterial; neverwritesit.
+
+Flow: fixedcurrentholders+B1compiledidentity+originalcommandbefore; claimtransaction checksglobalonce/selector/ackabsent andfiniteHEADabsent, allocatesIDs in invocation memo (reuse if transactioncallback internallyreentered), appendsclaim; actualACK then independentexactclaimreadback; thenactualC1/B2+freshownedrow/materialderivation+secondfreshownedrow+commandafter; holder/lease checks; atomicwrite-once material+selector withclaimmatch/absentexisting; actualACK; separatelyappendInitialAck with sampledACKtime; exactreadbackofallfourrecords; onlythenprivatefactualresultbrand.
+
+No effectSEND inA: only storageattempt/ACK observations. Ifoncealreadyexists, failadmin_pending beforeC1/B2/newIDs. Conflicting/malformed/partialexistingrecords deny. No caller retry, overwrite, replacement, rollback/delete, secondclaim/newIDs afterunknownACK. Retain actualstoragepromises on timeout; timeout/abort!=rolledback orphysicalsettlement. ACKrecord failure leaves retainedfacts but no successfuloriginalresult/brand. Readerforreconciliation, ifneeded, is fixed privatefacts-only and cannotmintACK/redoassembly.
+
+## Actual factual composition
+
+CallactualreadPrivateQaFiniteCandidate(), readPrivateQaFiniteBootstrap({ctx,env},lease), readPrivateQaFiniteHistoricalSource({ctx,env},lease). No wholesale facts substitution, callbackinjection or oldhashreuse.
+
+Historicalartifact frozen315/source2a477 distinct from Qmanifest+D1 and M/B1. Parse actual B2.bindings.successorPolicy with existingexactmanifest/resolver, notreturnDTOtrust. Qoriginal/scope exactvalidatedmanifest andB2originaladmission/closure match. New artifact is actualB1 {sourceRevision,sourceTree,programHash,workerHash,sourceCheck}; script omitted only in storage. fatalUTF8B1script matchesbytes/hash/size.
+
+ownerSelection exact {subject,project:{projectId,revision,synthetic:true},clientId,resource,goal,access:{teamDomain,audience},limiter}. Values from approvedexactpinnedold2607configuration+B2originalscope/admission, samefreshownedDBrow. goalcontent; synthetic:true sourcepolicyfortheapprovedfixedowntestonly. New RELEASE_DB.first-primary getOwnedProject twice sameID/subject/currentpositive revision; rows muststayexacton {id,userId,revision}. No labels/email/arbitrarycallerid. ActualAccessbinding ACCESS_TEAM_DOMAIN/ACCESS_AUD andDELEGATED_RATE_LIMITER fromsamequalifiedconfiguration; strict connection-profile grammar/domain/audience/namespace/limit/period, missingfails. limiterexact {name:"DELEGATED_RATE_LIMITER",type:"ratelimit",namespace_id,simple:{limit,period}}. Noinventedexpiry/newgrant/window.
+
+originalContext exact10 {artifact,scope,original,publication,cancellations,retirementPolicy,withdrawalRequestId,saveIdempotencyKey,legacy,trialId} frompolicy-setup61. publication {artifactKey,workerHash,activationKey}; artifactKey=SHA256(JSON.stringify([fixedaccount,fixedcanary,B1workerHash])) peractualTask4; activation/trial/withdrawal/save fromclaim. scope/original actualoldmanifest, cancellations actualB2history, retirementPolicy exactoldvalidatedrawstring. Fulllegacy uses acceptedreaderoriginbelow. First validate the ACTUAL codec-decoded stored projection with existing finiteData: whole projection<=32768UTF8/depth12/nodes2048, inside the separate wholematerial64KiB cap. originalContextHash=H("afw.finite-original-context.v1",finiteData(storedprojection)), preserving actual Task4 sorted digest semantics. Qprogram/source remainoriginal, artifactM remainscandidate. No speculativecanarybaseline/currentpublication/publicstatic/fullmaterialmanifest.
+
+historicalEvidence exact {purpose:"afw.finite-historical-evidence.v1",reader:{sourceRevision:M,sourceTree},artifactReceiptHash,metadataProofHash,bindingsHash,legacyHash,historyHash}; H domains respectively afw.finite-historical-artifact-receipt.v1/metadata-proof.v1/bindings.v1/legacy.v1/history.v1 appliedactualB2 exactfields asfullpreflight. sourceHash=H(evidencepurpose,evidence); fulllegacy={...B2.legacy,sourceRevision:M,sourceHash}. Reader-origin only, neveroldruntimeorigin; downstreamsamecommitment. Oldretirementhistoricalsemantics preserved/flagfalse, no newT0/newgrant transformation, nophysicalstopclaim.
+
+## Proposed evidence plan before product
+
+HostedNode22/existinglockfile/contents:read temporarybranch+pathqualifier, nosecrets/artifacts/deploy/docs-onlytrigger; EXCLUDEDintegration. No localdeps/build/provider/resources. MeaningfulRED thenactualGREEN nativeDO/storage/D1 realB1/B2/C1productioncomposition underexplicitSYN CF/GH/custody/fixed-testsourcepins boundary; no wholefactualreadersuccessDTO. TestWorker invokesprivateconstructor inactualDO andexports sanitizedassertions only. UseactualcompiledB1residency/testcompilefixture andactualC1nativeparser/primary andactualB2metadata/historyquery; productionceilings unchanged; separateexpirydenial reproducible.
+
+Tests: commandwrongowner/repo/issue/body/edited/time/source/QA; holderdrift/wrongactor/DB; aborted/backward/expiredoriginalclock/childtimeout; exact13GH6CFbounds/noautomaticretries; B1bytes/Q-oldartifact-M distinctions; realAccess/limiter/currentownership/revision/missingslots; oldretirementnotrewritten; exactreaderorigin/projection/selfhash/size/prototype rejection. Concurrent/replayedclaim/newM/QA/unknownACK/latecommits/partialmaterialselectorACK: no newIDs/resend/brand; alloldkeys/D1history/finiteHEADpreserved; originalIDsequalprojection. Copy/replayresultdifferentconstructor/lease/expiredlease deniesfactualbrand and noAPIgrants effectauthority. Positivepath actualallfourreadbacks no window/publication/sourceauthority.
+
+Only affectednewtests+directdependencies andlint; broadB1/B2/C1 reruns if implementationactuallychangesdependencies. RecordactualvsSYN boundaries/commands/counts/run/job/attempt/head/artifacts0 plusCAS/ref/allfile readbacks. STOP forindependentspec/qualityreview. No completePackage/readiness/PCoff claim.
+
+
+## Root exact-contract acceptance and corrected bounds clarification — 2026-11-02, BEFORE product
+
+Root accepts ba452cffcf10def0263164a18551372ba15ffd82 contract with this clarification. Initial review mistakenly described Task4 original-context digest as unsorted schema-order JSON and requested a shared helper; Root independently rechecked policy-setup.mjs:18–19,72–73 and WITHDREW that assertion/helper request. Actual v1 digest recursively sorts keys, AFTER existing finiteData validation. Preserve it exactly; do not invent a sorted-vs-Task4 hash difference or change v1 meaning.
+
+Required correction ONLY: stored script-free originalContext must pass the existing finiteData bounds (whole projection<=32768 UTF8 bytes, depth<=12, nodes<=2048) even though the enclosing material may be<=65536. Then use existing sorted domain hash afw.finite-original-context.v1. Verify actual codec-decoded material.originalContext after canonical roundtrip; rehydrate script only from B1. Regression must demonstrate actual Task4 digest equivalence and projection32KiB overflow rejection despite totalmaterial<64KiB. Default leave Task4 product unchanged, no shared helper or reflex Task4 rerun.
+
+Exact C2-A contract is now APPROVED subject this recorded clarification. Proceed sole writer with meaningful hosted RED→GREEN, actual native full B1/B2/C1 fixture composition under explicit external SYN boundaries, and mandatory partially consumed original-parent held-child test with actual timer/abort/retained promise/no after-deadline writes. All unmounted/factual/no-effects/no-source-authority/no-owner-window scope remains unchanged. No additional permission required for this bounded source/test implementation. Fresh review after report remains mandatory.
+
+## Root clarification of uncertain first-claim outcomes — 2026-11-02 20:30 UTC
+
+Chronology: the implementer added the private per-actual-storage WeakSet denial in source commit 8a8633d7527a448998cefd46910f7d197d47aded before Root's message confirming this defense. This is NOT represented as pre-code Root approval. Root subsequently confirmed the bounded defense and asked to preserve this chronology; no history rewrite/revert is needed.
+
+The original pre-code contract remains unmounted factual C2-A. A committed/retained durable once record denies replay across constructors/M/QA/lost ACK. If the first claim never committed, absent durable evidence after actor restart proves neither consumption nor physical settlement. The private WeakSet is set after verified original command, before first claim transaction, keyed only by captured actual storage identity; it is never cleared on false/unknown outcomes. It denies new-constructor retries in the same isolate, including an uncommitted claim, and concurrent claims admit one attempt. It is NOT a durable registry, source authority, effect admission, or restart proof.
+
+Future C2-B must independently fence the original native entry and unknown outcomes. No A data/result can supply that permission. No new key/table/role/entry/proxy/incarnation claim. Required final focused test explicitly uses a fresh store constructor over the same actual storage after unknown/no-commit ACK, asserts no second transaction/IDs; concurrent path one actual attempt. Operational readiness remains false. This clarification is persisted before that final test refinement.
+
+## C2-A final source checkpoint — 2026-11-02
+
+Implemented unmounted factual initial material/once/selector/ACK at code 2ab571bd1659060387b5c19d58dd5d329b8b7d5e. Hosted run41520147197/job125533756257 attempt1: 19 pass/0 fail/0 cancelled/0 skipped; scoped lint clean; artifacts0. Exact Task4 sorted digest/bounds unchanged and regression verified through real canonical material roundtrip. Actual native B1/B2/C1 composition under explicit SYN external-data boundaries, not whole facts DTOs. Native parent/held ACK test and fresh-constructor/unknown-no-commit same-storage denial passed. Durable once continuity requires committed/retained evidence; WeakSet is same-isolate denial only, not restart consumption/settlement/authority.
+
+Full report: docs/superpowers/reports/2026-11-02-finite-initial-material.md. All source/test/qualifier exact readbacks and branch ref verified; final docs CAS/readbacks returned to Root. Independent review PENDING; task STOP. No mount/publisher/source authority/session forwarding/actual provider or owner command/window; owner15min/read10min unstarted; completePackage/readiness/PC-off false. Future B owns original native entry/issuer/all-writers and restart/unknown-outcome admission.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-02-finite-initial-native-entry.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-02-finite-initial-native-entry.md b/docs/superpowers/specs/2026-11-02-finite-initial-native-entry.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-02-finite-initial-native-entry.md
@@ -0,0 +1,39 @@
+# C2-B1 initial native entry — APPROVED before product
+
+Root approved 2026-11-02; basef61ec7b2251672cc34016715c45dd3ecf085c14c. Requirements: ../briefs/2026-11-02-finite-initial-publication.md. Fullactualtable/primarydocs/causalruling: ../reports/2026-11-02-finite-initial-publication-preflight.md. No additional factualreader/publisher/window/sourceauthority.
+
+## Exact entry and trusted boundary
+runPrivateQaFiniteInitialPreparation({env,event,step}) in new lib/mcp-qa-finite-initial-entry.mjs, routed ONLY by existing finite PrivateQaBootstrap operation finite_initial_preparation.
+Exactpayload {operation,commandId,sourceRevision,qaVersionId}; commandpositive safeinteger, M40lowerhex, canonicalQAUUID. initialInstanceId reuseactualA grammar. Actualevent timestamp genuineDate, instanceId exactdeterministic, workflowName exactlyafw-own-qa-private-bootstrap, noschedule. Capture/recheckevent/payload/step/envversion/namespace holders.
+Existingfinite IndependentClosure method prepareFiniteInitialMaterial(refs), exactrefs {commandId,sourceRevision,qaVersionId,initialInstanceId,workflowName,createdAt}. Actorconstructor/run private helper createPrivateQaFiniteInitialEntry({ctx,env}).run(refs). No callerURL/token/clock/sourcefacts/callback override.
+Transportedfields correlationDATA: actualreviewedWorkflowwrapper/callgraph/account/bindings trusted, notcryptographiccallerscriptattestation; maliciousprivilegeddeployment/bindingwriter excluded. Actorindependentlychecks compiledM/tree, actualQAmetadata/fixedactor/storage/bindings, deterministicID, originalfixedownercommand andcurrentboundedprerequisites/custody. Existing general source-authority/ordinary routes stayclosed.
+
+## Record and first acknowledged durable winner
+Fixedglobalkey afw.finite-initial-preparation.v1:entry. ExactEntryClaim<=4096UTF8 canonicalownJSON:
+{purpose:'afw.finite-initial-entry.v1',commandId,commandHash,sourceRevision,sourceTree,qaVersionId,initialInstanceId,workflowName,createdAt,I0,initialDeadline,operationDeadline,entryHash}.
+Commandhash actualA normalizedcommanddomain; originalowner290715446/login tokenizartinfo-ops/User/OWNER/repositorytokenizartinfo-ops/agent-friendly-web/issue497, exactuneditedbody /afw-qa-finite-prepare v1 M QA.
+I0originalcommentcreated_at; initialDeadline=I0+300000; I0<=createdAt<=now; operationDeadline=min(initialDeadline,createdAt+30000,fixed3Nov2026 02:59UTCceiling). actualverifiedcustodyexpiry maynarrowleaseonly. recordhash SHA256(purpose+'\n'+sortedcanonicalbodywithoutself). No localclaimedAt/random/attempt identity/renewedlifetime.
+Atomicnative storage.transaction callback: onlynativeget/put andlocalvalidation; absentputdeterministicrecord/RETURN inserted; anyexistingrecordRETURN existing orrejectmalformed/conflict. FinalsuccessfultransactionreturnONLY determineswinner, neveroutermutableinsertedflag fromretriedcallback.
+Winner mustawaitcapturedactualstorage.sync underoriginallease, thenexactreadback andcurrentholders/deadline BEFOREprivateoneuseAcontinuation. NoallowUnconfirmed. UnknownentryACK/sync/readback→noA. Existingentryalwaysreconciliation/pending, neverreconstructadmission. Neverdelete/replace/refund.
+Explicitexception for deterministicPRE-EFFECTCAS only: ifnevercommitted, anotheratomiccontender inSAMEoriginalintent/deadline mayattemptSAMErecord; nopriorinvocationcouldcrossdurability/readback. Latecommit/conflict yieldsatmostonewinner. ActualeffectSEND/ACKunknown NEVERresendsupload/deploy/WorkflowCREATE.
+
+## Clocks, retention and A composition
+AMENDED by Root AFTER implementation observation (2026-11-02): wrapper and actor share unchanged baseDeadline=min(native createdAt+30000,fixed ceiling). Actor alone additionally clips original I0+300000 and verified custody expiry before Entry/A. Exact safe output has no deadline, so wrapper may receive factual data after the tighter actor bound, still within its original base; it confers no timely effect permission, authority or resumable continuation. Future publisher remains inside the surviving winning actor continuation. This is an explicit post-implementation ruling, not retroactive pre-code approval. No Date.now+30s renewal. Wall/monotonic/abort checks; each child<=5s clipped by its original parent. Genuine created/triggered time only, no invented queuedAt; C1 P0/Pend/business T0 remain separate.
+Capture/recheck actualstorage.transaction/get/sync andenv/sourceholders. Retainunderlyingnativepromisesbeforeraces; timeoutnotphysicalstop. IndependentpreAretention, noouterobserveFiniteOwnerStageWork admission conflictingwithA'sown scope.
+Only winningactualactor continuation callsactualcreatePrivateQaFiniteInitialMaterial({ctx,env}).collect({commandId},sameoriginallease), thenactualassertCurrent, thenACTUALstorage.sync againunderlease andactualassertCurrent before safesuccess. NoAnewIDsbeforeentrybarriers. UnknownA leavesentryspent.
+step.do retrieslimit0/delay1second/backoffconstant/timeout30seconds; callbackreentry stillsafe viaentry. Cachedstepoutputnotpermission. Futurepublisher mustcomposeinsameSURVIVINGwinnercontinuation withindependentallwriter/source/currentpublisherpermission; storedEntry/A neverrecreatespermission.
+
+## Safe outputs and exclusions
+Success EXACT {status:'material_recorded',entryHash,materialHash,sourceRevision,qaVersionId,authorizesEffects:false,completePackage:false,operationalReadiness:false}.
+Failure {status:'admin_pending',mayRetry:false,operationalReadiness:false}. No RPCmaterial/owner/script/bytes/functions/capabilities. No publication/ownerwindow/currentallwriterpositive/sourceIdentity/Scope flags. No newbinding/export/profile/resource/role/secret/HTTP; finiteclassoperation/method only; ordinaryhandlerspreserved.
+CurrentglobalWorkflow/native/D1 inventory/native9aaRESTcapability/publicationcustody/rollback/ownerSource/HTTPsession/C3remain owninggates. No actualcommand/tag/instance/window/provider/publish/main/Maxaction. FirstfiniteHEADunspent; legacyhistoricalpolicy unchanged.
+
+## Required tests
+HostedNode22 actualSQLiteDOtransaction/sync,D1,realA/B1/B2/C1 producers; explicitSYNexternalCF/GH/pins/custody/approvalceilings andevent/stepdelivery ifnativeWorkflowruntimeabsent. No wholefactssuccessDTO.
+Concurrencyonewinner/oneA; callbackreexecutionfinalreturn; nevercommitcontender; committedlostACK; held/rejected/timedsync andcachedreadbackinsufficient; oldlatecommit; restartafterEntry/Aunknown; deterministicrecord; no renewedbudget/queuedexpiry/partialparent; malformed/source/nativeholder/commandmismatch; safeoutput; actualfiniteclasscompiled. Preserveoldkeys/D1/finiteHEAD. Afterentrychange actualcompiler/profile/residency regression including2MiBcanary/3MiBQA andno compiler/issuer/fs/esbuild runtime graph. A canonicaloracleminor deferredTask4/finalreview.
+
+## Native transport refinement and qualification
+
+The actual Worker-to-DO RPC regression exposed the system-added own Symbol.dispose on object results. Root approved normalization only at native safe-DATA return boundaries, preserving exact remaining own-data fields/prototype/false flags. Capture/recheck the synchronous disposer and call it in finally without replacing an earlier parsing error. Other symbols/getters/extra fields remain rejected; actor and persisted-record parsers are unchanged. Disposal does not await server disposal or prove physical settlement. [Official lifecycle](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/) and exact diagnostic source references are in the [final report](../reports/2026-11-02-finite-initial-native-entry.md).
+
+Qualified source e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7: hosted run41530593619/job125569445138/attempt1, 68 PASS, lint clean, artifacts0. Actual native held-transaction ACK and SYN-controlled callback scheduling are not represented as forced delayed disk commit. Fresh independent spec/quality review remains required; no operational flags changed.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-02-finite-pre-t0-qa-provenance.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-02-finite-pre-t0-qa-provenance.md b/docs/superpowers/specs/2026-11-02-finite-pre-t0-qa-provenance.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-02-finite-pre-t0-qa-provenance.md
@@ -0,0 +1,51 @@
+# PRE-T0 QA provenance — C1 source contract
+
+Root ruling 2026-11-02; BASE a609c1f3296177f73468ca8c708b9333330f1d32. SOURCE ONLY, unmounted. No provider action, actual tag, workflow dispatch, private capsule, owner window, grant, publication or runtime admission.
+
+## Trust and scope
+
+This is a source-governed technical bridge under the explicit trusted repository-writer/governance assumption. GitHub refs are mutable by other writers/admins. Immutable Git object SHA plus current ref/payload/source/job correlation does NOT prove historical nonmutation, prevent move-away-and-back, establish full publisher identity or grant business permission. Capture tagSha/recordHash once and recheck current ref before return. The later initial publisher and owning source wrapper must explicitly accept this boundary or require stronger proof BEFORE an owner window. No new ruleset, OIDC, signing key, proxy or store.
+
+Direct qaCodeProvenanceVerified remains false. sourceIdentityVerified, scopeVerified, authorizesEffects, operationalReadiness and completePackage remain false. Existing source-authority/owner-source unavailable seams and full-package gates stay closed. The named bridge evidence is factual, not an authority registration.
+
+## Exact interfaces and record
+
+New record module exports validateFiniteQaBootstrap, encodeFiniteQaBootstrap, decodeFiniteQaBootstrap, and source-owned constants. Record purpose afw.finite-qa-bootstrap.v1. Exact own enumerable data, canonical sorted-key JSON, domain-separated SHA256; encoded envelope <=16384 UTF8 bytes, bounded depth/nodes, no accessors/prototypes/symbols/extra fields.
+
+Public record contains only repository/repositoryId, sourceRevision/sourceTree/sourceCheck, workflowHash/cliHash, commandId/runId/jobId/attempt, fixed workflowPath/job/step, P0/Pend/jobStartedAt/stepStartedAt/observedAt, and qaLive {versionId,deploymentId,module{name,sha256,bytes,exports},publicStatic{purpose,configurationHash,profileHash,bindingsHash}}. Fixed sourceCheck is git-inputs-and-configuration-before-after-v1, not B1 candidate-residency's git-inputs-before-after-v1. Exact QA role exports/profile hashes are required. No raw configuration, module bytes, private-policy/control selector/hash, owner/project/grant/consent/goal/window/callback/JWT/secret value or hash.
+
+New admission parses only /afw-qa-finite-bootstrap v1 <M> from created owner290715446/repository1347578006/main issue497; separate purpose and WeakMap, never finite confirmation or first HEAD. P0 is original comment.created_at; Pend=P0+300000 includes queue/install/compile/tag/readback and successful step/job completion. No business T0/N1/C0/C1 clock. Later native reading may occur after Pend if original completed-success timing and fresh current QA/source/custody/parent qualify.
+
+New issuer internally invokes the actual compileFiniteNativeStaging in its same physical checkout. No caller compiler/pins/source/provider URL. Private credential arguments are internal CLI custody transport only. Verify existing GHA9db dated receipt unchanged with Pend required expiry. Original process PID marker and GITHUB_JOB=publish/GITHUB_ACTION=finite_bootstrap_once/run/attempt1/M coherence. One process cap spent before first POST; original launch reexecution excluded by trusted source host, not durably solved by PID.
+
+Future source workflow .github/workflows/afw-finite-qa-bootstrap.yml: issue_comment created only, exact owner/repository/main/issue497 guard; publish job existing afw-qa-cloud-closed-rollback environment, contents:write/actions:read; Node22/existing lockfile; checkout exact M no persisted credentials; step qa-bootstrap-provenance/id finite_bootstrap_once runs original PID export then exec dedicated CLI. AFW_QA_CLOSED_TOKEN and GITHUB_TOKEN only at source step. No dispatch/execution in this unit.
+
+Compiler adds exact tracked bootstrap workflow and fixed CLI SHA256 inputs, verified at git M before/after and same physical checkout; acyclic QA-only constants embed expectations. Native compares independent public source file bytes with those embedded hashes. Node compiler/fs/esbuild/GHA issuer never enter QA/canary runtime graph. No QA selfhash.
+
+## Actual APIs and private validation
+
+GHA: account token verify; QA deployments?per_page=1; Beta /workers/workers/agent-friendly-web-independent-closure-qa/versions/<fullUUID>?include=modules; repeat identical pointer. Existing GHA ContentRead route only. Exact module bytes, canonical base64, size/hash/exports against actual compiler role. Strict existing qaLive public profile projection; secret_text exactly name/type BEFORE hashes. Explicit supported readonly wrappers only, no permissive provider normalizations. No qaClosed/history/full manifest call or bypass. No raw/private configuration fingerprint in public output.
+
+CF OpenAPI verified 2026-11-02: deployments accepts Workers Metadata Read-Only and Individual Metadata Read-Only; Beta and classic version GET do NOT, even without include. Native uses token verify and two deployments reads ONLY; no QA code GET/settings-as-version-proof.
+
+Tag locator refs/tags/afw-finite-bootstrap/<canonical fullQAUUID>; annotated name afw-finite-bootstrap-<UUID>; object M type commit. GET absence, POST tag, POST ref, exact readbacks. No PATCH/PUT/delete/reset. Conflict/unknown ACK/expiry consumes attempt; no resend or replacement. Later GET reconciliation remains factual only.
+
+Public primary: exact owner command/main M/git commit tree/run repository/head/event/attempt1/workflow/title; original job/step start and in_progress issuer; later actual completed-success run/job/step with observation inside step and completed step/job before Pend. Exact tracked workflow and CLI contents authenticated by Git blob SHA plus independent compiler-embedded expected SHA256. Issuer never attests its future completion.
+
+## Native reader
+
+readPrivateQaFiniteBootstrap({ctx,env},originalLease), exactly two arguments; exact original {signal,assertCurrent}, no caller clock/fetch/pins/credential. Capture same actual ctx.id/storage, native self namespace, AFW_QA_VERSION object/id, read-token holder and fixed fetch; recheck after awaits. Derive fullUUID locator from actual version metadata. Local coherence and compiler constants are not source identity authority.
+
+Native9aa approved ceiling remains 2026-11-03T02:59:00Z; effective expiry min(actual verified expiry,ceiling), scopeVerified=false. Original parent <=30s wall/monotonic/abort, each child <=5s clipped parent, actual read promises retained before race, no renewed lifetime or remote physical-settlement claim.
+
+Budget: exactly 3CF GET plus 10–12 public GitHub GET, no auth fallback/cache/retry/proxy. Fresh Date/no cache/redirect denial/bounded fatalUTF8 bodies. Rate/latency failure is unavailable and remains deployment usability gate, not a credential diagnosis.
+
+Return named afw.finite-qa-bootstrap-evidence.v1 with record, recordHash, tagSha, primaryEvidence, currentPointer, observedAt, qaPublicationBridgeVerified:true and the false fields above; explicit repositoryWriterTrustAssumed:true and historicalRefNonmutationVerified:false. Private in-process evidence, no new HTTP/RPC mount. Later readPrivateQaFiniteOwnerSource owns source/context qualification; currently unavailable.
+
+## Initial publication handoff and tests
+
+Initial publication is separate approved preservation/upload/deployment gate. Actual compiler files qaLive/index.mjs and canaryLive/index.mjs are bytes. CF POST /workers/scripts/<name>/versions accepts multipart/form-data (upload without deployment) and requires write/admin/editor permission; artifact IDs alone are not byte transport and read custody never authorizes publishing. No upload or deployment here.
+
+Meaningful hosted Node22 RED/GREEN exercises new record/admission/issuer/primary/native logic, actual compiler and affected profile checks. CF/GH/custody boundaries explicitly SYN, no whole-facts success mock. Positive tests substitute only explicit SYN approval data with real clocks; separate production expiry denial keeps real ceiling unchanged. Temporary branch/path-only contents:read qualifier, no secrets/artifacts/deploy, EXCLUDED integration, no docs-only trigger.
+
+Remaining: initial publication/byte ingress, source-context authority, private initializer/capsule/windows/new identities, material/forwarding/all-writer mounts, C3/consumer/runtime/PCoff. Task5 incomplete.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-03-finite-initial-activation-coordinator.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-03-finite-initial-activation-coordinator.md b/docs/superpowers/specs/2026-11-03-finite-initial-activation-coordinator.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-03-finite-initial-activation-coordinator.md
@@ -0,0 +1,23 @@
+# Initial activation coordinator — bounded writer ruling
+
+PROJECT AFW. REPOSITORY tokenizartinfo-ops/agent-friendly-web. ENVIRONMENT finite synthetic own QA, source only in feat/finite-native-cleanup-20261101. ORIGIN delegated-canary.agentfriendlyweb.dev. RESOURCE_TYPE private QA actor, canary deployment journals. RESOURCE_ID fixed identifiers from the B1 binding specification. ALLOWED_ACTION implement and qualify source in cloud CI. ROLLBACK revert this source unit before promotion. No live command is authorized by this document.
+
+## Binding boundary
+
+Apply the trusted administrative boundary in specs/2026-11-02-finite-initial-native-entry.md, Exact entry. The reviewed callgraph/account/bindings are trusted. Malicious privileged deployment/binding writers are excluded. This is not a claim that account administration or D1 is cryptographically immutable.
+
+Ruling: reject universal proof of all hypothetical historical SQL or administrative modifications as an implicit prerequisite. Instead qualify the actual authorized writers affecting the fixed resources using source, receipts, primary exact history and schema. A concrete contrary writer, rewrite evidence, or relevant issued unresolved effect remains blocking. Accidental mutations by actual legitimate tools remain in scope.
+
+Preserve accepted source-correlated facts. The specific historical COMPLETE requires fulfilled destroy for its correlated invocation. Guard d56 blocked means its restorer did not issue SEND. Keep the prior dispatch uncertain. Its candidate-specific receipt/admission barrier excludes native observation when candidate-zero history is coherent under the trusted writer model. Exact historical admission uses INSERT and closure INSERT OR IGNORE. Current schema plus inspected writers supports that bounded premise, not arbitrary privileged REPLACE resistance. Old time/signal checks prevent delayed reads from initiating new native operations after their immutable window. Timeout alone does not prove settlement.
+
+## Required source implementation
+
+Extend the surviving B1 winner after actual A, inactive upload and durable cleanup arm. Private continuation must keep original context, holders, producer result, stage registry and lease. Reuse the scoped primary gates and serial final checks. No supplied DTO or persisted receipt recreates authority.
+
+Use existing wire codecs and fixed endpoint/body. Persist exactly one ActivationSend transaction, storage sync/readback, check original live authority, perform one POST, persist actual ACK, verify primary deployment plus exact plan module bytes/hash and configuration, persist Completion durably. Replay, preexisting journals, foreign pointers and unknown issued results fail closed and never repeat a POST. Carry actual plan and arm ACK privately from armInitialCleanup. Preserve original deadlines and native cleanup arm. Safe RPC remains factual and incomplete until owner handoff exists.
+
+Qualify with actual native actor fixtures. Cover success, drift at each boundary, preexisting SEND, timeout/lost ACK, completion mismatch, cancellation/retention, restart, and zero effects on every pre-SEND failure. Source ceiling remains expired and unchanged in this unit. No physical resources, credentials, grants, permissions or production switches change.
+
+## Follow-on gates
+
+A read-only pre-Entry host needs a separate non-authorizing retention scope and controlled closed QA invocation, without consuming Entry. Before any live trial verify the actually loaded credentials and endpoint capability, reconcile expiry/source ceiling and C1, measure bounded latency, complete capsule/owner closed-UI and cleanup handoff, and review the full branch. PC-off remains unverified.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-03-finite-initial-capsule.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-03-finite-initial-capsule.md b/docs/superpowers/specs/2026-11-03-finite-initial-capsule.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-03-finite-initial-capsule.md
@@ -0,0 +1,31 @@
+# Immutable initial activation capsule — source-only unit
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT own finite synthetic QA branch; ORIGIN delegated-canary.agentfriendlyweb.dev. RESOURCE_TYPE fixed IndependentClosure actor and initial journals; RESOURCE_ID afw-own-successor-closure-v1; ALLOWED_ACTION source edits and credential-free cloud CI only; ROLLBACK revert this source unit before promotion. No remote effects, token/permission change, trial command or OAuth from this unit.
+
+## Required result and binding boundary
+
+Continue the reviewed actual activation coordinator. Persist one immutable factual capsule only after actual ActivationCompletion passed append/sync/readback, inside the SAME surviving B1/A parent/stage. No replay, exported capability or caller DTO may recreate this continuation. Capsule is data; it never grants effect authority. Existing original trusted administrative callgraph/binding model applies; concrete contradictory historical facts block.
+
+Add strict bounded canonical codecs in lib/mcp-qa-finite-initial-capsule-records.mjs using initial canonical/hash conventions, with exact fields:
+purpose afw.finite-initial-capsule.v1; entryHash, materialHash, selectorHash, materialAckHash, cleanupPlanHash, cleanupArmAckHash, activationCompletionHash, sourceRevision, sourceTree, qaVersionId, qaDeploymentId, initialInstanceId, preconnectionId, I0, initialDeadline, C0, C1, activatedVersionId, activatedDeploymentId, moduleHash, configurationHash, bindingsHash, recordedAt, capsuleHash.
+Validate identifiers, all links, original ordering/timing, purpose, exact field set and canonical hash. materialAckHash derives from the existing InitialAck; do not add fields or rewrite historical records.
+
+Store ONLY fixed new key afw.finite-initial-preparation.v1:capsule. This is outside the cleanup prefix, whose strict enumeration must remain compatible. Do not write a finite HEAD.
+
+Private initial-entry writer verifies actual Entry/selector/material ACK/material/cleanup Plan+Arm/activation SEND+ACK+Completion against actual private continuation result and captured holders. Append within one storage transaction only if capsule absent and finite HEAD absent; preserve async checks; await captured sync and exact primary readback. Preexisting/conflicting capsule is not overwrite/retry authority. Original lease and all actual async work remain retained through settlement, including late sync/read/cancel. Missing or uncertain capsule after interruption stays admin_pending; no provider resend/activation replay.
+
+activatedVersionId/deploymentId and module/config/bindings hashes describe M actually activated and verified, NEVER historical2607 rollback. QA version/deployment come from verified original bootstrap pointer. Preserve A preconnectionId end-to-end; it already appears in selector/material/backup. Owner's new ticket handles/projectRefs are separate future concerns.
+
+Keep current factual safe RPC shape/incomplete status. No owner source seam/mount/GET/POST/consent or lifecycle handoff in this unit; these follow after capsule acceptance. readPrivateQaFiniteOwnerSource remains unavailable. Original technical<=I0+300s, owner I0..C0<=900s/custody, C0=I0+900s,C1=C0+180s remain unchanged; expired ceiling unchanged.
+
+## Acceptance
+
+Native actor successful actual completed activation produces exactly one synced/read-back capsule with actual M UUID/deployment and retained A identity. Missing/uncertain Completion, mismatched Entry/selector/ACK/material/cleanup/hash/QA pointer and conflicting capsule deny. Lost capsule write/sync/readback ACK, restart, timeout, cancellation, holder drift or finite HEAD do not repeat upload/POST or invent authority. Existing material/cleanup codecs and strict cleanup inventory unchanged. At technical expiry no late capsule continuation starts. Capsule creation must not mutate cleanup ARM/timing or produce finite HEAD.
+
+Use TDD regression and meaningful native cases; do not mirror codec implementation with vacuous tests. Run focused affected native/record groups and compiler/residency if imported bundle changes. Report exact base/head, RED/GREEN Actions, source artifact size/hash, zero actual provider calls, remaining factual reader/owner mount/cleanup/live gates. Report docs/superpowers/reports/2026-11-03-finite-initial-capsule.md. Temporary qualifier excluded before integration. No local clone/build/dependencies; no subagents. operationalReadiness=false; completePackage=false; PC-off pending.
+
+## Ruling recorded 4 November 2026
+
+bindingsHash binds the complete activated M configuration bindings, sorted ascending by binding.name and recursively key-canonicalized JSON, plain SHA-256 of that JSON. It matches expectedFull.bindingsHash in mcp-qa-finite-policy-setup.mjs:91; the public projection's afw.finite-public-bindings.v1 domain is a different commitment and must not be substituted. Use the actual already-qualified activation configuration, preserving its correspondence to Plan/Completion. Test ordering invariance and a full-binding field mutation. Do not change other historical hashing conventions.
+
+The pending causal RED is now confirmed: Actions41694127911/focused126120046559,107PASS1FAIL exactly completed activation must persist immutable capsule. Compiler/forward consumers passed. No rerun of unchanged RED is needed. The newly touched RPC result in the success test must dispose in finally, including on failed assertions; preexisting fixture warnings are separately documented, not all attributed to this test.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-03-finite-readonly-host-mount.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-03-finite-readonly-host-mount.md b/docs/superpowers/specs/2026-11-03-finite-readonly-host-mount.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-03-finite-readonly-host-mount.md
@@ -0,0 +1,33 @@
+# Closed pre-Entry custody host — source implementation brief
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT closed own QA, isolated source branch; ORIGIN delegated-canary.agentfriendlyweb.dev. RESOURCE_TYPE fixed private QA Workflow and IndependentClosure actor. RESOURCE_ID account85d0d5dadac3341a564f22ce885e9eec, QA agent-friendly-web-independent-closure-qa/a95b775a624d4b8cbc81ac5198e14805, actor afw-own-successor-closure-v1, namespace070c4a7708eb4592a3ded7c117a88225. ALLOWED_ACTION source implementation and credential-free cloud CI only. ROLLBACK revert this source unit before promotion. No live deploy, command or Workflow creation by this brief.
+
+## Binding ruling
+
+Original B1 trusted administrative callgraph/account/bindings boundary applies. Native namespace possession plus reviewed closed caller paths is the capability boundary. H and fixed context are correlation/integrity data, never credentials or per-caller attestation. No new signature scheme or secret is required merely because RPC omits a caller identity. Concrete reachable unreviewed forwarding/binding holders remain a blocker. Do not infer all-account absence from inspecting three Workers.
+
+Primary exact active-version inventory 2026-11-03T17:58:27.940Z: QA c570b60b-95dc-48e1-89f3-9c4651691dbc has self IndependentClosure070c4a7708eb4592a3ded7c117a88225, own bootstrap Workflow afw-own-qa-private-bootstrap and preregistration6f30104244424152b800bc64d5f4cfac. Inspected canary2607abae and operator855dc5c1 only share their own event namespace d6fc71552de7494a863aca20365a572d; neither inspected version has QA IndependentClosure. This is bounded factual evidence, not a universal proof.
+
+Official basis: https://developers.cloudflare.com/durable-objects/get-started/ states DOs have no direct Internet ingress and callers use upload-time bindings; public class methods are RPC methods. Qualify inherited methods as well as the new method. Preserve closed flags, deny public paths and existing guards; no reflected/arbitrary method forwarding.
+
+## Required result
+
+Reuse accepted readFinitePreEntryCustody from lib/mcp-qa-finite-initial-custody-probe.mjs. Add a separate fixed native read-only RPC on a wrapper of exact baseline IndependentClosure so the helper runs on actual this.ctx/this.env, never caller-supplied holders/credentials/targets/URL/source/deadline. Invoke only through a fixed Workflow operation with exact compiled context/source and bounded arguments. Preserve original independent <=15s scope and <=5s children, private outstanding-promise retention and exclusion from owner continuation; no Entry consumption, admission or effect authority.
+
+Integrate a separate controlled source-only command/controller using the existing closed native observation preservation/claim model. Distinct command, claim and purpose, main/owner/issue497/attempt1/fixed revision gates, same existing private GitHub environment and credential custody. Preserve historical commands unchanged. No alternate environment or credentials. Fix wrapper artifact/source/hash and compile deterministic context. Before any provider mutation require exact current baseline, eligible public provider gate, original finite budget, primary closed state, recoverable exact baseline/config. One inactive QA upload, fixed temporary QA activation, exactly one fixed Workflow observation, bounded terminal/cleanup handling, and independent exact baseline restoration/readback; no retries after uncertain effects. The eventual controlled host necessarily mutates QA deployment/Workflow metadata, so never label the entire controller read-only. Only actor custody observation is read-only.
+
+Active version configuration and script-level settings must be preserved and compared independently, not silently copied over each other. Exact active canary flags were false at17:37Z while saved settings showed true; existing drift remains a live gate, never normalize it in this source unit. QA baseline remains c570; no live operation in CI.
+
+Inspect inherited baseline methods/callgraph from fixed baseline source to prove closed behavior. Add native tests for actual wrapper/Workflow path, exact selector/actor/source/context rejection, inherited mutators closed, no Entry consumed or admissions/effects, holders, replay/deadline/unknown ACK/cleanup restoration. Reuse existing controller tests for preservation and error phases where possible; do not fake a successful provider or hardware claim.
+
+## Existing custody evidence and limits
+
+Actual existing GitHub-held QA token identity verification completed once: run41686864150/job126094799185, result2026-11-03T17:42:58.638Z, token9db7901af95faf07e6f7ef378045328e active until2026-11-08T02:59:59Z, expectedTokenMatchtrue/readOnlytrue. scopeVerifiedfalse/workflowCreateVerifiedfalse. This does not prove actor-loaded two credentials, endpoint permissions or native caller path. Actor readers/publisher expired2026-11-03T02:59:00Z; no renewal from this unit. No new secret entry now.
+
+## Validation/report
+
+Use TDD for native host behavior and focused controller gates, credential-free GitHub Actions. Temporary qualifier workflow excluded from later integration. Source ceiling remains expired. Report exact base/head, RED/GREEN Actions and test groups, inherited RPC inventory/boundary, artifact hashes/config preservation, residual concrete gates. Do not claim activation/readiness/PC-off. operationalReadiness=false, completePackage=false. Deliver report docs/superpowers/reports/2026-11-03-finite-readonly-host-mount.md. No local clone/dependencies/build, no subagents.
+
+## Unit A/B scope ruling
+
+Unit A is the source-only fixed wrapper and Workflow path, synthetic native qualification and an opt-in exact-byte qualification hook. The real historical module need not be obtained during this credential-free unit; its exact inherited-method qualification remains a mandatory pre-promotion gate. The hook must reject missing or mismatched bytes; a synthetic fixture is not equivalent. Unit B separately owns the controller, command, artifact integration and independently captured active-version and script-settings preservation. Each surface must match its own expected baseline; they need not equal each other. Unexpected drift, unsafe settings changes or inability to preserve/recover both blocks future mutation. This ruling authorizes no provider operation or promotion.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-03-finite-readonly-host-unit-a.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-03-finite-readonly-host-unit-a.md b/docs/superpowers/specs/2026-11-03-finite-readonly-host-unit-a.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-03-finite-readonly-host-unit-a.md
@@ -0,0 +1,9 @@
+# Pre-Entry native host — Unit A review scope
+
+Source split from specs/2026-11-03-finite-readonly-host-mount.md. Unit A implements only the fixed wrapper subclass, fixed Workflow operation, correlation/actor/source/closed guards, actual readonly helper invocation, bounded sanitized RPC result, deterministic bundle/native tests and opt-in exact historical module hash gate. It does not implement the future controller/command (Unit B). Independent version/settings baselines belong to Unit B, not an unused comparator prototype in Unit A. Original trusted upload-time namespace/callgraph capability boundary applies; H/context correlation is not a credential.
+
+Accepted readonly helper stays independent <=15s scope/<=5s children, retained promises/owner exclusion, no Entry/admission/effects. Exact QA namespace/class/actor preserved, no caller credentials/targets/URL/source/deadline, no arbitrary method forwarding. Native Workflow rejects wrong operation/identity/time/source/context. Existing public/inherited methods remain closed. Source ceiling unchanged. Context is fixed deterministic external administrative module, no caller-supplied provider request. Do not create new auth scheme to substitute for original trusted binding model.
+
+Exact395915B historical module SHA4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f is not present in credential-free synthetic CI. Ruling: source unit may proceed with honest synthetic inherited tests plus a strict exact-byte qualification hook; promotion/live upload remains blocked until actual inherited-method and holder qualification, recoverable baseline and UnitBcontroller/source gates. No claim that synthetic no-argument inventory proves real valid-entry behavior. Do not deploy/dispatch/use credentials/provider in this source unit. All remaining concrete gates must stay explicit.
+
+Report docs/superpowers/reports/2026-11-03-finite-readonly-host-mount.md; code9a33bd5e48c47241844ea1f46764666c4448af66, Actions41693118183:14nativehost/bundle+105regression,0fail/skip,lint+missing/wronghash exact-hook rejection. Temporary qualifier is excluded on integration. operationalReadiness=false.

~~~~~~~~~~
