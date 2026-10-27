# AFW human opening — approved27oct2026

Gabriel approved the exact proposed sequence in this conversation: robot scene first, La llamada, plain-language AFW offer, layers, then the existing guided first step. The added old computer with a confusing site is also explicitly requested. This is the short design approved by the owner, not a new product direction.

- Preserve original sepia/black robots, tin cans, continuous thread, visual identity, all other sections and existing real navigation.
- Add a secondary old CRT in the central gap. Two localized selectable HTML balloons: ES “No termino de entender qué ofrece este sitio…” / “Yo necesito información clara y verificable para poder recomendarlo.”
- Shorten call title to “Cambian las formas de comunicarse. También quienes se comunican.” and intro to the approved first-party-site statement.
- New offer before maturity: “Te ayudamos a que tu sitio sea más fácil de encontrar, entender y utilizar.” with the approved accompaniment explanation.
- Existing maturity map follows, adding reassurance that one need not solve everything at once; preserve evidence/capability distinctions.
- Existing three-step service journey follows maturity. Audit, comparison, FAQ, archive, next paths, private account caveat and all non-home routes retain behavior.
- ES/EN/PT coherent. One h1, sensible heading order, selectable dialogue, full robots/monitor, no overlap/overflow at1440x900/390x844 and keyboard/reduced-motion.
- No guarantees of agent recommendations, rankings or sales; no claim of cloud guard or PCoff.
- Approaches considered: explain first (current, hides the scene); scene→clear offer→layers→guided start (owner selected). Two-column/new-brand redesign excluded by scope.
- Implementation call: preserve existing components/styles and publish a minimal backport on the public release branch; do not deploy integral main. Generated asset encoded to bounded WebP in Actions, original retained as remote Git blob plus generator output.

## Implementation plan
Use superpowers:executing-plans inline; one whole-branch review and one fix pass. This remote branch/PR is the ledger; no local worktree/build/dependencies.
1. First change the existing actual React/SSR assertions to require scene before h1, two HTML dialogues, offer→layers→first step, preserving localized private entry and one h1. Observe expected RED.
2. Encode fixed generated PNG blob in GitHub using locked sharp0.35.5; keep optimized sibling asset, original unchanged.
3. Modify app/components/comic-home-intro.tsx, app/page.tsx, app/components/maturity-map.tsx, app/globals.css, lib/home-copy.mjs and lib/home-markdown.mjs. Preserve unrelated data/capabilities.
4. Full CI; actual compiled UI browser QA in GitHub with isolated native preview, ES/EN/PT desktop/mobile and keyboard/reduced-motion. Save screenshots/provenance and unchanged artifact inventory. No remote credentials/model/private data.
5. Minimal public branch from fe6f2ca904452042899a69345a5a2ad4f4cec1d2; verify equal affected source blobs, full CI and qualify the exact browser-checked artifact. One independent review of whole feature and backport, no second review.
6. Prepare a NEW exact delivery packet and bounded inactive upload using existing public credential custody, current baseline1772/DEP12373 and checked rollback. Never invoke old consumed packet. Preserve actual ten bindings/settings/runtime. New delivery adapter, if needed, has its own proportional tests/review.
7. One controlled promotion with bounded staged/ordinary readback and rollback; inspect actual public desktop/mobile, record release. No private canary/operator, OAuth, schema, permissions, incident trial or Max mail.
