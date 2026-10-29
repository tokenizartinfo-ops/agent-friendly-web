# Plan — private reduce/restore Workflow

1. Add failing actual actor/Workflow tests: exact source/config pins, no retry after unknown ACK, drift and control withdrawal.
2. Add fixed preflight, durable one-effect reduction and hash/deadline-bound original RPC; retain restore-only.
3. Exercise native Workflow/DO orchestration and the existing real reduction storage fixture in Actions.
4. One independent review, fix material findings with regression evidence, full CI and merge. No runtime activation.
