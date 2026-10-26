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
