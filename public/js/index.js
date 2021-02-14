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
});

