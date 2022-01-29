import { Buffer } from 'buffer';

console.log('polyfill')
window.global = window;
global.Buffer = Buffer;
global.process = {
    env: { DEBUG: undefined },
    version: ''
}