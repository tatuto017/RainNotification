import { notice        } from './functions';
import { setTrigger    } from './functions';
import { createTrigger } from './functions';

declare const global: {
  [x: string]: any;
}

global.notice = () => notice();

global.createTrigger = () => createTrigger();

global.setTrigger = () => setTrigger();
