const gBad=()=>{throw Error('G20_OWN_UNQUALIFIED');};
const gSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const gObj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const gKeys=(x,n)=>{if(!gObj(x))return false;const a=Object.keys(x);return a.length===n.length&&a.every((k,i)=>k===n[i]);};
const gInt=(x,a,b)=>Number.isSafeInteger(x)&&x>=a&&x<=b;
const gBytes=s=>new TextEncoder().encode(s).length;

// A minimal independent interpreter of frozen normative DATA: ordered arrays at every object.
function gSchema(value,node,document){
 if(node.$ref)return gSchema(value,document.$defs[node.$ref.slice(8)],document);
 if(Object.hasOwn(node,'const')&&!gSame(value,node.const))return false;
 if(node.enum&&!node.enum.some(v=>gSame(v,value)))return false;
 if(node.anyOf&&!node.anyOf.some(s=>gSchema(value,s,document)))return false;
 if(node.oneOf&&node.oneOf.filter(s=>gSchema(value,s,document)).length!==1)return false;
 if(node.allOf&&!node.allOf.every(s=>gSchema(value,s,document)))return false;
 if(node.if){const branch=gSchema(value,node.if,document)?node.then:node.else;if(branch&&!gSchema(value,branch,document))return false;}
 if(node.not&&gSchema(value,node.not,document))return false;
 if(node.type==='object'&&!gObj(value)||node.type==='array'&&!Array.isArray(value)||node.type==='integer'&&!Number.isSafeInteger(value)||node.type==='string'&&typeof value!=='string'||node.type==='null'&&value!==null||node.type==='boolean'&&typeof value!=='boolean')return false;
 if(node.properties&&gObj(value)){
  const names=Object.keys(node.properties);
  if(node.additionalProperties===false&&!gKeys(value,names))return false;
  if(node.required&&!node.required.every(k=>Object.hasOwn(value,k)))return false;
  for(const k of names)if(Object.hasOwn(value,k)&&!gSchema(value[k],node.properties[k],document))return false;
 }
 if(typeof value==='number'&&(node.minimum!==undefined&&value<node.minimum||node.maximum!==undefined&&value>node.maximum))return false;
 if(typeof value==='string'&&node.pattern&&!new RegExp(node.pattern).test(value))return false;
 if(Array.isArray(value)){
  if(node.minItems!==undefined&&value.length<node.minItems||node.maxItems!==undefined&&value.length>node.maxItems)return false;
  for(let i=0;i<value.length;i++){const rule=node.prefixItems?.[i]??node.items;if(rule===false||rule&& !gSchema(value[i],rule,document))return false;}
 }
 return true;
}

export {gBad,gSame,gObj,gKeys,gInt,gBytes,gSchema};
