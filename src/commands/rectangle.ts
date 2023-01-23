import { mouse, Point, straightTo } from '@nut-tree/nut-js';
import { DIRECTION } from '../constants/constants';
import { Duplex } from 'stream';

export const rectangle = async (length: number, lengthY: number, webSocket: Duplex) => {
  const positionRectangle = await mouse.getPosition();
  const newPositionRect = new Point(positionRectangle.x, positionRectangle.y + Number(lengthY));
  await mouse.drag(straightTo(newPositionRect));
  const positionRectangle1 = await mouse.getPosition();
  const newPositionRect1 = new Point(positionRectangle1.x - Number(length), positionRectangle1.y);
  await mouse.drag(straightTo(newPositionRect1));
  const positionRectangle2 = await mouse.getPosition();
  const newPositionRect2 = new Point(positionRectangle2.x, positionRectangle2.y - Number(lengthY));
  await mouse.drag(straightTo(newPositionRect2));
  const positionRectangle3 = await mouse.getPosition();
  const newPositionRect3 = new Point(positionRectangle3.x + Number(length), positionRectangle3.y);
  await mouse.drag(straightTo(newPositionRect3));

  webSocket.write(`${DIRECTION.draw_rectangle}`);
};
