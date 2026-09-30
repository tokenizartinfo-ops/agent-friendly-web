/** Reveal before moving focus or scrolling, including after a user manually closes details.
 * @param {HTMLDetailsElement|null} panel
 * @param {()=>void} requestOpen
 */
export function revealDossierDelivery(panel,requestOpen) {
 if(!panel||panel.tagName!=='DETAILS')return false;
 panel.open=true;
 requestOpen();
 panel.querySelector('summary')?.focus({preventScroll:true});
 panel.scrollIntoView({behavior:'smooth',block:'start'});
 return true;
}
