/** A proposal may replace existing data only after the person selects it. */
export function defaultCopilotSelection(suggestions = [], draft = {}) {
  return suggestions.filter(item => {
    const current = draft[item.field];
    return Array.isArray(current) ? current.length === 0
      : typeof current === 'string' ? current.trim().length === 0
        : current == null;
  }).map(item => item.field);
}
