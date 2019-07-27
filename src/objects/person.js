import {
  TILE_SIZE,
} from '../settings/constants';

import {
  ellipse,
  noStroke,
  color,
  fill
} from '../world';

import { direction8Point, getMovePosition, pointOutsideScene, squareOutsideScene, squareLeftScene, isBlockedMovingIntoNewZone } from '../actions'

export default class Person {
  constructor(x, y) {
    this.x = x * TILE_SIZE || 0;
    this.y = y * TILE_SIZE || 0;

    this.color = [220, 220, 220];
  }

  setZone = (zone) => {
    this.zone = zone;
  }

  setPartialZone = (zone) => {
    this.partialZone = zone
  }

  swapOutMainZone = () => {
    const temp = this.zone;

    this.zone = this.partialZone;
    this.partialZone = temp;
  }

  clearPartialZone = () => {
    this.partialZone = null;
  }

  getBBox = () => {
    return {
      start: {x: this.x, y: this.y},
      end: {x: this.x+TILE_SIZE, y: this.y+TILE_SIZE}
    }
  }

  getCenterPt = () => {
    const x = this.x+(TILE_SIZE/2);
    const y = this.y+(TILE_SIZE/2);
    return {x,y};
  }

  move() {
    // Get direction to go in
    const direction = direction8Point();

    const start = getMovePosition(this.x, this.y, direction, {distance: 2, distanceDiag: 1.5});
    const end = { x: start.x + TILE_SIZE, y: start.y + TILE_SIZE }

    const blocked = squareOutsideScene(this.zone.points, {start, end});
    const blockedWithZones = isBlockedMovingIntoNewZone(blocked, this.zone.nearbyZones, {start, end}, this.partialZone);
    
    this.setPartialZone(blockedWithZones.partialZone || this.partialZone);


    if (direction) {
      if (!blockedWithZones.left && ~direction.indexOf('left')) this.x = start.x;
      if (!blockedWithZones.up && ~direction.indexOf('up')) this.y = start.y;
      if (!blockedWithZones.right && ~direction.indexOf('right')) this.x = start.x;
      if (!blockedWithZones.down && ~direction.indexOf('down')) this.y = start.y;
    }

    // if (!blockedWithZones.vertical) this.y = y;
    // if (!blockedWithZones.horizontal) this.x = x;

    // partial zone become main zone check
    const switchPartialToMain = pointOutsideScene(this.zone.points, this.getCenterPt())
    if(switchPartialToMain) this.swapOutMainZone();
    // partial zone exit check
    
    const leftPartialZone = this.partialZone && squareLeftScene(this.partialZone.points, this.getBBox());
    if (leftPartialZone) this.clearPartialZone();

    this.zIndex = this.zone.zIndex + 2;
  }

  render() {
    const x = (this.x) + (TILE_SIZE / 2);
    const y = (this.y) + (TILE_SIZE / 2);

    noStroke();
    fill(color(...this.color));
    ellipse(x, y, TILE_SIZE-2, TILE_SIZE-2, 200);
  }
}