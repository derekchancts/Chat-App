const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '/../public');
const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);



io.on('connection', (socket) => {
  console.log("A new user connected");


  // To current user only
  socket.emit('newMessage', {
    from: "Admin",
    text: "Welcome to this chat room"
  });


  // Broadcast when a user connects
  // sends message tp all clients/users except the current user logging in
  socket.broadcast.emit('newMessage', {
    from : "Admin",
    text: "New user joined!",
    createdAt: new Date().getTime()
  })



  socket.on('createMessage', (message) => {
    console.log("createMessage", message);

    // io will broadcast to everyone
    io.emit('newMessage', {
      from : message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

  });


  socket.on("disconnect", () => {
    console.log('User disconnected');
  });

});



const port = process.env.PORT || 3000;

server.listen(port, ()=> console.log(`server listening on port ${port}`));
