# Reachable launch-source integration gate — static Source review, 2026-11-14

Scope: AFW only; repo tokenizartinfo-ops/agent-friendly-web; Source1e4026ceb0c43efe1ccd815a874e10375646753b; cloudGitDATAread-only. No localSource execution, provider/session/key read, runtimecall, build or publish. Historical comment labels are not treated as facts without tracing the mounted path.

Current compiler scripts/build-finite-native-package.mjs (blobe8a73ce9f541993657bf8bf4c9bd8d3b02b8598d) can compile staging canaryLive andqaLive/sourceTree/residency but its complete-package export still deliberatelyfails afterstaging. Workflow92729f5952fd2d8bec107b4072bb569216d21863 has no upload. That is our source integration boundary, independent of currentproviderstate.

A launcher function DOESexist: lib/mcp-qa-finite-launcher.mjs6c9e59f8d75bcb56a692bf70e50a678cfca0308f, fixed nativeWorkflow operationfinite_nominal_launcher, prepares/readbacks actor thenwaits/callscreateFiniteNominalChild underoriginal5s steps/no retries. Do not describe this wholecomponent as absent merely because the olderbuildercomment mentionsNative5.

Concrete reachable missing C2 seam:
1. worker/independent-closure/finite.mjs (compiledqaLive entry) mounts PrivateQaBootstrap.run with FINITE_LAUNCHER_OPERATION→runPrivateQaFiniteLauncher, and IndependentClosure extends ClosedIndependentClosure without replacing its nominalpublicmethods.
2. worker/independent-closure/index.mjs2847bf94f2aeca072f66866ed1bce07e9fcd4613 lines188–195 public prepareFiniteNominalLaunch/createFiniteNominalChild/readFiniteNominalLaunch use private#finiteLaunch→runPrivateQaFiniteLaunchOperation.
3. lib/mcp-qa-finite-launch.mjs3c5716076be75b28388579ce81c2773e2dec6027 lines41/42/55 resolvePrivateQaFiniteLaunchContext/readPrivateQaFiniteLaunchMaterial/readPrivateQaFiniteLaunchOperations.
4. Those exactthree exports in lib/mcp-qa-finite-launch-source.mjs420ce9d719836df5c16e82ec67f8c0b63d03e623 are constantunavailable throwers. Thus withotherwiseeligibleinputs thismountednominalroute cannotproduce the required source-derivedcontext/material/operations fromcurrentcode. No realrequest wasmade; earlier gates mayrejectbeforethisseam. This is distinct from assuming ALLgenericstubsareused byinitial-owner route.

Existingactualsource receiver createFiniteOwnerNativeReceiver e760b3579a38f1dbb73b177bb73b06d814eb881f and initial-owner-specificroute remainvaluable; avoidduplicates. FutureC2design must reuse actualinitial/setup/observer/readiness/anchor/capsule/ownerprovenance gates andpreserveone-ownedoccurrence; cannotreplaceunavailablewithcallerboolean/DTO orblindclock/tokenrenewal. Historical-source reachableCEILING3nov02:59UTC still needs separatefactualreconciliation. Wholecoherent16/source-nativequalification remains ahead of livepackagepromotion.

No new implementation is authorized by this trace alone; Root userauthorizedroadmapcontinues aftercurrentdiagnosticcontractfixandcause-specificreadonlyresolution. Sevennonclaimsfalse. This document narrows backlog to a genuine reachable seam, not new runtime activity.
