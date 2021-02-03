"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = __importStar(require("path"));
// import * as http from 'http';
// import * as socketio from 'socket.io';
var app = express_1.default();
var http = require('http').createServer(app);
// set up socket.io and bind it to our
// http server.
var io = require("socket.io")(http);
app.get('/', function (req, res) {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(path.resolve("./client/index.html"));
});
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    // socket.on('chat message', (msg: any) => {
    //   console.log('message: ' + msg);
    // });
    // send the message to everyone
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
// In order to send an event to everyone, Socket.IO gives us the io.emit() method.
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
// If you want to send a message to everyone except for a certain emitting socket, we have the broadcast flag for emitting from that socket:
// io.on('connection', (socket: any) => {
//   socket.broadcast.emit('hi');
// });
var server = http.listen(3000, function () {
    console.log('listening on *:3000');
});
