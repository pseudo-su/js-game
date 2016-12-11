import {
  TILE_SIZE,
} from '../settings/constants';

import {
  rect,
  noStroke,
  fill,
  color
} from '../world';

export default class Zone {
  constructor(name, {x: sx, y: sy, width, height}, zIndex, color) {
    
    const randomColorVal = () => (Math.floor(Math.random() * 124) + 1)
    this.name = name || 'default'
    this.color = color || [randomColorVal(), randomColorVal(), randomColorVal()];
    this.zIndex = zIndex;

    this.tileDimensions = { width, height }
    this.tilePoints = {
      start: {
        x: sx,
        y: sy,
      },
      end: {
        x: sx + width,
        y: sy + height,
      }
    };

    this.dimensions = {
      width: width * TILE_SIZE,
      height: height * TILE_SIZE,
    }
    this.points = {
      start: {
        x: TILE_SIZE * sx,
        y: TILE_SIZE * sy,
      },
      end: {
        x: TILE_SIZE * (sx + width),
        y: TILE_SIZE * (sy + height),
      }
    };
  }

  render() {
    noStroke()
    fill(color(...this.color))
    rect(
      this.points.start.x,
      this.points.start.y,
      this.dimensions.width,
      this.dimensions.height
    )
  }
}