const socket = io('http://localhost:3000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageinp')
// const messageContainer = document.getElementsByClassName('container')
const messageContainer = document.querySelector(".container")

var audio=new Audio('ting.mp3');

const append=(message,position)=>{
  const messageElement=document.createElement('div');
  messageElement.innerText=message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position=='left')
  {
    audio.play();
  }
  
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=messageInput.value;
  append(`you: ${message}`,'right');
  socket.emit('send-chat-message',message);
  messageInput.value=''
})

const myname = prompt('What is your name?')
// appendMessage('You joined');
socket.emit('new-user',myname)

socket.on('user-connected',name=>{
  append(`${name} joined the chat`, 'right')
})

socket.on('chat-message',data=>{
  append(`${data.name} : ${data.message}`,`left`)
})



// socket.on('user-connected', name => {
//   append(`${name} connected`)
// })

socket.on('user-disconnected', name => {
  append(`${name} left the chat`,'left')
})

// messageForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const message = messageInput.value
//   appendMessage(`You: ${message}`)
//   socket.emit('send-chat-message', message)
//   messageInput.value = ''
// })

// function appendMessage(message) {
//   const messageElement = document.createElement('div')
//   messageElement.innerText = message
//   messageContainer.append(messageElement)
// }