import express, { Express } from 'express';
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

const app: Express = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

interface ISocket extends Socket {
    userName?: string;
}

const users: any[] = [];

// Socket io
io.use(((socket: ISocket, next: (err?: ExtendedError) => void) => {
    socket.userName = socket.handshake.auth.userName;
    next()
}))
io.on('connection', (socket: Socket) => {
    console.log('User connected', socket.id);

    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            userName: socket.handshake.auth.userName,
        });
    }
    console.log('users', users);

    socket.on('message', (mgs) => {
        io.emit('client message', mgs)
    })

    socket.on('get-users', () => {
        socket.emit("users", users);
    })
});

app.use(express.json());

server.listen(3001, () => {
    console.log(`⚡️[server socket]: Server is running at http://localhost:3001`);
})