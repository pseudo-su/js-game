// import { TILE_SIZE } from '../settings/constants';
import { keyIsDown } from '../world';

export const direction8Point =  (upCode, downCode, leftCode, rightCode) => {
  const left = upCode || 37;
  const up = upCode || 38;
  const right = upCode || 39;
  const down = upCode || 40;

  return (
    (keyIsDown(up) && keyIsDown(right))? 'dupright': null ||
    (keyIsDown(up) && keyIsDown(left))? 'dupleft': null ||
    (keyIsDown(down) && keyIsDown(right))? 'ddownright': null ||
    (keyIsDown(down) && keyIsDown(left))? 'ddownleft': null ||
    keyIsDown(left)? 'left': null ||
    keyIsDown(up)? 'up': null ||
    keyIsDown(right)? 'right': null ||
    keyIsDown(down)? 'down': null
  )
};

export function getMovePosition(origX, origY, direction, {distance, distanceDiag}) {
  let x = origX;
  let y = origY;

  switch(direction) {
    case 'dupright':
      y -= distanceDiag;
      x += distanceDiag;
      break;
    case 'dupleft':
      y -= distanceDiag;
      x -= distanceDiag;
      break;
    case 'ddownright':
      y += distanceDiag;
      x += distanceDiag;
      break;
    case 'ddownleft':
      y += distanceDiag;
      x -= distanceDiag;
      break;
    case 'up': 
      y -= distance;
      break;
    case 'left':
      x -= distance;
      break;
    case 'right':
      x += distance;
      break;
    case 'down':
      y += distance;
      break;
    default:
      break;
  }

  return { x, y }
}

export function pointOutsideScene(scene, {x, y}) {
  return squareOutsideScene(scene, {start: {x,y}, end: {x,y}}).any
}


export function squareOutsideScene(scene, square) {
  const left = square.start.x < scene.start.x;
  const up = square.start.y < scene.start.y;
  const right = square.end.x > scene.end.x;
  const down = square.end.y > scene.end.y;
  const vertical = up || down;
  const horizontal = left || right;
  const any = left || up || right || down;
  const all = left && up && right && down;

  return {left, up, right, down, vertical, horizontal, any, all};
}

export function isBlockedMovingIntoNewZone(blocked, nearbyZones, square, partiallyInside) {
  const canMove = nearbyZones
    .map(zone => ({zone, scene: zone.points, sceneBlocked: squareOutsideScene(zone.points, square)}))
    .map(({zone, scene, sceneBlocked}) => {
      zone.blocked = sceneBlocked;

      const left = blocked.left? (
        !sceneBlocked.up && !sceneBlocked.down && !sceneBlocked.left
      ): false;
      const up = blocked.up? (
        !sceneBlocked.left && !sceneBlocked.right && !sceneBlocked.up
      ): false;
      const right = blocked.right? (
        !sceneBlocked.up && !sceneBlocked.down && !sceneBlocked.right
      ): false;
      const down = blocked.down? (
        !sceneBlocked.left && !sceneBlocked.right && !sceneBlocked.down
      ): false;
      const horizontal = blocked.horizontal? left || right: false;
      const vertical = blocked.vertical? left || right: false;

      return {
        horizontal, vertical, left, up, right, down, zone
      }
    });
    // moving into zones can move
    const leftMove = canMove.reduce((prev, item) => prev || item.left? item.zone: false, false);
    const upMove = canMove.reduce((prev, item) => prev || item.up? item.zone: false, false);
    const rightMove = canMove.reduce((prev, item) => prev || item.right? item.zone: false, false);
    const downMove = canMove.reduce((prev, item) => prev || item.down? item.zone: false, false);

    const partialZone = leftMove || upMove || rightMove || downMove;

    // Is the user blocked in directions
    const partialZoneBlocked = partiallyInside? squareOutsideScene(partiallyInside.points, square): false;
    const left = (blocked.left && !leftMove);
    const up = (blocked.up && !upMove) || (partialZoneBlocked && partialZoneBlocked.up);
    const right = (blocked.right && !rightMove);
    const down = (blocked.down && !downMove) || (partialZoneBlocked && partialZoneBlocked.down);

    if(left) console.log('blocked left')
    if(up) console.log('blocked up')
    if(right) console.log('blocked right')
    if(down) console.log('blocked down')

    const horizontal = left || right;
    const vertical = up || down;
    
    return { left, up, right, down, vertical, horizontal, partialZone};
}