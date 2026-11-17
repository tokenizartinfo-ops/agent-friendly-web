"""Process-completion deadline for the fixed, isolated AFW controller."""
import subprocess
import sys
import time

BUDGET_NS = 330_000_000_000
CONTROLLER = "docs/superpowers/source-lab/c2-get-winner-dependent/run-get-winner-tools.mjs"


def run_controller(start, now=time.monotonic_ns, expired=lambda: print("AFW_GET_TOOLS_DEADLINE", flush=True)):
    deadline = now() + BUDGET_NS
    child = start()
    try:
        code = child.wait(timeout=max(0, deadline - now()) / 1_000_000_000)
    except subprocess.TimeoutExpired:
        expired()
        # Admission is irreversibly closed, while cleanup retains the remaining job time.
        child.wait()
        return 124
    if now() >= deadline:
        expired()
        return 124
    return code if 0 <= code <= 255 else 1


if __name__ == "__main__":
    sys.exit(run_controller(lambda: subprocess.Popen(["node", CONTROLLER])))
