# Gate 6D.4B Final Fix Implementer Report

**Status:** `implementation_fixed_pending_final_rereview`

**Baseline:** `0a57d9f89cdbdbd8fb511a61eb40e4b19a71a505`

**Implementation commit:** `582b62d0968c3891d437ba0570492a1d2b998d0a`

**Environment:** `local_only`

## Root Causes

1. The erasure batch used the deterministic intake tombstone key plus a millisecond timestamp as proof that the current invocation owned the lead update. Two different erasure requests with the same timestamp could therefore serialize, yet the loser still matched the winner's committed lead state. The loser then committed its own suppression purpose and `deleted` lifecycle event before post-commit change-count validation reported failure.
2. The contact-status resolver checked only that `state`, `erasedAt` and `restrictionState` were strings. Any empty `erasedAt` became active, any non-`restricted` restriction value became unrestricted, and any non-empty timestamp became erased. Contradictory, unknown and invalid persisted rows therefore failed open.

## RED Evidence

Command:

```powershell
node --test test/contact-privacy-erasure.test.mjs
```

Observed before production changes: exit `1`; `13/21` passed and `8/21` failed. The coordinated real SQLite/D1-adapter reproduction used different erasure idempotency keys, different suppression purposes and the exact same `2026-09-03T22:00:00.000Z` timestamp. Its failure snapshot contained:

- two `deleted` lifecycle events, one for each erasure key;
- two suppressions, including loser-only `commercial_contact`;
- a loser result sanitized to `{ error: 'privacy_erasure_failed' }` after those writes had committed;
- no rejection for `state='erased'` with empty `erasedAt`;
- no rejection for `restrictionState='unexpected'`;
- no rejection for non-empty invalid `erasedAt='2026-09-31T22:00:00.000Z'`.

The other RED failures were expected contract assertions for the new five-statement ownership protocol, not unrelated baseline regressions.

## Implementation

- The lead update now writes an invocation-unique SHA-256 ownership proof derived from the canonical request hash and both generated per-invocation UUIDs into the existing `request_hash` column.
- CRM tombstoning, suppression persistence and lifecycle insertion each require that exact proof inside the same D1 batch.
- A fifth guarded statement clears `request_hash` before commit. A serialized loser changes zero rows throughout the transaction and resolves from the winner's committed lifecycle and suppression state.
- Committed-state validation follows the winning lifecycle idempotency key, allowing a different-purpose loser to return the existing bounded duplicate result without accepting ambiguous suppression rows.
- The resolver now allowlists `new`/`erased` contact states and `none`/`restricted` restriction states, validates strict timezone-bearing timestamps, and rejects contradictory combinations through `privacy_erasure_failed`.
- No schema or migration was added or modified. Create -> erase -> exact intake replay protection and all existing bounded return shapes remain intact.

## GREEN Evidence

| Command | Exit | Result |
| --- | ---: | --- |
| `node --test test/contact-privacy-erasure.test.mjs` | `0` | `21/21` passed; `0` failed. |
| `node --test test/contact-privacy-policy.test.mjs test/block6d4-local-migration.test.mjs test/contact-privacy-d1-store.test.mjs test/contact-privacy-erasure.test.mjs test/contact-privacy-contract.test.mjs test/contact-d1-store.test.mjs test/contact-intake.test.mjs test/contact-gate.test.mjs test/synthetic-contact-canary.test.mjs test/crm-lite.test.mjs test/synthetic-crm-persistence.test.mjs test/synthetic-crm-readonly.test.mjs` | `0` | `93/93` passed; `0` failed, skipped or cancelled. |
| `npm test` | `0` | `588/588` passed; `0` failed, skipped or cancelled. |
| `npm run lint` | `0` | `0` errors; `1` pre-existing `@next/next/no-img-element` warning at `app/components/comic-home-intro.tsx:36`. |
| `npm run build` | `0` | Vinext completed `5/5` phases and printed `Build complete.` |
| `git diff --check` | `0` | No whitespace errors. |

## Files

- `lib/contact-privacy-erasure.mjs`
- `test/contact-privacy-erasure.test.mjs`
- `docs/BLOCK-6D4B-CONTACT-PRIVACY-LOCAL-GATE-2026-09-03.md`
- `.superpowers/sdd/2026-09-03-agent-friendly-web-contact-privacy-lifecycle-v1/final-fix-implementer-report.md`

## Concerns

- Final independent whole-branch re-review is still required; this report does not claim `APPROVED`.
- The host used Node `v22.17.0` while `package.json` requires Node `>=22.18.0`.
- Node emitted its experimental SQLite warning, lint retained one pre-existing image warning, and Vinext retained its route-classification and plugin-timing notices.
- No Cloudflare resource, remote D1, deploy, traffic, email, real contact, Tokenizart resource, `*.chatgpt.site` surface, runtime flag or migration was touched.
