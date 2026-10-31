# Exact namespace protocol compatibility —31 October 2026

AFW only; no runtime/credential/namespace mutation. Read-only GHA41220334423/attempt1 atacceptedmaind42555d reached fixed namespace GET after16GET attempts, rejected response_envelope/HTTP200, restore skipped. Earlier profile hashes/configs/closed pointers/exposure/ownContainer checks passed before that gate; this is not full readiness.

Primary authenticated namespace GETs31Oct16:39–16:40UTC confirm success=true, resultarray, errors=null, messages=null. Pagination is page1/per_page1000/count12/total_count12 without total_pages. Both exact own SQLite namespaces remain070c4a7708eb4592a3ded7c117a88225(IndependentClosure) and6f30104244424152b800bc64d5f4cfac(PrivateQaPreregistration). No other namespace contents were returned as evidence. Official endpoint https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/ . The remaining seven fixed Workflow GETs were audited separately16:42UTC: normal empty error/message arrays, complete inventories, all own instances terminal; do not generalize nullable metadata to them.

Normalize ONLY null errors/messages on the exact fixed Cloudflare GET /workers/durable_objects/namespaces. Literal success=true, HTTP200, resultpresence, strict namespace schema/identity and count completeness remain mandatory. Reject missing/wrong metadata, nonempty errors, explicit false success and null metadata on every other endpoint/method. No generic null coercion or access expansion.

Namespace total_pages is optional only when page1/perpage1000 and count==rows.length==total_count prove completeness within1000rows. If supplied, require1 for this nonempty own-preservation proof; reject zero/unknown remainder/incomplete totals or missing total_count. Preserve exact own IDs/classes/SQLite and all other safeguards.

TDD reproduces provider-shaped nullable metadata and missing optional page count plus the contradictory zero-page case, then fixes narrow protocol predicates. Exact CI/lint/build/review and accepted tree precede one fresh read-only inspection. No re-run of consumed windows; no new token/OTP/grant/namespace/Workflow/instance/Container or first-successor budget. operationalReadiness=false.

Identity audit: require expected.has(namespace.class) before comparing the ID. A missing ID and missing/foreign class must never match through undefined===undefined; add two pre-fix regressions. The complete own class/ID set is required, not just two different values.
