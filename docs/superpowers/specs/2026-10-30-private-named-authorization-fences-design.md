# Private named authorization fences — design

Baseb625b787. Owner chose autonomous cloud-first preparation. This increment adds an internal asynchronous authorization checkpoint for a future QA-only named Workflow; it creates no class, binding, generation or runtime permission.

## Problem and decision

The shared runtime now accepts an explicit trusted bundle. The future confirmator must stop admitting subsequent operations after its primary guard has been observed withdrawn or changed. An initial armed snapshot is insufficient across provider, D1 and native RPC awaits.

Use an OPTIONAL trusted authorize(stage) callback, admitted ONLY for confirm_named. It must resolve exact true; false, undefined, rejection or malformed hook fails closed. Absence retains current legacy behavior and introduces no additional await. It is an internal constructor argument, never an event/payload/RPC parameter or independent grant of authority.

Do NOT wrap D1 statements or namespace RPC in generic async proxies. That hides original component assertions, can outlive a child lease, and can return a borrowed native RPC domain through another PromiseResolve. Instead call the hook within the existing components, then synchronously recheck their ORIGINAL clock/current assertion immediately before the native effect. Preserve qualified RPC boxing unchanged.

## Interfaces and boundaries

- runReleaseWorkflow({bundle,env,event,step,authorize?}).
- runReleaseOperator(bundle,env,args,lease?,observation?,authorize?).
- reserveReleaseSuccessor({...existing,authorize?}).
- createActivationJournal({...existing,authorize?}).
- createSuccessorReservation({...existing,authorize?}).

Hook stages are diagnostics of trusted code, not permissions or payload selectors. Gate Workflow admission before its first step; revalidate the original parent lease. Credential reads invoke the hook before accessing the secret and recheck current afterward. The primary publication lookup is fenced. The activation journal fences its primary read, attempt, receipt, acceptance and final completion; every await is followed by the existing local check. The successor path fences retirement/RPC admission and its final primary write/completion. A hook inside the existing readRetiredRpcReceipt invoke runs BEFORE current/assertReader and the unchanged return {value:await nativeRPC}; no raw-domain adapter is added.

Factories keep synchronous .withSession/.prepare/.bind calls. SQL strings, predicate values, writeDeadline, timeout caps, monotonic origins, challenged receipt validation and budget1 are unchanged. No child timeout starts anew after a fence. An unknown/lost ACK remains terminal.

Authorization lookup and D1 are not a distributed transaction: already-admitted/in-flight operations may complete. Promise only that no following operation is admitted after a fence observes failure, and preserve/reconcile any consumed effects. Do not claim zero commits after the withdrawal timestamp or physical stop.

## Proof

Native workerd/SQLite: an always-true hook preserves accepted named confirmation/reservation; false admission blocks before provider or attempts. False at activation attempt/receipt/acceptance and successor write produces the exact primary prefix already committed, with no later row or retry. Advance the original monotonic clock at activation/successor write fences while remaining inside the parent window: child deadlines must still block SQL. Confirm_named-only admission rejects a publication bundle supplied with a hook.

Tests must demonstrate the hook was actually reached/applied, not pass from setup errors. The metadata stage in createActivationObserver currently has only a five-second timer, not an original monotonic end check after readCredential. The new await exposes that latent gap: add a dedicated native RED at credential3, then an original monotonic end assertion before fetch and after awaited response/body reads. Do not restart its five seconds. Existing full suite and five build/package workflows must pass. New source is not deployed by this plan.

## Integration still pending

A later QA wrapper will bind authorize to the fixed private primary guard and compare its own version_metadata binding to the qualified generation UUID. armV2 must compare an expected uploaded UUID and root must read it back before named creation (no TOFU or WorkflowversionId inference). Guard must check its own current UUID too. Version metadata needs closed cloud proof in Workflow and DO contexts.

The legacy withdrawn control/journals stay intact; additive generation and reconciliation precede another trial. QA D1 capacity, artifact size/compatible rollback, fixed native Workflow inventory and fresh human consent are separate gates. operationalReadiness=false.
