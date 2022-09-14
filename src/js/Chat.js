class Chat {
  constructor(ws) {
    this.authForm = document.querySelector('.auth');
    this.usersContainer = document.querySelector('.online-user-list');
    this.ws = ws;
    this.userName = undefined;

    this.getMessage = this.getMessage.bind(this);
    this.sendUserName = this.sendUserName.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  init() {
    this.showAuthForm();
    this.addListeners();
  }

  showAuthForm() {
    this.authForm.classList.remove('hidden');
  }

  hideAuthForm() {
    this.authForm.classList.add('hidden');
  }

  addListeners() {
    this.authForm.addEventListener('submit', this.sendUserName);
    window.addEventListener('beforeunload', this.close);
    this.ws.addEventListener('message', this.getMessage);
  }

  sendUserName(e) {
    e.preventDefault();

    const input = e.target.querySelector('input[type="text"]');

    this.userName = input.value;

    const data = {
      event: 'addUser',
      userName: input.value,
    };

    this.webSocketSend(data);

    input.value = '';
  }

  getMessage(msg) {
    const json = JSON.parse(msg.data);

    if (json.event === 'addUser') {
      if (json.result) {
        this.openChat();
      } else {
        this.userName = undefined;
        alert('The user exists. Please choose another nickname');
      }
    }
    if (json.event === 'getUserList') {
      this.redrawUserList(json.userList);
    }
  }

  openChat() {
    this.hideAuthForm();

    this.webSocketSend({
      event: 'getUserList',
    });
  }

  webSocketSend(data) {
    this.ws.send(JSON.stringify(data));
  }

  redrawUserList(userList) {
    this.usersContainer.innerHTML = '';

    userList.forEach((user) => {
      const div = document.createElement('div');
      div.classList.add('online-user-list-item');

      div.textContent = (user === this.userName) ? 'You' : user;
      this.usersContainer.append(div);
    });
  }
}

export default Chat;
