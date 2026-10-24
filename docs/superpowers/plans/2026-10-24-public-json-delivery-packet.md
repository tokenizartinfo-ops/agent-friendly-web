# Plan: separate read-only delivery packet — 2026-10-24

Spec: docs/superpowers/specs/2026-10-24-public-json-delivery-packet-design.md

1. Pin base main6531a005; add four behavioral packet-selection tests and docs before implementation. Open source PR; existing Python qualification workflow must fail because load_delivery_packet is absent. Preserve real RED logs; do not relabel existing tests as new.
2. Add fixed-pair load_delivery_packet(root, contract_path=legacy) and refactor only the old main's existing loading checks into it. Preserve its default, output paths and remaining guards. Add a literal new wrapper, contract and original verified inventory, plus a separate read-only qualification workflow. Keep public-inactive-upload.py, legacy contract/inventory and legacy workflows byte-identical.
3. Require GREEN Python suite, both legacy and new package qualification, npm test/lint/build, no upload credentials or mutation step. Verify qualifier head and the original browser artifact provenance separately.
4. Review complete diff independently, exact head and tree. Merge source only under standing authorization; read back main CI and preserve separate handoff receipts. Do not invoke either uploader, republish AFW Operations, renew secrets, retry native runtime or claim PC-off.

Execute in GitHub/authorized cloud. No local checkout, install, build, container or persistent process. Retain original evidence and private builder; avoid signed URLs in messages/logs. Final actual results are recorded on carrying PR/issue497 rather than fabricated in this initial plan.
