import { WebSocketServer } from 'ws';
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
  getActiveWindow,
  right,
} from '@nut-tree/nut-js';
import { randomInt } from 'crypto';

const port = 8080;
const ws = new WebSocketServer({ port: port });
ws.on('open', () => {
  console.log(11111);
});
ws.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log(data.toString());
    mouse.move(right(50));
  });
  console.log('new connection');
  ws.send('Hello client');
  console.log(ws.url);
});

console.log(`Listenin port ${port}`);
