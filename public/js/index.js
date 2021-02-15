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
  // const formatedTime = moment(message.createdAt).format('LT')
  // console.log("newMessage", message);
  // const li = document.createElement('li');
  // li.innerText = `${message.from} ${formatedTime}: ${message.text}`;
  // document.querySelector('body').appendChild(li);

  const formatedTime = moment(message.createdAt).format('LT')
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formatedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html;

  document.querySelector('body').appendChild(div);

});



socket.on("newLocationMessage", (message) => {
// const formatedTime = moment(message.createdAt).format('LT')
//   console.log("newLocationMessage", message);
//   const li = document.createElement('li');
//   const a = document.createElement('a');

//   a.setAttribute('target', '_blank');
//   a.setAttribute('href', message.url);
//   a.innerHTML = 'My current location';

//   li.innerText = `${message.from} ${formatedTime}: `;
//   li.appendChild(a);
//   document.querySelector('body').appendChild(li);

  const formatedTime = moment(message.createdAt).format('LT');
  console.log("newLocationMessage", message);

  const template = document.querySelector('#location-message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html;

  document.querySelector('body').appendChild(div);

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