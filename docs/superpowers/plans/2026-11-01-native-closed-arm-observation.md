# Native closed ARM HTTP observation implementation

- [ ] Review narrow design against PR683 HTTP lease and PR689 settlement regressions.
- [ ] RED: unit contract and actual native Workflow/wrapper tests; isolated remote branch, no local build.
- [ ] Implement internal observer and thin inherited closed wrapper; preserve original5s and all old fences.
- [ ] GREEN: targeted then full cloud CI/build; independently review exact head.
- [ ] Merge exact reviewed tree and record source/schema receipts. No runtime proof from merge.
- [ ] Separately prepare finite actual-native publication/one observation/restoration, only after immutable baseline qualification and primary closure/pins. Never replay a consumed intent; no owner grant needed for this observation.

Design review0P1/P2. RED04a24fd4 /CI41257692522/job124704263717:907PASS29FAIL, acceptednativeHTTPfixture independentlyqualified. Implementation6c749a98 /CI41257995167/job124705163248:937PASS1FAIL; d0ed4dd9 diagnostic-only /CI41258325411/job124706143429 reproduced same937/1. Actual native completed both snapshots (46GET), then strict literal validation rejected non-data machinery from the borrowed Step object. Correction transports the already-bounded strict JSON string across Step, as accepted678/684/689 do, checks exact local issuance+originallease and parses only at consumer. No stripping unknown fields or deadline relaxation. Temporary stack instrumentation removed. No runtime publication yet.
