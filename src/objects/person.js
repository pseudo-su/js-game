import {
  TILE_SIZE,
} from '../settings/constants';

import {
  ellipse,
  noStroke,
  color,
  fill
} from '../world';

import { direction8Point, getMovePosition, pointOutsideScene, squareOutsideScene, isBlockedMovingIntoNewZone } from '../actions'

export default class Person {
  constructor(x, y) {
    this.x = x * TILE_SIZE || 0;
    this.y = y * TILE_SIZE || 0;

    this.color = [220, 220, 220];
  }

  setZone(zone) {
    this.zone = zone;
  }

  setPartialZone(zone) {
    this.partialZone = zone
  }

  swapOutMainZone() {
    this.zone = this.partialZone;
    this.partialZone = null;
  }


  move() {
    const direction = direction8Point();

    const { x, y } = getMovePosition(this.x, this.y, direction, {distance: 2, distanceDiag: 1.5});

    const start = { x, y }
    const end = { x: x + TILE_SIZE, y: y + TILE_SIZE }

    const blocked = squareOutsideScene(this.zone.points, {start, end});
    const blockedWithZones = isBlockedMovingIntoNewZone(blocked, this.zone.nearbyZones, {start, end}, this.partialZone);

    this.setPartialZone(blockedWithZones.partialZone || this.partialZone);
    
    if (!blockedWithZones.vertical) this.y = y;
    if (!blockedWithZones.horizontal) this.x = x;

    // partial zone become main zone check
    const switchPartialToMain = pointOutsideScene(this.zone.points, {x: this.x+(TILE_SIZE/2), y: this.y+(TILE_SIZE/2)})
    if(switchPartialToMain) console.log('swap') && this.swapOutMainZone();
    // partial zone exit check
    
    
  }

  render() {
    const x = (this.x) + (TILE_SIZE / 2);
    const y = (this.y) + (TILE_SIZE / 2);

    noStroke();
    fill(color(...this.color));
    ellipse(x, y, TILE_SIZE-2, TILE_SIZE-2, 200);
  }
}