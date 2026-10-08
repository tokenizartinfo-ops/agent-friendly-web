# Finite independent closure alarm lifecycle

Status: design, not hosted or operational. Base main eb65e0517c8c1685ad6ead022ef78a4a28037a95 (PR334).

## Result

A private Durable Object owns one immutable closure plan and one alarm. It invokes the existing independent closure coordinator with the D1 primary-state adapters. This prepares a closure path independent of the Operations runner; it does not itself prove independent administrative restoration or PC-off acceptance.

## Boundary and decisions

- Trusted server configuration only: exact approved manifest and plan, pinned occurrence, baseline digest and deadline. Never accept caller-supplied callbacks, service credentials or administrative receipts.
- Start closed: no public routes, workers.dev, cron, customer data or production database. A missing configured capability must deny arming. The actor and administrative custodian remain separate deployment gates.
- Persist configuration and the initial alarm in one storage transaction. Same-plan repeated configuration must not reset state, budget or alarm; a different plan is rejected. A storage failure is unknown, not armed.
- Persist a finite alarm invocation budget before invoking any capability. Maximum three invocations for the entire plan, including retries. At-least-once delivery cannot renew the budget. No permanent polling or guard.
- Serialize lifecycle events across awaited capability calls. Storage transactions alone do not serialize external effects. Use the coordinator's persisted issued reservation as the independent write fence.
- Initial alarm executes tick. Subsequent invocations first reconcile an issued step through primary readback, then execute tick only after that readback establishes the previous result. An unknown receipt cannot cause a write replay.
- A readback must attest the exact occurrence, deadline and baseline; D1 revocation and journal closure cannot attest administrative restoration. Missing administrative restoration returns intervention_required, never complete.
- Early delivery performs no action and preserves the scheduled deadline. Terminal success cancels further alarms. An ambiguous result may schedule only a bounded readback attempt; exhausting the budget persists intervention_required and cancels the alarm.
- Public fetch always returns 404. Private RPC exposes finite configure and sanitized status; no arbitrary execute endpoint. Status contains state/step/attempt count only, never approval manifests or secrets.

## Verification

Native workerd SQLite DO tests must exercise actual alarms, repeated configuration, changed-plan rejection, overlapping invocation, lost acknowledgement followed by primary readback, exhausted retries and missing administration. Effect counts must remain at most one per issued action. Recreate the actor against preserved storage when supported to verify constructor loading without rearming. Native local tests do not prove hosted restart durability, remote resource rollback or PC-off.

## Hosted acceptance gates

Before remote deployment identify account, dedicated Worker, isolated D1, DO namespace, allowed actions and recoverable rollback. Independent administrative custody must be usable without the local connector or Operations runner, scoped to the exact resources and checked through primary provider readback. Only then perform one own finite hosted occurrence; afterwards verify all flags, selectors, bindings, schedules and service identity against the pinned baseline. Max preview/approval/login remain subsequent gates.

Ruling: prepare lifecycle behind closed configuration before choosing administrative custody. Do not deploy a synthetic restored callback or advertise an independent closer while that capability is absent.
