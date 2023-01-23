import { createWebSocketStream, WebSocketServer } from 'ws';
import { DIRECTION } from './constants/constants';
import { printScreen } from './commands/screenShot';
import { moveDirections } from './commands/directions';
import { circle } from './commands/circle';
import { square } from './commands/square';
import { rectangle } from './commands/rectangle';
import { mousePosition } from './commands/position';
import process from 'process';

const port = process.env.PORT || 8080;
const SocketServer = new WebSocketServer({ port: Number(port) });
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
        moveDirections(Number(length), webSocketStream, direction);
        break;
      case DIRECTION.mouse_right:
        moveDirections(Number(length), webSocketStream, direction);
        break;
      case DIRECTION.mouse_up:
        moveDirections(Number(length), webSocketStream, direction);
        break;
      case DIRECTION.mouse_down:
        moveDirections(Number(length), webSocketStream, direction);
        break;

      case DIRECTION.draw_circle:
        circle(Number(length), webSocketStream);
        break;
      case DIRECTION.draw_square:
        square(Number(length), webSocketStream);
        break;

      case DIRECTION.draw_rectangle:
        rectangle(Number(length), Number(lengthY), webSocketStream);
        break;

      case DIRECTION.prnt_scrn:
        await printScreen('screen', webSocketStream);
        break;

      case DIRECTION.mouse_position:
        mousePosition(webSocketStream);
        break;
      default:
    }

    console.log(response);
  });
});

console.log(`Listenin port ${port}`);
