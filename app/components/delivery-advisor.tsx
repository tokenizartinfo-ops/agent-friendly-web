'use client';
import { useState } from 'react';
import { deliveryAdvice, DELIVERY_ADVICE_COPY } from '../../lib/delivery-advisor.mjs';

export function DeliveryAdvisor({locale}:{locale:'es'|'en'|'pt'}) {
  const [capability, setCapability] = useState('');
  const copy = DELIVERY_ADVICE_COPY[locale];
  const advice = deliveryAdvice(capability);
  const path = advice.method ? copy.paths[advice.method as keyof typeof copy.paths] : null;
  return <details className="delivery-advisor">
    <summary>{copy.open}</summary>
    {path ? <div aria-live="polite"><strong>{path.title}</strong><p>{path.next}</p><button type="button" className="secondary-action" onClick={()=>setCapability('')}>{copy.back}</button></div>
      : <div><p>{copy.reassurance}</p><label>{copy.question}<select value={capability} onChange={event=>setCapability(event.target.value)}><option value="">—</option>{Object.entries(copy.options).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>}
    <p className="capsule-guidance-boundary">{copy.boundary}</p>
  </details>;
}
