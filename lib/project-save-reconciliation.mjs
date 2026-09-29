// A successful response acknowledges the submitted snapshot, not subsequent edits.
export function reconcileSavedDraft(submitted, saved, current) {
  const result = structuredClone(saved);
  for (const field of Object.keys(current)) {
    if (JSON.stringify(current[field]) !== JSON.stringify(submitted[field])) {
      result[field] = structuredClone(current[field]);
    }
  }
  return result;
}
