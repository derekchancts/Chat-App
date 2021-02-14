const socket = io()


socket.on('connect', () => {
  console.log('Connected to server')

  // current user
  // socket.emit('createMessage', {
  //   from: "CLIENT1",
  //   text: "Hello there!"
  // })
});


socket.on('disconnect', () => {
  console.log('disconnected from server')
});


socket.on("newMessage", (message) => {
  console.log("newMessage", message);
  const li = document.createElement('li');
  li.innerText = `${message.from}: ${message.text}`;

  document.querySelector('body').appendChild(li);
});


socket.on("newLocationMessage", (message) => {
  console.log("newLocationMessage", message);
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);
  a.innerHTML = 'My current location';

  li.appendChild(a);
  document.querySelector('body').appendChild(li);
})


document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(e.target.message.value)
  // console.log(document.querySelector('input[name="message"]').value)

  socket.emit("createMessage", {
    from: 'USER',
    text: e.target.message.value
  }, () => {

  });

});



document.querySelector('#send-location').addEventListener('click', (e) => {
  e.preventDefault();

  if(!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser")
  };

  navigator.geolocation.getCurrentPosition(position => {
    // console.log(position);
    socket.emit("createLocationMessage", {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, () => alert('Unable to fetch location'))

});