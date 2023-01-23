import * as dom from './dom.js';
import { initComms } from './comms.js';
import { generateName } from './names.js';
export const name = generateName();
console.log("started");
dom.init();
initComms(name);
