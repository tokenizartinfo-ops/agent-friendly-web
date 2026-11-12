# Exact round2 report append

Source59d7bb15c01772550c8f38a90d771dba4a5342f5/report46de4d04d4d2c3dfc5ddeb9621014a1ec7196388. Root verified old440385-character fbc552b9 report is the exact prefix. Below is complete appended suffix; this is claims to assess, not reviewer acceptance.


## Task1 fix round2/5 — readable non-callable then vs pending Promise — 2026-11-12 UTC

The [round2 brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d44f99fa91ac8bcfd90203017efc97313302d6f5/docs/superpowers/briefs/2026-11-12-finite-budget-task1-fix-round2.md), blob `3996e7d5edebb718934651887015b67b09489218`, governs this bounded correction. [Scoped fix1 re-review](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d44f99fa91ac8bcfd90203017efc97313302d6f5/docs/superpowers/reviews/2026-11-12-finite-budget-task1-fix1-re-review.es.md), blob `1919850b5208c3df0e32b012b4d843182eade0b9`, marks R1/R2/R4/R5 ADDRESSED; R3 alone remained Important/Needs fixes because a normal synchronous {then:null} stayed pending. This section records implementation evidence, not a reviewer acceptance verdict for R3.

FIX_BASE2 `eb3b4f2337b9da2611164df5505f7a0d82b591fa`, tree `7e63ab6e728d9abd89851b37aad3c49f88efcd2a`,3,189leaves; report prefix `fbc552b95667f032034c45bceb8147789e6a01b4`; inactive TEMP `6f48afaaf998abc9a120410a10cfca27b1afed87`. Scope only runtime/puretest/TEMP/append-only report. Same sole Source writer; Root's independent ORD-1 read-only investigation did not write this Source.

### Causal regression and preservation controls

The new readableNonCallableThen behavior control is appended inside existing Q5, retaining all eight Q identities and all prior assertions. It first exercises a genuine pending Promise with own readable data then:null via runtime.member. Receiver/arg17, original Promise identity and exactly one native call are checked. BEFORE the later failing sync assertion, BASE2 already passes the required preservation: pending/nativeSettled0/active1/incomplete, getter counter0. After releasing/awaiting that actual Promise, unavailable observational settlement remains pending; no artificial fulfillment/rejection or replacement Promise is introduced.

Then five independent real runtime.member return observations evaluate {then:null}, {then:undefined}, {then:false}, {then:0}, and an inherited readable then:null. Each returns its original object with original receiver/argument and one native call. Every value carries a throwing Symbol.toStringTag getter to prove metadata is not invoked. All observations are collected before comparing to literal expected fulfilled/started1/settled1/active0/invalid0/calls1/tagGetter0. The fixed failure marker is `R3 readable non-callable data then settles synchronously`. Existing own-then-accessor pending Promise, ordinary Promise/data-method, synchronous value, error/identity and four accepted fix controls remain unchanged.

[RED43152754915/1, job130965578105](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152754915/job/130965578105):
- Source `855a5ce02cbf81d931310d1a7a2f06f9f8bea0e9`, tree `d0ec47f300bc5fd22ee430cab1d0b3170456f0d4`.
- Test `1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8`; TEMP `c4b0b74351a9b3de4e4ee8fc05f6ddbfde3f7b9d`.
- Runtime read back unchanged BASE2 `2e911fd4e9d2287da687bef9b0389fbec48a5114`.
- Command `node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs`: exit1,8tests/7pass/1fail,0cancelled/skipped/todo.
- Only Q5 fails with ERR_ASSERTION/deepStrictEqual at readableNonCallableThen, line684, on the fixed marker. The ordinary returns are wrongly pending; the genuine pending Promise-own-null preservation control passed first. No import/setup/guard failure or artificial RED for that already-correct Promise behavior was accepted.
- Causal RED and exact-ID artifact readback were terminal before runtime edits; no repeat was needed.

### Minimal passive classifier and its limit

Root approved the bounded proposal after the expected RED. The repair changes only passiveThen plus captured standard intrinsic references:
- capture Object.getPrototypeOf, Object.getOwnPropertyDescriptor, Object.hasOwn, Object.prototype and Promise.prototype;
- retain existing callable-data then behavior and immediately treat an accessor as unobservable;
- after a readable NON-callable then, inspect only the descriptor/prototype lineage; known Promise.prototype, a higher callable/accessor then, or an unrecognized lineage remains unobservable/incomplete;
- certify the tested ordinary lineage reaching captured Object.prototype as synchronous when no Promise/hidden callable/accessor evidence occurs.

There is no business-method/Promise-method probe, Object.prototype.toString, Symbol.toStringTag read, then getter read/call, Node util/v8 import, business-object mutation, Promise replacement or extra business I/O. Prototype and descriptor reflection use captured worker-compatible standard intrinsics. The known native Promise with own then:null remains conservatively pending; plain/readable non-callable ordinary values now settle fulfilled.

