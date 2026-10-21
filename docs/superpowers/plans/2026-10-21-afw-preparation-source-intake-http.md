# AFW private own-source intake HTTP implementation plan
> Execute inline with executing-plans/TDD; one fresh whole-branch reviewer, no implementer agents.
Spec: ../specs/2026-10-21-afw-preparation-source-intake-http.md
Cloud-first: isolated GitHub branch; no local clone/install/build/container/download. Existing tiny local checkpoint only.
Preflight interfaces: signed-exp542->trusted identity and CSRF session binding; original lease->HTTP/core same5s; store541/543->create/inspect wrappers only; renderer<-allowlisted status/original reviewed inputs, no actor/auth material.
1. Add native characterization test + CI-only fixture + focalworkflow. Explicit missingfactory assertion beforebundle RED.
2. Detached HTTP host and form view; existing store/identity/lease unchanged. GETnoDB, explicitsave vsreadonlyinspect, CSRFboundSession256bitHMAC/Origin/limits.
3. Focalnative + wholeCI/lint/five builds in Actions; diagnose failures proportionally.
4. One freshcontext wholebranch review. Critical/Important:one author RED→GREEN pass, no re-review. Minor ledger.
5. ExactHEAD merge/main acceptance, issue497/continuity. Do not deploy/open/grant/custody secrets from this source plan.
Rollback source revert. UIbrowserQA and independent source route composition are subsequent bounded blocks.
