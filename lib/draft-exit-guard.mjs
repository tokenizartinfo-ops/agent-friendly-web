export function hasPendingDraft({ ready, draft, base, busy = false, conflict = false }) {
  return Boolean(ready && (busy || conflict || Object.keys({ ...base, ...draft })
    .some(key => JSON.stringify(base[key]) !== JSON.stringify(draft[key]))));
}

export function shouldConfirmNavigation({ current, href, target = '', modified = false, download = false }) {
  if (modified || download || (target && target !== '_self')) return false;
  try {
    const from = new URL(current), to = new URL(href, from);
    if (!['http:', 'https:'].includes(to.protocol)) return false;
    return from.origin !== to.origin || from.pathname !== to.pathname || from.search !== to.search;
  } catch { return false; }
}

// Nothing is persisted: cancelling leaves the live form in the same document.
export function attachDraftExitGuard(win, doc, confirmLeave) {
  let leaving = false;
  const unload = event => {
    if (leaving) return;
    event.preventDefault();
    event.returnValue = '';
  };
  const click = event => {
    if (event.defaultPrevented || event.button !== 0 || leaving) return;
    const anchor = event.target?.closest?.('a[href]');
    if (!anchor || !shouldConfirmNavigation({ current: win.location.href, href: anchor.href,
      target: anchor.target, download: anchor.hasAttribute('download'),
      modified: event.ctrlKey || event.metaKey || event.shiftKey || event.altKey })) return;
    if (confirmLeave(anchor.href)) leaving = true;
    else { event.preventDefault(); event.stopImmediatePropagation(); }
  };
  win.addEventListener('beforeunload', unload);
  doc.addEventListener('click', click, true);
  return () => {
    win.removeEventListener('beforeunload', unload);
    doc.removeEventListener('click', click, true);
  };
}
