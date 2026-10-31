# Private generation draft store plan
31oct2026, source-only stacked branch from reviewed Task1a332 while its full CI completes. No live effects.
- [ ] RED exact primary/domain/bounded-read behavior and native immutable store; stubs intentionally fail before integration.
- [ ] GREEN minimal private decoder/reader and source SQL, preserve old packet schema/API.
- [ ] Full CI/lint/packages and whole-head review; merge parent/source tree exactly before final main integration.
- [ ] Record source acceptance; do NOT install schema, insert draft, mount RPC or claim Task2b/3/ARM/PCoff.
