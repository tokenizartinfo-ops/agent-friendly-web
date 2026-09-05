# Gate 6D.4B: Contact Privacy Lifecycle Local Evidence

**Status:** `local_gate_passed_after_independent_final_rereview`

**Environment:** `local_only`

**Worktree:** `C:\Users\gabri\OneDrive\Documentos\Tokenizart Repos\agent-friendly-web\.worktrees\company-building-capital-roadmap-v1`

**Branch:** `docs/company-building-capital-roadmap-v1`

**Task 6 baseline:** `782406a5ddb2b7be389bdff949977551410a8e11`

**Previously reviewed implementation head:** `0a57d9f89cdbdbd8fb511a61eb40e4b19a71a505`

**Final fix implementation commit:** `582b62d0968c3891d437ba0570492a1d2b998d0a`

**Final fix round-2 implementation commit:** `ddd6e71d3cdf7ba05a53f19b73575e8b9d27d98e`

**Final fix round-3 implementation commit:** `5415458ce5079f92461407be2b7f3d4a78336304`

**Final reviewed implementation head:** `e9b5978ae9ac0d549c986ab3dea79badbf23c9c4`

**Review state:** `APPROVED`; Critical `0`, Important `0`, Minor `0`, blocker `No`

## Scope and Observed State

| Boundary | Observed value |
| --- | --- |
| Remote migrations | `0` |
| Remote deploys | `0` |
| Real contacts accessed or processed | `0` |
| Emails sent | `0` |
| Tokenizart resources used | `false` |
| `*.chatgpt.site` resources used | `false` |
| `AFW_REAL_CONTACT_ENABLED` | `false` in base, canary and production |
| `AFW_PRIVACY_REQUESTS_ENABLED` | `false` in base, canary and production |
| `AFW_RETENTION_JOBS_ENABLED` | `false` in base, canary and production |
| `AFW_PRODUCT_UPDATES_ENABLED` | `false` in base, canary and production |

No Cloudflare resource was read or mutated. This final fix round ran no deploy command; remote deploys remain `0`.

## Reviewed Task 1-5 Commits

### Task 1: Pure privacy policy

- `8b520d62b5f415b76ae298fdc3e937fcb03426d2` - `feat: add executable contact privacy policy`
- `45d3e625eed0f5bdba7dda1ba34f8b79c00c14da` - `fix: harden contact privacy policy boundaries`

### Task 2: Additive D1 schema

- `6ff0021412916e622d26db6ce762adefb49f32d6` - `feat: add contact privacy lifecycle schema`
- `1c16fb8370395119732d15f7d6b5baa351223730` - `test: harden contact privacy migration coverage`

### Task 3: D1 privacy store

- `54b9ff4e475f6f56c58d39d1c67cb5543987aec9` - `feat: persist privacy metadata without PII`
- `5e5e4e66801a687f72a5cd75de9914f1d2a8868b` - `fix: canonicalize privacy store UUIDs`

### Task 4: Erasure and CRM tombstone

- `fcb0fcedb48f746b88dd64e3cdbbdab21fd34d2f` - `feat: add atomic contact erasure boundary`
- `5ea51f29e766863c69706bb431983e2d1c756463` - `fix: linearize contact erasure races`
- `34510c0ba5f5ae3316eaebb2b1a2667bc7af95ef` - `fix: make suppression conflicts atomic`

### Task 5: Contract, flags and documentation

- `782406a5ddb2b7be389bdff949977551410a8e11` - `docs: publish disabled privacy lifecycle contract`

### Whole-branch hardening

- `ce2747bc94f4240fa0c2a9203372edc73a2cf243` - `fix: harden contact privacy lifecycle`
- prevents an erased contact from being recreated by replaying the original intake request;
- resolves same-timestamp consent conflicts in favor of withdrawal or supersession;
- enforces a purpose-specific allowlist of approved consent-copy versions before D1 activity in the new consent lifecycle store.

### Final fix round

- `582b62d0968c3891d437ba0570492a1d2b998d0a` - `fix: close contact privacy lifecycle races`
- adds an invocation-unique in-transaction ownership proof so an equal-millisecond erasure loser cannot commit lifecycle or suppression writes;
- validates the persisted contact state, restriction state and erasure timestamp as one explicit fail-closed combination;
- preserves exact intake replay protection, bounded return contracts and the additive migration unchanged.

### Final fix round 2

- `ddd6e71d3cdf7ba05a53f19b73575e8b9d27d98e` - `fix: validate preserved erasure suppressions`
- accepts one committed suppression when it either belongs to the winning lifecycle idempotency key or is the exact compatible `email_hmac`/purpose row preserved by the erasure UPSERT;
- continues to reject multiple, ambiguous, incompatible or inadequate suppression rows;
- adds a real SQLite regression proving a fresh successful erasure leaves one deleted lifecycle event and one unchanged compatible historical suppression.

### Final fix round 3

- `5415458ce5079f92461407be2b7f3d4a78336304` - `fix: recover committed erasure purpose`
- reconstructs the committed winner purpose from the lifecycle request hash across the finite allowlisted purpose catalog without storing new data;
- requires exactly one matching purpose, then queries and validates the suppression against that derived winner pair plus the lifecycle owner key;
- adds a coordinated SQLite regression combining an equal-millisecond different-purpose loser with a compatible suppression under a third historical idempotency key.

## Required Local Verification

