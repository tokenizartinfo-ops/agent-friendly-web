# Closed QA cloud runner: opaque credentials —31 October 2026

AFW only, source bugfix. First actual manual inspect41217429009/attempt1 used acceptedmaine74d434 and produced a sanitized blocked receipt before any provenance or native observation; restorejob skipped. No durable Git claim, provider POST, grant, D1 effect, subscription or first-successor budget was issued.

The source factory rejected both credentials unless they matched an8–256-character alphanumeric/underscore/hyphen regex. GitHub's current Actions installation tokens are longer and dotted opaque strings. Official rollout completed2October2026: https://github.blog/changelog/2026-10-02-stateless-github-app-installation-tokens-rolled-out/ . Current guidance says not to rely on old token lengths or inspect/validate the internal JWT.

Keep both credentials opaque. Only enforce a conservative8192-character HTTP header budget, nonempty string and printable ASCII without whitespace/control characters; do not parse, truncate, log or return them. Provider authentication, fixed origin/resource/method scope, real201 ref ACK, exact fingerprints, metadata gates, original clock and one-effect budget remain unchanged. This is compatibility, not access expansion or a new credential.

Reproduce with synthetic long dotted credentials in the real fixed HTTP fixture before implementation, retain legacy success and invalid/control/oversized rejection. Run exact-headCI/lint/build and review, then accept matching tree. Existing private Cloudflare token/custody remains; no rotation or repaste. Later use one fresh READ-ONLY inspect plan, not re-run jobs or a consumed window; only successful primary observation permits evaluating a separately bounded closed-artifact restoration. PC-off remains unproved.
