const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('message', (msg) => {
  console.log(`message from server ${msg.data}`);
});
