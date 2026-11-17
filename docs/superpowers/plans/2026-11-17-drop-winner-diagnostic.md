# First DROP winner diagnostic implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Execute the stages below continuously; Root owns all ref activation and native readback.

**Goal:** Identify the exact selected error for the first synthetic DROP POST, without claiming an unproved QA cause or changing product decisions.

**Architecture:** Apply the approved two-marker design only to isolated test fixture/compiler overlays. Keep private request joins in child memory. Reuse the existing full-order collector and append one small diagnostic component; preserve all prior semantics.

**Tech Stack:** GitHub Actions Ubuntu24.04, Node22.23.4, fixed repository lock, esbuild0.28.2, actual Miniflare/workerd in existing harness. No local Source execution, dependencies or clone.

**Spec:** immutable design `1a5ccbf3aa73495e3c4f4ebfe39e5693d78d91cb`, accepted review `56e08ba3af37540421e1897d79b416c6ba4c12dc`, Root ruling `ada670c9bbe3741a714cec6486a20dd2751a01b6`.

## Global constraints

- PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web; BASE 6791ce1bab9372e206d3c7b42b3e1394dc6e0c68/tree62e78926635d6b74f288d6c0d69e0f2516306989; original3203 leaves unchanged. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 is not an editing/activation target.
- Isolated fixture overlays may change S09/S10 and the minimum passive S08 observation seam. No business guard/predicate/assertion/source-clock/registration/timer/cancel/retention relaxation. Prefer shared diagnostic factories inline in fixture source, avoiding an unbound new target import. Every input must have a measured immutable descriptor.
- Core Source13E3 index4c62b37a2e94efa057a1df97dd32c193761b8dcb. Original fixture S0849f3fa30c6754e64c36ab5cba769c9ef88669969, S093e1d4c2695dce2d13ba064274ba441c4ce9447c3, S10cb95e1f3b2e6c14d07f661f1b818c38d470564d7. Preserve other slots exactly and preserve before/after measurements for every proposed overlay.
- Default OFF outside the opt-in synthetic lab. QA marker `x-afw-lab-qa-denial=q1.J.S`; M marker `x-afw-lab-m-denial=o1.J.M.W.I` exactly as design. No inbound/forwarded headers, new business RPC/snapshot/wait/window, public deployment, real token, owner data, OTP or Max.
- Caller original outputs/status/body/headers remain unchanged except those two deliberate lab error-egress markers; observers synchronous/nonthrowing. Original promises, response objects, race order, pending cancellation, retained actual work and finally must remain effective.
- Source case order20, driver9e29c5197207b03bdb4b10069089f37df289e88c, registrationtail1794 SHA256256b20445a479589e7a745c704eeaca74298f51a3a965ea8487cacfce7d3791a, recorder662ec8170bbfe81831b557824d1a466e722842d7 preserved.
- Per case120000ms, child180000ms, total330000ms, job7min; stdout1048576/stderr65536/journal32768/128rows; outcome JSON24576 plusLF1=24577. No cap extensions.
- C1/firstFailure and finiteGet reducers/observable semantics unchanged. Original C1 region7055B SHA2566e8a25ad347866935c50bf52131b78dbfe993f86d592bdbb3e76bb3278c5e29f retained if reused. All7false nonclaims, SourceQualified=false and Task1Pass=false.
- Source/OWN currently4of5. This is the fifth source diagnostic cycle if implementation proceeds; no reset by name or branch. Root records each stage and review; no old occurrence replay.
- Author creates detached blobs only. Root creates immutable trees/commits, fresh refs, observes one-use workflows, collects terminal evidence once and closes workflow. No subagent refs/Rootdocs or remote mutations.

## Review focus

1. Late QA callback after restore/re-arm cannot tag a new epoch or overwrite sealed evidence.
2. Crossed Request/lease/cell/error/Response or a previously marked substitute cannot authenticate the current response.
3. QA/M headers must be set before native serialization; immutable headers/collision/helper failures leave original result effective and attribution UNKNOWN.
4. Same-byte sibling compiler map must be tied to the same prepared harness, real provisional namespace, mounted script and exact sites; adjacent/shared/foreign frames remain UNKNOWN.
5. A transport fallback laundering valid fields is outside value-provenance proof; under unverified transport, QA public site is UNKNOWN. No authentication/body-equality/physical-drain claim.

## Task 1: fixtures, source implementation and tooling proposal

