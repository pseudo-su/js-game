// Helpers to allow for module loading with p5 instead of using global mode

let world = {}

export function shareInstance(instance) {
  world = instance;
};

function p5Proxy(method) {
  return (...args) => world[method].bind(world)(...args)
}

const background = p5Proxy('background');
const rect = p5Proxy('rect');
const stroke = p5Proxy('stroke');
const strokeWeight = p5Proxy('strokeWeight');
const color = p5Proxy('color');
const line = p5Proxy('line');
const ellipse = p5Proxy('ellipse');
const noStroke = p5Proxy('noStroke');
const keyIsDown = p5Proxy('keyIsDown');
const fill = p5Proxy('fill');

export {
  background,
  rect,
  stroke,
  strokeWeight,
  color,
  line,
  ellipse,
  noStroke,
  keyIsDown,
  fill,
};