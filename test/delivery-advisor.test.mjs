import test from 'node:test';
import assert from 'node:assert/strict';
import { deliveryAdvice, DELIVERY_ADVICE_COPY } from '../lib/delivery-advisor.mjs';

test('asks about actual delivery capability and ignores provider names', () => {
  for (const input of [undefined, 'Hostinger', 'Donweb', 'wordpress', 'admin', { hosting: 'cPanel' }]) {
    assert.equal(deliveryAdvice(input).step, 'ask_capability');
    assert.equal(deliveryAdvice(input).method, null);
  }
});
test('distinguishes CMS editing, plugin installation, files, source and third-party maintenance', () => {
  const expected = { cms_edit: 'maintainer_handoff', cms_plugin: 'scoped_plugin_review', hosting_files: 'verified_docroot', repository: 'source_pr', maintainer: 'maintainer_handoff', unknown: 'identify_maintainer' };
  for (const [capability, method] of Object.entries(expected)) {
    const advice = deliveryAdvice(capability);
    assert.equal(advice.method, method);
    assert.equal(advice.step, 'review_path');
    assert.equal(advice.authorization, 'none');
    assert.equal(advice.evidence, 'user_selected_unverified');
    assert.equal(advice.publishes, false);
  }
});
test('advice contains a single next step and complete explanations in each supported language', () => {
  for (const copy of Object.values(DELIVERY_ADVICE_COPY)) {
    assert.ok(copy.question && copy.boundary && copy.back);
    assert.equal(Object.keys(copy.options).length, 6);
    for (const capability of Object.keys(copy.options)) {
      const advice = deliveryAdvice(capability);
      assert.ok(copy.paths[advice.method].title);
      assert.ok(copy.paths[advice.method].next);
    }
  }
});
