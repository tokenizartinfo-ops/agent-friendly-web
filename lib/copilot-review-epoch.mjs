import { applyIntakeDraft } from './intake-draft-review.mjs';

/** A source conversation change invalidates a preview independently of the dossier field values. */
export function applyCopilotReview(draft, changes, preparedEpoch, currentEpoch) {
  if (!Number.isSafeInteger(preparedEpoch) || preparedEpoch !== currentEpoch) throw new Error('stale_preview');
  return applyIntakeDraft(draft, changes);
}
