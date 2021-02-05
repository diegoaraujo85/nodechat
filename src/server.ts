import express from 'express';
import * as path from 'path';

const app = express();
const http = require('http').createServer(app);

// set up socket.io and bind it to our
// http server.
const io = require("socket.io")(http);


interface MessageObjectProps {
  username: string;
  message: string;
}

let messages: MessageObjectProps[] = [];

app.get('/', (req, res) => {
  res.sendFile(path.resolve("./client/index.html"));
});

io.on("connection", (socket: any) => {
  console.log(`a user connected: ${socket.id}`);

  socket.emit('previousMessages', messages)

  // socket.on('chat message', (msg: any) => {
  //   console.log('message: ' + msg);
  // });

  // send the message to everyone
  socket.on('sendMessage', (data: MessageObjectProps) => {
    messages.push(data);
    io.emit('receivedMessage', data);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})


// In order to send an event to everyone, Socket.IO gives us the io.emit() method.
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets


// If you want to send a message to everyone except for a certain emitting socket, we have the broadcast flag for emitting from that socket:
// io.on('connection', (socket: any) => {
//   socket.broadcast.emit('hi');
// });

const server = http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});