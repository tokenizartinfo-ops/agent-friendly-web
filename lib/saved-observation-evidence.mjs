const knownSignals=[
 'robots','sitemap','linkHeaders','structuredData','directAnswers','llms','markdown',
 'contentSignals','explicitAiCrawlerPolicy','allowsPublicCrawl','mcp','openapi',
 'apiCatalog','aiCatalog','skills','webmcp','ownership','sources','payments',
];

/** Read a stored, sanitized audit without returning unexpected historical keys. */
export function storedObservationEvidence(value){
 let parsed;
 try{parsed=JSON.parse(value);}catch{return {};}
 if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return {};
 return Object.fromEntries(knownSignals.filter(key=>typeof parsed[key]==='boolean').map(key=>[key,parsed[key]]));
}