All commands below ran from the stated worktree with the default local toolchain.

| Command | Exit | Observed result |
| --- | ---: | --- |
| `node --test test/contact-privacy-erasure.test.mjs` | `0` | `23/23` passed; `0` failed, skipped or cancelled. |
| `node --test test/contact-privacy-policy.test.mjs test/block6d4-local-migration.test.mjs test/contact-privacy-d1-store.test.mjs test/contact-privacy-erasure.test.mjs test/contact-privacy-contract.test.mjs test/contact-d1-store.test.mjs test/contact-intake.test.mjs test/contact-gate.test.mjs test/synthetic-contact-canary.test.mjs test/crm-lite.test.mjs test/synthetic-crm-persistence.test.mjs test/synthetic-crm-readonly.test.mjs` | `0` | `95/95` passed; `0` failed, skipped or cancelled. |
| `npm test` | `0` | `590/590` passed; `0` failed, skipped or cancelled. |
| `npm run lint` | `0` | `0` errors and `1` pre-existing `@next/next/no-img-element` warning at `app/components/comic-home-intro.tsx:36`. |
| `npm run build` | `0` | Vinext completed all `5/5` build phases and printed `Build complete.` |
| `npm run web:deploy:dry-run` | `0` | Printed `Dry run complete. No build or deploy performed.` Remote deploys remain `0`. |

## Migration and Security Inspection

| Command | Exit | Observed result |
| --- | ---: | --- |
| `rg -n "DROP\|DELETE\|UPDATE\|RENAME\|__new_" drizzle/0008_contact_privacy_lifecycle.sql` | `1` | No matches. Ripgrep exit `1` means the destructive-token search returned no results. |
| `rg -n "AFW_REAL_CONTACT_ENABLED\|AFW_PRIVACY_REQUESTS_ENABLED\|AFW_RETENTION_JOBS_ENABLED\|AFW_PRODUCT_UPDATES_ENABLED" wrangler.jsonc` | `0` | Twelve matches: all four flags are explicitly `"false"` in base, canary and production. |
| `rg -n "email\|name\|phone\|password\|token" lib/contact-privacy-d1-store.mjs lib/contact-privacy-erasure.mjs` | `0` | No matches in the D1 privacy store. Erasure-module matches are limited to `emailHmac`/`email_hmac` suppression handling and explicit validation or blanking of erased direct-identifier fields. Lifecycle event bindings contain hashes and bounded metadata only; returned objects contain no direct identifiers. |
| `git diff --check` | `0` | No whitespace errors. |

The migration is additive: its destructive-token scan is empty, and `test/block6d4-local-migration.test.mjs` passed while applying the migration against pre-existing contact and CRM rows and verifying those rows were preserved.

## Warnings and Version Caveats

- The host used Node `v22.17.0` and npm `10.9.2`; `package.json` requires Node `>=22.18.0`. This is a non-blocking local version caveat because every required command exited `0`, but the next gate should use a supported Node runtime.
- Focused and full tests emitted Node's `ExperimentalWarning` for the built-in SQLite module. The SQLite-backed assertions passed.
- Lint retained the already-known `<img>` optimization warning above; it introduced no lint errors.
- Vinext `1.0.0-beta.8` used Vite `8.2.2`. Build output reported plugin timing notices and that some routes could not be statically classified because Vinext's classifier cannot yet detect all dynamic API usage.
- `git add` emitted the Windows working-copy notice that LF will be replaced by CRLF the next time Git touches this evidence file; the staged whitespace check remained clean.

## Independent Whole-Branch Review

The earlier whole-branch hardening addressed replay after erasure, equal-timestamp consent precedence and purpose-specific consent-copy validation. The final independent whole-branch review of `2f48408f9c914eb3253ec2012c6c93357b84adcc..0a57d9f89cdbdbd8fb511a61eb40e4b19a71a505` nevertheless returned `CHANGES_REQUESTED`: Critical `0`, Important `3`, Minor `0`, blocker `Yes`.

Implementation commit `582b62d0968c3891d437ba0570492a1d2b998d0a` addressed the original two code blockers with observed RED -> GREEN regressions. The first independent re-review returned `CHANGES_REQUESTED` because a compatible historical suppression could be preserved while post-commit validation reported failure; round-2 commit `ddd6e71d3cdf7ba05a53f19b73575e8b9d27d98e` addressed that case. The round-2 re-review then returned `CHANGES_REQUESTED` with one compositional finding involving a simultaneous different-purpose loser. Round-3 commit `5415458ce5079f92461407be2b7f3d4a78336304` addressed it with a coordinated real SQLite RED -> GREEN regression.

The independent round-3 re-review inspected `0b551765433c1ee857e99aaf41f2ba2c636db88e..e9b5978ae9ac0d549c986ab3dea79badbf23c9c4` and returned `APPROVED`: Critical `0`, Important `0`, Minor `0`, blocker `No`. It confirmed unique winner-purpose recovery, bounded suppression validation, one lifecycle event, one unchanged historical suppression, an idempotent loser result and no partial writes.

## Gate Decision

Gate 6D.4B has reproducible local implementation evidence, an approved final independent re-review and remains remote-disabled. This evidence does not authorize a remote migration, deployment, traffic change, real-contact access, email delivery, or use of shared Cloudflare or Tokenizart resources.

The next gate is `6D.4C private synthetic lifecycle`; it is not active and requires a separately declared and approved operation.
