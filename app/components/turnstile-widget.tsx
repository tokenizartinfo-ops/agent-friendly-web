'use client';

import { useEffect, useId, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  siteKey: string;
  onToken: (token: string) => void;
};

export function TurnstileWidget({ siteKey, onToken }: TurnstileWidgetProps) {
  const reactId = useId();
  const containerId = `turnstile-${reactId.replaceAll(':', '')}`;
  const widgetId = useRef('');

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    let attempts = 0;
    const render = () => {
      if (cancelled) return;
      if (!window.turnstile) {
        attempts += 1;
        if (attempts < 80) window.setTimeout(render, 100);
        return;
      }
      widgetId.current = window.turnstile.render(`#${containerId}`, {
        sitekey: siteKey,
        action: 'request_plan',
        callback: onToken,
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      });
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-afw-turnstile]');
    if (existing) render();
    else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.afwTurnstile = 'true';
      script.addEventListener('load', render, { once: true });
      document.head.appendChild(script);
    }
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
    };
  }, [containerId, onToken, siteKey]);

  return <div id={containerId} className="turnstile-slot" aria-label="Cloudflare Turnstile" />;
}

