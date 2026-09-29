import test from 'node:test';
import assert from 'node:assert/strict';
import { hasPendingDraft, shouldConfirmNavigation, attachDraftExitGuard } from '../lib/draft-exit-guard.mjs';

test('deferred confirmation receives the destination and prevents immediate navigation', () => {
  const listeners = new Map();
  const win = { location: { href: 'https://example.org/form' }, addEventListener: (key, fn) => listeners.set(key, fn), removeEventListener: key => listeners.delete(key) };
  let destination, blocked = false;
  const cleanup = attachDraftExitGuard(win, win, href => { destination = href; return false; });
  const anchor = { href: 'https://example.org/en/form', target: '', hasAttribute: () => false };
  listeners.get('click')({button: 0, target: {closest: () => anchor}, preventDefault: () => {blocked = true;}, stopImmediatePropagation() {}});
  assert.equal(destination, anchor.href);
  assert.equal(blocked, true);
  cleanup();
  assert.equal(listeners.size, 0);
});

test('confirming exit permits navigation without a second unload warning', () => {
  const listeners = new Map();
  const win = { location: { href: 'https://example.org/expediente' },
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name) };
  let prompts = 0;
  const cleanup = attachDraftExitGuard(win, win, () => { prompts++; return true; });
  const fail = () => assert.fail('Confirmed exit must not be blocked');
  const anchor = { href: 'https://example.org/en/dossier', target: '', hasAttribute: () => false };
  listeners.get('click')({ button: 0, target: { closest: () => anchor }, preventDefault: fail, stopImmediatePropagation: fail });
  listeners.get('beforeunload')({ preventDefault: fail });
  assert.equal(prompts, 1);
  cleanup();
  assert.equal(listeners.size, 0);
});

test('protect incomplete drafts even without a website, but not initial loading or saved state', () => {
  const base = { organization: '', website: '' };
  assert.equal(hasPendingDraft({ ready: true, base, draft: { ...base, organization: 'Demo' } }), true);
  assert.equal(hasPendingDraft({ ready: false, base, draft: { organization: 'Demo' } }), false);
  assert.equal(hasPendingDraft({ ready: true, base, draft: base }), false);
  assert.equal(hasPendingDraft({ ready: true, base, draft: base, busy: true }), true);
  assert.equal(hasPendingDraft({ ready: true, base, draft: base, conflict: true }), true);
});

test('language and other document navigation require confirmation; hash/new tabs/downloads do not', () => {
  const current = 'https://canary.agentfriendlyweb.dev/expediente?project=demo';
  const args = { current, href: '/en/dossier?project=demo' };
  assert.equal(shouldConfirmNavigation(args), true);
  assert.equal(shouldConfirmNavigation({ ...args, href: '#section' }), false);
  assert.equal(shouldConfirmNavigation({ ...args, target: '_blank' }), false);
  assert.equal(shouldConfirmNavigation({ ...args, modified: true }), false);
  assert.equal(shouldConfirmNavigation({ ...args, download: true }), false);
  assert.equal(shouldConfirmNavigation({ ...args, href: 'mailto:hello@example.org' }), false);
});

test('cancellation blocks navigation, unload warns, and cleanup removes listeners', () => {
  const listeners = new Map();
  const win = { location: { href: 'https://example.org/expediente' },
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name) };
  const doc = { addEventListener: win.addEventListener, removeEventListener: win.removeEventListener };
  let prompts = 0, prevented = 0, stopped = 0;
  const cleanup = attachDraftExitGuard(win, doc, () => { prompts++; return false; });
  const anchor = { href: 'https://example.org/en/dossier', target: '', hasAttribute: () => false };
  listeners.get('click')({ button: 0, target: { closest: () => anchor }, preventDefault: () => prevented++, stopImmediatePropagation: () => stopped++ });
  assert.equal(prompts, 1); assert.equal(prevented, 1); assert.equal(stopped, 1);
  listeners.get('beforeunload')({ preventDefault: () => prevented++ });
  assert.equal(prevented, 2);
  cleanup(); assert.equal(listeners.size, 0);
});
