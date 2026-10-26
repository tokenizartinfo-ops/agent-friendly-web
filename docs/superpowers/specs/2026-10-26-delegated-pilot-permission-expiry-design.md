# Delegated pilot permission expiry

Date: 2026-10-26. Source-only AFW correction under the owner's explicit autonomous execution request. Questions/design-review pauses were opted out of; root selects the existing JavaScript/Cloudflare architecture and GitHub-hosted CI. No local clone, build, dependencies or new cloud chat.

## Problem and evidence
The own synthetic trial returned a real summary at 02:52:09Z, but its grant expired 03:00:55Z while the host window ended 02:56:57Z. No post-window private read is established: the host gate already rejects it. The mismatch leaves an unusable grant labelled active until later and frustrates coherent teardown. Root missed pre-expiry native withdrawal; expiry is not revocation. Receipt issue497#6407298304 preserves the actual result.

## Decision and alternatives
Keep the ten-minute ceiling, and clamp newly created consent handles and application read grants to the original host deadline in window mode. Retain stable-mode ten minutes from grant approval. Reopening the host or extending user permission would enlarge authority and is rejected. Automatically revoking historical grants after expiry would add unrelated data mutation and is unnecessary. This is a correction of future issuance, not a migration.

Capture the validated host deadline once per request. Use that same validated monotonic canonical clock for consent lookup/consumption as well as issuance. If current time fails during exact-own grant cleanup, use the last validated canonical observation as a nonempty retirement marker; it is not a precise database commit timestamp or native withdrawal receipt. Re-observe time immediately before persistence; reject nonfinite/backward time or an expired window. A new read grant requires at least 60 seconds remaining, matching the already-pinned SDK exchange minimum; this cannot guarantee completion after later latency. Recheck after the grant write and before completing authorization; on observed expiry, use the existing exact-own revoke path and return no authorization code. Unknown storage ACK is not proof of cleanup.

Human text says 'hasta diez minutos' and shows the actual bounded consent deadline without changing optional scopes. GET consent, POST grant and connections' revoke handle use the same original window cap. No permission extension, refresh enablement or automatic reconnect.

## Closure
Tests must first fail on the baseline, then pass with real SDK authorization/token/SQLite fixtures. Cover a late approval, stable mode, async expiry before and after persistence, changed env deadline, a short remaining window and invalid/backward time. Full GitHub CI and one fresh whole-branch review are required. No production settings, database migration, token, Access policy, deployment, event consumer, scheduler or Max action is authorized by this source block. Frozen deployed source stays unchanged and closed. PC-off and operationalReadiness remain false.
