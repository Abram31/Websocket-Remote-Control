import { WebSocketServer } from 'ws';
const port = 8080;
const ws = new WebSocketServer({ port: port });
ws.on('open', () => {
  console.log(11111);
});
ws.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log(data);
  });
  console.log('new connection');
  ws.send('Hello client');
  console.log(ws.url);
});

console.log(`Listenin port ${port}`);
