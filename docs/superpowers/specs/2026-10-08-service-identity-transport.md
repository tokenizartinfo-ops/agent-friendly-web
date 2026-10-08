# Fixed QA service identity transport

Base cb148d9. Standing owner instruction selects autonomous native implementation and review. No hosted credential or new remote resource is authorized by this code.

Server construction pins one account, token UUID, approved name, exclusiveQa:true and closeAt. Requests are exact GET to that one path or exact PUT with enabled:false and that name. No extra fields, accessors, URLs, queries, headers, renewal or rotation. GET can read before the closure deadline; PUT cannot dispatch before closeAt or after a regressed/invalid clock. Recheck input/clock after awaiting custody and immediately before dispatch, sending a constant serialized body from construction pins.

Fixed https://api.cloudflare.com/client/v4 origin, redirect:error, bounded custody/fetch/stream deadline default5s/max10s, 256KiB, abort/cancel, strict JSON MIME and provider success. Late custody cannot dispatch. Errors are only success:false; no retry. PUT result is intentionally null so any provider-returned credential never leaves this transport. GET metadata must pass the service identity digest validator, which rejects credential-bearing or unexpected fields.

The transport does not provide a persistent write fence or attest ownership/exclusivity. Compose only behind the approved QA catalog, existing action and durable coordinator. No runtime mount, administrative account token, effective authorization, active-disable acceptance, PC-off or Max claim.
