# Finite rehearsal phase boundaries — design checkpoint 31 October 2026

Project AFW. Reviewed against exact frozen315 code (source2a4773737764c5038aaa0b3528b43df2a0572441) and current QA source. DESIGN ONLY; no runtime, consent, ARM or schedule created by this document. operationalReadiness=false.

## Independent clocks
The nominal owner/monitor grant is [N0,N1], at most ten minutes. Keep candidate, capsule, admission and nominal dispatch expiry at N1; never extend a grant by presenting a cleanup window. Current resolver675 and named authorization must deny after N1, withdrawal or changed HEAD.

A finite administrative cleanup window may end after N1, but must be declared once, hashed into the immutable packet and armed against the final QA UUID/source before nominal work. Frozen315 permission-withdrawal supports expiry <=Events.expiresAt+600000, its own span<=600000 and historical cleanup. Monitoring consent revoke and runtime.close do not require a live grant. This capability is not an unbounded generic close bypass: exact source, target, history, control, time and stop fences still apply.

Reviewed example, not a scheduler SLA:
- N1<=N0+600s. Require at least180s remaining at readiness/admission.
- Prepared dispatch D is absolute and aligned, before N1-180s; D+30s<=C0.
- C0=N1-60s: scheduled permission withdrawal/physical close begins.
- C1=N1+180s: independent canary cleanup authority ends.
- F1=N1+300s: independent QA finalizer authority ends.
A withdrawal policy [C0,C1] spans four minutes; originalConsent remains [N0,N1]. One policy spanning the whole nominal ten minutes plus extra cleanup would exceed the existing span cap and must not be used.

Before C0, a separate fixed permissions-only [N0,N1] authority can revoke OAuth/monitor access. It must not claim immediate physical stop or manufacture a tombstone/physicalStop witness. Physical close stays scheduled for C0 unless an additional bounded early-stop authority is separately qualified. Native cleanup should pause the exact native watch while its unsubscribe operation is still authorized; pause alone is not events/unsubscribe.

## Current source and follow-on changes
Assembler677 currently conservatively requires closure.expiresAt<=nominal.expiresAt; this remains safe and unchanged. A future TDD increment may allow only closure.start>=N0 and <N1, closure.span<=ten minutes, closure.end<=N1+one fixed cap, exact withdrawal-window coverage and legacy prepared start==closure.start. It must not change consent/candidate/capsule/dispatch deadlines.

V2 must distinguish nominal-withdrawn/expired from cleanup-active. Guard cleanup must use the exact INFO/packet/history and separate control until C1, not live readArmed/675 after N1. Nominal withdrawal must not abort cleanup. No fresh ticks, lease or grant from resume/retry. Restoration POST unknown ACK stays issued; only read-only reconciliation, never another POST.

The external QA finalizer has its own fixed scope through F1. It may restore QA only after canary closed, guard terminal and physical/no-admission evidence as appropriate. If C1/F1 expires without required evidence: unknown/admin-pending, never forced allClosed or automatic extension.

## Qualified building blocks and remaining gates
31Oct19:00UTC own native oneoff B actually paused exact inert A before its19:04UTC due time; separate execution receipt read. This proves a finite native cleanup action, not webhook unsubscribe or PC-off. 31Oct17:08UTC GHA restored an already closed QA candidate exactly once using a create-once claim. This proves closed-artifact cloud recovery, not this full finalizer.

Still qualify: final fixed QA artifact/profile/native UUID, explicit dossier capability and private packet administrative channel, V2 guard/journals and both cleanup phases, actual nominal composition, finite external finalizer, native task/account/link mapping and unsubscribe receipt, useful delivery/review/physical stop and the actual PC-off observation. Do not spend the unique first-successor occurrence on an extra PC-on rehearsal. Do not treat this design, source CI, a scheduled timestamp, YAML or API200 as an execution or liveness witness.
