const getUserName = () => {
  prompt("Please enter your name");
}

// const name = getUserName();

let socket = new WebSocket("ws://localhost:8080");

document.forms.publish.onsubmit = () => { //клик по кнопке send
  console.log('Connected');
  console.log('Отправляем данные на сервер');
  let outgoingMessage = document.forms.publish.message.value;
  socket.send(outgoingMessage);
}

socket.onmessage = function (event) {
  console.log(`Данные получены с сервера: ${event.data}`);
  let messageElem = document.createElement('div');
  messageElem.setAttribute('class', 'message')
  messageElem.textContent = event.data;
  document.getElementById('messages').prepend(messageElem);
};