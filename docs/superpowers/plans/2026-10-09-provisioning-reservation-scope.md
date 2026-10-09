# Provisioning reservation scope

> Required execution: superpowers:executing-plans, inline, one fresh whole-branch review.

Goal: replace the ambiguous internal provisioning v1/exclusive proof with an explicit v2 own-resource-reservation contract before wiring a real producer. This is preparation, not evidence of provider creation, cloud custody or runtime activation.

Design: one strict predicate exported from assistance-qa-closure-catalog.mjs checks exactly four enumerable own data properties: contract='afw-qa-provisioning/v2', recordRef=the expected 64-lowercase-hex baseline, state='reserved', scope='own-resource-reservation'. Reject legacy v1/exclusive and extra fields/accessors/symbols/arrays. Installer and catalog use the same predicate. Tests' synthetic trusted-reader fixtures migrate explicitly; historical documentation is preserved. No producer, reservation, binding or endpoint is added.

- [x] RED: catalog refuses old exclusive proof; predicate rejects malformed/legacy/wrong scope without invoking getters; installer refuses old proof without writes.
- [x] GREEN: implement shared predicate and switch both authority consumers; update synthetic fixture proof literals only.
- [x] Verify focused/native and full suite, lint/build; fresh branch review; record acceptance and remaining real preregistration/provider/journal/CAS/mount gates.

Authorization: standing owner AFW own-QA development. Existing authority design permits only a CAS reservation within the own registry, not global key exclusivity. This is a fail-closed internal version migration; no deployed producer exists to migrate, remote gates remain closed. Rollback is source parent commit; no SQL, resources or keys changed.


