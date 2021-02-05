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
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const app = express_1.default();
const http = require('http').createServer(app);
// set up socket.io and bind it to our
// http server.
const io = require("socket.io")(http);
let messages = [];
app.get('/', (req, res) => {
    res.sendFile(path.resolve("./client/index.html"));
});
io.on("connection", (socket) => {
    console.log(`a user connected: ${socket.id}`);
    socket.emit('previousMessages', messages);
    // socket.on('chat message', (msg: any) => {
    //   console.log('message: ' + msg);
    // });
    // send the message to everyone
    socket.on('sendMessage', (data) => {
        messages.push(data);
        io.emit('receivedMessage', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// In order to send an event to everyone, Socket.IO gives us the io.emit() method.
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
// If you want to send a message to everyone except for a certain emitting socket, we have the broadcast flag for emitting from that socket:
// io.on('connection', (socket: any) => {
//   socket.broadcast.emit('hi');
// });
const server = http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});
//# sourceMappingURL=server.js.map