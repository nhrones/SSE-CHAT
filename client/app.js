
import * as dom from './dom.js';
import { initComms } from './comms.js';
import { generateName } from './names.js';

// create a unique Chat name
export const name = generateName();
console.log("started - ", name);

dom.init();
initComms(name);

