/** Recoverable errors preserve the user's brief view; recovery controls remain visible in the workspace. */
export function isGuidedPilotView({ pilot, loaded, requested }) {
  return Boolean(pilot && loaded && requested);
}
