# Custodial administrative GET transport

Bounded server-only transport for the four already verified Cloudflare paths. Standing owner authorization covers inline implementation; no new credentials, resources or cloud chat are created.

Resources are fixed at construction: account, token, Worker, Access app and policy. Requests must have exactly method GET and an exact allowlisted path. The origin is always https://api.cloudflare.com, with redirect:error. No caller headers, body, query, URLs or method overrides. Read the API token only from a trusted server credential callback; credential values never enter baseline/receipts/logs/errors.

One five-second default deadline covers credential lookup, fetch and streaming body. Limit configurable deadline to 1..10000ms and body to256KiB. Abort and return success:false on timeout, unauthorized/non200 response, wrong content type, oversized stream or malformed/provider-failed JSON. Never retry. A credential resolved after timeout cannot start a late request. Cancel a response reader on failure. An input edited during credential lookup cannot dispatch.

Return only success:true/result on accepted provider JSON; private errors/messages never leave the transport. The readback adapter continues to validate result identity, closed flags and canonical digests. This block does not provision custody, mutate administration, prove independent hosting or complete PC-off readiness.
