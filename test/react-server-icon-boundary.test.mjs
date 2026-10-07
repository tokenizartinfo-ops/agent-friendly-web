import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
function files(root){return readdirSync(root,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(join(root,entry.name)):entry.name.endsWith('.tsx')?[join(root,entry.name)]:[]);}
test('server-rendered pages do not load context-dependent lucide-react outside a client boundary',()=>{
 const unsafe=files('app').filter(path=>{const source=readFileSync(path,'utf8');return /from\s+['"]lucide-react['"]/.test(source)&&!/^\s*['"]use client['"]\s*;/.test(source);});
 assert.deepEqual(unsafe,[],`Context-dependent icon imports execute under react-server: ${unsafe.join(', ')}`);
});
