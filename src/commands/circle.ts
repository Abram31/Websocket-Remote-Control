import { Button, mouse, Point, straightTo } from '@nut-tree/nut-js';
import { DIRECTION } from '../constants/constants';
import { Duplex } from 'stream';

export const circle = async (length: number, webSocket: Duplex) => {
  const circleDegree = 45;
  const positionCircle = await mouse.getPosition();
  const centerOfCircle = { x: positionCircle.x, y: positionCircle.y + Number(length) };
  await mouse.pressButton(Button.LEFT);
  for (let i = 0; i <= circleDegree; i++) {
    const xn = centerOfCircle.x + Number(length) * Math.sin((2 * Math.PI * i) / circleDegree);
    const yn = centerOfCircle.y - Number(length) * Math.cos((2 * Math.PI * i) / circleDegree);
    const newPosition = new Point(xn, yn);

    await mouse.move(straightTo(newPosition));
  }
  await mouse.releaseButton(Button.LEFT);

  webSocket.write(`${DIRECTION.draw_circle}`);
};
