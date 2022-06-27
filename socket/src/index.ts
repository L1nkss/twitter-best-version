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

const users: Record<string, string[]> = {}

// Socket io
io.use(((socket: ISocket, next: (err?: ExtendedError) => void) => {
    socket.userName = socket.handshake.auth.userName;
    next()
}))

io.on('connection', (socket: ISocket) => {
    console.log('User connected', socket.id);

    if (socket.handshake.auth.userName) {
        if (users[socket.handshake.auth.userName]) {
            users[socket.handshake.auth.userName].push(socket.id)
        } else {
            users[socket.handshake.auth.userName] = [];
            users[socket.handshake.auth.userName].push(socket.id)
        }
    }
    console.log('users', users);

    socket.on('private message', ({ message, to }: {message: string, to: string}) => {
        const usersIdxs = users[to];

        usersIdxs.forEach((userId) => {
            socket.to(userId).emit("private message", {
                message,
                from: socket.id,
            });
        })
    })

    socket.conn.on("close", (reason) => {
        users[socket.handshake.auth.userName] = users[socket.handshake.auth.userName].filter((connection) => {
            connection !== socket.id
        })
    });

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