import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import 'p5/lib/addons/p5.sound';

import './index.css';

import sketch from './sketch';

// See https://github.com/processing/p5.js/wiki/Instantiation-Cases
new p5(sketch, document.getElementById('root'));