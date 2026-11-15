export function shape(v,s){
 const need=x=>{if(!x)throw 1;};
 if(s.anyOf){let count=0;for(const one of s.anyOf)try{shape(v,one);count++;}catch{}need(count===1);return;}
 if(s.enum){need(s.enum.some(x=>Object.is(x,v)));return;}
 if(s.type==='null'){need(v===null);return;}
 if(s.type==='integer'){need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum);return;}
 if(s.type==='string'){need(typeof v==='string'&&new RegExp(s.pattern).test(v));return;}
 if(s.type==='array'){need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems);for(const x of v)shape(x,s.items);return;}
 if(s.type==='object'){need(v&&typeof v==='object'&&!Array.isArray(v)&&s.additionalProperties===false&&JSON.stringify(Object.keys(v).sort())===JSON.stringify(s.required.slice().sort()));for(const k of s.required)shape(v[k],s.properties[k]);return;}throw 1;
}
