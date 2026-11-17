import { writeFile } from 'node:fs/promises';
import { exception } from './startup-diagnostics.mjs';
const record = (name, value) =>
  writeFile(name, JSON.stringify(value)+'\n', {flag:'wx',mode:0o600});
try {
  await record('fault-startup-entered.json', {entered:true});
  let terminal;
  try {
    await import('./fault-tools-child.mjs');
    terminal = {state:'FULFILLED',error:null};
  } catch (error) {
    terminal = {state:'REJECTED',error:exception(error,new URL('./',import.meta.url))};
    process.exitCode = 1;
  }
  await record('fault-startup-terminal.json',terminal);
} catch {
  process.exitCode = 1;
}
