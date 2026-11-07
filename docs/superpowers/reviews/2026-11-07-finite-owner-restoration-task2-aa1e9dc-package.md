# AFW Task2 — complete review package

Read-only task-scoped review; no runtime, permission, main or promotion authority.

Repository: tokenizartinfo-ops/agent-friendly-web
Task BASE: 2c6b5a0eb503b8d877158f85832c510b9a45f7ca (accepted Task1 final)
Task HEAD: aa1e9dc0161ffa0b56777a96aa274cff272484cd
Final tree: 258ecbd8428daa9ffecd6e463afc7971628c7e33
Tested checkout: d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce; tree a672e4e931e613ff8ec850b644bdc4f4d78da985
Post-test delta: only retired temporary qualifier (aef3aca90444f92aad1a7f85d26355ba353ca69b), then added report. All twelve code/fixture/test blobs identical to tested checkout. Main remains0c9c475b3ebaa970fc11d628b40e50a90cceb727.

Brief: docs/superpowers/briefs/2026-11-06-finite-owner-restoration-task2.md @ c478cc7e85c093614c7ae705ce2ec76615ed8207, blob31504d60cea7e9312c5b0dc014336a77ba6d653c. Later rulings supersede earlier qualification assumptions in that same brief.
Report: docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md @ aa1e9dc0161ffa0b56777a96aa274cff272484cd, blob422512db750b743dce8b9f6560652ee9bb91fdcb. Full report content also appears as the complete added-file diff below; avoid duplicating the same content when reviewing.

Generated from exact remote Git blobs and full BASE..HEAD compare, not HEAD~1. Unified context10; each diff reconstructed both inputs byte-for-byte, including final-newline state. Root independently verified protected3166baseleaves(mode/type/blob), the final code tree against tested tree, run/job/TAP/readback primaries. This is evidence to assess, not a quality verdict.

## Commits (62)

- 784659eeda747b0959b14d10f5a755da865ad073 [parent 2c6b5a0eb503b8d877158f85832c510b9a45f7ca] test(afw): preserve exact native owner checkpoint and fixed SYN service
- 77875705b58bb70c718a187abfb1a1ceca7ddf21 [parent 784659eeda747b0959b14d10f5a755da865ad073] test(afw): observe original owner cleanup alarm and opt into persistence
- 17d1e557eb07caba42f3fc8ed48aedf987a92a1d [parent 77875705b58bb70c718a187abfb1a1ceca7ddf21] test(afw): export and cold-load original native owner state without reseeding
- e278f2a0b446344592b9a870af9e4a03d9e22670 [parent 17d1e557eb07caba42f3fc8ed48aedf987a92a1d] test(afw): require produced-cycle closure through the original real-C0 alarm
- be18c82cf70e18cc1b9bb69fbbabaf7556391608 [parent e278f2a0b446344592b9a870af9e4a03d9e22670] test(afw): keep checkpoint imports scoped to used operations
- 474e58189802bd62aa2ddb2febee196b67c435e0 [parent be18c82cf70e18cc1b9bb69fbbabaf7556391608] test(afw): qualify original-alarm owner cleanup RED across exact cold checkpoint
- c6f70abf14d190f6e90d14eadabd5d3abfcfdbe6 [parent 474e58189802bd62aa2ddb2febee196b67c435e0] test(afw): specify owner cleanup records journal and retained lifetime contracts
- 2017f1c934813e72360cd7b58acc602eb3c55aad [parent c6f70abf14d190f6e90d14eadabd5d3abfcfdbe6] feat(afw): encode bounded factual owner cleanup records
- 37cd24fb5694ba8fb84f0e06dde67302006bdef6 [parent 2017f1c934813e72360cd7b58acc602eb3c55aad] feat(afw): persist append-once cleanup facts through native transaction readback
- b8c6eeaaa7211b6699a00caa0e3609f4e2e977dd [parent 37cd24fb5694ba8fb84f0e06dde67302006bdef6] feat(afw): retain original cleanup work without creating admission
- c8bff9cb7ea56fdc63b190b48266ed6ee32ff7c7 [parent b8c6eeaaa7211b6699a00caa0e3609f4e2e977dd] Task2: add fixed terminal monitoring revocation under native fence
- 006c03bb138153d590b9012cdbc3baeae1e7498f [parent c8bff9cb7ea56fdc63b190b48266ed6ee32ff7c7] Task2: qualify native cleanup lineage and retain exact reductions
- 2d9a690a3451c5202d534f6ae9cd462fb60ad5a1 [parent 006c03bb138153d590b9012cdbc3baeae1e7498f] Task2: compose owner closure through the original native alarm
- ea3faec53406a5ae5a43f3d621cd67c389891731 [parent 2d9a690a3451c5202d534f6ae9cd462fb60ad5a1] Task2: bounded component syntax and contracts before any native I0
- 7a6d7974bffbcc193832af0f6fcd9045c7371cc5 [parent ea3faec53406a5ae5a43f3d621cd67c389891731] Task2: correct terminal fence predicate syntax before qualification
- eaa089feacf3667e44b54133519d6b7d28401cef [parent 7a6d7974bffbcc193832af0f6fcd9045c7371cc5] Task2: fixed SYN native monitoring cleanup component
- 481650c581a7abdf2da1f7d32f62ee5a1ee04bf5 [parent eaa089feacf3667e44b54133519d6b7d28401cef] Task2: cover five fixed native monitoring reduction boundaries
- 9937c86a9491b5ed801f3075cae681a12e65bb71 [parent 481650c581a7abdf2da1f7d32f62ee5a1ee04bf5] Task2: verify native D1 DO KV wiring and same non-expiring client after cold load
- 1415d980d88cf2b257eaa69b25a07ba1b666d539 [parent 9937c86a9491b5ed801f3075cae681a12e65bb71] Task2: capture syntax correction and fixed native SQL component preflight
- 230f907d86f3553c584075d72113484c443f098f [parent 1415d980d88cf2b257eaa69b25a07ba1b666d539] Task2: native partial-prefix faults and original cleanup lifetime probes
- 731a6cb10d9b40bebeab5d8ae477fdc48199380e [parent 230f907d86f3553c584075d72113484c443f098f] Task2: narrowly armed SYN foreign-isolate late KV observation seam
- c695e0b07ac829e65561a9ea3001ca66cb4c7fbd [parent 731a6cb10d9b40bebeab5d8ae477fdc48199380e] Task2: restore fixture-only faults before native checkpoint flush
- 0d4e3bab66250f2260167e002ee83cd604a1c09c [parent c695e0b07ac829e65561a9ea3001ca66cb4c7fbd] Task2: preserve pair-local genuine prefixes and real partial cleanup restart
- bff63d0edaf66d80e26c83cb2148562ecc458814 [parent 0d4e3bab66250f2260167e002ee83cd604a1c09c] Task2: remove unused cleanup-only constant
- f4614764e4209a6066cd80c2610db386aa8f2b6f [parent bff63d0edaf66d80e26c83cb2148562ecc458814] Task2: preserve passive native cleanup timing and causal failures
- 60f1ba2adcfeb30faacb0c379b5a4ba2e8398edc [parent f4614764e4209a6066cd80c2610db386aa8f2b6f] Task2: opt-in passive cleanup observation on current QA graph
- 9b4750c6e6c0b7517cb51c9d6cd5b4c8e0eca091 [parent 60f1ba2adcfeb30faacb0c379b5a4ba2e8398edc] Task2: collect passive cleanup counters before original native alarm
- db383c1592a1fc31ea7db35a6c2d45d0ae6538a8 [parent 9b4750c6e6c0b7517cb51c9d6cd5b4c8e0eca091] Task2: qualify eleven native assertions in six original-clock groups
- 798353d7a02f7abdb9257e0a756f9f0a85cb62bc [parent db383c1592a1fc31ea7db35a6c2d45d0ae6538a8] Task2: verify final component set and current M footprint before any I0
- 636c3cab76225729eb9c599061a477df5309c1d7 [parent 798353d7a02f7abdb9257e0a756f9f0a85cb62bc] Task2: retain separate producer diagnostics for both genuine prefixes
- c97782a3aab94537a4e58e09f46fa75f8bc109d0 [parent 636c3cab76225729eb9c599061a477df5309c1d7] Task2: qualify exact own activation target without inventing missing acknowledgement
- 84abb279530cb40d45a80f936d95f1cd518d1af6 [parent c97782a3aab94537a4e58e09f46fa75f8bc109d0] Task2: freeze fifty-one checks in six paired original-alarm qualifications
- e5815eed0e66d3ea3f099f3fe3980cf60db87b10 [parent 84abb279530cb40d45a80f936d95f1cd518d1af6] test: compose cleanup diagnostics with existing SYN ceiling
- 922c9a3b088b18eb2e11b6009ac096bf64861fc9 [parent e5815eed0e66d3ea3f099f3fe3980cf60db87b10] test: register monitoring components only in frozen component group
- d46daf51f8a54a8a969cb078808d3084c026e730 [parent 922c9a3b088b18eb2e11b6009ac096bf64861fc9] ci: qualify corrected SYN cleanup composition across all 51 cases
- 72b3370eb7f40d5ad572916d925a3555628c4fa5 [parent d46daf51f8a54a8a969cb078808d3084c026e730] test(afw): qualify explicit SDK-only late writer with original budgets
- 442f2b6f3f232a70551d6be1dcb60428cfeb1c46 [parent 72b3370eb7f40d5ad572916d925a3555628c4fa5] test(afw): correct frozen Task2 qualification premises
- 817c26a081fe8916bf1d743dbe1098ddd5bfc13f [parent 442f2b6f3f232a70551d6be1dcb60428cfeb1c46] test(afw): correct frozen Task2 qualification premises
- 39fa1f16ca16dbdd3381129b9166b1efd188f951 [parent 817c26a081fe8916bf1d743dbe1098ddd5bfc13f] test(afw): correct frozen Task2 qualification premises
- 5cdd41b5a730d64ddcff3b2dbb260bb188d294d4 [parent 39fa1f16ca16dbdd3381129b9166b1efd188f951] test(afw): correct frozen Task2 qualification premises
- 0437b745c9915d009249ac88bcf35299132ecc18 [parent 5cdd41b5a730d64ddcff3b2dbb260bb188d294d4] ci(afw): verify SDK qualification premises before original-clock cycle
- 7d01d84eee91c5032d9bf91081cdd5cefe91de40 [parent 0437b745c9915d009249ac88bcf35299132ecc18] test(afw): retain late SDK work in its original request context
- 39dba5ad8d04cfd8b9d197003d13aac919bbab35 [parent 7d01d84eee91c5032d9bf91081cdd5cefe91de40] test(afw): retain late SDK work in its original request context
- 22e9cfd13e41ecede2acfbe7e8d89593796d0148 [parent 39dba5ad8d04cfd8b9d197003d13aac919bbab35] test(afw): retain late SDK work in its original request context
- 00c24235d2dd286f57e32860be05f02ddf38cb83 [parent 22e9cfd13e41ecede2acfbe7e8d89593796d0148] test(afw): preserve original identity and validate dated SDK facts
- 485edbedf04a1072d74c1130b20fc4ac6c311ee2 [parent 00c24235d2dd286f57e32860be05f02ddf38cb83] test(afw): preserve original identity and validate dated SDK facts
- 818bc4d4e6fb1935e594951ba09d3f9536ba49d6 [parent 485edbedf04a1072d74c1130b20fc4ac6c311ee2] ci(afw): freeze corrected 51-case owner restoration qualification
- d905aaf38263111cd2dcd4029aedf0ac87aed699 [parent 818bc4d4e6fb1935e594951ba09d3f9536ba49d6] test(afw): route fixed cleanup M controls through preserved ingress
- 2bca69a9693258817760531ab06852d677828ad6 [parent d905aaf38263111cd2dcd4029aedf0ac87aed699] test(afw): verify fixed M ingress and preserved g4 checkpoint
- 4072983777e0a7a68ee3425b8171f6fb6870fb25 [parent 2bca69a9693258817760531ab06852d677828ad6] test(afw): qualify fixed M routing and existing g4 evidence
- 6b3a71df2bc4eecdbdbce3c0e23daad3cca3475f [parent 4072983777e0a7a68ee3425b8171f6fb6870fb25] test(afw): isolate launcher premise and trace bounded M preflight
- f591b7e8590b694cd3b7693f6537c6a92e5ee8e5 [parent 6b3a71df2bc4eecdbdbce3c0e23daad3cca3475f] test(afw): use file launcher after bounded eval Worker contrast
- ccfa81d2b1bbe91ac937b548dd669d42d5a81384 [parent f591b7e8590b694cd3b7693f6537c6a92e5ee8e5] test(afw): recover exact archived routing preflight inventory
- e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb [parent ccfa81d2b1bbe91ac937b548dd669d42d5a81384] test(afw): freeze complete owner cleanup qualification after routing audit
- 9a189cff22d6f24627d21b631338ef0dc4b5afff [parent e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb] test(afw): audit original g5 M profile before denial oracle
- 446a57082503b560810fe99d8875ce14e1b3ccea [parent 9a189cff22d6f24627d21b631338ef0dc4b5afff] test(afw): preserve actual M denial facts before g5 assertions
- b2f668c55d0ae0a5fdffc0dec2d0f579158bec5a [parent 446a57082503b560810fe99d8875ce14e1b3ccea] test(afw): observe ordinary M data denial with fixed profile proof
- 3cf6fd61f5b455dd7e129b2aef63abd73885828f [parent b2f668c55d0ae0a5fdffc0dec2d0f579158bec5a] test(afw): qualify denial oracle without mounting archived workers
- 53b4ead2966d4366b6417a9a54f46577ddc0fcfc [parent 3cf6fd61f5b455dd7e129b2aef63abd73885828f] test(afw): run bounded pure denial oracle and strict readback
- d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce [parent 53b4ead2966d4366b6417a9a54f46577ddc0fcfc] test(afw): freeze fifty-one cases with real M denial oracle
- aef3aca90444f92aad1a7f85d26355ba353ca69b [parent d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce] test(afw): retire verified owner restoration qualifier
- aa1e9dc0161ffa0b56777a96aa274cff272484cd [parent aef3aca90444f92aad1a7f85d26355ba353ca69b] docs(afw): record owner restoration source qualification

## Full net stat and blob inventory

| Path | Status | Added | Deleted | Final blob |
| --- | --- | ---: | ---: | --- |
| docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md | added | 348 | 0 | 422512db750b743dce8b9f6560652ee9bb91fdcb |
| lib/mcp-qa-finite-initial-cleanup.mjs | modified | 34 | 10 | 0a04ae3a4d74c2c7939b1654683054b1d5d751d4 |
| lib/mcp-qa-finite-owner-cleanup-journal.mjs | added | 67 | 0 | 127e5906891b20d2f08c74a412383b8b7e3ff1e2 |
| lib/mcp-qa-finite-owner-cleanup-records.mjs | added | 25 | 0 | 6c751081e22ba6446664014090f8015a65e22407 |
| lib/mcp-qa-finite-owner-cleanup.mjs | modified | 608 | 0 | 7cb54895677ee67852f7c42013238bfc1e366d93 |
| lib/mcp-qa-finite-preparation-issuer-store.mjs | modified | 34 | 0 | b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb |
| lib/mcp-qa-finite-stage-work.mjs | modified | 11 | 0 | 068d35c2555c7dc711c487f6021ec572bd3af067 |
| test/fixtures/finite-first-connection-publication.mjs | modified | 77 | 1 | 047bd6afc34858fe5ce972120101a8d91c092c1e |
| test/fixtures/finite-initial-entry-world.mjs | modified | 86 | 53 | 8477a05e955d854e001d2315a8b2c4c6c6dbbbe2 |
| test/fixtures/finite-owner-cleanup-persistence.mjs | added | 346 | 0 | 8ef9d30b04f766354b05893f49e6e93961f4e4d1 |
| test/fixtures/finite-owner-cleanup.mjs | modified | 207 | 8 | bcfbecea377e953bfe6545ce1e1fa5be7f1c0129 |
| test/mcp-qa-finite-owner-cleanup-native.test.mjs | added | 151 | 0 | c3f06092ff35438b9a7d9872bd1a913c6cc6b1a1 |
| test/mcp-qa-finite-owner-cleanup.test.mjs | added | 38 | 0 | 78fea3dfb07425c3000f336d842accf39e052cba |

## Qualification primaries

Run42381567231/attempt1, Source d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce; terminalSUCCESS 2026-11-07T15:00:02Z. Source51tests pass, fail/cancel/skip/todo0: prepare_g0 14+10+9+2+5=40; consume_g0..g4=2each; consume_g5=1. Twelve jobs success. Focal24scenarios/48assertions is outside51; failed intermediate runs remain failures. Qualification is SOURCE/SYN, not production/PC-off.

| Job | ID | Conclusion |
| --- | ---: | --- |
| prepare_g0 | 128430089997 | success |
| prepare_g2 | 128430090209 | success |
| prepare_g1 | 128430090327 | success |
| consume_g2 | 128433264005 | success |
| consume_g1 | 128433273551 | success |
| consume_g0 | 128433360355 | success |
| prepare_g5 | 128433725018 | success |
| prepare_g3 | 128433810087 | success |
| prepare_g4 | 128433937316 | success |
| consume_g5 | 128436904101 | success |
| consume_g3 | 128436965563 | success |
| consume_g4 | 128437091878 | success |

| Artifact | ID | Bytes | SHA256 | Expires UTC |
| --- | ---: | ---: | --- | --- |
| r2-green-g3-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578947400 | 16202 | a705c9c2731eca7b07652fb7e4b28dfcc44161408ce13ebab6c9074790908676 | 2026-11-14T14:59:18Z |
| r2-green-g3-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578852207 | 1240276 | 2b0ae92643bcb4b387187d73212b1afb422b4944c9d9c2d520ad59f3ca2e5f25 | 2026-11-14T14:55:21Z |
| r2-green-g3-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578577884 | 10851210 | 46a8e6122375de5e7489f38170e76f0582c45178d02b3e42b7056b460fde8a32 | 2026-11-14T14:55:17Z |
| r2-green-g2-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578550692 | 10851175 | d08b0a2d91abe40f4459c4287f487163fe6af830e3b915c7c6c5161b84a85bcf | 2026-11-14T14:39:21Z |
| r2-green-g5-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578532171 | 18130 | 8f391441de5967fb172dfb9da13d1536376f61f6e0eee410d70e83fa560594a6 | 2026-11-14T14:57:00Z |
| r2-green-g2-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578526063 | 10448 | 72fcf6e0786cb34d8e6aa273270586fd1b622081222857a9a1f565376e5dfb57 | 2026-11-14T14:41:23Z |
| r2-green-g2-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578475924 | 1240378 | 21724fcbef34ecc7d4671373a2b61d4abc83ca387cbbed129f8637ec818c2d48 | 2026-11-14T14:39:26Z |
| r2-green-g4-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578368708 | 10851333 | 588433172f3601c49dfc9b710312584a50897c3655239557ea31d1364d9854f1 | 2026-11-14T14:55:49Z |
| r2-green-g4-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578359220 | 10871924 | f8dfb2631b0c8600d086e25d248fc32c9ab714b51f10dcf356ff1ac2eb64bb9c | 2026-11-14T14:59:52Z |
| r2-green-g4-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578304042 | 1240384 | 7379f81193aa15d74c8a51c501ec367314fbf41bdfd5e803778c8263153b097f | 2026-11-14T14:55:54Z |
| r2-green-g5-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578257785 | 1322441 | 4a828d39a5808259fd9af900152c041447146214746305a876b8b062fc9cb1b2 | 2026-11-14T14:55:03Z |
| r2-green-g1-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578236238 | 2478320 | cbad4844a5220c6235ffee1063bbc78742c73d1bc347ec653e6f2a8f23e5c6a2 | 2026-11-14T14:39:29Z |
| r2-green-g5-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578113303 | 11007749 | f9607b4c262a98a9711298de6897ea17408baaebecf56482c051e96420d7edcd | 2026-11-14T14:54:57Z |
| r2-green-g1-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578076858 | 21679293 | f4240a981213a010c8b83777d0d2899dba2cae44b61daebd3a9e5cc364ebd0d1 | 2026-11-14T14:39:23Z |
| r2-green-g1-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13578063351 | 17958 | 88b5cab5c6a368521bd58eaeaa1064c7d8bc7afb762b8a12464bcb1efb6215c6 | 2026-11-14T14:42:22Z |
| r2-green-g0-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13577919516 | 10734 | cde09f840ddccfe7c11b91f9c16d341adc69a7a3657df06964084a843fae2ba9 | 2026-11-14T14:41:48Z |
| r2-green-g0-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13577658656 | 1244188 | f8b98029a3c68aa2d5a405807da3f8a2a5c396ec2ea57ba7628aeedf551ae9b8 | 2026-11-14T14:39:51Z |
| r2-green-g0-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 13577144902 | 10852120 | 2be57ce4aedc03565a6bd47239bfbe372a1a363e5beb3e431f4a09a086f66a69 | 2026-11-14T14:39:45Z |

## Full unified diff, BASE..HEAD (-U10)

### docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md

`````diff
diff --git a/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md b/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md
@@ -0,0 +1,348 @@
+# AFW Task2 — cierre owner nativo y restauración con la alarma original
+
+Estado: DONE_WITH_CONCERNS. Calificación final SUCCESS: 51/51 casos, 12/12 jobs y readbacks completos; revisión independiente pendiente. SOURCE/SYN exclusivamente. operationalReadiness=false; completePackage=false; PCoff=false. Task1 permanece aceptada; Task2 no completa el plan total ni autoriza runtime, publicación o prueba humana.
+
+## Alcance y revisiones
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=SOURCE/SYN GitHub Actions; ORIGIN=GitHub connector; RESOURCE_ID=feat/finite-native-cleanup-20261101. Un escritor Source; Root conserva el ledger separado. Rollback: commits propios nuevos con CAS, sin reescribir historia.
+
+Brief vinculante: [c478cc7e](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c478cc7e85c093614c7ae705ce2ec76615ed8207/docs/superpowers/briefs/2026-11-06-finite-owner-restoration-task2.md), blob31504d60cea7e9312c5b0dc014336a77ba6d653c, rulings del 7 nov, incluida la alternativa de oracle puro ante la dependencia QA, más autorizaciones acotadas de Root para el probe del launcher y los readbacks históricos sin reproducir efectos. BASE Task2: 2c6b5a0eb503b8d877158f85832c510b9a45f7ca, tree57ac1355a85560dee14b2f933b4b68f877911ae2. No confundir con BASE combinado histórico7aab233.
+
+Checkout congelado de calificación: d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce, treea672e4e931e613ff8ec850b644bdc4f4d78da985. Main protegido0c9c475b3ebaa970fc11d628b40e50a90cceb727. Revisiones finales de retiro del qualifier/reporte se consignan al cierre y no se presentan como checkout ejecutado.
+
+## Implementación y límites de autoridad
+
+El mismo alarm original detecta obligaciones de conexión/issuer/SDK/notice y las califica con almacenamiento nativo, Source/cápsula/backup, owner/revisión, puntero/módulo/configuración y reloj original. El consumidor separado no relaja el lector empresarial pre-C0 de Task1.
+
+El orden es freeze issuer, fence terminal SQL y primaria, revocación del grant y retiro append-only del consentimiento, restore por el escritor original, reducción SDK exacta y receipt. El scope cleanup observa el ciclo original; no amplía la admisión empresarial ni activa capacidades nuevas. Send sin ACK/Observed queda incierto y bloquea complete; las lecturas posteriores son hechos, no ACK inventados. El selector SDK original viene de la Reference nativamente calificada; D1 UUID no sustituye SDK ID y una lista vacía no acredita revoke.
+
+El scope cleanup es no autorizante. Registra la promesa real antes de competir con el timeout; un aborto lógico no elimina trabajo pendiente ni permite un Root nuevo en la misma ctx. Objetos de reducción/receipt usan identidad WeakMap de la invocación vigente, no capacidades serializadas.
+
+Se mantienen I0, C0=I0+900000, C1=C0+180000; deadlines originales Root=30000ms y child=5000ms; tres slots originales C0/C0+60000/C0+120000. Los tiempos físicos observados se consignan sin redondear un overshoot del timer. Ni fuentes ni clocks se renuevan. El receipt final acredita CURRENT_CYCLE_BUSINESS_CLOSED, siempre globalNativeDrainVerified=false y sdkNamespaceEmptyVerified=false.
+
+### Blobs productivos (idénticos a d46 en la corrección7nov)
+
+- lib/mcp-qa-finite-stage-work.mjs: 068d35c2555c7dc711c487f6021ec572bd3af067
+- lib/mcp-qa-finite-owner-cleanup.mjs: 7cb54895677ee67852f7c42013238bfc1e366d93
+- lib/mcp-qa-finite-owner-cleanup-records.mjs: 6c751081e22ba6446664014090f8015a65e22407
+- lib/mcp-qa-finite-owner-cleanup-journal.mjs: 127e5906891b20d2f08c74a412383b8b7e3ff1e2
+- lib/mcp-qa-finite-preparation-issuer-store.mjs: b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb
+- lib/mcp-qa-finite-initial-cleanup.mjs: 0a04ae3a4d74c2c7939b1654683054b1d5d751d4
+
+## Persistencia y modelo SYN
+
+El productor usa el modo first-connection-publication real existente y conserva scripts/opciones actualmente montados, worker names, namespaces, D1/DO/KV nativos, Plan/State/Reference/contadores/alarm y registry SYN después de dispose/flush. El consumidor restaura archivos exactos desde artefacto; no ejecuta bootstrap/seed/productor ni reconstruye marcas WeakMap.
+
+El manifiesto verifica paths/bytes/SHA256, sqlite D1/DO/KV, M/QA scripts y metafiles. OAUTH_KV de canary-first-connection y AFW_FINITE_OWNER_OAUTH_KV de qa-first-connection comparten first-connection-oauth. client:<id> no expirable se lee semánticamente antes y por ambos aliases después del cold-load; se guardan hashes saneados, no se exige igualdad de datos TTL ya vencidos.
+
+El registry solo atiende las rutas SYN fijadas. El inventario terminal de bootstrap es MODELED PROVIDER INPUT, no conclusión de que un Workflow Cloudflare real terminó por retornar una llamada local. El restore solo cambia la versión baseline y anotación del Plan original con ACK nativo de la operación SYN; su pérdida queda modelada por separado.
+
+Las copias cold-load de casos pareados son réplicas SYN aisladas del checkpoint; cada una conserva el alarm/counter/Plan original de su linaje. No representan dos consumidores productivos ni acreditan drenaje global.
+
+Siete linajes genuinos en seis grupos: g0=1, g1=2, g2=1, g3=1, g4=1, g5=1. Grafos M/QA: 14 TOTAL; g5 agrega1 grafo/script SDK-only, TOTAL 15. No son 14 por linaje. Máximo 2 instancias nativas simultáneas por consumidor; g0 sin competidor. Doce jobs≤15min, tres lanes pair-local y export originalC0−120s.
+
+## Corrección de premisas7nov
+
+Reference pre302.expiresAt=null es la observación histórica correcta de SDK1.2.1. El SDK guarda el grant del código con KV TTL600 y asigna expiresAt después del canje real con refresh0; M configura accessTTL=min(300,remainingD1). Se conserva Reference byte a byte y se observa inmediatamente el mismo SDKid/correlation/metadata, expiry y token nativos después del canje. g0 exige expiry finita≤C0 original y reusa la misma reducción normal; no emite una segunda revocación.
+
+g5 es un adversario SDK-only declarado: callback AFW omitido SOLO en ese worker, misma identidad/client/audience/scopes y subjectToken genuinos; accessTTL300/refresh0. M rechaza token-exchange y no emite refresh. La variante no es admisión M ni cambia sus flags. Solo g5 demora authorize/primer canje hastaC0−300 sin Root vivo, prepara el JWT SYN antes de esperar y no extiende cookie/ticket/preconnection/consentimiento/C0. Conserva expiraciones observadas del código KV, D1, grant y token.
+
+Antes de emitir, token con≥65s de vida real y child5s disponible; objetivoC0−75. Control positivo por mf.dispatchFetch con MF-Route-Override fijo canary-first-connection y Host/upstream original contra /mcp obtiene datos con el mismo token; después del cierre el mismo wrapper y M deben denegar acceso/datos por la operación real y su protocolo. El oracle registra la respuesta antes de assertions. No se usa QAdefault ni se atribuye D1 únicamente por HTTP.
+
+La promesa SDK real se retiene antes de la carrera. A5s se emiten headers403 y cuerpo fijo sin token, el Root termina; el transporte permanece abierto hasta settlement físico. Release cambia una señal escalar; timer250ms corre en el contexto original con límiteC1. No resolver promesas desde otro request, no compatflags ni Root renovado. Se conserva reached, denegación, retención, rechazo/retorno nativo y settlement; no se exige una escritura exitosa ficticia ni se afirma drenaje global.
+
+## Historia de pruebas y fallas preservadas
+
+- RED causal42289097871, checkout 474e58189802bd62aa2ddb2febee196b67c435e0, prepare128137518701/consume128144105898. Producción todavía BASE2c6. Recuperación80.033s antesC0; native alarm original entró enC0=1793998029000; fallo por cleanup posterior no disponible, State pending/restore0. Root aceptó la causa; no se repitió. Límite entonces: wiring/archivos KV no eran aún lectura semántica client; GREEN la fortalece.
+- Preflight42293207205/128151676487, ea3faec53406a5ae5a43f3d621cd67c389891731: SyntaxError Unexpected identifier 'fail'. Sin I0 ni artefacto. Corrección sintáctica en fixture.
+- Preflight42293728842/128153465656,1415d980d88cf2b257eaa69b25a07ba1b666d539:19 PASS, lint exit0 con1warning SLOT sin uso; eliminado después. No registrar cero warnings para ese run.
+- Preflight42295005231/128157841267,798353d7a02f7abdb9257e0a756f9f0a85cb62bc:40 PASS y M real1988061B/c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/340inputs. Sin I0; previo separado.
+- Primer GREEN inválido42295503038,84abb279530cb40d45a80f936d95f1cd518d1af6: loader de instrumentación releyó producción y perdió CEILING SYN. Falló createFiniteInitialLease/narrow antes del estado/efectos. El pase foreign-pointer fue vacuo, no cobertura válida. Nueve artefactos preservados. Arreglo compone sobre sources transformados;6producción intactos.
+- Segundo GREEN42298166866,d46daf51f8a54a8a969cb078808d3084c026e730: FAILURE6nov22:06:34UTC. Principal restauró/cerró realmente; g0expiry falló por exigir Reference histórica no-null. g1 dos casos PASS, jobFAIL por descarga inmediata por nombre; g2 dos PASS con límites de cobertura descritos abajo. g3/g4 no ejecutados. g5 falló antesC0 al exigir refresh_token inexistente: no petición tardía, hold ni commit. No mezclar esos pases con otro run.
+- Root recuperó ex-post el MISMO artefacto g1 13543636518 por ID:16939B/archiveSHAec67636715547d0e8fdaaba050d9995e2ba6107bfc722049271952ed9b0cc8a2; manifiesto d46/g1 y3ficheros exactos. El job original sigueFAIL. La visibilidad transitoria fue hipótesis, no causa probada.
+- Preflight dirigido42370972780/128398833363,0437b745c9915d009249ac88bcf35299132ecc18: syntax/lintPASS; workerd canceló el contexto por espera sin resolución local y posterior cross-request promise resolution (io-context.c++:1624). Assertsettledfalse, sin I0 ni artefacto. Corrección causal timer/señal escalar, no flags.
+- Preflight dirigido42371140511/128399337083,22e9cfd13e41ecede2acfbe7e8d89593796d0148/tree64904b864bb7a3bd343b184b9ff4159147200b35: SUCCESS; SDK nativo completó/canjeó con TTL300/refreshausente, preexpiry null→postexpiryreal; hold a5ms, denegación EXACT5s, Rootdeadline30s, retención80.140s, bloqueo409 a sustitución y KV/SDK retorno real tras release. Artefacto 13573537287/537833B/SHAed8891f991f20843c2e8674b7aa7e59704a026fd78a817db7d8123fe17d3bf70; siete archivos+manifest readback porID primer intento. Componente sin I0 ni admisión AFW; no suma a GREEN51.
+
+- Tercer GREEN42371498327/818bc4d4e6fb1935e594951ba09d3f9536ba49d6: FAILURE7nov12:46:46UTC; 50 PASS / 1 FAIL a nivel tests, sin GREEN51. g0..g4 diez casos nativos y40componentes PASS. g5 job 128406714718 falló ANTES de petición SDK-only/C0 en control positivo: Invalid Host:127.0.0.1; getWorker().fetch usa proxy Miniflare que conserva Host loopback al restaurar URL. Preflight previo verificó SDK-only pero no ese wrapperM: limitación reconocida. g5 outcome13575030294/1474B/b7f6ce42989e96861a263be0bce1f032ff352bfdd57f197c0f505e6d034d86a6 contiene solo TAP, por lo que readback estricto falla correctamente. g4 job 128406835418 dos PASS, retención y restart nativos; FAIL solo por readback que omitió el directorio g4-partial explícitamente subido. Outcome13575185515/10872023B/90edd8e83d2789fce9cca75b53d02102080e6ba0d60c891eac81fc90aff777e8 preserva checkpoint parcial; no borrado para ocultar la discrepancia. g3 job 128406758796 dos PASS/readbackPASS. Dieciocho artefactos preservados; algunas líneas JSON R2 de g3/g4 se cortaron a65536 caracteres en logs, JSON completos preservados en artefactos. Fuente congelada hasta terminal y rulingRoot; no rerun ciego.
+- Preflight42375072153/128410871300, Source 4072983777e0a7a68ee3425b8171f6fb6870fb25/tree75fbd393e75f4e7e62c22e42dec3543bbc28ad67: CANCELLED por límite15min13:17:08UTC. Sintaxis/lint y auditg4 existente PASS; último marcador13:02:21 provisional-bindings-start, antes de M-compile/producir/canje/wrapper. No se acredita I0 abierto ni dispose temprano. Lanzador introducido node --input-type=module heredoc difiere del CLI de archivo aceptado; Miniflare Worker eval CommonJS hereda execArgv y Node22.23.4 lo interpretaESM, mientras main bloqueaAtomics.wait. Probeconfirmatorio posterior requerido; noatribuirM/Host/Cloudflare desde timeout. Always preservó artifact 13575578639/83989B/SHA21f779fd12609d3c369d4988fc7c3eebafa322e1c9e8a63635f90243748efc8d (expira14nov13:17:08); descarga digestPASS, readbackcompletoFAIL por outcomeM/graphs ausentes, no hashbad. Audit histórico:43files parcial, manifestSHAa9ff31854de268d6a3096255f85686c5d1b110459e96cbd6208fc3dad562c80d; sourceArtefacto818bc distinto de verifier 4072983, envelopehistóriconoteníadescriptor. No MF/I0/efectos durante audit.
+- Preflight42376693686/128415622363, Sourcef591b7e8590b694cd3b7693f6537c6a92e5ee8e5/tree1056104aa9748599b67259d62419aeb2b735028b: controlPASS, jobFAIL por inventario de graphs4≠3; cuartoarchivo legítimo native-syn.json fue omitido del conteo esperado, no del upload. Probe previo confirmó ReferenceError(require no definido) con execArgv--input-type=module frente éxito requireAvailable conCLIarchivo/execArgv vacío; sin reproducirAtomicswait/I0. Launcher archivo desbloqueó getBindings y productor en38s; mismoM/c493 read_project_summary correcto(POST200/POST202/GET405/POST200), negativo401sin datos. I0=1794057804000,C0=1794058704000,C1=1794058884000,disposedAt=1794057871245 (<C0), closureProvedfalse. SDK-only92f655... compiladoigual320211B/187inputs, hold80s NOrepetido. Artifact13575584835/1322925B/SHA3477ad8f889a9c9229c10d62bb30a21bccd0d1cf6f1e23b3cb9aa31f54d675f6.
+- Recuperación histórica42377045988/128416680190, verifierccfa81d2b1bbe91ac937b548dd669d42d5a81384/treebed7cf0b4769f8e9f10394fa11455fb12d326088: SUCCESS. DescargaMISMOartifact13575584835/sourcef591;12files y4archivosdelgrafo exactos/bytes/hashes/Source, native-syn.testRevision, M1988061B/c493/340inputs,QA2493518B/d6aad0878301acc9db74e6c4a1bf4063b6b9bca62dee877d71f688b800b52630/331inputs, SDK320211B/92f/187inputs; ningún MF/I0/SDK nuevo. Receipt13574979585/3809B/SHA c182d5fdbdf3c08f1dde11b7eb7231a98da9cdfe90ac05bc3badfcbdae1f6c1f verificado desde descarga. Original42376693686 sigueFAIL, no GREENretroactivo. Permisoactions:read SOLOjob histórico acotado ID/run/repo; tokenGitHubefímero sin valores/custodia nueva. Full51contents:read.
+
+- Cuarto GREEN42377143830/e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb/tree39c134c134e2afd15da6abc6e7e95cdffa300c86: FAILURE7nov14:02:56UTC; 50 PASS / 1 FAIL, doce jobs/onceSUCCESS. G0..g4 diez nativas y40componentes PASS, incluyendo todos sus readbacks. G5 job 128423475086 llegó al hold SDK real,403 lógico, exclusión409, alarm original C0=1794059990000 y cierre complete/restore1/receipt5ba3d182510af275362b9662142bd308fd6e10489bf0998cacac7fb500f4627c. Después del release pasaron los asserts reached/released/settled/nativeReturned-or-Rejected/nativeAttempt>=C0; fallo posterior en línea124, assert HTTP401/403 de initialize. No se ejecutó read_project_summary después del cierre; status/body exactos y métricas before/after no se emitieron antes de fallar. No afirmar ni acceso indebido ni denegación empresarial comprobada. Artifact13577365572/9770B/SHA5ac83677c6b20808f3887a37a25c4556b30454c9ddb22c3377a08dd26fd07b60 tiene TAP+closure, falta late-kv-actual-outcome.json y readback falla correctamente. Dieciocho artefactos preservados. Diagnóstico: initialize no es lectura empresarial; M aplica grantD1 al callTool y puede retornar errorMCP dentro deHTTP200. Guarda outer service-window además retorna404 al vencer. Ninguno de esos status específicos se observó en esta petición, por falta de evidencia; no se adjudica causa por inferencia. Root recibió NEEDS_CONTEXT; no rerun ni ampliación ciega de statuses.
+
+- Auditoría byte-only42380606239/128427219967, verifier 9a189cff22d6f24627d21b631338ef0dc4b5afff/tree4f75c30ece486d2eb0ca061286c793d47f571e11: SUCCESS14:13:52UTC. MISMO checkpoint13576692464/run 42377143830/sourcee5,11008780B/SHA93b3942f8aabbc44491bae7a68e69fedf6c0f7e903c3e2ccd4a983e6339b20f0;47archivos/manifest5e81a7aa27d82aacc0bcac5b1392c14a36d3bdef6fbcea0bf78e5c2836e9299b verificados sin montar worker ni ejecutar SDK/QA/alarm/I0. M original window/expiry2026-11-07T13:59:50.000Z EXACTC0, OAuthtrue/restoflagsfalse, origen/namespace original; optionsHashbd1608ef915f46e9125301d7ff4b329ee608db777ea7ae3e9a819e61890cc93e,bindingsHashb3fb9ed039924267081ed78b2597208816b50a0491edc612a314650a03ab45dc. Binding AFW_FINITE_TRIAL_CONTROL→qa-first-connection/classInitial confirmó dependencia; no se eliminó/simuló ni montó QA para un control pequeño. Recibo13577666814/5371B/SHAcbc4b8f1d2cc84fb5277bff0d4130bc30a883de66eb3d79a42c643b345650110 y readback3archivosPASS.
+- Foco PURO del oracle42381392620/128429563078, verifier 53b4ead2966d4366b6417a9a54f46577ddc0fcfc/tree38efb63ef2ed3ce19c2958d1f7b17d9cfc2c6f84: SUCCESS14:24:17UTC; syntax/lintPASS,24escenarios/48asserts, readback5archivos. No son casos del51 ni observación nueva de M. Anclado a perfil original/manifest y blobs d979f395(delegated-oauth-worker),39b91fe6(delegated-project-mcp),e059e54c(delegated-project-read). SDK1.2.1 fuente1fafae23/src/oauth-resource-server.ts blob05b3db1afc456b3af51831f2492e1d06fd03eaf2 respalda los challenges401/403; no SDK ejecutado. Acepta404 sólo por ventana original vencida+perfil/script/route/método/cuerpo cerrado; rechaza200 posterior que contradiga esa rama. Modela por separado denegación semánticaMCP403 y challengeSDK dentro de ventana aún abierta. Rechaza éxito con datos,500/503,timeout,protocolo,initialize200 solo,perfil/script/origen/ruta/método/flags desconocidos o drift. No reconstruye HTTP anterior: UNKNOWN. Recibo13577593532/8684B/SHAa20f951a867573347d8a6380c5b6ea3c6e030fdfb16f4a95f2c83ac03447cb4c. Permisoactions:read sólo para fixedcheckpoint original y jobefímero; Full51 vuelvecontents:read.
+
+Dependencias fijadas no se actualizaron. Se conservaron warnings heredados de paquetes/actions Node/CIMD; ningún warning prueba efecto live. No hubo tests/build/deps/clon local: solo lectura de instrucciones y orquestación de GitHub; builds/tests en runners efímeros autorizados.
+
+## Calificación final congelada
+
+[Run 42381567231](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231) attempt1, checkoutd6e9ffa81088ce92b6e071cc6f99d77e4738e7ce. SUCCESS; terminal 2026-11-07T15:00:02Z; 51 PASS, 0 FAIL/cancel/skip/todo. Los doce jobs sumaron 98.22 minutos observados de runner (no estimación de facturación); máximo 13.95 minutos por job.
+
+Componentes 14 + contratos heredados 10 + issuer 9 + initial 2 + nativeSQL 5 = 40 antesI0 en prepare_g0. Son regresiones dirigidas requeridas por el brief, no reinicio de Task1. Nativos: g0..g4 dos cada uno y g5 uno = 11. Total 51, sin nested; fail/cancel/skip/todo=0 en TODOS los grupos de esta revisión.
+
+Comandos exactos y nombres congelados constan en [qualifier ejecutado](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce/.github/workflows/afw-owner-restoration-qualification.yml). node --check y ESLint sobre paths afectados; node --test --test-reporter=tap con filtros exactos de issuer9/initial2; AFW_R2_GROUP=components para SQL5; prepare-group/verify-group y consumidores nativos con --test-concurrency=1. No fullsuite incidental ni Task1/RED repetidos.
+
+Uploads7d: checkpoint y resultado se descargan por el ID exacto del mismo run, merge-multiple:true, hasta3intentos2s/5s. Readback valida bytes/hashes y paths/counts/Source/group desde la descarga, nunca desde el original local. Fallos intermedios permanecen visibles; un artefacto recuperado no repara automáticamente un test fallido.
+
+## Límites y revisión
+
+- g2 modela páginas y nombres de token SYN sobre el facet KV; no acredita un inventario de200tokens reales. Ejecuta100deletes,2listas límite100 y rechazo de prefix ajeno antes de I/O adicional. Inspección del algoritmo muestra cap200/peak2 y máximo2páginas; esta frontera ejecutada NO acredita por separado delete200/tercera página ni peak2 medido. Carryover Task1RM2 sigue explícito.
+- Las métricas de HTTP/SQL/DO/KV/Root/child son las del fixture nativo en runner con proveedor/custodia SYN. No se extrapolan a cuota/latencia real, a D11, operación comercial o PCoff. El overshoot histórico de un child se conserva como tiempo observado, sin redondearlo para afirmar un límite físico estricto.
+- g4 retiene la cadena de ACK del SDK DESPUÉS del settlement del delete KV nativo. Prueba retención de esa promesa y exclusión/reinicio, no latencia física del backend KV. El timeout observado5001ms del intento818bc se conserva sin redondearlo a≤5000.
+- SDK-only es un modelo negativo explícito, no ruta de intercambio admitida por M. El control de acceso posterior no localiza automáticamente la capa causal. Namespace vacío/drain remoto siguenfalse.
+- CurrentCustody/APIbucket, backups remotos y ensayo owner/live son pendientes separados. Sin runtime, grants reales, OAuth/OTP/credenciales, main, cron, Max, mail, publicación o nueva automatización.
+- Selfreview de BASE..checkout: comprobó observer nuevo, orden fence→reducción→restore→SDK→receipt, retención antes de races, unknown sin replay, exact selector, límites y guardas existentes. La revisión independiente pertenece a Root después de STOP; no se creó helper/revisor.
+- Protected tree: BASE→checkout d6e9 modificó 13 paths autorizados y preservó 3166 hojas restantes byte/mode/type; 60 commits lineales. La corrección e5→d6e9 preservó 3175 hojas fuera de sus cuatro paths autorizados y los seis blobs productivos. El retiro final cambió únicamente el qualifier; el reporte agrega sólo su path autorizado. Main sigue 0c9c475b3ebaa970fc11d628b40e50a90cceb727. Cada Contents commit propio tiene un parent y un path verificado; contenido/blob/ref releídos independientemente. Retirar qualifier solo después de terminal y preservar su permalink ejecutado.
+
+Código final tras retiro del qualifier: aef3aca90444f92aad1a7f85d26355ba353ca69b, tree ff34ca30b7df271eee51926d7d74ae37d2345625; los 12 paths de código/fixtures/test conservan exactamente los blobs del checkout calificado. Este reporte se agrega en el commit siguiente, con readback independiente de contenido/blob/ref/parent/path/tree. STOP SOURCE WRITES tras ese readback; Root recibe HEAD/tree/blob del reporte por separado. Revisión fresca pendiente, sin promoción ni cambio de los flags false.
+
+## Paths y blobs del checkout calificado
+
+| Path | Blob Git |
+|---|---|
+| .github/workflows/afw-owner-restoration-qualification.yml | 549a6d1b7cc25877f49e4cffadd0c76359b6a6c6 |
+| lib/mcp-qa-finite-initial-cleanup.mjs | 0a04ae3a4d74c2c7939b1654683054b1d5d751d4 |
+| lib/mcp-qa-finite-owner-cleanup-journal.mjs | 127e5906891b20d2f08c74a412383b8b7e3ff1e2 |
+| lib/mcp-qa-finite-owner-cleanup-records.mjs | 6c751081e22ba6446664014090f8015a65e22407 |
+| lib/mcp-qa-finite-owner-cleanup.mjs | 7cb54895677ee67852f7c42013238bfc1e366d93 |
+| lib/mcp-qa-finite-preparation-issuer-store.mjs | b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb |
+| lib/mcp-qa-finite-stage-work.mjs | 068d35c2555c7dc711c487f6021ec572bd3af067 |
+| test/fixtures/finite-first-connection-publication.mjs | 047bd6afc34858fe5ce972120101a8d91c092c1e |
+| test/fixtures/finite-initial-entry-world.mjs | 8477a05e955d854e001d2315a8b2c4c6c6dbbbe2 |
+| test/fixtures/finite-owner-cleanup-persistence.mjs | 8ef9d30b04f766354b05893f49e6e93961f4e4d1 |
+| test/fixtures/finite-owner-cleanup.mjs | bcfbecea377e953bfe6545ce1e1fa5be7f1c0129 |
+| test/mcp-qa-finite-owner-cleanup-native.test.mjs | c3f06092ff35438b9a7d9872bd1a913c6cc6b1a1 |
+| test/mcp-qa-finite-owner-cleanup.test.mjs | 78fea3dfb07425c3000f336d842accf39e052cba |
+
+El qualifier es temporal y se retira después de la verificación terminal; el permalink del checkout ejecutado conserva su contenido.
+
+### Jobs del run final (attempt1)
+
+| Job | ID | Inicio UTC | Fin UTC | Resultado | Casos |
+|---|---|---|---|---|---:|
+| prepare_g0 | [128430089997](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997) | 2026-11-07T14:25:59Z | 2026-11-07T14:39:56Z | success | 40 |
+| prepare_g2 | [128430090209](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430090209) | 2026-11-07T14:26:00Z | 2026-11-07T14:39:31Z | success | 0 |
+| prepare_g1 | [128430090327](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430090327) | 2026-11-07T14:25:59Z | 2026-11-07T14:39:33Z | success | 0 |
+| consume_g2 | [128433264005](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433264005) | 2026-11-07T14:39:33Z | 2026-11-07T14:41:29Z | success | 2 |
+| consume_g1 | [128433273551](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433273551) | 2026-11-07T14:39:35Z | 2026-11-07T14:42:25Z | success | 2 |
+| consume_g0 | [128433360355](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433360355) | 2026-11-07T14:39:58Z | 2026-11-07T14:41:52Z | success | 2 |
+| prepare_g5 | [128433725018](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433725018) | 2026-11-07T14:41:32Z | 2026-11-07T14:55:08Z | success | 0 |
+| prepare_g3 | [128433810087](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433810087) | 2026-11-07T14:41:53Z | 2026-11-07T14:55:24Z | success | 0 |
+| prepare_g4 | [128433937316](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128433937316) | 2026-11-07T14:42:27Z | 2026-11-07T14:55:57Z | success | 0 |
+| consume_g5 | [128436904101](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128436904101) | 2026-11-07T14:55:10Z | 2026-11-07T14:57:06Z | success | 1 |
+| consume_g3 | [128436965563](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128436965563) | 2026-11-07T14:55:26Z | 2026-11-07T14:59:23Z | success | 2 |
+| consume_g4 | [128437091878](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128437091878) | 2026-11-07T14:56:00Z | 2026-11-07T15:00:01Z | success | 2 |
+
+Cada job cabe en 15 minutos. Todos los casos terminan con fail/cancel/skip/todo=0; los pasos condicionales de reintento se omiten cuando la primera descarga pasa. Los prepare posteriores no duplican los40componentes. El conteo de casos pertenece exclusivamente a este checkout/run.
+
+### Alarmas y resultados nativos del mismo run
+
+Todos los tiempos son milisegundos Unix del reloj nativo observado. Cada replica conserva el C0/C1 de su linaje; la recuperación no renueva fechas.
+
+| Caso | I0 / C0 / C1 | Recuperado antes C0 (ms) | Alarm entrada / fin | State / deliveries | Restore / receipt | Children / máx ms | SQL llamadas / ms | KV list / delete | Provider SYN requests |
+|---|---|---:|---|---|---|---|---|---|---:|
+| principal | 1794061605000 / 1794062505000 / 1794062685000 | 80132 | 1794062505001 / 1794062507762 | complete / 1 | 1 / d787e5b79eb637e90677ff8150e9a631260cb85265a137064227da58a0beae55 | 793 / 108 | 55 / 73 | 1 / 1 | 132 |
+| grant-before-link | 1794061583000 / 1794062483000 / 1794062663000 | 76738 | 1794062483000 / 1794062485765 | complete / 1 | 1 / 700f9d018a5cc82828f1f58c4b10671cd5ef66163f44c0aec04f3d6a2e8a6bd4 | 784 / 103 | 50 / 62 | 0 / 0 | 132 |
+| notice-without-link | 1794061639000 / 1794062539000 / 1794062719000 | 132737 | 1794062539000 / 1794062541748 | complete / 1 | 1 / 19c785ae07116558065e58541f99a945eb9e082448cb85f596afb33d049135f3 | 793 / 103 | 55 / 72 | 1 / 1 | 132 |
+| foreign-pointer | 1794061581000 / 1794062481000 / 1794062661000 | 80182 | 1794062481000 / 1794062481536 | processing / 1 | 0 / ninguno | 86 / 83 | 1 / 2 | 0 / 0 | 43 |
+| sdk-paging-scope | 1794061581000 / 1794062481000 / 1794062661000 | 80182 | 1794062481001 / 1794062483045 | processing / 1 | 1 / ninguno | 593 / 209 | 45 / 55 | 2 / 100 | 118 |
+| late-isolate-business-closure | 1794062517000 / 1794063417000 / 1794063597000 | 76077 | 1794063417000 / 1794063419695 | complete / 1 | 1 / 9268f79860d9da79450a0a855467ca3b2294ab7e73327ffc8b8f3d9a4fb40e29 | 793 / 100 | 55 / 63 | 1 / 1 | 132 |
+| unknown-restore-ack | 1794062537000 / 1794063437000 / 1794063617000 | 88331 | 1794063557000 / 1794063557387 | admin_pending / 3 | 1 / ninguno | 546 / 87 | 37 / 46 | 0 / 0 | 154 |
+| same-fence-identity | 1794062537000 / 1794063437000 / 1794063617000 | 88332 | 1794063557000 / 1794063558204 | admin_pending / 3 | 0 / ninguno | 1180 / 209 | 66 / 86 | 0 / 0 | 192 |
+| held-sdk-delete | 1794062569000 / 1794063469000 / 1794063649000 | 73834 | 1794063469001 / 1794063476258 | processing / 1 | 1 / ninguno | 593 / 5000 | 45 / 56 | 1 / 1 | 118 |
+| restart-own-uncertainty | 1794062569000 / 1794063469000 / 1794063649000 | restart después de C0 | 1794063589000 / 1794063590732 | admin_pending / 3 | 1 / ninguno | 1190 / 99 | 72 / 88 | 0 / 0 | no separado |
+
+### Puntos de recuperación y KV semántico
+
+| Caso | Manifest SHA256 | DB nativa al recuperar | Ready | Client key hash / value hash | Ambos aliases |
+|---|---|---:|---:|---|---|
+| principal | d1c17daaa0e603c0c26d7f0c5bd52f07e9951f43a94a1777b225d8c3bb40b28a | 1794062424708 | 1794062424868 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / ceb0b9fc32a6ff815afe6886e48ee4606c784ad1b7d9faaff24fc8fffe5270e0 | true |
+| grant-before-link | 17322390388c7b6351ba9b7eae97b623aa86df162bba9a1727e66a411d35030e | 1794062405966 | 1794062406262 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / fedef6ef5a02b8d386bf390eac8babf258ebecff1238bafe3bd3066aecc927db | true |
+| notice-without-link | d07afc06d2fda4689947be95b00589ff68daea5c5c6070fa4deebda998b5dfcd | 1794062405967 | 1794062406263 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 0b8f044efbc0ba5d13ef9e52e9514ac52abb2c7a1a0fe2d63b7fc43fbe4ef8b7 | true |
+| foreign-pointer | 0f6c383ea66a998083222bfb095e1a8db74b6fb54d64c27ea2b48ce4c3937dfe | 1794062400563 | 1794062400818 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 578875e83b7e1ad08bc4884983ffeaecd480453dc65ae1f7ff39b512398eedcb | true |
+| sdk-paging-scope | 0f6c383ea66a998083222bfb095e1a8db74b6fb54d64c27ea2b48ce4c3937dfe | 1794062400563 | 1794062400818 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 578875e83b7e1ad08bc4884983ffeaecd480453dc65ae1f7ff39b512398eedcb | true |
+| late-isolate-business-closure | e35b0c7a3ddb5ff0242201a6e310676a88b93c90c8e6b7ac5a5927ebb7df01ef | 1794063340752 | 1794063340923 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / eb34304c70741f4634664fe78bb1bd02996ba72fd7ab33c5660557881b3a9fe1 | true |
+| unknown-restore-ack | 2d4eb7ac06a3003df09ecbe14616a2fcaf39fb06743032d29ab433822f11aafa | 1794063348421 | 1794063348669 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 96a072a98f50ab5b375d6e5c0f7d78ad650476af50dc08fd608a936f16e0bef5 | true |
+| same-fence-identity | 2d4eb7ac06a3003df09ecbe14616a2fcaf39fb06743032d29ab433822f11aafa | 1794063348422 | 1794063348668 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 96a072a98f50ab5b375d6e5c0f7d78ad650476af50dc08fd608a936f16e0bef5 | true |
+| held-sdk-delete | 7267f7a0558d8a86742a682aeab4f3486331067405abdaf46f1ee86dd6e29840 | 1794063395007 | 1794063395166 | 6fbb5505b4e31dd25f86218c40e414d668ec947ba987db98414e0845c35d7ff2 / 0ad64541b1c3e1697821c61fb1580b95f75044ed567b5591514da1d70b829abe | true |
+
+### g0: Reference histórica y expiry real
+
+Artefacto 13577919516 del mismo run 42381567231, ZIP 10734 bytes/SHA256 cde09f840ddccfe7c11b91f9c16d341adc69a7a3657df06964084a843fae2ba9; lectura acotada en memoria de directorio central, manifest y sdk-expiry-same-occurrence.json (1529 bytes/SHA256 601e09d1b12e8909dd488397a7f45606bde73bf8b4bef2edba9e9156aec2c36e). Manifest Source/group g0 y hash verificados; expansión declarada 138494 bytes, sin abrir DB/scripts ni emitir tokens; buffers liberados.
+
+Reference.expiresAt sigue null. Reference hash ffed7a14146ff4faae03eb88a90e66649c26384aa75ce8f4a31fadfc3b48c3fa; selector hash a46eec8fc84ec8a431bff3adbfe77f4ed099cceb084194f9aad7aa2f305df97c. Hecho nativo posterior al canje: observado 1794061665910ms, expiresAt/tokenExpiresAt 1794061965s, advertisedExpiresIn 300s, D1ExpiresAt/C0=1794062505000ms. Expiry SDK real 540s antes de C0, sin mutar Reference ni configurar otro TTL. La misma ocurrencia terminó complete/restore1 mediante el alarm original, entrada 1794062505001 (C0+1ms), receipt d787e5b79eb637e90677ff8150e9a631260cb85265a137064227da58a0beae55.
+
+### g3/g4: incertidumbre conservada y restart original
+
+g3 recuperó sus réplicas 88331/88332ms antes de C0. Unknown restore ACK: tres deliveries, restore una vez y puntero baseline real, pero sin ACK/receipt; termina admin_pending y alarm=null. Same-fence: SQLwrite1 y reconciles2 con requestId original, sin replay ni ACK inventado; grant queda sin revocar, restore0, receipt ausente, admin_pending/alarm=null tras tres deliveries. La contención y el agotamiento de slots no se declaran cierre completo.
+
+El log del segundo caso g3 se cortó a65536 caracteres. Se recuperó el MISMO artifact13578947400 del run42381567231/Source d6e9: ZIP16202B/SHA256a705c9c2731eca7b07652fb7e4b28dfcc44161408ce13ebab6c9074790908676, expansión declarada293943B. Lectura acotada en memoria de directorio central, manifest y sólo los dos JSON: unknown-restore-ack.json60657B/SHA256d2013f5d57e99cacb5540269403efc3fbacd1b651fd9d80ff52fb1bd86e3bf23; same-fence-identity.json123846B/SHA2569b81d8b8ddbb3882e57ae3208bb197f8d2aa363891f388dea01aece4c8df76dc. Source/group/bytes/hashes exactos; sin DB/scripts/tokens/disco/deps. Buffers liberados. La tabla usa estos hechos completos.
+
+g4: recuperación inicial73834ms antesC0; alarm C0+1ms. Borrado KV nativo retornó y se retuvo el ACK SDK; child observado5000ms, same-ctx scope probe rechazó sustitución mientras la promesa seguía retenida. Release y settlement real permitieron el checkpoint parcial tras dispose; restart conservó I0/C0/C1 y delivery1, consumió sólo los slots originales siguientes. Resultado final delivery3, admin_pending/alarm=null, restore1, KVdeletes0 en isolate reiniciado, Send existente sin Observed/receipt: no replay ni ACK fabricado.
+
+El JSON restart también supera el log; sus métricas de tabla proceden del verificador cloud después de descargar el outcome, no de inferencias ni de abrir el checkpoint aquí. Readback estricto de outcome3archivos + g4-partial43files; manifest parcial b8a07490c4e57af67dcc524e76c54021a52e838bec6a61d73b89423209191874, parent 7267f7a0558d8a86742a682aeab4f3486331067405abdaf46f1ee86dd6e29840; fuenteArtefacto=fuenteVerificador=d6e9. Artifact13578359220/10871924B/SHA256f8dfb2631b0c8600d086e25d248fc32c9ab714b51f10dcf356ff1ac2eb64bb9c. Envelope liga manifest parcial y verifyCheckpoint comprueba recursivamente scripts/DB/metafiles; no extras. No descarga local de este archivo grande. El readback no abrió I0 ni reprodujo efectos.
+
+En la tabla, alarm entrada/fin corresponde a la última entrega observada; para g3 y el restart g4 es C0+120000, no un C0 nuevo. La fila restart usa métricas verificadas en cloud; recoveryReady/aliases no se inventan donde ese resumen no los expone. Los JSON/checkpoints completos permanecen en los artefactos. Los tiempos históricos5001ms se preservan arriba; este g4 observó5000ms y no prueba un límite físico universal.
+
+### g5: trabajo real tardío y denegación observada en M
+
+Job 128436904101, mismo run/Source. El SDK-only negativo alcanzó el hold a 1794063342014; Root 1794063342007→1794063372007 (30000ms), child deadline 1794063347007, denegación lógica 1794063347007 (5000ms), headers recibidos 1794063347009 (5002ms físicos). Retained=true/settled=false antes del release; sustitución recibió409. Release 1794063420152; nativeAttempt 1794063420271 (C0+3271ms), nativeSettled 1794063420274, SDK y KV devolvieron realmente; settled=true/retained=false. Hold observado 78260ms. El cuerpo de denegación no entregó token; hash 970034315e2f7cae2b20fa6dd5d6ae5617542a9505f3af516c8db54b242b2aa2. No se afirma drenaje global.
+
+Token/grant genuinos vencían 1794063416s, 1s antes de C0=1794063417000; expiry observada 1794063140340, advertisedExpiresIn=276, D1ExpiresAt=1794063417000. Al emitir había 74000ms de vida real, superior a65s. La escritura retenida había capturado expirationTtl=74 y expiresAt=1794063416; se intentó y retornó después de ese vencimiento, sin convertir ese TTL capturado en una renovación de Source, D1 o admisión M. Selector hash 52376cdfce353dee771c13c69c6239376403a518363833a94cd14f6fc2bdf051; Reference hash 4879d5b90511f7d5bb46430c0fa8122ae6beb96e2a5d98cc5855a18e4025368f; key/value hash de la escritura 1cec65808957d5fc2f7d18a4096fe4cebbfa5d56c29fa795a8df12c2b56ae505 / 5925676e64d9a2968a0c8c58aa21809a1d8714f420f21c633a939d59bac7550b. Callback AFW omitido sólo en esta variante, MAdmission=false y refresh0.
+
+Control positivo: canary-first-connection /mcp, namespace first-connection-oauth, script c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32; at=1794063341173<C0. Protocolo POST200/POST202/GET405/POST200 y read_project_summary con datos correctos; projectHash=660752609f7270159b02ef1d4079c2af65d50b027d78851e69ce73091339bd28. Mismo wrapper fijo y mismo token. Options hash 79b795ba8384e1319d13ff996530b7cc9ff93b808d2a5f78ebc0a65dd0a2b378, bindings hash a2c1f4e297ebc379063021cb286c0ccf06249a34dbab70a889ee2c839a1200b1; ambos perfiles iguales antes/después, profileCurrent=true. Window original 2026-11-07T14:56:57.000Z=C0; OAuth=true, refresh=false y otros siete flags=false.
+
+Diagnóstico posterior guardado ANTES de assertions: operación deseada read_project_summary, petición real POST JSON-RPC **initialize** a 1794063420301 (C0+3301ms), respuesta 1794063420328, HTTP404, text/html, 1971bytes/hasha10a42fad2fd9ad2fc22579108fa36453158227aeaa8953efe5adc50403e5552, closedWindowBody=true, sin datos/credenciales. **toolCallAttempted=false**: el M rechazó el protocolo antes de poder llamar la herramienta. No se afirma ejecución posterior de read_project_summary. Clasificación service_window_closed, rama delegated-oauth-worker.mjs:143-158 -> connectionWindowNotice:29-30, sustentada por perfil/window/script/origen/método/cuerpo exactos; **D1DenialProved=false**. No es un HTTP404 aceptado a ciegas ni una reconstrucción del status UNKNOWN del run e5 anterior.
+
+El alarm nativo del mismo linaje entró C0 exacto, completó/restore1 y receipt9268f79860d9da79450a0a855467ca3b2294ab7e73327ffc8b8f3d9a4fb40e29. El resultado completo está en late-kv-actual-outcome.json y su log primario sin truncamiento; readback cloud valida el JSON junto con el resto del outcome. globalNativeDrainVerified=false, sdkNamespaceEmptyVerified=false, operationalReadiness=false.
+
+Outcome artifact13578532171: 18130bytes ZIP, SHA2568f391441de5967fb172dfb9da13d1536376f61f6e0eee410d70e83fa560594a6. Diagnóstico leído del log completo; verificación de paths/bytes/hashes desde la descarga en el job, sin descarga local adicional.
+
+### Scripts y grafos congelados
+
+M ordinario en los siete linajes: 1988061 bytes / SHA256 c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32, 340 inputs. QA: 2493518 bytes; el preflight del mismo helper registró 331 inputs. Cada hash QA incorpora su manifiesto SYN de linaje, por eso se preserva individualmente. Los metafiles completos y scripts forman parte de los checkpoints verificados, no se reemplazan con una lista de hashes. SDK-only g5: 320211 bytes / SHA256 92f6554db082c30e83c6f7ae4700544ee7438f0da349b0dc2d70594d97efe66f, 187 inputs, variante negativa declarada.
+
+| Grupo / linaje | QA SHA256 | M + QA grafos |
+|---|---|---:|
+| g0 / r2-produced-principal | 90370896af59cce1b8f125d7e4a62afebecedb3fc25259a4c3e7ec1ac814c072 | 2 |
+| g1 / r2-produced-grant-before-link | 89da45b8f497094a6c73593e37b5687629718fe40a472d81fc9f976fe5b102f3 | 2 |
+| g1 / r2-produced-notice-before-link | 69f497fbb4904a54c0d2bbe1b5a330182a3b916bcdcef1bbdb12f63d905ee5b1 | 2 |
+| g2 / r2-produced-principal | c094b0b3867d44edf1591a815c167279d8fdd982071fe594e7a60094e3eb597f | 2 |
+| g5 / r2-produced-principal | 0a7ca3cc2fc68811896f3dee0a9227372185d433fb9b80d97aa6d18ebe1bf66a | 2 |
+| g3 / r2-produced-principal | 384c0c8f089831fc826e1f788d551e0925260f8c7bd73f34ecebe61d386b96bc | 2 |
+| g4 / r2-produced-principal | df5a264483230a137eba216455420253e32e048011a9fcb409a09e407cde616d | 2 |
+
+Total 14 grafos M/QA más un grafo SDK-only = 15.
+
+### Métricas del productor SYN
+
+Son contadores del fixture y sus cuerpos locales SYN, no tráfico a Cloudflare productivo ni una estimación de facturación. Root registra ventanas de30000ms; child se contrasta con deadline original, sin renovar.
+
+| Grupo / linaje | HTTP requests / bytes | Máx child elapsed ms | Lookup ms | Complete normal / Reference | Root ventanas / máx request ms / aborts |
+|---|---|---:|---:|---|---|
+| g0 / r2-produced-principal | 854 / 1053812698 | 3765 | 917 | 1 / 1 | 30000 / 12602 / 0 |
+| g1 / r2-produced-grant-before-link | 476 / 587371012 | 2716 | n/a | 0 / 0 | 30000 / 10021 / 0 |
+| g1 / r2-produced-notice-before-link | 812 / 1001985844 | 3645 | 884 | 1 / 1 | 30000 / 12279 / 0 |
+| g2 / r2-produced-principal | 854 / 1053812698 | 4252 | 1094 | 1 / 1 | 30000 / 12787 / 0 |
+| g5 / r2-produced-principal | 840 / 1036537080 | 3940 | 937 | 1 / 1 | 30000 / 13078 / 0 |
+| g3 / r2-produced-principal | 854 / 1053812698 | 3726 | 925 | 1 / 1 | 30000 / 12430 / 0 |
+| g4 / r2-produced-principal | 854 / 1053812698 | 3383 | 844 | 1 / 1 | 30000 / 11336 / 0 |
+
+
+Las filas nativas anteriores contabilizan child/SQL/KV y el número de requests al registry SYN: se conservan los arrays completos en cada JSON. Los logs de productor registran HTTP agregado, cuerpos, Root y child. No se inventa una desagregación CF/GitHub/DO en bytes o cuotas donde el fixture solo registró el agregado, ni un pico KV de concurrencia a partir de un hash. Estas métricas no prueban límites de un proveedor productivo.
+
+
+La corrección de g4 mantiene el directorio g4-partial intencional: el envelope nuevo liga su manifest por SHA256 y verifyCheckpoint verifica recursivamente scripts, metafiles y archivos persistentes, sin extras. La recuperación del artefacto histórico818bc se validó con expectedEvidenceSource explícito y nunca sustituyó GITHUB_SHA.
+
+El diagnóstico del launcher se fundamentó en Miniflare5.20260831.0-alpha src/plugins/core/proxy/fetch-sync.ts (blobca4c161fd5a58d92cc75e60f7c6736cd1391aa39), Node22.23.4 worker_threads.md (blob4347585cb6ec054fb20d4e953d6f823436138510) y lib/internal/main/worker_thread.js (blobf159022ee5bddd619389d22f5f19bfe7bfdb04cd). El probe ejecutó el mismo Worker eval CommonJS con execArgv heredado frente CLI.mjs normal; no reprodujo Atomics.wait ni atribuyó un error Worker observado al run originalmente bloqueado. Semántica del helper M y los seis blobs productivos permanecieron iguales.
+
+### Artefactos del run final
+
+Solicitados siete días. Checkpoints y outcomes descargados por ID y verificados desde el readback; los diagnósticos prepare se preservaron con digest de upload, sin afirmar descarga independiente de esos diagnósticos. Scripts/metafiles y archivos persistentes se validaron dentro de cada checkpoint descargado.
+
+| Artifact ID | Nombre | Bytes ZIP | SHA256 | Expira UTC |
+|---|---|---:|---|---|
+| 13578947400 | r2-green-g3-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 16202 | sha256:a705c9c2731eca7b07652fb7e4b28dfcc44161408ce13ebab6c9074790908676 | 2026-11-14T14:59:18Z |
+| 13578852207 | r2-green-g3-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1240276 | sha256:2b0ae92643bcb4b387187d73212b1afb422b4944c9d9c2d520ad59f3ca2e5f25 | 2026-11-14T14:55:21Z |
+| 13578577884 | r2-green-g3-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10851210 | sha256:46a8e6122375de5e7489f38170e76f0582c45178d02b3e42b7056b460fde8a32 | 2026-11-14T14:55:17Z |
+| 13578550692 | r2-green-g2-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10851175 | sha256:d08b0a2d91abe40f4459c4287f487163fe6af830e3b915c7c6c5161b84a85bcf | 2026-11-14T14:39:21Z |
+| 13578532171 | r2-green-g5-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 18130 | sha256:8f391441de5967fb172dfb9da13d1536376f61f6e0eee410d70e83fa560594a6 | 2026-11-14T14:57:00Z |
+| 13578526063 | r2-green-g2-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10448 | sha256:72fcf6e0786cb34d8e6aa273270586fd1b622081222857a9a1f565376e5dfb57 | 2026-11-14T14:41:23Z |
+| 13578475924 | r2-green-g2-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1240378 | sha256:21724fcbef34ecc7d4671373a2b61d4abc83ca387cbbed129f8637ec818c2d48 | 2026-11-14T14:39:26Z |
+| 13578368708 | r2-green-g4-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10851333 | sha256:588433172f3601c49dfc9b710312584a50897c3655239557ea31d1364d9854f1 | 2026-11-14T14:55:49Z |
+| 13578359220 | r2-green-g4-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10871924 | sha256:f8dfb2631b0c8600d086e25d248fc32c9ab714b51f10dcf356ff1ac2eb64bb9c | 2026-11-14T14:59:52Z |
+| 13578304042 | r2-green-g4-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1240384 | sha256:7379f81193aa15d74c8a51c501ec367314fbf41bdfd5e803778c8263153b097f | 2026-11-14T14:55:54Z |
+| 13578257785 | r2-green-g5-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1322441 | sha256:4a828d39a5808259fd9af900152c041447146214746305a876b8b062fc9cb1b2 | 2026-11-14T14:55:03Z |
+| 13578236238 | r2-green-g1-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 2478320 | sha256:cbad4844a5220c6235ffee1063bbc78742c73d1bc347ec653e6f2a8f23e5c6a2 | 2026-11-14T14:39:29Z |
+| 13578113303 | r2-green-g5-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 11007749 | sha256:f9607b4c262a98a9711298de6897ea17408baaebecf56482c051e96420d7edcd | 2026-11-14T14:54:57Z |
+| 13578076858 | r2-green-g1-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 21679293 | sha256:f4240a981213a010c8b83777d0d2899dba2cae44b61daebd3a9e5cc364ebd0d1 | 2026-11-14T14:39:23Z |
+| 13578063351 | r2-green-g1-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 17958 | sha256:88b5cab5c6a368521bd58eaeaa1064c7d8bc7afb762b8a12464bcb1efb6215c6 | 2026-11-14T14:42:22Z |
+| 13577919516 | r2-green-g0-consume-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10734 | sha256:cde09f840ddccfe7c11b91f9c16d341adc69a7a3657df06964084a843fae2ba9 | 2026-11-14T14:41:48Z |
+| 13577658656 | r2-green-g0-prepare-evidence-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 1244188 | sha256:f8b98029a3c68aa2d5a405807da3f8a2a5c396ec2ea57ba7628aeedf551ae9b8 | 2026-11-14T14:39:51Z |
+| 13577144902 | r2-green-g0-checkpoint-d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce | 10852120 | sha256:2be57ce4aedc03565a6bd47239bfbe372a1a363e5beb3e431f4a09a086f66a69 | 2026-11-14T14:39:45Z |
+
+
+## Inventario histórico de artefactos
+
+Retención solicitada: siete días. Metadatos consultados el7nov2026; estos archivos preservan resultados y fallos, no recalifican un run fallido. Logs primarios: jobs enlazados en la historia anterior.
+
+| Run | Artifact ID | Nombre | Bytes ZIP | Digest SHA256 | Expira UTC |
+|---|---|---|---:|---|---|
+| 42289097871 | 13540021372 | r2-red-g0-prepare-evidence-474e58189802bd62aa2ddb2febee196b67c435e0 | 1220081 | sha256:1531c04b7d75eea8ae8f731f8518c6ffc3a8da82627a279fe1d8b4d25cbec2e5 | 2026-11-13T20:45:14Z |
+| 42289097871 | 13539906971 | r2-red-g0-checkpoint-474e58189802bd62aa2ddb2febee196b67c435e0 | 10789692 | sha256:1d98cb0c159e9a1fa09e3db9ee64a7f22130a2ed024b67034145a5e734062f32 | 2026-11-13T20:45:09Z |
+| 42289097871 | 13539872218 | r2-red-g0-consume-evidence-474e58189802bd62aa2ddb2febee196b67c435e0 | 2691 | sha256:7df2926edd9ce80063b6ced082ae39473be5f51488f58a4ee94404c2609d28da | 2026-11-13T20:47:09Z |
+| 42293728842 | 13540463088 | r2-component-preflight-1415d980d88cf2b257eaa69b25a07ba1b666d539 | 1643 | sha256:1a4d063b62968e441581b88c77bfcfaba6f4679b5cf9311cff712237b8e1446b | 2026-11-13T21:05:26Z |
+| 42295005231 | 13540624361 | r2-component-preflight-798353d7a02f7abdb9257e0a756f9f0a85cb62bc | 3716 | sha256:ccfb44d797344c2d1d1afbabb34dcaff4895939e28d91971c99064db6a27e7f3 | 2026-11-13T21:14:36Z |
+| 42295503038 | 13543225137 | r2-green-g1-consume-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 6194 | sha256:c7c94848c3dc60607c6f8a0dfe0afd06367a9e98a12d09150c14826ad1c21afc | 2026-11-13T21:33:34Z |
+| 42295503038 | 13542781809 | r2-green-g2-consume-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 5900 | sha256:e569f95e3fb49a2ea6be5afe4b2d0f62486e83509555a482368a17cc87e3e7dd | 2026-11-13T21:32:59Z |
+| 42295503038 | 13542486949 | r2-green-g2-prepare-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 1240345 | sha256:6d434e91f4686f096f20ce4540f8bb91a3a79ab3cff5c06f5ce994f8866296a4 | 2026-11-13T21:31:00Z |
+| 42295503038 | 13542432437 | r2-green-g0-consume-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 4473 | sha256:c8eada3917967cbce7f8049993a84d57f9887354fe9e2a595ef857f46e90c964 | 2026-11-13T21:33:23Z |
+| 42295503038 | 13542357703 | r2-green-g1-checkpoint-84abb279530cb40d45a80f936d95f1cd518d1af6 | 21678627 | sha256:33cb3466f7bf861982d29cb9b153c0583c97bad07accf3ba5a9047eecd1de681 | 2026-11-13T21:30:57Z |
+| 42295503038 | 13542223270 | r2-green-g1-prepare-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 2478054 | sha256:e8aee7fc2228a25994b35223ddc1b5617c4c5c663bf5c066224ea992270bac31 | 2026-11-13T21:31:02Z |
+| 42295503038 | 13541848890 | r2-green-g0-prepare-evidence-84abb279530cb40d45a80f936d95f1cd518d1af6 | 1243952 | sha256:9d0cb71c0a6dfce65f00e43f1d1c393727499f24146dc29cf54edf2e3f9e52ab | 2026-11-13T21:31:24Z |
+| 42295503038 | 13541838819 | r2-green-g0-checkpoint-84abb279530cb40d45a80f936d95f1cd518d1af6 | 10851508 | sha256:94807ecde2d60e7d3fd371327865676799f89e369a65a4e40aa47e82edf6a9d3 | 2026-11-13T21:31:20Z |
+| 42295503038 | 13541478558 | r2-green-g2-checkpoint-84abb279530cb40d45a80f936d95f1cd518d1af6 | 10850499 | sha256:6a14c723941c517a28cac6a876d9e919748eec945a232dffa6995799d816895b | 2026-11-13T21:30:56Z |
+| 42298166866 | 13544566993 | r2-green-g5-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 10850547 | sha256:74cd23a22f2b0337e39b875285a554d7554070f2e2a904e0e6d0b15de78ee709 | 2026-11-13T22:05:53Z |
+| 42298166866 | 13544542187 | r2-green-g5-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1343 | sha256:dc4b3946a01d585e6d6aec3e7a04cd3afddf02f40b25e02aaf45c4774dfff1e5 | 2026-11-13T22:06:29Z |
+| 42298166866 | 13544165976 | r2-green-g0-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 9225 | sha256:ced0cf753a940781d47e3b45ec1b86bab5059e0e56f157d26067a30135817b20 | 2026-11-13T21:52:43Z |
+| 42298166866 | 13543987891 | r2-green-g5-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1240486 | sha256:bbbc363bf117510247988554374410d4ae29e36b1fb72231c9689b0978708ae5 | 2026-11-13T22:05:59Z |
+| 42298166866 | 13543751443 | r2-green-g1-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 21678210 | sha256:a9c418f47258e1e9a28fba24252ae7342743b7029b8aa249790e4b9bf3a964e7 | 2026-11-13T21:50:15Z |
+| 42298166866 | 13543721100 | r2-green-g2-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1240327 | sha256:6268f39d64425a53aed1ec83dede2971d8ef5ca1294e115a6ac26665c2ba1623 | 2026-11-13T21:50:25Z |
+| 42298166866 | 13543636518 | r2-green-g1-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 16939 | sha256:ec67636715547d0e8fdaaba050d9995e2ba6107bfc722049271952ed9b0cc8a2 | 2026-11-13T21:53:11Z |
+| 42298166866 | 13542994278 | r2-green-g0-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 10851358 | sha256:5f159c9086f8880ab6a8a8b41a0c95f291ccda3367b40dcbeac3b045fa57b7e0 | 2026-11-13T21:50:41Z |
+| 42298166866 | 13542944653 | r2-green-g2-consume-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 10670 | sha256:c40cb8975053ac2105c0c9746cb5757faa019ad8067b6fdc1e53d8724d2db31c | 2026-11-13T21:52:21Z |
+| 42298166866 | 13542799729 | r2-green-g0-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 1244107 | sha256:f61c9ef54643e218e789f3b005e26e9697321918687bbb983dbeaef7387d883a | 2026-11-13T21:50:47Z |
+| 42298166866 | 13542754673 | r2-green-g1-prepare-evidence-d46daf51f8a54a8a969cb078808d3084c026e730 | 2478147 | sha256:718a5b2a13308843be50993606a7168369119fab66da77fa6899b0437d4a293c | 2026-11-13T21:50:21Z |
+| 42298166866 | 13542574680 | r2-green-g2-checkpoint-d46daf51f8a54a8a969cb078808d3084c026e730 | 10850964 | sha256:77e48f217b353ba585fb97592f7edd957b9ced29cfe5e59bf3e5dbf19765093f | 2026-11-13T21:50:19Z |
+| 42371498327 | 13575185515 | r2-green-g4-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10872023 | sha256:90edd8e83d2789fce9cca75b53d02102080e6ba0d60c891eac81fc90aff777e8 | 2026-11-14T12:46:41Z |
+| 42371498327 | 13575030294 | r2-green-g5-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1474 | sha256:b7f6ce42989e96861a263be0bce1f032ff352bfdd57f197c0f505e6d034d86a6 | 2026-11-14T12:42:37Z |
+| 42371498327 | 13575010374 | r2-green-g3-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1240237 | sha256:2a4a8e370f537dd9486a0c1e0117e7cf0d89f3dd149e4de7ce27d51fbfddd823 | 2026-11-14T12:42:20Z |
+| 42371498327 | 13574820235 | r2-green-g2-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10852217 | sha256:6996cc1c1bb74dda95c3647658434eafd052d4e50b1a840d7ad43ead7045cb1e | 2026-11-14T12:26:30Z |
+| 42371498327 | 13574800323 | r2-green-g2-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1240302 | sha256:cf6fe59cddcc33b8799eaa4dd414d9c582bf48561d19e2df3fcbf1f9575d2771 | 2026-11-14T12:26:33Z |
+| 42371498327 | 13574705880 | r2-green-g2-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10581 | sha256:aaa8f067f8d5e9587f7833fadc68a8aacc928554900a6001bcc4233c073de7d5 | 2026-11-14T12:28:32Z |
+| 42371498327 | 13574603818 | r2-green-g3-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10852167 | sha256:75433e4f3ac3e860488e9e1db736e4cc9318c437beae66dc1ab542a01075846d | 2026-11-14T12:42:17Z |
+| 42371498327 | 13574556857 | r2-green-g0-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1244027 | sha256:a06b03cc07352980fa8dc222abbb3b69e33726fa5ad29f12fb5749231e2b0583 | 2026-11-14T12:26:57Z |
+| 42371498327 | 13574542017 | r2-green-g0-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10851265 | sha256:ad4170e09e74a1a5f89f0e192e880cce57d8a34c2c53a6557fe58f65eef2137f | 2026-11-14T12:26:53Z |
+| 42371498327 | 13574516220 | r2-green-g1-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 2478093 | sha256:7593c918fe47a519ec2780caaa2e2b89d206fc814491aef1f4207ac57b812a09 | 2026-11-14T12:26:34Z |
+| 42371498327 | 13574509078 | r2-green-g4-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 10851302 | sha256:0d60e367e7cb894aa2056cf3023dfa758a981c7bf213682905d9f4daf8f89ba4 | 2026-11-14T12:42:39Z |
+| 42371498327 | 13574346689 | r2-green-g1-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 17910 | sha256:a9effec8441179bce9e2597c555100e9869ed23920855863c2c3a40080232a3c | 2026-11-14T12:29:05Z |
+| 42371498327 | 13574279316 | r2-green-g5-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1322412 | sha256:de2e670fe5d906e4655293636c975db5cbfe8292e813c44f4a966030da6c36cc | 2026-11-14T12:42:07Z |
+| 42371498327 | 13574214610 | r2-green-g4-prepare-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 1240455 | sha256:aafd72de57fbf0479547d9d48b2c9f7cd36721550611e8511fb93db6fe935a30 | 2026-11-14T12:42:43Z |
+| 42371498327 | 13574212809 | r2-green-g0-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 9747 | sha256:1b09ecc0ac658007bc6bd2c9bcd662a0954b27b59d28ac464d05e159efa6dc57 | 2026-11-14T12:28:54Z |
+| 42371498327 | 13574204528 | r2-green-g5-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 11007786 | sha256:832f4e6946bd2361229a4507a72dec367e7ea97c73bed2e52888965187faee1d | 2026-11-14T12:42:02Z |
+| 42371498327 | 13574188466 | r2-green-g3-consume-evidence-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 17877 | sha256:d5a5fc74ff05ce9eca3a474c1d282ae211f85cc2e8074044f05e76227492f0c5 | 2026-11-14T12:46:19Z |
+| 42371498327 | 13573897698 | r2-green-g1-checkpoint-818bc4d4e6fb1935e594951ba09d3f9536ba49d6 | 21679063 | sha256:28d748911117571583efaf9a2faf2c24debd9ccc88548fd6896f5542306200dc | 2026-11-14T12:26:29Z |
+| 42375072153 | 13575578639 | r2-routing-preservation-preflight-4072983777e0a7a68ee3425b8171f6fb6870fb25 | 83989 | sha256:21f779fd12609d3c369d4988fc7c3eebafa322e1c9e8a63635f90243748efc8d | 2026-11-14T13:17:08Z |
+| 42376693686 | 13575584835 | r2-routing-preservation-preflight-f591b7e8590b694cd3b7693f6537c6a92e5ee8e5 | 1322925 | sha256:3477ad8f889a9c9229c10d62bb30a21bccd0d1cf6f1e23b3cb9aa31f54d675f6 | 2026-11-14T13:24:31Z |
+| 42377045988 | 13574979585 | r2-historical-preflight-audit-ccfa81d2b1bbe91ac937b548dd669d42d5a81384 | 3809 | sha256:c182d5fdbdf3c08f1dde11b7eb7231a98da9cdfe90ac05bc3badfcbdae1f6c1f | 2026-11-14T13:27:38Z |
+
+| 42371140511 | 13573537287 | r2-directed-sdk-preflight-22e9cfd13e41ecede2acfbe7e8d89593796d0148 | 537833 | sha256:ed8891f991f20843c2e8674b7aa7e59704a026fd78a817db7d8123fe17d3bf70 | 2026-11-14T12:10:07Z |
+
+| 42377143830 | 13577365572 | r2-green-g5-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 9770 | sha256:5ac83677c6b20808f3887a37a25c4556b30454c9ddb22c3377a08dd26fd07b60 | 2026-11-14T13:59:52Z |
+| 42377143830 | 13577320509 | r2-green-g4-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10868993 | sha256:89848da669483e9183ea188f6d42f114de3a47897197a9f06e3795e96ec2303c | 2026-11-14T14:02:47Z |
+| 42377143830 | 13577250037 | r2-green-g3-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1240317 | sha256:32e28b51f24b09952d7da42a43ad2105b052ecb2fc3a76e1b32e53d2c4b347db | 2026-11-14T13:58:11Z |
+| 42377143830 | 13577250008 | r2-green-g5-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1322312 | sha256:cccb46e54820151457d753dd908b2fa30510933195003cf65b1a66e734f7e362 | 2026-11-14T13:57:55Z |
+| 42377143830 | 13577195377 | r2-green-g3-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10851077 | sha256:0d243460d2cf609cddedbd519cb59d08d8e5179daca9754e9af180e823319c8c | 2026-11-14T13:58:07Z |
+| 42377143830 | 13577035486 | r2-green-g0-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10673 | sha256:047c2c6d8a263cf78a98ec25076f03df2a1a788e30fee8bf6934ab9b2428e1bd | 2026-11-14T13:44:40Z |
+| 42377143830 | 13577030545 | r2-green-g1-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 17063 | sha256:5b2ccde8460f57b0c2a5a2298beb9a35977a5aa3a3edb4c1835ffee127414061 | 2026-11-14T13:45:11Z |
+| 42377143830 | 13576848958 | r2-green-g3-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 17525 | sha256:7e17c8382f7502cefa0bbd4429f0abf47ca2922534c0e1b93989c3806ee63d63 | 2026-11-14T14:02:09Z |
+| 42377143830 | 13576795778 | r2-green-g0-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1244007 | sha256:7d2247733910e2c4da52eed54c810d442fa65d69a40016bc3a943ebef6e4fc91 | 2026-11-14T13:42:42Z |
+| 42377143830 | 13576780707 | r2-green-g1-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 21679966 | sha256:95311f062a6cadaa64c514d05fdf14dcd7bb01c98fa3056a9b4c574b36d597c4 | 2026-11-14T13:42:20Z |
+| 42377143830 | 13576756390 | r2-green-g2-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10852110 | sha256:f9351cbf8d7e9c858b74ee8eede7380409ca479f32c6b298c6b855e0cd185429 | 2026-11-14T13:42:18Z |
+| 42377143830 | 13576692464 | r2-green-g5-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 11008780 | sha256:93b3942f8aabbc44491bae7a68e69fedf6c0f7e903c3e2ccd4a983e6339b20f0 | 2026-11-14T13:57:50Z |
+| 42377143830 | 13576679069 | r2-green-g4-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1240469 | sha256:1b118f653231775c2d74358fa857f193ad027f08e8293c6bf3f0e3d579c89a8e | 2026-11-14T13:58:50Z |
+| 42377143830 | 13576667125 | r2-green-g2-consume-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 9928 | sha256:195029209e07f0d344dad9d122e842e127b5f6e9fca87efdea49e610121c0ee6 | 2026-11-14T13:44:19Z |
+| 42377143830 | 13576494625 | r2-green-g4-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10852020 | sha256:ec75cb7d090c8588ea6a7b5fa37868816a55e30c873681e0ca60fc291e173f55 | 2026-11-14T13:58:45Z |
+| 42377143830 | 13576282936 | r2-green-g1-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 2478165 | sha256:abbc69e5e36fd7080bca015b7c7101ce8426780204570c34d212e3cc246f935c | 2026-11-14T13:42:27Z |
+| 42377143830 | 13576258009 | r2-green-g2-prepare-evidence-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 1240314 | sha256:1e0f1497250e90af097c662c5636f3019dce38a20576214a11c7ad12c7585b06 | 2026-11-14T13:42:23Z |
+| 42377143830 | 13575868870 | r2-green-g0-checkpoint-e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb | 10851330 | sha256:e2d246948675004d659223db57a5e6bb265a44df58bbf4b9712d89b0f947c6f2 | 2026-11-14T13:42:37Z |
+
+| 42380606239 | 13577666814 | r2-g5-original-audit-9a189cff22d6f24627d21b631338ef0dc4b5afff | 5371 | sha256:cbc4b8f1d2cc84fb5277bff0d4130bc30a883de66eb3d79a42c643b345650110 | 2026-11-14T14:13:47Z |
+
+| 42381392620 | 13577593532 | r2-g5-denial-oracle-53b4ead2966d4366b6417a9a54f46577ddc0fcfc | 8684 | sha256:a20f951a867573347d8a6380c5b6ea3c6e030fdfb16f4a95f2c83ac03447cb4c | 2026-11-14T14:24:13Z |
+
+
+La retención de la promesa protege la misma ctx, pero no acredita que un trabajo de un isolate distinto haya sido drenado globalmente. El caso SDK-only conserva explícitamente MAdmission=false. Los artefactos y checkpoints son SYN y caducan a los siete días indicados; conservar sus identificadores no extiende su retención. La revisión independiente de Root sigue pendiente tras este reporte.
+
+Los cuatro hallazgos Minor heredados de Task1 siguen en su [revisión aceptada](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c478cc7e85c093614c7ae705ce2ec76615ed8207/docs/superpowers/reviews/2026-11-06-finite-owner-restoration-task1-review.es.md). Task2 no los elimina por inferencia; el límite RM2 se conserva explícitamente arriba.
`````

### lib/mcp-qa-finite-initial-cleanup.mjs

`````diff
diff --git a/lib/mcp-qa-finite-initial-cleanup.mjs b/lib/mcp-qa-finite-initial-cleanup.mjs
--- a/lib/mcp-qa-finite-initial-cleanup.mjs
+++ b/lib/mcp-qa-finite-initial-cleanup.mjs
@@ -1,10 +1,12 @@
+import {readPrivateQaFiniteOwnerCleanup,reducePrivateQaFiniteOwnerCleanup,finishPrivateQaFiniteOwnerCleanup,consumePrivateQaFiniteOwnerCleanup} from './mcp-qa-finite-owner-cleanup.mjs';
+import {observeFiniteOwnerCleanupWork,retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
 import {readPrivateQaFinitePreparationCleanup} from './mcp-qa-finite-preparation-cleanup.mjs';
 import {createFiniteInitialLease} from './mcp-qa-finite-initial-lease.mjs';
 import {FINITE_INITIAL_CLEANUP_PREFIX as P,FINITE_INITIAL_CLEANUP_KINDS as K,sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as encode,decodeFiniteInitialCleanupRecord as decode} from './mcp-qa-finite-initial-cleanup-records.mjs';
 import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
 import {decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
 import {decodeFiniteInitialUploadRecord as upload} from './mcp-qa-finite-initial-upload-records.mjs';
 import {qualifyFiniteInitialHistoricalBaseline,readPrivateQaFiniteHistoricalSource} from './mcp-qa-finite-historical-source.mjs';
 import {qualifyFiniteInitialUploadedVersion,initialUploadSha as sha} from './mcp-qa-finite-initial-upload-wire.mjs';
 import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
 import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
@@ -25,29 +27,35 @@
 export async function runPrivateQaFiniteInitialCleanupAlarm({ctx,env}){
  let parent;
  try{
   const ns=env?.AFW_INDEPENDENT_CLOSURE,actor=ctx?.id,toString=actor?.toString,idFromName=ns?.idFromName;
   if(typeof toString!=='function'||typeof idFromName!=='function')fail();
   if(actor.toString()!==ns.idFromName(SLOT).toString())return null;
   const storage=ctx.storage,get=storage?.get,list=storage?.list,transaction=storage?.transaction,sync=storage?.sync,getAlarm=storage?.getAlarm,fetcher=globalThis.fetch,metadata=env.AFW_QA_VERSION,qa=metadata?.id,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
   if([get,list,transaction,sync,getAlarm,fetcher].some(x=>typeof x!=='function'))fail();
   const holders=()=>{if(ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||actor.toString()!==ns.idFromName(SLOT).toString()||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();};
   parent=clock(Date.now()+30000,holders);const lease=parent.lease;
+  const originalRetain=parent.retain,originalWait=parent.wait,originalChild=parent.child;
+  parent.retain=p=>originalRetain(retainFiniteOwnerStagePromise(p));
+  parent.wait=(p,l)=>originalWait(parent.retain(p),l);
+  parent.child=work=>originalChild((l,end)=>parent.retain(Promise.resolve().then(()=>{current(l);return work(l,end);})));
+  return await observeFiniteOwnerCleanupWork({ctx,env,originalLease:lease},async()=>{
   const read=key=>parent.child(()=>Reflect.apply(get,storage,[key]));
-  // Unit2a issuer components are unmounted. Any such obligation is unresolved
-  // until the dedicated complete consumer is qualified; never ignore it.
-  const issuerRows=await parent.child(()=>Reflect.apply(list,storage,[{prefix:'afw.finite-preparation-issuer.v1:',limit:1}]));
-  if(issuerRows.size)fail();
+  // Presence selects the dedicated fixed observer, never permission to ignore
+  // an obligation. Unknown/future suffixes remain rejected by that observer.
+  let ownerObligation=false;
+  for(const prefix of ['afw.finite-policy-effect.v1:','afw.finite-preparation-issuer.v1:','afw.finite-owner-issuer-provenance.v1:','afw.finite-preparation-notice.v1:','afw.finite-owner-cleanup.v1:'])
+   if((await parent.child(()=>Reflect.apply(list,storage,[{prefix,limit:1}]))).size)ownerObligation=true;
   const rawRows=await parent.child(()=>Reflect.apply(list,storage,[{prefix:P,limit:16}]));
   // Read separate obligation even with absent initial anchors: an orphan cannot delegate.
-  await parent.child(l=>readPrivateQaFinitePreparationCleanup({ctx,env},l));
-  if(rawRows.size===0)return null;
+  if(!ownerObligation)await parent.child(l=>readPrivateQaFinitePreparationCleanup({ctx,env},l));
+  if(rawRows.size===0){if(ownerObligation)fail();return null;}
   if(rawRows.size>Object.keys(K).length)fail();
   const records={};for(const [key,raw]of rawRows){const name=key.slice(P.length);if(!Object.hasOwn(K,name))fail();records[name]=decode(K[name],raw);}
   const p=records.plan,s=records.state;if(!p||!s||s.planHash!==p.recordHash||await read(HEAD)!==undefined)fail();
   if(s.nextAt!==(s.status==='complete'||s.deliveries===3?null:p.C0+s.deliveries*60000)||s.deliveries===0&&(s.status!=='pending'||s.previousHash!==null))fail();
   const expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
   if(expected.sourceRevision!==p.sourceRevision||expected.sourceTree!==p.sourceTree||qa!==p.qaVersionId||resident.sourceRevision!==p.sourceRevision||resident.sourceTree!==p.sourceTree||resident.module.sha256!==p.moduleHash||resident.module.bytes!==p.moduleBytes||p.C1>CEILING||Date.now()<p.C0||Date.now()>=p.C1)fail();
   parent.narrow(Math.min(p.C1,p.readerExpiresAt,p.publisherExpiresAt));
   const entry=decodeFiniteInitialEntry(await read('afw.finite-initial-preparation.v1:entry'));
   if(entry.entryHash!==p.entryHash||entry.I0!==p.I0||entry.initialDeadline!==p.initialDeadline||entry.operationDeadline!==p.forwardDeadline||entry.initialInstanceId!==p.initialInstanceId||entry.sourceRevision!==p.sourceRevision||entry.sourceTree!==p.sourceTree||entry.qaVersionId!==p.qaVersionId)fail();
   const up='afw.finite-initial-upload.v1:'+p.entryHash+':',receipt=upload('Receipt',await read(up+'receipt')),backup=upload('Backup',await read(up+'backup'));
@@ -72,20 +80,25 @@
   if(s.status==='complete'){
    const done=records.receipt;
    if(!done||done.planHash!==p.recordHash||s.deliveries<1||s.previousHash===null||done.observedAt<p.C0||done.observedAt>=p.C1||done.observedAt>Date.now())fail();
    if(done.outcome==='never_activated'){
     if(send||ack||completion||restore||restoreAck||done.deploymentId!==p.baselineDeploymentId||done.restoreAckHash!==null||done.observedAt<=p.initialDeadline)fail();
     if(armAck)checkArm();
    }else{
     checkActivation();checkRestore();
     if(done.deploymentId!==restoreAck.deploymentId||done.restoreAckHash!==restoreAck.recordHash||done.observedAt<restoreAck.acknowledgedAt)fail();
    }
+   if(ownerObligation){
+    const reduction=await parent.wait(reducePrivateQaFiniteOwnerCleanup({ctx,env},lease));current(lease);if(!reduction)fail();
+    const receipt=await parent.wait(finishPrivateQaFiniteOwnerCleanup({ctx,env},reduction,lease));current(lease);
+    consumePrivateQaFiniteOwnerCleanup(receipt,{ctx,env},lease);
+   }
    return out(done.outcome);
   }
   if(s.deliveries===3||s.nextAt===null||Date.now()<s.nextAt)fail();
   const deliveries=Math.max(s.deliveries+1,Math.floor((Date.now()-p.C0)/60000)+1);if(deliveries>3)fail();
   const nextAt=deliveries<3?p.C0+deliveries*60000:null;
   const next=seal('State',{planHash:p.recordHash,deliveries,status:deliveries===3?'admin_pending':'processing',nextAt,previousHash:s.recordHash});
   async function transact(work,l){
    current(l);const result=await parent.retain(Reflect.apply(transaction,storage,[async tx=>{
     const tg=tx.get,tp=tx.put,ta=tx.setAlarm,td=tx.deleteAlarm;
     if([tg,tp,ta,td].some(x=>typeof x!=='function'))fail();
@@ -147,42 +160,53 @@
    if(sha(Buffer.concat(parts))!==backup.moduleHash||Buffer.concat(parts).length!==backup.moduleBytes)fail();
    const eligible=await getCf('/workers/scripts/'+W+'/versions',{deployable:true,per_page:100,page:1});
    const items=fields(eligible.value,['items']).items;
    if(!Array.isArray(items)||items.length>100||!eligible.info||eligible.info.page!==0||eligible.info.per_page!==100||eligible.info.count!==items.length||eligible.info.total_count!==items.length||eligible.info.total_pages!==undefined||eligible.info.cursor)fail();
    const ids=new Set();let previous=Infinity;
    for(const row of items){if(typeof row.id!=='string'||ids.has(row.id)||!Number.isSafeInteger(row.number)||row.number<1||row.number>=previous)fail();ids.add(row.id);previous=row.number;}
    if(!ids.has(p.baselineVersionId))fail();
    current(lease);if(await read(HEAD)!==undefined)fail();
    return pointer((await getCf('/workers/scripts/'+W+'/deployments?per_page=1')).value);
   }
-  let dp=await gates();
+  let dp=await gates(),ownerSnapshot=null,ownerReduction=null;
+  if(ownerObligation){
+   ownerSnapshot=await parent.wait(readPrivateQaFiniteOwnerCleanup({ctx,env},lease));current(lease);
+   if(!ownerSnapshot||ownerSnapshot.anchors.plan.recordHash!==p.recordHash)fail();
+   const pointer=ownerSnapshot.physical.pointer;exact(dp,pointer.versionId,pointer.deploymentId);
+   ownerReduction=await parent.wait(reducePrivateQaFiniteOwnerCleanup({ctx,env},lease));current(lease);if(!ownerReduction)fail();
+  }
   async function finish(outcome,deploymentId,restoreAckHash){
+   if(ownerReduction){const receipt=await parent.wait(finishPrivateQaFiniteOwnerCleanup({ctx,env},ownerReduction,lease));current(lease);consumePrivateQaFiniteOwnerCleanup(receipt,{ctx,env},lease);}
    await parent.child(async l=>{
     const receipt=seal('Receipt',{planHash:p.recordHash,outcome,deploymentId,restoreAckHash,observedAt:Date.now()});await append('receipt','Receipt',receipt,l);
     const done=seal('State',{planHash:p.recordHash,deliveries,status:'complete',nextAt:null,previousHash:next.recordHash});
     const committed=await transact(async tx=>{if(await tx.r(P+'state')!==encode('State',next))fail();await tx.put(P+'state',encode('State',done));await tx.alarm(null);return true;},l);
     if(committed!==true)fail();await durable('state','State',done,l);
    });return out(outcome);
   }
   if(!send){if(ack||completion||restore||restoreAck||records.receipt)fail();exact(dp,p.baselineVersionId,p.baselineDeploymentId);if(Date.now()<=p.initialDeadline)fail();return await finish('never_activated',dp.id,null);}
   checkActivation();
   if(restore){
    checkRestore();
    exact(dp,p.baselineVersionId,restoreAck.deploymentId,annotation);return await finish('restored',dp.id,restoreAck.recordHash);
   }
   if(restoreAck||records.receipt)fail();
-  exact(dp,p.candidateVersionId,ack.deploymentId,activationAnnotation);
-  qualifyFiniteInitialUploadedVersion((await getCf('/workers/workers/'+W+'/versions/'+p.candidateVersionId+'?include=modules')).value,p.candidateVersionId,p.configuration,resident.bytes);
+  const ownedPointer=ownerSnapshot?.physical.pointer??{versionId:p.candidateVersionId,deploymentId:ack.deploymentId};
+  const ownConnection=ownedPointer.versionId!==p.candidateVersionId;
+  exact(dp,ownedPointer.versionId,ownedPointer.deploymentId,ownConnection?undefined:activationAnnotation);
+  if(ownConnection){if(Object.hasOwn(dp,'annotations'))fail();}
+  else qualifyFiniteInitialUploadedVersion((await getCf('/workers/workers/'+W+'/versions/'+p.candidateVersionId+'?include=modules')).value,p.candidateVersionId,p.configuration,resident.bytes);
   await parent.child(async(l,deadline)=>{
    await custody(l);
-   const fresh=pointer((await http('GET','/workers/scripts/'+W+'/deployments?per_page=1',reader,null,l,65536)).value);exact(fresh,p.candidateVersionId,ack.deploymentId,activationAnnotation);
+   const fresh=pointer((await http('GET','/workers/scripts/'+W+'/deployments?per_page=1',reader,null,l,65536)).value);exact(fresh,ownedPointer.versionId,ownedPointer.deploymentId,ownConnection?undefined:activationAnnotation);if(ownConnection&&Object.hasOwn(fresh,'annotations'))fail();
    const sent=seal('RestoreSend',{planHash:p.recordHash,activationCompletionHash:completion.recordHash,bodyHash:sha(body),annotation,issuedAt:Date.now(),deadline});
    await append('restore-send','RestoreSend',sent,l);current(l);
    const actual=(await http('POST','/workers/scripts/'+W+'/deployments',publisher,body,l,65536)).value;
    const actualPointer=pointer([actual]);exact(actualPointer,p.baselineVersionId,actual.id,annotation);
    if(actual.id===ack.deploymentId||actual.id===p.baselineDeploymentId)fail();
    const saved=seal('RestoreAck',{planHash:p.recordHash,sendHash:sent.recordHash,deploymentId:actual.id,acknowledgedAt:Date.now()});await append('restore-ack','RestoreAck',saved,l);records['restore-ack']=saved;
   });
   dp=await gates();exact(dp,p.baselineVersionId,records['restore-ack'].deploymentId,annotation);
   return await finish('restored',dp.id,records['restore-ack'].recordHash);
+  });
  }catch{return pending();}finally{parent?.close();}
 }
`````

### lib/mcp-qa-finite-owner-cleanup-journal.mjs

`````diff
diff --git a/lib/mcp-qa-finite-owner-cleanup-journal.mjs b/lib/mcp-qa-finite-owner-cleanup-journal.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-cleanup-journal.mjs
@@ -0,0 +1,67 @@
+import {initialOwn as own,initialFields as fields,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+import {FINITE_OWNER_CLEANUP_PREFIX as P,FINITE_OWNER_CLEANUP_OPERATIONS as OPS,encodeFiniteOwnerCleanupRecord as encode,decodeFiniteOwnerCleanupRecord as decode} from './mcp-qa-finite-owner-cleanup-records.mjs';
+const fail=()=>{throw Error('Finite owner cleanup journal unavailable');};
+export function createFiniteOwnerCleanupJournal(options){
+ fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
+ const prefix=id=>{if(!hex(id))fail();return P+id+':';},record=(kind,v)=>decode(kind,encode(kind,v));
+ async function inventory(id,g,storage=c.storage){
+  const list=storage.list;if(typeof list!=='function')fail();g();const rows=await c.wait(Reflect.apply(list,storage,[{prefix:prefix(id),limit:17}]),g);
+  if(!(rows instanceof Map)||rows.size>9)fail();
+  const out={identity:null,receipt:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,observed:null}])),reconciled:{},entries:[]};
+  for(const [key,raw]of rows){
+   const suffix=key.slice(prefix(id).length);let kind,target,field;
+   if(suffix==='identity'||suffix==='receipt'){kind=suffix==='identity'?'Identity':'Receipt';target=out;field=suffix;}
+   else{const [a,b,...rest]=suffix.split(':');if(rest.length)fail();if(a==='reconciled'&&['1','2','3'].includes(b)){kind='Reconciled';target=out.reconciled;field=b;}else if(OPS.includes(a)&&['send','observed'].includes(b)){kind=b==='send'?'Send':'Observed';target=out.operations[a];field=b;}else fail();}
+   target[field]=decode(kind,raw);out.entries.push(Object.freeze([key,raw]));
+  }
+  const i=out.identity;
+  if(!i){if(rows.size)fail();return out;}
+  if(i.preconnectionId!==id||i.actorId!==c.actorId||i.qaVersionId!==c.qa)fail();
+  for(const op of OPS){
+   const {send:s,observed:o}=out.operations[op];
+   if(s&&(s.identityHash!==i.recordHash||s.operation!==op||s.issuedAt<i.C0||s.deadline>i.C1))fail();
+   if(o&&(!s||o.sendHash!==s.recordHash||o.observedAt<s.issuedAt||o.observedAt>=s.deadline||op==='sdk_revoke'&&o.outcome!=='returned'||op==='monitoring_revoke'&&o.outcome==='returned'))fail();
+  }
+  for(const [delivery,r]of Object.entries(out.reconciled))if(r.delivery!==Number(delivery)||r.identityHash!==i.recordHash||r.observedAt<i.C0||r.observedAt>=i.C1)fail();
+  if(out.receipt)checkReceipt(out.receipt,out);
+  return out;
+ }
+ function checkReceipt(r,before){
+  const i=before.identity,s=before.operations.sdk_revoke,m=before.operations.monitoring_revoke;
+  if(!i||r.identityHash!==i.recordHash||r.planHash!==i.planHash||r.observedAt<i.C0||r.observedAt>=i.C1||s.send&&!s.observed||m.send&&!m.observed)fail();
+  if(s.send?(r.sdkSendHash!==s.send.recordHash||r.sdkObservedHash!==s.observed.recordHash||!r.sdkReductionReturned||r.observedAt<s.observed.observedAt):(r.sdkSendHash!==null||r.sdkObservedHash!==null||r.sdkReductionReturned))fail();
+ }
+ async function append(id,suffix,kind,value,lease){
+  const v=record(kind,value),raw=encode(kind,v),g=c.leaseGuard(lease);g();
+  try{
+   const result=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
+    const get=tx.get,put=tx.put,list=tx.list;if([get,put,list].some(f=>typeof f!=='function'))fail();
+    const guard=()=>{g();if(tx.get!==get||tx.put!==put||tx.list!==list)fail();};
+    const before=await inventory(id,guard,tx),i=before.identity;
+    if(kind==='Identity'){if(v.preconnectionId!==id||v.actorId!==c.actorId||v.qaVersionId!==c.qa)fail();}
+    else{
+     if(!i)fail();
+     if(kind==='Send'&&(v.identityHash!==i.recordHash||v.operation+':send'!==suffix||v.issuedAt<i.C0||v.deadline>i.C1||before.receipt))fail();
+     if(kind==='Observed'){const op=suffix.split(':')[0],s=before.operations[op].send;if(!s||v.sendHash!==s.recordHash||v.observedAt<s.issuedAt||v.observedAt>=s.deadline||op==='sdk_revoke'&&v.outcome!=='returned'||op==='monitoring_revoke'&&v.outcome==='returned'||before.receipt)fail();}
+     if(kind==='Reconciled'&&(v.identityHash!==i.recordHash||suffix!=='reconciled:'+v.delivery||v.observedAt<i.C0||v.observedAt>=i.C1||before.receipt))fail();
+     if(kind==='Receipt')checkReceipt(v,before);
+    }
+    const old=await c.wait(Reflect.apply(get,tx,[prefix(id)+suffix]),guard);
+    if(old!==undefined){if(old!==raw)fail();return 'existing';}
+    if(before.entries.length>=9)fail();await c.wait(Reflect.apply(put,tx,[prefix(id)+suffix,raw]),guard);return 'recorded';
+   }]),g);
+   await c.wait(Reflect.apply(c.sync,c.storage,[]),g);
+   if(await c.wait(Reflect.apply(c.get,c.storage,[prefix(id)+suffix]),g)!==raw)fail();
+   decode(kind,raw);return Object.freeze({status:result,recordHash:v.recordHash});
+  }catch{return Object.freeze({status:'uncertain',recordHash:v.recordHash});}
+ }
+ return Object.freeze({
+  read(input,lease){const v=own(input);fields(v,['preconnectionId']);return inventory(v.preconnectionId,c.leaseGuard(lease));},
+  appendIdentity(input,lease){const v=record('Identity',input);return append(v.preconnectionId,'identity','Identity',v,lease);},
+  appendSend(input,lease){const v=own(input);fields(v,['preconnectionId','record']);const r=record('Send',v.record);return append(v.preconnectionId,r.operation+':send','Send',r,lease);},
+  appendObserved(input,lease){const v=own(input);fields(v,['preconnectionId','operation','record']);if(!OPS.includes(v.operation))fail();return append(v.preconnectionId,v.operation+':observed','Observed',v.record,lease);},
+  appendReconciled(input,lease){const v=own(input);fields(v,['preconnectionId','record']);const r=record('Reconciled',v.record);return append(v.preconnectionId,'reconciled:'+r.delivery,'Reconciled',r,lease);},
+  finish(input,lease){const v=own(input);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'receipt','Receipt',v.record,lease);}
+ });
+}
`````

### lib/mcp-qa-finite-owner-cleanup-records.mjs

`````diff
diff --git a/lib/mcp-qa-finite-owner-cleanup-records.mjs b/lib/mcp-qa-finite-owner-cleanup-records.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-cleanup-records.mjs
@@ -0,0 +1,25 @@
+import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {issuerTime as time,issuerUuid as uuid} from './mcp-qa-finite-preparation-issuer-records.mjs';
+export const FINITE_OWNER_CLEANUP_PREFIX='afw.finite-owner-cleanup.v1:';
+export const FINITE_OWNER_CLEANUP_OPERATIONS=Object.freeze(['monitoring_revoke','sdk_revoke']);
+const defs={Identity:'planHash capsuleHash enrollmentHash preconnectionId sourceRevision qaVersionId actorId I0 C0 C1',Send:'identityHash operation requestId requestHash issuedAt deadline',Observed:'sendHash resultHash outcome observedAt',Reconciled:'identityHash sendHash delivery factsHash observedAt',Receipt:'identityHash planHash fenceHash grantFactHash noticeFactHash sdkSendHash sdkObservedHash restoreSendHash restoreAckHash baselineVersionId baselineDeploymentId finalFactsHash observedAt businessAccessClosed sdkReductionReturned globalNativeDrainVerified sdkNamespaceEmptyVerified'};
+const fail=()=>{throw Error('Finite owner cleanup record unavailable');},check=v=>{if(!v)fail();};
+function validate(kind,input,hashing=false){
+ check(Object.hasOwn(defs,kind));const v=own(input),purpose='afw.finite-owner-cleanup-'+kind.toLowerCase()+'.v1';
+ fields(v,['purpose',...defs[kind].split(' '),...!hashing||Object.hasOwn(v,'recordHash')?['recordHash']:[]]);
+ check(v.purpose===purpose&&Buffer.byteLength(canonical(v))<=16384);
+ for(const [k,value]of Object.entries(v))if(k.endsWith('Hash'))check(value===null&&['sdkSendHash','sdkObservedHash','restoreSendHash','restoreAckHash'].includes(k)||hex(value));
+ if(kind==='Identity')check(hex(v.preconnectionId)&&hex(v.sourceRevision,40)&&hex(v.actorId)&&uuid(v.qaVersionId)&&[v.I0,v.C0,v.C1].every(time)&&v.C0===v.I0+900000&&v.C1===v.C0+180000);
+ if(kind==='Send')check(FINITE_OWNER_CLEANUP_OPERATIONS.includes(v.operation)&&uuid(v.requestId)&&time(v.issuedAt)&&time(v.deadline)&&v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=5000);
+ if(kind==='Observed')check(['applied','already_withdrawn','returned'].includes(v.outcome)&&time(v.observedAt));
+ if(kind==='Reconciled')check([1,2,3].includes(v.delivery)&&time(v.observedAt));
+ if(kind==='Receipt'){
+  check(time(v.observedAt)&&uuid(v.baselineVersionId)&&uuid(v.baselineDeploymentId)&&v.businessAccessClosed===true&&v.globalNativeDrainVerified===false&&v.sdkNamespaceEmptyVerified===false&&typeof v.sdkReductionReturned==='boolean');
+  check(v.sdkReductionReturned?v.sdkSendHash!==null&&v.sdkObservedHash!==null:v.sdkSendHash===null&&v.sdkObservedHash===null);
+  check((v.restoreSendHash===null)===(v.restoreAckHash===null));
+ }
+ if(!hashing)check(v.recordHash===hash(purpose,Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'))));return v;
+}
+export function sealFiniteOwnerCleanupRecord(kind,input){const v=validate(kind,input,true),body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));return validate(kind,{...body,recordHash:hash(v.purpose,body)});}
+export function encodeFiniteOwnerCleanupRecord(kind,input){const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;}
+export function decodeFiniteOwnerCleanupRecord(kind,raw){check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(canonical(v)===raw);return v;}
`````

### lib/mcp-qa-finite-owner-cleanup.mjs

`````diff
diff --git a/lib/mcp-qa-finite-owner-cleanup.mjs b/lib/mcp-qa-finite-owner-cleanup.mjs
--- a/lib/mcp-qa-finite-owner-cleanup.mjs
+++ b/lib/mcp-qa-finite-owner-cleanup.mjs
@@ -1,10 +1,37 @@
+import {createHash,randomUUID} from 'node:crypto';
+import {createFiniteInitialLease} from './mcp-qa-finite-initial-lease.mjs';
+import {sealFiniteOwnerCleanupRecord as cleanupSeal} from './mcp-qa-finite-owner-cleanup-records.mjs';
+import {createFiniteOwnerCleanupJournal} from './mcp-qa-finite-owner-cleanup-journal.mjs';
+import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA,FINITE_PREPARATION_MONITORING_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
+import {sealFinitePreparationIssuerRecord as issuerSeal} from './mcp-qa-finite-preparation-issuer-records.mjs';
+import {createFinitePreparationNoticeJournal as noticeJournal} from './mcp-qa-finite-preparation-notice-journal.mjs';
+import {decodeFinitePreparationCleanupRecord as enrollmentRecord} from './mcp-qa-finite-preparation-cleanup-records.mjs';
+import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
+import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
+import {hashFinitePreparationRecord as prepHash,encodeFinitePreparationRecord as prepEncode,hashFinitePolicyEffectIdentity as effectIdentity,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
+import {qualifyFinitePreparationEnrollmentFacts} from './mcp-qa-finite-preparation-enrollment-facts.mjs';
+import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
+import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
+import {qualifyFiniteOwnerSdkBindingFacts} from './mcp-qa-finite-owner-sdk-binding-facts.mjs';
+import {finiteInitialCapsuleBindingsHash} from './mcp-qa-finite-initial-capsule-records.mjs';
+import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
+import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
+import {decodeFiniteInitialUploadRecord as uploadRecord} from './mcp-qa-finite-initial-upload-records.mjs';
+import {qualifyFiniteInitialUploadedVersion} from './mcp-qa-finite-initial-upload-wire.mjs';
+import {qualifyFiniteInitialHistoricalBaseline} from './mcp-qa-finite-historical-source.mjs';
+import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
+import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
+import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
+import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
+import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {initialHash as digest} from './mcp-qa-finite-initial-material-records.mjs';
 import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
 import {captureFinitePreparationIssuerContext,createFinitePreparationIssuerJournal} from './mcp-qa-finite-preparation-issuer-journal.mjs';
 import {createFiniteOwnerIssuerProvenanceJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
 import {finiteOwnerSdkCleanupCorrelation} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
 import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
 import {readPrivateQaFiniteOwnerContext} from './mcp-qa-finite-owner-phase-context.mjs';
 import {readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
 import {observeFiniteFactualReadWork,retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
 import {initialFields as fields,initialOwn as own,initialCanonical as canonical,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
 const fail=()=>{throw Error('Finite owner SDK grant unavailable');};
@@ -90,10 +117,591 @@
     found=value;
    }
    cursor=result.cursor;
   }while(cursor!==undefined);
   if(!found)fail();guard();
   const again=await wait(readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId})),after=await wait(readPrivateQaFiniteInitialAnchors({ctx,env},lease)),afterSdk=await wait(createFiniteOwnerIssuerProvenanceJournal({ctx,env}).read({preconnectionId},lease)),afterIssuer=await wait(createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease));
   if(canonical(again)!==canonical(source)||canonical(after)!==canonical(anchors)||canonical(afterSdk)!==canonical(sdk)||canonical(afterIssuer)!==canonical(issuer))fail();guard();
   return Object.freeze({rootHash:root.recordHash,expectedGrantHash:expectedGrant.recordHash,completeSendHash:complete.send.recordHash,completeObservedHash:complete.observed.recordHash,correlationHash,sdkGrantId:found.id,createdAt:found.createdAt,expiresAt:found.expiresAt});
  });
 }
+
+const CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
+const QA='agent-friendly-web-independent-closure-qa',CANARY='agent-friendly-web-delegated-canary';
+const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
+const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
+const sdkJournal=createFiniteOwnerIssuerProvenanceJournal;
+function frozen(value){if(value&&typeof value==='object'){for(const v of Object.values(value))frozen(v);Object.freeze(value);}return value;}
+// Children borrow the original alarm lease. Their own five-second timers may
+// only shorten that invocation; no incoming-request Root or admission is minted.
+function cleanupLifetime(options,originalLease){
+ fields(options,['ctx','env']);const {ctx,env}=options,c=captureFinitePreparationIssuerContext(options);
+ const storage=c.storage,get=c.get,list=c.list,db=c.db,withSession=c.session,prepare=db.prepare,getAlarm=storage.getAlarm;
+ const node=env.AFW_RELEASE_EVENTS_NODE,nodeName=node?.idFromName,nodeString=node?.idFromString,nodeGet=node?.get,self=env.AFW_INDEPENDENT_CLOSURE,namespaceGet=self?.get;
+ const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+ const reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+ if([prepare,getAlarm,nodeName,nodeString,nodeGet,namespaceGet,fetcher,...Object.values(methods)].some(x=>typeof x!=='function')||db===env.DB||[reader,publisher].some(v=>typeof v!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(v)))fail();
+ const nativeGuard=c.leaseGuard(originalLease),guard=()=>{
+  nativeGuard();
+  if(options.ctx!==ctx||options.env!==env||db.prepare!==prepare||storage.getAlarm!==getAlarm||env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||node.get!==nodeGet||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==namespaceGet||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
+ };
+ async function child(work){
+  guard();const end=Date.now()+5000,clock=createFiniteInitialLease(end,end,guard,fail),stop=()=>clock.close();
+  originalLease.signal.addEventListener('abort',stop,{once:true});
+  const actual=retain(Promise.resolve().then(()=>{current(clock.lease);return work(clock.lease,end);}));
+  try{return await clock.wait(actual);}finally{originalLease.signal.removeEventListener('abort',stop);clock.close();}
+ }
+ return {ctx,env,c,storage,get,list,db,withSession,node,nodeName,reader,publisher,fetcher,alias,methods,guard,child};
+}
+/** Fixed cleanup-only factual snapshot. Historical receipts remain dated facts;
+ * fresh native holders, owner revision, provider bytes and original C1 govern
+ * this invocation. Task1's forward reader above is unchanged. */
+export async function readPrivateQaFiniteOwnerCleanup(options,originalLease){
+ const life=cleanupLifetime(options,originalLease),{ctx,env,c,storage,get,list,db,withSession,node,nodeName,reader,publisher,fetcher,child}=life;
+ const actorId=c.actorId,qaVersionId=c.qa,expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
+ const qaNamespaceId=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id;
+ const obligations=await child(()=>Reflect.apply(list,storage,[{prefix:'afw.finite-preparation-cleanup.v1:',limit:3}]));
+ if(!obligations.size){
+  for(const prefix of ['afw.finite-policy-effect.v1:','afw.finite-preparation-issuer.v1:','afw.finite-owner-issuer-provenance.v1:','afw.finite-preparation-notice.v1:','afw.finite-owner-cleanup.v1:'])if((await child(()=>Reflect.apply(list,storage,[{prefix,limit:1}]))).size)fail();
+  return null;
+ }
+   const read=key=>child(()=>Reflect.apply(get,storage,[key]));
+   const rows=(prefix,limit)=>child(()=>Reflect.apply(list,storage,[{prefix,limit}]));
+   const request=(path,cap=65536,token=reader)=>child(async l=>{
+    let response,stream;
+    try{
+     // Keep the actual fetch and body/cancellation lifecycle retained even if a
+     // timeout wins. An aborted signal is never physical-settlement evidence.
+     response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);
+     const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
+     if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||
+      !/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||
+      ['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
+     stream=response.body.getReader();const chunks=[];let size=0;
+     for(;;){const part=await retain(stream.read());current(l);if(part.done)break;if(!(part.value instanceof Uint8Array)||(size+=part.value.length)>cap)fail();chunks.push(part.value);}
+     if(length!==null&&Number(length)!==size)fail();
+     return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};
+    }finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
+   });
+   const select=(sql,args=[])=>child(async l=>{
+    const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
+    if(typeof method!=='function'||!sql.startsWith('SELECT '))fail();
+    const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
+    const bound=Reflect.apply(bind,statement,args),first=bound?.first;if(typeof first!=='function')fail();
+    const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;
+   });
+   // Each factual ALL is the first statement of its own primary session.
+   const selectAll=(sql,args,cap)=>child(async l=>{
+    const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
+    if(typeof method!=='function')fail();
+    const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
+    const bound=Reflect.apply(bind,statement,args),all=bound?.all;if(typeof all!=='function')fail();
+    const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);
+    if(session.prepare!==method||statement.bind!==bind||bound.all!==all||result?.success!==true||!Array.isArray(result.results)||result.results.length>cap)fail();
+    return result.results.map(row=>own(row));
+   });
+   const facts=async()=>{
+    const a=await child(l=>readPrivateQaFiniteInitialAnchors({ctx,env},l)),{capsule,material,plan}=a;
+    if(capsule.sourceRevision!==expected.sourceRevision||capsule.sourceTree!==expected.sourceTree||capsule.qaVersionId!==qaVersionId||capsule.moduleHash!==resident.module.sha256)fail();
+    if(Date.now()>=Math.min(capsule.C1,plan.readerExpiresAt,plan.publisherExpiresAt))fail();
+    if(Date.now()<capsule.C0||Date.now()>=capsule.C1||capsule.recordedAt>Date.now()||a.alarm!==null&&a.alarm!==a.state.nextAt)fail();
+    for(const prefix of ['afw.qa-finite-trial.v1:','source-selection:'+capsule.sourceRevision+':'])if((await rows(prefix,1)).size)fail();
+    const backupRaw=[],backupRead=async(key,kind)=>{const raw=await read(key);backupRaw.push([key,raw]);return uploadRecord(kind,raw);};
+    const up='afw.finite-initial-upload.v1:'+plan.entryHash+':',backup=await backupRead(up+'backup','Backup'),receipt=await backupRead(up+'receipt','Receipt');
+    for(const k of ['entryHash','materialHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId','baselineVersionId','baselineDeploymentId'])if(receipt[k]!==plan[k]||backup[k]!==plan[k])fail();
+    if(backup.recordHash!==plan.manifestHash||receipt.manifestHash!==plan.manifestHash||receipt.uploadedVersionId!==capsule.activatedVersionId||receipt.moduleHash!==plan.moduleHash||receipt.configurationHash!==plan.configurationHash||backup.retainedIds.preconnectionId!==capsule.preconnectionId||canonical(backup.retainedIds)!==canonical({preconnectionId:capsule.preconnectionId,trialId:material.originalContext.trialId,activationKey:material.originalContext.publication.activationKey,withdrawalRequestId:material.originalContext.withdrawalRequestId,saveIdempotencyKey:material.originalContext.saveIdempotencyKey})||receipt.recordedAt>capsule.recordedAt)fail();
+    const chunks=[];let bytes=0;
+    for(const c of backup.chunks){const chunk=await backupRead(up+'chunk:'+String(c.index).padStart(3,'0'),'Chunk');if(chunk.manifestHash!==backup.recordHash||chunk.index!==c.index||chunk.bytes!==c.bytes||chunk.sha256!==c.sha256)fail();const part=Buffer.from(chunk.content,'base64');bytes+=part.length;if(bytes>2097152)fail();chunks.push(part);}
+    if(bytes!==backup.moduleBytes||sha(Buffer.concat(chunks,bytes))!==backup.moduleHash)fail();
+    const prefix='connection-preparation:'+capsule.preconnectionId+':',inventory=await rows(prefix,17),effects=await rows('afw.finite-policy-effect.v1:',33),enrollment=await rows('afw.finite-preparation-cleanup.v1:',3);
+    if(inventory.size>16||effects.size>32||enrollment.size>2)fail();
+    for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection','notice'].some(s=>k===prefix+s))fail();
+    for(const k of enrollment.keys())if(!['enrollment','ack'].some(s=>k==='afw.finite-preparation-cleanup.v1:'+s))fail();
+    const issuer=await child(l=>createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    const sdk=await child(l=>sdkJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    const notice=await child(l=>noticeJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,sdk,notice,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer,sdk:sdk.entries,notice})};
+   };
+   const first=await facts(),{capsule,material,plan}=first,p=material.ownerSelection;
+   if(plan.moduleBytes!==resident.bytes.length||sha(resident.bytes)!==capsule.moduleHash||material.originalContext.original.containerId!==Reflect.apply(nodeName,node,['afw-own-event-one-occurrence-v1']).toString())fail();
+   const owned=async()=>{
+    const value=await select('SELECT id,user_id,revision FROM site_projects WHERE id=? AND user_id=?',[p.project.projectId,p.subject]);
+    if(!value||value.id!==p.project.projectId||value.user_id!==p.subject||value.revision!==p.project.revision)fail();
+    return {projectId:value.id,revision:value.revision,synthetic:true};
+   };
+   const verifyCredential=async(token,id,expiresAt)=>{
+    const v=finiteCfEnvelope((await request('/tokens/verify',8192,token)).value);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
+    if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiresAt||Date.parse(v.expires_on)<=Date.now()||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
+   };
+   const credentials=async()=>{
+    const readerWork=retain(Promise.resolve().then(()=>verifyCredential(reader,plan.readerId,plan.readerExpiresAt)));
+    const publisherWork=retain(Promise.resolve().then(()=>verifyCredential(publisher,plan.publisherId,plan.publisherExpiresAt)));
+    const joined=await retain(Promise.allSettled([readerWork,publisherWork]));
+    current(originalLease);if(joined.some(result=>result.status!=='fulfilled'))fail();
+   };
+   const readQaPrimary=async()=>{
+    const qaPointer=finiteQaPointer(await request('/workers/scripts/'+QA+'/deployments?per_page=1'));
+    if(canonical(qaPointer)!==canonical(material.qaBootstrap.currentPointer))fail();
+    const q=finiteCfEnvelope((await request('/workers/workers/'+QA+'/versions/'+qaVersionId+'?include=modules',4500000)).value);
+    const configKeys=Object.keys(finitePublicProfileTemplate('qaLive')),wrappers=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
+    fields(q,[...configKeys,...wrappers.filter(k=>Object.hasOwn(q,k))]);
+    if(q.id!==qaVersionId||!Array.isArray(q.urls)||q.urls.length||!Array.isArray(q.modules)||q.modules.length!==1)fail();
+    const qaModule=fields(q.modules[0],['name','content_type','content_base64']),expectedModule=material.qaBootstrap.record.qaLive.module;
+    if(qaModule.name!==expectedModule.name||qaModule.content_type!=='application/javascript+module'||typeof qaModule.content_base64!=='string'||qaModule.content_base64.length>Math.ceil(expectedModule.bytes/3)*4)fail();
+    const bytes=Buffer.from(qaModule.content_base64,'base64');
+    if(bytes.toString('base64')!==qaModule.content_base64||bytes.length!==expectedModule.bytes||sha(bytes)!==expectedModule.sha256)fail();
+    projectFinitePublicConfiguration({role:'qaLive',metadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))});
+    return {qaMetadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))};
+   };
+   const readMPrimary=async()=>{
+    const rawPointer=await request('/workers/scripts/'+CANARY+'/deployments?per_page=1'),pointer=finiteQaPointer(rawPointer),deployment=finiteCfEnvelope(rawPointer.value).deployments[0];
+    const restored=first.a.records['restore-ack'],restoreSend=first.a.records['restore-send'];
+    const isRestored=!!restored;
+    if(isRestored){
+     if(!restoreSend||restored.sendHash!==restoreSend.recordHash||restored.planHash!==plan.recordHash||restored.acknowledgedAt<restoreSend.issuedAt||restored.acknowledgedAt>=restoreSend.deadline||pointer.versionId!==plan.baselineVersionId||pointer.deploymentId!==restored.deploymentId||deployment.annotations?.['workers/message']!=='afw-finite-initial-restore-'+plan.recordHash)fail();
+     const baseline=qualifyFiniteInitialHistoricalBaseline(finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+plan.baselineVersionId+'?include=modules',4500000)).value));
+     const backup=uploadRecord('Backup',await read('afw.finite-initial-upload.v1:'+plan.entryHash+':backup'));
+     if(sha(baseline.bytes)!==backup.moduleHash||restorationConfigurationHash(baseline.rawConfiguration)!==backup.rawConfigurationHash)fail();
+    }
+
+    const metadata=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+capsule.activatedVersionId+'?include=modules',4500000)).value);
+    const configuration=qualifyFiniteInitialUploadedVersion(metadata,capsule.activatedVersionId,plan.configuration,resident.bytes);
+    if(restorationConfigurationHash(configuration)!==capsule.configurationHash||finiteInitialCapsuleBindingsHash(configuration.bindings)!==capsule.bindingsHash)fail();
+    const binding=name=>configuration.bindings.find(b=>b.name===name),text=name=>binding(name)?.text;
+    if(text('AFW_OAUTH_PILOT_CLIENT_ID')!==p.clientId||text('AFW_OAUTH_PILOT_PROJECT_ID')!==p.project.projectId||text('AFW_OAUTH_RESOURCE')!==p.resource||text('ACCESS_TEAM_DOMAIN')!==p.access.teamDomain||text('ACCESS_AUD')!==p.access.audience||text('AFW_OAUTH_PILOT_EXPIRES_AT')!==new Date(capsule.C0).toISOString()||canonical(binding('DELEGATED_RATE_LIMITER'))!==canonical(p.limiter))fail();
+    const project=await owned();
+    let currentConfiguration=configuration;
+    if(!isRestored&&(pointer.versionId!==capsule.activatedVersionId||pointer.deploymentId!==capsule.activatedDeploymentId)){
+     const raw=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+pointer.versionId+'?include=modules',4500000)).value);
+     const configKeys=Object.keys(plan.configuration),wrappers=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
+     fields(raw,[...configKeys,...wrappers.filter(k=>Object.hasOwn(raw,k)),...Object.hasOwn(raw,'cache_options')?['cache_options']:[]]);
+     if(raw.id!==pointer.versionId||!Array.isArray(raw.urls)||raw.urls.length||!Array.isArray(raw.modules)||raw.modules.length!==1)fail();
+     const cfg=structuredClone(own(Object.fromEntries(configKeys.map(k=>[k,raw[k]]))));
+     fields(cfg.exports,['default','AfwNodeControl','AfwOwnEventNode']);
+     for(const [name,e]of Object.entries(cfg.exports)){const keys=name==='AfwOwnEventNode'?['type','storage','container']:['type'];fields(e,[...keys,...Object.hasOwn(e,'state')?['state']:[],...Object.hasOwn(e,'cache')?['cache']:[]]);if(Object.hasOwn(e,'state')){if(e.state!=='created')fail();delete e.state;}if(Object.hasOwn(e,'cache')){fields(e.cache,['enabled']);if(name==='AfwOwnEventNode'||e.cache.enabled!==false)fail();delete e.cache;}}
+     if(Object.hasOwn(raw,'cache_options')){const keys=['enabled','cross_version_cache'].filter(k=>Object.hasOwn(raw.cache_options??{},k));if(!keys.length)fail();fields(raw.cache_options,keys);if(keys.some(k=>raw.cache_options[k]!==false))fail();}
+     const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+     if(canonical(cfg)!==canonical(expected))fail();qualifyFiniteConnectionProfile({phase:'read_consent',metadata:cfg});
+     const currentModule=fields(raw.modules[0],['name','content_type','content_base64']);if(currentModule.name!=='index.mjs'||currentModule.content_type!=='application/javascript+module'||typeof currentModule.content_base64!=='string'||currentModule.content_base64!==Buffer.from(resident.bytes).toString('base64'))fail();currentConfiguration=cfg;
+    }
+    return {project,pointer,deployment,isRestored,currentConfiguration,configuration,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
+   };
+   const primary=async()=>{
+    await credentials();
+    const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));
+    const joined=await retain(Promise.allSettled([qaWork,mWork]));
+    current(originalLease);if(joined.some(result=>result.status!=='fulfilled'))fail();
+    const {qaMetadata}=joined[0].value,{project,pointer,deployment,isRestored,currentConfiguration,configuration,initialBaseline}=joined[1].value;
+    const qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:currentConfiguration});
+    qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:configuration});
+    return {project,pointer,deployment,isRestored,currentConfiguration,qaSdkBindingFacts,initialBaseline};
+   };
+   const observed=await primary();
+   const source=validateFiniteOwnerSource({sourceRevision:capsule.sourceRevision,actorId,qaNamespaceId,qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:observed.project,goal:p.goal,
+    programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:digest('afw.finite-original-context.v1',material.originalContext)},
+    initialBaseline:observed.initialBaseline,currentPublication:{stage:null,versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,receiptHash:null},window:{startedAt:capsule.I0,expiresAt:capsule.C0}});
+   const issuerPrimary=async(f,data,enrollment,ack,receipt,getRecord)=>{
+    const id=capsule.preconnectionId,issuer=f.issuer,i=issuer.reservation?.identity;
+    const schema=await select('SELECT type,name,sql FROM sqlite_schema WHERE name=?',['finite_preparation_issuer_fences']);
+    const grantLink=await getRecord('readLink',{kind:'grant',preconnectionId:id},false),relation=await getRecord('readPreconnectionConnection',{preconnectionId:id},false);
+    if(!schema){if(i||grantLink||relation)fail();return {schema:null};}
+    fields(schema,['type','name','sql']);const normalized=x=>typeof x==='string'?x.replace(/\s+/g,' ').trim().replace(/;$/,''):null;
+    if(schema.type!=='table'||schema.name!=='finite_preparation_issuer_fences'||normalized(schema.sql)!==normalized(FINITE_PREPARATION_ISSUER_SCHEMA[0]))fail();
+    const fence=await select('SELECT preconnection_id,authorization_hash,grant_id,enrollment_hash,identity_hash,reserved_at,forward_until,cleanup_until,fence_request_id,fenced_at FROM finite_preparation_issuer_fences WHERE preconnection_id=?',[id]);
+    if(!i){if(fence||grantLink||relation)fail();return {schema,fence,grantLink,relation};}
+    if(!receipt||!enrollment||!ack||i.preconnectionId!==id||i.enrollmentHash!==enrollment.recordHash||i.capsuleHash!==capsule.capsuleHash||i.sourceRevision!==capsule.sourceRevision||i.qaVersionId!==qaVersionId||i.actorId!==actorId||i.subject!==p.subject||i.accessRealmHash!==data.preconnection.owner.accessRealmHash||i.projectId!==p.project.projectId||i.projectRevision!==p.project.revision||i.clientId!==p.clientId||i.resource!==p.resource||i.I0!==capsule.I0||i.C0!==capsule.C0||i.C1!==capsule.C1||i.reservedAt<ack.acknowledgedAt||i.reservedAt>Date.now()||issuer.reservation.issuedAt>Date.now()||Date.parse(i.consentExpiresAt)>data.preconnection.expiresAt)fail();
+
+    for(const v of Object.values(issuer.operations)){
+     if(v.ack&&!v.send||v.ack?.observedAt>Date.now())fail();
+    }
+    const ops=issuer.operations,expectedFence={preconnection_id:id,authorization_hash:i.authorizationHash,grant_id:i.grantId,enrollment_hash:i.enrollmentHash,identity_hash:i.identityHash,reserved_at:i.reservedAt,forward_until:i.C0,cleanup_until:i.C1,fence_request_id:null,fenced_at:null};
+    if(fence&&(canonical({...fence,fence_request_id:null,fenced_at:null})!==canonical(expectedFence)||fence?.fenced_at!==null&&fence&&(!issuer.operations.close_fence.send||fence.fence_request_id!==issuer.operations.close_fence.send.requestId||fence.fenced_at<issuer.operations.close_fence.send.issuedAt||fence.fenced_at>=issuer.operations.close_fence.send.deadline)))fail();
+    const consent=await select('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=?',[i.authorizationHash]);
+    const grant=await select('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?',[i.grantId]);
+    const authorization=await getRecord('readAuthorizationLink',{authorizationHash:i.authorizationHash},false);
+    const rowAck=(op,row)=>{const v=ops[op];if(!v.send){if(row)fail();return;}if(!v.ack)return;if(v.ack.outcome==='no_mutation'){if(v.ack.rowHash!==null||row)fail();return;}if(!row||v.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',row))fail();};
+    rowAck('open_fence',fence?{...fence,fence_request_id:null,fenced_at:null}:null);
+    if(!fence&&(consent||grant||authorization||grantLink||relation||ops.authorization.send||ops.consume.send||ops.grant.send))fail();
+    if(consent){
+     const expected={handle_hash:i.authorizationHash,user_id:i.subject,kind:'authorize',project_id:i.projectId,client_id:i.clientId,resource:i.resource,scopes_json:JSON.stringify(i.requestedScopes),expires_at:i.consentExpiresAt,consumed_at:consent.consumed_at};
+     if(canonical(consent)!==canonical(expected)||consent.consumed_at!==''&&(!iso(consent.consumed_at)||Date.parse(consent.consumed_at)<i.reservedAt||Date.parse(consent.consumed_at)>Date.now()||Date.parse(consent.consumed_at)>=Date.parse(consent.expires_at)))fail();
+    }
+    rowAck('authorization',consent?{...consent,consumed_at:''}:null);
+    rowAck('consume',consent?.consumed_at?consent:null);
+    if(authorization){
+     if(!consent||authorization.preconnectionId!==id||authorization.authorizationHash!==i.authorizationHash||authorization.subjectHash!==data.ticket.subjectHash||authorization.sourceRevision!==source.sourceRevision||authorization.projectRef!==data.ticket.projectRef||authorization.clientId!==i.clientId||authorization.resource!==i.resource||authorization.issuedAt<i.reservedAt||authorization.issuedAt>Date.now()||authorization.expiresAt>Math.min(data.preconnection.expiresAt,Date.parse(consent.expires_at)))fail();
+    }
+    if(grant){
+     let scopes;try{scopes=JSON.parse(grant.scopes_json);}catch{fail();}
+     if(!consent?.consumed_at||!authorization||grant.id!==i.grantId||grant.user_id!==i.subject||grant.client_id!==i.clientId||grant.project_id!==i.projectId||grant.resource!==i.resource||!Array.isArray(scopes)||scopes[0]!=='afw:project:read'||new Set(scopes).size!==scopes.length||scopes.some(s=>!i.requestedScopes.includes(s))||JSON.stringify(scopes)!==grant.scopes_json||grant.revoked_at!==''&&(!iso(grant.revoked_at)||Date.parse(grant.revoked_at)<Date.parse(grant.created_at)||Date.parse(grant.revoked_at)>Date.now())||!iso(grant.created_at)||!iso(grant.expires_at)||grant.exchanged_at!==''&&(!iso(grant.exchanged_at)||Date.parse(grant.exchanged_at)>Date.now()||Date.parse(grant.exchanged_at)<Date.parse(grant.created_at)||Date.parse(grant.exchanged_at)>=Date.parse(grant.expires_at))||Date.parse(grant.created_at)<Date.parse(consent.consumed_at)||Date.parse(grant.created_at)>Date.now()||Date.parse(grant.expires_at)>Math.min(i.C0,Date.parse(consent.expires_at),data.preconnection.expiresAt))fail();
+
+    }
+    rowAck('grant',grant?{...grant,exchanged_at:'',revoked_at:''}:grant);
+    if(grantLink){
+     if(!grant||!authorization||grantLink.preconnectionId!==id||grantLink.authorizationHash!==i.authorizationHash||grantLink.grantId!==i.grantId||grantLink.grantHash!==sha(i.grantId)||grantLink.acceptedAt<Date.parse(grant.created_at)||grantLink.acceptedAt>Date.now())fail();
+    }
+    let connection=null;
+    if(relation){
+     if(!grantLink||relation.preconnectionId!==id||relation.grantHash!==grantLink.grantHash||relation.linkedAt<grantLink.acceptedAt||relation.linkedAt>Date.now())fail();
+     connection=await getRecord('readConnectionRef',{connectionRef:relation.connectionRef});
+     if(connection.connectionRef!==relation.connectionRef||connection.subject!==i.subject||connection.grantId!==i.grantId||connection.clientId!==i.clientId||connection.projectId!==i.projectId||connection.resource!==i.resource||connection.issuedAt!==relation.linkedAt||connection.expiresAt>Math.min(data.preconnection.expiresAt,data.preconnection.owner.accessExpiresAt,Date.parse(grant.expires_at)))fail();
+    }
+    return {schema,fence,consent,grant,authorization,grantLink,relation,connection};
+   };
+   const noticePrimary=async(f,data,issuerFacts)=>{
+    const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity;
+    if(n.freeze)fail(); // Future notice cleanup is not part of this unit.
+    const objects=await selectAll("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8",[],8);
+    if(objects.length!==0&&objects.length!==7)fail();
+    const empty={schema:null,tickets:[],events:[]};
+    if(!objects.length){if(r)fail();return empty;}
+    const normalize=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
+    for(const row of objects)fields(row,['type','name','tbl_name','sql']);
+    for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
+     const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/),table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
+     if(!objects.some(row=>row.type===kind.toLowerCase()&&row.name===name&&row.tbl_name===table&&typeof row.sql==='string'&&normalize(row.sql)===normalize(def)))fail();
+    }
+    const schema={objects};
+    if(!i){if(r)fail();return {...empty,schema};}
+    const tickets=await selectAll('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2',[i.grantId],2);
+    let events=await selectAll('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3',[i.grantId],3);
+    if(tickets.length>=2||events.length>2)fail();
+    const withdrawals=events.filter(e=>e.action==='revoke');
+    if(withdrawals.length>1)fail();
+    const grants=events.filter(e=>e.action==='grant');if(grants.length>1||withdrawals.length&&!grants.length)fail();
+    for(const e of withdrawals)if(!i||e.grant_id!==i.grantId||e.project_id!==i.projectId||e.user_id!==i.subject||e.client_id!==i.clientId||e.resource!==i.resource||e.revision!==i.projectRevision||e.purpose!=='afw.dossier-monitoring.v1'||!Number.isSafeInteger(e.issued_at)||e.issued_at!==e.expires_at||e.issued_at<Date.parse(issuerFacts.grant?.created_at)||e.issued_at>Date.now()||e.sequence<=grants[0].sequence)fail();
+    const allEvents=events;events=grants;
+    if(!r){if(tickets.length||events.length)fail();return {schema,tickets,events};}
+    const grant=issuerFacts.grant,ops=f.issuer.operations,sdk=f.sdk;
+    if(!grant||!issuerFacts.authorization||!issuerFacts.grantLink||!issuerFacts.relation||!issuerFacts.connection||!data.preconnection||!data.approval||!sdk.root||!sdk.grant||!['sdk_begin','sdk_approve','sdk_complete'].every(op=>sdk.operations[op].send&&sdk.operations[op].observed)||!ops.grant.ack||ops.grant.ack.outcome!=='applied')fail();
+    for(const [name,op]of Object.entries(ops))if(!['close_fence','revoke_grant'].includes(name)&&(op.send&&!op.ack||op.ack&&!op.send))fail();
+    const expectedGrant={scopes:JSON.parse(grant.scopes_json),createdAt:grant.created_at,expiresAt:grant.expires_at};
+    const t=r.ticket,ceil=Math.min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,issuerFacts.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(grant.expires_at));
+    if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil)fail();
+
+    const {send,ack}=n.operations.ticket;
+    if(send?.issuedAt>Date.now()||ack?.observedAt>Date.now())fail();
+    const row=expectedNoticeTicket(i,t);
+    if(tickets.some(v=>canonical(v)!==canonical(row)))fail();
+    if(!send&&tickets.length)fail();
+    if(ack?.outcome==='applied'&&(tickets.length!==1||ack.sequence!==null||ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',tickets[0])))fail();
+    if(ack?.outcome==='no_mutation'&&(tickets.length||ack.rowHash!==null||ack.sequence!==null))fail();
+    const consent=n.operations.consent;
+    if(!consent.send){if(consent.ack||events.length)fail();}
+    else{
+     if(ack?.outcome!=='applied'||tickets.length!==1||consent.send.issuedAt>Date.now()||consent.ack?.observedAt>Date.now())fail();
+     for(const event of events)qualifyNoticeConsentEvent(event,i,t,consent.send);
+     if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();
+     if(consent.ack?.outcome==='no_mutation'&&(events.length||consent.ack.rowHash!==null||consent.ack.sequence!==null))fail();
+    }
+    return {schema,tickets,events,withdrawals,allEvents};
+   };
+   const qualify=async(f,actual)=>{
+    const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),id=capsule.preconnectionId,prefix='connection-preparation:'+id+':';
+    const getRecord=async(method,arg,required=true)=>{const v=await child(l=>store[method](arg,l));if(v.status==='absent'&&!required)return null;if(v.status!=='observed')fail();return v.record;};
+    const data={};
+    if(f.inventory.size){
+     data.sourceSnapshot=await getRecord('readOwnerSourceSnapshot',{preconnectionId:id});
+     if(data.sourceSnapshot.preconnectionId!==id||canonical(data.sourceSnapshot.source)!==canonical(source))fail();
+     data.ticket=await getRecord('readTicket',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
+     if(!data.ticket){
+      data.ticketUse=await getRecord('readTicketUse',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
+      data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
+      if(data.ticketUse||data.preconnection||f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
+     }else{
+     data.projectRef=await getRecord('readProjectRef',{projectRef:data.ticket.projectRef});
+     const t=data.ticket,map=data.projectRef,realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:p.subject});
+     if(t.ticketHash!==data.sourceSnapshot.initialTicketHash||t.preconnectionId!==id||t.sourceRevision!==source.sourceRevision||t.action!=='connection'||t.connectionRef!==null||t.subjectHash!==subject||map.preconnectionId!==id||map.projectRef!==t.projectRef||map.sourceRevision!==source.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||t.expiresAt>map.expiresAt||t.createdAt<source.window.startedAt||t.createdAt>Date.now()||map.issuedAt<source.window.startedAt||map.issuedAt>t.createdAt||map.expiresAt>capsule.C0||t.expiresAt>capsule.C0)fail();
+     data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash},false);
+     data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
+     if(data.preconnection){
+      data.stageApproval=await getRecord('readStageApproval',{preconnectionId:id,stage:'connection'},false);
+      data.approval=await getRecord('readConfigurationApproval',{approvalHash:data.preconnection.approvalHash});
+      data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash});
+      const pre=data.preconnection,sa=data.stageApproval,a=data.approval,use=data.ticketUse;
+      if(!use)fail();
+      const decision=evidence('decision',{ticket:t,decision:'approve',projectHash:a.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:a.approvedAt,expiresAt:a.expiresAt});
+      if(pre.preconnectionId!==id||pre.sourceRevision!==source.sourceRevision||pre.actorId!==actorId||pre.owner.subject!==p.subject||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||canonical(pre.project)!==canonical(source.project)||pre.baselineHash!==evidence('baseline',source.initialBaseline)||pre.startedAt<capsule.I0||pre.expiresAt>capsule.C0||(sa&&(sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!=='connection'||sa.ticketHash!==t.ticketHash||sa.approvalHash!==pre.approvalHash))||pre.approvalHash!==prepHash('ConfigurationApproval',a)||a.subjectHash!==subject||a.sourceRevision!==source.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(source.project)||a.csrfReceiptHash!==decision||use.ticketHash!==t.ticketHash||use.recordHash!==decision||use.consumedAt<a.approvedAt||use.consumedAt>Date.now()||a.approvedAt<pre.startedAt||a.approvedAt<t.createdAt||a.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,t.expiresAt,capsule.C0))fail();
+
+     }else if(f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
+     }
+    }else if(f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
+    let enrollment=null,ack=null;
+    if(f.enrollment.size){
+     enrollment=enrollmentRecord('Enrollment',f.enrollment.get('afw.finite-preparation-cleanup.v1:enrollment'));
+     ack=f.enrollment.has('afw.finite-preparation-cleanup.v1:ack')?enrollmentRecord('Ack',f.enrollment.get('afw.finite-preparation-cleanup.v1:ack')):null;
+     qualifyFinitePreparationEnrollmentFacts({anchors:f.a,enrollment,ack,...data});
+    }
+    let receipt=null;
+    if(f.effects.size){
+     if(!enrollment||!ack||!data.preconnection||!data.stageApproval)fail();
+     const identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'},up=effectIdentity({...identity,effect:'upload'}),activationId=effectIdentity({...identity,effect:'activation'});
+     const allowed=['writer-head',...['send','ack'].map(s=>up+':'+s),...['send','ack','receipt'].map(s=>activationId+':'+s)].map(s=>'afw.finite-policy-effect.v1:'+s);
+
+     if([...f.effects.keys()].some(k=>!allowed.includes(k)))fail();
+     const upload=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'upload'},now:Date.now}).read(l)),activation=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'activation'},now:Date.now}).read(l));
+     const contextHash=digest('afw.finite-connection-context.v1',{preconnection:data.preconnection,stageApproval:data.stageApproval,predecessors:[],grant:null,notice:null});
+     const historical=(journal,effect)=>{
+      if(!['absent','issued','acknowledged','installed'].includes(journal.state)||journal.receipt&&effect!=='activation')fail();
+      if(!journal.send){if(journal.state!=='absent'||journal.ack||journal.receipt)fail();return;}
+      const s=journal.send,a=journal.ack,pre=data.preconnection,approval=data.approval;
+      if(s.preconnectionId!==id||s.sourceRevision!==source.sourceRevision||s.stage!=='connection'||s.effect!==effect||s.contextHash!==contextHash||s.baselineVersionId!==capsule.activatedVersionId||s.baselineDeploymentId!==capsule.activatedDeploymentId||s.issuedAt<Math.max(ack.acknowledgedAt,approval.approvedAt,data.ticketUse.consumedAt)||s.issuedAt>Date.now()||s.deadline>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt,capsule.C0)||s.deadline-s.issuedAt>5000||a&&(a.sendHash!==prepHash('ConnectionSend',s)||a.acknowledgedAt<s.issuedAt||a.acknowledgedAt>=s.deadline||a.acknowledgedAt>Date.now()))fail();
+     };
+     historical(upload,'upload');historical(activation,'activation');
+     if(!upload.send||upload.receipt||activation.send&&(!upload.ack||activation.send.issuedAt<upload.ack.acknowledgedAt)||activation.ack&&!activation.send)fail();
+     const last=activation.send??upload.send,lastId=activation.send?activationId:up,expectedRows=1+(upload.send?1:0)+(upload.ack?1:0)+(activation.send?1:0)+(activation.ack?1:0)+(activation.receipt?1:0);
+     if(f.effects.size!==expectedRows||f.effects.get('afw.finite-policy-effect.v1:writer-head')!==JSON.stringify({identityHash:lastId,sendHash:prepHash('ConnectionSend',last)}))fail();
+     const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+     if(activation.ack){
+      if(upload.ack.resourceId===capsule.activatedVersionId||activation.ack.resourceId===capsule.activatedDeploymentId||!actual.isRestored&&(actual.pointer.versionId!==upload.ack.resourceId||actual.pointer.deploymentId!==activation.ack.resourceId||canonical(actual.currentConfiguration)!==canonical(expected)))fail();
+      if(!actual.isRestored)qualifyFiniteConnectionProfile({phase:'read_consent',metadata:actual.currentConfiguration});
+      const activationBody={strategy:'percentage',versions:[{version_id:upload.ack.resourceId,percentage:100}]};
+      if(activation.send.requestHash!==digest('afw.finite-policy-request.v1',{method:'POST',path:CF+'/workers/scripts/'+CANARY+'/deployments',body:activationBody,baselineVersionId:capsule.activatedVersionId,baselineDeploymentId:capsule.activatedDeploymentId})||!actual.isRestored&&Object.hasOwn(actual.deployment,'annotations'))fail();
+     }else if(!actual.isRestored){
+      const initial=actual.pointer.versionId===capsule.activatedVersionId&&actual.pointer.deploymentId===capsule.activatedDeploymentId&&canonical(actual.currentConfiguration)===canonical(plan.configuration);
+      const target=activation.send&&upload.ack&&actual.pointer.versionId===upload.ack.resourceId&&canonical(actual.currentConfiguration)===canonical(expected)&&!Object.hasOwn(actual.deployment,'annotations')&&activation.send.requestHash===digest('afw.finite-policy-request.v1',{method:'POST',path:CF+'/workers/scripts/'+CANARY+'/deployments',body:{strategy:'percentage',versions:[{version_id:upload.ack.resourceId,percentage:100}]},baselineVersionId:capsule.activatedVersionId,baselineDeploymentId:capsule.activatedDeploymentId});
+      if(!initial&&!target)fail(); // Target fact is not the missing activation ACK.
+     }
+     if(activation.receipt){
+      receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:activation.receipt.completedAt});
+      if(receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(expected))fail();
+     }
+    }else if(!actual.isRestored&&(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration)))fail();
+    if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
+    data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:id},false);
+    if(data.noticeLink?(f.inventory.get(prefix+'notice')!==prepEncode('NoticeLink',data.noticeLink)):f.inventory.has(prefix+'notice'))fail();
+    const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
+    if(f.sdk.root){
+     const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
+     if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
+     if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
+     if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
+     if(f.sdk.reference&&(!i||f.sdk.reference.correlationHash!==finiteOwnerSdkCleanupCorrelation({root:f.sdk.root,expectedGrant:g,completeSend:c.send,identity:i})||f.sdk.reference.observedAt>Date.now()))fail();
+     if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
+    }
+    const noticeFacts=await noticePrimary(f,data,issuerFacts);
+    qualifyNoticeLink(f,data,issuerFacts,noticeFacts);
+    return {receipt,data,enrollment,ack,issuerFacts,noticeFacts};
+   };
+
+   const qualified=await qualify(first,observed);
+   // A second native observation detects intervening drift; no snapshots are
+   // polled, and no observed record is synthesized from these factual reads.
+   const again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
+   const snapshot=(f,physical,q)=>({
+    sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
+    anchors:f.a,physical,preparation:q.data,installed:{receipt:q.receipt,enrollment:q.enrollment,ack:q.ack},
+    records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk,notice:f.notice},
+    issuerRows:q.issuerFacts,noticeRows:q.noticeFacts,originalFactsHash:digest('afw.finite-owner-cleanup-original-facts.v1',JSON.parse(f.anchor))
+   });
+   const before=snapshot(first,observed,qualified),after=snapshot(second,again,secondQualified);
+   if(canonical(before)!==canonical(after))fail();
+   life.guard();return frozen(after);
+}
+function noticeEventHash(row){
+ return evidence('event',{grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at});
+}
+function qualifyNoticeLink(f,data,rows,notice){
+ const link=data.noticeLink;if(!link)return;
+ const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity,send=n.operations.consent.send,ack=n.operations.consent.ack;
+ if(!i||!r||n.freeze||!data.preconnection||!data.approval||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||!f.sdk.root||!f.sdk.grant||!notice.schema||notice.tickets.length!==1||notice.events.length!==1||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||!send||ack?.outcome!=='applied')fail();
+ const row=notice.events[0],ceiling=Math.min(send.accessExpiresAt,r.accessExpiresAt,data.preconnection.owner.accessExpiresAt,data.preconnection.expiresAt,data.approval.expiresAt,rows.connection.expiresAt,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),r.ticket.permissionExpiresAt,i.C0);
+ qualifyNoticeConsentEvent(row,i,r.ticket,send);
+ if(link.preconnectionId!==i.preconnectionId||link.grantHash!==rows.grantLink.grantHash||link.grantHash!==sha(i.grantId)||link.sequence!==row.sequence||link.sequence!==ack.sequence||link.eventHash!==noticeEventHash(row)||link.acceptedAt<Math.max(ack.observedAt,row.issued_at,rows.grantLink.acceptedAt)||link.acceptedAt>=send.window.deadline||link.acceptedAt>=Math.min(ceiling,r.ticket.expiresAt)||link.acceptedAt>Date.now())fail();
+}
+function qualifyNoticeConsentEvent(row,i,t,send){
+ fields(row,['sequence','grant_id','project_id','user_id','client_id','resource','revision','action','purpose','request_id','issued_at','expires_at']);
+ if(!Number.isSafeInteger(row.sequence)||row.sequence<=0||!Number.isSafeInteger(row.issued_at)||row.issued_at<Math.max(send.window.startedAt,t.issuedAt,send.issuedAt)||row.issued_at>=Math.min(send.window.deadline,t.permissionExpiresAt)||row.issued_at>Date.now())fail();
+ const expected={sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,issued_at:row.issued_at,expires_at:t.permissionExpiresAt};
+ if(canonical(row)!==canonical(expected))fail();
+}
+function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
+
+const reductions=new WeakMap(),receipts=new WeakMap();
+const purpose=(kind,value)=>cleanupSeal(kind,{purpose:'afw.finite-owner-cleanup-'+kind.toLowerCase()+'.v1',...value});
+const issued=(kind,value)=>issuerSeal(kind,{purpose:'afw.finite-preparation-issuer-'+kind.toLowerCase()+'.v1',...value});
+function recorded(value){if(!['recorded','existing'].includes(value?.status))fail();return value;}
+function cleanupIdentity(s){
+ const a=s.anchors,c=a.capsule;
+ return purpose('Identity',{planHash:a.plan.recordHash,capsuleHash:c.capsuleHash,enrollmentHash:s.installed.enrollment.recordHash,preconnectionId:c.preconnectionId,sourceRevision:c.sourceRevision,qaVersionId:c.qaVersionId,actorId:a.actorId,I0:c.I0,C0:c.C0,C1:c.C1});
+}
+function sameCycle(a,b){if(a.preconnectionId!==b.preconnectionId||a.capsuleHash!==b.capsuleHash||canonical(a.anchors.plan)!==canonical(b.anchors.plan)||canonical(a.installed)!==canonical(b.installed))fail();}
+function expectedGrant(s){
+ const g=s.issuerRows.grant,e=s.records.sdk.grant;
+ if(g)return {scopes:JSON.parse(g.scopes_json),createdAt:g.created_at,expiresAt:g.expires_at};
+ if(e)return {scopes:e.scopes,createdAt:e.createdAt,expiresAt:e.expiresAt};
+ // No grant has been emitted. This value is only the bounded expected tuple
+ // for the fixed post-fence absence SELECT; it cannot authorize creation.
+ const i=s.records.issuer.reservation.identity;
+ return {scopes:i.requestedScopes,createdAt:new Date(i.reservedAt).toISOString(),expiresAt:i.consentExpiresAt};
+}
+export async function reducePrivateQaFiniteOwnerCleanup(options,originalLease){
+ const life=cleanupLifetime(options,originalLease),{ctx,env,child,guard}=life,s=await readPrivateQaFiniteOwnerCleanup(options,originalLease);
+ if(!s)return null;
+ const id=cleanupIdentity(s),key={preconnectionId:id.preconnectionId},journal=createFiniteOwnerCleanupJournal({ctx,env});
+ recorded(await child(l=>journal.appendIdentity(id,l)));
+ const ownJournal=await child(l=>journal.read(key,l)),issuer=s.records.issuer,i=issuer.reservation?.identity;
+ let fenceFact={status:'never_issued'},grantFact={status:'never_issued'},noticeFact={status:'never_issued'};
+ if(i){
+  const ij=createFinitePreparationIssuerJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
+  if(!issuer.freeze)recorded(await child(l=>ij.freeze({...key,record:issued('Freeze',{identityHash:i.identityHash,reservationHash:issuer.reservation.recordHash,frozenAt:Date.now()})},l)));
+  await child(async(l,end)=>{
+   const window=()=>({startedAt:Date.now(),deadline:Math.min(end,i.C1)}),ops=issuer.operations;
+   let close=ops.close_fence.send,barrier;
+   if(close){
+    barrier=await store.reconcileFence({identity:i,fenceRequestId:close.requestId,window:window()},l);
+    if(!ops.close_fence.ack){
+     recorded(await journal.appendReconciled({...key,record:purpose('Reconciled',{identityHash:id.recordHash,sendHash:close.recordHash,delivery:s.anchors.state.deliveries,factsHash:digest('afw.finite-owner-cleanup-reconciliation.v1',{barrier}),observedAt:Date.now()})},l));
+     fail(); // Factual reconciliation is never the lost SQL acknowledgement.
+    }
+    if(ops.close_fence.ack.outcome!=='applied'||ops.close_fence.ack.rowHash!==barrier.rowHash)fail();
+   }else{
+    close=issued('Send',{identityHash:i.identityHash,reservationHash:issuer.reservation.recordHash,operation:'close_fence',requestId:randomUUID(),requestHash:digest('afw.finite-owner-cleanup-fence-request.v1',{identityHash:i.identityHash}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
+    recorded(await ij.appendSend({...key,record:close},l));current(l);
+    const actual=retain(store.closeFence({identity:i,fenceRequestId:close.requestId,window:window()},l));barrier=await actual;current(l);
+    recorded(await ij.appendAck({...key,operation:'close_fence',record:issued('Ack',{sendHash:close.recordHash,rowHash:barrier.rowHash,outcome:'applied',observedAt:Date.now()})},l));
+   }
+   fenceFact=barrier;
+   const g=expectedGrant(s),observation=await store.observeGrant({identity:i,barrier,expectedGrant:g,window:window()},l);
+   if(ops.revoke_grant.send&&!ops.revoke_grant.ack)fail();
+   if(ops.revoke_grant.ack){
+    if(ops.revoke_grant.ack.outcome!=='applied'||!observation.row||!observation.row.revoked_at||ops.revoke_grant.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',observation.row))fail();
+    grantFact={status:'historical_normal',row:observation.row};
+   }else if(observation.status==='absent')grantFact={status:'absent_after_terminal_fence',barrierHash:barrier.rowHash};
+   else if(observation.row.revoked_at!=='')grantFact={status:'already_revoked',row:observation.row};
+   else{
+    const send=issued('Send',{identityHash:i.identityHash,reservationHash:issuer.reservation.recordHash,operation:'revoke_grant',requestId:randomUUID(),requestHash:digest('afw.finite-owner-cleanup-grant-request.v1',{identityHash:i.identityHash,barrierHash:barrier.rowHash,expectedGrant:g}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
+    recorded(await ij.appendSend({...key,record:send},l));current(l);
+    const actual=retain(store.revokeGrant({identity:i,barrier,observation,window:window()},l));grantFact=await actual;current(l);
+    if(!['revoked','already_revoked'].includes(grantFact.status)||!grantFact.row?.revoked_at)fail();
+    recorded(await ij.appendAck({...key,operation:'revoke_grant',record:issued('Ack',{sendHash:send.recordHash,rowHash:digest('afw.finite-preparation-issuer-row.v1',grantFact.row),outcome:'applied',observedAt:Date.now()})},l));
+   }
+   const consent=s.noticeRows.events[0],op=ownJournal.operations.monitoring_revoke;
+   if(op.send&&!op.observed)fail();
+   if(consent){
+    if(!observation.row)fail();
+    if(op.observed){
+     const withdrawn=s.noticeRows.withdrawals?.[0];
+     if(!withdrawn||op.observed.resultHash!==digest('afw.finite-owner-cleanup-monitoring-result.v1',{status:op.observed.outcome,row:withdrawn}))fail();
+     noticeFact={status:'historical_normal',row:withdrawn};
+    }else{
+     const requestId=randomUUID(),send=purpose('Send',{identityHash:id.recordHash,operation:'monitoring_revoke',requestId,requestHash:digest('afw.finite-owner-cleanup-monitoring-request.v1',{identityHash:i.identityHash,barrierHash:barrier.rowHash,expectedGrant:g,expectedConsent:consent,requestId}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
+     recorded(await journal.appendSend({...key,record:send},l));current(l);
+     const actual=retain(store.insertMonitoringRevocation({identity:i,barrier,expectedGrant:g,expectedConsent:consent,requestId,window:window()},l));noticeFact=await actual;current(l);
+     if(!['applied','already_withdrawn'].includes(noticeFact.status))fail();
+     recorded(await journal.appendObserved({...key,operation:'monitoring_revoke',record:purpose('Observed',{sendHash:send.recordHash,resultHash:digest('afw.finite-owner-cleanup-monitoring-result.v1',noticeFact),outcome:noticeFact.status,observedAt:Date.now()})},l));
+    }
+   }else{if(op.send)fail();noticeFact={status:'no_original_consent',barrierHash:barrier.rowHash};}
+  });
+ }
+ guard();
+ const opaque=Object.freeze({});
+ reductions.set(opaque,{options,ctx,env,originalLease,s,id,fenceFact,grantFact,noticeFact,guard,state:'beforeRestore'});
+ return opaque;
+}
+function reductionKv(alias,methods,subject,id,guard){
+ const grant='grant:'+subject+':'+id,prefix='token:'+subject+':'+id+':',queue=[];
+ let active=0,lists=0,deletes=0,gets=0,nextCursor,failed=null,peak=0;
+ const stop=error=>{failed??=error;for(const q of queue.splice(0))q.reject(failed);};
+ const check=()=>{if(failed)throw failed;guard();};
+ const pump=()=>{
+  while(active<2&&queue.length){
+   try{check();}catch(error){stop(error);return;}
+   const q=queue.shift();active++;peak=Math.max(peak,active);
+   const actual=retain(Promise.resolve().then(()=>{check();return retain(Reflect.apply(methods[q.method],alias,q.args));}));
+   actual.then(value=>{
+    try{check();
+     if(q.method==='list'){
+      if(!value||!Array.isArray(value.keys)||value.keys.length>100||typeof value.list_complete!=='boolean'||value.keys.some(k=>typeof k?.name!=='string'||!k.name.startsWith(prefix))||!value.list_complete&&(typeof value.cursor!=='string'||!value.cursor||value.cursor.length>2048))fail();
+      nextCursor=value.list_complete?undefined:value.cursor;
+     }
+     q.resolve(value);
+    }catch(error){stop(error);q.reject(error);}
+   },error=>{stop(error);q.reject(error);}).finally(()=>{active--;pump();}).catch(()=>{});
+  }
+ };
+ const enqueue=(method,args)=>{
+  try{
+   check();
+   if(method==='list'){
+    const v=own(args[0]);fields(v,['prefix',...Object.hasOwn(v,'limit')?['limit']:[],...Object.hasOwn(v,'cursor')?['cursor']:[]]);
+    if(v.prefix!==prefix||Object.hasOwn(v,'limit')&&v.limit!==100||v.cursor!==nextCursor||lists>=2)fail();lists++;args=[{...v,limit:100}];
+   }else if(method==='delete'){
+    if(typeof args[0]!=='string'||!(args[0]===grant||args[0].startsWith(prefix))||deletes>=200)fail();deletes++;
+   }else{
+    if(args[0]!==grant||canonical(own(args[1]))!==canonical({type:'json'})||gets>=1)fail();gets++;
+   }
+   return retain(new Promise((resolve,reject)=>{queue.push({method,args,resolve,reject});pump();}));
+  }catch(error){stop(error);return Promise.reject(error);}
+ };
+ return {facet:Object.freeze({list:v=>enqueue('list',[v]),get:(k,v)=>enqueue('get',[k,v]),delete:k=>enqueue('delete',[k])}),facts:()=>({lists,deletes,gets,peak,active,queued:queue.length,failed:failed!==null})};
+}
+function closedFacts(s){
+ const i=s.records.issuer.reservation?.identity;
+ if(i){
+  const row=s.issuerRows.fence;
+  if(!row?.fenced_at||!row.fence_request_id||s.issuerRows.grant&&!s.issuerRows.grant.revoked_at)fail();
+  for(const op of ['close_fence','revoke_grant']){const v=s.records.issuer.operations[op];if(v.send&&!v.ack)fail();}
+  if(s.noticeRows.events.length&&s.noticeRows.withdrawals?.length!==1)fail();
+ }
+ if(!s.physical.isRestored||!s.anchors.records['restore-send']||!s.anchors.records['restore-ack'])fail();
+}
+export async function finishPrivateQaFiniteOwnerCleanup(options,reduction,originalLease){
+ const r=reductions.get(reduction);
+ if(!r||r.state!=='beforeRestore'||r.ctx!==options.ctx||r.env!==options.env||r.originalLease!==originalLease)fail();
+ r.state='finishing';r.guard();
+ const life=cleanupLifetime(options,originalLease),{ctx,env,child}=life,s=await readPrivateQaFiniteOwnerCleanup(options,originalLease);
+ if(!s)fail();sameCycle(r.s,s);closedFacts(s);
+ const journal=createFiniteOwnerCleanupJournal({ctx,env}),key={preconnectionId:r.id.preconnectionId},j=await child(l=>journal.read(key,l));
+ if(canonical(j.identity)!==canonical(r.id))fail();
+ const sdk=s.records.sdk,i=s.records.issuer.reservation?.identity,op=j.operations.sdk_revoke;
+ if(op.send&&!op.observed)fail();
+ let sdkFact={status:'never_issued'};
+ if(sdk.operations.sdk_complete.send){
+  if(!i||!sdk.root||!sdk.grant)fail();
+  let selector=sdk.reference?.sdkGrantId;
+  if(!selector){
+   // Missing Reference is not absence of a grant. Search only bounded original
+   // metadata correlation; an expired/missing result cannot become an ACK.
+   selector=await child(async l=>{
+    const check=()=>{life.guard();current(l);},facet=readonlyGrantKv(life.alias,life.methods,i.subject,check);
+    const api=new OAuthAuthorizationServer({issuer:s.sourceBase.origin,resources:[i.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:facet}));
+    const correlationHash=finiteOwnerSdkCleanupCorrelation({root:sdk.root,expectedGrant:sdk.grant,completeSend:sdk.operations.sdk_complete.send,identity:i});
+    let cursor,found;
+    do{
+     const result=await retain(api.listUserGrants(i.subject,{limit:100,...cursor===undefined?{}:{cursor}}));check();
+     if(!result||!Array.isArray(result.items)||result.items.length>100)fail();
+     for(const v of result.items)if(canonical(v.metadata)===canonical({afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}})){
+      if(found||typeof v.id!=='string'||!/^[A-Za-z0-9_-]{16}$/.test(v.id)||v.userId!==i.subject||v.clientId!==i.clientId||v.resource!==i.resource||canonical(v.scope)!==canonical(sdk.grant.scopes)||!Number.isSafeInteger(v.createdAt)||v.createdAt<Math.floor(sdk.operations.sdk_complete.send.issuedAt/1000)||v.createdAt*1000>=sdk.operations.sdk_complete.send.deadline)fail();found=v.id;
+     }cursor=result.cursor;
+    }while(cursor!==undefined);
+    if(!found)fail();return found;
+   });
+  }
+  if(op.observed){if(op.observed.outcome!=='returned')fail();sdkFact={status:'historical_normal',sendHash:op.send.recordHash,observedHash:op.observed.recordHash};}
+  else await child(async(l,end)=>{
+   const check=()=>{life.guard();current(l);},bounded=reductionKv(life.alias,life.methods,i.subject,selector,check);
+   const send=purpose('Send',{identityHash:r.id.recordHash,operation:'sdk_revoke',requestId:randomUUID(),requestHash:digest('afw.finite-owner-cleanup-sdk-request.v1',{identityHash:i.identityHash,selector,subject:i.subject,correlationHash:finiteOwnerSdkCleanupCorrelation({root:sdk.root,expectedGrant:sdk.grant,completeSend:sdk.operations.sdk_complete.send,identity:i})}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
+   recorded(await journal.appendSend({...key,record:send},l));check();
+   const api=new OAuthAuthorizationServer({issuer:s.sourceBase.origin,resources:[i.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:bounded.facet}));
+   const actual=retain(api.revokeGrant(selector,i.subject));await actual;check();
+   const metrics=bounded.facts();if(metrics.active||metrics.queued||metrics.failed)fail();
+   sdkFact={status:'returned',selectorHash:sha(selector),metrics};
+   const observed=purpose('Observed',{sendHash:send.recordHash,resultHash:digest('afw.finite-owner-cleanup-sdk-result.v1',sdkFact),outcome:'returned',observedAt:Date.now()});
+   recorded(await journal.appendObserved({...key,operation:'sdk_revoke',record:observed},l));
+  });
+ }else if(op.send)fail();
+ const final=await readPrivateQaFiniteOwnerCleanup(options,originalLease);sameCycle(s,final);closedFacts(final);
+ const finalJournal=await child(l=>journal.read(key,l));
+ for(const op of Object.values(finalJournal.operations))if(op.send&&!op.observed)fail();
+ const rs=final.anchors.records['restore-send'],ra=final.anchors.records['restore-ack'];
+ const record=finalJournal.receipt??purpose('Receipt',{identityHash:r.id.recordHash,planHash:r.id.planHash,fenceHash:digest('afw.finite-owner-cleanup-fence-facts.v1',r.fenceFact),grantFactHash:digest('afw.finite-owner-cleanup-grant-facts.v1',r.grantFact),noticeFactHash:digest('afw.finite-owner-cleanup-notice-facts.v1',r.noticeFact),sdkSendHash:finalJournal.operations.sdk_revoke.send?.recordHash??null,sdkObservedHash:finalJournal.operations.sdk_revoke.observed?.recordHash??null,restoreSendHash:rs.recordHash,restoreAckHash:ra.recordHash,baselineVersionId:final.anchors.plan.baselineVersionId,baselineDeploymentId:ra.deploymentId,finalFactsHash:digest('afw.finite-owner-cleanup-final-facts.v1',{final,sdkFact,observedAt:Date.now()}),observedAt:Date.now(),businessAccessClosed:true,sdkReductionReturned:!!sdk.operations.sdk_complete.send,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
+ if(record.identityHash!==r.id.recordHash||record.planHash!==r.id.planHash||record.restoreSendHash!==rs.recordHash||record.restoreAckHash!==ra.recordHash||record.baselineVersionId!==final.anchors.plan.baselineVersionId||record.baselineDeploymentId!==ra.deploymentId||record.sdkSendHash!==(finalJournal.operations.sdk_revoke.send?.recordHash??null)||record.sdkObservedHash!==(finalJournal.operations.sdk_revoke.observed?.recordHash??null)||record.sdkReductionReturned!==!!sdk.operations.sdk_complete.send)fail();
+ if(!finalJournal.receipt)recorded(await child(l=>journal.finish({...key,record},l)));
+ const readback=await child(l=>journal.read(key,l));if(canonical(readback.receipt)!==canonical(record))fail();
+ life.guard();r.state='finished';const opaque=Object.freeze({});
+ receipts.set(opaque,{ctx,env,originalLease,guard:r.guard,record,consumed:false});return opaque;
+}
+export function consumePrivateQaFiniteOwnerCleanup(receipt,{ctx,env},originalLease){
+ const r=receipts.get(receipt);if(!r||r.consumed||r.ctx!==ctx||r.env!==env||r.originalLease!==originalLease)fail();r.guard();r.consumed=true;
+ return frozen({status:'CURRENT_CYCLE_BUSINESS_CLOSED',record:r.record,operationalReadiness:false});
+}
`````

### lib/mcp-qa-finite-preparation-issuer-store.mjs

`````diff
diff --git a/lib/mcp-qa-finite-preparation-issuer-store.mjs b/lib/mcp-qa-finite-preparation-issuer-store.mjs
--- a/lib/mcp-qa-finite-preparation-issuer-store.mjs
+++ b/lib/mcp-qa-finite-preparation-issuer-store.mjs
@@ -203,20 +203,54 @@
     check(!monitoringFailed.has(id)&&!noticeAttempts.has(id));fact.used=true;noticeAttempts.add(id);
     const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
     const row=await query(monitoringCte+"INSERT INTO dossier_monitoring_consent_events ("+eventColumns.slice(1).join(',')+") SELECT q.grant_id,q.project,q.subject,q.client,q.resource,q.revision,'grant','afw.dossier-monitoring.v1',q.request,n.ms,q.permission"+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive+' RETURNING '+eventColumns.join(','),monitoringValues(d,t),g);
     g();if(!row)return Object.freeze({status:'no_mutation'});
     check(Number.isSafeInteger(row.sequence)&&row.sequence>0&&issuerTime(row.issued_at)&&row.issued_at>=Math.max(d.window.startedAt,t.issuedAt)&&row.issued_at<Math.min(d.window.deadline,t.permissionExpiresAt));
     const i=d.identity,expected={grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,expires_at:t.permissionExpiresAt};
     return Object.freeze({status:'applied',row:monitoringRow(row,expected,eventColumns)});
    }catch{if(id)monitoringFailed.add(id);fail();}
   },
 
+  async insertMonitoringRevocation(options,lease){
+   // Terminal cleanup uses the existing same-store barrier witness. Expired
+   // permission is historical input, never renewed authorization.
+   let id;
+   try{
+    check(arguments.length===2);
+    const {identity:i,window:w,expectedGrant,expectedConsent:e,requestId}=input(options,['identity','barrier','expectedGrant','expectedConsent','requestId','window']);
+    id=i.identityHash;cleanup(i,w);grantData(expectedGrant,i);
+    check(issuerUuid(requestId)&&!monitoringFailed.has(id)&&!noticeAttempts.has('cleanup:'+id));
+    const b=witness(barriers,options.barrier,i,lease),g=monitoringGuard(id,lease);
+    fields(e,eventColumns);
+    check(Number.isSafeInteger(e.sequence)&&e.sequence>0&&e.grant_id===i.grantId&&e.project_id===i.projectId&&e.user_id===i.subject&&e.client_id===i.clientId&&e.resource===i.resource&&e.revision===i.projectRevision&&e.action==='grant'&&e.purpose==='afw.dossier-monitoring.v1'&&issuerUuid(e.request_id)&&issuerTime(e.issued_at)&&issuerTime(e.expires_at)&&e.issued_at>=Date.parse(expectedGrant.createdAt)&&e.issued_at<e.expires_at&&e.expires_at<=Math.min(i.C0,Date.parse(expectedGrant.expiresAt))&&e.expires_at-e.issued_at<=600000);
+    g();await monitoringPreflight(g);await readBarrier(i,b.row.fence_request_id,w,g);
+    const eventMatch=eventColumns.map(k=>'e.'+k+'=?').join(' AND ');
+    const grantMatch="g.id=q.grant_id AND g.user_id=q.subject AND g.project_id=q.project AND g.client_id=q.client AND g.resource=q.resource AND g.scopes_json=? AND g.created_at=? AND g.expires_at=? AND g.revoked_at<>'' AND "+canonicalIso('g.revoked_at');
+    const constraint=owner+' AND '+windowSql+' AND n.ms<q.cleanup_until AND EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fence_request_id=? AND f.fenced_at=?) AND EXISTS (SELECT 1 FROM delegated_access_grants g WHERE '+grantMatch+') AND EXISTS (SELECT 1 FROM dossier_monitoring_consent_events e WHERE '+eventMatch+')';
+    const args=[...values(i,w),b.row.fence_request_id,b.row.fenced_at,JSON.stringify(expectedGrant.scopes),expectedGrant.createdAt,expectedGrant.expiresAt,...eventColumns.map(k=>e[k])];
+    // New first-primary SELECT; preserve a legitimate later withdrawal.
+    const latest=await query(cte+'SELECT v.* FROM dossier_monitoring_consent_events v,q,n WHERE v.grant_id=q.grant_id AND '+constraint+' ORDER BY v.sequence DESC LIMIT 1',args,g);
+    if(!latest)return Object.freeze({status:'no_mutation'});
+    if(latest.sequence!==e.sequence){
+     check(latest.sequence>e.sequence&&latest.action==='revoke'&&latest.purpose===e.purpose&&latest.grant_id===i.grantId&&latest.project_id===i.projectId&&latest.user_id===i.subject&&latest.client_id===i.clientId&&latest.resource===i.resource&&latest.revision===i.projectRevision&&issuerUuid(latest.request_id)&&issuerTime(latest.issued_at)&&latest.issued_at>=e.issued_at&&latest.issued_at===latest.expires_at&&latest.issued_at<=Date.now());
+     return Object.freeze({status:'already_withdrawn',row:Object.freeze({...latest})});
+    }
+    check(canonical(latest)===canonical(e));noticeAttempts.add('cleanup:'+id);
+    const actual=await query(cte+"INSERT INTO dossier_monitoring_consent_events ("+eventColumns.slice(1).join(',')+") SELECT q.grant_id,q.project,q.subject,q.client,q.resource,q.revision,'revoke','afw.dossier-monitoring.v1',?,n.ms,n.ms FROM q,n WHERE "+constraint+' AND (SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id)=? RETURNING '+eventColumns.join(','),[...values(i,w),requestId,...args.slice(qcols.length),e.sequence],g);
+    if(!actual)return Object.freeze({status:'no_mutation'});
+    check(actual.sequence>e.sequence&&actual.request_id===requestId&&actual.action==='revoke'&&actual.issued_at===actual.expires_at&&actual.issued_at>=w.startedAt&&actual.issued_at<w.deadline);
+    const row=await query(cte+'SELECT v.* FROM dossier_monitoring_consent_events v,q,n WHERE v.grant_id=q.grant_id AND v.request_id=? AND '+constraint,[...values(i,w),requestId,...args.slice(qcols.length)],g);
+    check(row&&canonical(row)===canonical(actual));g();
+    return Object.freeze({status:'applied',row:Object.freeze({...actual})});
+   }catch{if(id)monitoringFailed.add(id);fail();}
+  },
+
   async openFence(options,lease){
    const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
    const row=await query(cte+'INSERT INTO '+T+' ('+columns.join(',')+') SELECT '+columns.map(k=>'q.'+k).join(',')+' FROM q,n WHERE '+owner+' AND '+live+' RETURNING *',values(i,w),g);
    return row?Object.freeze({status:'applied',row:exactFence(row,i,null,false)}):Object.freeze({status:'no_mutation'});
   },
   async insertAuthorization(options,lease){
    const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
    const row=await query(cte+"INSERT INTO delegated_consent_sessions ("+consentCols+") SELECT q.authorization_hash,q.subject,'authorize',q.project,q.client,q.resource,q.scopes,q.consent,'' FROM q,n WHERE "+owner+' AND '+fence+' AND '+live+' RETURNING *',values(i,w),g);
    return row?Object.freeze({status:'applied',row:Object.freeze({...row})}):Object.freeze({status:'no_mutation'});
   },
`````

### lib/mcp-qa-finite-stage-work.mjs

`````diff
diff --git a/lib/mcp-qa-finite-stage-work.mjs b/lib/mcp-qa-finite-stage-work.mjs
--- a/lib/mcp-qa-finite-stage-work.mjs
+++ b/lib/mcp-qa-finite-stage-work.mjs
@@ -93,10 +93,21 @@
 export function adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},operation){
  originalLease.assertCurrent();admission.lease.assertCurrent();
  if(originalLease.signal.aborted||admission.lease.signal.aborted||typeof operation!=='function')fail();
  const entry=outstanding.get(ctx);
  if(!entry)return observeFiniteOwnerStageWork({ctx,env,admission,originalLease},operation);
  const context=readFiniteOwnerRequestContext(originalLease);
  if(context.root!==originalLease||entry.mode!=='request'||scopes.getStore()!==entry||!matching(entry,ctx,env,originalLease))fail();
  entry.mode='owner';entry.admission=admission;
  return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
 }
+
+/** Original alarm lifetime only: exclusion and actual-promise bookkeeping.
+ * This scope grants no admission and accepts no fabricated business capability. */
+export function observeFiniteOwnerCleanupWork({ctx,env,originalLease},operation){
+ if(!ctx||!env||typeof operation!=='function'||outstanding.has(ctx))fail();
+ originalLease.assertCurrent();if(originalLease.signal.aborted)fail();
+ const entry={mode:'cleanup',ctx,env,storage:ctx.storage,db:env.RELEASE_DB,originalLease,promises:new Set(),release:null};
+ entry.release=()=>released(entry);outstanding.set(ctx,entry);
+ originalLease.signal.addEventListener('abort',entry.release,{once:true});
+ return scopes.run(entry,()=>retainFiniteOwnerStagePromise(Promise.resolve().then(operation)));
+}
`````

### test/fixtures/finite-first-connection-publication.mjs

`````diff
diff --git a/test/fixtures/finite-first-connection-publication.mjs b/test/fixtures/finite-first-connection-publication.mjs
--- a/test/fixtures/finite-first-connection-publication.mjs
+++ b/test/fixtures/finite-first-connection-publication.mjs
@@ -104,27 +104,38 @@
  const options={bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define};
  const m=await build({...options,entryPoints:['worker/mcp-own/finite.mjs']});
  const bytes=m.outputFiles[0].contents,compressed=gzipSync(bytes,{level:9,mtime:0});
  const resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:revision,sourceTree:tree,sourceCheck:'git-inputs-before-after-v1',programHash:node.programHash,module:{name:'index.mjs',sha256:digest(bytes),bytes:bytes.length},compressedSha256:digest(compressed),compressedBytes:compressed.length,content:Buffer.from(compressed).toString('base64')};
  // Negative-only, separately hashed ordinary-entry/SQL spy. The positive M
  // uses m.outputFiles unchanged, not this instrumented wrapper.
  const source=String.raw`
  import finite from './worker/mcp-own/finite.mjs';
  export {AfwOwnEventNode,AfwNodeControl} from './worker/mcp-own/finite.mjs';
  import {finiteNativeActor} from './lib/mcp-qa-finite-owner-native-wire.mjs';
- let fault='none';globalThis.__firstConnectionOrdinary=0;let sql=0,forwarded=0;
+ let fault='none';globalThis.__firstConnectionOrdinary=0;let sql=0,forwarded=0,lateRelease;
+ const late={armed:false,reached:false,released:false,nativeReturned:false,nativeRejected:false,startedAt:null,finishedAt:null};
  export default{async fetch(request,env,ctx){
   const path=new URL(request.url).pathname;
   if(path==='/_fixture/fault'){fault=await request.text();return new Response(null,{status:204});}
   if(path==='/_fixture/probe')return Response.json({ordinary:globalThis.__firstConnectionOrdinary,sql,forwarded});
+  if(path==='/_fixture/r2-late-arm'){late.armed=true;return new Response(null,{status:204});}
+  if(path==='/_fixture/r2-late-signal')return Response.json(late);
+  if(path==='/_fixture/r2-late-release'){late.released=true;lateRelease?.();return new Response(null,{status:204});}
   const ns=env.AFW_FINITE_TRIAL_CONTROL,db=env.DB;
   const prepared={...env,DB:{prepare(...a){sql++;return db.prepare(...a);},withSession(...a){sql++;return db.withSession(...a);}}};
+  if(late.armed){
+   const kv=env.OAUTH_KV;
+   prepared.OAUTH_KV={get:kv.get.bind(kv),list:kv.list.bind(kv),delete:kv.delete.bind(kv),async put(key,value,options){
+    if(!late.reached&&(key.startsWith('token:')||key.startsWith('grant:'))){late.reached=true;late.startedAt=Date.now();await new Promise(resolve=>{lateRelease=resolve;});}
+    try{const result=await kv.put(key,value,options);late.nativeReturned=true;return result;}catch(error){late.nativeRejected=true;throw error;}finally{late.finishedAt=Date.now();}
+   }};
+  }
   if(fault==='qa-absent')prepared.AFW_FINITE_TRIAL_CONTROL=undefined;
   if(fault==='version')prepared.AFW_FINITE_TRIAL_VERSION={id:'invalid'};
   if(fault==='actor')prepared.AFW_FINITE_TRIAL_CONTROL={idFromName(){return {toString:()=> 'bad'};},get(){throw Error('SYN wrong actor');}};
   if(!['qa-absent','actor'].includes(fault))prepared.AFW_FINITE_TRIAL_CONTROL={idFromName:ns.idFromName.bind(ns),get(id){
    const stub=ns.get(id);return {fetch(req){forwarded++;if(fault==='version-drift'){prepared.AFW_FINITE_TRIAL_VERSION={id:env.AFW_FINITE_TRIAL_VERSION.id};}return stub.fetch(req);}};
   }};
   if(fault==='oauth-open')prepared.AFW_DELEGATED_OAUTH_ENABLED='true';
   // Literal actor is asserted in the product forwards, never selected by input.
   if(!finiteNativeActor)throw Error('SYN missing actor');
   return finite.fetch(request,prepared,ctx);
@@ -401,10 +412,75 @@
  once("for(;;){const part=await retain(reader.read());check(c);","for(;;){const part=await retain(reader.read());io.reads++;io.bytes+=part.value?.byteLength??0;check(c);");
 
  for(const [method,effect]of [['upload','upload'],['activate','activation']]){
   const describe=method==='upload'?'describeUpload':'describeActivation',needle=method+"(input,c){return invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});}";
   once(needle,method+"(input,c){const trace=globalThis.__t3NativeTrace,requestId=globalThis.__t3NativeTraceRequestId,actual=invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});actual.then(value=>{trace?.push({kind:'native-operation-settled',effect:'"+effect+"',resourceId:value.id,requestId,at:Date.now()});},()=>{}).catch(()=>{});return actual;}");
  }
  const ending="finally{if(reader)await retain(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
  once(ending,"finally{if(reader){io.cancelCalls++;await retain(reader.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
  return source;
 }
+
+
+/** Negative SDK-only writer. It deliberately omits AFW's callback; never an M admission. */
+export async function compileCleanupSdkOnlyWorker(){
+ const source=String.raw`
+ import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
+ import {createFiniteOwnerRequestLease,readFiniteOwnerRequestBoundary} from './lib/mcp-qa-finite-owner-preparation.mjs';
+ const O='https://delegated-canary.agentfriendlyweb.dev',scopes=['afw:project:read'];
+ const server=new OAuthAuthorizationServer({issuer:O,resources:[O+'/mcp'],scopesSupported:scopes,accessTokenTTL:300,refreshTokenTTL:0,clientIdMetadataDocumentEnabled:false});
+ const hash=async v=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v))).toString('hex');
+ const check=(v,message)=>{if(!v)throw Error('SYN SDK-only '+message);};
+ let retained=null,release=null,signal={reached:false,settled:false};
+ export default{async fetch(request,env){
+  const path=new URL(request.url).pathname;
+  if(path==='/_fixture/sdk-only-signal')return Response.json(signal);
+  if(path==='/_fixture/sdk-only-release'){release?.();return new Response(null,{status:204});}
+  if(path!=='/_fixture/sdk-only-exchange'||request.method!=='POST')return new Response(null,{status:404});
+  if(retained)return new Response(null,{status:409});
+  const root=createFiniteOwnerRequestLease(request),boundary=readFiniteOwnerRequestBoundary(root.lease);
+  const startedMono=performance.now(),childDeadline=Math.min(boundary.deadline,boundary.startedAt+5000);
+  const current=()=>{root.lease.assertCurrent();check(Date.now()<childDeadline&&performance.now()-startedMono<5000,'original child expired');};
+  let timer,bodyFinish;
+  signal={label:'SYN adversarial SDK-only; AFW callback deliberately omitted',worker:'sdk-only-first-connection',callbackOmitted:true,MAdmission:false,rootStartedAt:boundary.startedAt,rootDeadline:boundary.deadline,childDeadline,reached:false,settled:false,retained:false,released:false,logicalDeniedAt:null,nativeReturned:false,nativeRejected:false};
+  try{
+   const input=await request.json();current();
+   check(Number.isSafeInteger(input.C0)&&Date.now()<input.C0,'original C0');
+   const original=server.getOAuthApi(env),summary=await original.unwrapToken(input.subjectToken);current();
+   check(summary&&summary.grantId===input.sdkGrantId&&summary.grant.clientId===input.clientId&&summary.audience===O+'/mcp'&&JSON.stringify(summary.scope)===JSON.stringify(scopes),'same genuine token identity/scope/audience');
+   check(summary.expiresAt*1000-Date.now()>=65000,'genuine token needs >=65s remaining');
+   const grantKey='grant:'+summary.userId+':'+summary.grantId,grant=await env.OAUTH_KV.get(grantKey,{type:'json'});current();
+   check(grant?.id===summary.grantId&&grant.metadata?.afwFiniteCleanup?.correlationHash===input.correlationHash,'same native grant/correlation');
+   signal.tokenHash=await hash(input.subjectToken);signal.selectorHash=await hash(summary.grantId);signal.subjectHash=await hash(summary.userId);signal.correlationHash=input.correlationHash;signal.referenceHash=input.referenceHash;signal.tokenExpiresAt=summary.expiresAt;signal.grantExpiresAt=grant.expiresAt??null;signal.C0=input.C0;
+   const kv=env.OAUTH_KV,prefix='token:'+summary.userId+':'+summary.grantId+':';
+   const wrapped={get(...args){current();return kv.get(...args);},list(){throw Error('SYN no SDK list');},delete(){throw Error('SYN no SDK delete');},async put(key,value,options){
+    current();check(!signal.reached&&key.startsWith(prefix),'single original token write only');
+    const native=JSON.parse(value);check(native.grantId===summary.grantId&&native.userId===summary.userId&&native.audience===summary.audience&&JSON.stringify(native.scope)===JSON.stringify(scopes),'same SDK write tuple');
+    signal.reached=true;signal.reachedAt=Date.now();signal.write={keyHash:await hash(key),valueHash:await hash(value),expiresAt:native.expiresAt,expirationTtl:options.expirationTtl};current();
+    release=()=>{signal.released=true;signal.releasedAt=Date.now();};
+    while(!signal.released){check(Date.now()<input.C0+180000,'original C1 retention observation exhausted');await new Promise(resolve=>setTimeout(resolve,250));}
+    // The already-started SDK operation survives logical denial. No new business work is admitted.
+    signal.nativeAttemptAt=Date.now();
+    try{const result=await kv.put(key,value,options);signal.nativeReturned=true;return result;}
+    catch(error){signal.nativeRejected=true;throw error;}
+    finally{signal.nativeSettledAt=Date.now();}
+   }};
+   current();
+   const actual=server.getOAuthApi({...env,OAUTH_KV:wrapped}).exchangeToken({subjectToken:input.subjectToken,scope:scopes,aud:O+'/mcp'});
+   retained=actual;signal.retained=true;
+   // Register settlement before the race; only this exact promise can clear retention.
+   actual.then(async value=>{signal.sdkReturned=true;signal.resultTokenHash=await hash(value.access_token);},()=>{signal.sdkRejected=true;}).finally(()=>{signal.settled=true;signal.settledAt=Date.now();signal.retained=false;retained=null;release=null;bodyFinish?.();}).catch(()=>{});
+   const denied=new Promise(resolve=>{timer=setTimeout(()=>resolve('deadline'),Math.max(0,childDeadline-Date.now()));});
+   const outcome=await Promise.race([actual.then(()=> 'early-return',()=> 'early-rejection'),denied]);
+   signal.logicalDeniedAt=Date.now();signal.logicalReason=outcome;root.finish();clearTimeout(timer);
+   // Fixed denied headers/body are available at the original child deadline. Keeping the
+   // transport body open retains execution context, not the expired logical Root.
+   const body=new ReadableStream({start(controller){controller.enqueue(new TextEncoder().encode('SYN SDK-only denied'));bodyFinish=()=>{try{controller.close();}catch{}};if(signal.settled)bodyFinish();},cancel(){return actual.catch(()=>{});}});
+   return new Response(body,{status:403,headers:{'Content-Type':'text/plain','Cache-Control':'no-store'}});
+  }catch{
+   root.finish();clearTimeout(timer);signal.logicalDeniedAt=Date.now();signal.logicalReason='premise-rejected';return new Response('SYN SDK-only premise rejected',{status:412});
+  }
+ }};
+`;
+ const result=await build({bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',stdin:{contents:source,resolveDir:process.cwd()}});
+ return {script:result.outputFiles[0].text,bytes:result.outputFiles[0].contents.length,sha256:digest(result.outputFiles[0].contents),metafile:result.metafile,sourceKind:'SYN adversarial SDK-only; AFW callback omitted'};
+}
`````

### test/fixtures/finite-initial-entry-world.mjs

`````diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,11 +1,11 @@
-import {extendFiniteOwnerCleanup,instrumentFiniteOwnerCleanup} from './finite-owner-cleanup.mjs';
+import {extendFiniteOwnerCleanup,instrumentFiniteOwnerCleanup,instrumentCleanupConsumer} from './finite-owner-cleanup.mjs';
 import {compileFirstConnectionCandidate,extendFirstConnectionPublication,firstConnectionWorkers,extendEnrollmentComponent,instrumentFirstConnection,instrumentFirstConnectionEngine} from './finite-first-connection-publication.mjs';
 import {extendFiniteOwnerNoticeGet,captureNoticeBundle,instrumentFiniteNoticeGet} from './finite-owner-notice-get.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
 import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
@@ -18,26 +18,27 @@
 import {bootstrapWorld,UUID,GH,CF} from './finite-bootstrap-world.mjs';
 import {initialHistoryFixture,seedInitialHistory} from './finite-initial-history-world.mjs';
 import {QA_CLOUD_CLOSED_PINS as realPins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
 import {initialHash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
 import {generateKeyPair,exportJWK,SignJWT} from 'jose';
 import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
 import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
 import {finitePublicProfileTemplate,finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
 const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001;
-export async function initialEntryHarness(mode='normal',{negativeProfile=false,ownerCleanup=false}={}){
+export async function initialEntryHarness(mode='normal',{negativeProfile=false,ownerCleanup=false,cleanupCheckpoint=false}={}){
  const firstConnection=mode==='first-connection-publication',firstConnectionMutation=firstConnection?(process.env.AFW_T3_MUTANT??null):null;if(![null,'public-partial','existing-ack'].includes(firstConnectionMutation))throw Error('SYN unknown negative mutation');
  const mark=stage=>{if(firstConnection)console.info('T2 native stage',stage);};mark('harness-start');
  const enrollmentComponent=mode==='first-connection-enrollment-component';
  const pair=(firstConnection||enrollmentComponent||mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
- const persist=mode.endsWith('restart')?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
+ if(cleanupCheckpoint)assert(firstConnection&&ownerCleanup,'SYN checkpoint requires unchanged owner producer mode');
+ const persist=mode.endsWith('restart')||cleanupCheckpoint?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
  const sdkProfile=mode.startsWith('phase-context-sdk')?finiteWranglerProfileTemplate('qaLive'):null;
  const base={...(firstConnection?{name:'qa-first-connection'}:{}),...(sdkProfile?{name:'qa-sdk'}:{}),...(persist?{resourcePersistencePath:persist}:{}),...(firstConnection?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'first-connection-oauth'}}:mode.startsWith('phase-context')?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'finite-sdk-shared'}}:{}),modules:true,compatibilityDate:sdkProfile?.compatibility_date??'2026-09-07',compatibilityFlags:sdkProfile?.compatibility_flags??['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
  const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
  let failedInitializationDisposal;
  const disposeFailedInitialization=()=>failedInitializationDisposal??=mf.dispose();
  try{
  mark('provisional-bindings-start');const b=await mf.getBindings();mark('provisional-bindings-ready');const ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
  mark('M-compile-start');const firstCandidate=firstConnection?await compileFirstConnectionCandidate(M,TREE,{negativeProfile}):null;mark('M-compile-done');
  const program=firstCandidate?.program??'SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=firstCandidate?.bytes??Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
@@ -80,20 +81,27 @@
    let initial=sources.get('mcp-qa-finite-initial-entry.mjs');
    const declaration='async function http(method,suffix,token,body,l,cap=3145728){',readLoop='for(;;){const read=await track(stream.read());guard(l);if(read.done)break;',ending='}finally{if(stream)track(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)track(response.body.cancel()).catch(()=>{});}';
    for(const needle of [declaration,readLoop,ending])assert.equal(initial.split(needle).length,2,'SYN original upload HTTP seam');
    initial=initial.replace(declaration,()=>declaration+"const observed={reads:0,bytes:0,readMs:0,postReadGuardMs:0};");
    initial=initial.replace(readLoop,()=>"for(;;){const readAt=performance.now(),read=await track(stream.read());observed.readMs+=performance.now()-readAt;observed.reads++;observed.bytes+=read.value?.byteLength??0;const guardAt=performance.now();try{guard(l);}finally{observed.postReadGuardMs+=performance.now()-guardAt;}if(read.done)break;");
    initial=initial.replace(ending,()=>"}finally{console.info('T2 original upload HTTP scalars',JSON.stringify({method,path:suffix.split('?')[0],...observed}));"+ending.slice('}finally{'.length));
    sources.set('mcp-qa-finite-initial-entry.mjs',initial);
   }
  }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  if(cleanupCheckpoint)b.onLoad({filter:/mcp-qa-finite-(?:owner-cleanup|initial-cleanup)\.mjs$/},async args=>{
+   // Compose diagnostics after the existing SYN fixture substitution, never
+   // reload the untransformed production ceiling over that prepared source.
+   const name=args.path.split('/').at(-1),source=sources.get(name)??await readFile(args.path,'utf8');
+   if(name==='mcp-qa-finite-initial-cleanup.mjs'){assert(source.includes('CEILING='+approval));assert(!source.includes(approvalDecl));}
+   return {contents:instrumentCleanupConsumer(source),loader:'js'};
+  });
   if(firstConnection)b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:(ownerCleanup?instrumentFiniteOwnerCleanup:x=>x)(instrumentFirstConnection(await readFile(args.path,'utf8'),{mutation:firstConnectionMutation})),loader:'js'}));
   if(firstConnection)b.onLoad({filter:/mcp-qa-finite-fixed-policy-engine\.mjs$/},async args=>({contents:instrumentFirstConnectionEngine(await readFile(args.path,'utf8')),loader:'js'}));
   if(firstConnection)b.onLoad({filter:/mcp-qa-finite-initial-lease\.mjs$/},()=>({contents:sources.get('mcp-qa-finite-initial-lease.mjs'),loader:'js'}));
   if(mode==='phase-context-sdk-token-notice-get')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteNoticeGet(instrumentFiniteOwnerIo(await readFile(args.path,'utf8'))),loader:'js'}));
   if(mode==='phase-context-sdk-io')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerIo(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
    let contents=await readFile(args.path,'utf8');
    const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
@@ -117,21 +125,85 @@
   f.firstConnectionBuild={negativeMutation:firstConnectionMutation,wrongProfileHash:firstCandidate.wrongProfileHash,M:{sha256:sha(bytes),bytes:bytes.length,inputs:Object.keys(firstCandidate.metafile.inputs)},QA:{sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,inputs:Object.keys(built.metafile.inputs)},spyHash:firstCandidate.spyHash,residency:resident};
   f.providerRegistry={requests:[],versions:{},pointer:null};
   const artifacts='output/t2-native-graphs/'+sha(built.outputFiles[0].contents);await mkdir(artifacts,{recursive:true});
   await Promise.all([
    writeFile(artifacts+'/native-syn.json',J({purpose:firstConnectionMutation?'afw.first-connection-negative-mutant-syn-build.v1':'afw.first-connection-native-syn-build.v1',negativeMutation:firstConnectionMutation,testRevision:process.env.GITHUB_SHA??null,M:{...f.firstConnectionBuild.M,inputs:undefined},QA:{...f.firstConnectionBuild.QA,inputs:undefined},resident:{...resident,content:undefined},negativeSpyHash:firstCandidate.spyHash,negativeCompiledProfileHash:firstCandidate.wrongProfileHash,completePackage:false,operationalReadiness:false})),
    writeFile(artifacts+'/metafiles.json',J({M:firstCandidate.metafile,QA:built.metafile})),
    writeFile(artifacts+'/canary-index.mjs',firstCandidate.bytes),
    writeFile(artifacts+'/qa-index.mjs',built.outputFiles[0].contents)
   ]);
  }
- let finalOptions={...base,script:built.outputFiles[0].text,outboundService:async req=>{
+ let finalOptions={...base,script:built.outputFiles[0].text,outboundService:createInitialEntrySynOutbound({f,firstConnection,jwk,w,mode,created,approval,opPin,opMetadata,built,x,cleanupCheckpoint})};
+ if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io',noticeGet:mode==='phase-context-sdk-token-notice-get'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
+ if(firstConnection)finalOptions=firstConnectionWorkers(finalOptions,firstCandidate);
+ if(cleanupCheckpoint)finalOptions={...finalOptions,resourcePersistencePath:persist};
+ const rawFinalOptions=finalOptions;let currentMountedOptions=rawFinalOptions;
+ finalOptions=convertV4MiniflareOptions(finalOptions);
+ mark('harness-setOptions-start');await mf.setOptions(finalOptions);mark('harness-setOptions-ready');
+ mark('QA-bindings-start');const bindings=await mf.getBindings(firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
+ if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
+ mark('QA-bindings-ready');if(firstConnection||mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();
+ const oldMonitoringSql=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results;
+ const oldMonitoringEvents=(await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results;
+ const originalGrants=(await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results;
+ assert.equal(originalGrants.length,2);assert.equal(oldMonitoringSql.length,4);assert.equal(oldMonitoringEvents.length,3);
+ for(const sql of FINITE_PREPARATION_MONITORING_SCHEMA)await f.db.prepare(sql).run();
+ assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results,oldMonitoringSql);
+ assert.deepEqual((await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results,oldMonitoringEvents);
+ assert.equal((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").all()).results.length,7);
+ assert.deepEqual((await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results,originalGrants);
+ console.info('NOTICE SYN schema adapter',JSON.stringify({consentObjectsPreserved:4,consentRowsPreserved:3,grantsPreserved:2,objectsAfter:7,addedObjects:3}));}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
+ if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
+ if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
+ if(firstConnection){
+  f.mountFirstConnection=async()=>{mark('mount-start');assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.pointerMode,'candidate');
+   const vars=Object.fromEntries(f.uploaded.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));
+   const mountedRaw={...rawFinalOptions,workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:f.uploaded.id}}})},mounted=convertV4MiniflareOptions(mountedRaw);
+   mark('mount-updateOptions-start');try{await mf.setOptions(mounted);currentMountedOptions=mountedRaw;}catch(error){f.mountFailed=true;console.info('T2 original mount error',JSON.stringify({name:error?.name,code:error?.code??null,issues:(error?.issues??[]).map(({path,code,expected})=>({path,code,expected})),frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5),workers:mounted.workers.map(worker=>({name:worker.name,keys:Object.keys(worker),bindings:Object.entries(worker.bindings??{}).map(([key,value])=>({key,type:typeof value,defined:value!==undefined}))}))}));throw error;}mark('mount-updateOptions-ready');const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');mark('mount-ready');
+  };
+  f.adoptConnectionConfiguration=async({upstream=false}={})=>{
+   assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);const pointer=f.providerRegistry.pointer,version=f.providerRegistry.versions[pointer.versions[0].version_id],closed=f.providerRegistry.versions['55555555-5555-4555-8555-555555555555'];
+   assert.equal(version.id,pointer.versions[0].version_id);assert.equal(version.modules[0].content_base64,closed.modules[0].content_base64);const candidate=structuredClone(closed);candidate.id=version.id;candidate.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(version,candidate);
+   const vars=Object.fromEntries(version.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));const mountedRaw={...rawFinalOptions,...upstream?{upstream:'https://delegated-canary.agentfriendlyweb.dev'}:{},workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:version.id}}})},mounted=convertV4MiniflareOptions(mountedRaw);f.transportNormalized=upstream;if(upstream)assert.equal(mounted.upstream,'https://delegated-canary.agentfriendlyweb.dev');
+   const originalWorker=rawFinalOptions.workers.find(worker=>worker.name==='canary-first-connection');assert.equal(sha(originalWorker.script),f.firstConnectionBuild.M.sha256,'actual script input remains initial M');await mf.setOptions(mounted);currentMountedOptions=mountedRaw;const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
+  };
+  f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');f.call=(path,options)=>{f.providerPhase=(options?.method??'GET')+' '+new URL('https://delegated-canary.agentfriendlyweb.dev'+path).pathname;return mf.dispatchFetch('https://delegated-canary.agentfriendlyweb.dev'+path,options);};}
+ if(firstConnection&&negativeProfile)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
+ if(cleanupCheckpoint){
+  f.mountCleanupSdkOnly=async candidate=>{
+   assert(!currentMountedOptions.workers.some(w=>w.name==='sdk-only-first-connection'));
+   const m=currentMountedOptions.workers.find(w=>w.name==='canary-first-connection');
+   const extra={name:'sdk-only-first-connection',modules:true,script:candidate.script,compatibilityDate:m.compatibilityDate,compatibilityFlags:m.compatibilityFlags,kvNamespaces:{OAUTH_KV:m.kvNamespaces.OAUTH_KV},outboundService:async()=>new Response(null,{status:503})};
+   const next={...currentMountedOptions,workers:[...currentMountedOptions.workers,extra]};
+   await mf.setOptions(convertV4MiniflareOptions(next));currentMountedOptions=next;
+   const b=await mf.getBindings('qa-first-connection');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+   f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.kv=await mf.getKVNamespace('OAUTH_KV','canary-first-connection');
+  };
+  f.cleanupCheckpointInputs=()=>({persist,currentMountedOptions,factory:{firstConnection,jwk,mode,created,approval,opPin,opMetadata,qaScript:built.outputFiles[0].text,x,w:{map:[...w.map],pointer:w.pointer}},state:Object.fromEntries(['command','nowOffset','activations','restores','pointerMode','alarmMode','requests','uploads','mode','pointerReads','tokenReads','publisherReads','baselineReads','commandReads','approval','providerRegistry','uploaded','refs','activationAnnotation','inventoryMode','firstConnectionBuild','source','resident'].filter(k=>Object.hasOwn(f,k)).map(k=>[k,f[k]]))});
+ }
+ f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
+ f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
+ f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
+ f.alarmAt=async at=>{f.nowOffset=at-Date.now();try{return await f.stub.initialAlarmAt(at);}finally{f.nowOffset=0;}};
+ f.ownerRead=async(delta=400000,...args)=>{const rows=await f.stub.snapshot();let raw;try{raw=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule')[1]);}finally{rows[Symbol.dispose]?.();}f.nowOffset=raw.I0+delta-Date.now();try{return await f.stub.ownerSourceRead(delta,...args);}finally{f.nowOffset=0;}};
+ f.future=async(kind='complete')=>{await f.stub.seedFutureActivation(kind);const rows=await f.stub.snapshot(),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);f.activationAnnotation='afw-finite-initial-activate-'+plan.recordHash;f.pointerMode='candidate';return plan;};
+ f.cleanup=async()=>{if(persist){assert.ok(resolve(persist).startsWith(resolve(tmpdir())+'/afw-entry-restart-'));await rm(persist,{recursive:true,force:true});}};
+ f.enrollmentToken=async (source,expiresAt=Math.floor((Date.now()+3600000)/1000))=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ if(mode==='phase-context-sdk-token-notice-get')f.noticeToken=async({subject='owner',audience=f.source.access.audience,issuer='https://'+f.source.access.teamDomain,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ if(firstConnection)f.firstConnectionToken=async(source,{subject='owner',issuer='https://'+source.access.teamDomain,audience=source.access.audience,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ f.refs={commandId:COMMAND,sourceRevision:M,qaVersionId:UUID,initialInstanceId:'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId:COMMAND,sourceRevision:M,qaVersionId:UUID}),workflowName:'afw-own-qa-private-bootstrap',createdAt:mode==='partial'?Date.now()-29700:mode==='upload-partial'?Date.now()-27000:Date.now()};
+ mark('harness-ready');return f;
+ }catch(error){mark('harness-error:'+String(error));await disposeFailedInitialization();mark('harness-error-disposed');throw error;}
+}
+/** Fixed SYN provider behavior, reattached only to original checkpoint facts. */
+export function createInitialEntrySynOutbound({f,firstConnection,jwk,w,mode,created,approval,opPin,opMetadata,built,x,cleanupCheckpoint=false}){
+ return async req=>{
   const providerPhase=f.providerPhase??'initial-upstream',providerUrl=new URL(req.url);
   const respond=(payload,options)=>{
    if(firstConnection){const encoded=J(payload);f.providerRegistry.responses??=[];f.providerRegistry.responses.push({phase:providerPhase,host:providerUrl.host,method:req.method,path:providerUrl.pathname,status:options?.status??200,bytes:Buffer.byteLength(encoded),sha256:sha(encoded)});}
    return Response.json(payload,options);
   };
   if(firstConnection)f.providerRegistry.requests.push({phase:providerPhase,url:req.url,method:req.method,...(req.method==='POST'?{body:await req.clone().text()}:{})});
   await delayFiniteOwnerIo(f,req);
   if(req.url.endsWith('/cdn-cgi/access/certs'))return respond({keys:[jwk]});
   f.requests.push(req.url);(f.observationTimes??=[]).push({at:Date.now(),method:req.method,kind:new URL(req.url).origin==='https://api.cloudflare.com'?'provider':'ledger'});(f.requestMethods??=[]).push(req.method);
   let value;
@@ -188,20 +260,28 @@
      if(own&&f.inventoryMode==='foreign')result.push({id:'SYN-foreign',status:'running',workflow_id:s.id});
      if(!own&&f.inventoryMode==='other-active')result=[{id:'SYN-other',status:'waiting',workflow_id:s.id}];
     }else result=req.url.includes('/instances?')?(f.alarmMode==='active-workflow'?[{id:'SYN-active',status:'running',workflow_id:s.id}]:[]):{name:s.name,id:s.id,script_name:s.script,class_name:s.className};
     return respond({success:true,errors:[],messages:[],result,...Array.isArray(result)?{result_info:{per_page:100,count:result.length,total_count:result.length,page:1,total_pages:1}}:{}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
    }
    else if(req.url.includes('/instances-v2?state=active&per_page=100')){
     if(['primary-retention','primary-late-headers'].includes(f.gateMode)){f.held='provider-read';await new Promise(resolve=>{f.release=resolve;});}
     return respond({success:true,errors:[],messages:[],result:f.alarmMode==='active-container'?[{id:'SYN'}]:[],result_info:{per_page:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
    }
    else if(['/schedules','/tails'].some(p=>req.url.endsWith(p)))result=f.alarmMode==='schedule'||f.gateMode==='tails'&&req.url.endsWith('/tails')?[{id:'SYN'}]:[];
+   else if(cleanupCheckpoint&&f.cleanupRestorePlan&&req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments'){
+    assert.equal(req.method,'POST');const body=await req.text(),data=JSON.parse(body),p=f.cleanupRestorePlan;
+    assert.deepEqual(data,{strategy:'percentage',versions:[{version_id:p.baselineVersionId,percentage:100}],annotations:{'workers/message':'afw-finite-initial-restore-'+p.recordHash}});
+    assert.equal(f.providerRegistry.versions[p.baselineVersionId].id,p.baselineVersionId);
+    const id='77777777-7777-4777-8777-777777777777';assert.notEqual(id,f.providerRegistry.pointer.id);
+    f.restores.push({body,data});result={id,...data};f.restored=result;f.providerRegistry.pointer=structuredClone(result);f.pointerMode='restored';
+    if(f.alarmMode==='restore-ack-lost')throw Error('SYN restore applied ACK lost');
+   }
    else if(firstConnection&&f.uploads.length>1&&req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments'){
     assert.equal(req.method,'POST');const body=await req.text(),data=JSON.parse(body);assert.equal(data.versions[0].percentage,100);assert.ok(f.providerRegistry.versions[data.versions[0].version_id]);
     f.activations.push({body,data});result={id:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',...data};f.providerRegistry.pointer=structuredClone(result);
    }
    else if(firstConnection&&f.uploads.length>1&&req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1')result={deployments:[structuredClone(f.providerRegistry.pointer)]};
    else if(firstConnection&&f.uploads.length>1&&req.url.includes('/workers/workers/agent-friendly-web-delegated-canary/versions/')&&f.providerRegistry.versions[new URL(req.url).pathname.split('/').at(-1)])result=structuredClone(f.providerRegistry.versions[new URL(req.url).pathname.split('/').at(-1)]);
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments'){
     assert.equal(req.method,'POST');const body=await req.text(),data=JSON.parse(body);
     if(data.annotations?.['workers/message']?.startsWith('afw-finite-initial-activate-')){
      f.activations.push({body,data});f.activationAnnotation=data.annotations['workers/message'];
@@ -268,59 +348,12 @@
      if(fault.endsWith('-config'))result.bindings.find(binding=>binding.name==='ACCESS_AUD').text='SYN readback mismatch';
      if(fault==='activation-secret')result.bindings.find(binding=>binding.type==='secret_text').text='SYN negative secret metadata';
      if(fault.endsWith('-pointer'))result.deployments[0].id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
      if(fault==='activation-percentage')result.deployments[0].versions[0].percentage=99;
      if(fault==='activation-version')result.deployments[0].versions[0].version_id='55555555-5555-4555-8555-555555555555';
     }
    }
    value={success:true,errors:[],messages:[],result};
   }
   return respond(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
- }};
- if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io',noticeGet:mode==='phase-context-sdk-token-notice-get'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
- if(firstConnection)finalOptions=firstConnectionWorkers(finalOptions,firstCandidate);
- const rawFinalOptions=finalOptions;
- finalOptions=convertV4MiniflareOptions(finalOptions);
- mark('harness-setOptions-start');await mf.setOptions(finalOptions);mark('harness-setOptions-ready');
- mark('QA-bindings-start');const bindings=await mf.getBindings(firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
- if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
- mark('QA-bindings-ready');if(firstConnection||mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();
- const oldMonitoringSql=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results;
- const oldMonitoringEvents=(await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results;
- const originalGrants=(await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results;
- assert.equal(originalGrants.length,2);assert.equal(oldMonitoringSql.length,4);assert.equal(oldMonitoringEvents.length,3);
- for(const sql of FINITE_PREPARATION_MONITORING_SCHEMA)await f.db.prepare(sql).run();
- assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results,oldMonitoringSql);
- assert.deepEqual((await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results,oldMonitoringEvents);
- assert.equal((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").all()).results.length,7);
- assert.deepEqual((await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results,originalGrants);
- console.info('NOTICE SYN schema adapter',JSON.stringify({consentObjectsPreserved:4,consentRowsPreserved:3,grantsPreserved:2,objectsAfter:7,addedObjects:3}));}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
- if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
- if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
- if(firstConnection){
-  f.mountFirstConnection=async()=>{mark('mount-start');assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.pointerMode,'candidate');
-   const vars=Object.fromEntries(f.uploaded.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));
-   const mounted=convertV4MiniflareOptions({...rawFinalOptions,workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:f.uploaded.id}}})});
-   mark('mount-updateOptions-start');try{await mf.setOptions(mounted);}catch(error){f.mountFailed=true;console.info('T2 original mount error',JSON.stringify({name:error?.name,code:error?.code??null,issues:(error?.issues??[]).map(({path,code,expected})=>({path,code,expected})),frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5),workers:mounted.workers.map(worker=>({name:worker.name,keys:Object.keys(worker),bindings:Object.entries(worker.bindings??{}).map(([key,value])=>({key,type:typeof value,defined:value!==undefined}))}))}));throw error;}mark('mount-updateOptions-ready');const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');mark('mount-ready');
-  };
-  f.adoptConnectionConfiguration=async({upstream=false}={})=>{
-   assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);const pointer=f.providerRegistry.pointer,version=f.providerRegistry.versions[pointer.versions[0].version_id],closed=f.providerRegistry.versions['55555555-5555-4555-8555-555555555555'];
-   assert.equal(version.id,pointer.versions[0].version_id);assert.equal(version.modules[0].content_base64,closed.modules[0].content_base64);const candidate=structuredClone(closed);candidate.id=version.id;candidate.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(version,candidate);
-   const vars=Object.fromEntries(version.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));const mounted=convertV4MiniflareOptions({...rawFinalOptions,...upstream?{upstream:'https://delegated-canary.agentfriendlyweb.dev'}:{},workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:version.id}}})});f.transportNormalized=upstream;if(upstream)assert.equal(mounted.upstream,'https://delegated-canary.agentfriendlyweb.dev');
-   const originalWorker=rawFinalOptions.workers.find(worker=>worker.name==='canary-first-connection');assert.equal(sha(originalWorker.script),f.firstConnectionBuild.M.sha256,'actual script input remains initial M');await mf.setOptions(mounted);const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
-  };
-  f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');f.call=(path,options)=>{f.providerPhase=(options?.method??'GET')+' '+new URL('https://delegated-canary.agentfriendlyweb.dev'+path).pathname;return mf.dispatchFetch('https://delegated-canary.agentfriendlyweb.dev'+path,options);};}
- if(firstConnection&&negativeProfile)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
- f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
- f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
- f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
- f.alarmAt=async at=>{f.nowOffset=at-Date.now();try{return await f.stub.initialAlarmAt(at);}finally{f.nowOffset=0;}};
- f.ownerRead=async(delta=400000,...args)=>{const rows=await f.stub.snapshot();let raw;try{raw=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule')[1]);}finally{rows[Symbol.dispose]?.();}f.nowOffset=raw.I0+delta-Date.now();try{return await f.stub.ownerSourceRead(delta,...args);}finally{f.nowOffset=0;}};
- f.future=async(kind='complete')=>{await f.stub.seedFutureActivation(kind);const rows=await f.stub.snapshot(),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);f.activationAnnotation='afw-finite-initial-activate-'+plan.recordHash;f.pointerMode='candidate';return plan;};
- f.cleanup=async()=>{if(persist){assert.ok(resolve(persist).startsWith(resolve(tmpdir())+'/afw-entry-restart-'));await rm(persist,{recursive:true,force:true});}};
- f.enrollmentToken=async (source,expiresAt=Math.floor((Date.now()+3600000)/1000))=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
- if(mode==='phase-context-sdk-token-notice-get')f.noticeToken=async({subject='owner',audience=f.source.access.audience,issuer='https://'+f.source.access.teamDomain,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
- if(firstConnection)f.firstConnectionToken=async(source,{subject='owner',issuer='https://'+source.access.teamDomain,audience=source.access.audience,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
- f.refs={commandId:COMMAND,sourceRevision:M,qaVersionId:UUID,initialInstanceId:'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId:COMMAND,sourceRevision:M,qaVersionId:UUID}),workflowName:'afw-own-qa-private-bootstrap',createdAt:mode==='partial'?Date.now()-29700:mode==='upload-partial'?Date.now()-27000:Date.now()};
- mark('harness-ready');return f;
- }catch(error){mark('harness-error:'+String(error));await disposeFailedInitialization();mark('harness-error-disposed');throw error;}
-}
\ No newline at end of file
+ };
+}
`````

### test/fixtures/finite-owner-cleanup-persistence.mjs

`````diff
diff --git a/test/fixtures/finite-owner-cleanup-persistence.mjs b/test/fixtures/finite-owner-cleanup-persistence.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-cleanup-persistence.mjs
@@ -0,0 +1,346 @@
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {mkdir,readFile,writeFile,readdir,cp} from 'node:fs/promises';
+import {resolve,join,relative} from 'node:path';
+import {pathToFileURL} from 'node:url';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,downstreamOwnerReference,recordOwnerReference,cleanupMTransport,readCleanupM,cleanupMProfile,classifyCleanupMDenial} from './finite-owner-cleanup.mjs';
+import {createInitialEntrySynOutbound} from './finite-initial-entry-world.mjs';
+import {plain,compileCleanupSdkOnlyWorker,compileFirstConnectionCandidate} from './finite-first-connection-publication.mjs';
+import {build} from 'esbuild';
+
+const P='afw.finite-initial-cleanup.v1:',sha=x=>createHash('sha256').update(x).digest('hex');
+const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
+const json=x=>JSON.stringify(x,null,2);
+export const principalName='R2 original alarm restores the produced current cycle at real C0';
+export async function waitUntil(at){while(Date.now()<at)await pause(Math.min(1000,at-Date.now()));}
+function beneath(root,path){const rel=relative(resolve(root),resolve(path));assert(rel&&!rel.startsWith('..')&&!resolve(rel).startsWith('/../'));return resolve(path);}
+async function inventory(root){
+ const files=[];async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);assert(!item.isSymbolicLink(),'SYN evidence cannot contain symlink');if(item.isDirectory())await walk(path);else{assert(item.isFile());const b=await readFile(path);files.push({path:relative(root,path).replaceAll('\\','/'),bytes:b.length,sha256:sha(b)});}}}
+ await walk(root);return files.sort((a,b)=>a.path.localeCompare(b.path));
+}
+export async function verifyCheckpoint(root,{source=process.env.GITHUB_SHA}={}){
+ const manifest=JSON.parse(await readFile(join(root,'manifest.json'),'utf8'));
+ assert.equal(manifest.purpose,'afw.owner-cleanup-checkpoint.syn.v1');assert.equal(manifest.source,source);
+ assert.equal(manifest.operationalReadiness,false);assert.equal(manifest.completePackage,false);assert.equal(manifest.PCoff,false);
+ const actual=(await inventory(root)).filter(f=>f.path!=='manifest.json');assert.deepEqual(actual,manifest.files);
+ for(const [kind,pattern]of [['D1',/state\/.*d1\/.*\.sqlite$/],['DO',/state\/.*do\/.*qa-first-connection.*\.sqlite$/],['KV',/state\/.*kv\/.*\.sqlite$/]])assert(actual.some(f=>pattern.test(f.path)),'native persisted '+kind+' sqlite required');
+ for(const name of ['graphs/metafiles.json','graphs/canary-index.mjs','graphs/qa-index.mjs','checkpoint.json'])assert(actual.some(f=>f.path===name),'required evidence '+name);
+ const data=JSON.parse(await readFile(join(root,'checkpoint.json'),'utf8'));
+ assert.equal(data.plan.C0,data.plan.I0+900000);assert.equal(data.plan.C1,data.plan.C0+180000);if(data.checkpointKind==='partial-cleanup'){assert.equal(data.facts.alarm,data.plan.C0+60000);assert.equal(JSON.parse(data.facts.rows.find(([k])=>k===P+'state')[1]).deliveries,1);}else assert.equal(data.facts.alarm,data.plan.C0);
+ if(data.checkpointKind!=='partial-cleanup')assert.equal(data.facts.signal.entered,0);assert.equal(data.state.nowOffset,0);assert.equal(data.modeledProviderInput.label,'MODELED PROVIDER INPUT');
+ const qa=data.options.workers.find(w=>w.name==='qa-first-connection'),m=data.options.workers.find(w=>w.name==='canary-first-connection');
+ if(data.variant!=='grant-before-link'){
+  const ref=JSON.parse(data.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),actual=data.sdkAfterExchange;assert(actual);
+  assert.equal(actual.referenceHash,ref.recordHash);assert.equal(actual.selectorHash,sha(ref.sdkGrantId));assert.equal(actual.correlationHash,ref.correlationHash);
+  assert.equal(actual.referenceExpiresAt,null);assert.equal(ref.expiresAt,null);assert(Number.isSafeInteger(actual.expiresAt));assert(Number.isSafeInteger(actual.tokenExpiresAt));
+  assert.equal(data.sdkBeforeExchange.referenceHash,ref.recordHash);assert(Number.isSafeInteger(data.sdkBeforeExchange.nativeKVExpiration));
+  if(!data.sdkOnlyBuild)assert(actual.expiresAt*1000<=data.plan.C0);
+ }
+ assert.equal(data.options.resourcePersistencePath,'$NATIVE_STATE');
+ assert.equal(qa.kvNamespaces.AFW_FINITE_OWNER_OAUTH_KV,'first-connection-oauth');assert.equal(m.kvNamespaces.OAUTH_KV,'first-connection-oauth');
+ assert.equal(data.kvProof.namespaceId,'first-connection-oauth');assert.equal(data.kvProof.expires,false);assert.equal(sha(data.kvProof.key),data.kvProof.keyHash);
+ assert.equal(sha(qa.script),data.build.QA.sha256);assert.equal(sha(m.script),data.build.M.sha256);
+ assert.equal(sha(await readFile(join(root,'graphs/qa-index.mjs'))),data.build.QA.sha256);
+ assert.equal(sha(await readFile(join(root,'graphs/canary-index.mjs'))),data.build.M.sha256);
+ if(data.sdkOnlyBuild){
+  const extra=data.options.workers.find(w=>w.name==='sdk-only-first-connection');assert(extra);
+  assert.equal(extra.kvNamespaces.OAUTH_KV,'first-connection-oauth');assert.equal(sha(extra.script),data.sdkOnlyBuild.sha256);
+  const bytes=await readFile(join(root,'graphs/sdk-only-index.mjs'));assert.equal(bytes.length,data.sdkOnlyBuild.bytes);assert.equal(sha(bytes),data.sdkOnlyBuild.sha256);
+  const meta=JSON.parse(await readFile(join(root,'graphs/sdk-only-metafile.json'),'utf8'));assert(Object.keys(meta.inputs).some(p=>p.includes('@cloudflare/workers-oauth-provider')));
+  assert.equal(data.sdkOnlyBuild.callbackOmitted,true);assert.equal(data.sdkOnlyBuild.MAdmission,false);assert.equal(data.sdkOnlyBuild.refreshTokenTTL,0);
+ }
+ const graph=JSON.parse(await readFile(join(root,'graphs/metafiles.json'),'utf8'));
+ assert(Object.hasOwn(graph.M.inputs,'worker/mcp-own/finite.mjs'));assert(Object.keys(graph.QA.inputs).some(p=>p.endsWith('mcp-qa-finite-owner-cleanup.mjs')));
+ return {manifest,data};
+}
+function portableOptions(options,persist){
+ return JSON.parse(JSON.stringify(options,(key,value)=>{
+  if(key==='outboundService'){assert.equal(typeof value,'function');return undefined;}
+  if(key==='resourcePersistencePath'){assert.equal(value,persist);return '$NATIVE_STATE';}
+  assert.notEqual(typeof value,'function','unrecognized executable checkpoint field '+key);
+  return value;
+ }));
+}
+export async function produceCheckpoint(root,{variant='principal',deferWait=false,sdkOnly=false}={}){
+ assert(['principal','grant-before-link','notice-before-link'].includes(variant));
+ const started=Number(process.env.AFW_JOB_STARTED_MS);assert(Number.isSafeInteger(started));
+ assert(Date.now()-started<=90000,'do not open I0 without original 13min plus export margin');
+ let f;
+ try{
+  f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true});
+  if(sdkOnly){
+   assert.equal(variant,'principal');const extra=await compileCleanupSdkOnlyWorker();await f.mountCleanupSdkOnly(extra);f.cleanupSdkOnly=true;
+   const initial=await plain(f.stub.ownerCleanupFacts()),original=JSON.parse(initial.rows.find(([k])=>k===P+'plan')[1]);
+   assert(Date.now()<original.C0-300000,'late producer must wait without a live Root');
+   f.cleanupOriginalIdentityToken=await f.enrollmentToken(f.source);
+   await waitUntil(original.C0-300000);
+   f.sdkOnlyBuild={worker:'sdk-only-first-connection',sha256:extra.sha256,bytes:extra.bytes,inputs:Object.keys(extra.metafile.inputs),callbackOmitted:true,MAdmission:false,accessTokenTTL:300,refreshTokenTTL:0,namespaceId:'first-connection-oauth'};
+   const graphRoot='output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256;
+   await writeFile(graphRoot+'/sdk-only-index.mjs',extra.script);await writeFile(graphRoot+'/sdk-only-metafile.json',json(extra.metafile));
+  }
+  const prepared=await prepareOwnerReference(f);
+  if(variant==='grant-before-link')await f.stub.ownerCleanupFault(variant);
+  const response=await prepared.issue();
+  if(variant==='grant-before-link'){
+   assert.notEqual(response.status,302);await response.body?.cancel();
+   const rows=await plain(f.stub.snapshot()),native=await plain(f.stub.ownerCleanupNativeRows());assert(native.grant);assert(!rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':grant')));
+  }else{assert.equal(response.status,302);await assertActualComplete(f,{reference:true});await downstreamOwnerReference(f,response,prepared,{cleanupPartial:variant==='notice-before-link'});}
+  const partialBoundary=variant==='principal'?null:await plain(f.stub.ownerCleanupFaultFacts());if(partialBoundary)assert.equal(partialBoundary.sqlWrites,1);
+  await f.stub.ownerCleanupReset();
+  await recordOwnerReference(f,'r2-produced-'+variant);
+  await f.stub.ownerReferenceControl('released');await f.stub.firstConnectionRestore();await f.stub.restoreMethods();
+  const facts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(facts.rows.find(([k])=>k===P+'plan')[1]);
+  assert.equal(facts.signal.entered,0);assert.equal(facts.alarm,plan.C0);assert(facts.dbNow<plan.C0);assert(Math.abs(facts.dbNow-facts.wall)<=1000);
+  assert(plan.C0-120000<started+870000,'original checkpoint wait must fit job budget');
+  if(variant!=='grant-before-link')assert(facts.rows.some(([k])=>k.endsWith(':reference')));assert.equal(facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')),variant==='principal');
+  // MODELED PROVIDER INPUT, not evidence of actual Cloudflare Workflow termination.
+  f.inventoryMode='terminal';
+  const input=f.cleanupCheckpointInputs();input.state.inventoryMode='terminal';
+  input.state.providerRegistry.versions[plan.baselineVersionId]=structuredClone(input.factory.x.metadata);
+  input.state.cleanupRestorePlan=plan;
+  const clientKey='client:'+f.source.clientId,client=await f.kv.get(clientKey);assert.equal(typeof client,'string');assert.equal(JSON.parse(client).clientId,f.source.clientId);
+  const kvProof={purpose:'afw.same-oauth-kv-client.syn.v1',key:clientKey,keyHash:sha(clientKey),valueHash:sha(client),expires:false,namespaceId:'first-connection-oauth'};
+  const data={purpose:'afw.owner-cleanup-persisted-facts.syn.v1',plan,facts,kvProof,variant,partialBoundary,lateToken:f.cleanupToken??null,sdkBeforeExchange:f.sdkBeforeExchange??null,sdkAfterExchange:f.sdkAfterExchange??null,sdkOnlyBuild:f.sdkOnlyBuild??null,options:portableOptions(input.currentMountedOptions,input.persist),factory:input.factory,state:input.state,build:f.firstConnectionBuild,modeledProviderInput:{label:'MODELED PROVIDER INPUT',bootstrapStatus:'complete',recordedAt:Date.now(),realWorkflowTerminationProved:false}};
+  if(sdkOnly)assert(Date.now()<plan.C0-120000,'g5 genuine notice/link must finish before original export');
+  await f.mf.dispose();f.disposedForCheckpoint=true;
+  await mkdir(root,{recursive:true});await cp(input.persist,join(root,'state'),{recursive:true,errorOnExist:true,force:false});
+  await cp('output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256,join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
+  await writeFile(join(root,'checkpoint.json'),json(data));
+  const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:plan.I0,C0:plan.C0,C1:plan.C1,files,nativeClock: facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false};
+  await writeFile(join(root,'manifest.json'),json(manifest));await verifyCheckpoint(root);
+  console.info('R2 checkpoint produced',json({source:manifest.source,I0:plan.I0,C0:plan.C0,C1:plan.C1,nativeDbNow:facts.dbNow,files:files.length,manifestSha256:sha(await readFile(join(root,'manifest.json'))),modeledProviderInput:data.modeledProviderInput}));
+  await f.cleanup();if(!deferWait)await waitUntil(plan.C0-120000);
+  assert(Date.now()<started+885000,'export/upload margin exhausted');
+  return manifest;
+ }finally{if(f&&!f.disposedForCheckpoint){await f.mf.dispose();await f.cleanup();}}
+}
+export async function recoverCheckpoint(root,{label='principal',restart=false}={}){
+ const {data,manifest}=await verifyCheckpoint(root);
+ if(!restart)assert(Date.now()+30000<data.plan.C0,'native recovery requires >=30s original pre-C0 margin');
+ else assert(Date.now()+10000<data.plan.C1,'native restart requires original C1 margin');
+ const dest=beneath('output',join('output','r2-native-'+label));await mkdir(dest,{recursive:true});
+ await cp(join(root,'state'),join(dest,'state'),{recursive:true,errorOnExist:true,force:false});
+ const originalFiles=manifest.files.filter(x=>x.path.startsWith('state/')).map(x=>({...x,path:x.path.slice(6)}));
+ assert.deepEqual(await inventory(join(dest,'state')),originalFiles);
+ const options=JSON.parse(JSON.stringify(data.options)),f={...structuredClone(data.state),nowOffset:0};
+ const factory=data.factory,map=new Map(factory.w.map),w={pointer:factory.w.pointer,get:async p=>{assert(map.has(p),'fixed SYN provider missing original path');return structuredClone(map.get(p));}};
+ const outbound=createInitialEntrySynOutbound({...factory,w,f,built:{outputFiles:[{contents:Buffer.from(factory.qaScript)}]},cleanupCheckpoint:true});
+ options.resourcePersistencePath=join(dest,'state');
+ for(const worker of options.workers){
+  if(worker.resourcePersistencePath==='$NATIVE_STATE')worker.resourcePersistencePath=join(dest,'state');
+  worker.outboundService=worker.name==='qa-first-connection'?outbound:async()=>new Response(null,{status:503});
+ }
+ const entered=Date.now(),mf=new Miniflare(convertV4MiniflareOptions(options));f.mf=mf;
+ try{
+  const bindings=await mf.getBindings('qa-first-connection');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');
+  const current=await plain(f.stub.ownerCleanupFacts());
+  if(!restart){assert.equal(current.alarm,data.plan.C0);assert.equal(current.signal.entered,0);assert(Date.now()<data.plan.C0);}
+  assert(Math.abs(current.dbNow-current.wall)<=1000);assert(current.dbNow>=data.facts.dbNow);
+  assert.deepEqual(current.rows,data.facts.rows,'cold load preserves original native rows exactly before alarm');
+  const mKv=await mf.getKVNamespace('OAUTH_KV','canary-first-connection'),qaKv=await mf.getKVNamespace('AFW_FINITE_OWNER_OAUTH_KV','qa-first-connection');
+  for(const kv of [mKv,qaKv]){const value=await kv.get(data.kvProof.key);assert.equal(typeof value,'string');assert.equal(sha(value),data.kvProof.valueHash,'same non-expirable client after cold load');}
+  f.negative=await mf.getWorker('negative-first-connection');f.m=cleanupMTransport(mf,{currentMountedOptions:options,expectedModuleHash:data.build.M.sha256});if(data.sdkOnlyBuild)f.sdkOnly=await mf.getWorker('sdk-only-first-connection');f.kv=mKv;f.kvSemanticProof={keyHash:data.kvProof.keyHash,valueHash:data.kvProof.valueHash,bothAliases:true,expires:false};
+  await f.stub.ownerCleanupFault('normal');
+  f.plan=data.plan;f.checkpoint=data;f.directory=dest;f.recovery={entered,ready:Date.now(),nativeDbNow:current.dbNow,manifestSha256:sha(await readFile(join(root,'manifest.json')))};
+  return f;
+ }catch(error){await mf.dispose();throw error;}
+}
+export async function observeOriginalAlarm(f,{settled=1}={}){
+ const until=f.plan.C1;
+ for(;;){const signal=await plain(f.stub.ownerCleanupSignal());if(signal.settled>=settled){assert(signal.at>=f.plan.C0);return await plain(f.stub.ownerCleanupFacts());}assert(Date.now()<until,'original native alarm observation deadline');await pause(250);}
+}
+export async function writeCleanupEvidence(name,value){await mkdir('output/owner-cleanup',{recursive:true});await writeFile('output/owner-cleanup/'+name+'.json',json(value));}
+
+export async function produceGroup(group,root){
+ assert(['g0','g1','g2','g3','g4','g5'].includes(group));await mkdir(root,{recursive:true});
+ const variants=group==='g1'?['grant-before-link','notice-before-link']:['principal'],lineages=[];
+ for(const variant of variants){const manifest=await produceCheckpoint(join(root,variant),{variant,deferWait:true,sdkOnly:group==='g5'});lineages.push({variant,path:variant,I0:manifest.I0,C0:manifest.C0,C1:manifest.C1,files:manifest.files.length});}
+ const data={purpose:'afw.owner-cleanup-group.syn.v1',group,source:process.env.GITHUB_SHA,lineages,graphs:lineages.length*2+(group==='g5'?1:0),maxConcurrentNative:group==='g0'?1:2,operationalReadiness:false,PCoff:false};
+ await writeFile(join(root,'group.json'),json(data));await waitUntil(Math.min(...lineages.map(l=>l.C0))-120000);
+ assert(Date.now()<Number(process.env.AFW_JOB_STARTED_MS)+885000,'group export margin exhausted');console.info('R2 group checkpoint',json(data));
+}
+export async function verifyGroup(root){
+ const data=JSON.parse(await readFile(join(root,'group.json'),'utf8'));assert.equal(data.source,process.env.GITHUB_SHA);
+ assert(['g0','g1','g2','g3','g4','g5'].includes(data.group));
+ assert.deepEqual(data.lineages.map(l=>l.path),data.group==='g1'?['grant-before-link','notice-before-link']:['principal']);
+ assert.equal(data.graphs,data.lineages.length*2+(data.group==='g5'?1:0));
+ for(const l of data.lineages){const {manifest,data:checkpoint}=await verifyCheckpoint(join(root,l.path));assert.equal(!!checkpoint.sdkOnlyBuild,data.group==='g5');assert.equal(manifest.I0,l.I0);assert.equal(manifest.C0,l.C0);assert.equal(manifest.C1,l.C1);}
+ return data;
+}
+export async function persistPartialCleanup(f,root){
+ const facts=await plain(f.stub.ownerCleanupFacts()),state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]);assert.equal(state.deliveries,1);assert.notEqual(state.status,'complete');assert.equal(facts.alarm,f.plan.C0+60000);
+ const data={...f.checkpoint,facts,checkpointKind:'partial-cleanup',state:Object.fromEntries(Object.keys(f.checkpoint.state).map(k=>[k,structuredClone(f[k])]))};
+ assert(data.state.nowOffset===0);await f.mf.dispose();f.disposed=true;
+ await mkdir(root,{recursive:true});await cp(join(f.directory,'state'),join(root,'state'),{recursive:true,errorOnExist:true,force:false});
+ await cp(join(process.env.AFW_R2_CHECKPOINT??'output/owner-cleanup/checkpoint-g4','principal','graphs'),join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
+ await writeFile(join(root,'checkpoint.json'),json(data));
+ const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,files,nativeClock:facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false,parentManifestSha256:f.recovery.manifestSha256};
+ await writeFile(join(root,'manifest.json'),json(manifest));await verifyCheckpoint(root);return manifest;
+}
+
+/** Bind the already-required partial checkpoint into the g4 outcome envelope. */
+export async function sealCleanupG4Outcome(root){
+ const m=JSON.parse(await readFile(join(root,'evidence-manifest.json'),'utf8'));assert.equal(m.source,process.env.GITHUB_SHA);assert.equal(m.group,'g4');
+ assert.deepEqual(m.files.map(f=>f.path).sort(),['green-g4.tap','held-sdk-delete.json','restart-own-uncertainty.json']);
+ const bytes=await readFile(join(root,'g4-partial/manifest.json')),partial=JSON.parse(bytes);assert.equal(partial.source,m.source);
+ m.partialCheckpoint={path:'g4-partial',manifestSha256:sha(bytes)};await writeFile(join(root,'evidence-manifest.json'),json(m));return m.partialCheckpoint;
+}
+/** Byte/manifest audit only: never opens Miniflare, SDK, a clock or a producer. */
+export async function verifyCleanupG4Outcome(root,{expectedEvidenceSource=process.env.GITHUB_SHA,historicalArchive=false}={}){
+ assert.match(expectedEvidenceSource,/^[a-f0-9]{40}$/);
+ const m=JSON.parse(await readFile(join(root,'evidence-manifest.json'),'utf8')),names=['green-g4.tap','held-sdk-delete.json','restart-own-uncertainty.json'];
+ assert.equal(m.source,expectedEvidenceSource);assert.equal(m.group,'g4');assert.equal(m.operationalReadiness,false);assert.equal(m.completePackage,false);assert.equal(m.PCoff,false);
+ assert.deepEqual(m.files.map(f=>f.path).sort(),names);assert.deepEqual((await readdir(root)).sort(),['evidence-manifest.json','g4-partial',...names].sort());
+ for(const f of m.files){assert(!f.path.includes('/')&&!f.path.includes('..'));const bytes=await readFile(join(root,f.path));assert.equal(bytes.length,f.bytes);assert.equal(sha(bytes),f.sha256);}
+ const tap=await readFile(join(root,'green-g4.tap'),'utf8');for(const [key,value]of [['tests',2],['pass',2],['fail',0],['cancelled',0],['skipped',0],['todo',0]])assert(tap.includes('# '+key+' '+value+'\n'));
+ const partialBytes=await readFile(join(root,'g4-partial/manifest.json')),descriptor={path:'g4-partial',manifestSha256:sha(partialBytes)};
+ if(historicalArchive){assert.equal(expectedEvidenceSource,'818bc4d4e6fb1935e594951ba09d3f9536ba49d6');assert.equal(Object.hasOwn(m,'partialCheckpoint'),false,'historical envelope did not bind partial manifest');}
+ else assert.deepEqual(m.partialCheckpoint,descriptor);
+ const {manifest,data}=await verifyCheckpoint(join(root,'g4-partial'),{source:expectedEvidenceSource});assert.equal(data.checkpointKind,'partial-cleanup');
+ const held=JSON.parse(await readFile(join(root,'held-sdk-delete.json'),'utf8')),restarted=JSON.parse(await readFile(join(root,'restart-own-uncertainty.json'),'utf8'));
+ for(const v of [held,restarted]){assert.equal(v.source,expectedEvidenceSource);assert.equal(v.I0,data.plan.I0);assert.equal(v.C0,data.plan.C0);assert.equal(v.C1,data.plan.C1);assert.equal(v.receipt,null);assert.equal(v.operationalReadiness,false);}
+ assert.equal(manifest.parentManifestSha256,held.recovery.manifestSha256);assert.equal(held.state.deliveries,1);assert.equal(restarted.state.deliveries,3);assert.equal(restarted.alarm,null);assert.equal(restarted.fault.deletes,0);
+ const project=v=>({label:v.label,I0:v.I0,C0:v.C0,C1:v.C1,signal:v.signal,state:v.state.status,deliveries:v.state.deliveries,alarm:v.alarm,restores:v.restores,receiptHash:v.receipt?.recordHash??null,children:v.metrics.children.length,childMaxMs:Math.max(...v.metrics.children.map(c=>c.elapsedMs)),sqlCalls:v.metrics.sqlCalls,sqlElapsedMs:v.metrics.sqlElapsedMs,kvLists:v.metrics.kvLists,kvDeletes:v.metrics.kvDeletes,held:v.fault.held,released:v.fault.released,settled:v.fault.settled});
+ return {label:historicalArchive?'historical g4 byte audit; original job remains failed':'g4 strict outcome readback',sourceArtifact:expectedEvidenceSource,sourceVerifier:process.env.GITHUB_SHA,partialCheckpoint:descriptor,partialFiles:manifest.files.length,parentManifestSha256:manifest.parentManifestSha256,historicalEnvelopeBoundPartial:!historicalArchive,manifestAndBytesVerified:true,nativeEffectsReproduced:false,openedI0:false,results:[project(held),project(restarted)],operationalReadiness:false,completePackage:false,PCoff:false};
+}
+/** Contrast inherited Worker eval modes without reproducing Atomics.wait. */
+export async function verifyCleanupLauncherPremise(){
+ const {execFile}=await import('node:child_process'),{promisify}=await import('node:util'),run=promisify(execFile);
+ assert.equal(process.versions.node,'22.23.4');assert(!process.execArgv.includes('--input-type=module'));
+ const workerProgram="const {createRequire}=require('module');const {parentPort}=require('worker_threads');parentPort.postMessage({requireAvailable:typeof createRequire==='function'});";
+ const program="import {Worker} from 'node:worker_threads';\nconst worker=new Worker("+JSON.stringify(workerProgram)+",{eval:true});let done=false;const timer=setTimeout(()=>finish({outcome:'timeout'}),5000);async function finish(result){if(done)return;done=true;clearTimeout(timer);await worker.terminate();console.log(JSON.stringify({...result,execArgv:process.execArgv.filter(v=>v==='--input-type=module'),node:process.versions.node}));}worker.once('message',value=>finish({outcome:'success',requireAvailable:value.requireAvailable}));worker.once('error',error=>finish({outcome:'error',name:error.name,message:error.message.slice(0,200)}));\n";
+ await mkdir('output/owner-cleanup',{recursive:true});const file=resolve('output/owner-cleanup/launcher-probe.mjs');await writeFile(file,program);
+ const bad=JSON.parse((await run(process.execPath,['--input-type=module','-e',program],{timeout:15000,maxBuffer:32768})).stdout);
+ const good=JSON.parse((await run(process.execPath,[file],{timeout:15000,maxBuffer:32768})).stdout);
+ assert.equal(bad.outcome,'error');assert.equal(bad.name,'ReferenceError');assert.match(bad.message,/require is not defined/);assert.deepEqual(bad.execArgv,['--input-type=module']);
+ assert.equal(good.outcome,'success');assert.equal(good.requireAvailable,true);assert.deepEqual(good.execArgv,[]);
+ const result={label:'launcher contrast only; no Miniflare or I0',source:process.env.GITHUB_SHA,bad,good,workerProgramHash:sha(workerProgram),programHash:sha(program),sources:{nodeTag:'v22.23.4',nodeWorkerMainBlob:'f159022ee5bddd619389d22f5f19bfe7bfdb04cd',nodeWorkerDocsBlob:'4347585cb6ec054fb20d4e953d6f823436138510',miniflareTag:'miniflare@5.20260831.0-alpha',miniflareFetchSyncBlob:'ca4c161fd5a58d92cc75e60f7c6736cd1391aa39'},reproducedAtomicsBlock:false,openedI0:false,operationalReadiness:false,completePackage:false,PCoff:false};
+ await writeCleanupEvidence('launcher-probe',result);console.info('R2 launcher contrast',json(result));return result;
+}
+
+/** Genuine short SYN producer/control: early disposal, never a C0 closure claim. */
+export async function verifyCleanupMTransportPremises(){
+ assert(!process.execArgv.includes('--input-type=module'),'use fixed file CLI, not inherited module eval');let stage='sdk-compile-start';const mark=value=>{stage=value;console.info('R2 routing stage',json({stage,at:Date.now()}));};mark(stage);
+ const sdkOnly=await compileCleanupSdkOnlyWorker();assert.equal(sdkOnly.sha256,'92f6554db082c30e83c6f7ae4700544ee7438f0da349b0dc2d70594d97efe66f','unchanged accepted SDK-only component');
+ await mkdir('output/owner-cleanup',{recursive:true});await writeFile('output/owner-cleanup/sdk-only-current.mjs',sdkOnly.script);await writeFile('output/owner-cleanup/sdk-only-current-metafile.json',json(sdkOnly.metafile));
+ mark('sdk-compile-done');let f,result;
+ try{
+  mark('producer-start');f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true});
+  mark('producer-ready');mark('authorize-prepare-start');const prepared=await prepareOwnerReference(f);mark('authorize-prepare-ready');mark('authorize-issue-start');const response=await prepared.issue();assert.equal(response.status,302);mark('authorize-issue-returned');await assertActualComplete(f,{reference:true});mark('canje-downstream-start');await downstreamOwnerReference(f,response,prepared);mark('canje-downstream-done');
+  const {currentMountedOptions}=f.cleanupCheckpointInputs(),m=cleanupMTransport(f.mf,{currentMountedOptions,expectedModuleHash:f.firstConnectionBuild.M.sha256});
+  mark('M-wrapper-positive-start');const positive=await readCleanupM(m,f.cleanupToken.access_token,f.source.project.projectId);mark('M-wrapper-positive-done');
+  mark('M-wrapper-negative-start');const denied=await m.fetch('https://delegated-canary.agentfriendlyweb.dev/mcp',{method:'POST',headers:{Authorization:'Bearer SYN-invalid-control',Host:'127.0.0.1','MF-Route-Override':'qa-first-connection','Content-Type':'application/json',Accept:'application/json, text/event-stream'},body:json({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'SYN-wrapper-negative',version:'1'}}})});
+  const body=await denied.text();assert([401,403].includes(denied.status));assert(!body.includes(f.source.project.projectId));
+  mark('M-wrapper-negative-done');const facts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(facts.rows.find(([k])=>k===P+'plan')[1]);assert.equal(facts.signal.entered,0);assert(Date.now()<plan.C0);mark('original-I0-observed');
+  result={label:'SYN genuine I0 diagnostic; early dispose; not GREEN51',source:process.env.GITHUB_SHA,I0:plan.I0,C0:plan.C0,C1:plan.C1,nativeDbNow:facts.dbNow,openedI0:true,closureProved:false,fabricatedAdmission:false,positive,negative:{status:denied.status,bodyHash:sha(body),dataDenied:true},sdkOnly:{sha256:sdkOnly.sha256,bytes:sdkOnly.bytes,inputs:Object.keys(sdkOnly.metafile.inputs).length,priorHoldRun:42371140511,holdRepeated:false},expiry:f.sdkAfterExchange,operationalReadiness:false,completePackage:false,PCoff:false};
+ }catch(error){await writeCleanupEvidence('m-transport-preflight-failure',{source:process.env.GITHUB_SHA,stage,name:error.name,code:error.code??null,frames:String(error.stack??'').split('\n').filter(l=>/^\s+at\s/.test(l)).slice(0,6),closureProved:false,operationalReadiness:false});throw error;}finally{if(f){mark('dispose-start');await f.mf.dispose();mark('dispose-done');await f.cleanup();mark('temporary-cleanup-done');}}
+ result.disposedAt=Date.now();assert(result.disposedAt<result.C0);result.disposedBeforeC0=true;await writeCleanupEvidence('m-transport-preflight',result);return result;
+}
+
+/** Directed SDK component qualification, no AFW I0/alarm or business admission. */
+export async function verifyCleanupQualificationPremises(){
+ const candidate=await compileCleanupSdkOnlyWorker(),M=await compileFirstConnectionCandidate('c'.repeat(40),'d'.repeat(40));
+ assert(Object.keys(candidate.metafile.inputs).some(p=>p.includes('@cloudflare/workers-oauth-provider')));
+ assert(Object.hasOwn(M.metafile.inputs,'worker/mcp-own/finite.mjs'));
+ const source=String.raw`
+ import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
+ const O='https://delegated-canary.agentfriendlyweb.dev',server=new OAuthAuthorizationServer({issuer:O,resources:[O+'/mcp'],scopesSupported:['afw:project:read'],accessTokenTTL:300,refreshTokenTTL:0,clientIdMetadataDocumentEnabled:false});
+ export default{async fetch(request,env,ctx){
+  if(new URL(request.url).pathname!=='/_component/authorize')return server.fetch(request,env,ctx);
+  const api=server.getOAuthApi(env),input=await request.json();
+  const client=await api.createClient({redirectUris:['https://client.example/cb'],clientName:'SYN SDK qualification component',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none'});
+  const parsed=await api.parseAuthRequest(new Request(O+'/authorize?'+new URLSearchParams({client_id:client.clientId,redirect_uri:'https://client.example/cb',response_type:'code',scope:'afw:project:read',resource:O+'/mcp',state:'SYN-component',code_challenge:input.challenge,code_challenge_method:'S256'})));
+  const result=await api.completeAuthorization({request:parsed,userId:'SYN-sdk-component',scope:parsed.scope,metadata:{afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'a'.repeat(64)}},props:{componentOnly:true},revokeExistingGrants:false});
+  return Response.json({clientId:client.clientId,redirectTo:result.redirectTo});
+ }};
+`;
+ const issuer=await build({bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],stdin:{contents:source,resolveDir:process.cwd()}});
+ const base={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],kvNamespaces:{OAUTH_KV:'SYN-sdk-component-only'},outboundService:async()=>new Response(null,{status:503})};
+ await mkdir('output/owner-cleanup-preflight',{recursive:true});
+ await writeFile('output/owner-cleanup-preflight/sdk-only-index.mjs',candidate.script);await writeFile('output/owner-cleanup-preflight/sdk-only-metafile.json',json(candidate.metafile));
+ await writeFile('output/owner-cleanup-preflight/M-index.mjs',M.script);await writeFile('output/owner-cleanup-preflight/M-metafile.json',json(M.metafile));
+ await writeFile('output/owner-cleanup-preflight/component-index.mjs',issuer.outputFiles[0].text);await writeFile('output/owner-cleanup-preflight/component-metafile.json',json(issuer.metafile));
+ const mf=new Miniflare(convertV4MiniflareOptions({workers:[{...base,name:'sdk-component-issuer',script:issuer.outputFiles[0].text},{...base,name:'sdk-only-first-connection',script:candidate.script}]}));let negative,response;
+ try{
+  const O='https://delegated-canary.agentfriendlyweb.dev',owner=await mf.getWorker('sdk-component-issuer');negative=await mf.getWorker('sdk-only-first-connection');const kv=await mf.getKVNamespace('OAUTH_KV','sdk-component-issuer');
+  const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url');
+  const auth=await owner.fetch(O+'/_component/authorize',{method:'POST',body:json({challenge})});assert.equal(auth.status,200);const data=await auth.json(),code=new URL(data.redirectTo).searchParams.get('code');assert(code);
+  const listed=await kv.list({prefix:'grant:SYN-sdk-component:',limit:1});assert.equal(listed.keys.length,1);const key=listed.keys[0].name,before=JSON.parse(await kv.get(key));assert.equal(before.expiresAt,undefined);assert(Number.isSafeInteger(listed.keys[0].expiration));
+  const tokenResponse=await owner.fetch(O+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:data.clientId,redirect_uri:'https://client.example/cb',resource:O+'/mcp',code,code_verifier:verifier})});assert.equal(tokenResponse.status,200);
+  const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');assert.equal(token.refresh_token,undefined);assert.equal(token.expires_in,300);
+  const after=JSON.parse(await kv.get(key));assert.equal(after.id,before.id);assert(Number.isSafeInteger(after.expiresAt));assert(after.expiresAt*1000>Date.now());assert.deepEqual(after.metadata,before.metadata);
+  response=await negative.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST',headers:{'Content-Type':'application/json'},body:json({subjectToken:token.access_token,sdkGrantId:before.id,clientId:data.clientId,correlationHash:'a'.repeat(64),referenceHash:'b'.repeat(64),C0:Date.now()+75000})});assert.equal(response.status,403);
+  const held=await (await negative.fetch(O+'/_fixture/sdk-only-signal')).json();assert(held.reached&&held.retained&&!held.settled);assert.equal(held.logicalReason,'deadline');
+  const busy=await negative.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST'});assert.equal(busy.status,409);await busy.body?.cancel();
+  const body=response.text();await waitUntil(held.rootStartedAt+80000);await negative.fetch(O+'/_fixture/sdk-only-release');assert.equal(await body,'SYN SDK-only denied');
+  const settled=await (await negative.fetch(O+'/_fixture/sdk-only-signal')).json();assert(settled.settled&&!settled.retained);assert(settled.nativeReturned&&settled.sdkReturned);
+  const result={purpose:'afw.cleanup-sdk-premises.component.syn.v1',source:process.env.GITHUB_SHA,noAFWI0:true,noBusinessAdmission:true,componentOnly:true,originalGrant:sha(before.id),preExchangeExpiresAt:null,codeKVExpiration:listed.keys[0].expiration,postExchangeExpiresAt:after.expiresAt,actualAccessTTL:token.expires_in,refreshAbsent:true,held,settled,M:{sha256:sha(M.bytes),bytes:M.bytes.length,inputs:Object.keys(M.metafile.inputs).length},SDKOnly:{sha256:candidate.sha256,bytes:candidate.bytes,inputs:Object.keys(candidate.metafile.inputs).length},operationalReadiness:false,completePackage:false,PCoff:false};
+  await writeFile('output/owner-cleanup-preflight/result.json',json(result));console.info('R2 directed SDK premises',json(result));
+ }catch(error){
+  const signal=negative?await (await negative.fetch('https://delegated-canary.agentfriendlyweb.dev/_fixture/sdk-only-signal')).json().catch(()=>null):null;
+  await writeFile('output/owner-cleanup-preflight/failure.json',json({source:process.env.GITHUB_SHA,noAFWI0:true,name:error.name,message:error.message,signal}));throw error;
+ }finally{
+  if(negative)await negative.fetch('https://delegated-canary.agentfriendlyweb.dev/_fixture/sdk-only-release').catch(()=>{});
+  await mf.dispose();const files=await inventory('output/owner-cleanup-preflight');await writeFile('output/owner-cleanup-preflight/manifest.json',json({source:process.env.GITHUB_SHA,files}));
+ }
+}
+
+
+/** PURE modeled response oracle against the exact archived M profile; no MF/SDK/I0. */
+export async function verifyCleanupDenialOracle(root,{expectedEvidenceSource}){
+ assert.equal(expectedEvidenceSource,'e5f96c1802e7ee2d5d242f9d4887df6bfeda33fb');
+ const {manifest,data}=await verifyCheckpoint(root,{source:expectedEvidenceSource}),bytes=await readFile(join(root,'manifest.json'));
+ assert.equal(sha(bytes),'5e81a7aa27d82aacc0bcac5b1392c14a36d3bdef6fbcea0bf78e5c2836e9299b');assert.equal(manifest.files.length,47);
+ const m=data.options.workers.find(w=>w.name==='canary-first-connection'),profile=cleanupMProfile(m,data.options.upstream);
+ assert.equal(profile.optionsHash,'bd1608ef915f46e9125301d7ff4b329ee608db777ea7ae3e9a819e61890cc93e');
+ assert.equal(profile.bindingsHash,'b3fb9ed039924267081ed78b2597208816b50a0491edc612a314650a03ab45dc');
+ assert.equal(profile.serviceExpiresAt,'2026-11-07T13:59:50.000Z');assert.equal(Date.parse(profile.serviceExpiresAt),data.plan.C0);
+ const anchors=[['lib/delegated-oauth-worker.mjs','d979f395029c9b1e66a99222d06acf99eba4f358'],['lib/delegated-project-mcp.mjs','39b91fe6332964b6229913bb88ff9e665b513f76'],['lib/delegated-project-read.mjs','e059e54c32b12455c2c1eeb251a668bb3ed55e82']];
+ for(const [path,expected]of anchors){const b=await readFile(path),actual=createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');assert.equal(actual,expected);}
+ const C0=data.plan.C0,result={isError:true,status:403,code:'delegated_access_denied',hasData:false};
+ const response={method:'POST',rpcMethod:'initialize',tool:null,startedAt:C0+1,finishedAt:C0+2,status:404,bodyKind:'html',bodyHash:sha('PURE MODELED RESPONSE; no observed HTTP'),closedWindowBody:true,containsExpectedData:false,containsCredential:false,readFailed:false,jsonRpc:null};
+ const base={operation:'read_project_summary',originalC0:C0,profile,profileCurrent:true,responses:[response],toolResult:null},cases=[];
+ const check=(name,change,layer='unproved')=>{const candidate=structuredClone(base);change(candidate);const actual=classifyCleanupMDenial(candidate);cases.push({name,expected:layer,actual:actual.layer,dataDenied:actual.dataDenied});assert.equal(actual.layer,layer,name);assert.equal(actual.dataDenied,layer!=='unproved',name);};
+ check('exact expired original window gives closed service only',()=>{},'service_window_closed');
+ check('404 before original expiry is unknown',o=>{o.responses[0].startedAt=C0-2;o.responses[0].finishedAt=C0-1;});
+ check('404 unknown body is not denial',o=>{o.responses[0].closedWindowBody=false;});
+ check('HTTP500 cannot prove denial',o=>{o.responses[0].status=500;});
+ check('timeout without response cannot prove denial',o=>{o.responses=[];o.error={type:'TimeoutError'};});
+ check('initialize200 alone cannot prove denial',o=>{Object.assign(o.responses[0],{status:200,bodyKind:'json',jsonRpc:{version:'2.0',kind:'result'}});});
+ check('protocol error cannot prove denial',o=>{Object.assign(o.responses[0],{status:200,bodyKind:'json',jsonRpc:{version:'2.0',kind:'error',errorCode:-32600}});});
+ check('successful data must reject',o=>{Object.assign(o.responses[0],{rpcMethod:'tools/call',tool:'read_project_summary',status:200,bodyKind:'json',containsExpectedData:true,jsonRpc:{version:'2.0',kind:'result'}});o.toolResult={isError:false,status:200,hasData:true};});
+ check('unknown script must reject',o=>{o.profile.scriptHash='0'.repeat(64);});
+ check('unknown flag inventory must reject',o=>{o.profile.flags.EXTRA_ENABLED='false';});
+ check('disabled default must reject',o=>{o.profile.flags.AFW_DELEGATED_OAUTH_ENABLED='false';});
+ check('profile drift must reject',o=>{o.profileCurrent=false;});
+ check('wrong origin must reject',o=>{o.profile.upstream='https://wrong.invalid';});
+ check('wrong route must reject',o=>{o.profile.path='/qa';});
+ check('wrong method must reject',o=>{o.responses[0].method='GET';});
+ check('body read failure must reject',o=>{o.responses[0].readFailed=true;});
+ const semantic=o=>{Object.assign(o.responses[0],{startedAt:C0-2,finishedAt:C0-1,rpcMethod:'tools/call',tool:'read_project_summary',status:200,bodyKind:'json',jsonRpc:{version:'2.0',kind:'result',result}});o.toolResult=result;};
+ check('live-window MCP semantic403 without data',semantic,'business_grant_denied');
+ check('semantic error still cannot contain data',o=>{semantic(o);o.toolResult={...result,hasData:true};o.responses[0].jsonRpc.result=o.toolResult;});
+ check('generic application503 is not denial',o=>{semantic(o);o.toolResult={...result,status:503,code:'delegated_read_unavailable'};o.responses[0].jsonRpc.result=o.toolResult;});
+ check('expired-window HTTP200 contradicts fixed branch',o=>{semantic(o);o.responses[0].startedAt=C0+1;o.responses[0].finishedAt=C0+2;});
+ const oauth=(o,status,error)=>{Object.assign(o.responses[0],{startedAt:C0-2,finishedAt:C0-1,status,bodyKind:status===401?'empty':'json',oauthError:status===403?error:null,oauthChallenge:{bearer:true,error,metadata:'https://delegated-canary.agentfriendlyweb.dev/.well-known/oauth-protected-resource/mcp'}});};
+ check('live-window native401 invalid_token challenge',o=>oauth(o,401,'invalid_token'),'sdk_token_rejection');
+ check('live-window native403 insufficient_scope challenge',o=>oauth(o,403,'insufficient_scope'),'sdk_scope_rejection');
+ check('generic401 without genuine challenge rejects',o=>{oauth(o,401,'invalid_token');o.responses[0].oauthChallenge.bearer=false;});
+ check('expired-window401 contradicts fixed branch',o=>{oauth(o,401,'invalid_token');o.responses[0].startedAt=C0+1;o.responses[0].finishedAt=C0+2;});
+ const audit={label:'PURE modeled denial oracle; no new M observation',sourceArtifact:expectedEvidenceSource,sourceVerifier:process.env.GITHUB_SHA,artifactId:13576692464,runId:42377143830,manifestSha256:sha(bytes),files:manifest.files.length,profile,anchors,cases,assertions:cases.length*2,originalFailedHttp:'UNKNOWN',workerMounted:false,newI0:false,SDKExecuted:false,newBusinessClosureProved:false,operationalReadiness:false,completePackage:false,PCoff:false};
+ await writeFile('g5-oracle-result.json',json(audit));console.info('R2 pure denial oracle',JSON.stringify(audit));return audit;
+}
+
+if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
+ const [command,root='output/owner-cleanup/checkpoint-g0',group='g0']=process.argv.slice(2);
+ if(command==='preflight')await verifyCleanupQualificationPremises();
+ else if(command==='launcher-probe')await verifyCleanupLauncherPremise();
+ else if(command==='oracle-preflight')await verifyCleanupDenialOracle(root,{expectedEvidenceSource:group});
+ else if(command==='routing-preflight')console.info('R2 M routing preflight',json(await verifyCleanupMTransportPremises()));
+ else if(command==='prepare')await produceCheckpoint(root);
+ else if(command==='prepare-group')await produceGroup(group,root);
+ else if(command==='verify-group')console.info('R2 group uploaded readback',json(await verifyGroup(root)));
+ else if(command==='verify'){const {manifest}=await verifyCheckpoint(root);console.info('R2 artifact exact readback',json({source:manifest.source,files:manifest.files.length,C0:manifest.C0}));}
+ else throw Error('SYN fixed checkpoint command');
+}
`````

### test/fixtures/finite-owner-cleanup.mjs

`````diff
diff --git a/test/fixtures/finite-owner-cleanup.mjs b/test/fixtures/finite-owner-cleanup.mjs
--- a/test/fixtures/finite-owner-cleanup.mjs
+++ b/test/fixtures/finite-owner-cleanup.mjs
@@ -1,79 +1,278 @@
+import {build as buildCleanupComponent} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,writeFile} from 'node:fs/promises';
 import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
 import {initialEntryHarness} from './finite-initial-entry-world.mjs';
 import {plain,approveFirstConnection,readFirstConnectionProbe} from './finite-first-connection-publication.mjs';
 import {sealFiniteOwnerIssuerProvenanceRecord as seal} from '../../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';
 import {sealFinitePreparationIssuerRecord as issuerSeal} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
 export const O='https://delegated-canary.agentfriendlyweb.dev';
 export function extendFiniteOwnerCleanup(entry){
  const methods="\n async ownerReferenceConfigure(mode='normal'){\n  this.ownerReferenceRestore?.();const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,s=this.ctx.storage,native={get:kv.get,list:kv.list,put:kv.put,storageGet:s.get,sync:s.sync,transaction:s.transaction};\n  const state=this.ownerReferenceState={mode,completeWrites:0,completeNormal:0,lists:0,gets:0,active:0,peak:0,held:false,released:false,actualSettled:false,abort:false,referenceCommits:0,referenceSyncs:0,referenceReadbacks:0,requests:[],children:[],trace:[]};globalThis.__r1ReferenceState=state;let referencePending=false;\n  const held=value=>{state.held=true;return new Promise(resolve=>{const tick=()=>{if(state.released){state.actualSettled=true;resolve(value);return;}setTimeout(tick,10);};tick();});};\n  this.ownerReferenceRestore=()=>{kv.get=native.get;kv.list=native.list;kv.put=native.put;s.get=native.storageGet;s.sync=native.sync;s.transaction=native.transaction;globalThis.__r1ReferenceState=null;};\n  kv.put=async(key,raw,...more)=>{\n   if(!key.startsWith('grant:'))return Reflect.apply(native.put,kv,[key,raw,...more]);\n   state.completeWrites++;state.trace.push('actual-grant-put');\n   if(mode==='foreign-metadata'){const value=JSON.parse(raw);value.metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'f'.repeat(64)}};raw=JSON.stringify(value);}\n   const actual=Reflect.apply(native.put,kv,[key,raw,...more]),result=await actual;\n   if(mode==='duplicate'){const value=JSON.parse(raw),id=value.id==='AAAAAAAAAAAAAAAA'?'BBBBBBBBBBBBBBBB':'AAAAAAAAAAAAAAAA';value.id=id;await Reflect.apply(native.put,kv,[key.slice(0,key.lastIndexOf(':')+1)+id,JSON.stringify(value),...more]);}\n   return result;\n  };\n  for(const method of ['get','list'])kv[method]=async(...args)=>{\n   const grant=method==='get'?String(args[0]).startsWith('grant:'):String(args[0]?.prefix).startsWith('grant:');\n   if(!grant)return Reflect.apply(native[method],kv,args);\n   state[method==='get'?'gets':'lists']++;if(method==='list'){if(args[0].limit!==100)throw Error('SYN native list limit');state.nativeListLimit=args[0].limit;}state.active++;state.peak=Math.max(state.peak,state.active);\n   const actual=Reflect.apply(native[method],kv,args);let value;try{value=await actual;state.trace.push('actual-'+method+'-settled');}finally{state.active--;}\n   // Held outward ACK chain AFTER native settlement; not physical KV latency.\n   if(method==='list'&&mode==='hold-lookup-ack'&&!state.held)return held(value);\n   return value;\n  };\n  s.transaction=(callback,...args)=>{\n   let wrote=false;const actual=Reflect.apply(native.transaction,s,[async tx=>{\n    const put=tx.put;tx.put=async(key,raw,...rest)=>{const value=await Reflect.apply(put,tx,[key,raw,...rest]);if(String(key).endsWith(':reference')){referencePending=true;wrote=true;state.trace.push('reference-put-native-settled');}return value;};return callback(tx);\n   },...args]);\n   return actual.then(value=>{if(wrote){state.referenceCommits++;state.trace.push('reference-transaction-native-settled');}return value;});\n  };\n  s.get=async(...args)=>{const value=await Reflect.apply(native.storageGet,s,args);if(String(args[0]).endsWith(':reference')&&value!==undefined&&state.referenceSyncs){state.referenceReadbacks++;state.trace.push('reference-readback-native-settled');}return value;};\n  s.sync=async(...args)=>{const actual=Reflect.apply(native.sync,s,args),value=await actual;if(referencePending){referencePending=false;state.referenceSyncs++;state.trace.push('reference-sync-native-settled');if(mode==='unknown-reference')throw Error('SYN reference sync ACK unknown');if(mode==='abort-reference-sync-ack')return held(value);}return value;};\n }\n async ownerReferenceObserve(signalsOnly=false){if(typeof signalsOnly!=='boolean')throw Error('SYN fixed signal projection');const state=this.ownerReferenceState??{};if(signalsOnly)return {held:state.held===true,actualSettled:state.actualSettled===true};return {...state,rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})]};}\n async ownerReferenceControl(key){if(!['released','abort'].includes(key))throw Error('SYN control');this.ownerReferenceState[key]=true;}\n async ownerReferenceFetch(request,forward){\n  const state=this.ownerReferenceState;if(!state||request.url!=='https://afw-private.invalid/_finite-owner/authorize')return forward(request);\n  const began=performance.now(),startedAt=Date.now(),method=request.headers.get('x-afw-finite-original-method'),boundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));const controller=new AbortController(),abort=()=>controller.abort();request.signal.addEventListener('abort',abort,{once:true});let done=false,timer;\n  const tick=()=>{if(done)return;if(state.abort){controller.abort();return;}timer=setTimeout(tick,10);};tick();\n  try{const response=await forward(new Request(request,{signal:controller.signal}));state.trace.push('native-authorize-response:'+response.status);return response;}finally{state.requests.push({method,startedAt,elapsedMs:performance.now()-began,wallElapsedMs:Date.now()-startedAt,budgetMs:boundary.deadline-boundary.startedAt,aborted:controller.signal.aborted});done=true;clearTimeout(timer);request.signal.removeEventListener('abort',abort);}\n }\n";
+
+ const cleanupMethods=String.raw`
+ async ownerCleanupFault(mode){
+  if(!['normal','grant-before-link','notice-before-link','fence-ack-lost','held-sdk-delete','paging-scope'].includes(mode))throw Error('SYN fixed cleanup fault');
+  this.ownerCleanupFaultRestore?.();
+  const db=this.env.RELEASE_DB,session=db.withSession,kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,del=kv.delete,list=kv.list;
+  const state=this.cleanupFaultState={mode,sqlWrites:0,sqlCalls:0,sqlElapsedMs:0,reconciles:0,lists:0,deletes:0,held:false,released:false,settled:false,scopeProbe:null,trace:[]};
+  this.ownerCleanupFaultRestore=()=>{db.withSession=session;kv.delete=del;kv.list=list;};
+  db.withSession=(...a)=>{
+   const s=Reflect.apply(session,db,a),prepare=s.prepare;
+   s.prepare=(sql,...rest)=>{
+    if(sql.includes('SELECT f.*'))state.reconciles++;
+    const stmt=Reflect.apply(prepare,s,[sql,...rest]),bind=stmt.bind;
+    stmt.bind=(...values)=>{
+     const bound=Reflect.apply(bind,stmt,values),first=bound.first;
+     bound.first=async(...args)=>{
+      const target=mode==='grant-before-link'&&sql.includes('INSERT INTO delegated_access_grants')||mode==='notice-before-link'&&sql.includes('INSERT INTO dossier_monitoring_consent_events')||mode==='fence-ack-lost'&&sql.includes('INSERT INTO finite_preparation_issuer_fences');
+      state.sqlCalls++;const started=performance.now(),actual=Reflect.apply(first,bound,args),value=await actual;state.sqlElapsedMs+=performance.now()-started;
+      if(target){state.sqlWrites++;state.trace.push({kind:mode,at:Date.now(),actualRow:!!value});if(value)throw Error('SYN actual SQL result lost before link');}
+      return value;
+     };return bound;
+    };return stmt;
+   };return s;
+  };
+  kv.list=async options=>{
+   state.lists++;state.trace.push({kind:'list',at:Date.now(),limit:options.limit,prefixHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(options.prefix)).then(b=>Buffer.from(b).toString('hex'))});
+   const value=await Reflect.apply(list,kv,[options]);
+   if(mode!=='paging-scope')return value;
+   if(state.lists===1)return {keys:Array.from({length:100},(_,n)=>({name:options.prefix+'SYN-token-'+n})),list_complete:false,cursor:'SYN-second-page'};
+   return {keys:[{name:'client:SYN-forbidden-extra-IO'}],list_complete:true};
+  };
+  kv.delete=async key=>{
+   state.deletes++;state.trace.push({kind:'delete',at:Date.now(),scope:key.startsWith('token:')?'token':key.startsWith('grant:')?'grant':'foreign'});
+   const actual=Reflect.apply(del,kv,[key]),value=await actual;
+   if(mode==='held-sdk-delete'&&!state.held){
+    state.held=true;state.trace.push({kind:'actual-native-delete-settled-ACK-held',at:Date.now()});
+    await new Promise(resolve=>{this.releaseCleanupHeld=resolve;});state.settled=true;state.trace.push({kind:'held-ACK-released',at:Date.now()});
+   }return value;
+  };
+ }
+ async ownerCleanupReset(){this.ownerCleanupFaultRestore?.();}
+ async ownerCleanupControl(){this.cleanupFaultState.released=true;this.releaseCleanupHeld?.();this.releaseCleanupHeld=null;}
+ async ownerCleanupFaultSignal(){const s=this.cleanupFaultState;return s?{mode:s.mode,held:s.held,settled:s.settled,deletes:s.deletes,lists:s.lists,sqlWrites:s.sqlWrites,reconciles:s.reconciles}:null;}
+ async ownerCleanupFaultFacts(){return this.cleanupFaultState??null;}
+ async ownerCleanupScopeProbe(){
+  const controller=new AbortController(),at=Date.now(),lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()-at>=5000)throw Error('SYN probe lifetime');}});
+  try{await observeFiniteReadOnlyWork({ctx:this.ctx,env:this.env,originalLease:lease},async()=>true);return {available:true,at};}
+  catch{return {available:false,at};}finally{controller.abort();}
+ }
+ async ownerCleanupNativeRows(){
+  const rows=await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:',limit:16}),reservation=[...rows].find(([k])=>k.endsWith(':reservation'));
+  if(!reservation)return {fence:null,grant:null,notices:[]};
+  const i=JSON.parse(reservation[1]).identity,db=this.env.RELEASE_DB;
+  return {fence:await db.prepare('SELECT * FROM finite_preparation_issuer_fences WHERE preconnection_id=?').bind(i.preconnectionId).first(),grant:await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first(),notices:(await db.prepare('SELECT * FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence').bind(i.grantId).all()).results};
+ }
+
+ async alarm(){
+  const signal=this.cleanupAlarmSignal??={entered:0,settled:0,status:null,at:null,finishedAt:null};
+  signal.entered++;signal.at=Date.now();
+  try{const result=await super.alarm();signal.status=result?.status??null;return result;}
+  finally{signal.settled++;signal.finishedAt=Date.now();}
+ }
+ async ownerCleanupSignal(){return this.cleanupAlarmSignal??{entered:0,settled:0,status:null,at:null,finishedAt:null};}
+ async ownerCleanupFacts(){
+  const dbNow=await this.env.RELEASE_DB.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS now").first();
+  return {dbNow:dbNow.now,wall:Date.now(),alarm:await this.ctx.storage.getAlarm(),rows:[...await this.ctx.storage.list()],signal:await this.ownerCleanupSignal(),failures:globalThis.__r2CleanupFailures??[],children:globalThis.__r2CleanupChildren??[]};
+ }
+ `;
  const marker=' export class Initial extends FiniteClosure{';assert.equal(entry.split(marker).length,2);
  const original='actual=super.fetch(request);';assert.equal(entry.split(original).length,2);
- return entry.replace(marker,()=>marker+methods).replace(original,()=>'actual=this.ownerReferenceFetch(request,r=>super.fetch(r));');
+ return ("import {observeFiniteReadOnlyWork} from './lib/mcp-qa-finite-stage-work.mjs';\n"+entry).replace(marker,()=>marker+methods+cleanupMethods).replace(original,()=>'actual=this.ownerReferenceFetch(request,r=>super.fetch(r));');
 }
 export function instrumentFiniteOwnerCleanup(source){
  const marker="actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();";assert.equal(source.split(marker).length,2);
  source=source.replace(marker,()=>marker+"if(op==='sdk_complete'&&globalThis.__r1ReferenceState){globalThis.__r1ReferenceState.completeNormal++;globalThis.__r1ReferenceState.trace.push('actual-sdk-complete-normal');}");
  const lookup="const summary=await withChild(l=>readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l));";
  if(source.includes(lookup)){assert.equal(source.split(lookup).length,2);source=source.replace(lookup,()=>"const summary=await withChild(async l=>{const state=globalThis.__r1ReferenceState,at=performance.now(),metric={budgetMs:5000};if(state)state.lookupChild=metric;try{return await readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l);}finally{metric.actualElapsedMs=performance.now()-at;metric.aborted=l.signal.aborted;}});");}
  const child="const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});";
  assert.equal(source.split(child).length,2);source=source.replace(child,()=>"const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const state=globalThis.__r1ReferenceState,at=performance.now(),metric={position,startedAt:Date.now(),deadline:until,steps:[]};if(state){state.children.push(metric);state.activeMetric=metric;}try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{metric.endPosition=position;metric.actualElapsedMs=performance.now()-at;metric.aborted=l.signal.aborted;if(state)state.activeMetric=null;activeChild=null;}});");
  for(const marker of ["async function issuerCall(op,window,call){","async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){"]){assert.equal(source.split(marker).length,2);const name=marker.includes('issuerCall')?'op':'kind';source=source.replace(marker,()=>marker+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:"+name+",at:performance.now()});");}
  const pair="(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});";assert.equal(source.split(pair).length,2);
  source=source.replace(pair,()=>pair+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:'source-pair',elapsedMs:performance.now()-observedAt,at:performance.now()});");
  const io="const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};";assert.equal(source.split(io).length,2);source=source.replace(io,()=>io+"io.enteredAt=performance.now();io.childStartedAt=globalThis.__r1ReferenceState?.activeMetric?.startedAt??null;");
  const guard="io.reads++;io.bytes+=part.value?.byteLength??0;current(l);";assert.equal(source.split(guard).length,2);source=source.replace(guard,()=>"io.reads++;io.bytes+=part.value?.byteLength??0;const guardAt=performance.now();try{current(l);}finally{io.bodyGuardMs=(io.bodyGuardMs??0)+performance.now()-guardAt;}");
  const settled="io.settled=true;}";assert.equal(source.split(settled).length,2);source=source.replace(settled,()=>"io.elapsedMs=performance.now()-io.enteredAt;io.settled=true;}");
  return source;
 }
-export async function ownerReferenceFixture(t){
- const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true});
+export async function ownerReferenceFixture(t,{cleanupCheckpoint=false}={}){
+ const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint});f.cleanupQualification=cleanupCheckpoint;
  t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}finally{await f.mf.dispose();await f.cleanup();}});
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await f.mountFirstConnection();await f.stub.firstConnectionConfigure('normal');
  const initial=f.firstConnectionBuild.M;assert.equal(initial.sha256,f.resident.module.sha256);assert(initial.inputs.includes('worker/mcp-own/finite.mjs'));
  const connected=await approveFirstConnection(f);assert.equal(connected.status,200);await connected.body?.cancel();const probe=await readFirstConnectionProbe(f),receipt=JSON.parse(probe.rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'))[1]);assert.equal(receipt.moduleHash,initial.sha256);
  const closed=f.providerRegistry.versions[receipt.baselineVersionId],installed=f.providerRegistry.versions[receipt.versionId];assert.equal(installed.modules[0].content_base64,closed.modules[0].content_base64,'initial and connection share actual current bytes');
  await f.adoptConnectionConfiguration({upstream:true});const context=await plain(f.stub.firstConnectionContext());assert.equal(context.source?.phase,'read_consent');f.source=context.source;
  f.kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');await f.kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN reference client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));return f;
 }
 export async function prepareOwnerReference(f,fault='normal'){
- await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
+ await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':f.cleanupOriginalIdentityToken??await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
  const screen=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-reference-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
  assert.equal(screen.status,200);const text=await screen.text(),handle=/name="handle" value="([^"]+)"/.exec(text)?.[1],cookie=screen.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
  const issue=()=>f.call('/authorize',{method:'POST',redirect:'manual',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});return {issue,headers,verifier};
 }
 export async function assertActualComplete(f,{reference=false}={}){
  const observed=await plain(f.stub.ownerReferenceObserve()),rows=observed.rows;
  assert.equal(observed.completeWrites,1,'one actual SDK grant effect');assert.equal(observed.completeNormal,1,'actual SDK complete fulfilled normally');assert(rows.some(([k])=>k.endsWith(':sdk_complete:observed')),'actual complete observation durable');
  const ref=rows.find(([k])=>k.endsWith(':reference'));if(reference)assert(ref,'R1 missing durable SDK Reference AFTER actual completeAuthorization');return {observed,reference:ref?JSON.parse(ref[1]):null};
 }
 export async function recordOwnerReference(f,label,extra={}){
  const o=await plain(f.stub.ownerReferenceObserve()),state=await plain(f.stub.firstConnectionState());
  assert(o.lists<=2&&o.gets<=200&&o.peak<=2,'native KV calls stay within fixed budget');
  const result={label,testRevision:process.env.GITHUB_SHA??null,M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes},completeWrites:o.completeWrites,completeNormal:o.completeNormal,referenceRows:o.rows.filter(([k])=>k.endsWith(':reference')).length,lists:o.lists,gets:o.gets,peak:o.peak,listLimit:o.nativeListLimit??null,trace:o.trace,requests:o.requests,children:o.children,lookupChild:o.lookupChild??null,referenceReadbacks:o.referenceReadbacks,sdkSuffixes:o.rows.map(([key])=>key.split(':').slice(2).join(':')),roots:(await plain(f.stub.firstConnectionProbe())).calls.map(c=>({method:c.originalMethod,windowMs:c.boundary.deadline-c.boundary.startedAt})),httpSpans:state.http.filter(v=>Number.isSafeInteger(v.childStartedAt)).map(v=>({kind:v.kind,bytes:v.bytes,elapsedMs:v.elapsedMs,bodyGuardMs:v.bodyGuardMs??0,childStartedAt:v.childStartedAt})),http:state.http.reduce((a,v)=>({requests:a.requests+1,bytes:a.bytes+v.bytes}),{requests:0,bytes:0}),completePackage:false,operationalReadiness:false,PCoff:false,custodyReal:false,...extra};
  await mkdir('output/owner-reference',{recursive:true});await writeFile('output/owner-reference/'+label+'.json',JSON.stringify(result,null,2));console.info('R1 sanitized native marker',JSON.stringify(result));return result;
 }
-export async function downstreamOwnerReference(f,response,prepared){
+export async function downstreamOwnerReference(f,response,prepared,{cleanupPartial=false}={}){
  const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);await response.body?.cancel();
- const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:prepared.verifier})});assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');
+ if(f.cleanupQualification){
+  const rows=await plain(f.stub.ownerReferenceObserve()),ref=JSON.parse(rows.rows.find(([k])=>k.endsWith(':reference'))[1]),native=await plain(f.stub.ownerCleanupNativeRows()),key='grant:'+native.grant.user_id+':'+ref.sdkGrantId;
+  const raw=JSON.parse(await f.kv.get(key)),listed=await f.kv.list({prefix:key,limit:1});assert.equal(listed.keys[0]?.name,key);assert(Number.isSafeInteger(listed.keys[0].expiration));assert.equal(raw.expiresAt,undefined);
+  f.sdkBeforeExchange={referenceHash:ref.recordHash,grantExpiresAt:null,nativeKVExpiration:listed.keys[0].expiration,createdAt:raw.createdAt,observedAt:Date.now()};
+ }
+ const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:prepared.verifier})});assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');f.cleanupToken=token;
+ if(f.cleanupQualification)f.sdkAfterExchange=await observeCleanupSdkExchange(f,token);
  const client=new Client({name:'SYN-owner-reference',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  try{await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(O).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));const result=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(result.isError,undefined);assert.equal(result.structuredContent.data.id,f.source.project.projectId);}finally{await client.close();}
  const screen=await f.call('/monitoring',{headers:prepared.headers});assert.equal(screen.status,200);const html=await screen.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1],cookie=screen.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
- const posted=await f.call('/monitoring/grant',{method:'POST',headers:{...prepared.headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle})});assert.equal(posted.status,200);await posted.body?.cancel();
- const rows=await plain(f.stub.snapshot()),root=JSON.parse(rows.find(([key])=>key.endsWith(':root')&&key.startsWith('afw.finite-owner-issuer-provenance.v1:'))[1]);assert(rows.some(([k])=>k==='connection-preparation:'+root.preconnectionId+':notice'));
+ if(cleanupPartial)await f.stub.ownerCleanupFault('notice-before-link');
+ const posted=await f.call('/monitoring/grant',{method:'POST',headers:{...prepared.headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle})});if(cleanupPartial)assert.notEqual(posted.status,200);else assert.equal(posted.status,200);await posted.body?.cancel();
+ const rows=await plain(f.stub.snapshot()),root=JSON.parse(rows.find(([key])=>key.endsWith(':root')&&key.startsWith('afw.finite-owner-issuer-provenance.v1:'))[1]);assert.equal(rows.some(([k])=>k==='connection-preparation:'+root.preconnectionId+':notice'),!cleanupPartial);
 }
 export async function waitReferenceState(f,predicate){
  const until=performance.now()+30000;for(;;){let v=await plain(f.stub.ownerReferenceObserve(true));if(predicate(v))return v;if(performance.now()>=until){v=await plain(f.stub.ownerReferenceObserve());const data={purpose:'afw.owner-reference-timeout-diagnostic.syn.v1',mode:v.mode,completeWrites:v.completeWrites,completeNormal:v.completeNormal,held:v.held,actualSettled:v.actualSettled,referenceCommits:v.referenceCommits,referenceSyncs:v.referenceSyncs,referenceReadbacks:v.referenceReadbacks,requests:v.requests,lookupChild:v.lookupChild??null,children:v.children,sdkSuffixes:v.rows.map(([key])=>key.split(':').slice(2).join(':')),lists:v.lists,gets:v.gets,peak:v.peak,trace:v.trace,operationalReadiness:false,completePackage:false,PCoff:false};await mkdir('output/owner-reference',{recursive:true});await writeFile('output/owner-reference/diagnostic-timeout-'+v.mode+'.json',JSON.stringify(data,null,2));console.info('R1 DIAGNOSTIC last collected state',JSON.stringify({...data,children:data.children?.map(c=>({ms:c.actualElapsedMs??null,aborted:c.aborted??null,operations:c.steps.filter(s=>s.operation!=='source-pair').map(s=>s.operation),sourcePairs:c.steps.filter(s=>s.operation==='source-pair').map(s=>s.elapsedMs)}))}));assert.fail('bounded native marker wait');}await new Promise(resolve=>setTimeout(resolve,20));}
 }
 export function syntheticSdkReferenceComponent(){
  const h=x=>x.repeat(64),I0=1800000000000,C0=I0+900000,C1=C0+180000,qa='11111111-1111-4111-8111-111111111111';
  const identity=issuerSeal('Identity',{preconnectionId:h('1'),enrollmentHash:h('2'),capsuleHash:h('3'),sourceRevision:'a'.repeat(40),qaVersionId:qa,actorId:h('4'),subject:'SYN-component-owner',accessRealmHash:h('5'),projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:O+'/mcp',authorizationHash:h('6'),grantId:'22222222-2222-4222-8222-222222222222',requestedScopes:['afw:project:read'],consentExpiresAt:new Date(C0).toISOString(),I0,C0,C1,reservedAt:I0+10});
  const root=seal('Root',{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:identity.preconnectionId,capsuleHash:identity.capsuleHash,enrollmentHash:identity.enrollmentHash,sourceRevision:identity.sourceRevision,actorId:identity.actorId,qaVersionId:qa,mVersionId:qa,originalConnectionReceiptHash:h('7'),I0,C0,C1,createdAt:I0});
  const makeSend=(operation,bindingHash,at)=>seal('SdkSend',{purpose:'afw.finite-owner-sdk-send.v1',rootHash:root.recordHash,operation,originalRequestId:qa,originalRequestHash:'9'.repeat(64),issuedAt:at,deadline:at+5000,bindingHash});
  const makeObserved=(send,at)=>seal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:h('9'),observedAt:at,outcome:'resolved'});
  const begin=makeSend('sdk_begin',h('9'),I0+1),beginObserved=makeObserved(begin,I0+2),approve=makeSend('sdk_approve',identity.authorizationHash,I0+20),approveObserved=makeObserved(approve,I0+21);
  const expectedGrant=seal('ExpectedGrant',{purpose:'afw.finite-owner-expected-grant.v1',rootHash:root.recordHash,identityHash:identity.identityHash,reservationHash:h('a'),authorizationHash:identity.authorizationHash,grantId:identity.grantId,approvedRequestHash:approveObserved.resultHash,scopes:identity.requestedScopes,createdAt:new Date(I0+22).toISOString(),expiresAt:new Date(C0).toISOString()});
  const completeSend=makeSend('sdk_complete',expectedGrant.recordHash,I0+23),completeObserved=makeObserved(completeSend,I0+24);return {identity,root,expectedGrant,completeSend,completeObserved,begin,beginObserved,approve,approveObserved};
 }
+
+// Explicit component program only: no producer/SDK/native-admission claim.
+const monitoringCleanupComponent="\nimport {DurableObject} from 'cloudflare:workers';\nimport {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA,FINITE_PREPARATION_MONITORING_SCHEMA} from './lib/mcp-qa-finite-preparation-issuer-store.mjs';\nimport {sealFinitePreparationIssuerRecord as seal} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';\nimport {sealFiniteOwnerCleanupRecord as cleanSeal} from './lib/mcp-qa-finite-owner-cleanup-records.mjs';\nimport {createFiniteOwnerCleanupJournal} from './lib/mcp-qa-finite-owner-cleanup-journal.mjs';\nconst U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222',R='33333333-3333-4333-8333-333333333333',H='a'.repeat(64);\nexport class MonitoringCleanup extends DurableObject {\n async fetch(request){\n  const {mode}=await request.json();if(!['normal','prior','revision','sequence','C1','window','unknown'].includes(mode))throw Error('SYN fixed mode');\n  const db=this.env.RELEASE_DB,exec=(sql,...v)=>db.prepare(sql).bind(...v).run(),events=[];\n  await exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER)');\n  await exec(\"CREATE TABLE delegated_consent_sessions(handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT)\");\n  await exec(\"CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT,exchanged_at TEXT)\");\n  for(const sql of [...FINITE_PREPARATION_ISSUER_SCHEMA,...FINITE_PREPARATION_MONITORING_SCHEMA])await exec(sql);\n  const at=(await db.prepare(\"SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms\").first()).ms,C1=mode==='C1'?at+1000:at+179900,C0=C1-180000,I0=C0-900000,reservedAt=I0+10;\n  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read'],consentExpiresAt:new Date(C0).toISOString(),I0,C0,C1,reservedAt});\n  const grant={scopes:identity.requestedScopes,createdAt:new Date(reservedAt+20).toISOString(),expiresAt:new Date(C0).toISOString()};\n  await exec('INSERT INTO site_projects VALUES (?,?,1)',identity.projectId,identity.subject);\n  await exec(\"INSERT INTO delegated_consent_sessions VALUES (?,?,'authorize',?,?,?,?,?,?)\",identity.authorizationHash,identity.subject,identity.projectId,identity.clientId,identity.resource,JSON.stringify(identity.requestedScopes),identity.consentExpiresAt,grant.createdAt);\n  await exec(\"INSERT INTO delegated_access_grants VALUES (?,?,?,?,?,?,?,?,?,?)\",U,identity.subject,identity.clientId,identity.projectId,identity.resource,JSON.stringify(grant.scopes),grant.createdAt,grant.expiresAt,new Date(at-1).toISOString(),'');\n  const eventTime=C0-1000;\n  const eventSql=\"INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,?,'afw.dossier-monitoring.v1',?,?,?)\";\n  await exec(eventSql,'SYN-unrelated',identity.projectId,identity.subject,identity.clientId,identity.resource,'grant',U,eventTime,C0);\n  await exec(eventSql,U,identity.projectId,identity.subject,identity.clientId,identity.resource,'grant',F,eventTime,C0);\n  const consent=await db.prepare(\"SELECT * FROM dossier_monitoring_consent_events WHERE grant_id=?\").bind(U).first();\n  if(mode==='prior')await exec(eventSql,U,identity.projectId,identity.subject,identity.clientId,identity.resource,'revoke',U,at-1,at-1);\n  const before=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;\n  let sid=0,armed=false,writes=0;\n  const wrapper={withSession(type){const n=++sid,session=db.withSession(type);return {prepare(sql){events.push({sid:n,type,sql});const stmt=session.prepare(sql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{\n   if(armed&&sql.includes('INSERT INTO dossier_monitoring_consent_events')){\n    writes++;if(mode==='C1'||mode==='window')await new Promise(resolve=>setTimeout(resolve,mode==='C1'?1200:350));\n    const value=await bound[method]();if(mode==='unknown')throw Error('SYN actual revoke committed ACK lost');return value;\n   }return bound[method]();\n  };return {first:call('first'),all:call('all'),run:call('run')};}};}};}};\n  const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()>=at+30000)throw Error('SYN original component lifetime');}});\n  const options={ctx:{storage:this.ctx.storage,id:this.ctx.id},env:{RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE}};\n  const store=createFinitePreparationIssuerStore(options),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,C1)});\n  const barrier=await store.closeFence({identity,fenceRequestId:R,window:window()},lease);\n  if(mode==='revision')await exec('UPDATE site_projects SET revision=2 WHERE id=?',identity.projectId);\n  const ci=cleanSeal('Identity',{purpose:'afw.finite-owner-cleanup-identity.v1',planHash:H,capsuleHash:H,enrollmentHash:H,preconnectionId:H,sourceRevision:identity.sourceRevision,qaVersionId:U,actorId:identity.actorId,I0,C0,C1});\n  const journal=createFiniteOwnerCleanupJournal(options);await journal.appendIdentity(ci,lease);\n  const w=window();if(mode==='window')w.deadline=w.startedAt+200;\n  const send=cleanSeal('Send',{purpose:'afw.finite-owner-cleanup-send.v1',identityHash:ci.recordHash,operation:'monitoring_revoke',requestId:R,requestHash:H,issuedAt:w.startedAt,deadline:w.deadline});\n  await journal.appendSend({preconnectionId:H,record:send},lease);\n  const args={identity,barrier,expectedGrant:grant,expectedConsent:mode==='sequence'?{...consent,sequence:consent.sequence+1}:consent,requestId:R,window:w};\n  armed=true;let result=null,rejected=false;\n  try{result=await store.insertMonitoringRevocation(args,lease);\n   if(['applied','already_withdrawn'].includes(result.status))await journal.appendObserved({preconnectionId:H,operation:'monitoring_revoke',record:cleanSeal('Observed',{purpose:'afw.finite-owner-cleanup-observed.v1',sendHash:send.recordHash,resultHash:H,outcome:result.status,observedAt:Date.now()})},lease);\n  }catch{rejected=true;}\n  let retryDenied=null;if(mode==='unknown'){try{await store.insertMonitoringRevocation(args,lease);retryDenied=false;}catch{retryDenied=true;}}\n  const after=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,records=await journal.read({preconnectionId:H},lease);\n  const noUpdate=await exec('UPDATE dossier_monitoring_consent_events SET expires_at=expires_at').then(()=>false,()=>true),noDelete=await exec('DELETE FROM dossier_monitoring_consent_events').then(()=>false,()=>true);\n  controller.abort();return Response.json({label:'SYN component input; real D1 SQL clock and results',at,C0,C1,before,after,result,rejected,retryDenied,writes,events,send:records.operations.monitoring_revoke.send,observed:records.operations.monitoring_revoke.observed,noUpdate,noDelete});\n }\n}\nexport default {fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};\n";
+export async function monitoringCleanupScenario(t,mode){
+ const built=await buildCleanupComponent({stdin:{contents:monitoringCleanupComponent,resolveDir:process.cwd(),sourcefile:'SYN-monitoring-cleanup-component.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-monitoring-cleanup'},durableObjects:{FIXTURE:{className:'MonitoringCleanup',useSQLite:true,uniqueKey:'SYN-monitoring-cleanup'}}}));
+ t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(response.status,200);return response.json();
+}
+
+export function instrumentCleanupConsumer(source){
+ const fail=/const fail=\(\)=>\{throw Error\('([^']+)'\);\};/;
+ assert(fail.test(source),'fixed cleanup fail marker');
+ source=source.replace(fail,(_,message)=>"const fail=()=>{const error=Error("+JSON.stringify(message)+");(globalThis.__r2CleanupFailures??=[]).push({at:Date.now(),frames:String(error.stack).split('\\n').slice(0,7)});throw error;};");
+ const child="async function child(work){";
+ if(source.includes(child)){
+  assert.equal(source.split(child).length,2);source=source.replace(child,child+"const childAt=Date.now(),childMono=performance.now();");
+  const end="try{return await clock.wait(actual);}finally{originalLease.signal.removeEventListener('abort',stop);clock.close();}";
+  assert.equal(source.split(end).length,2);source=source.replace(end,"try{return await clock.wait(actual);}finally{(globalThis.__r2CleanupChildren??=[]).push({startedAt:childAt,elapsedMs:performance.now()-childMono,aborted:clock.lease.signal.aborted});originalLease.signal.removeEventListener('abort',stop);clock.close();}");
+ }
+ return source;
+}
+
+/** Dated native facts after the real code exchange; never replaces the pre-302 Reference. */
+export async function observeCleanupSdkExchange(f,token){
+ const o=await plain(f.stub.ownerReferenceObserve()),referenceRaw=o.rows.find(([k])=>k.endsWith(':reference'))?.[1];assert(referenceRaw);
+ const ref=JSON.parse(referenceRaw),native=await plain(f.stub.ownerCleanupNativeRows());assert(native.grant);
+ const key='grant:'+native.grant.user_id+':'+ref.sdkGrantId,raw=await f.kv.get(key);assert.equal(typeof raw,'string');const grant=JSON.parse(raw);
+ assert.equal(grant.id,ref.sdkGrantId);assert.equal(grant.userId,native.grant.user_id);assert.equal(grant.clientId,f.source.clientId);
+ assert.equal(grant.metadata.afwFiniteCleanup.correlationHash,ref.correlationHash);assert(Number.isSafeInteger(grant.expiresAt));
+ const rows=await plain(f.stub.snapshot()),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);
+ if(!f.cleanupSdkOnly)assert(grant.expiresAt*1000<=plan.C0,'actual post-exchange SDK expiry must not exceed original C0');
+ assert.equal(token.refresh_token,undefined,'M refresh remains disabled');assert(Number.isSafeInteger(token.expires_in)&&token.expires_in>=60&&token.expires_in<=300);
+ const hash=v=>createHash('sha256').update(v).digest('hex');
+ const tokenId=hash(token.access_token),tokenRaw=await f.kv.get('token:'+grant.userId+':'+grant.id+':'+tokenId);assert.equal(typeof tokenRaw,'string');const nativeToken=JSON.parse(tokenRaw);
+ assert.equal(nativeToken.grantId,grant.id);assert.equal(nativeToken.userId,grant.userId);
+ assert.equal((await plain(f.stub.ownerReferenceObserve())).rows.find(([k])=>k.endsWith(':reference'))[1],referenceRaw,'historical Reference bytes unchanged');
+ return {purpose:'afw.post-exchange-sdk-fact.syn.v1',referenceHash:ref.recordHash,referenceRawHash:hash(referenceRaw),referenceExpiresAt:ref.expiresAt,selectorHash:hash(ref.sdkGrantId),subjectHash:hash(grant.userId),clientHash:hash(grant.clientId),correlationHash:ref.correlationHash,metadataHash:hash(JSON.stringify(grant.metadata)),createdAt:grant.createdAt,expiresAt:grant.expiresAt,tokenExpiresAt:nativeToken.expiresAt,tokenHash:hash(token.access_token),advertisedExpiresIn:token.expires_in,D1ExpiresAt:Date.parse(native.grant.expires_at),observedAt:Date.now(),I0:plan.I0,C0:plan.C0,C1:plan.C1,operationalReadiness:false};
+}
+/** Fixed SYN ingress to the ordinary compiled M; routing is not AFW authority. */
+export function cleanupMTransport(mf,{currentMountedOptions,expectedModuleHash}){
+ const m=currentMountedOptions.workers.find(w=>w.name==='canary-first-connection');
+ assert(m);assert.equal(currentMountedOptions.upstream,O);assert.equal(createHash('sha256').update(m.script).digest('hex'),expectedModuleHash);
+ assert.equal(m.kvNamespaces.OAUTH_KV,'first-connection-oauth');assert.equal(m.bindings.AFW_DELEGATED_OAUTH_ENABLED,'true');assert.equal(m.bindings.AFW_OAUTH_REFRESH_ENABLED,'false');
+ const identity={worker:'canary-first-connection',path:'/mcp',scriptHash:expectedModuleHash,namespaceId:'first-connection-oauth'},profile=cleanupMProfile(m,currentMountedOptions.upstream),profileHash=cleanupHash(JSON.stringify(profile));
+ const assertProfileCurrent=()=>assert.equal(cleanupHash(JSON.stringify(cleanupMProfile(m,currentMountedOptions.upstream))),profileHash,'original M script/config/namespace unchanged');
+ return Object.freeze({...identity,profile:Object.freeze(profile),assertProfileCurrent,fetch(input,init={}){
+  assertProfileCurrent();
+  assert(typeof input==='string'||input instanceof URL,'fixed SYN URL input');const url=new URL(String(input));assert.equal(url.href,O+'/mcp','fixed ordinary M origin/path only');
+  const headers=new Headers(init.headers);headers.set('Host',new URL(O).host);headers.set('MF-Route-Override',identity.worker);
+  return mf.dispatchFetch(url.href,{...init,headers});
+ }});
+}
+export async function readCleanupM(worker,token,projectId){
+ assert.equal(worker.worker,'canary-first-connection');assert.equal(worker.path,'/mcp');assert.match(worker.scriptHash,/^[a-f0-9]{64}$/);assert.equal(worker.namespaceId,'first-connection-oauth');
+ const requests=[],client=new Client({name:'SYN-named-M-control',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  await client.connect(new StreamableHTTPClientTransport(new URL(O+'/mcp'),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(O).host}},fetch:async(url,options)=>{const response=await worker.fetch(String(url),options);requests.push({method:options?.method??'GET',status:response.status});return response;}}));
+  const result=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(result.isError,undefined);assert.equal(result.structuredContent.data.id,projectId);
+  return {worker:worker.worker,path:worker.path,scriptHash:worker.scriptHash,namespaceId:worker.namespaceId,profile:worker.profile,at:Date.now(),requests,projectHash:createHash('sha256').update(projectId).digest('hex'),dataRead:true};
+ }finally{await client.close();}
+}
+
+const cleanupMHash='c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32';
+const cleanupMFlags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
+const cleanupHash=value=>createHash('sha256').update(value).digest('hex');
+export function cleanupMProfile(m,upstream){
+ return {worker:m.name,path:'/mcp',scriptHash:cleanupHash(m.script),optionsHash:cleanupHash(JSON.stringify(m)),bindingsHash:cleanupHash(JSON.stringify(m.bindings)),namespaceId:m.kvNamespaces.OAUTH_KV,upstream,issuer:m.bindings.AFW_OAUTH_ISSUER,resource:m.bindings.AFW_OAUTH_RESOURCE,serviceMode:m.bindings.AFW_OAUTH_SERVICE_MODE,serviceExpiresAt:m.bindings.AFW_OAUTH_PILOT_EXPIRES_AT,flags:Object.fromEntries(Object.entries(m.bindings).filter(([k])=>k.endsWith('_ENABLED'))),guardBlob:'d979f395029c9b1e66a99222d06acf99eba4f358'};
+}
+function qualifiedCleanupMProfile(p,C0){
+ return p?.worker==='canary-first-connection'&&p.path==='/mcp'&&p.scriptHash===cleanupMHash&&p.namespaceId==='first-connection-oauth'&&p.upstream===O&&p.issuer===O&&p.resource===O+'/mcp'&&p.serviceMode==='window'&&p.serviceExpiresAt===new Date(C0).toISOString()&&p.guardBlob==='d979f395029c9b1e66a99222d06acf99eba4f358'&&/^[a-f0-9]{64}$/.test(p.optionsHash)&&/^[a-f0-9]{64}$/.test(p.bindingsHash)&&JSON.stringify(Object.keys(p.flags??{}).sort())===JSON.stringify([...cleanupMFlags].sort())&&cleanupMFlags.every(k=>p.flags[k]===(k==='AFW_DELEGATED_OAUTH_ENABLED'?'true':'false'));
+}
+/** Interpretation only; fixture data cannot authorize or alter a worker. */
+export function classifyCleanupMDenial(observation){
+ const no={dataDenied:false,layer:'unproved',reason:'denial contract not established'},o=observation;
+ if(!Number.isSafeInteger(o?.originalC0)||o.originalC0<1||o.originalC0>8640000000000000||!qualifiedCleanupMProfile(o.profile,o.originalC0)||o.profileCurrent!==true||o.operation!=='read_project_summary'||!Array.isArray(o.responses)||o.responses.some(r=>r.containsExpectedData||r.containsCredential||r.readFailed))return no;
+ const rpc=o.responses.filter(r=>r.rpcMethod==='initialize'||r.rpcMethod==='tools/call'&&r.tool==='read_project_summary'),r=rpc.at(-1);
+ if(!r||r.method!=='POST'||!Number.isSafeInteger(r.startedAt)||!Number.isSafeInteger(r.finishedAt)||r.finishedAt<r.startedAt||!Number.isSafeInteger(r.status)||!/^[a-f0-9]{64}$/.test(r.bodyHash))return no;
+ if(r.status===404&&r.startedAt>=o.originalC0&&r.bodyKind==='html'&&r.closedWindowBody===true)
+  return {dataDenied:true,layer:'service_window_closed',reason:'unchanged original M window expired before request',branch:'delegated-oauth-worker.mjs:143-158 -> connectionWindowNotice:29-30',D1DenialProved:false};
+ if(r.startedAt>=o.originalC0)return no; // This fixed original window must close before SDK/MCP at C0.
+ const challenge=r.oauthChallenge;
+ if(r.status===401&&challenge?.bearer===true&&challenge.error==='invalid_token'&&challenge.metadata===O+'/.well-known/oauth-protected-resource/mcp'&&(r.bodyKind==='empty'||r.oauthError==='invalid_token'))
+  return {dataDenied:true,layer:'sdk_token_rejection',reason:'native OAuth invalid_token challenge',D1DenialProved:false};
+ if(r.status===403&&challenge?.bearer===true&&challenge.error==='insufficient_scope'&&challenge.metadata===O+'/.well-known/oauth-protected-resource/mcp'&&r.oauthError==='insufficient_scope')
+  return {dataDenied:true,layer:'sdk_scope_rejection',reason:'native OAuth insufficient_scope challenge',D1DenialProved:false};
+ const result=o.toolResult;
+ if(r.rpcMethod==='tools/call'&&r.tool==='read_project_summary'&&r.status===200&&r.bodyKind==='json'&&r.jsonRpc?.version==='2.0'&&r.jsonRpc.kind==='result'&&result?.isError===true&&result.status===403&&result.code==='delegated_access_denied'&&result.hasData===false&&JSON.stringify(r.jsonRpc.result)===JSON.stringify(result))
+  return {dataDenied:true,layer:'business_grant_denied',reason:'read_project_summary returned delegated_access_denied',branch:'delegated-project-read.mjs:63-68 via delegated-project-mcp.mjs:46-57',D1DenialProved:true};
+ return no;
+}
+function cleanupSafeToolResult(value){
+ const s=value?.structuredContent;
+ return {isError:value?.isError===true,status:Number.isInteger(s?.status)?s.status:null,code:typeof s?.code==='string'&&/^[a-z_]{1,80}$/.test(s.code)?s.code:null,hasData:!!value&&Object.hasOwn(value,'data')||!!s&&Object.hasOwn(s,'data')};
+}
+async function cleanupResponseFact(response,{request,startedAt,projectId,token}){
+ const reader=response.clone().body?.getReader(),chunks=[];let bytes=0;
+ if(reader)for(;;){const r=await reader.read();if(r.done)break;bytes+=r.value.length;if(bytes>131072){await reader.cancel();throw Error('SYN bounded M response exceeded');}chunks.push(Buffer.from(r.value));}
+ const body=Buffer.concat(chunks).toString('utf8'),type=response.headers.get('Content-Type')??'';let parsed=null;try{parsed=JSON.parse(body);}catch{}
+ const www=response.headers.get('WWW-Authenticate')??'',bearer=www.startsWith('Bearer '),error=/error="([^"]+)"/.exec(www)?.[1],metadata=/resource_metadata="([^"]+)"/.exec(www)?.[1],challenge={bearer,error:['invalid_token','insufficient_scope'].includes(error)?error:null,metadata:metadata===O+'/.well-known/oauth-protected-resource/mcp'?metadata:null};
+ const jsonRpc=parsed?.jsonrpc==='2.0'?{version:'2.0',kind:Object.hasOwn(parsed,'result')?'result':Object.hasOwn(parsed,'error')?'error':'unknown',idType:typeof parsed.id,errorCode:Number.isInteger(parsed.error?.code)?parsed.error.code:null,result:parsed.result?cleanupSafeToolResult(parsed.result):null}:null;
+ return {method:request.method,rpcMethod:request.rpcMethod,tool:request.tool,startedAt,finishedAt:Date.now(),status:response.status,contentType:type.split(';')[0],bodyKind:body===''?'empty':parsed?'json':type.startsWith('text/html')?'html':'text',bodyBytes:bytes,bodyHash:cleanupHash(body),oauthChallenge:challenge,oauthError:['invalid_token','insufficient_scope'].includes(parsed?.error)?parsed.error:null,jsonRpc,closedWindowBody:type.startsWith('text/html')&&body.includes('<h1>Te acompaño a revisar la conexión</h1>')&&body.includes('No pude completar esta conexión.')&&body.includes('No puedo confirmar la causa desde esta pantalla.'),containsExpectedData:body.includes(projectId),containsCredential:body.includes(token),readFailed:false};
+}
+/** Same real protocol as positive control. Preserve facts before the test asserts. */
+export async function observeCleanupMDenial(worker,token,projectId,{C0}){
+ const responses=[],observation={label:'SYN real ordinary M data denial observation',operation:'read_project_summary',originalC0:C0,profile:worker.profile,profileCurrent:false,responses,toolCallAttempted:false,toolResult:null,error:null};
+ const client=new Client({name:'SYN-named-M-denial',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  worker.assertProfileCurrent();
+  await client.connect(new StreamableHTTPClientTransport(new URL(O+'/mcp'),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(O).host}},fetch:async(url,options={})=>{
+   let rpc;try{rpc=JSON.parse(options.body);}catch{}
+   const request={method:options.method??'GET',rpcMethod:rpc?.method??null,tool:rpc?.method==='tools/call'?rpc.params?.name??null:null},startedAt=Date.now();
+   const response=await worker.fetch(String(url),{...options,signal:options.signal?AbortSignal.any([options.signal,AbortSignal.timeout(5000)]):AbortSignal.timeout(5000)});
+   try{responses.push(await cleanupResponseFact(response,{request,startedAt,projectId,token}));}catch(error){responses.push({...request,startedAt,finishedAt:Date.now(),status:response.status,readFailed:true,errorType:error.name});throw error;}
+   return response;
+  }}));
+  observation.toolCallAttempted=true;
+  observation.toolResult=cleanupSafeToolResult(await client.callTool({name:'read_project_summary',arguments:{}}));
+ }catch(error){observation.error={type:error.name,messageHash:cleanupHash(String(error.message))};}
+ finally{try{await client.close();}catch(error){observation.closeError={type:error.name,messageHash:cleanupHash(String(error.message))};}
+  try{worker.assertProfileCurrent();observation.profileCurrent=true;}catch{observation.profileCurrent=false;}}
+ observation.classification=classifyCleanupMDenial(observation);return observation;
+}
`````

### test/mcp-qa-finite-owner-cleanup-native.test.mjs

`````diff
diff --git a/test/mcp-qa-finite-owner-cleanup-native.test.mjs b/test/mcp-qa-finite-owner-cleanup-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-cleanup-native.test.mjs
@@ -0,0 +1,151 @@
+
+import test,{after} from 'node:test';
+import assert from 'node:assert/strict';
+import {join} from 'node:path';
+import {createHash} from 'node:crypto';
+import {monitoringCleanupScenario,readCleanupM,observeCleanupMDenial,O} from './fixtures/finite-owner-cleanup.mjs';
+import {plain} from './fixtures/finite-first-connection-publication.mjs';
+import {recoverCheckpoint,observeOriginalAlarm,writeCleanupEvidence,principalName,waitUntil,persistPartialCleanup} from './fixtures/finite-owner-cleanup-persistence.mjs';
+const P='afw.finite-initial-cleanup.v1:',group=process.env.AFW_R2_GROUP??'g0',root=process.env.AFW_R2_CHECKPOINT??'output/owner-cleanup/checkpoint-'+group,fixtures=[];
+after(async()=>{for(const f of fixtures)if(!f.disposed){if(f.sdkOnly)await f.sdkOnly.fetch(O+'/_fixture/sdk-only-release').catch(()=>{});await f.stub.ownerCleanupControl().catch(()=>{});await f.mf.dispose();f.disposed=true;}});
+const pause=ms=>new Promise(r=>setTimeout(r,ms)),hash=v=>createHash('sha256').update(v).digest('hex');
+const row=(facts,key)=>{const v=facts.rows.find(([k])=>k===P+key);return v?JSON.parse(v[1]):null;};
+const cleanupRows=facts=>facts.rows.filter(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:'));
+const cleanupReceipt=facts=>{const r=cleanupRows(facts).find(([k])=>k.endsWith(':receipt'));return r?JSON.parse(r[1]):null;};
+async function recover(label,variant='principal',options={}){
+ const f=await recoverCheckpoint(join(root,variant),{label,...options});fixtures.push(f);return f;
+}
+async function capture(f,label,facts){
+ const native=await plain(f.stub.ownerCleanupNativeRows()),fault=await plain(f.stub.ownerCleanupFaultFacts());
+ const receipt=cleanupReceipt(facts),state=row(facts,'state'),metrics={children:facts.children,sqlCalls:fault?.sqlCalls??0,sqlElapsedMs:fault?.sqlElapsedMs??0,kvLists:fault?.lists??0,kvDeletes:fault?.deletes??0,providerRequests:f.providerRegistry.requests.length-f.checkpoint.state.providerRegistry.requests.length};
+ const result={purpose:'afw.owner-cleanup-native-result.syn.v1',label,source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,signal:facts.signal,nativeDbNow:facts.dbNow,wall:facts.wall,state,alarm:facts.alarm,originalPlanHash:f.plan.recordHash,restores:f.restores.length,pointer:f.providerRegistry.pointer,ownerCleanupSuffixes:cleanupRows(facts).map(([k])=>k.split(':').slice(2).join(':')),receipt,metrics,failures:facts.failures,fault,native:{fenced:!!native.fence?.fenced_at,grantPresent:!!native.grant,grantRevoked:!!native.grant?.revoked_at,noticeActions:native.notices.map(x=>x.action)},operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,modeledProviderInput:f.checkpoint.modeledProviderInput};
+ await writeCleanupEvidence(label,result);console.info('R2 native result',JSON.stringify(result));return {result,native,receipt,state};
+}
+function assertClosed(f,facts,capture){
+ assert(facts.dbNow>=f.plan.C0);assert.equal(capture.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(f.restores.length,1);
+ assert.equal(f.providerRegistry.pointer.versions[0].version_id,f.plan.baselineVersionId);assert(capture.receipt);assert.equal(capture.receipt.businessAccessClosed,true);assert.equal(capture.receipt.globalNativeDrainVerified,false);assert.equal(capture.receipt.sdkNamespaceEmptyVerified,false);
+ assert(capture.native.fence?.fenced_at);assert(!capture.native.grant||capture.native.grant.revoked_at);if(capture.native.notices.some(e=>e.action==='grant'))assert.equal(capture.native.notices.at(-1).action,'revoke');
+ assert.equal(f.kvSemanticProof.bothAliases,true);
+}
+let principal;
+if(group==='g0'){
+ test(principalName,async()=>{
+  const f=await recover('g0-principal');assert.equal(f.checkpoint.variant,'principal');
+  assert(f.checkpoint.facts.rows.some(([k])=>k.endsWith(':reference')));assert(f.checkpoint.facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')));
+  const facts=await observeOriginalAlarm(f),observed=await capture(f,'principal',facts);principal={f,facts,observed};
+  assertClosed(f,facts,observed);assert.equal(observed.receipt.sdkReductionReturned,true);
+ });
+ test('R2 originalSDKexpiry still permits exact historical reduction',async()=>{
+  assert(principal,'shares the single untouched original occurrence');
+  const {f,observed}=principal,ref=JSON.parse(f.checkpoint.facts.rows.find(([k])=>k.endsWith(':reference'))[1]);
+  const actual=f.checkpoint.sdkAfterExchange;assert(actual);assert.equal(ref.expiresAt,null,'historical pre-302 field remains absent');assert.equal(actual.referenceHash,ref.recordHash);assert.equal(actual.selectorHash,hash(ref.sdkGrantId));assert.equal(actual.correlationHash,ref.correlationHash);assert(Number.isSafeInteger(actual.expiresAt)&&actual.expiresAt*1000<=f.plan.C0);assert(actual.observedAt<f.plan.C0);
+  assert.equal(observed.receipt.sdkReductionReturned,true);assert(observed.receipt.sdkSendHash);assert(observed.receipt.sdkObservedHash);
+  await writeCleanupEvidence('sdk-expiry-same-occurrence',{label:'same principal occurrence; no second revoke',referenceHash:ref.recordHash,selectorHash:hash(ref.sdkGrantId),referenceExpiresAt:ref.expiresAt,actualPostExchange:actual,C0:f.plan.C0,sdkObservedHash:observed.receipt.sdkObservedHash,operationalReadiness:false});
+ });
+}
+let pair;
+async function paired(g,configure){
+ if(!pair){pair=await Promise.all([recover(g+'-a',g==='g1'?'grant-before-link':'principal'),recover(g+'-b',g==='g1'?'notice-before-link':'principal')]);await configure?.(...pair);}
+ return pair;
+}
+if(group==='g1'){
+ test('R2 fence covers grant before link',async()=>{
+  const [f]=await paired('g1');assert.equal(f.checkpoint.partialBoundary.sqlWrites,1);assert(!f.checkpoint.facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':grant')));
+  const facts=await observeOriginalAlarm(f),r=await capture(f,'grant-before-link',facts);assertClosed(f,facts,r);assert(r.native.grant.revoked_at);assert.equal(r.receipt.sdkReductionReturned,false);assert.equal(r.receipt.sdkSendHash,null);
+ });
+ test('R2 notice SQL without link is withdrawn',async()=>{
+  const [,f]=await paired('g1');assert.equal(f.checkpoint.partialBoundary.sqlWrites,1);assert(!f.checkpoint.facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')));
+  const facts=await observeOriginalAlarm(f),r=await capture(f,'notice-without-link',facts);assertClosed(f,facts,r);assert.deepEqual(r.native.notices.map(e=>e.action),['grant','revoke']);
+ });
+}
+if(group==='g2'){
+ const configured=()=>paired('g2',async(a,b)=>{a.providerRegistry.pointer={...a.providerRegistry.pointer,id:'99999999-9999-4999-8999-999999999999'};await b.stub.ownerCleanupFault('paging-scope');});
+ test('R2 foreign pointer is preserved',async()=>{
+  const [f]=await configured(),original=structuredClone(f.providerRegistry.pointer),facts=await observeOriginalAlarm(f),r=await capture(f,'foreign-pointer',facts);
+  assert.notEqual(r.state.status,'complete');assert.deepEqual(f.providerRegistry.pointer,original);assert.equal(f.restores.length,0);assert.equal(r.native.fence.fenced_at,null);assert.equal(r.native.grant.revoked_at,'');
+ });
+ test('R2 SDK paging and scope fail before extra IO',async()=>{
+  const [,f]=await configured(),facts=await observeOriginalAlarm(f),r=await capture(f,'sdk-paging-scope',facts);
+  assert.notEqual(r.state.status,'complete');assert.equal(f.restores.length,1);assert.equal(r.receipt,null);
+  assert.equal(r.result.fault.lists,2);assert.equal(r.result.fault.deletes,100);assert(r.result.fault.trace.filter(e=>e.kind==='list').every(e=>e.limit===100));assert(r.result.fault.trace.filter(e=>e.kind==='delete').every(e=>e.scope==='token'));
+  const rows=cleanupRows(facts);assert(rows.some(([k])=>k.endsWith(':sdk_revoke:send')));assert(!rows.some(([k])=>k.endsWith(':sdk_revoke:observed')));
+ });
+}
+if(group==='g3'){
+ const configured=()=>paired('g3',async(a,b)=>{a.alarmMode='restore-ack-lost';await b.stub.ownerCleanupFault('fence-ack-lost');});
+ test('R2 unknown restore acknowledgement cannot complete',async()=>{
+  const [f]=await configured(),facts=await observeOriginalAlarm(f,{settled:3}),r=await capture(f,'unknown-restore-ack',facts);
+  assert.equal(r.state.deliveries,3);assert.notEqual(r.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(f.restores.length,1);assert(row(facts,'restore-send'));assert.equal(row(facts,'restore-ack'),null);assert.equal(r.receipt,null);
+  assert.equal(f.providerRegistry.pointer.versions[0].version_id,f.plan.baselineVersionId,'closed containment does not fabricate ACK');
+ });
+ test('R2 same fence identity is reconciled without replay',async()=>{
+  const [,f]=await configured(),facts=await observeOriginalAlarm(f,{settled:3}),r=await capture(f,'same-fence-identity',facts);
+  const issuer=facts.rows.filter(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')),send=JSON.parse(issuer.find(([k])=>k.endsWith(':close_fence:send'))[1]);
+  assert.equal(r.native.fence.fence_request_id,send.requestId);assert.equal(r.result.fault.sqlWrites,1);assert(r.result.fault.reconciles>=2);assert(!issuer.some(([k])=>k.endsWith(':close_fence:ack')));assert(cleanupRows(facts).some(([k])=>k.includes(':reconciled:')));
+  assert.equal(r.state.deliveries,3);assert.equal(r.receipt,null);assert.equal(f.restores.length,0);
+ });
+}
+let restarted;
+if(group==='g4'){
+ test('R2 held SDK delete retains original cleanup',async()=>{
+  const f=await recover('g4-held');await f.stub.ownerCleanupFault('held-sdk-delete');
+  const until=f.plan.C0+35000;for(;;){const signal=await plain(f.stub.ownerCleanupFaultSignal());if(signal.held)break;assert(Date.now()<until,'intended real SDK delete hold reached');await pause(250);}
+  const facts=await observeOriginalAlarm(f),r=await capture(f,'held-sdk-delete',facts);assert.notEqual(r.state.status,'complete');assert.equal(r.result.fault.held,true);
+  assert.equal((await plain(f.stub.ownerCleanupScopeProbe())).available,false,'live native same-ctx probe excluded while actual cleanup held');
+  await f.stub.ownerCleanupControl();
+  for(;;){const signal=await plain(f.stub.ownerCleanupFaultSignal()),probe=await plain(f.stub.ownerCleanupScopeProbe());if(signal.settled&&probe.available)break;assert(Date.now()<f.plan.C0+45000,'held outward ACK actual settlement');await pause(100);}
+  const saved='output/owner-cleanup/g4-partial';await persistPartialCleanup(f,saved);
+  restarted=await recoverCheckpoint(saved,{label:'g4-restarted',restart:true});fixtures.push(restarted);
+  assert.equal(restarted.plan.I0,f.plan.I0);assert.equal(restarted.plan.C1,f.plan.C1);assert.equal(row(await plain(restarted.stub.ownerCleanupFacts()),'state').deliveries,1);
+ });
+ test('R2 restart preserves slots and own uncertainty',async()=>{
+  assert(restarted,'same real partial cleanup checkpoint');const f=restarted,facts=await observeOriginalAlarm(f,{settled:2}),r=await capture(f,'restart-own-uncertainty',facts);
+  assert.equal(r.state.deliveries,3);assert.notEqual(r.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(r.result.fault.deletes,0);assert.equal(f.restores.length,1);
+  assert(cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:send')));assert(!cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')));assert.equal(r.receipt,null);
+ });
+}
+if(group==='g5'){
+ test('R2 late foreign-isolate KV cannot reopen business access',async()=>{
+  const f=await recover('g5-late'),token=f.checkpoint.lateToken,expiry=f.checkpoint.sdkAfterExchange;assert.equal(typeof token?.access_token,'string');assert.equal(token.refresh_token,undefined);assert(f.sdkOnly&&expiry);
+  const ref=JSON.parse(f.checkpoint.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),m=f.checkpoint.options.workers.find(w=>w.name==='canary-first-connection');
+  assert.equal(hash(m.script),f.checkpoint.build.M.sha256);assert.equal(m.bindings.AFW_DELEGATED_OAUTH_ENABLED,'true');assert.equal(m.bindings.AFW_OAUTH_REFRESH_ENABLED,'false');
+  assert(expiry.tokenExpiresAt*1000-Date.now()>=65000,'genuine token alive after cold load');
+  const positive=await readCleanupM(f.m,token.access_token,f.checkpoint.state.source.project.projectId);assert(positive.at<f.plan.C0);assert(positive.requests.some(r=>r.status===200));
+  await waitUntil(f.plan.C0-75000);assert(expiry.tokenExpiresAt*1000-Date.now()>=65000,'do not issue with insufficient original token margin');
+  const startedAt=Date.now(),request=f.sdkOnly.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subjectToken:token.access_token,sdkGrantId:ref.sdkGrantId,clientId:f.checkpoint.state.source.clientId,correlationHash:ref.correlationHash,referenceHash:ref.recordHash,C0:f.plan.C0})});
+  const response=await request,deniedHeadersAt=Date.now();assert.equal(response.status,403,'logical denial at child deadline');const pendingBody=response.text();
+  const before=await (await f.sdkOnly.fetch(O+'/_fixture/sdk-only-signal')).json();
+  assert(before.reached&&before.retained&&!before.settled,'actual SDK write must be held, not rejected early');assert.equal(before.logicalReason,'deadline');assert(before.reachedAt<before.childDeadline);assert(before.childDeadline-before.rootStartedAt<=5000);assert(before.rootDeadline-before.rootStartedAt<=30000);assert(before.logicalDeniedAt<f.plan.C0);assert.equal(before.selectorHash,expiry.selectorHash);assert.equal(before.tokenHash,expiry.tokenHash);
+  const blocked=await f.sdkOnly.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST'});assert.equal(blocked.status,409,'same retained invocation excludes replacement');await blocked.body?.cancel();
+  const facts=await observeOriginalAlarm(f),r=await capture(f,'late-isolate-business-closure',facts);assertClosed(f,facts,r);
+  await f.sdkOnly.fetch(O+'/_fixture/sdk-only-release');const deniedBody=await pendingBody;
+  const after=await (await f.sdkOnly.fetch(O+'/_fixture/sdk-only-signal')).json();assert(after.reached&&after.released&&after.settled&&!after.retained);assert(after.nativeReturned||after.nativeRejected);assert(after.nativeAttemptAt>=f.plan.C0);assert(!deniedBody.includes('access_token'));
+  const negative=await observeCleanupMDenial(f.m,token.access_token,f.checkpoint.state.source.project.projectId,{C0:f.plan.C0});
+  const outcome={label:'SYN adversarial SDK-only; not an M token-exchange admission',startedAt,deniedHeadersAt,C0:f.plan.C0,positive,negative,build:f.checkpoint.sdkOnlyBuild,before,after,denialBodyHash:hash(deniedBody),mcpWorker:'canary-first-connection',denialLayer:negative.classification.layer,expiry,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,operationalReadiness:false};
+  await writeCleanupEvidence('late-kv-actual-outcome',outcome);console.info('R2 late M denial diagnostic',JSON.stringify(outcome));
+  assert.deepEqual(negative.profile,positive.profile,'same original M script/config/namespace and wrapper');
+  assert(negative.responses.some(r=>r.method==='POST'&&r.startedAt>=f.plan.C0),'real post-C0 M request recorded');
+  assert.equal(negative.classification.dataDenied,true,'actual M data-denial contract, not initialize HTTP alone');
+  assert.equal(hash(m.script),f.checkpoint.build.M.sha256);
+ });
+}
+
+if(group==='components'){
+test('R2 native monitoring revoke binds original consent and preserves unrelated rows',async t=>{
+ const r=await monitoringCleanupScenario(t,'normal');assert.equal(r.rejected,false);assert.equal(r.result.status,'applied');assert.equal(r.after.length,3);assert.deepEqual(r.after.slice(0,2),r.before);assert.equal(r.result.row.grant_id,r.before[1].grant_id);assert.equal(r.result.row.action,'revoke');assert.equal(r.result.row.issued_at,r.result.row.expires_at);assert(r.result.row.issued_at>=r.at);assert.equal(r.noUpdate,true);assert.equal(r.noDelete,true);
+ const reads=r.events.filter(e=>e.sql?.includes('SELECT v.*'));assert(reads.length>=2);for(const e of reads)assert.equal(r.events.find(x=>x.sid===e.sid),e,'fresh first-primary SELECT');
+});
+test('R2 native monitoring revoke preserves prior withdrawal',async t=>{
+ const r=await monitoringCleanupScenario(t,'prior');assert.equal(r.rejected,false);assert.equal(r.result.status,'already_withdrawn');assert.deepEqual(r.after,r.before);assert.deepEqual(r.result.row,r.before.at(-1));assert.equal(r.writes,0);
+});
+test('R2 native monitoring revoke rejects foreign revision and sequence',async t=>{
+ for(const mode of ['revision','sequence']){const r=await monitoringCleanupScenario(t,mode);assert(r.rejected||r.result?.status==='no_mutation');assert.deepEqual(r.after,r.before);assert.equal(r.observed,null);}
+});
+test('R2 native monitoring revoke enforces native C1 and child window',async t=>{
+ for(const mode of ['C1','window']){const r=await monitoringCleanupScenario(t,mode);assert(r.rejected||r.result?.status==='no_mutation');assert.deepEqual(r.after,r.before);assert.equal(r.observed,null);}
+});
+test('R2 native monitoring revoke unknown acknowledgement cannot become observed',async t=>{
+ const r=await monitoringCleanupScenario(t,'unknown');assert.equal(r.rejected,true);assert.equal(r.result,null);assert.equal(r.after.length,r.before.length+1,'actual native append survived lost response');assert(r.send);assert.equal(r.observed,null);assert.equal(r.retryDenied,true);assert.equal(r.writes,1);
+});
+
+}
`````

### test/mcp-qa-finite-owner-cleanup.test.mjs

`````diff
diff --git a/test/mcp-qa-finite-owner-cleanup.test.mjs b/test/mcp-qa-finite-owner-cleanup.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-cleanup.test.mjs
@@ -0,0 +1,38 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {sealFiniteOwnerCleanupRecord as seal,encodeFiniteOwnerCleanupRecord as encode,decodeFiniteOwnerCleanupRecord as decode} from '../lib/mcp-qa-finite-owner-cleanup-records.mjs';
+import {createFiniteOwnerCleanupJournal} from '../lib/mcp-qa-finite-owner-cleanup-journal.mjs';
+import {observeFiniteOwnerCleanupWork,observeFiniteReadOnlyWork,retainFiniteOwnerStagePromise} from '../lib/mcp-qa-finite-stage-work.mjs';
+const h=c=>c.repeat(64),uuid='11111111-1111-4111-8111-111111111111',I0=1800000000000,C0=I0+900000,C1=C0+180000;
+const fields={planHash:h('1'),capsuleHash:h('2'),enrollmentHash:h('3'),preconnectionId:h('4'),sourceRevision:'a'.repeat(40),qaVersionId:uuid,actorId:h('5'),I0,C0,C1};
+function identity(){return seal('Identity',{purpose:'afw.finite-owner-cleanup-identity.v1',...fields});}
+function send(i=identity(),operation='sdk_revoke'){return seal('Send',{purpose:'afw.finite-owner-cleanup-send.v1',identityHash:i.recordHash,operation,requestId:uuid,requestHash:h('6'),issuedAt:C0+10,deadline:C0+5010});}
+function observed(s=send()){return seal('Observed',{purpose:'afw.finite-owner-cleanup-observed.v1',sendHash:s.recordHash,resultHash:h('7'),outcome:'returned',observedAt:C0+100});}
+function receipt(i=identity(),s=send(i),o=observed(s)){return seal('Receipt',{purpose:'afw.finite-owner-cleanup-receipt.v1',identityHash:i.recordHash,planHash:i.planHash,fenceHash:h('8'),grantFactHash:h('9'),noticeFactHash:h('a'),sdkSendHash:s?.recordHash??null,sdkObservedHash:o?.recordHash??null,restoreSendHash:h('b'),restoreAckHash:h('c'),baselineVersionId:uuid,baselineDeploymentId:'22222222-2222-4222-8222-222222222222',finalFactsHash:h('d'),observedAt:C0+200,businessAccessClosed:true,sdkReductionReturned:!!s,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});}
+function change(kind,value,delta){const v={...value,...delta};delete v.recordHash;return seal(kind,v);}
+// Explicit synthetic component ctx/leases, never native business admission.
+function component(){
+ const data=new Map(),controller=new AbortController(),actor={toString:()=>fields.actorId};
+ const state={syncs:0,reads:0,transactions:0,fail:null};
+ const storage={async get(k){state.reads++;if(state.fail==='readback'&&state.syncs)throw Error('SYN lost readback');return data.get(k);},async list({prefix,limit}){return new Map([...data].filter(([k])=>k.startsWith(prefix)).sort().slice(0,limit));},async put(k,v){data.set(k,v);},async transaction(fn){state.transactions++;const result=await fn(storage);if(state.fail==='transaction')throw Error('SYN lost final transaction');return result;},async sync(){state.syncs++;if(state.fail==='sync')throw Error('SYN lost sync');}};
+ const ctx={storage,id:actor},env={AFW_INDEPENDENT_CLOSURE:{idFromName:()=>actor},AFW_QA_VERSION:{id:uuid},RELEASE_DB:{withSession(){throw Error('component has no SQL');}}};
+ const lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted)throw Error('SYN expired component lease');}});
+ return {ctx,env,lease,controller,data,state,journal:createFiniteOwnerCleanupJournal({ctx,env})};
+}
+test('R2 cleanup records roundtrip',()=>{
+ const i=identity(),s=send(i),o=observed(s),r=receipt(i,s,o),q=seal('Reconciled',{purpose:'afw.finite-owner-cleanup-reconciled.v1',identityHash:i.recordHash,sendHash:s.recordHash,delivery:1,factsHash:h('e'),observedAt:C0+150});
+ for(const [kind,value]of [['Identity',i],['Send',s],['Observed',o],['Receipt',r],['Reconciled',q]])assert.deepEqual(decode(kind,encode(kind,value)),value);
+});
+test('R2 cleanup hash rejects drift',()=>{const i=identity();assert.throws(()=>encode('Identity',{...i,planHash:h('f')}));assert.throws(()=>decode('Identity',encode('Identity',i)+' '));});
+test('R2 cleanup records reject accessors and extra fields',()=>{const i=identity();let reads=0;const a={...i};Object.defineProperty(a,'planHash',{enumerable:true,get(){reads++;return i.planHash;}});assert.throws(()=>encode('Identity',a));assert.equal(reads,0);assert.throws(()=>change('Identity',i,{authority:true}));});
+test('R2 cleanup identity binds original plan and clock',()=>{const i=identity();for(const delta of [{C0:C0+1},{C1:C1+1},{I0:I0+1},{sourceRevision:'wrong'},{actorId:'unknown'},{planHash:null}])assert.throws(()=>change('Identity',i,delta));assert.notEqual(change('Identity',i,{planHash:h('f')}).recordHash,i.recordHash);});
+test('R2 cleanup send permits only fixed reductions',()=>{const s=send();for(const delta of [{operation:'grant'},{operation:'delete_client'},{deadline:s.deadline+1},{requestId:'sdk-id'}])assert.throws(()=>change('Send',s,delta));assert.equal(send(identity(),'monitoring_revoke').operation,'monitoring_revoke');});
+test('R2 cleanup observed requires original send',async()=>{const f=component(),i=identity(),s=send(i);await f.journal.appendIdentity(i,f.lease);const o=observed(s);assert.equal((await f.journal.appendObserved({preconnectionId:i.preconnectionId,operation:'sdk_revoke',record:o},f.lease)).status,'uncertain');await f.journal.appendSend({preconnectionId:i.preconnectionId,record:s},f.lease);assert.equal((await f.journal.appendObserved({preconnectionId:i.preconnectionId,operation:'sdk_revoke',record:change('Observed',o,{observedAt:s.deadline})},f.lease)).status,'uncertain');assert.equal((await f.journal.appendObserved({preconnectionId:i.preconnectionId,operation:'sdk_revoke',record:o},f.lease)).status,'recorded');});
+test('R2 cleanup receipt requires business closure',()=>{assert.throws(()=>change('Receipt',receipt(),{businessAccessClosed:false}));assert.throws(()=>change('Receipt',receipt(),{restoreAckHash:null}));});
+test('R2 cleanup receipt forbids global drain and namespace claims',()=>{for(const field of ['globalNativeDrainVerified','sdkNamespaceEmptyVerified'])assert.throws(()=>change('Receipt',receipt(),{[field]:true}));});
+test('R2 cleanup receipt preserves never-issued null obligations',()=>{const r=receipt(identity(),null,null);assert.equal(r.sdkReductionReturned,false);assert.equal(r.sdkSendHash,null);assert.equal(r.sdkObservedHash,null);assert.equal(change('Receipt',r,{restoreSendHash:null,restoreAckHash:null}).restoreAckHash,null);assert.throws(()=>change('Receipt',r,{sdkReductionReturned:true}));});
+test('R2 cleanup journal append is once',async()=>{const f=component(),i=identity(),s=send(i);assert.equal((await f.journal.appendIdentity(i,f.lease)).status,'recorded');assert.equal((await f.journal.appendIdentity(i,f.lease)).status,'existing');assert.equal((await f.journal.appendSend({preconnectionId:i.preconnectionId,record:s},f.lease)).status,'recorded');assert.equal((await f.journal.appendSend({preconnectionId:i.preconnectionId,record:change('Send',s,{requestHash:h('f')})},f.lease)).status,'uncertain');assert.equal(f.data.size,2);});
+test('R2 cleanup journal rejects foreign identity and unknown suffix',async()=>{const f=component(),i=identity();assert.equal((await f.journal.appendIdentity(change('Identity',i,{actorId:h('f')}),f.lease)).status,'uncertain');assert.equal(f.data.size,0);await f.journal.appendIdentity(i,f.lease);f.data.set('afw.finite-owner-cleanup.v1:'+i.preconnectionId+':unknown','{}');await assert.rejects(f.journal.read({preconnectionId:i.preconnectionId},f.lease));});
+test('R2 cleanup journal requires transaction sync and readback',async()=>{for(const mode of ['transaction','sync','readback']){const f=component();f.state.fail=mode;assert.equal((await f.journal.appendIdentity(identity(),f.lease)).status,'uncertain');assert.equal(f.state.transactions,1);assert.equal(f.data.size,1,'committed row never substitutes for original acknowledgement');}const f=component();assert.equal((await f.journal.appendIdentity(identity(),f.lease)).status,'recorded');assert.equal(f.state.syncs,1);assert(f.state.reads>0);});
+test('R2 cleanup scope retains actual work after logical abort',async()=>{const f=component();let release;const actual=new Promise(resolve=>{release=resolve;});await observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:f.lease},async()=>{retainFiniteOwnerStagePromise(actual);return 'logical refusal';});f.controller.abort();const other=component();assert.throws(()=>observeFiniteReadOnlyWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true));release();await actual;await Promise.resolve();assert.equal(await observeFiniteReadOnlyWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true),true);other.controller.abort();});
+test('R2 cleanup scope rejects foreign or nested root',async()=>{const f=component(),other=component();await observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:f.lease},async()=>{assert.throws(()=>observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true));assert.throws(()=>observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:f.lease},async()=>true));});f.controller.abort();});
`````

