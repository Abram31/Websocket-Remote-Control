import { mouse } from '@nut-tree/nut-js';
import { Duplex } from 'stream';
import { DIRECTION } from '../constants/constants';

export const mousePosition = async (webSocket: Duplex) => {
  const position = await mouse.getPosition();
  webSocket.write(`${DIRECTION.mouse_position} ${position.x},${position.y}`);
};
