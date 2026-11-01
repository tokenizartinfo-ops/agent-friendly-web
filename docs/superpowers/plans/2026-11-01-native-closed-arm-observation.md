# Native closed ARM HTTP observation implementation

- [ ] Review narrow design against PR683 HTTP lease and PR689 settlement regressions.
- [ ] RED: unit contract and actual native Workflow/wrapper tests; isolated remote branch, no local build.
- [ ] Implement internal observer and thin inherited closed wrapper; preserve original5s and all old fences.
- [ ] GREEN: targeted then full cloud CI/build; independently review exact head.
- [ ] Merge exact reviewed tree and record source/schema receipts. No runtime proof from merge.
- [ ] Separately prepare finite actual-native publication/one observation/restoration, only after immutable baseline qualification and primary closure/pins. Never replay a consumed intent; no owner grant needed for this observation.
