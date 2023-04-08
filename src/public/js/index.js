const socket = io('http://localhost:8080');
let user;
let chatBox = document.getElementById("chatBox");
let msgForm = document.getElementById("msgForm");
const messages = document.getElementById('messageLogs');

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Alerta basica con Sweetalert2",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre de usuario para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("user-autenticated", user);
});



socket.on('messageLogs', data => {
  console.log(data)
  appendMessages(data)
})

socket.on('output-messages', data => {
  console.log(data)
  if (data.length) {
      data.forEach(message => {
          appendMessages(message.msg)
      });
  }
})



msgForm.addEventListener('submit', e => {
  e.preventDefault()
  // socket.emit('chatmessage', msgForm.msg.value)
  socket.emit("chatmessage", user , msgForm.msg.value)

  console.log('submit from msgfrom', msgForm.msg.value)
  msgForm.msg.value = '';


})

function appendMessages(message) {
  const html = `<div>${message}</div>`
  messages.innerHTML += html
}


socket.on("user-connected", (data) => {
  Swal.fire({
    text: "Nuevo usuario autenticado",
    toast: true,
    position: "top-right",
    title: `${data} se ha unido al chat`,
    icon: "success",
  });
  
});




