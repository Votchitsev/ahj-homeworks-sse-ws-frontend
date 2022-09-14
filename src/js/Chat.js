class Chat {
  constructor(ws) {
    this.authForm = document.querySelector('.auth');
    this.ws = ws;

    this.getMessage = this.getMessage.bind(this);
    this.sendUserName = this.sendUserName.bind(this);
    this.openChat = this.openChat.bind(this);

    this.ws.addEventListener('message', this.getMessage);
  }

  init() {
    this.showAuthForm();
    this.addListeners();
  }

  showAuthForm() {
    this.authForm.classList.remove('hidden');
  }

  addListeners() {
    this.authForm.addEventListener('submit', this.sendUserName);
  }

  sendUserName(e) {
    e.preventDefault();

    const input = e.target.querySelector('input[type="text"]');

    const data = {
      event: 'addUser',
      userName: input.value,
    };

    this.ws.send(JSON.stringify(data));
    input.value = '';
  }

  getMessage(msg) {
    const json = JSON.parse(msg.data);

    if (json.event === 'addUser') {
      if (json.result) {
        this.userName = json.userName;
        this.openChat();
      } else {
        alert('The user exists. Please choose another nickname');
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  openChat() {
    console.log('Open chat');
  }
}

export default Chat;
