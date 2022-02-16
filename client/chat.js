let userName = prompt("Please enter your name");
let btn = document.getElementById('send');
let textMessage = document.getElementById('input-field');

let socket = new WebSocket("ws://localhost:8080");
btn.onclick = () => { //клик по кнопке send
  if (textMessage.value === "") { return alert('Nothing to send!') }
  let outgoingMessage = userName + '|' + textMessage.value + '|' + new Date().toLocaleTimeString('en-US');
  createMessage(outgoingMessage, 0) //передаём 0 = значит исходящее сообщение
  socket.send(outgoingMessage); //отправляем сообщение
  textMessage.value = "";
}

socket.onmessage = event => {   //принимаем сообщение
  createMessage(event.data, 1) //передаём 1 = значит входящее сообщение
};

const createMessage = (msg, curUser) => { //создаём сообщение и отображаем на экране
  let messageElem = document.createElement('div');
  let name = document.createElement('p');
  let message = document.createElement('div');
  let time = document.createElement('p');
  if (curUser === 0) {    //определяем сообщение входящее или исходящщее
    messageElem.setAttribute('class', 'my-message');
    name.setAttribute('class', 'my-name');
    message.setAttribute('class', 'my-message-content');
    time.setAttribute('class', 'my-time');
  } else {
    messageElem.setAttribute('class', 'user-message');
    name.setAttribute('class', 'user-name');
    message.setAttribute('class', 'user-message-content');
    time.setAttribute('class', 'user-time');
  }
  name.innerHTML = msg.split('|')[0];
  message.innerHTML = msg.split('|')[1];
  time.innerHTML = msg.split('|')[2];
  messageElem.appendChild(name);
  messageElem.appendChild(message);
  messageElem.appendChild(time);
  document.getElementById('messages').appendChild(messageElem);
  document.getElementById('messages').scrollTop = 9999;
}