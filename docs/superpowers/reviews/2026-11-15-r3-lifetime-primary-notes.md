# Source-only transport lifetime — primary reference notes
15nov2026. Design input only for correction round2 N05; not implementation, tests, runtime or a guarantee.

Linux PR_SET_PDEATHSIG is configured on the calling process for termination of its parent creator thread. Its setting is cleared in a forked child; ordinary exec preserves it, with credential/capability exceptions. Arming after the relevant parent has already disappeared does not retroactively deliver that event. Therefore a single setting on a supervisor cannot be treated as a recursive descendant fence; every necessary lineage/race must be justified. [Linux man-pages](https://man7.org/linux/man-pages/man2/PR_SET_PDEATHSIG.2const.html)

This was checked as a primary API reference. No source sample was copied into implementation or executed. The supplementary author example was viewed only for semantics, not adopted. Attempts to read the exact Node22.23.4/v22 documentation via the web tool were inaccessible; that is not evidence of runtime absence or incompatibility. The actual GHA setup remains separate observed evidence.

N05 design must still be proposed by implementer and gated by Root before coding. Distinct nested limits inside outer5s/120s, existing pure-control90s/20s fence, actual blocked-child/supervisor-loss controls, no caller PID/group/command, no broad kill or unrelated scans, no Native timing changes. I3/openImportant/readiness remain held. Source closed1fe20347, no new run.
