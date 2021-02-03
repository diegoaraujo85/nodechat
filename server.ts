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
  })
})

const server = http.listen(3000, () => {
  console.log('listening on *:3000');
});