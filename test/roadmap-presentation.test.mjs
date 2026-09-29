import test from 'node:test';
import assert from 'node:assert/strict';
import { roadmapPresentation } from '../lib/roadmap-presentation.mjs';
import { buildRoadmap } from '../lib/methodology.mjs';

test('all current roadmap entries have EN and PT presentation without changing canonical records', () => {
  const items = ['none', 'dns', 'source'].flatMap(control => buildRoadmap({control, goals: ['content', 'tools']}));
  for (const item of items) {
    const before = JSON.stringify(item);
    for (const locale of ['en', 'pt']) {
      const view = roadmapPresentation(item, locale);
      assert.notEqual(view.title, item.title);
      assert.notEqual(view.stage, item.stage);
      assert.equal(view.id, item.id);
    }
    assert.equal(JSON.stringify(item), before);
    assert.deepEqual(roadmapPresentation(item, 'es'), item);
  }
});
test('unknown entries and locales preserve source content', () => {
  const item = {id:'future', title:'Original', stage:'Original', reason:'Evidence'};
  assert.deepEqual(roadmapPresentation(item, 'en'), item);
  assert.deepEqual(roadmapPresentation(item, 'de'), item);
});