This is a bounded observational classifier, NOT a universal Promise hidden-slot/brand test. Foreign/ambiguous prototype lineages remain conservative where recognized as such; arbitrary reparented/spoofed/proxy objects cannot receive universal guarantees from passive lineage inspection. The report does not claim cross-realm or nonstandard prototype-mutation coverage. The tested domain is the ordinary data cases and native Promise controls above. Callback receiver trampolines, phase overlay, weak identity/caps, bytes observation and all previously accepted fixes are preserved.

### GREEN and exact compile-only covering checks

[GREEN43152967723/1, job130966264204](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152967723/job/130966264204):
- Executed Source `54dbf0963bd36c1c4fb8a9dc7275aa75fd69d8d1`, tree `017355bc5e1892d7b14dbc3d12f85014723b719e`.
- Runtime `3aba82b323837f3c14463875d472500d49c0c2e0`.
- EXACT unchanged RED test `1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8`.
- TEMP `5f4bd9261e50c7699aaef73ce6f2aa853495a1d3`.
- Same8Q command: exit0,8tests/8pass/0fail/cancelled/skipped/todo.
- node --check and eslint on ONLY the two changed modules (runtime and pure test): PASS.
- Current source/run/attempt-bound compile-only preflight:176roleinputs,130fixed paths,635selector groups,54unique reader sites; syntax/lint PASS; I0Opened=false/nativeExecutionProduced=false.

The five ordinary cases fulfilled with nativeSettled1/active0/invalid0 and all tag-getter counts0, original identity/this/args/calls preserved. Native Promise-own-null and own-accessor controls both remained pending/incomplete without getters. No normal npm, A/B, recorder controls, custody-nine, historical56, full9/P1, native900s, Miniflare construction or provider probe was run for this correction.

Both jobs were fixed Source/self-path push/attempt1, Node22.23.4/Ubuntu24.04/current lock, <=7minutes, contents:read/actions:read, no secrets/environment or arbitrary input, cancel-in-progress:false. Platform noise remains the reused Node20-actions-forced-to24 warning; actual script Node was22.23.4.

| Evidence | Safe artifact | ZIP bytes | ZIP SHA-256 | Expiry UTC |
| --- | --- | --- | --- | --- |
| RED | [13913409622](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152754915/artifacts/13913409622) | 2010 | `c3e382812a5f4332a317a1d1111fabd0bb2cafa61202d6554ca282c5a577169c` | 2026-11-19T04:08:26Z |
| GREEN | [13914153379](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152967723/artifacts/13914153379) | 1546 | `0e1119e90083a1474edadd55bcf474de26da301958fd56c5cad289ee4c017de0` | 2026-11-19T04:10:21Z |

Each seven-day artifact contains tests.tap/result.json/budget-artifact.json. Both first exact-ID GETs succeeded; later attempts/waits were skipped. Same-ID source/run/attempt/inventory/content hashes verified. RED553-byte manifest SHA `e6aa7e27f616e02528ab3d53e7065b79a5bff9d65ed7b7cb5f1efb914a682bf5`; GREEN553-byte manifest SHA `8dab991eea0df0ac047e68913d094d64728f7554cc3e6eec2e5d2c8e11003728`.

### Restore, protected proof and stop

After terminal GREEN/readback, restore the EXACT original inactive TEMP blob `6f48afaaf998abc9a120410a10cfca27b1afed87`: manual/noinputs/no push/three false job guards. This reuses the already verified YAML/template bytes; it is not a new activation or qualification. Executed GREEN Source above remains distinct from the final restore/report Source. Final code blobs equal GREEN; no post-test runtime/test edit.

Final full-tree comparison against BASE2 must show only runtime, pure test and this appended report changed; TEMP is exact BASE2 again;3,189leaves/3,186protected blobs exact. Evidence helper `0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9`, native P1 `082340b6ede2a252a8602721ec19063cc68fafc8`, compiler/world/descriptors/custody/production/lib/worker/SDK/package/lock/config/compatibility stay exact BASE2. Main remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. Final ref/tree/report/TEMP readbacks and zero runs on the restored inactive head are checked at handoff.

R1/R2/R4/R5 remain addressed by the scoped prior verdict; R3 now has causal RED/GREEN evidence and awaits the ONE scoped re-review of R3/new breakage. ORD-1 independently remains OPEN for integration; no waiver or repair of its36pre-round failures is implied. Current-source native qualification remains pending. No human step was needed/requested; no Source/main force/reset, unrelated edit, runtime/Cloudflare/OAuth/OTP/credential/cron/Container/realconsumer/Max/mail/PR/deploy action occurred. STOP_WRITES after final restore/report readback.

operationalReadiness=false; completePackage=false; PCoff=false.
