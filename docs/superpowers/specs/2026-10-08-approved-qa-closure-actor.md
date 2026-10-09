# Approved own-QA closure actor

Goal: compose existing persistent alarm lifecycle, primary D1 closure actions and
approved administrative closure under one immutable server approval. This is an
internal factory, not a route, deployment or customer permission.

Inputs are trusted context, primary D1 binding, shared QA catalog reader, complete
approval, clock and separate credential readers. The plan comes only from an
explicit V2 catalog record correlated to the complete server-v1 approval digest.
Every authority check reads QA, compares all primary D1 approvalValues, validates
the complete digest and rereads QA after awaits. The initial baseline is pinned;
changed resources/provenance cannot replace it. Checks are bounded to 1..10000ms.

D1 authorizeWrite and administrative guarded fetch consult this fresh authority.
Occurrence revocation permits cleanup; QA withdrawal blocks further authority.
Recovery reads primary D1 receipts for steps 1/2 and GET-only administrative
receipts for step 3. Persistent issued fences survive reconstruction; never
replay a lost PUT. Clock regression or unknown authority fails closed.

Invalid configuration produces unavailable actor. No public wiring or flag can
activate it. Native acceptance combines SQLite DO lifecycle storage with actual
local D1 journal/revocation and synthetic provider/provisioning. Manual alarm
invocation and synthetic clock do not prove scheduler, hosted custody or PC-off.
Cross-store authorization is checked before dispatch, not distributed atomicity.

Owner has standing authorization for consecutive own-QA blocks; no further
approval pause. Max invitation, personal consent and PC-off remain separate gates.
