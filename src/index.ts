import { createWebSocketStream, WebSocketServer } from 'ws';
import {
  mouse,
  screen,
  singleWord,
  sleep,
  useConsoleLogger,
  ConsoleLogLevel,
  straightTo,
  centerOf,
  Button,
  right,
  getActiveWindow,
  randomPointIn,
  left,
  up,
  down,
  Point,
  imageResource,
} from '@nut-tree/nut-js';
import { randomInt } from 'crypto';
import { DIRECTION } from './constants/constants';
import { printScreen } from './commands/screenShot';

const port = 8080;
const SocketServer = new WebSocketServer({ port: port });
SocketServer.on('open', () => {});
SocketServer.on('connection', (ws) => {
  ws.on('message', async (data) => {
    const response = data.toString();
    const [direction, length, lengthY] = response.split(' ');

    const webSocketStream = createWebSocketStream(ws, {
      decodeStrings: false,
      encoding: 'utf8',
    });

    switch (direction) {
      case DIRECTION.mouse_left:
        await mouse.move(left(Number(length)));
        webSocketStream.write(`${DIRECTION.mouse_left}`);

        break;

      case DIRECTION.mouse_right:
        await mouse.move(right(Number(length)));
        webSocketStream.write(`${DIRECTION.mouse_right}`);

        break;

      case DIRECTION.mouse_up:
        await mouse.move(up(Number(length)));
        webSocketStream.write(`${DIRECTION.mouse_up}`);

        break;

      case DIRECTION.mouse_down:
        await mouse.move(down(Number(length)));
        webSocketStream.write(`${DIRECTION.mouse_down}`);
        break;

      case DIRECTION.draw_circle:
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

        webSocketStream.write(`${DIRECTION.draw_circle}`);

        break;
      case DIRECTION.draw_square:
        const { x, y } = await mouse.getPosition();

        const newPosition = new Point(x, y + Number(length));
        await mouse.drag(straightTo(newPosition));
        const newPosition1 = new Point(x - Number(length), y + Number(length));
        await mouse.drag(straightTo(newPosition1));
        const newPosition2 = new Point(x - Number(length), y);
        await mouse.drag(straightTo(newPosition2));
        const newPosition3 = new Point(x, y);
        await mouse.drag(straightTo(newPosition3));

        webSocketStream.write(`${DIRECTION.draw_square}`);

        break;

      case DIRECTION.draw_rectangle:
        const positionRectangle = await mouse.getPosition();
        const newPositionRect = new Point(
          positionRectangle.x,
          positionRectangle.y + Number(length)
        );
        await mouse.drag(straightTo(newPositionRect));

        const positionRectangle1 = await mouse.getPosition();
        const newPositionRect1 = new Point(
          positionRectangle1.x - Number(lengthY),
          positionRectangle1.y
        );
        await mouse.drag(straightTo(newPositionRect1));
        const positionRectangle2 = await mouse.getPosition();
        const newPositionRect2 = new Point(
          positionRectangle2.x,
          positionRectangle2.y - Number(length)
        );
        await mouse.drag(straightTo(newPositionRect2));
        const positionRectangle3 = await mouse.getPosition();
        const newPositionRect3 = new Point(
          positionRectangle3.x + Number(lengthY),
          positionRectangle3.y
        );
        await mouse.drag(straightTo(newPositionRect3));

        webSocketStream.write(`${DIRECTION.draw_rectangle}`);
        break;

      case DIRECTION.prnt_scrn:
        const result = await printScreen('screen', webSocketStream);
        break;

      case DIRECTION.mouse_position:
        const position = await mouse.getPosition();
        webSocketStream.write(`${DIRECTION.mouse_position} ${position.x},${position.y}`);
        break;
      default:
    }

    console.log(response);
  });
});

console.log(`Listenin port ${port}`);
