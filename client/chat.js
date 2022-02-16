let socket = new WebSocket("ws://localhost:8080");

let userName = prompt("Please enter your name");

let btn = document.getElementById('send');
let textMessage = document.getElementById('input-field');

btn.onclick = () => { //клик по кнопке send
  let outgoingMessage = textMessage.value + '|' + userName;
  createMessage(outgoingMessage, 0)
  socket.send(outgoingMessage); //отправляем сообщение
}


socket.onmessage = event => {   //принимаем сообщение
  createMessage(event.data, 1)
};

const createMessage = (msg, curUser) => {
  let messageElem = document.createElement('div');
  let message = document.createElement('div');
  let p = document.createElement('p');
  message.setAttribute('class', 'message-content')
  if (curUser === 0) {
    messageElem.setAttribute('class', 'my-message');
    p.setAttribute('class', 'my-name');
    message.setAttribute('class', 'my-message-content');

  } else {
    messageElem.setAttribute('class', 'user-message');
    p.setAttribute('class', 'user-name');
    message.setAttribute('class', 'user-message-content');
  }
  p.innerHTML = msg.substring(msg.lastIndexOf('|') + 1);
  message.textContent = msg.split('|')[0];
  messageElem.appendChild(p);
  messageElem.appendChild(message);
  document.getElementById('messages').prepend(messageElem);
}