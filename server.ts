import express from 'express';
import * as path from 'path';

// import * as http from 'http';
// import * as socketio from 'socket.io';

const app = express();
const http = require('http').createServer(app);

// set up socket.io and bind it to our
// http server.
const io = require("socket.io")(http);

app.get('/', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  res.sendFile(path.resolve("./client/index.html"));
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // socket.on('chat message', (msg: any) => {
  //   console.log('message: ' + msg);
  // });

  // send the message to everyone
  socket.on('chat message', (msg: any) => {
    io.emit('chat message', msg);
  });
})


// In order to send an event to everyone, Socket.IO gives us the io.emit() method.
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets


// If you want to send a message to everyone except for a certain emitting socket, we have the broadcast flag for emitting from that socket:
// io.on('connection', (socket: any) => {
//   socket.broadcast.emit('hi');
// });

const server = http.listen(3000, () => {
  console.log('listening on *:3000');
});