import subprocess
import threading
import unittest

from deadline_supervisor import BUDGET_NS, run_controller


class DeadlineTests(unittest.TestCase):
    def test_full_lifetime_includes_startup_and_final_exit_readback(self):
        for elapsed, expected in [(BUDGET_NS - 1, 0), (BUDGET_NS, 124), (BUDGET_NS + 1, 124)]:
            with self.subTest(elapsed=elapsed):
                clock = [0]
                expired = []

                class Child:
                    def wait(self, timeout):
                        self.timeout = timeout
                        clock[0] = elapsed
                        return 0

                child = Child()

                def start():
                    clock[0] = 10_000_000_000
                    return child

                self.assertEqual(run_controller(start, lambda: clock[0], lambda: expired.append(True)), expected)
                self.assertEqual(child.timeout, 320)
                self.assertEqual(len(expired), int(expected == 124))

    def test_timeout_irreversibly_excludes_late_zero_while_cleanup_is_blocked(self):
        notified, in_cleanup, release = threading.Event(), threading.Event(), threading.Event()
        actual = []

        class Child:
            def wait(self, timeout=None):
                if timeout is not None:
                    raise subprocess.TimeoutExpired("unit", timeout)
                in_cleanup.set()
                release.wait()
                return 0

        def collect():
            actual.append(run_controller(Child, lambda: 0, notified.set))

        thread = threading.Thread(target=collect, daemon=True)
        thread.start()
        try:
            self.assertTrue(notified.wait(2))
            self.assertTrue(in_cleanup.wait(2))
            self.assertTrue(thread.is_alive())
            self.assertEqual(actual, [])
        finally:
            release.set()
            thread.join(2)
        self.assertFalse(thread.is_alive())
        self.assertEqual(actual, [124])


if __name__ == "__main__":
    unittest.main()
