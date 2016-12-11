import { TILES_X, TILES_Y, TILE_SIZE } from '../settings/constants';
import { line } from '../world';
import { grass_detail_values } from '../settings/colors';

const gridLines = (tileCount, tileSize, isVertical, color) => {
  for ( let i = 0; i < tileCount; i++) {
    const beginTile = (i * tileSize);
    const endTile = beginTile + tileSize - 1;
    const endLine = tileCount*tileSize;
    if(!isVertical) {
      line( 0, beginTile, endLine, beginTile )
        .stroke(...grass_detail_values)
      line( 0, endTile, endLine, endTile )
        .stroke(...grass_detail_values)
    } else {
      line( beginTile, 0, beginTile, endLine )
        .stroke(...color)
      line( endTile, 0, endTile, endLine )
        .stroke(...color)
    }
  }
}

export default class Grid {
  render() {
    gridLines(TILES_X, TILE_SIZE, true, grass_detail_values)
    gridLines(TILES_Y, TILE_SIZE, false, grass_detail_values)
  }
}