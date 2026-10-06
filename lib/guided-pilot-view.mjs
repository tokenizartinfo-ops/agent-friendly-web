/** Recoverable errors preserve the user's brief view; recovery controls remain visible in the workspace. */
/** @param {{pilot:boolean,guidedEntry?:boolean,loaded:boolean,requested:boolean,conflict?:boolean,sessionRequired?:boolean}} input */
export function isGuidedPilotView({ pilot, guidedEntry=false, loaded, requested }) {
  return Boolean((pilot || guidedEntry) && loaded && requested);
}
