# Service identity disable implementation

1. RED tests: exact single PUT body/path; pre-deadline/mismatch/drift denial; primary disabled verification; metadata/version/expiry preservation; lost acknowledgement/read-only recovery; concurrent calls at most one PUT; input/clock edits during await; malformed/private errors sanitized.
2. Implement digest and action factory in lib/assistance-service-identity-disable.mjs. No transport, route, secret or runtime activation.
3. GREEN focused tests and lint, independent review, exact CI full suite/lint/build before integration. Record that provider side effects, hosted custody and complete administrative closure are still unverified.
