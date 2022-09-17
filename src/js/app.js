import Chat from './Chat';

document.addEventListener('DOMContentLoaded', () => {
  const ws = new WebSocket('ws://shielded-springs-44422.herokuapp.com/');
  const chat = new Chat(ws);
  chat.init();
});
