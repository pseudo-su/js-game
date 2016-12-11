// import {
//   TILE_SIZE,
//   TILES_X,
//   TILES_Y,
// } from '../settings/constants';

import {
  background,
  // line
} from '../world';

import {
  grass_values,
  // grass_detail_values
} from '../settings/colors';

import { Person, Zone, Grid } from '../objects';

class GridScene {

  constructor() {
    this.person = new Person(2, 2);
    this.grid = new Grid();
    this.zones = [
      new Zone('1', {x: 1, y: 1, width: 3, height: 4}, 0),
      new Zone('2', {x: 4, y: 2, width: 3, height: 2}, 1),
      new Zone('3', {x: 7, y: 2, width: 3, height: 3}, 2),
      new Zone('4', {x: 6, y: 5, width: 4, height: 5}, 3),
      new Zone('5', {x: 0, y: 5, width: 5, height: 5}, 4),
      new Zone('6', {x: 5, y: 5, width: 1, height: 2}, 5),
    ];
    this.zones = this.zones.map(zone => {
      zone.nearbyZones = this.zones
        .filter(nZone => zone !== nZone)
        .filter(nZone => (
          nZone.zIndex <= zone.zIndex + 1 &&
          nZone.zIndex >= zone.zIndex - 1
        ))
      console.log(zone.nearbyZones);

      return zone
    })

    this.person.setZone(this.zones[0])
  }

  render() {
    background(...grass_values);
    this.grid.render();
    this.zones.forEach(zone => zone.render())
    this.person.move()
    this.person.render();
  }
}

export { GridScene }