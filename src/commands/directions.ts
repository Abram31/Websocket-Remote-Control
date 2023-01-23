import { down, left, mouse, right, up } from '@nut-tree/nut-js';
import { DIRECTION } from '../constants/constants';
import { Duplex } from 'stream';

export const moveDirections = async (length: number, webSocket: Duplex, directions: string) => {
  switch (directions) {
    case DIRECTION.mouse_left:
      await mouse.move(left(length));
      webSocket.write(`${DIRECTION.mouse_left}`);
      break;
    case DIRECTION.mouse_right:
      await mouse.move(right(length));
      webSocket.write(`${DIRECTION.mouse_right}`);
      break;
    case DIRECTION.mouse_up:
      await mouse.move(up(length));
      webSocket.write(`${DIRECTION.mouse_up}`);
      break;
    case DIRECTION.mouse_down:
      await mouse.move(down(length));
      webSocket.write(`${DIRECTION.mouse_down}`);
      break;
  }
};