**Files:** test-only fixture overlays S08/S09/S10 as necessary; owned Git data under `docs/superpowers/source-lab/c2-drop-winner-tools/` and `docs/superpowers/source-lab/c2-t1-drop-winner-diag4/`; exact one-use workflow files nominated in the brief. No normal production file edits on a ref.

**Consumes:** approved design/review plus R4 Source25 index672455978db4210eedef61502682e03404e0f462, full measurementbd26df072e8cf4f32fe1e266f7c2d639223d317e, deliveryf56c8e3cecd841fe97b40e0d10000f4d8058ed2b.

**Produces:** sealed fixture index first; RED-only proposal; later source body descriptors, reversible overlays, compiler/identity tools, full-order diagnostic proposal, and report. No Source business qualification.

- [ ] Seal literal inputs and expected outcomes before feature code. Include positive QA→M→host, exact deadline ownership, and all five review-focus classes; test real helper behavior, not mock call counts.
- [ ] Prepare only fixtures/test harness/RED runner initially. Baseline no-observer Response flow must fail the named positive marker/join assertion with AssertionError, not an import/type error. Label synthetic MODEL-only; this is missing-observability RED, not reproduction of the historical business defect. Publish immutable fixture/RED package and stop code until Root reports observed RED.
- [ ] After Root RED readback, implement minimal shared factories and exact fixture/compiler seams from tests. Source code execution/compilation only in a future Root-gated GHA job.
- [ ] Compiler probe uses actual first-connection-publication/{coupledStages:true}, real provisional MF namespace, same prepared inputs, exact ordinary vs external-map JS equality, proper output-path selection, >=2 usable distinct sites and neighbor/shared/foreign/truncated negatives. Dispose before mount/seed/dispatch. Never substitute budgetCompileOnly modeled IDs. Return honest unsupported if identity/site gate fails.
- [ ] Native tooling controls prove actual before-serialization QA and M receipt transport, plus crossed/stale/substituted/collision/copy/finish-throw cases. Tooling-only controls may use separate bounded synthetic workers; the full business path gets no additional calls. Unsupported transport produces UNKNOWN, never a guessed attribution.
- [ ] Retain existing R4 collect/publication behavior byte-for-byte where reused; run differential compatibility on changed code and inherited context only. No new 83-file copies or project full suite merely for unchanged Core. Any unavailable evidence remains pending explicitly.
- [ ] Produce Source proposal + schema/selection/runner/index and one tool workflow. Outer observation appends `dropWinner` after `finiteGet`, with keys `case,site,outer,publicSite`; case='15:firstDROP'; site/publicSite one of 'S01:247','S00:743','S04:37','S04:43','UNKNOWN'; outer one of 'QA_MARKED_STUB_NON_OK','STUB_NON_OK','DEADLINE_OR_ABORT','UNKNOWN'. publicSite!=UNKNOWN implies same site and validated QA+M joins. Subcomponent cap512B; no private joins/headers/frames/maps/rawSource in normal output.
- [ ] Root reviews code SPEC+QUALITY before any tooling activation; native source compiler/identity execution once only after exact gate. After pass and independent readback review, proceed to dependent receiver task.

## Task 2: independent OWN receiver

**Files:** isolated receiver proposal, using prior index520860e0f90337f764a34ea55f77eb4851000c48 as baseline.
**Consumes:** Root-measured exact new Source data/tuple/hash only after Task1.
**Produces:** default-closed ACTUAL vs MODEL bindings, new component public-invariant guard and focused fixture/native proof.

- [ ] Seal positive/negative fixtures before code; retain prior73 cases/expectations exactly, add only the new component/join/prefix rules. No access to private child headers or raw frames.
- [ ] Actual Source tuple can only be Root-measured; no model fallback/payload-selected default. Preserve all prior capture/ZIP/API/context/canonical/firstFailure/finiteGet guards.
- [ ] Prove modeled controls in one new bounded tooling occurrence; close/readback/fresh review. No positive ACTUAL qualification from models.

## Task 3: one actual bounded diagnostic

- [ ] Only after both tooling packages and exact ACTUAL binding pass reviews, Root rechecks BASE/main/history/fresh ref/zero prior runs, creates one new business ref and observes attempt1.
- [ ] Full-order20 diagnostic keeps original caps and business checks. Admit via ACTUAL reader, preserve primary/outcome or honest fault, close only nominated workflow, independently verify.
- [ ] Use returned facts to select a reproducible defect or a narrower investigation. No automatic replay, product traffic, permission renewal, or PC-off readiness claim.
