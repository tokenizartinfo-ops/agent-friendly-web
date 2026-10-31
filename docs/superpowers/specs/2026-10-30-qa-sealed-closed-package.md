# Sealed closed QA package · 30 October 2026

AFW own source and GitHub Actions only. Depends on accepted closed-context Workflow/DO source (PR664). No OAuth, account/grant, credential, D1, namespace, Container, Workflow instance or runtime mutation.

## Builder
Fixed index and compatible closed-rollback entrypoints, esbuild write:false, embedded QA source revision from exact accepted Git HEAD. Existing source verifier before/after and exact git-show byte comparisons for both Wrangler configs and fixed build workflow. Each artifact independently <=1MiB, exact export set, hashes/bytes/source tree/config hashes/workflow hash in manifest. Existing confirmation cap unchanged. No ambient source/caller-selected entrypoint, no dependency attestation beyond accepted lockfile/CI npm ci.

The closed candidate and rollback configurations are identical except main source entrypoint: same routes, DOs and migrations, isolated QA_DB, external original node binding, compatibility flags and limiter; all14 activation flags literalfalse, seven policies empty. Both add version_metadata AFW_QA_VERSION and the fixed new private QA Workflow declaration. No own-dossier D1 alias yet. Remote bindings and secret inheritance are NOT established by this source snapshot: manifest.remoteConfigurationPreserved=false.

## Pipeline
Add scripts/** and both configs to source path filters. Build once, then Wrangler --no-bundle --dry-run for BOTH sealed modules using their paired closed config. Exact one-module inventories and byte/hash equality against sealed artifacts; preserve both dry-run modules, sealed modules and manifests7days. No Cloudflare credentials/upload/invocation.

Official references:
- https://developers.cloudflare.com/workers/wrangler/commands/workers/ (no-bundle)
- https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/

## Verification
Reject missing/open flags, missing/renamed metadata, wrong Workflow, added resource/cron/migration/route, wrong source revision and caller-selected entry. Actual workerd executes BOTH sealed artifacts with fixed DO and Workflow using synthetic UUID and the embedded real source revision, HTTP404/no outbound. Wrangler exact bytes checked separately in Actions. This is source/package evidence, not real CF provenance/availability/guard or PC-off.

## Later remote preparation
Fresh account/resource/provider/closed state/module inventory and preserved recoverable compatible version required before mutation. The current remote QA version78af4f79 lacks the new class, so it is not by itself a compatible rollback for the new Workflow definition. Upload compatible closed code and register only the own closed definition with a bounded, reviewed sequence; correlate final version metadata and actual executing contexts. No new native instance or old plan replay from this PR. Nominal generation, independent guard/finalizer, subscription/useful review/native withdrawal and PC-off remain pending.
