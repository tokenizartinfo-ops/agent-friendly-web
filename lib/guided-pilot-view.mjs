/** Keep the full workflow visible whenever loading, access or conflict needs attention. */
export function isGuidedPilotView({ pilot, loaded, requested, conflict, sessionRequired }) {
  return Boolean(pilot && loaded && requested && !conflict && !sessionRequired);
}
