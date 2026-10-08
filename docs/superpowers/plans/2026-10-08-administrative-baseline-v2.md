# Administrative V2 implementation

1. Write and run failing V2 tests: independent contract, stable metadata/timestamp distinction, full resource checks and existing V1 compatibility.
2. Add separate V2 adapter and token digest; compose through unchanged V1 readback using validated immutable token projection. Do not change deployment or legacy interfaces.
3. Run focused tests, scoped lint/diff checks, independent review; push PR and verify exact CI test/lint/build before merge.
4. Save dated evidence and subsequent trusted-catalog/custody/hosted QA/PC-off gates. Source integration is not runtime adoption.
