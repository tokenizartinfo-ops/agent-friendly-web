// Original OWN literal control adapter; no Source code import.
function w1LiteralControls(data,replay){return [...data.positives.map(t=>({...t,want:true})),...data.negatives.map(t=>({...t,want:false}))].map(t=>{let accepted=false;try{const result=replay(t.snapshot);accepted=!t.expected||JSON.stringify(result)===JSON.stringify(t.expected);}catch{}return {id:t.id,pass:accepted===t.want,accepted};});}
export {w1LiteralControls};
