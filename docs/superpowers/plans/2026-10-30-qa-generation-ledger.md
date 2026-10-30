# Implementation plan — QA generation metadata ledger

- [x] Design metadata-only API and pending→armed CAS reviewed independently.
- [ ] Commit focused RED tests: missing constructor, real storage fixture, legacy regression.
- [ ] Implement capsule/record grammar, bounded lineage, identity domain hashes and original lease.
- [ ] Implement pending ARM and separate promotion; argument-free observation/withdrawal.
- [ ] Native DO persistence/race acceptance and negative matrix.
- [ ] Independent review, CI/lint/build and reviewed merge.
- [ ] Record source acceptance and remaining integration gates.

No remote runtime, provider mutations, new D1 binding, grants, credentials or customer data. Future integration is outside this increment.
