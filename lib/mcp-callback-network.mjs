import {isIP} from 'node:net';

// Conservative callback policy, not an assertion of Internet routability.
// IANA special registries reviewed 2026-10-11 (registry dates 2025-10-09).
const special4=['0.0.0.0/8','10.0.0.0/8','100.64.0.0/10','127.0.0.0/8','169.254.0.0/16','172.16.0.0/12','192.0.0.0/24','192.0.2.0/24','192.31.196.0/24','192.52.193.0/24','192.88.99.0/24','192.168.0.0/16','192.175.48.0/24','198.18.0.0/15','198.51.100.0/24','203.0.113.0/24','224.0.0.0/3'];
const special6=['2001::/23','2001:db8::/32','2002::/16','2620:4f:8000::/48','3fff::/20'];
function integer(ip,family){
 if(family===4)return ip.split('.').reduce((n,v)=>(n<<8n)|BigInt(v),0n);
 const halves=ip.split('::'),left=halves[0]?halves[0].split(':'):[],right=halves[1]?halves[1].split(':'):[];
 const words=halves.length===1?left:[...left,...Array(8-left.length-right.length).fill('0'),...right];
 return words.reduce((n,v)=>(n<<16n)|BigInt('0x'+v),0n);
}
function range(cidr,family){const [ip,prefix]=cidr.split('/'),shift=BigInt((family===4?32:128)-Number(prefix));return {shift,base:integer(ip,family)>>shift};}
const ranges4=special4.map(c=>range(c,4)),ranges6=special6.map(c=>range(c,6)),global6=range('2000::/3',6);
const within=(value,r)=>value>>r.shift===r.base;
export function isPublicCallbackIp(ip){
 if(typeof ip!=='string'||ip.length>64||ip.includes('%'))return false;
 const family=isIP(ip);if(!family||family===6&&ip.includes('.'))return false;
 const value=integer(ip,family);
 return family===4?!ranges4.some(r=>within(value,r)):within(value,global6)&&!ranges6.some(r=>within(value,r));
}
export function parseMcpCallbackUrl(value){
 const invalid=()=>{throw Error('Invalid MCP callback destination');};
 if(typeof value!=='string'||value.length>2048||/[\u0000-\u0020\u007f#]/.test(value))invalid();
 let url;try{url=new URL(value);}catch{invalid();}
 const hostname=url.hostname,labels=hostname.split('.');
 if(url.protocol!=='https:'||url.port||url.username||url.password||hostname.startsWith('[')||isIP(hostname)||hostname.length>253||labels.length<2||labels.some(l=>!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(l))||/^(?:localhost|local|internal|invalid|test|example|onion)$/.test(labels.at(-1)))invalid();
 return Object.freeze({hostname,path:url.pathname+url.search});
}
