let socket = new WebSocket("ws://localhost:8080");

if (userName === '') {
  let userName = prompt("Please enter your name");
}

document.forms.publish.onsubmit = () => { //клик по кнопке send
  let outgoingMessage = document.forms.publish.message.value + '|' + userName;
  socket.send(outgoingMessage); //отправляем сообщение
}

socket.onmessage = function (event) {   //принимаем сообщение
  console.log(`Данные получены с сервера: ${event.data}`);
  let messageElem = document.createElement('div');
  let message = document.createElement('div');
  let p = document.createElement('p');
  p.setAttribute('class', 'userName');
  p.innerHTML = event.data.substring(event.data.lastIndexOf('|') + 1);
  message.setAttribute('class', 'message')
  message.textContent = event.data.split('|')[0];
  messageElem.appendChild(p);
  messageElem.appendChild(message);
  document.getElementById('messages').prepend(messageElem);
};
