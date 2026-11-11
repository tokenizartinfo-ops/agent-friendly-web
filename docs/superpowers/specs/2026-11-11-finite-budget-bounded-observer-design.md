# AFW — bounded observer and explicit evidence completeness, design draft
Date: 11 Nov 2026. Status: DRAFT / builder check, not implementation authority.

## Intent and project boundary

Help finish the existing AFW finite native qualification without the observer losing attribution merely because its diagnostic trace fills. This is test-only SOURCE/SYN, repo tokenizartinfo-ops/agent-friendly-web, isolated branch feat/finite-native-cleanup-20261101. It changes no production source, authorization, native deadlines, callbacks, return values or error identities. The user delegated routine design decisions and asked uninterrupted progress. The choices below are Root proposals; they were not separately chosen by Gabriel.

Global BASE remains29681cae2bf1094ec5c66d5b2784254f77bec697. Source69f5c5da6af1407e8ecb706a96c89fb3678c5f51 is the current diagnostic checkpoint; fixed reader provenance is being added by the sole Source writer under a different bounded brief. This draft authorizes no competing Source writer. Its final implementation BASE must include that completed provenance checkpoint.

## Established problem

Ordinary cap16384 probe43101479429/1: QA0/1 first invalid runMissingLease only after saturation; QA2 readerOrigin ordinal1 and14earlyinvalid. Explicit cap32768 comparison43103332654/1 eliminated QA0 invalid (22451events), but QA1 again saturated and QA2 retained the same14earlyinvalid. AllMepochs clean. Both completed genuine synthetic setup, SDK normalcomplete1, Reference1, Notice1 and disposal before originalC0; neither tested originalalarm or a cold consumer.

Collector event() currently spends one slot per API call, including validation/duplicate/bytes/settlement. Once full, root()/child() refuse new handles. Runtime only records a lease if the handle exists, so a later run() cannot find it and records incomplete. Thus a trace-retention policy can itself destroy context. Native begin() still allocates operation metadata/counters after saturation, and scopes Map continues to grow, so the existing event cap is not an absolute heap bound either.

The14earlyreaderOrigin remain unresolved and must not be excused by this design. The parallel fixed-site diagnostic identifies their real callsite/context without changing semantics. Any genuine remaining unknown or attribution error continues to fail qualification.

## Approaches and decision

1. Raise the scalar event cap again: rejected after the controlled comparison. It postpones the coupling, offers no sustainable bound, and does not explain earlyreaderOrigin.
2. Preserve every event forever or stream diagnostic IO from Worker callbacks: rejected. Unbounded strong retention/extra IO/awaits would change costs, scheduling and the proof target.
3. Separate bounded retained trace, weak observer context and exact bounded-key aggregates: proposed. It retains truthful evidence of omissions while allowing observation to continue with the same real identities. Cost: the large native trial can qualify observed metrics but cannot claim an individually reconstructable complete trace when trace rows are omitted. That is an explicit change to the test-evidence contract, never a quiet removal of a failing assertion.

## Parts and invariants

### A. Event chronology is a scalar denominator

Count every existing collector API call exactly once at the same original point, before validation/dedup; snapshot calls consume none. Keep byEvent fixed keys and fixed failure-reason/site buckets. No rotating/resetting collectors to make a threshold disappear. No arbitrary source/URL/error/header/argument/secret/identity values in projections. First invalid details retain actual method/event ordinal, fixed reason and the fixed site/context witness where applicable.

Use a new explicit nested chronology purpose afw.finite-budget-chronology.syn.v2. It does not pretend that a cumulative count is a retained-record budget. Existing v1 reports remain immutable historical evidence. Do not silently reinterpret their firstOverflow ordinals. A new firstRetentionOmission includes actual method/event ordinal and fixed record kind; before/after relation is explicitly relative to retention omission, not a call-count threshold.

Scalar arithmetic that would lose safe integer exactness, become nonfinite or underflow marks numericOverflow/incomplete bookkeeping, never wraps or changes the native outcome. Clock durations remain nonnegative finite numbers; byte/call/ordinal counters must remain safe integers. A small private arithmetic helper may be unit-tested near boundaries without manufacturing native work.

### B. Retained strong evidence is bounded by record kind

Fixed caps: operation trace rows16384, logical guard event rows16384, enumerable scope metric rows16384 per collector. Fixed phase/resource groups have the finite existing enum cross-product, not caller keys. These are record-count bounds, not a promised number of RAM bytes or total provider traffic. Each retained record contains only bounded fixed enums, ordinals, numeric facts and nulls.

When a record kind fills, retain its admitted prefix and update admitted operation rows through their real later settlement; count every omitted record of each kind and record its first omission ordinal. Do not discard/evict prior rows silently. Snapshot exposes purpose afw.finite-budget-retention.syn.v1, caps, retained counts, omitted counts, first omission and traceComplete=false when appropriate. Existing coverage.overflow, if retained for compatibility, must visibly agree with any retention omission, never be cleared to get green.

The private strong scopes index is capped. Totals and fixed phase/resource aggregates still update for valid observations whose scope row was not retained; increment omitted scope enumeration explicitly. Scope state needed by a pending or retained observation is held only as small diagnostic scalar state, not a new strong reference to the native lease/request/response. Builder chooses the exact nonprojected linkage and tests that snapshot cannot expose it. Do not append unlimited historical scopes or denial-key strings elsewhere to evade the bound.

