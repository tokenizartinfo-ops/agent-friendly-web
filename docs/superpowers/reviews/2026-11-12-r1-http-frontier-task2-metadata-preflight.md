# Task2 pre-activation metadata read — finite routing diagnosis

Fresh executor used generic github_fetch GET /repos/tokenizartinfo-ops/agent-friendly-web/actions/artifacts/13949168304 (metadata only). isError:true; its local wrapper threw 'preflight 3' before retaining underlying tool error. Exact HTTP/error category unavailable: no evidence of expiry, credentials, unsupported route or GitHub service fault. No private download/log/key/Original payload access, no activation and no Source mutation at this stage. Existing brief correctly required STOP; executor closing/reconciling without repeat.

Ruling: Root may make ONE metadata-only call via the documented purpose-built github_fetch_workflow_run_artifacts for fixed Original run43229236340, and select only Original artifact13949168304. This is a distinct supported metadata route, not another attempt at the failed generic route, a binary download or a job rerun. Cost if wrong: one bounded metadata read, no Source/runtime/key effect. The earlier generic error is not by itself an access/expiry diagnosis. If dedicated read also fails or cannot establish exact artifact on its first page, preserve sane unknown and STOP without retries/credentials/activation. If primary metadata confirms exact ID/digest/size/context/unexpired, Root may issue a new preflight release after fresh Source closed readback; no actual run has been consumed, but no automatic activation from this ruling alone.

PROJECTAFW/REPOtokenizartinfo-ops/agent-friendly-web1347578006/ENVGitHubmetadata/ORIGINGitHubconnector/RESOURCE_TYPEworkflowrunartifactinventory/RESOURCE_ID43229236340→13949168304/ALLOWED_ACTIONONElistmetadataread/ROLLBACKnone(readonly). All Original privacy and five readinessfalse limits unchanged. No human step before08:00Argentina.

## Supported-route primary metadata result

ONE purpose-built call succeeded. Fixed run first page listed6 artifacts and established exact ID13949168304/context/digest/size/expiredfalse. No binary/log/key read. This does not establish why generic fetch errored.

```json
{
  "tool": "github_fetch_workflow_run_artifacts",
  "run": 43229236340,
  "firstPageListed": 6,
  "id": 13949168304,
  "zipBytes": 13680188,
  "zipSha256": "8a408941c11e93e342fe2ccbf09763caf04e96fc5a1aaf12bde52da0fcaf19d5",
  "expired": false,
  "expiresAt": "2026-11-19T13:45:23Z",
  "createdAt": "2026-11-12T13:45:26Z",
  "repositoryId": 1347578006,
  "headRepositoryId": 1347578006,
  "headBranch": "feat/finite-native-cleanup-20261101",
  "headSha": "19789b5f31935e0b5be00cbb24c5f45de2a0100a",
  "binaryDownloaded": false,
  "privateProducerLogsRead": false,
  "keyRead": false,
  "genericErrorCause": "unknown"
}
```

Pre-activation executor STOPPED after report-only close223e1f7054744969939cfd4f2a2c6a5dacfe843f/tree25d4e16715ccae768e240198d24980fe7f30241d/reportd77b2ab223730ffb3507ee3e93ffc069386818f3/843009chars/full797305prefix. Root independently verified whole3194/netreport-only/all3193others/F7/main/fiveactive0. No actual run/attempt/jobs or current SAFE was created. Existing Task1 qualification unchanged; no Source implementation changed.
