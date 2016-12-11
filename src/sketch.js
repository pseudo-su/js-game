import {
  CANVAS
} from './settings/constants';

import { shareInstance } from './world';

import { renderScreen } from './renderer';

import { onMousePress, onKeyPress } from './actions';

export default function Game(instance) {

  function setup() {
    instance.createCanvas(CANVAS.width, CANVAS.height);

    shareInstance(instance);
  }

  // Assign methods to the p5 object
  Object.assign(instance, { 
    setup,
    draw: renderScreen
  });

  Object.assign(instance, {
    mousePressed: onMousePress,
    keyPressed: onKeyPress
  });
}