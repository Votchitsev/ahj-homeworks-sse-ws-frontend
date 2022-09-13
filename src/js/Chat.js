class Chat {
  constructor(ws) {
    this.authForm = document.querySelector('.auth');
    this.ws = ws;

    this.sendUserName = this.sendUserName.bind(this);
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
    this.ws.send(input.value);
    input.value = '';
  }
}

export default Chat;
