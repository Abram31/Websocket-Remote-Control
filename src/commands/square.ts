import { mouse, Point, straightTo } from '@nut-tree/nut-js';
import { DIRECTION } from '../constants/constants';
import { Duplex } from 'stream';

export const square = async (length: number, webSocket: Duplex) => {
  const { x, y } = await mouse.getPosition();

  const newPosition = new Point(x, y + Number(length));
  await mouse.drag(straightTo(newPosition));
  const newPosition1 = new Point(x - Number(length), y + Number(length));
  await mouse.drag(straightTo(newPosition1));
  const newPosition2 = new Point(x - Number(length), y);
  await mouse.drag(straightTo(newPosition2));
  const newPosition3 = new Point(x, y);
  await mouse.drag(straightTo(newPosition3));
  webSocket.write(`${DIRECTION.draw_square}`);
};