### C. Native identities are not trace admission tokens

Validated root/child/operation/body-owner identities stay in weak identity stores independently of whether a DTO row is admitted. Preserve identity dedup, cross-root rejection, captured phase/deadline, fetch/read association and late settlement. Root/child are never invented from a phase label, URL, diagnostic metric or current global phase. No caller receives authority from an observer handle.

Weak metadata follows the lifetime of native keys and pending callbacks. It must never create a new unbounded strong history. WeakMap is not an absolute RAM guarantee: if business code keeps many native identities alive, corresponding weak metadata can remain. State this limitation in the report. Native work remains bounded by the existing finite harness, original Root≤30000ms/child≤5000ms and source limits; the observer must not install a second queue, extend TTLs or retain bodies/buffers/credentials to make a metric convenient.

Count active native operations and cancellation facets exactly as before. A logical denial never settles a native promise. Duplicate native settlement remains idempotent. Do not delete all settled identity metadata if that would break dedup or fetch/body links; do not turn a duplicate into a new invalid merely to save a slot.

Distinct denied scopes must be counted independently of retained guard event rows. A fixed phase mask on the canonical weak scope identity can deduplicate exactly during that identity's lifetime. Late observations must still address that same identity; no shifting a scope to another Root. Preserve separate guard-event count and distinct Root/child/phase denial count.

### D. Explicit completeness levels

traceComplete says every required raw operation/guard/scope row is retained. A trace with omissions is incomplete, always labeled so.

observedMetricsComplete means bookkeeping of observed invocations is complete: zero invalid, zero unattributed/unknown/unresolved/native-identity loss, no numeric overflow and zero omitted scope rows required for scoped verification. It does not assert coverage of uninstrumented code, physical provider requests, Cloudflare quotas, namespace emptiness or complete raw trace. Fixed compile-time role/path/selector preflight is still required independently.

Metrics include global totals, fixed phase/resource totals and retained scope totals. Preserve active/peak/nativeSettled/nativeRejected/nativeBytesUnavailable/nativeBytesRead/chunksRead/logical/cancel distinctions. Bytes unavailable from the native API remain null with explicit reason; never guess wire lengths or counts.

Any missing scope needed by a test fails that scoped proof. Do not calculate its peak from a global sum or average, choose an unrelated retained scope, or let aggregate correctness excuse missing attribution.

## Verification and changes to the acceptance contract

The current P1 reconstructs totals from all rows, finds every fetch parent in the retained trace and derives covered phases from retained rows. A bounded-prefix trace cannot satisfy that full-trace proof once rows are omitted. Preserve a named full-trace verifier for samples with traceComplete=true, and explicitly separate an observed-metrics verifier. Do not report the latter as the former.

Within the existing eight Q groups, test:
- controlled complete traces: both verifiers agree, and global/group/scope totals reconstruct exactly;
- small trace caps: original outputs/promises/this/errors/effects are unchanged; new valid root/child identities and late settlement remain correctly attributed after retention fills; all omitted counts and first ordinals are exact;
- retained rows continue updating; unretained operation completion still updates aggregate totals exactly once;
- concurrent Roots, crossed identities and fetch/read links; real missing context still increments invalid and makes metrics incomplete;
- bounded scope retention and distinct denied-scope masks beyond guard-prefix truncation;
- snapshot/accessor/privacy/numeric-boundary behavior and the fixed reader-site witness;
- deterministic projection bounds and source/role/preflight invariants.

Only after pure RED demonstrates the old coupling and new code passes8Q/preflight, permit one producer-only diagnostic to confirm attribution and retention facts before a full lifecycle run. If it fails or reveals unresolved invalid, preserve/STOP for a cause-based ruling, no blind reruns.

After that diagnostic passes its declared criteria, the coherent Task1 qualification can be8Q plus one native P1 using original I0/C0I0+900000/C1C0+180000, cold recovery, original alarm, real SDK reduction/final inventory/receipt and all existing business assertions. The observed-metrics verifier checks exact totals/group consistency, attributed scoped peaks, finite enum coverage, zero unknown/invalid and honest trace omissions. Wherever traceComplete is true it also runs the full-trace verifier. No claiming full raw trace from aggregate-only evidence. Stable test names and reports must declare which proof passed.

Source frozen during every finite run. Same-ID exact artifact readbacks, original graph/script/metafile/native-state provenance, source/run/attempt,7day retention, bounded log summaries and complete safe JSON remain mandatory. Task1 still needs fresh Spec+Quality review against GLOBALBASE..HEAD; self-check or this draft's builder check is not that review. Task2 waits.

## Scope and rollout

No Source work is authorized by this draft. After reader provenance completes, Root resolves builder questions, commits the final design and amends the existing Task1 plan/brief with exact paths, field vocabulary, tests and stop gates. Sole implementer only; no main/PR/publish/runtime/permissions/OAuth/OTP/cron/Containers/customer/Max/mail changes. Future implementation is test-only and reversible on the isolated branch.

If any native correctness or reader-ownership issue remains, it gets a separate precise fix; this memory design cannot redefine it away. operationalReadiness=false, completePackage=false, PCoff=false throughout this design work.
