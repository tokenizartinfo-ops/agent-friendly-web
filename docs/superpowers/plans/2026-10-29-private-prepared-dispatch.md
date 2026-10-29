# Private dispatch and closure for the current first-successor trial

Status: source preparation; no remote runtime authorization is created by this document.

The synthetic save currently writes its event but delivery is only wired to the native Cron handler. The existing private restoration requires empty schedules and cannot remove Cron. Add one private Workflow stage before the existing permission reduction and restoration, using the exact already-saved event and original subscription receipt. No periodic trigger, public route, callback, consumer, new namespace or independent budget.

This serves the existing first-successor trial, not the later occurrence project/PR571. Preserve all consumed original journals and first-successor budgets. Do not copy or reset custody.

1. RED: commit tests for a prepared event bound to the live configuration, one durable dispatch claim, uncertain ACK without replay, and dispatch failure followed by the original closure.
2. Implement a strict immutable dispatch policy, snapshot qualification and private actor RPC. Requalify both deployment pointers before and after the durable claim. All reads are scoped and all mutation flags remain off until a separately prepared finite trial.
3. Compose dispatch → permission reduction → restoration in the existing private Workflow. A dispatch error must not suppress closure. No automatic retry, deadline renewal, cached freshness or useful-review claim.
4. Run unit and native workerd/Workflow tests in GitHub Actions; independent fresh-context review of the complete branch; merge only after fixes and green checks.
5. Preserve a closed QA build and its rollback before remote adoption. Prepare the complete live assembly and receiver before requesting any human grant. Actual event delivery, useful cloud review, native withdrawal, physical stop, restored configuration and PC-off remain separate gates.

Transport scope: reuse deliverOwnSaved(eventId), which resolves the primary subscription receipt and original event on the server. The dispatch policy is an issue deadline, not cancellation of an already-issued native call; the original grant/window and native budget continue to bound execution. Expose no callback or credentials in the Workflow input/output. Unknown ACK is terminal for dispatch. Existing armed-control withdrawal remains effective.

Validation must cover code/config/pointer drift; exact event-plan and key mismatch; unknown fields; clock/deadline failure; disabled/replaced authority; control withdrawal; durable replay after actor recreation; native RPC disposer; native Workflow order and closure despite a thrown or uncertain dispatch. No real customer data, OAuth, Container activation or Max contact in CI.

Integration finding: the existing form uses AFW_DOSSIER_OWN_SAVE_KEY as a nonsecret UUID idempotency reference. The private materializer currently rejects every plaintext *_KEY, including that reference. Add an exact name/type/three-field UUID exception only; retain rejection of all credential values, other names and extra fields. This is private data assembly, not grant or execution authority. Verify before the full live assembly, with no runtime changes.
