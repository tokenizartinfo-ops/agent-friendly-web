# Native post-ACK R2 — independent design preflight

Reviewed by /root/bounded_plan_final_review (Astra, existing independent architecture reviewer), scoped follow-up at Rootdocs f8ab3ca2fdcc6169b6f2731d55d68203d81f12b5. Verdict CLEAN for N1–N4; zero outstanding Important contractual contradictions in this scope. Implementation/runtime feasibility and actual timing/custody remain unverified.

Initial HOLD identified two concrete conflicts: same-job step-binding versus independent key isolation, and unavailable original R2 outcome versus custody kind/digest ambiguity. Root bound them in the SPEC; re-review accepted:
- N1: claim absent Native environment binding under trusted runner, not independent same-runner isolation. Only key-preflight/seal/open receive key.
- N2: unavailable never coerced to failed or qualifying custody. Optional encrypted quarantine is producer evidence failure only; original failure and evidence verdict remain distinct.
- N3: exact ordered rebuilt observation projection excludes custody, includes original outcome/context/provenance. Reviewer independently reproduced 1221 ASCII/UTF8 bytes and SHA256 47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005.
- N4: >=240s conservative current-job headroom before allocation, unknown blocks; no fresh timer or historical clock compensation.

Root current Source read at preflight: 408e82abe63178319862c99c3c24684e2258296d and main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged; five active statuses zero. This is GitHub branch/run evidence, not fresh Cloudflare runtime closure.

This design review alone grants no Source or Native execution. A separate exact Task1 brief releases one KEYLESS contracts run; Native remains held until independent implementation CLEAN and another Root brief.

## N5 scoped design correction — independently accepted

Before any Source write, the upgraded implementer found legitimate dynamic compile inputs in the protected harness. Root independently verified the source; Astra independently accepted the bounded correction and timing/ownership qualification:
- Model preflight and actual allocated build use different inputs even at identical Source; never equate modeled full graph digest to Native bundle.
- Actual QA onEnd follows original COMMAND9001.created_at/I0 assignment and precedes setOptions/first business invocation. Rounded/backdated command time is not job headroom timing; I0/C0/C1 unchanged.
- onEnd==firstConnectionBuild is only build equality. Require BOTH actual retained mounted-option script hashes plus completed owned lifecycle and successful mount path; not runtime/remote attestation.
- Existing World attachPersist records owned scratch before preallocation failure, allowing original pre-MF unwind/archive without new allocation/RPC.
- OFF byte-identity control shares exact captured inputs/defines.

No protected harness edit required. Root published binding N5 in SPEC/PLAN/revised brief at18f3e74f61291ae0d6bf90651dff6a5f6ff918b2. Same implementer resumed under the unconsumed Task1 KEYLESS permit; Native held. Preflight findings N1–N5 resolved at contract level; implementation proof remains pending.
