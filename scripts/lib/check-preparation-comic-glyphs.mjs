// Synthetic Chromium glyph evidence only; no connection to a human browser.
import assert from 'node:assert/strict';
export async function observePreparationComicGlyphs(page,selector){
 await page.evaluate(()=>document.fonts.ready);
 const session=await page.context().newCDPSession(page);
 try{
  await session.send('DOM.enable');await session.send('CSS.enable');
  const {root}=await session.send('DOM.getDocument',{depth:0});
  const {nodeId}=await session.send('DOM.querySelector',{nodeId:root.nodeId,selector});
  assert.ok(nodeId,'glyph sample node exists');
  const {fonts}=await session.send('CSS.getPlatformFontsForNode',{nodeId});
  const used=fonts.filter(font=>font.glyphCount>0);
  assert.ok(used.length>0,'rendered glyph evidence required');
  assert.ok(used.every(font=>font.isCustomFont&&/^Comic ?Neue ?Angular$/i.test(font.familyName)),'actual bundled comic font required for '+selector);
  return {selector,families:[...new Set(used.map(font=>font.familyName))].sort(),customComicObserved:true,
   glyphCount:used.reduce((sum,font)=>sum+font.glyphCount,0)};
 }finally{await session.detach();}
}
