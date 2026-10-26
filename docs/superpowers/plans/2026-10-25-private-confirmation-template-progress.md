# SDD ledger — plan: docs/superpowers/plans/2026-10-25-private-confirmation-template.md

Base ca59a68fdb7e40a714c38500c98ea8dd0a914036; rama aislada GitHub. Ningún checkout local nuevo.
Pre-flight: Task2 consume buildMcpPrivateConfirmationTemplate/materializeMcpPrivateConfirmation de Task1; firmas fijadas en spec. Task3 consume evidencias de ambas.
Rulings: ver decisiones del plan. Feature aún NO implementada; RED/GREEN pendientes. Servicios privados siguen cerrados, lectores vencen26oct02:59UTC.

Task1: RED contract written before implementation; new exports absent in existing builder. No production code written yet.
Ruling: require independent expectedTemplateHash from qualified CI receipt; a self-consistent untrusted manifest cannot authenticate itself. Risk if omitted: substituted code/data destination could be accepted.

Task1: RED40249264428/job121337352264 at head e441b248:2877tests/2862PASS/14FAIL(new exports absent)/1existingSkip; no unrelated failures. Verified logs before implementation.
Ruling: stdin/resolveDir replaces one known entrypoint token in memory instead of virtual inject: fewer plugin assumptions, same options/source/runtime and no FS write. Relative sourcefile preserves reproducible metadata.
Ruling: output policyHash names SHA(policyJson); it is deliberately NOT runtime planHash=SHA(JSON.stringify(bundle)). Caller later computes the latter from the same frozen public artifact and canonical private policy. No receipt confusion.
Task1: first implementation added after RED; GREEN pending. No deployment/real policy/new credentials.

Task1 additional regression: suspected caller mutation across readFile/build awaits; add an actual compiler test before fixing. Initial native package40249805418/job121339015256 PASS; fullCI40249805397 still in progress at00:34UTC, not counted complete.

Task1 additional regression extends input capture to the WebCrypto await: mutable manifest must not change selected slot or artifact binding while digest resolves. Test written before fixing; existing production source unchanged.

Task1 verified GREEN before added regressions: CI40249805397/job121339015247 at86d6f3e:2877tests/2876PASS/0FAIL/1existingSkip; lint0errors/13warnings(12existing+1new fixed here); five builds passed. Native package40249805418 passed.
Task1 capture REDs verified before fixes:971f3e4/40250054055/job121339778630 failed only the actual compiler caller-mutation regression. At f905959/40250417052/job121340867718:2879tests/2876PASS/2FAIL/1existingSkip; compiler and hashing caller-mutation regressions failed, no unrelated failures. Capture the validated bundle and the exact manifest before first await; remove new unused-variable warning. GREEN pending.
Local exception: bounded disk metadata inspection only. C: recovered to21931692032free bytes on26octUTC; no deletion/download/build performed by this work. Public CI and isolated remote branch remain the execution/storage path.

Task1 capture GREEN8dd54265: CI40252276994/job121346570777 finished success;2879tests/2878PASS/0FAIL/1existingSkip, lint0errors/12existingwarnings, five builds PASS. Package40252276974/job121346570984 PASS. Both capture regressions accepted.
Task2 RED875a2b70: CI40252537565/job121347355045:2881tests/2878PASS/2FAIL/1existingSkip, only the two new public-workflow contracts (policy input and missing outputs). Native package40252537576/job121347354667:18PASS/3newFAIL when compiling exact historical bytes.
Diagnostic58c47ca: package40252787000/job121348099561 shows esbuild Unterminated string literal; no output at compiler boundary, not a size/slot rejection. Root cause: String.replace(token, expression) interprets $&, $`, $' and $$ inside the frozen artifact as replacement metacharacters. The actual frozen bytes contain such syntax, unlike the small seed. Fix only the insertion boundary to a replacer function ()=>expression; add small dollar-markers regression. Native tests already RED before fix, original artifact/runtime untouched. Task2 workflow/docs implemented after observed RED. GREEN pending.
Support check26oct01:07UTC same five known message IDs; no bodies/OTP/email new. Readers still expire02:59UTC, closed service baseline not re-read or altered in this source block.

Task2 GREEN3d6169e: package40253140415/job121349183231 passed22/22, actual historical worker26ec0366 unchanged; template1918930bytes/SHA b181c4f246fec651e79cd56caa622f6a9589d8ba32a233e83e132686e951c712, materializer3941bytes/SHA470e9ffef8c5fe43f56c4c23a9b478f34305272b0faa34480fb1606303926f29. Artifact12621825012/1081553ZIPbytes/SHA50c5a57be3fafe2fd381b5c170d9cb2828a21be278591db33c902e89417093f4, expires2nov01:14UTC. FullCI40253140495/job121349183313 passed2881/0/1existingSkip, lint0errors/12existingwarnings, five buildsPASS; other two build workflowsPASS.
Fresh whole-branch read-only review ca59a68→3d6169e:0Critical/0Important/1Minor; add exact native-only diagnostic fixture path to package trigger here. Controller future/hosted trials/independent ZIP-content audit declined as outside this source review; remain pending gates, not silently accepted.
Ruling: expectedTemplateHash pins actual template+embedded artifact, not independent manifest provenance. Helper is data-only: private controller MUST compare all manifest fields with qualified receipt and frozen artifact and independently validate current authority/window. Runtime independently derives artifactKey and rejects mismatched policy before I/O. Documentation now states this explicitly. No extra helper authority claimed.
Task1/Task2 checklist complete on preceding qualified head. Task3 final trigger/docs-only closure CI and reviewer delta, merge exact tree, main synthetic package and continuity still pending; no private consent or deployment from this branch.
