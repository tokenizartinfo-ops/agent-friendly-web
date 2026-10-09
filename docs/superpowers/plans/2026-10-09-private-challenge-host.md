# Private challenge composition

Execute inline with executing-plans, one independent branch review. Standing owner authorization covers consecutive AFW own-QA preparation; no remote activation or client data.

Goal: compose verified Cloudflare service identity with the accepted transactional single-use challenge. Standalone internal host factory, never imported by a Worker. Operator-only issue/status/withdraw stay constructor-returned internal methods; consumer fetch can only confirm, never register, approve, install or read administrative state. No provider authority is produced.

Design: createPrivateChallengeHost({storage,readInstallation,readIdentityConfig,keySet,limiter,now}) returns issue/status/withdraw/fetch. fetch verifies fixed POST origin/path/service JWT before reading bounded JSON payload or consuming. Reuse existing payload reader (1KB/1s) and require a real supplied limiter. Body exactly nonce, enforced by challenge. Capture trusted config once before authentication; revision and entire snapshot must remain identical through body/limiter/transaction awaits. Use request-local authenticated identity callback; no shared authenticated state across requests. Recheck abort, time/config and JWT expiry after awaited operations. Return only challenge metadata after success, generic codes otherwise, no JWT/secret/errors. All responses no-store/nosniff. Direct internal methods are deliberately not consumer HTTP routes or DO RPC exports.

Tests RED then GREEN: valid real RS256 synthetic service + own fixed baseline confirms once; missing/foreign JWT never reads body/consumes; forged fields/nonce deny; body stalls/malformed/excess deny; config revision changes during body/limiter/commit deny; withdrawal permanent; overlap does not lend identity. Independent review then focused/native as warranted, full npm test/lint/build before PR.

Boundary: local signed fixtures do not prove real Cloudflare authentication, current provider revocation, task/environment correlation, deployment, schedule, or PC-off. Next gate remains actual own hosted wiring and independent administrative evidence, not more keys by default.
