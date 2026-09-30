/** Recoverable errors preserve the user's brief view; recovery controls remain visible in the workspace. */
/** @param {{pilot:boolean,loaded:boolean,requested:boolean,conflict?:boolean,sessionRequired?:boolean}} input */
export function isGuidedPilotView({ pilot, loaded, requested }) {
  return Boolean(pilot && loaded && requested);
}
