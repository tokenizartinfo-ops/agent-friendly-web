# Plan: manual public provider check

1. Base on accepted provider-history correction, add the fixed manual-only workflow and this design. This reversible read-only configuration is verified through CI/source review and one actual hosted run rather than mirrored configuration tests.
2. One whole-branch review and one fix pass; required CI before merge. Preserve main source/provenance and other workflows.
3. Dispatch ONCE on main; inspect result artifact and exact run/source, record whether blocked/unknown/resolved without activating anything. Stop at a genuine external provider hold. No local monitor or claimed permanent guard.
