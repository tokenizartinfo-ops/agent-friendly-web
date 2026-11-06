# Whole-branch review packet 10/26 — other

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 6 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- .github/workflows/afw-finite-finalizer.yml: ABSENT -> 566d597223497c5cf3c0435dd0f4e8b3ab7557ea; full diff chars=4344
- .github/workflows/afw-finite-native-package.yml: ABSENT -> 92729f5952fd2d8bec107b4072bb569216d21863; full diff chars=1255
- .github/workflows/afw-finite-qa-bootstrap.yml: ABSENT -> 22f324e480dbe0295fe23fb7415328cba7952b1b; full diff chars=2071
- db/finite-preparation-issuer-fences.sql: ABSENT -> 92c7986ae2c5c83742a92d83dac9b2585e8e182e; full diff chars=2949
- wrangler.independent-closure-qa.finite.jsonc: ABSENT -> 31c6638c204b631c846a537cbec13b3f9b24e060; full diff chars=3907
- wrangler.mcp-own.finite.jsonc: ABSENT -> 87d3f78c62d373c1f18803da7dc6a4e300caddbf; full diff chars=2871

## .github/workflows/afw-finite-finalizer.yml

~~~~~~~~~~diff
diff --git a/.github/workflows/afw-finite-finalizer.yml b/.github/workflows/afw-finite-finalizer.yml
--- /dev/null
+++ b/.github/workflows/afw-finite-finalizer.yml
@@ -0,0 +1,105 @@
+name: afw-finite-finalizer
+run-name: AFW finite finalizer comment-${{ github.event.comment.id }} source-${{ github.sha }}
+on:
+  issue_comment:
+    types: [created]
+permissions:
+  contents: read
+jobs:
+  admission:
+    if: >-
+      ${{ github.event_name == 'issue_comment' && github.event.action == 'created' && github.ref == 'refs/heads/main' && github.run_attempt == '1' && github.event.repository.id == 1347578006 && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.event.issue.number == 497 && !github.event.issue.pull_request && github.event.comment.user.id == 290715446 && github.event.comment.user.login == 'tokenizartinfo-ops' && github.event.comment.user.type == 'User' && github.event.sender.id == 290715446 && github.event.sender.login == 'tokenizartinfo-ops' && github.event.sender.type == 'User' && github.event.comment.author_association == 'OWNER' && startsWith(github.event.comment.body, '/afw-qa-finite-confirmation v1 ') }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 2
+    outputs:
+      intent_id: ${{ steps.command.outputs.intent_id }}
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: 22
+      - id: command
+        run: node scripts/run-qa-finite-trial-finalizer.mjs admission
+  admit:
+    needs: admission
+    concurrency:
+      group: afw-finite-finalizer-${{ needs.admission.outputs.intent_id }}
+      queue: max
+      cancel-in-progress: false
+    runs-on: ubuntu-24.04
+    timeout-minutes: 8
+    environment: afw-qa-cloud-closed-rollback
+    permissions:
+      contents: write
+      actions: read
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: 22
+      - name: seed-material
+        id: finite_seed_once
+        env:
+          AFW_QA_CLOSED_TOKEN: ${{ secrets.AFW_QA_CLOSED_TOKEN }}
+          GITHUB_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          export AFW_FINITE_SEED_ORIGINAL_PID=$$
+          exec node scripts/run-qa-finite-trial-finalizer.mjs seed-material
+      - name: admit-and-ready
+        env:
+          AFW_QA_CLOSED_TOKEN: ${{ secrets.AFW_QA_CLOSED_TOKEN }}
+          GITHUB_TOKEN: ${{ github.token }}
+        run: node scripts/run-qa-finite-trial-finalizer.mjs admit
+      - name: Wait for exact observer terminal output
+        env:
+          AFW_QA_CLOSED_TOKEN: ${{ secrets.AFW_QA_CLOSED_TOKEN }}
+          GITHUB_TOKEN: ${{ github.token }}
+        run: node scripts/run-qa-finite-trial-finalizer.mjs poll
+  restore:
+    needs: admit
+    concurrency:
+      group: afw-qa-cloud-closed-rollback
+      queue: max
+      cancel-in-progress: false
+    runs-on: ubuntu-24.04
+    timeout-minutes: 3
+    environment: afw-qa-cloud-closed-rollback
+    permissions:
+      contents: write
+      actions: read
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: 22
+      - name: Restore exact QA candidate once under original R1
+        id: finite_restore_once
+        env:
+          AFW_QA_CLOSED_TOKEN: ${{ secrets.AFW_QA_CLOSED_TOKEN }}
+          GITHUB_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          # Trusted once-launched attempt1 entry. No retry/supervisor or recovery
+          # wrapper may regenerate this coherence marker.
+          export AFW_FINITE_RESTORE_ORIGINAL_PID=$$
+          exec node scripts/run-qa-finite-trial-finalizer.mjs restore
+      - uses: actions/upload-artifact@v4
+        if: always()
+        with:
+          name: afw-finite-finalizer-${{ github.run_id }}-${{ github.run_attempt }}
+          path: afw-finite-result.json
+          if-no-files-found: error
+          retention-days: 7

~~~~~~~~~~

## .github/workflows/afw-finite-native-package.yml

~~~~~~~~~~diff
diff --git a/.github/workflows/afw-finite-native-package.yml b/.github/workflows/afw-finite-native-package.yml
--- /dev/null
+++ b/.github/workflows/afw-finite-native-package.yml
@@ -0,0 +1,30 @@
+name: AFW finite native package
+on:
+  push:
+    branches: [main]
+permissions:
+  contents: read
+  actions: read
+jobs:
+  package:
+    runs-on: ubuntu-24.04
+    timeout-minutes: 8
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: 22
+          cache: npm
+      - run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: Complete source and historical qualification
+        run: node scripts/build-finite-native-package.mjs "${{ github.sha }}"
+      # No upload step while Native5/4C2/4C3, privacy-qualified historical
+      # inputs, exact locator and rollback compatibility remain unqualified.
+      # Future exact six files: manifest.json, qaLive/index.mjs,
+      # qaClosed/closed-rollback.mjs, canaryLive/index.mjs,
+      # canaryClosed/index.mjs, operatorClosed/index.mjs.
+      # Eligible artifact name will be afw-finite-native-package-<M>.

~~~~~~~~~~

## .github/workflows/afw-finite-qa-bootstrap.yml

~~~~~~~~~~diff
diff --git a/.github/workflows/afw-finite-qa-bootstrap.yml b/.github/workflows/afw-finite-qa-bootstrap.yml
--- /dev/null
+++ b/.github/workflows/afw-finite-qa-bootstrap.yml
@@ -0,0 +1,37 @@
+# SOURCE definition only; separate owner command after approved initial publication.
+name: afw-finite-qa-bootstrap
+run-name: AFW finite QA bootstrap comment-${{ github.event.comment.id }} source-${{ github.sha }}
+on:
+  issue_comment:
+    types: [created]
+permissions:
+  contents: read
+jobs:
+  publish:
+    if: >-
+      ${{ github.event_name == 'issue_comment' && github.event.action == 'created' && github.ref == 'refs/heads/main' && github.run_attempt == '1' && github.event.repository.id == 1347578006 && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.event.issue.number == 497 && !github.event.issue.pull_request && github.event.comment.user.id == 290715446 && github.event.comment.user.login == 'tokenizartinfo-ops' && github.event.comment.user.type == 'User' && github.event.sender.id == 290715446 && github.event.sender.login == 'tokenizartinfo-ops' && github.event.sender.type == 'User' && github.event.comment.author_association == 'OWNER' && github.event.comment.body == format('/afw-qa-finite-bootstrap v1 {0}', github.sha) }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 5
+    environment: afw-qa-cloud-closed-rollback
+    permissions:
+      contents: write
+      actions: read
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: 22
+      - run: npm ci --ignore-scripts --no-audit --no-fund
+      - name: qa-bootstrap-provenance
+        id: finite_bootstrap_once
+        env:
+          AFW_QA_CLOSED_TOKEN: ${{ secrets.AFW_QA_CLOSED_TOKEN }}
+          GITHUB_TOKEN: ${{ github.token }}
+        shell: bash
+        run: |
+          export AFW_FINITE_BOOTSTRAP_ORIGINAL_PID=$$
+          exec node scripts/run-qa-finite-bootstrap.mjs

~~~~~~~~~~

## db/finite-preparation-issuer-fences.sql

~~~~~~~~~~diff
diff --git a/db/finite-preparation-issuer-fences.sql b/db/finite-preparation-issuer-fences.sql
--- /dev/null
+++ b/db/finite-preparation-issuer-fences.sql
@@ -0,0 +1,21 @@
+-- SOURCE ONLY. No runtime installation or remote DDL authorization.
+CREATE TABLE finite_preparation_issuer_fences (
+ preconnection_id TEXT PRIMARY KEY NOT NULL CHECK (length(preconnection_id)=64 AND preconnection_id NOT GLOB '*[^a-f0-9]*'),
+ authorization_hash TEXT UNIQUE NOT NULL CHECK (length(authorization_hash)=64 AND authorization_hash NOT GLOB '*[^a-f0-9]*'),
+ grant_id TEXT UNIQUE NOT NULL CHECK (length(grant_id)=36 AND substr(grant_id,9,1)='-' AND substr(grant_id,14,1)='-' AND substr(grant_id,19,1)='-' AND substr(grant_id,24,1)='-' AND length(replace(grant_id,'-',''))=32 AND replace(grant_id,'-','') NOT GLOB '*[^a-f0-9]*'),
+ enrollment_hash TEXT NOT NULL CHECK (length(enrollment_hash)=64 AND enrollment_hash NOT GLOB '*[^a-f0-9]*'),
+ identity_hash TEXT NOT NULL CHECK (length(identity_hash)=64 AND identity_hash NOT GLOB '*[^a-f0-9]*'),
+ reserved_at INTEGER NOT NULL CHECK (typeof(reserved_at)='integer' AND reserved_at>=0),
+ forward_until INTEGER NOT NULL CHECK (typeof(forward_until)='integer'),
+ cleanup_until INTEGER NOT NULL CHECK (typeof(cleanup_until)='integer' AND cleanup_until<=8640000000000000),
+ fence_request_id TEXT NULL CHECK (fence_request_id IS NULL OR (length(fence_request_id)=36 AND substr(fence_request_id,9,1)='-' AND substr(fence_request_id,14,1)='-' AND substr(fence_request_id,19,1)='-' AND substr(fence_request_id,24,1)='-' AND length(replace(fence_request_id,'-',''))=32 AND replace(fence_request_id,'-','') NOT GLOB '*[^a-f0-9]*')),
+ fenced_at INTEGER NULL CHECK (fenced_at IS NULL OR (typeof(fenced_at)='integer' AND reserved_at<=fenced_at AND fenced_at<cleanup_until)),
+ CHECK (reserved_at<forward_until AND forward_until<cleanup_until),
+ CHECK ((fence_request_id IS NULL)=(fenced_at IS NULL))
+);
+
+CREATE TRIGGER finite_preparation_issuer_fences_no_delete BEFORE DELETE ON finite_preparation_issuer_fences BEGIN SELECT RAISE(ABORT,'issuer fence retained'); END;
+
+CREATE TRIGGER finite_preparation_issuer_fences_immutable_identity BEFORE UPDATE ON finite_preparation_issuer_fences WHEN NEW.preconnection_id IS NOT OLD.preconnection_id OR NEW.authorization_hash IS NOT OLD.authorization_hash OR NEW.grant_id IS NOT OLD.grant_id OR NEW.enrollment_hash IS NOT OLD.enrollment_hash OR NEW.identity_hash IS NOT OLD.identity_hash OR NEW.reserved_at IS NOT OLD.reserved_at OR NEW.forward_until IS NOT OLD.forward_until OR NEW.cleanup_until IS NOT OLD.cleanup_until BEGIN SELECT RAISE(ABORT,'issuer identity immutable'); END;
+
+CREATE TRIGGER finite_preparation_issuer_fences_terminal_fence BEFORE UPDATE ON finite_preparation_issuer_fences WHEN OLD.fenced_at IS NOT NULL AND (NEW.fenced_at IS NOT OLD.fenced_at OR NEW.fence_request_id IS NOT OLD.fence_request_id) BEGIN SELECT RAISE(ABORT,'issuer fence terminal'); END;

~~~~~~~~~~

## wrangler.independent-closure-qa.finite.jsonc

~~~~~~~~~~diff
diff --git a/wrangler.independent-closure-qa.finite.jsonc b/wrangler.independent-closure-qa.finite.jsonc
--- /dev/null
+++ b/wrangler.independent-closure-qa.finite.jsonc
@@ -0,0 +1,128 @@
+{
+  "name": "agent-friendly-web-independent-closure-qa",
+  "account_id": "85d0d5dadac3341a564f22ce885e9eec",
+  "main": "worker/independent-closure/finite.mjs",
+  "compatibility_date": "2026-09-07",
+  "workers_dev": false,
+  "preview_urls": false,
+  "routes": [],
+  "triggers": {
+    "crons": []
+  },
+  "durable_objects": {
+    "bindings": [
+      {
+        "name": "AFW_INDEPENDENT_CLOSURE",
+        "class_name": "IndependentClosure"
+      },
+      {
+        "name": "AFW_QA_PREREGISTRY",
+        "class_name": "PrivateQaPreregistration"
+      },
+      {
+        "name": "AFW_MCP_CLOSURE_NODE",
+        "class_name": "AfwOwnEventNode",
+        "script_name": "agent-friendly-web-delegated-canary"
+      },
+      {
+        "name": "AFW_RELEASE_EVENTS_NODE",
+        "class_name": "AfwOwnEventNode",
+        "script_name": "agent-friendly-web-delegated-canary"
+      }
+    ]
+  },
+  "migrations": [
+    {
+      "tag": "afw-own-qa-closed-v1",
+      "new_sqlite_classes": [
+        "IndependentClosure"
+      ]
+    },
+    {
+      "tag": "afw-private-preregistry-v1",
+      "new_sqlite_classes": [
+        "PrivateQaPreregistration"
+      ]
+    }
+  ],
+  "d1_databases": [
+    {
+      "database_id": "676ca49e-af71-4f2f-a12d-11f13de78a51",
+      "database_name": "agent-friendly-web-independent-closure-qa",
+      "binding": "AFW_QA_DB"
+    },
+    {
+      "binding": "RELEASE_DB",
+      "database_name": "agent-friendly-web-delegated-canary",
+      "database_id": "6a728254-1494-4039-802e-b39288a55fcc"
+    },
+    {
+      "binding": "AFW_QA_DOSSIER_DB",
+      "database_name": "agent-friendly-web-delegated-canary",
+      "database_id": "6a728254-1494-4039-802e-b39288a55fcc"
+    }
+  ],
+  "kv_namespaces": [
+    {
+      "binding": "AFW_FINITE_OWNER_OAUTH_KV",
+      "id": "6b94ff702e504e14a7730cee73a0f6ff"
+    }
+  ],
+  "workflows": [
+    {
+      "name": "afw-own-qa-private-bootstrap",
+      "binding": "AFW_QA_BOOTSTRAP",
+      "class_name": "PrivateQaBootstrap"
+    },
+    {
+      "name": "afw-own-qa-private-confirmation",
+      "binding": "AFW_QA_NAMED_CONFIRMATION",
+      "class_name": "PrivateQaNamedConfirmation"
+    }
+  ],
+  "ratelimits": [
+    {
+      "name": "AFW_QA_OCCURRENCE_RATE_LIMITER",
+      "namespace_id": "2026101003",
+      "simple": {
+        "limit": 10,
+        "period": 60
+      }
+    }
+  ],
+  "vars": {
+    "AFW_QA_HTTP_ENABLED": "false",
+    "AFW_QA_HTTP_POLICY": "",
+    "AFW_QA_BOOTSTRAP_ENABLED": "false",
+    "AFW_QA_PREREGISTRATION": "",
+    "AFW_QA_CHALLENGE_ENABLED": "false",
+    "AFW_QA_CHALLENGE_IDENTITY": "",
+    "AFW_MCP_CLOSURE_ENABLED": "false",
+    "AFW_MCP_CLOSURE_POLICY": "",
+    "AFW_MCP_READER_PROBE_ENABLED": "false",
+    "AFW_MCP_READER_PROBE_POLICY": "",
+    "AFW_MCP_PUBLISHER_PROBE_ENABLED": "false",
+    "AFW_MCP_PUBLISHER_PROBE_POLICY": "",
+    "AFW_MCP_CLOSURE_DISPATCH_ENABLED": "false",
+    "AFW_MCP_CLOSURE_DISPATCH_POLICY": "",
+    "AFW_QA_ORIGINALS_ENABLED": "false",
+    "AFW_QA_PROVIDER_OBSERVATION_ENABLED": "false",
+    "AFW_QA_PRIMARY_RESERVATION_ENABLED": "false",
+    "AFW_QA_INSTALLATION_ENABLED": "false",
+    "AFW_QA_PRIMARY_CATALOG_ENABLED": "false",
+    "AFW_QA_PRIMARY_ADMISSION_ENABLED": "false",
+    "AFW_MCP_CLOSURE_REDUCTION_ENABLED": "false",
+    "AFW_RELEASE_OPERATOR_ENABLED": "true",
+    "AFW_RELEASE_WORKFLOW_ENABLED": "true",
+    "AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED": "true",
+    "AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED": "true"
+  },
+  "compatibility_flags": [
+    "nodejs_compat",
+    "enable_request_signal"
+  ],
+  "version_metadata": {
+    "binding": "AFW_QA_VERSION"
+  },
+  "tail_consumers": []
+}

~~~~~~~~~~

## wrangler.mcp-own.finite.jsonc

~~~~~~~~~~diff
diff --git a/wrangler.mcp-own.finite.jsonc b/wrangler.mcp-own.finite.jsonc
--- /dev/null
+++ b/wrangler.mcp-own.finite.jsonc
@@ -0,0 +1,100 @@
+{
+  "name": "agent-friendly-web-delegated-canary",
+  "account_id": "85d0d5dadac3341a564f22ce885e9eec",
+  "main": "worker/mcp-own/finite.mjs",
+  "compatibility_date": "2026-09-07",
+  "compatibility_flags": [
+    "nodejs_compat",
+    "global_fetch_strictly_public",
+    "enable_request_signal"
+  ],
+  "workers_dev": false,
+  "preview_urls": false,
+  "routes": [],
+  "triggers": {
+    "crons": []
+  },
+  "tail_consumers": [],
+  "observability": {
+    "enabled": false
+  },
+  "vars": {
+    "AFW_DELEGATED_OAUTH_ENABLED": "false",
+    "AFW_OAUTH_REFRESH_ENABLED": "false",
+    "AFW_OAUTH_SERVICE_MODE": "window",
+    "AFW_OAUTH_ISSUER": "https://delegated-canary.agentfriendlyweb.dev",
+    "AFW_OAUTH_RESOURCE": "https://delegated-canary.agentfriendlyweb.dev/mcp",
+    "AFW_DOSSIER_EVENTS_ENABLED": "true",
+    "AFW_DOSSIER_SUCCESSOR_ENABLED": "true",
+    "AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED": "true",
+    "AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED": "false",
+    "AFW_DOSSIER_RETIREMENT_READ_ENABLED": "false",
+    "AFW_DOSSIER_OWN_SAVE_ENABLED": "false",
+    "AFW_DOSSIER_MONITORING_OWNER_ENABLED": "false",
+    "AFW_DOSSIER_EVENTS_NODE_NAME": "afw-own-event-first-successor-v1"
+  },
+  "d1_databases": [
+    {
+      "binding": "DB",
+      "database_name": "agent-friendly-web-delegated-canary",
+      "database_id": "6a728254-1494-4039-802e-b39288a55fcc"
+    }
+  ],
+  "kv_namespaces": [
+    {
+      "binding": "OAUTH_KV",
+      "id": "6b94ff702e504e14a7730cee73a0f6ff"
+    }
+  ],
+  "durable_objects": {
+    "bindings": [
+      {
+        "name": "AFW_DOSSIER_EVENTS_NODE",
+        "class_name": "AfwOwnEventNode"
+      },
+      {
+        "name": "AFW_FINITE_TRIAL_CONTROL",
+        "class_name": "IndependentClosure",
+        "script_name": "agent-friendly-web-independent-closure-qa"
+      }
+    ]
+  },
+  "version_metadata": {
+    "binding": "AFW_FINITE_TRIAL_VERSION"
+  },
+  "exports": {
+    "default": {
+      "type": "worker"
+    },
+    "AfwNodeControl": {
+      "type": "worker"
+    },
+    "AfwOwnEventNode": {
+      "type": "durable-object",
+      "storage": "sqlite",
+      "container": "agent-friendly-web-delegated-canary-afwowneventnode"
+    }
+  },
+  "unsafe": {
+    "metadata": {
+      "exports": {
+        "default": {
+          "type": "worker"
+        },
+        "AfwNodeControl": {
+          "type": "worker"
+        },
+        "AfwOwnEventNode": {
+          "type": "durable-object",
+          "storage": "sqlite",
+          "container": "agent-friendly-web-delegated-canary-afwowneventnode"
+        }
+      },
+      "containers": [
+        {
+          "class_name": "AfwOwnEventNode"
+        }
+      ]
+    }
+  }
+}

~~~~~~~~~~
