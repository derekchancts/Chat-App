const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');


const publicPath = path.join(__dirname, '/../public');
const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);



io.on('connection', (socket) => {
  console.log("A new user connected");


  // To current user only
  socket.emit('newMessage', generateMessage("Admin", "Welcome to this chat room"))


  // Broadcast when a user connects
  // sends message tp all clients/users except the current user logging in
  socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined!"))


  socket.on('createMessage', (message, callback) => {
    console.log("createMessage", message);
    // io will broadcast to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is the server: ');
  });


  socket.on('createLocationMessage', (coords) => {
    //io.emit('newMessage', generateLocationMessage("Admin", `${coords.lat} ${coords.lng}`));
    io.emit('newLocationMessage', generateLocationMessage("Admin", coords.lat, coords.lng));
  })


  socket.on("disconnect", () => {
    console.log('User disconnected');
  });

});



const port = process.env.PORT || 3000;

server.listen(port, ()=> console.log(`server listening on port ${port}`));
