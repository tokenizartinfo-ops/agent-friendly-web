# Implementation plan: bounded provider history lookup

1. Commit the spec and regression tests on a remote AFW branch; record failing CI before implementation.
2. Add supplemental exact tracked snapshot to pure assessment and one fixed fallback request under original deadline/byte caps; preserve all original dependency gates.
3. Run proportional tests and full CI in Actions, one source review and one fix pass. Record evidence and merge only when required checks pass.
4. Confirm primary closure and save the next-step checkpoint. Do not re-run native107560aa, create OAuth grants or publish from this source-only block. A future fresh package/window needs primary provider clearance and separate operational reconciliation.
