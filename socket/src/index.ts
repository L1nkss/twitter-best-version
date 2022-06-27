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
    uid?: string;
}

const users: {
    [key: string]: {
        connection: string[],
        userInfo: {
            id: string,
            userName: string,
            avatarUrl: string
        }
    }
} = {}

// Socket io
io.use(((socket: ISocket, next: (err?: ExtendedError) => void) => {
    socket.uid = socket.handshake.auth.uid;
    next()
}))

io.on('connection', (socket: ISocket) => {
    console.log('User connected', socket.id);

    if (socket.handshake.auth.uid) {
        if (users[socket.handshake.auth.uid]) {
            users[socket.handshake.auth.uid].connection.push(socket.id)
        } else {
            users[socket.handshake.auth.uid] = {
                userInfo: {
                    id: socket.handshake.auth.uid,
                    userName: socket.handshake.auth.userName,
                    avatarUrl: socket.handshake.auth.avatarUrl,
                },
                connection: [socket.id]
            }
        }
    }
    console.log('users', users);

    socket.on('private message', ({ message, to, from }: {message: string, to: string, from: {}}) => {
        const usersIdxs = users[to].connection;

        if (!usersIdxs) return;

        usersIdxs.forEach((userId) => {
            socket.to(userId).emit("private message", {
                content: message,
                from: {
                    connectionId: socket.id,
                      ...from
                },
            });
        })
    })

    socket.conn.on("close", (reason) => {
        users[socket.handshake.auth.uid].connection = users[socket.handshake.auth.uid].connection.filter((connection) => {
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